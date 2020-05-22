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
import { __decorate, __metadata } from "tslib";
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
let AjfVideoDirective = /** @class */ (() => {
    let AjfVideoDirective = class AjfVideoDirective {
        constructor(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
            this.isInit = new EventEmitter();
        }
        get source() {
            return this._source;
        }
        set source(source) {
            this._source = source;
            this._initCam();
        }
        _initCam() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then((stream) => {
                    this._source.srcObject = stream;
                    this._source.play();
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
        }
        ngAfterViewInit() {
            this._renderer.appendChild(this._el.nativeElement, this._source);
            this.isInit.emit();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", HTMLVideoElement),
        __metadata("design:paramtypes", [HTMLVideoElement])
    ], AjfVideoDirective.prototype, "source", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AjfVideoDirective.prototype, "isInit", void 0);
    AjfVideoDirective = __decorate([
        Directive({ selector: '[ajfVideoDirective]' }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], AjfVideoDirective);
    return AjfVideoDirective;
})();
export { AjfVideoDirective };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvY29tbW9uL3ZpZGVvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUVMLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLEtBQUssRUFDTCxNQUFNLEVBQ04sU0FBUyxFQUNWLE1BQU0sZUFBZSxDQUFDO0FBR3ZCO0lBQUEsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7UUFhNUIsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1lBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1lBRnZELFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztRQUVNLENBQUM7UUFYckUsSUFBSSxNQUFNO1lBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO1FBQ3RCLENBQUM7UUFFRCxJQUFJLE1BQU0sQ0FBQyxNQUF3QjtZQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztZQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbEIsQ0FBQztRQU1PLFFBQVE7WUFDZCxJQUFJLFNBQVMsQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2pFLFNBQVMsQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUF5QixFQUFDLEtBQUssRUFBRSxJQUFJLEVBQUMsQ0FBQztxQkFDckUsSUFBSSxDQUFDLENBQUMsTUFBbUIsRUFBRSxFQUFFO29CQUMzQixJQUFJLENBQUMsT0FBZSxDQUFDLFNBQVMsR0FBRyxNQUFNLENBQUM7b0JBQ3hDLElBQUksQ0FBQyxPQUFlLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQy9CLENBQUMsQ0FBQztxQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFxQixFQUFFLEVBQUU7b0JBQy9CLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ25CLENBQUMsQ0FBQyxDQUFDO2FBQ1I7UUFDSCxDQUFDO1FBRUQsZUFBZTtZQUNiLElBQUksQ0FBQyxTQUFTLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsYUFBYSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztZQUNqRSxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQ3JCLENBQUM7S0FDRixDQUFBO0lBMUJDO1FBREMsS0FBSyxFQUFFO2tDQUNXLGdCQUFnQjt5Q0FBaEIsZ0JBQWdCO21EQUdsQztJQUVTO1FBQVQsTUFBTSxFQUFFO2tDQUFTLFlBQVk7cURBQWdDO0lBWG5ELGlCQUFpQjtRQUQ3QixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUscUJBQXFCLEVBQUMsQ0FBQzt5Q0FjbEIsVUFBVSxFQUFxQixTQUFTO09BYnRELGlCQUFpQixDQWdDN0I7SUFBRCx3QkFBQztLQUFBO1NBaENZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPdXRwdXQsXG4gIFJlbmRlcmVyMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbYWpmVmlkZW9EaXJlY3RpdmVdJ30pXG5leHBvcnQgY2xhc3MgQWpmVmlkZW9EaXJlY3RpdmUgaW1wbGVtZW50cyBBZnRlclZpZXdJbml0IHtcbiAgcHJpdmF0ZSBfc291cmNlOiBIVE1MVmlkZW9FbGVtZW50O1xuICBnZXQgc291cmNlKCkge1xuICAgIHJldHVybiB0aGlzLl9zb3VyY2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHNvdXJjZShzb3VyY2U6IEhUTUxWaWRlb0VsZW1lbnQpIHtcbiAgICB0aGlzLl9zb3VyY2UgPSBzb3VyY2U7XG4gICAgdGhpcy5faW5pdENhbSgpO1xuICB9XG5cbiAgQE91dHB1dCgpIGlzSW5pdDogRXZlbnRFbWl0dGVyPGFueT4gPSBuZXcgRXZlbnRFbWl0dGVyPGFueT4oKTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMikge31cblxuICBwcml2YXRlIF9pbml0Q2FtKCkge1xuICAgIGlmIChuYXZpZ2F0b3IubWVkaWFEZXZpY2VzICYmIG5hdmlnYXRvci5tZWRpYURldmljZXMuZ2V0VXNlck1lZGlhKSB7XG4gICAgICBuYXZpZ2F0b3IubWVkaWFEZXZpY2VzLmdldFVzZXJNZWRpYSg8TWVkaWFTdHJlYW1Db25zdHJhaW50cz57dmlkZW86IHRydWV9KVxuICAgICAgICAgIC50aGVuKChzdHJlYW06IE1lZGlhU3RyZWFtKSA9PiB7XG4gICAgICAgICAgICAodGhpcy5fc291cmNlIGFzIGFueSkuc3JjT2JqZWN0ID0gc3RyZWFtO1xuICAgICAgICAgICAgKHRoaXMuX3NvdXJjZSBhcyBhbnkpLnBsYXkoKTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5jYXRjaCgoZXJyOiBNZWRpYVN0cmVhbUVycm9yKSA9PiB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIpO1xuICAgICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9zb3VyY2UpO1xuICAgIHRoaXMuaXNJbml0LmVtaXQoKTtcbiAgfVxufVxuIl19