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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ZpZWxkLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE0QkEsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDJCQUEyQixDQUFDOzs7O0FBR3hELE1BQU0sT0FBZ0IsZUFBZTtJQUFyQztRQUNXLGtCQUFhLEdBQTBCLGFBQWEsQ0FBQztJQWlCaEUsQ0FBQzs7Ozs7SUFmQyxtQkFBbUIsQ0FBQyxLQUtuQjtjQUNPLEVBQUMsU0FBUyxFQUFFLFNBQVMsRUFBQyxHQUFHLEtBQUs7UUFDcEMsSUFBSSxTQUFTLEdBQUcsR0FBRyxFQUFFO1lBQ25CLE1BQU0sSUFBSSxLQUFLLENBQUMsd0RBQXdELENBQUMsQ0FBQztTQUMzRTtRQUNELElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLGdDQUFnQyxDQUFDLENBQUM7U0FDbkQ7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN4QyxDQUFDO0NBQ0Y7OztJQWpCQyx3Q0FBOEQiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge1R5cGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRDb21wb25lbnRzTWFwfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtY29tcG9uZW50cy1tYXAnO1xuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7Y29tcG9uZW50c01hcH0gZnJvbSAnLi91dGlscy9maWVsZHMvZmllbGRzLW1hcCc7XG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2VDcmVhdGV9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtaW5zdGFuY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRmllbGRTZXJ2aWNlIHtcbiAgcmVhZG9ubHkgY29tcG9uZW50c01hcDogQWpmRmllbGRDb21wb25lbnRzTWFwID0gY29tcG9uZW50c01hcDtcblxuICByZWdpc3RlckN1c3RvbUZpZWxkKGZpZWxkOiB7XG4gICAgZmllbGRUeXBlOiBudW1iZXIsXG4gICAgY29tcG9uZW50OiBUeXBlPEFqZkJhc2VGaWVsZENvbXBvbmVudD4sXG4gICAgY3JlYXRlSW5zdGFuY2U/OiAoaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2VDcmVhdGUsIGNvbnRleHQ6IEFqZkNvbnRleHQpID0+IEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgaXNGaWVsZFdpdGhDaG9pY2U/OiBib29sZWFuLFxuICB9KTogdm9pZCB7XG4gICAgY29uc3Qge2ZpZWxkVHlwZSwgY29tcG9uZW50fSA9IGZpZWxkO1xuICAgIGlmIChmaWVsZFR5cGUgPCAxMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjdXN0b20gZmllbGQgdHlwZSwgaXQgbXVzdCBiZSBncmVhdGVyIHRoYW4gMTAwJyk7XG4gICAgfVxuICAgIGlmIChjb21wb25lbnQgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGN1c3RvbSBmaWVsZCBjb21wb25lbnQnKTtcbiAgICB9XG4gICAgdGhpcy5jb21wb25lbnRzTWFwW2ZpZWxkVHlwZV0gPSBmaWVsZDtcbiAgfVxufVxuIl19