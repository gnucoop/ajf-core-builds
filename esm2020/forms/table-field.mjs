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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2Zvcm1zL3NyYy90YWJsZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQW9CLFNBQVMsRUFBRSxNQUFNLEVBQVksTUFBTSxlQUFlLENBQUM7QUFDOUUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVsQyxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFJbkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7QUFFMUY7Ozs7Ozs7O0dBUUc7QUFFSCxNQUFNLE9BQWdCLHNCQUNwQixTQUFRLHFCQUE0QztJQUtwRCxZQUNFLEdBQXNCLEVBQ3RCLE9BQStCLEVBQ0ksR0FBMkI7UUFFOUQsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFQbkIsdUJBQWtCLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztJQVFoRCxDQUFDO0lBRUQ7Ozs7Ozs7T0FPRztJQUNILFlBQVksQ0FBQyxFQUFTLEVBQUUsR0FBVyxFQUFFLE1BQWM7UUFDakQsSUFDRSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUk7WUFDckIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUc7WUFDbkMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFD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QUlHO0lBQ0ssY0FBYztRQUNwQixJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ3pCLE9BQU87U0FDUjtRQUNELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUNuQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ3BCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUMzQixJQUE0QixDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7YUFDNUM7UUFDSCxDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyxTQUFTLENBQUMsR0FBVyxFQUFFLE1BQWM7UUFDM0MsSUFDRSxJQUFJLENBQUMsUUFBUSxJQUFJLElBQUk7WUFDckIsR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU07WUFDcEMsTUFBTSxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sRUFDL0M7WUFDQSxPQUFPO1NBQ1I7UUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQXdCLENBQUM7UUFDL0UsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7WUFDaEMsUUFBUSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7U0FDdEI7SUFDSCxDQUFDOzttSEE5SW1CLHNCQUFzQix5RkFTaEMseUJBQXlCO3VHQVRmLHNCQUFzQjsyRkFBdEIsc0JBQXNCO2tCQUQzQyxTQUFTOzswQkFVTCxNQUFNOzJCQUFDLHlCQUF5QiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBJbmplY3QsIE9uRGVzdHJveX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1N1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZUZvcm1Db250cm9sfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy90YWJsZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbi8qKlxuICogVGhpcyBjb21wb25lbnQgbWFuYWdlcyB0aGUgdGFibGUgZmllbGQgZGF0YS5cbiAqIEl0IGV4cG9zZXMgbWV0aG9kcyBmb3IgbWFuYWdpbmcgdGhlIGRpc3BsYXkgb2YgY29udHJvbGxlcnMuXG4gKlxuICpcbiAqIEBleHBvcnRcbiAqIEBhYnN0cmFjdFxuICogQGNsYXNzIEFqZlRhYmxlRmllbGRDb21wb25lbnRcbiAqL1xuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmVGFibGVGaWVsZENvbXBvbmVudFxuICBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxBamZUYWJsZUZpZWxkSW5zdGFuY2U+XG4gIGltcGxlbWVudHMgT25EZXN0cm95XG57XG4gIHByaXZhdGUgX2luc3RhbmNlQ2hhbmdlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICAgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSxcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG5cbiAgLyoqXG4gICAqICBzZXQgdGhlIGN1cnJlbnQgY2VsbCBzaG93IHRvIGZhbHNlIGFuZCBzZXQgdGhlIG5leHQgY2VsbCBzaG93IHRvIHRydWUuXG4gICAqXG4gICAqIEBwYXJhbSBldlxuICAgKiBAcGFyYW0gcm93XG4gICAqIEBwYXJhbSBjb2x1bW5cbiAgICogQHJldHVybiB7Kn1cbiAgICovXG4gIGdvVG9OZXh0Q2VsbChldjogRXZlbnQsIHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChcbiAgICAgIHRoaXMuaW5zdGFuY2UgPT0gbnVsbCB8fFxuICAgICAgdGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGggPCByb3cgfHxcbiAgICAgICh0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCA+PSByb3cgJiYgdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddLmxlbmd0aCA8IDEpIHx8XG4gICAgICB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV0ubGVuZ3RoIDwgY29sdW1uXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJvd0xlbmd0aCA9IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXS5sZW5ndGg7XG4gICAgY29uc3QgY3VycmVudENlbGwgPSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV1bY29sdW1uXSBhcyBBamZUYWJsZUZvcm1Db250cm9sO1xuICAgIGlmIChjb2x1bW4gKyAxID49IHJvd0xlbmd0aCkge1xuICAgICAgY29sdW1uID0gMDtcbiAgICAgIGlmIChyb3cgKyAxID49IHRoaXMuaW5zdGFuY2UuY29udHJvbHMubGVuZ3RoKSB7XG4gICAgICAgIHJvdyA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3cgKz0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uICs9IDE7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY3VycmVudENlbGwgIT09ICdzdHJpbmcnKSB7XG4gICAgICBjdXJyZW50Q2VsbC5zaG93ID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX3Nob3dDZWxsKHJvdywgY29sdW1uKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgLyoqXG4gICAqIEl0IHJlc2V0cyBhbGwgY29udHJvbC5zaG93IHRvIGZhbHNlIGFuZCBzZXRzIHRoZSBjb250cm9sLnNob3dcbiAgICogKGlkZW50aWZpZWQgYnkgcm93IGFuZCBjb2x1bW4pIHRvIHRydWUuXG4gICAqXG4gICAqIEBwYXJhbSByb3dcbiAgICogQHBhcmFtIGNvbHVtblxuICAgKi9cbiAgZ29Ub0NlbGwocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXRDb250cm9scygpO1xuICAgIHRoaXMuX3Nob3dDZWxsKHJvdywgY29sdW1uKTtcbiAgfVxuXG4gIG92ZXJyaWRlIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHN1cGVyLm5nT25EZXN0cm95KCk7XG4gICAgdGhpcy5faW5zdGFuY2VDaGFuZ2VTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxuXG4gIHByb3RlY3RlZCBvdmVycmlkZSBfb25JbnN0YW5jZUNoYW5nZSgpOiB2b2lkIHtcbiAgICB0aGlzLl9pbnN0YW5jZUNoYW5nZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIGlmICh0aGlzLmluc3RhbmNlID09IG51bGwpIHtcbiAgICAgIHRoaXMuX2luc3RhbmNlQ2hhbmdlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgc3ViOiBTdWJzY3JpcHRpb247XG4gICAgdGhpcy5pbnN0YW5jZS5jb250cm9scy5mb3JFYWNoKGN0cmxzcyA9PiB7XG4gICAgICBpZiAodHlwZW9mIGN0cmxzcyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3RybHNzKSkge1xuICAgICAgICBjdHJsc3MuZm9yRWFjaChjdHJscyA9PiB7XG4gICAgICAgICAgaWYgKHR5cGVvZiBjdHJscyA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY3RybHMpKSB7XG4gICAgICAgICAgICBjdHJscy5mb3JFYWNoKGN0cmwgPT4ge1xuICAgICAgICAgICAgICBpZiAodHlwZW9mIGN0cmwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGN1clN1YiA9IGN0cmwuY29udHJvbC52YWx1ZUNoYW5nZXMuc3Vic2NyaWJlKCgpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCksXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICh0eXBlb2Ygc3ViID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgICAgIHN1YiA9IGN1clN1YjtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBzdWIuYWRkKGN1clN1Yik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogaXQgc2V0cyBhbGwgY29udHJvbHMgc2hvdyB0byBmYWxzZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3Jlc2V0Q29udHJvbHMoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmZvckVhY2gocm93ID0+XG4gICAgICByb3dbMV0uZm9yRWFjaChjZWxsID0+IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgICAgIChjZWxsIGFzIEFqZlRhYmxlRm9ybUNvbnRyb2wpLnNob3cgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdCBzZXRzIHRoZSBjb250cm9sLnNob3cgKGlkZW50aWZpZWQgYnkgcm93IGFuZCBjb2x1bW4pIHRvIHRydWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSByb3dcbiAgICogQHBhcmFtIGNvbHVtblxuICAgKiBAcmV0dXJuIHsqfVxuICAgKi9cbiAgcHJpdmF0ZSBfc2hvd0NlbGwocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5pbnN0YW5jZSA9PSBudWxsIHx8XG4gICAgICByb3cgPj0gdGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGggfHxcbiAgICAgIGNvbHVtbiA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV0ubGVuZ3RoXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRDZWxsID0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdW2NvbHVtbl0gYXMgQWpmVGFibGVGb3JtQ29udHJvbDtcbiAgICBpZiAodHlwZW9mIG5leHRDZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgbmV4dENlbGwuc2hvdyA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=