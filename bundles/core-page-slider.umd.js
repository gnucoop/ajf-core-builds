(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('css-element-queries'), require('rxjs'), require('rxjs/operators'), require('@angular/animations'), require('@angular/cdk/coercion')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/page-slider', ['exports', '@angular/core', 'css-element-queries', 'rxjs', 'rxjs/operators', '@angular/animations', '@angular/cdk/coercion'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.pageSlider = {}), global.ng.core, global.cssElementQueries, global.rxjs, global.rxjs.operators, global.ng.animations, global.ng.cdk.coercion));
}(this, (function (exports, core, cssElementQueries, rxjs, operators, animations, coercion) { 'use strict';

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
    var AjfPageSliderItem = /** @class */ (function () {
        function AjfPageSliderItem(_el, _renderer) {
            var _this = this;
            this._el = _el;
            this._renderer = _renderer;
            this._scrollEvt = new core.EventEmitter();
            this.scroll = this._scrollEvt.asObservable();
            this._scrollX = 0;
            this._scrollY = 0;
            this._resizeEvent = new core.EventEmitter();
            this._resizeSub = rxjs.Subscription.EMPTY;
            this._resizeSensor = new cssElementQueries.ResizeSensor(_el.nativeElement, function () { return _this._onResize(); });
            this._resizeSub = this._resizeEvent
                .pipe(operators.debounceTime(300))
                .subscribe(function () { return _this._fixScrollOnResize(); });
        }
        AjfPageSliderItem.prototype.ngOnDestroy = function () {
            if (this._resizeSensor) {
                this._resizeSensor.detach();
            }
            this._resizeSub.unsubscribe();
            this._resizeEvent.complete();
        };
        AjfPageSliderItem.prototype.setScroll = function (dir, amount, _duration) {
            if (this._el == null || this.wrapper == null || amount === 0) {
                return false;
            }
            var el = this._el.nativeElement;
            var wrapper = this.wrapper.nativeElement;
            var containerSize, wrapperSize, currentScroll;
            if (dir === 'x') {
                containerSize = el.clientWidth;
                wrapperSize = wrapper.clientWidth;
                currentScroll = this._scrollX;
            }
            else {
                containerSize = el.clientHeight;
                wrapperSize = wrapper.clientHeight;
                currentScroll = this._scrollY;
            }
            var maxScroll = containerSize - wrapperSize;
            if (wrapperSize <= containerSize || (currentScroll === maxScroll && amount < 0) ||
                (currentScroll === 0 && amount > 0)) {
                return false;
            }
            if (amount < 0) {
                if (dir === 'x') {
                    this._scrollX = Math.max(maxScroll, this._scrollX + amount);
                }
                else {
                    this._scrollY = Math.max(maxScroll, this._scrollY + amount);
                }
            }
            else {
                if (dir === 'x') {
                    this._scrollX = Math.min(0, this._scrollX + amount);
                }
                else {
                    this._scrollY = Math.min(0, this._scrollY + amount);
                }
            }
            this._renderer.setStyle(wrapper, 'transform', "translate(" + this._scrollX + "px, " + this._scrollY + "px)");
            this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
            return true;
        };
        AjfPageSliderItem.prototype._onResize = function () {
            this._resizeEvent.emit();
        };
        AjfPageSliderItem.prototype._fixScrollOnResize = function () {
            if (this.content == null || this.wrapper == null) {
                return;
            }
            var content = this.content.nativeElement;
            var wrapper = this.wrapper.nativeElement;
            var maxScrollX = Math.min(0, content.clientWidth - wrapper.clientWidth);
            var maxScrollY = Math.min(0, content.clientHeight - wrapper.clientHeight);
            if (maxScrollX !== 0 || maxScrollY !== 0 || (maxScrollX === 0 && this._scrollX !== 0) ||
                (maxScrollY === 0 && this._scrollY !== 0)) {
                this._scrollX = Math.max(maxScrollX, this._scrollX - (content.scrollLeft != null ? content.scrollLeft : 0));
                this._scrollY =
                    Math.max(maxScrollY, this._scrollY - (content.scrollTop != null ? content.scrollTop : 0));
                content.scrollTop = content.scrollLeft = 0;
                this._renderer.setStyle(wrapper, 'transform', "translate(" + this._scrollX + "px, " + this._scrollY + "px)");
                this._scrollEvt.emit({ x: this._scrollX, y: this._scrollY });
            }
        };
        __decorate([
            core.ViewChild('wrapper', { static: true }),
            __metadata("design:type", core.ElementRef)
        ], AjfPageSliderItem.prototype, "wrapper", void 0);
        __decorate([
            core.ViewChild('content', { static: true }),
            __metadata("design:type", core.ElementRef)
        ], AjfPageSliderItem.prototype, "content", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", rxjs.Observable)
        ], AjfPageSliderItem.prototype, "scroll", void 0);
        AjfPageSliderItem = __decorate([
            core.Component({
                selector: 'ajf-page-slider-item',
                template: "<div #content class=\"ajf-page-slider-item-content\">\n  <div #wrapper class=\"ajf-page-slider-item-content-wrapper\">\n    <ng-content></ng-content>\n  </div>\n</div>\n",
                changeDetection: core.ChangeDetectionStrategy.OnPush,
                encapsulation: core.ViewEncapsulation.None,
                styles: ["ajf-page-slider-item{display:block;position:relative}ajf-page-slider-item .ajf-page-slider-item-content{position:absolute;top:0;right:0;bottom:0;left:0;padding:0;margin:0;display:flex;align-items:flex-start;justify-content:flex-start;overflow:hidden;box-sizing:border-box}ajf-page-slider-item .ajf-page-slider-item-content .ajf-page-slider-item-content-wrapper{flex:1 1 auto;display:flex;align-items:center;justify-content:center;min-width:100%;min-height:100%}\n"]
            }),
            __metadata("design:paramtypes", [core.ElementRef,
                core.Renderer2])
        ], AjfPageSliderItem);
        return AjfPageSliderItem;
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
    var AjfPageSlider = /** @class */ (function () {
        function AjfPageSlider(_animationBuilder, _cdr, _renderer) {
            var _this = this;
            this._animationBuilder = _animationBuilder;
            this._cdr = _cdr;
            this._renderer = _renderer;
            this._pageScrollFinish = new core.EventEmitter();
            this.pageScrollFinish = this._pageScrollFinish.asObservable();
            this._orientationChange = new core.EventEmitter();
            this.orientationChange = this._orientationChange.asObservable();
            this.duration = 300;
            this._orientation = 'horizontal';
            this._fixedOrientation = false;
            this._currentPage = -1;
            this._animating = false;
            this._pagesSub = rxjs.Subscription.EMPTY;
            this._mouseWheelEvt = new core.EventEmitter();
            this._mouseWheelSub = rxjs.Subscription.EMPTY;
            this._mouseWheelSub =
                this._mouseWheelEvt
                    .pipe(operators.map(function (evt) {
                    var page = _this._getCurrentPage();
                    if (page == null) {
                        return null;
                    }
                    return { evt: evt, res: page.setScroll(evt.dir, evt.amount, 0) };
                }), operators.filter(function (r) { return r != null && r.res === false &&
                    ((r.evt.dir === 'x' && _this.orientation === 'horizontal') ||
                        (r.evt.dir === 'y' && _this.orientation === 'vertical')); }), operators.map(function (r) { return r.evt.amount; }), operators.scan(function (acc, val) {
                    if (acc === 0) {
                        return val;
                    }
                    if (acc / Math.abs(acc) !== val / Math.abs(val)) {
                        return 0;
                    }
                    return acc + val;
                }, 0), operators.filter(function (val) { return !_this._animating && Math.abs(val) > 150; }), operators.throttleTime(1500))
                    .subscribe(function (val) {
                    _this._mouseWheelEvt.emit({ dir: 'x', amount: val > 0 ? -1 : +1 });
                    _this.slide({ dir: val > 0 ? 'back' : 'forward' });
                });
        }
        Object.defineProperty(AjfPageSlider.prototype, "orientation", {
            get: function () {
                return this._orientation;
            },
            set: function (orientation) {
                if (this._orientation !== orientation) {
                    this._orientation = orientation;
                    this._cdr.markForCheck();
                    this._updateSize();
                    this._restoreCurrentPage();
                    this._orientationChange.emit(this._orientation);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfPageSlider.prototype, "fixedOrientation", {
            get: function () {
                return this._fixedOrientation;
            },
            set: function (fixedOrientation) {
                this._fixedOrientation = coercion.coerceBooleanProperty(fixedOrientation);
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfPageSlider.prototype, "currentPage", {
            get: function () {
                return this._currentPage;
            },
            set: function (currentPage) {
                if (this.pages == null || currentPage < 0 || currentPage >= this.pages.length) {
                    return;
                }
                this._currentPage = currentPage;
                this._doSlide();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfPageSlider.prototype, "hideNavigationButtons", {
            get: function () {
                return this._hideNavigationButtons;
            },
            set: function (hnb) {
                this._hideNavigationButtons = coercion.coerceBooleanProperty(hnb);
                this._cdr.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        AjfPageSlider.prototype.ngAfterContentInit = function () {
            var _this = this;
            this._onSlidesChange();
            this._pagesSub = this.pages.changes.subscribe(function () { return _this._onSlidesChange(); });
        };
        AjfPageSlider.prototype.ngOnDestroy = function () {
            this._pagesSub.unsubscribe();
            this._mouseWheelEvt.complete();
            this._mouseWheelSub.unsubscribe();
            this._orientationChange.complete();
        };
        AjfPageSlider.prototype.switchOrientation = function () {
            if (this._orientation === 'horizontal') {
                this.orientation = 'vertical';
            }
            else {
                this.orientation = 'horizontal';
            }
        };
        AjfPageSlider.prototype.slide = function (opts) {
            if (this.pages == null) {
                return;
            }
            if (opts.dir) {
                if (opts.dir === 'back' || opts.dir === 'up' || opts.dir === 'left') {
                    this._slideBack();
                }
                else if (opts.dir === 'forward' || opts.dir === 'down' || opts.dir === 'right') {
                    this._slideForward();
                }
            }
            else if (opts.to) {
                this._slideTo(opts.to);
            }
        };
        AjfPageSlider.prototype.onMouseWheel = function (event) {
            var evt = event;
            if (evt.deltaX == null || evt.deltaY == null) {
                return;
            }
            var absDeltaX = Math.abs(evt.deltaX);
            var absDeltaY = Math.abs(evt.deltaY);
            if (absDeltaX === 0 && absDeltaY === 0) {
                return;
            }
            if (absDeltaX > absDeltaY) {
                this._mouseWheelEvt.emit({ dir: 'x', amount: -evt.deltaX });
            }
            else {
                this._mouseWheelEvt.emit({ dir: 'y', amount: -evt.deltaY });
            }
        };
        AjfPageSlider.prototype.onTouchStart = function (evt) {
            if (evt.touches == null || evt.touches.length === 0 || this._animating) {
                return;
            }
            this._currentOrigin = { x: evt.touches[0].clientX, y: evt.touches[0].clientY, time: +new Date() };
        };
        AjfPageSlider.prototype.onTouchMove = function (evt) {
            if (evt.touches == null || evt.touches.length === 0 || this._currentOrigin == null ||
                this._animating) {
                return;
            }
            var point = { x: evt.touches[0].clientX, y: evt.touches[0].clientY, time: +new Date() };
            var movement = this._calculateMovement(point);
            this._currentOrigin = point;
            if (movement.velocityX === 0 && movement.velocityY === 0) {
                return;
            }
            var absVelocityX = Math.abs(movement.velocityX);
            var absVelocityY = Math.abs(movement.velocityY);
            if (absVelocityX > absVelocityY) {
                if (this.orientation === 'horizontal' && absVelocityX > 1.5 &&
                    Math.abs(movement.deltaX) > 50) {
                    this._resetCurrentOrigin();
                    this.slide({ dir: movement.velocityX < 0 ? 'forward' : 'back' });
                }
                else {
                    var page = this._getCurrentPage();
                    if (page != null) {
                        page.setScroll('x', movement.deltaX, movement.deltaTime);
                    }
                }
            }
            else {
                if (this.orientation === 'vertical' && absVelocityY > 1.5 && Math.abs(movement.deltaY) > 50) {
                    this._resetCurrentOrigin();
                    this.slide({ dir: movement.velocityY < 0 ? 'forward' : 'back' });
                }
                else {
                    var page = this._getCurrentPage();
                    if (page != null) {
                        page.setScroll('y', movement.deltaY, movement.deltaTime);
                    }
                }
            }
        };
        AjfPageSlider.prototype.onTouchEnd = function () {
            this._resetCurrentOrigin();
        };
        AjfPageSlider.prototype.isCurrentPageLong = function () {
            var curPage = this._getCurrentPage();
            if (curPage == null) {
                return false;
            }
            return curPage.wrapper.nativeElement.clientHeight > curPage.content.nativeElement.clientHeight;
        };
        AjfPageSlider.prototype._resetCurrentOrigin = function () {
            this._currentOrigin = null;
        };
        AjfPageSlider.prototype._getCurrentPage = function () {
            if (this.pages == null || this.currentPage < 0 || this.currentPage >= this.pages.length) {
                return null;
            }
            return this.pages.toArray()[this.currentPage];
        };
        AjfPageSlider.prototype._calculateMovement = function (point) {
            var deltaX = point.x - this._currentOrigin.x;
            var deltaY = point.y - this._currentOrigin.y;
            var deltaTime = point.time - this._currentOrigin.time;
            return {
                velocityX: deltaX / deltaTime,
                deltaX: deltaX,
                velocityY: deltaY / deltaTime,
                deltaY: deltaY,
                deltaTime: deltaTime,
            };
        };
        AjfPageSlider.prototype._slideBack = function () {
            if (this._currentPage <= 0) {
                return;
            }
            this.currentPage = this._currentPage - 1;
        };
        AjfPageSlider.prototype._slideForward = function () {
            if (this._currentPage >= this.pages.length) {
                return;
            }
            this.currentPage = this._currentPage + 1;
        };
        AjfPageSlider.prototype._slideTo = function (page) {
            if (page >= 0 && page < this.pages.length) {
                this.currentPage = page;
            }
        };
        AjfPageSlider.prototype._doSlide = function (immediate) {
            var _this = this;
            if (immediate === void 0) { immediate = false; }
            if (this.body == null || this.pages == null || this._animating) {
                return;
            }
            this._animating = true;
            var animation = this._animationBuilder.build(animations.animate(immediate ? 0 : this.duration, animations.style({ transform: this._getCurrentTranslation() })));
            var player = animation.create(this.body.nativeElement);
            player.onDone(function () {
                _this._animating = false;
                _this._pageScrollFinish.emit();
            });
            player.play();
        };
        AjfPageSlider.prototype._getCurrentTranslation = function () {
            var slideSize = 100 / this.pages.length;
            var position = this._currentPage === -1 ? 0 : this._currentPage * slideSize;
            var translation = this._orientation === 'vertical' ? 'Y' : 'X';
            return "translate" + translation + "(-" + position + "%)";
        };
        AjfPageSlider.prototype._getProps = function () {
            if (this._orientation === 'vertical') {
                return { prop: 'height', removeProp: 'width' };
            }
            return { prop: 'width', removeProp: 'height' };
        };
        AjfPageSlider.prototype._onSlidesChange = function () {
            this._updateSize();
        };
        AjfPageSlider.prototype._updateSize = function () {
            if (this.body == null || this.pages == null) {
                return;
            }
            var _a = this._getProps(), prop = _a.prop, removeProp = _a.removeProp;
            this._renderer.setStyle(this.body.nativeElement, prop, this.pages.length * 100 + "%");
            this._renderer.setStyle(this.body.nativeElement, removeProp, null);
            var curPage;
            if (this.pages.length === 0) {
                curPage = -1;
            }
            else if (this._currentPage === -1) {
                curPage = 0;
            }
            else if (this._currentPage >= this.pages.length) {
                curPage = this.pages.length - 1;
            }
            else {
                curPage = this._currentPage;
            }
            this._currentPage = curPage;
            this._restoreCurrentPage();
        };
        AjfPageSlider.prototype._restoreCurrentPage = function () {
            this._doSlide(true);
        };
        __decorate([
            core.ViewChild('body', { static: true }),
            __metadata("design:type", core.ElementRef)
        ], AjfPageSlider.prototype, "body", void 0);
        __decorate([
            core.ContentChildren(AjfPageSliderItem, { descendants: true }),
            __metadata("design:type", core.QueryList)
        ], AjfPageSlider.prototype, "pages", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", rxjs.Observable)
        ], AjfPageSlider.prototype, "pageScrollFinish", void 0);
        __decorate([
            core.Output(),
            __metadata("design:type", rxjs.Observable)
        ], AjfPageSlider.prototype, "orientationChange", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", Object)
        ], AjfPageSlider.prototype, "duration", void 0);
        __decorate([
            core.Input(),
            __metadata("design:type", String),
            __metadata("design:paramtypes", [String])
        ], AjfPageSlider.prototype, "orientation", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], AjfPageSlider.prototype, "fixedOrientation", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Number),
            __metadata("design:paramtypes", [Number])
        ], AjfPageSlider.prototype, "currentPage", null);
        __decorate([
            core.Input(),
            __metadata("design:type", Boolean),
            __metadata("design:paramtypes", [Boolean])
        ], AjfPageSlider.prototype, "hideNavigationButtons", null);
        AjfPageSlider = __decorate([
            core.Directive(),
            __metadata("design:paramtypes", [animations.AnimationBuilder, core.ChangeDetectorRef,
                core.Renderer2])
        ], AjfPageSlider);
        return AjfPageSlider;
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
    var AjfPageSliderModule = /** @class */ (function () {
        function AjfPageSliderModule() {
        }
        AjfPageSliderModule = __decorate([
            core.NgModule({
                declarations: [
                    AjfPageSliderItem,
                ],
                exports: [
                    AjfPageSliderItem,
                ]
            })
        ], AjfPageSliderModule);
        return AjfPageSliderModule;
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

    exports.AjfPageSlider = AjfPageSlider;
    exports.AjfPageSliderItem = AjfPageSliderItem;
    exports.AjfPageSliderModule = AjfPageSliderModule;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-page-slider.umd.js.map
