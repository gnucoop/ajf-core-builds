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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jYWxlbmRhci9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFtQixpQkFBaUIsRUFBRSxTQUFTLEVBQUUsWUFBWSxFQUFFLEtBQUssRUFDakUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyxZQUFZLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxRQUFRLElBQUksS0FBSyxFQUFFLGNBQWMsRUFBRSxXQUFXLEVBQ3hGLFdBQVcsRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUMvQixPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBS2hDLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBSXRELElBQU0sUUFBUSxHQUFhO0lBQ3pCLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRO0NBQ2pGLENBQUM7QUFFRjtJQUFBO0lBR0EsQ0FBQztJQUFELHdCQUFDO0FBQUQsQ0FBQyxBQUhELElBR0M7O0FBRUQ7SUEwSEUscUJBQW9CLElBQXVCLEVBQVUsUUFBNEI7UUFBN0QsU0FBSSxHQUFKLElBQUksQ0FBbUI7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFvQjtRQWxIekUsY0FBUyxHQUFHLEtBQUssQ0FBQztRQVVsQixvQkFBZSxHQUFHLEtBQUssQ0FBQztRQU94QixjQUFTLEdBQXdCLE9BQU8sQ0FBQztRQVF6QyxtQkFBYyxHQUEwQixLQUFLLENBQUM7UUFPOUMsb0JBQWUsR0FBRyxDQUFDLENBQUM7UUFhcEIsYUFBUSxHQUFZLEtBQUssQ0FBQztRQXNCMUIsWUFBTyxHQUFvQyxJQUFJLFlB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QUNkO1FBQ0QsSUFBSSxJQUFJLENBQUMsY0FBYyxJQUFJLE9BQU8sSUFBSSxLQUFLLENBQUMsSUFBSSxJQUFJLE1BQU0sRUFBRTtZQUMxRCxPQUFPLEtBQUssQ0FBQztTQUNkO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRU8sbUNBQWEsR0FBckIsVUFBc0IsS0FBdUI7UUFDM0MsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLFFBQVEsRUFBRTtZQUM5QixJQUFJLENBQUMsU0FBUyxHQUFHLE1BQU0sQ0FBQztTQUN6QjthQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxNQUFNLEVBQUU7WUFDbkMsSUFBSSxDQUFDLFNBQVMsR0FBRyxPQUFPLENBQUM7U0FDMUI7YUFBTSxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksT0FBTyxFQUFFO1lBQ3BDLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztRQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7SUFDeEIsQ0FBQzs7Z0JBdFFGLFNBQVM7Ozs7Z0JBdkJnQixpQkFBaUI7Z0JBVW5DLGtCQUFrQjs7OzJCQWdCdkIsS0FBSzsyQkFPTCxLQUFLO2lDQVVMLEtBQUs7MkJBT0wsS0FBSztnQ0FRTCxLQUFLO2lDQVNMLEtBQUs7MEJBWUwsS0FBSzswQkFPTCxLQUFLOzBCQU9MLEtBQUs7eUJBTUwsTUFBTTtpQ0FHTixLQUFLO3dCQWdCTCxLQUFLOztJQXdLUixrQkFBQztDQUFBLEFBdlFELElBdVFDO1NBdFFxQixXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FmdGVyQ29udGVudEluaXQsIENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsXG4gIE9uSW5pdCwgT3V0cHV0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7ZW5kT2ZJU09XZWVrLCBlbmRPZldlZWssIGVuZE9mWWVhciwgcGFyc2VJU08gYXMgcGFyc2UsIHN0YXJ0T2ZJU09XZWVrLCBzdGFydE9mV2VlayxcbiAgc3RhcnRPZlllYXJ9IGZyb20gJ2RhdGUtZm5zJztcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmQ2FsZW5kYXJFbnRyeX0gZnJvbSAnLi9jYWxlbmRhci1lbnRyeSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyUGVyaW9kVHlwZX0gZnJvbSAnLi9jYWxlbmRhci1wZXJpb2QtdHlwZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyUGVyaW9kfSBmcm9tICcuL2NhbGVuZGFyLXBlcmlvZCc7XG5pbXBvcnQge0FqZkNhbGVuZGFyU2VydmljZX0gZnJvbSAnLi9jYWxlbmRhci1zZXJ2aWNlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJWaWV3TW9kZX0gZnJvbSAnLi9jYWxlbmRhci12aWV3LW1vZGUnO1xuaW1wb3J0IHtBamZDYWxlbmRhcldlZWtEYXl9IGZyb20gJy4vY2FsZW5kYXItd2Vlay1kYXknO1xuXG5jb25zdCB3ZWVrRGF5czogc3RyaW5nW10gPSBbXG4gICcnLCAnbW9uZGF5JywgJ3R1ZXNkYXknLCAnd2VkbmVzZGF5JywgJ3RodXJzZGF5JywgJ2ZyaWRheScsICdzYXR1cmRheScsICdzdW5kYXknXG5dO1xuXG5leHBvcnQgY2xhc3MgQWpmQ2FsZW5kYXJDaGFuZ2Uge1xuICBzb3VyY2U6IEFqZkNhbGVuZGFyO1xuICBwZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgbnVsbDtcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmQ2FsZW5kYXIgaW1wbGVtZW50cyBBZnRlckNvbnRlbnRJbml0LCBDb250cm9sVmFsdWVBY2Nlc3NvciwgT25Jbml0IHtcbiAgZ2V0IHZpZXdEYXRlKCk6IERhdGUgeyByZXR1cm4gdGhpcy5fdmlld0RhdGU7IH1cbiAgQElucHV0KCkgc2V0IHZpZXdEYXRlKHZpZXdEYXRlOiBEYXRlKSB7XG4gICAgdGhpcy5fc2V0Vmlld0RhdGUodmlld0RhdGUpO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2Rpc2FibGVkID0gZmFsc2U7XG4gIGdldCBkaXNhYmxlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2Rpc2FibGVkOyB9XG4gIEBJbnB1dCgpIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIGNvbnN0IG5ld0Rpc2FibGVkID0gZGlzYWJsZWQgIT0gbnVsbCAmJiBgJHtkaXNhYmxlZH1gICE9PSAnZmFsc2UnO1xuICAgIGlmIChuZXdEaXNhYmxlZCAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3RGlzYWJsZWQ7XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGF0ZU9ubHlGb3JEYXkgPSBmYWxzZTtcbiAgZ2V0IGRhdGVPbmx5Rm9yRGF5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fZGlzYWJsZWQ7IH1cbiAgQElucHV0KCkgc2V0IGRhdGVPbmx5Rm9yRGF5KGRhdGVPbmx5Rm9yRGF5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fZGF0ZU9ubHlGb3JEYXkgPSBkYXRlT25seUZvckRheSAhPSBudWxsICYmIGAke2RhdGVPbmx5Rm9yRGF5fWAgIT09ICdmYWxzZSc7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUgPSAnbW9udGgnO1xuICBnZXQgdmlld01vZGUoKTogQWpmQ2FsZW5kYXJWaWV3TW9kZSB7IHJldHVybiB0aGlzLl92aWV3TW9kZTsgfVxuICBASW5wdXQoKSBzZXQgdmlld01vZGUodmlld01vZGU6IEFqZkNhbGVuZGFyVmlld01vZGUpIHtcbiAgICB0aGlzLl92aWV3TW9kZSA9IHZpZXdNb2RlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZWxlY3Rpb25Nb2RlOiBBamZDYWxlbmRhclBlcmlvZFR5cGUgPSAnZGF5JztcbiAgZ2V0IHNlbGVjdGlvbk1vZGUoKTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlIHsgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbk1vZGU7IH1cbiAgQElucHV0KCkgc2V0IHNlbGVjdGlvbk1vZGUoc2VsZWN0aW9uTW9kZTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZSA9IHNlbGVjdGlvbk1vZGU7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhcnRPZldlZWtEYXkgPSAxO1xuICBnZXQgc3RhcnRPZldlZWtEYXkoKTogQWpmQ2FsZW5kYXJXZWVrRGF5IHtcbiAgICByZXR1cm4gPEFqZkNhbGVuZGFyV2Vla0RheT53ZWVrRGF5c1t0aGlzLl9zdGFydE9mV2Vla0RheV07XG4gIH1cbiAgQElucHV0KCkgc2V0IHN0YXJ0T2ZXZWVrRGF5KHdlZWtEYXk6IEFqZkNhbGVuZGFyV2Vla0RheSkge1xuICAgIHRoaXMuX3N0YXJ0T2ZXZWVrRGF5ID0gd2Vla0RheXMuaW5kZXhPZih3ZWVrRGF5KTtcblxuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICAgIH1cbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9pc29Nb2RlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGlzb01vZGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9pc29Nb2RlOyB9XG4gIEBJbnB1dCgpIHNldCBpc29Nb2RlKGlzb01vZGU6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9pc29Nb2RlID0gaXNvTW9kZTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBwcml2YXRlIF9taW5EYXRlOiBEYXRlIHwgbnVsbDtcbiAgZ2V0IG1pbkRhdGUoKTogRGF0ZSB8IG51bGwgeyByZXR1cm4gdGhpcy5fbWluRGF0ZTsgfVxuICBASW5wdXQoKSBzZXQgbWluRGF0ZShtaW5EYXRlOiBEYXRlIHwgbnVsbCkge1xuICAgIHRoaXMuX21pbkRhdGUgPSBtaW5EYXRlICE9IG51bGwgPyBuZXcgRGF0ZShtaW5EYXRlLnZhbHVlT2YoKSkgOiBudWxsO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX21heERhdGU6IERhdGUgfCBudWxsO1xuICBnZXQgbWF4RGF0ZSgpOiBEYXRlIHwgbnVsbCB7IHJldHVybiB0aGlzLl9tYXhEYXRlOyB9XG4gIEBJbnB1dCgpIHNldCBtYXhEYXRlKG1heERhdGU6IERhdGUgfCBudWxsKSB7XG4gICAgdGhpcy5fbWF4RGF0ZSA9IG1heERhdGUgIT0gbnVsbCA/IG5ldyBEYXRlKG1heERhdGUudmFsdWVPZigpKSA6IG51bGw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmQ2FsZW5kYXJDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZDYWxlbmRhckNoYW5nZT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDYWxlbmRhckNoYW5nZT4gPSB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRQZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgbnVsbDtcbiAgQElucHV0KCkgc2V0IHNlbGVjdGVkUGVyaW9kKHBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2QgfCBudWxsKSB7XG4gICAgdGhpcy5fc2VsZWN0ZWRQZXJpb2QgPSBwZXJpb2Q7XG4gICAgdGhpcy5fY2hhbmdlLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgcGVyaW9kOiBwZXJpb2RcbiAgICB9KTtcbiAgICB0aGlzLl9yZWZyZXNoU2VsZWN0aW9uKCk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgZ2V0IHZhbHVlKCk6IEFqZkNhbGVuZGFyUGVyaW9kIHwgRGF0ZSB8IG51bGwge1xuICAgIGlmICh0aGlzLl9kYXRlT25seUZvckRheSAmJiB0aGlzLnNlbGVjdGlvbk1vZGUgPT09ICdkYXknKSB7XG4gICAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRQZXJpb2QgIT0gbnVsbCA/IHRoaXMuX3NlbGVjdGVkUGVyaW9kLnN0YXJ0RGF0ZSA6IG51bGw7XG4gICAgfVxuICAgIHJldHVybiB0aGlzLl9zZWxlY3RlZFBlcmlvZDtcbiAgfVxuICBASW5wdXQoKSBzZXQgdmFsdWUocGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZCB8IERhdGUgfCBudWxsKSB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5fZGF0ZU9ubHlGb3JEYXkgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnZGF5JyAmJiBwZXJpb2QgaW5zdGFuY2VvZiBEYXRlXG4gICAgICAmJiAodGhpcy5fc2VsZWN0ZWRQZXJpb2QgPT0gbnVsbCB8fCBwZXJpb2QgIT09IHRoaXMuX3NlbGVjdGVkUGVyaW9kLnN0YXJ0RGF0ZSlcbiAgICApIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICdkYXknLFxuICAgICAgICBzdGFydERhdGU6IHBlcmlvZCxcbiAgICAgICAgZW5kRGF0ZTogcGVyaW9kXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAocGVyaW9kIGluc3RhbmNlb2YgT2JqZWN0ICYmIHBlcmlvZCAhPT0gdGhpcy5fc2VsZWN0ZWRQZXJpb2QpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQZXJpb2QgPSA8QWpmQ2FsZW5kYXJQZXJpb2Q+cGVyaW9kO1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayhwZXJpb2QpO1xuICAgIH1cbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgY2FsZW5kYXJIZWFkZXJzKCk6IHN0cmluZ1tdIHsgcmV0dXJuIHRoaXMuX2NhbGVuZGFySGVhZGVyczsgfVxuICBnZXQgY2FsZW5kYXJSb3dzKCk6IEFqZkNhbGVuZGFyRW50cnlbXVtdIHsgcmV0dXJuIHRoaXMuX2NhbGVuZGFyUm93czsgfVxuICBnZXQgdmlld0hlYWRlcigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5fdmlld0hlYWRlcjsgfVxuXG4gIHByaXZhdGUgX3ZpZXdEYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgcHJpdmF0ZSBfdmlld0hlYWRlciA9ICcnO1xuXG4gIHByaXZhdGUgX2NhbGVuZGFyUm93czogQWpmQ2FsZW5kYXJFbnRyeVtdW10gPSBbXTtcbiAgcHJpdmF0ZSBfY2FsZW5kYXJIZWFkZXJzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX3NlcnZpY2U6IEFqZkNhbGVuZGFyU2VydmljZSkgeyB9XG5cbiAgcHJldlBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3RGF0ZSA9IHRoaXMuX3NlcnZpY2UucHJldmlvdXNWaWV3KHRoaXMuX3ZpZXdEYXRlLCB0aGlzLl92aWV3TW9kZSk7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgbmV4dFBhZ2UoKTogdm9pZCB7XG4gICAgdGhpcy52aWV3RGF0ZSA9IHRoaXMuX3NlcnZpY2UubmV4dFZpZXcodGhpcy5fdmlld0RhdGUsIHRoaXMuX3ZpZXdNb2RlKTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBwcmV2aW91c1ZpZXdNb2RlKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgcmV0dXJuO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICdkZWNhZGUnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAneWVhcic7XG4gICAgfVxuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHNlbGVjdEVudHJ5KGVudHJ5OiBBamZDYWxlbmRhckVudHJ5KTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9jYW5TZWxlY3RFbnRyeShlbnRyeSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9uZXh0Vmlld01vZGUoZW50cnkpO1xuICAgIH1cblxuICAgIGxldCBuZXdQZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kIHwgbnVsbCA9IG51bGw7XG4gICAgaWYgKHRoaXMuX3NlcnZpY2UuaXNFbnRyeVNlbGVjdGVkKGVudHJ5LCB0aGlzLl9zZWxlY3RlZFBlcmlvZCkgPT0gJ2Z1bGwnKSB7XG4gICAgICBuZXdQZXJpb2QgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnZGF5Jykge1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnZGF5JyxcbiAgICAgICAgc3RhcnREYXRlOiBlbnRyeS5kYXRlLFxuICAgICAgICBlbmREYXRlOiBlbnRyeS5kYXRlXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnd2VlaycpIHtcbiAgICAgIG5ld1BlcmlvZCA9IHtcbiAgICAgICAgdHlwZTogJ3dlZWsnLFxuICAgICAgICBzdGFydERhdGU6IHRoaXMuX2lzb01vZGUgP1xuICAgICAgICAgIHN0YXJ0T2ZJU09XZWVrKGVudHJ5LmRhdGUpIDpcbiAgICAgICAgICBzdGFydE9mV2VlayhlbnRyeS5kYXRlLCB7d2Vla1N0YXJ0c09uOiB0aGlzLl9zdGFydE9mV2Vla0RheSBhcyAwfDF8MnwzfDR8NXw2fSksXG4gICAgICAgIGVuZERhdGU6IHRoaXMuX2lzb01vZGUgP1xuICAgICAgICAgIGVuZE9mSVNPV2VlayhlbnRyeS5kYXRlKSA6XG4gICAgICAgICAgZW5kT2ZXZWVrKGVudHJ5LmRhdGUsIHt3ZWVrU3RhcnRzT246IHRoaXMuX3N0YXJ0T2ZXZWVrRGF5IGFzIDB8MXwyfDN8NHw1fDZ9KVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJykge1xuICAgICAgY29uc3QgbW9udGhCb3VuZHMgPSB0aGlzLl9zZXJ2aWNlLm1vbnRoQm91bmRzKGVudHJ5LmRhdGUsIHRoaXMuX2lzb01vZGUpO1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAnbW9udGgnLFxuICAgICAgICBzdGFydERhdGU6IG5ldyBEYXRlKG1vbnRoQm91bmRzLnN0YXJ0KSxcbiAgICAgICAgZW5kRGF0ZTogbmV3IERhdGUobW9udGhCb3VuZHMuZW5kKVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ3llYXInKSB7XG4gICAgICBuZXdQZXJpb2QgPSB7XG4gICAgICAgIHR5cGU6ICd5ZWFyJyxcbiAgICAgICAgc3RhcnREYXRlOiBzdGFydE9mWWVhcihlbnRyeS5kYXRlKSxcbiAgICAgICAgZW5kRGF0ZTogZW5kT2ZZZWFyKGVudHJ5LmRhdGUpXG4gICAgICB9O1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gbmV3UGVyaW9kO1xuXG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2soKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCkge1xuICAgIHRoaXMuX29uQ2hhbmdlQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpIHtcbiAgICB0aGlzLl9vblRvdWNoZWRDYWxsYmFjayA9IGZuO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHZhbHVlID0gcGFyc2UodmFsdWUpO1xuICAgIH1cbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gIH1cblxuICBuZ09uSW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBuZ0FmdGVyQ29udGVudEluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVmcmVzaFNlbGVjdGlvbigpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25DaGFuZ2VDYWxsYmFjazogKF86IGFueSkgPT4gdm9pZCA9IChfOiBhbnkpID0+IHsgfTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSAoKSA9PiB7IH07XG5cbiAgcHJpdmF0ZSBfc2V0Vmlld0RhdGUoZGF0ZTogRGF0ZSk6IHZvaWQge1xuICAgIHRoaXMuX3ZpZXdEYXRlID0gZGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgX2J1aWxkQ2FsZW5kYXIoKTogdm9pZCB7XG4gICAgY29uc3QgY2FsZW5kYXJWaWV3ID0gdGhpcy5fc2VydmljZS5idWlsZFZpZXcoe1xuICAgICAgdmlld01vZGU6IHRoaXMuX3ZpZXdNb2RlLFxuICAgICAgdmlld0RhdGU6IHRoaXMuX3ZpZXdEYXRlLFxuICAgICAgc2VsZWN0aW9uOiB0aGlzLl9zZWxlY3RlZFBlcmlvZCxcbiAgICAgIGlzb01vZGU6IHRoaXMuX2lzb01vZGUsXG4gICAgICBtaW5EYXRlOiB0aGlzLl9taW5EYXRlID09IG51bGwgPyBudWxsIDogbmV3IERhdGUodGhpcy5fbWluRGF0ZSksXG4gICAgICBtYXhEYXRlOiB0aGlzLl9tYXhEYXRlID09IG51bGwgPyBudWxsIDogbmV3IERhdGUodGhpcy5fbWF4RGF0ZSksXG4gICAgfSk7XG4gICAgdGhpcy5fdmlld0hlYWRlciA9IGNhbGVuZGFyVmlldy5oZWFkZXI7XG4gICAgdGhpcy5fY2FsZW5kYXJIZWFkZXJzID0gY2FsZW5kYXJWaWV3LmhlYWRlclJvdztcbiAgICB0aGlzLl9jYWxlbmRhclJvd3MgPSBjYWxlbmRhclZpZXcucm93cztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWZyZXNoU2VsZWN0aW9uKCk6IHZvaWQge1xuICAgIGZvciAobGV0IHJvdyBvZiB0aGlzLl9jYWxlbmRhclJvd3MpIHtcbiAgICAgIGZvciAobGV0IGVudHJ5IG9mIHJvdykge1xuICAgICAgICBlbnRyeS5zZWxlY3RlZCA9IHRoaXMuX3NlcnZpY2UuaXNFbnRyeVNlbGVjdGVkKGVudHJ5LCB0aGlzLl9zZWxlY3RlZFBlcmlvZCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfY2FuU2VsZWN0RW50cnkoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiBib29sZWFuIHtcbiAgICBpZiAoWydkYXknLCAnd2VlayddLmluZGV4T2YodGhpcy5fc2VsZWN0aW9uTW9kZSkgPj0gMCAmJiBlbnRyeS50eXBlICE9ICdkYXknKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICdtb250aCcgJiYgZW50cnkudHlwZSA9PSAneWVhcicpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBwcml2YXRlIF9uZXh0Vmlld01vZGUoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fdmlld01vZGUgPT0gJ2RlY2FkZScpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ3llYXInO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fdmlld01vZGUgPT0gJ3llYXInKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICdtb250aCc7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3ZpZXdEYXRlID0gZW50cnkuZGF0ZTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cbn1cbiJdfQ==