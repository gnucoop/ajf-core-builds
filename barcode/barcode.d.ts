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
import { ChangeDetectorRef, ElementRef, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import * as i0 from "@angular/core";
export declare abstract class AjfBarcode implements ControlValueAccessor {
    protected _cdr: ChangeDetectorRef;
    private _renderer;
    barcodeVideo: ElementRef<HTMLVideoElement>;
    barcodeVideoPreview: ElementRef<HTMLDivElement>;
    barcodeImagePreview: ElementRef<HTMLImageElement>;
    /**
     * A html video element created at runtime
     *
     * @memberof AjfBarcode
     */
    private _video?;
    get videoSource(): HTMLVideoElement | undefined;
    /**
     * implement the control form value.
     * rappresent the barcode value.
     *
     * @memberof AjfBarcode
     */
    private _barcodeValue;
    get value(): string;
    set value(value: string);
    private _supportsVideoStream;
    get supportsVideoStream(): boolean;
    private _toggle;
    get toggle(): string;
    set toggle(val: string);
    private _showSwitchButton;
    get showSwitchButton(): boolean;
    private _deviceId?;
    private _streams;
    private _currentStream;
    private _scannerControls?;
    private _codeReader;
    private _onChangeCallback;
    private _onTouchedCallback;
    constructor(_cdr: ChangeDetectorRef, _renderer: Renderer2);
    reset(): void;
    onSelectFile(evt: Event): void;
    onSelectDrop(files: FileList): void;
    onTabChange(idx: number): void;
    switchCamera(): void;
    /** ControlValueAccessor implements */
    writeValue(value: string): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    private _onSelect;
    private _setImagePreview;
    private _initVideoStreams;
    private _setCurrentStream;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfBarcode, never>;
    static ɵdir: i0.ɵɵDirectiveDeclaration<AjfBarcode, never, never, {}, {}, never, never, false, never>;
}
