/**
 * @fileoverview added by tsickle
 * Generated from: src/core/utils/deep-copy.ts
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
 * @param {?} _
 * @param {?} v
 * @return {?}
 */
function functionSerializer(_, v) {
    if (typeof v === 'function') {
        return v.toString().replace(/[\r\n]+/g, ' ');
    }
    return v;
}
/**
 * @param {?} _
 * @param {?} v
 * @return {?}
 */
function functionDeserializer(_, v) {
    if (typeof v === 'string' && /^function.*?\([^\0]*?\)\s*\{.*\}$/.test(v)) {
        /** @type {?} */
        const argsMatch = v
            .replace(/\/\/.*$|\/\*[\s\S]*?\*\//mg, '')
            .match(/\(.*?\)/m);
        if (argsMatch != null && argsMatch.length > 0) {
            /** @type {?} */
            const args = argsMatch[0]
                .replace(/^\(|\)$/, '')
                .match(/[^\s(),]+/g) || [];
            /** @type {?} */
            const bodyMatch = v.match(/\{(.*)\}/);
            if (bodyMatch != null && bodyMatch.length > 1) {
                /** @type {?} */
                const body = bodyMatch[1];
                /** @type {?} */
                const fx = args.concat(body);
                return Function.apply(null, fx);
            }
        }
    }
    return v;
}
/**
 * @param {?} oldObj
 * @return {?}
 */
export function deepCopy(oldObj) {
    return JSON.parse(JSON.stringify(oldObj, functionSerializer), functionDeserializer);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcC1jb3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvdXRpbHMvZGVlcC1jb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsU0FBUyxrQkFBa0IsQ0FBQyxDQUFNLEVBQUUsQ0FBTTtJQUN4QyxJQUFJLE9BQU8sQ0FBQyxLQUFLLFVBQVUsRUFBRTtRQUMzQixPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxPQUFPLENBQUMsVUFBVSxFQUFFLEdBQUcsQ0FBQyxDQUFDO0tBQzlDO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDOzs7Ozs7QUFFRCxTQUFTLG9CQUFvQixDQUFDLENBQU0sRUFBRSxDQUFNO0lBQzFDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxJQUFJLG1DQUFtQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRTs7Y0FDbEUsU0FBUyxHQUFHLENBQUM7YUFDaEIsT0FBTyxDQUFDLDRCQUE0QixFQUFFLEVBQUUsQ0FBQzthQUN6QyxLQUFLLENBQUMsVUFBVSxDQUFDO1FBQ3BCLElBQUksU0FBUyxJQUFJLElBQUksSUFBSSxTQUFTLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTs7a0JBQ3ZDLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDO2lCQUN0QixPQUFPLENBQUMsU0FBUyxFQUFFLEVBQUUsQ0FBQztpQkFDdEIsS0FBSyxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUU7O2tCQUN0QixTQUFTLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7WUFDckMsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFOztzQkFDdkMsSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7O3NCQUNuQixFQUFFLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7Z0JBQzVCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDakM7U0FDRjtLQUNGO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxRQUFRLENBQUMsTUFBVztJQUNsQyxPQUFPLElBQUksQ0FBQyxLQUFLLENBQ2YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLEVBQUUsa0JBQWtCLENBQUMsRUFDMUMsb0JBQW9CLENBQ3JCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5mdW5jdGlvbiBmdW5jdGlvblNlcmlhbGl6ZXIoXzogYW55LCB2OiBhbnkpOiBhbnkge1xuICBpZiAodHlwZW9mIHYgPT09ICdmdW5jdGlvbicpIHtcbiAgICByZXR1cm4gdi50b1N0cmluZygpLnJlcGxhY2UoL1tcXHJcXG5dKy9nLCAnICcpO1xuICB9XG4gIHJldHVybiB2O1xufVxuXG5mdW5jdGlvbiBmdW5jdGlvbkRlc2VyaWFsaXplcihfOiBhbnksIHY6IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgL15mdW5jdGlvbi4qP1xcKFteXFwwXSo/XFwpXFxzKlxcey4qXFx9JC8udGVzdCh2KSkge1xuICAgIGNvbnN0IGFyZ3NNYXRjaCA9IHZcbiAgICAgIC5yZXBsYWNlKC9cXC9cXC8uKiR8XFwvXFwqW1xcc1xcU10qP1xcKlxcLy9tZywgJycpXG4gICAgICAubWF0Y2goL1xcKC4qP1xcKS9tKTtcbiAgICBpZiAoYXJnc01hdGNoICE9IG51bGwgJiYgYXJnc01hdGNoLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBhcmdzTWF0Y2hbMF1cbiAgICAgICAgLnJlcGxhY2UoL15cXCh8XFwpJC8sICcnKVxuICAgICAgICAubWF0Y2goL1teXFxzKCksXSsvZykgfHwgW107XG4gICAgICBjb25zdCBib2R5TWF0Y2ggPSB2Lm1hdGNoKC9cXHsoLiopXFx9Lyk7XG4gICAgICBpZiAoYm9keU1hdGNoICE9IG51bGwgJiYgYm9keU1hdGNoLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgY29uc3QgYm9keSA9IGJvZHlNYXRjaFsxXTtcbiAgICAgICAgY29uc3QgZnggPSBhcmdzLmNvbmNhdChib2R5KTtcbiAgICAgICAgcmV0dXJuIEZ1bmN0aW9uLmFwcGx5KG51bGwsIGZ4KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHY7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWVwQ29weShvbGRPYmo6IGFueSk6IGFueSB7XG4gIHJldHVybiBKU09OLnBhcnNlKFxuICAgIEpTT04uc3RyaW5naWZ5KG9sZE9iaiwgZnVuY3Rpb25TZXJpYWxpemVyKSxcbiAgICBmdW5jdGlvbkRlc2VyaWFsaXplclxuICApO1xufVxuIl19