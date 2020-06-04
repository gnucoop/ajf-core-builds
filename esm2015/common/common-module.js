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
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { ApplyStylesDirective } from './apply-styles-directive';
import { AutofocusDirective } from './auto-focus.directive';
import { AjfDndDirective } from './dnd-directive';
import { FormatIfNumber } from './format-if-number';
import { TranslateIfString } from './translate-if-string';
import { AjfVideoDirective } from './video.directive';
let AjfCommonModule = /** @class */ (() => {
    let AjfCommonModule = class AjfCommonModule {
    };
    AjfCommonModule = __decorate([
        NgModule({
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
        })
    ], AjfCommonModule);
    return AjfCommonModule;
})();
export { AjfCommonModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29tbW9uLW1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NvbW1vbi9jb21tb24tbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFDbEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sdUJBQXVCLENBQUM7QUFDeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFvQnBEO0lBQUEsSUFBYSxlQUFlLEdBQTVCLE1BQWEsZUFBZTtLQUMzQixDQUFBO0lBRFksZUFBZTtRQWxCM0IsUUFBUSxDQUFDO1lBQ1IsWUFBWSxFQUFFO2dCQUNaLGVBQWU7Z0JBQ2YsaUJBQWlCO2dCQUNqQixvQkFBb0I7Z0JBQ3BCLGtCQUFrQjtnQkFDbEIsY0FBYztnQkFDZCxpQkFBaUI7YUFDbEI7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsZUFBZTtnQkFDZixpQkFBaUI7Z0JBQ2pCLG9CQUFvQjtnQkFDcEIsa0JBQWtCO2dCQUNsQixjQUFjO2dCQUNkLGlCQUFpQjthQUNsQjtTQUNGLENBQUM7T0FDVyxlQUFlLENBQzNCO0lBQUQsc0JBQUM7S0FBQTtTQURZLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FwcGx5U3R5bGVzRGlyZWN0aXZlfSBmcm9tICcuL2FwcGx5LXN0eWxlcy1kaXJlY3RpdmUnO1xuaW1wb3J0IHtBdXRvZm9jdXNEaXJlY3RpdmV9IGZyb20gJy4vYXV0by1mb2N1cy5kaXJlY3RpdmUnO1xuaW1wb3J0IHtBamZEbmREaXJlY3RpdmV9IGZyb20gJy4vZG5kLWRpcmVjdGl2ZSc7XG5pbXBvcnQge0Zvcm1hdElmTnVtYmVyfSBmcm9tICcuL2Zvcm1hdC1pZi1udW1iZXInO1xuaW1wb3J0IHtUcmFuc2xhdGVJZlN0cmluZ30gZnJvbSAnLi90cmFuc2xhdGUtaWYtc3RyaW5nJztcbmltcG9ydCB7QWpmVmlkZW9EaXJlY3RpdmV9IGZyb20gJy4vdmlkZW8uZGlyZWN0aXZlJztcblxuQE5nTW9kdWxlKHtcbiAgZGVjbGFyYXRpb25zOiBbXG4gICAgQWpmRG5kRGlyZWN0aXZlLFxuICAgIEFqZlZpZGVvRGlyZWN0aXZlLFxuICAgIEFwcGx5U3R5bGVzRGlyZWN0aXZlLFxuICAgIEF1dG9mb2N1c0RpcmVjdGl2ZSxcbiAgICBGb3JtYXRJZk51bWJlcixcbiAgICBUcmFuc2xhdGVJZlN0cmluZyxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZkRuZERpcmVjdGl2ZSxcbiAgICBBamZWaWRlb0RpcmVjdGl2ZSxcbiAgICBBcHBseVN0eWxlc0RpcmVjdGl2ZSxcbiAgICBBdXRvZm9jdXNEaXJlY3RpdmUsXG4gICAgRm9ybWF0SWZOdW1iZXIsXG4gICAgVHJhbnNsYXRlSWZTdHJpbmcsXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkNvbW1vbk1vZHVsZSB7XG59XG4iXX0=