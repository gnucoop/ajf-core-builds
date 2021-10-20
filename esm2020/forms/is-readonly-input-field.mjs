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
import { AjfFieldType } from './interface/fields/field-type';
import { isFieldInstance } from './utils/nodes-instances/is-field-instance';
import * as i0 from "@angular/core";
/**
 * It checks if the AjfNodeInstance parameter is an Formula AjfField.
 *
 * @export
 * @class AjfIsReadonlyInputFieldPipe
 */
export class AjfIsReadonlyInputFieldPipe {
    transform(instance) {
        return (isFieldInstance(instance) &&
            instance.node.fieldType === AjfFieldType.Formula);
    }
}
AjfIsReadonlyInputFieldPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfIsReadonlyInputFieldPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfIsReadonlyInputFieldPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfIsReadonlyInputFieldPipe, name: "ajfIsReadonlyInputField" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfIsReadonlyInputFieldPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfIsReadonlyInputField' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcmVhZG9ubHktaW5wdXQtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9pcy1yZWFkb25seS1pbnB1dC1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUdsRCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFFM0QsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLDJDQUEyQyxDQUFDOztBQUUxRTs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTywyQkFBMkI7SUFDdEMsU0FBUyxDQUFDLFFBQXlCO1FBQ2pDLE9BQU8sQ0FDTCxlQUFlLENBQUMsUUFBUSxDQUFDO1lBQ3hCLFFBQTZCLENBQUMsSUFBSSxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsT0FBTyxDQUN2RSxDQUFDO0lBQ0osQ0FBQzs7Z0lBTlUsMkJBQTJCOzhIQUEzQiwyQkFBMkI7bUdBQTNCLDJCQUEyQjtrQkFEdkMsSUFBSTttQkFBQyxFQUFDLElBQUksRUFBRSx5QkFBeUIsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc0ZpZWxkSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLWZpZWxkLWluc3RhbmNlJztcblxuLyoqXG4gKiBJdCBjaGVja3MgaWYgdGhlIEFqZk5vZGVJbnN0YW5jZSBwYXJhbWV0ZXIgaXMgYW4gRm9ybXVsYSBBamZGaWVsZC5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmSXNSZWFkb25seUlucHV0RmllbGRQaXBlXG4gKi9cbkBQaXBlKHtuYW1lOiAnYWpmSXNSZWFkb25seUlucHV0RmllbGQnfSlcbmV4cG9ydCBjbGFzcyBBamZJc1JlYWRvbmx5SW5wdXRGaWVsZFBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXNGaWVsZEluc3RhbmNlKGluc3RhbmNlKSAmJlxuICAgICAgKGluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UpLm5vZGUuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuRm9ybXVsYVxuICAgICk7XG4gIH1cbn1cbiJdfQ==