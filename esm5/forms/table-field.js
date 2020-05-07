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
import { __extends } from "tslib";
import { ChangeDetectorRef, Inject } from '@angular/core';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
var AjfTableFieldComponent = /** @class */ (function (_super) {
    __extends(AjfTableFieldComponent, _super);
    function AjfTableFieldComponent(cdr, service, was) {
        return _super.call(this, cdr, service, was) || this;
    }
    AjfTableFieldComponent.prototype.goToNextCell = function (ev, row, column) {
        if (this.instance.controls.length < row ||
            (this.instance.controls.length >= row && this.instance.controls[row].length < 1) ||
            this.instance.controls[row][1].length < column) {
            return;
        }
        var rowLength = this.instance.controls[row][1].length;
        var currentCell = this.instance.controls[row][1][column];
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
    };
    AjfTableFieldComponent.prototype.goToCell = function (row, column) {
        this._resetControls();
        this._showCell(row, column);
    };
    AjfTableFieldComponent.prototype._resetControls = function () {
        this.instance.controls.forEach(function (row) { return row[1].forEach(function (cell) {
            if (typeof cell !== 'string') {
                cell.show = false;
            }
        }); });
    };
    AjfTableFieldComponent.prototype._showCell = function (row, column) {
        if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
            return;
        }
        var nextCell = this.instance.controls[row][1][column];
        if (typeof nextCell !== 'string') {
            nextCell.show = true;
        }
    };
    /** @nocollapse */
    AjfTableFieldComponent.ctorParameters = function () { return [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: undefined, decorators: [{ type: Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] }
    ]; };
    return AjfTableFieldComponent;
}(AjfBaseFieldComponent));
export { AjfTableFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy90YWJsZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUFDLGlCQUFpQixFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHdkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBRTFGO0lBQXFELDBDQUE0QztJQUMvRixnQ0FDSSxHQUFzQixFQUFFLE9BQStCLEVBQ3BCLEdBQTJCO2VBQ2hFLGtCQUFNLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDO0lBQzFCLENBQUM7SUFFRCw2Q0FBWSxHQUFaLFVBQWEsRUFBUyxFQUFFLEdBQVcsRUFBRSxNQUFjO1FBQ2pELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUc7WUFDbkMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUNsRCxPQUFPO1NBQ1I7UUFDRCxJQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDeEQsSUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUF3QixDQUFDO1FBQ2xGLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDM0IsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQzVDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDVDtpQkFBTTtnQkFDTCxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ1Y7U0FDRjthQUFNO1lBQ0wsTUFBTSxJQUFJLENBQUMsQ0FBQztTQUNiO1FBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDbkMsV0FBVyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDcEIsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCx5Q0FBUSxHQUFSLFVBQVMsR0FBVyxFQUFFLE1BQWM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTywrQ0FBYyxHQUF0QjtRQUNFLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFBQSxJQUFJO1lBQ3ZELElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxFQUFFO2dCQUMzQixJQUE0QixDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7YUFDNUM7UUFDSCxDQUFDLENBQUMsRUFKb0MsQ0FJcEMsQ0FBQyxDQUFDO0lBQ04sQ0FBQztJQUVPLDBDQUFTLEdBQWpCLFVBQWtCLEdBQVcsRUFBRSxNQUFjO1FBQzNDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQzNGLE9BQU87U0FDUjtRQUNELElBQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBd0IsQ0FBQztRQUMvRSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN0QjtJQUNILENBQUM7OztnQkE5REssaUJBQWlCO2dCQUdqQixzQkFBc0I7Z0RBUXZCLE1BQU0sU0FBQyx5QkFBeUI7O0lBb0R2Qyw2QkFBQztDQUFBLEFBdkRELENBQXFELHFCQUFxQixHQXVEekU7U0F2RHFCLHNCQUFzQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy90YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRhYmxlRm9ybUNvbnRyb2x9IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL3RhYmxlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZlRhYmxlRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQ8QWpmVGFibGVGaWVsZEluc3RhbmNlPiB7XG4gIGNvbnN0cnVjdG9yKFxuICAgICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuICB9XG5cbiAgZ29Ub05leHRDZWxsKGV2OiBFdmVudCwgcm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuaW5zdGFuY2UuY29udHJvbHMubGVuZ3RoIDwgcm93IHx8XG4gICAgICAgICh0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCA+PSByb3cgJiYgdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddLmxlbmd0aCA8IDEpIHx8XG4gICAgICAgIHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXS5sZW5ndGggPCBjb2x1bW4pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgcm93TGVuZ3RoID0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdLmxlbmd0aDtcbiAgICBjb25zdCBjdXJyZW50Q2VsbCA9IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXVtjb2x1bW5dIGFzIEFqZlRhYmxlRm9ybUNvbnRyb2w7XG4gICAgaWYgKGNvbHVtbiArIDEgPj0gcm93TGVuZ3RoKSB7XG4gICAgICBjb2x1bW4gPSAwO1xuICAgICAgaWYgKHJvdyArIDEgPj0gdGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGgpIHtcbiAgICAgICAgcm93ID0gMTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJvdyArPSAxO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBjb2x1bW4gKz0gMTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjdXJyZW50Q2VsbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIGN1cnJlbnRDZWxsLnNob3cgPSBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5fc2hvd0NlbGwocm93LCBjb2x1bW4pO1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG4gICAgZXYuc3RvcFByb3BhZ2F0aW9uKCk7XG4gIH1cblxuICBnb1RvQ2VsbChyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiB2b2lkIHtcbiAgICB0aGlzLl9yZXNldENvbnRyb2xzKCk7XG4gICAgdGhpcy5fc2hvd0NlbGwocm93LCBjb2x1bW4pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzZXRDb250cm9scygpOiB2b2lkIHtcbiAgICB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmZvckVhY2gocm93ID0+IHJvd1sxXS5mb3JFYWNoKGNlbGwgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBjZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgICAoY2VsbCBhcyBBamZUYWJsZUZvcm1Db250cm9sKS5zaG93ID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd0NlbGwocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgaWYgKHJvdyA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCB8fCBjb2x1bW4gPj0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBuZXh0Q2VsbCA9IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXVtjb2x1bW5dIGFzIEFqZlRhYmxlRm9ybUNvbnRyb2w7XG4gICAgaWYgKHR5cGVvZiBuZXh0Q2VsbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgIG5leHRDZWxsLnNob3cgPSB0cnVlO1xuICAgIH1cbiAgfVxufVxuIl19