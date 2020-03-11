/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { endOfISOWeek, endOfWeek, endOfYear, parseISO as parse, startOfISOWeek, startOfWeek, startOfYear } from 'date-fns';
import { Observable } from 'rxjs';
import { AjfCalendarService } from './calendar-service';
/** @type {?} */
const weekDays = [
    '', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];
export class AjfCalendarChange {
}
if (false) {
    /** @type {?} */
    AjfCalendarChange.prototype.source;
    /** @type {?} */
    AjfCalendarChange.prototype.period;
}
/**
 * @abstract
 */
export class AjfCalendar {
    /**
     * @param {?} _cdr
     * @param {?} _service
     */
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
        this.change = this._change.asObservable();
        this._viewDate = new Date();
        this._viewHeader = '';
        this._calendarRows = [];
        this._calendarHeaders = [];
        this._onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        (_) => { });
        this._onTouchedCallback = (/**
         * @return {?}
         */
        () => { });
    }
    /**
     * @return {?}
     */
    get viewDate() { return this._viewDate; }
    /**
     * @param {?} viewDate
     * @return {?}
     */
    set viewDate(viewDate) {
        this._setViewDate(viewDate);
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get disabled() { return this._disabled; }
    /**
     * @param {?} disabled
     * @return {?}
     */
    set disabled(disabled) {
        /** @type {?} */
        const newDisabled = disabled != null && `${disabled}` !== 'false';
        if (newDisabled !== this._disabled) {
            this._disabled = newDisabled;
            this._cdr.markForCheck();
        }
    }
    /**
     * @return {?}
     */
    get dateOnlyForDay() { return this._disabled; }
    /**
     * @param {?} dateOnlyForDay
     * @return {?}
     */
    set dateOnlyForDay(dateOnlyForDay) {
        this._dateOnlyForDay = dateOnlyForDay != null && `${dateOnlyForDay}` !== 'false';
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get viewMode() { return this._viewMode; }
    /**
     * @param {?} viewMode
     * @return {?}
     */
    set viewMode(viewMode) {
        this._viewMode = viewMode;
        this._buildCalendar();
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get selectionMode() { return this._selectionMode; }
    /**
     * @param {?} selectionMode
     * @return {?}
     */
    set selectionMode(selectionMode) {
        this._selectionMode = selectionMode;
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get startOfWeekDay() {
        return (/** @type {?} */ (weekDays[this._startOfWeekDay]));
    }
    /**
     * @param {?} weekDay
     * @return {?}
     */
    set startOfWeekDay(weekDay) {
        this._startOfWeekDay = weekDays.indexOf(weekDay);
        if (this._viewMode === 'month') {
            this._buildCalendar();
        }
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get isoMode() { return this._isoMode; }
    /**
     * @param {?} isoMode
     * @return {?}
     */
    set isoMode(isoMode) {
        this._isoMode = isoMode;
        this._buildCalendar();
    }
    /**
     * @return {?}
     */
    get minDate() { return this._minDate; }
    /**
     * @param {?} minDate
     * @return {?}
     */
    set minDate(minDate) {
        this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get maxDate() { return this._maxDate; }
    /**
     * @param {?} maxDate
     * @return {?}
     */
    set maxDate(maxDate) {
        this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
        this._cdr.markForCheck();
    }
    /**
     * @param {?} period
     * @return {?}
     */
    set selectedPeriod(period) {
        this._selectedPeriod = period;
        this._change.emit({
            source: this,
            period: period
        });
        this._refreshSelection();
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get value() {
        if (this._dateOnlyForDay && this.selectionMode === 'day') {
            return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
        }
        return this._selectedPeriod;
    }
    /**
     * @param {?} period
     * @return {?}
     */
    set value(period) {
        if (this._dateOnlyForDay && this.selectionMode === 'day' && period instanceof Date
            && (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
            this.selectedPeriod = {
                type: 'day',
                startDate: period,
                endDate: period
            };
        }
        else if (period instanceof Object && period !== this._selectedPeriod) {
            this.selectedPeriod = (/** @type {?} */ (period));
            this._onChangeCallback(period);
        }
        this._cdr.markForCheck();
    }
    /**
     * @return {?}
     */
    get calendarHeaders() { return this._calendarHeaders; }
    /**
     * @return {?}
     */
    get calendarRows() { return this._calendarRows; }
    /**
     * @return {?}
     */
    get viewHeader() { return this._viewHeader; }
    /**
     * @return {?}
     */
    prevPage() {
        this.viewDate = this._service.previousView(this._viewDate, this._viewMode);
        this._buildCalendar();
    }
    /**
     * @return {?}
     */
    nextPage() {
        this.viewDate = this._service.nextView(this._viewDate, this._viewMode);
        this._buildCalendar();
    }
    /**
     * @return {?}
     */
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
    /**
     * @param {?} entry
     * @return {?}
     */
    selectEntry(entry) {
        if (!this._canSelectEntry(entry)) {
            return this._nextViewMode(entry);
        }
        /** @type {?} */
        let newPeriod = null;
        if (this._service.isEntrySelected(entry, this._selectedPeriod) == 'full') {
            newPeriod = null;
        }
        else if (this._selectionMode == 'day') {
            newPeriod = {
                type: 'day',
                startDate: entry.date,
                endDate: entry.date
            };
        }
        else if (this._selectionMode == 'week') {
            newPeriod = {
                type: 'week',
                startDate: this._isoMode ?
                    startOfISOWeek(entry.date) :
                    startOfWeek(entry.date, { weekStartsOn: (/** @type {?} */ (this._startOfWeekDay)) }),
                endDate: this._isoMode ?
                    endOfISOWeek(entry.date) :
                    endOfWeek(entry.date, { weekStartsOn: (/** @type {?} */ (this._startOfWeekDay)) })
            };
        }
        else if (this._selectionMode == 'month') {
            /** @type {?} */
            const monthBounds = this._service.monthBounds(entry.date, this._isoMode);
            newPeriod = {
                type: 'month',
                startDate: new Date(monthBounds.start),
                endDate: new Date(monthBounds.end)
            };
        }
        else if (this._selectionMode == 'year') {
            newPeriod = {
                type: 'year',
                startDate: startOfYear(entry.date),
                endDate: endOfYear(entry.date)
            };
        }
        this.value = newPeriod;
        this._onTouchedCallback();
        this._cdr.markForCheck();
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnChange(fn) {
        this._onChangeCallback = fn;
    }
    /**
     * @param {?} fn
     * @return {?}
     */
    registerOnTouched(fn) {
        this._onTouchedCallback = fn;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    writeValue(value) {
        if (typeof value === 'string') {
            value = parse(value);
        }
        this.value = value;
    }
    /**
     * @return {?}
     */
    ngOnInit() {
        this._buildCalendar();
    }
    /**
     * @return {?}
     */
    ngAfterContentInit() {
        this._refreshSelection();
    }
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    _setViewDate(date) {
        this._viewDate = date;
    }
    /**
     * @private
     * @return {?}
     */
    _buildCalendar() {
        /** @type {?} */
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
    /**
     * @private
     * @return {?}
     */
    _refreshSelection() {
        for (let row of this._calendarRows) {
            for (let entry of row) {
                entry.selected = this._service.isEntrySelected(entry, this._selectedPeriod);
            }
        }
    }
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    _canSelectEntry(entry) {
        if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
            return false;
        }
        if (this._selectionMode == 'month' && entry.type == 'year') {
            return false;
        }
        return true;
    }
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
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
AjfCalendar.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfCalendar.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfCalendarService }
];
AjfCalendar.propDecorators = {
    viewDate: [{ type: Input }],
    disabled: [{ type: Input }],
    dateOnlyForDay: [{ type: Input }],
    viewMode: [{ type: Input }],
    selectionMode: [{ type: Input }],
    startOfWeekDay: [{ type: Input }],
    isoMode: [{ type: Input }],
    minDate: [{ type: Input }],
    maxDate: [{ type: Input }],
    change: [{ type: Output }],
    selectedPeriod: [{ type: Input }],
    value: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._disabled;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._dateOnlyForDay;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._viewMode;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._selectionMode;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._startOfWeekDay;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._isoMode;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._minDate;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._maxDate;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._change;
    /** @type {?} */
    AjfCalendar.prototype.change;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._selectedPeriod;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._viewDate;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._viewHeader;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._calendarRows;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._calendarHeaders;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._onChangeCallback;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._onTouchedCallback;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._cdr;
    /**
     * @type {?}
     * @private
     */
    AjfCalendar.prototype._service;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jYWxlbmRhci9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQW1CLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUNqRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsSUFBSSxLQUFLLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFDeEYsV0FBVyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFLaEMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7O01BSWhELFFBQVEsR0FBYTtJQUN6QixFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUTtDQUNqRjtBQUVELE1BQU0sT0FBTyxpQkFBaUI7Q0FHN0I7OztJQUZDLG1DQUFvQjs7SUFDcEIsbUNBQWlDOzs7OztBQUluQyxNQUFNLE9BQWdCLFdBQVc7Ozs7O0lBeUgvQixZQUFvQixJQUF1QixFQUFVLFFBQTRCO1FBQTdELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFsSHpFLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFVbEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFPeEIsY0FBUyxHQUF3QixPQUFPLENBQUM7UUFRekMsbUJBQWMsR0FBMEIsS0FBSyxDQUFDO1FBTzlDLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBYXBCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFzQjFCLFlBQU8sR0FBb0MsSUFB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QyxLQUF1QjtRQUMzQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUMxQjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7WUF0UUYsU0FBUzs7OztZQXZCZ0IsaUJBQWlCO1lBVW5DLGtCQUFrQjs7O3VCQWdCdkIsS0FBSzt1QkFPTCxLQUFLOzZCQVVMLEtBQUs7dUJBT0wsS0FBSzs0QkFRTCxLQUFLOzZCQVNMLEtBQUs7c0JBWUwsS0FBSztzQkFPTCxLQUFLO3NCQU9MLEtBQUs7cUJBTUwsTUFBTTs2QkFHTixLQUFLO29CQWdCTCxLQUFLOzs7Ozs7O0lBdkZOLGdDQUEwQjs7Ozs7SUFVMUIsc0NBQWdDOzs7OztJQU9oQyxnQ0FBaUQ7Ozs7O0lBUWpELHFDQUFzRDs7Ozs7SUFPdEQsc0NBQTRCOzs7OztJQWE1QiwrQkFBa0M7Ozs7O0lBUWxDLCtCQUE4Qjs7Ozs7SUFPOUIsK0JBQThCOzs7OztJQU85Qiw4QkFBeUY7O0lBQ3pGLDZCQUF1Rjs7Ozs7SUFFdkYsc0NBQWtEOzs7OztJQXNDbEQsZ0NBQXFDOzs7OztJQUNyQyxrQ0FBeUI7Ozs7O0lBRXpCLG9DQUFpRDs7Ozs7SUFDakQsdUNBQXdDOzs7OztJQTRGeEMsd0NBQThEOzs7OztJQUM5RCx5Q0FBbUQ7Ozs7O0lBM0Z2QywyQkFBK0I7Ozs7O0lBQUUsK0JBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsXG4gIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7ZW5kT2ZJU09XZWVrLCBlbmRPZldlZWssIGVuZE9mWWVhciwgcGFyc2VJU08gYXMgcGFyc2UsIHN0YXJ0T2ZJU09XZWVrLCBzdGFydE9mV2VlayxcbiAgc3RhcnRPZlllYXJ9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmQ2FsZW5kYXJFbnRyeX0gZnJvbSAnLi9jYWxlbmRhci1lbnRyeSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyUGVyaW9kVHlwZX0gZnJvbSAnLi9jYWxlbmRhci1wZXJpb2QtdHlwZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyUGVyaW9kfSBmcm9tICcuL2NhbGVuZGFyLXBlcmlvZCc7XG5pbXBvcnQge0FqZkNhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9jYWxlbmRhci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJWaWV3TW9kZX0gZnJvbSAnLi9jYWxlbmRhci12aWV3LW1vZGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhcldlZWtEYXl9IGZyb20gJy4vY2FsZW5kYXItd2Vlay1kYXknO1xuXG5jb25zdCB3ZWVrRGF5czogc3RyaW5nW10gPSBbXG4gICcnLCAnbW9uZGF5JywgJ3R1ZXNkYXknLCAnd2VkbmVzZGF5JywgJ3RodXJzZGF5JywgJ2ZyaWRheScsICdzYXR1cmRheScsICdzdW5kYXknXG5dO1xuXG5leHBvcnQgY2xhc3MgQWpmQ2FsZW5kYXJDaGFuZ2Uge1xuICBzb3VyY2U6IEFqZkNhbGVuZGFyO1xuICBwZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgbnVsbDtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQ2FsZW5kYXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgZ2V0IHZpZXdEYXRlKCk6IERhdGUgeyByZXR1cm4gdGhpcy5fdmlld0RhdGU7IH1cbiAgQElucHV0KCkgc2V0IHZpZXdEYXRlKHZpZXdEYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5fc2V0Vmlld0RhdGUodmlld0RhdGUpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIGNvbnN0IG5ld0Rpc2FibGVkID0gZGlzYWJsZWQgIT0gbnVsbCAmJiBgJHtkaXNhYmxlZH1gICE9PSAnZmFsc2UnO1xuICAgIGlmIChuZXdEaXNhYmxlZCAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3RGlzYWJsZWQ7XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGF0ZU9ubHlGb3JEYXkgPSBmYWxzZTtcbiAgZ2V0IGRhdGVPbmx5Rm9yRGF5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgQElucHV0KCkgc2V0IGRhdGVPbmx5Rm9yRGF5KGRhdGVPbmx5Rm9yRGF5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGF0ZU9ubHlGb3JEYXkgPSBkYXRlT25seUZvckRheSAhPSBudWxsICYmIGAke2RhdGVPbmx5Rm9yRGF5fWAgIT09ICdmYWxzZSc7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUgPSAnbW9udGgnO1xuICBnZXQgdmlld01vZGUoKTogQWpmQ2FsZW5kYXJWaWV3TW9kZSB7IHJldHVybiB0aGlzLl92aWV3TW9kZTsgfVxuICBASW5wdXQoKSBzZXQgdmlld01vZGUodmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUgPSAnZGF5JztcbiAgZ2V0IHNlbGVjdGlvbk1vZGUoKTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbk1vZGU7IH1cbiAgQElucHV0KCkgc2V0IHNlbGVjdGlvbk1vZGUoc2VsZWN0aW9uTW9kZTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZSA9IHNlbGVjdGlvbk1vZGU7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhcnRPZldlZWtEYXkgPSAxO1xuICBnZXQgc3RhcnRPZldlZWtEYXkoKTogQWpmQ2FsZW5kYXJXZWVrRGF5IHtcbiAgICByZXR1cm4gPEFqZkNhbGVuZGFyV2Vla0RheT53ZWVrRGF5c1t0aGlzLl9zdGFydE9mV2Vla0RheV07XG4gIH1cbiAgQElucHV0KCkgc2V0IHN0YXJ0T2ZXZWVrRGF5KHdlZWtEYXk6IEFqZkNhbGVuZGFyV2Vla0RheSkge1xuICAgIHRoaXMuX3N0YXJ0T2ZXZWVrRGF5ID0gd2Vla0RheXMuaW5kZXhPZih3ZWVrRGF5KTtcblxuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICAgIH1cbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9pc29Nb2RlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGlzb01vZGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc29Nb2RlOyB9XG4gIEBJbnB1dCgpIHNldCBpc29Nb2RlKGlzb01vZGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc29Nb2RlID0gaXNvTW9kZTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBwcml2YXRlIF9taW5EYXRlOiBEYXRlIHwgbnVsbDtcbiAgZ2V0IG1pbkRhdGUoKTogRGF0ZSB8IG51bGwgeyByZXR1cm4gdGhpcy5fbWluRGF0ZTsgfVxuICBASW5wdXQoKSBzZXQgbWluRGF0ZShtaW5EYXRlOiBEYXRlIHwgbnVsbCkge1xuICAgIHRoaXMuX21pbkRhdGUgPSBtaW5EYXRlICE9IG51bGwgPyBuZXcgRGF0ZShtaW5EYXRlLnZhbHVlT2YoKSkgOiBudWxsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX21heERhdGU6IERhdGUgfCBudWxsO1xuICBnZXQgbWF4RGF0ZSgpOiBEYXRlIHwgbnVsbCB7IHJldHVybiB0aGlzLl9tYXhEYXRlOyB9XG4gIEBJbnB1dCgpIHNldCBtYXhEYXRlKG1heERhdGU6IERhdGUgfCBudWxsKSB7XG4gICAgdGhpcy5fbWF4RGF0ZSA9IG1heERhdGUgIT0gbnVsbCA/IG5ldyBEYXRlKG1heERhdGUudmFsdWVPZigpKSA6IG51bGw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmQ2FsZW5kYXJDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZDYWxlbmRhckNoYW5nZT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDYWxlbmRhckNoYW5nZT4gPSB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRQZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgbnVsbDtcbiAgQElucHV0KCkgc2V0IHNlbGVjdGVkUGVyaW9kKHBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2QgfCBudWxsKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRQZXJpb2QgPSBwZXJpb2Q7XG4gICAgdGhpcy5fY2hhbmdlLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgcGVyaW9kOiBwZXJpb2RcbiAgICB9KTtcbiAgICB0aGlzLl9yZWZyZXNoU2VsZWN0aW9uKCk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IEFqZkNhbGVuZGFyUGVyaW9kIHwgRGF0ZSB8IG51bGwge1xuICAgIGlmICh0aGlzLl9kYXRlT25seUZvckRheSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdkYXknKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRQZXJpb2QgIT0gbnVsbCA/IHRoaXMuX3NlbGVjdGVkUGVyaW9kLnN0YXJ0RGF0ZSA6IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFBlcmlvZDtcbiAgfVxuICBASW5wdXQoKSBzZXQgdmFsdWUocGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZCB8IERhdGUgfCBudWxsKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5fZGF0ZU9ubHlGb3JEYXkgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnZGF5JyAmJiBwZXJpb2QgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAmJiAodGhpcy5fc2VsZWN0ZWRQZXJpb2QgPT0gbnVsbCB8fCBwZXJpb2QgIT09IHRoaXMuX3NlbGVjdGVkUGVyaW9kLnN0YXJ0RGF0ZSlcbiAgICApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICdkYXknLFxuICAgICAgICBzdGFydERhdGU6IHBlcmlvZCxcbiAgICAgICAgZW5kRGF0ZTogcGVyaW9kXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAocGVyaW9kIGluc3RhbmNlb2YgT2JqZWN0ICYmIHBlcmlvZCAhPT0gdGhpcy5fc2VsZWN0ZWRQZXJpb2QpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQZXJpb2QgPSA8QWpmQ2FsZW5kYXJQZXJpb2Q+cGVyaW9kO1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayhwZXJpb2QpO1xuICAgIH1cbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgY2FsZW5kYXJIZWFkZXJzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX2NhbGVuZGFySGVhZGVyczsgfVxuICBnZXQgY2FsZW5kYXJSb3dzKCk6IEFqZkNhbGVuZGFyRW50cnlbXVtdIHsgcmV0dXJuIHRoaXMuX2NhbGVuZGFyUm93czsgfVxuICBnZXQgdmlld0hlYWRlcigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdmlld0hlYWRlcjsgfVxuXG4gIHByaXZhdGUgX3ZpZXdEYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgcHJpdmF0ZSBfdmlld0hlYWRlciA9ICcnO1xuXG4gIHByaXZhdGUgX2NhbGVuZGFyUm93czogQWpmQ2FsZW5kYXJFbnRyeVtdW10gPSBbXTtcbiAgcHJpdmF0ZSBfY2FsZW5kYXJIZWFkZXJzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX3NlcnZpY2U6IEFqZkNhbGVuZGFyU2VydmljZSkgeyB9XG5cbiAgcHJldlBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3RGF0ZSA9IHRoaXMuX3NlcnZpY2UucHJldmlvdXNWaWV3KHRoaXMuX3ZpZXdEYXRlLCB0aGlzLl92aWV3TW9kZSk7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgbmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3RGF0ZSA9IHRoaXMuX3NlcnZpY2UubmV4dFZpZXcodGhpcy5fdmlld0RhdGUsIHRoaXMuX3ZpZXdNb2RlKTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBwcmV2aW91c1ZpZXdNb2RlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICdkZWNhZGUnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAneWVhcic7XG4gICAgfVxuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHNlbGVjdEVudHJ5KGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9jYW5TZWxlY3RFbnRyeShlbnRyeSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9uZXh0Vmlld01vZGUoZW50cnkpO1xuICAgIH1cblxuICAgIGxldCBuZXdQZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKHRoaXMuX3NlcnZpY2UuaXNFbnRyeVNlbGVjdGVkKGVudHJ5LCB0aGlzLl9zZWxlY3RlZFBlcmlvZCkgPT0gJ2Z1bGwnKSB7XG4gICAgICBuZXdQZXJpb2QgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnZGF5Jykge1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnZGF5JyxcbiAgICAgICAgc3RhcnREYXRlOiBlbnRyeS5kYXRlLFxuICAgICAgICBlbmREYXRlOiBlbnRyeS5kYXRlXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnd2VlaycpIHtcbiAgICAgIG5ld1BlcmlvZCA9IHtcbiAgICAgICAgdHlwZTogJ3dlZWsnLFxuICAgICAgICBzdGFydERhdGU6IHRoaXMuX2lzb01vZGUgP1xuICAgICAgICAgIHN0YXJ0T2ZJU09XZWVrKGVudHJ5LmRhdGUpIDpcbiAgICAgICAgICBzdGFydE9mV2VlayhlbnRyeS5kYXRlLCB7d2Vla1N0YXJ0c09uOiB0aGlzLl9zdGFydE9mV2Vla0RheSBhcyAwfDF8MnwzfDR8NXw2fSksXG4gICAgICAgIGVuZERhdGU6IHRoaXMuX2lzb01vZGUgP1xuICAgICAgICAgIGVuZE9mSVNPV2VlayhlbnRyeS5kYXRlKSA6XG4gICAgICAgICAgZW5kT2ZXZWVrKGVudHJ5LmRhdGUsIHt3ZWVrU3RhcnRzT246IHRoaXMuX3N0YXJ0T2ZXZWVrRGF5IGFzIDB8MXwyfDN8NHw1fDZ9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJykge1xuICAgICAgY29uc3QgbW9udGhCb3VuZHMgPSB0aGlzLl9zZXJ2aWNlLm1vbnRoQm91bmRzKGVudHJ5LmRhdGUsIHRoaXMuX2lzb01vZGUpO1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnbW9udGgnLFxuICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKG1vbnRoQm91bmRzLnN0YXJ0KSxcbiAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUobW9udGhCb3VuZHMuZW5kKVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ3llYXInKSB7XG4gICAgICBuZXdQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICd5ZWFyJyxcbiAgICAgICAgc3RhcnREYXRlOiBzdGFydE9mWWVhcihlbnRyeS5kYXRlKSxcbiAgICAgICAgZW5kRGF0ZTogZW5kT2ZZZWFyKGVudHJ5LmRhdGUpXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gbmV3UGVyaW9kO1xuXG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gcGFyc2UodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVmcmVzaFNlbGVjdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IChfOiBhbnkpID0+IHsgfTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgcHJpdmF0ZSBfc2V0Vmlld0RhdGUoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZXdEYXRlID0gZGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgY29uc3QgY2FsZW5kYXJWaWV3ID0gdGhpcy5fc2VydmljZS5idWlsZFZpZXcoe1xuICAgICAgdmlld01vZGU6IHRoaXMuX3ZpZXdNb2RlLFxuICAgICAgdmlld0RhdGU6IHRoaXMuX3ZpZXdEYXRlLFxuICAgICAgc2VsZWN0aW9uOiB0aGlzLl9zZWxlY3RlZFBlcmlvZCxcbiAgICAgIGlzb01vZGU6IHRoaXMuX2lzb01vZGUsXG4gICAgICBtaW5EYXRlOiB0aGlzLl9taW5EYXRlID09IG51bGwgPyBudWxsIDogbmV3IERhdGUodGhpcy5fbWluRGF0ZSksXG4gICAgICBtYXhEYXRlOiB0aGlzLl9tYXhEYXRlID09IG51bGwgPyBudWxsIDogbmV3IERhdGUodGhpcy5fbWF4RGF0ZSksXG4gICAgfSk7XG4gICAgdGhpcy5fdmlld0hlYWRlciA9IGNhbGVuZGFyVmlldy5oZWFkZXI7XG4gICAgdGhpcy5fY2FsZW5kYXJIZWFkZXJzID0gY2FsZW5kYXJWaWV3LmhlYWRlclJvdztcbiAgICB0aGlzLl9jYWxlbmRhclJvd3MgPSBjYWxlbmRhclZpZXcucm93cztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWZyZXNoU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IHJvdyBvZiB0aGlzLl9jYWxlbmRhclJvd3MpIHtcbiAgICAgIGZvciAobGV0IGVudHJ5IG9mIHJvdykge1xuICAgICAgICBlbnRyeS5zZWxlY3RlZCA9IHRoaXMuX3NlcnZpY2UuaXNFbnRyeVNlbGVjdGVkKGVudHJ5LCB0aGlzLl9zZWxlY3RlZFBlcmlvZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FuU2VsZWN0RW50cnkoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoWydkYXknLCAnd2VlayddLmluZGV4T2YodGhpcy5fc2VsZWN0aW9uTW9kZSkgPj0gMCAmJiBlbnRyeS50eXBlICE9ICdkYXknKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICdtb250aCcgJiYgZW50cnkudHlwZSA9PSAneWVhcicpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0Vmlld01vZGUoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ3llYXInO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICdtb250aCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3ZpZXdEYXRlID0gZW50cnkuZGF0ZTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cbn1cbiJdfQ==