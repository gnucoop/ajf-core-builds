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
import { animate, AnimationBuilder, style } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map, scan, throttleTime } from 'rxjs/operators';
import { AjfPageSliderItem } from './page-slider-item';
let AjfPageSlider = /** @class */ (() => {
    let AjfPageSlider = class AjfPageSlider {
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
    };
    __decorate([
        ViewChild('body', { static: true }),
        __metadata("design:type", ElementRef)
    ], AjfPageSlider.prototype, "body", void 0);
    __decorate([
        ContentChildren(AjfPageSliderItem, { descendants: true }),
        __metadata("design:type", QueryList)
    ], AjfPageSlider.prototype, "pages", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Observable)
    ], AjfPageSlider.prototype, "pageScrollFinish", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Observable)
    ], AjfPageSlider.prototype, "orientationChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AjfPageSlider.prototype, "duration", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfPageSlider.prototype, "orientation", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfPageSlider.prototype, "fixedOrientation", null);
    __decorate([
        Input(),
        __metadata("design:type", Number),
        __metadata("design:paramtypes", [Number])
    ], AjfPageSlider.prototype, "currentPage", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfPageSlider.prototype, "hideNavigationButtons", null);
    AjfPageSlider = __decorate([
        Directive(),
        __metadata("design:paramtypes", [AnimationBuilder, ChangeDetectorRef,
            Renderer2])
    ], AjfPageSlider);
    return AjfPageSlider;
})();
export { AjfPageSlider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxLQUFLLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNyRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQXlCckQ7SUFBQSxJQUFhLGFBQWEsR0FBMUIsTUFBYSxhQUFhO1FBc0V4QixZQUNZLGlCQUFtQyxFQUFVLElBQXVCLEVBQ3BFLFNBQW9CO1lBRHBCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7WUFBVSxTQUFJLEdBQUosSUFBSSxDQUFtQjtZQUNwRSxjQUFTLEdBQVQsU0FBUyxDQUFXO1lBcEV4QixzQkFBaUIsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztZQUN0RCxxQkFBZ0IsR0FBcUIsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFlBQVksRUFBRSxDQUFDO1lBRXRGLHVCQUFrQixHQUN0QixJQUFJLFlBQVksRUFBNEIsQ0FBQztZQUV4QyxzQkFBaUIs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Z0RBQW9CO0lBR25GO1FBQVQsTUFBTSxFQUFFO2tDQUE0QixVQUFVOzJEQUErQztJQUs5RjtRQURDLE1BQU0sRUFBRTtrQ0FDbUIsVUFBVTs0REFDSztJQUVsQztRQUFSLEtBQUssRUFBRTs7bURBQWdCO0lBT3hCO1FBREMsS0FBSyxFQUFFOzs7b0RBU1A7SUFPRDtRQURDLEtBQUssRUFBRTs7O3lEQUlQO0lBT0Q7UUFEQyxLQUFLLEVBQUU7OztvREFPUDtJQU9EO1FBREMsS0FBSyxFQUFFOzs7OERBSVA7SUE3RFUsYUFBYTtRQUR6QixTQUFTLEVBQUU7eUNBd0VxQixnQkFBZ0IsRUFBZ0IsaUJBQWlCO1lBQ3pELFNBQVM7T0F4RXJCLGFBQWEsQ0ErVHpCO0lBQUQsb0JBQUM7S0FBQTtTQS9UWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2FuaW1hdGUsIEFuaW1hdGlvbkJ1aWxkZXIsIHN0eWxlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNjYW4sIHRocm90dGxlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJJdGVtfSBmcm9tICcuL3BhZ2Utc2xpZGVyLWl0ZW0nO1xuaW1wb3J0IHtBamZQYWdlU2xpZGVyU2xpZGVPcHRpb25zfSBmcm9tICcuL3BhZ2Utc2xpZGVyLXNsaWRlLW9wdGlvbnMnO1xuXG5leHBvcnQgdHlwZSBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCd8J3ZlcnRpY2FsJztcblxuaW50ZXJmYWNlIFBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHRpbWU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIE1vdmVtZW50IHtcbiAgdmVsb2NpdHlYOiBudW1iZXI7XG4gIHZlbG9jaXR5WTogbnVtYmVyO1xuICBkZWx0YVg6IG51bWJlcjtcbiAgZGVsdGFZOiBudW1iZXI7XG4gIGRlbHRhVGltZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTW91c2hlV2hlZWxNb3ZlIHtcbiAgZGlyOiAneCd8J3knO1xuICBhbW91bnQ6IG51bWJlcjtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQWpmUGFnZVNsaWRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2JvZHknLCB7c3RhdGljOiB0cnVlfSkgYm9keTogRWxlbWVudFJlZjtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZQYWdlU2xpZGVySXRlbSwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgcGFnZXM6IFF1ZXJ5TGlzdDxBamZQYWdlU2xpZGVySXRlbT47XG5cbiAgcHJpdmF0ZSBfcGFnZVNjcm9sbEZpbmlzaDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcGFnZVNjcm9sbEZpbmlzaDogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2guYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgb3JpZW50YXRpb25DaGFuZ2U6IE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBASW5wdXQoKSBkdXJhdGlvbiA9IDMwMDtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICBnZXQgb3JpZW50YXRpb24oKTogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pIHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gIT09IG9yaWVudGF0aW9uKSB7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgdGhpcy5fcmVzdG9yZUN1cnJlbnRQYWdlKCk7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5lbWl0KHRoaXMuX29yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhlZE9yaWVudGF0aW9uID0gZmFsc2U7XG4gIGdldCBmaXhlZE9yaWVudGF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZE9yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaXhlZE9yaWVudGF0aW9uKGZpeGVkT3JpZW50YXRpb246IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXhlZE9yaWVudGF0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGZpeGVkT3JpZW50YXRpb24pO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2N1cnJlbnRQYWdlID0gLTE7XG4gIGdldCBjdXJyZW50UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY3VycmVudFBhZ2UoY3VycmVudFBhZ2U6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnBhZ2VzID09IG51bGwgfHwgY3VycmVudFBhZ2UgPCAwIHx8IGN1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VycmVudFBhZ2U7XG4gICAgdGhpcy5fZG9TbGlkZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZU5hdmlnYXRpb25CdXR0b25zOiBib29sZWFuO1xuICBnZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyhobmI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaG5iKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcGFnZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9jdXJyZW50T3JpZ2luOiBQb2ludHxudWxsO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsRXZ0OiBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPigpO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9hbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLCBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX21vdXNlV2hlZWxTdWIgPVxuICAgICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0XG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiB7ZXZ0LCByZXM6IHBhZ2Uuc2V0U2Nyb2xsKGV2dC5kaXIsIGV2dC5hbW91bnQsIDApfTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIHIgPT4gciAhPSBudWxsICYmIHIucmVzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKChyLmV2dC5kaXIgPT09ICd4JyAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHIuZXZ0LmRpciA9PT0gJ3knICYmIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpKSksXG4gICAgICAgICAgICAgICAgbWFwKHIgPT4gciEuZXZ0LmFtb3VudCksXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKGFjYywgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGFjYyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGFjYyAvIE1hdGguYWJzKGFjYykgIT09IHZhbCAvIE1hdGguYWJzKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjICsgdmFsO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAwKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXIodmFsID0+ICF0aGlzLl9hbmltYXRpbmcgJiYgTWF0aC5hYnModmFsKSA+IDE1MCksXG4gICAgICAgICAgICAgICAgdGhyb3R0bGVUaW1lKDE1MDApLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd4JywgYW1vdW50OiB2YWwgPiAwID8gLTEgOiArMX0pO1xuICAgICAgICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IHZhbCA+IDAgPyAnYmFjaycgOiAnZm9yd2FyZCd9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX29uU2xpZGVzQ2hhbmdlKCk7XG4gICAgdGhpcy5fcGFnZXNTdWIgPSB0aGlzLnBhZ2VzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uU2xpZGVzQ2hhbmdlKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcGFnZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fbW91c2VXaGVlbFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzd2l0Y2hPcmllbnRhdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuICB9XG5cbiAgc2xpZGUob3B0czogQWpmUGFnZVNsaWRlclNsaWRlT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2VzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdHMuZGlyKSB7XG4gICAgICBpZiAob3B0cy5kaXIgPT09ICdiYWNrJyB8fCBvcHRzLmRpciA9PT0gJ3VwJyB8fCBvcHRzLmRpciA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHRoaXMuX3NsaWRlQmFjaygpO1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmRpciA9PT0gJ2ZvcndhcmQnIHx8IG9wdHMuZGlyID09PSAnZG93bicgfHwgb3B0cy5kaXIgPT09ICdyaWdodCcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVGb3J3YXJkKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRzLnRvKSB7XG4gICAgICB0aGlzLl9zbGlkZVRvKG9wdHMudG8pO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VXaGVlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBldnQgPSBldmVudCBhcyBXaGVlbEV2ZW50O1xuICAgIGlmIChldnQuZGVsdGFYID09IG51bGwgfHwgZXZ0LmRlbHRhWSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFic0RlbHRhWCA9IE1hdGguYWJzKGV2dC5kZWx0YVgpO1xuICAgIGNvbnN0IGFic0RlbHRhWSA9IE1hdGguYWJzKGV2dC5kZWx0YVkpO1xuICAgIGlmIChhYnNEZWx0YVggPT09IDAgJiYgYWJzRGVsdGFZID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChhYnNEZWx0YVggPiBhYnNEZWx0YVkpIHtcbiAgICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuZW1pdCh7ZGlyOiAneCcsIGFtb3VudDogLWV2dC5kZWx0YVh9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd5JywgYW1vdW50OiAtZXZ0LmRlbHRhWX0pO1xuICAgIH1cbiAgfVxuXG4gIG9uVG91Y2hTdGFydChldnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZ0LnRvdWNoZXMgPT0gbnVsbCB8fCBldnQudG91Y2hlcy5sZW5ndGggPT09IDAgfHwgdGhpcy5fYW5pbWF0aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSB7eDogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCwgeTogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WSwgdGltZTogK25ldyBEYXRlKCl9O1xuICB9XG5cbiAgb25Ub3VjaE1vdmUoZXZ0OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2dC50b3VjaGVzID09IG51bGwgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoID09PSAwIHx8IHRoaXMuX2N1cnJlbnRPcmlnaW4gPT0gbnVsbCB8fFxuICAgICAgICB0aGlzLl9hbmltYXRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcG9pbnQ6IFBvaW50ID0ge3g6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsIHk6IGV2dC50b3VjaGVzWzBdLmNsaWVudFksIHRpbWU6ICtuZXcgRGF0ZSgpfTtcbiAgICBjb25zdCBtb3ZlbWVudCA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVtZW50KHBvaW50KTtcbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0gcG9pbnQ7XG5cbiAgICBpZiAobW92ZW1lbnQudmVsb2NpdHlYID09PSAwICYmIG1vdmVtZW50LnZlbG9jaXR5WSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhYnNWZWxvY2l0eVggPSBNYXRoLmFicyhtb3ZlbWVudC52ZWxvY2l0eVgpO1xuICAgIGNvbnN0IGFic1ZlbG9jaXR5WSA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WSk7XG4gICAgaWYgKGFic1ZlbG9jaXR5WCA+IGFic1ZlbG9jaXR5WSkge1xuICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyAmJiBhYnNWZWxvY2l0eVggPiAxLjUgJiZcbiAgICAgICAgICBNYXRoLmFicyhtb3ZlbWVudC5kZWx0YVgpID4gNTApIHtcbiAgICAgICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogbW92ZW1lbnQudmVsb2NpdHlYIDwgMCA/ICdmb3J3YXJkJyA6ICdiYWNrJ30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlICE9IG51bGwpIHtcbiAgICAgICAgICBwYWdlLnNldFNjcm9sbCgneCcsIG1vdmVtZW50LmRlbHRhWCwgbW92ZW1lbnQuZGVsdGFUaW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiBhYnNWZWxvY2l0eVkgPiAxLjUgJiYgTWF0aC5hYnMobW92ZW1lbnQuZGVsdGFZKSA+IDUwKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IG1vdmVtZW50LnZlbG9jaXR5WSA8IDAgPyAnZm9yd2FyZCcgOiAnYmFjayd9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgcGFnZS5zZXRTY3JvbGwoJ3knLCBtb3ZlbWVudC5kZWx0YVksIG1vdmVtZW50LmRlbHRhVGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblRvdWNoRW5kKCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICB9XG5cbiAgaXNDdXJyZW50UGFnZUxvbmcoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY3VyUGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgaWYgKGN1clBhZ2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gY3VyUGFnZS53cmFwcGVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0ID4gY3VyUGFnZS5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRDdXJyZW50T3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFBhZ2UoKTogQWpmUGFnZVNsaWRlckl0ZW18bnVsbCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCB0aGlzLmN1cnJlbnRQYWdlIDwgMCB8fCB0aGlzLmN1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFnZXMudG9BcnJheSgpW3RoaXMuY3VycmVudFBhZ2VdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQ6IFBvaW50KTogTW92ZW1lbnQge1xuICAgIGNvbnN0IGRlbHRhWCA9IHBvaW50LnggLSB0aGlzLl9jdXJyZW50T3JpZ2luIS54O1xuICAgIGNvbnN0IGRlbHRhWSA9IHBvaW50LnkgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS55O1xuICAgIGNvbnN0IGRlbHRhVGltZSA9IHBvaW50LnRpbWUgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS50aW1lO1xuICAgIHJldHVybiB7XG4gICAgICB2ZWxvY2l0eVg6IGRlbHRhWCAvIGRlbHRhVGltZSxcbiAgICAgIGRlbHRhWCxcbiAgICAgIHZlbG9jaXR5WTogZGVsdGFZIC8gZGVsdGFUaW1lLFxuICAgICAgZGVsdGFZLFxuICAgICAgZGVsdGFUaW1lLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZUJhY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQYWdlIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlRm9yd2FyZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlICsgMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlVG8ocGFnZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHBhZ2UgPj0gMCAmJiBwYWdlIDwgdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RvU2xpZGUoaW1tZWRpYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsIHx8IHRoaXMuX2FuaW1hdGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9hbmltYXRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuX2FuaW1hdGlvbkJ1aWxkZXIuYnVpbGQoXG4gICAgICAgIGFuaW1hdGUoaW1tZWRpYXRlID8gMCA6IHRoaXMuZHVyYXRpb24sIHN0eWxlKHt0cmFuc2Zvcm06IHRoaXMuX2dldEN1cnJlbnRUcmFuc2xhdGlvbigpfSkpKTtcblxuICAgIGNvbnN0IHBsYXllciA9IGFuaW1hdGlvbi5jcmVhdGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIHBsYXllci5vbkRvbmUoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9wYWdlU2Nyb2xsRmluaXNoLmVtaXQoKTtcbiAgICB9KTtcbiAgICBwbGF5ZXIucGxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFRyYW5zbGF0aW9uKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVTaXplID0gMTAwIC8gdGhpcy5wYWdlcy5sZW5ndGg7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLl9jdXJyZW50UGFnZSA9PT0gLTEgPyAwIDogdGhpcy5fY3VycmVudFBhZ2UgKiBzbGlkZVNpemU7XG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSB0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICdZJyA6ICdYJztcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSR7dHJhbnNsYXRpb259KC0ke3Bvc2l0aW9ufSUpYDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByb3BzKCk6IHtwcm9wOiBzdHJpbmcsIHJlbW92ZVByb3A6IHN0cmluZ30ge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuIHtwcm9wOiAnaGVpZ2h0JywgcmVtb3ZlUHJvcDogJ3dpZHRoJ307XG4gICAgfVxuICAgIHJldHVybiB7cHJvcDogJ3dpZHRoJywgcmVtb3ZlUHJvcDogJ2hlaWdodCd9O1xuICB9XG5cbiAgcHJpdmF0ZSBfb25TbGlkZXNDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHtwcm9wLCByZW1vdmVQcm9wfSA9IHRoaXMuX2dldFByb3BzKCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQsIHByb3AsIGAke3RoaXMucGFnZXMubGVuZ3RoICogMTAwfSVgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCwgcmVtb3ZlUHJvcCwgbnVsbCk7XG4gICAgbGV0IGN1clBhZ2U6IG51bWJlcjtcbiAgICBpZiAodGhpcy5wYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGN1clBhZ2UgPSAtMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID09PSAtMSkge1xuICAgICAgY3VyUGFnZSA9IDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgY3VyUGFnZSA9IHRoaXMucGFnZXMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VyUGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50UGFnZSA9IGN1clBhZ2U7XG4gICAgdGhpcy5fcmVzdG9yZUN1cnJlbnRQYWdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZXN0b3JlQ3VycmVudFBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZG9TbGlkZSh0cnVlKTtcbiAgfVxufVxuIl19