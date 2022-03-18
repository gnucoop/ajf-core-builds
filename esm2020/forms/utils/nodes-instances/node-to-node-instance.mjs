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
                    instance = componentsMap[field.fieldType].createInstance({ node: node, prefix }, context);
                }
                else {
                    instance = createFieldInstance({ node: node, prefix }, context);
                }
            }
            else {
                switch (field.fieldType) {
                    case AjfFieldType.SingleChoice:
                    case AjfFieldType.MultipleChoice:
                        instance = createFieldWithChoicesInstance({ node: node, prefix }, context);
                        break;
                    case AjfFieldType.Table:
                        instance = createTableFieldInstance({ node: node, prefix }, context);
                        break;
                    default:
                        instance = createFieldInstance({ node: node, prefix }, context);
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
            if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                const ngInstance = instance;
                const formulaReps = ngInstance.node.formulaReps;
                if (formulaReps != null) {
                    const oldFormula = formulaReps.formula;
                    let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
                    ngInstance.formulaReps =
                        newFormula !== oldFormula ? createFormula({ formula: newFormula }) : formulaReps;
                }
            }
            else if (nodeType === AjfNodeType.AjfField) {
                const fInstance = instance;
                const fNode = fInstance.node;
                if (fNode.formula) {
                    fInstance.formula = getInstanceFormula(fNode.formula, ancestorsNames, prefix);
                }
                if (fNode.validation != null) {
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
                    fInstance.nextSlideCondition = getInstanceCondition(fNode.nextSlideCondition, ancestorsNames, prefix);
                }
                if (isFieldWithChoices(fNode)) {
                    const fwcInstance = instance;
                    const fwcNode = fwcInstance.node;
                    if (fwcNode.choicesFilter != null) {
                        fwcInstance.choicesFilter = getInstanceFormula(fwcNode.choicesFilter, ancestorsNames, prefix);
                    }
                    if (fwcNode.triggerConditions != null) {
                        fwcInstance.triggerConditions = getInstanceConditions(fwcNode.triggerConditions, ancestorsNames, prefix);
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
                const fInstance = instance;
                fInstance.validation = fInstance.node.validation;
                fInstance.warning = fInstance.node.warning;
                fInstance.nextSlideCondition = fInstance.node.nextSlideCondition;
                if (isFieldWithChoicesInstance(instance)) {
                    const fwcInstance = instance;
                    fwcInstance.choicesFilter = fwcInstance.node.choicesFilter;
                    fwcInstance.triggerConditions = fwcInstance.node.triggerConditions;
                }
                fInstance.formula = fInstance.node.formula;
            }
        }
    }
    return instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10by1ub2RlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsZUFBZSxFQUNmLGVBQWUsRUFDZixhQUFhLEVBQ2IsbUJBQW1CLEdBQ3BCLE1BQU0sa0JBQWtCLENBQUM7QUFLMUIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBUS9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUk1RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQUMsOEJBQThCLEVBQUMsTUFBTSx3REFBd0QsQ0FBQztBQUN0RyxPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxpREFBaUQsQ0FBQztBQUN6RixPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSxvREFBb0QsQ0FBQztBQUM5RixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFDLHVCQUF1QixFQUFDLE1BQU0sK0NBQStDLENBQUM7QUFDdEYsT0FBTyxFQUFDLDRCQUE0QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFDakcsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sdUNBQXVDLENBQUM7QUFDNUUsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFFbkUsT0FBTyxFQUFDLDhCQUE4QixFQUFD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LEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDNUM7U0FDRjtLQUNGO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ29udGV4dCxcbiAgYWx3YXlzQ29uZGl0aW9uLFxuICBjcmVhdGVDb25kaXRpb24sXG4gIGNyZWF0ZUZvcm11bGEsXG4gIG5vcm1hbGl6ZUV4cHJlc3Npb24sXG59IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGaWVsZH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL3RhYmxlLWZpZWxkJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS1ncm91cCc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zbGlkZXMvcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7QWpmU2xpZGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zbGlkZXMvc2xpZGUnO1xuaW1wb3J0IHtjcmVhdGVGaWVsZEluc3RhbmNlfSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2NyZWF0ZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi4vZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2NyZWF0ZS10YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2NvbXBvbmVudHNNYXB9IGZyb20gJy4uL2ZpZWxkcy9maWVsZHMtbWFwJztcbmltcG9ydCB7aXNGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi9maWVsZHMvaXMtZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7Y3JlYXRlTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4uL25vZGVzLWluc3RhbmNlcy9jcmVhdGUtbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZVJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4uL3NsaWRlcy1pbnN0YW5jZXMvY3JlYXRlLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZVNsaWRlSW5zdGFuY2V9IGZyb20gJy4uL3NsaWRlcy1pbnN0YW5jZXMvY3JlYXRlLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlVmFsaWRhdGlvbkdyb3VwfSBmcm9tICcuLi92YWxpZGF0aW9uL2NyZWF0ZS12YWxpZGF0aW9uLWdyb3VwJztcbmltcG9ydCB7Y3JlYXRlV2FybmluZ0dyb3VwfSBmcm9tICcuLi93YXJuaW5nL2NyZWF0ZS13YXJuaW5nLWdyb3VwJztcblxuaW1wb3J0IHtnZXRBbmNlc3RvclJlcGVhdGluZ05vZGVzTmFtZXN9IGZyb20gJy4vZ2V0LWFuY2VzdG9yLXJlcGVhdGluZy1ub2Rlcy1uYW1lcyc7XG5pbXBvcnQge2dldEluc3RhbmNlQ29uZGl0aW9ufSBmcm9tICcuL2dldC1pbnN0YW5jZS1jb25kaXRpb24nO1xuaW1wb3J0IHtnZXRJbnN0YW5jZUNvbmRpdGlvbnN9IGZyb20gJy4vZ2V0LWluc3RhbmNlLWNvbmRpdGlvbnMnO1xuaW1wb3J0IHtnZXRJbnN0YW5jZUZvcm11bGF9IGZyb20gJy4vZ2V0LWluc3RhbmNlLWZvcm11bGEnO1xuaW1wb3J0IHtnZXRJbnN0YW5jZVZhbGlkYXRpb25zfSBmcm9tICcuL2dldC1pbnN0YW5jZS12YWxpZGF0aW9ucyc7XG5pbXBvcnQge2dldEluc3RhbmNlV2FybmluZ3N9IGZyb20gJy4vZ2V0LWluc3RhbmNlLXdhcm5pbmdzJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuL2lzLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7aXNOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pcy1ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL2lzLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG4vKipcbiAqIEl0IGNyZWF0ZXMgYSBub2RlSW5zdGFuY2UgcmVsYXRpdmUgdG8gYSBub2RlLlxuICogVG8gY3JlYXRlIHRoZSBpbnN0YW5jZSBpdCBjYWxscyByZWxhdGl2ZSBjcmVhdGUgYnVpbGRlciBieSBub2RlVHlwZS5cbiAqIElmIHRoZSBwcmVmaXggaXMg4oCL4oCLZGVmaW5lZCBhbGwgZm9ybXVsYXMgYW5kIGNvbmRpdGlvbnMgYXJlIGNhbGN1bGF0ZWQgYmFzZWQgb24gaXQuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBub2RlVG9Ob2RlSW5zdGFuY2UoXG4gIGFsbE5vZGVzOiBBamZOb2RlW10gfCBBamZOb2RlSW5zdGFuY2VbXSxcbiAgbm9kZTogQWpmTm9kZSxcbiAgcHJlZml4OiBudW1iZXJbXSxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbik6IEFqZk5vZGVJbnN0YW5jZSB8IG51bGwge1xuICBsZXQgaW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSB8IG51bGwgPSBudWxsO1xuICBjb25zdCBub2RlVHlwZSA9IG5vZGUubm9kZVR5cGU7XG4gIHN3aXRjaCAobm9kZVR5cGUpIHtcbiAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZkZpZWxkOlxuICAgICAgY29uc3QgZmllbGQgPSBub2RlIGFzIEFqZkZpZWxkO1xuICAgICAgaWYgKGZpZWxkLmZpZWxkVHlwZSA+IDEwMCkge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgY29tcG9uZW50c01hcFtmaWVsZC5maWVsZFR5cGVdICE9IG51bGwgJiZcbiAgICAgICAgICBjb21wb25lbnRzTWFwW2ZpZWxkLmZpZWxkVHlwZV0uY3JlYXRlSW5zdGFuY2UgIT0gbnVsbFxuICAgICAgICApIHtcbiAgICAgICAgICBpbnN0YW5jZSA9IGNvbXBvbmVudHNNYXBbZmllbGQuZmllbGRUeXBlXS5jcmVhdGVJbnN0YW5jZSEoXG4gICAgICAgICAgICB7bm9kZTogbm9kZSBhcyBBamZGaWVsZCwgcHJlZml4fSxcbiAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnN0YW5jZSA9IGNyZWF0ZUZpZWxkSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmRmllbGQsIHByZWZpeH0sIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKGZpZWxkLmZpZWxkVHlwZSkge1xuICAgICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZTpcbiAgICAgICAgICAgIGluc3RhbmNlID0gY3JlYXRlRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKFxuICAgICAgICAgICAgICB7bm9kZTogbm9kZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4sIHByZWZpeH0sXG4gICAgICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGFibGU6XG4gICAgICAgICAgICBpbnN0YW5jZSA9IGNyZWF0ZVRhYmxlRmllbGRJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZUYWJsZUZpZWxkLCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpbnN0YW5jZSA9IGNyZWF0ZUZpZWxkSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmRmllbGQsIHByZWZpeH0sIGNvbnRleHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwOlxuICAgICAgaW5zdGFuY2UgPSBjcmVhdGVOb2RlR3JvdXBJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZOb2RlR3JvdXAsIHByZWZpeH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZTpcbiAgICAgIGluc3RhbmNlID0gY3JlYXRlUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZSZXBlYXRpbmdTbGlkZSwgcHJlZml4fSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZlNsaWRlOlxuICAgICAgaW5zdGFuY2UgPSBjcmVhdGVTbGlkZUluc3RhbmNlKHtub2RlOiBub2RlIGFzIEFqZlNsaWRlLCBwcmVmaXh9KTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGlmIChpbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgY29uc3QgaGFzUHJlZml4ID0gcHJlZml4ICE9IG51bGwgJiYgcHJlZml4Lmxlbmd0aCA+IDA7XG4gICAgaWYgKGhhc1ByZWZpeCkge1xuICAgICAgY29uc3QgYW5jZXN0b3JzTmFtZXMgPSBnZXRBbmNlc3RvclJlcGVhdGluZ05vZGVzTmFtZXMoYWxsTm9kZXMsIG5vZGUpO1xuXG4gICAgICBpZiAobm9kZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgICAgY29uc3Qgb2xkVmlzaWJpbGl0eSA9IG5vZGUudmlzaWJpbGl0eS5jb25kaXRpb247XG4gICAgICAgIGNvbnN0IG5ld1Zpc2liaWxpdHkgPSBub3JtYWxpemVFeHByZXNzaW9uKG9sZFZpc2liaWxpdHksIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICBpbnN0YW5jZS52aXNpYmlsaXR5ID1cbiAgICAgICAgICBuZXdWaXNpYmlsaXR5ICE9PSBvbGRWaXNpYmlsaXR5XG4gICAgICAgICAgICA/IGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBuZXdWaXNpYmlsaXR5fSlcbiAgICAgICAgICAgIDogbm9kZS52aXNpYmlsaXR5O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25kaXRpb25hbEJyYW5jaGVzID1cbiAgICAgICAgaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzICE9IG51bGwgJiYgaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlc1xuICAgICAgICAgIDogW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgIGluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMgPSBnZXRJbnN0YW5jZUNvbmRpdGlvbnMoXG4gICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXMsXG4gICAgICAgIGFuY2VzdG9yc05hbWVzLFxuICAgICAgICBwcmVmaXgsXG4gICAgICApO1xuXG4gICAgICBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgY29uc3QgbmdJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgY29uc3QgZm9ybXVsYVJlcHMgPSBuZ0luc3RhbmNlLm5vZGUuZm9ybXVsYVJlcHM7XG4gICAgICAgIGlmIChmb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3Qgb2xkRm9ybXVsYSA9IGZvcm11bGFSZXBzLmZvcm11bGE7XG4gICAgICAgICAgbGV0IG5ld0Zvcm11bGEgPSBub3JtYWxpemVFeHByZXNzaW9uKG9sZEZvcm11bGEsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICAgIG5nSW5zdGFuY2UuZm9ybXVsYVJlcHMgPVxuICAgICAgICAgICAgbmV3Rm9ybXVsYSAhPT0gb2xkRm9ybXVsYSA/IGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IG5ld0Zvcm11bGF9KSA6IGZvcm11bGFSZXBzO1xuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZGaWVsZCkge1xuICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICBjb25zdCBmTm9kZSA9IGZJbnN0YW5jZS5ub2RlO1xuXG4gICAgICAgIGlmIChmTm9kZS5mb3JtdWxhKSB7XG4gICAgICAgICAgZkluc3RhbmNlLmZvcm11bGEgPSBnZXRJbnN0YW5jZUZvcm11bGEoZk5vZGUuZm9ybXVsYSwgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZk5vZGUudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgbmV3Q29uZGl0aW9ucyA9IGdldEluc3RhbmNlVmFsaWRhdGlvbnMoXG4gICAgICAgICAgICBmTm9kZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMsXG4gICAgICAgICAgICBhbmNlc3RvcnNOYW1lcyxcbiAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChuZXdDb25kaXRpb25zICE9PSBmTm9kZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMpIHtcbiAgICAgICAgICAgIGZJbnN0YW5jZS52YWxpZGF0aW9uID0gY3JlYXRlVmFsaWRhdGlvbkdyb3VwKGZOb2RlLnZhbGlkYXRpb24pO1xuICAgICAgICAgICAgZkluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyA9IG5ld0NvbmRpdGlvbnM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZJbnN0YW5jZS52YWxpZGF0aW9uID0gZk5vZGUudmFsaWRhdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZk5vZGUud2FybmluZyAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgbmV3V2FybmluZ3MgPSBnZXRJbnN0YW5jZVdhcm5pbmdzKGZOb2RlLndhcm5pbmcuY29uZGl0aW9ucywgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgICAgaWYgKG5ld1dhcm5pbmdzICE9PSBmTm9kZS53YXJuaW5nLmNvbmRpdGlvbnMpIHtcbiAgICAgICAgICAgIGZJbnN0YW5jZS53YXJuaW5nID0gY3JlYXRlV2FybmluZ0dyb3VwKGZOb2RlLndhcm5pbmcpO1xuICAgICAgICAgICAgZkluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucyA9IG5ld1dhcm5pbmdzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZyA9IGZOb2RlLndhcm5pbmc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZOb2RlLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgZkluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiA9IGdldEluc3RhbmNlQ29uZGl0aW9uKFxuICAgICAgICAgICAgZk5vZGUubmV4dFNsaWRlQ29uZGl0aW9uLFxuICAgICAgICAgICAgYW5jZXN0b3JzTmFtZXMsXG4gICAgICAgICAgICBwcmVmaXgsXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZk5vZGUpKSB7XG4gICAgICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PjtcbiAgICAgICAgICBjb25zdCBmd2NOb2RlID0gZndjSW5zdGFuY2Uubm9kZTtcbiAgICAgICAgICBpZiAoZndjTm9kZS5jaG9pY2VzRmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIgPSBnZXRJbnN0YW5jZUZvcm11bGEoXG4gICAgICAgICAgICAgIGZ3Y05vZGUuY2hvaWNlc0ZpbHRlcixcbiAgICAgICAgICAgICAgYW5jZXN0b3JzTmFtZXMsXG4gICAgICAgICAgICAgIHByZWZpeCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmd2NOb2RlLnRyaWdnZXJDb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zID0gZ2V0SW5zdGFuY2VDb25kaXRpb25zKFxuICAgICAgICAgICAgICBmd2NOb2RlLnRyaWdnZXJDb25kaXRpb25zLFxuICAgICAgICAgICAgICBhbmNlc3RvcnNOYW1lcyxcbiAgICAgICAgICAgICAgcHJlZml4LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFuY2UudmlzaWJpbGl0eSA9IGluc3RhbmNlLm5vZGUudmlzaWJpbGl0eTtcbiAgICAgIGNvbnN0IGNvbmRpdGlvbmFsQnJhbmNoZXMgPVxuICAgICAgICBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCAmJiBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoID4gMFxuICAgICAgICAgID8gaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzXG4gICAgICAgICAgOiBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICAgICAgaW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcyA9IGNvbmRpdGlvbmFsQnJhbmNoZXM7XG4gICAgICBpZiAoaXNOb2RlR3JvdXBJbnN0YW5jZShpbnN0YW5jZSkgfHwgaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICBjb25zdCByZ0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlO1xuICAgICAgICByZ0luc3RhbmNlLmZvcm11bGFSZXBzID0gcmdJbnN0YW5jZS5ub2RlLmZvcm11bGFSZXBzO1xuICAgICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgIGZJbnN0YW5jZS52YWxpZGF0aW9uID0gZkluc3RhbmNlLm5vZGUudmFsaWRhdGlvbjtcbiAgICAgICAgZkluc3RhbmNlLndhcm5pbmcgPSBmSW5zdGFuY2Uubm9kZS53YXJuaW5nO1xuICAgICAgICBmSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uID0gZkluc3RhbmNlLm5vZGUubmV4dFNsaWRlQ29uZGl0aW9uO1xuICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PjtcbiAgICAgICAgICBmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyID0gZndjSW5zdGFuY2Uubm9kZS5jaG9pY2VzRmlsdGVyO1xuICAgICAgICAgIGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zID0gZndjSW5zdGFuY2Uubm9kZS50cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBmSW5zdGFuY2UuZm9ybXVsYSA9IGZJbnN0YW5jZS5ub2RlLmZvcm11bGE7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBpbnN0YW5jZTtcbn1cbiJdfQ==