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
import { AjfVideoDirective } from './video.directive';
import * as i0 from "@angular/core";
export class AjfCommonModule {
}
AjfCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCommonModule, declarations: [AjfDndDirective,
        AjfVideoDirective,
        ApplyStylesDirective,
        AutofocusDirective,
        FormatIfNumber,
        TranslateIfString], exports: [AjfDndDirective,
        AjfVideoDirective,
        ApplyStylesDirective,
        AutofocusDirective,
        FormatIfNumber,
        TranslateIfString] });
AjfCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCommonModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCommonModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [
                        AjfDndDirective,
                        AjfVideoDirective,
                        ApplyStylesDirective,
                        AutofocusDirective,
                        FormatIfNumber,
                        TranslateIfString,
                    ],
                    exports: [
                        AjfDndDirective,
                        AjfVideoDirective,
                        ApplyStylesDirective,
                        AutofocusDirective,
                        FormatIfNumber,
                        TranslateIfString,
                    ],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvY29tbW9uL3NyYy9jb21tb24tbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ2hELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUNsRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUN4RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQzs7QUFvQnBELE1BQU0sT0FBTyxlQUFlOzs0R0FBZixlQUFlOzZHQUFmLGVBQWUsaUJBaEJ4QixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsY0FBYztRQUNkLGlCQUFpQixhQUdqQixlQUFlO1FBQ2YsaUJBQWlCO1FBQ2pCLG9CQUFvQjtRQUNwQixrQkFBa0I7UUFDbEIsY0FBYztRQUNkLGlCQUFpQjs2R0FHUixlQUFlOzJGQUFmLGVBQWU7a0JBbEIzQixRQUFRO21CQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWixlQUFlO3dCQUNmLGlCQUFpQjt3QkFDakIsb0JBQW9CO3dCQUNwQixrQkFBa0I7d0JBQ2xCLGNBQWM7d0JBQ2QsaUJBQWlCO3FCQUNsQjtvQkFDRCxPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixpQkFBaUI7d0JBQ2pCLG9CQUFvQjt3QkFDcEIsa0JBQWtCO3dCQUNsQixjQUFjO3dCQUNkLGlCQUFpQjtxQkFDbEI7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FwcGx5U3R5bGVzRGlyZWN0aXZlfSBmcm9tICcuL2FwcGx5LXN0eWxlcy1kaXJlY3RpdmUnO1xuaW1wb3J0IHtBdXRvZm9jdXNEaXJlY3RpdmV9IGZyb20gJy4vYXV0by1mb2N1cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHtBamZEbmREaXJlY3RpdmV9IGZyb20gJy4vZG5kLWRpcmVjdGl2ZSc7XG5pbXBvcnQge0Zvcm1hdElmTnVtYmVyfSBmcm9tICcuL2Zvcm1hdC1pZi1udW1iZXInO1xuaW1wb3J0IHtUcmFuc2xhdGVJZlN0cmluZ30gZnJvbSAnLi90cmFuc2xhdGUtaWYtc3RyaW5nJztcbmltcG9ydCB7QWpmVmlkZW9EaXJlY3RpdmV9IGZyb20gJy4vdmlkZW8uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmRG5kRGlyZWN0aXZlLFxuICAgIEFqZlZpZGVvRGlyZWN0aXZlLFxuICAgIEFwcGx5U3R5bGVzRGlyZWN0aXZlLFxuICAgIEF1dG9mb2N1c0RpcmVjdGl2ZSxcbiAgICBGb3JtYXRJZk51bWJlcixcbiAgICBUcmFuc2xhdGVJZlN0cmluZyxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZkRuZERpcmVjdGl2ZSxcbiAgICBBamZWaWRlb0RpcmVjdGl2ZSxcbiAgICBBcHBseVN0eWxlc0RpcmVjdGl2ZSxcbiAgICBBdXRvZm9jdXNEaXJlY3RpdmUsXG4gICAgRm9ybWF0SWZOdW1iZXIsXG4gICAgVHJhbnNsYXRlSWZTdHJpbmcsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNvbW1vbk1vZHVsZSB7fVxuIl19