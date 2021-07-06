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
import { TRANSLOCO_CONFIG, TRANSLOCO_LOADER, TRANSLOCO_MISSING_HANDLER, translocoConfig, TranslocoModule } from '@ngneat/transloco';
import { TranslocoHttpLoader } from './transloco-loader';
import { MissingHandler } from './transloco-missing-handler';
const ɵ0 = translocoConfig({
    availableLangs: ['en', 'es', 'fr', 'it'],
    defaultLang: 'en',
    reRenderOnLangChange: true,
    prodMode: false,
});
export class AjfTranslocoModule {
}
AjfTranslocoModule.decorators = [
    { type: NgModule, args: [{
                exports: [TranslocoModule],
                providers: [
                    {
                        provide: TRANSLOCO_CONFIG,
                        useValue: ɵ0
                    },
                    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
                    { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler }
                ],
            },] }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLWFqZi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS90cmFuc2xvY28vdHJhbnNsb2NvLWFqZi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQix5QkFBeUIsRUFDekIsZUFBZSxFQUNmLGVBQWUsRUFDaEIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7V0FRM0MsZUFBZSxDQUFDO0lBQ3hCLGNBQWMsRUFBRSxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLElBQUksQ0FBQztJQUN4QyxXQUFXLEVBQUUsSUFBSTtJQUNqQixvQkFBb0IsRUFBRSxJQUFJO0lBQzFCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUM7QUFNUixNQUFNLE9BQU8sa0JBQWtCOzs7WUFoQjlCLFFBQVEsU0FBQztnQkFDUixPQUFPLEVBQUUsQ0FBQyxlQUFlLENBQUM7Z0JBQzFCLFNBQVMsRUFBRTtvQkFDVDt3QkFDRSxPQUFPLEVBQUUsZ0JBQWdCO3dCQUN6QixRQUFRLElBS047cUJBQ0g7b0JBQ0QsRUFBQyxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsUUFBUSxFQUFFLG1CQUFtQixFQUFDO29CQUMxRCxFQUFDLE9BQU8sRUFBRSx5QkFBeUIsRUFBRSxRQUFRLEVBQUUsY0FBYyxFQUFDO2lCQUMvRDthQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7XG4gIFRSQU5TTE9DT19DT05GSUcsXG4gIFRSQU5TTE9DT19MT0FERVIsXG4gIFRSQU5TTE9DT19NSVNTSU5HX0hBTkRMRVIsXG4gIHRyYW5zbG9jb0NvbmZpZyxcbiAgVHJhbnNsb2NvTW9kdWxlXG59IGZyb20gJ0BuZ25lYXQvdHJhbnNsb2NvJztcblxuaW1wb3J0IHtUcmFuc2xvY29IdHRwTG9hZGVyfSBmcm9tICcuL3RyYW5zbG9jby1sb2FkZXInO1xuaW1wb3J0IHtNaXNzaW5nSGFuZGxlcn0gZnJvbSAnLi90cmFuc2xvY28tbWlzc2luZy1oYW5kbGVyJztcblxuXG5ATmdNb2R1bGUoe1xuICBleHBvcnRzOiBbVHJhbnNsb2NvTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogVFJBTlNMT0NPX0NPTkZJRyxcbiAgICAgIHVzZVZhbHVlOiB0cmFuc2xvY29Db25maWcoe1xuICAgICAgICBhdmFpbGFibGVMYW5nczogWydlbicsICdlcycsICdmcicsICdpdCddLFxuICAgICAgICBkZWZhdWx0TGFuZzogJ2VuJyxcbiAgICAgICAgcmVSZW5kZXJPbkxhbmdDaGFuZ2U6IHRydWUsXG4gICAgICAgIHByb2RNb2RlOiBmYWxzZSxcbiAgICAgIH0pXG4gICAgfSxcbiAgICB7cHJvdmlkZTogVFJBTlNMT0NPX0xPQURFUiwgdXNlQ2xhc3M6IFRyYW5zbG9jb0h0dHBMb2FkZXJ9LFxuICAgIHtwcm92aWRlOiBUUkFOU0xPQ09fTUlTU0lOR19IQU5ETEVSLCB1c2VDbGFzczogTWlzc2luZ0hhbmRsZXJ9XG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZlRyYW5zbG9jb01vZHVsZSB7XG59XG4iXX0=