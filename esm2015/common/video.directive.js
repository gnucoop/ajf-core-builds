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
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
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
    get source() {
        return this._source;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvY29tbW9uL3ZpZGVvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEVBQ1YsTUFBTSxlQUFlLENBQUM7QUFHdkIsTUFBTSxPQUFPLGlCQUFpQjs7Ozs7SUFhNUIsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBRnZELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVNLENBQUM7Ozs7SUFYckUsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7Ozs7O0lBQ0QsSUFDSSxNQUFNLENBQUMsTUFBd0I7UUFDakMsSUFBSSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUM7UUFDdEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7Ozs7O0lBTU8sUUFBUTtRQUNkLElBQUksU0FBUyxDQUFDLFlBQVksSUFBSSxTQUFTLENBQUMsWUFBWSxDQUFDLFlBQVksRUFBRTtZQUNqRSxTQUFTLENBQUMsWUFBWSxDQUFDLFlBQVksQ0FBQyxtQkFBd0IsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLEVBQUEsQ0FBQztpQkFDckUsSUFBSTs7OztZQUFDLENBQUMsTUFBbUIsRUFBRSxFQUFFO2dCQUM1QixDQUFDLG1CQUFBLElBQUksQ0FBQyxPQUFPLEVBQU8sQ0FBQyxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7Z0JBQ3pDLENBQUMsbUJBQUEsSUFBSSxDQUFDLE9BQU8sRUFBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDL0IsQ0FBQyxFQUFDO2lCQUNELEtBQUs7Ozs7WUFBQyxDQUFDLEdBQXFCLEVBQUUsRUFBRTtnQkFDL0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLEVBQUMsQ0FBQztTQUNSO0lBQ0gsQ0FBQzs7OztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDOzs7WUFoQ0YsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLHFCQUFxQixFQUFDOzs7O1lBUDFDLFVBQVU7WUFJVixTQUFTOzs7cUJBU1IsS0FBSztxQkFNTCxNQUFNOzs7Ozs7O0lBVlAsb0NBQWtDOztJQVVsQyxtQ0FBOEQ7Ozs7O0lBRWxELGdDQUF1Qjs7Ozs7SUFBRSxzQ0FBNEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2FqZlZpZGVvRGlyZWN0aXZlXSd9KVxuZXhwb3J0IGNsYXNzIEFqZlZpZGVvRGlyZWN0aXZlIGltcGxlbWVudHMgQWZ0ZXJWaWV3SW5pdCB7XG4gIHByaXZhdGUgX3NvdXJjZTogSFRNTFZpZGVvRWxlbWVudDtcbiAgZ2V0IHNvdXJjZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fc291cmNlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBzb3VyY2Uoc291cmNlOiBIVE1MVmlkZW9FbGVtZW50KSB7XG4gICAgdGhpcy5fc291cmNlID0gc291cmNlO1xuICAgIHRoaXMuX2luaXRDYW0oKTtcbiAgfVxuXG4gIEBPdXRwdXQoKSBpc0luaXQ6IEV2ZW50RW1pdHRlcjxhbnk+ID0gbmV3IEV2ZW50RW1pdHRlcjxhbnk+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYsIHByaXZhdGUgX3JlbmRlcmVyOiBSZW5kZXJlcjIpIHt9XG5cbiAgcHJpdmF0ZSBfaW5pdENhbSgpIHtcbiAgICBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoPE1lZGlhU3RyZWFtQ29uc3RyYWludHM+e3ZpZGVvOiB0cnVlfSlcbiAgICAgICAgICAudGhlbigoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICAgKHRoaXMuX3NvdXJjZSBhcyBhbnkpLnNyY09iamVjdCA9IHN0cmVhbTtcbiAgICAgICAgICAgICh0aGlzLl9zb3VyY2UgYXMgYW55KS5wbGF5KCk7XG4gICAgICAgICAgfSlcbiAgICAgICAgICAuY2F0Y2goKGVycjogTWVkaWFTdHJlYW1FcnJvcikgPT4ge1xuICAgICAgICAgICAgY29uc29sZS5sb2coZXJyKTtcbiAgICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fc291cmNlKTtcbiAgICB0aGlzLmlzSW5pdC5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==