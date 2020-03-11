/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/field-with-choices.ts
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
import { AjfBaseFieldComponent } from './base-field';
/**
 * @abstract
 * @template T
 */
export class AjfFieldWithChoicesComponent extends AjfBaseFieldComponent {
    /**
     * @param {?} cdr
     * @param {?} service
     * @param {?} warningAlertService
     * @param {?} searchThreshold
     */
    constructor(cdr, service, warningAlertService, searchThreshold) {
        super(cdr, service, warningAlertService);
        this._searchThreshold = 6;
        if (searchThreshold != null) {
            this._searchThreshold = searchThreshold;
        }
    }
    /**
     * @return {?}
     */
    get searchThreshold() { return this._searchThreshold; }
}
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfFieldWithChoicesComponent.prototype._searchThreshold;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtd2l0aC1jaG9pY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvZmllbGQtd2l0aC1jaG9pY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBMkJBLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQzs7Ozs7QUFJbkQsTUFBTSxPQUFnQiw0QkFDbEIsU0FBUSxxQkFBcUQ7Ozs7Ozs7SUFJL0QsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUMvQixtQkFBMkMsRUFDM0MsZUFBdUI7UUFFdkIsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQVRuQyxxQkFBZ0IsR0FBVyxDQUFDLENBQUM7UUFVbkMsSUFBSSxlQUFlLElBQUksSUFBSSxFQUFFO1lBQzNCLElBQUksQ0FBQyxnQkFBZ0IsR0FBRyxlQUFlLENBQUM7U0FDekM7SUFDSCxDQUFDOzs7O0lBWkQsSUFBSSxlQUFlLEtBQWEsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxDQUFDO0NBYWhFOzs7Ozs7SUFkQyx3REFBcUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWZ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge1xuICBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkZpZWxkV2l0aENob2ljZXNDb21wb25lbnQ8VD5cbiAgICBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8VD4+IHtcbiAgcHJpdmF0ZSBfc2VhcmNoVGhyZXNob2xkOiBudW1iZXIgPSA2O1xuICBnZXQgc2VhcmNoVGhyZXNob2xkKCk6IG51bWJlciB7IHJldHVybiB0aGlzLl9zZWFyY2hUaHJlc2hvbGQ7IH1cblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgd2FybmluZ0FsZXJ0U2VydmljZTogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgICBzZWFyY2hUaHJlc2hvbGQ6IG51bWJlclxuICApIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcm5pbmdBbGVydFNlcnZpY2UpO1xuICAgIGlmIChzZWFyY2hUaHJlc2hvbGQgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fc2VhcmNoVGhyZXNob2xkID0gc2VhcmNoVGhyZXNob2xkO1xuICAgIH1cbiAgfVxufVxuIl19