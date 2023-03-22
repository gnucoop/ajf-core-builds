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
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { format } from 'date-fns';
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
    /**
     * Replace date values in this format "2023-03-28T22:00:00.000Z" with "yyyy-MM-dd" format
     * @param ctx
     */
    _fixDates(ctx) {
        if (ctx) {
            Object.keys(ctx).forEach(k => {
                const v = ctx[k];
                if (typeof v === 'string' && /^\d\d\d\d-\d\d-\d\dT\d\d:\d\d:\d\d\.\d\d\dZ$/.test(v)) {
                    const d = format(new Date(v), 'yyyy-MM-dd');
                    ctx[k] = d;
                }
            });
        }
    }
    getFormValue() {
        const formGroup = this._formGroup.getValue();
        if (formGroup == null) {
            return {};
        }
        let res = deepCopy(formGroup.value);
        this._fixDates(res);
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
            return this._initFormGroupStreams(new UntypedFormGroup({}));
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
                                    control: new UntypedFormControl(),
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
        this._formInitEvent.emit(0 /* AjfFormInitStatus.Initializing */);
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
                this._formInitEvent.emit(1 /* AjfFormInitStatus.Complete */);
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
            const control = new UntypedFormControl();
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
                const control = new UntypedFormControl();
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
AjfFormRendererService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormRendererService, deps: [{ token: i1.AjfValidationService }], target: i0.ɵɵFactoryTarget.Injectable });
AjfFormRendererService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormRendererService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormRendererService, decorators: [{
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
                if (fg.controls != null && fg.controls[completeName] != null) {
                    fg.controls[completeName].setValue(null);
                }
            });
        }
        if (isField) {
            nodeInstance.value = null;
        }
    }
    else if (visibilityChanged && nodeInstance.visible && isField) {
        const fg = formGroup.getValue();
        const res = updateFormula(nodeInstance, newFormValue);
        if (fg != null && res.changed && fg.controls != null && fg.controls[completeName] != null) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUEyQixrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzlFLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQWtCLGtCQUFrQixFQUFFLGdCQUFnQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDckYsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLElBQUksRUFDSixVQUFVLEVBQ1YsRUFBRSxJQUFJLEtBQUssRUFDWCxPQUFPLEVBRVAsWUFBWSxFQUNaLEtBQUssR0FDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxvQkFBb0IsRUFDcEIsTUFBTSxFQUNOLEdBQUcsRUFDSCxRQUFRLEVBQ1IsSUFBSSxFQUNKLEtBQUssRUFDTCxTQUFTLEVBQ1QsU0FBUyxFQUNULGNBQWMsR0FDZixNQUFNLGdCQUFnQixDQUFDO0FBR3hCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQVEzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFPeEQsT0FBTyxFQUFDLGlCQUFpQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDdEUsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0seURBQXlELENBQUM7QUFDbkcsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1B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Q0FBQyxDQUFDO1FBQzFDLElBQ0UsWUFBWSxDQUFDLGNBQWMsSUFBSSxJQUFJO1lBQ25DLFlBQVksQ0FBQyxjQUFjLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQ3hFO1lBQ0EsWUFBWSxDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNwQztLQUNGO0FBQ0gsQ0FBQyxDQUFDO0FBRUYsTUFBTSw2QkFBNkIsR0FBRyxDQUFDLFlBQTZCLEVBQUUsWUFBaUIsRUFBRSxFQUFFO0lBQ3pGLElBQUksMEJBQTBCLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDNUMscUJBQXFCLENBQUMsWUFBWSxFQUFFLFlBQVksQ0FBQyxDQUFDO0tBQ25EO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgQWpmQ29udGV4dCwgZ2V0Q29kZUlkZW50aWZpZXJzfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgVW50eXBlZEZvcm1Db250cm9sLCBVbnR5cGVkRm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge2Zvcm1hdH0gZnJvbSAnZGF0ZS1mbnMnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBmcm9tLFxuICBPYnNlcnZhYmxlLFxuICBvZiBhcyBvYnNPZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJlcixcbiAgU3Vic2NyaXB0aW9uLFxuICB0aW1lcixcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkaXN0aW5jdFVudGlsQ2hhbmdlZCxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHBhaXJ3aXNlLFxuICBzY2FuLFxuICBzaGFyZSxcbiAgc3RhcnRXaXRoLFxuICBzd2l0Y2hNYXAsXG4gIHdpdGhMYXRlc3RGcm9tLFxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7QWpmVGFibGVGb3JtQ29udHJvbH0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvdGFibGUtZm9ybS1jb250cm9sJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGV9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXB9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUtZ3JvdXAnO1xuaW1wb3J0IHtBamZOb2RlVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL29wZXJhdGlvbnMvbm9kZXMtaW5zdGFuY2VzLW9wZXJhdGlvbic7XG5pbXBvcnQge0FqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9ufSBmcm9tICcuL2ludGVyZmFjZS9vcGVyYXRpb25zL3JlbmRlcmVyLXVwZGF0ZS1tYXAtb3BlcmF0aW9uJztcbmltcG9ydCB7QWpmUmVuZGVyZXJVcGRhdGVNYXB9IGZyb20gJy4vaW50ZXJmYWNlL3JlbmRlcmVyLW1hcHMvdXBkYXRlLW1hcCc7XG5pbXBvcnQge0FqZkJhc2VTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL2Jhc2Utc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpbml0Q2hvaWNlc09yaWdpbn0gZnJvbSAnLi91dGlscy9jaG9pY2VzL2luaXQtY2hvaWNlcy1vcmlnaW4nO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2lzVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVGaWVsZEluc3RhbmNlU3RhdGV9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmllbGQtaW5zdGFuY2Utc3RhdGUnO1xuaW1wb3J0IHt1cGRhdGVGaWx0ZXJlZENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmlsdGVyZWQtY2hvaWNlcyc7XG5pbXBvcnQge3VwZGF0ZUZvcm11bGF9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZm9ybXVsYSc7XG5pbXBvcnQge3VwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1uZXh0LXNsaWRlLWNvbmRpdGlvbic7XG5pbXBvcnQge3VwZGF0ZVRyaWdnZXJDb25kaXRpb25zfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLXRyaWdnZXItY29uZGl0aW9ucyc7XG5pbXBvcnQge3VwZGF0ZVZhbGlkYXRpb259IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdmFsaWRhdGlvbic7XG5pbXBvcnQge3VwZGF0ZVdhcm5pbmd9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtd2FybmluZyc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXNJbnN0YW5jZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2ZsYXR0ZW4tbm9kZXMtaW5zdGFuY2VzJztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzSW5zdGFuY2VzVHJlZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMtdHJlZSc7XG5pbXBvcnQge2lzRmllbGRJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc05vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXJlcGVhdGluZy1jb250YWluZXItbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzUmVwZWF0aW5nR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtcmVwZWF0aW5nLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7aXNTbGlkZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGVzLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VTdWZmaXh9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2Utc3VmZml4JztcbmltcG9ydCB7bm9kZVRvTm9kZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLXRvLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtY29uZGl0aW9uYWwtYnJhbmNoZXMnO1xuaW1wb3J0IHt1cGRhdGVFZGl0YWJpbGl0eX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLWVkaXRhYmlsaXR5JztcbmltcG9ydCB7dXBkYXRlVmlzaWJpbGl0eX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLXZpc2liaWxpdHknO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMvZmxhdHRlbi1ub2Rlcyc7XG5pbXBvcnQge2lzQ29udGFpbmVyTm9kZX0gZnJvbSAnLi91dGlscy9ub2Rlcy9pcy1jb250YWluZXItbm9kZSc7XG5pbXBvcnQge29yZGVyZWROb2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9vcmRlcmVkLW5vZGVzJztcbmltcG9ydCB7dXBkYXRlUmVwc051bX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3VwZGF0ZS1yZXBzLW51bSc7XG5pbXBvcnQge3ZhbGlkU2xpZGV9IGZyb20gJy4vdXRpbHMvc2xpZGVzLWluc3RhbmNlcy92YWxpZC1zbGlkZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICcuL3ZhbGlkYXRpb24tc2VydmljZSc7XG5cbmV4cG9ydCBjb25zdCBlbnVtIEFqZkZvcm1Jbml0U3RhdHVzIHtcbiAgSW5pdGlhbGl6aW5nLFxuICBDb21wbGV0ZSxcbn1cblxuY29uc3QgdXBkYXRlU2xpZGVWYWxpZGl0eSA9IChzbGlkZTogQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UpID0+IHtcbiAgY29uc3Qgc3ViTm9kZXNOdW0gPSBzbGlkZS5mbGF0Tm9kZXMubGVuZ3RoO1xuICBsZXQgdmFsaWQgPSB0cnVlO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHN1Yk5vZGVzTnVtOyBpKyspIHtcbiAgICBjb25zdCBzdWJOb2RlID0gc2xpZGUuZmxhdE5vZGVzW2ldO1xuICAgIGlmIChzdWJOb2RlLnZpc2libGUgJiYgaXNGaWVsZEluc3RhbmNlKHN1Yk5vZGUpICYmICFzdWJOb2RlLnZhbGlkKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChzbGlkZS52YWxpZCAhPT0gdmFsaWQpIHtcbiAgICBzbGlkZS52YWxpZCA9IHZhbGlkO1xuICB9XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmRm9ybVJlbmRlcmVyU2VydmljZSB7XG4gIHByaXZhdGUgX2VkaXRhYmlsaXR5Tm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfZWRpdGFiaWxpdHlOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF92aXNpYmlsaXR5Tm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3JlcGV0aXRpb25Ob2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2Zvcm11bGFOb2Rlc01hcCE6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbk5vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfd2FybmluZ05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwITogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXAhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2Zvcm1Jbml0RXZlbnQ6IEV2ZW50RW1pdHRlcjxBamZGb3JtSW5pdFN0YXR1cz4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1Jbml0U3RhdHVzPigpO1xuICByZWFkb25seSBmb3JtSW5pdEV2ZW50OiBPYnNlcnZhYmxlPEFqZkZvcm1Jbml0U3RhdHVzPiA9IHRoaXNcbiAgICAuX2Zvcm1Jbml0RXZlbnQgYXMgT2JzZXJ2YWJsZTxBamZGb3JtSW5pdFN0YXR1cz47XG5cbiAgcHJpdmF0ZSBfZm9ybUdyb3VwOiBCZWhhdmlvclN1YmplY3Q8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+ID1cbiAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PFVudHlwZWRGb3JtR3JvdXAgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZm9ybUdyb3VwOiBPYnNlcnZhYmxlPFVudHlwZWRGb3JtR3JvdXAgfCBudWxsPiA9IHRoaXNcbiAgICAuX2Zvcm1Hcm91cCBhcyBPYnNlcnZhYmxlPFVudHlwZWRGb3JtR3JvdXAgfCBudWxsPjtcblxuICBwcml2YXRlIF9mb3JtOiBCZWhhdmlvclN1YmplY3Q8e1xuICAgIGZvcm06IEFqZkZvcm0gfCBudWxsO1xuICAgIGNvbnRleHQ/OiBBamZDb250ZXh0O1xuICB9IHwgbnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PHtcbiAgICBmb3JtOiBBamZGb3JtIHwgbnVsbDtcbiAgICBjb250ZXh0PzogQWpmQ29udGV4dDtcbiAgfSB8IG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9ub2RlcyE6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlW10+O1xuICBwcml2YXRlIF9mbGF0Tm9kZXMhOiBPYnNlcnZhYmxlPEFqZk5vZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfZmxhdE5vZGVzVHJlZSE6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uPiA9XG4gICAgbmV3IFN1YmplY3Q8QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2Vycm9yUG9zaXRpb25zITogT2JzZXJ2YWJsZTxudW1iZXJbXT47XG4gIHByaXZhdGUgX2Vycm9ycyE6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIF9mb3JtR3JvdXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9ub2Rlc01hcHMhOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPltdO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZVRyaWdnZXI6IEV2ZW50RW1pdHRlcjxBamZOb2RlSW5zdGFuY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZOb2RlSW5zdGFuY2U+KCk7XG4gIHJlYWRvbmx5IG5leHRTbGlkZVRyaWdnZXI6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlPiA9IHRoaXNcbiAgICAuX25leHRTbGlkZVRyaWdnZXIgYXMgT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2U+O1xuXG4gIHByaXZhdGUgX3NsaWRlc051bTogQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PG51bWJlcj4oMCk7XG4gIHJlYWRvbmx5IHNsaWRlc051bTogT2JzZXJ2YWJsZTxudW1iZXI+ID0gdGhpcy5fc2xpZGVzTnVtIGFzIE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBnZXQgbm9kZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2Rlc1RyZWU7XG4gIH1cbiAgZ2V0IGVycm9yUG9zaXRpb25zKCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JQb3NpdGlvbnM7XG4gIH1cbiAgZ2V0IGVycm9ycygpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XG4gIH1cbiAgZ2V0IGN1cnJlbnRTdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uZm9ybSAhPSBudWxsID8gZm9ybS5mb3JtLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMgOiBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXzogQWpmVmFsaWRhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLl9pbml0VXBkYXRlTWFwU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0RXJyb3JzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRGb3JtU3RyZWFtcygpO1xuICAgIHRoaXMuX3VwZGF0ZUZvcm1WYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICBzZXRGb3JtKGZvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0OiBBamZDb250ZXh0ID0ge30pIHtcbiAgICB0aGlzLl9pbml0VXBkYXRlTWFwU3RyZWFtcygpO1xuICAgIGlmIChcbiAgICAgIGZvcm0gIT0gbnVsbCAmJlxuICAgICAgT2JqZWN0LmtleXMoY29udGV4dCkubGVuZ3RoID09PSAwICYmXG4gICAgICBPYmplY3Qua2V5cyhmb3JtLmluaXRDb250ZXh0IHx8IHt9KS5sZW5ndGggPiAwXG4gICAgKSB7XG4gICAgICBjb250ZXh0ID0gZm9ybS5pbml0Q29udGV4dCB8fCB7fTtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudEZvcm0gPSB0aGlzLl9mb3JtLmdldFZhbHVlKCk7XG4gICAgaWYgKFxuICAgICAgKGN1cnJlbnRGb3JtID09IG51bGwgJiYgZm9ybSAhPSBudWxsKSB8fFxuICAgICAgKGN1cnJlbnRGb3JtICE9IG51bGwgJiYgZm9ybSAhPT0gY3VycmVudEZvcm0uZm9ybSlcbiAgICApIHtcbiAgICAgIHRoaXMuX2Zvcm0ubmV4dCh7Zm9ybTogZm9ybSwgY29udGV4dDogY29udGV4dH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBSZXBsYWNlIGRhdGUgdmFsdWVzIGluIHRoaXMgZm9ybWF0IFwiMjAyMy0wMy0yOFQyMjowMDowMC4wMDBaXCIgd2l0aCBcInl5eXktTU0tZGRcIiBmb3JtYXRcbiAgICogQHBhcmFtIGN0eFxuICAgKi9cbiAgcHJpdmF0ZSBfZml4RGF0ZXMoY3R4OiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoY3R4KSB7XG4gICAgICBPYmplY3Qua2V5cyhjdHgpLmZvckVhY2goayA9PiB7XG4gICAgICAgIGNvbnN0IHYgPSBjdHhba107XG4gICAgICAgIGlmICh0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgL15cXGRcXGRcXGRcXGQtXFxkXFxkLVxcZFxcZFRcXGRcXGQ6XFxkXFxkOlxcZFxcZFxcLlxcZFxcZFxcZFokLy50ZXN0KHYpKSB7XG4gICAgICAgICAgY29uc3QgZCA9IGZvcm1hdChuZXcgRGF0ZSh2KSwgJ3l5eXktTU0tZGQnKTtcbiAgICAgICAgICBjdHhba10gPSBkO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBnZXRGb3JtVmFsdWUoKTogYW55IHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgbGV0IHJlcyA9IGRlZXBDb3B5KGZvcm1Hcm91cC52YWx1ZSk7XG4gICAgdGhpcy5fZml4RGF0ZXMocmVzKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYWRkR3JvdXAoZ3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgaWYgKGdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBtYXhSZXBzID0gZ3JvdXAubm9kZS5tYXhSZXBzO1xuICAgICAgaWYgKG1heFJlcHMgPiAwICYmIGdyb3VwLnJlcHMgKyAxID4gbWF4UmVwcykge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFJlcHMgPSBncm91cC5yZXBzO1xuICAgICAgZ3JvdXAucmVwcyA9IGdyb3VwLnJlcHMgKyAxO1xuICAgICAgZ3JvdXAuY2FuQWRkID0gZ3JvdXAubm9kZS5tYXhSZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPCBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBncm91cC5jYW5SZW1vdmUgPSBncm91cC5ub2RlLm1pblJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA+IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgIGNvbnN0IGZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlc0luc3RhbmNlcyhub2RlcywgdHJ1ZSk7XG4gICAgICAgIHRoaXMuX2FkanVzdFJlcHMoZmxhdE5vZGVzLCBncm91cCwgb2xkUmVwcywgdGhpcy5nZXRGb3JtVmFsdWUoKSk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHJlbW92ZUdyb3VwKGdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGlmIChncm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbWluUmVwcyA9IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIGlmIChncm91cC5yZXBzIC0gMSA8IG1pblJlcHMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRSZXBzID0gZ3JvdXAucmVwcztcbiAgICAgIGdyb3VwLnJlcHMgPSBncm91cC5yZXBzIC0gMTtcbiAgICAgIGdyb3VwLmNhbkFkZCA9IGdyb3VwLm5vZGUubWF4UmVwcyA9PT0gMCB8fCBncm91cC5yZXBzIDwgZ3JvdXAubm9kZS5tYXhSZXBzO1xuICAgICAgZ3JvdXAuY2FuUmVtb3ZlID0gZ3JvdXAubm9kZS5taW5SZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPiBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICB0aGlzLl9hZGp1c3RSZXBzKG5vZGVzLCBncm91cCwgb2xkUmVwcywgdGhpcy5nZXRGb3JtVmFsdWUoKSk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyb2woZmllbGQ6IEFqZkZpZWxkSW5zdGFuY2UgfCB1bmRlZmluZWQpOiBPYnNlcnZhYmxlPEFic3RyYWN0Q29udHJvbCB8IG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXAucGlwZShcbiAgICAgIG1hcChmID0+IHtcbiAgICAgICAgaWYgKGZpZWxkID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBmaWVsZE5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGQpO1xuICAgICAgICByZXR1cm4gZiAhPSBudWxsICYmIGYuY29udGFpbnMoZmllbGROYW1lKSA/IGYuY29udHJvbHNbZmllbGROYW1lXSA6IG51bGw7XG4gICAgICB9KSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEVycm9yc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JQb3NpdGlvbnMgPSB0aGlzLl92YWx1ZUNoYW5nZWQucGlwZShcbiAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX25vZGVzLCB0aGlzLl9mb3JtKSxcbiAgICAgIGZpbHRlcihcbiAgICAgICAgKFtfLCBfXywgZm9ybV0pID0+XG4gICAgICAgICAgZm9ybSAhPSBudWxsICYmXG4gICAgICAgICAgKFxuICAgICAgICAgICAgZm9ybSBhcyB7XG4gICAgICAgICAgICAgIGZvcm06IEFqZkZvcm0gfCBudWxsO1xuICAgICAgICAgICAgICBjb250ZXh0PzogQWpmQ29udGV4dDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApLmZvcm0gIT0gbnVsbCxcbiAgICAgICksXG4gICAgICBtYXAoKFtfLCBub2RlcywgZm9ybURlZl0pID0+IHtcbiAgICAgICAgY29uc3QgZm9ybSA9IChcbiAgICAgICAgICBmb3JtRGVmIGFzIHtcbiAgICAgICAgICAgIGZvcm06IEFqZkZvcm0gfCBudWxsO1xuICAgICAgICAgICAgY29udGV4dD86IEFqZkNvbnRleHQ7XG4gICAgICAgICAgfVxuICAgICAgICApLmZvcm0gYXMgQWpmRm9ybTtcbiAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgIGNvbnN0IGVycm9yczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgbm9kZXMuZm9yRWFjaChub2RlID0+IHtcbiAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKG5vZGUpKSB7XG4gICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG5vZGUucmVwczsgaSsrKSB7XG4gICAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIXZhbGlkU2xpZGUobm9kZSwgaSkpIHtcbiAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2Uobm9kZSkpIHtcbiAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgIGlmICghbm9kZS52YWxpZCkge1xuICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBmb3JtLnZhbGlkID0gZXJyb3JzLmxlbmd0aCA9PSAwO1xuICAgICAgICB0aGlzLl9zbGlkZXNOdW0ubmV4dChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgICByZXR1cm4gZXJyb3JzO1xuICAgICAgfSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fZXJyb3JzID0gdGhpcy5fZXJyb3JQb3NpdGlvbnMucGlwZShcbiAgICAgIG1hcChlID0+IChlICE9IG51bGwgPyBlLmxlbmd0aCA6IDApKSxcbiAgICAgIHN0YXJ0V2l0aCgwKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IHN0YXJ0VmFsdWUgPSAoKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4gKHt9KTtcbiAgICB0aGlzLl9lZGl0YWJpbGl0eU5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9lZGl0YWJpbGl0eU5vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcCA9ICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+KFxuICAgICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fZm9ybXVsYU5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fd2FybmluZ05vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlc1xuICAgICkpLnBpcGUoXG4gICAgICBzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgIH0sIHt9KSxcbiAgICAgIHN0YXJ0V2l0aChzdGFydFZhbHVlKCkpLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXAgPSAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PihcbiAgICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwID0gKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj4oXG4gICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzXG4gICAgKSkucGlwZShcbiAgICAgIHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgfSwge30pLFxuICAgICAgc3RhcnRXaXRoKHN0YXJ0VmFsdWUoKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG5cbiAgICB0aGlzLl9ub2Rlc01hcHMgPSBbXG4gICAgICB0aGlzLl9lZGl0YWJpbGl0eU5vZGVzTWFwLFxuICAgICAgdGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwLFxuICAgICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwLFxuICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcCxcbiAgICAgIHRoaXMuX2Zvcm11bGFOb2Rlc01hcCxcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcCxcbiAgICAgIHRoaXMuX3dhcm5pbmdOb2Rlc01hcCxcbiAgICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcCxcbiAgICAgIHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwLFxuICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcCxcbiAgICBdO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1TdHJlYW1zKCk6IHZvaWQge1xuICAgIGNvbnN0IGZvcm1PYnMgPSB0aGlzLl9mb3JtO1xuICAgIGZvcm1PYnNcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAoX2Zvcm0gPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0Rm9ybUdyb3VwU3RyZWFtcyhuZXcgVW50eXBlZEZvcm1Hcm91cCh7fSkpO1xuICAgICAgICB9KSxcbiAgICAgIClcbiAgICAgIC5zdWJzY3JpYmUodGhpcy5fZm9ybUdyb3VwKTtcbiAgICBmb3JtT2JzXG4gICAgICAucGlwZShcbiAgICAgICAgc3dpdGNoTWFwKGZvcm0gPT4ge1xuICAgICAgICAgIGlmIChmb3JtID09IG51bGwgfHwgZm9ybS5mb3JtID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybiBvYnNPZihmb3JtKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgY2hvaWNlc09yaWdpbnMgPSBmb3JtLmZvcm0uY2hvaWNlc09yaWdpbnMgfHwgW107XG4gICAgICAgICAgaWYgKGNob2ljZXNPcmlnaW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgcmV0dXJuIG9ic09mKGZvcm0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gZnJvbShQcm9taXNlLmFsbChjaG9pY2VzT3JpZ2lucy5tYXAoY28gPT4gaW5pdENob2ljZXNPcmlnaW4oY28pKSkpLnBpcGUoXG4gICAgICAgICAgICBtYXAoKCkgPT4gZm9ybSksXG4gICAgICAgICAgKTtcbiAgICAgICAgfSksXG4gICAgICAgIG1hcChmb3JtRGVmID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9ub2Rlc0luc3RhbmNlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgICAgICBsZXQgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBmb3JtRGVmICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgKFxuICAgICAgICAgICAgICAgIGZvcm1EZWYgYXMge1xuICAgICAgICAgICAgICAgICAgZm9ybTogQWpmRm9ybSB8IG51bGw7XG4gICAgICAgICAgICAgICAgICBjb250ZXh0PzogQWpmQ29udGV4dDtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICkuZm9ybSAhPSBudWxsXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IGZvcm1EZWYgYXMge1xuICAgICAgICAgICAgICAgIGZvcm06IEFqZkZvcm07XG4gICAgICAgICAgICAgICAgY29udGV4dDogQWpmQ29udGV4dDtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgY29uc3QgYmFzZU5vZGVzID0gZm9ybS5mb3JtLm5vZGVzO1xuICAgICAgICAgICAgICBub2RlcyA9IHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgICAgICAgICAgZmxhdHRlbk5vZGVzKGJhc2VOb2RlcyksXG4gICAgICAgICAgICAgICAgYmFzZU5vZGVzLFxuICAgICAgICAgICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBbXSxcbiAgICAgICAgICAgICAgICBmb3JtLmNvbnRleHQgfHwge30sXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBub2RlcyA9IFtdO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICBub2Rlcy5mb3JFYWNoKG5vZGUgPT4ge1xuICAgICAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdTbGlkZUluc3RhbmNlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBub2RlLnJlcHM7IGkrKykge1xuICAgICAgICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgIG5vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNTbGlkZUluc3RhbmNlKG5vZGUpKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICBub2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgICAgfTtcbiAgICAgICAgfSksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZUluc3RhbmNlKFxuICAgIGFsbE5vZGVzOiBBamZOb2RlW10gfCBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlLFxuICAgIHByZWZpeDogbnVtYmVyW10sXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICBicmFuY2hWaXNpYmlsaXR5ID0gdHJ1ZSxcbiAgKTogQWpmTm9kZUluc3RhbmNlIHwgbnVsbCB7XG4gICAgbGV0IGluc3RhbmNlID0gbm9kZVRvTm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgIGlmIChpbnN0YW5jZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgaWYgKGlzUmVwZWF0aW5nR3JvdXBJbnN0YW5jZShpbnN0YW5jZSkpIHtcbiAgICAgIHRoaXMuX2V4cGxvZGVSZXBlYXRpbmdOb2RlKGFsbE5vZGVzLCBpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICBpbnN0YW5jZS5ub2RlcyA9IHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgIGFsbE5vZGVzLFxuICAgICAgICBpbnN0YW5jZS5ub2RlLm5vZGVzLFxuICAgICAgICBpbnN0YW5jZS5ub2RlLmlkLFxuICAgICAgICBwcmVmaXgsXG4gICAgICAgIGNvbnRleHQsXG4gICAgICApO1xuICAgICAgdXBkYXRlRWRpdGFiaWxpdHkoaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIH1cbiAgICB1cGRhdGVWaXNpYmlsaXR5KGluc3RhbmNlLCBjb250ZXh0LCBicmFuY2hWaXNpYmlsaXR5KTtcbiAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICBpZiAoaXNGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICB1cGRhdGVGaWx0ZXJlZENob2ljZXMoaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKGlzVGFibGVGaWVsZEluc3RhbmNlKGluc3RhbmNlKSkge1xuICAgICAgICAgIGNvbnN0IHtub2RlfSA9IGluc3RhbmNlO1xuICAgICAgICAgIGluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0W25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSldIHx8IGNvbnRleHQ7XG4gICAgICAgICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgICAgbGV0IGNvbnRyb2xzV2l0aExhYmVsczogW3N0cmluZywgKHN0cmluZyB8IEFqZlRhYmxlRm9ybUNvbnRyb2wpW11dW10gPSBbXTtcbiAgICAgICAgICBjb250cm9sc1dpdGhMYWJlbHMucHVzaChbbm9kZS5sYWJlbCwgbm9kZS5jb2x1bW5MYWJlbHNdKTtcbiAgICAgICAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd3NOdW0gPSBub2RlLnJvd3MubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChsZXQgcm93SWR4ID0gMDsgcm93SWR4IDwgcm93c051bTsgcm93SWR4KyspIHtcbiAgICAgICAgICAgICAgY29uc3Qgcm93ID0gbm9kZS5yb3dzW3Jvd0lkeF07XG4gICAgICAgICAgICAgIGxldCByOiBBamZUYWJsZUZvcm1Db250cm9sW10gPSBbXTtcbiAgICAgICAgICAgICAgY29uc3QgY2VsbE51bSA9IHJvdy5sZW5ndGg7XG4gICAgICAgICAgICAgIGZvciAobGV0IGlkeCA9IDA7IGlkeCA8IGNlbGxOdW07IGlkeCsrKSB7XG4gICAgICAgICAgICAgICAgbGV0IGNlbGwgPSByb3dbaWR4XTtcbiAgICAgICAgICAgICAgICBpZiAodHlwZW9mIGNlbGwgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgICAgICAgICAgICBjZWxsID0ge2Zvcm11bGE6IGNlbGx9O1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGV2ZXJ5IGNvbnRyb2wgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBjZWxsIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgaW5zaWRlIHRoZSBmb3JtIGNvbnRyb2wgbWF0cml4XG4gICAgICAgICAgICAgICAgd2l0aCB0aGlzIG1hc2sgYCR7dE5vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YFxuICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGAke25vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YDtcbiAgICAgICAgICAgICAgICBjb25zdCB0eXBlID0gKG5vZGUuY29sdW1uVHlwZXMgJiYgbm9kZS5jb2x1bW5UeXBlc1tpZHhdKSB8fCAnbnVtYmVyJztcbiAgICAgICAgICAgICAgICBjb25zdCB0YWJsZUZvcm1Db250cm9sOiBBamZUYWJsZUZvcm1Db250cm9sID0ge1xuICAgICAgICAgICAgICAgICAgY29udHJvbDogbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpLFxuICAgICAgICAgICAgICAgICAgc2hvdzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICAgIH07XG4gICAgICAgICAgICAgICAgY29uc3QgdmFsdWUgPVxuICAgICAgICAgICAgICAgICAgaW5zdGFuY2UuY29udGV4dFtjZWxsLmZvcm11bGFdICYmIHR5cGUgPT09ICdudW1iZXInXG4gICAgICAgICAgICAgICAgICAgID8gK2luc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXVxuICAgICAgICAgICAgICAgICAgICA6IGluc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXTtcbiAgICAgICAgICAgICAgICB0YWJsZUZvcm1Db250cm9sLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2wobmFtZSwgdGFibGVGb3JtQ29udHJvbC5jb250cm9sKTtcbiAgICAgICAgICAgICAgICByLnB1c2godGFibGVGb3JtQ29udHJvbCk7XG4gICAgICAgICAgICAgICAgLyogY3JlYXRlIGEgb2JqZWN0IHRoYXQgcmVzcGVjdCB0aGUgaW5zdGFuY2UgaW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgd2l0aCB0aGUgbWluaW11bSBkZWZpbmVkIHByb3BlcnRpZXMgdG8gYWxsb3cgdG8gcnVuIGFkZFRvTm9kZUZvcm11bGEgbWFwKi9cbiAgICAgICAgICAgICAgICBjb25zdCBmYWtlSW5zdGFuY2UgPSB7XG4gICAgICAgICAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogY2VsbC5mb3JtdWxhfSxcbiAgICAgICAgICAgICAgICAgIG5vZGU6IHtuYW1lLCBub2RlVHlwZTogMCwgZWRpdGFibGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgIHZpc2libGU6IHRydWUsXG4gICAgICAgICAgICAgICAgICBwcmVmaXg6IFtdLFxuICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlczogW10sXG4gICAgICAgICAgICAgICAgICB1cGRhdGVkRXZ0OiBuZXcgRXZlbnRFbWl0dGVyPHZvaWQ+KCksXG4gICAgICAgICAgICAgICAgfSBhcyB1bmtub3duIGFzIEFqZk5vZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICB0aGlzLl9hZGRUb05vZGVzRm9ybXVsYU1hcChmYWtlSW5zdGFuY2UsIGNlbGwuZm9ybXVsYSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29udHJvbHNXaXRoTGFiZWxzLnB1c2goW25vZGUucm93TGFiZWxzW3Jvd0lkeF0sIHJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGluc3RhbmNlLmNvbnRyb2xzID0gY29udHJvbHNXaXRoTGFiZWxzO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpbnN0YW5jZS52YWx1ZSA9IGNvbnRleHRbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKV07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHVwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZShpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgfVxuICAgIHRoaXMuX2FkZE5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRqdXN0UmVwcyhcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgaW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSxcbiAgICBvbGRSZXBzOiBudW1iZXIsXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgKToge2FkZGVkOiBBamZOb2RlSW5zdGFuY2VbXSB8IG51bGw7IHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbH0ge1xuICAgIGNvbnN0IG5ld1JlcHMgPSBpbnN0YW5jZS5yZXBzO1xuICAgIGNvbnN0IHJlc3VsdDoge1xuICAgICAgYWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbDtcbiAgICAgIHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbDtcbiAgICB9ID0ge1xuICAgICAgYWRkZWQ6IG51bGwsXG4gICAgICByZW1vdmVkOiBudWxsLFxuICAgIH07XG4gICAgaWYgKG9sZFJlcHMgPCBuZXdSZXBzKSB7XG4gICAgICBjb25zdCBuZXdOb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlcyA9PSBudWxsKSB7XG4gICAgICAgIGluc3RhbmNlLm5vZGVzID0gW107XG4gICAgICB9XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVGaWVsZCh7XG4gICAgICAgICAgaWQ6IDk5OSxcbiAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICBwYXJlbnQ6IC0xLFxuICAgICAgICAgIGZpZWxkVHlwZTogQWpmRmllbGRUeXBlLkVtcHR5LFxuICAgICAgICAgIGxhYmVsOiBpbnN0YW5jZS5ub2RlLmxhYmVsLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKFxuICAgICAgICAgIGFsbE5vZGVzLFxuICAgICAgICAgIG5vZGUsXG4gICAgICAgICAgaW5zdGFuY2UucHJlZml4LnNsaWNlKDApLFxuICAgICAgICAgIGNvbnRleHQsXG4gICAgICAgICk7XG4gICAgICAgIGlmIChuZXdJbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICAgICAgaW5zdGFuY2Uubm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGZvciAobGV0IGkgPSBvbGRSZXBzOyBpIDwgbmV3UmVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHByZWZpeCA9IGluc3RhbmNlLnByZWZpeC5zbGljZSgwKTtcbiAgICAgICAgY29uc3QgZ3JvdXAgPSBpbnN0YW5jZS5ub2RlO1xuICAgICAgICBwcmVmaXgucHVzaChpKTtcbiAgICAgICAgY29uc3Qgb3JkZXJlZExpc3ROb2RlcyA9IG9yZGVyZWROb2Rlcyhncm91cC5ub2RlcywgaW5zdGFuY2Uubm9kZS5pZCk7XG4gICAgICAgIG9yZGVyZWRMaXN0Tm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG4sIHByZWZpeCwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5ld05vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fYWRkTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5hZGRlZCA9IG5ld05vZGVzO1xuICAgIH0gZWxzZSBpZiAob2xkUmVwcyA+IG5ld1JlcHMpIHtcbiAgICAgIGxldCBub2Rlc051bSA9IGluc3RhbmNlLm5vZGVzLmxlbmd0aCAvIG9sZFJlcHM7XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIG5vZGVzTnVtKys7XG4gICAgICB9XG4gICAgICByZXN1bHQucmVtb3ZlZCA9IGluc3RhbmNlLm5vZGVzLnNwbGljZShuZXdSZXBzICogbm9kZXNOdW0sIG5vZGVzTnVtKTtcbiAgICAgIHJlc3VsdC5yZW1vdmVkLmZvckVhY2gobiA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU5vZGVJbnN0YW5jZShuKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAob2xkUmVwcyAhPSBuZXdSZXBzICYmIGluc3RhbmNlLmZvcm11bGFSZXBzID09IG51bGwpIHtcbiAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpO1xuICAgICAgaWYgKGZnICE9IG51bGwgJiYgZmcuY29udGFpbnMoY29tcGxldGVOYW1lKSkge1xuICAgICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKGluc3RhbmNlLnJlcHMpO1xuICAgICAgfVxuICAgIH1cbiAgICBpbnN0YW5jZS5mbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMoaW5zdGFuY2Uubm9kZXMpO1xuICAgIGlmIChpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2UoaW5zdGFuY2UpKSB7XG4gICAgICBjb25zdCBzbGlkZU5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXVtdID0gW107XG4gICAgICBjb25zdCBub2Rlc1BlclNsaWRlID0gaW5zdGFuY2Uubm9kZXMgIT0gbnVsbCA/IGluc3RhbmNlLm5vZGVzLmxlbmd0aCAvIGluc3RhbmNlLnJlcHMgOiAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZS5yZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3RhcnROb2RlID0gaSAqIG5vZGVzUGVyU2xpZGU7XG4gICAgICAgIHNsaWRlTm9kZXMucHVzaChpbnN0YW5jZS5ub2Rlcy5zbGljZShzdGFydE5vZGUsIHN0YXJ0Tm9kZSArIG5vZGVzUGVyU2xpZGUpKTtcbiAgICAgIH1cbiAgICAgIGluc3RhbmNlLnNsaWRlTm9kZXMgPSBzbGlkZU5vZGVzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRm9ybVZhbHVlQW5kVmFsaWRpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzXG4gICAgICAucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fZm9ybUdyb3VwKSxcbiAgICAgICAgZmlsdGVyKChbXywgZmddKSA9PiBmZyAhPT0gbnVsbCksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKChbXywgZmddKSA9PiB7XG4gICAgICAgIGNvbnN0IGZvcm0gPSBmZyBhcyBVbnR5cGVkRm9ybUdyb3VwO1xuICAgICAgICBmb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXhwbG9kZVJlcGVhdGluZ05vZGUoXG4gICAgYWxsTm9kZXM6IEFqZk5vZGVbXSB8IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIGluc3RhbmNlOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UsXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgKSB7XG4gICAgY29uc3Qgb2xkUmVwcyA9IHVwZGF0ZVJlcHNOdW0oaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIGlmIChvbGRSZXBzICE9PSBpbnN0YW5jZS5yZXBzKSB7XG4gICAgICB0aGlzLl9hZGp1c3RSZXBzKGFsbE5vZGVzLCBpbnN0YW5jZSwgb2xkUmVwcywgY29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICBhbGxOb2RlczogQWpmTm9kZVtdIHwgQWpmTm9kZUluc3RhbmNlW10sXG4gICAgbm9kZXM6IEFqZk5vZGVbXSxcbiAgICBwYXJlbnQ6IG51bWJlciB8IG51bGwgPSBudWxsLFxuICAgIHByZWZpeDogbnVtYmVyW10gPSBbXSxcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICApOiBBamZOb2RlSW5zdGFuY2VbXSB7XG4gICAgbGV0IG5vZGVzSW5zdGFuY2VzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgIGNvbnN0IGN1clN1ZmZpeCA9IHByZWZpeC5sZW5ndGggPiAwID8gJ19fJyArIHByZWZpeC5qb2luKCdfXycpIDogJyc7XG4gICAgb3JkZXJlZE5vZGVzKG5vZGVzLCBwYXJlbnQpLmZvckVhY2goKG5vZGU6IEFqZk5vZGUpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudE5vZGVJbnN0YW5jZSA9IG5vZGVzSW5zdGFuY2VzLmZpbmQoXG4gICAgICAgIG5pID0+IG5pLm5vZGUuaWQgPT0gbm9kZS5wYXJlbnQgJiYgbm9kZUluc3RhbmNlU3VmZml4KG5pKSA9PSBjdXJTdWZmaXgsXG4gICAgICApO1xuICAgICAgY29uc3QgYnJhbmNoVmlzaWJpbGl0eSA9XG4gICAgICAgIHBhcmVudE5vZGVJbnN0YW5jZSAhPSBudWxsXG4gICAgICAgICAgPyBwYXJlbnROb2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2ggIT0gbnVsbCAmJlxuICAgICAgICAgICAgcGFyZW50Tm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoID09IG5vZGUucGFyZW50Tm9kZVxuICAgICAgICAgIDogdHJ1ZTtcbiAgICAgIGNvbnN0IG5uaSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG5vZGUsIHByZWZpeCwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgICBpZiAobm5pICE9IG51bGwpIHtcbiAgICAgICAgbm9kZXNJbnN0YW5jZXMucHVzaChubmkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBub2Rlc0luc3RhbmNlcztcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1WYWx1ZURlbHRhKG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgYWxsS2V5cyA9IFtdIGFzIHN0cmluZ1tdO1xuICAgIFsuLi5PYmplY3Qua2V5cyhvbGRWYWx1ZSksIC4uLk9iamVjdC5rZXlzKG5ld1ZhbHVlKV0uZm9yRWFjaChrZXkgPT4ge1xuICAgICAgaWYgKGtleSAhPT0gJyR2YWx1ZScgJiYgYWxsS2V5cy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgIGFsbEtleXMucHVzaChrZXkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBhbGxLZXlzLmZpbHRlcihrID0+IG9sZFZhbHVlW2tdICE9PSBuZXdWYWx1ZVtrXSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybUdyb3VwU3RyZWFtcyhmb3JtR3JvdXA6IFVudHlwZWRGb3JtR3JvdXApOiBVbnR5cGVkRm9ybUdyb3VwIHtcbiAgICB0aGlzLl9mb3JtR3JvdXBTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBsZXQgaW5pdCA9IHRydWU7XG4gICAgbGV0IGluaXRGb3JtID0gdHJ1ZTtcbiAgICB0aGlzLl9mb3JtSW5pdEV2ZW50LmVtaXQoQWpmRm9ybUluaXRTdGF0dXMuSW5pdGlhbGl6aW5nKTtcbiAgICB0aGlzLl9mb3JtR3JvdXBTdWJzY3JpcHRpb24gPSBmb3JtR3JvdXAudmFsdWVDaGFuZ2VzXG4gICAgICAucGlwZShcbiAgICAgICAgc3RhcnRXaXRoKHt9KSxcbiAgICAgICAgZGlzdGluY3RVbnRpbENoYW5nZWQoKGEsIGIpID0+IEpTT04uc3RyaW5naWZ5KGEpID09PSBKU09OLnN0cmluZ2lmeShiKSksXG4gICAgICAgIHBhaXJ3aXNlKCksXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1swXSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbMV0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzJdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1szXSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbNF0sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzVdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1s2XSxcbiAgICAgICAgICB0aGlzLl9ub2Rlc01hcHNbN10sXG4gICAgICAgICAgdGhpcy5fbm9kZXNNYXBzWzhdLFxuICAgICAgICAgIHRoaXMuX25vZGVzTWFwc1s5XSxcbiAgICAgICAgICB0aGlzLl9mbGF0Tm9kZXMsXG4gICAgICAgICksXG4gICAgICApXG4gICAgICAuc3Vic2NyaWJlKHYgPT4ge1xuICAgICAgICBjb25zdCBvbGRGb3JtVmFsdWUgPSAoaW5pdCAmJiB7fSkgfHwgdlswXVswXTtcbiAgICAgICAgaW5pdCA9IGZhbHNlO1xuICAgICAgICBjb25zdCBuZXdGb3JtVmFsdWUgPSB2WzBdWzFdO1xuICAgICAgICBjb25zdCBlZGl0YWJpbGl0eSA9IHZbMV07XG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHlNYXAgPSB2WzJdO1xuICAgICAgICBjb25zdCByZXBldGl0aW9uTWFwID0gdlszXTtcbiAgICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlc01hcCA9IHZbNF07XG4gICAgICAgIGNvbnN0IGZvcm11bGFNYXAgPSB2WzVdO1xuICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWFwID0gdls2XTtcbiAgICAgICAgY29uc3Qgd2FybmluZ01hcCA9IHZbN107XG4gICAgICAgIGNvbnN0IG5leHRTbGlkZUNvbmRpdGlvbnNNYXAgPSB2WzhdO1xuICAgICAgICBjb25zdCBmaWx0ZXJlZENob2ljZXNNYXAgPSB2WzldO1xuICAgICAgICBjb25zdCB0cmlnZ2VyQ29uZGl0aW9uc01hcCA9IHZbMTBdO1xuICAgICAgICBjb25zdCBub2RlcyA9IHZbMTFdO1xuXG4gICAgICAgIC8vIHRha2VzIHRoZSBuYW1lcyBvZiB0aGUgZmllbGRzIHRoYXQgaGF2ZSBjaGFuZ2VkXG4gICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5fZm9ybVZhbHVlRGVsdGEob2xkRm9ybVZhbHVlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICBjb25zdCBkZWx0YUxlbiA9IGRlbHRhLmxlbmd0aDtcbiAgICAgICAgbGV0IHVwZGF0ZWROb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcblxuICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yIGVhY2ggZmllbGQgdXBkYXRlIGFsbCBwcm9wZXJ0aWVzIG1hcFxuICAgICAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgZm9sbG93aW5nIHJ1bGUgIFwiaWYgZmllbGRuYW1lIGlzIGluIG1hcCB1cGRhdGUgaXRcIiBhbmRcbiAgICAgICAgICAgICAgICAgICAgICAgIHB1c2ggb24gdXBkYXRlTm9kZXMgdGhlIG5vZGUgaW5zdGFuY2UgdGhhdCB3cmFwIGZpZWxkXG4gICAgICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgZGVsdGEuZm9yRWFjaChmaWVsZE5hbWUgPT4ge1xuICAgICAgICAgIHVwZGF0ZWROb2RlcyA9IHVwZGF0ZWROb2Rlcy5jb25jYXQoXG4gICAgICAgICAgICBub2Rlcy5maWx0ZXIobiA9PiBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobikgPT09IGZpZWxkTmFtZSksXG4gICAgICAgICAgKTtcbiAgICAgICAgICBpZiAoZWRpdGFiaWxpdHlbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBlZGl0YWJpbGl0eVtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlRWRpdGFiaWxpdHkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHZpc2liaWxpdHlNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICB2aXNpYmlsaXR5TWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVWaXNpYmlsaXR5TWFwRW50cnkobm9kZUluc3RhbmNlLCB0aGlzLl9mb3JtR3JvdXAsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChyZXBldGl0aW9uTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVwZXRpdGlvbk1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlUmVwZXRpdGlvbk1hcEVudHJ5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlLCBub2RlcywgdGhpcy5fYWRqdXN0UmVwcyk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChjb25kaXRpb25hbEJyYW5jaGVzTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlc01hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlc01hcEVudHJ5KFxuICAgICAgICAgICAgICAgIG5vZGVJbnN0YW5jZSxcbiAgICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUsXG4gICAgICAgICAgICAgICAgbm9kZXMsXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvd1N1YnRyZWUsXG4gICAgICAgICAgICAgICAgdGhpcy5faGlkZVN1YnRyZWUsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChmb3JtdWxhTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZm9ybXVsYU1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlRm9ybXVsYU1hcEVudHJ5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlLCB0aGlzLl9mb3JtR3JvdXApO1xuICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAodmFsaWRhdGlvbk1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHZhbGlkYXRpb25NYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgIHVwZGF0ZVZhbGlkYXRpb25NYXBFbnRyeShcbiAgICAgICAgICAgICAgICBub2RlSW5zdGFuY2UsXG4gICAgICAgICAgICAgICAgbmV3Rm9ybVZhbHVlLFxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMsXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh3YXJuaW5nTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgd2FybmluZ01hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgdXBkYXRlV2FybmluZ01hcEVudHJ5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGRlbHRhTGVuID09IDEgJiYgbmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgbmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdLmZpbHRlcihub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbihub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgfSkubGVuZ3RoID09IDFcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB0aGlzLl9uZXh0U2xpZGVUcmlnZ2VyLmVtaXQoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoZmlsdGVyZWRDaG9pY2VzTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgZmlsdGVyZWRDaG9pY2VzTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICB1cGRhdGVGaWx0ZXJlZENob2ljZXNNYXBFbnRyeShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChkZWx0YUxlbiA9PSAxICYmIHRyaWdnZXJDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgcmVzID0gdHJpZ2dlckNvbmRpdGlvbnNNYXBbZmllbGROYW1lXS5maWx0ZXIobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgaWYgKCFpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB1cGRhdGVUcmlnZ2VyQ29uZGl0aW9ucyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID09IDEgJiYgaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UocmVzWzBdKSkge1xuICAgICAgICAgICAgICByZXNbMF0uc2VsZWN0aW9uVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdXBkYXRlZE5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgY29uc3Qgbm9kZUlkeCA9IG5vZGVzLmluZGV4T2Yobik7XG4gICAgICAgICAgbGV0IGlkeCA9IG5vZGVJZHggLSAxO1xuICAgICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgY29uc3QgY3VyTm9kZSA9IG5vZGVzW2lkeF07XG4gICAgICAgICAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShjdXJOb2RlKSkge1xuICAgICAgICAgICAgICB1cGRhdGVTbGlkZVZhbGlkaXR5KGN1ck5vZGUpO1xuICAgICAgICAgICAgICBjdXJOb2RlLnVwZGF0ZWRFdnQuZW1pdCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4LS07XG4gICAgICAgICAgfVxuICAgICAgICAgIG4udXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoaW5pdEZvcm0pIHtcbiAgICAgICAgICBpbml0Rm9ybSA9IGZhbHNlO1xuICAgICAgICAgIHRoaXMuX2Zvcm1Jbml0RXZlbnQuZW1pdChBamZGb3JtSW5pdFN0YXR1cy5Db21wbGV0ZSk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VkLm5leHQoKTtcbiAgICAgIH0pO1xuICAgIHJldHVybiBmb3JtR3JvdXA7XG4gIH1cblxuICBwcml2YXRlIF9zaG93U3VidHJlZShcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgYnJhbmNoPzogbnVtYmVyLFxuICApIHtcbiAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2Rlcywgbm9kZSwgdHJ1ZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVTdWJ0cmVlKFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBicmFuY2g/OiBudW1iZXIsXG4gICkge1xuICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBub2RlLCBmYWxzZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICB2aXNpYmxlOiBib29sZWFuLFxuICAgIGJyYW5jaD86IG51bWJlcixcbiAgKSB7XG4gICAgbGV0IHN1Yk5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXTtcbiAgICBjb25zdCBub2RlU3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG5vZGUpO1xuICAgIGlmIChicmFuY2ggIT0gbnVsbCkge1xuICAgICAgc3ViTm9kZXMgPSBub2Rlcy5maWx0ZXIobiA9PiB7XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IG5vZGVJbnN0YW5jZVN1ZmZpeChuKTtcbiAgICAgICAgcmV0dXJuIHN1ZmZpeCA9PSBub2RlU3VmZml4ICYmIG4ubm9kZS5wYXJlbnQgPT0gbm9kZS5ub2RlLmlkICYmIG4ubm9kZS5wYXJlbnROb2RlID09IGJyYW5jaDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBzdWJOb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG4pO1xuICAgICAgICByZXR1cm4gc3VmZml4ID09IG5vZGVTdWZmaXggJiYgbi5ub2RlLnBhcmVudCA9PSBub2RlLm5vZGUuaWQ7XG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgaXNDb250YWluZXIgPSBpc0NvbnRhaW5lck5vZGUobm9kZS5ub2RlKTtcbiAgICBzdWJOb2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgaWYgKFxuICAgICAgICAhaXNDb250YWluZXIgfHxcbiAgICAgICAgKGlzQ29udGFpbmVyICYmICg8QWpmTm9kZUdyb3VwPm5vZGUubm9kZSkubm9kZXMuZmluZChjbiA9PiBjbi5pZCA9PSBuLm5vZGUuaWQpID09IG51bGwpXG4gICAgICApIHtcbiAgICAgICAgdXBkYXRlVmlzaWJpbGl0eShuLCBjb250ZXh0LCB2aXNpYmxlKTtcbiAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShuKSkge1xuICAgICAgICAgIHVwZGF0ZUZvcm11bGEobiwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG4sIHZpc2libGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9IHRoaXMuX25vZGVzVXBkYXRlcy5waXBlKFxuICAgICAgc2Nhbigobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBvcDogQWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgIH0sIFtdKSxcbiAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgICB0aGlzLl9mbGF0Tm9kZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShcbiAgICAgIG1hcChub2RlcyA9PiBmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlKG5vZGVzKSksXG4gICAgICBzaGFyZSgpLFxuICAgICk7XG4gICAgdGhpcy5fZmxhdE5vZGVzID0gdGhpcy5fZmxhdE5vZGVzVHJlZS5waXBlKFxuICAgICAgbWFwKHNsaWRlcyA9PiB7XG4gICAgICAgIGxldCBub2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgICAgc2xpZGVzLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgbm9kZXMucHVzaChzKTtcbiAgICAgICAgICBub2RlcyA9IG5vZGVzLmNvbmNhdChzLmZsYXROb2Rlcyk7XG4gICAgICAgICAgdXBkYXRlU2xpZGVWYWxpZGl0eShzKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pLFxuICAgICAgc2hhcmUoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGZnICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IGN1clZhbHVlID0gZmcudmFsdWU7XG4gICAgICBjb25zdCBuZXdGb3JtVmFsdWUgPSB7Li4uY3VyVmFsdWUsIFtub2RlTmFtZV06IHVuZGVmaW5lZH07XG4gICAgICBmZy5wYXRjaFZhbHVlKG5ld0Zvcm1WYWx1ZSk7XG4gICAgfVxuICAgIHRoaXMuX3JlbW92ZU5vZGVzVmlzaWJpbGl0eU1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1JlcGV0aXRpb25NYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc0Zvcm11bGFNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNWYWxpZGF0aW9uTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzV2FybmluZ01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNGaWx0ZXJlZENob2ljZXNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVOb2Rlc0VkaXRhYmlsaXR5TWFwSW5kZXgobm9kZU5hbWUpO1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbW92ZVNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVTbGlkZUluc3RhbmNlKHNsaWRlSW5zdGFuY2U6IEFqZkJhc2VTbGlkZUluc3RhbmNlKTogQWpmQmFzZVNsaWRlSW5zdGFuY2Uge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChzbGlkZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBzbGlkZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKFxuICAgIG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UsXG4gICk6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZUdyb3VwID0gbm9kZUdyb3VwSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAobm9kZUdyb3VwLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgaWYgKG5vZGVHcm91cEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwgJiYgbm9kZUdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGVHcm91cEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRmllbGRJbnN0YW5jZShmaWVsZEluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgY29uc3QgZmllbGRJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGRJbnN0YW5jZSk7XG4gICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmIGZvcm1Hcm91cC5jb250YWlucyhmaWVsZEluc3RhbmNlTmFtZSkpIHtcbiAgICAgIGZvcm1Hcm91cC5yZW1vdmVDb250cm9sKGZpZWxkSW5zdGFuY2VOYW1lKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIGRlbGV0ZSB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBmaWVsZEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGEpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0Zvcm11bGFNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhLmZvcm11bGEpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGNoZWNrIHRoaXMsIHByb2JhYmx5IGlzIG5ldmVyIHZlcmlmaWVkXG4gICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwgJiYgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMuZm9yRWFjaChjb25kaXRpb24gPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWYWxpZGF0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2Uud2FybmluZyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1dhcm5pbmdNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICAgICAgZmllbGRJbnN0YW5jZSxcbiAgICAgICAgZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24uY29uZGl0aW9uLFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoZmllbGRJbnN0YW5jZSkpIHtcbiAgICAgIGlmIChmaWVsZEluc3RhbmNlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5jaG9pY2VzRmlsdGVyLmZvcm11bGEpO1xuICAgICAgICBpZiAoZmllbGRJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgZmllbGRJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZE5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZFNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGRGaWVsZEluc3RhbmNlKGZpZWxkSW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBmaWVsZEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZEluc3RhbmNlKTtcbiAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgIWZvcm1Hcm91cC5jb250YWlucyhmaWVsZEluc3RhbmNlTmFtZSkpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgVW50eXBlZEZvcm1Db250cm9sKCk7XG4gICAgICBjb250cm9sLnNldFZhbHVlKGZpZWxkSW5zdGFuY2UudmFsdWUpO1xuICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChmaWVsZEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgfVxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcy5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXS5pbmRleE9mKGZpZWxkSW5zdGFuY2UpID09IC0xKSB7XG4gICAgICAgICAgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV0ucHVzaChmaWVsZEluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGZpZWxkSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGEpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNGb3JtdWxhTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYS5mb3JtdWxhKTtcbiAgICB9XG5cbiAgICBpZiAoaXNOb2RlR3JvdXBJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCAmJiBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNWYWxpZGF0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2Uud2FybmluZyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucy5mb3JFYWNoKGNvbmRpdGlvbiA9PiB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNXYXJuaW5nTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKFxuICAgICAgICBmaWVsZEluc3RhbmNlLFxuICAgICAgICBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb24sXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgaWYgKGZpZWxkSW5zdGFuY2UuY2hvaWNlc0ZpbHRlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5jaG9pY2VzRmlsdGVyLmZvcm11bGEpO1xuICAgICAgfVxuICAgICAgaWYgKGZpZWxkSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBmaWVsZEluc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGRJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFNsaWRlSW5zdGFuY2Uoc2xpZGVJbnN0YW5jZTogQWpmU2xpZGVJbnN0YW5jZSk6IEFqZlNsaWRlSW5zdGFuY2Uge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChzbGlkZS5yZWFkb25seSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzRWRpdGFiaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUucmVhZG9ubHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgaWYgKHNsaWRlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBzbGlkZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKHNsaWRlSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNsaWRlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGROb2RlR3JvdXBJbnN0YW5jZShcbiAgICBub2RlR3JvdXBJbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlLFxuICApOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uge1xuICAgIGNvbnN0IG5vZGVHcm91cCA9IG5vZGVHcm91cEluc3RhbmNlLm5vZGU7XG4gICAgaWYgKG5vZGVHcm91cC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBub2RlR3JvdXBJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChub2RlR3JvdXBJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICBpZiAobm9kZUdyb3VwSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgaWYgKG5vZGVHcm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgIGxldCBub2RlR3JvdXBJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUdyb3VwSW5zdGFuY2UpO1xuICAgICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmICFmb3JtR3JvdXAuY29udGFpbnMobm9kZUdyb3VwSW5zdGFuY2VOYW1lKSkge1xuICAgICAgICBjb25zdCBjb250cm9sID0gbmV3IFVudHlwZWRGb3JtQ29udHJvbCgpO1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKG5vZGVHcm91cEluc3RhbmNlLnJlcHMpO1xuICAgICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKG5vZGVHcm91cEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlR3JvdXBJbnN0YW5jZTtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0VkaXRhYmlsaXR5TWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1Zpc2liaWxpdHlNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1JlcGV0aXRpb25NYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzRm9ybXVsYU1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVmFsaWRhdGlvbk1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzV2FybmluZ01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzTWFwSW5kZXgobm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LCBpbmRleDogc3RyaW5nKSB7XG4gICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICBpZiAoT2JqZWN0LmtleXModm1hcCkuaW5kZXhPZihpbmRleCkgPiAtMSkge1xuICAgICAgICBkZWxldGUgdm1hcFtpbmRleF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdm1hcDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChcbiAgICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBmb3JtdWxhOiBzdHJpbmcsXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0Zvcm11bGFNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVmFsaWRhdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNXYXJuaW5nTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKFxuICAgIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGZvcm11bGE6IHN0cmluZyxcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAoXG4gICAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgZm9ybXVsYTogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc01hcChcbiAgICBub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sXG4gICAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgZm9ybXVsYTogc3RyaW5nLFxuICApOiB2b2lkIHtcbiAgICBjb25zdCB0b2tlbnMgPSBnZXRDb2RlSWRlbnRpZmllcnMoZm9ybXVsYSk7XG4gICAgaWYgKHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgdG9rZW5zLmZvckVhY2godG9rZW4gPT4ge1xuICAgICAgICAgIGlmICh2bWFwW3Rva2VuXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB2bWFwW3Rva2VuXS5pbmRleE9mKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICBpZiAoaWR4ID4gLTEpIHtcbiAgICAgICAgICAgICAgdm1hcFt0b2tlbl0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgIGlmICh2bWFwW3Rva2VuXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB2bWFwW3Rva2VuXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0VkaXRhYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzRm9ybXVsYU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1ZhbGlkYXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNXYXJuaW5nTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzTWFwKFxuICAgIG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPixcbiAgICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICBmb3JtdWxhOiBzdHJpbmcsXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHRva2VucyA9IGdldENvZGVJZGVudGlmaWVycyhmb3JtdWxhKTtcbiAgICBpZiAodG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICB0b2tlbnMuZm9yRWFjaCh0b2tlbiA9PiB7XG4gICAgICAgICAgaWYgKHZtYXBbdG9rZW5dID09IG51bGwpIHtcbiAgICAgICAgICAgIHZtYXBbdG9rZW5dID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2bWFwW3Rva2VuXS5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICB2bWFwW3Rva2VuXS5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuY29uc3QgdXBkYXRlVmlzaWJpbGl0eU1hcEVudHJ5ID0gKFxuICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgZm9ybUdyb3VwOiBCZWhhdmlvclN1YmplY3Q8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+LFxuICBuZXdGb3JtVmFsdWU6IGFueSxcbikgPT4ge1xuICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgY29uc3QgdmlzaWJpbGl0eUNoYW5nZWQgPSB1cGRhdGVWaXNpYmlsaXR5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgY29uc3QgaXNGaWVsZCA9IGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICBpZiAodmlzaWJpbGl0eUNoYW5nZWQgJiYgIW5vZGVJbnN0YW5jZS52aXNpYmxlKSB7XG4gICAgY29uc3QgZmcgPSBmb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBpZiAoZmcgIT0gbnVsbCkge1xuICAgICAgY29uc3QgcyA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgaWYgKHMgJiYgIXMuY2xvc2VkKSB7XG4gICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChmZy5jb250cm9scyAhPSBudWxsICYmIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUobnVsbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoaXNGaWVsZCkge1xuICAgICAgbm9kZUluc3RhbmNlLnZhbHVlID0gbnVsbDtcbiAgICB9XG4gIH0gZWxzZSBpZiAodmlzaWJpbGl0eUNoYW5nZWQgJiYgbm9kZUluc3RhbmNlLnZpc2libGUgJiYgaXNGaWVsZCkge1xuICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgY29uc3QgcmVzID0gdXBkYXRlRm9ybXVsYShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQgJiYgZmcuY29udHJvbHMgIT0gbnVsbCAmJiBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdICE9IG51bGwpIHtcbiAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUocmVzLnZhbHVlKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZVJlcGV0aXRpb25NYXBFbnRyeSA9IChcbiAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gIG5ld0Zvcm1WYWx1ZTogYW55LFxuICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gIGNiOiAoXG4gICAgYWxsTm9kZXM6IEFqZk5vZGVbXSB8IEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgIGluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UsXG4gICAgb2xkUmVwczogbnVtYmVyLFxuICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICkgPT4ge2FkZGVkOiBBamZOb2RlSW5zdGFuY2VbXSB8IG51bGw7IHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdIHwgbnVsbH0sXG4pID0+IHtcbiAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICBjb25zdCBvbGRSZXBzID0gdXBkYXRlUmVwc051bShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgaWYgKG9sZFJlcHMgIT09IG5vZGVJbnN0YW5jZS5yZXBzKSB7XG4gICAgICBjYihub2Rlcywgbm9kZUluc3RhbmNlLCBvbGRSZXBzLCBuZXdGb3JtVmFsdWUpO1xuICAgIH1cbiAgfVxufTtcblxuY29uc3QgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlc01hcEVudHJ5ID0gKFxuICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgbmV3Rm9ybVZhbHVlOiBhbnksXG4gIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgc2hvd0NiOiAoXG4gICAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICBub2RlczogQWpmTm9kZUluc3RhbmNlW10sXG4gICAgbm9kZTogQWpmTm9kZUluc3RhbmNlLFxuICAgIGJyYW5jaD86IG51bWJlcixcbiAgKSA9PiB2b2lkLFxuICBoaWRlQ2I6IChcbiAgICBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSxcbiAgICBub2RlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgYnJhbmNoPzogbnVtYmVyLFxuICApID0+IHZvaWQsXG4pID0+IHtcbiAgLy8gY29uc3QgYnJhbmNoQ2hhbmdlZCA9XG4gIC8vIG5vZGVJbnN0YW5jZS51cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKG5ld0Zvcm1WYWx1ZSk7XG4gIHVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXMobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAvLyBpZiAoYnJhbmNoQ2hhbmdlZCkge1xuICBjb25zdCB2ZXJpZmllZEJyYW5jaCA9IG5vZGVJbnN0YW5jZS52ZXJpZmllZEJyYW5jaDtcbiAgbm9kZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoX2NvbmRpdGlvbiwgaWR4KSA9PiB7XG4gICAgaWYgKGlkeCA9PSB2ZXJpZmllZEJyYW5jaCkge1xuICAgICAgc2hvd0NiKG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIG5vZGVJbnN0YW5jZSwgaWR4KTtcbiAgICB9IGVsc2Uge1xuICAgICAgaGlkZUNiKG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIG5vZGVJbnN0YW5jZSwgaWR4KTtcbiAgICB9XG4gIH0pO1xuICAvLyB9XG59O1xuXG5jb25zdCB1cGRhdGVGb3JtdWxhTWFwRW50cnkgPSAoXG4gIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICBuZXdGb3JtVmFsdWU6IGFueSxcbiAgZm9ybUdyb3VwOiBCZWhhdmlvclN1YmplY3Q8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+LFxuKSA9PiB7XG4gIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgIGNvbnN0IGZnID0gZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgIHVwZGF0ZVZhbGlkYXRpb24obm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgZmcuY29udHJvbHNbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSldLnNldFZhbHVlKHJlcy52YWx1ZSk7XG4gICAgfVxuICB9XG59O1xuXG5jb25zdCB1cGRhdGVWYWxpZGF0aW9uTWFwRW50cnkgPSAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZTogYW55LCBzdXBwOiBhbnkpID0+IHtcbiAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgbmV3Rm9ybVZhbHVlLiR2YWx1ZSA9IG5ld0Zvcm1WYWx1ZVtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKV07XG4gICAgdXBkYXRlVmFsaWRhdGlvbihub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSwgc3VwcCk7XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZVdhcm5pbmdNYXBFbnRyeSA9IChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlOiBhbnkpID0+IHtcbiAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgdXBkYXRlV2FybmluZyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgaWYgKFxuICAgICAgbm9kZUluc3RhbmNlLndhcm5pbmdSZXN1bHRzICE9IG51bGwgJiZcbiAgICAgIG5vZGVJbnN0YW5jZS53YXJuaW5nUmVzdWx0cy5maWx0ZXIod2FybmluZyA9PiB3YXJuaW5nLnJlc3VsdCkubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgbm9kZUluc3RhbmNlLndhcm5pbmdUcmlnZ2VyLmVtaXQoKTtcbiAgICB9XG4gIH1cbn07XG5cbmNvbnN0IHVwZGF0ZUZpbHRlcmVkQ2hvaWNlc01hcEVudHJ5ID0gKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWU6IGFueSkgPT4ge1xuICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgIHVwZGF0ZUZpbHRlcmVkQ2hvaWNlcyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gIH1cbn07XG4iXX0=