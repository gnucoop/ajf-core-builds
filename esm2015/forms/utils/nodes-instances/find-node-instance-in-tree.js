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
import { isContainerNodeInstance } from './is-container-node-instance';
export function findNodeInstanceInTree(nodes, node) {
    const index = nodes.indexOf(node);
    if (index > -1) {
        return { container: nodes, index: index };
    }
    const groups = nodes.filter(n => isContainerNodeInstance(n));
    let i = 0;
    const len = groups.length;
    while (i < len) {
        const res = findNodeInstanceInTree(groups[i].node.nodes, node);
        if (res.index > -1) {
            return res;
        }
        i++;
    }
    return { container: [], index: -1 };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmluZC1ub2RlLWluc3RhbmNlLWluLXRyZWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmluZC1ub2RlLWluc3RhbmNlLWluLXRyZWUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFFckUsTUFBTSxVQUFVLHNCQUFzQixDQUFDLEtBQXdCLEVBQUUsSUFBcUI7SUFFcEYsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUNsQyxJQUFJLEtBQUssR0FBRyxDQUFDLENBQUMsRUFBRTtRQUNkLE9BQU8sRUFBQyxTQUFTLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUMsQ0FBQztLQUN6QztJQUNELE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQzdELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNWLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7SUFDMUIsT0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFO1FBQ2QsTUFBTSxHQUFHLEdBQUcsc0JBQXNCLENBQU8sTUFBTSxDQUFDLENBQUMsQ0FBRSxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDdEUsSUFBSSxHQUFHLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ2xCLE9BQU8sR0FBRyxDQUFDO1NBQ1o7UUFDRCxDQUFDLEVBQUUsQ0FBQztLQUNMO0lBQ0QsT0FBTyxFQUFDLFNBQVMsRUFBRSxFQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxFQUFDLENBQUM7QUFDcEMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZUluc3RhbmNlfSBmcm9tICcuL2lzLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGZpbmROb2RlSW5zdGFuY2VJblRyZWUobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UpOlxuICAgIHtjb250YWluZXI6IEFqZk5vZGVJbnN0YW5jZVtdLCBpbmRleDogbnVtYmVyfSB7XG4gIGNvbnN0IGluZGV4ID0gbm9kZXMuaW5kZXhPZihub2RlKTtcbiAgaWYgKGluZGV4ID4gLTEpIHtcbiAgICByZXR1cm4ge2NvbnRhaW5lcjogbm9kZXMsIGluZGV4OiBpbmRleH07XG4gIH1cbiAgY29uc3QgZ3JvdXBzID0gbm9kZXMuZmlsdGVyKG4gPT4gaXNDb250YWluZXJOb2RlSW5zdGFuY2UobikpO1xuICBsZXQgaSA9IDA7XG4gIGNvbnN0IGxlbiA9IGdyb3Vwcy5sZW5ndGg7XG4gIHdoaWxlIChpIDwgbGVuKSB7XG4gICAgY29uc3QgcmVzID0gZmluZE5vZGVJbnN0YW5jZUluVHJlZSgoPGFueT5ncm91cHNbaV0pLm5vZGUubm9kZXMsIG5vZGUpO1xuICAgIGlmIChyZXMuaW5kZXggPiAtMSkge1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG4gICAgaSsrO1xuICB9XG4gIHJldHVybiB7Y29udGFpbmVyOiBbXSwgaW5kZXg6IC0xfTtcbn1cbiJdfQ==