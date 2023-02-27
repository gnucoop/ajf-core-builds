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
import { NgModule } from '@angular/core';
import { ApplyStylesDirective } from './apply-styles-directive';
import { AutofocusDirective } from './auto-focus.directive';
import { AjfDndDirective } from './dnd-directive';
import { FormatIfNumber } from './format-if-number';
import { TranslateIfString } from './translate-if-string';
import * as i0 from "@angular/core";
export class AjfCommonModule {
}
AjfCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfCommonModule, declarations: [AjfDndDirective,
        ApplyStylesDirective,
        AutofocusDirective,
        FormatIfNumber,
        TranslateIfString], exports: [AjfDndDirective,
        ApplyStylesDirective,
        AutofocusDirective,
        FormatIfNumber,
        TranslateIfString] });
AjfCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfCommonModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AjfDndDirective,
                        ApplyStylesDirective,
                        AutofocusDirective,
                        FormatIfNumber,
                        TranslateIfString,
                    ],
                    exports: [
                        AjfDndDirective,
                        ApplyStylesDirective,
                        AutofocusDirective,
                        FormatIfNumber,
                        TranslateIfString,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvY29tbW9uL3NyYy9jb21tb24tbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQzs7QUFrQnhELE1BQU0sT0FBTyxlQUFlOzs0R0FBZixlQUFlOzZHQUFmLGVBQWUsaUJBZHhCLGVBQWU7UUFDZixvQkFBb0I7UUFDcEIsa0JBQWtCO1FBQ2xCLGNBQWM7UUFDZCxpQkFBaUIsYUFHakIsZUFBZTtRQUNmLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsY0FBYztRQUNkLGlCQUFpQjs2R0FHUixlQUFlOzJGQUFmLGVBQWU7a0JBaEIzQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixlQUFlO3dCQUNmLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLGlCQUFpQjtxQkFDbEI7b0JBQ0QsT0FBTyxFQUFFO3dCQUNQLGVBQWU7d0JBQ2Ysb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsaUJBQWlCO3FCQUNsQjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QXBwbHlTdHlsZXNEaXJlY3RpdmV9IGZyb20gJy4vYXBwbHktc3R5bGVzLWRpcmVjdGl2ZSc7XG5pbXBvcnQge0F1dG9mb2N1c0RpcmVjdGl2ZX0gZnJvbSAnLi9hdXRvLWZvY3VzLmRpcmVjdGl2ZSc7XG5pbXBvcnQge0FqZkRuZERpcmVjdGl2ZX0gZnJvbSAnLi9kbmQtZGlyZWN0aXZlJztcbmltcG9ydCB7Rm9ybWF0SWZOdW1iZXJ9IGZyb20gJy4vZm9ybWF0LWlmLW51bWJlcic7XG5pbXBvcnQge1RyYW5zbGF0ZUlmU3RyaW5nfSBmcm9tICcuL3RyYW5zbGF0ZS1pZi1zdHJpbmcnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZEbmREaXJlY3RpdmUsXG4gICAgQXBwbHlTdHlsZXNEaXJlY3RpdmUsXG4gICAgQXV0b2ZvY3VzRGlyZWN0aXZlLFxuICAgIEZvcm1hdElmTnVtYmVyLFxuICAgIFRyYW5zbGF0ZUlmU3RyaW5nLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWpmRG5kRGlyZWN0aXZlLFxuICAgIEFwcGx5U3R5bGVzRGlyZWN0aXZlLFxuICAgIEF1dG9mb2N1c0RpcmVjdGl2ZSxcbiAgICBGb3JtYXRJZk51bWJlcixcbiAgICBUcmFuc2xhdGVJZlN0cmluZyxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmQ29tbW9uTW9kdWxlIHt9XG4iXX0=