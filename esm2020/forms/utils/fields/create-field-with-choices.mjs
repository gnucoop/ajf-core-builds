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
import { createField } from './create-field';
/**
 * Create an AjfFieldWithChoice.
 * If choices is not defined apply empty array.
 * If forceExpanded is not defined apply false.
 * If forceNarrow is not defined apply false.
 */
export function createFieldWithChoices(field) {
    const node = createField({ ...field });
    return {
        ...node,
        ...field,
        choices: field.choices || [],
        forceExpanded: field.forceExpanded || false,
        forceNarrow: field.forceNarrow || false,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLXdpdGgtY2hvaWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQtd2l0aC1jaG9pY2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBaUIsV0FBVyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFLM0Q7Ozs7O0dBS0c7QUFDSCxNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLEtBQW1DO0lBRW5DLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxFQUFDLEdBQUcsS0FBSyxFQUFDLENBQUMsQ0FBQztJQUNyQyxPQUFPO1FBQ0wsR0FBRyxJQUFJO1FBQ1AsR0FBRyxLQUFLO1FBQ1IsT0FBTyxFQUFFLEtBQUssQ0FBQyxPQUFPLElBQUksRUFBRTtRQUM1QixhQUFhLEVBQUUsS0FBSyxDQUFDLGFBQWEsSUFBSSxLQUFLO1FBQzNDLFdBQVcsRUFBRSxLQUFLLENBQUMsV0FBVyxJQUFJLEtBQUs7S0FDeEMsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtBamZGaWVsZENyZWF0ZSwgY3JlYXRlRmllbGR9IGZyb20gJy4vY3JlYXRlLWZpZWxkJztcblxuZXhwb3J0IHR5cGUgQWpmRmllbGRXaXRoQ2hvaWNlc0NyZWF0ZTxUPiA9IEFqZkZpZWxkQ3JlYXRlICZcbiAgUGljazxBamZGaWVsZFdpdGhDaG9pY2VzPFQ+LCAnZmllbGRUeXBlJyB8ICdjaG9pY2VzT3JpZ2luJz4gJlxuICBQYXJ0aWFsPEFqZkZpZWxkV2l0aENob2ljZXM8VD4+O1xuLyoqXG4gKiBDcmVhdGUgYW4gQWpmRmllbGRXaXRoQ2hvaWNlLlxuICogSWYgY2hvaWNlcyBpcyBub3QgZGVmaW5lZCBhcHBseSBlbXB0eSBhcnJheS5cbiAqIElmIGZvcmNlRXhwYW5kZWQgaXMgbm90IGRlZmluZWQgYXBwbHkgZmFsc2UuXG4gKiBJZiBmb3JjZU5hcnJvdyBpcyBub3QgZGVmaW5lZCBhcHBseSBmYWxzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpZWxkV2l0aENob2ljZXM8VD4oXG4gIGZpZWxkOiBBamZGaWVsZFdpdGhDaG9pY2VzQ3JlYXRlPFQ+LFxuKTogQWpmRmllbGRXaXRoQ2hvaWNlczxUPiB7XG4gIGNvbnN0IG5vZGUgPSBjcmVhdGVGaWVsZCh7Li4uZmllbGR9KTtcbiAgcmV0dXJuIHtcbiAgICAuLi5ub2RlLFxuICAgIC4uLmZpZWxkLFxuICAgIGNob2ljZXM6IGZpZWxkLmNob2ljZXMgfHwgW10sXG4gICAgZm9yY2VFeHBhbmRlZDogZmllbGQuZm9yY2VFeHBhbmRlZCB8fCBmYWxzZSxcbiAgICBmb3JjZU5hcnJvdzogZmllbGQuZm9yY2VOYXJyb3cgfHwgZmFsc2UsXG4gIH07XG59XG4iXX0=