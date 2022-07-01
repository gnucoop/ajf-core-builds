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
import { ChangeDetectionStrategy, Component, ContentChildren, Directive, EventEmitter, forwardRef, Input, Output, ViewChild, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import * as i0 from "@angular/core";
import * as i1 from "@angular/platform-browser";
import * as i2 from "@ajf/core/common";
import * as i3 from "@angular/common";
import * as i4 from "@ngneat/transloco";
export class AjfDropMessage {
}
AjfDropMessage.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDropMessage, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AjfDropMessage.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfDropMessage, selector: "[ajfDropMessage]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDropMessage, decorators: [{
            type: Directive,
            args: [{ selector: '[ajfDropMessage]' }]
        }] });
export class AjfFilePreview {
    constructor(vcr) {
        this._valueSub = Subscription.EMPTY;
        const input = vcr.injector.get(AjfFileInput, null);
        const isValueGuard = (value) => value != null;
        if (input) {
            this._value = input.value;
            this._valueSub = input.valueChange.pipe(filter(isValueGuard)).subscribe(value => {
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
AjfFilePreview.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFilePreview, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AjfFilePreview.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfFilePreview, selector: "[ajfFilePreview]", exportAs: ["ajfFilePreview"], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFilePreview, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ajfFilePreview]',
                    exportAs: 'ajfFilePreview',
                }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });
/**
 * It allows the upload of a file inside an AjfForm.
 *
 * @export
 * @class AjfFileInput
 */
export class AjfFileInput {
    constructor(domSanitizer, _cdr) {
        this._cdr = _cdr;
        this._valueChange = new EventEmitter();
        this.valueChange = this._valueChange;
        /**
         * Event emitter for the delete file action
         */
        this._deleteFile = new EventEmitter();
        this.deleteFile = this._deleteFile;
        /**
         * The method to be called in order to update ngModel.
         */
        this._controlValueAccessorChangeFn = () => { };
        /**
         * onTouch function registered via registerOnTouch (ControlValueAccessor).
         */
        this._onTouched = () => { };
        this._emptyFile = true;
        this.fileIcon = domSanitizer.bypassSecurityTrustResourceUrl(fileIcon);
        this.removeIcon = domSanitizer.bypassSecurityTrustResourceUrl(trashIcon);
    }
    get emptyFile() {
        return this._emptyFile;
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
        else if (value == null || (isAjfFile(value) && isValidMimeType(value.type, this.accept))) {
            this._value = value;
            if (isAjfFile(value)) {
                this._emptyFile = false;
            }
            this._valueChange.emit(this._value);
            if (this._controlValueAccessorChangeFn != null) {
                this._controlValueAccessorChangeFn(this.value);
            }
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
        if (this.value !== null) {
            if (this.value.url && this.value.url.length) {
                this._deleteFile.emit(this.value.url);
                this.value.deleteUrl = true;
                this.value.content = null;
                this.value.name = null;
                this.value.size = 0;
            }
            else {
                this.value = null;
            }
        }
        this._nativeInput.nativeElement.value = '';
        this._emptyFile = true;
        this._cdr.markForCheck();
    }
    triggerNativeInput() {
        if (!this._nativeInput) {
            return;
        }
        this._nativeInput.nativeElement.click();
    }
    writeValue(value) {
        this.value = value;
        if (value == null || value == undefined || (value !== null && value.deleteUrl)) {
            this._emptyFile = true;
        }
        else {
            this._emptyFile = false;
        }
        this._cdr.markForCheck();
    }
    _processFileUpload(file) {
        const reader = new FileReader();
        const { name, size, type } = file;
        if (!isValidMimeType(type, this.accept)) {
            return;
        }
        reader.onload = (_) => {
            const content = reader.result;
            if (typeof content !== 'string') {
                return;
            }
            this.value = { name, size, type, content };
            this._emptyFile = false;
        };
        reader.readAsDataURL(file);
    }
}
AjfFileInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFileInput, deps: [{ token: i1.DomSanitizer }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfFileInput.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfFileInput, selector: "ajf-file-input", inputs: { accept: "accept", value: "value" }, outputs: { valueChange: "valueChange", deleteFile: "deleteFile" }, host: { properties: { "class.ajf-file-input": "true" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AjfFileInput),
            multi: true,
        },
    ], queries: [{ propertyName: "_dropMessageChildren", predicate: AjfDropMessage }, { propertyName: "_filePreviewChildren", predicate: AjfFilePreview }], viewQueries: [{ propertyName: "_nativeInput", first: true, predicate: ["nativeInput"], descendants: true }], ngImport: i0, template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"emptyFile; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>{{'Drop your file here or click to select'|transloco}}</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|transloco }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value?.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n", styles: [".ajf-file-input{display:flex;min-height:100px;align-items:stretch;position:relative;overflow:hidden}.ajf-file-input .ajf-drop-zone,.ajf-file-input .ajf-file-info,.ajf-file-input .ajf-drop-message{flex:1 1 auto;display:flex;align-items:center;justify-content:center}.ajf-file-input .ajf-drop-zone{background-color:#eee}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{background-color:#999}.ajf-file-input .ajf-drop-message{cursor:pointer;align-self:stretch}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center}.ajf-file-input .ajf-file-info-content img{width:32px;height:32px;margin-right:8px}.ajf-file-input input{position:absolute;top:-9999;left:-9999;opacity:0;z-index:-1}.ajf-file-input .ajf-screen-reader-only{display:none}.ajf-file-input .ajf-remove-file{position:absolute;top:16px;right:16px;padding:8px;cursor:pointer}.ajf-file-input .ajf-remove-file img{width:16px;height:16px;margin-right:0}\n"], directives: [{ type: i2.AjfDndDirective, selector: "[ajfDnd]", outputs: ["file"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "transloco": i4.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFileInput, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-file-input', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[class.ajf-file-input]': 'true',
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AjfFileInput),
                            multi: true,
                        },
                    ], template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"emptyFile; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>{{'Drop your file here or click to select'|transloco}}</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|transloco }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value?.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n", styles: [".ajf-file-input{display:flex;min-height:100px;align-items:stretch;position:relative;overflow:hidden}.ajf-file-input .ajf-drop-zone,.ajf-file-input .ajf-file-info,.ajf-file-input .ajf-drop-message{flex:1 1 auto;display:flex;align-items:center;justify-content:center}.ajf-file-input .ajf-drop-zone{background-color:#eee}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{background-color:#999}.ajf-file-input .ajf-drop-message{cursor:pointer;align-self:stretch}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center}.ajf-file-input .ajf-file-info-content img{width:32px;height:32px;margin-right:8px}.ajf-file-input input{position:absolute;top:-9999;left:-9999;opacity:0;z-index:-1}.ajf-file-input .ajf-screen-reader-only{display:none}.ajf-file-input .ajf-remove-file{position:absolute;top:16px;right:16px;padding:8px;cursor:pointer}.ajf-file-input .ajf-remove-file img{width:16px;height:16px;margin-right:0}\n"] }]
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
            }], deleteFile: [{
                type: Output
            }] } });
/**
 * Test if a value is an AjfFile interface.
 * The AjfFile is valid if it contains the name and
 * the content or the url of the file
 */
function isAjfFile(value) {
    if (value == null || typeof value !== 'object') {
        return false;
    }
    if ('name' in value && ('content' in value || 'url' in value)) {
        return true;
    }
    return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZmlsZS1pbnB1dC9zcmMvZmlsZS1pbnB1dC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZmlsZS1pbnB1dC9zcmMvZmlsZS1pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxFQUVOLFNBQVMsRUFFVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFLdEMsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7K0ZBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUQxQixTQUFTO21CQUFDLEVBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFDOztBQU96QyxNQUFNLE9BQU8sY0FBYztJQVF6QixZQUFZLEdBQXFCO1FBRnpCLGNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBR3JDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQTBCLEVBQW9CLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1FBQ3JGLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzFCLElBQUks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RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLGlCQUFpQixDQUFDO0FBRXBCLE1BQU0sU0FBUyxHQUNiLCtFQUErRTtJQUMvRSw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLGtFQUFrRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWxlfSBmcm9tICcuL2ZpbGUnO1xuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1thamZEcm9wTWVzc2FnZV0nfSlcbmV4cG9ydCBjbGFzcyBBamZEcm9wTWVzc2FnZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYWpmRmlsZVByZXZpZXddJyxcbiAgZXhwb3J0QXM6ICdhamZGaWxlUHJldmlldycsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZpbGVQcmV2aWV3IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfdmFsdWU6IEFqZkZpbGUgfCB1bmRlZmluZWQ7XG4gIGdldCB2YWx1ZSgpOiBBamZGaWxlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcih2Y3I6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBjb25zdCBpbnB1dCA9IHZjci5pbmplY3Rvci5nZXQoQWpmRmlsZUlucHV0LCBudWxsKTtcbiAgICBjb25zdCBpc1ZhbHVlR3VhcmQgPSAodmFsdWU6IEFqZkZpbGUgfCB1bmRlZmluZWQpOiB2YWx1ZSBpcyBBamZGaWxlID0+IHZhbHVlICE9IG51bGw7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWVTdWIgPSBpbnB1dC52YWx1ZUNoYW5nZS5waXBlKGZpbHRlcihpc1ZhbHVlR3VhcmQpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG4vKipcbiAqIEl0IGFsbG93cyB0aGUgdXBsb2FkIG9mIGEgZmlsZSBpbnNpZGUgYW4gQWpmRm9ybS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmRmlsZUlucHV0XG4gKi9cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1maWxlLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtaW5wdXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbGUtaW5wdXQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFqZi1maWxlLWlucHV0XSc6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbXG4gICAge1xuICAgICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZGaWxlSW5wdXQpLFxuICAgICAgbXVsdGk6IHRydWUsXG4gICAgfSxcbiAgXSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmlsZUlucHV0IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAQ29udGVudENoaWxkcmVuKEFqZkRyb3BNZXNzYWdlLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSlcbiAgX2Ryb3BNZXNzYWdlQ2hpbGRyZW4hOiBRdWVyeUxpc3Q8QWpmRHJvcE1lc3NhZ2U+O1xuXG4gIEBDb250ZW50Q2hpbGRyZW4oQWpmRmlsZVByZXZpZXcsIHtkZXNjZW5kYW50czogZmFsc2V9KVxuICBfZmlsZVByZXZpZXdDaGlsZHJlbiE6IFF1ZXJ5TGlzdDxBamZGaWxlUHJldmlldz47XG5cbiAgQFZpZXdDaGlsZCgnbmF0aXZlSW5wdXQnKSBfbmF0aXZlSW5wdXQhOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIHJlYWRvbmx5IGZpbGVJY29uOiBTYWZlUmVzb3VyY2VVcmw7XG4gIHJlYWRvbmx5IHJlbW92ZUljb246IFNhZmVSZXNvdXJjZVVybDtcblxuICAvKipcbiAgICogRW5hYmxlIGRyb3AgZm9yIGEgbmV3IGZpbGUgdG8gdXBsb2FkXG4gICAqL1xuICBwcml2YXRlIF9lbXB0eUZpbGU6IGJvb2xlYW47XG4gIGdldCBlbXB0eUZpbGUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2VtcHR5RmlsZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBBY2NlcHRlZCBNaW1lVHlwZVxuICAgKiBFcy4gXCJpbWFnZS8qXCIgb3IgXCJhcHBsaWNhdGlvbi9wZGZcIlxuICAgKi9cbiAgQElucHV0KCkgYWNjZXB0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgdGhpcy5fcHJvY2Vzc0ZpbGVVcGxvYWQodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlTGlzdCkge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZCh2YWx1ZVswXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh2YWx1ZSA9PSBudWxsIHx8IChpc0FqZkZpbGUodmFsdWUpICYmIGlzVmFsaWRNaW1lVHlwZSh2YWx1ZS50eXBlLCB0aGlzLmFjY2VwdCkpKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgaWYgKGlzQWpmRmlsZSh2YWx1ZSkpIHtcbiAgICAgICAgdGhpcy5fZW1wdHlGaWxlID0gZmFsc2U7XG4gICAgICB9XG4gICAgICB0aGlzLl92YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlKTtcbiAgICAgIGlmICh0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbih0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZpbGUgfCB1bmRlZmluZWQ+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSB2YWx1ZUNoYW5nZTogT2JzZXJ2YWJsZTxBamZGaWxlIHwgdW5kZWZpbmVkPiA9IHRoaXMuX3ZhbHVlQ2hhbmdlIGFzIE9ic2VydmFibGU8XG4gICAgQWpmRmlsZSB8IHVuZGVmaW5lZFxuICA+O1xuXG4gIC8qKlxuICAgKiBFdmVudCBlbWl0dGVyIGZvciB0aGUgZGVsZXRlIGZpbGUgYWN0aW9uXG4gICAqL1xuICBwcml2YXRlIF9kZWxldGVGaWxlID0gbmV3IEV2ZW50RW1pdHRlcjxzdHJpbmc+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBkZWxldGVGaWxlOiBPYnNlcnZhYmxlPHN0cmluZz4gPSB0aGlzLl9kZWxldGVGaWxlIGFzIE9ic2VydmFibGU8c3RyaW5nPjtcblxuICAvKipcbiAgICogVGhlIG1ldGhvZCB0byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gdXBkYXRlIG5nTW9kZWwuXG4gICAqL1xuICBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKipcbiAgICogb25Ub3VjaCBmdW5jdGlvbiByZWdpc3RlcmVkIHZpYSByZWdpc3Rlck9uVG91Y2ggKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS5cbiAgICovXG4gIF9vblRvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLCBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5fZW1wdHlGaWxlID0gdHJ1ZTtcbiAgICB0aGlzLmZpbGVJY29uID0gZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChmaWxlSWNvbik7XG4gICAgdGhpcy5yZW1vdmVJY29uID0gZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh0cmFzaEljb24pO1xuICB9XG5cbiAgb25GaWxlRHJvcChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZpbGUgPSBmaWxlc1swXTtcbiAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZChmaWxlKTtcbiAgfVxuXG4gIG9uU2VsZWN0RmlsZSgpOiB2b2lkIHtcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMuX25hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZmlsZXM7XG4gICAgaWYgKGZpbGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlsZSA9IGZpbGVzLml0ZW0oMCk7XG4gICAgaWYgKGZpbGUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZChmaWxlcy5pdGVtKDApIGFzIEZpbGUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgcmVzZXRWYWx1ZSgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy52YWx1ZSAhPT0gbnVsbCkge1xuICAgICAgaWYgKHRoaXMudmFsdWUudXJsICYmIHRoaXMudmFsdWUudXJsLmxlbmd0aCkge1xuICAgICAgICB0aGlzLl9kZWxldGVGaWxlLmVtaXQodGhpcy52YWx1ZS51cmwpO1xuICAgICAgICB0aGlzLnZhbHVlLmRlbGV0ZVVybCA9IHRydWU7XG4gICAgICAgIHRoaXMudmFsdWUuY29udGVudCA9IG51bGw7XG4gICAgICAgIHRoaXMudmFsdWUubmFtZSA9IG51bGw7XG4gICAgICAgIHRoaXMudmFsdWUuc2l6ZSA9IDA7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICAgIH1cbiAgICB9XG4gICAgdGhpcy5fbmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICAgIHRoaXMuX2VtcHR5RmlsZSA9IHRydWU7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgdHJpZ2dlck5hdGl2ZUlucHV0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fbmF0aXZlSW5wdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlID09IHVuZGVmaW5lZCB8fCAodmFsdWUgIT09IG51bGwgJiYgdmFsdWUuZGVsZXRlVXJsKSkge1xuICAgICAgdGhpcy5fZW1wdHlGaWxlID0gdHJ1ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5fZW1wdHlGaWxlID0gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGU6IEZpbGUpOiB2b2lkIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGNvbnN0IHtuYW1lLCBzaXplLCB0eXBlfSA9IGZpbGU7XG4gICAgaWYgKCFpc1ZhbGlkTWltZVR5cGUodHlwZSwgdGhpcy5hY2NlcHQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlYWRlci5vbmxvYWQgPSAoXzogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICBpZiAodHlwZW9mIGNvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMudmFsdWUgPSB7bmFtZSwgc2l6ZSwgdHlwZSwgY29udGVudH07XG4gICAgICB0aGlzLl9lbXB0eUZpbGUgPSBmYWxzZTtcbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICB9XG59XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIEFqZkZpbGUgaW50ZXJmYWNlLlxuICogVGhlIEFqZkZpbGUgaXMgdmFsaWQgaWYgaXQgY29udGFpbnMgdGhlIG5hbWUgYW5kXG4gKiB0aGUgY29udGVudCBvciB0aGUgdXJsIG9mIHRoZSBmaWxlXG4gKi9cbmZ1bmN0aW9uIGlzQWpmRmlsZSh2YWx1ZTogYW55KTogdmFsdWUgaXMgQWpmRmlsZSB7XG4gIGlmICh2YWx1ZSA9PSBudWxsIHx8IHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgaWYgKCduYW1lJyBpbiB2YWx1ZSAmJiAoJ2NvbnRlbnQnIGluIHZhbHVlIHx8ICd1cmwnIGluIHZhbHVlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZE1pbWVUeXBlKG1pbWVUeXBlOiBzdHJpbmcsIGFjY2VwdDogc3RyaW5nIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gIGlmIChhY2NlcHQgPT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGxldCB0ZXJtaW5hdGUgPSB0cnVlO1xuICBpZiAoYWNjZXB0LmVuZHNXaXRoKCcqJykpIHtcbiAgICBhY2NlcHQgPSBhY2NlcHQuc2xpY2UoMCwgYWNjZXB0Lmxlbmd0aCAtIDEpO1xuICAgIHRlcm1pbmF0ZSA9IGZhbHNlO1xuICB9XG4gIGNvbnN0IHJlZ0V4U3RyID0gJ14nICsgYWNjZXB0ICsgKHRlcm1pbmF0ZSA/ICckJyA6ICcnKTtcbiAgY29uc3QgcmVnRXggPSBuZXcgUmVnRXhwKHJlZ0V4U3RyKTtcbiAgcmV0dXJuIHJlZ0V4LnRlc3QobWltZVR5cGUpO1xufVxuXG5leHBvcnQgY29uc3QgZmlsZUljb24gPVxuICAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd00nICtcbiAgJ0M5emRtY2lJSGRwWkhSb1BTSXhOekEyTGpZMk55SWdhR1ZwWjJoMFBTSXhOekEyTGpZMk55SWdkbWxsZDBKdmVEMGlNQ0F3SURFeU9EQWdNVEk0TUNJZ2NISmwnICtcbiAgJ2MyVnlkbVZCYzNCbFkzUlNZWFJwYnowaWVFMXBaRmxOYVdRZ2JXVmxkQ0krUEhCaGRHZ2daRDBpVFRJNE15QXhNRE5qTFRFM0xqY2dNaTQwTFRNekxqa2dNVE0nICtcbiAgJ3VPQzAwTWk0eUlESTVMall0Tnk0MElERTBMVFl1T0Mwek1pNDFMVFl1T0NBME9UY3VOSE10TGpZZ05EZ3pMalFnTmk0NElEUTVOeTQwWXpZdU9DQXhNeTR4SUQnICtcbiAgJ0U0TGpZZ01qSXVOeUF6TXk0M0lESTNMamhzTnlBeUxqTm9OekUzYkRjdE1pNHpZekUxTGpFdE5TNHhJREkyTGprdE1UUXVOeUF6TXk0M0xUSTNMamdnTnk0MEwnICtcbiAgJ1RFMElEWXVPQ0F4T1M0eUlEWXVPQzB6TnpZdU5sWXpPVFF1TVd3dE1URXhMakl0TGpNdE1URXhMak10TGpRdE9DNDFMVEl1TTJNdE1qTXVPQzAyTGpVdE5ETXQnICtcbiAgJ01qRXVNeTAxTWk0MExUUXdMalV0Tnk0MUxURTFMak10TnkwMkxUY3VNeTB4TXpNdU9Xd3RMalF0TVRFMExqY3RNak16TGpJdU1TMHlNemd1Tnk0NWVtMDFNVEknICtcbiAgJ2dNVEE1TGpoak1DQXhNakF1TlMwdU15QXhNVFF1T1NBMklERXlOQzQwSURNdU5pQTFMalVnTVRFdU5pQXhNUzR5SURFNUxqY2dNVFF1TVNBMUxqZ2dNaTR5SUQnICtcbiAgJ1l1TkNBeUxqSWdNVEUxTGpnZ01pNDFiREV4TUNBdU15MHhNalV0TVRJMUxqUXRNVEkxTGpjdE1USTFMalZqTFM0MUxTNHhMUzQ0SURRNUxqSXRMamdnTVRBNUwnICtcbiAgJ2paNklpOCtQQzl6ZG1jKyc7XG5cbmNvbnN0IHRyYXNoSWNvbiA9XG4gICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtYycgK1xuICAnaUlIWnBaWGRDYjNnOUlqQWdMVEkxTmlBeE56a3lJREUzT1RJaUlIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaVBqeHdZWFJvSUdROUlrMDNNRCcgK1xuICAna3VOREkwSURRMU5TNHdOWFkxTnpaeE1DQXhOQzA1SURJekxUa2dPUzB5TXlBNWFDMDJOSEV0TVRRZ01DMHlNeTA1TFRrdE9TMDVMVEl6ZGkwMU56WnhNQzB4TicgK1xuICAnQ0E1TFRJeklEa3RPU0F5TXkwNWFEWTBjVEUwSURBZ01qTWdPU0E1SURrZ09TQXlNM3B0TWpVMklEQjJOVGMyY1RBZ01UUXRPU0F5TXkwNUlEa3RNak1nT1dndCcgK1xuICAnTmpSeExURTBJREF0TWpNdE9TMDVMVGt0T1MweU0zWXROVGMyY1RBdE1UUWdPUzB5TXlBNUxUa2dNak10T1dnMk5IRXhOQ0F3SURJeklEa2dPU0E1SURrZ01qTicgK1xuICAnNmJUSTFOaUF3ZGpVM05uRXdJREUwTFRrZ01qTXRPU0E1TFRJeklEbG9MVFkwY1MweE5DQXdMVEl6TFRrdE9TMDVMVGt0TWpOMkxUVTNObkV3TFRFMElEa3RNaicgK1xuICAnTWdPUzA1SURJekxUbG9OalJ4TVRRZ01DQXlNeUE1SURrZ09TQTVJREl6ZW0weE1qZ2dOekkwZGkwNU5EaG9MVGc1Tm5ZNU5EaHhNQ0F5TWlBM0lEUXdMalVnTicgK1xuICAneUF4T0M0MUlERTBMalVnTWpjZ055NDFJRGd1TlNBeE1DNDFJRGd1TldnNE16SnhNeUF3SURFd0xqVXRPQzQxSURjdU5TMDRMalVnTVRRdU5TMHlOeUEzTFRFNCcgK1xuICAnTGpVZ055MDBNQzQxZW0wdE5qY3lMVEV3Tnpab05EUTRiQzAwT0MweE1UZHhMVGN0T1MweE55MHhNV2d0TXpFM2NTMHhNQ0F5TFRFM0lERXhlbTA1TWpnZ016SicgK1xuICAnMk5qUnhNQ0F4TkMwNUlESXpMVGtnT1MweU15QTVhQzA1Tm5ZNU5EaHhNQ0E0TXkwME55QXhORE11TlMwME55QTJNQzQxTFRFeE15QTJNQzQxYUMwNE16SnhMVCcgK1xuICAnWTJJREF0TVRFekxUVTRMalV0TkRjdE5UZ3VOUzAwTnkweE5ERXVOWFl0T1RVeWFDMDVObkV0TVRRZ01DMHlNeTA1TFRrdE9TMDVMVEl6ZGkwMk5IRXdMVEUwSScgK1xuICAnRGt0TWpNZ09TMDVJREl6TFRsb016QTViRGN3TFRFMk4zRXhOUzB6TnlBMU5DMDJNeUF6T1MweU5pQTNPUzB5Tm1nek1qQnhOREFnTUNBM09TQXlOaUF6T1NBeScgK1xuICAnTmlBMU5DQTJNMnczTUNBeE5qZG9NekE1Y1RFMElEQWdNak1nT1NBNUlEa2dPU0F5TTNvaUx6NDhMM04yWno0PSc7XG4iLCI8ZGl2IGFqZkRuZCAoZmlsZSk9XCJvbkZpbGVEcm9wKCRldmVudClcIiBjbGFzcz1cImFqZi1kcm9wLXpvbmVcIj5cbiAgPGRpdiAqbmdJZj1cImVtcHR5RmlsZTsgZWxzZSBmaWxlSW5mb1wiIGNsYXNzPVwiYWpmLWRyb3AtbWVzc2FnZVwiIChjbGljayk9XCJ0cmlnZ2VyTmF0aXZlSW5wdXQoKVwiPlxuICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJfZHJvcE1lc3NhZ2VDaGlsZHJlbj8ubGVuZ3RoOyBlbHNlIGRlZmF1bHREcm9wTWVzc2FnZVwiPlxuICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2FqZkRyb3BNZXNzYWdlXVwiPjwvbmctY29udGVudD5cbiAgICA8L25nLWNvbnRhaW5lcj5cbiAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHREcm9wTWVzc2FnZT57eydEcm9wIHlvdXIgZmlsZSBoZXJlIG9yIGNsaWNrIHRvIHNlbGVjdCd8dHJhbnNsb2NvfX08L25nLXRlbXBsYXRlPlxuICA8L2Rpdj5cbiAgPG5nLXRlbXBsYXRlICNmaWxlSW5mbz5cbiAgICA8YnV0dG9uIChjbGljayk9XCJyZXNldFZhbHVlKClcIiBjbGFzcz1cImFqZi1yZW1vdmUtZmlsZVwiPlxuICAgICAgPGltZyBbc3JjXT1cInJlbW92ZUljb25cIiBhbHQ9XCJcIj5cbiAgICAgIDxkaXYgY2xhc3M9XCJhamYtc2NyZWVuLXJlYWRlci1vbmx5XCI+e3sgJ0RlbGV0ZSd8dHJhbnNsb2NvIH19PC9kaXY+XG4gICAgPC9idXR0b24+XG4gICAgPGRpdiBjbGFzcz1cImFqZi1maWxlLWluZm9cIj5cbiAgICAgIDxuZy1jb250YWluZXIgKm5nSWY9XCJfZmlsZVByZXZpZXdDaGlsZHJlbj8ubGVuZ3RoOyBlbHNlIGRlZmF1bHRGaWxlUHJldmlld1wiPlxuICAgICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbYWpmRmlsZVByZXZpZXddXCI+PC9uZy1jb250ZW50PlxuICAgICAgPC9uZy1jb250YWluZXI+XG4gICAgICA8bmctdGVtcGxhdGUgI2RlZmF1bHRGaWxlUHJldmlldz5cbiAgICAgICAgPGRpdiBjbGFzcz1cImFqZi1maWxlLWluZm8tY29udGVudFwiPlxuICAgICAgICAgIDxpbWcgW3NyY109XCJmaWxlSWNvblwiIGFsdD1cIlwiPlxuICAgICAgICAgIDxkaXY+e3sgdmFsdWU/Lm5hbWUgfX08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L25nLXRlbXBsYXRlPlxuICAgIDwvZGl2PlxuICA8L25nLXRlbXBsYXRlPlxuPC9kaXY+XG48aW5wdXQgI25hdGl2ZUlucHV0IFthY2NlcHRdPVwiYWNjZXB0XCIgbmFtZT1cIlwiIGFyaWEtbGFiZWw9XCJmaWxlIGlucHV0XCIgdHlwZT1cImZpbGVcIiAoY2hhbmdlKT1cIm9uU2VsZWN0RmlsZSgpXCI+XG4iXX0=