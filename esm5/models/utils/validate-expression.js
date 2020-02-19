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
import { dbg } from './debug';
import { getContextString } from './get-context-string';
var cachedContext = {};
var cachedContextString = '{}';
export function validateExpression(str, context) {
    if (context === cachedContext) {
        console.log('cache hit');
    }
    else {
        cachedContext = context;
        cachedContextString = getContextString(context);
    }
    var ctx = cachedContextString;
    try {
        var f = new Function("" + ctx + str);
        dbg("validating formula %s using context %j", str, ctx);
        f();
        dbg("formula %s validated", str);
        f = null;
        return true;
    }
    catch (e) {
        dbg("formula %s not validated: error %j", str, e);
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy92YWxpZGF0ZS1leHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsSUFBSSxhQUFhLEdBQVEsRUFBRSxDQUFDO0FBQzVCLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0FBRS9CLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxHQUFXLEVBQUUsT0FBb0I7SUFDbEUsSUFBSSxPQUFPLEtBQUssYUFBYSxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDMUI7U0FBTTtRQUNMLGFBQWEsR0FBRyxPQUFPLENBQUM7UUFDeEIsbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDakQ7SUFDRCxJQUFJLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQztJQUM5QixJQUFJO1FBQ0YsSUFBSSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBRyxHQUFHLEdBQUcsR0FBSyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFNLHdDQUF3QyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RCxDQUFDLEVBQUUsQ0FBQztRQUNKLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDLEdBQVEsSUFBSSxDQUFDO1FBQ2QsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJy4uL2ludGVyZmFjZS9jb250ZXh0JztcbmltcG9ydCB7ZGJnfSBmcm9tICcuL2RlYnVnJztcbmltcG9ydCB7Z2V0Q29udGV4dFN0cmluZ30gZnJvbSAnLi9nZXQtY29udGV4dC1zdHJpbmcnO1xuXG5sZXQgY2FjaGVkQ29udGV4dDogYW55ID0ge307XG5sZXQgY2FjaGVkQ29udGV4dFN0cmluZyA9ICd7fSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUV4cHJlc3Npb24oc3RyOiBzdHJpbmcsIGNvbnRleHQ/OiBBamZDb250ZXh0KTogYm9vbGVhbiB7XG4gIGlmIChjb250ZXh0ID09PSBjYWNoZWRDb250ZXh0KSB7XG4gICAgY29uc29sZS5sb2coJ2NhY2hlIGhpdCcpO1xuICB9IGVsc2Uge1xuICAgIGNhY2hlZENvbnRleHQgPSBjb250ZXh0O1xuICAgIGNhY2hlZENvbnRleHRTdHJpbmcgPSBnZXRDb250ZXh0U3RyaW5nKGNvbnRleHQpO1xuICB9XG4gIGxldCBjdHggPSBjYWNoZWRDb250ZXh0U3RyaW5nO1xuICB0cnkge1xuICAgIGxldCBmID0gbmV3IEZ1bmN0aW9uKGAke2N0eH0ke3N0cn1gKTtcbiAgICBkYmcoPGFueT5gdmFsaWRhdGluZyBmb3JtdWxhICVzIHVzaW5nIGNvbnRleHQgJWpgLCBzdHIsIGN0eCk7XG4gICAgZigpO1xuICAgIGRiZyhgZm9ybXVsYSAlcyB2YWxpZGF0ZWRgLCBzdHIpO1xuICAgIGYgPSA8YW55Pm51bGw7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBkYmcoYGZvcm11bGEgJXMgbm90IHZhbGlkYXRlZDogZXJyb3IgJWpgLCBzdHIsIGUpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19