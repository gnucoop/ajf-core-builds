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
import { AfterContentInit, ChangeDetectorRef, OnInit } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfCalendarEntry } from './calendar-entry';
import { AjfCalendarPeriodType } from './calendar-period-type';
import { AjfCalendarPeriod } from './calendar-period';
import { AjfCalendarService } from './calendar-service';
import { AjfCalendarViewMode } from './calendar-view-mode';
import { AjfCalendarWeekDay } from './calendar-week-day';
export declare class AjfCalendarChange {
    source: AjfCalendar;
    period: AjfCalendarPeriod | null;
}
export declare abstract class AjfCalendar implements AfterContentInit, ControlValueAccessor, OnInit {
    private _cdr;
    private _service;
    viewDate: Date;
    private _disabled;
    disabled: boolean;
    private _dateOnlyForDay;
    dateOnlyForDay: boolean;
    private _viewMode;
    viewMode: AjfCalendarViewMode;
    private _selectionMode;
    selectionMode: AjfCalendarPeriodType;
    private _startOfWeekDay;
    startOfWeekDay: AjfCalendarWeekDay;
    private _isoMode;
    isoMode: boolean;
    private _minDate;
    minDate: Date | null;
    private _maxDate;
    maxDate: Date | null;
    private _change;
    readonly change: Observable<AjfCalendarChange>;
    private _selectedPeriod;
    private selectedPeriod;
    value: AjfCalendarPeriod | Date | null;
    readonly calendarHeaders: string[];
    readonly calendarRows: AjfCalendarEntry[][];
    readonly viewHeader: string;
    private _viewDate;
    private _viewHeader;
    private _calendarRows;
    private _calendarHeaders;
    constructor(_cdr: ChangeDetectorRef, _service: AjfCalendarService);
    prevPage(): void;
    nextPage(): void;
    previousViewMode(): void;
    selectEntry(entry: AjfCalendarEntry): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: any): void;
    writeValue(value: any): void;
    ngOnInit(): void;
    ngAfterContentInit(): void;
    private _onChangeCallback;
    private _onTouchedCallback;
    private _setViewDate;
    private _buildCalendar;
    private _refreshSelection;
    private _canSelectEntry;
    private _nextViewMode;
}
