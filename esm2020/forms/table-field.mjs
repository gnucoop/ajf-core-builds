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
import { Directive, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { AjfBaseFieldComponent } from './base-field';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
/**
 * This component manages the table field data.
 * It exposes methods for managing the display of controllers.
 *
 *
 * @export
 * @abstract
 * @class AjfTableFieldComponent
 */
export class AjfTableFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this._instanceChangeSub = Subscription.EMPTY;
    }
    /**
     *  set the current cell show to false and set the next cell show to true.
     *
     * @param ev
     * @param row
     * @param column
     * @return {*}
     */
    goToNextCell(ev, row, column) {
        if (this.instance == null ||
            this.instance.controls.length < row ||
            (this.instance.controls.length >= row && this.instance.controls[row].length < 1) ||
            this.instance.controls[row][1].length < column) {
            return;
        }
        const rowLength = this.instance.controls[row][1].length;
        const currentCell = this.instance.controls[row][1][column];
        if (column + 1 >= rowLength) {
            column = 0;
            if (row + 1 >= this.instance.controls.length) {
                row = 1;
            }
            else {
                row += 1;
            }
        }
        else {
            column += 1;
        }
        if (typeof currentCell !== 'string') {
            currentCell.show = false;
        }
        this._showCell(row, column);
        ev.preventDefault();
        ev.stopPropagation();
    }
    /**
     * It resets all control.show to false and sets the control.show
     * (identified by row and column) to true.
     *
     * @param row
     * @param column
     */
    goToCell(row, column) {
        this._resetControls();
        this._showCell(row, column);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._instanceChangeSub.unsubscribe();
    }
    _onInstanceChange() {
        this._instanceChangeSub.unsubscribe();
        if (this.instance == null) {
            this._instanceChangeSub = Subscription.EMPTY;
            return;
        }
        let sub;
        this.instance.controls.forEach(ctrlss => {
            if (typeof ctrlss === 'string') {
                return;
            }
            if (Array.isArray(ctrlss)) {
                ctrlss.forEach(ctrls => {
                    if (typeof ctrls === 'string') {
                        return;
                    }
                    if (Array.isArray(ctrls)) {
                        ctrls.forEach(ctrl => {
                            if (typeof ctrl === 'string') {
                                return;
                            }
                            const curSub = ctrl.control.valueChanges.subscribe(() => this._changeDetectorRef.markForCheck());
                            if (typeof sub === 'undefined') {
                                sub = curSub;
                            }
                            else {
                                sub.add(curSub);
                            }
                        });
                    }
                });
            }
        });
    }
    /**
     * it sets all controls show to false.
     *
     * @private
     */
    _resetControls() {
        if (this.instance == null) {
            return;
        }
        this.instance.controls.forEach(row => row[1].forEach(cell => {
            if (typeof cell !== 'string') {
                cell.show = false;
            }
        }));
    }
    /**
     * It sets the control.show (identified by row and column) to true.
     *
     * @private
     * @param row
     * @param column
     * @return {*}
     */
    _showCell(row, column) {
        if (this.instance == null ||
            row >= this.instance.controls.length ||
            column >= this.instance.controls[row][1].length) {
            return;
        }
        const nextCell = this.instance.controls[row][1][column];
        if (typeof nextCell !== 'string') {
            nextCell.show = true;
        }
    }
}
AjfTableFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Directive });
AjfTableFieldComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfTableFieldComponent, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableFieldComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy90YWJsZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQW9CLFNBQVMsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFHbkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7QUFFMUY7Ozs7Ozs7O0dBUUc7QUFFSCxNQUFNLE9BQWdCLHNCQUNwQixTQUFRLHFCQUE0QztJQUtwRCxZQUNFLEdBQXNCLEVBQ3RCLE9BQStCLEVBQ0ksR0FBMkI7UUFFOUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFQbkIsdUJBQWtCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQVFoRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFlBQVksQ0FBQyxFQUFTLEVBQUUsR0FBVyxFQUFFLE1BQWM7UUFDakQsSUFDRSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUk7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUc7WUFDbkMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFD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SUc7SUFDSyxjQUFjO1FBQ3BCLElBQUksSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJLEVBQUU7WUFDekIsT0FBTztTQUNSO1FBQ0QsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ25DLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDcEIsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzVCLElBQUksQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2FBQ25CO1FBQ0gsQ0FBQyxDQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7OztPQU9HO0lBQ0ssU0FBUyxDQUFDLEdBQVcsRUFBRSxNQUFjO1FBQzNDLElBQ0UsSUFBSSxDQUFDLFFBQVEsSUFBSSxJQUFJO1lBQ3JCLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNO1lBQ3BDLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQy9DO1lBQ0EsT0FBTztTQUNSO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDeEQsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDdEI7SUFDSCxDQUFDOzttSEE5SW1CLHNCQUFzQix5RkFTaEMseUJBQXlCO3VHQVRmLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQUQzQyxTQUFTOzswQkFVTCxNQUFNOzJCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBJbmplY3QsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgbWFuYWdlcyB0aGUgdGFibGUgZmllbGQgZGF0YS5cbiAqIEl0IGV4cG9zZXMgbWV0aG9kcyBmb3IgbWFuYWdpbmcgdGhlIGRpc3BsYXkgb2YgY29udHJvbGxlcnMuXG4gKlxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICogQGNsYXNzIEFqZlRhYmxlRmllbGRDb21wb25lbnRcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmVGFibGVGaWVsZENvbXBvbmVudFxuICBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxBamZUYWJsZUZpZWxkSW5zdGFuY2U+XG4gIGltcGxlbWVudHMgT25EZXN0cm95XG57XG4gIHByaXZhdGUgX2luc3RhbmNlQ2hhbmdlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG5cbiAgLyoqXG4gICAqICBzZXQgdGhlIGN1cnJlbnQgY2VsbCBzaG93IHRvIGZhbHNlIGFuZCBzZXQgdGhlIG5leHQgY2VsbCBzaG93IHRvIHRydWUuXG4gICAqXG4gICAqIEBwYXJhbSBldlxuICAgKiBAcGFyYW0gcm93XG4gICAqIEBwYXJhbSBjb2x1bW5cbiAgICogQHJldHVybiB7Kn1cbiAgICovXG4gIGdvVG9OZXh0Q2VsbChldjogRXZlbnQsIHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaW5zdGFuY2UgPT0gbnVsbCB8fFxuICAgICAgdGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGggPCByb3cgfHxcbiAgICAgICh0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCA+PSByb3cgJiYgdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddLmxlbmd0aCA8IDEpIHx8XG4gICAgICB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV0ubGVuZ3RoIDwgY29sdW1uXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJvd0xlbmd0aCA9IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXS5sZW5ndGg7XG4gICAgY29uc3QgY3VycmVudENlbGwgPSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV1bY29sdW1uXTtcbiAgICBpZiAoY29sdW1uICsgMSA+PSByb3dMZW5ndGgpIHtcbiAgICAgIGNvbHVtbiA9IDA7XG4gICAgICBpZiAocm93ICsgMSA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCkge1xuICAgICAgICByb3cgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm93ICs9IDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbHVtbiArPSAxO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGN1cnJlbnRDZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgY3VycmVudENlbGwuc2hvdyA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9zaG93Q2VsbChyb3csIGNvbHVtbik7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdCByZXNldHMgYWxsIGNvbnRyb2wuc2hvdyB0byBmYWxzZSBhbmQgc2V0cyB0aGUgY29udHJvbC5zaG93XG4gICAqIChpZGVudGlmaWVkIGJ5IHJvdyBhbmQgY29sdW1uKSB0byB0cnVlLlxuICAgKlxuICAgKiBAcGFyYW0gcm93XG4gICAqIEBwYXJhbSBjb2x1bW5cbiAgICovXG4gIGdvVG9DZWxsKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0Q29udHJvbHMoKTtcbiAgICB0aGlzLl9zaG93Q2VsbChyb3csIGNvbHVtbik7XG4gIH1cblxuICBvdmVycmlkZSBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICBzdXBlci5uZ09uRGVzdHJveSgpO1xuICAgIHRoaXMuX2luc3RhbmNlQ2hhbmdlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cblxuICBwcm90ZWN0ZWQgb3ZlcnJpZGUgX29uSW5zdGFuY2VDaGFuZ2UoKTogdm9pZCB7XG4gICAgdGhpcy5faW5zdGFuY2VDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgICBpZiAodGhpcy5pbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICB0aGlzLl9pbnN0YW5jZUNoYW5nZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgbGV0IHN1YjogU3Vic2NyaXB0aW9uO1xuICAgIHRoaXMuaW5zdGFuY2UuY29udHJvbHMuZm9yRWFjaChjdHJsc3MgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjdHJsc3MgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChBcnJheS5pc0FycmF5KGN0cmxzcykpIHtcbiAgICAgICAgY3RybHNzLmZvckVhY2goY3RybHMgPT4ge1xuICAgICAgICAgIGlmICh0eXBlb2YgY3RybHMgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChBcnJheS5pc0FycmF5KGN0cmxzKSkge1xuICAgICAgICAgICAgY3RybHMuZm9yRWFjaChjdHJsID0+IHtcbiAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjdHJsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjdXJTdWIgPSBjdHJsLmNvbnRyb2wudmFsdWVDaGFuZ2VzLnN1YnNjcmliZSgoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpLFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIHN1YiA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgICAgICAgICBzdWIgPSBjdXJTdWI7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc3ViLmFkZChjdXJTdWIpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIGl0IHNldHMgYWxsIGNvbnRyb2xzIHNob3cgdG8gZmFsc2UuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBwcml2YXRlIF9yZXNldENvbnRyb2xzKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmluc3RhbmNlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5pbnN0YW5jZS5jb250cm9scy5mb3JFYWNoKHJvdyA9PlxuICAgICAgcm93WzFdLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgY2VsbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBjZWxsLnNob3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdCBzZXRzIHRoZSBjb250cm9sLnNob3cgKGlkZW50aWZpZWQgYnkgcm93IGFuZCBjb2x1bW4pIHRvIHRydWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSByb3dcbiAgICogQHBhcmFtIGNvbHVtblxuICAgKiBAcmV0dXJuIHsqfVxuICAgKi9cbiAgcHJpdmF0ZSBfc2hvd0NlbGwocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5pbnN0YW5jZSA9PSBudWxsIHx8XG4gICAgICByb3cgPj0gdGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGggfHxcbiAgICAgIGNvbHVtbiA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV0ubGVuZ3RoXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRDZWxsID0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdW2NvbHVtbl07XG4gICAgaWYgKHR5cGVvZiBuZXh0Q2VsbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5leHRDZWxsLnNob3cgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19