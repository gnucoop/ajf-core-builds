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
import { Directive, ElementRef, Input, Renderer2, RendererStyleFlags2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject, Subscription } from 'rxjs';
import { AjfImageType } from './image-type';
let AjfImage = /** @class */ (() => {
    class AjfImage {
        constructor(_el, _renderer, _domSanitizer) {
            this._el = _el;
            this._renderer = _renderer;
            this._domSanitizer = _domSanitizer;
            this.imageTypes = AjfImageType;
            this._imageType = new BehaviorSubject(null);
            this.imageType = this._imageType.asObservable();
            this._url = new BehaviorSubject(null);
            this.url = this._url.asObservable();
            this._iconObj = new BehaviorSubject(null);
            this.iconObj = this._iconObj.asObservable();
            this._flagName = new BehaviorSubject(null);
            this.flagName = this._flagName.asObservable();
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
            this._url.next(imageUrl.startsWith('data:image/svg+xml;base64,') ?
                this._domSanitizer.bypassSecurityTrustResourceUrl(imageUrl) :
                imageUrl);
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
    AjfImage.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfImage.ctorParameters = () => [
        { type: ElementRef },
        { type: Renderer2 },
        { type: DomSanitizer }
    ];
    AjfImage.propDecorators = {
        type: [{ type: Input }],
        imageUrl: [{ type: Input }],
        icon: [{ type: Input }],
        flag: [{ type: Input }]
    };
    return AjfImage;
})();
export { AjfImage };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9pbWFnZS9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxFQUNULG1CQUFtQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVBQWMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFMUM7SUFBQSxNQUNzQixRQUFRO1FBaUQ1QixZQUNZLEdBQWUsRUFBVSxTQUFvQixFQUFVLGFBQTJCO1lBQWxGLFFBQUcsR0FBSCxHQUFHLENBQVk7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7WUFqQnJGLGVBQVUsR0FBRyxZQUFZLENBQUM7WUFFM0IsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFvQixJQUFJLENBQUMsQ0FBQztZQUN6RCxjQUFTLEdBQWtDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFM0UsU0FBSSxHQUFHLElBQUksZUFBZSxDQUE4QixJQUFJLENBQUMsQ0FBQztZQUM3RCxRQUFHLEdBQTRDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFekUsYUFBUSxHQUFHLElBQUksZUFBZSxDQUFvQixJQUFJLENBQUMsQ0FBQztZQUN2RCxZQUFPLEdBQWtDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFdkUsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFjLElBQUksQ0FBQyxDQUFDO1lBQ2xELGFBQVEsR0FBNEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVuRSxhQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUlwQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFqREQ7Ozs7O1dBS0c7UUFDSCxJQUNJLElBQUksQ0FBQyxJQUF1QjtZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsSUFDSSxRQUFRLENBQUMsUUFBcUI7WUFDaEMsUUFBUSxHQUFHLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1YsUUFBUSxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsOEJBQThCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDN0QsUUFBUSxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUVELElBQ0ksSUFBSSxDQUFDLElBQXVCO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUNJLElBQUksQ0FBQyxJQUFpQjtZQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBdUJELFdBQVc7WUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM3QjtRQUNILENBQUM7UUFFRCxRQUFRO1lBQ04sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFTyxlQUFlO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNoQixPQUFPO2FBQ1I7WUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDNUMsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUMzRSxPQUFPO2FBQ1I7WUFDRCxNQUFNLFFBQVEsR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3pDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ3hDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDaEY7UUFDSCxDQUFDOzs7Z0JBaEZGLFNBQVM7Ozs7Z0JBYlIsVUFBVTtnQkFJVixTQUFTO2dCQUdILFlBQVk7Ozt1QkFnQmpCLEtBQUs7MkJBS0wsS0FBSzt1QkFTTCxLQUFLO3VCQUtMLEtBQUs7O0lBb0RSLGVBQUM7S0FBQTtTQWhGcUIsUUFBUSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPbkluaXQsXG4gIFJlbmRlcmVyMixcbiAgUmVuZGVyZXJTdHlsZUZsYWdzMlxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtCZWhhdmlvclN1YmplY3QsIE9ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmSW1hZ2VJY29ufSBmcm9tICcuL2ltYWdlLWljb24nO1xuaW1wb3J0IHtBamZJbWFnZVR5cGV9IGZyb20gJy4vaW1hZ2UtdHlwZSc7XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkltYWdlIGltcGxlbWVudHMgT25EZXN0cm95LCBPbkluaXQge1xuICBpY29uQ29tcG9uZW50OiBFbGVtZW50UmVmO1xuXG4gIC8qKlxuICAgKiBpZiAwIHRha2UgaW1hZ2UgYnkgdXJsXG4gICAqIGlmIDEgdGFrZSBpbWFnZSBieSBpY29uXG4gICAqIGlmIDIgdGFrZSBpbWFnZSBieSBjbGFzc1xuICAgKlxuICAgKi9cbiAgQElucHV0KClcbiAgc2V0IHR5cGUodHlwZTogQWpmSW1hZ2VUeXBlfG51bGwpIHtcbiAgICB0aGlzLl9pbWFnZVR5cGUubmV4dCh0eXBlKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBpbWFnZVVybChpbWFnZVVybDogc3RyaW5nfG51bGwpIHtcbiAgICBpbWFnZVVybCA9IHR5cGVvZiBpbWFnZVVybCA9PT0gJ3N0cmluZycgPyBpbWFnZVVybCA6ICcnO1xuICAgIHRoaXMuX3VybC5uZXh0KFxuICAgICAgICBpbWFnZVVybC5zdGFydHNXaXRoKCdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LCcpID9cbiAgICAgICAgICAgIHRoaXMuX2RvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoaW1hZ2VVcmwpIDpcbiAgICAgICAgICAgIGltYWdlVXJsKTtcbiAgfVxuXG4gIEBJbnB1dCgpXG4gIHNldCBpY29uKGljb246IEFqZkltYWdlSWNvbnxudWxsKSB7XG4gICAgdGhpcy5faWNvbk9iai5uZXh0KGljb24pO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGZsYWcoZmxhZzogc3RyaW5nfG51bGwpIHtcbiAgICB0aGlzLl9mbGFnTmFtZS5uZXh0KGZsYWcpO1xuICB9XG5cbiAgcmVhZG9ubHkgaW1hZ2VUeXBlcyA9IEFqZkltYWdlVHlwZTtcblxuICBwcml2YXRlIF9pbWFnZVR5cGUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkltYWdlVHlwZXxudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgaW1hZ2VUeXBlOiBPYnNlcnZhYmxlPEFqZkltYWdlVHlwZXxudWxsPiA9IHRoaXMuX2ltYWdlVHlwZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF91cmwgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ3xTYWZlUmVzb3VyY2VVcmx8bnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IHVybDogT2JzZXJ2YWJsZTxzdHJpbmd8U2FmZVJlc291cmNlVXJsfG51bGw+ID0gdGhpcy5fdXJsLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2ljb25PYmogPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEFqZkltYWdlSWNvbnxudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgaWNvbk9iajogT2JzZXJ2YWJsZTxBamZJbWFnZUljb258bnVsbD4gPSB0aGlzLl9pY29uT2JqLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2ZsYWdOYW1lID0gbmV3IEJlaGF2aW9yU3ViamVjdDxzdHJpbmd8bnVsbD4obnVsbCk7XG4gIHJlYWRvbmx5IGZsYWdOYW1lOiBPYnNlcnZhYmxlPHN0cmluZ3xudWxsPiA9IHRoaXMuX2ZsYWdOYW1lLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2ljb25TdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9lbDogRWxlbWVudFJlZiwgcHJpdmF0ZSBfcmVuZGVyZXI6IFJlbmRlcmVyMiwgcHJpdmF0ZSBfZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIpIHtcbiAgICB0aGlzLl9pY29uU3ViID0gdGhpcy5pY29uT2JqLnN1YnNjcmliZSgoKSA9PiB0aGlzLl91cGRhdGVJY29uU2l6ZSgpKTtcbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9pY29uU3ViICYmICF0aGlzLl9pY29uU3ViLmNsb3NlZCkge1xuICAgICAgdGhpcy5faWNvblN1Yi51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3VwZGF0ZUljb25TaXplKCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVJY29uU2l6ZSgpOiB2b2lkIHtcbiAgICBjb25zdCBpY29uID0gdGhpcy5faWNvbk9iai5nZXRWYWx1ZSgpO1xuICAgIGlmIChpY29uID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgc3R5bGVzID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5zdHlsZTtcbiAgICBpZiAodGhpcy5pY29uQ29tcG9uZW50ID09IG51bGwgfHwgc3R5bGVzID09IG51bGwgfHwgc3R5bGVzLmZvbnRTaXplID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZm9udFNpemU6IHN0cmluZyA9IHN0eWxlcy5mb250U2l6ZTtcbiAgICBpZiAoZm9udFNpemUubWF0Y2goL15bMC05XStweCQvKSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBlbCA9IHRoaXMuaWNvbkNvbXBvbmVudC5uYXRpdmVFbGVtZW50O1xuICAgICAgdGhpcy5fcmVuZGVyZXIuc2V0U3R5bGUoZWwsICd3aWR0aCcsIGZvbnRTaXplLCBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCk7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbCwgJ2hlaWdodCcsIGZvbnRTaXplLCBSZW5kZXJlclN0eWxlRmxhZ3MyLkltcG9ydGFudCk7XG4gICAgfVxuICB9XG59XG4iXX0=