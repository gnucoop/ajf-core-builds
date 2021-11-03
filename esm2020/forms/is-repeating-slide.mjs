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
import { Pipe } from '@angular/core';
import { isRepeatingSlideInstance } from './utils/nodes-instances/is-repeating-slide-instance';
import * as i0 from "@angular/core";
/**
 * It checks if the AjfNodeInstance parameter is an isRepeatingSlideInstance.
 *
 * @export
 * @class AjfIsRepeatingSlideInstancePipe
 */
export class AjfIsRepeatingSlideInstancePipe {
    transform(instance) {
        return isRepeatingSlideInstance(instance);
    }
}
AjfIsRepeatingSlideInstancePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfIsRepeatingSlideInstancePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfIsRepeatingSlideInstancePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfIsRepeatingSlideInstancePipe, name: "ajfIsRepeatingSlideInstance" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfIsRepeatingSlideInstancePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfIsRepeatingSlideInstance' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcmVwZWF0aW5nLXNsaWRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvaXMtcmVwZWF0aW5nLXNsaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBRWxELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHFEQUFxRCxDQUFDOztBQUU3Rjs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTywrQkFBK0I7SUFDMUMsU0FBUyxDQUFDLFFBQXlCO1FBQ2pDLE9BQU8sd0JBQXdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDNUMsQ0FBQzs7aUlBSFUsK0JBQStCOytIQUEvQiwrQkFBK0I7Z0dBQS9CLCtCQUErQjtrQkFEM0MsSUFBSTttQkFBQyxFQUFDLElBQUksRUFBRSw2QkFBNkIsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcblxuLyoqXG4gKiBJdCBjaGVja3MgaWYgdGhlIEFqZk5vZGVJbnN0YW5jZSBwYXJhbWV0ZXIgaXMgYW4gaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZJc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2VQaXBlXG4gKi9cbkBQaXBlKHtuYW1lOiAnYWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlJ30pXG5leHBvcnQgY2xhc3MgQWpmSXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICB9XG59XG4iXX0=