/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/reports/report.ts
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
export function AjfReport() { }
if (false) {
    /** @type {?|undefined} */
    AjfReport.prototype.header;
    /** @type {?|undefined} */
    AjfReport.prototype.content;
    /** @type {?|undefined} */
    AjfReport.prototype.footer;
    /** @type {?|undefined} */
    AjfReport.prototype.styles;
    /** @type {?|undefined} */
    AjfReport.prototype.forms;
    /** @type {?|undefined} */
    AjfReport.prototype.variables;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsK0JBT0M7OztJQU5DLDJCQUE0Qjs7SUFDNUIsNEJBQTZCOztJQUM3QiwyQkFBNEI7O0lBQzVCLDJCQUFtQjs7SUFDbkIsMEJBQWtCOztJQUNsQiw4QkFBZ0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7QWpmU3R5bGVzfSBmcm9tICcuLi9zdHlsZXMnO1xuaW1wb3J0IHtBamZSZXBvcnRDb250YWluZXJ9IGZyb20gJy4vcmVwb3J0LWNvbnRhaW5lcic7XG5pbXBvcnQge0FqZlJlcG9ydFZhcmlhYmxlfSBmcm9tICcuL3JlcG9ydC12YXJpYWJsZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmUmVwb3J0IHtcbiAgaGVhZGVyPzogQWpmUmVwb3J0Q29udGFpbmVyO1xuICBjb250ZW50PzogQWpmUmVwb3J0Q29udGFpbmVyO1xuICBmb290ZXI/OiBBamZSZXBvcnRDb250YWluZXI7XG4gIHN0eWxlcz86IEFqZlN0eWxlcztcbiAgZm9ybXM/OiBBamZGb3JtW107XG4gIHZhcmlhYmxlcz86IEFqZlJlcG9ydFZhcmlhYmxlW107XG59XG4iXX0=