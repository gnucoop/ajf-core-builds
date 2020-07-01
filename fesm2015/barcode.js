import { EventEmitter, Directive, ChangeDetectorRef, Renderer2 } from '@angular/core';
import { BrowserBarcodeReader } from '@zxing/library';
import { Subscription, of, from } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';

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
        this.codeReader = new BrowserBarcodeReader();
        this.startDetection = new EventEmitter();
        this.startCalculation = new EventEmitter();
        this._startDetectionSub = Subscription.EMPTY;
        this._startCalculationSub = Subscription.EMPTY;
        /**
         * implement the control form value.
         * rappresent the barcode value.
         *
         * @memberof AjfBarcode
         */
        this._barcodeValue = '';
        this._toggle = 'drop';
        this._onChangeCallback = (_) => { };
        this._onTouchedCallback = () => { };
        this._init();
        this._startDetectionSub = this.startDetection.asObservable()
            .pipe(debounceTime(300), switchMap(() => {
            const data = this._getDataFromVideo(this.videoSource);
            return this._readBarcodeFromData(data);
        }), catchError(() => {
            return of({});
        }))
            .subscribe((result) => {
            if (!result.text) {
                this.startDetection.emit();
            }
            else {
                this.toggle = 'drop';
                this.value = result.text;
            }
        });
        this._startCalculationSub = this.startCalculation.asObservable()
            .pipe(switchMap((data) => {
            return this._readBarcodeFromData(data);
        }))
            .subscribe((result) => {
            if (result.text) {
                this.toggle = 'drop';
                this.value = result.text;
            }
        });
    }
    get canvasCtx() {
        return this._canvas.getContext('2d');
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
    get toggle() {
        return this._toggle;
    }
    set toggle(val) {
        this._toggle = val;
        this._cdr.markForCheck();
    }
    reset() {
        this.value = '';
        this._onTouchedCallback();
    }
    takeSnapshot() {
        this.startDetection.emit();
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
    ngOnDestroy() {
        this._startCalculationSub.unsubscribe();
        this._startDetectionSub.unsubscribe();
    }
    _init() {
        this._initCanvas();
        this._initVideo();
    }
    _initCanvas() {
        this._canvas = this._renderer.createElement('canvas');
        this._canvas.height = 480;
        this._canvas.width = 640;
    }
    _initVideo() {
        this._video = this._renderer.createElement('video');
        this._video.height = 480;
        this._video.width = 640;
    }
    _onSelect(files) {
        if (files != null && files.length > 0 && files[0]) {
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (ev) => {
                const data = ev.target.result;
                this.startCalculation.emit(data);
                this._cdr.detectChanges();
            };
        }
    }
    /**
     * write a frame of HTMLVideoElement into HTMLCanvasElement and
     * return the result of toDataURL('image/png')
     *
     * @param video
     * @memberof AjfBarcode
     */
    _getDataFromVideo(video) {
        this.canvasCtx.drawImage(video, 0, 0, 640, 480);
        return this._canvas.toDataURL('image/png');
    }
    /**
     * call @zxing library method with HTMLImageElement as parameter
     *
     * @param img
     * @memberof AjfBarcode
     */
    _readBarcodeFromImage(img) {
        const decode = from(this.codeReader.decodeFromImage(img));
        return decode.pipe(catchError(e => of(e)));
    }
    /**
     * build an image by data and call _readBarcodeFromImage
     *
     * @param data
     * @memberof AjfBarcode
     */
    _readBarcodeFromData(data) {
        const image = this._createImage(data);
        return this._readBarcodeFromImage(image);
    }
    /**
     * build an image by data
     *
     * @param data
     * @memberof AjfBarcode
     */
    _createImage(data) {
        const image = this._renderer.createElement('img');
        if (data !== null && typeof data === 'string') {
            image.src = data;
        }
        return image;
    }
}
AjfBarcode.decorators = [
    { type: Directive }
];
AjfBarcode.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];

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
//# sourceMappingURL=barcode.js.map
