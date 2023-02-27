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
import { AjfCommonModule } from '@ajf/core/common';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AjfDropMessage, AjfFileInput, AjfFilePreview } from './file-input';
import * as i0 from "@angular/core";
export class AjfFileInputModule {
}
AjfFileInputModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFileInputModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfFileInputModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfFileInputModule, declarations: [AjfDropMessage, AjfFileInput, AjfFilePreview], imports: [AjfCommonModule, CommonModule, AjfTranslocoModule], exports: [AjfDropMessage, AjfFileInput, AjfFilePreview] });
AjfFileInputModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFileInputModule, imports: [AjfCommonModule, CommonModule, AjfTranslocoModule] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFileInputModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AjfDropMessage, AjfFileInput, AjfFilePreview],
                    exports: [AjfDropMessage, AjfFileInput, AjfFilePreview],
                    imports: [AjfCommonModule, CommonModule, AjfTranslocoModule],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2ZpbGUtaW5wdXQvc3JjL2ZpbGUtaW5wdXQtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNqRCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUN2RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDN0MsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV2QyxPQUFPLEVBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxjQUFjLEVBQUMsTUFBTSxjQUFjLENBQUM7O0FBTzFFLE1BQU0sT0FBTyxrQkFBa0I7OytHQUFsQixrQkFBa0I7Z0hBQWxCLGtCQUFrQixpQkFKZCxjQUFjLEVBQUUsWUFBWSxFQUFFLGNBQWMsYUFFakQsZUFBZSxFQUFFLFlBQVksRUFBRSxrQkFBa0IsYUFEakQsY0FBYyxFQUFFLFlBQVksRUFBRSxjQUFjO2dIQUczQyxrQkFBa0IsWUFGbkIsZUFBZSxFQUFFLFlBQVksRUFBRSxrQkFBa0I7MkZBRWhELGtCQUFrQjtrQkFMOUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxjQUFjLEVBQUUsWUFBWSxFQUFFLGNBQWMsQ0FBQztvQkFDNUQsT0FBTyxFQUFFLENBQUMsY0FBYyxFQUFFLFlBQVksRUFBRSxjQUFjLENBQUM7b0JBQ3ZELE9BQU8sRUFBRSxDQUFDLGVBQWUsRUFBRSxZQUFZLEVBQUUsa0JBQWtCLENBQUM7aUJBQzdEIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbW1vbk1vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQge0FqZlRyYW5zbG9jb01vZHVsZX0gZnJvbSAnQGFqZi9jb3JlL3RyYW5zbG9jbyc7XG5pbXBvcnQge0NvbW1vbk1vZHVsZX0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uJztcbmltcG9ydCB7TmdNb2R1bGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZkRyb3BNZXNzYWdlLCBBamZGaWxlSW5wdXQsIEFqZkZpbGVQcmV2aWV3fSBmcm9tICcuL2ZpbGUtaW5wdXQnO1xuXG5ATmdNb2R1bGUoe1xuICBkZWNsYXJhdGlvbnM6IFtBamZEcm9wTWVzc2FnZSwgQWpmRmlsZUlucHV0LCBBamZGaWxlUHJldmlld10sXG4gIGV4cG9ydHM6IFtBamZEcm9wTWVzc2FnZSwgQWpmRmlsZUlucHV0LCBBamZGaWxlUHJldmlld10sXG4gIGltcG9ydHM6IFtBamZDb21tb25Nb2R1bGUsIENvbW1vbk1vZHVsZSwgQWpmVHJhbnNsb2NvTW9kdWxlXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmlsZUlucHV0TW9kdWxlIHt9XG4iXX0=