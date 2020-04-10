/**
 * @fileoverview added by tsickle
 * Generated from: src/core/page-slider/page-slider.ts
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
import { animate, AnimationBuilder, style } from '@angular/animations';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, ContentChildren, Directive, ElementRef, EventEmitter, Input, Output, QueryList, Renderer2, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { filter, map, scan, throttleTime } from 'rxjs/operators';
import { AjfPageSliderItem } from './page-slider-item';
/**
 * @record
 */
function Point() { }
if (false) {
    /** @type {?} */
    Point.prototype.x;
    /** @type {?} */
    Point.prototype.y;
    /** @type {?} */
    Point.prototype.time;
}
/**
 * @record
 */
function Movement() { }
if (false) {
    /** @type {?} */
    Movement.prototype.velocityX;
    /** @type {?} */
    Movement.prototype.velocityY;
    /** @type {?} */
    Movement.prototype.deltaX;
    /** @type {?} */
    Movement.prototype.deltaY;
    /** @type {?} */
    Movement.prototype.deltaTime;
}
/**
 * @record
 */
function MousheWheelMove() { }
if (false) {
    /** @type {?} */
    MousheWheelMove.prototype.dir;
    /** @type {?} */
    MousheWheelMove.prototype.amount;
}
export class AjfPageSlider {
    /**
     * @param {?} _animationBuilder
     * @param {?} _cdr
     * @param {?} _renderer
     */
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
                .pipe(map((/**
             * @param {?} evt
             * @return {?}
             */
            evt => {
                /** @type {?} */
                const page = this._getCurrentPage();
                if (page == null) {
                    return null;
                }
                return { evt, res: page.setScroll(evt.dir, evt.amount, 0) };
            })), filter((/**
             * @param {?} r
             * @return {?}
             */
            r => r != null && r.res === false &&
                ((r.evt.dir === 'x' && this.orientation === 'horizontal') ||
                    (r.evt.dir === 'y' && this.orientation === 'vertical')))), map((/**
             * @param {?} r
             * @return {?}
             */
            r => (/** @type {?} */ (r)).evt.amount)), scan((/**
             * @param {?} acc
             * @param {?} val
             * @return {?}
             */
            (acc, val) => {
                if (acc === 0) {
                    return val;
                }
                if (acc / Math.abs(acc) !== val / Math.abs(val)) {
                    return 0;
                }
                return acc + val;
            }), 0), filter((/**
             * @param {?} val
             * @return {?}
             */
            val => !this._animating && Math.abs(val) > 150)), throttleTime(1500))
                .subscribe((/**
             * @param {?} val
             * @return {?}
             */
            val => {
                this._mouseWheelEvt.emit({ dir: 'x', amount: val > 0 ? -1 : +1 });
                this.slide({ dir: val > 0 ? 'back' : 'forward' });
            }));
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this._orientation;
    }
    /**
     * @param {?} orientation
     * @return {?}
     */
    set orientation(orientation) {
        if (this._orientation !== orientation) {
            this._orientation = orientation;
            this._cdr.markForCheck();
            this._updateSize();
            this._restoreCurrentPage();
            this._orientationChange.emit(this._orientation);
        }
    }
    /**
     * @return {?}
     */
    get fixedOrientation() {
        return this._fixedOrientation;
    }
    /**
     * @param {?} fixedOrientation
     * @return {?}
     */
    set fixedOrientation(fixedOrientation) {
        this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get currentPage() {
        return this._currentPage;
    }
    /**
     * @param {?} currentPage
     * @return {?}
     */
    set currentPage(currentPage) {
        if (this.pages == null || currentPage < 0 || currentPage >= this.pages.length) {
            return;
        }
        this._currentPage = currentPage;
        this._doSlide();
    }
    /**
     * @return {?}
     */
    get hideNavigationButtons() {
        return this._hideNavigationButtons;
    }
    /**
     * @param {?} hnb
     * @return {?}
     */
    set hideNavigationButtons(hnb) {
        this._hideNavigationButtons = coerceBooleanProperty(hnb);
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._onSlidesChange();
        this._pagesSub = this.pages.changes.subscribe((/**
         * @return {?}
         */
        () => this._onSlidesChange()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._pagesSub.unsubscribe();
        this._mouseWheelEvt.complete();
        this._mouseWheelSub.unsubscribe();
        this._orientationChange.complete();
    }
    /**
     * @return {?}
     */
    switchOrientation() {
        if (this._orientation === 'horizontal') {
            this.orientation = 'vertical';
        }
        else {
            this.orientation = 'horizontal';
        }
    }
    /**
     * @param {?} opts
     * @return {?}
     */
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
    /**
     * @param {?} event
     * @return {?}
     */
    onMouseWheel(event) {
        /** @type {?} */
        const evt = (/** @type {?} */ (event));
        if (evt.deltaX == null || evt.deltaY == null) {
            return;
        }
        /** @type {?} */
        const absDeltaX = Math.abs(evt.deltaX);
        /** @type {?} */
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
    /**
     * @param {?} evt
     * @return {?}
     */
    onTouchStart(evt) {
        if (evt.touches == null || evt.touches.length === 0 || this._animating) {
            return;
        }
        this._currentOrigin = { x: evt.touches[0].clientX, y: evt.touches[0].clientY, time: +new Date() };
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onTouchMove(evt) {
        if (evt.touches == null || evt.touches.length === 0 || this._currentOrigin == null ||
            this._animating) {
            return;
        }
        /** @type {?} */
        const point = { x: evt.touches[0].clientX, y: evt.touches[0].clientY, time: +new Date() };
        /** @type {?} */
        const movement = this._calculateMovement(point);
        this._currentOrigin = point;
        if (movement.velocityX === 0 && movement.velocityY === 0) {
            return;
        }
        /** @type {?} */
        const absVelocityX = Math.abs(movement.velocityX);
        /** @type {?} */
        const absVelocityY = Math.abs(movement.velocityY);
        if (absVelocityX > absVelocityY) {
            if (this.orientation === 'horizontal' && absVelocityX > 1.5 &&
                Math.abs(movement.deltaX) > 50) {
                this._resetCurrentOrigin();
                this.slide({ dir: movement.velocityX < 0 ? 'forward' : 'back' });
            }
            else {
                /** @type {?} */
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
                /** @type {?} */
                const page = this._getCurrentPage();
                if (page != null) {
                    page.setScroll('y', movement.deltaY, movement.deltaTime);
                }
            }
        }
    }
    /**
     * @return {?}
     */
    onTouchEnd() {
        this._resetCurrentOrigin();
    }
    /**
     * @return {?}
     */
    isCurrentPageLong() {
        /** @type {?} */
        const curPage = this._getCurrentPage();
        if (curPage == null) {
            return false;
        }
        return curPage.wrapper.nativeElement.clientHeight > curPage.content.nativeElement.clientHeight;
    }
    /**
     * @private
     * @return {?}
     */
    _resetCurrentOrigin() {
        this._currentOrigin = null;
    }
    /**
     * @private
     * @return {?}
     */
    _getCurrentPage() {
        if (this.pages == null || this.currentPage < 0 || this.currentPage >= this.pages.length) {
            return null;
        }
        return this.pages.toArray()[this.currentPage];
    }
    /**
     * @private
     * @param {?} point
     * @return {?}
     */
    _calculateMovement(point) {
        /** @type {?} */
        const deltaX = point.x - (/** @type {?} */ (this._currentOrigin)).x;
        /** @type {?} */
        const deltaY = point.y - (/** @type {?} */ (this._currentOrigin)).y;
        /** @type {?} */
        const deltaTime = point.time - (/** @type {?} */ (this._currentOrigin)).time;
        return {
            velocityX: deltaX / deltaTime,
            deltaX,
            velocityY: deltaY / deltaTime,
            deltaY,
            deltaTime,
        };
    }
    /**
     * @private
     * @return {?}
     */
    _slideBack() {
        if (this._currentPage <= 0) {
            return;
        }
        this.currentPage = this._currentPage - 1;
    }
    /**
     * @private
     * @return {?}
     */
    _slideForward() {
        if (this._currentPage >= this.pages.length) {
            return;
        }
        this.currentPage = this._currentPage + 1;
    }
    /**
     * @private
     * @param {?} page
     * @return {?}
     */
    _slideTo(page) {
        if (page >= 0 && page < this.pages.length) {
            this.currentPage = page;
        }
    }
    /**
     * @private
     * @param {?=} immediate
     * @return {?}
     */
    _doSlide(immediate = false) {
        if (this.body == null || this.pages == null || this._animating) {
            return;
        }
        this._animating = true;
        /** @type {?} */
        const animation = this._animationBuilder.build(animate(immediate ? 0 : this.duration, style({ transform: this._getCurrentTranslation() })));
        /** @type {?} */
        const player = animation.create(this.body.nativeElement);
        player.onDone((/**
         * @return {?}
         */
        () => {
            this._animating = false;
            this._pageScrollFinish.emit();
        }));
        player.play();
    }
    /**
     * @private
     * @return {?}
     */
    _getCurrentTranslation() {
        /** @type {?} */
        const slideSize = 100 / this.pages.length;
        /** @type {?} */
        const position = this._currentPage === -1 ? 0 : this._currentPage * slideSize;
        /** @type {?} */
        const translation = this._orientation === 'vertical' ? 'Y' : 'X';
        return `translate${translation}(-${position}%)`;
    }
    /**
     * @private
     * @return {?}
     */
    _getProps() {
        if (this._orientation === 'vertical') {
            return { prop: 'height', removeProp: 'width' };
        }
        return { prop: 'width', removeProp: 'height' };
    }
    /**
     * @private
     * @return {?}
     */
    _onSlidesChange() {
        this._updateSize();
    }
    /**
     * @private
     * @return {?}
     */
    _updateSize() {
        if (this.body == null || this.pages == null) {
            return;
        }
        const { prop, removeProp } = this._getProps();
        this._renderer.setStyle(this.body.nativeElement, prop, `${this.pages.length * 100}%`);
        this._renderer.setStyle(this.body.nativeElement, removeProp, null);
        /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
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
if (false) {
    /** @type {?} */
    AjfPageSlider.prototype.body;
    /** @type {?} */
    AjfPageSlider.prototype.pages;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._pageScrollFinish;
    /** @type {?} */
    AjfPageSlider.prototype.pageScrollFinish;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._orientationChange;
    /** @type {?} */
    AjfPageSlider.prototype.orientationChange;
    /** @type {?} */
    AjfPageSlider.prototype.duration;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._orientation;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._fixedOrientation;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._currentPage;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._hideNavigationButtons;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._animating;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._pagesSub;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._currentOrigin;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._mouseWheelEvt;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._mouseWheelSub;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._animationBuilder;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._cdr;
    /**
     * @type {?}
     * @private
     */
    AjfPageSlider.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFFTCxpQkFBaUIsRUFDakIsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBRSxHQUFHLEVBQUUsSUFBSSxFQUFFLFlBQVksRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRS9ELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLG9CQUFvQixDQUFDOzs7O0FBS3JELG9CQUlDOzs7SUFIQyxrQkFBVTs7SUFDVixrQkFBVTs7SUFDVixxQkFBYTs7Ozs7QUFHZix1QkFNQzs7O0lBTEMsNkJBQWtCOztJQUNsQiw2QkFBa0I7O0lBQ2xCLDBCQUFlOztJQUNmLDBCQUFlOztJQUNmLDZCQUFrQjs7Ozs7QUFHcEIsOEJBR0M7OztJQUZDLDhCQUFhOztJQUNiLGlDQUFlOztBQUlqQixNQUFNLE9BQU8sYUFBYTs7Ozs7O0lBc0V4QixZQUNZLGlCQUFtQyxFQUFVLElBQXVCLEVBQ3BFLFNBQW9CO1FBRHBCLHNCQUFpQixHQUFqQixpQkFBaUIsQ0FBa0I7UUFBVSxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUNwRSxjQUFTLEdBQVQs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UyxTQUFDLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxJQUFJLEVBQUM7b0JBQ2hDLGVBQWUsU0FBQyxpQkFBaUIsRUFBRSxFQUFDLFdBQVcsRUFBRSxJQUFJLEVBQUM7K0JBR3RELE1BQU07Z0NBSU4sTUFBTTt1QkFJTixLQUFLOzBCQU1MLEtBQUs7K0JBZUwsS0FBSzswQkFVTCxLQUFLO29DQWFMLEtBQUs7Ozs7SUF4RE4sNkJBQW9EOztJQUNwRCw4QkFBNkY7Ozs7O0lBRTdGLDBDQUF5RTs7SUFDekUseUNBQThGOzs7OztJQUU5RiwyQ0FDaUQ7O0lBQ2pELDBDQUUyQzs7SUFFM0MsaUNBQXdCOzs7OztJQUV4QixxQ0FBOEQ7Ozs7O0lBZTlELDBDQUFrQzs7Ozs7SUFVbEMscUNBQTBCOzs7OztJQWExQiwrQ0FBd0M7Ozs7O0lBVXhDLG1DQUEyQjs7Ozs7SUFDM0Isa0NBQXFEOzs7OztJQUVyRCx1Q0FBbUM7Ozs7O0lBQ25DLHVDQUE0Rjs7Ozs7SUFDNUYsdUNBQTBEOzs7OztJQUd0RCwwQ0FBMkM7Ozs7O0lBQUUsNkJBQStCOzs7OztJQUM1RSxrQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7YW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgc3R5bGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFJlbmRlcmVyMixcbiAgVmlld0NoaWxkXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgc2NhbiwgdGhyb3R0bGVUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlckl0ZW19IGZyb20gJy4vcGFnZS1zbGlkZXItaXRlbSc7XG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJTbGlkZU9wdGlvbnN9IGZyb20gJy4vcGFnZS1zbGlkZXItc2xpZGUtb3B0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJ3wndmVydGljYWwnO1xuXG5pbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgdGltZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTW92ZW1lbnQge1xuICB2ZWxvY2l0eVg6IG51bWJlcjtcbiAgdmVsb2NpdHlZOiBudW1iZXI7XG4gIGRlbHRhWDogbnVtYmVyO1xuICBkZWx0YVk6IG51bWJlcjtcbiAgZGVsdGFUaW1lOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBNb3VzaGVXaGVlbE1vdmUge1xuICBkaXI6ICd4J3wneSc7XG4gIGFtb3VudDogbnVtYmVyO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBBamZQYWdlU2xpZGVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnYm9keScsIHtzdGF0aWM6IHRydWV9KSBib2R5OiBFbGVtZW50UmVmO1xuICBAQ29udGVudENoaWxkcmVuKEFqZlBhZ2VTbGlkZXJJdGVtLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBwYWdlczogUXVlcnlMaXN0PEFqZlBhZ2VTbGlkZXJJdGVtPjtcblxuICBwcml2YXRlIF9wYWdlU2Nyb2xsRmluaXNoOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBwYWdlU2Nyb2xsRmluaXNoOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fcGFnZVNjcm9sbEZpbmlzaC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBvcmllbnRhdGlvbkNoYW5nZTogT2JzZXJ2YWJsZTxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMzAwO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gIGdldCBvcmllbnRhdGlvbigpOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgb3JpZW50YXRpb24ob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbikge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiAhPT0gb3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmVtaXQodGhpcy5fb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeGVkT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgZ2V0IGZpeGVkT3JpZW50YXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkT3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpeGVkT3JpZW50YXRpb24oZml4ZWRPcmllbnRhdGlvbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpeGVkT3JpZW50YXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZml4ZWRPcmllbnRhdGlvbik7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2UgPSAtMTtcbiAgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBjdXJyZW50UGFnZShjdXJyZW50UGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCBjdXJyZW50UGFnZSA8IDAgfHwgY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcbiAgICB0aGlzLl9kb1NsaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW47XG4gIGdldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKGhuYjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShobmIpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FuaW1hdGluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9wYWdlc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2N1cnJlbnRPcmlnaW46IFBvaW50fG51bGw7XG4gIHByaXZhdGUgX21vdXNlV2hlZWxFdnQ6IEV2ZW50RW1pdHRlcjxNb3VzaGVXaGVlbE1vdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzaGVXaGVlbE1vdmU+KCk7XG4gIHByaXZhdGUgX21vdXNlV2hlZWxTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2FuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7XG4gICAgdGhpcy5fbW91c2VXaGVlbFN1YiA9XG4gICAgICAgIHRoaXMuX21vdXNlV2hlZWxFdnRcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIG1hcChldnQgPT4ge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgICAgICAgICAgICBpZiAocGFnZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgcmV0dXJuIHtldnQsIHJlczogcGFnZS5zZXRTY3JvbGwoZXZ0LmRpciwgZXZ0LmFtb3VudCwgMCl9O1xuICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgIGZpbHRlcihcbiAgICAgICAgICAgICAgICAgICAgciA9PiByICE9IG51bGwgJiYgci5yZXMgPT09IGZhbHNlICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAoKHIuZXZ0LmRpciA9PT0gJ3gnICYmIHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykgfHxcbiAgICAgICAgICAgICAgICAgICAgICAgICAoci5ldnQuZGlyID09PSAneScgJiYgdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykpKSxcbiAgICAgICAgICAgICAgICBtYXAociA9PiByIS5ldnQuYW1vdW50KSxcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAoYWNjLCB2YWwpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYWNjID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdmFsO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoYWNjIC8gTWF0aC5hYnMoYWNjKSAhPT0gdmFsIC8gTWF0aC5hYnModmFsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIDA7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBhY2MgKyB2YWw7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIDApLFxuICAgICAgICAgICAgICAgIGZpbHRlcih2YWwgPT4gIXRoaXMuX2FuaW1hdGluZyAmJiBNYXRoLmFicyh2YWwpID4gMTUwKSxcbiAgICAgICAgICAgICAgICB0aHJvdHRsZVRpbWUoMTUwMCksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgICAgICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3gnLCBhbW91bnQ6IHZhbCA+IDAgPyAtMSA6ICsxfSk7XG4gICAgICAgICAgICAgIHRoaXMuc2xpZGUoe2RpcjogdmFsID4gMCA/ICdiYWNrJyA6ICdmb3J3YXJkJ30pO1xuICAgICAgICAgICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25TbGlkZXNDaGFuZ2UoKTtcbiAgICB0aGlzLl9wYWdlc1N1YiA9IHRoaXMucGFnZXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25TbGlkZXNDaGFuZ2UoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYWdlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9tb3VzZVdoZWVsU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIHN3aXRjaE9yaWVudGF0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICB9XG4gIH1cblxuICBzbGlkZShvcHRzOiBBamZQYWdlU2xpZGVyU2xpZGVPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3B0cy5kaXIpIHtcbiAgICAgIGlmIChvcHRzLmRpciA9PT0gJ2JhY2snIHx8IG9wdHMuZGlyID09PSAndXAnIHx8IG9wdHMuZGlyID09PSAnbGVmdCcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVCYWNrKCk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZGlyID09PSAnZm9yd2FyZCcgfHwgb3B0cy5kaXIgPT09ICdkb3duJyB8fCBvcHRzLmRpciA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICB0aGlzLl9zbGlkZUZvcndhcmQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdHMudG8pIHtcbiAgICAgIHRoaXMuX3NsaWRlVG8ob3B0cy50byk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVdoZWVsKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGV2dCA9IGV2ZW50IGFzIFdoZWVsRXZlbnQ7XG4gICAgaWYgKGV2dC5kZWx0YVggPT0gbnVsbCB8fCBldnQuZGVsdGFZID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgYWJzRGVsdGFYID0gTWF0aC5hYnMoZXZ0LmRlbHRhWCk7XG4gICAgY29uc3QgYWJzRGVsdGFZID0gTWF0aC5hYnMoZXZ0LmRlbHRhWSk7XG4gICAgaWYgKGFic0RlbHRhWCA9PT0gMCAmJiBhYnNEZWx0YVkgPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGFic0RlbHRhWCA+IGFic0RlbHRhWSkge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd4JywgYW1vdW50OiAtZXZ0LmRlbHRhWH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3knLCBhbW91bnQ6IC1ldnQuZGVsdGFZfSk7XG4gICAgfVxuICB9XG5cbiAgb25Ub3VjaFN0YXJ0KGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQudG91Y2hlcyA9PSBudWxsIHx8IGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLl9hbmltYXRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IHt4OiBldnQudG91Y2hlc1swXS5jbGllbnRYLCB5OiBldnQudG91Y2hlc1swXS5jbGllbnRZLCB0aW1lOiArbmV3IERhdGUoKX07XG4gIH1cblxuICBvblRvdWNoTW92ZShldnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZ0LnRvdWNoZXMgPT0gbnVsbCB8fCBldnQudG91Y2hlcy5sZW5ndGggPT09IDAgfHwgdGhpcy5fY3VycmVudE9yaWdpbiA9PSBudWxsIHx8XG4gICAgICAgIHRoaXMuX2FuaW1hdGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBwb2ludDogUG9pbnQgPSB7eDogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCwgeTogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WSwgdGltZTogK25ldyBEYXRlKCl9O1xuICAgIGNvbnN0IG1vdmVtZW50ID0gdGhpcy5fY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQpO1xuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSBwb2ludDtcblxuICAgIGlmIChtb3ZlbWVudC52ZWxvY2l0eVggPT09IDAgJiYgbW92ZW1lbnQudmVsb2NpdHlZID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGFic1ZlbG9jaXR5WCA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WCk7XG4gICAgY29uc3QgYWJzVmVsb2NpdHlZID0gTWF0aC5hYnMobW92ZW1lbnQudmVsb2NpdHlZKTtcbiAgICBpZiAoYWJzVmVsb2NpdHlYID4gYWJzVmVsb2NpdHlZKSB7XG4gICAgICBpZiAodGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIGFic1ZlbG9jaXR5WCA+IDEuNSAmJlxuICAgICAgICAgIE1hdGguYWJzKG1vdmVtZW50LmRlbHRhWCkgPiA1MCkge1xuICAgICAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgICAgICAgdGhpcy5zbGlkZSh7ZGlyOiBtb3ZlbWVudC52ZWxvY2l0eVggPCAwID8gJ2ZvcndhcmQnIDogJ2JhY2snfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgIHBhZ2Uuc2V0U2Nyb2xsKCd4JywgbW92ZW1lbnQuZGVsdGFYLCBtb3ZlbWVudC5kZWx0YVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnICYmIGFic1ZlbG9jaXR5WSA+IDEuNSAmJiBNYXRoLmFicyhtb3ZlbWVudC5kZWx0YVkpID4gNTApIHtcbiAgICAgICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogbW92ZW1lbnQudmVsb2NpdHlZIDwgMCA/ICdmb3J3YXJkJyA6ICdiYWNrJ30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlICE9IG51bGwpIHtcbiAgICAgICAgICBwYWdlLnNldFNjcm9sbCgneScsIG1vdmVtZW50LmRlbHRhWSwgbW92ZW1lbnQuZGVsdGFUaW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uVG91Y2hFbmQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gIH1cblxuICBpc0N1cnJlbnRQYWdlTG9uZygpOiBib29sZWFuIHtcbiAgICBjb25zdCBjdXJQYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICBpZiAoY3VyUGFnZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiBjdXJQYWdlLndyYXBwZXIubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgPiBjdXJQYWdlLmNvbnRlbnQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldEN1cnJlbnRPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDdXJyZW50UGFnZSgpOiBBamZQYWdlU2xpZGVySXRlbXxudWxsIHtcbiAgICBpZiAodGhpcy5wYWdlcyA9PSBudWxsIHx8IHRoaXMuY3VycmVudFBhZ2UgPCAwIHx8IHRoaXMuY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYWdlcy50b0FycmF5KClbdGhpcy5jdXJyZW50UGFnZV07XG4gIH1cblxuICBwcml2YXRlIF9jYWxjdWxhdGVNb3ZlbWVudChwb2ludDogUG9pbnQpOiBNb3ZlbWVudCB7XG4gICAgY29uc3QgZGVsdGFYID0gcG9pbnQueCAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLng7XG4gICAgY29uc3QgZGVsdGFZID0gcG9pbnQueSAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLnk7XG4gICAgY29uc3QgZGVsdGFUaW1lID0gcG9pbnQudGltZSAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLnRpbWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZlbG9jaXR5WDogZGVsdGFYIC8gZGVsdGFUaW1lLFxuICAgICAgZGVsdGFYLFxuICAgICAgdmVsb2NpdHlZOiBkZWx0YVkgLyBkZWx0YVRpbWUsXG4gICAgICBkZWx0YVksXG4gICAgICBkZWx0YVRpbWUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlQmFjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgPD0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5fY3VycmVudFBhZ2UgLSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVGb3J3YXJkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5fY3VycmVudFBhZ2UgKyAxO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVUbyhwYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocGFnZSA+PSAwICYmIHBhZ2UgPCB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZG9TbGlkZShpbW1lZGlhdGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJvZHkgPT0gbnVsbCB8fCB0aGlzLnBhZ2VzID09IG51bGwgfHwgdGhpcy5fYW5pbWF0aW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX2FuaW1hdGluZyA9IHRydWU7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5fYW5pbWF0aW9uQnVpbGRlci5idWlsZChcbiAgICAgICAgYW5pbWF0ZShpbW1lZGlhdGUgPyAwIDogdGhpcy5kdXJhdGlvbiwgc3R5bGUoe3RyYW5zZm9ybTogdGhpcy5fZ2V0Q3VycmVudFRyYW5zbGF0aW9uKCl9KSkpO1xuXG4gICAgY29uc3QgcGxheWVyID0gYW5pbWF0aW9uLmNyZWF0ZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCk7XG4gICAgcGxheWVyLm9uRG9uZSgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2guZW1pdCgpO1xuICAgIH0pO1xuICAgIHBsYXllci5wbGF5KCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDdXJyZW50VHJhbnNsYXRpb24oKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZVNpemUgPSAxMDAgLyB0aGlzLnBhZ2VzLmxlbmd0aDtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuX2N1cnJlbnRQYWdlID09PSAtMSA/IDAgOiB0aGlzLl9jdXJyZW50UGFnZSAqIHNsaWRlU2l6ZTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ1knIDogJ1gnO1xuICAgIHJldHVybiBgdHJhbnNsYXRlJHt0cmFuc2xhdGlvbn0oLSR7cG9zaXRpb259JSlgO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJvcHMoKToge3Byb3A6IHN0cmluZywgcmVtb3ZlUHJvcDogc3RyaW5nfSB7XG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm4ge3Byb3A6ICdoZWlnaHQnLCByZW1vdmVQcm9wOiAnd2lkdGgnfTtcbiAgICB9XG4gICAgcmV0dXJuIHtwcm9wOiAnd2lkdGgnLCByZW1vdmVQcm9wOiAnaGVpZ2h0J307XG4gIH1cblxuICBwcml2YXRlIF9vblNsaWRlc0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJvZHkgPT0gbnVsbCB8fCB0aGlzLnBhZ2VzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qge3Byb3AsIHJlbW92ZVByb3B9ID0gdGhpcy5fZ2V0UHJvcHMoKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCwgcHJvcCwgYCR7dGhpcy5wYWdlcy5sZW5ndGggKiAxMDB9JWApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keS5uYXRpdmVFbGVtZW50LCByZW1vdmVQcm9wLCBudWxsKTtcbiAgICBsZXQgY3VyUGFnZTogbnVtYmVyO1xuICAgIGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY3VyUGFnZSA9IC0xO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFBhZ2UgPT09IC0xKSB7XG4gICAgICBjdXJQYWdlID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5wYWdlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5fY3VycmVudFBhZ2U7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VyUGFnZTtcbiAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc3RvcmVDdXJyZW50UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kb1NsaWRlKHRydWUpO1xuICB9XG59XG4iXX0=