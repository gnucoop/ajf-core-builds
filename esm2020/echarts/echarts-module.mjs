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
import { AJF_ECHARTS_PROVIDER } from './echarts-config';
import { AjfEchartsDirective } from './echarts-directive';
import * as i0 from "@angular/core";
export class AjfEchartsModule {
    static forRoot(config) {
        let echarts = config.echarts;
        if (typeof echarts !== 'function') {
            echarts = (async () => echarts);
        }
        return {
            ngModule: AjfEchartsModule,
            providers: [{ provide: AJF_ECHARTS_PROVIDER, useValue: echarts }],
        };
    }
}
AjfEchartsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfEchartsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfEchartsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfEchartsModule, declarations: [AjfEchartsDirective], exports: [AjfEchartsDirective] });
AjfEchartsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfEchartsModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfEchartsModule, decorators: [{
            type: NgModule,
            args: [{
                    declarations: [AjfEchartsDirective],
                    exports: [AjfEchartsDirective],
                }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZWNoYXJ0cy1tb2R1bGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9wcm9qZWN0cy9jb3JlL2VjaGFydHMvc3JjL2VjaGFydHMtbW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBc0IsUUFBUSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRTVELE9BQU8sRUFBdUMsb0JBQW9CLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUM1RixPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQzs7QUFNeEQsTUFBTSxPQUFPLGdCQUFnQjtJQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLE1BQXdCO1FBQ3JDLElBQUksT0FBTyxHQUE2QixNQUFNLENBQUMsT0FBTyxDQUFDO1FBQ3ZELElBQUksT0FBTyxPQUFPLEtBQUssVUFBVSxFQUFFO1lBQ2pDLE9BQU8sR0FBRyxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUMsT0FBTyxDQUF1QixDQUFDO1NBQ3ZEO1FBQ0QsT0FBTztZQUNMLFFBQVEsRUFBRSxnQkFBZ0I7WUFDMUIsU0FBUyxFQUFFLENBQUMsRUFBQyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsUUFBUSxFQUFFLE9BQU8sRUFBQyxDQUFDO1NBQ2hFLENBQUM7SUFDSixDQUFDOzs2R0FWVSxnQkFBZ0I7OEdBQWhCLGdCQUFnQixpQkFIWixtQkFBbUIsYUFDeEIsbUJBQW1COzhHQUVsQixnQkFBZ0I7MkZBQWhCLGdCQUFnQjtrQkFKNUIsUUFBUTttQkFBQztvQkFDUixZQUFZLEVBQUUsQ0FBQyxtQkFBbUIsQ0FBQztvQkFDbkMsT0FBTyxFQUFFLENBQUMsbUJBQW1CLENBQUM7aUJBQy9CIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge01vZHVsZVdpdGhQcm92aWRlcnMsIE5nTW9kdWxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZFY2hhcnRzQ29uZmlnLCBBamZFY2hhcnRzUHJvdmlkZXIsIEFKRl9FQ0hBUlRTX1BST1ZJREVSfSBmcm9tICcuL2VjaGFydHMtY29uZmlnJztcbmltcG9ydCB7QWpmRWNoYXJ0c0RpcmVjdGl2ZX0gZnJvbSAnLi9lY2hhcnRzLWRpcmVjdGl2ZSc7XG5cbkBOZ01vZHVsZSh7XG4gIGRlY2xhcmF0aW9uczogW0FqZkVjaGFydHNEaXJlY3RpdmVdLFxuICBleHBvcnRzOiBbQWpmRWNoYXJ0c0RpcmVjdGl2ZV0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkVjaGFydHNNb2R1bGUge1xuICBzdGF0aWMgZm9yUm9vdChjb25maWc6IEFqZkVjaGFydHNDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzPEFqZkVjaGFydHNNb2R1bGU+IHtcbiAgICBsZXQgZWNoYXJ0czogYW55IHwgQWpmRWNoYXJ0c1Byb3ZpZGVyID0gY29uZmlnLmVjaGFydHM7XG4gICAgaWYgKHR5cGVvZiBlY2hhcnRzICE9PSAnZnVuY3Rpb24nKSB7XG4gICAgICBlY2hhcnRzID0gKGFzeW5jICgpID0+IGVjaGFydHMpIGFzIEFqZkVjaGFydHNQcm92aWRlcjtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG5nTW9kdWxlOiBBamZFY2hhcnRzTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbe3Byb3ZpZGU6IEFKRl9FQ0hBUlRTX1BST1ZJREVSLCB1c2VWYWx1ZTogZWNoYXJ0c31dLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==