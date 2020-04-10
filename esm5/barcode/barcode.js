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
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
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
    Object.defineProperty(AjfBarcode.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (readonly) {
            this._readonly = coerceBooleanProperty(readonly);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
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
        var _this = this;
        if (evt == null || evt.target == null) {
            return;
        }
        var target = evt.target;
        var files = target.files;
        if (files != null && files[0]) {
            var reader = new FileReader();
            reader.readAsDataURL(files[0]);
            reader.onload = function (ev) {
                var data = ev.target.result;
                _this.startCalculation.emit(data);
                _this._cdr.detectChanges();
            };
        }
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
    AjfBarcode.propDecorators = {
        readonly: [{ type: Input }]
    };
    return AjfBarcode;
}());
export { AjfBarcode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2JhcmNvZGUvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLFNBQVMsRUFDVixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsb0JBQW9CLEVBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQUMsSUFBSSxFQUFjLEVBQUUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkU7SUFpRUUsb0JBQW9CLElBQXVCLEVBQVUsU0FBb0I7UUFBekUsaUJBZ0NDO1FBaENtQixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFyRGhFLGVBQVUsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7UUFFeEMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFOUMsdUJBQWtCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdEQseUJBQW9CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFpQmpFOzs7OztXQUtHO1FBQ0ssa0JBQWEsR0FBRyxFQUFFLENBQUM7UUFZbkIsWUFBTyxHQUFHLE1BQU0sQ0FBQztRQVNqQixzQkFBaUIsR0FBRyxVQUFDLENBQU0sSUFBTSxDQUFDLENBQUM7UUFDbkMsdUJBQWtCLEdBQUcsY0FBTyxD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QUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsRUFBRSxDQUFDLENBQVcsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDLENBQUM7SUFDM0YsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0sseUNBQW9CLEdBQTVCLFVBQTZCLElBQVk7UUFDdkMsSUFBTSxLQUFLLEdBQXFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssaUNBQVksR0FBcEIsVUFBcUIsSUFBWTtRQUMvQixJQUFNLEtBQUssR0FBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM3QyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNsQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBOU1GLFNBQVM7Ozs7Z0JBWlIsaUJBQWlCO2dCQUtqQixTQUFTOzs7MkJBYVIsS0FBSzs7SUF5TVIsaUJBQUM7Q0FBQSxBQS9NRCxJQStNQztTQTlNcUIsVUFBVSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QnJvd3NlckJhcmNvZGVSZWFkZXIsIFJlc3VsdH0gZnJvbSAnQHp4aW5nL2xpYnJhcnknO1xuaW1wb3J0IHtmcm9tLCBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQmFyY29kZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xuICBwcm90ZWN0ZWQgX3JlYWRvbmx5OiBib29sZWFuO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWFkb25seSBjb2RlUmVhZGVyID0gbmV3IEJyb3dzZXJCYXJjb2RlUmVhZGVyKCk7XG5cbiAgcmVhZG9ubHkgc3RhcnREZXRlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHJlYWRvbmx5IHN0YXJ0Q2FsY3VsYXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICByZWFkb25seSBfc3RhcnREZXRlY3Rpb25TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcmVhZG9ubHkgX3N0YXJ0Q2FsY3VsYXRpb25TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBnZXQgY2FudmFzQ3R4KCkge1xuICAgIHJldHVybiB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gIH1cblxuICAvKipcbiAgICogQSBodG1sIHZpZGVvIGVsZW1lbnQgY3JlYXRlZCBhdCBydW50aW1lXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF92aWRlbzogSFRNTFZpZGVvRWxlbWVudDtcbiAgZ2V0IHZpZGVvU291cmNlKCk6IEhUTUxWaWRlb0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl92aWRlbztcbiAgfVxuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnQgdGhlIGNvbnRyb2wgZm9ybSB2YWx1ZS5cbiAgICogcmFwcHJlc2VudCB0aGUgYmFyY29kZSB2YWx1ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2JhcmNvZGVWYWx1ZSA9ICcnO1xuICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYmFyY29kZVZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2JhcmNvZGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2JhcmNvZGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZSA9ICdkcm9wJztcbiAgZ2V0IHRvZ2dsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9nZ2xlO1xuICB9XG4gIHNldCB0b2dnbGUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90b2dnbGUgPSB2YWw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICB0aGlzLl9zdGFydERldGVjdGlvblN1YiA9IHRoaXMuc3RhcnREZXRlY3Rpb24uYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDMwMCksIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZGF0YTogc3RyaW5nID1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fZ2V0RGF0YUZyb21WaWRlbyh0aGlzLnZpZGVvU291cmNlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVhZEJhcmNvZGVGcm9tRGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvZih7fSBhcyBSZXN1bHQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGV0ZWN0aW9uLmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlID0gJ2Ryb3AnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LnRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICB0aGlzLl9zdGFydENhbGN1bGF0aW9uU3ViID0gdGhpcy5zdGFydENhbGN1bGF0aW9uLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShzd2l0Y2hNYXAoKGRhdGE6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fcmVhZEJhcmNvZGVGcm9tRGF0YShkYXRhKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUgPSAnZHJvcCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHJlc3VsdC50ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgdGFrZVNuYXBzaG90KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnREZXRlY3Rpb24uZW1pdCgpO1xuICB9XG5cbiAgb25TZWxlY3RGaWxlKGV2dDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZ0ID09IG51bGwgfHwgZXZ0LnRhcmdldCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBmaWxlcyA9IHRhcmdldC5maWxlcztcbiAgICBpZiAoZmlsZXMgIT0gbnVsbCAmJiBmaWxlc1swXSkge1xuICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGVzWzBdKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXY6IFByb2dyZXNzRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YTogc3RyaW5nID0gKGV2LnRhcmdldCBhcyBGaWxlUmVhZGVyKS5yZXN1bHQgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLnN0YXJ0Q2FsY3VsYXRpb24uZW1pdChkYXRhKTtcbiAgICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGltcGxlbWVudHMgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmFyY29kZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXJ0Q2FsY3VsYXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zdGFydERldGVjdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0Q2FudmFzKCk7XG4gICAgdGhpcy5faW5pdFZpZGVvKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q2FudmFzKCk6IHZvaWQge1xuICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSA0ODA7XG4gICAgdGhpcy5fY2FudmFzLndpZHRoID0gNjQwO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZpZGVvKCk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZGVvID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICB0aGlzLl92aWRlby5oZWlnaHQgPSA0ODA7XG4gICAgdGhpcy5fdmlkZW8ud2lkdGggPSA2NDA7XG4gIH1cblxuICAvKipcbiAgICogd3JpdGUgYSBmcmFtZSBvZiBIVE1MVmlkZW9FbGVtZW50IGludG8gSFRNTENhbnZhc0VsZW1lbnQgYW5kXG4gICAqIHJldHVybiB0aGUgcmVzdWx0IG9mIHRvRGF0YVVSTCgnaW1hZ2UvcG5nJylcbiAgICpcbiAgICogQHBhcmFtIHZpZGVvXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9nZXREYXRhRnJvbVZpZGVvKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50KTogc3RyaW5nIHtcbiAgICB0aGlzLmNhbnZhc0N0eC5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIDY0MCwgNDgwKTtcbiAgICByZXR1cm4gdGhpcy5fY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCBAenhpbmcgbGlicmFyeSBtZXRob2Qgd2l0aCBIVE1MSW1hZ2VFbGVtZW50IGFzIHBhcmFtZXRlclxuICAgKlxuICAgKiBAcGFyYW0gaW1nXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9yZWFkQmFyY29kZUZyb21JbWFnZShpbWc6IEhUTUxJbWFnZUVsZW1lbnQpOiBPYnNlcnZhYmxlPFJlc3VsdD4ge1xuICAgIHJldHVybiBmcm9tKHRoaXMuY29kZVJlYWRlci5kZWNvZGVGcm9tSW1hZ2UoaW1nKSkucGlwZShjYXRjaEVycm9yKGUgPT4gb2YoZSBhcyBSZXN1bHQpKSk7XG4gIH1cblxuICAvKipcbiAgICogYnVpbGQgYW4gaW1hZ2UgYnkgZGF0YSBhbmQgY2FsbCBfcmVhZEJhcmNvZGVGcm9tSW1hZ2VcbiAgICpcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3JlYWRCYXJjb2RlRnJvbURhdGEoZGF0YTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXN1bHQ+IHtcbiAgICBjb25zdCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IHRoaXMuX2NyZWF0ZUltYWdlKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLl9yZWFkQmFyY29kZUZyb21JbWFnZShpbWFnZSk7XG4gIH1cblxuICAvKipcbiAgICogYnVpbGQgYW4gaW1hZ2UgYnkgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSW1hZ2UoZGF0YTogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpZiAoZGF0YSAhPT0gbnVsbCAmJiB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGltYWdlLnNyYyA9IGRhdGE7XG4gICAgfVxuICAgIHJldHVybiBpbWFnZTtcbiAgfVxufVxuIl19