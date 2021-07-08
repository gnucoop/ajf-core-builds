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
    availableLangs: ['ENG', 'ESP', 'FRA', 'ITA', 'PRT', 'ETH'],
    defaultLang: 'ENG',
    reRenderOnLangChange: true,
    prodMode: false,
});
export class AjfTranslocoModule {
}
AjfTranslocoModule.decorators = [
    { type: NgModule, args: [{
                imports: [TranslocoModule],
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLWFqZi5tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS90cmFuc2xvY28vdHJhbnNsb2NvLWFqZi5tb2R1bGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2QyxPQUFPLEVBQ0wsZ0JBQWdCLEVBQ2hCLGdCQUFnQixFQUNoQix5QkFBeUIsRUFDekIsZUFBZSxFQUNmLGVBQWUsRUFDaEIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxvQkFBb0IsQ0FBQztBQUN2RCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7V0FRM0MsZUFBZSxDQUFDO0lBQ3hCLGNBQWMsRUFBRSxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDO0lBQzFELFdBQVcsRUFBRSxLQUFLO0lBQ2xCLG9CQUFvQixFQUFFLElBQUk7SUFDMUIsUUFBUSxFQUFFLEtBQUs7Q0FDaEIsQ0FBQztBQU1SLE1BQU0sT0FBTyxrQkFBa0I7OztZQWpCOUIsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDMUIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMxQixTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGdCQUFnQjt3QkFDekIsUUFBUSxJQUtOO3FCQUNIO29CQUNELEVBQUMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLFFBQVEsRUFBRSxtQkFBbUIsRUFBQztvQkFDMUQsRUFBQyxPQUFPLEVBQUUseUJBQXlCLEVBQUUsUUFBUSxFQUFFLGNBQWMsRUFBQztpQkFDL0Q7YUFDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtOZ01vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1xuICBUUkFOU0xPQ09fQ09ORklHLFxuICBUUkFOU0xPQ09fTE9BREVSLFxuICBUUkFOU0xPQ09fTUlTU0lOR19IQU5ETEVSLFxuICB0cmFuc2xvY29Db25maWcsXG4gIFRyYW5zbG9jb01vZHVsZVxufSBmcm9tICdAbmduZWF0L3RyYW5zbG9jbyc7XG5cbmltcG9ydCB7VHJhbnNsb2NvSHR0cExvYWRlcn0gZnJvbSAnLi90cmFuc2xvY28tbG9hZGVyJztcbmltcG9ydCB7TWlzc2luZ0hhbmRsZXJ9IGZyb20gJy4vdHJhbnNsb2NvLW1pc3NpbmctaGFuZGxlcic7XG5cbkBOZ01vZHVsZSh7XG4gIGltcG9ydHM6IFtUcmFuc2xvY29Nb2R1bGVdLFxuICBleHBvcnRzOiBbVHJhbnNsb2NvTW9kdWxlXSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogVFJBTlNMT0NPX0NPTkZJRyxcbiAgICAgIHVzZVZhbHVlOiB0cmFuc2xvY29Db25maWcoe1xuICAgICAgICBhdmFpbGFibGVMYW5nczogWydFTkcnLCAnRVNQJywgJ0ZSQScsICdJVEEnLCAnUFJUJywgJ0VUSCddLFxuICAgICAgICBkZWZhdWx0TGFuZzogJ0VORycsXG4gICAgICAgIHJlUmVuZGVyT25MYW5nQ2hhbmdlOiB0cnVlLFxuICAgICAgICBwcm9kTW9kZTogZmFsc2UsXG4gICAgICB9KVxuICAgIH0sXG4gICAge3Byb3ZpZGU6IFRSQU5TTE9DT19MT0FERVIsIHVzZUNsYXNzOiBUcmFuc2xvY29IdHRwTG9hZGVyfSxcbiAgICB7cHJvdmlkZTogVFJBTlNMT0NPX01JU1NJTkdfSEFORExFUiwgdXNlQ2xhc3M6IE1pc3NpbmdIYW5kbGVyfVxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZUcmFuc2xvY29Nb2R1bGUge1xufVxuIl19