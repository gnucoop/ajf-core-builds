/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/slides-instances/create-slide-instance.ts
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
import { createNodeInstance } from '../nodes-instances/create-node-instance';
/**
 * @param {?} instance
 * @return {?}
 */
export function createSlideInstance(instance) {
    /** @type {?} */
    const nodeInstance = createNodeInstance(instance);
    return Object.assign(Object.assign({}, nodeInstance), { node: instance.node, nodes: [], slideNodes: [], flatNodes: [], valid: false, position: 0 });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXNsaWRlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvc2xpZGVzLWluc3RhbmNlcy9jcmVhdGUtc2xpZGUtaW5zdGFuY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0seUNBQXlDLENBQUM7Ozs7O0FBSzNFLE1BQU0sVUFBVSxtQkFBbUIsQ0FBQyxRQUFnQzs7VUFDNUQsWUFBWSxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQztJQUNqRCx1Q0FDSyxZQUFZLEtBQ2YsSUFBSSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQ25CLEtBQUssRUFBRSxFQUFFLEVBQ1QsVUFBVSxFQUFFLEVBQUUsRUFDZCxTQUFTLEVBQUUsRUFBRSxFQUNiLEtBQUssRUFBRSxLQUFLLEVBQ1osUUFBUSxFQUFFLENBQUMsSUFDWDtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZU5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL2NyZWF0ZS1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmQmFzZVNsaWRlSW5zdGFuY2VDcmVhdGV9IGZyb20gJy4vYmFzZSc7XG5cbmV4cG9ydCB0eXBlIEFqZlNsaWRlSW5zdGFuY2VDcmVhdGUgPSBBamZCYXNlU2xpZGVJbnN0YW5jZUNyZWF0ZSZQYXJ0aWFsPEFqZlNsaWRlSW5zdGFuY2U+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlU2xpZGVJbnN0YW5jZShpbnN0YW5jZTogQWpmU2xpZGVJbnN0YW5jZUNyZWF0ZSk6IEFqZlNsaWRlSW5zdGFuY2Uge1xuICBjb25zdCBub2RlSW5zdGFuY2UgPSBjcmVhdGVOb2RlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICByZXR1cm4ge1xuICAgIC4uLm5vZGVJbnN0YW5jZSxcbiAgICBub2RlOiBpbnN0YW5jZS5ub2RlLFxuICAgIG5vZGVzOiBbXSxcbiAgICBzbGlkZU5vZGVzOiBbXSxcbiAgICBmbGF0Tm9kZXM6IFtdLFxuICAgIHZhbGlkOiBmYWxzZSxcbiAgICBwb3NpdGlvbjogMCxcbiAgfTtcbn1cbiJdfQ==