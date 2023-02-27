import * as i0 from '@angular/core';
import { InjectionToken, EventEmitter, Directive, Inject, Input, Output, NgModule } from '@angular/core';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { __awaiter } from 'tslib';

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
const AJF_ECHARTS_PROVIDER = new InjectionToken('AJF_ECHARTS_PROVIDER');

/// <reference types="resize-observer-browser" />
class AjfEchartsDirective {
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
AjfEchartsDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfEchartsDirective, deps: [{ token: AJF_ECHARTS_PROVIDER }, { token: i0.ElementRef }, { token: i0.NgZone }], target: i0.ɵɵFactoryTarget.Directive });
AjfEchartsDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfEchartsDirective, selector: "[ajfEcharts]", inputs: { theme: "theme", renderer: "renderer", options: "options" }, outputs: { chartInit: "chartInit" }, exportAs: ["ajfEcharts"], usesOnChanges: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfEchartsDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ajfEcharts]', exportAs: 'ajfEcharts' }]
        }], ctorParameters: function () {
        return [{ type: undefined, decorators: [{
                        type: Inject,
                        args: [AJF_ECHARTS_PROVIDER]
                    }] }, { type: i0.ElementRef }, { type: i0.NgZone }];
    }, propDecorators: { theme: [{
                type: Input
            }], renderer: [{
                type: Input
            }], options: [{
                type: Input
            }], chartInit: [{
                type: Output
            }] } });

class AjfEchartsModule {
    static forRoot(config) {
        let echarts = config.echarts;
        if (typeof echarts !== 'function') {
            echarts = (() => __awaiter(this, void 0, void 0, function* () { return echarts; }));
        }
        return {
            ngModule: AjfEchartsModule,
            providers: [{ provide: AJF_ECHARTS_PROVIDER, useValue: echarts }],
        };
    }
}
AjfEchartsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfEchartsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfEchartsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfEchartsModule, declarations: [AjfEchartsDirective], exports: [AjfEchartsDirective] });
AjfEchartsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfEchartsModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfEchartsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AjfEchartsDirective],
                    exports: [AjfEchartsDirective],
                }]
        }] });

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

/**
 * Generated bundle index. Do not edit.
 */

export { AJF_ECHARTS_PROVIDER, AjfEchartsDirective, AjfEchartsModule };
//# sourceMappingURL=ajf-core-echarts.mjs.map
