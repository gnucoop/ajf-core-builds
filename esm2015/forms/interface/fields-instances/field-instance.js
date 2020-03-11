/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/fields-instances/field-instance.ts
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
/**
 * @record
 */
export function AjfFieldInstance() { }
if (false) {
    /** @type {?} */
    AjfFieldInstance.prototype.valid;
    /** @type {?} */
    AjfFieldInstance.prototype.defaultValue;
    /** @type {?} */
    AjfFieldInstance.prototype.node;
    /** @type {?} */
    AjfFieldInstance.prototype.value;
    /** @type {?|undefined} */
    AjfFieldInstance.prototype.formula;
    /** @type {?|undefined} */
    AjfFieldInstance.prototype.validation;
    /** @type {?|undefined} */
    AjfFieldInstance.prototype.warning;
    /** @type {?|undefined} */
    AjfFieldInstance.prototype.nextSlideCondition;
    /** @type {?|undefined} */
    AjfFieldInstance.prototype.validationResults;
    /** @type {?|undefined} */
    AjfFieldInstance.prototype.warningResults;
    /** @type {?} */
    AjfFieldInstance.prototype.warningTrigger;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdDQSxzQ0FjQzs7O0lBWkMsaUNBQWU7O0lBQ2Ysd0NBQWtCOztJQUNsQixnQ0FBZTs7SUFFZixpQ0FBVzs7SUFDWCxtQ0FBcUI7O0lBQ3JCLHNDQUFnQzs7SUFDaEMsbUNBQTBCOztJQUMxQiw4Q0FBa0M7O0lBQ2xDLDZDQUEwQzs7SUFDMUMsMENBQW9DOztJQUNwQywwQ0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBBamZGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZGaWVsZH0gZnJvbSAnLi4vZmllbGRzL2ZpZWxkJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLWdyb3VwJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvblJlc3VsdH0gZnJvbSAnLi4vdmFsaWRhdGlvbi92YWxpZGF0aW9uLXJlc3VsdHMnO1xuaW1wb3J0IHtBamZXYXJuaW5nR3JvdXB9IGZyb20gJy4uL3dhcm5pbmcvd2FybmluZy1ncm91cCc7XG5pbXBvcnQge0FqZldhcm5pbmdSZXN1bHR9IGZyb20gJy4uL3dhcm5pbmcvd2FybmluZy1yZXN1bHQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZpZWxkSW5zdGFuY2UgZXh0ZW5kcyBBamZOb2RlSW5zdGFuY2Uge1xuICAvLyBpZiB0aGUgZmllbGQgcGFzcyB0aGUgdmFsaWRhdGlvblxuICB2YWxpZDogYm9vbGVhbjtcbiAgZGVmYXVsdFZhbHVlOiBhbnk7XG4gIG5vZGU6IEFqZkZpZWxkO1xuICAvLyB0aGUgdmFsdWUgb2YgZmllbGRcbiAgdmFsdWU6IGFueTtcbiAgZm9ybXVsYT86IEFqZkZvcm11bGE7XG4gIHZhbGlkYXRpb24/OiBBamZWYWxpZGF0aW9uR3JvdXA7XG4gIHdhcm5pbmc/OiBBamZXYXJuaW5nR3JvdXA7XG4gIG5leHRTbGlkZUNvbmRpdGlvbj86IEFqZkNvbmRpdGlvbjtcbiAgdmFsaWRhdGlvblJlc3VsdHM/OiBBamZWYWxpZGF0aW9uUmVzdWx0W107XG4gIHdhcm5pbmdSZXN1bHRzPzogQWpmV2FybmluZ1Jlc3VsdFtdO1xuICB3YXJuaW5nVHJpZ2dlcjogRXZlbnRFbWl0dGVyPHZvaWQ+O1xufVxuIl19