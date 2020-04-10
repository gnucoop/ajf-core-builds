import { Injectable, ɵɵdefineInjectable, Pipe, NgModule, EventEmitter, Directive, ChangeDetectorRef, Input, Output } from '@angular/core';
import { isAfter, isSameDay, isBefore, format, startOfMonth, endOfMonth, getISODay, endOfISOWeek, startOfISOWeek, addWeeks, subWeeks, startOfYear, endOfYear, startOfDay, endOfDay, addMonths, addYears, subMonths, subYears, setISODay, startOfWeek, addDays, endOfWeek, parseISO } from 'date-fns';
import { __values } from 'tslib';
import 'rxjs';

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
function isBetween(date, rangeLeft, rangeRight) {
    return (isAfter(date, rangeLeft) || isSameDay(date, rangeLeft)) &&
        (isBefore(date, rangeRight) || isSameDay(date, rangeRight));
}
function periodOrder(entryType) {
    return ['day', 'week', 'month', 'year'].indexOf(entryType);
}
var AjfCalendarService = /** @class */ (function () {
    function AjfCalendarService() {
    }
    AjfCalendarService.prototype.buildView = function (params) {
        var viewMode = params.viewMode, viewDate = params.viewDate;
        switch (viewMode) {
            case 'decade':
                var curYear = viewDate.getFullYear();
                var firstYear = curYear - (curYear % 10) + 1;
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
                    header: format(viewDate, 'MMM yyyy'),
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
    AjfCalendarService.prototype.monthBounds = function (date, isoMode) {
        if (!isoMode) {
            return {
                start: startOfMonth(date),
                end: endOfMonth(date),
            };
        }
        var isoDay = getISODay(date);
        date = isoDay < 4 ? endOfISOWeek(date) : startOfISOWeek(date);
        var startDate = startOfMonth(date);
        var endDate = endOfMonth(startDate);
        var startWeekDay = startDate.getDay();
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
    AjfCalendarService.prototype.getEntryRange = function (entry) {
        if (entry.type === 'day') {
            return { start: new Date(entry.date), end: new Date(entry.date) };
        }
        else {
            var curDate = new Date(entry.date);
            return {
                start: entry.type === 'month' ? startOfMonth(curDate) : startOfYear(curDate),
                end: entry.type === 'month' ? endOfMonth(curDate) : endOfYear(curDate)
            };
        }
    };
    AjfCalendarService.prototype.isEntrySelected = function (entry, selection) {
        if (selection != null && selection.startDate != null && selection.endDate != null) {
            var selectionStart = startOfDay(selection.startDate);
            var selectionEnd = endOfDay(selection.endDate);
            var selectionPeriodOrder = periodOrder(selection.type);
            var entryPeriodOrder = periodOrder(entry.type);
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
    AjfCalendarService.prototype.entryLabel = function (entry) {
        if (entry.type === 'day') {
            return "" + entry.date.getDate();
        }
        if (entry.type === 'month') {
            return format(entry.date, 'MMM');
        }
        return "" + entry.date.getFullYear();
    };
    AjfCalendarService.prototype.nextView = function (viewDate, viewMode) {
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
    AjfCalendarService.prototype.previousView = function (viewDate, viewMode) {
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
    AjfCalendarService.prototype._monthHeaderRow = function (params) {
        var isoMode = params.isoMode, viewDate = params.viewDate;
        var curDate;
        if (isoMode) {
            curDate = setISODay(startOfWeek(viewDate), 1);
        }
        else {
            curDate = startOfWeek(viewDate);
        }
        var weekDayNames = [];
        for (var i = 0; i < 7; i++) {
            weekDayNames.push(format(curDate, 'EEE'));
            curDate = addDays(curDate, 1);
        }
        return weekDayNames;
    };
    AjfCalendarService.prototype._decadeCalendarRows = function (params) {
        var viewDate = params.viewDate, selection = params.selection;
        var curYear = viewDate.getFullYear();
        var firstYear = curYear - (curYear % 10) + 1;
        var curDate = startOfYear(viewDate);
        curDate.setFullYear(firstYear);
        var rows = [];
        for (var i = 0; i < 4; i++) {
            var row = [];
            for (var j = 0; j < 3; j++) {
                var date = new Date(curDate);
                var newEntry = { type: 'year', date: date, selected: 'none' };
                newEntry.selected = this.isEntrySelected(newEntry, selection);
                row.push(newEntry);
                curDate = addYears(curDate, 1);
            }
            rows.push(row);
        }
        return rows;
    };
    AjfCalendarService.prototype._yearCalendarRows = function (params) {
        var viewDate = params.viewDate, selection = params.selection;
        var curDate = startOfYear(viewDate);
        var rows = [];
        for (var i = 0; i < 4; i++) {
            var row = [];
            for (var j = 0; j < 3; j++) {
                var date = new Date(curDate);
                var newEntry = { type: 'month', date: date, selected: 'none' };
                newEntry.selected = this.isEntrySelected(newEntry, selection);
                row.push(newEntry);
                curDate = addMonths(curDate, 1);
            }
            rows.push(row);
        }
        return rows;
    };
    AjfCalendarService.prototype._monthCalendarRows = function (params) {
        var viewDate = params.viewDate, selection = params.selection, isoMode = params.isoMode, minDate = params.minDate, maxDate = params.maxDate;
        var monthBounds = this.monthBounds(viewDate, isoMode);
        var viewStartDate = new Date(monthBounds.start);
        var viewEndDate = new Date(monthBounds.end);
        if (!isoMode) {
            viewStartDate = startOfWeek(viewStartDate);
            viewEndDate = endOfWeek(viewEndDate);
        }
        var rows = [];
        var todayDate = new Date();
        var curDate = new Date(viewStartDate);
        while (curDate < viewEndDate) {
            var row = [];
            for (var i = 0; i < 7; i++) {
                var disabled = (minDate != null && isBefore(curDate, minDate)) ||
                    (maxDate != null && isAfter(curDate, maxDate));
                var date = new Date(curDate);
                var newEntry = {
                    type: 'day',
                    date: date,
                    selected: 'none',
                    highlight: format(todayDate, 'yyyy-MM-dd') === format(curDate, 'yyyy-MM-dd'),
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
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    AjfCalendarService.ɵprov = ɵɵdefineInjectable({ factory: function AjfCalendarService_Factory() { return new AjfCalendarService(); }, token: AjfCalendarService, providedIn: "root" });
    return AjfCalendarService;
}());

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
var AjfCalendarEntryLabelPipe = /** @class */ (function () {
    function AjfCalendarEntryLabelPipe(_service) {
        this._service = _service;
    }
    AjfCalendarEntryLabelPipe.prototype.transform = function (entry) {
        return this._service.entryLabel(entry);
    };
    AjfCalendarEntryLabelPipe.decorators = [
        { type: Injectable },
        { type: Pipe, args: [{ name: 'ajfCalendarEntryLabel' },] }
    ];
    /** @nocollapse */
    AjfCalendarEntryLabelPipe.ctorParameters = function () { return [
        { type: AjfCalendarService }
    ]; };
    return AjfCalendarEntryLabelPipe;
}());

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
                },] }
    ];
    return AjfCalendarModule;
}());
var AjfGregorianCalendarModule = /** @class */ (function () {
    function AjfGregorianCalendarModule() {
    }
    AjfGregorianCalendarModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        AjfCalendarService,
                    ],
                },] }
    ];
    return AjfGregorianCalendarModule;
}());

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
var AjfCalendarPeriod = /** @class */ (function () {
    function AjfCalendarPeriod() {
    }
    return AjfCalendarPeriod;
}());

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
var weekDays = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
var AjfCalendarChange = /** @class */ (function () {
    function AjfCalendarChange() {
    }
    return AjfCalendarChange;
}());
var AjfCalendar = /** @class */ (function () {
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
        this.change = this._change.asObservable();
        this._viewDate = new Date();
        this._viewHeader = '';
        this._calendarRows = [];
        this._calendarHeaders = [];
        this._onChangeCallback = function (_) { };
        this._onTouchedCallback = function () { };
    }
    Object.defineProperty(AjfCalendar.prototype, "viewDate", {
        get: function () {
            return this._viewDate;
        },
        set: function (viewDate) {
            this._setViewDate(viewDate);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (disabled) {
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
        get: function () {
            return this._disabled;
        },
        set: function (dateOnlyForDay) {
            this._dateOnlyForDay = dateOnlyForDay != null && "" + dateOnlyForDay !== 'false';
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "viewMode", {
        get: function () {
            return this._viewMode;
        },
        set: function (viewMode) {
            this._viewMode = viewMode;
            this._buildCalendar();
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "selectionMode", {
        get: function () {
            return this._selectionMode;
        },
        set: function (selectionMode) {
            this._selectionMode = selectionMode;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "startOfWeekDay", {
        get: function () {
            return weekDays[this._startOfWeekDay];
        },
        set: function (weekDay) {
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
        get: function () {
            return this._isoMode;
        },
        set: function (isoMode) {
            this._isoMode = isoMode;
            this._buildCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "minDate", {
        get: function () {
            return this._minDate;
        },
        set: function (minDate) {
            this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "maxDate", {
        get: function () {
            return this._maxDate;
        },
        set: function (maxDate) {
            this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "selectedPeriod", {
        set: function (period) {
            this._selectedPeriod = period;
            this._change.emit({ source: this, period: period });
            this._refreshSelection();
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "value", {
        get: function () {
            if (this._dateOnlyForDay && this.selectionMode === 'day') {
                return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
            }
            return this._selectedPeriod;
        },
        set: function (period) {
            if (this._dateOnlyForDay && this.selectionMode === 'day' && period instanceof Date &&
                (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
                this.selectedPeriod = { type: 'day', startDate: period, endDate: period };
            }
            else if (period instanceof Object && period !== this._selectedPeriod) {
                this.selectedPeriod = period;
                this._onChangeCallback(period);
            }
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "calendarHeaders", {
        get: function () {
            return this._calendarHeaders;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "calendarRows", {
        get: function () {
            return this._calendarRows;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "viewHeader", {
        get: function () {
            return this._viewHeader;
        },
        enumerable: true,
        configurable: true
    });
    AjfCalendar.prototype.prevPage = function () {
        this.viewDate = this._service.previousView(this._viewDate, this._viewMode);
        this._buildCalendar();
    };
    AjfCalendar.prototype.nextPage = function () {
        this.viewDate = this._service.nextView(this._viewDate, this._viewMode);
        this._buildCalendar();
    };
    AjfCalendar.prototype.previousViewMode = function () {
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
    AjfCalendar.prototype.selectEntry = function (entry) {
        if (!this._canSelectEntry(entry)) {
            return this._nextViewMode(entry);
        }
        var newPeriod = null;
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
                    weekStartsOn: this._startOfWeekDay
                }),
                endDate: this._isoMode ?
                    endOfISOWeek(entry.date) :
                    endOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay })
            };
        }
        else if (this._selectionMode == 'month') {
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
    AjfCalendar.prototype.registerOnChange = function (fn) {
        this._onChangeCallback = fn;
    };
    AjfCalendar.prototype.registerOnTouched = function (fn) {
        this._onTouchedCallback = fn;
    };
    AjfCalendar.prototype.writeValue = function (value) {
        if (typeof value === 'string') {
            value = parseISO(value);
        }
        this.value = value;
    };
    AjfCalendar.prototype.ngOnInit = function () {
        this._buildCalendar();
    };
    AjfCalendar.prototype.ngAfterContentInit = function () {
        this._refreshSelection();
    };
    AjfCalendar.prototype._setViewDate = function (date) {
        this._viewDate = date;
    };
    AjfCalendar.prototype._buildCalendar = function () {
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
    AjfCalendar.prototype._refreshSelection = function () {
        var e_1, _a, e_2, _b;
        try {
            for (var _c = __values(this._calendarRows), _d = _c.next(); !_d.done; _d = _c.next()) {
                var row = _d.value;
                try {
                    for (var row_1 = (e_2 = void 0, __values(row)), row_1_1 = row_1.next(); !row_1_1.done; row_1_1 = row_1.next()) {
                        var entry = row_1_1.value;
                        entry.selected = this._service.isEntrySelected(entry, this._selectedPeriod);
                    }
                }
                catch (e_2_1) { e_2 = { error: e_2_1 }; }
                finally {
                    try {
                        if (row_1_1 && !row_1_1.done && (_b = row_1.return)) _b.call(row_1);
                    }
                    finally { if (e_2) throw e_2.error; }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_d && !_d.done && (_a = _c.return)) _a.call(_c);
            }
            finally { if (e_1) throw e_1.error; }
        }
    };
    AjfCalendar.prototype._canSelectEntry = function (entry) {
        if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
            return false;
        }
        if (this._selectionMode == 'month' && entry.type == 'year') {
            return false;
        }
        return true;
    };
    AjfCalendar.prototype._nextViewMode = function (entry) {
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
    AjfCalendar.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfCalendar.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfCalendarService }
    ]; };
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
    return AjfCalendar;
}());

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfCalendar, AjfCalendarChange, AjfCalendarEntryLabelPipe, AjfCalendarModule, AjfCalendarPeriod, AjfCalendarService, AjfGregorianCalendarModule };
//# sourceMappingURL=calendar.js.map
