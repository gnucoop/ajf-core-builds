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
        return this._canvas.getContext('2d');
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
        this._canvas.height = 480;
        this._canvas.width = 640;
    }
    _initVideo() {
        this._video = this._renderer.createElement('video');
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
AjfBarcode.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfBarcode, deps: [{ token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
AjfBarcode.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfBarcode, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfBarcode, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2JhcmNvZGUvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBYSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0YsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQsT0FBTyxFQUFDLElBQUksRUFBYyxFQUFFLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUduRSxNQUFNLE9BQWdCLFVBQVU7SUFzRDlCLFlBQW9CLElBQXVCLEVBQVUsU0FBb0I7UUFBckQsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBckRoRSxlQUFVLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1FBRTVDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUMxQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRTlDLHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3RELHlCQUFvQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBaUJqRTs7Ozs7V0FLRztRQUNLLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBWW5CLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFTakIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNuQyx1QkFBa0IsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFHcEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWIs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O09BS0c7SUFDSyxvQkFBb0IsQ0FBQyxJQUFZO1FBQ3ZDLE1BQU0sS0FBSyxHQUFxQixJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hELE9BQU8sSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLENBQUM7SUFFRDs7Ozs7T0FLRztJQUNLLFlBQVksQ0FBQyxJQUFZO1FBQy9CLE1BQU0sS0FBSyxHQUFxQixJQUFJLENBQUMsU0FBUyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUNwRSxJQUFJLElBQUksS0FBSyxJQUFJLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO1lBQzdDLEtBQUssQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO1FBQ0QsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDOzsrR0F0Tm1CLFVBQVU7bUdBQVYsVUFBVTttR0FBVixVQUFVO2tCQUQvQixTQUFTIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCcm93c2VyTXVsdGlGb3JtYXRSZWFkZXJ9IGZyb20gJ0B6eGluZy9icm93c2VyJztcbmltcG9ydCB7UmVzdWx0fSBmcm9tICdAenhpbmcvbGlicmFyeSc7XG5pbXBvcnQge2Zyb20sIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBkZWJvdW5jZVRpbWUsIHN3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZCYXJjb2RlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG4gIHJlYWRvbmx5IGNvZGVSZWFkZXIgPSBuZXcgQnJvd3Nlck11bHRpRm9ybWF0UmVhZGVyKCk7XG5cbiAgcmVhZG9ubHkgc3RhcnREZXRlY3Rpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHJlYWRvbmx5IHN0YXJ0Q2FsY3VsYXRpb24gPSBuZXcgRXZlbnRFbWl0dGVyPHN0cmluZz4oKTtcblxuICByZWFkb25seSBfc3RhcnREZXRlY3Rpb25TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcmVhZG9ubHkgX3N0YXJ0Q2FsY3VsYXRpb25TdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9jYW52YXM6IEhUTUxDYW52YXNFbGVtZW50O1xuICBnZXQgY2FudmFzQ3R4KCkge1xuICAgIHJldHVybiB0aGlzLl9jYW52YXMuZ2V0Q29udGV4dCgnMmQnKSE7XG4gIH1cblxuICAvKipcbiAgICogQSBodG1sIHZpZGVvIGVsZW1lbnQgY3JlYXRlZCBhdCBydW50aW1lXG4gICAqXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF92aWRlbzogSFRNTFZpZGVvRWxlbWVudDtcbiAgZ2V0IHZpZGVvU291cmNlKCk6IEhUTUxWaWRlb0VsZW1lbnQge1xuICAgIHJldHVybiB0aGlzLl92aWRlbztcbiAgfVxuXG4gIC8qKlxuICAgKiBpbXBsZW1lbnQgdGhlIGNvbnRyb2wgZm9ybSB2YWx1ZS5cbiAgICogcmFwcHJlc2VudCB0aGUgYmFyY29kZSB2YWx1ZS5cbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2JhcmNvZGVWYWx1ZSA9ICcnO1xuICBnZXQgdmFsdWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fYmFyY29kZVZhbHVlO1xuICB9XG4gIHNldCB2YWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgaWYgKHRoaXMuX2JhcmNvZGVWYWx1ZSAhPT0gdmFsdWUpIHtcbiAgICAgIHRoaXMuX2JhcmNvZGVWYWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sodmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3RvZ2dsZSA9ICdkcm9wJztcbiAgZ2V0IHRvZ2dsZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdG9nZ2xlO1xuICB9XG4gIHNldCB0b2dnbGUodmFsOiBzdHJpbmcpIHtcbiAgICB0aGlzLl90b2dnbGUgPSB2YWw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjayA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjayA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHtcbiAgICB0aGlzLl9pbml0KCk7XG5cbiAgICB0aGlzLl9zdGFydERldGVjdGlvblN1YiA9ICh0aGlzLnN0YXJ0RGV0ZWN0aW9uIGFzIE9ic2VydmFibGU8dm9pZD4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSgzMDApLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2dldERhdGFGcm9tVmlkZW8odGhpcy52aWRlb1NvdXJjZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRCYXJjb2RlRnJvbURhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXRjaEVycm9yKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb2Yoe30gYXMgUmVzdWx0KTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKCFyZXN1bHQudGV4dCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnN0YXJ0RGV0ZWN0aW9uLmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlID0gJ2Ryb3AnO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LnRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG5cbiAgICB0aGlzLl9zdGFydENhbGN1bGF0aW9uU3ViID0gKHRoaXMuc3RhcnRDYWxjdWxhdGlvbiBhcyBPYnNlcnZhYmxlPHN0cmluZz4pXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzd2l0Y2hNYXAoKGRhdGE6IHN0cmluZykgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHRoaXMuX3JlYWRCYXJjb2RlRnJvbURhdGEoZGF0YSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3VsdC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUgPSAnZHJvcCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHJlc3VsdC50ZXh0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSAnJztcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xuICB9XG5cbiAgdGFrZVNuYXBzaG90KCk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnREZXRlY3Rpb24uZW1pdCgpO1xuICB9XG5cbiAgb25TZWxlY3RGaWxlKGV2dDogRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZ0ID09IG51bGwgfHwgZXZ0LnRhcmdldCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHRhcmdldCA9IGV2dC50YXJnZXQgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgICBjb25zdCBmaWxlcyA9IHRhcmdldC5maWxlcyBhcyBGaWxlTGlzdDtcbiAgICB0aGlzLl9vblNlbGVjdChmaWxlcyk7XG4gIH1cblxuICBvblNlbGVjdERyb3AoZmlsZXM6IEZpbGVMaXN0KTogdm9pZCB7XG4gICAgaWYgKGZpbGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fb25TZWxlY3QoZmlsZXMpO1xuICB9XG5cbiAgLyoqIENvbnRyb2xWYWx1ZUFjY2Vzc29yIGltcGxlbWVudHMgKi9cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogc3RyaW5nKSB7XG4gICAgdGhpcy5fYmFyY29kZVZhbHVlID0gdmFsdWU7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCk6IHZvaWQge1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiAoKSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3N0YXJ0Q2FsY3VsYXRpb25TdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9zdGFydERldGVjdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbml0Q2FudmFzKCk7XG4gICAgdGhpcy5faW5pdFZpZGVvKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Q2FudmFzKCk6IHZvaWQge1xuICAgIHRoaXMuX2NhbnZhcyA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgIHRoaXMuX2NhbnZhcy5oZWlnaHQgPSA0ODA7XG4gICAgdGhpcy5fY2FudmFzLndpZHRoID0gNjQwO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFZpZGVvKCk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZGVvID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgndmlkZW8nKTtcbiAgICB0aGlzLl92aWRlby5oZWlnaHQgPSA0ODA7XG4gICAgdGhpcy5fdmlkZW8ud2lkdGggPSA2NDA7XG4gIH1cblxuXG4gIHByaXZhdGUgX29uU2VsZWN0KGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcyAhPSBudWxsICYmIGZpbGVzLmxlbmd0aCA+IDAgJiYgZmlsZXNbMF0pIHtcbiAgICAgIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlc1swXSk7XG4gICAgICByZWFkZXIub25sb2FkID0gKGV2OiBQcm9ncmVzc0V2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IChldi50YXJnZXQgYXMgRmlsZVJlYWRlcikucmVzdWx0IGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5zdGFydENhbGN1bGF0aW9uLmVtaXQoZGF0YSk7XG4gICAgICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB3cml0ZSBhIGZyYW1lIG9mIEhUTUxWaWRlb0VsZW1lbnQgaW50byBIVE1MQ2FudmFzRWxlbWVudCBhbmRcbiAgICogcmV0dXJuIHRoZSByZXN1bHQgb2YgdG9EYXRhVVJMKCdpbWFnZS9wbmcnKVxuICAgKlxuICAgKiBAcGFyYW0gdmlkZW9cbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2dldERhdGFGcm9tVmlkZW8odmlkZW86IEhUTUxWaWRlb0VsZW1lbnQpOiBzdHJpbmcge1xuICAgIHRoaXMuY2FudmFzQ3R4LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgNjQwLCA0ODApO1xuICAgIHJldHVybiB0aGlzLl9jYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIEB6eGluZyBsaWJyYXJ5IG1ldGhvZCB3aXRoIEhUTUxJbWFnZUVsZW1lbnQgYXMgcGFyYW1ldGVyXG4gICAqXG4gICAqIEBwYXJhbSBpbWdcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3JlYWRCYXJjb2RlRnJvbUltYWdlKGltZzogSFRNTEltYWdlRWxlbWVudCk6IE9ic2VydmFibGU8UmVzdWx0PiB7XG4gICAgY29uc3QgZGVjb2RlID0gZnJvbSh0aGlzLmNvZGVSZWFkZXIuZGVjb2RlRnJvbUltYWdlRWxlbWVudChpbWcpKSBhcyBPYnNlcnZhYmxlPFJlc3VsdD47XG4gICAgcmV0dXJuIGRlY29kZS5waXBlKFxuICAgICAgICAgICAgICAgY2F0Y2hFcnJvcihlID0+IG9mKGUpKSxcbiAgICAgICAgICAgICAgICkgYXMgT2JzZXJ2YWJsZTxSZXN1bHQ+O1xuICB9XG5cbiAgLyoqXG4gICAqIGJ1aWxkIGFuIGltYWdlIGJ5IGRhdGEgYW5kIGNhbGwgX3JlYWRCYXJjb2RlRnJvbUltYWdlXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9yZWFkQmFyY29kZUZyb21EYXRhKGRhdGE6IHN0cmluZyk6IE9ic2VydmFibGU8UmVzdWx0PiB7XG4gICAgY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSB0aGlzLl9jcmVhdGVJbWFnZShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5fcmVhZEJhcmNvZGVGcm9tSW1hZ2UoaW1hZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGJ1aWxkIGFuIGltYWdlIGJ5IGRhdGFcbiAgICpcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZUltYWdlKGRhdGE6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGNvbnN0IGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaWYgKGRhdGEgIT09IG51bGwgJiYgdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpbWFnZS5zcmMgPSBkYXRhO1xuICAgIH1cbiAgICByZXR1cm4gaW1hZ2U7XG4gIH1cbn1cbiJdfQ==