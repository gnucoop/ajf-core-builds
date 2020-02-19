import { Directive, ElementRef, Renderer2, Input, EventEmitter, Output, Pipe, NgModule } from '@angular/core';
import { __extends, __spread } from 'tslib';
import { DecimalPipe } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
var ApplyStylesDirective = /** @class */ (function () {
    function ApplyStylesDirective(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
    }
    Object.defineProperty(ApplyStylesDirective.prototype, "applyStyles", {
        set: function (cssStyles) {
            if (cssStyles != null && this._cssStyles !== cssStyles) {
                this._cssStyles = cssStyles;
                this._updateStyles();
            }
        },
        enumerable: true,
        configurable: true
    });
    ApplyStylesDirective.prototype._updateStyles = function () {
        var _this = this;
        if (this._cssStyles == null) {
            return;
        }
        Object.keys(this._cssStyles).forEach(function (style) {
            try {
                _this._renderer.setStyle(_this._el.nativeElement, style, "" + _this._cssStyles[style]);
            }
            catch (e) { }
        });
    };
    ApplyStylesDirective.decorators = [
        { type: Directive, args: [{ selector: '[applyStyles]' },] }
    ];
    /** @nocollapse */
    ApplyStylesDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    ApplyStylesDirective.propDecorators = {
        applyStyles: [{ type: Input }]
    };
    return ApplyStylesDirective;
}());

/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
var AutofocusDirective = /** @class */ (function () {
    function AutofocusDirective(_el) {
        this._el = _el;
    }
    AutofocusDirective.prototype.ngAfterContentInit = function () {
        this._el.nativeElement.focus();
    };
    AutofocusDirective.decorators = [
        { type: Directive, args: [{ selector: '[autoFocus]' },] }
    ];
    /** @nocollapse */
    AutofocusDirective.ctorParameters = function () { return [
        { type: ElementRef }
    ]; };
    AutofocusDirective.propDecorators = {
        appAutoFocus: [{ type: Input }]
    };
    return AutofocusDirective;
}());

/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
var AjfDndDirective = /** @class */ (function () {
    function AjfDndDirective() {
        this.file = new EventEmitter();
        this.background = '#eee';
    }
    AjfDndDirective.prototype.onDragOver = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#999';
    };
    AjfDndDirective.prototype.onDragLeave = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '#eee';
    };
    AjfDndDirective.prototype.onDrop = function (evt) {
        evt.preventDefault();
        evt.stopPropagation();
        var files = evt.dataTransfer.files;
        if (files.length > 0) {
            this.background = '#eee';
            this.file.emit(files);
        }
    };
    AjfDndDirective.decorators = [
        { type: Directive, args: [{
                    selector: '[ajfDnd]',
                    host: {
                        '[style.background]': 'background',
                        '(dragover)': 'onDragOver($event)',
                        '(dragleave)': 'onDragLeave($event)',
                        '(drop)': 'onDrop($event)',
                    }
                },] }
    ];
    AjfDndDirective.propDecorators = {
        file: [{ type: Output }]
    };
    return AjfDndDirective;
}());

/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
var FormatIfNumber = /** @class */ (function (_super) {
    __extends(FormatIfNumber, _super);
    function FormatIfNumber() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    FormatIfNumber.prototype.transform = function (value, digitsInfo, locale) {
        if (typeof value === 'number') {
            return _super.prototype.transform.call(this, value, digitsInfo, locale);
        }
        else {
            return value;
        }
    };
    FormatIfNumber.decorators = [
        { type: Pipe, args: [{ name: 'ajfFormatIfNumber' },] }
    ];
    return FormatIfNumber;
}(DecimalPipe));

/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
var TranslateIfString = /** @class */ (function (_super) {
    __extends(TranslateIfString, _super);
    function TranslateIfString() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    TranslateIfString.prototype.transform = function (query) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        if (typeof query === 'string') {
            return _super.prototype.transform.apply(this, __spread([query], args));
        }
        else {
            return query;
        }
    };
    TranslateIfString.decorators = [
        { type: Pipe, args: [{ name: 'ajfTranslateIfString' },] }
    ];
    return TranslateIfString;
}(TranslatePipe));

/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
var AjfVideoDirective = /** @class */ (function () {
    function AjfVideoDirective(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.isInit = new EventEmitter();
    }
    Object.defineProperty(AjfVideoDirective.prototype, "source", {
        get: function () { return this._source; },
        set: function (source) {
            this._source = source;
            this._initCam();
        },
        enumerable: true,
        configurable: true
    });
    AjfVideoDirective.prototype._initCam = function () {
        var _this = this;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                _this._source.srcObject = stream;
                _this._source.play();
            })
                .catch(function (err) {
                console.log(err);
            });
        }
    };
    AjfVideoDirective.prototype.ngAfterViewInit = function () {
        this._renderer.appendChild(this._el.nativeElement, this._source);
        this.isInit.emit();
    };
    AjfVideoDirective.decorators = [
        { type: Directive, args: [{ selector: '[ajfVideoDirective]' },] }
    ];
    /** @nocollapse */
    AjfVideoDirective.ctorParameters = function () { return [
        { type: ElementRef },
        { type: Renderer2 }
    ]; };
    AjfVideoDirective.propDecorators = {
        source: [{ type: Input }],
        isInit: [{ type: Output }]
    };
    return AjfVideoDirective;
}());

/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
var AjfCommonModule = /** @class */ (function () {
    function AjfCommonModule() {
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
    return AjfCommonModule;
}());

/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
