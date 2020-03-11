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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcC1jb3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvdXRpbHMvZGVlcC1jb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILFNBQVMsa0JBQWtCLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDeEMsSUFBSSxPQUFPLENBQUMsS0FBSyxVQUFVLEVBQUU7UUFDM0IsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRSxHQUFHLENBQUMsQ0FBQztLQUM5QztJQUNELE9BQU8sQ0FBQyxDQUFDO0FBQ1gsQ0FBQztBQUVELFNBQVMsb0JBQW9CLENBQUMsQ0FBTSxFQUFFLENBQU07SUFDMUMsSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksbUNBQW1DLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFO1FBQ3hFLElBQU0sU0FBUyxHQUFHLENBQUM7YUFDaEIsT0FBTyxDQUFDLDRCQUE0QixFQUFFLEVBQUUsQ0FBQzthQUN6QyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckIsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzdDLElBQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUM7aUJBQ3RCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsRUFBRSxDQUFDO2lCQUN0QixLQUFLLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdCLElBQU0sU0FBUyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDdEMsSUFBSSxTQUFTLElBQUksSUFBSSxJQUFJLFNBQVMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUM3QyxJQUFNLElBQUksR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzFCLElBQU0sRUFBRSxHQUFHLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzdCLE9BQU8sUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLENBQUM7YUFDakM7U0FDRjtLQUNGO0lBQ0QsT0FBTyxDQUFDLENBQUM7QUFDWCxDQUFDO0FBRUQsTUFBTSxVQUFVLFFBQVEsQ0FBQyxNQUFXO0lBQ2xDLE9BQU8sSUFBSSxDQUFDLEtBQUssQ0FDZixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sRUFBRSxrQkFBa0IsQ0FBQyxFQUMxQyxvQkFBb0IsQ0FDckIsQ0FBQztBQUNKLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmZ1bmN0aW9uIGZ1bmN0aW9uU2VyaWFsaXplcihfOiBhbnksIHY6IGFueSk6IGFueSB7XG4gIGlmICh0eXBlb2YgdiA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIHJldHVybiB2LnRvU3RyaW5nKCkucmVwbGFjZSgvW1xcclxcbl0rL2csICcgJyk7XG4gIH1cbiAgcmV0dXJuIHY7XG59XG5cbmZ1bmN0aW9uIGZ1bmN0aW9uRGVzZXJpYWxpemVyKF86IGFueSwgdjogYW55KTogYW55IHtcbiAgaWYgKHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiAvXmZ1bmN0aW9uLio/XFwoW15cXDBdKj9cXClcXHMqXFx7LipcXH0kLy50ZXN0KHYpKSB7XG4gICAgY29uc3QgYXJnc01hdGNoID0gdlxuICAgICAgLnJlcGxhY2UoL1xcL1xcLy4qJHxcXC9cXCpbXFxzXFxTXSo/XFwqXFwvL21nLCAnJylcbiAgICAgIC5tYXRjaCgvXFwoLio/XFwpL20pO1xuICAgIGlmIChhcmdzTWF0Y2ggIT0gbnVsbCAmJiBhcmdzTWF0Y2gubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgYXJncyA9IGFyZ3NNYXRjaFswXVxuICAgICAgICAucmVwbGFjZSgvXlxcKHxcXCkkLywgJycpXG4gICAgICAgIC5tYXRjaCgvW15cXHMoKSxdKy9nKSB8fCBbXTtcbiAgICAgIGNvbnN0IGJvZHlNYXRjaCA9IHYubWF0Y2goL1xceyguKilcXH0vKTtcbiAgICAgIGlmIChib2R5TWF0Y2ggIT0gbnVsbCAmJiBib2R5TWF0Y2gubGVuZ3RoID4gMSkge1xuICAgICAgICBjb25zdCBib2R5ID0gYm9keU1hdGNoWzFdO1xuICAgICAgICBjb25zdCBmeCA9IGFyZ3MuY29uY2F0KGJvZHkpO1xuICAgICAgICByZXR1cm4gRnVuY3Rpb24uYXBwbHkobnVsbCwgZngpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gdjtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlZXBDb3B5KG9sZE9iajogYW55KTogYW55IHtcbiAgcmV0dXJuIEpTT04ucGFyc2UoXG4gICAgSlNPTi5zdHJpbmdpZnkob2xkT2JqLCBmdW5jdGlvblNlcmlhbGl6ZXIpLFxuICAgIGZ1bmN0aW9uRGVzZXJpYWxpemVyXG4gICk7XG59XG4iXX0=