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
/**
 *  Create a AjfValidation, apply clientValidation and errorMessage defaults when it missing
 */
export function createValidation(validation) {
    return Object.assign(Object.assign({}, validation), { clientValidation: validation.clientValidation || false, errorMessage: validation.errorMessage || 'Undefined Error' });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXZhbGlkYXRpb24uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy92YWxpZGF0aW9uL2NyZWF0ZS12YWxpZGF0aW9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdIOztHQUVHO0FBQ0gsTUFBTSxVQUFVLGdCQUFnQixDQUFDLFVBQ3NCO0lBQ3JELHVDQUNLLFVBQVUsS0FDYixnQkFBZ0IsRUFBRSxVQUFVLENBQUMsZ0JBQWdCLElBQUksS0FBSyxFQUN0RCxZQUFZLEVBQUUsVUFBVSxDQUFDLFlBQVksSUFBSSxpQkFBaUIsSUFDMUQ7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlZhbGlkYXRpb259IGZyb20gJy4uLy4uL2ludGVyZmFjZS92YWxpZGF0aW9uL3ZhbGlkYXRpb24nO1xuLyoqXG4gKiAgQ3JlYXRlIGEgQWpmVmFsaWRhdGlvbiwgYXBwbHkgY2xpZW50VmFsaWRhdGlvbiBhbmQgZXJyb3JNZXNzYWdlIGRlZmF1bHRzIHdoZW4gaXQgbWlzc2luZ1xuICovXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlVmFsaWRhdGlvbih2YWxpZGF0aW9uOiBQaWNrPEFqZlZhbGlkYXRpb24sICdjb25kaXRpb24nPiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcnRpYWw8QWpmVmFsaWRhdGlvbj4pOiBBamZWYWxpZGF0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICAuLi52YWxpZGF0aW9uLFxuICAgIGNsaWVudFZhbGlkYXRpb246IHZhbGlkYXRpb24uY2xpZW50VmFsaWRhdGlvbiB8fCBmYWxzZSxcbiAgICBlcnJvck1lc3NhZ2U6IHZhbGlkYXRpb24uZXJyb3JNZXNzYWdlIHx8ICdVbmRlZmluZWQgRXJyb3InXG4gIH07XG59XG4iXX0=