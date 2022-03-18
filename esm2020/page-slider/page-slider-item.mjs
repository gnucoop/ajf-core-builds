/// <reference types="resize-observer-browser" />
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
/// <reference types="resize-observer-browser" />
import { ChangeDetectionStrategy, Component, EventEmitter, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import * as i0 from "@angular/core";
export class AjfPageSliderItem {
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._scrollEvt = new EventEmitter();
        this.scroll = this._scrollEvt;
        this._scrollX = 0;
        this._scrollY = 0;
        this._resizeObserver = null;
        this._resizeEvent = new EventEmitter();
        this._resizeSub = Subscription.EMPTY;
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => this._onResize());
            this._resizeObserver.observe(this._el.nativeElement);
        }
        this._resizeSub = this._resizeEvent
            .pipe(debounceTime(300))
            .subscribe(() => this._fixScrollOnResize());
    }
    ngOnDestroy() {
        if (this._resizeObserver) {
            this._resizeObserver.unobserve(this._el.nativeElement);
        }
        this._resizeEvent.complete();
        this._resizeSub.unsubscribe();
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
        if (wrapperSize <= containerSize ||
            (currentScroll === maxScroll && amount < 0) ||
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
        if (maxScrollX !== 0 ||
            maxScrollY !== 0 ||
            (maxScrollX === 0 && this._scrollX !== 0) ||
            (maxScrollY === 0 && this._scrollY !== 0)) {
            this._scrollX = Math.max(maxScrollX, this._scrollX - (content.scrollLeft != null ? content.scrollLeft : 0));
            this._scrollY = Math.max(maxScrollY, this._scrollY - (content.scrollTop != null ? content.scrollTop : 0));
            content.scrollTop = content.scrollLeft = 0;
            this._renderer.setStyle(wrapper, 'transform', `translate(${this._scrollX}px, ${this._scrollY}px)`);
            this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
        }
    }
}
AjfPageSliderItem.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfPageSliderItem, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Component });
AjfPageSliderItem.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfPageSliderItem, selector: "ajf-page-slider-item", outputs: { scroll: "scroll" }, viewQueries: [{ propertyName: "wrapper", first: true, predicate: ["wrapper"], descendants: true, static: true }, { propertyName: "content", first: true, predicate: ["content"], descendants: true, static: true }], ngImport: i0, template: "<div #content class=\"ajf-page-slider-item-content\">\n  <div #wrapper class=\"ajf-page-slider-item-content-wrapper\">\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: ["ajf-page-slider-item{display:block;position:relative}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;bottom:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}\n"], changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfPageSliderItem, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-page-slider-item', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div #content class=\"ajf-page-slider-item-content\">\n  <div #wrapper class=\"ajf-page-slider-item-content-wrapper\">\n    <ng-content></ng-content>\n  </div>\n</div>\n", styles: ["ajf-page-slider-item{display:block;position:relative}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;bottom:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { wrapper: [{
                type: ViewChild,
                args: ['wrapper', { static: true }]
            }], content: [{
                type: ViewChild,
                args: ['content', { static: true }]
            }], scroll: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcGFnZS1zbGlkZXIvc3JjL3BhZ2Utc2xpZGVyLWl0ZW0udHMiLCIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3BhZ2Utc2xpZGVyL3NyYy9wYWdlLXNsaWRlci1pdGVtLmh0bWwiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBc0JBLGlEQUFpRDtBQXRCakQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsaURBQWlEO0FBRWpELE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUVULFlBQVksRUFFWixNQUFNLEVBRU4sU0FBUyxFQUNULGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7QUFXNUMsTUFBTSxPQUFPLGlCQUFpQjtJQWlCNUIsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBYnpELGVBQVUsR0FBRyxJQUFJLFlBQVksRUFBMEIsQ0FBQztRQUV2RCxXQUFNLEdBQXVDLElBQUksQ0FBQyxVQUd6RCxDQUFDO1FBRUssYUFBUSxHQUFHLENBQUMsQ0FBQztRQUNiLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixvQkFBZSxHQUEwQixJQUFJLENBQUM7UUFDOUMsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUM1RCxlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFHcEQsSUFBSSxPQUFPLGNBQWMsS0FBSyxXQUFXLEVBQUU7WUFDekMsSUFBSSxDQUFDLGVBQWUsR0FBRyxJQUFJLGNBQWMsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxJQUFJLENBQUMsU0FBUyxF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QUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQ3RFLENBQUM7WUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxHQUFHLENBQ3RCLFVBQVUsRUFDVixJQUFJLENBQUMsUUFBUSxHQUFHLENBQUMsT0FBTyxDQUFDLFNBQVMsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNwRSxDQUFDO1lBQ0YsT0FBTyxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUMsVUFBVSxHQUFHLENBQUMsQ0FBQztZQUMzQyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FDckIsT0FBTyxFQUNQLFdBQVcsRUFDWCxhQUFhLElBQUksQ0FBQyxRQUFRLE9BQU8sSUFBSSxDQUFDLFFBQVEsS0FBSyxDQUNwRCxDQUFDO1lBQ0YsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLEVBQUUsSUFBSSxDQUFDLFFBQVEsRUFBQyxDQUFDLENBQUM7U0FDNUQ7SUFDSCxDQUFDOzs4R0FwSFUsaUJBQWlCO2tHQUFqQixpQkFBaUIsZ1RDL0M5QiwyS0FLQTsyRkQwQ2EsaUJBQWlCO2tCQVA3QixTQUFTOytCQUNFLHNCQUFzQixtQkFHZix1QkFBdUIsQ0FBQyxNQUFNLGlCQUNoQyxpQkFBaUIsQ0FBQyxJQUFJO3lIQUdDLE9BQU87c0JBQTVDLFNBQVM7dUJBQUMsU0FBUyxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztnQkFDRSxPQUFPO3NCQUE1QyxTQUFTO3VCQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7Z0JBSTNCLE1BQU07c0JBRGQsTUFBTSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuLy8vIDxyZWZlcmVuY2UgdHlwZXM9XCJyZXNpemUtb2JzZXJ2ZXItYnJvd3NlclwiIC8+XG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlYm91bmNlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJJdGVtU2Nyb2xsRGlyZWN0aW9ufSBmcm9tICcuL3BhZ2Utc2xpZGVyLWl0ZW0tc2Nyb2xsLWRpcmVjdGlvbic7XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1wYWdlLXNsaWRlci1pdGVtJyxcbiAgdGVtcGxhdGVVcmw6ICdwYWdlLXNsaWRlci1pdGVtLmh0bWwnLFxuICBzdHlsZVVybHM6IFsncGFnZS1zbGlkZXItaXRlbS5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZQYWdlU2xpZGVySXRlbSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ3dyYXBwZXInLCB7c3RhdGljOiB0cnVlfSkgd3JhcHBlciE6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7c3RhdGljOiB0cnVlfSkgY29udGVudCE6IEVsZW1lbnRSZWY7XG5cbiAgcHJpdmF0ZSBfc2Nyb2xsRXZ0ID0gbmV3IEV2ZW50RW1pdHRlcjx7eDogbnVtYmVyOyB5OiBudW1iZXJ9PigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgc2Nyb2xsOiBPYnNlcnZhYmxlPHt4OiBudW1iZXI7IHk6IG51bWJlcn0+ID0gdGhpcy5fc2Nyb2xsRXZ0IGFzIE9ic2VydmFibGU8e1xuICAgIHg6IG51bWJlcjtcbiAgICB5OiBudW1iZXI7XG4gIH0+O1xuXG4gIHByaXZhdGUgX3Njcm9sbFggPSAwO1xuICBwcml2YXRlIF9zY3JvbGxZID0gMDtcbiAgcHJpdmF0ZSBfcmVzaXplT2JzZXJ2ZXI6IFJlc2l6ZU9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgX3Jlc2l6ZUV2ZW50OiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX3Jlc2l6ZVN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMuX29uUmVzaXplKCkpO1xuICAgICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIub2JzZXJ2ZSh0aGlzLl9lbC5uYXRpdmVFbGVtZW50KTtcbiAgICB9XG5cbiAgICB0aGlzLl9yZXNpemVTdWIgPSB0aGlzLl9yZXNpemVFdmVudFxuICAgICAgLnBpcGUoZGVib3VuY2VUaW1lKDMwMCkpXG4gICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX2ZpeFNjcm9sbE9uUmVzaXplKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Jlc2l6ZU9ic2VydmVyKSB7XG4gICAgICB0aGlzLl9yZXNpemVPYnNlcnZlci51bm9ic2VydmUodGhpcy5fZWwubmF0aXZlRWxlbWVudCk7XG4gICAgfVxuICAgIHRoaXMuX3Jlc2l6ZUV2ZW50LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fcmVzaXplU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBzZXRTY3JvbGwoZGlyOiBBamZQYWdlU2xpZGVySXRlbVNjcm9sbERpcmVjdGlvbiwgYW1vdW50OiBudW1iZXIsIF9kdXJhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2VsID09IG51bGwgfHwgdGhpcy53cmFwcGVyID09IG51bGwgfHwgYW1vdW50ID09PSAwKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGVsID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCB3cmFwcGVyID0gdGhpcy53cmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IGNvbnRhaW5lclNpemUsIHdyYXBwZXJTaXplLCBjdXJyZW50U2Nyb2xsO1xuICAgIGlmIChkaXIgPT09ICd4Jykge1xuICAgICAgY29udGFpbmVyU2l6ZSA9IGVsLmNsaWVudFdpZHRoO1xuICAgICAgd3JhcHBlclNpemUgPSB3cmFwcGVyLmNsaWVudFdpZHRoO1xuICAgICAgY3VycmVudFNjcm9sbCA9IHRoaXMuX3Njcm9sbFg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lclNpemUgPSBlbC5jbGllbnRIZWlnaHQ7XG4gICAgICB3cmFwcGVyU2l6ZSA9IHdyYXBwZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgY3VycmVudFNjcm9sbCA9IHRoaXMuX3Njcm9sbFk7XG4gICAgfVxuICAgIGNvbnN0IG1heFNjcm9sbCA9IGNvbnRhaW5lclNpemUgLSB3cmFwcGVyU2l6ZTtcbiAgICBpZiAoXG4gICAgICB3cmFwcGVyU2l6ZSA8PSBjb250YWluZXJTaXplIHx8XG4gICAgICAoY3VycmVudFNjcm9sbCA9PT0gbWF4U2Nyb2xsICYmIGFtb3VudCA8IDApIHx8XG4gICAgICAoY3VycmVudFNjcm9sbCA9PT0gMCAmJiBhbW91bnQgPiAwKVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoYW1vdW50IDwgMCkge1xuICAgICAgaWYgKGRpciA9PT0gJ3gnKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFggPSBNYXRoLm1heChtYXhTY3JvbGwsIHRoaXMuX3Njcm9sbFggKyBhbW91bnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsWSA9IE1hdGgubWF4KG1heFNjcm9sbCwgdGhpcy5fc2Nyb2xsWSArIGFtb3VudCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkaXIgPT09ICd4Jykge1xuICAgICAgICB0aGlzLl9zY3JvbGxYID0gTWF0aC5taW4oMCwgdGhpcy5fc2Nyb2xsWCArIGFtb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zY3JvbGxZID0gTWF0aC5taW4oMCwgdGhpcy5fc2Nyb2xsWSArIGFtb3VudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgd3JhcHBlcixcbiAgICAgICd0cmFuc2Zvcm0nLFxuICAgICAgYHRyYW5zbGF0ZSgke3RoaXMuX3Njcm9sbFh9cHgsICR7dGhpcy5fc2Nyb2xsWX1weClgLFxuICAgICk7XG4gICAgdGhpcy5fc2Nyb2xsRXZ0LmVtaXQoe3g6IHRoaXMuX3Njcm9sbFgsIHk6IHRoaXMuX3Njcm9sbFl9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX29uUmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2l6ZUV2ZW50LmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpeFNjcm9sbE9uUmVzaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnRlbnQgPT0gbnVsbCB8fCB0aGlzLndyYXBwZXIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3Qgd3JhcHBlciA9IHRoaXMud3JhcHBlci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IG1heFNjcm9sbFggPSBNYXRoLm1pbigwLCBjb250ZW50LmNsaWVudFdpZHRoIC0gd3JhcHBlci5jbGllbnRXaWR0aCk7XG4gICAgY29uc3QgbWF4U2Nyb2xsWSA9IE1hdGgubWluKDAsIGNvbnRlbnQuY2xpZW50SGVpZ2h0IC0gd3JhcHBlci5jbGllbnRIZWlnaHQpO1xuICAgIGlmIChcbiAgICAgIG1heFNjcm9sbFggIT09IDAgfHxcbiAgICAgIG1heFNjcm9sbFkgIT09IDAgfHxcbiAgICAgIChtYXhTY3JvbGxYID09PSAwICYmIHRoaXMuX3Njcm9sbFggIT09IDApIHx8XG4gICAgICAobWF4U2Nyb2xsWSA9PT0gMCAmJiB0aGlzLl9zY3JvbGxZICE9PSAwKVxuICAgICkge1xuICAgICAgdGhpcy5fc2Nyb2xsWCA9IE1hdGgubWF4KFxuICAgICAgICBtYXhTY3JvbGxYLFxuICAgICAgICB0aGlzLl9zY3JvbGxYIC0gKGNvbnRlbnQuc2Nyb2xsTGVmdCAhPSBudWxsID8gY29udGVudC5zY3JvbGxMZWZ0IDogMCksXG4gICAgICApO1xuICAgICAgdGhpcy5fc2Nyb2xsWSA9IE1hdGgubWF4KFxuICAgICAgICBtYXhTY3JvbGxZLFxuICAgICAgICB0aGlzLl9zY3JvbGxZIC0gKGNvbnRlbnQuc2Nyb2xsVG9wICE9IG51bGwgPyBjb250ZW50LnNjcm9sbFRvcCA6IDApLFxuICAgICAgKTtcbiAgICAgIGNvbnRlbnQuc2Nyb2xsVG9wID0gY29udGVudC5zY3JvbGxMZWZ0ID0gMDtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICB3cmFwcGVyLFxuICAgICAgICAndHJhbnNmb3JtJyxcbiAgICAgICAgYHRyYW5zbGF0ZSgke3RoaXMuX3Njcm9sbFh9cHgsICR7dGhpcy5fc2Nyb2xsWX1weClgLFxuICAgICAgKTtcbiAgICAgIHRoaXMuX3Njcm9sbEV2dC5lbWl0KHt4OiB0aGlzLl9zY3JvbGxYLCB5OiB0aGlzLl9zY3JvbGxZfSk7XG4gICAgfVxuICB9XG59XG4iLCI8ZGl2ICNjb250ZW50IGNsYXNzPVwiYWpmLXBhZ2Utc2xpZGVyLWl0ZW0tY29udGVudFwiPlxuICA8ZGl2ICN3cmFwcGVyIGNsYXNzPVwiYWpmLXBhZ2Utc2xpZGVyLWl0ZW0tY29udGVudC13cmFwcGVyXCI+XG4gICAgPG5nLWNvbnRlbnQ+PC9uZy1jb250ZW50PlxuICA8L2Rpdj5cbjwvZGl2PlxuIl19