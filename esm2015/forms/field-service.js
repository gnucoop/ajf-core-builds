/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/field-service.ts
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
import { componentsMap } from './utils/fields/fields-map';
/**
 * @abstract
 */
export class AjfFieldService {
    constructor() {
        this.componentsMap = componentsMap;
    }
    /**
     * @param {?} field
     * @return {?}
     */
    registerCustomField(field) {
        const { fieldType, component } = field;
        if (fieldType < 100) {
            throw new Error('Invalid custom field type, it must be greater than 100');
        }
        if (component == null) {
            throw new Error('Invalid custom field component');
        }
        this.componentsMap[fieldType] = field;
    }
}
if (false) {
    /** @type {?} */
    AjfFieldService.prototype.componentsMap;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ZpZWxkLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE2QkEsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7O0FBRXhELE1BQU0sT0FBZ0IsZUFBZTtJQUFyQztRQUNXLGtCQUFhLEdBQTBCLGFBQWEsQ0FBQztJQWtCaEUsQ0FBQzs7Ozs7SUFoQkMsbUJBQW1CLENBQUMsS0FNbkI7Y0FDTyxFQUFDLFNBQVMsRUFBRSxTQUFTLEVBQUMsR0FBRyxLQUFLO1FBQ3BDLElBQUksU0FBUyxHQUFHLEdBQUcsRUFBRTtZQUNuQixNQUFNLElBQUksS0FBSyxDQUFDLHdEQUF3RCxDQUFDLENBQUM7U0FDM0U7UUFDRCxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsTUFBTSxJQUFJLEtBQUssQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO1NBQ25EO1FBQ0QsSUFBSSxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7SUFDeEMsQ0FBQztDQUNGOzs7SUFsQkMsd0NBQThEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtUeXBlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGaWVsZENvbXBvbmVudHNNYXB9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC1jb21wb25lbnRzLW1hcCc7XG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2VDcmVhdGV9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtjb21wb25lbnRzTWFwfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy9maWVsZHMtbWFwJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkZpZWxkU2VydmljZSB7XG4gIHJlYWRvbmx5IGNvbXBvbmVudHNNYXA6IEFqZkZpZWxkQ29tcG9uZW50c01hcCA9IGNvbXBvbmVudHNNYXA7XG5cbiAgcmVnaXN0ZXJDdXN0b21GaWVsZChmaWVsZDoge1xuICAgIGZpZWxkVHlwZTogbnVtYmVyLFxuICAgIGNvbXBvbmVudDogVHlwZTxBamZCYXNlRmllbGRDb21wb25lbnQ+LFxuICAgIHJlYWRPbmx5Q29tcG9uZW50PzogVHlwZTxBamZCYXNlRmllbGRDb21wb25lbnQ+LFxuICAgIGNyZWF0ZUluc3RhbmNlPzogKGluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlQ3JlYXRlLCBjb250ZXh0OiBBamZDb250ZXh0KSA9PiBBamZGaWVsZEluc3RhbmNlO1xuICAgIGlzRmllbGRXaXRoQ2hvaWNlPzogYm9vbGVhbixcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IHtmaWVsZFR5cGUsIGNvbXBvbmVudH0gPSBmaWVsZDtcbiAgICBpZiAoZmllbGRUeXBlIDwgMTAwKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3VzdG9tIGZpZWxkIHR5cGUsIGl0IG11c3QgYmUgZ3JlYXRlciB0aGFuIDEwMCcpO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50ID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjdXN0b20gZmllbGQgY29tcG9uZW50Jyk7XG4gICAgfVxuICAgIHRoaXMuY29tcG9uZW50c01hcFtmaWVsZFR5cGVdID0gZmllbGQ7XG4gIH1cbn1cbiJdfQ==