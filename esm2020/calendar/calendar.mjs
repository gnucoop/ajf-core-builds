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
import { Directive, EventEmitter, Input, Output, } from '@angular/core';
import { endOfISOWeek, endOfWeek, endOfYear, parseISO as parse, startOfISOWeek, startOfWeek, startOfYear, } from 'date-fns';
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
        this._minDate = null;
        this._maxDate = null;
        this._change = new EventEmitter();
        this.change = this._change;
        this._selectedPeriod = null;
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
AjfCalendar.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCalendar, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfCalendarService }], target: i0.ɵɵFactoryTarget.Directive });
AjfCalendar.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfCalendar, inputs: { viewDate: "viewDate", disabled: "disabled", dateOnlyForDay: "dateOnlyForDay", viewMode: "viewMode", selectionMode: "selectionMode", startOfWeekDay: "startOfWeekDay", isoMode: "isoMode", minDate: "minDate", maxDate: "maxDate", selectedPeriod: "selectedPeriod", value: "value" }, outputs: { change: "change" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCalendar, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2NhbGVuZGFyL3NyYy9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBR0wsU0FBUyxFQUNULFlBQVksRUFDWixLQUFLLEVBRUwsTUFBTSxHQUNQLE1BQU0sZUFBZSxDQUFDO0FBRXZCLE9BQU8sRUFDTCxZQUFZLEVBQ1osU0FBUyxFQUNULFNBQVMsRUFDVCxRQUFRLElBQUksS0FBSyxFQUNqQixjQUFjLEVBQ2QsV0FBVyxFQUNYLFdBQVcsR0FDWixNQUFNLFVBQVUsQ0FBQzs7O0FBVWxCLE1BQU0sUUFBUSxHQUFhO0lBQ3pCLEVBQUU7SUFDRixRQUFRO0lBQ1IsU0FBUztJQUNULFdBQVc7SUFDWCxVQUFVO0lBQ1YsUUFBUTtJQUNSLFVBQVU7SUFDVixRQUFRO0NBQ1QsQ0FBQztBQVFGLE1BQU0sT0FBZ0IsV0FBVztJQXNKL0IsWUFBb0IsSUFBdUIsRUFBVSxRQUE0QjtRQUE3RCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBNUl6RSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBYWxCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBVXhCLGNBQVMsR0FBd0IsT0FBTyxDQUFDO1FBV3pDLG1CQUFjLEdBQTBCLEtBQUssQ0FBQztRQVU5QyxvQkFBZSxHQUFHLENBQUMsQ0FBQztRQWNwQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBVzFCLGFBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBVTdCLGFBQVEsR0FBZ0IsSUFBSSxDQUFDO1FBVTdCLFlBQU8sR0FBb0MsSUFBSSxZQUFZLEVBQXFCLENBQUM7UUFFaEYsV0FBTSxHQUFrQyxJQUFJLENBQUMsT0FBd0MsQ0FBQztRQUV2RixvQkFBZSxHQUE2QixJQUFJLENBQUM7UUF5Q2pELGNBQVMs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QUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7d0dBbFNtQixXQUFXOzRGQUFYLFdBQVc7MkZBQVgsV0FBVztrQkFEaEMsU0FBUzt5SUFNSixRQUFRO3NCQURYLEtBQUs7Z0JBV0YsUUFBUTtzQkFEWCxLQUFLO2dCQWNGLGNBQWM7c0JBRGpCLEtBQUs7Z0JBV0YsUUFBUTtzQkFEWCxLQUFLO2dCQVlGLGFBQWE7c0JBRGhCLEtBQUs7Z0JBV0YsY0FBYztzQkFEakIsS0FBSztnQkFnQkYsT0FBTztzQkFEVixLQUFLO2dCQVdGLE9BQU87c0JBRFYsS0FBSztnQkFXRixPQUFPO3NCQURWLEtBQUs7Z0JBUUcsTUFBTTtzQkFEZCxNQUFNO2dCQUtILGNBQWM7c0JBRGpCLEtBQUs7Z0JBZUYsS0FBSztzQkFEUixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBZnRlckNvbnRlbnRJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkluaXQsXG4gIE91dHB1dCxcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBlbmRPZklTT1dlZWssXG4gIGVuZE9mV2VlayxcbiAgZW5kT2ZZZWFyLFxuICBwYXJzZUlTTyBhcyBwYXJzZSxcbiAgc3RhcnRPZklTT1dlZWssXG4gIHN0YXJ0T2ZXZWVrLFxuICBzdGFydE9mWWVhcixcbn0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZDYWxlbmRhckVudHJ5fSBmcm9tICcuL2NhbGVuZGFyLWVudHJ5JztcbmltcG9ydCB7QWpmQ2FsZW5kYXJQZXJpb2R9IGZyb20gJy4vY2FsZW5kYXItcGVyaW9kJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJQZXJpb2RUeXBlfSBmcm9tICcuL2NhbGVuZGFyLXBlcmlvZC10eXBlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuL2NhbGVuZGFyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZDYWxlbmRhclZpZXdNb2RlfSBmcm9tICcuL2NhbGVuZGFyLXZpZXctbW9kZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyV2Vla0RheX0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLWRheSc7XG5cbmNvbnN0IHdlZWtEYXlzOiBzdHJpbmdbXSA9IFtcbiAgJycsXG4gICdtb25kYXknLFxuICAndHVlc2RheScsXG4gICd3ZWRuZXNkYXknLFxuICAndGh1cnNkYXknLFxuICAnZnJpZGF5JyxcbiAgJ3NhdHVyZGF5JyxcbiAgJ3N1bmRheScsXG5dO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkNhbGVuZGFyQ2hhbmdlIHtcbiAgc291cmNlOiBBamZDYWxlbmRhcjtcbiAgcGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZCB8IG51bGw7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkNhbGVuZGFyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIGdldCB2aWV3RGF0ZSgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld0RhdGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZpZXdEYXRlKHZpZXdEYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5fc2V0Vmlld0RhdGUodmlld0RhdGUpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmV3RGlzYWJsZWQgPSBkaXNhYmxlZCAhPSBudWxsICYmIGAke2Rpc2FibGVkfWAgIT09ICdmYWxzZSc7XG4gICAgaWYgKG5ld0Rpc2FibGVkICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdEaXNhYmxlZDtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kYXRlT25seUZvckRheSA9IGZhbHNlO1xuICBnZXQgZGF0ZU9ubHlGb3JEYXkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkYXRlT25seUZvckRheShkYXRlT25seUZvckRheTogYm9vbGVhbikge1xuICAgIHRoaXMuX2RhdGVPbmx5Rm9yRGF5ID0gZGF0ZU9ubHlGb3JEYXkgIT0gbnVsbCAmJiBgJHtkYXRlT25seUZvckRheX1gICE9PSAnZmFsc2UnO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlID0gJ21vbnRoJztcbiAgZ2V0IHZpZXdNb2RlKCk6IEFqZkNhbGVuZGFyVmlld01vZGUge1xuICAgIHJldHVybiB0aGlzLl92aWV3TW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmlld01vZGUodmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUgPSAnZGF5JztcbiAgZ2V0IHNlbGVjdGlvbk1vZGUoKTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc2VsZWN0aW9uTW9kZShzZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlID0gc2VsZWN0aW9uTW9kZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zdGFydE9mV2Vla0RheSA9IDE7XG4gIGdldCBzdGFydE9mV2Vla0RheSgpOiBBamZDYWxlbmRhcldlZWtEYXkge1xuICAgIHJldHVybiA8QWpmQ2FsZW5kYXJXZWVrRGF5PndlZWtEYXlzW3RoaXMuX3N0YXJ0T2ZXZWVrRGF5XTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc3RhcnRPZldlZWtEYXkod2Vla0RheTogQWpmQ2FsZW5kYXJXZWVrRGF5KSB7XG4gICAgdGhpcy5fc3RhcnRPZldlZWtEYXkgPSB3ZWVrRGF5cy5pbmRleE9mKHdlZWtEYXkpO1xuXG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzb01vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBnZXQgaXNvTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNvTW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaXNvTW9kZShpc29Nb2RlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNvTW9kZSA9IGlzb01vZGU7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWluRGF0ZTogRGF0ZSB8IG51bGwgPSBudWxsO1xuICBnZXQgbWluRGF0ZSgpOiBEYXRlIHwgbnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21pbkRhdGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG1pbkRhdGUobWluRGF0ZTogRGF0ZSB8IG51bGwpIHtcbiAgICB0aGlzLl9taW5EYXRlID0gbWluRGF0ZSAhPSBudWxsID8gbmV3IERhdGUobWluRGF0ZS52YWx1ZU9mKCkpIDogbnVsbDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9tYXhEYXRlOiBEYXRlIHwgbnVsbCA9IG51bGw7XG4gIGdldCBtYXhEYXRlKCk6IERhdGUgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbWF4RGF0ZShtYXhEYXRlOiBEYXRlIHwgbnVsbCkge1xuICAgIHRoaXMuX21heERhdGUgPSBtYXhEYXRlICE9IG51bGwgPyBuZXcgRGF0ZShtYXhEYXRlLnZhbHVlT2YoKSkgOiBudWxsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2NoYW5nZTogRXZlbnRFbWl0dGVyPEFqZkNhbGVuZGFyQ2hhbmdlPiA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmQ2FsZW5kYXJDaGFuZ2U+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBjaGFuZ2U6IE9ic2VydmFibGU8QWpmQ2FsZW5kYXJDaGFuZ2U+ID0gdGhpcy5fY2hhbmdlIGFzIE9ic2VydmFibGU8QWpmQ2FsZW5kYXJDaGFuZ2U+O1xuXG4gIHByaXZhdGUgX3NlbGVjdGVkUGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZCB8IG51bGwgPSBudWxsO1xuICBASW5wdXQoKVxuICBzZXQgc2VsZWN0ZWRQZXJpb2QocGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZCB8IG51bGwpIHtcbiAgICB0aGlzLl9zZWxlY3RlZFBlcmlvZCA9IHBlcmlvZDtcbiAgICB0aGlzLl9jaGFuZ2UuZW1pdCh7c291cmNlOiB0aGlzLCBwZXJpb2Q6IHBlcmlvZH0pO1xuICAgIHRoaXMuX3JlZnJlc2hTZWxlY3Rpb24oKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogQWpmQ2FsZW5kYXJQZXJpb2QgfCBEYXRlIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2RhdGVPbmx5Rm9yRGF5ICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ2RheScpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFBlcmlvZCAhPSBudWxsID8gdGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlIDogbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUGVyaW9kO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZShwZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgRGF0ZSB8IG51bGwpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLl9kYXRlT25seUZvckRheSAmJlxuICAgICAgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnZGF5JyAmJlxuICAgICAgcGVyaW9kIGluc3RhbmNlb2YgRGF0ZSAmJlxuICAgICAgKHRoaXMuX3NlbGVjdGVkUGVyaW9kID09IG51bGwgfHwgcGVyaW9kICE9PSB0aGlzLl9zZWxlY3RlZFBlcmlvZC5zdGFydERhdGUpXG4gICAgKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUGVyaW9kID0ge3R5cGU6ICdkYXknLCBzdGFydERhdGU6IHBlcmlvZCwgZW5kRGF0ZTogcGVyaW9kfTtcbiAgICB9IGVsc2UgaWYgKHBlcmlvZCBpbnN0YW5jZW9mIE9iamVjdCAmJiBwZXJpb2QgIT09IHRoaXMuX3NlbGVjdGVkUGVyaW9kKSB7XG4gICAgICB0aGlzLnNlbGVjdGVkUGVyaW9kID0gPEFqZkNhbGVuZGFyUGVyaW9kPnBlcmlvZDtcbiAgICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2socGVyaW9kKTtcbiAgICB9XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IGNhbGVuZGFySGVhZGVycygpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFySGVhZGVycztcbiAgfVxuICBnZXQgY2FsZW5kYXJSb3dzKCk6IEFqZkNhbGVuZGFyRW50cnlbXVtdIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXJSb3dzO1xuICB9XG4gIGdldCB2aWV3SGVhZGVyKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdIZWFkZXI7XG4gIH1cblxuICBwcml2YXRlIF92aWV3RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKCk7XG4gIHByaXZhdGUgX3ZpZXdIZWFkZXIgPSAnJztcblxuICBwcml2YXRlIF9jYWxlbmRhclJvd3M6IEFqZkNhbGVuZGFyRW50cnlbXVtdID0gW107XG4gIHByaXZhdGUgX2NhbGVuZGFySGVhZGVyczogc3RyaW5nW10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIF9zZXJ2aWNlOiBBamZDYWxlbmRhclNlcnZpY2UpIHt9XG5cbiAgcHJldlBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3RGF0ZSA9IHRoaXMuX3NlcnZpY2UucHJldmlvdXNWaWV3KHRoaXMuX3ZpZXdEYXRlLCB0aGlzLl92aWV3TW9kZSk7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgbmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3RGF0ZSA9IHRoaXMuX3NlcnZpY2UubmV4dFZpZXcodGhpcy5fdmlld0RhdGUsIHRoaXMuX3ZpZXdNb2RlKTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBwcmV2aW91c1ZpZXdNb2RlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICdkZWNhZGUnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAneWVhcic7XG4gICAgfVxuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHNlbGVjdEVudHJ5KGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9jYW5TZWxlY3RFbnRyeShlbnRyeSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9uZXh0Vmlld01vZGUoZW50cnkpO1xuICAgIH1cblxuICAgIGxldCBuZXdQZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKHRoaXMuX3NlcnZpY2UuaXNFbnRyeVNlbGVjdGVkKGVudHJ5LCB0aGlzLl9zZWxlY3RlZFBlcmlvZCkgPT0gJ2Z1bGwnKSB7XG4gICAgICBuZXdQZXJpb2QgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnZGF5Jykge1xuICAgICAgbmV3UGVyaW9kID0ge3R5cGU6ICdkYXknLCBzdGFydERhdGU6IGVudHJ5LmRhdGUsIGVuZERhdGU6IGVudHJ5LmRhdGV9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnd2VlaycpIHtcbiAgICAgIG5ld1BlcmlvZCA9IHtcbiAgICAgICAgdHlwZTogJ3dlZWsnLFxuICAgICAgICBzdGFydERhdGU6IHRoaXMuX2lzb01vZGVcbiAgICAgICAgICA/IHN0YXJ0T2ZJU09XZWVrKGVudHJ5LmRhdGUpXG4gICAgICAgICAgOiBzdGFydE9mV2VlayhlbnRyeS5kYXRlLCB7XG4gICAgICAgICAgICAgIHdlZWtTdGFydHNPbjogdGhpcy5fc3RhcnRPZldlZWtEYXkgYXMgMCB8IDEgfCAyIHwgMyB8IDQgfCA1IHwgNixcbiAgICAgICAgICAgIH0pLFxuICAgICAgICBlbmREYXRlOiB0aGlzLl9pc29Nb2RlXG4gICAgICAgICAgPyBlbmRPZklTT1dlZWsoZW50cnkuZGF0ZSlcbiAgICAgICAgICA6IGVuZE9mV2VlayhlbnRyeS5kYXRlLCB7XG4gICAgICAgICAgICAgIHdlZWtTdGFydHNPbjogdGhpcy5fc3RhcnRPZldlZWtEYXkgYXMgMCB8IDEgfCAyIHwgMyB8IDQgfCA1IHwgNixcbiAgICAgICAgICAgIH0pLFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJykge1xuICAgICAgY29uc3QgbW9udGhCb3VuZHMgPSB0aGlzLl9zZXJ2aWNlLm1vbnRoQm91bmRzKGVudHJ5LmRhdGUsIHRoaXMuX2lzb01vZGUpO1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnbW9udGgnLFxuICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKG1vbnRoQm91bmRzLnN0YXJ0KSxcbiAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUobW9udGhCb3VuZHMuZW5kKSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICd5ZWFyJykge1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAneWVhcicsXG4gICAgICAgIHN0YXJ0RGF0ZTogc3RhcnRPZlllYXIoZW50cnkuZGF0ZSksXG4gICAgICAgIGVuZERhdGU6IGVuZE9mWWVhcihlbnRyeS5kYXRlKSxcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSBuZXdQZXJpb2Q7XG5cbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBwYXJzZSh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWZyZXNoU2VsZWN0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKF86IGFueSkgPT4ge307XG4gIHByaXZhdGUgX29uVG91Y2hlZENhbGxiYWNrOiAoKSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgcHJpdmF0ZSBfc2V0Vmlld0RhdGUoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZXdEYXRlID0gZGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgY29uc3QgY2FsZW5kYXJWaWV3ID0gdGhpcy5fc2VydmljZS5idWlsZFZpZXcoe1xuICAgICAgdmlld01vZGU6IHRoaXMuX3ZpZXdNb2RlLFxuICAgICAgdmlld0RhdGU6IHRoaXMuX3ZpZXdEYXRlLFxuICAgICAgc2VsZWN0aW9uOiB0aGlzLl9zZWxlY3RlZFBlcmlvZCxcbiAgICAgIGlzb01vZGU6IHRoaXMuX2lzb01vZGUsXG4gICAgICBtaW5EYXRlOiB0aGlzLl9taW5EYXRlID09IG51bGwgPyBudWxsIDogbmV3IERhdGUodGhpcy5fbWluRGF0ZSksXG4gICAgICBtYXhEYXRlOiB0aGlzLl9tYXhEYXRlID09IG51bGwgPyBudWxsIDogbmV3IERhdGUodGhpcy5fbWF4RGF0ZSksXG4gICAgfSk7XG4gICAgdGhpcy5fdmlld0hlYWRlciA9IGNhbGVuZGFyVmlldy5oZWFkZXI7XG4gICAgdGhpcy5fY2FsZW5kYXJIZWFkZXJzID0gY2FsZW5kYXJWaWV3LmhlYWRlclJvdztcbiAgICB0aGlzLl9jYWxlbmRhclJvd3MgPSBjYWxlbmRhclZpZXcucm93cztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWZyZXNoU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IHJvdyBvZiB0aGlzLl9jYWxlbmRhclJvd3MpIHtcbiAgICAgIGZvciAobGV0IGVudHJ5IG9mIHJvdykge1xuICAgICAgICBlbnRyeS5zZWxlY3RlZCA9IHRoaXMuX3NlcnZpY2UuaXNFbnRyeVNlbGVjdGVkKGVudHJ5LCB0aGlzLl9zZWxlY3RlZFBlcmlvZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FuU2VsZWN0RW50cnkoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoWydkYXknLCAnd2VlayddLmluZGV4T2YodGhpcy5fc2VsZWN0aW9uTW9kZSkgPj0gMCAmJiBlbnRyeS50eXBlICE9ICdkYXknKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICdtb250aCcgJiYgZW50cnkudHlwZSA9PSAneWVhcicpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0Vmlld01vZGUoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ3llYXInO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICdtb250aCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3ZpZXdEYXRlID0gZW50cnkuZGF0ZTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cbn1cbiJdfQ==