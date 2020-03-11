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
import { AjfCalendarEntryLabelPipe } from './calendar-entry-label';
import { AjfCalendarService } from './calendar-service';
var AjfCalendarModule = /** @class */ (function () {
    function AjfCalendarModule() {
    }
    AjfCalendarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [
                        AjfCalendarEntryLabelPipe,
                    ],
                    exports: [
                        AjfCalendarEntryLabelPipe,
                    ],
                },] }
    ];
    return AjfCalendarModule;
}());
export { AjfCalendarModule };
var AjfGregorianCalendarModule = /** @class */ (function () {
    function AjfGregorianCalendarModule() {
    }
    AjfGregorianCalendarModule.decorators = [
        { type: NgModule, args: [{
                    providers: [
                        AjfCalendarService,
                    ],
                },] }
    ];
    return AjfGregorianCalendarModule;
}());
export { AjfGregorianCalendarModule };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2FsZW5kYXItbW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvY2FsZW5kYXIvY2FsZW5kYXItbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFdkMsT0FBTyxFQUFDLHlCQUF5QixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDakUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sb0JBQW9CLENBQUM7QUFFdEQ7SUFBQTtJQVFpQyxDQUFDOztnQkFSakMsUUFBUSxTQUFDO29CQUNSLFlBQVksRUFBRTt3QkFDWix5QkFBeUI7cUJBQzFCO29CQUNELE9BQU8sRUFBRTt3QkFDUCx5QkFBeUI7cUJBQzFCO2lCQUNGOztJQUNnQyx3QkFBQztDQUFBLEFBUmxDLElBUWtDO1NBQXJCLGlCQUFpQjtBQUU5QjtJQUFBO0lBSzBDLENBQUM7O2dCQUwxQyxRQUFRLFNBQUM7b0JBQ1IsU0FBUyxFQUFFO3dCQUNULGtCQUFrQjtxQkFDbkI7aUJBQ0Y7O0lBQ3lDLGlDQUFDO0NBQUEsQUFMM0MsSUFLMkM7U0FBOUIsMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge05nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZDYWxlbmRhckVudHJ5TGFiZWxQaXBlfSBmcm9tICcuL2NhbGVuZGFyLWVudHJ5LWxhYmVsJztcbmltcG9ydCB7QWpmQ2FsZW5kYXJTZXJ2aWNlfSBmcm9tICcuL2NhbGVuZGFyLXNlcnZpY2UnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtcbiAgICBBamZDYWxlbmRhckVudHJ5TGFiZWxQaXBlLFxuICBdLFxuICBleHBvcnRzOiBbXG4gICAgQWpmQ2FsZW5kYXJFbnRyeUxhYmVsUGlwZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmQ2FsZW5kYXJNb2R1bGUgeyB9XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIEFqZkNhbGVuZGFyU2VydmljZSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmR3JlZ29yaWFuQ2FsZW5kYXJNb2R1bGUgeyB9XG4iXX0=