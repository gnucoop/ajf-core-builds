/**
 * @fileoverview added by tsickle
 * Generated from: src/core/barcode/barcode.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Directive, EventEmitter, Input, Renderer2 } from '@angular/core';
import { BrowserBarcodeReader } from '@zxing/library';
import { from, of, Subscription } from 'rxjs';
import { catchError, switchMap, debounceTime } from 'rxjs/operators';
/**
 * @abstract
 */
export class AjfBarcode {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2JhcmNvZGUvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUN4RCxNQUFNLGVBQWUsQ0FBQztBQUVsQyxPQUFPLEVBQUMsb0JBQW9CLEVBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQWEsSUFBSSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHbkUsTUFBTSxPQUFnQixVQUFVOzs7OztJQXFEOUIsWUFBb0IsSUFBdUIsRUFBVSxTQUFvQjtRQUFyRCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUE3Q2hFLGVBQVUsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7UUFFeEMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFOUMsdUJBQWtCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdEQseUJBQW9CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7UUFtQnpELGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBVW5CLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFPakIsc0JBQWlCOzs7O1FBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBQztRQUNwQyx1QkFBa0I7OztRQUFHLEdBQUcs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NUMsSUFBSSxDQUFDLFVBQVU7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxtQkFBQSxDQUFDLEVBQVUsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7Ozs7SUFRTyxvQkFBb0IsQ0FBQyxJQUFZOztjQUNqQyxLQUFLLEdBQXFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7Ozs7OztJQVFPLFlBQVksQ0FBQyxJQUFZOztjQUN6QixLQUFLLEdBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNuRSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzdDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUFwTUYsU0FBUzs7OztZQVBGLGlCQUFpQjtZQUFrQyxTQUFTOzs7dUJBV2pFLEtBQUs7Ozs7Ozs7SUFGTiwrQkFBNkI7O0lBTzdCLGdDQUFpRDs7SUFFakQsb0NBQW1EOztJQUNuRCxzQ0FBdUQ7O0lBRXZELHdDQUErRDs7SUFDL0QsMENBQWlFOzs7OztJQUVqRSw2QkFBbUM7Ozs7Ozs7O0lBUW5DLDRCQUFpQzs7Ozs7Ozs7O0lBU2pDLG1DQUEyQjs7Ozs7SUFVM0IsNkJBQXlCOzs7OztJQU96Qix1Q0FBNEM7Ozs7O0lBQzVDLHdDQUFzQzs7Ozs7SUFFMUIsMEJBQStCOzs7OztJQUFFLCtCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsIFJlbmRlcmVyMixcbiAgT25EZXN0cm95fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QnJvd3NlckJhcmNvZGVSZWFkZXIsIFJlc3VsdH0gZnJvbSAnQHp4aW5nL2xpYnJhcnknO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBmcm9tLCBvZiwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgc3dpdGNoTWFwLCBkZWJvdW5jZVRpbWV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQmFyY29kZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgX3JlYWRvbmx5OiBib29sZWFuO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZWFkb25seTsgfVxuICBASW5wdXQoKSBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVhZG9ubHkgY29kZVJlYWRlciA9IG5ldyBCcm93c2VyQmFyY29kZVJlYWRlcigpO1xuXG4gIHJlYWRvbmx5IHN0YXJ0RGV0ZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICByZWFkb25seSBzdGFydENhbGN1bGF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcmVhZG9ubHkgX3N0YXJ0RGV0ZWN0aW9uU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHJlYWRvbmx5IF9zdGFydENhbGN1bGF0aW9uU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgZ2V0IGNhbnZhc0N0eCgpIHtyZXR1cm4gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJykhOyB9XG5cbiAgLyoqXG4gICAqIEEgaHRtbCB2aWRlbyBlbGVtZW50IGNyZWF0ZWQgYXQgcnVudGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQ7XG4gIGdldCB2aWRlb1NvdXJjZSgpOiBIVE1MVmlkZW9FbGVtZW50IHtyZXR1cm4gdGhpcy5fdmlkZW87IH1cblxuICAvKipcbiAgICogaW1wbGVtZW50IHRoZSBjb250cm9sIGZvcm0gdmFsdWUuXG4gICAqIHJhcHByZXNlbnQgdGhlIGJhcmNvZGUgdmFsdWUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9iYXJjb2RlVmFsdWUgPSAnJztcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl9iYXJjb2RlVmFsdWU7IH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fYmFyY29kZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYmFyY29kZVZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdG9nZ2xlID0gJ2Ryb3AnO1xuICBnZXQgdG9nZ2xlKCkgeyByZXR1cm4gdGhpcy5fdG9nZ2xlOyB9XG4gIHNldCB0b2dnbGUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90b2dnbGUgPSB2YWw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHsgfTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkQ2FsbGJhY2sgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgdGhpcy5fc3RhcnREZXRlY3Rpb25TdWIgPSB0aGlzLnN0YXJ0RGV0ZWN0aW9uLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBkYXRhOiBzdHJpbmcgPSB0aGlzLl9nZXREYXRhRnJvbVZpZGVvKHRoaXMudmlkZW9Tb3VyY2UpO1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVhZEJhcmNvZGVGcm9tRGF0YShkYXRhKTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIG9mKHt9IGFzIFJlc3VsdCk7XG4gICAgICAgICAgfSlcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKCFyZXN1bHQudGV4dCkge1xuICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGV0ZWN0aW9uLmVtaXQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSA9ICdkcm9wJztcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHJlc3VsdC50ZXh0O1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgdGhpcy5fc3RhcnRDYWxjdWxhdGlvblN1YiA9IHRoaXMuc3RhcnRDYWxjdWxhdGlvbi5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoXG4gICAgICAgICAgc3dpdGNoTWFwKChkYXRhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRCYXJjb2RlRnJvbURhdGEoZGF0YSk7XG4gICAgICAgICAgfSlcbiAgICAgICkuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgIGlmIChyZXN1bHQudGV4dCkge1xuICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSA9ICdkcm9wJztcbiAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHJlc3VsdC50ZXh0O1xuICAgICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICB0YWtlU25hcHNob3QoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydERldGVjdGlvbi5lbWl0KCk7XG4gIH1cblxuICBvblNlbGVjdEZpbGUoZXZ0OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQgPT0gbnVsbCB8fCBldnQudGFyZ2V0ID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IGZpbGVzID0gdGFyZ2V0LmZpbGVzO1xuICAgIGlmIChmaWxlcyAhPSBudWxsICYmIGZpbGVzWzBdKSB7XG4gICAgICBsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZXNbMF0pO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IChldjogUHJvZ3Jlc3NFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhOiBzdHJpbmcgPSAoZXYudGFyZ2V0IGFzIEZpbGVSZWFkZXIpLnJlc3VsdCBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuc3RhcnRDYWxjdWxhdGlvbi5lbWl0KGRhdGEpO1xuICAgICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iYXJjb2RlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhcnRDYWxjdWxhdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N0YXJ0RGV0ZWN0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXRDYW52YXMoKTtcbiAgICB0aGlzLl9pbml0VmlkZW8oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDYW52YXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2FudmFzID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IDQ4MDtcbiAgICB0aGlzLl9jYW52YXMud2lkdGggPSA2NDA7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VmlkZW8oKTogdm9pZCB7XG4gICAgdGhpcy5fdmlkZW8gPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIHRoaXMuX3ZpZGVvLmhlaWdodCA9IDQ4MDtcbiAgICB0aGlzLl92aWRlby53aWR0aCA9IDY0MDtcbiAgfVxuXG4gIC8qKlxuICAgKiB3cml0ZSBhIGZyYW1lIG9mIEhUTUxWaWRlb0VsZW1lbnQgaW50byBIVE1MQ2FudmFzRWxlbWVudCBhbmRcbiAgICogcmV0dXJuIHRoZSByZXN1bHQgb2YgdG9EYXRhVVJMKCdpbWFnZS9wbmcnKVxuICAgKlxuICAgKiBAcGFyYW0gdmlkZW9cbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2dldERhdGFGcm9tVmlkZW8odmlkZW86IEhUTUxWaWRlb0VsZW1lbnQpOiBzdHJpbmcge1xuICAgIHRoaXMuY2FudmFzQ3R4LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgNjQwLCA0ODApO1xuICAgIHJldHVybiB0aGlzLl9jYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIEB6eGluZyBsaWJyYXJ5IG1ldGhvZCB3aXRoIEhUTUxJbWFnZUVsZW1lbnQgYXMgcGFyYW1ldGVyXG4gICAqXG4gICAqIEBwYXJhbSBpbWdcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3JlYWRCYXJjb2RlRnJvbUltYWdlKGltZzogSFRNTEltYWdlRWxlbWVudCk6IE9ic2VydmFibGU8UmVzdWx0PiB7XG4gICAgcmV0dXJuIGZyb20odGhpcy5jb2RlUmVhZGVyLmRlY29kZUZyb21JbWFnZShpbWcpKVxuICAgICAgICAucGlwZShjYXRjaEVycm9yKGUgPT4gb2YoZSBhcyBSZXN1bHQpKSk7XG4gIH1cblxuICAvKipcbiAgICogYnVpbGQgYW4gaW1hZ2UgYnkgZGF0YSBhbmQgY2FsbCBfcmVhZEJhcmNvZGVGcm9tSW1hZ2VcbiAgICpcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3JlYWRCYXJjb2RlRnJvbURhdGEoZGF0YTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXN1bHQ+IHtcbiAgICBjb25zdCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IHRoaXMuX2NyZWF0ZUltYWdlKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLl9yZWFkQmFyY29kZUZyb21JbWFnZShpbWFnZSk7XG4gIH1cblxuICAvKipcbiAgICogYnVpbGQgYW4gaW1hZ2UgYnkgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSW1hZ2UoZGF0YTogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpZiAoZGF0YSAhPT0gbnVsbCAmJiB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGltYWdlLnNyYyA9IGRhdGE7XG4gICAgfVxuICAgIHJldHVybiBpbWFnZTtcbiAgfVxufVxuIl19