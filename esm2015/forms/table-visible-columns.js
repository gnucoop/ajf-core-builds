/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/table-visible-columns.ts
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
export class AjfTableVisibleColumnsPipe {
    /**
     * @param {?} instance
     * @return {?}
     */
    transform(instance) {
        if (!instance.node.editable) {
            /** @type {?} */
            const val = instance.value || [];
            return instance.hideEmptyRows ?
                val.filter((/**
                 * @param {?} col
                 * @return {?}
                 */
                col => col[1].reduce((/**
                 * @param {?} prev
                 * @param {?} cur
                 * @return {?}
                 */
                (prev, cur) => {
                    return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                }), false)))
                    .map((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => [v[0], ...v[1]])) :
                val.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                v => [v[0], ...v[1]]));
        }
        return (((/** @type {?} */ (instance.controls))) || [])
            .map((/**
         * @param {?} v
         * @return {?}
         */
        v => [v[0], ...v[1]]));
    }
}
AjfTableVisibleColumnsPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfTableVisibleColumns' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlzaWJsZS1jb2x1bW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdGFibGUtdmlzaWJsZS1jb2x1bW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBS2xELE1BQU0sT0FBTywwQkFBMEI7Ozs7O0lBQ3JDLFNBQVMsQ0FBQyxRQUErQjtRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7O2tCQUNyQixHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFO1lBQ2hDLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQixHQUFHLENBQUMsTUFBTTs7OztnQkFDSCxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNOzs7OztnQkFDaEIsQ0FBQyxJQUFhLEVBQUUsR0FBRyxFQUFFLEVBQUU7b0JBQ3JCLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RSxDQUFDLEdBQ0QsS0FBSyxDQUFDLEVBQUM7cUJBQ2IsR0FBRzs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUNoQyxHQUFHLENBQUMsR0FBRzs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sQ0FBQyxDQUFDLG1CQUFBLFFBQVEsQ0FBQyxRQUFRLEVBQWdELENBQUMsSUFBSSxFQUFFLENBQUM7YUFDN0UsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDO0lBQ2pDLENBQUM7OztZQWpCRixJQUFJLFNBQUMsRUFBQyxJQUFJLEVBQUUsd0JBQXdCLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy90YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRhYmxlRm9ybUNvbnRyb2x9IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL3RhYmxlLWZvcm0tY29udHJvbCc7XG5cbkBQaXBlKHtuYW1lOiAnYWpmVGFibGVWaXNpYmxlQ29sdW1ucyd9KVxuZXhwb3J0IGNsYXNzIEFqZlRhYmxlVmlzaWJsZUNvbHVtbnNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnN0YW5jZTogQWpmVGFibGVGaWVsZEluc3RhbmNlKTogKHN0cmluZ3xudW1iZXJ8QWpmVGFibGVGb3JtQ29udHJvbClbXVtdIHtcbiAgICBpZiAoIWluc3RhbmNlLm5vZGUuZWRpdGFibGUpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGluc3RhbmNlLnZhbHVlIHx8IFtdO1xuICAgICAgcmV0dXJuIGluc3RhbmNlLmhpZGVFbXB0eVJvd3MgP1xuICAgICAgICAgIHZhbC5maWx0ZXIoXG4gICAgICAgICAgICAgICAgIGNvbCA9PiBjb2xbMV0ucmVkdWNlKFxuICAgICAgICAgICAgICAgICAgICAgKHByZXY6IGJvb2xlYW4sIGN1cikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gcHJldiB8fCAoY3VyICE9IG51bGwgJiYgY3VyICE9PSAnJyAmJiBjdXIgIT09IDAgJiYgY3VyICE9PSAnMCcpO1xuICAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgIGZhbHNlKSlcbiAgICAgICAgICAgICAgLm1hcCh2ID0+IFt2WzBdLCAuLi52WzFdXSkgOlxuICAgICAgICAgIHZhbC5tYXAodiA9PiBbdlswXSwgLi4udlsxXV0pO1xuICAgIH1cbiAgICByZXR1cm4gKChpbnN0YW5jZS5jb250cm9scyBhcyBbc3RyaW5nLCAoc3RyaW5nIHwgQWpmVGFibGVGb3JtQ29udHJvbClbXV1bXSkgfHwgW10pXG4gICAgICAgIC5tYXAodiA9PiBbdlswXSwgLi4udlsxXV0pO1xuICB9XG59XG4iXX0=