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
import * as i0 from "@angular/core";
/**
 * It returns true if AjfFieldWithChoices is forceExpanded and filteredChoices length is
 * less than equal threshold.
 */
export class AjfExpandFieldWithChoicesPipe {
    transform(instance, threshold) {
        return !instance.node.forceNarrow &&
            (instance.node.forceExpanded ||
                (instance.filteredChoices && instance.filteredChoices.length <= threshold));
    }
}
AjfExpandFieldWithChoicesPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfExpandFieldWithChoicesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfExpandFieldWithChoicesPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfExpandFieldWithChoicesPipe, name: "ajfExpandFieldWithChoices" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfExpandFieldWithChoicesPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfExpandFieldWithChoices' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWlucHV0LXdpdGgtY2hvaWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2V4cGFuZC1pbnB1dC13aXRoLWNob2ljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7O0FBTWxEOzs7R0FHRztBQUVILE1BQU0sT0FBTyw2QkFBNkI7SUFDeEMsU0FBUyxDQUFDLFFBQTBDLEVBQUUsU0FBaUI7UUFDckUsT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVztZQUM3QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYTtnQkFDM0IsQ0FBQyxRQUFRLENBQUMsZUFBZSxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7SUFDbkYsQ0FBQzs7a0lBTFUsNkJBQTZCO2dJQUE3Qiw2QkFBNkI7bUdBQTdCLDZCQUE2QjtrQkFEekMsSUFBSTttQkFBQyxFQUFDLElBQUksRUFBRSwyQkFBMkIsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlXG59IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcblxuLyoqXG4gKiBJdCByZXR1cm5zIHRydWUgaWYgQWpmRmllbGRXaXRoQ2hvaWNlcyBpcyBmb3JjZUV4cGFuZGVkIGFuZCBmaWx0ZXJlZENob2ljZXMgbGVuZ3RoIGlzXG4gKiBsZXNzIHRoYW4gZXF1YWwgdGhyZXNob2xkLlxuICovXG5AUGlwZSh7bmFtZTogJ2FqZkV4cGFuZEZpZWxkV2l0aENob2ljZXMnfSlcbmV4cG9ydCBjbGFzcyBBamZFeHBhbmRGaWVsZFdpdGhDaG9pY2VzUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5zdGFuY2U6IEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+LCB0aHJlc2hvbGQ6IG51bWJlcik6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhaW5zdGFuY2Uubm9kZS5mb3JjZU5hcnJvdyAmJlxuICAgICAgICAoaW5zdGFuY2Uubm9kZS5mb3JjZUV4cGFuZGVkIHx8XG4gICAgICAgICAoaW5zdGFuY2UuZmlsdGVyZWRDaG9pY2VzICYmIGluc3RhbmNlLmZpbHRlcmVkQ2hvaWNlcy5sZW5ndGggPD0gdGhyZXNob2xkKSk7XG4gIH1cbn1cbiJdfQ==