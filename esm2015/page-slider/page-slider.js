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
import { animate, AnimationBuilder, style } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map, scan, throttleTime } from 'rxjs/operators';
import { AjfPageSliderItem } from './page-slider-item';
let AjfPageSlider = /** @class */ (() => {
    class AjfPageSlider {
        constructor(_animationBuilder, _cdr, _renderer) {
            this._animationBuilder = _animationBuilder;
            this._cdr = _cdr;
            this._renderer = _renderer;
            this._pageScrollFinish = new EventEmitter();
            this.pageScrollFinish = this._pageScrollFinish.asObservable();
            this._orientationChange = new EventEmitter();
            this.orientationChange = this._orientationChange.asObservable();
            this.duration = 300;
            this._orientation = 'horizontal';
            this._fixedOrientation = false;
            this._currentPage = -1;
            this._animating = false;
            this._pagesSub = Subscription.EMPTY;
            this._mouseWheelEvt = new EventEmitter();
            this._mouseWheelSub = Subscription.EMPTY;
            this._mouseWheelSub =
                this._mouseWheelEvt
                    .pipe(map(evt => {
                    const page = this._getCurrentPage();
                    if (page == null) {
                        return null;
                    }
                    return { evt, res: page.setScroll(evt.dir, evt.amount, 0) };
                }), filter(r => r != null && r.res === false &&
                    ((r.evt.dir === 'x' && this.orientation === 'horizontal') ||
                        (r.evt.dir === 'y' && this.orientation === 'vertical'))), map(r => r.evt.amount), scan((acc, val) => {
                    if (acc === 0) {
                        return val;
                    }
                    if (acc / Math.abs(acc) !== val / Math.abs(val)) {
                        return 0;
                    }
                    return acc + val;
                }, 0), filter(val => !this._animating && Math.abs(val) > 150), throttleTime(1500))
                    .subscribe(val => {
                    this._mouseWheelEvt.emit({ dir: 'x', amount: val > 0 ? -1 : +1 });
                    this.slide({ dir: val > 0 ? 'back' : 'forward' });
                });
        }
        get orientation() {
            return this._orientation;
        }
        set orientation(orientation) {
            if (this._orientation !== orientation) {
                this._orientation = orientation;
                this._cdr.markForCheck();
                this._updateSize();
                this._restoreCurrentPage();
                this._orientationChange.emit(this._orientation);
            }
        }
        get fixedOrientation() {
            return this._fixedOrientation;
        }
        set fixedOrientation(fixedOrientation) {
            this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
            this._cdr.markForCheck();
        }
        get currentPage() {
            return this._currentPage;
        }
        set currentPage(currentPage) {
            if (this.pages == null || currentPage < 0 || currentPage >= this.pages.length) {
                return;
            }
            this._currentPage = currentPage;
            this._doSlide();
        }
        get hideNavigationButtons() {
            return this._hideNavigationButtons;
        }
        set hideNavigationButtons(hnb) {
            this._hideNavigationButtons = coerceBooleanProperty(hnb);
            this._cdr.markForCheck();
        }
        ngAfterContentInit() {
            this._onSlidesChange();
            this._pagesSub = this.pages.changes.subscribe(() => this._onSlidesChange());
        }
        ngOnDestroy() {
            this._pagesSub.unsubscribe();
            this._mouseWheelEvt.complete();
            this._mouseWheelSub.unsubscribe();
            this._orientationChange.complete();
        }
        switchOrientation() {
            if (this._orientation === 'horizontal') {
                this.orientation = 'vertical';
            }
            else {
                this.orientation = 'horizontal';
            }
        }
        slide(opts) {
            if (this.pages == null) {
                return;
            }
            if (opts.dir) {
                if (opts.dir === 'back' || opts.dir === 'up' || opts.dir === 'left') {
                    this._slideBack();
                }
                else if (opts.dir === 'forward' || opts.dir === 'down' || opts.dir === 'right') {
                    this._slideForward();
                }
            }
            else if (opts.to) {
                this._slideTo(opts.to);
            }
        }
        onMouseWheel(event) {
            const evt = event;
            if (evt.deltaX == null || evt.deltaY == null) {
                return;
            }
            const absDeltaX = Math.abs(evt.deltaX);
            const absDeltaY = Math.abs(evt.deltaY);
            if (absDeltaX === 0 && absDeltaY === 0) {
                return;
            }
            if (absDeltaX > absDeltaY) {
                this._mouseWheelEvt.emit({ dir: 'x', amount: -evt.deltaX });
            }
            else {
                this._mouseWheelEvt.emit({ dir: 'y', amount: -evt.deltaY });
            }
        }
        onTouchStart(evt) {
            if (evt.touches == null || evt.touches.length === 0 || this._animating) {
                return;
            }
            this._currentOrigin = { x: evt.touches[0].clientX, y: evt.touches[0].clientY, time: +new Date() };
        }
        onTouchMove(evt) {
            if (evt.touches == null || evt.touches.length === 0 || this._currentOrigin == null ||
                this._animating) {
                return;
            }
            const point = { x: evt.touches[0].clientX, y: evt.touches[0].clientY, time: +new Date() };
            const movement = this._calculateMovement(point);
            this._currentOrigin = point;
            if (movement.velocityX === 0 && movement.velocityY === 0) {
                return;
            }
            const absVelocityX = Math.abs(movement.velocityX);
            const absVelocityY = Math.abs(movement.velocityY);
            if (absVelocityX > absVelocityY) {
                if (this.orientation === 'horizontal' && absVelocityX > 1.5 &&
                    Math.abs(movement.deltaX) > 50) {
                    this._resetCurrentOrigin();
                    this.slide({ dir: movement.velocityX < 0 ? 'forward' : 'back' });
                }
                else {
                    const page = this._getCurrentPage();
                    if (page != null) {
                        page.setScroll('x', movement.deltaX, movement.deltaTime);
                    }
                }
            }
            else {
                if (this.orientation === 'vertical' && absVelocityY > 1.5 && Math.abs(movement.deltaY) > 50) {
                    this._resetCurrentOrigin();
                    this.slide({ dir: movement.velocityY < 0 ? 'forward' : 'back' });
                }
                else {
                    const page = this._getCurrentPage();
                    if (page != null) {
                        page.setScroll('y', movement.deltaY, movement.deltaTime);
                    }
                }
            }
        }
        onTouchEnd() {
            this._resetCurrentOrigin();
        }
        isCurrentPageLong() {
            const curPage = this._getCurrentPage();
            if (curPage == null) {
                return false;
            }
            return curPage.wrapper.nativeElement.clientHeight > curPage.content.nativeElement.clientHeight;
        }
        _resetCurrentOrigin() {
            this._currentOrigin = null;
        }
        _getCurrentPage() {
            if (this.pages == null || this.currentPage < 0 || this.currentPage >= this.pages.length) {
                return null;
            }
            return this.pages.toArray()[this.currentPage];
        }
        _calculateMovement(point) {
            const deltaX = point.x - this._currentOrigin.x;
            const deltaY = point.y - this._currentOrigin.y;
            const deltaTime = point.time - this._currentOrigin.time;
            return {
                velocityX: deltaX / deltaTime,
                deltaX,
                velocityY: deltaY / deltaTime,
                deltaY,
                deltaTime,
            };
        }
        _slideBack() {
            if (this._currentPage <= 0) {
                return;
            }
            this.currentPage = this._currentPage - 1;
        }
        _slideForward() {
            if (this._currentPage >= this.pages.length) {
                return;
            }
            this.currentPage = this._currentPage + 1;
        }
        _slideTo(page) {
            if (page >= 0 && page < this.pages.length) {
                this.currentPage = page;
            }
        }
        _doSlide(immediate = false) {
            if (this.body == null || this.pages == null || this._animating) {
                return;
            }
            this._animating = true;
            const animation = this._animationBuilder.build(animate(immediate ? 0 : this.duration, style({ transform: this._getCurrentTranslation() })));
            const player = animation.create(this.body.nativeElement);
            player.onDone(() => {
                this._animating = false;
                this._pageScrollFinish.emit();
            });
            player.play();
        }
        _getCurrentTranslation() {
            const slideSize = 100 / this.pages.length;
            const position = this._currentPage === -1 ? 0 : this._currentPage * slideSize;
            const translation = this._orientation === 'vertical' ? 'Y' : 'X';
            return `translate${translation}(-${position}%)`;
        }
        _getProps() {
            if (this._orientation === 'vertical') {
                return { prop: 'height', removeProp: 'width' };
            }
            return { prop: 'width', removeProp: 'height' };
        }
        _onSlidesChange() {
            this._updateSize();
        }
        _updateSize() {
            if (this.body == null || this.pages == null) {
                return;
            }
            const { prop, removeProp } = this._getProps();
            this._renderer.setStyle(this.body.nativeElement, prop, `${this.pages.length * 100}%`);
            this._renderer.setStyle(this.body.nativeElement, removeProp, null);
            let curPage;
            if (this.pages.length === 0) {
                curPage = -1;
            }
            else if (this._currentPage === -1) {
                curPage = 0;
            }
            else if (this._currentPage >= this.pages.length) {
                curPage = this.pages.length - 1;
            }
            else {
                curPage = this._currentPage;
            }
            this._currentPage = curPage;
            this._restoreCurrentPage();
        }
        _restoreCurrentPage() {
            this._doSlide(true);
        }
    }
    AjfPageSlider.decorators = [
        { type: Directive }
    ];
    AjfPageSlider.ctorParameters = () => [
        { type: AnimationBuilder },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ];
    AjfPageSlider.propDecorators = {
        body: [{ type: ViewChild, args: ['body', { static: true },] }],
        pages: [{ type: ContentChildren, args: [AjfPageSliderItem, { descendants: true },] }],
        pageScrollFinish: [{ type: Output }],
        orientationChange: [{ type: Output }],
        duration: [{ type: Input }],
        orientation: [{ type: Input }],
        fixedOrientation: [{ type: Input }],
        currentPage: [{ type: Input }],
        hideNavigationButtons: [{ type: Input }]
    };
    return AjfPageSlider;
})();
export { AjfPageSlider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBd0JyRDtJQUFBLE1BQ2EsYUFBYTtRQXNFeEIsWUFDWSxpQkFBbUMsRUFBVSxJQUF1QixFQUNwRSxTQUFvQjtZQURwQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBbUI7WUFDcEUsY0FBUyxHQUFULFNBQVMsQ0FBVztZQXBFeEIsc0JBQWlCLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7WUFDdEQscUJBQWdCLEdBQXFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUV0Rix1QkFBa0IsR0FDdEIsSUFBSSxZQUFZLEVBQTRCLENBQUM7WUFFeEMsc0JBQWlCLEdBQ3RCLElBQUksQ0FBQyxr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LE1BQU07MkJBSU4sS0FBSzs4QkFNTCxLQUFLO21DQWVMLEtBQUs7OEJBVUwsS0FBSzt3Q0FhTCxLQUFLOztJQXNRUixvQkFBQztLQUFBO1NBL1RZLGFBQWEiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7YW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgc3R5bGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgc2NhbiwgdGhyb3R0bGVUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlckl0ZW19IGZyb20gJy4vcGFnZS1zbGlkZXItaXRlbSc7XG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJTbGlkZU9wdGlvbnN9IGZyb20gJy4vcGFnZS1zbGlkZXItc2xpZGUtb3B0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJ3wndmVydGljYWwnO1xuXG5pbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgdGltZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTW92ZW1lbnQge1xuICB2ZWxvY2l0eVg6IG51bWJlcjtcbiAgdmVsb2NpdHlZOiBudW1iZXI7XG4gIGRlbHRhWDogbnVtYmVyO1xuICBkZWx0YVk6IG51bWJlcjtcbiAgZGVsdGFUaW1lOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBNb3VzaGVXaGVlbE1vdmUge1xuICBkaXI6ICd4J3wneSc7XG4gIGFtb3VudDogbnVtYmVyO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBBamZQYWdlU2xpZGVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnYm9keScsIHtzdGF0aWM6IHRydWV9KSBib2R5OiBFbGVtZW50UmVmO1xuICBAQ29udGVudENoaWxkcmVuKEFqZlBhZ2VTbGlkZXJJdGVtLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBwYWdlczogUXVlcnlMaXN0PEFqZlBhZ2VTbGlkZXJJdGVtPjtcblxuICBwcml2YXRlIF9wYWdlU2Nyb2xsRmluaXNoOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBwYWdlU2Nyb2xsRmluaXNoOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fcGFnZVNjcm9sbEZpbmlzaC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBvcmllbnRhdGlvbkNoYW5nZTogT2JzZXJ2YWJsZTxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMzAwO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gIGdldCBvcmllbnRhdGlvbigpOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgb3JpZW50YXRpb24ob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbikge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiAhPT0gb3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmVtaXQodGhpcy5fb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeGVkT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgZ2V0IGZpeGVkT3JpZW50YXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkT3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpeGVkT3JpZW50YXRpb24oZml4ZWRPcmllbnRhdGlvbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpeGVkT3JpZW50YXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZml4ZWRPcmllbnRhdGlvbik7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2UgPSAtMTtcbiAgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjdXJyZW50UGFnZShjdXJyZW50UGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCBjdXJyZW50UGFnZSA8IDAgfHwgY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcbiAgICB0aGlzLl9kb1NsaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW47XG4gIGdldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKGhuYjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShobmIpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FuaW1hdGluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9wYWdlc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2N1cnJlbnRPcmlnaW46IFBvaW50fG51bGw7XG4gIHByaXZhdGUgX21vdXNlV2hlZWxFdnQ6IEV2ZW50RW1pdHRlcjxNb3VzaGVXaGVlbE1vdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzaGVXaGVlbE1vdmU+KCk7XG4gIHByaXZhdGUgX21vdXNlV2hlZWxTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2FuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5fbW91c2VXaGVlbFN1YiA9XG4gICAgICAgIHRoaXMuX21vdXNlV2hlZWxFdnRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChldnQgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgICAgICAgICAgICBpZiAocGFnZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHtldnQsIHJlczogcGFnZS5zZXRTY3JvbGwoZXZ0LmRpciwgZXZ0LmFtb3VudCwgMCl9O1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgciA9PiByICE9IG51bGwgJiYgci5yZXMgPT09IGZhbHNlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoKHIuZXZ0LmRpciA9PT0gJ3gnICYmIHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAoci5ldnQuZGlyID09PSAneScgJiYgdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykpKSxcbiAgICAgICAgICAgICAgICBtYXAociA9PiByIS5ldnQuYW1vdW50KSxcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAoYWNjLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYWNjID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYWNjIC8gTWF0aC5hYnMoYWNjKSAhPT0gdmFsIC8gTWF0aC5hYnModmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2MgKyB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDApLFxuICAgICAgICAgICAgICAgIGZpbHRlcih2YWwgPT4gIXRoaXMuX2FuaW1hdGluZyAmJiBNYXRoLmFicyh2YWwpID4gMTUwKSxcbiAgICAgICAgICAgICAgICB0aHJvdHRsZVRpbWUoMTUwMCksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3gnLCBhbW91bnQ6IHZhbCA+IDAgPyAtMSA6ICsxfSk7XG4gICAgICAgICAgICAgIHRoaXMuc2xpZGUoe2RpcjogdmFsID4gMCA/ICdiYWNrJyA6ICdmb3J3YXJkJ30pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25TbGlkZXNDaGFuZ2UoKTtcbiAgICB0aGlzLl9wYWdlc1N1YiA9IHRoaXMucGFnZXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25TbGlkZXNDaGFuZ2UoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYWdlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9tb3VzZVdoZWVsU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIHN3aXRjaE9yaWVudGF0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICB9XG4gIH1cblxuICBzbGlkZShvcHRzOiBBamZQYWdlU2xpZGVyU2xpZGVPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3B0cy5kaXIpIHtcbiAgICAgIGlmIChvcHRzLmRpciA9PT0gJ2JhY2snIHx8IG9wdHMuZGlyID09PSAndXAnIHx8IG9wdHMuZGlyID09PSAnbGVmdCcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVCYWNrKCk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZGlyID09PSAnZm9yd2FyZCcgfHwgb3B0cy5kaXIgPT09ICdkb3duJyB8fCBvcHRzLmRpciA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICB0aGlzLl9zbGlkZUZvcndhcmQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdHMudG8pIHtcbiAgICAgIHRoaXMuX3NsaWRlVG8ob3B0cy50byk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVdoZWVsKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGV2dCA9IGV2ZW50IGFzIFdoZWVsRXZlbnQ7XG4gICAgaWYgKGV2dC5kZWx0YVggPT0gbnVsbCB8fCBldnQuZGVsdGFZID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYWJzRGVsdGFYID0gTWF0aC5hYnMoZXZ0LmRlbHRhWCk7XG4gICAgY29uc3QgYWJzRGVsdGFZID0gTWF0aC5hYnMoZXZ0LmRlbHRhWSk7XG4gICAgaWYgKGFic0RlbHRhWCA9PT0gMCAmJiBhYnNEZWx0YVkgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFic0RlbHRhWCA+IGFic0RlbHRhWSkge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd4JywgYW1vdW50OiAtZXZ0LmRlbHRhWH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3knLCBhbW91bnQ6IC1ldnQuZGVsdGFZfSk7XG4gICAgfVxuICB9XG5cbiAgb25Ub3VjaFN0YXJ0KGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQudG91Y2hlcyA9PSBudWxsIHx8IGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLl9hbmltYXRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IHt4OiBldnQudG91Y2hlc1swXS5jbGllbnRYLCB5OiBldnQudG91Y2hlc1swXS5jbGllbnRZLCB0aW1lOiArbmV3IERhdGUoKX07XG4gIH1cblxuICBvblRvdWNoTW92ZShldnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZ0LnRvdWNoZXMgPT0gbnVsbCB8fCBldnQudG91Y2hlcy5sZW5ndGggPT09IDAgfHwgdGhpcy5fY3VycmVudE9yaWdpbiA9PSBudWxsIHx8XG4gICAgICAgIHRoaXMuX2FuaW1hdGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwb2ludDogUG9pbnQgPSB7eDogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCwgeTogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WSwgdGltZTogK25ldyBEYXRlKCl9O1xuICAgIGNvbnN0IG1vdmVtZW50ID0gdGhpcy5fY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQpO1xuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSBwb2ludDtcblxuICAgIGlmIChtb3ZlbWVudC52ZWxvY2l0eVggPT09IDAgJiYgbW92ZW1lbnQudmVsb2NpdHlZID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFic1ZlbG9jaXR5WCA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WCk7XG4gICAgY29uc3QgYWJzVmVsb2NpdHlZID0gTWF0aC5hYnMobW92ZW1lbnQudmVsb2NpdHlZKTtcbiAgICBpZiAoYWJzVmVsb2NpdHlYID4gYWJzVmVsb2NpdHlZKSB7XG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIGFic1ZlbG9jaXR5WCA+IDEuNSAmJlxuICAgICAgICAgIE1hdGguYWJzKG1vdmVtZW50LmRlbHRhWCkgPiA1MCkge1xuICAgICAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgICAgICAgdGhpcy5zbGlkZSh7ZGlyOiBtb3ZlbWVudC52ZWxvY2l0eVggPCAwID8gJ2ZvcndhcmQnIDogJ2JhY2snfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgIHBhZ2Uuc2V0U2Nyb2xsKCd4JywgbW92ZW1lbnQuZGVsdGFYLCBtb3ZlbWVudC5kZWx0YVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnICYmIGFic1ZlbG9jaXR5WSA+IDEuNSAmJiBNYXRoLmFicyhtb3ZlbWVudC5kZWx0YVkpID4gNTApIHtcbiAgICAgICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogbW92ZW1lbnQudmVsb2NpdHlZIDwgMCA/ICdmb3J3YXJkJyA6ICdiYWNrJ30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlICE9IG51bGwpIHtcbiAgICAgICAgICBwYWdlLnNldFNjcm9sbCgneScsIG1vdmVtZW50LmRlbHRhWSwgbW92ZW1lbnQuZGVsdGFUaW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uVG91Y2hFbmQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gIH1cblxuICBpc0N1cnJlbnRQYWdlTG9uZygpOiBib29sZWFuIHtcbiAgICBjb25zdCBjdXJQYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICBpZiAoY3VyUGFnZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBjdXJQYWdlLndyYXBwZXIubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgPiBjdXJQYWdlLmNvbnRlbnQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldEN1cnJlbnRPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDdXJyZW50UGFnZSgpOiBBamZQYWdlU2xpZGVySXRlbXxudWxsIHtcbiAgICBpZiAodGhpcy5wYWdlcyA9PSBudWxsIHx8IHRoaXMuY3VycmVudFBhZ2UgPCAwIHx8IHRoaXMuY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYWdlcy50b0FycmF5KClbdGhpcy5jdXJyZW50UGFnZV07XG4gIH1cblxuICBwcml2YXRlIF9jYWxjdWxhdGVNb3ZlbWVudChwb2ludDogUG9pbnQpOiBNb3ZlbWVudCB7XG4gICAgY29uc3QgZGVsdGFYID0gcG9pbnQueCAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLng7XG4gICAgY29uc3QgZGVsdGFZID0gcG9pbnQueSAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLnk7XG4gICAgY29uc3QgZGVsdGFUaW1lID0gcG9pbnQudGltZSAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLnRpbWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZlbG9jaXR5WDogZGVsdGFYIC8gZGVsdGFUaW1lLFxuICAgICAgZGVsdGFYLFxuICAgICAgdmVsb2NpdHlZOiBkZWx0YVkgLyBkZWx0YVRpbWUsXG4gICAgICBkZWx0YVksXG4gICAgICBkZWx0YVRpbWUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlQmFjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5fY3VycmVudFBhZ2UgLSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVGb3J3YXJkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5fY3VycmVudFBhZ2UgKyAxO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVUbyhwYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocGFnZSA+PSAwICYmIHBhZ2UgPCB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZG9TbGlkZShpbW1lZGlhdGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJvZHkgPT0gbnVsbCB8fCB0aGlzLnBhZ2VzID09IG51bGwgfHwgdGhpcy5fYW5pbWF0aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2FuaW1hdGluZyA9IHRydWU7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5fYW5pbWF0aW9uQnVpbGRlci5idWlsZChcbiAgICAgICAgYW5pbWF0ZShpbW1lZGlhdGUgPyAwIDogdGhpcy5kdXJhdGlvbiwgc3R5bGUoe3RyYW5zZm9ybTogdGhpcy5fZ2V0Q3VycmVudFRyYW5zbGF0aW9uKCl9KSkpO1xuXG4gICAgY29uc3QgcGxheWVyID0gYW5pbWF0aW9uLmNyZWF0ZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCk7XG4gICAgcGxheWVyLm9uRG9uZSgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2guZW1pdCgpO1xuICAgIH0pO1xuICAgIHBsYXllci5wbGF5KCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDdXJyZW50VHJhbnNsYXRpb24oKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZVNpemUgPSAxMDAgLyB0aGlzLnBhZ2VzLmxlbmd0aDtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuX2N1cnJlbnRQYWdlID09PSAtMSA/IDAgOiB0aGlzLl9jdXJyZW50UGFnZSAqIHNsaWRlU2l6ZTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ1knIDogJ1gnO1xuICAgIHJldHVybiBgdHJhbnNsYXRlJHt0cmFuc2xhdGlvbn0oLSR7cG9zaXRpb259JSlgO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJvcHMoKToge3Byb3A6IHN0cmluZywgcmVtb3ZlUHJvcDogc3RyaW5nfSB7XG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm4ge3Byb3A6ICdoZWlnaHQnLCByZW1vdmVQcm9wOiAnd2lkdGgnfTtcbiAgICB9XG4gICAgcmV0dXJuIHtwcm9wOiAnd2lkdGgnLCByZW1vdmVQcm9wOiAnaGVpZ2h0J307XG4gIH1cblxuICBwcml2YXRlIF9vblNsaWRlc0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJvZHkgPT0gbnVsbCB8fCB0aGlzLnBhZ2VzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qge3Byb3AsIHJlbW92ZVByb3B9ID0gdGhpcy5fZ2V0UHJvcHMoKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCwgcHJvcCwgYCR7dGhpcy5wYWdlcy5sZW5ndGggKiAxMDB9JWApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keS5uYXRpdmVFbGVtZW50LCByZW1vdmVQcm9wLCBudWxsKTtcbiAgICBsZXQgY3VyUGFnZTogbnVtYmVyO1xuICAgIGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY3VyUGFnZSA9IC0xO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFBhZ2UgPT09IC0xKSB7XG4gICAgICBjdXJQYWdlID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5wYWdlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5fY3VycmVudFBhZ2U7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VyUGFnZTtcbiAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc3RvcmVDdXJyZW50UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kb1NsaWRlKHRydWUpO1xuICB9XG59XG4iXX0=