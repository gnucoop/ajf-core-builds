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
const availableLangs = ['ENG', 'ESP', 'FRA', 'ITA', 'PRT', 'ETH'];
const ɵ0 = translocoConfig({
    availableLangs,
    defaultLang: 'ENG',
    reRenderOnLangChange: true,
    prodMode: false,
});
export class AjfTranslocoModule {
    constructor(ts) {
        availableLangs.forEach(lang => {
            if (langs[lang] != null) {
                ts.setTranslation(langs[lang], lang);
            }
        });
    }
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
                    { provide: TRANSLOCO_MISSING_HANDLER, useClass: MissingHandler }
                ],
            },] }
];
AjfTranslocoModule.ctorParameters = () => [
    { type: TranslocoService }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RyYW5zbG9jby90cmFuc2xvY28ubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDdkMsT0FBTyxFQUNMLGdCQUFnQixFQUNoQix5QkFBeUIsRUFDekIsZUFBZSxFQUNmLGVBQWUsRUFDZixnQkFBZ0IsRUFDakIsTUFBTSxtQkFBbUIsQ0FBQztBQUUzQixPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sUUFBUSxDQUFDO0FBQzdCLE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxNQUFNLGNBQWMsR0FBRyxDQUFDLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsS0FBSyxDQUFDLENBQUM7V0FPbEQsZUFBZSxDQUFDO0lBQ3hCLGNBQWM7SUFDZCxXQUFXLEVBQUUsS0FBSztJQUNsQixvQkFBb0IsRUFBRSxJQUFJO0lBQzFCLFFBQVEsRUFBRSxLQUFLO0NBQ2hCLENBQUM7QUFLUixNQUFNLE9BQU8sa0JBQWtCO0lBQzdCLFlBQVksRUFBb0I7UUFDOUIsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUM1QixJQUFJLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUU7Z0JBQ3ZCLEVBQUUsQ0FBQyxjQUFjLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxDQUFDO2FBQ3RDO1FBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7WUF2QkYsUUFBUSxTQUFDO2dCQUNSLE9BQU8sRUFBRSxDQUFDLGVBQWUsQ0FBQztnQkFDMUIsT0FBTyxFQUFFLENBQUMsZUFBZSxDQUFDO2dCQUMxQixTQUFTLEVBQUU7b0JBQ1Q7d0JBQ0UsT0FBTyxFQUFFLGdCQUFnQjt3QkFDekIsUUFBUSxJQUtOO3FCQUNIO29CQUNELEVBQUMsT0FBTyxFQUFFLHlCQUF5QixFQUFFLFFBQVEsRUFBRSxjQUFjLEVBQUM7aUJBQy9EO2FBQ0Y7OztZQXJCQyxnQkFBZ0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtcbiAgVFJBTlNMT0NPX0NPTkZJRyxcbiAgVFJBTlNMT0NPX01JU1NJTkdfSEFORExFUixcbiAgdHJhbnNsb2NvQ29uZmlnLFxuICBUcmFuc2xvY29Nb2R1bGUsXG4gIFRyYW5zbG9jb1NlcnZpY2Vcbn0gZnJvbSAnQG5nbmVhdC90cmFuc2xvY28nO1xuXG5pbXBvcnQge2xhbmdzfSBmcm9tICcuL2xhbmcnO1xuaW1wb3J0IHtNaXNzaW5nSGFuZGxlcn0gZnJvbSAnLi90cmFuc2xvY28tbWlzc2luZy1oYW5kbGVyJztcbmNvbnN0IGF2YWlsYWJsZUxhbmdzID0gWydFTkcnLCAnRVNQJywgJ0ZSQScsICdJVEEnLCAnUFJUJywgJ0VUSCddO1xuQE5nTW9kdWxlKHtcbiAgaW1wb3J0czogW1RyYW5zbG9jb01vZHVsZV0sXG4gIGV4cG9ydHM6IFtUcmFuc2xvY29Nb2R1bGVdLFxuICBwcm92aWRlcnM6IFtcbiAgICB7XG4gICAgICBwcm92aWRlOiBUUkFOU0xPQ09fQ09ORklHLFxuICAgICAgdXNlVmFsdWU6IHRyYW5zbG9jb0NvbmZpZyh7XG4gICAgICAgIGF2YWlsYWJsZUxhbmdzLFxuICAgICAgICBkZWZhdWx0TGFuZzogJ0VORycsXG4gICAgICAgIHJlUmVuZGVyT25MYW5nQ2hhbmdlOiB0cnVlLFxuICAgICAgICBwcm9kTW9kZTogZmFsc2UsXG4gICAgICB9KVxuICAgIH0sXG4gICAge3Byb3ZpZGU6IFRSQU5TTE9DT19NSVNTSU5HX0hBTkRMRVIsIHVzZUNsYXNzOiBNaXNzaW5nSGFuZGxlcn1cbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmVHJhbnNsb2NvTW9kdWxlIHtcbiAgY29uc3RydWN0b3IodHM6IFRyYW5zbG9jb1NlcnZpY2UpIHtcbiAgICBhdmFpbGFibGVMYW5ncy5mb3JFYWNoKGxhbmcgPT4ge1xuICAgICAgaWYgKGxhbmdzW2xhbmddICE9IG51bGwpIHtcbiAgICAgICAgdHMuc2V0VHJhbnNsYXRpb24obGFuZ3NbbGFuZ10sIGxhbmcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=