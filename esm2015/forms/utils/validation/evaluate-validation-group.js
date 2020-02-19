/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/validation/evaluate-validation-group.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtdmFsaWRhdGlvbi1ncm91cC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL3ZhbGlkYXRpb24vZXZhbHVhdGUtdmFsaWRhdGlvbi1ncm91cC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXVCQSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFLekMsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDOUUsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDN0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDM0UsT0FBTyxFQUFDLDJCQUEyQixFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDN0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDM0UsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0saUNBQWlDLENBQUM7Ozs7Ozs7QUFFM0UsTUFBTSxVQUFVLHVCQUF1QixDQUNuQyxVQUE4QixFQUFFLEtBQVUsRUFBRSxPQUFvQjs7UUFDOUQsR0FBRyxHQUEwQixFQUFFOztRQUMvQixHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQztJQUMzQixHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsS0FBSyxDQUFDO0lBQ3RCLEdBQUcsR0FBRyw0QkFBNEIsQ0FBQyxVQUFVLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDcEQsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFOztjQUNqQixRQUFRLEdBQUcsMEJBQTBCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUM5RCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQjtLQUNGO0lBQ0QsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFOztjQUNqQixRQUFRLEdBQUcsMEJBQTBCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUM5RCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQjtLQUNGO0lBQ0QsSUFBSSxVQUFVLENBQUMsUUFBUSxFQUFFOztjQUNqQixRQUFRLEdBQUcsMEJBQTBCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUM5RCxJQUFJLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUNwQjtLQUNGO0lBQ0QsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFOztjQUNsQixTQUFTLEdBQUcsMkJBQTJCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUNoRSxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNyQjtLQUNGO0lBQ0QsSUFBSSxVQUFVLENBQUMsU0FBUyxFQUFFOztjQUNsQixTQUFTLEdBQUcsMkJBQTJCLENBQUMsVUFBVSxFQUFFLEtBQUssQ0FBQztRQUNoRSxJQUFJLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDckIsR0FBRyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztTQUNyQjtLQUNGO0lBQ0QsT0FBTyxHQUFHLENBQUM7QUFDYixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuXG5pbXBvcnQge0FqZlZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi1ncm91cCc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25SZXN1bHR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24tcmVzdWx0cyc7XG5cbmltcG9ydCB7ZXZhbHVhdGVWYWxpZGF0aW9uQ29uZGl0aW9uc30gZnJvbSAnLi9ldmFsdWF0ZS12YWxpZGF0aW9uLWNvbmRpdGlvbnMnO1xuaW1wb3J0IHtldmFsdWF0ZVZhbGlkYXRpb25NYXhEaWdpdHN9IGZyb20gJy4vZXZhbHVhdGUtdmFsaWRhdGlvbi1tYXgtZGlnaXRzJztcbmltcG9ydCB7ZXZhbHVhdGVWYWxpZGF0aW9uTWF4VmFsdWV9IGZyb20gJy4vZXZhbHVhdGUtdmFsaWRhdGlvbi1tYXgtdmFsdWUnO1xuaW1wb3J0IHtldmFsdWF0ZVZhbGlkYXRpb25NaW5EaWdpdHN9IGZyb20gJy4vZXZhbHVhdGUtdmFsaWRhdGlvbi1taW4tZGlnaXRzJztcbmltcG9ydCB7ZXZhbHVhdGVWYWxpZGF0aW9uTWluVmFsdWV9IGZyb20gJy4vZXZhbHVhdGUtdmFsaWRhdGlvbi1taW4tdmFsdWUnO1xuaW1wb3J0IHtldmFsdWF0ZVZhbGlkYXRpb25Ob3RFbXB0eX0gZnJvbSAnLi9ldmFsdWF0ZS12YWxpZGF0aW9uLW5vdC1lbXB0eSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBldmFsdWF0ZVZhbGlkYXRpb25Hcm91cChcbiAgICB2YWxpZGF0aW9uOiBBamZWYWxpZGF0aW9uR3JvdXAsIHZhbHVlOiBhbnksIGNvbnRleHQ/OiBBamZDb250ZXh0KTogQWpmVmFsaWRhdGlvblJlc3VsdFtdIHtcbiAgbGV0IHJlczogQWpmVmFsaWRhdGlvblJlc3VsdFtdID0gW107XG4gIGxldCBjdHggPSBkZWVwQ29weShjb250ZXh0KTtcbiAgY3R4WyckdmFsdWUnXSA9IHZhbHVlO1xuICByZXMgPSBldmFsdWF0ZVZhbGlkYXRpb25Db25kaXRpb25zKHZhbGlkYXRpb24sIGN0eCk7XG4gIGlmICh2YWxpZGF0aW9uLm1heFZhbHVlKSB7XG4gICAgY29uc3QgbWF4VmFsdWUgPSBldmFsdWF0ZVZhbGlkYXRpb25NYXhWYWx1ZSh2YWxpZGF0aW9uLCB2YWx1ZSk7XG4gICAgaWYgKG1heFZhbHVlICE9IG51bGwpIHtcbiAgICAgIHJlcy5wdXNoKG1heFZhbHVlKTtcbiAgICB9XG4gIH1cbiAgaWYgKHZhbGlkYXRpb24ubWluVmFsdWUpIHtcbiAgICBjb25zdCBtaW5WYWx1ZSA9IGV2YWx1YXRlVmFsaWRhdGlvbk1pblZhbHVlKHZhbGlkYXRpb24sIHZhbHVlKTtcbiAgICBpZiAobWluVmFsdWUgIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2gobWluVmFsdWUpO1xuICAgIH1cbiAgfVxuICBpZiAodmFsaWRhdGlvbi5ub3RFbXB0eSkge1xuICAgIGNvbnN0IG5vdEVtcHR5ID0gZXZhbHVhdGVWYWxpZGF0aW9uTm90RW1wdHkodmFsaWRhdGlvbiwgdmFsdWUpO1xuICAgIGlmIChub3RFbXB0eSAhPSBudWxsKSB7XG4gICAgICByZXMucHVzaChub3RFbXB0eSk7XG4gICAgfVxuICB9XG4gIGlmICh2YWxpZGF0aW9uLm1heERpZ2l0cykge1xuICAgIGNvbnN0IG1heERpZ2l0cyA9IGV2YWx1YXRlVmFsaWRhdGlvbk1heERpZ2l0cyh2YWxpZGF0aW9uLCB2YWx1ZSk7XG4gICAgaWYgKG1heERpZ2l0cyAhPSBudWxsKSB7XG4gICAgICByZXMucHVzaChtYXhEaWdpdHMpO1xuICAgIH1cbiAgfVxuICBpZiAodmFsaWRhdGlvbi5taW5EaWdpdHMpIHtcbiAgICBjb25zdCBtaW5EaWdpdHMgPSBldmFsdWF0ZVZhbGlkYXRpb25NaW5EaWdpdHModmFsaWRhdGlvbiwgdmFsdWUpO1xuICAgIGlmIChtaW5EaWdpdHMgIT0gbnVsbCkge1xuICAgICAgcmVzLnB1c2gobWluRGlnaXRzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHJlcztcbn1cbiJdfQ==