/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/fields/field.ts
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
/**
 * @record
 */
export function AjfField() { }
if (false) {
    /** @type {?} */
    AjfField.prototype.nodeType;
    /** @type {?} */
    AjfField.prototype.fieldType;
    /** @type {?|undefined} */
    AjfField.prototype.description;
    /** @type {?} */
    AjfField.prototype.editable;
    /** @type {?|undefined} */
    AjfField.prototype.formula;
    /** @type {?} */
    AjfField.prototype.defaultValue;
    /** @type {?} */
    AjfField.prototype.size;
    /** @type {?|undefined} */
    AjfField.prototype.validation;
    /** @type {?|undefined} */
    AjfField.prototype.warning;
    /** @type {?|undefined} */
    AjfField.prototype.nextSlideCondition;
    /** @type {?|undefined} */
    AjfField.prototype.attachmentOrigin;
    /** @type {?|undefined} */
    AjfField.prototype.attachments;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZ0NBLDhCQWFDOzs7SUFaQyw0QkFBK0I7O0lBQy9CLDZCQUF3Qjs7SUFDeEIsK0JBQXFCOztJQUNyQiw0QkFBa0I7O0lBQ2xCLDJCQUFxQjs7SUFDckIsZ0NBQWtCOztJQUNsQix3QkFBbUI7O0lBQ25CLDhCQUFnQzs7SUFDaEMsMkJBQTBCOztJQUMxQixzQ0FBa0M7O0lBQ2xDLG9DQUE2Qzs7SUFDN0MsK0JBQW9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBBamZGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZBdHRhY2htZW50c09yaWdpbn0gZnJvbSAnLi4vYXR0YWNobWVudHMvYXR0YWNobWVudHMtb3JpZ2luJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi4vbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuLi9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uR3JvdXB9IGZyb20gJy4uL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi1ncm91cCc7XG5pbXBvcnQge0FqZldhcm5pbmdHcm91cH0gZnJvbSAnLi4vd2FybmluZy93YXJuaW5nLWdyb3VwJztcbmltcG9ydCB7QWpmRmllbGRTaXplfSBmcm9tICcuL2ZpZWxkLXNpemUnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vZmllbGQtdHlwZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRmllbGQgZXh0ZW5kcyBBamZOb2RlIHtcbiAgbm9kZVR5cGU6IEFqZk5vZGVUeXBlLkFqZkZpZWxkO1xuICBmaWVsZFR5cGU6IEFqZkZpZWxkVHlwZTtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGVkaXRhYmxlOiBib29sZWFuO1xuICBmb3JtdWxhPzogQWpmRm9ybXVsYTtcbiAgZGVmYXVsdFZhbHVlOiBhbnk7XG4gIHNpemU6IEFqZkZpZWxkU2l6ZTtcbiAgdmFsaWRhdGlvbj86IEFqZlZhbGlkYXRpb25Hcm91cDtcbiAgd2FybmluZz86IEFqZldhcm5pbmdHcm91cDtcbiAgbmV4dFNsaWRlQ29uZGl0aW9uPzogQWpmQ29uZGl0aW9uO1xuICBhdHRhY2htZW50T3JpZ2luPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PjtcbiAgYXR0YWNobWVudHM/OiBhbnlbXTtcbn1cbiJdfQ==