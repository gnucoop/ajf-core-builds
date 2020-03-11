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
export function nodeToNodeInstance(allNodes, node, prefix, context) {
    var instance = null;
    var nodeType = node.nodeType;
    switch (nodeType) {
        case AjfNodeType.AjfField:
            var field = node;
            if (field.fieldType > 100) {
                if (componentsMap[field.fieldType] != null
                    && componentsMap[field.fieldType].createInstance != null) {
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
            var conditionalBranches = instance.node.conditionalBranches != null
                && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
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
            var conditionalBranches = instance.node.conditionalBranches != null
                && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS10by1ub2RlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ08sZUFBZSxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxlQUFlLEVBQ2pGLE1BQU0sa0JBQWtCLENBQUM7QUFPMUIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBVS9ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUk1RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDbkQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sMkNBQTJDLENBQUM7QUFDOUUsT0FBTyxFQUNMLDhCQUE4QixFQUMvQixNQUFNLHdEQUF3RCxDQUFDO0FBQ2hFLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLG9EQUFvRCxDQUFDO0FBQzlGLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQ25FLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3RGLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHFEQUFxRCxDQUFDO0FBQ2pHLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDJDQUEyQyxDQUFDO0FBQzlFLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVDQUF1QyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBRW5FLE9BQU8sRUFBQyw4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QkFBaUIsQ0FBQztpQkFDcEU7Z0JBQ0QsU0FBUyxDQUFDLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQzthQUM1QztTQUNGO0tBQ0Y7SUFDRCxPQUFPLFFBQVEsQ0FBQztBQUNsQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZDb250ZXh0LCBjcmVhdGVDb25kaXRpb24sIGNyZWF0ZUZvcm11bGEsIG5vcm1hbGl6ZUV4cHJlc3Npb24sIGFsd2F5c0NvbmRpdGlvblxufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Vcbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZk5vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Vcbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctY29udGFpbmVyLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtZ3JvdXAnO1xuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtdHlwZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzL3JlcGVhdGluZy1zbGlkZSc7XG5pbXBvcnQge0FqZlNsaWRlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvc2xpZGVzL3NsaWRlJztcbmltcG9ydCB7Y29tcG9uZW50c01hcH0gZnJvbSAnLi4vZmllbGRzL2ZpZWxkcy1tYXAnO1xuaW1wb3J0IHtjcmVhdGVGaWVsZEluc3RhbmNlfSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2NyZWF0ZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBjcmVhdGVGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Vcbn0gZnJvbSAnLi4vZmllbGRzLWluc3RhbmNlcy9jcmVhdGUtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7Y3JlYXRlVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2NyZWF0ZS10YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuLi9maWVsZHMtaW5zdGFuY2VzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi4vZmllbGRzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2NyZWF0ZU5vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuLi9ub2Rlcy1pbnN0YW5jZXMvY3JlYXRlLW5vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtjcmVhdGVSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuLi9zbGlkZXMtaW5zdGFuY2VzL2NyZWF0ZS1yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtjcmVhdGVTbGlkZUluc3RhbmNlfSBmcm9tICcuLi9zbGlkZXMtaW5zdGFuY2VzL2NyZWF0ZS1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2NyZWF0ZVZhbGlkYXRpb25Hcm91cH0gZnJvbSAnLi4vdmFsaWRhdGlvbi9jcmVhdGUtdmFsaWRhdGlvbi1ncm91cCc7XG5pbXBvcnQge2NyZWF0ZVdhcm5pbmdHcm91cH0gZnJvbSAnLi4vd2FybmluZy9jcmVhdGUtd2FybmluZy1ncm91cCc7XG5cbmltcG9ydCB7Z2V0QW5jZXN0b3JSZXBlYXRpbmdOb2Rlc05hbWVzfSBmcm9tICcuL2dldC1hbmNlc3Rvci1yZXBlYXRpbmctbm9kZXMtbmFtZXMnO1xuaW1wb3J0IHtnZXRJbnN0YW5jZUNvbmRpdGlvbn0gZnJvbSAnLi9nZXQtaW5zdGFuY2UtY29uZGl0aW9uJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VDb25kaXRpb25zfSBmcm9tICcuL2dldC1pbnN0YW5jZS1jb25kaXRpb25zJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VGb3JtdWxhfSBmcm9tICcuL2dldC1pbnN0YW5jZS1mb3JtdWxhJztcbmltcG9ydCB7Z2V0SW5zdGFuY2VWYWxpZGF0aW9uc30gZnJvbSAnLi9nZXQtaW5zdGFuY2UtdmFsaWRhdGlvbnMnO1xuaW1wb3J0IHtnZXRJbnN0YW5jZVdhcm5pbmdzfSBmcm9tICcuL2dldC1pbnN0YW5jZS13YXJuaW5ncyc7XG5pbXBvcnQge2lzRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaXMtbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pcy1yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gbm9kZVRvTm9kZUluc3RhbmNlKFxuICAgIGFsbE5vZGVzOiBBamZOb2RlW118QWpmTm9kZUluc3RhbmNlW10sIG5vZGU6IEFqZk5vZGUsIHByZWZpeDogbnVtYmVyW10sXG4gICAgY29udGV4dDogQWpmQ29udGV4dCk6IEFqZk5vZGVJbnN0YW5jZXxudWxsIHtcbiAgbGV0IGluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2V8bnVsbCA9IG51bGw7XG4gIGNvbnN0IG5vZGVUeXBlID0gbm9kZS5ub2RlVHlwZTtcbiAgc3dpdGNoIChub2RlVHlwZSkge1xuICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmRmllbGQ6XG4gICAgICBjb25zdCBmaWVsZCA9IG5vZGUgYXMgQWpmRmllbGQ7XG4gICAgICBpZiAoZmllbGQuZmllbGRUeXBlID4gMTAwKSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICBjb21wb25lbnRzTWFwW2ZpZWxkLmZpZWxkVHlwZV0gIT0gbnVsbFxuICAgICAgICAgICYmIGNvbXBvbmVudHNNYXBbZmllbGQuZmllbGRUeXBlXS5jcmVhdGVJbnN0YW5jZSAhPSBudWxsXG4gICAgICAgICkge1xuICAgICAgICAgIGluc3RhbmNlID0gY29tcG9uZW50c01hcFtmaWVsZC5maWVsZFR5cGVdLmNyZWF0ZUluc3RhbmNlIShcbiAgICAgICAgICAgIHtub2RlOiBub2RlIGFzIEFqZkZpZWxkLCBwcmVmaXh9LCBjb250ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnN0YW5jZSA9IGNyZWF0ZUZpZWxkSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmRmllbGQsIHByZWZpeH0sIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzd2l0Y2ggKGZpZWxkLmZpZWxkVHlwZSkge1xuICAgICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZTpcbiAgICAgICAgICAgIGluc3RhbmNlID0gY3JlYXRlRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKFxuICAgICAgICAgICAgICAgIHtub2RlOiBub2RlIGFzIEFqZkZpZWxkV2l0aENob2ljZXM8YW55PiwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5UYWJsZTpcbiAgICAgICAgICAgIGluc3RhbmNlID0gY3JlYXRlVGFibGVGaWVsZEluc3RhbmNlKHtub2RlOiBub2RlIGFzIEFqZlRhYmxlRmllbGQsIHByZWZpeH0sIGNvbnRleHQpO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIGluc3RhbmNlID0gY3JlYXRlRmllbGRJbnN0YW5jZSh7bm9kZTogbm9kZSBhcyBBamZGaWVsZCwgcHJlZml4fSwgY29udGV4dCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgY2FzZSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXA6XG4gICAgICBpbnN0YW5jZSA9IGNyZWF0ZU5vZGVHcm91cEluc3RhbmNlKHtub2RlOiBub2RlIGFzIEFqZk5vZGVHcm91cCwgcHJlZml4fSk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlOlxuICAgICAgaW5zdGFuY2UgPSBjcmVhdGVSZXBlYXRpbmdTbGlkZUluc3RhbmNlKHtub2RlOiBub2RlIGFzIEFqZlJlcGVhdGluZ1NsaWRlLCBwcmVmaXh9KTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmU2xpZGU6XG4gICAgICBpbnN0YW5jZSA9IGNyZWF0ZVNsaWRlSW5zdGFuY2Uoe25vZGU6IG5vZGUgYXMgQWpmU2xpZGUsIHByZWZpeH0pO1xuICAgICAgYnJlYWs7XG4gIH1cbiAgaWYgKGluc3RhbmNlICE9IG51bGwpIHtcbiAgICBjb25zdCBoYXNQcmVmaXggPSBwcmVmaXggIT0gbnVsbCAmJiBwcmVmaXgubGVuZ3RoID4gMDtcbiAgICBpZiAoaGFzUHJlZml4KSB7XG4gICAgICBjb25zdCBhbmNlc3RvcnNOYW1lcyA9IGdldEFuY2VzdG9yUmVwZWF0aW5nTm9kZXNOYW1lcyhhbGxOb2Rlcywgbm9kZSk7XG5cbiAgICAgIGlmIChub2RlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBvbGRWaXNpYmlsaXR5ID0gbm9kZS52aXNpYmlsaXR5LmNvbmRpdGlvbjtcbiAgICAgICAgY29uc3QgbmV3VmlzaWJpbGl0eSA9IG5vcm1hbGl6ZUV4cHJlc3Npb24ob2xkVmlzaWJpbGl0eSwgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgIGluc3RhbmNlLnZpc2liaWxpdHkgPSBuZXdWaXNpYmlsaXR5ICE9PSBvbGRWaXNpYmlsaXR5ID9cbiAgICAgICAgICAgIGNyZWF0ZUNvbmRpdGlvbih7Y29uZGl0aW9uOiBuZXdWaXNpYmlsaXR5fSkgOlxuICAgICAgICAgICAgbm9kZS52aXNpYmlsaXR5O1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25kaXRpb25hbEJyYW5jaGVzID0gaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzICE9IG51bGxcbiAgICAgICAgJiYgaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzLmxlbmd0aCA+IDBcbiAgICAgICAgPyBpbnN0YW5jZS5ub2RlLmNvbmRpdGlvbmFsQnJhbmNoZXNcbiAgICAgICAgOiBbYWx3YXlzQ29uZGl0aW9uKCldO1xuICAgICAgaW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcyA9IGdldEluc3RhbmNlQ29uZGl0aW9ucyhcbiAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlcywgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG5cbiAgICAgIGlmIChub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwIHx8IG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgICBjb25zdCBuZ0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlO1xuICAgICAgICBjb25zdCBmb3JtdWxhUmVwcyA9IG5nSW5zdGFuY2Uubm9kZS5mb3JtdWxhUmVwcztcbiAgICAgICAgaWYgKGZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBvbGRGb3JtdWxhID0gZm9ybXVsYVJlcHMuZm9ybXVsYTtcbiAgICAgICAgICBsZXQgbmV3Rm9ybXVsYSA9IG5vcm1hbGl6ZUV4cHJlc3Npb24ob2xkRm9ybXVsYSwgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgICAgbmdJbnN0YW5jZS5mb3JtdWxhUmVwcyA9XG4gICAgICAgICAgICAgIG5ld0Zvcm11bGEgIT09IG9sZEZvcm11bGEgPyBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBuZXdGb3JtdWxhfSkgOiBmb3JtdWxhUmVwcztcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmIChub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmRmllbGQpIHtcbiAgICAgICAgY29uc3QgZkluc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgY29uc3QgZk5vZGUgPSBmSW5zdGFuY2Uubm9kZTtcblxuICAgICAgICBpZiAoZk5vZGUuZm9ybXVsYSkge1xuICAgICAgICAgIGZJbnN0YW5jZS5mb3JtdWxhID0gZ2V0SW5zdGFuY2VGb3JtdWxhKGZOb2RlLmZvcm11bGEsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZOb2RlLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgICAgIGNvbnN0IG5ld0NvbmRpdGlvbnMgPVxuICAgICAgICAgICAgICBnZXRJbnN0YW5jZVZhbGlkYXRpb25zKGZOb2RlLnZhbGlkYXRpb24uY29uZGl0aW9ucywgYW5jZXN0b3JzTmFtZXMsIHByZWZpeCk7XG4gICAgICAgICAgaWYgKG5ld0NvbmRpdGlvbnMgIT09IGZOb2RlLnZhbGlkYXRpb24uY29uZGl0aW9ucykge1xuICAgICAgICAgICAgZkluc3RhbmNlLnZhbGlkYXRpb24gPSBjcmVhdGVWYWxpZGF0aW9uR3JvdXAoZk5vZGUudmFsaWRhdGlvbik7XG4gICAgICAgICAgICBmSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zID0gbmV3Q29uZGl0aW9ucztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZkluc3RhbmNlLnZhbGlkYXRpb24gPSBmTm9kZS52YWxpZGF0aW9uO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChmTm9kZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgICAgICBjb25zdCBuZXdXYXJuaW5ncyA9IGdldEluc3RhbmNlV2FybmluZ3MoZk5vZGUud2FybmluZy5jb25kaXRpb25zLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgICBpZiAobmV3V2FybmluZ3MgIT09IGZOb2RlLndhcm5pbmcuY29uZGl0aW9ucykge1xuICAgICAgICAgICAgZkluc3RhbmNlLndhcm5pbmcgPSBjcmVhdGVXYXJuaW5nR3JvdXAoZk5vZGUud2FybmluZyk7XG4gICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZy5jb25kaXRpb25zID0gbmV3V2FybmluZ3M7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZJbnN0YW5jZS53YXJuaW5nID0gZk5vZGUud2FybmluZztcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoZk5vZGUubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgICAgICBmSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uID1cbiAgICAgICAgICAgICAgZ2V0SW5zdGFuY2VDb25kaXRpb24oZk5vZGUubmV4dFNsaWRlQ29uZGl0aW9uLCBhbmNlc3RvcnNOYW1lcywgcHJlZml4KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZk5vZGUpKSB7XG4gICAgICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PjtcbiAgICAgICAgICBjb25zdCBmd2NOb2RlID0gZndjSW5zdGFuY2Uubm9kZTtcbiAgICAgICAgICBpZiAoZndjTm9kZS5jaG9pY2VzRmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIgPVxuICAgICAgICAgICAgICAgIGdldEluc3RhbmNlRm9ybXVsYShmd2NOb2RlLmNob2ljZXNGaWx0ZXIsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoZndjTm9kZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgICBmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyA9XG4gICAgICAgICAgICAgICAgZ2V0SW5zdGFuY2VDb25kaXRpb25zKGZ3Y05vZGUudHJpZ2dlckNvbmRpdGlvbnMsIGFuY2VzdG9yc05hbWVzLCBwcmVmaXgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBpbnN0YW5jZS52aXNpYmlsaXR5ID0gaW5zdGFuY2Uubm9kZS52aXNpYmlsaXR5O1xuICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlcyA9IGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcyAhPSBudWxsXG4gICAgICAgICYmIGluc3RhbmNlLm5vZGUuY29uZGl0aW9uYWxCcmFuY2hlcy5sZW5ndGggPiAwXG4gICAgICAgID8gaW5zdGFuY2Uubm9kZS5jb25kaXRpb25hbEJyYW5jaGVzXG4gICAgICAgIDogW2Fsd2F5c0NvbmRpdGlvbigpXTtcbiAgICAgIGluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMgPSBjb25kaXRpb25hbEJyYW5jaGVzO1xuICAgICAgaWYgKGlzTm9kZUdyb3VwSW5zdGFuY2UoaW5zdGFuY2UpIHx8IGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgY29uc3QgcmdJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZTtcbiAgICAgICAgcmdJbnN0YW5jZS5mb3JtdWxhUmVwcyA9IHJnSW5zdGFuY2Uubm9kZS5mb3JtdWxhUmVwcztcbiAgICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICBmSW5zdGFuY2UudmFsaWRhdGlvbiA9IGZJbnN0YW5jZS5ub2RlLnZhbGlkYXRpb247XG4gICAgICAgIGZJbnN0YW5jZS53YXJuaW5nID0gZkluc3RhbmNlLm5vZGUud2FybmluZztcbiAgICAgICAgZkluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiA9IGZJbnN0YW5jZS5ub2RlLm5leHRTbGlkZUNvbmRpdGlvbjtcbiAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICAgIGNvbnN0IGZ3Y0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT47XG4gICAgICAgICAgZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlciA9IGZ3Y0luc3RhbmNlLm5vZGUuY2hvaWNlc0ZpbHRlcjtcbiAgICAgICAgICBmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyA9IGZ3Y0luc3RhbmNlLm5vZGUudHJpZ2dlckNvbmRpdGlvbnM7XG4gICAgICAgIH1cbiAgICAgICAgZkluc3RhbmNlLmZvcm11bGEgPSBmSW5zdGFuY2Uubm9kZS5mb3JtdWxhO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICByZXR1cm4gaW5zdGFuY2U7XG59XG4iXX0=