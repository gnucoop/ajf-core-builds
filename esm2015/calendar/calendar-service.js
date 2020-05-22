import { __decorate } from "tslib";
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
function isBetween(date, rangeLeft, rangeRight) {
    return (isAfter(date, rangeLeft) || isSameDay(date, rangeLeft)) &&
        (isBefore(date, rangeRight) || isSameDay(date, rangeRight));
}
function periodOrder(entryType) {
    return ['day', 'week', 'month', 'year'].indexOf(entryType);
}
let AjfCalendarService = /** @class */ (() => {
    let AjfCalendarService = class AjfCalendarService {
        buildView(params) {
            const { viewMode, viewDate } = params;
            switch (viewMode) {
                case 'decade':
                    let curYear = viewDate.getFullYear();
                    let firstYear = curYear - (curYear % 10) + 1;
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
        monthBounds(date, isoMode) {
            if (!isoMode) {
                return {
                    start: startOfMonth(date),
                    end: endOfMonth(date),
                };
            }
            const isoDay = getISODay(date);
            date = isoDay < 4 ? endOfISOWeek(date) : startOfISOWeek(date);
            let startDate = startOfMonth(date);
            let endDate = endOfMonth(startDate);
            const startWeekDay = startDate.getDay();
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
        getEntryRange(entry) {
            if (entry.type === 'day') {
                return { start: new Date(entry.date), end: new Date(entry.date) };
            }
            else {
                let curDate = new Date(entry.date);
                return {
                    start: entry.type === 'month' ? startOfMonth(curDate) : startOfYear(curDate),
                    end: entry.type === 'month' ? endOfMonth(curDate) : endOfYear(curDate)
                };
            }
        }
        isEntrySelected(entry, selection) {
            if (selection != null && selection.startDate != null && selection.endDate != null) {
                let selectionStart = startOfDay(selection.startDate);
                let selectionEnd = endOfDay(selection.endDate);
                let selectionPeriodOrder = periodOrder(selection.type);
                let entryPeriodOrder = periodOrder(entry.type);
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
        entryLabel(entry) {
            if (entry.type === 'day') {
                return `${entry.date.getDate()}`;
            }
            if (entry.type === 'month') {
                return format(entry.date, 'MMM');
            }
            return `${entry.date.getFullYear()}`;
        }
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
        _monthHeaderRow(params) {
            const { isoMode, viewDate } = params;
            let curDate;
            if (isoMode) {
                curDate = setISODay(startOfWeek(viewDate), 1);
            }
            else {
                curDate = startOfWeek(viewDate);
            }
            let weekDayNames = [];
            for (let i = 0; i < 7; i++) {
                weekDayNames.push(format(curDate, 'EEE'));
                curDate = addDays(curDate, 1);
            }
            return weekDayNames;
        }
        _decadeCalendarRows(params) {
            const { viewDate, selection } = params;
            let curYear = viewDate.getFullYear();
            let firstYear = curYear - (curYear % 10) + 1;
            let curDate = startOfYear(viewDate);
            curDate.setFullYear(firstYear);
            let rows = [];
            for (let i = 0; i < 4; i++) {
                let row = [];
                for (let j = 0; j < 3; j++) {
                    let date = new Date(curDate);
                    let newEntry = { type: 'year', date: date, selected: 'none' };
                    newEntry.selected = this.isEntrySelected(newEntry, selection);
                    row.push(newEntry);
                    curDate = addYears(curDate, 1);
                }
                rows.push(row);
            }
            return rows;
        }
        _yearCalendarRows(params) {
            const { viewDate, selection } = params;
            let curDate = startOfYear(viewDate);
            let rows = [];
            for (let i = 0; i < 4; i++) {
                let row = [];
                for (let j = 0; j < 3; j++) {
                    let date = new Date(curDate);
                    let newEntry = { type: 'month', date: date, selected: 'none' };
                    newEntry.selected = this.isEntrySelected(newEntry, selection);
                    row.push(newEntry);
                    curDate = addMonths(curDate, 1);
                }
                rows.push(row);
            }
            return rows;
        }
        _monthCalendarRows(params) {
            const { viewDate, selection, isoMode, minDate, maxDate } = params;
            const monthBounds = this.monthBounds(viewDate, isoMode);
            let viewStartDate = new Date(monthBounds.start);
            let viewEndDate = new Date(monthBounds.end);
            if (!isoMode) {
                viewStartDate = startOfWeek(viewStartDate);
                viewEndDate = endOfWeek(viewEndDate);
            }
            let rows = [];
            let todayDate = new Date();
            let curDate = new Date(viewStartDate);
            while (curDate < viewEndDate) {
                let row = [];
                for (let i = 0; i < 7; i++) {
                    let disabled = (minDate != null && isBefore(curDate, minDate)) ||
                        (maxDate != null && isAfter(curDate, maxDate));
                    let date = new Date(curDate);
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
    };
    AjfCalendarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AjfCalendarService_Factory() { return new AjfCalendarService(); }, token: AjfCalendarService, providedIn: "root" });
    AjfCalendarService = __decorate([
        Injectable({ providedIn: 'root' })
    ], AjfCalendarService);
    return AjfCalendarService;
})();
export { AjfCalendarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NhbGVuZGFyL2NhbGVuZGFyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDekMsT0FBTyxFQUNMLE9BQU8sRUFDUCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsRUFDUixRQUFRLEVBQ1IsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsU0FBUyxFQUNULE1BQU0sRUFDTixTQUFTLEVBQ1QsT0FBTyxFQUNQLFFBQVEsRUFDUixTQUFTLEVBQ1QsU0FBUyxFQUNULFVBQVUsRUFDVixjQUFjLEVBQ2QsWUFBWSxFQUNaLFdBQVcsRUFDWCxXQUFXLEVBQ1gsU0FBUyxFQUNULFFBQVEsRUFDUixRQUFRLEVBQ1QsTUFBTSxVQUFVLENBQUM7O0FBa0JsQixTQUFTLFNBQVMsQ0FBQyxJQUFVLEVBQUUsU0FBZSxFQUFFLFVBQWdCO0lBQzlELE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFDM0QsQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxJQUFJLFNBQVMsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLENBQUMsQ0FBQztBQUNsRSxDQUFDO0FBRUQsU0FBUyxXQUFXLENBQUMsU0FBZ0M7SUFDbkQsT0FBTyxDQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztBQUM3RCxDQUFDO0FBR0Q7SUFBQSxJQUFhLGtCQUFrQixHQUEvQixNQUFhLGtCQUFrQjtRQUM3QixTQUFTLENBQUMsTUFBeUI7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R0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbkIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUM7aUJBQy9CO2dCQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7YUFDaEI7WUFDRCxPQUFPLElBQUksQ0FBQztRQUNkLENBQUM7S0FDRixDQUFBOztJQTNOWSxrQkFBa0I7UUFEOUIsVUFBVSxDQUFDLEVBQUMsVUFBVSxFQUFFLE1BQU0sRUFBQyxDQUFDO09BQ3BCLGtCQUFrQixDQTJOOUI7NkJBdFNEO0tBc1NDO1NBM05ZLGtCQUFrQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIGFkZERheXMsXG4gIGFkZE1vbnRocyxcbiAgYWRkV2Vla3MsXG4gIGFkZFllYXJzLFxuICBlbmRPZkRheSxcbiAgZW5kT2ZJU09XZWVrLFxuICBlbmRPZk1vbnRoLFxuICBlbmRPZldlZWssXG4gIGVuZE9mWWVhcixcbiAgZm9ybWF0LFxuICBnZXRJU09EYXksXG4gIGlzQWZ0ZXIsXG4gIGlzQmVmb3JlLFxuICBpc1NhbWVEYXksXG4gIHNldElTT0RheSxcbiAgc3RhcnRPZkRheSxcbiAgc3RhcnRPZklTT1dlZWssXG4gIHN0YXJ0T2ZNb250aCxcbiAgc3RhcnRPZldlZWssXG4gIHN0YXJ0T2ZZZWFyLFxuICBzdWJNb250aHMsXG4gIHN1YldlZWtzLFxuICBzdWJZZWFyc1xufSBmcm9tICdkYXRlLWZucyc7XG5cbmltcG9ydCB7QWpmQ2FsZW5kYXJFbnRyeX0gZnJvbSAnLi9jYWxlbmRhci1lbnRyeSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyRW50cnlTZWxlY3RlZFN0YXRlfSBmcm9tICcuL2NhbGVuZGFyLWVudHJ5LXNlbGVjdGVkLXN0YXRlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJQZXJpb2R9IGZyb20gJy4vY2FsZW5kYXItcGVyaW9kJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJQZXJpb2RUeXBlfSBmcm9tICcuL2NhbGVuZGFyLXBlcmlvZC10eXBlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJWaWV3fSBmcm9tICcuL2NhbGVuZGFyLXZpZXcnO1xuaW1wb3J0IHtBamZDYWxlbmRhclZpZXdNb2RlfSBmcm9tICcuL2NhbGVuZGFyLXZpZXctbW9kZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmQ2FsZW5kYXJQYXJhbXMge1xuICB2aWV3TW9kZTogQWpmQ2FsZW5kYXJWaWV3TW9kZTtcbiAgdmlld0RhdGU6IERhdGU7XG4gIHNlbGVjdGlvbjogQWpmQ2FsZW5kYXJQZXJpb2R8bnVsbDtcbiAgaXNvTW9kZTogYm9vbGVhbjtcbiAgbWluRGF0ZTogRGF0ZXxudWxsO1xuICBtYXhEYXRlOiBEYXRlfG51bGw7XG59XG5cbmZ1bmN0aW9uIGlzQmV0d2VlbihkYXRlOiBEYXRlLCByYW5nZUxlZnQ6IERhdGUsIHJhbmdlUmlnaHQ6IERhdGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIChpc0FmdGVyKGRhdGUsIHJhbmdlTGVmdCkgfHwgaXNTYW1lRGF5KGRhdGUsIHJhbmdlTGVmdCkpICYmXG4gICAgICAoaXNCZWZvcmUoZGF0ZSwgcmFuZ2VSaWdodCkgfHwgaXNTYW1lRGF5KGRhdGUsIHJhbmdlUmlnaHQpKTtcbn1cblxuZnVuY3Rpb24gcGVyaW9kT3JkZXIoZW50cnlUeXBlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUpOiBudW1iZXIge1xuICByZXR1cm4gWydkYXknLCAnd2VlaycsICdtb250aCcsICd5ZWFyJ10uaW5kZXhPZihlbnRyeVR5cGUpO1xufVxuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBBamZDYWxlbmRhclNlcnZpY2Uge1xuICBidWlsZFZpZXcocGFyYW1zOiBBamZDYWxlbmRhclBhcmFtcyk6IEFqZkNhbGVuZGFyVmlldyB7XG4gICAgY29uc3Qge3ZpZXdNb2RlLCB2aWV3RGF0ZX0gPSBwYXJhbXM7XG4gICAgc3dpdGNoICh2aWV3TW9kZSkge1xuICAgICAgY2FzZSAnZGVjYWRlJzpcbiAgICAgICAgbGV0IGN1clllYXI6IG51bWJlciA9IHZpZXdEYXRlLmdldEZ1bGxZZWFyKCk7XG4gICAgICAgIGxldCBmaXJzdFllYXIgPSBjdXJZZWFyIC0gKGN1clllYXIgJSAxMCkgKyAxO1xuICAgICAgICBsZXQgbGFzdFllYXIgPSBmaXJzdFllYXIgKyAxMTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoZWFkZXI6IGAke2ZpcnN0WWVhcn0gLSAke2xhc3RZZWFyfWAsXG4gICAgICAgICAgaGVhZGVyUm93OiBbXSxcbiAgICAgICAgICByb3dzOiB0aGlzLl9kZWNhZGVDYWxlbmRhclJvd3MocGFyYW1zKSxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhlYWRlcjogYCR7dmlld0RhdGUuZ2V0RnVsbFllYXIoKX1gLFxuICAgICAgICAgIGhlYWRlclJvdzogW10sXG4gICAgICAgICAgcm93czogdGhpcy5feWVhckNhbGVuZGFyUm93cyhwYXJhbXMpLFxuICAgICAgICB9O1xuICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGhlYWRlcjogZm9ybWF0KHZpZXdEYXRlLCAnTU1NIHl5eXknKSxcbiAgICAgICAgICBoZWFkZXJSb3c6IHRoaXMuX21vbnRoSGVhZGVyUm93KHBhcmFtcyksXG4gICAgICAgICAgcm93czogdGhpcy5fbW9udGhDYWxlbmRhclJvd3MocGFyYW1zKSxcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIGhlYWRlcjogJycsXG4gICAgICBoZWFkZXJSb3c6IFtdLFxuICAgICAgcm93czogW10sXG4gICAgfTtcbiAgfVxuXG4gIG1vbnRoQm91bmRzKGRhdGU6IERhdGUsIGlzb01vZGU6IGJvb2xlYW4pOiB7c3RhcnQ6IERhdGUsIGVuZDogRGF0ZX0ge1xuICAgIGlmICghaXNvTW9kZSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IHN0YXJ0T2ZNb250aChkYXRlKSxcbiAgICAgICAgZW5kOiBlbmRPZk1vbnRoKGRhdGUpLFxuICAgICAgfTtcbiAgICB9XG4gICAgY29uc3QgaXNvRGF5ID0gZ2V0SVNPRGF5KGRhdGUpO1xuICAgIGRhdGUgPSBpc29EYXkgPCA0ID8gZW5kT2ZJU09XZWVrKGRhdGUpIDogc3RhcnRPZklTT1dlZWsoZGF0ZSk7XG4gICAgbGV0IHN0YXJ0RGF0ZSA9IHN0YXJ0T2ZNb250aChkYXRlKTtcbiAgICBsZXQgZW5kRGF0ZSA9IGVuZE9mTW9udGgoc3RhcnREYXRlKTtcbiAgICBjb25zdCBzdGFydFdlZWtEYXkgPSBzdGFydERhdGUuZ2V0RGF5KCk7XG4gICAgY29uc3QgZW5kV2Vla0RheSA9IGVuZERhdGUuZ2V0RGF5KCk7XG4gICAgaWYgKHN0YXJ0V2Vla0RheSA9PSAwIHx8IHN0YXJ0V2Vla0RheSA+IDQpIHtcbiAgICAgIHN0YXJ0RGF0ZSA9IGFkZFdlZWtzKHN0YXJ0RGF0ZSwgMSk7XG4gICAgfVxuICAgIGlmIChlbmRXZWVrRGF5ID4gMCAmJiBlbmRXZWVrRGF5IDwgNCkge1xuICAgICAgZW5kRGF0ZSA9IHN1YldlZWtzKGVuZERhdGUsIDEpO1xuICAgIH1cbiAgICBzdGFydERhdGUgPSBzdGFydE9mSVNPV2VlayhzdGFydERhdGUpO1xuICAgIGVuZERhdGUgPSBlbmRPZklTT1dlZWsoZW5kRGF0ZSk7XG4gICAgcmV0dXJuIHtzdGFydDogc3RhcnREYXRlLCBlbmQ6IGVuZERhdGV9O1xuICB9XG5cbiAgZ2V0RW50cnlSYW5nZShlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IHtzdGFydDogRGF0ZSwgZW5kOiBEYXRlfSB7XG4gICAgaWYgKGVudHJ5LnR5cGUgPT09ICdkYXknKSB7XG4gICAgICByZXR1cm4ge3N0YXJ0OiBuZXcgRGF0ZShlbnRyeS5kYXRlKSwgZW5kOiBuZXcgRGF0ZShlbnRyeS5kYXRlKX07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBjdXJEYXRlOiBEYXRlID0gbmV3IERhdGUoZW50cnkuZGF0ZSk7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBzdGFydDogZW50cnkudHlwZSA9PT0gJ21vbnRoJyA/IHN0YXJ0T2ZNb250aChjdXJEYXRlKSA6IHN0YXJ0T2ZZZWFyKGN1ckRhdGUpLFxuICAgICAgICBlbmQ6IGVudHJ5LnR5cGUgPT09ICdtb250aCcgPyBlbmRPZk1vbnRoKGN1ckRhdGUpIDogZW5kT2ZZZWFyKGN1ckRhdGUpXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIGlzRW50cnlTZWxlY3RlZChlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSwgc2VsZWN0aW9uOiBBamZDYWxlbmRhclBlcmlvZHxudWxsKTpcbiAgICAgIEFqZkNhbGVuZGFyRW50cnlTZWxlY3RlZFN0YXRlIHtcbiAgICBpZiAoc2VsZWN0aW9uICE9IG51bGwgJiYgc2VsZWN0aW9uLnN0YXJ0RGF0ZSAhPSBudWxsICYmIHNlbGVjdGlvbi5lbmREYXRlICE9IG51bGwpIHtcbiAgICAgIGxldCBzZWxlY3Rpb25TdGFydDogRGF0ZSA9IHN0YXJ0T2ZEYXkoc2VsZWN0aW9uLnN0YXJ0RGF0ZSk7XG4gICAgICBsZXQgc2VsZWN0aW9uRW5kOiBEYXRlID0gZW5kT2ZEYXkoc2VsZWN0aW9uLmVuZERhdGUpO1xuICAgICAgbGV0IHNlbGVjdGlvblBlcmlvZE9yZGVyOiBudW1iZXIgPSBwZXJpb2RPcmRlcihzZWxlY3Rpb24udHlwZSk7XG5cbiAgICAgIGxldCBlbnRyeVBlcmlvZE9yZGVyOiBudW1iZXIgPSBwZXJpb2RPcmRlcihlbnRyeS50eXBlKTtcbiAgICAgIGxldCBlbnRyeVJhbmdlOiB7c3RhcnQ6IERhdGUsIGVuZDogRGF0ZX0gPSB0aGlzLmdldEVudHJ5UmFuZ2UoZW50cnkpO1xuXG4gICAgICBpZiAoZW50cnlQZXJpb2RPcmRlciA8PSBzZWxlY3Rpb25QZXJpb2RPcmRlciAmJlxuICAgICAgICAgIGlzQmV0d2VlbihlbnRyeVJhbmdlLnN0YXJ0LCBzZWxlY3Rpb25TdGFydCwgc2VsZWN0aW9uRW5kKSAmJlxuICAgICAgICAgIGlzQmV0d2VlbihlbnRyeVJhbmdlLmVuZCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCkpIHtcbiAgICAgICAgcmV0dXJuICdmdWxsJztcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgZW50cnlQZXJpb2RPcmRlciA+IHNlbGVjdGlvblBlcmlvZE9yZGVyICYmXG4gICAgICAgICAgaXNCZXR3ZWVuKHNlbGVjdGlvblN0YXJ0LCBlbnRyeVJhbmdlLnN0YXJ0LCBlbnRyeVJhbmdlLmVuZCkgJiZcbiAgICAgICAgICBpc0JldHdlZW4oc2VsZWN0aW9uRW5kLCBlbnRyeVJhbmdlLnN0YXJ0LCBlbnRyeVJhbmdlLmVuZCkpIHtcbiAgICAgICAgcmV0dXJuICdwYXJ0aWFsJztcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gJ25vbmUnO1xuICB9XG5cbiAgZW50cnlMYWJlbChlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IHN0cmluZyB7XG4gICAgaWYgKGVudHJ5LnR5cGUgPT09ICdkYXknKSB7XG4gICAgICByZXR1cm4gYCR7ZW50cnkuZGF0ZS5nZXREYXRlKCl9YDtcbiAgICB9XG4gICAgaWYgKGVudHJ5LnR5cGUgPT09ICdtb250aCcpIHtcbiAgICAgIHJldHVybiBmb3JtYXQoZW50cnkuZGF0ZSwgJ01NTScpO1xuICAgIH1cbiAgICByZXR1cm4gYCR7ZW50cnkuZGF0ZS5nZXRGdWxsWWVhcigpfWA7XG4gIH1cblxuICBuZXh0Vmlldyh2aWV3RGF0ZTogRGF0ZSwgdmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUpOiBEYXRlIHtcbiAgICBpZiAodmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgcmV0dXJuIGFkZE1vbnRocyh2aWV3RGF0ZSwgMSk7XG4gICAgfSBlbHNlIGlmICh2aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHJldHVybiBhZGRZZWFycyh2aWV3RGF0ZSwgMSk7XG4gICAgfSBlbHNlIGlmICh2aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgcmV0dXJuIGFkZFllYXJzKHZpZXdEYXRlLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiB2aWV3RGF0ZTtcbiAgfVxuXG4gIHByZXZpb3VzVmlldyh2aWV3RGF0ZTogRGF0ZSwgdmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUpOiBEYXRlIHtcbiAgICBpZiAodmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgcmV0dXJuIHN1Yk1vbnRocyh2aWV3RGF0ZSwgMSk7XG4gICAgfSBlbHNlIGlmICh2aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHJldHVybiBzdWJZZWFycyh2aWV3RGF0ZSwgMSk7XG4gICAgfSBlbHNlIGlmICh2aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgcmV0dXJuIHN1YlllYXJzKHZpZXdEYXRlLCAxMCk7XG4gICAgfVxuICAgIHJldHVybiB2aWV3RGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX21vbnRoSGVhZGVyUm93KHBhcmFtczogQWpmQ2FsZW5kYXJQYXJhbXMpOiBzdHJpbmdbXSB7XG4gICAgY29uc3Qge2lzb01vZGUsIHZpZXdEYXRlfSA9IHBhcmFtcztcbiAgICBsZXQgY3VyRGF0ZTogRGF0ZTtcbiAgICBpZiAoaXNvTW9kZSkge1xuICAgICAgY3VyRGF0ZSA9IHNldElTT0RheShzdGFydE9mV2Vlayh2aWV3RGF0ZSksIDEpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjdXJEYXRlID0gc3RhcnRPZldlZWsodmlld0RhdGUpO1xuICAgIH1cbiAgICBsZXQgd2Vla0RheU5hbWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICB3ZWVrRGF5TmFtZXMucHVzaChmb3JtYXQoY3VyRGF0ZSwgJ0VFRScpKTtcbiAgICAgIGN1ckRhdGUgPSBhZGREYXlzKGN1ckRhdGUsIDEpO1xuICAgIH1cbiAgICByZXR1cm4gd2Vla0RheU5hbWVzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGVjYWRlQ2FsZW5kYXJSb3dzKHBhcmFtczogQWpmQ2FsZW5kYXJQYXJhbXMpOiBBamZDYWxlbmRhckVudHJ5W11bXSB7XG4gICAgY29uc3Qge3ZpZXdEYXRlLCBzZWxlY3Rpb259ID0gcGFyYW1zO1xuICAgIGxldCBjdXJZZWFyOiBudW1iZXIgPSB2aWV3RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgIGxldCBmaXJzdFllYXIgPSBjdXJZZWFyIC0gKGN1clllYXIgJSAxMCkgKyAxO1xuICAgIGxldCBjdXJEYXRlOiBEYXRlID0gc3RhcnRPZlllYXIodmlld0RhdGUpO1xuICAgIGN1ckRhdGUuc2V0RnVsbFllYXIoZmlyc3RZZWFyKTtcblxuICAgIGxldCByb3dzOiBBamZDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBsZXQgcm93OiBBamZDYWxlbmRhckVudHJ5W10gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY3VyRGF0ZSk7XG4gICAgICAgIGxldCBuZXdFbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSA9IHt0eXBlOiAneWVhcicsIGRhdGU6IGRhdGUsIHNlbGVjdGVkOiAnbm9uZSd9O1xuICAgICAgICBuZXdFbnRyeS5zZWxlY3RlZCA9IHRoaXMuaXNFbnRyeVNlbGVjdGVkKG5ld0VudHJ5LCBzZWxlY3Rpb24pO1xuICAgICAgICByb3cucHVzaChuZXdFbnRyeSk7XG4gICAgICAgIGN1ckRhdGUgPSBhZGRZZWFycyhjdXJEYXRlLCAxKTtcbiAgICAgIH1cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgcHJpdmF0ZSBfeWVhckNhbGVuZGFyUm93cyhwYXJhbXM6IEFqZkNhbGVuZGFyUGFyYW1zKTogQWpmQ2FsZW5kYXJFbnRyeVtdW10ge1xuICAgIGNvbnN0IHt2aWV3RGF0ZSwgc2VsZWN0aW9ufSA9IHBhcmFtcztcbiAgICBsZXQgY3VyRGF0ZTogRGF0ZSA9IHN0YXJ0T2ZZZWFyKHZpZXdEYXRlKTtcblxuICAgIGxldCByb3dzOiBBamZDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XG4gICAgICBsZXQgcm93OiBBamZDYWxlbmRhckVudHJ5W10gPSBbXTtcbiAgICAgIGZvciAobGV0IGogPSAwOyBqIDwgMzsgaisrKSB7XG4gICAgICAgIGxldCBkYXRlID0gbmV3IERhdGUoY3VyRGF0ZSk7XG4gICAgICAgIGxldCBuZXdFbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSA9IHt0eXBlOiAnbW9udGgnLCBkYXRlOiBkYXRlLCBzZWxlY3RlZDogJ25vbmUnfTtcbiAgICAgICAgbmV3RW50cnkuc2VsZWN0ZWQgPSB0aGlzLmlzRW50cnlTZWxlY3RlZChuZXdFbnRyeSwgc2VsZWN0aW9uKTtcbiAgICAgICAgcm93LnB1c2gobmV3RW50cnkpO1xuICAgICAgICBjdXJEYXRlID0gYWRkTW9udGhzKGN1ckRhdGUsIDEpO1xuICAgICAgfVxuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cblxuICBwcml2YXRlIF9tb250aENhbGVuZGFyUm93cyhwYXJhbXM6IEFqZkNhbGVuZGFyUGFyYW1zKTogQWpmQ2FsZW5kYXJFbnRyeVtdW10ge1xuICAgIGNvbnN0IHt2aWV3RGF0ZSwgc2VsZWN0aW9uLCBpc29Nb2RlLCBtaW5EYXRlLCBtYXhEYXRlfSA9IHBhcmFtcztcbiAgICBjb25zdCBtb250aEJvdW5kcyA9IHRoaXMubW9udGhCb3VuZHModmlld0RhdGUsIGlzb01vZGUpO1xuICAgIGxldCB2aWV3U3RhcnREYXRlOiBEYXRlID0gbmV3IERhdGUobW9udGhCb3VuZHMuc3RhcnQpO1xuICAgIGxldCB2aWV3RW5kRGF0ZTogRGF0ZSA9IG5ldyBEYXRlKG1vbnRoQm91bmRzLmVuZCk7XG4gICAgaWYgKCFpc29Nb2RlKSB7XG4gICAgICB2aWV3U3RhcnREYXRlID0gc3RhcnRPZldlZWsodmlld1N0YXJ0RGF0ZSk7XG4gICAgICB2aWV3RW5kRGF0ZSA9IGVuZE9mV2Vlayh2aWV3RW5kRGF0ZSk7XG4gICAgfVxuXG4gICAgbGV0IHJvd3M6IEFqZkNhbGVuZGFyRW50cnlbXVtdID0gW107XG4gICAgbGV0IHRvZGF5RGF0ZSA9IG5ldyBEYXRlKCk7XG4gICAgbGV0IGN1ckRhdGUgPSBuZXcgRGF0ZSh2aWV3U3RhcnREYXRlKTtcbiAgICB3aGlsZSAoY3VyRGF0ZSA8IHZpZXdFbmREYXRlKSB7XG4gICAgICBsZXQgcm93OiBBamZDYWxlbmRhckVudHJ5W10gPSBbXTtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNzsgaSsrKSB7XG4gICAgICAgIGxldCBkaXNhYmxlZCA9IChtaW5EYXRlICE9IG51bGwgJiYgaXNCZWZvcmUoY3VyRGF0ZSwgbWluRGF0ZSkpIHx8XG4gICAgICAgICAgICAobWF4RGF0ZSAhPSBudWxsICYmIGlzQWZ0ZXIoY3VyRGF0ZSwgbWF4RGF0ZSkpO1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGN1ckRhdGUpO1xuICAgICAgICBsZXQgbmV3RW50cnk6IEFqZkNhbGVuZGFyRW50cnkgPSB7XG4gICAgICAgICAgdHlwZTogJ2RheScsXG4gICAgICAgICAgZGF0ZTogZGF0ZSxcbiAgICAgICAgICBzZWxlY3RlZDogJ25vbmUnLFxuICAgICAgICAgIGhpZ2hsaWdodDogZm9ybWF0KHRvZGF5RGF0ZSwgJ3l5eXktTU0tZGQnKSA9PT0gZm9ybWF0KGN1ckRhdGUsICd5eXl5LU1NLWRkJyksXG4gICAgICAgICAgZGlzYWJsZWQ6IGRpc2FibGVkXG4gICAgICAgIH07XG4gICAgICAgIG5ld0VudHJ5LnNlbGVjdGVkID0gdGhpcy5pc0VudHJ5U2VsZWN0ZWQobmV3RW50cnksIHNlbGVjdGlvbik7XG4gICAgICAgIHJvdy5wdXNoKG5ld0VudHJ5KTtcbiAgICAgICAgY3VyRGF0ZSA9IGFkZERheXMoY3VyRGF0ZSwgMSk7XG4gICAgICB9XG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG4gICAgcmV0dXJuIHJvd3M7XG4gIH1cbn1cbiJdfQ==