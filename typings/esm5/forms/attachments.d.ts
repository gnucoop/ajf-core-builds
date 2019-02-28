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
export declare enum AjfAttachmentsType {
    Link = 0,
    Pdf = 1,
    LENGTH = 2
}
export interface IAjfAttachment {
    label: string;
    value: any;
    type: string;
}
/**
 * This class will define an ajf attachment
 */
export declare class AjfAttachment<T> {
    readonly label: string;
    readonly value: T;
    readonly type: string;
    private _label;
    private _value;
    private _type;
    constructor(obj?: any);
}
/**
 * This class will define an ajf attachments orgin
 */
export declare abstract class AjfAttachmentsOrigin {
    private _name;
    /**
     * this static method will create attachment
     * @param obj : any - object attachment
     * @return AjfAttachment
     */
    static create(obj: any): any;
    /**
     * this static method will load an AjfAttachmentsOrigin from json
     * @param obj : any - object Attachments
     * @return AjfAttachmentsOrigin
     */
    static fromJson(obj: any): AjfAttachmentsOrigin;
    getName(): string;
    constructor(obj?: any);
    abstract getAttachments(): IAjfAttachment[];
}
/**
 * This class will define an ajf attachments fixed origin
 */
export declare class AjfAttachmentsFixedOrigin extends AjfAttachmentsOrigin {
    private _attachments;
    constructor(obj?: any);
    getAttachments(): IAjfAttachment[];
}
