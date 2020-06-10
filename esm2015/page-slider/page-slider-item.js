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
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
let AjfPageSliderItem = /** @class */ (() => {
    class AjfPageSliderItem {
        constructor(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
            this._scrollEvt = new EventEmitter();
            this.scroll = this._scrollEvt.asObservable();
            this._scrollX = 0;
            this._scrollY = 0;
            this._resizeEvent = new EventEmitter();
            this._resizeSub = Subscription.EMPTY;
            this._resizeSensor = new ResizeSensor(_el.nativeElement, () => this._onResize());
            this._resizeSub = this._resizeEvent
                .pipe(debounceTime(300))
                .subscribe(() => this._fixScrollOnResize());
        }
        ngOnDestroy() {
            if (this._resizeSensor) {
                this._resizeSensor.detach();
            }
            this._resizeSub.unsubscribe();
            this._resizeEvent.complete();
        }
        setScroll(dir, amount, _duration) {
            if (this._el == null || this.wrapper == null || amount === 0) {
                return false;
            }
            const el = this._el.nativeElement;
            const wrapper = this.wrapper.nativeElement;
            let containerSize, wrapperSize, currentScroll;
            if (dir === 'x') {
                containerSize = el.clientWidth;
                wrapperSize = wrapper.clientWidth;
                currentScroll = this._scrollX;
            }
            else {
                containerSize = el.clientHeight;
                wrapperSize = wrapper.clientHeight;
                currentScroll = this._scrollY;
            }
            const maxScroll = containerSize - wrapperSize;
            if (wrapperSize <= containerSize || (currentScroll === maxScroll && amount < 0) ||
                (currentScroll === 0 && amount > 0)) {
                return false;
            }
            if (amount < 0) {
                if (dir === 'x') {
                    this._scrollX = Math.max(maxScroll, this._scrollX + amount);
                }
                else {
                    this._scrollY = Math.max(maxScroll, this._scrollY + amount);
                }
            }
            else {
                if (dir === 'x') {
                    this._scrollX = Math.min(0, this._scrollX + amount);
                }
                else {
                    this._scrollY = Math.min(0, this._scrollY + amount);
                }
            }
            this._renderer.setStyle(wrapper, 'transform', `translate(${this._scrollX}px, ${this._scrollY}px)`);
            this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
            return true;
        }
        _onResize() {
            this._resizeEvent.emit();
        }
        _fixScrollOnResize() {
            if (this.content == null || this.wrapper == null) {
                return;
            }
            const content = this.content.nativeElement;
            const wrapper = this.wrapper.nativeElement;
            const maxScrollX = Math.min(0, content.clientWidth - wrapper.clientWidth);
            const maxScrollY = Math.min(0, content.clientHeight - wrapper.clientHeight);
            if (maxScrollX !== 0 || maxScrollY !== 0 || (maxScrollX === 0 && this._scrollX !== 0) ||
                (maxScrollY === 0 && this._scrollY !== 0)) {
                this._scrollX = Math.max(maxScrollX, this._scrollX - (content.scrollLeft != null ? content.scrollLeft : 0));
                this._scrollY =
                    Math.max(maxScrollY, this._scrollY - (content.scrollTop != null ? content.scrollTop : 0));
                content.scrollTop = content.scrollLeft = 0;
                this._renderer.setStyle(wrapper, 'transform', `translate(${this._scrollX}px, ${this._scrollY}px)`);
                this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
            }
        }
    }
    AjfPageSliderItem.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-page-slider-item',
                    template: "<div #content class=\"ajf-page-slider-item-content\">\n  <div #wrapper class=\"ajf-page-slider-item-content-wrapper\">\n    <ng-content></ng-content>\n  </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["ajf-page-slider-item{display:block;position:relative}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;bottom:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfPageSliderItem.ctorParameters = () => [
        { type: ElementRef },
        { type: Renderer2 }
    ];
    AjfPageSliderItem.propDecorators = {
        wrapper: [{ type: ViewChild, args: ['wrapper', { static: true },] }],
        content: [{ type: ViewChild, args: ['content', { static: true },] }],
        scroll: [{ type: Output }]
    };
    return AjfPageSliderItem;
})();
export { AjfPageSliderItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFFWixNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUk1QztJQUFBLE1BT2EsaUJBQWlCO1FBYTVCLFlBQ1ksR0FBZSxFQUNmLFNBQW9CO1lBRHBCLFFBQUcsR0FBSCxHQUFHLENBQVk7WUFDZixjQUFTLEdBQVQsU0FBUyxDQUFXO1lBWHhCLGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBMEIsQ0FBQztZQUM3QyxXQUFNLEdBQXVDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFdkYsYUFBUSxHQUFHLENBQUMsQ0FBQztZQUNiLGFBQVEsR0FBRyxDQUFDLENBQUM7WUFFYixpQkFBWSxHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1lBQzVELGVBQVUsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztZQU1wRCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksWUFBWSxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxDQUFDLENBQUM7WUFFakYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFBWTtp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QUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDOUYsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztnQkFDM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQ25CLE9BQU8sRUFBRSxXQUFXLEVBQUUsYUFBYSxJQUFJLENBQUMsUUFBUSxPQUFPLElBQUksQ0FBQyxRQUFRLEtBQUssQ0FBQyxDQUFDO2dCQUMvRSxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQzthQUM1RDtRQUNILENBQUM7OztnQkF4R0YsU0FBUyxTQUFDO29CQUNULFFBQVEsRUFBRSxzQkFBc0I7b0JBQ2hDLHFMQUFvQztvQkFFcEMsZUFBZSxFQUFFLHVCQUF1QixDQUFDLE1BQU07b0JBQy9DLGFBQWEsRUFBRSxpQkFBaUIsQ0FBQyxJQUFJOztpQkFDdEM7Ozs7Z0JBcEJDLFVBQVU7Z0JBSVYsU0FBUzs7OzBCQWtCUixTQUFTLFNBQUMsU0FBUyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzswQkFDbkMsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7eUJBR25DLE1BQU07O0lBNkZULHdCQUFDO0tBQUE7U0FsR1ksaUJBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ29tcG9uZW50LFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0VuY2Fwc3VsYXRpb25cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1Jlc2l6ZVNlbnNvcn0gZnJvbSAnY3NzLWVsZW1lbnQtcXVlcmllcyc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJJdGVtU2Nyb2xsRGlyZWN0aW9ufSBmcm9tICcuL3BhZ2Utc2xpZGVyLWl0ZW0tc2Nyb2xsLWRpcmVjdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1wYWdlLXNsaWRlci1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlLXNsaWRlci1pdGVtLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnZS1zbGlkZXItaXRlbS5jc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG59KVxuZXhwb3J0IGNsYXNzIEFqZlBhZ2VTbGlkZXJJdGVtIGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnd3JhcHBlcicsIHtzdGF0aWM6IHRydWV9KSB3cmFwcGVyOiBFbGVtZW50UmVmO1xuICBAVmlld0NoaWxkKCdjb250ZW50Jywge3N0YXRpYzogdHJ1ZX0pIGNvbnRlbnQ6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfc2Nyb2xsRXZ0ID0gbmV3IEV2ZW50RW1pdHRlcjx7eDogbnVtYmVyLCB5OiBudW1iZXJ9PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgc2Nyb2xsOiBPYnNlcnZhYmxlPHt4OiBudW1iZXIsIHk6IG51bWJlcn0+ID0gdGhpcy5fc2Nyb2xsRXZ0LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX3Njcm9sbFggPSAwO1xuICBwcml2YXRlIF9zY3JvbGxZID0gMDtcbiAgcHJpdmF0ZSBfcmVzaXplU2Vuc29yOiBSZXNpemVTZW5zb3I7XG4gIHByaXZhdGUgX3Jlc2l6ZUV2ZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX3Jlc2l6ZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICApIHtcbiAgICB0aGlzLl9yZXNpemVTZW5zb3IgPSBuZXcgUmVzaXplU2Vuc29yKF9lbC5uYXRpdmVFbGVtZW50LCAoKSA9PiB0aGlzLl9vblJlc2l6ZSgpKTtcblxuICAgIHRoaXMuX3Jlc2l6ZVN1YiA9IHRoaXMuX3Jlc2l6ZUV2ZW50XG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fZml4U2Nyb2xsT25SZXNpemUoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmVzaXplU2Vuc29yKSB7XG4gICAgICB0aGlzLl9yZXNpemVTZW5zb3IuZGV0YWNoKCk7XG4gICAgfVxuICAgIHRoaXMuX3Jlc2l6ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3Jlc2l6ZUV2ZW50LmNvbXBsZXRlKCk7XG4gIH1cblxuICBzZXRTY3JvbGwoZGlyOiBBamZQYWdlU2xpZGVySXRlbVNjcm9sbERpcmVjdGlvbiwgYW1vdW50OiBudW1iZXIsIF9kdXJhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2VsID09IG51bGwgfHwgdGhpcy53cmFwcGVyID09IG51bGwgfHwgYW1vdW50ID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGVsID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCB3cmFwcGVyID0gdGhpcy53cmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IGNvbnRhaW5lclNpemUsIHdyYXBwZXJTaXplLCBjdXJyZW50U2Nyb2xsO1xuICAgIGlmIChkaXIgPT09ICd4Jykge1xuICAgICAgY29udGFpbmVyU2l6ZSA9IGVsLmNsaWVudFdpZHRoO1xuICAgICAgd3JhcHBlclNpemUgPSB3cmFwcGVyLmNsaWVudFdpZHRoO1xuICAgICAgY3VycmVudFNjcm9sbCA9IHRoaXMuX3Njcm9sbFg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lclNpemUgPSBlbC5jbGllbnRIZWlnaHQ7XG4gICAgICB3cmFwcGVyU2l6ZSA9IHdyYXBwZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgY3VycmVudFNjcm9sbCA9IHRoaXMuX3Njcm9sbFk7XG4gICAgfVxuICAgIGNvbnN0IG1heFNjcm9sbCA9IGNvbnRhaW5lclNpemUgLSB3cmFwcGVyU2l6ZTtcbiAgICBpZiAod3JhcHBlclNpemUgPD0gY29udGFpbmVyU2l6ZSB8fCAoY3VycmVudFNjcm9sbCA9PT0gbWF4U2Nyb2xsICYmIGFtb3VudCA8IDApIHx8XG4gICAgICAgIChjdXJyZW50U2Nyb2xsID09PSAwICYmIGFtb3VudCA+IDApKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChhbW91bnQgPCAwKSB7XG4gICAgICBpZiAoZGlyID09PSAneCcpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsWCA9IE1hdGgubWF4KG1heFNjcm9sbCwgdGhpcy5fc2Nyb2xsWCArIGFtb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zY3JvbGxZID0gTWF0aC5tYXgobWF4U2Nyb2xsLCB0aGlzLl9zY3JvbGxZICsgYW1vdW50KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKGRpciA9PT0gJ3gnKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFggPSBNYXRoLm1pbigwLCB0aGlzLl9zY3JvbGxYICsgYW1vdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFkgPSBNYXRoLm1pbigwLCB0aGlzLl9zY3JvbGxZICsgYW1vdW50KTtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHdyYXBwZXIsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7dGhpcy5fc2Nyb2xsWH1weCwgJHt0aGlzLl9zY3JvbGxZfXB4KWApO1xuICAgIHRoaXMuX3Njcm9sbEV2dC5lbWl0KHt4OiB0aGlzLl9zY3JvbGxYLCB5OiB0aGlzLl9zY3JvbGxZfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9vblJlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNpemVFdmVudC5lbWl0KCk7XG4gIH1cblxuICBwcml2YXRlIF9maXhTY3JvbGxPblJlc2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb250ZW50ID09IG51bGwgfHwgdGhpcy53cmFwcGVyID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLndyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBtYXhTY3JvbGxYID0gTWF0aC5taW4oMCwgY29udGVudC5jbGllbnRXaWR0aCAtIHdyYXBwZXIuY2xpZW50V2lkdGgpO1xuICAgIGNvbnN0IG1heFNjcm9sbFkgPSBNYXRoLm1pbigwLCBjb250ZW50LmNsaWVudEhlaWdodCAtIHdyYXBwZXIuY2xpZW50SGVpZ2h0KTtcbiAgICBpZiAobWF4U2Nyb2xsWCAhPT0gMCB8fCBtYXhTY3JvbGxZICE9PSAwIHx8IChtYXhTY3JvbGxYID09PSAwICYmIHRoaXMuX3Njcm9sbFggIT09IDApIHx8XG4gICAgICAgIChtYXhTY3JvbGxZID09PSAwICYmIHRoaXMuX3Njcm9sbFkgIT09IDApKSB7XG4gICAgICB0aGlzLl9zY3JvbGxYID0gTWF0aC5tYXgoXG4gICAgICAgICAgbWF4U2Nyb2xsWCwgdGhpcy5fc2Nyb2xsWCAtIChjb250ZW50LnNjcm9sbExlZnQgIT0gbnVsbCA/IGNvbnRlbnQuc2Nyb2xsTGVmdCA6IDApKTtcbiAgICAgIHRoaXMuX3Njcm9sbFkgPVxuICAgICAgICAgIE1hdGgubWF4KG1heFNjcm9sbFksIHRoaXMuX3Njcm9sbFkgLSAoY29udGVudC5zY3JvbGxUb3AgIT0gbnVsbCA/IGNvbnRlbnQuc2Nyb2xsVG9wIDogMCkpO1xuICAgICAgY29udGVudC5zY3JvbGxUb3AgPSBjb250ZW50LnNjcm9sbExlZnQgPSAwO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgICAgd3JhcHBlciwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHt0aGlzLl9zY3JvbGxYfXB4LCAke3RoaXMuX3Njcm9sbFl9cHgpYCk7XG4gICAgICB0aGlzLl9zY3JvbGxFdnQuZW1pdCh7eDogdGhpcy5fc2Nyb2xsWCwgeTogdGhpcy5fc2Nyb2xsWX0pO1xuICAgIH1cbiAgfVxufVxuIl19