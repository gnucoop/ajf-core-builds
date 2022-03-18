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
import { Directive, EventEmitter } from '@angular/core';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { from, of, Subscription } from 'rxjs';
import { catchError, debounceTime, switchMap } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class AjfBarcode {
    constructor(_cdr, _renderer) {
        this._cdr = _cdr;
        this._renderer = _renderer;
        this.codeReader = new BrowserMultiFormatReader();
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
        if (this.videoSource != null) {
            this._startDetectionSub = this.startDetection
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
        }
        this._startCalculationSub = this.startCalculation
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
        return this._canvas?.getContext('2d');
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
        if (this._canvas == null) {
            return;
        }
        this._canvas.height = 480;
        this._canvas.width = 640;
    }
    _initVideo() {
        this._video = this._renderer.createElement('video');
        if (this._video == null) {
            return;
        }
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
        if (this.canvasCtx == null || this._canvas == null) {
            return '';
        }
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
        const decode = from(this.codeReader.decodeFromImageElement(img));
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
AjfBarcode.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfBarcode, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
AjfBarcode.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfBarcode, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfBarcode, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvYmFyY29kZS9zcmMvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQW9CLFNBQVMsRUFBRSxZQUFZLEVBQXVCLE1BQU0sZUFBZSxDQUFDO0FBRS9GLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXhELE9BQU8sRUFBQyxJQUFJLEVBQWMsRUFBRSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUN4RCxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFHbkUsTUFBTSxPQUFnQixVQUFVO0lBc0Q5QixZQUFvQixJQUF1QixFQUFVLFNBQW9CO1FBQXJELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsY0FBUyxHQUFULFNBQVMsQ0FBVztRQXJEaEUsZUFBVSxHQUFHLElBQUksd0JBQXdCLEVBQUUsQ0FBQztRQUU1QyxtQkFBYyxHQUFHLElBQUksWUFBWSxFQUFRLENBQUM7UUFDMUMscUJBQWdCLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztRQUU5Qyx1QkFBa0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUN0RCx5QkFBb0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQWlCakU7Ozs7O1dBS0c7UUFDSyxrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQVluQixZQUFPLEdBQUcsTUFBTSxDQUFDO1FBU2pCLHNCQUFpQixHQUFHLENBQUMsQ0FBTSxFQUFFLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFDbkMsdUJBQWtCLEdBQUcsR0FBRyxFQUFFLEdBQUUsQ0FBQyxDQUFDO1FBR3BDLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUViLElBQUksSUFBSSxDQUFDLFdB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QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxxQkFBcUIsQ0FBQyxHQUFxQjtRQUNqRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBdUIsQ0FBQztRQUN2RixPQUFPLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQXVCLENBQUM7SUFDbkUsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssb0JBQW9CLENBQUMsSUFBWTtRQUN2QyxNQUFNLEtBQUssR0FBcUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4RCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSyxZQUFZLENBQUMsSUFBWTtRQUMvQixNQUFNLEtBQUssR0FBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDcEUsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtZQUM3QyxLQUFLLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQztTQUNsQjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7dUdBN05tQixVQUFVOzJGQUFWLFVBQVU7MkZBQVYsVUFBVTtrQkFEL0IsU0FBUyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBFdmVudEVtaXR0ZXIsIE9uRGVzdHJveSwgUmVuZGVyZXIyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QnJvd3Nlck11bHRpRm9ybWF0UmVhZGVyfSBmcm9tICdAenhpbmcvYnJvd3Nlcic7XG5pbXBvcnQge1Jlc3VsdH0gZnJvbSAnQHp4aW5nL2xpYnJhcnknO1xuaW1wb3J0IHtmcm9tLCBPYnNlcnZhYmxlLCBvZiwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgZGVib3VuY2VUaW1lLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQmFyY29kZSBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkRlc3Ryb3kge1xuICByZWFkb25seSBjb2RlUmVhZGVyID0gbmV3IEJyb3dzZXJNdWx0aUZvcm1hdFJlYWRlcigpO1xuXG4gIHJlYWRvbmx5IHN0YXJ0RGV0ZWN0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICByZWFkb25seSBzdGFydENhbGN1bGF0aW9uID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG5cbiAgcmVhZG9ubHkgX3N0YXJ0RGV0ZWN0aW9uU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHJlYWRvbmx5IF9zdGFydENhbGN1bGF0aW9uU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfY2FudmFzPzogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGdldCBjYW52YXNDdHgoKTogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJEIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fY2FudmFzPy5nZXRDb250ZXh0KCcyZCcpITtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGh0bWwgdmlkZW8gZWxlbWVudCBjcmVhdGVkIGF0IHJ1bnRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3ZpZGVvPzogSFRNTFZpZGVvRWxlbWVudDtcbiAgZ2V0IHZpZGVvU291cmNlKCk6IEhUTUxWaWRlb0VsZW1lbnQgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB0aGlzLl92aWRlbztcbiAgfVxuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnQgdGhlIGNvbnRyb2wgZm9ybSB2YWx1ZS5cbiAgICogcmFwcHJlc2VudCB0aGUgYmFyY29kZSB2YWx1ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2JhcmNvZGVWYWx1ZSA9ICcnO1xuICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYmFyY29kZVZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2JhcmNvZGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2JhcmNvZGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZSA9ICdkcm9wJztcbiAgZ2V0IHRvZ2dsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9nZ2xlO1xuICB9XG4gIHNldCB0b2dnbGUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90b2dnbGUgPSB2YWw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICBpZiAodGhpcy52aWRlb1NvdXJjZSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9zdGFydERldGVjdGlvblN1YiA9ICh0aGlzLnN0YXJ0RGV0ZWN0aW9uIGFzIE9ic2VydmFibGU8dm9pZD4pXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgICAgIHN3aXRjaE1hcCgoKSA9PiB7XG4gICAgICAgICAgICBjb25zdCBkYXRhOiBzdHJpbmcgPSB0aGlzLl9nZXREYXRhRnJvbVZpZGVvKHRoaXMudmlkZW9Tb3VyY2UhKTtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFkQmFyY29kZUZyb21EYXRhKGRhdGEpO1xuICAgICAgICAgIH0pLFxuICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4ge1xuICAgICAgICAgICAgcmV0dXJuIG9mKHt9IGFzIFJlc3VsdCk7XG4gICAgICAgICAgfSksXG4gICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICBpZiAoIXJlc3VsdC50ZXh0KSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0RGV0ZWN0aW9uLmVtaXQoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy50b2dnbGUgPSAnZHJvcCc7XG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICB0aGlzLl9zdGFydENhbGN1bGF0aW9uU3ViID0gKHRoaXMuc3RhcnRDYWxjdWxhdGlvbiBhcyBPYnNlcnZhYmxlPHN0cmluZz4pXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChkYXRhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fcmVhZEJhcmNvZGVGcm9tRGF0YShkYXRhKTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0LnRleHQpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZSA9ICdkcm9wJztcbiAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LnRleHQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICB0YWtlU25hcHNob3QoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydERldGVjdGlvbi5lbWl0KCk7XG4gIH1cblxuICBvblNlbGVjdEZpbGUoZXZ0OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQgPT0gbnVsbCB8fCBldnQudGFyZ2V0ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IGZpbGVzID0gdGFyZ2V0LmZpbGVzIGFzIEZpbGVMaXN0O1xuICAgIHRoaXMuX29uU2VsZWN0KGZpbGVzKTtcbiAgfVxuXG4gIG9uU2VsZWN0RHJvcChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vblNlbGVjdChmaWxlcyk7XG4gIH1cblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iYXJjb2RlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhcnRDYWxjdWxhdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N0YXJ0RGV0ZWN0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXRDYW52YXMoKTtcbiAgICB0aGlzLl9pbml0VmlkZW8oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDYW52YXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2FudmFzID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgaWYgKHRoaXMuX2NhbnZhcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSA0ODA7XG4gICAgdGhpcy5fY2FudmFzLndpZHRoID0gNjQwO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZpZGVvKCk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZGVvID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICBpZiAodGhpcy5fdmlkZW8gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl92aWRlby5oZWlnaHQgPSA0ODA7XG4gICAgdGhpcy5fdmlkZW8ud2lkdGggPSA2NDA7XG4gIH1cblxuICBwcml2YXRlIF9vblNlbGVjdChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMgIT0gbnVsbCAmJiBmaWxlcy5sZW5ndGggPiAwICYmIGZpbGVzWzBdKSB7XG4gICAgICBsZXQgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcblxuICAgICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZXNbMF0pO1xuICAgICAgcmVhZGVyLm9ubG9hZCA9IChldjogUHJvZ3Jlc3NFdmVudCkgPT4ge1xuICAgICAgICBjb25zdCBkYXRhOiBzdHJpbmcgPSAoZXYudGFyZ2V0IGFzIEZpbGVSZWFkZXIpLnJlc3VsdCBhcyBzdHJpbmc7XG4gICAgICAgIHRoaXMuc3RhcnRDYWxjdWxhdGlvbi5lbWl0KGRhdGEpO1xuICAgICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogd3JpdGUgYSBmcmFtZSBvZiBIVE1MVmlkZW9FbGVtZW50IGludG8gSFRNTENhbnZhc0VsZW1lbnQgYW5kXG4gICAqIHJldHVybiB0aGUgcmVzdWx0IG9mIHRvRGF0YVVSTCgnaW1hZ2UvcG5nJylcbiAgICpcbiAgICogQHBhcmFtIHZpZGVvXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9nZXREYXRhRnJvbVZpZGVvKHZpZGVvOiBIVE1MVmlkZW9FbGVtZW50KTogc3RyaW5nIHtcbiAgICBpZiAodGhpcy5jYW52YXNDdHggPT0gbnVsbCB8fCB0aGlzLl9jYW52YXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICB0aGlzLmNhbnZhc0N0eC5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIDY0MCwgNDgwKTtcbiAgICByZXR1cm4gdGhpcy5fY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJyk7XG4gIH1cblxuICAvKipcbiAgICogY2FsbCBAenhpbmcgbGlicmFyeSBtZXRob2Qgd2l0aCBIVE1MSW1hZ2VFbGVtZW50IGFzIHBhcmFtZXRlclxuICAgKlxuICAgKiBAcGFyYW0gaW1nXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9yZWFkQmFyY29kZUZyb21JbWFnZShpbWc6IEhUTUxJbWFnZUVsZW1lbnQpOiBPYnNlcnZhYmxlPFJlc3VsdD4ge1xuICAgIGNvbnN0IGRlY29kZSA9IGZyb20odGhpcy5jb2RlUmVhZGVyLmRlY29kZUZyb21JbWFnZUVsZW1lbnQoaW1nKSkgYXMgT2JzZXJ2YWJsZTxSZXN1bHQ+O1xuICAgIHJldHVybiBkZWNvZGUucGlwZShjYXRjaEVycm9yKGUgPT4gb2YoZSkpKSBhcyBPYnNlcnZhYmxlPFJlc3VsdD47XG4gIH1cblxuICAvKipcbiAgICogYnVpbGQgYW4gaW1hZ2UgYnkgZGF0YSBhbmQgY2FsbCBfcmVhZEJhcmNvZGVGcm9tSW1hZ2VcbiAgICpcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3JlYWRCYXJjb2RlRnJvbURhdGEoZGF0YTogc3RyaW5nKTogT2JzZXJ2YWJsZTxSZXN1bHQ+IHtcbiAgICBjb25zdCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IHRoaXMuX2NyZWF0ZUltYWdlKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLl9yZWFkQmFyY29kZUZyb21JbWFnZShpbWFnZSk7XG4gIH1cblxuICAvKipcbiAgICogYnVpbGQgYW4gaW1hZ2UgYnkgZGF0YVxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfY3JlYXRlSW1hZ2UoZGF0YTogc3RyaW5nKTogSFRNTEltYWdlRWxlbWVudCB7XG4gICAgY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpZiAoZGF0YSAhPT0gbnVsbCAmJiB0eXBlb2YgZGF0YSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIGltYWdlLnNyYyA9IGRhdGE7XG4gICAgfVxuICAgIHJldHVybiBpbWFnZTtcbiAgfVxufVxuIl19