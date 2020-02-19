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
function functionSerializer(_, v) {
    if (typeof v === 'function') {
        return v.toString().replace(/[\r\n]+/g, ' ');
    }
    return v;
}
function functionDeserializer(_, v) {
    if (typeof v === 'string' && /^function.*?\([^\0]*?\)\s*\{.*\}$/.test(v)) {
        var argsMatch = v
            .replace(/\/\/.*$|\/\*[\s\S]*?\*\//mg, '')
            .match(/\(.*?\)/m);
        if (argsMatch != null && argsMatch.length > 0) {
            var args = argsMatch[0]
                .replace(/^\(|\)$/, '')
                .match(/[^\s(),]+/g) || [];
            var bodyMatch = v.match(/\{(.*)\}/);
            if (bodyMatch != null && bodyMatch.length > 1) {
                var body = bodyMatch[1];
                var fx = args.concat(body);
                return Function.apply(null, fx);
            }
        }
    }
    return v;
}
export function deepCopy(oldObj) {
    return JSON.parse(JSON.stringify(oldObj, functionSerializer), functionDeserializer);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcC1jb3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvdXRpbHMvZGVlcC1jb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILFNBQVMsa0JBQWtCLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDeEMsSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLEVBQUU7UUFDM0IsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUM5QztJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVELFNBQVMsb0JBQW9CLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDMUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksbUNBQW1DLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3hFLElBQU0sU0FBUyxHQUFHLENBQUM7YUFDaEIsT0FBTyxDQUFDLDRCQUE0QixFQUFFLEVBQUUsQ0FBQzthQUN6QyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckIsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdDLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDO2lCQUN0QixLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdCLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEMsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QyxJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDakM7U0FDRjtLQUNGO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFXO0lBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FDZixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxFQUMxQyxvQkFBb0IsQ0FDckIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuZnVuY3Rpb24gZnVuY3Rpb25TZXJpYWxpemVyKF86IGFueSwgdjogYW55KTogYW55IHtcbiAgaWYgKHR5cGVvZiB2ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIHYudG9TdHJpbmcoKS5yZXBsYWNlKC9bXFxyXFxuXSsvZywgJyAnKTtcbiAgfVxuICByZXR1cm4gdjtcbn1cblxuZnVuY3Rpb24gZnVuY3Rpb25EZXNlcmlhbGl6ZXIoXzogYW55LCB2OiBhbnkpOiBhbnkge1xuICBpZiAodHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIC9eZnVuY3Rpb24uKj9cXChbXlxcMF0qP1xcKVxccypcXHsuKlxcfSQvLnRlc3QodikpIHtcbiAgICBjb25zdCBhcmdzTWF0Y2ggPSB2XG4gICAgICAucmVwbGFjZSgvXFwvXFwvLiokfFxcL1xcKltcXHNcXFNdKj9cXCpcXC8vbWcsICcnKVxuICAgICAgLm1hdGNoKC9cXCguKj9cXCkvbSk7XG4gICAgaWYgKGFyZ3NNYXRjaCAhPSBudWxsICYmIGFyZ3NNYXRjaC5sZW5ndGggPiAwKSB7XG4gICAgICBjb25zdCBhcmdzID0gYXJnc01hdGNoWzBdXG4gICAgICAgIC5yZXBsYWNlKC9eXFwofFxcKSQvLCAnJylcbiAgICAgICAgLm1hdGNoKC9bXlxccygpLF0rL2cpIHx8IFtdO1xuICAgICAgY29uc3QgYm9keU1hdGNoID0gdi5tYXRjaCgvXFx7KC4qKVxcfS8pO1xuICAgICAgaWYgKGJvZHlNYXRjaCAhPSBudWxsICYmIGJvZHlNYXRjaC5sZW5ndGggPiAxKSB7XG4gICAgICAgIGNvbnN0IGJvZHkgPSBib2R5TWF0Y2hbMV07XG4gICAgICAgIGNvbnN0IGZ4ID0gYXJncy5jb25jYXQoYm9keSk7XG4gICAgICAgIHJldHVybiBGdW5jdGlvbi5hcHBseShudWxsLCBmeCk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiB2O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVlcENvcHkob2xkT2JqOiBhbnkpOiBhbnkge1xuICByZXR1cm4gSlNPTi5wYXJzZShcbiAgICBKU09OLnN0cmluZ2lmeShvbGRPYmosIGZ1bmN0aW9uU2VyaWFsaXplciksXG4gICAgZnVuY3Rpb25EZXNlcmlhbGl6ZXJcbiAgKTtcbn1cbiJdfQ==