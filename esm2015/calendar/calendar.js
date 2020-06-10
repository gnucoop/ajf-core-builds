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
import { ChangeDetectorRef, Directive, EventEmitter, Input, Output } from '@angular/core';
import { endOfISOWeek, endOfWeek, endOfYear, parseISO as parse, startOfISOWeek, startOfWeek, startOfYear } from 'date-fns';
import { Observable } from 'rxjs';
import { AjfCalendarService } from './calendar-service';
const weekDays = ['', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
export class AjfCalendarChange {
}
let AjfCalendar = /** @class */ (() => {
    class AjfCalendar {
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
            this._onChangeCallback = (_) => { };
            this._onTouchedCallback = () => { };
        }
        get viewDate() {
            return this._viewDate;
        }
        set viewDate(viewDate) {
            this._setViewDate(viewDate);
            this._cdr.markForCheck();
        }
        get disabled() {
            return this._disabled;
        }
        set disabled(disabled) {
            const newDisabled = disabled != null && `${disabled}` !== 'false';
            if (newDisabled !== this._disabled) {
                this._disabled = newDisabled;
                this._cdr.markForCheck();
            }
        }
        get dateOnlyForDay() {
            return this._disabled;
        }
        set dateOnlyForDay(dateOnlyForDay) {
            this._dateOnlyForDay = dateOnlyForDay != null && `${dateOnlyForDay}` !== 'false';
            this._cdr.markForCheck();
        }
        get viewMode() {
            return this._viewMode;
        }
        set viewMode(viewMode) {
            this._viewMode = viewMode;
            this._buildCalendar();
            this._cdr.markForCheck();
        }
        get selectionMode() {
            return this._selectionMode;
        }
        set selectionMode(selectionMode) {
            this._selectionMode = selectionMode;
            this._cdr.markForCheck();
        }
        get startOfWeekDay() {
            return weekDays[this._startOfWeekDay];
        }
        set startOfWeekDay(weekDay) {
            this._startOfWeekDay = weekDays.indexOf(weekDay);
            if (this._viewMode === 'month') {
                this._buildCalendar();
            }
            this._cdr.markForCheck();
        }
        get isoMode() {
            return this._isoMode;
        }
        set isoMode(isoMode) {
            this._isoMode = isoMode;
            this._buildCalendar();
        }
        get minDate() {
            return this._minDate;
        }
        set minDate(minDate) {
            this._minDate = minDate != null ? new Date(minDate.valueOf()) : null;
            this._cdr.markForCheck();
        }
        get maxDate() {
            return this._maxDate;
        }
        set maxDate(maxDate) {
            this._maxDate = maxDate != null ? new Date(maxDate.valueOf()) : null;
            this._cdr.markForCheck();
        }
        set selectedPeriod(period) {
            this._selectedPeriod = period;
            this._change.emit({ source: this, period: period });
            this._refreshSelection();
            this._cdr.markForCheck();
        }
        get value() {
            if (this._dateOnlyForDay && this.selectionMode === 'day') {
                return this._selectedPeriod != null ? this._selectedPeriod.startDate : null;
            }
            return this._selectedPeriod;
        }
        set value(period) {
            if (this._dateOnlyForDay && this.selectionMode === 'day' && period instanceof Date &&
                (this._selectedPeriod == null || period !== this._selectedPeriod.startDate)) {
                this.selectedPeriod = { type: 'day', startDate: period, endDate: period };
            }
            else if (period instanceof Object && period !== this._selectedPeriod) {
                this.selectedPeriod = period;
                this._onChangeCallback(period);
            }
            this._cdr.markForCheck();
        }
        get calendarHeaders() {
            return this._calendarHeaders;
        }
        get calendarRows() {
            return this._calendarRows;
        }
        get viewHeader() {
            return this._viewHeader;
        }
        prevPage() {
            this.viewDate = this._service.previousView(this._viewDate, this._viewMode);
            this._buildCalendar();
        }
        nextPage() {
            this.viewDate = this._service.nextView(this._viewDate, this._viewMode);
            this._buildCalendar();
        }
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
        selectEntry(entry) {
            if (!this._canSelectEntry(entry)) {
                return this._nextViewMode(entry);
            }
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
                        weekStartsOn: this._startOfWeekDay
                    }),
                    endDate: this._isoMode ?
                        endOfISOWeek(entry.date) :
                        endOfWeek(entry.date, { weekStartsOn: this._startOfWeekDay })
                };
            }
            else if (this._selectionMode == 'month') {
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
        registerOnChange(fn) {
            this._onChangeCallback = fn;
        }
        registerOnTouched(fn) {
            this._onTouchedCallback = fn;
        }
        writeValue(value) {
            if (typeof value === 'string') {
                value = parse(value);
            }
            this.value = value;
        }
        ngOnInit() {
            this._buildCalendar();
        }
        ngAfterContentInit() {
            this._refreshSelection();
        }
        _setViewDate(date) {
            this._viewDate = date;
        }
        _buildCalendar() {
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
        _refreshSelection() {
            for (let row of this._calendarRows) {
                for (let entry of row) {
                    entry.selected = this._service.isEntrySelected(entry, this._selectedPeriod);
                }
            }
        }
        _canSelectEntry(entry) {
            if (['day', 'week'].indexOf(this._selectionMode) >= 0 && entry.type != 'day') {
                return false;
            }
            if (this._selectionMode == 'month' && entry.type == 'year') {
                return false;
            }
            return true;
        }
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
    return AjfCalendar;
})();
export { AjfCalendar };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jYWxlbmRhci9jYWxlbmRhci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDUCxNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQ0wsWUFBWSxFQUNaLFNBQVMsRUFDVCxTQUFTLEVBQ1QsUUFBUSxJQUFJLEtBQUssRUFDakIsY0FBYyxFQUNkLFdBQVcsRUFDWCxXQUFXLEVBQ1osTUFBTSxVQUFVLENBQUM7QUFDbEIsT0FBTyxFQUFDLFVBQVUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUtoQyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUl0RCxNQUFNLFFBQVEsR0FDVixDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLFVBQVUsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUV2RixNQUFNLE9BQU8saUJBQWlCO0NBRzdCO0FBRUQ7SUFBQSxNQUNzQixXQUFXO1FBaUovQixZQUFvQixJQUF1QixFQUFVLFFBQTRCO1lBQTdELFNBQUksR0FBSixJQUFJLENBQW1CO1lBQVUsYUFBUSxHQUFSLFFBQVEsQ0FBb0I7WUF2SXpFLGNBQVMsR0FBRyxLQUFLLENBQUM7WUFhbEIsb0JBQWUsR0FBRyxLQUFLLENBQUM7WUFVeEIsY0FBUyxHQUF3QixPQUFPLENBQUM7WUFXekMsbUJBQWMsR0FBMEIsS0FBSyxDQUFDO1lBVTlDLG9CQUFlLEdBQUcsQ0FBQyxDQUFDO1lBY3BCLGFBQVEsR0FBWSxLQUFLLENBQUM7WUErQjFCLFlBQU8sR0FBb0MsSUFBSSxZQUFZLEVBQXFCLENBQUM7WUFDdEUsV0FB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QUFTLEdBQUcsT0FBTyxDQUFDO2FBQzFCO2lCQUFNLElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxPQUFPLEVBQUU7Z0JBQ3BDLE9BQU87YUFDUjtZQUNELElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQztZQUM1QixJQUFJLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDeEIsQ0FBQzs7O2dCQTFSRixTQUFTOzs7O2dCQWxDUixpQkFBaUI7Z0JBc0JYLGtCQUFrQjs7OzJCQWlCdkIsS0FBSzsyQkFVTCxLQUFLO2lDQWFMLEtBQUs7MkJBVUwsS0FBSztnQ0FXTCxLQUFLO2lDQVVMLEtBQUs7MEJBZUwsS0FBSzswQkFVTCxLQUFLOzBCQVVMLEtBQUs7eUJBT0wsTUFBTTtpQ0FHTixLQUFLO3dCQWNMLEtBQUs7O0lBcUtSLGtCQUFDO0tBQUE7U0ExUnFCLFdBQVciLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyQ29udGVudEluaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uSW5pdCxcbiAgT3V0cHV0XG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3Nvcn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgZW5kT2ZJU09XZWVrLFxuICBlbmRPZldlZWssXG4gIGVuZE9mWWVhcixcbiAgcGFyc2VJU08gYXMgcGFyc2UsXG4gIHN0YXJ0T2ZJU09XZWVrLFxuICBzdGFydE9mV2VlayxcbiAgc3RhcnRPZlllYXJcbn0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHtBamZDYWxlbmRhckVudHJ5fSBmcm9tICcuL2NhbGVuZGFyLWVudHJ5JztcbmltcG9ydCB7QWpmQ2FsZW5kYXJQZXJpb2R9IGZyb20gJy4vY2FsZW5kYXItcGVyaW9kJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJQZXJpb2RUeXBlfSBmcm9tICcuL2NhbGVuZGFyLXBlcmlvZC10eXBlJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuL2NhbGVuZGFyLXNlcnZpY2UnO1xuaW1wb3J0IHtBamZDYWxlbmRhclZpZXdNb2RlfSBmcm9tICcuL2NhbGVuZGFyLXZpZXctbW9kZSc7XG5pbXBvcnQge0FqZkNhbGVuZGFyV2Vla0RheX0gZnJvbSAnLi9jYWxlbmRhci13ZWVrLWRheSc7XG5cbmNvbnN0IHdlZWtEYXlzOiBzdHJpbmdbXSA9XG4gICAgWycnLCAnbW9uZGF5JywgJ3R1ZXNkYXknLCAnd2VkbmVzZGF5JywgJ3RodXJzZGF5JywgJ2ZyaWRheScsICdzYXR1cmRheScsICdzdW5kYXknXTtcblxuZXhwb3J0IGNsYXNzIEFqZkNhbGVuZGFyQ2hhbmdlIHtcbiAgc291cmNlOiBBamZDYWxlbmRhcjtcbiAgcGVyaW9kOiBBamZDYWxlbmRhclBlcmlvZHxudWxsO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZDYWxlbmRhciBpbXBsZW1lbnRzIEFmdGVyQ29udGVudEluaXQsIENvbnRyb2xWYWx1ZUFjY2Vzc29yLCBPbkluaXQge1xuICBnZXQgdmlld0RhdGUoKTogRGF0ZSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZpZXdEYXRlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2aWV3RGF0ZSh2aWV3RGF0ZTogRGF0ZSkge1xuICAgIHRoaXMuX3NldFZpZXdEYXRlKHZpZXdEYXRlKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9kaXNhYmxlZCA9IGZhbHNlO1xuICBnZXQgZGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2Rpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBkaXNhYmxlZChkaXNhYmxlZDogYm9vbGVhbikge1xuICAgIGNvbnN0IG5ld0Rpc2FibGVkID0gZGlzYWJsZWQgIT0gbnVsbCAmJiBgJHtkaXNhYmxlZH1gICE9PSAnZmFsc2UnO1xuICAgIGlmIChuZXdEaXNhYmxlZCAhPT0gdGhpcy5fZGlzYWJsZWQpIHtcbiAgICAgIHRoaXMuX2Rpc2FibGVkID0gbmV3RGlzYWJsZWQ7XG4gICAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfZGF0ZU9ubHlGb3JEYXkgPSBmYWxzZTtcbiAgZ2V0IGRhdGVPbmx5Rm9yRGF5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9kaXNhYmxlZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZGF0ZU9ubHlGb3JEYXkoZGF0ZU9ubHlGb3JEYXk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9kYXRlT25seUZvckRheSA9IGRhdGVPbmx5Rm9yRGF5ICE9IG51bGwgJiYgYCR7ZGF0ZU9ubHlGb3JEYXl9YCAhPT0gJ2ZhbHNlJztcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF92aWV3TW9kZTogQWpmQ2FsZW5kYXJWaWV3TW9kZSA9ICdtb250aCc7XG4gIGdldCB2aWV3TW9kZSgpOiBBamZDYWxlbmRhclZpZXdNb2RlIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld01vZGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZpZXdNb2RlKHZpZXdNb2RlOiBBamZDYWxlbmRhclZpZXdNb2RlKSB7XG4gICAgdGhpcy5fdmlld01vZGUgPSB2aWV3TW9kZTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2VsZWN0aW9uTW9kZTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlID0gJ2RheSc7XG4gIGdldCBzZWxlY3Rpb25Nb2RlKCk6IEFqZkNhbGVuZGFyUGVyaW9kVHlwZSB7XG4gICAgcmV0dXJuIHRoaXMuX3NlbGVjdGlvbk1vZGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHNlbGVjdGlvbk1vZGUoc2VsZWN0aW9uTW9kZTogQWpmQ2FsZW5kYXJQZXJpb2RUeXBlKSB7XG4gICAgdGhpcy5fc2VsZWN0aW9uTW9kZSA9IHNlbGVjdGlvbk1vZGU7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc3RhcnRPZldlZWtEYXkgPSAxO1xuICBnZXQgc3RhcnRPZldlZWtEYXkoKTogQWpmQ2FsZW5kYXJXZWVrRGF5IHtcbiAgICByZXR1cm4gPEFqZkNhbGVuZGFyV2Vla0RheT53ZWVrRGF5c1t0aGlzLl9zdGFydE9mV2Vla0RheV07XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHN0YXJ0T2ZXZWVrRGF5KHdlZWtEYXk6IEFqZkNhbGVuZGFyV2Vla0RheSkge1xuICAgIHRoaXMuX3N0YXJ0T2ZXZWVrRGF5ID0gd2Vla0RheXMuaW5kZXhPZih3ZWVrRGF5KTtcblxuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PT0gJ21vbnRoJykge1xuICAgICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICAgIH1cbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9pc29Nb2RlOiBib29sZWFuID0gZmFsc2U7XG5cbiAgZ2V0IGlzb01vZGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzb01vZGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGlzb01vZGUoaXNvTW9kZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2lzb01vZGUgPSBpc29Nb2RlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgX21pbkRhdGU6IERhdGV8bnVsbDtcbiAgZ2V0IG1pbkRhdGUoKTogRGF0ZXxudWxsIHtcbiAgICByZXR1cm4gdGhpcy5fbWluRGF0ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgbWluRGF0ZShtaW5EYXRlOiBEYXRlfG51bGwpIHtcbiAgICB0aGlzLl9taW5EYXRlID0gbWluRGF0ZSAhPSBudWxsID8gbmV3IERhdGUobWluRGF0ZS52YWx1ZU9mKCkpIDogbnVsbDtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9tYXhEYXRlOiBEYXRlfG51bGw7XG4gIGdldCBtYXhEYXRlKCk6IERhdGV8bnVsbCB7XG4gICAgcmV0dXJuIHRoaXMuX21heERhdGU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG1heERhdGUobWF4RGF0ZTogRGF0ZXxudWxsKSB7XG4gICAgdGhpcy5fbWF4RGF0ZSA9IG1heERhdGUgIT0gbnVsbCA/IG5ldyBEYXRlKG1heERhdGUudmFsdWVPZigpKSA6IG51bGw7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfY2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmQ2FsZW5kYXJDaGFuZ2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZDYWxlbmRhckNoYW5nZT4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGNoYW5nZTogT2JzZXJ2YWJsZTxBamZDYWxlbmRhckNoYW5nZT4gPSB0aGlzLl9jaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2VsZWN0ZWRQZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kfG51bGw7XG4gIEBJbnB1dCgpXG4gIHNldCBzZWxlY3RlZFBlcmlvZChwZXJpb2Q6IEFqZkNhbGVuZGFyUGVyaW9kfG51bGwpIHtcbiAgICB0aGlzLl9zZWxlY3RlZFBlcmlvZCA9IHBlcmlvZDtcbiAgICB0aGlzLl9jaGFuZ2UuZW1pdCh7c291cmNlOiB0aGlzLCBwZXJpb2Q6IHBlcmlvZH0pO1xuICAgIHRoaXMuX3JlZnJlc2hTZWxlY3Rpb24oKTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgdmFsdWUoKTogQWpmQ2FsZW5kYXJQZXJpb2R8RGF0ZXxudWxsIHtcbiAgICBpZiAodGhpcy5fZGF0ZU9ubHlGb3JEYXkgJiYgdGhpcy5zZWxlY3Rpb25Nb2RlID09PSAnZGF5Jykge1xuICAgICAgcmV0dXJuIHRoaXMuX3NlbGVjdGVkUGVyaW9kICE9IG51bGwgPyB0aGlzLl9zZWxlY3RlZFBlcmlvZC5zdGFydERhdGUgOiBudWxsO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5fc2VsZWN0ZWRQZXJpb2Q7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHBlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2R8RGF0ZXxudWxsKSB7XG4gICAgaWYgKHRoaXMuX2RhdGVPbmx5Rm9yRGF5ICYmIHRoaXMuc2VsZWN0aW9uTW9kZSA9PT0gJ2RheScgJiYgcGVyaW9kIGluc3RhbmNlb2YgRGF0ZSAmJlxuICAgICAgICAodGhpcy5fc2VsZWN0ZWRQZXJpb2QgPT0gbnVsbCB8fCBwZXJpb2QgIT09IHRoaXMuX3NlbGVjdGVkUGVyaW9kLnN0YXJ0RGF0ZSkpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQZXJpb2QgPSB7dHlwZTogJ2RheScsIHN0YXJ0RGF0ZTogcGVyaW9kLCBlbmREYXRlOiBwZXJpb2R9O1xuICAgIH0gZWxzZSBpZiAocGVyaW9kIGluc3RhbmNlb2YgT2JqZWN0ICYmIHBlcmlvZCAhPT0gdGhpcy5fc2VsZWN0ZWRQZXJpb2QpIHtcbiAgICAgIHRoaXMuc2VsZWN0ZWRQZXJpb2QgPSA8QWpmQ2FsZW5kYXJQZXJpb2Q+cGVyaW9kO1xuICAgICAgdGhpcy5fb25DaGFuZ2VDYWxsYmFjayhwZXJpb2QpO1xuICAgIH1cbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBnZXQgY2FsZW5kYXJIZWFkZXJzKCk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gdGhpcy5fY2FsZW5kYXJIZWFkZXJzO1xuICB9XG4gIGdldCBjYWxlbmRhclJvd3MoKTogQWpmQ2FsZW5kYXJFbnRyeVtdW10ge1xuICAgIHJldHVybiB0aGlzLl9jYWxlbmRhclJvd3M7XG4gIH1cbiAgZ2V0IHZpZXdIZWFkZXIoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gdGhpcy5fdmlld0hlYWRlcjtcbiAgfVxuXG4gIHByaXZhdGUgX3ZpZXdEYXRlOiBEYXRlID0gbmV3IERhdGUoKTtcbiAgcHJpdmF0ZSBfdmlld0hlYWRlciA9ICcnO1xuXG4gIHByaXZhdGUgX2NhbGVuZGFyUm93czogQWpmQ2FsZW5kYXJFbnRyeVtdW10gPSBbXTtcbiAgcHJpdmF0ZSBfY2FsZW5kYXJIZWFkZXJzOiBzdHJpbmdbXSA9IFtdO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHByaXZhdGUgX3NlcnZpY2U6IEFqZkNhbGVuZGFyU2VydmljZSkge31cblxuICBwcmV2UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdEYXRlID0gdGhpcy5fc2VydmljZS5wcmV2aW91c1ZpZXcodGhpcy5fdmlld0RhdGUsIHRoaXMuX3ZpZXdNb2RlKTtcbiAgICB0aGlzLl9idWlsZENhbGVuZGFyKCk7XG4gIH1cblxuICBuZXh0UGFnZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZXdEYXRlID0gdGhpcy5fc2VydmljZS5uZXh0Vmlldyh0aGlzLl92aWV3RGF0ZSwgdGhpcy5fdmlld01vZGUpO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxuXG4gIHByZXZpb3VzVmlld01vZGUoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdkZWNhZGUnKSB7XG4gICAgICByZXR1cm47XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ2RlY2FkZSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnbW9udGgnKSB7XG4gICAgICB0aGlzLl92aWV3TW9kZSA9ICd5ZWFyJztcbiAgICB9XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgc2VsZWN0RW50cnkoZW50cnk6IEFqZkNhbGVuZGFyRW50cnkpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2NhblNlbGVjdEVudHJ5KGVudHJ5KSkge1xuICAgICAgcmV0dXJuIHRoaXMuX25leHRWaWV3TW9kZShlbnRyeSk7XG4gICAgfVxuXG4gICAgbGV0IG5ld1BlcmlvZDogQWpmQ2FsZW5kYXJQZXJpb2R8bnVsbCA9IG51bGw7XG4gICAgaWYgKHRoaXMuX3NlcnZpY2UuaXNFbnRyeVNlbGVjdGVkKGVudHJ5LCB0aGlzLl9zZWxlY3RlZFBlcmlvZCkgPT0gJ2Z1bGwnKSB7XG4gICAgICBuZXdQZXJpb2QgPSBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnZGF5Jykge1xuICAgICAgbmV3UGVyaW9kID0ge3R5cGU6ICdkYXknLCBzdGFydERhdGU6IGVudHJ5LmRhdGUsIGVuZERhdGU6IGVudHJ5LmRhdGV9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5fc2VsZWN0aW9uTW9kZSA9PSAnd2VlaycpIHtcbiAgICAgIG5ld1BlcmlvZCA9IHtcbiAgICAgICAgdHlwZTogJ3dlZWsnLFxuICAgICAgICBzdGFydERhdGU6IHRoaXMuX2lzb01vZGUgPyBzdGFydE9mSVNPV2VlayhlbnRyeS5kYXRlKSA6IHN0YXJ0T2ZXZWVrKGVudHJ5LmRhdGUsIHtcbiAgICAgICAgICB3ZWVrU3RhcnRzT246IHRoaXMuX3N0YXJ0T2ZXZWVrRGF5IGFzIDAgfCAxIHwgMiB8IDMgfCA0IHwgNSB8IDZcbiAgICAgICAgfSksXG4gICAgICAgIGVuZERhdGU6IHRoaXMuX2lzb01vZGUgP1xuICAgICAgICAgICAgZW5kT2ZJU09XZWVrKGVudHJ5LmRhdGUpIDpcbiAgICAgICAgICAgIGVuZE9mV2VlayhlbnRyeS5kYXRlLCB7d2Vla1N0YXJ0c09uOiB0aGlzLl9zdGFydE9mV2Vla0RheSBhcyAwIHwgMSB8IDIgfCAzIHwgNCB8IDUgfCA2fSlcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICdtb250aCcpIHtcbiAgICAgIGNvbnN0IG1vbnRoQm91bmRzID0gdGhpcy5fc2VydmljZS5tb250aEJvdW5kcyhlbnRyeS5kYXRlLCB0aGlzLl9pc29Nb2RlKTtcbiAgICAgIG5ld1BlcmlvZCA9IHtcbiAgICAgICAgdHlwZTogJ21vbnRoJyxcbiAgICAgICAgc3RhcnREYXRlOiBuZXcgRGF0ZShtb250aEJvdW5kcy5zdGFydCksXG4gICAgICAgIGVuZERhdGU6IG5ldyBEYXRlKG1vbnRoQm91bmRzLmVuZClcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLl9zZWxlY3Rpb25Nb2RlID09ICd5ZWFyJykge1xuICAgICAgbmV3UGVyaW9kID0ge1xuICAgICAgICB0eXBlOiAneWVhcicsXG4gICAgICAgIHN0YXJ0RGF0ZTogc3RhcnRPZlllYXIoZW50cnkuZGF0ZSksXG4gICAgICAgIGVuZERhdGU6IGVuZE9mWWVhcihlbnRyeS5kYXRlKVxuICAgICAgfTtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IG5ld1BlcmlvZDtcblxuICAgIHRoaXMuX29uVG91Y2hlZENhbGxiYWNrKCk7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogKHZhbHVlOiBhbnkpID0+IHZvaWQpIHtcbiAgICB0aGlzLl9vbkNoYW5nZUNhbGxiYWNrID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KSB7XG4gICAgdGhpcy5fb25Ub3VjaGVkQ2FsbGJhY2sgPSBmbjtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh0eXBlb2YgdmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICB2YWx1ZSA9IHBhcnNlKHZhbHVlKTtcbiAgICB9XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgdGhpcy5fYnVpbGRDYWxlbmRhcigpO1xuICB9XG5cbiAgbmdBZnRlckNvbnRlbnRJbml0KCk6IHZvaWQge1xuICAgIHRoaXMuX3JlZnJlc2hTZWxlY3Rpb24oKTtcbiAgfVxuXG4gIHByaXZhdGUgX29uQ2hhbmdlQ2FsbGJhY2s6IChfOiBhbnkpID0+IHZvaWQgPSAoXzogYW55KSA9PiB7fTtcbiAgcHJpdmF0ZSBfb25Ub3VjaGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICBwcml2YXRlIF9zZXRWaWV3RGF0ZShkYXRlOiBEYXRlKTogdm9pZCB7XG4gICAgdGhpcy5fdmlld0RhdGUgPSBkYXRlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYnVpbGRDYWxlbmRhcigpOiB2b2lkIHtcbiAgICBjb25zdCBjYWxlbmRhclZpZXcgPSB0aGlzLl9zZXJ2aWNlLmJ1aWxkVmlldyh7XG4gICAgICB2aWV3TW9kZTogdGhpcy5fdmlld01vZGUsXG4gICAgICB2aWV3RGF0ZTogdGhpcy5fdmlld0RhdGUsXG4gICAgICBzZWxlY3Rpb246IHRoaXMuX3NlbGVjdGVkUGVyaW9kLFxuICAgICAgaXNvTW9kZTogdGhpcy5faXNvTW9kZSxcbiAgICAgIG1pbkRhdGU6IHRoaXMuX21pbkRhdGUgPT0gbnVsbCA/IG51bGwgOiBuZXcgRGF0ZSh0aGlzLl9taW5EYXRlKSxcbiAgICAgIG1heERhdGU6IHRoaXMuX21heERhdGUgPT0gbnVsbCA/IG51bGwgOiBuZXcgRGF0ZSh0aGlzLl9tYXhEYXRlKSxcbiAgICB9KTtcbiAgICB0aGlzLl92aWV3SGVhZGVyID0gY2FsZW5kYXJWaWV3LmhlYWRlcjtcbiAgICB0aGlzLl9jYWxlbmRhckhlYWRlcnMgPSBjYWxlbmRhclZpZXcuaGVhZGVyUm93O1xuICAgIHRoaXMuX2NhbGVuZGFyUm93cyA9IGNhbGVuZGFyVmlldy5yb3dzO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlZnJlc2hTZWxlY3Rpb24oKTogdm9pZCB7XG4gICAgZm9yIChsZXQgcm93IG9mIHRoaXMuX2NhbGVuZGFyUm93cykge1xuICAgICAgZm9yIChsZXQgZW50cnkgb2Ygcm93KSB7XG4gICAgICAgIGVudHJ5LnNlbGVjdGVkID0gdGhpcy5fc2VydmljZS5pc0VudHJ5U2VsZWN0ZWQoZW50cnksIHRoaXMuX3NlbGVjdGVkUGVyaW9kKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9jYW5TZWxlY3RFbnRyeShlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IGJvb2xlYW4ge1xuICAgIGlmIChbJ2RheScsICd3ZWVrJ10uaW5kZXhPZih0aGlzLl9zZWxlY3Rpb25Nb2RlKSA+PSAwICYmIGVudHJ5LnR5cGUgIT0gJ2RheScpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuX3NlbGVjdGlvbk1vZGUgPT0gJ21vbnRoJyAmJiBlbnRyeS50eXBlID09ICd5ZWFyJykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX25leHRWaWV3TW9kZShlbnRyeTogQWpmQ2FsZW5kYXJFbnRyeSk6IHZvaWQge1xuICAgIGlmICh0aGlzLl92aWV3TW9kZSA9PSAnZGVjYWRlJykge1xuICAgICAgdGhpcy5fdmlld01vZGUgPSAneWVhcic7XG4gICAgfSBlbHNlIGlmICh0aGlzLl92aWV3TW9kZSA9PSAneWVhcicpIHtcbiAgICAgIHRoaXMuX3ZpZXdNb2RlID0gJ21vbnRoJztcbiAgICB9IGVsc2UgaWYgKHRoaXMuX3ZpZXdNb2RlID09ICdtb250aCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fdmlld0RhdGUgPSBlbnRyeS5kYXRlO1xuICAgIHRoaXMuX2J1aWxkQ2FsZW5kYXIoKTtcbiAgfVxufVxuIl19