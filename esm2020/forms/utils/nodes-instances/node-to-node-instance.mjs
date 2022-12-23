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
import { alwaysCondition, createCondition, createFormula, normalizeExpression, } from '@ajf/core/models';
import { AjfFieldType } from '../../interface/fields/field-type';
import { AjfNodeType } from '../../interface/nodes/node-type';
import { createFieldInstance } from '../fields-instances/create-field-instance';
import { createFieldWithChoicesInstance } from '../fields-instances/create-field-with-choices-instance';
import { createTableFieldInstance } from '../fields-instances/create-table-field-instance';
import { isFieldWithChoicesInstance } from '../fields-instances/is-field-with-choices-instance';
import { componentsMap } from '../fields/fields-map';
import { createNodeGroupInstance } from '../nodes-instances/create-node-group-instance';
import { createRepeatingSlideInstance } from '../slides-instances/create-repeating-slide-instance';
import { createSlideInstance } from '../slides-instances/create-slide-instance';
import { createValidationGroup } from '../validation/create-validation-group';
import { createWarningGroup } from '../warning/create-warning-group';
import { getAncestorRepeatingNodesNames } from './get-ancestor-repeating-nodes-names';
import { getContainerNode } from './get-container-node';
import { getInstanceCondition } from './get-instance-condition';
import { getInstanceConditions } from './get-instance-conditions';
import { getInstanceFormula } from './get-instance-formula';
import { getInstanceValidations } from './get-instance-validations';
import { getInstanceWarnings } from './get-instance-warnings';
import { isFieldInstance } from './is-field-instance';
import { isNodeGroupInstance } from './is-node-group-instance';
import { isRepeatingSlideInstance } from './is-repeating-slide-instance';
/**
 * It creates a nodeInstance relative to a node.
 * To create the instance it calls relative create builder by nodeType.
 * If the prefix is ​​defined all formulas and conditions are calculated based on it.
 */
export function nodeToNodeInstance(allNodes, node, prefix, context) {
    let instance = null;
    const nodeType = node.nodeType;
    switch (nodeType) {
        case AjfNodeType.AjfField:
            const field = node;
            if (field.fieldType > 100) {
                if (componentsMap[field.fieldType] != null &&
                    componentsMap[field.fieldType].createInstance != null) {
                    instance = componentsMap[field.fieldType].createInstance({ node: field, prefix }, context);
                }
                else {
                    instance = createFieldInstance({ node: field, prefix }, context);
                }
            }
            else {
                switch (field.fieldType) {
                    case AjfFieldType.SingleChoice:
                    case AjfFieldType.MultipleChoice:
                        instance = createFieldWithChoicesInstance({ node: field, prefix }, context);
                        break;
                    case AjfFieldType.Table:
                        instance = createTableFieldInstance({ node: field, prefix }, context);
                        break;
                    default:
                        const containerNode = getContainerNode(allNodes, node);
                        instance = createFieldInstance({ node: field, prefix }, context, containerNode);
                        break;
                }
            }
            break;
        case AjfNodeType.AjfNodeGroup:
            instance = createNodeGroupInstance({ node: node, prefix });
            break;
        case AjfNodeType.AjfRepeatingSlide:
            instance = createRepeatingSlideInstance({ node: node, prefix });
            break;
        case AjfNodeType.AjfSlide:
            instance = createSlideInstance({ node: node, prefix });
            break;
    }
    if (instance != null) {
        const hasPrefix = prefix != null && prefix.length > 0;
        if (hasPrefix) {
            const ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);
            if (node.visibility != null) {
                const oldVisibility = node.visibility.condition;
                const newVisibility = normalizeExpression(oldVisibility, ancestorsNames, prefix);
                instance.visibility =
                    newVisibility !== oldVisibility
                        ? createCondition({ condition: newVisibility })
                        : node.visibility;
            }
            const conditionalBranches = instance.node.conditionalBranches != null && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
            if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                const formulaReps = instance.node.formulaReps;
                if (formulaReps != null) {
                    const oldFormula = formulaReps.formula;
                    let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
                    instance.formulaReps =
                        newFormula !== oldFormula ? createFormula({ formula: newFormula }) : formulaReps;
                }
            }
            else if (isFieldInstance(instance)) {
                if (instance.node.formula) {
                    instance.formula = getInstanceFormula(instance.node.formula, ancestorsNames, prefix);
                }
                if (instance.node.validation != null) {
                    const newConditions = getInstanceValidations(instance.node.validation.conditions, ancestorsNames, prefix);
                    if (newConditions !== instance.node.validation.conditions) {
                        instance.validation = createValidationGroup(instance.node.validation);
                        instance.validation.conditions = newConditions;
                    }
                    else {
                        instance.validation = instance.node.validation;
                    }
                }
                if (instance.node.warning != null) {
                    const newWarnings = getInstanceWarnings(instance.node.warning.conditions, ancestorsNames, prefix);
                    if (newWarnings !== instance.node.warning.conditions) {
                        instance.warning = createWarningGroup(instance.node.warning);
                        instance.warning.conditions = newWarnings;
                    }
                    else {
                        instance.warning = instance.node.warning;
                    }
                }
                if (instance.node.nextSlideCondition != null) {
                    instance.nextSlideCondition = getInstanceCondition(instance.node.nextSlideCondition, ancestorsNames, prefix);
                }
                if (isFieldWithChoicesInstance(instance)) {
                    if (instance.node.choicesFilter != null) {
                        instance.choicesFilter = getInstanceFormula(instance.node.choicesFilter, ancestorsNames, prefix);
                    }
                    if (instance.node.triggerConditions != null) {
                        instance.triggerConditions = getInstanceConditions(instance.node.triggerConditions, ancestorsNames, prefix);
                    }
                }
            }
        }
        else {
            instance.visibility = instance.node.visibility;
            const conditionalBranches = instance.node.conditionalBranches != null && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = conditionalBranches;
            if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                const rgInstance = instance;
                rgInstance.formulaReps = rgInstance.node.formulaReps;
            }
            else if (isFieldInstance(instance)) {
                instance.validation = instance.node.validation;
                instance.warning = instance.node.warning;
                instance.nextSlideCondition = instance.node.nextSlideCondition;
                if (isFieldWithChoicesInstance(instance)) {
                    instance.choicesFilter = instance.node.choicesFilter;
                    instance.triggerConditions = instance.node.triggerConditions;
                }
                instance.formula = instance.node.formula;
            }
        }
    }
    return instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10by1ub2RlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsZUFBZSxFQUNmLGVBQWUsRUFDZixhQUFhLEVBQ2IsbUJBQW1CLEdBQ3BCLE1BQU0sa0JBQWtCLENBQUM7QUFHMUIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBSy9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUc1RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUN0RyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUN6RixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUM5RixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFDdEYsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDNUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFbkUsT0FBTyxFQUFDLDhCQUE4QixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDcEYsT0FBTyxFQUFDLGdCQUFnQixFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDdEQsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sMEJBQTBCLENBQUM7QUFDOUQsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDaEUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDMUQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDbEUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0seUJBQXlCLENBQUM7QUFDNUQsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzdELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBRXZFOzs7O0dBSUc7QUFDSCxNQUFNLFVBQVUsa0JBQWtCLENBQ2hDLFFBQXVDLEVBQ3ZDLElBQWEsRUFDYixNQUFnQixFQUNoQixPQUFtQjtJQUVuQixJQUFJLFFBQVEsR0FBMkIsSUFBSSxDQUFDO0lBQzVDLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7SUFDL0IsUUFBUSxRQUFRLEVBQUU7UUFDaEIsS0FBSyxXQUFXLENBQUMsUUFBUTtZQUN2QixNQUFNLEtBQUssR0FBRyxJQUFnQixDQUFDO1lBQy9CLElBQUksS0FBSyxDQUFDLFNBQVMsR0FBRyxHQUFHLEVBQUU7Z0JBQ3pCLElBQ0UsYUFBYSxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJO29CQUN0QyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWMsSUFBSSxJQUFJLEVBQ3JEO29CQUNBLFFBQVEsR0FBRyxhQUFhLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLGNBQWUsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQzNGO3FCQUFNO29CQUNMLFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7aUJBQ2hFO2FBQ0Y7aUJBQU07Z0JBQ0wsUUFBUSxLQUFLLENBQUMsU0FBUyxFQUFFO29CQUN2QixLQUFLLFlBQVksQ0FBQyxZQUFZLENBQUM7b0JBQy9CLEtBQUssWUFBWSxDQUFDLGNBQWM7d0JBQzlCLFFBQVEsR0FBRyw4QkFBOEIsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7d0JBQzFFLE1BQU07b0JBQ1IsS0FBSyxZQUFZLENBQUMsS0FBSzt3QkFDckIsUUFBUSxHQUFHLHdCQUF3QixDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxNQUFNLEVBQUMsRUFBRSxPQUFPLENBQUMsQ0FBQzt3QkFDcEUsTUFBTTtvQkFDUjt3QkFDRSxNQUFNLGFBQWEsR0FBRyxnQkFBZ0IsQ0FBQyxRQUFRLEVBQUUsSUFBSSxDQUFDLENBQUM7d0JBQ3ZELFFBQVEsR0FBRyxtQkFBbUIsQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLEVBQUUsTUFBTSxFQUFDLEVBQUUsT0FBTyxFQUFFLGFBQWEsQ0FBQyxDQUFDO3dCQUM5RSxNQUFNO2lCQUNUO2FBQ0Y7WUFDRCxNQUFNO1FBQ1IsS0FBSyxXQUFXLENBQUMsWUFBWTtZQUMzQixRQUFRLEdBQUcsdUJBQXVCLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBb0IsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1lBQ3pFLE1BQU07UUFDUixLQUFLLFdBQVcsQ0FBQyxpQkFBaUI7WUFDaEMsUUFBUSxHQUFHLDRCQUE0QixDQUFDLEVBQUMsSUFBSSxFQUFFLElBQXlCLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztZQUNuRixNQUFNO1FBQ1IsS0FBSyxXQUFXLENBQUMsUUFBUTtZQUN2QixRQUFRLEdBQUcsbUJBQW1CLENBQUMsRUFBQyxJQUFJLEVBQUUsSUFBZ0IsRUFBRSxNQUFNLEVBQUMsQ0FBQyxDQUFDO1lBQ2pFLE1BQU07S0FDVDtJQUNELElBQUksUUFBUSxJQUFJLElBQUksRUFBRTtRQUNwQixNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksSUFBSSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDO1FBQ3RELElBQUksU0FBUyxFQUFFO1lBQ2IsTUFBTSxjQUFjLEdBQUcsOEJBQThCLENBQUMsUUFBUSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRXRFLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7Z0JBQzNCLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUNoRCxNQUFNLGFBQWEsR0FBRyxtQkFBbUIsQ0FBQyxhQUFhLEVBQUUsY0FBYyxFQUFFLE1BQU0sQ0FBQyxDQUFDO2dCQUNqRixRQUFRLENBQUMsVUFBVTtvQkFDakIsYUFBYSxLQUFLLGFBQWE7d0JBQzdCLENBQUMsQ0FBQyxlQUFlLENBQUMsRUFBQyxTQUFTLEVBQUUsYUFBYSxFQUFDLENBQUM7d0JBQzdDLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQ3ZCO1lBRUQsTUFBTSxtQkFBbUIsR0FDdkIsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDdkYsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsbUJBQW1CO2dCQUNuQyxDQUFDLENBQUMsQ0FBQyxlQUFlLEVBQUUsQ0FBQyxDQUFDO1lBQzFCLFFBQVEsQ0FBQyxtQkFBbUIsR0FBRyxxQkFBcUIsQ0FDbEQsbUJBQW1CLEVBQ25CLGNBQWMsRUFDZCxNQUFNLENBQ1AsQ0FBQztZQUVGLElBQUksbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksd0JBQXdCLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZFLE1BQU0sV0FBVyxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDO2dCQUM5QyxJQUFJLFdBQVcsSUFBSSxJQUFJLEVBQUU7b0JBQ3ZCLE1BQU0sVUFBVSxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7b0JBQ3ZDLElBQUksVUFBVSxHQUFHLG1CQUFtQixDQUFDLFVBQVUsRUFBRSxjQUFjLEVBQUUsTUFBTSxDQUFDLENBQUM7b0JBQ3pFLFFBQVEsQ0FBQyxXQUFXO3dCQUNsQixVQUFVLEtBQUssVUFBVSxDQUFDLENBQUMsQ0FBQyxhQUFhLENBQUMsRUFBQyxPQUFPLEVBQUUsVUFBVSxFQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDO2lCQUNsRjthQUNGO2lCQUFNLElBQUksZUFBZSxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFO29CQUN6QixRQUFRLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLENBQUMsQ0FBQztpQkFDdEY7Z0JBRUQsSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7b0JBQ3BDLE1BQU0sYUFBYSxHQUFHLHNCQUFzQixDQUMxQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQ25DLGNBQWMsRUFDZCxNQUFNLENBQ1AsQ0FBQztvQkFDRixJQUFJLGFBQWEsS0FBSyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEVBQUU7d0JBQ3pELFFBQVEsQ0FBQyxVQUFVLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzt3QkFDdEUsUUFBUSxDQUFDLFVBQVUsQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO3FCQUNoRDt5QkFBTTt3QkFDTCxRQUFRLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO3FCQUNoRDtpQkFDRjtnQkFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtvQkFDakMsTUFBTSxXQUFXLEdBQUcsbUJBQW1CLENBQ3JDLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFDaEMsY0FBYyxFQUNkLE1BQU0sQ0FDUCxDQUFDO29CQUNGLElBQUksV0FBVyxLQUFLLFFBQVEsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFVBQVUsRUFBRTt3QkFDcEQsUUFBUSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM3RCxRQUFRLENBQUMsT0FBTyxDQUFDLFVBQVUsR0FBRyxXQUFXLENBQUM7cUJBQzNDO3lCQUFNO3dCQUNMLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7cUJBQzFDO2lCQUNGO2dCQUVELElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsSUFBSSxJQUFJLEVBQUU7b0JBQzVDLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxvQkFBb0IsQ0FDaEQsUUFBUSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsRUFDaEMsY0FBYyxFQUNkLE1BQU0sQ0FDUCxDQUFDO2lCQUNIO2dCQUVELElBQUksMEJBQTBCLENBQUMsUUFBUSxDQUFDLEVBQUU7b0JBQ3hDLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxhQUFhLElBQUksSUFBSSxFQUFFO3dCQUN2QyxRQUFRLENBQUMsYUFBYSxHQUFHLGtCQUFrQixDQUN6QyxRQUFRLENBQUMsSUFBSSxDQUFDLGFBQWEsRUFDM0IsY0FBYyxFQUNkLE1BQU0sQ0FDUCxDQUFDO3FCQUNIO29CQUNELElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsSUFBSSxJQUFJLEVBQUU7d0JBQzNDLFFBQVEsQ0FBQyxpQkFBaUIsR0FBRyxxQkFBcUIsQ0FDaEQsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFDL0IsY0FBYyxFQUNkLE1BQU0sQ0FDUCxDQUFDO3FCQUNIO2lCQUNGO2FBQ0Y7U0FDRjthQUFNO1lBQ0wsUUFBUSxDQUFDLFVBQVUsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztZQUMvQyxNQUFNLG1CQUFtQixHQUN2QixRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLE1BQU0sR0FBRyxDQUFDO2dCQUN2RixDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUI7Z0JBQ25DLENBQUMsQ0FBQyxDQUFDLGVBQWUsRUFBRSxDQUFDLENBQUM7WUFDMUIsUUFBUSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO1lBQ25ELElBQUksbUJBQW1CLENBQUMsUUFBUSxDQUFDLElBQUksd0JBQXdCLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3ZFLE1BQU0sVUFBVSxHQUFHLFFBQTZDLENBQUM7Z0JBQ2pFLFVBQVUsQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDdEQ7aUJBQU0sSUFBSSxlQUFlLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3BDLFFBQVEsQ0FBQyxVQUFVLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7Z0JBQy9DLFFBQVEsQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ3pDLFFBQVEsQ0FBQyxrQkFBa0IsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2dCQUMvRCxJQUFJLDBCQUEwQixDQUFDLFFBQVEsQ0FBQyxFQUFFO29CQUN4QyxRQUFRLENBQUMsYUFBYSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDO29CQUNyRCxRQUFRLENBQUMsaUJBQWlCLEdBQUcsUUFBUSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztpQkFDOUQ7Z0JBQ0QsUUFBUSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUMxQztTQUNGO0tBQ0Y7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZDb250ZXh0LFxuICBhbHdheXNDb25kaXRpb24sXG4gIGNyZWF0ZUNvbmRpdGlvbixcbiAgY3JlYXRlRm9ybXVsYSxcbiAgbm9ybWFsaXplRXhwcmVzc2lvbixcbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS1ncm91cCc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zbGlkZXMvcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7QWpmU2xpZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zbGlkZXMvc2xpZGUnO1xuaW1wb3J0IHtjcmVhdGVGaWVsZEluc3RhbmNlfSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2NyZWF0ZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi4vZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2NyZWF0ZS10YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2NvbXBvbmVudHNNYXB9IGZyb20gJy4uL2ZpZWxkcy9maWVsZHMtbWFwJztcbmltcG9ydCB7Y3JlYXRlTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9jcmVhdGUtbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZVJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4uL3NsaWRlcy1pbnN0YW5jZXMvY3JlYXRlLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZVNsaWRlSW5zdGFuY2V9IGZyb20gJy4uL3NsaWRlcy1pbnN0YW5jZXMvY3JlYXRlLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlVmFsaWRhdGlvbkdyb3VwfSBmcm9tICcuLi92YWxpZGF0aW9uL2NyZWF0ZS12YWxpZGF0aW9uLWdyb3VwJztcbmltcG9ydCB7Y3JlYXRlV2FybmluZ0dyb3VwfSBmcm9tICcuLi93YXJuaW5nL2NyZWF0ZS13YXJuaW5nLWdyb3VwJztcblxuaW1wb3J0IHtnZXRBbmNlc3RvclJlcGVhdGluZ05vZGVzTmFtZXN9IGZyb20gJy4vZ2V0LWFuY2VzdG9yLXJlcGVhdGluZy1ub2Rlcy1uYW1lcyc7XG5pbXBvcnQge2dldENvbnRhaW5lck5vZGV9IGZyb20gJy4vZ2V0LWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VDb25kaXRpb259IGZyb20gJy4vZ2V0LWluc3RhbmNlLWNvbmRpdGlvbic7XG5pbXBvcnQge2dldEluc3RhbmNlQ29uZGl0aW9uc30gZnJvbSAnLi9nZXQtaW5zdGFuY2UtY29uZGl0aW9ucyc7XG5pbXBvcnQge2dldEluc3RhbmNlRm9ybXVsYX0gZnJvbSAnLi9nZXQtaW5zdGFuY2UtZm9ybXVsYSc7XG5pbXBvcnQge2dldEluc3RhbmNlVmFsaWRhdGlvbnN9IGZyb20gJy4vZ2V0LWluc3RhbmNlLXZhbGlkYXRpb25zJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VXYXJuaW5nc30gZnJvbSAnLi9nZXQtaW5zdGFuY2Utd2FybmluZ3MnO1xuaW1wb3J0IHtpc0ZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaXMtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc05vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL2lzLW5vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaXMtcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcblxuLyoqXG4gKiBJdCBjcmVhdGVzIGEgbm9kZUluc3RhbmNlIHJlbGF0aXZlIHRvIGEgbm9kZS5cbiAqIFRvIGNyZWF0ZSB0aGUgaW5zdGFuY2UgaXQgY2FsbHMgcmVsYXRpdmUgY3JlYXRlIGJ1aWxkZXIgYnkgbm9kZVR5cGUuXG4gKiBJZiB0aGUgcHJlZml4IGlzIOKAi+KAi2RlZmluZWQgYWxsIGZvcm11bGFzIGFuZCBjb25kaXRpb25zIGFyZSBjYWxjdWxhdGVkIGJhc2VkIG9uIGl0LlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9kZVRvTm9kZUluc3RhbmNlKFxuICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gIG5vZGU6IEFqZk5vZGUsXG4gIHByZWZpeDogbnVtYmVyW10sXG4gIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4pOiBBamZOb2RlSW5zdGFuY2UgfCBudWxsIHtcbiAgbGV0IGluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UgfCBudWxsID0gbnVsbDtcbiAgY29uc3Qgbm9kZVR5cGUgPSBub2RlLm5vZGVUeXBlO1xuICBzd2l0Y2ggKG5vZGVUeXBlKSB7XG4gICAgY2FzZSBBamZOb2RlVHlwZS5BamZGaWVsZDpcbiAgICAgIGNvbnN0IGZpZWxkID0gbm9kZSBhcyBBamZGaWVsZDtcbiAgICAgIGlmIChmaWVsZC5maWVsZFR5cGUgPiAxMDApIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIGNvbXBvbmVudHNNYXBbZmllbGQuZmllbGRUeXBlXSAhPSBudWxsICYmXG4gICAgICAgICAgY29tcG9uZW50c01hcFtmaWVsZC5maWVsZFR5cGVdLmNyZWF0ZUluc3RhbmNlICE9IG51bGxcbiAgICAgICAgKSB7XG4gICAgICAgICAgaW5zdGFuY2UgPSBjb21wb25lbnRzTWFwW2ZpZWxkLmZpZWxkVHlwZV0uY3JlYXRlSW5zdGFuY2UhKHtub2RlOiBmaWVsZCwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVGaWVsZEluc3RhbmNlKHtub2RlOiBmaWVsZCwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoZmllbGQuZmllbGRUeXBlKSB7XG4gICAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlOlxuICAgICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Uoe25vZGU6IGZpZWxkLCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRhYmxlOlxuICAgICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVUYWJsZUZpZWxkSW5zdGFuY2Uoe25vZGU6IGZpZWxkLCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJOb2RlID0gZ2V0Q29udGFpbmVyTm9kZShhbGxOb2Rlcywgbm9kZSk7XG4gICAgICAgICAgICBpbnN0YW5jZSA9IGNyZWF0ZUZpZWxkSW5zdGFuY2Uoe25vZGU6IGZpZWxkLCBwcmVmaXh9LCBjb250ZXh0LCBjb250YWluZXJOb2RlKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cDpcbiAgICAgIGluc3RhbmNlID0gY3JlYXRlTm9kZUdyb3VwSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmTm9kZUdyb3VwLCBwcmVmaXh9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGU6XG4gICAgICBpbnN0YW5jZSA9IGNyZWF0ZVJlcGVhdGluZ1NsaWRlSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGUsIHByZWZpeH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBamZOb2RlVHlwZS5BamZTbGlkZTpcbiAgICAgIGluc3RhbmNlID0gY3JlYXRlU2xpZGVJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZTbGlkZSwgcHJlZml4fSk7XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgIGNvbnN0IGhhc1ByZWZpeCA9IHByZWZpeCAhPSBudWxsICYmIHByZWZpeC5sZW5ndGggPiAwO1xuICAgIGlmIChoYXNQcmVmaXgpIHtcbiAgICAgIGNvbnN0IGFuY2VzdG9yc05hbWVzID0gZ2V0QW5jZXN0b3JSZXBlYXRpbmdOb2Rlc05hbWVzKGFsbE5vZGVzLCBub2RlKTtcblxuICAgICAgaWYgKG5vZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG9sZFZpc2liaWxpdHkgPSBub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uO1xuICAgICAgICBjb25zdCBuZXdWaXNpYmlsaXR5ID0gbm9ybWFsaXplRXhwcmVzc2lvbihvbGRWaXNpYmlsaXR5LCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgaW5zdGFuY2UudmlzaWJpbGl0eSA9XG4gICAgICAgICAgbmV3VmlzaWJpbGl0eSAhPT0gb2xkVmlzaWJpbGl0eVxuICAgICAgICAgICAgPyBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbjogbmV3VmlzaWJpbGl0eX0pXG4gICAgICAgICAgICA6IG5vZGUudmlzaWJpbGl0eTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlcyA9XG4gICAgICAgIGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsICYmIGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGggPiAwXG4gICAgICAgICAgPyBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXNcbiAgICAgICAgICA6IFthbHdheXNDb25kaXRpb24oKV07XG4gICAgICBpbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzID0gZ2V0SW5zdGFuY2VDb25kaXRpb25zKFxuICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzLFxuICAgICAgICBhbmNlc3RvcnNOYW1lcyxcbiAgICAgICAgcHJlZml4LFxuICAgICAgKTtcblxuICAgICAgaWYgKGlzTm9kZUdyb3VwSW5zdGFuY2UoaW5zdGFuY2UpIHx8IGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgY29uc3QgZm9ybXVsYVJlcHMgPSBpbnN0YW5jZS5ub2RlLmZvcm11bGFSZXBzO1xuICAgICAgICBpZiAoZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IG9sZEZvcm11bGEgPSBmb3JtdWxhUmVwcy5mb3JtdWxhO1xuICAgICAgICAgIGxldCBuZXdGb3JtdWxhID0gbm9ybWFsaXplRXhwcmVzc2lvbihvbGRGb3JtdWxhLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgICBpbnN0YW5jZS5mb3JtdWxhUmVwcyA9XG4gICAgICAgICAgICBuZXdGb3JtdWxhICE9PSBvbGRGb3JtdWxhID8gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogbmV3Rm9ybXVsYX0pIDogZm9ybXVsYVJlcHM7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICBpZiAoaW5zdGFuY2Uubm9kZS5mb3JtdWxhKSB7XG4gICAgICAgICAgaW5zdGFuY2UuZm9ybXVsYSA9IGdldEluc3RhbmNlRm9ybXVsYShpbnN0YW5jZS5ub2RlLmZvcm11bGEsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGluc3RhbmNlLm5vZGUudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9ucyA9IGdldEluc3RhbmNlVmFsaWRhdGlvbnMoXG4gICAgICAgICAgICBpbnN0YW5jZS5ub2RlLnZhbGlkYXRpb24uY29uZGl0aW9ucyxcbiAgICAgICAgICAgIGFuY2VzdG9yc05hbWVzLFxuICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKG5ld0NvbmRpdGlvbnMgIT09IGluc3RhbmNlLm5vZGUudmFsaWRhdGlvbi5jb25kaXRpb25zKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS52YWxpZGF0aW9uID0gY3JlYXRlVmFsaWRhdGlvbkdyb3VwKGluc3RhbmNlLm5vZGUudmFsaWRhdGlvbik7XG4gICAgICAgICAgICBpbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgPSBuZXdDb25kaXRpb25zO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpbnN0YW5jZS52YWxpZGF0aW9uID0gaW5zdGFuY2Uubm9kZS52YWxpZGF0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpbnN0YW5jZS5ub2RlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IG5ld1dhcm5pbmdzID0gZ2V0SW5zdGFuY2VXYXJuaW5ncyhcbiAgICAgICAgICAgIGluc3RhbmNlLm5vZGUud2FybmluZy5jb25kaXRpb25zLFxuICAgICAgICAgICAgYW5jZXN0b3JzTmFtZXMsXG4gICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAobmV3V2FybmluZ3MgIT09IGluc3RhbmNlLm5vZGUud2FybmluZy5jb25kaXRpb25zKSB7XG4gICAgICAgICAgICBpbnN0YW5jZS53YXJuaW5nID0gY3JlYXRlV2FybmluZ0dyb3VwKGluc3RhbmNlLm5vZGUud2FybmluZyk7XG4gICAgICAgICAgICBpbnN0YW5jZS53YXJuaW5nLmNvbmRpdGlvbnMgPSBuZXdXYXJuaW5ncztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgaW5zdGFuY2Uud2FybmluZyA9IGluc3RhbmNlLm5vZGUud2FybmluZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaW5zdGFuY2Uubm9kZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgIGluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiA9IGdldEluc3RhbmNlQ29uZGl0aW9uKFxuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZS5uZXh0U2xpZGVDb25kaXRpb24sXG4gICAgICAgICAgICBhbmNlc3RvcnNOYW1lcyxcbiAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICAgIGlmIChpbnN0YW5jZS5ub2RlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgaW5zdGFuY2UuY2hvaWNlc0ZpbHRlciA9IGdldEluc3RhbmNlRm9ybXVsYShcbiAgICAgICAgICAgICAgaW5zdGFuY2Uubm9kZS5jaG9pY2VzRmlsdGVyLFxuICAgICAgICAgICAgICBhbmNlc3RvcnNOYW1lcyxcbiAgICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGluc3RhbmNlLm5vZGUudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgaW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgPSBnZXRJbnN0YW5jZUNvbmRpdGlvbnMoXG4gICAgICAgICAgICAgIGluc3RhbmNlLm5vZGUudHJpZ2dlckNvbmRpdGlvbnMsXG4gICAgICAgICAgICAgIGFuY2VzdG9yc05hbWVzLFxuICAgICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZS52aXNpYmlsaXR5ID0gaW5zdGFuY2Uubm9kZS52aXNpYmlsaXR5O1xuICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlcyA9XG4gICAgICAgIGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsICYmIGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGggPiAwXG4gICAgICAgICAgPyBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXNcbiAgICAgICAgICA6IFthbHdheXNDb25kaXRpb24oKV07XG4gICAgICBpbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzID0gY29uZGl0aW9uYWxCcmFuY2hlcztcbiAgICAgIGlmIChpc05vZGVHcm91cEluc3RhbmNlKGluc3RhbmNlKSB8fCBpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnN0IHJnSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2U7XG4gICAgICAgIHJnSW5zdGFuY2UuZm9ybXVsYVJlcHMgPSByZ0luc3RhbmNlLm5vZGUuZm9ybXVsYVJlcHM7XG4gICAgICB9IGVsc2UgaWYgKGlzRmllbGRJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgaW5zdGFuY2UudmFsaWRhdGlvbiA9IGluc3RhbmNlLm5vZGUudmFsaWRhdGlvbjtcbiAgICAgICAgaW5zdGFuY2Uud2FybmluZyA9IGluc3RhbmNlLm5vZGUud2FybmluZztcbiAgICAgICAgaW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uID0gaW5zdGFuY2Uubm9kZS5uZXh0U2xpZGVDb25kaXRpb247XG4gICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgICBpbnN0YW5jZS5jaG9pY2VzRmlsdGVyID0gaW5zdGFuY2Uubm9kZS5jaG9pY2VzRmlsdGVyO1xuICAgICAgICAgIGluc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zID0gaW5zdGFuY2Uubm9kZS50cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBpbnN0YW5jZS5mb3JtdWxhID0gaW5zdGFuY2Uubm9kZS5mb3JtdWxhO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gaW5zdGFuY2U7XG59XG4iXX0=