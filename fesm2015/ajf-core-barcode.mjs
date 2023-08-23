import * as i0 from '@angular/core';
import { EventEmitter, ElementRef, Directive, ViewChild } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { from, throwError } from 'rxjs';
import { take, map, tap, catchError } from 'rxjs/operators';

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
class AjfBarcode {
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
        var _a, _b;
        this.value = '';
        const video = (_b = (_a = this.barcodeVideo) === null || _a === void 0 ? void 0 : _a.nativeElement) !== null && _b !== void 0 ? _b : null;
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
        var _a;
        if (this._currentVideoStream) {
            this._currentVideoStream.getTracks().forEach(track => {
                track.stop();
            });
        }
        const videoSource = (_a = this.videoSourceSelect) === null || _a === void 0 ? void 0 : _a.value;
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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfBarcode };
//# sourceMappingURL=ajf-core-barcode.mjs.map
