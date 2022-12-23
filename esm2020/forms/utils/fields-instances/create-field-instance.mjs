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
export function createFieldInstance(instance, context, containerNode) {
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
                let visibility = nodeInstance.visible ? nodeInstance.visible : false;
                if (visibility && containerNode && containerNode.visibility) {
                    visibility = evaluateExpression(containerNode.visibility.condition, context);
                }
                if (visibility) {
                    context[completeName] = evaluateExpression(instance.node.defaultValue.formula, context);
                }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFhLGtCQUFrQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFDaEUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUkzQyxPQUFPLEVBQXdCLGtCQUFrQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDbEcsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7QUFJeEY7Ozs7Ozs7Ozs7O0dBV0c7QUFDSCxNQUFNLFVBQVUsbUJBQW1CLENBQ2pDLFFBQWdDLEVBQ2hDLE9BQW1CLEVBQ25CLGFBQThCO0lBRTlCLE1BQU0sWUFBWSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ2xELElBQUksS0FBSyxHQUFRLElBQUksQ0FBQztJQUN0QixJQUFJLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDaEQsTUFBTSxZQUFZLEdBQUcsd0JBQXdCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDNUQsSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDM0MsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ3pDO2FBQU0sSUFBSSxPQUFPLENBQUMsWUFBWSxDQUFDLElBQUksSUFBSSxFQUFFO1lBQ3hDLEtBQUssR0FBRyxPQUFPLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDL0I7YUFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxJQUFJLElBQUksRUFBRTtZQUM3QyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7Z0JBQzlDLElBQUksVUFBVSxHQUFZLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQztnQkFDOUUsSUFBSSxVQUFVLElBQUksYUFBYSxJQUFJLGFBQWEsQ0FBQyxVQUFVLEVBQUU7b0JBQzNELFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLFNBQVMsRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDOUU7Z0JBQ0QsSUFBSSxVQUFVLEVBQUU7b0JBQ2QsT0FBTyxDQUFDLFlBQVksQ0FBQyxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztpQkFDekY7YUFDRjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsWUFBWSxDQUFDLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUM7YUFDcEQ7WUFDRCxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQy9CO0tBQ0Y7SUFDRCxPQUFPO1FBQ0wsR0FBRyxZQUFZO1FBQ2YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1FBQ25CLEtBQUs7UUFDTCxLQUFLLEVBQUUsS0FBSztRQUNaLGlCQUFpQixFQUFFLFFBQVEsQ0FBQyxpQkFBaUIsSUFBSSxFQUFFO1FBQ25ELGNBQWMsRUFBRSxRQUFRLENBQUMsY0FBYyxJQUFJLEVBQUU7UUFDN0MsY0FBYyxFQUFFLElBQUksWUFBWSxFQUFRO0tBQ3pDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZUNyZWF0ZSwgY3JlYXRlTm9kZUluc3RhbmNlfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvY3JlYXRlLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuXG5leHBvcnQgdHlwZSBBamZGaWVsZEluc3RhbmNlQ3JlYXRlID0gQWpmTm9kZUluc3RhbmNlQ3JlYXRlICYgUGFydGlhbDxBamZGaWVsZEluc3RhbmNlPjtcblxuLyoqXG4gKiBDcmVhdGUgYSBmaWVsZCBpbnN0YW5jZSBhbmQgaW5pdCB0aGUgdmFsdWUgb2YgdGhlIGZpZWxkIGJ5IGNhc2NhZGUgY29uZGl0aW9ucy5cbiAqXG4gKiBGaXJzdCBjaGVjayBpZiB0aGUgdmFsdWUgaXMgaW4gdGhlIGNvbnRleHQgYnkgbm9kZSBuYW1lLlxuICogU2Vjb25kIGNoZWNrIGlmIHRoZSB2YWx1ZSBpcyBpbiB0aGUgY29udGV4dCBieSBjb21wbGV0ZSBuYW1lLlxuICogVGhpcmQgY2hlY2sgaWYgdGhlIGZpZWxkIGhhcyBhIGRlZmF1bHQgdmFsdWUuXG4gKiBFbHNlIHZhbHVlIGlzIG51bGwuXG4gKlxuICogSWYgaW5zdGFuY2UgdmFsaWRhdGlvblJlc3VsdHNpcyBpcyBub3QgZGVmaW5lZCBhc3NpZ24gZW1wdHkgYXJyYXkuXG4gKiBJZiBpbnN0YW5jZSB3YXJuaW5nUmVzdWx0cyBpcyBub3QgZGVmaW5lZCBhc3NpZ24gZW1wdHkgYXJyYXkuXG4gKiBJbml0IHZhbGlkIHdpdGggZmFsc2UuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVGaWVsZEluc3RhbmNlKFxuICBpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZUNyZWF0ZSxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgY29udGFpbmVyTm9kZT86IEFqZk5vZGUgfCBudWxsLFxuKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gIGNvbnN0IG5vZGVJbnN0YW5jZSA9IGNyZWF0ZU5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gIGxldCB2YWx1ZTogYW55ID0gbnVsbDtcbiAgaWYgKG5vZGVJbnN0YW5jZS5ub2RlICE9IG51bGwgJiYgY29udGV4dCAhPSBudWxsKSB7XG4gICAgY29uc3QgY29tcGxldGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSk7XG4gICAgaWYgKGNvbnRleHRbbm9kZUluc3RhbmNlLm5vZGUubmFtZV0gIT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSBjb250ZXh0W25vZGVJbnN0YW5jZS5ub2RlLm5hbWVdO1xuICAgIH0gZWxzZSBpZiAoY29udGV4dFtjb21wbGV0ZU5hbWVdICE9IG51bGwpIHtcbiAgICAgIHZhbHVlID0gY29udGV4dFtjb21wbGV0ZU5hbWVdO1xuICAgIH0gZWxzZSBpZiAoaW5zdGFuY2Uubm9kZS5kZWZhdWx0VmFsdWUgIT0gbnVsbCkge1xuICAgICAgaWYgKGluc3RhbmNlLm5vZGUuZGVmYXVsdFZhbHVlLmZvcm11bGEgIT0gbnVsbCkge1xuICAgICAgICBsZXQgdmlzaWJpbGl0eTogYm9vbGVhbiA9IG5vZGVJbnN0YW5jZS52aXNpYmxlID8gbm9kZUluc3RhbmNlLnZpc2libGUgOiBmYWxzZTtcbiAgICAgICAgaWYgKHZpc2liaWxpdHkgJiYgY29udGFpbmVyTm9kZSAmJiBjb250YWluZXJOb2RlLnZpc2liaWxpdHkpIHtcbiAgICAgICAgICB2aXNpYmlsaXR5ID0gZXZhbHVhdGVFeHByZXNzaW9uKGNvbnRhaW5lck5vZGUudmlzaWJpbGl0eS5jb25kaXRpb24sIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2aXNpYmlsaXR5KSB7XG4gICAgICAgICAgY29udGV4dFtjb21wbGV0ZU5hbWVdID0gZXZhbHVhdGVFeHByZXNzaW9uKGluc3RhbmNlLm5vZGUuZGVmYXVsdFZhbHVlLmZvcm11bGEsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZXh0W2NvbXBsZXRlTmFtZV0gPSBpbnN0YW5jZS5ub2RlLmRlZmF1bHRWYWx1ZTtcbiAgICAgIH1cbiAgICAgIHZhbHVlID0gY29udGV4dFtjb21wbGV0ZU5hbWVdO1xuICAgIH1cbiAgfVxuICByZXR1cm4ge1xuICAgIC4uLm5vZGVJbnN0YW5jZSxcbiAgICBub2RlOiBpbnN0YW5jZS5ub2RlLFxuICAgIHZhbHVlLFxuICAgIHZhbGlkOiBmYWxzZSxcbiAgICB2YWxpZGF0aW9uUmVzdWx0czogaW5zdGFuY2UudmFsaWRhdGlvblJlc3VsdHMgfHwgW10sXG4gICAgd2FybmluZ1Jlc3VsdHM6IGluc3RhbmNlLndhcm5pbmdSZXN1bHRzIHx8IFtdLFxuICAgIHdhcm5pbmdUcmlnZ2VyOiBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCksXG4gIH07XG59XG4iXX0=