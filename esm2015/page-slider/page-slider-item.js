/**
 * @fileoverview added by tsickle
 * Generated from: src/core/page-slider/page-slider-item.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class AjfPageSliderItem {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._scrollEvt = new EventEmitter();
        this.scroll = this._scrollEvt.asObservable();
        this._scrollX = 0;
        this._scrollY = 0;
        this._resizeEvent = new EventEmitter();
        this._resizeSub = Subscription.EMPTY;
        this._resizeSensor = new ResizeSensor(_el.nativeElement, (/**
         * @return {?}
         */
        () => this._onResize()));
        this._resizeSub = this._resizeEvent.pipe(debounceTime(300)).subscribe((/**
         * @return {?}
         */
        () => this._fixScrollOnResize()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._resizeSensor) {
            this._resizeSensor.detach();
        }
        this._resizeSub.unsubscribe();
        this._resizeEvent.complete();
    }
    /**
     * @param {?} dir
     * @param {?} amount
     * @param {?} _duration
     * @return {?}
     */
    setScroll(dir, amount, _duration) {
        if (this._el == null || this.wrapper == null || amount === 0) {
            return false;
        }
        /** @type {?} */
        const el = this._el.nativeElement;
        /** @type {?} */
        const wrapper = this.wrapper.nativeElement;
        /** @type {?} */
        let containerSize;
        /** @type {?} */
        let wrapperSize;
        /** @type {?} */
        let currentScroll;
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
        /** @type {?} */
        const maxScroll = containerSize - wrapperSize;
        if (wrapperSize <= containerSize
            || (currentScroll === maxScroll && amount < 0)
            || (currentScroll === 0 && amount > 0)) {
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
    /**
     * @private
     * @return {?}
     */
    _onResize() {
        this._resizeEvent.emit();
    }
    /**
     * @private
     * @return {?}
     */
    _fixScrollOnResize() {
        if (this.content == null || this.wrapper == null) {
            return;
        }
        /** @type {?} */
        const content = this.content.nativeElement;
        /** @type {?} */
        const wrapper = this.wrapper.nativeElement;
        /** @type {?} */
        const maxScrollX = Math.min(0, content.clientWidth - wrapper.clientWidth);
        /** @type {?} */
        const maxScrollY = Math.min(0, content.clientHeight - wrapper.clientHeight);
        if (maxScrollX !== 0 || maxScrollY !== 0
            || (maxScrollX === 0 && this._scrollX !== 0)
            || (maxScrollY === 0 && this._scrollY !== 0)) {
            this._scrollX = Math.max(maxScrollX, this._scrollX - (content.scrollLeft != null ? content.scrollLeft : 0));
            this._scrollY = Math.max(maxScrollY, this._scrollY - (content.scrollTop != null ? content.scrollTop : 0));
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
if (false) {
    /** @type {?} */
    AjfPageSliderItem.prototype.wrapper;
    /** @type {?} */
    AjfPageSliderItem.prototype.content;
    /**
     * @type {?}
     * @private
     */
    AjfPageSliderItem.prototype._scrollEvt;
    /** @type {?} */
    AjfPageSliderItem.prototype.scroll;
    /**
     * @type {?}
     * @private
     */
    AjfPageSliderItem.prototype._scrollX;
    /**
     * @type {?}
     * @private
     */
    AjfPageSliderItem.prototype._scrollY;
    /**
     * @type {?}
     * @private
     */
    AjfPageSliderItem.prototype._resizeSensor;
    /**
     * @type {?}
     * @private
     */
    AjfPageSliderItem.prototype._resizeEvent;
    /**
     * @type {?}
     * @private
     */
    AjfPageSliderItem.prototype._resizeSub;
    /**
     * @type {?}
     * @private
     */
    AjfPageSliderItem.prototype._el;
    /**
     * @type {?}
     * @private
     */
    AjfPageSliderItem.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUNMLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUNqRCxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFDM0QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQVc1QyxNQUFNLE9BQU8saUJBQWlCOzs7OztJQWM1QixZQUNVLEdBQWUsRUFDZixTQUFvQjtRQURwQixRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVp0QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFFdkQsV0FBTSxHQUF1QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTdFLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWIsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUM1RCxlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFNcEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYTs7O1FBQUUsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxFQUFDLENBQUM7UUFFakYsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsWUFB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Q0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRixPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixPQUFPLEVBQUUsV0FBVyxFQUFFLGFBQWEsSUFBSSxDQUFDLFFBQVEsT0FBTyxJQUFJLENBQUMsUUFBUSxLQUFLLENBQzFFLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7OztZQXZHRixTQUFTLFNBQUM7Z0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtnQkFDaEMscUxBQW9DO2dCQUVwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtnQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2FBQ3RDOzs7O1lBZnFDLFVBQVU7WUFDM0IsU0FBUzs7O3NCQWdCM0IsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7c0JBQ25DLFNBQVMsU0FBQyxTQUFTLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO3FCQUduQyxNQUFNOzs7O0lBSlAsb0NBQTBEOztJQUMxRCxvQ0FBMEQ7Ozs7O0lBRTFELHVDQUFnRTs7SUFDaEUsbUNBQ3FGOzs7OztJQUVyRixxQ0FBcUI7Ozs7O0lBQ3JCLHFDQUFxQjs7Ozs7SUFDckIsMENBQW9DOzs7OztJQUNwQyx5Q0FBb0U7Ozs7O0lBQ3BFLHVDQUFzRDs7Ozs7SUFHcEQsZ0NBQXVCOzs7OztJQUN2QixzQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LCBDb21wb25lbnQsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LCBPdXRwdXQsIFJlbmRlcmVyMiwgVmlld0NoaWxkLCBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVzaXplU2Vuc29yfSBmcm9tICdjc3MtZWxlbWVudC1xdWVyaWVzJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlckl0ZW1TY3JvbGxEaXJlY3Rpb259IGZyb20gJy4vcGFnZS1zbGlkZXItaXRlbS1zY3JvbGwtZGlyZWN0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXBhZ2Utc2xpZGVyLWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2Utc2xpZGVyLWl0ZW0uaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlLXNsaWRlci1pdGVtLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUGFnZVNsaWRlckl0ZW0gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCd3cmFwcGVyJywge3N0YXRpYzogdHJ1ZX0pIHdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7c3RhdGljOiB0cnVlfSkgY29udGVudDogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIF9zY3JvbGxFdnQgPSBuZXcgRXZlbnRFbWl0dGVyPHt4OiBudW1iZXIsIHk6IG51bWJlcn0+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBzY3JvbGw6IE9ic2VydmFibGU8e3g6IG51bWJlciwgeTogbnVtYmVyfT4gPSB0aGlzLl9zY3JvbGxFdnQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2Nyb2xsWCA9IDA7XG4gIHByaXZhdGUgX3Njcm9sbFkgPSAwO1xuICBwcml2YXRlIF9yZXNpemVTZW5zb3I6IFJlc2l6ZVNlbnNvcjtcbiAgcHJpdmF0ZSBfcmVzaXplRXZlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfcmVzaXplU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMixcbiAgKSB7XG4gICAgdGhpcy5fcmVzaXplU2Vuc29yID0gbmV3IFJlc2l6ZVNlbnNvcihfZWwubmF0aXZlRWxlbWVudCwgKCkgPT4gdGhpcy5fb25SZXNpemUoKSk7XG5cbiAgICB0aGlzLl9yZXNpemVTdWIgPSB0aGlzLl9yZXNpemVFdmVudC5waXBlKFxuICAgICAgZGVib3VuY2VUaW1lKDMwMCksXG4gICAgKS5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fZml4U2Nyb2xsT25SZXNpemUoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fcmVzaXplU2Vuc29yKSB7IHRoaXMuX3Jlc2l6ZVNlbnNvci5kZXRhY2goKTsgfVxuICAgIHRoaXMuX3Jlc2l6ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX3Jlc2l6ZUV2ZW50LmNvbXBsZXRlKCk7XG4gIH1cblxuICBzZXRTY3JvbGwoZGlyOiBBamZQYWdlU2xpZGVySXRlbVNjcm9sbERpcmVjdGlvbiwgIGFtb3VudDogbnVtYmVyLCBfZHVyYXRpb246IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLl9lbCA9PSBudWxsIHx8IHRoaXMud3JhcHBlciA9PSBudWxsIHx8IGFtb3VudCA9PT0gMCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBjb25zdCBlbCA9IHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3Qgd3JhcHBlciA9IHRoaXMud3JhcHBlci5uYXRpdmVFbGVtZW50O1xuICAgIGxldCBjb250YWluZXJTaXplLCB3cmFwcGVyU2l6ZSwgY3VycmVudFNjcm9sbDtcbiAgICBpZiAoZGlyID09PSAneCcpIHtcbiAgICAgIGNvbnRhaW5lclNpemUgPSBlbC5jbGllbnRXaWR0aDtcbiAgICAgIHdyYXBwZXJTaXplID0gd3JhcHBlci5jbGllbnRXaWR0aDtcbiAgICAgIGN1cnJlbnRTY3JvbGwgPSB0aGlzLl9zY3JvbGxYO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb250YWluZXJTaXplID0gZWwuY2xpZW50SGVpZ2h0O1xuICAgICAgd3JhcHBlclNpemUgPSB3cmFwcGVyLmNsaWVudEhlaWdodDtcbiAgICAgIGN1cnJlbnRTY3JvbGwgPSB0aGlzLl9zY3JvbGxZO1xuICAgIH1cbiAgICBjb25zdCBtYXhTY3JvbGwgPSBjb250YWluZXJTaXplIC0gd3JhcHBlclNpemU7XG4gICAgaWYgKFxuICAgICAgd3JhcHBlclNpemUgPD0gY29udGFpbmVyU2l6ZVxuICAgICAgfHwgKGN1cnJlbnRTY3JvbGwgPT09IG1heFNjcm9sbCAmJiBhbW91bnQgPCAwKVxuICAgICAgfHwgKGN1cnJlbnRTY3JvbGwgPT09IDAgJiYgYW1vdW50ID4gMClcbiAgICApIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgaWYgKGFtb3VudCA8IDApIHtcbiAgICAgIGlmIChkaXIgPT09ICd4Jykge1xuICAgICAgICB0aGlzLl9zY3JvbGxYID0gTWF0aC5tYXgobWF4U2Nyb2xsLCB0aGlzLl9zY3JvbGxYICsgYW1vdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFkgPSBNYXRoLm1heChtYXhTY3JvbGwsIHRoaXMuX3Njcm9sbFkgKyBhbW91bnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZGlyID09PSAneCcpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsWCA9IE1hdGgubWluKDAsIHRoaXMuX3Njcm9sbFggKyBhbW91bnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsWSA9IE1hdGgubWluKDAsIHRoaXMuX3Njcm9sbFkgKyBhbW91bnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgIHdyYXBwZXIsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7dGhpcy5fc2Nyb2xsWH1weCwgJHt0aGlzLl9zY3JvbGxZfXB4KWBcbiAgICApO1xuICAgIHRoaXMuX3Njcm9sbEV2dC5lbWl0KHt4OiB0aGlzLl9zY3JvbGxYLCB5OiB0aGlzLl9zY3JvbGxZfSk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9vblJlc2l6ZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNpemVFdmVudC5lbWl0KCk7XG4gIH1cblxuICBwcml2YXRlIF9maXhTY3JvbGxPblJlc2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5jb250ZW50ID09IG51bGwgfHwgdGhpcy53cmFwcGVyID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgY29udGVudCA9IHRoaXMuY29udGVudC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLndyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCBtYXhTY3JvbGxYID0gTWF0aC5taW4oMCwgY29udGVudC5jbGllbnRXaWR0aCAtIHdyYXBwZXIuY2xpZW50V2lkdGgpO1xuICAgIGNvbnN0IG1heFNjcm9sbFkgPSBNYXRoLm1pbigwLCBjb250ZW50LmNsaWVudEhlaWdodCAtIHdyYXBwZXIuY2xpZW50SGVpZ2h0KTtcbiAgICBpZiAoXG4gICAgICBtYXhTY3JvbGxYICE9PSAwIHx8IG1heFNjcm9sbFkgIT09IDBcbiAgICAgIHx8IChtYXhTY3JvbGxYID09PSAwICYmIHRoaXMuX3Njcm9sbFggIT09IDApXG4gICAgICB8fCAobWF4U2Nyb2xsWSA9PT0gMCAmJiB0aGlzLl9zY3JvbGxZICE9PSAwKVxuICAgICkge1xuICAgICAgdGhpcy5fc2Nyb2xsWCA9IE1hdGgubWF4KFxuICAgICAgICBtYXhTY3JvbGxYLCB0aGlzLl9zY3JvbGxYIC0gKGNvbnRlbnQuc2Nyb2xsTGVmdCAhPSBudWxsID8gY29udGVudC5zY3JvbGxMZWZ0IDogMCkpO1xuICAgICAgdGhpcy5fc2Nyb2xsWSA9IE1hdGgubWF4KFxuICAgICAgICBtYXhTY3JvbGxZLCB0aGlzLl9zY3JvbGxZIC0gKGNvbnRlbnQuc2Nyb2xsVG9wICE9IG51bGwgPyBjb250ZW50LnNjcm9sbFRvcCA6IDApKTtcbiAgICAgIGNvbnRlbnQuc2Nyb2xsVG9wID0gY29udGVudC5zY3JvbGxMZWZ0ID0gMDtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgICB3cmFwcGVyLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3RoaXMuX3Njcm9sbFh9cHgsICR7dGhpcy5fc2Nyb2xsWX1weClgXG4gICAgICApO1xuICAgICAgdGhpcy5fc2Nyb2xsRXZ0LmVtaXQoe3g6IHRoaXMuX3Njcm9sbFgsIHk6IHRoaXMuX3Njcm9sbFl9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==