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
import { getContextString } from './get-context-string';
let cachedContext = {};
let cachedContextString = '{}';
export function validateExpression(str, context) {
    if (context === cachedContext) {
        console.log('cache hit');
    }
    else {
        cachedContext = context;
        cachedContextString = getContextString(context);
    }
    let ctx = cachedContextString;
    try {
        let f = new Function(`${ctx}${str}`);
        f();
        f = null;
        return true;
    }
    catch (e) {
        return false;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGUtZXhwcmVzc2lvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy92YWxpZGF0ZS1leHByZXNzaW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBRXRELElBQUksYUFBYSxHQUFRLEVBQUUsQ0FBQztBQUM1QixJQUFJLG1CQUFtQixHQUFHLElBQUksQ0FBQztBQUUvQixNQUFNLFVBQVUsa0JBQWtCLENBQUMsR0FBVyxFQUFFLE9BQW9CO0lBQ2xFLElBQUksT0FBTyxLQUFLLGFBQWEsRUFBRTtRQUM3QixPQUFPLENBQUMsR0FBRyxDQUFDLFdBQVcsQ0FBQyxDQUFDO0tBQzFCO1NBQU07UUFDTCxhQUFhLEdBQUcsT0FBTyxDQUFDO1FBQ3hCLG1CQUFtQixHQUFHLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2pEO0lBQ0QsSUFBSSxHQUFHLEdBQUcsbUJBQW1CLENBQUM7SUFDOUIsSUFBSTtRQUNGLElBQUksQ0FBQyxHQUFHLElBQUksUUFBUSxDQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsRUFBRSxDQUFDLENBQUM7UUFDckMsQ0FBQyxFQUFFLENBQUM7UUFDSixDQUFDLEdBQVEsSUFBSSxDQUFDO1FBQ2QsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxLQUFLLENBQUM7S0FDZDtBQUNILENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5cbmltcG9ydCB7Z2V0Q29udGV4dFN0cmluZ30gZnJvbSAnLi9nZXQtY29udGV4dC1zdHJpbmcnO1xuXG5sZXQgY2FjaGVkQ29udGV4dDogYW55ID0ge307XG5sZXQgY2FjaGVkQ29udGV4dFN0cmluZyA9ICd7fSc7XG5cbmV4cG9ydCBmdW5jdGlvbiB2YWxpZGF0ZUV4cHJlc3Npb24oc3RyOiBzdHJpbmcsIGNvbnRleHQ/OiBBamZDb250ZXh0KTogYm9vbGVhbiB7XG4gIGlmIChjb250ZXh0ID09PSBjYWNoZWRDb250ZXh0KSB7XG4gICAgY29uc29sZS5sb2coJ2NhY2hlIGhpdCcpO1xuICB9IGVsc2Uge1xuICAgIGNhY2hlZENvbnRleHQgPSBjb250ZXh0O1xuICAgIGNhY2hlZENvbnRleHRTdHJpbmcgPSBnZXRDb250ZXh0U3RyaW5nKGNvbnRleHQpO1xuICB9XG4gIGxldCBjdHggPSBjYWNoZWRDb250ZXh0U3RyaW5nO1xuICB0cnkge1xuICAgIGxldCBmID0gbmV3IEZ1bmN0aW9uKGAke2N0eH0ke3N0cn1gKTtcbiAgICBmKCk7XG4gICAgZiA9IDxhbnk+bnVsbDtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19