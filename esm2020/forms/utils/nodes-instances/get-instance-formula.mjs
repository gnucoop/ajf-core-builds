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
import { normalizeExpression } from '@ajf/core/models';
export function getInstanceFormula(formula, ancestorsNames, prefix) {
    const oldFormula = formula.formula;
    let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
    if (newFormula === oldFormula) {
        return formula;
    }
    return { formula: newFormula };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWluc3RhbmNlLWZvcm11bGEuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZ2V0LWluc3RhbmNlLWZvcm11bGEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFhLG1CQUFtQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFakUsTUFBTSxVQUFVLGtCQUFrQixDQUNoQyxPQUFtQixFQUNuQixjQUF3QyxFQUN4QyxNQUFnQjtJQUVoQixNQUFNLFVBQVUsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO0lBQ25DLElBQUksVUFBVSxHQUFHLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7SUFDekUsSUFBSSxVQUFVLEtBQUssVUFBVSxFQUFFO1FBQzdCLE9BQU8sT0FBTyxDQUFDO0tBQ2hCO0lBQ0QsT0FBTyxFQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUMsQ0FBQztBQUMvQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm11bGEsIG5vcm1hbGl6ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5zdGFuY2VGb3JtdWxhKFxuICBmb3JtdWxhOiBBamZGb3JtdWxhLFxuICBhbmNlc3RvcnNOYW1lczoge1twcm9wOiBzdHJpbmddOiBudW1iZXJ9LFxuICBwcmVmaXg6IG51bWJlcltdLFxuKTogQWpmRm9ybXVsYSB7XG4gIGNvbnN0IG9sZEZvcm11bGEgPSBmb3JtdWxhLmZvcm11bGE7XG4gIGxldCBuZXdGb3JtdWxhID0gbm9ybWFsaXplRXhwcmVzc2lvbihvbGRGb3JtdWxhLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgaWYgKG5ld0Zvcm11bGEgPT09IG9sZEZvcm11bGEpIHtcbiAgICByZXR1cm4gZm9ybXVsYTtcbiAgfVxuICByZXR1cm4ge2Zvcm11bGE6IG5ld0Zvcm11bGF9O1xufVxuIl19