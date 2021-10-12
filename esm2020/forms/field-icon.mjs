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
        return fieldIconName(field.fieldType ? field.fieldType : field);
    }
}
AjfFieldIconPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldIconPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfFieldIconPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldIconPipe, name: "ajfFieldIcon" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldIconPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfFieldIcon' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtaWNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2ZpZWxkLWljb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFFbEQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGVBQWUsQ0FBQzs7QUFJNUM7Ozs7OztHQU1HO0FBRUgsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixTQUFTLENBQUMsS0FBNEI7UUFDcEMsT0FBTyxhQUFhLENBQ2YsS0FBa0IsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFFLEtBQWtCLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxLQUFxQixDQUFDLENBQUM7SUFDN0YsQ0FBQzs7cUhBSlUsZ0JBQWdCO21IQUFoQixnQkFBZ0I7bUdBQWhCLGdCQUFnQjtrQkFENUIsSUFBSTttQkFBQyxFQUFDLElBQUksRUFBRSxjQUFjLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7ZmllbGRJY29uTmFtZX0gZnJvbSAnLi9maWVsZC11dGlscyc7XG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcblxuLyoqXG4gKlxuICpcbiAqIEBwYXJhbSBGaWVsZC5cbiAqXG4gKiBAcmV0dXJuIEFuIGljb24gY2xhc3MgbmFtZSByZWxhdGl2ZSB0byB0aGUgQWpmVHlwZS5cbiAqL1xuQFBpcGUoe25hbWU6ICdhamZGaWVsZEljb24nfSlcbmV4cG9ydCBjbGFzcyBBamZGaWVsZEljb25QaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShmaWVsZDogQWpmRmllbGR8QWpmRmllbGRUeXBlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZmllbGRJY29uTmFtZShcbiAgICAgICAgKGZpZWxkIGFzIEFqZkZpZWxkKS5maWVsZFR5cGUgPyAoZmllbGQgYXMgQWpmRmllbGQpLmZpZWxkVHlwZSA6IGZpZWxkIGFzIEFqZkZpZWxkVHlwZSk7XG4gIH1cbn1cbiJdfQ==