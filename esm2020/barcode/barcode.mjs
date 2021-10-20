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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2JhcmNvZGUvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBYSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0YsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFeEQsT0FBTyxFQUFDLElBQUksRUFBYyxFQUFFLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDOztBQUduRSxNQUFNLE9BQWdCLFVBQVU7SUFzRDlCLFlBQW9CLElBQXVCLEVBQVUsU0FBb0I7UUFBckQsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBckRoRSxlQUFVLEdBQUcsSUFBSSx3QkFBd0IsRUFBRSxDQUFDO1FBRTVDLG1CQUFjLEdBQUcsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUMxQyxxQkFBZ0IsR0FBRyxJQUFJLFlBQVksRUFBVSxDQUFDO1FBRTlDLHVCQUFrQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBQ3RELHlCQUFvQixHQUFpQixZQUFZLENBQUMsS0FBSyxDQUFDO1FBaUJqRTs7Ozs7V0FLRztRQUNLLGtCQUFhLEdBQUcsRUFBRSxDQUFDO1FBWW5CLFlBQU8sR0FBRyxNQUFNLENBQUM7UUFTakIsc0JBQWlCLEdBQUcsQ0FBQyxDQUFNLEVBQUUsRUFBRSxHQUFFLENBQUMsQ0FBQztRQUNuQyx1QkFBa0IsR0FBRyxHQUFHLEVBQUUsR0FBRSxDQUFDLENBQUM7UUFHcEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBRWIs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T0FLRztJQUNLLG9CQUFvQixDQUFDLElBQVk7UUFDdkMsTUFBTSxLQUFLLEdBQXFCLElBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDeEQsT0FBTyxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDM0MsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0ssWUFBWSxDQUFDLElBQVk7UUFDL0IsTUFBTSxLQUFLLEdBQXFCLElBQUksQ0FBQyxTQUFTLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3BFLElBQUksSUFBSSxLQUFLLElBQUksSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7WUFDN0MsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7U0FDbEI7UUFDRCxPQUFPLEtBQUssQ0FBQztJQUNmLENBQUM7OytHQWxObUIsVUFBVTttR0FBVixVQUFVO21HQUFWLFVBQVU7a0JBRC9CLFNBQVMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBPbkRlc3Ryb3ksIFJlbmRlcmVyMn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0Jyb3dzZXJNdWx0aUZvcm1hdFJlYWRlcn0gZnJvbSAnQHp4aW5nL2Jyb3dzZXInO1xuaW1wb3J0IHtSZXN1bHR9IGZyb20gJ0B6eGluZy9saWJyYXJ5JztcbmltcG9ydCB7ZnJvbSwgT2JzZXJ2YWJsZSwgb2YsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIGRlYm91bmNlVGltZSwgc3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkJhcmNvZGUgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25EZXN0cm95IHtcbiAgcmVhZG9ubHkgY29kZVJlYWRlciA9IG5ldyBCcm93c2VyTXVsdGlGb3JtYXRSZWFkZXIoKTtcblxuICByZWFkb25seSBzdGFydERldGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcmVhZG9ubHkgc3RhcnRDYWxjdWxhdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHJlYWRvbmx5IF9zdGFydERldGVjdGlvblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICByZWFkb25seSBfc3RhcnRDYWxjdWxhdGlvblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGdldCBjYW52YXNDdHgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGh0bWwgdmlkZW8gZWxlbWVudCBjcmVhdGVkIGF0IHJ1bnRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3ZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICBnZXQgdmlkZW9Tb3VyY2UoKTogSFRNTFZpZGVvRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZGVvO1xuICB9XG5cbiAgLyoqXG4gICAqIGltcGxlbWVudCB0aGUgY29udHJvbCBmb3JtIHZhbHVlLlxuICAgKiByYXBwcmVzZW50IHRoZSBiYXJjb2RlIHZhbHVlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfYmFyY29kZVZhbHVlID0gJyc7XG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9iYXJjb2RlVmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fYmFyY29kZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYmFyY29kZVZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdG9nZ2xlID0gJ2Ryb3AnO1xuICBnZXQgdG9nZ2xlKCkge1xuICAgIHJldHVybiB0aGlzLl90b2dnbGU7XG4gIH1cbiAgc2V0IHRvZ2dsZSh2YWw6IHN0cmluZykge1xuICAgIHRoaXMuX3RvZ2dsZSA9IHZhbDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX2luaXQoKTtcblxuICAgIHRoaXMuX3N0YXJ0RGV0ZWN0aW9uU3ViID0gKHRoaXMuc3RhcnREZXRlY3Rpb24gYXMgT2JzZXJ2YWJsZTx2b2lkPilcbiAgICAgIC5waXBlKFxuICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgICAgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICBjb25zdCBkYXRhOiBzdHJpbmcgPSB0aGlzLl9nZXREYXRhRnJvbVZpZGVvKHRoaXMudmlkZW9Tb3VyY2UpO1xuICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFkQmFyY29kZUZyb21EYXRhKGRhdGEpO1xuICAgICAgICB9KSxcbiAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIG9mKHt9IGFzIFJlc3VsdCk7XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSgocmVzdWx0OiBhbnkpID0+IHtcbiAgICAgICAgaWYgKCFyZXN1bHQudGV4dCkge1xuICAgICAgICAgIHRoaXMuc3RhcnREZXRlY3Rpb24uZW1pdCgpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMudG9nZ2xlID0gJ2Ryb3AnO1xuICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHQudGV4dDtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICB0aGlzLl9zdGFydENhbGN1bGF0aW9uU3ViID0gKHRoaXMuc3RhcnRDYWxjdWxhdGlvbiBhcyBPYnNlcnZhYmxlPHN0cmluZz4pXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKChkYXRhOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5fcmVhZEJhcmNvZGVGcm9tRGF0YShkYXRhKTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICBpZiAocmVzdWx0LnRleHQpIHtcbiAgICAgICAgICB0aGlzLnRvZ2dsZSA9ICdkcm9wJztcbiAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LnRleHQ7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICB0YWtlU25hcHNob3QoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydERldGVjdGlvbi5lbWl0KCk7XG4gIH1cblxuICBvblNlbGVjdEZpbGUoZXZ0OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQgPT0gbnVsbCB8fCBldnQudGFyZ2V0ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IGZpbGVzID0gdGFyZ2V0LmZpbGVzIGFzIEZpbGVMaXN0O1xuICAgIHRoaXMuX29uU2VsZWN0KGZpbGVzKTtcbiAgfVxuXG4gIG9uU2VsZWN0RHJvcChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vblNlbGVjdChmaWxlcyk7XG4gIH1cblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iYXJjb2RlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhcnRDYWxjdWxhdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N0YXJ0RGV0ZWN0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXRDYW52YXMoKTtcbiAgICB0aGlzLl9pbml0VmlkZW8oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDYW52YXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2FudmFzID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IDQ4MDtcbiAgICB0aGlzLl9jYW52YXMud2lkdGggPSA2NDA7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VmlkZW8oKTogdm9pZCB7XG4gICAgdGhpcy5fdmlkZW8gPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIHRoaXMuX3ZpZGVvLmhlaWdodCA9IDQ4MDtcbiAgICB0aGlzLl92aWRlby53aWR0aCA9IDY0MDtcbiAgfVxuXG4gIHByaXZhdGUgX29uU2VsZWN0KGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcyAhPSBudWxsICYmIGZpbGVzLmxlbmd0aCA+IDAgJiYgZmlsZXNbMF0pIHtcbiAgICAgIGxldCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuXG4gICAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlc1swXSk7XG4gICAgICByZWFkZXIub25sb2FkID0gKGV2OiBQcm9ncmVzc0V2ZW50KSA9PiB7XG4gICAgICAgIGNvbnN0IGRhdGE6IHN0cmluZyA9IChldi50YXJnZXQgYXMgRmlsZVJlYWRlcikucmVzdWx0IGFzIHN0cmluZztcbiAgICAgICAgdGhpcy5zdGFydENhbGN1bGF0aW9uLmVtaXQoZGF0YSk7XG4gICAgICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB3cml0ZSBhIGZyYW1lIG9mIEhUTUxWaWRlb0VsZW1lbnQgaW50byBIVE1MQ2FudmFzRWxlbWVudCBhbmRcbiAgICogcmV0dXJuIHRoZSByZXN1bHQgb2YgdG9EYXRhVVJMKCdpbWFnZS9wbmcnKVxuICAgKlxuICAgKiBAcGFyYW0gdmlkZW9cbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2dldERhdGFGcm9tVmlkZW8odmlkZW86IEhUTUxWaWRlb0VsZW1lbnQpOiBzdHJpbmcge1xuICAgIHRoaXMuY2FudmFzQ3R4LmRyYXdJbWFnZSh2aWRlbywgMCwgMCwgNjQwLCA0ODApO1xuICAgIHJldHVybiB0aGlzLl9jYW52YXMudG9EYXRhVVJMKCdpbWFnZS9wbmcnKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBjYWxsIEB6eGluZyBsaWJyYXJ5IG1ldGhvZCB3aXRoIEhUTUxJbWFnZUVsZW1lbnQgYXMgcGFyYW1ldGVyXG4gICAqXG4gICAqIEBwYXJhbSBpbWdcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3JlYWRCYXJjb2RlRnJvbUltYWdlKGltZzogSFRNTEltYWdlRWxlbWVudCk6IE9ic2VydmFibGU8UmVzdWx0PiB7XG4gICAgY29uc3QgZGVjb2RlID0gZnJvbSh0aGlzLmNvZGVSZWFkZXIuZGVjb2RlRnJvbUltYWdlRWxlbWVudChpbWcpKSBhcyBPYnNlcnZhYmxlPFJlc3VsdD47XG4gICAgcmV0dXJuIGRlY29kZS5waXBlKGNhdGNoRXJyb3IoZSA9PiBvZihlKSkpIGFzIE9ic2VydmFibGU8UmVzdWx0PjtcbiAgfVxuXG4gIC8qKlxuICAgKiBidWlsZCBhbiBpbWFnZSBieSBkYXRhIGFuZCBjYWxsIF9yZWFkQmFyY29kZUZyb21JbWFnZVxuICAgKlxuICAgKiBAcGFyYW0gZGF0YVxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVhZEJhcmNvZGVGcm9tRGF0YShkYXRhOiBzdHJpbmcpOiBPYnNlcnZhYmxlPFJlc3VsdD4ge1xuICAgIGNvbnN0IGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gdGhpcy5fY3JlYXRlSW1hZ2UoZGF0YSk7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRCYXJjb2RlRnJvbUltYWdlKGltYWdlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBidWlsZCBhbiBpbWFnZSBieSBkYXRhXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9jcmVhdGVJbWFnZShkYXRhOiBzdHJpbmcpOiBIVE1MSW1hZ2VFbGVtZW50IHtcbiAgICBjb25zdCBpbWFnZTogSFRNTEltYWdlRWxlbWVudCA9IHRoaXMuX3JlbmRlcmVyLmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgIGlmIChkYXRhICE9PSBudWxsICYmIHR5cGVvZiBkYXRhID09PSAnc3RyaW5nJykge1xuICAgICAgaW1hZ2Uuc3JjID0gZGF0YTtcbiAgICB9XG4gICAgcmV0dXJuIGltYWdlO1xuICB9XG59XG4iXX0=