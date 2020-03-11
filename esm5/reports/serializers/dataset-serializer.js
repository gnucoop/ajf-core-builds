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
import { AjfFormulaSerializer } from '@ajf/core/models';
import { createDataset } from '../utils/dataset/create-dataset';
import { AjfAggregationSerializer } from './aggregation-serializer';
var AjfDatasetSerializer = /** @class */ (function () {
    function AjfDatasetSerializer() {
    }
    AjfDatasetSerializer.fromJson = function (json) {
        if (json.formula == null || json.aggregation == null || json.label == null) {
            throw new Error('Malformed dataset');
        }
        json.formula = json.formula instanceof Array ?
            json.formula = json.formula.map(function (f) { return AjfFormulaSerializer.fromJson(f); }) :
            AjfFormulaSerializer.fromJson(json.formula);
        json.aggregation = AjfAggregationSerializer.fromJson(json.aggregation);
        return createDataset(json);
    };
    return AjfDatasetSerializer;
}());
export { AjfDatasetSerializer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9zZXJpYWxpemVycy9kYXRhc2V0LXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRTlELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWxFO0lBQUE7SUFXQSxDQUFDO0lBVlEsNkJBQVEsR0FBZixVQUFnQixJQUF5QjtRQUN2QyxJQUFJLElBQUksQ0FBQyxPQUFPLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxXQUFXLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQzFFLE1BQU0sSUFBSSxLQUFLLENBQUMsbUJBQW1CLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLE9BQU8sWUFBWSxLQUFLLENBQUMsQ0FBQztZQUMxQyxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsb0JBQW9CLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFoQyxDQUFnQyxDQUFDLENBQUMsQ0FBQztZQUN4RSxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ2hELElBQUksQ0FBQyxXQUFXLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztRQUN2RSxPQUFPLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3QixDQUFDO0lBQ0gsMkJBQUM7QUFBRCxDQUFDLEFBWEQsSUFXQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGb3JtdWxhU2VyaWFsaXplcn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvZGF0YXNldCc7XG5pbXBvcnQge2NyZWF0ZURhdGFzZXR9IGZyb20gJy4uL3V0aWxzL2RhdGFzZXQvY3JlYXRlLWRhdGFzZXQnO1xuXG5pbXBvcnQge0FqZkFnZ3JlZ2F0aW9uU2VyaWFsaXplcn0gZnJvbSAnLi9hZ2dyZWdhdGlvbi1zZXJpYWxpemVyJztcblxuZXhwb3J0IGNsYXNzIEFqZkRhdGFzZXRTZXJpYWxpemVyIHtcbiAgc3RhdGljIGZyb21Kc29uKGpzb246IFBhcnRpYWw8QWpmRGF0YXNldD4pOiBBamZEYXRhc2V0IHtcbiAgICBpZiAoanNvbi5mb3JtdWxhID09IG51bGwgfHwganNvbi5hZ2dyZWdhdGlvbiA9PSBudWxsIHx8IGpzb24ubGFiZWwgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgZGF0YXNldCcpO1xuICAgIH1cbiAgICBqc29uLmZvcm11bGEgPSBqc29uLmZvcm11bGEgaW5zdGFuY2VvZiBBcnJheSA/XG4gICAgICAgIGpzb24uZm9ybXVsYSA9IGpzb24uZm9ybXVsYS5tYXAoZiA9PiBBamZGb3JtdWxhU2VyaWFsaXplci5mcm9tSnNvbihmKSkgOlxuICAgICAgICBBamZGb3JtdWxhU2VyaWFsaXplci5mcm9tSnNvbihqc29uLmZvcm11bGEpO1xuICAgIGpzb24uYWdncmVnYXRpb24gPSBBamZBZ2dyZWdhdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi5hZ2dyZWdhdGlvbik7XG4gICAgcmV0dXJuIGNyZWF0ZURhdGFzZXQoanNvbik7XG4gIH1cbn1cbiJdfQ==