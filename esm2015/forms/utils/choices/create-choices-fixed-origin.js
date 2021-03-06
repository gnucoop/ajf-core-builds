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
import { createChoicesOrigin } from './create-choices-origin';
export function createChoicesFixedOrigin(origin) {
    const type = 'fixed';
    return Object.assign(Object.assign({}, createChoicesOrigin(Object.assign(Object.assign({}, origin), { type }))), { type });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNob2ljZXMtZml4ZWQtb3JpZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvY2hvaWNlcy9jcmVhdGUtY2hvaWNlcy1maXhlZC1vcmlnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBS3BGLE1BQU0sVUFBVSx3QkFBd0IsQ0FDcEMsTUFBc0M7SUFDeEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxDQUFDO0lBQ3JCLHVDQUFXLG1CQUFtQixpQ0FBSyxNQUFNLEtBQUUsSUFBSSxJQUFFLEtBQUUsSUFBSSxJQUFFO0FBQzNELENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ2hvaWNlc0ZpeGVkT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLWZpeGVkLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW5DcmVhdGUsIGNyZWF0ZUNob2ljZXNPcmlnaW59IGZyb20gJy4vY3JlYXRlLWNob2ljZXMtb3JpZ2luJztcblxuZXhwb3J0IHR5cGUgQWpmQ2hvaWNlc0ZpeGVkT3JpZ2luQ3JlYXRlPFQ+ID1cbiAgICBPbWl0PEFqZkNob2ljZXNPcmlnaW5DcmVhdGU8VD4sICd0eXBlJz4mUGFydGlhbDxBamZDaG9pY2VzRml4ZWRPcmlnaW48VD4+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlQ2hvaWNlc0ZpeGVkT3JpZ2luPFQgPSBzdHJpbmcgfCBudW1iZXI+KFxuICAgIG9yaWdpbjogQWpmQ2hvaWNlc0ZpeGVkT3JpZ2luQ3JlYXRlPFQ+KTogQWpmQ2hvaWNlc0ZpeGVkT3JpZ2luPFQ+IHtcbiAgY29uc3QgdHlwZSA9ICdmaXhlZCc7XG4gIHJldHVybiB7Li4uY3JlYXRlQ2hvaWNlc09yaWdpbih7Li4ub3JpZ2luLCB0eXBlfSksIHR5cGV9O1xufVxuIl19