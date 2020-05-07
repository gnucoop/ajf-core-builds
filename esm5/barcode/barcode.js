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
import { ChangeDetectorRef, Directive, EventEmitter, Renderer2 } from '@angular/core';
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
export { AjfBarcode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2JhcmNvZGUvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBYSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0YsT0FBTyxFQUFDLG9CQUFvQixFQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUQsT0FBTyxFQUFDLElBQUksRUFBYyxFQUFFLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5FO0lBdURFLG9CQUFvQixJQUF1QixFQUFVLFNBQW9CO1FBQXpFLGlCQWdDQztRQWhDbUIsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBckRoRSxlQUFVLEdBQUcsSUFBSSxvQkFBb0IsRUFBRSxDQUFDO1FBRXhDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUMxQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRTlDLHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3RELHlCQUFvQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBaUJqRTs7Ozs7V0FLRztRQUNLLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBWW5CLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFTakIsc0JBQWlCLEdBQUcsVUFBQyxDQUFNLElBQU0sQ0FBQyxDQUFDO1FBQ25DLHVCQUFrQixHQUFHLGNBQU8sQ0FBQyxDQUFDO1FBR3BDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLElBQUksQ0FBQyxr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SUFBSSxPQUFBLEVBQUUsQ0FBQyxDQUFXLENBQUMsRUFBZixDQUFlLENBQUMsQ0FBQyxDQUFDO0lBQzNGLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLHlDQUFvQixHQUE1QixVQUE2QixJQUFZO1FBQ3ZDLElBQU0sS0FBSyxHQUFxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLGlDQUFZLEdBQXBCLFVBQXFCLElBQVk7UUFDL0IsSUFBTSxLQUFLLEdBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDN0MsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7O2dCQWhORixTQUFTOzs7O2dCQU5GLGlCQUFpQjtnQkFBc0MsU0FBUzs7SUF1TnhFLGlCQUFDO0NBQUEsQUFqTkQsSUFpTkM7U0FoTnFCLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Jyb3dzZXJCYXJjb2RlUmVhZGVyLCBSZXN1bHR9IGZyb20gJ0B6eGluZy9saWJyYXJ5JztcbmltcG9ydCB7ZnJvbSwgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgc3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkJhcmNvZGUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgY29kZVJlYWRlciA9IG5ldyBCcm93c2VyQmFyY29kZVJlYWRlcigpO1xuXG4gIHJlYWRvbmx5IHN0YXJ0RGV0ZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICByZWFkb25seSBzdGFydENhbGN1bGF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcmVhZG9ubHkgX3N0YXJ0RGV0ZWN0aW9uU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHJlYWRvbmx5IF9zdGFydENhbGN1bGF0aW9uU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudDtcbiAgZ2V0IGNhbnZhc0N0eCgpIHtcbiAgICByZXR1cm4gdGhpcy5fY2FudmFzLmdldENvbnRleHQoJzJkJykhO1xuICB9XG5cbiAgLyoqXG4gICAqIEEgaHRtbCB2aWRlbyBlbGVtZW50IGNyZWF0ZWQgYXQgcnVudGltZVxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfdmlkZW86IEhUTUxWaWRlb0VsZW1lbnQ7XG4gIGdldCB2aWRlb1NvdXJjZSgpOiBIVE1MVmlkZW9FbGVtZW50IHtcbiAgICByZXR1cm4gdGhpcy5fdmlkZW87XG4gIH1cblxuICAvKipcbiAgICogaW1wbGVtZW50IHRoZSBjb250cm9sIGZvcm0gdmFsdWUuXG4gICAqIHJhcHByZXNlbnQgdGhlIGJhcmNvZGUgdmFsdWUuXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9iYXJjb2RlVmFsdWUgPSAnJztcbiAgZ2V0IHZhbHVlKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX2JhcmNvZGVWYWx1ZTtcbiAgfVxuICBzZXQgdmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIGlmICh0aGlzLl9iYXJjb2RlVmFsdWUgIT09IHZhbHVlKSB7XG4gICAgICB0aGlzLl9iYXJjb2RlVmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF90b2dnbGUgPSAnZHJvcCc7XG4gIGdldCB0b2dnbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3RvZ2dsZTtcbiAgfVxuICBzZXQgdG9nZ2xlKHZhbDogc3RyaW5nKSB7XG4gICAgdGhpcy5fdG9nZ2xlID0gdmFsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX29uQ2hhbmdlQ2FsbGJhY2sgPSAoXzogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkQ2FsbGJhY2sgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5faW5pdCgpO1xuXG4gICAgdGhpcy5fc3RhcnREZXRlY3Rpb25TdWIgPSB0aGlzLnN0YXJ0RGV0ZWN0aW9uLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApLCBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldERhdGFGcm9tVmlkZW8odGhpcy52aWRlb1NvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRCYXJjb2RlRnJvbURhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Yoe30gYXMgUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICghcmVzdWx0LnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zdGFydERldGVjdGlvbi5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSA9ICdkcm9wJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHJlc3VsdC50ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgdGhpcy5fc3RhcnRDYWxjdWxhdGlvblN1YiA9IHRoaXMuc3RhcnRDYWxjdWxhdGlvbi5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoc3dpdGNoTWFwKChkYXRhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRCYXJjb2RlRnJvbURhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChyZXN1bHQudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlID0gJ2Ryb3AnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHQudGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICByZXNldCgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gJyc7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgfVxuXG4gIHRha2VTbmFwc2hvdCgpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0RGV0ZWN0aW9uLmVtaXQoKTtcbiAgfVxuXG4gIG9uU2VsZWN0RmlsZShldnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2dCA9PSBudWxsIHx8IGV2dC50YXJnZXQgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSBldnQudGFyZ2V0IGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG4gICAgY29uc3QgZmlsZXMgPSB0YXJnZXQuZmlsZXMgYXMgRmlsZUxpc3Q7XG4gICAgdGhpcy5fb25TZWxlY3QoZmlsZXMpO1xuICB9XG5cbiAgb25TZWxlY3REcm9wKGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX29uU2VsZWN0KGZpbGVzKTtcbiAgfVxuXG4gIC8qKiBDb250cm9sVmFsdWVBY2Nlc3NvciBpbXBsZW1lbnRzICovXG4gIHdyaXRlVmFsdWUodmFsdWU6IHN0cmluZykge1xuICAgIHRoaXMuX2JhcmNvZGVWYWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogKCkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9zdGFydENhbGN1bGF0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fc3RhcnREZXRlY3Rpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5faW5pdENhbnZhcygpO1xuICAgIHRoaXMuX2luaXRWaWRlbygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENhbnZhcygpOiB2b2lkIHtcbiAgICB0aGlzLl9jYW52YXMgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgICB0aGlzLl9jYW52YXMuaGVpZ2h0ID0gNDgwO1xuICAgIHRoaXMuX2NhbnZhcy53aWR0aCA9IDY0MDtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRWaWRlbygpOiB2b2lkIHtcbiAgICB0aGlzLl92aWRlbyA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG4gICAgdGhpcy5fdmlkZW8uaGVpZ2h0ID0gNDgwO1xuICAgIHRoaXMuX3ZpZGVvLndpZHRoID0gNjQwO1xuICB9XG5cblxuICBwcml2YXRlIF9vblNlbGVjdChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMgIT0gbnVsbCAmJiBmaWxlcy5sZW5ndGggPiAwICYmIGZpbGVzWzBdKSB7XG4gICAgICBsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZXNbMF0pO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IChldjogUHJvZ3Jlc3NFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhOiBzdHJpbmcgPSAoZXYudGFyZ2V0IGFzIEZpbGVSZWFkZXIpLnJlc3VsdCBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuc3RhcnRDYWxjdWxhdGlvbi5lbWl0KGRhdGEpO1xuICAgICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogd3JpdGUgYSBmcmFtZSBvZiBIVE1MVmlkZW9FbGVtZW50IGludG8gSFRNTENhbnZhc0VsZW1lbnQgYW5kXG4gICAqIHJldHVybiB0aGUgcmVzdWx0IG9mIHRvRGF0YVVSTCgnaW1hZ2UvcG5nJylcbiAgICpcbiAgICogQHBhcmFtIHZpZGVvXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9nZXREYXRhRnJvbVZpZGVvKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50KTogc3RyaW5nIHtcbiAgICB0aGlzLmNhbnZhc0N0eC5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIDY0MCwgNDgwKTtcbiAgICByZXR1cm4gdGhpcy5fY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCBAenhpbmcgbGlicmFyeSBtZXRob2Qgd2l0aCBIVE1MSW1hZ2VFbGVtZW50IGFzIHBhcmFtZXRlclxuICAgKlxuICAgKiBAcGFyYW0gaW1nXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9yZWFkQmFyY29kZUZyb21JbWFnZShpbWc6IEhUTUxJbWFnZUVsZW1lbnQpOiBPYnNlcnZhYmxlPFJlc3VsdD4ge1xuICAgIHJldHVybiBmcm9tKHRoaXMuY29kZVJlYWRlci5kZWNvZGVGcm9tSW1hZ2UoaW1nKSkucGlwZShjYXRjaEVycm9yKGUgPT4gb2YoZSBhcyBSZXN1bHQpKSk7XG4gIH1cblxuICAvKipcbiAgICogYnVpbGQgYW4gaW1hZ2UgYnkgZGF0YSBhbmQgY2FsbCBfcmVhZEJhcmNvZGVGcm9tSW1hZ2VcbiAgICpcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3JlYWRCYXJjb2RlRnJvbURhdGEoZGF0YTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXN1bHQ+IHtcbiAgICBjb25zdCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IHRoaXMuX2NyZWF0ZUltYWdlKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLl9yZWFkQmFyY29kZUZyb21JbWFnZShpbWFnZSk7XG4gIH1cblxuICAvKipcbiAgICogYnVpbGQgYW4gaW1hZ2UgYnkgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSW1hZ2UoZGF0YTogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpZiAoZGF0YSAhPT0gbnVsbCAmJiB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGltYWdlLnNyYyA9IGRhdGE7XG4gICAgfVxuICAgIHJldHVybiBpbWFnZTtcbiAgfVxufVxuIl19