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
    class AjfCalendarService {
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
    }
    AjfCalendarService.decorators = [
        { type: Injectable, args: [{ providedIn: 'root' },] }
    ];
    AjfCalendarService.ɵprov = i0.ɵɵdefineInjectable({ factory: function AjfCalendarService_Factory() { return new AjfCalendarService(); }, token: AjfCalendarService, providedIn: "root" });
    return AjfCalendarService;
})();
export { AjfCalendarService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2NhbGVuZGFyL2NhbGVuZGFyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN6QyxPQUFPLEVBQ0wsT0FBTyxFQUNQLFNBQVMsRUFDVCxRQUFRLEVBQ1IsUUFBUSxFQUNSLFFBQVEsRUFDUixZQUFZLEVBQ1osVUFBVSxFQUNWLFNBQVMsRUFDVCxTQUFTLEVBQ1QsTUFBTSxFQUNOLFNBQVMsRUFDVCxPQUFPLEVBQ1AsUUFBUSxFQUNSLFNBQVMsRUFDVCxTQUFTLEVBQ1QsVUFBVSxFQUNWLGNBQWMsRUFDZCxZQUFZLEVBQ1osV0FBVyxFQUNYLFdBQVcsRUFDWCxTQUFTLEVBQ1QsUUFBUSxFQUNSLFFBQVEsRUFDVCxNQUFNLFVBQVUsQ0FBQzs7QUFrQmxCLFNBQVMsU0FBUyxDQUFDLElBQVUsRUFBRSxTQUFlLEVBQUUsVUFBZ0I7SUFDOUQsT0FBTyxDQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxTQUFTLENBQUMsQ0FBQztRQUMzRCxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksU0FBUyxDQUFDLElBQUksRUFBRSxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ2xFLENBQUM7QUFFRCxTQUFTLFdBQVcsQ0FBQyxTQUFnQztJQUNuRCxPQUFPLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUUsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0FBQzdELENBQUM7QUFFRDtJQUFBLE1BQ2Esa0JBQWtCO1FBQzdCLFNBQVMsQ0FBQyxNQUF5QjtZQUNqQyxNQUFNLEVBQUMsUUFB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LFFBQVEsQ0FBQyxDQUFDO29CQUNuQixPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsQ0FBQztpQkFDL0I7Z0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUNoQjtZQUNELE9BQU8sSUFBSSxDQUFDO1FBQ2QsQ0FBQzs7O2dCQTNORixVQUFVLFNBQUMsRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFDOzs7NkJBMUVoQztLQXNTQztTQTNOWSxrQkFBa0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBhZGREYXlzLFxuICBhZGRNb250aHMsXG4gIGFkZFdlZWtzLFxuICBhZGRZZWFycyxcbiAgZW5kT2ZEYXksXG4gIGVuZE9mSVNPV2VlayxcbiAgZW5kT2ZNb250aCxcbiAgZW5kT2ZXZWVrLFxuICBlbmRPZlllYXIsXG4gIGZvcm1hdCxcbiAgZ2V0SVNPRGF5LFxuICBpc0FmdGVyLFxuICBpc0JlZm9yZSxcbiAgaXNTYW1lRGF5LFxuICBzZXRJU09EYXksXG4gIHN0YXJ0T2ZEYXksXG4gIHN0YXJ0T2ZJU09XZWVrLFxuICBzdGFydE9mTW9udGgsXG4gIHN0YXJ0T2ZXZWVrLFxuICBzdGFydE9mWWVhcixcbiAgc3ViTW9udGhzLFxuICBzdWJXZWVrcyxcbiAgc3ViWWVhcnNcbn0gZnJvbSAnZGF0ZS1mbnMnO1xuXG5pbXBvcnQge0FqZkNhbGVuZGFyRW50cnl9IGZyb20gJy4vY2FsZW5kYXItZW50cnknO1xuaW1wb3J0IHtBamZDYWxlbmRhckVudHJ5U2VsZWN0ZWRTdGF0ZX0gZnJvbSAnLi9jYWxlbmRhci1lbnRyeS1zZWxlY3RlZC1zdGF0ZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyUGVyaW9kfSBmcm9tICcuL2NhbGVuZGFyLXBlcmlvZCc7XG5pbXBvcnQge0FqZkNhbGVuZGFyUGVyaW9kVHlwZX0gZnJvbSAnLi9jYWxlbmRhci1wZXJpb2QtdHlwZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyVmlld30gZnJvbSAnLi9jYWxlbmRhci12aWV3JztcbmltcG9ydCB7QWpmQ2FsZW5kYXJWaWV3TW9kZX0gZnJvbSAnLi9jYWxlbmRhci12aWV3LW1vZGUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkNhbGVuZGFyUGFyYW1zIHtcbiAgdmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGU7XG4gIHZpZXdEYXRlOiBEYXRlO1xuICBzZWxlY3Rpb246IEFqZkNhbGVuZGFyUGVyaW9kfG51bGw7XG4gIGlzb01vZGU6IGJvb2xlYW47XG4gIG1pbkRhdGU6IERhdGV8bnVsbDtcbiAgbWF4RGF0ZTogRGF0ZXxudWxsO1xufVxuXG5mdW5jdGlvbiBpc0JldHdlZW4oZGF0ZTogRGF0ZSwgcmFuZ2VMZWZ0OiBEYXRlLCByYW5nZVJpZ2h0OiBEYXRlKTogYm9vbGVhbiB7XG4gIHJldHVybiAoaXNBZnRlcihkYXRlLCByYW5nZUxlZnQpIHx8IGlzU2FtZURheShkYXRlLCByYW5nZUxlZnQpKSAmJlxuICAgICAgKGlzQmVmb3JlKGRhdGUsIHJhbmdlUmlnaHQpIHx8IGlzU2FtZURheShkYXRlLCByYW5nZVJpZ2h0KSk7XG59XG5cbmZ1bmN0aW9uIHBlcmlvZE9yZGVyKGVudHJ5VHlwZTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlKTogbnVtYmVyIHtcbiAgcmV0dXJuIFsnZGF5JywgJ3dlZWsnLCAnbW9udGgnLCAneWVhciddLmluZGV4T2YoZW50cnlUeXBlKTtcbn1cblxuQEluamVjdGFibGUoe3Byb3ZpZGVkSW46ICdyb290J30pXG5leHBvcnQgY2xhc3MgQWpmQ2FsZW5kYXJTZXJ2aWNlIHtcbiAgYnVpbGRWaWV3KHBhcmFtczogQWpmQ2FsZW5kYXJQYXJhbXMpOiBBamZDYWxlbmRhclZpZXcge1xuICAgIGNvbnN0IHt2aWV3TW9kZSwgdmlld0RhdGV9ID0gcGFyYW1zO1xuICAgIHN3aXRjaCAodmlld01vZGUpIHtcbiAgICAgIGNhc2UgJ2RlY2FkZSc6XG4gICAgICAgIGxldCBjdXJZZWFyOiBudW1iZXIgPSB2aWV3RGF0ZS5nZXRGdWxsWWVhcigpO1xuICAgICAgICBsZXQgZmlyc3RZZWFyID0gY3VyWWVhciAtIChjdXJZZWFyICUgMTApICsgMTtcbiAgICAgICAgbGV0IGxhc3RZZWFyID0gZmlyc3RZZWFyICsgMTE7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaGVhZGVyOiBgJHtmaXJzdFllYXJ9IC0gJHtsYXN0WWVhcn1gLFxuICAgICAgICAgIGhlYWRlclJvdzogW10sXG4gICAgICAgICAgcm93czogdGhpcy5fZGVjYWRlQ2FsZW5kYXJSb3dzKHBhcmFtcyksXG4gICAgICAgIH07XG4gICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoZWFkZXI6IGAke3ZpZXdEYXRlLmdldEZ1bGxZZWFyKCl9YCxcbiAgICAgICAgICBoZWFkZXJSb3c6IFtdLFxuICAgICAgICAgIHJvd3M6IHRoaXMuX3llYXJDYWxlbmRhclJvd3MocGFyYW1zKSxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoZWFkZXI6IGZvcm1hdCh2aWV3RGF0ZSwgJ01NTSB5eXl5JyksXG4gICAgICAgICAgaGVhZGVyUm93OiB0aGlzLl9tb250aEhlYWRlclJvdyhwYXJhbXMpLFxuICAgICAgICAgIHJvd3M6IHRoaXMuX21vbnRoQ2FsZW5kYXJSb3dzKHBhcmFtcyksXG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICBoZWFkZXI6ICcnLFxuICAgICAgaGVhZGVyUm93OiBbXSxcbiAgICAgIHJvd3M6IFtdLFxuICAgIH07XG4gIH1cblxuICBtb250aEJvdW5kcyhkYXRlOiBEYXRlLCBpc29Nb2RlOiBib29sZWFuKToge3N0YXJ0OiBEYXRlLCBlbmQ6IERhdGV9IHtcbiAgICBpZiAoIWlzb01vZGUpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBzdGFydE9mTW9udGgoZGF0ZSksXG4gICAgICAgIGVuZDogZW5kT2ZNb250aChkYXRlKSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGlzb0RheSA9IGdldElTT0RheShkYXRlKTtcbiAgICBkYXRlID0gaXNvRGF5IDwgNCA/IGVuZE9mSVNPV2VlayhkYXRlKSA6IHN0YXJ0T2ZJU09XZWVrKGRhdGUpO1xuICAgIGxldCBzdGFydERhdGUgPSBzdGFydE9mTW9udGgoZGF0ZSk7XG4gICAgbGV0IGVuZERhdGUgPSBlbmRPZk1vbnRoKHN0YXJ0RGF0ZSk7XG4gICAgY29uc3Qgc3RhcnRXZWVrRGF5ID0gc3RhcnREYXRlLmdldERheSgpO1xuICAgIGNvbnN0IGVuZFdlZWtEYXkgPSBlbmREYXRlLmdldERheSgpO1xuICAgIGlmIChzdGFydFdlZWtEYXkgPT0gMCB8fCBzdGFydFdlZWtEYXkgPiA0KSB7XG4gICAgICBzdGFydERhdGUgPSBhZGRXZWVrcyhzdGFydERhdGUsIDEpO1xuICAgIH1cbiAgICBpZiAoZW5kV2Vla0RheSA+IDAgJiYgZW5kV2Vla0RheSA8IDQpIHtcbiAgICAgIGVuZERhdGUgPSBzdWJXZWVrcyhlbmREYXRlLCAxKTtcbiAgICB9XG4gICAgc3RhcnREYXRlID0gc3RhcnRPZklTT1dlZWsoc3RhcnREYXRlKTtcbiAgICBlbmREYXRlID0gZW5kT2ZJU09XZWVrKGVuZERhdGUpO1xuICAgIHJldHVybiB7c3RhcnQ6IHN0YXJ0RGF0ZSwgZW5kOiBlbmREYXRlfTtcbiAgfVxuXG4gIGdldEVudHJ5UmFuZ2UoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiB7c3RhcnQ6IERhdGUsIGVuZDogRGF0ZX0ge1xuICAgIGlmIChlbnRyeS50eXBlID09PSAnZGF5Jykge1xuICAgICAgcmV0dXJuIHtzdGFydDogbmV3IERhdGUoZW50cnkuZGF0ZSksIGVuZDogbmV3IERhdGUoZW50cnkuZGF0ZSl9O1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgY3VyRGF0ZTogRGF0ZSA9IG5ldyBEYXRlKGVudHJ5LmRhdGUpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQ6IGVudHJ5LnR5cGUgPT09ICdtb250aCcgPyBzdGFydE9mTW9udGgoY3VyRGF0ZSkgOiBzdGFydE9mWWVhcihjdXJEYXRlKSxcbiAgICAgICAgZW5kOiBlbnRyeS50eXBlID09PSAnbW9udGgnID8gZW5kT2ZNb250aChjdXJEYXRlKSA6IGVuZE9mWWVhcihjdXJEYXRlKVxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBpc0VudHJ5U2VsZWN0ZWQoZW50cnk6IEFqZkNhbGVuZGFyRW50cnksIHNlbGVjdGlvbjogQWpmQ2FsZW5kYXJQZXJpb2R8bnVsbCk6XG4gICAgICBBamZDYWxlbmRhckVudHJ5U2VsZWN0ZWRTdGF0ZSB7XG4gICAgaWYgKHNlbGVjdGlvbiAhPSBudWxsICYmIHNlbGVjdGlvbi5zdGFydERhdGUgIT0gbnVsbCAmJiBzZWxlY3Rpb24uZW5kRGF0ZSAhPSBudWxsKSB7XG4gICAgICBsZXQgc2VsZWN0aW9uU3RhcnQ6IERhdGUgPSBzdGFydE9mRGF5KHNlbGVjdGlvbi5zdGFydERhdGUpO1xuICAgICAgbGV0IHNlbGVjdGlvbkVuZDogRGF0ZSA9IGVuZE9mRGF5KHNlbGVjdGlvbi5lbmREYXRlKTtcbiAgICAgIGxldCBzZWxlY3Rpb25QZXJpb2RPcmRlcjogbnVtYmVyID0gcGVyaW9kT3JkZXIoc2VsZWN0aW9uLnR5cGUpO1xuXG4gICAgICBsZXQgZW50cnlQZXJpb2RPcmRlcjogbnVtYmVyID0gcGVyaW9kT3JkZXIoZW50cnkudHlwZSk7XG4gICAgICBsZXQgZW50cnlSYW5nZToge3N0YXJ0OiBEYXRlLCBlbmQ6IERhdGV9ID0gdGhpcy5nZXRFbnRyeVJhbmdlKGVudHJ5KTtcblxuICAgICAgaWYgKGVudHJ5UGVyaW9kT3JkZXIgPD0gc2VsZWN0aW9uUGVyaW9kT3JkZXIgJiZcbiAgICAgICAgICBpc0JldHdlZW4oZW50cnlSYW5nZS5zdGFydCwgc2VsZWN0aW9uU3RhcnQsIHNlbGVjdGlvbkVuZCkgJiZcbiAgICAgICAgICBpc0JldHdlZW4oZW50cnlSYW5nZS5lbmQsIHNlbGVjdGlvblN0YXJ0LCBzZWxlY3Rpb25FbmQpKSB7XG4gICAgICAgIHJldHVybiAnZnVsbCc7XG4gICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIGVudHJ5UGVyaW9kT3JkZXIgPiBzZWxlY3Rpb25QZXJpb2RPcmRlciAmJlxuICAgICAgICAgIGlzQmV0d2VlbihzZWxlY3Rpb25TdGFydCwgZW50cnlSYW5nZS5zdGFydCwgZW50cnlSYW5nZS5lbmQpICYmXG4gICAgICAgICAgaXNCZXR3ZWVuKHNlbGVjdGlvbkVuZCwgZW50cnlSYW5nZS5zdGFydCwgZW50cnlSYW5nZS5lbmQpKSB7XG4gICAgICAgIHJldHVybiAncGFydGlhbCc7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuICdub25lJztcbiAgfVxuXG4gIGVudHJ5TGFiZWwoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiBzdHJpbmcge1xuICAgIGlmIChlbnRyeS50eXBlID09PSAnZGF5Jykge1xuICAgICAgcmV0dXJuIGAke2VudHJ5LmRhdGUuZ2V0RGF0ZSgpfWA7XG4gICAgfVxuICAgIGlmIChlbnRyeS50eXBlID09PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm4gZm9ybWF0KGVudHJ5LmRhdGUsICdNTU0nKTtcbiAgICB9XG4gICAgcmV0dXJuIGAke2VudHJ5LmRhdGUuZ2V0RnVsbFllYXIoKX1gO1xuICB9XG5cbiAgbmV4dFZpZXcodmlld0RhdGU6IERhdGUsIHZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlKTogRGF0ZSB7XG4gICAgaWYgKHZpZXdNb2RlID09ICdtb250aCcpIHtcbiAgICAgIHJldHVybiBhZGRNb250aHModmlld0RhdGUsIDEpO1xuICAgIH0gZWxzZSBpZiAodmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICByZXR1cm4gYWRkWWVhcnModmlld0RhdGUsIDEpO1xuICAgIH0gZWxzZSBpZiAodmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHJldHVybiBhZGRZZWFycyh2aWV3RGF0ZSwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdmlld0RhdGU7XG4gIH1cblxuICBwcmV2aW91c1ZpZXcodmlld0RhdGU6IERhdGUsIHZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlKTogRGF0ZSB7XG4gICAgaWYgKHZpZXdNb2RlID09ICdtb250aCcpIHtcbiAgICAgIHJldHVybiBzdWJNb250aHModmlld0RhdGUsIDEpO1xuICAgIH0gZWxzZSBpZiAodmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICByZXR1cm4gc3ViWWVhcnModmlld0RhdGUsIDEpO1xuICAgIH0gZWxzZSBpZiAodmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHJldHVybiBzdWJZZWFycyh2aWV3RGF0ZSwgMTApO1xuICAgIH1cbiAgICByZXR1cm4gdmlld0RhdGU7XG4gIH1cblxuICBwcml2YXRlIF9tb250aEhlYWRlclJvdyhwYXJhbXM6IEFqZkNhbGVuZGFyUGFyYW1zKTogc3RyaW5nW10ge1xuICAgIGNvbnN0IHtpc29Nb2RlLCB2aWV3RGF0ZX0gPSBwYXJhbXM7XG4gICAgbGV0IGN1ckRhdGU6IERhdGU7XG4gICAgaWYgKGlzb01vZGUpIHtcbiAgICAgIGN1ckRhdGUgPSBzZXRJU09EYXkoc3RhcnRPZldlZWsodmlld0RhdGUpLCAxKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY3VyRGF0ZSA9IHN0YXJ0T2ZXZWVrKHZpZXdEYXRlKTtcbiAgICB9XG4gICAgbGV0IHdlZWtEYXlOYW1lczogc3RyaW5nW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgd2Vla0RheU5hbWVzLnB1c2goZm9ybWF0KGN1ckRhdGUsICdFRUUnKSk7XG4gICAgICBjdXJEYXRlID0gYWRkRGF5cyhjdXJEYXRlLCAxKTtcbiAgICB9XG4gICAgcmV0dXJuIHdlZWtEYXlOYW1lcztcbiAgfVxuXG4gIHByaXZhdGUgX2RlY2FkZUNhbGVuZGFyUm93cyhwYXJhbXM6IEFqZkNhbGVuZGFyUGFyYW1zKTogQWpmQ2FsZW5kYXJFbnRyeVtdW10ge1xuICAgIGNvbnN0IHt2aWV3RGF0ZSwgc2VsZWN0aW9ufSA9IHBhcmFtcztcbiAgICBsZXQgY3VyWWVhcjogbnVtYmVyID0gdmlld0RhdGUuZ2V0RnVsbFllYXIoKTtcbiAgICBsZXQgZmlyc3RZZWFyID0gY3VyWWVhciAtIChjdXJZZWFyICUgMTApICsgMTtcbiAgICBsZXQgY3VyRGF0ZTogRGF0ZSA9IHN0YXJ0T2ZZZWFyKHZpZXdEYXRlKTtcbiAgICBjdXJEYXRlLnNldEZ1bGxZZWFyKGZpcnN0WWVhcik7XG5cbiAgICBsZXQgcm93czogQWpmQ2FsZW5kYXJFbnRyeVtdW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgbGV0IHJvdzogQWpmQ2FsZW5kYXJFbnRyeVtdID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGN1ckRhdGUpO1xuICAgICAgICBsZXQgbmV3RW50cnk6IEFqZkNhbGVuZGFyRW50cnkgPSB7dHlwZTogJ3llYXInLCBkYXRlOiBkYXRlLCBzZWxlY3RlZDogJ25vbmUnfTtcbiAgICAgICAgbmV3RW50cnkuc2VsZWN0ZWQgPSB0aGlzLmlzRW50cnlTZWxlY3RlZChuZXdFbnRyeSwgc2VsZWN0aW9uKTtcbiAgICAgICAgcm93LnB1c2gobmV3RW50cnkpO1xuICAgICAgICBjdXJEYXRlID0gYWRkWWVhcnMoY3VyRGF0ZSwgMSk7XG4gICAgICB9XG4gICAgICByb3dzLnB1c2gocm93KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcm93cztcbiAgfVxuXG4gIHByaXZhdGUgX3llYXJDYWxlbmRhclJvd3MocGFyYW1zOiBBamZDYWxlbmRhclBhcmFtcyk6IEFqZkNhbGVuZGFyRW50cnlbXVtdIHtcbiAgICBjb25zdCB7dmlld0RhdGUsIHNlbGVjdGlvbn0gPSBwYXJhbXM7XG4gICAgbGV0IGN1ckRhdGU6IERhdGUgPSBzdGFydE9mWWVhcih2aWV3RGF0ZSk7XG5cbiAgICBsZXQgcm93czogQWpmQ2FsZW5kYXJFbnRyeVtdW10gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQ7IGkrKykge1xuICAgICAgbGV0IHJvdzogQWpmQ2FsZW5kYXJFbnRyeVtdID0gW107XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IDM7IGorKykge1xuICAgICAgICBsZXQgZGF0ZSA9IG5ldyBEYXRlKGN1ckRhdGUpO1xuICAgICAgICBsZXQgbmV3RW50cnk6IEFqZkNhbGVuZGFyRW50cnkgPSB7dHlwZTogJ21vbnRoJywgZGF0ZTogZGF0ZSwgc2VsZWN0ZWQ6ICdub25lJ307XG4gICAgICAgIG5ld0VudHJ5LnNlbGVjdGVkID0gdGhpcy5pc0VudHJ5U2VsZWN0ZWQobmV3RW50cnksIHNlbGVjdGlvbik7XG4gICAgICAgIHJvdy5wdXNoKG5ld0VudHJ5KTtcbiAgICAgICAgY3VyRGF0ZSA9IGFkZE1vbnRocyhjdXJEYXRlLCAxKTtcbiAgICAgIH1cbiAgICAgIHJvd3MucHVzaChyb3cpO1xuICAgIH1cblxuICAgIHJldHVybiByb3dzO1xuICB9XG5cbiAgcHJpdmF0ZSBfbW9udGhDYWxlbmRhclJvd3MocGFyYW1zOiBBamZDYWxlbmRhclBhcmFtcyk6IEFqZkNhbGVuZGFyRW50cnlbXVtdIHtcbiAgICBjb25zdCB7dmlld0RhdGUsIHNlbGVjdGlvbiwgaXNvTW9kZSwgbWluRGF0ZSwgbWF4RGF0ZX0gPSBwYXJhbXM7XG4gICAgY29uc3QgbW9udGhCb3VuZHMgPSB0aGlzLm1vbnRoQm91bmRzKHZpZXdEYXRlLCBpc29Nb2RlKTtcbiAgICBsZXQgdmlld1N0YXJ0RGF0ZTogRGF0ZSA9IG5ldyBEYXRlKG1vbnRoQm91bmRzLnN0YXJ0KTtcbiAgICBsZXQgdmlld0VuZERhdGU6IERhdGUgPSBuZXcgRGF0ZShtb250aEJvdW5kcy5lbmQpO1xuICAgIGlmICghaXNvTW9kZSkge1xuICAgICAgdmlld1N0YXJ0RGF0ZSA9IHN0YXJ0T2ZXZWVrKHZpZXdTdGFydERhdGUpO1xuICAgICAgdmlld0VuZERhdGUgPSBlbmRPZldlZWsodmlld0VuZERhdGUpO1xuICAgIH1cblxuICAgIGxldCByb3dzOiBBamZDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICAgIGxldCB0b2RheURhdGUgPSBuZXcgRGF0ZSgpO1xuICAgIGxldCBjdXJEYXRlID0gbmV3IERhdGUodmlld1N0YXJ0RGF0ZSk7XG4gICAgd2hpbGUgKGN1ckRhdGUgPCB2aWV3RW5kRGF0ZSkge1xuICAgICAgbGV0IHJvdzogQWpmQ2FsZW5kYXJFbnRyeVtdID0gW107XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDc7IGkrKykge1xuICAgICAgICBsZXQgZGlzYWJsZWQgPSAobWluRGF0ZSAhPSBudWxsICYmIGlzQmVmb3JlKGN1ckRhdGUsIG1pbkRhdGUpKSB8fFxuICAgICAgICAgICAgKG1heERhdGUgIT0gbnVsbCAmJiBpc0FmdGVyKGN1ckRhdGUsIG1heERhdGUpKTtcbiAgICAgICAgbGV0IGRhdGUgPSBuZXcgRGF0ZShjdXJEYXRlKTtcbiAgICAgICAgbGV0IG5ld0VudHJ5OiBBamZDYWxlbmRhckVudHJ5ID0ge1xuICAgICAgICAgIHR5cGU6ICdkYXknLFxuICAgICAgICAgIGRhdGU6IGRhdGUsXG4gICAgICAgICAgc2VsZWN0ZWQ6ICdub25lJyxcbiAgICAgICAgICBoaWdobGlnaHQ6IGZvcm1hdCh0b2RheURhdGUsICd5eXl5LU1NLWRkJykgPT09IGZvcm1hdChjdXJEYXRlLCAneXl5eS1NTS1kZCcpLFxuICAgICAgICAgIGRpc2FibGVkOiBkaXNhYmxlZFxuICAgICAgICB9O1xuICAgICAgICBuZXdFbnRyeS5zZWxlY3RlZCA9IHRoaXMuaXNFbnRyeVNlbGVjdGVkKG5ld0VudHJ5LCBzZWxlY3Rpb24pO1xuICAgICAgICByb3cucHVzaChuZXdFbnRyeSk7XG4gICAgICAgIGN1ckRhdGUgPSBhZGREYXlzKGN1ckRhdGUsIDEpO1xuICAgICAgfVxuICAgICAgcm93cy5wdXNoKHJvdyk7XG4gICAgfVxuICAgIHJldHVybiByb3dzO1xuICB9XG59XG4iXX0=