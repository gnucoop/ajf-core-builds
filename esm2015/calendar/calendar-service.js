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
import { addDays, addMonths, addWeeks, addYears, endOfDay, endOfISOWeek, endOfMonth, endOfWeek, endOfYear, format, getISODay, isAfter, isBefore, isSameDay, setISODay, startOfDay, startOfISOWeek, startOfMonth, startOfWeek, startOfYear, subMonths, subWeeks, subYears } from 'date-fns';
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
/** @nocollapse */ AjfCalendarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AjfCalendarService_Factory() { return new AjfCalendarService(); }, token: AjfCalendarService, providedIn: "root" });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NhbGVuZGFyL2NhbGVuZGFyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFNBQVMsRUFDVCxPQUFPLEVBQ1AsUUFBUSxFQUNSLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGNBQWMsRUFDZCxZQUFZLEVBQ1osV0FBVyxFQUNYLFdBQVcsRUFDWCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsRUFDVCxNQUFNLFVBQVUsQ0FBQzs7Ozs7QUFTbEIsdUNBT0M7OztJQU5DLHFDQUE4Qjs7SUFDOUIscUNBQWU7O0lBQ2Ysc0NBQWtDOztJQUNsQyxvQ0FBaUI7O0lBQ2pCLG9DQUFtQjs7SUFDbkIsb0NBQW1COzs7Ozs7OztBQUdyQixTQUFTLFNBQVMsQ0FBQyxJQUFVLEVBQUUsU0FBZSxFQUFFLFVBQWdCO0lBQzlELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNsRSxDQUFDOzs7OztBQUVELFNBQVMsV0FBVyxDQUFDLFNBQWdDO0lBQ25ELE9BQU8sQ0FBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBRSxNQUFNLENBQUMs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LENBQUMsYUFBYSxDQUFDO1FBQ3JDLE9BQU8sT0FBTyxHQUFHLFdBQVcsRUFBRTs7Z0JBQ3hCLEdBQUcsR0FBdUIsRUFBRTtZQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztvQkFDdEIsUUFBUSxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUMxRCxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7b0JBQzlDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7O29CQUN4QixRQUFRLEdBQXFCO29CQUMvQixJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUUsSUFBSTtvQkFDVixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEtBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7b0JBQzVFLFFBQVEsRUFBRSxRQUFRO2lCQUNuQjtnQkFDRCxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUM5RCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMvQjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OztZQTNORixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgYWRkRGF5cyxcbiAgYWRkTW9udGhzLFxuICBhZGRXZWVrcyxcbiAgYWRkWWVhcnMsXG4gIGVuZE9mRGF5LFxuICBlbmRPZklTT1dlZWssXG4gIGVuZE9mTW9udGgsXG4gIGVuZE9mV2VlayxcbiAgZW5kT2ZZZWFyLFxuICBmb3JtYXQsXG4gIGdldElTT0RheSxcbiAgaXNBZnRlcixcbiAgaXNCZWZvcmUsXG4gIGlzU2FtZURheSxcbiAgc2V0SVNPRGF5LFxuICBzdGFydE9mRGF5LFxuICBzdGFydE9mSVNPV2VlayxcbiAgc3RhcnRPZk1vbnRoLFxuICBzdGFydE9mV2VlayxcbiAgc3RhcnRPZlllYXIsXG4gIHN1Yk1vbnRocyxcbiAgc3ViV2Vla3MsXG4gIHN1YlllYXJzXG59IGZyb20gJ2RhdGUtZm5zJztcblxuaW1wb3J0IHtBamZDYWxlbmRhckVudHJ5fSBmcm9tICcuL2NhbGVuZGFyLWVudHJ5JztcbmltcG9ydCB7QWpmQ2FsZW5kYXJFbnRyeVNlbGVjdGVkU3RhdGV9IGZyb20gJy4vY2FsZW5kYXItZW50cnktc2VsZWN0ZWQtc3RhdGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhclBlcmlvZH0gZnJvbSAnLi9jYWxlbmRhci1wZXJpb2QnO1xuaW1wb3J0IHtBamZDYWxlbmRhclBlcmlvZFR5cGV9IGZyb20gJy4vY2FsZW5kYXItcGVyaW9kLXR5cGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhclZpZXd9IGZyb20gJy4vY2FsZW5kYXItdmlldyc7XG5pbXBvcnQge0FqZkNhbGVuZGFyVmlld01vZGV9IGZyb20gJy4vY2FsZW5kYXItdmlldy1tb2RlJztcblxuZXhwb3J0IGludGVyZmFjZSBBamZDYWxlbmRhclBhcmFtcyB7XG4gIHZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlO1xuICB2aWV3RGF0ZTogRGF0ZTtcbiAgc2VsZWN0aW9uOiBBamZDYWxlbmRhclBlcmlvZHxudWxsO1xuICBpc29Nb2RlOiBib29sZWFuO1xuICBtaW5EYXRlOiBEYXRlfG51bGw7XG4gIG1heERhdGU6IERhdGV8bnVsbDtcbn1cblxuZnVuY3Rpb24gaXNCZXR3ZWVuKGRhdGU6IERhdGUsIHJhbmdlTGVmdDogRGF0ZSwgcmFuZ2VSaWdodDogRGF0ZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gKGlzQWZ0ZXIoZGF0ZSwgcmFuZ2VMZWZ0KSB8fCBpc1NhbWVEYXkoZGF0ZSwgcmFuZ2VMZWZ0KSkgJiZcbiAgICAgIChpc0JlZm9yZShkYXRlLCByYW5nZVJpZ2h0KSB8fCBpc1NhbWVEYXkoZGF0ZSwgcmFuZ2VSaWdodCkpO1xufVxuXG5mdW5jdGlvbiBwZXJpb2RPcmRlcihlbnRyeVR5cGU6IEFqZkNhbGVuZGFyUGVyaW9kVHlwZSk6IG51bWJlciB7XG4gIHJldHVybiBbJ2RheScsICd3ZWVrJywgJ21vbnRoJywgJ3llYXInXS5pbmRleE9mKGVudHJ5VHlwZSk7XG59XG5cbkBJbmplY3RhYmxlKHtwcm92aWRlZEluOiAncm9vdCd9KVxuZXhwb3J0IGNsYXNzIEFqZkNhbGVuZGFyU2VydmljZSB7XG4gIGJ1aWxkVmlldyhwYXJhbXM6IEFqZkNhbGVuZGFyUGFyYW1zKTogQWpmQ2FsZW5kYXJWaWV3IHtcbiAgICBjb25zdCB7dmlld01vZGUsIHZpZXdEYXRlfSA9IHBhcmFtcztcbiAgICBzd2l0Y2ggKHZpZXdNb2RlKSB7XG4gICAgICBjYXNlICdkZWNhZGUnOlxuICAgICAgICBsZXQgY3VyWWVhcjogbnVtYmVyID0gdmlld0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICAgICAgbGV0IGZpcnN0WWVhciA9IGN1clllYXIgLSAoY3VyWWVhciAlIDEwKSArIDE7XG4gICAgICAgIGxldCBsYXN0WWVhciA9IGZpcnN0WWVhciArIDExO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhlYWRlcjogYCR7Zmlyc3RZZWFyfSAtICR7bGFzdFllYXJ9YCxcbiAgICAgICAgICBoZWFkZXJSb3c6IFtdLFxuICAgICAgICAgIHJvd3M6IHRoaXMuX2RlY2FkZUNhbGVuZGFyUm93cyhwYXJhbXMpLFxuICAgICAgICB9O1xuICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaGVhZGVyOiBgJHt2aWV3RGF0ZS5nZXRGdWxsWWVhcigpfWAsXG4gICAgICAgICAgaGVhZGVyUm93OiBbXSxcbiAgICAgICAgICByb3dzOiB0aGlzLl95ZWFyQ2FsZW5kYXJSb3dzKHBhcmFtcyksXG4gICAgICAgIH07XG4gICAgICBjYXNlICdtb250aCc6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaGVhZGVyOiBmb3JtYXQodmlld0RhdGUsICdNTU0geXl5eScpLFxuICAgICAgICAgIGhlYWRlclJvdzogdGhpcy5fbW9udGhIZWFkZXJSb3cocGFyYW1zKSxcbiAgICAgICAgICByb3dzOiB0aGlzLl9tb250aENhbGVuZGFyUm93cyhwYXJhbXMpLFxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgaGVhZGVyOiAnJyxcbiAgICAgIGhlYWRlclJvdzogW10sXG4gICAgICByb3dzOiBbXSxcbiAgICB9O1xuICB9XG5cbiAgbW9udGhCb3VuZHMoZGF0ZTogRGF0ZSwgaXNvTW9kZTogYm9vbGVhbik6IHtzdGFydDogRGF0ZSwgZW5kOiBEYXRlfSB7XG4gICAgaWYgKCFpc29Nb2RlKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogc3RhcnRPZk1vbnRoKGRhdGUpLFxuICAgICAgICBlbmQ6IGVuZE9mTW9udGgoZGF0ZSksXG4gICAgICB9O1xuICAgIH1cbiAgICBjb25zdCBpc29EYXkgPSBnZXRJU09EYXkoZGF0ZSk7XG4gICAgZGF0ZSA9IGlzb0RheSA8IDQgPyBlbmRPZklTT1dlZWsoZGF0ZSkgOiBzdGFydE9mSVNPV2VlayhkYXRlKTtcbiAgICBsZXQgc3RhcnREYXRlID0gc3RhcnRPZk1vbnRoKGRhdGUpO1xuICAgIGxldCBlbmREYXRlID0gZW5kT2ZNb250aChzdGFydERhdGUpO1xuICAgIGNvbnN0IHN0YXJ0V2Vla0RheSA9IHN0YXJ0RGF0ZS5nZXREYXkoKTtcbiAgICBjb25zdCBlbmRXZWVrRGF5ID0gZW5kRGF0ZS5nZXREYXkoKTtcbiAgICBpZiAoc3RhcnRXZWVrRGF5ID09IDAgfHwgc3RhcnRXZWVrRGF5ID4gNCkge1xuICAgICAgc3RhcnREYXRlID0gYWRkV2Vla3Moc3RhcnREYXRlLCAxKTtcbiAgICB9XG4gICAgaWYgKGVuZFdlZWtEYXkgPiAwICYmIGVuZFdlZWtEYXkgPCA0KSB7XG4gICAgICBlbmREYXRlID0gc3ViV2Vla3MoZW5kRGF0ZSwgMSk7XG4gICAgfVxuICAgIHN0YXJ0RGF0ZSA9IHN0YXJ0T2ZJU09XZWVrKHN0YXJ0RGF0ZSk7XG4gICAgZW5kRGF0ZSA9IGVuZE9mSVNPV2VlayhlbmREYXRlKTtcbiAgICByZXR1cm4ge3N0YXJ0OiBzdGFydERhdGUsIGVuZDogZW5kRGF0ZX07XG4gIH1cblxuICBnZXRFbnRyeVJhbmdlKGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KToge3N0YXJ0OiBEYXRlLCBlbmQ6IERhdGV9IHtcbiAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2RheScpIHtcbiAgICAgIHJldHVybiB7c3RhcnQ6IG5ldyBEYXRlKGVudHJ5LmRhdGUpLCBlbmQ6IG5ldyBEYXRlKGVudHJ5LmRhdGUpfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGN1ckRhdGU6IERhdGUgPSBuZXcgRGF0ZShlbnRyeS5kYXRlKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBlbnRyeS50eXBlID09PSAnbW9udGgnID8gc3RhcnRPZk1vbnRoKGN1ckRhdGUpIDogc3RhcnRPZlllYXIoY3VyRGF0ZSksXG4gICAgICAgIGVuZDogZW50cnkudHlwZSA9PT0gJ21vbnRoJyA/IGVuZE9mTW9udGgoY3VyRGF0ZSkgOiBlbmRPZlllYXIoY3VyRGF0ZSlcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgaXNFbnRyeVNlbGVjdGVkKGVudHJ5OiBBamZDYWxlbmRhckVudHJ5LCBzZWxlY3Rpb246IEFqZkNhbGVuZGFyUGVyaW9kfG51bGwpOlxuICAgICAgQWpmQ2FsZW5kYXJFbnRyeVNlbGVjdGVkU3RhdGUge1xuICAgIGlmIChzZWxlY3Rpb24gIT0gbnVsbCAmJiBzZWxlY3Rpb24uc3RhcnREYXRlICE9IG51bGwgJiYgc2VsZWN0aW9uLmVuZERhdGUgIT0gbnVsbCkge1xuICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0OiBEYXRlID0gc3RhcnRPZkRheShzZWxlY3Rpb24uc3RhcnREYXRlKTtcbiAgICAgIGxldCBzZWxlY3Rpb25FbmQ6IERhdGUgPSBlbmRPZkRheShzZWxlY3Rpb24uZW5kRGF0ZSk7XG4gICAgICBsZXQgc2VsZWN0aW9uUGVyaW9kT3JkZXI6IG51bWJlciA9IHBlcmlvZE9yZGVyKHNlbGVjdGlvbi50eXBlKTtcblxuICAgICAgbGV0IGVudHJ5UGVyaW9kT3JkZXI6IG51bWJlciA9IHBlcmlvZE9yZGVyKGVudHJ5LnR5cGUpO1xuICAgICAgbGV0IGVudHJ5UmFuZ2U6IHtzdGFydDogRGF0ZSwgZW5kOiBEYXRlfSA9IHRoaXMuZ2V0RW50cnlSYW5nZShlbnRyeSk7XG5cbiAgICAgIGlmIChlbnRyeVBlcmlvZE9yZGVyIDw9IHNlbGVjdGlvblBlcmlvZE9yZGVyICYmXG4gICAgICAgICAgaXNCZXR3ZWVuKGVudHJ5UmFuZ2Uuc3RhcnQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpICYmXG4gICAgICAgICAgaXNCZXR3ZWVuKGVudHJ5UmFuZ2UuZW5kLCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKSkge1xuICAgICAgICByZXR1cm4gJ2Z1bGwnO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBlbnRyeVBlcmlvZE9yZGVyID4gc2VsZWN0aW9uUGVyaW9kT3JkZXIgJiZcbiAgICAgICAgICBpc0JldHdlZW4oc2VsZWN0aW9uU3RhcnQsIGVudHJ5UmFuZ2Uuc3RhcnQsIGVudHJ5UmFuZ2UuZW5kKSAmJlxuICAgICAgICAgIGlzQmV0d2VlbihzZWxlY3Rpb25FbmQsIGVudHJ5UmFuZ2Uuc3RhcnQsIGVudHJ5UmFuZ2UuZW5kKSkge1xuICAgICAgICByZXR1cm4gJ3BhcnRpYWwnO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAnbm9uZSc7XG4gIH1cblxuICBlbnRyeUxhYmVsKGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KTogc3RyaW5nIHtcbiAgICBpZiAoZW50cnkudHlwZSA9PT0gJ2RheScpIHtcbiAgICAgIHJldHVybiBgJHtlbnRyeS5kYXRlLmdldERhdGUoKX1gO1xuICAgIH1cbiAgICBpZiAoZW50cnkudHlwZSA9PT0gJ21vbnRoJykge1xuICAgICAgcmV0dXJuIGZvcm1hdChlbnRyeS5kYXRlLCAnTU1NJyk7XG4gICAgfVxuICAgIHJldHVybiBgJHtlbnRyeS5kYXRlLmdldEZ1bGxZZWFyKCl9YDtcbiAgfVxuXG4gIG5leHRWaWV3KHZpZXdEYXRlOiBEYXRlLCB2aWV3TW9kZTogQWpmQ2FsZW5kYXJWaWV3TW9kZSk6IERhdGUge1xuICAgIGlmICh2aWV3TW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm4gYWRkTW9udGhzKHZpZXdEYXRlLCAxKTtcbiAgICB9IGVsc2UgaWYgKHZpZXdNb2RlID09ICd5ZWFyJykge1xuICAgICAgcmV0dXJuIGFkZFllYXJzKHZpZXdEYXRlLCAxKTtcbiAgICB9IGVsc2UgaWYgKHZpZXdNb2RlID09ICdkZWNhZGUnKSB7XG4gICAgICByZXR1cm4gYWRkWWVhcnModmlld0RhdGUsIDEwKTtcbiAgICB9XG4gICAgcmV0dXJuIHZpZXdEYXRlO1xuICB9XG5cbiAgcHJldmlvdXNWaWV3KHZpZXdEYXRlOiBEYXRlLCB2aWV3TW9kZTogQWpmQ2FsZW5kYXJWaWV3TW9kZSk6IERhdGUge1xuICAgIGlmICh2aWV3TW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm4gc3ViTW9udGhzKHZpZXdEYXRlLCAxKTtcbiAgICB9IGVsc2UgaWYgKHZpZXdNb2RlID09ICd5ZWFyJykge1xuICAgICAgcmV0dXJuIHN1YlllYXJzKHZpZXdEYXRlLCAxKTtcbiAgICB9IGVsc2UgaWYgKHZpZXdNb2RlID09ICdkZWNhZGUnKSB7XG4gICAgICByZXR1cm4gc3ViWWVhcnModmlld0RhdGUsIDEwKTtcbiAgICB9XG4gICAgcmV0dXJuIHZpZXdEYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW9udGhIZWFkZXJSb3cocGFyYW1zOiBBamZDYWxlbmRhclBhcmFtcyk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCB7aXNvTW9kZSwgdmlld0RhdGV9ID0gcGFyYW1zO1xuICAgIGxldCBjdXJEYXRlOiBEYXRlO1xuICAgIGlmIChpc29Nb2RlKSB7XG4gICAgICBjdXJEYXRlID0gc2V0SVNPRGF5KHN0YXJ0T2ZXZWVrKHZpZXdEYXRlKSwgMSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN1ckRhdGUgPSBzdGFydE9mV2Vlayh2aWV3RGF0ZSk7XG4gICAgfVxuICAgIGxldCB3ZWVrRGF5TmFtZXM6IHN0cmluZ1tdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgIHdlZWtEYXlOYW1lcy5wdXNoKGZvcm1hdChjdXJEYXRlLCAnRUVFJykpO1xuICAgICAgY3VyRGF0ZSA9IGFkZERheXMoY3VyRGF0ZSwgMSk7XG4gICAgfVxuICAgIHJldHVybiB3ZWVrRGF5TmFtZXM7XG4gIH1cblxuICBwcml2YXRlIF9kZWNhZGVDYWxlbmRhclJvd3MocGFyYW1zOiBBamZDYWxlbmRhclBhcmFtcyk6IEFqZkNhbGVuZGFyRW50cnlbXVtdIHtcbiAgICBjb25zdCB7dmlld0RhdGUsIHNlbGVjdGlvbn0gPSBwYXJhbXM7XG4gICAgbGV0IGN1clllYXI6IG51bWJlciA9IHZpZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgbGV0IGZpcnN0WWVhciA9IGN1clllYXIgLSAoY3VyWWVhciAlIDEwKSArIDE7XG4gICAgbGV0IGN1ckRhdGU6IERhdGUgPSBzdGFydE9mWWVhcih2aWV3RGF0ZSk7XG4gICAgY3VyRGF0ZS5zZXRGdWxsWWVhcihmaXJzdFllYXIpO1xuXG4gICAgbGV0IHJvd3M6IEFqZkNhbGVuZGFyRW50cnlbXVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGxldCByb3c6IEFqZkNhbGVuZGFyRW50cnlbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShjdXJEYXRlKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5OiBBamZDYWxlbmRhckVudHJ5ID0ge3R5cGU6ICd5ZWFyJywgZGF0ZTogZGF0ZSwgc2VsZWN0ZWQ6ICdub25lJ307XG4gICAgICAgIG5ld0VudHJ5LnNlbGVjdGVkID0gdGhpcy5pc0VudHJ5U2VsZWN0ZWQobmV3RW50cnksIHNlbGVjdGlvbik7XG4gICAgICAgIHJvdy5wdXNoKG5ld0VudHJ5KTtcbiAgICAgICAgY3VyRGF0ZSA9IGFkZFllYXJzKGN1ckRhdGUsIDEpO1xuICAgICAgfVxuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBwcml2YXRlIF95ZWFyQ2FsZW5kYXJSb3dzKHBhcmFtczogQWpmQ2FsZW5kYXJQYXJhbXMpOiBBamZDYWxlbmRhckVudHJ5W11bXSB7XG4gICAgY29uc3Qge3ZpZXdEYXRlLCBzZWxlY3Rpb259ID0gcGFyYW1zO1xuICAgIGxldCBjdXJEYXRlOiBEYXRlID0gc3RhcnRPZlllYXIodmlld0RhdGUpO1xuXG4gICAgbGV0IHJvd3M6IEFqZkNhbGVuZGFyRW50cnlbXVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGxldCByb3c6IEFqZkNhbGVuZGFyRW50cnlbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShjdXJEYXRlKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5OiBBamZDYWxlbmRhckVudHJ5ID0ge3R5cGU6ICdtb250aCcsIGRhdGU6IGRhdGUsIHNlbGVjdGVkOiAnbm9uZSd9O1xuICAgICAgICBuZXdFbnRyeS5zZWxlY3RlZCA9IHRoaXMuaXNFbnRyeVNlbGVjdGVkKG5ld0VudHJ5LCBzZWxlY3Rpb24pO1xuICAgICAgICByb3cucHVzaChuZXdFbnRyeSk7XG4gICAgICAgIGN1ckRhdGUgPSBhZGRNb250aHMoY3VyRGF0ZSwgMSk7XG4gICAgICB9XG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIHByaXZhdGUgX21vbnRoQ2FsZW5kYXJSb3dzKHBhcmFtczogQWpmQ2FsZW5kYXJQYXJhbXMpOiBBamZDYWxlbmRhckVudHJ5W11bXSB7XG4gICAgY29uc3Qge3ZpZXdEYXRlLCBzZWxlY3Rpb24sIGlzb01vZGUsIG1pbkRhdGUsIG1heERhdGV9ID0gcGFyYW1zO1xuICAgIGNvbnN0IG1vbnRoQm91bmRzID0gdGhpcy5tb250aEJvdW5kcyh2aWV3RGF0ZSwgaXNvTW9kZSk7XG4gICAgbGV0IHZpZXdTdGFydERhdGU6IERhdGUgPSBuZXcgRGF0ZShtb250aEJvdW5kcy5zdGFydCk7XG4gICAgbGV0IHZpZXdFbmREYXRlOiBEYXRlID0gbmV3IERhdGUobW9udGhCb3VuZHMuZW5kKTtcbiAgICBpZiAoIWlzb01vZGUpIHtcbiAgICAgIHZpZXdTdGFydERhdGUgPSBzdGFydE9mV2Vlayh2aWV3U3RhcnREYXRlKTtcbiAgICAgIHZpZXdFbmREYXRlID0gZW5kT2ZXZWVrKHZpZXdFbmREYXRlKTtcbiAgICB9XG5cbiAgICBsZXQgcm93czogQWpmQ2FsZW5kYXJFbnRyeVtdW10gPSBbXTtcbiAgICBsZXQgdG9kYXlEYXRlID0gbmV3IERhdGUoKTtcbiAgICBsZXQgY3VyRGF0ZSA9IG5ldyBEYXRlKHZpZXdTdGFydERhdGUpO1xuICAgIHdoaWxlIChjdXJEYXRlIDwgdmlld0VuZERhdGUpIHtcbiAgICAgIGxldCByb3c6IEFqZkNhbGVuZGFyRW50cnlbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA3OyBpKyspIHtcbiAgICAgICAgbGV0IGRpc2FibGVkID0gKG1pbkRhdGUgIT0gbnVsbCAmJiBpc0JlZm9yZShjdXJEYXRlLCBtaW5EYXRlKSkgfHxcbiAgICAgICAgICAgIChtYXhEYXRlICE9IG51bGwgJiYgaXNBZnRlcihjdXJEYXRlLCBtYXhEYXRlKSk7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY3VyRGF0ZSk7XG4gICAgICAgIGxldCBuZXdFbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSA9IHtcbiAgICAgICAgICB0eXBlOiAnZGF5JyxcbiAgICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICAgIHNlbGVjdGVkOiAnbm9uZScsXG4gICAgICAgICAgaGlnaGxpZ2h0OiBmb3JtYXQodG9kYXlEYXRlLCAneXl5eS1NTS1kZCcpID09PSBmb3JtYXQoY3VyRGF0ZSwgJ3l5eXktTU0tZGQnKSxcbiAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWRcbiAgICAgICAgfTtcbiAgICAgICAgbmV3RW50cnkuc2VsZWN0ZWQgPSB0aGlzLmlzRW50cnlTZWxlY3RlZChuZXdFbnRyeSwgc2VsZWN0aW9uKTtcbiAgICAgICAgcm93LnB1c2gobmV3RW50cnkpO1xuICAgICAgICBjdXJEYXRlID0gYWRkRGF5cyhjdXJEYXRlLCAxKTtcbiAgICAgIH1cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gcm93cztcbiAgfVxufVxuIl19