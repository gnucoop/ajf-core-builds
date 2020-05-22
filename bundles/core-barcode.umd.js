(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@zxing/library'), require('rxjs'), require('rxjs/operators')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/barcode', ['exports', '@angular/core', '@zxing/library', 'rxjs', 'rxjs/operators'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.barcode = {}), global.ng.core, global.zxing, global.rxjs, global.rxjs.operators));
}(this, (function (exports, core, library, rxjs, operators) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */

    var extendStatics = function(d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };

    function __extends(d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }

    var __assign = function() {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };

    function __rest(s, e) {
        var t = {};
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
            t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }

    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
        else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }

    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); }
    }

    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(metadataKey, metadataValue);
    }

    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
            function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }

    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f) throw new TypeError("Generator is already executing.");
            while (_) try {
                if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
                if (y = 0, t) op = [op[0] & 2, t.value];
                switch (op[0]) {
                    case 0: case 1: t = op; break;
                    case 4: _.label++; return { value: op[1], done: false };
                    case 5: _.label++; y = op[1]; op = [0]; continue;
                    case 7: op = _.ops.pop(); _.trys.pop(); continue;
                    default:
                        if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                        if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                        if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                        if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                        if (t[2]) _.ops.pop();
                        _.trys.pop(); continue;
                }
                op = body.call(thisArg, _);
            } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
            if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
        }
    }

    var __createBinding = Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    });

    function __exportStar(m, exports) {
        for (var p in m) if (p !== "default" && !exports.hasOwnProperty(p)) __createBinding(exports, m, p);
    }

    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m) return m.call(o);
        if (o && typeof o.length === "number") return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }

    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    };

    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }

    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n]) i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try { step(g[n](v)); } catch (e) { settle(q[0][3], e); } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]); }
    }

    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }

    function __asyncValues(o) {
        if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function(v) { resolve({ value: v, done: d }); }, reject); }
    }

    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
        return cooked;
    };

    var __setModuleDefault = Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    };

    function __importStar(mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }

    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }

    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }

    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

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
    var AjfBarcode = /** @class */ (function () {
        function AjfBarcode(_cdr, _renderer) {
            var _this = this;
            this._cdr = _cdr;
            this._renderer = _renderer;
            this.codeReader = new library.BrowserBarcodeReader();
            this.startDetection = new core.EventEmitter();
            this.startCalculation = new core.EventEmitter();
            this._startDetectionSub = rxjs.Subscription.EMPTY;
            this._startCalculationSub = rxjs.Subscription.EMPTY;
            /**
             * implement the control form value.
             * rappresent the barcode value.
             *
             * @memberof AjfBarcode
             */
            this._barcodeValue = '';
            this._toggle = 'drop';
            this._onChangeCallback = function (_) { };
            this._onTouchedCallback = function () { };
            this._init();
            this._startDetectionSub = this.startDetection.asObservable()
                .pipe(operators.debounceTime(300), operators.switchMap(function () {
                var data = _this._getDataFromVideo(_this.videoSource);
                return _this._readBarcodeFromData(data);
            }), operators.catchError(function () {
                return rxjs.of({});
            }))
                .subscribe(function (result) {
                if (!result.text) {
                    _this.startDetection.emit();
                }
                else {
                    _this.toggle = 'drop';
                    _this.value = result.text;
                }
            });
            this._startCalculationSub = this.startCalculation.asObservable()
                .pipe(operators.switchMap(function (data) {
                return _this._readBarcodeFromData(data);
            }))
                .subscribe(function (result) {
                if (result.text) {
                    _this.toggle = 'drop';
                    _this.value = result.text;
                }
            });
        }
        Object.defineProperty(AjfBarcode.prototype, "canvasCtx", {
            get: function () {
                return this._canvas.getContext('2d');
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfBarcode.prototype, "videoSource", {
            get: function () {
                return this._video;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfBarcode.prototype, "value", {
            get: function () {
                return this._barcodeValue;
            },
            set: function (value) {
                if (this._barcodeValue !== value) {
                    this._barcodeValue = value;
                    this._cdr.detectChanges();
                    this._onChangeCallback(value);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfBarcode.prototype, "toggle", {
            get: function () {
                return this._toggle;
            },
            set: function (val) {
                this._toggle = val;
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        AjfBarcode.prototype.reset = function () {
            this.value = '';
            this._onTouchedCallback();
        };
        AjfBarcode.prototype.takeSnapshot = function () {
            this.startDetection.emit();
        };
        AjfBarcode.prototype.onSelectFile = function (evt) {
            if (evt == null || evt.target == null) {
                return;
            }
            var target = evt.target;
            var files = target.files;
            this._onSelect(files);
        };
        AjfBarcode.prototype.onSelectDrop = function (files) {
            if (files == null) {
                return;
            }
            this._onSelect(files);
        };
        /** ControlValueAccessor implements */
        AjfBarcode.prototype.writeValue = function (value) {
            this._barcodeValue = value;
        };
        AjfBarcode.prototype.registerOnChange = function (fn) {
            this._onChangeCallback = fn;
        };
        AjfBarcode.prototype.registerOnTouched = function (fn) {
            this._onTouchedCallback = fn;
        };
        AjfBarcode.prototype.ngOnDestroy = function () {
            this._startCalculationSub.unsubscribe();
            this._startDetectionSub.unsubscribe();
        };
        AjfBarcode.prototype._init = function () {
            this._initCanvas();
            this._initVideo();
        };
        AjfBarcode.prototype._initCanvas = function () {
            this._canvas = this._renderer.createElement('canvas');
            this._canvas.height = 480;
            this._canvas.width = 640;
        };
        AjfBarcode.prototype._initVideo = function () {
            this._video = this._renderer.createElement('video');
            this._video.height = 480;
            this._video.width = 640;
        };
        AjfBarcode.prototype._onSelect = function (files) {
            var _this = this;
            if (files != null && files.length > 0 && files[0]) {
                var reader = new FileReader();
                reader.readAsDataURL(files[0]);
                reader.onload = function (ev) {
                    var data = ev.target.result;
                    _this.startCalculation.emit(data);
                    _this._cdr.detectChanges();
                };
            }
        };
        /**
         * write a frame of HTMLVideoElement into HTMLCanvasElement and
         * return the result of toDataURL('image/png')
         *
         * @param video
         * @memberof AjfBarcode
         */
        AjfBarcode.prototype._getDataFromVideo = function (video) {
            this.canvasCtx.drawImage(video, 0, 0, 640, 480);
            return this._canvas.toDataURL('image/png');
        };
        /**
         * call @zxing library method with HTMLImageElement as parameter
         *
         * @param img
         * @memberof AjfBarcode
         */
        AjfBarcode.prototype._readBarcodeFromImage = function (img) {
            return rxjs.from(this.codeReader.decodeFromImage(img)).pipe(operators.catchError(function (e) { return rxjs.of(e); }));
        };
        /**
         * build an image by data and call _readBarcodeFromImage
         *
         * @param data
         * @memberof AjfBarcode
         */
        AjfBarcode.prototype._readBarcodeFromData = function (data) {
            var image = this._createImage(data);
            return this._readBarcodeFromImage(image);
        };
        /**
         * build an image by data
         *
         * @param data
         * @memberof AjfBarcode
         */
        AjfBarcode.prototype._createImage = function (data) {
            var image = this._renderer.createElement('img');
            if (data !== null && typeof data === 'string') {
                image.src = data;
            }
            return image;
        };
        AjfBarcode = __decorate([
            core.Directive(),
            __metadata("design:paramtypes", [core.ChangeDetectorRef, core.Renderer2])
        ], AjfBarcode);
        return AjfBarcode;
    }());

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

    exports.AjfBarcode = AjfBarcode;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-barcode.umd.js.map
