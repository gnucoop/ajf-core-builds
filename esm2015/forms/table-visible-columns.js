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
AjfTableVisibleColumnsPipe.decorators = [
    { type: Pipe, args: [{ name: 'ajfTableVisibleColumns' },] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlzaWJsZS1jb2x1bW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdGFibGUtdmlzaWJsZS1jb2x1bW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBS2xELE1BQU0sT0FBTywwQkFBMEI7SUFDckMsU0FBUyxDQUFDLFFBQStCO1FBQ3ZDLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRTtZQUMzQixNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQztZQUNqQyxPQUFPLFFBQVEsQ0FBQyxhQUFhLENBQUMsQ0FBQztnQkFDM0IsR0FBRyxDQUFDLE1BQU0sQ0FDSCxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQ2hCLENBQUMsSUFBYSxFQUFFLEdBQUcsRUFBRSxFQUFFO29CQUNyQixPQUFPLElBQUksSUFBSSxDQUFDLEdBQUcsSUFBSSxJQUFJLElBQUksR0FBRyxLQUFLLEVBQUUsSUFBSSxHQUFHLEtBQUssQ0FBQyxJQUFJLEdBQUcsS0FBSyxHQUFHLENBQUMsQ0FBQztnQkFDekUsQ0FBQyxFQUNELEtBQUssQ0FBQyxDQUFDO3FCQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ25DO1FBQ0QsT0FBTyxDQUFFLFFBQVEsQ0FBQyxRQUF5RCxJQUFJLEVBQUUsQ0FBQzthQUM3RSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDakMsQ0FBQzs7O1lBakJGLElBQUksU0FBQyxFQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL3RhYmxlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGFibGVGb3JtQ29udHJvbH0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvdGFibGUtZm9ybS1jb250cm9sJztcblxuQFBpcGUoe25hbWU6ICdhamZUYWJsZVZpc2libGVDb2x1bW5zJ30pXG5leHBvcnQgY2xhc3MgQWpmVGFibGVWaXNpYmxlQ29sdW1uc1BpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGluc3RhbmNlOiBBamZUYWJsZUZpZWxkSW5zdGFuY2UpOiAoc3RyaW5nfG51bWJlcnxBamZUYWJsZUZvcm1Db250cm9sKVtdW10ge1xuICAgIGlmICghaW5zdGFuY2Uubm9kZS5lZGl0YWJsZSkge1xuICAgICAgY29uc3QgdmFsID0gaW5zdGFuY2UudmFsdWUgfHwgW107XG4gICAgICByZXR1cm4gaW5zdGFuY2UuaGlkZUVtcHR5Um93cyA/XG4gICAgICAgICAgdmFsLmZpbHRlcihcbiAgICAgICAgICAgICAgICAgY29sID0+IGNvbFsxXS5yZWR1Y2UoXG4gICAgICAgICAgICAgICAgICAgICAocHJldjogYm9vbGVhbiwgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBwcmV2IHx8IChjdXIgIT0gbnVsbCAmJiBjdXIgIT09ICcnICYmIGN1ciAhPT0gMCAmJiBjdXIgIT09ICcwJyk7XG4gICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAgZmFsc2UpKVxuICAgICAgICAgICAgICAubWFwKHYgPT4gW3ZbMF0sIC4uLnZbMV1dKSA6XG4gICAgICAgICAgdmFsLm1hcCh2ID0+IFt2WzBdLCAuLi52WzFdXSk7XG4gICAgfVxuICAgIHJldHVybiAoKGluc3RhbmNlLmNvbnRyb2xzIGFzIFtzdHJpbmcsIChzdHJpbmcgfCBBamZUYWJsZUZvcm1Db250cm9sKVtdXVtdKSB8fCBbXSlcbiAgICAgICAgLm1hcCh2ID0+IFt2WzBdLCAuLi52WzFdXSk7XG4gIH1cbn1cbiJdfQ==