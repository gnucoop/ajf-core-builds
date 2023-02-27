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
        return (!instance.node.forceNarrow &&
            (instance.node.forceExpanded ||
                (instance.filteredChoices && instance.filteredChoices.length <= threshold)));
    }
}
AjfExpandFieldWithChoicesPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfExpandFieldWithChoicesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfExpandFieldWithChoicesPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfExpandFieldWithChoicesPipe, name: "ajfExpandFieldWithChoices" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfExpandFieldWithChoicesPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfExpandFieldWithChoices' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWlucHV0LXdpdGgtY2hvaWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2V4cGFuZC1pbnB1dC13aXRoLWNob2ljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7O0FBSWxEOzs7R0FHRztBQUVILE1BQU0sT0FBTyw2QkFBNkI7SUFDeEMsU0FBUyxDQUFDLFFBQTBDLEVBQUUsU0FBaUI7UUFDckUsT0FBTyxDQUNMLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXO1lBQzFCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhO2dCQUMxQixDQUFDLFFBQVEsQ0FBQyxlQUFlLElBQUksUUFBUSxDQUFDLGVBQWUsQ0FBQyxNQUFNLElBQUksU0FBUyxDQUFDLENBQUMsQ0FDOUUsQ0FBQztJQUNKLENBQUM7OzBIQVBVLDZCQUE2Qjt3SEFBN0IsNkJBQTZCOzJGQUE3Qiw2QkFBNkI7a0JBRHpDLElBQUk7bUJBQUMsRUFBQyxJQUFJLEVBQUUsMkJBQTJCLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5cbi8qKlxuICogSXQgcmV0dXJucyB0cnVlIGlmIEFqZkZpZWxkV2l0aENob2ljZXMgaXMgZm9yY2VFeHBhbmRlZCBhbmQgZmlsdGVyZWRDaG9pY2VzIGxlbmd0aCBpc1xuICogbGVzcyB0aGFuIGVxdWFsIHRocmVzaG9sZC5cbiAqL1xuQFBpcGUoe25hbWU6ICdhamZFeHBhbmRGaWVsZFdpdGhDaG9pY2VzJ30pXG5leHBvcnQgY2xhc3MgQWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGluc3RhbmNlOiBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgdGhyZXNob2xkOiBudW1iZXIpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgIWluc3RhbmNlLm5vZGUuZm9yY2VOYXJyb3cgJiZcbiAgICAgIChpbnN0YW5jZS5ub2RlLmZvcmNlRXhwYW5kZWQgfHxcbiAgICAgICAgKGluc3RhbmNlLmZpbHRlcmVkQ2hvaWNlcyAmJiBpbnN0YW5jZS5maWx0ZXJlZENob2ljZXMubGVuZ3RoIDw9IHRocmVzaG9sZCkpXG4gICAgKTtcbiAgfVxufVxuIl19