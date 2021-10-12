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
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * It returns all visible columns of form table.
 *
 * @export
 * @class AjfTableVisibleColumnsPipe
 */
// TODO helpful? currently not used
export class AjfTableVisibleColumnsPipe {
    transform(instance) {
        if (!instance.node.editable) {
            const val = instance.value || [];
            return instance.hideEmptyRows ?
                val.filter(col => col[1].reduce((prev, cur) => {
                    return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                }, false))
                    .map(v => [v[0], ...v[1]]) :
                val.map(v => [v[0], ...v[1]]);
        }
        return (instance.controls || [])
            .map(v => [v[0], ...v[1]]);
    }
}
AjfTableVisibleColumnsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTableVisibleColumnsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfTableVisibleColumnsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTableVisibleColumnsPipe, name: "ajfTableVisibleColumns" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfTableVisibleColumnsPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfTableVisibleColumns' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlzaWJsZS1jb2x1bW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdGFibGUtdmlzaWJsZS1jb2x1bW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDOztBQUlsRDs7Ozs7R0FLRztBQUNILG1DQUFtQztBQUVuQyxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFNBQVMsQ0FBQyxRQUErQjtRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDM0IsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDakMsT0FBTyxRQUFRLENBQUMsYUFBYSxDQUFDLENBQUM7Z0JBQzNCLEdBQUcsQ0FBQyxNQUFNLENBQ0gsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUNoQixDQUFDLElBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDckIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3pFLENBQUMsRUFDRCxLQUFLLENBQUMsQ0FBQztxQkFDYixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sQ0FBRSxRQUFRLENBQUMsUUFBeUQsSUFBSSxFQUFFLENBQUM7YUFDN0UsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0lBQ2pDLENBQUM7OytIQWhCVSwwQkFBMEI7NkhBQTFCLDBCQUEwQjttR0FBMUIsMEJBQTBCO2tCQUR0QyxJQUFJO21CQUFDLEVBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZUZvcm1Db250cm9sfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy90YWJsZS1mb3JtLWNvbnRyb2wnO1xuXG4vKipcbiAqIEl0IHJldHVybnMgYWxsIHZpc2libGUgY29sdW1ucyBvZiBmb3JtIHRhYmxlLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZVxuICovXG4vLyBUT0RPIGhlbHBmdWw/IGN1cnJlbnRseSBub3QgdXNlZFxuQFBpcGUoe25hbWU6ICdhamZUYWJsZVZpc2libGVDb2x1bW5zJ30pXG5leHBvcnQgY2xhc3MgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGluc3RhbmNlOiBBamZUYWJsZUZpZWxkSW5zdGFuY2UpOiAoc3RyaW5nfG51bWJlcnxBamZUYWJsZUZvcm1Db250cm9sKVtdW10ge1xuICAgIGlmICghaW5zdGFuY2Uubm9kZS5lZGl0YWJsZSkge1xuICAgICAgY29uc3QgdmFsID0gaW5zdGFuY2UudmFsdWUgfHwgW107XG4gICAgICByZXR1cm4gaW5zdGFuY2UuaGlkZUVtcHR5Um93cyA/XG4gICAgICAgICAgdmFsLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgY29sID0+IGNvbFsxXS5yZWR1Y2UoXG4gICAgICAgICAgICAgICAgICAgICAocHJldjogYm9vbGVhbiwgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2IHx8IChjdXIgIT0gbnVsbCAmJiBjdXIgIT09ICcnICYmIGN1ciAhPT0gMCAmJiBjdXIgIT09ICcwJyk7XG4gICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgZmFsc2UpKVxuICAgICAgICAgICAgICAubWFwKHYgPT4gW3ZbMF0sIC4uLnZbMV1dKSA6XG4gICAgICAgICAgdmFsLm1hcCh2ID0+IFt2WzBdLCAuLi52WzFdXSk7XG4gICAgfVxuICAgIHJldHVybiAoKGluc3RhbmNlLmNvbnRyb2xzIGFzIFtzdHJpbmcsIChzdHJpbmcgfCBBamZUYWJsZUZvcm1Db250cm9sKVtdXVtdKSB8fCBbXSlcbiAgICAgICAgLm1hcCh2ID0+IFt2WzBdLCAuLi52WzFdXSk7XG4gIH1cbn1cbiJdfQ==