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
 * It creates an Ajf form.
 * Any missing mandatory attributes are initialized with the respective
 * empty object
 *
 * @export
 * @param [form={}]
 * @return {*}
 */
export function createForm(form = {}) {
    return {
        nodes: form.nodes || [],
        choicesOrigins: form.choicesOrigins || [],
        attachmentsOrigins: form.attachmentsOrigins || [],
        initContext: form.initContext || {},
        stringIdentifier: form.stringIdentifier || [],
        supplementaryInformations: form.supplementaryInformations,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZvcm0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9mb3Jtcy9jcmVhdGUtZm9ybS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFPSDs7Ozs7Ozs7R0FRRztBQUNILE1BQU0sVUFBVSxVQUFVLENBQUMsT0FBc0IsRUFBRTtJQUNqRCxPQUFPO1FBQ0wsS0FBSyxFQUFFLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRTtRQUN2QixjQUFjLEVBQUUsSUFBSSxDQUFDLGNBQWMsSUFBSSxFQUFFO1FBQ3pDLGtCQUFrQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxFQUFFO1FBQ2pELFdBQVcsRUFBRSxJQUFJLENBQUMsV0FBVyxJQUFJLEVBQUU7UUFDbkMsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixJQUFLLEVBQWdDO1FBQzVFLHlCQUF5QixFQUFFLElBQUksQ0FBQyx5QkFBeUI7S0FDMUQsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZGb3JtU3RyaW5nSWRlbnRpZmllcn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0tc3RyaW5nLWlkZW50aWZpZXInO1xuXG5leHBvcnQgdHlwZSBBamZGb3JtQ3JlYXRlID0gUGFydGlhbDxBamZGb3JtPjtcblxuLyoqXG4gKiBJdCBjcmVhdGVzIGFuIEFqZiBmb3JtLlxuICogQW55IG1pc3NpbmcgbWFuZGF0b3J5IGF0dHJpYnV0ZXMgYXJlIGluaXRpYWxpemVkIHdpdGggdGhlIHJlc3BlY3RpdmVcbiAqIGVtcHR5IG9iamVjdFxuICpcbiAqIEBleHBvcnRcbiAqIEBwYXJhbSBbZm9ybT17fV1cbiAqIEByZXR1cm4geyp9XG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGb3JtKGZvcm06IEFqZkZvcm1DcmVhdGUgPSB7fSk6IEFqZkZvcm0ge1xuICByZXR1cm4ge1xuICAgIG5vZGVzOiBmb3JtLm5vZGVzIHx8IFtdLFxuICAgIGNob2ljZXNPcmlnaW5zOiBmb3JtLmNob2ljZXNPcmlnaW5zIHx8IFtdLFxuICAgIGF0dGFjaG1lbnRzT3JpZ2luczogZm9ybS5hdHRhY2htZW50c09yaWdpbnMgfHwgW10sXG4gICAgaW5pdENvbnRleHQ6IGZvcm0uaW5pdENvbnRleHQgfHwge30sXG4gICAgc3RyaW5nSWRlbnRpZmllcjogZm9ybS5zdHJpbmdJZGVudGlmaWVyIHx8IChbXSBhcyBBamZGb3JtU3RyaW5nSWRlbnRpZmllcltdKSxcbiAgICBzdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zOiBmb3JtLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMsXG4gIH07XG59XG4iXX0=