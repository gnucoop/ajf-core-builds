/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/interface/fields/field-with-choices.ts
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
/**
 * @record
 * @template T
 */
export function AjfFieldWithChoices() { }
if (false) {
    /** @type {?} */
    AjfFieldWithChoices.prototype.choices;
    /** @type {?} */
    AjfFieldWithChoices.prototype.choicesOrigin;
    /** @type {?|undefined} */
    AjfFieldWithChoices.prototype.choicesFilter;
    /** @type {?} */
    AjfFieldWithChoices.prototype.forceExpanded;
    /** @type {?} */
    AjfFieldWithChoices.prototype.forceNarrow;
    /** @type {?|undefined} */
    AjfFieldWithChoices.prototype.triggerConditions;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtd2l0aC1jaG9pY2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC13aXRoLWNob2ljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBNEJBLHlDQU9DOzs7SUFOQyxzQ0FBd0I7O0lBQ3hCLDRDQUFtQzs7SUFDbkMsNENBQTJCOztJQUMzQiw0Q0FBdUI7O0lBQ3ZCLDBDQUFxQjs7SUFDckIsZ0RBQW1DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgQWpmRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmQ2hvaWNlfSBmcm9tICcuLi9jaG9pY2VzL2Nob2ljZSc7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW59IGZyb20gJy4uL2Nob2ljZXMvY2hvaWNlcy1vcmlnaW4nO1xuaW1wb3J0IHtBamZGaWVsZH0gZnJvbSAnLi9maWVsZCc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRmllbGRXaXRoQ2hvaWNlczxUPiBleHRlbmRzIEFqZkZpZWxkIHtcbiAgY2hvaWNlczogQWpmQ2hvaWNlPFQ+W107XG4gIGNob2ljZXNPcmlnaW46IEFqZkNob2ljZXNPcmlnaW48VD47XG4gIGNob2ljZXNGaWx0ZXI/OiBBamZGb3JtdWxhO1xuICBmb3JjZUV4cGFuZGVkOiBib29sZWFuO1xuICBmb3JjZU5hcnJvdzogYm9vbGVhbjtcbiAgdHJpZ2dlckNvbmRpdGlvbnM/OiBBamZDb25kaXRpb25bXTtcbn1cbiJdfQ==