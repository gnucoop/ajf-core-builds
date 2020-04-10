/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/choices/init-choices-origin.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1jaG9pY2VzLW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUE4QkEsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE1BQTZCO0lBQzdELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxPQUFPLEVBQUU7UUFDM0IsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7S0FDMUI7SUFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFOztjQUN4QixFQUFFLEdBQUcsbUJBQUEsTUFBTSxFQUFpQztRQUNsRCxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMxQjtJQUNELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7O2NBQ3ZCLEVBQUUsR0FBRyxtQkFBQSxNQUFNLEVBQWdDO1FBQ2pELE9BQU8sRUFBRSxDQUFDLFNBQVMsQ0FBQyxJQUFJOzs7O1FBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsT0FBTyxHQUFHLE9BQU8sRUFBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ2xFO0lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTs7Y0FDMUIsSUFBSSxHQUFHLG1CQUFBLE1BQU0sRUFBbUM7UUFDdEQsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNsQixPQUFPLElBQUksT0FBTzs7OztZQUFPLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QixJQUFJLENBQUMsU0FBUyxDQUFDLFNBQVM7Ozs7Z0JBQ3BCLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDOzs7Z0JBQ3pCLEdBQUcsRUFBRSxHQUFFLENBQUM7OztnQkFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFDZCxDQUFDO1lBQ0osQ0FBQyxFQUFDLENBQUM7U0FDSjtLQUNGO0lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFOztjQUMvQixHQUFHLEdBQUcsbUJBQUEsTUFBTSxFQUF3QztRQUMxRCxJQUFJLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxPQUFPOzs7O1lBQU8sR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUzs7OztnQkFBQyxPQUFPLENBQUMsRUFBRTtvQkFDaEMsR0FBRyxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUM7b0JBQ3RCLEdBQUcsRUFBRSxDQUFDO2dCQUNSLENBQUMsRUFBQyxDQUFDO1lBQ0wsQ0FBQyxFQUFDLENBQUM7U0FDSjtLQUNGO0lBQ0QsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7QUFDM0IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDaG9pY2VzRnVuY3Rpb25PcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtZnVuY3Rpb24tb3JpZ2luJztcbmltcG9ydCB7XG4gIEFqZkNob2ljZXNPYnNlcnZhYmxlQXJyYXlPcmlnaW5cbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1vYnNlcnZhYmxlLWFycmF5LW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPYnNlcnZhYmxlT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9ic2VydmFibGUtb3JpZ2luJztcbmltcG9ydCB7QWpmQ2hvaWNlc09yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzUHJvbWlzZU9yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1wcm9taXNlLW9yaWdpbic7XG5cbmV4cG9ydCBmdW5jdGlvbiBpbml0Q2hvaWNlc09yaWdpbihvcmlnaW46IEFqZkNob2ljZXNPcmlnaW48YW55Pik6IFByb21pc2U8dm9pZD4ge1xuICBpZiAob3JpZ2luLnR5cGUgPT09ICdmaXhlZCcpIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgaWYgKG9yaWdpbi50eXBlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgY29uc3QgZm8gPSBvcmlnaW4gYXMgQWpmQ2hvaWNlc0Z1bmN0aW9uT3JpZ2luPGFueT47XG4gICAgZm8uY2hvaWNlcyA9IGZvLmdlbmVyYXRvcigpO1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBpZiAob3JpZ2luLnR5cGUgPT09ICdwcm9taXNlJykge1xuICAgIGNvbnN0IHBvID0gb3JpZ2luIGFzIEFqZkNob2ljZXNQcm9taXNlT3JpZ2luPGFueT47XG4gICAgcmV0dXJuIHBvLmdlbmVyYXRvci50aGVuKGNob2ljZXMgPT4gcG8uY2hvaWNlcyA9IGNob2ljZXMpLnRoZW4oKTtcbiAgfVxuICBpZiAob3JpZ2luLnR5cGUgPT09ICdvYnNlcnZhYmxlJykge1xuICAgIGNvbnN0IG9ic28gPSBvcmlnaW4gYXMgQWpmQ2hvaWNlc09ic2VydmFibGVPcmlnaW48YW55PjtcbiAgICBpZiAob2Jzby5nZW5lcmF0b3IgIT0gbnVsbCkge1xuICAgICAgb2Jzby5jaG9pY2VzID0gW107XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzID0+IHtcbiAgICAgICAgb2Jzby5nZW5lcmF0b3Iuc3Vic2NyaWJlKFxuICAgICAgICAgICAgYyA9PiBvYnNvLmNob2ljZXMucHVzaChjKSxcbiAgICAgICAgICAgICgpID0+IHt9LFxuICAgICAgICAgICAgKCkgPT4gcmVzKCksXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgaWYgKG9yaWdpbi50eXBlID09PSAnb2JzZXJ2YWJsZUFycmF5Jykge1xuICAgIGNvbnN0IGFvbyA9IG9yaWdpbiBhcyBBamZDaG9pY2VzT2JzZXJ2YWJsZUFycmF5T3JpZ2luPGFueT47XG4gICAgaWYgKGFvby5nZW5lcmF0b3IgIT0gbnVsbCkge1xuICAgICAgYW9vLmNob2ljZXMgPSBbXTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXMgPT4ge1xuICAgICAgICBhb28uZ2VuZXJhdG9yLnN1YnNjcmliZShjaG9pY2VzID0+IHtcbiAgICAgICAgICBhb28uY2hvaWNlcyA9IGNob2ljZXM7XG4gICAgICAgICAgcmVzKCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn1cbiJdfQ==