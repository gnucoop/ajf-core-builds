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
import { animate, style } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ContentChildren, Directive, EventEmitter, Input, Output, ViewChild, } from '@angular/core';
import { Subscription } from 'rxjs';
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
        this._hideNavigationButtons = false;
        this._animating = false;
        this._pagesSub = Subscription.EMPTY;
        this._currentOrigin = null;
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
        this._currentOrigin = {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY,
            time: +new Date(),
        };
    }
    onTouchMove(evt) {
        if (evt.touches == null ||
            evt.touches.length === 0 ||
            this._currentOrigin == null ||
            this._animating) {
            return;
        }
        const point = {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY,
            time: +new Date(),
        };
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
AjfPageSlider.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPageSlider, deps: [{ token: i1.AnimationBuilder }, { token: i0.ChangeDetectorRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
AjfPageSlider.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfPageSlider, inputs: { duration: "duration", orientation: "orientation", fixedOrientation: "fixedOrientation", currentPage: "currentPage", hideNavigationButtons: "hideNavigationButtons" }, outputs: { pageScrollFinish: "pageScrollFinish", orientationChange: "orientationChange" }, queries: [{ propertyName: "pages", predicate: AjfPageSliderItem, descendants: true }], viewQueries: [{ propertyName: "body", first: true, predicate: ["body"], descendants: true, static: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfPageSlider, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL3BhZ2Utc2xpZGVyL3NyYy9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsT0FBTyxFQUFvQixLQUFLLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBR0wsZUFBZSxFQUNmLFNBQVMsRUFFVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFHTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFhLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsWUFBWSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFL0QsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7OztBQXlCckQsTUFBTSxPQUFPLGFBQWE7SUF3RXhCLFlBQ1UsaUJBQW1DLEVBQ25DLElBQXVCLEVBQ3ZCLFNBQW9CO1FBRnBCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFDbkMsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFDdkIsY0FBUyxHQUFULFNBQVMsQ0FBVztRQXRFdEIsc0JBQWlCLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7UUFFaEUscUJBQWdCLEdBQXFCLElBQUksQ0FBQyxpQkFBcUMsQ0FBQztRQUVqRix1QkFBa0IsR0FDeEIsSUFBSSxZQUFZLEVBQTRCLENBQUM7UUFFdEMsc0JBQWlCLEdBQXlDLElBQUk7YUFDcEUsa0JBQTBELENBQUM7UUFFckQsYUFBUSxHQUFHLEdBQUcsQ0FBQztRQUVoQixpQkFBWSxHQUE2QixZQUFZLENBQUM7UUFldEQs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QUs7Z0JBT0YsV0FBVztzQkFEZCxLQUFLO2dCQWdCRixnQkFBZ0I7c0JBRG5CLEtBQUs7Z0JBV0YsV0FBVztzQkFEZCxLQUFLO2dCQWNGLHFCQUFxQjtzQkFEeEIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHthbmltYXRlLCBBbmltYXRpb25CdWlsZGVyLCBzdHlsZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgUmVuZGVyZXIyLFxuICBWaWV3Q2hpbGQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgc2NhbiwgdGhyb3R0bGVUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlckl0ZW19IGZyb20gJy4vcGFnZS1zbGlkZXItaXRlbSc7XG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJTbGlkZU9wdGlvbnN9IGZyb20gJy4vcGFnZS1zbGlkZXItc2xpZGUtb3B0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG5cbmludGVyZmFjZSBQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB0aW1lOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBNb3ZlbWVudCB7XG4gIHZlbG9jaXR5WDogbnVtYmVyO1xuICB2ZWxvY2l0eVk6IG51bWJlcjtcbiAgZGVsdGFYOiBudW1iZXI7XG4gIGRlbHRhWTogbnVtYmVyO1xuICBkZWx0YVRpbWU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIE1vdXNoZVdoZWVsTW92ZSB7XG4gIGRpcjogJ3gnIHwgJ3knO1xuICBhbW91bnQ6IG51bWJlcjtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQWpmUGFnZVNsaWRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2JvZHknLCB7c3RhdGljOiB0cnVlfSkgYm9keSE6IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGRyZW4oQWpmUGFnZVNsaWRlckl0ZW0sIHtkZXNjZW5kYW50czogdHJ1ZX0pXG4gIHBhZ2VzITogUXVlcnlMaXN0PEFqZlBhZ2VTbGlkZXJJdGVtPjtcblxuICBwcml2YXRlIF9wYWdlU2Nyb2xsRmluaXNoOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBwYWdlU2Nyb2xsRmluaXNoOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fcGFnZVNjcm9sbEZpbmlzaCBhcyBPYnNlcnZhYmxlPHZvaWQ+O1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBvcmllbnRhdGlvbkNoYW5nZTogT2JzZXJ2YWJsZTxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID0gdGhpc1xuICAgIC5fb3JpZW50YXRpb25DaGFuZ2UgYXMgT2JzZXJ2YWJsZTxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+O1xuXG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMzAwO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gIGdldCBvcmllbnRhdGlvbigpOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgb3JpZW50YXRpb24ob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbikge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiAhPT0gb3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmVtaXQodGhpcy5fb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeGVkT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgZ2V0IGZpeGVkT3JpZW50YXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkT3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpeGVkT3JpZW50YXRpb24oZml4ZWRPcmllbnRhdGlvbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpeGVkT3JpZW50YXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZml4ZWRPcmllbnRhdGlvbik7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2UgPSAtMTtcbiAgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjdXJyZW50UGFnZShjdXJyZW50UGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCBjdXJyZW50UGFnZSA8IDAgfHwgY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcbiAgICB0aGlzLl9kb1NsaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoaG5iOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhuYik7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYW5pbWF0aW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX3BhZ2VzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfY3VycmVudE9yaWdpbjogUG9pbnQgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfbW91c2VXaGVlbEV2dDogRXZlbnRFbWl0dGVyPE1vdXNoZVdoZWVsTW92ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNoZVdoZWVsTW92ZT4oKTtcbiAgcHJpdmF0ZSBfbW91c2VXaGVlbFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2FuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICApIHtcbiAgICB0aGlzLl9tb3VzZVdoZWVsU3ViID0gdGhpcy5fbW91c2VXaGVlbEV2dFxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChldnQgPT4ge1xuICAgICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICAgIGlmIChwYWdlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4ge2V2dCwgcmVzOiBwYWdlLnNldFNjcm9sbChldnQuZGlyLCBldnQuYW1vdW50LCAwKX07XG4gICAgICAgIH0pLFxuICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgciA9PlxuICAgICAgICAgICAgciAhPSBudWxsICYmXG4gICAgICAgICAgICByLnJlcyA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgICgoci5ldnQuZGlyID09PSAneCcgJiYgdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB8fFxuICAgICAgICAgICAgICAoci5ldnQuZGlyID09PSAneScgJiYgdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykpLFxuICAgICAgICApLFxuICAgICAgICBtYXAociA9PiByIS5ldnQuYW1vdW50KSxcbiAgICAgICAgc2NhbigoYWNjLCB2YWwpID0+IHtcbiAgICAgICAgICBpZiAoYWNjID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYWNjIC8gTWF0aC5hYnMoYWNjKSAhPT0gdmFsIC8gTWF0aC5hYnModmFsKSkge1xuICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBhY2MgKyB2YWw7XG4gICAgICAgIH0sIDApLFxuICAgICAgICBmaWx0ZXIodmFsID0+ICF0aGlzLl9hbmltYXRpbmcgJiYgTWF0aC5hYnModmFsKSA+IDE1MCksXG4gICAgICAgIHRocm90dGxlVGltZSgxNTAwKSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd4JywgYW1vdW50OiB2YWwgPiAwID8gLTEgOiArMX0pO1xuICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IHZhbCA+IDAgPyAnYmFjaycgOiAnZm9yd2FyZCd9KTtcbiAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX29uU2xpZGVzQ2hhbmdlKCk7XG4gICAgdGhpcy5fcGFnZXNTdWIgPSB0aGlzLnBhZ2VzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uU2xpZGVzQ2hhbmdlKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcGFnZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fbW91c2VXaGVlbFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzd2l0Y2hPcmllbnRhdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuICB9XG5cbiAgc2xpZGUob3B0czogQWpmUGFnZVNsaWRlclNsaWRlT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2VzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdHMuZGlyKSB7XG4gICAgICBpZiAob3B0cy5kaXIgPT09ICdiYWNrJyB8fCBvcHRzLmRpciA9PT0gJ3VwJyB8fCBvcHRzLmRpciA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHRoaXMuX3NsaWRlQmFjaygpO1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmRpciA9PT0gJ2ZvcndhcmQnIHx8IG9wdHMuZGlyID09PSAnZG93bicgfHwgb3B0cy5kaXIgPT09ICdyaWdodCcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVGb3J3YXJkKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRzLnRvICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3NsaWRlVG8ob3B0cy50byk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVdoZWVsKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGV2dCA9IGV2ZW50IGFzIFdoZWVsRXZlbnQ7XG4gICAgaWYgKGV2dC5kZWx0YVggPT0gbnVsbCB8fCBldnQuZGVsdGFZID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYWJzRGVsdGFYID0gTWF0aC5hYnMoZXZ0LmRlbHRhWCk7XG4gICAgY29uc3QgYWJzRGVsdGFZID0gTWF0aC5hYnMoZXZ0LmRlbHRhWSk7XG4gICAgaWYgKGFic0RlbHRhWCA9PT0gMCAmJiBhYnNEZWx0YVkgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFic0RlbHRhWCA+IGFic0RlbHRhWSkge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd4JywgYW1vdW50OiAtZXZ0LmRlbHRhWH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3knLCBhbW91bnQ6IC1ldnQuZGVsdGFZfSk7XG4gICAgfVxuICB9XG5cbiAgb25Ub3VjaFN0YXJ0KGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQudG91Y2hlcyA9PSBudWxsIHx8IGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLl9hbmltYXRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IHtcbiAgICAgIHg6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICB5OiBldnQudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgdGltZTogK25ldyBEYXRlKCksXG4gICAgfTtcbiAgfVxuXG4gIG9uVG91Y2hNb3ZlKGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGV2dC50b3VjaGVzID09IG51bGwgfHxcbiAgICAgIGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMCB8fFxuICAgICAgdGhpcy5fY3VycmVudE9yaWdpbiA9PSBudWxsIHx8XG4gICAgICB0aGlzLl9hbmltYXRpbmdcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcG9pbnQ6IFBvaW50ID0ge1xuICAgICAgeDogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIHk6IGV2dC50b3VjaGVzWzBdLmNsaWVudFksXG4gICAgICB0aW1lOiArbmV3IERhdGUoKSxcbiAgICB9O1xuICAgIGNvbnN0IG1vdmVtZW50ID0gdGhpcy5fY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQpO1xuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSBwb2ludDtcblxuICAgIGlmIChtb3ZlbWVudC52ZWxvY2l0eVggPT09IDAgJiYgbW92ZW1lbnQudmVsb2NpdHlZID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFic1ZlbG9jaXR5WCA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WCk7XG4gICAgY29uc3QgYWJzVmVsb2NpdHlZID0gTWF0aC5hYnMobW92ZW1lbnQudmVsb2NpdHlZKTtcbiAgICBpZiAoYWJzVmVsb2NpdHlYID4gYWJzVmVsb2NpdHlZKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyAmJlxuICAgICAgICBhYnNWZWxvY2l0eVggPiAxLjUgJiZcbiAgICAgICAgTWF0aC5hYnMobW92ZW1lbnQuZGVsdGFYKSA+IDUwXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogbW92ZW1lbnQudmVsb2NpdHlYIDwgMCA/ICdmb3J3YXJkJyA6ICdiYWNrJ30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlICE9IG51bGwpIHtcbiAgICAgICAgICBwYWdlLnNldFNjcm9sbCgneCcsIG1vdmVtZW50LmRlbHRhWCwgbW92ZW1lbnQuZGVsdGFUaW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiBhYnNWZWxvY2l0eVkgPiAxLjUgJiYgTWF0aC5hYnMobW92ZW1lbnQuZGVsdGFZKSA+IDUwKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IG1vdmVtZW50LnZlbG9jaXR5WSA8IDAgPyAnZm9yd2FyZCcgOiAnYmFjayd9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgcGFnZS5zZXRTY3JvbGwoJ3knLCBtb3ZlbWVudC5kZWx0YVksIG1vdmVtZW50LmRlbHRhVGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblRvdWNoRW5kKCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICB9XG5cbiAgaXNDdXJyZW50UGFnZUxvbmcoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY3VyUGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgaWYgKGN1clBhZ2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gY3VyUGFnZS53cmFwcGVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0ID4gY3VyUGFnZS5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRDdXJyZW50T3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFBhZ2UoKTogQWpmUGFnZVNsaWRlckl0ZW0gfCBudWxsIHtcbiAgICBpZiAodGhpcy5wYWdlcyA9PSBudWxsIHx8IHRoaXMuY3VycmVudFBhZ2UgPCAwIHx8IHRoaXMuY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYWdlcy50b0FycmF5KClbdGhpcy5jdXJyZW50UGFnZV07XG4gIH1cblxuICBwcml2YXRlIF9jYWxjdWxhdGVNb3ZlbWVudChwb2ludDogUG9pbnQpOiBNb3ZlbWVudCB7XG4gICAgY29uc3QgZGVsdGFYID0gcG9pbnQueCAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLng7XG4gICAgY29uc3QgZGVsdGFZID0gcG9pbnQueSAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLnk7XG4gICAgY29uc3QgZGVsdGFUaW1lID0gcG9pbnQudGltZSAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLnRpbWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZlbG9jaXR5WDogZGVsdGFYIC8gZGVsdGFUaW1lLFxuICAgICAgZGVsdGFYLFxuICAgICAgdmVsb2NpdHlZOiBkZWx0YVkgLyBkZWx0YVRpbWUsXG4gICAgICBkZWx0YVksXG4gICAgICBkZWx0YVRpbWUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlQmFjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5fY3VycmVudFBhZ2UgLSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVGb3J3YXJkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5fY3VycmVudFBhZ2UgKyAxO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVUbyhwYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocGFnZSA+PSAwICYmIHBhZ2UgPCB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZG9TbGlkZShpbW1lZGlhdGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJvZHkgPT0gbnVsbCB8fCB0aGlzLnBhZ2VzID09IG51bGwgfHwgdGhpcy5fYW5pbWF0aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2FuaW1hdGluZyA9IHRydWU7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5fYW5pbWF0aW9uQnVpbGRlci5idWlsZChcbiAgICAgIGFuaW1hdGUoaW1tZWRpYXRlID8gMCA6IHRoaXMuZHVyYXRpb24sIHN0eWxlKHt0cmFuc2Zvcm06IHRoaXMuX2dldEN1cnJlbnRUcmFuc2xhdGlvbigpfSkpLFxuICAgICk7XG5cbiAgICBjb25zdCBwbGF5ZXIgPSBhbmltYXRpb24uY3JlYXRlKHRoaXMuYm9keS5uYXRpdmVFbGVtZW50KTtcbiAgICBwbGF5ZXIub25Eb25lKCgpID0+IHtcbiAgICAgIHRoaXMuX2FuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fcGFnZVNjcm9sbEZpbmlzaC5lbWl0KCk7XG4gICAgfSk7XG4gICAgcGxheWVyLnBsYXkoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEN1cnJlbnRUcmFuc2xhdGlvbigpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNsaWRlU2l6ZSA9IDEwMCAvIHRoaXMucGFnZXMubGVuZ3RoO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5fY3VycmVudFBhZ2UgPT09IC0xID8gMCA6IHRoaXMuX2N1cnJlbnRQYWdlICogc2xpZGVTaXplO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdGhpcy5fb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgPyAnWScgOiAnWCc7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUke3RyYW5zbGF0aW9ufSgtJHtwb3NpdGlvbn0lKWA7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQcm9wcygpOiB7cHJvcDogc3RyaW5nOyByZW1vdmVQcm9wOiBzdHJpbmd9IHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHJldHVybiB7cHJvcDogJ2hlaWdodCcsIHJlbW92ZVByb3A6ICd3aWR0aCd9O1xuICAgIH1cbiAgICByZXR1cm4ge3Byb3A6ICd3aWR0aCcsIHJlbW92ZVByb3A6ICdoZWlnaHQnfTtcbiAgfVxuXG4gIHByaXZhdGUgX29uU2xpZGVzQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVNpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYm9keSA9PSBudWxsIHx8IHRoaXMucGFnZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCB7cHJvcCwgcmVtb3ZlUHJvcH0gPSB0aGlzLl9nZXRQcm9wcygpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keS5uYXRpdmVFbGVtZW50LCBwcm9wLCBgJHt0aGlzLnBhZ2VzLmxlbmd0aCAqIDEwMH0lYCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQsIHJlbW92ZVByb3AsIG51bGwpO1xuICAgIGxldCBjdXJQYWdlOiBudW1iZXI7XG4gICAgaWYgKHRoaXMucGFnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjdXJQYWdlID0gLTE7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50UGFnZSA9PT0gLTEpIHtcbiAgICAgIGN1clBhZ2UgPSAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIGN1clBhZ2UgPSB0aGlzLnBhZ2VzLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1clBhZ2UgPSB0aGlzLl9jdXJyZW50UGFnZTtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBjdXJQYWdlO1xuICAgIHRoaXMuX3Jlc3RvcmVDdXJyZW50UGFnZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzdG9yZUN1cnJlbnRQYWdlKCk6IHZvaWQge1xuICAgIHRoaXMuX2RvU2xpZGUodHJ1ZSk7XG4gIH1cbn1cbiJdfQ==