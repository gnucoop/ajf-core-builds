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
import { __assign } from "tslib";
import { createSlideInstance } from './create-slide-instance';
export function createRepeatingSlideInstance(instance) {
    var slideInstance = createSlideInstance(instance);
    return __assign(__assign({}, slideInstance), { node: instance.node, slideNodes: [], formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL3NsaWRlcy1pbnN0YW5jZXMvY3JlYXRlLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBR0gsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBS3BGLE1BQU0sVUFBVSw0QkFBNEIsQ0FBQyxRQUF5QztJQUVwRixJQUFNLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwRCw2QkFDSyxhQUFhLEtBQ2hCLElBQUksRUFBRSxRQUFRLENBQUMsSUFBSSxFQUNuQixVQUFVLEVBQUUsRUFBRSxFQUNkLFdBQVcsRUFBRSxRQUFRLENBQUMsV0FBVyxFQUNqQyxJQUFJLEVBQUUsQ0FBQyxFQUNQLEtBQUssRUFBRSxFQUFFLEVBQ1QsU0FBUyxFQUFFLEVBQUUsSUFDYjtBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlQ3JlYXRlLCBjcmVhdGVTbGlkZUluc3RhbmNlfSBmcm9tICcuL2NyZWF0ZS1zbGlkZS1pbnN0YW5jZSc7XG5cbmV4cG9ydCB0eXBlIEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2VDcmVhdGUgPSBPbWl0PEFqZlNsaWRlSW5zdGFuY2VDcmVhdGUsICdub2RlJz4mXG4gICAgUGljazxBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLCAnbm9kZSc+JlBhcnRpYWw8QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZT47XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXBlYXRpbmdTbGlkZUluc3RhbmNlKGluc3RhbmNlOiBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlQ3JlYXRlKTpcbiAgICBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlIHtcbiAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9IGNyZWF0ZVNsaWRlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICByZXR1cm4ge1xuICAgIC4uLnNsaWRlSW5zdGFuY2UsXG4gICAgbm9kZTogaW5zdGFuY2Uubm9kZSxcbiAgICBzbGlkZU5vZGVzOiBbXSxcbiAgICBmb3JtdWxhUmVwczogaW5zdGFuY2UuZm9ybXVsYVJlcHMsXG4gICAgcmVwczogMCxcbiAgICBub2RlczogW10sXG4gICAgZmxhdE5vZGVzOiBbXSxcbiAgfTtcbn1cbiJdfQ==