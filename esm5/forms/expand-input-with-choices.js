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
var AjfExpandFieldWithChoicesPipe = /** @class */ (function () {
    function AjfExpandFieldWithChoicesPipe() {
    }
    AjfExpandFieldWithChoicesPipe.prototype.transform = function (instance, threshold) {
        return !instance.node.forceNarrow && (instance.node.forceExpanded
            || (instance.filteredChoices && instance.filteredChoices.length <= threshold));
    };
    AjfExpandFieldWithChoicesPipe.decorators = [
        { type: Pipe, args: [{ name: 'ajfExpandFieldWithChoices' },] }
    ];
    return AjfExpandFieldWithChoicesPipe;
}());
export { AjfExpandFieldWithChoicesPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWlucHV0LXdpdGgtY2hvaWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2V4cGFuZC1pbnB1dC13aXRoLWNob2ljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFNbEQ7SUFBQTtJQVFBLENBQUM7SUFOQyxpREFBUyxHQUFULFVBQVUsUUFBMEMsRUFBRSxTQUFpQjtRQUNyRSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLElBQUksQ0FDbkMsUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhO2VBQ3hCLENBQUMsUUFBUSxDQUFDLGVBQWUsSUFBSSxRQUFRLENBQUMsZUFBZSxDQUFDLE1BQU0sSUFBSSxTQUFTLENBQUMsQ0FDOUUsQ0FBQztJQUNKLENBQUM7O2dCQVBGLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSwyQkFBMkIsRUFBQzs7SUFRekMsb0NBQUM7Q0FBQSxBQVJELElBUUM7U0FQWSw2QkFBNkIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7XG4gIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZVxufSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5cbkBQaXBlKHtuYW1lOiAnYWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlcyd9KVxuZXhwb3J0IGNsYXNzIEFqZkV4cGFuZEZpZWxkV2l0aENob2ljZXNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnN0YW5jZTogQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4sIHRocmVzaG9sZDogbnVtYmVyKSB7XG4gICAgcmV0dXJuICFpbnN0YW5jZS5ub2RlLmZvcmNlTmFycm93ICYmIChcbiAgICAgIGluc3RhbmNlLm5vZGUuZm9yY2VFeHBhbmRlZFxuICAgICAgfHwgKGluc3RhbmNlLmZpbHRlcmVkQ2hvaWNlcyAmJiBpbnN0YW5jZS5maWx0ZXJlZENob2ljZXMubGVuZ3RoIDw9IHRocmVzaG9sZClcbiAgICApO1xuICB9XG59XG4iXX0=