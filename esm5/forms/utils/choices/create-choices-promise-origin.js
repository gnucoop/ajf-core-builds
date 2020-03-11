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
import { __assign } from "tslib";
export function createChoicesPromiseOrigin(origin) {
    return __assign(__assign({}, origin), { type: 'promise', label: origin.label || '', choices: origin.choices || [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNob2ljZXMtcHJvbWlzZS1vcmlnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9jaG9pY2VzL2NyZWF0ZS1jaG9pY2VzLXByb21pc2Utb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFXSCxNQUFNLFVBQVUsMEJBQTBCLENBQ3hDLE1BQXdDO0lBRXhDLDZCQUNLLE1BQU0sS0FDVCxJQUFJLEVBQUUsU0FBUyxFQUNmLEtBQUssRUFBRSxNQUFNLENBQUMsS0FBSyxJQUFJLEVBQUUsRUFDekIsT0FBTyxFQUFFLE1BQU0sQ0FBQyxPQUFPLElBQUksRUFBRSxJQUM3QjtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkNob2ljZXNQcm9taXNlT3JpZ2luXG59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtcHJvbWlzZS1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2luQ3JlYXRlfSBmcm9tICcuL2NyZWF0ZS1jaG9pY2VzLW9yaWdpbic7XG5cbmV4cG9ydCB0eXBlIEFqZkNob2ljZXNQcm9taXNlT3JpZ2luQ3JlYXRlPFQ+ID1cbiAgT21pdDxBamZDaG9pY2VzT3JpZ2luQ3JlYXRlPFQ+LCAndHlwZSc+JlBpY2s8QWpmQ2hvaWNlc1Byb21pc2VPcmlnaW48VD4sICdnZW5lcmF0b3InPlxuICAmUGFydGlhbDxBamZDaG9pY2VzUHJvbWlzZU9yaWdpbjxUPj47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaG9pY2VzUHJvbWlzZU9yaWdpbjxUPihcbiAgb3JpZ2luOiBBamZDaG9pY2VzUHJvbWlzZU9yaWdpbkNyZWF0ZTxUPlxuKTogQWpmQ2hvaWNlc1Byb21pc2VPcmlnaW48VD4ge1xuICByZXR1cm4ge1xuICAgIC4uLm9yaWdpbixcbiAgICB0eXBlOiAncHJvbWlzZScsXG4gICAgbGFiZWw6IG9yaWdpbi5sYWJlbCB8fCAnJyxcbiAgICBjaG9pY2VzOiBvcmlnaW4uY2hvaWNlcyB8fCBbXSxcbiAgfTtcbn1cbiJdfQ==