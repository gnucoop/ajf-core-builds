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
import { notEmpty } from '@ajf/core/models';
import { evaluateValidation } from './evaluate-validation';
/**
 * Basic validation function that cheecks the value is not null
 * notEmpty is the associated AjfCondition
 */
export function evaluateValidationNotEmpty(validation, value) {
    let ne = validation.notEmpty;
    if (ne == null || ne === false) {
        return null;
    }
    if (ne === true) {
        ne = 'Value must not be empty';
    }
    if (typeof ne === 'string') {
        return {
            result: notEmpty(value),
            error: ne,
            clientValidation: false,
        };
    }
    return evaluateValidation(ne, { '$value': value });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtdmFsaWRhdGlvbi1ub3QtZW1wdHkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy91dGlscy92YWxpZGF0aW9uL2V2YWx1YXRlLXZhbGlkYXRpb24tbm90LWVtcHR5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUkxQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUV6RDs7O0dBR0c7QUFDSCxNQUFNLFVBQVUsMEJBQTBCLENBQ3hDLFVBQThCLEVBQzlCLEtBQVU7SUFFVixJQUFJLEVBQUUsR0FBRyxVQUFVLENBQUMsUUFBd0QsQ0FBQztJQUM3RSxJQUFJLEVBQUUsSUFBSSxJQUFJLElBQUksRUFBRSxLQUFLLEtBQUssRUFBRTtRQUM5QixPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsSUFBSSxFQUFFLEtBQUssSUFBSSxFQUFFO1FBQ2YsRUFBRSxHQUFHLHlCQUF5QixDQUFDO0tBQ2hDO0lBQ0QsSUFBSSxPQUFPLEVBQUUsS0FBSyxRQUFRLEVBQUU7UUFDMUIsT0FBTztZQUNMLE1BQU0sRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDO1lBQ3ZCLEtBQUssRUFBRSxFQUFFO1lBQ1QsZ0JBQWdCLEVBQUUsS0FBSztTQUN4QixDQUFDO0tBQ0g7SUFDRCxPQUFPLGtCQUFrQixDQUFDLEVBQW1CLEVBQUUsRUFBQyxRQUFRLEVBQUUsS0FBSyxFQUFDLENBQUMsQ0FBQztBQUNwRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge25vdEVtcHR5fSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbic7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi1ncm91cCc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25SZXN1bHR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24tcmVzdWx0cyc7XG5pbXBvcnQge2V2YWx1YXRlVmFsaWRhdGlvbn0gZnJvbSAnLi9ldmFsdWF0ZS12YWxpZGF0aW9uJztcblxuLyoqXG4gKiBCYXNpYyB2YWxpZGF0aW9uIGZ1bmN0aW9uIHRoYXQgY2hlZWNrcyB0aGUgdmFsdWUgaXMgbm90IG51bGxcbiAqIG5vdEVtcHR5IGlzIHRoZSBhc3NvY2lhdGVkIEFqZkNvbmRpdGlvblxuICovXG5leHBvcnQgZnVuY3Rpb24gZXZhbHVhdGVWYWxpZGF0aW9uTm90RW1wdHkoXG4gIHZhbGlkYXRpb246IEFqZlZhbGlkYXRpb25Hcm91cCxcbiAgdmFsdWU6IGFueSxcbik6IEFqZlZhbGlkYXRpb25SZXN1bHQgfCBudWxsIHtcbiAgbGV0IG5lID0gdmFsaWRhdGlvbi5ub3RFbXB0eSBhcyBBamZWYWxpZGF0aW9uIHwgYm9vbGVhbiB8IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgaWYgKG5lID09IG51bGwgfHwgbmUgPT09IGZhbHNlKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgaWYgKG5lID09PSB0cnVlKSB7XG4gICAgbmUgPSAnVmFsdWUgbXVzdCBub3QgYmUgZW1wdHknO1xuICB9XG4gIGlmICh0eXBlb2YgbmUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3VsdDogbm90RW1wdHkodmFsdWUpLFxuICAgICAgZXJyb3I6IG5lLFxuICAgICAgY2xpZW50VmFsaWRhdGlvbjogZmFsc2UsXG4gICAgfTtcbiAgfVxuICByZXR1cm4gZXZhbHVhdGVWYWxpZGF0aW9uKG5lIGFzIEFqZlZhbGlkYXRpb24sIHsnJHZhbHVlJzogdmFsdWV9KTtcbn1cbiJdfQ==