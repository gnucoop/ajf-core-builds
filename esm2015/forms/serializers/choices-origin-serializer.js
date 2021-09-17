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
import { createChoicesOrigin } from '../utils/choices/create-choices-origin';
/**
 *  Create an AjfChoicesOrigin by json schema, apply a default value for type and name
 */
export class AjfChoicesOriginSerializer {
    static fromJson(origin) {
        return createChoicesOrigin(Object.assign(Object.assign({}, origin), { type: origin.type || 'fixed', name: origin.name || '' }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hvaWNlcy1vcmlnaW4tc2VyaWFsaXplci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3NlcmlhbGl6ZXJzL2Nob2ljZXMtb3JpZ2luLXNlcmlhbGl6ZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUF5QixtQkFBbUIsRUFBQyxNQUFNLHdDQUF3QyxDQUFDO0FBQ25HOztHQUVHO0FBQ0gsTUFBTSxPQUFPLDBCQUEwQjtJQUNyQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQXNDO1FBQ3BELE9BQU8sbUJBQW1CLENBQU0sZ0NBQzNCLE1BQU0sS0FDVCxJQUFJLEVBQUUsTUFBTSxDQUFDLElBQUksSUFBSSxPQUFPLEVBQzVCLElBQUksRUFBRSxNQUFNLENBQUMsSUFBSSxJQUFJLEVBQUUsR0FDTyxDQUFDLENBQUM7SUFDcEMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW59IGZyb20gJy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb3JpZ2luJztcbmltcG9ydCB7QWpmQ2hvaWNlc09yaWdpbkNyZWF0ZSwgY3JlYXRlQ2hvaWNlc09yaWdpbn0gZnJvbSAnLi4vdXRpbHMvY2hvaWNlcy9jcmVhdGUtY2hvaWNlcy1vcmlnaW4nO1xuLyoqXG4gKiAgQ3JlYXRlIGFuIEFqZkNob2ljZXNPcmlnaW4gYnkganNvbiBzY2hlbWEsIGFwcGx5IGEgZGVmYXVsdCB2YWx1ZSBmb3IgdHlwZSBhbmQgbmFtZVxuICovXG5leHBvcnQgY2xhc3MgQWpmQ2hvaWNlc09yaWdpblNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24ob3JpZ2luOiBQYXJ0aWFsPEFqZkNob2ljZXNPcmlnaW48YW55Pj4pOiBBamZDaG9pY2VzT3JpZ2luPGFueT4ge1xuICAgIHJldHVybiBjcmVhdGVDaG9pY2VzT3JpZ2luPGFueT4oe1xuICAgICAgLi4ub3JpZ2luLFxuICAgICAgdHlwZTogb3JpZ2luLnR5cGUgfHwgJ2ZpeGVkJyxcbiAgICAgIG5hbWU6IG9yaWdpbi5uYW1lIHx8ICcnLFxuICAgIH0gYXMgQWpmQ2hvaWNlc09yaWdpbkNyZWF0ZTxhbnk+KTtcbiAgfVxufVxuIl19