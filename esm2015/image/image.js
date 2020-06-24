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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW1hZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9pbWFnZS9pbWFnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsU0FBUyxFQUNULFVBQVUsRUFDVixLQUFLLEVBR0wsU0FBUyxFQUNULG1CQUFtQixFQUNwQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxlQUFlLEVBQWMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBRy9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFMUM7SUFBQSxNQUNzQixRQUFRO1FBaUQ1QixZQUNZLEdBQWUsRUFBVSxTQUFvQixFQUFVLGFBQTJCO1lBQWxGLFFBQUcsR0FBSCxHQUFHLENBQVk7WUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1lBQVUsa0JBQWEsR0FBYixhQUFhLENBQWM7WUFqQnJGLGVBQVUsR0FBRyxZQUFZLENBQUM7WUFFM0IsZUFBVSxHQUFHLElBQUksZUFBZSxDQUFvQixJQUFJLENBQUMsQ0FBQztZQUN6RCxjQUFTLEdBQWtDLElBQUksQ0FBQyxVQUFVLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFM0UsU0FBSSxHQUFHLElBQUksZUFBZSxDQUE4QixJQUFJLENBQUMsQ0FBQztZQUM3RCxRQUFHLEdBQTRDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFekUsYUFBUSxHQUFHLElBQUksZUFBZSxDQUFvQixJQUFJLENBQUMsQ0FBQztZQUN2RCxZQUFPLEdBQWtDLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUM7WUFFdkUsY0FBUyxHQUFHLElBQUksZUFBZSxDQUFjLElBQUksQ0FBQyxDQUFDO1lBQ2xELGFBQVEsR0FBNEIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUVuRSxhQUFRLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztZQUlwQyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZFLENBQUM7UUFqREQ7Ozs7O1dBS0c7UUFDSCxJQUNJLElBQUksQ0FBQyxJQUF1QjtZQUM5QixJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM3QixDQUFDO1FBRUQsSUFDSSxRQUFRLENBQUMsUUFBcUI7WUFDaEMsUUFBUSxHQUFHLE9BQU8sUUFBUSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFDeEQsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQ1YsUUFBUSxDQUFDLFVBQVUsQ0FBQyw0QkFBNEIsQ0FBQyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxhQUFhLENBQUMsOEJBQThCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztnQkFDN0QsUUFBUSxDQUFDLENBQUM7UUFDcEIsQ0FBQztRQUVELElBQ0ksSUFBSSxDQUFDLElBQXVCO1lBQzlCLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFRCxJQUNJLElBQUksQ0FBQyxJQUFpQjtZQUN4QixJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QixDQUFDO1FBdUJELFdBQVc7WUFDVCxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtnQkFDMUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxXQUFXLEVBQUUsQ0FBQzthQUM3QjtRQUNILENBQUM7UUFFRCxRQUFRO1lBQ04sSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO1FBQ3pCLENBQUM7UUFFTyxlQUFlO1lBQ3JCLE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDdEMsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO2dCQUNoQixPQUFPO2FBQ1I7WUFDRCxNQUFNLE1BQU0sR0FBRyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUM7WUFDNUMsSUFBSSxJQUFJLENBQUMsYUFBYSxJQUFJLElBQUksSUFBSSxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO2dCQUMzRSxPQUFPO2FBQ1I7WUFDRCxNQUFNLFFBQVEsR0FBVyxNQUFNLENBQUMsUUFBUSxDQUFDO1lBQ3pDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ3hDLE1BQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDO2dCQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDOUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsbUJBQW1CLENBQUMsU0FBUyxDQUFDLENBQUM7YUFDaEY7UUFDSCxDQUFDOzs7Z0JBaEZGLFNBQVM7OztnQkFiUixVQUFVO2dCQUlWLFNBQVM7Z0JBR0gsWUFBWTs7O3VCQWdCakIsS0FBSzsyQkFLTCxLQUFLO3VCQVNMLEtBQUs7dUJBS0wsS0FBSzs7SUFvRFIsZUFBQztLQUFBO1NBaEZxQixRQUFRIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgUmVuZGVyZXIyLFxuICBSZW5kZXJlclN0eWxlRmxhZ3MyXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZJbWFnZUljb259IGZyb20gJy4vaW1hZ2UtaWNvbic7XG5pbXBvcnQge0FqZkltYWdlVHlwZX0gZnJvbSAnLi9pbWFnZS10eXBlJztcblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmSW1hZ2UgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIGljb25Db21wb25lbnQ6IEVsZW1lbnRSZWY7XG5cbiAgLyoqXG4gICAqIGlmIDAgdGFrZSBpbWFnZSBieSB1cmxcbiAgICogaWYgMSB0YWtlIGltYWdlIGJ5IGljb25cbiAgICogaWYgMiB0YWtlIGltYWdlIGJ5IGNsYXNzXG4gICAqXG4gICAqL1xuICBASW5wdXQoKVxuICBzZXQgdHlwZSh0eXBlOiBBamZJbWFnZVR5cGV8bnVsbCkge1xuICAgIHRoaXMuX2ltYWdlVHlwZS5uZXh0KHR5cGUpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGltYWdlVXJsKGltYWdlVXJsOiBzdHJpbmd8bnVsbCkge1xuICAgIGltYWdlVXJsID0gdHlwZW9mIGltYWdlVXJsID09PSAnc3RyaW5nJyA/IGltYWdlVXJsIDogJyc7XG4gICAgdGhpcy5fdXJsLm5leHQoXG4gICAgICAgIGltYWdlVXJsLnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsJykgP1xuICAgICAgICAgICAgdGhpcy5fZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChpbWFnZVVybCkgOlxuICAgICAgICAgICAgaW1hZ2VVcmwpO1xuICB9XG5cbiAgQElucHV0KClcbiAgc2V0IGljb24oaWNvbjogQWpmSW1hZ2VJY29ufG51bGwpIHtcbiAgICB0aGlzLl9pY29uT2JqLm5leHQoaWNvbik7XG4gIH1cblxuICBASW5wdXQoKVxuICBzZXQgZmxhZyhmbGFnOiBzdHJpbmd8bnVsbCkge1xuICAgIHRoaXMuX2ZsYWdOYW1lLm5leHQoZmxhZyk7XG4gIH1cblxuICByZWFkb25seSBpbWFnZVR5cGVzID0gQWpmSW1hZ2VUeXBlO1xuXG4gIHByaXZhdGUgX2ltYWdlVHlwZSA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmSW1hZ2VUeXBlfG51bGw+KG51bGwpO1xuICByZWFkb25seSBpbWFnZVR5cGU6IE9ic2VydmFibGU8QWpmSW1hZ2VUeXBlfG51bGw+ID0gdGhpcy5faW1hZ2VUeXBlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX3VybCA9IG5ldyBCZWhhdmlvclN1YmplY3Q8c3RyaW5nfFNhZmVSZXNvdXJjZVVybHxudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgdXJsOiBPYnNlcnZhYmxlPHN0cmluZ3xTYWZlUmVzb3VyY2VVcmx8bnVsbD4gPSB0aGlzLl91cmwuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfaWNvbk9iaiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8QWpmSW1hZ2VJY29ufG51bGw+KG51bGwpO1xuICByZWFkb25seSBpY29uT2JqOiBPYnNlcnZhYmxlPEFqZkltYWdlSWNvbnxudWxsPiA9IHRoaXMuX2ljb25PYmouYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfZmxhZ05hbWUgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHN0cmluZ3xudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZmxhZ05hbWU6IE9ic2VydmFibGU8c3RyaW5nfG51bGw+ID0gdGhpcy5fZmxhZ05hbWUuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfaWNvblN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyLCBwcml2YXRlIF9kb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcikge1xuICAgIHRoaXMuX2ljb25TdWIgPSB0aGlzLmljb25PYmouc3Vic2NyaWJlKCgpID0+IHRoaXMuX3VwZGF0ZUljb25TaXplKCkpO1xuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2ljb25TdWIgJiYgIXRoaXMuX2ljb25TdWIuY2xvc2VkKSB7XG4gICAgICB0aGlzLl9pY29uU3ViLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fdXBkYXRlSWNvblNpemUoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUljb25TaXplKCk6IHZvaWQge1xuICAgIGNvbnN0IGljb24gPSB0aGlzLl9pY29uT2JqLmdldFZhbHVlKCk7XG4gICAgaWYgKGljb24gPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBzdHlsZXMgPSB0aGlzLl9lbC5uYXRpdmVFbGVtZW50LnN0eWxlO1xuICAgIGlmICh0aGlzLmljb25Db21wb25lbnQgPT0gbnVsbCB8fCBzdHlsZXMgPT0gbnVsbCB8fCBzdHlsZXMuZm9udFNpemUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmb250U2l6ZTogc3RyaW5nID0gc3R5bGVzLmZvbnRTaXplO1xuICAgIGlmIChmb250U2l6ZS5tYXRjaCgvXlswLTldK3B4JC8pICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGVsID0gdGhpcy5pY29uQ29tcG9uZW50Lm5hdGl2ZUVsZW1lbnQ7XG4gICAgICB0aGlzLl9yZW5kZXJlci5zZXRTdHlsZShlbCwgJ3dpZHRoJywgZm9udFNpemUsIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KTtcbiAgICAgIHRoaXMuX3JlbmRlcmVyLnNldFN0eWxlKGVsLCAnaGVpZ2h0JywgZm9udFNpemUsIFJlbmRlcmVyU3R5bGVGbGFnczIuSW1wb3J0YW50KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==