/**
 * @fileoverview added by tsickle
 * Generated from: src/core/common/video.directive.ts
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
import { Directive, Renderer2, ElementRef, Input, Output, EventEmitter } from '@angular/core';
export class AjfVideoDirective {
    /**
     * @param {?} _el
     * @param {?} _renderer
     */
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.isInit = new EventEmitter();
    }
    /**
     * @return {?}
     */
    get source() { return this._source; }
    /**
     * @param {?} source
     * @return {?}
     */
    set source(source) {
        this._source = source;
        this._initCam();
    }
    /**
     * @private
     * @return {?}
     */
    _initCam() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia((/** @type {?} */ ({ video: true })))
                .then((/**
             * @param {?} stream
             * @return {?}
             */
            (stream) => {
                ((/** @type {?} */ (this._source))).srcObject = stream;
                ((/** @type {?} */ (this._source))).play();
            }))
                .catch((/**
             * @param {?} err
             * @return {?}
             */
            (err) => {
                console.log(err);
            }));
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        this._renderer.appendChild(this._el.nativeElement, this._source);
        this.isInit.emit();
    }
}
AjfVideoDirective.decorators = [
    { type: Directive, args: [{ selector: '[ajfVideoDirective]' },] }
];
/** @nocollapse */
AjfVideoDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
AjfVideoDirective.propDecorators = {
    source: [{ type: Input }],
    isInit: [{ type: Output }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfVideoDirective.prototype._source;
    /** @type {?} */
    AjfVideoDirective.prototype.isInit;
    /**
     * @type {?}
     * @private
     */
    AjfVideoDirective.prototype._el;
    /**
     * @type {?}
     * @private
     */
    AjfVideoDirective.prototype._renderer;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvY29tbW9uL3ZpZGVvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQ0wsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUN4QixNQUFNLEVBQUUsWUFBWSxFQUNwQyxNQUFNLGVBQWUsQ0FBQztBQUd2QixNQUFNLE9BQU8saUJBQWlCOzs7OztJQVc1QixZQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGdkQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBRU8sQ0FBQzs7OztJQVJ0RSxJQUFJLE1BQU0sS0FBSyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDOzs7OztJQUNyQyxJQUFhLE1BQU0sQ0FBQyxNQUF3QjtRQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQzs7Ozs7SUFNTyxRQUFRO1FBQ2QsSUFBSSxTQUFTLENBQUMsWUFBWSxJQUFJLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxFQUFFO1lBQ2pFLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLG1CQUF3QixFQUFFLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBQSxDQUFDO2lCQUN6RSxJQUFJOzs7O1lBQUMsQ0FBQyxNQUFtQixFQUFFLEVBQUU7Z0JBQzVCLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztnQkFDekMsQ0FBQyxtQkFBQSxJQUFJLENBQUMsT0FBTyxFQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUMvQixDQUFDLEVBQUM7aUJBQ0QsS0FBSzs7OztZQUFDLENBQUMsR0FBcUIsRUFBRSxFQUFFO2dCQUMvQixPQUFPLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQ25CLENBQUMsRUFBQyxDQUFDO1NBQ047SUFDSCxDQUFDOzs7O0lBRUQsZUFBZTtRQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3JCLENBQUM7OztZQTlCRixTQUFTLFNBQUMsRUFBRSxRQUFRLEVBQUUscUJBQXFCLEVBQUU7Ozs7WUFKdEIsVUFBVTtZQUFyQixTQUFTOzs7cUJBU25CLEtBQUs7cUJBS0wsTUFBTTs7Ozs7OztJQVBQLG9DQUFrQzs7SUFPbEMsbUNBQThEOzs7OztJQUVsRCxnQ0FBdUI7Ozs7O0lBQUUsc0NBQTRCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsIFJlbmRlcmVyMiwgRWxlbWVudFJlZiwgSW5wdXQsXG4gIEFmdGVyVmlld0luaXQsIE91dHB1dCwgRXZlbnRFbWl0dGVyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbYWpmVmlkZW9EaXJlY3RpdmVdJyB9KVxuZXhwb3J0IGNsYXNzIEFqZlZpZGVvRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG5cbiAgcHJpdmF0ZSBfc291cmNlOiBIVE1MVmlkZW9FbGVtZW50O1xuICBnZXQgc291cmNlKCkgeyByZXR1cm4gdGhpcy5fc291cmNlOyB9XG4gIEBJbnB1dCgpIHNldCBzb3VyY2Uoc291cmNlOiBIVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgdGhpcy5fc291cmNlID0gc291cmNlO1xuICAgIHRoaXMuX2luaXRDYW0oKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBpc0luaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHsgfVxuXG4gIHByaXZhdGUgX2luaXRDYW0oKSB7XG4gICAgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcbiAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKDxNZWRpYVN0cmVhbUNvbnN0cmFpbnRzPnsgdmlkZW86IHRydWUgfSlcbiAgICAgICAgLnRoZW4oKHN0cmVhbTogTWVkaWFTdHJlYW0pID0+IHtcbiAgICAgICAgICAodGhpcy5fc291cmNlIGFzIGFueSkuc3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgICAgICh0aGlzLl9zb3VyY2UgYXMgYW55KS5wbGF5KCk7XG4gICAgICAgIH0pXG4gICAgICAgIC5jYXRjaCgoZXJyOiBNZWRpYVN0cmVhbUVycm9yKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlbmRlcmVyLmFwcGVuZENoaWxkKHRoaXMuX2VsLm5hdGl2ZUVsZW1lbnQsIHRoaXMuX3NvdXJjZSk7XG4gICAgdGhpcy5pc0luaXQuZW1pdCgpO1xuICB9XG59XG4iXX0=