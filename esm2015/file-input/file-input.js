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
export class AjfDropMessage {
}
AjfDropMessage.decorators = [
    { type: Directive, args: [{ selector: '[ajfDropMessage]' },] }
];
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
AjfFilePreview.decorators = [
    { type: Directive, args: [{
                selector: '[ajfFilePreview]',
                exportAs: 'ajfFilePreview',
            },] }
];
AjfFilePreview.ctorParameters = () => [
    { type: ViewContainerRef }
];
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
AjfFileInput.decorators = [
    { type: Component, args: [{
                selector: 'ajf-file-input',
                template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"value == null; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>{{'Drop your file here or click to select'|transloco}}</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|transloco }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n",
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
                host: {
                    '[class.ajf-file-input]': 'true',
                },
                providers: [{
                        provide: NG_VALUE_ACCESSOR,
                        useExisting: forwardRef(() => AjfFileInput),
                        multi: true,
                    }],
                styles: [".ajf-file-input{display:flex;min-height:100px;align-items:stretch;position:relative;overflow:hidden}.ajf-file-input .ajf-drop-zone,.ajf-file-input .ajf-file-info,.ajf-file-input .ajf-drop-message{flex:1 1 auto;display:flex;align-items:center;justify-content:center}.ajf-file-input .ajf-drop-zone{background-color:#eee}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{background-color:#999}.ajf-file-input .ajf-drop-message{cursor:pointer;align-self:stretch}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center}.ajf-file-input .ajf-file-info-content img{width:32px;height:32px;margin-right:8px}.ajf-file-input input{position:absolute;top:-9999;left:-9999;opacity:0;z-index:-1}.ajf-file-input .ajf-screen-reader-only{display:none}.ajf-file-input .ajf-remove-file{position:absolute;top:16px;right:16px;padding:8px;cursor:pointer}.ajf-file-input .ajf-remove-file img{width:16px;height:16px;margin-right:0}\n"]
            },] }
];
AjfFileInput.ctorParameters = () => [
    { type: DomSanitizer },
    { type: ChangeDetectorRef }
];
AjfFileInput.propDecorators = {
    _dropMessageChildren: [{ type: ContentChildren, args: [AjfDropMessage, { descendants: false },] }],
    _filePreviewChildren: [{ type: ContentChildren, args: [AjfFilePreview, { descendants: false },] }],
    _nativeInput: [{ type: ViewChild, args: ['nativeInput',] }],
    accept: [{ type: Input }],
    value: [{ type: Input }],
    valueChange: [{ type: Output }]
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2ZpbGUtaW5wdXQvZmlsZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLFlBQVksRUFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFLdEMsTUFBTSxPQUFPLGNBQWM7OztZQUQxQixTQUFTLFNBQUMsRUFBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUM7O0FBUXpDLE1BQU0sT0FBTyxjQUFjO0lBUXpCLFlBQVksR0FBcUI7UUFGekIsY0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7UUFHckMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1FBQ3pELElBQUksS0FBSyxFQUFFO1lBQ1QsSUFBSSxDQUFDLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDO1lBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVc7aUJBQ1osSUFBSSxDQUNELE1BQU0sQ0FBQyxLQUFLLENBQUMsRUFB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QUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0Ysa0VBQWtFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpbGV9IGZyb20gJy4vZmlsZSc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2FqZkRyb3BNZXNzYWdlXSd9KVxuZXhwb3J0IGNsYXNzIEFqZkRyb3BNZXNzYWdlIHtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FqZkZpbGVQcmV2aWV3XScsXG4gIGV4cG9ydEFzOiAnYWpmRmlsZVByZXZpZXcnLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGaWxlUHJldmlldyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3ZhbHVlOiBBamZGaWxlO1xuICBnZXQgdmFsdWUoKTogQWpmRmlsZSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IodmNyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgY29uc3QgaW5wdXQgPSB2Y3IucGFyZW50SW5qZWN0b3IuZ2V0KEFqZkZpbGVJbnB1dCwgbnVsbCk7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWVTdWIgPSBpbnB1dC52YWx1ZUNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICE9IG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlIGFzIEFqZkZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1maWxlLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtaW5wdXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbGUtaW5wdXQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYWpmLWZpbGUtaW5wdXRdJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmRmlsZUlucHV0KSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgfV0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZpbGVJbnB1dCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZEcm9wTWVzc2FnZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIF9kcm9wTWVzc2FnZUNoaWxkcmVuOiBRdWVyeUxpc3Q8QWpmRHJvcE1lc3NhZ2U+O1xuICBAQ29udGVudENoaWxkcmVuKEFqZkZpbGVQcmV2aWV3LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSlcbiAgX2ZpbGVQcmV2aWV3Q2hpbGRyZW46IFF1ZXJ5TGlzdDxBamZGaWxlUHJldmlldz47XG4gIEBWaWV3Q2hpbGQoJ25hdGl2ZUlucHV0JykgX25hdGl2ZUlucHV0OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIHJlYWRvbmx5IGZpbGVJY29uOiBTYWZlUmVzb3VyY2VVcmw7XG4gIHJlYWRvbmx5IHJlbW92ZUljb246IFNhZmVSZXNvdXJjZVVybDtcblxuICBASW5wdXQoKSBhY2NlcHQ6IHN0cmluZztcblxuICBwcml2YXRlIF92YWx1ZTogYW55O1xuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGVMaXN0KSB7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKHZhbHVlWzBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICB2YWx1ZSA9PSBudWxsIHx8XG4gICAgICAgIChpc0FqZkZpbGUodmFsdWUpICYmIGlzVmFsaWRNaW1lVHlwZSgodmFsdWUgYXMgQWpmRmlsZSkudHlwZSwgdGhpcy5hY2NlcHQpKSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWUpO1xuICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRmlsZXx1bmRlZmluZWQ+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSB2YWx1ZUNoYW5nZTogT2JzZXJ2YWJsZTxBamZGaWxlfHVuZGVmaW5lZD4gPVxuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2UgYXMgT2JzZXJ2YWJsZTxBamZGaWxlfHVuZGVmaW5lZD47XG5cbiAgLyoqIFRoZSBtZXRob2QgdG8gYmUgY2FsbGVkIGluIG9yZGVyIHRvIHVwZGF0ZSBuZ01vZGVsLiAqL1xuICBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogb25Ub3VjaCBmdW5jdGlvbiByZWdpc3RlcmVkIHZpYSByZWdpc3Rlck9uVG91Y2ggKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgX29uVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmZpbGVJY29uID0gZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChmaWxlSWNvbik7XG4gICAgdGhpcy5yZW1vdmVJY29uID0gZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh0cmFzaEljb24pO1xuICB9XG5cbiAgb25GaWxlRHJvcChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZpbGUgPSBmaWxlc1swXTtcbiAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZChmaWxlKTtcbiAgfVxuXG4gIG9uU2VsZWN0RmlsZSgpOiB2b2lkIHtcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMuX25hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZmlsZXM7XG4gICAgaWYgKGZpbGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlsZSA9IGZpbGVzLml0ZW0oMCk7XG4gICAgaWYgKGZpbGUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZChmaWxlcy5pdGVtKDApIGFzIEZpbGUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgcmVzZXRWYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICB0aGlzLl9uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gIH1cblxuICB0cmlnZ2VyTmF0aXZlSW5wdXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9uYXRpdmVJbnB1dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvY2Vzc0ZpbGVVcGxvYWQoZmlsZTogRmlsZSk6IHZvaWQge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgY29uc3Qge25hbWUsIHNpemUsIHR5cGV9ID0gZmlsZTtcbiAgICBpZiAoIWlzVmFsaWRNaW1lVHlwZSh0eXBlLCB0aGlzLmFjY2VwdCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVhZGVyLm9ubG9hZCA9IChlOiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgIGlmICh0eXBlb2YgY29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZSA9IHtuYW1lLCBzaXplLCB0eXBlLCBjb250ZW50fTtcbiAgICAgIGlmICh0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbih0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICB9XG59XG5cbmNvbnN0IGFqZkZpbGVLZXlzID0gSlNPTi5zdHJpbmdpZnkoWydjb250ZW50JywgJ25hbWUnLCAnc2l6ZScsICd0eXBlJ10pO1xuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBBamZGaWxlIGludGVyZmFjZS5cbiAqL1xuZnVuY3Rpb24gaXNBamZGaWxlKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKS5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpO1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoa2V5cykgPT09IGFqZkZpbGVLZXlzO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkTWltZVR5cGUobWltZVR5cGU6IHN0cmluZywgYWNjZXB0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKGFjY2VwdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgbGV0IHRlcm1pbmF0ZSA9IHRydWU7XG4gIGlmIChhY2NlcHQuZW5kc1dpdGgoJyonKSkge1xuICAgIGFjY2VwdCA9IGFjY2VwdC5zbGljZSgwLCBhY2NlcHQubGVuZ3RoIC0gMSk7XG4gICAgdGVybWluYXRlID0gZmFsc2U7XG4gIH1cbiAgY29uc3QgcmVnRXhTdHIgPSAnXicgKyBhY2NlcHQgKyAodGVybWluYXRlID8gJyQnIDogJycpO1xuICBjb25zdCByZWdFeCA9IG5ldyBSZWdFeHAocmVnRXhTdHIpO1xuICByZXR1cm4gcmVnRXgudGVzdChtaW1lVHlwZSk7XG59XG5cbmV4cG9ydCBjb25zdCBmaWxlSWNvbiA9ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TScgK1xuICAgICdDOXpkbWNpSUhkcFpIUm9QU0l4TnpBMkxqWTJOeUlnYUdWcFoyaDBQU0l4TnpBMkxqWTJOeUlnZG1sbGQwSnZlRDBpTUNBd0lERXlPREFnTVRJNE1DSWdjSEpsJyArXG4gICAgJ2MyVnlkbVZCYzNCbFkzUlNZWFJwYnowaWVFMXBaRmxOYVdRZ2JXVmxkQ0krUEhCaGRHZ2daRDBpVFRJNE15QXhNRE5qTFRFM0xqY2dNaTQwTFRNekxqa2dNVE0nICtcbiAgICAndU9DMDBNaTR5SURJNUxqWXROeTQwSURFMExUWXVPQzB6TWk0MUxUWXVPQ0EwT1RjdU5ITXRMallnTkRnekxqUWdOaTQ0SURRNU55NDBZell1T0NBeE15NHhJRCcgK1xuICAgICdFNExqWWdNakl1TnlBek15NDNJREkzTGpoc055QXlMak5vTnpFM2JEY3RNaTR6WXpFMUxqRXROUzR4SURJMkxqa3RNVFF1TnlBek15NDNMVEkzTGpnZ055NDBMJyArXG4gICAgJ1RFMElEWXVPQ0F4T1M0eUlEWXVPQzB6TnpZdU5sWXpPVFF1TVd3dE1URXhMakl0TGpNdE1URXhMak10TGpRdE9DNDFMVEl1TTJNdE1qTXVPQzAyTGpVdE5ETXQnICtcbiAgICAnTWpFdU15MDFNaTQwTFRRd0xqVXROeTQxTFRFMUxqTXROeTAyTFRjdU15MHhNek11T1d3dExqUXRNVEUwTGpjdE1qTXpMakl1TVMweU16Z3VOeTQ1ZW0wMU1USScgK1xuICAgICdnTVRBNUxqaGpNQ0F4TWpBdU5TMHVNeUF4TVRRdU9TQTJJREV5TkM0MElETXVOaUExTGpVZ01URXVOaUF4TVM0eUlERTVMamNnTVRRdU1TQTFMamdnTWk0eUlEJyArXG4gICAgJ1l1TkNBeUxqSWdNVEUxTGpnZ01pNDFiREV4TUNBdU15MHhNalV0TVRJMUxqUXRNVEkxTGpjdE1USTFMalZqTFM0MUxTNHhMUzQ0SURRNUxqSXRMamdnTVRBNUwnICtcbiAgICAnalo2SWk4K1BDOXpkbWMrJztcblxuY29uc3QgdHJhc2hJY29uID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jJyArXG4gICAgJ2lJSFpwWlhkQ2IzZzlJakFnTFRJMU5pQXhOemt5SURFM09USWlJSGRwWkhSb1BTSXhNREFsSWlCb1pXbG5hSFE5SWpFd01DVWlQanh3WVhSb0lHUTlJazAzTUQnICtcbiAgICAna3VOREkwSURRMU5TNHdOWFkxTnpaeE1DQXhOQzA1SURJekxUa2dPUzB5TXlBNWFDMDJOSEV0TVRRZ01DMHlNeTA1TFRrdE9TMDVMVEl6ZGkwMU56WnhNQzB4TicgK1xuICAgICdDQTVMVEl6SURrdE9TQXlNeTA1YURZMGNURTBJREFnTWpNZ09TQTVJRGtnT1NBeU0zcHRNalUySURCMk5UYzJjVEFnTVRRdE9TQXlNeTA1SURrdE1qTWdPV2d0JyArXG4gICAgJ05qUnhMVEUwSURBdE1qTXRPUzA1TFRrdE9TMHlNM1l0TlRjMmNUQXRNVFFnT1MweU15QTVMVGtnTWpNdE9XZzJOSEV4TkNBd0lESXpJRGtnT1NBNUlEa2dNak4nICtcbiAgICAnNmJUSTFOaUF3ZGpVM05uRXdJREUwTFRrZ01qTXRPU0E1TFRJeklEbG9MVFkwY1MweE5DQXdMVEl6TFRrdE9TMDVMVGt0TWpOMkxUVTNObkV3TFRFMElEa3RNaicgK1xuICAgICdNZ09TMDVJREl6TFRsb05qUnhNVFFnTUNBeU15QTVJRGtnT1NBNUlESXplbTB4TWpnZ056STBkaTA1TkRob0xUZzVOblk1TkRoeE1DQXlNaUEzSURRd0xqVWdOJyArXG4gICAgJ3lBeE9DNDFJREUwTGpVZ01qY2dOeTQxSURndU5TQXhNQzQxSURndU5XZzRNekp4TXlBd0lERXdMalV0T0M0MUlEY3VOUzA0TGpVZ01UUXVOUzB5TnlBM0xURTQnICtcbiAgICAnTGpVZ055MDBNQzQxZW0wdE5qY3lMVEV3Tnpab05EUTRiQzAwT0MweE1UZHhMVGN0T1MweE55MHhNV2d0TXpFM2NTMHhNQ0F5TFRFM0lERXhlbTA1TWpnZ016SicgK1xuICAgICcyTmpSeE1DQXhOQzA1SURJekxUa2dPUzB5TXlBNWFDMDVOblk1TkRoeE1DQTRNeTAwTnlBeE5ETXVOUzAwTnlBMk1DNDFMVEV4TXlBMk1DNDFhQzA0TXpKeExUJyArXG4gICAgJ1kySURBdE1URXpMVFU0TGpVdE5EY3ROVGd1TlMwME55MHhOREV1TlhZdE9UVXlhQzA1Tm5FdE1UUWdNQzB5TXkwNUxUa3RPUzA1TFRJemRpMDJOSEV3TFRFMEknICtcbiAgICAnRGt0TWpNZ09TMDVJREl6TFRsb016QTViRGN3TFRFMk4zRXhOUzB6TnlBMU5DMDJNeUF6T1MweU5pQTNPUzB5Tm1nek1qQnhOREFnTUNBM09TQXlOaUF6T1NBeScgK1xuICAgICdOaUExTkNBMk0ydzNNQ0F4Tmpkb016QTVjVEUwSURBZ01qTWdPU0E1SURrZ09TQXlNM29pTHo0OEwzTjJaejQ9JztcbiJdfQ==