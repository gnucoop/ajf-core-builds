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
import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, ViewChild, Output, NgModule } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { Subscription } from 'rxjs';
import { debounceTime, map, filter, scan, throttleTime } from 'rxjs/operators';
import { animate, style } from '@angular/animations';
import { coerceBooleanProperty } from '@ajf/core/utils';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfPageSliderItem {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._scrollEvt = new EventEmitter();
        this.scroll = this._scrollEvt.asObservable();
        this._scrollX = 0;
        this._scrollY = 0;
        this._resizeEvent = new EventEmitter();
        this._resizeSub = Subscription.EMPTY;
        this._resizeSensor = new ResizeSensor(_el.nativeElement, (/**
         * @return {?}
         */
        () => this._onResize()));
        this._resizeSub = this._resizeEvent.pipe(debounceTime(300)).subscribe((/**
         * @return {?}
         */
        () => this._fixScrollOnResize()));
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        if (this._resizeSensor) {
            this._resizeSensor.detach();
        }
        this._resizeSub.unsubscribe();
        this._resizeEvent.complete();
    }
    /**
     * @param {?} dir
     * @param {?} amount
     * @param {?} _duration
     * @return {?}
     */
    setScroll(dir, amount, _duration) {
        if (this._el == null || this.wrapper == null || amount === 0) {
            return false;
        }
        /** @type {?} */
        const el = this._el.nativeElement;
        /** @type {?} */
        const wrapper = this.wrapper.nativeElement;
        /** @type {?} */
        let containerSize;
        /** @type {?} */
        let wrapperSize;
        /** @type {?} */
        let currentScroll;
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
        /** @type {?} */
        const maxScroll = containerSize - wrapperSize;
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
        this._renderer.setStyle(wrapper, 'transform', `translate(${this._scrollX}px, ${this._scrollY}px)`);
        this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
        return true;
    }
    /**
     * @private
     * @return {?}
     */
    _onResize() {
        this._resizeEvent.emit();
    }
    /**
     * @private
     * @return {?}
     */
    _fixScrollOnResize() {
        if (this.content == null || this.wrapper == null) {
            return;
        }
        /** @type {?} */
        const content = this.content.nativeElement;
        /** @type {?} */
        const wrapper = this.wrapper.nativeElement;
        /** @type {?} */
        const maxScrollX = Math.min(0, content.clientWidth - wrapper.clientWidth);
        /** @type {?} */
        const maxScrollY = Math.min(0, content.clientHeight - wrapper.clientHeight);
        if (maxScrollX !== 0 || maxScrollY !== 0
            || (maxScrollX === 0 && this._scrollX !== 0)
            || (maxScrollY === 0 && this._scrollY !== 0)) {
            this._scrollX = Math.max(maxScrollX, this._scrollX - (content.scrollLeft != null ? content.scrollLeft : 0));
            this._scrollY = Math.max(maxScrollY, this._scrollY - (content.scrollTop != null ? content.scrollTop : 0));
            content.scrollTop = content.scrollLeft = 0;
            this._renderer.setStyle(wrapper, 'transform', `translate(${this._scrollX}px, ${this._scrollY}px)`);
            this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
        }
    }
}
AjfPageSliderItem.decorators = [
    { type: Component, args: [{selector: 'ajf-page-slider-item',
                template: "<div #content class=\"ajf-page-slider-item-content\"><div #wrapper class=\"ajf-page-slider-item-content-wrapper\"><ng-content></ng-content></div></div>",
                styles: ["ajf-page-slider-item{display:block;position:relative}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;bottom:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}"],
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
/** @nocollapse */
AjfPageSliderItem.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
AjfPageSliderItem.propDecorators = {
    wrapper: [{ type: ViewChild, args: ['wrapper', { static: true },] }],
    content: [{ type: ViewChild, args: ['content', { static: true },] }],
    scroll: [{ type: Output }]
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfPageSlider {
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
     * @param {?} evt
     * @return {?}
     */
    onMouseWheel(evt) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfPageSliderModule {
}
AjfPageSliderModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AjfPageSliderItem,
                ],
                exports: [
                    AjfPageSliderItem,
                ]
            },] },
];

export { AjfPageSlider, AjfPageSliderItem, AjfPageSliderModule };
//# sourceMappingURL=page-slider.js.map
