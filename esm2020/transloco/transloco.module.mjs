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
const availableLangs = ['ENG', 'ESP', 'FRA', 'ITA', 'PRT', 'ETH', 'UKR'];
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
AjfTranslocoModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTranslocoModule, deps: [{ token: i1.TranslocoService }], target: i0.ɵɵFactoryTarget.NgModule });
AjfTranslocoModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTranslocoModule, imports: [TranslocoModule], exports: [TranslocoModule] });
AjfTranslocoModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTranslocoModule, providers: [
        { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler },
        {
            provide: TRANSLOCO_TRANSPILER,
            useClass: FunctionalTranspiler,
        },
    ], imports: [[TranslocoModule], TranslocoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTranslocoModule, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdHJhbnNsb2NvL3NyYy90cmFuc2xvY28ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIseUJBQXlCLEVBQ3pCLGVBQWUsRUFFZixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLG9CQUFvQixFQUNwQixvQkFBb0IsR0FDckIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRTNELE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFhekUsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUFZLEVBQW9CO1FBQzlCLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUN2QixFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQ1osTUFBNkM7UUFFN0MsT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFO2dCQUNULGdCQUFnQjtnQkFDaEI7b0JBQ0UsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsUUFBUSxFQUFFLGVBQWUsQ0FBQzt3QkFDeEIsY0FBYzt3QkFDZCxHQUFHLE1BQU07d0JBQ1QsV0FBVyxFQUFFLEtBQUs7cUJBQ25CLENBQUM7aUJBQ0g7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzsrR0ExQlUsa0JBQWtCO2dIQUFsQixrQkFBa0IsWUFWbkIsZUFBZSxhQUNmLGVBQWU7Z0hBU2Qsa0JBQWtCLGFBUmxCO1FBQ1QsRUFBQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQztRQUM5RDtZQUNFLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQjtLQUNGLFlBUlEsQ0FBQyxlQUFlLENBQUMsRUFDaEIsZUFBZTsyRkFTZCxrQkFBa0I7a0JBWDlCLFFBQVE7bUJBQUM7b0JBQ1IsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMxQixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLFNBQVMsRUFBRTt3QkFDVCxFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDO3dCQUM5RDs0QkFDRSxPQUFPLEVBQUUsb0JBQW9COzRCQUM3QixRQUFRLEVBQUUsb0JBQW9CO3lCQUMvQjtxQkFDRjtpQkFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtNb2R1bGVXaXRoUHJvdmlkZXJzLCBOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBUUkFOU0xPQ09fQ09ORklHLFxuICBUUkFOU0xPQ09fTUlTU0lOR19IQU5ETEVSLFxuICB0cmFuc2xvY29Db25maWcsXG4gIFRyYW5zbG9jb0NvbmZpZyxcbiAgVHJhbnNsb2NvTW9kdWxlLFxuICBUcmFuc2xvY29TZXJ2aWNlLFxuICBUUkFOU0xPQ09fVFJBTlNQSUxFUixcbiAgRnVuY3Rpb25hbFRyYW5zcGlsZXIsXG59IGZyb20gJ0BuZ25lYXQvdHJhbnNsb2NvJztcblxuaW1wb3J0IHtsYW5nc30gZnJvbSAnLi9sYW5nJztcbmltcG9ydCB7TWlzc2luZ0hhbmRsZXJ9IGZyb20gJy4vdHJhbnNsb2NvLW1pc3NpbmctaGFuZGxlcic7XG5cbmNvbnN0IGF2YWlsYWJsZUxhbmdzID0gWydFTkcnLCAnRVNQJywgJ0ZSQScsICdJVEEnLCAnUFJUJywgJ0VUSCcsICdVS1InXTtcblxuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1RyYW5zbG9jb01vZHVsZV0sXG4gIGV4cG9ydHM6IFtUcmFuc2xvY29Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7cHJvdmlkZTogVFJBTlNMT0NPX01JU1NJTkdfSEFORExFUiwgdXNlQ2xhc3M6IE1pc3NpbmdIYW5kbGVyfSxcbiAgICB7XG4gICAgICBwcm92aWRlOiBUUkFOU0xPQ09fVFJBTlNQSUxFUixcbiAgICAgIHVzZUNsYXNzOiBGdW5jdGlvbmFsVHJhbnNwaWxlcixcbiAgICB9LFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUcmFuc2xvY29Nb2R1bGUge1xuICBjb25zdHJ1Y3Rvcih0czogVHJhbnNsb2NvU2VydmljZSkge1xuICAgIGF2YWlsYWJsZUxhbmdzLmZvckVhY2gobGFuZyA9PiB7XG4gICAgICBpZiAobGFuZ3NbbGFuZ10gIT0gbnVsbCkge1xuICAgICAgICB0cy5zZXRUcmFuc2xhdGlvbihsYW5nc1tsYW5nXSwgbGFuZyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZm9yUm9vdChcbiAgICBjb25maWc/OiBQYXJ0aWFsPFRyYW5zbG9jb0NvbmZpZz4gfCB1bmRlZmluZWQsXG4gICk6IE1vZHVsZVdpdGhQcm92aWRlcnM8QWpmVHJhbnNsb2NvTW9kdWxlPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBamZUcmFuc2xvY29Nb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAgVHJhbnNsb2NvU2VydmljZSxcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IFRSQU5TTE9DT19DT05GSUcsXG4gICAgICAgICAgdXNlVmFsdWU6IHRyYW5zbG9jb0NvbmZpZyh7XG4gICAgICAgICAgICBhdmFpbGFibGVMYW5ncyxcbiAgICAgICAgICAgIC4uLmNvbmZpZyxcbiAgICAgICAgICAgIGRlZmF1bHRMYW5nOiAnRU5HJyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfTtcbiAgfVxufVxuIl19