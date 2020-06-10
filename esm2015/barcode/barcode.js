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
let AjfBarcode = /** @class */ (() => {
    class AjfBarcode {
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
             * @memberof AjfBarcode
             */
            this._barcodeValue = '';
            this._toggle = 'drop';
            this._onChangeCallback = (_) => { };
            this._onTouchedCallback = () => { };
            this._init();
            this._startDetectionSub = this.startDetection.asObservable()
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
            this._startCalculationSub = this.startCalculation.asObservable()
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
            return from(this.codeReader.decodeFromImage(img)).pipe(catchError(e => of(e)));
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
    AjfBarcode.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfBarcode.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ];
    return AjfBarcode;
})();
export { AjfBarcode };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFyY29kZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2JhcmNvZGUvYmFyY29kZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBYSxTQUFTLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFL0YsT0FBTyxFQUFDLG9CQUFvQixFQUFTLE1BQU0sZ0JBQWdCLENBQUM7QUFDNUQsT0FBTyxFQUFDLElBQUksRUFBYyxFQUFFLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3hELE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRW5FO0lBQUEsTUFDc0IsVUFBVTtRQXNEOUIsWUFBb0IsSUFBdUIsRUFBVSxTQUFvQjtZQUFyRCxTQUFJLEdBQUosSUFBSSxDQUFtQjtZQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7WUFyRGhFLGVBQVUsR0FBRyxJQUFJLG9CQUFvQixFQUFFLENBQUM7WUFFeEMsbUJBQWMsR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1lBQzFDLHFCQUFnQixHQUFHLElBQUksWUFBWSxFQUFVLENBQUM7WUFFOUMsdUJBQWtCLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFDdEQseUJBQW9CLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFpQmpFOzs7OztlQUtHO1lBQ0ssa0JBQWEsR0FBRyxFQUFFLENBQUM7WUFZbkIsWUFBTyxHQUFHLE1BQU0sQ0FBQztZQVNqQixzQkFBaUIsR0FBRyxDQUFDLENBQU0sRUFBRSxFQUFFLEdBQUUsQ0FBQyxDQUFDO1lBQ25DLHVCQUFrQixHQUFHLEdBQUcsRUFBRSxHQUFFLENBQUMsQ0FBQztZQUdwQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFFYixJ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M0YsQ0FBQztRQUVEOzs7OztXQUtHO1FBQ0ssb0JBQW9CLENBQUMsSUFBWTtZQUN2QyxNQUFNLEtBQUssR0FBcUIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN4RCxPQUFPLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUMzQyxDQUFDO1FBRUQ7Ozs7O1dBS0c7UUFDSyxZQUFZLENBQUMsSUFBWTtZQUMvQixNQUFNLEtBQUssR0FBcUIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDcEUsSUFBSSxJQUFJLEtBQUssSUFBSSxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtnQkFDN0MsS0FBSyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUM7YUFDbEI7WUFDRCxPQUFPLEtBQUssQ0FBQztRQUNmLENBQUM7OztnQkFoTkYsU0FBUzs7OztnQkFORixpQkFBaUI7Z0JBQXNDLFNBQVM7O0lBdU54RSxpQkFBQztLQUFBO1NBaE5xQixVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgT25EZXN0cm95LCBSZW5kZXJlcjJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtCcm93c2VyQmFyY29kZVJlYWRlciwgUmVzdWx0fSBmcm9tICdAenhpbmcvbGlicmFyeSc7XG5pbXBvcnQge2Zyb20sIE9ic2VydmFibGUsIG9mLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBkZWJvdW5jZVRpbWUsIHN3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZCYXJjb2RlIGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uRGVzdHJveSB7XG4gIHJlYWRvbmx5IGNvZGVSZWFkZXIgPSBuZXcgQnJvd3NlckJhcmNvZGVSZWFkZXIoKTtcblxuICByZWFkb25seSBzdGFydERldGVjdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcmVhZG9ubHkgc3RhcnRDYWxjdWxhdGlvbiA9IG5ldyBFdmVudEVtaXR0ZXI8c3RyaW5nPigpO1xuXG4gIHJlYWRvbmx5IF9zdGFydERldGVjdGlvblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICByZWFkb25seSBfc3RhcnRDYWxjdWxhdGlvblN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2NhbnZhczogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIGdldCBjYW52YXNDdHgoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbnZhcy5nZXRDb250ZXh0KCcyZCcpITtcbiAgfVxuXG4gIC8qKlxuICAgKiBBIGh0bWwgdmlkZW8gZWxlbWVudCBjcmVhdGVkIGF0IHJ1bnRpbWVcbiAgICpcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX3ZpZGVvOiBIVE1MVmlkZW9FbGVtZW50O1xuICBnZXQgdmlkZW9Tb3VyY2UoKTogSFRNTFZpZGVvRWxlbWVudCB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZGVvO1xuICB9XG5cbiAgLyoqXG4gICAqIGltcGxlbWVudCB0aGUgY29udHJvbCBmb3JtIHZhbHVlLlxuICAgKiByYXBwcmVzZW50IHRoZSBiYXJjb2RlIHZhbHVlLlxuICAgKlxuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfYmFyY29kZVZhbHVlID0gJyc7XG4gIGdldCB2YWx1ZSgpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9iYXJjb2RlVmFsdWU7XG4gIH1cbiAgc2V0IHZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICBpZiAodGhpcy5fYmFyY29kZVZhbHVlICE9PSB2YWx1ZSkge1xuICAgICAgdGhpcy5fYmFyY29kZVZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayh2YWx1ZSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdG9nZ2xlID0gJ2Ryb3AnO1xuICBnZXQgdG9nZ2xlKCkge1xuICAgIHJldHVybiB0aGlzLl90b2dnbGU7XG4gIH1cbiAgc2V0IHRvZ2dsZSh2YWw6IHN0cmluZykge1xuICAgIHRoaXMuX3RvZ2dsZSA9IHZhbDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX2luaXQoKTtcblxuICAgIHRoaXMuX3N0YXJ0RGV0ZWN0aW9uU3ViID0gdGhpcy5zdGFydERldGVjdGlvbi5hc09ic2VydmFibGUoKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSwgc3dpdGNoTWFwKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBkYXRhOiBzdHJpbmcgPVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9nZXREYXRhRnJvbVZpZGVvKHRoaXMudmlkZW9Tb3VyY2UpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFkQmFyY29kZUZyb21EYXRhKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9mKHt9IGFzIFJlc3VsdCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHJlc3VsdDogYW55KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoIXJlc3VsdC50ZXh0KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3RhcnREZXRlY3Rpb24uZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGUgPSAnZHJvcCc7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMudmFsdWUgPSByZXN1bHQudGV4dDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcblxuICAgIHRoaXMuX3N0YXJ0Q2FsY3VsYXRpb25TdWIgPSB0aGlzLnN0YXJ0Q2FsY3VsYXRpb24uYXNPYnNlcnZhYmxlKClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKHN3aXRjaE1hcCgoZGF0YTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl9yZWFkQmFyY29kZUZyb21EYXRhKGRhdGEpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKChyZXN1bHQ6IGFueSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocmVzdWx0LnRleHQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZSA9ICdkcm9wJztcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnZhbHVlID0gcmVzdWx0LnRleHQ7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgcmVzZXQoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrKCk7XG4gIH1cblxuICB0YWtlU25hcHNob3QoKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydERldGVjdGlvbi5lbWl0KCk7XG4gIH1cblxuICBvblNlbGVjdEZpbGUoZXZ0OiBFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQgPT0gbnVsbCB8fCBldnQudGFyZ2V0ID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdGFyZ2V0ID0gZXZ0LnRhcmdldCBhcyBIVE1MSW5wdXRFbGVtZW50O1xuICAgIGNvbnN0IGZpbGVzID0gdGFyZ2V0LmZpbGVzIGFzIEZpbGVMaXN0O1xuICAgIHRoaXMuX29uU2VsZWN0KGZpbGVzKTtcbiAgfVxuXG4gIG9uU2VsZWN0RHJvcChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9vblNlbGVjdChmaWxlcyk7XG4gIH1cblxuICAvKiogQ29udHJvbFZhbHVlQWNjZXNzb3IgaW1wbGVtZW50cyAqL1xuICB3cml0ZVZhbHVlKHZhbHVlOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9iYXJjb2RlVmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKTogdm9pZCB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46ICgpID0+IHZvaWQpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fc3RhcnRDYWxjdWxhdGlvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3N0YXJ0RGV0ZWN0aW9uU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2luaXRDYW52YXMoKTtcbiAgICB0aGlzLl9pbml0VmlkZW8oKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRDYW52YXMoKTogdm9pZCB7XG4gICAgdGhpcy5fY2FudmFzID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gICAgdGhpcy5fY2FudmFzLmhlaWdodCA9IDQ4MDtcbiAgICB0aGlzLl9jYW52YXMud2lkdGggPSA2NDA7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VmlkZW8oKTogdm9pZCB7XG4gICAgdGhpcy5fdmlkZW8gPSB0aGlzLl9yZW5kZXJlci5jcmVhdGVFbGVtZW50KCd2aWRlbycpO1xuICAgIHRoaXMuX3ZpZGVvLmhlaWdodCA9IDQ4MDtcbiAgICB0aGlzLl92aWRlby53aWR0aCA9IDY0MDtcbiAgfVxuXG5cbiAgcHJpdmF0ZSBfb25TZWxlY3QoZmlsZXM6IEZpbGVMaXN0KTogdm9pZCB7XG4gICAgaWYgKGZpbGVzICE9IG51bGwgJiYgZmlsZXMubGVuZ3RoID4gMCAmJiBmaWxlc1swXSkge1xuICAgICAgbGV0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG5cbiAgICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGVzWzBdKTtcbiAgICAgIHJlYWRlci5vbmxvYWQgPSAoZXY6IFByb2dyZXNzRXZlbnQpID0+IHtcbiAgICAgICAgY29uc3QgZGF0YTogc3RyaW5nID0gKGV2LnRhcmdldCBhcyBGaWxlUmVhZGVyKS5yZXN1bHQgYXMgc3RyaW5nO1xuICAgICAgICB0aGlzLnN0YXJ0Q2FsY3VsYXRpb24uZW1pdChkYXRhKTtcbiAgICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHdyaXRlIGEgZnJhbWUgb2YgSFRNTFZpZGVvRWxlbWVudCBpbnRvIEhUTUxDYW52YXNFbGVtZW50IGFuZFxuICAgKiByZXR1cm4gdGhlIHJlc3VsdCBvZiB0b0RhdGFVUkwoJ2ltYWdlL3BuZycpXG4gICAqXG4gICAqIEBwYXJhbSB2aWRlb1xuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfZ2V0RGF0YUZyb21WaWRlbyh2aWRlbzogSFRNTFZpZGVvRWxlbWVudCk6IHN0cmluZyB7XG4gICAgdGhpcy5jYW52YXNDdHguZHJhd0ltYWdlKHZpZGVvLCAwLCAwLCA2NDAsIDQ4MCk7XG4gICAgcmV0dXJuIHRoaXMuX2NhbnZhcy50b0RhdGFVUkwoJ2ltYWdlL3BuZycpO1xuICB9XG5cbiAgLyoqXG4gICAqIGNhbGwgQHp4aW5nIGxpYnJhcnkgbWV0aG9kIHdpdGggSFRNTEltYWdlRWxlbWVudCBhcyBwYXJhbWV0ZXJcbiAgICpcbiAgICogQHBhcmFtIGltZ1xuICAgKiBAbWVtYmVyb2YgQWpmQmFyY29kZVxuICAgKi9cbiAgcHJpdmF0ZSBfcmVhZEJhcmNvZGVGcm9tSW1hZ2UoaW1nOiBIVE1MSW1hZ2VFbGVtZW50KTogT2JzZXJ2YWJsZTxSZXN1bHQ+IHtcbiAgICByZXR1cm4gZnJvbSh0aGlzLmNvZGVSZWFkZXIuZGVjb2RlRnJvbUltYWdlKGltZykpLnBpcGUoY2F0Y2hFcnJvcihlID0+IG9mKGUgYXMgUmVzdWx0KSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIGJ1aWxkIGFuIGltYWdlIGJ5IGRhdGEgYW5kIGNhbGwgX3JlYWRCYXJjb2RlRnJvbUltYWdlXG4gICAqXG4gICAqIEBwYXJhbSBkYXRhXG4gICAqIEBtZW1iZXJvZiBBamZCYXJjb2RlXG4gICAqL1xuICBwcml2YXRlIF9yZWFkQmFyY29kZUZyb21EYXRhKGRhdGE6IHN0cmluZyk6IE9ic2VydmFibGU8UmVzdWx0PiB7XG4gICAgY29uc3QgaW1hZ2U6IEhUTUxJbWFnZUVsZW1lbnQgPSB0aGlzLl9jcmVhdGVJbWFnZShkYXRhKTtcbiAgICByZXR1cm4gdGhpcy5fcmVhZEJhcmNvZGVGcm9tSW1hZ2UoaW1hZ2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIGJ1aWxkIGFuIGltYWdlIGJ5IGRhdGFcbiAgICpcbiAgICogQHBhcmFtIGRhdGFcbiAgICogQG1lbWJlcm9mIEFqZkJhcmNvZGVcbiAgICovXG4gIHByaXZhdGUgX2NyZWF0ZUltYWdlKGRhdGE6IHN0cmluZyk6IEhUTUxJbWFnZUVsZW1lbnQge1xuICAgIGNvbnN0IGltYWdlOiBIVE1MSW1hZ2VFbGVtZW50ID0gdGhpcy5fcmVuZGVyZXIuY3JlYXRlRWxlbWVudCgnaW1nJyk7XG4gICAgaWYgKGRhdGEgIT09IG51bGwgJiYgdHlwZW9mIGRhdGEgPT09ICdzdHJpbmcnKSB7XG4gICAgICBpbWFnZS5zcmMgPSBkYXRhO1xuICAgIH1cbiAgICByZXR1cm4gaW1hZ2U7XG4gIH1cbn1cbiJdfQ==