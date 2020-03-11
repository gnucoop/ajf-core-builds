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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy92YWxpZGF0ZS1leHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDNUIsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFFdEQsSUFBSSxhQUFhLEdBQVEsRUFBRSxDQUFDO0FBQzVCLElBQUksbUJBQW1CLEdBQUcsSUFBSSxDQUFDO0FBRS9CLE1BQU0sVUFBVSxrQkFBa0IsQ0FBQyxHQUFXLEVBQUUsT0FBb0I7SUFDbEUsSUFBSSxPQUFPLEtBQUssYUFBYSxFQUFFO1FBQzdCLE9BQU8sQ0FBQyxHQUFHLENBQUMsV0FBVyxDQUFDLENBQUM7S0FDMUI7U0FBTTtRQUNMLGFBQWEsR0FBRyxPQUFPLENBQUM7UUFDeEIsbUJBQW1CLEdBQUcsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUM7S0FDakQ7SUFDRCxJQUFJLEdBQUcsR0FBRyxtQkFBbUIsQ0FBQztJQUM5QixJQUFJO1FBQ0YsSUFBSSxDQUFDLEdBQUcsSUFBSSxRQUFRLENBQUMsS0FBRyxHQUFHLEdBQUcsR0FBSyxDQUFDLENBQUM7UUFDckMsR0FBRyxDQUFNLHdDQUF3QyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3RCxDQUFDLEVBQUUsQ0FBQztRQUNKLEdBQUcsQ0FBQyxzQkFBc0IsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNqQyxDQUFDLEdBQVEsSUFBSSxDQUFDO1FBQ2QsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsR0FBRyxDQUFDLG9DQUFvQyxFQUFFLEdBQUcsRUFBRSxDQUFDLENBQUMsQ0FBQztRQUNsRCxPQUFPLEtBQUssQ0FBQztLQUNkO0FBQ0gsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICcuLi9pbnRlcmZhY2UvY29udGV4dCc7XG5pbXBvcnQge2RiZ30gZnJvbSAnLi9kZWJ1Zyc7XG5pbXBvcnQge2dldENvbnRleHRTdHJpbmd9IGZyb20gJy4vZ2V0LWNvbnRleHQtc3RyaW5nJztcblxubGV0IGNhY2hlZENvbnRleHQ6IGFueSA9IHt9O1xubGV0IGNhY2hlZENvbnRleHRTdHJpbmcgPSAne30nO1xuXG5leHBvcnQgZnVuY3Rpb24gdmFsaWRhdGVFeHByZXNzaW9uKHN0cjogc3RyaW5nLCBjb250ZXh0PzogQWpmQ29udGV4dCk6IGJvb2xlYW4ge1xuICBpZiAoY29udGV4dCA9PT0gY2FjaGVkQ29udGV4dCkge1xuICAgIGNvbnNvbGUubG9nKCdjYWNoZSBoaXQnKTtcbiAgfSBlbHNlIHtcbiAgICBjYWNoZWRDb250ZXh0ID0gY29udGV4dDtcbiAgICBjYWNoZWRDb250ZXh0U3RyaW5nID0gZ2V0Q29udGV4dFN0cmluZyhjb250ZXh0KTtcbiAgfVxuICBsZXQgY3R4ID0gY2FjaGVkQ29udGV4dFN0cmluZztcbiAgdHJ5IHtcbiAgICBsZXQgZiA9IG5ldyBGdW5jdGlvbihgJHtjdHh9JHtzdHJ9YCk7XG4gICAgZGJnKDxhbnk+YHZhbGlkYXRpbmcgZm9ybXVsYSAlcyB1c2luZyBjb250ZXh0ICVqYCwgc3RyLCBjdHgpO1xuICAgIGYoKTtcbiAgICBkYmcoYGZvcm11bGEgJXMgdmFsaWRhdGVkYCwgc3RyKTtcbiAgICBmID0gPGFueT5udWxsO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlKSB7XG4gICAgZGJnKGBmb3JtdWxhICVzIG5vdCB2YWxpZGF0ZWQ6IGVycm9yICVqYCwgc3RyLCBlKTtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn1cbiJdfQ==