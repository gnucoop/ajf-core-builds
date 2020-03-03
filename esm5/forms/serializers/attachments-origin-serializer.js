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
import { createAttachmentsOrigin } from '../utils/attachments/create-attachments-origin';
var AjfAttachmentsOriginSerializer = /** @class */ (function () {
    function AjfAttachmentsOriginSerializer() {
    }
    AjfAttachmentsOriginSerializer.fromJson = function (origin) {
        if (origin.name == null) {
            throw new Error('Malformed attachments origin');
        }
        return createAttachmentsOrigin(origin);
    };
    return AjfAttachmentsOriginSerializer;
}());
export { AjfAttachmentsOriginSerializer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXR0YWNobWVudHMtb3JpZ2luLXNlcmlhbGl6ZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9zZXJpYWxpemVycy9hdHRhY2htZW50cy1vcmlnaW4tc2VyaWFsaXplci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQ3VCLHVCQUF1QixFQUNwRCxNQUFNLGdEQUFnRCxDQUFDO0FBRXhEO0lBQUE7SUFPQSxDQUFDO0lBTlEsdUNBQVEsR0FBZixVQUFnQixNQUEwQztRQUN4RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLElBQUksSUFBSSxFQUFFO1lBQ3ZCLE1BQU0sSUFBSSxLQUFLLENBQUMsOEJBQThCLENBQUMsQ0FBQztTQUNqRDtRQUNELE9BQU8sdUJBQXVCLENBQUMsTUFBeUMsQ0FBQyxDQUFDO0lBQzVFLENBQUM7SUFDSCxxQ0FBQztBQUFELENBQUMsQUFQRCxJQU9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQXR0YWNobWVudHNPcmlnaW59IGZyb20gJy4uL2ludGVyZmFjZS9hdHRhY2htZW50cy9hdHRhY2htZW50cy1vcmlnaW4nO1xuaW1wb3J0IHtcbiAgQWpmQXR0YWNobWVudHNPcmlnaW5DcmVhdGUsIGNyZWF0ZUF0dGFjaG1lbnRzT3JpZ2luXG59IGZyb20gJy4uL3V0aWxzL2F0dGFjaG1lbnRzL2NyZWF0ZS1hdHRhY2htZW50cy1vcmlnaW4nO1xuXG5leHBvcnQgY2xhc3MgQWpmQXR0YWNobWVudHNPcmlnaW5TZXJpYWxpemVyIHtcbiAgc3RhdGljIGZyb21Kc29uKG9yaWdpbjogUGFydGlhbDxBamZBdHRhY2htZW50c09yaWdpbjxhbnk+Pik6IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT4ge1xuICAgIGlmIChvcmlnaW4ubmFtZSA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBhdHRhY2htZW50cyBvcmlnaW4nKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUF0dGFjaG1lbnRzT3JpZ2luKG9yaWdpbiBhcyBBamZBdHRhY2htZW50c09yaWdpbkNyZWF0ZTxhbnk+KTtcbiAgfVxufVxuIl19