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
let AjfExpandFieldWithChoicesPipe = /** @class */ (() => {
    class AjfExpandFieldWithChoicesPipe {
        transform(instance, threshold) {
            return !instance.node.forceNarrow &&
                (instance.node.forceExpanded ||
                    (instance.filteredChoices && instance.filteredChoices.length <= threshold));
        }
    }
    AjfExpandFieldWithChoicesPipe.decorators = [
        { type: Pipe, args: [{ name: 'ajfExpandFieldWithChoices' },] }
    ];
    return AjfExpandFieldWithChoicesPipe;
})();
export { AjfExpandFieldWithChoicesPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwYW5kLWlucHV0LXdpdGgtY2hvaWNlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2V4cGFuZC1pbnB1dC13aXRoLWNob2ljZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7QUFNbEQ7SUFBQSxNQUNhLDZCQUE2QjtRQUN4QyxTQUFTLENBQUMsUUFBMEMsRUFBRSxTQUFpQjtZQUNyRSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUM3QixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYTtvQkFDM0IsQ0FBQyxRQUFRLENBQUMsZUFBZSxJQUFJLFFBQVEsQ0FBQyxlQUFlLENBQUMsTUFBTSxJQUFJLFNBQVMsQ0FBQyxDQUFDLENBQUM7UUFDbkYsQ0FBQzs7O2dCQU5GLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSwyQkFBMkIsRUFBQzs7SUFPekMsb0NBQUM7S0FBQTtTQU5ZLDZCQUE2QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlXG59IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcblxuQFBpcGUoe25hbWU6ICdhamZFeHBhbmRGaWVsZFdpdGhDaG9pY2VzJ30pXG5leHBvcnQgY2xhc3MgQWpmRXhwYW5kRmllbGRXaXRoQ2hvaWNlc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGluc3RhbmNlOiBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgdGhyZXNob2xkOiBudW1iZXIpIHtcbiAgICByZXR1cm4gIWluc3RhbmNlLm5vZGUuZm9yY2VOYXJyb3cgJiZcbiAgICAgICAgKGluc3RhbmNlLm5vZGUuZm9yY2VFeHBhbmRlZCB8fFxuICAgICAgICAgKGluc3RhbmNlLmZpbHRlcmVkQ2hvaWNlcyAmJiBpbnN0YW5jZS5maWx0ZXJlZENob2ljZXMubGVuZ3RoIDw9IHRocmVzaG9sZCkpO1xuICB9XG59XG4iXX0=