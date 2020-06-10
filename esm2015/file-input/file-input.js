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
let AjfDropMessage = /** @class */ (() => {
    class AjfDropMessage {
    }
    AjfDropMessage.decorators = [
        { type: Directive, args: [{ selector: '[ajfDropMessage]' },] }
    ];
    return AjfDropMessage;
})();
export { AjfDropMessage };
let AjfFilePreview = /** @class */ (() => {
    class AjfFilePreview {
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
    /** @nocollapse */
    AjfFilePreview.ctorParameters = () => [
        { type: ViewContainerRef }
    ];
    return AjfFilePreview;
})();
export { AjfFilePreview };
let AjfFileInput = /** @class */ (() => {
    class AjfFileInput {
        constructor(domSanitizer, _cdr) {
            this._cdr = _cdr;
            this._valueChange = new EventEmitter();
            this.valueChange = this._valueChange.asObservable();
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
                    template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"value == null; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>Drop your file here or click to select</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|translate }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n",
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
                }] }
    ];
    /** @nocollapse */
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
    return AjfFileInput;
})();
export { AjfFileInput };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2ZpbGUtaW5wdXQvZmlsZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLFlBQVksRUFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJdEM7SUFBQSxNQUNhLGNBQWM7OztnQkFEMUIsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFDOztJQUV6QyxxQkFBQztLQUFBO1NBRFksY0FBYztBQUczQjtJQUFBLE1BSWEsY0FBYztRQVF6QixZQUFZLEdBQXFCO1lBRnpCLGNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBR3JDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6RCxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVc7cUJBQ1osSUFB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NkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsaUJBQWlCLENBQUM7QUFFdEIsTUFBTSxTQUFTLEdBQUcsK0VBQStFO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0Ysa0VBQWtFLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIENoYW5nZURldGVjdGlvblN0cmF0ZWd5LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgQ29tcG9uZW50LFxuICBDb250ZW50Q2hpbGRyZW4sXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBmb3J3YXJkUmVmLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q29udGFpbmVyUmVmLFxuICBWaWV3RW5jYXBzdWxhdGlvbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0NvbnRyb2xWYWx1ZUFjY2Vzc29yLCBOR19WQUxVRV9BQ0NFU1NPUn0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2ZpbHRlcn0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZpbGV9IGZyb20gJy4vZmlsZSc7XG5cbkBEaXJlY3RpdmUoe3NlbGVjdG9yOiAnW2FqZkRyb3BNZXNzYWdlXSd9KVxuZXhwb3J0IGNsYXNzIEFqZkRyb3BNZXNzYWdlIHtcbn1cblxuQERpcmVjdGl2ZSh7XG4gIHNlbGVjdG9yOiAnW2FqZkZpbGVQcmV2aWV3XScsXG4gIGV4cG9ydEFzOiAnYWpmRmlsZVByZXZpZXcnLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGaWxlUHJldmlldyBpbXBsZW1lbnRzIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgX3ZhbHVlOiBBamZGaWxlO1xuICBnZXQgdmFsdWUoKTogQWpmRmlsZSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWVTdWIgPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgY29uc3RydWN0b3IodmNyOiBWaWV3Q29udGFpbmVyUmVmKSB7XG4gICAgY29uc3QgaW5wdXQgPSB2Y3IucGFyZW50SW5qZWN0b3IuZ2V0KEFqZkZpbGVJbnB1dCwgbnVsbCk7XG4gICAgaWYgKGlucHV0KSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IGlucHV0LnZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWVTdWIgPSBpbnB1dC52YWx1ZUNoYW5nZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICE9IG51bGwpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUodmFsdWUgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlIGFzIEFqZkZpbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl92YWx1ZVN1Yi51bnN1YnNjcmliZSgpO1xuICB9XG59XG5cbkBDb21wb25lbnQoe1xuICBzZWxlY3RvcjogJ2FqZi1maWxlLWlucHV0JyxcbiAgdGVtcGxhdGVVcmw6ICcuL2ZpbGUtaW5wdXQuaHRtbCcsXG4gIHN0eWxlVXJsczogWycuL2ZpbGUtaW5wdXQuc2NzcyddLFxuICBjaGFuZ2VEZXRlY3Rpb246IENoYW5nZURldGVjdGlvblN0cmF0ZWd5Lk9uUHVzaCxcbiAgZW5jYXBzdWxhdGlvbjogVmlld0VuY2Fwc3VsYXRpb24uTm9uZSxcbiAgaG9zdDoge1xuICAgICdbY2xhc3MuYWpmLWZpbGUtaW5wdXRdJzogJ3RydWUnLFxuICB9LFxuICBwcm92aWRlcnM6IFt7XG4gICAgcHJvdmlkZTogTkdfVkFMVUVfQUNDRVNTT1IsXG4gICAgdXNlRXhpc3Rpbmc6IGZvcndhcmRSZWYoKCkgPT4gQWpmRmlsZUlucHV0KSxcbiAgICBtdWx0aTogdHJ1ZSxcbiAgfV0sXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZpbGVJbnB1dCBpbXBsZW1lbnRzIENvbnRyb2xWYWx1ZUFjY2Vzc29yIHtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZEcm9wTWVzc2FnZSwge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIF9kcm9wTWVzc2FnZUNoaWxkcmVuOiBRdWVyeUxpc3Q8QWpmRHJvcE1lc3NhZ2U+O1xuICBAQ29udGVudENoaWxkcmVuKEFqZkZpbGVQcmV2aWV3LCB7ZGVzY2VuZGFudHM6IGZhbHNlfSlcbiAgX2ZpbGVQcmV2aWV3Q2hpbGRyZW46IFF1ZXJ5TGlzdDxBamZGaWxlUHJldmlldz47XG4gIEBWaWV3Q2hpbGQoJ25hdGl2ZUlucHV0JykgX25hdGl2ZUlucHV0OiBFbGVtZW50UmVmPEhUTUxJbnB1dEVsZW1lbnQ+O1xuXG4gIHJlYWRvbmx5IGZpbGVJY29uOiBTYWZlUmVzb3VyY2VVcmw7XG4gIHJlYWRvbmx5IHJlbW92ZUljb246IFNhZmVSZXNvdXJjZVVybDtcblxuICBASW5wdXQoKSBhY2NlcHQ6IHN0cmluZztcblxuICBwcml2YXRlIF92YWx1ZTogYW55O1xuICBnZXQgdmFsdWUoKTogYW55IHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlKSB7XG4gICAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZCh2YWx1ZSk7XG4gICAgfSBlbHNlIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGVMaXN0KSB7XG4gICAgICBpZiAodmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKHZhbHVlWzBdKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKFxuICAgICAgICB2YWx1ZSA9PSBudWxsIHx8XG4gICAgICAgIChpc0FqZkZpbGUodmFsdWUpICYmIGlzVmFsaWRNaW1lVHlwZSgodmFsdWUgYXMgQWpmRmlsZSkudHlwZSwgdGhpcy5hY2NlcHQpKSkge1xuICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZTtcbiAgICAgIHRoaXMuX3ZhbHVlQ2hhbmdlLmVtaXQodGhpcy5fdmFsdWUpO1xuICAgICAgdGhpcy5fY2RyLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZUNoYW5nZSA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRmlsZXx1bmRlZmluZWQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSB2YWx1ZUNoYW5nZTogT2JzZXJ2YWJsZTxBamZGaWxlfHVuZGVmaW5lZD4gPSB0aGlzLl92YWx1ZUNoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICAvKiogVGhlIG1ldGhvZCB0byBiZSBjYWxsZWQgaW4gb3JkZXIgdG8gdXBkYXRlIG5nTW9kZWwuICovXG4gIF9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuOiAodmFsdWU6IGFueSkgPT4gdm9pZCA9ICgpID0+IHt9O1xuXG4gIC8qKiBvblRvdWNoIGZ1bmN0aW9uIHJlZ2lzdGVyZWQgdmlhIHJlZ2lzdGVyT25Ub3VjaCAoQ29udHJvbFZhbHVlQWNjZXNzb3IpLiAqL1xuICBfb25Ub3VjaGVkOiAoKSA9PiBhbnkgPSAoKSA9PiB7fTtcblxuICBjb25zdHJ1Y3Rvcihkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplciwgcHJpdmF0ZSBfY2RyOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuZmlsZUljb24gPSBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKGZpbGVJY29uKTtcbiAgICB0aGlzLnJlbW92ZUljb24gPSBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHRyYXNoSWNvbik7XG4gIH1cblxuICBvbkZpbGVEcm9wKGZpbGVzOiBGaWxlTGlzdCk6IHZvaWQge1xuICAgIGlmIChmaWxlcy5sZW5ndGggIT09IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlsZSA9IGZpbGVzWzBdO1xuICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGUpO1xuICB9XG5cbiAgb25TZWxlY3RGaWxlKCk6IHZvaWQge1xuICAgIGNvbnN0IGZpbGVzID0gdGhpcy5fbmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC5maWxlcztcbiAgICBpZiAoZmlsZXMgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmaWxlID0gZmlsZXMuaXRlbSgwKTtcbiAgICBpZiAoZmlsZSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGVzLml0ZW0oMCkgYXMgRmlsZSk7XG4gIH1cblxuICByZWdpc3Rlck9uQ2hhbmdlKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuID0gZm47XG4gIH1cblxuICByZWdpc3Rlck9uVG91Y2hlZChmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fb25Ub3VjaGVkID0gZm47XG4gIH1cblxuICByZXNldFZhbHVlKCk6IHZvaWQge1xuICAgIHRoaXMudmFsdWUgPSBudWxsO1xuICAgIHRoaXMuX25hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQudmFsdWUgPSAnJztcbiAgfVxuXG4gIHRyaWdnZXJOYXRpdmVJbnB1dCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX25hdGl2ZUlucHV0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuX25hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuY2xpY2soKTtcbiAgfVxuXG4gIHdyaXRlVmFsdWUodmFsdWU6IGFueSkge1xuICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcbiAgICB0aGlzLl9jZHIubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9wcm9jZXNzRmlsZVVwbG9hZChmaWxlOiBGaWxlKTogdm9pZCB7XG4gICAgY29uc3QgcmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICBjb25zdCB7bmFtZSwgc2l6ZSwgdHlwZX0gPSBmaWxlO1xuICAgIGlmICghaXNWYWxpZE1pbWVUeXBlKHR5cGUsIHRoaXMuYWNjZXB0KSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICByZWFkZXIub25sb2FkID0gKGU6IFByb2dyZXNzRXZlbnQ8RmlsZVJlYWRlcj4pID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSByZWFkZXIucmVzdWx0O1xuICAgICAgaWYgKHR5cGVvZiBjb250ZW50ICE9PSAnc3RyaW5nJykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB0aGlzLnZhbHVlID0ge25hbWUsIHNpemUsIHR5cGUsIGNvbnRlbnR9O1xuICAgICAgaWYgKHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gIT0gbnVsbCkge1xuICAgICAgICB0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuKHRoaXMudmFsdWUpO1xuICAgICAgfVxuICAgIH07XG4gICAgcmVhZGVyLnJlYWRBc0RhdGFVUkwoZmlsZSk7XG4gIH1cbn1cblxuY29uc3QgYWpmRmlsZUtleXMgPSBKU09OLnN0cmluZ2lmeShbJ2NvbnRlbnQnLCAnbmFtZScsICdzaXplJywgJ3R5cGUnXSk7XG5cbi8qKlxuICogVGVzdCBpZiBhIHZhbHVlIGlzIGFuIEFqZkZpbGUgaW50ZXJmYWNlLlxuICovXG5mdW5jdGlvbiBpc0FqZkZpbGUodmFsdWU6IGFueSk6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHZhbHVlICE9PSAnb2JqZWN0Jykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXModmFsdWUpLnNvcnQoKGEsIGIpID0+IGEubG9jYWxlQ29tcGFyZShiKSk7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShrZXlzKSA9PT0gYWpmRmlsZUtleXM7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRNaW1lVHlwZShtaW1lVHlwZTogc3RyaW5nLCBhY2NlcHQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBpZiAoYWNjZXB0ID09IG51bGwpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBsZXQgdGVybWluYXRlID0gdHJ1ZTtcbiAgaWYgKGFjY2VwdC5lbmRzV2l0aCgnKicpKSB7XG4gICAgYWNjZXB0ID0gYWNjZXB0LnNsaWNlKDAsIGFjY2VwdC5sZW5ndGggLSAxKTtcbiAgICB0ZXJtaW5hdGUgPSBmYWxzZTtcbiAgfVxuICBjb25zdCByZWdFeFN0ciA9ICdeJyArIGFjY2VwdCArICh0ZXJtaW5hdGUgPyAnJCcgOiAnJyk7XG4gIGNvbnN0IHJlZ0V4ID0gbmV3IFJlZ0V4cChyZWdFeFN0cik7XG4gIHJldHVybiByZWdFeC50ZXN0KG1pbWVUeXBlKTtcbn1cblxuZXhwb3J0IGNvbnN0IGZpbGVJY29uID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNJyArXG4gICAgJ0M5emRtY2lJSGRwWkhSb1BTSXhOekEyTGpZMk55SWdhR1ZwWjJoMFBTSXhOekEyTGpZMk55SWdkbWxsZDBKdmVEMGlNQ0F3SURFeU9EQWdNVEk0TUNJZ2NISmwnICtcbiAgICAnYzJWeWRtVkJjM0JsWTNSU1lYUnBiejBpZUUxcFpGbE5hV1FnYldWbGRDSStQSEJoZEdnZ1pEMGlUVEk0TXlBeE1ETmpMVEUzTGpjZ01pNDBMVE16TGprZ01UTScgK1xuICAgICd1T0MwME1pNHlJREk1TGpZdE55NDBJREUwTFRZdU9DMHpNaTQxTFRZdU9DQTBPVGN1TkhNdExqWWdORGd6TGpRZ05pNDRJRFE1Tnk0MFl6WXVPQ0F4TXk0eElEJyArXG4gICAgJ0U0TGpZZ01qSXVOeUF6TXk0M0lESTNMamhzTnlBeUxqTm9OekUzYkRjdE1pNHpZekUxTGpFdE5TNHhJREkyTGprdE1UUXVOeUF6TXk0M0xUSTNMamdnTnk0MEwnICtcbiAgICAnVEUwSURZdU9DQXhPUzR5SURZdU9DMHpOell1TmxZek9UUXVNV3d0TVRFeExqSXRMak10TVRFeExqTXRMalF0T0M0MUxUSXVNMk10TWpNdU9DMDJMalV0TkRNdCcgK1xuICAgICdNakV1TXkwMU1pNDBMVFF3TGpVdE55NDFMVEUxTGpNdE55MDJMVGN1TXkweE16TXVPV3d0TGpRdE1URTBMamN0TWpNekxqSXVNUzB5TXpndU55NDVlbTAxTVRJJyArXG4gICAgJ2dNVEE1TGpoak1DQXhNakF1TlMwdU15QXhNVFF1T1NBMklERXlOQzQwSURNdU5pQTFMalVnTVRFdU5pQXhNUzR5SURFNUxqY2dNVFF1TVNBMUxqZ2dNaTR5SUQnICtcbiAgICAnWXVOQ0F5TGpJZ01URTFMamdnTWk0MWJERXhNQ0F1TXkweE1qVXRNVEkxTGpRdE1USTFMamN0TVRJMUxqVmpMUzQxTFM0eExTNDRJRFE1TGpJdExqZ2dNVEE1TCcgK1xuICAgICdqWjZJaTgrUEM5emRtYysnO1xuXG5jb25zdCB0cmFzaEljb24gPSAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd01DOXpkbWMnICtcbiAgICAnaUlIWnBaWGRDYjNnOUlqQWdMVEkxTmlBeE56a3lJREUzT1RJaUlIZHBaSFJvUFNJeE1EQWxJaUJvWldsbmFIUTlJakV3TUNVaVBqeHdZWFJvSUdROUlrMDNNRCcgK1xuICAgICdrdU5ESTBJRFExTlM0d05YWTFOelp4TUNBeE5DMDVJREl6TFRrZ09TMHlNeUE1YUMwMk5IRXRNVFFnTUMweU15MDVMVGt0T1MwNUxUSXpkaTAxTnpaeE1DMHhOJyArXG4gICAgJ0NBNUxUSXpJRGt0T1NBeU15MDVhRFkwY1RFMElEQWdNak1nT1NBNUlEa2dPU0F5TTNwdE1qVTJJREIyTlRjMmNUQWdNVFF0T1NBeU15MDVJRGt0TWpNZ09XZ3QnICtcbiAgICAnTmpSeExURTBJREF0TWpNdE9TMDVMVGt0T1MweU0zWXROVGMyY1RBdE1UUWdPUzB5TXlBNUxUa2dNak10T1dnMk5IRXhOQ0F3SURJeklEa2dPU0E1SURrZ01qTicgK1xuICAgICc2YlRJMU5pQXdkalUzTm5Fd0lERTBMVGtnTWpNdE9TQTVMVEl6SURsb0xUWTBjUzB4TkNBd0xUSXpMVGt0T1MwNUxUa3RNak4yTFRVM05uRXdMVEUwSURrdE1qJyArXG4gICAgJ01nT1MwNUlESXpMVGxvTmpSeE1UUWdNQ0F5TXlBNUlEa2dPU0E1SURJemVtMHhNamdnTnpJMGRpMDVORGhvTFRnNU5uWTVORGh4TUNBeU1pQTNJRFF3TGpVZ04nICtcbiAgICAneUF4T0M0MUlERTBMalVnTWpjZ055NDFJRGd1TlNBeE1DNDFJRGd1TldnNE16SnhNeUF3SURFd0xqVXRPQzQxSURjdU5TMDRMalVnTVRRdU5TMHlOeUEzTFRFNCcgK1xuICAgICdMalVnTnkwME1DNDFlbTB0TmpjeUxURXdOelpvTkRRNGJDMDBPQzB4TVRkeExUY3RPUzB4TnkweE1XZ3RNekUzY1MweE1DQXlMVEUzSURFeGVtMDVNamdnTXpKJyArXG4gICAgJzJOalJ4TUNBeE5DMDVJREl6TFRrZ09TMHlNeUE1YUMwNU5uWTVORGh4TUNBNE15MDBOeUF4TkRNdU5TMDBOeUEyTUM0MUxURXhNeUEyTUM0MWFDMDRNekp4TFQnICtcbiAgICAnWTJJREF0TVRFekxUVTRMalV0TkRjdE5UZ3VOUzAwTnkweE5ERXVOWFl0T1RVeWFDMDVObkV0TVRRZ01DMHlNeTA1TFRrdE9TMDVMVEl6ZGkwMk5IRXdMVEUwSScgK1xuICAgICdEa3RNak1nT1MwNUlESXpMVGxvTXpBNWJEY3dMVEUyTjNFeE5TMHpOeUExTkMwMk15QXpPUzB5TmlBM09TMHlObWd6TWpCeE5EQWdNQ0EzT1NBeU5pQXpPU0F5JyArXG4gICAgJ05pQTFOQ0EyTTJ3M01DQXhOamRvTXpBNWNURTBJREFnTWpNZ09TQTVJRGtnT1NBeU0zb2lMejQ4TDNOMlp6ND0nO1xuIl19