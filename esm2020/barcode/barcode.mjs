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
import { Directive, ElementRef, EventEmitter, ViewChild, } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { from, throwError } from 'rxjs';
import { catchError, map, take, tap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class AjfBarcode {
    constructor(_cdr, _renderer) {
        this._cdr = _cdr;
        this._renderer = _renderer;
        this.resetEvt = new EventEmitter();
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
        /**
         * The mediastream currently being streamed
         */
        this._currentVideoStream = null;
        this._codeReader = new BrowserMultiFormatReader();
        this._onChangeCallback = (_) => { };
        this._onTouchedCallback = () => { };
        this._supportsVideoStream =
            navigator.mediaDevices != null && navigator.mediaDevices.enumerateDevices != null;
        this._videoDevices = this._getVideoDevices();
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
    get videoDevices() {
        return this._videoDevices;
    }
    get currentVideoStream() {
        return this._currentVideoStream;
    }
    reset() {
        this.value = '';
        const video = this.barcodeVideo?.nativeElement ?? null;
        this.resetEvt.emit();
        this.initVideoStreams();
        if (video) {
            video.play();
        }
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
            this.initVideoStreams();
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
                .then(controls => {
                this._scannerControls = controls;
                this.stopCurrentStream();
                video.pause();
            });
        }
    }
    switchCamera() {
        this.initVideoStreams();
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
    initVideoStreams() {
        this.getStream().pipe(take(1)).subscribe();
    }
    /**
     * Gets all video mediaDevices (cameras)
     * @returns An observable with all video mediaDevices
     */
    _getVideoDevices() {
        return from(navigator.mediaDevices.enumerateDevices()).pipe(map(devices => devices.filter(device => device.kind === 'videoinput')));
    }
    /**
     * Gets the current video stream and updates the video element source
     * @returns An observable of the current media stream
     */
    getStream() {
        if (this._currentVideoStream) {
            this._currentVideoStream.getTracks().forEach(track => {
                track.stop();
            });
        }
        const videoSource = this.videoSourceSelect?.value;
        const constraints = {
            video: { deviceId: videoSource ? { exact: videoSource } : undefined },
        };
        return from(navigator.mediaDevices.getUserMedia(constraints)).pipe(tap(stream => {
            this._gotStream(stream);
        }), catchError(err => throwError(() => err)));
    }
    /**
     * Updates the video element source with the current video stream
     * @param stream The video stream
     */
    _gotStream(stream) {
        this._currentVideoStream = stream;
        if (this.barcodeVideo) {
            this.barcodeVideo.nativeElement.srcObject = stream;
        }
        this._cdr.markForCheck();
    }
    stopCurrentStream() {
        if (this.barcodeVideo == undefined) {
            return;
        }
        const video = this.barcodeVideo.nativeElement;
        const stream = video.srcObject;
        if (stream == null)
            return;
        const tracks = stream.getVideoTracks();
        tracks.forEach(track => track.stop());
    }
}
AjfBarcode.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfBarcode, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
AjfBarcode.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfBarcode, viewQueries: [{ propertyName: "barcodeVideo", first: true, predicate: ["barcodeVideo"], descendants: true, read: ElementRef }, { propertyName: "barcodeVideoPreview", first: true, predicate: ["barcodeVideoPreview"], descendants: true, read: ElementRef }, { propertyName: "barcodeImagePreview", first: true, predicate: ["barcodeImagePreview"], descendants: true, read: ElementRef }, { propertyName: "videoSourceSelect", first: true, predicate: ["videoSourceSelect"], descendants: true }], ngImport: i0 });
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
            }], videoSourceSelect: [{
                type: ViewChild,
                args: ['videoSourceSelect']
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvYmFyY29kZS9zcmMvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBRVosU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyx3QkFBd0IsRUFBbUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRSxPQUFPLEVBQWEsSUFBSSxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBRzFELE1BQU0sT0FBZ0IsVUFBVTtJQW1GOUIsWUFBc0IsSUFBdUIsRUFBVSxTQUFvQjtRQUFyRCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFsRjNFLGFBQVEsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQXVCeEQ7Ozs7O1dBS0c7UUFDSyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQVluQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFLN0IsWUFBTyxHQUFHLE1BQU0sQ0FBQztRQVNqQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFhbEM7O1dBRUc7UUFDSyx3QkFBbUIsR0FBdUIsSUFBSSxDQUFDO1FBTS9DLGdCQUFXLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1FBRTdDLHNCQUFpQixHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDbkMsdUJBQWtCLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBR3BDLElBQUksQ0FBQyxvQkFBb0I7WUFDdkIsU0FBUyxDQUFDLFlBQVksSUFBSSxJQUFJ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LEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQztnQkFHcEQsbUJBQW1CO3NCQURsQixTQUFTO3VCQUFDLHFCQUFxQixFQUFFLEVBQUMsSUFBSSxFQUFFLFVBQVUsRUFBQztnQkFLcEIsaUJBQWlCO3NCQUFoRCxTQUFTO3VCQUFDLG1CQUFtQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge01hdFNlbGVjdH0gZnJvbSAnQGFuZ3VsYXIvbWF0ZXJpYWwvc2VsZWN0JztcbmltcG9ydCB7QnJvd3Nlck11bHRpRm9ybWF0UmVhZGVyLCBJU2Nhbm5lckNvbnRyb2xzfSBmcm9tICdAenhpbmcvYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIGZyb20sIHRocm93RXJyb3J9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBtYXAsIHRha2UsIHRhcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZCYXJjb2RlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICByZXNldEV2dDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAVmlld0NoaWxkKCdiYXJjb2RlVmlkZW8nLCB7cmVhZDogRWxlbWVudFJlZn0pIGJhcmNvZGVWaWRlbzpcbiAgICB8IEVsZW1lbnRSZWY8SFRNTFZpZGVvRWxlbWVudD5cbiAgICB8IHVuZGVmaW5lZDtcbiAgQFZpZXdDaGlsZCgnYmFyY29kZVZpZGVvUHJldmlldycsIHtyZWFkOiBFbGVtZW50UmVmfSlcbiAgYmFyY29kZVZpZGVvUHJldmlldyE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdiYXJjb2RlSW1hZ2VQcmV2aWV3Jywge3JlYWQ6IEVsZW1lbnRSZWZ9KVxuICBiYXJjb2RlSW1hZ2VQcmV2aWV3ITogRWxlbWVudFJlZjxIVE1MSW1hZ2VFbGVtZW50PjtcbiAgLyoqXG4gICAqIFRoZSBNYXQgc2VsZWN0IGNvbXBvbmVudCBmb3IgY2hvb3NpbmcgdGhlIHByZWZlcnJlZCB2aWRlbyBzb3VyY2VcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3ZpZGVvU291cmNlU2VsZWN0JykgdmlkZW9Tb3VyY2VTZWxlY3QhOiBNYXRTZWxlY3Q7XG5cbiAgLyoqXG4gICAqIEEgaHRtbCB2aWRlbyBlbGVtZW50IGNyZWF0ZWQgYXQgcnVudGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfdmlkZW8/OiBIVE1MVmlkZW9FbGVtZW50O1xuICBnZXQgdmlkZW9Tb3VyY2UoKTogSFRNTFZpZGVvRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZGVvO1xuICB9XG5cbiAgLyoqXG4gICAqIGltcGxlbWVudCB0aGUgY29udHJvbCBmb3JtIHZhbHVlLlxuICAgKiByYXBwcmVzZW50IHRoZSBiYXJjb2RlIHZhbHVlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfYmFyY29kZVZhbHVlID0gJyc7XG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9iYXJjb2RlVmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fYmFyY29kZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYmFyY29kZVZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc3VwcG9ydHNWaWRlb1N0cmVhbSA9IGZhbHNlO1xuICBnZXQgc3VwcG9ydHNWaWRlb1N0cmVhbSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3VwcG9ydHNWaWRlb1N0cmVhbTtcbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZSA9ICdkcm9wJztcbiAgZ2V0IHRvZ2dsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9nZ2xlO1xuICB9XG4gIHNldCB0b2dnbGUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90b2dnbGUgPSB2YWw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd1N3aXRjaEJ1dHRvbiA9IGZhbHNlO1xuICBnZXQgc2hvd1N3aXRjaEJ1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd1N3aXRjaEJ1dHRvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIG9mIGFsbCB2aWRlbyBtZWRpYURldmljZXNcbiAgICovXG4gIHByaXZhdGUgX3ZpZGVvRGV2aWNlczogT2JzZXJ2YWJsZTxNZWRpYURldmljZUluZm9bXT47XG4gIGdldCB2aWRlb0RldmljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZGVvRGV2aWNlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWVkaWFzdHJlYW0gY3VycmVudGx5IGJlaW5nIHN0cmVhbWVkXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50VmlkZW9TdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCA9IG51bGw7XG4gIGdldCBjdXJyZW50VmlkZW9TdHJlYW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWRlb1N0cmVhbTtcbiAgfVxuXG4gIHByaXZhdGUgX3NjYW5uZXJDb250cm9scz86IElTY2FubmVyQ29udHJvbHM7XG4gIHByaXZhdGUgX2NvZGVSZWFkZXIgPSBuZXcgQnJvd3Nlck11bHRpRm9ybWF0UmVhZGVyKCk7XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX3N1cHBvcnRzVmlkZW9TdHJlYW0gPVxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAhPSBudWxsICYmIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyAhPSBudWxsO1xuICAgIHRoaXMuX3ZpZGVvRGV2aWNlcyA9IHRoaXMuX2dldFZpZGVvRGV2aWNlcygpO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIGNvbnN0IHZpZGVvID0gdGhpcy5iYXJjb2RlVmlkZW8/Lm5hdGl2ZUVsZW1lbnQgPz8gbnVsbDtcbiAgICB0aGlzLnJlc2V0RXZ0LmVtaXQoKTtcbiAgICB0aGlzLmluaXRWaWRlb1N0cmVhbXMoKTtcbiAgICBpZiAodmlkZW8pIHtcbiAgICAgIHZpZGVvLnBsYXkoKTtcbiAgICB9XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIG9uU2VsZWN0RmlsZShldnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2dCA9PSBudWxsIHx8IGV2dC50YXJnZXQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgZmlsZXMgPSB0YXJnZXQuZmlsZXMgYXMgRmlsZUxpc3Q7XG4gICAgdGhpcy5fb25TZWxlY3QoZmlsZXMpO1xuICB9XG5cbiAgb25TZWxlY3REcm9wKGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29uU2VsZWN0KGZpbGVzKTtcbiAgfVxuXG4gIG9uVGFiQ2hhbmdlKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NjYW5uZXJDb250cm9scyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zY2FubmVyQ29udHJvbHMuc3RvcCgpO1xuICAgICAgdGhpcy5fc2Nhbm5lckNvbnRyb2xzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoaWR4ID09PSAxKSB7XG4gICAgICB0aGlzLmluaXRWaWRlb1N0cmVhbXMoKTtcbiAgICAgIGlmICh0aGlzLmJhcmNvZGVWaWRlbyA9PSBudWxsIHx8IHRoaXMuYmFyY29kZVZpZGVvUHJldmlldyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5iYXJjb2RlVmlkZW8ubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IHByZXZpZXcgPSB0aGlzLmJhcmNvZGVWaWRlb1ByZXZpZXcubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHByZXZpZXcsICdhamYtdmlkZW8tcHJldmlldy1oaWRkZW4nKTtcbiAgICAgIHRoaXMuX2NvZGVSZWFkZXJcbiAgICAgICAgLmRlY29kZUZyb21WaWRlb0VsZW1lbnQodmlkZW8sIHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9zY2FubmVyQ29udHJvbHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc2Nhbm5lckNvbnRyb2xzLnN0b3AoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwb2ludHMgPSByZXN1bHQuZ2V0UmVzdWx0UG9pbnRzKCk7XG4gICAgICAgICAgY29uc3QgbncgPSBwb2ludHNbMF07XG4gICAgICAgICAgY29uc3Qgc2UgPSBwb2ludHNbMV07XG4gICAgICAgICAgY29uc3QgbHggPSBNYXRoLm1heCgobncuZ2V0WCgpIC8gdmlkZW8udmlkZW9XaWR0aCkgKiB2aWRlby5jbGllbnRXaWR0aCwgLTEwLCAwKTtcbiAgICAgICAgICBjb25zdCBseSA9IE1hdGgubWF4KChudy5nZXRZKCkgLyB2aWRlby52aWRlb0hlaWdodCkgKiB2aWRlby5jbGllbnRIZWlnaHQgLSAxMCwgMCk7XG4gICAgICAgICAgY29uc3QgcnggPSBNYXRoLm1pbihcbiAgICAgICAgICAgIChzZS5nZXRYKCkgLyB2aWRlby52aWRlb1dpZHRoKSAqIHZpZGVvLmNsaWVudFdpZHRoICsgMTAsXG4gICAgICAgICAgICB2aWRlby5jbGllbnRXaWR0aCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHJ5ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAoc2UuZ2V0WSgpIC8gdmlkZW8udmlkZW9IZWlnaHQpICogdmlkZW8uY2xpZW50SGVpZ2h0ICsgMTAsXG4gICAgICAgICAgICB2aWRlby5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShwcmV2aWV3LCAndG9wJywgYCR7bHl9cHhgKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShwcmV2aWV3LCAnbGVmdCcsIGAke2x4fXB4YCk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUocHJldmlldywgJ3dpZHRoJywgYCR7cnggLSBseH1weGApO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHByZXZpZXcsICdoZWlnaHQnLCBgJHtyeSAtIGx5fXB4YCk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MocHJldmlldywgJ2FqZi12aWRlby1wcmV2aWV3LWhpZGRlbicpO1xuICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHQuZ2V0VGV4dCgpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjb250cm9scyA9PiB7XG4gICAgICAgICAgdGhpcy5fc2Nhbm5lckNvbnRyb2xzID0gY29udHJvbHM7XG4gICAgICAgICAgdGhpcy5zdG9wQ3VycmVudFN0cmVhbSgpO1xuICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN3aXRjaENhbWVyYSgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRWaWRlb1N0cmVhbXMoKTtcbiAgfVxuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRzICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JhcmNvZGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwcml2YXRlIF9vblNlbGVjdChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMgIT0gbnVsbCAmJiBmaWxlcy5sZW5ndGggPiAwICYmIGZpbGVzWzBdKSB7XG4gICAgICBsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZXNbMF0pO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IChldjogUHJvZ3Jlc3NFdmVudCkgPT4ge1xuICAgICAgICBpZiAoIWV2LmxvYWRlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gcmVhZGVyLnJlc3VsdCBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuX3NldEltYWdlUHJldmlldyhgdXJsKCR7ZGF0YX0pYCk7XG4gICAgICAgIHRoaXMuX2NvZGVSZWFkZXJcbiAgICAgICAgICAuZGVjb2RlRnJvbUltYWdlVXJsKGRhdGEpXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSByZXMuZ2V0VGV4dCgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0SW1hZ2VQcmV2aWV3KGltZzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYmFyY29kZUltYWdlUHJldmlldyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhcmNvZGVJbWFnZVByZXZpZXcubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtaW1hZ2UnLCBpbWcpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0VmlkZW9TdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuZ2V0U3RyZWFtKCkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB2aWRlbyBtZWRpYURldmljZXMgKGNhbWVyYXMpXG4gICAqIEByZXR1cm5zIEFuIG9ic2VydmFibGUgd2l0aCBhbGwgdmlkZW8gbWVkaWFEZXZpY2VzXG4gICAqL1xuICBwcml2YXRlIF9nZXRWaWRlb0RldmljZXMoKTogT2JzZXJ2YWJsZTxNZWRpYURldmljZUluZm9bXT4ge1xuICAgIHJldHVybiBmcm9tKG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpKS5waXBlKFxuICAgICAgbWFwKGRldmljZXMgPT4gZGV2aWNlcy5maWx0ZXIoZGV2aWNlID0+IGRldmljZS5raW5kID09PSAndmlkZW9pbnB1dCcpKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgdmlkZW8gc3RyZWFtIGFuZCB1cGRhdGVzIHRoZSB2aWRlbyBlbGVtZW50IHNvdXJjZVxuICAgKiBAcmV0dXJucyBBbiBvYnNlcnZhYmxlIG9mIHRoZSBjdXJyZW50IG1lZGlhIHN0cmVhbVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFN0cmVhbSgpOiBPYnNlcnZhYmxlPE1lZGlhU3RyZWFtPiB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRWaWRlb1N0cmVhbSkge1xuICAgICAgdGhpcy5fY3VycmVudFZpZGVvU3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2godHJhY2sgPT4ge1xuICAgICAgICB0cmFjay5zdG9wKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdmlkZW9Tb3VyY2U6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMudmlkZW9Tb3VyY2VTZWxlY3Q/LnZhbHVlIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBjb25zdHJhaW50cyA9IHtcbiAgICAgIHZpZGVvOiB7ZGV2aWNlSWQ6IHZpZGVvU291cmNlID8ge2V4YWN0OiB2aWRlb1NvdXJjZX0gOiB1bmRlZmluZWR9LFxuICAgIH07XG4gICAgcmV0dXJuIGZyb20obmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpKS5waXBlKFxuICAgICAgdGFwKHN0cmVhbSA9PiB7XG4gICAgICAgIHRoaXMuX2dvdFN0cmVhbShzdHJlYW0pO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB0aHJvd0Vycm9yKCgpID0+IGVycikpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlkZW8gZWxlbWVudCBzb3VyY2Ugd2l0aCB0aGUgY3VycmVudCB2aWRlbyBzdHJlYW1cbiAgICogQHBhcmFtIHN0cmVhbSBUaGUgdmlkZW8gc3RyZWFtXG4gICAqL1xuICBwcml2YXRlIF9nb3RTdHJlYW0oc3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwpIHtcbiAgICB0aGlzLl9jdXJyZW50VmlkZW9TdHJlYW0gPSBzdHJlYW07XG4gICAgaWYgKHRoaXMuYmFyY29kZVZpZGVvKSB7XG4gICAgICB0aGlzLmJhcmNvZGVWaWRlby5uYXRpdmVFbGVtZW50LnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICB9XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc3RvcEN1cnJlbnRTdHJlYW0oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYmFyY29kZVZpZGVvID09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB2aWRlbyA9IHRoaXMuYmFyY29kZVZpZGVvLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3Qgc3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwgPSB2aWRlby5zcmNPYmplY3QgYXMgTWVkaWFTdHJlYW0gfCBudWxsO1xuICAgIGlmIChzdHJlYW0gPT0gbnVsbCkgcmV0dXJuO1xuICAgIGNvbnN0IHRyYWNrcyA9IHN0cmVhbS5nZXRWaWRlb1RyYWNrcygpO1xuICAgIHRyYWNrcy5mb3JFYWNoKHRyYWNrID0+IHRyYWNrLnN0b3AoKSk7XG4gIH1cbn1cbiJdfQ==