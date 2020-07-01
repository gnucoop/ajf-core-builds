(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@ajf/core/utils'), require('esprima'), require('@ajf/core/models'), require('date-fns'), require('@angular/cdk/coercion'), require('@ajf/core/page-slider'), require('@ajf/core/common'), require('@ajf/core/file-input'), require('@angular/common'), require('@angular/common/http'), require('@angular/platform-browser')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/forms', ['exports', '@angular/core', '@angular/forms', 'rxjs', 'rxjs/operators', '@ajf/core/utils', 'esprima', '@ajf/core/models', 'date-fns', '@angular/cdk/coercion', '@ajf/core/page-slider', '@ajf/core/common', '@ajf/core/file-input', '@angular/common', '@angular/common/http', '@angular/platform-browser'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.forms = {}), global.ng.core, global.ng.forms, global.rxjs, global.rxjs.operators, global.ng.core.utils, global.esprima, global.ng.core.models, global.dateFns, global.ng.cdk.coercion, global.ng.core.pageSlider, global.ng.core.common, global.ng.core.fileInput, global.ng.common, global.ng.common.http, global.ng.platformBrowser));
}(this, (function (exports, core, forms, rxjs, operators, utils, esprima, models, dateFns, coercion, pageSlider, common, fileInput, common$1, http, platformBrowser) { 'use strict';

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
    var AjfAsFieldInstancePipe = /** @class */ (function () {
        function AjfAsFieldInstancePipe() {
        }
        AjfAsFieldInstancePipe.prototype.transform = function (instance) {
            return instance;
        };
        AjfAsFieldInstancePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfAsFieldInstance' },] }
        ];
        return AjfAsFieldInstancePipe;
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
    var AjfAsRepeatingSlideInstancePipe = /** @class */ (function () {
        function AjfAsRepeatingSlideInstancePipe() {
        }
        AjfAsRepeatingSlideInstancePipe.prototype.transform = function (instance) {
            return instance;
        };
        AjfAsRepeatingSlideInstancePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfAsRepeatingSlideInstance' },] }
        ];
        return AjfAsRepeatingSlideInstancePipe;
    }());

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
    (function (AjfFieldType) {
        AjfFieldType[AjfFieldType["String"] = 0] = "String";
        AjfFieldType[AjfFieldType["Text"] = 1] = "Text";
        AjfFieldType[AjfFieldType["Number"] = 2] = "Number";
        AjfFieldType[AjfFieldType["Boolean"] = 3] = "Boolean";
        AjfFieldType[AjfFieldType["SingleChoice"] = 4] = "SingleChoice";
        AjfFieldType[AjfFieldType["MultipleChoice"] = 5] = "MultipleChoice";
        AjfFieldType[AjfFieldType["Formula"] = 6] = "Formula";
        AjfFieldType[AjfFieldType["Empty"] = 7] = "Empty";
        AjfFieldType[AjfFieldType["Date"] = 8] = "Date";
        AjfFieldType[AjfFieldType["DateInput"] = 9] = "DateInput";
        AjfFieldType[AjfFieldType["Time"] = 10] = "Time";
        AjfFieldType[AjfFieldType["Table"] = 11] = "Table";
        AjfFieldType[AjfFieldType["Geolocation"] = 12] = "Geolocation";
        AjfFieldType[AjfFieldType["Barcode"] = 13] = "Barcode";
        AjfFieldType[AjfFieldType["File"] = 14] = "File";
        AjfFieldType[AjfFieldType["Image"] = 15] = "Image";
        AjfFieldType[AjfFieldType["VideoUrl"] = 16] = "VideoUrl";
        AjfFieldType[AjfFieldType["LENGTH"] = 17] = "LENGTH";
    })(exports.AjfFieldType || (exports.AjfFieldType = {}));

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
    (function (AjfNodeType) {
        AjfNodeType[AjfNodeType["AjfField"] = 0] = "AjfField";
        AjfNodeType[AjfNodeType["AjfFieldNodeLink"] = 1] = "AjfFieldNodeLink";
        AjfNodeType[AjfNodeType["AjfNodeGroup"] = 2] = "AjfNodeGroup";
        AjfNodeType[AjfNodeType["AjfSlide"] = 3] = "AjfSlide";
        AjfNodeType[AjfNodeType["AjfRepeatingSlide"] = 4] = "AjfRepeatingSlide";
        AjfNodeType[AjfNodeType["LENGTH"] = 5] = "LENGTH";
    })(exports.AjfNodeType || (exports.AjfNodeType = {}));

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
    function initChoicesOrigin(origin) {
        if (origin.type === 'fixed') {
            return Promise.resolve();
        }
        if (origin.type === 'function') {
            var fo = origin;
            fo.choices = fo.generator();
            return Promise.resolve();
        }
        if (origin.type === 'promise') {
            var po_1 = origin;
            return po_1.generator.then(function (choices) { return po_1.choices = choices; }).then();
        }
        if (origin.type === 'observable') {
            var obso_1 = origin;
            if (obso_1.generator != null) {
                obso_1.choices = [];
                return new Promise(function (res) {
                    obso_1.generator.subscribe(function (c) { return obso_1.choices.push(c); }, function () { }, function () { return res(); });
                });
            }
        }
        if (origin.type === 'observableArray') {
            var aoo_1 = origin;
            if (aoo_1.generator != null) {
                aoo_1.choices = [];
                return new Promise(function (res) {
                    aoo_1.generator.subscribe(function (choices) {
                        aoo_1.choices = choices;
                        res();
                    });
                });
            }
        }
        return Promise.resolve();
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
    function isFieldWithChoices(field) {
        return field.fieldType === exports.AjfFieldType.SingleChoice ||
            field.fieldType === exports.AjfFieldType.MultipleChoice;
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
    function isField(node) {
        return node != null && node.nodeType === exports.AjfNodeType.AjfField;
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
    function isFieldInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isField(nodeInstance.node);
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
    function isFieldWithChoicesInstance(nodeInstance) {
        return nodeInstance != null && isFieldInstance(nodeInstance) &&
            isFieldWithChoices(nodeInstance.node);
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
    function isTableField(field) {
        return field.fieldType === exports.AjfFieldType.Table;
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
    function isTableFieldInstance(nodeInstance) {
        return nodeInstance != null && isFieldInstance(nodeInstance) &&
            isTableField(nodeInstance.node);
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
    function updateConditionalBranches(instance, context) {
        var conditionalBranches = instance.conditionalBranches;
        if (conditionalBranches != null) {
            var oldBranch = instance.verifiedBranch;
            var idx = 0;
            var found = false;
            while (idx < conditionalBranches.length && !found) {
                var verified = models.evaluateExpression(conditionalBranches[idx].condition, context);
                if (verified) {
                    found = true;
                    if (idx !== instance.verifiedBranch) {
                        instance.verifiedBranch = idx;
                    }
                }
                idx++;
            }
            if (oldBranch !== instance.verifiedBranch) {
                return true;
            }
        }
        return false;
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
    function updateVisibility(instance, context, branchVisibility) {
        if (branchVisibility === void 0) { branchVisibility = true; }
        if (instance.visibility == null) {
            instance.visible = false;
            return false;
        }
        var visibility = instance.visibility;
        var oldVisibility = instance.visible;
        var newVisibility = branchVisibility && models.evaluateExpression(visibility.condition, context);
        if (newVisibility !== instance.visible) {
            instance.visible = newVisibility;
        }
        return oldVisibility !== newVisibility;
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
    function nodeInstanceSuffix(instance) {
        if (instance.prefix == null || instance.prefix.length == 0) {
            return '';
        }
        return "__" + instance.prefix.join('__');
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
    function nodeInstanceCompleteName(instance) {
        return instance != null && instance.node != null ?
            "" + instance.node.name + nodeInstanceSuffix(instance) :
            '';
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
    /**
     * update the relative instance value and the context
     * if !editable evaluate expression once one time and flag changed is false
     */
    function updateFormula(instance, context) {
        var formula = instance.formula;
        var editable = instance.node.editable;
        if (formula != null && instance.visible && (!editable || (editable && instance.value == null))) {
            var newValue = models.evaluateExpression(formula.formula, context);
            var oldValue = instance.value;
            if (newValue !== instance.value) {
                instance.value = newValue;
                context[nodeInstanceCompleteName(instance)] = instance.value;
                context.$value = instance.value;
            }
            return { changed: newValue !== oldValue, value: newValue };
        }
        return { changed: false, value: instance.value };
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
    function updateNextSlideCondition(instance, context) {
        if (instance.nextSlideCondition != null) {
            return models.evaluateExpression(instance.nextSlideCondition.condition, context);
        }
        return false;
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
    function evaluateValidation(validation, context, forceFormula) {
        return {
            result: models.evaluateExpression(validation.condition, context, forceFormula),
            error: validation.errorMessage,
            clientValidation: validation.clientValidation,
        };
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
    function evaluateValidationConditions(validation, context) {
        var res = [];
        validation.conditions.forEach(function (cond) {
            res.push(evaluateValidation(cond, context));
        });
        return res;
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
    function evaluateValidationMaxDigits(validation, value) {
        if (validation.maxDigits == null) {
            return null;
        }
        var ctx = { '$value': value };
        if (typeof validation.maxDigits === 'number') {
            return {
                result: models.evaluateExpression("$value.toString().length <= " + validation.maxDigits, ctx),
                error: "Digits count must be <= " + validation.maxDigits,
                clientValidation: false
            };
        }
        return evaluateValidation(validation.maxDigits, ctx);
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
    function evaluateValidationMaxValue(validation, value) {
        if (validation.maxValue == null) {
            return null;
        }
        var ctx = { '$value': value };
        if (typeof validation.maxValue === 'number') {
            return {
                result: models.evaluateExpression("$value.length <= " + validation.maxValue, ctx),
                error: "Value must be <= " + validation.maxValue,
                clientValidation: false
            };
        }
        return evaluateValidation(validation.maxValue, { '$value': value });
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
    function evaluateValidationMinDigits(validation, value) {
        if (validation.minDigits == null) {
            return null;
        }
        var ctx = { '$value': value };
        if (typeof validation.minDigits === 'number') {
            return {
                result: models.evaluateExpression("$value.toString().length >= " + validation.minDigits, ctx),
                error: "Digits count must be >= " + validation.minDigits,
                clientValidation: false
            };
        }
        return evaluateValidation(validation.minDigits, ctx);
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
    function evaluateValidationMinValue(validation, value) {
        if (validation.minValue == null) {
            return null;
        }
        var ctx = { '$value': value };
        if (typeof validation.minValue === 'number') {
            return {
                result: models.evaluateExpression("$value.length <= " + validation.minValue, ctx),
                error: "Value must be >= " + validation.minValue,
                clientValidation: false
            };
        }
        return evaluateValidation(validation.minValue, { '$value': value });
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
    function evaluateValidationNotEmpty(validation, value) {
        if (validation.notEmpty == null) {
            return null;
        }
        var ctx = { '$value': value };
        if (typeof validation.notEmpty === 'boolean') {
            return {
                result: models.evaluateExpression("($value != null) === " + validation.notEmpty, ctx),
                error: 'Value must not be empty',
                clientValidation: false
            };
        }
        return evaluateValidation(validation.notEmpty, ctx);
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
    function evaluateValidationGroup(validation, value, context) {
        var res = [];
        var ctx = utils.deepCopy(context);
        ctx['$value'] = value;
        res = evaluateValidationConditions(validation, ctx);
        if (validation.maxValue) {
            var maxValue = evaluateValidationMaxValue(validation, value);
            if (maxValue != null) {
                res.push(maxValue);
            }
        }
        if (validation.minValue) {
            var minValue = evaluateValidationMinValue(validation, value);
            if (minValue != null) {
                res.push(minValue);
            }
        }
        if (validation.notEmpty) {
            var notEmpty = evaluateValidationNotEmpty(validation, value);
            if (notEmpty != null) {
                res.push(notEmpty);
            }
        }
        if (validation.maxDigits) {
            var maxDigits = evaluateValidationMaxDigits(validation, value);
            if (maxDigits != null) {
                res.push(maxDigits);
            }
        }
        if (validation.minDigits) {
            var minDigits = evaluateValidationMinDigits(validation, value);
            if (minDigits != null) {
                res.push(minDigits);
            }
        }
        return res;
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
    function updateValidation(instance, context, supplementaryInformations) {
        var validation = instance.validation;
        if (validation == null) {
            instance.valid = true;
            return;
        }
        if (supplementaryInformations) {
            Object.keys(supplementaryInformations).forEach(function (key) {
                context["__supplementary__" + key + "__"] = supplementaryInformations[key];
            });
        }
        var completeName = nodeInstanceCompleteName(instance);
        if (context[completeName] != null && validation && validation.forceValue) {
            instance.value = models.evaluateExpression(validation.forceValue.condition, context);
            context[completeName] = instance.value;
            context.$value = instance.value;
        }
        instance.validationResults = evaluateValidationGroup(validation, context[completeName], context);
        instance.valid = instance.validationResults.reduce(function (prev, x) { return prev && x.result; }, true);
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
    function evaluateWarning(warning, context, forceFormula) {
        return {
            result: models.evaluateExpression(warning.condition, context, forceFormula),
            warning: warning.warningMessage,
        };
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
    function evaluateWarningConditions(warning, context) {
        return warning.conditions.map(function (cond) { return evaluateWarning(cond, context); });
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
    function evaluateWarningGroup(warning, context) {
        return evaluateWarningConditions(warning, context);
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
    function updateWarning(instance, context) {
        var warning = instance.warning;
        if (warning == null) {
            return;
        }
        var completeName = nodeInstanceCompleteName(instance);
        if (context[completeName] != null && warning) {
            instance.warningResults = evaluateWarningGroup(warning, context);
        }
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
    function updateFieldInstanceState(instance, context, branchVisibility) {
        if (branchVisibility === void 0) { branchVisibility = true; }
        updateVisibility(instance, context, branchVisibility);
        updateConditionalBranches(instance, context);
        updateFormula(instance, context);
        updateValidation(instance, context);
        updateWarning(instance, context);
        updateNextSlideCondition(instance, context);
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
    function updateFilteredChoices(instance, context) {
        if (instance.choicesFilter != null) {
            instance.filteredChoices = instance.node.choicesOrigin.choices.filter(function (c) {
                context.$choice = c;
                context.$choiceValue = c.value;
                return models.evaluateExpression(instance.choicesFilter.formula, context);
            });
        }
        else {
            instance.filteredChoices = instance.node.choicesOrigin.choices;
        }
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
    function updateTriggerConditions(instance, context) {
        if (instance.triggerConditions == null) {
            return false;
        }
        var completeName = nodeInstanceCompleteName(instance);
        if (instance.firstTriggerConditionDone[completeName]) {
            return false;
        }
        var found = false;
        var conditionsNum = instance.triggerConditions.length;
        for (var i = 0; i < conditionsNum; i++) {
            if (models.evaluateExpression(instance.triggerConditions[i].condition, context)) {
                found = true;
                break;
            }
        }
        instance.firstTriggerConditionDone[completeName] = found;
        return found;
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
    function createNode(node) {
        var conditionalBranches = node.conditionalBranches != null && node.conditionalBranches.length > 0 ?
            node.conditionalBranches :
            [models.alwaysCondition()];
        return __assign(__assign({}, node), { parentNode: node.parentNode != null ? node.parentNode : 0, label: node.label || '', visibility: node.visibility || models.alwaysCondition(), conditionalBranches: conditionalBranches });
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
    function createField(field) {
        var node = createNode(__assign(__assign({}, field), { nodeType: exports.AjfNodeType.AjfField }));
        var editable = field.editable != null ?
            field.editable :
            field.fieldType !== exports.AjfFieldType.Formula && field.fieldType !== exports.AjfFieldType.Table;
        return __assign(__assign(__assign({}, node), field), { nodeType: exports.AjfNodeType.AjfField, editable: editable, defaultValue: field.defaultValue != null ? field.defaultValue : null, size: field.size || 'normal' });
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
    var componentsMap = {};

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
    function isCustomFieldWithChoices(field) {
        return field.fieldType > 100 && componentsMap[field.fieldType] != null &&
            componentsMap[field.fieldType].isFieldWithChoice === true;
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
    function isSlidesNode(node) {
        return node != null &&
            (node.nodeType === exports.AjfNodeType.AjfRepeatingSlide || node.nodeType === exports.AjfNodeType.AjfSlide);
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
    function isContainerNode(node) {
        return node != null && (node.nodeType === exports.AjfNodeType.AjfNodeGroup || isSlidesNode(node));
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
    function isContainerNodeInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isContainerNode(nodeInstance.node);
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
    function flattenNodesInstances(nodes, includeGroups) {
        if (includeGroups === void 0) { includeGroups = false; }
        var flatNodes = [];
        nodes.forEach(function (nodeInstance) {
            if (isFieldInstance(nodeInstance)) {
                flatNodes.push(nodeInstance);
            }
            if (isContainerNodeInstance(nodeInstance)) {
                if (includeGroups) {
                    flatNodes.push(nodeInstance);
                }
                flatNodes = flatNodes.concat(flattenNodesInstances(nodeInstance.nodes, includeGroups));
            }
        });
        return flatNodes;
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
    function isSlidesInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isSlidesNode(nodeInstance.node);
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
    function flattenNodesInstancesTree(nodes) {
        var flatTree = [];
        nodes.forEach(function (nodeInstance) {
            if (isSlidesInstance(nodeInstance)) {
                var ni = nodeInstance;
                flatTree.push(ni);
                ni.flatNodes = flattenNodesInstances(ni.nodes);
            }
        });
        return flatTree;
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
    function isNodeGroup(node) {
        return node != null && node.nodeType === exports.AjfNodeType.AjfNodeGroup;
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
    function isNodeGroupInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isNodeGroup(nodeInstance.node);
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
    function isSlideNode(node) {
        return node != null && node.nodeType === exports.AjfNodeType.AjfSlide;
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
    function isSlideInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isSlideNode(nodeInstance.node);
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
    function createNodeInstance(instance) {
        return {
            node: instance.node,
            prefix: instance.prefix ? __spread(instance.prefix) : [],
            visible: instance.visible != null ? instance.visible : true,
            conditionalBranches: [],
            updatedEvt: new core.EventEmitter()
        };
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
    function createFieldInstance(instance, context) {
        var nodeInstance = createNodeInstance(instance);
        var value = null;
        if (nodeInstance.node != null && context != null) {
            var completeName = nodeInstanceCompleteName(nodeInstance);
            if (context[nodeInstance.node.name] != null) {
                value = context[nodeInstance.node.name];
            }
            else if (context[completeName] != null) {
                value = context[completeName];
            }
        }
        return __assign(__assign({}, nodeInstance), { node: instance.node, value: value, valid: false, defaultValue: instance.defaultValue != null ? instance.defaultValue : null, validationResults: instance.validationResults || [], warningResults: instance.warningResults || [], warningTrigger: new core.EventEmitter() });
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
    function createFieldWithChoicesInstance(instance, context) {
        var fieldInstance = createFieldInstance(instance, context);
        return __assign(__assign({}, fieldInstance), { node: instance.node, filteredChoices: __spread(instance.node.choices), firstTriggerConditionDone: {}, selectionTrigger: new core.EventEmitter() });
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
    /**
     * to mantain retrocompatibility with old string type convert string to AjfTableCell
     * check  node.rows: (string|AjfTableCell)[][];
     * if elem of map is string convert in to AjfTableCell object
     */
    function normalizeRows(node) {
        node.rows.forEach(function (row, rowIdx) {
            row.forEach(function (elem, elemIdx) {
                if (typeof elem === 'string') {
                    node.rows[rowIdx][elemIdx] = { formula: elem, editable: node.editable };
                }
            });
        });
    }
    function createTableFieldInstance(instance, context) {
        normalizeRows(instance.node);
        var fieldInstance = createFieldInstance(instance, context);
        return __assign(__assign({}, fieldInstance), { node: instance.node, context: context, hideEmptyRows: instance.hideEmptyRows || false, controls: [] });
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
    function createNodeGroupInstance(instance) {
        var nodeInstance = createNodeInstance(instance);
        return __assign(__assign({}, nodeInstance), { node: instance.node, formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
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
    function createSlideInstance(instance) {
        var nodeInstance = createNodeInstance(instance);
        return __assign(__assign({}, nodeInstance), { node: instance.node, nodes: [], slideNodes: [], flatNodes: [], valid: false, position: 0 });
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
    function createRepeatingSlideInstance(instance) {
        var node = instance.node, slideInstanceCreate = __rest(instance, ["node"]);
        var nodeType = node.nodeType, slideNode = __rest(node, ["nodeType"]);
        var slideInstance = createSlideInstance(__assign(__assign({}, slideInstanceCreate), { node: __assign({ nodeType: exports.AjfNodeType.AjfSlide }, slideNode) }));
        return __assign(__assign({}, slideInstance), { node: instance.node, slideNodes: [], formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
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
    function createValidationGroup(group) {
        return __assign(__assign({}, group), { conditions: group.conditions || [] });
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
    function createWarningGroup(group) {
        return __assign(__assign({}, group), { conditions: group.conditions || [] });
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
    function isRepeatingContainerNode(node) {
        return node != null &&
            (node.nodeType === exports.AjfNodeType.AjfNodeGroup ||
                node.nodeType === exports.AjfNodeType.AjfRepeatingSlide);
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
    function getAncestorRepeatingNodes(allNodes, node) {
        var nodeGroups = [];
        var curParent = node.parent;
        while (curParent != null) {
            var curNode = allNodes.map(function (n) { return n.node || n; })
                .find(function (n) { return n.id == curParent; });
            if (curNode) {
                if (isRepeatingContainerNode(curNode)) {
                    nodeGroups.push(curNode);
                }
            }
            curParent = curNode != null ? curNode.parent : null;
        }
        return nodeGroups;
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
    function getAncestorRepeatingNodesNames(allNodes, node) {
        var names = {};
        var nodeGroups = getAncestorRepeatingNodes(allNodes, node);
        nodeGroups.forEach(function (n, idx) { return (n.nodes || []).forEach(function (sn) {
            if (isField(sn)) {
                names[sn.name] = idx;
            }
        }); });
        return names;
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
    function getInstanceCondition(condition, ancestorsNames, prefix) {
        var oldCondition = condition.condition;
        var newCondition = models.normalizeExpression(oldCondition, ancestorsNames, prefix);
        if (newCondition === oldCondition) {
            return condition;
        }
        return { condition: newCondition };
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
    function getInstanceConditions(conditions, ancestorsNames, prefix) {
        var changed = false;
        var newConditions = conditions.map(function (condition) {
            var newCondition = getInstanceCondition(condition, ancestorsNames, prefix);
            if (newCondition !== condition) {
                changed = true;
            }
            return newCondition;
        });
        return changed ? newConditions : conditions;
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
    function getInstanceFormula(formula, ancestorsNames, prefix) {
        var oldFormula = formula.formula;
        var newFormula = models.normalizeExpression(oldFormula, ancestorsNames, prefix);
        if (newFormula === oldFormula) {
            return formula;
        }
        return { formula: newFormula };
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
    function createValidation(validation) {
        return __assign(__assign({}, validation), { clientValidation: validation.clientValidation || false, errorMessage: validation.errorMessage || 'Undefined Error' });
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
    function getInstanceValidation(validation, ancestorsNames, prefix) {
        var oldValidation = validation.condition;
        var newValidation = models.normalizeExpression(oldValidation, ancestorsNames, prefix);
        if (newValidation === oldValidation) {
            return validation;
        }
        return createValidation({ condition: newValidation });
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
    function getInstanceValidations(validations, ancestorsNames, prefix) {
        var changed = false;
        var newValidations = validations.map(function (validation) {
            var newValidation = getInstanceValidation(validation, ancestorsNames, prefix);
            if (newValidation !== validation) {
                changed = true;
            }
            return newValidation;
        });
        return changed ? newValidations : validations;
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
    function createWarning(warning) {
        return __assign(__assign({}, warning), { warningMessage: warning.warningMessage || 'Undefined Warning' });
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
    function getInstanceWarning(warning, ancestorsNames, prefix) {
        var oldWarning = warning.condition;
        var newWarning = models.normalizeExpression(oldWarning, ancestorsNames, prefix);
        if (newWarning === oldWarning) {
            return warning;
        }
        return createWarning({ condition: newWarning });
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
    function getInstanceWarnings(warnings, ancestorsNames, prefix) {
        var changed = false;
        var newWarnings = warnings.map(function (warning) {
            var newWarning = getInstanceWarning(warning, ancestorsNames, prefix);
            if (newWarning !== warning) {
                changed = true;
            }
            return newWarning;
        });
        return changed ? newWarnings : warnings;
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
    function isRepeatingSlide(node) {
        return node != null && node.nodeType === exports.AjfNodeType.AjfRepeatingSlide;
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
    function isRepeatingSlideInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isSlidesInstance(nodeInstance) &&
            isRepeatingSlide(nodeInstance.node);
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
    function nodeToNodeInstance(allNodes, node, prefix, context) {
        var instance = null;
        var nodeType = node.nodeType;
        switch (nodeType) {
            case exports.AjfNodeType.AjfField:
                var field = node;
                if (field.fieldType > 100) {
                    if (componentsMap[field.fieldType] != null &&
                        componentsMap[field.fieldType].createInstance != null) {
                        instance = componentsMap[field.fieldType].createInstance({ node: node, prefix: prefix }, context);
                    }
                    else {
                        instance = createFieldInstance({ node: node, prefix: prefix }, context);
                    }
                }
                else {
                    switch (field.fieldType) {
                        case exports.AjfFieldType.SingleChoice:
                        case exports.AjfFieldType.MultipleChoice:
                            instance = createFieldWithChoicesInstance({ node: node, prefix: prefix }, context);
                            break;
                        case exports.AjfFieldType.Table:
                            instance = createTableFieldInstance({ node: node, prefix: prefix }, context);
                            break;
                        default:
                            instance = createFieldInstance({ node: node, prefix: prefix }, context);
                            break;
                    }
                }
                break;
            case exports.AjfNodeType.AjfNodeGroup:
                instance = createNodeGroupInstance({ node: node, prefix: prefix });
                break;
            case exports.AjfNodeType.AjfRepeatingSlide:
                instance = createRepeatingSlideInstance({ node: node, prefix: prefix });
                break;
            case exports.AjfNodeType.AjfSlide:
                instance = createSlideInstance({ node: node, prefix: prefix });
                break;
        }
        if (instance != null) {
            var hasPrefix = prefix != null && prefix.length > 0;
            if (hasPrefix) {
                var ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);
                if (node.visibility != null) {
                    var oldVisibility = node.visibility.condition;
                    var newVisibility = models.normalizeExpression(oldVisibility, ancestorsNames, prefix);
                    instance.visibility = newVisibility !== oldVisibility ?
                        models.createCondition({ condition: newVisibility }) :
                        node.visibility;
                }
                var conditionalBranches = instance.node.conditionalBranches != null &&
                    instance.node.conditionalBranches.length > 0 ?
                    instance.node.conditionalBranches :
                    [models.alwaysCondition()];
                instance.conditionalBranches =
                    getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
                if (nodeType === exports.AjfNodeType.AjfNodeGroup || nodeType === exports.AjfNodeType.AjfRepeatingSlide) {
                    var ngInstance = instance;
                    var formulaReps = ngInstance.node.formulaReps;
                    if (formulaReps != null) {
                        var oldFormula = formulaReps.formula;
                        var newFormula = models.normalizeExpression(oldFormula, ancestorsNames, prefix);
                        ngInstance.formulaReps =
                            newFormula !== oldFormula ? models.createFormula({ formula: newFormula }) : formulaReps;
                    }
                }
                else if (nodeType === exports.AjfNodeType.AjfField) {
                    var fInstance = instance;
                    var fNode = fInstance.node;
                    if (fNode.formula) {
                        fInstance.formula = getInstanceFormula(fNode.formula, ancestorsNames, prefix);
                    }
                    if (fNode.validation != null) {
                        var newConditions = getInstanceValidations(fNode.validation.conditions, ancestorsNames, prefix);
                        if (newConditions !== fNode.validation.conditions) {
                            fInstance.validation = createValidationGroup(fNode.validation);
                            fInstance.validation.conditions = newConditions;
                        }
                        else {
                            fInstance.validation = fNode.validation;
                        }
                    }
                    if (fNode.warning != null) {
                        var newWarnings = getInstanceWarnings(fNode.warning.conditions, ancestorsNames, prefix);
                        if (newWarnings !== fNode.warning.conditions) {
                            fInstance.warning = createWarningGroup(fNode.warning);
                            fInstance.warning.conditions = newWarnings;
                        }
                        else {
                            fInstance.warning = fNode.warning;
                        }
                    }
                    if (fNode.nextSlideCondition != null) {
                        fInstance.nextSlideCondition =
                            getInstanceCondition(fNode.nextSlideCondition, ancestorsNames, prefix);
                    }
                    if (isFieldWithChoices(fNode)) {
                        var fwcInstance = instance;
                        var fwcNode = fwcInstance.node;
                        if (fwcNode.choicesFilter != null) {
                            fwcInstance.choicesFilter =
                                getInstanceFormula(fwcNode.choicesFilter, ancestorsNames, prefix);
                        }
                        if (fwcNode.triggerConditions != null) {
                            fwcInstance.triggerConditions =
                                getInstanceConditions(fwcNode.triggerConditions, ancestorsNames, prefix);
                        }
                    }
                }
            }
            else {
                instance.visibility = instance.node.visibility;
                var conditionalBranches = instance.node.conditionalBranches != null &&
                    instance.node.conditionalBranches.length > 0 ?
                    instance.node.conditionalBranches :
                    [models.alwaysCondition()];
                instance.conditionalBranches = conditionalBranches;
                if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                    var rgInstance = instance;
                    rgInstance.formulaReps = rgInstance.node.formulaReps;
                }
                else if (isFieldInstance(instance)) {
                    var fInstance = instance;
                    fInstance.validation = fInstance.node.validation;
                    fInstance.warning = fInstance.node.warning;
                    fInstance.nextSlideCondition = fInstance.node.nextSlideCondition;
                    if (isFieldWithChoicesInstance(instance)) {
                        var fwcInstance = instance;
                        fwcInstance.choicesFilter = fwcInstance.node.choicesFilter;
                        fwcInstance.triggerConditions = fwcInstance.node.triggerConditions;
                    }
                    fInstance.formula = fInstance.node.formula;
                }
            }
        }
        return instance;
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
    function flattenNodes(nodes) {
        var flatNodes = [];
        nodes.forEach(function (node) {
            flatNodes.push(node);
            if (isContainerNode(node)) {
                flatNodes = flatNodes.concat(flattenNodes(node.nodes));
            }
        });
        return flatNodes;
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
    function orderedNodes(nodes, parent) {
        var newNodes = [];
        nodes
            .filter(function (n) { return parent != null ? n.parent == parent : n.parent == null || n.parent === 0; })
            .sort(function (n1, n2) { return n1.parentNode - n2.parentNode; })
            .forEach(function (n) {
            newNodes.push(n);
            newNodes = newNodes.concat(orderedNodes(nodes, n.id));
        });
        return newNodes;
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
    function updateRepsNum(instance, context) {
        var oldReps = instance.reps || 0;
        context = context || {};
        if (instance.node.formulaReps == null) {
            var ctxReps = context[nodeInstanceCompleteName(instance)];
            if (ctxReps != null) {
                instance.reps = ctxReps;
            }
            else if (oldReps == 0) {
                instance.reps = 1;
            }
        }
        else {
            var newReps = models.evaluateExpression(instance.node.formulaReps.formula, context);
            if (newReps !== oldReps) {
                instance.reps = newReps;
            }
        }
        instance.canAdd = instance.node.maxReps === 0 || instance.reps < instance.node.maxReps;
        instance.canRemove = instance.node.minReps === 0 || instance.reps > instance.node.minReps;
        return oldReps;
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
    function validSlide(slide, idx) {
        if (idx >= slide.slideNodes.length) {
            return true;
        }
        return slide.slideNodes[idx]
            .map(function (n) {
            if (n.visible && Object.keys(n).indexOf('valid') > -1) {
                return n.valid;
            }
            return true;
        })
            .reduce(function (v1, v2) { return v1 && v2; }, true);
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
    var AjfValidationService = /** @class */ (function () {
        function AjfValidationService() {
            this._baseUtilFunctions = [
                "/**\n        * count the number of digit contained on x.\n        * @param  x the value used for digit count\n        * @return the count of the digit\n      */\n    var digitCount = function(x) { return x.toString().length; }",
                "/**\n        * count the number of decimal contained on x.\n        * @param  x the value used for decimal count\n        * @return the count of the decimal\n      */\n    var decimalCount = function(x) {\n      return (parseFloat(x).toString().split('.')[1] || []).length;\n    }",
                "/**\n        * check if x is integer\n        * @param  x the value used for check\n        * @return true if x is a number\n      */\n    var isInt = function(x) { return !/[,.]/.test(x); }",
                "/**\n        * check if x is not empity\n        * @param  x the value used for check\n        * @return true if x defined and not null and the number of digit is > 0\n      */\n    var notEmpty = function (x) {\n      return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);\n    }",
                "/**\n        * check if x is contained on array\n        * @param  x the value used for check\n        * @return the position of x on array or if array === x\n      */\n    var valueInChoice = function(array, x) { return array.indexOf(x) > -1 || array === x; }",
                "var scanGroupField = function(reps, acc, callback) {\n        for (var i = 0; i < reps; i++) {\n            acc = callback(acc, i);\n        }\n        return acc;\n    }",
                "/**\n        * sum the value contained on array\n        * @param  x the array\n        * @return the sum\n      */\n    var sum = function(array) {return array.reduce(function(a, b){ return a + b; }, 0); }",
                "var dateOperations = function(dString, period, operation, v) {\n        fmt = 'mm/dd/yyyy';\n        var d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();\n        if (operation == 'remove') {\n          v = -v;\n        }\n        var dateOp;\n        switch (period) {\n          case 'day':\n            dateOp = dateUtils.addDays;\n            break;\n          case 'month':\n            dateOp = dateUtils.addMonths;\n            break;\n          case 'year':\n            dateOp = dateUtils.addYears;\n            break;\n          default:\n            return -1;\n        }\n        return dateUtils.format(dateOp(d, v), fmt);\n      }",
                "/**\n        * round the num\n        * @param  num the value to round\n        * @param  digits how many digit\n        * @return num rounded\n      */\n      var round = function(num, digits) {\n        digits = digits || 0;\n        var f = 0;\n        try { f = parseFloat(num); } catch (e) { }\n        var m = Math.pow(10, digits);\n        return Math.round(f * m) / m;\n      }",
                "/**\n        * extract the property of the source object with property != null\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want filter\n        * @return array of dates\n      */\n      var extractArray = function(source, property, property2) {\n        source = (source || []).slice(0);\n        var l = source.length;\n        var res = [];\n        for (var i = 0; i < l ; i++) {\n          if (source[i][property] != null && source[i][property2] != null) {\n            res.push(source[i][property] + source[i][property2]);\n          }\n          else if (source[i][property] != null) {\n            res.push(source[i][property]);\n          }\n        }\n        return res;\n      }",
                "/**\n        * extract the property of the source object with property != null\n        * @param  source array of object wich contains property\n        * @param  propertues string array the properties to sum\n        * @return the sum\n      */\n      var extractSum = function(source, properties) {\n        var sum = 0;\n        properties = (properties || []).slice(0);\n        var l = properties.length;\n\n        for (var i = 0; i < l ; i++) {\n          var array = extractArray(source, properties[i]);\n          var leng = array.length;\n          for(var j = 0; j < leng; i++) {\n            sum += array[j];\n          }\n        }\n        return sum;\n      }",
                "/**\n        * extract the array of sum for each week != null\n        * @param  source array of object wich contains property\n        * @param  propertues string array the properties to sum\n        * @return the sum\n      */\n      var extractArraySum = function(source, properties) {\n        var arrays = [];\n        properties = (properties || []).slice(0);\n\n        for (var propI = 0; propI < properties.length ; propI++) {\n          var array = extractArray(source, properties[propI]);\n          arrays.push(array);\n        }\n\n        var res = [];\n        for (var weekI = 0; weekI < array.length; weekI ++ ) {\n          var sum = 0;\n          for (var propI = 0; propI < properties.length ; propI++) {\n            sum = sum + arrays[propI][weekI]\n          }\n          res.push(sum);\n        }\n        return res;\n      }",
                "/**\n        * draw a threshold line on chart related to the property\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want filter\n        * @return array of dates\n      */\n      var drawThreshold = function(source, property, threshold) {\n        source = (source || []).slice(0);\n        var l = source.length;\n        var res = [];\n        for (var i = 0; i < l ; i++) {\n          if (source[i][property] != null) {\n            res.push(threshold);\n          }\n        }\n        return res;\n      }",
                "/**\n        * extract the dates of the source object with property != null\n        * @param  source array of object wich contains property and date_start\n        * @param  property the property on wich we want to calculate dates\n        * @param  format the format of the date\n        * @return array of dates\n      */\n      var extractDates = function(source, property, format) {\n        source = (source || []).slice(0);\n        var l = source.length;\n        var res = [];\n        var prefix = '';\n        for (var i = 0; i < l ; i++) {\n          if (source[i][property] != null) {\n            switch(format) {\n              case \"WW\":\n                prefix = \"W\";\n                break;\n              case \"mm\":\n                prefix = \"M\";\n                break;\n              default:\n                prefix = \"\";\n            }\n            res.push(prefix + formatDate(source[i][\"date_start\"], format));\n          }\n        }\n        return res;\n      }",
                "/**\n        * extract the last property contains in source != null\n        * @param  source array of object wich contains property and date_start\n        * @param  property the property to find\n        * @return the last property != null\n      */\n      var lastProperty = function(source, property) {\n        source = (source || []).slice(0);\n        var l = source.length -1;\n\n        while (l >= 0 && source[l][property] == null) {\n          l--;\n          if (l < 0) return 0;\n        }\n        return l >= 0 ? source[l][property] : 0;\n      }",
                "var sumLastProperties = function(source, properties) {\n        source = (source || []).slice(0);\n        var sum = 0;\n        for (var i = 0; i < properties.length; i++) {\n          sum += lastProperty(source, properties[i]);\n        }\n\n        return sum;\n      }",
                "/**\n        * compute the trend of the property contained on the source.\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want to calculate the trend\n        * @return an html icon that identifies the trend\n      */\n      var calculateTrendProperty = function(source, property) {\n        source = (source || []).slice(0);\n        var last = source.length - 1;\n        while (source[last][property] == null) {\n          if (last == 0) {\n            break;\n          }\n          last--;\n        }\n        var lastLast = last - 1;\n        if (last == 0) {\n          lastLast = last;\n        } else {\n          while (source[lastLast][property] == null) {\n            if (lastLast == 0) {\n              lastLast = last;\n              break;\n            }\n            lastLast--;\n          }\n        }\n\n        var lastProperty = source[last]?(source[last][property] || 0): 0;\n        var lastLastProperty = source[lastLast]?(source[lastLast][property] || 0): 0;\n\n        if (lastProperty == lastLastProperty) {\n          return '<p><i class=\"material-icons\" style=\"color:blue\">trending_flat</i></p>';\n        } else if (lastProperty > lastLastProperty) {\n          return '<p><i class=\"material-icons\" style=\"color:green\">trending_up</i></p>';\n        } else {\n          return '<p><i class=\"material-icons\" style=\"color:red\">trending_down</i></p>';\n        }\n      }",
                "/**\n        * compute the average value of the property contained on the source.\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want to calculate the average\n        * @param  range the range on wich we want to calculate the average\n        * @param  coefficent the coefficent used for calculate the threshold\n                  if coefficent is 0 mean return the count of property > 0\n        * @return the average value || the count of property > 0\n      */\n      var calculateAvgProperty = function(source, property, range, coefficient) {\n        source = (source || []).slice(0);\n\n        source.pop();\n\n        coefficient = coefficient || 1;\n        range = range || 12;\n\n        var l = source.length;\n        var res = 0;\n        var counter = 0;\n        var noZero = 0;\n\n        if(l < range) {\n          range = l;\n        }\n\n        while (range != 0) {\n          counter++;\n          if (source[l - 1][property] != null) {\n            res += source[l - 1][property];\n\n            if (source[l - 1][property] > 0) {\n              noZero++;\n            }\n          }\n          l--;\n          range--;\n        }\n\n        if (coefficient == 0) {\n          return noZero;\n        } else {\n          var threshold = (res/counter)*coefficient || 0;\n          return threshold;\n        }\n      }",
                "var alert = function(source, property, threshold, fmt) {\n        source = (source || []).slice(0);\n        var l = source.length;\n\n        if ( lastProperty(source, property)  > threshold ) {\n          return '<p><i class=\"material-icons\" style=\"color:red\">warning</i></p>';\n          } else {\n            return '<p></p>';\n          }\n      }",
                "var formatNumber = function(num, fmt) {\n        fmt = fmt || '0,0[.]0';\n        return numeral(num).format(fmt);\n      }",
                "var formatDate = function(date, fmt) {\n        fmt = fmt || 'mm-dd-yyyy';\n        return dateUtils.format(date, fmt);\n      }",
                "var isoMonth = function(date, fmt) {\n        fmt = fmt || 'mm';\n        var du = dateUtils;\n        return du.format(du.addDays(du.startOfMonth(date), 4),fmt)\n      }",
                "var nextCounterValue = function(counterName, firstValue) {\n        firstValue = firstValue != null ? firstValue : 0;\n        if (execContext['$$'+counterName] == null) {\n          execContext['$$'+counterName] = firstValue;\n        } else {\n          execContext['$$'+counterName]++;\n        }\n        return execContext['$$'+counterName];\n      }",
                "var getCoordinate = function(source, zoom) {\n        zoom = zoom || 6;\n        if(source == null) {\n          return [51.505,-0.09, zoom];\n        } else {\n          return [source[0], source[1], zoom];\n        }\n      }"
            ];
            this._functions = [];
            this._functionsStr = '';
            this._initFunctions();
        }
        AjfValidationService.prototype.addFunction = function (f) {
            this._functions.push(f);
            this._initFunctions();
        };
        AjfValidationService.prototype.addFunctionHandler = function (name, fn) {
            if (models.AjfExpressionUtils.utils[name] === undefined) {
                models.AjfExpressionUtils.utils[name] = { fn: fn };
            }
        };
        AjfValidationService.prototype._initFunctions = function () {
            var functionsStr = this._functions.map(function (f) { return typeof f === 'string' ? f : f.toString(); }).join('; ');
            this._functionsStr = this._baseUtilFunctions.join('; ') + "; " + functionsStr;
            models.AjfExpressionUtils.UTIL_FUNCTIONS = this._functionsStr;
        };
        AjfValidationService.decorators = [
            { type: core.Injectable }
        ];
        AjfValidationService.ctorParameters = function () { return []; };
        return AjfValidationService;
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
    var AjfFormRendererService = /** @class */ (function () {
        function AjfFormRendererService(_) {
            this._visibilityNodesMapUpdates = new rxjs.Subject();
            this._repetitionNodesMapUpdates = new rxjs.Subject();
            this._conditionalBranchNodesMapUpdates = new rxjs.Subject();
            this._formulaNodesMapUpdates = new rxjs.Subject();
            this._validationNodesMapUpdates = new rxjs.Subject();
            this._warningNodesMapUpdates = new rxjs.Subject();
            this._filteredChoicesNodesMapUpdates = new rxjs.Subject();
            this._triggerConditionsNodesMapUpdates = new rxjs.Subject();
            this._nextSlideConditionsNodesMapUpdates = new rxjs.Subject();
            this._formInitEvent = new core.EventEmitter();
            this.formInitEvent = this._formInitEvent.asObservable();
            this._formGroup = new rxjs.BehaviorSubject(null);
            this.formGroup = this._formGroup.asObservable();
            this._form = new rxjs.BehaviorSubject(null);
            this._nodesUpdates = new rxjs.Subject();
            this._formGroupSubscription = rxjs.Subscription.EMPTY;
            this._valueChanged = new rxjs.Subject();
            this._nextSlideTrigger = new core.EventEmitter();
            this.nextSlideTrigger = this._nextSlideTrigger.asObservable();
            this._slidesNum = new rxjs.BehaviorSubject(0);
            this.slidesNum = this._slidesNum.asObservable();
            this._initUpdateMapStreams();
            this._initNodesStreams();
            this._initErrorsStreams();
            this._initFormStreams();
            this._updateFormValueAndValidity();
        }
        Object.defineProperty(AjfFormRendererService.prototype, "nodesTree", {
            get: function () {
                return this._flatNodesTree;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRendererService.prototype, "errorPositions", {
            get: function () {
                return this._errorPositions;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRendererService.prototype, "errors", {
            get: function () {
                return this._errors;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRendererService.prototype, "currentSupplementaryInformations", {
            get: function () {
                var form = this._form.getValue();
                return form != null && form.form != null ? form.form.supplementaryInformations : null;
            },
            enumerable: false,
            configurable: true
        });
        AjfFormRendererService.prototype.setForm = function (form, context) {
            if (context === void 0) { context = {}; }
            this._initUpdateMapStreams();
            if (form != null && Object.keys(context).length === 0 &&
                Object.keys(form.initContext || {}).length > 0) {
                context = form.initContext || {};
            }
            var currentForm = this._form.getValue();
            if ((currentForm == null && form != null) ||
                (currentForm != null && form !== currentForm.form)) {
                this._form.next({ form: form, context: context });
            }
        };
        AjfFormRendererService.prototype.getFormValue = function () {
            var formGroup = this._formGroup.getValue();
            if (formGroup == null) {
                return {};
            }
            var res = utils.deepCopy(formGroup.value);
            return res;
        };
        AjfFormRendererService.prototype.addGroup = function (group) {
            var _this = this;
            return new rxjs.Observable(function (subscriber) {
                if (group.formulaReps != null) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                var maxReps = group.node.maxReps;
                if (maxReps > 0 && group.reps + 1 > maxReps) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                var oldReps = group.reps;
                group.reps = group.reps + 1;
                group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
                group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
                _this._nodesUpdates.next(function (nodes) {
                    var flatNodes = flattenNodesInstances(nodes, true);
                    _this._adjustReps(flatNodes, group, oldReps, _this.getFormValue());
                    subscriber.next(true);
                    subscriber.complete();
                    return nodes;
                });
            });
        };
        AjfFormRendererService.prototype.removeGroup = function (group) {
            var _this = this;
            return new rxjs.Observable(function (subscriber) {
                if (group.formulaReps != null) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                var minReps = group.node.minReps;
                if (group.reps - 1 < minReps) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                var oldReps = group.reps;
                group.reps = group.reps - 1;
                group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
                group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
                _this._nodesUpdates.next(function (nodes) {
                    _this._adjustReps(nodes, group, oldReps, _this.getFormValue());
                    subscriber.next(true);
                    subscriber.complete();
                    return nodes;
                });
            });
        };
        AjfFormRendererService.prototype.getControl = function (field) {
            return this.formGroup.pipe(operators.map(function (f) {
                var fieldName = nodeInstanceCompleteName(field);
                return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
            }));
        };
        AjfFormRendererService.prototype._initErrorsStreams = function () {
            var _this = this;
            this._errorPositions = this._valueChanged.pipe(operators.withLatestFrom(this._nodes, this._form), operators.filter(function (_a) {
                var _b = __read(_a, 3), _ = _b[0], __ = _b[1], form = _b[2];
                return form != null &&
                    form.form != null;
            }), operators.map(function (_a) {
                var _b = __read(_a, 3), _ = _b[0], nodes = _b[1], formDef = _b[2];
                var form = formDef.form;
                var currentPosition = 0;
                var errors = [];
                nodes.forEach(function (node) {
                    if (node.node.nodeType === exports.AjfNodeType.AjfRepeatingSlide) {
                        var rsNode = node;
                        for (var i = 0; i < rsNode.reps; i++) {
                            if (node.visible) {
                                currentPosition++;
                                if (i == 0) {
                                    rsNode.position = currentPosition;
                                }
                                if (!validSlide(rsNode, i)) {
                                    errors.push(currentPosition);
                                }
                            }
                        }
                    }
                    else if (node.node.nodeType === exports.AjfNodeType.AjfSlide) {
                        var sNode = node;
                        if (sNode.visible) {
                            currentPosition++;
                            sNode.position = currentPosition;
                            if (!sNode.valid) {
                                errors.push(currentPosition);
                            }
                        }
                    }
                });
                form.valid = errors.length == 0;
                _this._slidesNum.next(currentPosition);
                return errors;
            }), operators.publishReplay(), operators.refCount());
            this._errors = this._errorPositions.pipe(operators.map(function (e) { return e != null ? e.length : 0; }), operators.startWith(0), operators.publishReplay(), operators.refCount());
        };
        AjfFormRendererService.prototype._initUpdateMapStreams = function () {
            this._visibilityNodesMap =
                this._visibilityNodesMapUpdates
                    .pipe(operators.scan(function (rmap, op) {
                    return op(rmap);
                }, {}), operators.startWith({}), operators.share());
            this._repetitionNodesMap =
                this._repetitionNodesMapUpdates
                    .pipe(operators.scan(function (rmap, op) {
                    return op(rmap);
                }, {}), operators.startWith({}), operators.share());
            this._conditionalBranchNodesMap =
                this._conditionalBranchNodesMapUpdates
                    .pipe(operators.scan(function (rmap, op) {
                    return op(rmap);
                }, {}), operators.startWith({}), operators.share());
            this._formulaNodesMap =
                this._formulaNodesMapUpdates
                    .pipe(operators.scan(function (rmap, op) {
                    return op(rmap);
                }, {}), operators.startWith({}), operators.share());
            this._validationNodesMap =
                this._validationNodesMapUpdates
                    .pipe(operators.scan(function (rmap, op) {
                    return op(rmap);
                }, {}), operators.startWith({}), operators.share());
            this._warningNodesMap =
                this._warningNodesMapUpdates
                    .pipe(operators.scan(function (rmap, op) {
                    return op(rmap);
                }, {}), operators.startWith({}), operators.share());
            this._filteredChoicesNodesMap =
                this._filteredChoicesNodesMapUpdates
                    .pipe(operators.scan(function (rmap, op) {
                    return op(rmap);
                }, {}), operators.startWith({}), operators.share());
            this._triggerConditionsNodesMap =
                this._triggerConditionsNodesMapUpdates
                    .pipe(operators.scan(function (rmap, op) {
                    return op(rmap);
                }, {}), operators.startWith({}), operators.share());
            this._nextSlideConditionsNodesMap =
                this._nextSlideConditionsNodesMapUpdates
                    .pipe(operators.scan(function (rmap, op) {
                    return op(rmap);
                }, {}), operators.startWith({}), operators.share());
            this._nodesMaps = [
                this._visibilityNodesMap, this._repetitionNodesMap, this._conditionalBranchNodesMap,
                this._formulaNodesMap, this._validationNodesMap, this._warningNodesMap,
                this._nextSlideConditionsNodesMap, this._filteredChoicesNodesMap,
                this._triggerConditionsNodesMap
            ];
        };
        AjfFormRendererService.prototype._initFormStreams = function () {
            var _this = this;
            var formObs = this._form;
            formObs
                .pipe(operators.map(function (_form) {
                return _this._initFormGroupStreams(new forms.FormGroup({}));
            }))
                .subscribe(this._formGroup);
            formObs
                .pipe(operators.switchMap(function (form) {
                if (form == null || form.form == null) {
                    return rxjs.of(form);
                }
                var choicesOrigins = form.form.choicesOrigins || [];
                if (choicesOrigins.length === 0) {
                    return rxjs.of(form);
                }
                return rxjs.from(Promise.all(choicesOrigins.map(function (co) { return initChoicesOrigin(co); })))
                    .pipe(operators.map(function () { return form; }));
            }), operators.map(function (formDef) {
                return function (_nodesInstances) {
                    var nodes;
                    if (formDef != null &&
                        formDef.form != null) {
                        var form = formDef;
                        var baseNodes = form.form.nodes;
                        nodes = _this._orderedNodesInstancesTree(flattenNodes(baseNodes), baseNodes, undefined, [], form.context || {});
                    }
                    else {
                        nodes = [];
                    }
                    var currentPosition = 0;
                    nodes.forEach(function (node) {
                        if (node.node.nodeType === exports.AjfNodeType.AjfRepeatingSlide) {
                            var rsNode = node;
                            for (var i = 0; i < rsNode.reps; i++) {
                                if (node.visible) {
                                    currentPosition++;
                                    if (i == 0) {
                                        rsNode.position = currentPosition;
                                    }
                                }
                            }
                        }
                        else if (node.node.nodeType === exports.AjfNodeType.AjfSlide) {
                            var sNode = node;
                            if (sNode.visible) {
                                currentPosition++;
                                sNode.position = currentPosition;
                            }
                        }
                    });
                    return nodes;
                };
            }))
                .subscribe(this._nodesUpdates);
        };
        AjfFormRendererService.prototype._initNodeInstance = function (allNodes, node, prefix, context, branchVisibility) {
            var _this = this;
            if (branchVisibility === void 0) { branchVisibility = true; }
            var instance = nodeToNodeInstance(allNodes, node, prefix, context);
            if (instance != null) {
                var nodeType = instance.node.nodeType;
                if (nodeType === exports.AjfNodeType.AjfNodeGroup || nodeType === exports.AjfNodeType.AjfRepeatingSlide) {
                    this._explodeRepeatingNode(allNodes, instance, context);
                }
                else if (nodeType === exports.AjfNodeType.AjfSlide) {
                    var sInstance = instance;
                    sInstance.nodes = this._orderedNodesInstancesTree(allNodes, sInstance.node.nodes, sInstance.node.id, prefix, context);
                }
                updateVisibility(instance, context, branchVisibility);
                updateConditionalBranches(instance, context);
                if (nodeType === exports.AjfNodeType.AjfField) {
                    var fInstance = instance;
                    if (isCustomFieldWithChoices(fInstance.node) || isFieldWithChoices(fInstance.node)) {
                        updateFilteredChoices(fInstance, context);
                    }
                    else {
                        if (isTableFieldInstance(fInstance)) {
                            var tfInstance_1 = fInstance;
                            var tNode_1 = tfInstance_1.node;
                            tfInstance_1.context = context[nodeInstanceCompleteName(tfInstance_1)] || context;
                            var formGroup_1 = this._formGroup.getValue();
                            var controlsWithLabels_1 = [];
                            controlsWithLabels_1.push([node.label, tNode_1.columnLabels]);
                            if (formGroup_1 != null) {
                                tNode_1.rows.forEach(function (row, rowIdx) {
                                    var r = [];
                                    row.forEach(function (cell, idx) {
                                        /*
                                        every control is registered with the cell position
                                        inside the form control matrix
                                        with this mask `${tNode.name}__${rowIdx}__${idx}`
                                        */
                                        var name = tNode_1.name + "__" + rowIdx + "__" + idx;
                                        var tableFormControl = { control: new forms.FormControl(), show: false };
                                        tableFormControl.control.setValue(tfInstance_1.context[cell.formula]);
                                        formGroup_1.registerControl(name, tableFormControl.control);
                                        r.push(tableFormControl);
                                        /* create a object that respect the instance interface
                                        with the minimum defined properties to allow to run addToNodeFormula map*/
                                        var fakeInstance = {
                                            formula: { formula: cell.formula },
                                            node: { name: name, nodeType: 0, editable: false },
                                            visible: true,
                                            prefix: [],
                                            conditionalBranches: [],
                                            updatedEvt: new core.EventEmitter()
                                        };
                                        _this._addToNodesFormulaMap(fakeInstance, cell.formula);
                                    });
                                    controlsWithLabels_1.push([tNode_1.rowLabels[rowIdx], r]);
                                });
                                tfInstance_1.controls = controlsWithLabels_1;
                            }
                        }
                        else {
                            fInstance.value = context[nodeInstanceCompleteName(instance)];
                        }
                        updateFieldInstanceState(fInstance, context);
                    }
                }
                this._addNodeInstance(instance);
            }
            return instance;
        };
        AjfFormRendererService.prototype._adjustReps = function (allNodes, instance, oldReps, context) {
            var _this = this;
            var newReps = instance.reps;
            var result = { added: null, removed: null };
            if (oldReps < newReps) {
                var newNodes_1 = [];
                if (instance.nodes == null) {
                    instance.nodes = [];
                }
                if (instance.node.nodeType === exports.AjfNodeType.AjfNodeGroup) {
                    var node = createField({
                        id: 999,
                        name: '',
                        parent: -1,
                        fieldType: exports.AjfFieldType.Empty,
                        label: instance.node.label
                    });
                    var newInstance = this._initNodeInstance(allNodes, node, instance.prefix.slice(0), context);
                    if (newInstance != null) {
                        instance.nodes.push(newInstance);
                    }
                }
                var _loop_1 = function (i) {
                    var prefix = instance.prefix.slice(0);
                    var group = instance.node;
                    prefix.push(i);
                    orderedNodes(group.nodes, instance.node.id).forEach(function (n) {
                        var newInstance = _this._initNodeInstance(allNodes, n, prefix, context);
                        if (newInstance != null) {
                            newNodes_1.push(newInstance);
                            instance.nodes.push(newInstance);
                        }
                    });
                    this_1._addNodeInstance(instance);
                };
                var this_1 = this;
                for (var i = oldReps; i < newReps; i++) {
                    _loop_1(i);
                }
                result.added = newNodes_1;
            }
            else if (oldReps > newReps) {
                var nodesNum = instance.nodes.length / oldReps;
                if (instance.node.nodeType === exports.AjfNodeType.AjfNodeGroup) {
                    nodesNum++;
                }
                result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
                result.removed.forEach((function (n) {
                    _this._removeNodeInstance(n);
                }));
            }
            if (oldReps != newReps && instance.formulaReps == null) {
                var fg = this._formGroup.getValue();
                var completeName = nodeInstanceCompleteName(instance);
                if (fg != null && fg.contains(completeName)) {
                    fg.controls[completeName].setValue(instance.reps);
                }
            }
            instance.flatNodes = flattenNodesInstances(instance.nodes);
            if (instance.node.nodeType === exports.AjfNodeType.AjfRepeatingSlide) {
                var rsInstance = instance;
                var slideNodes = [];
                var nodesPerSlide = rsInstance.nodes != null ? rsInstance.nodes.length / rsInstance.reps : 0;
                for (var i = 0; i < instance.reps; i++) {
                    var startNode = i * nodesPerSlide;
                    slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
                }
                rsInstance.slideNodes = slideNodes;
            }
            return result;
        };
        AjfFormRendererService.prototype._updateFormValueAndValidity = function () {
            this._nodesUpdates.asObservable()
                .pipe(operators.withLatestFrom(this._formGroup), operators.filter(function (_a) {
                var _b = __read(_a, 2), _ = _b[0], fg = _b[1];
                return fg !== null;
            }))
                .subscribe(function (_a) {
                var _b = __read(_a, 2), _ = _b[0], fg = _b[1];
                var form = fg;
                form.updateValueAndValidity();
            });
        };
        AjfFormRendererService.prototype._explodeRepeatingNode = function (allNodes, instance, context) {
            var oldReps = updateRepsNum(instance, context);
            if (oldReps !== instance.reps) {
                this._adjustReps(allNodes, instance, oldReps, context);
            }
        };
        AjfFormRendererService.prototype._orderedNodesInstancesTree = function (allNodes, nodes, parent, prefix, context) {
            var _this = this;
            if (parent === void 0) { parent = null; }
            if (prefix === void 0) { prefix = []; }
            var nodesInstances = [];
            var curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
            orderedNodes(nodes, parent).forEach(function (node) {
                var parentNodeInstance = nodesInstances.find(function (ni) { return ni.node.id == node.parent && nodeInstanceSuffix(ni) == curSuffix; });
                var branchVisibility = parentNodeInstance != null ?
                    parentNodeInstance.verifiedBranch != null &&
                        parentNodeInstance.verifiedBranch == node.parentNode :
                    true;
                var nni = _this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
                if (nni != null) {
                    nodesInstances.push(nni);
                }
            });
            return nodesInstances;
        };
        AjfFormRendererService.prototype._formValueDelta = function (oldValue, newValue) {
            return Object.keys(newValue).filter(function (k) { return oldValue[k] !== newValue[k]; });
        };
        AjfFormRendererService.prototype._initFormGroupStreams = function (formGroup) {
            var _this = this;
            this._formGroupSubscription.unsubscribe();
            var init = true;
            var initForm = true;
            this._formInitEvent.emit(0 /* Initializing */);
            this._formGroupSubscription =
                formGroup.valueChanges
                    .pipe(operators.startWith({}), operators.pairwise(), operators.debounceTime(200), operators.withLatestFrom.apply(void 0, __spread((this._nodesMaps), [this._flatNodes])))
                    .subscribe(function (v) {
                    var oldFormValue = init && {} || v[0][0];
                    init = false;
                    var newFormValue = v[0][1];
                    var visibilityMap = v[1];
                    var repetitionMap = v[2];
                    var conditionalBranchesMap = v[3];
                    var formulaMap = v[4];
                    var validationMap = v[5];
                    var warningMap = v[6];
                    var nextSlideConditionsMap = v[7];
                    var filteredChoicesMap = v[8];
                    var triggerConditionsMap = v[9];
                    var nodes = v[10];
                    // takes the names of the fields that have changed
                    var delta = _this._formValueDelta(oldFormValue, newFormValue);
                    var deltaLen = delta.length;
                    var updatedNodes = [];
                    /*
                      for each field update all properties map
                      with the following rule  "if fieldname is in map update it" and
                      push on updateNodes the node instance that wrap field
                    */
                    delta.forEach(function (fieldName) {
                        updatedNodes = updatedNodes.concat(nodes.filter(function (n) { return nodeInstanceCompleteName(n) === fieldName; }));
                        if (visibilityMap[fieldName] != null) {
                            visibilityMap[fieldName].forEach(function (nodeInstance) {
                                var completeName = nodeInstanceCompleteName(nodeInstance);
                                var visibilityChanged = updateVisibility(nodeInstance, newFormValue);
                                var isField = isFieldInstance(nodeInstance);
                                if (visibilityChanged && !nodeInstance.visible) {
                                    var fg_1 = _this._formGroup.getValue();
                                    if (fg_1 != null) {
                                        var s_1 = rxjs.timer(200).subscribe(function () {
                                            if (s_1 && !s_1.closed) {
                                                s_1.unsubscribe();
                                            }
                                            fg_1.controls[completeName].setValue(null);
                                        });
                                    }
                                    if (isField) {
                                        nodeInstance.value = null;
                                    }
                                }
                                else if (visibilityChanged && nodeInstance.visible && isField) {
                                    var fg = _this._formGroup.getValue();
                                    var res = updateFormula(nodeInstance, newFormValue);
                                    if (fg != null && res.changed) {
                                        fg.controls[completeName].setValue(res.value);
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            });
                        }
                        if (repetitionMap[fieldName] != null) {
                            repetitionMap[fieldName].forEach(function (nodeInstance) {
                                if (isRepeatingContainerNode(nodeInstance.node)) {
                                    var rnInstance = nodeInstance;
                                    var oldReps = updateRepsNum(rnInstance, newFormValue);
                                    if (oldReps !== rnInstance.reps) {
                                        _this._adjustReps(nodes, rnInstance, oldReps, newFormValue);
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            });
                        }
                        if (conditionalBranchesMap[fieldName] != null) {
                            conditionalBranchesMap[fieldName].forEach(function (nodeInstance) {
                                // const branchChanged = nodeInstance.updateConditionalBranches(newFormValue);
                                updateConditionalBranches(nodeInstance, newFormValue);
                                // if (branchChanged) {
                                var verifiedBranch = nodeInstance.verifiedBranch;
                                nodeInstance.conditionalBranches.forEach(function (_condition, idx) {
                                    if (idx == verifiedBranch) {
                                        _this._showSubtree(newFormValue, nodes, nodeInstance, idx);
                                    }
                                    else {
                                        _this._hideSubtree(newFormValue, nodes, nodeInstance, idx);
                                    }
                                });
                                // }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            });
                        }
                        if (formulaMap[fieldName] != null) {
                            formulaMap[fieldName].forEach(function (nodeInstance) {
                                if (isFieldInstance(nodeInstance)) {
                                    var fInstance = nodeInstance;
                                    var res = updateFormula(fInstance, newFormValue);
                                    var fg = _this._formGroup.getValue();
                                    if (fg != null && res.changed) {
                                        updateValidation(fInstance, newFormValue);
                                        fg.controls[nodeInstanceCompleteName(nodeInstance)].setValue(res.value);
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            });
                        }
                        if (validationMap[fieldName] != null) {
                            validationMap[fieldName].forEach(function (nodeInstance) {
                                if (isFieldInstance(nodeInstance)) {
                                    var fInstance = nodeInstance;
                                    newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
                                    updateValidation(fInstance, newFormValue, _this.currentSupplementaryInformations);
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            });
                        }
                        if (warningMap[fieldName] != null) {
                            warningMap[fieldName].forEach(function (nodeInstance) {
                                if (isFieldInstance(nodeInstance)) {
                                    var fInstance = nodeInstance;
                                    updateWarning(fInstance, newFormValue);
                                    if (fInstance.warningResults != null &&
                                        fInstance.warningResults.filter(function (warning) { return warning.result; }).length > 0) {
                                        fInstance.warningTrigger.emit();
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            });
                        }
                        if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
                            if (nextSlideConditionsMap[fieldName]
                                .filter(function (nodeInstance) {
                                if (isFieldInstance(nodeInstance)) {
                                    var fInstance = nodeInstance;
                                    return updateNextSlideCondition(fInstance, newFormValue);
                                }
                                return false;
                            })
                                .length == 1) {
                                _this._nextSlideTrigger.emit();
                            }
                        }
                        if (filteredChoicesMap[fieldName] != null) {
                            filteredChoicesMap[fieldName].forEach(function (nodeInstance) {
                                if (isFieldInstance(nodeInstance)) {
                                    var fInstance = nodeInstance;
                                    if (isFieldWithChoices(fInstance.node)) {
                                        updateFilteredChoices(fInstance, newFormValue);
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            });
                        }
                        if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
                            var res = triggerConditionsMap[fieldName].filter(function (nodeInstance) {
                                if (!isFieldInstance(nodeInstance)) {
                                    return false;
                                }
                                var fInstance = nodeInstance;
                                if (!isFieldWithChoices(fInstance.node)) {
                                    return false;
                                }
                                return updateTriggerConditions(fInstance, newFormValue);
                            });
                            if (res.length == 1) {
                                res[0].selectionTrigger.emit();
                            }
                        }
                    });
                    updatedNodes.forEach(function (n) {
                        var nodeIdx = nodes.indexOf(n);
                        var idx = nodeIdx - 1;
                        while (idx >= 0) {
                            var curNode = nodes[idx];
                            if (isSlidesInstance(curNode)) {
                                var slide = curNode;
                                var subNodesNum = slide.flatNodes.length;
                                var valid = true;
                                for (var i = 0; i < subNodesNum; i++) {
                                    var subNode = slide.flatNodes[i];
                                    if (subNode.visible && isFieldInstance(subNode) &&
                                        !subNode.valid) {
                                        valid = false;
                                        break;
                                    }
                                }
                                if (slide.valid !== valid) {
                                    slide.valid = valid;
                                }
                                slide.updatedEvt.emit();
                            }
                            idx--;
                        }
                        n.updatedEvt.emit();
                    });
                    if (initForm) {
                        initForm = false;
                        _this._formInitEvent.emit(1 /* Complete */);
                    }
                    _this._valueChanged.next();
                });
            return formGroup;
        };
        AjfFormRendererService.prototype._showSubtree = function (context, nodes, node, branch) {
            this._updateSubtreeVisibility(context, nodes, node, true, branch);
        };
        AjfFormRendererService.prototype._hideSubtree = function (context, nodes, node, branch) {
            this._updateSubtreeVisibility(context, nodes, node, false, branch);
        };
        AjfFormRendererService.prototype._updateSubtreeVisibility = function (context, nodes, node, visible, branch) {
            var _this = this;
            var subNodes;
            var nodeSuffix = nodeInstanceSuffix(node);
            if (branch != null) {
                subNodes = nodes.filter(function (n) {
                    var suffix = nodeInstanceSuffix(n);
                    return suffix == nodeSuffix && n.node.parent == node.node.id && n.node.parentNode == branch;
                });
            }
            else {
                subNodes = nodes.filter(function (n) {
                    var suffix = nodeInstanceSuffix(n);
                    return suffix == nodeSuffix && n.node.parent == node.node.id;
                });
            }
            var isContainer = isContainerNode(node.node);
            subNodes.forEach(function (n) {
                if (!isContainer ||
                    (isContainer && node.node.nodes.find(function (cn) { return cn.id == n.node.id; }) == null)) {
                    updateVisibility(n, context, visible);
                    updateFormula(n, context);
                    _this._updateSubtreeVisibility(context, nodes, n, visible);
                }
            });
        };
        AjfFormRendererService.prototype._initNodesStreams = function () {
            this._nodes =
                this._nodesUpdates.pipe(operators.scan(function (nodes, op) {
                    return op(nodes);
                }, []), operators.share());
            this._flatNodesTree = this._nodes.pipe(operators.map(function (nodes) { return flattenNodesInstancesTree(nodes); }), operators.share());
            this._flatNodes = this._flatNodesTree.pipe(operators.map(function (slides) {
                var nodes = [];
                slides.forEach(function (s) {
                    nodes.push(s);
                    nodes = nodes.concat(s.flatNodes);
                });
                return nodes;
            }), operators.share());
        };
        AjfFormRendererService.prototype._removeNodeInstance = function (nodeInstance) {
            var nodeName = nodeInstanceCompleteName(nodeInstance);
            this._removeNodesVisibilityMapIndex(nodeName);
            this._removeNodesRepetitionMapIndex(nodeName);
            this._removeNodesConditionalBranchMapIndex(nodeName);
            this._removeNodesFormulaMapIndex(nodeName);
            this._removeNodesValidationMapIndex(nodeName);
            this._removeNodesWarningMapIndex(nodeName);
            this._removeNodesNextSlideConditionsMapIndex(nodeName);
            this._removeNodesFilteredChoicesMapIndex(nodeName);
            this._removeNodesTriggerConditionsMapIndex(nodeName);
            if (isSlidesInstance(nodeInstance)) {
                return this._removeSlideInstance(nodeInstance);
            }
            else if (isRepeatingContainerNode(nodeInstance.node)) {
                this._removeNodeGroupInstance(nodeInstance);
            }
            else if (isFieldInstance(nodeInstance)) {
                this._removeFieldInstance(nodeInstance);
            }
            return nodeInstance;
        };
        AjfFormRendererService.prototype._removeSlideInstance = function (slideInstance) {
            var _this = this;
            var slide = slideInstance.node;
            if (slide.visibility != null) {
                this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
            }
            slideInstance.conditionalBranches.forEach(function (conditionalBranch) {
                _this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
            });
            return slideInstance;
        };
        AjfFormRendererService.prototype._removeNodeGroupInstance = function (nodeGroupInstance) {
            var nodeGroup = nodeGroupInstance.node;
            if (nodeGroup.visibility != null) {
                this._removeFromNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
            }
            if (nodeGroupInstance.formulaReps != null && nodeGroup.formulaReps != null) {
                this._removeFromNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
            }
            return nodeGroupInstance;
        };
        AjfFormRendererService.prototype._removeFieldInstance = function (fieldInstance) {
            var _this = this;
            var formGroup = this._formGroup.getValue();
            var fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
            if (formGroup != null && formGroup.contains(fieldInstanceName)) {
                formGroup.removeControl(fieldInstanceName);
            }
            if (fieldInstance.validation != null) {
                this._validationNodesMapUpdates.next(function (vmap) {
                    if (vmap[fieldInstanceName] == null) {
                        delete vmap[fieldInstanceName];
                    }
                    return vmap;
                });
            }
            if (fieldInstance.visibility != null) {
                this._removeFromNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
            }
            fieldInstance.conditionalBranches.forEach(function (conditionalBranch) {
                _this._removeFromNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
            });
            if (fieldInstance.formula) {
                this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
            }
            // TODO: check this, probably is never verified
            if (isRepeatingContainerNode(fieldInstance.node)) {
                var rcInstance = fieldInstance;
                if (rcInstance.formulaReps != null) {
                    this._removeFromNodesRepetitionMap(fieldInstance, rcInstance.formulaReps.formula);
                }
            }
            if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
                fieldInstance.validation.conditions.forEach(function (condition) {
                    _this._removeFromNodesValidationMap(fieldInstance, condition.condition);
                });
            }
            if (fieldInstance.warning != null) {
                fieldInstance.warning.conditions.forEach(function (condition) {
                    _this._removeFromNodesWarningMap(fieldInstance, condition.condition);
                });
            }
            if (fieldInstance.nextSlideCondition != null) {
                this._removeFromNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
            }
            if (isFieldWithChoices(fieldInstance.node)) {
                var fwcInstance = fieldInstance;
                if (fwcInstance.choicesFilter != null) {
                    this._removeFromNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
                    if (fwcInstance.triggerConditions != null) {
                        fwcInstance.triggerConditions.forEach(function (condition) {
                            _this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                        });
                    }
                }
            }
            return fieldInstance;
        };
        AjfFormRendererService.prototype._addNodeInstance = function (nodeInstance) {
            if (isRepeatingContainerNode(nodeInstance.node)) {
                return this._addNodeGroupInstance(nodeInstance);
            }
            else if (isSlideInstance(nodeInstance)) {
                return this._addSlideInstance(nodeInstance);
            }
            else if (isFieldInstance(nodeInstance)) {
                return this._addFieldInstance(nodeInstance);
            }
            return nodeInstance;
        };
        AjfFormRendererService.prototype._addFieldInstance = function (fieldInstance) {
            var _this = this;
            var formGroup = this._formGroup.getValue();
            var fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
            if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
                var control = new forms.FormControl();
                control.setValue(fieldInstance.value);
                formGroup.registerControl(fieldInstanceName, control);
            }
            if (fieldInstance.validation != null) {
                this._validationNodesMapUpdates.next(function (vmap) {
                    if (vmap[fieldInstanceName] == null) {
                        vmap[fieldInstanceName] = [];
                    }
                    if (vmap[fieldInstanceName].indexOf(fieldInstance) == -1) {
                        vmap[fieldInstanceName].push(fieldInstance);
                    }
                    return vmap;
                });
            }
            else {
                fieldInstance.valid = true;
            }
            if (fieldInstance.visibility != null) {
                this._addToNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
            }
            fieldInstance.conditionalBranches.forEach(function (conditionalBranch) {
                _this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
            });
            if (fieldInstance.formula) {
                this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
            }
            if (isNodeGroupInstance(fieldInstance)) {
                var ngInstance = fieldInstance;
                if (ngInstance.formulaReps != null) {
                    this._addToNodesRepetitionMap(fieldInstance, ngInstance.formulaReps.formula);
                }
            }
            if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
                fieldInstance.validation.conditions.forEach(function (condition) {
                    _this._addToNodesValidationMap(fieldInstance, condition.condition);
                });
            }
            if (fieldInstance.warning != null) {
                fieldInstance.warning.conditions.forEach(function (condition) {
                    _this._addToNodesWarningMap(fieldInstance, condition.condition);
                });
            }
            if (fieldInstance.nextSlideCondition != null) {
                this._addToNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
            }
            if (isCustomFieldWithChoices(fieldInstance.node) || isFieldWithChoicesInstance(fieldInstance)) {
                var fwcInstance = fieldInstance;
                if (fwcInstance.choicesFilter != null) {
                    this._addToNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
                }
                if (fwcInstance.triggerConditions != null) {
                    fwcInstance.triggerConditions.forEach(function (condition) {
                        _this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                    });
                }
            }
            return fieldInstance;
        };
        AjfFormRendererService.prototype._addSlideInstance = function (slideInstance) {
            var _this = this;
            var slide = slideInstance.node;
            if (slide.visibility != null) {
                this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
            }
            slideInstance.conditionalBranches.forEach(function (conditionalBranch) {
                _this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
            });
            return slideInstance;
        };
        AjfFormRendererService.prototype._addNodeGroupInstance = function (nodeGroupInstance) {
            var _this = this;
            var nodeGroup = nodeGroupInstance.node;
            if (nodeGroup.visibility != null) {
                this._addToNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
            }
            nodeGroupInstance.conditionalBranches.forEach(function (conditionalBranch) {
                _this._addToNodesConditionalBranchMap(nodeGroupInstance, conditionalBranch.condition);
            });
            if (nodeGroupInstance.formulaReps != null) {
                if (nodeGroup.formulaReps != null) {
                    this._addToNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
                }
            }
            else {
                var formGroup = this._formGroup.getValue();
                var nodeGroupInstanceName = nodeInstanceCompleteName(nodeGroupInstance);
                if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
                    var control = new forms.FormControl();
                    control.setValue(nodeGroupInstance.reps);
                    formGroup.registerControl(nodeGroupInstanceName, control);
                }
            }
            return nodeGroupInstance;
        };
        AjfFormRendererService.prototype._removeNodesVisibilityMapIndex = function (index) {
            this._removeNodesMapIndex(this._visibilityNodesMapUpdates, index);
        };
        AjfFormRendererService.prototype._removeNodesRepetitionMapIndex = function (index) {
            this._removeNodesMapIndex(this._repetitionNodesMapUpdates, index);
        };
        AjfFormRendererService.prototype._removeNodesConditionalBranchMapIndex = function (index) {
            this._removeNodesMapIndex(this._conditionalBranchNodesMapUpdates, index);
        };
        AjfFormRendererService.prototype._removeNodesFormulaMapIndex = function (index) {
            this._removeNodesMapIndex(this._formulaNodesMapUpdates, index);
        };
        AjfFormRendererService.prototype._removeNodesValidationMapIndex = function (index) {
            this._removeNodesMapIndex(this._validationNodesMapUpdates, index);
        };
        AjfFormRendererService.prototype._removeNodesWarningMapIndex = function (index) {
            this._removeNodesMapIndex(this._warningNodesMapUpdates, index);
        };
        AjfFormRendererService.prototype._removeNodesFilteredChoicesMapIndex = function (index) {
            this._removeNodesMapIndex(this._filteredChoicesNodesMapUpdates, index);
        };
        AjfFormRendererService.prototype._removeNodesTriggerConditionsMapIndex = function (index) {
            this._removeNodesMapIndex(this._triggerConditionsNodesMapUpdates, index);
        };
        AjfFormRendererService.prototype._removeNodesNextSlideConditionsMapIndex = function (index) {
            this._removeNodesMapIndex(this._nextSlideConditionsNodesMapUpdates, index);
        };
        AjfFormRendererService.prototype._removeNodesMapIndex = function (nodesMap, index) {
            nodesMap.next(function (vmap) {
                if (Object.keys(vmap).indexOf(index) > -1) {
                    delete vmap[index];
                }
                return vmap;
            });
        };
        AjfFormRendererService.prototype._removeFromNodesVisibilityMap = function (nodeInstance, formula) {
            this._removeFromNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._removeFromNodesRepetitionMap = function (nodeInstance, formula) {
            this._removeFromNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._removeFromNodesConditionalBranchMap = function (nodeInstance, formula) {
            this._removeFromNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._removeFromNodesFormulaMap = function (nodeInstance, formula) {
            this._removeFromNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._removeFromNodesValidationMap = function (nodeInstance, formula) {
            this._removeFromNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._removeFromNodesWarningMap = function (nodeInstance, formula) {
            this._removeFromNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._removeFromNodesFilteredChoicesMap = function (nodeInstance, formula) {
            this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._removeFromNodesTriggerConditionsMap = function (nodeInstance, formula) {
            this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._removeFromNodesNextSlideConditionsMap = function (nodeInstance, formula) {
            this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._removeFromNodesMap = function (nodesMap, nodeInstance, formula) {
            var tokens = esprima.tokenize(formula).filter(function (token) { return token.type == 'Identifier' && token.value != '$value'; });
            if (tokens.length > 0) {
                nodesMap.next(function (vmap) {
                    tokens.forEach(function (token) {
                        var tokenName = token.value;
                        if (vmap[tokenName] != null) {
                            var idx = vmap[tokenName].indexOf(nodeInstance);
                            if (idx > -1) {
                                vmap[tokenName].splice(idx, 1);
                                if (vmap[tokenName].length == 0) {
                                    delete vmap[tokenName];
                                }
                            }
                        }
                    });
                    return vmap;
                });
            }
        };
        AjfFormRendererService.prototype._addToNodesVisibilityMap = function (nodeInstance, formula) {
            this._addToNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._addToNodesRepetitionMap = function (nodeInstance, formula) {
            this._addToNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._addToNodesConditionalBranchMap = function (nodeInstance, formula) {
            this._addToNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._addToNodesFormulaMap = function (nodeInstance, formula) {
            this._addToNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._addToNodesValidationMap = function (nodeInstance, formula) {
            this._addToNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._addToNodesWarningMap = function (nodeInstance, formula) {
            this._addToNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._addToNodesFilteredChoicesMap = function (nodeInstance, formula) {
            this._addToNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._addToNodesTriggerConditionsMap = function (nodeInstance, formula) {
            this._addToNodesMap(this._triggerConditionsNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._addToNodesNextSlideConditionsMap = function (nodeInstance, formula) {
            this._addToNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
        };
        AjfFormRendererService.prototype._addToNodesMap = function (nodesMap, nodeInstance, formula) {
            var tokens = esprima.tokenize(formula).filter(function (token) { return token.type == 'Identifier' && token.value != '$value'; });
            if (tokens.length > 0) {
                nodesMap.next(function (vmap) {
                    tokens.forEach(function (token) {
                        var tokenName = token.value;
                        if (vmap[tokenName] == null) {
                            vmap[tokenName] = [];
                        }
                        if (vmap[tokenName].indexOf(nodeInstance) === -1) {
                            vmap[tokenName].push(nodeInstance);
                        }
                    });
                    return vmap;
                });
            }
        };
        AjfFormRendererService.decorators = [
            { type: core.Injectable }
        ];
        AjfFormRendererService.ctorParameters = function () { return [
            { type: AjfValidationService }
        ]; };
        return AjfFormRendererService;
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
    var AjfBaseFieldComponent = /** @class */ (function () {
        function AjfBaseFieldComponent(_changeDetectorRef, _service, _warningAlertService) {
            var _this = this;
            this._changeDetectorRef = _changeDetectorRef;
            this._service = _service;
            this._warningAlertService = _warningAlertService;
            this._warningTriggerSub = rxjs.Subscription.EMPTY;
            this._instanceUpdateSub = rxjs.Subscription.EMPTY;
            this._control = rxjs.defer(function () { return _this._service.getControl(_this.instance)
                .pipe(operators.map(function (ctrl) { return (ctrl || new forms.FormControl()); })); });
        }
        Object.defineProperty(AjfBaseFieldComponent.prototype, "instance", {
            get: function () {
                return this._instance;
            },
            set: function (instance) {
                if (instance !== this._instance) {
                    this._instance = instance;
                    this._setUpInstanceUpdate();
                    this._onInstanceChange();
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfBaseFieldComponent.prototype, "control", {
            get: function () {
                return this._control;
            },
            enumerable: false,
            configurable: true
        });
        AjfBaseFieldComponent.prototype.ngOnInit = function () {
            var _this = this;
            this._warningTriggerSub =
                this.instance.warningTrigger
                    .pipe(operators.withLatestFrom(this.control), operators.filter(function (_a) {
                    var _b = __read(_a, 2), _ = _b[0], ctrl = _b[1];
                    return ctrl != null;
                }))
                    .subscribe(function (_a) {
                    var _b = __read(_a, 2), _ = _b[0], ctrl = _b[1];
                    if (_this.instance.warningResults == null) {
                        return;
                    }
                    var control = ctrl;
                    var s = _this._warningAlertService
                        .showWarningAlertPrompt(_this.instance.warningResults.filter(function (w) { return w.result; }).map(function (w) { return w.warning; }))
                        .subscribe(function (r) {
                        if (r.result) {
                            control.setValue(null);
                        }
                    }, function (_e) {
                        if (s) {
                            s.unsubscribe();
                        }
                    }, function () {
                        if (s) {
                            s.unsubscribe();
                        }
                    });
                });
        };
        AjfBaseFieldComponent.prototype.ngOnDestroy = function () {
            this._warningTriggerSub.unsubscribe();
            this._instanceUpdateSub.unsubscribe();
        };
        AjfBaseFieldComponent.prototype._onInstanceChange = function () { };
        AjfBaseFieldComponent.prototype._setUpInstanceUpdate = function () {
            var _this = this;
            this._instanceUpdateSub.unsubscribe();
            if (this._instance != null) {
                this._instanceUpdateSub = this._instance.updatedEvt.subscribe(function () {
                    if (_this._changeDetectorRef) {
                        try {
                            _this._changeDetectorRef.detectChanges();
                        }
                        catch (e) {
                        }
                    }
                });
            }
            else {
                this._instanceUpdateSub = rxjs.Subscription.EMPTY;
            }
            this._changeDetectorRef.detectChanges();
        };
        AjfBaseFieldComponent.decorators = [
            { type: core.Directive }
        ];
        AjfBaseFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: AjfFormRendererService },
            { type: undefined }
        ]; };
        return AjfBaseFieldComponent;
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
    var AjfBoolToIntPipe = /** @class */ (function () {
        function AjfBoolToIntPipe() {
        }
        AjfBoolToIntPipe.prototype.transform = function (value) {
            return value ? 1 : 0;
        };
        AjfBoolToIntPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfBoolToInt' },] }
        ];
        return AjfBoolToIntPipe;
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
    var AjfDateValuePipe = /** @class */ (function () {
        function AjfDateValuePipe() {
        }
        AjfDateValuePipe.prototype.transform = function (date) {
            if (date == null) {
                return null;
            }
            return date === 'today' ? new Date() : date;
        };
        AjfDateValuePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfDateValue' },] }
        ];
        return AjfDateValuePipe;
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
    var AjfDateValueStringPipe = /** @class */ (function () {
        function AjfDateValueStringPipe() {
        }
        AjfDateValueStringPipe.prototype.transform = function (date) {
            if (date == null) {
                return undefined;
            }
            var dateObj = date === 'today' ? new Date() : date;
            return dateFns.format(dateObj, 'yyyy-MM-dd');
        };
        AjfDateValueStringPipe.decorators = [
            { type: core.Injectable },
            { type: core.Pipe, args: [{ name: 'ajfDateValueString' },] }
        ];
        return AjfDateValueStringPipe;
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
     * This class will define an Ajf invalid field definition error
     */
    var AjfInvalidFieldDefinitionError = /** @class */ (function (_super) {
        __extends(AjfInvalidFieldDefinitionError, _super);
        function AjfInvalidFieldDefinitionError(message) {
            return _super.call(this, message) || this;
        }
        Object.defineProperty(AjfInvalidFieldDefinitionError.prototype, "name", {
            get: function () {
                return 'AjfInvalidFieldDefinitionError';
            },
            enumerable: false,
            configurable: true
        });
        return AjfInvalidFieldDefinitionError;
    }(models.AjfError));

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
    var AjfExpandFieldWithChoicesPipe = /** @class */ (function () {
        function AjfExpandFieldWithChoicesPipe() {
        }
        AjfExpandFieldWithChoicesPipe.prototype.transform = function (instance, threshold) {
            return !instance.node.forceNarrow &&
                (instance.node.forceExpanded ||
                    (instance.filteredChoices && instance.filteredChoices.length <= threshold));
        };
        AjfExpandFieldWithChoicesPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfExpandFieldWithChoices' },] }
        ];
        return AjfExpandFieldWithChoicesPipe;
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
    var AjfFieldHost = /** @class */ (function () {
        function AjfFieldHost(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        AjfFieldHost.decorators = [
            { type: core.Directive, args: [{ selector: '[ajf-field-host]' },] }
        ];
        AjfFieldHost.ctorParameters = function () { return [
            { type: core.ViewContainerRef }
        ]; };
        return AjfFieldHost;
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
    var AjfFormField = /** @class */ (function () {
        function AjfFormField(_cdr, _cfr) {
            this._cdr = _cdr;
            this._cfr = _cfr;
            this._init = false;
            this._updatedSub = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(AjfFormField.prototype, "instance", {
            get: function () {
                return this._instance;
            },
            set: function (instance) {
                if (this._instance !== instance) {
                    this._instance = instance;
                    if (this._init) {
                        this._loadComponent();
                    }
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormField.prototype, "readonly", {
            get: function () {
                return this._readonly;
            },
            set: function (readonly) {
                this._readonly = coercion.coerceBooleanProperty(readonly);
                if (this._init) {
                    this._loadComponent();
                }
            },
            enumerable: false,
            configurable: true
        });
        AjfFormField.prototype.ngOnDestroy = function () {
            this._updatedSub.unsubscribe();
        };
        AjfFormField.prototype.ngOnInit = function () {
            this._init = true;
            this._loadComponent();
        };
        AjfFormField.prototype._loadComponent = function () {
            var _this = this;
            this._updatedSub.unsubscribe();
            this._updatedSub = rxjs.Subscription.EMPTY;
            if (this._instance == null || this.fieldHost == null) {
                return;
            }
            var vcr = this.fieldHost.viewContainerRef;
            vcr.clear();
            var componentDef = this.componentsMap[this._instance.node.fieldType];
            if (componentDef == null) {
                return;
            }
            var component = this._readonly && componentDef.readOnlyComponent ?
                componentDef.readOnlyComponent :
                componentDef.component;
            try {
                var componentFactory = this._cfr.resolveComponentFactory(component);
                var componentRef = vcr.createComponent(componentFactory);
                this._componentInstance = componentRef.instance;
                this._componentInstance.instance = this._instance;
                if (componentDef.inputs) {
                    Object.keys(componentDef.inputs).forEach(function (key) {
                        if (key in _this._componentInstance) {
                            _this._componentInstance[key] = componentDef.inputs[key];
                        }
                    });
                }
                this._updatedSub = this._instance.updatedEvt.subscribe(function () { return _this._cdr.markForCheck(); });
            }
            catch (e) {
                console.log(e);
            }
        };
        AjfFormField.decorators = [
            { type: core.Directive }
        ];
        AjfFormField.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: core.ComponentFactoryResolver }
        ]; };
        AjfFormField.propDecorators = {
            fieldHost: [{ type: core.ViewChild, args: [AjfFieldHost, { static: true },] }],
            instance: [{ type: core.Input }],
            readonly: [{ type: core.Input }]
        };
        return AjfFormField;
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
    function fieldIconName(type) {
        return "ajf-icon-field-" + (typeof exports.AjfFieldType[type] === 'string' ? exports.AjfFieldType[type].toLowerCase() : type);
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
    var AjfFieldIconPipe = /** @class */ (function () {
        function AjfFieldIconPipe() {
        }
        AjfFieldIconPipe.prototype.transform = function (field) {
            return fieldIconName(field.fieldType ? field.fieldType : field);
        };
        AjfFieldIconPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfFieldIcon' },] }
        ];
        return AjfFieldIconPipe;
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
    var AjfFieldIsValidPipe = /** @class */ (function () {
        function AjfFieldIsValidPipe() {
        }
        AjfFieldIsValidPipe.prototype.transform = function (validationResults) {
            return validationResults != null && validationResults.filter(function (f) { return !f.result; }).length === 0;
        };
        AjfFieldIsValidPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfFieldIsValid' },] }
        ];
        return AjfFieldIsValidPipe;
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
    var AjfFieldService = /** @class */ (function () {
        function AjfFieldService() {
            this.componentsMap = componentsMap;
        }
        AjfFieldService.prototype.registerCustomField = function (field) {
            var fieldType = field.fieldType, component = field.component;
            if (fieldType < 100) {
                throw new Error('Invalid custom field type, it must be greater than 100');
            }
            if (component == null) {
                throw new Error('Invalid custom field component');
            }
            this.componentsMap[fieldType] = field;
        };
        return AjfFieldService;
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
    var AjfFieldWithChoicesComponent = /** @class */ (function (_super) {
        __extends(AjfFieldWithChoicesComponent, _super);
        function AjfFieldWithChoicesComponent(cdr, service, warningAlertService, searchThreshold) {
            var _this = _super.call(this, cdr, service, warningAlertService) || this;
            _this._searchThreshold = 6;
            if (searchThreshold != null) {
                _this._searchThreshold = searchThreshold;
            }
            return _this;
        }
        Object.defineProperty(AjfFieldWithChoicesComponent.prototype, "searchThreshold", {
            get: function () {
                return this._searchThreshold;
            },
            enumerable: false,
            configurable: true
        });
        return AjfFieldWithChoicesComponent;
    }(AjfBaseFieldComponent));

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
    var AJF_WARNING_ALERT_SERVICE = new core.InjectionToken('ajf-warning-alert-service');

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
    var AjfFileFieldComponent = /** @class */ (function (_super) {
        __extends(AjfFileFieldComponent, _super);
        function AjfFileFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfFileFieldComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-file-field',
                        template: "<ajf-file-input *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-file-input>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    },] }
        ];
        AjfFileFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: AjfFormRendererService },
            { type: undefined, decorators: [{ type: core.Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] }
        ]; };
        return AjfFileFieldComponent;
    }(AjfBaseFieldComponent));

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
    var AjfFormActionEvent = /** @class */ (function () {
        function AjfFormActionEvent() {
        }
        return AjfFormActionEvent;
    }());
    var AjfFormRenderer = /** @class */ (function () {
        /**
         * this constructor will init current formula by ajfBuilderService
         */
        function AjfFormRenderer(_rendererService, _changeDetectorRef) {
            this._rendererService = _rendererService;
            this._changeDetectorRef = _changeDetectorRef;
            // ajfFieldTypes [ Text, Number, Boolean, SingleChoice, MultipleChoice,
            // Formula, Empty, Composed, LENGTH ]
            this.ajfFieldTypes = exports.AjfFieldType;
            this._orientationChange = new core.EventEmitter();
            this.orientationChange = this._orientationChange.asObservable();
            this._saveDisabled = false;
            this._hasStartMessage = false;
            this._hasEndMessage = false;
            this._hideTopToolbar = false;
            this._hideBottomToolbar = false;
            this._hideNavigationButtons = false;
            this._fixedOrientation = false;
            this._readonly = false;
            this._orientation = 'horizontal';
            this._errorMoveEvent = new core.EventEmitter();
            // _init is a private boolean
            this._init = false;
            this._nextSlideSubscription = rxjs.Subscription.EMPTY;
            this._errorMoveSubscription = rxjs.Subscription.EMPTY;
            this._formAction = new core.EventEmitter();
            this.formAction = this._formAction.asObservable();
            this.formGroup = _rendererService.formGroup;
            this.slides = _rendererService.nodesTree;
            this._errorPositions = _rendererService.errorPositions;
            this.errors = _rendererService.errors;
            this.slidesNum = _rendererService.slidesNum;
            this.formIsInit =
                _rendererService.formInitEvent.pipe(operators.map(function (e) { return e === 1 /* Complete */; }));
        }
        Object.defineProperty(AjfFormRenderer.prototype, "saveDisabled", {
            get: function () {
                return this._saveDisabled;
            },
            set: function (saveDisabled) {
                this._saveDisabled = coercion.coerceBooleanProperty(saveDisabled);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hasStartMessage", {
            get: function () {
                return this._hasStartMessage;
            },
            set: function (hasStartMessage) {
                this._hasStartMessage = coercion.coerceBooleanProperty(hasStartMessage);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hasEndMessage", {
            get: function () {
                return this._hasEndMessage;
            },
            set: function (hasEndMessage) {
                this._hasEndMessage = coercion.coerceBooleanProperty(hasEndMessage);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hideTopToolbar", {
            get: function () {
                return this._hideTopToolbar;
            },
            set: function (hideTopToolbar) {
                this._hideTopToolbar = coercion.coerceBooleanProperty(hideTopToolbar);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hideBottompToolbar", {
            get: function () {
                return this._hideBottomToolbar;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hideBottomToolbar", {
            set: function (hideBottomToolbar) {
                this._hideBottomToolbar = coercion.coerceBooleanProperty(hideBottomToolbar);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hideNavigationButtons", {
            get: function () {
                return this._hideNavigationButtons;
            },
            set: function (hideNavigationButtons) {
                this._hideNavigationButtons = coercion.coerceBooleanProperty(hideNavigationButtons);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "fixedOrientation", {
            get: function () {
                return this._fixedOrientation;
            },
            set: function (fixedOrientation) {
                this._fixedOrientation = coercion.coerceBooleanProperty(fixedOrientation);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "readonly", {
            get: function () {
                return this._readonly;
            },
            set: function (readonly) {
                this._readonly = coercion.coerceBooleanProperty(readonly);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "orientation", {
            get: function () {
                return this._orientation;
            },
            set: function (orientation) {
                if (orientation !== 'horizontal' && orientation !== 'vertical') {
                    return;
                }
                if (orientation !== this._orientation) {
                    this._orientation = orientation;
                    this._changeDetectorRef.markForCheck();
                    this._orientationChange.emit(this._orientation);
                }
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "form", {
            set: function (form) {
                this._form = form;
                if (this._init) {
                    this._rendererService.setForm(this._form);
                }
            },
            enumerable: false,
            configurable: true
        });
        /**
         * this method will scroll to next error received by subscribe
         */
        AjfFormRenderer.prototype.goToNextError = function () {
            this._errorMoveEvent.emit(true);
        };
        /**
         * this method will scroll to prev error received by subscribe
         */
        AjfFormRenderer.prototype.goToPrevError = function () {
            this._errorMoveEvent.emit(false);
        };
        /**
         * this method will add group
         */
        AjfFormRenderer.prototype.addGroup = function (nodeGroup) {
            var _this = this;
            var s = this._rendererService.addGroup(nodeGroup)
                .pipe(operators.delayWhen(function () { return _this.formSlider.pageScrollFinish; }))
                .subscribe(function (r) {
                if (r && _this.formSlider != null) {
                    _this.formSlider.slide({ dir: 'down' });
                }
            }, function (_e) {
                if (s) {
                    s.unsubscribe();
                }
            }, function () {
                if (s) {
                    s.unsubscribe();
                }
            });
        };
        /**
         * this method will remove group
         */
        AjfFormRenderer.prototype.removeGroup = function (nodeGroup) {
            var _this = this;
            var s = this._rendererService.removeGroup(nodeGroup)
                .pipe(operators.delayWhen(function () { return _this.formSlider.pageScrollFinish; }))
                .subscribe(function (r) {
                if (r && _this.formSlider != null) {
                    _this.formSlider.slide({ dir: 'up' });
                }
            }, function (_e) {
                if (s) {
                    s.unsubscribe();
                }
            }, function () {
                if (s) {
                    s.unsubscribe();
                }
            });
        };
        AjfFormRenderer.prototype.onSave = function (_evt) {
            this._formAction.emit({ source: this, action: 'save', value: this._rendererService.getFormValue() });
        };
        AjfFormRenderer.prototype.onFormAction = function (_evt, action) {
            this._formAction.emit({ source: this, value: this._rendererService.getFormValue(), action: action });
        };
        /**
         * this method will set current form in rederer service when init form
         */
        AjfFormRenderer.prototype.ngAfterViewInit = function () {
            if (this._form != null) {
                this._rendererService.setForm(this._form);
                this._changeDetectorRef.detectChanges();
            }
        };
        AjfFormRenderer.prototype.ngAfterViewChecked = function () {
            var _this = this;
            if (!this._init && this.formSlider != null) {
                this._init = true;
                this._errorMoveSubscription =
                    this._errorMoveEvent
                        .pipe(operators.withLatestFrom(this._errorPositions))
                        .subscribe(function (_a) {
                        var _b = __read(_a, 2), move = _b[0], errs = _b[1];
                        var currentPosition = _this.formSlider.currentPage - (+_this.hasStartMessage) + 1;
                        if (errs == null) {
                            return;
                        }
                        var errors = errs;
                        var found = false;
                        var prevIdx = -1;
                        var nextIdx = -1;
                        var idx = 0;
                        var errorsLen = errors.length;
                        while (!found && idx < errorsLen) {
                            if (errors[idx] == currentPosition) {
                                found = true;
                                prevIdx = idx > 0 ? idx - 1 : errorsLen - 1;
                                nextIdx = idx < errorsLen - 1 ? idx + 1 : 0;
                            }
                            else if (errors[idx] > currentPosition) {
                                found = true;
                                prevIdx = idx > 0 ? idx - 1 : errorsLen - 1;
                                nextIdx = idx;
                            }
                            idx++;
                        }
                        if (!found) {
                            prevIdx = errorsLen - 1;
                            nextIdx = 0;
                        }
                        _this.formSlider.slide({ to: move ? errors[nextIdx] - 1 : errors[prevIdx] - 1 });
                        _this._changeDetectorRef.detectChanges();
                    });
            }
        };
        AjfFormRenderer.prototype.ngOnDestroy = function () {
            this._nextSlideSubscription.unsubscribe();
            this._errorMoveSubscription.unsubscribe();
            this._orientationChange.complete();
            this._errorMoveEvent.complete();
            this._formAction.complete();
        };
        AjfFormRenderer.prototype.orientationChangeHandler = function (orientation) {
            this.orientation = orientation;
        };
        AjfFormRenderer.prototype.trackNodeById = function (_, node) {
            return nodeInstanceCompleteName(node);
        };
        AjfFormRenderer.decorators = [
            { type: core.Directive }
        ];
        AjfFormRenderer.ctorParameters = function () { return [
            { type: AjfFormRendererService },
            { type: core.ChangeDetectorRef }
        ]; };
        AjfFormRenderer.propDecorators = {
            title: [{ type: core.Input }],
            orientationChange: [{ type: core.Output }],
            saveDisabled: [{ type: core.Input }],
            hasStartMessage: [{ type: core.Input }],
            hasEndMessage: [{ type: core.Input }],
            hideTopToolbar: [{ type: core.Input }],
            hideBottomToolbar: [{ type: core.Input }],
            hideNavigationButtons: [{ type: core.Input }],
            fixedOrientation: [{ type: core.Input }],
            readonly: [{ type: core.Input }],
            orientation: [{ type: core.Input }],
            formSlider: [{ type: core.ViewChild, args: ['formSlider', { static: false },] }],
            fields: [{ type: core.ViewChildren, args: [AjfFormField,] }],
            formAction: [{ type: core.Output }],
            form: [{ type: core.Input }]
        };
        return AjfFormRenderer;
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
    var AjfGetTableCellControlPipe = /** @class */ (function () {
        function AjfGetTableCellControlPipe() {
        }
        AjfGetTableCellControlPipe.prototype.transform = function (ctrl) {
            if (ctrl == null || typeof ctrl === 'string') {
                return null;
            }
            return ctrl;
        };
        AjfGetTableCellControlPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfGetTableCellControl' },] }
        ];
        return AjfGetTableCellControlPipe;
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
    var AjfImageFieldComponent = /** @class */ (function (_super) {
        __extends(AjfImageFieldComponent, _super);
        function AjfImageFieldComponent(cdr, service, was, domSanitizer) {
            var _this = _super.call(this, cdr, service, was) || this;
            var fileStream = _this.control.pipe(operators.filter(function (control) { return control != null; }), operators.switchMap(function (control) {
                control = control;
                return control.valueChanges.pipe(operators.startWith(control.value));
            }), operators.filter(function (value) { return value != null; }), operators.shareReplay(1));
            _this.imageUrl = fileStream.pipe(operators.map(function (file) { return domSanitizer.bypassSecurityTrustResourceUrl(file.content); }));
            return _this;
        }
        AjfImageFieldComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-image-field',
                        template: "<ajf-file-input *ngIf=\"control|async as ctrl\" accept=\"image/*\" [formControl]=\"ctrl!\">\n  <div ajfFilePreview class=\"ajf-image-preview\">\n    <img [src]=\"imageUrl|async\">\n  </div>\n</ajf-file-input>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["ajf-image-field img{min-width:32px;min-height:32px}\n"]
                    },] }
        ];
        AjfImageFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: AjfFormRendererService },
            { type: undefined, decorators: [{ type: core.Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] },
            { type: platformBrowser.DomSanitizer }
        ]; };
        return AjfImageFieldComponent;
    }(AjfBaseFieldComponent));

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
    var AjfIncrementPipe = /** @class */ (function () {
        function AjfIncrementPipe() {
        }
        AjfIncrementPipe.prototype.transform = function (value, increment) {
            if (increment === void 0) { increment = 1; }
            return value + increment;
        };
        AjfIncrementPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfIncrement' },] }
        ];
        return AjfIncrementPipe;
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
    var AjfIsCellEditablePipe = /** @class */ (function () {
        function AjfIsCellEditablePipe() {
        }
        AjfIsCellEditablePipe.prototype.transform = function (cell) {
            if (cell == null || typeof cell === 'string') {
                return false;
            }
            return cell.editable === true;
        };
        AjfIsCellEditablePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfIsCellEditable' },] }
        ];
        return AjfIsCellEditablePipe;
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
    var AjfIsRepeatingSlideInstancePipe = /** @class */ (function () {
        function AjfIsRepeatingSlideInstancePipe() {
        }
        AjfIsRepeatingSlideInstancePipe.prototype.transform = function (instance) {
            return isRepeatingSlideInstance(instance);
        };
        AjfIsRepeatingSlideInstancePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfIsRepeatingSlideInstance' },] }
        ];
        return AjfIsRepeatingSlideInstancePipe;
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
    var AjfNodeCompleteNamePipe = /** @class */ (function () {
        function AjfNodeCompleteNamePipe() {
        }
        AjfNodeCompleteNamePipe.prototype.transform = function (instance) {
            return instance ? nodeInstanceCompleteName(instance) : '';
        };
        AjfNodeCompleteNamePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfNodeCompleteName' },] }
        ];
        return AjfNodeCompleteNamePipe;
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
    var AjfRangePipe = /** @class */ (function () {
        function AjfRangePipe() {
        }
        AjfRangePipe.prototype.transform = function (size, start, step) {
            if (size === void 0) { size = 0; }
            if (start === void 0) { start = 1; }
            if (step === void 0) { step = 1; }
            var range = [];
            for (var length_1 = 0; length_1 < size; ++length_1) {
                range.push(start);
                start += step;
            }
            return range;
        };
        AjfRangePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfRange' },] }
        ];
        return AjfRangePipe;
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
    var AjfInputFieldComponent = /** @class */ (function (_super) {
        __extends(AjfInputFieldComponent, _super);
        function AjfInputFieldComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 'text';
            return _this;
        }
        return AjfInputFieldComponent;
    }(AjfBaseFieldComponent));

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
    var AjfReadOnlyFieldComponent = /** @class */ (function (_super) {
        __extends(AjfReadOnlyFieldComponent, _super);
        function AjfReadOnlyFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfReadOnlyFieldComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-read-only-field',
                        template: "<span *ngIf=\"control|async as ctrl\">{{ctrl.value}}</span>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["ajf-read-only-field span{min-height:1em;display:block}\n"]
                    },] }
        ];
        AjfReadOnlyFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: AjfFormRendererService },
            { type: undefined, decorators: [{ type: core.Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] }
        ]; };
        return AjfReadOnlyFieldComponent;
    }(AjfInputFieldComponent));

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
    var AjfReadOnlyFileFieldComponent = /** @class */ (function (_super) {
        __extends(AjfReadOnlyFileFieldComponent, _super);
        function AjfReadOnlyFileFieldComponent(cdr, service, was, domSanitizer) {
            var _this = _super.call(this, cdr, service, was) || this;
            _this.fileIcon = domSanitizer.bypassSecurityTrustResourceUrl(fileInput.fileIcon);
            var fileStream = _this.control.pipe(operators.filter(function (control) { return control != null; }), operators.switchMap(function (control) {
                control = control;
                return control.valueChanges.pipe(operators.startWith(control.value));
            }), operators.filter(function (value) { return value != null; }), operators.shareReplay(1));
            _this.fileUrl = fileStream.pipe(operators.map(function (file) { return domSanitizer.bypassSecurityTrustResourceUrl(file.content); }));
            _this.fileName = fileStream.pipe(operators.map(function (file) { return file.name; }));
            return _this;
        }
        AjfReadOnlyFileFieldComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-read-only-file-field',
                        template: "<a *ngIf=\"fileUrl|async as fu ; else noFile\" [href]=\"fu\" [download]=\"fileName|async\">\n  <img [src]=\"fileIcon\"> {{ fileName|async }}\n</a>\n<ng-template #noFile>\n  <div class=\"ajf-no-file-placeholder\"></div>\n</ng-template>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["ajf-read-only-file-field img{width:32px;height:32px;margin-right:8px;vertical-align:middle}ajf-read-only-file-field .ajf-no-file-placeholder{width:100%;height:32px;background-color:#eee}\n"]
                    },] }
        ];
        AjfReadOnlyFileFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: AjfFormRendererService },
            { type: undefined, decorators: [{ type: core.Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] },
            { type: platformBrowser.DomSanitizer }
        ]; };
        return AjfReadOnlyFileFieldComponent;
    }(AjfBaseFieldComponent));

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
    var AjfReadOnlyImageFieldComponent = /** @class */ (function (_super) {
        __extends(AjfReadOnlyImageFieldComponent, _super);
        function AjfReadOnlyImageFieldComponent(cdr, service, was, domSanitizer) {
            var _this = _super.call(this, cdr, service, was) || this;
            var fileStream = _this.control.pipe(operators.filter(function (control) { return control != null; }), operators.switchMap(function (control) {
                control = control;
                return control.valueChanges.pipe(operators.startWith(control.value));
            }), operators.filter(function (value) { return value != null; }), operators.shareReplay(1));
            _this.imageUrl = fileStream.pipe(operators.map(function (file) { return domSanitizer.bypassSecurityTrustResourceUrl(file.content); }));
            return _this;
        }
        AjfReadOnlyImageFieldComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-read-only-image-field',
                        template: "<img *ngIf=\"imageUrl|async as iu ; else noImage\" [src]=\"imageUrl|async\">\n<ng-template #noImage>\n  <div class=\"ajf-no-image-placeholder\"></div>\n</ng-template>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["ajf-read-only-image-field .ajf-no-image-placeholder{width:100%;height:32px;background-color:#eee}\n"]
                    },] }
        ];
        AjfReadOnlyImageFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: AjfFormRendererService },
            { type: undefined, decorators: [{ type: core.Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] },
            { type: platformBrowser.DomSanitizer }
        ]; };
        return AjfReadOnlyImageFieldComponent;
    }(AjfBaseFieldComponent));

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
    var AjfReadOnlyTableFieldComponent = /** @class */ (function (_super) {
        __extends(AjfReadOnlyTableFieldComponent, _super);
        function AjfReadOnlyTableFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfReadOnlyTableFieldComponent.decorators = [
            { type: core.Component, args: [{
                        template: "<table class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns && columns.length > 0 && columns[0] != null\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns && columns.length > 1 && columns[1] != null\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n              <ng-container *ngIf=\"contr != null\">\n                <span *ngIf=\"row > 0; else labelCell\"\n                  class=\"ajf-table-cell\">{{ contr.control!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span>\n                <ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template>\n              </ng-container>\n            </ng-container>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    },] }
        ];
        AjfReadOnlyTableFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: AjfFormRendererService },
            { type: undefined, decorators: [{ type: core.Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] }
        ]; };
        return AjfReadOnlyTableFieldComponent;
    }(AjfBaseFieldComponent));

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
    var AjfVideoUrlFieldComponent = /** @class */ (function (_super) {
        __extends(AjfVideoUrlFieldComponent, _super);
        function AjfVideoUrlFieldComponent(cdr, service, was, domSanitizer, httpClient) {
            var _this = _super.call(this, cdr, service, was) || this;
            var video = _this.control.pipe(operators.filter(function (control) { return control != null; }), operators.switchMap(function (control) {
                control = control;
                return control.valueChanges.pipe(operators.startWith(control.value));
            }), operators.filter(function (value) { return value != null; }), operators.map(function (value) { return getVideoProviderAndId(value); }));
            _this.validUrl = video.pipe(operators.map(function (v) { return v != null; }));
            _this.videoThumbnail = video.pipe(operators.filter(function (info) { return info != null; }), operators.switchMap(function (info) { return videoPreviewUrl(httpClient, info); }), operators.filter(function (url) { return url != null; }), operators.map(function (url) { return domSanitizer.bypassSecurityTrustResourceUrl(url); }));
            return _this;
        }
        AjfVideoUrlFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: AjfFormRendererService },
            { type: undefined, decorators: [{ type: core.Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] },
            { type: platformBrowser.DomSanitizer },
            { type: http.HttpClient }
        ]; };
        return AjfVideoUrlFieldComponent;
    }(AjfBaseFieldComponent));
    function videoPreviewUrl(httpClient, video) {
        if (video.provider === 'youtube') {
            return rxjs.of("https://img.youtube.com/vi/" + video.id + "/default.jpg");
        }
        if (video.provider === 'vimeo') {
            return httpClient
                .get("https://vimeo.com/api/oembed.json?url=https://vimeo.com/" + video.id)
                .pipe(operators.map(function (response) { return response.thumbnail_url; }), operators.catchError(function () { return rxjs.of(null); }));
        }
        return rxjs.of('');
    }
    function getVideoProviderAndId(url) {
        var provider = null;
        var id = null;
        if (/youtube|youtu\.be|y2u\.be|i.ytimg\./.test(url)) {
            provider = 'youtube';
            id = getYouTubeVideoId(url);
        }
        else if (/vimeo/.test(url)) {
            provider = 'vimeo';
            id = getVimeoVideoId(url);
        }
        if (provider == null || id == null) {
            return null;
        }
        return { provider: provider, id: id };
    }
    function getVimeoVideoId(url) {
        if (url.indexOf('#') > -1) {
            url = url.split('#')[0];
        }
        if (url.indexOf('?') > -1 && url.indexOf('clip_id=') === -1) {
            url = url.split('?')[0];
        }
        var id = null;
        var arr;
        var vimeoPipe = [
            'https?:\/\/vimeo\.com\/[0-9]+$', 'https?:\/\/player\.vimeo\.com\/video\/[0-9]+$',
            'https?:\/\/vimeo\.com\/channels', 'groups', 'album'
        ].join('|');
        var vimeoRegex = new RegExp(vimeoPipe, 'gim');
        if (vimeoRegex.test(url)) {
            arr = url.split('/');
            if (arr && arr.length) {
                id = arr.pop();
            }
        }
        else if (/clip_id=/gim.test(url)) {
            arr = url.split('clip_id=');
            if (arr && arr.length) {
                id = arr[1].split('&')[0];
            }
        }
        return id;
    }
    function getYouTubeVideoId(url) {
        var shortcode = /youtube:\/\/|https?:\/\/youtu\.be\/|http:\/\/y2u\.be\//g;
        if (shortcode.test(url)) {
            var shortcodeId = url.split(shortcode)[1];
            return stripParameters(shortcodeId);
        }
        // /v/ or /vi/
        var inlinev = /\/v\/|\/vi\//g;
        if (inlinev.test(url)) {
            var inlineId = url.split(inlinev)[1];
            return stripParameters(inlineId);
        }
        // v= or vi=
        var parameterV = /v=|vi=/g;
        if (parameterV.test(url)) {
            var arr = url.split(parameterV);
            return arr[1].split('&')[0];
        }
        // v= or vi=
        var parameterWebp = /\/an_webp\//g;
        if (parameterWebp.test(url)) {
            var webp = url.split(parameterWebp)[1];
            return stripParameters(webp);
        }
        // embed
        var embedReg = /\/embed\//g;
        if (embedReg.test(url)) {
            var embedId = url.split(embedReg)[1];
            return stripParameters(embedId);
        }
        // ignore /user/username pattern
        var usernameReg = /\/user\/([a-zA-Z0-9]*)$/g;
        if (usernameReg.test(url)) {
            return null;
        }
        // user
        var userReg = /\/user\/(?!.*videos)/g;
        if (userReg.test(url)) {
            var elements = url.split('/');
            return stripParameters(elements.pop());
        }
        // attribution_link
        var attrReg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;
        if (attrReg.test(url)) {
            return url.match(attrReg)[1];
        }
        return null;
    }
    function stripParameters(url) {
        // Split parameters or split folder separator
        if (url.indexOf('?') > -1) {
            return url.split('?')[0];
        }
        else if (url.indexOf('/') > -1) {
            return url.split('/')[0];
        }
        return url;
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
    var AjfReadOnlyVideoUrlFieldComponent = /** @class */ (function (_super) {
        __extends(AjfReadOnlyVideoUrlFieldComponent, _super);
        function AjfReadOnlyVideoUrlFieldComponent(cdr, service, was, domSanitizer, httpClient) {
            return _super.call(this, cdr, service, was, domSanitizer, httpClient) || this;
        }
        AjfReadOnlyVideoUrlFieldComponent.decorators = [
            { type: core.Component, args: [{
                        selector: 'ajf-read-only-video-url-field',
                        template: "<div *ngIf=\"control|async as ctrl\" class=\"ajf-video-thumbnail\">\n  <ng-container *ngIf=\"validUrl|async\">\n    <a target=\"_blank\" [href]=\"ctrl.value\">\n      <img *ngIf=\"videoThumbnail|async as thumb\" [src]=\"thumb\" class=\"\" alt=\"\">\n    </a>\n  </ng-container>\n</div>\n",
                        changeDetection: core.ChangeDetectionStrategy.OnPush,
                        encapsulation: core.ViewEncapsulation.None,
                        styles: ["\n"]
                    },] }
        ];
        AjfReadOnlyVideoUrlFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: AjfFormRendererService },
            { type: undefined, decorators: [{ type: core.Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] },
            { type: platformBrowser.DomSanitizer },
            { type: http.HttpClient }
        ]; };
        return AjfReadOnlyVideoUrlFieldComponent;
    }(AjfVideoUrlFieldComponent));

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
    var AjfTableRowClass = /** @class */ (function () {
        function AjfTableRowClass() {
        }
        AjfTableRowClass.prototype.transform = function (value) {
            return value % 2 == 0 ? 'ajf-row-even' : 'ajf-row-odd';
        };
        AjfTableRowClass.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfTableRowClass' },] }
        ];
        return AjfTableRowClass;
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
    var AjfTableVisibleColumnsPipe = /** @class */ (function () {
        function AjfTableVisibleColumnsPipe() {
        }
        AjfTableVisibleColumnsPipe.prototype.transform = function (instance) {
            if (!instance.node.editable) {
                var val = instance.value || [];
                return instance.hideEmptyRows ?
                    val.filter(function (col) { return col[1].reduce(function (prev, cur) {
                        return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                    }, false); })
                        .map(function (v) { return __spread([v[0]], v[1]); }) :
                    val.map(function (v) { return __spread([v[0]], v[1]); });
            }
            return (instance.controls || [])
                .map(function (v) { return __spread([v[0]], v[1]); });
        };
        AjfTableVisibleColumnsPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfTableVisibleColumns' },] }
        ];
        return AjfTableVisibleColumnsPipe;
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
    var AjfValidSlidePipe = /** @class */ (function () {
        function AjfValidSlidePipe() {
        }
        AjfValidSlidePipe.prototype.transform = function (slide, idx) {
            if (idx == null || typeof idx !== 'number') {
                return false;
            }
            if (idx >= slide.slideNodes.length) {
                return true;
            }
            return slide.slideNodes[idx]
                .map(function (n) {
                if (n.visible && Object.keys(n).indexOf('valid') > -1) {
                    return n.valid;
                }
                return true;
            })
                .reduce(function (v1, v2) { return v1 && v2; }, true);
        };
        AjfValidSlidePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfValidSlide', pure: false },] }
        ];
        return AjfValidSlidePipe;
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
    var AjfFormsModule = /** @class */ (function () {
        function AjfFormsModule() {
        }
        AjfFormsModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            AjfAsFieldInstancePipe,
                            AjfAsRepeatingSlideInstancePipe,
                            AjfBoolToIntPipe,
                            AjfDateValuePipe,
                            AjfDateValueStringPipe,
                            AjfExpandFieldWithChoicesPipe,
                            AjfFieldHost,
                            AjfFieldIconPipe,
                            AjfFieldIsValidPipe,
                            AjfFileFieldComponent,
                            AjfGetTableCellControlPipe,
                            AjfImageFieldComponent,
                            AjfIncrementPipe,
                            AjfIsCellEditablePipe,
                            AjfIsRepeatingSlideInstancePipe,
                            AjfNodeCompleteNamePipe,
                            AjfRangePipe,
                            AjfReadOnlyFieldComponent,
                            AjfReadOnlyFileFieldComponent,
                            AjfReadOnlyImageFieldComponent,
                            AjfReadOnlyTableFieldComponent,
                            AjfReadOnlyVideoUrlFieldComponent,
                            AjfTableRowClass,
                            AjfTableVisibleColumnsPipe,
                            AjfValidSlidePipe,
                        ],
                        imports: [
                            common.AjfCommonModule,
                            fileInput.AjfFileInputModule,
                            common$1.CommonModule,
                            http.HttpClientModule,
                            forms.ReactiveFormsModule,
                        ],
                        exports: [
                            AjfAsFieldInstancePipe,
                            AjfAsRepeatingSlideInstancePipe,
                            AjfBoolToIntPipe,
                            AjfDateValuePipe,
                            AjfDateValueStringPipe,
                            AjfExpandFieldWithChoicesPipe,
                            AjfFieldHost,
                            AjfFieldIconPipe,
                            AjfFieldIsValidPipe,
                            AjfFileFieldComponent,
                            AjfGetTableCellControlPipe,
                            AjfImageFieldComponent,
                            AjfIncrementPipe,
                            AjfIsCellEditablePipe,
                            AjfIsRepeatingSlideInstancePipe,
                            AjfNodeCompleteNamePipe,
                            AjfRangePipe,
                            AjfReadOnlyFieldComponent,
                            AjfReadOnlyFileFieldComponent,
                            AjfReadOnlyImageFieldComponent,
                            AjfReadOnlyTableFieldComponent,
                            AjfReadOnlyVideoUrlFieldComponent,
                            AjfTableRowClass,
                            AjfTableVisibleColumnsPipe,
                            AjfValidSlidePipe,
                        ],
                        providers: [
                            AjfDateValueStringPipe,
                            AjfFormRendererService,
                            AjfValidationService,
                        ],
                    },] }
        ];
        return AjfFormsModule;
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
    function getTypeName(v) {
        var typeStr = typeof v;
        return typeStr === 'object' ? v.constructor.toString().match(/\w+/g)[1] : typeStr;
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
    var AJF_SEARCH_ALERT_THRESHOLD = new core.InjectionToken('AJF_SEARCH_ALERT_THRESHOLD');

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
    function createAttachmentsOrigin(origin) {
        return __assign(__assign({}, origin), { attachments: origin.attachments || [] });
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
    var AjfAttachmentsOriginSerializer = /** @class */ (function () {
        function AjfAttachmentsOriginSerializer() {
        }
        AjfAttachmentsOriginSerializer.fromJson = function (origin) {
            if (origin.name == null) {
                throw new Error('Malformed attachments origin');
            }
            return createAttachmentsOrigin(origin);
        };
        return AjfAttachmentsOriginSerializer;
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
    function createChoicesOrigin(origin) {
        return __assign(__assign({}, origin), { type: origin.type, label: origin.label || '', choices: origin.choices || [] });
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
    var AjfChoicesOriginSerializer = /** @class */ (function () {
        function AjfChoicesOriginSerializer() {
        }
        AjfChoicesOriginSerializer.fromJson = function (origin) {
            return createChoicesOrigin(__assign(__assign({}, origin), { type: origin.type || 'fixed', name: origin.name || '' }));
        };
        return AjfChoicesOriginSerializer;
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
    function createFieldWithChoices(field) {
        var node = createField(__assign({}, field));
        return __assign(__assign(__assign({}, node), field), { choices: field.choices || [], forceExpanded: field.forceExpanded || false, forceNarrow: field.forceNarrow || false });
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
    function createContainerNode(containerNode) {
        var node = createNode(containerNode);
        return __assign(__assign({}, node), { nodes: containerNode.nodes || [] });
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
    function createRepeatingNode(repeatingNode) {
        var node = createNode(repeatingNode);
        return __assign(__assign(__assign({}, repeatingNode), node), { minReps: repeatingNode.minReps != null ? repeatingNode.minReps : 1, maxReps: repeatingNode.maxReps != null ? repeatingNode.maxReps : 0 });
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
    function createNodeGroup(nodeGroup) {
        return __assign(__assign(__assign({}, createContainerNode(nodeGroup)), createRepeatingNode(nodeGroup)), { nodeType: exports.AjfNodeType.AjfNodeGroup });
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
    function createRepeatingSlide(nodeGroup) {
        return __assign(__assign(__assign({}, createContainerNode(nodeGroup)), createRepeatingNode(nodeGroup)), { nodeType: exports.AjfNodeType.AjfRepeatingSlide });
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
    function createSlide(nodeGroup) {
        return __assign(__assign({}, createContainerNode(nodeGroup)), { nodeType: exports.AjfNodeType.AjfSlide });
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
    var AjfValidationGroupSerializer = /** @class */ (function () {
        function AjfValidationGroupSerializer() {
        }
        AjfValidationGroupSerializer.fromJson = function (group) {
            return createValidationGroup(group);
        };
        return AjfValidationGroupSerializer;
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
    var AjfWarningGroupSerializer = /** @class */ (function () {
        function AjfWarningGroupSerializer() {
        }
        AjfWarningGroupSerializer.fromJson = function (group) {
            return createWarningGroup(group);
        };
        return AjfWarningGroupSerializer;
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
    var AjfNodeSerializer = /** @class */ (function () {
        function AjfNodeSerializer() {
        }
        AjfNodeSerializer.fromJson = function (json, choicesOrigins, attachmentsOrigins) {
            var err = 'Malformed node';
            json.name = json.name || '';
            if (json.id == null || json.parent == null || json.nodeType == null) {
                throw new Error(err);
            }
            var obj = json;
            if (obj.visibility) {
                obj.visibility = models.AjfConditionSerializer.fromJson(obj.visibility);
            }
            obj.conditionalBranches =
                (obj.conditionalBranches || []).map(function (c) { return models.AjfConditionSerializer.fromJson(c); });
            switch (obj.nodeType) {
                case exports.AjfNodeType.AjfField:
                    return AjfNodeSerializer._fieldFromJson(obj, choicesOrigins, attachmentsOrigins);
                case exports.AjfNodeType.AjfFieldNodeLink:
                    return AjfNodeSerializer._fieldNodeLinkFromJson(obj);
                case exports.AjfNodeType.AjfNodeGroup:
                    return AjfNodeSerializer._nodeGroupFromJson(obj, choicesOrigins, attachmentsOrigins);
                case exports.AjfNodeType.AjfRepeatingSlide:
                    return AjfNodeSerializer._repeatingSlideFromJson(obj, choicesOrigins, attachmentsOrigins);
                case exports.AjfNodeType.AjfSlide:
                    return AjfNodeSerializer._slideFromJson(obj, choicesOrigins, attachmentsOrigins);
            }
            throw new Error(err);
        };
        AjfNodeSerializer._containerNodeFromJson = function (json, choicesOrigins, attachmentsOrigins) {
            json.nodes = (json.nodes ||
                []).map(function (n) { return AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins); });
            return createContainerNode(json);
        };
        AjfNodeSerializer._fieldFromJson = function (json, choicesOrigins, attachmentsOrigins) {
            if (json.fieldType == null) {
                throw new Error('Malformed field');
            }
            var obj = json;
            if (obj.validation) {
                obj.validation = AjfValidationGroupSerializer.fromJson(obj.validation);
            }
            if (obj.warning) {
                obj.warning = AjfWarningGroupSerializer.fromJson(obj.warning);
            }
            if (json.attachmentsOriginRef) {
                obj.attachmentOrigin =
                    (attachmentsOrigins || []).find(function (a) { return a.name === json.attachmentsOriginRef; });
            }
            if (obj.nextSlideCondition) {
                obj.nextSlideCondition = models.AjfConditionSerializer.fromJson(obj.nextSlideCondition);
            }
            var isCustomFieldWithChoice = obj.fieldType > 100 && componentsMap[obj.fieldType] != null &&
                componentsMap[obj.fieldType].isFieldWithChoice === true;
            if (isCustomFieldWithChoice) {
                return AjfNodeSerializer._fieldWithChoicesFromJson(json, choicesOrigins);
            }
            switch (obj.fieldType) {
                case exports.AjfFieldType.Formula:
                    return AjfNodeSerializer._formulaFieldFromJson(json);
                case exports.AjfFieldType.MultipleChoice:
                case exports.AjfFieldType.SingleChoice:
                    return AjfNodeSerializer._fieldWithChoicesFromJson(json, choicesOrigins);
            }
            return createField(obj);
        };
        AjfNodeSerializer._fieldNodeLinkFromJson = function (json) {
            return __assign(__assign({}, createNode(json)), { nodeType: exports.AjfNodeType.AjfFieldNodeLink });
        };
        AjfNodeSerializer._fieldWithChoicesFromJson = function (json, choicesOrigins) {
            var err = 'Malformed field with choices';
            if (json.choicesOriginRef == null) {
                throw new Error(err);
            }
            var choicesOrigin = (choicesOrigins || []).find(function (c) { return c.name === json.choicesOriginRef; });
            if (choicesOrigin == null) {
                throw new Error(err);
            }
            if (json.choicesFilter) {
                json.choicesFilter = models.AjfFormulaSerializer.fromJson(json.choicesFilter);
            }
            if (json.triggerConditions) {
                json.triggerConditions = json.triggerConditions.map(function (t) { return models.AjfConditionSerializer.fromJson(t); });
            }
            return createFieldWithChoices(__assign(__assign({}, json), { choicesOrigin: choicesOrigin }));
        };
        AjfNodeSerializer._formulaFieldFromJson = function (json) {
            if (json.formula) {
                json.formula = models.AjfFormulaSerializer.fromJson(json.formula);
            }
            return __assign(__assign({}, createField(json)), { fieldType: exports.AjfFieldType.Formula });
        };
        AjfNodeSerializer._nodeGroupFromJson = function (json, choicesOrigins, attachmentsOrigins) {
            return createNodeGroup(__assign(__assign({}, AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins)), AjfNodeSerializer._repeatingNodeFromJson(json)));
        };
        AjfNodeSerializer._repeatingNodeFromJson = function (json) {
            if (json.formulaReps) {
                json.formulaReps = models.AjfFormulaSerializer.fromJson(json.formulaReps);
            }
            return createRepeatingNode(json);
        };
        AjfNodeSerializer._repeatingSlideFromJson = function (json, choicesOrigins, attachmentsOrigins) {
            return createRepeatingSlide(__assign(__assign({}, AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins)), AjfNodeSerializer._repeatingNodeFromJson(json)));
        };
        AjfNodeSerializer._slideFromJson = function (json, choicesOrigins, attachmentsOrigins) {
            return createSlide(AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins));
        };
        return AjfNodeSerializer;
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
    var AjfFormSerializer = /** @class */ (function () {
        function AjfFormSerializer() {
        }
        AjfFormSerializer.fromJson = function (form, context) {
            var choicesOrigins = (form.choicesOrigins || []).map(function (c) { return AjfChoicesOriginSerializer.fromJson(c); });
            var attachmentsOrigins = (form.attachmentsOrigins || []).map(function (a) { return AjfAttachmentsOriginSerializer.fromJson(a); });
            var nodes = (form.nodes || [])
                .map(function (n) { return AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins); });
            return __assign(__assign({}, form), { choicesOrigins: choicesOrigins,
                attachmentsOrigins: attachmentsOrigins,
                nodes: nodes, stringIdentifier: form.stringIdentifier || [], initContext: utils.deepCopy(context || {}) });
        };
        return AjfFormSerializer;
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
    var AjfTableFieldComponent = /** @class */ (function (_super) {
        __extends(AjfTableFieldComponent, _super);
        function AjfTableFieldComponent(cdr, service, was) {
            return _super.call(this, cdr, service, was) || this;
        }
        AjfTableFieldComponent.prototype.goToNextCell = function (ev, row, column) {
            if (this.instance.controls.length < row ||
                (this.instance.controls.length >= row && this.instance.controls[row].length < 1) ||
                this.instance.controls[row][1].length < column) {
                return;
            }
            var rowLength = this.instance.controls[row][1].length;
            var currentCell = this.instance.controls[row][1][column];
            if (column + 1 >= rowLength) {
                column = 0;
                if (row + 1 >= this.instance.controls.length) {
                    row = 1;
                }
                else {
                    row += 1;
                }
            }
            else {
                column += 1;
            }
            if (typeof currentCell !== 'string') {
                currentCell.show = false;
            }
            this._showCell(row, column);
            ev.preventDefault();
            ev.stopPropagation();
        };
        AjfTableFieldComponent.prototype.goToCell = function (row, column) {
            this._resetControls();
            this._showCell(row, column);
        };
        AjfTableFieldComponent.prototype._resetControls = function () {
            this.instance.controls.forEach(function (row) { return row[1].forEach(function (cell) {
                if (typeof cell !== 'string') {
                    cell.show = false;
                }
            }); });
        };
        AjfTableFieldComponent.prototype._showCell = function (row, column) {
            if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
                return;
            }
            var nextCell = this.instance.controls[row][1][column];
            if (typeof nextCell !== 'string') {
                nextCell.show = true;
            }
        };
        AjfTableFieldComponent.ctorParameters = function () { return [
            { type: core.ChangeDetectorRef },
            { type: AjfFormRendererService },
            { type: undefined, decorators: [{ type: core.Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] }
        ]; };
        return AjfTableFieldComponent;
    }(AjfBaseFieldComponent));

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
    function createChoicesFixedOrigin(origin) {
        var type = 'fixed';
        return __assign(__assign({}, createChoicesOrigin(__assign(__assign({}, origin), { type: type }))), { type: type });
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
    function createChoicesFunctionOrigin(origin) {
        return __assign(__assign({}, origin), { type: 'function', label: origin.label || '', choices: origin.choices || [] });
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
    function createChoicesObservableArrayOrigin(origin) {
        return __assign(__assign({}, origin), { type: 'observableArray', label: origin.label || '', choices: origin.choices || [] });
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
    function createChoicesObservableOrigin(origin) {
        return __assign(__assign({}, origin), { type: 'observable', label: origin.label || '', choices: origin.choices || [] });
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
    function createChoicesPromiseOrigin(origin) {
        return __assign(__assign({}, origin), { type: 'promise', label: origin.label || '', choices: origin.choices || [] });
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
    function isChoicesOrigin(co) {
        return co != null && typeof co === 'object' && co.name != null && typeof co.name === 'string' &&
            co.label != null && typeof co.label === 'string' &&
            ['fixed', 'promise', 'observable', 'observableArray', 'function'].indexOf(co.type) > -1 &&
            co.choices instanceof Array;
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
    function isChoicesFixedOrigin(origin) {
        return isChoicesOrigin(origin) && origin.type === 'fixed';
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
    function isNumberField(field) {
        return field.fieldType === exports.AjfFieldType.Number;
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
    function createForm(form) {
        if (form === void 0) { form = {}; }
        return {
            nodes: form.nodes || [],
            choicesOrigins: form.choicesOrigins || [],
            attachmentsOrigins: form.attachmentsOrigins || [],
            initContext: form.initContext || {},
            stringIdentifier: form.stringIdentifier || [],
            supplementaryInformations: form.supplementaryInformations,
        };
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
    function maxDigitsValidation(maxValue) {
        return createValidation({
            condition: "$value ? $value.toString().length <= " + maxValue.toString() + " : false",
            errorMessage: 'Digits count must be <= ' + maxValue.toString()
        });
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
    function maxValidation(maxValue) {
        return createValidation({
            condition: '$value <= ' + maxValue.toString(),
            errorMessage: 'Value must be <= ' + maxValue.toString()
        });
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
    function minDigitsValidation(minValue) {
        return createValidation({
            condition: "$value ? $value.toString().length >= " + minValue.toString() + " : false",
            errorMessage: 'Digits count must be >= ' + minValue.toString()
        });
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
    function minValidation(minValue) {
        return createValidation({
            condition: '$value >= ' + minValue.toString(),
            errorMessage: 'Value must be >= ' + minValue.toString()
        });
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
    function notEmptyValidation() {
        return createValidation({ condition: "notEmpty($value)", errorMessage: "Value must not be empty" });
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
    function notEmptyWarning() {
        return createWarning({ condition: 'notEmpty($value)', warningMessage: 'Value must not be empty' });
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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AJF_SEARCH_ALERT_THRESHOLD = AJF_SEARCH_ALERT_THRESHOLD;
    exports.AJF_WARNING_ALERT_SERVICE = AJF_WARNING_ALERT_SERVICE;
    exports.AjfAsFieldInstancePipe = AjfAsFieldInstancePipe;
    exports.AjfAsRepeatingSlideInstancePipe = AjfAsRepeatingSlideInstancePipe;
    exports.AjfAttachmentsOriginSerializer = AjfAttachmentsOriginSerializer;
    exports.AjfBaseFieldComponent = AjfBaseFieldComponent;
    exports.AjfBoolToIntPipe = AjfBoolToIntPipe;
    exports.AjfChoicesOriginSerializer = AjfChoicesOriginSerializer;
    exports.AjfDateValuePipe = AjfDateValuePipe;
    exports.AjfDateValueStringPipe = AjfDateValueStringPipe;
    exports.AjfExpandFieldWithChoicesPipe = AjfExpandFieldWithChoicesPipe;
    exports.AjfFieldHost = AjfFieldHost;
    exports.AjfFieldIconPipe = AjfFieldIconPipe;
    exports.AjfFieldIsValidPipe = AjfFieldIsValidPipe;
    exports.AjfFieldService = AjfFieldService;
    exports.AjfFieldWithChoicesComponent = AjfFieldWithChoicesComponent;
    exports.AjfFileFieldComponent = AjfFileFieldComponent;
    exports.AjfFormActionEvent = AjfFormActionEvent;
    exports.AjfFormField = AjfFormField;
    exports.AjfFormRenderer = AjfFormRenderer;
    exports.AjfFormRendererService = AjfFormRendererService;
    exports.AjfFormSerializer = AjfFormSerializer;
    exports.AjfFormsModule = AjfFormsModule;
    exports.AjfGetTableCellControlPipe = AjfGetTableCellControlPipe;
    exports.AjfImageFieldComponent = AjfImageFieldComponent;
    exports.AjfIncrementPipe = AjfIncrementPipe;
    exports.AjfInputFieldComponent = AjfInputFieldComponent;
    exports.AjfInvalidFieldDefinitionError = AjfInvalidFieldDefinitionError;
    exports.AjfIsCellEditablePipe = AjfIsCellEditablePipe;
    exports.AjfIsRepeatingSlideInstancePipe = AjfIsRepeatingSlideInstancePipe;
    exports.AjfNodeCompleteNamePipe = AjfNodeCompleteNamePipe;
    exports.AjfNodeSerializer = AjfNodeSerializer;
    exports.AjfRangePipe = AjfRangePipe;
    exports.AjfReadOnlyFieldComponent = AjfReadOnlyFieldComponent;
    exports.AjfReadOnlyFileFieldComponent = AjfReadOnlyFileFieldComponent;
    exports.AjfReadOnlyImageFieldComponent = AjfReadOnlyImageFieldComponent;
    exports.AjfReadOnlyTableFieldComponent = AjfReadOnlyTableFieldComponent;
    exports.AjfReadOnlyVideoUrlFieldComponent = AjfReadOnlyVideoUrlFieldComponent;
    exports.AjfTableFieldComponent = AjfTableFieldComponent;
    exports.AjfTableRowClass = AjfTableRowClass;
    exports.AjfTableVisibleColumnsPipe = AjfTableVisibleColumnsPipe;
    exports.AjfValidSlidePipe = AjfValidSlidePipe;
    exports.AjfValidationGroupSerializer = AjfValidationGroupSerializer;
    exports.AjfValidationService = AjfValidationService;
    exports.AjfVideoUrlFieldComponent = AjfVideoUrlFieldComponent;
    exports.AjfWarningGroupSerializer = AjfWarningGroupSerializer;
    exports.createChoicesFixedOrigin = createChoicesFixedOrigin;
    exports.createChoicesFunctionOrigin = createChoicesFunctionOrigin;
    exports.createChoicesObservableArrayOrigin = createChoicesObservableArrayOrigin;
    exports.createChoicesObservableOrigin = createChoicesObservableOrigin;
    exports.createChoicesOrigin = createChoicesOrigin;
    exports.createChoicesPromiseOrigin = createChoicesPromiseOrigin;
    exports.createContainerNode = createContainerNode;
    exports.createField = createField;
    exports.createFieldInstance = createFieldInstance;
    exports.createFieldWithChoicesInstance = createFieldWithChoicesInstance;
    exports.createForm = createForm;
    exports.createNode = createNode;
    exports.createNodeInstance = createNodeInstance;
    exports.createValidation = createValidation;
    exports.createValidationGroup = createValidationGroup;
    exports.createWarning = createWarning;
    exports.createWarningGroup = createWarningGroup;
    exports.fieldIconName = fieldIconName;
    exports.flattenNodes = flattenNodes;
    exports.getTypeName = getTypeName;
    exports.initChoicesOrigin = initChoicesOrigin;
    exports.isChoicesFixedOrigin = isChoicesFixedOrigin;
    exports.isChoicesOrigin = isChoicesOrigin;
    exports.isContainerNode = isContainerNode;
    exports.isCustomFieldWithChoices = isCustomFieldWithChoices;
    exports.isField = isField;
    exports.isFieldWithChoices = isFieldWithChoices;
    exports.isNumberField = isNumberField;
    exports.isRepeatingContainerNode = isRepeatingContainerNode;
    exports.isSlidesNode = isSlidesNode;
    exports.maxDigitsValidation = maxDigitsValidation;
    exports.maxValidation = maxValidation;
    exports.minDigitsValidation = minDigitsValidation;
    exports.minValidation = minValidation;
    exports.notEmptyValidation = notEmptyValidation;
    exports.notEmptyWarning = notEmptyWarning;
    exports.ɵgc_ajf_src_core_forms_forms_a = createNodeGroup;
    exports.ɵgc_ajf_src_core_forms_forms_b = createRepeatingSlide;
    exports.ɵgc_ajf_src_core_forms_forms_c = createSlide;
    exports.ɵgc_ajf_src_core_forms_forms_d = componentsMap;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-forms.umd.js.map
