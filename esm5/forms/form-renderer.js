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
import { __read, __spread } from "tslib";
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
var esprimaMod = esprima.default || esprima;
var tokenize = esprimaMod.tokenize;
var AjfFormRendererService = /** @class */ (function () {
    function AjfFormRendererService(_) {
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
    Object.defineProperty(AjfFormRendererService.prototype, "nodesTree", {
        get: function () {
            return this._flatNodesTree;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRendererService.prototype, "errorPositions", {
        get: function () {
            return this._errorPositions;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRendererService.prototype, "errors", {
        get: function () {
            return this._errors;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRendererService.prototype, "currentSupplementaryInformations", {
        get: function () {
            var form = this._form.getValue();
            return form != null && form.form != null ? form.form.supplementaryInformations : null;
        },
        enumerable: true,
        configurable: true
    });
    AjfFormRendererService.prototype.setForm = function (form, context) {
        if (context === void 0) { context = {}; }
        this._initUpdateMapStreams();
        if (form != null && Object.keys(context).length === 0 &&
            Object.keys(form.initContext || {}).length > 0) {
            context = form.initContext || {};
        }
        var currentForm = this._form.getValue();
        if ((currentForm == null && form != null) ||
            (currentForm != null && form !== currentForm.form)) {
            this._form.next({ form: form, context: context });
        }
    };
    AjfFormRendererService.prototype.getFormValue = function () {
        var formGroup = this._formGroup.getValue();
        if (formGroup == null) {
            return {};
        }
        var res = deepCopy(formGroup.value);
        return res;
    };
    AjfFormRendererService.prototype.addGroup = function (group) {
        var _this = this;
        return new Observable(function (subscriber) {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            var maxReps = group.node.maxReps;
            if (maxReps > 0 && group.reps + 1 > maxReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            var oldReps = group.reps;
            group.reps = group.reps + 1;
            group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
            group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
            _this._nodesUpdates.next(function (nodes) {
                var flatNodes = flattenNodesInstances(nodes, true);
                _this._adjustReps(flatNodes, group, oldReps, _this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            });
        });
    };
    AjfFormRendererService.prototype.removeGroup = function (group) {
        var _this = this;
        return new Observable(function (subscriber) {
            if (group.formulaReps != null) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            var minReps = group.node.minReps;
            if (group.reps - 1 < minReps) {
                subscriber.next(false);
                subscriber.complete();
                return;
            }
            var oldReps = group.reps;
            group.reps = group.reps - 1;
            group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
            group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
            _this._nodesUpdates.next(function (nodes) {
                _this._adjustReps(nodes, group, oldReps, _this.getFormValue());
                subscriber.next(true);
                subscriber.complete();
                return nodes;
            });
        });
    };
    AjfFormRendererService.prototype.getControl = function (field) {
        return this.formGroup.pipe(map(function (f) {
            var fieldName = nodeInstanceCompleteName(field);
            return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
        }));
    };
    AjfFormRendererService.prototype._initErrorsStreams = function () {
        var _this = this;
        this._errorPositions = this._valueChanged.pipe(withLatestFrom(this._nodes, this._form), filter(function (v) { return v[2] != null && v[2].form != null; }), map(function (v) {
            var nodes = v[1];
            var form = v[2].form;
            var currentPosition = 0;
            var errors = [];
            nodes.forEach(function (node) {
                if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                    var rsNode = node;
                    for (var i = 0; i < rsNode.reps; i++) {
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
                    var sNode = node;
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
            _this._slidesNum.next(currentPosition);
            return errors;
        }), publishReplay(), refCount());
        this._errors = this._errorPositions.pipe(map(function (e) { return e != null ? e.length : 0; }), startWith(0), publishReplay(), refCount());
    };
    AjfFormRendererService.prototype._initUpdateMapStreams = function () {
        this._visibilityNodesMap =
            this._visibilityNodesMapUpdates
                .pipe(scan(function (rmap, op) {
                return op(rmap);
            }, {}), startWith({}), share());
        this._repetitionNodesMap =
            this._repetitionNodesMapUpdates
                .pipe(scan(function (rmap, op) {
                return op(rmap);
            }, {}), startWith({}), share());
        this._conditionalBranchNodesMap =
            this._conditionalBranchNodesMapUpdates
                .pipe(scan(function (rmap, op) {
                return op(rmap);
            }, {}), startWith({}), share());
        this._formulaNodesMap =
            this._formulaNodesMapUpdates
                .pipe(scan(function (rmap, op) {
                return op(rmap);
            }, {}), startWith({}), share());
        this._validationNodesMap =
            this._validationNodesMapUpdates
                .pipe(scan(function (rmap, op) {
                return op(rmap);
            }, {}), startWith({}), share());
        this._warningNodesMap =
            this._warningNodesMapUpdates
                .pipe(scan(function (rmap, op) {
                return op(rmap);
            }, {}), startWith({}), share());
        this._filteredChoicesNodesMap =
            this._filteredChoicesNodesMapUpdates
                .pipe(scan(function (rmap, op) {
                return op(rmap);
            }, {}), startWith({}), share());
        this._triggerConditionsNodesMap =
            this._triggerConditionsNodesMapUpdates
                .pipe(scan(function (rmap, op) {
                return op(rmap);
            }, {}), startWith({}), share());
        this._nextSlideConditionsNodesMap =
            this._nextSlideConditionsNodesMapUpdates
                .pipe(scan(function (rmap, op) {
                return op(rmap);
            }, {}), startWith({}), share());
        this._nodesMaps = [
            this._visibilityNodesMap, this._repetitionNodesMap, this._conditionalBranchNodesMap,
            this._formulaNodesMap, this._validationNodesMap, this._warningNodesMap,
            this._nextSlideConditionsNodesMap, this._filteredChoicesNodesMap,
            this._triggerConditionsNodesMap
        ];
    };
    AjfFormRendererService.prototype._initFormStreams = function () {
        var _this = this;
        var formObs = this._form;
        formObs
            .pipe(map(function (_form) {
            return _this._initFormGroupStreams(new FormGroup({}));
        }))
            .subscribe(this._formGroup);
        formObs
            .pipe(switchMap(function (form) {
            if (form == null || form.form == null) {
                return obsOf(form);
            }
            var choicesOrigins = form.form.choicesOrigins || [];
            if (choicesOrigins.length === 0) {
                return obsOf(form);
            }
            return from(Promise.all(choicesOrigins.map(function (co) { return initChoicesOrigin(co); })))
                .pipe(map(function () { return form; }));
        }), map(function (form) {
            return function (_nodesInstances) {
                var nodes = form != null && form.form != null ?
                    _this._orderedNodesInstancesTree(flattenNodes(form.form.nodes), form.form.nodes, undefined, [], form.context || {}) :
                    [];
                var currentPosition = 0;
                nodes.forEach(function (node) {
                    if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                        var rsNode = node;
                        for (var i = 0; i < rsNode.reps; i++) {
                            if (node.visible) {
                                currentPosition++;
                                if (i == 0) {
                                    rsNode.position = currentPosition;
                                }
                            }
                        }
                    }
                    else if (node.node.nodeType === AjfNodeType.AjfSlide) {
                        var sNode = node;
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
    };
    AjfFormRendererService.prototype._initNodeInstance = function (allNodes, node, prefix, context, branchVisibility) {
        var _this = this;
        if (branchVisibility === void 0) { branchVisibility = true; }
        var instance = nodeToNodeInstance(allNodes, node, prefix, context);
        if (instance != null) {
            var nodeType = instance.node.nodeType;
            if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                this._explodeRepeatingNode(allNodes, instance, context);
            }
            else if (nodeType === AjfNodeType.AjfSlide) {
                var sInstance = instance;
                sInstance.nodes = this._orderedNodesInstancesTree(allNodes, sInstance.node.nodes, sInstance.node.id, prefix, context);
            }
            updateVisibility(instance, context, branchVisibility);
            updateConditionalBranches(instance, context);
            if (nodeType === AjfNodeType.AjfField) {
                var fInstance = instance;
                if (isCustomFieldWithChoices(fInstance.node) || isFieldWithChoices(fInstance.node)) {
                    updateFilteredChoices(fInstance, context);
                }
                else {
                    if (isTableFieldInstance(fInstance)) {
                        var tfInstance_1 = fInstance;
                        var tNode_1 = tfInstance_1.node;
                        tfInstance_1.context = context[nodeInstanceCompleteName(tfInstance_1)] || context;
                        var formGroup_1 = this._formGroup.getValue();
                        var controlsWithLabels_1 = [];
                        controlsWithLabels_1.push([node.label, tNode_1.columnLabels]);
                        if (formGroup_1 != null) {
                            tNode_1.rows.forEach(function (row, rowIdx) {
                                var r = [];
                                row.forEach(function (cell, idx) {
                                    /*
                                    every control is registered with the cell position
                                    inside the form control matrix
                                    with this mask `${tNode.name}__${rowIdx}__${idx}`
                                    */
                                    var name = tNode_1.name + "__" + rowIdx + "__" + idx;
                                    var tableFormControl = { control: new FormControl(), show: false };
                                    tableFormControl.control.setValue(tfInstance_1.context[cell.formula]);
                                    formGroup_1.registerControl(name, tableFormControl.control);
                                    r.push(tableFormControl);
                                    /* create a object that respect the instance interface
                                    with the minimum defined properties to allow to run addToNodeFormula map*/
                                    var fakeInstance = {
                                        formula: { formula: cell.formula },
                                        node: { name: name, nodeType: 0, editable: false },
                                        visible: true,
                                        prefix: [],
                                        conditionalBranches: [],
                                        updatedEvt: new EventEmitter()
                                    };
                                    _this._addToNodesFormulaMap(fakeInstance, cell.formula);
                                });
                                controlsWithLabels_1.push([tNode_1.rowLabels[rowIdx], r]);
                            });
                            tfInstance_1.controls = controlsWithLabels_1;
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
    };
    AjfFormRendererService.prototype._adjustReps = function (allNodes, instance, oldReps, context) {
        var _this = this;
        var newReps = instance.reps;
        var result = { added: null, removed: null };
        if (oldReps < newReps) {
            var newNodes_1 = [];
            if (instance.nodes == null) {
                instance.nodes = [];
            }
            if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                var node = createField({
                    id: 999,
                    name: '',
                    parent: -1,
                    fieldType: AjfFieldType.Empty,
                    label: instance.node.label
                });
                var newInstance = this._initNodeInstance(allNodes, node, instance.prefix.slice(0), context);
                if (newInstance != null) {
                    instance.nodes.push(newInstance);
                }
            }
            var _loop_1 = function (i) {
                var prefix = instance.prefix.slice(0);
                var group = instance.node;
                prefix.push(i);
                orderedNodes(group.nodes, instance.node.id).forEach(function (n) {
                    var newInstance = _this._initNodeInstance(allNodes, n, prefix, context);
                    if (newInstance != null) {
                        newNodes_1.push(newInstance);
                        instance.nodes.push(newInstance);
                    }
                });
                this_1._addNodeInstance(instance);
            };
            var this_1 = this;
            for (var i = oldReps; i < newReps; i++) {
                _loop_1(i);
            }
            result.added = newNodes_1;
        }
        else if (oldReps > newReps) {
            var nodesNum = instance.nodes.length / oldReps;
            if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                nodesNum++;
            }
            result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
            result.removed.forEach((function (n) {
                _this._removeNodeInstance(n);
            }));
        }
        if (oldReps != newReps && instance.formulaReps == null) {
            var fg = this._formGroup.getValue();
            var completeName = nodeInstanceCompleteName(instance);
            if (fg != null && fg.contains(completeName)) {
                fg.controls[completeName].setValue(instance.reps);
            }
        }
        instance.flatNodes = flattenNodesInstances(instance.nodes);
        if (instance.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
            var rsInstance = instance;
            var slideNodes = [];
            var nodesPerSlide = rsInstance.nodes != null ? rsInstance.nodes.length / rsInstance.reps : 0;
            for (var i = 0; i < instance.reps; i++) {
                var startNode = i * nodesPerSlide;
                slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
            }
            rsInstance.slideNodes = slideNodes;
        }
        return result;
    };
    AjfFormRendererService.prototype._updateFormValueAndValidity = function () {
        this._nodesUpdates.asObservable()
            .pipe(withLatestFrom(this._formGroup), filter(function (values) { return values[1] !== null; }))
            .subscribe(function (values) {
            var form = values[1];
            form.updateValueAndValidity();
        });
    };
    AjfFormRendererService.prototype._explodeRepeatingNode = function (allNodes, instance, context) {
        var oldReps = updateRepsNum(instance, context);
        if (oldReps !== instance.reps) {
            this._adjustReps(allNodes, instance, oldReps, context);
        }
    };
    AjfFormRendererService.prototype._orderedNodesInstancesTree = function (allNodes, nodes, parent, prefix, context) {
        var _this = this;
        if (parent === void 0) { parent = null; }
        if (prefix === void 0) { prefix = []; }
        var nodesInstances = [];
        var curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
        orderedNodes(nodes, parent).forEach(function (node) {
            var parentNodeInstance = nodesInstances.find(function (ni) { return ni.node.id == node.parent && nodeInstanceSuffix(ni) == curSuffix; });
            var branchVisibility = parentNodeInstance != null ?
                parentNodeInstance.verifiedBranch != null &&
                    parentNodeInstance.verifiedBranch == node.parentNode :
                true;
            var nni = _this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
            if (nni != null) {
                nodesInstances.push(nni);
            }
        });
        return nodesInstances;
    };
    AjfFormRendererService.prototype._formValueDelta = function (oldValue, newValue) {
        return Object.keys(newValue).filter(function (k) { return oldValue[k] !== newValue[k]; });
    };
    AjfFormRendererService.prototype._initFormGroupStreams = function (formGroup) {
        var _this = this;
        this._formGroupSubscription.unsubscribe();
        var init = true;
        var initForm = true;
        this._formInitEvent.emit(0 /* Initializing */);
        this._formGroupSubscription =
            formGroup.valueChanges
                .pipe(startWith({}), pairwise(), debounceTime(200), withLatestFrom.apply(void 0, __spread((this._nodesMaps), [this._flatNodes])))
                .subscribe(function (v) {
                var oldFormValue = init && {} || v[0][0];
                init = false;
                var newFormValue = v[0][1];
                var visibilityMap = v[1];
                var repetitionMap = v[2];
                var conditionalBranchesMap = v[3];
                var formulaMap = v[4];
                var validationMap = v[5];
                var warningMap = v[6];
                var nextSlideConditionsMap = v[7];
                var filteredChoicesMap = v[8];
                var triggerConditionsMap = v[9];
                var nodes = v[10];
                // takes the names of the fields that have changed
                var delta = _this._formValueDelta(oldFormValue, newFormValue);
                var deltaLen = delta.length;
                var updatedNodes = [];
                /*
                  for each field update all properties map
                  with the following rule  "if fieldname is in map update it" and
                  push on updateNodes the node instance that wrap field
                */
                delta.forEach(function (fieldName) {
                    updatedNodes = updatedNodes.concat(nodes.filter(function (n) { return nodeInstanceCompleteName(n) === fieldName; }));
                    if (visibilityMap[fieldName] != null) {
                        visibilityMap[fieldName].forEach(function (nodeInstance) {
                            var completeName = nodeInstanceCompleteName(nodeInstance);
                            var visibilityChanged = updateVisibility(nodeInstance, newFormValue);
                            var isField = isFieldInstance(nodeInstance);
                            if (visibilityChanged && !nodeInstance.visible) {
                                var fg_1 = _this._formGroup.getValue();
                                if (fg_1 != null) {
                                    var s_1 = timer(200).subscribe(function () {
                                        if (s_1 && !s_1.closed) {
                                            s_1.unsubscribe();
                                        }
                                        fg_1.controls[completeName].setValue(null);
                                    });
                                }
                                if (isField) {
                                    nodeInstance.value = null;
                                }
                            }
                            else if (visibilityChanged && nodeInstance.visible && isField) {
                                var fg = _this._formGroup.getValue();
                                var res = updateFormula(nodeInstance, newFormValue);
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
                        repetitionMap[fieldName].forEach(function (nodeInstance) {
                            if (isRepeatingContainerNode(nodeInstance.node)) {
                                var rnInstance = nodeInstance;
                                var oldReps = updateRepsNum(rnInstance, newFormValue);
                                if (oldReps !== rnInstance.reps) {
                                    _this._adjustReps(nodes, rnInstance, oldReps, newFormValue);
                                }
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        });
                    }
                    if (conditionalBranchesMap[fieldName] != null) {
                        conditionalBranchesMap[fieldName].forEach(function (nodeInstance) {
                            // const branchChanged = nodeInstance.updateConditionalBranches(newFormValue);
                            updateConditionalBranches(nodeInstance, newFormValue);
                            // if (branchChanged) {
                            var verifiedBranch = nodeInstance.verifiedBranch;
                            nodeInstance.conditionalBranches.forEach(function (_condition, idx) {
                                if (idx == verifiedBranch) {
                                    _this._showSubtree(newFormValue, nodes, nodeInstance, idx);
                                }
                                else {
                                    _this._hideSubtree(newFormValue, nodes, nodeInstance, idx);
                                }
                            });
                            // }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        });
                    }
                    if (formulaMap[fieldName] != null) {
                        formulaMap[fieldName].forEach(function (nodeInstance) {
                            if (isFieldInstance(nodeInstance)) {
                                var fInstance = nodeInstance;
                                var res = updateFormula(fInstance, newFormValue);
                                var fg = _this._formGroup.getValue();
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
                        validationMap[fieldName].forEach(function (nodeInstance) {
                            if (isFieldInstance(nodeInstance)) {
                                var fInstance = nodeInstance;
                                newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
                                updateValidation(fInstance, newFormValue, _this.currentSupplementaryInformations);
                            }
                            if (updatedNodes.indexOf(nodeInstance) === -1) {
                                updatedNodes.push(nodeInstance);
                            }
                        });
                    }
                    if (warningMap[fieldName] != null) {
                        warningMap[fieldName].forEach(function (nodeInstance) {
                            if (isFieldInstance(nodeInstance)) {
                                var fInstance = nodeInstance;
                                updateWarning(fInstance, newFormValue);
                                if (fInstance.warningResults != null &&
                                    fInstance.warningResults.filter(function (warning) { return warning.result; }).length > 0) {
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
                            .filter(function (nodeInstance) {
                            if (isFieldInstance(nodeInstance)) {
                                var fInstance = nodeInstance;
                                return updateNextSlideCondition(fInstance, newFormValue);
                            }
                            return false;
                        })
                            .length == 1) {
                            _this._nextSlideTrigger.emit();
                        }
                    }
                    if (filteredChoicesMap[fieldName] != null) {
                        filteredChoicesMap[fieldName].forEach(function (nodeInstance) {
                            if (isFieldInstance(nodeInstance)) {
                                var fInstance = nodeInstance;
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
                        var res = triggerConditionsMap[fieldName].filter(function (nodeInstance) {
                            if (!isFieldInstance(nodeInstance)) {
                                return false;
                            }
                            var fInstance = nodeInstance;
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
                updatedNodes.forEach(function (n) {
                    var nodeIdx = nodes.indexOf(n);
                    var idx = nodeIdx - 1;
                    while (idx >= 0) {
                        var curNode = nodes[idx];
                        if (isSlidesInstance(curNode)) {
                            var slide = curNode;
                            var subNodesNum = slide.flatNodes.length;
                            var valid = true;
                            for (var i = 0; i < subNodesNum; i++) {
                                var subNode = slide.flatNodes[i];
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
                    _this._formInitEvent.emit(1 /* Complete */);
                }
                _this._valueChanged.next();
            });
        return formGroup;
    };
    AjfFormRendererService.prototype._showSubtree = function (context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, true, branch);
    };
    AjfFormRendererService.prototype._hideSubtree = function (context, nodes, node, branch) {
        this._updateSubtreeVisibility(context, nodes, node, false, branch);
    };
    AjfFormRendererService.prototype._updateSubtreeVisibility = function (context, nodes, node, visible, branch) {
        var _this = this;
        var subNodes;
        var nodeSuffix = nodeInstanceSuffix(node);
        if (branch != null) {
            subNodes = nodes.filter(function (n) {
                var suffix = nodeInstanceSuffix(n);
                return suffix == nodeSuffix && n.node.parent == node.node.id && n.node.parentNode == branch;
            });
        }
        else {
            subNodes = nodes.filter(function (n) {
                var suffix = nodeInstanceSuffix(n);
                return suffix == nodeSuffix && n.node.parent == node.node.id;
            });
        }
        var isContainer = isContainerNode(node.node);
        subNodes.forEach(function (n) {
            if (!isContainer ||
                (isContainer && node.node.nodes.find(function (cn) { return cn.id == n.node.id; }) == null)) {
                updateVisibility(n, context, visible);
                updateFormula(n, context);
                _this._updateSubtreeVisibility(context, nodes, n, visible);
            }
        });
    };
    AjfFormRendererService.prototype._initNodesStreams = function () {
        this._nodes =
            this._nodesUpdates.pipe(scan(function (nodes, op) {
                return op(nodes);
            }, []), share());
        this._flatNodesTree = this._nodes.pipe(map(function (nodes) { return flattenNodesInstancesTree(nodes); }), share());
        this._flatNodes = this._flatNodesTree.pipe(map(function (slides) {
            var nodes = [];
            slides.forEach(function (s) {
                nodes.push(s);
                nodes = nodes.concat(s.flatNodes);
            });
            return nodes;
        }), share());
    };
    AjfFormRendererService.prototype._removeNodeInstance = function (nodeInstance) {
        var nodeName = nodeInstanceCompleteName(nodeInstance);
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
    };
    AjfFormRendererService.prototype._removeSlideInstance = function (slideInstance) {
        var _this = this;
        var slide = slideInstance.node;
        if (slide.visibility != null) {
            this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach(function (conditionalBranch) {
            _this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        });
        return slideInstance;
    };
    AjfFormRendererService.prototype._removeNodeGroupInstance = function (nodeGroupInstance) {
        var nodeGroup = nodeGroupInstance.node;
        if (nodeGroup.visibility != null) {
            this._removeFromNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        if (nodeGroupInstance.formulaReps != null && nodeGroup.formulaReps != null) {
            this._removeFromNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
        }
        return nodeGroupInstance;
    };
    AjfFormRendererService.prototype._removeFieldInstance = function (fieldInstance) {
        var _this = this;
        var formGroup = this._formGroup.getValue();
        var fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
        if (formGroup != null && formGroup.contains(fieldInstanceName)) {
            formGroup.removeControl(fieldInstanceName);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next(function (vmap) {
                if (vmap[fieldInstanceName] == null) {
                    delete vmap[fieldInstanceName];
                }
                return vmap;
            });
        }
        if (fieldInstance.visibility != null) {
            this._removeFromNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
        }
        fieldInstance.conditionalBranches.forEach(function (conditionalBranch) {
            _this._removeFromNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
        });
        if (fieldInstance.formula) {
            this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        // TODO: check this, probably is never verified
        if (isRepeatingContainerNode(fieldInstance.node)) {
            var rcInstance = fieldInstance;
            if (rcInstance.formulaReps != null) {
                this._removeFromNodesRepetitionMap(fieldInstance, rcInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach(function (condition) {
                _this._removeFromNodesValidationMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach(function (condition) {
                _this._removeFromNodesWarningMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._removeFromNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isFieldWithChoices(fieldInstance.node)) {
            var fwcInstance = fieldInstance;
            if (fwcInstance.choicesFilter != null) {
                this._removeFromNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
                if (fwcInstance.triggerConditions != null) {
                    fwcInstance.triggerConditions.forEach(function (condition) {
                        _this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                    });
                }
            }
        }
        return fieldInstance;
    };
    AjfFormRendererService.prototype._addNodeInstance = function (nodeInstance) {
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
    };
    AjfFormRendererService.prototype._addFieldInstance = function (fieldInstance) {
        var _this = this;
        var formGroup = this._formGroup.getValue();
        var fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
        if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
            var control = new FormControl();
            control.setValue(fieldInstance.value);
            formGroup.registerControl(fieldInstanceName, control);
        }
        if (fieldInstance.validation != null) {
            this._validationNodesMapUpdates.next(function (vmap) {
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
        fieldInstance.conditionalBranches.forEach(function (conditionalBranch) {
            _this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
        });
        if (fieldInstance.formula) {
            this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
        }
        if (isNodeGroupInstance(fieldInstance)) {
            var ngInstance = fieldInstance;
            if (ngInstance.formulaReps != null) {
                this._addToNodesRepetitionMap(fieldInstance, ngInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach(function (condition) {
                _this._addToNodesValidationMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach(function (condition) {
                _this._addToNodesWarningMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._addToNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isCustomFieldWithChoices(fieldInstance.node) || isFieldWithChoicesInstance(fieldInstance)) {
            var fwcInstance = fieldInstance;
            if (fwcInstance.choicesFilter != null) {
                this._addToNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
            }
            if (fwcInstance.triggerConditions != null) {
                fwcInstance.triggerConditions.forEach(function (condition) {
                    _this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                });
            }
        }
        return fieldInstance;
    };
    AjfFormRendererService.prototype._addSlideInstance = function (slideInstance) {
        var _this = this;
        var slide = slideInstance.node;
        if (slide.visibility != null) {
            this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
        }
        slideInstance.conditionalBranches.forEach(function (conditionalBranch) {
            _this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
        });
        return slideInstance;
    };
    AjfFormRendererService.prototype._addNodeGroupInstance = function (nodeGroupInstance) {
        var _this = this;
        var nodeGroup = nodeGroupInstance.node;
        if (nodeGroup.visibility != null) {
            this._addToNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
        }
        nodeGroupInstance.conditionalBranches.forEach(function (conditionalBranch) {
            _this._addToNodesConditionalBranchMap(nodeGroupInstance, conditionalBranch.condition);
        });
        if (nodeGroupInstance.formulaReps != null) {
            if (nodeGroup.formulaReps != null) {
                this._addToNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
            }
        }
        else {
            var formGroup = this._formGroup.getValue();
            var nodeGroupInstanceName = nodeInstanceCompleteName(nodeGroupInstance);
            if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
                var control = new FormControl();
                control.setValue(nodeGroupInstance.reps);
                formGroup.registerControl(nodeGroupInstanceName, control);
            }
        }
        return nodeGroupInstance;
    };
    AjfFormRendererService.prototype._removeNodesVisibilityMapIndex = function (index) {
        this._removeNodesMapIndex(this._visibilityNodesMapUpdates, index);
    };
    AjfFormRendererService.prototype._removeNodesRepetitionMapIndex = function (index) {
        this._removeNodesMapIndex(this._repetitionNodesMapUpdates, index);
    };
    AjfFormRendererService.prototype._removeNodesConditionalBranchMapIndex = function (index) {
        this._removeNodesMapIndex(this._conditionalBranchNodesMapUpdates, index);
    };
    AjfFormRendererService.prototype._removeNodesFormulaMapIndex = function (index) {
        this._removeNodesMapIndex(this._formulaNodesMapUpdates, index);
    };
    AjfFormRendererService.prototype._removeNodesValidationMapIndex = function (index) {
        this._removeNodesMapIndex(this._validationNodesMapUpdates, index);
    };
    AjfFormRendererService.prototype._removeNodesWarningMapIndex = function (index) {
        this._removeNodesMapIndex(this._warningNodesMapUpdates, index);
    };
    AjfFormRendererService.prototype._removeNodesFilteredChoicesMapIndex = function (index) {
        this._removeNodesMapIndex(this._filteredChoicesNodesMapUpdates, index);
    };
    AjfFormRendererService.prototype._removeNodesTriggerConditionsMapIndex = function (index) {
        this._removeNodesMapIndex(this._triggerConditionsNodesMapUpdates, index);
    };
    AjfFormRendererService.prototype._removeNodesNextSlideConditionsMapIndex = function (index) {
        this._removeNodesMapIndex(this._nextSlideConditionsNodesMapUpdates, index);
    };
    AjfFormRendererService.prototype._removeNodesMapIndex = function (nodesMap, index) {
        nodesMap.next(function (vmap) {
            if (Object.keys(vmap).indexOf(index) > -1) {
                delete vmap[index];
            }
            return vmap;
        });
    };
    AjfFormRendererService.prototype._removeFromNodesVisibilityMap = function (nodeInstance, formula) {
        this._removeFromNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._removeFromNodesRepetitionMap = function (nodeInstance, formula) {
        this._removeFromNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._removeFromNodesConditionalBranchMap = function (nodeInstance, formula) {
        this._removeFromNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._removeFromNodesFormulaMap = function (nodeInstance, formula) {
        this._removeFromNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._removeFromNodesValidationMap = function (nodeInstance, formula) {
        this._removeFromNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._removeFromNodesWarningMap = function (nodeInstance, formula) {
        this._removeFromNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._removeFromNodesFilteredChoicesMap = function (nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._removeFromNodesTriggerConditionsMap = function (nodeInstance, formula) {
        this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._removeFromNodesNextSlideConditionsMap = function (nodeInstance, formula) {
        this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._removeFromNodesMap = function (nodesMap, nodeInstance, formula) {
        var tokens = tokenize(formula).filter(function (token) { return token.type == 'Identifier' && token.value != '$value'; });
        if (tokens.length > 0) {
            nodesMap.next(function (vmap) {
                tokens.forEach(function (token) {
                    var tokenName = token.value;
                    if (vmap[tokenName] != null) {
                        var idx = vmap[tokenName].indexOf(nodeInstance);
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
    };
    AjfFormRendererService.prototype._addToNodesVisibilityMap = function (nodeInstance, formula) {
        this._addToNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._addToNodesRepetitionMap = function (nodeInstance, formula) {
        this._addToNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._addToNodesConditionalBranchMap = function (nodeInstance, formula) {
        this._addToNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._addToNodesFormulaMap = function (nodeInstance, formula) {
        this._addToNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._addToNodesValidationMap = function (nodeInstance, formula) {
        this._addToNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._addToNodesWarningMap = function (nodeInstance, formula) {
        this._addToNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._addToNodesFilteredChoicesMap = function (nodeInstance, formula) {
        this._addToNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._addToNodesTriggerConditionsMap = function (nodeInstance, formula) {
        this._addToNodesMap(this._triggerConditionsNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._addToNodesNextSlideConditionsMap = function (nodeInstance, formula) {
        this._addToNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
    };
    AjfFormRendererService.prototype._addToNodesMap = function (nodesMap, nodeInstance, formula) {
        var tokens = tokenize(formula).filter(function (token) { return token.type == 'Identifier' && token.value != '$value'; });
        if (tokens.length > 0) {
            nodesMap.next(function (vmap) {
                tokens.forEach(function (token) {
                    var tokenName = token.value;
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
    };
    AjfFormRendererService.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    AjfFormRendererService.ctorParameters = function () { return [
        { type: AjfValidationService }
    ]; };
    return AjfFormRendererService;
}());
export { AjfFormRendererService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUdILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQWtCLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQ0wsZUFBZSxFQUNmLElBQUksRUFDSixVQUFVLEVBQ1YsRUFBRSxJQUFJLEtBQUssRUFDWCxPQUFPLEVBRVAsWUFBWSxFQUNaLEtBQUssRUFDTixNQUFNLE1BQU0sQ0FBQztBQUNkLE9BQU8sRUFDTCxZQUFZLEVBQ1osTUFBTSxFQUNOLEdBQUcsRUFDSCxRQUFRLEVBQ1IsYUFBYSxFQUNiLFFBQVEsRUFDUixJQUFJLEVBQ0osS0FBSyxFQUNMLFNBQVMsRUFDVCxTQUFTLEVBQ1QsY0FBYyxFQUNmLE1BQU0sZ0JBQWdCLENBQUM7QUFTeEIsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBVzNELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQU94RCxPQUFPLEVBQUMsaUJBQWlCLEVBQUMsTUFBTSxxQ0FBcUMsQ0FBQztBQUN0RSxPQUFPLEVBQUMsMEJBQTBCLEVBQUMsTUFBTSx5REFBeUQsQ0FBQztBQUNuRyxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxrREFBa0QsQ0FBQztBQUN0RixPQUFPLEVBQUMsd0JBQXdCLEVBQUMsTUFBTSxzREFBc0QsQ0FBQztBQUM5RixPQUFPLEVB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Q0FBQztvQkFDNUIsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksSUFBSSxFQUFFO3dCQUMzQixJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUN0QjtvQkFDRCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7d0JBQ2hELElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7cUJBQ3BDO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILE9BQU8sSUFBSSxDQUFDO1lBQ2QsQ0FBQyxDQUFDLENBQUM7U0FDSjtJQUNILENBQUM7O2dCQXJyQ0YsVUFBVTs7OztnQkFWSCxvQkFBb0I7O0lBZ3NDNUIsNkJBQUM7Q0FBQSxBQXRyQ0QsSUFzckNDO1NBcnJDWSxzQkFBc0IiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29uZGl0aW9uLCBBamZDb250ZXh0fSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0V2ZW50RW1pdHRlciwgSW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Fic3RyYWN0Q29udHJvbCwgRm9ybUNvbnRyb2wsIEZvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0ICogYXMgZXNwcmltYSBmcm9tICdlc3ByaW1hJztcbmltcG9ydCB7XG4gIEJlaGF2aW9yU3ViamVjdCxcbiAgZnJvbSxcbiAgT2JzZXJ2YWJsZSxcbiAgb2YgYXMgb2JzT2YsXG4gIFN1YmplY3QsXG4gIFN1YnNjcmliZXIsXG4gIFN1YnNjcmlwdGlvbixcbiAgdGltZXJcbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZWJvdW5jZVRpbWUsXG4gIGZpbHRlcixcbiAgbWFwLFxuICBwYWlyd2lzZSxcbiAgcHVibGlzaFJlcGxheSxcbiAgcmVmQ291bnQsXG4gIHNjYW4sXG4gIHNoYXJlLFxuICBzdGFydFdpdGgsXG4gIHN3aXRjaE1hcCxcbiAgd2l0aExhdGVzdEZyb21cbn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlXG59IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7QWpmRm9ybXVsYUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvZm9ybXVsYS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRhYmxlRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy90YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkVtcHR5RmllbGR9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9lbXB0eS1maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZUYWJsZUNlbGx9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy90YWJsZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZUYWJsZUZvcm1Db250cm9sfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy90YWJsZS1mb3JtLWNvbnRyb2wnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZVxufSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cH0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS1ncm91cCc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbn0gZnJvbSAnLi9pbnRlcmZhY2Uvb3BlcmF0aW9ucy9ub2Rlcy1pbnN0YW5jZXMtb3BlcmF0aW9uJztcbmltcG9ydCB7QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb259IGZyb20gJy4vaW50ZXJmYWNlL29wZXJhdGlvbnMvcmVuZGVyZXItdXBkYXRlLW1hcC1vcGVyYXRpb24nO1xuaW1wb3J0IHtBamZSZW5kZXJlclVwZGF0ZU1hcH0gZnJvbSAnLi9pbnRlcmZhY2UvcmVuZGVyZXItbWFwcy91cGRhdGUtbWFwJztcbmltcG9ydCB7QWpmQmFzZVNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvYmFzZS1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge2luaXRDaG9pY2VzT3JpZ2lufSBmcm9tICcuL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtZmllbGQtd2l0aC1jaG9pY2VzLWluc3RhbmNlJztcbmltcG9ydCB7aXNUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy9pcy10YWJsZS1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWVsZC1pbnN0YW5jZS1zdGF0ZSc7XG5pbXBvcnQge3VwZGF0ZUZpbHRlcmVkQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1maWx0ZXJlZC1jaG9pY2VzJztcbmltcG9ydCB7dXBkYXRlRm9ybXVsYX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1mb3JtdWxhJztcbmltcG9ydCB7dXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9ufSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLW5leHQtc2xpZGUtY29uZGl0aW9uJztcbmltcG9ydCB7dXBkYXRlVHJpZ2dlckNvbmRpdGlvbnN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdHJpZ2dlci1jb25kaXRpb25zJztcbmltcG9ydCB7dXBkYXRlVmFsaWRhdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS12YWxpZGF0aW9uJztcbmltcG9ydCB7dXBkYXRlV2FybmluZ30gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS13YXJuaW5nJztcbmltcG9ydCB7Y3JlYXRlRmllbGR9IGZyb20gJy4vdXRpbHMvZmllbGRzL2NyZWF0ZS1maWVsZCc7XG5pbXBvcnQge2lzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMvaXMtY3VzdG9tLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi91dGlscy9maWVsZHMvaXMtZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzSW5zdGFuY2VzfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcyc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc0luc3RhbmNlc1RyZWV9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2ZsYXR0ZW4tbm9kZXMtaW5zdGFuY2VzLXRyZWUnO1xuaW1wb3J0IHtpc0ZpZWxkSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLWZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7aXNOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlc0luc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1zbGlkZXMtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZVN1ZmZpeH0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1zdWZmaXgnO1xuaW1wb3J0IHtub2RlVG9Ob2RlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtdG8tbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge3VwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXN9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS1jb25kaXRpb25hbC1icmFuY2hlcyc7XG5pbXBvcnQge3VwZGF0ZVZpc2liaWxpdHl9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL3VwZGF0ZS12aXNpYmlsaXR5JztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzfSBmcm9tICcuL3V0aWxzL25vZGVzL2ZsYXR0ZW4tbm9kZXMnO1xuaW1wb3J0IHtpc0NvbnRhaW5lck5vZGV9IGZyb20gJy4vdXRpbHMvbm9kZXMvaXMtY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGV9IGZyb20gJy4vdXRpbHMvbm9kZXMvaXMtcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7b3JkZXJlZE5vZGVzfSBmcm9tICcuL3V0aWxzL25vZGVzL29yZGVyZWQtbm9kZXMnO1xuaW1wb3J0IHt1cGRhdGVSZXBzTnVtfSBmcm9tICcuL3V0aWxzL3NsaWRlcy1pbnN0YW5jZXMvdXBkYXRlLXJlcHMtbnVtJztcbmltcG9ydCB7dmFsaWRTbGlkZX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3ZhbGlkLXNsaWRlJztcbmltcG9ydCB7QWpmVmFsaWRhdGlvblNlcnZpY2V9IGZyb20gJy4vdmFsaWRhdGlvbi1zZXJ2aWNlJztcblxuY29uc3QgZXNwcmltYU1vZDogYW55ID0gKGVzcHJpbWEgYXMgYW55KS5kZWZhdWx0IHx8IGVzcHJpbWE7XG5jb25zdCB7dG9rZW5pemV9ID0gZXNwcmltYU1vZDtcblxuZXhwb3J0IGNvbnN0IGVudW0gQWpmRm9ybUluaXRTdGF0dXMge1xuICBJbml0aWFsaXppbmcsXG4gIENvbXBsZXRlXG59XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF93YXJuaW5nTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9maWx0ZXJlZENob2ljZXNOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4oKTtcblxuICBwcml2YXRlIF9mb3JtSW5pdEV2ZW50OiBFdmVudEVtaXR0ZXI8QWpmRm9ybUluaXRTdGF0dXM+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtSW5pdFN0YXR1cz4oKTtcbiAgcmVhZG9ubHkgZm9ybUluaXRFdmVudDogT2JzZXJ2YWJsZTxBamZGb3JtSW5pdFN0YXR1cz4gPSB0aGlzLl9mb3JtSW5pdEV2ZW50LmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2Zvcm1Hcm91cDogQmVoYXZpb3JTdWJqZWN0PEZvcm1Hcm91cHxudWxsPiA9IG5ldyBCZWhhdmlvclN1YmplY3Q8Rm9ybUdyb3VwfG51bGw+KG51bGwpO1xuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8Rm9ybUdyb3VwfG51bGw+ID0gdGhpcy5fZm9ybUdyb3VwLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2Zvcm06IEJlaGF2aW9yU3ViamVjdDx7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fXxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PHtmb3JtOiBBamZGb3JtIHwgbnVsbCwgY29udGV4dD86IEFqZkNvbnRleHR9fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9ub2RlczogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2Rlc1RyZWU6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnM6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuICBwcml2YXRlIF9lcnJvcnM6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIF9mb3JtR3JvdXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9ub2Rlc01hcHM6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+W107XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlVHJpZ2dlcjogRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4oKTtcbiAgcmVhZG9ubHkgbmV4dFNsaWRlVHJpZ2dlcjogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2U+ID0gdGhpcy5fbmV4dFNsaWRlVHJpZ2dlci5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zbGlkZXNOdW06IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMuX3NsaWRlc051bS5hc09ic2VydmFibGUoKTtcblxuICBnZXQgbm9kZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2Rlc1RyZWU7XG4gIH1cbiAgZ2V0IGVycm9yUG9zaXRpb25zKCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHtcbiAgICByZXR1cm4gdGhpcy5fZXJyb3JQb3NpdGlvbnM7XG4gIH1cbiAgZ2V0IGVycm9ycygpOiBPYnNlcnZhYmxlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLl9lcnJvcnM7XG4gIH1cbiAgZ2V0IGN1cnJlbnRTdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybSA9IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKTtcbiAgICByZXR1cm4gZm9ybSAhPSBudWxsICYmIGZvcm0uZm9ybSAhPSBudWxsID8gZm9ybS5mb3JtLnN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMgOiBudWxsO1xuICB9XG5cbiAgY29uc3RydWN0b3IoXzogQWpmVmFsaWRhdGlvblNlcnZpY2UpIHtcbiAgICB0aGlzLl9pbml0VXBkYXRlTWFwU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXROb2Rlc1N0cmVhbXMoKTtcbiAgICB0aGlzLl9pbml0RXJyb3JzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRGb3JtU3RyZWFtcygpO1xuICAgIHRoaXMuX3VwZGF0ZUZvcm1WYWx1ZUFuZFZhbGlkaXR5KCk7XG4gIH1cblxuICBzZXRGb3JtKGZvcm06IEFqZkZvcm18bnVsbCwgY29udGV4dDogQWpmQ29udGV4dCA9IHt9KSB7XG4gICAgdGhpcy5faW5pdFVwZGF0ZU1hcFN0cmVhbXMoKTtcbiAgICBpZiAoZm9ybSAhPSBudWxsICYmIE9iamVjdC5rZXlzKGNvbnRleHQpLmxlbmd0aCA9PT0gMCAmJlxuICAgICAgICBPYmplY3Qua2V5cyhmb3JtLmluaXRDb250ZXh0IHx8IHt9KS5sZW5ndGggPiAwKSB7XG4gICAgICBjb250ZXh0ID0gZm9ybS5pbml0Q29udGV4dCB8fCB7fTtcbiAgICB9XG4gICAgY29uc3QgY3VycmVudEZvcm0gPSB0aGlzLl9mb3JtLmdldFZhbHVlKCk7XG4gICAgaWYgKChjdXJyZW50Rm9ybSA9PSBudWxsICYmIGZvcm0gIT0gbnVsbCkgfHxcbiAgICAgICAgKGN1cnJlbnRGb3JtICE9IG51bGwgJiYgZm9ybSAhPT0gY3VycmVudEZvcm0uZm9ybSkpIHtcbiAgICAgIHRoaXMuX2Zvcm0ubmV4dCh7Zm9ybTogZm9ybSwgY29udGV4dDogY29udGV4dH0pO1xuICAgIH1cbiAgfVxuXG4gIGdldEZvcm1WYWx1ZSgpOiBhbnkge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGlmIChmb3JtR3JvdXAgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuIHt9O1xuICAgIH1cbiAgICBsZXQgcmVzID0gZGVlcENvcHkoZm9ybUdyb3VwLnZhbHVlKTtcbiAgICByZXR1cm4gcmVzO1xuICB9XG5cbiAgYWRkR3JvdXAoZ3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiBPYnNlcnZhYmxlPGJvb2xlYW4+IHtcbiAgICByZXR1cm4gbmV3IE9ic2VydmFibGU8Ym9vbGVhbj4oKHN1YnNjcmliZXI6IFN1YnNjcmliZXI8Ym9vbGVhbj4pID0+IHtcbiAgICAgIGlmIChncm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgbWF4UmVwcyA9IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGlmIChtYXhSZXBzID4gMCAmJiBncm91cC5yZXBzICsgMSA+IG1heFJlcHMpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvbGRSZXBzID0gZ3JvdXAucmVwcztcbiAgICAgIGdyb3VwLnJlcHMgPSBncm91cC5yZXBzICsgMTtcbiAgICAgIGdyb3VwLmNhbkFkZCA9IGdyb3VwLm5vZGUubWF4UmVwcyA9PT0gMCB8fCBncm91cC5yZXBzIDwgZ3JvdXAubm9kZS5tYXhSZXBzO1xuICAgICAgZ3JvdXAuY2FuUmVtb3ZlID0gZ3JvdXAubm9kZS5taW5SZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPiBncm91cC5ub2RlLm1pblJlcHM7XG4gICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMubmV4dCgobm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICBjb25zdCBmbGF0Tm9kZXMgPSBmbGF0dGVuTm9kZXNJbnN0YW5jZXMobm9kZXMsIHRydWUpO1xuICAgICAgICB0aGlzLl9hZGp1c3RSZXBzKGZsYXROb2RlcywgZ3JvdXAsIG9sZFJlcHMsIHRoaXMuZ2V0Rm9ybVZhbHVlKCkpO1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQodHJ1ZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICByZW1vdmVHcm91cChncm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2V8QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgaWYgKGdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBtaW5SZXBzID0gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgaWYgKGdyb3VwLnJlcHMgLSAxIDwgbWluUmVwcykge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFJlcHMgPSBncm91cC5yZXBzO1xuICAgICAgZ3JvdXAucmVwcyA9IGdyb3VwLnJlcHMgLSAxO1xuICAgICAgZ3JvdXAuY2FuQWRkID0gZ3JvdXAubm9kZS5tYXhSZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPCBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBncm91cC5jYW5SZW1vdmUgPSBncm91cC5ub2RlLm1pblJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA+IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgIHRoaXMuX2FkanVzdFJlcHMobm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJvbChmaWVsZDogQWpmRmllbGRJbnN0YW5jZSk6IE9ic2VydmFibGU8QWJzdHJhY3RDb250cm9sfG51bGw+IHtcbiAgICByZXR1cm4gdGhpcy5mb3JtR3JvdXAucGlwZShtYXAoKGYpID0+IHtcbiAgICAgIGNvbnN0IGZpZWxkTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZCk7XG4gICAgICByZXR1cm4gZiAhPSBudWxsICYmIGYuY29udGFpbnMoZmllbGROYW1lKSA/IGYuY29udHJvbHNbZmllbGROYW1lXSA6IG51bGw7XG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEVycm9yc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JQb3NpdGlvbnMgPSB0aGlzLl92YWx1ZUNoYW5nZWQucGlwZShcbiAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fbm9kZXMsIHRoaXMuX2Zvcm0pLCBmaWx0ZXIodiA9PiB2WzJdICE9IG51bGwgJiYgdlsyXS5mb3JtICE9IG51bGwpLFxuICAgICAgICBtYXAoKHY6IFt2b2lkLCBBamZOb2RlSW5zdGFuY2VbXSwge2Zvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0PzogQWpmQ29udGV4dH18bnVsbF0pID0+IHtcbiAgICAgICAgICBjb25zdCBub2RlcyA9IHZbMV07XG4gICAgICAgICAgY29uc3QgZm9ybSA9IHZbMl0hLmZvcm0hO1xuICAgICAgICAgIGxldCBjdXJyZW50UG9zaXRpb24gPSAwO1xuICAgICAgICAgIGNvbnN0IGVycm9yczogbnVtYmVyW10gPSBbXTtcbiAgICAgICAgICBub2Rlcy5mb3JFYWNoKChub2RlKSA9PiB7XG4gICAgICAgICAgICBpZiAobm9kZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZSZXBlYXRpbmdTbGlkZSkge1xuICAgICAgICAgICAgICBjb25zdCByc05vZGUgPSBub2RlIGFzIEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2U7XG4gICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcnNOb2RlLnJlcHM7IGkrKykge1xuICAgICAgICAgICAgICAgIGlmIChub2RlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgaWYgKGkgPT0gMCkge1xuICAgICAgICAgICAgICAgICAgICByc05vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZiAoIXZhbGlkU2xpZGUocnNOb2RlLCBpKSkge1xuICAgICAgICAgICAgICAgICAgICBlcnJvcnMucHVzaChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHNOb2RlID0gbm9kZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICBpZiAoc05vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgIHNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgIGlmICghc05vZGUudmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgZm9ybS52YWxpZCA9IGVycm9ycy5sZW5ndGggPT0gMDtcbiAgICAgICAgICB0aGlzLl9zbGlkZXNOdW0ubmV4dChjdXJyZW50UG9zaXRpb24pO1xuICAgICAgICAgIHJldHVybiBlcnJvcnM7XG4gICAgICAgIH0pLFxuICAgICAgICBwdWJsaXNoUmVwbGF5KCksIHJlZkNvdW50KCkpO1xuICAgIHRoaXMuX2Vycm9ycyA9IHRoaXMuX2Vycm9yUG9zaXRpb25zLnBpcGUoXG4gICAgICAgIG1hcChlID0+IGUgIT0gbnVsbCA/IGUubGVuZ3RoIDogMCksIHN0YXJ0V2l0aCgwKSwgcHVibGlzaFJlcGxheSgpLCByZWZDb3VudCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICB9LCB7fSksIHN0YXJ0V2l0aDxBamZSZW5kZXJlclVwZGF0ZU1hcD4oe30pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fZm9ybXVsYU5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICB9LCB7fSksIHN0YXJ0V2l0aDxBamZSZW5kZXJlclVwZGF0ZU1hcD4oe30pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX3dhcm5pbmdOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9ub2Rlc01hcHMgPSBbXG4gICAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXAsIHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcCwgdGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcCxcbiAgICAgIHRoaXMuX2Zvcm11bGFOb2Rlc01hcCwgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwLCB0aGlzLl93YXJuaW5nTm9kZXNNYXAsXG4gICAgICB0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXAsIHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwLFxuICAgICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFxuICAgIF07XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybVN0cmVhbXMoKTogdm9pZCB7XG4gICAgY29uc3QgZm9ybU9icyA9IDxPYnNlcnZhYmxlPHtmb3JtOiBBamZGb3JtIHwgbnVsbCwgY29udGV4dD86IEFqZkNvbnRleHR9Pj50aGlzLl9mb3JtO1xuICAgIGZvcm1PYnNcbiAgICAgICAgLnBpcGUobWFwKChfZm9ybSkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9pbml0Rm9ybUdyb3VwU3RyZWFtcyhuZXcgRm9ybUdyb3VwKHt9KSk7XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvcm1Hcm91cCk7XG4gICAgZm9ybU9ic1xuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIHN3aXRjaE1hcChmb3JtID0+IHtcbiAgICAgICAgICAgICAgaWYgKGZvcm0gPT0gbnVsbCB8fCBmb3JtLmZvcm0gPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYnNPZihmb3JtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBjb25zdCBjaG9pY2VzT3JpZ2lucyA9IGZvcm0uZm9ybS5jaG9pY2VzT3JpZ2lucyB8fCBbXTtcbiAgICAgICAgICAgICAgaWYgKGNob2ljZXNPcmlnaW5zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHJldHVybiBvYnNPZihmb3JtKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gZnJvbShQcm9taXNlLmFsbChjaG9pY2VzT3JpZ2lucy5tYXAoY28gPT4gaW5pdENob2ljZXNPcmlnaW4oY28pKSkpXG4gICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICBtYXAoKCkgPT4gZm9ybSksXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBtYXAoKGZvcm0pID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIChfbm9kZXNJbnN0YW5jZXM6IEFqZk5vZGVJbnN0YW5jZVtdKTogQWpmTm9kZUluc3RhbmNlW10gPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gZm9ybSAhPSBudWxsICYmIGZvcm0uZm9ybSAhPSBudWxsID9cbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICAgICAgICAgICAgICAgICAgICAgIGZsYXR0ZW5Ob2Rlcyhmb3JtLmZvcm0ubm9kZXMpLCBmb3JtLmZvcm0ubm9kZXMsIHVuZGVmaW5lZCwgW10sXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtLmNvbnRleHQgfHwge30pIDpcbiAgICAgICAgICAgICAgICAgICAgW107XG4gICAgICAgICAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgICAgICAgbm9kZXMuZm9yRWFjaCgobm9kZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcnNOb2RlID0gbm9kZSBhcyBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHJzTm9kZS5yZXBzOyBpKyspIHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAobm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50UG9zaXRpb24rKztcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpID09IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgcnNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNOb2RlID0gbm9kZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICBpZiAoc05vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICAgIHNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfSksXG4gICAgICAgICAgICApXG4gICAgICAgIC5zdWJzY3JpYmUodGhpcy5fbm9kZXNVcGRhdGVzKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXROb2RlSW5zdGFuY2UoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlLCBwcmVmaXg6IG51bWJlcltdLCBjb250ZXh0OiBBamZDb250ZXh0LFxuICAgICAgYnJhbmNoVmlzaWJpbGl0eSA9IHRydWUpOiBBamZOb2RlSW5zdGFuY2V8bnVsbCB7XG4gICAgbGV0IGluc3RhbmNlID0gbm9kZVRvTm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgIGlmIChpbnN0YW5jZSAhPSBudWxsKSB7XG4gICAgICBjb25zdCBub2RlVHlwZSA9IGluc3RhbmNlLm5vZGUubm9kZVR5cGU7XG4gICAgICBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZk5vZGVHcm91cCB8fCBub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgdGhpcy5fZXhwbG9kZVJlcGVhdGluZ05vZGUoXG4gICAgICAgICAgICBhbGxOb2RlcywgaW5zdGFuY2UgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIH0gZWxzZSBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlNsaWRlKSB7XG4gICAgICAgIGNvbnN0IHNJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZlNsaWRlSW5zdGFuY2U7XG4gICAgICAgIHNJbnN0YW5jZS5ub2RlcyA9IHRoaXMuX29yZGVyZWROb2Rlc0luc3RhbmNlc1RyZWUoXG4gICAgICAgICAgICBhbGxOb2Rlcywgc0luc3RhbmNlLm5vZGUubm9kZXMsIHNJbnN0YW5jZS5ub2RlLmlkLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgICAgfVxuICAgICAgdXBkYXRlVmlzaWJpbGl0eShpbnN0YW5jZSwgY29udGV4dCwgYnJhbmNoVmlzaWJpbGl0eSk7XG4gICAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKGluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgIGlmIChub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmRmllbGQpIHtcbiAgICAgICAgY29uc3QgZkluc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcblxuICAgICAgICBpZiAoaXNDdXN0b21GaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSB8fCBpc0ZpZWxkV2l0aENob2ljZXMoZkluc3RhbmNlLm5vZGUpKSB7XG4gICAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKGZJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgY29udGV4dCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaWYgKGlzVGFibGVGaWVsZEluc3RhbmNlKGZJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgIGNvbnN0IHRmSW5zdGFuY2UgPSBmSW5zdGFuY2UgYXMgQWpmVGFibGVGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgY29uc3QgdE5vZGUgPSB0Zkluc3RhbmNlLm5vZGU7XG4gICAgICAgICAgICB0Zkluc3RhbmNlLmNvbnRleHQgPSBjb250ZXh0W25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZSh0Zkluc3RhbmNlKV0gfHwgY29udGV4dDtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgbGV0IGNvbnRyb2xzV2l0aExhYmVsczogW3N0cmluZywgKHN0cmluZyB8IEFqZlRhYmxlRm9ybUNvbnRyb2wpW11dW10gPSBbXTtcbiAgICAgICAgICAgIGNvbnRyb2xzV2l0aExhYmVscy5wdXNoKFtub2RlLmxhYmVsLCB0Tm9kZS5jb2x1bW5MYWJlbHNdKTtcbiAgICAgICAgICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCkge1xuICAgICAgICAgICAgICB0Tm9kZS5yb3dzLmZvckVhY2goKHJvdywgcm93SWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IHI6IEFqZlRhYmxlRm9ybUNvbnRyb2xbXSA9IFtdO1xuICAgICAgICAgICAgICAgIChyb3cgYXMgQWpmVGFibGVDZWxsW10pLmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICAgIGV2ZXJ5IGNvbnRyb2wgaXMgcmVnaXN0ZXJlZCB3aXRoIHRoZSBjZWxsIHBvc2l0aW9uXG4gICAgICAgICAgICAgICAgICBpbnNpZGUgdGhlIGZvcm0gY29udHJvbCBtYXRyaXhcbiAgICAgICAgICAgICAgICAgIHdpdGggdGhpcyBtYXNrIGAke3ROb2RlLm5hbWV9X18ke3Jvd0lkeH1fXyR7aWR4fWBcbiAgICAgICAgICAgICAgICAgICovXG4gICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYCR7dE5vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YDtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHRhYmxlRm9ybUNvbnRyb2w6XG4gICAgICAgICAgICAgICAgICAgICAgQWpmVGFibGVGb3JtQ29udHJvbCA9IHtjb250cm9sOiBuZXcgRm9ybUNvbnRyb2woKSwgc2hvdzogZmFsc2V9O1xuICAgICAgICAgICAgICAgICAgdGFibGVGb3JtQ29udHJvbC5jb250cm9sLnNldFZhbHVlKHRmSW5zdGFuY2UuY29udGV4dFtjZWxsLmZvcm11bGFdKTtcbiAgICAgICAgICAgICAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2wobmFtZSwgdGFibGVGb3JtQ29udHJvbC5jb250cm9sKTtcbiAgICAgICAgICAgICAgICAgIHIucHVzaCh0YWJsZUZvcm1Db250cm9sKTtcbiAgICAgICAgICAgICAgICAgIC8qIGNyZWF0ZSBhIG9iamVjdCB0aGF0IHJlc3BlY3QgdGhlIGluc3RhbmNlIGludGVyZmFjZVxuICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgbWluaW11bSBkZWZpbmVkIHByb3BlcnRpZXMgdG8gYWxsb3cgdG8gcnVuIGFkZFRvTm9kZUZvcm11bGEgbWFwKi9cbiAgICAgICAgICAgICAgICAgIGNvbnN0IGZha2VJbnN0YW5jZSA9IHtcbiAgICAgICAgICAgICAgICAgICAgZm9ybXVsYToge2Zvcm11bGE6IGNlbGwuZm9ybXVsYX0sXG4gICAgICAgICAgICAgICAgICAgIG5vZGU6IHtuYW1lLCBub2RlVHlwZTogMCwgZWRpdGFibGU6IGZhbHNlfSxcbiAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgcHJlZml4OiBbXSxcbiAgICAgICAgICAgICAgICAgICAgY29uZGl0aW9uYWxCcmFuY2hlczogW10sXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRFdnQ6IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKVxuICAgICAgICAgICAgICAgICAgfSBhcyB1bmtub3duIGFzIEFqZk5vZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgIHRoaXMuX2FkZFRvTm9kZXNGb3JtdWxhTWFwKGZha2VJbnN0YW5jZSwgY2VsbC5mb3JtdWxhKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb250cm9sc1dpdGhMYWJlbHMucHVzaChbdE5vZGUucm93TGFiZWxzW3Jvd0lkeF0sIHJdKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIHRmSW5zdGFuY2UuY29udHJvbHMgPSBjb250cm9sc1dpdGhMYWJlbHM7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGZJbnN0YW5jZS52YWx1ZSA9IGNvbnRleHRbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlKV07XG4gICAgICAgICAgfVxuICAgICAgICAgIHVwZGF0ZUZpZWxkSW5zdGFuY2VTdGF0ZShmSW5zdGFuY2UsIGNvbnRleHQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICB0aGlzLl9hZGROb2RlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgIH1cbiAgICByZXR1cm4gaW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGp1c3RSZXBzKFxuICAgICAgYWxsTm9kZXM6IEFqZk5vZGVbXXxBamZOb2RlSW5zdGFuY2VbXSwgaW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSxcbiAgICAgIG9sZFJlcHM6IG51bWJlcixcbiAgICAgIGNvbnRleHQ6IEFqZkNvbnRleHQpOiB7YWRkZWQ6IEFqZk5vZGVJbnN0YW5jZVtdfG51bGwsIHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdfG51bGx9IHtcbiAgICBjb25zdCBuZXdSZXBzID0gaW5zdGFuY2UucmVwcztcbiAgICBjb25zdCByZXN1bHQ6XG4gICAgICAgIHthZGRlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbCxcbiAgICAgICAgIHJlbW92ZWQ6IEFqZk5vZGVJbnN0YW5jZVtdfG51bGx9ID0ge2FkZGVkOiBudWxsLCByZW1vdmVkOiBudWxsfTtcbiAgICBpZiAob2xkUmVwcyA8IG5ld1JlcHMpIHtcbiAgICAgIGNvbnN0IG5ld05vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgICAgaWYgKGluc3RhbmNlLm5vZGVzID09IG51bGwpIHtcbiAgICAgICAgaW5zdGFuY2Uubm9kZXMgPSBbXTtcbiAgICAgIH1cbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXApIHtcbiAgICAgICAgY29uc3Qgbm9kZSA9IGNyZWF0ZUZpZWxkKHtcbiAgICAgICAgICAgICAgICAgICAgICAgaWQ6IDk5OSxcbiAgICAgICAgICAgICAgICAgICAgICAgbmFtZTogJycsXG4gICAgICAgICAgICAgICAgICAgICAgIHBhcmVudDogLTEsXG4gICAgICAgICAgICAgICAgICAgICAgIGZpZWxkVHlwZTogQWpmRmllbGRUeXBlLkVtcHR5LFxuICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogaW5zdGFuY2Uubm9kZS5sYWJlbFxuICAgICAgICAgICAgICAgICAgICAgfSkgYXMgQWpmRW1wdHlGaWVsZDtcbiAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPVxuICAgICAgICAgICAgdGhpcy5faW5pdE5vZGVJbnN0YW5jZShhbGxOb2Rlcywgbm9kZSwgaW5zdGFuY2UucHJlZml4LnNsaWNlKDApLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICBpbnN0YW5jZS5ub2Rlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IG9sZFJlcHM7IGkgPCBuZXdSZXBzOyBpKyspIHtcbiAgICAgICAgY29uc3QgcHJlZml4ID0gaW5zdGFuY2UucHJlZml4LnNsaWNlKDApO1xuICAgICAgICBjb25zdCBncm91cCA9IGluc3RhbmNlLm5vZGU7XG4gICAgICAgIHByZWZpeC5wdXNoKGkpO1xuICAgICAgICBvcmRlcmVkTm9kZXMoZ3JvdXAubm9kZXMsIGluc3RhbmNlLm5vZGUuaWQpLmZvckVhY2goKG4pID0+IHtcbiAgICAgICAgICBjb25zdCBuZXdJbnN0YW5jZSA9IHRoaXMuX2luaXROb2RlSW5zdGFuY2UoYWxsTm9kZXMsIG4sIHByZWZpeCwgY29udGV4dCk7XG4gICAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICAgIG5ld05vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICAgICAgaW5zdGFuY2Uubm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgdGhpcy5fYWRkTm9kZUluc3RhbmNlKGluc3RhbmNlKTtcbiAgICAgIH1cbiAgICAgIHJlc3VsdC5hZGRlZCA9IG5ld05vZGVzO1xuICAgIH0gZWxzZSBpZiAob2xkUmVwcyA+IG5ld1JlcHMpIHtcbiAgICAgIGxldCBub2Rlc051bSA9IGluc3RhbmNlLm5vZGVzLmxlbmd0aCAvIG9sZFJlcHM7XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIG5vZGVzTnVtKys7XG4gICAgICB9XG4gICAgICByZXN1bHQucmVtb3ZlZCA9IGluc3RhbmNlLm5vZGVzLnNwbGljZShuZXdSZXBzICogbm9kZXNOdW0sIG5vZGVzTnVtKTtcbiAgICAgIHJlc3VsdC5yZW1vdmVkLmZvckVhY2goKG4gPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVOb2RlSW5zdGFuY2Uobik7XG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChvbGRSZXBzICE9IG5ld1JlcHMgJiYgaW5zdGFuY2UuZm9ybXVsYVJlcHMgPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmcgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSk7XG4gICAgICBpZiAoZmcgIT0gbnVsbCAmJiBmZy5jb250YWlucyhjb21wbGV0ZU5hbWUpKSB7XG4gICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUoaW5zdGFuY2UucmVwcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGluc3RhbmNlLmZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlc0luc3RhbmNlcyhpbnN0YW5jZS5ub2Rlcyk7XG4gICAgaWYgKGluc3RhbmNlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICBjb25zdCByc0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgIGNvbnN0IHNsaWRlTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdW10gPSBbXTtcbiAgICAgIGNvbnN0IG5vZGVzUGVyU2xpZGUgPVxuICAgICAgICAgIHJzSW5zdGFuY2Uubm9kZXMgIT0gbnVsbCA/IHJzSW5zdGFuY2Uubm9kZXMubGVuZ3RoIC8gcnNJbnN0YW5jZS5yZXBzIDogMDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgaW5zdGFuY2UucmVwczsgaSsrKSB7XG4gICAgICAgIGNvbnN0IHN0YXJ0Tm9kZSA9IGkgKiBub2Rlc1BlclNsaWRlO1xuICAgICAgICBzbGlkZU5vZGVzLnB1c2goaW5zdGFuY2Uubm9kZXMuc2xpY2Uoc3RhcnROb2RlLCBzdGFydE5vZGUgKyBub2Rlc1BlclNsaWRlKSk7XG4gICAgICB9XG4gICAgICByc0luc3RhbmNlLnNsaWRlTm9kZXMgPSBzbGlkZU5vZGVzO1xuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlRm9ybVZhbHVlQW5kVmFsaWRpdHkoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXNVcGRhdGVzLmFzT2JzZXJ2YWJsZSgpXG4gICAgICAgIC5waXBlKFxuICAgICAgICAgICAgd2l0aExhdGVzdEZyb20odGhpcy5fZm9ybUdyb3VwKSxcbiAgICAgICAgICAgIGZpbHRlcigodmFsdWVzOiBbQWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24sIEZvcm1Hcm91cHxudWxsXSkgPT4gdmFsdWVzWzFdICE9PSBudWxsKSlcbiAgICAgICAgLnN1YnNjcmliZSgodmFsdWVzOiBbQWpmTm9kZXNJbnN0YW5jZXNPcGVyYXRpb24sIEZvcm1Hcm91cHxudWxsXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGZvcm06IEZvcm1Hcm91cCA9IDxGb3JtR3JvdXA+dmFsdWVzWzFdO1xuICAgICAgICAgIGZvcm0udXBkYXRlVmFsdWVBbmRWYWxpZGl0eSgpO1xuICAgICAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2V4cGxvZGVSZXBlYXRpbmdOb2RlKFxuICAgICAgYWxsTm9kZXM6IEFqZk5vZGVbXXxBamZOb2RlSW5zdGFuY2VbXSxcbiAgICAgIGluc3RhbmNlOiBBamZOb2RlR3JvdXBJbnN0YW5jZXxBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlLCBjb250ZXh0OiBBamZDb250ZXh0KSB7XG4gICAgY29uc3Qgb2xkUmVwcyA9IHVwZGF0ZVJlcHNOdW0oaW5zdGFuY2UsIGNvbnRleHQpO1xuICAgIGlmIChvbGRSZXBzICE9PSBpbnN0YW5jZS5yZXBzKSB7XG4gICAgICB0aGlzLl9hZGp1c3RSZXBzKGFsbE5vZGVzLCBpbnN0YW5jZSwgb2xkUmVwcywgY29udGV4dCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICAgIGFsbE5vZGVzOiBBamZOb2RlW118QWpmTm9kZUluc3RhbmNlW10sIG5vZGVzOiBBamZOb2RlW10sIHBhcmVudDogbnVtYmVyfG51bGwgPSBudWxsLFxuICAgICAgcHJlZml4OiBudW1iZXJbXSA9IFtdLCBjb250ZXh0OiBBamZDb250ZXh0KTogQWpmTm9kZUluc3RhbmNlW10ge1xuICAgIGxldCBub2Rlc0luc3RhbmNlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICBjb25zdCBjdXJTdWZmaXggPSBwcmVmaXgubGVuZ3RoID4gMCA/ICdfXycgKyBwcmVmaXguam9pbignX18nKSA6ICcnO1xuICAgIG9yZGVyZWROb2Rlcyhub2RlcywgcGFyZW50KS5mb3JFYWNoKChub2RlOiBBamZOb2RlKSA9PiB7XG4gICAgICBjb25zdCBwYXJlbnROb2RlSW5zdGFuY2UgPSBub2Rlc0luc3RhbmNlcy5maW5kKFxuICAgICAgICAgIG5pID0+IG5pLm5vZGUuaWQgPT0gbm9kZS5wYXJlbnQgJiYgbm9kZUluc3RhbmNlU3VmZml4KG5pKSA9PSBjdXJTdWZmaXgpO1xuICAgICAgY29uc3QgYnJhbmNoVmlzaWJpbGl0eSA9IHBhcmVudE5vZGVJbnN0YW5jZSAhPSBudWxsID9cbiAgICAgICAgICBwYXJlbnROb2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2ggIT0gbnVsbCAmJlxuICAgICAgICAgICAgICBwYXJlbnROb2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2ggPT0gbm9kZS5wYXJlbnROb2RlIDpcbiAgICAgICAgICB0cnVlO1xuICAgICAgY29uc3Qgbm5pID0gdGhpcy5faW5pdE5vZGVJbnN0YW5jZShhbGxOb2Rlcywgbm9kZSwgcHJlZml4LCBjb250ZXh0LCBicmFuY2hWaXNpYmlsaXR5KTtcbiAgICAgIGlmIChubmkgIT0gbnVsbCkge1xuICAgICAgICBub2Rlc0luc3RhbmNlcy5wdXNoKG5uaSk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgcmV0dXJuIG5vZGVzSW5zdGFuY2VzO1xuICB9XG5cbiAgcHJpdmF0ZSBfZm9ybVZhbHVlRGVsdGEob2xkVmFsdWU6IGFueSwgbmV3VmFsdWU6IGFueSk6IHN0cmluZ1tdIHtcbiAgICByZXR1cm4gT2JqZWN0LmtleXMobmV3VmFsdWUpLmZpbHRlcigoaykgPT4gb2xkVmFsdWVba10gIT09IG5ld1ZhbHVlW2tdKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtR3JvdXBTdHJlYW1zKGZvcm1Hcm91cDogRm9ybUdyb3VwKTogRm9ybUdyb3VwIHtcbiAgICB0aGlzLl9mb3JtR3JvdXBTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICBsZXQgaW5pdCA9IHRydWU7XG4gICAgbGV0IGluaXRGb3JtID0gdHJ1ZTtcbiAgICB0aGlzLl9mb3JtSW5pdEV2ZW50LmVtaXQoQWpmRm9ybUluaXRTdGF0dXMuSW5pdGlhbGl6aW5nKTtcbiAgICB0aGlzLl9mb3JtR3JvdXBTdWJzY3JpcHRpb24gPVxuICAgICAgICBmb3JtR3JvdXAudmFsdWVDaGFuZ2VzXG4gICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICBzdGFydFdpdGg8YW55Pih7fSksIHBhaXJ3aXNlKCksIGRlYm91bmNlVGltZSgyMDApLFxuICAgICAgICAgICAgICAgIHdpdGhMYXRlc3RGcm9tPFxuICAgICAgICAgICAgICAgICAgICBbYW55LCBhbnldLFxuICAgICAgICAgICAgICAgICAgICBbXG4gICAgICAgICAgICAgICAgICAgICAgW2FueSwgYW55XSwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgQWpmTm9kZUluc3RhbmNlW11cbiAgICAgICAgICAgICAgICAgICAgXT4oLi4uKHRoaXMuX25vZGVzTWFwcyksIHRoaXMuX2ZsYXROb2RlcykpXG4gICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgW2FueSwgYW55XSwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmTm9kZUluc3RhbmNlW11cbiAgICAgICAgICAgICAgICAgICAgICAgXSkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBvbGRGb3JtVmFsdWUgPSBpbml0ICYmIHt9IHx8IHZbMF1bMF07XG4gICAgICAgICAgICAgIGluaXQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgY29uc3QgbmV3Rm9ybVZhbHVlID0gdlswXVsxXTtcbiAgICAgICAgICAgICAgY29uc3QgdmlzaWJpbGl0eU1hcCA9IHZbMV07XG4gICAgICAgICAgICAgIGNvbnN0IHJlcGV0aXRpb25NYXAgPSB2WzJdO1xuICAgICAgICAgICAgICBjb25zdCBjb25kaXRpb25hbEJyYW5jaGVzTWFwID0gdlszXTtcbiAgICAgICAgICAgICAgY29uc3QgZm9ybXVsYU1hcCA9IHZbNF07XG4gICAgICAgICAgICAgIGNvbnN0IHZhbGlkYXRpb25NYXAgPSB2WzVdO1xuICAgICAgICAgICAgICBjb25zdCB3YXJuaW5nTWFwID0gdls2XTtcbiAgICAgICAgICAgICAgY29uc3QgbmV4dFNsaWRlQ29uZGl0aW9uc01hcCA9IHZbN107XG4gICAgICAgICAgICAgIGNvbnN0IGZpbHRlcmVkQ2hvaWNlc01hcCA9IHZbOF07XG4gICAgICAgICAgICAgIGNvbnN0IHRyaWdnZXJDb25kaXRpb25zTWFwID0gdls5XTtcbiAgICAgICAgICAgICAgY29uc3Qgbm9kZXMgPSB2WzEwXTtcblxuICAgICAgICAgICAgICAvLyB0YWtlcyB0aGUgbmFtZXMgb2YgdGhlIGZpZWxkcyB0aGF0IGhhdmUgY2hhbmdlZFxuICAgICAgICAgICAgICBjb25zdCBkZWx0YSA9IHRoaXMuX2Zvcm1WYWx1ZURlbHRhKG9sZEZvcm1WYWx1ZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgY29uc3QgZGVsdGFMZW4gPSBkZWx0YS5sZW5ndGg7XG4gICAgICAgICAgICAgIGxldCB1cGRhdGVkTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG5cbiAgICAgICAgICAgICAgLypcbiAgICAgICAgICAgICAgICBmb3IgZWFjaCBmaWVsZCB1cGRhdGUgYWxsIHByb3BlcnRpZXMgbWFwXG4gICAgICAgICAgICAgICAgd2l0aCB0aGUgZm9sbG93aW5nIHJ1bGUgIFwiaWYgZmllbGRuYW1lIGlzIGluIG1hcCB1cGRhdGUgaXRcIiBhbmRcbiAgICAgICAgICAgICAgICBwdXNoIG9uIHVwZGF0ZU5vZGVzIHRoZSBub2RlIGluc3RhbmNlIHRoYXQgd3JhcCBmaWVsZFxuICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICBkZWx0YS5mb3JFYWNoKChmaWVsZE5hbWUpID0+IHtcbiAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMgPSB1cGRhdGVkTm9kZXMuY29uY2F0KFxuICAgICAgICAgICAgICAgICAgICBub2Rlcy5maWx0ZXIobiA9PiBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobikgPT09IGZpZWxkTmFtZSkpO1xuICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5TWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgdmlzaWJpbGl0eU1hcFtmaWVsZE5hbWVdLmZvckVhY2gobm9kZUluc3RhbmNlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29tcGxldGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlDaGFuZ2VkID0gdXBkYXRlVmlzaWJpbGl0eShub2RlSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGlzRmllbGQgPSBpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKHZpc2liaWxpdHlDaGFuZ2VkICYmICFub2RlSW5zdGFuY2UudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHMgPSB0aW1lcigyMDApLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzICYmICFzLmNsb3NlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICBmZy5jb250cm9sc1tjb21wbGV0ZU5hbWVdLnNldFZhbHVlKG51bGwpO1xuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UpLnZhbHVlID0gbnVsbDtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodmlzaWJpbGl0eUNoYW5nZWQgJiYgbm9kZUluc3RhbmNlLnZpc2libGUgJiYgaXNGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzID0gdXBkYXRlRm9ybXVsYShub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgIT0gbnVsbCAmJiByZXMuY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShyZXMudmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAocmVwZXRpdGlvbk1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHJlcGV0aXRpb25NYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZUluc3RhbmNlLm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgcm5JbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3Qgb2xkUmVwcyA9IHVwZGF0ZVJlcHNOdW0ocm5JbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAob2xkUmVwcyAhPT0gcm5JbnN0YW5jZS5yZXBzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGp1c3RSZXBzKG5vZGVzLCBybkluc3RhbmNlLCBvbGRSZXBzLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoY29uZGl0aW9uYWxCcmFuY2hlc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXNNYXBbZmllbGROYW1lXS5mb3JFYWNoKChub2RlSW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgLy8gY29uc3QgYnJhbmNoQ2hhbmdlZCA9IG5vZGVJbnN0YW5jZS51cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZUNvbmRpdGlvbmFsQnJhbmNoZXMobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAvLyBpZiAoYnJhbmNoQ2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2ZXJpZmllZEJyYW5jaCA9IG5vZGVJbnN0YW5jZS52ZXJpZmllZEJyYW5jaDtcbiAgICAgICAgICAgICAgICAgICAgbm9kZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoX2NvbmRpdGlvbiwgaWR4KSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGlkeCA9PSB2ZXJpZmllZEJyYW5jaCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fc2hvd1N1YnRyZWUobmV3Rm9ybVZhbHVlLCBub2Rlcywgbm9kZUluc3RhbmNlLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl9oaWRlU3VidHJlZShuZXdGb3JtVmFsdWUsIG5vZGVzLCBub2RlSW5zdGFuY2UsIGlkeCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZm9ybXVsYU1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGZvcm11bGFNYXBbZmllbGROYW1lXS5mb3JFYWNoKChub2RlSW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgcmVzID0gdXBkYXRlRm9ybXVsYShmSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZmcgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZmcgIT0gbnVsbCAmJiByZXMuY2hhbmdlZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlVmFsaWRhdGlvbihmSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgICBmZy5jb250cm9sc1tub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUluc3RhbmNlKV0uc2V0VmFsdWUocmVzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRpb25NYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB2YWxpZGF0aW9uTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIG5ld0Zvcm1WYWx1ZS4kdmFsdWUgPSBuZXdGb3JtVmFsdWVbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSldO1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZhbGlkYXRpb24oXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlLCB0aGlzLmN1cnJlbnRTdXBwbGVtZW50YXJ5SW5mb3JtYXRpb25zKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAod2FybmluZ01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHdhcm5pbmdNYXBbZmllbGROYW1lXS5mb3JFYWNoKChub2RlSW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlV2FybmluZyhmSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZJbnN0YW5jZS53YXJuaW5nUmVzdWx0cyAhPSBudWxsICYmXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZS53YXJuaW5nUmVzdWx0cy5maWx0ZXIod2FybmluZyA9PiB3YXJuaW5nLnJlc3VsdCkubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgZkluc3RhbmNlLndhcm5pbmdUcmlnZ2VyLmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhTGVuID09IDEgJiYgbmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChuZXh0U2xpZGVDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLmZpbHRlcigobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVOZXh0U2xpZGVDb25kaXRpb24oZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9uZXh0U2xpZGVUcmlnZ2VyLmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZmlsdGVyZWRDaG9pY2VzTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgZmlsdGVyZWRDaG9pY2VzTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkV2l0aENob2ljZXMoZkluc3RhbmNlLm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVGaWx0ZXJlZENob2ljZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZkluc3RhbmNlIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+LCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAodXBkYXRlZE5vZGVzLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMucHVzaChub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBpZiAoZGVsdGFMZW4gPT0gMSAmJiB0cmlnZ2VyQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHRyaWdnZXJDb25kaXRpb25zTWFwW2ZpZWxkTmFtZV0uZmlsdGVyKChub2RlSW5zdGFuY2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFpc0ZpZWxkV2l0aENob2ljZXMoZkluc3RhbmNlLm5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB1cGRhdGVUcmlnZ2VyQ29uZGl0aW9ucyhcbiAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgaWYgKHJlcy5sZW5ndGggPT0gMSkge1xuICAgICAgICAgICAgICAgICAgICAocmVzWzBdIGFzIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZTxhbnk+KS5zZWxlY3Rpb25UcmlnZ2VyLmVtaXQoKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB1cGRhdGVkTm9kZXMuZm9yRWFjaChuID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBub2RlSWR4ID0gbm9kZXMuaW5kZXhPZihuKTtcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gbm9kZUlkeCAtIDE7XG4gICAgICAgICAgICAgICAgd2hpbGUgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCBjdXJOb2RlID0gbm9kZXNbaWR4XTtcbiAgICAgICAgICAgICAgICAgIGlmIChpc1NsaWRlc0luc3RhbmNlKGN1ck5vZGUpKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNsaWRlID0gY3VyTm9kZSBhcyAoQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdWJOb2Rlc051bSA9IHNsaWRlLmZsYXROb2Rlcy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgICAgIGxldCB2YWxpZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc3ViTm9kZXNOdW07IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk5vZGUgPSBzbGlkZS5mbGF0Tm9kZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHN1Yk5vZGUudmlzaWJsZSAmJiBpc0ZpZWxkSW5zdGFuY2Uoc3ViTm9kZSkgJiZcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIShzdWJOb2RlIGFzIEFqZkZpZWxkSW5zdGFuY2UpLnZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZS52YWxpZCAhPT0gdmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzbGlkZS52YWxpZCA9IHZhbGlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLnVwZGF0ZWRFdnQuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWR4LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG4udXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoaW5pdEZvcm0pIHtcbiAgICAgICAgICAgICAgICBpbml0Rm9ybSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1Jbml0RXZlbnQuZW1pdChBamZGb3JtSW5pdFN0YXR1cy5Db21wbGV0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VkLm5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIHJldHVybiBmb3JtR3JvdXA7XG4gIH1cblxuICBwcml2YXRlIF9zaG93U3VidHJlZShcbiAgICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgbm9kZTogQWpmTm9kZUluc3RhbmNlLCBicmFuY2g/OiBudW1iZXIpIHtcbiAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2Rlcywgbm9kZSwgdHJ1ZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVTdWJ0cmVlKFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCwgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UsIGJyYW5jaD86IG51bWJlcikge1xuICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBub2RlLCBmYWxzZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCwgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UsIHZpc2libGU6IGJvb2xlYW4sXG4gICAgICBicmFuY2g/OiBudW1iZXIpIHtcbiAgICBsZXQgc3ViTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdO1xuICAgIGNvbnN0IG5vZGVTdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobm9kZSk7XG4gICAgaWYgKGJyYW5jaCAhPSBudWxsKSB7XG4gICAgICBzdWJOb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG4pO1xuICAgICAgICByZXR1cm4gc3VmZml4ID09IG5vZGVTdWZmaXggJiYgbi5ub2RlLnBhcmVudCA9PSBub2RlLm5vZGUuaWQgJiYgbi5ub2RlLnBhcmVudE5vZGUgPT0gYnJhbmNoO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Yk5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4ge1xuICAgICAgICBjb25zdCBzdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobik7XG4gICAgICAgIHJldHVybiBzdWZmaXggPT0gbm9kZVN1ZmZpeCAmJiBuLm5vZGUucGFyZW50ID09IG5vZGUubm9kZS5pZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBpc0NvbnRhaW5lciA9IGlzQ29udGFpbmVyTm9kZShub2RlLm5vZGUpO1xuICAgIHN1Yk5vZGVzLmZvckVhY2goKG4pID0+IHtcbiAgICAgIGlmICghaXNDb250YWluZXIgfHxcbiAgICAgICAgICAoaXNDb250YWluZXIgJiYgKDxBamZOb2RlR3JvdXA+bm9kZS5ub2RlKS5ub2Rlcy5maW5kKGNuID0+IGNuLmlkID09IG4ubm9kZS5pZCkgPT0gbnVsbCkpIHtcbiAgICAgICAgdXBkYXRlVmlzaWJpbGl0eShuLCBjb250ZXh0LCB2aXNpYmxlKTtcbiAgICAgICAgdXBkYXRlRm9ybXVsYShuIGFzIEFqZkZvcm11bGFGaWVsZEluc3RhbmNlLCBjb250ZXh0KTtcbiAgICAgICAgdGhpcy5fdXBkYXRlU3VidHJlZVZpc2liaWxpdHkoY29udGV4dCwgbm9kZXMsIG4sIHZpc2libGUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdE5vZGVzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2RlcyA9XG4gICAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5waXBlKHNjYW4oKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgb3A6IEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKG5vZGVzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSwgW10pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl9mbGF0Tm9kZXNUcmVlID0gdGhpcy5fbm9kZXMucGlwZShtYXAobm9kZXMgPT4gZmxhdHRlbk5vZGVzSW5zdGFuY2VzVHJlZShub2RlcykpLCBzaGFyZSgpKTtcbiAgICB0aGlzLl9mbGF0Tm9kZXMgPSB0aGlzLl9mbGF0Tm9kZXNUcmVlLnBpcGUoXG4gICAgICAgIG1hcChzbGlkZXMgPT4ge1xuICAgICAgICAgIGxldCBub2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgICAgICBzbGlkZXMuZm9yRWFjaChzID0+IHtcbiAgICAgICAgICAgIG5vZGVzLnB1c2gocyk7XG4gICAgICAgICAgICBub2RlcyA9IG5vZGVzLmNvbmNhdChzLmZsYXROb2Rlcyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICB9KSxcbiAgICAgICAgc2hhcmUoKSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2RlSW5zdGFuY2Uobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpOiBBamZOb2RlSW5zdGFuY2Uge1xuICAgIGNvbnN0IG5vZGVOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNWaXNpYmlsaXR5TWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzUmVwZXRpdGlvbk1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzRm9ybXVsYU1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1ZhbGlkYXRpb25NYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNXYXJuaW5nTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIGlmIChpc1NsaWRlc0luc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9yZW1vdmVTbGlkZUluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZCYXNlU2xpZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUobm9kZUluc3RhbmNlLm5vZGUpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVOb2RlR3JvdXBJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlKTtcbiAgICB9XG5cbiAgICByZXR1cm4gbm9kZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlU2xpZGVJbnN0YW5jZShzbGlkZUluc3RhbmNlOiBBamZCYXNlU2xpZGVJbnN0YW5jZSk6IEFqZkJhc2VTbGlkZUluc3RhbmNlIHtcbiAgICBjb25zdCBzbGlkZSA9IHNsaWRlSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAoc2xpZGUudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKHNsaWRlSW5zdGFuY2UsIHNsaWRlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgc2xpZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKHNsaWRlSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNsaWRlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2RlR3JvdXBJbnN0YW5jZShub2RlR3JvdXBJbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKTpcbiAgICAgIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZUdyb3VwID0gbm9kZUdyb3VwSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAobm9kZUdyb3VwLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChub2RlR3JvdXBJbnN0YW5jZSwgbm9kZUdyb3VwLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgaWYgKG5vZGVHcm91cEluc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwgJiYgbm9kZUdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICB9XG4gICAgcmV0dXJuIG5vZGVHcm91cEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRmllbGRJbnN0YW5jZShmaWVsZEluc3RhbmNlOiBBamZGaWVsZEluc3RhbmNlKTogQWpmRmllbGRJbnN0YW5jZSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgY29uc3QgZmllbGRJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoZmllbGRJbnN0YW5jZSk7XG4gICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmIGZvcm1Hcm91cC5jb250YWlucyhmaWVsZEluc3RhbmNlTmFtZSkpIHtcbiAgICAgIGZvcm1Hcm91cC5yZW1vdmVDb250cm9sKGZpZWxkSW5zdGFuY2VOYW1lKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIGRlbGV0ZSB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBmaWVsZEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcblxuICAgIGlmIChmaWVsZEluc3RhbmNlLmZvcm11bGEpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0Zvcm11bGFNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhLmZvcm11bGEpO1xuICAgIH1cblxuICAgIC8vIFRPRE86IGNoZWNrIHRoaXMsIHByb2JhYmx5IGlzIG5ldmVyIHZlcmlmaWVkXG4gICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShmaWVsZEluc3RhbmNlLm5vZGUpKSB7XG4gICAgICBjb25zdCByY0luc3RhbmNlID0gKGZpZWxkSW5zdGFuY2UgYXMgQWpmTm9kZUluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk7XG4gICAgICBpZiAocmNJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAoZmllbGRJbnN0YW5jZSwgcmNJbnN0YW5jZS5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwgJiYgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1ZhbGlkYXRpb25NYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS53YXJuaW5nICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2Uud2FybmluZy5jb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNXYXJuaW5nTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAoXG4gICAgICAgICAgZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKGZpZWxkSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgIGNvbnN0IGZ3Y0luc3RhbmNlID0gZmllbGRJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PjtcbiAgICAgIGlmIChmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwKGZpZWxkSW5zdGFuY2UsIGZ3Y0luc3RhbmNlLmNob2ljZXNGaWx0ZXIuZm9ybXVsYSk7XG4gICAgICAgIGlmIChmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgICAgZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZE5vZGVHcm91cEluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNTbGlkZUluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZGRTbGlkZUluc3RhbmNlKG5vZGVJbnN0YW5jZSBhcyBBamZTbGlkZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZEZpZWxkSW5zdGFuY2UoZmllbGRJbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSk6IEFqZkZpZWxkSW5zdGFuY2Uge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGNvbnN0IGZpZWxkSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGZpZWxkSW5zdGFuY2UpO1xuICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiAhZm9ybUdyb3VwLmNvbnRhaW5zKGZpZWxkSW5zdGFuY2VOYW1lKSkge1xuICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgICAgY29udHJvbC5zZXRWYWx1ZShmaWVsZEluc3RhbmNlLnZhbHVlKTtcbiAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2woZmllbGRJbnN0YW5jZU5hbWUsIGNvbnRyb2wpO1xuICAgIH1cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIGlmICh2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPSBbXTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0uaW5kZXhPZihmaWVsZEluc3RhbmNlKSA9PSAtMSkge1xuICAgICAgICAgIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdLnB1c2goZmllbGRJbnN0YW5jZSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmlzaWJpbGl0eSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBmaWVsZEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhKSB7XG4gICAgICB0aGlzLl9hZGRUb05vZGVzRm9ybXVsYU1hcChmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLmZvcm11bGEuZm9ybXVsYSk7XG4gICAgfVxuXG4gICAgaWYgKGlzTm9kZUdyb3VwSW5zdGFuY2UoZmllbGRJbnN0YW5jZSkpIHtcbiAgICAgIGNvbnN0IG5nSW5zdGFuY2UgPSBmaWVsZEluc3RhbmNlIGFzIEFqZk5vZGVJbnN0YW5jZSBhcyBBamZOb2RlR3JvdXBJbnN0YW5jZTtcbiAgICAgIGlmIChuZ0luc3RhbmNlLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1JlcGV0aXRpb25NYXAoZmllbGRJbnN0YW5jZSwgbmdJbnN0YW5jZS5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uICE9IG51bGwgJiYgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS52YWxpZGF0aW9uLmNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNWYWxpZGF0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2Uud2FybmluZyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1dhcm5pbmdNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAoXG4gICAgICAgICAgZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5uZXh0U2xpZGVDb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICB9XG5cbiAgICBpZiAoaXNDdXN0b21GaWVsZFdpdGhDaG9pY2VzKGZpZWxkSW5zdGFuY2Uubm9kZSkgfHwgaXNGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2UoZmllbGRJbnN0YW5jZSkpIHtcbiAgICAgIGNvbnN0IGZ3Y0luc3RhbmNlID0gZmllbGRJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PjtcbiAgICAgIGlmIChmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChmaWVsZEluc3RhbmNlLCBmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyLmZvcm11bGEpO1xuICAgICAgfVxuICAgICAgaWYgKGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgICAgICB0aGlzLl9hZGRUb05vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBmaWVsZEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkU2xpZGVJbnN0YW5jZShzbGlkZUluc3RhbmNlOiBBamZTbGlkZUluc3RhbmNlKTogQWpmU2xpZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgc2xpZGUgPSBzbGlkZUluc3RhbmNlLm5vZGU7XG4gICAgaWYgKHNsaWRlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAoc2xpZGVJbnN0YW5jZSwgc2xpZGUudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBzbGlkZUluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKHNsaWRlSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG4gICAgcmV0dXJuIHNsaWRlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGROb2RlR3JvdXBJbnN0YW5jZShub2RlR3JvdXBJbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKTpcbiAgICAgIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgbm9kZUdyb3VwID0gbm9kZUdyb3VwSW5zdGFuY2Uubm9kZTtcbiAgICBpZiAobm9kZUdyb3VwLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIG5vZGVHcm91cEluc3RhbmNlLmNvbmRpdGlvbmFsQnJhbmNoZXMuZm9yRWFjaCgoY29uZGl0aW9uYWxCcmFuY2g6IEFqZkNvbmRpdGlvbikgPT4ge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVHcm91cEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuICAgIGlmIChub2RlR3JvdXBJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICBpZiAobm9kZUdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC5mb3JtdWxhUmVwcy5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgbGV0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgbGV0IG5vZGVHcm91cEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlR3JvdXBJbnN0YW5jZSk7XG4gICAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgIWZvcm1Hcm91cC5jb250YWlucyhub2RlR3JvdXBJbnN0YW5jZU5hbWUpKSB7XG4gICAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICAgICAgY29udHJvbC5zZXRWYWx1ZShub2RlR3JvdXBJbnN0YW5jZS5yZXBzKTtcbiAgICAgICAgZm9ybUdyb3VwLnJlZ2lzdGVyQ29udHJvbChub2RlR3JvdXBJbnN0YW5jZU5hbWUsIGNvbnRyb2wpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gbm9kZUdyb3VwSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1Zpc2liaWxpdHlNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1JlcGV0aXRpb25NYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzRm9ybXVsYU1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzVmFsaWRhdGlvbk1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzV2FybmluZ01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzRmlsdGVyZWRDaG9pY2VzTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIGluZGV4KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZU5vZGVzTWFwSW5kZXgobm9kZXNNYXA6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+LCBpbmRleDogc3RyaW5nKSB7XG4gICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICBpZiAoT2JqZWN0LmtleXModm1hcCkuaW5kZXhPZihpbmRleCkgPiAtMSkge1xuICAgICAgICBkZWxldGUgdm1hcFtpbmRleF07XG4gICAgICB9XG4gICAgICByZXR1cm4gdm1hcDtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzUmVwZXRpdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTpcbiAgICAgIHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0Zvcm11bGFNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzVmFsaWRhdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNXYXJuaW5nTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOlxuICAgICAgdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6XG4gICAgICB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc01hcChcbiAgICAgIG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiwgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgICBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgdG9rZW5zID0gdG9rZW5pemUoZm9ybXVsYSkuZmlsdGVyKFxuICAgICAgICAodG9rZW46IGFueSkgPT4gdG9rZW4udHlwZSA9PSAnSWRlbnRpZmllcicgJiYgdG9rZW4udmFsdWUgIT0gJyR2YWx1ZScpO1xuICAgIGlmICh0b2tlbnMubGVuZ3RoID4gMCkge1xuICAgICAgbm9kZXNNYXAubmV4dCgodm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXApOiBBamZSZW5kZXJlclVwZGF0ZU1hcCA9PiB7XG4gICAgICAgIHRva2Vucy5mb3JFYWNoKCh0b2tlbjogYW55KSA9PiB7XG4gICAgICAgICAgbGV0IHRva2VuTmFtZSA9IHRva2VuLnZhbHVlO1xuICAgICAgICAgIGlmICh2bWFwW3Rva2VuTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgY29uc3QgaWR4ID0gdm1hcFt0b2tlbk5hbWVdLmluZGV4T2Yobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgIGlmIChpZHggPiAtMSkge1xuICAgICAgICAgICAgICB2bWFwW3Rva2VuTmFtZV0uc3BsaWNlKGlkeCwgMSk7XG4gICAgICAgICAgICAgIGlmICh2bWFwW3Rva2VuTmFtZV0ubGVuZ3RoID09IDApIHtcbiAgICAgICAgICAgICAgICBkZWxldGUgdm1hcFt0b2tlbk5hbWVdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVmlzaWJpbGl0eU1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNGb3JtdWxhTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2Zvcm11bGFOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVmFsaWRhdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1dhcm5pbmdNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNNYXAoXG4gICAgICBub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgICAgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IHRva2VucyA9IHRva2VuaXplKGZvcm11bGEpLmZpbHRlcihcbiAgICAgICAgKHRva2VuOiBhbnkpID0+IHRva2VuLnR5cGUgPT0gJ0lkZW50aWZpZXInICYmIHRva2VuLnZhbHVlICE9ICckdmFsdWUnKTtcbiAgICBpZiAodG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICB0b2tlbnMuZm9yRWFjaCgodG9rZW46IGFueSkgPT4ge1xuICAgICAgICAgIGxldCB0b2tlbk5hbWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgICBpZiAodm1hcFt0b2tlbk5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICAgIHZtYXBbdG9rZW5OYW1lXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodm1hcFt0b2tlbk5hbWVdLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHZtYXBbdG9rZW5OYW1lXS5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==