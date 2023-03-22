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
import { TRANSLOCO_CONFIG, TRANSLOCO_MISSING_HANDLER, translocoConfig, TranslocoModule, TranslocoService, TRANSLOCO_TRANSPILER, FunctionalTranspiler, } from '@ngneat/transloco';
import { langs } from './lang';
import { MissingHandler } from './transloco-missing-handler';
import * as i0 from "@angular/core";
import * as i1 from "@ngneat/transloco";
const availableLangs = ['ENG', 'ESP', 'FRA', 'ITA', 'PRT', 'ETH', 'UKR', 'ARA'];
export class AjfTranslocoModule {
    constructor(ts) {
        availableLangs.forEach(lang => {
            if (langs[lang] != null) {
                ts.setTranslation(langs[lang], lang);
            }
        });
    }
    static forRoot(config) {
        return {
            ngModule: AjfTranslocoModule,
            providers: [
                TranslocoService,
                {
                    provide: TRANSLOCO_CONFIG,
                    useValue: translocoConfig({
                        availableLangs,
                        ...config,
                        defaultLang: 'ENG',
                    }),
                },
            ],
        };
    }
}
AjfTranslocoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTranslocoModule, deps: [{ token: i1.TranslocoService }], target: i0.ɵɵFactoryTarget.NgModule });
AjfTranslocoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfTranslocoModule, imports: [TranslocoModule], exports: [TranslocoModule] });
AjfTranslocoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTranslocoModule, providers: [
        { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler },
        {
            provide: TRANSLOCO_TRANSPILER,
            useClass: FunctionalTranspiler,
        },
    ], imports: [TranslocoModule, TranslocoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfTranslocoModule, decorators: [{
            type: NgModule,
            args: [{
                    imports: [TranslocoModule],
                    exports: [TranslocoModule],
                    providers: [
                        { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler },
                        {
                            provide: TRANSLOCO_TRANSPILER,
                            useClass: FunctionalTranspiler,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslocoService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdHJhbnNsb2NvL3NyYy90cmFuc2xvY28ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIseUJBQXlCLEVBQ3pCLGVBQWUsRUFFZixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLG9CQUFvQixFQUNwQixvQkFBb0IsR0FDckIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRTNELE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssQ0FBQyxDQUFDO0FBYWhGLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBWSxFQUFvQjtRQUM5QixjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDdkIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxNQUFNLENBQUMsT0FBTyxDQUNaLE1BQTZDO1FBRTdDLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVCxnQkFBZ0I7Z0JBQ2hCO29CQUNFLE9BQU8sRUFBRSxnQkFBZ0I7b0JBQ3pCLFFBQVEsRUFBRSxlQUFlLENBQUM7d0JBQ3hCLGNBQWM7d0JBQ2QsR0FBRyxNQUFNO3dCQUNULFdBQVcsRUFBRSxLQUFLO3FCQUNuQixDQUFDO2lCQUNIO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7K0dBMUJVLGtCQUFrQjtnSEFBbEIsa0JBQWtCLFlBVm5CLGVBQWUsYUFDZixlQUFlO2dIQVNkLGtCQUFrQixhQVJsQjtRQUNULEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7UUFDOUQ7WUFDRSxPQUFPLEVBQUUsb0JBQW9CO1lBQzdCLFFBQVEsRUFBRSxvQkFBb0I7U0FDL0I7S0FDRixZQVJTLGVBQWUsRUFDZixlQUFlOzJGQVNkLGtCQUFrQjtrQkFYOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7d0JBQzlEOzRCQUNFLE9BQU8sRUFBRSxvQkFBb0I7NEJBQzdCLFFBQVEsRUFBRSxvQkFBb0I7eUJBQy9CO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFRSQU5TTE9DT19DT05GSUcsXG4gIFRSQU5TTE9DT19NSVNTSU5HX0hBTkRMRVIsXG4gIHRyYW5zbG9jb0NvbmZpZyxcbiAgVHJhbnNsb2NvQ29uZmlnLFxuICBUcmFuc2xvY29Nb2R1bGUsXG4gIFRyYW5zbG9jb1NlcnZpY2UsXG4gIFRSQU5TTE9DT19UUkFOU1BJTEVSLFxuICBGdW5jdGlvbmFsVHJhbnNwaWxlcixcbn0gZnJvbSAnQG5nbmVhdC90cmFuc2xvY28nO1xuXG5pbXBvcnQge2xhbmdzfSBmcm9tICcuL2xhbmcnO1xuaW1wb3J0IHtNaXNzaW5nSGFuZGxlcn0gZnJvbSAnLi90cmFuc2xvY28tbWlzc2luZy1oYW5kbGVyJztcblxuY29uc3QgYXZhaWxhYmxlTGFuZ3MgPSBbJ0VORycsICdFU1AnLCAnRlJBJywgJ0lUQScsICdQUlQnLCAnRVRIJywgJ1VLUicsICdBUkEnXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1RyYW5zbG9jb01vZHVsZV0sXG4gIGV4cG9ydHM6IFtUcmFuc2xvY29Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogVFJBTlNMT0NPX01JU1NJTkdfSEFORExFUiwgdXNlQ2xhc3M6IE1pc3NpbmdIYW5kbGVyfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBUUkFOU0xPQ09fVFJBTlNQSUxFUixcbiAgICAgIHVzZUNsYXNzOiBGdW5jdGlvbmFsVHJhbnNwaWxlcixcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUcmFuc2xvY29Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih0czogVHJhbnNsb2NvU2VydmljZSkge1xuICAgIGF2YWlsYWJsZUxhbmdzLmZvckVhY2gobGFuZyA9PiB7XG4gICAgICBpZiAobGFuZ3NbbGFuZ10gIT0gbnVsbCkge1xuICAgICAgICB0cy5zZXRUcmFuc2xhdGlvbihsYW5nc1tsYW5nXSwgbGFuZyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChcbiAgICBjb25maWc/OiBQYXJ0aWFsPFRyYW5zbG9jb0NvbmZpZz4gfCB1bmRlZmluZWQsXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QWpmVHJhbnNsb2NvTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBamZUcmFuc2xvY29Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgVHJhbnNsb2NvU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFRSQU5TTE9DT19DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IHRyYW5zbG9jb0NvbmZpZyh7XG4gICAgICAgICAgICBhdmFpbGFibGVMYW5ncyxcbiAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgIGRlZmF1bHRMYW5nOiAnRU5HJyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19