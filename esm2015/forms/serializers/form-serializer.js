/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/serializers/form-serializer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export class AjfFormSerializer {
    /**
     * @param {?} form
     * @param {?=} context
     * @return {?}
     */
    static fromJson(form, context) {
        /** @type {?} */
        const choicesOrigins = (form.choicesOrigins || []).map((/**
         * @param {?} c
         * @return {?}
         */
        c => AjfChoicesOriginSerializer.fromJson(c)));
        /** @type {?} */
        const attachmentsOrigins = (form.attachmentsOrigins || []).map((/**
         * @param {?} a
         * @return {?}
         */
        a => AjfAttachmentsOriginSerializer.fromJson(a)));
        /** @type {?} */
        const nodes = (/** @type {?} */ ((form.nodes || [])
            .map((/**
         * @param {?} n
         * @return {?}
         */
        n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins)))));
        return Object.assign(Object.assign({}, form), { choicesOrigins,
            attachmentsOrigins,
            nodes, stringIdentifier: form.stringIdentifier || [], initContext: deepCopy(context || {}) });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvc2VyaWFsaXplcnMvZm9ybS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBdUJBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUl6QyxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUMvRSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUN2RSxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUVwRCxNQUFNLE9BQU8saUJBQWlCOzs7Ozs7SUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FBQyxJQUFzQixFQUFFLE9BQW9COztjQUNwRCxjQUFjLEdBQ2hCLENBQUMsSUFBSSxDQUFDLGNBQWMsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQywwQkFBMEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUM7O2NBQzFFLGtCQUFrQixHQUNwQixDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHOzs7O1FBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyw4QkFBOEIsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUM7O2NBQ2xGLEtBQUssR0FDUCxtQkFBQSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDO2FBQ2IsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLENBQUMsRUFBQyxFQUM3QztRQUN2Qyx1Q0FDSyxJQUFJLEtBQ1AsY0FBYztZQUNkLGtCQUFrQjtZQUNsQixLQUFLLEVBQ0wsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsRUFDN0MsV0FBVyxFQUFFLFFBQVEsQ0FBQyxPQUFPLElBQUksRUFBRSxDQUFDLElBQ3BDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnLi4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3NsaWRlcy9yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtBamZTbGlkZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3NsaWRlcy9zbGlkZSc7XG5pbXBvcnQge0FqZkF0dGFjaG1lbnRzT3JpZ2luU2VyaWFsaXplcn0gZnJvbSAnLi9hdHRhY2htZW50cy1vcmlnaW4tc2VyaWFsaXplcic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW5TZXJpYWxpemVyfSBmcm9tICcuL2Nob2ljZXMtb3JpZ2luLXNlcmlhbGl6ZXInO1xuaW1wb3J0IHtBamZOb2RlU2VyaWFsaXplcn0gZnJvbSAnLi9ub2RlLXNlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgQWpmRm9ybVNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24oZm9ybTogUGFydGlhbDxBamZGb3JtPiwgY29udGV4dD86IEFqZkNvbnRleHQpOiBBamZGb3JtIHtcbiAgICBjb25zdCBjaG9pY2VzT3JpZ2lucyA9XG4gICAgICAgIChmb3JtLmNob2ljZXNPcmlnaW5zIHx8IFtdKS5tYXAoYyA9PiBBamZDaG9pY2VzT3JpZ2luU2VyaWFsaXplci5mcm9tSnNvbihjKSk7XG4gICAgY29uc3QgYXR0YWNobWVudHNPcmlnaW5zID1cbiAgICAgICAgKGZvcm0uYXR0YWNobWVudHNPcmlnaW5zIHx8IFtdKS5tYXAoYSA9PiBBamZBdHRhY2htZW50c09yaWdpblNlcmlhbGl6ZXIuZnJvbUpzb24oYSkpO1xuICAgIGNvbnN0IG5vZGVzID1cbiAgICAgICAgKGZvcm0ubm9kZXMgfHwgW10pXG4gICAgICAgICAgICAubWFwKG4gPT4gQWpmTm9kZVNlcmlhbGl6ZXIuZnJvbUpzb24obiwgY2hvaWNlc09yaWdpbnMsIGF0dGFjaG1lbnRzT3JpZ2lucykpIGFzIChcbiAgICAgICAgICAgIEFqZlJlcGVhdGluZ1NsaWRlIHwgQWpmU2xpZGUpW107XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmZvcm0sXG4gICAgICBjaG9pY2VzT3JpZ2lucyxcbiAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgIG5vZGVzLFxuICAgICAgc3RyaW5nSWRlbnRpZmllcjogZm9ybS5zdHJpbmdJZGVudGlmaWVyIHx8IFtdLFxuICAgICAgaW5pdENvbnRleHQ6IGRlZXBDb3B5KGNvbnRleHQgfHwge30pLFxuICAgIH07XG4gIH1cbn1cbiJdfQ==