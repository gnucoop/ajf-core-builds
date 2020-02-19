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
import { __values } from "tslib";
import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { endOfISOWeek, endOfWeek, endOfYear, parseISO as parse, startOfISOWeek, startOfWeek, startOfYear } from 'date-fns';
import { Observable } from 'rxjs';
import { AjfCalendarService } from './calendar-service';
var weekDays = [
    '', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
];
var AjfCalendarChange = /** @class */ (function () {
    function AjfCalendarChange() {
    }
    return AjfCalendarChange;
}());
export { AjfCalendarChange };
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
        get: function () { return this._viewDate; },
        set: function (viewDate) {
            this._setViewDate(viewDate);
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "disabled", {
        get: function () { return this._disabled; },
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
        get: function () { return this._disabled; },
        set: function (dateOnlyForDay) {
            this._dateOnlyForDay = dateOnlyForDay != null && "" + dateOnlyForDay !== 'false';
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "viewMode", {
        get: function () { return this._viewMode; },
        set: function (viewMode) {
            this._viewMode = viewMode;
            this._buildCalendar();
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "selectionMode", {
        get: function () { return this._selectionMode; },
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
        get: function () { return this._isoMode; },
        set: function (isoMode) {
            this._isoMode = isoMode;
            this._buildCalendar();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "minDate", {
        get: function () { return this._minDate; },
        set: function (minDate) {
            this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
            this._cdr.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "maxDate", {
        get: function () { return this._maxDate; },
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
        get: function () {
            if (this._dateOnlyForDay && this.selectionMode === 'day') {
                return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
            }
            return this._selectedPeriod;
        },
        set: function (period) {
            if (this._dateOnlyForDay && this.selectionMode === 'day' && period instanceof Date
                && (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
                this.selectedPeriod = {
                    type: 'day',
                    startDate: period,
                    endDate: period
                };
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
        get: function () { return this._calendarHeaders; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "calendarRows", {
        get: function () { return this._calendarRows; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfCalendar.prototype, "viewHeader", {
        get: function () { return this._viewHeader; },
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
            value = parse(value);
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
export { AjfCalendar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jYWxlbmRhci9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFtQixpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDakUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLElBQUksS0FBSyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQ3hGLFdBQVcsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBS2hDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBSXRELElBQU0sUUFBUSxHQUFhO0lBQ3pCLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRO0NBQ2pGLENBQUM7QUFFRjtJQUFBO0lBR0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7O0FBRUQ7SUEwSEUscUJBQW9CLElBQXVCLEVBQVUsUUFBNEI7UUFBN0QsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQWxIekUsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVVsQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQU94QixjQUFTLEdBQXdCLE9BQU8sQ0FBQztRQVF6QyxtQkFBYyxHQUEwQixLQUFLLENBQUM7UUFPOUMsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFhcEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQXNCMUIsWUFBTyxHQUFvQyxJQUFJLFlBQVksRUFBcUIsQ0FBQztRQUN0RSxXQUFNLEdBQWtDLElBQUksQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLENBQUM7UUF3Qy9FLGNBQVMsR0FBUyxJQUFJLElBQUksRUFBRSxDQUFDO1FBQzdCLGdCQUFXLEdBQUcsRUFBRSxDQUFDO1FBRWpCLGtCQUFhLEdBQXlCLEVBQUUsQ0FBQztRQUN6QyxxQkFBZ0IsR0FBYSxFQUFFLENBQUM7UUE0RmhDLHNCQUFpQixHQUFxQixVQUFDLENBQU0sSUFBTyxDQUFDLENBQUM7UUFDdEQsdUJBQWtCLEdBQWUsY0FBUSxDQUFDLENBQUM7SUEzRmtDLENBQUM7SUF4SHRGLHNCQUFJLGlDQUFRO2FBQVosY0FBdUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUMvQyxVQUFzQixRQUFjO1lBQ2xDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDNUIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FKOEM7SUFPL0Msc0JBQUksaUNBQVE7YUFBWixjQUEwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ2xELFVBQXNCLFFBQWlCO1lBQ3JDLElBQU0sV0FBVyxHQUFHLFFBQVEsSUFBSSxJQUFJLElBQUksS0FBRyxRQUFVLEtBQUssT0FBTyxDQUFDO1lBQ2xFLElBQUksV0FBVyxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUU7Z0JBQ2xDLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUFDO2dCQUM3QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO2FBQzFCO1FBQ0gsQ0FBQzs7O09BUGlEO0lBVWxELHNCQUFJLHVDQUFjO2FBQWxCLGNBQWdDLE9BQU8sSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUM7YUFDeEQsVUFBNEIsY0FBdUI7WUFDakQsSUFBSSxDQUFDLGVBQWUsR0FBRyxjQUFjLElBQUksSUFBSSxJQUFJLEtBQUcsY0FBZ0IsS0FBSyxPQUFPLENBQUM7WUFDakYsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FKdUQ7SUFPeEQsc0JBQUksaUNBQVE7YUFBWixjQUFzQyxPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQzlELFVBQXNCLFFBQTZCO1lBQ2pELElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1lBQzFCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRSxDQUFDO1FBQzNCLENBQUM7OztPQUw2RDtJQVE5RCxzQkFBSSxzQ0FBYTthQUFqQixjQUE2QyxPQUFPLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDO2FBQzFFLFVBQTJCLGFBQW9DO1lBQzdELElBQUksQ0FBQyxjQUFjLEdBQUcsYUFBYSxDQUFDO1lBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BSnlFO0lBTzFFLHNCQUFJLHVDQUFjO2FBQWxCO1lBQ0UsT0FBMkIsUUFBUSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztRQUM1RCxDQUFDO2FBQ0QsVUFBNEIsT0FBMkI7WUFDckQsSUFBSSxDQUFDLGVBQWUsR0FBRyxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBRWpELElBQUksSUFBSSxDQUFDLFNBQVMsS0FBSyxPQUFPLEVBQUU7Z0JBQzlCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQzthQUN2QjtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BUkE7SUFZRCxzQkFBSSxnQ0FBTzthQUFYLGNBQXlCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDaEQsVUFBcUIsT0FBZ0I7WUFDbkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLENBQUM7WUFDeEIsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3hCLENBQUM7OztPQUorQztJQU9oRCxzQkFBSSxnQ0FBTzthQUFYLGNBQTZCLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7YUFDcEQsVUFBcUIsT0FBb0I7WUFDdkMsSUFBSSxDQUFDLFFBQVEsR0FBRyxPQUFPLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO1lBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BSm1EO0lBT3BELHNCQUFJLGdDQUFPO2FBQVgsY0FBNkIsT0FBTyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQzthQUNwRCxVQUFxQixPQUFvQjtZQUN2QyxJQUFJLENBQUMsUUFBUSxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7WUFDckUsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FKbUQ7SUFVcEQsc0JBQWEsdUNBQWM7YUFBM0IsVUFBNEIsTUFBZ0M7WUFDMUQsSUFBSSxDQUFDLGVBQWUsR0FBRyxNQUFNLENBQUM7WUFDOUIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUM7Z0JBQ2hCLE1BQU0sRUFBRSxJQUFJO2dCQUNaLE1BQU0sRUFBRSxNQUFNO2FBQ2YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLGlCQUFpQixFQUFFLENBQUM7WUFDekIsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUMzQixDQUFDOzs7T0FBQTtJQUVELHNCQUFJLDhCQUFLO2FBQVQ7WUFDRSxJQUFJLElBQUksQ0FBQyxlQUFlLElBQUksSUFBSSxDQUFDLGFBQWEsS0FBSyxLQUFLLEVBQUU7Z0JBQ3hELE9BQU8sSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7YUFDN0U7WUFDRCxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDOUIsQ0FBQzthQUNELFVBQW1CLE1BQXVDO1lBQ3hELElBQ0UsSUFBSSxDQUFDLGVBQWUsSUFBSSxJQUFJLENBQUMsYUFBYSxLQUFLLEtBQUssSUFBSSxNQUFNLFlBQVksSUFBSTttQkFDM0UsQ0FBQyxJQUFJLENBQUMsZUFBZSxJQUFJLElBQUksSUFBSSxNQUFNLEtBQUssSUFBSSxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsRUFDOUU7Z0JBQ0EsSUFBSSxDQUFDLGNBQWMsR0FBRztvQkFDcEIsSUFBSSxFQUFFLEtBQUs7b0JBQ1gsU0FBUyxFQUFFLE1BQU07b0JBQ2pCLE9BQU8sRUFBRSxNQUFNO2lCQUNoQixDQUFDO2FBQ0g7aUJBQU0sSUFBSSxNQUFNLFlBQVksTUFBTSxJQUFJLE1BQU0sS0FBSyxJQUFJLENBQUMsZUFBZSxFQUFFO2dCQUN0RSxJQUFJLENBQUMsY0FBYyxHQUFzQixNQUFNLENBQUM7Z0JBQ2hELElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsQ0FBQzthQUNoQztZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDM0IsQ0FBQzs7O09BaEJBO0lBa0JELHNCQUFJLHdDQUFlO2FBQW5CLGNBQWtDLE9BQU8sSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDakUsc0JBQUkscUNBQVk7YUFBaEIsY0FBMkMsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDdkUsc0JBQUksbUNBQVU7YUFBZCxjQUEyQixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDOzs7T0FBQTtJQVVyRCw4QkFBUSxHQUFSO1FBQ0UsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELDhCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3ZFLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsc0NBQWdCLEdBQWhCO1FBQ0UsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVEsRUFBRTtZQUM5QixPQUFPO1NBQ1I7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksTUFBTSxFQUFFO1lBQ25DLElBQUksQ0FBQyxTQUFTLEdBQUcsUUFBUSxDQUFDO1NBQzNCO2FBQU0sSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLE9BQU8sRUFBRTtZQUNwQyxJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztTQUN6QjtRQUNELElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsaUNBQVcsR0FBWCxVQUFZLEtBQXVCO1FBQ2pDLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2hDLE9BQU8sSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNsQztRQUVELElBQUksU0FBUyxHQUE2QixJQUFJLENBQUM7UUFDL0MsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLEVBQUUsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLE1BQU0sRUFBRTtZQUN4RSxTQUFTLEdBQUcsSUFBSSxDQUFDO1NBQ2xCO2FBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLEtBQUssRUFBRTtZQUN2QyxTQUFTLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLEtBQUs7Z0JBQ1gsU0FBUyxFQUFFLEtBQUssQ0FBQyxJQUFJO2dCQUNyQixPQUFPLEVBQUUsS0FBSyxDQUFDLElBQUk7YUFDcEIsQ0FBQztTQUNIO2FBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLE1BQU0sRUFBRTtZQUN4QyxTQUFTLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osU0FBUyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDeEIsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO29CQUM1QixXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxFQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsZUFBZ0MsRUFBQyxDQUFDO2dCQUNoRixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN0QixZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7b0JBQzFCLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLEVBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxlQUFnQyxFQUFDLENBQUM7YUFDL0UsQ0FBQztTQUNIO2FBQU0sSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLE9BQU8sRUFBRTtZQUN6QyxJQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztZQUN6RSxTQUFTLEdBQUc7Z0JBQ1YsSUFBSSxFQUFFLE9BQU87Z0JBQ2IsU0FBUyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUM7Z0JBQ3RDLE9BQU8sRUFBRSxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDO2FBQ25DLENBQUM7U0FDSDthQUFNLElBQUksSUFBSSxDQUFDLGNBQWMsSUFBSSxNQUFNLEVBQUU7WUFDeEMsU0FBUyxHQUFHO2dCQUNWLElBQUksRUFBRSxNQUFNO2dCQUNaLFNBQVMsRUFBRSxXQUFXLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQztnQkFDbEMsT0FBTyxFQUFFLFNBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDO2FBQy9CLENBQUM7U0FDSDtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsU0FBUyxDQUFDO1FBRXZCLElBQUksQ0FBQyxrQkFBa0IsRUFBRSxDQUFDO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVELHNDQUFnQixHQUFoQixVQUFpQixFQUF3QjtRQUN2QyxJQUFJLENBQUMsaUJBQWlCLEdBQUcsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCx1Q0FBaUIsR0FBakIsVUFBa0IsRUFBTztRQUN2QixJQUFJLENBQUMsa0JBQWtCLEdBQUcsRUFBRSxDQUFDO0lBQy9CLENBQUM7SUFFRCxnQ0FBVSxHQUFWLFVBQVcsS0FBVTtRQUNuQixJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTtZQUM3QixLQUFLLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDO1NBQ3RCO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztJQUVELDhCQUFRLEdBQVI7UUFDRSxJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQztJQUVELHdDQUFrQixHQUFsQjtRQUNFLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxDQUFDO0lBQzNCLENBQUM7SUFLTyxrQ0FBWSxHQUFwQixVQUFxQixJQUFVO1FBQzdCLElBQUksQ0FBQyxTQUFTLEdBQUcsSUFBSSxDQUFDO0lBQ3hCLENBQUM7SUFFTyxvQ0FBYyxHQUF0QjtRQUNFLElBQU0sWUFBWSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDO1lBQzNDLFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN4QixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDeEIsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlO1lBQy9CLE9BQU8sRUFBRSxJQUFJLENBQUMsUUFBUTtZQUN0QixPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUMvRCxPQUFPLEVBQUUsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQztTQUNoRSxDQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsV0FBVyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUM7UUFDdkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLFlBQVksQ0FBQyxTQUFTLENBQUM7UUFDL0MsSUFBSSxDQUFDLGFBQWEsR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDO1FBQ3ZDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUFFLENBQUM7SUFDM0IsQ0FBQztJQUVPLHVDQUFpQixHQUF6Qjs7O1lBQ0UsS0FBZ0IsSUFBQSxLQUFBLFNBQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQSxnQkFBQSw0QkFBRTtnQkFBL0IsSUFBSSxHQUFHLFdBQUE7O29CQUNWLEtBQWtCLElBQUEsdUJBQUEsU0FBQSxHQUFHLENBQUEsQ0FBQSx3QkFBQSx5Q0FBRTt3QkFBbEIsSUFBSSxLQUFLLGdCQUFBO3dCQUNaLEtBQUssQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxlQUFlLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUMsQ0FBQztxQkFDN0U7Ozs7Ozs7OzthQUNGOzs7Ozs7Ozs7SUFDSCxDQUFDO0lBRU8scUNBQWUsR0FBdkIsVUFBd0IsS0FBdUI7UUFDN0MsSUFBSSxDQUFDLEtBQUssRUFBRSxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLEtBQUssRUFBRTtZQUM1RSxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUMxRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sbUNBQWEsR0FBckIsVUFBc0IsS0FBdUI7UUFDM0MsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztTQUN6QjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxNQUFNLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7U0FDMUI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxFQUFFO1lBQ3BDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Z0JBdFFGLFNBQVM7Ozs7Z0JBdkJnQixpQkFBaUI7Z0JBVW5DLGtCQUFrQjs7OzJCQWdCdkIsS0FBSzsyQkFPTCxLQUFLO2lDQVVMLEtBQUs7MkJBT0wsS0FBSztnQ0FRTCxLQUFLO2lDQVNMLEtBQUs7MEJBWUwsS0FBSzswQkFPTCxLQUFLOzBCQU9MLEtBQUs7eUJBTUwsTUFBTTtpQ0FHTixLQUFLO3dCQWdCTCxLQUFLOztJQXdLUixrQkFBQztDQUFBLEFBdlFELElBdVFDO1NBdFFxQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWZ0ZXJDb250ZW50SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCxcbiAgT25Jbml0LCBPdXRwdXR9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtlbmRPZklTT1dlZWssIGVuZE9mV2VlaywgZW5kT2ZZZWFyLCBwYXJzZUlTTyBhcyBwYXJzZSwgc3RhcnRPZklTT1dlZWssIHN0YXJ0T2ZXZWVrLFxuICBzdGFydE9mWWVhcn0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZDYWxlbmRhckVudHJ5fSBmcm9tICcuL2NhbGVuZGFyLWVudHJ5JztcbmltcG9ydCB7QWpmQ2FsZW5kYXJQZXJpb2RUeXBlfSBmcm9tICcuL2NhbGVuZGFyLXBlcmlvZC10eXBlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJQZXJpb2R9IGZyb20gJy4vY2FsZW5kYXItcGVyaW9kJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuL2NhbGVuZGFyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZDYWxlbmRhclZpZXdNb2RlfSBmcm9tICcuL2NhbGVuZGFyLXZpZXctbW9kZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyV2Vla0RheX0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLWRheSc7XG5cbmNvbnN0IHdlZWtEYXlzOiBzdHJpbmdbXSA9IFtcbiAgJycsICdtb25kYXknLCAndHVlc2RheScsICd3ZWRuZXNkYXknLCAndGh1cnNkYXknLCAnZnJpZGF5JywgJ3NhdHVyZGF5JywgJ3N1bmRheSdcbl07XG5cbmV4cG9ydCBjbGFzcyBBamZDYWxlbmRhckNoYW5nZSB7XG4gIHNvdXJjZTogQWpmQ2FsZW5kYXI7XG4gIHBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2QgfCBudWxsO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZDYWxlbmRhciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBnZXQgdmlld0RhdGUoKTogRGF0ZSB7IHJldHVybiB0aGlzLl92aWV3RGF0ZTsgfVxuICBASW5wdXQoKSBzZXQgdmlld0RhdGUodmlld0RhdGU6IERhdGUpIHtcbiAgICB0aGlzLl9zZXRWaWV3RGF0ZSh2aWV3RGF0ZSk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZGlzYWJsZWQgPSBmYWxzZTtcbiAgZ2V0IGRpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgQElucHV0KCkgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmV3RGlzYWJsZWQgPSBkaXNhYmxlZCAhPSBudWxsICYmIGAke2Rpc2FibGVkfWAgIT09ICdmYWxzZSc7XG4gICAgaWYgKG5ld0Rpc2FibGVkICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdEaXNhYmxlZDtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kYXRlT25seUZvckRheSA9IGZhbHNlO1xuICBnZXQgZGF0ZU9ubHlGb3JEYXkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9kaXNhYmxlZDsgfVxuICBASW5wdXQoKSBzZXQgZGF0ZU9ubHlGb3JEYXkoZGF0ZU9ubHlGb3JEYXk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kYXRlT25seUZvckRheSA9IGRhdGVPbmx5Rm9yRGF5ICE9IG51bGwgJiYgYCR7ZGF0ZU9ubHlGb3JEYXl9YCAhPT0gJ2ZhbHNlJztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF92aWV3TW9kZTogQWpmQ2FsZW5kYXJWaWV3TW9kZSA9ICdtb250aCc7XG4gIGdldCB2aWV3TW9kZSgpOiBBamZDYWxlbmRhclZpZXdNb2RlIHsgcmV0dXJuIHRoaXMuX3ZpZXdNb2RlOyB9XG4gIEBJbnB1dCgpIHNldCB2aWV3TW9kZSh2aWV3TW9kZTogQWpmQ2FsZW5kYXJWaWV3TW9kZSkge1xuICAgIHRoaXMuX3ZpZXdNb2RlID0gdmlld01vZGU7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3NlbGVjdGlvbk1vZGU6IEFqZkNhbGVuZGFyUGVyaW9kVHlwZSA9ICdkYXknO1xuICBnZXQgc2VsZWN0aW9uTW9kZSgpOiBBamZDYWxlbmRhclBlcmlvZFR5cGUgeyByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZTsgfVxuICBASW5wdXQoKSBzZXQgc2VsZWN0aW9uTW9kZShzZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlID0gc2VsZWN0aW9uTW9kZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zdGFydE9mV2Vla0RheSA9IDE7XG4gIGdldCBzdGFydE9mV2Vla0RheSgpOiBBamZDYWxlbmRhcldlZWtEYXkge1xuICAgIHJldHVybiA8QWpmQ2FsZW5kYXJXZWVrRGF5PndlZWtEYXlzW3RoaXMuX3N0YXJ0T2ZXZWVrRGF5XTtcbiAgfVxuICBASW5wdXQoKSBzZXQgc3RhcnRPZldlZWtEYXkod2Vla0RheTogQWpmQ2FsZW5kYXJXZWVrRGF5KSB7XG4gICAgdGhpcy5fc3RhcnRPZldlZWtEYXkgPSB3ZWVrRGF5cy5pbmRleE9mKHdlZWtEYXkpO1xuXG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzb01vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBnZXQgaXNvTW9kZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2lzb01vZGU7IH1cbiAgQElucHV0KCkgc2V0IGlzb01vZGUoaXNvTW9kZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzb01vZGUgPSBpc29Nb2RlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX21pbkRhdGU6IERhdGUgfCBudWxsO1xuICBnZXQgbWluRGF0ZSgpOiBEYXRlIHwgbnVsbCB7IHJldHVybiB0aGlzLl9taW5EYXRlOyB9XG4gIEBJbnB1dCgpIHNldCBtaW5EYXRlKG1pbkRhdGU6IERhdGUgfCBudWxsKSB7XG4gICAgdGhpcy5fbWluRGF0ZSA9IG1pbkRhdGUgIT0gbnVsbCA/IG5ldyBEYXRlKG1pbkRhdGUudmFsdWVPZigpKSA6IG51bGw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWF4RGF0ZTogRGF0ZSB8IG51bGw7XG4gIGdldCBtYXhEYXRlKCk6IERhdGUgfCBudWxsIHsgcmV0dXJuIHRoaXMuX21heERhdGU7IH1cbiAgQElucHV0KCkgc2V0IG1heERhdGUobWF4RGF0ZTogRGF0ZSB8IG51bGwpIHtcbiAgICB0aGlzLl9tYXhEYXRlID0gbWF4RGF0ZSAhPSBudWxsID8gbmV3IERhdGUobWF4RGF0ZS52YWx1ZU9mKCkpIDogbnVsbDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZDYWxlbmRhckNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkNhbGVuZGFyQ2hhbmdlPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNhbGVuZGFyQ2hhbmdlPiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zZWxlY3RlZFBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2QgfCBudWxsO1xuICBASW5wdXQoKSBzZXQgc2VsZWN0ZWRQZXJpb2QocGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZCB8IG51bGwpIHtcbiAgICB0aGlzLl9zZWxlY3RlZFBlcmlvZCA9IHBlcmlvZDtcbiAgICB0aGlzLl9jaGFuZ2UuZW1pdCh7XG4gICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICBwZXJpb2Q6IHBlcmlvZFxuICAgIH0pO1xuICAgIHRoaXMuX3JlZnJlc2hTZWxlY3Rpb24oKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogQWpmQ2FsZW5kYXJQZXJpb2QgfCBEYXRlIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuX2RhdGVPbmx5Rm9yRGF5ICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ2RheScpIHtcbiAgICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFBlcmlvZCAhPSBudWxsID8gdGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlIDogbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUGVyaW9kO1xuICB9XG4gIEBJbnB1dCgpIHNldCB2YWx1ZShwZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgRGF0ZSB8IG51bGwpIHtcbiAgICBpZiAoXG4gICAgICB0aGlzLl9kYXRlT25seUZvckRheSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdkYXknICYmIHBlcmlvZCBpbnN0YW5jZW9mIERhdGVcbiAgICAgICYmICh0aGlzLl9zZWxlY3RlZFBlcmlvZCA9PSBudWxsIHx8IHBlcmlvZCAhPT0gdGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlKVxuICAgICkge1xuICAgICAgdGhpcy5zZWxlY3RlZFBlcmlvZCA9IHtcbiAgICAgICAgdHlwZTogJ2RheScsXG4gICAgICAgIHN0YXJ0RGF0ZTogcGVyaW9kLFxuICAgICAgICBlbmREYXRlOiBwZXJpb2RcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmIChwZXJpb2QgaW5zdGFuY2VvZiBPYmplY3QgJiYgcGVyaW9kICE9PSB0aGlzLl9zZWxlY3RlZFBlcmlvZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFBlcmlvZCA9IDxBamZDYWxlbmRhclBlcmlvZD5wZXJpb2Q7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHBlcmlvZCk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBjYWxlbmRhckhlYWRlcnMoKTogc3RyaW5nW10geyByZXR1cm4gdGhpcy5fY2FsZW5kYXJIZWFkZXJzOyB9XG4gIGdldCBjYWxlbmRhclJvd3MoKTogQWpmQ2FsZW5kYXJFbnRyeVtdW10geyByZXR1cm4gdGhpcy5fY2FsZW5kYXJSb3dzOyB9XG4gIGdldCB2aWV3SGVhZGVyKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLl92aWV3SGVhZGVyOyB9XG5cbiAgcHJpdmF0ZSBfdmlld0RhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICBwcml2YXRlIF92aWV3SGVhZGVyID0gJyc7XG5cbiAgcHJpdmF0ZSBfY2FsZW5kYXJSb3dzOiBBamZDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICBwcml2YXRlIF9jYWxlbmRhckhlYWRlcnM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfc2VydmljZTogQWpmQ2FsZW5kYXJTZXJ2aWNlKSB7IH1cblxuICBwcmV2UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdEYXRlID0gdGhpcy5fc2VydmljZS5wcmV2aW91c1ZpZXcodGhpcy5fdmlld0RhdGUsIHRoaXMuX3ZpZXdNb2RlKTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBuZXh0UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdEYXRlID0gdGhpcy5fc2VydmljZS5uZXh0Vmlldyh0aGlzLl92aWV3RGF0ZSwgdGhpcy5fdmlld01vZGUpO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHByZXZpb3VzVmlld01vZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdkZWNhZGUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ2RlY2FkZSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICd5ZWFyJztcbiAgICB9XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgc2VsZWN0RW50cnkoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2NhblNlbGVjdEVudHJ5KGVudHJ5KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX25leHRWaWV3TW9kZShlbnRyeSk7XG4gICAgfVxuXG4gICAgbGV0IG5ld1BlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2QgfCBudWxsID0gbnVsbDtcbiAgICBpZiAodGhpcy5fc2VydmljZS5pc0VudHJ5U2VsZWN0ZWQoZW50cnksIHRoaXMuX3NlbGVjdGVkUGVyaW9kKSA9PSAnZnVsbCcpIHtcbiAgICAgIG5ld1BlcmlvZCA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICdkYXknKSB7XG4gICAgICBuZXdQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICdkYXknLFxuICAgICAgICBzdGFydERhdGU6IGVudHJ5LmRhdGUsXG4gICAgICAgIGVuZERhdGU6IGVudHJ5LmRhdGVcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICd3ZWVrJykge1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnd2VlaycsXG4gICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5faXNvTW9kZSA/XG4gICAgICAgICAgc3RhcnRPZklTT1dlZWsoZW50cnkuZGF0ZSkgOlxuICAgICAgICAgIHN0YXJ0T2ZXZWVrKGVudHJ5LmRhdGUsIHt3ZWVrU3RhcnRzT246IHRoaXMuX3N0YXJ0T2ZXZWVrRGF5IGFzIDB8MXwyfDN8NHw1fDZ9KSxcbiAgICAgICAgZW5kRGF0ZTogdGhpcy5faXNvTW9kZSA/XG4gICAgICAgICAgZW5kT2ZJU09XZWVrKGVudHJ5LmRhdGUpIDpcbiAgICAgICAgICBlbmRPZldlZWsoZW50cnkuZGF0ZSwge3dlZWtTdGFydHNPbjogdGhpcy5fc3RhcnRPZldlZWtEYXkgYXMgMHwxfDJ8M3w0fDV8Nn0pXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICBjb25zdCBtb250aEJvdW5kcyA9IHRoaXMuX3NlcnZpY2UubW9udGhCb3VuZHMoZW50cnkuZGF0ZSwgdGhpcy5faXNvTW9kZSk7XG4gICAgICBuZXdQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICdtb250aCcsXG4gICAgICAgIHN0YXJ0RGF0ZTogbmV3IERhdGUobW9udGhCb3VuZHMuc3RhcnQpLFxuICAgICAgICBlbmREYXRlOiBuZXcgRGF0ZShtb250aEJvdW5kcy5lbmQpXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAneWVhcicpIHtcbiAgICAgIG5ld1BlcmlvZCA9IHtcbiAgICAgICAgdHlwZTogJ3llYXInLFxuICAgICAgICBzdGFydERhdGU6IHN0YXJ0T2ZZZWFyKGVudHJ5LmRhdGUpLFxuICAgICAgICBlbmREYXRlOiBlbmRPZlllYXIoZW50cnkuZGF0ZSlcbiAgICAgIH07XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSBuZXdQZXJpb2Q7XG5cbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjaygpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46ICh2YWx1ZTogYW55KSA9PiB2b2lkKSB7XG4gICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSkge1xuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrID0gZm47XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSAnc3RyaW5nJykge1xuICAgICAgdmFsdWUgPSBwYXJzZSh2YWx1ZSk7XG4gICAgfVxuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgfVxuXG4gIG5nT25Jbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIG5nQWZ0ZXJDb250ZW50SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZWZyZXNoU2VsZWN0aW9uKCk7XG4gIH1cblxuICBwcml2YXRlIF9vbkNoYW5nZUNhbGxiYWNrOiAoXzogYW55KSA9PiB2b2lkID0gKF86IGFueSkgPT4geyB9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHsgfTtcblxuICBwcml2YXRlIF9zZXRWaWV3RGF0ZShkYXRlOiBEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld0RhdGUgPSBkYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRDYWxlbmRhcigpOiB2b2lkIHtcbiAgICBjb25zdCBjYWxlbmRhclZpZXcgPSB0aGlzLl9zZXJ2aWNlLmJ1aWxkVmlldyh7XG4gICAgICB2aWV3TW9kZTogdGhpcy5fdmlld01vZGUsXG4gICAgICB2aWV3RGF0ZTogdGhpcy5fdmlld0RhdGUsXG4gICAgICBzZWxlY3Rpb246IHRoaXMuX3NlbGVjdGVkUGVyaW9kLFxuICAgICAgaXNvTW9kZTogdGhpcy5faXNvTW9kZSxcbiAgICAgIG1pbkRhdGU6IHRoaXMuX21pbkRhdGUgPT0gbnVsbCA/IG51bGwgOiBuZXcgRGF0ZSh0aGlzLl9taW5EYXRlKSxcbiAgICAgIG1heERhdGU6IHRoaXMuX21heERhdGUgPT0gbnVsbCA/IG51bGwgOiBuZXcgRGF0ZSh0aGlzLl9tYXhEYXRlKSxcbiAgICB9KTtcbiAgICB0aGlzLl92aWV3SGVhZGVyID0gY2FsZW5kYXJWaWV3LmhlYWRlcjtcbiAgICB0aGlzLl9jYWxlbmRhckhlYWRlcnMgPSBjYWxlbmRhclZpZXcuaGVhZGVyUm93O1xuICAgIHRoaXMuX2NhbGVuZGFyUm93cyA9IGNhbGVuZGFyVmlldy5yb3dzO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZnJlc2hTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgcm93IG9mIHRoaXMuX2NhbGVuZGFyUm93cykge1xuICAgICAgZm9yIChsZXQgZW50cnkgb2Ygcm93KSB7XG4gICAgICAgIGVudHJ5LnNlbGVjdGVkID0gdGhpcy5fc2VydmljZS5pc0VudHJ5U2VsZWN0ZWQoZW50cnksIHRoaXMuX3NlbGVjdGVkUGVyaW9kKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jYW5TZWxlY3RFbnRyeShlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmIChbJ2RheScsICd3ZWVrJ10uaW5kZXhPZih0aGlzLl9zZWxlY3Rpb25Nb2RlKSA+PSAwICYmIGVudHJ5LnR5cGUgIT0gJ2RheScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJyAmJiBlbnRyeS50eXBlID09ICd5ZWFyJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRWaWV3TW9kZShlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAneWVhcic7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ21vbnRoJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdtb250aCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdmlld0RhdGUgPSBlbnRyeS5kYXRlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxufVxuIl19