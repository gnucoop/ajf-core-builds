/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jYWxlbmRhci9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQW1CLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUNqRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLFlBQVksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFFBQVEsSUFBSSxLQUFLLEVBQUUsY0FBYyxFQUFFLFdBQVcsRUFDeEYsV0FBVyxFQUFDLE1BQU0sVUFBVSxDQUFDO0FBQy9CLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFLaEMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7O01BSWhELFFBQVEsR0FBYTtJQUN6QixFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUTtDQUNqRjtBQUVELE1BQU0sT0FBTyxpQkFBaUI7Q0FHN0I7OztJQUZDLG1DQUFvQjs7SUFDcEIsbUNBQWlDOzs7OztBQUluQyxNQUFNLE9BQWdCLFdBQVc7Ozs7O0lBeUgvQixZQUFvQixJQUF1QixFQUFVLFFBQTRCO1FBQTdELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUFsSHpFLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFVbEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFPeEIsY0FBUyxHQUF3QixPQUFPLENBQUM7UUFRekMsbUJBQWMsR0FBMEIsS0FBSyxDQUFDO1FBTzlDLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBYXBCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUFzQjFCLFlBQU8sR0FBb0MsSUFB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QyxLQUF1QjtRQUMzQyxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUMxQjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7WUF0UUYsU0FBUzs7OztZQXZCZ0IsaUJBQWlCO1lBVW5DLGtCQUFrQjs7O3VCQWdCdkIsS0FBSzt1QkFPTCxLQUFLOzZCQVVMLEtBQUs7dUJBT0wsS0FBSzs0QkFRTCxLQUFLOzZCQVNMLEtBQUs7c0JBWUwsS0FBSztzQkFPTCxLQUFLO3NCQU9MLEtBQUs7cUJBTUwsTUFBTTs2QkFHTixLQUFLO29CQWdCTCxLQUFLOzs7Ozs7O0lBdkZOLGdDQUEwQjs7Ozs7SUFVMUIsc0NBQWdDOzs7OztJQU9oQyxnQ0FBaUQ7Ozs7O0lBUWpELHFDQUFzRDs7Ozs7SUFPdEQsc0NBQTRCOzs7OztJQWE1QiwrQkFBa0M7Ozs7O0lBUWxDLCtCQUE4Qjs7Ozs7SUFPOUIsK0JBQThCOzs7OztJQU85Qiw4QkFBeUY7O0lBQ3pGLDZCQUF1Rjs7Ozs7SUFFdkYsc0NBQWtEOzs7OztJQXNDbEQsZ0NBQXFDOzs7OztJQUNyQyxrQ0FBeUI7Ozs7O0lBRXpCLG9DQUFpRDs7Ozs7SUFDakQsdUNBQXdDOzs7OztJQTRGeEMsd0NBQThEOzs7OztJQUM5RCx5Q0FBbUQ7Ozs7O0lBM0Z2QywyQkFBK0I7Ozs7O0lBQUUsK0JBQW9DIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCxcbiAgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtlbmRPZklTT1dlZWssIGVuZE9mV2VlaywgZW5kT2ZZZWFyLCBwYXJzZUlTTyBhcyBwYXJzZSwgc3RhcnRPZklTT1dlZWssIHN0YXJ0T2ZXZWVrLFxuICBzdGFydE9mWWVhcn0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZDYWxlbmRhckVudHJ5fSBmcm9tICcuL2NhbGVuZGFyLWVudHJ5JztcbmltcG9ydCB7QWpmQ2FsZW5kYXJQZXJpb2RUeXBlfSBmcm9tICcuL2NhbGVuZGFyLXBlcmlvZC10eXBlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJQZXJpb2R9IGZyb20gJy4vY2FsZW5kYXItcGVyaW9kJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuL2NhbGVuZGFyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZDYWxlbmRhclZpZXdNb2RlfSBmcm9tICcuL2NhbGVuZGFyLXZpZXctbW9kZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyV2Vla0RheX0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLWRheSc7XG5cbmNvbnN0IHdlZWtEYXlzOiBzdHJpbmdbXSA9IFtcbiAgJycsICdtb25kYXknLCAndHVlc2RheScsICd3ZWRuZXNkYXknLCAndGh1cnNkYXknLCAnZnJpZGF5JywgJ3NhdHVyZGF5JywgJ3N1bmRheSdcbl07XG5cbmV4cG9ydCBjbGFzcyBBamZDYWxlbmRhckNoYW5nZSB7XG4gIHNvdXJjZTogQWpmQ2FsZW5kYXI7XG4gIHBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2QgfCBudWxsO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZDYWxlbmRhciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBnZXQgdmlld0RhdGUoKTogRGF0ZSB7IHJldHVybiB0aGlzLl92aWV3RGF0ZTsgfVxuICBASW5wdXQoKSBzZXQgdmlld0RhdGUodmlld0RhdGU6IERhdGUpIHtcbiAgICB0aGlzLl9zZXRWaWV3RGF0ZSh2aWV3RGF0ZSk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgQElucHV0KCkgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmV3RGlzYWJsZWQgPSBkaXNhYmxlZCAhPSBudWxsICYmIGAke2Rpc2FibGVkfWAgIT09ICdmYWxzZSc7XG4gICAgaWYgKG5ld0Rpc2FibGVkICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdEaXNhYmxlZDtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kYXRlT25seUZvckRheSA9IGZhbHNlO1xuICBnZXQgZGF0ZU9ubHlGb3JEYXkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBASW5wdXQoKSBzZXQgZGF0ZU9ubHlGb3JEYXkoZGF0ZU9ubHlGb3JEYXk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kYXRlT25seUZvckRheSA9IGRhdGVPbmx5Rm9yRGF5ICE9IG51bGwgJiYgYCR7ZGF0ZU9ubHlGb3JEYXl9YCAhPT0gJ2ZhbHNlJztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF92aWV3TW9kZTogQWpmQ2FsZW5kYXJWaWV3TW9kZSA9ICdtb250aCc7XG4gIGdldCB2aWV3TW9kZSgpOiBBamZDYWxlbmRhclZpZXdNb2RlIHsgcmV0dXJuIHRoaXMuX3ZpZXdNb2RlOyB9XG4gIEBJbnB1dCgpIHNldCB2aWV3TW9kZSh2aWV3TW9kZTogQWpmQ2FsZW5kYXJWaWV3TW9kZSkge1xuICAgIHRoaXMuX3ZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGlvbk1vZGU6IEFqZkNhbGVuZGFyUGVyaW9kVHlwZSA9ICdkYXknO1xuICBnZXQgc2VsZWN0aW9uTW9kZSgpOiBBamZDYWxlbmRhclBlcmlvZFR5cGUgeyByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZTsgfVxuICBASW5wdXQoKSBzZXQgc2VsZWN0aW9uTW9kZShzZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlID0gc2VsZWN0aW9uTW9kZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zdGFydE9mV2Vla0RheSA9IDE7XG4gIGdldCBzdGFydE9mV2Vla0RheSgpOiBBamZDYWxlbmRhcldlZWtEYXkge1xuICAgIHJldHVybiA8QWpmQ2FsZW5kYXJXZWVrRGF5PndlZWtEYXlzW3RoaXMuX3N0YXJ0T2ZXZWVrRGF5XTtcbiAgfVxuICBASW5wdXQoKSBzZXQgc3RhcnRPZldlZWtEYXkod2Vla0RheTogQWpmQ2FsZW5kYXJXZWVrRGF5KSB7XG4gICAgdGhpcy5fc3RhcnRPZldlZWtEYXkgPSB3ZWVrRGF5cy5pbmRleE9mKHdlZWtEYXkpO1xuXG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzb01vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBnZXQgaXNvTW9kZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzb01vZGU7IH1cbiAgQElucHV0KCkgc2V0IGlzb01vZGUoaXNvTW9kZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzb01vZGUgPSBpc29Nb2RlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX21pbkRhdGU6IERhdGUgfCBudWxsO1xuICBnZXQgbWluRGF0ZSgpOiBEYXRlIHwgbnVsbCB7IHJldHVybiB0aGlzLl9taW5EYXRlOyB9XG4gIEBJbnB1dCgpIHNldCBtaW5EYXRlKG1pbkRhdGU6IERhdGUgfCBudWxsKSB7XG4gICAgdGhpcy5fbWluRGF0ZSA9IG1pbkRhdGUgIT0gbnVsbCA/IG5ldyBEYXRlKG1pbkRhdGUudmFsdWVPZigpKSA6IG51bGw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWF4RGF0ZTogRGF0ZSB8IG51bGw7XG4gIGdldCBtYXhEYXRlKCk6IERhdGUgfCBudWxsIHsgcmV0dXJuIHRoaXMuX21heERhdGU7IH1cbiAgQElucHV0KCkgc2V0IG1heERhdGUobWF4RGF0ZTogRGF0ZSB8IG51bGwpIHtcbiAgICB0aGlzLl9tYXhEYXRlID0gbWF4RGF0ZSAhPSBudWxsID8gbmV3IERhdGUobWF4RGF0ZS52YWx1ZU9mKCkpIDogbnVsbDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZDYWxlbmRhckNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkNhbGVuZGFyQ2hhbmdlPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNhbGVuZGFyQ2hhbmdlPiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zZWxlY3RlZFBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2QgfCBudWxsO1xuICBASW5wdXQoKSBzZXQgc2VsZWN0ZWRQZXJpb2QocGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZCB8IG51bGwpIHtcbiAgICB0aGlzLl9zZWxlY3RlZFBlcmlvZCA9IHBlcmlvZDtcbiAgICB0aGlzLl9jaGFuZ2UuZW1pdCh7XG4gICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICBwZXJpb2Q6IHBlcmlvZFxuICAgIH0pO1xuICAgIHRoaXMuX3JlZnJlc2hTZWxlY3Rpb24oKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogQWpmQ2FsZW5kYXJQZXJpb2QgfCBEYXRlIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2RhdGVPbmx5Rm9yRGF5ICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ2RheScpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFBlcmlvZCAhPSBudWxsID8gdGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlIDogbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUGVyaW9kO1xuICB9XG4gIEBJbnB1dCgpIHNldCB2YWx1ZShwZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgRGF0ZSB8IG51bGwpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLl9kYXRlT25seUZvckRheSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdkYXknICYmIHBlcmlvZCBpbnN0YW5jZW9mIERhdGVcbiAgICAgICYmICh0aGlzLl9zZWxlY3RlZFBlcmlvZCA9PSBudWxsIHx8IHBlcmlvZCAhPT0gdGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlKVxuICAgICkge1xuICAgICAgdGhpcy5zZWxlY3RlZFBlcmlvZCA9IHtcbiAgICAgICAgdHlwZTogJ2RheScsXG4gICAgICAgIHN0YXJ0RGF0ZTogcGVyaW9kLFxuICAgICAgICBlbmREYXRlOiBwZXJpb2RcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChwZXJpb2QgaW5zdGFuY2VvZiBPYmplY3QgJiYgcGVyaW9kICE9PSB0aGlzLl9zZWxlY3RlZFBlcmlvZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFBlcmlvZCA9IDxBamZDYWxlbmRhclBlcmlvZD5wZXJpb2Q7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHBlcmlvZCk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBjYWxlbmRhckhlYWRlcnMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fY2FsZW5kYXJIZWFkZXJzOyB9XG4gIGdldCBjYWxlbmRhclJvd3MoKTogQWpmQ2FsZW5kYXJFbnRyeVtdW10geyByZXR1cm4gdGhpcy5fY2FsZW5kYXJSb3dzOyB9XG4gIGdldCB2aWV3SGVhZGVyKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl92aWV3SGVhZGVyOyB9XG5cbiAgcHJpdmF0ZSBfdmlld0RhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICBwcml2YXRlIF92aWV3SGVhZGVyID0gJyc7XG5cbiAgcHJpdmF0ZSBfY2FsZW5kYXJSb3dzOiBBamZDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICBwcml2YXRlIF9jYWxlbmRhckhlYWRlcnM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfc2VydmljZTogQWpmQ2FsZW5kYXJTZXJ2aWNlKSB7IH1cblxuICBwcmV2UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdEYXRlID0gdGhpcy5fc2VydmljZS5wcmV2aW91c1ZpZXcodGhpcy5fdmlld0RhdGUsIHRoaXMuX3ZpZXdNb2RlKTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBuZXh0UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdEYXRlID0gdGhpcy5fc2VydmljZS5uZXh0Vmlldyh0aGlzLl92aWV3RGF0ZSwgdGhpcy5fdmlld01vZGUpO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHByZXZpb3VzVmlld01vZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdkZWNhZGUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ2RlY2FkZSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICd5ZWFyJztcbiAgICB9XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgc2VsZWN0RW50cnkoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2NhblNlbGVjdEVudHJ5KGVudHJ5KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX25leHRWaWV3TW9kZShlbnRyeSk7XG4gICAgfVxuXG4gICAgbGV0IG5ld1BlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2QgfCBudWxsID0gbnVsbDtcbiAgICBpZiAodGhpcy5fc2VydmljZS5pc0VudHJ5U2VsZWN0ZWQoZW50cnksIHRoaXMuX3NlbGVjdGVkUGVyaW9kKSA9PSAnZnVsbCcpIHtcbiAgICAgIG5ld1BlcmlvZCA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICdkYXknKSB7XG4gICAgICBuZXdQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICdkYXknLFxuICAgICAgICBzdGFydERhdGU6IGVudHJ5LmRhdGUsXG4gICAgICAgIGVuZERhdGU6IGVudHJ5LmRhdGVcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICd3ZWVrJykge1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnd2VlaycsXG4gICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5faXNvTW9kZSA/XG4gICAgICAgICAgc3RhcnRPZklTT1dlZWsoZW50cnkuZGF0ZSkgOlxuICAgICAgICAgIHN0YXJ0T2ZXZWVrKGVudHJ5LmRhdGUsIHt3ZWVrU3RhcnRzT246IHRoaXMuX3N0YXJ0T2ZXZWVrRGF5IGFzIDB8MXwyfDN8NHw1fDZ9KSxcbiAgICAgICAgZW5kRGF0ZTogdGhpcy5faXNvTW9kZSA/XG4gICAgICAgICAgZW5kT2ZJU09XZWVrKGVudHJ5LmRhdGUpIDpcbiAgICAgICAgICBlbmRPZldlZWsoZW50cnkuZGF0ZSwge3dlZWtTdGFydHNPbjogdGhpcy5fc3RhcnRPZldlZWtEYXkgYXMgMHwxfDJ8M3w0fDV8Nn0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICBjb25zdCBtb250aEJvdW5kcyA9IHRoaXMuX3NlcnZpY2UubW9udGhCb3VuZHMoZW50cnkuZGF0ZSwgdGhpcy5faXNvTW9kZSk7XG4gICAgICBuZXdQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICdtb250aCcsXG4gICAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUobW9udGhCb3VuZHMuc3RhcnQpLFxuICAgICAgICBlbmREYXRlOiBuZXcgRGF0ZShtb250aEJvdW5kcy5lbmQpXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAneWVhcicpIHtcbiAgICAgIG5ld1BlcmlvZCA9IHtcbiAgICAgICAgdHlwZTogJ3llYXInLFxuICAgICAgICBzdGFydERhdGU6IHN0YXJ0T2ZZZWFyKGVudHJ5LmRhdGUpLFxuICAgICAgICBlbmREYXRlOiBlbmRPZlllYXIoZW50cnkuZGF0ZSlcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSBuZXdQZXJpb2Q7XG5cbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBwYXJzZSh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWZyZXNoU2VsZWN0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKF86IGFueSkgPT4geyB9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcblxuICBwcml2YXRlIF9zZXRWaWV3RGF0ZShkYXRlOiBEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld0RhdGUgPSBkYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRDYWxlbmRhcigpOiB2b2lkIHtcbiAgICBjb25zdCBjYWxlbmRhclZpZXcgPSB0aGlzLl9zZXJ2aWNlLmJ1aWxkVmlldyh7XG4gICAgICB2aWV3TW9kZTogdGhpcy5fdmlld01vZGUsXG4gICAgICB2aWV3RGF0ZTogdGhpcy5fdmlld0RhdGUsXG4gICAgICBzZWxlY3Rpb246IHRoaXMuX3NlbGVjdGVkUGVyaW9kLFxuICAgICAgaXNvTW9kZTogdGhpcy5faXNvTW9kZSxcbiAgICAgIG1pbkRhdGU6IHRoaXMuX21pbkRhdGUgPT0gbnVsbCA/IG51bGwgOiBuZXcgRGF0ZSh0aGlzLl9taW5EYXRlKSxcbiAgICAgIG1heERhdGU6IHRoaXMuX21heERhdGUgPT0gbnVsbCA/IG51bGwgOiBuZXcgRGF0ZSh0aGlzLl9tYXhEYXRlKSxcbiAgICB9KTtcbiAgICB0aGlzLl92aWV3SGVhZGVyID0gY2FsZW5kYXJWaWV3LmhlYWRlcjtcbiAgICB0aGlzLl9jYWxlbmRhckhlYWRlcnMgPSBjYWxlbmRhclZpZXcuaGVhZGVyUm93O1xuICAgIHRoaXMuX2NhbGVuZGFyUm93cyA9IGNhbGVuZGFyVmlldy5yb3dzO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZnJlc2hTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgcm93IG9mIHRoaXMuX2NhbGVuZGFyUm93cykge1xuICAgICAgZm9yIChsZXQgZW50cnkgb2Ygcm93KSB7XG4gICAgICAgIGVudHJ5LnNlbGVjdGVkID0gdGhpcy5fc2VydmljZS5pc0VudHJ5U2VsZWN0ZWQoZW50cnksIHRoaXMuX3NlbGVjdGVkUGVyaW9kKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jYW5TZWxlY3RFbnRyeShlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmIChbJ2RheScsICd3ZWVrJ10uaW5kZXhPZih0aGlzLl9zZWxlY3Rpb25Nb2RlKSA+PSAwICYmIGVudHJ5LnR5cGUgIT0gJ2RheScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJyAmJiBlbnRyeS50eXBlID09ICd5ZWFyJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRWaWV3TW9kZShlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAneWVhcic7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ21vbnRoJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdtb250aCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdmlld0RhdGUgPSBlbnRyeS5kYXRlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxufVxuIl19