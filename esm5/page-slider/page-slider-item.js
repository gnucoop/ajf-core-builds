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
var AjfPageSliderItem = /** @class */ (function () {
    function AjfPageSliderItem(_el, _renderer) {
        var _this = this;
        this._el = _el;
        this._renderer = _renderer;
        this._scrollEvt = new EventEmitter();
        this.scroll = this._scrollEvt.asObservable();
        this._scrollX = 0;
        this._scrollY = 0;
        this._resizeEvent = new EventEmitter();
        this._resizeSub = Subscription.EMPTY;
        this._resizeSensor = new ResizeSensor(_el.nativeElement, function () { return _this._onResize(); });
        this._resizeSub = this._resizeEvent.pipe(debounceTime(300)).subscribe(function () { return _this._fixScrollOnResize(); });
    }
    AjfPageSliderItem.prototype.ngOnDestroy = function () {
        if (this._resizeSensor) {
            this._resizeSensor.detach();
        }
        this._resizeSub.unsubscribe();
        this._resizeEvent.complete();
    };
    AjfPageSliderItem.prototype.setScroll = function (dir, amount, _duration) {
        if (this._el == null || this.wrapper == null || amount === 0) {
            return false;
        }
        var el = this._el.nativeElement;
        var wrapper = this.wrapper.nativeElement;
        var containerSize, wrapperSize, currentScroll;
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
        var maxScroll = containerSize - wrapperSize;
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
        this._renderer.setStyle(wrapper, 'transform', "translate(" + this._scrollX + "px, " + this._scrollY + "px)");
        this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
        return true;
    };
    AjfPageSliderItem.prototype._onResize = function () {
        this._resizeEvent.emit();
    };
    AjfPageSliderItem.prototype._fixScrollOnResize = function () {
        if (this.content == null || this.wrapper == null) {
            return;
        }
        var content = this.content.nativeElement;
        var wrapper = this.wrapper.nativeElement;
        var maxScrollX = Math.min(0, content.clientWidth - wrapper.clientWidth);
        var maxScrollY = Math.min(0, content.clientHeight - wrapper.clientHeight);
        if (maxScrollX !== 0 || maxScrollY !== 0
            || (maxScrollX === 0 && this._scrollX !== 0)
            || (maxScrollY === 0 && this._scrollY !== 0)) {
            this._scrollX = Math.max(maxScrollX, this._scrollX - (content.scrollLeft != null ? content.scrollLeft : 0));
            this._scrollY = Math.max(maxScrollY, this._scrollY - (content.scrollTop != null ? content.scrollTop : 0));
            content.scrollTop = content.scrollLeft = 0;
            this._renderer.setStyle(wrapper, 'transform', "translate(" + this._scrollX + "px, " + this._scrollY + "px)");
            this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
        }
    };
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
    AjfPageSliderItem.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AjfPageSliderItem.propDecorators = {
        wrapper: [{ type: ViewChild, args: ['wrapper', { static: true },] }],
        content: [{ type: ViewChild, args: ['content', { static: true },] }],
        scroll: [{ type: Output }]
    };
    return AjfPageSliderItem;
}());
export { AjfPageSliderItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUNqRCxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxpQkFBaUIsRUFDM0QsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ2pELE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUk1QztJQXFCRSwyQkFDVSxHQUFlLEVBQ2YsU0FBb0I7UUFGOUIsaUJBU0M7UUFSUyxRQUFHLEdBQUgsR0FBRyxDQUFZO1FBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBVztRQVp0QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQTBCLENBQUM7UUFFdkQsV0FBTSxHQUF1QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBRTdFLGFBQVEsR0FBRyxDQUFDLENBQUM7UUFDYixhQUFRLEdBQUcsQ0FBQyxDQUFDO1FBRWIsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUM1RCxlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFNcEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLGNBQU0sT0FBQSxLQUFJLENBQUMsU0FBUyxFQUFFLEVBQWhCLENBQWdCLENBQUMsQ0FBQztRQUVqRixJQUFJLENBQUMsVUFBVSxHQUFHLElB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dEIsVUFBVSxFQUFFLElBQUksQ0FBQyxRQUFRLEdBQUcsQ0FBQyxPQUFPLENBQUMsU0FBUyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUNuRixPQUFPLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQyxVQUFVLEdBQUcsQ0FBQyxDQUFDO1lBQzNDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUNyQixPQUFPLEVBQUUsV0FBVyxFQUFFLGVBQWEsSUFBSSxDQUFDLFFBQVEsWUFBTyxJQUFJLENBQUMsUUFBUSxRQUFLLENBQzFFLENBQUM7WUFDRixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFFLENBQUMsRUFBRSxJQUFJLENBQUMsUUFBUSxFQUFDLENBQUMsQ0FBQztTQUM1RDtJQUNILENBQUM7O2dCQXZHRixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLHNCQUFzQjtvQkFDaEMscUxBQW9DO29CQUVwQyxlQUFlLEVBQUUsdUJBQXVCLENBQUMsTUFBTTtvQkFDL0MsYUFBYSxFQUFFLGlCQUFpQixDQUFDLElBQUk7O2lCQUN0Qzs7OztnQkFmcUMsVUFBVTtnQkFDM0IsU0FBUzs7OzBCQWdCM0IsU0FBUyxTQUFDLFNBQVMsRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7MEJBQ25DLFNBQVMsU0FBQyxTQUFTLEVBQUUsRUFBQyxNQUFNLEVBQUUsSUFBSSxFQUFDO3lCQUduQyxNQUFNOztJQTRGVCx3QkFBQztDQUFBLEFBeEdELElBd0dDO1NBakdZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksIENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLFxuICBPbkRlc3Ryb3ksIE91dHB1dCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGQsIFZpZXdFbmNhcHN1bGF0aW9uXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtSZXNpemVTZW5zb3J9IGZyb20gJ2Nzcy1lbGVtZW50LXF1ZXJpZXMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWJvdW5jZVRpbWV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZQYWdlU2xpZGVySXRlbVNjcm9sbERpcmVjdGlvbn0gZnJvbSAnLi9wYWdlLXNsaWRlci1pdGVtLXNjcm9sbC1kaXJlY3Rpb24nO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtcGFnZS1zbGlkZXItaXRlbScsXG4gIHRlbXBsYXRlVXJsOiAncGFnZS1zbGlkZXItaXRlbS5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJ3BhZ2Utc2xpZGVyLWl0ZW0uY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxufSlcbmV4cG9ydCBjbGFzcyBBamZQYWdlU2xpZGVySXRlbSBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ3dyYXBwZXInLCB7c3RhdGljOiB0cnVlfSkgd3JhcHBlcjogRWxlbWVudFJlZjtcbiAgQFZpZXdDaGlsZCgnY29udGVudCcsIHtzdGF0aWM6IHRydWV9KSBjb250ZW50OiBFbGVtZW50UmVmO1xuXG4gIHByaXZhdGUgX3Njcm9sbEV2dCA9IG5ldyBFdmVudEVtaXR0ZXI8e3g6IG51bWJlciwgeTogbnVtYmVyfT4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHNjcm9sbDogT2JzZXJ2YWJsZTx7eDogbnVtYmVyLCB5OiBudW1iZXJ9PiA9IHRoaXMuX3Njcm9sbEV2dC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zY3JvbGxYID0gMDtcbiAgcHJpdmF0ZSBfc2Nyb2xsWSA9IDA7XG4gIHByaXZhdGUgX3Jlc2l6ZVNlbnNvcjogUmVzaXplU2Vuc29yO1xuICBwcml2YXRlIF9yZXNpemVFdmVudDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBwcml2YXRlIF9yZXNpemVTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICApIHtcbiAgICB0aGlzLl9yZXNpemVTZW5zb3IgPSBuZXcgUmVzaXplU2Vuc29yKF9lbC5uYXRpdmVFbGVtZW50LCAoKSA9PiB0aGlzLl9vblJlc2l6ZSgpKTtcblxuICAgIHRoaXMuX3Jlc2l6ZVN1YiA9IHRoaXMuX3Jlc2l6ZUV2ZW50LnBpcGUoXG4gICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICApLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9maXhTY3JvbGxPblJlc2l6ZSgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yZXNpemVTZW5zb3IpIHsgdGhpcy5fcmVzaXplU2Vuc29yLmRldGFjaCgpOyB9XG4gICAgdGhpcy5fcmVzaXplU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVzaXplRXZlbnQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHNldFNjcm9sbChkaXI6IEFqZlBhZ2VTbGlkZXJJdGVtU2Nyb2xsRGlyZWN0aW9uLCAgYW1vdW50OiBudW1iZXIsIF9kdXJhdGlvbjogbnVtYmVyKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMuX2VsID09IG51bGwgfHwgdGhpcy53cmFwcGVyID09IG51bGwgfHwgYW1vdW50ID09PSAwKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIGNvbnN0IGVsID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudDtcbiAgICBjb25zdCB3cmFwcGVyID0gdGhpcy53cmFwcGVyLm5hdGl2ZUVsZW1lbnQ7XG4gICAgbGV0IGNvbnRhaW5lclNpemUsIHdyYXBwZXJTaXplLCBjdXJyZW50U2Nyb2xsO1xuICAgIGlmIChkaXIgPT09ICd4Jykge1xuICAgICAgY29udGFpbmVyU2l6ZSA9IGVsLmNsaWVudFdpZHRoO1xuICAgICAgd3JhcHBlclNpemUgPSB3cmFwcGVyLmNsaWVudFdpZHRoO1xuICAgICAgY3VycmVudFNjcm9sbCA9IHRoaXMuX3Njcm9sbFg7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnRhaW5lclNpemUgPSBlbC5jbGllbnRIZWlnaHQ7XG4gICAgICB3cmFwcGVyU2l6ZSA9IHdyYXBwZXIuY2xpZW50SGVpZ2h0O1xuICAgICAgY3VycmVudFNjcm9sbCA9IHRoaXMuX3Njcm9sbFk7XG4gICAgfVxuICAgIGNvbnN0IG1heFNjcm9sbCA9IGNvbnRhaW5lclNpemUgLSB3cmFwcGVyU2l6ZTtcbiAgICBpZiAoXG4gICAgICB3cmFwcGVyU2l6ZSA8PSBjb250YWluZXJTaXplXG4gICAgICB8fCAoY3VycmVudFNjcm9sbCA9PT0gbWF4U2Nyb2xsICYmIGFtb3VudCA8IDApXG4gICAgICB8fCAoY3VycmVudFNjcm9sbCA9PT0gMCAmJiBhbW91bnQgPiAwKVxuICAgICkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICBpZiAoYW1vdW50IDwgMCkge1xuICAgICAgaWYgKGRpciA9PT0gJ3gnKSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFggPSBNYXRoLm1heChtYXhTY3JvbGwsIHRoaXMuX3Njcm9sbFggKyBhbW91bnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsWSA9IE1hdGgubWF4KG1heFNjcm9sbCwgdGhpcy5fc2Nyb2xsWSArIGFtb3VudCk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChkaXIgPT09ICd4Jykge1xuICAgICAgICB0aGlzLl9zY3JvbGxYID0gTWF0aC5taW4oMCwgdGhpcy5fc2Nyb2xsWCArIGFtb3VudCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9zY3JvbGxZID0gTWF0aC5taW4oMCwgdGhpcy5fc2Nyb2xsWSArIGFtb3VudCk7XG4gICAgICB9XG4gICAgfVxuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKFxuICAgICAgd3JhcHBlciwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHt0aGlzLl9zY3JvbGxYfXB4LCAke3RoaXMuX3Njcm9sbFl9cHgpYFxuICAgICk7XG4gICAgdGhpcy5fc2Nyb2xsRXZ0LmVtaXQoe3g6IHRoaXMuX3Njcm9sbFgsIHk6IHRoaXMuX3Njcm9sbFl9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX29uUmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2l6ZUV2ZW50LmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpeFNjcm9sbE9uUmVzaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnRlbnQgPT0gbnVsbCB8fCB0aGlzLndyYXBwZXIgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3Qgd3JhcHBlciA9IHRoaXMud3JhcHBlci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IG1heFNjcm9sbFggPSBNYXRoLm1pbigwLCBjb250ZW50LmNsaWVudFdpZHRoIC0gd3JhcHBlci5jbGllbnRXaWR0aCk7XG4gICAgY29uc3QgbWF4U2Nyb2xsWSA9IE1hdGgubWluKDAsIGNvbnRlbnQuY2xpZW50SGVpZ2h0IC0gd3JhcHBlci5jbGllbnRIZWlnaHQpO1xuICAgIGlmIChcbiAgICAgIG1heFNjcm9sbFggIT09IDAgfHwgbWF4U2Nyb2xsWSAhPT0gMFxuICAgICAgfHwgKG1heFNjcm9sbFggPT09IDAgJiYgdGhpcy5fc2Nyb2xsWCAhPT0gMClcbiAgICAgIHx8IChtYXhTY3JvbGxZID09PSAwICYmIHRoaXMuX3Njcm9sbFkgIT09IDApXG4gICAgKSB7XG4gICAgICB0aGlzLl9zY3JvbGxYID0gTWF0aC5tYXgoXG4gICAgICAgIG1heFNjcm9sbFgsIHRoaXMuX3Njcm9sbFggLSAoY29udGVudC5zY3JvbGxMZWZ0ICE9IG51bGwgPyBjb250ZW50LnNjcm9sbExlZnQgOiAwKSk7XG4gICAgICB0aGlzLl9zY3JvbGxZID0gTWF0aC5tYXgoXG4gICAgICAgIG1heFNjcm9sbFksIHRoaXMuX3Njcm9sbFkgLSAoY29udGVudC5zY3JvbGxUb3AgIT0gbnVsbCA/IGNvbnRlbnQuc2Nyb2xsVG9wIDogMCkpO1xuICAgICAgY29udGVudC5zY3JvbGxUb3AgPSBjb250ZW50LnNjcm9sbExlZnQgPSAwO1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoXG4gICAgICAgIHdyYXBwZXIsICd0cmFuc2Zvcm0nLCBgdHJhbnNsYXRlKCR7dGhpcy5fc2Nyb2xsWH1weCwgJHt0aGlzLl9zY3JvbGxZfXB4KWBcbiAgICAgICk7XG4gICAgICB0aGlzLl9zY3JvbGxFdnQuZW1pdCh7eDogdGhpcy5fc2Nyb2xsWCwgeTogdGhpcy5fc2Nyb2xsWX0pO1xuICAgIH1cbiAgfVxufVxuIl19