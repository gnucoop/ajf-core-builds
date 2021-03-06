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
import { ChangeDetectorRef, EventEmitter, OnDestroy, Renderer2 } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { BrowserMultiFormatReader } from '@zxing/browser';
import { Subscription } from 'rxjs';
export declare abstract class AjfBarcode implements ControlValueAccessor, OnDestroy {
    private _cdr;
    private _renderer;
    readonly codeReader: BrowserMultiFormatReader;
    readonly startDetection: EventEmitter<void>;
    readonly startCalculation: EventEmitter<string>;
    readonly _startDetectionSub: Subscription;
    readonly _startCalculationSub: Subscription;
    private _canvas;
    get canvasCtx(): CanvasRenderingContext2D;
    /**
     * A html video element created at runtime
     *
     * @memberof AjfBarcode
     */
    private _video;
    get videoSource(): HTMLVideoElement;
    /**
     * implement the control form value.
     * rappresent the barcode value.
     *
     * @memberof AjfBarcode
     */
    private _barcodeValue;
    get value(): string;
    set value(value: string);
    private _toggle;
    get toggle(): string;
    set toggle(val: string);
    private _onChangeCallback;
    private _onTouchedCallback;
    constructor(_cdr: ChangeDetectorRef, _renderer: Renderer2);
    reset(): void;
    takeSnapshot(): void;
    onSelectFile(evt: Event): void;
    onSelectDrop(files: FileList): void;
    /** ControlValueAccessor implements */
    writeValue(value: string): void;
    registerOnChange(fn: (value: any) => void): void;
    registerOnTouched(fn: () => void): void;
    ngOnDestroy(): void;
    private _init;
    private _initCanvas;
    private _initVideo;
    private _onSelect;
    /**
     * write a frame of HTMLVideoElement into HTMLCanvasElement and
     * return the result of toDataURL('image/png')
     *
     * @param video
     * @memberof AjfBarcode
     */
    private _getDataFromVideo;
    /**
     * call @zxing library method with HTMLImageElement as parameter
     *
     * @param img
     * @memberof AjfBarcode
     */
    private _readBarcodeFromImage;
    /**
     * build an image by data and call _readBarcodeFromImage
     *
     * @param data
     * @memberof AjfBarcode
     */
    private _readBarcodeFromData;
    /**
     * build an image by data
     *
     * @param data
     * @memberof AjfBarcode
     */
    private _createImage;
}
