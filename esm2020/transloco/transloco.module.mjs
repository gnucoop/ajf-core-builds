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
import { NgModule } from '@angular/core';
import { TRANSLOCO_CONFIG, TRANSLOCO_MISSING_HANDLER, translocoConfig, TranslocoModule, TranslocoService, } from '@ngneat/transloco';
import { langs } from './lang';
import { MissingHandler } from './transloco-missing-handler';
import * as i0 from "@angular/core";
import * as i1 from "@ngneat/transloco";
const availableLangs = ['ENG', 'ESP', 'FRA', 'ITA', 'PRT', 'ETH'];
export class AjfTranslocoModule {
    constructor(ts) {
        availableLangs.forEach(lang => {
            if (langs[lang] != null) {
                ts.setTranslation(langs[lang], lang);
            }
        });
    }
    static forRoot() {
        return {
            ngModule: AjfTranslocoModule,
            providers: [TranslocoService],
        };
    }
}
AjfTranslocoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfTranslocoModule, deps: [{ token: i1.TranslocoService }], target: i0.ɵɵFactoryTarget.NgModule });
AjfTranslocoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfTranslocoModule, imports: [TranslocoModule], exports: [TranslocoModule] });
AjfTranslocoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfTranslocoModule, providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs,
                defaultLang: 'ENG',
                reRenderOnLangChange: true,
                prodMode: false,
            }),
        },
        { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler },
    ], imports: [[TranslocoModule], TranslocoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfTranslocoModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [TranslocoModule],
                    exports: [TranslocoModule],
                    providers: [
                        {
                            provide: TRANSLOCO_CONFIG,
                            useValue: translocoConfig({
                                availableLangs,
                                defaultLang: 'ENG',
                                reRenderOnLangChange: true,
                                prodMode: false,
                            }),
                        },
                        { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslocoService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RyYW5zbG9jby90cmFuc2xvY28ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIseUJBQXlCLEVBQ3pCLGVBQWUsRUFDZixlQUFlLEVBQ2YsZ0JBQWdCLEdBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUM3QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7OztBQUMzRCxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFpQmxFLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBWSxFQUFvQjtRQUM5QixjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDdkIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRSxDQUFDLGdCQUFnQixDQUFDO1NBQzlCLENBQUM7SUFDSixDQUFDOztvSEFiVSxrQkFBa0I7cUhBQWxCLGtCQUFrQixZQWZuQixlQUFlLGFBQ2YsZUFBZTtxSEFjZCxrQkFBa0IsYUFibEI7UUFDVDtZQUNFLE9BQU8sRUFBRSxnQkFBZ0I7WUFDekIsUUFBUSxFQUFFLGVBQWUsQ0FBQztnQkFDeEIsY0FBYztnQkFDZCxXQUFXLEVBQUUsS0FBSztnQkFDbEIsb0JBQW9CLEVBQUUsSUFBSTtnQkFDMUIsUUFBUSxFQUFFLEtBQUs7YUFDaEIsQ0FBQztTQUNIO1FBQ0QsRUFBQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQztLQUMvRCxZQWJRLENBQUMsZUFBZSxDQUFDLEVBQ2hCLGVBQWU7Z0dBY2Qsa0JBQWtCO2tCQWhCOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFFBQVEsRUFBRSxlQUFlLENBQUM7Z0NBQ3hCLGNBQWM7Z0NBQ2QsV0FBVyxFQUFFLEtBQUs7Z0NBQ2xCLG9CQUFvQixFQUFFLElBQUk7Z0NBQzFCLFFBQVEsRUFBRSxLQUFLOzZCQUNoQixDQUFDO3lCQUNIO3dCQUNELEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7cUJBQy9EO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFRSQU5TTE9DT19DT05GSUcsXG4gIFRSQU5TTE9DT19NSVNTSU5HX0hBTkRMRVIsXG4gIHRyYW5zbG9jb0NvbmZpZyxcbiAgVHJhbnNsb2NvTW9kdWxlLFxuICBUcmFuc2xvY29TZXJ2aWNlLFxufSBmcm9tICdAbmduZWF0L3RyYW5zbG9jbyc7XG5cbmltcG9ydCB7bGFuZ3N9IGZyb20gJy4vbGFuZyc7XG5pbXBvcnQge01pc3NpbmdIYW5kbGVyfSBmcm9tICcuL3RyYW5zbG9jby1taXNzaW5nLWhhbmRsZXInO1xuY29uc3QgYXZhaWxhYmxlTGFuZ3MgPSBbJ0VORycsICdFU1AnLCAnRlJBJywgJ0lUQScsICdQUlQnLCAnRVRIJ107XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbVHJhbnNsb2NvTW9kdWxlXSxcbiAgZXhwb3J0czogW1RyYW5zbG9jb01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IFRSQU5TTE9DT19DT05GSUcsXG4gICAgICB1c2VWYWx1ZTogdHJhbnNsb2NvQ29uZmlnKHtcbiAgICAgICAgYXZhaWxhYmxlTGFuZ3MsXG4gICAgICAgIGRlZmF1bHRMYW5nOiAnRU5HJyxcbiAgICAgICAgcmVSZW5kZXJPbkxhbmdDaGFuZ2U6IHRydWUsXG4gICAgICAgIHByb2RNb2RlOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgIH0sXG4gICAge3Byb3ZpZGU6IFRSQU5TTE9DT19NSVNTSU5HX0hBTkRMRVIsIHVzZUNsYXNzOiBNaXNzaW5nSGFuZGxlcn0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRyYW5zbG9jb01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHRzOiBUcmFuc2xvY29TZXJ2aWNlKSB7XG4gICAgYXZhaWxhYmxlTGFuZ3MuZm9yRWFjaChsYW5nID0+IHtcbiAgICAgIGlmIChsYW5nc1tsYW5nXSAhPSBudWxsKSB7XG4gICAgICAgIHRzLnNldFRyYW5zbGF0aW9uKGxhbmdzW2xhbmddLCBsYW5nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFqZlRyYW5zbG9jb01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQWpmVHJhbnNsb2NvTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbVHJhbnNsb2NvU2VydmljZV0sXG4gICAgfTtcbiAgfVxufVxuIl19