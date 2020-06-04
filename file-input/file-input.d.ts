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
import { ChangeDetectorRef, ElementRef, OnDestroy, QueryList, ViewContainerRef } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AjfFile } from './file';
export declare class AjfDropMessage {
}
export declare class AjfFilePreview implements OnDestroy {
    private _value;
    get value(): AjfFile;
    private _valueSub;
    constructor(vcr: ViewContainerRef);
    ngOnDestroy(): void;
}
export declare class AjfFileInput implements ControlValueAccessor {
    private _cdr;
    _dropMessageChildren: QueryList<AjfDropMessage>;
    _filePreviewChildren: QueryList<AjfFilePreview>;
    _nativeInput: ElementRef<HTMLInputElement>;
    readonly fileIcon: SafeResourceUrl;
    readonly removeIcon: SafeResourceUrl;
    accept: string;
    private _value;
    get value(): any;
    set value(value: any);
    private _valueChange;
    readonly valueChange: Observable<AjfFile | undefined>;
    /** The method to be called in order to update ngModel. */
    _controlValueAccessorChangeFn: (value: any) => void;
    /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
    _onTouched: () => any;
    constructor(domSanitizer: DomSanitizer, _cdr: ChangeDetectorRef);
    onFileDrop(files: FileList): void;
    onSelectFile(): void;
    registerOnChange(fn: any): void;
    registerOnTouched(fn: any): void;
    resetValue(): void;
    triggerNativeInput(): void;
    writeValue(value: any): void;
    private _processFileUpload;
}
export declare const fileIcon: string;
