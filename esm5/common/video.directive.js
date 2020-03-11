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
var AjfVideoDirective = /** @class */ (function () {
    function AjfVideoDirective(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.isInit = new EventEmitter();
    }
    Object.defineProperty(AjfVideoDirective.prototype, "source", {
        get: function () { return this._source; },
        set: function (source) {
            this._source = source;
            this._initCam();
        },
        enumerable: true,
        configurable: true
    });
    AjfVideoDirective.prototype._initCam = function () {
        var _this = this;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                _this._source.srcObject = stream;
                _this._source.play();
            })
                .catch(function (err) {
                console.log(err);
            });
        }
    };
    AjfVideoDirective.prototype.ngAfterViewInit = function () {
        this._renderer.appendChild(this._el.nativeElement, this._source);
        this.isInit.emit();
    };
    AjfVideoDirective.decorators = [
        { type: Directive, args: [{ selector: '[ajfVideoDirective]' },] }
    ];
    /** @nocollapse */
    AjfVideoDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AjfVideoDirective.propDecorators = {
        source: [{ type: Input }],
        isInit: [{ type: Output }]
    };
    return AjfVideoDirective;
}());
export { AjfVideoDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvY29tbW9uL3ZpZGVvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUFFLFNBQVMsRUFBRSxVQUFVLEVBQUUsS0FBSyxFQUN4QixNQUFNLEVBQUUsWUFBWSxFQUNwQyxNQUFNLGVBQWUsQ0FBQztBQUV2QjtJQVlFLDJCQUFvQixHQUFlLEVBQVUsU0FBb0I7UUFBN0MsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUFVLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFGdkQsV0FBTSxHQUFzQixJQUFJLFlBQVksRUFBTyxDQUFDO0lBRU8sQ0FBQztJQVJ0RSxzQkFBSSxxQ0FBTTthQUFWLGNBQWUsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQzthQUNyQyxVQUFvQixNQUF3QjtZQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEIsQ0FBQzs7O09BSm9DO0lBVTdCLG9DQUFRLEdBQWhCO1FBQUEsaUJBV0M7UUFWQyxJQUFJLFNBQVMsQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7WUFDakUsU0FBUyxDQUFDLFlBQVksQ0FBQyxZQUFZLENBQXlCLEVBQUUsS0FBSyxFQUFFLElBQUksRUFBRSxDQUFDO2lCQUN6RSxJQUFJLENBQUMsVUFBQyxNQUFtQjtnQkFDdkIsS0FBSSxDQUFDLE9BQWUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO2dCQUN4QyxLQUFJLENBQUMsT0FBZSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9CLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsVUFBQyxHQUFxQjtnQkFDM0IsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUVELDJDQUFlLEdBQWY7UUFDRSxJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDOztnQkE5QkYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHFCQUFxQixFQUFFOzs7O2dCQUp0QixVQUFVO2dCQUFyQixTQUFTOzs7eUJBU25CLEtBQUs7eUJBS0wsTUFBTTs7SUFxQlQsd0JBQUM7Q0FBQSxBQS9CRCxJQStCQztTQTlCWSxpQkFBaUIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIERpcmVjdGl2ZSwgUmVuZGVyZXIyLCBFbGVtZW50UmVmLCBJbnB1dCxcbiAgQWZ0ZXJWaWV3SW5pdCwgT3V0cHV0LCBFdmVudEVtaXR0ZXJcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBEaXJlY3RpdmUoeyBzZWxlY3RvcjogJ1thamZWaWRlb0RpcmVjdGl2ZV0nIH0pXG5leHBvcnQgY2xhc3MgQWpmVmlkZW9EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcblxuICBwcml2YXRlIF9zb3VyY2U6IEhUTUxWaWRlb0VsZW1lbnQ7XG4gIGdldCBzb3VyY2UoKSB7IHJldHVybiB0aGlzLl9zb3VyY2U7IH1cbiAgQElucHV0KCkgc2V0IHNvdXJjZShzb3VyY2U6IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICB0aGlzLl9zb3VyY2UgPSBzb3VyY2U7XG4gICAgdGhpcy5faW5pdENhbSgpO1xuICB9XG5cbiAgQE91dHB1dCgpIGlzSW5pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikgeyB9XG5cbiAgcHJpdmF0ZSBfaW5pdENhbSgpIHtcbiAgICBpZiAobmF2aWdhdG9yLm1lZGlhRGV2aWNlcyAmJiBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSkge1xuICAgICAgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEoPE1lZGlhU3RyZWFtQ29uc3RyYWludHM+eyB2aWRlbzogdHJ1ZSB9KVxuICAgICAgICAudGhlbigoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICh0aGlzLl9zb3VyY2UgYXMgYW55KS5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgKHRoaXMuX3NvdXJjZSBhcyBhbnkpLnBsYXkoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnI6IE1lZGlhU3RyZWFtRXJyb3IpID0+IHtcbiAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVuZGVyZXIuYXBwZW5kQ2hpbGQodGhpcy5fZWwubmF0aXZlRWxlbWVudCwgdGhpcy5fc291cmNlKTtcbiAgICB0aGlzLmlzSW5pdC5lbWl0KCk7XG4gIH1cbn1cbiJdfQ==