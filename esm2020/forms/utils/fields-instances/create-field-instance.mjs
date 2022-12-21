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
import { EventEmitter } from '@angular/core';
import { createNodeInstance } from '../nodes-instances/create-node-instance';
import { nodeInstanceCompleteName } from '../nodes-instances/node-instance-complete-name';
/**
 * Create a field instance and init the value of the field by cascade conditions.
 *
 * First check if the value is in the context by node name.
 * Second check if the value is in the context by complete name.
 * Third check if the field has a default value.
 * Else value is null.
 *
 * If instance validationResultsis is not defined assign empty array.
 * If instance warningResults is not defined assign empty array.
 * Init valid with false.
 */
export function createFieldInstance(instance, context) {
    const nodeInstance = createNodeInstance(instance);
    let value = null;
    if (nodeInstance.node != null && context != null) {
        const completeName = nodeInstanceCompleteName(nodeInstance);
        if (context[nodeInstance.node.name] != null) {
            value = context[nodeInstance.node.name];
        }
        else if (context[completeName] != null) {
            value = context[completeName];
        }
        else if (instance.node.defaultValue != null) {
            if (instance.node.defaultValue.formula != null) {
                context[completeName] = evaluateExpression(instance.node.defaultValue.formula, context);
            }
            else {
                context[completeName] = instance.node.defaultValue;
            }
            value = context[completeName];
        }
    }
    return {
        ...nodeInstance,
        node: instance.node,
        value,
        valid: false,
        validationResults: instance.validationResults || [],
        warningResults: instance.warningResults || [],
        warningTrigger: new EventEmitter(),
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFhLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQXdCLGtCQUFrQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDbEcsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFJeEY7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFFBQWdDLEVBQ2hDLE9BQW1CO0lBRW5CLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELElBQUksS0FBSyxHQUFRLElBQUksQ0FBQztJQUN0QixJQUFJLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEQsTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUQsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDM0MsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3hDLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDL0I7YUFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtZQUM3QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQzlDLE9BQU8sQ0FBQyxZQUFZLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7YUFDekY7aUJBQU07Z0JBQ0wsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDO2FBQ3BEO1lBQ0QsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMvQjtLQUNGO0lBQ0QsT0FBTztRQUNMLEdBQUcsWUFBWTtRQUNmLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSTtRQUNuQixLQUFLO1FBQ0wsS0FBSyxFQUFFLEtBQUs7UUFDWixpQkFBaUIsRUFBRSxRQUFRLENBQUMsaUJBQWlCLElBQUksRUFBRTtRQUNuRCxjQUFjLEVBQUUsUUFBUSxDQUFDLGNBQWMsSUFBSSxFQUFFO1FBQzdDLGNBQWMsRUFBRSxJQUFJLFlBQVksRUFBUTtLQUN6QyxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0LCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlQ3JlYXRlLCBjcmVhdGVOb2RlSW5zdGFuY2V9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9jcmVhdGUtbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5cbmV4cG9ydCB0eXBlIEFqZkZpZWxkSW5zdGFuY2VDcmVhdGUgPSBBamZOb2RlSW5zdGFuY2VDcmVhdGUgJiBQYXJ0aWFsPEFqZkZpZWxkSW5zdGFuY2U+O1xuXG4vKipcbiAqIENyZWF0ZSBhIGZpZWxkIGluc3RhbmNlIGFuZCBpbml0IHRoZSB2YWx1ZSBvZiB0aGUgZmllbGQgYnkgY2FzY2FkZSBjb25kaXRpb25zLlxuICpcbiAqIEZpcnN0IGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyBpbiB0aGUgY29udGV4dCBieSBub2RlIG5hbWUuXG4gKiBTZWNvbmQgY2hlY2sgaWYgdGhlIHZhbHVlIGlzIGluIHRoZSBjb250ZXh0IGJ5IGNvbXBsZXRlIG5hbWUuXG4gKiBUaGlyZCBjaGVjayBpZiB0aGUgZmllbGQgaGFzIGEgZGVmYXVsdCB2YWx1ZS5cbiAqIEVsc2UgdmFsdWUgaXMgbnVsbC5cbiAqXG4gKiBJZiBpbnN0YW5jZSB2YWxpZGF0aW9uUmVzdWx0c2lzIGlzIG5vdCBkZWZpbmVkIGFzc2lnbiBlbXB0eSBhcnJheS5cbiAqIElmIGluc3RhbmNlIHdhcm5pbmdSZXN1bHRzIGlzIG5vdCBkZWZpbmVkIGFzc2lnbiBlbXB0eSBhcnJheS5cbiAqIEluaXQgdmFsaWQgd2l0aCBmYWxzZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpZWxkSW5zdGFuY2UoXG4gIGluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlQ3JlYXRlLFxuICBjb250ZXh0OiBBamZDb250ZXh0LFxuKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gIGNvbnN0IG5vZGVJbnN0YW5jZSA9IGNyZWF0ZU5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gIGxldCB2YWx1ZTogYW55ID0gbnVsbDtcbiAgaWYgKG5vZGVJbnN0YW5jZS5ub2RlICE9IG51bGwgJiYgY29udGV4dCAhPSBudWxsKSB7XG4gICAgY29uc3QgY29tcGxldGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSk7XG4gICAgaWYgKGNvbnRleHRbbm9kZUluc3RhbmNlLm5vZGUubmFtZV0gIT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSBjb250ZXh0W25vZGVJbnN0YW5jZS5ub2RlLm5hbWVdO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dFtjb21wbGV0ZU5hbWVdICE9IG51bGwpIHtcbiAgICAgIHZhbHVlID0gY29udGV4dFtjb21wbGV0ZU5hbWVdO1xuICAgIH0gZWxzZSBpZiAoaW5zdGFuY2Uubm9kZS5kZWZhdWx0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgaWYgKGluc3RhbmNlLm5vZGUuZGVmYXVsdFZhbHVlLmZvcm11bGEgIT0gbnVsbCkge1xuICAgICAgICBjb250ZXh0W2NvbXBsZXRlTmFtZV0gPSBldmFsdWF0ZUV4cHJlc3Npb24oaW5zdGFuY2Uubm9kZS5kZWZhdWx0VmFsdWUuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0W2NvbXBsZXRlTmFtZV0gPSBpbnN0YW5jZS5ub2RlLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gY29udGV4dFtjb21wbGV0ZU5hbWVdO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIC4uLm5vZGVJbnN0YW5jZSxcbiAgICBub2RlOiBpbnN0YW5jZS5ub2RlLFxuICAgIHZhbHVlLFxuICAgIHZhbGlkOiBmYWxzZSxcbiAgICB2YWxpZGF0aW9uUmVzdWx0czogaW5zdGFuY2UudmFsaWRhdGlvblJlc3VsdHMgfHwgW10sXG4gICAgd2FybmluZ1Jlc3VsdHM6IGluc3RhbmNlLndhcm5pbmdSZXN1bHRzIHx8IFtdLFxuICAgIHdhcm5pbmdUcmlnZ2VyOiBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCksXG4gIH07XG59XG4iXX0=