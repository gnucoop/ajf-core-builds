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
    /** @nocollapse */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBd0JyRDtJQUFBLE1BQ2EsYUFBYTtRQXNFeEIsWUFDWSxpQkFBbUMsRUFBVSxJQUF1QixFQUNwRSxTQUFvQjtZQURwQixzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1lBQVUsU0FBSSxHQUFKLElBQUksQ0FBbUI7WUFDcEUsY0FBUyxHQUFULFNBQVMsQ0FBVztZQXBFeEIsc0JBQWlCLEdBQXVCLElBQUksWUFBWSxFQUFRLENBQUM7WUFDdEQscUJBQWdCLEdBQXFCLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUV0Rix1QkFBa0IsR0FDdEIsSUFBSSxZQUFZLEVBQTRCLENBQUM7WUFFeEMsc0JBQWlCLEdBQ3RCLElBQUksQ0FBQyxr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TixNQUFNOzJCQUlOLEtBQUs7OEJBTUwsS0FBSzttQ0FlTCxLQUFLOzhCQVVMLEtBQUs7d0NBYUwsS0FBSzs7SUFzUVIsb0JBQUM7S0FBQTtTQS9UWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2FuaW1hdGUsIEFuaW1hdGlvbkJ1aWxkZXIsIHN0eWxlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBSZW5kZXJlcjIsXG4gIFZpZXdDaGlsZFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNjYW4sIHRocm90dGxlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJJdGVtfSBmcm9tICcuL3BhZ2Utc2xpZGVyLWl0ZW0nO1xuaW1wb3J0IHtBamZQYWdlU2xpZGVyU2xpZGVPcHRpb25zfSBmcm9tICcuL3BhZ2Utc2xpZGVyLXNsaWRlLW9wdGlvbnMnO1xuXG5leHBvcnQgdHlwZSBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCd8J3ZlcnRpY2FsJztcblxuaW50ZXJmYWNlIFBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHRpbWU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIE1vdmVtZW50IHtcbiAgdmVsb2NpdHlYOiBudW1iZXI7XG4gIHZlbG9jaXR5WTogbnVtYmVyO1xuICBkZWx0YVg6IG51bWJlcjtcbiAgZGVsdGFZOiBudW1iZXI7XG4gIGRlbHRhVGltZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTW91c2hlV2hlZWxNb3ZlIHtcbiAgZGlyOiAneCd8J3knO1xuICBhbW91bnQ6IG51bWJlcjtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQWpmUGFnZVNsaWRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2JvZHknLCB7c3RhdGljOiB0cnVlfSkgYm9keTogRWxlbWVudFJlZjtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZQYWdlU2xpZGVySXRlbSwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgcGFnZXM6IFF1ZXJ5TGlzdDxBamZQYWdlU2xpZGVySXRlbT47XG5cbiAgcHJpdmF0ZSBfcGFnZVNjcm9sbEZpbmlzaDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcGFnZVNjcm9sbEZpbmlzaDogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2guYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgb3JpZW50YXRpb25DaGFuZ2U6IE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBASW5wdXQoKSBkdXJhdGlvbiA9IDMwMDtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICBnZXQgb3JpZW50YXRpb24oKTogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pIHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gIT09IG9yaWVudGF0aW9uKSB7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgdGhpcy5fcmVzdG9yZUN1cnJlbnRQYWdlKCk7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5lbWl0KHRoaXMuX29yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhlZE9yaWVudGF0aW9uID0gZmFsc2U7XG4gIGdldCBmaXhlZE9yaWVudGF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZE9yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaXhlZE9yaWVudGF0aW9uKGZpeGVkT3JpZW50YXRpb246IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXhlZE9yaWVudGF0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGZpeGVkT3JpZW50YXRpb24pO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2N1cnJlbnRQYWdlID0gLTE7XG4gIGdldCBjdXJyZW50UGFnZSgpOiBudW1iZXIge1xuICAgIHJldHVybiB0aGlzLl9jdXJyZW50UGFnZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgY3VycmVudFBhZ2UoY3VycmVudFBhZ2U6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnBhZ2VzID09IG51bGwgfHwgY3VycmVudFBhZ2UgPCAwIHx8IGN1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VycmVudFBhZ2U7XG4gICAgdGhpcy5fZG9TbGlkZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZU5hdmlnYXRpb25CdXR0b25zOiBib29sZWFuO1xuICBnZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyhobmI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaG5iKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcGFnZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9jdXJyZW50T3JpZ2luOiBQb2ludHxudWxsO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsRXZ0OiBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPigpO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9hbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLCBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge1xuICAgIHRoaXMuX21vdXNlV2hlZWxTdWIgPVxuICAgICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0XG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBtYXAoZXZ0ID0+IHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICAgICAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiB7ZXZ0LCByZXM6IHBhZ2Uuc2V0U2Nyb2xsKGV2dC5kaXIsIGV2dC5hbW91bnQsIDApfTtcbiAgICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIHIgPT4gciAhPSBudWxsICYmIHIucmVzID09PSBmYWxzZSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgKChyLmV2dC5kaXIgPT09ICd4JyAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHx8XG4gICAgICAgICAgICAgICAgICAgICAgICAgKHIuZXZ0LmRpciA9PT0gJ3knICYmIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpKSksXG4gICAgICAgICAgICAgICAgbWFwKHIgPT4gciEuZXZ0LmFtb3VudCksXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKGFjYywgdmFsKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGFjYyA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHZhbDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGFjYyAvIE1hdGguYWJzKGFjYykgIT09IHZhbCAvIE1hdGguYWJzKHZhbCkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAwO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYWNjICsgdmFsO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAwKSxcbiAgICAgICAgICAgICAgICBmaWx0ZXIodmFsID0+ICF0aGlzLl9hbmltYXRpbmcgJiYgTWF0aC5hYnModmFsKSA+IDE1MCksXG4gICAgICAgICAgICAgICAgdGhyb3R0bGVUaW1lKDE1MDApLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd4JywgYW1vdW50OiB2YWwgPiAwID8gLTEgOiArMX0pO1xuICAgICAgICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IHZhbCA+IDAgPyAnYmFjaycgOiAnZm9yd2FyZCd9KTtcbiAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX29uU2xpZGVzQ2hhbmdlKCk7XG4gICAgdGhpcy5fcGFnZXNTdWIgPSB0aGlzLnBhZ2VzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uU2xpZGVzQ2hhbmdlKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcGFnZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fbW91c2VXaGVlbFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzd2l0Y2hPcmllbnRhdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuICB9XG5cbiAgc2xpZGUob3B0czogQWpmUGFnZVNsaWRlclNsaWRlT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2VzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9wdHMuZGlyKSB7XG4gICAgICBpZiAob3B0cy5kaXIgPT09ICdiYWNrJyB8fCBvcHRzLmRpciA9PT0gJ3VwJyB8fCBvcHRzLmRpciA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHRoaXMuX3NsaWRlQmFjaygpO1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmRpciA9PT0gJ2ZvcndhcmQnIHx8IG9wdHMuZGlyID09PSAnZG93bicgfHwgb3B0cy5kaXIgPT09ICdyaWdodCcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVGb3J3YXJkKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRzLnRvKSB7XG4gICAgICB0aGlzLl9zbGlkZVRvKG9wdHMudG8pO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VXaGVlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBldnQgPSBldmVudCBhcyBXaGVlbEV2ZW50O1xuICAgIGlmIChldnQuZGVsdGFYID09IG51bGwgfHwgZXZ0LmRlbHRhWSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFic0RlbHRhWCA9IE1hdGguYWJzKGV2dC5kZWx0YVgpO1xuICAgIGNvbnN0IGFic0RlbHRhWSA9IE1hdGguYWJzKGV2dC5kZWx0YVkpO1xuICAgIGlmIChhYnNEZWx0YVggPT09IDAgJiYgYWJzRGVsdGFZID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChhYnNEZWx0YVggPiBhYnNEZWx0YVkpIHtcbiAgICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuZW1pdCh7ZGlyOiAneCcsIGFtb3VudDogLWV2dC5kZWx0YVh9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd5JywgYW1vdW50OiAtZXZ0LmRlbHRhWX0pO1xuICAgIH1cbiAgfVxuXG4gIG9uVG91Y2hTdGFydChldnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZ0LnRvdWNoZXMgPT0gbnVsbCB8fCBldnQudG91Y2hlcy5sZW5ndGggPT09IDAgfHwgdGhpcy5fYW5pbWF0aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSB7eDogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCwgeTogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WSwgdGltZTogK25ldyBEYXRlKCl9O1xuICB9XG5cbiAgb25Ub3VjaE1vdmUoZXZ0OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2dC50b3VjaGVzID09IG51bGwgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoID09PSAwIHx8IHRoaXMuX2N1cnJlbnRPcmlnaW4gPT0gbnVsbCB8fFxuICAgICAgICB0aGlzLl9hbmltYXRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcG9pbnQ6IFBvaW50ID0ge3g6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsIHk6IGV2dC50b3VjaGVzWzBdLmNsaWVudFksIHRpbWU6ICtuZXcgRGF0ZSgpfTtcbiAgICBjb25zdCBtb3ZlbWVudCA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVtZW50KHBvaW50KTtcbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0gcG9pbnQ7XG5cbiAgICBpZiAobW92ZW1lbnQudmVsb2NpdHlYID09PSAwICYmIG1vdmVtZW50LnZlbG9jaXR5WSA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBhYnNWZWxvY2l0eVggPSBNYXRoLmFicyhtb3ZlbWVudC52ZWxvY2l0eVgpO1xuICAgIGNvbnN0IGFic1ZlbG9jaXR5WSA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WSk7XG4gICAgaWYgKGFic1ZlbG9jaXR5WCA+IGFic1ZlbG9jaXR5WSkge1xuICAgICAgaWYgKHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyAmJiBhYnNWZWxvY2l0eVggPiAxLjUgJiZcbiAgICAgICAgICBNYXRoLmFicyhtb3ZlbWVudC5kZWx0YVgpID4gNTApIHtcbiAgICAgICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogbW92ZW1lbnQudmVsb2NpdHlYIDwgMCA/ICdmb3J3YXJkJyA6ICdiYWNrJ30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlICE9IG51bGwpIHtcbiAgICAgICAgICBwYWdlLnNldFNjcm9sbCgneCcsIG1vdmVtZW50LmRlbHRhWCwgbW92ZW1lbnQuZGVsdGFUaW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiBhYnNWZWxvY2l0eVkgPiAxLjUgJiYgTWF0aC5hYnMobW92ZW1lbnQuZGVsdGFZKSA+IDUwKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IG1vdmVtZW50LnZlbG9jaXR5WSA8IDAgPyAnZm9yd2FyZCcgOiAnYmFjayd9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgcGFnZS5zZXRTY3JvbGwoJ3knLCBtb3ZlbWVudC5kZWx0YVksIG1vdmVtZW50LmRlbHRhVGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblRvdWNoRW5kKCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICB9XG5cbiAgaXNDdXJyZW50UGFnZUxvbmcoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY3VyUGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgaWYgKGN1clBhZ2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gY3VyUGFnZS53cmFwcGVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0ID4gY3VyUGFnZS5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRDdXJyZW50T3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFBhZ2UoKTogQWpmUGFnZVNsaWRlckl0ZW18bnVsbCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCB0aGlzLmN1cnJlbnRQYWdlIDwgMCB8fCB0aGlzLmN1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFnZXMudG9BcnJheSgpW3RoaXMuY3VycmVudFBhZ2VdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQ6IFBvaW50KTogTW92ZW1lbnQge1xuICAgIGNvbnN0IGRlbHRhWCA9IHBvaW50LnggLSB0aGlzLl9jdXJyZW50T3JpZ2luIS54O1xuICAgIGNvbnN0IGRlbHRhWSA9IHBvaW50LnkgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS55O1xuICAgIGNvbnN0IGRlbHRhVGltZSA9IHBvaW50LnRpbWUgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS50aW1lO1xuICAgIHJldHVybiB7XG4gICAgICB2ZWxvY2l0eVg6IGRlbHRhWCAvIGRlbHRhVGltZSxcbiAgICAgIGRlbHRhWCxcbiAgICAgIHZlbG9jaXR5WTogZGVsdGFZIC8gZGVsdGFUaW1lLFxuICAgICAgZGVsdGFZLFxuICAgICAgZGVsdGFUaW1lLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZUJhY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQYWdlIDw9IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlRm9yd2FyZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlICsgMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlVG8ocGFnZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHBhZ2UgPj0gMCAmJiBwYWdlIDwgdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RvU2xpZGUoaW1tZWRpYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsIHx8IHRoaXMuX2FuaW1hdGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9hbmltYXRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuX2FuaW1hdGlvbkJ1aWxkZXIuYnVpbGQoXG4gICAgICAgIGFuaW1hdGUoaW1tZWRpYXRlID8gMCA6IHRoaXMuZHVyYXRpb24sIHN0eWxlKHt0cmFuc2Zvcm06IHRoaXMuX2dldEN1cnJlbnRUcmFuc2xhdGlvbigpfSkpKTtcblxuICAgIGNvbnN0IHBsYXllciA9IGFuaW1hdGlvbi5jcmVhdGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIHBsYXllci5vbkRvbmUoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9wYWdlU2Nyb2xsRmluaXNoLmVtaXQoKTtcbiAgICB9KTtcbiAgICBwbGF5ZXIucGxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFRyYW5zbGF0aW9uKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVTaXplID0gMTAwIC8gdGhpcy5wYWdlcy5sZW5ndGg7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLl9jdXJyZW50UGFnZSA9PT0gLTEgPyAwIDogdGhpcy5fY3VycmVudFBhZ2UgKiBzbGlkZVNpemU7XG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSB0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICdZJyA6ICdYJztcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSR7dHJhbnNsYXRpb259KC0ke3Bvc2l0aW9ufSUpYDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByb3BzKCk6IHtwcm9wOiBzdHJpbmcsIHJlbW92ZVByb3A6IHN0cmluZ30ge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuIHtwcm9wOiAnaGVpZ2h0JywgcmVtb3ZlUHJvcDogJ3dpZHRoJ307XG4gICAgfVxuICAgIHJldHVybiB7cHJvcDogJ3dpZHRoJywgcmVtb3ZlUHJvcDogJ2hlaWdodCd9O1xuICB9XG5cbiAgcHJpdmF0ZSBfb25TbGlkZXNDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHtwcm9wLCByZW1vdmVQcm9wfSA9IHRoaXMuX2dldFByb3BzKCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQsIHByb3AsIGAke3RoaXMucGFnZXMubGVuZ3RoICogMTAwfSVgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCwgcmVtb3ZlUHJvcCwgbnVsbCk7XG4gICAgbGV0IGN1clBhZ2U6IG51bWJlcjtcbiAgICBpZiAodGhpcy5wYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGN1clBhZ2UgPSAtMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID09PSAtMSkge1xuICAgICAgY3VyUGFnZSA9IDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgY3VyUGFnZSA9IHRoaXMucGFnZXMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VyUGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50UGFnZSA9IGN1clBhZ2U7XG4gICAgdGhpcy5fcmVzdG9yZUN1cnJlbnRQYWdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZXN0b3JlQ3VycmVudFBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZG9TbGlkZSh0cnVlKTtcbiAgfVxufVxuIl19