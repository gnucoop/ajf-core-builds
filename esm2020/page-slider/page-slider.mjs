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
import { ChangeDetectorRef, ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild, } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map, scan, throttleTime } from 'rxjs/operators';
import { AjfPageSliderItem } from './page-slider-item';
import * as i0 from "@angular/core";
import * as i1 from "@angular/animations";
export class AjfPageSlider {
    constructor(_animationBuilder, _cdr, _renderer) {
        this._animationBuilder = _animationBuilder;
        this._cdr = _cdr;
        this._renderer = _renderer;
        this._pageScrollFinish = new EventEmitter();
        this.pageScrollFinish = this._pageScrollFinish;
        this._orientationChange = new EventEmitter();
        this.orientationChange = this
            ._orientationChange;
        this.duration = 300;
        this._orientation = 'horizontal';
        this._fixedOrientation = false;
        this._currentPage = -1;
        this._animating = false;
        this._pagesSub = Subscription.EMPTY;
        this._mouseWheelEvt = new EventEmitter();
        this._mouseWheelSub = Subscription.EMPTY;
        this._mouseWheelSub = this._mouseWheelEvt
            .pipe(map(evt => {
            const page = this._getCurrentPage();
            if (page == null) {
                return null;
            }
            return { evt, res: page.setScroll(evt.dir, evt.amount, 0) };
        }), filter(r => r != null &&
            r.res === false &&
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
        else if (opts.to != null) {
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
        if (evt.touches == null ||
            evt.touches.length === 0 ||
            this._currentOrigin == null ||
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
            if (this.orientation === 'horizontal' &&
                absVelocityX > 1.5 &&
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
AjfPageSlider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfPageSlider, deps: [{ token: i1.AnimationBuilder }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
AjfPageSlider.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: AjfPageSlider, inputs: { duration: "duration", orientation: "orientation", fixedOrientation: "fixedOrientation", currentPage: "currentPage", hideNavigationButtons: "hideNavigationButtons" }, outputs: { pageScrollFinish: "pageScrollFinish", orientationChange: "orientationChange" }, queries: [{ propertyName: "pages", predicate: AjfPageSliderItem, descendants: true }], viewQueries: [{ propertyName: "body", first: true, predicate: ["body"], descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfPageSlider, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.AnimationBuilder }, { type: i0.ChangeDetectorRef }, { type: i0.Renderer2 }]; }, propDecorators: { body: [{
                type: ViewChild,
                args: ['body', { static: true }]
            }], pages: [{
                type: ContentChildren,
                args: [AjfPageSliderItem, { descendants: true }]
            }], pageScrollFinish: [{
                type: Output
            }], orientationChange: [{
                type: Output
            }], duration: [{
                type: Input
            }], orientation: [{
                type: Input
            }], fixedOrientation: [{
                type: Input
            }], currentPage: [{
                type: Input
            }], hideNavigationButtons: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7QUF5QnJELE1BQU0sT0FBTyxhQUFhO0lBdUV4QixZQUNVLGlCQUFtQyxFQUNuQyxJQUF1QixFQUN2QixTQUFvQjtRQUZwQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUF0RXRCLHNCQUFpQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBRWhFLHFCQUFnQixHQUFxQixJQUFJLENBQUMsaUJBQXFDLENBQUM7UUFFakYsdUJBQWtCLEdBQ3hCLElBQUksWUFBWSxFQUE0QixDQUFDO1FBRXRDLHNCQUFpQixHQUF5QyxJQUFJO2FBQ3BFLGtCQUEwRCxDQUFD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QUFLO2dCQU9GLFdBQVc7c0JBRGQsS0FBSztnQkFnQkYsZ0JBQWdCO3NCQURuQixLQUFLO2dCQVdGLFdBQVc7c0JBRGQsS0FBSztnQkFjRixxQkFBcUI7c0JBRHhCLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7YW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgc3R5bGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNjYW4sIHRocm90dGxlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJJdGVtfSBmcm9tICcuL3BhZ2Utc2xpZGVyLWl0ZW0nO1xuaW1wb3J0IHtBamZQYWdlU2xpZGVyU2xpZGVPcHRpb25zfSBmcm9tICcuL3BhZ2Utc2xpZGVyLXNsaWRlLW9wdGlvbnMnO1xuXG5leHBvcnQgdHlwZSBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuXG5pbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgdGltZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTW92ZW1lbnQge1xuICB2ZWxvY2l0eVg6IG51bWJlcjtcbiAgdmVsb2NpdHlZOiBudW1iZXI7XG4gIGRlbHRhWDogbnVtYmVyO1xuICBkZWx0YVk6IG51bWJlcjtcbiAgZGVsdGFUaW1lOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBNb3VzaGVXaGVlbE1vdmUge1xuICBkaXI6ICd4JyB8ICd5JztcbiAgYW1vdW50OiBudW1iZXI7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEFqZlBhZ2VTbGlkZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdib2R5Jywge3N0YXRpYzogdHJ1ZX0pIGJvZHk6IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGRyZW4oQWpmUGFnZVNsaWRlckl0ZW0sIHtkZXNjZW5kYW50czogdHJ1ZX0pIHBhZ2VzOiBRdWVyeUxpc3Q8QWpmUGFnZVNsaWRlckl0ZW0+O1xuXG4gIHByaXZhdGUgX3BhZ2VTY3JvbGxGaW5pc2g6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHBhZ2VTY3JvbGxGaW5pc2g6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9wYWdlU2Nyb2xsRmluaXNoIGFzIE9ic2VydmFibGU8dm9pZD47XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IG9yaWVudGF0aW9uQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPSB0aGlzXG4gICAgLl9vcmllbnRhdGlvbkNoYW5nZSBhcyBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj47XG5cbiAgQElucHV0KCkgZHVyYXRpb24gPSAzMDA7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgZ2V0IG9yaWVudGF0aW9uKCk6IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBvcmllbnRhdGlvbihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKSB7XG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uICE9PSBvcmllbnRhdGlvbikge1xuICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgIHRoaXMuX3Jlc3RvcmVDdXJyZW50UGFnZSgpO1xuICAgICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuZW1pdCh0aGlzLl9vcmllbnRhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4ZWRPcmllbnRhdGlvbiA9IGZhbHNlO1xuICBnZXQgZml4ZWRPcmllbnRhdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZml4ZWRPcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZml4ZWRPcmllbnRhdGlvbihmaXhlZE9yaWVudGF0aW9uOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZml4ZWRPcmllbnRhdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShmaXhlZE9yaWVudGF0aW9uKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50UGFnZSA9IC0xO1xuICBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGN1cnJlbnRQYWdlKGN1cnJlbnRQYWdlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5wYWdlcyA9PSBudWxsIHx8IGN1cnJlbnRQYWdlIDwgMCB8fCBjdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlO1xuICAgIHRoaXMuX2RvU2xpZGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVOYXZpZ2F0aW9uQnV0dG9uczogYm9vbGVhbjtcbiAgZ2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoaG5iOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhuYik7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYW5pbWF0aW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX3BhZ2VzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfY3VycmVudE9yaWdpbjogUG9pbnQgfCBudWxsO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsRXZ0OiBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPigpO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uQnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIsXG4gICkge1xuICAgIHRoaXMuX21vdXNlV2hlZWxTdWIgPSB0aGlzLl9tb3VzZVdoZWVsRXZ0XG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKGV2dCA9PiB7XG4gICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB7ZXZ0LCByZXM6IHBhZ2Uuc2V0U2Nyb2xsKGV2dC5kaXIsIGV2dC5hbW91bnQsIDApfTtcbiAgICAgICAgfSksXG4gICAgICAgIGZpbHRlcihcbiAgICAgICAgICByID0+XG4gICAgICAgICAgICByICE9IG51bGwgJiZcbiAgICAgICAgICAgIHIucmVzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgKChyLmV2dC5kaXIgPT09ICd4JyAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHx8XG4gICAgICAgICAgICAgIChyLmV2dC5kaXIgPT09ICd5JyAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKSksXG4gICAgICAgICksXG4gICAgICAgIG1hcChyID0+IHIhLmV2dC5hbW91bnQpLFxuICAgICAgICBzY2FuKChhY2MsIHZhbCkgPT4ge1xuICAgICAgICAgIGlmIChhY2MgPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiB2YWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhY2MgLyBNYXRoLmFicyhhY2MpICE9PSB2YWwgLyBNYXRoLmFicyh2YWwpKSB7XG4gICAgICAgICAgICByZXR1cm4gMDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGFjYyArIHZhbDtcbiAgICAgICAgfSwgMCksXG4gICAgICAgIGZpbHRlcih2YWwgPT4gIXRoaXMuX2FuaW1hdGluZyAmJiBNYXRoLmFicyh2YWwpID4gMTUwKSxcbiAgICAgICAgdGhyb3R0bGVUaW1lKDE1MDApLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3gnLCBhbW91bnQ6IHZhbCA+IDAgPyAtMSA6ICsxfSk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogdmFsID4gMCA/ICdiYWNrJyA6ICdmb3J3YXJkJ30pO1xuICAgICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25TbGlkZXNDaGFuZ2UoKTtcbiAgICB0aGlzLl9wYWdlc1N1YiA9IHRoaXMucGFnZXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25TbGlkZXNDaGFuZ2UoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYWdlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9tb3VzZVdoZWVsU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIHN3aXRjaE9yaWVudGF0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICB9XG4gIH1cblxuICBzbGlkZShvcHRzOiBBamZQYWdlU2xpZGVyU2xpZGVPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3B0cy5kaXIpIHtcbiAgICAgIGlmIChvcHRzLmRpciA9PT0gJ2JhY2snIHx8IG9wdHMuZGlyID09PSAndXAnIHx8IG9wdHMuZGlyID09PSAnbGVmdCcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVCYWNrKCk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZGlyID09PSAnZm9yd2FyZCcgfHwgb3B0cy5kaXIgPT09ICdkb3duJyB8fCBvcHRzLmRpciA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICB0aGlzLl9zbGlkZUZvcndhcmQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdHMudG8gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2xpZGVUbyhvcHRzLnRvKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlV2hlZWwoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZXZ0ID0gZXZlbnQgYXMgV2hlZWxFdmVudDtcbiAgICBpZiAoZXZ0LmRlbHRhWCA9PSBudWxsIHx8IGV2dC5kZWx0YVkgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhYnNEZWx0YVggPSBNYXRoLmFicyhldnQuZGVsdGFYKTtcbiAgICBjb25zdCBhYnNEZWx0YVkgPSBNYXRoLmFicyhldnQuZGVsdGFZKTtcbiAgICBpZiAoYWJzRGVsdGFYID09PSAwICYmIGFic0RlbHRhWSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoYWJzRGVsdGFYID4gYWJzRGVsdGFZKSB7XG4gICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3gnLCBhbW91bnQ6IC1ldnQuZGVsdGFYfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuZW1pdCh7ZGlyOiAneScsIGFtb3VudDogLWV2dC5kZWx0YVl9KTtcbiAgICB9XG4gIH1cblxuICBvblRvdWNoU3RhcnQoZXZ0OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2dC50b3VjaGVzID09IG51bGwgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoID09PSAwIHx8IHRoaXMuX2FuaW1hdGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0ge3g6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsIHk6IGV2dC50b3VjaGVzWzBdLmNsaWVudFksIHRpbWU6ICtuZXcgRGF0ZSgpfTtcbiAgfVxuXG4gIG9uVG91Y2hNb3ZlKGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGV2dC50b3VjaGVzID09IG51bGwgfHxcbiAgICAgIGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgdGhpcy5fY3VycmVudE9yaWdpbiA9PSBudWxsIHx8XG4gICAgICB0aGlzLl9hbmltYXRpbmdcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcG9pbnQ6IFBvaW50ID0ge3g6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsIHk6IGV2dC50b3VjaGVzWzBdLmNsaWVudFksIHRpbWU6ICtuZXcgRGF0ZSgpfTtcbiAgICBjb25zdCBtb3ZlbWVudCA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVtZW50KHBvaW50KTtcbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0gcG9pbnQ7XG5cbiAgICBpZiAobW92ZW1lbnQudmVsb2NpdHlYID09PSAwICYmIG1vdmVtZW50LnZlbG9jaXR5WSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhYnNWZWxvY2l0eVggPSBNYXRoLmFicyhtb3ZlbWVudC52ZWxvY2l0eVgpO1xuICAgIGNvbnN0IGFic1ZlbG9jaXR5WSA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WSk7XG4gICAgaWYgKGFic1ZlbG9jaXR5WCA+IGFic1ZlbG9jaXR5WSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgJiZcbiAgICAgICAgYWJzVmVsb2NpdHlYID4gMS41ICYmXG4gICAgICAgIE1hdGguYWJzKG1vdmVtZW50LmRlbHRhWCkgPiA1MFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IG1vdmVtZW50LnZlbG9jaXR5WCA8IDAgPyAnZm9yd2FyZCcgOiAnYmFjayd9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgcGFnZS5zZXRTY3JvbGwoJ3gnLCBtb3ZlbWVudC5kZWx0YVgsIG1vdmVtZW50LmRlbHRhVGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgJiYgYWJzVmVsb2NpdHlZID4gMS41ICYmIE1hdGguYWJzKG1vdmVtZW50LmRlbHRhWSkgPiA1MCkge1xuICAgICAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgICAgICAgdGhpcy5zbGlkZSh7ZGlyOiBtb3ZlbWVudC52ZWxvY2l0eVkgPCAwID8gJ2ZvcndhcmQnIDogJ2JhY2snfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgIHBhZ2Uuc2V0U2Nyb2xsKCd5JywgbW92ZW1lbnQuZGVsdGFZLCBtb3ZlbWVudC5kZWx0YVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Ub3VjaEVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgfVxuXG4gIGlzQ3VycmVudFBhZ2VMb25nKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGN1clBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgIGlmIChjdXJQYWdlID09IG51bGwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGN1clBhZ2Uud3JhcHBlci5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCA+IGN1clBhZ2UuY29udGVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0Q3VycmVudE9yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEN1cnJlbnRQYWdlKCk6IEFqZlBhZ2VTbGlkZXJJdGVtIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCB0aGlzLmN1cnJlbnRQYWdlIDwgMCB8fCB0aGlzLmN1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFnZXMudG9BcnJheSgpW3RoaXMuY3VycmVudFBhZ2VdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQ6IFBvaW50KTogTW92ZW1lbnQge1xuICAgIGNvbnN0IGRlbHRhWCA9IHBvaW50LnggLSB0aGlzLl9jdXJyZW50T3JpZ2luIS54O1xuICAgIGNvbnN0IGRlbHRhWSA9IHBvaW50LnkgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS55O1xuICAgIGNvbnN0IGRlbHRhVGltZSA9IHBvaW50LnRpbWUgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS50aW1lO1xuICAgIHJldHVybiB7XG4gICAgICB2ZWxvY2l0eVg6IGRlbHRhWCAvIGRlbHRhVGltZSxcbiAgICAgIGRlbHRhWCxcbiAgICAgIHZlbG9jaXR5WTogZGVsdGFZIC8gZGVsdGFUaW1lLFxuICAgICAgZGVsdGFZLFxuICAgICAgZGVsdGFUaW1lLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZUJhY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQYWdlIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlRm9yd2FyZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlICsgMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlVG8ocGFnZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHBhZ2UgPj0gMCAmJiBwYWdlIDwgdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RvU2xpZGUoaW1tZWRpYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsIHx8IHRoaXMuX2FuaW1hdGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9hbmltYXRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuX2FuaW1hdGlvbkJ1aWxkZXIuYnVpbGQoXG4gICAgICBhbmltYXRlKGltbWVkaWF0ZSA/IDAgOiB0aGlzLmR1cmF0aW9uLCBzdHlsZSh7dHJhbnNmb3JtOiB0aGlzLl9nZXRDdXJyZW50VHJhbnNsYXRpb24oKX0pKSxcbiAgICApO1xuXG4gICAgY29uc3QgcGxheWVyID0gYW5pbWF0aW9uLmNyZWF0ZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCk7XG4gICAgcGxheWVyLm9uRG9uZSgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2guZW1pdCgpO1xuICAgIH0pO1xuICAgIHBsYXllci5wbGF5KCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDdXJyZW50VHJhbnNsYXRpb24oKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZVNpemUgPSAxMDAgLyB0aGlzLnBhZ2VzLmxlbmd0aDtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuX2N1cnJlbnRQYWdlID09PSAtMSA/IDAgOiB0aGlzLl9jdXJyZW50UGFnZSAqIHNsaWRlU2l6ZTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ1knIDogJ1gnO1xuICAgIHJldHVybiBgdHJhbnNsYXRlJHt0cmFuc2xhdGlvbn0oLSR7cG9zaXRpb259JSlgO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJvcHMoKToge3Byb3A6IHN0cmluZzsgcmVtb3ZlUHJvcDogc3RyaW5nfSB7XG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm4ge3Byb3A6ICdoZWlnaHQnLCByZW1vdmVQcm9wOiAnd2lkdGgnfTtcbiAgICB9XG4gICAgcmV0dXJuIHtwcm9wOiAnd2lkdGgnLCByZW1vdmVQcm9wOiAnaGVpZ2h0J307XG4gIH1cblxuICBwcml2YXRlIF9vblNsaWRlc0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJvZHkgPT0gbnVsbCB8fCB0aGlzLnBhZ2VzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qge3Byb3AsIHJlbW92ZVByb3B9ID0gdGhpcy5fZ2V0UHJvcHMoKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCwgcHJvcCwgYCR7dGhpcy5wYWdlcy5sZW5ndGggKiAxMDB9JWApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keS5uYXRpdmVFbGVtZW50LCByZW1vdmVQcm9wLCBudWxsKTtcbiAgICBsZXQgY3VyUGFnZTogbnVtYmVyO1xuICAgIGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY3VyUGFnZSA9IC0xO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFBhZ2UgPT09IC0xKSB7XG4gICAgICBjdXJQYWdlID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5wYWdlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5fY3VycmVudFBhZ2U7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VyUGFnZTtcbiAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc3RvcmVDdXJyZW50UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kb1NsaWRlKHRydWUpO1xuICB9XG59XG4iXX0=