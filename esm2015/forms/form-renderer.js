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
import { EventEmitter, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { tokenize } from 'esprima';
import { BehaviorSubject, from, Observable, of as obsOf, Subject, Subscription, timer } from 'rxjs';
import { debounceTime, filter, map, pairwise, publishReplay, refCount, scan, share, startWith, switchMap, withLatestFrom } from 'rxjs/operators';
import { AjfFieldType } from './interface/fields/field-type';
import { AjfNodeType } from './interface/nodes/node-type';
import { initChoicesOrigin } from './utils/choices/init-choices-origin';
import { isFieldWithChoicesInstance } from './utils/fields-instances/is-field-with-choices-instance';
import { isTableFieldInstance } from './utils/fields-instances/is-table-field-instance';
import { updateFieldInstanceState } from './utils/fields-instances/update-field-instance-state';
import { updateFilteredChoices } from './utils/fields-instances/update-filtered-choices';
import { updateFormula } from './utils/fields-instances/update-formula';
import { updateNextSlideCondition } from './utils/fields-instances/update-next-slide-condition';
import { updateTriggerConditions } from './utils/fields-instances/update-trigger-conditions';
import { updateValidation } from './utils/fields-instances/update-validation';
import { updateWarning } from './utils/fields-instances/update-warning';
import { createField } from './utils/fields/create-field';
import { isCustomFieldWithChoices } from './utils/fields/is-custom-field-with-choices';
import { isFieldWithChoices } from './utils/fields/is-field-with-choices';
import { flattenNodesInstances } from './utils/nodes-instances/flatten-nodes-instances';
import { flattenNodesInstancesTree } from './utils/nodes-instances/flatten-nodes-instances-tree';
import { isFieldInstance } from './utils/nodes-instances/is-field-instance';
import { isNodeGroupInstance } from './utils/nodes-instances/is-node-group-instance';
import { isSlideInstance } from './utils/nodes-instances/is-slide-instance';
import { isSlidesInstance } from './utils/nodes-instances/is-slides-instance';
import { nodeInstanceCompleteName } from './utils/nodes-instances/node-instance-complete-name';
import { nodeInstanceSuffix } from './utils/nodes-instances/node-instance-suffix';
import { nodeToNodeInstance } from './utils/nodes-instances/node-to-node-instance';
import { updateConditionalBranches } from './utils/nodes-instances/update-conditional-branches';
import { updateVisibility } from './utils/nodes-instances/update-visibility';
import { flattenNodes } from './utils/nodes/flatten-nodes';
import { isContainerNode } from './utils/nodes/is-container-node';
import { isRepeatingContainerNode } from './utils/nodes/is-repeating-container-node';
import { orderedNodes } from './utils/nodes/ordered-nodes';
import { updateRepsNum } from './utils/slides-instances/update-reps-num';
import { validSlide } from './utils/slides-instances/valid-slide';
import { AjfValidationService } from './validation-service';
const updateSlideValidity = (slide) => {
    const subNodesNum = slide.flatNodes.length;
    let valid = true;
    for (let i = 0; i < subNodesNum; i++) {
        const subNode = slide.flatNodes[i];
        if (subNode.visible && isFieldInstance(subNode) && !subNode.valid) {
            valid = false;
            break;
        }
    }
    if (slide.valid !== valid) {
        slide.valid = valid;
    }
};
const ɵ0 = updateSlideValidity;
export class AjfFormRendererService {
    constructor(_) {
        this._visibilityNodesMapUpdates = new Subject();
        this._repetitionNodesMapUpdates = new Subject();
        this._conditionalBranchNodesMapUpdates = new Subject();
        this._formulaNodesMapUpdates = new Subject();
        this._validationNodesMapUpdates = new Subject();
        this._warningNodesMapUpdates = new Subject();
        this._filteredChoicesNodesMapUpdates = new Subject();
        this._triggerConditionsNodesMapUpdates = new Subject();
        this._nextSlideConditionsNodesMapUpdates = new Subject();
        this._formInitEvent = new EventEmitter();
        this.formInitEvent = this._formInitEvent;
        this._formGroup = new BehaviorSubject(null);
        this.formGroup = this._formGroup;
        this._form = new BehaviorSubject(null);
        this._nodesUpdates = new Subject();
        this._formGroupSubscription = Subscription.EMPTY;
        this._valueChanged = new Subject();
        this._nextSlideTrigger = new EventEmitter();
        this.nextSlideTrigger = this._nextSlideTrigger;
        this._slidesNum = new BehaviorSubject(0);
        this.slidesNum = this._slidesNum;
        this._initUpdateMapStreams();
        this._initNodesStreams();
        this._initErrorsStreams();
        this._initFormStreams();
        this._updateFormValueAndValidity();
    }
    get nodesTree() {
        return this._flatNodesTree;
    }
    get errorPositions() {
        return this._errorPositions;
    }
    get errors() {
        return this._errors;
    }
    get currentSupplementaryInformations() {
        const form = this._form.getValue();
        return form != null && form.form != null ? form.form.supplementaryInformations : null;
    }
    setForm(form, context = {}) {
        this._initUpdateMapStreams();
        if (form != null && Object.keys(context).length === 0 &&
            Object.keys(form.initContext || {}).length > 0) {
            context = form.initContext || {};
        }
        const currentForm = this._form.getValue();
        if ((currentForm == null && form != null) ||
            (currentForm != null && form !== currentForm.form)) {
            this._form.next({ form: form, context: context });
        }
    }
    getFormValue() {
        const formGroup = this._formGroup.getValue();
        if (formGroup == null) {
            return {};
        }
        let res = deepCopy(formGroup.value);
        return res;
    }
    addGroup(group) {
        return new Observable((subscriber) => {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            const maxReps = group.node.maxReps;
            if (maxReps > 0 && group.reps + 1 > maxReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            const oldReps = group.reps;
            group.reps = group.reps + 1;
            group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
            group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
            this._nodesUpdates.next((nodes) => {
                const flatNodes = flattenNodesInstances(nodes, true);
                this._adjustReps(flatNodes, group, oldReps, this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            });
        });
    }
    removeGroup(group) {
        return new Observable((subscriber) => {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            const minReps = group.node.minReps;
            if (group.reps - 1 < minReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            const oldReps = group.reps;
            group.reps = group.reps - 1;
            group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
            group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
            this._nodesUpdates.next((nodes) => {
                this._adjustReps(nodes, group, oldReps, this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            });
        });
    }
    getControl(field) {
        return this.formGroup.pipe(map((f) => {
            const fieldName = nodeInstanceCompleteName(field);
            return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
        }));
    }
    _initErrorsStreams() {
        this._errorPositions = this._valueChanged.pipe(withLatestFrom(this._nodes, this._form), filter(([_, __, form]) => form != null &&
            form.form != null), map(([_, nodes, formDef]) => {
            const form = formDef.form;
            let currentPosition = 0;
            const errors = [];
            nodes.forEach((node) => {
                if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                    const rsNode = node;
                    for (let i = 0; i < rsNode.reps; i++) {
                        if (node.visible) {
                            currentPosition++;
                            if (i == 0) {
                                rsNode.position = currentPosition;
                            }
                            if (!validSlide(rsNode, i)) {
                                errors.push(currentPosition);
                            }
                        }
                    }
                }
                else if (node.node.nodeType === AjfNodeType.AjfSlide) {
                    const sNode = node;
                    if (sNode.visible) {
                        currentPosition++;
                        sNode.position = currentPosition;
                        if (!sNode.valid) {
                            errors.push(currentPosition);
                        }
                    }
                }
            });
            form.valid = errors.length == 0;
            this._slidesNum.next(currentPosition);
            return errors;
        }), publishReplay(), refCount());
        this._errors = this._errorPositions.pipe(map(e => e != null ? e.length : 0), startWith(0), publishReplay(), refCount());
    }
    _initUpdateMapStreams() {
        this._visibilityNodesMap =
            this._visibilityNodesMapUpdates
                .pipe(scan((rmap, op) => {
                return op(rmap);
            }, {}), startWith({}), share());
        this._repetitionNodesMap =
            this._repetitionNodesMapUpdates
                .pipe(scan((rmap, op) => {
                return op(rmap);
            }, {}), startWith({}), share());
        this._conditionalBranchNodesMap =
            this._conditionalBranchNodesMapUpdates
                .pipe(scan((rmap, op) => {
                return op(rmap);
            }, {}), startWith({}), share());
        this._formulaNodesMap =
            this._formulaNodesMapUpdates
                .pipe(scan((rmap, op) => {
                return op(rmap);
            }, {}), startWith({}), share());
        this._validationNodesMap =
            this._validationNodesMapUpdates
                .pipe(scan((rmap, op) => {
                return op(rmap);
            }, {}), startWith({}), share());
        this._warningNodesMap =
            this._warningNodesMapUpdates
                .pipe(scan((rmap, op) => {
                return op(rmap);
            }, {}), startWith({}), share());
        this._filteredChoicesNodesMap =
            this._filteredChoicesNodesMapUpdates
                .pipe(scan((rmap, op) => {
                return op(rmap);
            }, {}), startWith({}), share());
        this._triggerConditionsNodesMap =
            this._triggerConditionsNodesMapUpdates
                .pipe(scan((rmap, op) => {
                return op(rmap);
            }, {}), startWith({}), share());
        this._nextSlideConditionsNodesMap =
            this._nextSlideConditionsNodesMapUpdates
                .pipe(scan((rmap, op) => {
                return op(rmap);
            }, {}), startWith({}), share());
        this._nodesMaps = [
            this._visibilityNodesMap, this._repetitionNodesMap, this._conditionalBranchNodesMap,
            this._formulaNodesMap, this._validationNodesMap, this._warningNodesMap,
            this._nextSlideConditionsNodesMap, this._filteredChoicesNodesMap,
            this._triggerConditionsNodesMap
        ];
    }
    _initFormStreams() {
        const formObs = this._form;
        formObs
            .pipe(map((_form) => {
            return this._initFormGroupStreams(new FormGroup({}));
        }))
            .subscribe(this._formGroup);
        formObs
            .pipe(switchMap(form => {
            if (form == null || form.form == null) {
                return obsOf(form);
            }
            const choicesOrigins = form.form.choicesOrigins || [];
            if (choicesOrigins.length === 0) {
                return obsOf(form);
            }
            return from(Promise.all(choicesOrigins.map(co => initChoicesOrigin(co))))
                .pipe(map(() => form));
        }), map((formDef) => {
            return (_nodesInstances) => {
                let nodes;
                if (formDef != null &&
                    formDef.form != null) {
                    const form = formDef;
                    const baseNodes = form.form.nodes;
                    nodes = this._orderedNodesInstancesTree(flattenNodes(baseNodes), baseNodes, undefined, [], form.context || {});
                }
                else {
                    nodes = [];
                }
                let currentPosition = 0;
                nodes.forEach((node) => {
                    if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                        const rsNode = node;
                        for (let i = 0; i < rsNode.reps; i++) {
                            if (node.visible) {
                                currentPosition++;
                                if (i == 0) {
                                    rsNode.position = currentPosition;
                                }
                            }
                        }
                    }
                    else if (node.node.nodeType === AjfNodeType.AjfSlide) {
                        const sNode = node;
                        if (sNode.visible) {
                            currentPosition++;
                            sNode.position = currentPosition;
                        }
                    }
                });
                return nodes;
            };
        }))
            .subscribe(this._nodesUpdates);
    }
    _initNodeInstance(allNodes, node, prefix, context, branchVisibility = true) {
        let instance = nodeToNodeInstance(allNodes, node, prefix, context);
        if (instance != null) {
            const nodeType = instance.node.nodeType;
            if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                this._explodeRepeatingNode(allNodes, instance, context);
            }
            else if (nodeType === AjfNodeType.AjfSlide) {
                const sInstance = instance;
                sInstance.nodes = this._orderedNodesInstancesTree(allNodes, sInstance.node.nodes, sInstance.node.id, prefix, context);
            }
            updateVisibility(instance, context, branchVisibility);
            updateConditionalBranches(instance, context);
            if (nodeType === AjfNodeType.AjfField) {
                const fInstance = instance;
                if (isCustomFieldWithChoices(fInstance.node) || isFieldWithChoices(fInstance.node)) {
                    updateFilteredChoices(fInstance, context);
                }
                else {
                    if (isTableFieldInstance(fInstance)) {
                        const tfInstance = fInstance;
                        const tNode = tfInstance.node;
                        tfInstance.context = context[nodeInstanceCompleteName(tfInstance)] || context;
                        const formGroup = this._formGroup.getValue();
                        let controlsWithLabels = [];
                        controlsWithLabels.push([node.label, tNode.columnLabels]);
                        if (formGroup != null) {
                            tNode.rows.forEach((row, rowIdx) => {
                                let r = [];
                                row.forEach((cell, idx) => {
                                    /*
                                    every control is registered with the cell position
                                    inside the form control matrix
                                    with this mask `${tNode.name}__${rowIdx}__${idx}`
                                    */
                                    const name = `${tNode.name}__${rowIdx}__${idx}`;
                                    const tableFormControl = { control: new FormControl(), show: false };
                                    tableFormControl.control.setValue(tfInstance.context[cell.formula]);
                                    formGroup.registerControl(name, tableFormControl.control);
                                    r.push(tableFormControl);
                                    /* create a object that respect the instance interface
                                    with the minimum defined properties to allow to run addToNodeFormula map*/
                                    const fakeInstance = {
                                        formula: { formula: cell.formula },
                                        node: { name, nodeType: 0, editable: false },
                                        visible: true,
                                        prefix: [],
                                        conditionalBranches: [],
                                        updatedEvt: new EventEmitter()
                                    };
                                    this._addToNodesFormulaMap(fakeInstance, cell.formula);
                                });
                                controlsWithLabels.push([tNode.rowLabels[rowIdx], r]);
                            });
                            tfInstance.controls = controlsWithLabels;
                        }
                    }
                    else {
                        fInstance.value = context[nodeInstanceCompleteName(instance)];
                    }
                    updateFieldInstanceState(fInstance, context);
                }
            }
            this._addNodeInstance(instance);
        }
        return instance;
    }
    _adjustReps(allNodes, instance, oldReps, context) {
        const newReps = instance.reps;
        const result = { added: null, removed: null };
        if (oldReps < newReps) {
            const newNodes = [];
            if (instance.nodes == null) {
                instance.nodes = [];
            }
            if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                const node = createField({
                    id: 999,
                    name: '',
                    parent: -1,
                    fieldType: AjfFieldType.Empty,
                    label: instance.node.label
                });
                const newInstance = this._initNodeInstance(allNodes, node, instance.prefix.slice(0), context);
                if (newInstance != null) {
                    instance.nodes.push(newInstance);
                }
            }
            for (let i = oldReps; i < newReps; i++) {
                const prefix = instance.prefix.slice(0);
                const group = instance.node;
                prefix.push(i);
                orderedNodes(group.nodes, instance.node.id).forEach((n) => {
                    const newInstance = this._initNodeInstance(allNodes, n, prefix, context);
                    if (newInstance != null) {
                        newNodes.push(newInstance);
                        instance.nodes.push(newInstance);
                    }
                });
                this._addNodeInstance(instance);
            }
            result.added = newNodes;
        }
        else if (oldReps > newReps) {
            let nodesNum = instance.nodes.length / oldReps;
            if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                nodesNum++;
            }
            result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
            result.removed.forEach((n => {
                this._removeNodeInstance(n);
            }));
        }
        if (oldReps != newReps && instance.formulaReps == null) {
            const fg = this._formGroup.getValue();
            const completeName = nodeInstanceCompleteName(instance);
            if (fg != null && fg.contains(completeName)) {
                fg.controls[completeName].setValue(instance.reps);
            }
        }
        instance.flatNodes = flattenNodesInstances(instance.nodes);
        if (instance.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            const rsInstance = instance;
            const slideNodes = [];
            const nodesPerSlide = rsInstance.nodes != null ? rsInstance.nodes.length / rsInstance.reps : 0;
            for (let i = 0; i < instance.reps; i++) {
                const startNode = i * nodesPerSlide;
                slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
            }
            rsInstance.slideNodes = slideNodes;
        }
        return result;
    }
    _updateFormValueAndValidity() {
        this._nodesUpdates
            .pipe(withLatestFrom(this._formGroup), filter(([_, fg]) => fg !== null))
            .subscribe(([_, fg]) => {
            const form = fg;
            form.updateValueAndValidity();
        });
    }
    _explodeRepeatingNode(allNodes, instance, context) {
        const oldReps = updateRepsNum(instance, context);
        if (oldReps !== instance.reps) {
            this._adjustReps(allNodes, instance, oldReps, context);
        }
    }
    _orderedNodesInstancesTree(allNodes, nodes, parent = null, prefix = [], context) {
        let nodesInstances = [];
        const curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
        orderedNodes(nodes, parent).forEach((node) => {
            const parentNodeInstance = nodesInstances.find(ni => ni.node.id == node.parent && nodeInstanceSuffix(ni) == curSuffix);
            const branchVisibility = parentNodeInstance != null ?
                parentNodeInstance.verifiedBranch != null &&
                    parentNodeInstance.verifiedBranch == node.parentNode :
                true;
            const nni = this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
            if (nni != null) {
                nodesInstances.push(nni);
            }
        });
        return nodesInstances;
    }
    _formValueDelta(oldValue, newValue) {
        return Object.keys(newValue).filter((k) => oldValue[k] !== newValue[k]);
    }
    _initFormGroupStreams(formGroup) {
        this._formGroupSubscription.unsubscribe();
        let init = true;
        let initForm = true;
        this._formInitEvent.emit(0 /* Initializing */);
        this._formGroupSubscription =
            formGroup.valueChanges
                .pipe(startWith({}), pairwise(), debounceTime(200), withLatestFrom(...(this._nodesMaps), this._flatNodes))
                .subscribe((v) => {
                const oldFormValue = init && {} || v[0][0];
                init = false;
                const newFormValue = v[0][1];
                const visibilityMap = v[1];
                const repetitionMap = v[2];
                const conditionalBranchesMap = v[3];
                const formulaMap = v[4];
                const validationMap = v[5];
                const warningMap = v[6];
                const nextSlideConditionsMap = v[7];
                const filteredChoicesMap = v[8];
                const triggerConditionsMap = v[9];
                const nodes = v[10];
                // takes the names of the fields that have changed
                const delta = this._formValueDelta(oldFormValue, newFormValue);
                const deltaLen = delta.length;
                let updatedNodes = [];
                /*
                  for each field update all properties map
                  with the following rule  "if fieldname is in map update it" and
                  push on updateNodes the node instance that wrap field
                */
                delta.forEach((fieldName) => {
                    updatedNodes = updatedNodes.concat(nodes.filter(n => nodeInstanceCompleteName(n) === fieldName));
                    if (visibilityMap[fieldName] != null) {
                        visibilityMap[fieldName].forEach(nodeInstance => {
                            const completeName = nodeInstanceCompleteName(nodeInstance);
                            const visibilityChanged = updateVisibility(nodeInstance, newFormValue);
                            const isField = isFieldInstance(nodeInstance);
                            if (visibilityChanged && !nodeInstance.visible) {
                                const fg = this._formGroup.getValue();
                                if (fg != null) {
                                    const s = timer(200).subscribe(() => {
                                        if (s && !s.closed) {
                                            s.unsubscribe();
                                        }
                                        fg.controls[completeName].setValue(null);
                                    });
                                }
                                if (isField) {
                                    nodeInstance.value = null;
                                }
                            }
                            else if (visibilityChanged && nodeInstance.visible && isField) {
                                const fg = this._formGroup.getValue();
                                const res = updateFormula(nodeInstance, newFormValue);
                                if (fg != null && res.changed) {
                                    fg.controls[completeName].setValue(res.value);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        });
                    }
                    if (repetitionMap[fieldName] != null) {
                        repetitionMap[fieldName].forEach(nodeInstance => {
                            if (isRepeatingContainerNode(nodeInstance.node)) {
                                const rnInstance = nodeInstance;
                                const oldReps = updateRepsNum(rnInstance, newFormValue);
                                if (oldReps !== rnInstance.reps) {
                                    this._adjustReps(nodes, rnInstance, oldReps, newFormValue);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        });
                    }
                    if (conditionalBranchesMap[fieldName] != null) {
                        conditionalBranchesMap[fieldName].forEach((nodeInstance) => {
                            // const branchChanged = nodeInstance.updateConditionalBranches(newFormValue);
                            updateConditionalBranches(nodeInstance, newFormValue);
                            // if (branchChanged) {
                            const verifiedBranch = nodeInstance.verifiedBranch;
                            nodeInstance.conditionalBranches.forEach((_condition, idx) => {
                                if (idx == verifiedBranch) {
                                    this._showSubtree(newFormValue, nodes, nodeInstance, idx);
                                }
                                else {
                                    this._hideSubtree(newFormValue, nodes, nodeInstance, idx);
                                }
                            });
                            // }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        });
                    }
                    if (formulaMap[fieldName] != null) {
                        formulaMap[fieldName].forEach((nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                const fInstance = nodeInstance;
                                const res = updateFormula(fInstance, newFormValue);
                                const fg = this._formGroup.getValue();
                                if (fg != null && res.changed) {
                                    updateValidation(fInstance, newFormValue);
                                    fg.controls[nodeInstanceCompleteName(nodeInstance)].setValue(res.value);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        });
                    }
                    if (validationMap[fieldName] != null) {
                        validationMap[fieldName].forEach((nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                const fInstance = nodeInstance;
                                newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
                                updateValidation(fInstance, newFormValue, this.currentSupplementaryInformations);
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        });
                    }
                    if (warningMap[fieldName] != null) {
                        warningMap[fieldName].forEach((nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                const fInstance = nodeInstance;
                                updateWarning(fInstance, newFormValue);
                                if (fInstance.warningResults != null &&
                                    fInstance.warningResults.filter(warning => warning.result).length > 0) {
                                    fInstance.warningTrigger.emit();
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        });
                    }
                    if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
                        if (nextSlideConditionsMap[fieldName]
                            .filter((nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                const fInstance = nodeInstance;
                                return updateNextSlideCondition(fInstance, newFormValue);
                            }
                            return false;
                        })
                            .length == 1) {
                            this._nextSlideTrigger.emit();
                        }
                    }
                    if (filteredChoicesMap[fieldName] != null) {
                        filteredChoicesMap[fieldName].forEach((nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                const fInstance = nodeInstance;
                                if (isFieldWithChoices(fInstance.node)) {
                                    updateFilteredChoices(fInstance, newFormValue);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        });
                    }
                    if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
                        const res = triggerConditionsMap[fieldName].filter((nodeInstance) => {
                            if (!isFieldInstance(nodeInstance)) {
                                return false;
                            }
                            const fInstance = nodeInstance;
                            if (!isFieldWithChoices(fInstance.node)) {
                                return false;
                            }
                            return updateTriggerConditions(fInstance, newFormValue);
                        });
                        if (res.length == 1) {
                            res[0].selectionTrigger.emit();
                        }
                    }
                });
                updatedNodes.forEach(n => {
                    const nodeIdx = nodes.indexOf(n);
                    let idx = nodeIdx - 1;
                    while (idx >= 0) {
                        const curNode = nodes[idx];
                        if (isSlidesInstance(curNode)) {
                            updateSlideValidity(curNode);
                            curNode.updatedEvt.emit();
                        }
                        idx--;
                    }
                    n.updatedEvt.emit();
                });
                if (initForm) {
                    initForm = false;
                    this._formInitEvent.emit(1 /* Complete */);
                }
                this._valueChanged.next();
            });
        return formGroup;
    }
    _showSubtree(context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, true, branch);
    }
    _hideSubtree(context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, false, branch);
    }
    _updateSubtreeVisibility(context, nodes, node, visible, branch) {
        let subNodes;
        const nodeSuffix = nodeInstanceSuffix(node);
        if (branch != null) {
            subNodes = nodes.filter(n => {
                const suffix = nodeInstanceSuffix(n);
                return suffix == nodeSuffix && n.node.parent == node.node.id && n.node.parentNode == branch;
            });
        }
        else {
            subNodes = nodes.filter(n => {
                const suffix = nodeInstanceSuffix(n);
                return suffix == nodeSuffix && n.node.parent == node.node.id;
            });
        }
        const isContainer = isContainerNode(node.node);
        subNodes.forEach((n) => {
            if (!isContainer ||
                (isContainer && node.node.nodes.find(cn => cn.id == n.node.id) == null)) {
                updateVisibility(n, context, visible);
                updateFormula(n, context);
                this._updateSubtreeVisibility(context, nodes, n, visible);
            }
        });
    }
    _initNodesStreams() {
        this._nodes =
            this._nodesUpdates.pipe(scan((nodes, op) => {
                return op(nodes);
            }, []), share());
        this._flatNodesTree = this._nodes.pipe(map(nodes => flattenNodesInstancesTree(nodes)), share());
        this._flatNodes = this._flatNodesTree.pipe(map(slides => {
            let nodes = [];
            slides.forEach(s => {
                nodes.push(s);
                nodes = nodes.concat(s.flatNodes);
                updateSlideValidity(s);
            });
            return nodes;
        }), share());
    }
    _removeNodeInstance(nodeInstance) {
        const nodeName = nodeInstanceCompleteName(nodeInstance);
        this._removeNodesVisibilityMapIndex(nodeName);
        this._removeNodesRepetitionMapIndex(nodeName);
        this._removeNodesConditionalBranchMapIndex(nodeName);
        this._removeNodesFormulaMapIndex(nodeName);
        this._removeNodesValidationMapIndex(nodeName);
        this._removeNodesWarningMapIndex(nodeName);
        this._removeNodesNextSlideConditionsMapIndex(nodeName);
        this._removeNodesFilteredChoicesMapIndex(nodeName);
        this._removeNodesTriggerConditionsMapIndex(nodeName);
        if (isSlidesInstance(nodeInstance)) {
            return this._removeSlideInstance(nodeInstance);
        }
        else if (isRepeatingContainerNode(nodeInstance.node)) {
            this._removeNodeGroupInstance(nodeInstance);
        }
        else if (isFieldInstance(nodeInstance)) {
            this._removeFieldInstance(nodeInstance);
        }
        return nodeInstance;
    }
    _removeSlideInstance(slideInstance) {
        const slide = slideInstance.node;
        if (slide.visibility != null) {
            this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach((conditionalBranch) => {
            this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        });
        return slideInstance;
    }
    _removeNodeGroupInstance(nodeGroupInstance) {
        const nodeGroup = nodeGroupInstance.node;
        if (nodeGroup.visibility != null) {
            this._removeFromNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        if (nodeGroupInstance.formulaReps != null && nodeGroup.formulaReps != null) {
            this._removeFromNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
        }
        return nodeGroupInstance;
    }
    _removeFieldInstance(fieldInstance) {
        const formGroup = this._formGroup.getValue();
        const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
        if (formGroup != null && formGroup.contains(fieldInstanceName)) {
            formGroup.removeControl(fieldInstanceName);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next((vmap) => {
                if (vmap[fieldInstanceName] == null) {
                    delete vmap[fieldInstanceName];
                }
                return vmap;
            });
        }
        if (fieldInstance.visibility != null) {
            this._removeFromNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
        }
        fieldInstance.conditionalBranches.forEach((conditionalBranch) => {
            this._removeFromNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
        });
        if (fieldInstance.formula) {
            this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        // TODO: check this, probably is never verified
        if (isRepeatingContainerNode(fieldInstance.node)) {
            const rcInstance = fieldInstance;
            if (rcInstance.formulaReps != null) {
                this._removeFromNodesRepetitionMap(fieldInstance, rcInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach((condition) => {
                this._removeFromNodesValidationMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach((condition) => {
                this._removeFromNodesWarningMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._removeFromNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isFieldWithChoices(fieldInstance.node)) {
            const fwcInstance = fieldInstance;
            if (fwcInstance.choicesFilter != null) {
                this._removeFromNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
                if (fwcInstance.triggerConditions != null) {
                    fwcInstance.triggerConditions.forEach((condition) => {
                        this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                    });
                }
            }
        }
        return fieldInstance;
    }
    _addNodeInstance(nodeInstance) {
        if (isRepeatingContainerNode(nodeInstance.node)) {
            return this._addNodeGroupInstance(nodeInstance);
        }
        else if (isSlideInstance(nodeInstance)) {
            return this._addSlideInstance(nodeInstance);
        }
        else if (isFieldInstance(nodeInstance)) {
            return this._addFieldInstance(nodeInstance);
        }
        return nodeInstance;
    }
    _addFieldInstance(fieldInstance) {
        const formGroup = this._formGroup.getValue();
        const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
        if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
            const control = new FormControl();
            control.setValue(fieldInstance.value);
            formGroup.registerControl(fieldInstanceName, control);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next((vmap) => {
                if (vmap[fieldInstanceName] == null) {
                    vmap[fieldInstanceName] = [];
                }
                if (vmap[fieldInstanceName].indexOf(fieldInstance) == -1) {
                    vmap[fieldInstanceName].push(fieldInstance);
                }
                return vmap;
            });
        }
        else {
            fieldInstance.valid = true;
        }
        if (fieldInstance.visibility != null) {
            this._addToNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
        }
        fieldInstance.conditionalBranches.forEach((conditionalBranch) => {
            this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
        });
        if (fieldInstance.formula) {
            this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        if (isNodeGroupInstance(fieldInstance)) {
            const ngInstance = fieldInstance;
            if (ngInstance.formulaReps != null) {
                this._addToNodesRepetitionMap(fieldInstance, ngInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach((condition) => {
                this._addToNodesValidationMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach((condition) => {
                this._addToNodesWarningMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._addToNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isCustomFieldWithChoices(fieldInstance.node) || isFieldWithChoicesInstance(fieldInstance)) {
            const fwcInstance = fieldInstance;
            if (fwcInstance.choicesFilter != null) {
                this._addToNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
            }
            if (fwcInstance.triggerConditions != null) {
                fwcInstance.triggerConditions.forEach((condition) => {
                    this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                });
            }
        }
        return fieldInstance;
    }
    _addSlideInstance(slideInstance) {
        const slide = slideInstance.node;
        if (slide.visibility != null) {
            this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach((conditionalBranch) => {
            this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        });
        return slideInstance;
    }
    _addNodeGroupInstance(nodeGroupInstance) {
        const nodeGroup = nodeGroupInstance.node;
        if (nodeGroup.visibility != null) {
            this._addToNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        nodeGroupInstance.conditionalBranches.forEach((conditionalBranch) => {
            this._addToNodesConditionalBranchMap(nodeGroupInstance, conditionalBranch.condition);
        });
        if (nodeGroupInstance.formulaReps != null) {
            if (nodeGroup.formulaReps != null) {
                this._addToNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
            }
        }
        else {
            let formGroup = this._formGroup.getValue();
            let nodeGroupInstanceName = nodeInstanceCompleteName(nodeGroupInstance);
            if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
                const control = new FormControl();
                control.setValue(nodeGroupInstance.reps);
                formGroup.registerControl(nodeGroupInstanceName, control);
            }
        }
        return nodeGroupInstance;
    }
    _removeNodesVisibilityMapIndex(index) {
        this._removeNodesMapIndex(this._visibilityNodesMapUpdates, index);
    }
    _removeNodesRepetitionMapIndex(index) {
        this._removeNodesMapIndex(this._repetitionNodesMapUpdates, index);
    }
    _removeNodesConditionalBranchMapIndex(index) {
        this._removeNodesMapIndex(this._conditionalBranchNodesMapUpdates, index);
    }
    _removeNodesFormulaMapIndex(index) {
        this._removeNodesMapIndex(this._formulaNodesMapUpdates, index);
    }
    _removeNodesValidationMapIndex(index) {
        this._removeNodesMapIndex(this._validationNodesMapUpdates, index);
    }
    _removeNodesWarningMapIndex(index) {
        this._removeNodesMapIndex(this._warningNodesMapUpdates, index);
    }
    _removeNodesFilteredChoicesMapIndex(index) {
        this._removeNodesMapIndex(this._filteredChoicesNodesMapUpdates, index);
    }
    _removeNodesTriggerConditionsMapIndex(index) {
        this._removeNodesMapIndex(this._triggerConditionsNodesMapUpdates, index);
    }
    _removeNodesNextSlideConditionsMapIndex(index) {
        this._removeNodesMapIndex(this._nextSlideConditionsNodesMapUpdates, index);
    }
    _removeNodesMapIndex(nodesMap, index) {
        nodesMap.next((vmap) => {
            if (Object.keys(vmap).indexOf(index) > -1) {
                delete vmap[index];
            }
            return vmap;
        });
    }
    _removeFromNodesVisibilityMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesRepetitionMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesConditionalBranchMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesFormulaMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesValidationMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesWarningMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesFilteredChoicesMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesTriggerConditionsMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesNextSlideConditionsMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    }
    _removeFromNodesMap(nodesMap, nodeInstance, formula) {
        let tokens = tokenize(formula).filter((token) => token.type == 'Identifier' && token.value != '$value');
        if (tokens.length > 0) {
            nodesMap.next((vmap) => {
                tokens.forEach((token) => {
                    let tokenName = token.value;
                    if (vmap[tokenName] != null) {
                        const idx = vmap[tokenName].indexOf(nodeInstance);
                        if (idx > -1) {
                            vmap[tokenName].splice(idx, 1);
                            if (vmap[tokenName].length == 0) {
                                delete vmap[tokenName];
                            }
                        }
                    }
                });
                return vmap;
            });
        }
    }
    _addToNodesVisibilityMap(nodeInstance, formula) {
        this._addToNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesRepetitionMap(nodeInstance, formula) {
        this._addToNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesConditionalBranchMap(nodeInstance, formula) {
        this._addToNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesFormulaMap(nodeInstance, formula) {
        this._addToNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesValidationMap(nodeInstance, formula) {
        this._addToNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesWarningMap(nodeInstance, formula) {
        this._addToNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesFilteredChoicesMap(nodeInstance, formula) {
        this._addToNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesTriggerConditionsMap(nodeInstance, formula) {
        this._addToNodesMap(this._triggerConditionsNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesNextSlideConditionsMap(nodeInstance, formula) {
        this._addToNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    }
    _addToNodesMap(nodesMap, nodeInstance, formula) {
        let tokens = tokenize(formula).filter((token) => token.type == 'Identifier' && token.value != '$value');
        if (tokens.length > 0) {
            nodesMap.next((vmap) => {
                tokens.forEach((token) => {
                    let tokenName = token.value;
                    if (vmap[tokenName] == null) {
                        vmap[tokenName] = [];
                    }
                    if (vmap[tokenName].indexOf(nodeInstance) === -1) {
                        vmap[tokenName].push(nodeInstance);
                    }
                });
                return vmap;
            });
        }
    }
}
AjfFormRendererService.decorators = [
    { type: Injectable }
];
AjfFormRendererService.ctorParameters = () => [
    { type: AjfValidationService }
];
export { ɵ0 };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBa0IsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDakMsT0FBTyxFQUNMLGVBQWUsRUFDZixJQUFJLEVBQ0osVUFBVSxFQUNWLEVBQUUsSUFBSSxLQUFLLEVBQ1gsT0FBTyxFQUVQLFlBQVksRUFDWixLQUFLLEVBQ04sTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQ0wsWUFBWSxFQUNaLE1BQU0sRUFDTixHQUFHLEVBQ0gsUUFBUSxFQUNSLGFBQWEsRUFDYixRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULGNBQWMsRUFDZixNQUFNLGdCQUFnQixDQUFDO0FBU3hCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQVczRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFPeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0seURBQXlELENBQUM7QUFDbkcsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFDLHFCQUFx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QyxFQUFFO3dCQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3FCQUNwQztnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7WUFudkNGLFVBQVU7OztZQXRCSCxvQkFBb0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHt0b2tlbml6ZX0gZnJvbSAnZXNwcmltYSc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGZyb20sXG4gIE9ic2VydmFibGUsXG4gIG9mIGFzIG9ic09mLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpYmVyLFxuICBTdWJzY3JpcHRpb24sXG4gIHRpbWVyXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGVib3VuY2VUaW1lLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcGFpcndpc2UsXG4gIHB1Ymxpc2hSZXBsYXksXG4gIHJlZkNvdW50LFxuICBzY2FuLFxuICBzaGFyZSxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXAsXG4gIHdpdGhMYXRlc3RGcm9tXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZVxufSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZvcm11bGFGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2Zvcm11bGEtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZFbXB0eUZpZWxkfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZW1wdHktZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvdGFibGUtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7QWpmVGFibGVGb3JtQ29udHJvbH0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvdGFibGUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXB9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUtZ3JvdXAnO1xuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL29wZXJhdGlvbnMvbm9kZXMtaW5zdGFuY2VzLW9wZXJhdGlvbic7XG5pbXBvcnQge0FqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9ufSBmcm9tICcuL2ludGVyZmFjZS9vcGVyYXRpb25zL3JlbmRlcmVyLXVwZGF0ZS1tYXAtb3BlcmF0aW9uJztcbmltcG9ydCB7QWpmUmVuZGVyZXJVcGRhdGVNYXB9IGZyb20gJy4vaW50ZXJmYWNlL3JlbmRlcmVyLW1hcHMvdXBkYXRlLW1hcCc7XG5pbXBvcnQge0FqZkJhc2VTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL2Jhc2Utc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpbml0Q2hvaWNlc09yaWdpbn0gZnJvbSAnLi91dGlscy9jaG9pY2VzL2luaXQtY2hvaWNlcy1vcmlnaW4nO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2lzVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVGaWVsZEluc3RhbmNlU3RhdGV9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmllbGQtaW5zdGFuY2Utc3RhdGUnO1xuaW1wb3J0IHt1cGRhdGVGaWx0ZXJlZENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmlsdGVyZWQtY2hvaWNlcyc7XG5pbXBvcnQge3VwZGF0ZUZvcm11bGF9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZm9ybXVsYSc7XG5pbXBvcnQge3VwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1uZXh0LXNsaWRlLWNvbmRpdGlvbic7XG5pbXBvcnQge3VwZGF0ZVRyaWdnZXJDb25kaXRpb25zfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLXRyaWdnZXItY29uZGl0aW9ucyc7XG5pbXBvcnQge3VwZGF0ZVZhbGlkYXRpb259IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdmFsaWRhdGlvbic7XG5pbXBvcnQge3VwZGF0ZVdhcm5pbmd9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtd2FybmluZyc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQnO1xuaW1wb3J0IHtpc0N1c3RvbUZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzL2lzLWN1c3RvbS1maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc0luc3RhbmNlc30gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcy10cmVlJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLW5vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7aXNTbGlkZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGVzLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VTdWZmaXh9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2Utc3VmZml4JztcbmltcG9ydCB7bm9kZVRvTm9kZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLXRvLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtY29uZGl0aW9uYWwtYnJhbmNoZXMnO1xuaW1wb3J0IHt1cGRhdGVWaXNpYmlsaXR5fSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtdmlzaWJpbGl0eSc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9mbGF0dGVuLW5vZGVzJztcbmltcG9ydCB7aXNDb250YWluZXJOb2RlfSBmcm9tICcuL3V0aWxzL25vZGVzL2lzLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdDb250YWluZXJOb2RlfSBmcm9tICcuL3V0aWxzL25vZGVzL2lzLXJlcGVhdGluZy1jb250YWluZXItbm9kZSc7XG5pbXBvcnQge29yZGVyZWROb2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9vcmRlcmVkLW5vZGVzJztcbmltcG9ydCB7dXBkYXRlUmVwc051bX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3VwZGF0ZS1yZXBzLW51bSc7XG5pbXBvcnQge3ZhbGlkU2xpZGV9IGZyb20gJy4vdXRpbHMvc2xpZGVzLWluc3RhbmNlcy92YWxpZC1zbGlkZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICcuL3ZhbGlkYXRpb24tc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIEFqZkZvcm1Jbml0U3RhdHVzIHtcbiAgSW5pdGlhbGl6aW5nLFxuICBDb21wbGV0ZVxufVxuXG5jb25zdCB1cGRhdGVTbGlkZVZhbGlkaXR5ID0gKHNsaWRlOiBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfEFqZlNsaWRlSW5zdGFuY2UpID0+IHtcbiAgY29uc3Qgc3ViTm9kZXNOdW0gPSBzbGlkZS5mbGF0Tm9kZXMubGVuZ3RoO1xuICBsZXQgdmFsaWQgPSB0cnVlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN1Yk5vZGVzTnVtOyBpKyspIHtcbiAgICBjb25zdCBzdWJOb2RlID0gc2xpZGUuZmxhdE5vZGVzW2ldO1xuICAgIGlmIChzdWJOb2RlLnZpc2libGUgJiYgaXNGaWVsZEluc3RhbmNlKHN1Yk5vZGUpICYmICEoc3ViTm9kZSBhcyBBamZGaWVsZEluc3RhbmNlKS52YWxpZCkge1xuICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgfVxuICBpZiAoc2xpZGUudmFsaWQgIT09IHZhbGlkKSB7XG4gICAgc2xpZGUudmFsaWQgPSB2YWxpZDtcbiAgfVxufTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZkZvcm1SZW5kZXJlclNlcnZpY2Uge1xuICBwcml2YXRlIF92aXNpYmlsaXR5Tm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9yZXBldGl0aW9uTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2Zvcm11bGFOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Ob2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3dhcm5pbmdOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2Zvcm1Jbml0RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtSW5pdFN0YXR1cz4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1Jbml0U3RhdHVzPigpO1xuICByZWFkb25seSBmb3JtSW5pdEV2ZW50OiBPYnNlcnZhYmxlPEFqZkZvcm1Jbml0U3RhdHVzPiA9XG4gICAgICB0aGlzLl9mb3JtSW5pdEV2ZW50IGFzIE9ic2VydmFibGU8QWpmRm9ybUluaXRTdGF0dXM+O1xuXG4gIHByaXZhdGUgX2Zvcm1Hcm91cDogQmVoYXZpb3JTdWJqZWN0PEZvcm1Hcm91cHxudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9ybUdyb3VwfG51bGw+KG51bGwpO1xuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8Rm9ybUdyb3VwfG51bGw+ID0gdGhpcy5fZm9ybUdyb3VwIGFzIE9ic2VydmFibGU8Rm9ybUdyb3VwfG51bGw+O1xuXG4gIHByaXZhdGUgX2Zvcm06IEJlaGF2aW9yU3ViamVjdDx7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fXxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PHtmb3JtOiBBamZGb3JtIHwgbnVsbCwgY29udGV4dD86IEFqZkNvbnRleHR9fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9ub2RlczogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2Rlc1RyZWU6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnM6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuICBwcml2YXRlIF9lcnJvcnM6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIF9mb3JtR3JvdXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9ub2Rlc01hcHM6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+W107XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlVHJpZ2dlcjogRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4oKTtcbiAgcmVhZG9ubHkgbmV4dFNsaWRlVHJpZ2dlcjogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2U+ID1cbiAgICAgIHRoaXMuX25leHRTbGlkZVRyaWdnZXIgYXMgT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2U+O1xuXG4gIHByaXZhdGUgX3NsaWRlc051bTogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlYWRvbmx5IHNsaWRlc051bTogT2JzZXJ2YWJsZTxudW1iZXI+ID0gdGhpcy5fc2xpZGVzTnVtIGFzIE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBnZXQgbm9kZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2Rlc1RyZWU7XG4gIH1cbiAgZ2V0IGVycm9yUG9zaXRpb25zKCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JQb3NpdGlvbnM7XG4gIH1cbiAgZ2V0IGVycm9ycygpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XG4gIH1cbiAgZ2V0IGN1cnJlbnRTdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uZm9ybSAhPSBudWxsID8gZm9ybS5mb3JtLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMgOiBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXzogQWpmVmFsaWRhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLl9pbml0VXBkYXRlTWFwU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0RXJyb3JzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRGb3JtU3RyZWFtcygpO1xuICAgIHRoaXMuX3VwZGF0ZUZvcm1WYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICBzZXRGb3JtKGZvcm06IEFqZkZvcm18bnVsbCwgY29udGV4dDogQWpmQ29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5faW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTtcbiAgICBpZiAoZm9ybSAhPSBudWxsICYmIE9iamVjdC5rZXlzKGNvbnRleHQpLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICBPYmplY3Qua2V5cyhmb3JtLmluaXRDb250ZXh0IHx8IHt9KS5sZW5ndGggPiAwKSB7XG4gICAgICBjb250ZXh0ID0gZm9ybS5pbml0Q29udGV4dCB8fCB7fTtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudEZvcm0gPSB0aGlzLl9mb3JtLmdldFZhbHVlKCk7XG4gICAgaWYgKChjdXJyZW50Rm9ybSA9PSBudWxsICYmIGZvcm0gIT0gbnVsbCkgfHxcbiAgICAgICAgKGN1cnJlbnRGb3JtICE9IG51bGwgJiYgZm9ybSAhPT0gY3VycmVudEZvcm0uZm9ybSkpIHtcbiAgICAgIHRoaXMuX2Zvcm0ubmV4dCh7Zm9ybTogZm9ybSwgY29udGV4dDogY29udGV4dH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1WYWx1ZSgpOiBhbnkge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBsZXQgcmVzID0gZGVlcENvcHkoZm9ybUdyb3VwLnZhbHVlKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYWRkR3JvdXAoZ3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGlmIChncm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbWF4UmVwcyA9IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGlmIChtYXhSZXBzID4gMCAmJiBncm91cC5yZXBzICsgMSA+IG1heFJlcHMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRSZXBzID0gZ3JvdXAucmVwcztcbiAgICAgIGdyb3VwLnJlcHMgPSBncm91cC5yZXBzICsgMTtcbiAgICAgIGdyb3VwLmNhbkFkZCA9IGdyb3VwLm5vZGUubWF4UmVwcyA9PT0gMCB8fCBncm91cC5yZXBzIDwgZ3JvdXAubm9kZS5tYXhSZXBzO1xuICAgICAgZ3JvdXAuY2FuUmVtb3ZlID0gZ3JvdXAubm9kZS5taW5SZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPiBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMobm9kZXMsIHRydWUpO1xuICAgICAgICB0aGlzLl9hZGp1c3RSZXBzKGZsYXROb2RlcywgZ3JvdXAsIG9sZFJlcHMsIHRoaXMuZ2V0Rm9ybVZhbHVlKCkpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodHJ1ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVHcm91cChncm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2V8QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgaWYgKGdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBtaW5SZXBzID0gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgaWYgKGdyb3VwLnJlcHMgLSAxIDwgbWluUmVwcykge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFJlcHMgPSBncm91cC5yZXBzO1xuICAgICAgZ3JvdXAucmVwcyA9IGdyb3VwLnJlcHMgLSAxO1xuICAgICAgZ3JvdXAuY2FuQWRkID0gZ3JvdXAubm9kZS5tYXhSZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPCBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBncm91cC5jYW5SZW1vdmUgPSBncm91cC5ub2RlLm1pblJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA+IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgIHRoaXMuX2FkanVzdFJlcHMobm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJvbChmaWVsZDogQWpmRmllbGRJbnN0YW5jZSk6IE9ic2VydmFibGU8QWJzdHJhY3RDb250cm9sfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXAucGlwZShtYXAoKGYpID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZCk7XG4gICAgICByZXR1cm4gZiAhPSBudWxsICYmIGYuY29udGFpbnMoZmllbGROYW1lKSA/IGYuY29udHJvbHNbZmllbGROYW1lXSA6IG51bGw7XG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEVycm9yc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JQb3NpdGlvbnMgPSB0aGlzLl92YWx1ZUNoYW5nZWQucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fbm9kZXMsIHRoaXMuX2Zvcm0pLFxuICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAoW18sIF9fLCBmb3JtXSkgPT4gZm9ybSAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgKGZvcm0gYXMge2Zvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0PzogQWpmQ29udGV4dH0pLmZvcm0gIT0gbnVsbCksXG4gICAgICAgIG1hcCgoW18sIG5vZGVzLCBmb3JtRGVmXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm0gPSAoZm9ybURlZiBhcyB7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fSkuZm9ybSBhcyBBamZGb3JtO1xuICAgICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgICAgIGNvbnN0IGVycm9yczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAobm9kZXMgYXMgQWpmTm9kZUluc3RhbmNlW10pLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJzTm9kZSA9IG5vZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByc05vZGUucmVwczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJzTm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmICghdmFsaWRTbGlkZShyc05vZGUsIGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc05vZGUgPSBub2RlIGFzIEFqZlNsaWRlSW5zdGFuY2U7XG4gICAgICAgICAgICAgIGlmIChzTm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgc05vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgaWYgKCFzTm9kZS52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBmb3JtLnZhbGlkID0gZXJyb3JzLmxlbmd0aCA9PSAwO1xuICAgICAgICAgIHRoaXMuX3NsaWRlc051bS5uZXh0KGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICAgICAgfSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICAgIHRoaXMuX2Vycm9ycyA9IHRoaXMuX2Vycm9yUG9zaXRpb25zLnBpcGUoXG4gICAgICAgIG1hcChlID0+IGUgIT0gbnVsbCA/IGUubGVuZ3RoIDogMCksXG4gICAgICAgIHN0YXJ0V2l0aCgwKSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgpLFxuICAgICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VXBkYXRlTWFwU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge30pLFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSBhcyBBamZSZW5kZXJlclVwZGF0ZU1hcCksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSxcbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuX2Zvcm11bGFOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgIChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7fSksXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9IGFzIEFqZlJlbmRlcmVyVXBkYXRlTWFwKSxcbiAgICAgICAgICAgICAgICBzaGFyZSgpLFxuICAgICAgICAgICAgKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge30pLFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSBhcyBBamZSZW5kZXJlclVwZGF0ZU1hcCksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSxcbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5fd2FybmluZ05vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge30pLFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSBhcyBBamZSZW5kZXJlclVwZGF0ZU1hcCksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSxcbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge30pLFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSBhcyBBamZSZW5kZXJlclVwZGF0ZU1hcCksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSxcbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuXG4gICAgdGhpcy5fbm9kZXNNYXBzID0gW1xuICAgICAgdGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwLCB0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXAsIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXAsXG4gICAgICB0aGlzLl9mb3JtdWxhTm9kZXNNYXAsIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcCwgdGhpcy5fd2FybmluZ05vZGVzTWFwLFxuICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwLCB0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcCxcbiAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm1PYnMgPSB0aGlzLl9mb3JtO1xuICAgIGZvcm1PYnNcbiAgICAgICAgLnBpcGUobWFwKChfZm9ybSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0Rm9ybUdyb3VwU3RyZWFtcyhuZXcgRm9ybUdyb3VwKHt9KSk7XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvcm1Hcm91cCk7XG4gICAgZm9ybU9ic1xuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcChmb3JtID0+IHtcbiAgICAgICAgICAgICAgaWYgKGZvcm0gPT0gbnVsbCB8fCBmb3JtLmZvcm0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYnNPZihmb3JtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjaG9pY2VzT3JpZ2lucyA9IGZvcm0uZm9ybS5jaG9pY2VzT3JpZ2lucyB8fCBbXTtcbiAgICAgICAgICAgICAgaWYgKGNob2ljZXNPcmlnaW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYnNPZihmb3JtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZnJvbShQcm9taXNlLmFsbChjaG9pY2VzT3JpZ2lucy5tYXAoY28gPT4gaW5pdENob2ljZXNPcmlnaW4oY28pKSkpXG4gICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICBtYXAoKCkgPT4gZm9ybSksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKGZvcm1EZWYpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIChfbm9kZXNJbnN0YW5jZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICAgICAgICAgIGxldCBub2RlczogQWpmTm9kZUluc3RhbmNlW107XG4gICAgICAgICAgICAgICAgaWYgKGZvcm1EZWYgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAoZm9ybURlZiBhcyB7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fSkuZm9ybSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBmb3JtID0gKGZvcm1EZWYgYXMge2Zvcm06IEFqZkZvcm0sIGNvbnRleHQ6IEFqZkNvbnRleHR9KTtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGJhc2VOb2RlcyA9IGZvcm0uZm9ybS5ub2RlcztcbiAgICAgICAgICAgICAgICAgIG5vZGVzID0gdGhpcy5fb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICAgICAgICAgICAgICAgICAgICBmbGF0dGVuTm9kZXMoYmFzZU5vZGVzKSwgYmFzZU5vZGVzLCB1bmRlZmluZWQsIFtdLCBmb3JtLmNvbnRleHQgfHwge30pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBub2RlcyA9IFtdO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgICAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAobm9kZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCByc05vZGUgPSBub2RlIGFzIEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnNOb2RlLnJlcHM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICByc05vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc05vZGUgPSBub2RlIGFzIEFqZlNsaWRlSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmIChzTm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICAgICAgc05vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIClcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9ub2Rlc1VwZGF0ZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVJbnN0YW5jZShcbiAgICAgIGFsbE5vZGVzOiBBamZOb2RlW118QWpmTm9kZUluc3RhbmNlW10sIG5vZGU6IEFqZk5vZGUsIHByZWZpeDogbnVtYmVyW10sIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgICBicmFuY2hWaXNpYmlsaXR5ID0gdHJ1ZSk6IEFqZk5vZGVJbnN0YW5jZXxudWxsIHtcbiAgICBsZXQgaW5zdGFuY2UgPSBub2RlVG9Ob2RlSW5zdGFuY2UoYWxsTm9kZXMsIG5vZGUsIHByZWZpeCwgY29udGV4dCk7XG4gICAgaWYgKGluc3RhbmNlICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IG5vZGVUeXBlID0gaW5zdGFuY2Uubm9kZS5ub2RlVHlwZTtcbiAgICAgIGlmIChub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwIHx8IG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgICB0aGlzLl9leHBsb2RlUmVwZWF0aW5nTm9kZShcbiAgICAgICAgICAgIGFsbE5vZGVzLCBpbnN0YW5jZSBhcyBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIGlmIChub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUpIHtcbiAgICAgICAgY29uc3Qgc0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgc0luc3RhbmNlLm5vZGVzID0gdGhpcy5fb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICAgICAgICAgIGFsbE5vZGVzLCBzSW5zdGFuY2Uubm9kZS5ub2Rlcywgc0luc3RhbmNlLm5vZGUuaWQsIHByZWZpeCwgY29udGV4dCk7XG4gICAgICB9XG4gICAgICB1cGRhdGVWaXNpYmlsaXR5KGluc3RhbmNlLCBjb250ZXh0LCBicmFuY2hWaXNpYmlsaXR5KTtcbiAgICAgIHVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXMoaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgaWYgKG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZGaWVsZCkge1xuICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuXG4gICAgICAgIGlmIChpc0N1c3RvbUZpZWxkV2l0aENob2ljZXMoZkluc3RhbmNlLm5vZGUpIHx8IGlzRmllbGRXaXRoQ2hvaWNlcyhmSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgICAgICB1cGRhdGVGaWx0ZXJlZENob2ljZXMoZkluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+LCBjb250ZXh0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNUYWJsZUZpZWxkSW5zdGFuY2UoZkluc3RhbmNlKSkge1xuICAgICAgICAgICAgY29uc3QgdGZJbnN0YW5jZSA9IGZJbnN0YW5jZSBhcyBBamZUYWJsZUZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICBjb25zdCB0Tm9kZSA9IHRmSW5zdGFuY2Uubm9kZTtcbiAgICAgICAgICAgIHRmSW5zdGFuY2UuY29udGV4dCA9IGNvbnRleHRbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKHRmSW5zdGFuY2UpXSB8fCBjb250ZXh0O1xuICAgICAgICAgICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgICAgICBsZXQgY29udHJvbHNXaXRoTGFiZWxzOiBbc3RyaW5nLCAoc3RyaW5nIHwgQWpmVGFibGVGb3JtQ29udHJvbClbXV1bXSA9IFtdO1xuICAgICAgICAgICAgY29udHJvbHNXaXRoTGFiZWxzLnB1c2goW25vZGUubGFiZWwsIHROb2RlLmNvbHVtbkxhYmVsc10pO1xuICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHROb2RlLnJvd3MuZm9yRWFjaCgocm93LCByb3dJZHgpID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgcjogQWpmVGFibGVGb3JtQ29udHJvbFtdID0gW107XG4gICAgICAgICAgICAgICAgKHJvdyBhcyBBamZUYWJsZUNlbGxbXSkuZm9yRWFjaCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgZXZlcnkgY29udHJvbCBpcyByZWdpc3RlcmVkIHdpdGggdGhlIGNlbGwgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgIGluc2lkZSB0aGUgZm9ybSBjb250cm9sIG1hdHJpeFxuICAgICAgICAgICAgICAgICAgd2l0aCB0aGlzIG1hc2sgYCR7dE5vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YFxuICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgJHt0Tm9kZS5uYW1lfV9fJHtyb3dJZHh9X18ke2lkeH1gO1xuICAgICAgICAgICAgICAgICAgY29uc3QgdGFibGVGb3JtQ29udHJvbDpcbiAgICAgICAgICAgICAgICAgICAgICBBamZUYWJsZUZvcm1Db250cm9sID0ge2NvbnRyb2w6IG5ldyBGb3JtQ29udHJvbCgpLCBzaG93OiBmYWxzZX07XG4gICAgICAgICAgICAgICAgICB0YWJsZUZvcm1Db250cm9sLmNvbnRyb2wuc2V0VmFsdWUodGZJbnN0YW5jZS5jb250ZXh0W2NlbGwuZm9ybXVsYV0pO1xuICAgICAgICAgICAgICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChuYW1lLCB0YWJsZUZvcm1Db250cm9sLmNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgci5wdXNoKHRhYmxlRm9ybUNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgLyogY3JlYXRlIGEgb2JqZWN0IHRoYXQgcmVzcGVjdCB0aGUgaW5zdGFuY2UgaW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgICB3aXRoIHRoZSBtaW5pbXVtIGRlZmluZWQgcHJvcGVydGllcyB0byBhbGxvdyB0byBydW4gYWRkVG9Ob2RlRm9ybXVsYSBtYXAqL1xuICAgICAgICAgICAgICAgICAgY29uc3QgZmFrZUluc3RhbmNlID0ge1xuICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogY2VsbC5mb3JtdWxhfSxcbiAgICAgICAgICAgICAgICAgICAgbm9kZToge25hbWUsIG5vZGVUeXBlOiAwLCBlZGl0YWJsZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFtdLFxuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEV2dDogbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpXG4gICAgICAgICAgICAgICAgICB9IGFzIHVua25vd24gYXMgQWpmTm9kZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0Zvcm11bGFNYXAoZmFrZUluc3RhbmNlLCBjZWxsLmZvcm11bGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xzV2l0aExhYmVscy5wdXNoKFt0Tm9kZS5yb3dMYWJlbHNbcm93SWR4XSwgcl0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGZJbnN0YW5jZS5jb250cm9scyA9IGNvbnRyb2xzV2l0aExhYmVscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZkluc3RhbmNlLnZhbHVlID0gY29udGV4dFtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlRmllbGRJbnN0YW5jZVN0YXRlKGZJbnN0YW5jZSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX2FkZE5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgfVxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkanVzdFJlcHMoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBpbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlLFxuICAgICAgb2xkUmVwczogbnVtYmVyLFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCk6IHthZGRlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbCwgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbH0ge1xuICAgIGNvbnN0IG5ld1JlcHMgPSBpbnN0YW5jZS5yZXBzO1xuICAgIGNvbnN0IHJlc3VsdDpcbiAgICAgICAge2FkZGVkOiBBamZOb2RlSW5zdGFuY2VbXXxudWxsLFxuICAgICAgICAgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbH0gPSB7YWRkZWQ6IG51bGwsIHJlbW92ZWQ6IG51bGx9O1xuICAgIGlmIChvbGRSZXBzIDwgbmV3UmVwcykge1xuICAgICAgY29uc3QgbmV3Tm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZXMgPT0gbnVsbCkge1xuICAgICAgICBpbnN0YW5jZS5ub2RlcyA9IFtdO1xuICAgICAgfVxuICAgICAgaWYgKGluc3RhbmNlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCkge1xuICAgICAgICBjb25zdCBub2RlID0gY3JlYXRlRmllbGQoe1xuICAgICAgICAgICAgICAgICAgICAgICBpZDogOTk5LFxuICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlOiBBamZGaWVsZFR5cGUuRW1wdHksXG4gICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBpbnN0YW5jZS5ub2RlLmxhYmVsXG4gICAgICAgICAgICAgICAgICAgICB9KSBhcyBBamZFbXB0eUZpZWxkO1xuICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9XG4gICAgICAgICAgICB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBpbnN0YW5jZS5wcmVmaXguc2xpY2UoMCksIGNvbnRleHQpO1xuICAgICAgICBpZiAobmV3SW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgICAgIGluc3RhbmNlLm5vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gb2xkUmVwczsgaSA8IG5ld1JlcHM7IGkrKykge1xuICAgICAgICBjb25zdCBwcmVmaXggPSBpbnN0YW5jZS5wcmVmaXguc2xpY2UoMCk7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gaW5zdGFuY2Uubm9kZTtcbiAgICAgICAgcHJlZml4LnB1c2goaSk7XG4gICAgICAgIG9yZGVyZWROb2Rlcyhncm91cC5ub2RlcywgaW5zdGFuY2Uubm9kZS5pZCkuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gdGhpcy5faW5pdE5vZGVJbnN0YW5jZShhbGxOb2RlcywgbiwgcHJlZml4LCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAobmV3SW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICBpbnN0YW5jZS5ub2Rlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9hZGROb2RlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmFkZGVkID0gbmV3Tm9kZXM7XG4gICAgfSBlbHNlIGlmIChvbGRSZXBzID4gbmV3UmVwcykge1xuICAgICAgbGV0IG5vZGVzTnVtID0gaW5zdGFuY2Uubm9kZXMubGVuZ3RoIC8gb2xkUmVwcztcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXApIHtcbiAgICAgICAgbm9kZXNOdW0rKztcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5yZW1vdmVkID0gaW5zdGFuY2Uubm9kZXMuc3BsaWNlKG5ld1JlcHMgKiBub2Rlc051bSwgbm9kZXNOdW0pO1xuICAgICAgcmVzdWx0LnJlbW92ZWQuZm9yRWFjaCgobiA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU5vZGVJbnN0YW5jZShuKTtcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKG9sZFJlcHMgIT0gbmV3UmVwcyAmJiBpbnN0YW5jZS5mb3JtdWxhUmVwcyA9PSBudWxsKSB7XG4gICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgY29uc3QgY29tcGxldGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKTtcbiAgICAgIGlmIChmZyAhPSBudWxsICYmIGZnLmNvbnRhaW5zKGNvbXBsZXRlTmFtZSkpIHtcbiAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShpbnN0YW5jZS5yZXBzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaW5zdGFuY2UuZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzSW5zdGFuY2VzKGluc3RhbmNlLm5vZGVzKTtcbiAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgIGNvbnN0IHJzSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlO1xuICAgICAgY29uc3Qgc2xpZGVOb2RlczogQWpmTm9kZUluc3RhbmNlW11bXSA9IFtdO1xuICAgICAgY29uc3Qgbm9kZXNQZXJTbGlkZSA9XG4gICAgICAgICAgcnNJbnN0YW5jZS5ub2RlcyAhPSBudWxsID8gcnNJbnN0YW5jZS5ub2Rlcy5sZW5ndGggLyByc0luc3RhbmNlLnJlcHMgOiAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZS5yZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3RhcnROb2RlID0gaSAqIG5vZGVzUGVyU2xpZGU7XG4gICAgICAgIHNsaWRlTm9kZXMucHVzaChpbnN0YW5jZS5ub2Rlcy5zbGljZShzdGFydE5vZGUsIHN0YXJ0Tm9kZSArIG5vZGVzUGVyU2xpZGUpKTtcbiAgICAgIH1cbiAgICAgIHJzSW5zdGFuY2Uuc2xpZGVOb2RlcyA9IHNsaWRlTm9kZXM7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGb3JtVmFsdWVBbmRWYWxpZGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2Rlc1VwZGF0ZXNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9mb3JtR3JvdXApLFxuICAgICAgICAgICAgZmlsdGVyKChbXywgZmddKSA9PiBmZyAhPT0gbnVsbCksXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUoKFtfLCBmZ10pID0+IHtcbiAgICAgICAgICBjb25zdCBmb3JtID0gZmcgYXMgRm9ybUdyb3VwO1xuICAgICAgICAgIGZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2V4cGxvZGVSZXBlYXRpbmdOb2RlKFxuICAgICAgYWxsTm9kZXM6IEFqZk5vZGVbXXxBamZOb2RlSW5zdGFuY2VbXSxcbiAgICAgIGluc3RhbmNlOiBBamZOb2RlR3JvdXBJbnN0YW5jZXxBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLCBjb250ZXh0OiBBamZDb250ZXh0KSB7XG4gICAgY29uc3Qgb2xkUmVwcyA9IHVwZGF0ZVJlcHNOdW0oaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIGlmIChvbGRSZXBzICE9PSBpbnN0YW5jZS5yZXBzKSB7XG4gICAgICB0aGlzLl9hZGp1c3RSZXBzKGFsbE5vZGVzLCBpbnN0YW5jZSwgb2xkUmVwcywgY29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICAgIGFsbE5vZGVzOiBBamZOb2RlW118QWpmTm9kZUluc3RhbmNlW10sIG5vZGVzOiBBamZOb2RlW10sIHBhcmVudDogbnVtYmVyfG51bGwgPSBudWxsLFxuICAgICAgcHJlZml4OiBudW1iZXJbXSA9IFtdLCBjb250ZXh0OiBBamZDb250ZXh0KTogQWpmTm9kZUluc3RhbmNlW10ge1xuICAgIGxldCBub2Rlc0luc3RhbmNlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICBjb25zdCBjdXJTdWZmaXggPSBwcmVmaXgubGVuZ3RoID4gMCA/ICdfXycgKyBwcmVmaXguam9pbignX18nKSA6ICcnO1xuICAgIG9yZGVyZWROb2Rlcyhub2RlcywgcGFyZW50KS5mb3JFYWNoKChub2RlOiBBamZOb2RlKSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnROb2RlSW5zdGFuY2UgPSBub2Rlc0luc3RhbmNlcy5maW5kKFxuICAgICAgICAgIG5pID0+IG5pLm5vZGUuaWQgPT0gbm9kZS5wYXJlbnQgJiYgbm9kZUluc3RhbmNlU3VmZml4KG5pKSA9PSBjdXJTdWZmaXgpO1xuICAgICAgY29uc3QgYnJhbmNoVmlzaWJpbGl0eSA9IHBhcmVudE5vZGVJbnN0YW5jZSAhPSBudWxsID9cbiAgICAgICAgICBwYXJlbnROb2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2ggIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBwYXJlbnROb2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2ggPT0gbm9kZS5wYXJlbnROb2RlIDpcbiAgICAgICAgICB0cnVlO1xuICAgICAgY29uc3Qgbm5pID0gdGhpcy5faW5pdE5vZGVJbnN0YW5jZShhbGxOb2Rlcywgbm9kZSwgcHJlZml4LCBjb250ZXh0LCBicmFuY2hWaXNpYmlsaXR5KTtcbiAgICAgIGlmIChubmkgIT0gbnVsbCkge1xuICAgICAgICBub2Rlc0luc3RhbmNlcy5wdXNoKG5uaSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vZGVzSW5zdGFuY2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybVZhbHVlRGVsdGEob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMobmV3VmFsdWUpLmZpbHRlcigoaykgPT4gb2xkVmFsdWVba10gIT09IG5ld1ZhbHVlW2tdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtR3JvdXBTdHJlYW1zKGZvcm1Hcm91cDogRm9ybUdyb3VwKTogRm9ybUdyb3VwIHtcbiAgICB0aGlzLl9mb3JtR3JvdXBTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBsZXQgaW5pdCA9IHRydWU7XG4gICAgbGV0IGluaXRGb3JtID0gdHJ1ZTtcbiAgICB0aGlzLl9mb3JtSW5pdEV2ZW50LmVtaXQoQWpmRm9ybUluaXRTdGF0dXMuSW5pdGlhbGl6aW5nKTtcbiAgICB0aGlzLl9mb3JtR3JvdXBTdWJzY3JpcHRpb24gPVxuICAgICAgICBmb3JtR3JvdXAudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgYW55KSxcbiAgICAgICAgICAgICAgICBwYWlyd2lzZSgpLFxuICAgICAgICAgICAgICAgIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tPFxuICAgICAgICAgICAgICAgICAgICBbYW55LCBhbnldLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgW2FueSwgYW55XSwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgQWpmTm9kZUluc3RhbmNlW11cbiAgICAgICAgICAgICAgICAgICAgXT4oLi4uKHRoaXMuX25vZGVzTWFwcyksIHRoaXMuX2ZsYXROb2RlcyksXG4gICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgIFthbnksIGFueV0sIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZk5vZGVJbnN0YW5jZVtdXG4gICAgICAgICAgICAgICAgICAgICAgIF0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgb2xkRm9ybVZhbHVlID0gaW5pdCAmJiB7fSB8fCB2WzBdWzBdO1xuICAgICAgICAgICAgICBpbml0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld0Zvcm1WYWx1ZSA9IHZbMF1bMV07XG4gICAgICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlNYXAgPSB2WzFdO1xuICAgICAgICAgICAgICBjb25zdCByZXBldGl0aW9uTWFwID0gdlsyXTtcbiAgICAgICAgICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlc01hcCA9IHZbM107XG4gICAgICAgICAgICAgIGNvbnN0IGZvcm11bGFNYXAgPSB2WzRdO1xuICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWFwID0gdls1XTtcbiAgICAgICAgICAgICAgY29uc3Qgd2FybmluZ01hcCA9IHZbNl07XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRTbGlkZUNvbmRpdGlvbnNNYXAgPSB2WzddO1xuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZENob2ljZXNNYXAgPSB2WzhdO1xuICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyQ29uZGl0aW9uc01hcCA9IHZbOV07XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gdlsxMF07XG5cbiAgICAgICAgICAgICAgLy8gdGFrZXMgdGhlIG5hbWVzIG9mIHRoZSBmaWVsZHMgdGhhdCBoYXZlIGNoYW5nZWRcbiAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSB0aGlzLl9mb3JtVmFsdWVEZWx0YShvbGRGb3JtVmFsdWUsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGNvbnN0IGRlbHRhTGVuID0gZGVsdGEubGVuZ3RoO1xuICAgICAgICAgICAgICBsZXQgdXBkYXRlZE5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuXG4gICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgZm9yIGVhY2ggZmllbGQgdXBkYXRlIGFsbCBwcm9wZXJ0aWVzIG1hcFxuICAgICAgICAgICAgICAgIHdpdGggdGhlIGZvbGxvd2luZyBydWxlICBcImlmIGZpZWxkbmFtZSBpcyBpbiBtYXAgdXBkYXRlIGl0XCIgYW5kXG4gICAgICAgICAgICAgICAgcHVzaCBvbiB1cGRhdGVOb2RlcyB0aGUgbm9kZSBpbnN0YW5jZSB0aGF0IHdyYXAgZmllbGRcbiAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgZGVsdGEuZm9yRWFjaCgoZmllbGROYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzID0gdXBkYXRlZE5vZGVzLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZmlsdGVyKG4gPT4gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG4pID09PSBmaWVsZE5hbWUpKTtcbiAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eU1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHlNYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hhbmdlZCA9IHVwZGF0ZVZpc2liaWxpdHkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0ZpZWxkID0gaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5Q2hhbmdlZCAmJiAhbm9kZUluc3RhbmNlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocyAmJiAhcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlKS52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZpc2liaWxpdHlDaGFuZ2VkICYmIG5vZGVJbnN0YW5jZS52aXNpYmxlICYmIGlzRmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUocmVzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcGV0aXRpb25NYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICByZXBldGl0aW9uTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJuSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZFJlcHMgPSB1cGRhdGVSZXBzTnVtKHJuSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFJlcHMgIT09IHJuSW5zdGFuY2UucmVwcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhub2Rlcywgcm5JbnN0YW5jZSwgb2xkUmVwcywgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbmRpdGlvbmFsQnJhbmNoZXNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGJyYW5jaENoYW5nZWQgPSBub2RlSW5zdGFuY2UudXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGJyYW5jaENoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVyaWZpZWRCcmFuY2ggPSBub2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2g7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKF9jb25kaXRpb24sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT0gdmVyaWZpZWRCcmFuY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dTdWJ0cmVlKG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIG5vZGVJbnN0YW5jZSwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZVN1YnRyZWUobmV3Rm9ybVZhbHVlLCBub2Rlcywgbm9kZUluc3RhbmNlLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm11bGFNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBmb3JtdWxhTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEoZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZhbGlkYXRpb24oZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmcuY29udHJvbHNbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSldLnNldFZhbHVlKHJlcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUuJHZhbHVlID0gbmV3Rm9ybVZhbHVlW25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpXTtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVWYWxpZGF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSwgdGhpcy5jdXJyZW50U3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHdhcm5pbmdNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVdhcm5pbmcoZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmSW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMuZmlsdGVyKHdhcm5pbmcgPT4gd2FybmluZy5yZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZS53YXJuaW5nVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkZWx0YUxlbiA9PSAxICYmIG5leHRTbGlkZUNvbmRpdGlvbnNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBpZiAobmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9uKGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmV4dFNsaWRlVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkQ2hvaWNlc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQ2hvaWNlc01hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhTGVuID09IDEgJiYgdHJpZ2dlckNvbmRpdGlvbnNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB0cmlnZ2VyQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdLmZpbHRlcigobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNGaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlVHJpZ2dlckNvbmRpdGlvbnMoXG4gICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4sIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKHJlc1swXSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55Pikuc2VsZWN0aW9uVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZUlkeCA9IG5vZGVzLmluZGV4T2Yobik7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IG5vZGVJZHggLSAxO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTm9kZSA9IG5vZGVzW2lkeF07XG4gICAgICAgICAgICAgICAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShjdXJOb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTbGlkZVZhbGlkaXR5KGN1ck5vZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICBjdXJOb2RlLnVwZGF0ZWRFdnQuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWR4LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG4udXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoaW5pdEZvcm0pIHtcbiAgICAgICAgICAgICAgICBpbml0Rm9ybSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1Jbml0RXZlbnQuZW1pdChBamZGb3JtSW5pdFN0YXR1cy5Db21wbGV0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VkLm5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIHJldHVybiBmb3JtR3JvdXA7XG4gIH1cblxuICBwcml2YXRlIF9zaG93U3VidHJlZShcbiAgICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgbm9kZTogQWpmTm9kZUluc3RhbmNlLCBicmFuY2g/OiBudW1iZXIpIHtcbiAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2Rlcywgbm9kZSwgdHJ1ZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVTdWJ0cmVlKFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCwgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UsIGJyYW5jaD86IG51bWJlcikge1xuICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBub2RlLCBmYWxzZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCwgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UsIHZpc2libGU6IGJvb2xlYW4sXG4gICAgICBicmFuY2g/OiBudW1iZXIpIHtcbiAgICBsZXQgc3ViTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdO1xuICAgIGNvbnN0IG5vZGVTdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobm9kZSk7XG4gICAgaWYgKGJyYW5jaCAhPSBudWxsKSB7XG4gICAgICBzdWJOb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG4pO1xuICAgICAgICByZXR1cm4gc3VmZml4ID09IG5vZGVTdWZmaXggJiYgbi5ub2RlLnBhcmVudCA9PSBub2RlLm5vZGUuaWQgJiYgbi5ub2RlLnBhcmVudE5vZGUgPT0gYnJhbmNoO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Yk5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4ge1xuICAgICAgICBjb25zdCBzdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobik7XG4gICAgICAgIHJldHVybiBzdWZmaXggPT0gbm9kZVN1ZmZpeCAmJiBuLm5vZGUucGFyZW50ID09IG5vZGUubm9kZS5pZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBpc0NvbnRhaW5lciA9IGlzQ29udGFpbmVyTm9kZShub2RlLm5vZGUpO1xuICAgIHN1Yk5vZGVzLmZvckVhY2goKG4pID0+IHtcbiAgICAgIGlmICghaXNDb250YWluZXIgfHxcbiAgICAgICAgICAoaXNDb250YWluZXIgJiYgKDxBamZOb2RlR3JvdXA+bm9kZS5ub2RlKS5ub2Rlcy5maW5kKGNuID0+IGNuLmlkID09IG4ubm9kZS5pZCkgPT0gbnVsbCkpIHtcbiAgICAgICAgdXBkYXRlVmlzaWJpbGl0eShuLCBjb250ZXh0LCB2aXNpYmxlKTtcbiAgICAgICAgdXBkYXRlRm9ybXVsYShuIGFzIEFqZkZvcm11bGFGaWVsZEluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG4sIHZpc2libGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9XG4gICAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5waXBlKHNjYW4oKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgb3A6IEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl9mbGF0Tm9kZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShtYXAobm9kZXMgPT4gZmxhdHRlbk5vZGVzSW5zdGFuY2VzVHJlZShub2RlcykpLCBzaGFyZSgpKTtcbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9mbGF0Tm9kZXNUcmVlLnBpcGUoXG4gICAgICAgIG1hcChzbGlkZXMgPT4ge1xuICAgICAgICAgIGxldCBub2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgIG5vZGVzLnB1c2gocyk7XG4gICAgICAgICAgICBub2RlcyA9IG5vZGVzLmNvbmNhdChzLmZsYXROb2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVTbGlkZVZhbGlkaXR5KHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgfSksXG4gICAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IEFqZk5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1Zpc2liaWxpdHlNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNSZXBldGl0aW9uTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNGb3JtdWxhTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVmFsaWRhdGlvbk1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1dhcm5pbmdNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgaWYgKGlzU2xpZGVzSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbW92ZVNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZkJhc2VTbGlkZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVTbGlkZUluc3RhbmNlKHNsaWRlSW5zdGFuY2U6IEFqZkJhc2VTbGlkZUluc3RhbmNlKTogQWpmQmFzZVNsaWRlSW5zdGFuY2Uge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChzbGlkZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBzbGlkZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpOlxuICAgICAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlR3JvdXAgPSBub2RlR3JvdXBJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChub2RlR3JvdXAudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBpZiAobm9kZUdyb3VwSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCAmJiBub2RlR3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZUdyb3VwSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGaWVsZEluc3RhbmNlKGZpZWxkSW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBmaWVsZEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZEluc3RhbmNlKTtcbiAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgZm9ybUdyb3VwLmNvbnRhaW5zKGZpZWxkSW5zdGFuY2VOYW1lKSkge1xuICAgICAgZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woZmllbGRJbnN0YW5jZU5hbWUpO1xuICAgIH1cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgZGVsZXRlIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGZpZWxkSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYSkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzRm9ybXVsYU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmZvcm11bGEuZm9ybXVsYSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogY2hlY2sgdGhpcywgcHJvYmFibHkgaXMgbmV2ZXIgdmVyaWZpZWRcbiAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKGZpZWxkSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgIGNvbnN0IHJjSW5zdGFuY2UgPSAoZmllbGRJbnN0YW5jZSBhcyBBamZOb2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKTtcbiAgICAgIGlmIChyY0luc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChmaWVsZEluc3RhbmNlLCByY0luc3RhbmNlLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCAmJiBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmFsaWRhdGlvbk1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS53YXJuaW5nLmNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1dhcm5pbmdNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICAgICAgICBmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZmllbGRJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBmaWVsZEluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+O1xuICAgICAgaWYgKGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAoZmllbGRJbnN0YW5jZSwgZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlci5mb3JtdWxhKTtcbiAgICAgICAgaWYgKGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICBmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGROb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpOiBBamZOb2RlSW5zdGFuY2Uge1xuICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZUluc3RhbmNlLm5vZGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZFNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZlNsaWRlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZGRGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRmllbGRJbnN0YW5jZShmaWVsZEluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgY29uc3QgZmllbGRJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGRJbnN0YW5jZSk7XG4gICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmICFmb3JtR3JvdXAuY29udGFpbnMoZmllbGRJbnN0YW5jZU5hbWUpKSB7XG4gICAgICBjb25zdCBjb250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgICBjb250cm9sLnNldFZhbHVlKGZpZWxkSW5zdGFuY2UudmFsdWUpO1xuICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChmaWVsZEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgfVxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcy5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXS5pbmRleE9mKGZpZWxkSW5zdGFuY2UpID09IC0xKSB7XG4gICAgICAgICAgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV0ucHVzaChmaWVsZEluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGZpZWxkSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGEpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNGb3JtdWxhTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYS5mb3JtdWxhKTtcbiAgICB9XG5cbiAgICBpZiAoaXNOb2RlR3JvdXBJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgY29uc3QgbmdJbnN0YW5jZSA9IGZpZWxkSW5zdGFuY2UgYXMgQWpmTm9kZUluc3RhbmNlIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlO1xuICAgICAgaWYgKG5nSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChmaWVsZEluc3RhbmNlLCBuZ0luc3RhbmNlLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCAmJiBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1ZhbGlkYXRpb25NYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2Uud2FybmluZy5jb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzV2FybmluZ01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICAgICAgICBmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChpc0N1c3RvbUZpZWxkV2l0aENob2ljZXMoZmllbGRJbnN0YW5jZS5ub2RlKSB8fCBpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBmaWVsZEluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+O1xuICAgICAgaWYgKGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKGZpZWxkSW5zdGFuY2UsIGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgICBpZiAoZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb246IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgICAgIHRoaXMuX2FkZFRvTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGRTbGlkZUluc3RhbmNlKHNsaWRlSW5zdGFuY2U6IEFqZlNsaWRlSW5zdGFuY2UpOiBBamZTbGlkZUluc3RhbmNlIHtcbiAgICBjb25zdCBzbGlkZSA9IHNsaWRlSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAoc2xpZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIHNsaWRlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGVHcm91cEluc3RhbmNlKG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpOlxuICAgICAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlR3JvdXAgPSBub2RlR3JvdXBJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChub2RlR3JvdXAudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgbm9kZUdyb3VwSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAobm9kZUdyb3VwSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgaWYgKG5vZGVHcm91cEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgIGlmIChub2RlR3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICBsZXQgbm9kZUdyb3VwSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVHcm91cEluc3RhbmNlKTtcbiAgICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiAhZm9ybUdyb3VwLmNvbnRhaW5zKG5vZGVHcm91cEluc3RhbmNlTmFtZSkpIHtcbiAgICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKG5vZGVHcm91cEluc3RhbmNlLnJlcHMpO1xuICAgICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKG5vZGVHcm91cEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlR3JvdXBJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVmlzaWJpbGl0eU1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzUmVwZXRpdGlvbk1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNGb3JtdWxhTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNWYWxpZGF0aW9uTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNXYXJuaW5nTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNGaWx0ZXJlZENob2ljZXNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNNYXBJbmRleChub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sIGluZGV4OiBzdHJpbmcpIHtcbiAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh2bWFwKS5pbmRleE9mKGluZGV4KSA+IC0xKSB7XG4gICAgICAgIGRlbGV0ZSB2bWFwW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2bWFwO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOlxuICAgICAgdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzRm9ybXVsYU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNWYWxpZGF0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1dhcm5pbmdNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6XG4gICAgICB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTpcbiAgICAgIHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzTWFwKFxuICAgICAgbm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LCBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICAgIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCB0b2tlbnMgPSB0b2tlbml6ZShmb3JtdWxhKS5maWx0ZXIoXG4gICAgICAgICh0b2tlbjogYW55KSA9PiB0b2tlbi50eXBlID09ICdJZGVudGlmaWVyJyAmJiB0b2tlbi52YWx1ZSAhPSAnJHZhbHVlJyk7XG4gICAgaWYgKHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgdG9rZW5zLmZvckVhY2goKHRva2VuOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgdG9rZW5OYW1lID0gdG9rZW4udmFsdWU7XG4gICAgICAgICAgaWYgKHZtYXBbdG9rZW5OYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB2bWFwW3Rva2VuTmFtZV0uaW5kZXhPZihub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICAgIHZtYXBbdG9rZW5OYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgaWYgKHZtYXBbdG9rZW5OYW1lXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB2bWFwW3Rva2VuTmFtZV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0Zvcm11bGFNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWYWxpZGF0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzV2FybmluZ01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc01hcChcbiAgICAgIG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiwgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgICBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgdG9rZW5zID0gdG9rZW5pemUoZm9ybXVsYSkuZmlsdGVyKFxuICAgICAgICAodG9rZW46IGFueSkgPT4gdG9rZW4udHlwZSA9PSAnSWRlbnRpZmllcicgJiYgdG9rZW4udmFsdWUgIT0gJyR2YWx1ZScpO1xuICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbjogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IHRva2VuTmFtZSA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgIGlmICh2bWFwW3Rva2VuTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdm1hcFt0b2tlbk5hbWVdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2bWFwW3Rva2VuTmFtZV0uaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgdm1hcFt0b2tlbk5hbWVdLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19