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
import { __decorate, __metadata } from "tslib";
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ContentChildren, Directive, ElementRef, EventEmitter, forwardRef, Input, Output, QueryList, ViewChild, ViewContainerRef, ViewEncapsulation, } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
let AjfDropMessage = /** @class */ (() => {
    let AjfDropMessage = class AjfDropMessage {
    };
    AjfDropMessage = __decorate([
        Directive({ selector: '[ajfDropMessage]' })
    ], AjfDropMessage);
    return AjfDropMessage;
})();
export { AjfDropMessage };
let AjfFilePreview = /** @class */ (() => {
    let AjfFilePreview = class AjfFilePreview {
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
    };
    AjfFilePreview = __decorate([
        Directive({
            selector: '[ajfFilePreview]',
            exportAs: 'ajfFilePreview',
        }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], AjfFilePreview);
    return AjfFilePreview;
})();
export { AjfFilePreview };
let AjfFileInput = /** @class */ (() => {
    var AjfFileInput_1;
    let AjfFileInput = AjfFileInput_1 = class AjfFileInput {
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
    };
    __decorate([
        ContentChildren(AjfDropMessage, { descendants: false }),
        __metadata("design:type", QueryList)
    ], AjfFileInput.prototype, "_dropMessageChildren", void 0);
    __decorate([
        ContentChildren(AjfFilePreview, { descendants: false }),
        __metadata("design:type", QueryList)
    ], AjfFileInput.prototype, "_filePreviewChildren", void 0);
    __decorate([
        ViewChild('nativeInput'),
        __metadata("design:type", ElementRef)
    ], AjfFileInput.prototype, "_nativeInput", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AjfFileInput.prototype, "accept", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AjfFileInput.prototype, "value", null);
    __decorate([
        Output(),
        __metadata("design:type", Observable)
    ], AjfFileInput.prototype, "valueChange", void 0);
    AjfFileInput = AjfFileInput_1 = __decorate([
        Component({
            selector: 'ajf-file-input',
            template: "<div ajfDnd (file)=\"onFileDrop($event)\" class=\"ajf-drop-zone\">\n  <div *ngIf=\"value == null; else fileInfo\" class=\"ajf-drop-message\" (click)=\"triggerNativeInput()\">\n    <ng-container *ngIf=\"_dropMessageChildren?.length; else defaultDropMessage\">\n      <ng-content select=\"[ajfDropMessage]\"></ng-content>\n    </ng-container>\n    <ng-template #defaultDropMessage>Drop your file here or click to select</ng-template>\n  </div>\n  <ng-template #fileInfo>\n    <button (click)=\"resetValue()\" class=\"ajf-remove-file\">\n      <img [src]=\"removeIcon\" alt=\"\">\n      <div class=\"ajf-screen-reader-only\">{{ 'Delete'|translate }}</div>\n    </button>\n    <div class=\"ajf-file-info\">\n      <ng-container *ngIf=\"_filePreviewChildren?.length; else defaultFilePreview\">\n        <ng-content select=\"[ajfFilePreview]\"></ng-content>\n      </ng-container>\n      <ng-template #defaultFilePreview>\n        <div class=\"ajf-file-info-content\">\n          <img [src]=\"fileIcon\" alt=\"\">\n          <div>{{ value.name }}</div>\n        </div>\n      </ng-template>\n    </div>\n  </ng-template>\n</div>\n<input #nativeInput [accept]=\"accept\" name=\"\" aria-label=\"file input\" type=\"file\" (change)=\"onSelectFile()\">\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            host: {
                '[class.ajf-file-input]': 'true',
            },
            providers: [{
                    provide: NG_VALUE_ACCESSOR,
                    useExisting: forwardRef(() => AjfFileInput_1),
                    multi: true,
                }],
            styles: [".ajf-file-input{display:flex;min-height:100px;align-items:stretch;position:relative;overflow:hidden}.ajf-file-input .ajf-drop-zone,.ajf-file-input .ajf-file-info,.ajf-file-input .ajf-drop-message{flex:1 1 auto;display:flex;align-items:center;justify-content:center}.ajf-file-input .ajf-drop-zone{background-color:#eee}.ajf-file-input .ajf-drop-zone.ajf-dnd-over{background-color:#999}.ajf-file-input .ajf-drop-message{cursor:pointer;align-self:stretch}.ajf-file-input .ajf-file-info-content{display:flex;align-items:center}.ajf-file-input .ajf-file-info-content img{width:32px;height:32px;margin-right:8px}.ajf-file-input input{position:absolute;top:-9999;left:-9999;opacity:0;z-index:-1}.ajf-file-input .ajf-screen-reader-only{display:none}.ajf-file-input .ajf-remove-file{position:absolute;top:16px;right:16px;padding:8px;cursor:pointer}.ajf-file-input .ajf-remove-file img{width:16px;height:16px;margin-right:0}\n"]
        }),
        __metadata("design:paramtypes", [DomSanitizer, ChangeDetectorRef])
    ], AjfFileInput);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2ZpbGUtaW5wdXQvZmlsZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7O0FBRUgsT0FBTyxFQUNMLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDakIsU0FBUyxFQUNULGVBQWUsRUFDZixTQUFTLEVBQ1QsVUFBVSxFQUNWLFlBQVksRUFDWixVQUFVLEVBQ1YsS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULGdCQUFnQixFQUNoQixpQkFBaUIsR0FDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUF1QixpQkFBaUIsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ3ZFLE9BQU8sRUFBQyxZQUFZLEVBQWtCLE1BQU0sMkJBQTJCLENBQUM7QUFDeEUsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLE1BQU0sRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBS3RDO0lBQUEsSUFBYSxjQUFjLEdBQTNCLE1BQWEsY0FBYztLQUMxQixDQUFBO0lBRFksY0FBYztRQUQxQixTQUFTLENBQUMsRUFBQyxRQUFRLEVBQUUsa0JBQWtCLEVBQUMsQ0FBQztPQUM3QixjQUFjLENBQzFCO0lBQUQscUJBQUM7S0FBQTtTQURZLGNBQWM7QUFPM0I7SUFBQSxJQUFhLGNBQWMsR0FBM0IsTUFBYSxjQUFjO1FBUXpCLFlBQVksR0FBcUI7WUFGekIsY0FBUyxHQUFHLFlBQVksQ0FBQyxLQUFLLENBQUM7WUFHckMsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsWUFBWSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBQ3pELElBQUksS0FBSyxFQUFFO2dCQUNULElBQUksQ0FBQyxNQUFNLEdBQUcs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RyxHQUFHLE1BQU0sR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUN2RCxNQUFNLEtBQUssR0FBRyxJQUFJLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNuQyxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7QUFDOUIsQ0FBQztBQUVELE1BQU0sQ0FBQyxNQUFNLFFBQVEsR0FBRyx5RUFBeUU7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3RixpQkFBaUIsQ0FBQztBQUV0QixNQUFNLFNBQVMsR0FBRywrRUFBK0U7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3RixrRUFBa0UsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3ksXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBDb21wb25lbnQsXG4gIENvbnRlbnRDaGlsZHJlbixcbiAgRGlyZWN0aXZlLFxuICBFbGVtZW50UmVmLFxuICBFdmVudEVtaXR0ZXIsXG4gIGZvcndhcmRSZWYsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDb250YWluZXJSZWYsXG4gIFZpZXdFbmNhcHN1bGF0aW9uLFxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Q29udHJvbFZhbHVlQWNjZXNzb3IsIE5HX1ZBTFVFX0FDQ0VTU09SfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZmlsdGVyfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRmlsZX0gZnJvbSAnLi9maWxlJztcblxuQERpcmVjdGl2ZSh7c2VsZWN0b3I6ICdbYWpmRHJvcE1lc3NhZ2VdJ30pXG5leHBvcnQgY2xhc3MgQWpmRHJvcE1lc3NhZ2Uge1xufVxuXG5ARGlyZWN0aXZlKHtcbiAgc2VsZWN0b3I6ICdbYWpmRmlsZVByZXZpZXddJyxcbiAgZXhwb3J0QXM6ICdhamZGaWxlUHJldmlldycsXG59KVxuZXhwb3J0IGNsYXNzIEFqZkZpbGVQcmV2aWV3IGltcGxlbWVudHMgT25EZXN0cm95IHtcbiAgcHJpdmF0ZSBfdmFsdWU6IEFqZkZpbGU7XG4gIGdldCB2YWx1ZSgpOiBBamZGaWxlIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsdWU7XG4gIH1cblxuICBwcml2YXRlIF92YWx1ZVN1YiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBjb25zdHJ1Y3Rvcih2Y3I6IFZpZXdDb250YWluZXJSZWYpIHtcbiAgICBjb25zdCBpbnB1dCA9IHZjci5wYXJlbnRJbmplY3Rvci5nZXQoQWpmRmlsZUlucHV0LCBudWxsKTtcbiAgICBpZiAoaW5wdXQpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gaW5wdXQudmFsdWU7XG4gICAgICB0aGlzLl92YWx1ZVN1YiA9IGlucHV0LnZhbHVlQ2hhbmdlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgIT0gbnVsbCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgLnN1YnNjcmliZSh2YWx1ZSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWUgYXMgQWpmRmlsZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX3ZhbHVlU3ViLnVuc3Vic2NyaWJlKCk7XG4gIH1cbn1cblxuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWpmLWZpbGUtaW5wdXQnLFxuICB0ZW1wbGF0ZVVybDogJy4vZmlsZS1pbnB1dC5odG1sJyxcbiAgc3R5bGVVcmxzOiBbJy4vZmlsZS1pbnB1dC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoLFxuICBlbmNhcHN1bGF0aW9uOiBWaWV3RW5jYXBzdWxhdGlvbi5Ob25lLFxuICBob3N0OiB7XG4gICAgJ1tjbGFzcy5hamYtZmlsZS1pbnB1dF0nOiAndHJ1ZScsXG4gIH0sXG4gIHByb3ZpZGVyczogW3tcbiAgICBwcm92aWRlOiBOR19WQUxVRV9BQ0NFU1NPUixcbiAgICB1c2VFeGlzdGluZzogZm9yd2FyZFJlZigoKSA9PiBBamZGaWxlSW5wdXQpLFxuICAgIG11bHRpOiB0cnVlLFxuICB9XSxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmlsZUlucHV0IGltcGxlbWVudHMgQ29udHJvbFZhbHVlQWNjZXNzb3Ige1xuICBAQ29udGVudENoaWxkcmVuKEFqZkRyb3BNZXNzYWdlLCB7ZGVzY2VuZGFudHM6IGZhbHNlfSlcbiAgX2Ryb3BNZXNzYWdlQ2hpbGRyZW46IFF1ZXJ5TGlzdDxBamZEcm9wTWVzc2FnZT47XG4gIEBDb250ZW50Q2hpbGRyZW4oQWpmRmlsZVByZXZpZXcsIHtkZXNjZW5kYW50czogZmFsc2V9KVxuICBfZmlsZVByZXZpZXdDaGlsZHJlbjogUXVlcnlMaXN0PEFqZkZpbGVQcmV2aWV3PjtcbiAgQFZpZXdDaGlsZCgnbmF0aXZlSW5wdXQnKSBfbmF0aXZlSW5wdXQ6IEVsZW1lbnRSZWY8SFRNTElucHV0RWxlbWVudD47XG5cbiAgcmVhZG9ubHkgZmlsZUljb246IFNhZmVSZXNvdXJjZVVybDtcbiAgcmVhZG9ubHkgcmVtb3ZlSWNvbjogU2FmZVJlc291cmNlVXJsO1xuXG4gIEBJbnB1dCgpIGFjY2VwdDogc3RyaW5nO1xuXG4gIHByaXZhdGUgX3ZhbHVlOiBhbnk7XG4gIGdldCB2YWx1ZSgpOiBhbnkge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgdmFsdWUodmFsdWU6IGFueSkge1xuICAgIGlmICh2YWx1ZSBpbnN0YW5jZW9mIEZpbGUpIHtcbiAgICAgIHRoaXMuX3Byb2Nlc3NGaWxlVXBsb2FkKHZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZUxpc3QpIHtcbiAgICAgIGlmICh2YWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgdGhpcy5fcHJvY2Vzc0ZpbGVVcGxvYWQodmFsdWVbMF0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIHZhbHVlID09IG51bGwgfHxcbiAgICAgICAgKGlzQWpmRmlsZSh2YWx1ZSkgJiYgaXNWYWxpZE1pbWVUeXBlKCh2YWx1ZSBhcyBBamZGaWxlKS50eXBlLCB0aGlzLmFjY2VwdCkpKSB7XG4gICAgICB0aGlzLl92YWx1ZSA9IHZhbHVlO1xuICAgICAgdGhpcy5fdmFsdWVDaGFuZ2UuZW1pdCh0aGlzLl92YWx1ZSk7XG4gICAgICB0aGlzLl9jZHIuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlQ2hhbmdlID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGaWxlfHVuZGVmaW5lZD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IHZhbHVlQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZkZpbGV8dW5kZWZpbmVkPiA9IHRoaXMuX3ZhbHVlQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIC8qKiBUaGUgbWV0aG9kIHRvIGJlIGNhbGxlZCBpbiBvcmRlciB0byB1cGRhdGUgbmdNb2RlbC4gKi9cbiAgX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm46ICh2YWx1ZTogYW55KSA9PiB2b2lkID0gKCkgPT4ge307XG5cbiAgLyoqIG9uVG91Y2ggZnVuY3Rpb24gcmVnaXN0ZXJlZCB2aWEgcmVnaXN0ZXJPblRvdWNoIChDb250cm9sVmFsdWVBY2Nlc3NvcikuICovXG4gIF9vblRvdWNoZWQ6ICgpID0+IGFueSA9ICgpID0+IHt9O1xuXG4gIGNvbnN0cnVjdG9yKGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLCBwcml2YXRlIF9jZHI6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5maWxlSWNvbiA9IGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwoZmlsZUljb24pO1xuICAgIHRoaXMucmVtb3ZlSWNvbiA9IGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodHJhc2hJY29uKTtcbiAgfVxuXG4gIG9uRmlsZURyb3AoZmlsZXM6IEZpbGVMaXN0KTogdm9pZCB7XG4gICAgaWYgKGZpbGVzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBmaWxlID0gZmlsZXNbMF07XG4gICAgdGhpcy5fcHJvY2Vzc0ZpbGVVcGxvYWQoZmlsZSk7XG4gIH1cblxuICBvblNlbGVjdEZpbGUoKTogdm9pZCB7XG4gICAgY29uc3QgZmlsZXMgPSB0aGlzLl9uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LmZpbGVzO1xuICAgIGlmIChmaWxlcyA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZpbGUgPSBmaWxlcy5pdGVtKDApO1xuICAgIGlmIChmaWxlID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fcHJvY2Vzc0ZpbGVVcGxvYWQoZmlsZXMuaXRlbSgwKSBhcyBGaWxlKTtcbiAgfVxuXG4gIHJlZ2lzdGVyT25DaGFuZ2UoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4gPSBmbjtcbiAgfVxuXG4gIHJlZ2lzdGVyT25Ub3VjaGVkKGZuOiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9vblRvdWNoZWQgPSBmbjtcbiAgfVxuXG4gIHJlc2V0VmFsdWUoKTogdm9pZCB7XG4gICAgdGhpcy52YWx1ZSA9IG51bGw7XG4gICAgdGhpcy5fbmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC52YWx1ZSA9ICcnO1xuICB9XG5cbiAgdHJpZ2dlck5hdGl2ZUlucHV0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5fbmF0aXZlSW5wdXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdGhpcy5fbmF0aXZlSW5wdXQubmF0aXZlRWxlbWVudC5jbGljaygpO1xuICB9XG5cbiAgd3JpdGVWYWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xuICAgIHRoaXMuX2Nkci5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3Byb2Nlc3NGaWxlVXBsb2FkKGZpbGU6IEZpbGUpOiB2b2lkIHtcbiAgICBjb25zdCByZWFkZXIgPSBuZXcgRmlsZVJlYWRlcigpO1xuICAgIGNvbnN0IHtuYW1lLCBzaXplLCB0eXBlfSA9IGZpbGU7XG4gICAgaWYgKCFpc1ZhbGlkTWltZVR5cGUodHlwZSwgdGhpcy5hY2NlcHQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJlYWRlci5vbmxvYWQgPSAoZTogUHJvZ3Jlc3NFdmVudDxGaWxlUmVhZGVyPikgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IHJlYWRlci5yZXN1bHQ7XG4gICAgICBpZiAodHlwZW9mIGNvbnRlbnQgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRoaXMudmFsdWUgPSB7bmFtZSwgc2l6ZSwgdHlwZSwgY29udGVudH07XG4gICAgICBpZiAodGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiAhPSBudWxsKSB7XG4gICAgICAgIHRoaXMuX2NvbnRyb2xWYWx1ZUFjY2Vzc29yQ2hhbmdlRm4odGhpcy52YWx1ZSk7XG4gICAgICB9XG4gICAgfTtcbiAgICByZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcbiAgfVxufVxuXG5jb25zdCBhamZGaWxlS2V5cyA9IEpTT04uc3RyaW5naWZ5KFsnY29udGVudCcsICduYW1lJywgJ3NpemUnLCAndHlwZSddKTtcblxuLyoqXG4gKiBUZXN0IGlmIGEgdmFsdWUgaXMgYW4gQWpmRmlsZSBpbnRlcmZhY2UuXG4gKi9cbmZ1bmN0aW9uIGlzQWpmRmlsZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XG4gIGlmICh0eXBlb2YgdmFsdWUgIT09ICdvYmplY3QnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG4gIGNvbnN0IGtleXMgPSBPYmplY3Qua2V5cyh2YWx1ZSkuc29ydCgoYSwgYikgPT4gYS5sb2NhbGVDb21wYXJlKGIpKTtcbiAgcmV0dXJuIEpTT04uc3RyaW5naWZ5KGtleXMpID09PSBhamZGaWxlS2V5cztcbn1cblxuZnVuY3Rpb24gaXNWYWxpZE1pbWVUeXBlKG1pbWVUeXBlOiBzdHJpbmcsIGFjY2VwdDogc3RyaW5nKTogYm9vbGVhbiB7XG4gIGlmIChhY2NlcHQgPT0gbnVsbCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGxldCB0ZXJtaW5hdGUgPSB0cnVlO1xuICBpZiAoYWNjZXB0LmVuZHNXaXRoKCcqJykpIHtcbiAgICBhY2NlcHQgPSBhY2NlcHQuc2xpY2UoMCwgYWNjZXB0Lmxlbmd0aCAtIDEpO1xuICAgIHRlcm1pbmF0ZSA9IGZhbHNlO1xuICB9XG4gIGNvbnN0IHJlZ0V4U3RyID0gJ14nICsgYWNjZXB0ICsgKHRlcm1pbmF0ZSA/ICckJyA6ICcnKTtcbiAgY29uc3QgcmVnRXggPSBuZXcgUmVnRXhwKHJlZ0V4U3RyKTtcbiAgcmV0dXJuIHJlZ0V4LnRlc3QobWltZVR5cGUpO1xufVxuXG5leHBvcnQgY29uc3QgZmlsZUljb24gPSAnZGF0YTppbWFnZS9zdmcreG1sO2Jhc2U2NCxQSE4yWnlCNGJXeHVjejBpYUhSMGNEb3ZMM2QzZHk1M015NXZjbWN2TWpBd00nICtcbiAgICAnQzl6ZG1jaUlIZHBaSFJvUFNJeE56QTJMalkyTnlJZ2FHVnBaMmgwUFNJeE56QTJMalkyTnlJZ2RtbGxkMEp2ZUQwaU1DQXdJREV5T0RBZ01USTRNQ0lnY0hKbCcgK1xuICAgICdjMlZ5ZG1WQmMzQmxZM1JTWVhScGJ6MGllRTFwWkZsTmFXUWdiV1ZsZENJK1BIQmhkR2dnWkQwaVRUSTRNeUF4TUROakxURTNMamNnTWk0MExUTXpMamtnTVRNJyArXG4gICAgJ3VPQzAwTWk0eUlESTVMall0Tnk0MElERTBMVFl1T0Mwek1pNDFMVFl1T0NBME9UY3VOSE10TGpZZ05EZ3pMalFnTmk0NElEUTVOeTQwWXpZdU9DQXhNeTR4SUQnICtcbiAgICAnRTRMallnTWpJdU55QXpNeTQzSURJM0xqaHNOeUF5TGpOb056RTNiRGN0TWk0ell6RTFMakV0TlM0eElESTJMamt0TVRRdU55QXpNeTQzTFRJM0xqZ2dOeTQwTCcgK1xuICAgICdURTBJRFl1T0NBeE9TNHlJRFl1T0Mwek56WXVObFl6T1RRdU1Xd3RNVEV4TGpJdExqTXRNVEV4TGpNdExqUXRPQzQxTFRJdU0yTXRNak11T0MwMkxqVXRORE10JyArXG4gICAgJ01qRXVNeTAxTWk0MExUUXdMalV0Tnk0MUxURTFMak10TnkwMkxUY3VNeTB4TXpNdU9Xd3RMalF0TVRFMExqY3RNak16TGpJdU1TMHlNemd1Tnk0NWVtMDFNVEknICtcbiAgICAnZ01UQTVMamhqTUNBeE1qQXVOUzB1TXlBeE1UUXVPU0EySURFeU5DNDBJRE11TmlBMUxqVWdNVEV1TmlBeE1TNHlJREU1TGpjZ01UUXVNU0ExTGpnZ01pNHlJRCcgK1xuICAgICdZdU5DQXlMaklnTVRFMUxqZ2dNaTQxYkRFeE1DQXVNeTB4TWpVdE1USTFMalF0TVRJMUxqY3RNVEkxTGpWakxTNDFMUzR4TFM0NElEUTVMakl0TGpnZ01UQTVMJyArXG4gICAgJ2paNklpOCtQQzl6ZG1jKyc7XG5cbmNvbnN0IHRyYXNoSWNvbiA9ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TUM5emRtYycgK1xuICAgICdpSUhacFpYZENiM2c5SWpBZ0xUSTFOaUF4TnpreUlERTNPVElpSUhkcFpIUm9QU0l4TURBbElpQm9aV2xuYUhROUlqRXdNQ1VpUGp4d1lYUm9JR1E5SWswM01EJyArXG4gICAgJ2t1TkRJMElEUTFOUzR3TlhZMU56WnhNQ0F4TkMwNUlESXpMVGtnT1MweU15QTVhQzAyTkhFdE1UUWdNQzB5TXkwNUxUa3RPUzA1TFRJemRpMDFOelp4TUMweE4nICtcbiAgICAnQ0E1TFRJeklEa3RPU0F5TXkwNWFEWTBjVEUwSURBZ01qTWdPU0E1SURrZ09TQXlNM3B0TWpVMklEQjJOVGMyY1RBZ01UUXRPU0F5TXkwNUlEa3RNak1nT1dndCcgK1xuICAgICdOalJ4TFRFMElEQXRNak10T1MwNUxUa3RPUzB5TTNZdE5UYzJjVEF0TVRRZ09TMHlNeUE1TFRrZ01qTXRPV2cyTkhFeE5DQXdJREl6SURrZ09TQTVJRGtnTWpOJyArXG4gICAgJzZiVEkxTmlBd2RqVTNObkV3SURFMExUa2dNak10T1NBNUxUSXpJRGxvTFRZMGNTMHhOQ0F3TFRJekxUa3RPUzA1TFRrdE1qTjJMVFUzTm5Fd0xURTBJRGt0TWonICtcbiAgICAnTWdPUzA1SURJekxUbG9OalJ4TVRRZ01DQXlNeUE1SURrZ09TQTVJREl6ZW0weE1qZ2dOekkwZGkwNU5EaG9MVGc1Tm5ZNU5EaHhNQ0F5TWlBM0lEUXdMalVnTicgK1xuICAgICd5QXhPQzQxSURFMExqVWdNamNnTnk0MUlEZ3VOU0F4TUM0MUlEZ3VOV2c0TXpKeE15QXdJREV3TGpVdE9DNDFJRGN1TlMwNExqVWdNVFF1TlMweU55QTNMVEU0JyArXG4gICAgJ0xqVWdOeTAwTUM0MWVtMHROamN5TFRFd056Wm9ORFE0YkMwME9DMHhNVGR4TFRjdE9TMHhOeTB4TVdndE16RTNjUzB4TUNBeUxURTNJREV4ZW0wNU1qZ2dNekonICtcbiAgICAnMk5qUnhNQ0F4TkMwNUlESXpMVGtnT1MweU15QTVhQzA1Tm5ZNU5EaHhNQ0E0TXkwME55QXhORE11TlMwME55QTJNQzQxTFRFeE15QTJNQzQxYUMwNE16SnhMVCcgK1xuICAgICdZMklEQXRNVEV6TFRVNExqVXRORGN0TlRndU5TMDBOeTB4TkRFdU5YWXRPVFV5YUMwNU5uRXRNVFFnTUMweU15MDVMVGt0T1MwNUxUSXpkaTAyTkhFd0xURTBJJyArXG4gICAgJ0RrdE1qTWdPUzA1SURJekxUbG9NekE1YkRjd0xURTJOM0V4TlMwek55QTFOQzAyTXlBek9TMHlOaUEzT1MweU5tZ3pNakJ4TkRBZ01DQTNPU0F5TmlBek9TQXknICtcbiAgICAnTmlBMU5DQTJNMnczTUNBeE5qZG9NekE1Y1RFMElEQWdNak1nT1NBNUlEa2dPU0F5TTNvaUx6NDhMM04yWno0PSc7XG4iXX0=