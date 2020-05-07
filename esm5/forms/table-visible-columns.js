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
        return (instance.controls || [])
            .map(function (v) { return __spread([v[0]], v[1]); });
    };
    AjfTableVisibleColumnsPipe.decorators = [
        { type: Pipe, args: [{ name: 'ajfTableVisibleColumns' },] }
    ];
    return AjfTableVisibleColumnsPipe;
}());
export { AjfTableVisibleColumnsPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlzaWJsZS1jb2x1bW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdGFibGUtdmlzaWJsZS1jb2x1bW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUlsRDtJQUFBO0lBa0JBLENBQUM7SUFoQkMsOENBQVMsR0FBVCxVQUFVLFFBQStCO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMzQixJQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0IsR0FBRyxDQUFDLE1BQU0sQ0FDSCxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQ2hCLFVBQUMsSUFBYSxFQUFFLEdBQUc7b0JBQ2pCLE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RSxDQUFDLEVBQ0QsS0FBSyxDQUFDLEVBSkgsQ0FJRyxDQUFDO3FCQUNiLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxpQkFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFkLENBQWUsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hDLEdBQUcsQ0FBQyxHQUFHLENBQUMsVUFBQSxDQUFDLElBQUksaUJBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBZCxDQUFlLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sQ0FBRSxRQUFRLENBQUMsUUFBeUQsSUFBSSxFQUFFLENBQUM7YUFDN0UsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLGlCQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQWQsQ0FBZSxDQUFDLENBQUM7SUFDakMsQ0FBQzs7Z0JBakJGLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBQzs7SUFrQnRDLGlDQUFDO0NBQUEsQUFsQkQsSUFrQkM7U0FqQlksMEJBQTBCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZUZvcm1Db250cm9sfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy90YWJsZS1mb3JtLWNvbnRyb2wnO1xuXG5AUGlwZSh7bmFtZTogJ2FqZlRhYmxlVmlzaWJsZUNvbHVtbnMnfSlcbmV4cG9ydCBjbGFzcyBBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5zdGFuY2U6IEFqZlRhYmxlRmllbGRJbnN0YW5jZSk6IChzdHJpbmd8bnVtYmVyfEFqZlRhYmxlRm9ybUNvbnRyb2wpW11bXSB7XG4gICAgaWYgKCFpbnN0YW5jZS5ub2RlLmVkaXRhYmxlKSB7XG4gICAgICBjb25zdCB2YWwgPSBpbnN0YW5jZS52YWx1ZSB8fCBbXTtcbiAgICAgIHJldHVybiBpbnN0YW5jZS5oaWRlRW1wdHlSb3dzID9cbiAgICAgICAgICB2YWwuZmlsdGVyKFxuICAgICAgICAgICAgICAgICBjb2wgPT4gY29sWzFdLnJlZHVjZShcbiAgICAgICAgICAgICAgICAgICAgIChwcmV2OiBib29sZWFuLCBjdXIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHByZXYgfHwgKGN1ciAhPSBudWxsICYmIGN1ciAhPT0gJycgJiYgY3VyICE9PSAwICYmIGN1ciAhPT0gJzAnKTtcbiAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICBmYWxzZSkpXG4gICAgICAgICAgICAgIC5tYXAodiA9PiBbdlswXSwgLi4udlsxXV0pIDpcbiAgICAgICAgICB2YWwubWFwKHYgPT4gW3ZbMF0sIC4uLnZbMV1dKTtcbiAgICB9XG4gICAgcmV0dXJuICgoaW5zdGFuY2UuY29udHJvbHMgYXMgW3N0cmluZywgKHN0cmluZyB8IEFqZlRhYmxlRm9ybUNvbnRyb2wpW11dW10pIHx8IFtdKVxuICAgICAgICAubWFwKHYgPT4gW3ZbMF0sIC4uLnZbMV1dKTtcbiAgfVxufVxuIl19