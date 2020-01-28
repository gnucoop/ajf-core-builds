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
import { Injectable, Pipe, NgModule, EventEmitter } from '@angular/core';
import { format, startOfMonth, endOfMonth, getISODay, endOfISOWeek, startOfISOWeek, addWeeks, subWeeks, startOfYear, endOfYear, startOfDay, endOfDay, isAfter, isSameDay, isBefore, addMonths, addYears, subMonths, subYears, setISODay, startOfWeek, addDays, endOfWeek, parse } from 'date-fns';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} date
 * @param {?} rangeLeft
 * @param {?} rangeRight
 * @return {?}
 */
function isBetween(date, rangeLeft, rangeRight) {
    return (isAfter(date, rangeLeft) || isSameDay(date, rangeLeft))
        && (isBefore(date, rangeRight) || isSameDay(date, rangeRight));
}
/**
 * @param {?} entryType
 * @return {?}
 */
function periodOrder(entryType) {
    return ['day', 'week', 'month', 'year'].indexOf(entryType);
}
var AjfCalendarService = /** @class */ (function () {
    function AjfCalendarService() {
    }
    /**
     * @param {?} params
     * @return {?}
     */
    AjfCalendarService.prototype.buildView = /**
     * @param {?} params
     * @return {?}
     */
    function (params) {
        var viewMode = params.viewMode, viewDate = params.viewDate;
        switch (viewMode) {
            case 'decade':
                /** @type {?} */
                var curYear = viewDate.getFullYear();
                /** @type {?} */
                var firstYear = curYear - (curYear % 10) + 1;
                /** @type {?} */
                var lastYear = firstYear + 11;
                return {
                    header: firstYear + " - " + lastYear,
                    headerRow: [],
                    rows: this._decadeCalendarRows(params),
                };
            case 'year':
                return {
                    header: "" + viewDate.getFullYear(),
                    headerRow: [],
                    rows: this._yearCalendarRows(params),
                };
            case 'month':
                return {
                    header: format(viewDate, 'MMM YYYY'),
                    headerRow: this._monthHeaderRow(params),
                    rows: this._monthCalendarRows(params),
                };
        }
        return {
            header: '',
            headerRow: [],
            rows: [],
        };
    };
    /**
     * @param {?} date
     * @param {?} isoMode
     * @return {?}
     */
    AjfCalendarService.prototype.monthBounds = /**
     * @param {?} date
     * @param {?} isoMode
     * @return {?}
     */
    function (date, isoMode) {
        if (!isoMode) {
            return {
                start: startOfMonth(date),
                end: endOfMonth(date),
            };
        }
        /** @type {?} */
        var isoDay = getISODay(date);
        date = isoDay < 4 ? endOfISOWeek(date) : startOfISOWeek(date);
        /** @type {?} */
        var startDate = startOfMonth(date);
        /** @type {?} */
        var endDate = endOfMonth(startDate);
        /** @type {?} */
        var startWeekDay = startDate.getDay();
        /** @type {?} */
        var endWeekDay = endDate.getDay();
        if (startWeekDay == 0 || startWeekDay > 4) {
            startDate = addWeeks(startDate, 1);
        }
        if (endWeekDay > 0 && endWeekDay < 4) {
            endDate = subWeeks(endDate, 1);
        }
        startDate = startOfISOWeek(startDate);
        endDate = endOfISOWeek(endDate);
        return { start: startDate, end: endDate };
    };
    /**
     * @param {?} entry
     * @return {?}
     */
    AjfCalendarService.prototype.getEntryRange = /**
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        if (entry.type === 'day') {
            return { start: new Date(entry.date), end: new Date(entry.date) };
        }
        else {
            /** @type {?} */
            var curDate = new Date(entry.date);
            return {
                start: entry.type === 'month' ? startOfMonth(curDate) : startOfYear(curDate),
                end: entry.type === 'month' ? endOfMonth(curDate) : endOfYear(curDate)
            };
        }
    };
    /**
     * @param {?} entry
     * @param {?} selection
     * @return {?}
     */
    AjfCalendarService.prototype.isEntrySelected = /**
     * @param {?} entry
     * @param {?} selection
     * @return {?}
     */
    function (entry, selection) {
        if (selection != null && selection.startDate != null && selection.endDate != null) {
            /** @type {?} */
            var selectionStart = startOfDay(selection.startDate);
            /** @type {?} */
            var selectionEnd = endOfDay(selection.endDate);
            /** @type {?} */
            var selectionPeriodOrder = periodOrder(selection.type);
            /** @type {?} */
            var entryPeriodOrder = periodOrder(entry.type);
            /** @type {?} */
            var entryRange = this.getEntryRange(entry);
            if (entryPeriodOrder <= selectionPeriodOrder &&
                isBetween(entryRange.start, selectionStart, selectionEnd) &&
                isBetween(entryRange.end, selectionStart, selectionEnd)) {
                return 'full';
            }
            else if (entryPeriodOrder > selectionPeriodOrder &&
                isBetween(selectionStart, entryRange.start, entryRange.end) &&
                isBetween(selectionEnd, entryRange.start, entryRange.end)) {
                return 'partial';
            }
        }
        return 'none';
    };
    /**
     * @param {?} entry
     * @return {?}
     */
    AjfCalendarService.prototype.entryLabel = /**
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        if (entry.type === 'day') {
            return "" + entry.date.getDate();
        }
        if (entry.type === 'month') {
            return format(entry.date, 'MMM');
        }
        return "" + entry.date.getFullYear();
    };
    /**
     * @param {?} viewDate
     * @param {?} viewMode
     * @return {?}
     */
    AjfCalendarService.prototype.nextView = /**
     * @param {?} viewDate
     * @param {?} viewMode
     * @return {?}
     */
    function (viewDate, viewMode) {
        if (viewMode == 'month') {
            return addMonths(viewDate, 1);
        }
        else if (viewMode == 'year') {
            return addYears(viewDate, 1);
        }
        else if (viewMode == 'decade') {
            return addYears(viewDate, 10);
        }
        return viewDate;
    };
    /**
     * @param {?} viewDate
     * @param {?} viewMode
     * @return {?}
     */
    AjfCalendarService.prototype.previousView = /**
     * @param {?} viewDate
     * @param {?} viewMode
     * @return {?}
     */
    function (viewDate, viewMode) {
        if (viewMode == 'month') {
            return subMonths(viewDate, 1);
        }
        else if (viewMode == 'year') {
            return subYears(viewDate, 1);
        }
        else if (viewMode == 'decade') {
            return subYears(viewDate, 10);
        }
        return viewDate;
    };
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    AjfCalendarService.prototype._monthHeaderRow = /**
     * @private
     * @param {?} params
     * @return {?}
     */
    function (params) {
        var isoMode = params.isoMode, viewDate = params.viewDate;
        /** @type {?} */
        var curDate;
        if (isoMode) {
            curDate = setISODay(startOfWeek(viewDate), 1);
        }
        else {
            curDate = startOfWeek(viewDate);
        }
        /** @type {?} */
        var weekDayNames = [];
        for (var i = 0; i < 7; i++) {
            weekDayNames.push(format(curDate, 'dddd'));
            curDate = addDays(curDate, 1);
        }
        return weekDayNames;
    };
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    AjfCalendarService.prototype._decadeCalendarRows = /**
     * @private
     * @param {?} params
     * @return {?}
     */
    function (params) {
        var viewDate = params.viewDate, selection = params.selection;
        /** @type {?} */
        var curYear = viewDate.getFullYear();
        /** @type {?} */
        var firstYear = curYear - (curYear % 10) + 1;
        /** @type {?} */
        var curDate = startOfYear(viewDate);
        curDate.setFullYear(firstYear);
        /** @type {?} */
        var rows = [];
        for (var i = 0; i < 4; i++) {
            /** @type {?} */
            var row = [];
            for (var j = 0; j < 3; j++) {
                /** @type {?} */
                var date = new Date(curDate);
                /** @type {?} */
                var newEntry = {
                    type: 'year',
                    date: date,
                    selected: 'none'
                };
                newEntry.selected = this.isEntrySelected(newEntry, selection);
                row.push(newEntry);
                curDate = addYears(curDate, 1);
            }
            rows.push(row);
        }
        return rows;
    };
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    AjfCalendarService.prototype._yearCalendarRows = /**
     * @private
     * @param {?} params
     * @return {?}
     */
    function (params) {
        var viewDate = params.viewDate, selection = params.selection;
        /** @type {?} */
        var curDate = startOfYear(viewDate);
        /** @type {?} */
        var rows = [];
        for (var i = 0; i < 4; i++) {
            /** @type {?} */
            var row = [];
            for (var j = 0; j < 3; j++) {
                /** @type {?} */
                var date = new Date(curDate);
                /** @type {?} */
                var newEntry = {
                    type: 'month',
                    date: date,
                    selected: 'none'
                };
                newEntry.selected = this.isEntrySelected(newEntry, selection);
                row.push(newEntry);
                curDate = addMonths(curDate, 1);
            }
            rows.push(row);
        }
        return rows;
    };
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    AjfCalendarService.prototype._monthCalendarRows = /**
     * @private
     * @param {?} params
     * @return {?}
     */
    function (params) {
        var viewDate = params.viewDate, selection = params.selection, isoMode = params.isoMode, minDate = params.minDate, maxDate = params.maxDate;
        /** @type {?} */
        var monthBounds = this.monthBounds(viewDate, isoMode);
        /** @type {?} */
        var viewStartDate = new Date(monthBounds.start);
        /** @type {?} */
        var viewEndDate = new Date(monthBounds.end);
        if (!isoMode) {
            viewStartDate = startOfWeek(viewStartDate);
            viewEndDate = endOfWeek(viewEndDate);
        }
        /** @type {?} */
        var rows = [];
        /** @type {?} */
        var todayDate = new Date();
        /** @type {?} */
        var curDate = new Date(viewStartDate);
        while (curDate < viewEndDate) {
            /** @type {?} */
            var row = [];
            for (var i = 0; i < 7; i++) {
                /** @type {?} */
                var disabled = (minDate != null && isBefore(curDate, minDate)) ||
                    (maxDate != null && isAfter(curDate, maxDate));
                /** @type {?} */
                var date = new Date(curDate);
                /** @type {?} */
                var newEntry = {
                    type: 'day',
                    date: date,
                    selected: 'none',
                    highlight: format(todayDate, 'YYYY-MM-DD') === format(curDate, 'YYYY-MM-DD'),
                    disabled: disabled
                };
                newEntry.selected = this.isEntrySelected(newEntry, selection);
                row.push(newEntry);
                curDate = addDays(curDate, 1);
            }
            rows.push(row);
        }
        return rows;
    };
    AjfCalendarService.decorators = [
        { type: Injectable },
    ];
    return AjfCalendarService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfCalendarEntryLabelPipe = /** @class */ (function () {
    function AjfCalendarEntryLabelPipe(_service) {
        this._service = _service;
    }
    /**
     * @param {?} entry
     * @return {?}
     */
    AjfCalendarEntryLabelPipe.prototype.transform = /**
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        return this._service.entryLabel(entry);
    };
    AjfCalendarEntryLabelPipe.decorators = [
        { type: Injectable },
        { type: Pipe, args: [{ name: 'ajfCalendarEntryLabel' },] },
    ];
    /** @nocollapse */
    AjfCalendarEntryLabelPipe.ctorParameters = function () { return [
        { type: AjfCalendarService }
    ]; };
    return AjfCalendarEntryLabelPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var AjfCalendarModule = /** @class */ (function () {
    function AjfCalendarModule() {
    }
    AjfCalendarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AjfCalendarEntryLabelPipe,
                    ],
                    exports: [
                        AjfCalendarEntryLabelPipe,
                    ],
                    providers: [
                        AjfCalendarService,
                    ],
                },] },
    ];
    return AjfCalendarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

var AjfCalendarPeriod = /** @class */ (function () {
    function AjfCalendarPeriod() {
    }
    return AjfCalendarPeriod;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var weekDays = [
    '', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];
var AjfCalendarChange = /** @class */ (function () {
    function AjfCalendarChange() {
    }
    return AjfCalendarChange;
}());
/**
 * @abstract
 */
var  /**
 * @abstract
 */
AjfCalendar = /** @class */ (function () {
    function AjfCalendar(_cdr, _service) {
        this._cdr = _cdr;
        this._service = _service;
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
        this._calendarHeaders = [];
        this._onChangeCallback = (/**
         * @param {?} _
         * @return {?}
         */
        function (_) { });
        this._onTouchedCallback = (/**
         * @return {?}
         */
        function () { });
    }
    Object.defineProperty(AjfCalendar.prototype, "viewDate", {
        get: /**
         * @return {?}
         */
        function () { return this._viewDate; },
        set: /**
         * @param {?} viewDate
         * @return {?}
         */
        function (viewDate) {
            this._setViewDate(viewDate);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "disabled", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} disabled
         * @return {?}
         */
        function (disabled) {
            /** @type {?} */
            var newDisabled = disabled != null && "" + disabled !== 'false';
            if (newDisabled !== this._disabled) {
                this._disabled = newDisabled;
                this._cdr.markForCheck();
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "dateOnlyForDay", {
        get: /**
         * @return {?}
         */
        function () { return this._disabled; },
        set: /**
         * @param {?} dateOnlyForDay
         * @return {?}
         */
        function (dateOnlyForDay) {
            this._dateOnlyForDay = dateOnlyForDay != null && "" + dateOnlyForDay !== 'false';
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "viewMode", {
        get: /**
         * @return {?}
         */
        function () { return this._viewMode; },
        set: /**
         * @param {?} viewMode
         * @return {?}
         */
        function (viewMode) {
            this._viewMode = viewMode;
            this._buildCalendar();
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "selectionMode", {
        get: /**
         * @return {?}
         */
        function () { return this._selectionMode; },
        set: /**
         * @param {?} selectionMode
         * @return {?}
         */
        function (selectionMode) {
            this._selectionMode = selectionMode;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "startOfWeekDay", {
        get: /**
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (weekDays[this._startOfWeekDay]));
        },
        set: /**
         * @param {?} weekDay
         * @return {?}
         */
        function (weekDay) {
            this._startOfWeekDay = weekDays.indexOf(weekDay);
            if (this._viewMode === 'month') {
                this._buildCalendar();
            }
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "isoMode", {
        get: /**
         * @return {?}
         */
        function () { return this._isoMode; },
        set: /**
         * @param {?} isoMode
         * @return {?}
         */
        function (isoMode) {
            this._isoMode = isoMode;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "minDate", {
        get: /**
         * @return {?}
         */
        function () { return this._minDate; },
        set: /**
         * @param {?} minDate
         * @return {?}
         */
        function (minDate) {
            this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "maxDate", {
        get: /**
         * @return {?}
         */
        function () { return this._maxDate; },
        set: /**
         * @param {?} maxDate
         * @return {?}
         */
        function (maxDate) {
            this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "change", {
        get: /**
         * @return {?}
         */
        function () {
            return this._change.asObservable();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "selectedPeriod", {
        set: /**
         * @private
         * @param {?} period
         * @return {?}
         */
        function (period) {
            this._selectedPeriod = period;
            this._change.emit({
                source: this,
                period: period
            });
            this._refreshSelection();
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            if (this._dateOnlyForDay && this.selectionMode === 'day') {
                return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
            }
            return this._selectedPeriod;
        },
        set: /**
         * @param {?} period
         * @return {?}
         */
        function (period) {
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
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "calendarHeaders", {
        get: /**
         * @return {?}
         */
        function () { return this._calendarHeaders; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "calendarRows", {
        get: /**
         * @return {?}
         */
        function () { return this._calendarRows; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "viewHeader", {
        get: /**
         * @return {?}
         */
        function () { return this._viewHeader; },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    AjfCalendar.prototype.prevPage = /**
     * @return {?}
     */
    function () {
        this.viewDate = this._service.previousView(this._viewDate, this._viewMode);
        this._buildCalendar();
    };
    /**
     * @return {?}
     */
    AjfCalendar.prototype.nextPage = /**
     * @return {?}
     */
    function () {
        this.viewDate = this._service.nextView(this._viewDate, this._viewMode);
        this._buildCalendar();
    };
    /**
     * @return {?}
     */
    AjfCalendar.prototype.previousViewMode = /**
     * @return {?}
     */
    function () {
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
    };
    /**
     * @param {?} entry
     * @return {?}
     */
    AjfCalendar.prototype.selectEntry = /**
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        if (!this._canSelectEntry(entry)) {
            return this._nextViewMode(entry);
        }
        /** @type {?} */
        var newPeriod = null;
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
                    startOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay }),
                endDate: this._isoMode ?
                    endOfISOWeek(entry.date) :
                    endOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay })
            };
        }
        else if (this._selectionMode == 'month') {
            /** @type {?} */
            var monthBounds = this._service.monthBounds(entry.date, this._isoMode);
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
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AjfCalendar.prototype.registerOnChange = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onChangeCallback = fn;
    };
    /**
     * @param {?} fn
     * @return {?}
     */
    AjfCalendar.prototype.registerOnTouched = /**
     * @param {?} fn
     * @return {?}
     */
    function (fn) {
        this._onTouchedCallback = fn;
    };
    /**
     * @param {?} value
     * @return {?}
     */
    AjfCalendar.prototype.writeValue = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (typeof value === 'string') {
            value = parse(value);
        }
        this.value = value;
    };
    /**
     * @return {?}
     */
    AjfCalendar.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this._buildCalendar();
    };
    /**
     * @return {?}
     */
    AjfCalendar.prototype.ngAfterContentInit = /**
     * @return {?}
     */
    function () {
        this._refreshSelection();
    };
    /**
     * @private
     * @param {?} date
     * @return {?}
     */
    AjfCalendar.prototype._setViewDate = /**
     * @private
     * @param {?} date
     * @return {?}
     */
    function (date) {
        this._viewDate = date;
    };
    /**
     * @private
     * @return {?}
     */
    AjfCalendar.prototype._buildCalendar = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var calendarView = this._service.buildView({
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
    };
    /**
     * @private
     * @return {?}
     */
    AjfCalendar.prototype._refreshSelection = /**
     * @private
     * @return {?}
     */
    function () {
        for (var _i = 0, _a = this._calendarRows; _i < _a.length; _i++) {
            var row = _a[_i];
            for (var _b = 0, row_1 = row; _b < row_1.length; _b++) {
                var entry = row_1[_b];
                entry.selected = this._service.isEntrySelected(entry, this._selectedPeriod);
            }
        }
    };
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    AjfCalendar.prototype._canSelectEntry = /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
        if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
            return false;
        }
        if (this._selectionMode == 'month' && entry.type == 'year') {
            return false;
        }
        return true;
    };
    /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    AjfCalendar.prototype._nextViewMode = /**
     * @private
     * @param {?} entry
     * @return {?}
     */
    function (entry) {
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
    };
    return AjfCalendar;
}());

export { AjfCalendar, AjfCalendarChange, AjfCalendarModule, AjfCalendarPeriod, AjfCalendarService, AjfCalendarEntryLabelPipe as ɵa };
//# sourceMappingURL=calendar.es5.js.map
