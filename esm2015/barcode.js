/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import { EventEmitter } from '@angular/core';
import { coerceBooleanProperty } from '@ajf/core/utils';
import { BrowserBarcodeReader } from '@zxing/library';
import { Subscription, of, from } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
class AjfBarcode {
    /**
     * @param {?} _cdr
     * @param {?} _renderer
     */
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
         * \@memberof AjfBarcode
         */
        this._barcodeValue = '';
        this._toggle = 'drop';
        this._onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this._onTouchedCallback = (/**
         * @return {?}
         */
        () => { });
        this._init();
        this._startDetectionSub = this.startDetection.asObservable()
            .pipe(debounceTime(300), switchMap((/**
         * @return {?}
         */
        () => {
            /** @type {?} */
            const data = this._getDataFromVideo(this.videoSource);
            return this._readBarcodeFromData(data);
        })), catchError((/**
         * @return {?}
         */
        () => {
            return of((/** @type {?} */ ({})));
        })))
            .subscribe((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            if (!result.text) {
                this.startDetection.emit();
            }
            else {
                this.toggle = 'drop';
                this.value = result.text;
            }
        }));
        this._startCalculationSub = this.startCalculation.asObservable()
            .pipe(switchMap((/**
         * @param {?} data
         * @return {?}
         */
        (data) => {
            return this._readBarcodeFromData(data);
        }))).subscribe((/**
         * @param {?} result
         * @return {?}
         */
        (result) => {
            if (result.text) {
                this.toggle = 'drop';
                this.value = result.text;
            }
        }));
    }
    /**
     * @return {?}
     */
    get readonly() { return this._readonly; }
    /**
     * @param {?} readonly
     * @return {?}
     */
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get canvasCtx() { return (/** @type {?} */ (this._canvas.getContext('2d'))); }
    /**
     * @return {?}
     */
    get videoSource() { return this._video; }
    /**
     * @return {?}
     */
    get value() { return this._barcodeValue; }
    /**
     * @param {?} value
     * @return {?}
     */
    set value(value) {
        if (this._barcodeValue !== value) {
            this._barcodeValue = value;
            this._cdr.detectChanges();
            this._onChangeCallback(value);
        }
    }
    /**
     * @return {?}
     */
    get toggle() { return this._toggle; }
    /**
     * @param {?} val
     * @return {?}
     */
    set toggle(val) {
        this._toggle = val;
    }
    /**
     * @return {?}
     */
    reset() {
        this.value = '';
        this._onTouchedCallback();
    }
    /**
     * @return {?}
     */
    takeSnapshot() {
        this.startDetection.emit();
    }
    /**
     * @param {?} files
     * @return {?}
     */
    onSelectFile(files) {
        if (files != null && files[0]) {
            /** @type {?} */
            let reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = (/**
             * @param {?} ev
             * @return {?}
             */
            (ev) => {
                /** @type {?} */
                const data = (/** @type {?} */ (((/** @type {?} */ (ev.target))).result));
                this.startCalculation.emit(data);
                this._cdr.detectChanges();
            });
        }
    }
    /**
     * ControlValueAccessor implements
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        this._barcodeValue = value;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._startCalculationSub.unsubscribe();
        this._startDetectionSub.unsubscribe();
    }
    /**
     * @private
     * @return {?}
     */
    _init() {
        this._initCanvas();
        this._initVideo();
    }
    /**
     * @private
     * @return {?}
     */
    _initCanvas() {
        this._canvas = this._renderer.createElement('canvas');
        this._canvas.height = 480;
        this._canvas.width = 640;
    }
    /**
     * @private
     * @return {?}
     */
    _initVideo() {
        this._video = this._renderer.createElement('video');
        this._video.height = 480;
        this._video.width = 640;
    }
    /**
     * write a frame of HTMLVideoElement into HTMLCanvasElement and
     * return the result of toDataURL('image/png')
     *
     * \@memberof AjfBarcode
     * @private
     * @param {?} video
     * @return {?}
     */
    _getDataFromVideo(video) {
        this.canvasCtx.drawImage(video, 0, 0, 640, 480);
        return this._canvas.toDataURL('image/png');
    }
    /**
     * call \@zxing library method with HTMLImageElement as parameter
     *
     * \@memberof AjfBarcode
     * @private
     * @param {?} img
     * @return {?}
     */
    _readBarcodeFromImage(img) {
        return from(this.codeReader.decodeFromImage(img))
            .pipe(catchError((/**
         * @param {?} e
         * @return {?}
         */
        e => of((/** @type {?} */ (e))))));
    }
    /**
     * build an image by data and call _readBarcodeFromImage
     *
     * \@memberof AjfBarcode
     * @private
     * @param {?} data
     * @return {?}
     */
    _readBarcodeFromData(data) {
        /** @type {?} */
        const image = this._createImage(data);
        return this._readBarcodeFromImage(image);
    }
    /**
     * build an image by data
     *
     * \@memberof AjfBarcode
     * @private
     * @param {?} data
     * @return {?}
     */
    _createImage(data) {
        /** @type {?} */
        const image = this._renderer.createElement('img');
        if (data !== null && typeof data === 'string') {
            image.src = data;
        }
        return image;
    }
}

export { AjfBarcode };
//# sourceMappingURL=barcode.js.map
