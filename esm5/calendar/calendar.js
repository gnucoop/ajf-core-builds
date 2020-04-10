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
import { __values } from "tslib";
import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { endOfISOWeek, endOfWeek, endOfYear, parseISO as parse, startOfISOWeek, startOfWeek, startOfYear } from 'date-fns';
import { Observable } from 'rxjs';
import { AjfCalendarService } from './calendar-service';
var weekDays = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jYWxlbmRhci9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUVMLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBQ1AsTUFBTSxlQUFlLENBQUM7QUFFdkIsT0FBTyxFQUNMLFlBQVksRUFDWixTQUFTLEVBQ1QsU0FBUyxFQUNULFFBQVEsSUFBSSxLQUFLLEVBQ2pCLGNBQWMsRUFDZCxXQUFXLEVBQ1gsV0FBVyxFQUNaLE1BQU0sVUFBVSxDQUFDO0FBQ2xCLE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFLaEMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFJdEQsSUFBTSxRQUFRLEdBQ1YsQ0FBQyxFQUFFLEVBQUUsUUFBUSxFQUFFLFNBQVMsRUFBRSxXQUFXLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxVQUFVLEVBQUUsUUFBUSxDQUFDLENBQUM7QUFFdkY7SUFBQTtJQUdBLENBQUM7SUFBRCx3QkFBQztBQUFELENBQUMsQUFIRCxJQUdDOztBQUVEO0lBa0pFLHFCQUFvQixJQUF1QixFQUFVLFFBQTRCO1FBQTdELFNBQUksR0FBSixJQUFJLENBQW1CO1FBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7UUF2SXpFLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFhbEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7UUFVeEIsY0FBUyxHQUF3QixPQUFPLENBQUM7UUFXekMsbUJBQWMsR0FBMEIsS0FBSyxDQUFDO1FBVTlDLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1FBY3BCLGFBQVEsR0FBWSxLQUFLLENBQUM7UUErQjFCLFlBQU8sR0FBb0MsSUFBSSxZQUFZ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QUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUMxRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sbUNBQWEsR0FBckIsVUFBc0IsS0FBdUI7UUFDM0MsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztTQUN6QjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxNQUFNLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7U0FDMUI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxFQUFFO1lBQ3BDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Z0JBMVJGLFNBQVM7Ozs7Z0JBbENSLGlCQUFpQjtnQkFzQlgsa0JBQWtCOzs7MkJBaUJ2QixLQUFLOzJCQVVMLEtBQUs7aUNBYUwsS0FBSzsyQkFVTCxLQUFLO2dDQVdMLEtBQUs7aUNBVUwsS0FBSzswQkFlTCxLQUFLOzBCQVVMLEtBQUs7MEJBVUwsS0FBSzt5QkFPTCxNQUFNO2lDQUdOLEtBQUs7d0JBY0wsS0FBSzs7SUFxS1Isa0JBQUM7Q0FBQSxBQTNSRCxJQTJSQztTQTFScUIsV0FBVyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWZ0ZXJDb250ZW50SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPdXRwdXRcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge1xuICBlbmRPZklTT1dlZWssXG4gIGVuZE9mV2VlayxcbiAgZW5kT2ZZZWFyLFxuICBwYXJzZUlTTyBhcyBwYXJzZSxcbiAgc3RhcnRPZklTT1dlZWssXG4gIHN0YXJ0T2ZXZWVrLFxuICBzdGFydE9mWWVhclxufSBmcm9tICdkYXRlLWZucyc7XG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge0FqZkNhbGVuZGFyRW50cnl9IGZyb20gJy4vY2FsZW5kYXItZW50cnknO1xuaW1wb3J0IHtBamZDYWxlbmRhclBlcmlvZH0gZnJvbSAnLi9jYWxlbmRhci1wZXJpb2QnO1xuaW1wb3J0IHtBamZDYWxlbmRhclBlcmlvZFR5cGV9IGZyb20gJy4vY2FsZW5kYXItcGVyaW9kLXR5cGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhclNlcnZpY2V9IGZyb20gJy4vY2FsZW5kYXItc2VydmljZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyVmlld01vZGV9IGZyb20gJy4vY2FsZW5kYXItdmlldy1tb2RlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJXZWVrRGF5fSBmcm9tICcuL2NhbGVuZGFyLXdlZWstZGF5JztcblxuY29uc3Qgd2Vla0RheXM6IHN0cmluZ1tdID1cbiAgICBbJycsICdtb25kYXknLCAndHVlc2RheScsICd3ZWRuZXNkYXknLCAndGh1cnNkYXknLCAnZnJpZGF5JywgJ3NhdHVyZGF5JywgJ3N1bmRheSddO1xuXG5leHBvcnQgY2xhc3MgQWpmQ2FsZW5kYXJDaGFuZ2Uge1xuICBzb3VyY2U6IEFqZkNhbGVuZGFyO1xuICBwZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kfG51bGw7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkNhbGVuZGFyIGltcGxlbWVudHMgQWZ0ZXJDb250ZW50SW5pdCwgQ29udHJvbFZhbHVlQWNjZXNzb3IsIE9uSW5pdCB7XG4gIGdldCB2aWV3RGF0ZSgpOiBEYXRlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld0RhdGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZpZXdEYXRlKHZpZXdEYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5fc2V0Vmlld0RhdGUodmlld0RhdGUpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGRpc2FibGVkKGRpc2FibGVkOiBib29sZWFuKSB7XG4gICAgY29uc3QgbmV3RGlzYWJsZWQgPSBkaXNhYmxlZCAhPSBudWxsICYmIGAke2Rpc2FibGVkfWAgIT09ICdmYWxzZSc7XG4gICAgaWYgKG5ld0Rpc2FibGVkICE9PSB0aGlzLl9kaXNhYmxlZCkge1xuICAgICAgdGhpcy5fZGlzYWJsZWQgPSBuZXdEaXNhYmxlZDtcbiAgICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9kYXRlT25seUZvckRheSA9IGZhbHNlO1xuICBnZXQgZGF0ZU9ubHlGb3JEYXkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkYXRlT25seUZvckRheShkYXRlT25seUZvckRheTogYm9vbGVhbikge1xuICAgIHRoaXMuX2RhdGVPbmx5Rm9yRGF5ID0gZGF0ZU9ubHlGb3JEYXkgIT0gbnVsbCAmJiBgJHtkYXRlT25seUZvckRheX1gICE9PSAnZmFsc2UnO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlID0gJ21vbnRoJztcbiAgZ2V0IHZpZXdNb2RlKCk6IEFqZkNhbGVuZGFyVmlld01vZGUge1xuICAgIHJldHVybiB0aGlzLl92aWV3TW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmlld01vZGUodmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUgPSAnZGF5JztcbiAgZ2V0IHNlbGVjdGlvbk1vZGUoKTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlIHtcbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0aW9uTW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc2VsZWN0aW9uTW9kZShzZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUpIHtcbiAgICB0aGlzLl9zZWxlY3Rpb25Nb2RlID0gc2VsZWN0aW9uTW9kZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zdGFydE9mV2Vla0RheSA9IDE7XG4gIGdldCBzdGFydE9mV2Vla0RheSgpOiBBamZDYWxlbmRhcldlZWtEYXkge1xuICAgIHJldHVybiA8QWpmQ2FsZW5kYXJXZWVrRGF5PndlZWtEYXlzW3RoaXMuX3N0YXJ0T2ZXZWVrRGF5XTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc3RhcnRPZldlZWtEYXkod2Vla0RheTogQWpmQ2FsZW5kYXJXZWVrRGF5KSB7XG4gICAgdGhpcy5fc3RhcnRPZldlZWtEYXkgPSB3ZWVrRGF5cy5pbmRleE9mKHdlZWtEYXkpO1xuXG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2lzb01vZGU6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBnZXQgaXNvTW9kZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faXNvTW9kZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaXNvTW9kZShpc29Nb2RlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faXNvTW9kZSA9IGlzb01vZGU7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfbWluRGF0ZTogRGF0ZXxudWxsO1xuICBnZXQgbWluRGF0ZSgpOiBEYXRlfG51bGwge1xuICAgIHJldHVybiB0aGlzLl9taW5EYXRlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBtaW5EYXRlKG1pbkRhdGU6IERhdGV8bnVsbCkge1xuICAgIHRoaXMuX21pbkRhdGUgPSBtaW5EYXRlICE9IG51bGwgPyBuZXcgRGF0ZShtaW5EYXRlLnZhbHVlT2YoKSkgOiBudWxsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX21heERhdGU6IERhdGV8bnVsbDtcbiAgZ2V0IG1heERhdGUoKTogRGF0ZXxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWF4RGF0ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbWF4RGF0ZShtYXhEYXRlOiBEYXRlfG51bGwpIHtcbiAgICB0aGlzLl9tYXhEYXRlID0gbWF4RGF0ZSAhPSBudWxsID8gbmV3IERhdGUobWF4RGF0ZS52YWx1ZU9mKCkpIDogbnVsbDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9jaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZDYWxlbmRhckNoYW5nZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkNhbGVuZGFyQ2hhbmdlPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgY2hhbmdlOiBPYnNlcnZhYmxlPEFqZkNhbGVuZGFyQ2hhbmdlPiA9IHRoaXMuX2NoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zZWxlY3RlZFBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2R8bnVsbDtcbiAgQElucHV0KClcbiAgc2V0IHNlbGVjdGVkUGVyaW9kKHBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2R8bnVsbCkge1xuICAgIHRoaXMuX3NlbGVjdGVkUGVyaW9kID0gcGVyaW9kO1xuICAgIHRoaXMuX2NoYW5nZS5lbWl0KHtzb3VyY2U6IHRoaXMsIHBlcmlvZDogcGVyaW9kfSk7XG4gICAgdGhpcy5fcmVmcmVzaFNlbGVjdGlvbigpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCB2YWx1ZSgpOiBBamZDYWxlbmRhclBlcmlvZHxEYXRlfG51bGwge1xuICAgIGlmICh0aGlzLl9kYXRlT25seUZvckRheSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdkYXknKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRQZXJpb2QgIT0gbnVsbCA/IHRoaXMuX3NlbGVjdGVkUGVyaW9kLnN0YXJ0RGF0ZSA6IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFBlcmlvZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUocGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZHxEYXRlfG51bGwpIHtcbiAgICBpZiAodGhpcy5fZGF0ZU9ubHlGb3JEYXkgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnZGF5JyAmJiBwZXJpb2QgaW5zdGFuY2VvZiBEYXRlICYmXG4gICAgICAgICh0aGlzLl9zZWxlY3RlZFBlcmlvZCA9PSBudWxsIHx8IHBlcmlvZCAhPT0gdGhpcy5fc2VsZWN0ZWRQZXJpb2Quc3RhcnREYXRlKSkge1xuICAgICAgdGhpcy5zZWxlY3RlZFBlcmlvZCA9IHt0eXBlOiAnZGF5Jywgc3RhcnREYXRlOiBwZXJpb2QsIGVuZERhdGU6IHBlcmlvZH07XG4gICAgfSBlbHNlIGlmIChwZXJpb2QgaW5zdGFuY2VvZiBPYmplY3QgJiYgcGVyaW9kICE9PSB0aGlzLl9zZWxlY3RlZFBlcmlvZCkge1xuICAgICAgdGhpcy5zZWxlY3RlZFBlcmlvZCA9IDxBamZDYWxlbmRhclBlcmlvZD5wZXJpb2Q7XG4gICAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrKHBlcmlvZCk7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIGdldCBjYWxlbmRhckhlYWRlcnMoKTogc3RyaW5nW10ge1xuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhckhlYWRlcnM7XG4gIH1cbiAgZ2V0IGNhbGVuZGFyUm93cygpOiBBamZDYWxlbmRhckVudHJ5W11bXSB7XG4gICAgcmV0dXJuIHRoaXMuX2NhbGVuZGFyUm93cztcbiAgfVxuICBnZXQgdmlld0hlYWRlcigpOiBzdHJpbmcge1xuICAgIHJldHVybiB0aGlzLl92aWV3SGVhZGVyO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlld0RhdGU6IERhdGUgPSBuZXcgRGF0ZSgpO1xuICBwcml2YXRlIF92aWV3SGVhZGVyID0gJyc7XG5cbiAgcHJpdmF0ZSBfY2FsZW5kYXJSb3dzOiBBamZDYWxlbmRhckVudHJ5W11bXSA9IFtdO1xuICBwcml2YXRlIF9jYWxlbmRhckhlYWRlcnM6IHN0cmluZ1tdID0gW107XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgcHJpdmF0ZSBfc2VydmljZTogQWpmQ2FsZW5kYXJTZXJ2aWNlKSB7fVxuXG4gIHByZXZQYWdlKCk6IHZvaWQge1xuICAgIHRoaXMudmlld0RhdGUgPSB0aGlzLl9zZXJ2aWNlLnByZXZpb3VzVmlldyh0aGlzLl92aWV3RGF0ZSwgdGhpcy5fdmlld01vZGUpO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIG5leHRQYWdlKCk6IHZvaWQge1xuICAgIHRoaXMudmlld0RhdGUgPSB0aGlzLl9zZXJ2aWNlLm5leHRWaWV3KHRoaXMuX3ZpZXdEYXRlLCB0aGlzLl92aWV3TW9kZSk7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgcHJldmlvdXNWaWV3TW9kZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICd5ZWFyJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAnZGVjYWRlJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdtb250aCcpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ3llYXInO1xuICAgIH1cbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBzZWxlY3RFbnRyeShlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fY2FuU2VsZWN0RW50cnkoZW50cnkpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fbmV4dFZpZXdNb2RlKGVudHJ5KTtcbiAgICB9XG5cbiAgICBsZXQgbmV3UGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZHxudWxsID0gbnVsbDtcbiAgICBpZiAodGhpcy5fc2VydmljZS5pc0VudHJ5U2VsZWN0ZWQoZW50cnksIHRoaXMuX3NlbGVjdGVkUGVyaW9kKSA9PSAnZnVsbCcpIHtcbiAgICAgIG5ld1BlcmlvZCA9IG51bGw7XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICdkYXknKSB7XG4gICAgICBuZXdQZXJpb2QgPSB7dHlwZTogJ2RheScsIHN0YXJ0RGF0ZTogZW50cnkuZGF0ZSwgZW5kRGF0ZTogZW50cnkuZGF0ZX07XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICd3ZWVrJykge1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnd2VlaycsXG4gICAgICAgIHN0YXJ0RGF0ZTogdGhpcy5faXNvTW9kZSA/IHN0YXJ0T2ZJU09XZWVrKGVudHJ5LmRhdGUpIDogc3RhcnRPZldlZWsoZW50cnkuZGF0ZSwge1xuICAgICAgICAgIHdlZWtTdGFydHNPbjogdGhpcy5fc3RhcnRPZldlZWtEYXkgYXMgMCB8IDEgfCAyIHwgMyB8IDQgfCA1IHwgNlxuICAgICAgICB9KSxcbiAgICAgICAgZW5kRGF0ZTogdGhpcy5faXNvTW9kZSA/XG4gICAgICAgICAgICBlbmRPZklTT1dlZWsoZW50cnkuZGF0ZSkgOlxuICAgICAgICAgICAgZW5kT2ZXZWVrKGVudHJ5LmRhdGUsIHt3ZWVrU3RhcnRzT246IHRoaXMuX3N0YXJ0T2ZXZWVrRGF5IGFzIDAgfCAxIHwgMiB8IDMgfCA0IHwgNSB8IDZ9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJykge1xuICAgICAgY29uc3QgbW9udGhCb3VuZHMgPSB0aGlzLl9zZXJ2aWNlLm1vbnRoQm91bmRzKGVudHJ5LmRhdGUsIHRoaXMuX2lzb01vZGUpO1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnbW9udGgnLFxuICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKG1vbnRoQm91bmRzLnN0YXJ0KSxcbiAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUobW9udGhCb3VuZHMuZW5kKVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ3llYXInKSB7XG4gICAgICBuZXdQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICd5ZWFyJyxcbiAgICAgICAgc3RhcnREYXRlOiBzdGFydE9mWWVhcihlbnRyeS5kYXRlKSxcbiAgICAgICAgZW5kRGF0ZTogZW5kT2ZZZWFyKGVudHJ5LmRhdGUpXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gbmV3UGVyaW9kO1xuXG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gcGFyc2UodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVmcmVzaFNlbGVjdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IChfOiBhbnkpID0+IHt9O1xuICBwcml2YXRlIF9vblRvdWNoZWRDYWxsYmFjazogKCkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIHByaXZhdGUgX3NldFZpZXdEYXRlKGRhdGU6IERhdGUpOiB2b2lkIHtcbiAgICB0aGlzLl92aWV3RGF0ZSA9IGRhdGU7XG4gIH1cblxuICBwcml2YXRlIF9idWlsZENhbGVuZGFyKCk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGVuZGFyVmlldyA9IHRoaXMuX3NlcnZpY2UuYnVpbGRWaWV3KHtcbiAgICAgIHZpZXdNb2RlOiB0aGlzLl92aWV3TW9kZSxcbiAgICAgIHZpZXdEYXRlOiB0aGlzLl92aWV3RGF0ZSxcbiAgICAgIHNlbGVjdGlvbjogdGhpcy5fc2VsZWN0ZWRQZXJpb2QsXG4gICAgICBpc29Nb2RlOiB0aGlzLl9pc29Nb2RlLFxuICAgICAgbWluRGF0ZTogdGhpcy5fbWluRGF0ZSA9PSBudWxsID8gbnVsbCA6IG5ldyBEYXRlKHRoaXMuX21pbkRhdGUpLFxuICAgICAgbWF4RGF0ZTogdGhpcy5fbWF4RGF0ZSA9PSBudWxsID8gbnVsbCA6IG5ldyBEYXRlKHRoaXMuX21heERhdGUpLFxuICAgIH0pO1xuICAgIHRoaXMuX3ZpZXdIZWFkZXIgPSBjYWxlbmRhclZpZXcuaGVhZGVyO1xuICAgIHRoaXMuX2NhbGVuZGFySGVhZGVycyA9IGNhbGVuZGFyVmlldy5oZWFkZXJSb3c7XG4gICAgdGhpcy5fY2FsZW5kYXJSb3dzID0gY2FsZW5kYXJWaWV3LnJvd3M7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVmcmVzaFNlbGVjdGlvbigpOiB2b2lkIHtcbiAgICBmb3IgKGxldCByb3cgb2YgdGhpcy5fY2FsZW5kYXJSb3dzKSB7XG4gICAgICBmb3IgKGxldCBlbnRyeSBvZiByb3cpIHtcbiAgICAgICAgZW50cnkuc2VsZWN0ZWQgPSB0aGlzLl9zZXJ2aWNlLmlzRW50cnlTZWxlY3RlZChlbnRyeSwgdGhpcy5fc2VsZWN0ZWRQZXJpb2QpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2NhblNlbGVjdEVudHJ5KGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KTogYm9vbGVhbiB7XG4gICAgaWYgKFsnZGF5JywgJ3dlZWsnXS5pbmRleE9mKHRoaXMuX3NlbGVjdGlvbk1vZGUpID49IDAgJiYgZW50cnkudHlwZSAhPSAnZGF5Jykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnbW9udGgnICYmIGVudHJ5LnR5cGUgPT0gJ3llYXInKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfbmV4dFZpZXdNb2RlKGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdkZWNhZGUnKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICd5ZWFyJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICd5ZWFyJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAnbW9udGgnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl92aWV3RGF0ZSA9IGVudHJ5LmRhdGU7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG59XG4iXX0=