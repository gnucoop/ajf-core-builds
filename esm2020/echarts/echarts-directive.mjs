/// <reference types="resize-observer-browser" />
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
/// <reference types="resize-observer-browser" />
import { Directive, EventEmitter, Inject, Input, Output, } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { AJF_ECHARTS_PROVIDER } from './echarts-config';
import * as i0 from "@angular/core";
export class AjfEchartsDirective {
    constructor(_echartsProvider, el, _ngZone) {
        this._echartsProvider = _echartsProvider;
        this._ngZone = _ngZone;
        this._renderer = 'canvas';
        this.chartInit = new EventEmitter();
        this._resizeEvent = new EventEmitter();
        this._resizeSub = Subscription.EMPTY;
        this._container = el.nativeElement;
        if (typeof ResizeObserver !== 'undefined') {
            this._resizeObserver = new ResizeObserver(() => this._onResize());
        }
    }
    set theme(theme) {
        this._theme = theme;
    }
    set renderer(renderer) {
        this._renderer = renderer;
    }
    set options(options) {
        this._options = options;
    }
    ngOnChanges(changes) {
        if (changes['theme'] != null || changes['renderer'] != null) {
            this._destroyChart();
            this._initChart();
        }
        else if (changes['options'] != null) {
            if (this._options) {
                if (this._chart != null) {
                    this._chart.setOption(this._options);
                }
                else {
                    this._initChart();
                }
            }
            else {
                this._destroyChart();
            }
        }
    }
    ngOnDestroy() {
        if (this._resizeObserver != null) {
            this._resizeObserver.unobserve(this._container);
            this._resizeObserver.disconnect();
        }
        this._resizeEvent.complete();
        this._resizeSub.unsubscribe();
        this._destroyChart();
    }
    ngOnInit() {
        if (this._resizeObserver != null) {
            this._resizeObserver.observe(this._container);
            this._resizeSub = this._resizeEvent
                .pipe(debounceTime(200))
                .subscribe(() => this._resizeChart());
        }
        this._ngZone.runOutsideAngular(() => {
            this._echartsProvider().then(echarts => {
                this._echarts = echarts;
                this._initChart();
            });
        });
    }
    _destroyChart() {
        if (this._chart != null && !this._chart.isDisposed()) {
            this._chart.dispose();
            this._chart = undefined;
        }
    }
    _initChart() {
        if (this._echarts == null) {
            return;
        }
        this._chart = this._echarts.init(this._container, this._theme, { renderer: this._renderer });
        if (this._chart == null) {
            return;
        }
        if (this._options) {
            this._chart.setOption(this._options);
        }
        this.chartInit.emit({ echarts: this._echarts, chart: this._chart });
    }
    _onResize() {
        this._resizeEvent.emit();
    }
    _resizeChart() {
        if (this._chart != null) {
            this._chart.resize();
        }
    }
}
AjfEchartsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfEchartsDirective, deps: [{ token: AJF_ECHARTS_PROVIDER }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
AjfEchartsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfEchartsDirective, selector: "[ajfEcharts]", inputs: { theme: "theme", renderer: "renderer", options: "options" }, outputs: { chartInit: "chartInit" }, exportAs: ["ajfEcharts"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfEchartsDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ajfEcharts]', exportAs: 'ajfEcharts' }]
        }], ctorParameters: function () { return [{ type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_ECHARTS_PROVIDER]
                }] }, { type: i0.ElementRef }, { type: i0.NgZone }]; }, propDecorators: { theme: [{
                type: Input
            }], renderer: [{
                type: Input
            }], options: [{
                type: Input
            }], chartInit: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoYXJ0cy1kaXJlY3RpdmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2VjaGFydHMvc3JjL2VjaGFydHMtZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXNCQSxpREFBaUQ7QUF0QmpEOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILGlEQUFpRDtBQUVqRCxPQUFPLEVBQ0wsU0FBUyxFQUVULFlBQVksRUFDWixNQUFNLEVBQ04sS0FBSyxFQUtMLE1BQU0sR0FFUCxNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ2xDLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU1QyxPQUFPLEVBQXFCLG9CQUFvQixFQUFDLE1BQU0sa0JBQWtCLENBQUM7O0FBVTFFLE1BQU0sT0FBTyxtQkFBbUI7SUE2QjlCLFlBQ3dDLGdCQUFvQyxFQUMxRSxFQUEyQixFQUNuQixPQUFlO1FBRmUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFvQjtRQUVsRSxZQUFPLEdBQVAsT0FBTyxDQUFRO1FBckJqQixjQUFTLEdBQW9CLFFBQVEsQ0FBQztRQVNyQyxjQUFTLEdBQUcsSUFBSSxZQUFZLEVBQXVCLENBQUM7UUFNckQsaUJBQVksR0FBRyxJQUFJLFlBQVksRUFBUSxDQUFDO1FBQ3hDLGVBQVUsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBT3RDLElBQUksQ0FBQyxVQUFVLEdBQUcsRUFBRSxDQUFDLGFBQWEsQ0FBQztRQUNuQyxJQUFJLE9BQU8sY0FBYyxLQUFLLFdBQVcsRUFBRTtZQUN6QyxJQUFJLENBQUMsZUFBZSxHQUFHLElBQUksY0FBYyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsQ0FBQyxDQUFDO1NBQ25FO0lBQ0gsQ0FBQztJQXJDRCxJQUNJLEtBQUssQ0FBQyxLQUFrQztRQUMx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QUMsQ0FBQyxDQUFDO1FBQzNGLElBQUksSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7WUFDdkIsT0FBTztTQUNSO1FBQ0QsSUFBSSxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQ2pCLElBQUksQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztTQUN0QztRQUNELElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEVBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxRQUFRLEVBQUUsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLEVBQUMsQ0FBQyxDQUFDO0lBQ3BFLENBQUM7SUFFTyxTQUFTO1FBQ2YsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUMzQixDQUFDO0lBRU8sWUFBWTtRQUNsQixJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ3ZCLElBQUksQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7U0FDdEI7SUFDSCxDQUFDOztnSEEvR1UsbUJBQW1CLGtCQThCcEIsb0JBQW9CO29HQTlCbkIsbUJBQW1COzJGQUFuQixtQkFBbUI7a0JBRC9CLFNBQVM7bUJBQUMsRUFBQyxRQUFRLEVBQUUsY0FBYyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUM7OzBCQStCeEQsTUFBTTsyQkFBQyxvQkFBb0I7MEZBNUIxQixLQUFLO3NCQURSLEtBQUs7Z0JBT0YsUUFBUTtzQkFEWCxLQUFLO2dCQU9GLE9BQU87c0JBRFYsS0FBSztnQkFPRyxTQUFTO3NCQURqQixNQUFNIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG4vLy8gPHJlZmVyZW5jZSB0eXBlcz1cInJlc2l6ZS1vYnNlcnZlci1icm93c2VyXCIgLz5cblxuaW1wb3J0IHtcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIEluamVjdCxcbiAgSW5wdXQsXG4gIE5nWm9uZSxcbiAgT25DaGFuZ2VzLFxuICBPbkRlc3Ryb3ksXG4gIE9uSW5pdCxcbiAgT3V0cHV0LFxuICBTaW1wbGVDaGFuZ2VzLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7U3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVib3VuY2VUaW1lfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRWNoYXJ0c1Byb3ZpZGVyLCBBSkZfRUNIQVJUU19QUk9WSURFUn0gZnJvbSAnLi9lY2hhcnRzLWNvbmZpZyc7XG5cbmV4cG9ydCB0eXBlIEVDaGFydHNSZW5kZXJlciA9ICdjYW52YXMnIHwgJ3N2Zyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRWNoYXJ0c0luaXRFdmVudCB7XG4gIGVjaGFydHM6IGFueTtcbiAgY2hhcnQ6IGVjaGFydHMuRUNoYXJ0cztcbn1cblxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbYWpmRWNoYXJ0c10nLCBleHBvcnRBczogJ2FqZkVjaGFydHMnfSlcbmV4cG9ydCBjbGFzcyBBamZFY2hhcnRzRGlyZWN0aXZlIGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpXG4gIHNldCB0aGVtZSh0aGVtZTogc3RyaW5nIHwgb2JqZWN0IHwgdW5kZWZpbmVkKSB7XG4gICAgdGhpcy5fdGhlbWUgPSB0aGVtZTtcbiAgfVxuICBwcml2YXRlIF90aGVtZT86IHN0cmluZyB8IG9iamVjdDtcblxuICBASW5wdXQoKVxuICBzZXQgcmVuZGVyZXIocmVuZGVyZXI6IEVDaGFydHNSZW5kZXJlcikge1xuICAgIHRoaXMuX3JlbmRlcmVyID0gcmVuZGVyZXI7XG4gIH1cbiAgcHJpdmF0ZSBfcmVuZGVyZXI6IEVDaGFydHNSZW5kZXJlciA9ICdjYW52YXMnO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBvcHRpb25zKG9wdGlvbnM6IGVjaGFydHMuRUNoYXJ0c09wdGlvbiB8IHVuZGVmaW5lZCkge1xuICAgIHRoaXMuX29wdGlvbnMgPSBvcHRpb25zO1xuICB9XG4gIHByaXZhdGUgX29wdGlvbnM/OiBlY2hhcnRzLkVDaGFydHNPcHRpb247XG5cbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGNoYXJ0SW5pdCA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRWNoYXJ0c0luaXRFdmVudD4oKTtcblxuICBwcml2YXRlIF9lY2hhcnRzPzogYW55O1xuICBwcml2YXRlIF9jb250YWluZXI6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIF9jaGFydD86IGVjaGFydHMuRUNoYXJ0cztcbiAgcHJpdmF0ZSBfcmVzaXplT2JzZXJ2ZXI/OiBSZXNpemVPYnNlcnZlcjtcbiAgcHJpdmF0ZSBfcmVzaXplRXZlbnQgPSBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCk7XG4gIHByaXZhdGUgX3Jlc2l6ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBASW5qZWN0KEFKRl9FQ0hBUlRTX1BST1ZJREVSKSBwcml2YXRlIF9lY2hhcnRzUHJvdmlkZXI6IEFqZkVjaGFydHNQcm92aWRlcixcbiAgICBlbDogRWxlbWVudFJlZjxIVE1MRWxlbWVudD4sXG4gICAgcHJpdmF0ZSBfbmdab25lOiBOZ1pvbmUsXG4gICkge1xuICAgIHRoaXMuX2NvbnRhaW5lciA9IGVsLm5hdGl2ZUVsZW1lbnQ7XG4gICAgaWYgKHR5cGVvZiBSZXNpemVPYnNlcnZlciAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHRoaXMuX29uUmVzaXplKCkpO1xuICAgIH1cbiAgfVxuXG4gIG5nT25DaGFuZ2VzKGNoYW5nZXM6IFNpbXBsZUNoYW5nZXMpOiB2b2lkIHtcbiAgICBpZiAoY2hhbmdlc1sndGhlbWUnXSAhPSBudWxsIHx8IGNoYW5nZXNbJ3JlbmRlcmVyJ10gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fZGVzdHJveUNoYXJ0KCk7XG4gICAgICB0aGlzLl9pbml0Q2hhcnQoKTtcbiAgICB9IGVsc2UgaWYgKGNoYW5nZXNbJ29wdGlvbnMnXSAhPSBudWxsKSB7XG4gICAgICBpZiAodGhpcy5fb3B0aW9ucykge1xuICAgICAgICBpZiAodGhpcy5fY2hhcnQgIT0gbnVsbCkge1xuICAgICAgICAgIHRoaXMuX2NoYXJ0LnNldE9wdGlvbih0aGlzLl9vcHRpb25zKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0aGlzLl9pbml0Q2hhcnQoKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5fZGVzdHJveUNoYXJ0KCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Jlc2l6ZU9ic2VydmVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyLnVub2JzZXJ2ZSh0aGlzLl9jb250YWluZXIpO1xuICAgICAgdGhpcy5fcmVzaXplT2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgIH1cbiAgICB0aGlzLl9yZXNpemVFdmVudC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX3Jlc2l6ZVN1Yi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Rlc3Ryb3lDaGFydCgpO1xuICB9XG5cbiAgbmdPbkluaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX3Jlc2l6ZU9ic2VydmVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3Jlc2l6ZU9ic2VydmVyLm9ic2VydmUodGhpcy5fY29udGFpbmVyKTtcbiAgICAgIHRoaXMuX3Jlc2l6ZVN1YiA9IHRoaXMuX3Jlc2l6ZUV2ZW50XG4gICAgICAgIC5waXBlKGRlYm91bmNlVGltZSgyMDApKVxuICAgICAgICAuc3Vic2NyaWJlKCgpID0+IHRoaXMuX3Jlc2l6ZUNoYXJ0KCkpO1xuICAgIH1cbiAgICB0aGlzLl9uZ1pvbmUucnVuT3V0c2lkZUFuZ3VsYXIoKCkgPT4ge1xuICAgICAgdGhpcy5fZWNoYXJ0c1Byb3ZpZGVyKCkudGhlbihlY2hhcnRzID0+IHtcbiAgICAgICAgdGhpcy5fZWNoYXJ0cyA9IGVjaGFydHM7XG4gICAgICAgIHRoaXMuX2luaXRDaGFydCgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9kZXN0cm95Q2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ICE9IG51bGwgJiYgIXRoaXMuX2NoYXJ0LmlzRGlzcG9zZWQoKSkge1xuICAgICAgdGhpcy5fY2hhcnQuZGlzcG9zZSgpO1xuICAgICAgdGhpcy5fY2hhcnQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdENoYXJ0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9lY2hhcnRzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fY2hhcnQgPSB0aGlzLl9lY2hhcnRzLmluaXQodGhpcy5fY29udGFpbmVyLCB0aGlzLl90aGVtZSwge3JlbmRlcmVyOiB0aGlzLl9yZW5kZXJlcn0pO1xuICAgIGlmICh0aGlzLl9jaGFydCA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLl9vcHRpb25zKSB7XG4gICAgICB0aGlzLl9jaGFydC5zZXRPcHRpb24odGhpcy5fb3B0aW9ucyk7XG4gICAgfVxuICAgIHRoaXMuY2hhcnRJbml0LmVtaXQoe2VjaGFydHM6IHRoaXMuX2VjaGFydHMsIGNoYXJ0OiB0aGlzLl9jaGFydH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfb25SZXNpemUoKTogdm9pZCB7XG4gICAgdGhpcy5fcmVzaXplRXZlbnQuZW1pdCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVzaXplQ2hhcnQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2NoYXJ0ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2NoYXJ0LnJlc2l6ZSgpO1xuICAgIH1cbiAgfVxufVxuIl19