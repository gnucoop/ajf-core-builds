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
const weekDays = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
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
    get viewDate() {
        return this._viewDate;
    }
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
    get disabled() {
        return this._disabled;
    }
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
    get dateOnlyForDay() {
        return this._disabled;
    }
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
    get viewMode() {
        return this._viewMode;
    }
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
    get selectionMode() {
        return this._selectionMode;
    }
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
    get isoMode() {
        return this._isoMode;
    }
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
    get minDate() {
        return this._minDate;
    }
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
    get maxDate() {
        return this._maxDate;
    }
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
        this._change.emit({ source: this, period: period });
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
        if (this._dateOnlyForDay && this.selectionMode === 'day' && period instanceof Date &&
            (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
            this.selectedPeriod = { type: 'day', startDate: period, endDate: period };
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
    get calendarHeaders() {
        return this._calendarHeaders;
    }
    /**
     * @return {?}
     */
    get calendarRows() {
        return this._calendarRows;
    }
    /**
     * @return {?}
     */
    get viewHeader() {
        return this._viewHeader;
    }
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
            newPeriod = { type: 'day', startDate: entry.date, endDate: entry.date };
        }
        else if (this._selectionMode == 'week') {
            newPeriod = {
                type: 'week',
                startDate: this._isoMode ? startOfISOWeek(entry.date) : startOfWeek(entry.date, {
                    weekStartsOn: (/** @type {?} */ (this._startOfWeekDay))
                }),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jYWxlbmRhci9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxTQUFTLEVBQ1QsUUFBUSxJQUFJLEtBQUssRUFDakIsY0FBYyxFQUNkLFdBQVcsRUFDWCxXQUFXLEVBQ1osTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUtoQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQzs7TUFJaEQsUUFBUSxHQUNWLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsV0FBVyxFQUFFLFVBQVUsRUFBRSxRQUFRLEVBQUUsVUFBVSxFQUFFLFFBQVEsQ0FBQztBQUV0RixNQUFNLE9BQU8saUJBQWlCO0NBRzdCOzs7SUFGQyxtQ0FBb0I7O0lBQ3BCLG1DQUErQjs7Ozs7QUFJakMsTUFBTSxPQUFnQixXQUFXOzs7OztJQWlKL0IsWUFBb0IsSUFBdUIsRUFBVSxRQUE0QjtRQUE3RCxTQUFJLEdBQUosSUFBSSxDQUFtQjtRQUFVLGFBQVEsR0FBUixRQUFRLENBQW9CO1FBdkl6RSxjQUFTLEdBQUcsS0FBSyxDQUFDO1FBYWxCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBVXhCLGNBQVMsR0FBd0IsT0FBTyxDQUFDO1FBV3pDLG1CQUFjLEdBQTBCLEtBQUssQ0FBQztRQVU5QyxvQkFBZSxHQUFHLENBQUMsQ0FBQztRQWNwQixhQUFRLEdBQVksS0FBSyxDQUFDO1FBK0IxQixZQUFPLEdBQW9DLElBQUks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QUFJLElBQUksQ0FBQyxTQUFTLElBQUksUUFBUSxFQUFFO1lBQzlCLElBQUksQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO1NBQ3pCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE1BQU0sRUFBRTtZQUNuQyxJQUFJLENBQUMsU0FBUyxHQUFHLE9BQU8sQ0FBQztTQUMxQjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLEVBQUU7WUFDcEMsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDO1FBQzVCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7WUExUkYsU0FBUzs7OztZQWxDUixpQkFBaUI7WUFzQlgsa0JBQWtCOzs7dUJBaUJ2QixLQUFLO3VCQVVMLEtBQUs7NkJBYUwsS0FBSzt1QkFVTCxLQUFLOzRCQVdMLEtBQUs7NkJBVUwsS0FBSztzQkFlTCxLQUFLO3NCQVVMLEtBQUs7c0JBVUwsS0FBSztxQkFPTCxNQUFNOzZCQUdOLEtBQUs7b0JBY0wsS0FBSzs7Ozs7OztJQTNHTixnQ0FBMEI7Ozs7O0lBYTFCLHNDQUFnQzs7Ozs7SUFVaEMsZ0NBQWlEOzs7OztJQVdqRCxxQ0FBc0Q7Ozs7O0lBVXRELHNDQUE0Qjs7Ozs7SUFjNUIsK0JBQWtDOzs7OztJQVdsQywrQkFBNEI7Ozs7O0lBVTVCLCtCQUE0Qjs7Ozs7SUFVNUIsOEJBQXlGOztJQUN6Riw2QkFBdUY7Ozs7O0lBRXZGLHNDQUFnRDs7Ozs7SUFxQ2hELGdDQUFxQzs7Ozs7SUFDckMsa0NBQXlCOzs7OztJQUV6QixvQ0FBaUQ7Ozs7O0lBQ2pELHVDQUF3Qzs7Ozs7SUF3RnhDLHdDQUE2RDs7Ozs7SUFDN0QseUNBQWtEOzs7OztJQXZGdEMsMkJBQStCOzs7OztJQUFFLCtCQUFvQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBlbmRPZklTT1dlZWssXG4gIGVuZE9mV2VlayxcbiAgZW5kT2ZZZWFyLFxuICBwYXJzZUlTTyBhcyBwYXJzZSxcbiAgc3RhcnRPZklTT1dlZWssXG4gIHN0YXJ0T2ZXZWVrLFxuICBzdGFydE9mWWVhclxufSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkNhbGVuZGFyRW50cnl9IGZyb20gJy4vY2FsZW5kYXItZW50cnknO1xuaW1wb3J0IHtBamZDYWxlbmRhclBlcmlvZH0gZnJvbSAnLi9jYWxlbmRhci1wZXJpb2QnO1xuaW1wb3J0IHtBamZDYWxlbmRhclBlcmlvZFR5cGV9IGZyb20gJy4vY2FsZW5kYXItcGVyaW9kLXR5cGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhclNlcnZpY2V9IGZyb20gJy4vY2FsZW5kYXItc2VydmljZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyVmlld01vZGV9IGZyb20gJy4vY2FsZW5kYXItdmlldy1tb2RlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJXZWVrRGF5fSBmcm9tICcuL2NhbGVuZGFyLXdlZWstZGF5JztcblxuY29uc3Qgd2Vla0RheXM6IHN0cmluZ1tdID1cbiAgICBbJycsICdtb25kYXknLCAndHVlc2RheScsICd3ZWRuZXNkYXknLCAndGh1cnNkYXknLCAnZnJpZGF5JywgJ3NhdHVyZGF5JywgJ3N1bmRheSddO1xuXG5leHBvcnQgY2xhc3MgQWpmQ2FsZW5kYXJDaGFuZ2Uge1xuICBzb3VyY2U6IEFqZkNhbGVuZGFyO1xuICBwZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kfG51bGw7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkNhbGVuZGFyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIGdldCB2aWV3RGF0ZSgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld0RhdGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZpZXdEYXRlKHZpZXdEYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5fc2V0Vmlld0RhdGUodmlld0RhdGUpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmV3RGlzYWJsZWQgPSBkaXNhYmxlZCAhPSBudWxsICYmIGAke2Rpc2FibGVkfWAgIT09ICdmYWxzZSc7XG4gICAgaWYgKG5ld0Rpc2FibGVkICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdEaXNhYmxlZDtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kYXRlT25seUZvckRheSA9IGZhbHNlO1xuICBnZXQgZGF0ZU9ubHlGb3JEYXkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkYXRlT25seUZvckRheShkYXRlT25seUZvckRheTogYm9vbGVhbikge1xuICAgIHRoaXMuX2RhdGVPbmx5Rm9yRGF5ID0gZGF0ZU9ubHlGb3JEYXkgIT0gbnVsbCAmJiBgJHtkYXRlT25seUZvckRheX1gICE9PSAnZmFsc2UnO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlID0gJ21vbnRoJztcbiAgZ2V0IHZpZXdNb2RlKCk6IEFqZkNhbGVuZGFyVmlld01vZGUge1xuICAgIHJldHVybiB0aGlzLl92aWV3TW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmlld01vZGUodmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUgPSAnZGF5JztcbiAgZ2V0IHNlbGVjdGlvbk1vZGUoKTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc2VsZWN0aW9uTW9kZShzZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlID0gc2VsZWN0aW9uTW9kZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zdGFydE9mV2Vla0RheSA9IDE7XG4gIGdldCBzdGFydE9mV2Vla0RheSgpOiBBamZDYWxlbmRhcldlZWtEYXkge1xuICAgIHJldHVybiA8QWpmQ2FsZW5kYXJXZWVrRGF5PndlZWtEYXlzW3RoaXMuX3N0YXJ0T2ZXZWVrRGF5XTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc3RhcnRPZldlZWtEYXkod2Vla0RheTogQWpmQ2FsZW5kYXJXZWVrRGF5KSB7XG4gICAgdGhpcy5fc3RhcnRPZldlZWtEYXkgPSB3ZWVrRGF5cy5pbmRleE9mKHdlZWtEYXkpO1xuXG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzb01vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBnZXQgaXNvTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNvTW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaXNvTW9kZShpc29Nb2RlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNvTW9kZSA9IGlzb01vZGU7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWluRGF0ZTogRGF0ZXxudWxsO1xuICBnZXQgbWluRGF0ZSgpOiBEYXRlfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBtaW5EYXRlKG1pbkRhdGU6IERhdGV8bnVsbCkge1xuICAgIHRoaXMuX21pbkRhdGUgPSBtaW5EYXRlICE9IG51bGwgPyBuZXcgRGF0ZShtaW5EYXRlLnZhbHVlT2YoKSkgOiBudWxsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX21heERhdGU6IERhdGV8bnVsbDtcbiAgZ2V0IG1heERhdGUoKTogRGF0ZXxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbWF4RGF0ZShtYXhEYXRlOiBEYXRlfG51bGwpIHtcbiAgICB0aGlzLl9tYXhEYXRlID0gbWF4RGF0ZSAhPSBudWxsID8gbmV3IERhdGUobWF4RGF0ZS52YWx1ZU9mKCkpIDogbnVsbDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZDYWxlbmRhckNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkNhbGVuZGFyQ2hhbmdlPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNhbGVuZGFyQ2hhbmdlPiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zZWxlY3RlZFBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2R8bnVsbDtcbiAgQElucHV0KClcbiAgc2V0IHNlbGVjdGVkUGVyaW9kKHBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2R8bnVsbCkge1xuICAgIHRoaXMuX3NlbGVjdGVkUGVyaW9kID0gcGVyaW9kO1xuICAgIHRoaXMuX2NoYW5nZS5lbWl0KHtzb3VyY2U6IHRoaXMsIHBlcmlvZDogcGVyaW9kfSk7XG4gICAgdGhpcy5fcmVmcmVzaFNlbGVjdGlvbigpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBBamZDYWxlbmRhclBlcmlvZHxEYXRlfG51bGwge1xuICAgIGlmICh0aGlzLl9kYXRlT25seUZvckRheSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdkYXknKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRQZXJpb2QgIT0gbnVsbCA/IHRoaXMuX3NlbGVjdGVkUGVyaW9kLnN0YXJ0RGF0ZSA6IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFBlcmlvZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUocGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZHxEYXRlfG51bGwpIHtcbiAgICBpZiAodGhpcy5fZGF0ZU9ubHlGb3JEYXkgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnZGF5JyAmJiBwZXJpb2QgaW5zdGFuY2VvZiBEYXRlICYmXG4gICAgICAgICh0aGlzLl9zZWxlY3RlZFBlcmlvZCA9PSBudWxsIHx8IHBlcmlvZCAhPT0gdGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZFBlcmlvZCA9IHt0eXBlOiAnZGF5Jywgc3RhcnREYXRlOiBwZXJpb2QsIGVuZERhdGU6IHBlcmlvZH07XG4gICAgfSBlbHNlIGlmIChwZXJpb2QgaW5zdGFuY2VvZiBPYmplY3QgJiYgcGVyaW9kICE9PSB0aGlzLl9zZWxlY3RlZFBlcmlvZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFBlcmlvZCA9IDxBamZDYWxlbmRhclBlcmlvZD5wZXJpb2Q7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHBlcmlvZCk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBjYWxlbmRhckhlYWRlcnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhckhlYWRlcnM7XG4gIH1cbiAgZ2V0IGNhbGVuZGFyUm93cygpOiBBamZDYWxlbmRhckVudHJ5W11bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyUm93cztcbiAgfVxuICBnZXQgdmlld0hlYWRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92aWV3SGVhZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlld0RhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICBwcml2YXRlIF92aWV3SGVhZGVyID0gJyc7XG5cbiAgcHJpdmF0ZSBfY2FsZW5kYXJSb3dzOiBBamZDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICBwcml2YXRlIF9jYWxlbmRhckhlYWRlcnM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfc2VydmljZTogQWpmQ2FsZW5kYXJTZXJ2aWNlKSB7fVxuXG4gIHByZXZQYWdlKCk6IHZvaWQge1xuICAgIHRoaXMudmlld0RhdGUgPSB0aGlzLl9zZXJ2aWNlLnByZXZpb3VzVmlldyh0aGlzLl92aWV3RGF0ZSwgdGhpcy5fdmlld01vZGUpO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIG5leHRQYWdlKCk6IHZvaWQge1xuICAgIHRoaXMudmlld0RhdGUgPSB0aGlzLl9zZXJ2aWNlLm5leHRWaWV3KHRoaXMuX3ZpZXdEYXRlLCB0aGlzLl92aWV3TW9kZSk7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgcHJldmlvdXNWaWV3TW9kZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICd5ZWFyJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAnZGVjYWRlJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdtb250aCcpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ3llYXInO1xuICAgIH1cbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBzZWxlY3RFbnRyeShlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fY2FuU2VsZWN0RW50cnkoZW50cnkpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbmV4dFZpZXdNb2RlKGVudHJ5KTtcbiAgICB9XG5cbiAgICBsZXQgbmV3UGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZHxudWxsID0gbnVsbDtcbiAgICBpZiAodGhpcy5fc2VydmljZS5pc0VudHJ5U2VsZWN0ZWQoZW50cnksIHRoaXMuX3NlbGVjdGVkUGVyaW9kKSA9PSAnZnVsbCcpIHtcbiAgICAgIG5ld1BlcmlvZCA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICdkYXknKSB7XG4gICAgICBuZXdQZXJpb2QgPSB7dHlwZTogJ2RheScsIHN0YXJ0RGF0ZTogZW50cnkuZGF0ZSwgZW5kRGF0ZTogZW50cnkuZGF0ZX07XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICd3ZWVrJykge1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnd2VlaycsXG4gICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5faXNvTW9kZSA/IHN0YXJ0T2ZJU09XZWVrKGVudHJ5LmRhdGUpIDogc3RhcnRPZldlZWsoZW50cnkuZGF0ZSwge1xuICAgICAgICAgIHdlZWtTdGFydHNPbjogdGhpcy5fc3RhcnRPZldlZWtEYXkgYXMgMCB8IDEgfCAyIHwgMyB8IDQgfCA1IHwgNlxuICAgICAgICB9KSxcbiAgICAgICAgZW5kRGF0ZTogdGhpcy5faXNvTW9kZSA/XG4gICAgICAgICAgICBlbmRPZklTT1dlZWsoZW50cnkuZGF0ZSkgOlxuICAgICAgICAgICAgZW5kT2ZXZWVrKGVudHJ5LmRhdGUsIHt3ZWVrU3RhcnRzT246IHRoaXMuX3N0YXJ0T2ZXZWVrRGF5IGFzIDAgfCAxIHwgMiB8IDMgfCA0IHwgNSB8IDZ9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJykge1xuICAgICAgY29uc3QgbW9udGhCb3VuZHMgPSB0aGlzLl9zZXJ2aWNlLm1vbnRoQm91bmRzKGVudHJ5LmRhdGUsIHRoaXMuX2lzb01vZGUpO1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnbW9udGgnLFxuICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKG1vbnRoQm91bmRzLnN0YXJ0KSxcbiAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUobW9udGhCb3VuZHMuZW5kKVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ3llYXInKSB7XG4gICAgICBuZXdQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICd5ZWFyJyxcbiAgICAgICAgc3RhcnREYXRlOiBzdGFydE9mWWVhcihlbnRyeS5kYXRlKSxcbiAgICAgICAgZW5kRGF0ZTogZW5kT2ZZZWFyKGVudHJ5LmRhdGUpXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gbmV3UGVyaW9kO1xuXG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gcGFyc2UodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVmcmVzaFNlbGVjdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByaXZhdGUgX3NldFZpZXdEYXRlKGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3RGF0ZSA9IGRhdGU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZENhbGVuZGFyKCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGVuZGFyVmlldyA9IHRoaXMuX3NlcnZpY2UuYnVpbGRWaWV3KHtcbiAgICAgIHZpZXdNb2RlOiB0aGlzLl92aWV3TW9kZSxcbiAgICAgIHZpZXdEYXRlOiB0aGlzLl92aWV3RGF0ZSxcbiAgICAgIHNlbGVjdGlvbjogdGhpcy5fc2VsZWN0ZWRQZXJpb2QsXG4gICAgICBpc29Nb2RlOiB0aGlzLl9pc29Nb2RlLFxuICAgICAgbWluRGF0ZTogdGhpcy5fbWluRGF0ZSA9PSBudWxsID8gbnVsbCA6IG5ldyBEYXRlKHRoaXMuX21pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogdGhpcy5fbWF4RGF0ZSA9PSBudWxsID8gbnVsbCA6IG5ldyBEYXRlKHRoaXMuX21heERhdGUpLFxuICAgIH0pO1xuICAgIHRoaXMuX3ZpZXdIZWFkZXIgPSBjYWxlbmRhclZpZXcuaGVhZGVyO1xuICAgIHRoaXMuX2NhbGVuZGFySGVhZGVycyA9IGNhbGVuZGFyVmlldy5oZWFkZXJSb3c7XG4gICAgdGhpcy5fY2FsZW5kYXJSb3dzID0gY2FsZW5kYXJWaWV3LnJvd3M7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVmcmVzaFNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCByb3cgb2YgdGhpcy5fY2FsZW5kYXJSb3dzKSB7XG4gICAgICBmb3IgKGxldCBlbnRyeSBvZiByb3cpIHtcbiAgICAgICAgZW50cnkuc2VsZWN0ZWQgPSB0aGlzLl9zZXJ2aWNlLmlzRW50cnlTZWxlY3RlZChlbnRyeSwgdGhpcy5fc2VsZWN0ZWRQZXJpb2QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NhblNlbGVjdEVudHJ5KGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKFsnZGF5JywgJ3dlZWsnXS5pbmRleE9mKHRoaXMuX3NlbGVjdGlvbk1vZGUpID49IDAgJiYgZW50cnkudHlwZSAhPSAnZGF5Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnbW9udGgnICYmIGVudHJ5LnR5cGUgPT0gJ3llYXInKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfbmV4dFZpZXdNb2RlKGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdkZWNhZGUnKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICd5ZWFyJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICd5ZWFyJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAnbW9udGgnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl92aWV3RGF0ZSA9IGVudHJ5LmRhdGU7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG59XG4iXX0=