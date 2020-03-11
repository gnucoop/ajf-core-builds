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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBbUIsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUMvRixLQUFLLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7OztBQUtyRCxvQkFJQzs7O0lBSEMsa0JBQVU7O0lBQ1Ysa0JBQVU7O0lBQ1YscUJBQWE7Ozs7O0FBR2YsdUJBTUM7OztJQUxDLDZCQUFrQjs7SUFDbEIsNkJBQWtCOztJQUNsQiwwQkFBZTs7SUFDZiwwQkFBZTs7SUFDZiw2QkFBa0I7Ozs7O0FBR3BCLDhCQUdDOzs7SUFGQyw4QkFBZTs7SUFDZixpQ0FBZTs7QUFJakIsTUFBTSxPQUFPLGFBQWE7Ozs7OztJQXVEeEIsWUFDVSxpQkFBbUMsRUFDbkMsSUFBdUIsRUFDdkIsU0FBb0I7UUFGcEIsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFrQjtRQUNuQyxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUN2QixjQUFTLEdB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QUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQztvQkFDaEMsZUFBZSxTQUFDLGlCQUFpQixFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQzsrQkFHdEQsTUFBTTtnQ0FJTixNQUFNO3VCQUdOLEtBQUs7MEJBSUwsS0FBSzsrQkFZTCxLQUFLOzBCQU9MLEtBQUs7b0NBUUwsS0FBSzs7OztJQTFDTiw2QkFBb0Q7O0lBQ3BELDhCQUE2Rjs7Ozs7SUFFN0YsMENBQXlFOztJQUN6RSx5Q0FBOEY7Ozs7O0lBRTlGLDJDQUNpRDs7SUFDakQsMENBQ3lDOztJQUV6QyxpQ0FBd0I7Ozs7O0lBRXhCLHFDQUE4RDs7Ozs7SUFZOUQsMENBQWtDOzs7OztJQU9sQyxxQ0FBMEI7Ozs7O0lBUTFCLCtDQUF3Qzs7Ozs7SUFPeEMsbUNBQTJCOzs7OztJQUMzQixrQ0FBcUQ7Ozs7O0lBRXJELHVDQUFxQzs7Ozs7SUFDckMsdUNBQTRGOzs7OztJQUM1Rix1Q0FBMEQ7Ozs7O0lBR3hELDBDQUEyQzs7Ozs7SUFDM0MsNkJBQStCOzs7OztJQUMvQixrQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHthbmltYXRlLCBBbmltYXRpb25CdWlsZGVyLCBzdHlsZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0FmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgc2NhbiwgdGhyb3R0bGVUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlckl0ZW19IGZyb20gJy4vcGFnZS1zbGlkZXItaXRlbSc7XG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJTbGlkZU9wdGlvbnN9IGZyb20gJy4vcGFnZS1zbGlkZXItc2xpZGUtb3B0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG5cbmludGVyZmFjZSBQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB0aW1lOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBNb3ZlbWVudCB7XG4gIHZlbG9jaXR5WDogbnVtYmVyO1xuICB2ZWxvY2l0eVk6IG51bWJlcjtcbiAgZGVsdGFYOiBudW1iZXI7XG4gIGRlbHRhWTogbnVtYmVyO1xuICBkZWx0YVRpbWU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIE1vdXNoZVdoZWVsTW92ZSB7XG4gIGRpcjogJ3gnIHwgJ3knO1xuICBhbW91bnQ6IG51bWJlcjtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQWpmUGFnZVNsaWRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2JvZHknLCB7c3RhdGljOiB0cnVlfSkgYm9keTogRWxlbWVudFJlZjtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZQYWdlU2xpZGVySXRlbSwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgcGFnZXM6IFF1ZXJ5TGlzdDxBamZQYWdlU2xpZGVySXRlbT47XG5cbiAgcHJpdmF0ZSBfcGFnZVNjcm9sbEZpbmlzaDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcGFnZVNjcm9sbEZpbmlzaDogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2guYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9yaWVudGF0aW9uQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPVxuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMzAwO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gIGdldCBvcmllbnRhdGlvbigpOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24geyByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247IH1cbiAgQElucHV0KCkgc2V0IG9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pIHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gIT09IG9yaWVudGF0aW9uKSB7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgdGhpcy5fcmVzdG9yZUN1cnJlbnRQYWdlKCk7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5lbWl0KHRoaXMuX29yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhlZE9yaWVudGF0aW9uID0gZmFsc2U7XG4gIGdldCBmaXhlZE9yaWVudGF0aW9uKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZml4ZWRPcmllbnRhdGlvbjsgfVxuICBASW5wdXQoKSBzZXQgZml4ZWRPcmllbnRhdGlvbihmaXhlZE9yaWVudGF0aW9uOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZml4ZWRPcmllbnRhdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShmaXhlZE9yaWVudGF0aW9uKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50UGFnZSA9IC0xO1xuICBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlOyB9XG4gIEBJbnB1dCgpIHNldCBjdXJyZW50UGFnZShjdXJyZW50UGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCBjdXJyZW50UGFnZSA8IDAgfHwgY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcbiAgICB0aGlzLl9kb1NsaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW47XG4gIGdldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM7IH1cbiAgQElucHV0KCkgc2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyhobmI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaG5iKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcGFnZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9jdXJyZW50T3JpZ2luOiBQb2ludCB8IG51bGw7XG4gIHByaXZhdGUgX21vdXNlV2hlZWxFdnQ6IEV2ZW50RW1pdHRlcjxNb3VzaGVXaGVlbE1vdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzaGVXaGVlbE1vdmU+KCk7XG4gIHByaXZhdGUgX21vdXNlV2hlZWxTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9hbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLFxuICAgIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICB0aGlzLl9tb3VzZVdoZWVsU3ViID0gdGhpcy5fbW91c2VXaGVlbEV2dC5waXBlKFxuICAgICAgbWFwKGV2dCA9PiB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSA9PSBudWxsKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIHJldHVybiB7ZXZ0LCByZXM6IHBhZ2Uuc2V0U2Nyb2xsKGV2dC5kaXIsIGV2dC5hbW91bnQsIDApfTtcbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKHIgPT4gciAhPSBudWxsXG4gICAgICAgICYmIHIucmVzID09PSBmYWxzZVxuICAgICAgICAmJiAoXG4gICAgICAgICAgKHIuZXZ0LmRpciA9PT0gJ3gnICYmIHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJylcbiAgICAgICAgICB8fCAoci5ldnQuZGlyID09PSAneScgJiYgdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJylcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIG1hcChyID0+IHIhLmV2dC5hbW91bnQpLFxuICAgICAgc2NhbigoYWNjLCB2YWwpID0+IHtcbiAgICAgICAgaWYgKGFjYyA9PT0gMCkgeyByZXR1cm4gdmFsOyB9XG4gICAgICAgIGlmIChhY2MgLyBNYXRoLmFicyhhY2MpICE9PSB2YWwgLyBNYXRoLmFicyh2YWwpKSB7cmV0dXJuIDA7IH1cbiAgICAgICAgcmV0dXJuIGFjYyArIHZhbDtcbiAgICAgIH0sIDApLFxuICAgICAgZmlsdGVyKHZhbCA9PiAhdGhpcy5fYW5pbWF0aW5nICYmIE1hdGguYWJzKHZhbCkgPiAxNTApLFxuICAgICAgdGhyb3R0bGVUaW1lKDE1MDApLFxuICAgICkuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3gnLCBhbW91bnQ6IHZhbCA+IDAgPyAtMSA6ICsgMX0pO1xuICAgICAgdGhpcy5zbGlkZSh7ZGlyOiB2YWwgPiAwID8gJ2JhY2snIDogJ2ZvcndhcmQnfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25TbGlkZXNDaGFuZ2UoKTtcbiAgICB0aGlzLl9wYWdlc1N1YiA9IHRoaXMucGFnZXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25TbGlkZXNDaGFuZ2UoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYWdlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9tb3VzZVdoZWVsU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIHN3aXRjaE9yaWVudGF0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICB9XG4gIH1cblxuICBzbGlkZShvcHRzOiBBamZQYWdlU2xpZGVyU2xpZGVPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBpZiAob3B0cy5kaXIpIHtcbiAgICAgIGlmIChvcHRzLmRpciA9PT0gJ2JhY2snIHx8IG9wdHMuZGlyID09PSAndXAnIHx8IG9wdHMuZGlyID09PSAnbGVmdCcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVCYWNrKCk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZGlyID09PSAnZm9yd2FyZCcgfHwgb3B0cy5kaXIgPT09ICdkb3duJyB8fCBvcHRzLmRpciA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICB0aGlzLl9zbGlkZUZvcndhcmQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdHMudG8pIHtcbiAgICAgIHRoaXMuX3NsaWRlVG8ob3B0cy50byk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVdoZWVsKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGV2dCA9IGV2ZW50IGFzIFdoZWVsRXZlbnQ7XG4gICAgaWYgKGV2dC5kZWx0YVggPT0gbnVsbCB8fCBldnQuZGVsdGFZID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgYWJzRGVsdGFYID0gTWF0aC5hYnMoZXZ0LmRlbHRhWCk7XG4gICAgY29uc3QgYWJzRGVsdGFZID0gTWF0aC5hYnMoZXZ0LmRlbHRhWSk7XG4gICAgaWYgKGFic0RlbHRhWCA9PT0gMCAmJiBhYnNEZWx0YVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgaWYgKGFic0RlbHRhWCA+IGFic0RlbHRhWSkge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd4JywgYW1vdW50OiAtZXZ0LmRlbHRhWH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3knLCBhbW91bnQ6IC1ldnQuZGVsdGFZfSk7XG4gICAgfVxuICB9XG5cbiAgb25Ub3VjaFN0YXJ0KGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQudG91Y2hlcyA9PSBudWxsIHx8IGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLl9hbmltYXRpbmcpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IHtcbiAgICAgIHg6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICB5OiBldnQudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgdGltZTogKyBuZXcgRGF0ZSgpXG4gICAgfTtcbiAgfVxuXG4gIG9uVG91Y2hNb3ZlKGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGV2dC50b3VjaGVzID09IG51bGwgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoID09PSAwXG4gICAgICB8fCB0aGlzLl9jdXJyZW50T3JpZ2luID09IG51bGwgfHwgdGhpcy5fYW5pbWF0aW5nXG4gICAgKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IHBvaW50OiBQb2ludCA9IHtcbiAgICAgIHg6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICB5OiBldnQudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgdGltZTogKyBuZXcgRGF0ZSgpXG4gICAgfTtcbiAgICBjb25zdCBtb3ZlbWVudCA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVtZW50KHBvaW50KTtcbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0gcG9pbnQ7XG5cbiAgICBpZiAobW92ZW1lbnQudmVsb2NpdHlYID09PSAwICYmIG1vdmVtZW50LnZlbG9jaXR5WSA9PT0gMCkgeyByZXR1cm47IH1cbiAgICBjb25zdCBhYnNWZWxvY2l0eVggPSBNYXRoLmFicyhtb3ZlbWVudC52ZWxvY2l0eVgpO1xuICAgIGNvbnN0IGFic1ZlbG9jaXR5WSA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WSk7XG4gICAgaWYgKGFic1ZlbG9jaXR5WCA+IGFic1ZlbG9jaXR5WSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgYWJzVmVsb2NpdHlYID4gMS41ICYmIE1hdGguYWJzKG1vdmVtZW50LmRlbHRhWCkgPiA1MFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IG1vdmVtZW50LnZlbG9jaXR5WCA8IDAgPyAnZm9yd2FyZCcgOiAnYmFjayd9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgcGFnZS5zZXRTY3JvbGwoJ3gnLCBtb3ZlbWVudC5kZWx0YVgsIG1vdmVtZW50LmRlbHRhVGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnICYmIGFic1ZlbG9jaXR5WSA+IDEuNSAmJiBNYXRoLmFicyhtb3ZlbWVudC5kZWx0YVkpID4gNTBcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgICAgICAgdGhpcy5zbGlkZSh7ZGlyOiBtb3ZlbWVudC52ZWxvY2l0eVkgPCAwID8gJ2ZvcndhcmQnIDogJ2JhY2snfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgIHBhZ2Uuc2V0U2Nyb2xsKCd5JywgbW92ZW1lbnQuZGVsdGFZLCBtb3ZlbWVudC5kZWx0YVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Ub3VjaEVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgfVxuXG4gIGlzQ3VycmVudFBhZ2VMb25nKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGN1clBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgIGlmIChjdXJQYWdlID09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgcmV0dXJuIGN1clBhZ2Uud3JhcHBlci5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCA+IGN1clBhZ2UuY29udGVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0Q3VycmVudE9yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEN1cnJlbnRQYWdlKCk6IEFqZlBhZ2VTbGlkZXJJdGVtIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCB0aGlzLmN1cnJlbnRQYWdlIDwgMCB8fCB0aGlzLmN1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFnZXMudG9BcnJheSgpW3RoaXMuY3VycmVudFBhZ2VdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQ6IFBvaW50KTogTW92ZW1lbnQge1xuICAgIGNvbnN0IGRlbHRhWCA9IHBvaW50LnggLSB0aGlzLl9jdXJyZW50T3JpZ2luIS54O1xuICAgIGNvbnN0IGRlbHRhWSA9IHBvaW50LnkgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS55O1xuICAgIGNvbnN0IGRlbHRhVGltZSA9IHBvaW50LnRpbWUgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS50aW1lO1xuICAgIHJldHVybiB7XG4gICAgICB2ZWxvY2l0eVg6IGRlbHRhWCAvIGRlbHRhVGltZSxcbiAgICAgIGRlbHRhWCxcbiAgICAgIHZlbG9jaXR5WTogZGVsdGFZIC8gZGVsdGFUaW1lLFxuICAgICAgZGVsdGFZLFxuICAgICAgZGVsdGFUaW1lLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZUJhY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQYWdlIDw9IDApIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlRm9yd2FyZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlICsgMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlVG8ocGFnZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHBhZ2UgPj0gMCAmJiBwYWdlIDwgdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RvU2xpZGUoaW1tZWRpYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsIHx8IHRoaXMuX2FuaW1hdGluZykgeyByZXR1cm47IH1cbiAgICB0aGlzLl9hbmltYXRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuX2FuaW1hdGlvbkJ1aWxkZXIuYnVpbGQoYW5pbWF0ZShcbiAgICAgIGltbWVkaWF0ZSA/IDAgOiB0aGlzLmR1cmF0aW9uLFxuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogdGhpcy5fZ2V0Q3VycmVudFRyYW5zbGF0aW9uKCl9KVxuICAgICkpO1xuXG4gICAgY29uc3QgcGxheWVyID0gYW5pbWF0aW9uLmNyZWF0ZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCk7XG4gICAgcGxheWVyLm9uRG9uZSgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2guZW1pdCgpO1xuICAgIH0pO1xuICAgIHBsYXllci5wbGF5KCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDdXJyZW50VHJhbnNsYXRpb24oKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZVNpemUgPSAxMDAgLyB0aGlzLnBhZ2VzLmxlbmd0aDtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuX2N1cnJlbnRQYWdlID09PSAtMSA/IDAgOiB0aGlzLl9jdXJyZW50UGFnZSAqIHNsaWRlU2l6ZTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ1knIDogJ1gnO1xuICAgIHJldHVybiBgdHJhbnNsYXRlJHt0cmFuc2xhdGlvbn0oLSR7cG9zaXRpb259JSlgO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJvcHMoKToge3Byb3A6IHN0cmluZywgcmVtb3ZlUHJvcDogc3RyaW5nfSB7XG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm4ge3Byb3A6ICdoZWlnaHQnLCByZW1vdmVQcm9wOiAnd2lkdGgnfTtcbiAgICB9XG4gICAgcmV0dXJuIHtwcm9wOiAnd2lkdGgnLCByZW1vdmVQcm9wOiAnaGVpZ2h0J307XG4gIH1cblxuICBwcml2YXRlIF9vblNsaWRlc0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJvZHkgPT0gbnVsbCB8fCB0aGlzLnBhZ2VzID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgY29uc3Qge3Byb3AsIHJlbW92ZVByb3B9ID0gdGhpcy5fZ2V0UHJvcHMoKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCwgcHJvcCwgYCR7dGhpcy5wYWdlcy5sZW5ndGggKiAxMDB9JWApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keS5uYXRpdmVFbGVtZW50LCByZW1vdmVQcm9wLCBudWxsKTtcbiAgICBsZXQgY3VyUGFnZTogbnVtYmVyO1xuICAgIGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY3VyUGFnZSA9IC0xO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFBhZ2UgPT09IC0xKSB7XG4gICAgICBjdXJQYWdlID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5wYWdlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5fY3VycmVudFBhZ2U7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VyUGFnZTtcbiAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc3RvcmVDdXJyZW50UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kb1NsaWRlKHRydWUpO1xuICB9XG59XG4iXX0=