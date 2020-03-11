/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/validation/evaluate-validation-group.ts
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
import { deepCopy } from '@ajf/core/utils';
import { evaluateValidationConditions } from './evaluate-validation-conditions';
import { evaluateValidationMaxDigits } from './evaluate-validation-max-digits';
import { evaluateValidationMaxValue } from './evaluate-validation-max-value';
import { evaluateValidationMinDigits } from './evaluate-validation-min-digits';
import { evaluateValidationMinValue } from './evaluate-validation-min-value';
import { evaluateValidationNotEmpty } from './evaluate-validation-not-empty';
/**
 * @param {?} validation
 * @param {?} value
 * @param {?=} context
 * @return {?}
 */
export function evaluateValidationGroup(validation, value, context) {
    /** @type {?} */
    let res = [];
    /** @type {?} */
    let ctx = deepCopy(context);
    ctx['$value'] = value;
    res = evaluateValidationConditions(validation, ctx);
    if (validation.maxValue) {
        /** @type {?} */
        const maxValue = evaluateValidationMaxValue(validation, value);
        if (maxValue != null) {
            res.push(maxValue);
        }
    }
    if (validation.minValue) {
        /** @type {?} */
        const minValue = evaluateValidationMinValue(validation, value);
        if (minValue != null) {
            res.push(minValue);
        }
    }
    if (validation.notEmpty) {
        /** @type {?} */
        const notEmpty = evaluateValidationNotEmpty(validation, value);
        if (notEmpty != null) {
            res.push(notEmpty);
        }
    }
    if (validation.maxDigits) {
        /** @type {?} */
        const maxDigits = evaluateValidationMaxDigits(validation, value);
        if (maxDigits != null) {
            res.push(maxDigits);
        }
    }
    if (validation.minDigits) {
        /** @type {?} */
        const minDigits = evaluateValidationMinDigits(validation, value);
        if (minDigits != null) {
            res.push(minDigits);
        }
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtdmFsaWRhdGlvbi1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL3ZhbGlkYXRpb24vZXZhbHVhdGUtdmFsaWRhdGlvbi1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFLekMsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDOUUsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDN0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDM0UsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDN0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDM0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7QUFFM0UsTUFBTSxVQUFVLHVCQUF1QixDQUNuQyxVQUE4QixFQUFFLEtBQVUsRUFBRSxPQUFvQjs7UUFDOUQsR0FBRyxHQUEwQixFQUFFOztRQUMvQixHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUMzQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLEdBQUcsR0FBRyw0QkFBNEIsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEQsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFOztjQUNqQixRQUFRLEdBQUcsMEJBQTBCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUM5RCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQjtLQUNGO0lBQ0QsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFOztjQUNqQixRQUFRLEdBQUcsMEJBQTBCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUM5RCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQjtLQUNGO0lBQ0QsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFOztjQUNqQixRQUFRLEdBQUcsMEJBQTBCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUM5RCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQjtLQUNGO0lBQ0QsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFOztjQUNsQixTQUFTLEdBQUcsMkJBQTJCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUNoRSxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNyQjtLQUNGO0lBQ0QsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFOztjQUNsQixTQUFTLEdBQUcsMkJBQTJCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUNoRSxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNyQjtLQUNGO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcblxuaW1wb3J0IHtBamZWYWxpZGF0aW9uR3JvdXB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24tZ3JvdXAnO1xuaW1wb3J0IHtBamZWYWxpZGF0aW9uUmVzdWx0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi92YWxpZGF0aW9uLXJlc3VsdHMnO1xuXG5pbXBvcnQge2V2YWx1YXRlVmFsaWRhdGlvbkNvbmRpdGlvbnN9IGZyb20gJy4vZXZhbHVhdGUtdmFsaWRhdGlvbi1jb25kaXRpb25zJztcbmltcG9ydCB7ZXZhbHVhdGVWYWxpZGF0aW9uTWF4RGlnaXRzfSBmcm9tICcuL2V2YWx1YXRlLXZhbGlkYXRpb24tbWF4LWRpZ2l0cyc7XG5pbXBvcnQge2V2YWx1YXRlVmFsaWRhdGlvbk1heFZhbHVlfSBmcm9tICcuL2V2YWx1YXRlLXZhbGlkYXRpb24tbWF4LXZhbHVlJztcbmltcG9ydCB7ZXZhbHVhdGVWYWxpZGF0aW9uTWluRGlnaXRzfSBmcm9tICcuL2V2YWx1YXRlLXZhbGlkYXRpb24tbWluLWRpZ2l0cyc7XG5pbXBvcnQge2V2YWx1YXRlVmFsaWRhdGlvbk1pblZhbHVlfSBmcm9tICcuL2V2YWx1YXRlLXZhbGlkYXRpb24tbWluLXZhbHVlJztcbmltcG9ydCB7ZXZhbHVhdGVWYWxpZGF0aW9uTm90RW1wdHl9IGZyb20gJy4vZXZhbHVhdGUtdmFsaWRhdGlvbi1ub3QtZW1wdHknO1xuXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVWYWxpZGF0aW9uR3JvdXAoXG4gICAgdmFsaWRhdGlvbjogQWpmVmFsaWRhdGlvbkdyb3VwLCB2YWx1ZTogYW55LCBjb250ZXh0PzogQWpmQ29udGV4dCk6IEFqZlZhbGlkYXRpb25SZXN1bHRbXSB7XG4gIGxldCByZXM6IEFqZlZhbGlkYXRpb25SZXN1bHRbXSA9IFtdO1xuICBsZXQgY3R4ID0gZGVlcENvcHkoY29udGV4dCk7XG4gIGN0eFsnJHZhbHVlJ10gPSB2YWx1ZTtcbiAgcmVzID0gZXZhbHVhdGVWYWxpZGF0aW9uQ29uZGl0aW9ucyh2YWxpZGF0aW9uLCBjdHgpO1xuICBpZiAodmFsaWRhdGlvbi5tYXhWYWx1ZSkge1xuICAgIGNvbnN0IG1heFZhbHVlID0gZXZhbHVhdGVWYWxpZGF0aW9uTWF4VmFsdWUodmFsaWRhdGlvbiwgdmFsdWUpO1xuICAgIGlmIChtYXhWYWx1ZSAhPSBudWxsKSB7XG4gICAgICByZXMucHVzaChtYXhWYWx1ZSk7XG4gICAgfVxuICB9XG4gIGlmICh2YWxpZGF0aW9uLm1pblZhbHVlKSB7XG4gICAgY29uc3QgbWluVmFsdWUgPSBldmFsdWF0ZVZhbGlkYXRpb25NaW5WYWx1ZSh2YWxpZGF0aW9uLCB2YWx1ZSk7XG4gICAgaWYgKG1pblZhbHVlICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKG1pblZhbHVlKTtcbiAgICB9XG4gIH1cbiAgaWYgKHZhbGlkYXRpb24ubm90RW1wdHkpIHtcbiAgICBjb25zdCBub3RFbXB0eSA9IGV2YWx1YXRlVmFsaWRhdGlvbk5vdEVtcHR5KHZhbGlkYXRpb24sIHZhbHVlKTtcbiAgICBpZiAobm90RW1wdHkgIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2gobm90RW1wdHkpO1xuICAgIH1cbiAgfVxuICBpZiAodmFsaWRhdGlvbi5tYXhEaWdpdHMpIHtcbiAgICBjb25zdCBtYXhEaWdpdHMgPSBldmFsdWF0ZVZhbGlkYXRpb25NYXhEaWdpdHModmFsaWRhdGlvbiwgdmFsdWUpO1xuICAgIGlmIChtYXhEaWdpdHMgIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2gobWF4RGlnaXRzKTtcbiAgICB9XG4gIH1cbiAgaWYgKHZhbGlkYXRpb24ubWluRGlnaXRzKSB7XG4gICAgY29uc3QgbWluRGlnaXRzID0gZXZhbHVhdGVWYWxpZGF0aW9uTWluRGlnaXRzKHZhbGlkYXRpb24sIHZhbHVlKTtcbiAgICBpZiAobWluRGlnaXRzICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKG1pbkRpZ2l0cyk7XG4gICAgfVxuICB9XG4gIHJldHVybiByZXM7XG59XG4iXX0=