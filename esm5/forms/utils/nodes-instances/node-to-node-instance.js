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
import { alwaysCondition, createCondition, createFormula, normalizeExpression } from '@ajf/core/models';
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
export function nodeToNodeInstance(allNodes, node, prefix, context) {
    var instance = null;
    var nodeType = node.nodeType;
    switch (nodeType) {
        case AjfNodeType.AjfField:
            var field = node;
            if (field.fieldType > 100) {
                if (componentsMap[field.fieldType] != null &&
                    componentsMap[field.fieldType].createInstance != null) {
                    instance = componentsMap[field.fieldType].createInstance({ node: node, prefix: prefix }, context);
                }
                else {
                    instance = createFieldInstance({ node: node, prefix: prefix }, context);
                }
            }
            else {
                switch (field.fieldType) {
                    case AjfFieldType.SingleChoice:
                    case AjfFieldType.MultipleChoice:
                        instance = createFieldWithChoicesInstance({ node: node, prefix: prefix }, context);
                        break;
                    case AjfFieldType.Table:
                        instance = createTableFieldInstance({ node: node, prefix: prefix }, context);
                        break;
                    default:
                        instance = createFieldInstance({ node: node, prefix: prefix }, context);
                        break;
                }
            }
            break;
        case AjfNodeType.AjfNodeGroup:
            instance = createNodeGroupInstance({ node: node, prefix: prefix });
            break;
        case AjfNodeType.AjfRepeatingSlide:
            instance = createRepeatingSlideInstance({ node: node, prefix: prefix });
            break;
        case AjfNodeType.AjfSlide:
            instance = createSlideInstance({ node: node, prefix: prefix });
            break;
    }
    if (instance != null) {
        var hasPrefix = prefix != null && prefix.length > 0;
        if (hasPrefix) {
            var ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);
            if (node.visibility != null) {
                var oldVisibility = node.visibility.condition;
                var newVisibility = normalizeExpression(oldVisibility, ancestorsNames, prefix);
                instance.visibility = newVisibility !== oldVisibility ?
                    createCondition({ condition: newVisibility }) :
                    node.visibility;
            }
            var conditionalBranches = instance.node.conditionalBranches != null &&
                instance.node.conditionalBranches.length > 0 ?
                instance.node.conditionalBranches :
                [alwaysCondition()];
            instance.conditionalBranches =
                getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
            if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                var ngInstance = instance;
                var formulaReps = ngInstance.node.formulaReps;
                if (formulaReps != null) {
                    var oldFormula = formulaReps.formula;
                    var newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
                    ngInstance.formulaReps =
                        newFormula !== oldFormula ? createFormula({ formula: newFormula }) : formulaReps;
                }
            }
            else if (nodeType === AjfNodeType.AjfField) {
                var fInstance = instance;
                var fNode = fInstance.node;
                if (fNode.formula) {
                    fInstance.formula = getInstanceFormula(fNode.formula, ancestorsNames, prefix);
                }
                if (fNode.validation != null) {
                    var newConditions = getInstanceValidations(fNode.validation.conditions, ancestorsNames, prefix);
                    if (newConditions !== fNode.validation.conditions) {
                        fInstance.validation = createValidationGroup(fNode.validation);
                        fInstance.validation.conditions = newConditions;
                    }
                    else {
                        fInstance.validation = fNode.validation;
                    }
                }
                if (fNode.warning != null) {
                    var newWarnings = getInstanceWarnings(fNode.warning.conditions, ancestorsNames, prefix);
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
                    var fwcInstance = instance;
                    var fwcNode = fwcInstance.node;
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
            var conditionalBranches = instance.node.conditionalBranches != null &&
                instance.node.conditionalBranches.length > 0 ?
                instance.node.conditionalBranches :
                [alwaysCondition()];
            instance.conditionalBranches = conditionalBranches;
            if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                var rgInstance = instance;
                rgInstance.formulaReps = rgInstance.node.formulaReps;
            }
            else if (isFieldInstance(instance)) {
                var fInstance = instance;
                fInstance.validation = fInstance.node.validation;
                fInstance.warning = fInstance.node.warning;
                fInstance.nextSlideCondition = fInstance.node.nextSlideCondition;
                if (isFieldWithChoicesInstance(instance)) {
                    var fwcInstance = instance;
                    fwcInstance.choicesFilter = fwcInstance.node.choicesFilter;
                    fwcInstance.triggerConditions = fwcInstance.node.triggerConditions;
                }
                fInstance.formula = fInstance.node.formula;
            }
        }
    }
    return instance;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10by1ub2RlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsZUFBZSxFQUNmLGVBQWUsRUFDZixhQUFhLEVBQ2IsbUJBQW1CLEVBQ3BCLE1BQU0sa0JBQWtCLENBQUM7QUFPMUIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBVS9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUk1RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQ0wsOEJBQThCLEVBQy9CLE1BQU0sd0RBQXdELENBQUM7QUFDaEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDekYsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDOUYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FLE9BQU8sRUFBQyw4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aUJBQWlCLENBQUM7aUJBQ3BFO2dCQUNELFNBQVMsQ0FBQyxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7YUFDNUM7U0FDRjtLQUNGO0lBQ0QsT0FBTyxRQUFRLENBQUM7QUFDbEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ29udGV4dCxcbiAgYWx3YXlzQ29uZGl0aW9uLFxuICBjcmVhdGVDb25kaXRpb24sXG4gIGNyZWF0ZUZvcm11bGEsXG4gIG5vcm1hbGl6ZUV4cHJlc3Npb25cbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlXG59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvdGFibGUtZmllbGQnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlXG59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXB9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLWdyb3VwJztcbmltcG9ydCB7QWpmTm9kZVR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3NsaWRlcy9yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtBamZTbGlkZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3NsaWRlcy9zbGlkZSc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4uL2ZpZWxkcy1pbnN0YW5jZXMvY3JlYXRlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7XG4gIGNyZWF0ZUZpZWxkV2l0aENob2ljZXNJbnN0YW5jZVxufSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2NyZWF0ZS1maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtjcmVhdGVUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4uL2ZpZWxkcy1pbnN0YW5jZXMvY3JlYXRlLXRhYmxlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7aXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2V9IGZyb20gJy4uL2ZpZWxkcy1pbnN0YW5jZXMvaXMtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7Y29tcG9uZW50c01hcH0gZnJvbSAnLi4vZmllbGRzL2ZpZWxkcy1tYXAnO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4uL2ZpZWxkcy9pcy1maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtjcmVhdGVOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL2NyZWF0ZS1ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi4vc2xpZGVzLWluc3RhbmNlcy9jcmVhdGUtcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi4vc2xpZGVzLWluc3RhbmNlcy9jcmVhdGUtc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtjcmVhdGVWYWxpZGF0aW9uR3JvdXB9IGZyb20gJy4uL3ZhbGlkYXRpb24vY3JlYXRlLXZhbGlkYXRpb24tZ3JvdXAnO1xuaW1wb3J0IHtjcmVhdGVXYXJuaW5nR3JvdXB9IGZyb20gJy4uL3dhcm5pbmcvY3JlYXRlLXdhcm5pbmctZ3JvdXAnO1xuXG5pbXBvcnQge2dldEFuY2VzdG9yUmVwZWF0aW5nTm9kZXNOYW1lc30gZnJvbSAnLi9nZXQtYW5jZXN0b3ItcmVwZWF0aW5nLW5vZGVzLW5hbWVzJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VDb25kaXRpb259IGZyb20gJy4vZ2V0LWluc3RhbmNlLWNvbmRpdGlvbic7XG5pbXBvcnQge2dldEluc3RhbmNlQ29uZGl0aW9uc30gZnJvbSAnLi9nZXQtaW5zdGFuY2UtY29uZGl0aW9ucyc7XG5pbXBvcnQge2dldEluc3RhbmNlRm9ybXVsYX0gZnJvbSAnLi9nZXQtaW5zdGFuY2UtZm9ybXVsYSc7XG5pbXBvcnQge2dldEluc3RhbmNlVmFsaWRhdGlvbnN9IGZyb20gJy4vZ2V0LWluc3RhbmNlLXZhbGlkYXRpb25zJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VXYXJuaW5nc30gZnJvbSAnLi9nZXQtaW5zdGFuY2Utd2FybmluZ3MnO1xuaW1wb3J0IHtpc0ZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaXMtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc05vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL2lzLW5vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaXMtcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIG5vZGVUb05vZGVJbnN0YW5jZShcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlLCBwcmVmaXg6IG51bWJlcltdLFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQpOiBBamZOb2RlSW5zdGFuY2V8bnVsbCB7XG4gIGxldCBpbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlfG51bGwgPSBudWxsO1xuICBjb25zdCBub2RlVHlwZSA9IG5vZGUubm9kZVR5cGU7XG4gIHN3aXRjaCAobm9kZVR5cGUpIHtcbiAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZkZpZWxkOlxuICAgICAgY29uc3QgZmllbGQgPSBub2RlIGFzIEFqZkZpZWxkO1xuICAgICAgaWYgKGZpZWxkLmZpZWxkVHlwZSA+IDEwMCkge1xuICAgICAgICBpZiAoY29tcG9uZW50c01hcFtmaWVsZC5maWVsZFR5cGVdICE9IG51bGwgJiZcbiAgICAgICAgICAgIGNvbXBvbmVudHNNYXBbZmllbGQuZmllbGRUeXBlXS5jcmVhdGVJbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2UgPSBjb21wb25lbnRzTWFwW2ZpZWxkLmZpZWxkVHlwZV0uY3JlYXRlSW5zdGFuY2UhXG4gICAgICAgICAgICAgICAgICAgICAoe25vZGU6IG5vZGUgYXMgQWpmRmllbGQsIHByZWZpeH0sIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGluc3RhbmNlID0gY3JlYXRlRmllbGRJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZGaWVsZCwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN3aXRjaCAoZmllbGQuZmllbGRUeXBlKSB7XG4gICAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuU2luZ2xlQ2hvaWNlOlxuICAgICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoXG4gICAgICAgICAgICAgICAge25vZGU6IG5vZGUgYXMgQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+LCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlRhYmxlOlxuICAgICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVUYWJsZUZpZWxkSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmVGFibGVGaWVsZCwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVGaWVsZEluc3RhbmNlKHtub2RlOiBub2RlIGFzIEFqZkZpZWxkLCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cDpcbiAgICAgIGluc3RhbmNlID0gY3JlYXRlTm9kZUdyb3VwSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmTm9kZUdyb3VwLCBwcmVmaXh9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGU6XG4gICAgICBpbnN0YW5jZSA9IGNyZWF0ZVJlcGVhdGluZ1NsaWRlSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGUsIHByZWZpeH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBamZOb2RlVHlwZS5BamZTbGlkZTpcbiAgICAgIGluc3RhbmNlID0gY3JlYXRlU2xpZGVJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZTbGlkZSwgcHJlZml4fSk7XG4gICAgICBicmVhaztcbiAgfVxuICBpZiAoaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgIGNvbnN0IGhhc1ByZWZpeCA9IHByZWZpeCAhPSBudWxsICYmIHByZWZpeC5sZW5ndGggPiAwO1xuICAgIGlmIChoYXNQcmVmaXgpIHtcbiAgICAgIGNvbnN0IGFuY2VzdG9yc05hbWVzID0gZ2V0QW5jZXN0b3JSZXBlYXRpbmdOb2Rlc05hbWVzKGFsbE5vZGVzLCBub2RlKTtcblxuICAgICAgaWYgKG5vZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IG9sZFZpc2liaWxpdHkgPSBub2RlLnZpc2liaWxpdHkuY29uZGl0aW9uO1xuICAgICAgICBjb25zdCBuZXdWaXNpYmlsaXR5ID0gbm9ybWFsaXplRXhwcmVzc2lvbihvbGRWaXNpYmlsaXR5LCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgaW5zdGFuY2UudmlzaWJpbGl0eSA9IG5ld1Zpc2liaWxpdHkgIT09IG9sZFZpc2liaWxpdHkgP1xuICAgICAgICAgICAgY3JlYXRlQ29uZGl0aW9uKHtjb25kaXRpb246IG5ld1Zpc2liaWxpdHl9KSA6XG4gICAgICAgICAgICBub2RlLnZpc2liaWxpdHk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbmRpdGlvbmFsQnJhbmNoZXMgPSBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoID4gMCA/XG4gICAgICAgICAgaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzIDpcbiAgICAgICAgICBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICAgICAgaW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcyA9XG4gICAgICAgICAgZ2V0SW5zdGFuY2VDb25kaXRpb25zKGNvbmRpdGlvbmFsQnJhbmNoZXMsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuXG4gICAgICBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgY29uc3QgbmdJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgY29uc3QgZm9ybXVsYVJlcHMgPSBuZ0luc3RhbmNlLm5vZGUuZm9ybXVsYVJlcHM7XG4gICAgICAgIGlmIChmb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3Qgb2xkRm9ybXVsYSA9IGZvcm11bGFSZXBzLmZvcm11bGE7XG4gICAgICAgICAgbGV0IG5ld0Zvcm11bGEgPSBub3JtYWxpemVFeHByZXNzaW9uKG9sZEZvcm11bGEsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICAgIG5nSW5zdGFuY2UuZm9ybXVsYVJlcHMgPVxuICAgICAgICAgICAgICBuZXdGb3JtdWxhICE9PSBvbGRGb3JtdWxhID8gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogbmV3Rm9ybXVsYX0pIDogZm9ybXVsYVJlcHM7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZkZpZWxkKSB7XG4gICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgIGNvbnN0IGZOb2RlID0gZkluc3RhbmNlLm5vZGU7XG5cbiAgICAgICAgaWYgKGZOb2RlLmZvcm11bGEpIHtcbiAgICAgICAgICBmSW5zdGFuY2UuZm9ybXVsYSA9IGdldEluc3RhbmNlRm9ybXVsYShmTm9kZS5mb3JtdWxhLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmTm9kZS52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBuZXdDb25kaXRpb25zID1cbiAgICAgICAgICAgICAgZ2V0SW5zdGFuY2VWYWxpZGF0aW9ucyhmTm9kZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICAgIGlmIChuZXdDb25kaXRpb25zICE9PSBmTm9kZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMpIHtcbiAgICAgICAgICAgIGZJbnN0YW5jZS52YWxpZGF0aW9uID0gY3JlYXRlVmFsaWRhdGlvbkdyb3VwKGZOb2RlLnZhbGlkYXRpb24pO1xuICAgICAgICAgICAgZkluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyA9IG5ld0NvbmRpdGlvbnM7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZJbnN0YW5jZS52YWxpZGF0aW9uID0gZk5vZGUudmFsaWRhdGlvbjtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZk5vZGUud2FybmluZyAhPSBudWxsKSB7XG4gICAgICAgICAgY29uc3QgbmV3V2FybmluZ3MgPSBnZXRJbnN0YW5jZVdhcm5pbmdzKGZOb2RlLndhcm5pbmcuY29uZGl0aW9ucywgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgICAgaWYgKG5ld1dhcm5pbmdzICE9PSBmTm9kZS53YXJuaW5nLmNvbmRpdGlvbnMpIHtcbiAgICAgICAgICAgIGZJbnN0YW5jZS53YXJuaW5nID0gY3JlYXRlV2FybmluZ0dyb3VwKGZOb2RlLndhcm5pbmcpO1xuICAgICAgICAgICAgZkluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucyA9IG5ld1dhcm5pbmdzO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZyA9IGZOb2RlLndhcm5pbmc7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZOb2RlLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsKSB7XG4gICAgICAgICAgZkluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiA9XG4gICAgICAgICAgICAgIGdldEluc3RhbmNlQ29uZGl0aW9uKGZOb2RlLm5leHRTbGlkZUNvbmRpdGlvbiwgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKGZOb2RlKSkge1xuICAgICAgICAgIGNvbnN0IGZ3Y0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT47XG4gICAgICAgICAgY29uc3QgZndjTm9kZSA9IGZ3Y0luc3RhbmNlLm5vZGU7XG4gICAgICAgICAgaWYgKGZ3Y05vZGUuY2hvaWNlc0ZpbHRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICBmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyID1cbiAgICAgICAgICAgICAgICBnZXRJbnN0YW5jZUZvcm11bGEoZndjTm9kZS5jaG9pY2VzRmlsdGVyLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZ3Y05vZGUudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgICAgZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgPVxuICAgICAgICAgICAgICAgIGdldEluc3RhbmNlQ29uZGl0aW9ucyhmd2NOb2RlLnRyaWdnZXJDb25kaXRpb25zLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaW5zdGFuY2UudmlzaWJpbGl0eSA9IGluc3RhbmNlLm5vZGUudmlzaWJpbGl0eTtcbiAgICAgIGNvbnN0IGNvbmRpdGlvbmFsQnJhbmNoZXMgPSBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMubGVuZ3RoID4gMCA/XG4gICAgICAgICAgaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzIDpcbiAgICAgICAgICBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICAgICAgaW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcyA9IGNvbmRpdGlvbmFsQnJhbmNoZXM7XG4gICAgICBpZiAoaXNOb2RlR3JvdXBJbnN0YW5jZShpbnN0YW5jZSkgfHwgaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICBjb25zdCByZ0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlO1xuICAgICAgICByZ0luc3RhbmNlLmZvcm11bGFSZXBzID0gcmdJbnN0YW5jZS5ub2RlLmZvcm11bGFSZXBzO1xuICAgICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgIGZJbnN0YW5jZS52YWxpZGF0aW9uID0gZkluc3RhbmNlLm5vZGUudmFsaWRhdGlvbjtcbiAgICAgICAgZkluc3RhbmNlLndhcm5pbmcgPSBmSW5zdGFuY2Uubm9kZS53YXJuaW5nO1xuICAgICAgICBmSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uID0gZkluc3RhbmNlLm5vZGUubmV4dFNsaWRlQ29uZGl0aW9uO1xuICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PjtcbiAgICAgICAgICBmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyID0gZndjSW5zdGFuY2Uubm9kZS5jaG9pY2VzRmlsdGVyO1xuICAgICAgICAgIGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zID0gZndjSW5zdGFuY2Uubm9kZS50cmlnZ2VyQ29uZGl0aW9ucztcbiAgICAgICAgfVxuICAgICAgICBmSW5zdGFuY2UuZm9ybXVsYSA9IGZJbnN0YW5jZS5ub2RlLmZvcm11bGE7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIHJldHVybiBpbnN0YW5jZTtcbn1cbiJdfQ==