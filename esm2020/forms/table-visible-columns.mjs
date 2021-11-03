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
            return instance.hideEmptyRows
                ? val
                    .filter(col => col[1].reduce((prev, cur) => {
                    return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                }, false))
                    .map(v => [v[0], ...v[1]])
                : val.map(v => [v[0], ...v[1]]);
        }
        return (instance.controls || []).map(v => [
            v[0],
            ...v[1],
        ]);
    }
}
AjfTableVisibleColumnsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfTableVisibleColumnsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfTableVisibleColumnsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfTableVisibleColumnsPipe, name: "ajfTableVisibleColumns" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfTableVisibleColumnsPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfTableVisibleColumns' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGFibGUtdmlzaWJsZS1jb2x1bW5zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdGFibGUtdmlzaWJsZS1jb2x1bW5zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDOztBQUlsRDs7Ozs7R0FLRztBQUNILG1DQUFtQztBQUVuQyxNQUFNLE9BQU8sMEJBQTBCO0lBQ3JDLFNBQVMsQ0FBQyxRQUErQjtRQUN2QyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxRQUFRLEVBQUU7WUFDM0IsTUFBTSxHQUFHLEdBQUcsUUFBUSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFDakMsT0FBTyxRQUFRLENBQUMsYUFBYTtnQkFDM0IsQ0FBQyxDQUFDLEdBQUc7cUJBQ0EsTUFBTSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQ1osR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQWEsRUFBRSxHQUFHLEVBQUUsRUFBRTtvQkFDbkMsT0FBTyxJQUFJLElBQUksQ0FBQyxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsS0FBSyxFQUFFLElBQUksR0FBRyxLQUFLLENBQUMsSUFBSSxHQUFHLEtBQUssR0FBRyxDQUFDLENBQUM7Z0JBQ3pFLENBQUMsRUFBRSxLQUFLLENBQUMsQ0FDVjtxQkFDQSxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM5QixDQUFDLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztTQUNuQztRQUNELE9BQU8sQ0FBRSxRQUFRLENBQUMsUUFBeUQsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUMxRixDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ0osR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQ1IsQ0FBQyxDQUFDO0lBQ0wsQ0FBQzs7NEhBbEJVLDBCQUEwQjswSEFBMUIsMEJBQTBCO2dHQUExQiwwQkFBMEI7a0JBRHRDLElBQUk7bUJBQUMsRUFBQyxJQUFJLEVBQUUsd0JBQXdCLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy90YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRhYmxlRm9ybUNvbnRyb2x9IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL3RhYmxlLWZvcm0tY29udHJvbCc7XG5cbi8qKlxuICogSXQgcmV0dXJucyBhbGwgdmlzaWJsZSBjb2x1bW5zIG9mIGZvcm0gdGFibGUuXG4gKlxuICogQGV4cG9ydFxuICogQGNsYXNzIEFqZlRhYmxlVmlzaWJsZUNvbHVtbnNQaXBlXG4gKi9cbi8vIFRPRE8gaGVscGZ1bD8gY3VycmVudGx5IG5vdCB1c2VkXG5AUGlwZSh7bmFtZTogJ2FqZlRhYmxlVmlzaWJsZUNvbHVtbnMnfSlcbmV4cG9ydCBjbGFzcyBBamZUYWJsZVZpc2libGVDb2x1bW5zUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0oaW5zdGFuY2U6IEFqZlRhYmxlRmllbGRJbnN0YW5jZSk6IChzdHJpbmcgfCBudW1iZXIgfCBBamZUYWJsZUZvcm1Db250cm9sKVtdW10ge1xuICAgIGlmICghaW5zdGFuY2Uubm9kZS5lZGl0YWJsZSkge1xuICAgICAgY29uc3QgdmFsID0gaW5zdGFuY2UudmFsdWUgfHwgW107XG4gICAgICByZXR1cm4gaW5zdGFuY2UuaGlkZUVtcHR5Um93c1xuICAgICAgICA/IHZhbFxuICAgICAgICAgICAgLmZpbHRlcihjb2wgPT5cbiAgICAgICAgICAgICAgY29sWzFdLnJlZHVjZSgocHJldjogYm9vbGVhbiwgY3VyKSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHByZXYgfHwgKGN1ciAhPSBudWxsICYmIGN1ciAhPT0gJycgJiYgY3VyICE9PSAwICYmIGN1ciAhPT0gJzAnKTtcbiAgICAgICAgICAgICAgfSwgZmFsc2UpLFxuICAgICAgICAgICAgKVxuICAgICAgICAgICAgLm1hcCh2ID0+IFt2WzBdLCAuLi52WzFdXSlcbiAgICAgICAgOiB2YWwubWFwKHYgPT4gW3ZbMF0sIC4uLnZbMV1dKTtcbiAgICB9XG4gICAgcmV0dXJuICgoaW5zdGFuY2UuY29udHJvbHMgYXMgW3N0cmluZywgKHN0cmluZyB8IEFqZlRhYmxlRm9ybUNvbnRyb2wpW11dW10pIHx8IFtdKS5tYXAodiA9PiBbXG4gICAgICB2WzBdLFxuICAgICAgLi4udlsxXSxcbiAgICBdKTtcbiAgfVxufVxuIl19