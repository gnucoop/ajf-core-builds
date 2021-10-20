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
            this._valueSub = input.valueChange.pipe(filter(value => value != null)).subscribe(value => {
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
AjfFileInput.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfFileInput, selector: "ajf-file-input", inputs: { accept: "accept", value: "value" }, outputs: { valueChange: "valueChange" }, host: { properties: { "class.ajf-file-input": "true" } }, providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => AjfFileInput),
            multi: true,
        },
    ], queries: [{ propertyName: "_dropMessageChildren", predicate: AjfDropMessage }, { propertyName: "_filePreviewChildren", predicate: AjfFilePreview }], viewQueries: [{ propertyName: "_nativeInput", first: true, predicate: ["nativeInput"], descendants: true }], ngImport: i0, template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"value == null; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>{{'Drop your file here or click to select'|transloco}}</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|transloco }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n", styles: [".ajf-file-input{display:flex;min-height:100px;align-items:stretch;position:relative;overflow:hidden}.ajf-file-input .ajf-drop-zone,.ajf-file-input .ajf-file-info,.ajf-file-input .ajf-drop-message{flex:1 1 auto;display:flex;align-items:center;justify-content:center}.ajf-file-input .ajf-drop-zone{background-color:#eee}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{background-color:#999}.ajf-file-input .ajf-drop-message{cursor:pointer;align-self:stretch}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center}.ajf-file-input .ajf-file-info-content img{width:32px;height:32px;margin-right:8px}.ajf-file-input input{position:absolute;top:-9999;left:-9999;opacity:0;z-index:-1}.ajf-file-input .ajf-screen-reader-only{display:none}.ajf-file-input .ajf-remove-file{position:absolute;top:16px;right:16px;padding:8px;cursor:pointer}.ajf-file-input .ajf-remove-file img{width:16px;height:16px;margin-right:0}\n"], directives: [{ type: i2.AjfDndDirective, selector: "[ajfDnd]", outputs: ["file"] }, { type: i3.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "transloco": i4.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFileInput, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-file-input', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, host: {
                        '[class.ajf-file-input]': 'true',
                    }, providers: [
                        {
                            provide: NG_VALUE_ACCESSOR,
                            useExisting: forwardRef(() => AjfFileInput),
                            multi: true,
                        },
                    ], template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"value == null; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>{{'Drop your file here or click to select'|transloco}}</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|transloco }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n", styles: [".ajf-file-input{display:flex;min-height:100px;align-items:stretch;position:relative;overflow:hidden}.ajf-file-input .ajf-drop-zone,.ajf-file-input .ajf-file-info,.ajf-file-input .ajf-drop-message{flex:1 1 auto;display:flex;align-items:center;justify-content:center}.ajf-file-input .ajf-drop-zone{background-color:#eee}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{background-color:#999}.ajf-file-input .ajf-drop-message{cursor:pointer;align-self:stretch}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center}.ajf-file-input .ajf-file-info-content img{width:32px;height:32px;margin-right:8px}.ajf-file-input input{position:absolute;top:-9999;left:-9999;opacity:0;z-index:-1}.ajf-file-input .ajf-screen-reader-only{display:none}.ajf-file-input .ajf-remove-file{position:absolute;top:16px;right:16px;padding:8px;cursor:pointer}.ajf-file-input .ajf-remove-file img{width:16px;height:16px;margin-right:0}\n"] }]
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2ZpbGUtaW5wdXQvZmlsZS1pbnB1dC50cyIsIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2ZpbGUtaW5wdXQvZmlsZS1pbnB1dC5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFDTCx1QkFBdUIsRUFDdkIsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxlQUFlLEVBQ2YsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osVUFBVSxFQUNWLEtBQUssRUFFTCxNQUFNLEVBQ04sU0FBUyxFQUNULFNBQVMsRUFDVCxnQkFBZ0IsRUFDaEIsaUJBQWlCLEdBQ2xCLE1BQU0sZUFBZSxDQUFDO0FBQ3ZCLE9BQU8sRUFBdUIsaUJBQWlCLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUN2RSxPQUFPLEVBQUMsWUFBWSxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBQyxVQUFVLEVBQUUsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxNQUFNLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQzs7Ozs7O0FBS3RDLE1BQU0sT0FBTyxjQUFjOzttSEFBZCxjQUFjO3VHQUFkLGNBQWM7bUdBQWQsY0FBYztrQkFEMUIsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxrQkFBa0IsRUFBQzs7QUFPekMsTUFBTSxPQUFPLGNBQWM7SUFRekIsWUFBWSxHQUFxQjtRQUZ6QixjQUFTLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUdyQyxNQUFNLEtBQUssR0FBRyxHQUFHLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUUsSUFBSSxDQUFDLENBQUM7UUFDekQsSUFBSSxLQUFLLEVBQUU7WUFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUss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Q0FBQyxDQUFDO0FBQzlCLENBQUM7QUFFRCxNQUFNLENBQUMsTUFBTSxRQUFRLEdBQ25CLHlFQUF5RTtJQUN6RSw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLGlCQUFpQixDQUFDO0FBRXBCLE1BQU0sU0FBUyxHQUNiLCtFQUErRTtJQUMvRSw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLGtFQUFrRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWxlfSBmcm9tICcuL2ZpbGUnO1xuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1thamZEcm9wTWVzc2FnZV0nfSlcbmV4cG9ydCBjbGFzcyBBamZEcm9wTWVzc2FnZSB7fVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYWpmRmlsZVByZXZpZXddJyxcbiAgZXhwb3J0QXM6ICdhamZGaWxlUHJldmlldycsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZpbGVQcmV2aWV3IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfdmFsdWU6IEFqZkZpbGU7XG4gIGdldCB2YWx1ZSgpOiBBamZGaWxlIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcih2Y3I6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBjb25zdCBpbnB1dCA9IHZjci5wYXJlbnRJbmplY3Rvci5nZXQoQWpmRmlsZUlucHV0LCBudWxsKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICB0aGlzLl92YWx1ZVN1YiA9IGlucHV0LnZhbHVlQ2hhbmdlLnBpcGUoZmlsdGVyKHZhbHVlID0+IHZhbHVlICE9IG51bGwpKS5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlIGFzIEFqZkZpbGU7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1maWxlLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtaW5wdXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbGUtaW5wdXQuY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hamYtZmlsZS1pbnB1dF0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmRmlsZUlucHV0KSxcbiAgICAgIG11bHRpOiB0cnVlLFxuICAgIH0sXG4gIF0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZpbGVJbnB1dCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZEcm9wTWVzc2FnZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIF9kcm9wTWVzc2FnZUNoaWxkcmVuOiBRdWVyeUxpc3Q8QWpmRHJvcE1lc3NhZ2U+O1xuICBAQ29udGVudENoaWxkcmVuKEFqZkZpbGVQcmV2aWV3LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSlcbiAgX2ZpbGVQcmV2aWV3Q2hpbGRyZW46IFF1ZXJ5TGlzdDxBamZGaWxlUHJldmlldz47XG4gIEBWaWV3Q2hpbGQoJ25hdGl2ZUlucHV0JykgX25hdGl2ZUlucHV0OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIHJlYWRvbmx5IGZpbGVJY29uOiBTYWZlUmVzb3VyY2VVcmw7XG4gIHJlYWRvbmx5IHJlbW92ZUljb246IFNhZmVSZXNvdXJjZVVybDtcblxuICBASW5wdXQoKSBhY2NlcHQ6IHN0cmluZztcblxuICBwcml2YXRlIF92YWx1ZTogYW55O1xuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGVMaXN0KSB7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKHZhbHVlWzBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgdmFsdWUgPT0gbnVsbCB8fFxuICAgICAgKGlzQWpmRmlsZSh2YWx1ZSkgJiYgaXNWYWxpZE1pbWVUeXBlKCh2YWx1ZSBhcyBBamZGaWxlKS50eXBlLCB0aGlzLmFjY2VwdCkpXG4gICAgKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZSk7XG4gICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGaWxlIHwgdW5kZWZpbmVkPigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IE9ic2VydmFibGU8QWpmRmlsZSB8IHVuZGVmaW5lZD4gPSB0aGlzLl92YWx1ZUNoYW5nZSBhcyBPYnNlcnZhYmxlPFxuICAgIEFqZkZpbGUgfCB1bmRlZmluZWRcbiAgPjtcblxuICAvKiogVGhlIG1ldGhvZCB0byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gdXBkYXRlIG5nTW9kZWwuICovXG4gIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBvblRvdWNoIGZ1bmN0aW9uIHJlZ2lzdGVyZWQgdmlhIHJlZ2lzdGVyT25Ub3VjaCAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBfb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplciwgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuZmlsZUljb24gPSBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKGZpbGVJY29uKTtcbiAgICB0aGlzLnJlbW92ZUljb24gPSBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHRyYXNoSWNvbik7XG4gIH1cblxuICBvbkZpbGVEcm9wKGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlsZSA9IGZpbGVzWzBdO1xuICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGUpO1xuICB9XG5cbiAgb25TZWxlY3RGaWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5fbmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC5maWxlcztcbiAgICBpZiAoZmlsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmaWxlID0gZmlsZXMuaXRlbSgwKTtcbiAgICBpZiAoZmlsZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGVzLml0ZW0oMCkgYXMgRmlsZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICByZXNldFZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHRyaWdnZXJOYXRpdmVJbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX25hdGl2ZUlucHV0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX25hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9wcm9jZXNzRmlsZVVwbG9hZChmaWxlOiBGaWxlKTogdm9pZCB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBjb25zdCB7bmFtZSwgc2l6ZSwgdHlwZX0gPSBmaWxlO1xuICAgIGlmICghaXNWYWxpZE1pbWVUeXBlKHR5cGUsIHRoaXMuYWNjZXB0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZWFkZXIub25sb2FkID0gKGU6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSByZWFkZXIucmVzdWx0O1xuICAgICAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnZhbHVlID0ge25hbWUsIHNpemUsIHR5cGUsIGNvbnRlbnR9O1xuICAgICAgaWYgKHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKHRoaXMudmFsdWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gIH1cbn1cblxuY29uc3QgYWpmRmlsZUtleXMgPSBKU09OLnN0cmluZ2lmeShbJ2NvbnRlbnQnLCAnbmFtZScsICdzaXplJywgJ3R5cGUnXSk7XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIEFqZkZpbGUgaW50ZXJmYWNlLlxuICovXG5mdW5jdGlvbiBpc0FqZkZpbGUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpLnNvcnQoKGEsIGIpID0+IGEubG9jYWxlQ29tcGFyZShiKSk7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShrZXlzKSA9PT0gYWpmRmlsZUtleXM7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRNaW1lVHlwZShtaW1lVHlwZTogc3RyaW5nLCBhY2NlcHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoYWNjZXB0ID09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBsZXQgdGVybWluYXRlID0gdHJ1ZTtcbiAgaWYgKGFjY2VwdC5lbmRzV2l0aCgnKicpKSB7XG4gICAgYWNjZXB0ID0gYWNjZXB0LnNsaWNlKDAsIGFjY2VwdC5sZW5ndGggLSAxKTtcbiAgICB0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgfVxuICBjb25zdCByZWdFeFN0ciA9ICdeJyArIGFjY2VwdCArICh0ZXJtaW5hdGUgPyAnJCcgOiAnJyk7XG4gIGNvbnN0IHJlZ0V4ID0gbmV3IFJlZ0V4cChyZWdFeFN0cik7XG4gIHJldHVybiByZWdFeC50ZXN0KG1pbWVUeXBlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGZpbGVJY29uID1cbiAgJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNJyArXG4gICdDOXpkbWNpSUhkcFpIUm9QU0l4TnpBMkxqWTJOeUlnYUdWcFoyaDBQU0l4TnpBMkxqWTJOeUlnZG1sbGQwSnZlRDBpTUNBd0lERXlPREFnTVRJNE1DSWdjSEpsJyArXG4gICdjMlZ5ZG1WQmMzQmxZM1JTWVhScGJ6MGllRTFwWkZsTmFXUWdiV1ZsZENJK1BIQmhkR2dnWkQwaVRUSTRNeUF4TUROakxURTNMamNnTWk0MExUTXpMamtnTVRNJyArXG4gICd1T0MwME1pNHlJREk1TGpZdE55NDBJREUwTFRZdU9DMHpNaTQxTFRZdU9DQTBPVGN1TkhNdExqWWdORGd6TGpRZ05pNDRJRFE1Tnk0MFl6WXVPQ0F4TXk0eElEJyArXG4gICdFNExqWWdNakl1TnlBek15NDNJREkzTGpoc055QXlMak5vTnpFM2JEY3RNaTR6WXpFMUxqRXROUzR4SURJMkxqa3RNVFF1TnlBek15NDNMVEkzTGpnZ055NDBMJyArXG4gICdURTBJRFl1T0NBeE9TNHlJRFl1T0Mwek56WXVObFl6T1RRdU1Xd3RNVEV4TGpJdExqTXRNVEV4TGpNdExqUXRPQzQxTFRJdU0yTXRNak11T0MwMkxqVXRORE10JyArXG4gICdNakV1TXkwMU1pNDBMVFF3TGpVdE55NDFMVEUxTGpNdE55MDJMVGN1TXkweE16TXVPV3d0TGpRdE1URTBMamN0TWpNekxqSXVNUzB5TXpndU55NDVlbTAxTVRJJyArXG4gICdnTVRBNUxqaGpNQ0F4TWpBdU5TMHVNeUF4TVRRdU9TQTJJREV5TkM0MElETXVOaUExTGpVZ01URXVOaUF4TVM0eUlERTVMamNnTVRRdU1TQTFMamdnTWk0eUlEJyArXG4gICdZdU5DQXlMaklnTVRFMUxqZ2dNaTQxYkRFeE1DQXVNeTB4TWpVdE1USTFMalF0TVRJMUxqY3RNVEkxTGpWakxTNDFMUzR4TFM0NElEUTVMakl0TGpnZ01UQTVMJyArXG4gICdqWjZJaTgrUEM5emRtYysnO1xuXG5jb25zdCB0cmFzaEljb24gPVxuICAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWMnICtcbiAgJ2lJSFpwWlhkQ2IzZzlJakFnTFRJMU5pQXhOemt5SURFM09USWlJSGRwWkhSb1BTSXhNREFsSWlCb1pXbG5hSFE5SWpFd01DVWlQanh3WVhSb0lHUTlJazAzTUQnICtcbiAgJ2t1TkRJMElEUTFOUzR3TlhZMU56WnhNQ0F4TkMwNUlESXpMVGtnT1MweU15QTVhQzAyTkhFdE1UUWdNQzB5TXkwNUxUa3RPUzA1TFRJemRpMDFOelp4TUMweE4nICtcbiAgJ0NBNUxUSXpJRGt0T1NBeU15MDVhRFkwY1RFMElEQWdNak1nT1NBNUlEa2dPU0F5TTNwdE1qVTJJREIyTlRjMmNUQWdNVFF0T1NBeU15MDVJRGt0TWpNZ09XZ3QnICtcbiAgJ05qUnhMVEUwSURBdE1qTXRPUzA1TFRrdE9TMHlNM1l0TlRjMmNUQXRNVFFnT1MweU15QTVMVGtnTWpNdE9XZzJOSEV4TkNBd0lESXpJRGtnT1NBNUlEa2dNak4nICtcbiAgJzZiVEkxTmlBd2RqVTNObkV3SURFMExUa2dNak10T1NBNUxUSXpJRGxvTFRZMGNTMHhOQ0F3TFRJekxUa3RPUzA1TFRrdE1qTjJMVFUzTm5Fd0xURTBJRGt0TWonICtcbiAgJ01nT1MwNUlESXpMVGxvTmpSeE1UUWdNQ0F5TXlBNUlEa2dPU0E1SURJemVtMHhNamdnTnpJMGRpMDVORGhvTFRnNU5uWTVORGh4TUNBeU1pQTNJRFF3TGpVZ04nICtcbiAgJ3lBeE9DNDFJREUwTGpVZ01qY2dOeTQxSURndU5TQXhNQzQxSURndU5XZzRNekp4TXlBd0lERXdMalV0T0M0MUlEY3VOUzA0TGpVZ01UUXVOUzB5TnlBM0xURTQnICtcbiAgJ0xqVWdOeTAwTUM0MWVtMHROamN5TFRFd056Wm9ORFE0YkMwME9DMHhNVGR4TFRjdE9TMHhOeTB4TVdndE16RTNjUzB4TUNBeUxURTNJREV4ZW0wNU1qZ2dNekonICtcbiAgJzJOalJ4TUNBeE5DMDVJREl6TFRrZ09TMHlNeUE1YUMwNU5uWTVORGh4TUNBNE15MDBOeUF4TkRNdU5TMDBOeUEyTUM0MUxURXhNeUEyTUM0MWFDMDRNekp4TFQnICtcbiAgJ1kySURBdE1URXpMVFU0TGpVdE5EY3ROVGd1TlMwME55MHhOREV1TlhZdE9UVXlhQzA1Tm5FdE1UUWdNQzB5TXkwNUxUa3RPUzA1TFRJemRpMDJOSEV3TFRFMEknICtcbiAgJ0RrdE1qTWdPUzA1SURJekxUbG9NekE1YkRjd0xURTJOM0V4TlMwek55QTFOQzAyTXlBek9TMHlOaUEzT1MweU5tZ3pNakJ4TkRBZ01DQTNPU0F5TmlBek9TQXknICtcbiAgJ05pQTFOQ0EyTTJ3M01DQXhOamRvTXpBNWNURTBJREFnTWpNZ09TQTVJRGtnT1NBeU0zb2lMejQ4TDNOMlp6ND0nO1xuIiwiPGRpdiBhamZEbmQgKGZpbGUpPVwib25GaWxlRHJvcCgkZXZlbnQpXCIgY2xhc3M9XCJhamYtZHJvcC16b25lXCI+XG4gIDxkaXYgKm5nSWY9XCJ2YWx1ZSA9PSBudWxsOyBlbHNlIGZpbGVJbmZvXCIgY2xhc3M9XCJhamYtZHJvcC1tZXNzYWdlXCIgKGNsaWNrKT1cInRyaWdnZXJOYXRpdmVJbnB1dCgpXCI+XG4gICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIl9kcm9wTWVzc2FnZUNoaWxkcmVuPy5sZW5ndGg7IGVsc2UgZGVmYXVsdERyb3BNZXNzYWdlXCI+XG4gICAgICA8bmctY29udGVudCBzZWxlY3Q9XCJbYWpmRHJvcE1lc3NhZ2VdXCI+PC9uZy1jb250ZW50PlxuICAgIDwvbmctY29udGFpbmVyPlxuICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdERyb3BNZXNzYWdlPnt7J0Ryb3AgeW91ciBmaWxlIGhlcmUgb3IgY2xpY2sgdG8gc2VsZWN0J3x0cmFuc2xvY299fTwvbmctdGVtcGxhdGU+XG4gIDwvZGl2PlxuICA8bmctdGVtcGxhdGUgI2ZpbGVJbmZvPlxuICAgIDxidXR0b24gKGNsaWNrKT1cInJlc2V0VmFsdWUoKVwiIGNsYXNzPVwiYWpmLXJlbW92ZS1maWxlXCI+XG4gICAgICA8aW1nIFtzcmNdPVwicmVtb3ZlSWNvblwiIGFsdD1cIlwiPlxuICAgICAgPGRpdiBjbGFzcz1cImFqZi1zY3JlZW4tcmVhZGVyLW9ubHlcIj57eyAnRGVsZXRlJ3x0cmFuc2xvY28gfX08L2Rpdj5cbiAgICA8L2J1dHRvbj5cbiAgICA8ZGl2IGNsYXNzPVwiYWpmLWZpbGUtaW5mb1wiPlxuICAgICAgPG5nLWNvbnRhaW5lciAqbmdJZj1cIl9maWxlUHJldmlld0NoaWxkcmVuPy5sZW5ndGg7IGVsc2UgZGVmYXVsdEZpbGVQcmV2aWV3XCI+XG4gICAgICAgIDxuZy1jb250ZW50IHNlbGVjdD1cIlthamZGaWxlUHJldmlld11cIj48L25nLWNvbnRlbnQ+XG4gICAgICA8L25nLWNvbnRhaW5lcj5cbiAgICAgIDxuZy10ZW1wbGF0ZSAjZGVmYXVsdEZpbGVQcmV2aWV3PlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYWpmLWZpbGUtaW5mby1jb250ZW50XCI+XG4gICAgICAgICAgPGltZyBbc3JjXT1cImZpbGVJY29uXCIgYWx0PVwiXCI+XG4gICAgICAgICAgPGRpdj57eyB2YWx1ZS5uYW1lIH19PC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9uZy10ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgPC9uZy10ZW1wbGF0ZT5cbjwvZGl2PlxuPGlucHV0ICNuYXRpdmVJbnB1dCBbYWNjZXB0XT1cImFjY2VwdFwiIG5hbWU9XCJcIiBhcmlhLWxhYmVsPVwiZmlsZSBpbnB1dFwiIHR5cGU9XCJmaWxlXCIgKGNoYW5nZSk9XCJvblNlbGVjdEZpbGUoKVwiPlxuIl19