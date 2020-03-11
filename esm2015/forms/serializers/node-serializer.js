/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/serializers/node-serializer.ts
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
import { AjfConditionSerializer, AjfFormulaSerializer } from '@ajf/core/models';
import { AjfFieldType } from '../interface/fields/field-type';
import { AjfNodeType } from '../interface/nodes/node-type';
import { componentsMap } from '../utils/fields/fields-map';
import { createField } from '../utils/fields/create-field';
import { createFieldWithChoices } from '../utils/fields/create-field-with-choices';
import { createContainerNode } from '../utils/nodes/create-container-node';
import { createNode } from '../utils/nodes/create-node';
import { createNodeGroup } from '../utils/nodes/create-node-group';
import { createRepeatingNode } from '../utils/nodes/create-repeating-node';
import { createRepeatingSlide } from '../utils/slides/create-repeating-slide';
import { createSlide } from '../utils/slides/create-slide';
import { AjfValidationGroupSerializer } from './validation-group-serializer';
import { AjfWarningGroupSerializer } from './warning-group-serializer';
export class AjfNodeSerializer {
    /**
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static fromJson(json, choicesOrigins, attachmentsOrigins) {
        /** @type {?} */
        const err = 'Malformed node';
        json.name = json.name || '';
        if (json.id == null || json.parent == null || json.nodeType == null) {
            throw new Error(err);
        }
        /** @type {?} */
        const obj = (/** @type {?} */ (json));
        if (obj.visibility) {
            obj.visibility = AjfConditionSerializer.fromJson(obj.visibility);
        }
        obj.conditionalBranches =
            (obj.conditionalBranches || []).map((/**
             * @param {?} c
             * @return {?}
             */
            c => AjfConditionSerializer.fromJson(c)));
        switch (obj.nodeType) {
            case AjfNodeType.AjfField:
                return AjfNodeSerializer._fieldFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfFieldNodeLink:
                return AjfNodeSerializer._fieldNodeLinkFromJson((/** @type {?} */ (obj)));
            case AjfNodeType.AjfNodeGroup:
                return AjfNodeSerializer._nodeGroupFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfRepeatingSlide:
                return AjfNodeSerializer._repeatingSlideFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfSlide:
                return AjfNodeSerializer._slideFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
        }
        throw new Error(err);
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static _containerNodeFromJson(json, choicesOrigins, attachmentsOrigins) {
        json.nodes = (json.nodes ||
            []).map((/**
         * @param {?} n
         * @return {?}
         */
        n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins)));
        return createContainerNode(json);
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static _fieldFromJson(json, choicesOrigins, attachmentsOrigins) {
        if (json.fieldType == null) {
            throw new Error('Malformed field');
        }
        /** @type {?} */
        const obj = (/** @type {?} */ (json));
        if (obj.validation) {
            obj.validation = AjfValidationGroupSerializer.fromJson(obj.validation);
        }
        if (obj.warning) {
            obj.warning = AjfWarningGroupSerializer.fromJson(obj.warning);
        }
        if (json.attachmentsOriginRef) {
            obj.attachmentOrigin =
                (attachmentsOrigins || []).find((/**
                 * @param {?} a
                 * @return {?}
                 */
                a => a.name === json.attachmentsOriginRef));
        }
        if (obj.nextSlideCondition) {
            obj.nextSlideCondition = AjfConditionSerializer.fromJson(obj.nextSlideCondition);
        }
        /** @type {?} */
        const isCustomFieldWithChoice = obj.fieldType > 100
            && componentsMap[obj.fieldType] != null
            && componentsMap[obj.fieldType].isFieldWithChoice === true;
        if (isCustomFieldWithChoice) {
            return AjfNodeSerializer._fieldWithChoicesFromJson((/** @type {?} */ (json)), choicesOrigins);
        }
        switch (obj.fieldType) {
            case AjfFieldType.Formula:
                return AjfNodeSerializer._formulaFieldFromJson((/** @type {?} */ (json)));
            case AjfFieldType.MultipleChoice:
            case AjfFieldType.SingleChoice:
                return AjfNodeSerializer._fieldWithChoicesFromJson((/** @type {?} */ (json)), choicesOrigins);
        }
        return createField(obj);
    }
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    static _fieldNodeLinkFromJson(json) {
        return Object.assign(Object.assign({}, createNode(json)), { nodeType: AjfNodeType.AjfFieldNodeLink });
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @return {?}
     */
    static _fieldWithChoicesFromJson(json, choicesOrigins) {
        /** @type {?} */
        const err = 'Malformed field with choices';
        if (json.choicesOriginRef == null) {
            throw new Error(err);
        }
        /** @type {?} */
        const choicesOrigin = (choicesOrigins || []).find((/**
         * @param {?} c
         * @return {?}
         */
        c => c.name === json.choicesOriginRef));
        if (choicesOrigin == null) {
            throw new Error(err);
        }
        if (json.choicesFilter) {
            json.choicesFilter = AjfFormulaSerializer.fromJson(json.choicesFilter);
        }
        if (json.triggerConditions) {
            json.triggerConditions = json.triggerConditions.map((/**
             * @param {?} t
             * @return {?}
             */
            t => AjfConditionSerializer.fromJson(t)));
        }
        return createFieldWithChoices(Object.assign(Object.assign({}, json), { choicesOrigin }));
    }
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    static _formulaFieldFromJson(json) {
        if (json.formula) {
            json.formula = AjfFormulaSerializer.fromJson(json.formula);
        }
        return Object.assign(Object.assign({}, createField(json)), { fieldType: AjfFieldType.Formula });
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static _nodeGroupFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createNodeGroup(Object.assign(Object.assign({}, AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins)), AjfNodeSerializer._repeatingNodeFromJson(json)));
    }
    /**
     * @private
     * @param {?} json
     * @return {?}
     */
    static _repeatingNodeFromJson(json) {
        if (json.formulaReps) {
            json.formulaReps = AjfFormulaSerializer.fromJson(json.formulaReps);
        }
        return createRepeatingNode(json);
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static _repeatingSlideFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createRepeatingSlide(Object.assign(Object.assign({}, AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins)), AjfNodeSerializer._repeatingNodeFromJson(json)));
    }
    /**
     * @private
     * @param {?} json
     * @param {?=} choicesOrigins
     * @param {?=} attachmentsOrigins
     * @return {?}
     */
    static _slideFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createSlide(AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvc2VyaWFsaXplcnMvbm9kZS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSzlFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU81RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFJekQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBaUIsV0FBVyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDekUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFnQixVQUFVLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXpELE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRXJFLE1BQU0sT0FBTyxpQkFBaUI7Ozs7Ozs7SUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FDWCxJQUFzQixFQUN0QixjQUF3QyxFQUN4QyxrQkFB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InNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb25TZXJpYWxpemVyLCBBamZGb3JtdWxhU2VyaWFsaXplcn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmQXR0YWNobWVudHNPcmlnaW59IGZyb20gJy4uL2ludGVyZmFjZS9hdHRhY2htZW50cy9hdHRhY2htZW50cy1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2lufSBmcm9tICcuLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICcuLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge0FqZkZvcm11bGFGaWVsZH0gZnJvbSAnLi4vaW50ZXJmYWNlL2ZpZWxkcy9mb3JtdWxhLWZpZWxkJztcbmltcG9ydCB7QWpmQ29udGFpbmVyTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlL25vZGVzL2NvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXB9IGZyb20gJy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLWdyb3VwJztcbmltcG9ydCB7QWpmRmllbGROb2RlTGlua30gZnJvbSAnLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtbGluayc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlL25vZGVzL3JlcGVhdGluZy1ub2RlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGV9IGZyb20gJy4uL2ludGVyZmFjZS9zbGlkZXMvcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7QWpmU2xpZGV9IGZyb20gJy4uL2ludGVyZmFjZS9zbGlkZXMvc2xpZGUnO1xuaW1wb3J0IHtjb21wb25lbnRzTWFwfSBmcm9tICcuLi91dGlscy9maWVsZHMvZmllbGRzLW1hcCc7XG5pbXBvcnQge0FqZkZpZWxkQ3JlYXRlLCBjcmVhdGVGaWVsZH0gZnJvbSAnLi4vdXRpbHMvZmllbGRzL2NyZWF0ZS1maWVsZCc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4uL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7Y3JlYXRlQ29udGFpbmVyTm9kZX0gZnJvbSAnLi4vdXRpbHMvbm9kZXMvY3JlYXRlLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7QWpmTm9kZUNyZWF0ZSwgY3JlYXRlTm9kZX0gZnJvbSAnLi4vdXRpbHMvbm9kZXMvY3JlYXRlLW5vZGUnO1xuaW1wb3J0IHtjcmVhdGVOb2RlR3JvdXB9IGZyb20gJy4uL3V0aWxzL25vZGVzL2NyZWF0ZS1ub2RlLWdyb3VwJztcbmltcG9ydCB7Y3JlYXRlUmVwZWF0aW5nTm9kZX0gZnJvbSAnLi4vdXRpbHMvbm9kZXMvY3JlYXRlLXJlcGVhdGluZy1ub2RlJztcbmltcG9ydCB7Y3JlYXRlUmVwZWF0aW5nU2xpZGV9IGZyb20gJy4uL3V0aWxzL3NsaWRlcy9jcmVhdGUtcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7Y3JlYXRlU2xpZGV9IGZyb20gJy4uL3V0aWxzL3NsaWRlcy9jcmVhdGUtc2xpZGUnO1xuXG5pbXBvcnQge0FqZlZhbGlkYXRpb25Hcm91cFNlcmlhbGl6ZXJ9IGZyb20gJy4vdmFsaWRhdGlvbi1ncm91cC1zZXJpYWxpemVyJztcbmltcG9ydCB7QWpmV2FybmluZ0dyb3VwU2VyaWFsaXplcn0gZnJvbSAnLi93YXJuaW5nLWdyb3VwLXNlcmlhbGl6ZXInO1xuXG5leHBvcnQgY2xhc3MgQWpmTm9kZVNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24oXG4gICAgICBqc29uOiBQYXJ0aWFsPEFqZk5vZGU+LFxuICAgICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucz86IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSxcbiAgICAgICk6IEFqZk5vZGUge1xuICAgIGNvbnN0IGVyciA9ICdNYWxmb3JtZWQgbm9kZSc7XG4gICAganNvbi5uYW1lID0ganNvbi5uYW1lIHx8ICcnO1xuICAgIGlmIChqc29uLmlkID09IG51bGwgfHwganNvbi5wYXJlbnQgPT0gbnVsbCB8fCBqc29uLm5vZGVUeXBlID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICAgIH1cbiAgICBjb25zdCBvYmogPSBqc29uIGFzIEFqZk5vZGVDcmVhdGU7XG4gICAgaWYgKG9iai52aXNpYmlsaXR5KSB7XG4gICAgICBvYmoudmlzaWJpbGl0eSA9IEFqZkNvbmRpdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24ob2JqLnZpc2liaWxpdHkpO1xuICAgIH1cbiAgICBvYmouY29uZGl0aW9uYWxCcmFuY2hlcyA9XG4gICAgICAgIChvYmouY29uZGl0aW9uYWxCcmFuY2hlcyB8fCBbXSkubWFwKGMgPT4gQWpmQ29uZGl0aW9uU2VyaWFsaXplci5mcm9tSnNvbihjKSk7XG4gICAgc3dpdGNoIChvYmoubm9kZVR5cGUpIHtcbiAgICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmRmllbGQ6XG4gICAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fZmllbGRGcm9tSnNvbihcbiAgICAgICAgICAgIG9iaiBhcyBBamZOb2RlQ3JlYXRlICYgUGFydGlhbDxBamZGaWVsZD4sXG4gICAgICAgICAgICBjaG9pY2VzT3JpZ2lucyxcbiAgICAgICAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmRmllbGROb2RlTGluazpcbiAgICAgICAgcmV0dXJuIEFqZk5vZGVTZXJpYWxpemVyLl9maWVsZE5vZGVMaW5rRnJvbUpzb24oXG4gICAgICAgICAgICBvYmogYXMgQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmRmllbGROb2RlTGluaz4pO1xuICAgICAgY2FzZSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXA6XG4gICAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fbm9kZUdyb3VwRnJvbUpzb24oXG4gICAgICAgICAgICBvYmogYXMgQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmTm9kZUdyb3VwPixcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgICAgYXR0YWNobWVudHNPcmlnaW5zLFxuICAgICAgICApO1xuICAgICAgY2FzZSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZTpcbiAgICAgICAgcmV0dXJuIEFqZk5vZGVTZXJpYWxpemVyLl9yZXBlYXRpbmdTbGlkZUZyb21Kc29uKFxuICAgICAgICAgICAgb2JqIGFzIEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZlJlcGVhdGluZ1NsaWRlPixcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgICAgYXR0YWNobWVudHNPcmlnaW5zLFxuICAgICAgICApO1xuICAgICAgY2FzZSBBamZOb2RlVHlwZS5BamZTbGlkZTpcbiAgICAgICAgcmV0dXJuIEFqZk5vZGVTZXJpYWxpemVyLl9zbGlkZUZyb21Kc29uKFxuICAgICAgICAgICAgb2JqIGFzIEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZlNsaWRlPixcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgICAgYXR0YWNobWVudHNPcmlnaW5zLFxuICAgICAgICApO1xuICAgIH1cbiAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9jb250YWluZXJOb2RlRnJvbUpzb24oXG4gICAgICBqc29uOiBBamZOb2RlQ3JlYXRlJlBhcnRpYWw8QWpmQ29udGFpbmVyTm9kZT4sXG4gICAgICBjaG9pY2VzT3JpZ2lucz86IEFqZkNob2ljZXNPcmlnaW48YW55PltdLFxuICAgICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICAgICAgKTogQWpmQ29udGFpbmVyTm9kZSB7XG4gICAganNvbi5ub2RlcyA9IChqc29uLm5vZGVzIHx8XG4gICAgICAgICAgICAgICAgICBbXSkubWFwKG4gPT4gQWpmTm9kZVNlcmlhbGl6ZXIuZnJvbUpzb24obiwgY2hvaWNlc09yaWdpbnMsIGF0dGFjaG1lbnRzT3JpZ2lucykpO1xuICAgIHJldHVybiBjcmVhdGVDb250YWluZXJOb2RlKGpzb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2ZpZWxkRnJvbUpzb24oXG4gICAgICBqc29uOiBBamZOb2RlQ3JlYXRlJlBhcnRpYWw8QWpmRmllbGQ+JlBhcnRpYWw8e2F0dGFjaG1lbnRzT3JpZ2luUmVmOiBzdHJpbmd9PixcbiAgICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgICBhdHRhY2htZW50c09yaWdpbnM/OiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sXG4gICAgICApOiBBamZGaWVsZCB7XG4gICAgaWYgKGpzb24uZmllbGRUeXBlID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIGZpZWxkJyk7XG4gICAgfVxuICAgIGNvbnN0IG9iaiA9IGpzb24gYXMgQWpmRmllbGRDcmVhdGU7XG4gICAgaWYgKG9iai52YWxpZGF0aW9uKSB7XG4gICAgICBvYmoudmFsaWRhdGlvbiA9IEFqZlZhbGlkYXRpb25Hcm91cFNlcmlhbGl6ZXIuZnJvbUpzb24ob2JqLnZhbGlkYXRpb24pO1xuICAgIH1cbiAgICBpZiAob2JqLndhcm5pbmcpIHtcbiAgICAgIG9iai53YXJuaW5nID0gQWpmV2FybmluZ0dyb3VwU2VyaWFsaXplci5mcm9tSnNvbihvYmoud2FybmluZyk7XG4gICAgfVxuICAgIGlmIChqc29uLmF0dGFjaG1lbnRzT3JpZ2luUmVmKSB7XG4gICAgICBvYmouYXR0YWNobWVudE9yaWdpbiA9XG4gICAgICAgICAgKGF0dGFjaG1lbnRzT3JpZ2lucyB8fCBbXSkuZmluZChhID0+IGEubmFtZSA9PT0ganNvbi5hdHRhY2htZW50c09yaWdpblJlZik7XG4gICAgfVxuICAgIGlmIChvYmoubmV4dFNsaWRlQ29uZGl0aW9uKSB7XG4gICAgICBvYmoubmV4dFNsaWRlQ29uZGl0aW9uID0gQWpmQ29uZGl0aW9uU2VyaWFsaXplci5mcm9tSnNvbihvYmoubmV4dFNsaWRlQ29uZGl0aW9uKTtcbiAgICB9XG4gICAgY29uc3QgaXNDdXN0b21GaWVsZFdpdGhDaG9pY2UgPSBvYmouZmllbGRUeXBlID4gMTAwXG4gICAgICAmJiBjb21wb25lbnRzTWFwW29iai5maWVsZFR5cGVdICE9IG51bGxcbiAgICAgICYmIGNvbXBvbmVudHNNYXBbb2JqLmZpZWxkVHlwZV0uaXNGaWVsZFdpdGhDaG9pY2UgPT09IHRydWU7XG4gICAgaWYgKGlzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlKSB7XG4gICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX2ZpZWxkV2l0aENob2ljZXNGcm9tSnNvbihcbiAgICAgICAganNvbiBhcyBBamZGaWVsZENyZWF0ZSAmIFBhcnRpYWw8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+PixcbiAgICAgICAgY2hvaWNlc09yaWdpbnMsXG4gICAgKTtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKG9iai5maWVsZFR5cGUpIHtcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkZvcm11bGE6XG4gICAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fZm9ybXVsYUZpZWxkRnJvbUpzb24oXG4gICAgICAgICAgICBqc29uIGFzIEFqZkZpZWxkQ3JlYXRlICYgUGFydGlhbDxBamZGb3JtdWxhRmllbGQ+KTtcbiAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlOlxuICAgICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX2ZpZWxkV2l0aENob2ljZXNGcm9tSnNvbihcbiAgICAgICAgICAgIGpzb24gYXMgQWpmRmllbGRDcmVhdGUgJiBQYXJ0aWFsPEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pj4sXG4gICAgICAgICAgICBjaG9pY2VzT3JpZ2lucyxcbiAgICAgICAgKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUZpZWxkKG9iaik7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZmllbGROb2RlTGlua0Zyb21Kc29uKGpzb246IEFqZk5vZGVDcmVhdGUmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXJ0aWFsPEFqZkZpZWxkTm9kZUxpbms+KTogQWpmRmllbGROb2RlTGluayB7XG4gICAgcmV0dXJuIHsuLi5jcmVhdGVOb2RlKGpzb24pLCBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmRmllbGROb2RlTGlua307XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZmllbGRXaXRoQ2hvaWNlc0Zyb21Kc29uKFxuICAgICAganNvbjogQWpmRmllbGRDcmVhdGUmUGFydGlhbDxBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4+JlBhcnRpYWw8e2Nob2ljZXNPcmlnaW5SZWY6IHN0cmluZ30+LFxuICAgICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgICAgICk6IEFqZkZpZWxkV2l0aENob2ljZXM8YW55PiB7XG4gICAgY29uc3QgZXJyID0gJ01hbGZvcm1lZCBmaWVsZCB3aXRoIGNob2ljZXMnO1xuICAgIGlmIChqc29uLmNob2ljZXNPcmlnaW5SZWYgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgfVxuICAgIGNvbnN0IGNob2ljZXNPcmlnaW4gPSAoY2hvaWNlc09yaWdpbnMgfHwgW10pLmZpbmQoYyA9PiBjLm5hbWUgPT09IGpzb24uY2hvaWNlc09yaWdpblJlZik7XG4gICAgaWYgKGNob2ljZXNPcmlnaW4gPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgfVxuICAgIGlmIChqc29uLmNob2ljZXNGaWx0ZXIpIHtcbiAgICAgIGpzb24uY2hvaWNlc0ZpbHRlciA9IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGpzb24uY2hvaWNlc0ZpbHRlcik7XG4gICAgfVxuICAgIGlmIChqc29uLnRyaWdnZXJDb25kaXRpb25zKSB7XG4gICAgICBqc29uLnRyaWdnZXJDb25kaXRpb25zID0ganNvbi50cmlnZ2VyQ29uZGl0aW9ucy5tYXAodCA9PiBBamZDb25kaXRpb25TZXJpYWxpemVyLmZyb21Kc29uKHQpKTtcbiAgICB9XG4gICAgcmV0dXJuIGNyZWF0ZUZpZWxkV2l0aENob2ljZXM8YW55Pih7Li4uanNvbiwgY2hvaWNlc09yaWdpbn0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2Zvcm11bGFGaWVsZEZyb21Kc29uKGpzb246IEFqZkZpZWxkQ3JlYXRlJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBQYXJ0aWFsPEFqZkZvcm11bGFGaWVsZD4pOiBBamZGb3JtdWxhRmllbGQge1xuICAgIGlmIChqc29uLmZvcm11bGEpIHtcbiAgICAgIGpzb24uZm9ybXVsYSA9IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGpzb24uZm9ybXVsYSk7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAuLi5jcmVhdGVGaWVsZChqc29uKSxcbiAgICAgIGZpZWxkVHlwZTogQWpmRmllbGRUeXBlLkZvcm11bGEsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9ub2RlR3JvdXBGcm9tSnNvbihcbiAgICAgIGpzb246IEFqZk5vZGVDcmVhdGUmUGFydGlhbDxBamZOb2RlR3JvdXA+LFxuICAgICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucz86IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSxcbiAgICAgICk6IEFqZk5vZGVHcm91cCB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vZGVHcm91cCh7XG4gICAgICAuLi5BamZOb2RlU2VyaWFsaXplci5fY29udGFpbmVyTm9kZUZyb21Kc29uKGpzb24sIGNob2ljZXNPcmlnaW5zLCBhdHRhY2htZW50c09yaWdpbnMpLFxuICAgICAgLi4uQWpmTm9kZVNlcmlhbGl6ZXIuX3JlcGVhdGluZ05vZGVGcm9tSnNvbihqc29uKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9yZXBlYXRpbmdOb2RlRnJvbUpzb24oanNvbjogQWpmTm9kZUNyZWF0ZSZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcnRpYWw8QWpmUmVwZWF0aW5nTm9kZT4pOiBBamZSZXBlYXRpbmdOb2RlIHtcbiAgICBpZiAoanNvbi5mb3JtdWxhUmVwcykge1xuICAgICAganNvbi5mb3JtdWxhUmVwcyA9IEFqZkZvcm11bGFTZXJpYWxpemVyLmZyb21Kc29uKGpzb24uZm9ybXVsYVJlcHMpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlUmVwZWF0aW5nTm9kZShqc29uKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9yZXBlYXRpbmdTbGlkZUZyb21Kc29uKFxuICAgICAganNvbjogQWpmTm9kZUNyZWF0ZSZQYXJ0aWFsPEFqZlJlcGVhdGluZ1NsaWRlPixcbiAgICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgICBhdHRhY2htZW50c09yaWdpbnM/OiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sXG4gICAgICApOiBBamZSZXBlYXRpbmdTbGlkZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJlcGVhdGluZ1NsaWRlKHtcbiAgICAgIC4uLkFqZk5vZGVTZXJpYWxpemVyLl9jb250YWluZXJOb2RlRnJvbUpzb24oanNvbiwgY2hvaWNlc09yaWdpbnMsIGF0dGFjaG1lbnRzT3JpZ2lucyksXG4gICAgICAuLi5BamZOb2RlU2VyaWFsaXplci5fcmVwZWF0aW5nTm9kZUZyb21Kc29uKGpzb24pLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3NsaWRlRnJvbUpzb24oXG4gICAgICBqc29uOiBBamZOb2RlQ3JlYXRlJlBhcnRpYWw8QWpmU2xpZGU+LFxuICAgICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucz86IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSxcbiAgICAgICk6IEFqZlNsaWRlIHtcbiAgICByZXR1cm4gY3JlYXRlU2xpZGUoXG4gICAgICAgIEFqZk5vZGVTZXJpYWxpemVyLl9jb250YWluZXJOb2RlRnJvbUpzb24oanNvbiwgY2hvaWNlc09yaWdpbnMsIGF0dGFjaG1lbnRzT3JpZ2lucykpO1xuICB9XG59XG4iXX0=