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
export { AjfPageSlider };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBbUIsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUMvRixLQUFLLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQXdCckQ7SUF3REUsdUJBQ1UsaUJBQW1DLEVBQ25DLElBQXVCLEVBQ3ZCLFNBQW9CO1FBSDlCLGlCQThCQztRQTdCUyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUF0RHRCLHNCQUFpQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3RELHFCQUFnQixHQUFxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdEYsdUJBQWtCLEdBQ3RCLElBQUksWUFBWSxFQUE0QixDQUFDO1FBQzlCLHNCQUFpQixHQUNs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QUNQLGlCQUFpQjtnQkFDSixTQUFTOzs7dUJBOEI3QyxTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt3QkFDaEMsZUFBZSxTQUFDLGlCQUFpQixFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQzttQ0FHdEQsTUFBTTtvQ0FJTixNQUFNOzJCQUdOLEtBQUs7OEJBSUwsS0FBSzttQ0FZTCxLQUFLOzhCQU9MLEtBQUs7d0NBUUwsS0FBSzs7SUF3UFIsb0JBQUM7Q0FBQSxBQXBTRCxJQW9TQztTQW5TWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7YW5pbWF0ZSwgQW5pbWF0aW9uQnVpbGRlciwgc3R5bGV9IGZyb20gJ0Bhbmd1bGFyL2FuaW1hdGlvbnMnO1xuaW1wb3J0IHtBZnRlckNvbnRlbnRJbml0LCBDaGFuZ2VEZXRlY3RvclJlZiwgQ29udGVudENoaWxkcmVuLCBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFJlbmRlcmVyMiwgVmlld0NoaWxkfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyLCBtYXAsIHNjYW4sIHRocm90dGxlVGltZX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJJdGVtfSBmcm9tICcuL3BhZ2Utc2xpZGVyLWl0ZW0nO1xuaW1wb3J0IHtBamZQYWdlU2xpZGVyU2xpZGVPcHRpb25zfSBmcm9tICcuL3BhZ2Utc2xpZGVyLXNsaWRlLW9wdGlvbnMnO1xuXG5leHBvcnQgdHlwZSBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCcgfCAndmVydGljYWwnO1xuXG5pbnRlcmZhY2UgUG9pbnQge1xuICB4OiBudW1iZXI7XG4gIHk6IG51bWJlcjtcbiAgdGltZTogbnVtYmVyO1xufVxuXG5pbnRlcmZhY2UgTW92ZW1lbnQge1xuICB2ZWxvY2l0eVg6IG51bWJlcjtcbiAgdmVsb2NpdHlZOiBudW1iZXI7XG4gIGRlbHRhWDogbnVtYmVyO1xuICBkZWx0YVk6IG51bWJlcjtcbiAgZGVsdGFUaW1lOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBNb3VzaGVXaGVlbE1vdmUge1xuICBkaXI6ICd4JyB8ICd5JztcbiAgYW1vdW50OiBudW1iZXI7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEFqZlBhZ2VTbGlkZXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBPbkRlc3Ryb3kge1xuICBAVmlld0NoaWxkKCdib2R5Jywge3N0YXRpYzogdHJ1ZX0pIGJvZHk6IEVsZW1lbnRSZWY7XG4gIEBDb250ZW50Q2hpbGRyZW4oQWpmUGFnZVNsaWRlckl0ZW0sIHtkZXNjZW5kYW50czogdHJ1ZX0pIHBhZ2VzOiBRdWVyeUxpc3Q8QWpmUGFnZVNsaWRlckl0ZW0+O1xuXG4gIHByaXZhdGUgX3BhZ2VTY3JvbGxGaW5pc2g6IEV2ZW50RW1pdHRlcjx2b2lkPiA9IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHBhZ2VTY3JvbGxGaW5pc2g6IE9ic2VydmFibGU8dm9pZD4gPSB0aGlzLl9wYWdlU2Nyb2xsRmluaXNoLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPlxuICAgID0gbmV3IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBvcmllbnRhdGlvbkNoYW5nZTogT2JzZXJ2YWJsZTxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBASW5wdXQoKSBkdXJhdGlvbiA9IDMwMDtcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICBnZXQgb3JpZW50YXRpb24oKTogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uIHsgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uOyB9XG4gIEBJbnB1dCgpIHNldCBvcmllbnRhdGlvbihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKSB7XG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uICE9PSBvcmllbnRhdGlvbikge1xuICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX3VwZGF0ZVNpemUoKTtcbiAgICAgIHRoaXMuX3Jlc3RvcmVDdXJyZW50UGFnZSgpO1xuICAgICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuZW1pdCh0aGlzLl9vcmllbnRhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZml4ZWRPcmllbnRhdGlvbiA9IGZhbHNlO1xuICBnZXQgZml4ZWRPcmllbnRhdGlvbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZpeGVkT3JpZW50YXRpb247IH1cbiAgQElucHV0KCkgc2V0IGZpeGVkT3JpZW50YXRpb24oZml4ZWRPcmllbnRhdGlvbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpeGVkT3JpZW50YXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZml4ZWRPcmllbnRhdGlvbik7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3VycmVudFBhZ2UgPSAtMTtcbiAgZ2V0IGN1cnJlbnRQYWdlKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9jdXJyZW50UGFnZTsgfVxuICBASW5wdXQoKSBzZXQgY3VycmVudFBhZ2UoY3VycmVudFBhZ2U6IG51bWJlcikge1xuICAgIGlmICh0aGlzLnBhZ2VzID09IG51bGwgfHwgY3VycmVudFBhZ2UgPCAwIHx8IGN1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VycmVudFBhZ2U7XG4gICAgdGhpcy5fZG9TbGlkZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZU5hdmlnYXRpb25CdXR0b25zOiBib29sZWFuO1xuICBnZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zOyB9XG4gIEBJbnB1dCgpIHNldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoaG5iOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhuYik7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYW5pbWF0aW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX3BhZ2VzU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfY3VycmVudE9yaWdpbjogUG9pbnQgfCBudWxsO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsRXZ0OiBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPiA9IG5ldyBFdmVudEVtaXR0ZXI8TW91c2hlV2hlZWxNb3ZlPigpO1xuICBwcml2YXRlIF9tb3VzZVdoZWVsU3ViOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfYW5pbWF0aW9uQnVpbGRlcjogQW5pbWF0aW9uQnVpbGRlcixcbiAgICBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjJcbiAgKSB7XG4gICAgdGhpcy5fbW91c2VXaGVlbFN1YiA9IHRoaXMuX21vdXNlV2hlZWxFdnQucGlwZShcbiAgICAgIG1hcChldnQgPT4ge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgPT0gbnVsbCkgeyByZXR1cm4gbnVsbDsgfVxuICAgICAgICByZXR1cm4ge2V2dCwgcmVzOiBwYWdlLnNldFNjcm9sbChldnQuZGlyLCBldnQuYW1vdW50LCAwKX07XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcihyID0+IHIgIT0gbnVsbFxuICAgICAgICAmJiByLnJlcyA9PT0gZmFsc2VcbiAgICAgICAgJiYgKFxuICAgICAgICAgIChyLmV2dC5kaXIgPT09ICd4JyAmJiB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcpXG4gICAgICAgICAgfHwgKHIuZXZ0LmRpciA9PT0gJ3knICYmIHRoaXMub3JpZW50YXRpb24gPT09ICd2ZXJ0aWNhbCcpXG4gICAgICAgIClcbiAgICAgICksXG4gICAgICBtYXAociA9PiByIS5ldnQuYW1vdW50KSxcbiAgICAgIHNjYW4oKGFjYywgdmFsKSA9PiB7XG4gICAgICAgIGlmIChhY2MgPT09IDApIHsgcmV0dXJuIHZhbDsgfVxuICAgICAgICBpZiAoYWNjIC8gTWF0aC5hYnMoYWNjKSAhPT0gdmFsIC8gTWF0aC5hYnModmFsKSkge3JldHVybiAwOyB9XG4gICAgICAgIHJldHVybiBhY2MgKyB2YWw7XG4gICAgICB9LCAwKSxcbiAgICAgIGZpbHRlcih2YWwgPT4gIXRoaXMuX2FuaW1hdGluZyAmJiBNYXRoLmFicyh2YWwpID4gMTUwKSxcbiAgICAgIHRocm90dGxlVGltZSgxNTAwKSxcbiAgICApLnN1YnNjcmliZSh2YWwgPT4ge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd4JywgYW1vdW50OiB2YWwgPiAwID8gLTEgOiArIDF9KTtcbiAgICAgIHRoaXMuc2xpZGUoe2RpcjogdmFsID4gMCA/ICdiYWNrJyA6ICdmb3J3YXJkJ30pO1xuICAgIH0pO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX29uU2xpZGVzQ2hhbmdlKCk7XG4gICAgdGhpcy5fcGFnZXNTdWIgPSB0aGlzLnBhZ2VzLmNoYW5nZXMuc3Vic2NyaWJlKCgpID0+IHRoaXMuX29uU2xpZGVzQ2hhbmdlKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fcGFnZXNTdWIudW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fbW91c2VXaGVlbFN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzd2l0Y2hPcmllbnRhdGlvbigpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJykge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2ZXJ0aWNhbCc7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMub3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gICAgfVxuICB9XG5cbiAgc2xpZGUob3B0czogQWpmUGFnZVNsaWRlclNsaWRlT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhZ2VzID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgaWYgKG9wdHMuZGlyKSB7XG4gICAgICBpZiAob3B0cy5kaXIgPT09ICdiYWNrJyB8fCBvcHRzLmRpciA9PT0gJ3VwJyB8fCBvcHRzLmRpciA9PT0gJ2xlZnQnKSB7XG4gICAgICAgIHRoaXMuX3NsaWRlQmFjaygpO1xuICAgICAgfSBlbHNlIGlmIChvcHRzLmRpciA9PT0gJ2ZvcndhcmQnIHx8IG9wdHMuZGlyID09PSAnZG93bicgfHwgb3B0cy5kaXIgPT09ICdyaWdodCcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVGb3J3YXJkKCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChvcHRzLnRvKSB7XG4gICAgICB0aGlzLl9zbGlkZVRvKG9wdHMudG8pO1xuICAgIH1cbiAgfVxuXG4gIG9uTW91c2VXaGVlbChldmVudDogRXZlbnQpOiB2b2lkIHtcbiAgICBjb25zdCBldnQgPSBldmVudCBhcyBXaGVlbEV2ZW50O1xuICAgIGlmIChldnQuZGVsdGFYID09IG51bGwgfHwgZXZ0LmRlbHRhWSA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IGFic0RlbHRhWCA9IE1hdGguYWJzKGV2dC5kZWx0YVgpO1xuICAgIGNvbnN0IGFic0RlbHRhWSA9IE1hdGguYWJzKGV2dC5kZWx0YVkpO1xuICAgIGlmIChhYnNEZWx0YVggPT09IDAgJiYgYWJzRGVsdGFZID09PSAwKSB7IHJldHVybjsgfVxuICAgIGlmIChhYnNEZWx0YVggPiBhYnNEZWx0YVkpIHtcbiAgICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuZW1pdCh7ZGlyOiAneCcsIGFtb3VudDogLWV2dC5kZWx0YVh9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd5JywgYW1vdW50OiAtZXZ0LmRlbHRhWX0pO1xuICAgIH1cbiAgfVxuXG4gIG9uVG91Y2hTdGFydChldnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZ0LnRvdWNoZXMgPT0gbnVsbCB8fCBldnQudG91Y2hlcy5sZW5ndGggPT09IDAgfHwgdGhpcy5fYW5pbWF0aW5nKSB7IHJldHVybjsgfVxuICAgIHRoaXMuX2N1cnJlbnRPcmlnaW4gPSB7XG4gICAgICB4OiBldnQudG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgeTogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WSxcbiAgICAgIHRpbWU6ICsgbmV3IERhdGUoKVxuICAgIH07XG4gIH1cblxuICBvblRvdWNoTW92ZShldnQ6IFRvdWNoRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoXG4gICAgICBldnQudG91Y2hlcyA9PSBudWxsIHx8IGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMFxuICAgICAgfHwgdGhpcy5fY3VycmVudE9yaWdpbiA9PSBudWxsIHx8IHRoaXMuX2FuaW1hdGluZ1xuICAgICkgeyByZXR1cm47IH1cbiAgICBjb25zdCBwb2ludDogUG9pbnQgPSB7XG4gICAgICB4OiBldnQudG91Y2hlc1swXS5jbGllbnRYLFxuICAgICAgeTogZXZ0LnRvdWNoZXNbMF0uY2xpZW50WSxcbiAgICAgIHRpbWU6ICsgbmV3IERhdGUoKVxuICAgIH07XG4gICAgY29uc3QgbW92ZW1lbnQgPSB0aGlzLl9jYWxjdWxhdGVNb3ZlbWVudChwb2ludCk7XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IHBvaW50O1xuXG4gICAgaWYgKG1vdmVtZW50LnZlbG9jaXR5WCA9PT0gMCAmJiBtb3ZlbWVudC52ZWxvY2l0eVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgYWJzVmVsb2NpdHlYID0gTWF0aC5hYnMobW92ZW1lbnQudmVsb2NpdHlYKTtcbiAgICBjb25zdCBhYnNWZWxvY2l0eVkgPSBNYXRoLmFicyhtb3ZlbWVudC52ZWxvY2l0eVkpO1xuICAgIGlmIChhYnNWZWxvY2l0eVggPiBhYnNWZWxvY2l0eVkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnICYmIGFic1ZlbG9jaXR5WCA+IDEuNSAmJiBNYXRoLmFicyhtb3ZlbWVudC5kZWx0YVgpID4gNTBcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgICAgICAgdGhpcy5zbGlkZSh7ZGlyOiBtb3ZlbWVudC52ZWxvY2l0eVggPCAwID8gJ2ZvcndhcmQnIDogJ2JhY2snfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgIHBhZ2Uuc2V0U2Nyb2xsKCd4JywgbW92ZW1lbnQuZGVsdGFYLCBtb3ZlbWVudC5kZWx0YVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmIChcbiAgICAgICAgdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyAmJiBhYnNWZWxvY2l0eVkgPiAxLjUgJiYgTWF0aC5hYnMobW92ZW1lbnQuZGVsdGFZKSA+IDUwXG4gICAgICApIHtcbiAgICAgICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gICAgICAgIHRoaXMuc2xpZGUoe2RpcjogbW92ZW1lbnQudmVsb2NpdHlZIDwgMCA/ICdmb3J3YXJkJyA6ICdiYWNrJ30pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgcGFnZSA9IHRoaXMuX2dldEN1cnJlbnRQYWdlKCk7XG4gICAgICAgIGlmIChwYWdlICE9IG51bGwpIHtcbiAgICAgICAgICBwYWdlLnNldFNjcm9sbCgneScsIG1vdmVtZW50LmRlbHRhWSwgbW92ZW1lbnQuZGVsdGFUaW1lKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIG9uVG91Y2hFbmQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXRDdXJyZW50T3JpZ2luKCk7XG4gIH1cblxuICBpc0N1cnJlbnRQYWdlTG9uZygpOiBib29sZWFuIHtcbiAgICBjb25zdCBjdXJQYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICBpZiAoY3VyUGFnZSA9PSBudWxsKSB7IHJldHVybiBmYWxzZTsgfVxuICAgIHJldHVybiBjdXJQYWdlLndyYXBwZXIubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQgPiBjdXJQYWdlLmNvbnRlbnQubmF0aXZlRWxlbWVudC5jbGllbnRIZWlnaHQ7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldEN1cnJlbnRPcmlnaW4oKTogdm9pZCB7XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IG51bGw7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDdXJyZW50UGFnZSgpOiBBamZQYWdlU2xpZGVySXRlbSB8IG51bGwge1xuICAgIGlmICh0aGlzLnBhZ2VzID09IG51bGwgfHwgdGhpcy5jdXJyZW50UGFnZSA8IDAgfHwgdGhpcy5jdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBhZ2VzLnRvQXJyYXkoKVt0aGlzLmN1cnJlbnRQYWdlXTtcbiAgfVxuXG4gIHByaXZhdGUgX2NhbGN1bGF0ZU1vdmVtZW50KHBvaW50OiBQb2ludCk6IE1vdmVtZW50IHtcbiAgICBjb25zdCBkZWx0YVggPSBwb2ludC54IC0gdGhpcy5fY3VycmVudE9yaWdpbiEueDtcbiAgICBjb25zdCBkZWx0YVkgPSBwb2ludC55IC0gdGhpcy5fY3VycmVudE9yaWdpbiEueTtcbiAgICBjb25zdCBkZWx0YVRpbWUgPSBwb2ludC50aW1lIC0gdGhpcy5fY3VycmVudE9yaWdpbiEudGltZTtcbiAgICByZXR1cm4ge1xuICAgICAgdmVsb2NpdHlYOiBkZWx0YVggLyBkZWx0YVRpbWUsXG4gICAgICBkZWx0YVgsXG4gICAgICB2ZWxvY2l0eVk6IGRlbHRhWSAvIGRlbHRhVGltZSxcbiAgICAgIGRlbHRhWSxcbiAgICAgIGRlbHRhVGltZSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBfc2xpZGVCYWNrKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9jdXJyZW50UGFnZSA8PSAwKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLl9jdXJyZW50UGFnZSAtIDE7XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZUZvcndhcmQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7IHJldHVybjsgfVxuICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLl9jdXJyZW50UGFnZSArIDE7XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZVRvKHBhZ2U6IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChwYWdlID49IDAgJiYgcGFnZSA8IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICB0aGlzLmN1cnJlbnRQYWdlID0gcGFnZTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kb1NsaWRlKGltbWVkaWF0ZSA9IGZhbHNlKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYm9keSA9PSBudWxsIHx8IHRoaXMucGFnZXMgPT0gbnVsbCB8fCB0aGlzLl9hbmltYXRpbmcpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fYW5pbWF0aW5nID0gdHJ1ZTtcbiAgICBjb25zdCBhbmltYXRpb24gPSB0aGlzLl9hbmltYXRpb25CdWlsZGVyLmJ1aWxkKGFuaW1hdGUoXG4gICAgICBpbW1lZGlhdGUgPyAwIDogdGhpcy5kdXJhdGlvbixcbiAgICAgIHN0eWxlKHt0cmFuc2Zvcm06IHRoaXMuX2dldEN1cnJlbnRUcmFuc2xhdGlvbigpfSlcbiAgICApKTtcblxuICAgIGNvbnN0IHBsYXllciA9IGFuaW1hdGlvbi5jcmVhdGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQpO1xuICAgIHBsYXllci5vbkRvbmUoKCkgPT4ge1xuICAgICAgdGhpcy5fYW5pbWF0aW5nID0gZmFsc2U7XG4gICAgICB0aGlzLl9wYWdlU2Nyb2xsRmluaXNoLmVtaXQoKTtcbiAgICB9KTtcbiAgICBwbGF5ZXIucGxheSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0Q3VycmVudFRyYW5zbGF0aW9uKCk6IHN0cmluZyB7XG4gICAgY29uc3Qgc2xpZGVTaXplID0gMTAwIC8gdGhpcy5wYWdlcy5sZW5ndGg7XG4gICAgY29uc3QgcG9zaXRpb24gPSB0aGlzLl9jdXJyZW50UGFnZSA9PT0gLTEgPyAwIDogdGhpcy5fY3VycmVudFBhZ2UgKiBzbGlkZVNpemU7XG4gICAgY29uc3QgdHJhbnNsYXRpb24gPSB0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJyA/ICdZJyA6ICdYJztcbiAgICByZXR1cm4gYHRyYW5zbGF0ZSR7dHJhbnNsYXRpb259KC0ke3Bvc2l0aW9ufSUpYDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFByb3BzKCk6IHtwcm9wOiBzdHJpbmcsIHJlbW92ZVByb3A6IHN0cmluZ30ge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuIHtwcm9wOiAnaGVpZ2h0JywgcmVtb3ZlUHJvcDogJ3dpZHRoJ307XG4gICAgfVxuICAgIHJldHVybiB7cHJvcDogJ3dpZHRoJywgcmVtb3ZlUHJvcDogJ2hlaWdodCd9O1xuICB9XG5cbiAgcHJpdmF0ZSBfb25TbGlkZXNDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU2l6ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IHtwcm9wLCByZW1vdmVQcm9wfSA9IHRoaXMuX2dldFByb3BzKCk7XG4gICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUodGhpcy5ib2R5Lm5hdGl2ZUVsZW1lbnQsIHByb3AsIGAke3RoaXMucGFnZXMubGVuZ3RoICogMTAwfSVgKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCwgcmVtb3ZlUHJvcCwgbnVsbCk7XG4gICAgbGV0IGN1clBhZ2U6IG51bWJlcjtcbiAgICBpZiAodGhpcy5wYWdlcy5sZW5ndGggPT09IDApIHtcbiAgICAgIGN1clBhZ2UgPSAtMTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID09PSAtMSkge1xuICAgICAgY3VyUGFnZSA9IDA7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9jdXJyZW50UGFnZSA+PSB0aGlzLnBhZ2VzLmxlbmd0aCkge1xuICAgICAgY3VyUGFnZSA9IHRoaXMucGFnZXMubGVuZ3RoIC0gMTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VyUGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlO1xuICAgIH1cbiAgICB0aGlzLl9jdXJyZW50UGFnZSA9IGN1clBhZ2U7XG4gICAgdGhpcy5fcmVzdG9yZUN1cnJlbnRQYWdlKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZXN0b3JlQ3VycmVudFBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5fZG9TbGlkZSh0cnVlKTtcbiAgfVxufVxuIl19