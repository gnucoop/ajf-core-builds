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
import { AjfCondition, AjfFormula, AjfJsonSerializable } from '@ajf/core/models';
import { AjfAttachmentsOrigin } from './attachments';
import { IAjfChoicesOrigin } from './choices';
import { AjfValidationGroup } from './validation';
import { AjfWarningGroup } from './warning';
export declare enum AjfNodeType {
    AjfField = 0,
    AjfFieldNodeLink = 1,
    AjfNodeGroup = 2,
    AjfSlide = 3,
    AjfRepeatingSlide = 4,
    LENGTH = 5
}
/**
 * This class will define an ajf node
 */
export declare class AjfNode extends AjfJsonSerializable {
    private _id;
    id: number;
    private _parent;
    parent: number;
    private _parentNode;
    parentNode: number;
    private _conditionalBranches;
    /**
     * this method will get the conditionalBranches of the field
     * @return : _conditionalBranches
     */
    /**
    * this method will set the conditionalBranches of the field
    * @param conditionalBranches : AjfCondition[] - the new conditionalBranches
    */
    conditionalBranches: AjfCondition[];
    private _name;
    /**
     * this method will get the current name of field
     * @return : _name
     */
    /**
    * this method will set the current name of field
    * @param name : string - the new name
    */
    name: string;
    private _label;
    /**
     * this method will get the label of the field
     * @return : _label
     */
    /**
    * this method will set the label of the field
    * @param label : string - the new label
    */
    label: string;
    private _visibility;
    /**
     * this method will get the visibility of the field
     * @return : _visibility
     */
    /**
    * this method will set the visibility of the field
    * @param visibility : AjfCondition - the new visibility
    */
    visibility: AjfCondition | null;
    /**
     * this method will load an AjfNode from json
     * @param obj                : any - object node
     * @param choicesOrigins     : any[] - array of choicesOrigins
     * @param attachmentsOrigins : any[] - array of attachmentsOrigins
     * @return AjfNode
     */
    static fromJson(obj: any, choicesOrigins?: any[], attachmentsOrigins?: any[], context?: any): AjfNode;
    /**
     * this method will create an AjfNode
     * @param nodeType           : identified a type of node (nodeGroup or nodeField)
     * @param obj                : any - object node
     * @param choicesOrigins     : any[] - array of choicesOrigins
     * @param attachmentsOrigins : any[] - array of attachmentsOrigins
     * @return AjfNode
     */
    static createNode(nodeType: AjfNodeType, obj?: any, choicesOrigins?: any[], attachmentsOrigins?: any[], context?: any): AjfNode;
    /**
     * this method get the nodeType
     * @return AjfNodeType
     */
    readonly nodeType: AjfNodeType;
    /**
     * this constructor will assign the obj value to a class variables
     */
    constructor(obj?: any);
    /**
     * this method will set the conditiona branch number of the field
     * @param cbn : number
     */
    setConditionalBranchesNum(cbn: number): void;
    /**
     * this method will get the max xonditional branches of the field
     * @return number
     */
    getMaxConditionalBranches(): number;
}
export declare class AjfFieldNodeLink extends AjfNode {
}
/**
 * this enumerate any field type
 */
export declare enum AjfFieldType {
    String = 0,
    Text = 1,
    Number = 2,
    Boolean = 3,
    SingleChoice = 4,
    MultipleChoice = 5,
    Formula = 6,
    Empty = 7,
    Date = 8,
    DateInput = 9,
    Time = 10,
    Table = 11,
    LENGTH = 12
}
/**
 * This class will define an ajf node group
 */
export declare class AjfNodeGroup extends AjfNode {
    private _nodes;
    nodes: AjfNode[];
    private _formulaReps;
    formulaReps: AjfFormula;
    private _maxReps;
    maxReps: number;
    private _minReps;
    minReps: number;
    /**
     * this method will load an AjfNodeGroup from json
     * @param obj                : any - object node
     * @param choicesOrigins     : any[] - array of choicesOrigins
     * @param attachmentsOrigins : any[] - array of attachmentsOrigins
     * @return AjfNodeGroup
     */
    static fromJson(obj: any, choicesOrigins: any[], attachmentsOrigins: any[], context: any): AjfNodeGroup;
    /**
     * this constructor will assign the obj value to a class variables
     */
    constructor(obj?: any);
}
export interface IAjfSlide {
    nodes: AjfNode[];
}
/**
 * Represents a form slide.
 * Slides are specialized node groups used to layout the form.
 * They must be at the root level of the form
 *
 * @export
 */
export declare class AjfSlide extends AjfNode implements IAjfSlide {
    private _nodes;
    nodes: AjfNode[];
    static fromJson(obj: any, choicesOrigins: any[], attachmentsOrigins: any[], context: any): AjfSlide;
    constructor(obj?: any);
}
export declare class AjfRepeatingSlide extends AjfSlide {
    private _formulaReps;
    formulaReps: AjfFormula | null;
    private _maxReps;
    maxReps: number;
    private _minReps;
    minReps: number;
    static fromJson(obj: any, choicesOrigins: any[], attachmentsOrigins: any[], context: any): AjfRepeatingSlide;
    constructor(obj?: any);
}
/**
 * This class will define an ajf Field
 */
export declare abstract class AjfField extends AjfNode {
    private _description;
    /**
     * this method will get the description of the field
     * @return : _description
     */
    /**
    * this method will set the description of the field
    * @param description : string - the new description
    */
    description: string;
    private _editable;
    /**
     * this method will get the editable status  of the field
     * @return : _editable
     */
    readonly editable: boolean;
    private _formula;
    /**
     * this method will get the formula of the field
     * @return : _formula
     */
    formula: AjfFormula | null;
    private _hasChoices;
    /**
     * this method will get the hasChoices status of the field
     * @return : _hasChoices
     */
    readonly hasChoices: boolean;
    private _defaultValue;
    /**
     * this method will get the default value of the field
     * @return : _defaultValue
     */
    /**
    * this method will set the defaultValue of the field
    * @param defaultValue : any - the new defaultValue
    */
    defaultValue: any;
    private _size;
    size: 'normal' | 'small' | 'smaller' | 'tiny' | 'mini';
    private _validation;
    /**
     * this method will get the validation value of the field
     * @return : _validation
     */
    validation: AjfValidationGroup | null;
    private _warning;
    /**
     * this method will get the warning value of the field
     * @return : _warning
     */
    warning: AjfWarningGroup | null;
    private _hasAttachments;
    /**
     * this method will get the hasAttachments status of the field
     * @return : _hasAttachments
     */
    readonly hasAttachments: boolean;
    private _attachmentsOrigin;
    /**
     * this method will get the attachmentsOrigin of the field
     * @return : AjfAttachmentsOrigin
     */
    readonly attachmentsOrigin: AjfAttachmentsOrigin | null;
    /**
     * this method will get the attachments of the field
     * @return : any the attachments
     */
    readonly attachments: any[];
    private _nextSlideCondition;
    nextSlideCondition: AjfCondition | null;
    private _nextSlide;
    nextSlide: boolean;
    /**
     * this method will get the field type
     * @return : AjfFieldType
     */
    readonly fieldType: AjfFieldType;
    /**
     * this method will get the node type of the field
     * @return : AjfFieldType
     */
    readonly nodeType: AjfNodeType;
    /**
     * this method will create new field
     * @return : ajfField
     */
    static create(fieldType: AjfFieldType, obj?: any): AjfField;
    /**
     * this method will load an AjfField from json
     * @param obj                : any - object node
     * @param choicesOrigins     : any[] - array of choicesOrigins
     * @param attachmentsOrigins : any[] - array of attachmentsOrigins
     * @return AjfNode
     */
    static fromJson(obj: any, choicesOrigins: any[], attachmentsOrigins: any[], context: any): AjfField;
    /**
     * this constructor will assign the obj value to a class variables
     */
    constructor(obj?: any);
    /**
     * this method will set the editable value of the field
     * @param editable : boolean
     */
    protected setEditable(editable?: boolean): void;
    /**
     * this method will set the HasChoices value of the field
     * @param hasChoices : boolean
     */
    protected setHasChoices(hasChoices: boolean): void;
    /**
     * this method will set the hasAttachments value of the field
     * @param hasAttachments : boolean
     */
    protected setHasAttachments(hasAttachments: boolean): void;
    abstract validateValue(defaultValue: any): boolean;
}
/**
 * This class will define an ajf empty field
 */
export declare class AjfEmptyField extends AjfField {
    HTML: string;
    validateValue(_: any): boolean;
    constructor(obj?: any);
}
/**
 * This class will define an ajf string field
 */
export declare class AjfStringField extends AjfField {
    validateValue(value: any): boolean;
}
/**
 * This class will define an ajf text field
 */
export declare class AjfTextField extends AjfStringField {
}
/**
 * This class will define an ajf number field
 */
export declare class AjfNumberField extends AjfField {
    validateValue(value: any): boolean;
}
/**
 * This class will define an ajf boolean field
 */
export declare class AjfBooleanField extends AjfField {
    validateValue(value: any): boolean;
    getMaxConditionalBranches(): number;
}
/**
 * This class will define an ajf field with choices
 */
export declare class AjfFieldWithChoices extends AjfField {
    choicesOrigin: IAjfChoicesOrigin;
    choicesFilter: AjfFormula;
    forceExpanded: boolean;
    forceNarrow: boolean;
    triggerConditions: AjfCondition[];
    readonly choices: any[];
    readonly choicesOriginRef: string;
    validateValue(_: any): boolean;
    constructor(obj?: any);
}
/**
 * This class will define an ajf field with SingleChoice
 */
export declare class AjfSingleChoiceField extends AjfFieldWithChoices {
    constructor(obj?: any);
    validateValue(value: any): boolean;
    getMaxConditionalBranches(): number;
}
/**
 * This class will define an ajf field with MultipleChoice
 */
export declare class AjfMultipleChoiceField extends AjfSingleChoiceField {
    constructor(obj?: any);
    validateValue(value: any): boolean;
    getMaxConditionalBranches(): number;
}
/**
 * This class will define an formula field
 */
export declare class AjfFormulaField extends AjfNumberField {
    constructor(obj?: any);
}
/**
 * This class will define an ajf date field
 */
export declare class AjfDateField extends AjfField {
    minDate: Date | 'today';
    maxDate: Date | 'today';
    minDateValue: Date;
    maxDateValue: Date;
    constructor(obj?: any);
    validateValue(value: any): boolean;
}
export declare class AjfDateInputField extends AjfField {
    constructor(obj?: any);
    validateValue(value: any): boolean;
}
export declare class AjfTimeField extends AjfField {
    constructor(obj?: any);
    validateValue(value: any): boolean;
}
export declare class AjfTableField extends AjfField {
    rows: string[][];
    columnLabels: string[];
    rowLabels: string[];
    hideEmptyRows: boolean;
    constructor(obj?: any);
    validateValue(value: any): boolean;
}
