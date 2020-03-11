/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/create-field-instance.ts
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
import { EventEmitter } from '@angular/core';
import { createNodeInstance } from '../nodes-instances/create-node-instance';
import { nodeInstanceCompleteName } from '../nodes-instances/node-instance-complete-name';
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
export function createFieldInstance(instance, context) {
    /** @type {?} */
    const nodeInstance = createNodeInstance(instance);
    /** @type {?} */
    let value = null;
    if (nodeInstance.node != null && context != null) {
        /** @type {?} */
        const completeName = nodeInstanceCompleteName(nodeInstance);
        if (context[nodeInstance.node.name] != null) {
            value = context[nodeInstance.node.name];
        }
        else if (context[completeName] != null) {
            value = context[completeName];
        }
    }
    return Object.assign(Object.assign({}, nodeInstance), { node: instance.node, value, valid: false, defaultValue: instance.defaultValue != null ? instance.defaultValue : null, validationResults: instance.validationResults || [], warningResults: instance.warningResults || [], warningTrigger: new EventEmitter() });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQXdCLGtCQUFrQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDbEcsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7Ozs7OztBQUl4RixNQUFNLFVBQVUsbUJBQW1CLENBQy9CLFFBQWdDLEVBQUUsT0FBbUI7O1VBQ2pELFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7O1FBQzdDLEtBQUssR0FBUSxJQUFJO0lBQ3JCLElBQUksWUFBWSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTs7Y0FDMUMsWUFBWSxHQUFHLHdCQUF3QixDQUFDLFlBQVksQ0FBQztRQUMzRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUMzQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekM7YUFBTSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDeEMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMvQjtLQUNGO0lBQ0QsdUNBQ0ssWUFBWSxLQUNmLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUNuQixLQUFLLEVBQ0wsS0FBSyxFQUFFLEtBQUssRUFDWixZQUFZLEVBQUUsUUFBUSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDMUUsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsRUFDbkQsY0FBYyxFQUFFLFFBQVEsQ0FBQyxjQUFjLElBQUksRUFBRSxFQUM3QyxjQUFjLEVBQUUsSUFBSSxZQUFZLEVBQVEsSUFDeEM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXJ9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlQ3JlYXRlLCBjcmVhdGVOb2RlSW5zdGFuY2V9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9jcmVhdGUtbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5cbmV4cG9ydCB0eXBlIEFqZkZpZWxkSW5zdGFuY2VDcmVhdGUgPSBBamZOb2RlSW5zdGFuY2VDcmVhdGUmUGFydGlhbDxBamZGaWVsZEluc3RhbmNlPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUZpZWxkSW5zdGFuY2UoXG4gICAgaW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2VDcmVhdGUsIGNvbnRleHQ6IEFqZkNvbnRleHQpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgY29uc3Qgbm9kZUluc3RhbmNlID0gY3JlYXRlTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgbGV0IHZhbHVlOiBhbnkgPSBudWxsO1xuICBpZiAobm9kZUluc3RhbmNlLm5vZGUgIT0gbnVsbCAmJiBjb250ZXh0ICE9IG51bGwpIHtcbiAgICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgICBpZiAoY29udGV4dFtub2RlSW5zdGFuY2Uubm9kZS5uYW1lXSAhPSBudWxsKSB7XG4gICAgICB2YWx1ZSA9IGNvbnRleHRbbm9kZUluc3RhbmNlLm5vZGUubmFtZV07XG4gICAgfSBlbHNlIGlmIChjb250ZXh0W2NvbXBsZXRlTmFtZV0gIT0gbnVsbCkge1xuICAgICAgdmFsdWUgPSBjb250ZXh0W2NvbXBsZXRlTmFtZV07XG4gICAgfVxuICB9XG4gIHJldHVybiB7XG4gICAgLi4ubm9kZUluc3RhbmNlLFxuICAgIG5vZGU6IGluc3RhbmNlLm5vZGUsXG4gICAgdmFsdWUsXG4gICAgdmFsaWQ6IGZhbHNlLFxuICAgIGRlZmF1bHRWYWx1ZTogaW5zdGFuY2UuZGVmYXVsdFZhbHVlICE9IG51bGwgPyBpbnN0YW5jZS5kZWZhdWx0VmFsdWUgOiBudWxsLFxuICAgIHZhbGlkYXRpb25SZXN1bHRzOiBpbnN0YW5jZS52YWxpZGF0aW9uUmVzdWx0cyB8fCBbXSxcbiAgICB3YXJuaW5nUmVzdWx0czogaW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgfHwgW10sXG4gICAgd2FybmluZ1RyaWdnZXI6IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKSxcbiAgfTtcbn1cbiJdfQ==