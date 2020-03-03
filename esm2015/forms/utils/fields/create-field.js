/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields/create-field.ts
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
import { AjfFieldType } from '../../interface/fields/field-type';
import { AjfNodeType } from '../../interface/nodes/node-type';
import { createNode } from '../nodes/create-node';
/**
 * @param {?} field
 * @return {?}
 */
export function createField(field) {
    /** @type {?} */
    const node = createNode(Object.assign(Object.assign({}, field), { nodeType: AjfNodeType.AjfField }));
    /** @type {?} */
    const editable = field.editable != null ?
        field.editable :
        field.fieldType !== AjfFieldType.Formula && field.fieldType !== AjfFieldType.Table;
    return Object.assign(Object.assign(Object.assign({}, node), field), { nodeType: AjfNodeType.AjfField, editable, defaultValue: field.defaultValue != null ? field.defaultValue : null, size: field.size || 'normal' });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvZmllbGRzL2NyZWF0ZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDL0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzVELE9BQU8sRUFBZ0IsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBSy9ELE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBcUI7O1VBQ3pDLElBQUksR0FBRyxVQUFVLGlDQUFLLEtBQUssS0FBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsSUFBRTs7VUFDN0QsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUM7UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxLQUFLO0lBQ3RGLHFEQUNLLElBQUksR0FDSixLQUFLLEtBQ1IsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQzlCLFFBQVEsRUFDUixZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDcEUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksUUFBUSxJQUM1QjtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmTm9kZVR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZOb2RlQ3JlYXRlLCBjcmVhdGVOb2RlfSBmcm9tICcuLi9ub2Rlcy9jcmVhdGUtbm9kZSc7XG5cbmV4cG9ydCB0eXBlIEFqZkZpZWxkQ3JlYXRlID1cbiAgICBPbWl0PEFqZk5vZGVDcmVhdGUsICdub2RlVHlwZSc+JlBpY2s8QWpmRmllbGQsICdmaWVsZFR5cGUnPiZQYXJ0aWFsPEFqZkZpZWxkPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpZWxkKGZpZWxkOiBBamZGaWVsZENyZWF0ZSk6IEFqZkZpZWxkIHtcbiAgY29uc3Qgbm9kZSA9IGNyZWF0ZU5vZGUoey4uLmZpZWxkLCBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmRmllbGR9KTtcbiAgY29uc3QgZWRpdGFibGUgPSBmaWVsZC5lZGl0YWJsZSAhPSBudWxsID9cbiAgICAgIGZpZWxkLmVkaXRhYmxlIDpcbiAgICAgIGZpZWxkLmZpZWxkVHlwZSAhPT0gQWpmRmllbGRUeXBlLkZvcm11bGEgJiYgZmllbGQuZmllbGRUeXBlICE9PSBBamZGaWVsZFR5cGUuVGFibGU7XG4gIHJldHVybiB7XG4gICAgLi4ubm9kZSxcbiAgICAuLi5maWVsZCxcbiAgICBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmRmllbGQsXG4gICAgZWRpdGFibGUsXG4gICAgZGVmYXVsdFZhbHVlOiBmaWVsZC5kZWZhdWx0VmFsdWUgIT0gbnVsbCA/IGZpZWxkLmRlZmF1bHRWYWx1ZSA6IG51bGwsXG4gICAgc2l6ZTogZmllbGQuc2l6ZSB8fCAnbm9ybWFsJyxcbiAgfTtcbn1cbiJdfQ==