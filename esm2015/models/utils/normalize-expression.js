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
import { tokenize } from 'esprima';
export function normalizeExpression(formula, ancestorsNames, prefix) {
    const ancestorsNameStrings = Object.keys(ancestorsNames);
    const tokens = tokenize(formula)
        .filter((token) => token.type == 'Identifier' && token.value != '$value')
        .map((token) => token.value);
    tokens.forEach((t) => {
        if (ancestorsNameStrings.indexOf(t) > -1) {
            formula = formula.replace(new RegExp(`\\b${t}\\b`, 'g'), `${t}__${prefix.slice(ancestorsNames[t]).join('__')}`);
        }
    });
    return formula;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9ybWFsaXplLWV4cHJlc3Npb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9tb2RlbHMvdXRpbHMvbm9ybWFsaXplLWV4cHJlc3Npb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUVqQyxNQUFNLFVBQVUsbUJBQW1CLENBQy9CLE9BQWUsRUFBRSxjQUF3QyxFQUFFLE1BQWdCO0lBQzdFLE1BQU0sb0JBQW9CLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUN6RCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDO1NBQ1osTUFBTSxDQUFDLENBQUMsS0FBVSxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxJQUFJLFlBQVksSUFBSSxLQUFLLENBQUMsS0FBSyxJQUFJLFFBQVEsQ0FBQztTQUM3RSxHQUFHLENBQUMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUNyRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBTSxFQUFFLEVBQUU7UUFDeEIsSUFBSSxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDeEMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQ3JCLElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssTUFBTSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1NBQzNGO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLE9BQU8sQ0FBQztBQUNqQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge3Rva2VuaXplfSBmcm9tICdlc3ByaW1hJztcblxuZXhwb3J0IGZ1bmN0aW9uIG5vcm1hbGl6ZUV4cHJlc3Npb24oXG4gICAgZm9ybXVsYTogc3RyaW5nLCBhbmNlc3RvcnNOYW1lczoge1twcm9wOiBzdHJpbmddOiBudW1iZXJ9LCBwcmVmaXg6IG51bWJlcltdKTogc3RyaW5nIHtcbiAgY29uc3QgYW5jZXN0b3JzTmFtZVN0cmluZ3MgPSBPYmplY3Qua2V5cyhhbmNlc3RvcnNOYW1lcyk7XG4gIGNvbnN0IHRva2VucyA9IHRva2VuaXplKGZvcm11bGEpXG4gICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKCh0b2tlbjogYW55KSA9PiB0b2tlbi50eXBlID09ICdJZGVudGlmaWVyJyAmJiB0b2tlbi52YWx1ZSAhPSAnJHZhbHVlJylcbiAgICAgICAgICAgICAgICAgICAgIC5tYXAoKHRva2VuOiBhbnkpID0+IHRva2VuLnZhbHVlKTtcbiAgdG9rZW5zLmZvckVhY2goKHQ6IGFueSkgPT4ge1xuICAgIGlmIChhbmNlc3RvcnNOYW1lU3RyaW5ncy5pbmRleE9mKHQpID4gLTEpIHtcbiAgICAgIGZvcm11bGEgPSBmb3JtdWxhLnJlcGxhY2UoXG4gICAgICAgICAgbmV3IFJlZ0V4cChgXFxcXGIke3R9XFxcXGJgLCAnZycpLCBgJHt0fV9fJHtwcmVmaXguc2xpY2UoYW5jZXN0b3JzTmFtZXNbdF0pLmpvaW4oJ19fJyl9YCk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGZvcm11bGE7XG59XG4iXX0=