import { __decorate, __metadata } from 'tslib';
import { Directive, ViewContainerRef, EventEmitter, ContentChildren, QueryList, ViewChild, ElementRef, Input, Output, Component, ChangeDetectionStrategy, ViewEncapsulation, forwardRef, ChangeDetectorRef, NgModule } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subscription, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { AjfCommonModule } from '@ajf/core/common';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

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
let AjfDropMessage = /** @class */ (() => {
    let AjfDropMessage = class AjfDropMessage {
    };
    AjfDropMessage = __decorate([
        Directive({ selector: '[ajfDropMessage]' })
    ], AjfDropMessage);
    return AjfDropMessage;
})();
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
const fileIcon = 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwM' +
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
let AjfFileInputModule = /** @class */ (() => {
    let AjfFileInputModule = class AjfFileInputModule {
    };
    AjfFileInputModule = __decorate([
        NgModule({
            declarations: [
                AjfDropMessage,
                AjfFileInput,
                AjfFilePreview,
            ],
            exports: [
                AjfDropMessage,
                AjfFileInput,
                AjfFilePreview,
            ],
            imports: [
                AjfCommonModule,
                CommonModule,
                TranslateModule,
            ],
        })
    ], AjfFileInputModule);
    return AjfFileInputModule;
})();

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfDropMessage, AjfFileInput, AjfFileInputModule, AjfFilePreview, fileIcon };
//# sourceMappingURL=file-input.js.map
