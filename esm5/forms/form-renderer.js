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
import { BehaviorSubject, Observable, Subject, Subscription, timer } from 'rxjs';
import { debounceTime, filter, map, pairwise, publishReplay, refCount, scan, share, startWith, withLatestFrom } from 'rxjs/operators';
import { AjfFieldType } from './interface/fields/field-type';
import { AjfNodeType } from './interface/nodes/node-type';
import { isCustomFieldWithChoices } from './utils/fields/is-custom-field-with-choices';
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
export var AjfFormInitStatus;
(function (AjfFormInitStatus) {
    AjfFormInitStatus[AjfFormInitStatus["Initializing"] = 0] = "Initializing";
    AjfFormInitStatus[AjfFormInitStatus["Complete"] = 1] = "Complete";
})(AjfFormInitStatus || (AjfFormInitStatus = {}));
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
        get: function () { return this._errorPositions; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRendererService.prototype, "errors", {
        get: function () { return this._errors; },
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
            this._visibilityNodesMap,
            this._repetitionNodesMap,
            this._conditionalBranchNodesMap,
            this._formulaNodesMap,
            this._validationNodesMap,
            this._warningNodesMap,
            this._nextSlideConditionsNodesMap,
            this._filteredChoicesNodesMap,
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
            .pipe(map(function (form) {
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
                                    var control = new FormControl();
                                    control.setValue(tfInstance_1.context[cell.formula]);
                                    formGroup_1
                                        .registerControl(name, control);
                                    r.push(control);
                                    /* create a object that respect the instance interface
                                    with the minimum defined properties to allow to run addToNodeFormula map*/
                                    var fakeInstance = {
                                        formula: { formula: cell.formula },
                                        node: {
                                            name: name,
                                            nodeType: 0,
                                            editable: false
                                        },
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
        var result = {
            added: null,
            removed: null
        };
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
                orderedNodes(group.nodes, instance.node.id)
                    .forEach(function (n) {
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
        return Object.keys(newValue)
            .filter(function (k) { return oldValue[k] !== newValue[k]; });
    };
    AjfFormRendererService.prototype._initFormGroupStreams = function (formGroup) {
        var _this = this;
        this._formGroupSubscription.unsubscribe();
        var init = true;
        var initForm = true;
        this._formInitEvent.emit(AjfFormInitStatus.Initializing);
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
                                if (subNode.visible && isFieldInstance(subNode)
                                    && !subNode.valid) {
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
                    _this._formInitEvent.emit(AjfFormInitStatus.Complete);
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
        var tokens = tokenize(formula)
            .filter(function (token) { return token.type == 'Identifier' && token.value != '$value'; });
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
        var tokens = tokenize(formula)
            .filter(function (token) { return token.type == 'Identifier' && token.value != '$value'; });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1yZW5kZXJlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0tcmVuZGVyZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHOztBQUdILE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUN6QyxPQUFPLEVBQUMsWUFBWSxFQUFFLFVBQVUsRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUN2RCxPQUFPLEVBQWtCLFdBQVcsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEtBQUssT0FBTyxNQUFNLFNBQVMsQ0FBQztBQUNuQyxPQUFPLEVBQUMsZUFBZSxFQUFFLFVBQVUsRUFBRSxPQUFPLEVBQWMsWUFBWSxFQUFFLEtBQUssRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUMzRixPQUFPLEVBQ0wsWUFBWSxFQUFFLE1BQU0sRUFBRSxHQUFHLEVBQUUsUUFBUSxFQUFFLGFBQWEsRUFBRSxRQUFRLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxTQUFTLEVBQ3BGLGNBQWMsRUFDZixNQUFNLGdCQUFnQixDQUFDO0FBU3hCLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQVMzRCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sNkJBQTZCLENBQUM7QUFReEQsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sNkNBQTZDLENBQUM7QUFDckYsT0FBTyxFQUFDLDBCQUEwQixFQUFDLE1BQU0seURBQXlELENBQUM7QUFDbkcsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDdEYsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0sc0RBQXNELENBQUM7QUFDOUYsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sa0RBQWtELENBQUM7QUFDdkYs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QUFJLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxtQ0FBbUMsRUFBRSxZQUFZLEVBQUUsT0FBTyxDQUFDLENBQUM7SUFDdkYsQ0FBQztJQUVPLCtDQUFjLEdBQXRCLFVBQ0ksUUFBZ0QsRUFBRSxZQUE2QixFQUMvRSxPQUFlO1FBQ2pCLElBQUksTUFBTSxHQUFHLFFBQVEsQ0FBQyxPQUFPLENBQUM7YUFDM0IsTUFBTSxDQUFDLFVBQUMsS0FBVSxJQUFLLE9BQUEsS0FBSyxDQUFDLElBQUksSUFBSSxZQUFZLElBQUksS0FBSyxDQUFDLEtBQUssSUFBSSxRQUFRLEVBQXJELENBQXFELENBQUMsQ0FBQztRQUNqRixJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3JCLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBQyxJQUEwQjtnQkFDdkMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFDLEtBQVU7b0JBQ3hCLElBQUksU0FBUyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7b0JBQzVCLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLElBQUksRUFBRTt3QkFDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztxQkFDdEI7b0JBQ0QsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO3dCQUNoRCxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO3FCQUNwQztnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFDSCxPQUFPLElBQUksQ0FBQztZQUNkLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOztnQkE1ckNGLFVBQVU7Ozs7Z0JBVkgsb0JBQW9COztJQXVzQzVCLDZCQUFDO0NBQUEsQUE3ckNELElBNnJDQztTQTVyQ1ksc0JBQXNCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvbiwgQWpmQ29udGV4dH0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtFdmVudEVtaXR0ZXIsIEluamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtBYnN0cmFjdENvbnRyb2wsIEZvcm1Db250cm9sLCBGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCAqIGFzIGVzcHJpbWEgZnJvbSAnZXNwcmltYSc7XG5pbXBvcnQge0JlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSwgU3ViamVjdCwgU3Vic2NyaWJlciwgU3Vic2NyaXB0aW9uLCB0aW1lcn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge1xuICBkZWJvdW5jZVRpbWUsIGZpbHRlciwgbWFwLCBwYWlyd2lzZSwgcHVibGlzaFJlcGxheSwgcmVmQ291bnQsIHNjYW4sIHNoYXJlLCBzdGFydFdpdGgsXG4gIHdpdGhMYXRlc3RGcm9tXG59IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZkZpZWxkV2l0aENob2ljZXNJbnN0YW5jZVxufSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2ZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZvcm11bGFGaWVsZEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMtaW5zdGFuY2VzL2Zvcm11bGEtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZUZpZWxkSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy1pbnN0YW5jZXMvdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZFbXB0eUZpZWxkfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZW1wdHktZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvZm9ybSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlXG59IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctY29udGFpbmVyLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy9ub2RlJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy9ub2RlLWdyb3VwJztcbmltcG9ydCB7QWpmTm9kZVR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzL25vZGUtdHlwZSc7XG5pbXBvcnQge0FqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9ufSBmcm9tICcuL2ludGVyZmFjZS9vcGVyYXRpb25zL25vZGVzLWluc3RhbmNlcy1vcGVyYXRpb24nO1xuaW1wb3J0IHtBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbn0gZnJvbSAnLi9pbnRlcmZhY2Uvb3BlcmF0aW9ucy9yZW5kZXJlci11cGRhdGUtbWFwLW9wZXJhdGlvbic7XG5pbXBvcnQge0FqZlJlbmRlcmVyVXBkYXRlTWFwfSBmcm9tICcuL2ludGVyZmFjZS9yZW5kZXJlci1tYXBzL3VwZGF0ZS1tYXAnO1xuaW1wb3J0IHtBamZCYXNlU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9iYXNlLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3NsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvdGFibGUtZmllbGQnO1xuaW1wb3J0IHtpc0N1c3RvbUZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzL2lzLWN1c3RvbS1maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2lzVGFibGVGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvaXMtdGFibGUtZmllbGQtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVGaWVsZEluc3RhbmNlU3RhdGV9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmllbGQtaW5zdGFuY2Utc3RhdGUnO1xuaW1wb3J0IHt1cGRhdGVGaWx0ZXJlZENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZmlsdGVyZWQtY2hvaWNlcyc7XG5pbXBvcnQge3VwZGF0ZUZvcm11bGF9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtZm9ybXVsYSc7XG5pbXBvcnQge3VwZGF0ZU5leHRTbGlkZUNvbmRpdGlvbn0gZnJvbSAnLi91dGlscy9maWVsZHMtaW5zdGFuY2VzL3VwZGF0ZS1uZXh0LXNsaWRlLWNvbmRpdGlvbic7XG5pbXBvcnQge3VwZGF0ZVRyaWdnZXJDb25kaXRpb25zfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy1pbnN0YW5jZXMvdXBkYXRlLXRyaWdnZXItY29uZGl0aW9ucyc7XG5pbXBvcnQge3VwZGF0ZVZhbGlkYXRpb259IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtdmFsaWRhdGlvbic7XG5pbXBvcnQge3VwZGF0ZVdhcm5pbmd9IGZyb20gJy4vdXRpbHMvZmllbGRzLWluc3RhbmNlcy91cGRhdGUtd2FybmluZyc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkfSBmcm9tICcuL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQnO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4vdXRpbHMvZmllbGRzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc0luc3RhbmNlc30gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvZmxhdHRlbi1ub2Rlcy1pbnN0YW5jZXMnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXNJbnN0YW5jZXNUcmVlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9mbGF0dGVuLW5vZGVzLWluc3RhbmNlcy10cmVlJztcbmltcG9ydCB7aXNGaWVsZEluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9pcy1maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLW5vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7aXNTbGlkZXNJbnN0YW5jZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvaXMtc2xpZGVzLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VTdWZmaXh9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2Utc3VmZml4JztcbmltcG9ydCB7bm9kZVRvTm9kZUluc3RhbmNlfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLXRvLW5vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHt1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtY29uZGl0aW9uYWwtYnJhbmNoZXMnO1xuaW1wb3J0IHt1cGRhdGVWaXNpYmlsaXR5fSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy91cGRhdGUtdmlzaWJpbGl0eSc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9mbGF0dGVuLW5vZGVzJztcbmltcG9ydCB7aXNDb250YWluZXJOb2RlfSBmcm9tICcuL3V0aWxzL25vZGVzL2lzLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7aXNSZXBlYXRpbmdDb250YWluZXJOb2RlfSBmcm9tICcuL3V0aWxzL25vZGVzL2lzLXJlcGVhdGluZy1jb250YWluZXItbm9kZSc7XG5pbXBvcnQge29yZGVyZWROb2Rlc30gZnJvbSAnLi91dGlscy9ub2Rlcy9vcmRlcmVkLW5vZGVzJztcbmltcG9ydCB7dXBkYXRlUmVwc051bX0gZnJvbSAnLi91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3VwZGF0ZS1yZXBzLW51bSc7XG5pbXBvcnQge3ZhbGlkU2xpZGV9IGZyb20gJy4vdXRpbHMvc2xpZGVzLWluc3RhbmNlcy92YWxpZC1zbGlkZSc7XG5pbXBvcnQge0FqZlZhbGlkYXRpb25TZXJ2aWNlfSBmcm9tICcuL3ZhbGlkYXRpb24tc2VydmljZSc7XG5cbmNvbnN0IGVzcHJpbWFNb2Q6IGFueSA9IChlc3ByaW1hIGFzIGFueSkuZGVmYXVsdCB8fCBlc3ByaW1hO1xuY29uc3Qge3Rva2VuaXplfSA9IGVzcHJpbWFNb2Q7XG5cbmV4cG9ydCBlbnVtIEFqZkZvcm1Jbml0U3RhdHVzIHtcbiAgSW5pdGlhbGl6aW5nLFxuICBDb21wbGV0ZVxufVxuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmRm9ybVJlbmRlcmVyU2VydmljZSB7XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlOb2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3JlcGV0aXRpb25Ob2Rlc01hcDogT2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcD47XG4gIHByaXZhdGUgX3JlcGV0aXRpb25Ob2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfZm9ybXVsYU5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfZm9ybXVsYU5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbk5vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfd2FybmluZ05vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfd2FybmluZ05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXM6IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+ID1cbiAgICAgIG5ldyBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPigpO1xuXG4gIHByaXZhdGUgX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXA6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+O1xuICBwcml2YXRlIF90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwOiBPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwPjtcbiAgcHJpdmF0ZSBfbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlczogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4gPVxuICAgICAgbmV3IFN1YmplY3Q8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+KCk7XG5cbiAgcHJpdmF0ZSBfZm9ybUluaXRFdmVudDogRXZlbnRFbWl0dGVyPEFqZkZvcm1Jbml0U3RhdHVzPiA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUluaXRTdGF0dXM+KCk7XG4gIHJlYWRvbmx5IGZvcm1Jbml0RXZlbnQ6IE9ic2VydmFibGU8QWpmRm9ybUluaXRTdGF0dXM+ID0gdGhpcy5fZm9ybUluaXRFdmVudC5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9mb3JtR3JvdXA6IEJlaGF2aW9yU3ViamVjdDxGb3JtR3JvdXAgfCBudWxsPiA9XG4gICAgbmV3IEJlaGF2aW9yU3ViamVjdDxGb3JtR3JvdXAgfCBudWxsPihudWxsKTtcbiAgcmVhZG9ubHkgZm9ybUdyb3VwOiBPYnNlcnZhYmxlPEZvcm1Hcm91cCB8IG51bGw+ID0gdGhpcy5fZm9ybUdyb3VwLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX2Zvcm06IEJlaGF2aW9yU3ViamVjdDx7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fXxudWxsPiA9XG4gICAgICBuZXcgQmVoYXZpb3JTdWJqZWN0PHtmb3JtOiBBamZGb3JtIHwgbnVsbCwgY29udGV4dD86IEFqZkNvbnRleHR9fG51bGw+KG51bGwpO1xuICBwcml2YXRlIF9ub2RlczogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2RlczogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2VbXT47XG4gIHByaXZhdGUgX2ZsYXROb2Rlc1RyZWU6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPjtcbiAgcHJpdmF0ZSBfbm9kZXNVcGRhdGVzOiBTdWJqZWN0PEFqZk5vZGVzSW5zdGFuY2VzT3BlcmF0aW9uPiA9XG4gICAgICBuZXcgU3ViamVjdDxBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbj4oKTtcbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnM6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuICBwcml2YXRlIF9lcnJvcnM6IE9ic2VydmFibGU8bnVtYmVyPjtcblxuICBwcml2YXRlIF9mb3JtR3JvdXBTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2VkOiBTdWJqZWN0PHZvaWQ+ID0gbmV3IFN1YmplY3Q8dm9pZD4oKTtcblxuICBwcml2YXRlIF9ub2Rlc01hcHM6IE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXA+W107XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlVHJpZ2dlcjogRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZk5vZGVJbnN0YW5jZT4oKTtcbiAgcmVhZG9ubHkgbmV4dFNsaWRlVHJpZ2dlcjogT2JzZXJ2YWJsZTxBamZOb2RlSW5zdGFuY2U+ID0gdGhpcy5fbmV4dFNsaWRlVHJpZ2dlci5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zbGlkZXNOdW06IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+ID0gbmV3IEJlaGF2aW9yU3ViamVjdDxudW1iZXI+KDApO1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPiA9IHRoaXMuX3NsaWRlc051bS5hc09ic2VydmFibGUoKTtcblxuICBnZXQgbm9kZXNUcmVlKCk6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZsYXROb2Rlc1RyZWU7XG4gIH1cbiAgZ2V0IGVycm9yUG9zaXRpb25zKCk6IE9ic2VydmFibGU8bnVtYmVyW10+IHsgcmV0dXJuIHRoaXMuX2Vycm9yUG9zaXRpb25zOyB9XG4gIGdldCBlcnJvcnMoKTogT2JzZXJ2YWJsZTxudW1iZXI+IHsgcmV0dXJuIHRoaXMuX2Vycm9yczsgfVxuICBnZXQgY3VycmVudFN1cHBsZW1lbnRhcnlJbmZvcm1hdGlvbnMoKTogYW55IHtcbiAgICBjb25zdCBmb3JtID0gdGhpcy5fZm9ybS5nZXRWYWx1ZSgpO1xuICAgIHJldHVybiBmb3JtICE9IG51bGwgJiYgZm9ybS5mb3JtICE9IG51bGwgPyBmb3JtLmZvcm0uc3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyA6IG51bGw7XG4gIH1cblxuICBjb25zdHJ1Y3RvcihfOiBBamZWYWxpZGF0aW9uU2VydmljZSkge1xuICAgIHRoaXMuX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdE5vZGVzU3RyZWFtcygpO1xuICAgIHRoaXMuX2luaXRFcnJvcnNTdHJlYW1zKCk7XG4gICAgdGhpcy5faW5pdEZvcm1TdHJlYW1zKCk7XG4gICAgdGhpcy5fdXBkYXRlRm9ybVZhbHVlQW5kVmFsaWRpdHkoKTtcbiAgfVxuXG4gIHNldEZvcm0oZm9ybTogQWpmRm9ybXxudWxsLCBjb250ZXh0OiBBamZDb250ZXh0ID0ge30pIHtcbiAgICB0aGlzLl9pbml0VXBkYXRlTWFwU3RyZWFtcygpO1xuICAgIGlmIChmb3JtICE9IG51bGwgJiYgT2JqZWN0LmtleXMoY29udGV4dCkubGVuZ3RoID09PSAwICYmXG4gICAgICAgIE9iamVjdC5rZXlzKGZvcm0uaW5pdENvbnRleHQgfHwge30pLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnRleHQgPSBmb3JtLmluaXRDb250ZXh0IHx8IHt9O1xuICAgIH1cbiAgICBjb25zdCBjdXJyZW50Rm9ybSA9IHRoaXMuX2Zvcm0uZ2V0VmFsdWUoKTtcbiAgICBpZiAoXG4gICAgICAoY3VycmVudEZvcm0gPT0gbnVsbCAmJiBmb3JtICE9IG51bGwpIHx8XG4gICAgICAoY3VycmVudEZvcm0gIT0gbnVsbCAmJiBmb3JtICE9PSBjdXJyZW50Rm9ybS5mb3JtKVxuICAgICkge1xuICAgICAgdGhpcy5fZm9ybS5uZXh0KHtmb3JtOiBmb3JtLCBjb250ZXh0OiBjb250ZXh0fSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0Rm9ybVZhbHVlKCk6IGFueSB7XG4gICAgY29uc3QgZm9ybUdyb3VwID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgaWYgKGZvcm1Hcm91cCA9PSBudWxsKSB7IHJldHVybiB7fTsgfVxuICAgIGxldCByZXMgPSBkZWVwQ29weShmb3JtR3JvdXAudmFsdWUpO1xuICAgIHJldHVybiByZXM7XG4gIH1cblxuICBhZGRHcm91cChncm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlKTogT2JzZXJ2YWJsZTxib29sZWFuPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlPGJvb2xlYW4+KChzdWJzY3JpYmVyOiBTdWJzY3JpYmVyPGJvb2xlYW4+KSA9PiB7XG4gICAgICBpZiAoZ3JvdXAuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG1heFJlcHMgPSBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBpZiAobWF4UmVwcyA+IDAgJiYgZ3JvdXAucmVwcyArIDEgPiBtYXhSZXBzKSB7XG4gICAgICAgIHN1YnNjcmliZXIubmV4dChmYWxzZSk7XG4gICAgICAgIHN1YnNjcmliZXIuY29tcGxldGUoKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb2xkUmVwcyA9IGdyb3VwLnJlcHM7XG4gICAgICBncm91cC5yZXBzID0gZ3JvdXAucmVwcyArIDE7XG4gICAgICBncm91cC5jYW5BZGQgPSBncm91cC5ub2RlLm1heFJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA8IGdyb3VwLm5vZGUubWF4UmVwcztcbiAgICAgIGdyb3VwLmNhblJlbW92ZSA9IGdyb3VwLm5vZGUubWluUmVwcyA9PT0gMCB8fCBncm91cC5yZXBzID4gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgdGhpcy5fbm9kZXNVcGRhdGVzLm5leHQoKG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSk6IEFqZk5vZGVJbnN0YW5jZVtdID0+IHtcbiAgICAgICAgY29uc3QgZmxhdE5vZGVzID0gZmxhdHRlbk5vZGVzSW5zdGFuY2VzKG5vZGVzLCB0cnVlKTtcbiAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhmbGF0Tm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlR3JvdXAoZ3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IE9ic2VydmFibGU8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZTxib29sZWFuPigoc3Vic2NyaWJlcjogU3Vic2NyaWJlcjxib29sZWFuPikgPT4ge1xuICAgICAgaWYgKGdyb3VwLmZvcm11bGFSZXBzICE9IG51bGwpIHtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KGZhbHNlKTtcbiAgICAgICAgc3Vic2NyaWJlci5jb21wbGV0ZSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBtaW5SZXBzID0gZ3JvdXAubm9kZS5taW5SZXBzO1xuICAgICAgaWYgKGdyb3VwLnJlcHMgLSAxIDwgbWluUmVwcykge1xuICAgICAgICBzdWJzY3JpYmVyLm5leHQoZmFsc2UpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9sZFJlcHMgPSBncm91cC5yZXBzO1xuICAgICAgZ3JvdXAucmVwcyA9IGdyb3VwLnJlcHMgLSAxO1xuICAgICAgZ3JvdXAuY2FuQWRkID0gZ3JvdXAubm9kZS5tYXhSZXBzID09PSAwIHx8IGdyb3VwLnJlcHMgPCBncm91cC5ub2RlLm1heFJlcHM7XG4gICAgICBncm91cC5jYW5SZW1vdmUgPSBncm91cC5ub2RlLm1pblJlcHMgPT09IDAgfHwgZ3JvdXAucmVwcyA+IGdyb3VwLm5vZGUubWluUmVwcztcbiAgICAgIHRoaXMuX25vZGVzVXBkYXRlcy5uZXh0KChub2RlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgIHRoaXMuX2FkanVzdFJlcHMobm9kZXMsIGdyb3VwLCBvbGRSZXBzLCB0aGlzLmdldEZvcm1WYWx1ZSgpKTtcbiAgICAgICAgc3Vic2NyaWJlci5uZXh0KHRydWUpO1xuICAgICAgICBzdWJzY3JpYmVyLmNvbXBsZXRlKCk7XG4gICAgICAgIHJldHVybiBub2RlcztcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0Q29udHJvbChmaWVsZDogQWpmRmllbGRJbnN0YW5jZSk6IE9ic2VydmFibGU8QWJzdHJhY3RDb250cm9sIHwgbnVsbD4ge1xuICAgIHJldHVybiB0aGlzLmZvcm1Hcm91cC5waXBlKG1hcCgoZikgPT4ge1xuICAgICAgY29uc3QgZmllbGROYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGZpZWxkKTtcbiAgICAgIHJldHVybiBmICE9IG51bGwgJiYgZi5jb250YWlucyhmaWVsZE5hbWUpID8gZi5jb250cm9sc1tmaWVsZE5hbWVdIDogbnVsbDtcbiAgICB9KSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0RXJyb3JzU3RyZWFtcygpOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvclBvc2l0aW9ucyA9IHRoaXMuX3ZhbHVlQ2hhbmdlZC5waXBlKFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9ub2RlcywgdGhpcy5fZm9ybSksIGZpbHRlcih2ID0+IHZbMl0gIT0gbnVsbCAmJiB2WzJdLmZvcm0gIT0gbnVsbCksXG4gICAgICAgIG1hcCgodjogW3ZvaWQsIEFqZk5vZGVJbnN0YW5jZVtdLCB7Zm9ybTogQWpmRm9ybSB8IG51bGwsIGNvbnRleHQ/OiBBamZDb250ZXh0fXxudWxsXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IG5vZGVzID0gdlsxXTtcbiAgICAgICAgICBjb25zdCBmb3JtID0gdlsyXSEuZm9ybSE7XG4gICAgICAgICAgbGV0IGN1cnJlbnRQb3NpdGlvbiA9IDA7XG4gICAgICAgICAgY29uc3QgZXJyb3JzOiBudW1iZXJbXSA9IFtdO1xuICAgICAgICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgIGlmIChub2RlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJzTm9kZSA9IG5vZGUgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByc05vZGUucmVwczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgaWYgKG5vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHJzTm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmICghdmFsaWRTbGlkZShyc05vZGUsIGkpKSB7XG4gICAgICAgICAgICAgICAgICAgIGVycm9ycy5wdXNoKGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUpIHtcbiAgICAgICAgICAgICAgY29uc3Qgc05vZGUgPSBub2RlIGFzIEFqZlNsaWRlSW5zdGFuY2U7XG4gICAgICAgICAgICAgIGlmIChzTm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgc05vZGUucG9zaXRpb24gPSBjdXJyZW50UG9zaXRpb247XG4gICAgICAgICAgICAgICAgaWYgKCFzTm9kZS52YWxpZCkge1xuICAgICAgICAgICAgICAgICAgZXJyb3JzLnB1c2goY3VycmVudFBvc2l0aW9uKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgICBmb3JtLnZhbGlkID0gZXJyb3JzLmxlbmd0aCA9PSAwO1xuICAgICAgICAgIHRoaXMuX3NsaWRlc051bS5uZXh0KGN1cnJlbnRQb3NpdGlvbik7XG4gICAgICAgICAgcmV0dXJuIGVycm9ycztcbiAgICAgICAgfSksXG4gICAgICAgIHB1Ymxpc2hSZXBsYXkoKSwgcmVmQ291bnQoKSk7XG4gICAgdGhpcy5fZXJyb3JzID0gdGhpcy5fZXJyb3JQb3NpdGlvbnMucGlwZShcbiAgICAgIG1hcChlID0+IGUgIT0gbnVsbCA/IGUubGVuZ3RoIDogMCksXG4gICAgICBzdGFydFdpdGgoMCksXG4gICAgICBwdWJsaXNoUmVwbGF5KCksXG4gICAgICByZWZDb3VudCgpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRVcGRhdGVNYXBTdHJlYW1zKCk6IHZvaWQge1xuICAgIHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICB9LCB7fSksIHN0YXJ0V2l0aDxBamZSZW5kZXJlclVwZGF0ZU1hcD4oe30pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fZm9ybXVsYU5vZGVzTWFwID1cbiAgICAgICAgKDxPYnNlcnZhYmxlPEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPj50aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzKVxuICAgICAgICAgICAgLnBpcGUoc2Nhbigocm1hcDogQWpmUmVuZGVyZXJVcGRhdGVNYXAsIG9wOiBBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICByZXR1cm4gb3Aocm1hcCk7XG4gICAgICAgICAgICAgICAgICB9LCB7fSksIHN0YXJ0V2l0aDxBamZSZW5kZXJlclVwZGF0ZU1hcD4oe30pLCBzaGFyZSgpKTtcbiAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX3dhcm5pbmdOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fd2FybmluZ05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXAgPVxuICAgICAgICAoPE9ic2VydmFibGU8QWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24+PnRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMpXG4gICAgICAgICAgICAucGlwZShzY2FuKChybWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCwgb3A6IEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChybWFwKTtcbiAgICAgICAgICAgICAgICAgIH0sIHt9KSwgc3RhcnRXaXRoPEFqZlJlbmRlcmVyVXBkYXRlTWFwPih7fSksIHNoYXJlKCkpO1xuICAgIHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcCA9XG4gICAgICAgICg8T2JzZXJ2YWJsZTxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4+dGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwVXBkYXRlcylcbiAgICAgICAgICAgIC5waXBlKHNjYW4oKHJtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBvcDogQWpmUmVuZGVyZXJVcGRhdGVNYXBPcGVyYXRpb24pID0+IHtcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG9wKHJtYXApO1xuICAgICAgICAgICAgICAgICAgfSwge30pLCBzdGFydFdpdGg8QWpmUmVuZGVyZXJVcGRhdGVNYXA+KHt9KSwgc2hhcmUoKSk7XG5cbiAgICB0aGlzLl9ub2Rlc01hcHMgPSBbXG4gICAgICB0aGlzLl92aXNpYmlsaXR5Tm9kZXNNYXAsXG4gICAgICB0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXAsXG4gICAgICB0aGlzLl9jb25kaXRpb25hbEJyYW5jaE5vZGVzTWFwLFxuICAgICAgdGhpcy5fZm9ybXVsYU5vZGVzTWFwLFxuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwLFxuICAgICAgdGhpcy5fd2FybmluZ05vZGVzTWFwLFxuICAgICAgdGhpcy5fbmV4dFNsaWRlQ29uZGl0aW9uc05vZGVzTWFwLFxuICAgICAgdGhpcy5fZmlsdGVyZWRDaG9pY2VzTm9kZXNNYXAsXG4gICAgICB0aGlzLl90cmlnZ2VyQ29uZGl0aW9uc05vZGVzTWFwXG4gICAgXTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGb3JtU3RyZWFtcygpOiB2b2lkIHtcbiAgICBjb25zdCBmb3JtT2JzID0gPE9ic2VydmFibGU8e2Zvcm06IEFqZkZvcm0gfCBudWxsLCBjb250ZXh0PzogQWpmQ29udGV4dH0+PnRoaXMuX2Zvcm07XG4gICAgZm9ybU9ic1xuICAgICAgLnBpcGUobWFwKChfZm9ybSkgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5faW5pdEZvcm1Hcm91cFN0cmVhbXMobmV3IEZvcm1Hcm91cCh7fSkpO1xuICAgICAgfSkpXG4gICAgICAuc3Vic2NyaWJlKHRoaXMuX2Zvcm1Hcm91cCk7XG4gICAgZm9ybU9ic1xuICAgICAgICAucGlwZShtYXAoKGZvcm0pID0+IHtcbiAgICAgICAgICByZXR1cm4gKF9ub2Rlc0luc3RhbmNlczogQWpmTm9kZUluc3RhbmNlW10pOiBBamZOb2RlSW5zdGFuY2VbXSA9PiB7XG4gICAgICAgICAgICBjb25zdCBub2RlcyA9IGZvcm0gIT0gbnVsbCAmJiBmb3JtLmZvcm0gIT0gbnVsbCA/XG4gICAgICAgICAgICAgICAgdGhpcy5fb3JkZXJlZE5vZGVzSW5zdGFuY2VzVHJlZShcbiAgICAgICAgICAgICAgICAgICAgZmxhdHRlbk5vZGVzKGZvcm0uZm9ybS5ub2RlcyksIGZvcm0uZm9ybS5ub2RlcywgdW5kZWZpbmVkLCBbXSxcbiAgICAgICAgICAgICAgICAgICAgZm9ybS5jb250ZXh0IHx8IHt9KSA6XG4gICAgICAgICAgICAgICAgW107XG4gICAgICAgICAgICBsZXQgY3VycmVudFBvc2l0aW9uID0gMDtcbiAgICAgICAgICAgIG5vZGVzLmZvckVhY2goKG5vZGUpID0+IHtcbiAgICAgICAgICAgICAgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByc05vZGUgPSBub2RlIGFzIEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCByc05vZGUucmVwczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgICBpZiAobm9kZS52aXNpYmxlKSB7XG4gICAgICAgICAgICAgICAgICAgIGN1cnJlbnRQb3NpdGlvbisrO1xuICAgICAgICAgICAgICAgICAgICBpZiAoaSA9PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgcnNOb2RlLnBvc2l0aW9uID0gY3VycmVudFBvc2l0aW9uO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKG5vZGUubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmU2xpZGUpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBzTm9kZSA9IG5vZGUgYXMgQWpmU2xpZGVJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICBpZiAoc05vZGUudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgICAgY3VycmVudFBvc2l0aW9uKys7XG4gICAgICAgICAgICAgICAgICBzTm9kZS5wb3NpdGlvbiA9IGN1cnJlbnRQb3NpdGlvbjtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIG5vZGVzO1xuICAgICAgICAgIH07XG4gICAgICAgIH0pKVxuICAgICAgICAuc3Vic2NyaWJlKHRoaXMuX25vZGVzVXBkYXRlcyk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Tm9kZUluc3RhbmNlKFxuICAgICAgYWxsTm9kZXM6IEFqZk5vZGVbXXxBamZOb2RlSW5zdGFuY2VbXSwgbm9kZTogQWpmTm9kZSwgcHJlZml4OiBudW1iZXJbXSwgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICAgIGJyYW5jaFZpc2liaWxpdHkgPSB0cnVlKTogQWpmTm9kZUluc3RhbmNlfG51bGwge1xuICAgIGxldCBpbnN0YW5jZSA9IG5vZGVUb05vZGVJbnN0YW5jZShhbGxOb2Rlcywgbm9kZSwgcHJlZml4LCBjb250ZXh0KTtcbiAgICBpZiAoaW5zdGFuY2UgIT0gbnVsbCkge1xuICAgICAgY29uc3Qgbm9kZVR5cGUgPSBpbnN0YW5jZS5ub2RlLm5vZGVUeXBlO1xuICAgICAgaWYgKG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXAgfHwgbm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICAgIHRoaXMuX2V4cGxvZGVSZXBlYXRpbmdOb2RlKFxuICAgICAgICAgICAgYWxsTm9kZXMsIGluc3RhbmNlIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSwgY29udGV4dCk7XG4gICAgICB9IGVsc2UgaWYgKG5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZTbGlkZSkge1xuICAgICAgICBjb25zdCBzSW5zdGFuY2UgPSBpbnN0YW5jZSBhcyBBamZTbGlkZUluc3RhbmNlO1xuICAgICAgICBzSW5zdGFuY2Uubm9kZXMgPSB0aGlzLl9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlKFxuICAgICAgICAgICAgYWxsTm9kZXMsIHNJbnN0YW5jZS5ub2RlLm5vZGVzLCBzSW5zdGFuY2Uubm9kZS5pZCwgcHJlZml4LCBjb250ZXh0KTtcbiAgICAgIH1cbiAgICAgIHVwZGF0ZVZpc2liaWxpdHkoaW5zdGFuY2UsIGNvbnRleHQsIGJyYW5jaFZpc2liaWxpdHkpO1xuICAgICAgdXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgICBpZiAobm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZkZpZWxkKSB7XG4gICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG5cbiAgICAgICAgaWYgKGlzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlcyhmSW5zdGFuY2Uubm9kZSkgfHwgaXNGaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgIHVwZGF0ZUZpbHRlcmVkQ2hvaWNlcyhmSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4sIGNvbnRleHQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGlmIChpc1RhYmxlRmllbGRJbnN0YW5jZShmSW5zdGFuY2UpKSB7XG4gICAgICAgICAgICBjb25zdCB0Zkluc3RhbmNlID0gZkluc3RhbmNlIGFzIEFqZlRhYmxlRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgIGNvbnN0IHROb2RlID0gdGZJbnN0YW5jZS5ub2RlO1xuICAgICAgICAgICAgdGZJbnN0YW5jZS5jb250ZXh0ID0gY29udGV4dFtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUodGZJbnN0YW5jZSldIHx8IGNvbnRleHQ7XG4gICAgICAgICAgICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICBsZXQgY29udHJvbHNXaXRoTGFiZWxzOiBbc3RyaW5nLCAoc3RyaW5nfEZvcm1Db250cm9sKVtdXVtdID0gW107XG4gICAgICAgICAgICAgIGNvbnRyb2xzV2l0aExhYmVscy5wdXNoKFtub2RlLmxhYmVsLCB0Tm9kZS5jb2x1bW5MYWJlbHNdKTtcbiAgICAgICAgICAgICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgdE5vZGUucm93cy5mb3JFYWNoKChyb3csIHJvd0lkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgbGV0IHI6IEZvcm1Db250cm9sW10gPSBbXTtcbiAgICAgICAgICAgICAgICAgIChyb3cgYXMgQWpmVGFibGVDZWxsW10pLmZvckVhY2goKGNlbGwsIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAgICBldmVyeSBjb250cm9sIGlzIHJlZ2lzdGVyZWQgd2l0aCB0aGUgY2VsbCBwb3NpdGlvblxuICAgICAgICAgICAgICAgICAgICBpbnNpZGUgdGhlIGZvcm0gY29udHJvbCBtYXRyaXhcbiAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGlzIG1hc2sgYCR7dE5vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YFxuICAgICAgICAgICAgICAgICAgICAqL1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gYCR7dE5vZGUubmFtZX1fXyR7cm93SWR4fV9fJHtpZHh9YDtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY29udHJvbCA9IG5ldyBGb3JtQ29udHJvbCgpO1xuICAgICAgICAgICAgICAgICAgICBjb250cm9sLnNldFZhbHVlKHRmSW5zdGFuY2UuY29udGV4dFtjZWxsLmZvcm11bGFdKTtcbiAgICAgICAgICAgICAgICAgICAgZm9ybUdyb3VwXG4gICAgICAgICAgICAgICAgICAgICAgLnJlZ2lzdGVyQ29udHJvbChuYW1lLCBjb250cm9sKTtcbiAgICAgICAgICAgICAgICAgICAgci5wdXNoKGNvbnRyb2wpO1xuICAgICAgICAgICAgICAgICAgICAvKiBjcmVhdGUgYSBvYmplY3QgdGhhdCByZXNwZWN0IHRoZSBpbnN0YW5jZSBpbnRlcmZhY2VcbiAgICAgICAgICAgICAgICAgICAgd2l0aCB0aGUgbWluaW11bSBkZWZpbmVkIHByb3BlcnRpZXMgdG8gYWxsb3cgdG8gcnVuIGFkZFRvTm9kZUZvcm11bGEgbWFwKi9cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZmFrZUluc3RhbmNlID0ge1xuICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IHtmb3JtdWxhOiBjZWxsLmZvcm11bGF9LFxuICAgICAgICAgICAgICAgICAgICAgIG5vZGU6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIG5hbWUsXG4gICAgICAgICAgICAgICAgICAgICAgICBub2RlVHlwZTogMCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGVkaXRhYmxlOiBmYWxzZVxuICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgdmlzaWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICBwcmVmaXg6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbmRpdGlvbmFsQnJhbmNoZXM6IFtdLFxuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWRFdnQ6IG5ldyBFdmVudEVtaXR0ZXI8dm9pZD4oKVxuICAgICAgICAgICAgICAgICAgICB9IGFzIHVua25vd24gYXMgQWpmTm9kZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICB0aGlzLl9hZGRUb05vZGVzRm9ybXVsYU1hcChmYWtlSW5zdGFuY2UsIGNlbGwuZm9ybXVsYSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGNvbnRyb2xzV2l0aExhYmVscy5wdXNoKFt0Tm9kZS5yb3dMYWJlbHNbcm93SWR4XSwgcl0pO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHRmSW5zdGFuY2UuY29udHJvbHMgPSBjb250cm9sc1dpdGhMYWJlbHM7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZkluc3RhbmNlLnZhbHVlID0gY29udGV4dFtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUoaW5zdGFuY2UpXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXBkYXRlRmllbGRJbnN0YW5jZVN0YXRlKGZJbnN0YW5jZSwgY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHRoaXMuX2FkZE5vZGVJbnN0YW5jZShpbnN0YW5jZSk7XG4gICAgfVxuICAgIHJldHVybiBpbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkanVzdFJlcHMoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLCBpbnN0YW5jZTogQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlLFxuICAgICAgb2xkUmVwczogbnVtYmVyLFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCk6IHthZGRlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbCwgcmVtb3ZlZDogQWpmTm9kZUluc3RhbmNlW118bnVsbH0ge1xuICAgIGNvbnN0IG5ld1JlcHMgPSBpbnN0YW5jZS5yZXBzO1xuICAgIGNvbnN0IHJlc3VsdDogeyBhZGRlZDogQWpmTm9kZUluc3RhbmNlW10gfCBudWxsLCByZW1vdmVkOiBBamZOb2RlSW5zdGFuY2VbXSB8IG51bGwgfSA9IHtcbiAgICAgIGFkZGVkOiBudWxsLFxuICAgICAgcmVtb3ZlZDogbnVsbFxuICAgIH07XG4gICAgaWYgKG9sZFJlcHMgPCBuZXdSZXBzKSB7XG4gICAgICBjb25zdCBuZXdOb2RlczogQWpmTm9kZUluc3RhbmNlW10gPSBbXTtcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlcyA9PSBudWxsKSB7XG4gICAgICAgIGluc3RhbmNlLm5vZGVzID0gW107XG4gICAgICB9XG4gICAgICBpZiAoaW5zdGFuY2Uubm9kZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwKSB7XG4gICAgICAgIGNvbnN0IG5vZGUgPSBjcmVhdGVGaWVsZCh7XG4gICAgICAgICAgICAgICAgICAgICAgIGlkOiA5OTksXG4gICAgICAgICAgICAgICAgICAgICAgIG5hbWU6ICcnLFxuICAgICAgICAgICAgICAgICAgICAgICBwYXJlbnQ6IC0xLFxuICAgICAgICAgICAgICAgICAgICAgICBmaWVsZFR5cGU6IEFqZkZpZWxkVHlwZS5FbXB0eSxcbiAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGluc3RhbmNlLm5vZGUubGFiZWxcbiAgICAgICAgICAgICAgICAgICAgIH0pIGFzIEFqZkVtcHR5RmllbGQ7XG4gICAgICAgIGNvbnN0IG5ld0luc3RhbmNlID0gdGhpcy5faW5pdE5vZGVJbnN0YW5jZShcbiAgICAgICAgICBhbGxOb2Rlcywgbm9kZSwgaW5zdGFuY2UucHJlZml4LnNsaWNlKDApLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICBpbnN0YW5jZS5ub2Rlcy5wdXNoKG5ld0luc3RhbmNlKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgZm9yIChsZXQgaSA9IG9sZFJlcHMgOyBpIDwgbmV3UmVwcyA7IGkrKykge1xuICAgICAgICBjb25zdCBwcmVmaXggPSBpbnN0YW5jZS5wcmVmaXguc2xpY2UoMCk7XG4gICAgICAgIGNvbnN0IGdyb3VwID0gaW5zdGFuY2Uubm9kZTtcbiAgICAgICAgcHJlZml4LnB1c2goaSk7XG4gICAgICAgIG9yZGVyZWROb2Rlcyhncm91cC5ub2RlcywgaW5zdGFuY2Uubm9kZS5pZClcbiAgICAgICAgICAuZm9yRWFjaCgobikgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3SW5zdGFuY2UgPSB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKGFsbE5vZGVzLCBuLCBwcmVmaXgsIGNvbnRleHQpO1xuICAgICAgICAgICAgaWYgKG5ld0luc3RhbmNlICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgbmV3Tm9kZXMucHVzaChuZXdJbnN0YW5jZSk7XG4gICAgICAgICAgICAgIGluc3RhbmNlLm5vZGVzLnB1c2gobmV3SW5zdGFuY2UpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB0aGlzLl9hZGROb2RlSW5zdGFuY2UoaW5zdGFuY2UpO1xuICAgICAgfVxuICAgICAgcmVzdWx0LmFkZGVkID0gbmV3Tm9kZXM7XG4gICAgfSBlbHNlIGlmIChvbGRSZXBzID4gbmV3UmVwcykge1xuICAgICAgbGV0IG5vZGVzTnVtID0gaW5zdGFuY2Uubm9kZXMubGVuZ3RoIC8gb2xkUmVwcztcbiAgICAgIGlmIChpbnN0YW5jZS5ub2RlLm5vZGVUeXBlID09PSBBamZOb2RlVHlwZS5BamZOb2RlR3JvdXApIHtcbiAgICAgICAgbm9kZXNOdW0gKys7XG4gICAgICB9XG4gICAgICByZXN1bHQucmVtb3ZlZCA9IGluc3RhbmNlLm5vZGVzLnNwbGljZShuZXdSZXBzICogbm9kZXNOdW0sIG5vZGVzTnVtKTtcbiAgICAgIHJlc3VsdC5yZW1vdmVkLmZvckVhY2goKG4gPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVOb2RlSW5zdGFuY2Uobik7XG4gICAgICB9KSk7XG4gICAgfVxuICAgIGlmIChvbGRSZXBzICE9IG5ld1JlcHMgJiYgaW5zdGFuY2UuZm9ybXVsYVJlcHMgPT0gbnVsbCkge1xuICAgICAgY29uc3QgZmcgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShpbnN0YW5jZSk7XG4gICAgICBpZiAoZmcgIT0gbnVsbCAmJiBmZy5jb250YWlucyhjb21wbGV0ZU5hbWUpKSB7XG4gICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUoaW5zdGFuY2UucmVwcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGluc3RhbmNlLmZsYXROb2RlcyA9IGZsYXR0ZW5Ob2Rlc0luc3RhbmNlcyhpbnN0YW5jZS5ub2Rlcyk7XG4gICAgaWYgKGluc3RhbmNlLm5vZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlKSB7XG4gICAgICBjb25zdCByc0luc3RhbmNlID0gaW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZTtcbiAgICAgIGNvbnN0IHNsaWRlTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdW10gPSBbXTtcbiAgICAgIGNvbnN0IG5vZGVzUGVyU2xpZGUgPVxuICAgICAgICAgIHJzSW5zdGFuY2Uubm9kZXMgIT0gbnVsbCA/IHJzSW5zdGFuY2Uubm9kZXMubGVuZ3RoIC8gcnNJbnN0YW5jZS5yZXBzIDogMDtcbiAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IGluc3RhbmNlLnJlcHMgOyBpKyspIHtcbiAgICAgICAgY29uc3Qgc3RhcnROb2RlID0gaSAqIG5vZGVzUGVyU2xpZGU7XG4gICAgICAgIHNsaWRlTm9kZXMucHVzaChpbnN0YW5jZS5ub2Rlcy5zbGljZShzdGFydE5vZGUsIHN0YXJ0Tm9kZSArIG5vZGVzUGVyU2xpZGUpKTtcbiAgICAgIH1cbiAgICAgIHJzSW5zdGFuY2Uuc2xpZGVOb2RlcyA9IHNsaWRlTm9kZXM7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIF91cGRhdGVGb3JtVmFsdWVBbmRWYWxpZGl0eSgpOiB2b2lkIHtcbiAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMuYXNPYnNlcnZhYmxlKClcbiAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9mb3JtR3JvdXApLFxuICAgICAgICAgICAgZmlsdGVyKCh2YWx1ZXM6IFtBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbiwgRm9ybUdyb3VwfG51bGxdKSA9PiB2YWx1ZXNbMV0gIT09IG51bGwpKVxuICAgICAgICAuc3Vic2NyaWJlKCh2YWx1ZXM6IFtBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbiwgRm9ybUdyb3VwfG51bGxdKSA9PiB7XG4gICAgICAgICAgY29uc3QgZm9ybTogRm9ybUdyb3VwID0gPEZvcm1Hcm91cD52YWx1ZXNbMV07XG4gICAgICAgICAgZm9ybS51cGRhdGVWYWx1ZUFuZFZhbGlkaXR5KCk7XG4gICAgICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZXhwbG9kZVJlcGVhdGluZ05vZGUoXG4gICAgICBhbGxOb2RlczogQWpmTm9kZVtdfEFqZk5vZGVJbnN0YW5jZVtdLFxuICAgICAgaW5zdGFuY2U6IEFqZk5vZGVHcm91cEluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UsIGNvbnRleHQ6IEFqZkNvbnRleHQpIHtcbiAgICBjb25zdCBvbGRSZXBzID0gdXBkYXRlUmVwc051bShpbnN0YW5jZSwgY29udGV4dCk7XG4gICAgaWYgKG9sZFJlcHMgIT09IGluc3RhbmNlLnJlcHMpIHtcbiAgICAgIHRoaXMuX2FkanVzdFJlcHMoYWxsTm9kZXMsIGluc3RhbmNlLCBvbGRSZXBzLCBjb250ZXh0KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9vcmRlcmVkTm9kZXNJbnN0YW5jZXNUcmVlKFxuICAgICAgYWxsTm9kZXM6IEFqZk5vZGVbXXxBamZOb2RlSW5zdGFuY2VbXSwgbm9kZXM6IEFqZk5vZGVbXSwgcGFyZW50OiBudW1iZXJ8bnVsbCA9IG51bGwsXG4gICAgICBwcmVmaXg6IG51bWJlcltdID0gW10sIGNvbnRleHQ6IEFqZkNvbnRleHQpOiBBamZOb2RlSW5zdGFuY2VbXSB7XG4gICAgbGV0IG5vZGVzSW5zdGFuY2VzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuICAgIGNvbnN0IGN1clN1ZmZpeCA9IHByZWZpeC5sZW5ndGggPiAwID8gJ19fJyArIHByZWZpeC5qb2luKCdfXycpIDogJyc7XG4gICAgb3JkZXJlZE5vZGVzKG5vZGVzLCBwYXJlbnQpLmZvckVhY2goKG5vZGU6IEFqZk5vZGUpID0+IHtcbiAgICAgIGNvbnN0IHBhcmVudE5vZGVJbnN0YW5jZSA9IG5vZGVzSW5zdGFuY2VzLmZpbmQoXG4gICAgICAgICAgbmkgPT4gbmkubm9kZS5pZCA9PSBub2RlLnBhcmVudCAmJiBub2RlSW5zdGFuY2VTdWZmaXgobmkpID09IGN1clN1ZmZpeCk7XG4gICAgICBjb25zdCBicmFuY2hWaXNpYmlsaXR5ID0gcGFyZW50Tm9kZUluc3RhbmNlICE9IG51bGwgP1xuICAgICAgICAgIHBhcmVudE5vZGVJbnN0YW5jZS52ZXJpZmllZEJyYW5jaCAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHBhcmVudE5vZGVJbnN0YW5jZS52ZXJpZmllZEJyYW5jaCA9PSBub2RlLnBhcmVudE5vZGUgOlxuICAgICAgICAgIHRydWU7XG4gICAgICBjb25zdCBubmkgPSB0aGlzLl9pbml0Tm9kZUluc3RhbmNlKGFsbE5vZGVzLCBub2RlLCBwcmVmaXgsIGNvbnRleHQsIGJyYW5jaFZpc2liaWxpdHkpO1xuICAgICAgaWYgKG5uaSAhPSBudWxsKSB7XG4gICAgICAgIG5vZGVzSW5zdGFuY2VzLnB1c2gobm5pKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gbm9kZXNJbnN0YW5jZXM7XG4gIH1cblxuICBwcml2YXRlIF9mb3JtVmFsdWVEZWx0YShvbGRWYWx1ZTogYW55LCBuZXdWYWx1ZTogYW55KTogc3RyaW5nW10ge1xuICAgIHJldHVybiBPYmplY3Qua2V5cyhuZXdWYWx1ZSlcbiAgICAgIC5maWx0ZXIoKGspID0+IG9sZFZhbHVlW2tdICE9PSBuZXdWYWx1ZVtrXSk7XG4gIH1cblxuICBwcml2YXRlIF9pbml0Rm9ybUdyb3VwU3RyZWFtcyhmb3JtR3JvdXA6IEZvcm1Hcm91cCk6IEZvcm1Hcm91cCB7XG4gICAgdGhpcy5fZm9ybUdyb3VwU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgbGV0IGluaXQgPSB0cnVlO1xuICAgIGxldCBpbml0Rm9ybSA9IHRydWU7XG4gICAgdGhpcy5fZm9ybUluaXRFdmVudC5lbWl0KEFqZkZvcm1Jbml0U3RhdHVzLkluaXRpYWxpemluZyk7XG4gICAgdGhpcy5fZm9ybUdyb3VwU3Vic2NyaXB0aW9uID1cbiAgICAgICAgZm9ybUdyb3VwLnZhbHVlQ2hhbmdlc1xuICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgc3RhcnRXaXRoPGFueT4oe30pLCBwYWlyd2lzZSgpLCBkZWJvdW5jZVRpbWUoMjAwKSxcbiAgICAgICAgICAgICAgICB3aXRoTGF0ZXN0RnJvbTxcbiAgICAgICAgICAgICAgICAgICAgW2FueSwgYW55XSxcbiAgICAgICAgICAgICAgICAgICAgW1xuICAgICAgICAgICAgICAgICAgICAgIFthbnksIGFueV0sIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgIEFqZk5vZGVJbnN0YW5jZVtdXG4gICAgICAgICAgICAgICAgICAgIF0+KC4uLih0aGlzLl9ub2Rlc01hcHMpLCB0aGlzLl9mbGF0Tm9kZXMpKVxuICAgICAgICAgICAgLnN1YnNjcmliZSgodjogW1xuICAgICAgICAgICAgICAgICAgICAgICAgIFthbnksIGFueV0sIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCxcbiAgICAgICAgICAgICAgICAgICAgICAgICBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZlJlbmRlcmVyVXBkYXRlTWFwLFxuICAgICAgICAgICAgICAgICAgICAgICAgIEFqZlJlbmRlcmVyVXBkYXRlTWFwLCBBamZSZW5kZXJlclVwZGF0ZU1hcCwgQWpmUmVuZGVyZXJVcGRhdGVNYXAsXG4gICAgICAgICAgICAgICAgICAgICAgICAgQWpmUmVuZGVyZXJVcGRhdGVNYXAsIEFqZk5vZGVJbnN0YW5jZVtdXG4gICAgICAgICAgICAgICAgICAgICAgIF0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3Qgb2xkRm9ybVZhbHVlID0gaW5pdCAmJiB7fSB8fCB2WzBdWzBdO1xuICAgICAgICAgICAgICBpbml0ID0gZmFsc2U7XG4gICAgICAgICAgICAgIGNvbnN0IG5ld0Zvcm1WYWx1ZSA9IHZbMF1bMV07XG4gICAgICAgICAgICAgIGNvbnN0IHZpc2liaWxpdHlNYXAgPSB2WzFdO1xuICAgICAgICAgICAgICBjb25zdCByZXBldGl0aW9uTWFwID0gdlsyXTtcbiAgICAgICAgICAgICAgY29uc3QgY29uZGl0aW9uYWxCcmFuY2hlc01hcCA9IHZbM107XG4gICAgICAgICAgICAgIGNvbnN0IGZvcm11bGFNYXAgPSB2WzRdO1xuICAgICAgICAgICAgICBjb25zdCB2YWxpZGF0aW9uTWFwID0gdls1XTtcbiAgICAgICAgICAgICAgY29uc3Qgd2FybmluZ01hcCA9IHZbNl07XG4gICAgICAgICAgICAgIGNvbnN0IG5leHRTbGlkZUNvbmRpdGlvbnNNYXAgPSB2WzddO1xuICAgICAgICAgICAgICBjb25zdCBmaWx0ZXJlZENob2ljZXNNYXAgPSB2WzhdO1xuICAgICAgICAgICAgICBjb25zdCB0cmlnZ2VyQ29uZGl0aW9uc01hcCA9IHZbOV07XG4gICAgICAgICAgICAgIGNvbnN0IG5vZGVzID0gdlsxMF07XG5cbiAgICAgICAgICAgICAgLy8gdGFrZXMgdGhlIG5hbWVzIG9mIHRoZSBmaWVsZHMgdGhhdCBoYXZlIGNoYW5nZWRcbiAgICAgICAgICAgICAgY29uc3QgZGVsdGEgPSB0aGlzLl9mb3JtVmFsdWVEZWx0YShvbGRGb3JtVmFsdWUsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgIGNvbnN0IGRlbHRhTGVuID0gZGVsdGEubGVuZ3RoO1xuICAgICAgICAgICAgICBsZXQgdXBkYXRlZE5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSA9IFtdO1xuXG4gICAgICAgICAgICAgIC8qXG4gICAgICAgICAgICAgICAgZm9yIGVhY2ggZmllbGQgdXBkYXRlIGFsbCBwcm9wZXJ0aWVzIG1hcFxuICAgICAgICAgICAgICAgIHdpdGggdGhlIGZvbGxvd2luZyBydWxlICBcImlmIGZpZWxkbmFtZSBpcyBpbiBtYXAgdXBkYXRlIGl0XCIgYW5kXG4gICAgICAgICAgICAgICAgcHVzaCBvbiB1cGRhdGVOb2RlcyB0aGUgbm9kZSBpbnN0YW5jZSB0aGF0IHdyYXAgZmllbGRcbiAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgZGVsdGEuZm9yRWFjaCgoZmllbGROYW1lKSA9PiB7XG4gICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzID0gdXBkYXRlZE5vZGVzLmNvbmNhdChcbiAgICAgICAgICAgICAgICAgICAgbm9kZXMuZmlsdGVyKG4gPT4gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG4pID09PSBmaWVsZE5hbWUpKTtcbiAgICAgICAgICAgICAgICBpZiAodmlzaWJpbGl0eU1hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHZpc2liaWxpdHlNYXBbZmllbGROYW1lXS5mb3JFYWNoKG5vZGVJbnN0YW5jZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNvbXBsZXRlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB2aXNpYmlsaXR5Q2hhbmdlZCA9IHVwZGF0ZVZpc2liaWxpdHkobm9kZUluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBpc0ZpZWxkID0gaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIGlmICh2aXNpYmlsaXR5Q2hhbmdlZCAmJiAhbm9kZUluc3RhbmNlLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmZyAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzID0gdGltZXIoMjAwKS5zdWJzY3JpYmUoKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAocyAmJiAhcy5jbG9zZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgZmcuY29udHJvbHNbY29tcGxldGVOYW1lXS5zZXRWYWx1ZShudWxsKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgKG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlKS52YWx1ZSA9IG51bGw7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHZpc2liaWxpdHlDaGFuZ2VkICYmIG5vZGVJbnN0YW5jZS52aXNpYmxlICYmIGlzRmllbGQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmZyA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZnLmNvbnRyb2xzW2NvbXBsZXRlTmFtZV0uc2V0VmFsdWUocmVzLnZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHJlcGV0aXRpb25NYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICByZXBldGl0aW9uTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaChub2RlSW5zdGFuY2UgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJuSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IG9sZFJlcHMgPSB1cGRhdGVSZXBzTnVtKHJuSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKG9sZFJlcHMgIT09IHJuSW5zdGFuY2UucmVwcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fYWRqdXN0UmVwcyhub2Rlcywgcm5JbnN0YW5jZSwgb2xkUmVwcywgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGNvbmRpdGlvbmFsQnJhbmNoZXNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb25kaXRpb25hbEJyYW5jaGVzTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIC8vIGNvbnN0IGJyYW5jaENoYW5nZWQgPSBub2RlSW5zdGFuY2UudXBkYXRlQ29uZGl0aW9uYWxCcmFuY2hlcyhuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICB1cGRhdGVDb25kaXRpb25hbEJyYW5jaGVzKG5vZGVJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgLy8gaWYgKGJyYW5jaENoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdmVyaWZpZWRCcmFuY2ggPSBub2RlSW5zdGFuY2UudmVyaWZpZWRCcmFuY2g7XG4gICAgICAgICAgICAgICAgICAgIG5vZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKF9jb25kaXRpb24sIGlkeCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChpZHggPT0gdmVyaWZpZWRCcmFuY2gpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3Nob3dTdWJ0cmVlKG5ld0Zvcm1WYWx1ZSwgbm9kZXMsIG5vZGVJbnN0YW5jZSwgaWR4KTtcbiAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5faGlkZVN1YnRyZWUobmV3Rm9ybVZhbHVlLCBub2Rlcywgbm9kZUluc3RhbmNlLCBpZHgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgICAgIC8vIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZvcm11bGFNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBmb3JtdWxhTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IHVwZGF0ZUZvcm11bGEoZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZnID0gdGhpcy5fZm9ybUdyb3VwLmdldFZhbHVlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKGZnICE9IG51bGwgJiYgcmVzLmNoYW5nZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVZhbGlkYXRpb24oZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZmcuY29udHJvbHNbbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGVJbnN0YW5jZSldLnNldFZhbHVlKHJlcy52YWx1ZSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0aW9uTWFwW2ZpZWxkTmFtZV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgdmFsaWRhdGlvbk1hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBuZXdGb3JtVmFsdWUuJHZhbHVlID0gbmV3Rm9ybVZhbHVlW25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpXTtcbiAgICAgICAgICAgICAgICAgICAgICB1cGRhdGVWYWxpZGF0aW9uKFxuICAgICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2UsIG5ld0Zvcm1WYWx1ZSwgdGhpcy5jdXJyZW50U3VwcGxlbWVudGFyeUluZm9ybWF0aW9ucyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKHdhcm5pbmdNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICB3YXJuaW5nTWFwW2ZpZWxkTmFtZV0uZm9yRWFjaCgobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGZJbnN0YW5jZSA9IG5vZGVJbnN0YW5jZSBhcyBBamZGaWVsZEluc3RhbmNlO1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZVdhcm5pbmcoZkluc3RhbmNlLCBuZXdGb3JtVmFsdWUpO1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChmSW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMgIT0gbnVsbCAmJlxuICAgICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2Uud2FybmluZ1Jlc3VsdHMuZmlsdGVyKHdhcm5pbmcgPT4gd2FybmluZy5yZXN1bHQpLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZS53YXJuaW5nVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmICh1cGRhdGVkTm9kZXMuaW5kZXhPZihub2RlSW5zdGFuY2UpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgICAgIHVwZGF0ZWROb2Rlcy5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGlmIChkZWx0YUxlbiA9PSAxICYmIG5leHRTbGlkZUNvbmRpdGlvbnNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBpZiAobmV4dFNsaWRlQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdXG4gICAgICAgICAgICAgICAgICAgICAgICAgIC5maWx0ZXIoKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlTmV4dFNsaWRlQ29uZGl0aW9uKGZJbnN0YW5jZSwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fbmV4dFNsaWRlVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGZpbHRlcmVkQ2hvaWNlc01hcFtmaWVsZE5hbWVdICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGZpbHRlcmVkQ2hvaWNlc01hcFtmaWVsZE5hbWVdLmZvckVhY2goKG5vZGVJbnN0YW5jZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICBjb25zdCBmSW5zdGFuY2UgPSBub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZTtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoaXNGaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdXBkYXRlRmlsdGVyZWRDaG9pY2VzKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZJbnN0YW5jZSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55PiwgbmV3Rm9ybVZhbHVlKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgaWYgKHVwZGF0ZWROb2Rlcy5pbmRleE9mKG5vZGVJbnN0YW5jZSkgPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLnB1c2gobm9kZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgaWYgKGRlbHRhTGVuID09IDEgJiYgdHJpZ2dlckNvbmRpdGlvbnNNYXBbZmllbGROYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICBjb25zdCByZXMgPSB0cmlnZ2VyQ29uZGl0aW9uc01hcFtmaWVsZE5hbWVdLmZpbHRlcigobm9kZUluc3RhbmNlKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNGaWVsZEluc3RhbmNlKG5vZGVJbnN0YW5jZSkpIHtcbiAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZkluc3RhbmNlID0gbm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgICAgICAgICAgICAgICAgIGlmICghaXNGaWVsZFdpdGhDaG9pY2VzKGZJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICByZXR1cm4gdXBkYXRlVHJpZ2dlckNvbmRpdGlvbnMoXG4gICAgICAgICAgICAgICAgICAgICAgICBmSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT4sIG5ld0Zvcm1WYWx1ZSk7XG4gICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgKHJlc1swXSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzSW5zdGFuY2U8YW55Pikuc2VsZWN0aW9uVHJpZ2dlci5lbWl0KCk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgdXBkYXRlZE5vZGVzLmZvckVhY2gobiA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3Qgbm9kZUlkeCA9IG5vZGVzLmluZGV4T2Yobik7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IG5vZGVJZHggLSAxO1xuICAgICAgICAgICAgICAgIHdoaWxlIChpZHggPj0gMCkge1xuICAgICAgICAgICAgICAgICAgY29uc3QgY3VyTm9kZSA9IG5vZGVzW2lkeF07XG4gICAgICAgICAgICAgICAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShjdXJOb2RlKSkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBzbGlkZSA9IGN1ck5vZGUgYXMgKEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UgfCBBamZTbGlkZUluc3RhbmNlKTtcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3ViTm9kZXNOdW0gPSBzbGlkZS5mbGF0Tm9kZXMubGVuZ3RoO1xuICAgICAgICAgICAgICAgICAgICBsZXQgdmFsaWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCBzdWJOb2Rlc051bSA7IGkrKykge1xuICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN1Yk5vZGUgPSBzbGlkZS5mbGF0Tm9kZXNbaV07XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgICAgICAgc3ViTm9kZS52aXNpYmxlICYmIGlzRmllbGRJbnN0YW5jZShzdWJOb2RlKVxuICAgICAgICAgICAgICAgICAgICAgICAgJiYgIShzdWJOb2RlIGFzIEFqZkZpZWxkSW5zdGFuY2UpLnZhbGlkXG4gICAgICAgICAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YWxpZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGlmIChzbGlkZS52YWxpZCAhPT0gdmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICBzbGlkZS52YWxpZCA9IHZhbGlkO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHNsaWRlLnVwZGF0ZWRFdnQuZW1pdCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWR4LS07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIG4udXBkYXRlZEV2dC5lbWl0KCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoaW5pdEZvcm0pIHtcbiAgICAgICAgICAgICAgICBpbml0Rm9ybSA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIHRoaXMuX2Zvcm1Jbml0RXZlbnQuZW1pdChBamZGb3JtSW5pdFN0YXR1cy5Db21wbGV0ZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdGhpcy5fdmFsdWVDaGFuZ2VkLm5leHQoKTtcbiAgICAgICAgICAgIH0pO1xuICAgIHJldHVybiBmb3JtR3JvdXA7XG4gIH1cblxuICBwcml2YXRlIF9zaG93U3VidHJlZShcbiAgICAgIGNvbnRleHQ6IEFqZkNvbnRleHQsIG5vZGVzOiBBamZOb2RlSW5zdGFuY2VbXSwgbm9kZTogQWpmTm9kZUluc3RhbmNlLCBicmFuY2g/OiBudW1iZXIpIHtcbiAgICB0aGlzLl91cGRhdGVTdWJ0cmVlVmlzaWJpbGl0eShjb250ZXh0LCBub2Rlcywgbm9kZSwgdHJ1ZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVTdWJ0cmVlKFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCwgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UsIGJyYW5jaD86IG51bWJlcikge1xuICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBub2RlLCBmYWxzZSwgYnJhbmNoKTtcbiAgfVxuXG4gIHByaXZhdGUgX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KFxuICAgICAgY29udGV4dDogQWpmQ29udGV4dCwgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdLCBub2RlOiBBamZOb2RlSW5zdGFuY2UsIHZpc2libGU6IGJvb2xlYW4sXG4gICAgICBicmFuY2g/OiBudW1iZXIpIHtcbiAgICBsZXQgc3ViTm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdO1xuICAgIGNvbnN0IG5vZGVTdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobm9kZSk7XG4gICAgaWYgKGJyYW5jaCAhPSBudWxsKSB7XG4gICAgICBzdWJOb2RlcyA9IG5vZGVzLmZpbHRlcihuID0+IHtcbiAgICAgICAgY29uc3Qgc3VmZml4ID0gbm9kZUluc3RhbmNlU3VmZml4KG4pO1xuICAgICAgICByZXR1cm4gc3VmZml4ID09IG5vZGVTdWZmaXggJiYgbi5ub2RlLnBhcmVudCA9PSBub2RlLm5vZGUuaWQgJiYgbi5ub2RlLnBhcmVudE5vZGUgPT0gYnJhbmNoO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHN1Yk5vZGVzID0gbm9kZXMuZmlsdGVyKG4gPT4ge1xuICAgICAgICBjb25zdCBzdWZmaXggPSBub2RlSW5zdGFuY2VTdWZmaXgobik7XG4gICAgICAgIHJldHVybiBzdWZmaXggPT0gbm9kZVN1ZmZpeCAmJiBuLm5vZGUucGFyZW50ID09IG5vZGUubm9kZS5pZDtcbiAgICAgIH0pO1xuICAgIH1cbiAgICBjb25zdCBpc0NvbnRhaW5lciA9IGlzQ29udGFpbmVyTm9kZShub2RlLm5vZGUpO1xuICAgIHN1Yk5vZGVzLmZvckVhY2goKG4pID0+IHtcbiAgICAgIGlmIChcbiAgICAgICAgIWlzQ29udGFpbmVyIHx8XG4gICAgICAgIChpc0NvbnRhaW5lciAmJiAoPEFqZk5vZGVHcm91cD5ub2RlLm5vZGUpLm5vZGVzLmZpbmQoY24gPT4gY24uaWQgPT0gbi5ub2RlLmlkKSA9PSBudWxsKVxuICAgICAgKSB7XG4gICAgICAgIHVwZGF0ZVZpc2liaWxpdHkobiwgY29udGV4dCwgdmlzaWJsZSk7XG4gICAgICAgIHVwZGF0ZUZvcm11bGEobiBhcyBBamZGb3JtdWxhRmllbGRJbnN0YW5jZSwgY29udGV4dCk7XG4gICAgICAgIHRoaXMuX3VwZGF0ZVN1YnRyZWVWaXNpYmlsaXR5KGNvbnRleHQsIG5vZGVzLCBuLCB2aXNpYmxlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2luaXROb2Rlc1N0cmVhbXMoKTogdm9pZCB7XG4gICAgdGhpcy5fbm9kZXMgPVxuICAgICAgICB0aGlzLl9ub2Rlc1VwZGF0ZXMucGlwZShzY2FuKChub2RlczogQWpmTm9kZUluc3RhbmNlW10sIG9wOiBBamZOb2Rlc0luc3RhbmNlc09wZXJhdGlvbikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBvcChub2Rlcyk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0sIFtdKSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fZmxhdE5vZGVzVHJlZSA9IHRoaXMuX25vZGVzLnBpcGUobWFwKG5vZGVzID0+IGZsYXR0ZW5Ob2Rlc0luc3RhbmNlc1RyZWUobm9kZXMpKSwgc2hhcmUoKSk7XG4gICAgdGhpcy5fZmxhdE5vZGVzID0gdGhpcy5fZmxhdE5vZGVzVHJlZS5waXBlKFxuICAgICAgICBtYXAoc2xpZGVzID0+IHtcbiAgICAgICAgICBsZXQgbm9kZXM6IEFqZk5vZGVJbnN0YW5jZVtdID0gW107XG4gICAgICAgICAgc2xpZGVzLmZvckVhY2gocyA9PiB7XG4gICAgICAgICAgICBub2Rlcy5wdXNoKHMpO1xuICAgICAgICAgICAgbm9kZXMgPSBub2Rlcy5jb25jYXQocy5mbGF0Tm9kZXMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBub2RlcztcbiAgICAgICAgfSksXG4gICAgICAgIHNoYXJlKCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZUluc3RhbmNlKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogQWpmTm9kZUluc3RhbmNlIHtcbiAgICBjb25zdCBub2RlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlSW5zdGFuY2UpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzVmlzaWJpbGl0eU1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc1JlcGV0aXRpb25NYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc0Zvcm11bGFNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNWYWxpZGF0aW9uTWFwSW5kZXgobm9kZU5hbWUpO1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzV2FybmluZ01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNGaWx0ZXJlZENob2ljZXNNYXBJbmRleChub2RlTmFtZSk7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcEluZGV4KG5vZGVOYW1lKTtcbiAgICBpZiAoaXNTbGlkZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fcmVtb3ZlU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmQmFzZVNsaWRlSW5zdGFuY2UpO1xuICAgIH0gZWxzZSBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKG5vZGVJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgdGhpcy5fcmVtb3ZlRmllbGRJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmRmllbGRJbnN0YW5jZSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5vZGVJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZVNsaWRlSW5zdGFuY2Uoc2xpZGVJbnN0YW5jZTogQWpmQmFzZVNsaWRlSW5zdGFuY2UpOiBBamZCYXNlU2xpZGVJbnN0YW5jZSB7XG4gICAgY29uc3Qgc2xpZGUgPSBzbGlkZUluc3RhbmNlLm5vZGU7XG4gICAgaWYgKHNsaWRlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVmlzaWJpbGl0eU1hcChzbGlkZUluc3RhbmNlLCBzbGlkZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIHNsaWRlSW5zdGFuY2UuY29uZGl0aW9uYWxCcmFuY2hlcy5mb3JFYWNoKChjb25kaXRpb25hbEJyYW5jaDogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChzbGlkZUluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuICAgIHJldHVybiBzbGlkZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUdyb3VwSW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk6XG4gICAgICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uge1xuICAgIGNvbnN0IG5vZGVHcm91cCA9IG5vZGVHcm91cEluc3RhbmNlLm5vZGU7XG4gICAgaWYgKG5vZGVHcm91cC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAobm9kZUdyb3VwSW5zdGFuY2UsIG5vZGVHcm91cC52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuICAgIGlmIChub2RlR3JvdXBJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsICYmIG5vZGVHcm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgfVxuICAgIHJldHVybiBub2RlR3JvdXBJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZpZWxkSW5zdGFuY2UoZmllbGRJbnN0YW5jZTogQWpmRmllbGRJbnN0YW5jZSk6IEFqZkZpZWxkSW5zdGFuY2Uge1xuICAgIGNvbnN0IGZvcm1Hcm91cCA9IHRoaXMuX2Zvcm1Hcm91cC5nZXRWYWx1ZSgpO1xuICAgIGNvbnN0IGZpZWxkSW5zdGFuY2VOYW1lID0gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGZpZWxkSW5zdGFuY2UpO1xuICAgIGlmIChmb3JtR3JvdXAgIT0gbnVsbCAmJiBmb3JtR3JvdXAuY29udGFpbnMoZmllbGRJbnN0YW5jZU5hbWUpKSB7XG4gICAgICBmb3JtR3JvdXAucmVtb3ZlQ29udHJvbChmaWVsZEluc3RhbmNlTmFtZSk7XG4gICAgfVxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZhbGlkYXRpb24gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fdmFsaWRhdGlvbk5vZGVzTWFwVXBkYXRlcy5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICBkZWxldGUgdm1hcFtmaWVsZEluc3RhbmNlTmFtZV07XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc1Zpc2liaWxpdHlNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgZmllbGRJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbmFsQnJhbmNoLmNvbmRpdGlvbik7XG4gICAgfSk7XG5cbiAgICBpZiAoZmllbGRJbnN0YW5jZS5mb3JtdWxhKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNGb3JtdWxhTWFwKGZpZWxkSW5zdGFuY2UsIGZpZWxkSW5zdGFuY2UuZm9ybXVsYS5mb3JtdWxhKTtcbiAgICB9XG5cbiAgICAvLyBUT0RPOiBjaGVjayB0aGlzLCBwcm9iYWJseSBpcyBuZXZlciB2ZXJpZmllZFxuICAgIGlmIChpc1JlcGVhdGluZ0NvbnRhaW5lck5vZGUoZmllbGRJbnN0YW5jZS5ub2RlKSkge1xuICAgICAgY29uc3QgcmNJbnN0YW5jZSA9IChmaWVsZEluc3RhbmNlIGFzIEFqZk5vZGVJbnN0YW5jZSBhcyBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2UpO1xuICAgICAgaWYgKHJjSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNSZXBldGl0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIHJjSW5zdGFuY2UuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsICYmIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNWYWxpZGF0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2Uud2FybmluZyAhPSBudWxsKSB7XG4gICAgICBmaWVsZEluc3RhbmNlLndhcm5pbmcuY29uZGl0aW9ucy5mb3JFYWNoKChjb25kaXRpb24pID0+IHtcbiAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzV2FybmluZ01hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKFxuICAgICAgICBmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb25cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGlzRmllbGRXaXRoQ2hvaWNlcyhmaWVsZEluc3RhbmNlLm5vZGUpKSB7XG4gICAgICBjb25zdCBmd2NJbnN0YW5jZSA9IGZpZWxkSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT47XG4gICAgICBpZiAoZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChmaWVsZEluc3RhbmNlLCBmd2NJbnN0YW5jZS5jaG9pY2VzRmlsdGVyLmZvcm11bGEpO1xuICAgICAgICBpZiAoZndjSW5zdGFuY2UudHJpZ2dlckNvbmRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICAgIGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICAgICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAoZmllbGRJbnN0YW5jZSwgY29uZGl0aW9uLmNvbmRpdGlvbik7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGRJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZE5vZGVJbnN0YW5jZShub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSk6IEFqZk5vZGVJbnN0YW5jZSB7XG4gICAgaWYgKGlzUmVwZWF0aW5nQ29udGFpbmVyTm9kZShub2RlSW5zdGFuY2Uubm9kZSkpIHtcbiAgICAgIHJldHVybiB0aGlzLl9hZGROb2RlR3JvdXBJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmUmVwZWF0aW5nQ29udGFpbmVyTm9kZUluc3RhbmNlKTtcbiAgICB9IGVsc2UgaWYgKGlzU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UpKSB7XG4gICAgICByZXR1cm4gdGhpcy5fYWRkU2xpZGVJbnN0YW5jZShub2RlSW5zdGFuY2UgYXMgQWpmU2xpZGVJbnN0YW5jZSk7XG4gICAgfSBlbHNlIGlmIChpc0ZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlKSkge1xuICAgICAgcmV0dXJuIHRoaXMuX2FkZEZpZWxkSW5zdGFuY2Uobm9kZUluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2UpO1xuICAgIH1cblxuICAgIHJldHVybiBub2RlSW5zdGFuY2U7XG4gIH1cblxuICBwcml2YXRlIF9hZGRGaWVsZEluc3RhbmNlKGZpZWxkSW5zdGFuY2U6IEFqZkZpZWxkSW5zdGFuY2UpOiBBamZGaWVsZEluc3RhbmNlIHtcbiAgICBjb25zdCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICBjb25zdCBmaWVsZEluc3RhbmNlTmFtZSA9IG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShmaWVsZEluc3RhbmNlKTtcbiAgICBpZiAoZm9ybUdyb3VwICE9IG51bGwgJiYgIWZvcm1Hcm91cC5jb250YWlucyhmaWVsZEluc3RhbmNlTmFtZSkpIHtcbiAgICAgIGNvbnN0IGNvbnRyb2wgPSBuZXcgRm9ybUNvbnRyb2woKTtcbiAgICAgIGNvbnRyb2wuc2V0VmFsdWUoZmllbGRJbnN0YW5jZS52YWx1ZSk7XG4gICAgICBmb3JtR3JvdXAucmVnaXN0ZXJDb250cm9sKGZpZWxkSW5zdGFuY2VOYW1lLCBjb250cm9sKTtcbiAgICB9XG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsKSB7XG4gICAgICB0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICBpZiAodm1hcFtmaWVsZEluc3RhbmNlTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdID0gW107XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHZtYXBbZmllbGRJbnN0YW5jZU5hbWVdLmluZGV4T2YoZmllbGRJbnN0YW5jZSkgPT0gLTEpIHtcbiAgICAgICAgICB2bWFwW2ZpZWxkSW5zdGFuY2VOYW1lXS5wdXNoKGZpZWxkSW5zdGFuY2UpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB2bWFwO1xuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLnZpc2liaWxpdHkgIT0gbnVsbCkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1Zpc2liaWxpdHlNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS52aXNpYmlsaXR5LmNvbmRpdGlvbik7XG4gICAgfVxuXG4gICAgZmllbGRJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UuZm9ybXVsYSkge1xuICAgICAgdGhpcy5fYWRkVG9Ob2Rlc0Zvcm11bGFNYXAoZmllbGRJbnN0YW5jZSwgZmllbGRJbnN0YW5jZS5mb3JtdWxhLmZvcm11bGEpO1xuICAgIH1cblxuICAgIGlmIChpc05vZGVHcm91cEluc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBjb25zdCBuZ0luc3RhbmNlID0gZmllbGRJbnN0YW5jZSBhcyBBamZOb2RlSW5zdGFuY2UgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2U7XG4gICAgICBpZiAobmdJbnN0YW5jZS5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKGZpZWxkSW5zdGFuY2UsIG5nSW5zdGFuY2UuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbiAhPSBudWxsICYmIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zICE9IG51bGwpIHtcbiAgICAgIGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvbi5jb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbikgPT4ge1xuICAgICAgICB0aGlzLl9hZGRUb05vZGVzVmFsaWRhdGlvbk1hcChmaWVsZEluc3RhbmNlLCBjb25kaXRpb24uY29uZGl0aW9uKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmIChmaWVsZEluc3RhbmNlLndhcm5pbmcgIT0gbnVsbCkge1xuICAgICAgZmllbGRJbnN0YW5jZS53YXJuaW5nLmNvbmRpdGlvbnMuZm9yRWFjaCgoY29uZGl0aW9uKSA9PiB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNXYXJuaW5nTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgaWYgKGZpZWxkSW5zdGFuY2UubmV4dFNsaWRlQ29uZGl0aW9uICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKFxuICAgICAgICBmaWVsZEluc3RhbmNlLCBmaWVsZEluc3RhbmNlLm5leHRTbGlkZUNvbmRpdGlvbi5jb25kaXRpb25cbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGlzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlcyhmaWVsZEluc3RhbmNlLm5vZGUpIHx8IGlzRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlKGZpZWxkSW5zdGFuY2UpKSB7XG4gICAgICBjb25zdCBmd2NJbnN0YW5jZSA9IGZpZWxkSW5zdGFuY2UgYXMgQWpmRmllbGRXaXRoQ2hvaWNlc0luc3RhbmNlPGFueT47XG4gICAgICBpZiAoZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlciAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAoZmllbGRJbnN0YW5jZSwgZndjSW5zdGFuY2UuY2hvaWNlc0ZpbHRlci5mb3JtdWxhKTtcbiAgICAgIH1cbiAgICAgIGlmIChmd2NJbnN0YW5jZS50cmlnZ2VyQ29uZGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIGZ3Y0luc3RhbmNlLnRyaWdnZXJDb25kaXRpb25zLmZvckVhY2goKGNvbmRpdGlvbjogQWpmQ29uZGl0aW9uKSA9PiB7XG4gICAgICAgICAgdGhpcy5fYWRkVG9Ob2Rlc1RyaWdnZXJDb25kaXRpb25zTWFwKGZpZWxkSW5zdGFuY2UsIGNvbmRpdGlvbi5jb25kaXRpb24pO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gZmllbGRJbnN0YW5jZTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFNsaWRlSW5zdGFuY2Uoc2xpZGVJbnN0YW5jZTogQWpmU2xpZGVJbnN0YW5jZSk6IEFqZlNsaWRlSW5zdGFuY2Uge1xuICAgIGNvbnN0IHNsaWRlID0gc2xpZGVJbnN0YW5jZS5ub2RlO1xuICAgIGlmIChzbGlkZS52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKHNsaWRlSW5zdGFuY2UsIHNsaWRlLnZpc2liaWxpdHkuY29uZGl0aW9uKTtcbiAgICB9XG4gICAgc2xpZGVJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChzbGlkZUluc3RhbmNlLCBjb25kaXRpb25hbEJyYW5jaC5jb25kaXRpb24pO1xuICAgIH0pO1xuICAgIHJldHVybiBzbGlkZUluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkTm9kZUdyb3VwSW5zdGFuY2Uobm9kZUdyb3VwSW5zdGFuY2U6IEFqZlJlcGVhdGluZ0NvbnRhaW5lck5vZGVJbnN0YW5jZSk6XG4gICAgICBBamZSZXBlYXRpbmdDb250YWluZXJOb2RlSW5zdGFuY2Uge1xuICAgIGNvbnN0IG5vZGVHcm91cCA9IG5vZGVHcm91cEluc3RhbmNlLm5vZGU7XG4gICAgaWYgKG5vZGVHcm91cC52aXNpYmlsaXR5ICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAudmlzaWJpbGl0eS5jb25kaXRpb24pO1xuICAgIH1cbiAgICBub2RlR3JvdXBJbnN0YW5jZS5jb25kaXRpb25hbEJyYW5jaGVzLmZvckVhY2goKGNvbmRpdGlvbmFsQnJhbmNoOiBBamZDb25kaXRpb24pID0+IHtcbiAgICAgIHRoaXMuX2FkZFRvTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcChub2RlR3JvdXBJbnN0YW5jZSwgY29uZGl0aW9uYWxCcmFuY2guY29uZGl0aW9uKTtcbiAgICB9KTtcbiAgICBpZiAobm9kZUdyb3VwSW5zdGFuY2UuZm9ybXVsYVJlcHMgIT0gbnVsbCkge1xuICAgICAgaWYgKG5vZGVHcm91cC5mb3JtdWxhUmVwcyAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2FkZFRvTm9kZXNSZXBldGl0aW9uTWFwKG5vZGVHcm91cEluc3RhbmNlLCBub2RlR3JvdXAuZm9ybXVsYVJlcHMuZm9ybXVsYSk7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGxldCBmb3JtR3JvdXAgPSB0aGlzLl9mb3JtR3JvdXAuZ2V0VmFsdWUoKTtcbiAgICAgIGxldCBub2RlR3JvdXBJbnN0YW5jZU5hbWUgPSBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZUdyb3VwSW5zdGFuY2UpO1xuICAgICAgaWYgKGZvcm1Hcm91cCAhPSBudWxsICYmICFmb3JtR3JvdXAuY29udGFpbnMobm9kZUdyb3VwSW5zdGFuY2VOYW1lKSkge1xuICAgICAgICBjb25zdCBjb250cm9sID0gbmV3IEZvcm1Db250cm9sKCk7XG4gICAgICAgIGNvbnRyb2wuc2V0VmFsdWUobm9kZUdyb3VwSW5zdGFuY2UucmVwcyk7XG4gICAgICAgIGZvcm1Hcm91cC5yZWdpc3RlckNvbnRyb2wobm9kZUdyb3VwSW5zdGFuY2VOYW1lLCBjb250cm9sKTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIG5vZGVHcm91cEluc3RhbmNlO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNWaXNpYmlsaXR5TWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNSZXBldGl0aW9uTWFwSW5kZXgoaW5kZXg6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZU5vZGVzTWFwSW5kZXgodGhpcy5fcmVwZXRpdGlvbk5vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNDb25kaXRpb25hbEJyYW5jaE1hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0Zvcm11bGFNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9mb3JtdWxhTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1ZhbGlkYXRpb25NYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc1dhcm5pbmdNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX2ZpbHRlcmVkQ2hvaWNlc05vZGVzTWFwVXBkYXRlcywgaW5kZXgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcEluZGV4KGluZGV4OiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVOb2Rlc01hcEluZGV4KHRoaXMuX3RyaWdnZXJDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc05leHRTbGlkZUNvbmRpdGlvbnNNYXBJbmRleChpbmRleDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlTm9kZXNNYXBJbmRleCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBpbmRleCk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVOb2Rlc01hcEluZGV4KG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiwgaW5kZXg6IHN0cmluZykge1xuICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHZtYXApLmluZGV4T2YoaW5kZXgpID4gLTEpIHtcbiAgICAgICAgZGVsZXRlIHZtYXBbaW5kZXhdO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHZtYXA7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fdmlzaWJpbGl0eU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1JlcGV0aXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzQ29uZGl0aW9uYWxCcmFuY2hNYXAoXG4gICAgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZ1xuICApOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fY29uZGl0aW9uYWxCcmFuY2hOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNGb3JtdWxhTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW1vdmVGcm9tTm9kZXNNYXAodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlbW92ZUZyb21Ob2Rlc1ZhbGlkYXRpb25NYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl92YWxpZGF0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVtb3ZlRnJvbU5vZGVzV2FybmluZ01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX3dhcm5pbmdOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNGaWx0ZXJlZENob2ljZXNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNUcmlnZ2VyQ29uZGl0aW9uc01hcChcbiAgICBub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nXG4gICk6IHZvaWQge1xuICAgIHRoaXMuX3JlbW92ZUZyb21Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNOZXh0U2xpZGVDb25kaXRpb25zTWFwKFxuICAgIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmdcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5fcmVtb3ZlRnJvbU5vZGVzTWFwKHRoaXMuX25leHRTbGlkZUNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9yZW1vdmVGcm9tTm9kZXNNYXAoXG4gICAgICBub2Rlc01hcDogU3ViamVjdDxBamZSZW5kZXJlclVwZGF0ZU1hcE9wZXJhdGlvbj4sIG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLFxuICAgICAgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IHRva2VucyA9IHRva2VuaXplKGZvcm11bGEpXG4gICAgICAuZmlsdGVyKCh0b2tlbjogYW55KSA9PiB0b2tlbi50eXBlID09ICdJZGVudGlmaWVyJyAmJiB0b2tlbi52YWx1ZSAhPSAnJHZhbHVlJyk7XG4gICAgaWYgKHRva2Vucy5sZW5ndGggPiAwKSB7XG4gICAgICBub2Rlc01hcC5uZXh0KCh2bWFwOiBBamZSZW5kZXJlclVwZGF0ZU1hcCk6IEFqZlJlbmRlcmVyVXBkYXRlTWFwID0+IHtcbiAgICAgICAgdG9rZW5zLmZvckVhY2goKHRva2VuOiBhbnkpID0+IHtcbiAgICAgICAgICBsZXQgdG9rZW5OYW1lID0gdG9rZW4udmFsdWU7XG4gICAgICAgICAgaWYgKHZtYXBbdG9rZW5OYW1lXSAhPSBudWxsKSB7XG4gICAgICAgICAgICBjb25zdCBpZHggPSB2bWFwW3Rva2VuTmFtZV0uaW5kZXhPZihub2RlSW5zdGFuY2UpO1xuICAgICAgICAgICAgaWYgKGlkeCA+IC0xKSB7XG4gICAgICAgICAgICAgIHZtYXBbdG9rZW5OYW1lXS5zcGxpY2UoaWR4LCAxKTtcbiAgICAgICAgICAgICAgaWYgKHZtYXBbdG9rZW5OYW1lXS5sZW5ndGggPT0gMCkge1xuICAgICAgICAgICAgICAgIGRlbGV0ZSB2bWFwW3Rva2VuTmFtZV07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gdm1hcDtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWaXNpYmlsaXR5TWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3Zpc2liaWxpdHlOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzUmVwZXRpdGlvbk1hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9yZXBldGl0aW9uTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0NvbmRpdGlvbmFsQnJhbmNoTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX2NvbmRpdGlvbmFsQnJhbmNoTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0Zvcm11bGFNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fZm9ybXVsYU5vZGVzTWFwVXBkYXRlcywgbm9kZUluc3RhbmNlLCBmb3JtdWxhKTtcbiAgfVxuXG4gIHByaXZhdGUgX2FkZFRvTm9kZXNWYWxpZGF0aW9uTWFwKG5vZGVJbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlLCBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9hZGRUb05vZGVzTWFwKHRoaXMuX3ZhbGlkYXRpb25Ob2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzV2FybmluZ01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl93YXJuaW5nTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc0ZpbHRlcmVkQ2hvaWNlc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9maWx0ZXJlZENob2ljZXNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzVHJpZ2dlckNvbmRpdGlvbnNNYXAobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsIGZvcm11bGE6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2FkZFRvTm9kZXNNYXAodGhpcy5fdHJpZ2dlckNvbmRpdGlvbnNOb2Rlc01hcFVwZGF0ZXMsIG5vZGVJbnN0YW5jZSwgZm9ybXVsYSk7XG4gIH1cblxuICBwcml2YXRlIF9hZGRUb05vZGVzTmV4dFNsaWRlQ29uZGl0aW9uc01hcChub2RlSW5zdGFuY2U6IEFqZk5vZGVJbnN0YW5jZSwgZm9ybXVsYTogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fYWRkVG9Ob2Rlc01hcCh0aGlzLl9uZXh0U2xpZGVDb25kaXRpb25zTm9kZXNNYXBVcGRhdGVzLCBub2RlSW5zdGFuY2UsIGZvcm11bGEpO1xuICB9XG5cbiAgcHJpdmF0ZSBfYWRkVG9Ob2Rlc01hcChcbiAgICAgIG5vZGVzTWFwOiBTdWJqZWN0PEFqZlJlbmRlcmVyVXBkYXRlTWFwT3BlcmF0aW9uPiwgbm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UsXG4gICAgICBmb3JtdWxhOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgdG9rZW5zID0gdG9rZW5pemUoZm9ybXVsYSlcbiAgICAgIC5maWx0ZXIoKHRva2VuOiBhbnkpID0+IHRva2VuLnR5cGUgPT0gJ0lkZW50aWZpZXInICYmIHRva2VuLnZhbHVlICE9ICckdmFsdWUnKTtcbiAgICBpZiAodG9rZW5zLmxlbmd0aCA+IDApIHtcbiAgICAgIG5vZGVzTWFwLm5leHQoKHZtYXA6IEFqZlJlbmRlcmVyVXBkYXRlTWFwKTogQWpmUmVuZGVyZXJVcGRhdGVNYXAgPT4ge1xuICAgICAgICB0b2tlbnMuZm9yRWFjaCgodG9rZW46IGFueSkgPT4ge1xuICAgICAgICAgIGxldCB0b2tlbk5hbWUgPSB0b2tlbi52YWx1ZTtcbiAgICAgICAgICBpZiAodm1hcFt0b2tlbk5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICAgIHZtYXBbdG9rZW5OYW1lXSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAodm1hcFt0b2tlbk5hbWVdLmluZGV4T2Yobm9kZUluc3RhbmNlKSA9PT0gLTEpIHtcbiAgICAgICAgICAgIHZtYXBbdG9rZW5OYW1lXS5wdXNoKG5vZGVJbnN0YW5jZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHZtYXA7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==