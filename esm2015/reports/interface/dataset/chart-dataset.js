/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/dataset/chart-dataset.ts
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
 */
export function AjfChartDataset() { }
if (false) {
    /** @type {?} */
    AjfChartDataset.prototype.formula;
    /** @type {?|undefined} */
    AjfChartDataset.prototype.chartType;
    /** @type {?|undefined} */
    AjfChartDataset.prototype.options;
    /** @type {?|undefined} */
    AjfChartDataset.prototype.datalabels;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtZGF0YXNldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvaW50ZXJmYWNlL2RhdGFzZXQvY2hhcnQtZGF0YXNldC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTJCQSxxQ0FLQzs7O0lBSkMsa0NBQXNCOztJQUN0QixvQ0FBeUI7O0lBQ3pCLGtDQUFpQzs7SUFDakMscUNBQWlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtBamZDaGFydFR5cGV9IGZyb20gJy4uL2NoYXJ0cy9jaGFydC10eXBlJztcbmltcG9ydCB7QWpmQ2hhcnREYXRhc2V0T3B0aW9uc30gZnJvbSAnLi9jaGFydC1kYXRhc2V0LW9wdGlvbnMnO1xuaW1wb3J0IHtBamZEYXRhc2V0fSBmcm9tICcuL2RhdGFzZXQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkNoYXJ0RGF0YXNldCBleHRlbmRzIEFqZkRhdGFzZXQge1xuICBmb3JtdWxhOiBBamZGb3JtdWxhW107XG4gIGNoYXJ0VHlwZT86IEFqZkNoYXJ0VHlwZTtcbiAgb3B0aW9ucz86IEFqZkNoYXJ0RGF0YXNldE9wdGlvbnM7XG4gIGRhdGFsYWJlbHM/OiBhbnk7XG59XG4iXX0=