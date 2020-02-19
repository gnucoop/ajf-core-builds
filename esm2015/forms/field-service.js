/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/field-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ZpZWxkLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7O0FBR3hELE1BQU0sT0FBZ0IsZUFBZTtJQUFyQztRQUNXLGtCQUFhLEdBQTBCLGFBQWEsQ0FBQztJQWlCaEUsQ0FBQzs7Ozs7SUFmQyxtQkFBbUIsQ0FBQyxLQUtuQjtjQUNPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxHQUFHLEtBQUs7UUFDcEMsSUFBSSxTQUFTLEdBQUcsR0FBRyxFQUFFO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUMzRTtRQUNELElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7OztJQWpCQyx3Q0FBOEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZENvbXBvbmVudHNNYXB9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC1jb21wb25lbnRzLW1hcCc7XG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtjb21wb25lbnRzTWFwfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy9maWVsZHMtbWFwJztcbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZUNyZWF0ZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL2NyZWF0ZS1maWVsZC1pbnN0YW5jZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZGaWVsZFNlcnZpY2Uge1xuICByZWFkb25seSBjb21wb25lbnRzTWFwOiBBamZGaWVsZENvbXBvbmVudHNNYXAgPSBjb21wb25lbnRzTWFwO1xuXG4gIHJlZ2lzdGVyQ3VzdG9tRmllbGQoZmllbGQ6IHtcbiAgICBmaWVsZFR5cGU6IG51bWJlcixcbiAgICBjb21wb25lbnQ6IFR5cGU8QWpmQmFzZUZpZWxkQ29tcG9uZW50PixcbiAgICBjcmVhdGVJbnN0YW5jZT86IChpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZUNyZWF0ZSwgY29udGV4dDogQWpmQ29udGV4dCkgPT4gQWpmRmllbGRJbnN0YW5jZTtcbiAgICBpc0ZpZWxkV2l0aENob2ljZT86IGJvb2xlYW4sXG4gIH0pOiB2b2lkIHtcbiAgICBjb25zdCB7ZmllbGRUeXBlLCBjb21wb25lbnR9ID0gZmllbGQ7XG4gICAgaWYgKGZpZWxkVHlwZSA8IDEwMCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGN1c3RvbSBmaWVsZCB0eXBlLCBpdCBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAxMDAnKTtcbiAgICB9XG4gICAgaWYgKGNvbXBvbmVudCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgY3VzdG9tIGZpZWxkIGNvbXBvbmVudCcpO1xuICAgIH1cbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbZmllbGRUeXBlXSA9IGZpZWxkO1xuICB9XG59XG4iXX0=