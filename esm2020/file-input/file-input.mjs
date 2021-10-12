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
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Output, QueryList, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@ajf/core/common";
import * as i3 from "@angular/common";
import * as i4 from "@ngneat/transloco";
export class AjfDropMessage {
}
AjfDropMessage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfDropMessage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AjfDropMessage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfDropMessage, selector: "[ajfDropMessage]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfDropMessage, decorators: [{
            type: Directive,
            args: [{ selector: '[ajfDropMessage]' }]
        }] });
export class AjfFilePreview {
    constructor(vcr) {
        this._valueSub = Subscription.EMPTY;
        const input = vcr.parentInjector.get(AjfFileInput, null);
        if (input) {
            this._value = input.value;
            this._valueSub = input.valueChange
                .pipe(filter(value => value != null))
                .subscribe(value => {
                this._value = value;
            });
        }
    }
    get value() {
        return this._value;
    }
    ngOnDestroy() {
        this._valueSub.unsubscribe();
    }
}
AjfFilePreview.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFilePreview, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AjfFilePreview.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfFilePreview, selector: "[ajfFilePreview]", exportAs: ["ajfFilePreview"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFilePreview, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ajfFilePreview]',
                    exportAs: 'ajfFilePreview',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
export class AjfFileInput {
    constructor(domSanitizer, _cdr) {
        this._cdr = _cdr;
        this._valueChange = new EventEmitter();
        this.valueChange = this._valueChange;
        /** The method to be called in order to update ngModel. */
        this._controlValueAccessorChangeFn = () => { };
        /** onTouch function registered via registerOnTouch (ControlValueAccessor). */
        this._onTouched = () => { };
        this.fileIcon = domSanitizer.bypassSecurityTrustResourceUrl(fileIcon);
        this.removeIcon = domSanitizer.bypassSecurityTrustResourceUrl(trashIcon);
    }
    get value() {
        return this._value;
    }
    set value(value) {
        if (value instanceof File) {
            this._processFileUpload(value);
        }
        else if (value instanceof FileList) {
            if (value.length === 1) {
                this._processFileUpload(value[0]);
            }
        }
        else if (value == null ||
            (isAjfFile(value) && isValidMimeType(value.type, this.accept))) {
            this._value = value;
            this._valueChange.emit(this._value);
            this._cdr.detectChanges();
        }
    }
    onFileDrop(files) {
        if (files.length !== 1) {
            return;
        }
        const file = files[0];
        this._processFileUpload(file);
    }
    onSelectFile() {
        const files = this._nativeInput.nativeElement.files;
        if (files == null) {
            return;
        }
        const file = files.item(0);
        if (file == null) {
            return;
        }
        this._processFileUpload(files.item(0));
    }
    registerOnChange(fn) {
        this._controlValueAccessorChangeFn = fn;
    }
    registerOnTouched(fn) {
        this._onTouched = fn;
    }
    resetValue() {
        this.value = null;
        this._nativeInput.nativeElement.value = '';
    }
    triggerNativeInput() {
        if (!this._nativeInput) {
            return;
        }
        this._nativeInput.nativeElement.click();
    }
    writeValue(value) {
        this.value = value;
        this._cdr.markForCheck();
    }
    _processFileUpload(file) {
        const reader = new FileReader();
        const { name, size, type } = file;
        if (!isValidMimeType(type, this.accept)) {
            return;
        }
        reader.onload = (e) => {
            const content = reader.result;
            if (typeof content !== 'string') {
                return;
            }
            this.value = { name, size, type, content };
            if (this._controlValueAccessorChangeFn != null) {
                this._controlValueAccessorChangeFn(this.value);
            }
        };
        reader.readAsDataURL(file);
    }
}
AjfFileInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFileInput, deps: [{ token: i1.DomSanitizer }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfFileInput.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfFileInput, selector: "ajf-file-input", inputs: { accept: "accept", value: "value" }, outputs: { valueChange: "valueChange" }, host: { properties: { "class.ajf-file-input": "true" } }, providers: [{
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AjfFileInput),
            multi: true,
        }], queries: [{ propertyName: "_dropMessageChildren", predicate: AjfDropMessage }, { propertyName: "_filePreviewChildren", predicate: AjfFilePreview }], viewQueries: [{ propertyName: "_nativeInput", first: true, predicate: ["nativeInput"], descendants: true }], ngImport: i0, template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"value == null; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>{{'Drop your file here or click to select'|transloco}}</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|transloco }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n", styles: [".ajf-file-input{display:flex;min-height:100px;align-items:stretch;position:relative;overflow:hidden}.ajf-file-input .ajf-drop-zone,.ajf-file-input .ajf-file-info,.ajf-file-input .ajf-drop-message{flex:1 1 auto;display:flex;align-items:center;justify-content:center}.ajf-file-input .ajf-drop-zone{background-color:#eee}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{background-color:#999}.ajf-file-input .ajf-drop-message{cursor:pointer;align-self:stretch}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center}.ajf-file-input .ajf-file-info-content img{width:32px;height:32px;margin-right:8px}.ajf-file-input input{position:absolute;top:-9999;left:-9999;opacity:0;z-index:-1}.ajf-file-input .ajf-screen-reader-only{display:none}.ajf-file-input .ajf-remove-file{position:absolute;top:16px;right:16px;padding:8px;cursor:pointer}.ajf-file-input .ajf-remove-file img{width:16px;height:16px;margin-right:0}\n"], directives: [{ type: i2.AjfDndDirective, selector: "[ajfDnd]", outputs: ["file"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "transloco": i4.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFileInput, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-file-input', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[class.ajf-file-input]': 'true',
                    }, providers: [{
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AjfFileInput),
                            multi: true,
                        }], template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"value == null; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>{{'Drop your file here or click to select'|transloco}}</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|transloco }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n", styles: [".ajf-file-input{display:flex;min-height:100px;align-items:stretch;position:relative;overflow:hidden}.ajf-file-input .ajf-drop-zone,.ajf-file-input .ajf-file-info,.ajf-file-input .ajf-drop-message{flex:1 1 auto;display:flex;align-items:center;justify-content:center}.ajf-file-input .ajf-drop-zone{background-color:#eee}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{background-color:#999}.ajf-file-input .ajf-drop-message{cursor:pointer;align-self:stretch}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center}.ajf-file-input .ajf-file-info-content img{width:32px;height:32px;margin-right:8px}.ajf-file-input input{position:absolute;top:-9999;left:-9999;opacity:0;z-index:-1}.ajf-file-input .ajf-screen-reader-only{display:none}.ajf-file-input .ajf-remove-file{position:absolute;top:16px;right:16px;padding:8px;cursor:pointer}.ajf-file-input .ajf-remove-file img{width:16px;height:16px;margin-right:0}\n"] }]
        }], ctorParameters: function () { return [{ type: i1.DomSanitizer }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { _dropMessageChildren: [{
                type: ContentChildren,
                args: [AjfDropMessage, { descendants: false }]
            }], _filePreviewChildren: [{
                type: ContentChildren,
                args: [AjfFilePreview, { descendants: false }]
            }], _nativeInput: [{
                type: ViewChild,
                args: ['nativeInput']
            }], accept: [{
                type: Input
            }], value: [{
                type: Input
            }], valueChange: [{
                type: Output
            }] } });
const ajfFileKeys = JSON.stringify(['content', 'name', 'size', 'type']);
/**
 * Test if a value is an AjfFile interface.
 */
function isAjfFile(value) {
    if (typeof value !== 'object') {
        return false;
    }
    const keys = Object.keys(value).sort((a, b) => a.localeCompare(b));
    return JSON.stringify(keys) === ajfFileKeys;
}
function isValidMimeType(mimeType, accept) {
    if (accept == null) {
        return true;
    }
    let terminate = true;
    if (accept.endsWith('*')) {
        accept = accept.slice(0, accept.length - 1);
        terminate = false;
    }
    const regExStr = '^' + accept + (terminate ? '$' : '');
    const regEx = new RegExp(regExStr);
    return regEx.test(mimeType);
}
export const fileIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwM' +
    'C9zdmciIHdpZHRoPSIxNzA2LjY2NyIgaGVpZ2h0PSIxNzA2LjY2NyIgdmlld0JveD0iMCAwIDEyODAgMTI4MCIgcHJl' +
    'c2VydmVBc3BlY3RSYXRpbz0ieE1pZFlNaWQgbWVldCI+PHBhdGggZD0iTTI4MyAxMDNjLTE3LjcgMi40LTMzLjkgMTM' +
    'uOC00Mi4yIDI5LjYtNy40IDE0LTYuOC0zMi41LTYuOCA0OTcuNHMtLjYgNDgzLjQgNi44IDQ5Ny40YzYuOCAxMy4xID' +
    'E4LjYgMjIuNyAzMy43IDI3LjhsNyAyLjNoNzE3bDctMi4zYzE1LjEtNS4xIDI2LjktMTQuNyAzMy43LTI3LjggNy40L' +
    'TE0IDYuOCAxOS4yIDYuOC0zNzYuNlYzOTQuMWwtMTExLjItLjMtMTExLjMtLjQtOC41LTIuM2MtMjMuOC02LjUtNDMt' +
    'MjEuMy01Mi40LTQwLjUtNy41LTE1LjMtNy02LTcuMy0xMzMuOWwtLjQtMTE0LjctMjMzLjIuMS0yMzguNy45em01MTI' +
    'gMTA5LjhjMCAxMjAuNS0uMyAxMTQuOSA2IDEyNC40IDMuNiA1LjUgMTEuNiAxMS4yIDE5LjcgMTQuMSA1LjggMi4yID' +
    'YuNCAyLjIgMTE1LjggMi41bDExMCAuMy0xMjUtMTI1LjQtMTI1LjctMTI1LjVjLS41LS4xLS44IDQ5LjItLjggMTA5L' +
    'jZ6Ii8+PC9zdmc+';
const trashIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmc' +
    'iIHZpZXdCb3g9IjAgLTI1NiAxNzkyIDE3OTIiIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxwYXRoIGQ9Ik03MD' +
    'kuNDI0IDQ1NS4wNXY1NzZxMCAxNC05IDIzLTkgOS0yMyA5aC02NHEtMTQgMC0yMy05LTktOS05LTIzdi01NzZxMC0xN' +
    'CA5LTIzIDktOSAyMy05aDY0cTE0IDAgMjMgOSA5IDkgOSAyM3ptMjU2IDB2NTc2cTAgMTQtOSAyMy05IDktMjMgOWgt' +
    'NjRxLTE0IDAtMjMtOS05LTktOS0yM3YtNTc2cTAtMTQgOS0yMyA5LTkgMjMtOWg2NHExNCAwIDIzIDkgOSA5IDkgMjN' +
    '6bTI1NiAwdjU3NnEwIDE0LTkgMjMtOSA5LTIzIDloLTY0cS0xNCAwLTIzLTktOS05LTktMjN2LTU3NnEwLTE0IDktMj' +
    'MgOS05IDIzLTloNjRxMTQgMCAyMyA5IDkgOSA5IDIzem0xMjggNzI0di05NDhoLTg5NnY5NDhxMCAyMiA3IDQwLjUgN' +
    'yAxOC41IDE0LjUgMjcgNy41IDguNSAxMC41IDguNWg4MzJxMyAwIDEwLjUtOC41IDcuNS04LjUgMTQuNS0yNyA3LTE4' +
    'LjUgNy00MC41em0tNjcyLTEwNzZoNDQ4bC00OC0xMTdxLTctOS0xNy0xMWgtMzE3cS0xMCAyLTE3IDExem05MjggMzJ' +
    '2NjRxMCAxNC05IDIzLTkgOS0yMyA5aC05NnY5NDhxMCA4My00NyAxNDMuNS00NyA2MC41LTExMyA2MC41aC04MzJxLT' +
    'Y2IDAtMTEzLTU4LjUtNDctNTguNS00Ny0xNDEuNXYtOTUyaC05NnEtMTQgMC0yMy05LTktOS05LTIzdi02NHEwLTE0I' +
    'DktMjMgOS05IDIzLTloMzA5bDcwLTE2N3ExNS0zNyA1NC02MyAzOS0yNiA3OS0yNmgzMjBxNDAgMCA3OSAyNiAzOSAy' +
    'NiA1NCA2M2w3MCAxNjdoMzA5cTE0IDAgMjMgOSA5IDkgOSAyM3oiLz48L3N2Zz4=';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2ZpbGUtaW5wdXQvZmlsZS1pbnB1dC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2ZpbGUtaW5wdXQvZmlsZS1pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsWUFBWSxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBS3RDLE1BQU0sT0FBTyxjQUFjOzttSEFBZCxjQUFjO3VHQUFkLGNBQWM7bUdBQWQsY0FBYztrQkFEMUIsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBQzs7QUFRekMsTUFBTSxPQUFPLGNBQWM7SUFRekIsWUFBWSxHQUFxQjtRQUZ6QixjQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUdyQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUss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QVEsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQUcseUVBQXlFO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsaUJBQWlCLENBQUM7QUFFdEIsTUFBTSxTQUFTLEdBQUcsK0VBQStFO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0Ysa0VBQWtFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpbGV9IGZyb20gJy4vZmlsZSc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2FqZkRyb3BNZXNzYWdlXSd9KVxuZXhwb3J0IGNsYXNzIEFqZkRyb3BNZXNzYWdlIHtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FqZkZpbGVQcmV2aWV3XScsXG4gIGV4cG9ydEFzOiAnYWpmRmlsZVByZXZpZXcnLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGaWxlUHJldmlldyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3ZhbHVlOiBBamZGaWxlO1xuICBnZXQgdmFsdWUoKTogQWpmRmlsZSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IodmNyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgY29uc3QgaW5wdXQgPSB2Y3IucGFyZW50SW5qZWN0b3IuZ2V0KEFqZkZpbGVJbnB1dCwgbnVsbCk7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWVTdWIgPSBpbnB1dC52YWx1ZUNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICE9IG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlIGFzIEFqZkZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1maWxlLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtaW5wdXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbGUtaW5wdXQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hamYtZmlsZS1pbnB1dF0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZGaWxlSW5wdXQpLFxuICAgIG11bHRpOiB0cnVlLFxuICB9XSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmlsZUlucHV0IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAQ29udGVudENoaWxkcmVuKEFqZkRyb3BNZXNzYWdlLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSlcbiAgX2Ryb3BNZXNzYWdlQ2hpbGRyZW46IFF1ZXJ5TGlzdDxBamZEcm9wTWVzc2FnZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oQWpmRmlsZVByZXZpZXcsIHtkZXNjZW5kYW50czogZmFsc2V9KVxuICBfZmlsZVByZXZpZXdDaGlsZHJlbjogUXVlcnlMaXN0PEFqZkZpbGVQcmV2aWV3PjtcbiAgQFZpZXdDaGlsZCgnbmF0aXZlSW5wdXQnKSBfbmF0aXZlSW5wdXQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG5cbiAgcmVhZG9ubHkgZmlsZUljb246IFNhZmVSZXNvdXJjZVVybDtcbiAgcmVhZG9ubHkgcmVtb3ZlSWNvbjogU2FmZVJlc291cmNlVXJsO1xuXG4gIEBJbnB1dCgpIGFjY2VwdDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZUxpc3QpIHtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc0ZpbGVVcGxvYWQodmFsdWVbMF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHZhbHVlID09IG51bGwgfHxcbiAgICAgICAgKGlzQWpmRmlsZSh2YWx1ZSkgJiYgaXNWYWxpZE1pbWVUeXBlKCh2YWx1ZSBhcyBBamZGaWxlKS50eXBlLCB0aGlzLmFjY2VwdCkpKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZSk7XG4gICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGaWxlfHVuZGVmaW5lZD4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZkZpbGV8dW5kZWZpbmVkPiA9XG4gICAgICB0aGlzLl92YWx1ZUNoYW5nZSBhcyBPYnNlcnZhYmxlPEFqZkZpbGV8dW5kZWZpbmVkPjtcblxuICAvKiogVGhlIG1ldGhvZCB0byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gdXBkYXRlIG5nTW9kZWwuICovXG4gIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBvblRvdWNoIGZ1bmN0aW9uIHJlZ2lzdGVyZWQgdmlhIHJlZ2lzdGVyT25Ub3VjaCAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBfb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplciwgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuZmlsZUljb24gPSBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKGZpbGVJY29uKTtcbiAgICB0aGlzLnJlbW92ZUljb24gPSBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHRyYXNoSWNvbik7XG4gIH1cblxuICBvbkZpbGVEcm9wKGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlsZSA9IGZpbGVzWzBdO1xuICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGUpO1xuICB9XG5cbiAgb25TZWxlY3RGaWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5fbmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC5maWxlcztcbiAgICBpZiAoZmlsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmaWxlID0gZmlsZXMuaXRlbSgwKTtcbiAgICBpZiAoZmlsZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGVzLml0ZW0oMCkgYXMgRmlsZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICByZXNldFZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHRyaWdnZXJOYXRpdmVJbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX25hdGl2ZUlucHV0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX25hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9wcm9jZXNzRmlsZVVwbG9hZChmaWxlOiBGaWxlKTogdm9pZCB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBjb25zdCB7bmFtZSwgc2l6ZSwgdHlwZX0gPSBmaWxlO1xuICAgIGlmICghaXNWYWxpZE1pbWVUeXBlKHR5cGUsIHRoaXMuYWNjZXB0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZWFkZXIub25sb2FkID0gKGU6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSByZWFkZXIucmVzdWx0O1xuICAgICAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnZhbHVlID0ge25hbWUsIHNpemUsIHR5cGUsIGNvbnRlbnR9O1xuICAgICAgaWYgKHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKHRoaXMudmFsdWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gIH1cbn1cblxuY29uc3QgYWpmRmlsZUtleXMgPSBKU09OLnN0cmluZ2lmeShbJ2NvbnRlbnQnLCAnbmFtZScsICdzaXplJywgJ3R5cGUnXSk7XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIEFqZkZpbGUgaW50ZXJmYWNlLlxuICovXG5mdW5jdGlvbiBpc0FqZkZpbGUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpLnNvcnQoKGEsIGIpID0+IGEubG9jYWxlQ29tcGFyZShiKSk7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShrZXlzKSA9PT0gYWpmRmlsZUtleXM7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRNaW1lVHlwZShtaW1lVHlwZTogc3RyaW5nLCBhY2NlcHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoYWNjZXB0ID09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBsZXQgdGVybWluYXRlID0gdHJ1ZTtcbiAgaWYgKGFjY2VwdC5lbmRzV2l0aCgnKicpKSB7XG4gICAgYWNjZXB0ID0gYWNjZXB0LnNsaWNlKDAsIGFjY2VwdC5sZW5ndGggLSAxKTtcbiAgICB0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgfVxuICBjb25zdCByZWdFeFN0ciA9ICdeJyArIGFjY2VwdCArICh0ZXJtaW5hdGUgPyAnJCcgOiAnJyk7XG4gIGNvbnN0IHJlZ0V4ID0gbmV3IFJlZ0V4cChyZWdFeFN0cik7XG4gIHJldHVybiByZWdFeC50ZXN0KG1pbWVUeXBlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGZpbGVJY29uID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNJyArXG4gICAgJ0M5emRtY2lJSGRwWkhSb1BTSXhOekEyTGpZMk55SWdhR1ZwWjJoMFBTSXhOekEyTGpZMk55SWdkbWxsZDBKdmVEMGlNQ0F3SURFeU9EQWdNVEk0TUNJZ2NISmwnICtcbiAgICAnYzJWeWRtVkJjM0JsWTNSU1lYUnBiejBpZUUxcFpGbE5hV1FnYldWbGRDSStQSEJoZEdnZ1pEMGlUVEk0TXlBeE1ETmpMVEUzTGpjZ01pNDBMVE16TGprZ01UTScgK1xuICAgICd1T0MwME1pNHlJREk1TGpZdE55NDBJREUwTFRZdU9DMHpNaTQxTFRZdU9DQTBPVGN1TkhNdExqWWdORGd6TGpRZ05pNDRJRFE1Tnk0MFl6WXVPQ0F4TXk0eElEJyArXG4gICAgJ0U0TGpZZ01qSXVOeUF6TXk0M0lESTNMamhzTnlBeUxqTm9OekUzYkRjdE1pNHpZekUxTGpFdE5TNHhJREkyTGprdE1UUXVOeUF6TXk0M0xUSTNMamdnTnk0MEwnICtcbiAgICAnVEUwSURZdU9DQXhPUzR5SURZdU9DMHpOell1TmxZek9UUXVNV3d0TVRFeExqSXRMak10TVRFeExqTXRMalF0T0M0MUxUSXVNMk10TWpNdU9DMDJMalV0TkRNdCcgK1xuICAgICdNakV1TXkwMU1pNDBMVFF3TGpVdE55NDFMVEUxTGpNdE55MDJMVGN1TXkweE16TXVPV3d0TGpRdE1URTBMamN0TWpNekxqSXVNUzB5TXpndU55NDVlbTAxTVRJJyArXG4gICAgJ2dNVEE1TGpoak1DQXhNakF1TlMwdU15QXhNVFF1T1NBMklERXlOQzQwSURNdU5pQTFMalVnTVRFdU5pQXhNUzR5SURFNUxqY2dNVFF1TVNBMUxqZ2dNaTR5SUQnICtcbiAgICAnWXVOQ0F5TGpJZ01URTFMamdnTWk0MWJERXhNQ0F1TXkweE1qVXRNVEkxTGpRdE1USTFMamN0TVRJMUxqVmpMUzQxTFM0eExTNDRJRFE1TGpJdExqZ2dNVEE1TCcgK1xuICAgICdqWjZJaTgrUEM5emRtYysnO1xuXG5jb25zdCB0cmFzaEljb24gPSAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWMnICtcbiAgICAnaUlIWnBaWGRDYjNnOUlqQWdMVEkxTmlBeE56a3lJREUzT1RJaUlIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaVBqeHdZWFJvSUdROUlrMDNNRCcgK1xuICAgICdrdU5ESTBJRFExTlM0d05YWTFOelp4TUNBeE5DMDVJREl6TFRrZ09TMHlNeUE1YUMwMk5IRXRNVFFnTUMweU15MDVMVGt0T1MwNUxUSXpkaTAxTnpaeE1DMHhOJyArXG4gICAgJ0NBNUxUSXpJRGt0T1NBeU15MDVhRFkwY1RFMElEQWdNak1nT1NBNUlEa2dPU0F5TTNwdE1qVTJJREIyTlRjMmNUQWdNVFF0T1NBeU15MDVJRGt0TWpNZ09XZ3QnICtcbiAgICAnTmpSeExURTBJREF0TWpNdE9TMDVMVGt0T1MweU0zWXROVGMyY1RBdE1UUWdPUzB5TXlBNUxUa2dNak10T1dnMk5IRXhOQ0F3SURJeklEa2dPU0E1SURrZ01qTicgK1xuICAgICc2YlRJMU5pQXdkalUzTm5Fd0lERTBMVGtnTWpNdE9TQTVMVEl6SURsb0xUWTBjUzB4TkNBd0xUSXpMVGt0T1MwNUxUa3RNak4yTFRVM05uRXdMVEUwSURrdE1qJyArXG4gICAgJ01nT1MwNUlESXpMVGxvTmpSeE1UUWdNQ0F5TXlBNUlEa2dPU0E1SURJemVtMHhNamdnTnpJMGRpMDVORGhvTFRnNU5uWTVORGh4TUNBeU1pQTNJRFF3TGpVZ04nICtcbiAgICAneUF4T0M0MUlERTBMalVnTWpjZ055NDFJRGd1TlNBeE1DNDFJRGd1TldnNE16SnhNeUF3SURFd0xqVXRPQzQxSURjdU5TMDRMalVnTVRRdU5TMHlOeUEzTFRFNCcgK1xuICAgICdMalVnTnkwME1DNDFlbTB0TmpjeUxURXdOelpvTkRRNGJDMDBPQzB4TVRkeExUY3RPUzB4TnkweE1XZ3RNekUzY1MweE1DQXlMVEUzSURFeGVtMDVNamdnTXpKJyArXG4gICAgJzJOalJ4TUNBeE5DMDVJREl6TFRrZ09TMHlNeUE1YUMwNU5uWTVORGh4TUNBNE15MDBOeUF4TkRNdU5TMDBOeUEyTUM0MUxURXhNeUEyTUM0MWFDMDRNekp4TFQnICtcbiAgICAnWTJJREF0TVRFekxUVTRMalV0TkRjdE5UZ3VOUzAwTnkweE5ERXVOWFl0T1RVeWFDMDVObkV0TVRRZ01DMHlNeTA1TFRrdE9TMDVMVEl6ZGkwMk5IRXdMVEUwSScgK1xuICAgICdEa3RNak1nT1MwNUlESXpMVGxvTXpBNWJEY3dMVEUyTjNFeE5TMHpOeUExTkMwMk15QXpPUzB5TmlBM09TMHlObWd6TWpCeE5EQWdNQ0EzT1NBeU5pQXpPU0F5JyArXG4gICAgJ05pQTFOQ0EyTTJ3M01DQXhOamRvTXpBNWNURTBJREFnTWpNZ09TQTVJRGtnT1NBeU0zb2lMejQ4TDNOMlp6ND0nO1xuIiwiPGRpdiBhamZEbmQgKGZpbGUpPVwib25GaWxlRHJvcCgkZXZlbnQpXCIgY2xhc3M9XCJhamYtZHJvcC16b25lXCI+XG4gIDxkaXYgKm5nSWY9XCJ2YWx1ZSA9PSBudWxsOyBlbHNlIGZpbGVJbmZvXCIgY2xhc3M9XCJhamYtZHJvcC1tZXNzYWdlXCIgKGNsaWNrKT1cInRyaWdnZXJOYXRpdmVJbnB1dCgpXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIl9kcm9wTWVzc2FnZUNoaWxkcmVuPy5sZW5ndGg7IGVsc2UgZGVmYXVsdERyb3BNZXNzYWdlXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbYWpmRHJvcE1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdERyb3BNZXNzYWdlPnt7J0Ryb3AgeW91ciBmaWxlIGhlcmUgb3IgY2xpY2sgdG8gc2VsZWN0J3x0cmFuc2xvY299fTwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuICA8bmctdGVtcGxhdGUgI2ZpbGVJbmZvPlxuICAgIDxidXR0b24gKGNsaWNrKT1cInJlc2V0VmFsdWUoKVwiIGNsYXNzPVwiYWpmLXJlbW92ZS1maWxlXCI+XG4gICAgICA8aW1nIFtzcmNdPVwicmVtb3ZlSWNvblwiIGFsdD1cIlwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1zY3JlZW4tcmVhZGVyLW9ubHlcIj57eyAnRGVsZXRlJ3x0cmFuc2xvY28gfX08L2Rpdj5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwiYWpmLWZpbGUtaW5mb1wiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIl9maWxlUHJldmlld0NoaWxkcmVuPy5sZW5ndGg7IGVsc2UgZGVmYXVsdEZpbGVQcmV2aWV3XCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlthamZGaWxlUHJldmlld11cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEZpbGVQcmV2aWV3PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWZpbGUtaW5mby1jb250ZW50XCI+XG4gICAgICAgICAgPGltZyBbc3JjXT1cImZpbGVJY29uXCIgYWx0PVwiXCI+XG4gICAgICAgICAgPGRpdj57eyB2YWx1ZS5uYW1lIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvZGl2PlxuPGlucHV0ICNuYXRpdmVJbnB1dCBbYWNjZXB0XT1cImFjY2VwdFwiIG5hbWU9XCJcIiBhcmlhLWxhYmVsPVwiZmlsZSBpbnB1dFwiIHR5cGU9XCJmaWxlXCIgKGNoYW5nZSk9XCJvblNlbGVjdEZpbGUoKVwiPlxuIl19