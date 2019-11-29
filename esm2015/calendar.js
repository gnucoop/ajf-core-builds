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
import { format, startOfMonth, startOfYear, endOfMonth, endOfYear, subMonths, subYears, addMonths, addYears, startOfISOWeek, startOfWeek, endOfISOWeek, endOfWeek, parse, addWeeks, subWeeks, isBefore, isAfter, addDays, setISODay, startOfDay, endOfDay, isSameDay } from 'date-fns';
import { EventEmitter } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfCalendarEntry {
    /**
     * @param {?} params
     */
    constructor(params) {
        this.disabled = false;
        this.highlight = false;
        /** @type {?} */
        let keys = Object.keys(params);
        this.type = params.type;
        this.date = params.date;
        this.selected = params.selected;
        if (keys.indexOf('disabled') > -1) {
            this.disabled = (/** @type {?} */ (params.disabled));
        }
        if (keys.indexOf('highlight') > -1) {
            this.highlight = (/** @type {?} */ (params.highlight));
        }
    }
    /**
     * @return {?}
     */
    toString() {
        if (this.type === 'day') {
            return `${this.date.getDate()}`;
        }
        if (this.type === 'month') {
            return format(this.date, 'MMM');
        }
        return `${this.date.getFullYear()}`;
    }
    /**
     * @return {?}
     */
    getRange() {
        if (this.type === 'day') {
            return { start: new Date(this.date), end: new Date(this.date) };
        }
        else {
            /** @type {?} */
            let curDate = new Date(this.date);
            return {
                start: this.type === 'month' ? startOfMonth(curDate) : startOfYear(curDate),
                end: this.type === 'month' ? endOfMonth(curDate) : endOfYear(curDate)
            };
        }
    }
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

class AjfCalendarPeriod {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const weekDays = [
    '', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];
class AjfCalendarChange {
}
/**
 * @abstract
 */
class AjfCalendar {
    /**
     * @param {?} _cdr
     */
    constructor(_cdr) {
        this._cdr = _cdr;
        this._disabled = false;
        this._dateOnlyForDay = false;
        this._viewMode = 'month';
        this._selectionMode = 'day';
        this._startOfWeekDay = 1;
        this._isoMode = false;
        this._change = new EventEmitter();
        this._viewDate = new Date();
        this._viewHeader = '';
        this._calendarRows = [];
        this._weekDays = [];
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
        this._cdr.markForCheck();
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
     * @return {?}
     */
    get change() {
        return this._change.asObservable();
    }
    /**
     * @private
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
        if (this._dateOnlyForDay && this.selectionMode === 'day') {
            if (period instanceof Date &&
                (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
                this.selectedPeriod = {
                    type: 'day',
                    startDate: period,
                    endDate: period
                };
                this._onChangeCallback(period);
            }
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
    get calendarRows() { return this._calendarRows; }
    /**
     * @return {?}
     */
    get viewHeader() { return this._viewHeader; }
    /**
     * @return {?}
     */
    get weekDays() { return this._weekDays; }
    /**
     * @return {?}
     */
    prevPage() {
        if (this._viewMode == 'month') {
            this.viewDate = subMonths(this.viewDate, 1);
        }
        else if (this._viewMode == 'year') {
            this.viewDate = subYears(this.viewDate, 1);
        }
        this._buildCalendar();
    }
    /**
     * @return {?}
     */
    nextPage() {
        if (this._viewMode == 'month') {
            this.viewDate = addMonths(this.viewDate, 1);
        }
        else if (this._viewMode == 'year') {
            this.viewDate = addYears(this.viewDate, 1);
        }
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
        if (this._isEntrySelected(entry) == 'full') {
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
                    startOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay }),
                endDate: this._isoMode ?
                    endOfISOWeek(entry.date) :
                    endOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay })
            };
        }
        else if (this._selectionMode == 'month') {
            /** @type {?} */
            const monthBounds = this._getMonthStartEnd(entry.date);
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
     * @param {?} date
     * @return {?}
     */
    _getMonthStartEnd(date) {
        if (!this._isoMode) {
            return {
                start: startOfMonth(date),
                end: endOfMonth(date),
            };
        }
        /** @type {?} */
        let startDate = startOfMonth(endOfISOWeek(date));
        /** @type {?} */
        let endDate = endOfMonth(startDate);
        /** @type {?} */
        const startWeekDay = startDate.getDay();
        /** @type {?} */
        const endWeekDay = endDate.getDay();
        if (startWeekDay == 0 || startWeekDay > 4) {
            startDate = addWeeks(startDate, 1);
        }
        if (endWeekDay > 0 && endWeekDay < 4) {
            endDate = subWeeks(endDate, 1);
        }
        startDate = startOfISOWeek(startDate);
        endDate = endOfISOWeek(endDate);
        return { start: startDate, end: endDate };
    }
    /**
     * @private
     * @return {?}
     */
    _buildCalendar() {
        if (this._viewMode == 'month') {
            this._buildMonthView();
        }
        else if (this._viewMode == 'year') {
            this._buildYearView();
        }
        else if (this._viewMode == 'decade') {
            this._buildDecadeView();
        }
        this._cdr.markForCheck();
    }
    /**
     * @private
     * @return {?}
     */
    _buildDecadeView() {
        /** @type {?} */
        let curYear = this._viewDate.getFullYear();
        /** @type {?} */
        let firstYear = curYear - (curYear % 10) + 1;
        /** @type {?} */
        let lastYear = firstYear + 11;
        this._viewHeader = `${firstYear} - ${lastYear}`;
        /** @type {?} */
        let curDate = startOfYear(this._viewDate);
        curDate.setFullYear(firstYear);
        /** @type {?} */
        let rows = [];
        for (let i = 0; i < 4; i++) {
            /** @type {?} */
            let row = [];
            for (let j = 0; j < 3; j++) {
                /** @type {?} */
                let date = new Date(curDate);
                /** @type {?} */
                let newEntry = new AjfCalendarEntry({
                    type: 'year',
                    date: date,
                    selected: 'none'
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate = addYears(curDate, 1);
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    }
    /**
     * @private
     * @return {?}
     */
    _buildYearView() {
        this._viewHeader = `${this._viewDate.getFullYear()}`;
        /** @type {?} */
        let curDate = startOfYear(this._viewDate);
        /** @type {?} */
        let rows = [];
        for (let i = 0; i < 4; i++) {
            /** @type {?} */
            let row = [];
            for (let j = 0; j < 3; j++) {
                /** @type {?} */
                let date = new Date(curDate);
                /** @type {?} */
                let newEntry = new AjfCalendarEntry({
                    type: 'month',
                    date: date,
                    selected: 'none'
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate = addMonths(curDate, 1);
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    }
    /**
     * @private
     * @return {?}
     */
    _buildMonthView() {
        this._viewHeader = format(this._viewDate, 'MMM YYYY');
        this._buildMonthViewWeekDays();
        /** @type {?} */
        const monthDay = new Date(this._viewDate.getFullYear(), this._viewDate.getMonth(), 5);
        /** @type {?} */
        const monthBounds = this._getMonthStartEnd(monthDay);
        /** @type {?} */
        let viewStartDate = new Date(monthBounds.start);
        /** @type {?} */
        let viewEndDate = new Date(monthBounds.end);
        if (!this._isoMode) {
            viewStartDate = startOfWeek(viewStartDate);
            viewEndDate = endOfWeek(viewEndDate);
        }
        /** @type {?} */
        let rows = [];
        /** @type {?} */
        let todayDate = new Date();
        /** @type {?} */
        let curDate = new Date(viewStartDate);
        /** @type {?} */
        let minDate = this.minDate == null ? null : new Date(this.minDate);
        /** @type {?} */
        let maxDate = this.maxDate == null ? null : new Date(this.maxDate);
        while (curDate < viewEndDate) {
            /** @type {?} */
            let row = [];
            for (let i = 0; i < 7; i++) {
                /** @type {?} */
                let disabled = (minDate != null && isBefore(curDate, minDate)) ||
                    (maxDate != null && isAfter(curDate, maxDate));
                /** @type {?} */
                let date = new Date(curDate);
                /** @type {?} */
                let newEntry = new AjfCalendarEntry({
                    type: 'day',
                    date: date,
                    selected: 'none',
                    highlight: format(todayDate, 'YYYY-MM-DD') === format(curDate, 'YYYY-MM-DD'),
                    disabled: disabled
                });
                newEntry.selected = this._isEntrySelected(newEntry);
                row.push(newEntry);
                curDate = addDays(curDate, 1);
            }
            rows.push(row);
        }
        this._calendarRows = rows;
    }
    /**
     * @private
     * @return {?}
     */
    _buildMonthViewWeekDays() {
        /** @type {?} */
        let curDate;
        if (this._isoMode) {
            curDate = setISODay(startOfWeek(this._viewDate), 1);
        }
        else {
            curDate = startOfWeek(this._viewDate);
        }
        /** @type {?} */
        let weekDayNames = [];
        for (let i = 0; i < 7; i++) {
            weekDayNames.push(format(curDate, 'dddd'));
            curDate = addDays(curDate, 1);
        }
        this._weekDays = weekDayNames;
        this._cdr.markForCheck();
    }
    /**
     * @private
     * @param {?} entryType
     * @return {?}
     */
    _periodOrder(entryType) {
        return ['day', 'week', 'month', 'year'].indexOf(entryType);
    }
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    _isEntrySelected(entry) {
        if (this._selectedPeriod != null && this._selectedPeriod.startDate != null &&
            this._selectedPeriod.endDate != null) {
            /** @type {?} */
            let selectionStart = startOfDay(this._selectedPeriod.startDate);
            /** @type {?} */
            let selectionEnd = endOfDay(this._selectedPeriod.endDate);
            /** @type {?} */
            let selectionPeriodOrder = this._periodOrder(this._selectedPeriod.type);
            /** @type {?} */
            let entryPeriodOrder = this._periodOrder(entry.type);
            /** @type {?} */
            let entryRange = entry.getRange();
            if (entryPeriodOrder <= selectionPeriodOrder &&
                this._isBetween(entryRange.start, selectionStart, selectionEnd) &&
                this._isBetween(entryRange.end, selectionStart, selectionEnd)) {
                return 'full';
            }
            else if (entryPeriodOrder > selectionPeriodOrder &&
                this._isBetween(selectionStart, entryRange.start, entryRange.end) &&
                this._isBetween(selectionEnd, entryRange.start, entryRange.end)) {
                return 'partial';
            }
        }
        return 'none';
    }
    /**
     * @private
     * @param {?} date
     * @param {?} rangeLeft
     * @param {?} rangeRight
     * @return {?}
     */
    _isBetween(date, rangeLeft, rangeRight) {
        return (isAfter(date, rangeLeft) || isSameDay(date, rangeLeft))
            && (isBefore(date, rangeRight) || isSameDay(date, rangeRight));
    }
    /**
     * @private
     * @return {?}
     */
    _refreshSelection() {
        for (let row of this._calendarRows) {
            for (let entry of row) {
                entry.selected = this._isEntrySelected(entry);
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

export { AjfCalendar, AjfCalendarChange, AjfCalendarEntry, AjfCalendarPeriod };
//# sourceMappingURL=calendar.js.map
