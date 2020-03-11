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
            return instance.hideEmptyRows
                ? val.filter(function (col) { return col[1].reduce(function (prev, cur) {
                    return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                }, false); }).map(function (v) { return __spread([v[0]], v[1]); })
                : val.map(function (v) { return __spread([v[0]], v[1]); });
        }
        return (instance.controls || []).map(function (v) { return __spread([v[0]], v[1]); });
    };
    AjfTableVisibleColumnsPipe.decorators = [
        { type: Pipe, args: [{ name: 'ajfTableVisibleColumns' },] }
    ];
    return AjfTableVisibleColumnsPipe;
}());
export { AjfTableVisibleColumnsPipe };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlzaWJsZS1jb2x1bW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdGFibGUtdmlzaWJsZS1jb2x1bW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsSUFBSSxFQUFnQixNQUFNLGVBQWUsQ0FBQztBQUlsRDtJQUFBO0lBYUEsQ0FBQztJQVhDLDhDQUFTLEdBQVQsVUFBVSxRQUErQjtRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDM0IsSUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDakMsT0FBTyxRQUFRLENBQUMsYUFBYTtnQkFDM0IsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsSUFBYSxFQUFFLEdBQUc7b0JBQ25ELE9BQU8sSUFBSSxJQUFJLENBQUMsR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLEtBQUssRUFBRSxJQUFJLEdBQUcsS0FBSyxDQUFDLElBQUksR0FBRyxLQUFLLEdBQUcsQ0FBQyxDQUFDO2dCQUN6RSxDQUFDLEVBQUUsS0FBSyxDQUFDLEVBRlcsQ0FFWCxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLGlCQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQWQsQ0FBZSxDQUFDO2dCQUNwQyxDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxVQUFBLENBQUMsSUFBSSxpQkFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFkLENBQWUsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxDQUFDLFFBQVEsQ0FBQyxRQUFRLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLGlCQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQWQsQ0FBZSxDQUFDLENBQUM7SUFDN0QsQ0FBQzs7Z0JBWkYsSUFBSSxTQUFDLEVBQUMsSUFBSSxFQUFFLHdCQUF3QixFQUFDOztJQWF0QyxpQ0FBQztDQUFBLEFBYkQsSUFhQztTQVpZLDBCQUEwQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL3RhYmxlLWZpZWxkLWluc3RhbmNlJztcblxuQFBpcGUoe25hbWU6ICdhamZUYWJsZVZpc2libGVDb2x1bW5zJ30pXG5leHBvcnQgY2xhc3MgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGluc3RhbmNlOiBBamZUYWJsZUZpZWxkSW5zdGFuY2UpOiAoc3RyaW5nfG51bWJlcnxGb3JtQ29udHJvbClbXVtdIHtcbiAgICBpZiAoIWluc3RhbmNlLm5vZGUuZWRpdGFibGUpIHtcbiAgICAgIGNvbnN0IHZhbCA9IGluc3RhbmNlLnZhbHVlIHx8IFtdO1xuICAgICAgcmV0dXJuIGluc3RhbmNlLmhpZGVFbXB0eVJvd3NcbiAgICAgICAgPyB2YWwuZmlsdGVyKGNvbCA9PiBjb2xbMV0ucmVkdWNlKChwcmV2OiBib29sZWFuLCBjdXIpID0+IHtcbiAgICAgICAgICByZXR1cm4gcHJldiB8fCAoY3VyICE9IG51bGwgJiYgY3VyICE9PSAnJyAmJiBjdXIgIT09IDAgJiYgY3VyICE9PSAnMCcpO1xuICAgICAgICB9LCBmYWxzZSkpLm1hcCh2ID0+IFt2WzBdLCAuLi52WzFdXSlcbiAgICAgICAgOiB2YWwubWFwKHYgPT4gW3ZbMF0sIC4uLnZbMV1dKTtcbiAgICB9XG4gICAgcmV0dXJuIChpbnN0YW5jZS5jb250cm9scyB8fCBbXSkubWFwKHYgPT4gW3ZbMF0sIC4uLnZbMV1dKTtcbiAgfVxufVxuIl19