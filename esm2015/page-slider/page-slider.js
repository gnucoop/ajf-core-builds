/**
 * @fileoverview added by tsickle
 * Generated from: src/core/page-slider/page-slider.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { animate, AnimationBuilder, style } from '@angular/animations';
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
        this._mouseWheelSub = this._mouseWheelEvt.pipe(map((/**
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
        r => r != null
            && r.res === false
            && ((r.evt.dir === 'x' && this.orientation === 'horizontal')
                || (r.evt.dir === 'y' && this.orientation === 'vertical')))), map((/**
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
        val => !this._animating && Math.abs(val) > 150)), throttleTime(1500)).subscribe((/**
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
    get orientation() { return this._orientation; }
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
    get fixedOrientation() { return this._fixedOrientation; }
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
    get currentPage() { return this._currentPage; }
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
    get hideNavigationButtons() { return this._hideNavigationButtons; }
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
        this._currentOrigin = {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY,
            time: +new Date()
        };
    }
    /**
     * @param {?} evt
     * @return {?}
     */
    onTouchMove(evt) {
        if (evt.touches == null || evt.touches.length === 0
            || this._currentOrigin == null || this._animating) {
            return;
        }
        /** @type {?} */
        const point = {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY,
            time: +new Date()
        };
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
            if (this.orientation === 'horizontal' && absVelocityX > 1.5 && Math.abs(movement.deltaX) > 50) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBbUIsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUMvRixLQUFLLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUtyRCxvQkFJQzs7O0lBSEMsa0JBQVU7O0lBQ1Ysa0JBQVU7O0lBQ1YscUJBQWE7Ozs7O0FBR2YsdUJBTUM7OztJQUxDLDZCQUFrQjs7SUFDbEIsNkJBQWtCOztJQUNsQiwwQkFBZTs7SUFDZiwwQkFBZTs7SUFDZiw2QkFBa0I7Ozs7O0FBR3BCLDhCQUdDOzs7SUFGQyw4QkFBZTs7SUFDZixpQ0FBZTs7QUFJakIsTUFBTSxPQUFPLGFBQWE7Ozs7OztJQXVEeEIsWUFDVSxpQkFBbUMsRUFDbkMsSUFBdUIsRUFDdkIsU0FBb0I7UUFGcEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QixjQUFTLEdB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QUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztvQkFDaEMsZUFBZSxTQUFDLGlCQUFpQixFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQzsrQkFHdEQsTUFBTTtnQ0FJTixNQUFNO3VCQUdOLEtBQUs7MEJBSUwsS0FBSzsrQkFZTCxLQUFLOzBCQU9MLEtBQUs7b0NBUUwsS0FBSzs7OztJQTFDTiw2QkFBb0Q7O0lBQ3BELDhCQUE2Rjs7Ozs7SUFFN0YsMENBQXlFOztJQUN6RSx5Q0FBOEY7Ozs7O0lBRTlGLDJDQUNpRDs7SUFDakQsMENBQ3lDOztJQUV6QyxpQ0FBd0I7Ozs7O0lBRXhCLHFDQUE4RDs7Ozs7SUFZOUQsMENBQWtDOzs7OztJQU9sQyxxQ0FBMEI7Ozs7O0lBUTFCLCtDQUF3Qzs7Ozs7SUFPeEMsbUNBQTJCOzs7OztJQUMzQixrQ0FBcUQ7Ozs7O0lBRXJELHVDQUFxQzs7Ozs7SUFDckMsdUNBQTRGOzs7OztJQUM1Rix1Q0FBMEQ7Ozs7O0lBR3hELDBDQUEyQzs7Ozs7SUFDM0MsNkJBQStCOzs7OztJQUMvQixrQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge2FuaW1hdGUsIEFuaW1hdGlvbkJ1aWxkZXIsIHN0eWxlfSBmcm9tICdAYW5ndWxhci9hbmltYXRpb25zJztcbmltcG9ydCB7QWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIENvbnRlbnRDaGlsZHJlbiwgRGlyZWN0aXZlLCBFbGVtZW50UmVmLCBFdmVudEVtaXR0ZXIsXG4gIElucHV0LCBPbkRlc3Ryb3ksIE91dHB1dCwgUXVlcnlMaXN0LCBSZW5kZXJlcjIsIFZpZXdDaGlsZH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlciwgbWFwLCBzY2FuLCB0aHJvdHRsZVRpbWV9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZQYWdlU2xpZGVySXRlbX0gZnJvbSAnLi9wYWdlLXNsaWRlci1pdGVtJztcbmltcG9ydCB7QWpmUGFnZVNsaWRlclNsaWRlT3B0aW9uc30gZnJvbSAnLi9wYWdlLXNsaWRlci1zbGlkZS1vcHRpb25zJztcblxuZXhwb3J0IHR5cGUgQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnIHwgJ3ZlcnRpY2FsJztcblxuaW50ZXJmYWNlIFBvaW50IHtcbiAgeDogbnVtYmVyO1xuICB5OiBudW1iZXI7XG4gIHRpbWU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIE1vdmVtZW50IHtcbiAgdmVsb2NpdHlYOiBudW1iZXI7XG4gIHZlbG9jaXR5WTogbnVtYmVyO1xuICBkZWx0YVg6IG51bWJlcjtcbiAgZGVsdGFZOiBudW1iZXI7XG4gIGRlbHRhVGltZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTW91c2hlV2hlZWxNb3ZlIHtcbiAgZGlyOiAneCcgfCAneSc7XG4gIGFtb3VudDogbnVtYmVyO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBBamZQYWdlU2xpZGVyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgT25EZXN0cm95IHtcbiAgQFZpZXdDaGlsZCgnYm9keScsIHtzdGF0aWM6IHRydWV9KSBib2R5OiBFbGVtZW50UmVmO1xuICBAQ29udGVudENoaWxkcmVuKEFqZlBhZ2VTbGlkZXJJdGVtLCB7ZGVzY2VuZGFudHM6IHRydWV9KSBwYWdlczogUXVlcnlMaXN0PEFqZlBhZ2VTbGlkZXJJdGVtPjtcblxuICBwcml2YXRlIF9wYWdlU2Nyb2xsRmluaXNoOiBFdmVudEVtaXR0ZXI8dm9pZD4gPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBwYWdlU2Nyb2xsRmluaXNoOiBPYnNlcnZhYmxlPHZvaWQ+ID0gdGhpcy5fcGFnZVNjcm9sbEZpbmlzaC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3JpZW50YXRpb25DaGFuZ2U6IE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgQElucHV0KCkgZHVyYXRpb24gPSAzMDA7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgZ2V0IG9yaWVudGF0aW9uKCk6IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiB7IHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjsgfVxuICBASW5wdXQoKSBzZXQgb3JpZW50YXRpb24ob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbikge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiAhPT0gb3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gICAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmVtaXQodGhpcy5fb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2ZpeGVkT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgZ2V0IGZpeGVkT3JpZW50YXRpb24oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9maXhlZE9yaWVudGF0aW9uOyB9XG4gIEBJbnB1dCgpIHNldCBmaXhlZE9yaWVudGF0aW9uKGZpeGVkT3JpZW50YXRpb246IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXhlZE9yaWVudGF0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGZpeGVkT3JpZW50YXRpb24pO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2N1cnJlbnRQYWdlID0gLTE7XG4gIGdldCBjdXJyZW50UGFnZSgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5fY3VycmVudFBhZ2U7IH1cbiAgQElucHV0KCkgc2V0IGN1cnJlbnRQYWdlKGN1cnJlbnRQYWdlOiBudW1iZXIpIHtcbiAgICBpZiAodGhpcy5wYWdlcyA9PSBudWxsIHx8IGN1cnJlbnRQYWdlIDwgMCB8fCBjdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICB0aGlzLl9jdXJyZW50UGFnZSA9IGN1cnJlbnRQYWdlO1xuICAgIHRoaXMuX2RvU2xpZGUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVOYXZpZ2F0aW9uQnV0dG9uczogYm9vbGVhbjtcbiAgZ2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9uczsgfVxuICBASW5wdXQoKSBzZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKGhuYjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShobmIpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FuaW1hdGluZyA9IGZhbHNlO1xuICBwcml2YXRlIF9wYWdlc1N1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2N1cnJlbnRPcmlnaW46IFBvaW50IHwgbnVsbDtcbiAgcHJpdmF0ZSBfbW91c2VXaGVlbEV2dDogRXZlbnRFbWl0dGVyPE1vdXNoZVdoZWVsTW92ZT4gPSBuZXcgRXZlbnRFbWl0dGVyPE1vdXNoZVdoZWVsTW92ZT4oKTtcbiAgcHJpdmF0ZSBfbW91c2VXaGVlbFN1YjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX2FuaW1hdGlvbkJ1aWxkZXI6IEFuaW1hdGlvbkJ1aWxkZXIsXG4gICAgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyXG4gICkge1xuICAgIHRoaXMuX21vdXNlV2hlZWxTdWIgPSB0aGlzLl9tb3VzZVdoZWVsRXZ0LnBpcGUoXG4gICAgICBtYXAoZXZ0ID0+IHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlID09IG51bGwpIHsgcmV0dXJuIG51bGw7IH1cbiAgICAgICAgcmV0dXJuIHtldnQsIHJlczogcGFnZS5zZXRTY3JvbGwoZXZ0LmRpciwgZXZ0LmFtb3VudCwgMCl9O1xuICAgICAgfSksXG4gICAgICBmaWx0ZXIociA9PiByICE9IG51bGxcbiAgICAgICAgJiYgci5yZXMgPT09IGZhbHNlXG4gICAgICAgICYmIChcbiAgICAgICAgICAoci5ldnQuZGlyID09PSAneCcgJiYgdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKVxuICAgICAgICAgIHx8IChyLmV2dC5kaXIgPT09ICd5JyAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnKVxuICAgICAgICApXG4gICAgICApLFxuICAgICAgbWFwKHIgPT4gciEuZXZ0LmFtb3VudCksXG4gICAgICBzY2FuKChhY2MsIHZhbCkgPT4ge1xuICAgICAgICBpZiAoYWNjID09PSAwKSB7IHJldHVybiB2YWw7IH1cbiAgICAgICAgaWYgKGFjYyAvIE1hdGguYWJzKGFjYykgIT09IHZhbCAvIE1hdGguYWJzKHZhbCkpIHtyZXR1cm4gMDsgfVxuICAgICAgICByZXR1cm4gYWNjICsgdmFsO1xuICAgICAgfSwgMCksXG4gICAgICBmaWx0ZXIodmFsID0+ICF0aGlzLl9hbmltYXRpbmcgJiYgTWF0aC5hYnModmFsKSA+IDE1MCksXG4gICAgICB0aHJvdHRsZVRpbWUoMTUwMCksXG4gICAgKS5zdWJzY3JpYmUodmFsID0+IHtcbiAgICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuZW1pdCh7ZGlyOiAneCcsIGFtb3VudDogdmFsID4gMCA/IC0xIDogKyAxfSk7XG4gICAgICB0aGlzLnNsaWRlKHtkaXI6IHZhbCA+IDAgPyAnYmFjaycgOiAnZm9yd2FyZCd9KTtcbiAgICB9KTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9vblNsaWRlc0NoYW5nZSgpO1xuICAgIHRoaXMuX3BhZ2VzU3ViID0gdGhpcy5wYWdlcy5jaGFuZ2VzLnN1YnNjcmliZSgoKSA9PiB0aGlzLl9vblNsaWRlc0NoYW5nZSgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3BhZ2VzU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fbW91c2VXaGVlbEV2dC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX21vdXNlV2hlZWxTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc3dpdGNoT3JpZW50YXRpb24oKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAndmVydGljYWwnO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICAgIH1cbiAgfVxuXG4gIHNsaWRlKG9wdHM6IEFqZlBhZ2VTbGlkZXJTbGlkZU9wdGlvbnMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5wYWdlcyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGlmIChvcHRzLmRpcikge1xuICAgICAgaWYgKG9wdHMuZGlyID09PSAnYmFjaycgfHwgb3B0cy5kaXIgPT09ICd1cCcgfHwgb3B0cy5kaXIgPT09ICdsZWZ0Jykge1xuICAgICAgICB0aGlzLl9zbGlkZUJhY2soKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0cy5kaXIgPT09ICdmb3J3YXJkJyB8fCBvcHRzLmRpciA9PT0gJ2Rvd24nIHx8IG9wdHMuZGlyID09PSAncmlnaHQnKSB7XG4gICAgICAgIHRoaXMuX3NsaWRlRm9yd2FyZCgpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob3B0cy50bykge1xuICAgICAgdGhpcy5fc2xpZGVUbyhvcHRzLnRvKTtcbiAgICB9XG4gIH1cblxuICBvbk1vdXNlV2hlZWwoZXZlbnQ6IEV2ZW50KTogdm9pZCB7XG4gICAgY29uc3QgZXZ0ID0gZXZlbnQgYXMgV2hlZWxFdmVudDtcbiAgICBpZiAoZXZ0LmRlbHRhWCA9PSBudWxsIHx8IGV2dC5kZWx0YVkgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCBhYnNEZWx0YVggPSBNYXRoLmFicyhldnQuZGVsdGFYKTtcbiAgICBjb25zdCBhYnNEZWx0YVkgPSBNYXRoLmFicyhldnQuZGVsdGFZKTtcbiAgICBpZiAoYWJzRGVsdGFYID09PSAwICYmIGFic0RlbHRhWSA9PT0gMCkgeyByZXR1cm47IH1cbiAgICBpZiAoYWJzRGVsdGFYID4gYWJzRGVsdGFZKSB7XG4gICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3gnLCBhbW91bnQ6IC1ldnQuZGVsdGFYfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuZW1pdCh7ZGlyOiAneScsIGFtb3VudDogLWV2dC5kZWx0YVl9KTtcbiAgICB9XG4gIH1cblxuICBvblRvdWNoU3RhcnQoZXZ0OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKGV2dC50b3VjaGVzID09IG51bGwgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoID09PSAwIHx8IHRoaXMuX2FuaW1hdGluZykgeyByZXR1cm47IH1cbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0ge1xuICAgICAgeDogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIHk6IGV2dC50b3VjaGVzWzBdLmNsaWVudFksXG4gICAgICB0aW1lOiArIG5ldyBEYXRlKClcbiAgICB9O1xuICB9XG5cbiAgb25Ub3VjaE1vdmUoZXZ0OiBUb3VjaEV2ZW50KTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgZXZ0LnRvdWNoZXMgPT0gbnVsbCB8fCBldnQudG91Y2hlcy5sZW5ndGggPT09IDBcbiAgICAgIHx8IHRoaXMuX2N1cnJlbnRPcmlnaW4gPT0gbnVsbCB8fCB0aGlzLl9hbmltYXRpbmdcbiAgICApIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgcG9pbnQ6IFBvaW50ID0ge1xuICAgICAgeDogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WCxcbiAgICAgIHk6IGV2dC50b3VjaGVzWzBdLmNsaWVudFksXG4gICAgICB0aW1lOiArIG5ldyBEYXRlKClcbiAgICB9O1xuICAgIGNvbnN0IG1vdmVtZW50ID0gdGhpcy5fY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQpO1xuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSBwb2ludDtcblxuICAgIGlmIChtb3ZlbWVudC52ZWxvY2l0eVggPT09IDAgJiYgbW92ZW1lbnQudmVsb2NpdHlZID09PSAwKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IGFic1ZlbG9jaXR5WCA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WCk7XG4gICAgY29uc3QgYWJzVmVsb2NpdHlZID0gTWF0aC5hYnMobW92ZW1lbnQudmVsb2NpdHlZKTtcbiAgICBpZiAoYWJzVmVsb2NpdHlYID4gYWJzVmVsb2NpdHlZKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJyAmJiBhYnNWZWxvY2l0eVggPiAxLjUgJiYgTWF0aC5hYnMobW92ZW1lbnQuZGVsdGFYKSA+IDUwXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogbW92ZW1lbnQudmVsb2NpdHlYIDwgMCA/ICdmb3J3YXJkJyA6ICdiYWNrJ30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlICE9IG51bGwpIHtcbiAgICAgICAgICBwYWdlLnNldFNjcm9sbCgneCcsIG1vdmVtZW50LmRlbHRhWCwgbW92ZW1lbnQuZGVsdGFUaW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgJiYgYWJzVmVsb2NpdHlZID4gMS41ICYmIE1hdGguYWJzKG1vdmVtZW50LmRlbHRhWSkgPiA1MFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IG1vdmVtZW50LnZlbG9jaXR5WSA8IDAgPyAnZm9yd2FyZCcgOiAnYmFjayd9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgcGFnZS5zZXRTY3JvbGwoJ3knLCBtb3ZlbWVudC5kZWx0YVksIG1vdmVtZW50LmRlbHRhVGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBvblRvdWNoRW5kKCk6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICB9XG5cbiAgaXNDdXJyZW50UGFnZUxvbmcoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgY3VyUGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgaWYgKGN1clBhZ2UgPT0gbnVsbCkgeyByZXR1cm4gZmFsc2U7IH1cbiAgICByZXR1cm4gY3VyUGFnZS53cmFwcGVyLm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0ID4gY3VyUGFnZS5jb250ZW50Lm5hdGl2ZUVsZW1lbnQuY2xpZW50SGVpZ2h0O1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRDdXJyZW50T3JpZ2luKCk6IHZvaWQge1xuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSBudWxsO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFBhZ2UoKTogQWpmUGFnZVNsaWRlckl0ZW0gfCBudWxsIHtcbiAgICBpZiAodGhpcy5wYWdlcyA9PSBudWxsIHx8IHRoaXMuY3VycmVudFBhZ2UgPCAwIHx8IHRoaXMuY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5wYWdlcy50b0FycmF5KClbdGhpcy5jdXJyZW50UGFnZV07XG4gIH1cblxuICBwcml2YXRlIF9jYWxjdWxhdGVNb3ZlbWVudChwb2ludDogUG9pbnQpOiBNb3ZlbWVudCB7XG4gICAgY29uc3QgZGVsdGFYID0gcG9pbnQueCAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLng7XG4gICAgY29uc3QgZGVsdGFZID0gcG9pbnQueSAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLnk7XG4gICAgY29uc3QgZGVsdGFUaW1lID0gcG9pbnQudGltZSAtIHRoaXMuX2N1cnJlbnRPcmlnaW4hLnRpbWU7XG4gICAgcmV0dXJuIHtcbiAgICAgIHZlbG9jaXR5WDogZGVsdGFYIC8gZGVsdGFUaW1lLFxuICAgICAgZGVsdGFYLFxuICAgICAgdmVsb2NpdHlZOiBkZWx0YVkgLyBkZWx0YVRpbWUsXG4gICAgICBkZWx0YVksXG4gICAgICBkZWx0YVRpbWUsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlQmFjaygpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgPD0gMCkgeyByZXR1cm47IH1cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5fY3VycmVudFBhZ2UgLSAxO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVGb3J3YXJkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkgeyByZXR1cm47IH1cbiAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5fY3VycmVudFBhZ2UgKyAxO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVUbyhwYWdlOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocGFnZSA+PSAwICYmIHBhZ2UgPCB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHBhZ2U7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZG9TbGlkZShpbW1lZGlhdGUgPSBmYWxzZSk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJvZHkgPT0gbnVsbCB8fCB0aGlzLnBhZ2VzID09IG51bGwgfHwgdGhpcy5fYW5pbWF0aW5nKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2FuaW1hdGluZyA9IHRydWU7XG4gICAgY29uc3QgYW5pbWF0aW9uID0gdGhpcy5fYW5pbWF0aW9uQnVpbGRlci5idWlsZChhbmltYXRlKFxuICAgICAgaW1tZWRpYXRlID8gMCA6IHRoaXMuZHVyYXRpb24sXG4gICAgICBzdHlsZSh7dHJhbnNmb3JtOiB0aGlzLl9nZXRDdXJyZW50VHJhbnNsYXRpb24oKX0pXG4gICAgKSk7XG5cbiAgICBjb25zdCBwbGF5ZXIgPSBhbmltYXRpb24uY3JlYXRlKHRoaXMuYm9keS5uYXRpdmVFbGVtZW50KTtcbiAgICBwbGF5ZXIub25Eb25lKCgpID0+IHtcbiAgICAgIHRoaXMuX2FuaW1hdGluZyA9IGZhbHNlO1xuICAgICAgdGhpcy5fcGFnZVNjcm9sbEZpbmlzaC5lbWl0KCk7XG4gICAgfSk7XG4gICAgcGxheWVyLnBsYXkoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEN1cnJlbnRUcmFuc2xhdGlvbigpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNsaWRlU2l6ZSA9IDEwMCAvIHRoaXMucGFnZXMubGVuZ3RoO1xuICAgIGNvbnN0IHBvc2l0aW9uID0gdGhpcy5fY3VycmVudFBhZ2UgPT09IC0xID8gMCA6IHRoaXMuX2N1cnJlbnRQYWdlICogc2xpZGVTaXplO1xuICAgIGNvbnN0IHRyYW5zbGF0aW9uID0gdGhpcy5fb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcgPyAnWScgOiAnWCc7XG4gICAgcmV0dXJuIGB0cmFuc2xhdGUke3RyYW5zbGF0aW9ufSgtJHtwb3NpdGlvbn0lKWA7XG4gIH1cblxuICBwcml2YXRlIF9nZXRQcm9wcygpOiB7cHJvcDogc3RyaW5nLCByZW1vdmVQcm9wOiBzdHJpbmd9IHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHJldHVybiB7cHJvcDogJ2hlaWdodCcsIHJlbW92ZVByb3A6ICd3aWR0aCd9O1xuICAgIH1cbiAgICByZXR1cm4ge3Byb3A6ICd3aWR0aCcsIHJlbW92ZVByb3A6ICdoZWlnaHQnfTtcbiAgfVxuXG4gIHByaXZhdGUgX29uU2xpZGVzQ2hhbmdlKCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVNpemUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYm9keSA9PSBudWxsIHx8IHRoaXMucGFnZXMgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBjb25zdCB7cHJvcCwgcmVtb3ZlUHJvcH0gPSB0aGlzLl9nZXRQcm9wcygpO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keS5uYXRpdmVFbGVtZW50LCBwcm9wLCBgJHt0aGlzLnBhZ2VzLmxlbmd0aCAqIDEwMH0lYCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQsIHJlbW92ZVByb3AsIG51bGwpO1xuICAgIGxldCBjdXJQYWdlOiBudW1iZXI7XG4gICAgaWYgKHRoaXMucGFnZXMubGVuZ3RoID09PSAwKSB7XG4gICAgICBjdXJQYWdlID0gLTE7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50UGFnZSA9PT0gLTEpIHtcbiAgICAgIGN1clBhZ2UgPSAwO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIGN1clBhZ2UgPSB0aGlzLnBhZ2VzLmxlbmd0aCAtIDE7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1clBhZ2UgPSB0aGlzLl9jdXJyZW50UGFnZTtcbiAgICB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBjdXJQYWdlO1xuICAgIHRoaXMuX3Jlc3RvcmVDdXJyZW50UGFnZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzdG9yZUN1cnJlbnRQYWdlKCk6IHZvaWQge1xuICAgIHRoaXMuX2RvU2xpZGUodHJ1ZSk7XG4gIH1cbn1cbiJdfQ==