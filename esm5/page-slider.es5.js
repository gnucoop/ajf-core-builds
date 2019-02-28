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
import { Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, ViewChild, EventEmitter, NgModule } from '@angular/core';
import { debounceTime, map, filter, scan, throttleTime } from 'rxjs/operators';
import { ResizeSensor } from 'css-element-queries';
import { animate, style } from '@angular/animations';
import { Subscription } from 'rxjs';
import { coerceBooleanProperty } from '@ajf/core/utils';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfPageSliderItem = /** @class */ (function () {
    // private _player: AnimationPlayer | null;
    function AjfPageSliderItem(_el, _renderer) {
        var _this = this;
        this._el = _el;
        this._renderer = _renderer;
        this._scrollX = 0;
        this._scrollY = 0;
        this._resizeEvent = new EventEmitter();
        this._resizeSensor = new ResizeSensor(_el.nativeElement, (/**
         * @return {?}
         */
        function () { return _this._onResize(); }));
        this._resizeSub = this._resizeEvent.pipe(debounceTime(300)).subscribe((/**
         * @return {?}
         */
        function () { return _this._fixScrollOnResize(); }));
    }
    /**
     * @return {?}
     */
    AjfPageSliderItem.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (this._resizeSensor) {
            this._resizeSensor.detach();
        }
        this._resizeSub.unsubscribe();
        this._resizeEvent.complete();
    };
    /**
     * @param {?} dir
     * @param {?} amount
     * @param {?} _duration
     * @return {?}
     */
    AjfPageSliderItem.prototype.setScroll = /**
     * @param {?} dir
     * @param {?} amount
     * @param {?} _duration
     * @return {?}
     */
    function (dir, amount, _duration) {
        if (this._el == null || this.wrapper == null || amount === 0) {
            return false;
        }
        /** @type {?} */
        var el = this._el.nativeElement;
        /** @type {?} */
        var wrapper = this.wrapper.nativeElement;
        /** @type {?} */
        var containerSize;
        /** @type {?} */
        var wrapperSize;
        /** @type {?} */
        var currentScroll;
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
        var maxScroll = containerSize - wrapperSize;
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
        this._renderer.setStyle(wrapper, 'transform', "translate(" + this._scrollX + "px, " + this._scrollY + "px)");
        // this._animateScroll(duration);
        return true;
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSliderItem.prototype._onResize = /**
     * @private
     * @return {?}
     */
    function () {
        this._resizeEvent.emit();
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSliderItem.prototype._fixScrollOnResize = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.content == null || this.wrapper == null) {
            return;
        }
        /** @type {?} */
        var content = this.content.nativeElement;
        /** @type {?} */
        var wrapper = this.wrapper.nativeElement;
        /** @type {?} */
        var maxScrollX = Math.min(0, content.clientWidth - wrapper.clientWidth);
        /** @type {?} */
        var maxScrollY = Math.min(0, content.clientHeight - wrapper.clientHeight);
        if (maxScrollX !== 0 || maxScrollY !== 0
            || (maxScrollX === 0 && this._scrollX !== 0)
            || (maxScrollY === 0 && this._scrollY !== 0)) {
            this._scrollX = Math.max(maxScrollX, this._scrollX - (content.scrollLeft != null ? content.scrollLeft : 0));
            this._scrollY = Math.max(maxScrollY, this._scrollY - (content.scrollTop != null ? content.scrollTop : 0));
            content.scrollTop = content.scrollLeft = 0;
            this._renderer.setStyle(wrapper, 'transform', "translate(" + this._scrollX + "px, " + this._scrollY + "px)");
            // this._animateScroll(0);
        }
    };
    AjfPageSliderItem.decorators = [
        { type: Component, args: [{selector: 'ajf-page-slider-item',
                    template: "<div #content class=\"ajf-page-slider-item-content\"><div #wrapper class=\"ajf-page-slider-item-content-wrapper\"><ng-content></ng-content></div></div>",
                    styles: ["ajf-page-slider-item{display:block;position:relative}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;bottom:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}"],
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    /** @nocollapse */
    AjfPageSliderItem.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AjfPageSliderItem.propDecorators = {
        wrapper: [{ type: ViewChild, args: ['wrapper',] }],
        content: [{ type: ViewChild, args: ['content',] }]
    };
    return AjfPageSliderItem;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfPageSlider = /** @class */ (function () {
    function AjfPageSlider(_animationBuilder, _cdr, _renderer) {
        var _this = this;
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
        function (evt) {
            /** @type {?} */
            var page = _this._getCurrentPage();
            if (page == null) {
                return null;
            }
            return { evt: evt, res: page.setScroll(evt.dir, evt.amount, 0) };
        })), filter((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return r != null
            && r.res === false
            && ((r.evt.dir === 'x' && _this.orientation === 'horizontal')
                || (r.evt.dir === 'y' && _this.orientation === 'vertical')); })), map((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return (/** @type {?} */ (r)).evt.amount; })), scan((/**
         * @param {?} acc
         * @param {?} val
         * @return {?}
         */
        function (acc, val) {
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
        function (val) { return !_this._animating && Math.abs(val) > 150; })), throttleTime(1500)).subscribe((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            _this._mouseWheelEvt.emit({ dir: 'x', amount: val > 0 ? -1 : +1 });
            _this.slide({ dir: val > 0 ? 'back' : 'forward' });
        }));
    }
    Object.defineProperty(AjfPageSlider.prototype, "orientation", {
        get: /**
         * @return {?}
         */
        function () { return this._orientation; },
        set: /**
         * @param {?} orientation
         * @return {?}
         */
        function (orientation) {
            if (this._orientation !== orientation) {
                this._orientation = orientation;
                this._cdr.markForCheck();
                this._updateSize();
                this._restoreCurrentPage();
                this._orientationChange.emit(this._orientation);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfPageSlider.prototype, "fixedOrientation", {
        get: /**
         * @return {?}
         */
        function () { return this._fixedOrientation; },
        set: /**
         * @param {?} fixedOrientation
         * @return {?}
         */
        function (fixedOrientation) {
            this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfPageSlider.prototype, "currentPage", {
        get: /**
         * @return {?}
         */
        function () { return this._currentPage; },
        set: /**
         * @param {?} currentPage
         * @return {?}
         */
        function (currentPage) {
            if (this.pages == null || currentPage < 0 || currentPage >= this.pages.length) {
                return;
            }
            this._currentPage = currentPage;
            this._doSlide();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfPageSlider.prototype, "hideNavigationButtons", {
        get: /**
         * @return {?}
         */
        function () { return this._hideNavigationButtons; },
        set: /**
         * @param {?} hnb
         * @return {?}
         */
        function (hnb) {
            this._hideNavigationButtons = coerceBooleanProperty(hnb);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfPageSlider.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this._onSlidesChange();
        this._pagesSub = this.pages.changes.subscribe((/**
         * @return {?}
         */
        function () { return _this._onSlidesChange(); }));
    };
    /**
     * @return {?}
     */
    AjfPageSlider.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._pagesSub.unsubscribe();
        this._mouseWheelEvt.complete();
        this._mouseWheelSub.unsubscribe();
        this._orientationChange.complete();
    };
    /**
     * @return {?}
     */
    AjfPageSlider.prototype.switchOrientation = /**
     * @return {?}
     */
    function () {
        if (this._orientation === 'horizontal') {
            this.orientation = 'vertical';
        }
        else {
            this.orientation = 'horizontal';
        }
    };
    /**
     * @param {?} opts
     * @return {?}
     */
    AjfPageSlider.prototype.slide = /**
     * @param {?} opts
     * @return {?}
     */
    function (opts) {
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
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    AjfPageSlider.prototype.onMouseWheel = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        /** @type {?} */
        var absDeltaX = Math.abs(evt.deltaX);
        /** @type {?} */
        var absDeltaY = Math.abs(evt.deltaY);
        if (absDeltaX === 0 && absDeltaY === 0) {
            return;
        }
        if (absDeltaX > absDeltaY) {
            this._mouseWheelEvt.emit({ dir: 'x', amount: -evt.deltaX });
        }
        else {
            this._mouseWheelEvt.emit({ dir: 'y', amount: -evt.deltaY });
        }
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    AjfPageSlider.prototype.onTouchStart = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        if (evt.touches == null || evt.touches.length === 0 || this._animating) {
            return;
        }
        this._currentOrigin = {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY,
            time: +new Date()
        };
    };
    /**
     * @param {?} evt
     * @return {?}
     */
    AjfPageSlider.prototype.onTouchMove = /**
     * @param {?} evt
     * @return {?}
     */
    function (evt) {
        if (evt.touches == null || evt.touches.length === 0
            || this._currentOrigin == null || this._animating) {
            return;
        }
        /** @type {?} */
        var point = {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY,
            time: +new Date()
        };
        /** @type {?} */
        var movement = this._calculateMovement(point);
        this._currentOrigin = point;
        if (movement.velocityX === 0 && movement.velocityY === 0) {
            return;
        }
        /** @type {?} */
        var absVelocityX = Math.abs(movement.velocityX);
        /** @type {?} */
        var absVelocityY = Math.abs(movement.velocityY);
        if (absVelocityX > absVelocityY) {
            if (this.orientation === 'horizontal' && absVelocityX > 1.5 && Math.abs(movement.deltaX) > 50) {
                this._resetCurrentOrigin();
                this.slide({ dir: movement.velocityX < 0 ? 'forward' : 'back' });
            }
            else {
                /** @type {?} */
                var page = this._getCurrentPage();
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
                var page = this._getCurrentPage();
                if (page != null) {
                    page.setScroll('y', movement.deltaY, movement.deltaTime);
                }
            }
        }
    };
    /**
     * @return {?}
     */
    AjfPageSlider.prototype.onTouchEnd = /**
     * @return {?}
     */
    function () {
        this._resetCurrentOrigin();
    };
    /**
     * @return {?}
     */
    AjfPageSlider.prototype.isCurrentPageLong = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var curPage = this._getCurrentPage();
        if (curPage == null) {
            return false;
        }
        return curPage.wrapper.nativeElement.clientHeight > curPage.content.nativeElement.clientHeight;
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSlider.prototype._resetCurrentOrigin = /**
     * @private
     * @return {?}
     */
    function () {
        this._currentOrigin = null;
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSlider.prototype._getCurrentPage = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.pages == null || this.currentPage < 0 || this.currentPage >= this.pages.length) {
            return null;
        }
        return this.pages.toArray()[this.currentPage];
    };
    /**
     * @private
     * @param {?} point
     * @return {?}
     */
    AjfPageSlider.prototype._calculateMovement = /**
     * @private
     * @param {?} point
     * @return {?}
     */
    function (point) {
        /** @type {?} */
        var deltaX = point.x - (/** @type {?} */ (this._currentOrigin)).x;
        /** @type {?} */
        var deltaY = point.y - (/** @type {?} */ (this._currentOrigin)).y;
        /** @type {?} */
        var deltaTime = point.time - (/** @type {?} */ (this._currentOrigin)).time;
        return {
            velocityX: deltaX / deltaTime,
            deltaX: deltaX,
            velocityY: deltaY / deltaTime,
            deltaY: deltaY,
            deltaTime: deltaTime,
        };
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSlider.prototype._slideBack = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._currentPage <= 0) {
            return;
        }
        this.currentPage = this._currentPage - 1;
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSlider.prototype._slideForward = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._currentPage >= this.pages.length) {
            return;
        }
        this.currentPage = this._currentPage + 1;
    };
    /**
     * @private
     * @param {?} page
     * @return {?}
     */
    AjfPageSlider.prototype._slideTo = /**
     * @private
     * @param {?} page
     * @return {?}
     */
    function (page) {
        if (page >= 0 && page < this.pages.length) {
            this.currentPage = page;
        }
    };
    /**
     * @private
     * @param {?=} immediate
     * @return {?}
     */
    AjfPageSlider.prototype._doSlide = /**
     * @private
     * @param {?=} immediate
     * @return {?}
     */
    function (immediate) {
        var _this = this;
        if (immediate === void 0) { immediate = false; }
        if (this.body == null || this.pages == null || this._animating) {
            return;
        }
        this._animating = true;
        /** @type {?} */
        var animation = this._animationBuilder.build(animate(immediate ? 0 : this.duration, style({ transform: this._getCurrentTranslation() })));
        /** @type {?} */
        var player = animation.create(this.body.nativeElement);
        player.onDone((/**
         * @return {?}
         */
        function () {
            _this._animating = false;
            _this._pageScrollFinish.emit();
        }));
        player.play();
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSlider.prototype._getCurrentTranslation = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var slideSize = 100 / this.pages.length;
        /** @type {?} */
        var position = this._currentPage === -1 ? 0 : this._currentPage * slideSize;
        /** @type {?} */
        var translation = this._orientation === 'vertical' ? 'Y' : 'X';
        return "translate" + translation + "(-" + position + "%)";
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSlider.prototype._getProps = /**
     * @private
     * @return {?}
     */
    function () {
        if (this._orientation === 'vertical') {
            return { prop: 'height', removeProp: 'width' };
        }
        return { prop: 'width', removeProp: 'height' };
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSlider.prototype._onSlidesChange = /**
     * @private
     * @return {?}
     */
    function () {
        this._updateSize();
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSlider.prototype._updateSize = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.body == null || this.pages == null) {
            return;
        }
        var _a = this._getProps(), prop = _a.prop, removeProp = _a.removeProp;
        this._renderer.setStyle(this.body.nativeElement, prop, this.pages.length * 100 + "%");
        this._renderer.setStyle(this.body.nativeElement, removeProp, null);
        /** @type {?} */
        var curPage;
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
    };
    /**
     * @private
     * @return {?}
     */
    AjfPageSlider.prototype._restoreCurrentPage = /**
     * @private
     * @return {?}
     */
    function () {
        this._doSlide(true);
    };
    return AjfPageSlider;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfPageSliderModule = /** @class */ (function () {
    function AjfPageSliderModule() {
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
    return AjfPageSliderModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

export { AjfPageSliderItem, AjfPageSlider, AjfPageSliderModule };
//# sourceMappingURL=page-slider.es5.js.map
