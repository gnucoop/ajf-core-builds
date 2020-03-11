/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/forms/form.ts
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
export function AjfForm() { }
if (false) {
    /** @type {?} */
    AjfForm.prototype.nodes;
    /** @type {?} */
    AjfForm.prototype.choicesOrigins;
    /** @type {?} */
    AjfForm.prototype.attachmentsOrigins;
    /** @type {?} */
    AjfForm.prototype.stringIdentifier;
    /** @type {?|undefined} */
    AjfForm.prototype.initContext;
    /** @type {?|undefined} */
    AjfForm.prototype.supplementaryInformations;
    /** @type {?|undefined} */
    AjfForm.prototype.valid;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ludGVyZmFjZS9mb3Jtcy9mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLDZCQVFDOzs7SUFQQyx3QkFBc0M7O0lBQ3RDLGlDQUF3Qzs7SUFDeEMscUNBQWdEOztJQUNoRCxtQ0FBNEM7O0lBQzVDLDhCQUFrQjs7SUFDbEIsNENBQWdDOztJQUNoQyx3QkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQXR0YWNobWVudHNPcmlnaW59IGZyb20gJy4uL2F0dGFjaG1lbnRzL2F0dGFjaG1lbnRzLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW59IGZyb20gJy4uL2Nob2ljZXMvY2hvaWNlcy1vcmlnaW4nO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZX0gZnJvbSAnLi4vc2xpZGVzL3JlcGVhdGluZy1zbGlkZSc7XG5pbXBvcnQge0FqZlNsaWRlfSBmcm9tICcuLi9zbGlkZXMvc2xpZGUnO1xuaW1wb3J0IHtBamZGb3JtU3RyaW5nSWRlbnRpZmllcn0gZnJvbSAnLi9mb3JtLXN0cmluZy1pZGVudGlmaWVyJztcblxuZXhwb3J0IGludGVyZmFjZSBBamZGb3JtIHtcbiAgbm9kZXM6IChBamZSZXBlYXRpbmdTbGlkZXxBamZTbGlkZSlbXTtcbiAgY2hvaWNlc09yaWdpbnM6IEFqZkNob2ljZXNPcmlnaW48YW55PltdO1xuICBhdHRhY2htZW50c09yaWdpbnM6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXTtcbiAgc3RyaW5nSWRlbnRpZmllcjogQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJbXTtcbiAgaW5pdENvbnRleHQ/OiBhbnk7XG4gIHN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnM/OiBhbnk7XG4gIHZhbGlkPzogYm9vbGVhbjtcbn1cbiJdfQ==