/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/create-field-instance.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLWZpZWxkLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUczQyxPQUFPLEVBQXdCLGtCQUFrQixFQUFDLE1BQU0seUNBQXlDLENBQUM7QUFDbEcsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sZ0RBQWdELENBQUM7Ozs7OztBQUl4RixNQUFNLFVBQVUsbUJBQW1CLENBQy9CLFFBQWdDLEVBQUUsT0FBbUI7O1VBQ2pELFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUM7O1FBQzdDLEtBQUssR0FBUSxJQUFJO0lBQ3JCLElBQUksWUFBWSxDQUFDLElBQUksSUFBSSxJQUFJLElBQUksT0FBTyxJQUFJLElBQUksRUFBRTs7Y0FDMUMsWUFBWSxHQUFHLHdCQUF3QixDQUFDLFlBQVksQ0FBQztRQUMzRCxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtZQUMzQyxLQUFLLEdBQUcsT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDekM7YUFBTSxJQUFJLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxJQUFJLEVBQUU7WUFDeEMsS0FBSyxHQUFHLE9BQU8sQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUMvQjtLQUNGO0lBQ0QsdUNBQ0ssWUFBWSxLQUNmLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUNuQixLQUFLLEVBQ0wsS0FBSyxFQUFFLEtBQUssRUFDWixZQUFZLEVBQUUsUUFBUSxDQUFDLFlBQVksSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLElBQUksRUFDMUUsaUJBQWlCLEVBQUUsUUFBUSxDQUFDLGlCQUFpQixJQUFJLEVBQUUsRUFDbkQsY0FBYyxFQUFFLFFBQVEsQ0FBQyxjQUFjLElBQUksRUFBRSxFQUM3QyxjQUFjLEVBQUUsSUFBSSxZQUFZLEVBQVEsSUFDeEM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2VDcmVhdGUsIGNyZWF0ZU5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL2NyZWF0ZS1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcblxuZXhwb3J0IHR5cGUgQWpmRmllbGRJbnN0YW5jZUNyZWF0ZSA9IEFqZk5vZGVJbnN0YW5jZUNyZWF0ZSZQYXJ0aWFsPEFqZkZpZWxkSW5zdGFuY2U+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlRmllbGRJbnN0YW5jZShcbiAgICBpbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZUNyZWF0ZSwgY29udGV4dDogQWpmQ29udGV4dCk6IEFqZkZpZWxkSW5zdGFuY2Uge1xuICBjb25zdCBub2RlSW5zdGFuY2UgPSBjcmVhdGVOb2RlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICBsZXQgdmFsdWU6IGFueSA9IG51bGw7XG4gIGlmIChub2RlSW5zdGFuY2Uubm9kZSAhPSBudWxsICYmIGNvbnRleHQgIT0gbnVsbCkge1xuICAgIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICAgIGlmIChjb250ZXh0W25vZGVJbnN0YW5jZS5ub2RlLm5hbWVdICE9IG51bGwpIHtcbiAgICAgIHZhbHVlID0gY29udGV4dFtub2RlSW5zdGFuY2Uubm9kZS5uYW1lXTtcbiAgICB9IGVsc2UgaWYgKGNvbnRleHRbY29tcGxldGVOYW1lXSAhPSBudWxsKSB7XG4gICAgICB2YWx1ZSA9IGNvbnRleHRbY29tcGxldGVOYW1lXTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHtcbiAgICAuLi5ub2RlSW5zdGFuY2UsXG4gICAgbm9kZTogaW5zdGFuY2Uubm9kZSxcbiAgICB2YWx1ZSxcbiAgICB2YWxpZDogZmFsc2UsXG4gICAgZGVmYXVsdFZhbHVlOiBpbnN0YW5jZS5kZWZhdWx0VmFsdWUgIT0gbnVsbCA/IGluc3RhbmNlLmRlZmF1bHRWYWx1ZSA6IG51bGwsXG4gICAgdmFsaWRhdGlvblJlc3VsdHM6IGluc3RhbmNlLnZhbGlkYXRpb25SZXN1bHRzIHx8IFtdLFxuICAgIHdhcm5pbmdSZXN1bHRzOiBpbnN0YW5jZS53YXJuaW5nUmVzdWx0cyB8fCBbXSxcbiAgICB3YXJuaW5nVHJpZ2dlcjogbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpLFxuICB9O1xufVxuIl19