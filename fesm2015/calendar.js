import { Injectable, ɵɵdefineInjectable, Pipe, NgModule, EventEmitter, Directive, ChangeDetectorRef, Input, Output } from '@angular/core';
import { isAfter, isSameDay, isBefore, format, startOfMonth, endOfMonth, getISODay, endOfISOWeek, startOfISOWeek, addWeeks, subWeeks, startOfYear, endOfYear, startOfDay, endOfDay, addMonths, addYears, subMonths, subYears, setISODay, startOfWeek, addDays, endOfWeek, parseISO } from 'date-fns';
import 'rxjs';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function AjfCalendarParams() { }
if (false) {
    /** @type {?} */
    AjfCalendarParams.prototype.viewMode;
    /** @type {?} */
    AjfCalendarParams.prototype.viewDate;
    /** @type {?} */
    AjfCalendarParams.prototype.selection;
    /** @type {?} */
    AjfCalendarParams.prototype.isoMode;
    /** @type {?} */
    AjfCalendarParams.prototype.minDate;
    /** @type {?} */
    AjfCalendarParams.prototype.maxDate;
}
/**
 * @param {?} date
 * @param {?} rangeLeft
 * @param {?} rangeRight
 * @return {?}
 */
function isBetween(date, rangeLeft, rangeRight) {
    return (isAfter(date, rangeLeft) || isSameDay(date, rangeLeft)) &&
        (isBefore(date, rangeRight) || isSameDay(date, rangeRight));
}
/**
 * @param {?} entryType
 * @return {?}
 */
function periodOrder(entryType) {
    return ['day', 'week', 'month', 'year'].indexOf(entryType);
}
class AjfCalendarService {
    /**
     * @param {?} params
     * @return {?}
     */
    buildView(params) {
        const { viewMode, viewDate } = params;
        switch (viewMode) {
            case 'decade':
                /** @type {?} */
                let curYear = viewDate.getFullYear();
                /** @type {?} */
                let firstYear = curYear - (curYear % 10) + 1;
                /** @type {?} */
                let lastYear = firstYear + 11;
                return {
                    header: `${firstYear} - ${lastYear}`,
                    headerRow: [],
                    rows: this._decadeCalendarRows(params),
                };
            case 'year':
                return {
                    header: `${viewDate.getFullYear()}`,
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
    }
    /**
     * @param {?} date
     * @param {?} isoMode
     * @return {?}
     */
    monthBounds(date, isoMode) {
        if (!isoMode) {
            return {
                start: startOfMonth(date),
                end: endOfMonth(date),
            };
        }
        /** @type {?} */
        const isoDay = getISODay(date);
        date = isoDay < 4 ? endOfISOWeek(date) : startOfISOWeek(date);
        /** @type {?} */
        let startDate = startOfMonth(date);
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
     * @param {?} entry
     * @return {?}
     */
    getEntryRange(entry) {
        if (entry.type === 'day') {
            return { start: new Date(entry.date), end: new Date(entry.date) };
        }
        else {
            /** @type {?} */
            let curDate = new Date(entry.date);
            return {
                start: entry.type === 'month' ? startOfMonth(curDate) : startOfYear(curDate),
                end: entry.type === 'month' ? endOfMonth(curDate) : endOfYear(curDate)
            };
        }
    }
    /**
     * @param {?} entry
     * @param {?} selection
     * @return {?}
     */
    isEntrySelected(entry, selection) {
        if (selection != null && selection.startDate != null && selection.endDate != null) {
            /** @type {?} */
            let selectionStart = startOfDay(selection.startDate);
            /** @type {?} */
            let selectionEnd = endOfDay(selection.endDate);
            /** @type {?} */
            let selectionPeriodOrder = periodOrder(selection.type);
            /** @type {?} */
            let entryPeriodOrder = periodOrder(entry.type);
            /** @type {?} */
            let entryRange = this.getEntryRange(entry);
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
    }
    /**
     * @param {?} entry
     * @return {?}
     */
    entryLabel(entry) {
        if (entry.type === 'day') {
            return `${entry.date.getDate()}`;
        }
        if (entry.type === 'month') {
            return format(entry.date, 'MMM');
        }
        return `${entry.date.getFullYear()}`;
    }
    /**
     * @param {?} viewDate
     * @param {?} viewMode
     * @return {?}
     */
    nextView(viewDate, viewMode) {
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
    }
    /**
     * @param {?} viewDate
     * @param {?} viewMode
     * @return {?}
     */
    previousView(viewDate, viewMode) {
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
    }
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    _monthHeaderRow(params) {
        const { isoMode, viewDate } = params;
        /** @type {?} */
        let curDate;
        if (isoMode) {
            curDate = setISODay(startOfWeek(viewDate), 1);
        }
        else {
            curDate = startOfWeek(viewDate);
        }
        /** @type {?} */
        let weekDayNames = [];
        for (let i = 0; i < 7; i++) {
            weekDayNames.push(format(curDate, 'EEE'));
            curDate = addDays(curDate, 1);
        }
        return weekDayNames;
    }
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    _decadeCalendarRows(params) {
        const { viewDate, selection } = params;
        /** @type {?} */
        let curYear = viewDate.getFullYear();
        /** @type {?} */
        let firstYear = curYear - (curYear % 10) + 1;
        /** @type {?} */
        let curDate = startOfYear(viewDate);
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
                let newEntry = { type: 'year', date: date, selected: 'none' };
                newEntry.selected = this.isEntrySelected(newEntry, selection);
                row.push(newEntry);
                curDate = addYears(curDate, 1);
            }
            rows.push(row);
        }
        return rows;
    }
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    _yearCalendarRows(params) {
        const { viewDate, selection } = params;
        /** @type {?} */
        let curDate = startOfYear(viewDate);
        /** @type {?} */
        let rows = [];
        for (let i = 0; i < 4; i++) {
            /** @type {?} */
            let row = [];
            for (let j = 0; j < 3; j++) {
                /** @type {?} */
                let date = new Date(curDate);
                /** @type {?} */
                let newEntry = { type: 'month', date: date, selected: 'none' };
                newEntry.selected = this.isEntrySelected(newEntry, selection);
                row.push(newEntry);
                curDate = addMonths(curDate, 1);
            }
            rows.push(row);
        }
        return rows;
    }
    /**
     * @private
     * @param {?} params
     * @return {?}
     */
    _monthCalendarRows(params) {
        const { viewDate, selection, isoMode, minDate, maxDate } = params;
        /** @type {?} */
        const monthBounds = this.monthBounds(viewDate, isoMode);
        /** @type {?} */
        let viewStartDate = new Date(monthBounds.start);
        /** @type {?} */
        let viewEndDate = new Date(monthBounds.end);
        if (!isoMode) {
            viewStartDate = startOfWeek(viewStartDate);
            viewEndDate = endOfWeek(viewEndDate);
        }
        /** @type {?} */
        let rows = [];
        /** @type {?} */
        let todayDate = new Date();
        /** @type {?} */
        let curDate = new Date(viewStartDate);
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
                let newEntry = {
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
    }
}
AjfCalendarService.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
/** @nocollapse */ AjfCalendarService.ɵprov = ɵɵdefineInjectable({ factory: function AjfCalendarService_Factory() { return new AjfCalendarService(); }, token: AjfCalendarService, providedIn: "root" });

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-entry-label.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfCalendarEntryLabelPipe {
    /**
     * @param {?} _service
     */
    constructor(_service) {
        this._service = _service;
    }
    /**
     * @param {?} entry
     * @return {?}
     */
    transform(entry) {
        return this._service.entryLabel(entry);
    }
}
AjfCalendarEntryLabelPipe.decorators = [
    { type: Injectable },
    { type: Pipe, args: [{ name: 'ajfCalendarEntryLabel' },] }
];
/** @nocollapse */
AjfCalendarEntryLabelPipe.ctorParameters = () => [
    { type: AjfCalendarService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfCalendarEntryLabelPipe.prototype._service;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-entry-selected-state.ts
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

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-entry-type.ts
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

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-entry.ts
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
/**
 * @record
 */
function AjfCalendarEntry() { }
if (false) {
    /** @type {?} */
    AjfCalendarEntry.prototype.type;
    /** @type {?} */
    AjfCalendarEntry.prototype.date;
    /** @type {?} */
    AjfCalendarEntry.prototype.selected;
    /** @type {?|undefined} */
    AjfCalendarEntry.prototype.disabled;
    /** @type {?|undefined} */
    AjfCalendarEntry.prototype.highlight;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfCalendarModule {
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
class AjfGregorianCalendarModule {
}
AjfGregorianCalendarModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    AjfCalendarService,
                ],
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-period-type.ts
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

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-period.ts
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
class AjfCalendarPeriod {
}
if (false) {
    /** @type {?} */
    AjfCalendarPeriod.prototype.type;
    /** @type {?} */
    AjfCalendarPeriod.prototype.startDate;
    /** @type {?} */
    AjfCalendarPeriod.prototype.endDate;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-view.ts
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
/**
 * @record
 */
function AjfCalendarView() { }
if (false) {
    /** @type {?} */
    AjfCalendarView.prototype.header;
    /** @type {?} */
    AjfCalendarView.prototype.headerRow;
    /** @type {?} */
    AjfCalendarView.prototype.rows;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-view-mode.ts
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

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-week-day.ts
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

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
const weekDays = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
class AjfCalendarChange {
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
class AjfCalendar {
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
            value = parseISO(value);
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

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfCalendar, AjfCalendarChange, AjfCalendarEntryLabelPipe, AjfCalendarModule, AjfCalendarPeriod, AjfCalendarService, AjfGregorianCalendarModule };
//# sourceMappingURL=calendar.js.map
