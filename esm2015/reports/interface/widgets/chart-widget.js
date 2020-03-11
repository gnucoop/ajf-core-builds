/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/interface/widgets/chart-widget.ts
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
export function AjfChartWidget() { }
if (false) {
    /** @type {?} */
    AjfChartWidget.prototype.chartType;
    /** @type {?|undefined} */
    AjfChartWidget.prototype.type;
    /** @type {?} */
    AjfChartWidget.prototype.labels;
    /** @type {?} */
    AjfChartWidget.prototype.dataset;
    /** @type {?} */
    AjfChartWidget.prototype.options;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnQtd2lkZ2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9pbnRlcmZhY2Uvd2lkZ2V0cy9jaGFydC13aWRnZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QkEsb0NBTUM7OztJQUxDLG1DQUF3Qjs7SUFDeEIsOEJBQW9COztJQUNwQixnQ0FBZ0M7O0lBQ2hDLGlDQUEyQjs7SUFDM0IsaUNBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtDaGFydE9wdGlvbnN9IGZyb20gJ2NoYXJ0LmpzJztcblxuaW1wb3J0IHtBamZDaGFydFR5cGV9IGZyb20gJy4uL2NoYXJ0cy9jaGFydC10eXBlJztcbmltcG9ydCB7QWpmQ2hhcnREYXRhc2V0fSBmcm9tICcuLi9kYXRhc2V0L2NoYXJ0LWRhdGFzZXQnO1xuXG5pbXBvcnQge0FqZkRhdGFXaWRnZXR9IGZyb20gJy4vZGF0YS13aWRnZXQnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkNoYXJ0V2lkZ2V0IGV4dGVuZHMgQWpmRGF0YVdpZGdldCB7XG4gIGNoYXJ0VHlwZTogQWpmQ2hhcnRUeXBlO1xuICB0eXBlPzogQWpmQ2hhcnRUeXBlO1xuICBsYWJlbHM6IEFqZkZvcm11bGF8QWpmRm9ybXVsYVtdO1xuICBkYXRhc2V0OiBBamZDaGFydERhdGFzZXRbXTtcbiAgb3B0aW9uczogQ2hhcnRPcHRpb25zO1xufVxuIl19