/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/field-is-valid.ts
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
import { Pipe } from '@angular/core';
export class AjfFieldIsValidPipe {
    /**
     * @param {?=} validationResults
     * @return {?}
     */
    transform(validationResults) {
        return validationResults != null
            && validationResults.filter((/**
             * @param {?} f
             * @return {?}
             */
            (f) => !f.result)).length === 0;
    }
}
AjfFieldIsValidPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfFieldIsValid' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtaXMtdmFsaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9maWVsZC1pcy12YWxpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBS25DLE1BQU0sT0FBTyxtQkFBbUI7Ozs7O0lBQzVCLFNBQVMsQ0FBQyxpQkFBeUM7UUFDL0MsT0FBTyxpQkFBaUIsSUFBSSxJQUFJO2VBQ3pCLGlCQUFpQixDQUFDLE1BQU07Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUNuRSxDQUFDOzs7WUFMSixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmVmFsaWRhdGlvblJlc3VsdH0gZnJvbSAnLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi92YWxpZGF0aW9uLXJlc3VsdHMnO1xuXG5AUGlwZSh7bmFtZTogJ2FqZkZpZWxkSXNWYWxpZCd9KVxuZXhwb3J0IGNsYXNzIEFqZkZpZWxkSXNWYWxpZFBpcGUge1xuICAgIHRyYW5zZm9ybSh2YWxpZGF0aW9uUmVzdWx0cz86IEFqZlZhbGlkYXRpb25SZXN1bHRbXSk6IGJvb2xlYW4ge1xuICAgICAgICByZXR1cm4gdmFsaWRhdGlvblJlc3VsdHMgIT0gbnVsbFxuICAgICAgICAgICAgJiYgdmFsaWRhdGlvblJlc3VsdHMuZmlsdGVyKChmKSA9PiAhZi5yZXN1bHQpLmxlbmd0aCA9PT0gMDtcbiAgICB9XG59XG4iXX0=