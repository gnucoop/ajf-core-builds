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
export function isChoicesOrigin(co) {
    return co != null
        && typeof co === 'object'
        && co.name != null
        && typeof co.name === 'string'
        && co.label != null
        && typeof co.label === 'string'
        && ['fixed', 'promise', 'observable', 'observableArray', 'function'].indexOf(co.type) > -1
        && co.choices instanceof Array;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtY2hvaWNlcy1vcmlnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9jaG9pY2VzL2lzLWNob2ljZXMtb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE1BQU0sVUFBVSxlQUFlLENBQUMsRUFBTztJQUNyQyxPQUFPLEVBQUUsSUFBSSxJQUFJO1dBQ1osT0FBTyxFQUFFLEtBQUssUUFBUTtXQUN0QixFQUFFLENBQUMsSUFBSSxJQUFJLElBQUk7V0FDZixPQUFPLEVBQUUsQ0FBQyxJQUFJLEtBQUssUUFBUTtXQUMzQixFQUFFLENBQUMsS0FBSyxJQUFJLElBQUk7V0FDaEIsT0FBTyxFQUFFLENBQUMsS0FBSyxLQUFLLFFBQVE7V0FDNUIsQ0FBQyxPQUFPLEVBQUUsU0FBUyxFQUFFLFlBQVksRUFBRSxpQkFBaUIsRUFBRSxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztXQUN2RixFQUFFLENBQUMsT0FBTyxZQUFZLEtBQUssQ0FBQztBQUNuQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0Nob2ljZXNPcmlnaW4oY286IGFueSk6IGJvb2xlYW4ge1xuICByZXR1cm4gY28gIT0gbnVsbFxuICAgICYmIHR5cGVvZiBjbyA9PT0gJ29iamVjdCdcbiAgICAmJiBjby5uYW1lICE9IG51bGxcbiAgICAmJiB0eXBlb2YgY28ubmFtZSA9PT0gJ3N0cmluZydcbiAgICAmJiBjby5sYWJlbCAhPSBudWxsXG4gICAgJiYgdHlwZW9mIGNvLmxhYmVsID09PSAnc3RyaW5nJ1xuICAgICYmIFsnZml4ZWQnLCAncHJvbWlzZScsICdvYnNlcnZhYmxlJywgJ29ic2VydmFibGVBcnJheScsICdmdW5jdGlvbiddLmluZGV4T2YoY28udHlwZSkgPiAtMVxuICAgICYmIGNvLmNob2ljZXMgaW5zdGFuY2VvZiBBcnJheTtcbn1cbiJdfQ==