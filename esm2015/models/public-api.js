/**
 * @fileoverview added by tsickle
 * Generated from: src/core/models/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
export { AjfError } from './error';
export {} from './interface/condition';
export {} from './interface/context';
export {} from './interface/formula';
export {} from './interface/validation-function';
export { AjfConditionSerializer } from './serializers/condition-serializer';
export { AjfFormulaSerializer } from './serializers/formula-serializer';
export { alwaysCondition } from './utils/always-condition';
export { createCondition } from './utils/create-condition';
export { createFormula } from './utils/create-formula';
export { dbg } from './utils/debug';
export { evaluateExpression } from './utils/evaluate-expression';
export { AjfExpressionUtils } from './utils/expression-utils';
export { getContextString } from './utils/get-context-string';
export { neverCondition } from './utils/never-condition';
export { normalizeExpression } from './utils/normalize-expression';
export { validateExpression } from './utils/validate-expression';
export { digitCount, decimalCount, isInt, notEmpty, valueInChoice, scanGroupField, sum, dateOperations, round, extractArray, extractSum, extractArraySum, drawThreshold, extractDates, lastProperty, sumLastProperties, calculateTrendProperty, calculateTrendByProperties, calculateAvgProperty, calculateAvgPropertyArray, alert, formatNumber, formatDate, isoMonth, getCoordinate, dateUtils } from './utils/validation-functions';
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHVibGljLWFwaS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy9wdWJsaWMtYXBpLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLHlCQUFjLFNBQVMsQ0FBQztBQUN4QixlQUFjLHVCQUF1QixDQUFDO0FBQ3RDLGVBQWMscUJBQXFCLENBQUM7QUFDcEMsZUFBYyxxQkFBcUIsQ0FBQztBQUNwQyxlQUFjLGlDQUFpQyxDQUFDO0FBQ2hELHVDQUFjLG9DQUFvQyxDQUFDO0FBQ25ELHFDQUFjLGtDQUFrQyxDQUFDO0FBQ2pELGdDQUFjLDBCQUEwQixDQUFDO0FBQ3pDLGdDQUFjLDBCQUEwQixDQUFDO0FBQ3pDLDhCQUFjLHdCQUF3QixDQUFDO0FBQ3ZDLG9CQUFjLGVBQWUsQ0FBQztBQUM5QixtQ0FBYyw2QkFBNkIsQ0FBQztBQUM1QyxtQ0FBYywwQkFBMEIsQ0FBQztBQUN6QyxpQ0FBYyw0QkFBNEIsQ0FBQztBQUMzQywrQkFBYyx5QkFBeUIsQ0FBQztBQUN4QyxvQ0FBYyw4QkFBOEIsQ0FBQztBQUM3QyxtQ0FBYyw2QkFBNkIsQ0FBQztBQUM1Qyx3WUFBYyw4QkFBOEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5leHBvcnQgKiBmcm9tICcuL2Vycm9yJztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL2NvbmRpdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL2ludGVyZmFjZS9jb250ZXh0JztcbmV4cG9ydCAqIGZyb20gJy4vaW50ZXJmYWNlL2Zvcm11bGEnO1xuZXhwb3J0ICogZnJvbSAnLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi1mdW5jdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3NlcmlhbGl6ZXJzL2NvbmRpdGlvbi1zZXJpYWxpemVyJztcbmV4cG9ydCAqIGZyb20gJy4vc2VyaWFsaXplcnMvZm9ybXVsYS1zZXJpYWxpemVyJztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvYWx3YXlzLWNvbmRpdGlvbic7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2NyZWF0ZS1jb25kaXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9jcmVhdGUtZm9ybXVsYSc7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2RlYnVnJztcbmV4cG9ydCAqIGZyb20gJy4vdXRpbHMvZXZhbHVhdGUtZXhwcmVzc2lvbic7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL2V4cHJlc3Npb24tdXRpbHMnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9nZXQtY29udGV4dC1zdHJpbmcnO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9uZXZlci1jb25kaXRpb24nO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy9ub3JtYWxpemUtZXhwcmVzc2lvbic7XG5leHBvcnQgKiBmcm9tICcuL3V0aWxzL3ZhbGlkYXRlLWV4cHJlc3Npb24nO1xuZXhwb3J0ICogZnJvbSAnLi91dGlscy92YWxpZGF0aW9uLWZ1bmN0aW9ucyc7XG4iXX0=