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
import { Directive, Input, RendererStyleFlags2, } from '@angular/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AjfImageType } from './image-type';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
export class AjfImage {
    constructor(_el, _renderer, _domSanitizer) {
        this._el = _el;
        this._renderer = _renderer;
        this._domSanitizer = _domSanitizer;
        this.imageTypes = AjfImageType;
        this._imageType = new BehaviorSubject(null);
        this.imageType = this
            ._imageType;
        this._url = new BehaviorSubject(null);
        this.url = this._url;
        this._iconObj = new BehaviorSubject(null);
        this.iconObj = this
            ._iconObj;
        this._flagName = new BehaviorSubject(null);
        this.flagName = this._flagName;
        this._iconSub = Subscription.EMPTY;
        this._iconSub = this.iconObj.subscribe(() => this._updateIconSize());
    }
    /**
     * if 0 take image by url
     * if 1 take image by icon
     * if 2 take image by class
     *
     */
    set type(type) {
        this._imageType.next(type);
    }
    set imageUrl(imageUrl) {
        imageUrl = typeof imageUrl === 'string' ? imageUrl : '';
        this._url.next(imageUrl.startsWith('data:image/svg+xml;base64,')
            ? this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl)
            : imageUrl);
    }
    set icon(icon) {
        this._iconObj.next(icon);
    }
    set flag(flag) {
        this._flagName.next(flag);
    }
    ngOnDestroy() {
        if (this._iconSub && !this._iconSub.closed) {
            this._iconSub.unsubscribe();
        }
    }
    ngOnInit() {
        this._updateIconSize();
    }
    _updateIconSize() {
        const icon = this._iconObj.getValue();
        if (icon == null) {
            return;
        }
        const styles = this._el.nativeElement.style;
        if (this.iconComponent == null || styles == null || styles.fontSize == null) {
            return;
        }
        const fontSize = styles.fontSize;
        if (fontSize.match(/^[0-9]+px$/) != null) {
            const el = this.iconComponent.nativeElement;
            this._renderer.setStyle(el, 'width', fontSize, RendererStyleFlags2.Important);
            this._renderer.setStyle(el, 'height', fontSize, RendererStyleFlags2.Important);
        }
    }
}
AjfImage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfImage, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }, { token: i1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Directive });
AjfImage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfImage, inputs: { type: "type", imageUrl: "imageUrl", icon: "icon", flag: "flag" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfImage, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }, { type: i1.DomSanitizer }]; }, propDecorators: { type: [{
                type: Input
            }], imageUrl: [{
                type: Input
            }], icon: [{
                type: Input
            }], flag: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2ltYWdlL3NyYy9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUVULEtBQUssRUFJTCxtQkFBbUIsR0FDcEIsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUFDLGVBQWUsRUFBYyxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFHL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGNBQWMsQ0FBQzs7O0FBRzFDLE1BQU0sT0FBZ0IsUUFBUTtJQXNENUIsWUFDVSxHQUFlLEVBQ2YsU0FBb0IsRUFDcEIsYUFBMkI7UUFGM0IsUUFBRyxHQUFILEdBQUcsQ0FBWTtRQUNmLGNBQVMsR0FBVCxTQUFTLENBQVc7UUFDcEIsa0JBQWEsR0FBYixhQUFhLENBQWM7UUF2QjVCLGVBQVUsR0FBRyxZQUFZLENBQUM7UUFFM0IsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFzQixJQUFJLENBQUMsQ0FBQztRQUMzRCxjQUFTLEdBQW9DLElBQUk7YUFDdkQsVUFBNkMsQ0FBQztRQUV6QyxTQUFJLEdBQUcsSUFBSSxlQUFlLENBQWtDLElBQUksQ0FBQyxDQUFDO1FBQ2pFLFFBQUcsR0FBZ0QsSUFBSSxDQUFDLElBRWhFLENBQUM7UUFFTSxhQUFRLEdBQUcsSUFBSSxlQUFlLENBQXNCLElBQUksQ0FBQyxDQUFDO1FBQ3pELFlBQU8sR0FBb0MsSUFBSTthQUNyRCxRQUEyQyxDQUFDO1FBRXZDLGNBQVMsR0FBRyxJQUFJLGVBQWUsQ0FBZ0IsSUFBSSxDQUFDLENBQUM7UUFDcEQsYUFBUSxHQUE4QixJQUFJLENBQUMsU0FBc0MsQ0FBQztRQUVuRixhQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQU9wQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO0lBQ3ZFLENBQUM7SUF6REQ7Ozs7O09BS0c7SUFDSCxJQUNJLElBQUksQ0FBQyxJQUF5QjtRQUNoQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBRUQsSUFDSSxRQUFRLENBQUMsUUFBdUI7UUFDbEMsUUFBUSxHQUFHLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7UUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1osUUFBUSxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQztZQUMvQyxDQUFDLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLENBQUM7WUFDN0QsQ0FBQyxDQUFDLFFBQVEsQ0FDYixDQUFDO0lBQ0osQ0FBQztJQUVELElBQ0ksSUFBSSxDQUFDLElBQXlCO1FBQ2hDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxJQUNJLElBQUksQ0FBQyxJQUFtQjtRQUMxQixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM1QixDQUFDO0lBOEJELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtZQUMxQyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQzdCO0lBQ0gsQ0FBQztJQUVELFFBQVE7UUFDTixJQUFJLENBQUMsZUFBZSxFQUFFLENBQUM7SUFDekIsQ0FBQztJQUVPLGVBQWU7UUFDckIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUN0QyxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7WUFDaEIsT0FBTztTQUNSO1FBQ0QsTUFBTSxNQUFNLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQzVDLElBQUksSUFBSSxDQUFDLGFBQWEsSUFBSSxJQUFJLElBQUksTUFBTSxJQUFJLElBQUksSUFBSSxNQUFNLENBQUMsUUFBUSxJQUFJLElBQUksRUFBRTtZQUMzRSxPQUFPO1NBQ1I7UUFDRCxNQUFNLFFBQVEsR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQ3pDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDeEMsTUFBTSxFQUFFLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxhQUFhLENBQUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7U0FDaEY7SUFDSCxDQUFDOztxR0F2Rm1CLFFBQVE7eUZBQVIsUUFBUTsyRkFBUixRQUFRO2tCQUQ3QixTQUFTO29KQVdKLElBQUk7c0JBRFAsS0FBSztnQkFNRixRQUFRO3NCQURYLEtBQUs7Z0JBV0YsSUFBSTtzQkFEUCxLQUFLO2dCQU1GLElBQUk7c0JBRFAsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgUmVuZGVyZXJTdHlsZUZsYWdzMixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7QmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkltYWdlSWNvbn0gZnJvbSAnLi9pbWFnZS1pY29uJztcbmltcG9ydCB7QWpmSW1hZ2VUeXBlfSBmcm9tICcuL2ltYWdlLXR5cGUnO1xuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZJbWFnZSBpbXBsZW1lbnRzIE9uRGVzdHJveSwgT25Jbml0IHtcbiAgaWNvbkNvbXBvbmVudDogRWxlbWVudFJlZiB8IHVuZGVmaW5lZDtcblxuICAvKipcbiAgICogaWYgMCB0YWtlIGltYWdlIGJ5IHVybFxuICAgKiBpZiAxIHRha2UgaW1hZ2UgYnkgaWNvblxuICAgKiBpZiAyIHRha2UgaW1hZ2UgYnkgY2xhc3NcbiAgICpcbiAgICovXG4gIEBJbnB1dCgpXG4gIHNldCB0eXBlKHR5cGU6IEFqZkltYWdlVHlwZSB8IG51bGwpIHtcbiAgICB0aGlzLl9pbWFnZVR5cGUubmV4dCh0eXBlKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBpbWFnZVVybChpbWFnZVVybDogc3RyaW5nIHwgbnVsbCkge1xuICAgIGltYWdlVXJsID0gdHlwZW9mIGltYWdlVXJsID09PSAnc3RyaW5nJyA/IGltYWdlVXJsIDogJyc7XG4gICAgdGhpcy5fdXJsLm5leHQoXG4gICAgICBpbWFnZVVybC5zdGFydHNXaXRoKCdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCcpXG4gICAgICAgID8gdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChpbWFnZVVybClcbiAgICAgICAgOiBpbWFnZVVybCxcbiAgICApO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGljb24oaWNvbjogQWpmSW1hZ2VJY29uIHwgbnVsbCkge1xuICAgIHRoaXMuX2ljb25PYmoubmV4dChpY29uKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBmbGFnKGZsYWc6IHN0cmluZyB8IG51bGwpIHtcbiAgICB0aGlzLl9mbGFnTmFtZS5uZXh0KGZsYWcpO1xuICB9XG5cbiAgcmVhZG9ubHkgaW1hZ2VUeXBlcyA9IEFqZkltYWdlVHlwZTtcblxuICBwcml2YXRlIF9pbWFnZVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkltYWdlVHlwZSB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBpbWFnZVR5cGU6IE9ic2VydmFibGU8QWpmSW1hZ2VUeXBlIHwgbnVsbD4gPSB0aGlzXG4gICAgLl9pbWFnZVR5cGUgYXMgT2JzZXJ2YWJsZTxBamZJbWFnZVR5cGUgfCBudWxsPjtcblxuICBwcml2YXRlIF91cmwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IFNhZmVSZXNvdXJjZVVybCB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSB1cmw6IE9ic2VydmFibGU8c3RyaW5nIHwgU2FmZVJlc291cmNlVXJsIHwgbnVsbD4gPSB0aGlzLl91cmwgYXMgT2JzZXJ2YWJsZTxcbiAgICBzdHJpbmcgfCBTYWZlUmVzb3VyY2VVcmwgfCBudWxsXG4gID47XG5cbiAgcHJpdmF0ZSBfaWNvbk9iaiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmSW1hZ2VJY29uIHwgbnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGljb25PYmo6IE9ic2VydmFibGU8QWpmSW1hZ2VJY29uIHwgbnVsbD4gPSB0aGlzXG4gICAgLl9pY29uT2JqIGFzIE9ic2VydmFibGU8QWpmSW1hZ2VJY29uIHwgbnVsbD47XG5cbiAgcHJpdmF0ZSBfZmxhZ05hbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZyB8IG51bGw+KG51bGwpO1xuICByZWFkb25seSBmbGFnTmFtZTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPiA9IHRoaXMuX2ZsYWdOYW1lIGFzIE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD47XG5cbiAgcHJpdmF0ZSBfaWNvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZixcbiAgICBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLFxuICAgIHByaXZhdGUgX2RvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICApIHtcbiAgICB0aGlzLl9pY29uU3ViID0gdGhpcy5pY29uT2JqLnN1YnNjcmliZSgoKSA9PiB0aGlzLl91cGRhdGVJY29uU2l6ZSgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pY29uU3ViICYmICF0aGlzLl9pY29uU3ViLmNsb3NlZCkge1xuICAgICAgdGhpcy5faWNvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZUljb25TaXplKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVJY29uU2l6ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBpY29uID0gdGhpcy5faWNvbk9iai5nZXRWYWx1ZSgpO1xuICAgIGlmIChpY29uID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3R5bGVzID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5zdHlsZTtcbiAgICBpZiAodGhpcy5pY29uQ29tcG9uZW50ID09IG51bGwgfHwgc3R5bGVzID09IG51bGwgfHwgc3R5bGVzLmZvbnRTaXplID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZm9udFNpemU6IHN0cmluZyA9IHN0eWxlcy5mb250U2l6ZTtcbiAgICBpZiAoZm9udFNpemUubWF0Y2goL15bMC05XStweCQvKSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXMuaWNvbkNvbXBvbmVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWwsICd3aWR0aCcsIGZvbnRTaXplLCBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbCwgJ2hlaWdodCcsIGZvbnRTaXplLCBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCk7XG4gICAgfVxuICB9XG59XG4iXX0=