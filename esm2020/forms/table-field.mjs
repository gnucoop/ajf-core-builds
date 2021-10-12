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
import { __decorate, __metadata, __param } from "tslib";
import { ChangeDetectorRef, Inject } from '@angular/core';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
/**
 * This component manages the table field data.
 * It exposes methods for managing the display of controllers.
 *
 *
 * @export
 * @abstract
 * @class AjfTableFieldComponent
 */
let AjfTableFieldComponent = class AjfTableFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
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
        if (this.instance.controls.length < row ||
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
    /**
     * it sets all controls show to false.
     *
     * @private
     */
    _resetControls() {
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
        if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
            return;
        }
        const nextCell = this.instance.controls[row][1][column];
        if (typeof nextCell !== 'string') {
            nextCell.show = true;
        }
    }
};
AjfTableFieldComponent = __decorate([
    __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
    __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService, Object])
], AjfTableFieldComponent);
export { AjfTableFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy90YWJsZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHdkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBRTFGOzs7Ozs7OztHQVFHO0FBQ0gsSUFBc0Isc0JBQXNCLEdBQTVDLE1BQXNCLHNCQUF1QixTQUFRLHFCQUE0QztJQUMvRixZQUNJLEdBQXNCLEVBQUUsT0FBK0IsRUFDcEIsR0FBMkI7UUFDaEUsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7SUFDM0IsQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSCxZQUFZLENBQUMsRUFBUyxFQUFFLEdBQVcsRUFBRSxNQUFjO1FBQ2pELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUc7WUFDbkMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUNsRCxPQUFPO1NBQ1I7UUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUF3QixDQUFDO1FBQ2xGLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDM0IsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQzVDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDVDtpQkFBTTtnQkFDTCxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ1Y7U0FDRjthQUFNO1lBQ0wsTUFBTSxJQUFJLENBQUMsQ0FBQztTQUNiO1FBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDbkMsV0FBVyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDcEIsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRDs7Ozs7O09BTUc7SUFDSCxRQUFRLENBQUMsR0FBVyxFQUFFLE1BQWM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFRDs7OztPQUlHO0lBQ0ssY0FBYztRQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzFELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUMzQixJQUE0QixDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7YUFDNUM7UUFDSCxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7O09BT0c7SUFDSyxTQUFTLENBQUMsR0FBVyxFQUFFLE1BQWM7UUFDM0MsSUFBSSxHQUFHLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUU7WUFDM0YsT0FBTztTQUNSO1FBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUF3QixDQUFDO1FBQy9FLElBQUksT0FBTyxRQUFRLEtBQUssUUFBUSxFQUFFO1lBQ2hDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1NBQ3RCO0lBQ0gsQ0FBQztDQUNGLENBQUE7QUFuRnFCLHNCQUFzQjtJQUdyQyxXQUFBLE1BQU0sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFBO3FDQUQ3QixpQkFBaUIsRUFBVyxzQkFBc0I7R0FGdkMsc0JBQXNCLENBbUYzQztTQW5GcUIsc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL3RhYmxlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGFibGVGb3JtQ29udHJvbH0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvdGFibGUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG4vKipcbiAqIFRoaXMgY29tcG9uZW50IG1hbmFnZXMgdGhlIHRhYmxlIGZpZWxkIGRhdGEuXG4gKiBJdCBleHBvc2VzIG1ldGhvZHMgZm9yIG1hbmFnaW5nIHRoZSBkaXNwbGF5IG9mIGNvbnRyb2xsZXJzLlxuICpcbiAqXG4gKiBAZXhwb3J0XG4gKiBAYWJzdHJhY3RcbiAqIEBjbGFzcyBBamZUYWJsZUZpZWxkQ29tcG9uZW50XG4gKi9cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZUYWJsZUZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50PEFqZlRhYmxlRmllbGRJbnN0YW5jZT4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgfVxuXG4gIC8qKlxuICAgKiAgc2V0IHRoZSBjdXJyZW50IGNlbGwgc2hvdyB0byBmYWxzZSBhbmQgc2V0IHRoZSBuZXh0IGNlbGwgc2hvdyB0byB0cnVlLlxuICAgKlxuICAgKiBAcGFyYW0gZXZcbiAgICogQHBhcmFtIHJvd1xuICAgKiBAcGFyYW0gY29sdW1uXG4gICAqIEByZXR1cm4geyp9XG4gICAqL1xuICBnb1RvTmV4dENlbGwoZXY6IEV2ZW50LCByb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGggPCByb3cgfHxcbiAgICAgICAgKHRoaXMuaW5zdGFuY2UuY29udHJvbHMubGVuZ3RoID49IHJvdyAmJiB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd10ubGVuZ3RoIDwgMSkgfHxcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdLmxlbmd0aCA8IGNvbHVtbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByb3dMZW5ndGggPSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV0ubGVuZ3RoO1xuICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdW2NvbHVtbl0gYXMgQWpmVGFibGVGb3JtQ29udHJvbDtcbiAgICBpZiAoY29sdW1uICsgMSA+PSByb3dMZW5ndGgpIHtcbiAgICAgIGNvbHVtbiA9IDA7XG4gICAgICBpZiAocm93ICsgMSA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCkge1xuICAgICAgICByb3cgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm93ICs9IDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbHVtbiArPSAxO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGN1cnJlbnRDZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgY3VycmVudENlbGwuc2hvdyA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9zaG93Q2VsbChyb3csIGNvbHVtbik7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdCByZXNldHMgYWxsIGNvbnRyb2wuc2hvdyB0byBmYWxzZSBhbmQgc2V0cyB0aGUgY29udHJvbC5zaG93XG4gICAqIChpZGVudGlmaWVkIGJ5IHJvdyBhbmQgY29sdW1uKSB0byB0cnVlLlxuICAgKlxuICAgKiBAcGFyYW0gcm93XG4gICAqIEBwYXJhbSBjb2x1bW5cbiAgICovXG4gIGdvVG9DZWxsKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0Q29udHJvbHMoKTtcbiAgICB0aGlzLl9zaG93Q2VsbChyb3csIGNvbHVtbik7XG4gIH1cblxuICAvKipcbiAgICogaXQgc2V0cyBhbGwgY29udHJvbHMgc2hvdyB0byBmYWxzZS5cbiAgICpcbiAgICogQHByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgX3Jlc2V0Q29udHJvbHMoKTogdm9pZCB7XG4gICAgdGhpcy5pbnN0YW5jZS5jb250cm9scy5mb3JFYWNoKHJvdyA9PiByb3dbMV0uZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2VsbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgKGNlbGwgYXMgQWpmVGFibGVGb3JtQ29udHJvbCkuc2hvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBJdCBzZXRzIHRoZSBjb250cm9sLnNob3cgKGlkZW50aWZpZWQgYnkgcm93IGFuZCBjb2x1bW4pIHRvIHRydWUuXG4gICAqXG4gICAqIEBwcml2YXRlXG4gICAqIEBwYXJhbSByb3dcbiAgICogQHBhcmFtIGNvbHVtblxuICAgKiBAcmV0dXJuIHsqfVxuICAgKi9cbiAgcHJpdmF0ZSBfc2hvd0NlbGwocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHJvdyA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCB8fCBjb2x1bW4gPj0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0Q2VsbCA9IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXVtjb2x1bW5dIGFzIEFqZlRhYmxlRm9ybUNvbnRyb2w7XG4gICAgaWYgKHR5cGVvZiBuZXh0Q2VsbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5leHRDZWxsLnNob3cgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19