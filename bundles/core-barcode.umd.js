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
(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ajf/core/utils'), require('@zxing/library'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/barcode', ['exports', '@angular/core', '@ajf/core/utils', '@zxing/library', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.barcode = {}), global.ng.core, global.ajf.core.utils, global.zxing.library, global.rxjs, global.rxjs.operators));
}(this, function (exports, core, utils, library, rxjs, operators) { 'use strict';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var AjfBarcode = /** @class */ (function () {
        function AjfBarcode(_cdr, _renderer) {
            var _this = this;
            this._cdr = _cdr;
            this._renderer = _renderer;
            this.codeReader = new library.BrowserBarcodeReader();
            this.startDetection = new core.EventEmitter();
            this.startCalculation = new core.EventEmitter();
            this._startDetectionSub = rxjs.Subscription.EMPTY;
            this._startCalculationSub = rxjs.Subscription.EMPTY;
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
            function (_) { });
            this._onTouchedCallback = (/**
             * @return {?}
             */
            function () { });
            this._init();
            this._startDetectionSub = this.startDetection.asObservable()
                .pipe(operators.debounceTime(300), operators.switchMap((/**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var data = _this._getDataFromVideo(_this.videoSource);
                return _this._readBarcodeFromData(data);
            })), operators.catchError((/**
             * @return {?}
             */
            function () {
                return rxjs.of((/** @type {?} */ ({})));
            })))
                .subscribe((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                if (!result.text) {
                    _this.startDetection.emit();
                }
                else {
                    _this.toggle = 'drop';
                    _this.value = result.text;
                }
            }));
            this._startCalculationSub = this.startCalculation.asObservable()
                .pipe(operators.switchMap((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                return _this._readBarcodeFromData(data);
            }))).subscribe((/**
             * @param {?} result
             * @return {?}
             */
            function (result) {
                if (result.text) {
                    _this.toggle = 'drop';
                    _this.value = result.text;
                }
            }));
        }
        Object.defineProperty(AjfBarcode.prototype, "readonly", {
            get: /**
             * @return {?}
             */
            function () { return this._readonly; },
            set: /**
             * @param {?} readonly
             * @return {?}
             */
            function (readonly) {
                this._readonly = utils.coerceBooleanProperty(readonly);
                this._cdr.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfBarcode.prototype, "canvasCtx", {
            get: /**
             * @return {?}
             */
            function () { return (/** @type {?} */ (this._canvas.getContext('2d'))); },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfBarcode.prototype, "videoSource", {
            get: /**
             * @return {?}
             */
            function () { return this._video; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfBarcode.prototype, "value", {
            get: /**
             * @return {?}
             */
            function () { return this._barcodeValue; },
            set: /**
             * @param {?} value
             * @return {?}
             */
            function (value) {
                if (this._barcodeValue !== value) {
                    this._barcodeValue = value;
                    this._cdr.detectChanges();
                    this._onChangeCallback(value);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfBarcode.prototype, "toggle", {
            get: /**
             * @return {?}
             */
            function () { return this._toggle; },
            set: /**
             * @param {?} val
             * @return {?}
             */
            function (val) {
                this._toggle = val;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AjfBarcode.prototype.reset = /**
         * @return {?}
         */
        function () {
            this.value = '';
            this._onTouchedCallback();
        };
        /**
         * @return {?}
         */
        AjfBarcode.prototype.takeSnapshot = /**
         * @return {?}
         */
        function () {
            this.startDetection.emit();
        };
        /**
         * @param {?} files
         * @return {?}
         */
        AjfBarcode.prototype.onSelectFile = /**
         * @param {?} files
         * @return {?}
         */
        function (files) {
            var _this = this;
            if (files != null && files[0]) {
                /** @type {?} */
                var reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = (/**
                 * @param {?} ev
                 * @return {?}
                 */
                function (ev) {
                    /** @type {?} */
                    var data = (/** @type {?} */ (((/** @type {?} */ (ev.target))).result));
                    _this.startCalculation.emit(data);
                    _this._cdr.detectChanges();
                });
            }
        };
        /** ControlValueAccessor implements */
        /**
         * ControlValueAccessor implements
         * @param {?} value
         * @return {?}
         */
        AjfBarcode.prototype.writeValue = /**
         * ControlValueAccessor implements
         * @param {?} value
         * @return {?}
         */
        function (value) {
            this._barcodeValue = value;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        AjfBarcode.prototype.registerOnChange = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onChangeCallback = fn;
        };
        /**
         * @param {?} fn
         * @return {?}
         */
        AjfBarcode.prototype.registerOnTouched = /**
         * @param {?} fn
         * @return {?}
         */
        function (fn) {
            this._onTouchedCallback = fn;
        };
        /**
         * @return {?}
         */
        AjfBarcode.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._startCalculationSub.unsubscribe();
            this._startDetectionSub.unsubscribe();
        };
        /**
         * @private
         * @return {?}
         */
        AjfBarcode.prototype._init = /**
         * @private
         * @return {?}
         */
        function () {
            this._initCanvas();
            this._initVideo();
        };
        /**
         * @private
         * @return {?}
         */
        AjfBarcode.prototype._initCanvas = /**
         * @private
         * @return {?}
         */
        function () {
            this._canvas = this._renderer.createElement('canvas');
            this._canvas.height = 480;
            this._canvas.width = 640;
        };
        /**
         * @private
         * @return {?}
         */
        AjfBarcode.prototype._initVideo = /**
         * @private
         * @return {?}
         */
        function () {
            this._video = this._renderer.createElement('video');
            this._video.height = 480;
            this._video.width = 640;
        };
        /**
         * write a frame of HTMLVideoElement into HTMLCanvasElement and
         * return the result of toDataURL('image/png')
         *
         * @param video
         * @memberof AjfBarcode
         */
        /**
         * write a frame of HTMLVideoElement into HTMLCanvasElement and
         * return the result of toDataURL('image/png')
         *
         * \@memberof AjfBarcode
         * @private
         * @param {?} video
         * @return {?}
         */
        AjfBarcode.prototype._getDataFromVideo = /**
         * write a frame of HTMLVideoElement into HTMLCanvasElement and
         * return the result of toDataURL('image/png')
         *
         * \@memberof AjfBarcode
         * @private
         * @param {?} video
         * @return {?}
         */
        function (video) {
            this.canvasCtx.drawImage(video, 0, 0, 640, 480);
            return this._canvas.toDataURL('image/png');
        };
        /**
         * call @zxing library method with HTMLImageElement as parameter
         *
         * @param img
         * @memberof AjfBarcode
         */
        /**
         * call \@zxing library method with HTMLImageElement as parameter
         *
         * \@memberof AjfBarcode
         * @private
         * @param {?} img
         * @return {?}
         */
        AjfBarcode.prototype._readBarcodeFromImage = /**
         * call \@zxing library method with HTMLImageElement as parameter
         *
         * \@memberof AjfBarcode
         * @private
         * @param {?} img
         * @return {?}
         */
        function (img) {
            return rxjs.from(this.codeReader.decodeFromImage(img))
                .pipe(operators.catchError((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return rxjs.of((/** @type {?} */ (e))); })));
        };
        /**
         * build an image by data and call _readBarcodeFromImage
         *
         * @param data
         * @memberof AjfBarcode
         */
        /**
         * build an image by data and call _readBarcodeFromImage
         *
         * \@memberof AjfBarcode
         * @private
         * @param {?} data
         * @return {?}
         */
        AjfBarcode.prototype._readBarcodeFromData = /**
         * build an image by data and call _readBarcodeFromImage
         *
         * \@memberof AjfBarcode
         * @private
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var image = this._createImage(data);
            return this._readBarcodeFromImage(image);
        };
        /**
         * build an image by data
         *
         * @param data
         * @memberof AjfBarcode
         */
        /**
         * build an image by data
         *
         * \@memberof AjfBarcode
         * @private
         * @param {?} data
         * @return {?}
         */
        AjfBarcode.prototype._createImage = /**
         * build an image by data
         *
         * \@memberof AjfBarcode
         * @private
         * @param {?} data
         * @return {?}
         */
        function (data) {
            /** @type {?} */
            var image = this._renderer.createElement('img');
            if (data !== null && typeof data === 'string') {
                image.src = data;
            }
            return image;
        };
        AjfBarcode.propDecorators = {
            readonly: [{ type: core.Input }]
        };
        return AjfBarcode;
    }());

    exports.AjfBarcode = AjfBarcode;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-barcode.umd.js.map
