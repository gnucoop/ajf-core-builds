/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { Directive, ElementRef, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import * as i0 from "@angular/core";
export class AjfBarcode {
    constructor(_cdr, _renderer) {
        this._cdr = _cdr;
        this._renderer = _renderer;
        /**
         * implement the control form value.
         * rappresent the barcode value.
         *
         * @memberof AjfBarcode
         */
        this._barcodeValue = '';
        this._supportsVideoStream = false;
        this._toggle = 'drop';
        this._showSwitchButton = false;
        this._streams = [];
        this._currentStream = -1;
        this._codeReader = new BrowserMultiFormatReader();
        this._onChangeCallback = (_) => { };
        this._onTouchedCallback = () => { };
        this._supportsVideoStream =
            navigator.mediaDevices != null &&
                navigator.mediaDevices.enumerateDevices != null &&
                navigator.mediaDevices.getUserMedia != null;
        this._initVideoStreams();
    }
    get videoSource() {
        return this._video;
    }
    get value() {
        return this._barcodeValue;
    }
    set value(value) {
        if (this._barcodeValue !== value) {
            this._barcodeValue = value;
            this._cdr.detectChanges();
            this._onChangeCallback(value);
        }
    }
    get supportsVideoStream() {
        return this._supportsVideoStream;
    }
    get toggle() {
        return this._toggle;
    }
    set toggle(val) {
        this._toggle = val;
        this._cdr.markForCheck();
    }
    get showSwitchButton() {
        return this._showSwitchButton;
    }
    reset() {
        this.value = '';
        this._onTouchedCallback();
    }
    onSelectFile(evt) {
        if (evt == null || evt.target == null) {
            return;
        }
        const target = evt.target;
        const files = target.files;
        this._onSelect(files);
    }
    onSelectDrop(files) {
        if (files == null) {
            return;
        }
        this._onSelect(files);
    }
    onTabChange(idx) {
        if (this._scannerControls != null) {
            this._scannerControls.stop();
            this._scannerControls = undefined;
        }
        if (idx === 1) {
            this._setCurrentStream();
            if (this.barcodeVideo == null || this.barcodeVideoPreview == null) {
                return;
            }
            const video = this.barcodeVideo.nativeElement;
            const preview = this.barcodeVideoPreview.nativeElement;
            this._renderer.addClass(preview, 'ajf-video-preview-hidden');
            this._codeReader
                .decodeFromVideoElement(video, result => {
                if (result == null) {
                    return;
                }
                if (this._scannerControls != null) {
                    this._scannerControls.stop();
                }
                video.pause();
                const points = result.getResultPoints();
                const nw = points[0];
                const se = points[1];
                const lx = Math.max((nw.getX() / video.videoWidth) * video.clientWidth, -10, 0);
                const ly = Math.max((nw.getY() / video.videoHeight) * video.clientHeight - 10, 0);
                const rx = Math.min((se.getX() / video.videoWidth) * video.clientWidth + 10, video.clientWidth);
                const ry = Math.min((se.getY() / video.videoHeight) * video.clientHeight + 10, video.clientHeight);
                this._renderer.setStyle(preview, 'top', `${ly}px`);
                this._renderer.setStyle(preview, 'left', `${lx}px`);
                this._renderer.setStyle(preview, 'width', `${rx - lx}px`);
                this._renderer.setStyle(preview, 'height', `${ry - ly}px`);
                this._renderer.removeClass(preview, 'ajf-video-preview-hidden');
                this.value = result.getText();
            })
                .then(controls => (this._scannerControls = controls));
        }
    }
    switchCamera() {
        const newStream = (this._currentStream + 1) % this._streams.length;
        if (newStream === this._currentStream) {
            return;
        }
        this._currentStream = newStream;
        this._setCurrentStream();
    }
    /** ControlValueAccessor implements */
    writeValue(value) {
        this._barcodeValue = value;
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    _onSelect(files) {
        if (files != null && files.length > 0 && files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (ev) => {
                if (!ev.loaded) {
                    return;
                }
                const data = reader.result;
                this._setImagePreview(`url(${data})`);
                this._codeReader
                    .decodeFromImageUrl(data)
                    .then(res => {
                    this.value = res.getText();
                })
                    .catch(() => { });
            };
        }
    }
    _setImagePreview(img) {
        if (this.barcodeImagePreview != null) {
            this._renderer.setStyle(this.barcodeImagePreview.nativeElement, 'background-image', img);
        }
    }
    _initVideoStreams() {
        if (!this._supportsVideoStream) {
            return;
        }
        navigator.mediaDevices
            .enumerateDevices()
            .then(devices => {
            const videoDevices = devices.filter(device => device.kind === 'videoinput');
            if (videoDevices.length === 0) {
                this._supportsVideoStream = false;
                throw new Error('No video device found');
            }
            return videoDevices[0];
        })
            .then(device => {
            const { deviceId } = device;
            const facingModes = ['environment', 'user'];
            const streamQueries = facingModes.map(facingMode => {
                return navigator.mediaDevices
                    .getUserMedia({
                    audio: false,
                    video: { deviceId, advanced: [{ facingMode }] },
                })
                    .then(stream => ({ stream, facingMode }));
            });
            this._deviceId = deviceId;
            return Promise.all(streamQueries);
        })
            .then(streams => {
            this._streams = [];
            const tracksIds = [];
            const tracksLabels = [];
            streams.forEach(({ stream, facingMode }) => {
                if (stream == null) {
                    return;
                }
                const tracks = stream.getTracks();
                let addStream = false;
                if (tracks.find(t => tracksIds.indexOf(t.id) === -1 && tracksLabels.indexOf(t.label) === -1)) {
                    tracks.forEach(t => {
                        tracksIds.push(t.id);
                        tracksLabels.push(t.label);
                    });
                    addStream = true;
                }
                if (addStream) {
                    this._streams.push(facingMode);
                }
            });
            if (this._streams.length === 0) {
                throw new Error('No stream available');
            }
            this._showSwitchButton = this._streams.length > 1;
            this._currentStream = 0;
            this._setCurrentStream();
        })
            .catch(() => (this._supportsVideoStream = false))
            .finally(() => this._cdr.markForCheck());
    }
    _setCurrentStream() {
        if (this.barcodeVideo == null ||
            this._deviceId == null ||
            this._streams.length === 0 ||
            this._currentStream < 0 ||
            this._currentStream >= this._streams.length) {
            return;
        }
        const video = this.barcodeVideo.nativeElement;
        const facingMode = this._streams[this._currentStream];
        navigator.mediaDevices
            .getUserMedia({
            audio: false,
            video: { deviceId: this._deviceId, advanced: [{ facingMode }] },
        })
            .then(stream => {
            video.srcObject = stream;
        });
    }
}
AjfBarcode.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcode, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
AjfBarcode.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfBarcode, viewQueries: [{ propertyName: "barcodeVideo", first: true, predicate: ["barcodeVideo"], descendants: true, read: ElementRef }, { propertyName: "barcodeVideoPreview", first: true, predicate: ["barcodeVideoPreview"], descendants: true, read: ElementRef }, { propertyName: "barcodeImagePreview", first: true, predicate: ["barcodeImagePreview"], descendants: true, read: ElementRef }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcode, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }]; }, propDecorators: { barcodeVideo: [{
                type: ViewChild,
                args: ['barcodeVideo', { read: ElementRef }]
            }], barcodeVideoPreview: [{
                type: ViewChild,
                args: ['barcodeVideoPreview', { read: ElementRef }]
            }], barcodeImagePreview: [{
                type: ViewChild,
                args: ['barcodeImagePreview', { read: ElementRef }]
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvYmFyY29kZS9zcmMvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQW9CLFNBQVMsRUFBRSxVQUFVLEVBQWEsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTdGLE9BQU8sRUFBQyx3QkFBd0IsRUFBbUIsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFLMUUsTUFBTSxPQUFnQixVQUFVO0lBK0Q5QixZQUFzQixJQUF1QixFQUFVLFNBQW9CO1FBQXJELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQTlDM0U7Ozs7O1dBS0c7UUFDSyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQVluQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFLN0IsWUFBTyxHQUFHLE1BQU0sQ0FBQztRQVNqQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFNMUIsYUFBUSxHQUFHLEVBQTBCLENBQUM7UUFDdEMsbUJBQWMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUVwQixnQkFBVyxHQUFHLElBQUksd0JBQXdCLEVBQUUsQ0FBQztRQUU3QyxzQkFBaUIsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBQ25DLHVCQUFrQixHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUdwQyxJQUFJLENBQUMsb0JBQW9CO1lBQ3ZCLFNBQVMsQ0FBQyxZQUFZLElBQUksSUFBSTtnQkFDOUIsU0FBUyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJO2dCQUMvQyxTQUFTLENBQUMsWUFBWSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUM7UUFDOUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7SUFDM0IsQ0FBQztJQXhERCxJQUFJLFdBQVc7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QyxtQkFBbUI7c0JBRGxCLFNBQVM7dUJBQUMscUJBQXFCLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO2dCQUdwRCxtQkFBbUI7c0JBRGxCLFNBQVM7dUJBQUMscUJBQXFCLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIFJlbmRlcmVyMiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QnJvd3Nlck11bHRpRm9ybWF0UmVhZGVyLCBJU2Nhbm5lckNvbnRyb2xzfSBmcm9tICdAenhpbmcvYnJvd3Nlcic7XG5cbnR5cGUgQWpmVmlkZW9GYWNpbmdNb2RlID0gJ3VzZXInIHwgJ2Vudmlyb25tZW50JztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQmFyY29kZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQFZpZXdDaGlsZCgnYmFyY29kZVZpZGVvJywge3JlYWQ6IEVsZW1lbnRSZWZ9KSBiYXJjb2RlVmlkZW8hOiBFbGVtZW50UmVmPEhUTUxWaWRlb0VsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdiYXJjb2RlVmlkZW9QcmV2aWV3Jywge3JlYWQ6IEVsZW1lbnRSZWZ9KVxuICBiYXJjb2RlVmlkZW9QcmV2aWV3ITogRWxlbWVudFJlZjxIVE1MRGl2RWxlbWVudD47XG4gIEBWaWV3Q2hpbGQoJ2JhcmNvZGVJbWFnZVByZXZpZXcnLCB7cmVhZDogRWxlbWVudFJlZn0pXG4gIGJhcmNvZGVJbWFnZVByZXZpZXchOiBFbGVtZW50UmVmPEhUTUxJbWFnZUVsZW1lbnQ+O1xuXG4gIC8qKlxuICAgKiBBIGh0bWwgdmlkZW8gZWxlbWVudCBjcmVhdGVkIGF0IHJ1bnRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3ZpZGVvPzogSFRNTFZpZGVvRWxlbWVudDtcbiAgZ2V0IHZpZGVvU291cmNlKCk6IEhUTUxWaWRlb0VsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl92aWRlbztcbiAgfVxuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnQgdGhlIGNvbnRyb2wgZm9ybSB2YWx1ZS5cbiAgICogcmFwcHJlc2VudCB0aGUgYmFyY29kZSB2YWx1ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2JhcmNvZGVWYWx1ZSA9ICcnO1xuICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYmFyY29kZVZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2JhcmNvZGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2JhcmNvZGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3N1cHBvcnRzVmlkZW9TdHJlYW0gPSBmYWxzZTtcbiAgZ2V0IHN1cHBvcnRzVmlkZW9TdHJlYW0oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3N1cHBvcnRzVmlkZW9TdHJlYW07XG4gIH1cblxuICBwcml2YXRlIF90b2dnbGUgPSAnZHJvcCc7XG4gIGdldCB0b2dnbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvZ2dsZTtcbiAgfVxuICBzZXQgdG9nZ2xlKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fdG9nZ2xlID0gdmFsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Nob3dTd2l0Y2hCdXR0b24gPSBmYWxzZTtcbiAgZ2V0IHNob3dTd2l0Y2hCdXR0b24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3Nob3dTd2l0Y2hCdXR0b247XG4gIH1cblxuICBwcml2YXRlIF9kZXZpY2VJZD86IHN0cmluZztcbiAgcHJpdmF0ZSBfc3RyZWFtcyA9IFtdIGFzIEFqZlZpZGVvRmFjaW5nTW9kZVtdO1xuICBwcml2YXRlIF9jdXJyZW50U3RyZWFtID0gLTE7XG4gIHByaXZhdGUgX3NjYW5uZXJDb250cm9scz86IElTY2FubmVyQ29udHJvbHM7XG4gIHByaXZhdGUgX2NvZGVSZWFkZXIgPSBuZXcgQnJvd3Nlck11bHRpRm9ybWF0UmVhZGVyKCk7XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX3N1cHBvcnRzVmlkZW9TdHJlYW0gPVxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAhPSBudWxsICYmXG4gICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmVudW1lcmF0ZURldmljZXMgIT0gbnVsbCAmJlxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEgIT0gbnVsbDtcbiAgICB0aGlzLl9pbml0VmlkZW9TdHJlYW1zKCk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIG9uU2VsZWN0RmlsZShldnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2dCA9PSBudWxsIHx8IGV2dC50YXJnZXQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgZmlsZXMgPSB0YXJnZXQuZmlsZXMgYXMgRmlsZUxpc3Q7XG4gICAgdGhpcy5fb25TZWxlY3QoZmlsZXMpO1xuICB9XG5cbiAgb25TZWxlY3REcm9wKGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29uU2VsZWN0KGZpbGVzKTtcbiAgfVxuXG4gIG9uVGFiQ2hhbmdlKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NjYW5uZXJDb250cm9scyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zY2FubmVyQ29udHJvbHMuc3RvcCgpO1xuICAgICAgdGhpcy5fc2Nhbm5lckNvbnRyb2xzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoaWR4ID09PSAxKSB7XG4gICAgICB0aGlzLl9zZXRDdXJyZW50U3RyZWFtKCk7XG4gICAgICBpZiAodGhpcy5iYXJjb2RlVmlkZW8gPT0gbnVsbCB8fCB0aGlzLmJhcmNvZGVWaWRlb1ByZXZpZXcgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCB2aWRlbyA9IHRoaXMuYmFyY29kZVZpZGVvLm5hdGl2ZUVsZW1lbnQ7XG4gICAgICBjb25zdCBwcmV2aWV3ID0gdGhpcy5iYXJjb2RlVmlkZW9QcmV2aWV3Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLl9yZW5kZXJlci5hZGRDbGFzcyhwcmV2aWV3LCAnYWpmLXZpZGVvLXByZXZpZXctaGlkZGVuJyk7XG4gICAgICB0aGlzLl9jb2RlUmVhZGVyXG4gICAgICAgIC5kZWNvZGVGcm9tVmlkZW9FbGVtZW50KHZpZGVvLCByZXN1bHQgPT4ge1xuICAgICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodGhpcy5fc2Nhbm5lckNvbnRyb2xzICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuX3NjYW5uZXJDb250cm9scy5zdG9wKCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgICAgY29uc3QgcG9pbnRzID0gcmVzdWx0LmdldFJlc3VsdFBvaW50cygpO1xuICAgICAgICAgIGNvbnN0IG53ID0gcG9pbnRzWzBdO1xuICAgICAgICAgIGNvbnN0IHNlID0gcG9pbnRzWzFdO1xuICAgICAgICAgIGNvbnN0IGx4ID0gTWF0aC5tYXgoKG53LmdldFgoKSAvIHZpZGVvLnZpZGVvV2lkdGgpICogdmlkZW8uY2xpZW50V2lkdGgsIC0xMCwgMCk7XG4gICAgICAgICAgY29uc3QgbHkgPSBNYXRoLm1heCgobncuZ2V0WSgpIC8gdmlkZW8udmlkZW9IZWlnaHQpICogdmlkZW8uY2xpZW50SGVpZ2h0IC0gMTAsIDApO1xuICAgICAgICAgIGNvbnN0IHJ4ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAoc2UuZ2V0WCgpIC8gdmlkZW8udmlkZW9XaWR0aCkgKiB2aWRlby5jbGllbnRXaWR0aCArIDEwLFxuICAgICAgICAgICAgdmlkZW8uY2xpZW50V2lkdGgsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCByeSA9IE1hdGgubWluKFxuICAgICAgICAgICAgKHNlLmdldFkoKSAvIHZpZGVvLnZpZGVvSGVpZ2h0KSAqIHZpZGVvLmNsaWVudEhlaWdodCArIDEwLFxuICAgICAgICAgICAgdmlkZW8uY2xpZW50SGVpZ2h0LFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUocHJldmlldywgJ3RvcCcsIGAke2x5fXB4YCk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUocHJldmlldywgJ2xlZnQnLCBgJHtseH1weGApO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHByZXZpZXcsICd3aWR0aCcsIGAke3J4IC0gbHh9cHhgKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShwcmV2aWV3LCAnaGVpZ2h0JywgYCR7cnkgLSBseX1weGApO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnJlbW92ZUNsYXNzKHByZXZpZXcsICdhamYtdmlkZW8tcHJldmlldy1oaWRkZW4nKTtcbiAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LmdldFRleHQoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLnRoZW4oY29udHJvbHMgPT4gKHRoaXMuX3NjYW5uZXJDb250cm9scyA9IGNvbnRyb2xzKSk7XG4gICAgfVxuICB9XG5cbiAgc3dpdGNoQ2FtZXJhKCk6IHZvaWQge1xuICAgIGNvbnN0IG5ld1N0cmVhbSA9ICh0aGlzLl9jdXJyZW50U3RyZWFtICsgMSkgJSB0aGlzLl9zdHJlYW1zLmxlbmd0aDtcbiAgICBpZiAobmV3U3RyZWFtID09PSB0aGlzLl9jdXJyZW50U3RyZWFtKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRTdHJlYW0gPSBuZXdTdHJlYW07XG4gICAgdGhpcy5fc2V0Q3VycmVudFN0cmVhbSgpO1xuICB9XG5cbiAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGltcGxlbWVudHMgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmFyY29kZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHByaXZhdGUgX29uU2VsZWN0KGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcyAhPSBudWxsICYmIGZpbGVzLmxlbmd0aCA+IDAgJiYgZmlsZXNbMF0pIHtcbiAgICAgIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlc1swXSk7XG4gICAgICByZWFkZXIub25sb2FkID0gKGV2OiBQcm9ncmVzc0V2ZW50KSA9PiB7XG4gICAgICAgIGlmICghZXYubG9hZGVkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGRhdGEgPSByZWFkZXIucmVzdWx0IGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5fc2V0SW1hZ2VQcmV2aWV3KGB1cmwoJHtkYXRhfSlgKTtcbiAgICAgICAgdGhpcy5fY29kZVJlYWRlclxuICAgICAgICAgIC5kZWNvZGVGcm9tSW1hZ2VVcmwoZGF0YSlcbiAgICAgICAgICAudGhlbihyZXMgPT4ge1xuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHJlcy5nZXRUZXh0KCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKCkgPT4ge30pO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9zZXRJbWFnZVByZXZpZXcoaW1nOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5iYXJjb2RlSW1hZ2VQcmV2aWV3ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYmFyY29kZUltYWdlUHJldmlldy5uYXRpdmVFbGVtZW50LCAnYmFja2dyb3VuZC1pbWFnZScsIGltZyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZpZGVvU3RyZWFtcygpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX3N1cHBvcnRzVmlkZW9TdHJlYW0pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgLmVudW1lcmF0ZURldmljZXMoKVxuICAgICAgLnRoZW4oZGV2aWNlcyA9PiB7XG4gICAgICAgIGNvbnN0IHZpZGVvRGV2aWNlcyA9IGRldmljZXMuZmlsdGVyKGRldmljZSA9PiBkZXZpY2Uua2luZCA9PT0gJ3ZpZGVvaW5wdXQnKTtcbiAgICAgICAgaWYgKHZpZGVvRGV2aWNlcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aGlzLl9zdXBwb3J0c1ZpZGVvU3RyZWFtID0gZmFsc2U7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyB2aWRlbyBkZXZpY2UgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdmlkZW9EZXZpY2VzWzBdO1xuICAgICAgfSlcbiAgICAgIC50aGVuKGRldmljZSA9PiB7XG4gICAgICAgIGNvbnN0IHtkZXZpY2VJZH0gPSBkZXZpY2U7XG4gICAgICAgIGNvbnN0IGZhY2luZ01vZGVzID0gWydlbnZpcm9ubWVudCcsICd1c2VyJ10gYXMgQWpmVmlkZW9GYWNpbmdNb2RlW107XG4gICAgICAgIGNvbnN0IHN0cmVhbVF1ZXJpZXMgPSBmYWNpbmdNb2Rlcy5tYXAoZmFjaW5nTW9kZSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgICAgICAgIC5nZXRVc2VyTWVkaWEoe1xuICAgICAgICAgICAgICBhdWRpbzogZmFsc2UsXG4gICAgICAgICAgICAgIHZpZGVvOiB7ZGV2aWNlSWQsIGFkdmFuY2VkOiBbe2ZhY2luZ01vZGV9XX0sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICAgLnRoZW4oc3RyZWFtID0+ICh7c3RyZWFtLCBmYWNpbmdNb2RlfSkpO1xuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fZGV2aWNlSWQgPSBkZXZpY2VJZDtcbiAgICAgICAgcmV0dXJuIFByb21pc2UuYWxsKHN0cmVhbVF1ZXJpZXMpO1xuICAgICAgfSlcbiAgICAgIC50aGVuKHN0cmVhbXMgPT4ge1xuICAgICAgICB0aGlzLl9zdHJlYW1zID0gW107XG4gICAgICAgIGNvbnN0IHRyYWNrc0lkcyA9IFtdIGFzIHN0cmluZ1tdO1xuICAgICAgICBjb25zdCB0cmFja3NMYWJlbHMgPSBbXSBhcyBzdHJpbmdbXTtcbiAgICAgICAgc3RyZWFtcy5mb3JFYWNoKCh7c3RyZWFtLCBmYWNpbmdNb2RlfSkgPT4ge1xuICAgICAgICAgIGlmIChzdHJlYW0gPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCB0cmFja3MgPSBzdHJlYW0uZ2V0VHJhY2tzKCk7XG4gICAgICAgICAgbGV0IGFkZFN0cmVhbSA9IGZhbHNlO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHRyYWNrcy5maW5kKHQgPT4gdHJhY2tzSWRzLmluZGV4T2YodC5pZCkgPT09IC0xICYmIHRyYWNrc0xhYmVscy5pbmRleE9mKHQubGFiZWwpID09PSAtMSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRyYWNrcy5mb3JFYWNoKHQgPT4ge1xuICAgICAgICAgICAgICB0cmFja3NJZHMucHVzaCh0LmlkKTtcbiAgICAgICAgICAgICAgdHJhY2tzTGFiZWxzLnB1c2godC5sYWJlbCk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGFkZFN0cmVhbSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhZGRTdHJlYW0pIHtcbiAgICAgICAgICAgIHRoaXMuX3N0cmVhbXMucHVzaChmYWNpbmdNb2RlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAodGhpcy5fc3RyZWFtcy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHN0cmVhbSBhdmFpbGFibGUnKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLl9zaG93U3dpdGNoQnV0dG9uID0gdGhpcy5fc3RyZWFtcy5sZW5ndGggPiAxO1xuICAgICAgICB0aGlzLl9jdXJyZW50U3RyZWFtID0gMDtcbiAgICAgICAgdGhpcy5fc2V0Q3VycmVudFN0cmVhbSgpO1xuICAgICAgfSlcbiAgICAgIC5jYXRjaCgoKSA9PiAodGhpcy5fc3VwcG9ydHNWaWRlb1N0cmVhbSA9IGZhbHNlKSlcbiAgICAgIC5maW5hbGx5KCgpID0+IHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKSk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRDdXJyZW50U3RyZWFtKCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuYmFyY29kZVZpZGVvID09IG51bGwgfHxcbiAgICAgIHRoaXMuX2RldmljZUlkID09IG51bGwgfHxcbiAgICAgIHRoaXMuX3N0cmVhbXMubGVuZ3RoID09PSAwIHx8XG4gICAgICB0aGlzLl9jdXJyZW50U3RyZWFtIDwgMCB8fFxuICAgICAgdGhpcy5fY3VycmVudFN0cmVhbSA+PSB0aGlzLl9zdHJlYW1zLmxlbmd0aFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB2aWRlbyA9IHRoaXMuYmFyY29kZVZpZGVvLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3QgZmFjaW5nTW9kZSA9IHRoaXMuX3N0cmVhbXNbdGhpcy5fY3VycmVudFN0cmVhbV07XG4gICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlc1xuICAgICAgLmdldFVzZXJNZWRpYSh7XG4gICAgICAgIGF1ZGlvOiBmYWxzZSxcbiAgICAgICAgdmlkZW86IHtkZXZpY2VJZDogdGhpcy5fZGV2aWNlSWQsIGFkdmFuY2VkOiBbe2ZhY2luZ01vZGV9XX0sXG4gICAgICB9KVxuICAgICAgLnRoZW4oc3RyZWFtID0+IHtcbiAgICAgICAgdmlkZW8uc3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==