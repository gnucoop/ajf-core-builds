/**
 * @fileoverview added by tsickle
 * Generated from: src/core/barcode/barcode.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2JhcmNvZGUvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUN4RCxNQUFNLGVBQWUsQ0FBQztBQUVsQyxPQUFPLEVBQUMsb0JBQW9CLEVBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQWEsSUFBSSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7Ozs7QUFHbkUsTUFBTSxPQUFnQixVQUFVOzs7OztJQXFEOUIsWUFBb0IsSUFBdUIsRUFBVSxTQUFvQjtRQUFyRCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUE3Q2hFLGVBQVUsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7UUFFeEMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFOUMsdUJBQWtCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdEQseUJBQW9CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7Ozs7Ozs7UUFtQnpELGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBVW5CLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFPakIsc0JBQWlCOzs7O1FBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFHLENBQUMsRUFBQztRQUNwQyx1QkFBa0I7OztRQUFHLEdBQUcs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NUMsSUFBSSxDQUFDLFVBQVU7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxtQkFBQSxDQUFDLEVBQVUsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUM5QyxDQUFDOzs7Ozs7Ozs7SUFRTyxvQkFBb0IsQ0FBQyxJQUFZOztjQUNqQyxLQUFLLEdBQXFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3ZELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7Ozs7Ozs7OztJQVFPLFlBQVksQ0FBQyxJQUFZOztjQUN6QixLQUFLLEdBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUNuRSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzdDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzs7WUFwTUYsU0FBUzs7OztZQVBGLGlCQUFpQjtZQUFrQyxTQUFTOzs7dUJBV2pFLEtBQUs7Ozs7Ozs7SUFGTiwrQkFBNkI7O0lBTzdCLGdDQUFpRDs7SUFFakQsb0NBQW1EOztJQUNuRCxzQ0FBdUQ7O0lBRXZELHdDQUErRDs7SUFDL0QsMENBQWlFOzs7OztJQUVqRSw2QkFBbUM7Ozs7Ozs7O0lBUW5DLDRCQUFpQzs7Ozs7Ozs7O0lBU2pDLG1DQUEyQjs7Ozs7SUFVM0IsNkJBQXlCOzs7OztJQU96Qix1Q0FBNEM7Ozs7O0lBQzVDLHdDQUFzQzs7Ozs7SUFFMUIsMEJBQStCOzs7OztJQUFFLCtCQUE0QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgUmVuZGVyZXIyLFxuICBPbkRlc3Ryb3l9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCcm93c2VyQmFyY29kZVJlYWRlciwgUmVzdWx0fSBmcm9tICdAenhpbmcvbGlicmFyeSc7XG5pbXBvcnQge09ic2VydmFibGUsIGZyb20sIG9mLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBzd2l0Y2hNYXAsIGRlYm91bmNlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZCYXJjb2RlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG4gIHByb3RlY3RlZCBfcmVhZG9ubHk6IGJvb2xlYW47XG4gIGdldCByZWFkb25seSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX3JlYWRvbmx5OyB9XG4gIEBJbnB1dCgpIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWFkb25seSBjb2RlUmVhZGVyID0gbmV3IEJyb3dzZXJCYXJjb2RlUmVhZGVyKCk7XG5cbiAgcmVhZG9ubHkgc3RhcnREZXRlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHJlYWRvbmx5IHN0YXJ0Q2FsY3VsYXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICByZWFkb25seSBfc3RhcnREZXRlY3Rpb25TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcmVhZG9ubHkgX3N0YXJ0Q2FsY3VsYXRpb25TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBnZXQgY2FudmFzQ3R4KCkge3JldHVybiB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7IH1cblxuICAvKipcbiAgICogQSBodG1sIHZpZGVvIGVsZW1lbnQgY3JlYXRlZCBhdCBydW50aW1lXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF92aWRlbzogSFRNTFZpZGVvRWxlbWVudDtcbiAgZ2V0IHZpZGVvU291cmNlKCk6IEhUTUxWaWRlb0VsZW1lbnQge3JldHVybiB0aGlzLl92aWRlbzsgfVxuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnQgdGhlIGNvbnRyb2wgZm9ybSB2YWx1ZS5cbiAgICogcmFwcHJlc2VudCB0aGUgYmFyY29kZSB2YWx1ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2JhcmNvZGVWYWx1ZSA9ICcnO1xuICBnZXQgdmFsdWUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2JhcmNvZGVWYWx1ZTsgfVxuICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9iYXJjb2RlVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9iYXJjb2RlVmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90b2dnbGUgPSAnZHJvcCc7XG4gIGdldCB0b2dnbGUoKSB7IHJldHVybiB0aGlzLl90b2dnbGU7IH1cbiAgc2V0IHRvZ2dsZSh2YWw6IHN0cmluZykge1xuICAgIHRoaXMuX3RvZ2dsZSA9IHZhbDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4geyB9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICB0aGlzLl9zdGFydERldGVjdGlvblN1YiA9IHRoaXMuc3RhcnREZXRlY3Rpb24uYXNPYnNlcnZhYmxlKClcbiAgICAgIC5waXBlKFxuICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IHRoaXMuX2dldERhdGFGcm9tVmlkZW8odGhpcy52aWRlb1NvdXJjZSk7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFkQmFyY29kZUZyb21EYXRhKGRhdGEpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gb2Yoe30gYXMgUmVzdWx0KTtcbiAgICAgICAgICB9KVxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdC50ZXh0KSB7XG4gICAgICAgICAgICAgIHRoaXMuc3RhcnREZXRlY3Rpb24uZW1pdCgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudG9nZ2xlID0gJ2Ryb3AnO1xuICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0aGlzLl9zdGFydENhbGN1bGF0aW9uU3ViID0gdGhpcy5zdGFydENhbGN1bGF0aW9uLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAucGlwZShcbiAgICAgICAgICBzd2l0Y2hNYXAoKGRhdGE6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVhZEJhcmNvZGVGcm9tRGF0YShkYXRhKTtcbiAgICAgICAgICB9KVxuICAgICAgKS5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgaWYgKHJlc3VsdC50ZXh0KSB7XG4gICAgICAgICAgICAgIHRoaXMudG9nZ2xlID0gJ2Ryb3AnO1xuICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgfSk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHRha2VTbmFwc2hvdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0RGV0ZWN0aW9uLmVtaXQoKTtcbiAgfVxuXG4gIG9uU2VsZWN0RmlsZShldnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2dCA9PSBudWxsIHx8IGV2dC50YXJnZXQgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgZmlsZXMgPSB0YXJnZXQuZmlsZXM7XG4gICAgaWYgKGZpbGVzICE9IG51bGwgJiYgZmlsZXNbMF0pIHtcbiAgICAgIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlc1swXSk7XG4gICAgICByZWFkZXIub25sb2FkID0gKGV2OiBQcm9ncmVzc0V2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IChldi50YXJnZXQgYXMgRmlsZVJlYWRlcikucmVzdWx0IGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5zdGFydENhbGN1bGF0aW9uLmVtaXQoZGF0YSk7XG4gICAgICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRzICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JhcmNvZGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGFydENhbGN1bGF0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc3RhcnREZXRlY3Rpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faW5pdENhbnZhcygpO1xuICAgIHRoaXMuX2luaXRWaWRlbygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENhbnZhcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jYW52YXMgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gNDgwO1xuICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IDY0MDtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRWaWRlbygpOiB2b2lkIHtcbiAgICB0aGlzLl92aWRlbyA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgdGhpcy5fdmlkZW8uaGVpZ2h0ID0gNDgwO1xuICAgIHRoaXMuX3ZpZGVvLndpZHRoID0gNjQwO1xuICB9XG5cbiAgLyoqXG4gICAqIHdyaXRlIGEgZnJhbWUgb2YgSFRNTFZpZGVvRWxlbWVudCBpbnRvIEhUTUxDYW52YXNFbGVtZW50IGFuZFxuICAgKiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0b0RhdGFVUkwoJ2ltYWdlL3BuZycpXG4gICAqXG4gICAqIEBwYXJhbSB2aWRlb1xuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0RGF0YUZyb21WaWRlbyh2aWRlbzogSFRNTFZpZGVvRWxlbWVudCk6IHN0cmluZyB7XG4gICAgdGhpcy5jYW52YXNDdHguZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCA2NDAsIDQ4MCk7XG4gICAgcmV0dXJuIHRoaXMuX2NhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgQHp4aW5nIGxpYnJhcnkgbWV0aG9kIHdpdGggSFRNTEltYWdlRWxlbWVudCBhcyBwYXJhbWV0ZXJcbiAgICpcbiAgICogQHBhcmFtIGltZ1xuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVhZEJhcmNvZGVGcm9tSW1hZ2UoaW1nOiBIVE1MSW1hZ2VFbGVtZW50KTogT2JzZXJ2YWJsZTxSZXN1bHQ+IHtcbiAgICByZXR1cm4gZnJvbSh0aGlzLmNvZGVSZWFkZXIuZGVjb2RlRnJvbUltYWdlKGltZykpXG4gICAgICAgIC5waXBlKGNhdGNoRXJyb3IoZSA9PiBvZihlIGFzIFJlc3VsdCkpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBidWlsZCBhbiBpbWFnZSBieSBkYXRhIGFuZCBjYWxsIF9yZWFkQmFyY29kZUZyb21JbWFnZVxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVhZEJhcmNvZGVGcm9tRGF0YShkYXRhOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlc3VsdD4ge1xuICAgIGNvbnN0IGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gdGhpcy5fY3JlYXRlSW1hZ2UoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRCYXJjb2RlRnJvbUltYWdlKGltYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBidWlsZCBhbiBpbWFnZSBieSBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVJbWFnZShkYXRhOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBjb25zdCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGlmIChkYXRhICE9PSBudWxsICYmIHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgaW1hZ2Uuc3JjID0gZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIGltYWdlO1xuICB9XG59XG4iXX0=