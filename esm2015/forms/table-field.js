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
import { ChangeDetectorRef, Inject } from '@angular/core';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
let AjfTableFieldComponent = /** @class */ (() => {
    class AjfTableFieldComponent extends AjfBaseFieldComponent {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
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
        goToCell(row, column) {
            this._resetControls();
            this._showCell(row, column);
        }
        _resetControls() {
            this.instance.controls.forEach(row => row[1].forEach(cell => {
                if (typeof cell !== 'string') {
                    cell.show = false;
                }
            }));
        }
        _showCell(row, column) {
            if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
                return;
            }
            const nextCell = this.instance.controls[row][1][column];
            if (typeof nextCell !== 'string') {
                nextCell.show = true;
            }
        }
    }
    /** @nocollapse */
    AjfTableFieldComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: undefined, decorators: [{ type: Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] }
    ];
    return AjfTableFieldComponent;
})();
export { AjfTableFieldComponent };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy90YWJsZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd2RCxPQUFPLEVBQUMseUJBQXlCLEVBQXlCLE1BQU0seUJBQXlCLENBQUM7QUFFMUY7SUFBQSxNQUFzQixzQkFBdUIsU0FBUSxxQkFBNEM7UUFDL0YsWUFDSSxHQUFzQixFQUFFLE9BQStCLEVBQ3BCLEdBQTJCO1lBQ2hFLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUM7UUFFRCxZQUFZLENBQUMsRUFBUyxFQUFFLEdBQVcsRUFBRSxNQUFjO1lBQ2pELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUc7Z0JBQ25DLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxJQUFJLEdBQUcsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO2dCQUNoRixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLEdBQUcsTUFBTSxFQUFFO2dCQUNsRCxPQUFPO2FBQ1I7WUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7WUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUF3QixDQUFDO1lBQ2xGLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLEVBQUU7Z0JBQzNCLE1BQU0sR0FBRyxDQUFDLENBQUM7Z0JBQ1gsSUFBSSxHQUFHLEdBQUcsQ0FBQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sRUFBRTtvQkFDNUMsR0FBRyxHQUFHLENBQUMsQ0FBQztpQkFDVDtxQkFBTTtvQkFDTCxHQUFHLElBQUksQ0FBQyxDQUFDO2lCQUNWO2FBQ0Y7aUJBQU07Z0JBQ0wsTUFBTSxJQUFJLENBQUMsQ0FBQzthQUNiO1lBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7Z0JBQ25DLFdBQVcsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2FBQzFCO1lBQ0QsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDNUIsRUFBRSxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3BCLEVBQUUsQ0FBQyxlQUFlLEVBQUUsQ0FBQztRQUN2QixDQUFDO1FBRUQsUUFBUSxDQUFDLEdBQVcsRUFBRSxNQUFjO1lBQ2xDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUN0QixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM5QixDQUFDO1FBRU8sY0FBYztZQUNwQixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUMxRCxJQUFJLE9BQU8sSUFBSSxLQUFLLFFBQVEsRUFBRTtvQkFDM0IsSUFBNEIsQ0FBQyxJQUFJLEdBQUcsS0FBSyxDQUFDO2lCQUM1QztZQUNILENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDTixDQUFDO1FBRU8sU0FBUyxDQUFDLEdBQVcsRUFBRSxNQUFjO1lBQzNDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO2dCQUMzRixPQUFPO2FBQ1I7WUFDRCxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQXdCLENBQUM7WUFDL0UsSUFBSSxPQUFPLFFBQVEsS0FBSyxRQUFRLEVBQUU7Z0JBQ2hDLFFBQVEsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO2FBQ3RCO1FBQ0gsQ0FBQzs7OztnQkE5REssaUJBQWlCO2dCQUdqQixzQkFBc0I7Z0RBUXZCLE1BQU0sU0FBQyx5QkFBeUI7O0lBb0R2Qyw2QkFBQztLQUFBO1NBdkRxQixzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Q2hhbmdlRGV0ZWN0b3JSZWYsIEluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZUZvcm1Db250cm9sfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy90YWJsZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZUYWJsZUZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50PEFqZlRhYmxlRmllbGRJbnN0YW5jZT4ge1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIGNkcjogQ2hhbmdlRGV0ZWN0b3JSZWYsIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgICBASW5qZWN0KEFKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UpIHdhczogQWpmV2FybmluZ0FsZXJ0U2VydmljZSkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcbiAgfVxuXG4gIGdvVG9OZXh0Q2VsbChldjogRXZlbnQsIHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIGlmICh0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCA8IHJvdyB8fFxuICAgICAgICAodGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGggPj0gcm93ICYmIHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XS5sZW5ndGggPCAxKSB8fFxuICAgICAgICB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV0ubGVuZ3RoIDwgY29sdW1uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJvd0xlbmd0aCA9IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXS5sZW5ndGg7XG4gICAgY29uc3QgY3VycmVudENlbGwgPSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV1bY29sdW1uXSBhcyBBamZUYWJsZUZvcm1Db250cm9sO1xuICAgIGlmIChjb2x1bW4gKyAxID49IHJvd0xlbmd0aCkge1xuICAgICAgY29sdW1uID0gMDtcbiAgICAgIGlmIChyb3cgKyAxID49IHRoaXMuaW5zdGFuY2UuY29udHJvbHMubGVuZ3RoKSB7XG4gICAgICAgIHJvdyA9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByb3cgKz0gMTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgY29sdW1uICs9IDE7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY3VycmVudENlbGwgIT09ICdzdHJpbmcnKSB7XG4gICAgICBjdXJyZW50Q2VsbC5zaG93ID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX3Nob3dDZWxsKHJvdywgY29sdW1uKTtcbiAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuICB9XG5cbiAgZ29Ub0NlbGwocm93OiBudW1iZXIsIGNvbHVtbjogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzZXRDb250cm9scygpO1xuICAgIHRoaXMuX3Nob3dDZWxsKHJvdywgY29sdW1uKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Jlc2V0Q29udHJvbHMoKTogdm9pZCB7XG4gICAgdGhpcy5pbnN0YW5jZS5jb250cm9scy5mb3JFYWNoKHJvdyA9PiByb3dbMV0uZm9yRWFjaChjZWxsID0+IHtcbiAgICAgIGlmICh0eXBlb2YgY2VsbCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgKGNlbGwgYXMgQWpmVGFibGVGb3JtQ29udHJvbCkuc2hvdyA9IGZhbHNlO1xuICAgICAgfVxuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Nob3dDZWxsKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIGlmIChyb3cgPj0gdGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGggfHwgY29sdW1uID49IHRoaXMuaW5zdGFuY2UuY29udHJvbHNbcm93XVsxXS5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgbmV4dENlbGwgPSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV1bY29sdW1uXSBhcyBBamZUYWJsZUZvcm1Db250cm9sO1xuICAgIGlmICh0eXBlb2YgbmV4dENlbGwgIT09ICdzdHJpbmcnKSB7XG4gICAgICBuZXh0Q2VsbC5zaG93ID0gdHJ1ZTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==