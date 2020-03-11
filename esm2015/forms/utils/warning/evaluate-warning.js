/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/warning/evaluate-warning.ts
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
import { evaluateExpression } from '@ajf/core/models';
/**
 * @param {?} warning
 * @param {?=} context
 * @param {?=} forceFormula
 * @return {?}
 */
export function evaluateWarning(warning, context, forceFormula) {
    return {
        result: evaluateExpression(warning.condition, context, forceFormula),
        warning: warning.warningMessage,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXZhbHVhdGUtd2FybmluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL3dhcm5pbmcvZXZhbHVhdGUtd2FybmluZy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQWEsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQzs7Ozs7OztBQUtoRSxNQUFNLFVBQVUsZUFBZSxDQUMzQixPQUFtQixFQUFFLE9BQW9CLEVBQUUsWUFBcUI7SUFDbEUsT0FBTztRQUNMLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsU0FBUyxFQUFFLE9BQU8sRUFBRSxZQUFZLENBQUM7UUFDcEUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxjQUFjO0tBQ2hDLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmV2FybmluZ30gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dhcm5pbmcvd2FybmluZyc7XG5pbXBvcnQge0FqZldhcm5pbmdSZXN1bHR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93YXJuaW5nL3dhcm5pbmctcmVzdWx0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGV2YWx1YXRlV2FybmluZyhcbiAgICB3YXJuaW5nOiBBamZXYXJuaW5nLCBjb250ZXh0PzogQWpmQ29udGV4dCwgZm9yY2VGb3JtdWxhPzogc3RyaW5nKTogQWpmV2FybmluZ1Jlc3VsdCB7XG4gIHJldHVybiB7XG4gICAgcmVzdWx0OiBldmFsdWF0ZUV4cHJlc3Npb24od2FybmluZy5jb25kaXRpb24sIGNvbnRleHQsIGZvcmNlRm9ybXVsYSksXG4gICAgd2FybmluZzogd2FybmluZy53YXJuaW5nTWVzc2FnZSxcbiAgfTtcbn1cbiJdfQ==