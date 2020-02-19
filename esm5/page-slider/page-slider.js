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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFnZS1zbGlkZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9wYWdlLXNsaWRlci9wYWdlLXNsaWRlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLEtBQUssRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3JFLE9BQU8sRUFBbUIsaUJBQWlCLEVBQUUsZUFBZSxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUMvRixLQUFLLEVBQWEsTUFBTSxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUUvRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQXdCckQ7SUF3REUsdUJBQ1UsaUJBQW1DLEVBQ25DLElBQXVCLEVBQ3ZCLFNBQW9CO1FBSDlCLGlCQThCQztRQTdCUyxzQkFBaUIsR0FBakIsaUJBQWlCLENBQWtCO1FBQ25DLFNBQUksR0FBSixJQUFJLENBQW1CO1FBQ3ZCLGNBQVMsR0FBVCxTQUFTLENBQVc7UUF0RHRCLHNCQUFpQixHQUF1QixJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3RELHFCQUFnQixHQUFxQixJQUFJLENBQUMsaUJBQWlCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFdEYsdUJBQWtCLEdBQ3RCLElBQUksWUFBWSxFQUE0QixDQUFDO1FBQzlCLHNCQUFpQixHQUNs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QUNQLGlCQUFpQjtnQkFDSixTQUFTOzs7dUJBOEI3QyxTQUFTLFNBQUMsTUFBTSxFQUFFLEVBQUMsTUFBTSxFQUFFLElBQUksRUFBQzt3QkFDaEMsZUFBZSxTQUFDLGlCQUFpQixFQUFFLEVBQUMsV0FBVyxFQUFFLElBQUksRUFBQzttQ0FHdEQsTUFBTTtvQ0FJTixNQUFNOzJCQUdOLEtBQUs7OEJBSUwsS0FBSzttQ0FZTCxLQUFLOzhCQU9MLEtBQUs7d0NBUUwsS0FBSzs7SUF3UFIsb0JBQUM7Q0FBQSxBQXBTRCxJQW9TQztTQW5TWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHthbmltYXRlLCBBbmltYXRpb25CdWlsZGVyLCBzdHlsZX0gZnJvbSAnQGFuZ3VsYXIvYW5pbWF0aW9ucyc7XG5pbXBvcnQge0FmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBDb250ZW50Q2hpbGRyZW4sIERpcmVjdGl2ZSwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCwgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgUmVuZGVyZXIyLCBWaWV3Q2hpbGR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXIsIG1hcCwgc2NhbiwgdGhyb3R0bGVUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlckl0ZW19IGZyb20gJy4vcGFnZS1zbGlkZXItaXRlbSc7XG5pbXBvcnQge0FqZlBhZ2VTbGlkZXJTbGlkZU9wdGlvbnN9IGZyb20gJy4vcGFnZS1zbGlkZXItc2xpZGUtb3B0aW9ucyc7XG5cbmV4cG9ydCB0eXBlIEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJyB8ICd2ZXJ0aWNhbCc7XG5cbmludGVyZmFjZSBQb2ludCB7XG4gIHg6IG51bWJlcjtcbiAgeTogbnVtYmVyO1xuICB0aW1lOiBudW1iZXI7XG59XG5cbmludGVyZmFjZSBNb3ZlbWVudCB7XG4gIHZlbG9jaXR5WDogbnVtYmVyO1xuICB2ZWxvY2l0eVk6IG51bWJlcjtcbiAgZGVsdGFYOiBudW1iZXI7XG4gIGRlbHRhWTogbnVtYmVyO1xuICBkZWx0YVRpbWU6IG51bWJlcjtcbn1cblxuaW50ZXJmYWNlIE1vdXNoZVdoZWVsTW92ZSB7XG4gIGRpcjogJ3gnIHwgJ3knO1xuICBhbW91bnQ6IG51bWJlcjtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgY2xhc3MgQWpmUGFnZVNsaWRlciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIE9uRGVzdHJveSB7XG4gIEBWaWV3Q2hpbGQoJ2JvZHknLCB7c3RhdGljOiB0cnVlfSkgYm9keTogRWxlbWVudFJlZjtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZQYWdlU2xpZGVySXRlbSwge2Rlc2NlbmRhbnRzOiB0cnVlfSkgcGFnZXM6IFF1ZXJ5TGlzdDxBamZQYWdlU2xpZGVySXRlbT47XG5cbiAgcHJpdmF0ZSBfcGFnZVNjcm9sbEZpbmlzaDogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgcGFnZVNjcm9sbEZpbmlzaDogT2JzZXJ2YWJsZTx2b2lkPiA9IHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2guYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9yaWVudGF0aW9uQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPVxuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIEBJbnB1dCgpIGR1cmF0aW9uID0gMzAwO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gIGdldCBvcmllbnRhdGlvbigpOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24geyByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247IH1cbiAgQElucHV0KCkgc2V0IG9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pIHtcbiAgICBpZiAodGhpcy5fb3JpZW50YXRpb24gIT09IG9yaWVudGF0aW9uKSB7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5fdXBkYXRlU2l6ZSgpO1xuICAgICAgdGhpcy5fcmVzdG9yZUN1cnJlbnRQYWdlKCk7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5lbWl0KHRoaXMuX29yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9maXhlZE9yaWVudGF0aW9uID0gZmFsc2U7XG4gIGdldCBmaXhlZE9yaWVudGF0aW9uKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZml4ZWRPcmllbnRhdGlvbjsgfVxuICBASW5wdXQoKSBzZXQgZml4ZWRPcmllbnRhdGlvbihmaXhlZE9yaWVudGF0aW9uOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZml4ZWRPcmllbnRhdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShmaXhlZE9yaWVudGF0aW9uKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jdXJyZW50UGFnZSA9IC0xO1xuICBnZXQgY3VycmVudFBhZ2UoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuX2N1cnJlbnRQYWdlOyB9XG4gIEBJbnB1dCgpIHNldCBjdXJyZW50UGFnZShjdXJyZW50UGFnZTogbnVtYmVyKSB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCBjdXJyZW50UGFnZSA8IDAgfHwgY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fY3VycmVudFBhZ2UgPSBjdXJyZW50UGFnZTtcbiAgICB0aGlzLl9kb1NsaWRlKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW47XG4gIGdldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM7IH1cbiAgQElucHV0KCkgc2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyhobmI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaG5iKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9hbmltYXRpbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfcGFnZXNTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9jdXJyZW50T3JpZ2luOiBQb2ludCB8IG51bGw7XG4gIHByaXZhdGUgX21vdXNlV2hlZWxFdnQ6IEV2ZW50RW1pdHRlcjxNb3VzaGVXaGVlbE1vdmU+ID0gbmV3IEV2ZW50RW1pdHRlcjxNb3VzaGVXaGVlbE1vdmU+KCk7XG4gIHByaXZhdGUgX21vdXNlV2hlZWxTdWI6IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9hbmltYXRpb25CdWlsZGVyOiBBbmltYXRpb25CdWlsZGVyLFxuICAgIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMlxuICApIHtcbiAgICB0aGlzLl9tb3VzZVdoZWVsU3ViID0gdGhpcy5fbW91c2VXaGVlbEV2dC5waXBlKFxuICAgICAgbWFwKGV2dCA9PiB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSA9PSBudWxsKSB7IHJldHVybiBudWxsOyB9XG4gICAgICAgIHJldHVybiB7ZXZ0LCByZXM6IHBhZ2Uuc2V0U2Nyb2xsKGV2dC5kaXIsIGV2dC5hbW91bnQsIDApfTtcbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKHIgPT4gciAhPSBudWxsXG4gICAgICAgICYmIHIucmVzID09PSBmYWxzZVxuICAgICAgICAmJiAoXG4gICAgICAgICAgKHIuZXZ0LmRpciA9PT0gJ3gnICYmIHRoaXMub3JpZW50YXRpb24gPT09ICdob3Jpem9udGFsJylcbiAgICAgICAgICB8fCAoci5ldnQuZGlyID09PSAneScgJiYgdGhpcy5vcmllbnRhdGlvbiA9PT0gJ3ZlcnRpY2FsJylcbiAgICAgICAgKVxuICAgICAgKSxcbiAgICAgIG1hcChyID0+IHIhLmV2dC5hbW91bnQpLFxuICAgICAgc2NhbigoYWNjLCB2YWwpID0+IHtcbiAgICAgICAgaWYgKGFjYyA9PT0gMCkgeyByZXR1cm4gdmFsOyB9XG4gICAgICAgIGlmIChhY2MgLyBNYXRoLmFicyhhY2MpICE9PSB2YWwgLyBNYXRoLmFicyh2YWwpKSB7cmV0dXJuIDA7IH1cbiAgICAgICAgcmV0dXJuIGFjYyArIHZhbDtcbiAgICAgIH0sIDApLFxuICAgICAgZmlsdGVyKHZhbCA9PiAhdGhpcy5fYW5pbWF0aW5nICYmIE1hdGguYWJzKHZhbCkgPiAxNTApLFxuICAgICAgdGhyb3R0bGVUaW1lKDE1MDApLFxuICAgICkuc3Vic2NyaWJlKHZhbCA9PiB7XG4gICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3gnLCBhbW91bnQ6IHZhbCA+IDAgPyAtMSA6ICsgMX0pO1xuICAgICAgdGhpcy5zbGlkZSh7ZGlyOiB2YWwgPiAwID8gJ2JhY2snIDogJ2ZvcndhcmQnfSk7XG4gICAgfSk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fb25TbGlkZXNDaGFuZ2UoKTtcbiAgICB0aGlzLl9wYWdlc1N1YiA9IHRoaXMucGFnZXMuY2hhbmdlcy5zdWJzY3JpYmUoKCkgPT4gdGhpcy5fb25TbGlkZXNDaGFuZ2UoKSk7XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9wYWdlc1N1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX21vdXNlV2hlZWxFdnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9tb3VzZVdoZWVsU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuY29tcGxldGUoKTtcbiAgfVxuXG4gIHN3aXRjaE9yaWVudGF0aW9uKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9vcmllbnRhdGlvbiA9PT0gJ2hvcml6b250YWwnKSB7XG4gICAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3ZlcnRpY2FsJztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5vcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgICB9XG4gIH1cblxuICBzbGlkZShvcHRzOiBBamZQYWdlU2xpZGVyU2xpZGVPcHRpb25zKTogdm9pZCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCkgeyByZXR1cm47IH1cbiAgICBpZiAob3B0cy5kaXIpIHtcbiAgICAgIGlmIChvcHRzLmRpciA9PT0gJ2JhY2snIHx8IG9wdHMuZGlyID09PSAndXAnIHx8IG9wdHMuZGlyID09PSAnbGVmdCcpIHtcbiAgICAgICAgdGhpcy5fc2xpZGVCYWNrKCk7XG4gICAgICB9IGVsc2UgaWYgKG9wdHMuZGlyID09PSAnZm9yd2FyZCcgfHwgb3B0cy5kaXIgPT09ICdkb3duJyB8fCBvcHRzLmRpciA9PT0gJ3JpZ2h0Jykge1xuICAgICAgICB0aGlzLl9zbGlkZUZvcndhcmQoKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKG9wdHMudG8pIHtcbiAgICAgIHRoaXMuX3NsaWRlVG8ob3B0cy50byk7XG4gICAgfVxuICB9XG5cbiAgb25Nb3VzZVdoZWVsKGV2ZW50OiBFdmVudCk6IHZvaWQge1xuICAgIGNvbnN0IGV2dCA9IGV2ZW50IGFzIFdoZWVsRXZlbnQ7XG4gICAgaWYgKGV2dC5kZWx0YVggPT0gbnVsbCB8fCBldnQuZGVsdGFZID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgY29uc3QgYWJzRGVsdGFYID0gTWF0aC5hYnMoZXZ0LmRlbHRhWCk7XG4gICAgY29uc3QgYWJzRGVsdGFZID0gTWF0aC5hYnMoZXZ0LmRlbHRhWSk7XG4gICAgaWYgKGFic0RlbHRhWCA9PT0gMCAmJiBhYnNEZWx0YVkgPT09IDApIHsgcmV0dXJuOyB9XG4gICAgaWYgKGFic0RlbHRhWCA+IGFic0RlbHRhWSkge1xuICAgICAgdGhpcy5fbW91c2VXaGVlbEV2dC5lbWl0KHtkaXI6ICd4JywgYW1vdW50OiAtZXZ0LmRlbHRhWH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLl9tb3VzZVdoZWVsRXZ0LmVtaXQoe2RpcjogJ3knLCBhbW91bnQ6IC1ldnQuZGVsdGFZfSk7XG4gICAgfVxuICB9XG5cbiAgb25Ub3VjaFN0YXJ0KGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChldnQudG91Y2hlcyA9PSBudWxsIHx8IGV2dC50b3VjaGVzLmxlbmd0aCA9PT0gMCB8fCB0aGlzLl9hbmltYXRpbmcpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5fY3VycmVudE9yaWdpbiA9IHtcbiAgICAgIHg6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICB5OiBldnQudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgdGltZTogKyBuZXcgRGF0ZSgpXG4gICAgfTtcbiAgfVxuXG4gIG9uVG91Y2hNb3ZlKGV2dDogVG91Y2hFdmVudCk6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIGV2dC50b3VjaGVzID09IG51bGwgfHwgZXZ0LnRvdWNoZXMubGVuZ3RoID09PSAwXG4gICAgICB8fCB0aGlzLl9jdXJyZW50T3JpZ2luID09IG51bGwgfHwgdGhpcy5fYW5pbWF0aW5nXG4gICAgKSB7IHJldHVybjsgfVxuICAgIGNvbnN0IHBvaW50OiBQb2ludCA9IHtcbiAgICAgIHg6IGV2dC50b3VjaGVzWzBdLmNsaWVudFgsXG4gICAgICB5OiBldnQudG91Y2hlc1swXS5jbGllbnRZLFxuICAgICAgdGltZTogKyBuZXcgRGF0ZSgpXG4gICAgfTtcbiAgICBjb25zdCBtb3ZlbWVudCA9IHRoaXMuX2NhbGN1bGF0ZU1vdmVtZW50KHBvaW50KTtcbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0gcG9pbnQ7XG5cbiAgICBpZiAobW92ZW1lbnQudmVsb2NpdHlYID09PSAwICYmIG1vdmVtZW50LnZlbG9jaXR5WSA9PT0gMCkgeyByZXR1cm47IH1cbiAgICBjb25zdCBhYnNWZWxvY2l0eVggPSBNYXRoLmFicyhtb3ZlbWVudC52ZWxvY2l0eVgpO1xuICAgIGNvbnN0IGFic1ZlbG9jaXR5WSA9IE1hdGguYWJzKG1vdmVtZW50LnZlbG9jaXR5WSk7XG4gICAgaWYgKGFic1ZlbG9jaXR5WCA+IGFic1ZlbG9jaXR5WSkge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID09PSAnaG9yaXpvbnRhbCcgJiYgYWJzVmVsb2NpdHlYID4gMS41ICYmIE1hdGguYWJzKG1vdmVtZW50LmRlbHRhWCkgPiA1MFxuICAgICAgKSB7XG4gICAgICAgIHRoaXMuX3Jlc2V0Q3VycmVudE9yaWdpbigpO1xuICAgICAgICB0aGlzLnNsaWRlKHtkaXI6IG1vdmVtZW50LnZlbG9jaXR5WCA8IDAgPyAnZm9yd2FyZCcgOiAnYmFjayd9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnN0IHBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgICAgICBpZiAocGFnZSAhPSBudWxsKSB7XG4gICAgICAgICAgcGFnZS5zZXRTY3JvbGwoJ3gnLCBtb3ZlbWVudC5kZWx0YVgsIG1vdmVtZW50LmRlbHRhVGltZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICB0aGlzLm9yaWVudGF0aW9uID09PSAndmVydGljYWwnICYmIGFic1ZlbG9jaXR5WSA+IDEuNSAmJiBNYXRoLmFicyhtb3ZlbWVudC5kZWx0YVkpID4gNTBcbiAgICAgICkge1xuICAgICAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgICAgICAgdGhpcy5zbGlkZSh7ZGlyOiBtb3ZlbWVudC52ZWxvY2l0eVkgPCAwID8gJ2ZvcndhcmQnIDogJ2JhY2snfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBwYWdlID0gdGhpcy5fZ2V0Q3VycmVudFBhZ2UoKTtcbiAgICAgICAgaWYgKHBhZ2UgIT0gbnVsbCkge1xuICAgICAgICAgIHBhZ2Uuc2V0U2Nyb2xsKCd5JywgbW92ZW1lbnQuZGVsdGFZLCBtb3ZlbWVudC5kZWx0YVRpbWUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgb25Ub3VjaEVuZCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNldEN1cnJlbnRPcmlnaW4oKTtcbiAgfVxuXG4gIGlzQ3VycmVudFBhZ2VMb25nKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGN1clBhZ2UgPSB0aGlzLl9nZXRDdXJyZW50UGFnZSgpO1xuICAgIGlmIChjdXJQYWdlID09IG51bGwpIHsgcmV0dXJuIGZhbHNlOyB9XG4gICAgcmV0dXJuIGN1clBhZ2Uud3JhcHBlci5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodCA+IGN1clBhZ2UuY29udGVudC5uYXRpdmVFbGVtZW50LmNsaWVudEhlaWdodDtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0Q3VycmVudE9yaWdpbigpOiB2b2lkIHtcbiAgICB0aGlzLl9jdXJyZW50T3JpZ2luID0gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEN1cnJlbnRQYWdlKCk6IEFqZlBhZ2VTbGlkZXJJdGVtIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMucGFnZXMgPT0gbnVsbCB8fCB0aGlzLmN1cnJlbnRQYWdlIDwgMCB8fCB0aGlzLmN1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMucGFnZXMudG9BcnJheSgpW3RoaXMuY3VycmVudFBhZ2VdO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2FsY3VsYXRlTW92ZW1lbnQocG9pbnQ6IFBvaW50KTogTW92ZW1lbnQge1xuICAgIGNvbnN0IGRlbHRhWCA9IHBvaW50LnggLSB0aGlzLl9jdXJyZW50T3JpZ2luIS54O1xuICAgIGNvbnN0IGRlbHRhWSA9IHBvaW50LnkgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS55O1xuICAgIGNvbnN0IGRlbHRhVGltZSA9IHBvaW50LnRpbWUgLSB0aGlzLl9jdXJyZW50T3JpZ2luIS50aW1lO1xuICAgIHJldHVybiB7XG4gICAgICB2ZWxvY2l0eVg6IGRlbHRhWCAvIGRlbHRhVGltZSxcbiAgICAgIGRlbHRhWCxcbiAgICAgIHZlbG9jaXR5WTogZGVsdGFZIC8gZGVsdGFUaW1lLFxuICAgICAgZGVsdGFZLFxuICAgICAgZGVsdGFUaW1lLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIF9zbGlkZUJhY2soKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2N1cnJlbnRQYWdlIDw9IDApIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlIC0gMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlRm9yd2FyZCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fY3VycmVudFBhZ2UgPj0gdGhpcy5wYWdlcy5sZW5ndGgpIHsgcmV0dXJuOyB9XG4gICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMuX2N1cnJlbnRQYWdlICsgMTtcbiAgfVxuXG4gIHByaXZhdGUgX3NsaWRlVG8ocGFnZTogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHBhZ2UgPj0gMCAmJiBwYWdlIDwgdGhpcy5wYWdlcy5sZW5ndGgpIHtcbiAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBwYWdlO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2RvU2xpZGUoaW1tZWRpYXRlID0gZmFsc2UpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5ib2R5ID09IG51bGwgfHwgdGhpcy5wYWdlcyA9PSBudWxsIHx8IHRoaXMuX2FuaW1hdGluZykgeyByZXR1cm47IH1cbiAgICB0aGlzLl9hbmltYXRpbmcgPSB0cnVlO1xuICAgIGNvbnN0IGFuaW1hdGlvbiA9IHRoaXMuX2FuaW1hdGlvbkJ1aWxkZXIuYnVpbGQoYW5pbWF0ZShcbiAgICAgIGltbWVkaWF0ZSA/IDAgOiB0aGlzLmR1cmF0aW9uLFxuICAgICAgc3R5bGUoe3RyYW5zZm9ybTogdGhpcy5fZ2V0Q3VycmVudFRyYW5zbGF0aW9uKCl9KVxuICAgICkpO1xuXG4gICAgY29uc3QgcGxheWVyID0gYW5pbWF0aW9uLmNyZWF0ZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCk7XG4gICAgcGxheWVyLm9uRG9uZSgoKSA9PiB7XG4gICAgICB0aGlzLl9hbmltYXRpbmcgPSBmYWxzZTtcbiAgICAgIHRoaXMuX3BhZ2VTY3JvbGxGaW5pc2guZW1pdCgpO1xuICAgIH0pO1xuICAgIHBsYXllci5wbGF5KCk7XG4gIH1cblxuICBwcml2YXRlIF9nZXRDdXJyZW50VHJhbnNsYXRpb24oKTogc3RyaW5nIHtcbiAgICBjb25zdCBzbGlkZVNpemUgPSAxMDAgLyB0aGlzLnBhZ2VzLmxlbmd0aDtcbiAgICBjb25zdCBwb3NpdGlvbiA9IHRoaXMuX2N1cnJlbnRQYWdlID09PSAtMSA/IDAgOiB0aGlzLl9jdXJyZW50UGFnZSAqIHNsaWRlU2l6ZTtcbiAgICBjb25zdCB0cmFuc2xhdGlvbiA9IHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnID8gJ1knIDogJ1gnO1xuICAgIHJldHVybiBgdHJhbnNsYXRlJHt0cmFuc2xhdGlvbn0oLSR7cG9zaXRpb259JSlgO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0UHJvcHMoKToge3Byb3A6IHN0cmluZywgcmVtb3ZlUHJvcDogc3RyaW5nfSB7XG4gICAgaWYgKHRoaXMuX29yaWVudGF0aW9uID09PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm4ge3Byb3A6ICdoZWlnaHQnLCByZW1vdmVQcm9wOiAnd2lkdGgnfTtcbiAgICB9XG4gICAgcmV0dXJuIHtwcm9wOiAnd2lkdGgnLCByZW1vdmVQcm9wOiAnaGVpZ2h0J307XG4gIH1cblxuICBwcml2YXRlIF9vblNsaWRlc0NoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLl91cGRhdGVTaXplKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTaXplKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmJvZHkgPT0gbnVsbCB8fCB0aGlzLnBhZ2VzID09IG51bGwpIHsgcmV0dXJuOyB9XG4gICAgY29uc3Qge3Byb3AsIHJlbW92ZVByb3B9ID0gdGhpcy5fZ2V0UHJvcHMoKTtcbiAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZSh0aGlzLmJvZHkubmF0aXZlRWxlbWVudCwgcHJvcCwgYCR7dGhpcy5wYWdlcy5sZW5ndGggKiAxMDB9JWApO1xuICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKHRoaXMuYm9keS5uYXRpdmVFbGVtZW50LCByZW1vdmVQcm9wLCBudWxsKTtcbiAgICBsZXQgY3VyUGFnZTogbnVtYmVyO1xuICAgIGlmICh0aGlzLnBhZ2VzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgY3VyUGFnZSA9IC0xO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fY3VycmVudFBhZ2UgPT09IC0xKSB7XG4gICAgICBjdXJQYWdlID0gMDtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX2N1cnJlbnRQYWdlID49IHRoaXMucGFnZXMubGVuZ3RoKSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5wYWdlcy5sZW5ndGggLSAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJQYWdlID0gdGhpcy5fY3VycmVudFBhZ2U7XG4gICAgfVxuICAgIHRoaXMuX2N1cnJlbnRQYWdlID0gY3VyUGFnZTtcbiAgICB0aGlzLl9yZXN0b3JlQ3VycmVudFBhZ2UoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc3RvcmVDdXJyZW50UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9kb1NsaWRlKHRydWUpO1xuICB9XG59XG4iXX0=