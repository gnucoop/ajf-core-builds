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
import { TRANSLOCO_CONFIG, TRANSLOCO_MISSING_HANDLER, translocoConfig, TranslocoModule, TranslocoService } from '@ngneat/transloco';
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
            providers: [
                TranslocoService,
            ]
        };
    }
}
AjfTranslocoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTranslocoModule, deps: [{ token: i1.TranslocoService }], target: i0.ɵɵFactoryTarget.NgModule });
AjfTranslocoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTranslocoModule, imports: [TranslocoModule], exports: [TranslocoModule] });
AjfTranslocoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTranslocoModule, providers: [
        {
            provide: TRANSLOCO_CONFIG,
            useValue: translocoConfig({
                availableLangs,
                defaultLang: 'ENG',
                reRenderOnLangChange: true,
                prodMode: false,
            })
        },
        { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler }
    ], imports: [[TranslocoModule], TranslocoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTranslocoModule, decorators: [{
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
                            })
                        },
                        { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler }
                    ],
                }]
        }], ctorParameters: function () { return [{ type: i1.TranslocoService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RyYW5zbG9jby90cmFuc2xvY28ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIseUJBQXlCLEVBQ3pCLGVBQWUsRUFDZixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2pCLE1BQU0sbUJBQW1CLENBQUM7QUFFM0IsT0FBTyxFQUFDLEtBQUssRUFBQyxNQUFNLFFBQVEsQ0FBQztBQUM3QixPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7OztBQUMzRCxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFpQmxFLE1BQU0sT0FBTyxrQkFBa0I7SUFDN0IsWUFBWSxFQUFvQjtRQUM5QixjQUFjLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQzVCLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksRUFBRTtnQkFDdkIsRUFBRSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUM7YUFDdEM7UUFDSCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxNQUFNLENBQUMsT0FBTztRQUNaLE9BQU87WUFDTCxRQUFRLEVBQUUsa0JBQWtCO1lBQzVCLFNBQVMsRUFBRTtnQkFDVCxnQkFBZ0I7YUFDakI7U0FDRixDQUFDO0lBQ0osQ0FBQzs7dUhBZlUsa0JBQWtCO3dIQUFsQixrQkFBa0IsWUFmbkIsZUFBZSxhQUNmLGVBQWU7d0hBY2Qsa0JBQWtCLGFBYmxCO1FBQ1Q7WUFDRSxPQUFPLEVBQUUsZ0JBQWdCO1lBQ3pCLFFBQVEsRUFBRSxlQUFlLENBQUM7Z0JBQ3hCLGNBQWM7Z0JBQ2QsV0FBVyxFQUFFLEtBQUs7Z0JBQ2xCLG9CQUFvQixFQUFFLElBQUk7Z0JBQzFCLFFBQVEsRUFBRSxLQUFLO2FBQ2hCLENBQUM7U0FDSDtRQUNELEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7S0FDL0QsWUFiUSxDQUFDLGVBQWUsQ0FBQyxFQUNoQixlQUFlO21HQWNkLGtCQUFrQjtrQkFoQjlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMxQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLFNBQVMsRUFBRTt3QkFDVDs0QkFDRSxPQUFPLEVBQUUsZ0JBQWdCOzRCQUN6QixRQUFRLEVBQUUsZUFBZSxDQUFDO2dDQUN4QixjQUFjO2dDQUNkLFdBQVcsRUFBRSxLQUFLO2dDQUNsQixvQkFBb0IsRUFBRSxJQUFJO2dDQUMxQixRQUFRLEVBQUUsS0FBSzs2QkFDaEIsQ0FBQzt5QkFDSDt3QkFDRCxFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDO3FCQUMvRDtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBUUkFOU0xPQ09fQ09ORklHLFxuICBUUkFOU0xPQ09fTUlTU0lOR19IQU5ETEVSLFxuICB0cmFuc2xvY29Db25maWcsXG4gIFRyYW5zbG9jb01vZHVsZSxcbiAgVHJhbnNsb2NvU2VydmljZVxufSBmcm9tICdAbmduZWF0L3RyYW5zbG9jbyc7XG5cbmltcG9ydCB7bGFuZ3N9IGZyb20gJy4vbGFuZyc7XG5pbXBvcnQge01pc3NpbmdIYW5kbGVyfSBmcm9tICcuL3RyYW5zbG9jby1taXNzaW5nLWhhbmRsZXInO1xuY29uc3QgYXZhaWxhYmxlTGFuZ3MgPSBbJ0VORycsICdFU1AnLCAnRlJBJywgJ0lUQScsICdQUlQnLCAnRVRIJ107XG5ATmdNb2R1bGUoe1xuICBpbXBvcnRzOiBbVHJhbnNsb2NvTW9kdWxlXSxcbiAgZXhwb3J0czogW1RyYW5zbG9jb01vZHVsZV0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IFRSQU5TTE9DT19DT05GSUcsXG4gICAgICB1c2VWYWx1ZTogdHJhbnNsb2NvQ29uZmlnKHtcbiAgICAgICAgYXZhaWxhYmxlTGFuZ3MsXG4gICAgICAgIGRlZmF1bHRMYW5nOiAnRU5HJyxcbiAgICAgICAgcmVSZW5kZXJPbkxhbmdDaGFuZ2U6IHRydWUsXG4gICAgICAgIHByb2RNb2RlOiBmYWxzZSxcbiAgICAgIH0pXG4gICAgfSxcbiAgICB7cHJvdmlkZTogVFJBTlNMT0NPX01JU1NJTkdfSEFORExFUiwgdXNlQ2xhc3M6IE1pc3NpbmdIYW5kbGVyfVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUcmFuc2xvY29Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih0czogVHJhbnNsb2NvU2VydmljZSkge1xuICAgIGF2YWlsYWJsZUxhbmdzLmZvckVhY2gobGFuZyA9PiB7XG4gICAgICBpZiAobGFuZ3NbbGFuZ10gIT0gbnVsbCkge1xuICAgICAgICB0cy5zZXRUcmFuc2xhdGlvbihsYW5nc1tsYW5nXSwgbGFuZyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAgc3RhdGljIGZvclJvb3QoKTogTW9kdWxlV2l0aFByb3ZpZGVyczxBamZUcmFuc2xvY29Nb2R1bGU+IHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IEFqZlRyYW5zbG9jb01vZHVsZSxcbiAgICAgIHByb3ZpZGVyczogW1xuICAgICAgICBUcmFuc2xvY29TZXJ2aWNlLFxuICAgICAgXVxuICAgIH07XG4gIH1cbn1cbiJdfQ==