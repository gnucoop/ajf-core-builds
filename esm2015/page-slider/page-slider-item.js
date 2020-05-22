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
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Output, Renderer2, ViewChild, ViewEncapsulation } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { Observable, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
let AjfPageSliderItem = /** @class */ (() => {
    let AjfPageSliderItem = class AjfPageSliderItem {
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
    };
    __decorate([
        ViewChild('wrapper', { static: true }),
        __metadata("design:type", ElementRef)
    ], AjfPageSliderItem.prototype, "wrapper", void 0);
    __decorate([
        ViewChild('content', { static: true }),
        __metadata("design:type", ElementRef)
    ], AjfPageSliderItem.prototype, "content", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Observable)
    ], AjfPageSliderItem.prototype, "scroll", void 0);
    AjfPageSliderItem = __decorate([
        Component({
            selector: 'ajf-page-slider-item',
            template: "<div #content class=\"ajf-page-slider-item-content\">\n  <div #wrapper class=\"ajf-page-slider-item-content-wrapper\">\n    <ng-content></ng-content>\n  </div>\n</div>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["ajf-page-slider-item{display:block;position:relative}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;bottom:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}\n"]
        }),
        __metadata("design:paramtypes", [ElementRef,
            Renderer2])
    ], AjfPageSliderItem);
    return AjfPageSliderItem;
})();
export { AjfPageSliderItem };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXItaXRlbS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3BhZ2Utc2xpZGVyL3BhZ2Utc2xpZGVyLWl0ZW0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBRVosTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsaUJBQWlCLEVBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNqRCxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFXNUM7SUFBQSxJQUFhLGlCQUFpQixHQUE5QixNQUFhLGlCQUFpQjtRQWE1QixZQUNZLEdBQWUsRUFDZixTQUFvQjtZQURwQixRQUFHLEdBQUgsR0FBRyxDQUFZO1lBQ2YsY0FBUyxHQUFULFNBQVMsQ0FBVztZQVh4QixlQUFVLEdBQUcsSUFBSSxZQUFZLEVBQTBCLENBQUM7WUFDN0MsV0FBTSxHQUF1QyxJQUFJLENBQUMsVUFBVSxDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXZGLGFBQVEsR0FBRyxDQUFDLENBQUM7WUFDYixhQUFRLEdBQUcsQ0FBQyxDQUFDO1lBRWIsaUJBQVksR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztZQUM1RCxlQUFVLEdBQWlCLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFNcEQsSUFBSSxDQUFDLGFBQWEsR0FBRyxJQUFJLFlBQVksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1lBRWpGLElBQUksQ0FBQyxVQUFVLEdB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dWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDb21wb25lbnQsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxuICBWaWV3RW5jYXBzdWxhdGlvblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7UmVzaXplU2Vuc29yfSBmcm9tICdjc3MtZWxlbWVudC1xdWVyaWVzJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlckl0ZW1TY3JvbGxEaXJlY3Rpb259IGZyb20gJy4vcGFnZS1zbGlkZXItaXRlbS1zY3JvbGwtZGlyZWN0aW9uJztcblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLXBhZ2Utc2xpZGVyLWl0ZW0nLFxuICB0ZW1wbGF0ZVVybDogJ3BhZ2Utc2xpZGVyLWl0ZW0uaHRtbCcsXG4gIHN0eWxlVXJsczogWydwYWdlLXNsaWRlci1pdGVtLmNzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmUGFnZVNsaWRlckl0ZW0gaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCd3cmFwcGVyJywge3N0YXRpYzogdHJ1ZX0pIHdyYXBwZXI6IEVsZW1lbnRSZWY7XG4gIEBWaWV3Q2hpbGQoJ2NvbnRlbnQnLCB7c3RhdGljOiB0cnVlfSkgY29udGVudDogRWxlbWVudFJlZjtcblxuICBwcml2YXRlIF9zY3JvbGxFdnQgPSBuZXcgRXZlbnRFbWl0dGVyPHt4OiBudW1iZXIsIHk6IG51bWJlcn0+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBzY3JvbGw6IE9ic2VydmFibGU8e3g6IG51bWJlciwgeTogbnVtYmVyfT4gPSB0aGlzLl9zY3JvbGxFdnQuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2Nyb2xsWCA9IDA7XG4gIHByaXZhdGUgX3Njcm9sbFkgPSAwO1xuICBwcml2YXRlIF9yZXNpemVTZW5zb3I6IFJlc2l6ZVNlbnNvcjtcbiAgcHJpdmF0ZSBfcmVzaXplRXZlbnQ6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgcHJpdmF0ZSBfcmVzaXplU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICkge1xuICAgIHRoaXMuX3Jlc2l6ZVNlbnNvciA9IG5ldyBSZXNpemVTZW5zb3IoX2VsLm5hdGl2ZUVsZW1lbnQsICgpID0+IHRoaXMuX29uUmVzaXplKCkpO1xuXG4gICAgdGhpcy5fcmVzaXplU3ViID0gdGhpcy5fcmVzaXplRXZlbnRcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoMzAwKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9maXhTY3JvbGxPblJlc2l6ZSgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9yZXNpemVTZW5zb3IpIHtcbiAgICAgIHRoaXMuX3Jlc2l6ZVNlbnNvci5kZXRhY2goKTtcbiAgICB9XG4gICAgdGhpcy5fcmVzaXplU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fcmVzaXplRXZlbnQuY29tcGxldGUoKTtcbiAgfVxuXG4gIHNldFNjcm9sbChkaXI6IEFqZlBhZ2VTbGlkZXJJdGVtU2Nyb2xsRGlyZWN0aW9uLCBhbW91bnQ6IG51bWJlciwgX2R1cmF0aW9uOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICBpZiAodGhpcy5fZWwgPT0gbnVsbCB8fCB0aGlzLndyYXBwZXIgPT0gbnVsbCB8fCBhbW91bnQgPT09IDApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgZWwgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IHdyYXBwZXIgPSB0aGlzLndyYXBwZXIubmF0aXZlRWxlbWVudDtcbiAgICBsZXQgY29udGFpbmVyU2l6ZSwgd3JhcHBlclNpemUsIGN1cnJlbnRTY3JvbGw7XG4gICAgaWYgKGRpciA9PT0gJ3gnKSB7XG4gICAgICBjb250YWluZXJTaXplID0gZWwuY2xpZW50V2lkdGg7XG4gICAgICB3cmFwcGVyU2l6ZSA9IHdyYXBwZXIuY2xpZW50V2lkdGg7XG4gICAgICBjdXJyZW50U2Nyb2xsID0gdGhpcy5fc2Nyb2xsWDtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udGFpbmVyU2l6ZSA9IGVsLmNsaWVudEhlaWdodDtcbiAgICAgIHdyYXBwZXJTaXplID0gd3JhcHBlci5jbGllbnRIZWlnaHQ7XG4gICAgICBjdXJyZW50U2Nyb2xsID0gdGhpcy5fc2Nyb2xsWTtcbiAgICB9XG4gICAgY29uc3QgbWF4U2Nyb2xsID0gY29udGFpbmVyU2l6ZSAtIHdyYXBwZXJTaXplO1xuICAgIGlmICh3cmFwcGVyU2l6ZSA8PSBjb250YWluZXJTaXplIHx8IChjdXJyZW50U2Nyb2xsID09PSBtYXhTY3JvbGwgJiYgYW1vdW50IDwgMCkgfHxcbiAgICAgICAgKGN1cnJlbnRTY3JvbGwgPT09IDAgJiYgYW1vdW50ID4gMCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGFtb3VudCA8IDApIHtcbiAgICAgIGlmIChkaXIgPT09ICd4Jykge1xuICAgICAgICB0aGlzLl9zY3JvbGxYID0gTWF0aC5tYXgobWF4U2Nyb2xsLCB0aGlzLl9zY3JvbGxYICsgYW1vdW50KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMuX3Njcm9sbFkgPSBNYXRoLm1heChtYXhTY3JvbGwsIHRoaXMuX3Njcm9sbFkgKyBhbW91bnQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoZGlyID09PSAneCcpIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsWCA9IE1hdGgubWluKDAsIHRoaXMuX3Njcm9sbFggKyBhbW91bnQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fc2Nyb2xsWSA9IE1hdGgubWluKDAsIHRoaXMuX3Njcm9sbFkgKyBhbW91bnQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgd3JhcHBlciwgJ3RyYW5zZm9ybScsIGB0cmFuc2xhdGUoJHt0aGlzLl9zY3JvbGxYfXB4LCAke3RoaXMuX3Njcm9sbFl9cHgpYCk7XG4gICAgdGhpcy5fc2Nyb2xsRXZ0LmVtaXQoe3g6IHRoaXMuX3Njcm9sbFgsIHk6IHRoaXMuX3Njcm9sbFl9KTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX29uUmVzaXplKCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2l6ZUV2ZW50LmVtaXQoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpeFNjcm9sbE9uUmVzaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmNvbnRlbnQgPT0gbnVsbCB8fCB0aGlzLndyYXBwZXIgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjb250ZW50ID0gdGhpcy5jb250ZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgY29uc3Qgd3JhcHBlciA9IHRoaXMud3JhcHBlci5uYXRpdmVFbGVtZW50O1xuICAgIGNvbnN0IG1heFNjcm9sbFggPSBNYXRoLm1pbigwLCBjb250ZW50LmNsaWVudFdpZHRoIC0gd3JhcHBlci5jbGllbnRXaWR0aCk7XG4gICAgY29uc3QgbWF4U2Nyb2xsWSA9IE1hdGgubWluKDAsIGNvbnRlbnQuY2xpZW50SGVpZ2h0IC0gd3JhcHBlci5jbGllbnRIZWlnaHQpO1xuICAgIGlmIChtYXhTY3JvbGxYICE9PSAwIHx8IG1heFNjcm9sbFkgIT09IDAgfHwgKG1heFNjcm9sbFggPT09IDAgJiYgdGhpcy5fc2Nyb2xsWCAhPT0gMCkgfHxcbiAgICAgICAgKG1heFNjcm9sbFkgPT09IDAgJiYgdGhpcy5fc2Nyb2xsWSAhPT0gMCkpIHtcbiAgICAgIHRoaXMuX3Njcm9sbFggPSBNYXRoLm1heChcbiAgICAgICAgICBtYXhTY3JvbGxYLCB0aGlzLl9zY3JvbGxYIC0gKGNvbnRlbnQuc2Nyb2xsTGVmdCAhPSBudWxsID8gY29udGVudC5zY3JvbGxMZWZ0IDogMCkpO1xuICAgICAgdGhpcy5fc2Nyb2xsWSA9XG4gICAgICAgICAgTWF0aC5tYXgobWF4U2Nyb2xsWSwgdGhpcy5fc2Nyb2xsWSAtIChjb250ZW50LnNjcm9sbFRvcCAhPSBudWxsID8gY29udGVudC5zY3JvbGxUb3AgOiAwKSk7XG4gICAgICBjb250ZW50LnNjcm9sbFRvcCA9IGNvbnRlbnQuc2Nyb2xsTGVmdCA9IDA7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShcbiAgICAgICAgICB3cmFwcGVyLCAndHJhbnNmb3JtJywgYHRyYW5zbGF0ZSgke3RoaXMuX3Njcm9sbFh9cHgsICR7dGhpcy5fc2Nyb2xsWX1weClgKTtcbiAgICAgIHRoaXMuX3Njcm9sbEV2dC5lbWl0KHt4OiB0aGlzLl9zY3JvbGxYLCB5OiB0aGlzLl9zY3JvbGxZfSk7XG4gICAgfVxuICB9XG59XG4iXX0=