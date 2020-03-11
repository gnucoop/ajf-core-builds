/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/serializers/dataset-serializer.ts
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
import { AjfFormulaSerializer } from '@ajf/core/models';
import { createDataset } from '../utils/dataset/create-dataset';
import { AjfAggregationSerializer } from './aggregation-serializer';
export class AjfDatasetSerializer {
    /**
     * @param {?} json
     * @return {?}
     */
    static fromJson(json) {
        if (json.formula == null || json.aggregation == null || json.label == null) {
            throw new Error('Malformed dataset');
        }
        json.formula = json.formula instanceof Array ?
            json.formula = json.formula.map((/**
             * @param {?} f
             * @return {?}
             */
            f => AjfFormulaSerializer.fromJson(f))) :
            AjfFormulaSerializer.fromJson(json.formula);
        json.aggregation = AjfAggregationSerializer.fromJson(json.aggregation);
        return createDataset(json);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF0YXNldC1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9zZXJpYWxpemVycy9kYXRhc2V0LXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFHdEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRTlELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBRWxFLE1BQU0sT0FBTyxvQkFBb0I7Ozs7O0lBQy9CLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBeUI7UUFDdkMsSUFBSSxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsV0FBVyxJQUFJLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxJQUFJLElBQUksRUFBRTtZQUMxRSxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLFlBQVksS0FBSyxDQUFDLENBQUM7WUFDMUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUc7Ozs7WUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUM7WUFDeEUsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLHdCQUF3QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7UUFDdkUsT0FBTyxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDN0IsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm11bGFTZXJpYWxpemVyfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9kYXRhc2V0JztcbmltcG9ydCB7Y3JlYXRlRGF0YXNldH0gZnJvbSAnLi4vdXRpbHMvZGF0YXNldC9jcmVhdGUtZGF0YXNldCc7XG5cbmltcG9ydCB7QWpmQWdncmVnYXRpb25TZXJpYWxpemVyfSBmcm9tICcuL2FnZ3JlZ2F0aW9uLXNlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgQWpmRGF0YXNldFNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24oanNvbjogUGFydGlhbDxBamZEYXRhc2V0Pik6IEFqZkRhdGFzZXQge1xuICAgIGlmIChqc29uLmZvcm11bGEgPT0gbnVsbCB8fCBqc29uLmFnZ3JlZ2F0aW9uID09IG51bGwgfHwganNvbi5sYWJlbCA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01hbGZvcm1lZCBkYXRhc2V0Jyk7XG4gICAgfVxuICAgIGpzb24uZm9ybXVsYSA9IGpzb24uZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5ID9cbiAgICAgICAganNvbi5mb3JtdWxhID0ganNvbi5mb3JtdWxhLm1hcChmID0+IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGYpKSA6XG4gICAgICAgIEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGpzb24uZm9ybXVsYSk7XG4gICAganNvbi5hZ2dyZWdhdGlvbiA9IEFqZkFnZ3JlZ2F0aW9uU2VyaWFsaXplci5mcm9tSnNvbihqc29uLmFnZ3JlZ2F0aW9uKTtcbiAgICByZXR1cm4gY3JlYXRlRGF0YXNldChqc29uKTtcbiAgfVxufVxuIl19