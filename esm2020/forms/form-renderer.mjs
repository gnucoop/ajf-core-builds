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
import { updateEditability } from './utils/nodes-instances/update-editability';
import { updateVisibility } from './utils/nodes-instances/update-visibility';
import { flattenNodes } from './utils/nodes/flatten-nodes';
import { isContainerNode } from './utils/nodes/is-container-node';
import { isRepeatingContainerNode } from './utils/nodes/is-repeating-container-node';
import { orderedNodes } from './utils/nodes/ordered-nodes';
import { updateRepsNum } from './utils/slides-instances/update-reps-num';
import { validSlide } from './utils/slides-instances/valid-slide';
import { AjfValidationService } from './validation-service';
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
        this._editabilityNodesMap =
            this._editabilityNodesMapUpdates
                .pipe(scan((rmap, op) => {
                return op(rmap);
            }, {}), startWith({}), share());
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
            this._editabilityNodesMap, this._visibilityNodesMap, this._repetitionNodesMap,
            this._conditionalBranchNodesMap, this._formulaNodesMap, this._validationNodesMap,
            this._warningNodesMap, this._nextSlideConditionsNodesMap, this._filteredChoicesNodesMap,
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
                                    const type = tNode.columnTypes && tNode.columnTypes[idx] || 'number';
                                    const tableFormControl = { control: new FormControl(), show: false, type };
                                    const value = (tfInstance.context[cell.formula] && type === 'number') ?
                                        +tfInstance.context[cell.formula] :
                                        tfInstance.context[cell.formula];
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
                }
                updateFieldInstanceState(fInstance, context);
            }
            if (nodeType === AjfNodeType.AjfSlide) {
                updateEditability(instance, context);
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
                const orderedListNodes = orderedNodes(group.nodes, instance.node.id);
                orderedListNodes.forEach((n) => {
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
                delta.forEach((fieldName) => {
                    updatedNodes = updatedNodes.concat(nodes.filter(n => nodeInstanceCompleteName(n) === fieldName));
                    if (editability[fieldName] != null) {
                        editability[fieldName].forEach(nodeInstance => {
                            if (isSlideInstance(nodeInstance)) {
                                const slideInstance = nodeInstance;
                                updateEditability(slideInstance, newFormValue);
                            }
                        });
                    }
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
            this._removeNodesEditabilityMapIndex(nodeName);
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
AjfFormRendererService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormRendererService, deps: [{ token: i1.AjfValidationService }], target: i0.ɵɵFactoryTarget.Injectable });
AjfFormRendererService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormRendererService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFormRendererService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: i1.AjfValidationService }]; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQWtCLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ2pDLE9BQU8sRUFDTCxlQUFlLEVBQ2YsSUFBSSxFQUNKLFVBQVUsRUFDVixFQUFFLElBQUksS0FBSyxFQUNYLE9BQU8sRUFFUCxZQUFZLEVBQ1osS0FBSyxFQUNOLE1BQU0sTUFBTSxDQUFDO0FBQ2QsT0FBTyxFQUNMLFlBQVksRUFDWixNQUFNLEVBQ04sR0FBRyxFQUNILFFBQVEsRUFDUixhQUFhLEVBQ2IsUUFBUSxFQUNSLElBQUksRUFDSixLQUFLLEVBQ0wsU0FBUyxFQUNULFNBQVMsRUFDVCxjQUFjLEVBQ2YsTUFBTSxnQkFBZ0IsQ0FBQztBQVN4QixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFXM0QsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDZCQUE2QixDQUFDO0FBT3hELE9BQU8sRUFBQyxpQkFBaUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQywwQkFBMEIsRUFBQyxNQUFNLHlEQUF5RCxDQUFDO0FBQ25HLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBQzlGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3ZG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QUFNLEdBQUcsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sQ0FDakMsQ0FBQyxLQUFVLEVBQUUsRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLElBQUksWUFBWSxJQUFJLEtBQUssQ0FBQyxLQUFLLElBQUksUUFBUSxDQUFDLENBQUM7UUFDM0UsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtZQUNyQixRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBMEIsRUFBd0IsRUFBRTtnQkFDakUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQVUsRUFBRSxFQUFFO29CQUM1QixJQUFJLFNBQVMsR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO29CQUM1QixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxJQUFJLEVBQUU7d0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLENBQUM7cUJBQ3RCO29CQUNELElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTt3QkFDaEQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztxQkFDcEM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsT0FBTyxJQUFJLENBQUM7WUFDZCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQzs7MkhBM3hDVSxzQkFBc0I7K0hBQXRCLHNCQUFzQjttR0FBdEIsc0JBQXNCO2tCQURsQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgQWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7dG9rZW5pemV9IGZyb20gJ2VzcHJpbWEnO1xuaW1wb3J0IHtcbiAgQmVoYXZpb3JTdWJqZWN0LFxuICBmcm9tLFxuICBPYnNlcnZhYmxlLFxuICBvZiBhcyBvYnNPZixcbiAgU3ViamVjdCxcbiAgU3Vic2NyaWJlcixcbiAgU3Vic2NyaXB0aW9uLFxuICB0aW1lclxufSBmcm9tICdyeGpzJztcbmltcG9ydCB7XG4gIGRlYm91bmNlVGltZSxcbiAgZmlsdGVyLFxuICBtYXAsXG4gIHBhaXJ3aXNlLFxuICBwdWJsaXNoUmVwbGF5LFxuICByZWZDb3VudCxcbiAgc2NhbixcbiAgc2hhcmUsXG4gIHN0YXJ0V2l0aCxcbiAgc3dpdGNoTWFwLFxuICB3aXRoTGF0ZXN0RnJvbVxufSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2Vcbn0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGb3JtdWxhRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9mb3JtdWxhLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL3RhYmxlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRW1wdHlGaWVsZH0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2VtcHR5LWZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL3RhYmxlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvZm9ybSc7XG5pbXBvcnQge0FqZlRhYmxlRm9ybUNvbnRyb2x9IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL3RhYmxlLWZvcm0tY29udHJvbCc7XG5pbXBvcnQge0FqZk5vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlXG59IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctY29udGFpbmVyLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy9ub2RlJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy9ub2RlLWdyb3VwJztcbmltcG9ydCB7QWpmTm9kZVR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUtdHlwZSc7XG5pbXBvcnQge0FqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9ufSBmcm9tICcuL2ludGVyZmFjZS9vcGVyYXRpb25zL25vZGVzLWluc3RhbmNlcy1vcGVyYXRpb24nO1xuaW1wb3J0IHtBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbn0gZnJvbSAnLi9pbnRlcmZhY2Uvb3BlcmF0aW9ucy9yZW5kZXJlci11cGRhdGUtbWFwLW9wZXJhdGlvbic7XG5pbXBvcnQge0FqZlJlbmRlcmVyVXBkYXRlTWFwfSBmcm9tICcuL2ludGVyZmFjZS9yZW5kZXJlci1tYXBzL3VwZGF0ZS1tYXAnO1xuaW1wb3J0IHtBamZCYXNlU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9iYXNlLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3NsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7aW5pdENob2ljZXNPcmlnaW59IGZyb20gJy4vdXRpbHMvY2hvaWNlcy9pbml0LWNob2ljZXMtb3JpZ2luJztcbmltcG9ydCB7aXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy9pcy1maWVsZC13aXRoLWNob2ljZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1RhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL2lzLXRhYmxlLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7dXBkYXRlRmllbGRJbnN0YW5jZVN0YXRlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLWZpZWxkLWluc3RhbmNlLXN0YXRlJztcbmltcG9ydCB7dXBkYXRlRmlsdGVyZWRDaG9pY2VzfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLWZpbHRlcmVkLWNob2ljZXMnO1xuaW1wb3J0IHt1cGRhdGVGb3JtdWxhfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLWZvcm11bGEnO1xuaW1wb3J0IHt1cGRhdGVOZXh0U2xpZGVDb25kaXRpb259IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtbmV4dC1zbGlkZS1jb25kaXRpb24nO1xuaW1wb3J0IHt1cGRhdGVUcmlnZ2VyQ29uZGl0aW9uc30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS10cmlnZ2VyLWNvbmRpdGlvbnMnO1xuaW1wb3J0IHt1cGRhdGVWYWxpZGF0aW9ufSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLXZhbGlkYXRpb24nO1xuaW1wb3J0IHt1cGRhdGVXYXJuaW5nfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLXdhcm5pbmcnO1xuaW1wb3J0IHtjcmVhdGVGaWVsZH0gZnJvbSAnLi91dGlscy9maWVsZHMvY3JlYXRlLWZpZWxkJztcbmltcG9ydCB7aXNDdXN0b21GaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy9pcy1jdXN0b20tZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7aXNGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy9pcy1maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXNJbnN0YW5jZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2ZsYXR0ZW4tbm9kZXMtaW5zdGFuY2VzJztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzSW5zdGFuY2VzVHJlZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMtdHJlZSc7XG5pbXBvcnQge2lzRmllbGRJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc05vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7aXNTbGlkZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2lzU2xpZGVzSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXNsaWRlcy1pbnN0YW5jZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcbmltcG9ydCB7bm9kZUluc3RhbmNlU3VmZml4fSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLXN1ZmZpeCc7XG5pbXBvcnQge25vZGVUb05vZGVJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS10by1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7dXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlc30gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvdXBkYXRlLWNvbmRpdGlvbmFsLWJyYW5jaGVzJztcbmltcG9ydCB7dXBkYXRlRWRpdGFiaWxpdHl9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS1lZGl0YWJpbGl0eSc7XG5pbXBvcnQge3VwZGF0ZVZpc2liaWxpdHl9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS12aXNpYmlsaXR5JztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzfSBmcm9tICcuL3V0aWxzL25vZGVzL2ZsYXR0ZW4tbm9kZXMnO1xuaW1wb3J0IHtpc0NvbnRhaW5lck5vZGV9IGZyb20gJy4vdXRpbHMvbm9kZXMvaXMtY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGV9IGZyb20gJy4vdXRpbHMvbm9kZXMvaXMtcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7b3JkZXJlZE5vZGVzfSBmcm9tICcuL3V0aWxzL25vZGVzL29yZGVyZWQtbm9kZXMnO1xuaW1wb3J0IHt1cGRhdGVSZXBzTnVtfSBmcm9tICcuL3V0aWxzL3NsaWRlcy1pbnN0YW5jZXMvdXBkYXRlLXJlcHMtbnVtJztcbmltcG9ydCB7dmFsaWRTbGlkZX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3ZhbGlkLXNsaWRlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvblNlcnZpY2V9IGZyb20gJy4vdmFsaWRhdGlvbi1zZXJ2aWNlJztcblxuZXhwb3J0IGNvbnN0IGVudW0gQWpmRm9ybUluaXRTdGF0dXMge1xuICBJbml0aWFsaXppbmcsXG4gIENvbXBsZXRlXG59XG5cbmNvbnN0IHVwZGF0ZVNsaWRlVmFsaWRpdHkgPSAoc2xpZGU6IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V8QWpmU2xpZGVJbnN0YW5jZSkgPT4ge1xuICBjb25zdCBzdWJOb2Rlc051bSA9IHNsaWRlLmZsYXROb2Rlcy5sZW5ndGg7XG4gIGxldCB2YWxpZCA9IHRydWU7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViTm9kZXNOdW07IGkrKykge1xuICAgIGNvbnN0IHN1Yk5vZGUgPSBzbGlkZS5mbGF0Tm9kZXNbaV07XG4gICAgaWYgKHN1Yk5vZGUudmlzaWJsZSAmJiBpc0ZpZWxkSW5zdGFuY2Uoc3ViTm9kZSkgJiYgIShzdWJOb2RlIGFzIEFqZkZpZWxkSW5zdGFuY2UpLnZhbGlkKSB7XG4gICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG4gIGlmIChzbGlkZS52YWxpZCAhPT0gdmFsaWQpIHtcbiAgICBzbGlkZS52YWxpZCA9IHZhbGlkO1xuICB9XG59O1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmRm9ybVJlbmRlcmVyU2VydmljZSB7XG4gIHByaXZhdGUgX2VkaXRhYmlsaXR5Tm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9lZGl0YWJpbGl0eU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9maWx0ZXJlZENob2ljZXNOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtSW5pdEV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUluaXRTdGF0dXM+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtSW5pdFN0YXR1cz4oKTtcbiAgcmVhZG9ubHkgZm9ybUluaXRFdmVudDogT2JzZXJ2YWJsZTxBamZGb3JtSW5pdFN0YXR1cz4gPVxuICAgICAgdGhpcy5fZm9ybUluaXRFdmVudCBhcyBPYnNlcnZhYmxlPEFqZkZvcm1Jbml0U3RhdHVzPjtcblxuICBwcml2YXRlIF9mb3JtR3JvdXA6IEJlaGF2aW9yU3ViamVjdDxGb3JtR3JvdXB8bnVsbD4gPSBuZXcgQmVoYXZpb3JTdWJqZWN0PEZvcm1Hcm91cHxudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZm9ybUdyb3VwOiBPYnNlcnZhYmxlPEZvcm1Hcm91cHxudWxsPiA9IHRoaXMuX2Zvcm1Hcm91cCBhcyBPYnNlcnZhYmxlPEZvcm1Hcm91cHxudWxsPjtcblxuICBwcml2YXRlIF9mb3JtOiBCZWhhdmlvclN1YmplY3Q8e2Zvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0PzogQWpmQ29udGV4dH18bnVsbD4gPVxuICAgICAgbmV3IEJlaGF2aW9yU3ViamVjdDx7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fXxudWxsPihudWxsKTtcbiAgcHJpdmF0ZSBfbm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlW10+O1xuICBwcml2YXRlIF9mbGF0Tm9kZXM6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlW10+O1xuICBwcml2YXRlIF9mbGF0Tm9kZXNUcmVlOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX25vZGVzVXBkYXRlczogU3ViamVjdDxBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24+KCk7XG4gIHByaXZhdGUgX2Vycm9yUG9zaXRpb25zOiBPYnNlcnZhYmxlPG51bWJlcltdPjtcbiAgcHJpdmF0ZSBfZXJyb3JzOiBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgcHJpdmF0ZSBfZm9ybUdyb3VwU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlZDogU3ViamVjdDx2b2lkPiA9IG5ldyBTdWJqZWN0PHZvaWQ+KCk7XG5cbiAgcHJpdmF0ZSBfbm9kZXNNYXBzOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPltdO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZVRyaWdnZXI6IEV2ZW50RW1pdHRlcjxBamZOb2RlSW5zdGFuY2U+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZOb2RlSW5zdGFuY2U+KCk7XG4gIHJlYWRvbmx5IG5leHRTbGlkZVRyaWdnZXI6IE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlPiA9XG4gICAgICB0aGlzLl9uZXh0U2xpZGVUcmlnZ2VyIGFzIE9ic2VydmFibGU8QWpmTm9kZUluc3RhbmNlPjtcblxuICBwcml2YXRlIF9zbGlkZXNOdW06IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMuX3NsaWRlc051bSBhcyBPYnNlcnZhYmxlPG51bWJlcj47XG5cbiAgZ2V0IG5vZGVzVHJlZSgpOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT4ge1xuICAgIHJldHVybiB0aGlzLl9mbGF0Tm9kZXNUcmVlO1xuICB9XG4gIGdldCBlcnJvclBvc2l0aW9ucygpOiBPYnNlcnZhYmxlPG51bWJlcltdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2Vycm9yUG9zaXRpb25zO1xuICB9XG4gIGdldCBlcnJvcnMoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JzO1xuICB9XG4gIGdldCBjdXJyZW50U3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucygpOiBhbnkge1xuICAgIGNvbnN0IGZvcm0gPSB0aGlzLl9mb3JtLmdldFZhbHVlKCk7XG4gICAgcmV0dXJuIGZvcm0gIT0gbnVsbCAmJiBmb3JtLmZvcm0gIT0gbnVsbCA/IGZvcm0uZm9ybS5zdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zIDogbnVsbDtcbiAgfVxuXG4gIGNvbnN0cnVjdG9yKF86IEFqZlZhbGlkYXRpb25TZXJ2aWNlKSB7XG4gICAgdGhpcy5faW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Tm9kZXNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEVycm9yc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0Rm9ybVN0cmVhbXMoKTtcbiAgICB0aGlzLl91cGRhdGVGb3JtVmFsdWVBbmRWYWxpZGl0eSgpO1xuICB9XG5cbiAgc2V0Rm9ybShmb3JtOiBBamZGb3JtfG51bGwsIGNvbnRleHQ6IEFqZkNvbnRleHQgPSB7fSkge1xuICAgIHRoaXMuX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk7XG4gICAgaWYgKGZvcm0gIT0gbnVsbCAmJiBPYmplY3Qua2V5cyhjb250ZXh0KS5sZW5ndGggPT09IDAgJiZcbiAgICAgICAgT2JqZWN0LmtleXMoZm9ybS5pbml0Q29udGV4dCB8fCB7fSkubGVuZ3RoID4gMCkge1xuICAgICAgY29udGV4dCA9IGZvcm0uaW5pdENvbnRleHQgfHwge307XG4gICAgfVxuICAgIGNvbnN0IGN1cnJlbnRGb3JtID0gdGhpcy5fZm9ybS5nZXRWYWx1ZSgpO1xuICAgIGlmICgoY3VycmVudEZvcm0gPT0gbnVsbCAmJiBmb3JtICE9IG51bGwpIHx8XG4gICAgICAgIChjdXJyZW50Rm9ybSAhPSBudWxsICYmIGZvcm0gIT09IGN1cnJlbnRGb3JtLmZvcm0pKSB7XG4gICAgICB0aGlzLl9mb3JtLm5leHQoe2Zvcm06IGZvcm0sIGNvbnRleHQ6IGNvbnRleHR9KTtcbiAgICB9XG4gIH1cblxuICBnZXRGb3JtVmFsdWUoKTogYW55IHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBpZiAoZm9ybUdyb3VwID09IG51bGwpIHtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgbGV0IHJlcyA9IGRlZXBDb3B5KGZvcm1Hcm91cC52YWx1ZSk7XG4gICAgcmV0dXJuIHJlcztcbiAgfVxuXG4gIGFkZEdyb3VwKGdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZXxBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBpZiAoZ3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1heFJlcHMgPSBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBpZiAobWF4UmVwcyA+IDAgJiYgZ3JvdXAucmVwcyArIDEgPiBtYXhSZXBzKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkUmVwcyA9IGdyb3VwLnJlcHM7XG4gICAgICBncm91cC5yZXBzID0gZ3JvdXAucmVwcyArIDE7XG4gICAgICBncm91cC5jYW5BZGQgPSBncm91cC5ub2RlLm1heFJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA8IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGdyb3VwLmNhblJlbW92ZSA9IGdyb3VwLm5vZGUubWluUmVwcyA9PT0gMCB8fCBncm91cC5yZXBzID4gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgY29uc3QgZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzSW5zdGFuY2VzKG5vZGVzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhmbGF0Tm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlR3JvdXAoZ3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGlmIChncm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbWluUmVwcyA9IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIGlmIChncm91cC5yZXBzIC0gMSA8IG1pblJlcHMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRSZXBzID0gZ3JvdXAucmVwcztcbiAgICAgIGdyb3VwLnJlcHMgPSBncm91cC5yZXBzIC0gMTtcbiAgICAgIGdyb3VwLmNhbkFkZCA9IGdyb3VwLm5vZGUubWF4UmVwcyA9PT0gMCB8fCBncm91cC5yZXBzIDwgZ3JvdXAubm9kZS5tYXhSZXBzO1xuICAgICAgZ3JvdXAuY2FuUmVtb3ZlID0gZ3JvdXAubm9kZS5taW5SZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPiBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICB0aGlzLl9hZGp1c3RSZXBzKG5vZGVzLCBncm91cCwgb2xkUmVwcywgdGhpcy5nZXRGb3JtVmFsdWUoKSk7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dCh0cnVlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm4gbm9kZXM7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldENvbnRyb2woZmllbGQ6IEFqZkZpZWxkSW5zdGFuY2UpOiBPYnNlcnZhYmxlPEFic3RyYWN0Q29udHJvbHxudWxsPiB7XG4gICAgcmV0dXJuIHRoaXMuZm9ybUdyb3VwLnBpcGUobWFwKChmKSA9PiB7XG4gICAgICBjb25zdCBmaWVsZE5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGQpO1xuICAgICAgcmV0dXJuIGYgIT0gbnVsbCAmJiBmLmNvbnRhaW5zKGZpZWxkTmFtZSkgPyBmLmNvbnRyb2xzW2ZpZWxkTmFtZV0gOiBudWxsO1xuICAgIH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRFcnJvcnNTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX2Vycm9yUG9zaXRpb25zID0gdGhpcy5fdmFsdWVDaGFuZ2VkLnBpcGUoXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX25vZGVzLCB0aGlzLl9mb3JtKSxcbiAgICAgICAgZmlsdGVyKFxuICAgICAgICAgICAgKFtfLCBfXywgZm9ybV0pID0+IGZvcm0gIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgIChmb3JtIGFzIHtmb3JtOiBBamZGb3JtIHwgbnVsbCwgY29udGV4dD86IEFqZkNvbnRleHR9KS5mb3JtICE9IG51bGwpLFxuICAgICAgICBtYXAoKFtfLCBub2RlcywgZm9ybURlZl0pID0+IHtcbiAgICAgICAgICBjb25zdCBmb3JtID0gKGZvcm1EZWYgYXMge2Zvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0PzogQWpmQ29udGV4dH0pLmZvcm0gYXMgQWpmRm9ybTtcbiAgICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgICBjb25zdCBlcnJvcnM6IG51bWJlcltdID0gW107XG4gICAgICAgICAgKG5vZGVzIGFzIEFqZk5vZGVJbnN0YW5jZVtdKS5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgICAgICAgICBjb25zdCByc05vZGUgPSBub2RlIGFzIEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2U7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnNOb2RlLnJlcHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByc05vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoIXZhbGlkU2xpZGUocnNOb2RlLCBpKSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNOb2RlID0gbm9kZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICBpZiAoc05vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgIHNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIGlmICghc05vZGUudmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZm9ybS52YWxpZCA9IGVycm9ycy5sZW5ndGggPT0gMDtcbiAgICAgICAgICB0aGlzLl9zbGlkZXNOdW0ubmV4dChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICAgIH0pLFxuICAgICAgICBwdWJsaXNoUmVwbGF5KCksXG4gICAgICAgIHJlZkNvdW50KCksXG4gICAgKTtcbiAgICB0aGlzLl9lcnJvcnMgPSB0aGlzLl9lcnJvclBvc2l0aW9ucy5waXBlKFxuICAgICAgICBtYXAoZSA9PiBlICE9IG51bGwgPyBlLmxlbmd0aCA6IDApLFxuICAgICAgICBzdGFydFdpdGgoMCksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoKSxcbiAgICAgICAgcmVmQ291bnQoKSxcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge30pLFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSBhcyBBamZSZW5kZXJlclVwZGF0ZU1hcCksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSxcbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgIChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7fSksXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9IGFzIEFqZlJlbmRlcmVyVXBkYXRlTWFwKSxcbiAgICAgICAgICAgICAgICBzaGFyZSgpLFxuICAgICAgICAgICAgKTtcbiAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgIChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7fSksXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9IGFzIEFqZlJlbmRlcmVyVXBkYXRlTWFwKSxcbiAgICAgICAgICAgICAgICBzaGFyZSgpLFxuICAgICAgICAgICAgKTtcbiAgICB0aGlzLl9mb3JtdWxhTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzY2FuKFxuICAgICAgICAgICAgICAgICAgICAocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAge30pLFxuICAgICAgICAgICAgICAgIHN0YXJ0V2l0aCh7fSBhcyBBamZSZW5kZXJlclVwZGF0ZU1hcCksXG4gICAgICAgICAgICAgICAgc2hhcmUoKSxcbiAgICAgICAgICAgICk7XG4gICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuX3dhcm5pbmdOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgIChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7fSksXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9IGFzIEFqZlJlbmRlcmVyVXBkYXRlTWFwKSxcbiAgICAgICAgICAgICAgICBzaGFyZSgpLFxuICAgICAgICAgICAgKTtcbiAgICB0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc2NhbihcbiAgICAgICAgICAgICAgICAgICAgKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIHt9KSxcbiAgICAgICAgICAgICAgICBzdGFydFdpdGgoe30gYXMgQWpmUmVuZGVyZXJVcGRhdGVNYXApLFxuICAgICAgICAgICAgICAgIHNoYXJlKCksXG4gICAgICAgICAgICApO1xuICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgIHNjYW4oXG4gICAgICAgICAgICAgICAgICAgIChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICB7fSksXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9IGFzIEFqZlJlbmRlcmVyVXBkYXRlTWFwKSxcbiAgICAgICAgICAgICAgICBzaGFyZSgpLFxuICAgICAgICAgICAgKTtcblxuICAgIHRoaXMuX25vZGVzTWFwcyA9IFtcbiAgICAgIHRoaXMuX2VkaXRhYmlsaXR5Tm9kZXNNYXAsIHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcCwgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwLFxuICAgICAgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcCwgdGhpcy5fZm9ybXVsYU5vZGVzTWFwLCB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXAsXG4gICAgICB0aGlzLl93YXJuaW5nTm9kZXNNYXAsIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcCwgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXAsXG4gICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtU3RyZWFtcygpOiB2b2lkIHtcbiAgICBjb25zdCBmb3JtT2JzID0gdGhpcy5fZm9ybTtcbiAgICBmb3JtT2JzXG4gICAgICAgIC5waXBlKG1hcCgoX2Zvcm0pID0+IHtcbiAgICAgICAgICByZXR1cm4gdGhpcy5faW5pdEZvcm1Hcm91cFN0cmVhbXMobmV3IEZvcm1Hcm91cCh7fSkpO1xuICAgICAgICB9KSlcbiAgICAgICAgLnN1YnNjcmliZSh0aGlzLl9mb3JtR3JvdXApO1xuICAgIGZvcm1PYnNcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICBzd2l0Y2hNYXAoZm9ybSA9PiB7XG4gICAgICAgICAgICAgIGlmIChmb3JtID09IG51bGwgfHwgZm9ybS5mb3JtID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzT2YoZm9ybSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgY2hvaWNlc09yaWdpbnMgPSBmb3JtLmZvcm0uY2hvaWNlc09yaWdpbnMgfHwgW107XG4gICAgICAgICAgICAgIGlmIChjaG9pY2VzT3JpZ2lucy5sZW5ndGggPT09IDApIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gb2JzT2YoZm9ybSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIGZyb20oUHJvbWlzZS5hbGwoY2hvaWNlc09yaWdpbnMubWFwKGNvID0+IGluaXRDaG9pY2VzT3JpZ2luKGNvKSkpKVxuICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgbWFwKCgpID0+IGZvcm0pLFxuICAgICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgbWFwKChmb3JtRGVmKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAoX25vZGVzSW5zdGFuY2VzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgICAgICAgICBsZXQgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdO1xuICAgICAgICAgICAgICAgIGlmIChmb3JtRGVmICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgICAgICAgKGZvcm1EZWYgYXMge2Zvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0PzogQWpmQ29udGV4dH0pLmZvcm0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgZm9ybSA9IChmb3JtRGVmIGFzIHtmb3JtOiBBamZGb3JtLCBjb250ZXh0OiBBamZDb250ZXh0fSk7XG4gICAgICAgICAgICAgICAgICBjb25zdCBiYXNlTm9kZXMgPSBmb3JtLmZvcm0ubm9kZXM7XG4gICAgICAgICAgICAgICAgICBub2RlcyA9IHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgICAgICAgICAgICAgICAgZmxhdHRlbk5vZGVzKGJhc2VOb2RlcyksIGJhc2VOb2RlcywgdW5kZWZpbmVkLCBbXSwgZm9ybS5jb250ZXh0IHx8IHt9KTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbm9kZXMgPSBbXTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcnNOb2RlID0gbm9kZSBhcyBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzTm9kZS5yZXBzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcnNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNOb2RlID0gbm9kZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc05vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgIHNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXROb2RlSW5zdGFuY2UoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlLCBwcmVmaXg6IG51bWJlcltdLCBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgICAgYnJhbmNoVmlzaWJpbGl0eSA9IHRydWUpOiBBamZOb2RlSW5zdGFuY2V8bnVsbCB7XG4gICAgbGV0IGluc3RhbmNlID0gbm9kZVRvTm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgIGlmIChpbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBub2RlVHlwZSA9IGluc3RhbmNlLm5vZGUubm9kZVR5cGU7XG4gICAgICBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgdGhpcy5fZXhwbG9kZVJlcGVhdGluZ05vZGUoXG4gICAgICAgICAgICBhbGxOb2RlcywgaW5zdGFuY2UgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgIGNvbnN0IHNJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZlNsaWRlSW5zdGFuY2U7XG4gICAgICAgIHNJbnN0YW5jZS5ub2RlcyA9IHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgICAgICBhbGxOb2Rlcywgc0luc3RhbmNlLm5vZGUubm9kZXMsIHNJbnN0YW5jZS5ub2RlLmlkLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgICAgfVxuICAgICAgdXBkYXRlVmlzaWJpbGl0eShpbnN0YW5jZSwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIGlmIChub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmRmllbGQpIHtcbiAgICAgICAgY29uc3QgZkluc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcblxuICAgICAgICBpZiAoaXNDdXN0b21GaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSB8fCBpc0ZpZWxkV2l0aENob2ljZXMoZkluc3RhbmNlLm5vZGUpKSB7XG4gICAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKGZJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGlzVGFibGVGaWVsZEluc3RhbmNlKGZJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRmSW5zdGFuY2UgPSBmSW5zdGFuY2UgYXMgQWpmVGFibGVGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgY29uc3QgdE5vZGUgPSB0Zkluc3RhbmNlLm5vZGU7XG4gICAgICAgICAgICB0Zkluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0W25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZSh0Zkluc3RhbmNlKV0gfHwgY29udGV4dDtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IGNvbnRyb2xzV2l0aExhYmVsczogW3N0cmluZywgKHN0cmluZyB8IEFqZlRhYmxlRm9ybUNvbnRyb2wpW11dW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnRyb2xzV2l0aExhYmVscy5wdXNoKFtub2RlLmxhYmVsLCB0Tm9kZS5jb2x1bW5MYWJlbHNdKTtcbiAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgICB0Tm9kZS5yb3dzLmZvckVhY2goKHJvdywgcm93SWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHI6IEFqZlRhYmxlRm9ybUNvbnRyb2xbXSA9IFtdO1xuICAgICAgICAgICAgICAgIChyb3cgYXMgQWpmVGFibGVDZWxsW10pLmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgIGV2ZXJ5IGNvbnRyb2wgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBjZWxsIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICBpbnNpZGUgdGhlIGZvcm0gY29udHJvbCBtYXRyaXhcbiAgICAgICAgICAgICAgICAgIHdpdGggdGhpcyBtYXNrIGAke3ROb2RlLm5hbWV9X18ke3Jvd0lkeH1fXyR7aWR4fWBcbiAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYCR7dE5vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHR5cGUgPSB0Tm9kZS5jb2x1bW5UeXBlcyAmJiB0Tm9kZS5jb2x1bW5UeXBlc1tpZHhdIHx8ICdudW1iZXInO1xuICAgICAgICAgICAgICAgICAgY29uc3QgdGFibGVGb3JtQ29udHJvbDpcbiAgICAgICAgICAgICAgICAgICAgICBBamZUYWJsZUZvcm1Db250cm9sID0ge2NvbnRyb2w6IG5ldyBGb3JtQ29udHJvbCgpLCBzaG93OiBmYWxzZSwgdHlwZX07XG4gICAgICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9ICh0Zkluc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXSAmJiB0eXBlID09PSAnbnVtYmVyJykgP1xuICAgICAgICAgICAgICAgICAgICAgICt0Zkluc3RhbmNlLmNvbnRleHRbY2VsbC5mb3JtdWxhXSA6XG4gICAgICAgICAgICAgICAgICAgICAgdGZJbnN0YW5jZS5jb250ZXh0W2NlbGwuZm9ybXVsYV07XG4gICAgICAgICAgICAgICAgICB0YWJsZUZvcm1Db250cm9sLmNvbnRyb2wuc2V0VmFsdWUodmFsdWUpO1xuICAgICAgICAgICAgICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChuYW1lLCB0YWJsZUZvcm1Db250cm9sLmNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgci5wdXNoKHRhYmxlRm9ybUNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgLyogY3JlYXRlIGEgb2JqZWN0IHRoYXQgcmVzcGVjdCB0aGUgaW5zdGFuY2UgaW50ZXJmYWNlXG4gICAgICAgICAgICAgICAgICB3aXRoIHRoZSBtaW5pbXVtIGRlZmluZWQgcHJvcGVydGllcyB0byBhbGxvdyB0byBydW4gYWRkVG9Ob2RlRm9ybXVsYSBtYXAqL1xuICAgICAgICAgICAgICAgICAgY29uc3QgZmFrZUluc3RhbmNlID0ge1xuICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogY2VsbC5mb3JtdWxhfSxcbiAgICAgICAgICAgICAgICAgICAgbm9kZToge25hbWUsIG5vZGVUeXBlOiAwLCBlZGl0YWJsZTogZmFsc2V9LFxuICAgICAgICAgICAgICAgICAgICB2aXNpYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFtdLFxuICAgICAgICAgICAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzOiBbXSxcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEV2dDogbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpXG4gICAgICAgICAgICAgICAgICB9IGFzIHVua25vd24gYXMgQWpmTm9kZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0Zvcm11bGFNYXAoZmFrZUluc3RhbmNlLCBjZWxsLmZvcm11bGEpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGNvbnRyb2xzV2l0aExhYmVscy5wdXNoKFt0Tm9kZS5yb3dMYWJlbHNbcm93SWR4XSwgcl0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdGZJbnN0YW5jZS5jb250cm9scyA9IGNvbnRyb2xzV2l0aExhYmVscztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZkluc3RhbmNlLnZhbHVlID0gY29udGV4dFtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgdXBkYXRlRmllbGRJbnN0YW5jZVN0YXRlKGZJbnN0YW5jZSwgY29udGV4dCk7XG4gICAgICB9XG4gICAgICBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgIHVwZGF0ZUVkaXRhYmlsaXR5KGluc3RhbmNlIGFzIEFqZlNsaWRlSW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgfVxuICAgICAgdGhpcy5fYWRkTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgICB9XG4gICAgcmV0dXJuIGluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRqdXN0UmVwcyhcbiAgICAgIGFsbE5vZGVzOiBBamZOb2RlW118QWpmTm9kZUluc3RhbmNlW10sIGluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UsXG4gICAgICBvbGRSZXBzOiBudW1iZXIsXG4gICAgICBjb250ZXh0OiBBamZDb250ZXh0KToge2FkZGVkOiBBamZOb2RlSW5zdGFuY2VbXXxudWxsLCByZW1vdmVkOiBBamZOb2RlSW5zdGFuY2VbXXxudWxsfSB7XG4gICAgY29uc3QgbmV3UmVwcyA9IGluc3RhbmNlLnJlcHM7XG4gICAgY29uc3QgcmVzdWx0OiB7YWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdfG51bGwsXG4gICAgICAgICAgICAgICAgICAgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbH0gPSB7YWRkZWQ6IG51bGwsIHJlbW92ZWQ6IG51bGx9O1xuICAgIGlmIChvbGRSZXBzIDwgbmV3UmVwcykge1xuICAgICAgY29uc3QgbmV3Tm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZXMgPT0gbnVsbCkge1xuICAgICAgICBpbnN0YW5jZS5ub2RlcyA9IFtdO1xuICAgICAgfVxuICAgICAgaWYgKGluc3RhbmNlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCkge1xuICAgICAgICBjb25zdCBub2RlID0gY3JlYXRlRmllbGQoe1xuICAgICAgICAgICAgICAgICAgICAgICBpZDogOTk5LFxuICAgICAgICAgICAgICAgICAgICAgICBuYW1lOiAnJyxcbiAgICAgICAgICAgICAgICAgICAgICAgcGFyZW50OiAtMSxcbiAgICAgICAgICAgICAgICAgICAgICAgZmllbGRUeXBlOiBBamZGaWVsZFR5cGUuRW1wdHksXG4gICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBpbnN0YW5jZS5ub2RlLmxhYmVsXG4gICAgICAgICAgICAgICAgICAgICB9KSBhcyBBamZFbXB0eUZpZWxkO1xuICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9XG4gICAgICAgICAgICB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBpbnN0YW5jZS5wcmVmaXguc2xpY2UoMCksIGNvbnRleHQpO1xuICAgICAgICBpZiAobmV3SW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgICAgIGluc3RhbmNlLm5vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBmb3IgKGxldCBpID0gb2xkUmVwczsgaSA8IG5ld1JlcHM7IGkrKykge1xuICAgICAgICBjb25zdCBwcmVmaXggPSBpbnN0YW5jZS5wcmVmaXguc2xpY2UoMCk7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gaW5zdGFuY2Uubm9kZTtcbiAgICAgICAgcHJlZml4LnB1c2goaSk7XG4gICAgICAgIGNvbnN0IG9yZGVyZWRMaXN0Tm9kZXMgPSBvcmRlcmVkTm9kZXMoZ3JvdXAubm9kZXMsIGluc3RhbmNlLm5vZGUuaWQpO1xuICAgICAgICBvcmRlcmVkTGlzdE5vZGVzLmZvckVhY2goKG4pID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG4sIHByZWZpeCwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5ld05vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fYWRkTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5hZGRlZCA9IG5ld05vZGVzO1xuICAgIH0gZWxzZSBpZiAob2xkUmVwcyA+IG5ld1JlcHMpIHtcbiAgICAgIGxldCBub2Rlc051bSA9IGluc3RhbmNlLm5vZGVzLmxlbmd0aCAvIG9sZFJlcHM7XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIG5vZGVzTnVtKys7XG4gICAgICB9XG4gICAgICByZXN1bHQucmVtb3ZlZCA9IGluc3RhbmNlLm5vZGVzLnNwbGljZShuZXdSZXBzICogbm9kZXNOdW0sIG5vZGVzTnVtKTtcbiAgICAgIHJlc3VsdC5yZW1vdmVkLmZvckVhY2goKG4gPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVOb2RlSW5zdGFuY2Uobik7XG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChvbGRSZXBzICE9IG5ld1JlcHMgJiYgaW5zdGFuY2UuZm9ybXVsYVJlcHMgPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmcgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSk7XG4gICAgICBpZiAoZmcgIT0gbnVsbCAmJiBmZy5jb250YWlucyhjb21wbGV0ZU5hbWUpKSB7XG4gICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUoaW5zdGFuY2UucmVwcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGluc3RhbmNlLmZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlc0luc3RhbmNlcyhpbnN0YW5jZS5ub2Rlcyk7XG4gICAgaWYgKGluc3RhbmNlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICBjb25zdCByc0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgIGNvbnN0IHNsaWRlTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdW10gPSBbXTtcbiAgICAgIGNvbnN0IG5vZGVzUGVyU2xpZGUgPVxuICAgICAgICAgIHJzSW5zdGFuY2Uubm9kZXMgIT0gbnVsbCA/IHJzSW5zdGFuY2Uubm9kZXMubGVuZ3RoIC8gcnNJbnN0YW5jZS5yZXBzIDogMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2UucmVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0Tm9kZSA9IGkgKiBub2Rlc1BlclNsaWRlO1xuICAgICAgICBzbGlkZU5vZGVzLnB1c2goaW5zdGFuY2Uubm9kZXMuc2xpY2Uoc3RhcnROb2RlLCBzdGFydE5vZGUgKyBub2Rlc1BlclNsaWRlKSk7XG4gICAgICB9XG4gICAgICByc0luc3RhbmNlLnNsaWRlTm9kZXMgPSBzbGlkZU5vZGVzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRm9ybVZhbHVlQW5kVmFsaWRpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fZm9ybUdyb3VwKSxcbiAgICAgICAgICAgIGZpbHRlcigoW18sIGZnXSkgPT4gZmcgIT09IG51bGwpLFxuICAgICAgICAgICAgKVxuICAgICAgICAuc3Vic2NyaWJlKChbXywgZmddKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybSA9IGZnIGFzIEZvcm1Hcm91cDtcbiAgICAgICAgICBmb3JtLnVwZGF0ZVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgICAgICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9leHBsb2RlUmVwZWF0aW5nTm9kZShcbiAgICAgIGFsbE5vZGVzOiBBamZOb2RlW118QWpmTm9kZUluc3RhbmNlW10sXG4gICAgICBpbnN0YW5jZTogQWpmTm9kZUdyb3VwSW5zdGFuY2V8QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSwgY29udGV4dDogQWpmQ29udGV4dCkge1xuICAgIGNvbnN0IG9sZFJlcHMgPSB1cGRhdGVSZXBzTnVtKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICBpZiAob2xkUmVwcyAhPT0gaW5zdGFuY2UucmVwcykge1xuICAgICAgdGhpcy5fYWRqdXN0UmVwcyhhbGxOb2RlcywgaW5zdGFuY2UsIG9sZFJlcHMsIGNvbnRleHQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlczogQWpmTm9kZVtdLCBwYXJlbnQ6IG51bWJlcnxudWxsID0gbnVsbCxcbiAgICAgIHByZWZpeDogbnVtYmVyW10gPSBbXSwgY29udGV4dDogQWpmQ29udGV4dCk6IEFqZk5vZGVJbnN0YW5jZVtdIHtcbiAgICBsZXQgbm9kZXNJbnN0YW5jZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgY29uc3QgY3VyU3VmZml4ID0gcHJlZml4Lmxlbmd0aCA+IDAgPyAnX18nICsgcHJlZml4LmpvaW4oJ19fJykgOiAnJztcbiAgICBvcmRlcmVkTm9kZXMobm9kZXMsIHBhcmVudCkuZm9yRWFjaCgobm9kZTogQWpmTm9kZSkgPT4ge1xuICAgICAgY29uc3QgcGFyZW50Tm9kZUluc3RhbmNlID0gbm9kZXNJbnN0YW5jZXMuZmluZChcbiAgICAgICAgICBuaSA9PiBuaS5ub2RlLmlkID09IG5vZGUucGFyZW50ICYmIG5vZGVJbnN0YW5jZVN1ZmZpeChuaSkgPT0gY3VyU3VmZml4KTtcbiAgICAgIGNvbnN0IGJyYW5jaFZpc2liaWxpdHkgPSBwYXJlbnROb2RlSW5zdGFuY2UgIT0gbnVsbCA/XG4gICAgICAgICAgcGFyZW50Tm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoICE9IG51bGwgJiZcbiAgICAgICAgICAgICAgcGFyZW50Tm9kZUluc3RhbmNlLnZlcmlmaWVkQnJhbmNoID09IG5vZGUucGFyZW50Tm9kZSA6XG4gICAgICAgICAgdHJ1ZTtcbiAgICAgIGNvbnN0IG5uaSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG5vZGUsIHByZWZpeCwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgICBpZiAobm5pICE9IG51bGwpIHtcbiAgICAgICAgbm9kZXNJbnN0YW5jZXMucHVzaChubmkpO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBub2Rlc0luc3RhbmNlcztcbiAgfVxuXG4gIHByaXZhdGUgX2Zvcm1WYWx1ZURlbHRhKG9sZFZhbHVlOiBhbnksIG5ld1ZhbHVlOiBhbnkpOiBzdHJpbmdbXSB7XG4gICAgcmV0dXJuIE9iamVjdC5rZXlzKG5ld1ZhbHVlKS5maWx0ZXIoKGspID0+IG9sZFZhbHVlW2tdICE9PSBuZXdWYWx1ZVtrXSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybUdyb3VwU3RyZWFtcyhmb3JtR3JvdXA6IEZvcm1Hcm91cCk6IEZvcm1Hcm91cCB7XG4gICAgdGhpcy5fZm9ybUdyb3VwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgbGV0IGluaXQgPSB0cnVlO1xuICAgIGxldCBpbml0Rm9ybSA9IHRydWU7XG4gICAgdGhpcy5fZm9ybUluaXRFdmVudC5lbWl0KEFqZkZvcm1Jbml0U3RhdHVzLkluaXRpYWxpemluZyk7XG4gICAgdGhpcy5fZm9ybUdyb3VwU3Vic2NyaXB0aW9uID1cbiAgICAgICAgZm9ybUdyb3VwLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoKHt9IGFzIGFueSksXG4gICAgICAgICAgICAgICAgcGFpcndpc2UoKSxcbiAgICAgICAgICAgICAgICBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbTxcbiAgICAgICAgICAgICAgICAgICAgW2FueSwgYW55XSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIFthbnksIGFueV0sIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZOb2RlSW5zdGFuY2VbXVxuICAgICAgICAgICAgICAgICAgICBdPiguLi4odGhpcy5fbm9kZXNNYXBzKSwgdGhpcy5fZmxhdE5vZGVzKSxcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2FueSwgYW55XSwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZk5vZGVJbnN0YW5jZVtdXG4gICAgICAgICAgICAgICAgICAgICAgIF0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgb2xkRm9ybVZhbHVlID0gaW5pdCAmJiB7fSB8fCB2WzBdWzBdO1xuICAgICAgICAgICAgICBpbml0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld0Zvcm1WYWx1ZSA9IHZbMF1bMV07XG4gICAgICAgICAgICAgIGNvbnN0IGVkaXRhYmlsaXR5ID0gdlsxXTtcbiAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eU1hcCA9IHZbMl07XG4gICAgICAgICAgICAgIGNvbnN0IHJlcGV0aXRpb25NYXAgPSB2WzNdO1xuICAgICAgICAgICAgICBjb25zdCBjb25kaXRpb25hbEJyYW5jaGVzTWFwID0gdls0XTtcbiAgICAgICAgICAgICAgY29uc3QgZm9ybXVsYU1hcCA9IHZbNV07XG4gICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25NYXAgPSB2WzZdO1xuICAgICAgICAgICAgICBjb25zdCB3YXJuaW5nTWFwID0gdls3XTtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dFNsaWRlQ29uZGl0aW9uc01hcCA9IHZbOF07XG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hvaWNlc01hcCA9IHZbOV07XG4gICAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJDb25kaXRpb25zTWFwID0gdlsxMF07XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gdlsxMV07XG5cbiAgICAgICAgICAgICAgLy8gdGFrZXMgdGhlIG5hbWVzIG9mIHRoZSBmaWVsZHMgdGhhdCBoYXZlIGNoYW5nZWRcbiAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSB0aGlzLl9mb3JtVmFsdWVEZWx0YShvbGRGb3JtVmFsdWUsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGNvbnN0IGRlbHRhTGVuID0gZGVsdGEubGVuZ3RoO1xuICAgICAgICAgICAgICBsZXQgdXBkYXRlZE5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuXG4gICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgZm9yIGVhY2ggZmllbGQgdXBkYXRlIGFsbCBwcm9wZXJ0aWVzIG1hcFxuICAgICAgICAgICAgICAgIHdpdGggdGhlIGZvbGxvd2luZyBydWxlICBcImlmIGZpZWxkbmFtZSBpcyBpbiBtYXAgdXBkYXRlIGl0XCIgYW5kXG4gICAgICAgICAgICAgICAgcHVzaCBvbiB1cGRhdGVOb2RlcyB0aGUgbm9kZSBpbnN0YW5jZSB0aGF0IHdyYXAgZmllbGRcbiAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgZGVsdGEuZm9yRWFjaCgoZmllbGROYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzID0gdXBkYXRlZE5vZGVzLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZmlsdGVyKG4gPT4gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG4pID09PSBmaWVsZE5hbWUpKTtcbiAgICAgICAgICAgICAgICBpZiAoZWRpdGFiaWxpdHlbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBlZGl0YWJpbGl0eVtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2xpZGVJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZUVkaXRhYmlsaXR5KHNsaWRlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eU1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHlNYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hhbmdlZCA9IHVwZGF0ZVZpc2liaWxpdHkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0ZpZWxkID0gaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5Q2hhbmdlZCAmJiAhbm9kZUluc3RhbmNlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocyAmJiAhcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlKS52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZpc2liaWxpdHlDaGFuZ2VkICYmIG5vZGVJbnN0YW5jZS52aXNpYmxlICYmIGlzRmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUocmVzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcGV0aXRpb25NYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICByZXBldGl0aW9uTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJuSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZFJlcHMgPSB1cGRhdGVSZXBzTnVtKHJuSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFJlcHMgIT09IHJuSW5zdGFuY2UucmVwcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhub2Rlcywgcm5JbnN0YW5jZSwgb2xkUmVwcywgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbmRpdGlvbmFsQnJhbmNoZXNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGJyYW5jaENoYW5nZWQgPSBub2RlSW5zdGFuY2UudXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGJyYW5jaENoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVyaWZpZWRCcmFuY2ggPSBub2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2g7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKF9jb25kaXRpb24sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT0gdmVyaWZpZWRCcmFuY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dTdWJ0cmVlKG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIG5vZGVJbnN0YW5jZSwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZVN1YnRyZWUobmV3Rm9ybVZhbHVlLCBub2Rlcywgbm9kZUluc3RhbmNlLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm11bGFNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBmb3JtdWxhTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEoZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZhbGlkYXRpb24oZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmcuY29udHJvbHNbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSldLnNldFZhbHVlKHJlcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUuJHZhbHVlID0gbmV3Rm9ybVZhbHVlW25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpXTtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVWYWxpZGF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSwgdGhpcy5jdXJyZW50U3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHdhcm5pbmdNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVdhcm5pbmcoZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmSW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMuZmlsdGVyKHdhcm5pbmcgPT4gd2FybmluZy5yZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZS53YXJuaW5nVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkZWx0YUxlbiA9PSAxICYmIG5leHRTbGlkZUNvbmRpdGlvbnNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBpZiAobmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9uKGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmV4dFNsaWRlVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkQ2hvaWNlc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQ2hvaWNlc01hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhTGVuID09IDEgJiYgdHJpZ2dlckNvbmRpdGlvbnNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB0cmlnZ2VyQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdLmZpbHRlcigobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNGaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlVHJpZ2dlckNvbmRpdGlvbnMoXG4gICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4sIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKHJlc1swXSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55Pikuc2VsZWN0aW9uVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZUlkeCA9IG5vZGVzLmluZGV4T2Yobik7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IG5vZGVJZHggLSAxO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTm9kZSA9IG5vZGVzW2lkeF07XG4gICAgICAgICAgICAgICAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShjdXJOb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTbGlkZVZhbGlkaXR5KGN1ck5vZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICBjdXJOb2RlLnVwZGF0ZWRFdnQuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWR4LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG4udXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoaW5pdEZvcm0pIHtcbiAgICAgICAgICAgICAgICBpbml0Rm9ybSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1Jbml0RXZlbnQuZW1pdChBamZGb3JtSW5pdFN0YXR1cy5Db21wbGV0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VkLm5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIHJldHVybiBmb3JtR3JvdXA7XG4gIH1cblxuICBwcml2YXRlIF9zaG93U3VidHJlZShcbiAgICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgbm9kZTogQWpmTm9kZUluc3RhbmNlLCBicmFuY2g/OiBudW1iZXIpIHtcbiAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2Rlcywgbm9kZSwgdHJ1ZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVTdWJ0cmVlKFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCwgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UsIGJyYW5jaD86IG51bWJlcikge1xuICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBub2RlLCBmYWxzZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCwgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UsIHZpc2libGU6IGJvb2xlYW4sXG4gICAgICBicmFuY2g/OiBudW1iZXIpIHtcbiAgICBsZXQgc3ViTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdO1xuICAgIGNvbnN0IG5vZGVTdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobm9kZSk7XG4gICAgaWYgKGJyYW5jaCAhPSBudWxsKSB7XG4gICAgICBzdWJOb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG4pO1xuICAgICAgICByZXR1cm4gc3VmZml4ID09IG5vZGVTdWZmaXggJiYgbi5ub2RlLnBhcmVudCA9PSBub2RlLm5vZGUuaWQgJiYgbi5ub2RlLnBhcmVudE5vZGUgPT0gYnJhbmNoO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Yk5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4ge1xuICAgICAgICBjb25zdCBzdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobik7XG4gICAgICAgIHJldHVybiBzdWZmaXggPT0gbm9kZVN1ZmZpeCAmJiBuLm5vZGUucGFyZW50ID09IG5vZGUubm9kZS5pZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBpc0NvbnRhaW5lciA9IGlzQ29udGFpbmVyTm9kZShub2RlLm5vZGUpO1xuICAgIHN1Yk5vZGVzLmZvckVhY2goKG4pID0+IHtcbiAgICAgIGlmICghaXNDb250YWluZXIgfHxcbiAgICAgICAgICAoaXNDb250YWluZXIgJiYgKDxBamZOb2RlR3JvdXA+bm9kZS5ub2RlKS5ub2Rlcy5maW5kKGNuID0+IGNuLmlkID09IG4ubm9kZS5pZCkgPT0gbnVsbCkpIHtcbiAgICAgICAgdXBkYXRlVmlzaWJpbGl0eShuLCBjb250ZXh0LCB2aXNpYmxlKTtcbiAgICAgICAgdXBkYXRlRm9ybXVsYShuIGFzIEFqZkZvcm11bGFGaWVsZEluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG4sIHZpc2libGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9XG4gICAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5waXBlKHNjYW4oKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgb3A6IEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl9mbGF0Tm9kZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShtYXAobm9kZXMgPT4gZmxhdHRlbk5vZGVzSW5zdGFuY2VzVHJlZShub2RlcykpLCBzaGFyZSgpKTtcbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9mbGF0Tm9kZXNUcmVlLnBpcGUoXG4gICAgICAgIG1hcChzbGlkZXMgPT4ge1xuICAgICAgICAgIGxldCBub2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgIG5vZGVzLnB1c2gocyk7XG4gICAgICAgICAgICBub2RlcyA9IG5vZGVzLmNvbmNhdChzLmZsYXROb2Rlcyk7XG4gICAgICAgICAgICB1cGRhdGVTbGlkZVZhbGlkaXR5KHMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgfSksXG4gICAgICAgIHNoYXJlKCksXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IEFqZk5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1Zpc2liaWxpdHlNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNSZXBldGl0aW9uTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNGb3JtdWxhTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVmFsaWRhdGlvbk1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1dhcm5pbmdNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgaWYgKGlzU2xpZGVzSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlTm9kZXNFZGl0YWJpbGl0eU1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICAgIHJldHVybiB0aGlzLl9yZW1vdmVTbGlkZUluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZCYXNlU2xpZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZUluc3RhbmNlLm5vZGUpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVOb2RlR3JvdXBJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlU2xpZGVJbnN0YW5jZShzbGlkZUluc3RhbmNlOiBBamZCYXNlU2xpZGVJbnN0YW5jZSk6IEFqZkJhc2VTbGlkZUluc3RhbmNlIHtcbiAgICBjb25zdCBzbGlkZSA9IHNsaWRlSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAoc2xpZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKHNsaWRlSW5zdGFuY2UsIHNsaWRlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgc2xpZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKHNsaWRlSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNsaWRlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2RlR3JvdXBJbnN0YW5jZShub2RlR3JvdXBJbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKTpcbiAgICAgIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZUdyb3VwID0gbm9kZUdyb3VwSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAobm9kZUdyb3VwLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgaWYgKG5vZGVHcm91cEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwgJiYgbm9kZUdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGVHcm91cEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRmllbGRJbnN0YW5jZShmaWVsZEluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgY29uc3QgZmllbGRJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGRJbnN0YW5jZSk7XG4gICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmIGZvcm1Hcm91cC5jb250YWlucyhmaWVsZEluc3RhbmNlTmFtZSkpIHtcbiAgICAgIGZvcm1Hcm91cC5yZW1vdmVDb250cm9sKGZpZWxkSW5zdGFuY2VOYW1lKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIGRlbGV0ZSB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBmaWVsZEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGEpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0Zvcm11bGFNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhLmZvcm11bGEpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGNoZWNrIHRoaXMsIHByb2JhYmx5IGlzIG5ldmVyIHZlcmlmaWVkXG4gICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShmaWVsZEluc3RhbmNlLm5vZGUpKSB7XG4gICAgICBjb25zdCByY0luc3RhbmNlID0gKGZpZWxkSW5zdGFuY2UgYXMgQWpmTm9kZUluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk7XG4gICAgICBpZiAocmNJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAoZmllbGRJbnN0YW5jZSwgcmNJbnN0YW5jZS5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwgJiYgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1ZhbGlkYXRpb25NYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2Uud2FybmluZy5jb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNXYXJuaW5nTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAoXG4gICAgICAgICAgZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKGZpZWxkSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgIGNvbnN0IGZ3Y0luc3RhbmNlID0gZmllbGRJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PjtcbiAgICAgIGlmIChmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKGZpZWxkSW5zdGFuY2UsIGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSk7XG4gICAgICAgIGlmIChmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZE5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNTbGlkZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZGRTbGlkZUluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZTbGlkZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZEZpZWxkSW5zdGFuY2UoZmllbGRJbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSk6IEFqZkZpZWxkSW5zdGFuY2Uge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGNvbnN0IGZpZWxkSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGZpZWxkSW5zdGFuY2UpO1xuICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiAhZm9ybUdyb3VwLmNvbnRhaW5zKGZpZWxkSW5zdGFuY2VOYW1lKSkge1xuICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgICAgY29udHJvbC5zZXRWYWx1ZShmaWVsZEluc3RhbmNlLnZhbHVlKTtcbiAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2woZmllbGRJbnN0YW5jZU5hbWUsIGNvbnRyb2wpO1xuICAgIH1cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0uaW5kZXhPZihmaWVsZEluc3RhbmNlKSA9PSAtMSkge1xuICAgICAgICAgIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdLnB1c2goZmllbGRJbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBmaWVsZEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzRm9ybXVsYU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmZvcm11bGEuZm9ybXVsYSk7XG4gICAgfVxuXG4gICAgaWYgKGlzTm9kZUdyb3VwSW5zdGFuY2UoZmllbGRJbnN0YW5jZSkpIHtcbiAgICAgIGNvbnN0IG5nSW5zdGFuY2UgPSBmaWVsZEluc3RhbmNlIGFzIEFqZk5vZGVJbnN0YW5jZSBhcyBBamZOb2RlR3JvdXBJbnN0YW5jZTtcbiAgICAgIGlmIChuZ0luc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1JlcGV0aXRpb25NYXAoZmllbGRJbnN0YW5jZSwgbmdJbnN0YW5jZS5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwgJiYgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNWYWxpZGF0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2Uud2FybmluZyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1dhcm5pbmdNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAoXG4gICAgICAgICAgZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoaXNDdXN0b21GaWVsZFdpdGhDaG9pY2VzKGZpZWxkSW5zdGFuY2Uubm9kZSkgfHwgaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoZmllbGRJbnN0YW5jZSkpIHtcbiAgICAgIGNvbnN0IGZ3Y0luc3RhbmNlID0gZmllbGRJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PjtcbiAgICAgIGlmIChmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChmaWVsZEluc3RhbmNlLCBmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyLmZvcm11bGEpO1xuICAgICAgfVxuICAgICAgaWYgKGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgICAgICB0aGlzLl9hZGRUb05vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkU2xpZGVJbnN0YW5jZShzbGlkZUluc3RhbmNlOiBBamZTbGlkZUluc3RhbmNlKTogQWpmU2xpZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgc2xpZGUgPSBzbGlkZUluc3RhbmNlLm5vZGU7XG4gICAgaWYgKHNsaWRlLnJlYWRvbmx5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNFZGl0YWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS5yZWFkb25seS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBpZiAoc2xpZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIHNsaWRlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoc2xpZGVJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICByZXR1cm4gc2xpZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGVHcm91cEluc3RhbmNlKG5vZGVHcm91cEluc3RhbmNlOiBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpOlxuICAgICAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlR3JvdXAgPSBub2RlR3JvdXBJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChub2RlR3JvdXAudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgbm9kZUdyb3VwSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAobm9kZUdyb3VwSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgaWYgKG5vZGVHcm91cEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgIGlmIChub2RlR3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLmZvcm11bGFSZXBzLmZvcm11bGEpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICBsZXQgbm9kZUdyb3VwSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVHcm91cEluc3RhbmNlKTtcbiAgICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiAhZm9ybUdyb3VwLmNvbnRhaW5zKG5vZGVHcm91cEluc3RhbmNlTmFtZSkpIHtcbiAgICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgICAgICBjb250cm9sLnNldFZhbHVlKG5vZGVHcm91cEluc3RhbmNlLnJlcHMpO1xuICAgICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKG5vZGVHcm91cEluc3RhbmNlTmFtZSwgY29udHJvbCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBub2RlR3JvdXBJbnN0YW5jZTtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0VkaXRhYmlsaXR5TWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1Zpc2liaWxpdHlNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1JlcGV0aXRpb25NYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzRm9ybXVsYU1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVmFsaWRhdGlvbk1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzV2FybmluZ01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzTWFwSW5kZXgobm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LCBpbmRleDogc3RyaW5nKSB7XG4gICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICBpZiAoT2JqZWN0LmtleXModm1hcCkuaW5kZXhPZihpbmRleCkgPiAtMSkge1xuICAgICAgICBkZWxldGUgdm1hcFtpbmRleF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdm1hcDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTpcbiAgICAgIHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0Zvcm11bGFNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVmFsaWRhdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNXYXJuaW5nTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOlxuICAgICAgdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6XG4gICAgICB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc01hcChcbiAgICAgIG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiwgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgICBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgdG9rZW5zID0gdG9rZW5pemUoZm9ybXVsYSkuZmlsdGVyKFxuICAgICAgICAodG9rZW46IGFueSkgPT4gdG9rZW4udHlwZSA9PSAnSWRlbnRpZmllcicgJiYgdG9rZW4udmFsdWUgIT0gJyR2YWx1ZScpO1xuICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbjogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IHRva2VuTmFtZSA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgIGlmICh2bWFwW3Rva2VuTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdm1hcFt0b2tlbk5hbWVdLmluZGV4T2Yobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgICB2bWFwW3Rva2VuTmFtZV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgIGlmICh2bWFwW3Rva2VuTmFtZV0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdm1hcFt0b2tlbk5hbWVdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzRWRpdGFiaWxpdHlNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZWRpdGFiaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNGb3JtdWxhTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVmFsaWRhdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1dhcm5pbmdNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNNYXAoXG4gICAgICBub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgICAgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IHRva2VucyA9IHRva2VuaXplKGZvcm11bGEpLmZpbHRlcihcbiAgICAgICAgKHRva2VuOiBhbnkpID0+IHRva2VuLnR5cGUgPT0gJ0lkZW50aWZpZXInICYmIHRva2VuLnZhbHVlICE9ICckdmFsdWUnKTtcbiAgICBpZiAodG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICB0b2tlbnMuZm9yRWFjaCgodG9rZW46IGFueSkgPT4ge1xuICAgICAgICAgIGxldCB0b2tlbk5hbWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgICBpZiAodm1hcFt0b2tlbk5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICAgIHZtYXBbdG9rZW5OYW1lXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodm1hcFt0b2tlbk5hbWVdLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHZtYXBbdG9rZW5OYW1lXS5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==