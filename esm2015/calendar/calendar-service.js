/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-service.ts
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
import { Injectable } from '@angular/core';
import { addDays, addMonths, addWeeks, addYears, endOfDay, endOfMonth, endOfISOWeek, endOfWeek, endOfYear, format, getISODay, isAfter, isBefore, isSameDay, setISODay, startOfDay, startOfISOWeek, startOfMonth, startOfWeek, startOfYear, subMonths, subWeeks, subYears } from 'date-fns';
import * as i0 from "@angular/core";
/**
 * @record
 */
export function AjfCalendarParams() { }
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
export class AjfCalendarService {
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
                let newEntry = {
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
                let newEntry = {
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
/** @nocollapse */ AjfCalendarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AjfCalendarService_Factory() { return new AjfCalendarService(); }, token: AjfCalendarService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NhbGVuZGFyL2NhbGVuZGFyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDM0YsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQ2pHLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sVUFBVSxDQUFDOzs7OztBQVN6Rix1Q0FPQzs7O0lBTkMscUNBQThCOztJQUM5QixxQ0FBZTs7SUFDZixzQ0FBa0M7O0lBQ2xDLG9DQUFpQjs7SUFDakIsb0NBQW1COztJQUNuQixvQ0FBbUI7Ozs7Ozs7O0FBR3JCLFNBQVMsU0FBUyxDQUFDLElBQVUsRUFBRSxTQUFlLEVBQUUsVUFBZ0I7SUFDOUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztXQUN4RCxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7Ozs7O0FBRUQsU0FBUyxXQUFXLENBQUMsU0FBZ0M7SUFDbkQsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FB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QUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3JDLE9BQU8sT0FBTyxHQUFHLFdBQVcsRUFBRTs7Z0JBQ3hCLEdBQUcsR0FBdUIsRUFBRTtZQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztvQkFDdEIsUUFBUSxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM1RCxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7b0JBQzVDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7O29CQUN4QixRQUFRLEdBQXFCO29CQUMvQixJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUUsSUFBSTtvQkFDVixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEtBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7b0JBQzVFLFFBQVEsRUFBRSxRQUFRO2lCQUNuQjtnQkFDRCxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUM5RCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMvQjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OztZQXJPRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHthZGREYXlzLCBhZGRNb250aHMsIGFkZFdlZWtzLCBhZGRZZWFycywgZW5kT2ZEYXksIGVuZE9mTW9udGgsIGVuZE9mSVNPV2VlaywgZW5kT2ZXZWVrLFxuICBlbmRPZlllYXIsIGZvcm1hdCwgZ2V0SVNPRGF5LCBpc0FmdGVyLCBpc0JlZm9yZSwgaXNTYW1lRGF5LCBzZXRJU09EYXksIHN0YXJ0T2ZEYXksIHN0YXJ0T2ZJU09XZWVrLFxuICBzdGFydE9mTW9udGgsIHN0YXJ0T2ZXZWVrLCBzdGFydE9mWWVhciwgc3ViTW9udGhzLCBzdWJXZWVrcywgc3ViWWVhcnN9IGZyb20gJ2RhdGUtZm5zJztcblxuaW1wb3J0IHtBamZDYWxlbmRhckVudHJ5fSBmcm9tICcuL2NhbGVuZGFyLWVudHJ5JztcbmltcG9ydCB7QWpmQ2FsZW5kYXJFbnRyeVNlbGVjdGVkU3RhdGV9IGZyb20gJy4vY2FsZW5kYXItZW50cnktc2VsZWN0ZWQtc3RhdGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhclBlcmlvZH0gZnJvbSAnLi9jYWxlbmRhci1wZXJpb2QnO1xuaW1wb3J0IHtBamZDYWxlbmRhclBlcmlvZFR5cGV9IGZyb20gJy4vY2FsZW5kYXItcGVyaW9kLXR5cGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhclZpZXd9IGZyb20gJy4vY2FsZW5kYXItdmlldyc7XG5pbXBvcnQge0FqZkNhbGVuZGFyVmlld01vZGV9IGZyb20gJy4vY2FsZW5kYXItdmlldy1tb2RlJztcblxuZXhwb3J0IGludGVyZmFjZSBBamZDYWxlbmRhclBhcmFtcyB7XG4gIHZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlO1xuICB2aWV3RGF0ZTogRGF0ZTtcbiAgc2VsZWN0aW9uOiBBamZDYWxlbmRhclBlcmlvZHxudWxsO1xuICBpc29Nb2RlOiBib29sZWFuO1xuICBtaW5EYXRlOiBEYXRlfG51bGw7XG4gIG1heERhdGU6IERhdGV8bnVsbDtcbn1cblxuZnVuY3Rpb24gaXNCZXR3ZWVuKGRhdGU6IERhdGUsIHJhbmdlTGVmdDogRGF0ZSwgcmFuZ2VSaWdodDogRGF0ZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGlzQWZ0ZXIoZGF0ZSwgcmFuZ2VMZWZ0KSB8fCBpc1NhbWVEYXkoZGF0ZSwgcmFuZ2VMZWZ0KSlcbiAgICAgICYmIChpc0JlZm9yZShkYXRlLCByYW5nZVJpZ2h0KSB8fCBpc1NhbWVEYXkoZGF0ZSwgcmFuZ2VSaWdodCkpO1xufVxuXG5mdW5jdGlvbiBwZXJpb2RPcmRlcihlbnRyeVR5cGU6IEFqZkNhbGVuZGFyUGVyaW9kVHlwZSk6IG51bWJlciB7XG4gIHJldHVybiBbJ2RheScsICd3ZWVrJywgJ21vbnRoJywgJ3llYXInXS5pbmRleE9mKGVudHJ5VHlwZSk7XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFqZkNhbGVuZGFyU2VydmljZSB7XG4gIGJ1aWxkVmlldyhwYXJhbXM6IEFqZkNhbGVuZGFyUGFyYW1zKTogQWpmQ2FsZW5kYXJWaWV3IHtcbiAgICBjb25zdCB7dmlld01vZGUsIHZpZXdEYXRlfSA9IHBhcmFtcztcbiAgICBzd2l0Y2ggKHZpZXdNb2RlKSB7XG4gICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICBsZXQgY3VyWWVhcjogbnVtYmVyID0gdmlld0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgbGV0IGZpcnN0WWVhciA9IGN1clllYXIgLSAoY3VyWWVhciAlIDEwKSArIDE7XG4gICAgICAgIGxldCBsYXN0WWVhciA9IGZpcnN0WWVhciArIDExO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhlYWRlcjogYCR7Zmlyc3RZZWFyfSAtICR7bGFzdFllYXJ9YCxcbiAgICAgICAgICBoZWFkZXJSb3c6IFtdLFxuICAgICAgICAgIHJvd3M6IHRoaXMuX2RlY2FkZUNhbGVuZGFyUm93cyhwYXJhbXMpLFxuICAgICAgICB9O1xuICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaGVhZGVyOiBgJHt2aWV3RGF0ZS5nZXRGdWxsWWVhcigpfWAsXG4gICAgICAgICAgaGVhZGVyUm93OiBbXSxcbiAgICAgICAgICByb3dzOiB0aGlzLl95ZWFyQ2FsZW5kYXJSb3dzKHBhcmFtcyksXG4gICAgICAgIH07XG4gICAgICBjYXNlICdtb250aCc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaGVhZGVyOiBmb3JtYXQodmlld0RhdGUsICdNTU0geXl5eScpLFxuICAgICAgICAgIGhlYWRlclJvdzogdGhpcy5fbW9udGhIZWFkZXJSb3cocGFyYW1zKSxcbiAgICAgICAgICByb3dzOiB0aGlzLl9tb250aENhbGVuZGFyUm93cyhwYXJhbXMpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGVhZGVyOiAnJyxcbiAgICAgIGhlYWRlclJvdzogW10sXG4gICAgICByb3dzOiBbXSxcbiAgICB9O1xuICB9XG5cbiAgbW9udGhCb3VuZHMoZGF0ZTogRGF0ZSwgaXNvTW9kZTogYm9vbGVhbik6IHtzdGFydDogRGF0ZSwgZW5kOiBEYXRlfSB7XG4gICAgaWYgKCFpc29Nb2RlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogc3RhcnRPZk1vbnRoKGRhdGUpLFxuICAgICAgICBlbmQ6IGVuZE9mTW9udGgoZGF0ZSksXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBpc29EYXkgPSBnZXRJU09EYXkoZGF0ZSk7XG4gICAgZGF0ZSA9IGlzb0RheSA8IDQgPyBlbmRPZklTT1dlZWsoZGF0ZSkgOiBzdGFydE9mSVNPV2VlayhkYXRlKTtcbiAgICBsZXQgc3RhcnREYXRlID0gc3RhcnRPZk1vbnRoKGRhdGUpO1xuICAgIGxldCBlbmREYXRlID0gZW5kT2ZNb250aChzdGFydERhdGUpO1xuICAgIGNvbnN0IHN0YXJ0V2Vla0RheSA9IHN0YXJ0RGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBlbmRXZWVrRGF5ID0gZW5kRGF0ZS5nZXREYXkoKTtcbiAgICBpZiAoc3RhcnRXZWVrRGF5ID09IDAgfHwgc3RhcnRXZWVrRGF5ID4gNCkge1xuICAgICAgc3RhcnREYXRlID0gYWRkV2Vla3Moc3RhcnREYXRlLCAxKTtcbiAgICB9XG4gICAgaWYgKGVuZFdlZWtEYXkgPiAwICYmIGVuZFdlZWtEYXkgPCA0KSB7XG4gICAgICBlbmREYXRlID0gc3ViV2Vla3MoZW5kRGF0ZSwgMSk7XG4gICAgfVxuICAgIHN0YXJ0RGF0ZSA9IHN0YXJ0T2ZJU09XZWVrKHN0YXJ0RGF0ZSk7XG4gICAgZW5kRGF0ZSA9IGVuZE9mSVNPV2VlayhlbmREYXRlKTtcbiAgICByZXR1cm4geyBzdGFydDogc3RhcnREYXRlLCBlbmQ6IGVuZERhdGUgfTtcbiAgfVxuXG4gIGdldEVudHJ5UmFuZ2UoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiB7c3RhcnQ6IERhdGUsIGVuZDogRGF0ZX0ge1xuICAgIGlmIChlbnRyeS50eXBlID09PSAnZGF5Jykge1xuICAgICAgcmV0dXJuIHsgc3RhcnQ6IG5ldyBEYXRlKGVudHJ5LmRhdGUpLCBlbmQ6IG5ldyBEYXRlKGVudHJ5LmRhdGUpIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjdXJEYXRlOiBEYXRlID0gbmV3IERhdGUoZW50cnkuZGF0ZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogZW50cnkudHlwZSA9PT0gJ21vbnRoJyA/IHN0YXJ0T2ZNb250aChjdXJEYXRlKSA6IHN0YXJ0T2ZZZWFyKGN1ckRhdGUpLFxuICAgICAgICBlbmQ6IGVudHJ5LnR5cGUgPT09ICdtb250aCcgPyBlbmRPZk1vbnRoKGN1ckRhdGUpIDogZW5kT2ZZZWFyKGN1ckRhdGUpXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGlzRW50cnlTZWxlY3RlZChcbiAgICBlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSwgc2VsZWN0aW9uOiBBamZDYWxlbmRhclBlcmlvZHxudWxsXG4gICk6IEFqZkNhbGVuZGFyRW50cnlTZWxlY3RlZFN0YXRlIHtcbiAgICBpZiAoc2VsZWN0aW9uICE9IG51bGwgJiYgc2VsZWN0aW9uLnN0YXJ0RGF0ZSAhPSBudWxsICYmIHNlbGVjdGlvbi5lbmREYXRlICE9IG51bGwpIHtcbiAgICAgIGxldCBzZWxlY3Rpb25TdGFydDogRGF0ZSA9IHN0YXJ0T2ZEYXkoc2VsZWN0aW9uLnN0YXJ0RGF0ZSk7XG4gICAgICBsZXQgc2VsZWN0aW9uRW5kOiBEYXRlID0gZW5kT2ZEYXkoc2VsZWN0aW9uLmVuZERhdGUpO1xuICAgICAgbGV0IHNlbGVjdGlvblBlcmlvZE9yZGVyOiBudW1iZXIgPSBwZXJpb2RPcmRlcihzZWxlY3Rpb24udHlwZSk7XG5cbiAgICAgIGxldCBlbnRyeVBlcmlvZE9yZGVyOiBudW1iZXIgPSBwZXJpb2RPcmRlcihlbnRyeS50eXBlKTtcbiAgICAgIGxldCBlbnRyeVJhbmdlOiB7IHN0YXJ0OiBEYXRlLCBlbmQ6IERhdGUgfSA9IHRoaXMuZ2V0RW50cnlSYW5nZShlbnRyeSk7XG5cbiAgICAgIGlmIChlbnRyeVBlcmlvZE9yZGVyIDw9IHNlbGVjdGlvblBlcmlvZE9yZGVyICYmXG4gICAgICAgIGlzQmV0d2VlbihlbnRyeVJhbmdlLnN0YXJ0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKSAmJlxuICAgICAgICBpc0JldHdlZW4oZW50cnlSYW5nZS5lbmQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuICdmdWxsJztcbiAgICAgIH0gZWxzZSBpZiAoZW50cnlQZXJpb2RPcmRlciA+IHNlbGVjdGlvblBlcmlvZE9yZGVyICYmXG4gICAgICAgIGlzQmV0d2VlbihzZWxlY3Rpb25TdGFydCwgZW50cnlSYW5nZS5zdGFydCwgZW50cnlSYW5nZS5lbmQpICYmXG4gICAgICAgIGlzQmV0d2VlbihzZWxlY3Rpb25FbmQsIGVudHJ5UmFuZ2Uuc3RhcnQsIGVudHJ5UmFuZ2UuZW5kKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiAncGFydGlhbCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICdub25lJztcbiAgfVxuXG4gIGVudHJ5TGFiZWwoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiBzdHJpbmcge1xuICAgIGlmIChlbnRyeS50eXBlID09PSAnZGF5Jykge1xuICAgICAgcmV0dXJuIGAke2VudHJ5LmRhdGUuZ2V0RGF0ZSgpfWA7XG4gICAgfVxuICAgIGlmIChlbnRyeS50eXBlID09PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm4gZm9ybWF0KGVudHJ5LmRhdGUsICdNTU0nKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke2VudHJ5LmRhdGUuZ2V0RnVsbFllYXIoKX1gO1xuICB9XG5cbiAgbmV4dFZpZXcodmlld0RhdGU6IERhdGUsIHZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlKTogRGF0ZSB7XG4gICAgaWYgKHZpZXdNb2RlID09ICdtb250aCcpIHtcbiAgICAgIHJldHVybiBhZGRNb250aHModmlld0RhdGUsIDEpO1xuICAgIH0gZWxzZSBpZiAodmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICByZXR1cm4gYWRkWWVhcnModmlld0RhdGUsIDEpO1xuICAgIH0gZWxzZSBpZiAodmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHJldHVybiBhZGRZZWFycyh2aWV3RGF0ZSwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdmlld0RhdGU7XG4gIH1cblxuICBwcmV2aW91c1ZpZXcodmlld0RhdGU6IERhdGUsIHZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlKTogRGF0ZSB7XG4gICAgaWYgKHZpZXdNb2RlID09ICdtb250aCcpIHtcbiAgICAgIHJldHVybiBzdWJNb250aHModmlld0RhdGUsIDEpO1xuICAgIH0gZWxzZSBpZiAodmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICByZXR1cm4gc3ViWWVhcnModmlld0RhdGUsIDEpO1xuICAgIH0gZWxzZSBpZiAodmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHJldHVybiBzdWJZZWFycyh2aWV3RGF0ZSwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdmlld0RhdGU7XG4gIH1cblxuICBwcml2YXRlIF9tb250aEhlYWRlclJvdyhwYXJhbXM6IEFqZkNhbGVuZGFyUGFyYW1zKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHtpc29Nb2RlLCB2aWV3RGF0ZX0gPSBwYXJhbXM7XG4gICAgbGV0IGN1ckRhdGU6IERhdGU7XG4gICAgaWYgKGlzb01vZGUpIHtcbiAgICAgIGN1ckRhdGUgPSBzZXRJU09EYXkoc3RhcnRPZldlZWsodmlld0RhdGUpLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VyRGF0ZSA9IHN0YXJ0T2ZXZWVrKHZpZXdEYXRlKTtcbiAgICB9XG4gICAgbGV0IHdlZWtEYXlOYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgd2Vla0RheU5hbWVzLnB1c2goZm9ybWF0KGN1ckRhdGUsICdFRUUnKSk7XG4gICAgICBjdXJEYXRlID0gYWRkRGF5cyhjdXJEYXRlLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHdlZWtEYXlOYW1lcztcbiAgfVxuXG4gIHByaXZhdGUgX2RlY2FkZUNhbGVuZGFyUm93cyhwYXJhbXM6IEFqZkNhbGVuZGFyUGFyYW1zKTogQWpmQ2FsZW5kYXJFbnRyeVtdW10ge1xuICAgIGNvbnN0IHt2aWV3RGF0ZSwgc2VsZWN0aW9ufSA9IHBhcmFtcztcbiAgICBsZXQgY3VyWWVhcjogbnVtYmVyID0gdmlld0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBsZXQgZmlyc3RZZWFyID0gY3VyWWVhciAtIChjdXJZZWFyICUgMTApICsgMTtcbiAgICBsZXQgY3VyRGF0ZTogRGF0ZSA9IHN0YXJ0T2ZZZWFyKHZpZXdEYXRlKTtcbiAgICBjdXJEYXRlLnNldEZ1bGxZZWFyKGZpcnN0WWVhcik7XG5cbiAgICBsZXQgcm93czogQWpmQ2FsZW5kYXJFbnRyeVtdW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgbGV0IHJvdzogQWpmQ2FsZW5kYXJFbnRyeVtdID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGN1ckRhdGUpO1xuICAgICAgICBsZXQgbmV3RW50cnk6IEFqZkNhbGVuZGFyRW50cnkgPSB7XG4gICAgICAgICAgdHlwZTogJ3llYXInLFxuICAgICAgICAgIGRhdGU6IGRhdGUsXG4gICAgICAgICAgc2VsZWN0ZWQ6ICdub25lJ1xuICAgICAgICB9O1xuICAgICAgICBuZXdFbnRyeS5zZWxlY3RlZCA9IHRoaXMuaXNFbnRyeVNlbGVjdGVkKG5ld0VudHJ5LCBzZWxlY3Rpb24pO1xuICAgICAgICByb3cucHVzaChuZXdFbnRyeSk7XG4gICAgICAgIGN1ckRhdGUgPSBhZGRZZWFycyhjdXJEYXRlLCAxKTtcbiAgICAgIH1cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgcHJpdmF0ZSBfeWVhckNhbGVuZGFyUm93cyhwYXJhbXM6IEFqZkNhbGVuZGFyUGFyYW1zKTogQWpmQ2FsZW5kYXJFbnRyeVtdW10ge1xuICAgIGNvbnN0IHt2aWV3RGF0ZSwgc2VsZWN0aW9ufSA9IHBhcmFtcztcbiAgICBsZXQgY3VyRGF0ZTogRGF0ZSA9IHN0YXJ0T2ZZZWFyKHZpZXdEYXRlKTtcblxuICAgIGxldCByb3dzOiBBamZDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBsZXQgcm93OiBBamZDYWxlbmRhckVudHJ5W10gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY3VyRGF0ZSk7XG4gICAgICAgIGxldCBuZXdFbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSA9IHtcbiAgICAgICAgICB0eXBlOiAnbW9udGgnLFxuICAgICAgICAgIGRhdGU6IGRhdGUsXG4gICAgICAgICAgc2VsZWN0ZWQ6ICdub25lJ1xuICAgICAgICB9O1xuICAgICAgICBuZXdFbnRyeS5zZWxlY3RlZCA9IHRoaXMuaXNFbnRyeVNlbGVjdGVkKG5ld0VudHJ5LCBzZWxlY3Rpb24pO1xuICAgICAgICByb3cucHVzaChuZXdFbnRyeSk7XG4gICAgICAgIGN1ckRhdGUgPSBhZGRNb250aHMoY3VyRGF0ZSwgMSk7XG4gICAgICB9XG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIHByaXZhdGUgX21vbnRoQ2FsZW5kYXJSb3dzKHBhcmFtczogQWpmQ2FsZW5kYXJQYXJhbXMpOiBBamZDYWxlbmRhckVudHJ5W11bXSB7XG4gICAgY29uc3Qge3ZpZXdEYXRlLCBzZWxlY3Rpb24sIGlzb01vZGUsIG1pbkRhdGUsIG1heERhdGV9ID0gcGFyYW1zO1xuICAgIGNvbnN0IG1vbnRoQm91bmRzID0gdGhpcy5tb250aEJvdW5kcyh2aWV3RGF0ZSwgaXNvTW9kZSk7XG4gICAgbGV0IHZpZXdTdGFydERhdGU6IERhdGUgPSBuZXcgRGF0ZShtb250aEJvdW5kcy5zdGFydCk7XG4gICAgbGV0IHZpZXdFbmREYXRlOiBEYXRlID0gbmV3IERhdGUobW9udGhCb3VuZHMuZW5kKTtcbiAgICBpZiAoIWlzb01vZGUpIHtcbiAgICAgIHZpZXdTdGFydERhdGUgPSBzdGFydE9mV2Vlayh2aWV3U3RhcnREYXRlKTtcbiAgICAgIHZpZXdFbmREYXRlID0gZW5kT2ZXZWVrKHZpZXdFbmREYXRlKTtcbiAgICB9XG5cbiAgICBsZXQgcm93czogQWpmQ2FsZW5kYXJFbnRyeVtdW10gPSBbXTtcbiAgICBsZXQgdG9kYXlEYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgY3VyRGF0ZSA9IG5ldyBEYXRlKHZpZXdTdGFydERhdGUpO1xuICAgIHdoaWxlIChjdXJEYXRlIDwgdmlld0VuZERhdGUpIHtcbiAgICAgIGxldCByb3c6IEFqZkNhbGVuZGFyRW50cnlbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgbGV0IGRpc2FibGVkID0gKG1pbkRhdGUgIT0gbnVsbCAmJiBpc0JlZm9yZShjdXJEYXRlLCBtaW5EYXRlKSkgfHxcbiAgICAgICAgICAobWF4RGF0ZSAhPSBudWxsICYmIGlzQWZ0ZXIoY3VyRGF0ZSwgbWF4RGF0ZSkpO1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGN1ckRhdGUpO1xuICAgICAgICBsZXQgbmV3RW50cnk6IEFqZkNhbGVuZGFyRW50cnkgPSB7XG4gICAgICAgICAgdHlwZTogJ2RheScsXG4gICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICBzZWxlY3RlZDogJ25vbmUnLFxuICAgICAgICAgIGhpZ2hsaWdodDogZm9ybWF0KHRvZGF5RGF0ZSwgJ3l5eXktTU0tZGQnKSA9PT0gZm9ybWF0KGN1ckRhdGUsICd5eXl5LU1NLWRkJyksXG4gICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkXG4gICAgICAgIH07XG4gICAgICAgIG5ld0VudHJ5LnNlbGVjdGVkID0gdGhpcy5pc0VudHJ5U2VsZWN0ZWQobmV3RW50cnksIHNlbGVjdGlvbik7XG4gICAgICAgIHJvdy5wdXNoKG5ld0VudHJ5KTtcbiAgICAgICAgY3VyRGF0ZSA9IGFkZERheXMoY3VyRGF0ZSwgMSk7XG4gICAgICB9XG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cbn1cbiJdfQ==