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
        })).subscribe(function (result) {
            if (result.text) {
                _this.toggle = 'drop';
                _this.value = result.text;
            }
        });
    }
    Object.defineProperty(AjfBarcode.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (readonly) {
            this._readonly = coerceBooleanProperty(readonly);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfBarcode.prototype, "canvasCtx", {
        get: function () { return this._canvas.getContext('2d'); },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfBarcode.prototype, "videoSource", {
        get: function () { return this._video; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfBarcode.prototype, "value", {
        get: function () { return this._barcodeValue; },
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
        get: function () { return this._toggle; },
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
        return from(this.codeReader.decodeFromImage(img))
            .pipe(catchError(function (e) { return of(e); }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2JhcmNvZGUvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxLQUFLLEVBQUUsU0FBUyxFQUN4RCxNQUFNLGVBQWUsQ0FBQztBQUVsQyxPQUFPLEVBQUMsb0JBQW9CLEVBQVMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1RCxPQUFPLEVBQWEsSUFBSSxFQUFFLEVBQUUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDeEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFbkU7SUFzREUsb0JBQW9CLElBQXVCLEVBQVUsU0FBb0I7UUFBekUsaUJBa0NDO1FBbENtQixTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUE3Q2hFLGVBQVUsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7UUFFeEMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQzFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7UUFFOUMsdUJBQWtCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFDdEQseUJBQW9CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFhakU7Ozs7O1dBS0c7UUFDSyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQVVuQixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBT2pCLHNCQUFpQixHQUFHLFVBQUMsQ0FBTSxJQUFPLENBQUMsQ0FBQztRQUNwQyx1QkFBa0IsR0FBRyxjQUFPLENB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VUFBVSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsRUFBRSxDQUFDLENBQVcsQ0FBQyxFQUFmLENBQWUsQ0FBQyxDQUFDLENBQUM7SUFDOUMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0sseUNBQW9CLEdBQTVCLFVBQTZCLElBQVk7UUFDdkMsSUFBTSxLQUFLLEdBQXFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssaUNBQVksR0FBcEIsVUFBcUIsSUFBWTtRQUMvQixJQUFNLEtBQUssR0FBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM3QyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNsQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBcE1GLFNBQVM7Ozs7Z0JBUEYsaUJBQWlCO2dCQUFrQyxTQUFTOzs7MkJBV2pFLEtBQUs7O0lBaU1SLGlCQUFDO0NBQUEsQUFyTUQsSUFxTUM7U0FwTXFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIElucHV0LCBSZW5kZXJlcjIsXG4gIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Jyb3dzZXJCYXJjb2RlUmVhZGVyLCBSZXN1bHR9IGZyb20gJ0B6eGluZy9saWJyYXJ5JztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgZnJvbSwgb2YsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIHN3aXRjaE1hcCwgZGVib3VuY2VUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkJhcmNvZGUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcbiAgcHJvdGVjdGVkIF9yZWFkb25seTogYm9vbGVhbjtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVhZG9ubHk7IH1cbiAgQElucHV0KCkgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlYWRvbmx5IGNvZGVSZWFkZXIgPSBuZXcgQnJvd3NlckJhcmNvZGVSZWFkZXIoKTtcblxuICByZWFkb25seSBzdGFydERldGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcmVhZG9ubHkgc3RhcnRDYWxjdWxhdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHJlYWRvbmx5IF9zdGFydERldGVjdGlvblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICByZWFkb25seSBfc3RhcnRDYWxjdWxhdGlvblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGdldCBjYW52YXNDdHgoKSB7cmV0dXJuIHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpITsgfVxuXG4gIC8qKlxuICAgKiBBIGh0bWwgdmlkZW8gZWxlbWVudCBjcmVhdGVkIGF0IHJ1bnRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3ZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICBnZXQgdmlkZW9Tb3VyY2UoKTogSFRNTFZpZGVvRWxlbWVudCB7cmV0dXJuIHRoaXMuX3ZpZGVvOyB9XG5cbiAgLyoqXG4gICAqIGltcGxlbWVudCB0aGUgY29udHJvbCBmb3JtIHZhbHVlLlxuICAgKiByYXBwcmVzZW50IHRoZSBiYXJjb2RlIHZhbHVlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfYmFyY29kZVZhbHVlID0gJyc7XG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fYmFyY29kZVZhbHVlOyB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2JhcmNvZGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2JhcmNvZGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZSA9ICdkcm9wJztcbiAgZ2V0IHRvZ2dsZSgpIHsgcmV0dXJuIHRoaXMuX3RvZ2dsZTsgfVxuICBzZXQgdG9nZ2xlKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fdG9nZ2xlID0gdmFsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX29uQ2hhbmdlQ2FsbGJhY2sgPSAoXzogYW55KSA9PiB7IH07XG4gIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX2luaXQoKTtcblxuICAgIHRoaXMuX3N0YXJ0RGV0ZWN0aW9uU3ViID0gdGhpcy5zdGFydERldGVjdGlvbi5hc09ic2VydmFibGUoKVxuICAgICAgLnBpcGUoXG4gICAgICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YTogc3RyaW5nID0gdGhpcy5fZ2V0RGF0YUZyb21WaWRlbyh0aGlzLnZpZGVvU291cmNlKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRCYXJjb2RlRnJvbURhdGEoZGF0YSk7XG4gICAgICAgICAgfSksXG4gICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBvZih7fSBhcyBSZXN1bHQpO1xuICAgICAgICAgIH0pXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgIGlmICghcmVzdWx0LnRleHQpIHtcbiAgICAgICAgICAgICAgdGhpcy5zdGFydERldGVjdGlvbi5lbWl0KCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhpcy50b2dnbGUgPSAnZHJvcCc7XG4gICAgICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHQudGV4dDtcbiAgICAgICAgICB9XG4gICAgICB9KTtcblxuICAgIHRoaXMuX3N0YXJ0Q2FsY3VsYXRpb25TdWIgPSB0aGlzLnN0YXJ0Q2FsY3VsYXRpb24uYXNPYnNlcnZhYmxlKClcbiAgICAgIC5waXBlKFxuICAgICAgICAgIHN3aXRjaE1hcCgoZGF0YTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFkQmFyY29kZUZyb21EYXRhKGRhdGEpO1xuICAgICAgICAgIH0pXG4gICAgICApLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAocmVzdWx0LnRleHQpIHtcbiAgICAgICAgICAgICAgdGhpcy50b2dnbGUgPSAnZHJvcCc7XG4gICAgICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHQudGV4dDtcbiAgICAgICAgICB9XG4gICAgICB9KTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgdGFrZVNuYXBzaG90KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnREZXRlY3Rpb24uZW1pdCgpO1xuICB9XG5cbiAgb25TZWxlY3RGaWxlKGV2dDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZ0ID09IG51bGwgfHwgZXZ0LnRhcmdldCA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBmaWxlcyA9IHRhcmdldC5maWxlcztcbiAgICBpZiAoZmlsZXMgIT0gbnVsbCAmJiBmaWxlc1swXSkge1xuICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGVzWzBdKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXY6IFByb2dyZXNzRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YTogc3RyaW5nID0gKGV2LnRhcmdldCBhcyBGaWxlUmVhZGVyKS5yZXN1bHQgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLnN0YXJ0Q2FsY3VsYXRpb24uZW1pdChkYXRhKTtcbiAgICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGltcGxlbWVudHMgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmFyY29kZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXJ0Q2FsY3VsYXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zdGFydERldGVjdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0Q2FudmFzKCk7XG4gICAgdGhpcy5faW5pdFZpZGVvKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q2FudmFzKCk6IHZvaWQge1xuICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSA0ODA7XG4gICAgdGhpcy5fY2FudmFzLndpZHRoID0gNjQwO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZpZGVvKCk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZGVvID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICB0aGlzLl92aWRlby5oZWlnaHQgPSA0ODA7XG4gICAgdGhpcy5fdmlkZW8ud2lkdGggPSA2NDA7XG4gIH1cblxuICAvKipcbiAgICogd3JpdGUgYSBmcmFtZSBvZiBIVE1MVmlkZW9FbGVtZW50IGludG8gSFRNTENhbnZhc0VsZW1lbnQgYW5kXG4gICAqIHJldHVybiB0aGUgcmVzdWx0IG9mIHRvRGF0YVVSTCgnaW1hZ2UvcG5nJylcbiAgICpcbiAgICogQHBhcmFtIHZpZGVvXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9nZXREYXRhRnJvbVZpZGVvKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50KTogc3RyaW5nIHtcbiAgICB0aGlzLmNhbnZhc0N0eC5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIDY0MCwgNDgwKTtcbiAgICByZXR1cm4gdGhpcy5fY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCBAenhpbmcgbGlicmFyeSBtZXRob2Qgd2l0aCBIVE1MSW1hZ2VFbGVtZW50IGFzIHBhcmFtZXRlclxuICAgKlxuICAgKiBAcGFyYW0gaW1nXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9yZWFkQmFyY29kZUZyb21JbWFnZShpbWc6IEhUTUxJbWFnZUVsZW1lbnQpOiBPYnNlcnZhYmxlPFJlc3VsdD4ge1xuICAgIHJldHVybiBmcm9tKHRoaXMuY29kZVJlYWRlci5kZWNvZGVGcm9tSW1hZ2UoaW1nKSlcbiAgICAgICAgLnBpcGUoY2F0Y2hFcnJvcihlID0+IG9mKGUgYXMgUmVzdWx0KSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGJ1aWxkIGFuIGltYWdlIGJ5IGRhdGEgYW5kIGNhbGwgX3JlYWRCYXJjb2RlRnJvbUltYWdlXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9yZWFkQmFyY29kZUZyb21EYXRhKGRhdGE6IHN0cmluZyk6IE9ic2VydmFibGU8UmVzdWx0PiB7XG4gICAgY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSB0aGlzLl9jcmVhdGVJbWFnZShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5fcmVhZEJhcmNvZGVGcm9tSW1hZ2UoaW1hZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGJ1aWxkIGFuIGltYWdlIGJ5IGRhdGFcbiAgICpcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZUltYWdlKGRhdGE6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGNvbnN0IGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaWYgKGRhdGEgIT09IG51bGwgJiYgdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpbWFnZS5zcmMgPSBkYXRhO1xuICAgIH1cbiAgICByZXR1cm4gaW1hZ2U7XG4gIH1cbn1cbiJdfQ==