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
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AjfCommonModule } from '@ajf/core/common';
import { AjfTable } from './table';
var AjfTableModule = /** @class */ (function () {
    function AjfTableModule() {
    }
    AjfTableModule.decorators = [
        { type: NgModule, args: [{
                    imports: [
                        AjfCommonModule,
                        CommonModule,
                    ],
                    declarations: [
                        AjfTable,
                    ],
                    exports: [
                        AjfTable,
                    ]
                },] }
    ];
    return AjfTableModule;
}());
export { AjfTableModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvdGFibGUvdGFibGUtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUVqRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBRWpDO0lBQUE7SUFZOEIsQ0FBQzs7Z0JBWjlCLFFBQVEsU0FBQztvQkFDUixPQUFPLEVBQUU7d0JBQ1AsZUFBZTt3QkFDZixZQUFZO3FCQUNiO29CQUNELFlBQVksRUFBRTt3QkFDWixRQUFRO3FCQUNUO29CQUNELE9BQU8sRUFBRTt3QkFDUCxRQUFRO3FCQUNUO2lCQUNGOztJQUM2QixxQkFBQztDQUFBLEFBWi9CLElBWStCO1NBQWxCLGNBQWMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q29tbW9uTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb21tb24nO1xuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQ29tbW9uTW9kdWxlfSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcblxuaW1wb3J0IHtBamZUYWJsZX0gZnJvbSAnLi90YWJsZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtcbiAgICBBamZDb21tb25Nb2R1bGUsXG4gICAgQ29tbW9uTW9kdWxlLFxuICBdLFxuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZUYWJsZSxcbiAgXSxcbiAgZXhwb3J0czogW1xuICAgIEFqZlRhYmxlLFxuICBdXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRhYmxlTW9kdWxlIHsgfVxuIl19