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
var AjfBarcode = /** @class */ (function () {
    function AjfBarcode(_cdr, _renderer) {
        var _this = this;
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
        this._onChangeCallback = function (_) { };
        this._onTouchedCallback = function () { };
        this._init();
        this._startDetectionSub = this.startDetection.asObservable()
            .pipe(debounceTime(300), switchMap(function () {
            var data = _this._getDataFromVideo(_this.videoSource);
            return _this._readBarcodeFromData(data);
        }), catchError(function () {
            return of({});
        }))
            .subscribe(function (result) {
            if (!result.text) {
                _this.startDetection.emit();
            }
            else {
                _this.toggle = 'drop';
                _this.value = result.text;
            }
        });
        this._startCalculationSub = this.startCalculation.asObservable()
            .pipe(switchMap(function (data) {
            return _this._readBarcodeFromData(data);
        }))
            .subscribe(function (result) {
            if (result.text) {
                _this.toggle = 'drop';
                _this.value = result.text;
            }
        });
    }
    Object.defineProperty(AjfBarcode.prototype, "canvasCtx", {
        get: function () {
            return this._canvas.getContext('2d');
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfBarcode.prototype, "videoSource", {
        get: function () {
            return this._video;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfBarcode.prototype, "value", {
        get: function () {
            return this._barcodeValue;
        },
        set: function (value) {
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
        get: function () {
            return this._toggle;
        },
        set: function (val) {
            this._toggle = val;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    AjfBarcode.prototype.reset = function () {
        this.value = '';
        this._onTouchedCallback();
    };
    AjfBarcode.prototype.takeSnapshot = function () {
        this.startDetection.emit();
    };
    AjfBarcode.prototype.onSelectFile = function (evt) {
        if (evt == null || evt.target == null) {
            return;
        }
        var target = evt.target;
        var files = target.files;
        this._onSelect(files);
    };
    AjfBarcode.prototype.onSelectDrop = function (files) {
        if (files == null) {
            return;
        }
        this._onSelect(files);
    };
    /** ControlValueAccessor implements */
    AjfBarcode.prototype.writeValue = function (value) {
        this._barcodeValue = value;
    };
    AjfBarcode.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    AjfBarcode.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    AjfBarcode.prototype.ngOnDestroy = function () {
        this._startCalculationSub.unsubscribe();
        this._startDetectionSub.unsubscribe();
    };
    AjfBarcode.prototype._init = function () {
        this._initCanvas();
        this._initVideo();
    };
    AjfBarcode.prototype._initCanvas = function () {
        this._canvas = this._renderer.createElement('canvas');
        this._canvas.height = 480;
        this._canvas.width = 640;
    };
    AjfBarcode.prototype._initVideo = function () {
        this._video = this._renderer.createElement('video');
        this._video.height = 480;
        this._video.width = 640;
    };
    AjfBarcode.prototype._onSelect = function (files) {
        var _this = this;
        if (files != null && files.length > 0 && files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function (ev) {
                var data = ev.target.result;
                _this.startCalculation.emit(data);
                _this._cdr.detectChanges();
            };
        }
    };
    /**
     * write a frame of HTMLVideoElement into HTMLCanvasElement and
     * return the result of toDataURL('image/png')
     *
     * @param video
     * @memberof AjfBarcode
     */
    AjfBarcode.prototype._getDataFromVideo = function (video) {
        this.canvasCtx.drawImage(video, 0, 0, 640, 480);
        return this._canvas.toDataURL('image/png');
    };
    /**
     * call @zxing library method with HTMLImageElement as parameter
     *
     * @param img
     * @memberof AjfBarcode
     */
    AjfBarcode.prototype._readBarcodeFromImage = function (img) {
        return from(this.codeReader.decodeFromImage(img)).pipe(catchError(function (e) { return of(e); }));
    };
    /**
     * build an image by data and call _readBarcodeFromImage
     *
     * @param data
     * @memberof AjfBarcode
     */
    AjfBarcode.prototype._readBarcodeFromData = function (data) {
        var image = this._createImage(data);
        return this._readBarcodeFromImage(image);
    };
    /**
     * build an image by data
     *
     * @param data
     * @memberof AjfBarcode
     */
    AjfBarcode.prototype._createImage = function (data) {
        var image = this._renderer.createElement('img');
        if (data !== null && typeof data === 'string') {
            image.src = data;
        }
        return image;
    };
    AjfBarcode.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfBarcode.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
    return AjfBarcode;
}());

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
