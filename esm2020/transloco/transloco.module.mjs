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
                prodMode: false,
            }),
        },
        { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler },
        {
            provide: TRANSLOCO_TRANSPILER,
            useClass: FunctionalTranspiler,
        },
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
                                prodMode: false,
                            }),
                        },
                        { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler },
                        {
                            provide: TRANSLOCO_TRANSPILER,
                            useClass: FunctionalTranspiler,
                        },
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslocoService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RyYW5zbG9jby90cmFuc2xvY28ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIseUJBQXlCLEVBQ3pCLGVBQWUsRUFDZixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLG9CQUFvQixFQUNwQixvQkFBb0IsR0FDckIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBQzNELE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQW9CbEUsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUFZLEVBQW9CO1FBQzlCLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUN2QixFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELE1BQU0sQ0FBQyxPQUFPO1FBQ1osT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFLENBQUMsZ0JBQWdCLENBQUM7U0FDOUIsQ0FBQztJQUNKLENBQUM7O29IQWJVLGtCQUFrQjtxSEFBbEIsa0JBQWtCLFlBbEJuQixlQUFlLGFBQ2YsZUFBZTtxSEFpQmQsa0JBQWtCLGFBaEJsQjtRQUNUO1lBQ0UsT0FBTyxFQUFFLGdCQUFnQjtZQUN6QixRQUFRLEVBQUUsZUFBZSxDQUFDO2dCQUN4QixjQUFjO2dCQUNkLFdBQVcsRUFBRSxLQUFLO2dCQUNsQixRQUFRLEVBQUUsS0FBSzthQUNoQixDQUFDO1NBQ0g7UUFDRCxFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDO1FBQzlEO1lBQ0UsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixRQUFRLEVBQUUsb0JBQW9CO1NBQy9CO0tBQ0YsWUFoQlEsQ0FBQyxlQUFlLENBQUMsRUFDaEIsZUFBZTtnR0FpQmQsa0JBQWtCO2tCQW5COUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsU0FBUyxFQUFFO3dCQUNUOzRCQUNFLE9BQU8sRUFBRSxnQkFBZ0I7NEJBQ3pCLFFBQVEsRUFBRSxlQUFlLENBQUM7Z0NBQ3hCLGNBQWM7Z0NBQ2QsV0FBVyxFQUFFLEtBQUs7Z0NBQ2xCLFFBQVEsRUFBRSxLQUFLOzZCQUNoQixDQUFDO3lCQUNIO3dCQUNELEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7d0JBQzlEOzRCQUNFLE9BQU8sRUFBRSxvQkFBb0I7NEJBQzdCLFFBQVEsRUFBRSxvQkFBb0I7eUJBQy9CO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFRSQU5TTE9DT19DT05GSUcsXG4gIFRSQU5TTE9DT19NSVNTSU5HX0hBTkRMRVIsXG4gIHRyYW5zbG9jb0NvbmZpZyxcbiAgVHJhbnNsb2NvTW9kdWxlLFxuICBUcmFuc2xvY29TZXJ2aWNlLFxuICBUUkFOU0xPQ09fVFJBTlNQSUxFUixcbiAgRnVuY3Rpb25hbFRyYW5zcGlsZXIsXG59IGZyb20gJ0BuZ25lYXQvdHJhbnNsb2NvJztcblxuaW1wb3J0IHtsYW5nc30gZnJvbSAnLi9sYW5nJztcbmltcG9ydCB7TWlzc2luZ0hhbmRsZXJ9IGZyb20gJy4vdHJhbnNsb2NvLW1pc3NpbmctaGFuZGxlcic7XG5jb25zdCBhdmFpbGFibGVMYW5ncyA9IFsnRU5HJywgJ0VTUCcsICdGUkEnLCAnSVRBJywgJ1BSVCcsICdFVEgnXTtcbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtUcmFuc2xvY29Nb2R1bGVdLFxuICBleHBvcnRzOiBbVHJhbnNsb2NvTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogVFJBTlNMT0NPX0NPTkZJRyxcbiAgICAgIHVzZVZhbHVlOiB0cmFuc2xvY29Db25maWcoe1xuICAgICAgICBhdmFpbGFibGVMYW5ncyxcbiAgICAgICAgZGVmYXVsdExhbmc6ICdFTkcnLFxuICAgICAgICBwcm9kTW9kZTogZmFsc2UsXG4gICAgICB9KSxcbiAgICB9LFxuICAgIHtwcm92aWRlOiBUUkFOU0xPQ09fTUlTU0lOR19IQU5ETEVSLCB1c2VDbGFzczogTWlzc2luZ0hhbmRsZXJ9LFxuICAgIHtcbiAgICAgIHByb3ZpZGU6IFRSQU5TTE9DT19UUkFOU1BJTEVSLFxuICAgICAgdXNlQ2xhc3M6IEZ1bmN0aW9uYWxUcmFuc3BpbGVyLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRyYW5zbG9jb01vZHVsZSB7XG4gIGNvbnN0cnVjdG9yKHRzOiBUcmFuc2xvY29TZXJ2aWNlKSB7XG4gICAgYXZhaWxhYmxlTGFuZ3MuZm9yRWFjaChsYW5nID0+IHtcbiAgICAgIGlmIChsYW5nc1tsYW5nXSAhPSBudWxsKSB7XG4gICAgICAgIHRzLnNldFRyYW5zbGF0aW9uKGxhbmdzW2xhbmddLCBsYW5nKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBzdGF0aWMgZm9yUm9vdCgpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFqZlRyYW5zbG9jb01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQWpmVHJhbnNsb2NvTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbVHJhbnNsb2NvU2VydmljZV0sXG4gICAgfTtcbiAgfVxufVxuIl19