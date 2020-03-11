/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/fields-instances/update-warning.ts
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
import { nodeInstanceCompleteName } from '../nodes-instances/node-instance-complete-name';
import { evaluateWarningGroup } from '../warning/evaluate-warning-group';
/**
 * @param {?} instance
 * @param {?} context
 * @return {?}
 */
export function updateWarning(instance, context) {
    /** @type {?} */
    const warning = instance.warning;
    if (warning == null) {
        return;
    }
    /** @type {?} */
    const completeName = nodeInstanceCompleteName(instance);
    if (context[completeName] != null && warning) {
        instance.warningResults = evaluateWarningGroup(warning, context);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXBkYXRlLXdhcm5pbmcuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS13YXJuaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBeUJBLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLG1DQUFtQyxDQUFDOzs7Ozs7QUFFdkUsTUFBTSxVQUFVLGFBQWEsQ0FBQyxRQUEwQixFQUFFLE9BQW1COztVQUNyRSxPQUFPLEdBQUcsUUFBUSxDQUFDLE9BQU87SUFDaEMsSUFBSSxPQUFPLElBQUksSUFBSSxFQUFFO1FBQ25CLE9BQU87S0FDUjs7VUFFSyxZQUFZLEdBQUcsd0JBQXdCLENBQUMsUUFBUSxDQUFDO0lBRXZELElBQUksT0FBTyxDQUFDLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUU7UUFDNUMsUUFBUSxDQUFDLGNBQWMsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDbEU7QUFDSCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcbmltcG9ydCB7ZXZhbHVhdGVXYXJuaW5nR3JvdXB9IGZyb20gJy4uL3dhcm5pbmcvZXZhbHVhdGUtd2FybmluZy1ncm91cCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1cGRhdGVXYXJuaW5nKGluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlLCBjb250ZXh0OiBBamZDb250ZXh0KTogdm9pZCB7XG4gIGNvbnN0IHdhcm5pbmcgPSBpbnN0YW5jZS53YXJuaW5nO1xuICBpZiAod2FybmluZyA9PSBudWxsKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgY29tcGxldGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKTtcblxuICBpZiAoY29udGV4dFtjb21wbGV0ZU5hbWVdICE9IG51bGwgJiYgd2FybmluZykge1xuICAgIGluc3RhbmNlLndhcm5pbmdSZXN1bHRzID0gZXZhbHVhdGVXYXJuaW5nR3JvdXAod2FybmluZywgY29udGV4dCk7XG4gIH1cbn1cbiJdfQ==