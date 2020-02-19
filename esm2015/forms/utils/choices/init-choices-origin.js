/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/choices/init-choices-origin.ts
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
 * @param {?} origin
 * @return {?}
 */
export function initChoicesOrigin(origin) {
    if (origin.type === 'fixed') {
        return Promise.resolve();
    }
    if (origin.type === 'function') {
        /** @type {?} */
        const fo = (/** @type {?} */ (origin));
        fo.choices = fo.generator();
        return Promise.resolve();
    }
    if (origin.type === 'promise') {
        /** @type {?} */
        const po = (/** @type {?} */ (origin));
        return po.generator.then((/**
         * @param {?} choices
         * @return {?}
         */
        choices => po.choices = choices)).then();
    }
    if (origin.type === 'observable') {
        /** @type {?} */
        const obso = (/** @type {?} */ (origin));
        if (obso.generator != null) {
            obso.choices = [];
            return new Promise((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                obso.generator.subscribe((/**
                 * @param {?} c
                 * @return {?}
                 */
                c => obso.choices.push(c)), (/**
                 * @return {?}
                 */
                () => { }), (/**
                 * @return {?}
                 */
                () => res()));
            }));
        }
    }
    if (origin.type === 'observableArray') {
        /** @type {?} */
        const aoo = (/** @type {?} */ (origin));
        if (aoo.generator != null) {
            aoo.choices = [];
            return new Promise((/**
             * @param {?} res
             * @return {?}
             */
            res => {
                aoo.generator.subscribe((/**
                 * @param {?} choices
                 * @return {?}
                 */
                choices => {
                    aoo.choices = choices;
                    res();
                }));
            }));
        }
    }
    return Promise.resolve();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1jaG9pY2VzLW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QkEsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE1BQTZCO0lBQzdELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7UUFDM0IsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDMUI7SUFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFOztjQUN4QixFQUFFLEdBQUcsbUJBQUEsTUFBTSxFQUFpQztRQUNsRCxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMxQjtJQUNELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7O2NBQ3ZCLEVBQUUsR0FBRyxtQkFBQSxNQUFNLEVBQWdDO1FBQ2pELE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2xFO0lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTs7Y0FDMUIsSUFBSSxHQUFHLG1CQUFBLE1BQU0sRUFBbUM7UUFDdEQsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixPQUFPLElBQUksT0FBTzs7OztZQUFPLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7Ozs7Z0JBQ3RCLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7Z0JBQ3pCLEdBQUcsRUFBRSxHQUFFLENBQUM7OztnQkFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFDWixDQUFDO1lBQ0osQ0FBQyxFQUFDLENBQUM7U0FDSjtLQUNGO0lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFOztjQUMvQixHQUFHLEdBQUcsbUJBQUEsTUFBTSxFQUF3QztRQUMxRCxJQUFJLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxPQUFPOzs7O1lBQU8sR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUzs7OztnQkFDckIsT0FBTyxDQUFDLEVBQUU7b0JBQ1IsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3RCLEdBQUcsRUFBRSxDQUFDO2dCQUNSLENBQUMsRUFDRixDQUFDO1lBQ0osQ0FBQyxFQUFDLENBQUM7U0FDSjtLQUNGO0lBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNGdW5jdGlvbk9yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1mdW5jdGlvbi1vcmlnaW4nO1xuaW1wb3J0IHtcbiAgQWpmQ2hvaWNlc09ic2VydmFibGVBcnJheU9yaWdpblxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9ic2VydmFibGUtYXJyYXktb3JpZ2luJztcbmltcG9ydCB7QWpmQ2hvaWNlc09ic2VydmFibGVPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb2JzZXJ2YWJsZS1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNQcm9taXNlT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLXByb21pc2Utb3JpZ2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDaG9pY2VzT3JpZ2luKG9yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ2ZpeGVkJykge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBpZiAob3JpZ2luLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBmbyA9IG9yaWdpbiBhcyBBamZDaG9pY2VzRnVuY3Rpb25PcmlnaW48YW55PjtcbiAgICBmby5jaG9pY2VzID0gZm8uZ2VuZXJhdG9yKCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ3Byb21pc2UnKSB7XG4gICAgY29uc3QgcG8gPSBvcmlnaW4gYXMgQWpmQ2hvaWNlc1Byb21pc2VPcmlnaW48YW55PjtcbiAgICByZXR1cm4gcG8uZ2VuZXJhdG9yLnRoZW4oY2hvaWNlcyA9PiBwby5jaG9pY2VzID0gY2hvaWNlcykudGhlbigpO1xuICB9XG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ29ic2VydmFibGUnKSB7XG4gICAgY29uc3Qgb2JzbyA9IG9yaWdpbiBhcyBBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbjxhbnk+O1xuICAgIGlmIChvYnNvLmdlbmVyYXRvciAhPSBudWxsKSB7XG4gICAgICBvYnNvLmNob2ljZXMgPSBbXTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXMgPT4ge1xuICAgICAgICBvYnNvLmdlbmVyYXRvci5zdWJzY3JpYmUoXG4gICAgICAgICAgYyA9PiBvYnNvLmNob2ljZXMucHVzaChjKSxcbiAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAoKSA9PiByZXMoKSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBpZiAob3JpZ2luLnR5cGUgPT09ICdvYnNlcnZhYmxlQXJyYXknKSB7XG4gICAgY29uc3QgYW9vID0gb3JpZ2luIGFzIEFqZkNob2ljZXNPYnNlcnZhYmxlQXJyYXlPcmlnaW48YW55PjtcbiAgICBpZiAoYW9vLmdlbmVyYXRvciAhPSBudWxsKSB7XG4gICAgICBhb28uY2hvaWNlcyA9IFtdO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlcyA9PiB7XG4gICAgICAgIGFvby5nZW5lcmF0b3Iuc3Vic2NyaWJlKFxuICAgICAgICAgIGNob2ljZXMgPT4ge1xuICAgICAgICAgICAgYW9vLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn1cbiJdfQ==