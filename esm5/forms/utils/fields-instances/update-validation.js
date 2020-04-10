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
import { evaluateExpression } from '@ajf/core/models';
import { nodeInstanceCompleteName } from '../nodes-instances/node-instance-complete-name';
import { evaluateValidationGroup } from '../validation/evaluate-validation-group';
export function updateValidation(instance, context, supplementaryInformations) {
    var validation = instance.validation;
    if (validation == null) {
        instance.valid = true;
        return;
    }
    if (supplementaryInformations) {
        Object.keys(supplementaryInformations).forEach(function (key) {
            context["__supplementary__" + key + "__"] = supplementaryInformations[key];
        });
    }
    var completeName = nodeInstanceCompleteName(instance);
    if (context[completeName] != null && validation && validation.forceValue) {
        instance.value = evaluateExpression(validation.forceValue.condition, context);
        context[completeName] = instance.value;
        context.$value = instance.value;
    }
    instance.validationResults = evaluateValidationGroup(validation, context[completeName], context);
    instance.valid = instance.validationResults.reduce(function (prev, x) { return prev && x.result; }, true);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS12YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBYSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSWhFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLHlDQUF5QyxDQUFDO0FBRWhGLE1BQU0sVUFBVSxnQkFBZ0IsQ0FDNUIsUUFBMEIsRUFBRSxPQUFtQixFQUFFLHlCQUErQjtJQUNsRixJQUFNLFVBQVUsR0FBRyxRQUFRLENBQUMsVUFBVSxDQUFDO0lBQ3ZDLElBQUksVUFBVSxJQUFJLElBQUksRUFBRTtRQUN0QixRQUFRLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQztRQUN0QixPQUFPO0tBQ1I7SUFFRCxJQUFJLHlCQUF5QixFQUFFO1FBQzdCLE1BQU0sQ0FBQyxJQUFJLENBQUMseUJBQXlCLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQyxHQUFHO1lBQ2pELE9BQU8sQ0FBQyxzQkFBb0IsR0FBRyxPQUFJLENBQUMsR0FBRyx5QkFBeUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUN4RSxDQUFDLENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFeEQsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxJQUFJLFVBQVUsSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFO1FBQ3hFLFFBQVEsQ0FBQyxLQUFLLEdBQUcsa0JBQWtCLENBQUMsVUFBVSxDQUFDLFVBQVUsQ0FBQyxTQUFTLEVBQUUsT0FBTyxDQUFDLENBQUM7UUFDOUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDdkMsT0FBTyxDQUFDLE1BQU0sR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDO0tBQ2pDO0lBRUQsUUFBUSxDQUFDLGlCQUFpQixHQUFHLHVCQUF1QixDQUFDLFVBQVUsRUFBRSxPQUFPLENBQUMsWUFBWSxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDakcsUUFBUSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsaUJBQWlCLENBQUMsTUFBTSxDQUM5QyxVQUFDLElBQWEsRUFBRSxDQUFzQixJQUFLLE9BQUEsSUFBSSxJQUFJLENBQUMsQ0FBQyxNQUFNLEVBQWhCLENBQWdCLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDekUsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0LCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvblJlc3VsdH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi1yZXN1bHRzJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcbmltcG9ydCB7ZXZhbHVhdGVWYWxpZGF0aW9uR3JvdXB9IGZyb20gJy4uL3ZhbGlkYXRpb24vZXZhbHVhdGUtdmFsaWRhdGlvbi1ncm91cCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVWYWxpZGF0aW9uKFxuICAgIGluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlLCBjb250ZXh0OiBBamZDb250ZXh0LCBzdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zPzogYW55KTogdm9pZCB7XG4gIGNvbnN0IHZhbGlkYXRpb24gPSBpbnN0YW5jZS52YWxpZGF0aW9uO1xuICBpZiAodmFsaWRhdGlvbiA9PSBudWxsKSB7XG4gICAgaW5zdGFuY2UudmFsaWQgPSB0cnVlO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChzdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zKSB7XG4gICAgT2JqZWN0LmtleXMoc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucykuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBjb250ZXh0W2BfX3N1cHBsZW1lbnRhcnlfXyR7a2V5fV9fYF0gPSBzdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zW2tleV07XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpO1xuXG4gIGlmIChjb250ZXh0W2NvbXBsZXRlTmFtZV0gIT0gbnVsbCAmJiB2YWxpZGF0aW9uICYmIHZhbGlkYXRpb24uZm9yY2VWYWx1ZSkge1xuICAgIGluc3RhbmNlLnZhbHVlID0gZXZhbHVhdGVFeHByZXNzaW9uKHZhbGlkYXRpb24uZm9yY2VWYWx1ZS5jb25kaXRpb24sIGNvbnRleHQpO1xuICAgIGNvbnRleHRbY29tcGxldGVOYW1lXSA9IGluc3RhbmNlLnZhbHVlO1xuICAgIGNvbnRleHQuJHZhbHVlID0gaW5zdGFuY2UudmFsdWU7XG4gIH1cblxuICBpbnN0YW5jZS52YWxpZGF0aW9uUmVzdWx0cyA9IGV2YWx1YXRlVmFsaWRhdGlvbkdyb3VwKHZhbGlkYXRpb24sIGNvbnRleHRbY29tcGxldGVOYW1lXSwgY29udGV4dCk7XG4gIGluc3RhbmNlLnZhbGlkID0gaW5zdGFuY2UudmFsaWRhdGlvblJlc3VsdHMucmVkdWNlKFxuICAgICAgKHByZXY6IGJvb2xlYW4sIHg6IEFqZlZhbGlkYXRpb25SZXN1bHQpID0+IHByZXYgJiYgeC5yZXN1bHQsIHRydWUpO1xufVxuIl19