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
export class AjfTableFieldComponent extends AjfBaseFieldComponent {
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
AjfTableFieldComponent.ctorParameters = () => [
    { type: ChangeDetectorRef },
    { type: AjfFormRendererService },
    { type: undefined, decorators: [{ type: Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtZmllbGQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy90YWJsZS1maWVsZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGNBQWMsQ0FBQztBQUNuRCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd2RCxPQUFPLEVBQUMseUJBQXlCLEVBQXlCLE1BQU0seUJBQXlCLENBQUM7QUFFMUYsTUFBTSxPQUFnQixzQkFBdUIsU0FBUSxxQkFBNEM7SUFDL0YsWUFDSSxHQUFzQixFQUFFLE9BQStCLEVBQ3BCLEdBQTJCO1FBQ2hFLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO0lBQzNCLENBQUM7SUFFRCxZQUFZLENBQUMsRUFBUyxFQUFFLEdBQVcsRUFBRSxNQUFjO1FBQ2pELElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsTUFBTSxHQUFHLEdBQUc7WUFDbkMsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUM7WUFDaEYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxHQUFHLE1BQU0sRUFBRTtZQUNsRCxPQUFPO1NBQ1I7UUFDRCxNQUFNLFNBQVMsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUM7UUFDeEQsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUF3QixDQUFDO1FBQ2xGLElBQUksTUFBTSxHQUFHLENBQUMsSUFBSSxTQUFTLEVBQUU7WUFDM0IsTUFBTSxHQUFHLENBQUMsQ0FBQztZQUNYLElBQUksR0FBRyxHQUFHLENBQUMsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxNQUFNLEVBQUU7Z0JBQzVDLEdBQUcsR0FBRyxDQUFDLENBQUM7YUFDVDtpQkFBTTtnQkFDTCxHQUFHLElBQUksQ0FBQyxDQUFDO2FBQ1Y7U0FDRjthQUFNO1lBQ0wsTUFBTSxJQUFJLENBQUMsQ0FBQztTQUNiO1FBQ0QsSUFBSSxPQUFPLFdBQVcsS0FBSyxRQUFRLEVBQUU7WUFDbkMsV0FBVyxDQUFDLElBQUksR0FBRyxLQUFLLENBQUM7U0FDMUI7UUFDRCxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsQ0FBQztRQUM1QixFQUFFLENBQUMsY0FBYyxFQUFFLENBQUM7UUFDcEIsRUFBRSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3ZCLENBQUM7SUFFRCxRQUFRLENBQUMsR0FBVyxFQUFFLE1BQWM7UUFDbEMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO1FBQ3RCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLE1BQU0sQ0FBQyxDQUFDO0lBQzlCLENBQUM7SUFFTyxjQUFjO1FBQ3BCLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDMUQsSUFBSSxPQUFPLElBQUksS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLElBQTRCLENBQUMsSUFBSSxHQUFHLEtBQUssQ0FBQzthQUM1QztRQUNILENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDTixDQUFDO0lBRU8sU0FBUyxDQUFDLEdBQVcsRUFBRSxNQUFjO1FBQzNDLElBQUksR0FBRyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLE1BQU0sSUFBSSxNQUFNLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQzNGLE9BQU87U0FDUjtRQUNELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBd0IsQ0FBQztRQUMvRSxJQUFJLE9BQU8sUUFBUSxLQUFLLFFBQVEsRUFBRTtZQUNoQyxRQUFRLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztTQUN0QjtJQUNILENBQUM7OztZQTlESyxpQkFBaUI7WUFHakIsc0JBQXNCOzRDQVF2QixNQUFNLFNBQUMseUJBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL3RhYmxlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGFibGVGb3JtQ29udHJvbH0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvdGFibGUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmVGFibGVGaWVsZENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudDxBamZUYWJsZUZpZWxkSW5zdGFuY2U+IHtcbiAgY29uc3RydWN0b3IoXG4gICAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UpIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG4gIH1cblxuICBnb1RvTmV4dENlbGwoZXY6IEV2ZW50LCByb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pbnN0YW5jZS5jb250cm9scy5sZW5ndGggPCByb3cgfHxcbiAgICAgICAgKHRoaXMuaW5zdGFuY2UuY29udHJvbHMubGVuZ3RoID49IHJvdyAmJiB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd10ubGVuZ3RoIDwgMSkgfHxcbiAgICAgICAgdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdLmxlbmd0aCA8IGNvbHVtbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByb3dMZW5ndGggPSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV0ubGVuZ3RoO1xuICAgIGNvbnN0IGN1cnJlbnRDZWxsID0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdW2NvbHVtbl0gYXMgQWpmVGFibGVGb3JtQ29udHJvbDtcbiAgICBpZiAoY29sdW1uICsgMSA+PSByb3dMZW5ndGgpIHtcbiAgICAgIGNvbHVtbiA9IDA7XG4gICAgICBpZiAocm93ICsgMSA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzLmxlbmd0aCkge1xuICAgICAgICByb3cgPSAxO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcm93ICs9IDE7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbHVtbiArPSAxO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGN1cnJlbnRDZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgY3VycmVudENlbGwuc2hvdyA9IGZhbHNlO1xuICAgIH1cbiAgICB0aGlzLl9zaG93Q2VsbChyb3csIGNvbHVtbik7XG4gICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICBldi5zdG9wUHJvcGFnYXRpb24oKTtcbiAgfVxuXG4gIGdvVG9DZWxsKHJvdzogbnVtYmVyLCBjb2x1bW46IG51bWJlcik6IHZvaWQge1xuICAgIHRoaXMuX3Jlc2V0Q29udHJvbHMoKTtcbiAgICB0aGlzLl9zaG93Q2VsbChyb3csIGNvbHVtbik7XG4gIH1cblxuICBwcml2YXRlIF9yZXNldENvbnRyb2xzKCk6IHZvaWQge1xuICAgIHRoaXMuaW5zdGFuY2UuY29udHJvbHMuZm9yRWFjaChyb3cgPT4gcm93WzFdLmZvckVhY2goY2VsbCA9PiB7XG4gICAgICBpZiAodHlwZW9mIGNlbGwgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIChjZWxsIGFzIEFqZlRhYmxlRm9ybUNvbnRyb2wpLnNob3cgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIF9zaG93Q2VsbChyb3c6IG51bWJlciwgY29sdW1uOiBudW1iZXIpOiB2b2lkIHtcbiAgICBpZiAocm93ID49IHRoaXMuaW5zdGFuY2UuY29udHJvbHMubGVuZ3RoIHx8IGNvbHVtbiA+PSB0aGlzLmluc3RhbmNlLmNvbnRyb2xzW3Jvd11bMV0ubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IG5leHRDZWxsID0gdGhpcy5pbnN0YW5jZS5jb250cm9sc1tyb3ddWzFdW2NvbHVtbl0gYXMgQWpmVGFibGVGb3JtQ29udHJvbDtcbiAgICBpZiAodHlwZW9mIG5leHRDZWxsICE9PSAnc3RyaW5nJykge1xuICAgICAgbmV4dENlbGwuc2hvdyA9IHRydWU7XG4gICAgfVxuICB9XG59XG4iXX0=