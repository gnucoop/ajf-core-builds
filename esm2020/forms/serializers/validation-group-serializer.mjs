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
import { createValidationGroup } from '../utils/validation/create-validation-group';
/**
 *  Create an AjfValidationGroup by json schema
 */
export class AjfValidationGroupSerializer {
    static fromJson(group) {
        return createValidationGroup(group);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1ncm91cC1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvc2VyaWFsaXplcnMvdmFsaWRhdGlvbi1ncm91cC1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBRWxGOztHQUVHO0FBQ0gsTUFBTSxPQUFPLDRCQUE0QjtJQUN2QyxNQUFNLENBQUMsUUFBUSxDQUFDLEtBQWtDO1FBQ2hELE9BQU8scUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi1ncm91cCc7XG5pbXBvcnQge2NyZWF0ZVZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi4vdXRpbHMvdmFsaWRhdGlvbi9jcmVhdGUtdmFsaWRhdGlvbi1ncm91cCc7XG5cbi8qKlxuICogIENyZWF0ZSBhbiBBamZWYWxpZGF0aW9uR3JvdXAgYnkganNvbiBzY2hlbWFcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZlZhbGlkYXRpb25Hcm91cFNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24oZ3JvdXA6IFBhcnRpYWw8QWpmVmFsaWRhdGlvbkdyb3VwPik6IEFqZlZhbGlkYXRpb25Hcm91cCB7XG4gICAgcmV0dXJuIGNyZWF0ZVZhbGlkYXRpb25Hcm91cChncm91cCk7XG4gIH1cbn1cbiJdfQ==