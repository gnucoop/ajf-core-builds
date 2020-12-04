import { Directive, ElementRef, Renderer2, Input, EventEmitter, Output, Pipe, NgModule } from '@angular/core';
import 'rxjs';
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
class ApplyStylesDirective {
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
}
ApplyStylesDirective.decorators = [
    { type: Directive, args: [{ selector: '[applyStyles]' },] }
];
ApplyStylesDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
ApplyStylesDirective.propDecorators = {
    applyStyles: [{ type: Input }]
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
class AutofocusDirective {
    constructor(_el) {
        this._el = _el;
    }
    ngAfterContentInit() {
        this._el.nativeElement.focus();
    }
}
AutofocusDirective.decorators = [
    { type: Directive, args: [{ selector: '[autoFocus]' },] }
];
AutofocusDirective.ctorParameters = () => [
    { type: ElementRef }
];
AutofocusDirective.propDecorators = {
    appAutoFocus: [{ type: Input }]
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
const buildStringIdentifier = (stringIdentifier, context, emptyString = '') => {
    if (stringIdentifier == null) {
        return emptyString;
    }
    const str = stringIdentifier.map(s => {
        const values = [];
        if (s.value != null && s.value.length > 0) {
            s.value.forEach(curValue => {
                let val = null;
                const vp = curValue.split('.');
                vp.forEach(k => {
                    if (context[k] !== undefined) {
                        val = context[k];
                    }
                });
                if (val != null && val instanceof Array &&
                    val.length > 0) {
                    val = val.join(', ');
                }
                if (val != null) {
                    values.push(`${val}`);
                }
            });
        }
        return `${s.label}: ${values.length > 0 ? values.join(', ') : emptyString}`;
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
AjfDndDirective.decorators = [
    { type: Directive, args: [{
                selector: '[ajfDnd]',
                host: {
                    '[class.ajf-dnd-over]': 'over',
                    '(dragover)': 'onDragOver($event)',
                    '(dragleave)': 'onDragLeave($event)',
                    '(drop)': 'onDrop($event)',
                }
            },] }
];
AjfDndDirective.propDecorators = {
    file: [{ type: Output }]
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
FormatIfNumber.decorators = [
    { type: Pipe, args: [{ name: 'ajfFormatIfNumber' },] }
];

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
class TranslateIfString extends TranslatePipe {
    transform(query, ...args) {
        if (typeof query === 'string') {
            return super.transform(query, ...args);
        }
        else {
            return query;
        }
    }
}
TranslateIfString.decorators = [
    { type: Pipe, args: [{ name: 'ajfTranslateIfString' },] }
];

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
}
AjfVideoDirective.decorators = [
    { type: Directive, args: [{ selector: '[ajfVideoDirective]' },] }
];
AjfVideoDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 }
];
AjfVideoDirective.propDecorators = {
    source: [{ type: Input }],
    isInit: [{ type: Output }]
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
class AjfCommonModule {
}
AjfCommonModule.decorators = [
    { type: NgModule, args: [{
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
            },] }
];

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

export { AjfCommonModule, AjfDndDirective, AjfVideoDirective, ApplyStylesDirective, AutofocusDirective, FormatIfNumber, TranslateIfString, buildStringIdentifier };
//# sourceMappingURL=common.js.map
