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
import { getCodeIdentifiers } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { EventEmitter, Injectable } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { BehaviorSubject, from, Observable, of as obsOf, Subject, Subscription, timer, } from 'rxjs';
import { distinctUntilChanged, filter, map, pairwise, scan, share, startWith, switchMap, withLatestFrom, } from 'rxjs/operators';
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
import { flattenNodesInstances } from './utils/nodes-instances/flatten-nodes-instances';
import { flattenNodesInstancesTree } from './utils/nodes-instances/flatten-nodes-instances-tree';
import { isFieldInstance } from './utils/nodes-instances/is-field-instance';
import { isNodeGroupInstance } from './utils/nodes-instances/is-node-group-instance';
import { isRepeatingContainerNodeInstance } from './utils/nodes-instances/is-repeating-container-node-instance';
import { isRepeatingGroupInstance } from './utils/nodes-instances/is-repeating-group-instance';
import { isRepeatingSlideInstance } from './utils/nodes-instances/is-repeating-slide-instance';
import { isSlideInstance } from './utils/nodes-instances/is-slide-instance';
import { isSlidesInstance } from './utils/nodes-instances/is-slides-instance';
import { nodeInstanceCompleteName } from './utils/nodes-instances/node-instance-complete-name';
import { nodeInstanceSuffix } from './utils/nodes-instances/node-instance-suffix';
import { nodeToNodeInstance } from './utils/nodes-instances/node-to-node-instance';
import { updateConditionalBranches } from './utils/nodes-instances/update-conditional-branches';
import { updateEditability } from './utils/nodes-instances/update-editability';
import { updateVisibility } from './utils/nodes-instances/update-visibility';
import { flattenNodes } from './utils/nodes/flatten-nodes';
import { isContainerNode } from './utils/nodes/is-container-node';
import { orderedNodes } from './utils/nodes/ordered-nodes';
import { updateRepsNum } from './utils/slides-instances/update-reps-num';
import { validSlide } from './utils/slides-instances/valid-slide';
import * as i0 from "@angular/core";
import * as i1 from "./validation-service";
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
export class AjfFormRendererService {
    constructor(_) {
        this._editabilityNodesMapUpdates = new Subject();
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
        this.formInitEvent = this
            ._formInitEvent;
        this._formGroup = new BehaviorSubject(null);
        this.formGroup = this
            ._formGroup;
        this._form = new BehaviorSubject(null);
        this._nodesUpdates = new Subject();
        this._formGroupSubscription = Subscription.EMPTY;
        this._valueChanged = new Subject();
        this._nextSlideTrigger = new EventEmitter();
        this.nextSlideTrigger = this
            ._nextSlideTrigger;
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
        if (form != null &&
            Object.keys(context).length === 0 &&
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
        return this.formGroup.pipe(map(f => {
            if (field == null) {
                return null;
            }
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
            nodes.forEach(node => {
                if (isRepeatingSlideInstance(node)) {
                    for (let i = 0; i < node.reps; i++) {
                        if (node.visible) {
                            currentPosition++;
                            if (i == 0) {
                                node.position = currentPosition;
                            }
                            if (!validSlide(node, i)) {
                                errors.push(currentPosition);
                            }
                        }
                    }
                }
                else if (isSlideInstance(node)) {
                    if (node.visible) {
                        currentPosition++;
                        node.position = currentPosition;
                        if (!node.valid) {
                            errors.push(currentPosition);
                        }
                    }
                }
            });
            form.valid = errors.length == 0;
            this._slidesNum.next(currentPosition);
            return errors;
        }), share());
        this._errors = this._errorPositions.pipe(map(e => (e != null ? e.length : 0)), startWith(0), share());
    }
    _initUpdateMapStreams() {
        const startValue = () => ({});
        this._editabilityNodesMap = (this._editabilityNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._visibilityNodesMap = (this._visibilityNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._repetitionNodesMap = (this._repetitionNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._conditionalBranchNodesMap = (this._conditionalBranchNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._formulaNodesMap = (this._formulaNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._validationNodesMap = (this._validationNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._warningNodesMap = (this._warningNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._filteredChoicesNodesMap = (this._filteredChoicesNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._triggerConditionsNodesMap = (this._triggerConditionsNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._nextSlideConditionsNodesMap = (this._nextSlideConditionsNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._nodesMaps = [
            this._editabilityNodesMap,
            this._visibilityNodesMap,
            this._repetitionNodesMap,
            this._conditionalBranchNodesMap,
            this._formulaNodesMap,
            this._validationNodesMap,
            this._warningNodesMap,
            this._nextSlideConditionsNodesMap,
            this._filteredChoicesNodesMap,
            this._triggerConditionsNodesMap,
        ];
    }
    _initFormStreams() {
        const formObs = this._form;
        formObs
            .pipe(map(_form => {
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
            return from(Promise.all(choicesOrigins.map(co => initChoicesOrigin(co)))).pipe(map(() => form));
        }), map(formDef => {
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
                nodes.forEach(node => {
                    if (isRepeatingSlideInstance(node)) {
                        for (let i = 0; i < node.reps; i++) {
                            if (node.visible) {
                                currentPosition++;
                                if (i == 0) {
                                    node.position = currentPosition;
                                }
                            }
                        }
                    }
                    else if (isSlideInstance(node)) {
                        if (node.visible) {
                            currentPosition++;
                            node.position = currentPosition;
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
        if (instance == null) {
            return null;
        }
        if (isRepeatingGroupInstance(instance)) {
            this._explodeRepeatingNode(allNodes, instance, context);
        }
        else if (isSlideInstance(instance)) {
            instance.nodes = this._orderedNodesInstancesTree(allNodes, instance.node.nodes, instance.node.id, prefix, context);
            updateEditability(instance, context);
        }
        updateVisibility(instance, context, branchVisibility);
        updateConditionalBranches(instance, context);
        if (isFieldInstance(instance)) {
            if (isFieldWithChoicesInstance(instance)) {
                updateFilteredChoices(instance, context);
            }
            else {
                if (isTableFieldInstance(instance)) {
                    const { node } = instance;
                    instance.context = context[nodeInstanceCompleteName(instance)] || context;
                    const formGroup = this._formGroup.getValue();
                    let controlsWithLabels = [];
                    controlsWithLabels.push([node.label, node.columnLabels]);
                    if (formGroup != null) {
                        const rowsNum = node.rows.length;
                        for (let rowIdx = 0; rowIdx < rowsNum; rowIdx++) {
                            const row = node.rows[rowIdx];
                            let r = [];
                            const cellNum = row.length;
                            for (let idx = 0; idx < cellNum; idx++) {
                                let cell = row[idx];
                                if (typeof cell === 'string') {
                                    cell = { formula: cell };
                                }
                                /*
                                every control is registered with the cell position
                                inside the form control matrix
                                with this mask `${tNode.name}__${rowIdx}__${idx}`
                                */
                                const name = `${node.name}__${rowIdx}__${idx}`;
                                const type = (node.columnTypes && node.columnTypes[idx]) || 'number';
                                const tableFormControl = {
                                    control: new FormControl(),
                                    show: false,
                                    type,
                                };
                                const value = instance.context[cell.formula] && type === 'number'
                                    ? +instance.context[cell.formula]
                                    : instance.context[cell.formula];
                                tableFormControl.control.setValue(value);
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
                                    updatedEvt: new EventEmitter(),
                                };
                                this._addToNodesFormulaMap(fakeInstance, cell.formula);
                            }
                            controlsWithLabels.push([node.rowLabels[rowIdx], r]);
                        }
                        instance.controls = controlsWithLabels;
                    }
                }
                else {
                    instance.value = context[nodeInstanceCompleteName(instance)];
                }
            }
            updateFieldInstanceState(instance, context);
        }
        this._addNodeInstance(instance);
        return instance;
    }
    _adjustReps(allNodes, instance, oldReps, context) {
        const newReps = instance.reps;
        const result = {
            added: null,
            removed: null,
        };
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
                    label: instance.node.label,
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
                const orderedListNodes = orderedNodes(group.nodes, instance.node.id);
                orderedListNodes.forEach(n => {
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
            result.removed.forEach(n => {
                this._removeNodeInstance(n);
            });
        }
        if (oldReps != newReps && instance.formulaReps == null) {
            const fg = this._formGroup.getValue();
            const completeName = nodeInstanceCompleteName(instance);
            if (fg != null && fg.contains(completeName)) {
                fg.controls[completeName].setValue(instance.reps);
            }
        }
        instance.flatNodes = flattenNodesInstances(instance.nodes);
        if (isRepeatingSlideInstance(instance)) {
            const slideNodes = [];
            const nodesPerSlide = instance.nodes != null ? instance.nodes.length / instance.reps : 0;
            for (let i = 0; i < instance.reps; i++) {
                const startNode = i * nodesPerSlide;
                slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
            }
            instance.slideNodes = slideNodes;
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
            const branchVisibility = parentNodeInstance != null
                ? parentNodeInstance.verifiedBranch != null &&
                    parentNodeInstance.verifiedBranch == node.parentNode
                : true;
            const nni = this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
            if (nni != null) {
                nodesInstances.push(nni);
            }
        });
        return nodesInstances;
    }
    _formValueDelta(oldValue, newValue) {
        const allKeys = [];
        [...Object.keys(oldValue), ...Object.keys(newValue)].forEach(key => {
            if (key !== '$value' && allKeys.indexOf(key) === -1) {
                allKeys.push(key);
            }
        });
        return allKeys.filter(k => oldValue[k] !== newValue[k]);
    }
    _initFormGroupStreams(formGroup) {
        this._formGroupSubscription.unsubscribe();
        let init = true;
        let initForm = true;
        this._formInitEvent.emit(0 /* Initializing */);
        this._formGroupSubscription = formGroup.valueChanges
            .pipe(startWith({}), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), pairwise(), withLatestFrom(this._nodesMaps[0], this._nodesMaps[1], this._nodesMaps[2], this._nodesMaps[3], this._nodesMaps[4], this._nodesMaps[5], this._nodesMaps[6], this._nodesMaps[7], this._nodesMaps[8], this._nodesMaps[9], this._flatNodes))
            .subscribe(v => {
            const oldFormValue = (init && {}) || v[0][0];
            init = false;
            const newFormValue = v[0][1];
            const editability = v[1];
            const visibilityMap = v[2];
            const repetitionMap = v[3];
            const conditionalBranchesMap = v[4];
            const formulaMap = v[5];
            const validationMap = v[6];
            const warningMap = v[7];
            const nextSlideConditionsMap = v[8];
            const filteredChoicesMap = v[9];
            const triggerConditionsMap = v[10];
            const nodes = v[11];
            // takes the names of the fields that have changed
            const delta = this._formValueDelta(oldFormValue, newFormValue);
            const deltaLen = delta.length;
            let updatedNodes = [];
            /*
                            for each field update all properties map
                            with the following rule  "if fieldname is in map update it" and
                            push on updateNodes the node instance that wrap field
                          */
            delta.forEach(fieldName => {
                updatedNodes = updatedNodes.concat(nodes.filter(n => nodeInstanceCompleteName(n) === fieldName));
                if (editability[fieldName] != null) {
                    editability[fieldName].forEach(nodeInstance => {
                        if (isSlideInstance(nodeInstance)) {
                            updateEditability(nodeInstance, newFormValue);
                        }
                    });
                }
                if (visibilityMap[fieldName] != null) {
                    visibilityMap[fieldName].forEach(nodeInstance => {
                        updateVisibilityMapEntry(nodeInstance, this._formGroup, newFormValue);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (repetitionMap[fieldName] != null) {
                    repetitionMap[fieldName].forEach(nodeInstance => {
                        updateRepetitionMapEntry(nodeInstance, newFormValue, nodes, this._adjustReps);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (conditionalBranchesMap[fieldName] != null) {
                    conditionalBranchesMap[fieldName].forEach(nodeInstance => {
                        updateConditionalBranchesMapEntry(nodeInstance, newFormValue, nodes, this._showSubtree, this._hideSubtree);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (formulaMap[fieldName] != null) {
                    formulaMap[fieldName].forEach(nodeInstance => {
                        updateFormulaMapEntry(nodeInstance, newFormValue, this._formGroup);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (validationMap[fieldName] != null) {
                    validationMap[fieldName].forEach(nodeInstance => {
                        updateValidationMapEntry(nodeInstance, newFormValue, this.currentSupplementaryInformations);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (warningMap[fieldName] != null) {
                    warningMap[fieldName].forEach(nodeInstance => {
                        updateWarningMapEntry(nodeInstance, newFormValue);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
                    if (nextSlideConditionsMap[fieldName].filter(nodeInstance => {
                        if (isFieldInstance(nodeInstance)) {
                            return updateNextSlideCondition(nodeInstance, newFormValue);
                        }
                        return false;
                    }).length == 1) {
                        this._nextSlideTrigger.emit();
                    }
                }
                if (filteredChoicesMap[fieldName] != null) {
                    filteredChoicesMap[fieldName].forEach(nodeInstance => {
                        updateFilteredChoicesMapEntry(nodeInstance, newFormValue);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
                    const res = triggerConditionsMap[fieldName].filter(nodeInstance => {
                        if (!isFieldWithChoicesInstance(nodeInstance)) {
                            return false;
                        }
                        return updateTriggerConditions(nodeInstance, newFormValue);
                    });
                    if (res.length == 1 && isFieldWithChoicesInstance(res[0])) {
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
        subNodes.forEach(n => {
            if (!isContainer ||
                (isContainer && node.node.nodes.find(cn => cn.id == n.node.id) == null)) {
                updateVisibility(n, context, visible);
                if (isFieldInstance(n)) {
                    updateFormula(n, context);
                }
                this._updateSubtreeVisibility(context, nodes, n, visible);
            }
        });
    }
    _initNodesStreams() {
        this._nodes = this._nodesUpdates.pipe(scan((nodes, op) => {
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
        const fg = this._formGroup.getValue();
        if (fg != null) {
            const curValue = fg.value;
            const newFormValue = { ...curValue, [nodeName]: undefined };
            fg.patchValue(newFormValue);
        }
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
            this._removeNodesEditabilityMapIndex(nodeName);
            return this._removeSlideInstance(nodeInstance);
        }
        else if (isRepeatingContainerNodeInstance(nodeInstance)) {
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
        if (isRepeatingContainerNodeInstance(fieldInstance)) {
            if (fieldInstance.formulaReps != null) {
                this._removeFromNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach(condition => {
                this._removeFromNodesValidationMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach(condition => {
                this._removeFromNodesWarningMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._removeFromNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isFieldWithChoicesInstance(fieldInstance)) {
            if (fieldInstance.choicesFilter != null) {
                this._removeFromNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
                if (fieldInstance.triggerConditions != null) {
                    fieldInstance.triggerConditions.forEach(condition => {
                        this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                    });
                }
            }
        }
        return fieldInstance;
    }
    _addNodeInstance(nodeInstance) {
        if (isRepeatingContainerNodeInstance(nodeInstance)) {
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
            if (fieldInstance.formulaReps != null) {
                this._addToNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach(condition => {
                this._addToNodesValidationMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach(condition => {
                this._addToNodesWarningMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._addToNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isFieldWithChoicesInstance(fieldInstance)) {
            if (fieldInstance.choicesFilter != null) {
                this._addToNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
            }
            if (fieldInstance.triggerConditions != null) {
                fieldInstance.triggerConditions.forEach((condition) => {
                    this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                });
            }
        }
        return fieldInstance;
    }
    _addSlideInstance(slideInstance) {
        const slide = slideInstance.node;
        if (slide.readonly != null) {
            this._addToNodesEditabilityMap(slideInstance, slide.readonly.condition);
        }
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
    _removeNodesEditabilityMapIndex(index) {
        this._removeNodesMapIndex(this._editabilityNodesMapUpdates, index);
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
        const tokens = getCodeIdentifiers(formula);
        if (tokens.length > 0) {
            nodesMap.next((vmap) => {
                tokens.forEach(token => {
                    if (vmap[token] != null) {
                        const idx = vmap[token].indexOf(nodeInstance);
                        if (idx > -1) {
                            vmap[token].splice(idx, 1);
                            if (vmap[token].length == 0) {
                                delete vmap[token];
                            }
                        }
                    }
                });
                return vmap;
            });
        }
    }
    _addToNodesEditabilityMap(nodeInstance, formula) {
        this._addToNodesMap(this._editabilityNodesMapUpdates, nodeInstance, formula);
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
        const tokens = getCodeIdentifiers(formula);
        if (tokens.length > 0) {
            nodesMap.next((vmap) => {
                tokens.forEach(token => {
                    if (vmap[token] == null) {
                        vmap[token] = [];
                    }
                    if (vmap[token].indexOf(nodeInstance) === -1) {
                        vmap[token].push(nodeInstance);
                    }
                });
                return vmap;
            });
        }
    }
}
AjfFormRendererService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormRendererService, deps: [{ token: i1.AjfValidationService }], target: i0.ɵɵFactoryTarget.Injectable });
AjfFormRendererService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormRendererService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormRendererService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AjfValidationService }]; } });
const updateVisibilityMapEntry = (nodeInstance, formGroup, newFormValue) => {
    const completeName = nodeInstanceCompleteName(nodeInstance);
    const visibilityChanged = updateVisibility(nodeInstance, newFormValue);
    const isField = isFieldInstance(nodeInstance);
    if (visibilityChanged && !nodeInstance.visible) {
        const fg = formGroup.getValue();
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
        const fg = formGroup.getValue();
        const res = updateFormula(nodeInstance, newFormValue);
        if (fg != null && res.changed) {
            fg.controls[completeName].setValue(res.value);
        }
    }
};
const updateRepetitionMapEntry = (nodeInstance, newFormValue, nodes, cb) => {
    if (isRepeatingContainerNodeInstance(nodeInstance)) {
        const oldReps = updateRepsNum(nodeInstance, newFormValue);
        if (oldReps !== nodeInstance.reps) {
            cb(nodes, nodeInstance, oldReps, newFormValue);
        }
    }
};
const updateConditionalBranchesMapEntry = (nodeInstance, newFormValue, nodes, showCb, hideCb) => {
    // const branchChanged =
    // nodeInstance.updateConditionalBranches(newFormValue);
    updateConditionalBranches(nodeInstance, newFormValue);
    // if (branchChanged) {
    const verifiedBranch = nodeInstance.verifiedBranch;
    nodeInstance.conditionalBranches.forEach((_condition, idx) => {
        if (idx == verifiedBranch) {
            showCb(newFormValue, nodes, nodeInstance, idx);
        }
        else {
            hideCb(newFormValue, nodes, nodeInstance, idx);
        }
    });
    // }
};
const updateFormulaMapEntry = (nodeInstance, newFormValue, formGroup) => {
    if (isFieldInstance(nodeInstance)) {
        const res = updateFormula(nodeInstance, newFormValue);
        const fg = formGroup.getValue();
        if (fg != null && res.changed) {
            updateValidation(nodeInstance, newFormValue);
            fg.controls[nodeInstanceCompleteName(nodeInstance)].setValue(res.value);
        }
    }
};
const updateValidationMapEntry = (nodeInstance, newFormValue, supp) => {
    if (isFieldInstance(nodeInstance)) {
        newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
        updateValidation(nodeInstance, newFormValue, supp);
    }
};
const updateWarningMapEntry = (nodeInstance, newFormValue) => {
    if (isFieldInstance(nodeInstance)) {
        updateWarning(nodeInstance, newFormValue);
        if (nodeInstance.warningResults != null &&
            nodeInstance.warningResults.filter(warning => warning.result).length > 0) {
            nodeInstance.warningTrigger.emit();
        }
    }
};
const updateFilteredChoicesMapEntry = (nodeInstance, newFormValue) => {
    if (isFieldWithChoicesInstance(nodeInstance)) {
        updateFilteredChoices(nodeInstance, newFormValue);
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUEyQixrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQWtCLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQ0wsZUFBZSxFQUNmLElBQUksRUFDSixVQUFVLEVBQ1YsRUFBRSxJQUFJLEtBQUssRUFDWCxPQUFPLEVBRVAsWUFBWSxFQUNaLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULGNBQWMsR0FDZixNQUFNLGdCQUFnQixDQUFDO0FBR3hCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQVEzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFPeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0seURBQXlELENBQUM7QUFDbkcsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1B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WUFBWSxDQUFDLHdCQUF3QixDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7UUFDM0UsZ0JBQWdCLENBQUMsWUFBWSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztLQUNwRDtBQUNILENBQUMsQ0FBQztBQUVGLE1BQU0scUJBQXFCLEdBQUcsQ0FBQyxZQUE2QixFQUFFLFlBQWlCLEVBQUUsRUFBRTtJQUNqRixJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQUMsRUFBRTtRQUNqQyxhQUFhLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQzFDLElBQ0UsWUFBWSxDQUFDLGNBQWMsSUFBSSxJQUFJO1lBQ25DLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ3hFO1lBQ0EsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNwQztLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSw2QkFBNkIsR0FBRyxDQUFDLFlBQTZCLEVBQUUsWUFBaUIsRUFBRSxFQUFFO0lBQ3pGLElBQUksMEJBQTBCLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDNUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQ25EO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgQWpmQ29udGV4dCwgZ2V0Q29kZUlkZW50aWZpZXJzfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBmcm9tLFxuICBPYnNlcnZhYmxlLFxuICBvZiBhcyBvYnNPZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJlcixcbiAgU3Vic2NyaXB0aW9uLFxuICB0aW1lcixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHBhaXJ3aXNlLFxuICBzY2FuLFxuICBzaGFyZSxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXAsXG4gIHdpdGhMYXRlc3RGcm9tLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7QWpmVGFibGVGb3JtQ29udHJvbH0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvdGFibGUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXB9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUtZ3JvdXAnO1xuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL29wZXJhdGlvbnMvbm9kZXMtaW5zdGFuY2VzLW9wZXJhdGlvbic7XG5pbXBvcnQge0FqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9ufSBmcm9tICcuL2ludGVyZmFjZS9vcGVyYXRpb25zL3JlbmRlcmVyLXVwZGF0ZS1tYXAtb3BlcmF0aW9uJztcbmltcG9ydCB7QWpmUmVuZGVyZXJVcGRhdGVNYXB9IGZyb20gJy4vaW50ZXJmYWNlL3JlbmRlcmVyLW1hcHMvdXBkYXRlLW1hcCc7XG5pbXBvcnQge0FqZkJhc2VTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL2Jhc2Utc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpbml0Q2hvaWNlc09yaWdpbn0gZnJvbSAnLi91dGlscy9jaG9pY2VzL2luaXQtY2hvaWNlcy1vcmlnaW4nO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2lzVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVGaWVsZEluc3RhbmNlU3RhdGV9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmllbGQtaW5zdGFuY2Utc3RhdGUnO1xuaW1wb3J0IHt1cGRhdGVGaWx0ZXJlZENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmlsdGVyZWQtY2hvaWNlcyc7XG5pbXBvcnQge3VwZGF0ZUZvcm11bGF9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZm9ybXVsYSc7XG5pbXBvcnQge3VwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1uZXh0LXNsaWRlLWNvbmRpdGlvbic7XG5pbXBvcnQge3VwZGF0ZVRyaWdnZXJDb25kaXRpb25zfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLXRyaWdnZXItY29uZGl0aW9ucyc7XG5pbXBvcnQge3VwZGF0ZVZhbGlkYXRpb259IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdmFsaWRhdGlvbic7XG5pbXBvcnQge3VwZGF0ZVdhcm5pbmd9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtd2FybmluZyc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXNJbnN0YW5jZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2ZsYXR0ZW4tbm9kZXMtaW5zdGFuY2VzJztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzSW5zdGFuY2VzVHJlZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMtdHJlZSc7XG5pbXBvcnQge2lzRmllbGRJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc05vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXJlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzUmVwZWF0aW5nR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtcmVwZWF0aW5nLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7aXNTbGlkZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGVzLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VTdWZmaXh9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2Utc3VmZml4JztcbmltcG9ydCB7bm9kZVRvTm9kZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLXRvLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtY29uZGl0aW9uYWwtYnJhbmNoZXMnO1xuaW1wb3J0IHt1cGRhdGVFZGl0YWJpbGl0eX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLWVkaXRhYmlsaXR5JztcbmltcG9ydCB7dXBkYXRlVmlzaWJpbGl0eX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLXZpc2liaWxpdHknO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMvZmxhdHRlbi1ub2Rlcyc7XG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZX0gZnJvbSAnLi91dGlscy9ub2Rlcy9pcy1jb250YWluZXItbm9kZSc7XG5pbXBvcnQge29yZGVyZWROb2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9vcmRlcmVkLW5vZGVzJztcbmltcG9ydCB7dXBkYXRlUmVwc051bX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3VwZGF0ZS1yZXBzLW51bSc7XG5pbXBvcnQge3ZhbGlkU2xpZGV9IGZyb20gJy4vdXRpbHMvc2xpZGVzLWluc3RhbmNlcy92YWxpZC1zbGlkZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICcuL3ZhbGlkYXRpb24tc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIEFqZkZvcm1Jbml0U3RhdHVzIHtcbiAgSW5pdGlhbGl6aW5nLFxuICBDb21wbGV0ZSxcbn1cblxuY29uc3QgdXBkYXRlU2xpZGVWYWxpZGl0eSA9IChzbGlkZTogQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UpID0+IHtcbiAgY29uc3Qgc3ViTm9kZXNOdW0gPSBzbGlkZS5mbGF0Tm9kZXMubGVuZ3RoO1xuICBsZXQgdmFsaWQgPSB0cnVlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN1Yk5vZGVzTnVtOyBpKyspIHtcbiAgICBjb25zdCBzdWJOb2RlID0gc2xpZGUuZmxhdE5vZGVzW2ldO1xuICAgIGlmIChzdWJOb2RlLnZpc2libGUgJiYgaXNGaWVsZEluc3RhbmNlKHN1Yk5vZGUpICYmICFzdWJOb2RlLnZhbGlkKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChzbGlkZS52YWxpZCAhPT0gdmFsaWQpIHtcbiAgICBzbGlkZS52YWxpZCA9IHZhbGlkO1xuICB9XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmRm9ybVJlbmRlcmVyU2VydmljZSB7XG4gIHByaXZhdGUgX2VkaXRhYmlsaXR5Tm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfZWRpdGFiaWxpdHlOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF92aXNpYmlsaXR5Tm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3JlcGV0aXRpb25Ob2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2Zvcm11bGFOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbk5vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfd2FybmluZ05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2Zvcm1Jbml0RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtSW5pdFN0YXR1cz4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1Jbml0U3RhdHVzPigpO1xuICByZWFkb25seSBmb3JtSW5pdEV2ZW50OiBPYnNlcnZhYmxlPEFqZkZvcm1Jbml0U3RhdHVzPiA9IHRoaXNcbiAgICAuX2Zvcm1Jbml0RXZlbnQgYXMgT2JzZXJ2YWJsZTxBamZGb3JtSW5pdFN0YXR1cz47XG5cbiAgcHJpdmF0ZSBfZm9ybUdyb3VwOiBCZWhhdmlvclN1YmplY3Q8Rm9ybUdyb3VwIHwgbnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZvcm1Hcm91cCB8IG51bGw+KFxuICAgIG51bGwsXG4gICk7XG4gIHJlYWRvbmx5IGZvcm1Hcm91cDogT2JzZXJ2YWJsZTxGb3JtR3JvdXAgfCBudWxsPiA9IHRoaXNcbiAgICAuX2Zvcm1Hcm91cCBhcyBPYnNlcnZhYmxlPEZvcm1Hcm91cCB8IG51bGw+O1xuXG4gIHByaXZhdGUgX2Zvcm06IEJlaGF2aW9yU3ViamVjdDx7XG4gICAgZm9ybTogQWpmRm9ybSB8IG51bGw7XG4gICAgY29udGV4dD86IEFqZkNvbnRleHQ7XG4gIH0gfCBudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8e1xuICAgIGZvcm06IEFqZkZvcm0gfCBudWxsO1xuICAgIGNvbnRleHQ/OiBBamZDb250ZXh0O1xuICB9IHwgbnVsbD4obnVsbCk7XG4gIHByaXZhdGUgX25vZGVzITogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2RlcyE6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlW10+O1xuICBwcml2YXRlIF9mbGF0Tm9kZXNUcmVlITogT2JzZXJ2YWJsZTxBamZTbGlkZUluc3RhbmNlW10+O1xuICBwcml2YXRlIF9ub2Rlc1VwZGF0ZXM6IFN1YmplY3Q8QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnMhOiBPYnNlcnZhYmxlPG51bWJlcltdPjtcbiAgcHJpdmF0ZSBfZXJyb3JzITogT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIHByaXZhdGUgX2Zvcm1Hcm91cFN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF92YWx1ZUNoYW5nZWQ6IFN1YmplY3Q8dm9pZD4gPSBuZXcgU3ViamVjdDx2b2lkPigpO1xuXG4gIHByaXZhdGUgX25vZGVzTWFwcyE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+W107XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlVHJpZ2dlcjogRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4oKTtcbiAgcmVhZG9ubHkgbmV4dFNsaWRlVHJpZ2dlcjogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2U+ID0gdGhpc1xuICAgIC5fbmV4dFNsaWRlVHJpZ2dlciBhcyBPYnNlcnZhYmxlPEFqZk5vZGVJbnN0YW5jZT47XG5cbiAgcHJpdmF0ZSBfc2xpZGVzTnVtOiBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8bnVtYmVyPigwKTtcbiAgcmVhZG9ubHkgc2xpZGVzTnVtOiBPYnNlcnZhYmxlPG51bWJlcj4gPSB0aGlzLl9zbGlkZXNOdW0gYXMgT2JzZXJ2YWJsZTxudW1iZXI+O1xuXG4gIGdldCBub2Rlc1RyZWUoKTogT2JzZXJ2YWJsZTxBamZTbGlkZUluc3RhbmNlW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZmxhdE5vZGVzVHJlZTtcbiAgfVxuICBnZXQgZXJyb3JQb3NpdGlvbnMoKTogT2JzZXJ2YWJsZTxudW1iZXJbXT4ge1xuICAgIHJldHVybiB0aGlzLl9lcnJvclBvc2l0aW9ucztcbiAgfVxuICBnZXQgZXJyb3JzKCk6IE9ic2VydmFibGU8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9ycztcbiAgfVxuICBnZXQgY3VycmVudFN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMoKTogYW55IHtcbiAgICBjb25zdCBmb3JtID0gdGhpcy5fZm9ybS5nZXRWYWx1ZSgpO1xuICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5mb3JtICE9IG51bGwgPyBmb3JtLmZvcm0uc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyA6IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihfOiBBamZWYWxpZGF0aW9uU2VydmljZSkge1xuICAgIHRoaXMuX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdE5vZGVzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRFcnJvcnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEZvcm1TdHJlYW1zKCk7XG4gICAgdGhpcy5fdXBkYXRlRm9ybVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgfVxuXG4gIHNldEZvcm0oZm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ6IEFqZkNvbnRleHQgPSB7fSkge1xuICAgIHRoaXMuX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk7XG4gICAgaWYgKFxuICAgICAgZm9ybSAhPSBudWxsICYmXG4gICAgICBPYmplY3Qua2V5cyhjb250ZXh0KS5sZW5ndGggPT09IDAgJiZcbiAgICAgIE9iamVjdC5rZXlzKGZvcm0uaW5pdENvbnRleHQgfHwge30pLmxlbmd0aCA+IDBcbiAgICApIHtcbiAgICAgIGNvbnRleHQgPSBmb3JtLmluaXRDb250ZXh0IHx8IHt9O1xuICAgIH1cbiAgICBjb25zdCBjdXJyZW50Rm9ybSA9IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKTtcbiAgICBpZiAoXG4gICAgICAoY3VycmVudEZvcm0gPT0gbnVsbCAmJiBmb3JtICE9IG51bGwpIHx8XG4gICAgICAoY3VycmVudEZvcm0gIT0gbnVsbCAmJiBmb3JtICE9PSBjdXJyZW50Rm9ybS5mb3JtKVxuICAgICkge1xuICAgICAgdGhpcy5fZm9ybS5uZXh0KHtmb3JtOiBmb3JtLCBjb250ZXh0OiBjb250ZXh0fSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Rm9ybVZhbHVlKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7XG4gICAgICByZXR1cm4ge307XG4gICAgfVxuICAgIGxldCByZXMgPSBkZWVwQ29weShmb3JtR3JvdXAudmFsdWUpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhZGRHcm91cChncm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBpZiAoZ3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1heFJlcHMgPSBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBpZiAobWF4UmVwcyA+IDAgJiYgZ3JvdXAucmVwcyArIDEgPiBtYXhSZXBzKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkUmVwcyA9IGdyb3VwLnJlcHM7XG4gICAgICBncm91cC5yZXBzID0gZ3JvdXAucmVwcyArIDE7XG4gICAgICBncm91cC5jYW5BZGQgPSBncm91cC5ub2RlLm1heFJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA8IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGdyb3VwLmNhblJlbW92ZSA9IGdyb3VwLm5vZGUubWluUmVwcyA9PT0gMCB8fCBncm91cC5yZXBzID4gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgY29uc3QgZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzSW5zdGFuY2VzKG5vZGVzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhmbGF0Tm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlR3JvdXAoZ3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgaWYgKGdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBtaW5SZXBzID0gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgaWYgKGdyb3VwLnJlcHMgLSAxIDwgbWluUmVwcykge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFJlcHMgPSBncm91cC5yZXBzO1xuICAgICAgZ3JvdXAucmVwcyA9IGdyb3VwLnJlcHMgLSAxO1xuICAgICAgZ3JvdXAuY2FuQWRkID0gZ3JvdXAubm9kZS5tYXhSZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPCBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBncm91cC5jYW5SZW1vdmUgPSBncm91cC5ub2RlLm1pblJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA+IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgIHRoaXMuX2FkanVzdFJlcHMobm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJvbChmaWVsZDogQWpmRmllbGRJbnN0YW5jZSB8IHVuZGVmaW5lZCk6IE9ic2VydmFibGU8QWJzdHJhY3RDb250cm9sIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLmZvcm1Hcm91cC5waXBlKFxuICAgICAgbWFwKGYgPT4ge1xuICAgICAgICBpZiAoZmllbGQgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZCk7XG4gICAgICAgIHJldHVybiBmICE9IG51bGwgJiYgZi5jb250YWlucyhmaWVsZE5hbWUpID8gZi5jb250cm9sc1tmaWVsZE5hbWVdIDogbnVsbDtcbiAgICAgIH0pLFxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RXJyb3JzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvclBvc2l0aW9ucyA9IHRoaXMuX3ZhbHVlQ2hhbmdlZC5waXBlKFxuICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fbm9kZXMsIHRoaXMuX2Zvcm0pLFxuICAgICAgZmlsdGVyKFxuICAgICAgICAoW18sIF9fLCBmb3JtXSkgPT5cbiAgICAgICAgICBmb3JtICE9IG51bGwgJiZcbiAgICAgICAgICAoXG4gICAgICAgICAgICBmb3JtIGFzIHtcbiAgICAgICAgICAgICAgZm9ybTogQWpmRm9ybSB8IG51bGw7XG4gICAgICAgICAgICAgIGNvbnRleHQ/OiBBamZDb250ZXh0O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICkuZm9ybSAhPSBudWxsLFxuICAgICAgKSxcbiAgICAgIG1hcCgoW18sIG5vZGVzLCBmb3JtRGVmXSkgPT4ge1xuICAgICAgICBjb25zdCBmb3JtID0gKFxuICAgICAgICAgIGZvcm1EZWYgYXMge1xuICAgICAgICAgICAgZm9ybTogQWpmRm9ybSB8IG51bGw7XG4gICAgICAgICAgICBjb250ZXh0PzogQWpmQ29udGV4dDtcbiAgICAgICAgICB9XG4gICAgICAgICkuZm9ybSBhcyBBamZGb3JtO1xuICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgY29uc3QgZXJyb3JzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgIGlmIChpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2Uobm9kZSkpIHtcbiAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5yZXBzOyBpKyspIHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghdmFsaWRTbGlkZShub2RlLCBpKSkge1xuICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlKSkge1xuICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgaWYgKCFub2RlLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGZvcm0udmFsaWQgPSBlcnJvcnMubGVuZ3RoID09IDA7XG4gICAgICAgIHRoaXMuX3NsaWRlc051bS5uZXh0KGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICB9KSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9lcnJvcnMgPSB0aGlzLl9lcnJvclBvc2l0aW9ucy5waXBlKFxuICAgICAgbWFwKGUgPT4gKGUgIT0gbnVsbCA/IGUubGVuZ3RoIDogMCkpLFxuICAgICAgc3RhcnRXaXRoKDApLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTogdm9pZCB7XG4gICAgY29uc3Qgc3RhcnRWYWx1ZSA9ICgpOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiAoe30pO1xuICAgIHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9mb3JtdWxhTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl93YXJuaW5nTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXNcbiAgICApKS5waXBlKFxuICAgICAgc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICB9LCB7fSksXG4gICAgICBzdGFydFdpdGgoc3RhcnRWYWx1ZSgpKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcblxuICAgIHRoaXMuX25vZGVzTWFwcyA9IFtcbiAgICAgIHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXAsXG4gICAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXAsXG4gICAgICB0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXAsXG4gICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwLFxuICAgICAgdGhpcy5fZm9ybXVsYU5vZGVzTWFwLFxuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwLFxuICAgICAgdGhpcy5fd2FybmluZ05vZGVzTWFwLFxuICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwLFxuICAgICAgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXAsXG4gICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwLFxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybVN0cmVhbXMoKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybU9icyA9IHRoaXMuX2Zvcm07XG4gICAgZm9ybU9ic1xuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChfZm9ybSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuX2luaXRGb3JtR3JvdXBTdHJlYW1zKG5ldyBGb3JtR3JvdXAoe30pKTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvcm1Hcm91cCk7XG4gICAgZm9ybU9ic1xuICAgICAgLnBpcGUoXG4gICAgICAgIHN3aXRjaE1hcChmb3JtID0+IHtcbiAgICAgICAgICBpZiAoZm9ybSA9PSBudWxsIHx8IGZvcm0uZm9ybSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gb2JzT2YoZm9ybSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGNob2ljZXNPcmlnaW5zID0gZm9ybS5mb3JtLmNob2ljZXNPcmlnaW5zIHx8IFtdO1xuICAgICAgICAgIGlmIChjaG9pY2VzT3JpZ2lucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgIHJldHVybiBvYnNPZihmb3JtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5hbGwoY2hvaWNlc09yaWdpbnMubWFwKGNvID0+IGluaXRDaG9pY2VzT3JpZ2luKGNvKSkpKS5waXBlKFxuICAgICAgICAgICAgbWFwKCgpID0+IGZvcm0pLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBtYXAoZm9ybURlZiA9PiB7XG4gICAgICAgICAgcmV0dXJuIChfbm9kZXNJbnN0YW5jZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICAgICAgbGV0IG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXTtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgZm9ybURlZiAhPSBudWxsICYmXG4gICAgICAgICAgICAgIChcbiAgICAgICAgICAgICAgICBmb3JtRGVmIGFzIHtcbiAgICAgICAgICAgICAgICAgIGZvcm06IEFqZkZvcm0gfCBudWxsO1xuICAgICAgICAgICAgICAgICAgY29udGV4dD86IEFqZkNvbnRleHQ7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApLmZvcm0gIT0gbnVsbFxuICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGZvcm0gPSBmb3JtRGVmIGFzIHtcbiAgICAgICAgICAgICAgICBmb3JtOiBBamZGb3JtO1xuICAgICAgICAgICAgICAgIGNvbnRleHQ6IEFqZkNvbnRleHQ7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgIGNvbnN0IGJhc2VOb2RlcyA9IGZvcm0uZm9ybS5ub2RlcztcbiAgICAgICAgICAgICAgbm9kZXMgPSB0aGlzLl9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlKFxuICAgICAgICAgICAgICAgIGZsYXR0ZW5Ob2RlcyhiYXNlTm9kZXMpLFxuICAgICAgICAgICAgICAgIGJhc2VOb2RlcyxcbiAgICAgICAgICAgICAgICB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgW10sXG4gICAgICAgICAgICAgICAgZm9ybS5jb250ZXh0IHx8IHt9LFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICAgICAgaWYgKGlzUmVwZWF0aW5nU2xpZGVJbnN0YW5jZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbm9kZS5yZXBzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlKSkge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgbm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgKVxuICAgICAgLnN1YnNjcmliZSh0aGlzLl9ub2Rlc1VwZGF0ZXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVJbnN0YW5jZShcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgbm9kZTogQWpmTm9kZSxcbiAgICBwcmVmaXg6IG51bWJlcltdLFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgYnJhbmNoVmlzaWJpbGl0eSA9IHRydWUsXG4gICk6IEFqZk5vZGVJbnN0YW5jZSB8IG51bGwge1xuICAgIGxldCBpbnN0YW5jZSA9IG5vZGVUb05vZGVJbnN0YW5jZShhbGxOb2Rlcywgbm9kZSwgcHJlZml4LCBjb250ZXh0KTtcbiAgICBpZiAoaW5zdGFuY2UgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGlmIChpc1JlcGVhdGluZ0dyb3VwSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICB0aGlzLl9leHBsb2RlUmVwZWF0aW5nTm9kZShhbGxOb2RlcywgaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIH0gZWxzZSBpZiAoaXNTbGlkZUluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgaW5zdGFuY2Uubm9kZXMgPSB0aGlzLl9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlKFxuICAgICAgICBhbGxOb2RlcyxcbiAgICAgICAgaW5zdGFuY2Uubm9kZS5ub2RlcyxcbiAgICAgICAgaW5zdGFuY2Uubm9kZS5pZCxcbiAgICAgICAgcHJlZml4LFxuICAgICAgICBjb250ZXh0LFxuICAgICAgKTtcbiAgICAgIHVwZGF0ZUVkaXRhYmlsaXR5KGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICB9XG4gICAgdXBkYXRlVmlzaWJpbGl0eShpbnN0YW5jZSwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgaWYgKGlzRmllbGRJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmIChpc1RhYmxlRmllbGRJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgICAgICBjb25zdCB7bm9kZX0gPSBpbnN0YW5jZTtcbiAgICAgICAgICBpbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dFtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpXSB8fCBjb250ZXh0O1xuICAgICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgIGxldCBjb250cm9sc1dpdGhMYWJlbHM6IFtzdHJpbmcsIChzdHJpbmcgfCBBamZUYWJsZUZvcm1Db250cm9sKVtdXVtdID0gW107XG4gICAgICAgICAgY29udHJvbHNXaXRoTGFiZWxzLnB1c2goW25vZGUubGFiZWwsIG5vZGUuY29sdW1uTGFiZWxzXSk7XG4gICAgICAgICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCByb3dzTnVtID0gbm9kZS5yb3dzLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAobGV0IHJvd0lkeCA9IDA7IHJvd0lkeCA8IHJvd3NOdW07IHJvd0lkeCsrKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJvdyA9IG5vZGUucm93c1tyb3dJZHhdO1xuICAgICAgICAgICAgICBsZXQgcjogQWpmVGFibGVGb3JtQ29udHJvbFtdID0gW107XG4gICAgICAgICAgICAgIGNvbnN0IGNlbGxOdW0gPSByb3cubGVuZ3RoO1xuICAgICAgICAgICAgICBmb3IgKGxldCBpZHggPSAwOyBpZHggPCBjZWxsTnVtOyBpZHgrKykge1xuICAgICAgICAgICAgICAgIGxldCBjZWxsID0gcm93W2lkeF07XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBjZWxsID09PSAnc3RyaW5nJykge1xuICAgICAgICAgICAgICAgICAgY2VsbCA9IHtmb3JtdWxhOiBjZWxsfTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBldmVyeSBjb250cm9sIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgY2VsbCBwb3NpdGlvblxuICAgICAgICAgICAgICAgIGluc2lkZSB0aGUgZm9ybSBjb250cm9sIG1hdHJpeFxuICAgICAgICAgICAgICAgIHdpdGggdGhpcyBtYXNrIGAke3ROb2RlLm5hbWV9X18ke3Jvd0lkeH1fXyR7aWR4fWBcbiAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgJHtub2RlLm5hbWV9X18ke3Jvd0lkeH1fXyR7aWR4fWA7XG4gICAgICAgICAgICAgICAgY29uc3QgdHlwZSA9IChub2RlLmNvbHVtblR5cGVzICYmIG5vZGUuY29sdW1uVHlwZXNbaWR4XSkgfHwgJ251bWJlcic7XG4gICAgICAgICAgICAgICAgY29uc3QgdGFibGVGb3JtQ29udHJvbDogQWpmVGFibGVGb3JtQ29udHJvbCA9IHtcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2w6IG5ldyBGb3JtQ29udHJvbCgpLFxuICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPVxuICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuY29udGV4dFtjZWxsLmZvcm11bGFdICYmIHR5cGUgPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgID8gK2luc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXVxuICAgICAgICAgICAgICAgICAgICA6IGluc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXTtcbiAgICAgICAgICAgICAgICB0YWJsZUZvcm1Db250cm9sLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2wobmFtZSwgdGFibGVGb3JtQ29udHJvbC5jb250cm9sKTtcbiAgICAgICAgICAgICAgICByLnB1c2godGFibGVGb3JtQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgLyogY3JlYXRlIGEgb2JqZWN0IHRoYXQgcmVzcGVjdCB0aGUgaW5zdGFuY2UgaW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgd2l0aCB0aGUgbWluaW11bSBkZWZpbmVkIHByb3BlcnRpZXMgdG8gYWxsb3cgdG8gcnVuIGFkZFRvTm9kZUZvcm11bGEgbWFwKi9cbiAgICAgICAgICAgICAgICBjb25zdCBmYWtlSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogY2VsbC5mb3JtdWxhfSxcbiAgICAgICAgICAgICAgICAgIG5vZGU6IHtuYW1lLCBub2RlVHlwZTogMCwgZWRpdGFibGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBwcmVmaXg6IFtdLFxuICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlczogW10sXG4gICAgICAgICAgICAgICAgICB1cGRhdGVkRXZ0OiBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCksXG4gICAgICAgICAgICAgICAgfSBhcyB1bmtub3duIGFzIEFqZk5vZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRUb05vZGVzRm9ybXVsYU1hcChmYWtlSW5zdGFuY2UsIGNlbGwuZm9ybXVsYSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29udHJvbHNXaXRoTGFiZWxzLnB1c2goW25vZGUucm93TGFiZWxzW3Jvd0lkeF0sIHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlLmNvbnRyb2xzID0gY29udHJvbHNXaXRoTGFiZWxzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnN0YW5jZS52YWx1ZSA9IGNvbnRleHRbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHVwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZShpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgfVxuICAgIHRoaXMuX2FkZE5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRqdXN0UmVwcyhcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgaW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSxcbiAgICBvbGRSZXBzOiBudW1iZXIsXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgKToge2FkZGVkOiBBamZOb2RlSW5zdGFuY2VbXSB8IG51bGw7IHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbH0ge1xuICAgIGNvbnN0IG5ld1JlcHMgPSBpbnN0YW5jZS5yZXBzO1xuICAgIGNvbnN0IHJlc3VsdDoge1xuICAgICAgYWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbDtcbiAgICAgIHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbDtcbiAgICB9ID0ge1xuICAgICAgYWRkZWQ6IG51bGwsXG4gICAgICByZW1vdmVkOiBudWxsLFxuICAgIH07XG4gICAgaWYgKG9sZFJlcHMgPCBuZXdSZXBzKSB7XG4gICAgICBjb25zdCBuZXdOb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlcyA9PSBudWxsKSB7XG4gICAgICAgIGluc3RhbmNlLm5vZGVzID0gW107XG4gICAgICB9XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVGaWVsZCh7XG4gICAgICAgICAgaWQ6IDk5OSxcbiAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICBwYXJlbnQ6IC0xLFxuICAgICAgICAgIGZpZWxkVHlwZTogQWpmRmllbGRUeXBlLkVtcHR5LFxuICAgICAgICAgIGxhYmVsOiBpbnN0YW5jZS5ub2RlLmxhYmVsLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKFxuICAgICAgICAgIGFsbE5vZGVzLFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgaW5zdGFuY2UucHJlZml4LnNsaWNlKDApLFxuICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChuZXdJbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2Uubm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSBvbGRSZXBzOyBpIDwgbmV3UmVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IGluc3RhbmNlLnByZWZpeC5zbGljZSgwKTtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBpbnN0YW5jZS5ub2RlO1xuICAgICAgICBwcmVmaXgucHVzaChpKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZExpc3ROb2RlcyA9IG9yZGVyZWROb2Rlcyhncm91cC5ub2RlcywgaW5zdGFuY2Uubm9kZS5pZCk7XG4gICAgICAgIG9yZGVyZWRMaXN0Tm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG4sIHByZWZpeCwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5ld05vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fYWRkTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5hZGRlZCA9IG5ld05vZGVzO1xuICAgIH0gZWxzZSBpZiAob2xkUmVwcyA+IG5ld1JlcHMpIHtcbiAgICAgIGxldCBub2Rlc051bSA9IGluc3RhbmNlLm5vZGVzLmxlbmd0aCAvIG9sZFJlcHM7XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIG5vZGVzTnVtKys7XG4gICAgICB9XG4gICAgICByZXN1bHQucmVtb3ZlZCA9IGluc3RhbmNlLm5vZGVzLnNwbGljZShuZXdSZXBzICogbm9kZXNOdW0sIG5vZGVzTnVtKTtcbiAgICAgIHJlc3VsdC5yZW1vdmVkLmZvckVhY2gobiA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU5vZGVJbnN0YW5jZShuKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAob2xkUmVwcyAhPSBuZXdSZXBzICYmIGluc3RhbmNlLmZvcm11bGFSZXBzID09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpO1xuICAgICAgaWYgKGZnICE9IG51bGwgJiYgZmcuY29udGFpbnMoY29tcGxldGVOYW1lKSkge1xuICAgICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKGluc3RhbmNlLnJlcHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW5jZS5mbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMoaW5zdGFuY2Uubm9kZXMpO1xuICAgIGlmIChpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICBjb25zdCBzbGlkZU5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXVtdID0gW107XG4gICAgICBjb25zdCBub2Rlc1BlclNsaWRlID0gaW5zdGFuY2Uubm9kZXMgIT0gbnVsbCA/IGluc3RhbmNlLm5vZGVzLmxlbmd0aCAvIGluc3RhbmNlLnJlcHMgOiAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZS5yZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3RhcnROb2RlID0gaSAqIG5vZGVzUGVyU2xpZGU7XG4gICAgICAgIHNsaWRlTm9kZXMucHVzaChpbnN0YW5jZS5ub2Rlcy5zbGljZShzdGFydE5vZGUsIHN0YXJ0Tm9kZSArIG5vZGVzUGVyU2xpZGUpKTtcbiAgICAgIH1cbiAgICAgIGluc3RhbmNlLnNsaWRlTm9kZXMgPSBzbGlkZU5vZGVzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRm9ybVZhbHVlQW5kVmFsaWRpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzXG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fZm9ybUdyb3VwKSxcbiAgICAgICAgZmlsdGVyKChbXywgZmddKSA9PiBmZyAhPT0gbnVsbCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChbXywgZmddKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBmZyBhcyBGb3JtR3JvdXA7XG4gICAgICAgIGZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9leHBsb2RlUmVwZWF0aW5nTm9kZShcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgaW5zdGFuY2U6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSxcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICApIHtcbiAgICBjb25zdCBvbGRSZXBzID0gdXBkYXRlUmVwc051bShpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgaWYgKG9sZFJlcHMgIT09IGluc3RhbmNlLnJlcHMpIHtcbiAgICAgIHRoaXMuX2FkanVzdFJlcHMoYWxsTm9kZXMsIGluc3RhbmNlLCBvbGRSZXBzLCBjb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlKFxuICAgIGFsbE5vZGVzOiBBamZOb2RlW10gfCBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlczogQWpmTm9kZVtdLFxuICAgIHBhcmVudDogbnVtYmVyIHwgbnVsbCA9IG51bGwsXG4gICAgcHJlZml4OiBudW1iZXJbXSA9IFtdLFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICk6IEFqZk5vZGVJbnN0YW5jZVtdIHtcbiAgICBsZXQgbm9kZXNJbnN0YW5jZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgY29uc3QgY3VyU3VmZml4ID0gcHJlZml4Lmxlbmd0aCA+IDAgPyAnX18nICsgcHJlZml4LmpvaW4oJ19fJykgOiAnJztcbiAgICBvcmRlcmVkTm9kZXMobm9kZXMsIHBhcmVudCkuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50Tm9kZUluc3RhbmNlID0gbm9kZXNJbnN0YW5jZXMuZmluZChcbiAgICAgICAgbmkgPT4gbmkubm9kZS5pZCA9PSBub2RlLnBhcmVudCAmJiBub2RlSW5zdGFuY2VTdWZmaXgobmkpID09IGN1clN1ZmZpeCxcbiAgICAgICk7XG4gICAgICBjb25zdCBicmFuY2hWaXNpYmlsaXR5ID1cbiAgICAgICAgcGFyZW50Tm9kZUluc3RhbmNlICE9IG51bGxcbiAgICAgICAgICA/IHBhcmVudE5vZGVJbnN0YW5jZS52ZXJpZmllZEJyYW5jaCAhPSBudWxsICYmXG4gICAgICAgICAgICBwYXJlbnROb2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2ggPT0gbm9kZS5wYXJlbnROb2RlXG4gICAgICAgICAgOiB0cnVlO1xuICAgICAgY29uc3Qgbm5pID0gdGhpcy5faW5pdE5vZGVJbnN0YW5jZShhbGxOb2Rlcywgbm9kZSwgcHJlZml4LCBjb250ZXh0LCBicmFuY2hWaXNpYmlsaXR5KTtcbiAgICAgIGlmIChubmkgIT0gbnVsbCkge1xuICAgICAgICBub2Rlc0luc3RhbmNlcy5wdXNoKG5uaSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vZGVzSW5zdGFuY2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybVZhbHVlRGVsdGEob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSk6IHN0cmluZ1tdIHtcbiAgICBjb25zdCBhbGxLZXlzID0gW10gYXMgc3RyaW5nW107XG4gICAgWy4uLk9iamVjdC5rZXlzKG9sZFZhbHVlKSwgLi4uT2JqZWN0LmtleXMobmV3VmFsdWUpXS5mb3JFYWNoKGtleSA9PiB7XG4gICAgICBpZiAoa2V5ICE9PSAnJHZhbHVlJyAmJiBhbGxLZXlzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgYWxsS2V5cy5wdXNoKGtleSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIGFsbEtleXMuZmlsdGVyKGsgPT4gb2xkVmFsdWVba10gIT09IG5ld1ZhbHVlW2tdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtR3JvdXBTdHJlYW1zKGZvcm1Hcm91cDogRm9ybUdyb3VwKTogRm9ybUdyb3VwIHtcbiAgICB0aGlzLl9mb3JtR3JvdXBTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBsZXQgaW5pdCA9IHRydWU7XG4gICAgbGV0IGluaXRGb3JtID0gdHJ1ZTtcbiAgICB0aGlzLl9mb3JtSW5pdEV2ZW50LmVtaXQoQWpmRm9ybUluaXRTdGF0dXMuSW5pdGlhbGl6aW5nKTtcbiAgICB0aGlzLl9mb3JtR3JvdXBTdWJzY3JpcHRpb24gPSBmb3JtR3JvdXAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKSksXG4gICAgICAgIHBhaXJ3aXNlKCksXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1swXSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbMV0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzJdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1szXSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbNF0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzVdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1s2XSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbN10sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzhdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1s5XSxcbiAgICAgICAgICB0aGlzLl9mbGF0Tm9kZXMsXG4gICAgICAgICksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHYgPT4ge1xuICAgICAgICBjb25zdCBvbGRGb3JtVmFsdWUgPSAoaW5pdCAmJiB7fSkgfHwgdlswXVswXTtcbiAgICAgICAgaW5pdCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBuZXdGb3JtVmFsdWUgPSB2WzBdWzFdO1xuICAgICAgICBjb25zdCBlZGl0YWJpbGl0eSA9IHZbMV07XG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHlNYXAgPSB2WzJdO1xuICAgICAgICBjb25zdCByZXBldGl0aW9uTWFwID0gdlszXTtcbiAgICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlc01hcCA9IHZbNF07XG4gICAgICAgIGNvbnN0IGZvcm11bGFNYXAgPSB2WzVdO1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWFwID0gdls2XTtcbiAgICAgICAgY29uc3Qgd2FybmluZ01hcCA9IHZbN107XG4gICAgICAgIGNvbnN0IG5leHRTbGlkZUNvbmRpdGlvbnNNYXAgPSB2WzhdO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZENob2ljZXNNYXAgPSB2WzldO1xuICAgICAgICBjb25zdCB0cmlnZ2VyQ29uZGl0aW9uc01hcCA9IHZbMTBdO1xuICAgICAgICBjb25zdCBub2RlcyA9IHZbMTFdO1xuXG4gICAgICAgIC8vIHRha2VzIHRoZSBuYW1lcyBvZiB0aGUgZmllbGRzIHRoYXQgaGF2ZSBjaGFuZ2VkXG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5fZm9ybVZhbHVlRGVsdGEob2xkRm9ybVZhbHVlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICBjb25zdCBkZWx0YUxlbiA9IGRlbHRhLmxlbmd0aDtcbiAgICAgICAgbGV0IHVwZGF0ZWROb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcblxuICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGVhY2ggZmllbGQgdXBkYXRlIGFsbCBwcm9wZXJ0aWVzIG1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgZm9sbG93aW5nIHJ1bGUgIFwiaWYgZmllbGRuYW1lIGlzIGluIG1hcCB1cGRhdGUgaXRcIiBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2ggb24gdXBkYXRlTm9kZXMgdGhlIG5vZGUgaW5zdGFuY2UgdGhhdCB3cmFwIGZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgZGVsdGEuZm9yRWFjaChmaWVsZE5hbWUgPT4ge1xuICAgICAgICAgIHVwZGF0ZWROb2RlcyA9IHVwZGF0ZWROb2Rlcy5jb25jYXQoXG4gICAgICAgICAgICBub2Rlcy5maWx0ZXIobiA9PiBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobikgPT09IGZpZWxkTmFtZSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoZWRpdGFiaWxpdHlbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBlZGl0YWJpbGl0eVtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRWRpdGFiaWxpdHkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZpc2liaWxpdHlNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICB2aXNpYmlsaXR5TWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVWaXNpYmlsaXR5TWFwRW50cnkobm9kZUluc3RhbmNlLCB0aGlzLl9mb3JtR3JvdXAsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZXBldGl0aW9uTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVwZXRpdGlvbk1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlUmVwZXRpdGlvbk1hcEVudHJ5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlLCBub2RlcywgdGhpcy5fYWRqdXN0UmVwcyk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb25kaXRpb25hbEJyYW5jaGVzTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlc01hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlc01hcEVudHJ5KFxuICAgICAgICAgICAgICAgIG5vZGVJbnN0YW5jZSxcbiAgICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUsXG4gICAgICAgICAgICAgICAgbm9kZXMsXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1N1YnRyZWUsXG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZVN1YnRyZWUsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmb3JtdWxhTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYU1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlRm9ybXVsYU1hcEVudHJ5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlLCB0aGlzLl9mb3JtR3JvdXApO1xuICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsaWRhdGlvbk1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25NYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZVZhbGlkYXRpb25NYXBFbnRyeShcbiAgICAgICAgICAgICAgICBub2RlSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgbmV3Rm9ybVZhbHVlLFxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh3YXJuaW5nTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgd2FybmluZ01hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlV2FybmluZ01hcEVudHJ5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGRlbHRhTGVuID09IDEgJiYgbmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdLmZpbHRlcihub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbihub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfSkubGVuZ3RoID09IDFcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLl9uZXh0U2xpZGVUcmlnZ2VyLmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZmlsdGVyZWRDaG9pY2VzTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZmlsdGVyZWRDaG9pY2VzTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVGaWx0ZXJlZENob2ljZXNNYXBFbnRyeShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChkZWx0YUxlbiA9PSAxICYmIHRyaWdnZXJDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gdHJpZ2dlckNvbmRpdGlvbnNNYXBbZmllbGROYW1lXS5maWx0ZXIobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB1cGRhdGVUcmlnZ2VyQ29uZGl0aW9ucyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID09IDEgJiYgaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UocmVzWzBdKSkge1xuICAgICAgICAgICAgICByZXNbMF0uc2VsZWN0aW9uVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdXBkYXRlZE5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgY29uc3Qgbm9kZUlkeCA9IG5vZGVzLmluZGV4T2Yobik7XG4gICAgICAgICAgbGV0IGlkeCA9IG5vZGVJZHggLSAxO1xuICAgICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgY3VyTm9kZSA9IG5vZGVzW2lkeF07XG4gICAgICAgICAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShjdXJOb2RlKSkge1xuICAgICAgICAgICAgICB1cGRhdGVTbGlkZVZhbGlkaXR5KGN1ck5vZGUpO1xuICAgICAgICAgICAgICBjdXJOb2RlLnVwZGF0ZWRFdnQuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIG4udXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5pdEZvcm0pIHtcbiAgICAgICAgICBpbml0Rm9ybSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuX2Zvcm1Jbml0RXZlbnQuZW1pdChBamZGb3JtSW5pdFN0YXR1cy5Db21wbGV0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VkLm5leHQoKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBmb3JtR3JvdXA7XG4gIH1cblxuICBwcml2YXRlIF9zaG93U3VidHJlZShcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgYnJhbmNoPzogbnVtYmVyLFxuICApIHtcbiAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2Rlcywgbm9kZSwgdHJ1ZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVTdWJ0cmVlKFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBicmFuY2g/OiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBub2RlLCBmYWxzZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICB2aXNpYmxlOiBib29sZWFuLFxuICAgIGJyYW5jaD86IG51bWJlcixcbiAgKSB7XG4gICAgbGV0IHN1Yk5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXTtcbiAgICBjb25zdCBub2RlU3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG5vZGUpO1xuICAgIGlmIChicmFuY2ggIT0gbnVsbCkge1xuICAgICAgc3ViTm9kZXMgPSBub2Rlcy5maWx0ZXIobiA9PiB7XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IG5vZGVJbnN0YW5jZVN1ZmZpeChuKTtcbiAgICAgICAgcmV0dXJuIHN1ZmZpeCA9PSBub2RlU3VmZml4ICYmIG4ubm9kZS5wYXJlbnQgPT0gbm9kZS5ub2RlLmlkICYmIG4ubm9kZS5wYXJlbnROb2RlID09IGJyYW5jaDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJOb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG4pO1xuICAgICAgICByZXR1cm4gc3VmZml4ID09IG5vZGVTdWZmaXggJiYgbi5ub2RlLnBhcmVudCA9PSBub2RlLm5vZGUuaWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgaXNDb250YWluZXIgPSBpc0NvbnRhaW5lck5vZGUobm9kZS5ub2RlKTtcbiAgICBzdWJOb2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAhaXNDb250YWluZXIgfHxcbiAgICAgICAgKGlzQ29udGFpbmVyICYmICg8QWpmTm9kZUdyb3VwPm5vZGUubm9kZSkubm9kZXMuZmluZChjbiA9PiBjbi5pZCA9PSBuLm5vZGUuaWQpID09IG51bGwpXG4gICAgICApIHtcbiAgICAgICAgdXBkYXRlVmlzaWJpbGl0eShuLCBjb250ZXh0LCB2aXNpYmxlKTtcbiAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShuKSkge1xuICAgICAgICAgIHVwZGF0ZUZvcm11bGEobiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG4sIHZpc2libGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9IHRoaXMuX25vZGVzVXBkYXRlcy5waXBlKFxuICAgICAgc2Nhbigobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBvcDogQWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9mbGF0Tm9kZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgIG1hcChub2RlcyA9PiBmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlKG5vZGVzKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fZmxhdE5vZGVzID0gdGhpcy5fZmxhdE5vZGVzVHJlZS5waXBlKFxuICAgICAgbWFwKHNsaWRlcyA9PiB7XG4gICAgICAgIGxldCBub2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgICAgc2xpZGVzLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgbm9kZXMucHVzaChzKTtcbiAgICAgICAgICBub2RlcyA9IG5vZGVzLmNvbmNhdChzLmZsYXROb2Rlcyk7XG4gICAgICAgICAgdXBkYXRlU2xpZGVWYWxpZGl0eShzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGZnICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGN1clZhbHVlID0gZmcudmFsdWU7XG4gICAgICBjb25zdCBuZXdGb3JtVmFsdWUgPSB7Li4uY3VyVmFsdWUsIFtub2RlTmFtZV06IHVuZGVmaW5lZH07XG4gICAgICBmZy5wYXRjaFZhbHVlKG5ld0Zvcm1WYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZU5vZGVzVmlzaWJpbGl0eU1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1JlcGV0aXRpb25NYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc0Zvcm11bGFNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNWYWxpZGF0aW9uTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzV2FybmluZ01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNGaWx0ZXJlZENob2ljZXNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVOb2Rlc0VkaXRhYmlsaXR5TWFwSW5kZXgobm9kZU5hbWUpO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbW92ZVNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVTbGlkZUluc3RhbmNlKHNsaWRlSW5zdGFuY2U6IEFqZkJhc2VTbGlkZUluc3RhbmNlKTogQWpmQmFzZVNsaWRlSW5zdGFuY2Uge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChzbGlkZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBzbGlkZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKFxuICAgIG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UsXG4gICk6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZUdyb3VwID0gbm9kZUdyb3VwSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAobm9kZUdyb3VwLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgaWYgKG5vZGVHcm91cEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwgJiYgbm9kZUdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGVHcm91cEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRmllbGRJbnN0YW5jZShmaWVsZEluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgY29uc3QgZmllbGRJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGRJbnN0YW5jZSk7XG4gICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmIGZvcm1Hcm91cC5jb250YWlucyhmaWVsZEluc3RhbmNlTmFtZSkpIHtcbiAgICAgIGZvcm1Hcm91cC5yZW1vdmVDb250cm9sKGZpZWxkSW5zdGFuY2VOYW1lKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIGRlbGV0ZSB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBmaWVsZEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGEpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0Zvcm11bGFNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhLmZvcm11bGEpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGNoZWNrIHRoaXMsIHByb2JhYmx5IGlzIG5ldmVyIHZlcmlmaWVkXG4gICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwgJiYgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMuZm9yRWFjaChjb25kaXRpb24gPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWYWxpZGF0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2Uud2FybmluZyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1dhcm5pbmdNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICAgICAgZmllbGRJbnN0YW5jZSxcbiAgICAgICAgZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24uY29uZGl0aW9uLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoZmllbGRJbnN0YW5jZSkpIHtcbiAgICAgIGlmIChmaWVsZEluc3RhbmNlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5jaG9pY2VzRmlsdGVyLmZvcm11bGEpO1xuICAgICAgICBpZiAoZmllbGRJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgZmllbGRJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZE5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZFNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGRGaWVsZEluc3RhbmNlKGZpZWxkSW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBmaWVsZEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZEluc3RhbmNlKTtcbiAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgIWZvcm1Hcm91cC5jb250YWlucyhmaWVsZEluc3RhbmNlTmFtZSkpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICAgIGNvbnRyb2wuc2V0VmFsdWUoZmllbGRJbnN0YW5jZS52YWx1ZSk7XG4gICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKGZpZWxkSW5zdGFuY2VOYW1lLCBjb250cm9sKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdLmluZGV4T2YoZmllbGRJbnN0YW5jZSkgPT0gLTEpIHtcbiAgICAgICAgICB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXS5wdXNoKGZpZWxkSW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgZmllbGRJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYSkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0Zvcm11bGFNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhLmZvcm11bGEpO1xuICAgIH1cblxuICAgIGlmIChpc05vZGVHcm91cEluc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsICYmIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zLmZvckVhY2goY29uZGl0aW9uID0+IHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1ZhbGlkYXRpb25NYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2Uud2FybmluZy5jb25kaXRpb25zLmZvckVhY2goY29uZGl0aW9uID0+IHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1dhcm5pbmdNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAoXG4gICAgICAgIGZpZWxkSW5zdGFuY2UsXG4gICAgICAgIGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uLmNvbmRpdGlvbixcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBpZiAoZmllbGRJbnN0YW5jZS5jaG9pY2VzRmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgICBpZiAoZmllbGRJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIGZpZWxkSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgICAgICB0aGlzLl9hZGRUb05vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkU2xpZGVJbnN0YW5jZShzbGlkZUluc3RhbmNlOiBBamZTbGlkZUluc3RhbmNlKTogQWpmU2xpZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgc2xpZGUgPSBzbGlkZUluc3RhbmNlLm5vZGU7XG4gICAgaWYgKHNsaWRlLnJlYWRvbmx5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNFZGl0YWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS5yZWFkb25seS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBpZiAoc2xpZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIHNsaWRlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGVHcm91cEluc3RhbmNlKFxuICAgIG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UsXG4gICk6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZUdyb3VwID0gbm9kZUdyb3VwSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAobm9kZUdyb3VwLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIG5vZGVHcm91cEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVHcm91cEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuICAgIGlmIChub2RlR3JvdXBJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICBpZiAobm9kZUdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgbGV0IG5vZGVHcm91cEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlR3JvdXBJbnN0YW5jZSk7XG4gICAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgIWZvcm1Hcm91cC5jb250YWlucyhub2RlR3JvdXBJbnN0YW5jZU5hbWUpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICAgICAgY29udHJvbC5zZXRWYWx1ZShub2RlR3JvdXBJbnN0YW5jZS5yZXBzKTtcbiAgICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChub2RlR3JvdXBJbnN0YW5jZU5hbWUsIGNvbnRyb2wpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZUdyb3VwSW5zdGFuY2U7XG4gIH1cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNFZGl0YWJpbGl0eU1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNWaXNpYmlsaXR5TWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNSZXBldGl0aW9uTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0Zvcm11bGFNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1ZhbGlkYXRpb25NYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1dhcm5pbmdNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc01hcEluZGV4KG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiwgaW5kZXg6IHN0cmluZykge1xuICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHZtYXApLmluZGV4T2YoaW5kZXgpID4gLTEpIHtcbiAgICAgICAgZGVsZXRlIHZtYXBbaW5kZXhdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZtYXA7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoXG4gICAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgZm9ybXVsYTogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNGb3JtdWxhTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1ZhbGlkYXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzV2FybmluZ01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChcbiAgICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBmb3JtdWxhOiBzdHJpbmcsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKFxuICAgIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGZvcm11bGE6IHN0cmluZyxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNNYXAoXG4gICAgbm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LFxuICAgIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGZvcm11bGE6IHN0cmluZyxcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgdG9rZW5zID0gZ2V0Q29kZUlkZW50aWZpZXJzKGZvcm11bGEpO1xuICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIHRva2Vucy5mb3JFYWNoKHRva2VuID0+IHtcbiAgICAgICAgICBpZiAodm1hcFt0b2tlbl0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdm1hcFt0b2tlbl0uaW5kZXhPZihub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICAgIHZtYXBbdG9rZW5dLnNwbGljZShpZHgsIDEpO1xuICAgICAgICAgICAgICBpZiAodm1hcFt0b2tlbl0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdm1hcFt0b2tlbl07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNFZGl0YWJpbGl0eU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9lZGl0YWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0Zvcm11bGFNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWYWxpZGF0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzV2FybmluZ01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc01hcChcbiAgICBub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sXG4gICAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgZm9ybXVsYTogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCB0b2tlbnMgPSBnZXRDb2RlSWRlbnRpZmllcnMoZm9ybXVsYSk7XG4gICAgaWYgKHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgdG9rZW5zLmZvckVhY2godG9rZW4gPT4ge1xuICAgICAgICAgIGlmICh2bWFwW3Rva2VuXSA9PSBudWxsKSB7XG4gICAgICAgICAgICB2bWFwW3Rva2VuXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodm1hcFt0b2tlbl0uaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgdm1hcFt0b2tlbl0ucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG59XG5cbmNvbnN0IHVwZGF0ZVZpc2liaWxpdHlNYXBFbnRyeSA9IChcbiAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gIGZvcm1Hcm91cDogQmVoYXZpb3JTdWJqZWN0PEZvcm1Hcm91cCB8IG51bGw+LFxuICBuZXdGb3JtVmFsdWU6IGFueSxcbikgPT4ge1xuICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgY29uc3QgdmlzaWJpbGl0eUNoYW5nZWQgPSB1cGRhdGVWaXNpYmlsaXR5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgY29uc3QgaXNGaWVsZCA9IGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICBpZiAodmlzaWJpbGl0eUNoYW5nZWQgJiYgIW5vZGVJbnN0YW5jZS52aXNpYmxlKSB7XG4gICAgY29uc3QgZmcgPSBmb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBpZiAoZmcgIT0gbnVsbCkge1xuICAgICAgY29uc3QgcyA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHMgJiYgIXMuY2xvc2VkKSB7XG4gICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUobnVsbCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzRmllbGQpIHtcbiAgICAgIG5vZGVJbnN0YW5jZS52YWx1ZSA9IG51bGw7XG4gICAgfVxuICB9IGVsc2UgaWYgKHZpc2liaWxpdHlDaGFuZ2VkICYmIG5vZGVJbnN0YW5jZS52aXNpYmxlICYmIGlzRmllbGQpIHtcbiAgICBjb25zdCBmZyA9IGZvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgIGlmIChmZyAhPSBudWxsICYmIHJlcy5jaGFuZ2VkKSB7XG4gICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKHJlcy52YWx1ZSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVSZXBldGl0aW9uTWFwRW50cnkgPSAoXG4gIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICBuZXdGb3JtVmFsdWU6IGFueSxcbiAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICBjYjogKFxuICAgIGFsbE5vZGVzOiBBamZOb2RlW10gfCBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBpbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlLFxuICAgIG9sZFJlcHM6IG51bWJlcixcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICApID0+IHthZGRlZDogQWpmTm9kZUluc3RhbmNlW10gfCBudWxsOyByZW1vdmVkOiBBamZOb2RlSW5zdGFuY2VbXSB8IG51bGx9LFxuKSA9PiB7XG4gIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgY29uc3Qgb2xkUmVwcyA9IHVwZGF0ZVJlcHNOdW0obm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgIGlmIChvbGRSZXBzICE9PSBub2RlSW5zdGFuY2UucmVwcykge1xuICAgICAgY2Iobm9kZXMsIG5vZGVJbnN0YW5jZSwgb2xkUmVwcywgbmV3Rm9ybVZhbHVlKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXNNYXBFbnRyeSA9IChcbiAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gIG5ld0Zvcm1WYWx1ZTogYW55LFxuICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gIHNob3dDYjogKFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBicmFuY2g/OiBudW1iZXIsXG4gICkgPT4gdm9pZCxcbiAgaGlkZUNiOiAoXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gICAgbm9kZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGJyYW5jaD86IG51bWJlcixcbiAgKSA9PiB2b2lkLFxuKSA9PiB7XG4gIC8vIGNvbnN0IGJyYW5jaENoYW5nZWQgPVxuICAvLyBub2RlSW5zdGFuY2UudXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhuZXdGb3JtVmFsdWUpO1xuICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgLy8gaWYgKGJyYW5jaENoYW5nZWQpIHtcbiAgY29uc3QgdmVyaWZpZWRCcmFuY2ggPSBub2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2g7XG4gIG5vZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKF9jb25kaXRpb24sIGlkeCkgPT4ge1xuICAgIGlmIChpZHggPT0gdmVyaWZpZWRCcmFuY2gpIHtcbiAgICAgIHNob3dDYihuZXdGb3JtVmFsdWUsIG5vZGVzLCBub2RlSW5zdGFuY2UsIGlkeCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGhpZGVDYihuZXdGb3JtVmFsdWUsIG5vZGVzLCBub2RlSW5zdGFuY2UsIGlkeCk7XG4gICAgfVxuICB9KTtcbiAgLy8gfVxufTtcblxuY29uc3QgdXBkYXRlRm9ybXVsYU1hcEVudHJ5ID0gKFxuICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgbmV3Rm9ybVZhbHVlOiBhbnksXG4gIGZvcm1Hcm91cDogQmVoYXZpb3JTdWJqZWN0PEZvcm1Hcm91cCB8IG51bGw+LFxuKSA9PiB7XG4gIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgIHVwZGF0ZVZhbGlkYXRpb24obm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgZmcuY29udHJvbHNbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSldLnNldFZhbHVlKHJlcy52YWx1ZSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVWYWxpZGF0aW9uTWFwRW50cnkgPSAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZTogYW55LCBzdXBwOiBhbnkpID0+IHtcbiAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgbmV3Rm9ybVZhbHVlLiR2YWx1ZSA9IG5ld0Zvcm1WYWx1ZVtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKV07XG4gICAgdXBkYXRlVmFsaWRhdGlvbihub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSwgc3VwcCk7XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZVdhcm5pbmdNYXBFbnRyeSA9IChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlOiBhbnkpID0+IHtcbiAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgdXBkYXRlV2FybmluZyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgaWYgKFxuICAgICAgbm9kZUluc3RhbmNlLndhcm5pbmdSZXN1bHRzICE9IG51bGwgJiZcbiAgICAgIG5vZGVJbnN0YW5jZS53YXJuaW5nUmVzdWx0cy5maWx0ZXIod2FybmluZyA9PiB3YXJuaW5nLnJlc3VsdCkubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgbm9kZUluc3RhbmNlLndhcm5pbmdUcmlnZ2VyLmVtaXQoKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZUZpbHRlcmVkQ2hvaWNlc01hcEVudHJ5ID0gKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWU6IGFueSkgPT4ge1xuICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgIHVwZGF0ZUZpbHRlcmVkQ2hvaWNlcyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gIH1cbn07XG4iXX0=