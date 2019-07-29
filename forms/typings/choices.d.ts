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
import { Observable } from 'rxjs';
import { AjfJsonSerializable } from '@ajf/core/models';
export declare enum AjfChoicesType {
    String = 0,
    Number = 1,
    LENGTH = 2
}
export interface IAjfChoicesOrigin {
    getType(): string;
    getName(): string;
    getLabel(): string;
    getChoices(): Array<any>;
    getChoicesType(): any;
    setName(name: string): void;
    setLabel(label: string): void;
}
export declare class AjfChoice<T> extends AjfJsonSerializable {
    label: string;
    value: T;
    constructor(obj?: any);
}
export declare abstract class AjfChoicesOrigin<T> extends AjfJsonSerializable implements IAjfChoicesOrigin {
    private _name;
    private _label;
    private _choicesType;
    static create(type: string, obj?: any): any;
    static fromJson(obj: any): AjfChoicesOrigin<any>;
    constructor(obj?: any);
    abstract getType(): string;
    getName(): string;
    getLabel(): string;
    setName(name: string): void;
    setLabel(label: string): void;
    abstract getChoices(): Array<AjfChoice<T>>;
    getChoicesType(): string;
    private _guessChoicesType;
}
export interface IAjfChoicesFunction<T> extends Function {
    (): AjfChoice<T>[];
}
export declare class AjfChoicesFixedOrigin<T> extends AjfChoicesOrigin<T> {
    private _choices;
    getType(): string;
    constructor(obj?: any);
    getChoices(): AjfChoice<T>[];
    setChoices(choices: AjfChoice<T>[]): void;
}
export declare class AjfChoicesFunctionOrigin<T> extends AjfChoicesOrigin<T> {
    private _generator;
    readonly generator: IAjfChoicesFunction<T>;
    getType(): string;
    constructor(generator: IAjfChoicesFunction<T>, obj?: any);
    getChoices(): AjfChoice<T>[];
}
export declare class AjfChoicesObservableOrigin<T> extends AjfChoicesOrigin<T> {
    private _observable;
    private _currentChoices;
    private _subscription;
    readonly observable: Observable<AjfChoice<T>>;
    getType(): string;
    constructor(_observable: Observable<AjfChoice<T>>, obj?: any);
    getChoices(): AjfChoice<T>[];
    destroy(): void;
}
export declare class AjfChoicesObservableArrayOrigin<T> extends AjfChoicesOrigin<T> {
    private _observable;
    private _currentChoices;
    private _subscription;
    readonly observable: Observable<AjfChoice<T>[]>;
    getType(): string;
    constructor(_observable: Observable<AjfChoice<T>[]>, obj?: any);
    getChoices(): AjfChoice<T>[];
    destroy(): void;
}
export declare class AjfChoicesPromiseOrigin<T> extends AjfChoicesOrigin<T> {
    private _choices;
    getType(): string;
    constructor(promise: Promise<AjfChoice<T>[]>, obj?: any);
    getChoices(): AjfChoice<T>[];
}
