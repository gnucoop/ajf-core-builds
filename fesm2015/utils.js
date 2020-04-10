/**
 * @fileoverview added by tsickle
 * Generated from: src/core/utils/deep-copy.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @param {?} _
 * @param {?} v
 * @return {?}
 */
function functionSerializer(_, v) {
    if (typeof v === 'function') {
        return v.toString().replace(/[\r\n]+/g, ' ');
    }
    return v;
}
/**
 * @param {?} _
 * @param {?} v
 * @return {?}
 */
function functionDeserializer(_, v) {
    if (typeof v === 'string' && /^function.*?\([^\0]*?\)\s*\{.*\}$/.test(v)) {
        /** @type {?} */
        const argsMatch = v.replace(/\/\/.*$|\/\*[\s\S]*?\*\//mg, '').match(/\(.*?\)/m);
        if (argsMatch != null && argsMatch.length > 0) {
            /** @type {?} */
            const args = argsMatch[0].replace(/^\(|\)$/, '').match(/[^\s(),]+/g) || [];
            /** @type {?} */
            const bodyMatch = v.match(/\{(.*)\}/);
            if (bodyMatch != null && bodyMatch.length > 1) {
                /** @type {?} */
                const body = bodyMatch[1];
                /** @type {?} */
                const fx = args.concat(body);
                return Function.apply(null, fx);
            }
        }
    }
    return v;
}
/**
 * @param {?} oldObj
 * @return {?}
 */
function deepCopy(oldObj) {
    return JSON.parse(JSON.stringify(oldObj, functionSerializer), functionDeserializer);
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/utils/sized-enum-to-string-array.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
 * @param {?} x
 * @return {?}
 */
function sizedEnumToStringArray(x) {
    /** @type {?} */
    let options = [];
    /** @type {?} */
    let optsNum = x.LENGTH;
    for (let i = 0; i < optsNum; i++) {
        options.push(x[i]);
    }
    return options;
}

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/utils/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { deepCopy, sizedEnumToStringArray };
//# sourceMappingURL=utils.js.map
