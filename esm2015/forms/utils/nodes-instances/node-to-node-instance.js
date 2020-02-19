/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/utils/nodes-instances/node-to-node-instance.ts
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
import { createCondition, createFormula, normalizeExpression, alwaysCondition } from '@ajf/core/models';
import { AjfFieldType } from '../../interface/fields/field-type';
import { AjfNodeType } from '../../interface/nodes/node-type';
import { componentsMap } from '../fields/fields-map';
import { createFieldInstance } from '../fields-instances/create-field-instance';
import { createFieldWithChoicesInstance } from '../fields-instances/create-field-with-choices-instance';
import { createTableFieldInstance } from '../fields-instances/create-table-field-instance';
import { isFieldWithChoicesInstance } from '../fields-instances/is-field-with-choices-instance';
import { isFieldWithChoices } from '../fields/is-field-with-choices';
import { createNodeGroupInstance } from '../nodes-instances/create-node-group-instance';
import { createRepeatingSlideInstance } from '../slides-instances/create-repeating-slide-instance';
import { createSlideInstance } from '../slides-instances/create-slide-instance';
import { createValidationGroup } from '../validation/create-validation-group';
import { createWarningGroup } from '../warning/create-warning-group';
import { getAncestorRepeatingNodesNames } from './get-ancestor-repeating-nodes-names';
import { getInstanceCondition } from './get-instance-condition';
import { getInstanceConditions } from './get-instance-conditions';
import { getInstanceFormula } from './get-instance-formula';
import { getInstanceValidations } from './get-instance-validations';
import { getInstanceWarnings } from './get-instance-warnings';
import { isFieldInstance } from './is-field-instance';
import { isNodeGroupInstance } from './is-node-group-instance';
import { isRepeatingSlideInstance } from './is-repeating-slide-instance';
/**
 * @param {?} allNodes
 * @param {?} node
 * @param {?} prefix
 * @param {?} context
 * @return {?}
 */
export function nodeToNodeInstance(allNodes, node, prefix, context) {
    /** @type {?} */
    let instance = null;
    /** @type {?} */
    const nodeType = node.nodeType;
    switch (nodeType) {
        case AjfNodeType.AjfField:
            /** @type {?} */
            const field = (/** @type {?} */ (node));
            if (field.fieldType > 100) {
                if (componentsMap[field.fieldType] != null
                    && componentsMap[field.fieldType].createInstance != null) {
                    instance = (/** @type {?} */ (componentsMap[field.fieldType].createInstance))({ node: (/** @type {?} */ (node)), prefix }, context);
                }
                else {
                    instance = createFieldInstance({ node: (/** @type {?} */ (node)), prefix }, context);
                }
            }
            else {
                switch (field.fieldType) {
                    case AjfFieldType.SingleChoice:
                    case AjfFieldType.MultipleChoice:
                        instance = createFieldWithChoicesInstance({ node: (/** @type {?} */ (node)), prefix }, context);
                        break;
                    case AjfFieldType.Table:
                        instance = createTableFieldInstance({ node: (/** @type {?} */ (node)), prefix }, context);
                        break;
                    default:
                        instance = createFieldInstance({ node: (/** @type {?} */ (node)), prefix }, context);
                        break;
                }
            }
            break;
        case AjfNodeType.AjfNodeGroup:
            instance = createNodeGroupInstance({ node: (/** @type {?} */ (node)), prefix });
            break;
        case AjfNodeType.AjfRepeatingSlide:
            instance = createRepeatingSlideInstance({ node: (/** @type {?} */ (node)), prefix });
            break;
        case AjfNodeType.AjfSlide:
            instance = createSlideInstance({ node: (/** @type {?} */ (node)), prefix });
            break;
    }
    if (instance != null) {
        /** @type {?} */
        const hasPrefix = prefix != null && prefix.length > 0;
        if (hasPrefix) {
            /** @type {?} */
            const ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);
            if (node.visibility != null) {
                /** @type {?} */
                const oldVisibility = node.visibility.condition;
                /** @type {?} */
                const newVisibility = normalizeExpression(oldVisibility, ancestorsNames, prefix);
                instance.visibility = newVisibility !== oldVisibility ?
                    createCondition({ condition: newVisibility }) :
                    node.visibility;
            }
            /** @type {?} */
            const conditionalBranches = instance.node.conditionalBranches != null
                && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
            if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                /** @type {?} */
                const ngInstance = (/** @type {?} */ (instance));
                /** @type {?} */
                const formulaReps = ngInstance.node.formulaReps;
                if (formulaReps != null) {
                    /** @type {?} */
                    const oldFormula = formulaReps.formula;
                    /** @type {?} */
                    let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
                    ngInstance.formulaReps =
                        newFormula !== oldFormula ? createFormula({ formula: newFormula }) : formulaReps;
                }
            }
            else if (nodeType === AjfNodeType.AjfField) {
                /** @type {?} */
                const fInstance = (/** @type {?} */ (instance));
                /** @type {?} */
                const fNode = fInstance.node;
                if (fNode.formula) {
                    fInstance.formula = getInstanceFormula(fNode.formula, ancestorsNames, prefix);
                }
                if (fNode.validation != null) {
                    /** @type {?} */
                    const newConditions = getInstanceValidations(fNode.validation.conditions, ancestorsNames, prefix);
                    if (newConditions !== fNode.validation.conditions) {
                        fInstance.validation = createValidationGroup(fNode.validation);
                        fInstance.validation.conditions = newConditions;
                    }
                    else {
                        fInstance.validation = fNode.validation;
                    }
                }
                if (fNode.warning != null) {
                    /** @type {?} */
                    const newWarnings = getInstanceWarnings(fNode.warning.conditions, ancestorsNames, prefix);
                    if (newWarnings !== fNode.warning.conditions) {
                        fInstance.warning = createWarningGroup(fNode.warning);
                        fInstance.warning.conditions = newWarnings;
                    }
                    else {
                        fInstance.warning = fNode.warning;
                    }
                }
                if (fNode.nextSlideCondition != null) {
                    fInstance.nextSlideCondition =
                        getInstanceCondition(fNode.nextSlideCondition, ancestorsNames, prefix);
                }
                if (isFieldWithChoices(fNode)) {
                    /** @type {?} */
                    const fwcInstance = (/** @type {?} */ (instance));
                    /** @type {?} */
                    const fwcNode = fwcInstance.node;
                    if (fwcNode.choicesFilter != null) {
                        fwcInstance.choicesFilter =
                            getInstanceFormula(fwcNode.choicesFilter, ancestorsNames, prefix);
                    }
                    if (fwcNode.triggerConditions != null) {
                        fwcInstance.triggerConditions =
                            getInstanceConditions(fwcNode.triggerConditions, ancestorsNames, prefix);
                    }
                }
            }
        }
        else {
            instance.visibility = instance.node.visibility;
            /** @type {?} */
            const conditionalBranches = instance.node.conditionalBranches != null
                && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = conditionalBranches;
            if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                /** @type {?} */
                const rgInstance = (/** @type {?} */ (instance));
                rgInstance.formulaReps = rgInstance.node.formulaReps;
            }
            else if (isFieldInstance(instance)) {
                /** @type {?} */
                const fInstance = (/** @type {?} */ (instance));
                fInstance.validation = fInstance.node.validation;
                fInstance.warning = fInstance.node.warning;
                fInstance.nextSlideCondition = fInstance.node.nextSlideCondition;
                if (isFieldWithChoicesInstance(instance)) {
                    /** @type {?} */
                    const fwcInstance = (/** @type {?} */ (instance));
                    fwcInstance.choicesFilter = fwcInstance.node.choicesFilter;
                    fwcInstance.triggerConditions = fwcInstance.node.triggerConditions;
                }
                fInstance.formula = fInstance.node.formula;
            }
        }
    }
    return instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10by1ub2RlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQ08sZUFBZSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQ2pGLE1BQU0sa0JBQWtCLENBQUM7QUFPMUIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBVS9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUk1RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUNMLDhCQUE4QixFQUMvQixNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBQzlGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDJCQUEyQixDQUFDO0FBQ2hFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQzFELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ2xFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHlCQUF5QixDQUFDO0FBQzVELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSxxQkFBcUIsQ0FBQztBQUNwRCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwwQkFBMEIsQ0FBQztBQUM3RCxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQzs7Ozs7Ozs7QUFFdkUsTUFBTSxVQUFVLGtCQUFrQixDQUM5QixRQUFxQyxFQUFFLElBQWEsRUFBRSxNQUFnQixFQUN0RSxPQUFtQjs7UUFDakIsUUFBUSxHQUF5QixJQUFJOztVQUNuQyxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVE7SUFDOUIsUUFBUSxRQUFRLEVBQUU7UUFDaEIsS0FBSyxXQUFXLENBQUMsUUFBUTs7a0JBQ2pCLEtBQUssR0FBRyxtQkFBQSxJQUFJLEVBQVk7WUFDOUIsSUFBSSxLQUFLLENBQUMsU0FBUyxHQUFHLEdBQUcsRUFBRTtnQkFDekIsSUFDRSxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUk7dUJBQ25DLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxJQUFJLElBQUksRUFDeEQ7b0JBQ0EsUUFBUSxHQUFHLG1CQUFBLGFBQWEsQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLENBQUMsY0FBYyxFQUFDLENBQ3ZELEVBQUMsSUFBSSxFQUFFLG1CQUFBLElBQUksRUFBWSxFQUFFLE1BQU0sRUFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2lCQUM5QztxQkFBTTtvQkFDTCxRQUFRLEdBQUcsbUJBQW1CLENBQUMsRUFBQyxJQUFJLEVBQUUsbUJBQUEsSUFBSSxFQUFZLEVBQUUsTUFBTSxFQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQzNFO2FBQ0Y7aUJBQU07Z0JBQ0wsUUFBUSxLQUFLLENBQUMsU0FBUyxFQUFFO29CQUN2QixLQUFLLFlBQVksQ0FBQyxZQUFZLENBQUM7b0JBQy9CLEtBQUssWUFBWSxDQUFDLGNBQWM7d0JBQzlCLFFBQVEsR0FBRyw4QkFBOEIsQ0FDckMsRUFBQyxJQUFJLEVBQUUsbUJBQUEsSUFBSSxFQUE0QixFQUFFLE1BQU0sRUFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUMvRCxNQUFNO29CQUNSLEtBQUssWUFBWSxDQUFDLEtBQUs7d0JBQ3JCLFFBQVEsR0FBRyx3QkFBd0IsQ0FBQyxFQUFDLElBQUksRUFBRSxtQkFBQSxJQUFJLEVBQWlCLEVBQUUsTUFBTSxFQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQ3BGLE1BQU07b0JBQ1I7d0JBQ0UsUUFBUSxHQUFHLG1CQUFtQixDQUFDLEVBQUMsSUFBSSxFQUFFLG1CQUFBLElBQUksRUFBWSxFQUFFLE1BQU0sRUFBQyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3dCQUMxRSxNQUFNO2lCQUNUO2FBQ0Y7WUFDRCxNQUFNO1FBQ1IsS0FBSyxXQUFXLENBQUMsWUFBWTtZQUMzQixRQUFRLEdBQUcsdUJBQXVCLENBQUMsRUFBQyxJQUFJLEVBQUUsbUJBQUEsSUFBSSxFQUFnQixFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFDekUsTUFBTTtRQUNSLEtBQUssV0FBVyxDQUFDLGlCQUFpQjtZQUNoQyxRQUFRLEdBQUcsNEJBQTRCLENBQUMsRUFBQyxJQUFJLEVBQUUsbUJBQUEsSUFBSSxFQUFxQixFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFDbkYsTUFBTTtRQUNSLEtBQUssV0FBVyxDQUFDLFFBQVE7WUFDdkIsUUFBUSxHQUFHLG1CQUFtQixDQUFDLEVBQUMsSUFBSSxFQUFFLG1CQUFBLElBQUksRUFBWSxFQUFFLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFDakUsTUFBTTtLQUNUO0lBQ0QsSUFBSSxRQUFRLElBQUksSUFBSSxFQUFFOztjQUNkLFNBQVMsR0FBRyxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQztRQUNyRCxJQUFJLFNBQVMsRUFBRTs7a0JBQ1AsY0FBYyxHQUFHLDhCQUE4QixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUM7WUFFckUsSUFBSSxJQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTs7c0JBQ3JCLGFBQWEsR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDLFNBQVM7O3NCQUN6QyxhQUFhLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUM7Z0JBQ2hGLFFBQVEsQ0FBQyxVQUFVLEdBQUcsYUFBYSxLQUFLLGFBQWEsQ0FBQyxDQUFDO29CQUNuRCxlQUFlLENBQUMsRUFBQyxTQUFTLEVBQUUsYUFBYSxFQUFDLENBQUMsQ0FBQyxDQUFDO29CQUM3QyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ3JCOztrQkFFSyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUk7bUJBQ2hFLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQy9DLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQjtnQkFDbkMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsUUFBUSxDQUFDLG1CQUFtQixHQUFHLHFCQUFxQixDQUNsRCxtQkFBbUIsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFFL0MsSUFBSSxRQUFRLEtBQUssV0FBVyxDQUFDLFlBQVksSUFBSSxRQUFRLEtBQUssV0FBVyxDQUFDLGlCQUFpQixFQUFFOztzQkFDakYsVUFBVSxHQUFHLG1CQUFBLFFBQVEsRUFBb0Q7O3NCQUN6RSxXQUFXLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXO2dCQUMvQyxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7OzBCQUNqQixVQUFVLEdBQUcsV0FBVyxDQUFDLE9BQU87O3dCQUNsQyxVQUFVLEdBQUcsbUJBQW1CLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUM7b0JBQ3hFLFVBQVUsQ0FBQyxXQUFXO3dCQUNsQixVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO2lCQUNwRjthQUNGO2lCQUFNLElBQUksUUFBUSxLQUFLLFdBQVcsQ0FBQyxRQUFRLEVBQUU7O3NCQUN0QyxTQUFTLEdBQUcsbUJBQUEsUUFBUSxFQUFvQjs7c0JBQ3hDLEtBQUssR0FBRyxTQUFTLENBQUMsSUFBSTtnQkFFNUIsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFO29CQUNqQixTQUFTLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUMvRTtnQkFFRCxJQUFJLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFOzswQkFDdEIsYUFBYSxHQUNmLHNCQUFzQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUM7b0JBQy9FLElBQUksYUFBYSxLQUFLLEtBQUssQ0FBQyxVQUFVLENBQUMsVUFBVSxFQUFFO3dCQUNqRCxTQUFTLENBQUMsVUFBVSxHQUFHLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDL0QsU0FBUyxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO3FCQUNqRDt5QkFBTTt3QkFDTCxTQUFTLENBQUMsVUFBVSxHQUFHLEtBQUssQ0FBQyxVQUFVLENBQUM7cUJBQ3pDO2lCQUNGO2dCQUVELElBQUksS0FBSyxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7OzBCQUNuQixXQUFXLEdBQUcsbUJBQW1CLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQztvQkFDekYsSUFBSSxXQUFXLEtBQUssS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLEVBQUU7d0JBQzVDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN0RCxTQUFTLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7cUJBQzVDO3lCQUFNO3dCQUNMLFNBQVMsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQztxQkFDbkM7aUJBQ0Y7Z0JBRUQsSUFBSSxLQUFLLENBQUMsa0JBQWtCLElBQUksSUFBSSxFQUFFO29CQUNwQyxTQUFTLENBQUMsa0JBQWtCO3dCQUN4QixvQkFBb0IsQ0FBQyxLQUFLLENBQUMsa0JBQWtCLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2lCQUM1RTtnQkFFRCxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxFQUFFOzswQkFDdkIsV0FBVyxHQUFHLG1CQUFBLFFBQVEsRUFBb0M7OzBCQUMxRCxPQUFPLEdBQUcsV0FBVyxDQUFDLElBQUk7b0JBQ2hDLElBQUksT0FBTyxDQUFDLGFBQWEsSUFBSSxJQUFJLEVBQUU7d0JBQ2pDLFdBQVcsQ0FBQyxhQUFhOzRCQUNyQixrQkFBa0IsQ0FBQyxPQUFPLENBQUMsYUFBYSxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztxQkFDdkU7b0JBQ0QsSUFBSSxPQUFPLENBQUMsaUJBQWlCLElBQUksSUFBSSxFQUFFO3dCQUNyQyxXQUFXLENBQUMsaUJBQWlCOzRCQUN6QixxQkFBcUIsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO3FCQUM5RTtpQkFDRjthQUNGO1NBQ0Y7YUFBTTtZQUNMLFFBQVEsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7O2tCQUN6QyxtQkFBbUIsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUk7bUJBQ2hFLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsTUFBTSxHQUFHLENBQUM7Z0JBQy9DLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQjtnQkFDbkMsQ0FBQyxDQUFDLENBQUMsZUFBZSxFQUFFLENBQUM7WUFDdkIsUUFBUSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1lBQ25ELElBQUksbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksd0JBQXdCLENBQUMsUUFBUSxDQUFDLEVBQUU7O3NCQUNqRSxVQUFVLEdBQUcsbUJBQUEsUUFBUSxFQUFxQztnQkFDaEUsVUFBVSxDQUFDLFdBQVcsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQzthQUN0RDtpQkFBTSxJQUFJLGVBQWUsQ0FBQyxRQUFRLENBQUMsRUFBRTs7c0JBQzlCLFNBQVMsR0FBRyxtQkFBQSxRQUFRLEVBQW9CO2dCQUM5QyxTQUFTLENBQUMsVUFBVSxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2dCQUNqRCxTQUFTLENBQUMsT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDO2dCQUMzQyxTQUFTLENBQUMsa0JBQWtCLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQztnQkFDakUsSUFBSSwwQkFBMEIsQ0FBQyxRQUFRLENBQUMsRUFBRTs7MEJBQ2xDLFdBQVcsR0FBRyxtQkFBQSxRQUFRLEVBQW9DO29CQUNoRSxXQUFXLENBQUMsYUFBYSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUMzRCxXQUFXLENBQUMsaUJBQWlCLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztpQkFDcEU7Z0JBQ0QsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUM1QztTQUNGO0tBQ0Y7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkNvbnRleHQsIGNyZWF0ZUNvbmRpdGlvbiwgY3JlYXRlRm9ybXVsYSwgbm9ybWFsaXplRXhwcmVzc2lvbiwgYWx3YXlzQ29uZGl0aW9uXG59IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZVxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGaWVsZH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL3RhYmxlLWZpZWxkJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZVxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS1ncm91cCc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zbGlkZXMvcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7QWpmU2xpZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zbGlkZXMvc2xpZGUnO1xuaW1wb3J0IHtjb21wb25lbnRzTWFwfSBmcm9tICcuLi9maWVsZHMvZmllbGRzLW1hcCc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4uL2ZpZWxkcy1pbnN0YW5jZXMvY3JlYXRlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUZpZWxkV2l0aENob2ljZXNJbnN0YW5jZVxufSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2NyZWF0ZS1maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtjcmVhdGVUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4uL2ZpZWxkcy1pbnN0YW5jZXMvY3JlYXRlLXRhYmxlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7aXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2V9IGZyb20gJy4uL2ZpZWxkcy1pbnN0YW5jZXMvaXMtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7aXNGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi9maWVsZHMvaXMtZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7Y3JlYXRlTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9jcmVhdGUtbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZVJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4uL3NsaWRlcy1pbnN0YW5jZXMvY3JlYXRlLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZVNsaWRlSW5zdGFuY2V9IGZyb20gJy4uL3NsaWRlcy1pbnN0YW5jZXMvY3JlYXRlLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlVmFsaWRhdGlvbkdyb3VwfSBmcm9tICcuLi92YWxpZGF0aW9uL2NyZWF0ZS12YWxpZGF0aW9uLWdyb3VwJztcbmltcG9ydCB7Y3JlYXRlV2FybmluZ0dyb3VwfSBmcm9tICcuLi93YXJuaW5nL2NyZWF0ZS13YXJuaW5nLWdyb3VwJztcblxuaW1wb3J0IHtnZXRBbmNlc3RvclJlcGVhdGluZ05vZGVzTmFtZXN9IGZyb20gJy4vZ2V0LWFuY2VzdG9yLXJlcGVhdGluZy1ub2Rlcy1uYW1lcyc7XG5pbXBvcnQge2dldEluc3RhbmNlQ29uZGl0aW9ufSBmcm9tICcuL2dldC1pbnN0YW5jZS1jb25kaXRpb24nO1xuaW1wb3J0IHtnZXRJbnN0YW5jZUNvbmRpdGlvbnN9IGZyb20gJy4vZ2V0LWluc3RhbmNlLWNvbmRpdGlvbnMnO1xuaW1wb3J0IHtnZXRJbnN0YW5jZUZvcm11bGF9IGZyb20gJy4vZ2V0LWluc3RhbmNlLWZvcm11bGEnO1xuaW1wb3J0IHtnZXRJbnN0YW5jZVZhbGlkYXRpb25zfSBmcm9tICcuL2dldC1pbnN0YW5jZS12YWxpZGF0aW9ucyc7XG5pbXBvcnQge2dldEluc3RhbmNlV2FybmluZ3N9IGZyb20gJy4vZ2V0LWluc3RhbmNlLXdhcm5pbmdzJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuL2lzLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7aXNOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pcy1ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL2lzLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBub2RlVG9Ob2RlSW5zdGFuY2UoXG4gICAgYWxsTm9kZXM6IEFqZk5vZGVbXXxBamZOb2RlSW5zdGFuY2VbXSwgbm9kZTogQWpmTm9kZSwgcHJlZml4OiBudW1iZXJbXSxcbiAgICBjb250ZXh0OiBBamZDb250ZXh0KTogQWpmTm9kZUluc3RhbmNlfG51bGwge1xuICBsZXQgaW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZXxudWxsID0gbnVsbDtcbiAgY29uc3Qgbm9kZVR5cGUgPSBub2RlLm5vZGVUeXBlO1xuICBzd2l0Y2ggKG5vZGVUeXBlKSB7XG4gICAgY2FzZSBBamZOb2RlVHlwZS5BamZGaWVsZDpcbiAgICAgIGNvbnN0IGZpZWxkID0gbm9kZSBhcyBBamZGaWVsZDtcbiAgICAgIGlmIChmaWVsZC5maWVsZFR5cGUgPiAxMDApIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbXBvbmVudHNNYXBbZmllbGQuZmllbGRUeXBlXSAhPSBudWxsXG4gICAgICAgICAgJiYgY29tcG9uZW50c01hcFtmaWVsZC5maWVsZFR5cGVdLmNyZWF0ZUluc3RhbmNlICE9IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5zdGFuY2UgPSBjb21wb25lbnRzTWFwW2ZpZWxkLmZpZWxkVHlwZV0uY3JlYXRlSW5zdGFuY2UhKFxuICAgICAgICAgICAge25vZGU6IG5vZGUgYXMgQWpmRmllbGQsIHByZWZpeH0sIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluc3RhbmNlID0gY3JlYXRlRmllbGRJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZGaWVsZCwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoZmllbGQuZmllbGRUeXBlKSB7XG4gICAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlOlxuICAgICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoXG4gICAgICAgICAgICAgICAge25vZGU6IG5vZGUgYXMgQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+LCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRhYmxlOlxuICAgICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVUYWJsZUZpZWxkSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmVGFibGVGaWVsZCwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVGaWVsZEluc3RhbmNlKHtub2RlOiBub2RlIGFzIEFqZkZpZWxkLCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cDpcbiAgICAgIGluc3RhbmNlID0gY3JlYXRlTm9kZUdyb3VwSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmTm9kZUdyb3VwLCBwcmVmaXh9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGU6XG4gICAgICBpbnN0YW5jZSA9IGNyZWF0ZVJlcGVhdGluZ1NsaWRlSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGUsIHByZWZpeH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBamZOb2RlVHlwZS5BamZTbGlkZTpcbiAgICAgIGluc3RhbmNlID0gY3JlYXRlU2xpZGVJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZTbGlkZSwgcHJlZml4fSk7XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgIGNvbnN0IGhhc1ByZWZpeCA9IHByZWZpeCAhPSBudWxsICYmIHByZWZpeC5sZW5ndGggPiAwO1xuICAgIGlmIChoYXNQcmVmaXgpIHtcbiAgICAgIGNvbnN0IGFuY2VzdG9yc05hbWVzID0gZ2V0QW5jZXN0b3JSZXBlYXRpbmdOb2Rlc05hbWVzKGFsbE5vZGVzLCBub2RlKTtcblxuICAgICAgaWYgKG5vZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG9sZFZpc2liaWxpdHkgPSBub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uO1xuICAgICAgICBjb25zdCBuZXdWaXNpYmlsaXR5ID0gbm9ybWFsaXplRXhwcmVzc2lvbihvbGRWaXNpYmlsaXR5LCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgaW5zdGFuY2UudmlzaWJpbGl0eSA9IG5ld1Zpc2liaWxpdHkgIT09IG9sZFZpc2liaWxpdHkgP1xuICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IG5ld1Zpc2liaWxpdHl9KSA6XG4gICAgICAgICAgICBub2RlLnZpc2liaWxpdHk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbmRpdGlvbmFsQnJhbmNoZXMgPSBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbFxuICAgICAgICAmJiBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoID4gMFxuICAgICAgICA/IGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlc1xuICAgICAgICA6IFthbHdheXNDb25kaXRpb24oKV07XG4gICAgICBpbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzID0gZ2V0SW5zdGFuY2VDb25kaXRpb25zKFxuICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcblxuICAgICAgaWYgKG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXAgfHwgbm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICAgIGNvbnN0IG5nSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IGZvcm11bGFSZXBzID0gbmdJbnN0YW5jZS5ub2RlLmZvcm11bGFSZXBzO1xuICAgICAgICBpZiAoZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IG9sZEZvcm11bGEgPSBmb3JtdWxhUmVwcy5mb3JtdWxhO1xuICAgICAgICAgIGxldCBuZXdGb3JtdWxhID0gbm9ybWFsaXplRXhwcmVzc2lvbihvbGRGb3JtdWxhLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgICBuZ0luc3RhbmNlLmZvcm11bGFSZXBzID1cbiAgICAgICAgICAgICAgbmV3Rm9ybXVsYSAhPT0gb2xkRm9ybXVsYSA/IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IG5ld0Zvcm11bGF9KSA6IGZvcm11bGFSZXBzO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZGaWVsZCkge1xuICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICBjb25zdCBmTm9kZSA9IGZJbnN0YW5jZS5ub2RlO1xuXG4gICAgICAgIGlmIChmTm9kZS5mb3JtdWxhKSB7XG4gICAgICAgICAgZkluc3RhbmNlLmZvcm11bGEgPSBnZXRJbnN0YW5jZUZvcm11bGEoZk5vZGUuZm9ybXVsYSwgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZk5vZGUudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgIGdldEluc3RhbmNlVmFsaWRhdGlvbnMoZk5vZGUudmFsaWRhdGlvbi5jb25kaXRpb25zLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgICBpZiAobmV3Q29uZGl0aW9ucyAhPT0gZk5vZGUudmFsaWRhdGlvbi5jb25kaXRpb25zKSB7XG4gICAgICAgICAgICBmSW5zdGFuY2UudmFsaWRhdGlvbiA9IGNyZWF0ZVZhbGlkYXRpb25Hcm91cChmTm9kZS52YWxpZGF0aW9uKTtcbiAgICAgICAgICAgIGZJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgPSBuZXdDb25kaXRpb25zO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmSW5zdGFuY2UudmFsaWRhdGlvbiA9IGZOb2RlLnZhbGlkYXRpb247XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZOb2RlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IG5ld1dhcm5pbmdzID0gZ2V0SW5zdGFuY2VXYXJuaW5ncyhmTm9kZS53YXJuaW5nLmNvbmRpdGlvbnMsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICAgIGlmIChuZXdXYXJuaW5ncyAhPT0gZk5vZGUud2FybmluZy5jb25kaXRpb25zKSB7XG4gICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZyA9IGNyZWF0ZVdhcm5pbmdHcm91cChmTm9kZS53YXJuaW5nKTtcbiAgICAgICAgICAgIGZJbnN0YW5jZS53YXJuaW5nLmNvbmRpdGlvbnMgPSBuZXdXYXJuaW5ncztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZkluc3RhbmNlLndhcm5pbmcgPSBmTm9kZS53YXJuaW5nO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmTm9kZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgIGZJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gPVxuICAgICAgICAgICAgICBnZXRJbnN0YW5jZUNvbmRpdGlvbihmTm9kZS5uZXh0U2xpZGVDb25kaXRpb24sIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlcyhmTm9kZSkpIHtcbiAgICAgICAgICBjb25zdCBmd2NJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+O1xuICAgICAgICAgIGNvbnN0IGZ3Y05vZGUgPSBmd2NJbnN0YW5jZS5ub2RlO1xuICAgICAgICAgIGlmIChmd2NOb2RlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlciA9XG4gICAgICAgICAgICAgICAgZ2V0SW5zdGFuY2VGb3JtdWxhKGZ3Y05vZGUuY2hvaWNlc0ZpbHRlciwgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmd2NOb2RlLnRyaWdnZXJDb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zID1cbiAgICAgICAgICAgICAgICBnZXRJbnN0YW5jZUNvbmRpdGlvbnMoZndjTm9kZS50cmlnZ2VyQ29uZGl0aW9ucywgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGluc3RhbmNlLnZpc2liaWxpdHkgPSBpbnN0YW5jZS5ub2RlLnZpc2liaWxpdHk7XG4gICAgICBjb25zdCBjb25kaXRpb25hbEJyYW5jaGVzID0gaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzICE9IG51bGxcbiAgICAgICAgJiYgaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCA+IDBcbiAgICAgICAgPyBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXNcbiAgICAgICAgOiBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICAgICAgaW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcyA9IGNvbmRpdGlvbmFsQnJhbmNoZXM7XG4gICAgICBpZiAoaXNOb2RlR3JvdXBJbnN0YW5jZShpbnN0YW5jZSkgfHwgaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICBjb25zdCByZ0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlO1xuICAgICAgICByZ0luc3RhbmNlLmZvcm11bGFSZXBzID0gcmdJbnN0YW5jZS5ub2RlLmZvcm11bGFSZXBzO1xuICAgICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgIGZJbnN0YW5jZS52YWxpZGF0aW9uID0gZkluc3RhbmNlLm5vZGUudmFsaWRhdGlvbjtcbiAgICAgICAgZkluc3RhbmNlLndhcm5pbmcgPSBmSW5zdGFuY2Uubm9kZS53YXJuaW5nO1xuICAgICAgICBmSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uID0gZkluc3RhbmNlLm5vZGUubmV4dFNsaWRlQ29uZGl0aW9uO1xuICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PjtcbiAgICAgICAgICBmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyID0gZndjSW5zdGFuY2Uubm9kZS5jaG9pY2VzRmlsdGVyO1xuICAgICAgICAgIGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zID0gZndjSW5zdGFuY2Uubm9kZS50cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBmSW5zdGFuY2UuZm9ybXVsYSA9IGZJbnN0YW5jZS5ub2RlLmZvcm11bGE7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBpbnN0YW5jZTtcbn1cbiJdfQ==