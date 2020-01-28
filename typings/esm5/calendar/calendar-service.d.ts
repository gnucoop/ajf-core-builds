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
import { AjfCalendarEntry } from './calendar-entry';
import { AjfCalendarEntrySelectedState } from './calendar-entry-selected-state';
import { AjfCalendarPeriod } from './calendar-period';
import { AjfCalendarView } from './calendar-view';
import { AjfCalendarViewMode } from './calendar-view-mode';
export interface AjfCalendarParams {
    viewMode: AjfCalendarViewMode;
    viewDate: Date;
    selection: AjfCalendarPeriod | null;
    isoMode: boolean;
    minDate: Date | null;
    maxDate: Date | null;
}
export declare class AjfCalendarService {
    buildView(params: AjfCalendarParams): AjfCalendarView;
    monthBounds(date: Date, isoMode: boolean): {
        start: Date;
        end: Date;
    };
    getEntryRange(entry: AjfCalendarEntry): {
        start: Date;
        end: Date;
    };
    isEntrySelected(entry: AjfCalendarEntry, selection: AjfCalendarPeriod | null): AjfCalendarEntrySelectedState;
    entryLabel(entry: AjfCalendarEntry): string;
    nextView(viewDate: Date, viewMode: AjfCalendarViewMode): Date;
    previousView(viewDate: Date, viewMode: AjfCalendarViewMode): Date;
    private _monthHeaderRow;
    private _decadeCalendarRows;
    private _yearCalendarRows;
    private _monthCalendarRows;
}
