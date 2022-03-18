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
import { Injectable, Pipe } from '@angular/core';
import * as i0 from "@angular/core";
import * as i1 from "./calendar-service";
export class AjfCalendarEntryLabelPipe {
    constructor(_service) {
        this._service = _service;
    }
    transform(entry) {
        return this._service.entryLabel(entry);
    }
}
AjfCalendarEntryLabelPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCalendarEntryLabelPipe, deps: [{ token: i1.AjfCalendarService }], target: i0.ɵɵFactoryTarget.Pipe });
AjfCalendarEntryLabelPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCalendarEntryLabelPipe, name: "ajfCalendarEntryLabel" });
AjfCalendarEntryLabelPipe.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCalendarEntryLabelPipe });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCalendarEntryLabelPipe, decorators: [{
            type: Injectable
        }, {
            type: Pipe,
            args: [{ name: 'ajfCalendarEntryLabel' }]
        }], ctorParameters: function () { return [{ type: i1.AjfCalendarService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItZW50cnktbGFiZWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2NhbGVuZGFyL3NyYy9jYWxlbmRhci1lbnRyeS1sYWJlbC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFFLElBQUksRUFBZ0IsTUFBTSxlQUFlLENBQUM7OztBQU85RCxNQUFNLE9BQU8seUJBQXlCO0lBQ3BDLFlBQW9CLFFBQTRCO1FBQTVCLGFBQVEsR0FBUixRQUFRLENBQW9CO0lBQUcsQ0FBQztJQUVwRCxTQUFTLENBQUMsS0FBdUI7UUFDL0IsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUN6QyxDQUFDOztzSEFMVSx5QkFBeUI7b0hBQXpCLHlCQUF5QjswSEFBekIseUJBQXlCOzJGQUF6Qix5QkFBeUI7a0JBRnJDLFVBQVU7O2tCQUNWLElBQUk7bUJBQUMsRUFBQyxJQUFJLEVBQUUsdUJBQXVCLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZSwgUGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQ2FsZW5kYXJFbnRyeX0gZnJvbSAnLi9jYWxlbmRhci1lbnRyeSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9jYWxlbmRhci1zZXJ2aWNlJztcblxuQEluamVjdGFibGUoKVxuQFBpcGUoe25hbWU6ICdhamZDYWxlbmRhckVudHJ5TGFiZWwnfSlcbmV4cG9ydCBjbGFzcyBBamZDYWxlbmRhckVudHJ5TGFiZWxQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX3NlcnZpY2U6IEFqZkNhbGVuZGFyU2VydmljZSkge31cblxuICB0cmFuc2Zvcm0oZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl9zZXJ2aWNlLmVudHJ5TGFiZWwoZW50cnkpO1xuICB9XG59XG4iXX0=