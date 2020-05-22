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
import { __decorate } from "tslib";
import { NgModule } from '@angular/core';
import { AjfCalendarEntryLabelPipe } from './calendar-entry-label';
import { AjfCalendarService } from './calendar-service';
let AjfCalendarModule = /** @class */ (() => {
    let AjfCalendarModule = class AjfCalendarModule {
    };
    AjfCalendarModule = __decorate([
        NgModule({
            declarations: [
                AjfCalendarEntryLabelPipe,
            ],
            exports: [
                AjfCalendarEntryLabelPipe,
            ],
        })
    ], AjfCalendarModule);
    return AjfCalendarModule;
})();
export { AjfCalendarModule };
let AjfGregorianCalendarModule = /** @class */ (() => {
    let AjfGregorianCalendarModule = class AjfGregorianCalendarModule {
    };
    AjfGregorianCalendarModule = __decorate([
        NgModule({
            providers: [
                AjfCalendarService,
            ],
        })
    ], AjfGregorianCalendarModule);
    return AjfGregorianCalendarModule;
})();
export { AjfGregorianCalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvY2FsZW5kYXIvY2FsZW5kYXItbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXZDLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ2pFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLG9CQUFvQixDQUFDO0FBVXREO0lBQUEsSUFBYSxpQkFBaUIsR0FBOUIsTUFBYSxpQkFBaUI7S0FDN0IsQ0FBQTtJQURZLGlCQUFpQjtRQVI3QixRQUFRLENBQUM7WUFDUixZQUFZLEVBQUU7Z0JBQ1oseUJBQXlCO2FBQzFCO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLHlCQUF5QjthQUMxQjtTQUNGLENBQUM7T0FDVyxpQkFBaUIsQ0FDN0I7SUFBRCx3QkFBQztLQUFBO1NBRFksaUJBQWlCO0FBUTlCO0lBQUEsSUFBYSwwQkFBMEIsR0FBdkMsTUFBYSwwQkFBMEI7S0FDdEMsQ0FBQTtJQURZLDBCQUEwQjtRQUx0QyxRQUFRLENBQUM7WUFDUixTQUFTLEVBQUU7Z0JBQ1Qsa0JBQWtCO2FBQ25CO1NBQ0YsQ0FBQztPQUNXLDBCQUEwQixDQUN0QztJQUFELGlDQUFDO0tBQUE7U0FEWSwwQkFBMEIiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkNhbGVuZGFyRW50cnlMYWJlbFBpcGV9IGZyb20gJy4vY2FsZW5kYXItZW50cnktbGFiZWwnO1xuaW1wb3J0IHtBamZDYWxlbmRhclNlcnZpY2V9IGZyb20gJy4vY2FsZW5kYXItc2VydmljZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW1xuICAgIEFqZkNhbGVuZGFyRW50cnlMYWJlbFBpcGUsXG4gIF0sXG4gIGV4cG9ydHM6IFtcbiAgICBBamZDYWxlbmRhckVudHJ5TGFiZWxQaXBlLFxuICBdLFxufSlcbmV4cG9ydCBjbGFzcyBBamZDYWxlbmRhck1vZHVsZSB7XG59XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIEFqZkNhbGVuZGFyU2VydmljZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmR3JlZ29yaWFuQ2FsZW5kYXJNb2R1bGUge1xufVxuIl19