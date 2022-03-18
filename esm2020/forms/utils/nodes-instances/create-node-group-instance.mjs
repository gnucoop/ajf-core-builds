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
import { createNodeInstance } from './create-node-instance';
/**
 * It creates an AjfNodeGroupInstance.
 * It extends nodeInstance with (formulaReps,reps,nodes and flatNodes).
 * Init reps with 0.
 * Init nodes and flatNodes with empty array
 */
export function createNodeGroupInstance(instance) {
    const nodeInstance = createNodeInstance(instance);
    return {
        ...nodeInstance,
        node: instance.node,
        formulaReps: instance.formulaReps,
        reps: 0,
        nodes: [],
        flatNodes: [],
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLW5vZGUtZ3JvdXAtaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvY3JlYXRlLW5vZGUtZ3JvdXAtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUF3QixrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBR2pGOzs7OztHQUtHO0FBQ0gsTUFBTSxVQUFVLHVCQUF1QixDQUNyQyxRQUFvQztJQUVwQyxNQUFNLFlBQVksR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNsRCxPQUFPO1FBQ0wsR0FBRyxZQUFZO1FBQ2YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJO1FBQ25CLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVztRQUNqQyxJQUFJLEVBQUUsQ0FBQztRQUNQLEtBQUssRUFBRSxFQUFFO1FBQ1QsU0FBUyxFQUFFLEVBQUU7S0FDZCxDQUFDO0FBQ0osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlQ3JlYXRlLCBjcmVhdGVOb2RlSW5zdGFuY2V9IGZyb20gJy4vY3JlYXRlLW5vZGUtaW5zdGFuY2UnO1xuXG5leHBvcnQgdHlwZSBBamZOb2RlR3JvdXBJbnN0YW5jZUNyZWF0ZSA9IEFqZk5vZGVJbnN0YW5jZUNyZWF0ZSAmIFBhcnRpYWw8QWpmTm9kZUdyb3VwSW5zdGFuY2U+O1xuLyoqXG4gKiBJdCBjcmVhdGVzIGFuIEFqZk5vZGVHcm91cEluc3RhbmNlLlxuICogSXQgZXh0ZW5kcyBub2RlSW5zdGFuY2Ugd2l0aCAoZm9ybXVsYVJlcHMscmVwcyxub2RlcyBhbmQgZmxhdE5vZGVzKS5cbiAqIEluaXQgcmVwcyB3aXRoIDAuXG4gKiBJbml0IG5vZGVzIGFuZCBmbGF0Tm9kZXMgd2l0aCBlbXB0eSBhcnJheVxuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlTm9kZUdyb3VwSW5zdGFuY2UoXG4gIGluc3RhbmNlOiBBamZOb2RlR3JvdXBJbnN0YW5jZUNyZWF0ZSxcbik6IEFqZk5vZGVHcm91cEluc3RhbmNlIHtcbiAgY29uc3Qgbm9kZUluc3RhbmNlID0gY3JlYXRlTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgcmV0dXJuIHtcbiAgICAuLi5ub2RlSW5zdGFuY2UsXG4gICAgbm9kZTogaW5zdGFuY2Uubm9kZSxcbiAgICBmb3JtdWxhUmVwczogaW5zdGFuY2UuZm9ybXVsYVJlcHMsXG4gICAgcmVwczogMCxcbiAgICBub2RlczogW10sXG4gICAgZmxhdE5vZGVzOiBbXSxcbiAgfTtcbn1cbiJdfQ==