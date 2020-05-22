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
import { __decorate, __metadata } from "tslib";
import { deepCopy } from '@ajf/core/utils';
import { EventEmitter, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import * as esprima from 'esprima';
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
const esprimaMod = esprima.default || esprima;
const { tokenize } = esprimaMod;
let AjfFormRendererService = /** @class */ (() => {
    let AjfFormRendererService = class AjfFormRendererService {
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
            this._errorPositions = this._valueChanged.pipe(withLatestFrom(this._nodes, this._form), filter(v => v[2] != null && v[2].form != null), map((v) => {
                const nodes = v[1];
                const form = v[2].form;
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
            }), map((form) => {
                return (_nodesInstances) => {
                    const nodes = form != null && form.form != null ?
                        this._orderedNodesInstancesTree(flattenNodes(form.form.nodes), form.form.nodes, undefined, [], form.context || {}) :
                        [];
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
                .pipe(withLatestFrom(this._formGroup), filter((values) => values[1] !== null))
                .subscribe((values) => {
                const form = values[1];
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
    };
    AjfFormRendererService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AjfValidationService])
    ], AjfFormRendererService);
    return AjfFormRendererService;
})();
export { AjfFormRendererService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUdILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQWtCLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLElBQUksRUFDSixVQUFVLEVBQ1YsRUFBRSxJQUFJLEtBQUssRUFDWCxPQUFPLEVBRVAsWUFBWSxFQUNaLEtBQUssRUFDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxZQUFZLEVBQ1osTUFBTSxFQUNOLEdBQUcsRUFDSCxRQUFRLEVBQ1IsYUFBYSxFQUNiLFFBQVEsRUFDUixJQUFJLEVBQ0osS0FBSyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsY0FBYyxFQUNmLE1BQU0sZ0JBQWdCLENBQUM7QUFTeEIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBVzNELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQU94RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSx5REFBeUQsQ0FBQztBQUNuRyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVBQUMscUJBQXFCLEVB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QyxDQUFDLEtBQVUsRUFBRSxFQUFFO3dCQUM1QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO3dCQUM1QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUU7NEJBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7eUJBQ3RCO3dCQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTs0QkFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQzt5QkFDcEM7b0JBQ0gsQ0FBQyxDQUFDLENBQUM7b0JBQ0gsT0FBTyxJQUFJLENBQUM7Z0JBQ2QsQ0FBQyxDQUFDLENBQUM7YUFDSjtRQUNILENBQUM7S0FDRixDQUFBO0lBcnJDWSxzQkFBc0I7UUFEbEMsVUFBVSxFQUFFO3lDQStFSSxvQkFBb0I7T0E5RXhCLHNCQUFzQixDQXFyQ2xDO0lBQUQsNkJBQUM7S0FBQTtTQXJyQ1ksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgQWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCAqIGFzIGVzcHJpbWEgZnJvbSAnZXNwcmltYSc7XG5pbXBvcnQge1xuICBCZWhhdmlvclN1YmplY3QsXG4gIGZyb20sXG4gIE9ic2VydmFibGUsXG4gIG9mIGFzIG9ic09mLFxuICBTdWJqZWN0LFxuICBTdWJzY3JpYmVyLFxuICBTdWJzY3JpcHRpb24sXG4gIHRpbWVyXG59IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtcbiAgZGVib3VuY2VUaW1lLFxuICBmaWx0ZXIsXG4gIG1hcCxcbiAgcGFpcndpc2UsXG4gIHB1Ymxpc2hSZXBsYXksXG4gIHJlZkNvdW50LFxuICBzY2FuLFxuICBzaGFyZSxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXAsXG4gIHdpdGhMYXRlc3RGcm9tXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZVxufSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZvcm11bGFGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2Zvcm11bGEtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZFbXB0eUZpZWxkfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZW1wdHktZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvdGFibGUtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7QWpmVGFibGVGb3JtQ29udHJvbH0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvdGFibGUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXB9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUtZ3JvdXAnO1xuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL29wZXJhdGlvbnMvbm9kZXMtaW5zdGFuY2VzLW9wZXJhdGlvbic7XG5pbXBvcnQge0FqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9ufSBmcm9tICcuL2ludGVyZmFjZS9vcGVyYXRpb25zL3JlbmRlcmVyLXVwZGF0ZS1tYXAtb3BlcmF0aW9uJztcbmltcG9ydCB7QWpmUmVuZGVyZXJVcGRhdGVNYXB9IGZyb20gJy4vaW50ZXJmYWNlL3JlbmRlcmVyLW1hcHMvdXBkYXRlLW1hcCc7XG5pbXBvcnQge0FqZkJhc2VTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL2Jhc2Utc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpbml0Q2hvaWNlc09yaWdpbn0gZnJvbSAnLi91dGlscy9jaG9pY2VzL2luaXQtY2hvaWNlcy1vcmlnaW4nO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2lzVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVGaWVsZEluc3RhbmNlU3RhdGV9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmllbGQtaW5zdGFuY2Utc3RhdGUnO1xuaW1wb3J0IHt1cGRhdGVGaWx0ZXJlZENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmlsdGVyZWQtY2hvaWNlcyc7XG5pbXBvcnQge3VwZGF0ZUZvcm11bGF9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZm9ybXVsYSc7XG5pbXBvcnQge3VwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1uZXh0LXNsaWRlLWNvbmRpdGlvbic7XG5pbXBvcnQge3VwZGF0ZVRyaWdnZXJDb25kaXRpb25zfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLXRyaWdnZXItY29uZGl0aW9ucyc7XG5pbXBvcnQge3VwZGF0ZVZhbGlkYXRpb259IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdmFsaWRhdGlvbic7XG5pbXBvcnQge3VwZGF0ZVdhcm5pbmd9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtd2FybmluZyc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQnO1xuaW1wb3J0IHtpc0N1c3RvbUZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzL2lzLWN1c3RvbS1maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc0luc3RhbmNlc30gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcy10cmVlJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLW5vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7aXNTbGlkZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGVzLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VTdWZmaXh9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2Utc3VmZml4JztcbmltcG9ydCB7bm9kZVRvTm9kZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLXRvLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtY29uZGl0aW9uYWwtYnJhbmNoZXMnO1xuaW1wb3J0IHt1cGRhdGVWaXNpYmlsaXR5fSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtdmlzaWJpbGl0eSc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9mbGF0dGVuLW5vZGVzJztcbmltcG9ydCB7aXNDb250YWluZXJOb2RlfSBmcm9tICcuL3V0aWxzL25vZGVzL2lzLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdDb250YWluZXJOb2RlfSBmcm9tICcuL3V0aWxzL25vZGVzL2lzLXJlcGVhdGluZy1jb250YWluZXItbm9kZSc7XG5pbXBvcnQge29yZGVyZWROb2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9vcmRlcmVkLW5vZGVzJztcbmltcG9ydCB7dXBkYXRlUmVwc051bX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3VwZGF0ZS1yZXBzLW51bSc7XG5pbXBvcnQge3ZhbGlkU2xpZGV9IGZyb20gJy4vdXRpbHMvc2xpZGVzLWluc3RhbmNlcy92YWxpZC1zbGlkZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICcuL3ZhbGlkYXRpb24tc2VydmljZSc7XG5cbmNvbnN0IGVzcHJpbWFNb2Q6IGFueSA9IChlc3ByaW1hIGFzIGFueSkuZGVmYXVsdCB8fCBlc3ByaW1hO1xuY29uc3Qge3Rva2VuaXplfSA9IGVzcHJpbWFNb2Q7XG5cbmV4cG9ydCBjb25zdCBlbnVtIEFqZkZvcm1Jbml0U3RhdHVzIHtcbiAgSW5pdGlhbGl6aW5nLFxuICBDb21wbGV0ZVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmRm9ybVJlbmRlcmVyU2VydmljZSB7XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3JlcGV0aXRpb25Ob2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfZm9ybXVsYU5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfZm9ybXVsYU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbk5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfd2FybmluZ05vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfd2FybmluZ05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfZm9ybUluaXRFdmVudDogRXZlbnRFbWl0dGVyPEFqZkZvcm1Jbml0U3RhdHVzPiA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUluaXRTdGF0dXM+KCk7XG4gIHJlYWRvbmx5IGZvcm1Jbml0RXZlbnQ6IE9ic2VydmFibGU8QWpmRm9ybUluaXRTdGF0dXM+ID0gdGhpcy5fZm9ybUluaXRFdmVudC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9mb3JtR3JvdXA6IEJlaGF2aW9yU3ViamVjdDxGb3JtR3JvdXB8bnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZvcm1Hcm91cHxudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZm9ybUdyb3VwOiBPYnNlcnZhYmxlPEZvcm1Hcm91cHxudWxsPiA9IHRoaXMuX2Zvcm1Hcm91cC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9mb3JtOiBCZWhhdmlvclN1YmplY3Q8e2Zvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0PzogQWpmQ29udGV4dH18bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDx7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fXxudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfbm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlW10+O1xuICBwcml2YXRlIF9mbGF0Tm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlW10+O1xuICBwcml2YXRlIF9mbGF0Tm9kZXNUcmVlOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX25vZGVzVXBkYXRlczogU3ViamVjdDxBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2Vycm9yUG9zaXRpb25zOiBPYnNlcnZhYmxlPG51bWJlcltdPjtcbiAgcHJpdmF0ZSBfZXJyb3JzOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgcHJpdmF0ZSBfZm9ybUdyb3VwU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfbm9kZXNNYXBzOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPltdO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZVRyaWdnZXI6IEV2ZW50RW1pdHRlcjxBamZOb2RlSW5zdGFuY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZOb2RlSW5zdGFuY2U+KCk7XG4gIHJlYWRvbmx5IG5leHRTbGlkZVRyaWdnZXI6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlPiA9IHRoaXMuX25leHRTbGlkZVRyaWdnZXIuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2xpZGVzTnVtOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVhZG9ubHkgc2xpZGVzTnVtOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLl9zbGlkZXNOdW0uYXNPYnNlcnZhYmxlKCk7XG5cbiAgZ2V0IG5vZGVzVHJlZSgpOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0Tm9kZXNUcmVlO1xuICB9XG4gIGdldCBlcnJvclBvc2l0aW9ucygpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yUG9zaXRpb25zO1xuICB9XG4gIGdldCBlcnJvcnMoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JzO1xuICB9XG4gIGdldCBjdXJyZW50U3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucygpOiBhbnkge1xuICAgIGNvbnN0IGZvcm0gPSB0aGlzLl9mb3JtLmdldFZhbHVlKCk7XG4gICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmZvcm0gIT0gbnVsbCA/IGZvcm0uZm9ybS5zdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zIDogbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKF86IEFqZlZhbGlkYXRpb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5faW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Tm9kZXNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEVycm9yc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Rm9ybVN0cmVhbXMoKTtcbiAgICB0aGlzLl91cGRhdGVGb3JtVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgc2V0Rm9ybShmb3JtOiBBamZGb3JtfG51bGwsIGNvbnRleHQ6IEFqZkNvbnRleHQgPSB7fSkge1xuICAgIHRoaXMuX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk7XG4gICAgaWYgKGZvcm0gIT0gbnVsbCAmJiBPYmplY3Qua2V5cyhjb250ZXh0KS5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgT2JqZWN0LmtleXMoZm9ybS5pbml0Q29udGV4dCB8fCB7fSkubGVuZ3RoID4gMCkge1xuICAgICAgY29udGV4dCA9IGZvcm0uaW5pdENvbnRleHQgfHwge307XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnRGb3JtID0gdGhpcy5fZm9ybS5nZXRWYWx1ZSgpO1xuICAgIGlmICgoY3VycmVudEZvcm0gPT0gbnVsbCAmJiBmb3JtICE9IG51bGwpIHx8XG4gICAgICAgIChjdXJyZW50Rm9ybSAhPSBudWxsICYmIGZvcm0gIT09IGN1cnJlbnRGb3JtLmZvcm0pKSB7XG4gICAgICB0aGlzLl9mb3JtLm5leHQoe2Zvcm06IGZvcm0sIGNvbnRleHQ6IGNvbnRleHR9KTtcbiAgICB9XG4gIH1cblxuICBnZXRGb3JtVmFsdWUoKTogYW55IHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgbGV0IHJlcyA9IGRlZXBDb3B5KGZvcm1Hcm91cC52YWx1ZSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGFkZEdyb3VwKGdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZXxBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBpZiAoZ3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1heFJlcHMgPSBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBpZiAobWF4UmVwcyA+IDAgJiYgZ3JvdXAucmVwcyArIDEgPiBtYXhSZXBzKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkUmVwcyA9IGdyb3VwLnJlcHM7XG4gICAgICBncm91cC5yZXBzID0gZ3JvdXAucmVwcyArIDE7XG4gICAgICBncm91cC5jYW5BZGQgPSBncm91cC5ub2RlLm1heFJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA8IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGdyb3VwLmNhblJlbW92ZSA9IGdyb3VwLm5vZGUubWluUmVwcyA9PT0gMCB8fCBncm91cC5yZXBzID4gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgY29uc3QgZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzSW5zdGFuY2VzKG5vZGVzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhmbGF0Tm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlR3JvdXAoZ3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGlmIChncm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbWluUmVwcyA9IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIGlmIChncm91cC5yZXBzIC0gMSA8IG1pblJlcHMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRSZXBzID0gZ3JvdXAucmVwcztcbiAgICAgIGdyb3VwLnJlcHMgPSBncm91cC5yZXBzIC0gMTtcbiAgICAgIGdyb3VwLmNhbkFkZCA9IGdyb3VwLm5vZGUubWF4UmVwcyA9PT0gMCB8fCBncm91cC5yZXBzIDwgZ3JvdXAubm9kZS5tYXhSZXBzO1xuICAgICAgZ3JvdXAuY2FuUmVtb3ZlID0gZ3JvdXAubm9kZS5taW5SZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPiBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICB0aGlzLl9hZGp1c3RSZXBzKG5vZGVzLCBncm91cCwgb2xkUmVwcywgdGhpcy5nZXRGb3JtVmFsdWUoKSk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyb2woZmllbGQ6IEFqZkZpZWxkSW5zdGFuY2UpOiBPYnNlcnZhYmxlPEFic3RyYWN0Q29udHJvbHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUdyb3VwLnBpcGUobWFwKChmKSA9PiB7XG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGQpO1xuICAgICAgcmV0dXJuIGYgIT0gbnVsbCAmJiBmLmNvbnRhaW5zKGZpZWxkTmFtZSkgPyBmLmNvbnRyb2xzW2ZpZWxkTmFtZV0gOiBudWxsO1xuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFcnJvcnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Vycm9yUG9zaXRpb25zID0gdGhpcy5fdmFsdWVDaGFuZ2VkLnBpcGUoXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX25vZGVzLCB0aGlzLl9mb3JtKSwgZmlsdGVyKHYgPT4gdlsyXSAhPSBudWxsICYmIHZbMl0uZm9ybSAhPSBudWxsKSxcbiAgICAgICAgbWFwKCh2OiBbdm9pZCwgQWpmTm9kZUluc3RhbmNlW10sIHtmb3JtOiBBamZGb3JtIHwgbnVsbCwgY29udGV4dD86IEFqZkNvbnRleHR9fG51bGxdKSA9PiB7XG4gICAgICAgICAgY29uc3Qgbm9kZXMgPSB2WzFdO1xuICAgICAgICAgIGNvbnN0IGZvcm0gPSB2WzJdIS5mb3JtITtcbiAgICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgICBjb25zdCBlcnJvcnM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgcnNOb2RlID0gbm9kZSBhcyBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzTm9kZS5yZXBzOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAobm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgcnNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWYgKCF2YWxpZFNsaWRlKHJzTm9kZSwgaSkpIHtcbiAgICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSkge1xuICAgICAgICAgICAgICBjb25zdCBzTm9kZSA9IG5vZGUgYXMgQWpmU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgaWYgKHNOb2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICBzTm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICBpZiAoIXNOb2RlLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGZvcm0udmFsaWQgPSBlcnJvcnMubGVuZ3RoID09IDA7XG4gICAgICAgICAgdGhpcy5fc2xpZGVzTnVtLm5leHQoY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgICAgICB9KSxcbiAgICAgICAgcHVibGlzaFJlcGxheSgpLCByZWZDb3VudCgpKTtcbiAgICB0aGlzLl9lcnJvcnMgPSB0aGlzLl9lcnJvclBvc2l0aW9ucy5waXBlKFxuICAgICAgICBtYXAoZSA9PiBlICE9IG51bGwgPyBlLmxlbmd0aCA6IDApLCBzdGFydFdpdGgoMCksIHB1Ymxpc2hSZXBsYXkoKSwgcmVmQ291bnQoKSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0VXBkYXRlTWFwU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX2Zvcm11bGFOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICB9LCB7fSksIHN0YXJ0V2l0aDxBamZSZW5kZXJlclVwZGF0ZU1hcD4oe30pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl93YXJuaW5nTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICB9LCB7fSksIHN0YXJ0V2l0aDxBamZSZW5kZXJlclVwZGF0ZU1hcD4oe30pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuXG4gICAgdGhpcy5fbm9kZXNNYXBzID0gW1xuICAgICAgdGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwLCB0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXAsIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXAsXG4gICAgICB0aGlzLl9mb3JtdWxhTm9kZXNNYXAsIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcCwgdGhpcy5fd2FybmluZ05vZGVzTWFwLFxuICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwLCB0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcCxcbiAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm1PYnMgPSA8T2JzZXJ2YWJsZTx7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fT4+dGhpcy5fZm9ybTtcbiAgICBmb3JtT2JzXG4gICAgICAgIC5waXBlKG1hcCgoX2Zvcm0pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdEZvcm1Hcm91cFN0cmVhbXMobmV3IEZvcm1Hcm91cCh7fSkpO1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb3JtR3JvdXApO1xuICAgIGZvcm1PYnNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoZm9ybSA9PiB7XG4gICAgICAgICAgICAgIGlmIChmb3JtID09IG51bGwgfHwgZm9ybS5mb3JtID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzT2YoZm9ybSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY2hvaWNlc09yaWdpbnMgPSBmb3JtLmZvcm0uY2hvaWNlc09yaWdpbnMgfHwgW107XG4gICAgICAgICAgICAgIGlmIChjaG9pY2VzT3JpZ2lucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzT2YoZm9ybSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5hbGwoY2hvaWNlc09yaWdpbnMubWFwKGNvID0+IGluaXRDaG9pY2VzT3JpZ2luKGNvKSkpKVxuICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgbWFwKCgpID0+IGZvcm0pLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChmb3JtKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoX25vZGVzSW5zdGFuY2VzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlcyA9IGZvcm0gIT0gbnVsbCAmJiBmb3JtLmZvcm0gIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgICAgICAgICAgICAgICAgICBmbGF0dGVuTm9kZXMoZm9ybS5mb3JtLm5vZGVzKSwgZm9ybS5mb3JtLm5vZGVzLCB1bmRlZmluZWQsIFtdLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybS5jb250ZXh0IHx8IHt9KSA6XG4gICAgICAgICAgICAgICAgICAgIFtdO1xuICAgICAgICAgICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJzTm9kZSA9IG5vZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByc05vZGUucmVwczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHJzTm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobm9kZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzTm9kZSA9IG5vZGUgYXMgQWpmU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNOb2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICBzTm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZUluc3RhbmNlKFxuICAgICAgYWxsTm9kZXM6IEFqZk5vZGVbXXxBamZOb2RlSW5zdGFuY2VbXSwgbm9kZTogQWpmTm9kZSwgcHJlZml4OiBudW1iZXJbXSwgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICAgIGJyYW5jaFZpc2liaWxpdHkgPSB0cnVlKTogQWpmTm9kZUluc3RhbmNlfG51bGwge1xuICAgIGxldCBpbnN0YW5jZSA9IG5vZGVUb05vZGVJbnN0YW5jZShhbGxOb2Rlcywgbm9kZSwgcHJlZml4LCBjb250ZXh0KTtcbiAgICBpZiAoaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgbm9kZVR5cGUgPSBpbnN0YW5jZS5ub2RlLm5vZGVUeXBlO1xuICAgICAgaWYgKG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXAgfHwgbm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICAgIHRoaXMuX2V4cGxvZGVSZXBlYXRpbmdOb2RlKFxuICAgICAgICAgICAgYWxsTm9kZXMsIGluc3RhbmNlIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSwgY29udGV4dCk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSkge1xuICAgICAgICBjb25zdCBzSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgICBzSW5zdGFuY2Uubm9kZXMgPSB0aGlzLl9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlKFxuICAgICAgICAgICAgYWxsTm9kZXMsIHNJbnN0YW5jZS5ub2RlLm5vZGVzLCBzSW5zdGFuY2Uubm9kZS5pZCwgcHJlZml4LCBjb250ZXh0KTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZVZpc2liaWxpdHkoaW5zdGFuY2UsIGNvbnRleHQsIGJyYW5jaFZpc2liaWxpdHkpO1xuICAgICAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgICBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZkZpZWxkKSB7XG4gICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG5cbiAgICAgICAgaWYgKGlzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlcyhmSW5zdGFuY2Uubm9kZSkgfHwgaXNGaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgIHVwZGF0ZUZpbHRlcmVkQ2hvaWNlcyhmSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4sIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc1RhYmxlRmllbGRJbnN0YW5jZShmSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICBjb25zdCB0Zkluc3RhbmNlID0gZkluc3RhbmNlIGFzIEFqZlRhYmxlRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgIGNvbnN0IHROb2RlID0gdGZJbnN0YW5jZS5ub2RlO1xuICAgICAgICAgICAgdGZJbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dFtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUodGZJbnN0YW5jZSldIHx8IGNvbnRleHQ7XG4gICAgICAgICAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgIGxldCBjb250cm9sc1dpdGhMYWJlbHM6IFtzdHJpbmcsIChzdHJpbmcgfCBBamZUYWJsZUZvcm1Db250cm9sKVtdXVtdID0gW107XG4gICAgICAgICAgICBjb250cm9sc1dpdGhMYWJlbHMucHVzaChbbm9kZS5sYWJlbCwgdE5vZGUuY29sdW1uTGFiZWxzXSk7XG4gICAgICAgICAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgdE5vZGUucm93cy5mb3JFYWNoKChyb3csIHJvd0lkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByOiBBamZUYWJsZUZvcm1Db250cm9sW10gPSBbXTtcbiAgICAgICAgICAgICAgICAocm93IGFzIEFqZlRhYmxlQ2VsbFtdKS5mb3JFYWNoKChjZWxsLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgICBldmVyeSBjb250cm9sIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgY2VsbCBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgaW5zaWRlIHRoZSBmb3JtIGNvbnRyb2wgbWF0cml4XG4gICAgICAgICAgICAgICAgICB3aXRoIHRoaXMgbWFzayBgJHt0Tm9kZS5uYW1lfV9fJHtyb3dJZHh9X18ke2lkeH1gXG4gICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke3ROb2RlLm5hbWV9X18ke3Jvd0lkeH1fXyR7aWR4fWA7XG4gICAgICAgICAgICAgICAgICBjb25zdCB0YWJsZUZvcm1Db250cm9sOlxuICAgICAgICAgICAgICAgICAgICAgIEFqZlRhYmxlRm9ybUNvbnRyb2wgPSB7Y29udHJvbDogbmV3IEZvcm1Db250cm9sKCksIHNob3c6IGZhbHNlfTtcbiAgICAgICAgICAgICAgICAgIHRhYmxlRm9ybUNvbnRyb2wuY29udHJvbC5zZXRWYWx1ZSh0Zkluc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXSk7XG4gICAgICAgICAgICAgICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKG5hbWUsIHRhYmxlRm9ybUNvbnRyb2wuY29udHJvbCk7XG4gICAgICAgICAgICAgICAgICByLnB1c2godGFibGVGb3JtQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgICAvKiBjcmVhdGUgYSBvYmplY3QgdGhhdCByZXNwZWN0IHRoZSBpbnN0YW5jZSBpbnRlcmZhY2VcbiAgICAgICAgICAgICAgICAgIHdpdGggdGhlIG1pbmltdW0gZGVmaW5lZCBwcm9wZXJ0aWVzIHRvIGFsbG93IHRvIHJ1biBhZGRUb05vZGVGb3JtdWxhIG1hcCovXG4gICAgICAgICAgICAgICAgICBjb25zdCBmYWtlSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IHtmb3JtdWxhOiBjZWxsLmZvcm11bGF9LFxuICAgICAgICAgICAgICAgICAgICBub2RlOiB7bmFtZSwgbm9kZVR5cGU6IDAsIGVkaXRhYmxlOiBmYWxzZX0sXG4gICAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICAgIHByZWZpeDogW10sXG4gICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVkRXZ0OiBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KClcbiAgICAgICAgICAgICAgICAgIH0gYXMgdW5rbm93biBhcyBBamZOb2RlSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICB0aGlzLl9hZGRUb05vZGVzRm9ybXVsYU1hcChmYWtlSW5zdGFuY2UsIGNlbGwuZm9ybXVsYSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgY29udHJvbHNXaXRoTGFiZWxzLnB1c2goW3ROb2RlLnJvd0xhYmVsc1tyb3dJZHhdLCByXSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB0Zkluc3RhbmNlLmNvbnRyb2xzID0gY29udHJvbHNXaXRoTGFiZWxzO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmSW5zdGFuY2UudmFsdWUgPSBjb250ZXh0W25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSldO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1cGRhdGVGaWVsZEluc3RhbmNlU3RhdGUoZkluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgdGhpcy5fYWRkTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgICB9XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRqdXN0UmVwcyhcbiAgICAgIGFsbE5vZGVzOiBBamZOb2RlW118QWpmTm9kZUluc3RhbmNlW10sIGluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UsXG4gICAgICBvbGRSZXBzOiBudW1iZXIsXG4gICAgICBjb250ZXh0OiBBamZDb250ZXh0KToge2FkZGVkOiBBamZOb2RlSW5zdGFuY2VbXXxudWxsLCByZW1vdmVkOiBBamZOb2RlSW5zdGFuY2VbXXxudWxsfSB7XG4gICAgY29uc3QgbmV3UmVwcyA9IGluc3RhbmNlLnJlcHM7XG4gICAgY29uc3QgcmVzdWx0OlxuICAgICAgICB7YWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdfG51bGwsXG4gICAgICAgICByZW1vdmVkOiBBamZOb2RlSW5zdGFuY2VbXXxudWxsfSA9IHthZGRlZDogbnVsbCwgcmVtb3ZlZDogbnVsbH07XG4gICAgaWYgKG9sZFJlcHMgPCBuZXdSZXBzKSB7XG4gICAgICBjb25zdCBuZXdOb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlcyA9PSBudWxsKSB7XG4gICAgICAgIGluc3RhbmNlLm5vZGVzID0gW107XG4gICAgICB9XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVGaWVsZCh7XG4gICAgICAgICAgICAgICAgICAgICAgIGlkOiA5OTksXG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGU6IEFqZkZpZWxkVHlwZS5FbXB0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGluc3RhbmNlLm5vZGUubGFiZWxcbiAgICAgICAgICAgICAgICAgICAgIH0pIGFzIEFqZkVtcHR5RmllbGQ7XG4gICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID1cbiAgICAgICAgICAgIHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG5vZGUsIGluc3RhbmNlLnByZWZpeC5zbGljZSgwKSwgY29udGV4dCk7XG4gICAgICAgIGlmIChuZXdJbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2Uubm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSBvbGRSZXBzOyBpIDwgbmV3UmVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IGluc3RhbmNlLnByZWZpeC5zbGljZSgwKTtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBpbnN0YW5jZS5ub2RlO1xuICAgICAgICBwcmVmaXgucHVzaChpKTtcbiAgICAgICAgb3JkZXJlZE5vZGVzKGdyb3VwLm5vZGVzLCBpbnN0YW5jZS5ub2RlLmlkKS5mb3JFYWNoKChuKSA9PiB7XG4gICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKGFsbE5vZGVzLCBuLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgICAgICAgIGlmIChuZXdJbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgICBuZXdOb2Rlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgICAgIGluc3RhbmNlLm5vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHRoaXMuX2FkZE5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgICB9XG4gICAgICByZXN1bHQuYWRkZWQgPSBuZXdOb2RlcztcbiAgICB9IGVsc2UgaWYgKG9sZFJlcHMgPiBuZXdSZXBzKSB7XG4gICAgICBsZXQgbm9kZXNOdW0gPSBpbnN0YW5jZS5ub2Rlcy5sZW5ndGggLyBvbGRSZXBzO1xuICAgICAgaWYgKGluc3RhbmNlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCkge1xuICAgICAgICBub2Rlc051bSsrO1xuICAgICAgfVxuICAgICAgcmVzdWx0LnJlbW92ZWQgPSBpbnN0YW5jZS5ub2Rlcy5zcGxpY2UobmV3UmVwcyAqIG5vZGVzTnVtLCBub2Rlc051bSk7XG4gICAgICByZXN1bHQucmVtb3ZlZC5mb3JFYWNoKChuID0+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlTm9kZUluc3RhbmNlKG4pO1xuICAgICAgfSkpO1xuICAgIH1cbiAgICBpZiAob2xkUmVwcyAhPSBuZXdSZXBzICYmIGluc3RhbmNlLmZvcm11bGFSZXBzID09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpO1xuICAgICAgaWYgKGZnICE9IG51bGwgJiYgZmcuY29udGFpbnMoY29tcGxldGVOYW1lKSkge1xuICAgICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKGluc3RhbmNlLnJlcHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW5jZS5mbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMoaW5zdGFuY2Uubm9kZXMpO1xuICAgIGlmIChpbnN0YW5jZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgY29uc3QgcnNJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2U7XG4gICAgICBjb25zdCBzbGlkZU5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXVtdID0gW107XG4gICAgICBjb25zdCBub2Rlc1BlclNsaWRlID1cbiAgICAgICAgICByc0luc3RhbmNlLm5vZGVzICE9IG51bGwgPyByc0luc3RhbmNlLm5vZGVzLmxlbmd0aCAvIHJzSW5zdGFuY2UucmVwcyA6IDA7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGluc3RhbmNlLnJlcHM7IGkrKykge1xuICAgICAgICBjb25zdCBzdGFydE5vZGUgPSBpICogbm9kZXNQZXJTbGlkZTtcbiAgICAgICAgc2xpZGVOb2Rlcy5wdXNoKGluc3RhbmNlLm5vZGVzLnNsaWNlKHN0YXJ0Tm9kZSwgc3RhcnROb2RlICsgbm9kZXNQZXJTbGlkZSkpO1xuICAgICAgfVxuICAgICAgcnNJbnN0YW5jZS5zbGlkZU5vZGVzID0gc2xpZGVOb2RlcztcbiAgICB9XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZUZvcm1WYWx1ZUFuZFZhbGlkaXR5KCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzVXBkYXRlcy5hc09ic2VydmFibGUoKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX2Zvcm1Hcm91cCksXG4gICAgICAgICAgICBmaWx0ZXIoKHZhbHVlczogW0FqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uLCBGb3JtR3JvdXB8bnVsbF0pID0+IHZhbHVlc1sxXSAhPT0gbnVsbCkpXG4gICAgICAgIC5zdWJzY3JpYmUoKHZhbHVlczogW0FqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uLCBGb3JtR3JvdXB8bnVsbF0pID0+IHtcbiAgICAgICAgICBjb25zdCBmb3JtOiBGb3JtR3JvdXAgPSA8Rm9ybUdyb3VwPnZhbHVlc1sxXTtcbiAgICAgICAgICBmb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9leHBsb2RlUmVwZWF0aW5nTm9kZShcbiAgICAgIGFsbE5vZGVzOiBBamZOb2RlW118QWpmTm9kZUluc3RhbmNlW10sXG4gICAgICBpbnN0YW5jZTogQWpmTm9kZUdyb3VwSW5zdGFuY2V8QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSwgY29udGV4dDogQWpmQ29udGV4dCkge1xuICAgIGNvbnN0IG9sZFJlcHMgPSB1cGRhdGVSZXBzTnVtKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICBpZiAob2xkUmVwcyAhPT0gaW5zdGFuY2UucmVwcykge1xuICAgICAgdGhpcy5fYWRqdXN0UmVwcyhhbGxOb2RlcywgaW5zdGFuY2UsIG9sZFJlcHMsIGNvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlczogQWpmTm9kZVtdLCBwYXJlbnQ6IG51bWJlcnxudWxsID0gbnVsbCxcbiAgICAgIHByZWZpeDogbnVtYmVyW10gPSBbXSwgY29udGV4dDogQWpmQ29udGV4dCk6IEFqZk5vZGVJbnN0YW5jZVtdIHtcbiAgICBsZXQgbm9kZXNJbnN0YW5jZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgY29uc3QgY3VyU3VmZml4ID0gcHJlZml4Lmxlbmd0aCA+IDAgPyAnX18nICsgcHJlZml4LmpvaW4oJ19fJykgOiAnJztcbiAgICBvcmRlcmVkTm9kZXMobm9kZXMsIHBhcmVudCkuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50Tm9kZUluc3RhbmNlID0gbm9kZXNJbnN0YW5jZXMuZmluZChcbiAgICAgICAgICBuaSA9PiBuaS5ub2RlLmlkID09IG5vZGUucGFyZW50ICYmIG5vZGVJbnN0YW5jZVN1ZmZpeChuaSkgPT0gY3VyU3VmZml4KTtcbiAgICAgIGNvbnN0IGJyYW5jaFZpc2liaWxpdHkgPSBwYXJlbnROb2RlSW5zdGFuY2UgIT0gbnVsbCA/XG4gICAgICAgICAgcGFyZW50Tm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoID09IG5vZGUucGFyZW50Tm9kZSA6XG4gICAgICAgICAgdHJ1ZTtcbiAgICAgIGNvbnN0IG5uaSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG5vZGUsIHByZWZpeCwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgICBpZiAobm5pICE9IG51bGwpIHtcbiAgICAgICAgbm9kZXNJbnN0YW5jZXMucHVzaChubmkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBub2Rlc0luc3RhbmNlcztcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1WYWx1ZURlbHRhKG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG5ld1ZhbHVlKS5maWx0ZXIoKGspID0+IG9sZFZhbHVlW2tdICE9PSBuZXdWYWx1ZVtrXSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybUdyb3VwU3RyZWFtcyhmb3JtR3JvdXA6IEZvcm1Hcm91cCk6IEZvcm1Hcm91cCB7XG4gICAgdGhpcy5fZm9ybUdyb3VwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgbGV0IGluaXQgPSB0cnVlO1xuICAgIGxldCBpbml0Rm9ybSA9IHRydWU7XG4gICAgdGhpcy5fZm9ybUluaXRFdmVudC5lbWl0KEFqZkZvcm1Jbml0U3RhdHVzLkluaXRpYWxpemluZyk7XG4gICAgdGhpcy5fZm9ybUdyb3VwU3Vic2NyaXB0aW9uID1cbiAgICAgICAgZm9ybUdyb3VwLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoPGFueT4oe30pLCBwYWlyd2lzZSgpLCBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbTxcbiAgICAgICAgICAgICAgICAgICAgW2FueSwgYW55XSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIFthbnksIGFueV0sIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgIEFqZk5vZGVJbnN0YW5jZVtdXG4gICAgICAgICAgICAgICAgICAgIF0+KC4uLih0aGlzLl9ub2Rlc01hcHMpLCB0aGlzLl9mbGF0Tm9kZXMpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgIFthbnksIGFueV0sIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZk5vZGVJbnN0YW5jZVtdXG4gICAgICAgICAgICAgICAgICAgICAgIF0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgb2xkRm9ybVZhbHVlID0gaW5pdCAmJiB7fSB8fCB2WzBdWzBdO1xuICAgICAgICAgICAgICBpbml0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld0Zvcm1WYWx1ZSA9IHZbMF1bMV07XG4gICAgICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlNYXAgPSB2WzFdO1xuICAgICAgICAgICAgICBjb25zdCByZXBldGl0aW9uTWFwID0gdlsyXTtcbiAgICAgICAgICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlc01hcCA9IHZbM107XG4gICAgICAgICAgICAgIGNvbnN0IGZvcm11bGFNYXAgPSB2WzRdO1xuICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWFwID0gdls1XTtcbiAgICAgICAgICAgICAgY29uc3Qgd2FybmluZ01hcCA9IHZbNl07XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRTbGlkZUNvbmRpdGlvbnNNYXAgPSB2WzddO1xuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZENob2ljZXNNYXAgPSB2WzhdO1xuICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyQ29uZGl0aW9uc01hcCA9IHZbOV07XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gdlsxMF07XG5cbiAgICAgICAgICAgICAgLy8gdGFrZXMgdGhlIG5hbWVzIG9mIHRoZSBmaWVsZHMgdGhhdCBoYXZlIGNoYW5nZWRcbiAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSB0aGlzLl9mb3JtVmFsdWVEZWx0YShvbGRGb3JtVmFsdWUsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGNvbnN0IGRlbHRhTGVuID0gZGVsdGEubGVuZ3RoO1xuICAgICAgICAgICAgICBsZXQgdXBkYXRlZE5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuXG4gICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgZm9yIGVhY2ggZmllbGQgdXBkYXRlIGFsbCBwcm9wZXJ0aWVzIG1hcFxuICAgICAgICAgICAgICAgIHdpdGggdGhlIGZvbGxvd2luZyBydWxlICBcImlmIGZpZWxkbmFtZSBpcyBpbiBtYXAgdXBkYXRlIGl0XCIgYW5kXG4gICAgICAgICAgICAgICAgcHVzaCBvbiB1cGRhdGVOb2RlcyB0aGUgbm9kZSBpbnN0YW5jZSB0aGF0IHdyYXAgZmllbGRcbiAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgZGVsdGEuZm9yRWFjaCgoZmllbGROYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzID0gdXBkYXRlZE5vZGVzLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZmlsdGVyKG4gPT4gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG4pID09PSBmaWVsZE5hbWUpKTtcbiAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eU1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHlNYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hhbmdlZCA9IHVwZGF0ZVZpc2liaWxpdHkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0ZpZWxkID0gaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5Q2hhbmdlZCAmJiAhbm9kZUluc3RhbmNlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocyAmJiAhcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlKS52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZpc2liaWxpdHlDaGFuZ2VkICYmIG5vZGVJbnN0YW5jZS52aXNpYmxlICYmIGlzRmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUocmVzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcGV0aXRpb25NYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICByZXBldGl0aW9uTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJuSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZFJlcHMgPSB1cGRhdGVSZXBzTnVtKHJuSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFJlcHMgIT09IHJuSW5zdGFuY2UucmVwcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhub2Rlcywgcm5JbnN0YW5jZSwgb2xkUmVwcywgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbmRpdGlvbmFsQnJhbmNoZXNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGJyYW5jaENoYW5nZWQgPSBub2RlSW5zdGFuY2UudXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGJyYW5jaENoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVyaWZpZWRCcmFuY2ggPSBub2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2g7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKF9jb25kaXRpb24sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT0gdmVyaWZpZWRCcmFuY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dTdWJ0cmVlKG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIG5vZGVJbnN0YW5jZSwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZVN1YnRyZWUobmV3Rm9ybVZhbHVlLCBub2Rlcywgbm9kZUluc3RhbmNlLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm11bGFNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBmb3JtdWxhTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEoZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZhbGlkYXRpb24oZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmcuY29udHJvbHNbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSldLnNldFZhbHVlKHJlcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUuJHZhbHVlID0gbmV3Rm9ybVZhbHVlW25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpXTtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVWYWxpZGF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSwgdGhpcy5jdXJyZW50U3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHdhcm5pbmdNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVdhcm5pbmcoZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmSW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMuZmlsdGVyKHdhcm5pbmcgPT4gd2FybmluZy5yZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZS53YXJuaW5nVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkZWx0YUxlbiA9PSAxICYmIG5leHRTbGlkZUNvbmRpdGlvbnNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBpZiAobmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9uKGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmV4dFNsaWRlVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkQ2hvaWNlc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQ2hvaWNlc01hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhTGVuID09IDEgJiYgdHJpZ2dlckNvbmRpdGlvbnNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB0cmlnZ2VyQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdLmZpbHRlcigobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNGaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlVHJpZ2dlckNvbmRpdGlvbnMoXG4gICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4sIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKHJlc1swXSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55Pikuc2VsZWN0aW9uVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZUlkeCA9IG5vZGVzLmluZGV4T2Yobik7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IG5vZGVJZHggLSAxO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTm9kZSA9IG5vZGVzW2lkeF07XG4gICAgICAgICAgICAgICAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShjdXJOb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGlkZSA9IGN1ck5vZGUgYXMgKEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UgfCBBamZTbGlkZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViTm9kZXNOdW0gPSBzbGlkZS5mbGF0Tm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHN1Yk5vZGVzTnVtOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJOb2RlID0gc2xpZGUuZmxhdE5vZGVzW2ldO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzdWJOb2RlLnZpc2libGUgJiYgaXNGaWVsZEluc3RhbmNlKHN1Yk5vZGUpICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgICEoc3ViTm9kZSBhcyBBamZGaWVsZEluc3RhbmNlKS52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFsaWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoc2xpZGUudmFsaWQgIT09IHZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgc2xpZGUudmFsaWQgPSB2YWxpZDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBzbGlkZS51cGRhdGVkRXZ0LmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlkeC0tO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBuLnVwZGF0ZWRFdnQuZW1pdCgpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgaWYgKGluaXRGb3JtKSB7XG4gICAgICAgICAgICAgICAgaW5pdEZvcm0gPSBmYWxzZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9mb3JtSW5pdEV2ZW50LmVtaXQoQWpmRm9ybUluaXRTdGF0dXMuQ29tcGxldGUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlZC5uZXh0KCk7XG4gICAgICAgICAgICB9KTtcbiAgICByZXR1cm4gZm9ybUdyb3VwO1xuICB9XG5cbiAgcHJpdmF0ZSBfc2hvd1N1YnRyZWUoXG4gICAgICBjb250ZXh0OiBBamZDb250ZXh0LCBub2RlczogQWpmTm9kZUluc3RhbmNlW10sIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSwgYnJhbmNoPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG5vZGUsIHRydWUsIGJyYW5jaCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlU3VidHJlZShcbiAgICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgbm9kZTogQWpmTm9kZUluc3RhbmNlLCBicmFuY2g/OiBudW1iZXIpIHtcbiAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2Rlcywgbm9kZSwgZmFsc2UsIGJyYW5jaCk7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShcbiAgICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgbm9kZTogQWpmTm9kZUluc3RhbmNlLCB2aXNpYmxlOiBib29sZWFuLFxuICAgICAgYnJhbmNoPzogbnVtYmVyKSB7XG4gICAgbGV0IHN1Yk5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXTtcbiAgICBjb25zdCBub2RlU3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG5vZGUpO1xuICAgIGlmIChicmFuY2ggIT0gbnVsbCkge1xuICAgICAgc3ViTm9kZXMgPSBub2Rlcy5maWx0ZXIobiA9PiB7XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IG5vZGVJbnN0YW5jZVN1ZmZpeChuKTtcbiAgICAgICAgcmV0dXJuIHN1ZmZpeCA9PSBub2RlU3VmZml4ICYmIG4ubm9kZS5wYXJlbnQgPT0gbm9kZS5ub2RlLmlkICYmIG4ubm9kZS5wYXJlbnROb2RlID09IGJyYW5jaDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJOb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG4pO1xuICAgICAgICByZXR1cm4gc3VmZml4ID09IG5vZGVTdWZmaXggJiYgbi5ub2RlLnBhcmVudCA9PSBub2RlLm5vZGUuaWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgaXNDb250YWluZXIgPSBpc0NvbnRhaW5lck5vZGUobm9kZS5ub2RlKTtcbiAgICBzdWJOb2Rlcy5mb3JFYWNoKChuKSA9PiB7XG4gICAgICBpZiAoIWlzQ29udGFpbmVyIHx8XG4gICAgICAgICAgKGlzQ29udGFpbmVyICYmICg8QWpmTm9kZUdyb3VwPm5vZGUubm9kZSkubm9kZXMuZmluZChjbiA9PiBjbi5pZCA9PSBuLm5vZGUuaWQpID09IG51bGwpKSB7XG4gICAgICAgIHVwZGF0ZVZpc2liaWxpdHkobiwgY29udGV4dCwgdmlzaWJsZSk7XG4gICAgICAgIHVwZGF0ZUZvcm11bGEobiBhcyBBamZGb3JtdWxhRmllbGRJbnN0YW5jZSwgY29udGV4dCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBuLCB2aXNpYmxlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXROb2Rlc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXMgPVxuICAgICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMucGlwZShzY2FuKChub2RlczogQWpmTm9kZUluc3RhbmNlW10sIG9wOiBBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChub2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fZmxhdE5vZGVzVHJlZSA9IHRoaXMuX25vZGVzLnBpcGUobWFwKG5vZGVzID0+IGZsYXR0ZW5Ob2Rlc0luc3RhbmNlc1RyZWUobm9kZXMpKSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fZmxhdE5vZGVzID0gdGhpcy5fZmxhdE5vZGVzVHJlZS5waXBlKFxuICAgICAgICBtYXAoc2xpZGVzID0+IHtcbiAgICAgICAgICBsZXQgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgICAgICAgc2xpZGVzLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKHMpO1xuICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5jb25jYXQocy5mbGF0Tm9kZXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgfSksXG4gICAgICAgIHNoYXJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVmlzaWJpbGl0eU1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1JlcGV0aXRpb25NYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc0Zvcm11bGFNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNWYWxpZGF0aW9uTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzV2FybmluZ01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNGaWx0ZXJlZENob2ljZXNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVtb3ZlU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmQmFzZVNsaWRlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZVNsaWRlSW5zdGFuY2Uoc2xpZGVJbnN0YW5jZTogQWpmQmFzZVNsaWRlSW5zdGFuY2UpOiBBamZCYXNlU2xpZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgc2xpZGUgPSBzbGlkZUluc3RhbmNlLm5vZGU7XG4gICAgaWYgKHNsaWRlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIHNsaWRlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChzbGlkZUluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuICAgIHJldHVybiBzbGlkZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUdyb3VwSW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk6XG4gICAgICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uge1xuICAgIGNvbnN0IG5vZGVHcm91cCA9IG5vZGVHcm91cEluc3RhbmNlLm5vZGU7XG4gICAgaWYgKG5vZGVHcm91cC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIGlmIChub2RlR3JvdXBJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsICYmIG5vZGVHcm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgfVxuICAgIHJldHVybiBub2RlR3JvdXBJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZpZWxkSW5zdGFuY2UoZmllbGRJbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSk6IEFqZkZpZWxkSW5zdGFuY2Uge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGNvbnN0IGZpZWxkSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGZpZWxkSW5zdGFuY2UpO1xuICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiBmb3JtR3JvdXAuY29udGFpbnMoZmllbGRJbnN0YW5jZU5hbWUpKSB7XG4gICAgICBmb3JtR3JvdXAucmVtb3ZlQ29udHJvbChmaWVsZEluc3RhbmNlTmFtZSk7XG4gICAgfVxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcy5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICBkZWxldGUgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgZmllbGRJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNGb3JtdWxhTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYS5mb3JtdWxhKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBjaGVjayB0aGlzLCBwcm9iYWJseSBpcyBuZXZlciB2ZXJpZmllZFxuICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUoZmllbGRJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgY29uc3QgcmNJbnN0YW5jZSA9IChmaWVsZEluc3RhbmNlIGFzIEFqZk5vZGVJbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpO1xuICAgICAgaWYgKHJjSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNSZXBldGl0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIHJjSW5zdGFuY2UuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsICYmIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWYWxpZGF0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2Uud2FybmluZyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzV2FybmluZ01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKFxuICAgICAgICAgIGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlcyhmaWVsZEluc3RhbmNlLm5vZGUpKSB7XG4gICAgICBjb25zdCBmd2NJbnN0YW5jZSA9IGZpZWxkSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT47XG4gICAgICBpZiAoZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChmaWVsZEluc3RhbmNlLCBmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyLmZvcm11bGEpO1xuICAgICAgICBpZiAoZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgIGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGRJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IEFqZk5vZGVJbnN0YW5jZSB7XG4gICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZGROb2RlR3JvdXBJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmU2xpZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZEZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGRGaWVsZEluc3RhbmNlKGZpZWxkSW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBmaWVsZEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZEluc3RhbmNlKTtcbiAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgIWZvcm1Hcm91cC5jb250YWlucyhmaWVsZEluc3RhbmNlTmFtZSkpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICAgIGNvbnRyb2wuc2V0VmFsdWUoZmllbGRJbnN0YW5jZS52YWx1ZSk7XG4gICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKGZpZWxkSW5zdGFuY2VOYW1lLCBjb250cm9sKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdLmluZGV4T2YoZmllbGRJbnN0YW5jZSkgPT0gLTEpIHtcbiAgICAgICAgICB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXS5wdXNoKGZpZWxkSW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgZmllbGRJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYSkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0Zvcm11bGFNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhLmZvcm11bGEpO1xuICAgIH1cblxuICAgIGlmIChpc05vZGVHcm91cEluc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBjb25zdCBuZ0luc3RhbmNlID0gZmllbGRJbnN0YW5jZSBhcyBBamZOb2RlSW5zdGFuY2UgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2U7XG4gICAgICBpZiAobmdJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIG5nSW5zdGFuY2UuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsICYmIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzVmFsaWRhdGlvbk1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS53YXJuaW5nLmNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNXYXJuaW5nTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKFxuICAgICAgICAgIGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgaWYgKGlzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlcyhmaWVsZEluc3RhbmNlLm5vZGUpIHx8IGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBjb25zdCBmd2NJbnN0YW5jZSA9IGZpZWxkSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT47XG4gICAgICBpZiAoZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAoZmllbGRJbnN0YW5jZSwgZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlci5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICAgIGlmIChmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGRJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFNsaWRlSW5zdGFuY2Uoc2xpZGVJbnN0YW5jZTogQWpmU2xpZGVJbnN0YW5jZSk6IEFqZlNsaWRlSW5zdGFuY2Uge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChzbGlkZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKHNsaWRlSW5zdGFuY2UsIHNsaWRlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgc2xpZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChzbGlkZUluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuICAgIHJldHVybiBzbGlkZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUdyb3VwSW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk6XG4gICAgICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uge1xuICAgIGNvbnN0IG5vZGVHcm91cCA9IG5vZGVHcm91cEluc3RhbmNlLm5vZGU7XG4gICAgaWYgKG5vZGVHcm91cC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBub2RlR3JvdXBJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChub2RlR3JvdXBJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICBpZiAobm9kZUdyb3VwSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgaWYgKG5vZGVHcm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgIGxldCBub2RlR3JvdXBJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUdyb3VwSW5zdGFuY2UpO1xuICAgICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmICFmb3JtR3JvdXAuY29udGFpbnMobm9kZUdyb3VwSW5zdGFuY2VOYW1lKSkge1xuICAgICAgICBjb25zdCBjb250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgICAgIGNvbnRyb2wuc2V0VmFsdWUobm9kZUdyb3VwSW5zdGFuY2UucmVwcyk7XG4gICAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2wobm9kZUdyb3VwSW5zdGFuY2VOYW1lLCBjb250cm9sKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVHcm91cEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNWaXNpYmlsaXR5TWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNSZXBldGl0aW9uTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0Zvcm11bGFNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1ZhbGlkYXRpb25NYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1dhcm5pbmdNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc01hcEluZGV4KG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiwgaW5kZXg6IHN0cmluZykge1xuICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHZtYXApLmluZGV4T2YoaW5kZXgpID4gLTEpIHtcbiAgICAgICAgZGVsZXRlIHZtYXBbaW5kZXhdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZtYXA7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6XG4gICAgICB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNGb3JtdWxhTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1ZhbGlkYXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzV2FybmluZ01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTpcbiAgICAgIHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOlxuICAgICAgdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNNYXAoXG4gICAgICBub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgICAgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IHRva2VucyA9IHRva2VuaXplKGZvcm11bGEpLmZpbHRlcihcbiAgICAgICAgKHRva2VuOiBhbnkpID0+IHRva2VuLnR5cGUgPT0gJ0lkZW50aWZpZXInICYmIHRva2VuLnZhbHVlICE9ICckdmFsdWUnKTtcbiAgICBpZiAodG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICB0b2tlbnMuZm9yRWFjaCgodG9rZW46IGFueSkgPT4ge1xuICAgICAgICAgIGxldCB0b2tlbk5hbWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgICBpZiAodm1hcFt0b2tlbk5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IGlkeCA9IHZtYXBbdG9rZW5OYW1lXS5pbmRleE9mKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgICAgdm1hcFt0b2tlbk5hbWVdLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICBpZiAodm1hcFt0b2tlbk5hbWVdLmxlbmd0aCA9PSAwKSB7XG4gICAgICAgICAgICAgICAgZGVsZXRlIHZtYXBbdG9rZW5OYW1lXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzRm9ybXVsYU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1ZhbGlkYXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNXYXJuaW5nTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzTWFwKFxuICAgICAgbm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LCBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICAgIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCB0b2tlbnMgPSB0b2tlbml6ZShmb3JtdWxhKS5maWx0ZXIoXG4gICAgICAgICh0b2tlbjogYW55KSA9PiB0b2tlbi50eXBlID09ICdJZGVudGlmaWVyJyAmJiB0b2tlbi52YWx1ZSAhPSAnJHZhbHVlJyk7XG4gICAgaWYgKHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgdG9rZW5zLmZvckVhY2goKHRva2VuOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgdG9rZW5OYW1lID0gdG9rZW4udmFsdWU7XG4gICAgICAgICAgaWYgKHZtYXBbdG9rZW5OYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgICB2bWFwW3Rva2VuTmFtZV0gPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZtYXBbdG9rZW5OYW1lXS5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB2bWFwW3Rva2VuTmFtZV0ucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG4iXX0=