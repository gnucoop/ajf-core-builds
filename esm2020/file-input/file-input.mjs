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
        else if (value == null || (isAjfFile(value) && isValidMimeType(value.type, this.accept))) {
            this._value = value;
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
        reader.onload = (_) => {
            const content = reader.result;
            if (typeof content !== 'string') {
                return;
            }
            this.value = { name, size, type, content };
        };
        reader.readAsDataURL(file);
    }
}
AjfFileInput.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFileInput, deps: [{ token: i1.DomSanitizer }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Component });
AjfFileInput.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfFileInput, selector: "ajf-file-input", inputs: { accept: "accept", value: "value" }, outputs: { valueChange: "valueChange" }, host: { properties: { "class.ajf-file-input": "true" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AjfFileInput),
            multi: true,
        },
    ], queries: [{ propertyName: "_dropMessageChildren", predicate: AjfDropMessage }, { propertyName: "_filePreviewChildren", predicate: AjfFilePreview }], viewQueries: [{ propertyName: "_nativeInput", first: true, predicate: ["nativeInput"], descendants: true }], ngImport: i0, template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"value === undefined; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>{{'Drop your file here or click to select'|transloco}}</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|transloco }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value?.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n", styles: [".ajf-file-input{display:flex;min-height:100px;align-items:stretch;position:relative;overflow:hidden}.ajf-file-input .ajf-drop-zone,.ajf-file-input .ajf-file-info,.ajf-file-input .ajf-drop-message{flex:1 1 auto;display:flex;align-items:center;justify-content:center}.ajf-file-input .ajf-drop-zone{background-color:#eee}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{background-color:#999}.ajf-file-input .ajf-drop-message{cursor:pointer;align-self:stretch}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center}.ajf-file-input .ajf-file-info-content img{width:32px;height:32px;margin-right:8px}.ajf-file-input input{position:absolute;top:-9999;left:-9999;opacity:0;z-index:-1}.ajf-file-input .ajf-screen-reader-only{display:none}.ajf-file-input .ajf-remove-file{position:absolute;top:16px;right:16px;padding:8px;cursor:pointer}.ajf-file-input .ajf-remove-file img{width:16px;height:16px;margin-right:0}\n"], directives: [{ type: i2.AjfDndDirective, selector: "[ajfDnd]", outputs: ["file"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "transloco": i4.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
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
                    ], template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"value === undefined; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>{{'Drop your file here or click to select'|transloco}}</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|transloco }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value?.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n", styles: [".ajf-file-input{display:flex;min-height:100px;align-items:stretch;position:relative;overflow:hidden}.ajf-file-input .ajf-drop-zone,.ajf-file-input .ajf-file-info,.ajf-file-input .ajf-drop-message{flex:1 1 auto;display:flex;align-items:center;justify-content:center}.ajf-file-input .ajf-drop-zone{background-color:#eee}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{background-color:#999}.ajf-file-input .ajf-drop-message{cursor:pointer;align-self:stretch}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center}.ajf-file-input .ajf-file-info-content img{width:32px;height:32px;margin-right:8px}.ajf-file-input input{position:absolute;top:-9999;left:-9999;opacity:0;z-index:-1}.ajf-file-input .ajf-screen-reader-only{display:none}.ajf-file-input .ajf-remove-file{position:absolute;top:16px;right:16px;padding:8px;cursor:pointer}.ajf-file-input .ajf-remove-file img{width:16px;height:16px;margin-right:0}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZmlsZS1pbnB1dC9zcmMvZmlsZS1pbnB1dC50cyIsIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZmlsZS1pbnB1dC9zcmMvZmlsZS1pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFFdkIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBRVQsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxFQUVOLFNBQVMsRUFFVCxpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRXZFLE9BQU8sRUFBYSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDOzs7Ozs7QUFLdEMsTUFBTSxPQUFPLGNBQWM7OzJHQUFkLGNBQWM7K0ZBQWQsY0FBYzsyRkFBZCxjQUFjO2tCQUQxQixTQUFTO21CQUFDLEVBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFDOztBQU96QyxNQUFNLE9BQU8sY0FBYztJQVF6QixZQUFZLEdBQXFCO1FBRnpCLGNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1FBR3JDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztRQUNuRCxNQUFNLFlBQVksR0FBRyxDQUFDLEtBQTBCLEVBQW9CLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDO1FBQ3JGLElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzFCLElBQUks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RTtJQUN6RSw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLGlCQUFpQixDQUFDO0FBRXBCLE1BQU0sU0FBUyxHQUNiLCtFQUErRTtJQUMvRSw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLGtFQUFrRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWxlfSBmcm9tICcuL2ZpbGUnO1xuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1thamZEcm9wTWVzc2FnZV0nfSlcbmV4cG9ydCBjbGFzcyBBamZEcm9wTWVzc2FnZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYWpmRmlsZVByZXZpZXddJyxcbiAgZXhwb3J0QXM6ICdhamZGaWxlUHJldmlldycsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZpbGVQcmV2aWV3IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfdmFsdWU6IEFqZkZpbGUgfCB1bmRlZmluZWQ7XG4gIGdldCB2YWx1ZSgpOiBBamZGaWxlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcih2Y3I6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBjb25zdCBpbnB1dCA9IHZjci5pbmplY3Rvci5nZXQoQWpmRmlsZUlucHV0LCBudWxsKTtcbiAgICBjb25zdCBpc1ZhbHVlR3VhcmQgPSAodmFsdWU6IEFqZkZpbGUgfCB1bmRlZmluZWQpOiB2YWx1ZSBpcyBBamZGaWxlID0+IHZhbHVlICE9IG51bGw7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWVTdWIgPSBpbnB1dC52YWx1ZUNoYW5nZS5waXBlKGZpbHRlcihpc1ZhbHVlR3VhcmQpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmlsZS1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLWlucHV0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWxlLWlucHV0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hamYtZmlsZS1pbnB1dF0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmRmlsZUlucHV0KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZpbGVJbnB1dCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZEcm9wTWVzc2FnZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIF9kcm9wTWVzc2FnZUNoaWxkcmVuITogUXVlcnlMaXN0PEFqZkRyb3BNZXNzYWdlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZGaWxlUHJldmlldywge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIF9maWxlUHJldmlld0NoaWxkcmVuITogUXVlcnlMaXN0PEFqZkZpbGVQcmV2aWV3PjtcbiAgQFZpZXdDaGlsZCgnbmF0aXZlSW5wdXQnKSBfbmF0aXZlSW5wdXQhOiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIHJlYWRvbmx5IGZpbGVJY29uOiBTYWZlUmVzb3VyY2VVcmw7XG4gIHJlYWRvbmx5IHJlbW92ZUljb246IFNhZmVSZXNvdXJjZVVybDtcblxuICBASW5wdXQoKSBhY2NlcHQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuICBwcml2YXRlIF92YWx1ZTogYW55O1xuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGVMaXN0KSB7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKHZhbHVlWzBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHZhbHVlID09IG51bGwgfHwgKGlzQWpmRmlsZSh2YWx1ZSkgJiYgaXNWYWxpZE1pbWVUeXBlKHZhbHVlLnR5cGUsIHRoaXMuYWNjZXB0KSkpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl92YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlKTtcbiAgICAgIGlmICh0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbih0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZpbGUgfCB1bmRlZmluZWQ+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSB2YWx1ZUNoYW5nZTogT2JzZXJ2YWJsZTxBamZGaWxlIHwgdW5kZWZpbmVkPiA9IHRoaXMuX3ZhbHVlQ2hhbmdlIGFzIE9ic2VydmFibGU8XG4gICAgQWpmRmlsZSB8IHVuZGVmaW5lZFxuICA+O1xuXG4gIC8qKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbC4gKi9cbiAgX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqIG9uVG91Y2ggZnVuY3Rpb24gcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gIF9vblRvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLCBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5maWxlSWNvbiA9IGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoZmlsZUljb24pO1xuICAgIHRoaXMucmVtb3ZlSWNvbiA9IGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodHJhc2hJY29uKTtcbiAgfVxuXG4gIG9uRmlsZURyb3AoZmlsZXM6IEZpbGVMaXN0KTogdm9pZCB7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmaWxlID0gZmlsZXNbMF07XG4gICAgdGhpcy5fcHJvY2Vzc0ZpbGVVcGxvYWQoZmlsZSk7XG4gIH1cblxuICBvblNlbGVjdEZpbGUoKTogdm9pZCB7XG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLl9uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LmZpbGVzO1xuICAgIGlmIChmaWxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZpbGUgPSBmaWxlcy5pdGVtKDApO1xuICAgIGlmIChmaWxlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcHJvY2Vzc0ZpbGVVcGxvYWQoZmlsZXMuaXRlbSgwKSBhcyBGaWxlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHJlc2V0VmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fbmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgdHJpZ2dlck5hdGl2ZUlucHV0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fbmF0aXZlSW5wdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGU6IEZpbGUpOiB2b2lkIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGNvbnN0IHtuYW1lLCBzaXplLCB0eXBlfSA9IGZpbGU7XG4gICAgaWYgKCFpc1ZhbGlkTWltZVR5cGUodHlwZSwgdGhpcy5hY2NlcHQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlYWRlci5vbmxvYWQgPSAoXzogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICBpZiAodHlwZW9mIGNvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMudmFsdWUgPSB7bmFtZSwgc2l6ZSwgdHlwZSwgY29udGVudH07XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgfVxufVxuXG5jb25zdCBhamZGaWxlS2V5cyA9IEpTT04uc3RyaW5naWZ5KFsnY29udGVudCcsICduYW1lJywgJ3NpemUnLCAndHlwZSddKTtcblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gQWpmRmlsZSBpbnRlcmZhY2UuXG4gKi9cbmZ1bmN0aW9uIGlzQWpmRmlsZSh2YWx1ZTogYW55KTogdmFsdWUgaXMgQWpmRmlsZSB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSkuc29ydCgoYSwgYikgPT4gYS5sb2NhbGVDb21wYXJlKGIpKTtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGtleXMpID09PSBhamZGaWxlS2V5cztcbn1cblxuZnVuY3Rpb24gaXNWYWxpZE1pbWVUeXBlKG1pbWVUeXBlOiBzdHJpbmcsIGFjY2VwdDogc3RyaW5nIHwgdW5kZWZpbmVkKTogYm9vbGVhbiB7XG4gIGlmIChhY2NlcHQgPT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGxldCB0ZXJtaW5hdGUgPSB0cnVlO1xuICBpZiAoYWNjZXB0LmVuZHNXaXRoKCcqJykpIHtcbiAgICBhY2NlcHQgPSBhY2NlcHQuc2xpY2UoMCwgYWNjZXB0Lmxlbmd0aCAtIDEpO1xuICAgIHRlcm1pbmF0ZSA9IGZhbHNlO1xuICB9XG4gIGNvbnN0IHJlZ0V4U3RyID0gJ14nICsgYWNjZXB0ICsgKHRlcm1pbmF0ZSA/ICckJyA6ICcnKTtcbiAgY29uc3QgcmVnRXggPSBuZXcgUmVnRXhwKHJlZ0V4U3RyKTtcbiAgcmV0dXJuIHJlZ0V4LnRlc3QobWltZVR5cGUpO1xufVxuXG5leHBvcnQgY29uc3QgZmlsZUljb24gPVxuICAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd00nICtcbiAgJ0M5emRtY2lJSGRwWkhSb1BTSXhOekEyTGpZMk55SWdhR1ZwWjJoMFBTSXhOekEyTGpZMk55SWdkbWxsZDBKdmVEMGlNQ0F3SURFeU9EQWdNVEk0TUNJZ2NISmwnICtcbiAgJ2MyVnlkbVZCYzNCbFkzUlNZWFJwYnowaWVFMXBaRmxOYVdRZ2JXVmxkQ0krUEhCaGRHZ2daRDBpVFRJNE15QXhNRE5qTFRFM0xqY2dNaTQwTFRNekxqa2dNVE0nICtcbiAgJ3VPQzAwTWk0eUlESTVMall0Tnk0MElERTBMVFl1T0Mwek1pNDFMVFl1T0NBME9UY3VOSE10TGpZZ05EZ3pMalFnTmk0NElEUTVOeTQwWXpZdU9DQXhNeTR4SUQnICtcbiAgJ0U0TGpZZ01qSXVOeUF6TXk0M0lESTNMamhzTnlBeUxqTm9OekUzYkRjdE1pNHpZekUxTGpFdE5TNHhJREkyTGprdE1UUXVOeUF6TXk0M0xUSTNMamdnTnk0MEwnICtcbiAgJ1RFMElEWXVPQ0F4T1M0eUlEWXVPQzB6TnpZdU5sWXpPVFF1TVd3dE1URXhMakl0TGpNdE1URXhMak10TGpRdE9DNDFMVEl1TTJNdE1qTXVPQzAyTGpVdE5ETXQnICtcbiAgJ01qRXVNeTAxTWk0MExUUXdMalV0Tnk0MUxURTFMak10TnkwMkxUY3VNeTB4TXpNdU9Xd3RMalF0TVRFMExqY3RNak16TGpJdU1TMHlNemd1Tnk0NWVtMDFNVEknICtcbiAgJ2dNVEE1TGpoak1DQXhNakF1TlMwdU15QXhNVFF1T1NBMklERXlOQzQwSURNdU5pQTFMalVnTVRFdU5pQXhNUzR5SURFNUxqY2dNVFF1TVNBMUxqZ2dNaTR5SUQnICtcbiAgJ1l1TkNBeUxqSWdNVEUxTGpnZ01pNDFiREV4TUNBdU15MHhNalV0TVRJMUxqUXRNVEkxTGpjdE1USTFMalZqTFM0MUxTNHhMUzQ0SURRNUxqSXRMamdnTVRBNUwnICtcbiAgJ2paNklpOCtQQzl6ZG1jKyc7XG5cbmNvbnN0IHRyYXNoSWNvbiA9XG4gICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtYycgK1xuICAnaUlIWnBaWGRDYjNnOUlqQWdMVEkxTmlBeE56a3lJREUzT1RJaUlIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaVBqeHdZWFJvSUdROUlrMDNNRCcgK1xuICAna3VOREkwSURRMU5TNHdOWFkxTnpaeE1DQXhOQzA1SURJekxUa2dPUzB5TXlBNWFDMDJOSEV0TVRRZ01DMHlNeTA1TFRrdE9TMDVMVEl6ZGkwMU56WnhNQzB4TicgK1xuICAnQ0E1TFRJeklEa3RPU0F5TXkwNWFEWTBjVEUwSURBZ01qTWdPU0E1SURrZ09TQXlNM3B0TWpVMklEQjJOVGMyY1RBZ01UUXRPU0F5TXkwNUlEa3RNak1nT1dndCcgK1xuICAnTmpSeExURTBJREF0TWpNdE9TMDVMVGt0T1MweU0zWXROVGMyY1RBdE1UUWdPUzB5TXlBNUxUa2dNak10T1dnMk5IRXhOQ0F3SURJeklEa2dPU0E1SURrZ01qTicgK1xuICAnNmJUSTFOaUF3ZGpVM05uRXdJREUwTFRrZ01qTXRPU0E1TFRJeklEbG9MVFkwY1MweE5DQXdMVEl6TFRrdE9TMDVMVGt0TWpOMkxUVTNObkV3TFRFMElEa3RNaicgK1xuICAnTWdPUzA1SURJekxUbG9OalJ4TVRRZ01DQXlNeUE1SURrZ09TQTVJREl6ZW0weE1qZ2dOekkwZGkwNU5EaG9MVGc1Tm5ZNU5EaHhNQ0F5TWlBM0lEUXdMalVnTicgK1xuICAneUF4T0M0MUlERTBMalVnTWpjZ055NDFJRGd1TlNBeE1DNDFJRGd1TldnNE16SnhNeUF3SURFd0xqVXRPQzQxSURjdU5TMDRMalVnTVRRdU5TMHlOeUEzTFRFNCcgK1xuICAnTGpVZ055MDBNQzQxZW0wdE5qY3lMVEV3Tnpab05EUTRiQzAwT0MweE1UZHhMVGN0T1MweE55MHhNV2d0TXpFM2NTMHhNQ0F5TFRFM0lERXhlbTA1TWpnZ016SicgK1xuICAnMk5qUnhNQ0F4TkMwNUlESXpMVGtnT1MweU15QTVhQzA1Tm5ZNU5EaHhNQ0E0TXkwME55QXhORE11TlMwME55QTJNQzQxTFRFeE15QTJNQzQxYUMwNE16SnhMVCcgK1xuICAnWTJJREF0TVRFekxUVTRMalV0TkRjdE5UZ3VOUzAwTnkweE5ERXVOWFl0T1RVeWFDMDVObkV0TVRRZ01DMHlNeTA1TFRrdE9TMDVMVEl6ZGkwMk5IRXdMVEUwSScgK1xuICAnRGt0TWpNZ09TMDVJREl6TFRsb016QTViRGN3TFRFMk4zRXhOUzB6TnlBMU5DMDJNeUF6T1MweU5pQTNPUzB5Tm1nek1qQnhOREFnTUNBM09TQXlOaUF6T1NBeScgK1xuICAnTmlBMU5DQTJNMnczTUNBeE5qZG9NekE1Y1RFMElEQWdNak1nT1NBNUlEa2dPU0F5TTNvaUx6NDhMM04yWno0PSc7XG4iLCI8ZGl2IGFqZkRuZCAoZmlsZSk9XCJvbkZpbGVEcm9wKCRldmVudClcIiBjbGFzcz1cImFqZi1kcm9wLXpvbmVcIj5cbiAgPGRpdiAqbmdJZj1cInZhbHVlID09PSB1bmRlZmluZWQ7IGVsc2UgZmlsZUluZm9cIiBjbGFzcz1cImFqZi1kcm9wLW1lc3NhZ2VcIiAoY2xpY2spPVwidHJpZ2dlck5hdGl2ZUlucHV0KClcIj5cbiAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiX2Ryb3BNZXNzYWdlQ2hpbGRyZW4/Lmxlbmd0aDsgZWxzZSBkZWZhdWx0RHJvcE1lc3NhZ2VcIj5cbiAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlthamZEcm9wTWVzc2FnZV1cIj48L25nLWNvbnRlbnQ+XG4gICAgPC9uZy1jb250YWluZXI+XG4gICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0RHJvcE1lc3NhZ2U+e3snRHJvcCB5b3VyIGZpbGUgaGVyZSBvciBjbGljayB0byBzZWxlY3QnfHRyYW5zbG9jb319PC9uZy10ZW1wbGF0ZT5cbiAgPC9kaXY+XG4gIDxuZy10ZW1wbGF0ZSAjZmlsZUluZm8+XG4gICAgPGJ1dHRvbiAoY2xpY2spPVwicmVzZXRWYWx1ZSgpXCIgY2xhc3M9XCJhamYtcmVtb3ZlLWZpbGVcIj5cbiAgICAgIDxpbWcgW3NyY109XCJyZW1vdmVJY29uXCIgYWx0PVwiXCI+XG4gICAgICA8ZGl2IGNsYXNzPVwiYWpmLXNjcmVlbi1yZWFkZXItb25seVwiPnt7ICdEZWxldGUnfHRyYW5zbG9jbyB9fTwvZGl2PlxuICAgIDwvYnV0dG9uPlxuICAgIDxkaXYgY2xhc3M9XCJhamYtZmlsZS1pbmZvXCI+XG4gICAgICA8bmctY29udGFpbmVyICpuZ0lmPVwiX2ZpbGVQcmV2aWV3Q2hpbGRyZW4/Lmxlbmd0aDsgZWxzZSBkZWZhdWx0RmlsZVByZXZpZXdcIj5cbiAgICAgICAgPG5nLWNvbnRlbnQgc2VsZWN0PVwiW2FqZkZpbGVQcmV2aWV3XVwiPjwvbmctY29udGVudD5cbiAgICAgIDwvbmctY29udGFpbmVyPlxuICAgICAgPG5nLXRlbXBsYXRlICNkZWZhdWx0RmlsZVByZXZpZXc+XG4gICAgICAgIDxkaXYgY2xhc3M9XCJhamYtZmlsZS1pbmZvLWNvbnRlbnRcIj5cbiAgICAgICAgICA8aW1nIFtzcmNdPVwiZmlsZUljb25cIiBhbHQ9XCJcIj5cbiAgICAgICAgICA8ZGl2Pnt7IHZhbHVlPy5uYW1lIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvZGl2PlxuPGlucHV0ICNuYXRpdmVJbnB1dCBbYWNjZXB0XT1cImFjY2VwdFwiIG5hbWU9XCJcIiBhcmlhLWxhYmVsPVwiZmlsZSBpbnB1dFwiIHR5cGU9XCJmaWxlXCIgKGNoYW5nZSk9XCJvblNlbGVjdEZpbGUoKVwiPlxuIl19