/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/choices/is-choices-origin.ts
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
/**
 * @param {?} co
 * @return {?}
 */
export function isChoicesOrigin(co) {
    return co != null
        && typeof co === 'object'
        && co.name != null
        && typeof co.name === 'string'
        && co.label != null
        && typeof co.label === 'string'
        && ['fixed', 'promise', 'observable', 'observableArray', 'function'].indexOf(co.type) > -1
        && co.choices instanceof Array;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtY2hvaWNlcy1vcmlnaW4uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9jaG9pY2VzL2lzLWNob2ljZXMtb3JpZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxNQUFNLFVBQVUsZUFBZSxDQUFDLEVBQU87SUFDckMsT0FBTyxFQUFFLElBQUksSUFBSTtXQUNaLE9BQU8sRUFBRSxLQUFLLFFBQVE7V0FDdEIsRUFBRSxDQUFDLElBQUksSUFBSSxJQUFJO1dBQ2YsT0FBTyxFQUFFLENBQUMsSUFBSSxLQUFLLFFBQVE7V0FDM0IsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJO1dBQ2hCLE9BQU8sRUFBRSxDQUFDLEtBQUssS0FBSyxRQUFRO1dBQzVCLENBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsaUJBQWlCLEVBQUUsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7V0FDdkYsRUFBRSxDQUFDLE9BQU8sWUFBWSxLQUFLLENBQUM7QUFDbkMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5leHBvcnQgZnVuY3Rpb24gaXNDaG9pY2VzT3JpZ2luKGNvOiBhbnkpOiBib29sZWFuIHtcbiAgcmV0dXJuIGNvICE9IG51bGxcbiAgICAmJiB0eXBlb2YgY28gPT09ICdvYmplY3QnXG4gICAgJiYgY28ubmFtZSAhPSBudWxsXG4gICAgJiYgdHlwZW9mIGNvLm5hbWUgPT09ICdzdHJpbmcnXG4gICAgJiYgY28ubGFiZWwgIT0gbnVsbFxuICAgICYmIHR5cGVvZiBjby5sYWJlbCA9PT0gJ3N0cmluZydcbiAgICAmJiBbJ2ZpeGVkJywgJ3Byb21pc2UnLCAnb2JzZXJ2YWJsZScsICdvYnNlcnZhYmxlQXJyYXknLCAnZnVuY3Rpb24nXS5pbmRleE9mKGNvLnR5cGUpID4gLTFcbiAgICAmJiBjby5jaG9pY2VzIGluc3RhbmNlb2YgQXJyYXk7XG59XG4iXX0=