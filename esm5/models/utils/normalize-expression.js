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
import * as esprima from 'esprima';
var esprimaMod = esprima.default || esprima;
var tokenize = esprimaMod.tokenize;
export function normalizeExpression(formula, ancestorsNames, prefix) {
    var ancestorsNameStrings = Object.keys(ancestorsNames);
    var tokens = tokenize(formula)
        .filter(function (token) { return token.type == 'Identifier' && token.value != '$value'; })
        .map(function (token) { return token.value; });
    tokens.forEach(function (t) {
        if (ancestorsNameStrings.indexOf(t) > -1) {
            formula = formula.replace(new RegExp("\\b" + t + "\\b", 'g'), t + "__" + prefix.slice(ancestorsNames[t]).join('__'));
        }
    });
    return formula;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplLWV4cHJlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9tb2RlbHMvdXRpbHMvbm9ybWFsaXplLWV4cHJlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxLQUFLLE9BQU8sTUFBTSxTQUFTLENBQUM7QUFDbkMsSUFBTSxVQUFVLEdBQVMsT0FBZSxDQUFDLE9BQU8sSUFBSSxPQUFPLENBQUM7QUFDckQsSUFBQSw4QkFBUSxDQUFlO0FBRTlCLE1BQU0sVUFBVSxtQkFBbUIsQ0FDL0IsT0FBZSxFQUFFLGNBQXdDLEVBQUUsTUFBZ0I7SUFDN0UsSUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pELElBQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7U0FDWixNQUFNLENBQUMsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFLLENBQUMsSUFBSSxJQUFJLFlBQVksSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLFFBQVEsRUFBckQsQ0FBcUQsQ0FBQztTQUM3RSxHQUFHLENBQUMsVUFBQyxLQUFVLElBQUssT0FBQSxLQUFLLENBQUMsS0FBSyxFQUFYLENBQVcsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBQyxDQUFNO1FBQ3BCLElBQUksb0JBQW9CLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3hDLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUNyQixJQUFJLE1BQU0sQ0FBQyxRQUFNLENBQUMsUUFBSyxFQUFFLEdBQUcsQ0FBQyxFQUFLLENBQUMsVUFBSyxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUcsQ0FBQyxDQUFDO1NBQzNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCAqIGFzIGVzcHJpbWEgZnJvbSAnZXNwcmltYSc7XG5jb25zdCBlc3ByaW1hTW9kOiBhbnkgPSAoZXNwcmltYSBhcyBhbnkpLmRlZmF1bHQgfHwgZXNwcmltYTtcbmNvbnN0IHt0b2tlbml6ZX0gPSBlc3ByaW1hTW9kO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRXhwcmVzc2lvbihcbiAgICBmb3JtdWxhOiBzdHJpbmcsIGFuY2VzdG9yc05hbWVzOiB7W3Byb3A6IHN0cmluZ106IG51bWJlcn0sIHByZWZpeDogbnVtYmVyW10pOiBzdHJpbmcge1xuICBjb25zdCBhbmNlc3RvcnNOYW1lU3RyaW5ncyA9IE9iamVjdC5rZXlzKGFuY2VzdG9yc05hbWVzKTtcbiAgY29uc3QgdG9rZW5zID0gdG9rZW5pemUoZm9ybXVsYSlcbiAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKHRva2VuOiBhbnkpID0+IHRva2VuLnR5cGUgPT0gJ0lkZW50aWZpZXInICYmIHRva2VuLnZhbHVlICE9ICckdmFsdWUnKVxuICAgICAgICAgICAgICAgICAgICAgLm1hcCgodG9rZW46IGFueSkgPT4gdG9rZW4udmFsdWUpO1xuICB0b2tlbnMuZm9yRWFjaCgodDogYW55KSA9PiB7XG4gICAgaWYgKGFuY2VzdG9yc05hbWVTdHJpbmdzLmluZGV4T2YodCkgPiAtMSkge1xuICAgICAgZm9ybXVsYSA9IGZvcm11bGEucmVwbGFjZShcbiAgICAgICAgICBuZXcgUmVnRXhwKGBcXFxcYiR7dH1cXFxcYmAsICdnJyksIGAke3R9X18ke3ByZWZpeC5zbGljZShhbmNlc3RvcnNOYW1lc1t0XSkuam9pbignX18nKX1gKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZm9ybXVsYTtcbn1cbiJdfQ==