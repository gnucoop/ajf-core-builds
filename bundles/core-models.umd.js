(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('date-fns'), require('esprima'), require('numbro')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/models', ['exports', 'date-fns', 'esprima', 'numbro'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.models = {}), global.dateFns, global.esprima, global.numbro));
}(this, (function (exports, dateFns, esprima, numbroMod) { 'use strict';

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var dateFns__namespace = /*#__PURE__*/_interopNamespace(dateFns);
    var numbroMod__namespace = /*#__PURE__*/_interopNamespace(numbroMod);

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
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
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
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, state, kind, f) {
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a getter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot read private member from an object whose class did not declare it");
        return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
    }
    function __classPrivateFieldSet(receiver, state, value, kind, f) {
        if (kind === "m")
            throw new TypeError("Private method is not writable");
        if (kind === "a" && !f)
            throw new TypeError("Private accessor was defined without a setter");
        if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
            throw new TypeError("Cannot write private member to an object whose class did not declare it");
        return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
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
    var AjfError = /** @class */ (function (_super) {
        __extends(AjfError, _super);
        /**
         * this constructor will init the message error
         */
        function AjfError(message) {
            var _this = _super.call(this, message) || this;
            // Set the prototype explicitly. Workaround needed in TS >= 2.1 when extending built-ins
            // See: https://github.com/Microsoft/TypeScript-wiki/blob/master/Breaking-Changes.md
            Object.setPrototypeOf(_this, AjfError.prototype);
            _this._message = message || '';
            return _this;
        }
        Object.defineProperty(AjfError.prototype, "name", {
            get: function () {
                return 'AjfError';
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(AjfError.prototype, "message", {
            get: function () {
                return this._message;
            },
            enumerable: false,
            configurable: true
        });
        return AjfError;
    }(Error));

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
    function createCondition(condition) {
        if (condition === void 0) { condition = {}; }
        return { condition: condition.condition || '' };
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
    var AjfConditionSerializer = /** @class */ (function () {
        function AjfConditionSerializer() {
        }
        AjfConditionSerializer.fromJson = function (json) {
            return createCondition(json);
        };
        return AjfConditionSerializer;
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
    function createFormula(formula) {
        if (formula === void 0) { formula = {}; }
        return { formula: formula.formula || '' };
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
    var AjfFormulaSerializer = /** @class */ (function () {
        function AjfFormulaSerializer() {
        }
        AjfFormulaSerializer.fromJson = function (json) {
            return createFormula(json);
        };
        return AjfFormulaSerializer;
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
    function alwaysCondition() {
        return createCondition({ condition: 'true' });
    }

    var execContext = {};
    var numbro = numbroMod__namespace.default || numbroMod__namespace;
    var MAX_REPS = 30;
    var dateUtils = {
        addDays: dateFns__namespace.addDays,
        addMonths: dateFns__namespace.addMonths,
        addYears: dateFns__namespace.addYears,
        endOfISOWeek: dateFns__namespace.endOfISOWeek,
        format: dateFns__namespace.format,
        getDay: dateFns__namespace.getDay,
        parse: dateFns__namespace.parseISO,
        startOfMonth: dateFns__namespace.startOfMonth,
        startOfISOWeek: dateFns__namespace.startOfISOWeek
    };
    var AjfExpressionUtils = /** @class */ (function () {
        function AjfExpressionUtils() {
        }
        return AjfExpressionUtils;
    }());
    AjfExpressionUtils.UTIL_FUNCTIONS = '';
    AjfExpressionUtils.utils = {
        digitCount: { fn: digitCount },
        decimalCount: { fn: decimalCount },
        isInt: { fn: isInt },
        notEmpty: { fn: notEmpty },
        valueInChoice: { fn: valueInChoice },
        scanGroupField: { fn: scanGroupField },
        sum: { fn: sum },
        dateOperations: { fn: dateOperations },
        round: { fn: round },
        extractArray: { fn: extractArray },
        extractSum: { fn: extractSum },
        extractArraySum: { fn: extractArraySum },
        drawThreshold: { fn: drawThreshold },
        extractDates: { fn: extractDates },
        lastProperty: { fn: lastProperty },
        sumLastProperties: { fn: sumLastProperties },
        calculateTrendProperty: { fn: calculateTrendProperty },
        calculateTrendByProperties: { fn: calculateTrendByProperties },
        calculateAvgProperty: { fn: calculateAvgProperty },
        calculateAvgPropertyArray: { fn: calculateAvgPropertyArray },
        alert: { fn: alert },
        formatNumber: { fn: formatNumber },
        formatDate: { fn: formatDate },
        isoMonth: { fn: isoMonth },
        getCoordinate: { fn: getCoordinate },
        Math: { fn: Math },
        parseInt: { fn: parseInt },
        parseFloat: { fn: parseFloat },
        parseDate: { fn: dateUtils.parse },
        Date: { fn: Date },
        COUNTFORMS: { fn: COUNTFORMS },
        COUNTFORMS_UNIQUE: { fn: COUNTFORMS_UNIQUE },
        SUM: { fn: SUM },
        MEAN: { fn: MEAN },
        PERCENT: { fn: PERCENT },
        LAST: { fn: LAST },
        MAX: { fn: MAX },
        MEDIAN: { fn: MEDIAN },
        MODE: { fn: MODE },
    };
    function evaluateExpression(expression, context, forceFormula) {
        var formula = forceFormula || expression || '';
        if (formula === '') {
            return '';
        }
        if (formula === 'true') {
            return true;
        }
        if (formula === 'false') {
            return false;
        }
        if (context != null && context[formula] !== undefined) {
            return context[formula];
        }
        if (/^"[^"]*"$/.test(formula)) {
            return formula.replace(/^"+|"+$/g, '');
        }
        var identifiers = esprima.tokenize(formula).filter(function (t) { return t.type === 'Identifier'; }).map(function (t) { return t.value; });
        var ctx = [];
        identifiers.forEach(function (key) {
            var val = null;
            if (context != null && context[key] !== undefined) {
                val = context[key];
            }
            else if (AjfExpressionUtils.utils[key] !== undefined) {
                var util = AjfExpressionUtils.utils[key];
                val = util.fn;
            }
            ctx.push(val);
        });
        identifiers.push('execContext');
        ctx.push(execContext);
        try {
            var f = new (Function.bind.apply(Function, __spreadArray(__spreadArray([void 0], __read(identifiers)), ["return " + formula])))();
            var res = f.apply(void 0, __spreadArray([], __read(ctx)));
            f = null;
            return res;
        }
        catch (e) {
            return false;
        }
    }
    function digitCount(x) {
        if (isNaN(x) || typeof (x) !== 'number') {
            return 0;
        }
        if (!isFinite(x)) {
            return Infinity;
        }
        return x.toString().replace(/[^0-9]/g, '').length;
    }
    function decimalCount(x) {
        if (typeof x === 'string') {
            x = parseFloat(x);
        }
        if (typeof x !== 'number' || isNaN(x)) {
            return 0;
        }
        var parts = x.toString().split('.');
        return parts.length > 1 ? parts[1].length : 0;
    }
    function isInt(x) {
        if (typeof (x) === 'string') {
            return /^-?\d+$/.test(x);
        }
        if (typeof (x) === 'number') {
            return Math.round(x) === x;
        }
        return false;
    }
    function notEmpty(x) {
        return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);
    }
    function valueInChoice(array, x) {
        return (array || []).indexOf(x) > -1 || array === x;
    }
    function scanGroupField(reps, acc, callback) {
        for (var i = 0; i < reps; i++) {
            acc = callback(acc, i);
        }
        return acc;
    }
    function sum(array) {
        return array.reduce(function (a, b) { return a + b; }, 0);
    }
    function dateOperations(dString, period, operation, v) {
        var fmt = 'mm/dd/yyyy';
        var d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();
        if (operation == 'remove') {
            v = -v;
        }
        var dateOp;
        switch (period) {
            case 'day':
                dateOp = dateUtils.addDays;
                break;
            case 'month':
                dateOp = dateUtils.addMonths;
                break;
            case 'year':
                dateOp = dateUtils.addYears;
                break;
            default:
                return '';
        }
        return dateUtils.format(dateOp(d, v), fmt);
    }
    function round(num, digits) {
        digits = digits || 0;
        var f;
        if (typeof num !== 'number') {
            try {
                f = parseFloat(num);
            }
            catch (e) {
            }
        }
        else {
            f = num;
        }
        if (f == null || isNaN(f)) {
            f = 0;
        }
        var m = Math.pow(10, digits);
        return Math.round(f * m) / m;
    }
    function extractArray(source, property, property2) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        for (var i = 0; i < l; i++) {
            if (source[i][property] != null && property2 != null && source[i][property2] != null) {
                res.push(Number(source[i][property]) + Number(source[i][property2]));
            }
            else if (source[i][property] != null) {
                res.push(source[i][property]);
            }
        }
        return res;
    }
    function extractSum(source, properties) {
        var sumVal = 0;
        properties = (properties || []).slice(0);
        var l = properties.length;
        for (var i = 0; i < l; i++) {
            var array = extractArray(source, properties[i]);
            var leng = array.length;
            for (var j = 0; j < leng; j++) {
                if (!isNaN(Number(array[j]))) {
                    sumVal += Number(array[j]);
                }
            }
        }
        return sumVal;
    }
    function extractArraySum(source, properties) {
        var arrays = [];
        properties = (properties || []).slice(0);
        for (var i = 0; i < properties.length; i++) {
            var array = extractArray(source, properties[i]);
            arrays.push(array);
        }
        var res = [];
        if (arrays.length > 0) {
            for (var weekI = 0; weekI < arrays[0].length; weekI++) {
                var sumVal = 0;
                for (var propI = 0; propI < properties.length; propI++) {
                    sumVal = sumVal + Number(arrays[propI][weekI]);
                }
                res.push(sumVal);
            }
        }
        return res;
    }
    function drawThreshold(source, property, threshold) {
        source = (source || []).slice(0);
        threshold = threshold || [0];
        if (!(threshold instanceof Array)) {
            threshold = [threshold];
        }
        var l = source.length;
        var res = [];
        var count = 0;
        for (var i = 0; i < l; i++) {
            if (source[i][property] != null) {
                if (threshold.length > count) {
                    res.push(threshold[count]);
                }
                else {
                    res.push(threshold[0]);
                }
                count++;
            }
        }
        return res;
    }
    function extractDates(source, property, fmt) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        var prefix = '';
        for (var i = 0; i < l; i++) {
            if (source[i][property] != null) {
                switch (fmt) {
                    case 'WW':
                    case 'ww':
                        prefix = 'W';
                        res.push(prefix + formatDate(source[i]['date_start'], fmt));
                        break;
                    case 'MM':
                    case 'mm':
                        prefix = 'M';
                        res.push(prefix + isoMonth(source[i]['date_start'], fmt));
                        break;
                    default:
                        prefix = '';
                        res.push(prefix + formatDate(source[i]['date_start'], fmt));
                }
            }
        }
        return res;
    }
    function lastProperty(source, property) {
        source = (source || []).slice(0);
        var l = source.length - 1;
        while (l >= 0 && source[l][property] == null) {
            l--;
            if (l < 0) {
                return '';
            }
        }
        return l >= 0 ? source[l][property] : '';
    }
    function sumLastProperties(source, properties) {
        source = (source || []).slice(0);
        var sumVal = 0;
        var val = 0;
        for (var i = 0; i < properties.length; i++) {
            val = Number(lastProperty(source, properties[i]));
            if (!isNaN(val)) {
                sumVal += val;
            }
        }
        return sumVal;
    }
    function calculateTrendProperty(source, property) {
        source = (source || []).slice(0);
        var last = source.length - 1;
        while (source[last][property] == null) {
            if (last == 0) {
                break;
            }
            last--;
        }
        var lastLast = last - 1;
        if (last == 0) {
            lastLast = last;
        }
        else {
            while (source[lastLast][property] == null) {
                if (lastLast == 0) {
                    lastLast = last;
                    break;
                }
                lastLast--;
            }
        }
        var lastProp = source[last] ? (source[last][property] || 0) : 0;
        var lastLastProp = source[lastLast] ? (source[lastLast][property] || 0) : 0;
        if (lastProp == lastLastProp) {
            return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
        }
        else if (lastProp > lastLastProp) {
            return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
        }
        else {
            return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
        }
    }
    function calculateTrendByProperties(source, properties) {
        var arraysum = extractArraySum(source, properties);
        var lastProp = arraysum.length > 0 ? (arraysum[arraysum.length - 1] || 0) : 0;
        var lastLastProp = arraysum.length > 1 ? (arraysum[arraysum.length - 2] || 0) : lastProp;
        if (lastProp == lastLastProp) {
            return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
        }
        else if (lastProp > lastLastProp) {
            return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
        }
        else {
            return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
        }
    }
    function calculateAvgProperty(source, property, range, coefficient) {
        source = (source || []).slice(0);
        coefficient = coefficient || 1;
        range = range || 12;
        var l = source.length;
        var res = 0;
        var counter = 0;
        var noZero = 0;
        if (l < range) {
            range = l;
        }
        while (range != 0) {
            if (source[l - 1][property] != null) {
                counter++;
                res += Number(source[l - 1][property]);
                if (source[l - 1][property] > 0) {
                    noZero++;
                }
            }
            l--;
            range--;
        }
        if (coefficient == 0) {
            return noZero;
        }
        else {
            return round((res / counter) * coefficient, 2) || 0;
        }
    }
    function calculateAvgPropertyArray(source, properties, range, coefficient) {
        source = (source || []).slice(0);
        var resArr = [];
        if (properties && properties.length > 0) {
            var avg = 0;
            coefficient = coefficient || 1;
            range = range || 12;
            var sourceArr = properties.length > 1 ? extractArraySum(source, properties) :
                extractArray(source, properties[0]);
            var l = sourceArr.length;
            for (var len = l; len > 0; len--) {
                var res = 0;
                var counter = 0;
                var noZero = 0;
                if (len < range) {
                    range = len;
                }
                for (var r = 1; r <= range; r++) {
                    var val = sourceArr[len - r];
                    if (val != null) {
                        counter++;
                        res += Number(val);
                        if (val > 0) {
                            noZero++;
                        }
                    }
                }
                if (counter > 0) {
                    if (coefficient == 0) {
                        avg = noZero;
                    }
                    else {
                        avg = (res / counter) * coefficient || 0;
                    }
                    resArr.push(round(avg, 2));
                }
            }
        }
        return resArr.reverse();
    }
    function alert(source, property, threshold) {
        source = (source || []).slice(0);
        if (lastProperty(source, property) > threshold) {
            return '<p><i class="material-icons" style="color:red">warning</i></p>';
        }
        else {
            return '<p></p>';
        }
    }
    function formatNumber(num, fmt) {
        fmt = fmt || '0,0[.]0';
        return numbro(num).format(fmt);
    }
    function formatDate(date, fmt) {
        fmt = fmt || 'mm-DD-yyyy';
        return dateUtils.format(typeof date === 'string' ? dateUtils.parse(date) : date, fmt);
    }
    function isoMonth(date, fmt) {
        fmt = fmt || 'mm';
        var du = dateUtils;
        return du.format(du.addDays(du.startOfISOWeek(date), 3), fmt);
    }
    function getCoordinate(source, zoom) {
        zoom = zoom || 6;
        if (source == null) {
            return [51.505, -0.09, zoom];
        }
        else {
            return [source[0], source[1], zoom];
        }
    }
    /**
     * Counts the collected forms. The form name must be specified. An optional condition can be added
     * to discriminate which forms to count in.
     */
    function COUNTFORMS(forms, expression) {
        if (expression === void 0) { expression = 'true'; }
        forms = (forms || []).slice(0);
        if (expression === 'true') {
            return forms.length;
        }
        if (forms.length === 0) {
            return 0;
        }
        var isInRepeatingSlide = expression.includes("__");
        if (isInRepeatingSlide) {
            var count_1 = 0;
            forms.forEach(function (f) {
                var _loop_1 = function (i) {
                    if (Object.keys(f).filter(function (key) { return key.includes("__" + i); }).length === 0) {
                        return "break";
                    }
                    if (evaluateExpression(expression.replace('__', "__" + i)), f) {
                        count_1++;
                    }
                };
                for (var i = 0; i <= MAX_REPS; i++) {
                    var state_1 = _loop_1(i);
                    if (state_1 === "break")
                        break;
                }
            });
            return count_1;
        }
        else {
            return forms.filter(function (f) { return evaluateExpression(expression, f); }).length;
        }
    }
    /**
     * Counts the amount of unique form values for a specific field. The form name must be specified. An
     * optional condition can be added to discriminate which forms to count in
     */
    function COUNTFORMS_UNIQUE(forms, fieldName, expression) {
        forms = (forms || []).slice(0);
        var values = [];
        if (expression != null) {
            forms = forms.filter(function (f) { return evaluateExpression(expression, f); });
        }
        forms.forEach(function (f) {
            values.push(evaluateExpression(fieldName, f));
        });
        return Array.from(new Set(values)).length;
    }
    /**
     * Aggregates and sums the values of one or more. An optional condition can be added to discriminate
     * which forms to take for the sum.
     */
    function SUM(forms, expression, condition) {
        var acc = 0;
        forms = (forms || []).slice(0);
        if (expression == null) {
            return 0;
        }
        if (condition != null) {
            forms = forms.filter(function (f) { return evaluateExpression(condition, f); });
        }
        var isInRepeatingSlide = expression.includes("__");
        if (isInRepeatingSlide) {
            forms.forEach(function (f) {
                var _loop_2 = function (i) {
                    if (Object.keys(f).filter(function (key) { return key.includes("__" + i); }).length === 0) {
                        return "break";
                    }
                    var evaluatedExpression = evaluateExpression(expression.replace('__', "__" + i), f);
                    if (Number.isFinite(evaluateExpression)) {
                        acc += evaluatedExpression;
                    }
                };
                for (var i = 0; i <= MAX_REPS; i++) {
                    var state_2 = _loop_2(i);
                    if (state_2 === "break")
                        break;
                }
            });
        }
        else {
            forms.forEach(function (f) { return acc += evaluateExpression(expression, f); });
        }
        return acc;
    }
    /**
     * Calculates the mean of a simple or derived value. An optional condition can be added to
     * discriminate which forms to take for the sum.
     */
    function MEAN(forms, expression) {
        forms = (forms || []).slice(0);
        expression = (expression || '');
        var length = forms.length;
        if (length === 0) {
            return 0;
        }
        var acc = 0;
        forms.forEach(function (f) {
            acc += evaluateExpression(expression, f);
        });
        return Math.trunc(acc / length);
    }
    /**
     * Calculates the % between two members.
     */
    function PERCENT(value1, value2) {
        var res = +value1 / +value2;
        return Number.isFinite(res) ? res + "%" : 'err';
    }
    /**
     * Calculates the expression in the last form by date.
     */
    function LAST(forms, expression, date) {
        if (date === void 0) { date = 'date_end'; }
        forms = (forms || []).slice(0).sort(function (a, b) {
            var dateA = new Date(b[date]).getTime();
            var dateB = new Date(a[date]).getTime();
            return dateA - dateB;
        });
        if (forms.length > 0 && expression != null) {
            var lastForm = forms[forms.length - 1] || [];
            return evaluateExpression(expression, lastForm);
        }
        return 0;
    }
    /**
     * Calculates the max value of the field.
     */
    function MAX(forms, fieldName) {
        forms = (forms || []).slice(0);
        var max = 0;
        forms.forEach(function (form) {
            if (form[fieldName] != null && !isNaN(form[fieldName]) &&
                form[fieldName] > max) {
                max = form[fieldName];
            }
        });
        return max;
    }
    /**
     * Calculates the median value of the field.
     */
    function MEDIAN(forms, fieldName) {
        forms = (forms || []).slice(0);
        var numbers = forms.filter(function (f) { return f[fieldName] != null && !isNaN(f[fieldName]); })
            .map(function (f) { return f[fieldName]; })
            .sort(function (a, b) { return a - b; })
            .filter(function (item, pos, self) { return self.indexOf(item) == pos; });
        return Number.isInteger(numbers.length / 2) ?
            numbers[numbers.length / 2] :
            (numbers[+parseInt("" + (numbers.length - 1 / 2)) / 2] +
                numbers[+parseInt("" + (numbers.length - 1 / 2)) / 2 + 1]) /
                2;
    }
    /**
     * Calculates the mode value of the field.
     */
    function MODE(forms, fieldName) {
        forms = (forms || []).slice(0);
        var maxCount = 0;
        var map = {};
        forms.forEach(function (f) {
            var value = f[fieldName];
            if (value != null) {
                map[value] = map[value] != null ? map[value] + 1 : 1;
            }
            if (map[value] > maxCount) {
                maxCount = map[value];
            }
        });
        return Object.keys(map).filter(function (v) { return map[+v] === maxCount; }).map(function (v) { return +v; });
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
    function getContextString(context) {
        var fstr = AjfExpressionUtils.UTIL_FUNCTIONS;
        if (context instanceof Array) {
            for (var i = 0; i < context.length; i++) {
                fstr = fstr + "var " + context[i] + " = true;";
            }
        }
        else if (context != null) {
            Object.keys(context).forEach(function (x) {
                var val = context[x];
                if (val == null || isNaN(Number(val)) || val === '' || val instanceof Array) {
                    if (val instanceof Array) {
                        for (var i = 0; i < val.length; i++) {
                            val[i] =
                                (val == null || isNaN(Number(val[i])) || val[i] === '') && val[i] || Number(val[i]);
                        }
                    }
                    val = JSON.stringify(val);
                }
                else {
                    val = Number(val);
                }
                fstr = fstr + "var " + x + " = " + val + "; ";
            });
        }
        return fstr;
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
    function neverCondition() {
        return createCondition({ condition: 'false' });
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
    function normalizeExpression(formula, ancestorsNames, prefix) {
        var ancestorsNameStrings = Object.keys(ancestorsNames);
        var tokens = esprima.tokenize(formula)
            .filter(function (token) { return token.type == 'Identifier' && token.value != '$value'; })
            .map(function (token) { return token.value; });
        tokens.forEach(function (t) {
            if (ancestorsNameStrings.indexOf(t) > -1) {
                formula = formula.replace(new RegExp("\\b" + t + "\\b", 'g'), t + "__" + prefix.slice(ancestorsNames[t]).join('__'));
            }
        });
        return formula;
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
    var cachedContext = {};
    var cachedContextString = '{}';
    function validateExpression(str, context) {
        if (context === cachedContext) {
            console.log('cache hit');
        }
        else {
            cachedContext = context;
            cachedContextString = getContextString(context);
        }
        var ctx = cachedContextString;
        try {
            var f = new Function("" + ctx + str);
            f();
            f = null;
            return true;
        }
        catch (e) {
            return false;
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

    /**
     * Generated bundle index. Do not edit.
     */

    exports.AjfConditionSerializer = AjfConditionSerializer;
    exports.AjfError = AjfError;
    exports.AjfExpressionUtils = AjfExpressionUtils;
    exports.AjfFormulaSerializer = AjfFormulaSerializer;
    exports.COUNTFORMS = COUNTFORMS;
    exports.COUNTFORMS_UNIQUE = COUNTFORMS_UNIQUE;
    exports.LAST = LAST;
    exports.MAX = MAX;
    exports.MEAN = MEAN;
    exports.MEDIAN = MEDIAN;
    exports.MODE = MODE;
    exports.PERCENT = PERCENT;
    exports.SUM = SUM;
    exports.alert = alert;
    exports.alwaysCondition = alwaysCondition;
    exports.calculateAvgProperty = calculateAvgProperty;
    exports.calculateAvgPropertyArray = calculateAvgPropertyArray;
    exports.calculateTrendByProperties = calculateTrendByProperties;
    exports.calculateTrendProperty = calculateTrendProperty;
    exports.createCondition = createCondition;
    exports.createFormula = createFormula;
    exports.dateOperations = dateOperations;
    exports.dateUtils = dateUtils;
    exports.decimalCount = decimalCount;
    exports.digitCount = digitCount;
    exports.drawThreshold = drawThreshold;
    exports.evaluateExpression = evaluateExpression;
    exports.extractArray = extractArray;
    exports.extractArraySum = extractArraySum;
    exports.extractDates = extractDates;
    exports.extractSum = extractSum;
    exports.formatDate = formatDate;
    exports.formatNumber = formatNumber;
    exports.getContextString = getContextString;
    exports.getCoordinate = getCoordinate;
    exports.isInt = isInt;
    exports.isoMonth = isoMonth;
    exports.lastProperty = lastProperty;
    exports.neverCondition = neverCondition;
    exports.normalizeExpression = normalizeExpression;
    exports.notEmpty = notEmpty;
    exports.round = round;
    exports.scanGroupField = scanGroupField;
    exports.sum = sum;
    exports.sumLastProperties = sumLastProperties;
    exports.validateExpression = validateExpression;
    exports.valueInChoice = valueInChoice;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-models.umd.js.map
