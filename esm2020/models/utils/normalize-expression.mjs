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
import { getCodeIdentifiers } from './expression-utils';
export function normalizeExpression(formula, ancestorsNames, prefix) {
    const ancestorsNameStrings = Object.keys(ancestorsNames);
    const tokens = getCodeIdentifiers(formula);
    tokens.forEach((t) => {
        if (ancestorsNameStrings.indexOf(t) > -1) {
            formula = formula.replace(new RegExp(`\\b${t}\\b`, 'g'), `${t}__${prefix.slice(ancestorsNames[t]).join('__')}`);
        }
    });
    return formula;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplLWV4cHJlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL21vZGVscy9zcmMvdXRpbHMvbm9ybWFsaXplLWV4cHJlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFdEQsTUFBTSxVQUFVLG1CQUFtQixDQUNqQyxPQUFlLEVBQ2YsY0FBd0MsRUFDeEMsTUFBZ0I7SUFFaEIsTUFBTSxvQkFBb0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBQ3pELE1BQU0sTUFBTSxHQUFHLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFNLEVBQUUsRUFBRTtRQUN4QixJQUFJLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRTtZQUN4QyxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FDdkIsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsRUFDN0IsR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDdEQsQ0FBQztTQUNIO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge2dldENvZGVJZGVudGlmaWVyc30gZnJvbSAnLi9leHByZXNzaW9uLXV0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUV4cHJlc3Npb24oXG4gIGZvcm11bGE6IHN0cmluZyxcbiAgYW5jZXN0b3JzTmFtZXM6IHtbcHJvcDogc3RyaW5nXTogbnVtYmVyfSxcbiAgcHJlZml4OiBudW1iZXJbXSxcbik6IHN0cmluZyB7XG4gIGNvbnN0IGFuY2VzdG9yc05hbWVTdHJpbmdzID0gT2JqZWN0LmtleXMoYW5jZXN0b3JzTmFtZXMpO1xuICBjb25zdCB0b2tlbnMgPSBnZXRDb2RlSWRlbnRpZmllcnMoZm9ybXVsYSk7XG4gIHRva2Vucy5mb3JFYWNoKCh0OiBhbnkpID0+IHtcbiAgICBpZiAoYW5jZXN0b3JzTmFtZVN0cmluZ3MuaW5kZXhPZih0KSA+IC0xKSB7XG4gICAgICBmb3JtdWxhID0gZm9ybXVsYS5yZXBsYWNlKFxuICAgICAgICBuZXcgUmVnRXhwKGBcXFxcYiR7dH1cXFxcYmAsICdnJyksXG4gICAgICAgIGAke3R9X18ke3ByZWZpeC5zbGljZShhbmNlc3RvcnNOYW1lc1t0XSkuam9pbignX18nKX1gLFxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuICByZXR1cm4gZm9ybXVsYTtcbn1cbiJdfQ==