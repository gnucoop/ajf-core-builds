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
import { AjfContext } from '@ajf/core/models';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfFieldInstance } from './interface/fields-instances/field-instance';
import { AjfForm } from './interface/forms/form';
import { AjfNodeGroupInstance } from './interface/nodes-instances/node-group-instance';
import { AjfNodeInstance } from './interface/nodes-instances/node-instance';
import { AjfRepeatingSlideInstance } from './interface/slides-instances/repeating-slide-instance';
import { AjfSlideInstance } from './interface/slides-instances/slide-instance';
import { AjfValidationService } from './validation-service';
export declare const enum AjfFormInitStatus {
    Initializing = 0,
    Complete = 1
}
export declare class AjfFormRendererService {
    private _editabilityNodesMap;
    private _editabilityNodesMapUpdates;
    private _visibilityNodesMap;
    private _visibilityNodesMapUpdates;
    private _repetitionNodesMap;
    private _repetitionNodesMapUpdates;
    private _conditionalBranchNodesMap;
    private _conditionalBranchNodesMapUpdates;
    private _formulaNodesMap;
    private _formulaNodesMapUpdates;
    private _validationNodesMap;
    private _validationNodesMapUpdates;
    private _warningNodesMap;
    private _warningNodesMapUpdates;
    private _filteredChoicesNodesMap;
    private _filteredChoicesNodesMapUpdates;
    private _triggerConditionsNodesMap;
    private _triggerConditionsNodesMapUpdates;
    private _nextSlideConditionsNodesMap;
    private _nextSlideConditionsNodesMapUpdates;
    private _formInitEvent;
    readonly formInitEvent: Observable<AjfFormInitStatus>;
    private _formGroup;
    readonly formGroup: Observable<FormGroup | null>;
    private _form;
    private _nodes;
    private _flatNodes;
    private _flatNodesTree;
    private _nodesUpdates;
    private _errorPositions;
    private _errors;
    private _formGroupSubscription;
    private _valueChanged;
    private _nodesMaps;
    private _nextSlideTrigger;
    readonly nextSlideTrigger: Observable<AjfNodeInstance>;
    private _slidesNum;
    readonly slidesNum: Observable<number>;
    get nodesTree(): Observable<AjfSlideInstance[]>;
    get errorPositions(): Observable<number[]>;
    get errors(): Observable<number>;
    get currentSupplementaryInformations(): any;
    constructor(_: AjfValidationService);
    setForm(form: AjfForm | null, context?: AjfContext): void;
    getFormValue(): any;
    addGroup(group: AjfNodeGroupInstance | AjfRepeatingSlideInstance): Observable<boolean>;
    removeGroup(group: AjfNodeGroupInstance | AjfRepeatingSlideInstance): Observable<boolean>;
    getControl(field: AjfFieldInstance): Observable<AbstractControl | null>;
    private _initErrorsStreams;
    private _initUpdateMapStreams;
    private _initFormStreams;
    private _initNodeInstance;
    private _adjustReps;
    private _updateFormValueAndValidity;
    private _explodeRepeatingNode;
    private _orderedNodesInstancesTree;
    private _formValueDelta;
    private _initFormGroupStreams;
    private _showSubtree;
    private _hideSubtree;
    private _updateSubtreeVisibility;
    private _initNodesStreams;
    private _removeNodeInstance;
    private _removeSlideInstance;
    private _removeNodeGroupInstance;
    private _removeFieldInstance;
    private _addNodeInstance;
    private _addFieldInstance;
    private _addSlideInstance;
    private _addNodeGroupInstance;
    private _removeNodesEditabilityMapIndex;
    private _removeNodesVisibilityMapIndex;
    private _removeNodesRepetitionMapIndex;
    private _removeNodesConditionalBranchMapIndex;
    private _removeNodesFormulaMapIndex;
    private _removeNodesValidationMapIndex;
    private _removeNodesWarningMapIndex;
    private _removeNodesFilteredChoicesMapIndex;
    private _removeNodesTriggerConditionsMapIndex;
    private _removeNodesNextSlideConditionsMapIndex;
    private _removeNodesMapIndex;
    private _removeFromNodesVisibilityMap;
    private _removeFromNodesRepetitionMap;
    private _removeFromNodesConditionalBranchMap;
    private _removeFromNodesFormulaMap;
    private _removeFromNodesValidationMap;
    private _removeFromNodesWarningMap;
    private _removeFromNodesFilteredChoicesMap;
    private _removeFromNodesTriggerConditionsMap;
    private _removeFromNodesNextSlideConditionsMap;
    private _removeFromNodesMap;
    private _addToNodesEditabilityMap;
    private _addToNodesVisibilityMap;
    private _addToNodesRepetitionMap;
    private _addToNodesConditionalBranchMap;
    private _addToNodesFormulaMap;
    private _addToNodesValidationMap;
    private _addToNodesWarningMap;
    private _addToNodesFilteredChoicesMap;
    private _addToNodesTriggerConditionsMap;
    private _addToNodesNextSlideConditionsMap;
    private _addToNodesMap;
}
