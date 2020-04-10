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
import { __read, __spread } from "tslib";
import { Pipe } from '@angular/core';
var AjfTableVisibleColumnsPipe = /** @class */ (function () {
    function AjfTableVisibleColumnsPipe() {
    }
    AjfTableVisibleColumnsPipe.prototype.transform = function (instance) {
        if (!instance.node.editable) {
            var val = instance.value || [];
            return instance.hideEmptyRows ?
                val.filter(function (col) { return col[1].reduce(function (prev, cur) {
                    return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                }, false); })
                    .map(function (v) { return __spread([v[0]], v[1]); }) :
                val.map(function (v) { return __spread([v[0]], v[1]); });
        }
        return (instance.controls || []).map(function (v) { return __spread([v[0]], v[1]); });
    };
    AjfTableVisibleColumnsPipe.decorators = [
        { type: Pipe, args: [{ name: 'ajfTableVisibleColumns' },] }
    ];
    return AjfTableVisibleColumnsPipe;
}());
export { AjfTableVisibleColumnsPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlzaWJsZS1jb2x1bW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdGFibGUtdmlzaWJsZS1jb2x1bW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUlsRDtJQUFBO0lBaUJBLENBQUM7SUFmQyw4Q0FBUyxHQUFULFVBQVUsUUFBK0I7UUFDdkMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFFO1lBQzNCLElBQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO1lBQ2pDLE9BQU8sUUFBUSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMzQixHQUFHLENBQUMsTUFBTSxDQUNILFVBQUEsR0FBRyxJQUFJLE9BQUEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FDaEIsVUFBQyxJQUFhLEVBQUUsR0FBRztvQkFDakIsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3pFLENBQUMsRUFDRCxLQUFLLENBQUMsRUFKSCxDQUlHLENBQUM7cUJBQ2IsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLGlCQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQWQsQ0FBZSxDQUFDLENBQUMsQ0FBQztnQkFDaEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxpQkFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFkLENBQWUsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLGlCQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQWQsQ0FBZSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Z0JBaEJGLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBQzs7SUFpQnRDLGlDQUFDO0NBQUEsQUFqQkQsSUFpQkM7U0FoQlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuXG5AUGlwZSh7bmFtZTogJ2FqZlRhYmxlVmlzaWJsZUNvbHVtbnMnfSlcbmV4cG9ydCBjbGFzcyBBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5zdGFuY2U6IEFqZlRhYmxlRmllbGRJbnN0YW5jZSk6IChzdHJpbmd8bnVtYmVyfEZvcm1Db250cm9sKVtdW10ge1xuICAgIGlmICghaW5zdGFuY2Uubm9kZS5lZGl0YWJsZSkge1xuICAgICAgY29uc3QgdmFsID0gaW5zdGFuY2UudmFsdWUgfHwgW107XG4gICAgICByZXR1cm4gaW5zdGFuY2UuaGlkZUVtcHR5Um93cyA/XG4gICAgICAgICAgdmFsLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgY29sID0+IGNvbFsxXS5yZWR1Y2UoXG4gICAgICAgICAgICAgICAgICAgICAocHJldjogYm9vbGVhbiwgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2IHx8IChjdXIgIT0gbnVsbCAmJiBjdXIgIT09ICcnICYmIGN1ciAhPT0gMCAmJiBjdXIgIT09ICcwJyk7XG4gICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgZmFsc2UpKVxuICAgICAgICAgICAgICAubWFwKHYgPT4gW3ZbMF0sIC4uLnZbMV1dKSA6XG4gICAgICAgICAgdmFsLm1hcCh2ID0+IFt2WzBdLCAuLi52WzFdXSk7XG4gICAgfVxuICAgIHJldHVybiAoaW5zdGFuY2UuY29udHJvbHMgfHwgW10pLm1hcCh2ID0+IFt2WzBdLCAuLi52WzFdXSk7XG4gIH1cbn1cbiJdfQ==