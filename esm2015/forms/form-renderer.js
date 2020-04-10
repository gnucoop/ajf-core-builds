/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/form-renderer.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/** @type {?} */
const esprimaMod = ((/** @type {?} */ (esprima))).default || esprima;
const { tokenize } = esprimaMod;
/** @enum {number} */
const AjfFormInitStatus = {
    Initializing: 0,
    Complete: 1,
};
export { AjfFormInitStatus };
export class AjfFormRendererService {
    /**
     * @param {?} _
     */
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
    /**
     * @return {?}
     */
    get nodesTree() {
        return this._flatNodesTree;
    }
    /**
     * @return {?}
     */
    get errorPositions() {
        return this._errorPositions;
    }
    /**
     * @return {?}
     */
    get errors() {
        return this._errors;
    }
    /**
     * @return {?}
     */
    get currentSupplementaryInformations() {
        /** @type {?} */
        const form = this._form.getValue();
        return form != null && form.form != null ? form.form.supplementaryInformations : null;
    }
    /**
     * @param {?} form
     * @param {?=} context
     * @return {?}
     */
    setForm(form, context = {}) {
        this._initUpdateMapStreams();
        if (form != null && Object.keys(context).length === 0 &&
            Object.keys(form.initContext || {}).length > 0) {
            context = form.initContext || {};
        }
        /** @type {?} */
        const currentForm = this._form.getValue();
        if ((currentForm == null && form != null) ||
            (currentForm != null && form !== currentForm.form)) {
            this._form.next({ form: form, context: context });
        }
    }
    /**
     * @return {?}
     */
    getFormValue() {
        /** @type {?} */
        const formGroup = this._formGroup.getValue();
        if (formGroup == null) {
            return {};
        }
        /** @type {?} */
        let res = deepCopy(formGroup.value);
        return res;
    }
    /**
     * @param {?} group
     * @return {?}
     */
    addGroup(group) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            const maxReps = group.node.maxReps;
            if (maxReps > 0 && group.reps + 1 > maxReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            const oldReps = group.reps;
            group.reps = group.reps + 1;
            group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
            group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
            this._nodesUpdates.next((/**
             * @param {?} nodes
             * @return {?}
             */
            (nodes) => {
                /** @type {?} */
                const flatNodes = flattenNodesInstances(nodes, true);
                this._adjustReps(flatNodes, group, oldReps, this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            }));
        }));
    }
    /**
     * @param {?} group
     * @return {?}
     */
    removeGroup(group) {
        return new Observable((/**
         * @param {?} subscriber
         * @return {?}
         */
        (subscriber) => {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            const minReps = group.node.minReps;
            if (group.reps - 1 < minReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            /** @type {?} */
            const oldReps = group.reps;
            group.reps = group.reps - 1;
            group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
            group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
            this._nodesUpdates.next((/**
             * @param {?} nodes
             * @return {?}
             */
            (nodes) => {
                this._adjustReps(nodes, group, oldReps, this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            }));
        }));
    }
    /**
     * @param {?} field
     * @return {?}
     */
    getControl(field) {
        return this.formGroup.pipe(map((/**
         * @param {?} f
         * @return {?}
         */
        (f) => {
            /** @type {?} */
            const fieldName = nodeInstanceCompleteName(field);
            return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
        })));
    }
    /**
     * @private
     * @return {?}
     */
    _initErrorsStreams() {
        this._errorPositions = this._valueChanged.pipe(withLatestFrom(this._nodes, this._form), filter((/**
         * @param {?} v
         * @return {?}
         */
        v => v[2] != null && v[2].form != null)), map((/**
         * @param {?} v
         * @return {?}
         */
        (v) => {
            /** @type {?} */
            const nodes = v[1];
            /** @type {?} */
            const form = (/** @type {?} */ ((/** @type {?} */ (v[2])).form));
            /** @type {?} */
            let currentPosition = 0;
            /** @type {?} */
            const errors = [];
            nodes.forEach((/**
             * @param {?} node
             * @return {?}
             */
            (node) => {
                if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                    /** @type {?} */
                    const rsNode = (/** @type {?} */ (node));
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
                    /** @type {?} */
                    const sNode = (/** @type {?} */ (node));
                    if (sNode.visible) {
                        currentPosition++;
                        sNode.position = currentPosition;
                        if (!sNode.valid) {
                            errors.push(currentPosition);
                        }
                    }
                }
            }));
            form.valid = errors.length == 0;
            this._slidesNum.next(currentPosition);
            return errors;
        })), publishReplay(), refCount());
        this._errors = this._errorPositions.pipe(map((/**
         * @param {?} e
         * @return {?}
         */
        e => e != null ? e.length : 0)), startWith(0), publishReplay(), refCount());
    }
    /**
     * @private
     * @return {?}
     */
    _initUpdateMapStreams() {
        this._visibilityNodesMap =
            ((/** @type {?} */ (this._visibilityNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._repetitionNodesMap =
            ((/** @type {?} */ (this._repetitionNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._conditionalBranchNodesMap =
            ((/** @type {?} */ (this._conditionalBranchNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._formulaNodesMap =
            ((/** @type {?} */ (this._formulaNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._validationNodesMap =
            ((/** @type {?} */ (this._validationNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._warningNodesMap =
            ((/** @type {?} */ (this._warningNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._filteredChoicesNodesMap =
            ((/** @type {?} */ (this._filteredChoicesNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._triggerConditionsNodesMap =
            ((/** @type {?} */ (this._triggerConditionsNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._nextSlideConditionsNodesMap =
            ((/** @type {?} */ (this._nextSlideConditionsNodesMapUpdates)))
                .pipe(scan((/**
             * @param {?} rmap
             * @param {?} op
             * @return {?}
             */
            (rmap, op) => {
                return op(rmap);
            }), {}), startWith({}), share());
        this._nodesMaps = [
            this._visibilityNodesMap, this._repetitionNodesMap, this._conditionalBranchNodesMap,
            this._formulaNodesMap, this._validationNodesMap, this._warningNodesMap,
            this._nextSlideConditionsNodesMap, this._filteredChoicesNodesMap,
            this._triggerConditionsNodesMap
        ];
    }
    /**
     * @private
     * @return {?}
     */
    _initFormStreams() {
        /** @type {?} */
        const formObs = (/** @type {?} */ (this._form));
        formObs
            .pipe(map((/**
         * @param {?} _form
         * @return {?}
         */
        (_form) => {
            return this._initFormGroupStreams(new FormGroup({}));
        })))
            .subscribe(this._formGroup);
        formObs
            .pipe(switchMap((/**
         * @param {?} form
         * @return {?}
         */
        form => {
            if (form == null || form.form == null) {
                return obsOf(form);
            }
            /** @type {?} */
            const choicesOrigins = form.form.choicesOrigins || [];
            if (choicesOrigins.length === 0) {
                return obsOf(form);
            }
            return from(Promise.all(choicesOrigins.map((/**
             * @param {?} co
             * @return {?}
             */
            co => initChoicesOrigin(co)))))
                .pipe(map((/**
             * @return {?}
             */
            () => form)));
        })), map((/**
         * @param {?} form
         * @return {?}
         */
        (form) => {
            return (/**
             * @param {?} _nodesInstances
             * @return {?}
             */
            (_nodesInstances) => {
                /** @type {?} */
                const nodes = form != null && form.form != null ?
                    this._orderedNodesInstancesTree(flattenNodes(form.form.nodes), form.form.nodes, undefined, [], form.context || {}) :
                    [];
                /** @type {?} */
                let currentPosition = 0;
                nodes.forEach((/**
                 * @param {?} node
                 * @return {?}
                 */
                (node) => {
                    if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                        /** @type {?} */
                        const rsNode = (/** @type {?} */ (node));
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
                        /** @type {?} */
                        const sNode = (/** @type {?} */ (node));
                        if (sNode.visible) {
                            currentPosition++;
                            sNode.position = currentPosition;
                        }
                    }
                }));
                return nodes;
            });
        })))
            .subscribe(this._nodesUpdates);
    }
    /**
     * @private
     * @param {?} allNodes
     * @param {?} node
     * @param {?} prefix
     * @param {?} context
     * @param {?=} branchVisibility
     * @return {?}
     */
    _initNodeInstance(allNodes, node, prefix, context, branchVisibility = true) {
        /** @type {?} */
        let instance = nodeToNodeInstance(allNodes, node, prefix, context);
        if (instance != null) {
            /** @type {?} */
            const nodeType = instance.node.nodeType;
            if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                this._explodeRepeatingNode(allNodes, (/** @type {?} */ (instance)), context);
            }
            else if (nodeType === AjfNodeType.AjfSlide) {
                /** @type {?} */
                const sInstance = (/** @type {?} */ (instance));
                sInstance.nodes = this._orderedNodesInstancesTree(allNodes, sInstance.node.nodes, sInstance.node.id, prefix, context);
            }
            updateVisibility(instance, context, branchVisibility);
            updateConditionalBranches(instance, context);
            if (nodeType === AjfNodeType.AjfField) {
                /** @type {?} */
                const fInstance = (/** @type {?} */ (instance));
                if (isCustomFieldWithChoices(fInstance.node) || isFieldWithChoices(fInstance.node)) {
                    updateFilteredChoices((/** @type {?} */ (fInstance)), context);
                }
                else {
                    if (isTableFieldInstance(fInstance)) {
                        /** @type {?} */
                        const tfInstance = (/** @type {?} */ (fInstance));
                        /** @type {?} */
                        const tNode = tfInstance.node;
                        tfInstance.context = context[nodeInstanceCompleteName(tfInstance)] || context;
                        /** @type {?} */
                        const formGroup = this._formGroup.getValue();
                        /** @type {?} */
                        let controlsWithLabels = [];
                        controlsWithLabels.push([node.label, tNode.columnLabels]);
                        if (formGroup != null) {
                            tNode.rows.forEach((/**
                             * @param {?} row
                             * @param {?} rowIdx
                             * @return {?}
                             */
                            (row, rowIdx) => {
                                /** @type {?} */
                                let r = [];
                                ((/** @type {?} */ (row))).forEach((/**
                                 * @param {?} cell
                                 * @param {?} idx
                                 * @return {?}
                                 */
                                (cell, idx) => {
                                    /*
                                                      every control is registered with the cell position
                                                      inside the form control matrix
                                                      with this mask `${tNode.name}__${rowIdx}__${idx}`
                                                      */
                                    /** @type {?} */
                                    const name = `${tNode.name}__${rowIdx}__${idx}`;
                                    /** @type {?} */
                                    const control = new FormControl();
                                    control.setValue(tfInstance.context[cell.formula]);
                                    formGroup.registerControl(name, control);
                                    r.push(control);
                                    /* create a object that respect the instance interface
                                                      with the minimum defined properties to allow to run addToNodeFormula map*/
                                    /** @type {?} */
                                    const fakeInstance = (/** @type {?} */ ((/** @type {?} */ ({
                                        formula: { formula: cell.formula },
                                        node: { name, nodeType: 0, editable: false },
                                        visible: true,
                                        prefix: [],
                                        conditionalBranches: [],
                                        updatedEvt: new EventEmitter()
                                    }))));
                                    this._addToNodesFormulaMap(fakeInstance, cell.formula);
                                }));
                                controlsWithLabels.push([tNode.rowLabels[rowIdx], r]);
                            }));
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
    /**
     * @private
     * @param {?} allNodes
     * @param {?} instance
     * @param {?} oldReps
     * @param {?} context
     * @return {?}
     */
    _adjustReps(allNodes, instance, oldReps, context) {
        /** @type {?} */
        const newReps = instance.reps;
        /** @type {?} */
        const result = { added: null, removed: null };
        if (oldReps < newReps) {
            /** @type {?} */
            const newNodes = [];
            if (instance.nodes == null) {
                instance.nodes = [];
            }
            if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                /** @type {?} */
                const node = (/** @type {?} */ (createField({
                    id: 999,
                    name: '',
                    parent: -1,
                    fieldType: AjfFieldType.Empty,
                    label: instance.node.label
                })));
                /** @type {?} */
                const newInstance = this._initNodeInstance(allNodes, node, instance.prefix.slice(0), context);
                if (newInstance != null) {
                    instance.nodes.push(newInstance);
                }
            }
            for (let i = oldReps; i < newReps; i++) {
                /** @type {?} */
                const prefix = instance.prefix.slice(0);
                /** @type {?} */
                const group = instance.node;
                prefix.push(i);
                orderedNodes(group.nodes, instance.node.id).forEach((/**
                 * @param {?} n
                 * @return {?}
                 */
                (n) => {
                    /** @type {?} */
                    const newInstance = this._initNodeInstance(allNodes, n, prefix, context);
                    if (newInstance != null) {
                        newNodes.push(newInstance);
                        instance.nodes.push(newInstance);
                    }
                }));
                this._addNodeInstance(instance);
            }
            result.added = newNodes;
        }
        else if (oldReps > newReps) {
            /** @type {?} */
            let nodesNum = instance.nodes.length / oldReps;
            if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                nodesNum++;
            }
            result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
            result.removed.forEach(((/**
             * @param {?} n
             * @return {?}
             */
            n => {
                this._removeNodeInstance(n);
            })));
        }
        if (oldReps != newReps && instance.formulaReps == null) {
            /** @type {?} */
            const fg = this._formGroup.getValue();
            /** @type {?} */
            const completeName = nodeInstanceCompleteName(instance);
            if (fg != null && fg.contains(completeName)) {
                fg.controls[completeName].setValue(instance.reps);
            }
        }
        instance.flatNodes = flattenNodesInstances(instance.nodes);
        if (instance.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            /** @type {?} */
            const rsInstance = (/** @type {?} */ (instance));
            /** @type {?} */
            const slideNodes = [];
            /** @type {?} */
            const nodesPerSlide = rsInstance.nodes != null ? rsInstance.nodes.length / rsInstance.reps : 0;
            for (let i = 0; i < instance.reps; i++) {
                /** @type {?} */
                const startNode = i * nodesPerSlide;
                slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
            }
            rsInstance.slideNodes = slideNodes;
        }
        return result;
    }
    /**
     * @private
     * @return {?}
     */
    _updateFormValueAndValidity() {
        this._nodesUpdates.asObservable()
            .pipe(withLatestFrom(this._formGroup), filter((/**
         * @param {?} values
         * @return {?}
         */
        (values) => values[1] !== null)))
            .subscribe((/**
         * @param {?} values
         * @return {?}
         */
        (values) => {
            /** @type {?} */
            const form = (/** @type {?} */ (values[1]));
            form.updateValueAndValidity();
        }));
    }
    /**
     * @private
     * @param {?} allNodes
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    _explodeRepeatingNode(allNodes, instance, context) {
        /** @type {?} */
        const oldReps = updateRepsNum(instance, context);
        if (oldReps !== instance.reps) {
            this._adjustReps(allNodes, instance, oldReps, context);
        }
    }
    /**
     * @private
     * @param {?} allNodes
     * @param {?} nodes
     * @param {?=} parent
     * @param {?=} prefix
     * @param {?=} context
     * @return {?}
     */
    _orderedNodesInstancesTree(allNodes, nodes, parent = null, prefix = [], context) {
        /** @type {?} */
        let nodesInstances = [];
        /** @type {?} */
        const curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
        orderedNodes(nodes, parent).forEach((/**
         * @param {?} node
         * @return {?}
         */
        (node) => {
            /** @type {?} */
            const parentNodeInstance = nodesInstances.find((/**
             * @param {?} ni
             * @return {?}
             */
            ni => ni.node.id == node.parent && nodeInstanceSuffix(ni) == curSuffix));
            /** @type {?} */
            const branchVisibility = parentNodeInstance != null ?
                parentNodeInstance.verifiedBranch != null &&
                    parentNodeInstance.verifiedBranch == node.parentNode :
                true;
            /** @type {?} */
            const nni = this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
            if (nni != null) {
                nodesInstances.push(nni);
            }
        }));
        return nodesInstances;
    }
    /**
     * @private
     * @param {?} oldValue
     * @param {?} newValue
     * @return {?}
     */
    _formValueDelta(oldValue, newValue) {
        return Object.keys(newValue).filter((/**
         * @param {?} k
         * @return {?}
         */
        (k) => oldValue[k] !== newValue[k]));
    }
    /**
     * @private
     * @param {?} formGroup
     * @return {?}
     */
    _initFormGroupStreams(formGroup) {
        this._formGroupSubscription.unsubscribe();
        /** @type {?} */
        let init = true;
        /** @type {?} */
        let initForm = true;
        this._formInitEvent.emit(0 /* Initializing */);
        this._formGroupSubscription =
            formGroup.valueChanges
                .pipe(startWith({}), pairwise(), debounceTime(200), withLatestFrom(...(this._nodesMaps), this._flatNodes))
                .subscribe((/**
             * @param {?} v
             * @return {?}
             */
            (v) => {
                /** @type {?} */
                const oldFormValue = init && {} || v[0][0];
                init = false;
                /** @type {?} */
                const newFormValue = v[0][1];
                /** @type {?} */
                const visibilityMap = v[1];
                /** @type {?} */
                const repetitionMap = v[2];
                /** @type {?} */
                const conditionalBranchesMap = v[3];
                /** @type {?} */
                const formulaMap = v[4];
                /** @type {?} */
                const validationMap = v[5];
                /** @type {?} */
                const warningMap = v[6];
                /** @type {?} */
                const nextSlideConditionsMap = v[7];
                /** @type {?} */
                const filteredChoicesMap = v[8];
                /** @type {?} */
                const triggerConditionsMap = v[9];
                /** @type {?} */
                const nodes = v[10];
                // takes the names of the fields that have changed
                /** @type {?} */
                const delta = this._formValueDelta(oldFormValue, newFormValue);
                /** @type {?} */
                const deltaLen = delta.length;
                /** @type {?} */
                let updatedNodes = [];
                /*
                  for each field update all properties map
                  with the following rule  "if fieldname is in map update it" and
                  push on updateNodes the node instance that wrap field
                */
                delta.forEach((/**
                 * @param {?} fieldName
                 * @return {?}
                 */
                (fieldName) => {
                    updatedNodes = updatedNodes.concat(nodes.filter((/**
                     * @param {?} n
                     * @return {?}
                     */
                    n => nodeInstanceCompleteName(n) === fieldName)));
                    if (visibilityMap[fieldName] != null) {
                        visibilityMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        nodeInstance => {
                            /** @type {?} */
                            const completeName = nodeInstanceCompleteName(nodeInstance);
                            /** @type {?} */
                            const visibilityChanged = updateVisibility(nodeInstance, newFormValue);
                            /** @type {?} */
                            const isField = isFieldInstance(nodeInstance);
                            if (visibilityChanged && !nodeInstance.visible) {
                                /** @type {?} */
                                const fg = this._formGroup.getValue();
                                if (fg != null) {
                                    /** @type {?} */
                                    const s = timer(200).subscribe((/**
                                     * @return {?}
                                     */
                                    () => {
                                        if (s && !s.closed) {
                                            s.unsubscribe();
                                        }
                                        fg.controls[completeName].setValue(null);
                                    }));
                                }
                                if (isField) {
                                    ((/** @type {?} */ (nodeInstance))).value = null;
                                }
                            }
                            else if (visibilityChanged && nodeInstance.visible && isField) {
                                /** @type {?} */
                                const fg = this._formGroup.getValue();
                                /** @type {?} */
                                const res = updateFormula((/** @type {?} */ (nodeInstance)), newFormValue);
                                if (fg != null && res.changed) {
                                    fg.controls[completeName].setValue(res.value);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (repetitionMap[fieldName] != null) {
                        repetitionMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        nodeInstance => {
                            if (isRepeatingContainerNode(nodeInstance.node)) {
                                /** @type {?} */
                                const rnInstance = (/** @type {?} */ (nodeInstance));
                                /** @type {?} */
                                const oldReps = updateRepsNum(rnInstance, newFormValue);
                                if (oldReps !== rnInstance.reps) {
                                    this._adjustReps(nodes, rnInstance, oldReps, newFormValue);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (conditionalBranchesMap[fieldName] != null) {
                        conditionalBranchesMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            // const branchChanged = nodeInstance.updateConditionalBranches(newFormValue);
                            updateConditionalBranches(nodeInstance, newFormValue);
                            // if (branchChanged) {
                            /** @type {?} */
                            const verifiedBranch = nodeInstance.verifiedBranch;
                            nodeInstance.conditionalBranches.forEach((/**
                             * @param {?} _condition
                             * @param {?} idx
                             * @return {?}
                             */
                            (_condition, idx) => {
                                if (idx == verifiedBranch) {
                                    this._showSubtree(newFormValue, nodes, nodeInstance, idx);
                                }
                                else {
                                    this._hideSubtree(newFormValue, nodes, nodeInstance, idx);
                                }
                            }));
                            // }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (formulaMap[fieldName] != null) {
                        formulaMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                /** @type {?} */
                                const fInstance = (/** @type {?} */ (nodeInstance));
                                /** @type {?} */
                                const res = updateFormula(fInstance, newFormValue);
                                /** @type {?} */
                                const fg = this._formGroup.getValue();
                                if (fg != null && res.changed) {
                                    updateValidation(fInstance, newFormValue);
                                    fg.controls[nodeInstanceCompleteName(nodeInstance)].setValue(res.value);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (validationMap[fieldName] != null) {
                        validationMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                /** @type {?} */
                                const fInstance = (/** @type {?} */ (nodeInstance));
                                newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
                                updateValidation(fInstance, newFormValue, this.currentSupplementaryInformations);
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (warningMap[fieldName] != null) {
                        warningMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                /** @type {?} */
                                const fInstance = (/** @type {?} */ (nodeInstance));
                                updateWarning(fInstance, newFormValue);
                                if (fInstance.warningResults != null &&
                                    fInstance.warningResults.filter((/**
                                     * @param {?} warning
                                     * @return {?}
                                     */
                                    warning => warning.result)).length > 0) {
                                    fInstance.warningTrigger.emit();
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
                        if (nextSlideConditionsMap[fieldName]
                            .filter((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                /** @type {?} */
                                const fInstance = (/** @type {?} */ (nodeInstance));
                                return updateNextSlideCondition(fInstance, newFormValue);
                            }
                            return false;
                        }))
                            .length == 1) {
                            this._nextSlideTrigger.emit();
                        }
                    }
                    if (filteredChoicesMap[fieldName] != null) {
                        filteredChoicesMap[fieldName].forEach((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (isFieldInstance(nodeInstance)) {
                                /** @type {?} */
                                const fInstance = (/** @type {?} */ (nodeInstance));
                                if (isFieldWithChoices(fInstance.node)) {
                                    updateFilteredChoices((/** @type {?} */ (fInstance)), newFormValue);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        }));
                    }
                    if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
                        /** @type {?} */
                        const res = triggerConditionsMap[fieldName].filter((/**
                         * @param {?} nodeInstance
                         * @return {?}
                         */
                        (nodeInstance) => {
                            if (!isFieldInstance(nodeInstance)) {
                                return false;
                            }
                            /** @type {?} */
                            const fInstance = (/** @type {?} */ (nodeInstance));
                            if (!isFieldWithChoices(fInstance.node)) {
                                return false;
                            }
                            return updateTriggerConditions((/** @type {?} */ (fInstance)), newFormValue);
                        }));
                        if (res.length == 1) {
                            ((/** @type {?} */ (res[0]))).selectionTrigger.emit();
                        }
                    }
                }));
                updatedNodes.forEach((/**
                 * @param {?} n
                 * @return {?}
                 */
                n => {
                    /** @type {?} */
                    const nodeIdx = nodes.indexOf(n);
                    /** @type {?} */
                    let idx = nodeIdx - 1;
                    while (idx >= 0) {
                        /** @type {?} */
                        const curNode = nodes[idx];
                        if (isSlidesInstance(curNode)) {
                            /** @type {?} */
                            const slide = (/** @type {?} */ (curNode));
                            /** @type {?} */
                            const subNodesNum = slide.flatNodes.length;
                            /** @type {?} */
                            let valid = true;
                            for (let i = 0; i < subNodesNum; i++) {
                                /** @type {?} */
                                const subNode = slide.flatNodes[i];
                                if (subNode.visible && isFieldInstance(subNode) &&
                                    !((/** @type {?} */ (subNode))).valid) {
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
                }));
                if (initForm) {
                    initForm = false;
                    this._formInitEvent.emit(1 /* Complete */);
                }
                this._valueChanged.next();
            }));
        return formGroup;
    }
    /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?=} branch
     * @return {?}
     */
    _showSubtree(context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, true, branch);
    }
    /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?=} branch
     * @return {?}
     */
    _hideSubtree(context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, false, branch);
    }
    /**
     * @private
     * @param {?} context
     * @param {?} nodes
     * @param {?} node
     * @param {?} visible
     * @param {?=} branch
     * @return {?}
     */
    _updateSubtreeVisibility(context, nodes, node, visible, branch) {
        /** @type {?} */
        let subNodes;
        /** @type {?} */
        const nodeSuffix = nodeInstanceSuffix(node);
        if (branch != null) {
            subNodes = nodes.filter((/**
             * @param {?} n
             * @return {?}
             */
            n => {
                /** @type {?} */
                const suffix = nodeInstanceSuffix(n);
                return suffix == nodeSuffix && n.node.parent == node.node.id && n.node.parentNode == branch;
            }));
        }
        else {
            subNodes = nodes.filter((/**
             * @param {?} n
             * @return {?}
             */
            n => {
                /** @type {?} */
                const suffix = nodeInstanceSuffix(n);
                return suffix == nodeSuffix && n.node.parent == node.node.id;
            }));
        }
        /** @type {?} */
        const isContainer = isContainerNode(node.node);
        subNodes.forEach((/**
         * @param {?} n
         * @return {?}
         */
        (n) => {
            if (!isContainer ||
                (isContainer && ((/** @type {?} */ (node.node))).nodes.find((/**
                 * @param {?} cn
                 * @return {?}
                 */
                cn => cn.id == n.node.id)) == null)) {
                updateVisibility(n, context, visible);
                updateFormula((/** @type {?} */ (n)), context);
                this._updateSubtreeVisibility(context, nodes, n, visible);
            }
        }));
    }
    /**
     * @private
     * @return {?}
     */
    _initNodesStreams() {
        this._nodes =
            this._nodesUpdates.pipe(scan((/**
             * @param {?} nodes
             * @param {?} op
             * @return {?}
             */
            (nodes, op) => {
                return op(nodes);
            }), []), share());
        this._flatNodesTree = this._nodes.pipe(map((/**
         * @param {?} nodes
         * @return {?}
         */
        nodes => flattenNodesInstancesTree(nodes))), share());
        this._flatNodes = this._flatNodesTree.pipe(map((/**
         * @param {?} slides
         * @return {?}
         */
        slides => {
            /** @type {?} */
            let nodes = [];
            slides.forEach((/**
             * @param {?} s
             * @return {?}
             */
            s => {
                nodes.push(s);
                nodes = nodes.concat(s.flatNodes);
            }));
            return nodes;
        })), share());
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @return {?}
     */
    _removeNodeInstance(nodeInstance) {
        /** @type {?} */
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
            return this._removeSlideInstance((/** @type {?} */ (nodeInstance)));
        }
        else if (isRepeatingContainerNode(nodeInstance.node)) {
            this._removeNodeGroupInstance((/** @type {?} */ (nodeInstance)));
        }
        else if (isFieldInstance(nodeInstance)) {
            this._removeFieldInstance((/** @type {?} */ (nodeInstance)));
        }
        return nodeInstance;
    }
    /**
     * @private
     * @param {?} slideInstance
     * @return {?}
     */
    _removeSlideInstance(slideInstance) {
        /** @type {?} */
        const slide = slideInstance.node;
        if (slide.visibility != null) {
            this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        (conditionalBranch) => {
            this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        }));
        return slideInstance;
    }
    /**
     * @private
     * @param {?} nodeGroupInstance
     * @return {?}
     */
    _removeNodeGroupInstance(nodeGroupInstance) {
        /** @type {?} */
        const nodeGroup = nodeGroupInstance.node;
        if (nodeGroup.visibility != null) {
            this._removeFromNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        if (nodeGroupInstance.formulaReps != null && nodeGroup.formulaReps != null) {
            this._removeFromNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
        }
        return nodeGroupInstance;
    }
    /**
     * @private
     * @param {?} fieldInstance
     * @return {?}
     */
    _removeFieldInstance(fieldInstance) {
        /** @type {?} */
        const formGroup = this._formGroup.getValue();
        /** @type {?} */
        const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
        if (formGroup != null && formGroup.contains(fieldInstanceName)) {
            formGroup.removeControl(fieldInstanceName);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next((/**
             * @param {?} vmap
             * @return {?}
             */
            (vmap) => {
                if (vmap[fieldInstanceName] == null) {
                    delete vmap[fieldInstanceName];
                }
                return vmap;
            }));
        }
        if (fieldInstance.visibility != null) {
            this._removeFromNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
        }
        fieldInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        (conditionalBranch) => {
            this._removeFromNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
        }));
        if (fieldInstance.formula) {
            this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        // TODO: check this, probably is never verified
        if (isRepeatingContainerNode(fieldInstance.node)) {
            /** @type {?} */
            const rcInstance = ((/** @type {?} */ ((/** @type {?} */ (fieldInstance)))));
            if (rcInstance.formulaReps != null) {
                this._removeFromNodesRepetitionMap(fieldInstance, rcInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                this._removeFromNodesValidationMap(fieldInstance, condition.condition);
            }));
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                this._removeFromNodesWarningMap(fieldInstance, condition.condition);
            }));
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._removeFromNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isFieldWithChoices(fieldInstance.node)) {
            /** @type {?} */
            const fwcInstance = (/** @type {?} */ (fieldInstance));
            if (fwcInstance.choicesFilter != null) {
                this._removeFromNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
                if (fwcInstance.triggerConditions != null) {
                    fwcInstance.triggerConditions.forEach((/**
                     * @param {?} condition
                     * @return {?}
                     */
                    (condition) => {
                        this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                    }));
                }
            }
        }
        return fieldInstance;
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @return {?}
     */
    _addNodeInstance(nodeInstance) {
        if (isRepeatingContainerNode(nodeInstance.node)) {
            return this._addNodeGroupInstance((/** @type {?} */ (nodeInstance)));
        }
        else if (isSlideInstance(nodeInstance)) {
            return this._addSlideInstance((/** @type {?} */ (nodeInstance)));
        }
        else if (isFieldInstance(nodeInstance)) {
            return this._addFieldInstance((/** @type {?} */ (nodeInstance)));
        }
        return nodeInstance;
    }
    /**
     * @private
     * @param {?} fieldInstance
     * @return {?}
     */
    _addFieldInstance(fieldInstance) {
        /** @type {?} */
        const formGroup = this._formGroup.getValue();
        /** @type {?} */
        const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
        if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
            /** @type {?} */
            const control = new FormControl();
            control.setValue(fieldInstance.value);
            formGroup.registerControl(fieldInstanceName, control);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next((/**
             * @param {?} vmap
             * @return {?}
             */
            (vmap) => {
                if (vmap[fieldInstanceName] == null) {
                    vmap[fieldInstanceName] = [];
                }
                if (vmap[fieldInstanceName].indexOf(fieldInstance) == -1) {
                    vmap[fieldInstanceName].push(fieldInstance);
                }
                return vmap;
            }));
        }
        else {
            fieldInstance.valid = true;
        }
        if (fieldInstance.visibility != null) {
            this._addToNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
        }
        fieldInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        (conditionalBranch) => {
            this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
        }));
        if (fieldInstance.formula) {
            this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        if (isNodeGroupInstance(fieldInstance)) {
            /** @type {?} */
            const ngInstance = (/** @type {?} */ ((/** @type {?} */ (fieldInstance))));
            if (ngInstance.formulaReps != null) {
                this._addToNodesRepetitionMap(fieldInstance, ngInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                this._addToNodesValidationMap(fieldInstance, condition.condition);
            }));
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach((/**
             * @param {?} condition
             * @return {?}
             */
            (condition) => {
                this._addToNodesWarningMap(fieldInstance, condition.condition);
            }));
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._addToNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isCustomFieldWithChoices(fieldInstance.node) || isFieldWithChoicesInstance(fieldInstance)) {
            /** @type {?} */
            const fwcInstance = (/** @type {?} */ (fieldInstance));
            if (fwcInstance.choicesFilter != null) {
                this._addToNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
            }
            if (fwcInstance.triggerConditions != null) {
                fwcInstance.triggerConditions.forEach((/**
                 * @param {?} condition
                 * @return {?}
                 */
                (condition) => {
                    this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                }));
            }
        }
        return fieldInstance;
    }
    /**
     * @private
     * @param {?} slideInstance
     * @return {?}
     */
    _addSlideInstance(slideInstance) {
        /** @type {?} */
        const slide = slideInstance.node;
        if (slide.visibility != null) {
            this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        (conditionalBranch) => {
            this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        }));
        return slideInstance;
    }
    /**
     * @private
     * @param {?} nodeGroupInstance
     * @return {?}
     */
    _addNodeGroupInstance(nodeGroupInstance) {
        /** @type {?} */
        const nodeGroup = nodeGroupInstance.node;
        if (nodeGroup.visibility != null) {
            this._addToNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        nodeGroupInstance.conditionalBranches.forEach((/**
         * @param {?} conditionalBranch
         * @return {?}
         */
        (conditionalBranch) => {
            this._addToNodesConditionalBranchMap(nodeGroupInstance, conditionalBranch.condition);
        }));
        if (nodeGroupInstance.formulaReps != null) {
            if (nodeGroup.formulaReps != null) {
                this._addToNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
            }
        }
        else {
            /** @type {?} */
            let formGroup = this._formGroup.getValue();
            /** @type {?} */
            let nodeGroupInstanceName = nodeInstanceCompleteName(nodeGroupInstance);
            if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
                /** @type {?} */
                const control = new FormControl();
                control.setValue(nodeGroupInstance.reps);
                formGroup.registerControl(nodeGroupInstanceName, control);
            }
        }
        return nodeGroupInstance;
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesVisibilityMapIndex(index) {
        this._removeNodesMapIndex(this._visibilityNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesRepetitionMapIndex(index) {
        this._removeNodesMapIndex(this._repetitionNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesConditionalBranchMapIndex(index) {
        this._removeNodesMapIndex(this._conditionalBranchNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesFormulaMapIndex(index) {
        this._removeNodesMapIndex(this._formulaNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesValidationMapIndex(index) {
        this._removeNodesMapIndex(this._validationNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesWarningMapIndex(index) {
        this._removeNodesMapIndex(this._warningNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesFilteredChoicesMapIndex(index) {
        this._removeNodesMapIndex(this._filteredChoicesNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesTriggerConditionsMapIndex(index) {
        this._removeNodesMapIndex(this._triggerConditionsNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    _removeNodesNextSlideConditionsMapIndex(index) {
        this._removeNodesMapIndex(this._nextSlideConditionsNodesMapUpdates, index);
    }
    /**
     * @private
     * @param {?} nodesMap
     * @param {?} index
     * @return {?}
     */
    _removeNodesMapIndex(nodesMap, index) {
        nodesMap.next((/**
         * @param {?} vmap
         * @return {?}
         */
        (vmap) => {
            if (Object.keys(vmap).indexOf(index) > -1) {
                delete vmap[index];
            }
            return vmap;
        }));
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesVisibilityMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesRepetitionMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesConditionalBranchMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesFormulaMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesValidationMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesWarningMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesFilteredChoicesMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesTriggerConditionsMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesNextSlideConditionsMap(nodeInstance, formula) {
        this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodesMap
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _removeFromNodesMap(nodesMap, nodeInstance, formula) {
        /** @type {?} */
        let tokens = tokenize(formula).filter((/**
         * @param {?} token
         * @return {?}
         */
        (token) => token.type == 'Identifier' && token.value != '$value'));
        if (tokens.length > 0) {
            nodesMap.next((/**
             * @param {?} vmap
             * @return {?}
             */
            (vmap) => {
                tokens.forEach((/**
                 * @param {?} token
                 * @return {?}
                 */
                (token) => {
                    /** @type {?} */
                    let tokenName = token.value;
                    if (vmap[tokenName] != null) {
                        /** @type {?} */
                        const idx = vmap[tokenName].indexOf(nodeInstance);
                        if (idx > -1) {
                            vmap[tokenName].splice(idx, 1);
                            if (vmap[tokenName].length == 0) {
                                delete vmap[tokenName];
                            }
                        }
                    }
                }));
                return vmap;
            }));
        }
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesVisibilityMap(nodeInstance, formula) {
        this._addToNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesRepetitionMap(nodeInstance, formula) {
        this._addToNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesConditionalBranchMap(nodeInstance, formula) {
        this._addToNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesFormulaMap(nodeInstance, formula) {
        this._addToNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesValidationMap(nodeInstance, formula) {
        this._addToNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesWarningMap(nodeInstance, formula) {
        this._addToNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesFilteredChoicesMap(nodeInstance, formula) {
        this._addToNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesTriggerConditionsMap(nodeInstance, formula) {
        this._addToNodesMap(this._triggerConditionsNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesNextSlideConditionsMap(nodeInstance, formula) {
        this._addToNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    }
    /**
     * @private
     * @param {?} nodesMap
     * @param {?} nodeInstance
     * @param {?} formula
     * @return {?}
     */
    _addToNodesMap(nodesMap, nodeInstance, formula) {
        /** @type {?} */
        let tokens = tokenize(formula).filter((/**
         * @param {?} token
         * @return {?}
         */
        (token) => token.type == 'Identifier' && token.value != '$value'));
        if (tokens.length > 0) {
            nodesMap.next((/**
             * @param {?} vmap
             * @return {?}
             */
            (vmap) => {
                tokens.forEach((/**
                 * @param {?} token
                 * @return {?}
                 */
                (token) => {
                    /** @type {?} */
                    let tokenName = token.value;
                    if (vmap[tokenName] == null) {
                        vmap[tokenName] = [];
                    }
                    if (vmap[tokenName].indexOf(nodeInstance) === -1) {
                        vmap[tokenName].push(nodeInstance);
                    }
                }));
                return vmap;
            }));
        }
    }
}
AjfFormRendererService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AjfFormRendererService.ctorParameters = () => [
    { type: AjfValidationService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._visibilityNodesMap;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._visibilityNodesMapUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._repetitionNodesMap;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._repetitionNodesMapUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._conditionalBranchNodesMap;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._conditionalBranchNodesMapUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._formulaNodesMap;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._formulaNodesMapUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._validationNodesMap;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._validationNodesMapUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._warningNodesMap;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._warningNodesMapUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._filteredChoicesNodesMap;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._filteredChoicesNodesMapUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._triggerConditionsNodesMap;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._triggerConditionsNodesMapUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._nextSlideConditionsNodesMap;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._nextSlideConditionsNodesMapUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._formInitEvent;
    /** @type {?} */
    AjfFormRendererService.prototype.formInitEvent;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._formGroup;
    /** @type {?} */
    AjfFormRendererService.prototype.formGroup;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._form;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._nodes;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._flatNodes;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._flatNodesTree;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._nodesUpdates;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._errorPositions;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._errors;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._formGroupSubscription;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._valueChanged;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._nodesMaps;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._nextSlideTrigger;
    /** @type {?} */
    AjfFormRendererService.prototype.nextSlideTrigger;
    /**
     * @type {?}
     * @private
     */
    AjfFormRendererService.prototype._slidesNum;
    /** @type {?} */
    AjfFormRendererService.prototype.slidesNum;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF1QkEsT0FBTyxFQUFDLFFBQVEsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3pDLE9BQU8sRUFBQyxZQUFZLEVBQUUsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBQ3ZELE9BQU8sRUFBa0IsV0FBVyxFQUFFLFNBQVMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sS0FBSyxPQUFPLE1BQU0sU0FBUyxDQUFDO0FBQ25DLE9BQU8sRUFDTCxlQUFlLEVBQ2YsSUFBSSxFQUNKLFVBQVUsRUFDVixFQUFFLElBQUksS0FBSyxFQUNYLE9BQU8sRUFFUCxZQUFZLEVBQ1osS0FBSyxFQUNOLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFlBQVksRUFDWixNQUFNLEVBQ04sR0FBRyxFQUNILFFBQVEsRUFDUixhQUFhLEVBQ2IsUUFBUSxFQUNSLElBQUksRUFDSixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxjQUFjLEVBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQVN4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFVM0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBT3hELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHlEQUF5RCxDQUFDO0FBQ25HLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxN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SUFFM0QsNENBQXVEOzs7OztJQUV2RCxtREFBK0Y7O0lBQy9GLGtEQUErRjs7Ozs7SUFFL0YsNENBQTZFOztJQUM3RSwyQ0FBd0UiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgZXNwcmltYSBmcm9tICdlc3ByaW1hJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZnJvbSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YgYXMgb2JzT2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmliZXIsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGltZXJcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZWJvdW5jZVRpbWUsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBwYWlyd2lzZSxcbiAgcHVibGlzaFJlcGxheSxcbiAgcmVmQ291bnQsXG4gIHNjYW4sXG4gIHNoYXJlLFxuICBzdGFydFdpdGgsXG4gIHN3aXRjaE1hcCxcbiAgd2l0aExhdGVzdEZyb21cbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlXG59IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRm9ybXVsYUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZm9ybXVsYS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy90YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkVtcHR5RmllbGR9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9lbXB0eS1maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZVxufSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cH0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS1ncm91cCc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbn0gZnJvbSAnLi9pbnRlcmZhY2Uvb3BlcmF0aW9ucy9ub2Rlcy1pbnN0YW5jZXMtb3BlcmF0aW9uJztcbmltcG9ydCB7QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL29wZXJhdGlvbnMvcmVuZGVyZXItdXBkYXRlLW1hcC1vcGVyYXRpb24nO1xuaW1wb3J0IHtBamZSZW5kZXJlclVwZGF0ZU1hcH0gZnJvbSAnLi9pbnRlcmZhY2UvcmVuZGVyZXItbWFwcy91cGRhdGUtbWFwJztcbmltcG9ydCB7QWpmQmFzZVNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvYmFzZS1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2luaXRDaG9pY2VzT3JpZ2lufSBmcm9tICcuL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7aXNUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy9pcy10YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWVsZC1pbnN0YW5jZS1zdGF0ZSc7XG5pbXBvcnQge3VwZGF0ZUZpbHRlcmVkQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWx0ZXJlZC1jaG9pY2VzJztcbmltcG9ydCB7dXBkYXRlRm9ybXVsYX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1mb3JtdWxhJztcbmltcG9ydCB7dXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9ufSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLW5leHQtc2xpZGUtY29uZGl0aW9uJztcbmltcG9ydCB7dXBkYXRlVHJpZ2dlckNvbmRpdGlvbnN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdHJpZ2dlci1jb25kaXRpb25zJztcbmltcG9ydCB7dXBkYXRlVmFsaWRhdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS12YWxpZGF0aW9uJztcbmltcG9ydCB7dXBkYXRlV2FybmluZ30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS13YXJuaW5nJztcbmltcG9ydCB7Y3JlYXRlRmllbGR9IGZyb20gJy4vdXRpbHMvZmllbGRzL2NyZWF0ZS1maWVsZCc7XG5pbXBvcnQge2lzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMvaXMtY3VzdG9tLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMvaXMtZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzSW5zdGFuY2VzfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcyc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc0luc3RhbmNlc1RyZWV9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2ZsYXR0ZW4tbm9kZXMtaW5zdGFuY2VzLXRyZWUnO1xuaW1wb3J0IHtpc0ZpZWxkSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7aXNOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlc0luc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1zbGlkZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZVN1ZmZpeH0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1zdWZmaXgnO1xuaW1wb3J0IHtub2RlVG9Ob2RlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS1jb25kaXRpb25hbC1icmFuY2hlcyc7XG5pbXBvcnQge3VwZGF0ZVZpc2liaWxpdHl9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS12aXNpYmlsaXR5JztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzfSBmcm9tICcuL3V0aWxzL25vZGVzL2ZsYXR0ZW4tbm9kZXMnO1xuaW1wb3J0IHtpc0NvbnRhaW5lck5vZGV9IGZyb20gJy4vdXRpbHMvbm9kZXMvaXMtY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGV9IGZyb20gJy4vdXRpbHMvbm9kZXMvaXMtcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7b3JkZXJlZE5vZGVzfSBmcm9tICcuL3V0aWxzL25vZGVzL29yZGVyZWQtbm9kZXMnO1xuaW1wb3J0IHt1cGRhdGVSZXBzTnVtfSBmcm9tICcuL3V0aWxzL3NsaWRlcy1pbnN0YW5jZXMvdXBkYXRlLXJlcHMtbnVtJztcbmltcG9ydCB7dmFsaWRTbGlkZX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3ZhbGlkLXNsaWRlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvblNlcnZpY2V9IGZyb20gJy4vdmFsaWRhdGlvbi1zZXJ2aWNlJztcblxuY29uc3QgZXNwcmltYU1vZDogYW55ID0gKGVzcHJpbWEgYXMgYW55KS5kZWZhdWx0IHx8IGVzcHJpbWE7XG5jb25zdCB7dG9rZW5pemV9ID0gZXNwcmltYU1vZDtcblxuZXhwb3J0IGNvbnN0IGVudW0gQWpmRm9ybUluaXRTdGF0dXMge1xuICBJbml0aWFsaXppbmcsXG4gIENvbXBsZXRlXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9maWx0ZXJlZENob2ljZXNOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtSW5pdEV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUluaXRTdGF0dXM+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtSW5pdFN0YXR1cz4oKTtcbiAgcmVhZG9ubHkgZm9ybUluaXRFdmVudDogT2JzZXJ2YWJsZTxBamZGb3JtSW5pdFN0YXR1cz4gPSB0aGlzLl9mb3JtSW5pdEV2ZW50LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2Zvcm1Hcm91cDogQmVoYXZpb3JTdWJqZWN0PEZvcm1Hcm91cHxudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9ybUdyb3VwfG51bGw+KG51bGwpO1xuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8Rm9ybUdyb3VwfG51bGw+ID0gdGhpcy5fZm9ybUdyb3VwLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2Zvcm06IEJlaGF2aW9yU3ViamVjdDx7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fXxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PHtmb3JtOiBBamZGb3JtIHwgbnVsbCwgY29udGV4dD86IEFqZkNvbnRleHR9fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9ub2RlczogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2Rlc1RyZWU6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnM6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuICBwcml2YXRlIF9lcnJvcnM6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIF9mb3JtR3JvdXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9ub2Rlc01hcHM6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+W107XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlVHJpZ2dlcjogRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4oKTtcbiAgcmVhZG9ubHkgbmV4dFNsaWRlVHJpZ2dlcjogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2U+ID0gdGhpcy5fbmV4dFNsaWRlVHJpZ2dlci5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zbGlkZXNOdW06IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMuX3NsaWRlc051bS5hc09ic2VydmFibGUoKTtcblxuICBnZXQgbm9kZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2Rlc1RyZWU7XG4gIH1cbiAgZ2V0IGVycm9yUG9zaXRpb25zKCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JQb3NpdGlvbnM7XG4gIH1cbiAgZ2V0IGVycm9ycygpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XG4gIH1cbiAgZ2V0IGN1cnJlbnRTdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uZm9ybSAhPSBudWxsID8gZm9ybS5mb3JtLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMgOiBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXzogQWpmVmFsaWRhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLl9pbml0VXBkYXRlTWFwU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0RXJyb3JzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRGb3JtU3RyZWFtcygpO1xuICAgIHRoaXMuX3VwZGF0ZUZvcm1WYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICBzZXRGb3JtKGZvcm06IEFqZkZvcm18bnVsbCwgY29udGV4dDogQWpmQ29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5faW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTtcbiAgICBpZiAoZm9ybSAhPSBudWxsICYmIE9iamVjdC5rZXlzKGNvbnRleHQpLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICBPYmplY3Qua2V5cyhmb3JtLmluaXRDb250ZXh0IHx8IHt9KS5sZW5ndGggPiAwKSB7XG4gICAgICBjb250ZXh0ID0gZm9ybS5pbml0Q29udGV4dCB8fCB7fTtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudEZvcm0gPSB0aGlzLl9mb3JtLmdldFZhbHVlKCk7XG4gICAgaWYgKChjdXJyZW50Rm9ybSA9PSBudWxsICYmIGZvcm0gIT0gbnVsbCkgfHxcbiAgICAgICAgKGN1cnJlbnRGb3JtICE9IG51bGwgJiYgZm9ybSAhPT0gY3VycmVudEZvcm0uZm9ybSkpIHtcbiAgICAgIHRoaXMuX2Zvcm0ubmV4dCh7Zm9ybTogZm9ybSwgY29udGV4dDogY29udGV4dH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1WYWx1ZSgpOiBhbnkge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBsZXQgcmVzID0gZGVlcENvcHkoZm9ybUdyb3VwLnZhbHVlKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYWRkR3JvdXAoZ3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGlmIChncm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbWF4UmVwcyA9IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGlmIChtYXhSZXBzID4gMCAmJiBncm91cC5yZXBzICsgMSA+IG1heFJlcHMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRSZXBzID0gZ3JvdXAucmVwcztcbiAgICAgIGdyb3VwLnJlcHMgPSBncm91cC5yZXBzICsgMTtcbiAgICAgIGdyb3VwLmNhbkFkZCA9IGdyb3VwLm5vZGUubWF4UmVwcyA9PT0gMCB8fCBncm91cC5yZXBzIDwgZ3JvdXAubm9kZS5tYXhSZXBzO1xuICAgICAgZ3JvdXAuY2FuUmVtb3ZlID0gZ3JvdXAubm9kZS5taW5SZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPiBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMobm9kZXMsIHRydWUpO1xuICAgICAgICB0aGlzLl9hZGp1c3RSZXBzKGZsYXROb2RlcywgZ3JvdXAsIG9sZFJlcHMsIHRoaXMuZ2V0Rm9ybVZhbHVlKCkpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodHJ1ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVHcm91cChncm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2V8QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgaWYgKGdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBtaW5SZXBzID0gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgaWYgKGdyb3VwLnJlcHMgLSAxIDwgbWluUmVwcykge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFJlcHMgPSBncm91cC5yZXBzO1xuICAgICAgZ3JvdXAucmVwcyA9IGdyb3VwLnJlcHMgLSAxO1xuICAgICAgZ3JvdXAuY2FuQWRkID0gZ3JvdXAubm9kZS5tYXhSZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPCBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBncm91cC5jYW5SZW1vdmUgPSBncm91cC5ub2RlLm1pblJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA+IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgIHRoaXMuX2FkanVzdFJlcHMobm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJvbChmaWVsZDogQWpmRmllbGRJbnN0YW5jZSk6IE9ic2VydmFibGU8QWJzdHJhY3RDb250cm9sfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXAucGlwZShtYXAoKGYpID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZCk7XG4gICAgICByZXR1cm4gZiAhPSBudWxsICYmIGYuY29udGFpbnMoZmllbGROYW1lKSA/IGYuY29udHJvbHNbZmllbGROYW1lXSA6IG51bGw7XG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEVycm9yc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JQb3NpdGlvbnMgPSB0aGlzLl92YWx1ZUNoYW5nZWQucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fbm9kZXMsIHRoaXMuX2Zvcm0pLCBmaWx0ZXIodiA9PiB2WzJdICE9IG51bGwgJiYgdlsyXS5mb3JtICE9IG51bGwpLFxuICAgICAgICBtYXAoKHY6IFt2b2lkLCBBamZOb2RlSW5zdGFuY2VbXSwge2Zvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0PzogQWpmQ29udGV4dH18bnVsbF0pID0+IHtcbiAgICAgICAgICBjb25zdCBub2RlcyA9IHZbMV07XG4gICAgICAgICAgY29uc3QgZm9ybSA9IHZbMl0hLmZvcm0hO1xuICAgICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgICAgIGNvbnN0IGVycm9yczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgICAgICAgICBjb25zdCByc05vZGUgPSBub2RlIGFzIEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2U7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnNOb2RlLnJlcHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByc05vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoIXZhbGlkU2xpZGUocnNOb2RlLCBpKSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNOb2RlID0gbm9kZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICBpZiAoc05vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgIHNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIGlmICghc05vZGUudmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZm9ybS52YWxpZCA9IGVycm9ycy5sZW5ndGggPT0gMDtcbiAgICAgICAgICB0aGlzLl9zbGlkZXNOdW0ubmV4dChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICAgIH0pLFxuICAgICAgICBwdWJsaXNoUmVwbGF5KCksIHJlZkNvdW50KCkpO1xuICAgIHRoaXMuX2Vycm9ycyA9IHRoaXMuX2Vycm9yUG9zaXRpb25zLnBpcGUoXG4gICAgICAgIG1hcChlID0+IGUgIT0gbnVsbCA/IGUubGVuZ3RoIDogMCksIHN0YXJ0V2l0aCgwKSwgcHVibGlzaFJlcGxheSgpLCByZWZDb3VudCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICB9LCB7fSksIHN0YXJ0V2l0aDxBamZSZW5kZXJlclVwZGF0ZU1hcD4oe30pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fZm9ybXVsYU5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICB9LCB7fSksIHN0YXJ0V2l0aDxBamZSZW5kZXJlclVwZGF0ZU1hcD4oe30pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX3dhcm5pbmdOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9ub2Rlc01hcHMgPSBbXG4gICAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXAsIHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcCwgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcCxcbiAgICAgIHRoaXMuX2Zvcm11bGFOb2Rlc01hcCwgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwLCB0aGlzLl93YXJuaW5nTm9kZXNNYXAsXG4gICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXAsIHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwLFxuICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybVN0cmVhbXMoKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybU9icyA9IDxPYnNlcnZhYmxlPHtmb3JtOiBBamZGb3JtIHwgbnVsbCwgY29udGV4dD86IEFqZkNvbnRleHR9Pj50aGlzLl9mb3JtO1xuICAgIGZvcm1PYnNcbiAgICAgICAgLnBpcGUobWFwKChfZm9ybSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0Rm9ybUdyb3VwU3RyZWFtcyhuZXcgRm9ybUdyb3VwKHt9KSk7XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvcm1Hcm91cCk7XG4gICAgZm9ybU9ic1xuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcChmb3JtID0+IHtcbiAgICAgICAgICAgICAgaWYgKGZvcm0gPT0gbnVsbCB8fCBmb3JtLmZvcm0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYnNPZihmb3JtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjaG9pY2VzT3JpZ2lucyA9IGZvcm0uZm9ybS5jaG9pY2VzT3JpZ2lucyB8fCBbXTtcbiAgICAgICAgICAgICAgaWYgKGNob2ljZXNPcmlnaW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYnNPZihmb3JtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZnJvbShQcm9taXNlLmFsbChjaG9pY2VzT3JpZ2lucy5tYXAoY28gPT4gaW5pdENob2ljZXNPcmlnaW4oY28pKSkpXG4gICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICBtYXAoKCkgPT4gZm9ybSksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKGZvcm0pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIChfbm9kZXNJbnN0YW5jZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gZm9ybSAhPSBudWxsICYmIGZvcm0uZm9ybSAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYXR0ZW5Ob2Rlcyhmb3JtLmZvcm0ubm9kZXMpLCBmb3JtLmZvcm0ubm9kZXMsIHVuZGVmaW5lZCwgW10sXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNvbnRleHQgfHwge30pIDpcbiAgICAgICAgICAgICAgICAgICAgW107XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcnNOb2RlID0gbm9kZSBhcyBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzTm9kZS5yZXBzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcnNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNOb2RlID0gbm9kZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc05vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgIHNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXROb2RlSW5zdGFuY2UoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlLCBwcmVmaXg6IG51bWJlcltdLCBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgICAgYnJhbmNoVmlzaWJpbGl0eSA9IHRydWUpOiBBamZOb2RlSW5zdGFuY2V8bnVsbCB7XG4gICAgbGV0IGluc3RhbmNlID0gbm9kZVRvTm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgIGlmIChpbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBub2RlVHlwZSA9IGluc3RhbmNlLm5vZGUubm9kZVR5cGU7XG4gICAgICBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgdGhpcy5fZXhwbG9kZVJlcGVhdGluZ05vZGUoXG4gICAgICAgICAgICBhbGxOb2RlcywgaW5zdGFuY2UgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgIGNvbnN0IHNJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZlNsaWRlSW5zdGFuY2U7XG4gICAgICAgIHNJbnN0YW5jZS5ub2RlcyA9IHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgICAgICBhbGxOb2Rlcywgc0luc3RhbmNlLm5vZGUubm9kZXMsIHNJbnN0YW5jZS5ub2RlLmlkLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgICAgfVxuICAgICAgdXBkYXRlVmlzaWJpbGl0eShpbnN0YW5jZSwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIGlmIChub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmRmllbGQpIHtcbiAgICAgICAgY29uc3QgZkluc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcblxuICAgICAgICBpZiAoaXNDdXN0b21GaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSB8fCBpc0ZpZWxkV2l0aENob2ljZXMoZkluc3RhbmNlLm5vZGUpKSB7XG4gICAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKGZJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGlzVGFibGVGaWVsZEluc3RhbmNlKGZJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRmSW5zdGFuY2UgPSBmSW5zdGFuY2UgYXMgQWpmVGFibGVGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgY29uc3QgdE5vZGUgPSB0Zkluc3RhbmNlLm5vZGU7XG4gICAgICAgICAgICB0Zkluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0W25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZSh0Zkluc3RhbmNlKV0gfHwgY29udGV4dDtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IGNvbnRyb2xzV2l0aExhYmVsczogW3N0cmluZywgKHN0cmluZyB8IEZvcm1Db250cm9sKVtdXVtdID0gW107XG4gICAgICAgICAgICBjb250cm9sc1dpdGhMYWJlbHMucHVzaChbbm9kZS5sYWJlbCwgdE5vZGUuY29sdW1uTGFiZWxzXSk7XG4gICAgICAgICAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgdE5vZGUucm93cy5mb3JFYWNoKChyb3csIHJvd0lkeCkgPT4ge1xuICAgICAgICAgICAgICAgIGxldCByOiBGb3JtQ29udHJvbFtdID0gW107XG4gICAgICAgICAgICAgICAgKHJvdyBhcyBBamZUYWJsZUNlbGxbXSkuZm9yRWFjaCgoY2VsbCwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgZXZlcnkgY29udHJvbCBpcyByZWdpc3RlcmVkIHdpdGggdGhlIGNlbGwgcG9zaXRpb25cbiAgICAgICAgICAgICAgICAgIGluc2lkZSB0aGUgZm9ybSBjb250cm9sIG1hdHJpeFxuICAgICAgICAgICAgICAgICAgd2l0aCB0aGlzIG1hc2sgYCR7dE5vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YFxuICAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBgJHt0Tm9kZS5uYW1lfV9fJHtyb3dJZHh9X18ke2lkeH1gO1xuICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgICAgICAgICAgICAgICAgY29udHJvbC5zZXRWYWx1ZSh0Zkluc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXSk7XG4gICAgICAgICAgICAgICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKG5hbWUsIGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgci5wdXNoKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgLyogY3JlYXRlIGEgb2JqZWN0IHRoYXQgcmVzcGVjdCB0aGUgaW5zdGFuY2UgaW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgICB3aXRoIHRoZSBtaW5pbXVtIGRlZmluZWQgcHJvcGVydGllcyB0byBhbGxvdyB0byBydW4gYWRkVG9Ob2RlRm9ybXVsYSBtYXAqL1xuICAgICAgICAgICAgICAgICAgY29uc3QgZmFrZUluc3RhbmNlID0ge1xuICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogY2VsbC5mb3JtdWxhfSxcbiAgICAgICAgICAgICAgICAgICAgbm9kZToge25hbWUsIG5vZGVUeXBlOiAwLCBlZGl0YWJsZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFtdLFxuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEV2dDogbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpXG4gICAgICAgICAgICAgICAgICB9IGFzIHVua25vd24gYXMgQWpmTm9kZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0Zvcm11bGFNYXAoZmFrZUluc3RhbmNlLCBjZWxsLmZvcm11bGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xzV2l0aExhYmVscy5wdXNoKFt0Tm9kZS5yb3dMYWJlbHNbcm93SWR4XSwgcl0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGZJbnN0YW5jZS5jb250cm9scyA9IGNvbnRyb2xzV2l0aExhYmVscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZkluc3RhbmNlLnZhbHVlID0gY29udGV4dFtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlRmllbGRJbnN0YW5jZVN0YXRlKGZJbnN0YW5jZSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX2FkZE5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgfVxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkanVzdFJlcHMoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBpbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlLFxuICAgICAgb2xkUmVwczogbnVtYmVyLFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCk6IHthZGRlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbCwgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbH0ge1xuICAgIGNvbnN0IG5ld1JlcHMgPSBpbnN0YW5jZS5yZXBzO1xuICAgIGNvbnN0IHJlc3VsdDpcbiAgICAgICAge2FkZGVkOiBBamZOb2RlSW5zdGFuY2VbXXxudWxsLFxuICAgICAgICAgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbH0gPSB7YWRkZWQ6IG51bGwsIHJlbW92ZWQ6IG51bGx9O1xuICAgIGlmIChvbGRSZXBzIDwgbmV3UmVwcykge1xuICAgICAgY29uc3QgbmV3Tm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZXMgPT0gbnVsbCkge1xuICAgICAgICBpbnN0YW5jZS5ub2RlcyA9IFtdO1xuICAgICAgfVxuICAgICAgaWYgKGluc3RhbmNlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCkge1xuICAgICAgICBjb25zdCBub2RlID0gY3JlYXRlRmllbGQoe1xuICAgICAgICAgICAgICAgICAgICAgICBpZDogOTk5LFxuICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlOiBBamZGaWVsZFR5cGUuRW1wdHksXG4gICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBpbnN0YW5jZS5ub2RlLmxhYmVsXG4gICAgICAgICAgICAgICAgICAgICB9KSBhcyBBamZFbXB0eUZpZWxkO1xuICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9XG4gICAgICAgICAgICB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBpbnN0YW5jZS5wcmVmaXguc2xpY2UoMCksIGNvbnRleHQpO1xuICAgICAgICBpZiAobmV3SW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgICAgIGluc3RhbmNlLm5vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gb2xkUmVwczsgaSA8IG5ld1JlcHM7IGkrKykge1xuICAgICAgICBjb25zdCBwcmVmaXggPSBpbnN0YW5jZS5wcmVmaXguc2xpY2UoMCk7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gaW5zdGFuY2Uubm9kZTtcbiAgICAgICAgcHJlZml4LnB1c2goaSk7XG4gICAgICAgIG9yZGVyZWROb2Rlcyhncm91cC5ub2RlcywgaW5zdGFuY2Uubm9kZS5pZCkuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gdGhpcy5faW5pdE5vZGVJbnN0YW5jZShhbGxOb2RlcywgbiwgcHJlZml4LCBjb250ZXh0KTtcbiAgICAgICAgICBpZiAobmV3SW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICBpbnN0YW5jZS5ub2Rlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9hZGROb2RlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmFkZGVkID0gbmV3Tm9kZXM7XG4gICAgfSBlbHNlIGlmIChvbGRSZXBzID4gbmV3UmVwcykge1xuICAgICAgbGV0IG5vZGVzTnVtID0gaW5zdGFuY2Uubm9kZXMubGVuZ3RoIC8gb2xkUmVwcztcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXApIHtcbiAgICAgICAgbm9kZXNOdW0rKztcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5yZW1vdmVkID0gaW5zdGFuY2Uubm9kZXMuc3BsaWNlKG5ld1JlcHMgKiBub2Rlc051bSwgbm9kZXNOdW0pO1xuICAgICAgcmVzdWx0LnJlbW92ZWQuZm9yRWFjaCgobiA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZU5vZGVJbnN0YW5jZShuKTtcbiAgICAgIH0pKTtcbiAgICB9XG4gICAgaWYgKG9sZFJlcHMgIT0gbmV3UmVwcyAmJiBpbnN0YW5jZS5mb3JtdWxhUmVwcyA9PSBudWxsKSB7XG4gICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgY29uc3QgY29tcGxldGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKTtcbiAgICAgIGlmIChmZyAhPSBudWxsICYmIGZnLmNvbnRhaW5zKGNvbXBsZXRlTmFtZSkpIHtcbiAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShpbnN0YW5jZS5yZXBzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaW5zdGFuY2UuZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzSW5zdGFuY2VzKGluc3RhbmNlLm5vZGVzKTtcbiAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgIGNvbnN0IHJzSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlO1xuICAgICAgY29uc3Qgc2xpZGVOb2RlczogQWpmTm9kZUluc3RhbmNlW11bXSA9IFtdO1xuICAgICAgY29uc3Qgbm9kZXNQZXJTbGlkZSA9XG4gICAgICAgICAgcnNJbnN0YW5jZS5ub2RlcyAhPSBudWxsID8gcnNJbnN0YW5jZS5ub2Rlcy5sZW5ndGggLyByc0luc3RhbmNlLnJlcHMgOiAwO1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbnN0YW5jZS5yZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3RhcnROb2RlID0gaSAqIG5vZGVzUGVyU2xpZGU7XG4gICAgICAgIHNsaWRlTm9kZXMucHVzaChpbnN0YW5jZS5ub2Rlcy5zbGljZShzdGFydE5vZGUsIHN0YXJ0Tm9kZSArIG5vZGVzUGVyU2xpZGUpKTtcbiAgICAgIH1cbiAgICAgIHJzSW5zdGFuY2Uuc2xpZGVOb2RlcyA9IHNsaWRlTm9kZXM7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGb3JtVmFsdWVBbmRWYWxpZGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9mb3JtR3JvdXApLFxuICAgICAgICAgICAgZmlsdGVyKCh2YWx1ZXM6IFtBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbiwgRm9ybUdyb3VwfG51bGxdKSA9PiB2YWx1ZXNbMV0gIT09IG51bGwpKVxuICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZXM6IFtBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbiwgRm9ybUdyb3VwfG51bGxdKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybTogRm9ybUdyb3VwID0gPEZvcm1Hcm91cD52YWx1ZXNbMV07XG4gICAgICAgICAgZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXhwbG9kZVJlcGVhdGluZ05vZGUoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgICAgaW5zdGFuY2U6IEFqZk5vZGVHcm91cEluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UsIGNvbnRleHQ6IEFqZkNvbnRleHQpIHtcbiAgICBjb25zdCBvbGRSZXBzID0gdXBkYXRlUmVwc051bShpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgaWYgKG9sZFJlcHMgIT09IGluc3RhbmNlLnJlcHMpIHtcbiAgICAgIHRoaXMuX2FkanVzdFJlcHMoYWxsTm9kZXMsIGluc3RhbmNlLCBvbGRSZXBzLCBjb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlKFxuICAgICAgYWxsTm9kZXM6IEFqZk5vZGVbXXxBamZOb2RlSW5zdGFuY2VbXSwgbm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50OiBudW1iZXJ8bnVsbCA9IG51bGwsXG4gICAgICBwcmVmaXg6IG51bWJlcltdID0gW10sIGNvbnRleHQ6IEFqZkNvbnRleHQpOiBBamZOb2RlSW5zdGFuY2VbXSB7XG4gICAgbGV0IG5vZGVzSW5zdGFuY2VzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgIGNvbnN0IGN1clN1ZmZpeCA9IHByZWZpeC5sZW5ndGggPiAwID8gJ19fJyArIHByZWZpeC5qb2luKCdfXycpIDogJyc7XG4gICAgb3JkZXJlZE5vZGVzKG5vZGVzLCBwYXJlbnQpLmZvckVhY2goKG5vZGU6IEFqZk5vZGUpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudE5vZGVJbnN0YW5jZSA9IG5vZGVzSW5zdGFuY2VzLmZpbmQoXG4gICAgICAgICAgbmkgPT4gbmkubm9kZS5pZCA9PSBub2RlLnBhcmVudCAmJiBub2RlSW5zdGFuY2VTdWZmaXgobmkpID09IGN1clN1ZmZpeCk7XG4gICAgICBjb25zdCBicmFuY2hWaXNpYmlsaXR5ID0gcGFyZW50Tm9kZUluc3RhbmNlICE9IG51bGwgP1xuICAgICAgICAgIHBhcmVudE5vZGVJbnN0YW5jZS52ZXJpZmllZEJyYW5jaCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHBhcmVudE5vZGVJbnN0YW5jZS52ZXJpZmllZEJyYW5jaCA9PSBub2RlLnBhcmVudE5vZGUgOlxuICAgICAgICAgIHRydWU7XG4gICAgICBjb25zdCBubmkgPSB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBwcmVmaXgsIGNvbnRleHQsIGJyYW5jaFZpc2liaWxpdHkpO1xuICAgICAgaWYgKG5uaSAhPSBudWxsKSB7XG4gICAgICAgIG5vZGVzSW5zdGFuY2VzLnB1c2gobm5pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZXNJbnN0YW5jZXM7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtVmFsdWVEZWx0YShvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KTogc3RyaW5nW10ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhuZXdWYWx1ZSkuZmlsdGVyKChrKSA9PiBvbGRWYWx1ZVtrXSAhPT0gbmV3VmFsdWVba10pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZvcm1Hcm91cFN0cmVhbXMoZm9ybUdyb3VwOiBGb3JtR3JvdXApOiBGb3JtR3JvdXAge1xuICAgIHRoaXMuX2Zvcm1Hcm91cFN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIGxldCBpbml0ID0gdHJ1ZTtcbiAgICBsZXQgaW5pdEZvcm0gPSB0cnVlO1xuICAgIHRoaXMuX2Zvcm1Jbml0RXZlbnQuZW1pdChBamZGb3JtSW5pdFN0YXR1cy5Jbml0aWFsaXppbmcpO1xuICAgIHRoaXMuX2Zvcm1Hcm91cFN1YnNjcmlwdGlvbiA9XG4gICAgICAgIGZvcm1Hcm91cC52YWx1ZUNoYW5nZXNcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aDxhbnk+KHt9KSwgcGFpcndpc2UoKSwgZGVib3VuY2VUaW1lKDIwMCksXG4gICAgICAgICAgICAgICAgd2l0aExhdGVzdEZyb208XG4gICAgICAgICAgICAgICAgICAgIFthbnksIGFueV0sXG4gICAgICAgICAgICAgICAgICAgIFtcbiAgICAgICAgICAgICAgICAgICAgICBbYW55LCBhbnldLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICBBamZOb2RlSW5zdGFuY2VbXVxuICAgICAgICAgICAgICAgICAgICBdPiguLi4odGhpcy5fbm9kZXNNYXBzKSwgdGhpcy5fZmxhdE5vZGVzKSlcbiAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IFtcbiAgICAgICAgICAgICAgICAgICAgICAgICBbYW55LCBhbnldLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZOb2RlSW5zdGFuY2VbXVxuICAgICAgICAgICAgICAgICAgICAgICBdKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IG9sZEZvcm1WYWx1ZSA9IGluaXQgJiYge30gfHwgdlswXVswXTtcbiAgICAgICAgICAgICAgaW5pdCA9IGZhbHNlO1xuICAgICAgICAgICAgICBjb25zdCBuZXdGb3JtVmFsdWUgPSB2WzBdWzFdO1xuICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5TWFwID0gdlsxXTtcbiAgICAgICAgICAgICAgY29uc3QgcmVwZXRpdGlvbk1hcCA9IHZbMl07XG4gICAgICAgICAgICAgIGNvbnN0IGNvbmRpdGlvbmFsQnJhbmNoZXNNYXAgPSB2WzNdO1xuICAgICAgICAgICAgICBjb25zdCBmb3JtdWxhTWFwID0gdls0XTtcbiAgICAgICAgICAgICAgY29uc3QgdmFsaWRhdGlvbk1hcCA9IHZbNV07XG4gICAgICAgICAgICAgIGNvbnN0IHdhcm5pbmdNYXAgPSB2WzZdO1xuICAgICAgICAgICAgICBjb25zdCBuZXh0U2xpZGVDb25kaXRpb25zTWFwID0gdls3XTtcbiAgICAgICAgICAgICAgY29uc3QgZmlsdGVyZWRDaG9pY2VzTWFwID0gdls4XTtcbiAgICAgICAgICAgICAgY29uc3QgdHJpZ2dlckNvbmRpdGlvbnNNYXAgPSB2WzldO1xuICAgICAgICAgICAgICBjb25zdCBub2RlcyA9IHZbMTBdO1xuXG4gICAgICAgICAgICAgIC8vIHRha2VzIHRoZSBuYW1lcyBvZiB0aGUgZmllbGRzIHRoYXQgaGF2ZSBjaGFuZ2VkXG4gICAgICAgICAgICAgIGNvbnN0IGRlbHRhID0gdGhpcy5fZm9ybVZhbHVlRGVsdGEob2xkRm9ybVZhbHVlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICBjb25zdCBkZWx0YUxlbiA9IGRlbHRhLmxlbmd0aDtcbiAgICAgICAgICAgICAgbGV0IHVwZGF0ZWROb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcblxuICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgIGZvciBlYWNoIGZpZWxkIHVwZGF0ZSBhbGwgcHJvcGVydGllcyBtYXBcbiAgICAgICAgICAgICAgICB3aXRoIHRoZSBmb2xsb3dpbmcgcnVsZSAgXCJpZiBmaWVsZG5hbWUgaXMgaW4gbWFwIHVwZGF0ZSBpdFwiIGFuZFxuICAgICAgICAgICAgICAgIHB1c2ggb24gdXBkYXRlTm9kZXMgdGhlIG5vZGUgaW5zdGFuY2UgdGhhdCB3cmFwIGZpZWxkXG4gICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgIGRlbHRhLmZvckVhY2goKGZpZWxkTmFtZSkgPT4ge1xuICAgICAgICAgICAgICAgIHVwZGF0ZWROb2RlcyA9IHVwZGF0ZWROb2Rlcy5jb25jYXQoXG4gICAgICAgICAgICAgICAgICAgIG5vZGVzLmZpbHRlcihuID0+IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShuKSA9PT0gZmllbGROYW1lKSk7XG4gICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHlNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB2aXNpYmlsaXR5TWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBjb21wbGV0ZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eUNoYW5nZWQgPSB1cGRhdGVWaXNpYmlsaXR5KG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaXNGaWVsZCA9IGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eUNoYW5nZWQgJiYgIW5vZGVJbnN0YW5jZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgcyA9IHRpbWVyKDIwMCkuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHMgJiYgIXMuY2xvc2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUobnVsbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIChub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZSkudmFsdWUgPSBudWxsO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh2aXNpYmlsaXR5Q2hhbmdlZCAmJiBub2RlSW5zdGFuY2UudmlzaWJsZSAmJiBpc0ZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB1cGRhdGVGb3JtdWxhKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBudWxsICYmIHJlcy5jaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKHJlcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChyZXBldGl0aW9uTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgcmVwZXRpdGlvbk1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBybkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBvbGRSZXBzID0gdXBkYXRlUmVwc051bShybkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChvbGRSZXBzICE9PSBybkluc3RhbmNlLnJlcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2FkanVzdFJlcHMobm9kZXMsIHJuSW5zdGFuY2UsIG9sZFJlcHMsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChjb25kaXRpb25hbEJyYW5jaGVzTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlc01hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvLyBjb25zdCBicmFuY2hDaGFuZ2VkID0gbm9kZUluc3RhbmNlLnVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXMobmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIGlmIChicmFuY2hDaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZlcmlmaWVkQnJhbmNoID0gbm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoO1xuICAgICAgICAgICAgICAgICAgICBub2RlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChfY29uZGl0aW9uLCBpZHgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaWR4ID09IHZlcmlmaWVkQnJhbmNoKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9zaG93U3VidHJlZShuZXdGb3JtVmFsdWUsIG5vZGVzLCBub2RlSW5zdGFuY2UsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX2hpZGVTdWJ0cmVlKG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIG5vZGVJbnN0YW5jZSwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChmb3JtdWxhTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgZm9ybXVsYU1hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB1cGRhdGVGb3JtdWxhKGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBudWxsICYmIHJlcy5jaGFuZ2VkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVWYWxpZGF0aW9uKGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZnLmNvbnRyb2xzW25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpXS5zZXRWYWx1ZShyZXMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdGlvbk1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHZhbGlkYXRpb25NYXBbZmllbGROYW1lXS5mb3JFYWNoKChub2RlSW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgbmV3Rm9ybVZhbHVlLiR2YWx1ZSA9IG5ld0Zvcm1WYWx1ZVtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKV07XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmFsaWRhdGlvbihcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUsIHRoaXMuY3VycmVudFN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh3YXJuaW5nTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgd2FybmluZ01hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVXYXJuaW5nKGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZkluc3RhbmNlLndhcm5pbmdSZXN1bHRzICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZkluc3RhbmNlLndhcm5pbmdSZXN1bHRzLmZpbHRlcih3YXJuaW5nID0+IHdhcm5pbmcucmVzdWx0KS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZ1RyaWdnZXIuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFMZW4gPT0gMSAmJiBuZXh0U2xpZGVDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgaWYgKG5leHRTbGlkZUNvbmRpdGlvbnNNYXBbZmllbGROYW1lXVxuICAgICAgICAgICAgICAgICAgICAgICAgICAuZmlsdGVyKChub2RlSW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbihmSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX25leHRTbGlkZVRyaWdnZXIuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChmaWx0ZXJlZENob2ljZXNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBmaWx0ZXJlZENob2ljZXNNYXBbZmllbGROYW1lXS5mb3JFYWNoKChub2RlSW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlcyhmSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUZpbHRlcmVkQ2hvaWNlcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4sIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkZWx0YUxlbiA9PSAxICYmIHRyaWdnZXJDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgcmVzID0gdHJpZ2dlckNvbmRpdGlvbnNNYXBbZmllbGROYW1lXS5maWx0ZXIoKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoIWlzRmllbGRXaXRoQ2hvaWNlcyhmSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIHVwZGF0ZVRyaWdnZXJDb25kaXRpb25zKFxuICAgICAgICAgICAgICAgICAgICAgICAgZkluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+LCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICBpZiAocmVzLmxlbmd0aCA9PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIChyZXNbMF0gYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4pLnNlbGVjdGlvblRyaWdnZXIuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5mb3JFYWNoKG4gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVJZHggPSBub2Rlcy5pbmRleE9mKG4pO1xuICAgICAgICAgICAgICAgIGxldCBpZHggPSBub2RlSWR4IC0gMTtcbiAgICAgICAgICAgICAgICB3aGlsZSAoaWR4ID49IDApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IGN1ck5vZGUgPSBub2Rlc1tpZHhdO1xuICAgICAgICAgICAgICAgICAgaWYgKGlzU2xpZGVzSW5zdGFuY2UoY3VyTm9kZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpZGUgPSBjdXJOb2RlIGFzIChBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlIHwgQWpmU2xpZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk5vZGVzTnVtID0gc2xpZGUuZmxhdE5vZGVzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICAgICAgbGV0IHZhbGlkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzdWJOb2Rlc051bTsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViTm9kZSA9IHNsaWRlLmZsYXROb2Rlc1tpXTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoc3ViTm9kZS52aXNpYmxlICYmIGlzRmllbGRJbnN0YW5jZShzdWJOb2RlKSAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICAhKHN1Yk5vZGUgYXMgQWpmRmllbGRJbnN0YW5jZSkudmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhbGlkID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHNsaWRlLnZhbGlkICE9PSB2YWxpZCkge1xuICAgICAgICAgICAgICAgICAgICAgIHNsaWRlLnZhbGlkID0gdmFsaWQ7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgc2xpZGUudXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZHgtLTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbi51cGRhdGVkRXZ0LmVtaXQoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIGlmIChpbml0Rm9ybSkge1xuICAgICAgICAgICAgICAgIGluaXRGb3JtID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgdGhpcy5fZm9ybUluaXRFdmVudC5lbWl0KEFqZkZvcm1Jbml0U3RhdHVzLkNvbXBsZXRlKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB0aGlzLl92YWx1ZUNoYW5nZWQubmV4dCgpO1xuICAgICAgICAgICAgfSk7XG4gICAgcmV0dXJuIGZvcm1Hcm91cDtcbiAgfVxuXG4gIHByaXZhdGUgX3Nob3dTdWJ0cmVlKFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCwgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UsIGJyYW5jaD86IG51bWJlcikge1xuICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBub2RlLCB0cnVlLCBicmFuY2gpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZVN1YnRyZWUoXG4gICAgICBjb250ZXh0OiBBamZDb250ZXh0LCBub2RlczogQWpmTm9kZUluc3RhbmNlW10sIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSwgYnJhbmNoPzogbnVtYmVyKSB7XG4gICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG5vZGUsIGZhbHNlLCBicmFuY2gpO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoXG4gICAgICBjb250ZXh0OiBBamZDb250ZXh0LCBub2RlczogQWpmTm9kZUluc3RhbmNlW10sIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSwgdmlzaWJsZTogYm9vbGVhbixcbiAgICAgIGJyYW5jaD86IG51bWJlcikge1xuICAgIGxldCBzdWJOb2RlczogQWpmTm9kZUluc3RhbmNlW107XG4gICAgY29uc3Qgbm9kZVN1ZmZpeCA9IG5vZGVJbnN0YW5jZVN1ZmZpeChub2RlKTtcbiAgICBpZiAoYnJhbmNoICE9IG51bGwpIHtcbiAgICAgIHN1Yk5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4ge1xuICAgICAgICBjb25zdCBzdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobik7XG4gICAgICAgIHJldHVybiBzdWZmaXggPT0gbm9kZVN1ZmZpeCAmJiBuLm5vZGUucGFyZW50ID09IG5vZGUubm9kZS5pZCAmJiBuLm5vZGUucGFyZW50Tm9kZSA9PSBicmFuY2g7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3ViTm9kZXMgPSBub2Rlcy5maWx0ZXIobiA9PiB7XG4gICAgICAgIGNvbnN0IHN1ZmZpeCA9IG5vZGVJbnN0YW5jZVN1ZmZpeChuKTtcbiAgICAgICAgcmV0dXJuIHN1ZmZpeCA9PSBub2RlU3VmZml4ICYmIG4ubm9kZS5wYXJlbnQgPT0gbm9kZS5ub2RlLmlkO1xuICAgICAgfSk7XG4gICAgfVxuICAgIGNvbnN0IGlzQ29udGFpbmVyID0gaXNDb250YWluZXJOb2RlKG5vZGUubm9kZSk7XG4gICAgc3ViTm9kZXMuZm9yRWFjaCgobikgPT4ge1xuICAgICAgaWYgKCFpc0NvbnRhaW5lciB8fFxuICAgICAgICAgIChpc0NvbnRhaW5lciAmJiAoPEFqZk5vZGVHcm91cD5ub2RlLm5vZGUpLm5vZGVzLmZpbmQoY24gPT4gY24uaWQgPT0gbi5ub2RlLmlkKSA9PSBudWxsKSkge1xuICAgICAgICB1cGRhdGVWaXNpYmlsaXR5KG4sIGNvbnRleHQsIHZpc2libGUpO1xuICAgICAgICB1cGRhdGVGb3JtdWxhKG4gYXMgQWpmRm9ybXVsYUZpZWxkSW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2RlcywgbiwgdmlzaWJsZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZXNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX25vZGVzID1cbiAgICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLnBpcGUoc2Nhbigobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBvcDogQWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aobm9kZXMpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9LCBbXSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX2ZsYXROb2Rlc1RyZWUgPSB0aGlzLl9ub2Rlcy5waXBlKG1hcChub2RlcyA9PiBmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlKG5vZGVzKSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX2ZsYXROb2RlcyA9IHRoaXMuX2ZsYXROb2Rlc1RyZWUucGlwZShcbiAgICAgICAgbWFwKHNsaWRlcyA9PiB7XG4gICAgICAgICAgbGV0IG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgICAgICAgIHNsaWRlcy5mb3JFYWNoKHMgPT4ge1xuICAgICAgICAgICAgbm9kZXMucHVzaChzKTtcbiAgICAgICAgICAgIG5vZGVzID0gbm9kZXMuY29uY2F0KHMuZmxhdE5vZGVzKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICAgIH0pLFxuICAgICAgICBzaGFyZSgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IEFqZk5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1Zpc2liaWxpdHlNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNSZXBldGl0aW9uTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNGb3JtdWxhTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVmFsaWRhdGlvbk1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1dhcm5pbmdNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgaWYgKGlzU2xpZGVzSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX3JlbW92ZVNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZkJhc2VTbGlkZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVTbGlkZUluc3RhbmNlKHNsaWRlSW5zdGFuY2U6IEFqZkJhc2VTbGlkZUluc3RhbmNlKTogQWpmQmFzZVNsaWRlSW5zdGFuY2Uge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChzbGlkZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBzbGlkZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVHcm91cEluc3RhbmNlKG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpOlxuICAgICAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlR3JvdXAgPSBub2RlR3JvdXBJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChub2RlR3JvdXAudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBpZiAobm9kZUdyb3VwSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCAmJiBub2RlR3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZUdyb3VwSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGaWVsZEluc3RhbmNlKGZpZWxkSW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBmaWVsZEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZEluc3RhbmNlKTtcbiAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgZm9ybUdyb3VwLmNvbnRhaW5zKGZpZWxkSW5zdGFuY2VOYW1lKSkge1xuICAgICAgZm9ybUdyb3VwLnJlbW92ZUNvbnRyb2woZmllbGRJbnN0YW5jZU5hbWUpO1xuICAgIH1cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgZGVsZXRlIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGZpZWxkSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYSkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzRm9ybXVsYU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmZvcm11bGEuZm9ybXVsYSk7XG4gICAgfVxuXG4gICAgLy8gVE9ETzogY2hlY2sgdGhpcywgcHJvYmFibHkgaXMgbmV2ZXIgdmVyaWZpZWRcbiAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKGZpZWxkSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgIGNvbnN0IHJjSW5zdGFuY2UgPSAoZmllbGRJbnN0YW5jZSBhcyBBamZOb2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKTtcbiAgICAgIGlmIChyY0luc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChmaWVsZEluc3RhbmNlLCByY0luc3RhbmNlLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCAmJiBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmFsaWRhdGlvbk1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS53YXJuaW5nLmNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1dhcm5pbmdNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICAgICAgICBmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZmllbGRJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBmaWVsZEluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+O1xuICAgICAgaWYgKGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAoZmllbGRJbnN0YW5jZSwgZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlci5mb3JtdWxhKTtcbiAgICAgICAgaWYgKGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgICBmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGROb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpOiBBamZOb2RlSW5zdGFuY2Uge1xuICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZUluc3RhbmNlLm5vZGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc1NsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZFNsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZlNsaWRlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZGRGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkRmllbGRJbnN0YW5jZShmaWVsZEluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgY29uc3QgZmllbGRJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGRJbnN0YW5jZSk7XG4gICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmICFmb3JtR3JvdXAuY29udGFpbnMoZmllbGRJbnN0YW5jZU5hbWUpKSB7XG4gICAgICBjb25zdCBjb250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgICBjb250cm9sLnNldFZhbHVlKGZpZWxkSW5zdGFuY2UudmFsdWUpO1xuICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChmaWVsZEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgfVxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcy5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9IFtdO1xuICAgICAgICB9XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXS5pbmRleE9mKGZpZWxkSW5zdGFuY2UpID09IC0xKSB7XG4gICAgICAgICAgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV0ucHVzaChmaWVsZEluc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGZpZWxkSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGEpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNGb3JtdWxhTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYS5mb3JtdWxhKTtcbiAgICB9XG5cbiAgICBpZiAoaXNOb2RlR3JvdXBJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgY29uc3QgbmdJbnN0YW5jZSA9IGZpZWxkSW5zdGFuY2UgYXMgQWpmTm9kZUluc3RhbmNlIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlO1xuICAgICAgaWYgKG5nSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChmaWVsZEluc3RhbmNlLCBuZ0luc3RhbmNlLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCAmJiBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24uY29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1ZhbGlkYXRpb25NYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2Uud2FybmluZy5jb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzV2FybmluZ01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChcbiAgICAgICAgICBmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgIH1cblxuICAgIGlmIChpc0N1c3RvbUZpZWxkV2l0aENob2ljZXMoZmllbGRJbnN0YW5jZS5ub2RlKSB8fCBpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZShmaWVsZEluc3RhbmNlKSkge1xuICAgICAgY29uc3QgZndjSW5zdGFuY2UgPSBmaWVsZEluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+O1xuICAgICAgaWYgKGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKGZpZWxkSW5zdGFuY2UsIGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgICBpZiAoZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb246IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgICAgIHRoaXMuX2FkZFRvTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIGZpZWxkSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGRTbGlkZUluc3RhbmNlKHNsaWRlSW5zdGFuY2U6IEFqZlNsaWRlSW5zdGFuY2UpOiBBamZTbGlkZUluc3RhbmNlIHtcbiAgICBjb25zdCBzbGlkZSA9IHNsaWRlSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAoc2xpZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIHNsaWRlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGVHcm91cEluc3RhbmNlKG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpOlxuICAgICAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlR3JvdXAgPSBub2RlR3JvdXBJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChub2RlR3JvdXAudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgbm9kZUdyb3VwSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAobm9kZUdyb3VwSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgaWYgKG5vZGVHcm91cEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgIGlmIChub2RlR3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICBsZXQgbm9kZUdyb3VwSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVHcm91cEluc3RhbmNlKTtcbiAgICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiAhZm9ybUdyb3VwLmNvbnRhaW5zKG5vZGVHcm91cEluc3RhbmNlTmFtZSkpIHtcbiAgICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKG5vZGVHcm91cEluc3RhbmNlLnJlcHMpO1xuICAgICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKG5vZGVHcm91cEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlR3JvdXBJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVmlzaWJpbGl0eU1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzUmVwZXRpdGlvbk1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNGb3JtdWxhTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNWYWxpZGF0aW9uTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNXYXJuaW5nTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNGaWx0ZXJlZENob2ljZXNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNNYXBJbmRleChub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sIGluZGV4OiBzdHJpbmcpIHtcbiAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh2bWFwKS5pbmRleE9mKGluZGV4KSA+IC0xKSB7XG4gICAgICAgIGRlbGV0ZSB2bWFwW2luZGV4XTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB2bWFwO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOlxuICAgICAgdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzRm9ybXVsYU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNWYWxpZGF0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1dhcm5pbmdNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6XG4gICAgICB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTpcbiAgICAgIHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzTWFwKFxuICAgICAgbm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LCBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSxcbiAgICAgIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCB0b2tlbnMgPSB0b2tlbml6ZShmb3JtdWxhKS5maWx0ZXIoXG4gICAgICAgICh0b2tlbjogYW55KSA9PiB0b2tlbi50eXBlID09ICdJZGVudGlmaWVyJyAmJiB0b2tlbi52YWx1ZSAhPSAnJHZhbHVlJyk7XG4gICAgaWYgKHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgdG9rZW5zLmZvckVhY2goKHRva2VuOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgdG9rZW5OYW1lID0gdG9rZW4udmFsdWU7XG4gICAgICAgICAgaWYgKHZtYXBbdG9rZW5OYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB2bWFwW3Rva2VuTmFtZV0uaW5kZXhPZihub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICAgIHZtYXBbdG9rZW5OYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgaWYgKHZtYXBbdG9rZW5OYW1lXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB2bWFwW3Rva2VuTmFtZV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0Zvcm11bGFNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWYWxpZGF0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzV2FybmluZ01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc01hcChcbiAgICAgIG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiwgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgICBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgdG9rZW5zID0gdG9rZW5pemUoZm9ybXVsYSkuZmlsdGVyKFxuICAgICAgICAodG9rZW46IGFueSkgPT4gdG9rZW4udHlwZSA9PSAnSWRlbnRpZmllcicgJiYgdG9rZW4udmFsdWUgIT0gJyR2YWx1ZScpO1xuICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbjogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IHRva2VuTmFtZSA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgIGlmICh2bWFwW3Rva2VuTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgdm1hcFt0b2tlbk5hbWVdID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICh2bWFwW3Rva2VuTmFtZV0uaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgdm1hcFt0b2tlbk5hbWVdLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl19