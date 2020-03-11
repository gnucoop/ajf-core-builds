/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/widgets/create-widget.ts
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
import { alwaysCondition } from '@ajf/core/models';
/**
 * @param {?} widget
 * @return {?}
 */
export function createWidget(widget) {
    return Object.assign(Object.assign({}, widget), { styles: widget.styles || {}, visibility: widget.visibility || alwaysCondition() });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXdpZGdldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvdXRpbHMvd2lkZ2V0cy9jcmVhdGUtd2lkZ2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7QUFLakQsTUFBTSxVQUFVLFlBQVksQ0FBQyxNQUF1QjtJQUNsRCx1Q0FDSyxNQUFNLEtBQ1QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNLElBQUksRUFBRSxFQUMzQixVQUFVLEVBQUUsTUFBTSxDQUFDLFVBQVUsSUFBSSxlQUFlLEVBQUUsSUFDbEQ7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2Fsd2F5c0NvbmRpdGlvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcblxuZXhwb3J0IHR5cGUgQWpmV2lkZ2V0Q3JlYXRlID0gUGljazxBamZXaWRnZXQsICd3aWRnZXRUeXBlJz4mUGFydGlhbDxBamZXaWRnZXQ+O1xuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlV2lkZ2V0KHdpZGdldDogQWpmV2lkZ2V0Q3JlYXRlKTogQWpmV2lkZ2V0IHtcbiAgcmV0dXJuIHtcbiAgICAuLi53aWRnZXQsXG4gICAgc3R5bGVzOiB3aWRnZXQuc3R5bGVzIHx8IHt9LFxuICAgIHZpc2liaWxpdHk6IHdpZGdldC52aXNpYmlsaXR5IHx8IGFsd2F5c0NvbmRpdGlvbigpLFxuICB9O1xufVxuIl19