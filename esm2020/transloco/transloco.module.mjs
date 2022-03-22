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
    static forRoot(config) {
        return {
            ngModule: AjfTranslocoModule,
            providers: [
                TranslocoService,
                {
                    provide: TRANSLOCO_CONFIG,
                    useValue: translocoConfig({
                        ...config,
                        availableLangs,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvdHJhbnNsb2NvL3NyYy90cmFuc2xvY28ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQzVELE9BQU8sRUFDTCxnQkFBZ0IsRUFDaEIseUJBQXlCLEVBQ3pCLGVBQWUsRUFFZixlQUFlLEVBQ2YsZ0JBQWdCLEVBQ2hCLG9CQUFvQixFQUNwQixvQkFBb0IsR0FDckIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQzs7O0FBRTNELE1BQU0sY0FBYyxHQUFHLENBQUMsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLENBQUMsQ0FBQztBQWFsRSxNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQVksRUFBb0I7UUFDOUIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsTUFBTSxDQUFDLE9BQU8sQ0FDWixNQUE2QztRQUU3QyxPQUFPO1lBQ0wsUUFBUSxFQUFFLGtCQUFrQjtZQUM1QixTQUFTLEVBQUU7Z0JBQ1QsZ0JBQWdCO2dCQUNoQjtvQkFDRSxPQUFPLEVBQUUsZ0JBQWdCO29CQUN6QixRQUFRLEVBQUUsZUFBZSxDQUFDO3dCQUN4QixHQUFHLE1BQU07d0JBQ1QsY0FBYzt3QkFDZCxXQUFXLEVBQUUsS0FBSztxQkFDbkIsQ0FBQztpQkFDSDthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OytHQTFCVSxrQkFBa0I7Z0hBQWxCLGtCQUFrQixZQVZuQixlQUFlLGFBQ2YsZUFBZTtnSEFTZCxrQkFBa0IsYUFSbEI7UUFDVCxFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDO1FBQzlEO1lBQ0UsT0FBTyxFQUFFLG9CQUFvQjtZQUM3QixRQUFRLEVBQUUsb0JBQW9CO1NBQy9CO0tBQ0YsWUFSUSxDQUFDLGVBQWUsQ0FBQyxFQUNoQixlQUFlOzJGQVNkLGtCQUFrQjtrQkFYOUIsUUFBUTttQkFBQztvQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7b0JBQzFCLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztvQkFDMUIsU0FBUyxFQUFFO3dCQUNULEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7d0JBQzlEOzRCQUNFLE9BQU8sRUFBRSxvQkFBb0I7NEJBQzdCLFFBQVEsRUFBRSxvQkFBb0I7eUJBQy9CO3FCQUNGO2lCQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFRSQU5TTE9DT19DT05GSUcsXG4gIFRSQU5TTE9DT19NSVNTSU5HX0hBTkRMRVIsXG4gIHRyYW5zbG9jb0NvbmZpZyxcbiAgVHJhbnNsb2NvQ29uZmlnLFxuICBUcmFuc2xvY29Nb2R1bGUsXG4gIFRyYW5zbG9jb1NlcnZpY2UsXG4gIFRSQU5TTE9DT19UUkFOU1BJTEVSLFxuICBGdW5jdGlvbmFsVHJhbnNwaWxlcixcbn0gZnJvbSAnQG5nbmVhdC90cmFuc2xvY28nO1xuXG5pbXBvcnQge2xhbmdzfSBmcm9tICcuL2xhbmcnO1xuaW1wb3J0IHtNaXNzaW5nSGFuZGxlcn0gZnJvbSAnLi90cmFuc2xvY28tbWlzc2luZy1oYW5kbGVyJztcblxuY29uc3QgYXZhaWxhYmxlTGFuZ3MgPSBbJ0VORycsICdFU1AnLCAnRlJBJywgJ0lUQScsICdQUlQnLCAnRVRIJ107XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtUcmFuc2xvY29Nb2R1bGVdLFxuICBleHBvcnRzOiBbVHJhbnNsb2NvTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge3Byb3ZpZGU6IFRSQU5TTE9DT19NSVNTSU5HX0hBTkRMRVIsIHVzZUNsYXNzOiBNaXNzaW5nSGFuZGxlcn0sXG4gICAge1xuICAgICAgcHJvdmlkZTogVFJBTlNMT0NPX1RSQU5TUElMRVIsXG4gICAgICB1c2VDbGFzczogRnVuY3Rpb25hbFRyYW5zcGlsZXIsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmVHJhbnNsb2NvTW9kdWxlIHtcbiAgY29uc3RydWN0b3IodHM6IFRyYW5zbG9jb1NlcnZpY2UpIHtcbiAgICBhdmFpbGFibGVMYW5ncy5mb3JFYWNoKGxhbmcgPT4ge1xuICAgICAgaWYgKGxhbmdzW2xhbmddICE9IG51bGwpIHtcbiAgICAgICAgdHMuc2V0VHJhbnNsYXRpb24obGFuZ3NbbGFuZ10sIGxhbmcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGZvclJvb3QoXG4gICAgY29uZmlnPzogUGFydGlhbDxUcmFuc2xvY29Db25maWc+IHwgdW5kZWZpbmVkLFxuICApOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFqZlRyYW5zbG9jb01vZHVsZT4ge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogQWpmVHJhbnNsb2NvTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIFRyYW5zbG9jb1NlcnZpY2UsXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBUUkFOU0xPQ09fQ09ORklHLFxuICAgICAgICAgIHVzZVZhbHVlOiB0cmFuc2xvY29Db25maWcoe1xuICAgICAgICAgICAgLi4uY29uZmlnLFxuICAgICAgICAgICAgYXZhaWxhYmxlTGFuZ3MsXG4gICAgICAgICAgICBkZWZhdWx0TGFuZzogJ0VORycsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICBdLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==