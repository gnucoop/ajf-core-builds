/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfCondition, AjfFormula } from '@ajf/core/models';
import { AjfChoice } from './choices';
import { AjfDateField, AjfEmptyField, AjfField, AjfFieldWithChoices, AjfNode, AjfNodeGroup, AjfRepeatingSlide, AjfSlide, IAjfSlide } from './nodes';
import { AjfValidationGroup, AjfValidationResult } from './validation';
import { AjfWarningGroup, AjfWarningResult } from './warning';
export interface AjfFieldState {
    visibility: boolean;
    value: any;
}
export interface IAjfNodeInstance {
    node: AjfNode;
    prefix?: number[];
    visible?: boolean;
}
export declare class AjfNodeInstance implements IAjfNodeInstance {
    private _updatedEvt;
    private _updated;
    readonly updated: Observable<void>;
    private _node;
    readonly node: AjfNode;
    private _prefix;
    readonly prefix: number[];
    private _visible;
    readonly visible: boolean;
    readonly suffix: string;
    /**
     * this method will get the complete name of the field
     * @return : string
     */
    readonly completeName: string;
    verifiedBranch: number;
    conditionalBranches: AjfCondition[];
    visibility: AjfCondition | null;
    constructor(params: IAjfNodeInstance, _context?: any);
    protected setNode(node: AjfNode): void;
    triggerUpdate(): void;
    /**
     * Update nodes visibility based on context value.
     * Returns true if the visibility has changes
     *
     * @param context Context value
     * @param branchVisibility
     *
     * @memberOf AjfNodeInstance
     */
    updateVisibility(context: any, branchVisibility?: boolean): boolean;
    updateConditionalBranches(context: any): boolean;
}
export declare class AjfFieldInstance extends AjfNodeInstance {
    valid: boolean;
    reps: number;
    protected _validationResults: AjfValidationResult[];
    protected _warningResults: AjfWarningResult[];
    protected _defaultValue: any;
    field: AjfField;
    private _value;
    value: any;
    private _triggerWarning;
    readonly triggerWarning: Observable<void>;
    constructor(params: IAjfNodeInstance, context?: any);
    /**
     * this method will get the validationResults value of the field
     * @return : _validationResults
     */
    readonly validationResults: AjfValidationResult[];
    /**
     * this method will get the warningResults value of the field
     * @return : _warningResults
     */
    readonly warningResults: AjfWarningResult[];
    formula: AjfFormula | null;
    validation: AjfValidationGroup | null;
    warning: AjfWarningGroup | null;
    nextSlideCondition: AjfCondition | null;
    updateFormula(context: any): {
        changed: boolean;
        value: any;
    };
    private _makeSupplementaryContext;
    updateValidation(context: any, supplementaryInformations?: any): void;
    updateWarning(context: any): void;
    updateNextSlideCondition(context: any): boolean;
    /**
     * this method will update the state of the field
     * @param   context         : any - the context of the field to update
     * @param   branchVisibility: boolean
     */
    updateFieldState(context: any, branchVisibility?: boolean): void;
    emitTriggerWarning(): void;
}
export declare class AjfFieldWithChoicesInstance extends AjfFieldInstance {
    choicesFilter: AjfFormula;
    filteredChoices: AjfChoice<any>[];
    triggerConditions: AjfCondition[];
    field: AjfFieldWithChoices;
    private _triggerSelection;
    readonly triggerSelection: Observable<null>;
    private _firstTriggerConditionDone;
    constructor(params: IAjfNodeInstance, context?: any);
    updateFilteredChoices(context: any): void;
    updateTriggerConditions(context: any): boolean;
    emitTriggerSelection(): void;
}
export declare class AjfNodeGroupInstance extends AjfNodeInstance {
    nodesNames: string[];
    nodes: AjfNodeInstance[];
    flatNodes: AjfNodeInstance[];
    formulaReps: AjfFormula | null;
    private _reps;
    reps: number;
    private _repsArr;
    readonly repsArr: Array<number>;
    readonly valid: boolean;
    readonly nodeGroup: AjfNodeGroup;
    protected setNodeGroup(nodeGroup: AjfNodeGroup): void;
    constructor(params: IAjfNodeInstance, context?: any);
    updateRepsNum(context: any): number;
}
export interface IAjfSlideInstance extends IAjfNodeInstance {
    nodes: AjfNodeInstance[];
    flatNodes: AjfNodeInstance[];
    readonly valid: boolean;
    readonly slide: IAjfSlide;
}
export declare class AjfSlideInstance extends AjfNodeInstance implements IAjfSlideInstance {
    nodes: AjfNodeInstance[];
    flatNodes: AjfNodeInstance[];
    position: number;
    readonly valid: boolean;
    readonly slide: AjfSlide;
    protected setSlide(slide: AjfSlide): void;
}
export declare class AjfRepeatingSlideInstance extends AjfSlideInstance implements IAjfSlideInstance {
    formulaReps: AjfFormula;
    position: number;
    slideNodes: AjfNodeInstance[][];
    canRemoveGroup: boolean;
    canAddGroup: boolean;
    private _reps;
    reps: number;
    private _repsArr;
    readonly repsArr: Array<number>;
    readonly slide: AjfRepeatingSlide;
    readonly nodesPerSlide: number;
    protected setSlide(slide: AjfRepeatingSlide): void;
    constructor(params: IAjfNodeInstance, context?: any);
    validSlide(idx: number): boolean;
    slidePosition(idx: number): number;
    updateRepsNum(context: any): number;
}
export declare class AjfTableFieldInstance extends AjfFieldInstance {
    constructor(params: IAjfNodeInstance, context?: any);
    private _hideEmptyRows;
    readonly hideEmptyRows: boolean;
    private _matrixValue;
    private _matrixFormControl;
    private _matrixFormControlWithLabels;
    private _context;
    controls: FormControl[][];
    readonly controlsWithLabels: (FormControl | string)[][];
    private _controlsWithLabels;
    value: any;
    readonly context: any;
    setValue(context: any): void;
    readonly visibleColumns: string[][];
}
export declare class AjfDateFieldInstance extends AjfFieldInstance {
    field: AjfDateField;
}
export declare class AjfEmptyFieldInstance extends AjfFieldInstance {
    field: AjfEmptyField;
}
