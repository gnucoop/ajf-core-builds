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
        this.formInitEvent = this._formInitEvent.asObservable();
        this._formGroup = new BehaviorSubject(null);
        this.formGroup = this._formGroup.asObservable();
        this._form = new BehaviorSubject(null);
        this._nodesUpdates = new Subject();
        this._formGroupSubscription = Subscription.EMPTY;
        this._valueChanged = new Subject();
        this._nextSlideTrigger = new EventEmitter();
        this.nextSlideTrigger = this._nextSlideTrigger.asObservable();
        this._slidesNum = new BehaviorSubject(0);
        this.slidesNum = this._slidesNum.asObservable();
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
        this._nodesUpdates.asObservable()
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
                            const slide = curNode;
                            const subNodesNum = slide.flatNodes.length;
                            let valid = true;
                            for (let i = 0; i < subNodesNum; i++) {
                                const subNode = slide.flatNodes[i];
                                if (subNode.visible && isFieldInstance(subNode) &&
                                    !subNode.valid) {
                                    valid = false;
                                    break;
                                }
                            }
                            if (slide.valid !== valid) {
                                slide.valid = valid;
                            }
                            slide.updatedEvt.emit();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBR0gsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBa0IsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFDakMsT0FBTyxFQUNMLGVBQWUsRUFDZixJQUFJLEVBQ0osVUFBVSxFQUNWLEVBQUUsSUFBSSxLQUFLLEVBQ1gsT0FBTyxFQUVQLFlBQVksRUFDWixLQUFLLEVBQ04sTUFBTSxNQUFNLENBQUM7QUFDZCxPQUFPLEVBQ0wsWUFBWSxFQUNaLE1BQU0sRUFDTixHQUFHLEVBQ0gsUUFBUSxFQUNSLGFBQWEsRUFDYixRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULGNBQWMsRUFDZixNQUFNLGdCQUFnQixDQUFDO0FBU3hCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQVczRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFPeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0seURBQXlELENBQUM7QUFDbkcsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFDLHFCQUFx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QUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3FCQUNwQztnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7WUF6dkNGLFVBQVU7OztZQVBILG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb24sIEFqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7RXZlbnRFbWl0dGVyLCBJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7QWJzdHJhY3RDb250cm9sLCBGb3JtQ29udHJvbCwgRm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge3Rva2VuaXplfSBmcm9tICdlc3ByaW1hJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZnJvbSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YgYXMgb2JzT2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmliZXIsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGltZXJcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZWJvdW5jZVRpbWUsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBwYWlyd2lzZSxcbiAgcHVibGlzaFJlcGxheSxcbiAgcmVmQ291bnQsXG4gIHNjYW4sXG4gIHNoYXJlLFxuICBzdGFydFdpdGgsXG4gIHN3aXRjaE1hcCxcbiAgd2l0aExhdGVzdEZyb21cbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlXG59IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRm9ybXVsYUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZm9ybXVsYS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy90YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkVtcHR5RmllbGR9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9lbXB0eS1maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZUYWJsZUZvcm1Db250cm9sfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy90YWJsZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZVxufSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cH0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS1ncm91cCc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbn0gZnJvbSAnLi9pbnRlcmZhY2Uvb3BlcmF0aW9ucy9ub2Rlcy1pbnN0YW5jZXMtb3BlcmF0aW9uJztcbmltcG9ydCB7QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL29wZXJhdGlvbnMvcmVuZGVyZXItdXBkYXRlLW1hcC1vcGVyYXRpb24nO1xuaW1wb3J0IHtBamZSZW5kZXJlclVwZGF0ZU1hcH0gZnJvbSAnLi9pbnRlcmZhY2UvcmVuZGVyZXItbWFwcy91cGRhdGUtbWFwJztcbmltcG9ydCB7QWpmQmFzZVNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvYmFzZS1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2luaXRDaG9pY2VzT3JpZ2lufSBmcm9tICcuL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7aXNUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy9pcy10YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWVsZC1pbnN0YW5jZS1zdGF0ZSc7XG5pbXBvcnQge3VwZGF0ZUZpbHRlcmVkQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWx0ZXJlZC1jaG9pY2VzJztcbmltcG9ydCB7dXBkYXRlRm9ybXVsYX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1mb3JtdWxhJztcbmltcG9ydCB7dXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9ufSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLW5leHQtc2xpZGUtY29uZGl0aW9uJztcbmltcG9ydCB7dXBkYXRlVHJpZ2dlckNvbmRpdGlvbnN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdHJpZ2dlci1jb25kaXRpb25zJztcbmltcG9ydCB7dXBkYXRlVmFsaWRhdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS12YWxpZGF0aW9uJztcbmltcG9ydCB7dXBkYXRlV2FybmluZ30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS13YXJuaW5nJztcbmltcG9ydCB7Y3JlYXRlRmllbGR9IGZyb20gJy4vdXRpbHMvZmllbGRzL2NyZWF0ZS1maWVsZCc7XG5pbXBvcnQge2lzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMvaXMtY3VzdG9tLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMvaXMtZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzSW5zdGFuY2VzfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcyc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc0luc3RhbmNlc1RyZWV9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2ZsYXR0ZW4tbm9kZXMtaW5zdGFuY2VzLXRyZWUnO1xuaW1wb3J0IHtpc0ZpZWxkSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7aXNOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlc0luc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1zbGlkZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZVN1ZmZpeH0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1zdWZmaXgnO1xuaW1wb3J0IHtub2RlVG9Ob2RlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS1jb25kaXRpb25hbC1icmFuY2hlcyc7XG5pbXBvcnQge3VwZGF0ZVZpc2liaWxpdHl9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS12aXNpYmlsaXR5JztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzfSBmcm9tICcuL3V0aWxzL25vZGVzL2ZsYXR0ZW4tbm9kZXMnO1xuaW1wb3J0IHtpc0NvbnRhaW5lck5vZGV9IGZyb20gJy4vdXRpbHMvbm9kZXMvaXMtY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGV9IGZyb20gJy4vdXRpbHMvbm9kZXMvaXMtcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7b3JkZXJlZE5vZGVzfSBmcm9tICcuL3V0aWxzL25vZGVzL29yZGVyZWQtbm9kZXMnO1xuaW1wb3J0IHt1cGRhdGVSZXBzTnVtfSBmcm9tICcuL3V0aWxzL3NsaWRlcy1pbnN0YW5jZXMvdXBkYXRlLXJlcHMtbnVtJztcbmltcG9ydCB7dmFsaWRTbGlkZX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3ZhbGlkLXNsaWRlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvblNlcnZpY2V9IGZyb20gJy4vdmFsaWRhdGlvbi1zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IGVudW0gQWpmRm9ybUluaXRTdGF0dXMge1xuICBJbml0aWFsaXppbmcsXG4gIENvbXBsZXRlXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9maWx0ZXJlZENob2ljZXNOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtSW5pdEV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUluaXRTdGF0dXM+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtSW5pdFN0YXR1cz4oKTtcbiAgcmVhZG9ubHkgZm9ybUluaXRFdmVudDogT2JzZXJ2YWJsZTxBamZGb3JtSW5pdFN0YXR1cz4gPSB0aGlzLl9mb3JtSW5pdEV2ZW50LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2Zvcm1Hcm91cDogQmVoYXZpb3JTdWJqZWN0PEZvcm1Hcm91cHxudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9ybUdyb3VwfG51bGw+KG51bGwpO1xuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8Rm9ybUdyb3VwfG51bGw+ID0gdGhpcy5fZm9ybUdyb3VwLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2Zvcm06IEJlaGF2aW9yU3ViamVjdDx7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fXxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PHtmb3JtOiBBamZGb3JtIHwgbnVsbCwgY29udGV4dD86IEFqZkNvbnRleHR9fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9ub2RlczogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2Rlc1RyZWU6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnM6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuICBwcml2YXRlIF9lcnJvcnM6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIF9mb3JtR3JvdXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9ub2Rlc01hcHM6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+W107XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlVHJpZ2dlcjogRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4oKTtcbiAgcmVhZG9ubHkgbmV4dFNsaWRlVHJpZ2dlcjogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2U+ID0gdGhpcy5fbmV4dFNsaWRlVHJpZ2dlci5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zbGlkZXNOdW06IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMuX3NsaWRlc051bS5hc09ic2VydmFibGUoKTtcblxuICBnZXQgbm9kZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2Rlc1RyZWU7XG4gIH1cbiAgZ2V0IGVycm9yUG9zaXRpb25zKCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JQb3NpdGlvbnM7XG4gIH1cbiAgZ2V0IGVycm9ycygpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XG4gIH1cbiAgZ2V0IGN1cnJlbnRTdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uZm9ybSAhPSBudWxsID8gZm9ybS5mb3JtLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMgOiBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXzogQWpmVmFsaWRhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLl9pbml0VXBkYXRlTWFwU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0RXJyb3JzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRGb3JtU3RyZWFtcygpO1xuICAgIHRoaXMuX3VwZGF0ZUZvcm1WYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICBzZXRGb3JtKGZvcm06IEFqZkZvcm18bnVsbCwgY29udGV4dDogQWpmQ29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5faW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTtcbiAgICBpZiAoZm9ybSAhPSBudWxsICYmIE9iamVjdC5rZXlzKGNvbnRleHQpLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICBPYmplY3Qua2V5cyhmb3JtLmluaXRDb250ZXh0IHx8IHt9KS5sZW5ndGggPiAwKSB7XG4gICAgICBjb250ZXh0ID0gZm9ybS5pbml0Q29udGV4dCB8fCB7fTtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudEZvcm0gPSB0aGlzLl9mb3JtLmdldFZhbHVlKCk7XG4gICAgaWYgKChjdXJyZW50Rm9ybSA9PSBudWxsICYmIGZvcm0gIT0gbnVsbCkgfHxcbiAgICAgICAgKGN1cnJlbnRGb3JtICE9IG51bGwgJiYgZm9ybSAhPT0gY3VycmVudEZvcm0uZm9ybSkpIHtcbiAgICAgIHRoaXMuX2Zvcm0ubmV4dCh7Zm9ybTogZm9ybSwgY29udGV4dDogY29udGV4dH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1WYWx1ZSgpOiBhbnkge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBsZXQgcmVzID0gZGVlcENvcHkoZm9ybUdyb3VwLnZhbHVlKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYWRkR3JvdXAoZ3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGlmIChncm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbWF4UmVwcyA9IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGlmIChtYXhSZXBzID4gMCAmJiBncm91cC5yZXBzICsgMSA+IG1heFJlcHMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRSZXBzID0gZ3JvdXAucmVwcztcbiAgICAgIGdyb3VwLnJlcHMgPSBncm91cC5yZXBzICsgMTtcbiAgICAgIGdyb3VwLmNhbkFkZCA9IGdyb3VwLm5vZGUubWF4UmVwcyA9PT0gMCB8fCBncm91cC5yZXBzIDwgZ3JvdXAubm9kZS5tYXhSZXBzO1xuICAgICAgZ3JvdXAuY2FuUmVtb3ZlID0gZ3JvdXAubm9kZS5taW5SZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPiBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMobm9kZXMsIHRydWUpO1xuICAgICAgICB0aGlzLl9hZGp1c3RSZXBzKGZsYXROb2RlcywgZ3JvdXAsIG9sZFJlcHMsIHRoaXMuZ2V0Rm9ybVZhbHVlKCkpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodHJ1ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVHcm91cChncm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2V8QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgaWYgKGdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBtaW5SZXBzID0gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgaWYgKGdyb3VwLnJlcHMgLSAxIDwgbWluUmVwcykge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFJlcHMgPSBncm91cC5yZXBzO1xuICAgICAgZ3JvdXAucmVwcyA9IGdyb3VwLnJlcHMgLSAxO1xuICAgICAgZ3JvdXAuY2FuQWRkID0gZ3JvdXAubm9kZS5tYXhSZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPCBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBncm91cC5jYW5SZW1vdmUgPSBncm91cC5ub2RlLm1pblJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA+IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgIHRoaXMuX2FkanVzdFJlcHMobm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJvbChmaWVsZDogQWpmRmllbGRJbnN0YW5jZSk6IE9ic2VydmFibGU8QWJzdHJhY3RDb250cm9sfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXAucGlwZShtYXAoKGYpID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZCk7XG4gICAgICByZXR1cm4gZiAhPSBudWxsICYmIGYuY29udGFpbnMoZmllbGROYW1lKSA/IGYuY29udHJvbHNbZmllbGROYW1lXSA6IG51bGw7XG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEVycm9yc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JQb3NpdGlvbnMgPSB0aGlzLl92YWx1ZUNoYW5nZWQucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fbm9kZXMsIHRoaXMuX2Zvcm0pLFxuICAgICAgICBmaWx0ZXIoXG4gICAgICAgICAgICAoW18sIF9fLCBmb3JtXSkgPT4gZm9ybSAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgKGZvcm0gYXMge2Zvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0PzogQWpmQ29udGV4dH0pLmZvcm0gIT0gbnVsbCksXG4gICAgICAgIG1hcCgoW18sIG5vZGVzLCBmb3JtRGVmXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm0gPSAoZm9ybURlZiBhcyB7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fSkuZm9ybSBhcyBBamZGb3JtO1xuICAgICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgICAgIGNvbnN0IGVycm9yczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICAobm9kZXMgYXMgQWpmTm9kZUluc3RhbmNlW10pLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJzTm9kZSA9IG5vZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByc05vZGUucmVwczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJzTm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmICghdmFsaWRTbGlkZShyc05vZGUsIGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc05vZGUgPSBub2RlIGFzIEFqZlNsaWRlSW5zdGFuY2U7XG4gICAgICAgICAgICAgIGlmIChzTm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgc05vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgaWYgKCFzTm9kZS52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBmb3JtLnZhbGlkID0gZXJyb3JzLmxlbmd0aCA9PSAwO1xuICAgICAgICAgIHRoaXMuX3NsaWRlc051bS5uZXh0KGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICAgICAgfSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICAgIHRoaXMuX2Vycm9ycyA9IHRoaXMuX2Vycm9yUG9zaXRpb25zLnBpcGUoXG4gICAgICAgIG1hcChlID0+IGUgIT0gbnVsbCA/IGUubGVuZ3RoIDogMCksXG4gICAgICAgIHN0YXJ0V2l0aCgwKSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgpLFxuICAgICAgICByZWZDb3VudCgpLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VXBkYXRlTWFwU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge30pLFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSBhcyBBamZSZW5kZXJlclVwZGF0ZU1hcCksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSxcbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuX2Zvcm11bGFOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgIChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7fSksXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9IGFzIEFqZlJlbmRlcmVyVXBkYXRlTWFwKSxcbiAgICAgICAgICAgICAgICBzaGFyZSgpLFxuICAgICAgICAgICAgKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge30pLFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSBhcyBBamZSZW5kZXJlclVwZGF0ZU1hcCksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSxcbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5fd2FybmluZ05vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge30pLFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSBhcyBBamZSZW5kZXJlclVwZGF0ZU1hcCksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSxcbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge30pLFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSBhcyBBamZSZW5kZXJlclVwZGF0ZU1hcCksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSxcbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuXG4gICAgdGhpcy5fbm9kZXNNYXBzID0gW1xuICAgICAgdGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwLCB0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXAsIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXAsXG4gICAgICB0aGlzLl9mb3JtdWxhTm9kZXNNYXAsIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcCwgdGhpcy5fd2FybmluZ05vZGVzTWFwLFxuICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwLCB0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcCxcbiAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm1PYnMgPSA8T2JzZXJ2YWJsZTx7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fT4+dGhpcy5fZm9ybTtcbiAgICBmb3JtT2JzXG4gICAgICAgIC5waXBlKG1hcCgoX2Zvcm0pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdEZvcm1Hcm91cFN0cmVhbXMobmV3IEZvcm1Hcm91cCh7fSkpO1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb3JtR3JvdXApO1xuICAgIGZvcm1PYnNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoZm9ybSA9PiB7XG4gICAgICAgICAgICAgIGlmIChmb3JtID09IG51bGwgfHwgZm9ybS5mb3JtID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzT2YoZm9ybSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY2hvaWNlc09yaWdpbnMgPSBmb3JtLmZvcm0uY2hvaWNlc09yaWdpbnMgfHwgW107XG4gICAgICAgICAgICAgIGlmIChjaG9pY2VzT3JpZ2lucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzT2YoZm9ybSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5hbGwoY2hvaWNlc09yaWdpbnMubWFwKGNvID0+IGluaXRDaG9pY2VzT3JpZ2luKGNvKSkpKVxuICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgbWFwKCgpID0+IGZvcm0pLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChmb3JtRGVmKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoX25vZGVzSW5zdGFuY2VzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdO1xuICAgICAgICAgICAgICAgIGlmIChmb3JtRGVmICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgKGZvcm1EZWYgYXMge2Zvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0PzogQWpmQ29udGV4dH0pLmZvcm0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IChmb3JtRGVmIGFzIHtmb3JtOiBBamZGb3JtLCBjb250ZXh0OiBBamZDb250ZXh0fSk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBiYXNlTm9kZXMgPSBmb3JtLmZvcm0ubm9kZXM7XG4gICAgICAgICAgICAgICAgICBub2RlcyA9IHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgICAgICAgICAgICAgICAgZmxhdHRlbk5vZGVzKGJhc2VOb2RlcyksIGJhc2VOb2RlcywgdW5kZWZpbmVkLCBbXSwgZm9ybS5jb250ZXh0IHx8IHt9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcnNOb2RlID0gbm9kZSBhcyBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzTm9kZS5yZXBzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcnNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNOb2RlID0gbm9kZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc05vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgIHNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXROb2RlSW5zdGFuY2UoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlLCBwcmVmaXg6IG51bWJlcltdLCBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgICAgYnJhbmNoVmlzaWJpbGl0eSA9IHRydWUpOiBBamZOb2RlSW5zdGFuY2V8bnVsbCB7XG4gICAgbGV0IGluc3RhbmNlID0gbm9kZVRvTm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgIGlmIChpbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBub2RlVHlwZSA9IGluc3RhbmNlLm5vZGUubm9kZVR5cGU7XG4gICAgICBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgdGhpcy5fZXhwbG9kZVJlcGVhdGluZ05vZGUoXG4gICAgICAgICAgICBhbGxOb2RlcywgaW5zdGFuY2UgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgIGNvbnN0IHNJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZlNsaWRlSW5zdGFuY2U7XG4gICAgICAgIHNJbnN0YW5jZS5ub2RlcyA9IHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgICAgICBhbGxOb2Rlcywgc0luc3RhbmNlLm5vZGUubm9kZXMsIHNJbnN0YW5jZS5ub2RlLmlkLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgICAgfVxuICAgICAgdXBkYXRlVmlzaWJpbGl0eShpbnN0YW5jZSwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIGlmIChub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmRmllbGQpIHtcbiAgICAgICAgY29uc3QgZkluc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcblxuICAgICAgICBpZiAoaXNDdXN0b21GaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSB8fCBpc0ZpZWxkV2l0aENob2ljZXMoZkluc3RhbmNlLm5vZGUpKSB7XG4gICAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKGZJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGlzVGFibGVGaWVsZEluc3RhbmNlKGZJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRmSW5zdGFuY2UgPSBmSW5zdGFuY2UgYXMgQWpmVGFibGVGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgY29uc3QgdE5vZGUgPSB0Zkluc3RhbmNlLm5vZGU7XG4gICAgICAgICAgICB0Zkluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0W25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZSh0Zkluc3RhbmNlKV0gfHwgY29udGV4dDtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IGNvbnRyb2xzV2l0aExhYmVsczogW3N0cmluZywgKHN0cmluZyB8IEFqZlRhYmxlRm9ybUNvbnRyb2wpW11dW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnRyb2xzV2l0aExhYmVscy5wdXNoKFtub2RlLmxhYmVsLCB0Tm9kZS5jb2x1bW5MYWJlbHNdKTtcbiAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgICB0Tm9kZS5yb3dzLmZvckVhY2goKHJvdywgcm93SWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHI6IEFqZlRhYmxlRm9ybUNvbnRyb2xbXSA9IFtdO1xuICAgICAgICAgICAgICAgIChyb3cgYXMgQWpmVGFibGVDZWxsW10pLmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgIGV2ZXJ5IGNvbnRyb2wgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBjZWxsIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICBpbnNpZGUgdGhlIGZvcm0gY29udHJvbCBtYXRyaXhcbiAgICAgICAgICAgICAgICAgIHdpdGggdGhpcyBtYXNrIGAke3ROb2RlLm5hbWV9X18ke3Jvd0lkeH1fXyR7aWR4fWBcbiAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYCR7dE5vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlRm9ybUNvbnRyb2w6XG4gICAgICAgICAgICAgICAgICAgICAgQWpmVGFibGVGb3JtQ29udHJvbCA9IHtjb250cm9sOiBuZXcgRm9ybUNvbnRyb2woKSwgc2hvdzogZmFsc2V9O1xuICAgICAgICAgICAgICAgICAgdGFibGVGb3JtQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHRmSW5zdGFuY2UuY29udGV4dFtjZWxsLmZvcm11bGFdKTtcbiAgICAgICAgICAgICAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2wobmFtZSwgdGFibGVGb3JtQ29udHJvbC5jb250cm9sKTtcbiAgICAgICAgICAgICAgICAgIHIucHVzaCh0YWJsZUZvcm1Db250cm9sKTtcbiAgICAgICAgICAgICAgICAgIC8qIGNyZWF0ZSBhIG9iamVjdCB0aGF0IHJlc3BlY3QgdGhlIGluc3RhbmNlIGludGVyZmFjZVxuICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgbWluaW11bSBkZWZpbmVkIHByb3BlcnRpZXMgdG8gYWxsb3cgdG8gcnVuIGFkZFRvTm9kZUZvcm11bGEgbWFwKi9cbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZha2VJbnN0YW5jZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybXVsYToge2Zvcm11bGE6IGNlbGwuZm9ybXVsYX0sXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IHtuYW1lLCBub2RlVHlwZTogMCwgZWRpdGFibGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlczogW10sXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRFdnQ6IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKVxuICAgICAgICAgICAgICAgICAgfSBhcyB1bmtub3duIGFzIEFqZk5vZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRvTm9kZXNGb3JtdWxhTWFwKGZha2VJbnN0YW5jZSwgY2VsbC5mb3JtdWxhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb250cm9sc1dpdGhMYWJlbHMucHVzaChbdE5vZGUucm93TGFiZWxzW3Jvd0lkeF0sIHJdKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRmSW5zdGFuY2UuY29udHJvbHMgPSBjb250cm9sc1dpdGhMYWJlbHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZJbnN0YW5jZS52YWx1ZSA9IGNvbnRleHRbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHVwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZShmSW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9hZGROb2RlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGp1c3RSZXBzKFxuICAgICAgYWxsTm9kZXM6IEFqZk5vZGVbXXxBamZOb2RlSW5zdGFuY2VbXSwgaW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSxcbiAgICAgIG9sZFJlcHM6IG51bWJlcixcbiAgICAgIGNvbnRleHQ6IEFqZkNvbnRleHQpOiB7YWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdfG51bGwsIHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdfG51bGx9IHtcbiAgICBjb25zdCBuZXdSZXBzID0gaW5zdGFuY2UucmVwcztcbiAgICBjb25zdCByZXN1bHQ6XG4gICAgICAgIHthZGRlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbCxcbiAgICAgICAgIHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdfG51bGx9ID0ge2FkZGVkOiBudWxsLCByZW1vdmVkOiBudWxsfTtcbiAgICBpZiAob2xkUmVwcyA8IG5ld1JlcHMpIHtcbiAgICAgIGNvbnN0IG5ld05vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgICAgaWYgKGluc3RhbmNlLm5vZGVzID09IG51bGwpIHtcbiAgICAgICAgaW5zdGFuY2Uubm9kZXMgPSBbXTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXApIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGNyZWF0ZUZpZWxkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDk5OSxcbiAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogLTEsXG4gICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZTogQWpmRmllbGRUeXBlLkVtcHR5LFxuICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogaW5zdGFuY2Uubm9kZS5sYWJlbFxuICAgICAgICAgICAgICAgICAgICAgfSkgYXMgQWpmRW1wdHlGaWVsZDtcbiAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPVxuICAgICAgICAgICAgdGhpcy5faW5pdE5vZGVJbnN0YW5jZShhbGxOb2Rlcywgbm9kZSwgaW5zdGFuY2UucHJlZml4LnNsaWNlKDApLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICBpbnN0YW5jZS5ub2Rlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IG9sZFJlcHM7IGkgPCBuZXdSZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gaW5zdGFuY2UucHJlZml4LnNsaWNlKDApO1xuICAgICAgICBjb25zdCBncm91cCA9IGluc3RhbmNlLm5vZGU7XG4gICAgICAgIHByZWZpeC5wdXNoKGkpO1xuICAgICAgICBvcmRlcmVkTm9kZXMoZ3JvdXAubm9kZXMsIGluc3RhbmNlLm5vZGUuaWQpLmZvckVhY2goKG4pID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG4sIHByZWZpeCwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5ld05vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fYWRkTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5hZGRlZCA9IG5ld05vZGVzO1xuICAgIH0gZWxzZSBpZiAob2xkUmVwcyA+IG5ld1JlcHMpIHtcbiAgICAgIGxldCBub2Rlc051bSA9IGluc3RhbmNlLm5vZGVzLmxlbmd0aCAvIG9sZFJlcHM7XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIG5vZGVzTnVtKys7XG4gICAgICB9XG4gICAgICByZXN1bHQucmVtb3ZlZCA9IGluc3RhbmNlLm5vZGVzLnNwbGljZShuZXdSZXBzICogbm9kZXNOdW0sIG5vZGVzTnVtKTtcbiAgICAgIHJlc3VsdC5yZW1vdmVkLmZvckVhY2goKG4gPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVOb2RlSW5zdGFuY2Uobik7XG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChvbGRSZXBzICE9IG5ld1JlcHMgJiYgaW5zdGFuY2UuZm9ybXVsYVJlcHMgPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmcgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSk7XG4gICAgICBpZiAoZmcgIT0gbnVsbCAmJiBmZy5jb250YWlucyhjb21wbGV0ZU5hbWUpKSB7XG4gICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUoaW5zdGFuY2UucmVwcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGluc3RhbmNlLmZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlc0luc3RhbmNlcyhpbnN0YW5jZS5ub2Rlcyk7XG4gICAgaWYgKGluc3RhbmNlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICBjb25zdCByc0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgIGNvbnN0IHNsaWRlTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdW10gPSBbXTtcbiAgICAgIGNvbnN0IG5vZGVzUGVyU2xpZGUgPVxuICAgICAgICAgIHJzSW5zdGFuY2Uubm9kZXMgIT0gbnVsbCA/IHJzSW5zdGFuY2Uubm9kZXMubGVuZ3RoIC8gcnNJbnN0YW5jZS5yZXBzIDogMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2UucmVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0Tm9kZSA9IGkgKiBub2Rlc1BlclNsaWRlO1xuICAgICAgICBzbGlkZU5vZGVzLnB1c2goaW5zdGFuY2Uubm9kZXMuc2xpY2Uoc3RhcnROb2RlLCBzdGFydE5vZGUgKyBub2Rlc1BlclNsaWRlKSk7XG4gICAgICB9XG4gICAgICByc0luc3RhbmNlLnNsaWRlTm9kZXMgPSBzbGlkZU5vZGVzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRm9ybVZhbHVlQW5kVmFsaWRpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX2Zvcm1Hcm91cCksIGZpbHRlcigoW18sIGZnXSkgPT4gZmcgIT09IG51bGwpKVxuICAgICAgICAuc3Vic2NyaWJlKChbXywgZmddKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybSA9IGZnIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICBmb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9leHBsb2RlUmVwZWF0aW5nTm9kZShcbiAgICAgIGFsbE5vZGVzOiBBamZOb2RlW118QWpmTm9kZUluc3RhbmNlW10sXG4gICAgICBpbnN0YW5jZTogQWpmTm9kZUdyb3VwSW5zdGFuY2V8QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSwgY29udGV4dDogQWpmQ29udGV4dCkge1xuICAgIGNvbnN0IG9sZFJlcHMgPSB1cGRhdGVSZXBzTnVtKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICBpZiAob2xkUmVwcyAhPT0gaW5zdGFuY2UucmVwcykge1xuICAgICAgdGhpcy5fYWRqdXN0UmVwcyhhbGxOb2RlcywgaW5zdGFuY2UsIG9sZFJlcHMsIGNvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlczogQWpmTm9kZVtdLCBwYXJlbnQ6IG51bWJlcnxudWxsID0gbnVsbCxcbiAgICAgIHByZWZpeDogbnVtYmVyW10gPSBbXSwgY29udGV4dDogQWpmQ29udGV4dCk6IEFqZk5vZGVJbnN0YW5jZVtdIHtcbiAgICBsZXQgbm9kZXNJbnN0YW5jZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgY29uc3QgY3VyU3VmZml4ID0gcHJlZml4Lmxlbmd0aCA+IDAgPyAnX18nICsgcHJlZml4LmpvaW4oJ19fJykgOiAnJztcbiAgICBvcmRlcmVkTm9kZXMobm9kZXMsIHBhcmVudCkuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50Tm9kZUluc3RhbmNlID0gbm9kZXNJbnN0YW5jZXMuZmluZChcbiAgICAgICAgICBuaSA9PiBuaS5ub2RlLmlkID09IG5vZGUucGFyZW50ICYmIG5vZGVJbnN0YW5jZVN1ZmZpeChuaSkgPT0gY3VyU3VmZml4KTtcbiAgICAgIGNvbnN0IGJyYW5jaFZpc2liaWxpdHkgPSBwYXJlbnROb2RlSW5zdGFuY2UgIT0gbnVsbCA/XG4gICAgICAgICAgcGFyZW50Tm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoID09IG5vZGUucGFyZW50Tm9kZSA6XG4gICAgICAgICAgdHJ1ZTtcbiAgICAgIGNvbnN0IG5uaSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG5vZGUsIHByZWZpeCwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgICBpZiAobm5pICE9IG51bGwpIHtcbiAgICAgICAgbm9kZXNJbnN0YW5jZXMucHVzaChubmkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBub2Rlc0luc3RhbmNlcztcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1WYWx1ZURlbHRhKG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG5ld1ZhbHVlKS5maWx0ZXIoKGspID0+IG9sZFZhbHVlW2tdICE9PSBuZXdWYWx1ZVtrXSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybUdyb3VwU3RyZWFtcyhmb3JtR3JvdXA6IEZvcm1Hcm91cCk6IEZvcm1Hcm91cCB7XG4gICAgdGhpcy5fZm9ybUdyb3VwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgbGV0IGluaXQgPSB0cnVlO1xuICAgIGxldCBpbml0Rm9ybSA9IHRydWU7XG4gICAgdGhpcy5fZm9ybUluaXRFdmVudC5lbWl0KEFqZkZvcm1Jbml0U3RhdHVzLkluaXRpYWxpemluZyk7XG4gICAgdGhpcy5fZm9ybUdyb3VwU3Vic2NyaXB0aW9uID1cbiAgICAgICAgZm9ybUdyb3VwLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9IGFzIGFueSksXG4gICAgICAgICAgICAgICAgcGFpcndpc2UoKSxcbiAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbTxcbiAgICAgICAgICAgICAgICAgICAgW2FueSwgYW55XSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIFthbnksIGFueV0sIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgIEFqZk5vZGVJbnN0YW5jZVtdXG4gICAgICAgICAgICAgICAgICAgIF0+KC4uLih0aGlzLl9ub2Rlc01hcHMpLCB0aGlzLl9mbGF0Tm9kZXMpLFxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICBbYW55LCBhbnldLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZOb2RlSW5zdGFuY2VbXVxuICAgICAgICAgICAgICAgICAgICAgICBdKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG9sZEZvcm1WYWx1ZSA9IGluaXQgJiYge30gfHwgdlswXVswXTtcbiAgICAgICAgICAgICAgaW5pdCA9IGZhbHNlO1xuICAgICAgICAgICAgICBjb25zdCBuZXdGb3JtVmFsdWUgPSB2WzBdWzFdO1xuICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5TWFwID0gdlsxXTtcbiAgICAgICAgICAgICAgY29uc3QgcmVwZXRpdGlvbk1hcCA9IHZbMl07XG4gICAgICAgICAgICAgIGNvbnN0IGNvbmRpdGlvbmFsQnJhbmNoZXNNYXAgPSB2WzNdO1xuICAgICAgICAgICAgICBjb25zdCBmb3JtdWxhTWFwID0gdls0XTtcbiAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbk1hcCA9IHZbNV07XG4gICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdNYXAgPSB2WzZdO1xuICAgICAgICAgICAgICBjb25zdCBuZXh0U2xpZGVDb25kaXRpb25zTWFwID0gdls3XTtcbiAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaG9pY2VzTWFwID0gdls4XTtcbiAgICAgICAgICAgICAgY29uc3QgdHJpZ2dlckNvbmRpdGlvbnNNYXAgPSB2WzldO1xuICAgICAgICAgICAgICBjb25zdCBub2RlcyA9IHZbMTBdO1xuXG4gICAgICAgICAgICAgIC8vIHRha2VzIHRoZSBuYW1lcyBvZiB0aGUgZmllbGRzIHRoYXQgaGF2ZSBjaGFuZ2VkXG4gICAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5fZm9ybVZhbHVlRGVsdGEob2xkRm9ybVZhbHVlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICBjb25zdCBkZWx0YUxlbiA9IGRlbHRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgbGV0IHVwZGF0ZWROb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcblxuICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGZvciBlYWNoIGZpZWxkIHVwZGF0ZSBhbGwgcHJvcGVydGllcyBtYXBcbiAgICAgICAgICAgICAgICB3aXRoIHRoZSBmb2xsb3dpbmcgcnVsZSAgXCJpZiBmaWVsZG5hbWUgaXMgaW4gbWFwIHVwZGF0ZSBpdFwiIGFuZFxuICAgICAgICAgICAgICAgIHB1c2ggb24gdXBkYXRlTm9kZXMgdGhlIG5vZGUgaW5zdGFuY2UgdGhhdCB3cmFwIGZpZWxkXG4gICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIGRlbHRhLmZvckVhY2goKGZpZWxkTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2RlcyA9IHVwZGF0ZWROb2Rlcy5jb25jYXQoXG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmZpbHRlcihuID0+IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShuKSA9PT0gZmllbGROYW1lKSk7XG4gICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHlNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5TWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eUNoYW5nZWQgPSB1cGRhdGVWaXNpYmlsaXR5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNGaWVsZCA9IGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eUNoYW5nZWQgJiYgIW5vZGVJbnN0YW5jZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgJiYgIXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIChub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZSkudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2aXNpYmlsaXR5Q2hhbmdlZCAmJiBub2RlSW5zdGFuY2UudmlzaWJsZSAmJiBpc0ZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB1cGRhdGVGb3JtdWxhKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBudWxsICYmIHJlcy5jaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKHJlcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXBldGl0aW9uTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgcmVwZXRpdGlvbk1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBybkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRSZXBzID0gdXBkYXRlUmVwc051bShybkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRSZXBzICE9PSBybkluc3RhbmNlLnJlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkanVzdFJlcHMobm9kZXMsIHJuSW5zdGFuY2UsIG9sZFJlcHMsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25hbEJyYW5jaGVzTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlc01hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBicmFuY2hDaGFuZ2VkID0gbm9kZUluc3RhbmNlLnVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXMobmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChicmFuY2hDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcmlmaWVkQnJhbmNoID0gbm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoO1xuICAgICAgICAgICAgICAgICAgICBub2RlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChfY29uZGl0aW9uLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09IHZlcmlmaWVkQnJhbmNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93U3VidHJlZShuZXdGb3JtVmFsdWUsIG5vZGVzLCBub2RlSW5zdGFuY2UsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGVTdWJ0cmVlKG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIG5vZGVJbnN0YW5jZSwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChmb3JtdWxhTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgZm9ybXVsYU1hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB1cGRhdGVGb3JtdWxhKGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBudWxsICYmIHJlcy5jaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVWYWxpZGF0aW9uKGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZnLmNvbnRyb2xzW25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpXS5zZXRWYWx1ZShyZXMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbk1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NYXBbZmllbGROYW1lXS5mb3JFYWNoKChub2RlSW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgbmV3Rm9ybVZhbHVlLiR2YWx1ZSA9IG5ld0Zvcm1WYWx1ZVtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKV07XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmFsaWRhdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUsIHRoaXMuY3VycmVudFN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh3YXJuaW5nTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgd2FybmluZ01hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVXYXJuaW5nKGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZkluc3RhbmNlLndhcm5pbmdSZXN1bHRzICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZkluc3RhbmNlLndhcm5pbmdSZXN1bHRzLmZpbHRlcih3YXJuaW5nID0+IHdhcm5pbmcucmVzdWx0KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZ1RyaWdnZXIuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFMZW4gPT0gMSAmJiBuZXh0U2xpZGVDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgaWYgKG5leHRTbGlkZUNvbmRpdGlvbnNNYXBbZmllbGROYW1lXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChub2RlSW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbihmSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25leHRTbGlkZVRyaWdnZXIuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZENob2ljZXNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBmaWx0ZXJlZENob2ljZXNNYXBbZmllbGROYW1lXS5mb3JFYWNoKChub2RlSW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlcyhmSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUZpbHRlcmVkQ2hvaWNlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4sIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkZWx0YUxlbiA9PSAxICYmIHRyaWdnZXJDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzID0gdHJpZ2dlckNvbmRpdGlvbnNNYXBbZmllbGROYW1lXS5maWx0ZXIoKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRmllbGRXaXRoQ2hvaWNlcyhmSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZVRyaWdnZXJDb25kaXRpb25zKFxuICAgICAgICAgICAgICAgICAgICAgICAgZkluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+LCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIChyZXNbMF0gYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4pLnNlbGVjdGlvblRyaWdnZXIuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVJZHggPSBub2Rlcy5pbmRleE9mKG4pO1xuICAgICAgICAgICAgICAgIGxldCBpZHggPSBub2RlSWR4IC0gMTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ck5vZGUgPSBub2Rlc1tpZHhdO1xuICAgICAgICAgICAgICAgICAgaWYgKGlzU2xpZGVzSW5zdGFuY2UoY3VyTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpZGUgPSBjdXJOb2RlIGFzIChBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlIHwgQWpmU2xpZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk5vZGVzTnVtID0gc2xpZGUuZmxhdE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJOb2Rlc051bTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViTm9kZSA9IHNsaWRlLmZsYXROb2Rlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViTm9kZS52aXNpYmxlICYmIGlzRmllbGRJbnN0YW5jZShzdWJOb2RlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAhKHN1Yk5vZGUgYXMgQWpmRmllbGRJbnN0YW5jZSkudmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlLnZhbGlkICE9PSB2YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLnZhbGlkID0gdmFsaWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xpZGUudXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZHgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbi51cGRhdGVkRXZ0LmVtaXQoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmIChpbml0Rm9ybSkge1xuICAgICAgICAgICAgICAgIGluaXRGb3JtID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9ybUluaXRFdmVudC5lbWl0KEFqZkZvcm1Jbml0U3RhdHVzLkNvbXBsZXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZWQubmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1Hcm91cDtcbiAgfVxuXG4gIHByaXZhdGUgX3Nob3dTdWJ0cmVlKFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCwgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UsIGJyYW5jaD86IG51bWJlcikge1xuICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBub2RlLCB0cnVlLCBicmFuY2gpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZVN1YnRyZWUoXG4gICAgICBjb250ZXh0OiBBamZDb250ZXh0LCBub2RlczogQWpmTm9kZUluc3RhbmNlW10sIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSwgYnJhbmNoPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG5vZGUsIGZhbHNlLCBicmFuY2gpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoXG4gICAgICBjb250ZXh0OiBBamZDb250ZXh0LCBub2RlczogQWpmTm9kZUluc3RhbmNlW10sIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSwgdmlzaWJsZTogYm9vbGVhbixcbiAgICAgIGJyYW5jaD86IG51bWJlcikge1xuICAgIGxldCBzdWJOb2RlczogQWpmTm9kZUluc3RhbmNlW107XG4gICAgY29uc3Qgbm9kZVN1ZmZpeCA9IG5vZGVJbnN0YW5jZVN1ZmZpeChub2RlKTtcbiAgICBpZiAoYnJhbmNoICE9IG51bGwpIHtcbiAgICAgIHN1Yk5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4ge1xuICAgICAgICBjb25zdCBzdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobik7XG4gICAgICAgIHJldHVybiBzdWZmaXggPT0gbm9kZVN1ZmZpeCAmJiBuLm5vZGUucGFyZW50ID09IG5vZGUubm9kZS5pZCAmJiBuLm5vZGUucGFyZW50Tm9kZSA9PSBicmFuY2g7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3ViTm9kZXMgPSBub2Rlcy5maWx0ZXIobiA9PiB7XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IG5vZGVJbnN0YW5jZVN1ZmZpeChuKTtcbiAgICAgICAgcmV0dXJuIHN1ZmZpeCA9PSBub2RlU3VmZml4ICYmIG4ubm9kZS5wYXJlbnQgPT0gbm9kZS5ub2RlLmlkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ29udGFpbmVyID0gaXNDb250YWluZXJOb2RlKG5vZGUubm9kZSk7XG4gICAgc3ViTm9kZXMuZm9yRWFjaCgobikgPT4ge1xuICAgICAgaWYgKCFpc0NvbnRhaW5lciB8fFxuICAgICAgICAgIChpc0NvbnRhaW5lciAmJiAoPEFqZk5vZGVHcm91cD5ub2RlLm5vZGUpLm5vZGVzLmZpbmQoY24gPT4gY24uaWQgPT0gbi5ub2RlLmlkKSA9PSBudWxsKSkge1xuICAgICAgICB1cGRhdGVWaXNpYmlsaXR5KG4sIGNvbnRleHQsIHZpc2libGUpO1xuICAgICAgICB1cGRhdGVGb3JtdWxhKG4gYXMgQWpmRm9ybXVsYUZpZWxkSW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2RlcywgbiwgdmlzaWJsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID1cbiAgICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLnBpcGUoc2Nhbigobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBvcDogQWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aobm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX2ZsYXROb2Rlc1RyZWUgPSB0aGlzLl9ub2Rlcy5waXBlKG1hcChub2RlcyA9PiBmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlKG5vZGVzKSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX2ZsYXROb2RlcyA9IHRoaXMuX2ZsYXROb2Rlc1RyZWUucGlwZShcbiAgICAgICAgbWFwKHNsaWRlcyA9PiB7XG4gICAgICAgICAgbGV0IG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgICAgbm9kZXMucHVzaChzKTtcbiAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuY29uY2F0KHMuZmxhdE5vZGVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgIH0pLFxuICAgICAgICBzaGFyZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IEFqZk5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1Zpc2liaWxpdHlNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNSZXBldGl0aW9uTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNGb3JtdWxhTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVmFsaWRhdGlvbk1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1dhcm5pbmdNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgaWYgKGlzU2xpZGVzSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbW92ZVNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZkJhc2VTbGlkZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVTbGlkZUluc3RhbmNlKHNsaWRlSW5zdGFuY2U6IEFqZkJhc2VTbGlkZUluc3RhbmNlKTogQWpmQmFzZVNsaWRlSW5zdGFuY2Uge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChzbGlkZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBzbGlkZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpOlxuICAgICAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlR3JvdXAgPSBub2RlR3JvdXBJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChub2RlR3JvdXAudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBpZiAobm9kZUdyb3VwSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCAmJiBub2RlR3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZUdyb3VwSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGaWVsZEluc3RhbmNlKGZpZWxkSW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBmaWVsZEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZEluc3RhbmNlKTtcbiAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgZm9ybUdyb3VwLmNvbnRhaW5zKGZpZWxkSW5zdGFuY2VOYW1lKSkge1xuICAgICAgZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woZmllbGRJbnN0YW5jZU5hbWUpO1xuICAgIH1cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgZGVsZXRlIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGZpZWxkSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYSkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzRm9ybXVsYU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmZvcm11bGEuZm9ybXVsYSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogY2hlY2sgdGhpcywgcHJvYmFibHkgaXMgbmV2ZXIgdmVyaWZpZWRcbiAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKGZpZWxkSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgIGNvbnN0IHJjSW5zdGFuY2UgPSAoZmllbGRJbnN0YW5jZSBhcyBBamZOb2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKTtcbiAgICAgIGlmIChyY0luc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChmaWVsZEluc3RhbmNlLCByY0luc3RhbmNlLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCAmJiBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmFsaWRhdGlvbk1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS53YXJuaW5nLmNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1dhcm5pbmdNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICAgICAgICBmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZmllbGRJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBmaWVsZEluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+O1xuICAgICAgaWYgKGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAoZmllbGRJbnN0YW5jZSwgZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlci5mb3JtdWxhKTtcbiAgICAgICAgaWYgKGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICBmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGROb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpOiBBamZOb2RlSW5zdGFuY2Uge1xuICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZUluc3RhbmNlLm5vZGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZFNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZlNsaWRlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZGRGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRmllbGRJbnN0YW5jZShmaWVsZEluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgY29uc3QgZmllbGRJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGRJbnN0YW5jZSk7XG4gICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmICFmb3JtR3JvdXAuY29udGFpbnMoZmllbGRJbnN0YW5jZU5hbWUpKSB7XG4gICAgICBjb25zdCBjb250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgICBjb250cm9sLnNldFZhbHVlKGZpZWxkSW5zdGFuY2UudmFsdWUpO1xuICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChmaWVsZEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgfVxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcy5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXS5pbmRleE9mKGZpZWxkSW5zdGFuY2UpID09IC0xKSB7XG4gICAgICAgICAgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV0ucHVzaChmaWVsZEluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGZpZWxkSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGEpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNGb3JtdWxhTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYS5mb3JtdWxhKTtcbiAgICB9XG5cbiAgICBpZiAoaXNOb2RlR3JvdXBJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgY29uc3QgbmdJbnN0YW5jZSA9IGZpZWxkSW5zdGFuY2UgYXMgQWpmTm9kZUluc3RhbmNlIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlO1xuICAgICAgaWYgKG5nSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChmaWVsZEluc3RhbmNlLCBuZ0luc3RhbmNlLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCAmJiBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1ZhbGlkYXRpb25NYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2Uud2FybmluZy5jb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzV2FybmluZ01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICAgICAgICBmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChpc0N1c3RvbUZpZWxkV2l0aENob2ljZXMoZmllbGRJbnN0YW5jZS5ub2RlKSB8fCBpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBmaWVsZEluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+O1xuICAgICAgaWYgKGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKGZpZWxkSW5zdGFuY2UsIGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgICBpZiAoZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb246IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgICAgIHRoaXMuX2FkZFRvTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGRTbGlkZUluc3RhbmNlKHNsaWRlSW5zdGFuY2U6IEFqZlNsaWRlSW5zdGFuY2UpOiBBamZTbGlkZUluc3RhbmNlIHtcbiAgICBjb25zdCBzbGlkZSA9IHNsaWRlSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAoc2xpZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIHNsaWRlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGVHcm91cEluc3RhbmNlKG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpOlxuICAgICAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlR3JvdXAgPSBub2RlR3JvdXBJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChub2RlR3JvdXAudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgbm9kZUdyb3VwSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAobm9kZUdyb3VwSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgaWYgKG5vZGVHcm91cEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgIGlmIChub2RlR3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICBsZXQgbm9kZUdyb3VwSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVHcm91cEluc3RhbmNlKTtcbiAgICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiAhZm9ybUdyb3VwLmNvbnRhaW5zKG5vZGVHcm91cEluc3RhbmNlTmFtZSkpIHtcbiAgICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKG5vZGVHcm91cEluc3RhbmNlLnJlcHMpO1xuICAgICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKG5vZGVHcm91cEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlR3JvdXBJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVmlzaWJpbGl0eU1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzUmVwZXRpdGlvbk1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNGb3JtdWxhTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNWYWxpZGF0aW9uTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNXYXJuaW5nTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNGaWx0ZXJlZENob2ljZXNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNNYXBJbmRleChub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sIGluZGV4OiBzdHJpbmcpIHtcbiAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh2bWFwKS5pbmRleE9mKGluZGV4KSA+IC0xKSB7XG4gICAgICAgIGRlbGV0ZSB2bWFwW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2bWFwO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOlxuICAgICAgdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzRm9ybXVsYU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNWYWxpZGF0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1dhcm5pbmdNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6XG4gICAgICB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTpcbiAgICAgIHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzTWFwKFxuICAgICAgbm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LCBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICAgIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCB0b2tlbnMgPSB0b2tlbml6ZShmb3JtdWxhKS5maWx0ZXIoXG4gICAgICAgICh0b2tlbjogYW55KSA9PiB0b2tlbi50eXBlID09ICdJZGVudGlmaWVyJyAmJiB0b2tlbi52YWx1ZSAhPSAnJHZhbHVlJyk7XG4gICAgaWYgKHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgdG9rZW5zLmZvckVhY2goKHRva2VuOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgdG9rZW5OYW1lID0gdG9rZW4udmFsdWU7XG4gICAgICAgICAgaWYgKHZtYXBbdG9rZW5OYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB2bWFwW3Rva2VuTmFtZV0uaW5kZXhPZihub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICAgIHZtYXBbdG9rZW5OYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgaWYgKHZtYXBbdG9rZW5OYW1lXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB2bWFwW3Rva2VuTmFtZV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0Zvcm11bGFNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWYWxpZGF0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzV2FybmluZ01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc01hcChcbiAgICAgIG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiwgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgICBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgdG9rZW5zID0gdG9rZW5pemUoZm9ybXVsYSkuZmlsdGVyKFxuICAgICAgICAodG9rZW46IGFueSkgPT4gdG9rZW4udHlwZSA9PSAnSWRlbnRpZmllcicgJiYgdG9rZW4udmFsdWUgIT0gJyR2YWx1ZScpO1xuICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbjogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IHRva2VuTmFtZSA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgIGlmICh2bWFwW3Rva2VuTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdm1hcFt0b2tlbk5hbWVdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2bWFwW3Rva2VuTmFtZV0uaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgdm1hcFt0b2tlbk5hbWVdLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19