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
import { createValidation } from './create-validation';
export function minValidation(minValue) {
    return createValidation({
        condition: '$value >= ' + minValue.toString(),
        errorMessage: 'Value must be >= ' + minValue.toString()
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluLXZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy92YWxpZGF0aW9uL21pbi12YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBQyxnQkFBZ0IsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBRXJELE1BQU0sVUFBVSxhQUFhLENBQUMsUUFBZ0I7SUFDNUMsT0FBTyxnQkFBZ0IsQ0FBQztRQUN0QixTQUFTLEVBQUUsWUFBWSxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUU7UUFDN0MsWUFBWSxFQUFFLG1CQUFtQixHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUU7S0FDeEQsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlZhbGlkYXRpb259IGZyb20gJy4uLy4uL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24nO1xuaW1wb3J0IHtjcmVhdGVWYWxpZGF0aW9ufSBmcm9tICcuL2NyZWF0ZS12YWxpZGF0aW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIG1pblZhbGlkYXRpb24obWluVmFsdWU6IG51bWJlcik6IEFqZlZhbGlkYXRpb24ge1xuICByZXR1cm4gY3JlYXRlVmFsaWRhdGlvbih7XG4gICAgY29uZGl0aW9uOiAnJHZhbHVlID49ICcgKyBtaW5WYWx1ZS50b1N0cmluZygpLFxuICAgIGVycm9yTWVzc2FnZTogJ1ZhbHVlIG11c3QgYmUgPj0gJyArIG1pblZhbHVlLnRvU3RyaW5nKClcbiAgfSk7XG59XG4iXX0=