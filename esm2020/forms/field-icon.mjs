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
import { fieldIconName } from './field-utils';
import * as i0 from "@angular/core";
/**
 *
 *
 * @param Field.
 *
 * @return An icon class name relative to the AjfType.
 */
export class AjfFieldIconPipe {
    transform(field) {
        return fieldIconName(typeof field === 'number' ? field : field.fieldType);
    }
}
AjfFieldIconPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldIconPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfFieldIconPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldIconPipe, name: "ajfFieldIcon" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldIconPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfFieldIcon' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtaWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2ZpZWxkLWljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFbEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFJNUM7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixTQUFTLENBQUMsS0FBOEI7UUFDdEMsT0FBTyxhQUFhLENBQUMsT0FBTyxLQUFLLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM1RSxDQUFDOzs2R0FIVSxnQkFBZ0I7MkdBQWhCLGdCQUFnQjsyRkFBaEIsZ0JBQWdCO2tCQUQ1QixJQUFJO21CQUFDLEVBQUMsSUFBSSxFQUFFLGNBQWMsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtmaWVsZEljb25OYW1lfSBmcm9tICcuL2ZpZWxkLXV0aWxzJztcbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuXG4vKipcbiAqXG4gKlxuICogQHBhcmFtIEZpZWxkLlxuICpcbiAqIEByZXR1cm4gQW4gaWNvbiBjbGFzcyBuYW1lIHJlbGF0aXZlIHRvIHRoZSBBamZUeXBlLlxuICovXG5AUGlwZSh7bmFtZTogJ2FqZkZpZWxkSWNvbid9KVxuZXhwb3J0IGNsYXNzIEFqZkZpZWxkSWNvblBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGZpZWxkOiBBamZGaWVsZCB8IEFqZkZpZWxkVHlwZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGZpZWxkSWNvbk5hbWUodHlwZW9mIGZpZWxkID09PSAnbnVtYmVyJyA/IGZpZWxkIDogZmllbGQuZmllbGRUeXBlKTtcbiAgfVxufVxuIl19