/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/serializers/node-serializer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvc2VyaWFsaXplcnMvbm9kZS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSzlFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU81RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFJekQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBaUIsV0FBVyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDekUsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDakYsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFnQixVQUFVLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXpELE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRXJFLE1BQU0sT0FBTyxpQkFBaUI7Ozs7Ozs7SUFDNUIsTUFBTSxDQUFDLFFBQVEsQ0FDWCxJQUFzQixFQUN0QixjQUF3QyxFQUN4QyxrQkFBZ0Q7O2NBRTVDLEdBQUcsR0FBRyxnQkFBZ0I7UUFDNUIsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxJQUFJLEVBQUUsQ0FBQztRQUM1QixJQUFJLElBQUksQ0FBQyxFQUFFLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxJQUFJLElBQUksQ0FBQyxRQUFRLElBQUksSUFBSSxFQUFFO1lBQ25FLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7O2NBQ0ssR0FBRyxHQUFHLG1CQUFBLElBQUksRUFBaUI7UUFDakMsSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFO1lBQ2xCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsc0JBQXNCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUNsRTtRQUNELEdBQUcsQ0FBQyxtQkFBbUI7WUFDbkIsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRzs7OztZQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsc0JBQXNCLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFDLENBQUM7UUFDakYsUUFBUSxHQUFHLENBQUMsUUFBUSxFQUFFO1lBQ3BCLEtBQUssV0FBVyxDQUFDLFFBQVE7Z0JBQ3ZCLE9BQU8saUJBQWlCLENBQUMsY0FBYyxDQUNuQyxtQkFBQSxHQUFHLEVBQXFDLEVBQ3hDLGNBQWMsRUFDZCxrQkFBa0IsQ0FDckIsQ0FBQztZQUNKLEtBQUssV0FBVyxDQUFDLGdCQUFnQjtnQkFDL0IsT0FBTyxpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FDM0MsbUJBQUEsR0FBRyxFQUE2QyxDQUFDLENBQUM7WUFDeEQsS0FBSyxXQUFXLENBQUMsWUFBWTtnQkFDM0IsT0FBTyxpQkFBaUIsQ0FBQyxrQkFBa0IsQ0FDdkMsbUJBQUEsR0FBRyxFQUF5QyxFQUM1QyxjQUFjLEVBQ2Qsa0JBQWtCLENBQ3JCLENBQUM7WUFDSixLQUFLLFdBQVcsQ0FBQyxpQkFBaUI7Z0JBQ2hDLE9BQU8saUJBQWlCLENBQUMsdUJBQXVCLENBQzVDLG1CQUFBLEdBQUcsRUFBOEMsRUFDakQsY0FBYyxFQUNkLGtCQUFrQixDQUNyQixDQUFDO1lBQ0osS0FBSyxXQUFXLENBQUMsUUFBUTtnQkFDdkIsT0FBTyxpQkFBaUIsQ0FBQyxjQUFjLENBQ25DLG1CQUFBLEdBQUcsRUFBcUMsRUFDeEMsY0FBYyxFQUNkLGtCQUFrQixDQUNyQixDQUFDO1NBQ0w7UUFDRCxNQUFNLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7Ozs7Ozs7O0lBRU8sTUFBTSxDQUFDLHNCQUFzQixDQUNqQyxJQUE2QyxFQUM3QyxjQUF3QyxFQUN4QyxrQkFBZ0Q7UUFFbEQsSUFBSSxDQUFDLEtBQUssR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLO1lBQ1YsRUFBRSxDQUFDLENBQUMsR0FBRzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsaUJBQWlCLENBQUMsUUFBUSxDQUFDLENBQUMsRUFBRSxjQUFjLEVBQUUsa0JBQWtCLENBQUMsRUFBQyxDQUFDO1FBQzlGLE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7Ozs7SUFFTyxNQUFNLENBQUMsY0FBYyxDQUN6QixJQUE2RSxFQUM3RSxjQUF3QyxFQUN4QyxrQkFBZ0Q7UUFFbEQsSUFBSSxJQUFJLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUMxQixNQUFNLElBQUksS0FBSyxDQUFDLGlCQUFpQixDQUFDLENBQUM7U0FDcEM7O2NBQ0ssR0FBRyxHQUFHLG1CQUFBLElBQUksRUFBa0I7UUFDbEMsSUFBSSxHQUFHLENBQUMsVUFBVSxFQUFFO1lBQ2xCLEdBQUcsQ0FBQyxVQUFVLEdBQUcsNEJBQTRCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsQ0FBQztTQUN4RTtRQUNELElBQUksR0FBRyxDQUFDLE9BQU8sRUFBRTtZQUNmLEdBQUcsQ0FBQyxPQUFPLEdBQUcseUJBQXlCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUMvRDtRQUNELElBQUksSUFBSSxDQUFDLG9CQUFvQixFQUFFO1lBQzdCLEdBQUcsQ0FBQyxnQkFBZ0I7Z0JBQ2hCLENBQUMsa0JBQWtCLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTs7OztnQkFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLEtBQUssSUFBSSxDQUFDLG9CQUFvQixFQUFDLENBQUM7U0FDaEY7UUFDRCxJQUFJLEdBQUcsQ0FBQyxrQkFBa0IsRUFBRTtZQUMxQixHQUFHLENBQUMsa0JBQWtCLEdBQUcsc0JBQXNCLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO1NBQ2xGOztjQUNLLHVCQUF1QixHQUFHLEdBQUcsQ0FBQyxTQUFTLEdBQUcsR0FBRztlQUM5QyxhQUFhLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUk7ZUFDcEMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxpQkFBaUIsS0FBSyxJQUFJO1FBQzVELElBQUksdUJBQXVCLEVBQUU7WUFDM0IsT0FBTyxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FDaEQsbUJBQUEsSUFBSSxFQUFzRCxFQUMxRCxjQUFjLENBQ2pCLENBQUM7U0FDRDtRQUVELFFBQVEsR0FBRyxDQUFDLFNBQVMsRUFBRTtZQUNyQixLQUFLLFlBQVksQ0FBQyxPQUFPO2dCQUN2QixPQUFPLGlCQUFpQixDQUFDLHFCQUFxQixDQUMxQyxtQkFBQSxJQUFJLEVBQTZDLENBQUMsQ0FBQztZQUN6RCxLQUFLLFlBQVksQ0FBQyxjQUFjLENBQUM7WUFDakMsS0FBSyxZQUFZLENBQUMsWUFBWTtnQkFDNUIsT0FBTyxpQkFBaUIsQ0FBQyx5QkFBeUIsQ0FDOUMsbUJBQUEsSUFBSSxFQUFzRCxFQUMxRCxjQUFjLENBQ2pCLENBQUM7U0FDTDtRQUNELE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQzFCLENBQUM7Ozs7OztJQUVPLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQyxJQUN3QjtRQUM1RCx1Q0FBVyxVQUFVLENBQUMsSUFBSSxDQUFDLEtBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxnQkFBZ0IsSUFBRTtJQUN2RSxDQUFDOzs7Ozs7O0lBRU8sTUFBTSxDQUFDLHlCQUF5QixDQUNwQyxJQUEwRixFQUMxRixjQUF3Qzs7Y0FFcEMsR0FBRyxHQUFHLDhCQUE4QjtRQUMxQyxJQUFJLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7WUFDakMsTUFBTSxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN0Qjs7Y0FDSyxhQUFhLEdBQUcsQ0FBQyxjQUFjLElBQUksRUFBRSxDQUFDLENBQUMsSUFBSTs7OztRQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksS0FBSyxJQUFJLENBQUMsZ0JBQWdCLEVBQUM7UUFDeEYsSUFBSSxhQUFhLElBQUksSUFBSSxFQUFFO1lBQ3pCLE1BQU0sSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7U0FDdEI7UUFDRCxJQUFJLElBQUksQ0FBQyxhQUFhLEVBQUU7WUFDdEIsSUFBSSxDQUFDLGFBQWEsR0FBRyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1NBQ3hFO1FBQ0QsSUFBSSxJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDMUIsSUFBSSxDQUFDLGlCQUFpQixHQUFHLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHOzs7O1lBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxzQkFBc0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUMsQ0FBQztTQUM5RjtRQUNELE9BQU8sc0JBQXNCLGlDQUFVLElBQUksS0FBRSxhQUFhLElBQUUsQ0FBQztJQUMvRCxDQUFDOzs7Ozs7SUFFTyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFDdUI7UUFDMUQsSUFBSSxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ2hCLElBQUksQ0FBQyxPQUFPLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUM1RDtRQUNELHVDQUNLLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FDcEIsU0FBUyxFQUFFLFlBQVksQ0FBQyxPQUFPLElBQy9CO0lBQ0osQ0FBQzs7Ozs7Ozs7SUFFTyxNQUFNLENBQUMsa0JBQWtCLENBQzdCLElBQXlDLEVBQ3pDLGNBQXdDLEVBQ3hDLGtCQUFnRDtRQUVsRCxPQUFPLGVBQWUsaUNBQ2pCLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsa0JBQWtCLENBQUMsR0FDbEYsaUJBQWlCLENBQUMsc0JBQXNCLENBQUMsSUFBSSxDQUFDLEVBQ2pELENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFTyxNQUFNLENBQUMsc0JBQXNCLENBQUMsSUFDd0I7UUFDNUQsSUFBSSxJQUFJLENBQUMsV0FBVyxFQUFFO1lBQ3BCLElBQUksQ0FBQyxXQUFXLEdBQUcsb0JBQW9CLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNwRTtRQUNELE9BQU8sbUJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbkMsQ0FBQzs7Ozs7Ozs7SUFFTyxNQUFNLENBQUMsdUJBQXVCLENBQ2xDLElBQThDLEVBQzlDLGNBQXdDLEVBQ3hDLGtCQUFnRDtRQUVsRCxPQUFPLG9CQUFvQixpQ0FDdEIsaUJBQWlCLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxHQUNsRixpQkFBaUIsQ0FBQyxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsRUFDakQsQ0FBQztJQUNMLENBQUM7Ozs7Ozs7O0lBRU8sTUFBTSxDQUFDLGNBQWMsQ0FDekIsSUFBcUMsRUFDckMsY0FBd0MsRUFDeEMsa0JBQWdEO1FBRWxELE9BQU8sV0FBVyxDQUNkLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FBQyxDQUFDO0lBQzFGLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvblNlcmlhbGl6ZXIsIEFqZkZvcm11bGFTZXJpYWxpemVyfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZBdHRhY2htZW50c09yaWdpbn0gZnJvbSAnLi4vaW50ZXJmYWNlL2F0dGFjaG1lbnRzL2F0dGFjaG1lbnRzLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW59IGZyb20gJy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb3JpZ2luJztcbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7QWpmRm9ybXVsYUZpZWxkfSBmcm9tICcuLi9pbnRlcmZhY2UvZmllbGRzL2Zvcm11bGEtZmllbGQnO1xuaW1wb3J0IHtBamZDb250YWluZXJOb2RlfSBmcm9tICcuLi9pbnRlcmZhY2Uvbm9kZXMvY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cH0gZnJvbSAnLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtZ3JvdXAnO1xuaW1wb3J0IHtBamZGaWVsZE5vZGVMaW5rfSBmcm9tICcuLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS1saW5rJztcbmltcG9ydCB7QWpmTm9kZVR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdOb2RlfSBmcm9tICcuLi9pbnRlcmZhY2Uvbm9kZXMvcmVwZWF0aW5nLW5vZGUnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3NsaWRlcy9yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtBamZTbGlkZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3NsaWRlcy9zbGlkZSc7XG5pbXBvcnQge2NvbXBvbmVudHNNYXB9IGZyb20gJy4uL3V0aWxzL2ZpZWxkcy9maWVsZHMtbWFwJztcbmltcG9ydCB7QWpmRmllbGRDcmVhdGUsIGNyZWF0ZUZpZWxkfSBmcm9tICcuLi91dGlscy9maWVsZHMvY3JlYXRlLWZpZWxkJztcbmltcG9ydCB7Y3JlYXRlRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi4vdXRpbHMvZmllbGRzL2NyZWF0ZS1maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtjcmVhdGVDb250YWluZXJOb2RlfSBmcm9tICcuLi91dGlscy9ub2Rlcy9jcmVhdGUtY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtBamZOb2RlQ3JlYXRlLCBjcmVhdGVOb2RlfSBmcm9tICcuLi91dGlscy9ub2Rlcy9jcmVhdGUtbm9kZSc7XG5pbXBvcnQge2NyZWF0ZU5vZGVHcm91cH0gZnJvbSAnLi4vdXRpbHMvbm9kZXMvY3JlYXRlLW5vZGUtZ3JvdXAnO1xuaW1wb3J0IHtjcmVhdGVSZXBlYXRpbmdOb2RlfSBmcm9tICcuLi91dGlscy9ub2Rlcy9jcmVhdGUtcmVwZWF0aW5nLW5vZGUnO1xuaW1wb3J0IHtjcmVhdGVSZXBlYXRpbmdTbGlkZX0gZnJvbSAnLi4vdXRpbHMvc2xpZGVzL2NyZWF0ZS1yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtjcmVhdGVTbGlkZX0gZnJvbSAnLi4vdXRpbHMvc2xpZGVzL2NyZWF0ZS1zbGlkZSc7XG5cbmltcG9ydCB7QWpmVmFsaWRhdGlvbkdyb3VwU2VyaWFsaXplcn0gZnJvbSAnLi92YWxpZGF0aW9uLWdyb3VwLXNlcmlhbGl6ZXInO1xuaW1wb3J0IHtBamZXYXJuaW5nR3JvdXBTZXJpYWxpemVyfSBmcm9tICcuL3dhcm5pbmctZ3JvdXAtc2VyaWFsaXplcic7XG5cbmV4cG9ydCBjbGFzcyBBamZOb2RlU2VyaWFsaXplciB7XG4gIHN0YXRpYyBmcm9tSnNvbihcbiAgICAgIGpzb246IFBhcnRpYWw8QWpmTm9kZT4sXG4gICAgICBjaG9pY2VzT3JpZ2lucz86IEFqZkNob2ljZXNPcmlnaW48YW55PltdLFxuICAgICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICAgICAgKTogQWpmTm9kZSB7XG4gICAgY29uc3QgZXJyID0gJ01hbGZvcm1lZCBub2RlJztcbiAgICBqc29uLm5hbWUgPSBqc29uLm5hbWUgfHwgJyc7XG4gICAgaWYgKGpzb24uaWQgPT0gbnVsbCB8fCBqc29uLnBhcmVudCA9PSBudWxsIHx8IGpzb24ubm9kZVR5cGUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gICAgfVxuICAgIGNvbnN0IG9iaiA9IGpzb24gYXMgQWpmTm9kZUNyZWF0ZTtcbiAgICBpZiAob2JqLnZpc2liaWxpdHkpIHtcbiAgICAgIG9iai52aXNpYmlsaXR5ID0gQWpmQ29uZGl0aW9uU2VyaWFsaXplci5mcm9tSnNvbihvYmoudmlzaWJpbGl0eSk7XG4gICAgfVxuICAgIG9iai5jb25kaXRpb25hbEJyYW5jaGVzID1cbiAgICAgICAgKG9iai5jb25kaXRpb25hbEJyYW5jaGVzIHx8IFtdKS5tYXAoYyA9PiBBamZDb25kaXRpb25TZXJpYWxpemVyLmZyb21Kc29uKGMpKTtcbiAgICBzd2l0Y2ggKG9iai5ub2RlVHlwZSkge1xuICAgICAgY2FzZSBBamZOb2RlVHlwZS5BamZGaWVsZDpcbiAgICAgICAgcmV0dXJuIEFqZk5vZGVTZXJpYWxpemVyLl9maWVsZEZyb21Kc29uKFxuICAgICAgICAgICAgb2JqIGFzIEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZkZpZWxkPixcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgICAgYXR0YWNobWVudHNPcmlnaW5zLFxuICAgICAgICApO1xuICAgICAgY2FzZSBBamZOb2RlVHlwZS5BamZGaWVsZE5vZGVMaW5rOlxuICAgICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX2ZpZWxkTm9kZUxpbmtGcm9tSnNvbihcbiAgICAgICAgICAgIG9iaiBhcyBBamZOb2RlQ3JlYXRlICYgUGFydGlhbDxBamZGaWVsZE5vZGVMaW5rPik7XG4gICAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cDpcbiAgICAgICAgcmV0dXJuIEFqZk5vZGVTZXJpYWxpemVyLl9ub2RlR3JvdXBGcm9tSnNvbihcbiAgICAgICAgICAgIG9iaiBhcyBBamZOb2RlQ3JlYXRlICYgUGFydGlhbDxBamZOb2RlR3JvdXA+LFxuICAgICAgICAgICAgY2hvaWNlc09yaWdpbnMsXG4gICAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnMsXG4gICAgICAgICk7XG4gICAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlOlxuICAgICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX3JlcGVhdGluZ1NsaWRlRnJvbUpzb24oXG4gICAgICAgICAgICBvYmogYXMgQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmUmVwZWF0aW5nU2xpZGU+LFxuICAgICAgICAgICAgY2hvaWNlc09yaWdpbnMsXG4gICAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnMsXG4gICAgICAgICk7XG4gICAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZlNsaWRlOlxuICAgICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX3NsaWRlRnJvbUpzb24oXG4gICAgICAgICAgICBvYmogYXMgQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmU2xpZGU+LFxuICAgICAgICAgICAgY2hvaWNlc09yaWdpbnMsXG4gICAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnMsXG4gICAgICAgICk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcihlcnIpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2NvbnRhaW5lck5vZGVGcm9tSnNvbihcbiAgICAgIGpzb246IEFqZk5vZGVDcmVhdGUmUGFydGlhbDxBamZDb250YWluZXJOb2RlPixcbiAgICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgICBhdHRhY2htZW50c09yaWdpbnM/OiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sXG4gICAgICApOiBBamZDb250YWluZXJOb2RlIHtcbiAgICBqc29uLm5vZGVzID0gKGpzb24ubm9kZXMgfHxcbiAgICAgICAgICAgICAgICAgIFtdKS5tYXAobiA9PiBBamZOb2RlU2VyaWFsaXplci5mcm9tSnNvbihuLCBjaG9pY2VzT3JpZ2lucywgYXR0YWNobWVudHNPcmlnaW5zKSk7XG4gICAgcmV0dXJuIGNyZWF0ZUNvbnRhaW5lck5vZGUoanNvbik7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZmllbGRGcm9tSnNvbihcbiAgICAgIGpzb246IEFqZk5vZGVDcmVhdGUmUGFydGlhbDxBamZGaWVsZD4mUGFydGlhbDx7YXR0YWNobWVudHNPcmlnaW5SZWY6IHN0cmluZ30+LFxuICAgICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucz86IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSxcbiAgICAgICk6IEFqZkZpZWxkIHtcbiAgICBpZiAoanNvbi5maWVsZFR5cGUgPT0gbnVsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNYWxmb3JtZWQgZmllbGQnKTtcbiAgICB9XG4gICAgY29uc3Qgb2JqID0ganNvbiBhcyBBamZGaWVsZENyZWF0ZTtcbiAgICBpZiAob2JqLnZhbGlkYXRpb24pIHtcbiAgICAgIG9iai52YWxpZGF0aW9uID0gQWpmVmFsaWRhdGlvbkdyb3VwU2VyaWFsaXplci5mcm9tSnNvbihvYmoudmFsaWRhdGlvbik7XG4gICAgfVxuICAgIGlmIChvYmoud2FybmluZykge1xuICAgICAgb2JqLndhcm5pbmcgPSBBamZXYXJuaW5nR3JvdXBTZXJpYWxpemVyLmZyb21Kc29uKG9iai53YXJuaW5nKTtcbiAgICB9XG4gICAgaWYgKGpzb24uYXR0YWNobWVudHNPcmlnaW5SZWYpIHtcbiAgICAgIG9iai5hdHRhY2htZW50T3JpZ2luID1cbiAgICAgICAgICAoYXR0YWNobWVudHNPcmlnaW5zIHx8IFtdKS5maW5kKGEgPT4gYS5uYW1lID09PSBqc29uLmF0dGFjaG1lbnRzT3JpZ2luUmVmKTtcbiAgICB9XG4gICAgaWYgKG9iai5uZXh0U2xpZGVDb25kaXRpb24pIHtcbiAgICAgIG9iai5uZXh0U2xpZGVDb25kaXRpb24gPSBBamZDb25kaXRpb25TZXJpYWxpemVyLmZyb21Kc29uKG9iai5uZXh0U2xpZGVDb25kaXRpb24pO1xuICAgIH1cbiAgICBjb25zdCBpc0N1c3RvbUZpZWxkV2l0aENob2ljZSA9IG9iai5maWVsZFR5cGUgPiAxMDBcbiAgICAgICYmIGNvbXBvbmVudHNNYXBbb2JqLmZpZWxkVHlwZV0gIT0gbnVsbFxuICAgICAgJiYgY29tcG9uZW50c01hcFtvYmouZmllbGRUeXBlXS5pc0ZpZWxkV2l0aENob2ljZSA9PT0gdHJ1ZTtcbiAgICBpZiAoaXNDdXN0b21GaWVsZFdpdGhDaG9pY2UpIHtcbiAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fZmllbGRXaXRoQ2hvaWNlc0Zyb21Kc29uKFxuICAgICAgICBqc29uIGFzIEFqZkZpZWxkQ3JlYXRlICYgUGFydGlhbDxBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4+LFxuICAgICAgICBjaG9pY2VzT3JpZ2lucyxcbiAgICApO1xuICAgIH1cblxuICAgIHN3aXRjaCAob2JqLmZpZWxkVHlwZSkge1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRm9ybXVsYTpcbiAgICAgICAgcmV0dXJuIEFqZk5vZGVTZXJpYWxpemVyLl9mb3JtdWxhRmllbGRGcm9tSnNvbihcbiAgICAgICAgICAgIGpzb24gYXMgQWpmRmllbGRDcmVhdGUgJiBQYXJ0aWFsPEFqZkZvcm11bGFGaWVsZD4pO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fZmllbGRXaXRoQ2hvaWNlc0Zyb21Kc29uKFxuICAgICAgICAgICAganNvbiBhcyBBamZGaWVsZENyZWF0ZSAmIFBhcnRpYWw8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+PixcbiAgICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlRmllbGQob2JqKTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9maWVsZE5vZGVMaW5rRnJvbUpzb24oanNvbjogQWpmTm9kZUNyZWF0ZSZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcnRpYWw8QWpmRmllbGROb2RlTGluaz4pOiBBamZGaWVsZE5vZGVMaW5rIHtcbiAgICByZXR1cm4gey4uLmNyZWF0ZU5vZGUoanNvbiksIG5vZGVUeXBlOiBBamZOb2RlVHlwZS5BamZGaWVsZE5vZGVMaW5rfTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9maWVsZFdpdGhDaG9pY2VzRnJvbUpzb24oXG4gICAgICBqc29uOiBBamZGaWVsZENyZWF0ZSZQYXJ0aWFsPEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pj4mUGFydGlhbDx7Y2hvaWNlc09yaWdpblJlZjogc3RyaW5nfT4sXG4gICAgICBjaG9pY2VzT3JpZ2lucz86IEFqZkNob2ljZXNPcmlnaW48YW55PltdLFxuICAgICAgKTogQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+IHtcbiAgICBjb25zdCBlcnIgPSAnTWFsZm9ybWVkIGZpZWxkIHdpdGggY2hvaWNlcyc7XG4gICAgaWYgKGpzb24uY2hvaWNlc09yaWdpblJlZiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICB9XG4gICAgY29uc3QgY2hvaWNlc09yaWdpbiA9IChjaG9pY2VzT3JpZ2lucyB8fCBbXSkuZmluZChjID0+IGMubmFtZSA9PT0ganNvbi5jaG9pY2VzT3JpZ2luUmVmKTtcbiAgICBpZiAoY2hvaWNlc09yaWdpbiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICB9XG4gICAgaWYgKGpzb24uY2hvaWNlc0ZpbHRlcikge1xuICAgICAganNvbi5jaG9pY2VzRmlsdGVyID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi5jaG9pY2VzRmlsdGVyKTtcbiAgICB9XG4gICAgaWYgKGpzb24udHJpZ2dlckNvbmRpdGlvbnMpIHtcbiAgICAgIGpzb24udHJpZ2dlckNvbmRpdGlvbnMgPSBqc29uLnRyaWdnZXJDb25kaXRpb25zLm1hcCh0ID0+IEFqZkNvbmRpdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24odCkpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlRmllbGRXaXRoQ2hvaWNlczxhbnk+KHsuLi5qc29uLCBjaG9pY2VzT3JpZ2lufSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZm9ybXVsYUZpZWxkRnJvbUpzb24oanNvbjogQWpmRmllbGRDcmVhdGUmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIFBhcnRpYWw8QWpmRm9ybXVsYUZpZWxkPik6IEFqZkZvcm11bGFGaWVsZCB7XG4gICAgaWYgKGpzb24uZm9ybXVsYSkge1xuICAgICAganNvbi5mb3JtdWxhID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi5mb3JtdWxhKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmNyZWF0ZUZpZWxkKGpzb24pLFxuICAgICAgZmllbGRUeXBlOiBBamZGaWVsZFR5cGUuRm9ybXVsYSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX25vZGVHcm91cEZyb21Kc29uKFxuICAgICAganNvbjogQWpmTm9kZUNyZWF0ZSZQYXJ0aWFsPEFqZk5vZGVHcm91cD4sXG4gICAgICBjaG9pY2VzT3JpZ2lucz86IEFqZkNob2ljZXNPcmlnaW48YW55PltdLFxuICAgICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICAgICAgKTogQWpmTm9kZUdyb3VwIHtcbiAgICByZXR1cm4gY3JlYXRlTm9kZUdyb3VwKHtcbiAgICAgIC4uLkFqZk5vZGVTZXJpYWxpemVyLl9jb250YWluZXJOb2RlRnJvbUpzb24oanNvbiwgY2hvaWNlc09yaWdpbnMsIGF0dGFjaG1lbnRzT3JpZ2lucyksXG4gICAgICAuLi5BamZOb2RlU2VyaWFsaXplci5fcmVwZWF0aW5nTm9kZUZyb21Kc29uKGpzb24pLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3JlcGVhdGluZ05vZGVGcm9tSnNvbihqc29uOiBBamZOb2RlQ3JlYXRlJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgUGFydGlhbDxBamZSZXBlYXRpbmdOb2RlPik6IEFqZlJlcGVhdGluZ05vZGUge1xuICAgIGlmIChqc29uLmZvcm11bGFSZXBzKSB7XG4gICAgICBqc29uLmZvcm11bGFSZXBzID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi5mb3JtdWxhUmVwcyk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVSZXBlYXRpbmdOb2RlKGpzb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3JlcGVhdGluZ1NsaWRlRnJvbUpzb24oXG4gICAgICBqc29uOiBBamZOb2RlQ3JlYXRlJlBhcnRpYWw8QWpmUmVwZWF0aW5nU2xpZGU+LFxuICAgICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucz86IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSxcbiAgICAgICk6IEFqZlJlcGVhdGluZ1NsaWRlIHtcbiAgICByZXR1cm4gY3JlYXRlUmVwZWF0aW5nU2xpZGUoe1xuICAgICAgLi4uQWpmTm9kZVNlcmlhbGl6ZXIuX2NvbnRhaW5lck5vZGVGcm9tSnNvbihqc29uLCBjaG9pY2VzT3JpZ2lucywgYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICAgIC4uLkFqZk5vZGVTZXJpYWxpemVyLl9yZXBlYXRpbmdOb2RlRnJvbUpzb24oanNvbiksXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfc2xpZGVGcm9tSnNvbihcbiAgICAgIGpzb246IEFqZk5vZGVDcmVhdGUmUGFydGlhbDxBamZTbGlkZT4sXG4gICAgICBjaG9pY2VzT3JpZ2lucz86IEFqZkNob2ljZXNPcmlnaW48YW55PltdLFxuICAgICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICAgICAgKTogQWpmU2xpZGUge1xuICAgIHJldHVybiBjcmVhdGVTbGlkZShcbiAgICAgICAgQWpmTm9kZVNlcmlhbGl6ZXIuX2NvbnRhaW5lck5vZGVGcm9tSnNvbihqc29uLCBjaG9pY2VzT3JpZ2lucywgYXR0YWNobWVudHNPcmlnaW5zKSk7XG4gIH1cbn1cbiJdfQ==