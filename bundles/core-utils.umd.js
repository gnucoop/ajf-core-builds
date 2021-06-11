(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define('@ajf/core/utils', ['exports'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.utils = {})));
}(this, (function (exports) { 'use strict';

    /**
     * @license
     * Copyright (C) Gnucoop soc. coop.
     *
     * This file is part of the Advanced JSON forms (ajf).
     *
     * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
     * modify it under the terms of the GNU Affero General Public License as
     * published by the Free Software Foundation, either version 3 of the License,
     * or (at your option) any later version.
     *
     * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
     * but WITHOUT ANY WARRANTY; without even the implied warranty of
     * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
     * General Public License for more details.
     *
     * You should have received a copy of the GNU Affero General Public License
     * along with Advanced JSON forms (ajf).
     * If not, see http://www.gnu.org/licenses/.
     *
     */
    function functionSerializer(_, v) {
        if (typeof v === 'function') {
            return v.toString().replace(/[\r\n]+/g, ' ');
        }
        return v;
    }
    function functionDeserializer(_, v) {
        if (typeof v === 'string' && /^function.*?\([^\0]*?\)\s*\{.*\}$/.test(v)) {
            var argsMatch = v.replace(/\/\/.*$|\/\*[\s\S]*?\*\//mg, '').match(/\(.*?\)/m);
            if (argsMatch != null && argsMatch.length > 0) {
                var args = argsMatch[0].replace(/^\(|\)$/, '').match(/[^\s(),]+/g) || [];
                var bodyMatch = v.match(/\{(.*)\}/);
                if (bodyMatch != null && bodyMatch.length > 1) {
                    var body = bodyMatch[1];
                    var fx = args.concat(body);
                    return Function.apply(null, fx);
                }
            }
        }
        return v;
    }
    function deepCopy(oldObj) {
        return JSON.parse(JSON.stringify(oldObj, functionSerializer), functionDeserializer);
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
    function sizedEnumToStringArray(x) {
        var options = [];
        var optsNum = x.LENGTH;
        for (var i = 0; i < optsNum; i++) {
            options.push(x[i]);
        }
        return options;
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

    exports.deepCopy = deepCopy;
    exports.sizedEnumToStringArray = sizedEnumToStringArray;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=core-utils.umd.js.map
