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
import { ChangeDetectorRef, Directive, EventEmitter, Input, Output, } from '@angular/core';
import { endOfISOWeek, endOfWeek, endOfYear, parseISO as parse, startOfISOWeek, startOfWeek, startOfYear, } from 'date-fns';
import { Observable } from 'rxjs';
import { AjfCalendarService } from './calendar-service';
import * as i0 from "@angular/core";
import * as i1 from "./calendar-service";
const weekDays = [
    '',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
];
export class AjfCalendarChange {
}
export class AjfCalendar {
    constructor(_cdr, _service) {
        this._cdr = _cdr;
        this._service = _service;
        this._disabled = false;
        this._dateOnlyForDay = false;
        this._viewMode = 'month';
        this._selectionMode = 'day';
        this._startOfWeekDay = 1;
        this._isoMode = false;
        this._change = new EventEmitter();
        this.change = this._change;
        this._viewDate = new Date();
        this._viewHeader = '';
        this._calendarRows = [];
        this._calendarHeaders = [];
        this._onChangeCallback = (_) => { };
        this._onTouchedCallback = () => { };
    }
    get viewDate() {
        return this._viewDate;
    }
    set viewDate(viewDate) {
        this._setViewDate(viewDate);
        this._cdr.markForCheck();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(disabled) {
        const newDisabled = disabled != null && `${disabled}` !== 'false';
        if (newDisabled !== this._disabled) {
            this._disabled = newDisabled;
            this._cdr.markForCheck();
        }
    }
    get dateOnlyForDay() {
        return this._disabled;
    }
    set dateOnlyForDay(dateOnlyForDay) {
        this._dateOnlyForDay = dateOnlyForDay != null && `${dateOnlyForDay}` !== 'false';
        this._cdr.markForCheck();
    }
    get viewMode() {
        return this._viewMode;
    }
    set viewMode(viewMode) {
        this._viewMode = viewMode;
        this._buildCalendar();
        this._cdr.markForCheck();
    }
    get selectionMode() {
        return this._selectionMode;
    }
    set selectionMode(selectionMode) {
        this._selectionMode = selectionMode;
        this._cdr.markForCheck();
    }
    get startOfWeekDay() {
        return weekDays[this._startOfWeekDay];
    }
    set startOfWeekDay(weekDay) {
        this._startOfWeekDay = weekDays.indexOf(weekDay);
        if (this._viewMode === 'month') {
            this._buildCalendar();
        }
        this._cdr.markForCheck();
    }
    get isoMode() {
        return this._isoMode;
    }
    set isoMode(isoMode) {
        this._isoMode = isoMode;
        this._buildCalendar();
    }
    get minDate() {
        return this._minDate;
    }
    set minDate(minDate) {
        this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
        this._cdr.markForCheck();
    }
    get maxDate() {
        return this._maxDate;
    }
    set maxDate(maxDate) {
        this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
        this._cdr.markForCheck();
    }
    set selectedPeriod(period) {
        this._selectedPeriod = period;
        this._change.emit({ source: this, period: period });
        this._refreshSelection();
        this._cdr.markForCheck();
    }
    get value() {
        if (this._dateOnlyForDay && this.selectionMode === 'day') {
            return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
        }
        return this._selectedPeriod;
    }
    set value(period) {
        if (this._dateOnlyForDay &&
            this.selectionMode === 'day' &&
            period instanceof Date &&
            (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
            this.selectedPeriod = { type: 'day', startDate: period, endDate: period };
        }
        else if (period instanceof Object && period !== this._selectedPeriod) {
            this.selectedPeriod = period;
            this._onChangeCallback(period);
        }
        this._cdr.markForCheck();
    }
    get calendarHeaders() {
        return this._calendarHeaders;
    }
    get calendarRows() {
        return this._calendarRows;
    }
    get viewHeader() {
        return this._viewHeader;
    }
    prevPage() {
        this.viewDate = this._service.previousView(this._viewDate, this._viewMode);
        this._buildCalendar();
    }
    nextPage() {
        this.viewDate = this._service.nextView(this._viewDate, this._viewMode);
        this._buildCalendar();
    }
    previousViewMode() {
        if (this._viewMode == 'decade') {
            return;
        }
        else if (this._viewMode == 'year') {
            this._viewMode = 'decade';
        }
        else if (this._viewMode == 'month') {
            this._viewMode = 'year';
        }
        this._buildCalendar();
    }
    selectEntry(entry) {
        if (!this._canSelectEntry(entry)) {
            return this._nextViewMode(entry);
        }
        let newPeriod = null;
        if (this._service.isEntrySelected(entry, this._selectedPeriod) == 'full') {
            newPeriod = null;
        }
        else if (this._selectionMode == 'day') {
            newPeriod = { type: 'day', startDate: entry.date, endDate: entry.date };
        }
        else if (this._selectionMode == 'week') {
            newPeriod = {
                type: 'week',
                startDate: this._isoMode
                    ? startOfISOWeek(entry.date)
                    : startOfWeek(entry.date, {
                        weekStartsOn: this._startOfWeekDay,
                    }),
                endDate: this._isoMode
                    ? endOfISOWeek(entry.date)
                    : endOfWeek(entry.date, {
                        weekStartsOn: this._startOfWeekDay,
                    }),
            };
        }
        else if (this._selectionMode == 'month') {
            const monthBounds = this._service.monthBounds(entry.date, this._isoMode);
            newPeriod = {
                type: 'month',
                startDate: new Date(monthBounds.start),
                endDate: new Date(monthBounds.end),
            };
        }
        else if (this._selectionMode == 'year') {
            newPeriod = {
                type: 'year',
                startDate: startOfYear(entry.date),
                endDate: endOfYear(entry.date),
            };
        }
        this.value = newPeriod;
        this._onTouchedCallback();
        this._cdr.markForCheck();
    }
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    writeValue(value) {
        if (typeof value === 'string') {
            value = parse(value);
        }
        this.value = value;
    }
    ngOnInit() {
        this._buildCalendar();
    }
    ngAfterContentInit() {
        this._refreshSelection();
    }
    _setViewDate(date) {
        this._viewDate = date;
    }
    _buildCalendar() {
        const calendarView = this._service.buildView({
            viewMode: this._viewMode,
            viewDate: this._viewDate,
            selection: this._selectedPeriod,
            isoMode: this._isoMode,
            minDate: this._minDate == null ? null : new Date(this._minDate),
            maxDate: this._maxDate == null ? null : new Date(this._maxDate),
        });
        this._viewHeader = calendarView.header;
        this._calendarHeaders = calendarView.headerRow;
        this._calendarRows = calendarView.rows;
        this._cdr.markForCheck();
    }
    _refreshSelection() {
        for (let row of this._calendarRows) {
            for (let entry of row) {
                entry.selected = this._service.isEntrySelected(entry, this._selectedPeriod);
            }
        }
    }
    _canSelectEntry(entry) {
        if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
            return false;
        }
        if (this._selectionMode == 'month' && entry.type == 'year') {
            return false;
        }
        return true;
    }
    _nextViewMode(entry) {
        if (this._viewMode == 'decade') {
            this._viewMode = 'year';
        }
        else if (this._viewMode == 'year') {
            this._viewMode = 'month';
        }
        else if (this._viewMode == 'month') {
            return;
        }
        this._viewDate = entry.date;
        this._buildCalendar();
    }
}
AjfCalendar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfCalendar, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfCalendarService }], target: i0.ɵɵFactoryTarget.Directive });
AjfCalendar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-rc.3", type: AjfCalendar, inputs: { viewDate: "viewDate", disabled: "disabled", dateOnlyForDay: "dateOnlyForDay", viewMode: "viewMode", selectionMode: "selectionMode", startOfWeekDay: "startOfWeekDay", isoMode: "isoMode", minDate: "minDate", maxDate: "maxDate", selectedPeriod: "selectedPeriod", value: "value" }, outputs: { change: "change" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfCalendar, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfCalendarService }]; }, propDecorators: { viewDate: [{
                type: Input
            }], disabled: [{
                type: Input
            }], dateOnlyForDay: [{
                type: Input
            }], viewMode: [{
                type: Input
            }], selectionMode: [{
                type: Input
            }], startOfWeekDay: [{
                type: Input
            }], isoMode: [{
                type: Input
            }], minDate: [{
                type: Input
            }], maxDate: [{
                type: Input
            }], change: [{
                type: Output
            }], selectedPeriod: [{
                type: Input
            }], value: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jYWxlbmRhci9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sR0FDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxTQUFTLEVBQ1QsUUFBUSxJQUFJLEtBQUssRUFDakIsY0FBYyxFQUNkLFdBQVcsRUFDWCxXQUFXLEdBQ1osTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUtoQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7O0FBSXRELE1BQU0sUUFBUSxHQUFhO0lBQ3pCLEVBQUU7SUFDRixRQUFRO0lBQ1IsU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1YsUUFBUTtJQUNSLFVBQVU7SUFDVixRQUFRO0NBQ1QsQ0FBQztBQUVGLE1BQU0sT0FBTyxpQkFBaUI7Q0FHN0I7QUFHRCxNQUFNLE9BQWdCLFdBQVc7SUFzSi9CLFlBQW9CLElBQXVCLEVBQVUsUUFBNEI7UUFBN0QsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQTVJekUsY0FBUyxHQUFHLEtBQUssQ0FBQztRQWFsQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQVV4QixjQUFTLEdBQXdCLE9BQU8sQ0FBQztRQVd6QyxtQkFBYyxHQUEwQixLQUFLLENBQUM7UUFVOUMsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFjcEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQStCMUIsWUFBTyxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUVoRixX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U0FBUyxJQUFJLE9BQU8sRUFBRTtZQUNwQyxPQUFPO1NBQ1I7UUFDRCxJQUFJLENBQUMsU0FBUyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUM7UUFDNUIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7OzZHQWxTbUIsV0FBVztpR0FBWCxXQUFXO2dHQUFYLFdBQVc7a0JBRGhDLFNBQVM7eUlBTUosUUFBUTtzQkFEWCxLQUFLO2dCQVdGLFFBQVE7c0JBRFgsS0FBSztnQkFjRixjQUFjO3NCQURqQixLQUFLO2dCQVdGLFFBQVE7c0JBRFgsS0FBSztnQkFZRixhQUFhO3NCQURoQixLQUFLO2dCQVdGLGNBQWM7c0JBRGpCLEtBQUs7Z0JBZ0JGLE9BQU87c0JBRFYsS0FBSztnQkFXRixPQUFPO3NCQURWLEtBQUs7Z0JBV0YsT0FBTztzQkFEVixLQUFLO2dCQVFHLE1BQU07c0JBRGQsTUFBTTtnQkFLSCxjQUFjO3NCQURqQixLQUFLO2dCQWVGLEtBQUs7c0JBRFIsS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXQsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgZW5kT2ZJU09XZWVrLFxuICBlbmRPZldlZWssXG4gIGVuZE9mWWVhcixcbiAgcGFyc2VJU08gYXMgcGFyc2UsXG4gIHN0YXJ0T2ZJU09XZWVrLFxuICBzdGFydE9mV2VlayxcbiAgc3RhcnRPZlllYXIsXG59IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmQ2FsZW5kYXJFbnRyeX0gZnJvbSAnLi9jYWxlbmRhci1lbnRyeSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyUGVyaW9kfSBmcm9tICcuL2NhbGVuZGFyLXBlcmlvZCc7XG5pbXBvcnQge0FqZkNhbGVuZGFyUGVyaW9kVHlwZX0gZnJvbSAnLi9jYWxlbmRhci1wZXJpb2QtdHlwZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9jYWxlbmRhci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJWaWV3TW9kZX0gZnJvbSAnLi9jYWxlbmRhci12aWV3LW1vZGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhcldlZWtEYXl9IGZyb20gJy4vY2FsZW5kYXItd2Vlay1kYXknO1xuXG5jb25zdCB3ZWVrRGF5czogc3RyaW5nW10gPSBbXG4gICcnLFxuICAnbW9uZGF5JyxcbiAgJ3R1ZXNkYXknLFxuICAnd2VkbmVzZGF5JyxcbiAgJ3RodXJzZGF5JyxcbiAgJ2ZyaWRheScsXG4gICdzYXR1cmRheScsXG4gICdzdW5kYXknLFxuXTtcblxuZXhwb3J0IGNsYXNzIEFqZkNhbGVuZGFyQ2hhbmdlIHtcbiAgc291cmNlOiBBamZDYWxlbmRhcjtcbiAgcGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZCB8IG51bGw7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkNhbGVuZGFyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIGdldCB2aWV3RGF0ZSgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld0RhdGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZpZXdEYXRlKHZpZXdEYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5fc2V0Vmlld0RhdGUodmlld0RhdGUpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmV3RGlzYWJsZWQgPSBkaXNhYmxlZCAhPSBudWxsICYmIGAke2Rpc2FibGVkfWAgIT09ICdmYWxzZSc7XG4gICAgaWYgKG5ld0Rpc2FibGVkICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdEaXNhYmxlZDtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kYXRlT25seUZvckRheSA9IGZhbHNlO1xuICBnZXQgZGF0ZU9ubHlGb3JEYXkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkYXRlT25seUZvckRheShkYXRlT25seUZvckRheTogYm9vbGVhbikge1xuICAgIHRoaXMuX2RhdGVPbmx5Rm9yRGF5ID0gZGF0ZU9ubHlGb3JEYXkgIT0gbnVsbCAmJiBgJHtkYXRlT25seUZvckRheX1gICE9PSAnZmFsc2UnO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlID0gJ21vbnRoJztcbiAgZ2V0IHZpZXdNb2RlKCk6IEFqZkNhbGVuZGFyVmlld01vZGUge1xuICAgIHJldHVybiB0aGlzLl92aWV3TW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmlld01vZGUodmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUgPSAnZGF5JztcbiAgZ2V0IHNlbGVjdGlvbk1vZGUoKTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc2VsZWN0aW9uTW9kZShzZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlID0gc2VsZWN0aW9uTW9kZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zdGFydE9mV2Vla0RheSA9IDE7XG4gIGdldCBzdGFydE9mV2Vla0RheSgpOiBBamZDYWxlbmRhcldlZWtEYXkge1xuICAgIHJldHVybiA8QWpmQ2FsZW5kYXJXZWVrRGF5PndlZWtEYXlzW3RoaXMuX3N0YXJ0T2ZXZWVrRGF5XTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc3RhcnRPZldlZWtEYXkod2Vla0RheTogQWpmQ2FsZW5kYXJXZWVrRGF5KSB7XG4gICAgdGhpcy5fc3RhcnRPZldlZWtEYXkgPSB3ZWVrRGF5cy5pbmRleE9mKHdlZWtEYXkpO1xuXG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzb01vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBnZXQgaXNvTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNvTW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaXNvTW9kZShpc29Nb2RlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNvTW9kZSA9IGlzb01vZGU7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWluRGF0ZTogRGF0ZSB8IG51bGw7XG4gIGdldCBtaW5EYXRlKCk6IERhdGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbWluRGF0ZShtaW5EYXRlOiBEYXRlIHwgbnVsbCkge1xuICAgIHRoaXMuX21pbkRhdGUgPSBtaW5EYXRlICE9IG51bGwgPyBuZXcgRGF0ZShtaW5EYXRlLnZhbHVlT2YoKSkgOiBudWxsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX21heERhdGU6IERhdGUgfCBudWxsO1xuICBnZXQgbWF4RGF0ZSgpOiBEYXRlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG1heERhdGUobWF4RGF0ZTogRGF0ZSB8IG51bGwpIHtcbiAgICB0aGlzLl9tYXhEYXRlID0gbWF4RGF0ZSAhPSBudWxsID8gbmV3IERhdGUobWF4RGF0ZS52YWx1ZU9mKCkpIDogbnVsbDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZDYWxlbmRhckNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkNhbGVuZGFyQ2hhbmdlPigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNhbGVuZGFyQ2hhbmdlPiA9IHRoaXMuX2NoYW5nZSBhcyBPYnNlcnZhYmxlPEFqZkNhbGVuZGFyQ2hhbmdlPjtcblxuICBwcml2YXRlIF9zZWxlY3RlZFBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2QgfCBudWxsO1xuICBASW5wdXQoKVxuICBzZXQgc2VsZWN0ZWRQZXJpb2QocGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZCB8IG51bGwpIHtcbiAgICB0aGlzLl9zZWxlY3RlZFBlcmlvZCA9IHBlcmlvZDtcbiAgICB0aGlzLl9jaGFuZ2UuZW1pdCh7c291cmNlOiB0aGlzLCBwZXJpb2Q6IHBlcmlvZH0pO1xuICAgIHRoaXMuX3JlZnJlc2hTZWxlY3Rpb24oKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogQWpmQ2FsZW5kYXJQZXJpb2QgfCBEYXRlIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2RhdGVPbmx5Rm9yRGF5ICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ2RheScpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFBlcmlvZCAhPSBudWxsID8gdGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlIDogbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUGVyaW9kO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZShwZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgRGF0ZSB8IG51bGwpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLl9kYXRlT25seUZvckRheSAmJlxuICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnZGF5JyAmJlxuICAgICAgcGVyaW9kIGluc3RhbmNlb2YgRGF0ZSAmJlxuICAgICAgKHRoaXMuX3NlbGVjdGVkUGVyaW9kID09IG51bGwgfHwgcGVyaW9kICE9PSB0aGlzLl9zZWxlY3RlZFBlcmlvZC5zdGFydERhdGUpXG4gICAgKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUGVyaW9kID0ge3R5cGU6ICdkYXknLCBzdGFydERhdGU6IHBlcmlvZCwgZW5kRGF0ZTogcGVyaW9kfTtcbiAgICB9IGVsc2UgaWYgKHBlcmlvZCBpbnN0YW5jZW9mIE9iamVjdCAmJiBwZXJpb2QgIT09IHRoaXMuX3NlbGVjdGVkUGVyaW9kKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUGVyaW9kID0gPEFqZkNhbGVuZGFyUGVyaW9kPnBlcmlvZDtcbiAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2socGVyaW9kKTtcbiAgICB9XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGNhbGVuZGFySGVhZGVycygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFySGVhZGVycztcbiAgfVxuICBnZXQgY2FsZW5kYXJSb3dzKCk6IEFqZkNhbGVuZGFyRW50cnlbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXJSb3dzO1xuICB9XG4gIGdldCB2aWV3SGVhZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdIZWFkZXI7XG4gIH1cblxuICBwcml2YXRlIF92aWV3RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gIHByaXZhdGUgX3ZpZXdIZWFkZXIgPSAnJztcblxuICBwcml2YXRlIF9jYWxlbmRhclJvd3M6IEFqZkNhbGVuZGFyRW50cnlbXVtdID0gW107XG4gIHByaXZhdGUgX2NhbGVuZGFySGVhZGVyczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9zZXJ2aWNlOiBBamZDYWxlbmRhclNlcnZpY2UpIHt9XG5cbiAgcHJldlBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3RGF0ZSA9IHRoaXMuX3NlcnZpY2UucHJldmlvdXNWaWV3KHRoaXMuX3ZpZXdEYXRlLCB0aGlzLl92aWV3TW9kZSk7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgbmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3RGF0ZSA9IHRoaXMuX3NlcnZpY2UubmV4dFZpZXcodGhpcy5fdmlld0RhdGUsIHRoaXMuX3ZpZXdNb2RlKTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBwcmV2aW91c1ZpZXdNb2RlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICdkZWNhZGUnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAneWVhcic7XG4gICAgfVxuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHNlbGVjdEVudHJ5KGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9jYW5TZWxlY3RFbnRyeShlbnRyeSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9uZXh0Vmlld01vZGUoZW50cnkpO1xuICAgIH1cblxuICAgIGxldCBuZXdQZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKHRoaXMuX3NlcnZpY2UuaXNFbnRyeVNlbGVjdGVkKGVudHJ5LCB0aGlzLl9zZWxlY3RlZFBlcmlvZCkgPT0gJ2Z1bGwnKSB7XG4gICAgICBuZXdQZXJpb2QgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnZGF5Jykge1xuICAgICAgbmV3UGVyaW9kID0ge3R5cGU6ICdkYXknLCBzdGFydERhdGU6IGVudHJ5LmRhdGUsIGVuZERhdGU6IGVudHJ5LmRhdGV9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnd2VlaycpIHtcbiAgICAgIG5ld1BlcmlvZCA9IHtcbiAgICAgICAgdHlwZTogJ3dlZWsnLFxuICAgICAgICBzdGFydERhdGU6IHRoaXMuX2lzb01vZGVcbiAgICAgICAgICA/IHN0YXJ0T2ZJU09XZWVrKGVudHJ5LmRhdGUpXG4gICAgICAgICAgOiBzdGFydE9mV2VlayhlbnRyeS5kYXRlLCB7XG4gICAgICAgICAgICAgIHdlZWtTdGFydHNPbjogdGhpcy5fc3RhcnRPZldlZWtEYXkgYXMgMCB8IDEgfCAyIHwgMyB8IDQgfCA1IHwgNixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBlbmREYXRlOiB0aGlzLl9pc29Nb2RlXG4gICAgICAgICAgPyBlbmRPZklTT1dlZWsoZW50cnkuZGF0ZSlcbiAgICAgICAgICA6IGVuZE9mV2VlayhlbnRyeS5kYXRlLCB7XG4gICAgICAgICAgICAgIHdlZWtTdGFydHNPbjogdGhpcy5fc3RhcnRPZldlZWtEYXkgYXMgMCB8IDEgfCAyIHwgMyB8IDQgfCA1IHwgNixcbiAgICAgICAgICAgIH0pLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJykge1xuICAgICAgY29uc3QgbW9udGhCb3VuZHMgPSB0aGlzLl9zZXJ2aWNlLm1vbnRoQm91bmRzKGVudHJ5LmRhdGUsIHRoaXMuX2lzb01vZGUpO1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnbW9udGgnLFxuICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKG1vbnRoQm91bmRzLnN0YXJ0KSxcbiAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUobW9udGhCb3VuZHMuZW5kKSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICd5ZWFyJykge1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAneWVhcicsXG4gICAgICAgIHN0YXJ0RGF0ZTogc3RhcnRPZlllYXIoZW50cnkuZGF0ZSksXG4gICAgICAgIGVuZERhdGU6IGVuZE9mWWVhcihlbnRyeS5kYXRlKSxcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSBuZXdQZXJpb2Q7XG5cbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBwYXJzZSh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWZyZXNoU2VsZWN0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBfc2V0Vmlld0RhdGUoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZXdEYXRlID0gZGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgY29uc3QgY2FsZW5kYXJWaWV3ID0gdGhpcy5fc2VydmljZS5idWlsZFZpZXcoe1xuICAgICAgdmlld01vZGU6IHRoaXMuX3ZpZXdNb2RlLFxuICAgICAgdmlld0RhdGU6IHRoaXMuX3ZpZXdEYXRlLFxuICAgICAgc2VsZWN0aW9uOiB0aGlzLl9zZWxlY3RlZFBlcmlvZCxcbiAgICAgIGlzb01vZGU6IHRoaXMuX2lzb01vZGUsXG4gICAgICBtaW5EYXRlOiB0aGlzLl9taW5EYXRlID09IG51bGwgPyBudWxsIDogbmV3IERhdGUodGhpcy5fbWluRGF0ZSksXG4gICAgICBtYXhEYXRlOiB0aGlzLl9tYXhEYXRlID09IG51bGwgPyBudWxsIDogbmV3IERhdGUodGhpcy5fbWF4RGF0ZSksXG4gICAgfSk7XG4gICAgdGhpcy5fdmlld0hlYWRlciA9IGNhbGVuZGFyVmlldy5oZWFkZXI7XG4gICAgdGhpcy5fY2FsZW5kYXJIZWFkZXJzID0gY2FsZW5kYXJWaWV3LmhlYWRlclJvdztcbiAgICB0aGlzLl9jYWxlbmRhclJvd3MgPSBjYWxlbmRhclZpZXcucm93cztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWZyZXNoU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IHJvdyBvZiB0aGlzLl9jYWxlbmRhclJvd3MpIHtcbiAgICAgIGZvciAobGV0IGVudHJ5IG9mIHJvdykge1xuICAgICAgICBlbnRyeS5zZWxlY3RlZCA9IHRoaXMuX3NlcnZpY2UuaXNFbnRyeVNlbGVjdGVkKGVudHJ5LCB0aGlzLl9zZWxlY3RlZFBlcmlvZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FuU2VsZWN0RW50cnkoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoWydkYXknLCAnd2VlayddLmluZGV4T2YodGhpcy5fc2VsZWN0aW9uTW9kZSkgPj0gMCAmJiBlbnRyeS50eXBlICE9ICdkYXknKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICdtb250aCcgJiYgZW50cnkudHlwZSA9PSAneWVhcicpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0Vmlld01vZGUoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ3llYXInO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICdtb250aCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3ZpZXdEYXRlID0gZW50cnkuZGF0ZTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cbn1cbiJdfQ==