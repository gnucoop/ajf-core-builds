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
        const video = this.barcodeVideo.nativeElement;
        this.resetEvt.emit();
        this.initVideoStreams();
        video.play();
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
        this.barcodeVideo.nativeElement.srcObject = stream;
        this._cdr.markForCheck();
    }
    stopCurrentStream() {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvYmFyY29kZS9zcmMvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBRVosU0FBUyxHQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCLE9BQU8sRUFBQyx3QkFBd0IsRUFBbUIsTUFBTSxnQkFBZ0IsQ0FBQztBQUMxRSxPQUFPLEVBQWEsSUFBSSxFQUFFLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUNsRCxPQUFPLEVBQUMsVUFBVSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsR0FBRyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7O0FBRzFELE1BQU0sT0FBZ0IsVUFBVTtJQWlGOUIsWUFBc0IsSUFBdUIsRUFBVSxTQUFvQjtRQUFyRCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFoRjNFLGFBQVEsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQXFCeEQ7Ozs7O1dBS0c7UUFDSyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQVluQix5QkFBb0IsR0FBRyxLQUFLLENBQUM7UUFLN0IsWUFBTyxHQUFHLE1BQU0sQ0FBQztRQVNqQixzQkFBaUIsR0FBRyxLQUFLLENBQUM7UUFhbEM7O1dBRUc7UUFDSyx3QkFBbUIsR0FBdUIsSUFBSSxDQUFDO1FBTS9DLGdCQUFXLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1FBRTdDLHNCQUFpQixHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDbkMsdUJBQWtCLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBR3BDLElBQUksQ0FBQyxvQkFBb0I7WUFDdkIsU0FBUyxDQUFDLFlBQVksSUFBSSxJQUFJLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLENBQUM7UUFDcEYsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQztJQUMvQyxDQUFDO0lBbkVELElBQUksV0FBVztRQUNiLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUNyQixDQUFDO0lBU0QsSUFBSSxLQUFLO1FBQ1AsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFDRCxJQUFJLEtBQUssQ0FBQyxLQUFhO1FBQ3JCLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxLQUFLLEVBQUU7WUFDaEMsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztZQUMxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDL0I7SUFDSCxDQUFDO0lBR0QsSUFBSSxtQkFBbUI7UUFDckIsT0FBTyxJQUFJLENBQUMsb0JBQW9CLENBQUM7SUFDbkMsQ0FBQztJQUdELElBQUksTUFBTTtRQUNSLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQztJQUN0QixDQUFDO0lBQ0QsSUFBSSxNQUFNLENBQUMsR0FBVztRQUNwQixJQUFJLENBQUMsT0FBTyxHQUFHLEdBQUcsQ0FBQztRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFHRCxJQUFJLGdCQUFnQjtRQUNsQixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNoQyxDQUFDO0lBTUQsSUFBSSxZQUFZO1FBQ2QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzVCLENBQUM7SUFNRCxJQUFJLGtCQUFrQjtRQUNwQixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FBQztJQUNsQyxDQUFDO0lBY0QsS0FBSztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDO1FBQ2hCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1FBQzlDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDckIsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7UUFDeEIsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ2IsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUIsQ0FBQztJQUVELFlBQVksQ0FBQyxHQUFVO1FBQ3JCLElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLENBQUMsTUFBTSxJQUFJLElBQUksRUFBRTtZQUNyQyxPQUFPO1NBQ1I7UUFDRCxNQUFNLE1BQU0sR0FBRyxHQUFHLENBQUMsTUFBMEIsQ0FBQztRQUM5QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsS0FBaUIsQ0FBQztRQUN2QyxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3hCLENBQUM7SUFFRCxZQUFZLENBQUMsS0FBZTtRQUMxQixJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7WUFDakIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVyxDQUFDLEdBQVc7UUFDckIsSUFBSSxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsU0FBUyxDQUFDO1NBQ25DO1FBQ0QsSUFBSSxHQUFHLEtBQUssQ0FBQyxFQUFFO1lBQ2IsSUFBSSxDQUFDLGdCQUFnQixFQUFFLENBQUM7WUFDeEIsSUFBSSxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsbUJBQW1CLElBQUksSUFBSSxFQUFFO2dCQUNqRSxPQUFPO2FBQ1I7WUFDRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztZQUM5QyxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsbUJBQW1CLENBQUMsYUFBYSxDQUFDO1lBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSwwQkFBMEIsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxXQUFXO2lCQUNiLHNCQUFzQixDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsRUFBRTtnQkFDdEMsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO29CQUNsQixPQUFPO2lCQUNSO2dCQUNELElBQUksSUFBSSxDQUFDLGdCQUFnQixJQUFJLElBQUksRUFBRTtvQkFDakMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFDO2lCQUM5QjtnQkFFRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsZUFBZSxFQUFFLENBQUM7Z0JBQ3hDLE1BQU0sRUFBRSxHQUFHLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDckIsTUFBTSxFQUFFLEdBQUcsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNyQixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUMsR0FBRyxLQUFLLENBQUMsV0FBVyxFQUFFLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO2dCQUNoRixNQUFNLEVBQUUsR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDbEYsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FDakIsQ0FBQyxFQUFFLENBQUMsSUFBSSxFQUFFLEdBQUcsS0FBSyxDQUFDLFVBQVUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxXQUFXLEdBQUcsRUFBRSxFQUN2RCxLQUFLLENBQUMsV0FBVyxDQUNsQixDQUFDO2dCQUNGLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ2pCLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEtBQUssQ0FBQyxXQUFXLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxHQUFHLEVBQUUsRUFDekQsS0FBSyxDQUFDLFlBQVksQ0FDbkIsQ0FBQztnQkFDRixJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxPQUFPLEVBQUUsS0FBSyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDbkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBQ3BELElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLE9BQU8sRUFBRSxPQUFPLEVBQUUsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsT0FBTyxFQUFFLFFBQVEsRUFBRSxHQUFHLEVBQUUsR0FBRyxFQUFFLElBQUksQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsMEJBQTBCLENBQUMsQ0FBQztnQkFDaEUsSUFBSSxDQUFDLEtBQUssR0FBRyxNQUFNLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxRQUFRLENBQUMsRUFBRTtnQkFDZixJQUFJLENBQUMsZ0JBQWdCLEdBQUcsUUFBUSxDQUFDO2dCQUNqQyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztnQkFDekIsS0FBSyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2hCLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDSCxDQUFDO0lBRUQsWUFBWTtRQUNWLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO0lBQzFCLENBQUM7SUFFRCxzQ0FBc0M7SUFDdEMsVUFBVSxDQUFDLEtBQWE7UUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVELGdCQUFnQixDQUFDLEVBQXdCO1FBQ3ZDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELGlCQUFpQixDQUFDLEVBQWM7UUFDOUIsSUFBSSxDQUFDLGtCQUFrQixHQUFHLEVBQUUsQ0FBQztJQUMvQixDQUFDO0lBRU8sU0FBUyxDQUFDLEtBQWU7UUFDL0IsSUFBSSxLQUFLLElBQUksSUFBSSxJQUFJLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxJQUFJLEtBQUssQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNqRCxJQUFJLE1BQU0sR0FBRyxJQUFJLFVBQVUsRUFBRSxDQUFDO1lBRTlCLE1BQU0sQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDL0IsTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQWlCLEVBQUUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUU7b0JBQ2QsT0FBTztpQkFDUjtnQkFDRCxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsTUFBZ0IsQ0FBQztnQkFDckMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sSUFBSSxHQUFHLENBQUMsQ0FBQztnQkFDdEMsSUFBSSxDQUFDLFdBQVc7cUJBQ2Isa0JBQWtCLENBQUMsSUFBSSxDQUFDO3FCQUN4QixJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7b0JBQ1YsSUFBSSxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxFQUFFLENBQUM7Z0JBQzdCLENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDLENBQUM7WUFDckIsQ0FBQyxDQUFDO1NBQ0g7SUFDSCxDQUFDO0lBRU8sZ0JBQWdCLENBQUMsR0FBVztRQUNsQyxJQUFJLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLGFBQWEsRUFBRSxrQkFBa0IsRUFBRSxHQUFHLENBQUMsQ0FBQztTQUMxRjtJQUNILENBQUM7SUFFUyxnQkFBZ0I7UUFDeEIsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxTQUFTLEVBQUUsQ0FBQztJQUM3QyxDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssZ0JBQWdCO1FBQ3RCLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FDekQsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssWUFBWSxDQUFDLENBQUMsQ0FDdkUsQ0FBQztJQUNKLENBQUM7SUFFRDs7O09BR0c7SUFDTyxTQUFTO1FBQ2pCLElBQUksSUFBSSxDQUFDLG1CQUFtQixFQUFFO1lBQzVCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ25ELEtBQUssQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUNmLENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxNQUFNLFdBQVcsR0FBdUIsSUFBSSxDQUFDLGlCQUFpQixFQUFFLEtBQTJCLENBQUM7UUFDNUYsTUFBTSxXQUFXLEdBQUc7WUFDbEIsS0FBSyxFQUFFLEVBQUMsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDLENBQUMsRUFBQyxLQUFLLEVBQUUsV0FBVyxFQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsRUFBQztTQUNsRSxDQUFDO1FBQ0YsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQ2hFLEdBQUcsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNYLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDMUIsQ0FBQyxDQUFDLEVBQ0YsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ3pDLENBQUM7SUFDSixDQUFDO0lBRUQ7OztPQUdHO0lBQ0ssVUFBVSxDQUFDLE1BQTBCO1FBQzNDLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxNQUFNLENBQUM7UUFDbEMsSUFBSSxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFFRCxpQkFBaUI7UUFDZixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQztRQUM5QyxNQUFNLE1BQU0sR0FBdUIsS0FBSyxDQUFDLFNBQStCLENBQUM7UUFDekUsSUFBSSxNQUFNLElBQUksSUFBSTtZQUFFLE9BQU87UUFDM0IsTUFBTSxNQUFNLEdBQUcsTUFBTSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3ZDLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztJQUN4QyxDQUFDOzt1R0FsUW1CLFVBQVU7MkZBQVYsVUFBVSxtSEFFSSxVQUFVLHFIQUNILFVBQVUscUhBRVYsVUFBVTsyRkFML0IsVUFBVTtrQkFEL0IsU0FBUztnSUFHdUMsWUFBWTtzQkFBMUQsU0FBUzt1QkFBQyxjQUFjLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO2dCQUU3QyxtQkFBbUI7c0JBRGxCLFNBQVM7dUJBQUMscUJBQXFCLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO2dCQUdwRCxtQkFBbUI7c0JBRGxCLFNBQVM7dUJBQUMscUJBQXFCLEVBQUUsRUFBQyxJQUFJLEVBQUUsVUFBVSxFQUFDO2dCQUtwQixpQkFBaUI7c0JBQWhELFNBQVM7dUJBQUMsbUJBQW1CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7TWF0U2VsZWN0fSBmcm9tICdAYW5ndWxhci9tYXRlcmlhbC9zZWxlY3QnO1xuaW1wb3J0IHtCcm93c2VyTXVsdGlGb3JtYXRSZWFkZXIsIElTY2FubmVyQ29udHJvbHN9IGZyb20gJ0B6eGluZy9icm93c2VyJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgZnJvbSwgdGhyb3dFcnJvcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIG1hcCwgdGFrZSwgdGFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkJhcmNvZGUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIHJlc2V0RXZ0OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBWaWV3Q2hpbGQoJ2JhcmNvZGVWaWRlbycsIHtyZWFkOiBFbGVtZW50UmVmfSkgYmFyY29kZVZpZGVvITogRWxlbWVudFJlZjxIVE1MVmlkZW9FbGVtZW50PjtcbiAgQFZpZXdDaGlsZCgnYmFyY29kZVZpZGVvUHJldmlldycsIHtyZWFkOiBFbGVtZW50UmVmfSlcbiAgYmFyY29kZVZpZGVvUHJldmlldyE6IEVsZW1lbnRSZWY8SFRNTERpdkVsZW1lbnQ+O1xuICBAVmlld0NoaWxkKCdiYXJjb2RlSW1hZ2VQcmV2aWV3Jywge3JlYWQ6IEVsZW1lbnRSZWZ9KVxuICBiYXJjb2RlSW1hZ2VQcmV2aWV3ITogRWxlbWVudFJlZjxIVE1MSW1hZ2VFbGVtZW50PjtcbiAgLyoqXG4gICAqIFRoZSBNYXQgc2VsZWN0IGNvbXBvbmVudCBmb3IgY2hvb3NpbmcgdGhlIHByZWZlcnJlZCB2aWRlbyBzb3VyY2VcbiAgICovXG4gIEBWaWV3Q2hpbGQoJ3ZpZGVvU291cmNlU2VsZWN0JykgdmlkZW9Tb3VyY2VTZWxlY3QhOiBNYXRTZWxlY3Q7XG5cbiAgLyoqXG4gICAqIEEgaHRtbCB2aWRlbyBlbGVtZW50IGNyZWF0ZWQgYXQgcnVudGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfdmlkZW8/OiBIVE1MVmlkZW9FbGVtZW50O1xuICBnZXQgdmlkZW9Tb3VyY2UoKTogSFRNTFZpZGVvRWxlbWVudCB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZGVvO1xuICB9XG5cbiAgLyoqXG4gICAqIGltcGxlbWVudCB0aGUgY29udHJvbCBmb3JtIHZhbHVlLlxuICAgKiByYXBwcmVzZW50IHRoZSBiYXJjb2RlIHZhbHVlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfYmFyY29kZVZhbHVlID0gJyc7XG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9iYXJjb2RlVmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fYmFyY29kZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYmFyY29kZVZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc3VwcG9ydHNWaWRlb1N0cmVhbSA9IGZhbHNlO1xuICBnZXQgc3VwcG9ydHNWaWRlb1N0cmVhbSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc3VwcG9ydHNWaWRlb1N0cmVhbTtcbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZSA9ICdkcm9wJztcbiAgZ2V0IHRvZ2dsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9nZ2xlO1xuICB9XG4gIHNldCB0b2dnbGUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90b2dnbGUgPSB2YWw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd1N3aXRjaEJ1dHRvbiA9IGZhbHNlO1xuICBnZXQgc2hvd1N3aXRjaEJ1dHRvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2hvd1N3aXRjaEJ1dHRvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBBbiBvYnNlcnZhYmxlIG9mIGFsbCB2aWRlbyBtZWRpYURldmljZXNcbiAgICovXG4gIHByaXZhdGUgX3ZpZGVvRGV2aWNlczogT2JzZXJ2YWJsZTxNZWRpYURldmljZUluZm9bXT47XG4gIGdldCB2aWRlb0RldmljZXMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZGVvRGV2aWNlcztcbiAgfVxuXG4gIC8qKlxuICAgKiBUaGUgbWVkaWFzdHJlYW0gY3VycmVudGx5IGJlaW5nIHN0cmVhbWVkXG4gICAqL1xuICBwcml2YXRlIF9jdXJyZW50VmlkZW9TdHJlYW06IE1lZGlhU3RyZWFtIHwgbnVsbCA9IG51bGw7XG4gIGdldCBjdXJyZW50VmlkZW9TdHJlYW0oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRWaWRlb1N0cmVhbTtcbiAgfVxuXG4gIHByaXZhdGUgX3NjYW5uZXJDb250cm9scz86IElTY2FubmVyQ29udHJvbHM7XG4gIHByaXZhdGUgX2NvZGVSZWFkZXIgPSBuZXcgQnJvd3Nlck11bHRpRm9ybWF0UmVhZGVyKCk7XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByb3RlY3RlZCBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX3N1cHBvcnRzVmlkZW9TdHJlYW0gPVxuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAhPSBudWxsICYmIG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcyAhPSBudWxsO1xuICAgIHRoaXMuX3ZpZGVvRGV2aWNlcyA9IHRoaXMuX2dldFZpZGVvRGV2aWNlcygpO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIGNvbnN0IHZpZGVvID0gdGhpcy5iYXJjb2RlVmlkZW8ubmF0aXZlRWxlbWVudDtcbiAgICB0aGlzLnJlc2V0RXZ0LmVtaXQoKTtcbiAgICB0aGlzLmluaXRWaWRlb1N0cmVhbXMoKTtcbiAgICB2aWRlby5wbGF5KCk7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIG9uU2VsZWN0RmlsZShldnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2dCA9PSBudWxsIHx8IGV2dC50YXJnZXQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgZmlsZXMgPSB0YXJnZXQuZmlsZXMgYXMgRmlsZUxpc3Q7XG4gICAgdGhpcy5fb25TZWxlY3QoZmlsZXMpO1xuICB9XG5cbiAgb25TZWxlY3REcm9wKGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29uU2VsZWN0KGZpbGVzKTtcbiAgfVxuXG4gIG9uVGFiQ2hhbmdlKGlkeDogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3NjYW5uZXJDb250cm9scyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zY2FubmVyQ29udHJvbHMuc3RvcCgpO1xuICAgICAgdGhpcy5fc2Nhbm5lckNvbnRyb2xzID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoaWR4ID09PSAxKSB7XG4gICAgICB0aGlzLmluaXRWaWRlb1N0cmVhbXMoKTtcbiAgICAgIGlmICh0aGlzLmJhcmNvZGVWaWRlbyA9PSBudWxsIHx8IHRoaXMuYmFyY29kZVZpZGVvUHJldmlldyA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHZpZGVvID0gdGhpcy5iYXJjb2RlVmlkZW8ubmF0aXZlRWxlbWVudDtcbiAgICAgIGNvbnN0IHByZXZpZXcgPSB0aGlzLmJhcmNvZGVWaWRlb1ByZXZpZXcubmF0aXZlRWxlbWVudDtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLmFkZENsYXNzKHByZXZpZXcsICdhamYtdmlkZW8tcHJldmlldy1oaWRkZW4nKTtcbiAgICAgIHRoaXMuX2NvZGVSZWFkZXJcbiAgICAgICAgLmRlY29kZUZyb21WaWRlb0VsZW1lbnQodmlkZW8sIHJlc3VsdCA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdCA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh0aGlzLl9zY2FubmVyQ29udHJvbHMgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5fc2Nhbm5lckNvbnRyb2xzLnN0b3AoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBwb2ludHMgPSByZXN1bHQuZ2V0UmVzdWx0UG9pbnRzKCk7XG4gICAgICAgICAgY29uc3QgbncgPSBwb2ludHNbMF07XG4gICAgICAgICAgY29uc3Qgc2UgPSBwb2ludHNbMV07XG4gICAgICAgICAgY29uc3QgbHggPSBNYXRoLm1heCgobncuZ2V0WCgpIC8gdmlkZW8udmlkZW9XaWR0aCkgKiB2aWRlby5jbGllbnRXaWR0aCwgLTEwLCAwKTtcbiAgICAgICAgICBjb25zdCBseSA9IE1hdGgubWF4KChudy5nZXRZKCkgLyB2aWRlby52aWRlb0hlaWdodCkgKiB2aWRlby5jbGllbnRIZWlnaHQgLSAxMCwgMCk7XG4gICAgICAgICAgY29uc3QgcnggPSBNYXRoLm1pbihcbiAgICAgICAgICAgIChzZS5nZXRYKCkgLyB2aWRlby52aWRlb1dpZHRoKSAqIHZpZGVvLmNsaWVudFdpZHRoICsgMTAsXG4gICAgICAgICAgICB2aWRlby5jbGllbnRXaWR0aCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHJ5ID0gTWF0aC5taW4oXG4gICAgICAgICAgICAoc2UuZ2V0WSgpIC8gdmlkZW8udmlkZW9IZWlnaHQpICogdmlkZW8uY2xpZW50SGVpZ2h0ICsgMTAsXG4gICAgICAgICAgICB2aWRlby5jbGllbnRIZWlnaHQsXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShwcmV2aWV3LCAndG9wJywgYCR7bHl9cHhgKTtcbiAgICAgICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShwcmV2aWV3LCAnbGVmdCcsIGAke2x4fXB4YCk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUocHJldmlldywgJ3dpZHRoJywgYCR7cnggLSBseH1weGApO1xuICAgICAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHByZXZpZXcsICdoZWlnaHQnLCBgJHtyeSAtIGx5fXB4YCk7XG4gICAgICAgICAgdGhpcy5fcmVuZGVyZXIucmVtb3ZlQ2xhc3MocHJldmlldywgJ2FqZi12aWRlby1wcmV2aWV3LWhpZGRlbicpO1xuICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHQuZ2V0VGV4dCgpO1xuICAgICAgICB9KVxuICAgICAgICAudGhlbihjb250cm9scyA9PiB7XG4gICAgICAgICAgdGhpcy5fc2Nhbm5lckNvbnRyb2xzID0gY29udHJvbHM7XG4gICAgICAgICAgdGhpcy5zdG9wQ3VycmVudFN0cmVhbSgpO1xuICAgICAgICAgIHZpZGVvLnBhdXNlKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHN3aXRjaENhbWVyYSgpOiB2b2lkIHtcbiAgICB0aGlzLmluaXRWaWRlb1N0cmVhbXMoKTtcbiAgfVxuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRzICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JhcmNvZGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBwcml2YXRlIF9vblNlbGVjdChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMgIT0gbnVsbCAmJiBmaWxlcy5sZW5ndGggPiAwICYmIGZpbGVzWzBdKSB7XG4gICAgICBsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZXNbMF0pO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IChldjogUHJvZ3Jlc3NFdmVudCkgPT4ge1xuICAgICAgICBpZiAoIWV2LmxvYWRlZCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBkYXRhID0gcmVhZGVyLnJlc3VsdCBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuX3NldEltYWdlUHJldmlldyhgdXJsKCR7ZGF0YX0pYCk7XG4gICAgICAgIHRoaXMuX2NvZGVSZWFkZXJcbiAgICAgICAgICAuZGVjb2RlRnJvbUltYWdlVXJsKGRhdGEpXG4gICAgICAgICAgLnRoZW4ocmVzID0+IHtcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSByZXMuZ2V0VGV4dCgpO1xuICAgICAgICAgIH0pXG4gICAgICAgICAgLmNhdGNoKCgpID0+IHt9KTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfc2V0SW1hZ2VQcmV2aWV3KGltZzogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYmFyY29kZUltYWdlUHJldmlldyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJhcmNvZGVJbWFnZVByZXZpZXcubmF0aXZlRWxlbWVudCwgJ2JhY2tncm91bmQtaW1hZ2UnLCBpbWcpO1xuICAgIH1cbiAgfVxuXG4gIHByb3RlY3RlZCBpbml0VmlkZW9TdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuZ2V0U3RyZWFtKCkucGlwZSh0YWtlKDEpKS5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXRzIGFsbCB2aWRlbyBtZWRpYURldmljZXMgKGNhbWVyYXMpXG4gICAqIEByZXR1cm5zIEFuIG9ic2VydmFibGUgd2l0aCBhbGwgdmlkZW8gbWVkaWFEZXZpY2VzXG4gICAqL1xuICBwcml2YXRlIF9nZXRWaWRlb0RldmljZXMoKTogT2JzZXJ2YWJsZTxNZWRpYURldmljZUluZm9bXT4ge1xuICAgIHJldHVybiBmcm9tKG5hdmlnYXRvci5tZWRpYURldmljZXMuZW51bWVyYXRlRGV2aWNlcygpKS5waXBlKFxuICAgICAgbWFwKGRldmljZXMgPT4gZGV2aWNlcy5maWx0ZXIoZGV2aWNlID0+IGRldmljZS5raW5kID09PSAndmlkZW9pbnB1dCcpKSxcbiAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldHMgdGhlIGN1cnJlbnQgdmlkZW8gc3RyZWFtIGFuZCB1cGRhdGVzIHRoZSB2aWRlbyBlbGVtZW50IHNvdXJjZVxuICAgKiBAcmV0dXJucyBBbiBvYnNlcnZhYmxlIG9mIHRoZSBjdXJyZW50IG1lZGlhIHN0cmVhbVxuICAgKi9cbiAgcHJvdGVjdGVkIGdldFN0cmVhbSgpOiBPYnNlcnZhYmxlPE1lZGlhU3RyZWFtPiB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRWaWRlb1N0cmVhbSkge1xuICAgICAgdGhpcy5fY3VycmVudFZpZGVvU3RyZWFtLmdldFRyYWNrcygpLmZvckVhY2godHJhY2sgPT4ge1xuICAgICAgICB0cmFjay5zdG9wKCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgdmlkZW9Tb3VyY2U6IHN0cmluZyB8IHVuZGVmaW5lZCA9IHRoaXMudmlkZW9Tb3VyY2VTZWxlY3Q/LnZhbHVlIGFzIHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBjb25zdCBjb25zdHJhaW50cyA9IHtcbiAgICAgIHZpZGVvOiB7ZGV2aWNlSWQ6IHZpZGVvU291cmNlID8ge2V4YWN0OiB2aWRlb1NvdXJjZX0gOiB1bmRlZmluZWR9LFxuICAgIH07XG4gICAgcmV0dXJuIGZyb20obmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoY29uc3RyYWludHMpKS5waXBlKFxuICAgICAgdGFwKHN0cmVhbSA9PiB7XG4gICAgICAgIHRoaXMuX2dvdFN0cmVhbShzdHJlYW0pO1xuICAgICAgfSksXG4gICAgICBjYXRjaEVycm9yKGVyciA9PiB0aHJvd0Vycm9yKCgpID0+IGVycikpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogVXBkYXRlcyB0aGUgdmlkZW8gZWxlbWVudCBzb3VyY2Ugd2l0aCB0aGUgY3VycmVudCB2aWRlbyBzdHJlYW1cbiAgICogQHBhcmFtIHN0cmVhbSBUaGUgdmlkZW8gc3RyZWFtXG4gICAqL1xuICBwcml2YXRlIF9nb3RTdHJlYW0oc3RyZWFtOiBNZWRpYVN0cmVhbSB8IG51bGwpIHtcbiAgICB0aGlzLl9jdXJyZW50VmlkZW9TdHJlYW0gPSBzdHJlYW07XG4gICAgdGhpcy5iYXJjb2RlVmlkZW8ubmF0aXZlRWxlbWVudC5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgc3RvcEN1cnJlbnRTdHJlYW0oKTogdm9pZCB7XG4gICAgY29uc3QgdmlkZW8gPSB0aGlzLmJhcmNvZGVWaWRlby5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHN0cmVhbTogTWVkaWFTdHJlYW0gfCBudWxsID0gdmlkZW8uc3JjT2JqZWN0IGFzIE1lZGlhU3RyZWFtIHwgbnVsbDtcbiAgICBpZiAoc3RyZWFtID09IG51bGwpIHJldHVybjtcbiAgICBjb25zdCB0cmFja3MgPSBzdHJlYW0uZ2V0VmlkZW9UcmFja3MoKTtcbiAgICB0cmFja3MuZm9yRWFjaCh0cmFjayA9PiB0cmFjay5zdG9wKCkpO1xuICB9XG59XG4iXX0=