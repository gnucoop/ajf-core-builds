import * as i0 from '@angular/core';
import { Directive, Input, EventEmitter, Output, Pipe, NgModule } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { TranslocoPipe } from '@ajf/core/transloco';

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
// eslint-disable-next-line
class ApplyStylesDirective {
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this._cssStyles = {};
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
            catch (e) { }
        });
    }
}
ApplyStylesDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ApplyStylesDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
ApplyStylesDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: ApplyStylesDirective, selector: "[applyStyles]", inputs: { applyStyles: "applyStyles" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: ApplyStylesDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[applyStyles]' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { applyStyles: [{
                type: Input
            }] } });

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
// eslint-disable-next-line
class AutofocusDirective {
    constructor(_el) {
        this._el = _el;
        this.appAutoFocus = false;
    }
    ngAfterContentInit() {
        this._el.nativeElement.focus();
    }
}
AutofocusDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AutofocusDirective, deps: [{ token: i0.ElementRef }], target: i0.ɵɵFactoryTarget.Directive });
AutofocusDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AutofocusDirective, selector: "[autoFocus]", inputs: { appAutoFocus: "appAutoFocus" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AutofocusDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[autoFocus]' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }]; }, propDecorators: { appAutoFocus: [{
                type: Input
            }] } });

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
const defaultOpts = {
    emptyString: 'Not specified',
    entriesDivider: ' - ',
    labelSuffix: ': ',
    valuesDivider: ', ',
};
const buildStringIdentifierOpts = (opts) => ({ ...defaultOpts, ...opts });
const buildStringIdentifier = (stringIdentifier, context, opts) => {
    const strings = { ...defaultOpts, ...opts };
    if (stringIdentifier == null) {
        return strings.emptyString;
    }
    const str = stringIdentifier.map(s => {
        const values = [];
        if (s.value != null && s.value.length > 0) {
            s.value.forEach(curValue => {
                const vp = curValue.split('.');
                let curContext = context;
                let val = null;
                vp.forEach(k => {
                    if (curContext[k] !== undefined) {
                        val = context[k];
                        curContext = context[k];
                    }
                });
                if (val != null && val instanceof Array && val.length > 0) {
                    val = val.map(v => `${v}`).join(', ');
                }
                if (val != null) {
                    values.push(`${val}`);
                }
            });
        }
        return `${s.label}: ${values.length > 0 ? values.join(', ') : strings.emptyString}`;
    });
    return str.join(' - ');
};

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
class AjfDndDirective {
    constructor() {
        this._file = new EventEmitter();
        this.file = this._file;
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
}
AjfDndDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDndDirective, deps: [], target: i0.ɵɵFactoryTarget.Directive });
AjfDndDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfDndDirective, selector: "[ajfDnd]", outputs: { file: "file" }, host: { listeners: { "dragover": "onDragOver($event)", "dragleave": "onDragLeave($event)", "drop": "onDrop($event)" }, properties: { "class.ajf-dnd-over": "over" } }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDndDirective, decorators: [{
            type: Directive,
            args: [{
                    selector: '[ajfDnd]',
                    // eslint-disable-next-line
                    host: {
                        '[class.ajf-dnd-over]': 'over',
                        '(dragover)': 'onDragOver($event)',
                        '(dragleave)': 'onDragLeave($event)',
                        '(drop)': 'onDrop($event)',
                    },
                }]
        }], propDecorators: { file: [{
                type: Output
            }] } });

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
class FormatIfNumber extends DecimalPipe {
    transform(value, digitsInfo, locale) {
        if (typeof value === 'number') {
            return super.transform(value, digitsInfo, locale);
        }
        else {
            return value;
        }
    }
}
FormatIfNumber.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: FormatIfNumber, deps: null, target: i0.ɵɵFactoryTarget.Pipe });
FormatIfNumber.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: FormatIfNumber, name: "ajfFormatIfNumber" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: FormatIfNumber, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfFormatIfNumber' }]
        }] });

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
class TranslateIfString extends TranslocoPipe {
    transform(query, ...args) {
        if (typeof query === 'string') {
            return super.transform(query, ...args);
        }
        else {
            return query;
        }
    }
}
TranslateIfString.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: TranslateIfString, deps: null, target: i0.ɵɵFactoryTarget.Pipe });
TranslateIfString.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: TranslateIfString, name: "ajfTranslateIfString" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: TranslateIfString, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfTranslateIfString' }]
        }] });

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
class AjfVideoDirective {
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
            navigator.mediaDevices
                .getUserMedia({ video: true })
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
}
AjfVideoDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfVideoDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
AjfVideoDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfVideoDirective, selector: "[ajfVideoDirective]", inputs: { source: "source" }, outputs: { isInit: "isInit" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfVideoDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ajfVideoDirective]' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { source: [{
                type: Input
            }], isInit: [{
                type: Output
            }] } });

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
class AjfCommonModule {
}
AjfCommonModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCommonModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfCommonModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCommonModule, declarations: [AjfDndDirective,
        AjfVideoDirective,
        ApplyStylesDirective,
        AutofocusDirective,
        FormatIfNumber,
        TranslateIfString], exports: [AjfDndDirective,
        AjfVideoDirective,
        ApplyStylesDirective,
        AutofocusDirective,
        FormatIfNumber,
        TranslateIfString] });
AjfCommonModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCommonModule });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfCommonModule, decorators: [{
            type: NgModule,
            args: [{
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
                }]
        }] });

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

/**
 * Generated bundle index. Do not edit.
 */

export { AjfCommonModule, AjfDndDirective, AjfVideoDirective, ApplyStylesDirective, AutofocusDirective, FormatIfNumber, TranslateIfString, buildStringIdentifier, buildStringIdentifierOpts };
//# sourceMappingURL=ajf-core-common.mjs.map
