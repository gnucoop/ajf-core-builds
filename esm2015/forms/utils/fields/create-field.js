/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields/create-field.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvZmllbGRzL2NyZWF0ZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFDL0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzVELE9BQU8sRUFBZ0IsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7Ozs7O0FBSy9ELE1BQU0sVUFBVSxXQUFXLENBQUMsS0FBcUI7O1VBQ3pDLElBQUksR0FBRyxVQUFVLGlDQUFLLEtBQUssS0FBRSxRQUFRLEVBQUUsV0FBVyxDQUFDLFFBQVEsSUFBRTs7VUFDN0QsUUFBUSxHQUFHLEtBQUssQ0FBQyxRQUFRLElBQUksSUFBSSxDQUFDLENBQUM7UUFDckMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQ2hCLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLE9BQU8sSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxLQUFLO0lBQ3RGLHFEQUNLLElBQUksR0FDSixLQUFLLEtBQ1IsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQzlCLFFBQVEsRUFDUixZQUFZLEVBQUUsS0FBSyxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDcEUsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLElBQUksUUFBUSxJQUM1QjtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmTm9kZUNyZWF0ZSwgY3JlYXRlTm9kZX0gZnJvbSAnLi4vbm9kZXMvY3JlYXRlLW5vZGUnO1xuXG5leHBvcnQgdHlwZSBBamZGaWVsZENyZWF0ZSA9XG4gICAgT21pdDxBamZOb2RlQ3JlYXRlLCAnbm9kZVR5cGUnPiZQaWNrPEFqZkZpZWxkLCAnZmllbGRUeXBlJz4mUGFydGlhbDxBamZGaWVsZD47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWVsZChmaWVsZDogQWpmRmllbGRDcmVhdGUpOiBBamZGaWVsZCB7XG4gIGNvbnN0IG5vZGUgPSBjcmVhdGVOb2RlKHsuLi5maWVsZCwgbm9kZVR5cGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkfSk7XG4gIGNvbnN0IGVkaXRhYmxlID0gZmllbGQuZWRpdGFibGUgIT0gbnVsbCA/XG4gICAgICBmaWVsZC5lZGl0YWJsZSA6XG4gICAgICBmaWVsZC5maWVsZFR5cGUgIT09IEFqZkZpZWxkVHlwZS5Gb3JtdWxhICYmIGZpZWxkLmZpZWxkVHlwZSAhPT0gQWpmRmllbGRUeXBlLlRhYmxlO1xuICByZXR1cm4ge1xuICAgIC4uLm5vZGUsXG4gICAgLi4uZmllbGQsXG4gICAgbm9kZVR5cGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkLFxuICAgIGVkaXRhYmxlLFxuICAgIGRlZmF1bHRWYWx1ZTogZmllbGQuZGVmYXVsdFZhbHVlICE9IG51bGwgPyBmaWVsZC5kZWZhdWx0VmFsdWUgOiBudWxsLFxuICAgIHNpemU6IGZpZWxkLnNpemUgfHwgJ25vcm1hbCcsXG4gIH07XG59XG4iXX0=