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
 *  Create a AjfChoicesOrigin&lt;T&gt;, apply label and choices defaults when it missing
 */
export function createChoicesOrigin(origin) {
    return {
        ...origin,
        type: origin.type,
        label: origin.label || '',
        choices: origin.choices || [],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWNob2ljZXMtb3JpZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvY2hvaWNlcy9jcmVhdGUtY2hvaWNlcy1vcmlnaW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBTUg7O0dBRUc7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQUksTUFBaUM7SUFDdEUsT0FBTztRQUNMLEdBQUcsTUFBTTtRQUNULElBQUksRUFBRSxNQUFNLENBQUMsSUFBSTtRQUNqQixLQUFLLEVBQUUsTUFBTSxDQUFDLEtBQUssSUFBSSxFQUFFO1FBQ3pCLE9BQU8sRUFBRSxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUU7S0FDOUIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ2hvaWNlc09yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1vcmlnaW4nO1xuXG5leHBvcnQgdHlwZSBBamZDaG9pY2VzT3JpZ2luQ3JlYXRlPFQ+ID0gUGljazxBamZDaG9pY2VzT3JpZ2luPGFueT4sICd0eXBlJyB8ICduYW1lJz4gJlxuICBQYXJ0aWFsPEFqZkNob2ljZXNPcmlnaW48VD4+O1xuLyoqXG4gKiAgQ3JlYXRlIGEgQWpmQ2hvaWNlc09yaWdpbiZsdDtUJmd0OywgYXBwbHkgbGFiZWwgYW5kIGNob2ljZXMgZGVmYXVsdHMgd2hlbiBpdCBtaXNzaW5nXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVDaG9pY2VzT3JpZ2luPFQ+KG9yaWdpbjogQWpmQ2hvaWNlc09yaWdpbkNyZWF0ZTxUPik6IEFqZkNob2ljZXNPcmlnaW48VD4ge1xuICByZXR1cm4ge1xuICAgIC4uLm9yaWdpbixcbiAgICB0eXBlOiBvcmlnaW4udHlwZSwgLy8gVE9ETyB3aHk/XG4gICAgbGFiZWw6IG9yaWdpbi5sYWJlbCB8fCAnJyxcbiAgICBjaG9pY2VzOiBvcmlnaW4uY2hvaWNlcyB8fCBbXSxcbiAgfTtcbn1cbiJdfQ==