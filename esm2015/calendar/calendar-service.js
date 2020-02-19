/**
 * @fileoverview added by tsickle
 * Generated from: src/core/calendar/calendar-service.ts
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NhbGVuZGFyL2NhbGVuZGFyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQUMsT0FBTyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsWUFBWSxFQUFFLFNBQVMsRUFDM0YsU0FBUyxFQUFFLE1BQU0sRUFBRSxTQUFTLEVBQUUsT0FBTyxFQUFFLFFBQVEsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxjQUFjLEVBQ2pHLFlBQVksRUFBRSxXQUFXLEVBQUUsV0FBVyxFQUFFLFNBQVMsRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDLE1BQU0sVUFBVSxDQUFDOzs7OztBQVN6Rix1Q0FPQzs7O0lBTkMscUNBQThCOztJQUM5QixxQ0FBZTs7SUFDZixzQ0FBa0M7O0lBQ2xDLG9DQUFpQjs7SUFDakIsb0NBQW1COztJQUNuQixvQ0FBbUI7Ozs7Ozs7O0FBR3JCLFNBQVMsU0FBUyxDQUFDLElBQVUsRUFBRSxTQUFlLEVBQUUsVUFBZ0I7SUFDOUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztXQUN4RCxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ3JFLENBQUM7Ozs7O0FBRUQsU0FBUyxXQUFXLENBQUMsU0FBZ0M7SUFDbkQsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FB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QUcsSUFBSSxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQ3JDLE9BQU8sT0FBTyxHQUFHLFdBQVcsRUFBRTs7Z0JBQ3hCLEdBQUcsR0FBdUIsRUFBRTtZQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFOztvQkFDdEIsUUFBUSxHQUFHLENBQUMsT0FBTyxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO29CQUM1RCxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQzs7b0JBQzVDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUM7O29CQUN4QixRQUFRLEdBQXFCO29CQUMvQixJQUFJLEVBQUUsS0FBSztvQkFDWCxJQUFJLEVBQUUsSUFBSTtvQkFDVixRQUFRLEVBQUUsTUFBTTtvQkFDaEIsU0FBUyxFQUFFLE1BQU0sQ0FBQyxTQUFTLEVBQUUsWUFBWSxDQUFDLEtBQUssTUFBTSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7b0JBQzVFLFFBQVEsRUFBRSxRQUFRO2lCQUNuQjtnQkFDRCxRQUFRLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLFNBQVMsQ0FBQyxDQUFDO2dCQUM5RCxHQUFHLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNuQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQzthQUMvQjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNkLENBQUM7OztZQXJPRixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge2FkZERheXMsIGFkZE1vbnRocywgYWRkV2Vla3MsIGFkZFllYXJzLCBlbmRPZkRheSwgZW5kT2ZNb250aCwgZW5kT2ZJU09XZWVrLCBlbmRPZldlZWssXG4gIGVuZE9mWWVhciwgZm9ybWF0LCBnZXRJU09EYXksIGlzQWZ0ZXIsIGlzQmVmb3JlLCBpc1NhbWVEYXksIHNldElTT0RheSwgc3RhcnRPZkRheSwgc3RhcnRPZklTT1dlZWssXG4gIHN0YXJ0T2ZNb250aCwgc3RhcnRPZldlZWssIHN0YXJ0T2ZZZWFyLCBzdWJNb250aHMsIHN1YldlZWtzLCBzdWJZZWFyc30gZnJvbSAnZGF0ZS1mbnMnO1xuXG5pbXBvcnQge0FqZkNhbGVuZGFyRW50cnl9IGZyb20gJy4vY2FsZW5kYXItZW50cnknO1xuaW1wb3J0IHtBamZDYWxlbmRhckVudHJ5U2VsZWN0ZWRTdGF0ZX0gZnJvbSAnLi9jYWxlbmRhci1lbnRyeS1zZWxlY3RlZC1zdGF0ZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyUGVyaW9kfSBmcm9tICcuL2NhbGVuZGFyLXBlcmlvZCc7XG5pbXBvcnQge0FqZkNhbGVuZGFyUGVyaW9kVHlwZX0gZnJvbSAnLi9jYWxlbmRhci1wZXJpb2QtdHlwZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyVmlld30gZnJvbSAnLi9jYWxlbmRhci12aWV3JztcbmltcG9ydCB7QWpmQ2FsZW5kYXJWaWV3TW9kZX0gZnJvbSAnLi9jYWxlbmRhci12aWV3LW1vZGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkNhbGVuZGFyUGFyYW1zIHtcbiAgdmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGU7XG4gIHZpZXdEYXRlOiBEYXRlO1xuICBzZWxlY3Rpb246IEFqZkNhbGVuZGFyUGVyaW9kfG51bGw7XG4gIGlzb01vZGU6IGJvb2xlYW47XG4gIG1pbkRhdGU6IERhdGV8bnVsbDtcbiAgbWF4RGF0ZTogRGF0ZXxudWxsO1xufVxuXG5mdW5jdGlvbiBpc0JldHdlZW4oZGF0ZTogRGF0ZSwgcmFuZ2VMZWZ0OiBEYXRlLCByYW5nZVJpZ2h0OiBEYXRlKTogYm9vbGVhbiB7XG4gIHJldHVybiAoaXNBZnRlcihkYXRlLCByYW5nZUxlZnQpIHx8IGlzU2FtZURheShkYXRlLCByYW5nZUxlZnQpKVxuICAgICAgJiYgKGlzQmVmb3JlKGRhdGUsIHJhbmdlUmlnaHQpIHx8IGlzU2FtZURheShkYXRlLCByYW5nZVJpZ2h0KSk7XG59XG5cbmZ1bmN0aW9uIHBlcmlvZE9yZGVyKGVudHJ5VHlwZTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlKTogbnVtYmVyIHtcbiAgcmV0dXJuIFsnZGF5JywgJ3dlZWsnLCAnbW9udGgnLCAneWVhciddLmluZGV4T2YoZW50cnlUeXBlKTtcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQWpmQ2FsZW5kYXJTZXJ2aWNlIHtcbiAgYnVpbGRWaWV3KHBhcmFtczogQWpmQ2FsZW5kYXJQYXJhbXMpOiBBamZDYWxlbmRhclZpZXcge1xuICAgIGNvbnN0IHt2aWV3TW9kZSwgdmlld0RhdGV9ID0gcGFyYW1zO1xuICAgIHN3aXRjaCAodmlld01vZGUpIHtcbiAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgIGxldCBjdXJZZWFyOiBudW1iZXIgPSB2aWV3RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBsZXQgZmlyc3RZZWFyID0gY3VyWWVhciAtIChjdXJZZWFyICUgMTApICsgMTtcbiAgICAgICAgbGV0IGxhc3RZZWFyID0gZmlyc3RZZWFyICsgMTE7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaGVhZGVyOiBgJHtmaXJzdFllYXJ9IC0gJHtsYXN0WWVhcn1gLFxuICAgICAgICAgIGhlYWRlclJvdzogW10sXG4gICAgICAgICAgcm93czogdGhpcy5fZGVjYWRlQ2FsZW5kYXJSb3dzKHBhcmFtcyksXG4gICAgICAgIH07XG4gICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoZWFkZXI6IGAke3ZpZXdEYXRlLmdldEZ1bGxZZWFyKCl9YCxcbiAgICAgICAgICBoZWFkZXJSb3c6IFtdLFxuICAgICAgICAgIHJvd3M6IHRoaXMuX3llYXJDYWxlbmRhclJvd3MocGFyYW1zKSxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoZWFkZXI6IGZvcm1hdCh2aWV3RGF0ZSwgJ01NTSB5eXl5JyksXG4gICAgICAgICAgaGVhZGVyUm93OiB0aGlzLl9tb250aEhlYWRlclJvdyhwYXJhbXMpLFxuICAgICAgICAgIHJvd3M6IHRoaXMuX21vbnRoQ2FsZW5kYXJSb3dzKHBhcmFtcyksXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoZWFkZXI6ICcnLFxuICAgICAgaGVhZGVyUm93OiBbXSxcbiAgICAgIHJvd3M6IFtdLFxuICAgIH07XG4gIH1cblxuICBtb250aEJvdW5kcyhkYXRlOiBEYXRlLCBpc29Nb2RlOiBib29sZWFuKToge3N0YXJ0OiBEYXRlLCBlbmQ6IERhdGV9IHtcbiAgICBpZiAoIWlzb01vZGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBzdGFydE9mTW9udGgoZGF0ZSksXG4gICAgICAgIGVuZDogZW5kT2ZNb250aChkYXRlKSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGlzb0RheSA9IGdldElTT0RheShkYXRlKTtcbiAgICBkYXRlID0gaXNvRGF5IDwgNCA/IGVuZE9mSVNPV2VlayhkYXRlKSA6IHN0YXJ0T2ZJU09XZWVrKGRhdGUpO1xuICAgIGxldCBzdGFydERhdGUgPSBzdGFydE9mTW9udGgoZGF0ZSk7XG4gICAgbGV0IGVuZERhdGUgPSBlbmRPZk1vbnRoKHN0YXJ0RGF0ZSk7XG4gICAgY29uc3Qgc3RhcnRXZWVrRGF5ID0gc3RhcnREYXRlLmdldERheSgpO1xuICAgIGNvbnN0IGVuZFdlZWtEYXkgPSBlbmREYXRlLmdldERheSgpO1xuICAgIGlmIChzdGFydFdlZWtEYXkgPT0gMCB8fCBzdGFydFdlZWtEYXkgPiA0KSB7XG4gICAgICBzdGFydERhdGUgPSBhZGRXZWVrcyhzdGFydERhdGUsIDEpO1xuICAgIH1cbiAgICBpZiAoZW5kV2Vla0RheSA+IDAgJiYgZW5kV2Vla0RheSA8IDQpIHtcbiAgICAgIGVuZERhdGUgPSBzdWJXZWVrcyhlbmREYXRlLCAxKTtcbiAgICB9XG4gICAgc3RhcnREYXRlID0gc3RhcnRPZklTT1dlZWsoc3RhcnREYXRlKTtcbiAgICBlbmREYXRlID0gZW5kT2ZJU09XZWVrKGVuZERhdGUpO1xuICAgIHJldHVybiB7IHN0YXJ0OiBzdGFydERhdGUsIGVuZDogZW5kRGF0ZSB9O1xuICB9XG5cbiAgZ2V0RW50cnlSYW5nZShlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IHtzdGFydDogRGF0ZSwgZW5kOiBEYXRlfSB7XG4gICAgaWYgKGVudHJ5LnR5cGUgPT09ICdkYXknKSB7XG4gICAgICByZXR1cm4geyBzdGFydDogbmV3IERhdGUoZW50cnkuZGF0ZSksIGVuZDogbmV3IERhdGUoZW50cnkuZGF0ZSkgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGN1ckRhdGU6IERhdGUgPSBuZXcgRGF0ZShlbnRyeS5kYXRlKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBlbnRyeS50eXBlID09PSAnbW9udGgnID8gc3RhcnRPZk1vbnRoKGN1ckRhdGUpIDogc3RhcnRPZlllYXIoY3VyRGF0ZSksXG4gICAgICAgIGVuZDogZW50cnkudHlwZSA9PT0gJ21vbnRoJyA/IGVuZE9mTW9udGgoY3VyRGF0ZSkgOiBlbmRPZlllYXIoY3VyRGF0ZSlcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgaXNFbnRyeVNlbGVjdGVkKFxuICAgIGVudHJ5OiBBamZDYWxlbmRhckVudHJ5LCBzZWxlY3Rpb246IEFqZkNhbGVuZGFyUGVyaW9kfG51bGxcbiAgKTogQWpmQ2FsZW5kYXJFbnRyeVNlbGVjdGVkU3RhdGUge1xuICAgIGlmIChzZWxlY3Rpb24gIT0gbnVsbCAmJiBzZWxlY3Rpb24uc3RhcnREYXRlICE9IG51bGwgJiYgc2VsZWN0aW9uLmVuZERhdGUgIT0gbnVsbCkge1xuICAgICAgbGV0IHNlbGVjdGlvblN0YXJ0OiBEYXRlID0gc3RhcnRPZkRheShzZWxlY3Rpb24uc3RhcnREYXRlKTtcbiAgICAgIGxldCBzZWxlY3Rpb25FbmQ6IERhdGUgPSBlbmRPZkRheShzZWxlY3Rpb24uZW5kRGF0ZSk7XG4gICAgICBsZXQgc2VsZWN0aW9uUGVyaW9kT3JkZXI6IG51bWJlciA9IHBlcmlvZE9yZGVyKHNlbGVjdGlvbi50eXBlKTtcblxuICAgICAgbGV0IGVudHJ5UGVyaW9kT3JkZXI6IG51bWJlciA9IHBlcmlvZE9yZGVyKGVudHJ5LnR5cGUpO1xuICAgICAgbGV0IGVudHJ5UmFuZ2U6IHsgc3RhcnQ6IERhdGUsIGVuZDogRGF0ZSB9ID0gdGhpcy5nZXRFbnRyeVJhbmdlKGVudHJ5KTtcblxuICAgICAgaWYgKGVudHJ5UGVyaW9kT3JkZXIgPD0gc2VsZWN0aW9uUGVyaW9kT3JkZXIgJiZcbiAgICAgICAgaXNCZXR3ZWVuKGVudHJ5UmFuZ2Uuc3RhcnQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpICYmXG4gICAgICAgIGlzQmV0d2VlbihlbnRyeVJhbmdlLmVuZCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZClcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gJ2Z1bGwnO1xuICAgICAgfSBlbHNlIGlmIChlbnRyeVBlcmlvZE9yZGVyID4gc2VsZWN0aW9uUGVyaW9kT3JkZXIgJiZcbiAgICAgICAgaXNCZXR3ZWVuKHNlbGVjdGlvblN0YXJ0LCBlbnRyeVJhbmdlLnN0YXJ0LCBlbnRyeVJhbmdlLmVuZCkgJiZcbiAgICAgICAgaXNCZXR3ZWVuKHNlbGVjdGlvbkVuZCwgZW50cnlSYW5nZS5zdGFydCwgZW50cnlSYW5nZS5lbmQpXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuICdwYXJ0aWFsJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJ25vbmUnO1xuICB9XG5cbiAgZW50cnlMYWJlbChlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IHN0cmluZyB7XG4gICAgaWYgKGVudHJ5LnR5cGUgPT09ICdkYXknKSB7XG4gICAgICByZXR1cm4gYCR7ZW50cnkuZGF0ZS5nZXREYXRlKCl9YDtcbiAgICB9XG4gICAgaWYgKGVudHJ5LnR5cGUgPT09ICdtb250aCcpIHtcbiAgICAgIHJldHVybiBmb3JtYXQoZW50cnkuZGF0ZSwgJ01NTScpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7ZW50cnkuZGF0ZS5nZXRGdWxsWWVhcigpfWA7XG4gIH1cblxuICBuZXh0Vmlldyh2aWV3RGF0ZTogRGF0ZSwgdmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUpOiBEYXRlIHtcbiAgICBpZiAodmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgcmV0dXJuIGFkZE1vbnRocyh2aWV3RGF0ZSwgMSk7XG4gICAgfSBlbHNlIGlmICh2aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHJldHVybiBhZGRZZWFycyh2aWV3RGF0ZSwgMSk7XG4gICAgfSBlbHNlIGlmICh2aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgcmV0dXJuIGFkZFllYXJzKHZpZXdEYXRlLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiB2aWV3RGF0ZTtcbiAgfVxuXG4gIHByZXZpb3VzVmlldyh2aWV3RGF0ZTogRGF0ZSwgdmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUpOiBEYXRlIHtcbiAgICBpZiAodmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgcmV0dXJuIHN1Yk1vbnRocyh2aWV3RGF0ZSwgMSk7XG4gICAgfSBlbHNlIGlmICh2aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHJldHVybiBzdWJZZWFycyh2aWV3RGF0ZSwgMSk7XG4gICAgfSBlbHNlIGlmICh2aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgcmV0dXJuIHN1YlllYXJzKHZpZXdEYXRlLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiB2aWV3RGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX21vbnRoSGVhZGVyUm93KHBhcmFtczogQWpmQ2FsZW5kYXJQYXJhbXMpOiBzdHJpbmdbXSB7XG4gICAgY29uc3Qge2lzb01vZGUsIHZpZXdEYXRlfSA9IHBhcmFtcztcbiAgICBsZXQgY3VyRGF0ZTogRGF0ZTtcbiAgICBpZiAoaXNvTW9kZSkge1xuICAgICAgY3VyRGF0ZSA9IHNldElTT0RheShzdGFydE9mV2Vlayh2aWV3RGF0ZSksIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJEYXRlID0gc3RhcnRPZldlZWsodmlld0RhdGUpO1xuICAgIH1cbiAgICBsZXQgd2Vla0RheU5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICB3ZWVrRGF5TmFtZXMucHVzaChmb3JtYXQoY3VyRGF0ZSwgJ0VFRScpKTtcbiAgICAgIGN1ckRhdGUgPSBhZGREYXlzKGN1ckRhdGUsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gd2Vla0RheU5hbWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVjYWRlQ2FsZW5kYXJSb3dzKHBhcmFtczogQWpmQ2FsZW5kYXJQYXJhbXMpOiBBamZDYWxlbmRhckVudHJ5W11bXSB7XG4gICAgY29uc3Qge3ZpZXdEYXRlLCBzZWxlY3Rpb259ID0gcGFyYW1zO1xuICAgIGxldCBjdXJZZWFyOiBudW1iZXIgPSB2aWV3RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGxldCBmaXJzdFllYXIgPSBjdXJZZWFyIC0gKGN1clllYXIgJSAxMCkgKyAxO1xuICAgIGxldCBjdXJEYXRlOiBEYXRlID0gc3RhcnRPZlllYXIodmlld0RhdGUpO1xuICAgIGN1ckRhdGUuc2V0RnVsbFllYXIoZmlyc3RZZWFyKTtcblxuICAgIGxldCByb3dzOiBBamZDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBsZXQgcm93OiBBamZDYWxlbmRhckVudHJ5W10gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY3VyRGF0ZSk7XG4gICAgICAgIGxldCBuZXdFbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSA9IHtcbiAgICAgICAgICB0eXBlOiAneWVhcicsXG4gICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICBzZWxlY3RlZDogJ25vbmUnXG4gICAgICAgIH07XG4gICAgICAgIG5ld0VudHJ5LnNlbGVjdGVkID0gdGhpcy5pc0VudHJ5U2VsZWN0ZWQobmV3RW50cnksIHNlbGVjdGlvbik7XG4gICAgICAgIHJvdy5wdXNoKG5ld0VudHJ5KTtcbiAgICAgICAgY3VyRGF0ZSA9IGFkZFllYXJzKGN1ckRhdGUsIDEpO1xuICAgICAgfVxuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBwcml2YXRlIF95ZWFyQ2FsZW5kYXJSb3dzKHBhcmFtczogQWpmQ2FsZW5kYXJQYXJhbXMpOiBBamZDYWxlbmRhckVudHJ5W11bXSB7XG4gICAgY29uc3Qge3ZpZXdEYXRlLCBzZWxlY3Rpb259ID0gcGFyYW1zO1xuICAgIGxldCBjdXJEYXRlOiBEYXRlID0gc3RhcnRPZlllYXIodmlld0RhdGUpO1xuXG4gICAgbGV0IHJvd3M6IEFqZkNhbGVuZGFyRW50cnlbXVtdID0gW107XG4gICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcbiAgICAgIGxldCByb3c6IEFqZkNhbGVuZGFyRW50cnlbXSA9IFtdO1xuICAgICAgZm9yIChsZXQgaiA9IDA7IGogPCAzOyBqKyspIHtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShjdXJEYXRlKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5OiBBamZDYWxlbmRhckVudHJ5ID0ge1xuICAgICAgICAgIHR5cGU6ICdtb250aCcsXG4gICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICBzZWxlY3RlZDogJ25vbmUnXG4gICAgICAgIH07XG4gICAgICAgIG5ld0VudHJ5LnNlbGVjdGVkID0gdGhpcy5pc0VudHJ5U2VsZWN0ZWQobmV3RW50cnksIHNlbGVjdGlvbik7XG4gICAgICAgIHJvdy5wdXNoKG5ld0VudHJ5KTtcbiAgICAgICAgY3VyRGF0ZSA9IGFkZE1vbnRocyhjdXJEYXRlLCAxKTtcbiAgICAgIH1cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW9udGhDYWxlbmRhclJvd3MocGFyYW1zOiBBamZDYWxlbmRhclBhcmFtcyk6IEFqZkNhbGVuZGFyRW50cnlbXVtdIHtcbiAgICBjb25zdCB7dmlld0RhdGUsIHNlbGVjdGlvbiwgaXNvTW9kZSwgbWluRGF0ZSwgbWF4RGF0ZX0gPSBwYXJhbXM7XG4gICAgY29uc3QgbW9udGhCb3VuZHMgPSB0aGlzLm1vbnRoQm91bmRzKHZpZXdEYXRlLCBpc29Nb2RlKTtcbiAgICBsZXQgdmlld1N0YXJ0RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKG1vbnRoQm91bmRzLnN0YXJ0KTtcbiAgICBsZXQgdmlld0VuZERhdGU6IERhdGUgPSBuZXcgRGF0ZShtb250aEJvdW5kcy5lbmQpO1xuICAgIGlmICghaXNvTW9kZSkge1xuICAgICAgdmlld1N0YXJ0RGF0ZSA9IHN0YXJ0T2ZXZWVrKHZpZXdTdGFydERhdGUpO1xuICAgICAgdmlld0VuZERhdGUgPSBlbmRPZldlZWsodmlld0VuZERhdGUpO1xuICAgIH1cblxuICAgIGxldCByb3dzOiBBamZDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICAgIGxldCB0b2RheURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBjdXJEYXRlID0gbmV3IERhdGUodmlld1N0YXJ0RGF0ZSk7XG4gICAgd2hpbGUgKGN1ckRhdGUgPCB2aWV3RW5kRGF0ZSkge1xuICAgICAgbGV0IHJvdzogQWpmQ2FsZW5kYXJFbnRyeVtdID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICBsZXQgZGlzYWJsZWQgPSAobWluRGF0ZSAhPSBudWxsICYmIGlzQmVmb3JlKGN1ckRhdGUsIG1pbkRhdGUpKSB8fFxuICAgICAgICAgIChtYXhEYXRlICE9IG51bGwgJiYgaXNBZnRlcihjdXJEYXRlLCBtYXhEYXRlKSk7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY3VyRGF0ZSk7XG4gICAgICAgIGxldCBuZXdFbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSA9IHtcbiAgICAgICAgICB0eXBlOiAnZGF5JyxcbiAgICAgICAgICBkYXRlOiBkYXRlLFxuICAgICAgICAgIHNlbGVjdGVkOiAnbm9uZScsXG4gICAgICAgICAgaGlnaGxpZ2h0OiBmb3JtYXQodG9kYXlEYXRlLCAneXl5eS1NTS1kZCcpID09PSBmb3JtYXQoY3VyRGF0ZSwgJ3l5eXktTU0tZGQnKSxcbiAgICAgICAgICBkaXNhYmxlZDogZGlzYWJsZWRcbiAgICAgICAgfTtcbiAgICAgICAgbmV3RW50cnkuc2VsZWN0ZWQgPSB0aGlzLmlzRW50cnlTZWxlY3RlZChuZXdFbnRyeSwgc2VsZWN0aW9uKTtcbiAgICAgICAgcm93LnB1c2gobmV3RW50cnkpO1xuICAgICAgICBjdXJEYXRlID0gYWRkRGF5cyhjdXJEYXRlLCAxKTtcbiAgICAgIH1cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cbiAgICByZXR1cm4gcm93cztcbiAgfVxufVxuIl19