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
                instance.visibility = newVisibility !== oldVisibility ?
                    createCondition({ condition: newVisibility }) :
                    node.visibility;
            }
            const conditionalBranches = instance.node.conditionalBranches != null &&
                instance.node.conditionalBranches.length > 0 ?
                instance.node.conditionalBranches :
                [alwaysCondition()];
            instance.conditionalBranches =
                getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
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
                    fInstance.nextSlideCondition =
                        getInstanceCondition(fNode.nextSlideCondition, ancestorsNames, prefix);
                }
                if (isFieldWithChoices(fNode)) {
                    const fwcInstance = instance;
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
            const conditionalBranches = instance.node.conditionalBranches != null &&
                instance.node.conditionalBranches.length > 0 ?
                instance.node.conditionalBranches :
                [alwaysCondition()];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10by1ub2RlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsZUFBZSxFQUNmLGVBQWUsRUFDZixhQUFhLEVBQ2IsbUJBQW1CLEVBQ3BCLE1BQU0sa0JBQWtCLENBQUM7QUFPMUIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBVS9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUk1RCxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUM5RSxPQUFPLEVBQ0wsOEJBQThCLEVBQy9CLE1BQU0sd0RBQXdELENBQUM7QUFDaEUsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0saURBQWlELENBQUM7QUFDekYsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0sb0RBQW9ELENBQUM7QUFDOUYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHNCQUFzQixDQUFDO0FBQ25ELE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxN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QUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUM1QztTQUNGO0tBQ0Y7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZDb250ZXh0LFxuICBhbHdheXNDb25kaXRpb24sXG4gIGNyZWF0ZUNvbmRpdGlvbixcbiAgY3JlYXRlRm9ybXVsYSxcbiAgbm9ybWFsaXplRXhwcmVzc2lvblxufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Vcbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZk5vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Vcbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctY29udGFpbmVyLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtZ3JvdXAnO1xuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtdHlwZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzL3JlcGVhdGluZy1zbGlkZSc7XG5pbXBvcnQge0FqZlNsaWRlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzL3NsaWRlJztcbmltcG9ydCB7Y3JlYXRlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgY3JlYXRlRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlXG59IGZyb20gJy4uL2ZpZWxkcy1pbnN0YW5jZXMvY3JlYXRlLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZVRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi4vZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi4vZmllbGRzLWluc3RhbmNlcy9pcy1maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtjb21wb25lbnRzTWFwfSBmcm9tICcuLi9maWVsZHMvZmllbGRzLW1hcCc7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi4vZmllbGRzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2NyZWF0ZU5vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvY3JlYXRlLW5vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtjcmVhdGVSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuLi9zbGlkZXMtaW5zdGFuY2VzL2NyZWF0ZS1yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtjcmVhdGVTbGlkZUluc3RhbmNlfSBmcm9tICcuLi9zbGlkZXMtaW5zdGFuY2VzL2NyZWF0ZS1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZVZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi4vdmFsaWRhdGlvbi9jcmVhdGUtdmFsaWRhdGlvbi1ncm91cCc7XG5pbXBvcnQge2NyZWF0ZVdhcm5pbmdHcm91cH0gZnJvbSAnLi4vd2FybmluZy9jcmVhdGUtd2FybmluZy1ncm91cCc7XG5cbmltcG9ydCB7Z2V0QW5jZXN0b3JSZXBlYXRpbmdOb2Rlc05hbWVzfSBmcm9tICcuL2dldC1hbmNlc3Rvci1yZXBlYXRpbmctbm9kZXMtbmFtZXMnO1xuaW1wb3J0IHtnZXRJbnN0YW5jZUNvbmRpdGlvbn0gZnJvbSAnLi9nZXQtaW5zdGFuY2UtY29uZGl0aW9uJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VDb25kaXRpb25zfSBmcm9tICcuL2dldC1pbnN0YW5jZS1jb25kaXRpb25zJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VGb3JtdWxhfSBmcm9tICcuL2dldC1pbnN0YW5jZS1mb3JtdWxhJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VWYWxpZGF0aW9uc30gZnJvbSAnLi9nZXQtaW5zdGFuY2UtdmFsaWRhdGlvbnMnO1xuaW1wb3J0IHtnZXRJbnN0YW5jZVdhcm5pbmdzfSBmcm9tICcuL2dldC1pbnN0YW5jZS13YXJuaW5ncyc7XG5pbXBvcnQge2lzRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaXMtbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pcy1yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9kZVRvTm9kZUluc3RhbmNlKFxuICAgIGFsbE5vZGVzOiBBamZOb2RlW118QWpmTm9kZUluc3RhbmNlW10sIG5vZGU6IEFqZk5vZGUsIHByZWZpeDogbnVtYmVyW10sXG4gICAgY29udGV4dDogQWpmQ29udGV4dCk6IEFqZk5vZGVJbnN0YW5jZXxudWxsIHtcbiAgbGV0IGluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2V8bnVsbCA9IG51bGw7XG4gIGNvbnN0IG5vZGVUeXBlID0gbm9kZS5ub2RlVHlwZTtcbiAgc3dpdGNoIChub2RlVHlwZSkge1xuICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmRmllbGQ6XG4gICAgICBjb25zdCBmaWVsZCA9IG5vZGUgYXMgQWpmRmllbGQ7XG4gICAgICBpZiAoZmllbGQuZmllbGRUeXBlID4gMTAwKSB7XG4gICAgICAgIGlmIChjb21wb25lbnRzTWFwW2ZpZWxkLmZpZWxkVHlwZV0gIT0gbnVsbCAmJlxuICAgICAgICAgICAgY29tcG9uZW50c01hcFtmaWVsZC5maWVsZFR5cGVdLmNyZWF0ZUluc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICBpbnN0YW5jZSA9IGNvbXBvbmVudHNNYXBbZmllbGQuZmllbGRUeXBlXS5jcmVhdGVJbnN0YW5jZSFcbiAgICAgICAgICAgICAgICAgICAgICh7bm9kZTogbm9kZSBhcyBBamZGaWVsZCwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaW5zdGFuY2UgPSBjcmVhdGVGaWVsZEluc3RhbmNlKHtub2RlOiBub2RlIGFzIEFqZkZpZWxkLCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc3dpdGNoIChmaWVsZC5maWVsZFR5cGUpIHtcbiAgICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICAgICAgICBpbnN0YW5jZSA9IGNyZWF0ZUZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShcbiAgICAgICAgICAgICAgICB7bm9kZTogbm9kZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4sIHByZWZpeH0sIGNvbnRleHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuVGFibGU6XG4gICAgICAgICAgICBpbnN0YW5jZSA9IGNyZWF0ZVRhYmxlRmllbGRJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZUYWJsZUZpZWxkLCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICBpbnN0YW5jZSA9IGNyZWF0ZUZpZWxkSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmRmllbGQsIHByZWZpeH0sIGNvbnRleHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwOlxuICAgICAgaW5zdGFuY2UgPSBjcmVhdGVOb2RlR3JvdXBJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZOb2RlR3JvdXAsIHByZWZpeH0pO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZTpcbiAgICAgIGluc3RhbmNlID0gY3JlYXRlUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZSZXBlYXRpbmdTbGlkZSwgcHJlZml4fSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZlNsaWRlOlxuICAgICAgaW5zdGFuY2UgPSBjcmVhdGVTbGlkZUluc3RhbmNlKHtub2RlOiBub2RlIGFzIEFqZlNsaWRlLCBwcmVmaXh9KTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIGlmIChpbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgY29uc3QgaGFzUHJlZml4ID0gcHJlZml4ICE9IG51bGwgJiYgcHJlZml4Lmxlbmd0aCA+IDA7XG4gICAgaWYgKGhhc1ByZWZpeCkge1xuICAgICAgY29uc3QgYW5jZXN0b3JzTmFtZXMgPSBnZXRBbmNlc3RvclJlcGVhdGluZ05vZGVzTmFtZXMoYWxsTm9kZXMsIG5vZGUpO1xuXG4gICAgICBpZiAobm9kZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgICAgY29uc3Qgb2xkVmlzaWJpbGl0eSA9IG5vZGUudmlzaWJpbGl0eS5jb25kaXRpb247XG4gICAgICAgIGNvbnN0IG5ld1Zpc2liaWxpdHkgPSBub3JtYWxpemVFeHByZXNzaW9uKG9sZFZpc2liaWxpdHksIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICBpbnN0YW5jZS52aXNpYmlsaXR5ID0gbmV3VmlzaWJpbGl0eSAhPT0gb2xkVmlzaWJpbGl0eSA/XG4gICAgICAgICAgICBjcmVhdGVDb25kaXRpb24oe2NvbmRpdGlvbjogbmV3VmlzaWJpbGl0eX0pIDpcbiAgICAgICAgICAgIG5vZGUudmlzaWJpbGl0eTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlcyA9IGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsICYmXG4gICAgICAgICAgICAgIGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGggPiAwID9cbiAgICAgICAgICBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgOlxuICAgICAgICAgIFthbHdheXNDb25kaXRpb24oKV07XG4gICAgICBpbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzID1cbiAgICAgICAgICBnZXRJbnN0YW5jZUNvbmRpdGlvbnMoY29uZGl0aW9uYWxCcmFuY2hlcywgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG5cbiAgICAgIGlmIChub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwIHx8IG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgICBjb25zdCBuZ0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlO1xuICAgICAgICBjb25zdCBmb3JtdWxhUmVwcyA9IG5nSW5zdGFuY2Uubm9kZS5mb3JtdWxhUmVwcztcbiAgICAgICAgaWYgKGZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBvbGRGb3JtdWxhID0gZm9ybXVsYVJlcHMuZm9ybXVsYTtcbiAgICAgICAgICBsZXQgbmV3Rm9ybXVsYSA9IG5vcm1hbGl6ZUV4cHJlc3Npb24ob2xkRm9ybXVsYSwgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgICAgbmdJbnN0YW5jZS5mb3JtdWxhUmVwcyA9XG4gICAgICAgICAgICAgIG5ld0Zvcm11bGEgIT09IG9sZEZvcm11bGEgPyBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBuZXdGb3JtdWxhfSkgOiBmb3JtdWxhUmVwcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmRmllbGQpIHtcbiAgICAgICAgY29uc3QgZkluc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgY29uc3QgZk5vZGUgPSBmSW5zdGFuY2Uubm9kZTtcblxuICAgICAgICBpZiAoZk5vZGUuZm9ybXVsYSkge1xuICAgICAgICAgIGZJbnN0YW5jZS5mb3JtdWxhID0gZ2V0SW5zdGFuY2VGb3JtdWxhKGZOb2RlLmZvcm11bGEsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZOb2RlLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IG5ld0NvbmRpdGlvbnMgPVxuICAgICAgICAgICAgICBnZXRJbnN0YW5jZVZhbGlkYXRpb25zKGZOb2RlLnZhbGlkYXRpb24uY29uZGl0aW9ucywgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgICAgaWYgKG5ld0NvbmRpdGlvbnMgIT09IGZOb2RlLnZhbGlkYXRpb24uY29uZGl0aW9ucykge1xuICAgICAgICAgICAgZkluc3RhbmNlLnZhbGlkYXRpb24gPSBjcmVhdGVWYWxpZGF0aW9uR3JvdXAoZk5vZGUudmFsaWRhdGlvbik7XG4gICAgICAgICAgICBmSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zID0gbmV3Q29uZGl0aW9ucztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZkluc3RhbmNlLnZhbGlkYXRpb24gPSBmTm9kZS52YWxpZGF0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmTm9kZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBuZXdXYXJuaW5ncyA9IGdldEluc3RhbmNlV2FybmluZ3MoZk5vZGUud2FybmluZy5jb25kaXRpb25zLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgICBpZiAobmV3V2FybmluZ3MgIT09IGZOb2RlLndhcm5pbmcuY29uZGl0aW9ucykge1xuICAgICAgICAgICAgZkluc3RhbmNlLndhcm5pbmcgPSBjcmVhdGVXYXJuaW5nR3JvdXAoZk5vZGUud2FybmluZyk7XG4gICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZy5jb25kaXRpb25zID0gbmV3V2FybmluZ3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZJbnN0YW5jZS53YXJuaW5nID0gZk5vZGUud2FybmluZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZk5vZGUubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICBmSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uID1cbiAgICAgICAgICAgICAgZ2V0SW5zdGFuY2VDb25kaXRpb24oZk5vZGUubmV4dFNsaWRlQ29uZGl0aW9uLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZk5vZGUpKSB7XG4gICAgICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PjtcbiAgICAgICAgICBjb25zdCBmd2NOb2RlID0gZndjSW5zdGFuY2Uubm9kZTtcbiAgICAgICAgICBpZiAoZndjTm9kZS5jaG9pY2VzRmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIgPVxuICAgICAgICAgICAgICAgIGdldEluc3RhbmNlRm9ybXVsYShmd2NOb2RlLmNob2ljZXNGaWx0ZXIsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZndjTm9kZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgICBmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgICAgZ2V0SW5zdGFuY2VDb25kaXRpb25zKGZ3Y05vZGUudHJpZ2dlckNvbmRpdGlvbnMsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZS52aXNpYmlsaXR5ID0gaW5zdGFuY2Uubm9kZS52aXNpYmlsaXR5O1xuICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlcyA9IGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsICYmXG4gICAgICAgICAgICAgIGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGggPiAwID9cbiAgICAgICAgICBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXMgOlxuICAgICAgICAgIFthbHdheXNDb25kaXRpb24oKV07XG4gICAgICBpbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzID0gY29uZGl0aW9uYWxCcmFuY2hlcztcbiAgICAgIGlmIChpc05vZGVHcm91cEluc3RhbmNlKGluc3RhbmNlKSB8fCBpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICAgIGNvbnN0IHJnSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2U7XG4gICAgICAgIHJnSW5zdGFuY2UuZm9ybXVsYVJlcHMgPSByZ0luc3RhbmNlLm5vZGUuZm9ybXVsYVJlcHM7XG4gICAgICB9IGVsc2UgaWYgKGlzRmllbGRJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgY29uc3QgZkluc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgZkluc3RhbmNlLnZhbGlkYXRpb24gPSBmSW5zdGFuY2Uubm9kZS52YWxpZGF0aW9uO1xuICAgICAgICBmSW5zdGFuY2Uud2FybmluZyA9IGZJbnN0YW5jZS5ub2RlLndhcm5pbmc7XG4gICAgICAgIGZJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gPSBmSW5zdGFuY2Uubm9kZS5uZXh0U2xpZGVDb25kaXRpb247XG4gICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgICBjb25zdCBmd2NJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+O1xuICAgICAgICAgIGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIgPSBmd2NJbnN0YW5jZS5ub2RlLmNob2ljZXNGaWx0ZXI7XG4gICAgICAgICAgZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgPSBmd2NJbnN0YW5jZS5ub2RlLnRyaWdnZXJDb25kaXRpb25zO1xuICAgICAgICB9XG4gICAgICAgIGZJbnN0YW5jZS5mb3JtdWxhID0gZkluc3RhbmNlLm5vZGUuZm9ybXVsYTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIGluc3RhbmNlO1xufVxuIl19