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
import { deepCopy } from '@ajf/core/utils';
import { AjfAttachmentsOriginSerializer } from './attachments-origin-serializer';
import { AjfChoicesOriginSerializer } from './choices-origin-serializer';
import { AjfNodeSerializer } from './node-serializer';
/**
 *  Create an AjfForm by json schema, apply a default value for stringIdentifier and initContext
 */
export class AjfFormSerializer {
    static fromJson(form, context) {
        /**
         * create choicesOrigins by serializer
         */
        const choicesOrigins = (form.choicesOrigins || []).map(c => AjfChoicesOriginSerializer.fromJson(c));
        /**
         * create attachmentsOrigins by serializer
         */
        const attachmentsOrigins = (form.attachmentsOrigins || []).map(a => AjfAttachmentsOriginSerializer.fromJson(a));
        /**
         * create nodes by serializer
         */
        const nodes = (form.nodes || [])
            .map(n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins));
        return {
            ...form,
            choicesOrigins,
            attachmentsOrigins,
            nodes,
            stringIdentifier: form.stringIdentifier || [],
            initContext: deepCopy(context || {}),
        };
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvc2VyaWFsaXplcnMvZm9ybS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUdILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUl6QyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRDs7R0FFRztBQUNILE1BQU0sT0FBTyxpQkFBaUI7SUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFzQixFQUFFLE9BQW9CO1FBQzFEOztXQUVHO1FBQ0gsTUFBTSxjQUFjLEdBQ2hCLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNqRjs7V0FFRztRQUNILE1BQU0sa0JBQWtCLEdBQ3BCLENBQUMsSUFBSSxDQUFDLGtCQUFrQixJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLDhCQUE4QixDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3pGOztXQUVHO1FBQ0gsTUFBTSxLQUFLLEdBQ1AsQ0FBQyxJQUFJLENBQUMsS0FBSyxJQUFJLEVBQUUsQ0FBQzthQUNiLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGlCQUFpQixDQUFDLFFBQVEsQ0FBQyxDQUFDLEVBQUUsY0FBYyxFQUFFLGtCQUFrQixDQUFDLENBQzVDLENBQUM7UUFDeEMsT0FBTztZQUNMLEdBQUcsSUFBSTtZQUNQLGNBQWM7WUFDZCxrQkFBa0I7WUFDbEIsS0FBSztZQUNMLGdCQUFnQixFQUFFLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFO1lBQzdDLFdBQVcsRUFBRSxRQUFRLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQztTQUNyQyxDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnLi4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3NsaWRlcy9yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtBamZTbGlkZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3NsaWRlcy9zbGlkZSc7XG5pbXBvcnQge0FqZkF0dGFjaG1lbnRzT3JpZ2luU2VyaWFsaXplcn0gZnJvbSAnLi9hdHRhY2htZW50cy1vcmlnaW4tc2VyaWFsaXplcic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW5TZXJpYWxpemVyfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLXNlcmlhbGl6ZXInO1xuaW1wb3J0IHtBamZOb2RlU2VyaWFsaXplcn0gZnJvbSAnLi9ub2RlLXNlcmlhbGl6ZXInO1xuXG4vKipcbiAqICBDcmVhdGUgYW4gQWpmRm9ybSBieSBqc29uIHNjaGVtYSwgYXBwbHkgYSBkZWZhdWx0IHZhbHVlIGZvciBzdHJpbmdJZGVudGlmaWVyIGFuZCBpbml0Q29udGV4dFxuICovXG5leHBvcnQgY2xhc3MgQWpmRm9ybVNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24oZm9ybTogUGFydGlhbDxBamZGb3JtPiwgY29udGV4dD86IEFqZkNvbnRleHQpOiBBamZGb3JtIHtcbiAgICAvKipcbiAgICAgKiBjcmVhdGUgY2hvaWNlc09yaWdpbnMgYnkgc2VyaWFsaXplclxuICAgICAqL1xuICAgIGNvbnN0IGNob2ljZXNPcmlnaW5zID1cbiAgICAgICAgKGZvcm0uY2hvaWNlc09yaWdpbnMgfHwgW10pLm1hcChjID0+IEFqZkNob2ljZXNPcmlnaW5TZXJpYWxpemVyLmZyb21Kc29uKGMpKTtcbiAgICAvKipcbiAgICAgKiBjcmVhdGUgYXR0YWNobWVudHNPcmlnaW5zIGJ5IHNlcmlhbGl6ZXJcbiAgICAgKi9cbiAgICBjb25zdCBhdHRhY2htZW50c09yaWdpbnMgPVxuICAgICAgICAoZm9ybS5hdHRhY2htZW50c09yaWdpbnMgfHwgW10pLm1hcChhID0+IEFqZkF0dGFjaG1lbnRzT3JpZ2luU2VyaWFsaXplci5mcm9tSnNvbihhKSk7XG4gICAgLyoqXG4gICAgICogY3JlYXRlIG5vZGVzIGJ5IHNlcmlhbGl6ZXJcbiAgICAgKi9cbiAgICBjb25zdCBub2RlcyA9XG4gICAgICAgIChmb3JtLm5vZGVzIHx8IFtdKVxuICAgICAgICAgICAgLm1hcChuID0+IEFqZk5vZGVTZXJpYWxpemVyLmZyb21Kc29uKG4sIGNob2ljZXNPcmlnaW5zLCBhdHRhY2htZW50c09yaWdpbnMpKSBhcyAoXG4gICAgICAgICAgICBBamZSZXBlYXRpbmdTbGlkZSB8IEFqZlNsaWRlKVtdO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5mb3JtLFxuICAgICAgY2hvaWNlc09yaWdpbnMsXG4gICAgICBhdHRhY2htZW50c09yaWdpbnMsXG4gICAgICBub2RlcyxcbiAgICAgIHN0cmluZ0lkZW50aWZpZXI6IGZvcm0uc3RyaW5nSWRlbnRpZmllciB8fCBbXSxcbiAgICAgIGluaXRDb250ZXh0OiBkZWVwQ29weShjb250ZXh0IHx8IHt9KSxcbiAgICB9O1xuICB9XG59XG4iXX0=