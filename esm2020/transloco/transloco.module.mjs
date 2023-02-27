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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdHJhbnNsb2NvL3NyYy90cmFuc2xvY28ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIseUJBQXlCLEVBQ3pCLGVBQWUsRUFFZixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLG9CQUFvQixFQUNwQixvQkFBb0IsR0FDckIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRTNELE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7QUFhekUsTUFBTSxPQUFPLGtCQUFrQjtJQUM3QixZQUFZLEVBQW9CO1FBQzlCLGNBQWMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDNUIsSUFBSSxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUN2QixFQUFFLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsQ0FBQzthQUN0QztRQUNILENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELE1BQU0sQ0FBQyxPQUFPLENBQ1osTUFBNkM7UUFFN0MsT0FBTztZQUNMLFFBQVEsRUFBRSxrQkFBa0I7WUFDNUIsU0FBUyxFQUFFO2dCQUNULGdCQUFnQjtnQkFDaEI7b0JBQ0UsT0FBTyxFQUFFLGdCQUFnQjtvQkFDekIsUUFBUSxFQUFFLGVBQWUsQ0FBQzt3QkFDeEIsY0FBYzt3QkFDZCxHQUFHLE1BQU07d0JBQ1QsV0FBVyxFQUFFLEtBQUs7cUJBQ25CLENBQUM7aUJBQ0g7YUFDRjtTQUNGLENBQUM7SUFDSixDQUFDOzsrR0ExQlUsa0JBQWtCO2dIQUFsQixrQkFBa0IsWUFWbkIsZUFBZSxhQUNmLGVBQWU7Z0hBU2Qsa0JBQWtCLGFBUmxCO1FBQ1QsRUFBQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQztRQUM5RDtZQUNFLE9BQU8sRUFBRSxvQkFBb0I7WUFDN0IsUUFBUSxFQUFFLG9CQUFvQjtTQUMvQjtLQUNGLFlBUlMsZUFBZSxFQUNmLGVBQWU7MkZBU2Qsa0JBQWtCO2tCQVg5QixRQUFRO21CQUFDO29CQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO29CQUMxQixTQUFTLEVBQUU7d0JBQ1QsRUFBQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQzt3QkFDOUQ7NEJBQ0UsT0FBTyxFQUFFLG9CQUFvQjs0QkFDN0IsUUFBUSxFQUFFLG9CQUFvQjt5QkFDL0I7cUJBQ0Y7aUJBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7TW9kdWxlV2l0aFByb3ZpZGVycywgTmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVFJBTlNMT0NPX0NPTkZJRyxcbiAgVFJBTlNMT0NPX01JU1NJTkdfSEFORExFUixcbiAgdHJhbnNsb2NvQ29uZmlnLFxuICBUcmFuc2xvY29Db25maWcsXG4gIFRyYW5zbG9jb01vZHVsZSxcbiAgVHJhbnNsb2NvU2VydmljZSxcbiAgVFJBTlNMT0NPX1RSQU5TUElMRVIsXG4gIEZ1bmN0aW9uYWxUcmFuc3BpbGVyLFxufSBmcm9tICdAbmduZWF0L3RyYW5zbG9jbyc7XG5cbmltcG9ydCB7bGFuZ3N9IGZyb20gJy4vbGFuZyc7XG5pbXBvcnQge01pc3NpbmdIYW5kbGVyfSBmcm9tICcuL3RyYW5zbG9jby1taXNzaW5nLWhhbmRsZXInO1xuXG5jb25zdCBhdmFpbGFibGVMYW5ncyA9IFsnRU5HJywgJ0VTUCcsICdGUkEnLCAnSVRBJywgJ1BSVCcsICdFVEgnLCAnVUtSJ107XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtUcmFuc2xvY29Nb2R1bGVdLFxuICBleHBvcnRzOiBbVHJhbnNsb2NvTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IFRSQU5TTE9DT19NSVNTSU5HX0hBTkRMRVIsIHVzZUNsYXNzOiBNaXNzaW5nSGFuZGxlcn0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVFJBTlNMT0NPX1RSQU5TUElMRVIsXG4gICAgICB1c2VDbGFzczogRnVuY3Rpb25hbFRyYW5zcGlsZXIsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmVHJhbnNsb2NvTW9kdWxlIHtcbiAgY29uc3RydWN0b3IodHM6IFRyYW5zbG9jb1NlcnZpY2UpIHtcbiAgICBhdmFpbGFibGVMYW5ncy5mb3JFYWNoKGxhbmcgPT4ge1xuICAgICAgaWYgKGxhbmdzW2xhbmddICE9IG51bGwpIHtcbiAgICAgICAgdHMuc2V0VHJhbnNsYXRpb24obGFuZ3NbbGFuZ10sIGxhbmcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoXG4gICAgY29uZmlnPzogUGFydGlhbDxUcmFuc2xvY29Db25maWc+IHwgdW5kZWZpbmVkLFxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFqZlRyYW5zbG9jb01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQWpmVHJhbnNsb2NvTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFRyYW5zbG9jb1NlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBUUkFOU0xPQ09fQ09ORklHLFxuICAgICAgICAgIHVzZVZhbHVlOiB0cmFuc2xvY29Db25maWcoe1xuICAgICAgICAgICAgYXZhaWxhYmxlTGFuZ3MsXG4gICAgICAgICAgICAuLi5jb25maWcsXG4gICAgICAgICAgICBkZWZhdWx0TGFuZzogJ0VORycsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==