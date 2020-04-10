import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { EventEmitter, Directive, ChangeDetectorRef, Renderer2, Input } from '@angular/core';
import { BrowserBarcodeReader } from '@zxing/library';
import { Subscription, of, from } from 'rxjs';
import { debounceTime, switchMap, catchError } from 'rxjs/operators';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/barcode/barcode.ts
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
        })))
            .subscribe((/**
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
    get readonly() {
        return this._readonly;
    }
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
    get canvasCtx() {
        return (/** @type {?} */ (this._canvas.getContext('2d')));
    }
    /**
     * @return {?}
     */
    get videoSource() {
        return this._video;
    }
    /**
     * @return {?}
     */
    get value() {
        return this._barcodeValue;
    }
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
    get toggle() {
        return this._toggle;
    }
    /**
     * @param {?} val
     * @return {?}
     */
    set toggle(val) {
        this._toggle = val;
        this._cdr.markForCheck();
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
     * @param {?} evt
     * @return {?}
     */
    onSelectFile(evt) {
        if (evt == null || evt.target == null) {
            return;
        }
        /** @type {?} */
        const target = (/** @type {?} */ (evt.target));
        /** @type {?} */
        const files = target.files;
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
        return from(this.codeReader.decodeFromImage(img)).pipe(catchError((/**
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
AjfBarcode.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfBarcode.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: Renderer2 }
];
AjfBarcode.propDecorators = {
    readonly: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @protected
     */
    AjfBarcode.prototype._readonly;
    /** @type {?} */
    AjfBarcode.prototype.codeReader;
    /** @type {?} */
    AjfBarcode.prototype.startDetection;
    /** @type {?} */
    AjfBarcode.prototype.startCalculation;
    /** @type {?} */
    AjfBarcode.prototype._startDetectionSub;
    /** @type {?} */
    AjfBarcode.prototype._startCalculationSub;
    /**
     * @type {?}
     * @private
     */
    AjfBarcode.prototype._canvas;
    /**
     * A html video element created at runtime
     *
     * \@memberof AjfBarcode
     * @type {?}
     * @private
     */
    AjfBarcode.prototype._video;
    /**
     * implement the control form value.
     * rappresent the barcode value.
     *
     * \@memberof AjfBarcode
     * @type {?}
     * @private
     */
    AjfBarcode.prototype._barcodeValue;
    /**
     * @type {?}
     * @private
     */
    AjfBarcode.prototype._toggle;
    /**
     * @type {?}
     * @private
     */
    AjfBarcode.prototype._onChangeCallback;
    /**
     * @type {?}
     * @private
     */
    AjfBarcode.prototype._onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    AjfBarcode.prototype._cdr;
    /**
     * @type {?}
     * @private
     */
    AjfBarcode.prototype._renderer;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/barcode/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfBarcode };
//# sourceMappingURL=barcode.js.map
