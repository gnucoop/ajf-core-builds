import { AjfCalendarEntry } from './calendar-entry';
import { AjfCalendarEntrySelectedState } from './calendar-entry-selected-state';
import { AjfCalendarPeriod } from './calendar-period';
import { AjfCalendarView } from './calendar-view';
import { AjfCalendarViewMode } from './calendar-view-mode';
import * as i0 from "@angular/core";
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
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfCalendarService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfCalendarService>;
}
