import { EventEmitter, Component, ChangeDetectionStrategy, ViewEncapsulation, ElementRef, Renderer2, ViewChild, Output, Directive, ChangeDetectorRef, ContentChildren, Input, NgModule } from '@angular/core';
import { ResizeSensor } from 'css-element-queries';
import { Subscription } from 'rxjs';
import { debounceTime, map, filter, scan, throttleTime } from 'rxjs/operators';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { animate, style, AnimationBuilder } from '@angular/animations';

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
var AjfPageSliderItem = /** @class */ (function () {
    function AjfPageSliderItem(_el, _renderer) {
        var _this = this;
        this._el = _el;
        this._renderer = _renderer;
        this._scrollEvt = new EventEmitter();
        this.scroll = this._scrollEvt.asObservable();
        this._scrollX = 0;
        this._scrollY = 0;
        this._resizeEvent = new EventEmitter();
        this._resizeSub = Subscription.EMPTY;
        this._resizeSensor = new ResizeSensor(_el.nativeElement, function () { return _this._onResize(); });
        this._resizeSub = this._resizeEvent.pipe(debounceTime(300)).subscribe(function () { return _this._fixScrollOnResize(); });
    }
    AjfPageSliderItem.prototype.ngOnDestroy = function () {
        if (this._resizeSensor) {
            this._resizeSensor.detach();
        }
        this._resizeSub.unsubscribe();
        this._resizeEvent.complete();
    };
    AjfPageSliderItem.prototype.setScroll = function (dir, amount, _duration) {
        if (this._el == null || this.wrapper == null || amount === 0) {
            return false;
        }
        var el = this._el.nativeElement;
        var wrapper = this.wrapper.nativeElement;
        var containerSize, wrapperSize, currentScroll;
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
        this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
        return true;
    };
    AjfPageSliderItem.prototype._onResize = function () {
        this._resizeEvent.emit();
    };
    AjfPageSliderItem.prototype._fixScrollOnResize = function () {
        if (this.content == null || this.wrapper == null) {
            return;
        }
        var content = this.content.nativeElement;
        var wrapper = this.wrapper.nativeElement;
        var maxScrollX = Math.min(0, content.clientWidth - wrapper.clientWidth);
        var maxScrollY = Math.min(0, content.clientHeight - wrapper.clientHeight);
        if (maxScrollX !== 0 || maxScrollY !== 0
            || (maxScrollX === 0 && this._scrollX !== 0)
            || (maxScrollY === 0 && this._scrollY !== 0)) {
            this._scrollX = Math.max(maxScrollX, this._scrollX - (content.scrollLeft != null ? content.scrollLeft : 0));
            this._scrollY = Math.max(maxScrollY, this._scrollY - (content.scrollTop != null ? content.scrollTop : 0));
            content.scrollTop = content.scrollLeft = 0;
            this._renderer.setStyle(wrapper, 'transform', "translate(" + this._scrollX + "px, " + this._scrollY + "px)");
            this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
        }
    };
    AjfPageSliderItem.decorators = [
        { type: Component, args: [{
                    selector: 'ajf-page-slider-item',
                    template: "<div #content class=\"ajf-page-slider-item-content\">\n  <div #wrapper class=\"ajf-page-slider-item-content-wrapper\">\n    <ng-content></ng-content>\n  </div>\n</div>\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                    styles: ["ajf-page-slider-item{display:block;position:relative}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;bottom:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}\n"]
                }] }
    ];
    /** @nocollapse */
    AjfPageSliderItem.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AjfPageSliderItem.propDecorators = {
        wrapper: [{ type: ViewChild, args: ['wrapper', { static: true },] }],
        content: [{ type: ViewChild, args: ['content', { static: true },] }],
        scroll: [{ type: Output }]
    };
    return AjfPageSliderItem;
}());

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
        this._mouseWheelSub = this._mouseWheelEvt.pipe(map(function (evt) {
            var page = _this._getCurrentPage();
            if (page == null) {
                return null;
            }
            return { evt: evt, res: page.setScroll(evt.dir, evt.amount, 0) };
        }), filter(function (r) { return r != null
            && r.res === false
            && ((r.evt.dir === 'x' && _this.orientation === 'horizontal')
                || (r.evt.dir === 'y' && _this.orientation === 'vertical')); }), map(function (r) { return r.evt.amount; }), scan(function (acc, val) {
            if (acc === 0) {
                return val;
            }
            if (acc / Math.abs(acc) !== val / Math.abs(val)) {
                return 0;
            }
            return acc + val;
        }, 0), filter(function (val) { return !_this._animating && Math.abs(val) > 150; }), throttleTime(1500)).subscribe(function (val) {
            _this._mouseWheelEvt.emit({ dir: 'x', amount: val > 0 ? -1 : +1 });
            _this.slide({ dir: val > 0 ? 'back' : 'forward' });
        });
    }
    Object.defineProperty(AjfPageSlider.prototype, "orientation", {
        get: function () { return this._orientation; },
        set: function (orientation) {
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
        get: function () { return this._fixedOrientation; },
        set: function (fixedOrientation) {
            this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfPageSlider.prototype, "currentPage", {
        get: function () { return this._currentPage; },
        set: function (currentPage) {
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
        get: function () { return this._hideNavigationButtons; },
        set: function (hnb) {
            this._hideNavigationButtons = coerceBooleanProperty(hnb);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    AjfPageSlider.prototype.ngAfterContentInit = function () {
        var _this = this;
        this._onSlidesChange();
        this._pagesSub = this.pages.changes.subscribe(function () { return _this._onSlidesChange(); });
    };
    AjfPageSlider.prototype.ngOnDestroy = function () {
        this._pagesSub.unsubscribe();
        this._mouseWheelEvt.complete();
        this._mouseWheelSub.unsubscribe();
        this._orientationChange.complete();
    };
    AjfPageSlider.prototype.switchOrientation = function () {
        if (this._orientation === 'horizontal') {
            this.orientation = 'vertical';
        }
        else {
            this.orientation = 'horizontal';
        }
    };
    AjfPageSlider.prototype.slide = function (opts) {
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
    AjfPageSlider.prototype.onMouseWheel = function (event) {
        var evt = event;
        if (evt.deltaX == null || evt.deltaY == null) {
            return;
        }
        var absDeltaX = Math.abs(evt.deltaX);
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
    AjfPageSlider.prototype.onTouchStart = function (evt) {
        if (evt.touches == null || evt.touches.length === 0 || this._animating) {
            return;
        }
        this._currentOrigin = {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY,
            time: +new Date()
        };
    };
    AjfPageSlider.prototype.onTouchMove = function (evt) {
        if (evt.touches == null || evt.touches.length === 0
            || this._currentOrigin == null || this._animating) {
            return;
        }
        var point = {
            x: evt.touches[0].clientX,
            y: evt.touches[0].clientY,
            time: +new Date()
        };
        var movement = this._calculateMovement(point);
        this._currentOrigin = point;
        if (movement.velocityX === 0 && movement.velocityY === 0) {
            return;
        }
        var absVelocityX = Math.abs(movement.velocityX);
        var absVelocityY = Math.abs(movement.velocityY);
        if (absVelocityX > absVelocityY) {
            if (this.orientation === 'horizontal' && absVelocityX > 1.5 && Math.abs(movement.deltaX) > 50) {
                this._resetCurrentOrigin();
                this.slide({ dir: movement.velocityX < 0 ? 'forward' : 'back' });
            }
            else {
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
                var page = this._getCurrentPage();
                if (page != null) {
                    page.setScroll('y', movement.deltaY, movement.deltaTime);
                }
            }
        }
    };
    AjfPageSlider.prototype.onTouchEnd = function () {
        this._resetCurrentOrigin();
    };
    AjfPageSlider.prototype.isCurrentPageLong = function () {
        var curPage = this._getCurrentPage();
        if (curPage == null) {
            return false;
        }
        return curPage.wrapper.nativeElement.clientHeight > curPage.content.nativeElement.clientHeight;
    };
    AjfPageSlider.prototype._resetCurrentOrigin = function () {
        this._currentOrigin = null;
    };
    AjfPageSlider.prototype._getCurrentPage = function () {
        if (this.pages == null || this.currentPage < 0 || this.currentPage >= this.pages.length) {
            return null;
        }
        return this.pages.toArray()[this.currentPage];
    };
    AjfPageSlider.prototype._calculateMovement = function (point) {
        var deltaX = point.x - this._currentOrigin.x;
        var deltaY = point.y - this._currentOrigin.y;
        var deltaTime = point.time - this._currentOrigin.time;
        return {
            velocityX: deltaX / deltaTime,
            deltaX: deltaX,
            velocityY: deltaY / deltaTime,
            deltaY: deltaY,
            deltaTime: deltaTime,
        };
    };
    AjfPageSlider.prototype._slideBack = function () {
        if (this._currentPage <= 0) {
            return;
        }
        this.currentPage = this._currentPage - 1;
    };
    AjfPageSlider.prototype._slideForward = function () {
        if (this._currentPage >= this.pages.length) {
            return;
        }
        this.currentPage = this._currentPage + 1;
    };
    AjfPageSlider.prototype._slideTo = function (page) {
        if (page >= 0 && page < this.pages.length) {
            this.currentPage = page;
        }
    };
    AjfPageSlider.prototype._doSlide = function (immediate) {
        var _this = this;
        if (immediate === void 0) { immediate = false; }
        if (this.body == null || this.pages == null || this._animating) {
            return;
        }
        this._animating = true;
        var animation = this._animationBuilder.build(animate(immediate ? 0 : this.duration, style({ transform: this._getCurrentTranslation() })));
        var player = animation.create(this.body.nativeElement);
        player.onDone(function () {
            _this._animating = false;
            _this._pageScrollFinish.emit();
        });
        player.play();
    };
    AjfPageSlider.prototype._getCurrentTranslation = function () {
        var slideSize = 100 / this.pages.length;
        var position = this._currentPage === -1 ? 0 : this._currentPage * slideSize;
        var translation = this._orientation === 'vertical' ? 'Y' : 'X';
        return "translate" + translation + "(-" + position + "%)";
    };
    AjfPageSlider.prototype._getProps = function () {
        if (this._orientation === 'vertical') {
            return { prop: 'height', removeProp: 'width' };
        }
        return { prop: 'width', removeProp: 'height' };
    };
    AjfPageSlider.prototype._onSlidesChange = function () {
        this._updateSize();
    };
    AjfPageSlider.prototype._updateSize = function () {
        if (this.body == null || this.pages == null) {
            return;
        }
        var _a = this._getProps(), prop = _a.prop, removeProp = _a.removeProp;
        this._renderer.setStyle(this.body.nativeElement, prop, this.pages.length * 100 + "%");
        this._renderer.setStyle(this.body.nativeElement, removeProp, null);
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
    AjfPageSlider.prototype._restoreCurrentPage = function () {
        this._doSlide(true);
    };
    AjfPageSlider.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfPageSlider.ctorParameters = function () { return [
        { type: AnimationBuilder },
        { type: ChangeDetectorRef },
        { type: Renderer2 }
    ]; };
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
}());

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
                },] }
    ];
    return AjfPageSliderModule;
}());

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfPageSlider, AjfPageSliderItem, AjfPageSliderModule };
//# sourceMappingURL=page-slider.js.map
