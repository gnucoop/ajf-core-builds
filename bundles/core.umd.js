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
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core')) :
	typeof define === 'function' && define.amd ? define('@ajf/core', ['exports', '@angular/core'], factory) :
	(global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = {}), global.ng.core));
}(this, function (exports, core) { 'use strict';

	/**
	 * @fileoverview added by tsickle
	 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
	 */
	/**
	 * Current version of Ajf.
	 * @type {?}
	 */
	var VERSION = new core.Version('8.4.0-b1e3941');

	exports.VERSION = VERSION;

	Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core.umd.js.map
