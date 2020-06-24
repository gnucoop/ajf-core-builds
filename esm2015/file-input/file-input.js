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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS1pbnB1dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2ZpbGUtaW5wdXQvZmlsZS1pbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQ0wsdUJBQXVCLEVBQ3ZCLGlCQUFpQixFQUNqQixTQUFTLEVBQ1QsZUFBZSxFQUNmLFNBQVMsRUFDVCxVQUFVLEVBQ1YsWUFBWSxFQUNaLFVBQVUsRUFDVixLQUFLLEVBRUwsTUFBTSxFQUNOLFNBQVMsRUFDVCxTQUFTLEVBQ1QsZ0JBQWdCLEVBQ2hCLGlCQUFpQixHQUNsQixNQUFNLGVBQWUsQ0FBQztBQUN2QixPQUFPLEVBQXVCLGlCQUFpQixFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFDdkUsT0FBTyxFQUFDLFlBQVksRUFBa0IsTUFBTSwyQkFBMkIsQ0FBQztBQUN4RSxPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsTUFBTSxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFJdEM7SUFBQSxNQUNhLGNBQWM7OztnQkFEMUIsU0FBUyxTQUFDLEVBQUMsUUFBUSxFQUFFLGtCQUFrQixFQUFDOztJQUV6QyxxQkFBQztLQUFBO1NBRFksY0FBYztBQUczQjtJQUFBLE1BSWEsY0FBYztRQVF6QixZQUFZLEdBQXFCO1lBRnpCLGNBQVMsR0FBRyxZQUFZLENBQUMsS0FBSyxDQUFDO1lBR3JDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLFlBQVksRUFBRSxJQUFJLENBQUMsQ0FBQztZQUN6RCxJQUFJLEtBQUssRUFBRTtnQkFDVCxJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUM7Z0JBQzFCLElBQUksQ0FBQyxTQUFTLEdBQUcsS0FBSyxDQUFDLFdBQVc7cUJBQ1osSUFB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QUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLGlCQUFpQixDQUFDO0FBRXRCLE1BQU0sU0FBUyxHQUFHLCtFQUErRTtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLDZGQUE2RjtJQUM3Riw2RkFBNkY7SUFDN0YsNkZBQTZGO0lBQzdGLGtFQUFrRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIENvbXBvbmVudCxcbiAgQ29udGVudENoaWxkcmVuLFxuICBEaXJlY3RpdmUsXG4gIEVsZW1lbnRSZWYsXG4gIEV2ZW50RW1pdHRlcixcbiAgZm9yd2FyZFJlZixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NvbnRhaW5lclJlZixcbiAgVmlld0VuY2Fwc3VsYXRpb24sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtDb250cm9sVmFsdWVBY2Nlc3NvciwgTkdfVkFMVUVfQUNDRVNTT1J9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtmaWx0ZXJ9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGaWxlfSBmcm9tICcuL2ZpbGUnO1xuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1thamZEcm9wTWVzc2FnZV0nfSlcbmV4cG9ydCBjbGFzcyBBamZEcm9wTWVzc2FnZSB7XG59XG5cbkBEaXJlY3RpdmUoe1xuICBzZWxlY3RvcjogJ1thamZGaWxlUHJldmlld10nLFxuICBleHBvcnRBczogJ2FqZkZpbGVQcmV2aWV3Jyxcbn0pXG5leHBvcnQgY2xhc3MgQWpmRmlsZVByZXZpZXcgaW1wbGVtZW50cyBPbkRlc3Ryb3kge1xuICBwcml2YXRlIF92YWx1ZTogQWpmRmlsZTtcbiAgZ2V0IHZhbHVlKCk6IEFqZkZpbGUge1xuICAgIHJldHVybiB0aGlzLl92YWx1ZTtcbiAgfVxuXG4gIHByaXZhdGUgX3ZhbHVlU3ViID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIGNvbnN0cnVjdG9yKHZjcjogVmlld0NvbnRhaW5lclJlZikge1xuICAgIGNvbnN0IGlucHV0ID0gdmNyLnBhcmVudEluamVjdG9yLmdldChBamZGaWxlSW5wdXQsIG51bGwpO1xuICAgIGlmIChpbnB1dCkge1xuICAgICAgdGhpcy5fdmFsdWUgPSBpbnB1dC52YWx1ZTtcbiAgICAgIHRoaXMuX3ZhbHVlU3ViID0gaW5wdXQudmFsdWVDaGFuZ2VcbiAgICAgICAgICAgICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPSBudWxsKSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKHZhbHVlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5fdmFsdWUgPSB2YWx1ZSBhcyBBamZGaWxlO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fdmFsdWVTdWIudW5zdWJzY3JpYmUoKTtcbiAgfVxufVxuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICdhamYtZmlsZS1pbnB1dCcsXG4gIHRlbXBsYXRlVXJsOiAnLi9maWxlLWlucHV0Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9maWxlLWlucHV0LnNjc3MnXSxcbiAgY2hhbmdlRGV0ZWN0aW9uOiBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneS5PblB1c2gsXG4gIGVuY2Fwc3VsYXRpb246IFZpZXdFbmNhcHN1bGF0aW9uLk5vbmUsXG4gIGhvc3Q6IHtcbiAgICAnW2NsYXNzLmFqZi1maWxlLWlucHV0XSc6ICd0cnVlJyxcbiAgfSxcbiAgcHJvdmlkZXJzOiBbe1xuICAgIHByb3ZpZGU6IE5HX1ZBTFVFX0FDQ0VTU09SLFxuICAgIHVzZUV4aXN0aW5nOiBmb3J3YXJkUmVmKCgpID0+IEFqZkZpbGVJbnB1dCksXG4gICAgbXVsdGk6IHRydWUsXG4gIH1dLFxufSlcbmV4cG9ydCBjbGFzcyBBamZGaWxlSW5wdXQgaW1wbGVtZW50cyBDb250cm9sVmFsdWVBY2Nlc3NvciB7XG4gIEBDb250ZW50Q2hpbGRyZW4oQWpmRHJvcE1lc3NhZ2UsIHtkZXNjZW5kYW50czogZmFsc2V9KVxuICBfZHJvcE1lc3NhZ2VDaGlsZHJlbjogUXVlcnlMaXN0PEFqZkRyb3BNZXNzYWdlPjtcbiAgQENvbnRlbnRDaGlsZHJlbihBamZGaWxlUHJldmlldywge2Rlc2NlbmRhbnRzOiBmYWxzZX0pXG4gIF9maWxlUHJldmlld0NoaWxkcmVuOiBRdWVyeUxpc3Q8QWpmRmlsZVByZXZpZXc+O1xuICBAVmlld0NoaWxkKCduYXRpdmVJbnB1dCcpIF9uYXRpdmVJbnB1dDogRWxlbWVudFJlZjxIVE1MSW5wdXRFbGVtZW50PjtcblxuICByZWFkb25seSBmaWxlSWNvbjogU2FmZVJlc291cmNlVXJsO1xuICByZWFkb25seSByZW1vdmVJY29uOiBTYWZlUmVzb3VyY2VVcmw7XG5cbiAgQElucHV0KCkgYWNjZXB0OiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfdmFsdWU6IGFueTtcbiAgZ2V0IHZhbHVlKCk6IGFueSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbHVlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XG4gICAgaWYgKHZhbHVlIGluc3RhbmNlb2YgRmlsZSkge1xuICAgICAgdGhpcy5fcHJvY2Vzc0ZpbGVVcGxvYWQodmFsdWUpO1xuICAgIH0gZWxzZSBpZiAodmFsdWUgaW5zdGFuY2VvZiBGaWxlTGlzdCkge1xuICAgICAgaWYgKHZhbHVlLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZCh2YWx1ZVswXSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChcbiAgICAgICAgdmFsdWUgPT0gbnVsbCB8fFxuICAgICAgICAoaXNBamZGaWxlKHZhbHVlKSAmJiBpc1ZhbGlkTWltZVR5cGUoKHZhbHVlIGFzIEFqZkZpbGUpLnR5cGUsIHRoaXMuYWNjZXB0KSkpIHtcbiAgICAgIHRoaXMuX3ZhbHVlID0gdmFsdWU7XG4gICAgICB0aGlzLl92YWx1ZUNoYW5nZS5lbWl0KHRoaXMuX3ZhbHVlKTtcbiAgICAgIHRoaXMuX2Nkci5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfdmFsdWVDaGFuZ2UgPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZpbGV8dW5kZWZpbmVkPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgdmFsdWVDaGFuZ2U6IE9ic2VydmFibGU8QWpmRmlsZXx1bmRlZmluZWQ+ID0gdGhpcy5fdmFsdWVDaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgLyoqIFRoZSBtZXRob2QgdG8gYmUgY2FsbGVkIGluIG9yZGVyIHRvIHVwZGF0ZSBuZ01vZGVsLiAqL1xuICBfY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbjogKHZhbHVlOiBhbnkpID0+IHZvaWQgPSAoKSA9PiB7fTtcblxuICAvKiogb25Ub3VjaCBmdW5jdGlvbiByZWdpc3RlcmVkIHZpYSByZWdpc3Rlck9uVG91Y2ggKENvbnRyb2xWYWx1ZUFjY2Vzc29yKS4gKi9cbiAgX29uVG91Y2hlZDogKCkgPT4gYW55ID0gKCkgPT4ge307XG5cbiAgY29uc3RydWN0b3IoZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIHByaXZhdGUgX2NkcjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmZpbGVJY29uID0gZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybChmaWxlSWNvbik7XG4gICAgdGhpcy5yZW1vdmVJY29uID0gZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh0cmFzaEljb24pO1xuICB9XG5cbiAgb25GaWxlRHJvcChmaWxlczogRmlsZUxpc3QpOiB2b2lkIHtcbiAgICBpZiAoZmlsZXMubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGZpbGUgPSBmaWxlc1swXTtcbiAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZChmaWxlKTtcbiAgfVxuXG4gIG9uU2VsZWN0RmlsZSgpOiB2b2lkIHtcbiAgICBjb25zdCBmaWxlcyA9IHRoaXMuX25hdGl2ZUlucHV0Lm5hdGl2ZUVsZW1lbnQuZmlsZXM7XG4gICAgaWYgKGZpbGVzID09IG51bGwpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgZmlsZSA9IGZpbGVzLml0ZW0oMCk7XG4gICAgaWYgKGZpbGUgPT0gbnVsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9wcm9jZXNzRmlsZVVwbG9hZChmaWxlcy5pdGVtKDApIGFzIEZpbGUpO1xuICB9XG5cbiAgcmVnaXN0ZXJPbkNoYW5nZShmbjogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbiA9IGZuO1xuICB9XG5cbiAgcmVnaXN0ZXJPblRvdWNoZWQoZm46IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX29uVG91Y2hlZCA9IGZuO1xuICB9XG5cbiAgcmVzZXRWYWx1ZSgpOiB2b2lkIHtcbiAgICB0aGlzLnZhbHVlID0gbnVsbDtcbiAgICB0aGlzLl9uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LnZhbHVlID0gJyc7XG4gIH1cblxuICB0cmlnZ2VyTmF0aXZlSW5wdXQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9uYXRpdmVJbnB1dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLl9uYXRpdmVJbnB1dC5uYXRpdmVFbGVtZW50LmNsaWNrKCk7XG4gIH1cblxuICB3cml0ZVZhbHVlKHZhbHVlOiBhbnkpIHtcbiAgICB0aGlzLnZhbHVlID0gdmFsdWU7XG4gICAgdGhpcy5fY2RyLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcHJvY2Vzc0ZpbGVVcGxvYWQoZmlsZTogRmlsZSk6IHZvaWQge1xuICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgY29uc3Qge25hbWUsIHNpemUsIHR5cGV9ID0gZmlsZTtcbiAgICBpZiAoIWlzVmFsaWRNaW1lVHlwZSh0eXBlLCB0aGlzLmFjY2VwdCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgcmVhZGVyLm9ubG9hZCA9IChlOiBQcm9ncmVzc0V2ZW50PEZpbGVSZWFkZXI+KSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gcmVhZGVyLnJlc3VsdDtcbiAgICAgIGlmICh0eXBlb2YgY29udGVudCAhPT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy52YWx1ZSA9IHtuYW1lLCBzaXplLCB0eXBlLCBjb250ZW50fTtcbiAgICAgIGlmICh0aGlzLl9jb250cm9sVmFsdWVBY2Nlc3NvckNoYW5nZUZuICE9IG51bGwpIHtcbiAgICAgICAgdGhpcy5fY29udHJvbFZhbHVlQWNjZXNzb3JDaGFuZ2VGbih0aGlzLnZhbHVlKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIHJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xuICB9XG59XG5cbmNvbnN0IGFqZkZpbGVLZXlzID0gSlNPTi5zdHJpbmdpZnkoWydjb250ZW50JywgJ25hbWUnLCAnc2l6ZScsICd0eXBlJ10pO1xuXG4vKipcbiAqIFRlc3QgaWYgYSB2YWx1ZSBpcyBhbiBBamZGaWxlIGludGVyZmFjZS5cbiAqL1xuZnVuY3Rpb24gaXNBamZGaWxlKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcbiAgaWYgKHR5cGVvZiB2YWx1ZSAhPT0gJ29iamVjdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKS5zb3J0KChhLCBiKSA9PiBhLmxvY2FsZUNvbXBhcmUoYikpO1xuICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoa2V5cykgPT09IGFqZkZpbGVLZXlzO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkTWltZVR5cGUobWltZVR5cGU6IHN0cmluZywgYWNjZXB0OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgaWYgKGFjY2VwdCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgbGV0IHRlcm1pbmF0ZSA9IHRydWU7XG4gIGlmIChhY2NlcHQuZW5kc1dpdGgoJyonKSkge1xuICAgIGFjY2VwdCA9IGFjY2VwdC5zbGljZSgwLCBhY2NlcHQubGVuZ3RoIC0gMSk7XG4gICAgdGVybWluYXRlID0gZmFsc2U7XG4gIH1cbiAgY29uc3QgcmVnRXhTdHIgPSAnXicgKyBhY2NlcHQgKyAodGVybWluYXRlID8gJyQnIDogJycpO1xuICBjb25zdCByZWdFeCA9IG5ldyBSZWdFeHAocmVnRXhTdHIpO1xuICByZXR1cm4gcmVnRXgudGVzdChtaW1lVHlwZSk7XG59XG5cbmV4cG9ydCBjb25zdCBmaWxlSWNvbiA9ICdkYXRhOmltYWdlL3N2Zyt4bWw7YmFzZTY0LFBITjJaeUI0Yld4dWN6MGlhSFIwY0RvdkwzZDNkeTUzTXk1dmNtY3ZNakF3TScgK1xuICAgICdDOXpkbWNpSUhkcFpIUm9QU0l4TnpBMkxqWTJOeUlnYUdWcFoyaDBQU0l4TnpBMkxqWTJOeUlnZG1sbGQwSnZlRDBpTUNBd0lERXlPREFnTVRJNE1DSWdjSEpsJyArXG4gICAgJ2MyVnlkbVZCYzNCbFkzUlNZWFJwYnowaWVFMXBaRmxOYVdRZ2JXVmxkQ0krUEhCaGRHZ2daRDBpVFRJNE15QXhNRE5qTFRFM0xqY2dNaTQwTFRNekxqa2dNVE0nICtcbiAgICAndU9DMDBNaTR5SURJNUxqWXROeTQwSURFMExUWXVPQzB6TWk0MUxUWXVPQ0EwT1RjdU5ITXRMallnTkRnekxqUWdOaTQ0SURRNU55NDBZell1T0NBeE15NHhJRCcgK1xuICAgICdFNExqWWdNakl1TnlBek15NDNJREkzTGpoc055QXlMak5vTnpFM2JEY3RNaTR6WXpFMUxqRXROUzR4SURJMkxqa3RNVFF1TnlBek15NDNMVEkzTGpnZ055NDBMJyArXG4gICAgJ1RFMElEWXVPQ0F4T1M0eUlEWXVPQzB6TnpZdU5sWXpPVFF1TVd3dE1URXhMakl0TGpNdE1URXhMak10TGpRdE9DNDFMVEl1TTJNdE1qTXVPQzAyTGpVdE5ETXQnICtcbiAgICAnTWpFdU15MDFNaTQwTFRRd0xqVXROeTQxTFRFMUxqTXROeTAyTFRjdU15MHhNek11T1d3dExqUXRNVEUwTGpjdE1qTXpMakl1TVMweU16Z3VOeTQ1ZW0wMU1USScgK1xuICAgICdnTVRBNUxqaGpNQ0F4TWpBdU5TMHVNeUF4TVRRdU9TQTJJREV5TkM0MElETXVOaUExTGpVZ01URXVOaUF4TVM0eUlERTVMamNnTVRRdU1TQTFMamdnTWk0eUlEJyArXG4gICAgJ1l1TkNBeUxqSWdNVEUxTGpnZ01pNDFiREV4TUNBdU15MHhNalV0TVRJMUxqUXRNVEkxTGpjdE1USTFMalZqTFM0MUxTNHhMUzQ0SURRNUxqSXRMamdnTVRBNUwnICtcbiAgICAnalo2SWk4K1BDOXpkbWMrJztcblxuY29uc3QgdHJhc2hJY29uID0gJ2RhdGE6aW1hZ2Uvc3ZnK3htbDtiYXNlNjQsUEhOMlp5QjRiV3h1Y3owaWFIUjBjRG92TDNkM2R5NTNNeTV2Y21jdk1qQXdNQzl6ZG1jJyArXG4gICAgJ2lJSFpwWlhkQ2IzZzlJakFnTFRJMU5pQXhOemt5SURFM09USWlJSGRwWkhSb1BTSXhNREFsSWlCb1pXbG5hSFE5SWpFd01DVWlQanh3WVhSb0lHUTlJazAzTUQnICtcbiAgICAna3VOREkwSURRMU5TNHdOWFkxTnpaeE1DQXhOQzA1SURJekxUa2dPUzB5TXlBNWFDMDJOSEV0TVRRZ01DMHlNeTA1TFRrdE9TMDVMVEl6ZGkwMU56WnhNQzB4TicgK1xuICAgICdDQTVMVEl6SURrdE9TQXlNeTA1YURZMGNURTBJREFnTWpNZ09TQTVJRGtnT1NBeU0zcHRNalUySURCMk5UYzJjVEFnTVRRdE9TQXlNeTA1SURrdE1qTWdPV2d0JyArXG4gICAgJ05qUnhMVEUwSURBdE1qTXRPUzA1TFRrdE9TMHlNM1l0TlRjMmNUQXRNVFFnT1MweU15QTVMVGtnTWpNdE9XZzJOSEV4TkNBd0lESXpJRGtnT1NBNUlEa2dNak4nICtcbiAgICAnNmJUSTFOaUF3ZGpVM05uRXdJREUwTFRrZ01qTXRPU0E1TFRJeklEbG9MVFkwY1MweE5DQXdMVEl6TFRrdE9TMDVMVGt0TWpOMkxUVTNObkV3TFRFMElEa3RNaicgK1xuICAgICdNZ09TMDVJREl6TFRsb05qUnhNVFFnTUNBeU15QTVJRGtnT1NBNUlESXplbTB4TWpnZ056STBkaTA1TkRob0xUZzVOblk1TkRoeE1DQXlNaUEzSURRd0xqVWdOJyArXG4gICAgJ3lBeE9DNDFJREUwTGpVZ01qY2dOeTQxSURndU5TQXhNQzQxSURndU5XZzRNekp4TXlBd0lERXdMalV0T0M0MUlEY3VOUzA0TGpVZ01UUXVOUzB5TnlBM0xURTQnICtcbiAgICAnTGpVZ055MDBNQzQxZW0wdE5qY3lMVEV3Tnpab05EUTRiQzAwT0MweE1UZHhMVGN0T1MweE55MHhNV2d0TXpFM2NTMHhNQ0F5TFRFM0lERXhlbTA1TWpnZ016SicgK1xuICAgICcyTmpSeE1DQXhOQzA1SURJekxUa2dPUzB5TXlBNWFDMDVOblk1TkRoeE1DQTRNeTAwTnlBeE5ETXVOUzAwTnlBMk1DNDFMVEV4TXlBMk1DNDFhQzA0TXpKeExUJyArXG4gICAgJ1kySURBdE1URXpMVFU0TGpVdE5EY3ROVGd1TlMwME55MHhOREV1TlhZdE9UVXlhQzA1Tm5FdE1UUWdNQzB5TXkwNUxUa3RPUzA1TFRJemRpMDJOSEV3TFRFMEknICtcbiAgICAnRGt0TWpNZ09TMDVJREl6TFRsb016QTViRGN3TFRFMk4zRXhOUzB6TnlBMU5DMDJNeUF6T1MweU5pQTNPUzB5Tm1nek1qQnhOREFnTUNBM09TQXlOaUF6T1NBeScgK1xuICAgICdOaUExTkNBMk0ydzNNQ0F4Tmpkb016QTVjVEUwSURBZ01qTWdPU0E1SURrZ09TQXlNM29pTHo0OEwzTjJaejQ9JztcbiJdfQ==