import { __decorate, __metadata } from 'tslib';
import { Input, Directive, ElementRef, Renderer2, EventEmitter, Output, Pipe, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

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
let ApplyStylesDirective = /** @class */ (() => {
    let ApplyStylesDirective = class ApplyStylesDirective {
        constructor(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
        }
        set applyStyles(cssStyles) {
            if (cssStyles != null && this._cssStyles !== cssStyles) {
                this._cssStyles = cssStyles;
                this._updateStyles();
            }
        }
        _updateStyles() {
            if (this._cssStyles == null) {
                return;
            }
            Object.keys(this._cssStyles).forEach((style) => {
                try {
                    this._renderer.setStyle(this._el.nativeElement, style, `${this._cssStyles[style]}`);
                }
                catch (e) {
                }
            });
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], ApplyStylesDirective.prototype, "applyStyles", null);
    ApplyStylesDirective = __decorate([
        Directive({ selector: '[applyStyles]' }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], ApplyStylesDirective);
    return ApplyStylesDirective;
})();

let AutofocusDirective = /** @class */ (() => {
    let AutofocusDirective = class AutofocusDirective {
        constructor(_el) {
            this._el = _el;
        }
        ngAfterContentInit() {
            this._el.nativeElement.focus();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AutofocusDirective.prototype, "appAutoFocus", void 0);
    AutofocusDirective = __decorate([
        Directive({ selector: '[autoFocus]' }),
        __metadata("design:paramtypes", [ElementRef])
    ], AutofocusDirective);
    return AutofocusDirective;
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
let AjfDndDirective = /** @class */ (() => {
    let AjfDndDirective = class AjfDndDirective {
        constructor() {
            this._file = new EventEmitter();
            this.file = this._file.asObservable();
            this._over = false;
        }
        get over() {
            return this._over;
        }
        onDragOver(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            this._over = true;
        }
        onDragLeave(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            this._over = false;
        }
        onDrop(evt) {
            evt.preventDefault();
            evt.stopPropagation();
            if (evt.dataTransfer == null || evt.dataTransfer.files.length === 0) {
                return;
            }
            let files = evt.dataTransfer.files;
            if (files.length > 0) {
                this._over = false;
                this._file.emit(files);
            }
        }
    };
    __decorate([
        Output(),
        __metadata("design:type", Observable)
    ], AjfDndDirective.prototype, "file", void 0);
    AjfDndDirective = __decorate([
        Directive({
            selector: '[ajfDnd]',
            host: {
                '[class.ajf-dnd-over]': 'over',
                '(dragover)': 'onDragOver($event)',
                '(dragleave)': 'onDragLeave($event)',
                '(drop)': 'onDrop($event)',
            }
        })
    ], AjfDndDirective);
    return AjfDndDirective;
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
let FormatIfNumber = /** @class */ (() => {
    let FormatIfNumber = class FormatIfNumber extends DecimalPipe {
        transform(value, digitsInfo, locale) {
            if (typeof value === 'number') {
                return super.transform(value, digitsInfo, locale);
            }
            else {
                return value;
            }
        }
    };
    FormatIfNumber = __decorate([
        Pipe({ name: 'ajfFormatIfNumber' })
    ], FormatIfNumber);
    return FormatIfNumber;
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
let TranslateIfString = /** @class */ (() => {
    let TranslateIfString = class TranslateIfString extends TranslatePipe {
        transform(query, ...args) {
            if (typeof query === 'string') {
                return super.transform(query, ...args);
            }
            else {
                return query;
            }
        }
    };
    TranslateIfString = __decorate([
        Pipe({ name: 'ajfTranslateIfString' })
    ], TranslateIfString);
    return TranslateIfString;
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
let AjfVideoDirective = /** @class */ (() => {
    let AjfVideoDirective = class AjfVideoDirective {
        constructor(_el, _renderer) {
            this._el = _el;
            this._renderer = _renderer;
            this.isInit = new EventEmitter();
        }
        get source() {
            return this._source;
        }
        set source(source) {
            this._source = source;
            this._initCam();
        }
        _initCam() {
            if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                    .then((stream) => {
                    this._source.srcObject = stream;
                    this._source.play();
                })
                    .catch((err) => {
                    console.log(err);
                });
            }
        }
        ngAfterViewInit() {
            this._renderer.appendChild(this._el.nativeElement, this._source);
            this.isInit.emit();
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", HTMLVideoElement),
        __metadata("design:paramtypes", [HTMLVideoElement])
    ], AjfVideoDirective.prototype, "source", null);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AjfVideoDirective.prototype, "isInit", void 0);
    AjfVideoDirective = __decorate([
        Directive({ selector: '[ajfVideoDirective]' }),
        __metadata("design:paramtypes", [ElementRef, Renderer2])
    ], AjfVideoDirective);
    return AjfVideoDirective;
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
let AjfCommonModule = /** @class */ (() => {
    let AjfCommonModule = class AjfCommonModule {
    };
    AjfCommonModule = __decorate([
        NgModule({
            declarations: [
                AjfDndDirective,
                AjfVideoDirective,
                ApplyStylesDirective,
                AutofocusDirective,
                FormatIfNumber,
                TranslateIfString,
            ],
            exports: [
                AjfDndDirective,
                AjfVideoDirective,
                ApplyStylesDirective,
                AutofocusDirective,
                FormatIfNumber,
                TranslateIfString,
            ],
        })
    ], AjfCommonModule);
    return AjfCommonModule;
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

export { AjfCommonModule, AjfDndDirective, AjfVideoDirective, ApplyStylesDirective, AutofocusDirective, FormatIfNumber, TranslateIfString };
//# sourceMappingURL=common.js.map
