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
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/forms'), require('rxjs'), require('rxjs/operators'), require('@angular/core'), require('date-fns'), require('@ajf/core/models'), require('@ajf/core/utils'), require('esprima')) :
    typeof define === 'function' && define.amd ? define('@ajf/core/forms', ['exports', '@angular/forms', 'rxjs', 'rxjs/operators', '@angular/core', 'date-fns', '@ajf/core/models', '@ajf/core/utils', 'esprima'], factory) :
    (global = global || self, factory((global.ajf = global.ajf || {}, global.ajf.core = global.ajf.core || {}, global.ajf.core.forms = {}), global.ng.forms, global.rxjs, global.rxjs.operators, global.ng.core, global.dateFns, global.ajf.core.models, global.ajf.core.utils, global.esprima));
}(this, function (exports, forms, rxjs, operators, core, dateFns, models, utils, esprima__default) { 'use strict';

    var esprima__default__default = 'default' in esprima__default ? esprima__default['default'] : esprima__default;

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
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

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     * @template T
     */
    var   /**
     * @abstract
     * @template T
     */
    AjfBaseFieldComponent = /** @class */ (function () {
        function AjfBaseFieldComponent(_changeDetectorRef, _service, _warningAlertService) {
            var _this = this;
            this._changeDetectorRef = _changeDetectorRef;
            this._service = _service;
            this._warningAlertService = _warningAlertService;
            this._warningTriggerSub = rxjs.Subscription.EMPTY;
            this._instanceUpdateSub = rxjs.Subscription.EMPTY;
            this._control = rxjs.defer((/**
             * @return {?}
             */
            function () { return _this._service.getControl(_this.instance).pipe(operators.map((/**
             * @param {?} ctrl
             * @return {?}
             */
            function (ctrl) { return ctrl || new forms.FormControl(); }))); }));
        }
        Object.defineProperty(AjfBaseFieldComponent.prototype, "instance", {
            get: /**
             * @return {?}
             */
            function () { return this._instance; },
            set: /**
             * @param {?} instance
             * @return {?}
             */
            function (instance) {
                if (instance !== this._instance) {
                    this._instance = instance;
                    this._setUpInstanceUpdate();
                    this._onInstanceChange();
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfBaseFieldComponent.prototype, "control", {
            get: /**
             * @return {?}
             */
            function () { return this._control; },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AjfBaseFieldComponent.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            var _this = this;
            this._warningTriggerSub = this.instance.warningTrigger.pipe(operators.withLatestFrom(this.control), operators.filter((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v[1] != null; }))).subscribe((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                if (_this.instance.warningResults == null) {
                    return;
                }
                /** @type {?} */
                var control = v[1];
                /** @type {?} */
                var s = _this._warningAlertService.showWarningAlertPrompt(_this.instance.warningResults.filter((/**
                 * @param {?} w
                 * @return {?}
                 */
                function (w) { return w.result; })).map((/**
                 * @param {?} w
                 * @return {?}
                 */
                function (w) { return w.warning; }))).subscribe((/**
                 * @param {?} r
                 * @return {?}
                 */
                function (r) {
                    if (r.result) {
                        (/** @type {?} */ (control)).setValue(null);
                    }
                }), (/**
                 * @param {?} _e
                 * @return {?}
                 */
                function (_e) { if (s) {
                    s.unsubscribe();
                } }), (/**
                 * @return {?}
                 */
                function () { if (s) {
                    s.unsubscribe();
                } }));
            }));
        };
        /**
         * @return {?}
         */
        AjfBaseFieldComponent.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._warningTriggerSub.unsubscribe();
            this._instanceUpdateSub.unsubscribe();
        };
        /**
         * @protected
         * @return {?}
         */
        AjfBaseFieldComponent.prototype._onInstanceChange = /**
         * @protected
         * @return {?}
         */
        function () { };
        /**
         * @private
         * @return {?}
         */
        AjfBaseFieldComponent.prototype._setUpInstanceUpdate = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this._instanceUpdateSub.unsubscribe();
            if (this._instance != null) {
                this._instanceUpdateSub = this._instance.updated.subscribe((/**
                 * @return {?}
                 */
                function () {
                    if (_this._changeDetectorRef) {
                        try {
                            _this._changeDetectorRef.detectChanges();
                        }
                        catch (e) { }
                    }
                }));
            }
            else {
                this._instanceUpdateSub = rxjs.Subscription.EMPTY;
            }
            this._changeDetectorRef.detectChanges();
        };
        return AjfBaseFieldComponent;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfDateValuePipe = /** @class */ (function () {
        function AjfDateValuePipe() {
        }
        /**
         * @param {?} date
         * @return {?}
         */
        AjfDateValuePipe.prototype.transform = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (date == null) {
                return undefined;
            }
            return date === 'today' ? new Date() : (/** @type {?} */ (date));
        };
        AjfDateValuePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfDateValue' },] },
        ];
        return AjfDateValuePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfDateValueStringPipe = /** @class */ (function () {
        function AjfDateValueStringPipe() {
        }
        /**
         * @param {?} date
         * @return {?}
         */
        AjfDateValueStringPipe.prototype.transform = /**
         * @param {?} date
         * @return {?}
         */
        function (date) {
            if (date == null) {
                return undefined;
            }
            /** @type {?} */
            var dateObj = date === 'today' ? new Date() : date;
            return dateFns.format(dateObj, 'YYYY-MM-DD');
        };
        AjfDateValueStringPipe.decorators = [
            { type: core.Injectable },
            { type: core.Pipe, args: [{ name: 'ajfDateValueString' },] },
        ];
        return AjfDateValueStringPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * This class will define an Ajf invalid field definition error
     */
    var   /**
     * This class will define an Ajf invalid field definition error
     */
    AjfInvalidFieldDefinitionError = /** @class */ (function (_super) {
        __extends(AjfInvalidFieldDefinitionError, _super);
        function AjfInvalidFieldDefinitionError(message) {
            return _super.call(this, message) || this;
        }
        Object.defineProperty(AjfInvalidFieldDefinitionError.prototype, "name", {
            get: /**
             * @return {?}
             */
            function () { return 'AjfInvalidFieldDefinitionError'; },
            enumerable: true,
            configurable: true
        });
        return AjfInvalidFieldDefinitionError;
    }(models.AjfError));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @enum {number} */
    var AjfFieldType = {
        String: 0,
        Text: 1,
        Number: 2,
        Boolean: 3,
        SingleChoice: 4,
        MultipleChoice: 5,
        Formula: 6,
        Empty: 7,
        Date: 8,
        DateInput: 9,
        Time: 10,
        Table: 11,
        Geolocation: 12,
        Barcode: 13,
        LENGTH: 14,
    };
    AjfFieldType[AjfFieldType.String] = 'String';
    AjfFieldType[AjfFieldType.Text] = 'Text';
    AjfFieldType[AjfFieldType.Number] = 'Number';
    AjfFieldType[AjfFieldType.Boolean] = 'Boolean';
    AjfFieldType[AjfFieldType.SingleChoice] = 'SingleChoice';
    AjfFieldType[AjfFieldType.MultipleChoice] = 'MultipleChoice';
    AjfFieldType[AjfFieldType.Formula] = 'Formula';
    AjfFieldType[AjfFieldType.Empty] = 'Empty';
    AjfFieldType[AjfFieldType.Date] = 'Date';
    AjfFieldType[AjfFieldType.DateInput] = 'DateInput';
    AjfFieldType[AjfFieldType.Time] = 'Time';
    AjfFieldType[AjfFieldType.Table] = 'Table';
    AjfFieldType[AjfFieldType.Geolocation] = 'Geolocation';
    AjfFieldType[AjfFieldType.Barcode] = 'Barcode';
    AjfFieldType[AjfFieldType.LENGTH] = 'LENGTH';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} type
     * @return {?}
     */
    function fieldIconName(type) {
        return "ajf-icon-field-" + (typeof AjfFieldType[type] === 'string'
            ? AjfFieldType[type].toLowerCase()
            : type);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFieldIconPipe = /** @class */ (function () {
        function AjfFieldIconPipe() {
        }
        /**
         * @param {?} field
         * @return {?}
         */
        AjfFieldIconPipe.prototype.transform = /**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            return fieldIconName(((/** @type {?} */ (field))).fieldType ? ((/** @type {?} */ (field))).fieldType : (/** @type {?} */ (field)));
        };
        AjfFieldIconPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfFieldIcon' },] },
        ];
        return AjfFieldIconPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFieldIsValidPipe = /** @class */ (function () {
        function AjfFieldIsValidPipe() {
        }
        /**
         * @param {?=} validationResults
         * @return {?}
         */
        AjfFieldIsValidPipe.prototype.transform = /**
         * @param {?=} validationResults
         * @return {?}
         */
        function (validationResults) {
            return validationResults != null
                && validationResults.filter((/**
                 * @param {?} f
                 * @return {?}
                 */
                function (f) { return !f.result; })).length === 0;
        };
        AjfFieldIsValidPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfFieldIsValid' },] },
        ];
        return AjfFieldIsValidPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    AjfFormField = /** @class */ (function () {
        function AjfFormField(_cdr, _cfr) {
            this._cdr = _cdr;
            this._cfr = _cfr;
            this._updatedSub = rxjs.Subscription.EMPTY;
        }
        Object.defineProperty(AjfFormField.prototype, "instance", {
            get: /**
             * @return {?}
             */
            function () { return this._instance; },
            set: /**
             * @param {?} instance
             * @return {?}
             */
            function (instance) {
                if (this._instance !== instance) {
                    this._instance = instance;
                    this._loadComponent();
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @return {?}
         */
        AjfFormField.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._updatedSub.unsubscribe();
        };
        /**
         * @return {?}
         */
        AjfFormField.prototype.ngOnInit = /**
         * @return {?}
         */
        function () {
            this._loadComponent();
        };
        /**
         * @private
         * @return {?}
         */
        AjfFormField.prototype._loadComponent = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this._updatedSub.unsubscribe();
            this._updatedSub = rxjs.Subscription.EMPTY;
            if (this._instance == null || this.fieldHost == null) {
                return;
            }
            /** @type {?} */
            var vcr = this.fieldHost.viewContainerRef;
            vcr.clear();
            /** @type {?} */
            var componentDef = this.componentsMap[this._instance.node.fieldType];
            if (componentDef == null) {
                return;
            }
            /** @type {?} */
            var component = componentDef.component;
            try {
                /** @type {?} */
                var componentFactory = this._cfr.resolveComponentFactory(component);
                /** @type {?} */
                var componentRef = vcr.createComponent(componentFactory);
                /** @type {?} */
                var componentInstance_1 = componentRef.instance;
                componentInstance_1.instance = this._instance;
                if (componentDef.inputs) {
                    Object.keys(componentDef.inputs).forEach((/**
                     * @param {?} key
                     * @return {?}
                     */
                    function (key) {
                        if (key in componentInstance_1) {
                            ((/** @type {?} */ (componentInstance_1)))[key] = (/** @type {?} */ (componentDef.inputs))[key];
                        }
                    }));
                }
                this._updatedSub = this._instance.updatedEvt.subscribe((/**
                 * @return {?}
                 */
                function () { return _this._cdr.markForCheck(); }));
            }
            catch (e) { }
        };
        return AjfFormField;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFieldHost = /** @class */ (function () {
        function AjfFieldHost(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
        AjfFieldHost.decorators = [
            { type: core.Directive, args: [{ selector: '[ajf-field-host]' },] },
        ];
        /** @nocollapse */
        AjfFieldHost.ctorParameters = function () { return [
            { type: core.ViewContainerRef }
        ]; };
        return AjfFieldHost;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @type {?} */
    var componentsMap = {};

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    AjfFieldService = /** @class */ (function () {
        function AjfFieldService() {
            this.componentsMap = componentsMap;
        }
        /**
         * @param {?} field
         * @return {?}
         */
        AjfFieldService.prototype.registerCustomField = /**
         * @param {?} field
         * @return {?}
         */
        function (field) {
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     * @template T
     */
    var   /**
     * @abstract
     * @template T
     */
    AjfFieldWithChoicesComponent = /** @class */ (function (_super) {
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
            get: /**
             * @return {?}
             */
            function () { return this._searchThreshold; },
            enumerable: true,
            configurable: true
        });
        return AjfFieldWithChoicesComponent;
    }(AjfBaseFieldComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @enum {number} */
    var AjfNodeType = {
        AjfField: 0,
        AjfFieldNodeLink: 1,
        AjfNodeGroup: 2,
        AjfSlide: 3,
        AjfRepeatingSlide: 4,
        LENGTH: 5,
    };
    AjfNodeType[AjfNodeType.AjfField] = 'AjfField';
    AjfNodeType[AjfNodeType.AjfFieldNodeLink] = 'AjfFieldNodeLink';
    AjfNodeType[AjfNodeType.AjfNodeGroup] = 'AjfNodeGroup';
    AjfNodeType[AjfNodeType.AjfSlide] = 'AjfSlide';
    AjfNodeType[AjfNodeType.AjfRepeatingSlide] = 'AjfRepeatingSlide';
    AjfNodeType[AjfNodeType.LENGTH] = 'LENGTH';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} field
     * @return {?}
     */
    function isCustomFieldWithChoices(field) {
        return field.fieldType > 100
            && componentsMap[field.fieldType] != null
            && componentsMap[field.fieldType].isFieldWithChoice === true;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} field
     * @return {?}
     */
    function isFieldWithChoices(field) {
        return field.fieldType === AjfFieldType.SingleChoice ||
            field.fieldType === AjfFieldType.MultipleChoice;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} node
     * @return {?}
     */
    function isField(node) {
        return node != null && node.nodeType === AjfNodeType.AjfField;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeInstance
     * @return {?}
     */
    function isFieldInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isField(nodeInstance.node);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeInstance
     * @return {?}
     */
    function isFieldWithChoicesInstance(nodeInstance) {
        return nodeInstance != null && isFieldInstance(nodeInstance) &&
            isFieldWithChoices(((/** @type {?} */ (nodeInstance))).node);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} field
     * @return {?}
     */
    function isTableField(field) {
        return field.fieldType === AjfFieldType.Table;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeInstance
     * @return {?}
     */
    function isTableFieldInstance(nodeInstance) {
        return nodeInstance != null && isFieldInstance(nodeInstance) &&
            isTableField(((/** @type {?} */ (nodeInstance))).node);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function updateConditionalBranches(instance, context) {
        /** @type {?} */
        var conditionalBranches = instance.conditionalBranches;
        if (conditionalBranches != null) {
            /** @type {?} */
            var oldBranch = instance.verifiedBranch;
            /** @type {?} */
            var idx = 0;
            /** @type {?} */
            var found = false;
            while (idx < conditionalBranches.length && !found) {
                /** @type {?} */
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @param {?=} branchVisibility
     * @return {?}
     */
    function updateVisibility(instance, context, branchVisibility) {
        if (branchVisibility === void 0) { branchVisibility = true; }
        if (instance.visibility == null) {
            instance.visible = false;
            return false;
        }
        /** @type {?} */
        var visibility = instance.visibility;
        /** @type {?} */
        var oldVisibility = instance.visible;
        /** @type {?} */
        var newVisibility = branchVisibility && models.evaluateExpression(visibility.condition, context);
        if (newVisibility !== instance.visible) {
            instance.visible = newVisibility;
        }
        return oldVisibility !== newVisibility;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} instance
     * @return {?}
     */
    function nodeInstanceSuffix(instance) {
        if (instance.prefix == null || instance.prefix.length == 0) {
            return '';
        }
        return "__" + instance.prefix.join('__');
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @return {?}
     */
    function nodeInstanceCompleteName(instance) {
        return "" + instance.node.name + nodeInstanceSuffix(instance);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function updateFormula(instance, context) {
        /** @type {?} */
        var formula = instance.formula;
        /** @type {?} */
        var editable = instance.node.editable;
        if (formula != null && instance.visible && (!editable || (editable && instance.value == null))) {
            /** @type {?} */
            var newValue = models.evaluateExpression(formula.formula, context);
            /** @type {?} */
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function updateNextSlideCondition(instance, context) {
        if (instance.nextSlideCondition != null) {
            return models.evaluateExpression(instance.nextSlideCondition.condition, context);
        }
        return false;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} validation
     * @param {?=} context
     * @param {?=} forceFormula
     * @return {?}
     */
    function evaluateValidation(validation, context, forceFormula) {
        return {
            result: models.evaluateExpression(validation.condition, context, forceFormula),
            error: validation.errorMessage,
            clientValidation: validation.clientValidation,
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} validation
     * @param {?=} context
     * @return {?}
     */
    function evaluateValidationConditions(validation, context) {
        /** @type {?} */
        var res = [];
        validation.conditions.forEach((/**
         * @param {?} cond
         * @return {?}
         */
        function (cond) {
            res.push(evaluateValidation(cond, context));
        }));
        return res;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} validation
     * @param {?} value
     * @return {?}
     */
    function evaluateValidationMaxDigits(validation, value) {
        if (validation.maxDigits == null) {
            return null;
        }
        /** @type {?} */
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} validation
     * @param {?} value
     * @return {?}
     */
    function evaluateValidationMaxValue(validation, value) {
        if (validation.maxValue == null) {
            return null;
        }
        /** @type {?} */
        var ctx = { '$value': value };
        if (typeof validation.maxValue === 'number') {
            return {
                result: models.evaluateExpression("$value.length <= " + validation.maxValue, ctx),
                error: "Value must be <= " + validation.minValue,
                clientValidation: false
            };
        }
        return evaluateValidation(validation.maxValue, { '$value': value });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} validation
     * @param {?} value
     * @return {?}
     */
    function evaluateValidationMinDigits(validation, value) {
        if (validation.minDigits == null) {
            return null;
        }
        /** @type {?} */
        var ctx = { '$value': value };
        if (typeof validation.minDigits === 'number') {
            return {
                result: models.evaluateExpression("$value.toString().length >= " + validation.minDigits, ctx),
                error: "Digits count must be >= " + validation.minValue,
                clientValidation: false
            };
        }
        return evaluateValidation(validation.minDigits, ctx);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} validation
     * @param {?} value
     * @return {?}
     */
    function evaluateValidationMinValue(validation, value) {
        if (validation.minValue == null) {
            return null;
        }
        /** @type {?} */
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} validation
     * @param {?} value
     * @return {?}
     */
    function evaluateValidationNotEmpty(validation, value) {
        if (validation.notEmpty == null) {
            return null;
        }
        /** @type {?} */
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} validation
     * @param {?} value
     * @param {?=} context
     * @return {?}
     */
    function evaluateValidationGroup(validation, value, context) {
        /** @type {?} */
        var res = [];
        /** @type {?} */
        var ctx = utils.deepCopy(context);
        ctx['$value'] = value;
        res = evaluateValidationConditions(validation, ctx);
        if (validation.maxValue) {
            /** @type {?} */
            var maxValue = evaluateValidationMaxValue(validation, value);
            if (maxValue != null) {
                res.push(maxValue);
            }
        }
        if (validation.minValue) {
            /** @type {?} */
            var minValue = evaluateValidationMinValue(validation, value);
            if (minValue != null) {
                res.push(minValue);
            }
        }
        if (validation.notEmpty) {
            /** @type {?} */
            var notEmpty = evaluateValidationNotEmpty(validation, value);
            if (notEmpty != null) {
                res.push(notEmpty);
            }
        }
        if (validation.maxDigits) {
            /** @type {?} */
            var maxDigits = evaluateValidationMaxDigits(validation, value);
            if (maxDigits != null) {
                res.push(maxDigits);
            }
        }
        if (validation.minDigits) {
            /** @type {?} */
            var minDigits = evaluateValidationMinDigits(validation, value);
            if (minDigits != null) {
                res.push(minDigits);
            }
        }
        return res;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @param {?=} supplementaryInformations
     * @return {?}
     */
    function updateValidation(instance, context, supplementaryInformations) {
        /** @type {?} */
        var validation = instance.validation;
        if (validation == null) {
            instance.valid = true;
            return;
        }
        if (supplementaryInformations) {
            Object.keys(supplementaryInformations).forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) {
                context["__supplementary__" + key + "__"] = supplementaryInformations[key];
            }));
        }
        /** @type {?} */
        var completeName = nodeInstanceCompleteName(instance);
        if (context[completeName] != null && validation && validation.forceValue) {
            instance.value = models.evaluateExpression(validation.forceValue.condition, context);
            context[completeName] = instance.value;
            context.$value = instance.value;
        }
        instance.validationResults =
            evaluateValidationGroup(validation, context[completeName], context);
        instance.valid = instance.validationResults.reduce((/**
         * @param {?} prev
         * @param {?} x
         * @return {?}
         */
        function (prev, x) { return prev && x.result; }), true);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} warning
     * @param {?=} context
     * @param {?=} forceFormula
     * @return {?}
     */
    function evaluateWarning(warning, context, forceFormula) {
        return {
            result: models.evaluateExpression(warning.condition, context, forceFormula),
            warning: warning.warningMessage,
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} warning
     * @param {?=} context
     * @return {?}
     */
    function evaluateWarningConditions(warning, context) {
        return warning.conditions.map((/**
         * @param {?} cond
         * @return {?}
         */
        function (cond) { return evaluateWarning(cond, context); }));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} warning
     * @param {?=} context
     * @return {?}
     */
    function evaluateWarningGroup(warning, context) {
        return evaluateWarningConditions(warning, context);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function updateWarning(instance, context) {
        /** @type {?} */
        var warning = instance.warning;
        if (warning == null) {
            return;
        }
        /** @type {?} */
        var completeName = nodeInstanceCompleteName(instance);
        if (context[completeName] != null && warning) {
            instance.warningResults = evaluateWarningGroup(warning, context);
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @param {?=} branchVisibility
     * @return {?}
     */
    function updateFieldInstanceState(instance, context, branchVisibility) {
        if (branchVisibility === void 0) { branchVisibility = true; }
        updateVisibility(instance, context, branchVisibility);
        updateConditionalBranches(instance, context);
        updateFormula((/** @type {?} */ (instance)), context);
        updateValidation(instance, context);
        updateWarning(instance, context);
        updateNextSlideCondition(instance, context);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function updateFilteredChoices(instance, context) {
        if (instance.choicesFilter != null) {
            instance.filteredChoices = instance.node.choicesOrigin.choices.filter((/**
             * @param {?} c
             * @return {?}
             */
            function (c) {
                context.$choiceValue = c.value;
                return models.evaluateExpression((/** @type {?} */ (instance.choicesFilter)).formula, context);
            }));
        }
        else {
            instance.filteredChoices = instance.node.choicesOrigin.choices;
        }
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function updateTriggerConditions(instance, context) {
        if (instance.triggerConditions == null) {
            return false;
        }
        /** @type {?} */
        var completeName = nodeInstanceCompleteName(instance);
        if (instance.firstTriggerConditionDone[completeName]) {
            return false;
        }
        /** @type {?} */
        var found = false;
        /** @type {?} */
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} node
     * @return {?}
     */
    function createNode(node) {
        /** @type {?} */
        var conditionalBranches = node.conditionalBranches != null && node.conditionalBranches.length > 0 ?
            node.conditionalBranches :
            [models.alwaysCondition()];
        return __assign({}, node, { parentNode: node.parentNode != null ? node.parentNode : 0, label: node.label || '', visibility: node.visibility || models.alwaysCondition(), conditionalBranches: conditionalBranches });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} field
     * @return {?}
     */
    function createField(field) {
        /** @type {?} */
        var node = createNode(__assign({}, field, { nodeType: AjfNodeType.AjfField }));
        /** @type {?} */
        var editable = field.editable != null ?
            field.editable :
            field.fieldType !== AjfFieldType.Formula && field.fieldType !== AjfFieldType.Table;
        return __assign({}, node, field, { nodeType: AjfNodeType.AjfField, editable: editable, defaultValue: field.defaultValue != null ? field.defaultValue : null, size: field.size || 'normal' });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} node
     * @return {?}
     */
    function isSlidesNode(node) {
        return node != null &&
            (node.nodeType === AjfNodeType.AjfRepeatingSlide || node.nodeType === AjfNodeType.AjfSlide);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} node
     * @return {?}
     */
    function isContainerNode(node) {
        return node != null && (node.nodeType === AjfNodeType.AjfNodeGroup || isSlidesNode(node));
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeInstance
     * @return {?}
     */
    function isContainerNodeInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isContainerNode(nodeInstance.node);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodes
     * @param {?=} includeGroups
     * @return {?}
     */
    function flattenNodesInstances(nodes, includeGroups) {
        if (includeGroups === void 0) { includeGroups = false; }
        /** @type {?} */
        var flatNodes = [];
        nodes.forEach((/**
         * @param {?} nodeInstance
         * @return {?}
         */
        function (nodeInstance) {
            if (isFieldInstance(nodeInstance)) {
                flatNodes.push(nodeInstance);
            }
            if (isContainerNodeInstance(nodeInstance)) {
                if (includeGroups) {
                    flatNodes.push(nodeInstance);
                }
                flatNodes = flatNodes.concat(flattenNodesInstances(((/** @type {?} */ (nodeInstance))).nodes, includeGroups));
            }
        }));
        return flatNodes;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeInstance
     * @return {?}
     */
    function isSlidesInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isSlidesNode(nodeInstance.node);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodes
     * @return {?}
     */
    function flattenNodesInstancesTree(nodes) {
        /** @type {?} */
        var flatTree = [];
        nodes.forEach((/**
         * @param {?} nodeInstance
         * @return {?}
         */
        function (nodeInstance) {
            if (isSlidesInstance(nodeInstance)) {
                /** @type {?} */
                var ni = (/** @type {?} */ (nodeInstance));
                flatTree.push(ni);
                ni.flatNodes = flattenNodesInstances(ni.nodes);
            }
        }));
        return flatTree;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} node
     * @return {?}
     */
    function isNodeGroup(node) {
        return node != null && node.nodeType === AjfNodeType.AjfNodeGroup;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeInstance
     * @return {?}
     */
    function isNodeGroupInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isNodeGroup(nodeInstance.node);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} node
     * @return {?}
     */
    function isSlideNode(node) {
        return node != null && node.nodeType === AjfNodeType.AjfSlide;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeInstance
     * @return {?}
     */
    function isSlideInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isSlideNode(nodeInstance.node);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @return {?}
     */
    function createNodeInstance(instance) {
        return {
            node: instance.node,
            prefix: instance.prefix ? instance.prefix.slice() : [],
            visible: instance.visible != null ? instance.visible : true,
            conditionalBranches: [],
            updatedEvt: new core.EventEmitter()
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function createFieldInstance(instance, context) {
        /** @type {?} */
        var nodeInstance = createNodeInstance(instance);
        /** @type {?} */
        var value = null;
        if (nodeInstance.node != null && context != null) {
            /** @type {?} */
            var completeName = nodeInstanceCompleteName(nodeInstance);
            if (context[nodeInstance.node.name] != null) {
                value = context[nodeInstance.node.name];
            }
            else if (context[completeName] != null) {
                value = context[completeName];
            }
        }
        return __assign({}, nodeInstance, { node: instance.node, value: value, valid: false, defaultValue: instance.defaultValue != null ? instance.defaultValue : null, validationResults: instance.validationResults || [], warningResults: instance.warningResults || [], warningTrigger: new core.EventEmitter(), updated: new core.EventEmitter() });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function createFieldWithChoicesInstance(instance, context) {
        /** @type {?} */
        var fieldInstance = createFieldInstance(instance, context);
        return __assign({}, fieldInstance, { node: instance.node, filteredChoices: instance.node.choices.slice(), firstTriggerConditionDone: {}, selectionTrigger: new core.EventEmitter() });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?} context
     * @return {?}
     */
    function createTableFieldInstance(instance, context) {
        /** @type {?} */
        var fieldInstance = createFieldInstance(instance, context);
        return __assign({}, fieldInstance, { node: instance.node, context: context, hideEmptyRows: instance.hideEmptyRows || false, controls: [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @return {?}
     */
    function createNodeGroupInstance(instance) {
        /** @type {?} */
        var nodeInstance = createNodeInstance(instance);
        return __assign({}, nodeInstance, { node: instance.node, formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @return {?}
     */
    function createSlideInstance(instance) {
        /** @type {?} */
        var nodeInstance = createNodeInstance(instance);
        return __assign({}, nodeInstance, { node: instance.node, nodes: [], slideNodes: [], flatNodes: [], valid: false, position: 0 });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @return {?}
     */
    function createRepeatingSlideInstance(instance) {
        /** @type {?} */
        var slideInstance = createSlideInstance(instance);
        return __assign({}, slideInstance, { node: instance.node, slideNodes: [], formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} group
     * @return {?}
     */
    function createValidationGroup(group) {
        return __assign({}, group, { conditions: group.conditions || [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} group
     * @return {?}
     */
    function createWarningGroup(group) {
        return __assign({}, group, { conditions: group.conditions || [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} node
     * @return {?}
     */
    function isRepeatingContainerNode(node) {
        return node != null &&
            (node.nodeType === AjfNodeType.AjfNodeGroup ||
                node.nodeType === AjfNodeType.AjfRepeatingSlide);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} allNodes
     * @param {?} node
     * @return {?}
     */
    function getAncestorRepeatingNodes(allNodes, node) {
        /** @type {?} */
        var nodeGroups = [];
        /** @type {?} */
        var curParent = node.parent;
        while (curParent != null) {
            /** @type {?} */
            var curNode = allNodes.map((/**
             * @param {?} n
             * @return {?}
             */
            function (n) { return ((/** @type {?} */ (n))).node || (/** @type {?} */ (n)); }))
                .find((/**
             * @param {?} n
             * @return {?}
             */
            function (n) { return n.id == curParent; }));
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} allNodes
     * @param {?} node
     * @return {?}
     */
    function getAncestorRepeatingNodesNames(allNodes, node) {
        /** @type {?} */
        var names = {};
        /** @type {?} */
        var nodeGroups = (/** @type {?} */ (getAncestorRepeatingNodes(allNodes, node)));
        nodeGroups.forEach((/**
         * @param {?} n
         * @param {?} idx
         * @return {?}
         */
        function (n, idx) { return (n.nodes || []).forEach((/**
         * @param {?} sn
         * @return {?}
         */
        function (sn) {
            if (isField(sn)) {
                names[sn.name] = idx;
            }
        })); }));
        return names;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} condition
     * @param {?} ancestorsNames
     * @param {?} prefix
     * @return {?}
     */
    function getInstanceCondition(condition, ancestorsNames, prefix) {
        /** @type {?} */
        var oldCondition = condition.condition;
        /** @type {?} */
        var newCondition = models.normalizeExpression(oldCondition, ancestorsNames, prefix);
        if (newCondition === oldCondition) {
            return condition;
        }
        return { condition: newCondition };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} conditions
     * @param {?} ancestorsNames
     * @param {?} prefix
     * @return {?}
     */
    function getInstanceConditions(conditions, ancestorsNames, prefix) {
        /** @type {?} */
        var changed = false;
        /** @type {?} */
        var newConditions = conditions.map((/**
         * @param {?} condition
         * @return {?}
         */
        function (condition) {
            /** @type {?} */
            var newCondition = getInstanceCondition(condition, ancestorsNames, prefix);
            if (newCondition !== condition) {
                changed = true;
            }
            return newCondition;
        }));
        return changed ? newConditions : conditions;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} formula
     * @param {?} ancestorsNames
     * @param {?} prefix
     * @return {?}
     */
    function getInstanceFormula(formula, ancestorsNames, prefix) {
        /** @type {?} */
        var oldFormula = formula.formula;
        /** @type {?} */
        var newFormula = models.normalizeExpression(oldFormula, ancestorsNames, prefix);
        if (newFormula === oldFormula) {
            return formula;
        }
        return { formula: newFormula };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} validation
     * @return {?}
     */
    function createValidation(validation) {
        return __assign({}, validation, { clientValidation: validation.clientValidation || false, errorMessage: validation.errorMessage || 'Undefined Error' });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} validation
     * @param {?} ancestorsNames
     * @param {?} prefix
     * @return {?}
     */
    function getInstanceValidation(validation, ancestorsNames, prefix) {
        /** @type {?} */
        var oldValidation = validation.condition;
        /** @type {?} */
        var newValidation = models.normalizeExpression(oldValidation, ancestorsNames, prefix);
        if (newValidation === oldValidation) {
            return validation;
        }
        return createValidation({ condition: newValidation });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} validations
     * @param {?} ancestorsNames
     * @param {?} prefix
     * @return {?}
     */
    function getInstanceValidations(validations, ancestorsNames, prefix) {
        /** @type {?} */
        var changed = false;
        /** @type {?} */
        var newValidations = validations.map((/**
         * @param {?} validation
         * @return {?}
         */
        function (validation) {
            /** @type {?} */
            var newValidation = getInstanceValidation(validation, ancestorsNames, prefix);
            if (newValidation !== validation) {
                changed = true;
            }
            return newValidation;
        }));
        return changed ? newValidations : validations;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} warning
     * @return {?}
     */
    function createWarning(warning) {
        return __assign({}, warning, { warningMessage: warning.warningMessage || 'Undefined Warning' });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} warning
     * @param {?} ancestorsNames
     * @param {?} prefix
     * @return {?}
     */
    function getInstanceWarning(warning, ancestorsNames, prefix) {
        /** @type {?} */
        var oldWarning = warning.condition;
        /** @type {?} */
        var newWarning = models.normalizeExpression(oldWarning, ancestorsNames, prefix);
        if (newWarning === oldWarning) {
            return warning;
        }
        return createWarning({ condition: newWarning });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} warnings
     * @param {?} ancestorsNames
     * @param {?} prefix
     * @return {?}
     */
    function getInstanceWarnings(warnings, ancestorsNames, prefix) {
        /** @type {?} */
        var changed = false;
        /** @type {?} */
        var newWarnings = warnings.map((/**
         * @param {?} warning
         * @return {?}
         */
        function (warning) {
            /** @type {?} */
            var newWarning = getInstanceWarning(warning, ancestorsNames, prefix);
            if (newWarning !== warning) {
                changed = true;
            }
            return newWarning;
        }));
        return changed ? newWarnings : warnings;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} node
     * @return {?}
     */
    function isRepeatingSlide(node) {
        return node != null && node.nodeType === AjfNodeType.AjfRepeatingSlide;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeInstance
     * @return {?}
     */
    function isRepeatingSlideInstance(nodeInstance) {
        return nodeInstance != null && nodeInstance.node != null && isSlidesInstance(nodeInstance) &&
            isRepeatingSlide(nodeInstance.node);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} allNodes
     * @param {?} node
     * @param {?} prefix
     * @param {?} context
     * @return {?}
     */
    function nodeToNodeInstance(allNodes, node, prefix, context) {
        /** @type {?} */
        var instance = null;
        /** @type {?} */
        var nodeType = node.nodeType;
        switch (nodeType) {
            case AjfNodeType.AjfField:
                /** @type {?} */
                var field = (/** @type {?} */ (node));
                if (field.fieldType > 100) {
                    if (componentsMap[field.fieldType] != null
                        && componentsMap[field.fieldType].createInstance != null) {
                        instance = (/** @type {?} */ (componentsMap[field.fieldType].createInstance))({ node: (/** @type {?} */ (node)), prefix: prefix }, context);
                    }
                    else {
                        instance = createFieldInstance({ node: (/** @type {?} */ (node)), prefix: prefix }, context);
                    }
                }
                else {
                    switch (field.fieldType) {
                        case AjfFieldType.SingleChoice:
                        case AjfFieldType.MultipleChoice:
                            instance = createFieldWithChoicesInstance({ node: (/** @type {?} */ (node)), prefix: prefix }, context);
                            break;
                        case AjfFieldType.Table:
                            instance = createTableFieldInstance({ node: (/** @type {?} */ (node)), prefix: prefix }, context);
                            break;
                        default:
                            instance = createFieldInstance({ node: (/** @type {?} */ (node)), prefix: prefix }, context);
                            break;
                    }
                }
                break;
            case AjfNodeType.AjfNodeGroup:
                instance = createNodeGroupInstance({ node: (/** @type {?} */ (node)), prefix: prefix });
                break;
            case AjfNodeType.AjfRepeatingSlide:
                instance = createRepeatingSlideInstance({ node: (/** @type {?} */ (node)), prefix: prefix });
                break;
            case AjfNodeType.AjfSlide:
                instance = createSlideInstance({ node: (/** @type {?} */ (node)), prefix: prefix });
                break;
        }
        if (instance != null) {
            /** @type {?} */
            var hasPrefix = prefix != null && prefix.length > 0;
            if (hasPrefix) {
                /** @type {?} */
                var ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);
                if (node.visibility != null) {
                    /** @type {?} */
                    var oldVisibility = node.visibility.condition;
                    /** @type {?} */
                    var newVisibility = models.normalizeExpression(oldVisibility, ancestorsNames, prefix);
                    instance.visibility = newVisibility !== oldVisibility ?
                        models.createCondition({ condition: newVisibility }) :
                        node.visibility;
                }
                /** @type {?} */
                var conditionalBranches = instance.node.conditionalBranches != null
                    && instance.node.conditionalBranches.length > 0
                    ? instance.node.conditionalBranches
                    : [models.alwaysCondition()];
                instance.conditionalBranches = getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
                if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                    /** @type {?} */
                    var ngInstance = (/** @type {?} */ (instance));
                    /** @type {?} */
                    var formulaReps = ngInstance.node.formulaReps;
                    if (formulaReps != null) {
                        /** @type {?} */
                        var oldFormula = formulaReps.formula;
                        /** @type {?} */
                        var newFormula = models.normalizeExpression(oldFormula, ancestorsNames, prefix);
                        ngInstance.formulaReps =
                            newFormula !== oldFormula ? models.createFormula({ formula: newFormula }) : formulaReps;
                    }
                }
                else if (nodeType === AjfNodeType.AjfField) {
                    /** @type {?} */
                    var fInstance = (/** @type {?} */ (instance));
                    /** @type {?} */
                    var fNode = fInstance.node;
                    if (fNode.formula) {
                        fInstance.formula = getInstanceFormula(fNode.formula, ancestorsNames, prefix);
                    }
                    if (fNode.validation != null) {
                        /** @type {?} */
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
                        /** @type {?} */
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
                        /** @type {?} */
                        var fwcInstance = (/** @type {?} */ (instance));
                        /** @type {?} */
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
                /** @type {?} */
                var conditionalBranches = instance.node.conditionalBranches != null
                    && instance.node.conditionalBranches.length > 0
                    ? instance.node.conditionalBranches
                    : [models.alwaysCondition()];
                instance.conditionalBranches = conditionalBranches;
                if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                    /** @type {?} */
                    var rgInstance = (/** @type {?} */ (instance));
                    rgInstance.formulaReps = rgInstance.node.formulaReps;
                }
                else if (isFieldInstance(instance)) {
                    /** @type {?} */
                    var fInstance = (/** @type {?} */ (instance));
                    fInstance.validation = fInstance.node.validation;
                    fInstance.warning = fInstance.node.warning;
                    fInstance.nextSlideCondition = fInstance.node.nextSlideCondition;
                    if (isFieldWithChoicesInstance(instance)) {
                        /** @type {?} */
                        var fwcInstance = (/** @type {?} */ (instance));
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodes
     * @return {?}
     */
    function flattenNodes(nodes) {
        /** @type {?} */
        var flatNodes = [];
        nodes.forEach((/**
         * @param {?} node
         * @return {?}
         */
        function (node) {
            flatNodes.push(node);
            if (isContainerNode(node)) {
                flatNodes = flatNodes.concat(flattenNodes(((/** @type {?} */ (node))).nodes));
            }
        }));
        return flatNodes;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} nodes
     * @param {?} parent
     * @return {?}
     */
    function orderedNodes(nodes, parent) {
        /** @type {?} */
        var newNodes = [];
        nodes
            .filter((/**
         * @param {?} n
         * @return {?}
         */
        function (n) { return parent != null ? n.parent == parent : n.parent == null || n.parent === 0; }))
            .sort((/**
         * @param {?} n1
         * @param {?} n2
         * @return {?}
         */
        function (n1, n2) { return n1.parentNode - n2.parentNode; }))
            .forEach((/**
         * @param {?} n
         * @return {?}
         */
        function (n) {
            newNodes.push(n);
            newNodes = newNodes.concat(orderedNodes(nodes, n.id));
        }));
        return newNodes;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} instance
     * @param {?=} context
     * @return {?}
     */
    function updateRepsNum(instance, context) {
        /** @type {?} */
        var oldReps = instance.reps || 0;
        context = context || {};
        if (instance.node.formulaReps == null) {
            /** @type {?} */
            var ctxReps = context[nodeInstanceCompleteName(instance)];
            if (ctxReps != null) {
                instance.reps = ctxReps;
            }
            else if (oldReps == 0) {
                instance.reps = 1;
            }
        }
        else {
            /** @type {?} */
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
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} slide
     * @param {?} idx
     * @return {?}
     */
    function validSlide(slide, idx) {
        if (idx >= slide.slideNodes.length) {
            return true;
        }
        return slide.slideNodes[idx]
            .map((/**
         * @param {?} n
         * @return {?}
         */
        function (n) {
            if (n.visible && Object.keys(n).indexOf('valid') > -1) {
                return ((/** @type {?} */ (n))).valid;
            }
            return true;
        }))
            .reduce((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return v1 && v2; }), true);
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
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
                "var dateOperations = function(dString, period, operation, v) {\n        fmt = 'MM/DD/YYYY';\n        var d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();\n        if (operation == 'remove') {\n          v = -v;\n        }\n        var dateOp;\n        switch (period) {\n          case 'day':\n            dateOp = dateUtils.addDays;\n            break;\n          case 'month':\n            dateOp = dateUtils.addMonths;\n            break;\n          case 'year':\n            dateOp = dateUtils.addYears;\n            break;\n          default:\n            return -1;\n        }\n        return dateUtils.format(dateOp(d, v), fmt);\n      }",
                "/**\n        * round the num\n        * @param  num the value to round\n        * @param  digits how many digit\n        * @return num rounded\n      */\n      var round = function(num, digits) {\n        digits = digits || 0;\n        var f = 0;\n        try { f = parseFloat(num); } catch (e) { }\n        var m = Math.pow(10, digits);\n        return Math.round(f * m) / m;\n      }",
                "/**\n        * extract the property of the source object with property != null\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want filter\n        * @return array of dates\n      */\n      var extractArray = function(source, property, property2) {\n        source = (source || []).slice(0);\n        var l = source.length;\n        var res = [];\n        for (var i = 0; i < l ; i++) {\n          if (source[i][property] != null && source[i][property2] != null) {\n            res.push(source[i][property] + source[i][property2]);\n          }\n          else if (source[i][property] != null) {\n            res.push(source[i][property]);\n          }\n        }\n        return res;\n      }",
                "/**\n        * extract the property of the source object with property != null\n        * @param  source array of object wich contains property\n        * @param  propertues string array the properties to sum\n        * @return the sum\n      */\n      var extractSum = function(source, properties) {\n        var sum = 0;\n        properties = (properties || []).slice(0);\n        var l = properties.length;\n\n        for (var i = 0; i < l ; i++) {\n          var array = extractArray(source, properties[i]);\n          var leng = array.length;\n          for(var j = 0; j < leng; i++) {\n            sum += array[j];\n          }\n        }\n        return sum;\n      }",
                "/**\n        * extract the array of sum for each week != null\n        * @param  source array of object wich contains property\n        * @param  propertues string array the properties to sum\n        * @return the sum\n      */\n      var extractArraySum = function(source, properties) {\n        var arrays = [];\n        properties = (properties || []).slice(0);\n\n        for (var propI = 0; propI < properties.length ; propI++) {\n          var array = extractArray(source, properties[propI]);\n          arrays.push(array);\n        }\n\n        var res = [];\n        for (var weekI = 0; weekI < array.length; weekI ++ ) {\n          var sum = 0;\n          for (var propI = 0; propI < properties.length ; propI++) {\n            sum = sum + arrays[propI][weekI]\n          }\n          res.push(sum);\n        }\n        return res;\n      }",
                "/**\n        * draw a threshold line on chart related to the property\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want filter\n        * @return array of dates\n      */\n      var drawThreshold = function(source, property, threshold) {\n        source = (source || []).slice(0);\n        var l = source.length;\n        var res = [];\n        for (var i = 0; i < l ; i++) {\n          if (source[i][property] != null) {\n            res.push(threshold);\n          }\n        }\n        return res;\n      }",
                "/**\n        * extract the dates of the source object with property != null\n        * @param  source array of object wich contains property and date_start\n        * @param  property the property on wich we want to calculate dates\n        * @param  format the format of the date\n        * @return array of dates\n      */\n      var extractDates = function(source, property, format) {\n        source = (source || []).slice(0);\n        var l = source.length;\n        var res = [];\n        var prefix = '';\n        for (var i = 0; i < l ; i++) {\n          if (source[i][property] != null) {\n            switch(format) {\n              case \"WW\":\n                prefix = \"W\";\n                break;\n              case \"MM\":\n                prefix = \"M\";\n                break;\n              default:\n                prefix = \"\";\n            }\n            res.push(prefix + formatDate(source[i][\"date_start\"], format));\n          }\n        }\n        return res;\n      }",
                "/**\n        * extract the last property contains in source != null\n        * @param  source array of object wich contains property and date_start\n        * @param  property the property to find\n        * @return the last property != null\n      */\n      var lastProperty = function(source, property) {\n        source = (source || []).slice(0);\n        var l = source.length -1;\n\n        while (l >= 0 && source[l][property] == null) {\n          l--;\n          if (l < 0) return 0;\n        }\n        return l >= 0 ? source[l][property] : 0;\n      }",
                "var sumLastProperties = function(source, properties) {\n        source = (source || []).slice(0);\n        var sum = 0;\n        for (var i = 0; i < properties.length; i++) {\n          sum += lastProperty(source, properties[i]);\n        }\n\n        return sum;\n      }",
                "/**\n        * compute the trend of the property contained on the source.\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want to calculate the trend\n        * @return an html icon that identifies the trend\n      */\n      var calculateTrendProperty = function(source, property) {\n        source = (source || []).slice(0);\n        var last = source.length - 1;\n        while (source[last][property] == null) {\n          if (last == 0) {\n            break;\n          }\n          last--;\n        }\n        var lastLast = last - 1;\n        if (last == 0) {\n          lastLast = last;\n        } else {\n          while (source[lastLast][property] == null) {\n            if (lastLast == 0) {\n              lastLast = last;\n              break;\n            }\n            lastLast--;\n          }\n        }\n\n        var lastProperty = source[last]?(source[last][property] || 0): 0;\n        var lastLastProperty = source[lastLast]?(source[lastLast][property] || 0): 0;\n\n        if (lastProperty == lastLastProperty) {\n          return '<p><i class=\"material-icons\" style=\"color:blue\">trending_flat</i></p>';\n        } else if (lastProperty > lastLastProperty) {\n          return '<p><i class=\"material-icons\" style=\"color:green\">trending_up</i></p>';\n        } else {\n          return '<p><i class=\"material-icons\" style=\"color:red\">trending_down</i></p>';\n        }\n      }",
                "/**\n        * compute the average value of the property contained on the source.\n        * @param  source array of object wich contains property\n        * @param  property the property on wich we want to calculate the average\n        * @param  range the range on wich we want to calculate the average\n        * @param  coefficent the coefficent used for calculate the threshold\n                  if coefficent is 0 mean return the count of property > 0\n        * @return the average value || the count of property > 0\n      */\n      var calculateAvgProperty = function(source, property, range, coefficient) {\n        source = (source || []).slice(0);\n\n        source.pop();\n\n        coefficient = coefficient || 1;\n        range = range || 12;\n\n        var l = source.length;\n        var res = 0;\n        var counter = 0;\n        var noZero = 0;\n\n        if(l < range) {\n          range = l;\n        }\n\n        while (range != 0) {\n          counter++;\n          if (source[l - 1][property] != null) {\n            res += source[l - 1][property];\n\n            if (source[l - 1][property] > 0) {\n              noZero++;\n            }\n          }\n          l--;\n          range--;\n        }\n\n        if (coefficient == 0) {\n          return noZero;\n        } else {\n          var threshold = (res/counter)*coefficient || 0;\n          return threshold;\n        }\n      }",
                "var alert = function(source, property, threshold, fmt) {\n        source = (source || []).slice(0);\n        var l = source.length;\n\n        if ( lastProperty(source, property)  > threshold ) {\n          return '<p><i class=\"material-icons\" style=\"color:red\">warning</i></p>';\n          } else {\n            return '<p></p>';\n          }\n      }",
                "var formatNumber = function(num, fmt) {\n        fmt = fmt || '0,0[.]0';\n        return numeral(num).format(fmt);\n      }",
                "var formatDate = function(date, fmt) {\n        fmt = fmt || 'MM-DD-YYYY';\n        return dateUtils.format(date, fmt);\n      }",
                "var isoMonth = function(date, fmt) {\n        fmt = fmt || 'MM';\n        var du = dateUtils;\n        return du.format(du.addDays(du.startOfMonth(date), 4),fmt)\n      }",
                "var nextCounterValue = function(counterName, firstValue) {\n        firstValue = firstValue != null ? firstValue : 0;\n        if (execContext['$$'+counterName] == null) {\n          execContext['$$'+counterName] = firstValue;\n        } else {\n          execContext['$$'+counterName]++;\n        }\n        return execContext['$$'+counterName];\n      }",
                "var getCoordinate = function(source, zoom) {\n        zoom = zoom || 6;\n        if(source == null) {\n          return [51.505,-0.09, zoom];\n        } else {\n          return [source[0], source[1], zoom];\n        }\n      }"
            ];
            this._functions = [];
            this._functionsStr = '';
            this._initFunctions();
        }
        /**
         * @param {?} f
         * @return {?}
         */
        AjfValidationService.prototype.addFunction = /**
         * @param {?} f
         * @return {?}
         */
        function (f) {
            this._functions.push(f);
            this._initFunctions();
        };
        /**
         * @param {?} name
         * @param {?} fn
         * @return {?}
         */
        AjfValidationService.prototype.addFunctionHandler = /**
         * @param {?} name
         * @param {?} fn
         * @return {?}
         */
        function (name, fn) {
            if (models.AjfExpressionUtils.utils[name] === undefined) {
                models.AjfExpressionUtils.utils[name] = { fn: fn };
            }
        };
        /**
         * @private
         * @return {?}
         */
        AjfValidationService.prototype._initFunctions = /**
         * @private
         * @return {?}
         */
        function () {
            /** @type {?} */
            var functionsStr = this._functions
                .map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) { return typeof f === 'string' ? f : f.toString(); }))
                .join('; ');
            this._functionsStr = this._baseUtilFunctions.join('; ') + "; " + functionsStr;
            models.AjfExpressionUtils.UTIL_FUNCTIONS = this._functionsStr;
        };
        AjfValidationService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AjfValidationService.ctorParameters = function () { return []; };
        return AjfValidationService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var esprimaMod = esprima__default__default || esprima__default;
    var tokenize = esprimaMod.tokenize;
    /** @enum {number} */
    var AjfFormInitStatus = {
        Initializing: 0,
        Complete: 1,
    };
    AjfFormInitStatus[AjfFormInitStatus.Initializing] = 'Initializing';
    AjfFormInitStatus[AjfFormInitStatus.Complete] = 'Complete';
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
            get: /**
             * @return {?}
             */
            function () {
                return this._flatNodesTree;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRendererService.prototype, "errorPositions", {
            get: /**
             * @return {?}
             */
            function () { return this._errorPositions; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRendererService.prototype, "errors", {
            get: /**
             * @return {?}
             */
            function () { return this._errors; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRendererService.prototype, "currentSupplementaryInformations", {
            get: /**
             * @return {?}
             */
            function () {
                /** @type {?} */
                var form = this._form.getValue();
                return form != null && form.form != null ? form.form.supplementaryInformations : null;
            },
            enumerable: true,
            configurable: true
        });
        /**
         * @param {?} form
         * @param {?=} context
         * @return {?}
         */
        AjfFormRendererService.prototype.setForm = /**
         * @param {?} form
         * @param {?=} context
         * @return {?}
         */
        function (form, context) {
            if (context === void 0) { context = {}; }
            this._initUpdateMapStreams();
            if (form != null && Object.keys(context).length === 0 &&
                Object.keys(form.initContext || {}).length > 0) {
                context = form.initContext || {};
            }
            /** @type {?} */
            var currentForm = this._form.getValue();
            if ((currentForm == null && form != null) ||
                (currentForm != null && form !== currentForm.form)) {
                this._form.next({ form: form, context: context });
            }
        };
        /**
         * @return {?}
         */
        AjfFormRendererService.prototype.getFormValue = /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var formGroup = this._formGroup.getValue();
            if (formGroup == null) {
                return {};
            }
            /** @type {?} */
            var res = utils.deepCopy(formGroup.value);
            return res;
        };
        /**
         * @param {?} group
         * @return {?}
         */
        AjfFormRendererService.prototype.addGroup = /**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            var _this = this;
            return new rxjs.Observable((/**
             * @param {?} subscriber
             * @return {?}
             */
            function (subscriber) {
                if (group.formulaReps != null) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                /** @type {?} */
                var maxReps = group.node.maxReps;
                if (maxReps > 0 && group.reps + 1 > maxReps) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                /** @type {?} */
                var oldReps = group.reps;
                group.reps = group.reps + 1;
                group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
                group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
                _this._nodesUpdates.next((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) {
                    /** @type {?} */
                    var flatNodes = flattenNodesInstances(nodes, true);
                    _this._adjustReps(flatNodes, group, oldReps, _this.getFormValue());
                    subscriber.next(true);
                    subscriber.complete();
                    return nodes;
                }));
            }));
        };
        /**
         * @param {?} group
         * @return {?}
         */
        AjfFormRendererService.prototype.removeGroup = /**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            var _this = this;
            return new rxjs.Observable((/**
             * @param {?} subscriber
             * @return {?}
             */
            function (subscriber) {
                if (group.formulaReps != null) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                /** @type {?} */
                var minReps = group.node.minReps;
                if (group.reps - 1 < minReps) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                /** @type {?} */
                var oldReps = group.reps;
                group.reps = group.reps - 1;
                group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
                group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
                _this._nodesUpdates.next((/**
                 * @param {?} nodes
                 * @return {?}
                 */
                function (nodes) {
                    _this._adjustReps(nodes, group, oldReps, _this.getFormValue());
                    subscriber.next(true);
                    subscriber.complete();
                    return nodes;
                }));
            }));
        };
        /**
         * @param {?} field
         * @return {?}
         */
        AjfFormRendererService.prototype.getControl = /**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            return this.formGroup.pipe(operators.map((/**
             * @param {?} f
             * @return {?}
             */
            function (f) {
                /** @type {?} */
                var fieldName = nodeInstanceCompleteName(field);
                return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
            })));
        };
        /**
         * @private
         * @return {?}
         */
        AjfFormRendererService.prototype._initErrorsStreams = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            this._errorPositions = this._valueChanged.pipe(operators.withLatestFrom(this._nodes, this._form), operators.filter((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v[2] != null && v[2].form != null; })), operators.map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                /** @type {?} */
                var nodes = v[1];
                /** @type {?} */
                var form = (/** @type {?} */ ((/** @type {?} */ (v[2])).form));
                /** @type {?} */
                var currentPosition = 0;
                /** @type {?} */
                var errors = [];
                nodes.forEach((/**
                 * @param {?} node
                 * @return {?}
                 */
                function (node) {
                    if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                        /** @type {?} */
                        var rsNode = (/** @type {?} */ (node));
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
                    else if (node.node.nodeType === AjfNodeType.AjfSlide) {
                        /** @type {?} */
                        var sNode = (/** @type {?} */ (node));
                        if (sNode.visible) {
                            currentPosition++;
                            sNode.position = currentPosition;
                            if (!sNode.valid) {
                                errors.push(currentPosition);
                            }
                        }
                    }
                }));
                form.valid = errors.length == 0;
                _this._slidesNum.next(currentPosition);
                return errors;
            })), operators.publishReplay(), operators.refCount());
            this._errors = this._errorPositions.pipe(operators.map((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e != null ? e.length : 0; })), operators.startWith(0), operators.publishReplay(), operators.refCount());
        };
        /**
         * @private
         * @return {?}
         */
        AjfFormRendererService.prototype._initUpdateMapStreams = /**
         * @private
         * @return {?}
         */
        function () {
            this._visibilityNodesMap =
                ((/** @type {?} */ (this._visibilityNodesMapUpdates)))
                    .pipe(operators.scan((/**
                 * @param {?} rmap
                 * @param {?} op
                 * @return {?}
                 */
                function (rmap, op) {
                    return op(rmap);
                }), {}), operators.startWith({}), operators.share());
            this._repetitionNodesMap =
                ((/** @type {?} */ (this._repetitionNodesMapUpdates)))
                    .pipe(operators.scan((/**
                 * @param {?} rmap
                 * @param {?} op
                 * @return {?}
                 */
                function (rmap, op) {
                    return op(rmap);
                }), {}), operators.startWith({}), operators.share());
            this._conditionalBranchNodesMap =
                ((/** @type {?} */ (this._conditionalBranchNodesMapUpdates)))
                    .pipe(operators.scan((/**
                 * @param {?} rmap
                 * @param {?} op
                 * @return {?}
                 */
                function (rmap, op) {
                    return op(rmap);
                }), {}), operators.startWith({}), operators.share());
            this._formulaNodesMap =
                ((/** @type {?} */ (this._formulaNodesMapUpdates)))
                    .pipe(operators.scan((/**
                 * @param {?} rmap
                 * @param {?} op
                 * @return {?}
                 */
                function (rmap, op) {
                    return op(rmap);
                }), {}), operators.startWith({}), operators.share());
            this._validationNodesMap =
                ((/** @type {?} */ (this._validationNodesMapUpdates)))
                    .pipe(operators.scan((/**
                 * @param {?} rmap
                 * @param {?} op
                 * @return {?}
                 */
                function (rmap, op) {
                    return op(rmap);
                }), {}), operators.startWith({}), operators.share());
            this._warningNodesMap =
                ((/** @type {?} */ (this._warningNodesMapUpdates)))
                    .pipe(operators.scan((/**
                 * @param {?} rmap
                 * @param {?} op
                 * @return {?}
                 */
                function (rmap, op) {
                    return op(rmap);
                }), {}), operators.startWith({}), operators.share());
            this._filteredChoicesNodesMap =
                ((/** @type {?} */ (this._filteredChoicesNodesMapUpdates)))
                    .pipe(operators.scan((/**
                 * @param {?} rmap
                 * @param {?} op
                 * @return {?}
                 */
                function (rmap, op) {
                    return op(rmap);
                }), {}), operators.startWith({}), operators.share());
            this._triggerConditionsNodesMap =
                ((/** @type {?} */ (this._triggerConditionsNodesMapUpdates)))
                    .pipe(operators.scan((/**
                 * @param {?} rmap
                 * @param {?} op
                 * @return {?}
                 */
                function (rmap, op) {
                    return op(rmap);
                }), {}), operators.startWith({}), operators.share());
            this._nextSlideConditionsNodesMap =
                ((/** @type {?} */ (this._nextSlideConditionsNodesMapUpdates)))
                    .pipe(operators.scan((/**
                 * @param {?} rmap
                 * @param {?} op
                 * @return {?}
                 */
                function (rmap, op) {
                    return op(rmap);
                }), {}), operators.startWith({}), operators.share());
            this._nodesMaps = [
                this._visibilityNodesMap,
                this._repetitionNodesMap,
                this._conditionalBranchNodesMap,
                this._formulaNodesMap,
                this._validationNodesMap,
                this._warningNodesMap,
                this._nextSlideConditionsNodesMap,
                this._filteredChoicesNodesMap,
                this._triggerConditionsNodesMap
            ];
        };
        /**
         * @private
         * @return {?}
         */
        AjfFormRendererService.prototype._initFormStreams = /**
         * @private
         * @return {?}
         */
        function () {
            var _this = this;
            /** @type {?} */
            var formObs = (/** @type {?} */ (this._form));
            formObs
                .pipe(operators.map((/**
             * @param {?} _form
             * @return {?}
             */
            function (_form) {
                return _this._initFormGroupStreams(new forms.FormGroup({}));
            })))
                .subscribe(this._formGroup);
            formObs
                .pipe(operators.map((/**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                return (/**
                 * @param {?} _nodesInstances
                 * @return {?}
                 */
                function (_nodesInstances) {
                    /** @type {?} */
                    var nodes = form != null && form.form != null ?
                        _this._orderedNodesInstancesTree(flattenNodes(form.form.nodes), form.form.nodes, undefined, [], form.context || {}) :
                        [];
                    /** @type {?} */
                    var currentPosition = 0;
                    nodes.forEach((/**
                     * @param {?} node
                     * @return {?}
                     */
                    function (node) {
                        if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                            /** @type {?} */
                            var rsNode = (/** @type {?} */ (node));
                            for (var i = 0; i < rsNode.reps; i++) {
                                if (node.visible) {
                                    currentPosition++;
                                    if (i == 0) {
                                        rsNode.position = currentPosition;
                                    }
                                }
                            }
                        }
                        else if (node.node.nodeType === AjfNodeType.AjfSlide) {
                            /** @type {?} */
                            var sNode = (/** @type {?} */ (node));
                            if (sNode.visible) {
                                currentPosition++;
                                sNode.position = currentPosition;
                            }
                        }
                    }));
                    return nodes;
                });
            })))
                .subscribe(this._nodesUpdates);
        };
        /**
         * @private
         * @param {?} allNodes
         * @param {?} node
         * @param {?} prefix
         * @param {?} context
         * @param {?=} branchVisibility
         * @return {?}
         */
        AjfFormRendererService.prototype._initNodeInstance = /**
         * @private
         * @param {?} allNodes
         * @param {?} node
         * @param {?} prefix
         * @param {?} context
         * @param {?=} branchVisibility
         * @return {?}
         */
        function (allNodes, node, prefix, context, branchVisibility) {
            if (branchVisibility === void 0) { branchVisibility = true; }
            /** @type {?} */
            var instance = nodeToNodeInstance(allNodes, node, prefix, context);
            if (instance != null) {
                /** @type {?} */
                var nodeType = instance.node.nodeType;
                if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                    this._explodeRepeatingNode(allNodes, (/** @type {?} */ (instance)), context);
                }
                else if (nodeType === AjfNodeType.AjfSlide) {
                    /** @type {?} */
                    var sInstance = (/** @type {?} */ (instance));
                    sInstance.nodes = this._orderedNodesInstancesTree(allNodes, sInstance.node.nodes, sInstance.node.id, prefix, context);
                }
                updateVisibility(instance, context, branchVisibility);
                updateConditionalBranches(instance, context);
                if (nodeType === AjfNodeType.AjfField) {
                    /** @type {?} */
                    var fInstance = (/** @type {?} */ (instance));
                    if (isCustomFieldWithChoices(fInstance.node) || isFieldWithChoices(fInstance.node)) {
                        updateFilteredChoices((/** @type {?} */ (fInstance)), context);
                    }
                    else {
                        if (isTableFieldInstance(fInstance)) {
                            /** @type {?} */
                            var tfInstance_1 = (/** @type {?} */ (fInstance));
                            /** @type {?} */
                            var tNode_1 = tfInstance_1.node;
                            tfInstance_1.context = context[nodeInstanceCompleteName(tfInstance_1)] || context;
                            if (!tNode_1.editable) {
                                /** @type {?} */
                                var value_1 = [];
                                value_1.push([tNode_1.label, tNode_1.columnLabels]);
                                tNode_1.rows.forEach((/**
                                 * @param {?} row
                                 * @param {?} rowIndex
                                 * @return {?}
                                 */
                                function (row, rowIndex) {
                                    value_1.push([tNode_1.rowLabels[rowIndex], row.map((/**
                                         * @param {?} k
                                         * @return {?}
                                         */
                                        function (k) {
                                            tfInstance_1.context[k] = context[k];
                                            return context[k];
                                        }))]);
                                }));
                                tfInstance_1.value = value_1;
                            }
                            else {
                                /** @type {?} */
                                var formGroup_1 = this._formGroup.getValue();
                                /** @type {?} */
                                var controlsWithLabels_1 = [];
                                controlsWithLabels_1.push([node.label, tNode_1.columnLabels]);
                                tNode_1.rows.forEach((/**
                                 * @param {?} row
                                 * @param {?} idx
                                 * @return {?}
                                 */
                                function (row, idx) {
                                    /** @type {?} */
                                    var r = [];
                                    row.forEach((/**
                                     * @param {?} k
                                     * @return {?}
                                     */
                                    function (k) {
                                        /** @type {?} */
                                        var control = new forms.FormControl();
                                        console.log(k);
                                        console.log(tfInstance_1.context[k]);
                                        control.setValue(tfInstance_1.context[k]);
                                        if (formGroup_1 != null) {
                                            formGroup_1.registerControl(k, control);
                                        }
                                        r.push(control);
                                    }));
                                    controlsWithLabels_1.push([tNode_1.rowLabels[idx], r]);
                                }));
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
        /**
         * @private
         * @param {?} allNodes
         * @param {?} instance
         * @param {?} oldReps
         * @param {?} context
         * @return {?}
         */
        AjfFormRendererService.prototype._adjustReps = /**
         * @private
         * @param {?} allNodes
         * @param {?} instance
         * @param {?} oldReps
         * @param {?} context
         * @return {?}
         */
        function (allNodes, instance, oldReps, context) {
            var _this = this;
            /** @type {?} */
            var newReps = instance.reps;
            /** @type {?} */
            var result = {
                added: null,
                removed: null
            };
            if (oldReps < newReps) {
                /** @type {?} */
                var newNodes_1 = [];
                if (instance.nodes == null) {
                    instance.nodes = [];
                }
                if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                    /** @type {?} */
                    var node = (/** @type {?} */ (createField({
                        id: 999,
                        name: '',
                        parent: -1,
                        fieldType: AjfFieldType.Empty,
                        label: instance.node.label
                    })));
                    /** @type {?} */
                    var newInstance = this._initNodeInstance(allNodes, node, instance.prefix.slice(0), context);
                    if (newInstance != null) {
                        instance.nodes.push(newInstance);
                    }
                }
                var _loop_1 = function (i) {
                    /** @type {?} */
                    var prefix = instance.prefix.slice(0);
                    /** @type {?} */
                    var group = instance.node;
                    prefix.push(i);
                    orderedNodes(group.nodes, instance.node.id)
                        .forEach((/**
                     * @param {?} n
                     * @return {?}
                     */
                    function (n) {
                        /** @type {?} */
                        var newInstance = _this._initNodeInstance(allNodes, n, prefix, context);
                        if (newInstance != null) {
                            newNodes_1.push(newInstance);
                            instance.nodes.push(newInstance);
                        }
                    }));
                    this_1._addNodeInstance(instance);
                };
                var this_1 = this;
                for (var i = oldReps; i < newReps; i++) {
                    _loop_1(i);
                }
                result.added = newNodes_1;
            }
            else if (oldReps > newReps) {
                /** @type {?} */
                var nodesNum = instance.nodes.length / oldReps;
                if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                    nodesNum++;
                }
                result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
                result.removed.forEach(((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) {
                    _this._removeNodeInstance(n);
                })));
            }
            if (oldReps != newReps && instance.formulaReps == null) {
                /** @type {?} */
                var fg = this._formGroup.getValue();
                /** @type {?} */
                var completeName = nodeInstanceCompleteName(instance);
                if (fg != null && fg.contains(completeName)) {
                    fg.controls[completeName].setValue(instance.reps);
                }
            }
            instance.flatNodes = flattenNodesInstances(instance.nodes);
            if (instance.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                /** @type {?} */
                var rsInstance = (/** @type {?} */ (instance));
                /** @type {?} */
                var slideNodes = [];
                /** @type {?} */
                var nodesPerSlide = rsInstance.nodes != null ? rsInstance.nodes.length / rsInstance.reps : 0;
                for (var i = 0; i < instance.reps; i++) {
                    /** @type {?} */
                    var startNode = i * nodesPerSlide;
                    slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
                }
                rsInstance.slideNodes = slideNodes;
            }
            return result;
        };
        /**
         * @private
         * @return {?}
         */
        AjfFormRendererService.prototype._updateFormValueAndValidity = /**
         * @private
         * @return {?}
         */
        function () {
            this._nodesUpdates.asObservable()
                .pipe(operators.withLatestFrom(this._formGroup), operators.filter((/**
             * @param {?} values
             * @return {?}
             */
            function (values) { return values[1] !== null; })))
                .subscribe((/**
             * @param {?} values
             * @return {?}
             */
            function (values) {
                /** @type {?} */
                var form = (/** @type {?} */ (values[1]));
                form.updateValueAndValidity();
            }));
        };
        /**
         * @private
         * @param {?} allNodes
         * @param {?} instance
         * @param {?} context
         * @return {?}
         */
        AjfFormRendererService.prototype._explodeRepeatingNode = /**
         * @private
         * @param {?} allNodes
         * @param {?} instance
         * @param {?} context
         * @return {?}
         */
        function (allNodes, instance, context) {
            /** @type {?} */
            var oldReps = updateRepsNum(instance, context);
            if (oldReps !== instance.reps) {
                this._adjustReps(allNodes, instance, oldReps, context);
            }
        };
        /**
         * @private
         * @param {?} allNodes
         * @param {?} nodes
         * @param {?=} parent
         * @param {?=} prefix
         * @param {?=} context
         * @return {?}
         */
        AjfFormRendererService.prototype._orderedNodesInstancesTree = /**
         * @private
         * @param {?} allNodes
         * @param {?} nodes
         * @param {?=} parent
         * @param {?=} prefix
         * @param {?=} context
         * @return {?}
         */
        function (allNodes, nodes, parent, prefix, context) {
            var _this = this;
            if (parent === void 0) { parent = null; }
            if (prefix === void 0) { prefix = []; }
            /** @type {?} */
            var nodesInstances = [];
            /** @type {?} */
            var curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
            orderedNodes(nodes, parent).forEach((/**
             * @param {?} node
             * @return {?}
             */
            function (node) {
                /** @type {?} */
                var parentNodeInstance = nodesInstances.find((/**
                 * @param {?} ni
                 * @return {?}
                 */
                function (ni) { return ni.node.id == node.parent && nodeInstanceSuffix(ni) == curSuffix; }));
                /** @type {?} */
                var branchVisibility = parentNodeInstance != null ?
                    parentNodeInstance.verifiedBranch != null &&
                        parentNodeInstance.verifiedBranch == node.parentNode :
                    true;
                /** @type {?} */
                var nni = _this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
                if (nni != null) {
                    nodesInstances.push(nni);
                }
            }));
            return nodesInstances;
        };
        /**
         * @private
         * @param {?} oldValue
         * @param {?} newValue
         * @return {?}
         */
        AjfFormRendererService.prototype._formValueDelta = /**
         * @private
         * @param {?} oldValue
         * @param {?} newValue
         * @return {?}
         */
        function (oldValue, newValue) {
            return Object.keys(newValue)
                .filter((/**
             * @param {?} k
             * @return {?}
             */
            function (k) { return oldValue[k] !== newValue[k]; }));
        };
        /**
         * @private
         * @param {?} formGroup
         * @return {?}
         */
        AjfFormRendererService.prototype._initFormGroupStreams = /**
         * @private
         * @param {?} formGroup
         * @return {?}
         */
        function (formGroup) {
            var _this = this;
            this._formGroupSubscription.unsubscribe();
            /** @type {?} */
            var init = true;
            /** @type {?} */
            var initForm = true;
            this._formInitEvent.emit(AjfFormInitStatus.Initializing);
            this._formGroupSubscription =
                formGroup.valueChanges
                    .pipe(operators.startWith({}), operators.pairwise(), operators.debounceTime(200), operators.withLatestFrom.apply(void 0, (this._nodesMaps).concat([this._flatNodes])))
                    .subscribe((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
                    /** @type {?} */
                    var oldFormValue = init && {} || v[0][0];
                    init = false;
                    /** @type {?} */
                    var newFormValue = v[0][1];
                    /** @type {?} */
                    var visibilityMap = v[1];
                    /** @type {?} */
                    var repetitionMap = v[2];
                    /** @type {?} */
                    var conditionalBranchesMap = v[3];
                    /** @type {?} */
                    var formulaMap = v[4];
                    /** @type {?} */
                    var validationMap = v[5];
                    /** @type {?} */
                    var warningMap = v[6];
                    /** @type {?} */
                    var nextSlideConditionsMap = v[7];
                    /** @type {?} */
                    var filteredChoicesMap = v[8];
                    /** @type {?} */
                    var triggerConditionsMap = v[9];
                    /** @type {?} */
                    var nodes = v[10];
                    ((/** @type {?} */ (window))).nodes = nodes;
                    /** @type {?} */
                    var delta = _this._formValueDelta(oldFormValue, newFormValue);
                    /** @type {?} */
                    var deltaLen = delta.length;
                    /** @type {?} */
                    var updatedNodes = [];
                    delta.forEach((/**
                     * @param {?} fieldName
                     * @return {?}
                     */
                    function (fieldName) {
                        updatedNodes = updatedNodes.concat(nodes.filter((/**
                         * @param {?} n
                         * @return {?}
                         */
                        function (n) { return nodeInstanceCompleteName(n) === fieldName; })));
                        if (visibilityMap[fieldName] != null) {
                            visibilityMap[fieldName].forEach((/**
                             * @param {?} nodeInstance
                             * @return {?}
                             */
                            function (nodeInstance) {
                                /** @type {?} */
                                var completeName = nodeInstanceCompleteName(nodeInstance);
                                /** @type {?} */
                                var visibilityChanged = updateVisibility(nodeInstance, newFormValue);
                                /** @type {?} */
                                var isField = isFieldInstance(nodeInstance);
                                if (visibilityChanged && !nodeInstance.visible) {
                                    /** @type {?} */
                                    var fg_1 = _this._formGroup.getValue();
                                    if (fg_1 != null) {
                                        /** @type {?} */
                                        var s_1 = rxjs.timer(200).subscribe((/**
                                         * @return {?}
                                         */
                                        function () {
                                            if (s_1 && !s_1.closed) {
                                                s_1.unsubscribe();
                                            }
                                            fg_1.controls[completeName].setValue(null);
                                        }));
                                    }
                                    if (isField) {
                                        ((/** @type {?} */ (nodeInstance))).value = null;
                                    }
                                }
                                else if (visibilityChanged && nodeInstance.visible && isField) {
                                    /** @type {?} */
                                    var fg = _this._formGroup.getValue();
                                    /** @type {?} */
                                    var res = updateFormula((/** @type {?} */ (nodeInstance)), newFormValue);
                                    if (fg != null && res.changed) {
                                        fg.controls[completeName].setValue(res.value);
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            }));
                        }
                        if (repetitionMap[fieldName] != null) {
                            repetitionMap[fieldName].forEach((/**
                             * @param {?} nodeInstance
                             * @return {?}
                             */
                            function (nodeInstance) {
                                if (isRepeatingContainerNode(nodeInstance.node)) {
                                    /** @type {?} */
                                    var rnInstance = (/** @type {?} */ (nodeInstance));
                                    /** @type {?} */
                                    var oldReps = updateRepsNum(rnInstance, newFormValue);
                                    if (oldReps !== rnInstance.reps) {
                                        _this._adjustReps(nodes, rnInstance, oldReps, newFormValue);
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            }));
                        }
                        if (conditionalBranchesMap[fieldName] != null) {
                            conditionalBranchesMap[fieldName].forEach((/**
                             * @param {?} nodeInstance
                             * @return {?}
                             */
                            function (nodeInstance) {
                                // const branchChanged = nodeInstance.updateConditionalBranches(newFormValue);
                                updateConditionalBranches(nodeInstance, newFormValue);
                                // if (branchChanged) {
                                /** @type {?} */
                                var verifiedBranch = nodeInstance.verifiedBranch;
                                nodeInstance.conditionalBranches.forEach((/**
                                 * @param {?} _condition
                                 * @param {?} idx
                                 * @return {?}
                                 */
                                function (_condition, idx) {
                                    if (idx == verifiedBranch) {
                                        _this._showSubtree(newFormValue, nodes, nodeInstance, idx);
                                    }
                                    else {
                                        _this._hideSubtree(newFormValue, nodes, nodeInstance, idx);
                                    }
                                }));
                                // }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            }));
                        }
                        if (formulaMap[fieldName] != null) {
                            formulaMap[fieldName].forEach((/**
                             * @param {?} nodeInstance
                             * @return {?}
                             */
                            function (nodeInstance) {
                                if (isFieldInstance(nodeInstance)) {
                                    /** @type {?} */
                                    var fInstance = (/** @type {?} */ (nodeInstance));
                                    /** @type {?} */
                                    var res = updateFormula(fInstance, newFormValue);
                                    /** @type {?} */
                                    var fg = _this._formGroup.getValue();
                                    if (fg != null && res.changed) {
                                        updateValidation(fInstance, newFormValue);
                                        fg.controls[nodeInstanceCompleteName(nodeInstance)].setValue(res.value);
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            }));
                        }
                        if (validationMap[fieldName] != null) {
                            validationMap[fieldName].forEach((/**
                             * @param {?} nodeInstance
                             * @return {?}
                             */
                            function (nodeInstance) {
                                if (isFieldInstance(nodeInstance)) {
                                    /** @type {?} */
                                    var fInstance = (/** @type {?} */ (nodeInstance));
                                    newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
                                    updateValidation(fInstance, newFormValue, _this.currentSupplementaryInformations);
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            }));
                        }
                        if (warningMap[fieldName] != null) {
                            warningMap[fieldName].forEach((/**
                             * @param {?} nodeInstance
                             * @return {?}
                             */
                            function (nodeInstance) {
                                if (isFieldInstance(nodeInstance)) {
                                    /** @type {?} */
                                    var fInstance = (/** @type {?} */ (nodeInstance));
                                    updateWarning(fInstance, newFormValue);
                                    if (fInstance.warningResults != null &&
                                        fInstance.warningResults.filter((/**
                                         * @param {?} warning
                                         * @return {?}
                                         */
                                        function (warning) { return warning.result; })).length > 0) {
                                        fInstance.warningTrigger.emit();
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            }));
                        }
                        if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
                            if (nextSlideConditionsMap[fieldName]
                                .filter((/**
                             * @param {?} nodeInstance
                             * @return {?}
                             */
                            function (nodeInstance) {
                                if (isFieldInstance(nodeInstance)) {
                                    /** @type {?} */
                                    var fInstance = (/** @type {?} */ (nodeInstance));
                                    return updateNextSlideCondition(fInstance, newFormValue);
                                }
                                return false;
                            }))
                                .length == 1) {
                                _this._nextSlideTrigger.emit();
                            }
                        }
                        if (filteredChoicesMap[fieldName] != null) {
                            filteredChoicesMap[fieldName].forEach((/**
                             * @param {?} nodeInstance
                             * @return {?}
                             */
                            function (nodeInstance) {
                                if (isFieldInstance(nodeInstance)) {
                                    /** @type {?} */
                                    var fInstance = (/** @type {?} */ (nodeInstance));
                                    if (isFieldWithChoices(fInstance.node)) {
                                        updateFilteredChoices((/** @type {?} */ (fInstance)), newFormValue);
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            }));
                        }
                        if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
                            /** @type {?} */
                            var res = triggerConditionsMap[fieldName].filter((/**
                             * @param {?} nodeInstance
                             * @return {?}
                             */
                            function (nodeInstance) {
                                if (!isFieldInstance(nodeInstance)) {
                                    return false;
                                }
                                /** @type {?} */
                                var fInstance = (/** @type {?} */ (nodeInstance));
                                if (!isFieldWithChoices(fInstance.node)) {
                                    return false;
                                }
                                return updateTriggerConditions((/** @type {?} */ (fInstance)), newFormValue);
                            }));
                            if (res.length == 1) {
                                ((/** @type {?} */ (res[0]))).selectionTrigger.emit();
                            }
                        }
                    }));
                    updatedNodes.forEach((/**
                     * @param {?} n
                     * @return {?}
                     */
                    function (n) {
                        /** @type {?} */
                        var nodeIdx = nodes.indexOf(n);
                        /** @type {?} */
                        var idx = nodeIdx - 1;
                        while (idx >= 0) {
                            /** @type {?} */
                            var curNode = nodes[idx];
                            if (isSlidesInstance(curNode)) {
                                /** @type {?} */
                                var slide = (/** @type {?} */ (curNode));
                                /** @type {?} */
                                var subNodesNum = slide.flatNodes.length;
                                /** @type {?} */
                                var valid = true;
                                for (var i = 0; i < subNodesNum; i++) {
                                    /** @type {?} */
                                    var subNode = slide.flatNodes[i];
                                    if (subNode.visible && isFieldInstance(subNode)
                                        && !((/** @type {?} */ (subNode))).valid) {
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
                    }));
                    if (initForm) {
                        initForm = false;
                        _this._formInitEvent.emit(AjfFormInitStatus.Complete);
                    }
                    _this._valueChanged.next();
                }));
            return formGroup;
        };
        /**
         * @private
         * @param {?} context
         * @param {?} nodes
         * @param {?} node
         * @param {?=} branch
         * @return {?}
         */
        AjfFormRendererService.prototype._showSubtree = /**
         * @private
         * @param {?} context
         * @param {?} nodes
         * @param {?} node
         * @param {?=} branch
         * @return {?}
         */
        function (context, nodes, node, branch) {
            this._updateSubtreeVisibility(context, nodes, node, true, branch);
        };
        /**
         * @private
         * @param {?} context
         * @param {?} nodes
         * @param {?} node
         * @param {?=} branch
         * @return {?}
         */
        AjfFormRendererService.prototype._hideSubtree = /**
         * @private
         * @param {?} context
         * @param {?} nodes
         * @param {?} node
         * @param {?=} branch
         * @return {?}
         */
        function (context, nodes, node, branch) {
            this._updateSubtreeVisibility(context, nodes, node, false, branch);
        };
        /**
         * @private
         * @param {?} context
         * @param {?} nodes
         * @param {?} node
         * @param {?} visible
         * @param {?=} branch
         * @return {?}
         */
        AjfFormRendererService.prototype._updateSubtreeVisibility = /**
         * @private
         * @param {?} context
         * @param {?} nodes
         * @param {?} node
         * @param {?} visible
         * @param {?=} branch
         * @return {?}
         */
        function (context, nodes, node, visible, branch) {
            var _this = this;
            /** @type {?} */
            var subNodes;
            /** @type {?} */
            var nodeSuffix = nodeInstanceSuffix(node);
            if (branch != null) {
                subNodes = nodes.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) {
                    /** @type {?} */
                    var suffix = nodeInstanceSuffix(n);
                    return suffix == nodeSuffix && n.node.parent == node.node.id && n.node.parentNode == branch;
                }));
            }
            else {
                subNodes = nodes.filter((/**
                 * @param {?} n
                 * @return {?}
                 */
                function (n) {
                    /** @type {?} */
                    var suffix = nodeInstanceSuffix(n);
                    return suffix == nodeSuffix && n.node.parent == node.node.id;
                }));
            }
            /** @type {?} */
            var isContainer = isContainerNode(node.node);
            subNodes.forEach((/**
             * @param {?} n
             * @return {?}
             */
            function (n) {
                if (!isContainer ||
                    (isContainer && ((/** @type {?} */ (node.node))).nodes.find((/**
                     * @param {?} cn
                     * @return {?}
                     */
                    function (cn) { return cn.id == n.node.id; })) == null)) {
                    updateVisibility(n, context, visible);
                    updateFormula((/** @type {?} */ (n)), context);
                    _this._updateSubtreeVisibility(context, nodes, n, visible);
                }
            }));
        };
        /**
         * @private
         * @return {?}
         */
        AjfFormRendererService.prototype._initNodesStreams = /**
         * @private
         * @return {?}
         */
        function () {
            this._nodes =
                this._nodesUpdates.pipe(operators.scan((/**
                 * @param {?} nodes
                 * @param {?} op
                 * @return {?}
                 */
                function (nodes, op) {
                    return op(nodes);
                }), []), operators.share());
            this._flatNodesTree = this._nodes.pipe(operators.map((/**
             * @param {?} nodes
             * @return {?}
             */
            function (nodes) { return flattenNodesInstancesTree(nodes); })), operators.share());
            this._flatNodes = this._flatNodesTree.pipe(operators.map((/**
             * @param {?} slides
             * @return {?}
             */
            function (slides) {
                /** @type {?} */
                var nodes = [];
                slides.forEach((/**
                 * @param {?} s
                 * @return {?}
                 */
                function (s) {
                    nodes.push(s);
                    nodes = nodes.concat(s.flatNodes);
                }));
                return nodes;
            })), operators.share());
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodeInstance = /**
         * @private
         * @param {?} nodeInstance
         * @return {?}
         */
        function (nodeInstance) {
            /** @type {?} */
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
                return this._removeSlideInstance((/** @type {?} */ (nodeInstance)));
            }
            else if (isRepeatingContainerNode(nodeInstance.node)) {
                this._removeNodeGroupInstance((/** @type {?} */ (nodeInstance)));
            }
            else if (isFieldInstance(nodeInstance)) {
                this._removeFieldInstance((/** @type {?} */ (nodeInstance)));
            }
            return nodeInstance;
        };
        /**
         * @private
         * @param {?} slideInstance
         * @return {?}
         */
        AjfFormRendererService.prototype._removeSlideInstance = /**
         * @private
         * @param {?} slideInstance
         * @return {?}
         */
        function (slideInstance) {
            var _this = this;
            /** @type {?} */
            var slide = slideInstance.node;
            if (slide.visibility != null) {
                this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
            }
            slideInstance.conditionalBranches.forEach((/**
             * @param {?} conditionalBranch
             * @return {?}
             */
            function (conditionalBranch) {
                _this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
            }));
            return slideInstance;
        };
        /**
         * @private
         * @param {?} nodeGroupInstance
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodeGroupInstance = /**
         * @private
         * @param {?} nodeGroupInstance
         * @return {?}
         */
        function (nodeGroupInstance) {
            /** @type {?} */
            var nodeGroup = nodeGroupInstance.node;
            if (nodeGroup.visibility != null) {
                this._removeFromNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
            }
            if (nodeGroupInstance.formulaReps != null && nodeGroup.formulaReps != null) {
                this._removeFromNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
            }
            return nodeGroupInstance;
        };
        /**
         * @private
         * @param {?} fieldInstance
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFieldInstance = /**
         * @private
         * @param {?} fieldInstance
         * @return {?}
         */
        function (fieldInstance) {
            var _this = this;
            /** @type {?} */
            var formGroup = this._formGroup.getValue();
            /** @type {?} */
            var fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
            if (formGroup != null && formGroup.contains(fieldInstanceName)) {
                formGroup.removeControl(fieldInstanceName);
            }
            if (fieldInstance.validation != null) {
                this._validationNodesMapUpdates.next((/**
                 * @param {?} vmap
                 * @return {?}
                 */
                function (vmap) {
                    if (vmap[fieldInstanceName] == null) {
                        delete vmap[fieldInstanceName];
                    }
                    return vmap;
                }));
            }
            if (fieldInstance.visibility != null) {
                this._removeFromNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
            }
            fieldInstance.conditionalBranches.forEach((/**
             * @param {?} conditionalBranch
             * @return {?}
             */
            function (conditionalBranch) {
                _this._removeFromNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
            }));
            if (fieldInstance.formula) {
                this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
            }
            // TODO: check this, probably is never verified
            if (isRepeatingContainerNode(fieldInstance.node)) {
                /** @type {?} */
                var rcInstance = ((/** @type {?} */ ((/** @type {?} */ (fieldInstance)))));
                if (rcInstance.formulaReps != null) {
                    this._removeFromNodesRepetitionMap(fieldInstance, rcInstance.formulaReps.formula);
                }
            }
            if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
                fieldInstance.validation.conditions.forEach((/**
                 * @param {?} condition
                 * @return {?}
                 */
                function (condition) {
                    _this._removeFromNodesValidationMap(fieldInstance, condition.condition);
                }));
            }
            if (fieldInstance.warning != null) {
                fieldInstance.warning.conditions.forEach((/**
                 * @param {?} condition
                 * @return {?}
                 */
                function (condition) {
                    _this._removeFromNodesWarningMap(fieldInstance, condition.condition);
                }));
            }
            if (fieldInstance.nextSlideCondition != null) {
                this._removeFromNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
            }
            if (isFieldWithChoices(fieldInstance.node)) {
                /** @type {?} */
                var fwcInstance = (/** @type {?} */ (fieldInstance));
                if (fwcInstance.choicesFilter != null) {
                    this._removeFromNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
                    if (fwcInstance.triggerConditions != null) {
                        fwcInstance.triggerConditions.forEach((/**
                         * @param {?} condition
                         * @return {?}
                         */
                        function (condition) {
                            _this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                        }));
                    }
                }
            }
            return fieldInstance;
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @return {?}
         */
        AjfFormRendererService.prototype._addNodeInstance = /**
         * @private
         * @param {?} nodeInstance
         * @return {?}
         */
        function (nodeInstance) {
            if (isRepeatingContainerNode(nodeInstance.node)) {
                return this._addNodeGroupInstance((/** @type {?} */ (nodeInstance)));
            }
            else if (isSlideInstance(nodeInstance)) {
                return this._addSlideInstance((/** @type {?} */ (nodeInstance)));
            }
            else if (isFieldInstance(nodeInstance)) {
                return this._addFieldInstance((/** @type {?} */ (nodeInstance)));
            }
            return nodeInstance;
        };
        /**
         * @private
         * @param {?} fieldInstance
         * @return {?}
         */
        AjfFormRendererService.prototype._addFieldInstance = /**
         * @private
         * @param {?} fieldInstance
         * @return {?}
         */
        function (fieldInstance) {
            var _this = this;
            /** @type {?} */
            var formGroup = this._formGroup.getValue();
            /** @type {?} */
            var fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
            if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
                /** @type {?} */
                var control = new forms.FormControl();
                control.setValue(fieldInstance.value);
                formGroup.registerControl(fieldInstanceName, control);
            }
            if (fieldInstance.validation != null) {
                this._validationNodesMapUpdates.next((/**
                 * @param {?} vmap
                 * @return {?}
                 */
                function (vmap) {
                    if (vmap[fieldInstanceName] == null) {
                        vmap[fieldInstanceName] = [];
                    }
                    if (vmap[fieldInstanceName].indexOf(fieldInstance) == -1) {
                        vmap[fieldInstanceName].push(fieldInstance);
                    }
                    return vmap;
                }));
            }
            if (fieldInstance.visibility != null) {
                this._addToNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
            }
            fieldInstance.conditionalBranches.forEach((/**
             * @param {?} conditionalBranch
             * @return {?}
             */
            function (conditionalBranch) {
                _this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
            }));
            if (fieldInstance.formula) {
                this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
            }
            if (isNodeGroupInstance(fieldInstance)) {
                /** @type {?} */
                var ngInstance = (/** @type {?} */ ((/** @type {?} */ (fieldInstance))));
                if (ngInstance.formulaReps != null) {
                    this._addToNodesRepetitionMap(fieldInstance, ngInstance.formulaReps.formula);
                }
            }
            if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
                fieldInstance.validation.conditions.forEach((/**
                 * @param {?} condition
                 * @return {?}
                 */
                function (condition) {
                    _this._addToNodesValidationMap(fieldInstance, condition.condition);
                }));
            }
            if (fieldInstance.warning != null) {
                fieldInstance.warning.conditions.forEach((/**
                 * @param {?} condition
                 * @return {?}
                 */
                function (condition) {
                    _this._addToNodesWarningMap(fieldInstance, condition.condition);
                }));
            }
            if (fieldInstance.nextSlideCondition != null) {
                this._addToNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
            }
            if (isCustomFieldWithChoices(fieldInstance.node) || isFieldWithChoicesInstance(fieldInstance)) {
                /** @type {?} */
                var fwcInstance = (/** @type {?} */ (fieldInstance));
                if (fwcInstance.choicesFilter != null) {
                    this._addToNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
                }
                if (fwcInstance.triggerConditions != null) {
                    fwcInstance.triggerConditions.forEach((/**
                     * @param {?} condition
                     * @return {?}
                     */
                    function (condition) {
                        _this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                    }));
                }
            }
            return fieldInstance;
        };
        /**
         * @private
         * @param {?} slideInstance
         * @return {?}
         */
        AjfFormRendererService.prototype._addSlideInstance = /**
         * @private
         * @param {?} slideInstance
         * @return {?}
         */
        function (slideInstance) {
            var _this = this;
            /** @type {?} */
            var slide = slideInstance.node;
            if (slide.visibility != null) {
                this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
            }
            slideInstance.conditionalBranches.forEach((/**
             * @param {?} conditionalBranch
             * @return {?}
             */
            function (conditionalBranch) {
                _this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
            }));
            return slideInstance;
        };
        /**
         * @private
         * @param {?} nodeGroupInstance
         * @return {?}
         */
        AjfFormRendererService.prototype._addNodeGroupInstance = /**
         * @private
         * @param {?} nodeGroupInstance
         * @return {?}
         */
        function (nodeGroupInstance) {
            var _this = this;
            /** @type {?} */
            var nodeGroup = nodeGroupInstance.node;
            if (nodeGroup.visibility != null) {
                this._addToNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
            }
            nodeGroupInstance.conditionalBranches.forEach((/**
             * @param {?} conditionalBranch
             * @return {?}
             */
            function (conditionalBranch) {
                _this._addToNodesConditionalBranchMap(nodeGroupInstance, conditionalBranch.condition);
            }));
            if (nodeGroupInstance.formulaReps != null) {
                if (nodeGroup.formulaReps != null) {
                    this._addToNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
                }
            }
            else {
                /** @type {?} */
                var formGroup = this._formGroup.getValue();
                /** @type {?} */
                var nodeGroupInstanceName = nodeInstanceCompleteName(nodeGroupInstance);
                if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
                    /** @type {?} */
                    var control = new forms.FormControl();
                    control.setValue(nodeGroupInstance.reps);
                    formGroup.registerControl(nodeGroupInstanceName, control);
                }
            }
            return nodeGroupInstance;
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodesVisibilityMapIndex = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._removeNodesMapIndex(this._visibilityNodesMapUpdates, index);
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodesRepetitionMapIndex = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._removeNodesMapIndex(this._repetitionNodesMapUpdates, index);
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodesConditionalBranchMapIndex = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._removeNodesMapIndex(this._conditionalBranchNodesMapUpdates, index);
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodesFormulaMapIndex = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._removeNodesMapIndex(this._formulaNodesMapUpdates, index);
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodesValidationMapIndex = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._removeNodesMapIndex(this._validationNodesMapUpdates, index);
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodesWarningMapIndex = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._removeNodesMapIndex(this._warningNodesMapUpdates, index);
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodesFilteredChoicesMapIndex = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._removeNodesMapIndex(this._filteredChoicesNodesMapUpdates, index);
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodesTriggerConditionsMapIndex = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._removeNodesMapIndex(this._triggerConditionsNodesMapUpdates, index);
        };
        /**
         * @private
         * @param {?} index
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodesNextSlideConditionsMapIndex = /**
         * @private
         * @param {?} index
         * @return {?}
         */
        function (index) {
            this._removeNodesMapIndex(this._nextSlideConditionsNodesMapUpdates, index);
        };
        /**
         * @private
         * @param {?} nodesMap
         * @param {?} index
         * @return {?}
         */
        AjfFormRendererService.prototype._removeNodesMapIndex = /**
         * @private
         * @param {?} nodesMap
         * @param {?} index
         * @return {?}
         */
        function (nodesMap, index) {
            nodesMap.next((/**
             * @param {?} vmap
             * @return {?}
             */
            function (vmap) {
                if (Object.keys(vmap).indexOf(index) > -1) {
                    delete vmap[index];
                }
                return vmap;
            }));
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFromNodesVisibilityMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._removeFromNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFromNodesRepetitionMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._removeFromNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFromNodesConditionalBranchMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._removeFromNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFromNodesFormulaMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._removeFromNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFromNodesValidationMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._removeFromNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFromNodesWarningMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._removeFromNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFromNodesFilteredChoicesMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFromNodesTriggerConditionsMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFromNodesNextSlideConditionsMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodesMap
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._removeFromNodesMap = /**
         * @private
         * @param {?} nodesMap
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodesMap, nodeInstance, formula) {
            /** @type {?} */
            var tokens = tokenize(formula)
                .filter((/**
             * @param {?} token
             * @return {?}
             */
            function (token) { return token.type == 'Identifier' && token.value != '$value'; }));
            if (tokens.length > 0) {
                nodesMap.next((/**
                 * @param {?} vmap
                 * @return {?}
                 */
                function (vmap) {
                    tokens.forEach((/**
                     * @param {?} token
                     * @return {?}
                     */
                    function (token) {
                        /** @type {?} */
                        var tokenName = token.value;
                        if (vmap[tokenName] != null) {
                            /** @type {?} */
                            var idx = vmap[tokenName].indexOf(nodeInstance);
                            if (idx > -1) {
                                vmap[tokenName].splice(idx, 1);
                                if (vmap[tokenName].length == 0) {
                                    delete vmap[tokenName];
                                }
                            }
                        }
                    }));
                    return vmap;
                }));
            }
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._addToNodesVisibilityMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._addToNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._addToNodesRepetitionMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._addToNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._addToNodesConditionalBranchMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._addToNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._addToNodesFormulaMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._addToNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._addToNodesValidationMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._addToNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._addToNodesWarningMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._addToNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._addToNodesFilteredChoicesMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._addToNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._addToNodesTriggerConditionsMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._addToNodesMap(this._triggerConditionsNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._addToNodesNextSlideConditionsMap = /**
         * @private
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodeInstance, formula) {
            this._addToNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
        };
        /**
         * @private
         * @param {?} nodesMap
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        AjfFormRendererService.prototype._addToNodesMap = /**
         * @private
         * @param {?} nodesMap
         * @param {?} nodeInstance
         * @param {?} formula
         * @return {?}
         */
        function (nodesMap, nodeInstance, formula) {
            /** @type {?} */
            var tokens = tokenize(formula)
                .filter((/**
             * @param {?} token
             * @return {?}
             */
            function (token) { return token.type == 'Identifier' && token.value != '$value'; }));
            if (tokens.length > 0) {
                nodesMap.next((/**
                 * @param {?} vmap
                 * @return {?}
                 */
                function (vmap) {
                    tokens.forEach((/**
                     * @param {?} token
                     * @return {?}
                     */
                    function (token) {
                        /** @type {?} */
                        var tokenName = token.value;
                        if (vmap[tokenName] == null) {
                            vmap[tokenName] = [];
                        }
                        if (vmap[tokenName].indexOf(nodeInstance) === -1) {
                            vmap[tokenName].push(nodeInstance);
                        }
                    }));
                    return vmap;
                }));
            }
        };
        AjfFormRendererService.decorators = [
            { type: core.Injectable },
        ];
        /** @nocollapse */
        AjfFormRendererService.ctorParameters = function () { return [
            { type: AjfValidationService }
        ]; };
        return AjfFormRendererService;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFormActionEvent = /** @class */ (function () {
        function AjfFormActionEvent() {
        }
        return AjfFormActionEvent;
    }());
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    AjfFormRenderer = /** @class */ (function () {
        /**
         * this constructor will init current formula by ajfBuilderService
         */
        function AjfFormRenderer(_rendererService, _changeDetectorRef) {
            this._rendererService = _rendererService;
            this._changeDetectorRef = _changeDetectorRef;
            // ajfFieldTypes [ Text, Number, Boolean, SingleChoice, MultipleChoice,
            // Formula, Empty, Composed, LENGTH ]
            this.ajfFieldTypes = AjfFieldType;
            this._orientationChange = new core.EventEmitter();
            this.orientationChange = this._orientationChange.asObservable();
            this._saveDisabled = false;
            this._hasStartMessage = false;
            this._hasEndMessage = false;
            this._hideTopToolbar = false;
            this._hideBottomToolbar = false;
            this._hideNavigationButtons = false;
            this._fixedOrientation = false;
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
            this.formIsInit = _rendererService.formInitEvent.pipe(operators.map((/**
             * @param {?} e
             * @return {?}
             */
            function (e) { return e === AjfFormInitStatus.Complete; })));
        }
        Object.defineProperty(AjfFormRenderer.prototype, "saveDisabled", {
            get: /**
             * @return {?}
             */
            function () { return this._saveDisabled; },
            set: /**
             * @param {?} saveDisabled
             * @return {?}
             */
            function (saveDisabled) {
                this._saveDisabled = utils.coerceBooleanProperty(saveDisabled);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hasStartMessage", {
            get: /**
             * @return {?}
             */
            function () { return this._hasStartMessage; },
            set: /**
             * @param {?} hasStartMessage
             * @return {?}
             */
            function (hasStartMessage) {
                this._hasStartMessage = utils.coerceBooleanProperty(hasStartMessage);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hasEndMessage", {
            get: /**
             * @return {?}
             */
            function () { return this._hasEndMessage; },
            set: /**
             * @param {?} hasEndMessage
             * @return {?}
             */
            function (hasEndMessage) {
                this._hasEndMessage = utils.coerceBooleanProperty(hasEndMessage);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hideTopToolbar", {
            get: /**
             * @return {?}
             */
            function () { return this._hideTopToolbar; },
            set: /**
             * @param {?} hideTopToolbar
             * @return {?}
             */
            function (hideTopToolbar) {
                this._hideTopToolbar = utils.coerceBooleanProperty(hideTopToolbar);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hideBottompToolbar", {
            get: /**
             * @return {?}
             */
            function () { return this._hideBottomToolbar; },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hideBottomToolbar", {
            set: /**
             * @param {?} hideBottomToolbar
             * @return {?}
             */
            function (hideBottomToolbar) {
                this._hideBottomToolbar = utils.coerceBooleanProperty(hideBottomToolbar);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "hideNavigationButtons", {
            get: /**
             * @return {?}
             */
            function () { return this._hideNavigationButtons; },
            set: /**
             * @param {?} hideNavigationButtons
             * @return {?}
             */
            function (hideNavigationButtons) {
                this._hideNavigationButtons = utils.coerceBooleanProperty(hideNavigationButtons);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "fixedOrientation", {
            get: /**
             * @return {?}
             */
            function () { return this._fixedOrientation; },
            set: /**
             * @param {?} fixedOrientation
             * @return {?}
             */
            function (fixedOrientation) {
                this._fixedOrientation = utils.coerceBooleanProperty(fixedOrientation);
                this._changeDetectorRef.markForCheck();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "orientation", {
            get: /**
             * @return {?}
             */
            function () { return this._orientation; },
            set: /**
             * @param {?} orientation
             * @return {?}
             */
            function (orientation) {
                if (orientation !== 'horizontal' && orientation !== 'vertical') {
                    return;
                }
                if (orientation !== this._orientation) {
                    this._orientation = orientation;
                    this._changeDetectorRef.markForCheck();
                    this._orientationChange.emit(this._orientation);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(AjfFormRenderer.prototype, "form", {
            set: /**
             * @param {?} form
             * @return {?}
             */
            function (form) {
                this._form = form;
                if (this._init) {
                    this._rendererService.setForm(this._form);
                }
            },
            enumerable: true,
            configurable: true
        });
        /**
         * this method will scroll to next error received by subscribe
         */
        /**
         * this method will scroll to next error received by subscribe
         * @return {?}
         */
        AjfFormRenderer.prototype.goToNextError = /**
         * this method will scroll to next error received by subscribe
         * @return {?}
         */
        function () { this._errorMoveEvent.emit(true); };
        /**
         * this method will scroll to prev error received by subscribe
         */
        /**
         * this method will scroll to prev error received by subscribe
         * @return {?}
         */
        AjfFormRenderer.prototype.goToPrevError = /**
         * this method will scroll to prev error received by subscribe
         * @return {?}
         */
        function () { this._errorMoveEvent.emit(false); };
        /**
         * this method will add group
         */
        /**
         * this method will add group
         * @param {?} nodeGroup
         * @return {?}
         */
        AjfFormRenderer.prototype.addGroup = /**
         * this method will add group
         * @param {?} nodeGroup
         * @return {?}
         */
        function (nodeGroup) {
            var _this = this;
            /** @type {?} */
            var s = this._rendererService.addGroup(nodeGroup).pipe(operators.delayWhen((/**
             * @return {?}
             */
            function () { return _this.formSlider.pageScrollFinish; }))).subscribe((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { if (r && _this.formSlider != null) {
                _this.formSlider.slide({ dir: 'down' });
            } }), (/**
             * @param {?} _e
             * @return {?}
             */
            function (_e) { if (s) {
                s.unsubscribe();
            } }), (/**
             * @return {?}
             */
            function () { if (s) {
                s.unsubscribe();
            } }));
        };
        /**
         * this method will remove group
         */
        /**
         * this method will remove group
         * @param {?} nodeGroup
         * @return {?}
         */
        AjfFormRenderer.prototype.removeGroup = /**
         * this method will remove group
         * @param {?} nodeGroup
         * @return {?}
         */
        function (nodeGroup) {
            var _this = this;
            /** @type {?} */
            var s = this._rendererService.removeGroup(nodeGroup).pipe(operators.delayWhen((/**
             * @return {?}
             */
            function () { return _this.formSlider.pageScrollFinish; }))).subscribe((/**
             * @param {?} r
             * @return {?}
             */
            function (r) { if (r && _this.formSlider != null) {
                _this.formSlider.slide({ dir: 'up' });
            } }), (/**
             * @param {?} _e
             * @return {?}
             */
            function (_e) { if (s) {
                s.unsubscribe();
            } }), (/**
             * @return {?}
             */
            function () { if (s) {
                s.unsubscribe();
            } }));
        };
        /**
         * @param {?} _evt
         * @return {?}
         */
        AjfFormRenderer.prototype.onSave = /**
         * @param {?} _evt
         * @return {?}
         */
        function (_evt) {
            this._formAction.emit({
                source: this,
                action: 'save',
                value: this._rendererService.getFormValue()
            });
        };
        /**
         * @param {?} _evt
         * @param {?} action
         * @return {?}
         */
        AjfFormRenderer.prototype.onFormAction = /**
         * @param {?} _evt
         * @param {?} action
         * @return {?}
         */
        function (_evt, action) {
            this._formAction.emit({
                source: this,
                value: this._rendererService.getFormValue(),
                action: action
            });
        };
        /**
         * this method will set current form in rederer service when init form
         */
        /**
         * this method will set current form in rederer service when init form
         * @return {?}
         */
        AjfFormRenderer.prototype.ngAfterViewInit = /**
         * this method will set current form in rederer service when init form
         * @return {?}
         */
        function () {
            if (this._form != null) {
                this._rendererService.setForm(this._form);
                this._changeDetectorRef.detectChanges();
            }
        };
        /**
         * @return {?}
         */
        AjfFormRenderer.prototype.ngAfterViewChecked = /**
         * @return {?}
         */
        function () {
            var _this = this;
            if (!this._init && this.formSlider != null) {
                this._init = true;
                this._errorMoveSubscription = ((/** @type {?} */ (this._errorMoveEvent))).pipe(operators.withLatestFrom(this._errorPositions)).subscribe((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) {
                    /** @type {?} */
                    var move = v[0];
                    /** @type {?} */
                    var currentPosition = _this.formSlider.currentPage - (+_this.hasStartMessage) + 1;
                    /** @type {?} */
                    var errors = v[1];
                    if (errors == null) {
                        return;
                    }
                    /** @type {?} */
                    var found = false;
                    /** @type {?} */
                    var prevIdx = -1;
                    /** @type {?} */
                    var nextIdx = -1;
                    /** @type {?} */
                    var idx = 0;
                    /** @type {?} */
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
                }));
            }
        };
        /**
         * @return {?}
         */
        AjfFormRenderer.prototype.ngOnDestroy = /**
         * @return {?}
         */
        function () {
            this._nextSlideSubscription.unsubscribe();
            this._errorMoveSubscription.unsubscribe();
            this._orientationChange.complete();
            this._errorMoveEvent.complete();
            this._formAction.complete();
        };
        /**
         * @param {?} orientation
         * @return {?}
         */
        AjfFormRenderer.prototype.orientationChangeHandler = /**
         * @param {?} orientation
         * @return {?}
         */
        function (orientation) {
            this.orientation = orientation;
        };
        /**
         * @param {?} _
         * @param {?} node
         * @return {?}
         */
        AjfFormRenderer.prototype.trackNodeById = /**
         * @param {?} _
         * @param {?} node
         * @return {?}
         */
        function (_, node) {
            return nodeInstanceCompleteName(node);
        };
        return AjfFormRenderer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfBoolToIntPipe = /** @class */ (function () {
        function AjfBoolToIntPipe() {
        }
        /**
         * @param {?} value
         * @return {?}
         */
        AjfBoolToIntPipe.prototype.transform = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value ? 1 : 0;
        };
        AjfBoolToIntPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfBoolToInt' },] },
        ];
        return AjfBoolToIntPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfExpandFieldWithChoicesPipe = /** @class */ (function () {
        function AjfExpandFieldWithChoicesPipe() {
        }
        /**
         * @param {?} instance
         * @param {?} threshold
         * @return {?}
         */
        AjfExpandFieldWithChoicesPipe.prototype.transform = /**
         * @param {?} instance
         * @param {?} threshold
         * @return {?}
         */
        function (instance, threshold) {
            return !instance.node.forceNarrow && (instance.node.forceExpanded
                || (instance.filteredChoices && instance.filteredChoices.length <= threshold));
        };
        AjfExpandFieldWithChoicesPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfExpandFieldWithChoices' },] },
        ];
        return AjfExpandFieldWithChoicesPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfIncrementPipe = /** @class */ (function () {
        function AjfIncrementPipe() {
        }
        /**
         * @param {?} value
         * @param {?=} increment
         * @return {?}
         */
        AjfIncrementPipe.prototype.transform = /**
         * @param {?} value
         * @param {?=} increment
         * @return {?}
         */
        function (value, increment) {
            if (increment === void 0) { increment = 1; }
            return value + increment;
        };
        AjfIncrementPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfIncrement' },] },
        ];
        return AjfIncrementPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfIsRepeatingSlideInstancePipe = /** @class */ (function () {
        function AjfIsRepeatingSlideInstancePipe() {
        }
        /**
         * @param {?} instance
         * @return {?}
         */
        AjfIsRepeatingSlideInstancePipe.prototype.transform = /**
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            return isRepeatingSlideInstance(instance);
        };
        AjfIsRepeatingSlideInstancePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfIsRepeatingSlideInstance' },] },
        ];
        return AjfIsRepeatingSlideInstancePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfNodeCompleteNamePipe = /** @class */ (function () {
        function AjfNodeCompleteNamePipe() {
        }
        /**
         * @param {?} instance
         * @return {?}
         */
        AjfNodeCompleteNamePipe.prototype.transform = /**
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            return instance ? nodeInstanceCompleteName(instance) : '';
        };
        AjfNodeCompleteNamePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfNodeCompleteName' },] },
        ];
        return AjfNodeCompleteNamePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfRangePipe = /** @class */ (function () {
        function AjfRangePipe() {
        }
        /**
         * @param {?=} size
         * @param {?=} start
         * @param {?=} step
         * @return {?}
         */
        AjfRangePipe.prototype.transform = /**
         * @param {?=} size
         * @param {?=} start
         * @param {?=} step
         * @return {?}
         */
        function (size, start, step) {
            if (size === void 0) { size = 0; }
            if (start === void 0) { start = 1; }
            if (step === void 0) { step = 1; }
            /** @type {?} */
            var range = [];
            for (var length_1 = 0; length_1 < size; ++length_1) {
                range.push(start);
                start += step;
            }
            return range;
        };
        AjfRangePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfRange' },] },
        ];
        return AjfRangePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfTableRowClass = /** @class */ (function () {
        function AjfTableRowClass() {
        }
        /**
         * @param {?} value
         * @return {?}
         */
        AjfTableRowClass.prototype.transform = /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            return value % 2 == 0 ? 'ajf-row-even' : 'ajf-row-odd';
        };
        AjfTableRowClass.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfTableRowClass' },] },
        ];
        return AjfTableRowClass;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfTableVisibleColumnsPipe = /** @class */ (function () {
        function AjfTableVisibleColumnsPipe() {
        }
        /**
         * @param {?} instance
         * @return {?}
         */
        AjfTableVisibleColumnsPipe.prototype.transform = /**
         * @param {?} instance
         * @return {?}
         */
        function (instance) {
            if (!instance.node.editable) {
                return instance.hideEmptyRows
                    ? (instance.value || []).filter((/**
                     * @param {?} col
                     * @return {?}
                     */
                    function (col) { return col[1].reduce((/**
                     * @param {?} prev
                     * @param {?} cur
                     * @return {?}
                     */
                    function (prev, cur) {
                        return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                    }), false); })).map((/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) { return [v[0]].concat(v[1]); }))
                    : instance.value.map((/**
                     * @param {?} v
                     * @return {?}
                     */
                    function (v) { return [v[0]].concat(v[1]); }));
            }
            return (instance.controls || []).map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return [v[0]].concat(v[1]); }));
        };
        AjfTableVisibleColumnsPipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfTableVisibleColumns' },] },
        ];
        return AjfTableVisibleColumnsPipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfValidSlidePipe = /** @class */ (function () {
        function AjfValidSlidePipe() {
        }
        /**
         * @param {?} slide
         * @param {?} idx
         * @return {?}
         */
        AjfValidSlidePipe.prototype.transform = /**
         * @param {?} slide
         * @param {?} idx
         * @return {?}
         */
        function (slide, idx) {
            if (idx == null || typeof idx !== 'number') {
                return false;
            }
            if (idx >= slide.slideNodes.length) {
                return true;
            }
            return slide.slideNodes[idx]
                .map((/**
             * @param {?} n
             * @return {?}
             */
            function (n) {
                if (n.visible && Object.keys(n).indexOf('valid') > -1) {
                    return ((/** @type {?} */ (n))).valid;
                }
                return true;
            })).reduce((/**
             * @param {?} v1
             * @param {?} v2
             * @return {?}
             */
            function (v1, v2) { return v1 && v2; }), true);
        };
        AjfValidSlidePipe.decorators = [
            { type: core.Pipe, args: [{ name: 'ajfValidSlide', pure: false },] },
        ];
        return AjfValidSlidePipe;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFormsModule = /** @class */ (function () {
        function AjfFormsModule() {
        }
        AjfFormsModule.decorators = [
            { type: core.NgModule, args: [{
                        declarations: [
                            AjfBoolToIntPipe,
                            AjfDateValuePipe,
                            AjfDateValueStringPipe,
                            AjfExpandFieldWithChoicesPipe,
                            AjfFieldHost,
                            AjfFieldIconPipe,
                            AjfFieldIsValidPipe,
                            AjfIncrementPipe,
                            AjfIsRepeatingSlideInstancePipe,
                            AjfNodeCompleteNamePipe,
                            AjfRangePipe,
                            AjfTableRowClass,
                            AjfTableVisibleColumnsPipe,
                            AjfValidSlidePipe,
                        ],
                        exports: [
                            AjfBoolToIntPipe,
                            AjfDateValuePipe,
                            AjfDateValueStringPipe,
                            AjfExpandFieldWithChoicesPipe,
                            AjfFieldHost,
                            AjfFieldIconPipe,
                            AjfFieldIsValidPipe,
                            AjfIncrementPipe,
                            AjfIsRepeatingSlideInstancePipe,
                            AjfNodeCompleteNamePipe,
                            AjfRangePipe,
                            AjfTableRowClass,
                            AjfTableVisibleColumnsPipe,
                            AjfValidSlidePipe,
                        ],
                        providers: [AjfDateValueStringPipe, AjfFormRendererService, AjfValidationService]
                    },] },
        ];
        return AjfFormsModule;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} v
     * @return {?}
     */
    function getTypeName(v) {
        /** @type {?} */
        var typeStr = typeof v;
        return typeStr === 'object'
            ? v.constructor.toString().match(/\w+/g)[1]
            : typeStr;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @abstract
     */
    var   /**
     * @abstract
     */
    AjfInputFieldComponent = /** @class */ (function (_super) {
        __extends(AjfInputFieldComponent, _super);
        function AjfInputFieldComponent() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.type = 'text';
            _this._readonly = false;
            return _this;
        }
        Object.defineProperty(AjfInputFieldComponent.prototype, "readonly", {
            get: /**
             * @return {?}
             */
            function () { return this._readonly; },
            set: /**
             * @param {?} readonly
             * @return {?}
             */
            function (readonly) {
                this._readonly = utils.coerceBooleanProperty(readonly);
            },
            enumerable: true,
            configurable: true
        });
        return AjfInputFieldComponent;
    }(AjfBaseFieldComponent));

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /** @type {?} */
    var AJF_SEARCH_ALERT_THRESHOLD = new core.InjectionToken('AJF_SEARCH_ALERT_THRESHOLD');

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @template T
     * @param {?} origin
     * @return {?}
     */
    function createAttachmentsOrigin(origin) {
        return __assign({}, origin, { attachments: origin.attachments || [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfAttachmentsOriginSerializer = /** @class */ (function () {
        function AjfAttachmentsOriginSerializer() {
        }
        /**
         * @param {?} origin
         * @return {?}
         */
        AjfAttachmentsOriginSerializer.fromJson = /**
         * @param {?} origin
         * @return {?}
         */
        function (origin) {
            if (origin.name == null) {
                throw new Error('Malformed attachments origin');
            }
            return createAttachmentsOrigin((/** @type {?} */ (origin)));
        };
        return AjfAttachmentsOriginSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @template T
     * @param {?} origin
     * @return {?}
     */
    function createChoicesOrigin(origin) {
        return __assign({}, origin, { type: origin.type, label: origin.label || '', choices: origin.choices || [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfChoicesOriginSerializer = /** @class */ (function () {
        function AjfChoicesOriginSerializer() {
        }
        /**
         * @param {?} origin
         * @return {?}
         */
        AjfChoicesOriginSerializer.fromJson = /**
         * @param {?} origin
         * @return {?}
         */
        function (origin) {
            return createChoicesOrigin((/** @type {?} */ (__assign({}, origin, { type: origin.type || 'fixed', name: origin.name || '' }))));
        };
        return AjfChoicesOriginSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     * @param {?} field
     * @return {?}
     */
    function createFieldWithChoices(field) {
        /** @type {?} */
        var node = createField(__assign({}, field));
        return __assign({}, node, field, { choices: field.choices || [], forceExpanded: field.forceExpanded || false, forceNarrow: field.forceNarrow || false });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} containerNode
     * @return {?}
     */
    function createContainerNode(containerNode) {
        /** @type {?} */
        var node = createNode(containerNode);
        return __assign({}, node, { nodes: containerNode.nodes || [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} repeatingNode
     * @return {?}
     */
    function createRepeatingNode(repeatingNode) {
        /** @type {?} */
        var node = createNode(repeatingNode);
        return __assign({}, repeatingNode, node, { minReps: repeatingNode.minReps != null ? repeatingNode.minReps : 1, maxReps: repeatingNode.maxReps != null ? repeatingNode.maxReps : 0 });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeGroup
     * @return {?}
     */
    function createNodeGroup(nodeGroup) {
        return __assign({}, createContainerNode(nodeGroup), createRepeatingNode(nodeGroup), { nodeType: AjfNodeType.AjfNodeGroup });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeGroup
     * @return {?}
     */
    function createRepeatingSlide(nodeGroup) {
        return __assign({}, createContainerNode(nodeGroup), createRepeatingNode(nodeGroup), { nodeType: AjfNodeType.AjfRepeatingSlide });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} nodeGroup
     * @return {?}
     */
    function createSlide(nodeGroup) {
        return __assign({}, createContainerNode(nodeGroup), { nodeType: AjfNodeType.AjfSlide });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfValidationGroupSerializer = /** @class */ (function () {
        function AjfValidationGroupSerializer() {
        }
        /**
         * @param {?} group
         * @return {?}
         */
        AjfValidationGroupSerializer.fromJson = /**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            return createValidationGroup(group);
        };
        return AjfValidationGroupSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfWarningGroupSerializer = /** @class */ (function () {
        function AjfWarningGroupSerializer() {
        }
        /**
         * @param {?} group
         * @return {?}
         */
        AjfWarningGroupSerializer.fromJson = /**
         * @param {?} group
         * @return {?}
         */
        function (group) {
            return createWarningGroup(group);
        };
        return AjfWarningGroupSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfNodeSerializer = /** @class */ (function () {
        function AjfNodeSerializer() {
        }
        /**
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        AjfNodeSerializer.fromJson = /**
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        function (json, choicesOrigins, attachmentsOrigins) {
            /** @type {?} */
            var err = 'Malformed node';
            json.name = json.name || '';
            if (json.id == null || json.parent == null || json.nodeType == null) {
                throw new Error(err);
            }
            /** @type {?} */
            var obj = (/** @type {?} */ (json));
            if (obj.visibility) {
                obj.visibility = models.AjfConditionSerializer.fromJson(obj.visibility);
            }
            obj.conditionalBranches =
                (obj.conditionalBranches || []).map((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return models.AjfConditionSerializer.fromJson(c); }));
            switch (obj.nodeType) {
                case AjfNodeType.AjfField:
                    return AjfNodeSerializer._fieldFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
                case AjfNodeType.AjfFieldNodeLink:
                    return AjfNodeSerializer._fieldNodeLinkFromJson((/** @type {?} */ (obj)));
                case AjfNodeType.AjfNodeGroup:
                    return AjfNodeSerializer._nodeGroupFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
                case AjfNodeType.AjfRepeatingSlide:
                    return AjfNodeSerializer._repeatingSlideFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
                case AjfNodeType.AjfSlide:
                    return AjfNodeSerializer._slideFromJson((/** @type {?} */ (obj)), choicesOrigins, attachmentsOrigins);
            }
            throw new Error(err);
        };
        /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        AjfNodeSerializer._containerNodeFromJson = /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        function (json, choicesOrigins, attachmentsOrigins) {
            json.nodes = (json.nodes ||
                []).map((/**
             * @param {?} n
             * @return {?}
             */
            function (n) { return AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins); }));
            return createContainerNode(json);
        };
        /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        AjfNodeSerializer._fieldFromJson = /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        function (json, choicesOrigins, attachmentsOrigins) {
            if (json.fieldType == null) {
                throw new Error('Malformed field');
            }
            /** @type {?} */
            var obj = (/** @type {?} */ (json));
            if (obj.validation) {
                obj.validation = AjfValidationGroupSerializer.fromJson(obj.validation);
            }
            if (obj.warning) {
                obj.warning = AjfWarningGroupSerializer.fromJson(obj.warning);
            }
            if (json.attachmentsOriginRef) {
                obj.attachmentOrigin =
                    (attachmentsOrigins || []).find((/**
                     * @param {?} a
                     * @return {?}
                     */
                    function (a) { return a.name === json.attachmentsOriginRef; }));
            }
            if (obj.nextSlideCondition) {
                obj.nextSlideCondition = models.AjfConditionSerializer.fromJson(obj.nextSlideCondition);
            }
            /** @type {?} */
            var isCustomFieldWithChoice = obj.fieldType > 100
                && componentsMap[obj.fieldType] != null
                && componentsMap[obj.fieldType].isFieldWithChoice === true;
            if (obj.fieldType > 100) {
                console.log(obj);
                console.log(componentsMap[obj.fieldType]);
            }
            if (isCustomFieldWithChoice) {
                return AjfNodeSerializer._fieldWithChoicesFromJson((/** @type {?} */ (json)), choicesOrigins);
            }
            switch (obj.fieldType) {
                case AjfFieldType.Formula:
                    return AjfNodeSerializer._formulaFieldFromJson((/** @type {?} */ (json)));
                case AjfFieldType.MultipleChoice:
                case AjfFieldType.SingleChoice:
                    return AjfNodeSerializer._fieldWithChoicesFromJson((/** @type {?} */ (json)), choicesOrigins);
            }
            return createField(obj);
        };
        /**
         * @private
         * @param {?} json
         * @return {?}
         */
        AjfNodeSerializer._fieldNodeLinkFromJson = /**
         * @private
         * @param {?} json
         * @return {?}
         */
        function (json) {
            return __assign({}, createNode(json), { nodeType: AjfNodeType.AjfFieldNodeLink });
        };
        /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @return {?}
         */
        AjfNodeSerializer._fieldWithChoicesFromJson = /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @return {?}
         */
        function (json, choicesOrigins) {
            /** @type {?} */
            var err = 'Malformed field with choices';
            if (json.choicesOriginRef == null) {
                throw new Error(err);
            }
            /** @type {?} */
            var choicesOrigin = (choicesOrigins || []).find((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return c.name === json.choicesOriginRef; }));
            if (choicesOrigin == null) {
                throw new Error(err);
            }
            if (json.choicesFilter) {
                json.choicesFilter = models.AjfFormulaSerializer.fromJson(json.choicesFilter);
            }
            if (json.triggerConditions) {
                json.triggerConditions = json.triggerConditions.map((/**
                 * @param {?} t
                 * @return {?}
                 */
                function (t) { return models.AjfConditionSerializer.fromJson(t); }));
            }
            return createFieldWithChoices(__assign({}, json, { choicesOrigin: choicesOrigin }));
        };
        /**
         * @private
         * @param {?} json
         * @return {?}
         */
        AjfNodeSerializer._formulaFieldFromJson = /**
         * @private
         * @param {?} json
         * @return {?}
         */
        function (json) {
            if (json.formula) {
                json.formula = models.AjfFormulaSerializer.fromJson(json.formula);
            }
            return __assign({}, createField(json), { fieldType: AjfFieldType.Formula });
        };
        /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        AjfNodeSerializer._nodeGroupFromJson = /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        function (json, choicesOrigins, attachmentsOrigins) {
            return createNodeGroup(__assign({}, AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins), AjfNodeSerializer._repeatingNodeFromJson(json)));
        };
        /**
         * @private
         * @param {?} json
         * @return {?}
         */
        AjfNodeSerializer._repeatingNodeFromJson = /**
         * @private
         * @param {?} json
         * @return {?}
         */
        function (json) {
            if (json.formulaReps) {
                json.formulaReps = models.AjfFormulaSerializer.fromJson(json.formulaReps);
            }
            return createRepeatingNode(json);
        };
        /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        AjfNodeSerializer._repeatingSlideFromJson = /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        function (json, choicesOrigins, attachmentsOrigins) {
            return createRepeatingSlide(__assign({}, AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins), AjfNodeSerializer._repeatingNodeFromJson(json)));
        };
        /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        AjfNodeSerializer._slideFromJson = /**
         * @private
         * @param {?} json
         * @param {?=} choicesOrigins
         * @param {?=} attachmentsOrigins
         * @return {?}
         */
        function (json, choicesOrigins, attachmentsOrigins) {
            return createSlide(AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins));
        };
        return AjfNodeSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    var AjfFormSerializer = /** @class */ (function () {
        function AjfFormSerializer() {
        }
        /**
         * @param {?} form
         * @param {?=} context
         * @return {?}
         */
        AjfFormSerializer.fromJson = /**
         * @param {?} form
         * @param {?=} context
         * @return {?}
         */
        function (form, context) {
            /** @type {?} */
            var choicesOrigins = (form.choicesOrigins || []).map((/**
             * @param {?} c
             * @return {?}
             */
            function (c) { return AjfChoicesOriginSerializer.fromJson(c); }));
            /** @type {?} */
            var attachmentsOrigins = (form.attachmentsOrigins || []).map((/**
             * @param {?} a
             * @return {?}
             */
            function (a) { return AjfAttachmentsOriginSerializer.fromJson(a); }));
            /** @type {?} */
            var nodes = (/** @type {?} */ ((form.nodes || [])
                .map((/**
             * @param {?} n
             * @return {?}
             */
            function (n) { return AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins); }))));
            return __assign({}, form, { choicesOrigins: choicesOrigins,
                attachmentsOrigins: attachmentsOrigins,
                nodes: nodes, stringIdentifier: form.stringIdentifier || [], initContext: utils.deepCopy(context || {}) });
        };
        return AjfFormSerializer;
    }());

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @enum {number} */
    var AjfAttachmentsType = {
        Link: 0,
        Pdf: 1,
        LENGTH: 2,
    };
    AjfAttachmentsType[AjfAttachmentsType.Link] = 'Link';
    AjfAttachmentsType[AjfAttachmentsType.Pdf] = 'Pdf';
    AjfAttachmentsType[AjfAttachmentsType.LENGTH] = 'LENGTH';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /** @enum {number} */
    var AjfChoicesType = {
        String: 0,
        Number: 1,
        LENGTH: 2,
    };
    AjfChoicesType[AjfChoicesType.String] = 'String';
    AjfChoicesType[AjfChoicesType.Number] = 'Number';
    AjfChoicesType[AjfChoicesType.LENGTH] = 'LENGTH';

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @template T
     * @param {?} origin
     * @return {?}
     */
    function createChoicesFixedOrigin(origin) {
        /** @type {?} */
        var type = 'fixed';
        return __assign({}, createChoicesOrigin(__assign({}, origin, { type: type })), { type: type });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @template T
     * @param {?} origin
     * @return {?}
     */
    function createChoicesFunctionOrigin(origin) {
        return __assign({}, origin, { type: 'function', label: origin.label || '', choices: origin.choices || [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @template T
     * @param {?} origin
     * @return {?}
     */
    function createChoicesObservableArrayOrigin(origin) {
        return __assign({}, origin, { type: 'observableArray', label: origin.label || '', choices: origin.choices || [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @template T
     * @param {?} origin
     * @return {?}
     */
    function createChoicesObservableOrigin(origin) {
        return __assign({}, origin, { type: 'observable', label: origin.label || '', choices: origin.choices || [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @template T
     * @param {?} origin
     * @return {?}
     */
    function createChoicesPromiseOrigin(origin) {
        return __assign({}, origin, { type: 'promise', label: origin.label || '', choices: origin.choices || [] });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} origin
     * @return {?}
     */
    function initChoicesOrigin(origin) {
        if (origin.type === 'fixed') {
            return Promise.resolve();
        }
        if (origin.type === 'function') {
            /** @type {?} */
            var fo = (/** @type {?} */ (origin));
            fo.choices = fo.generator();
            return Promise.resolve();
        }
        if (origin.type === 'promise') {
            /** @type {?} */
            var po_1 = (/** @type {?} */ (origin));
            return po_1.generator.then((/**
             * @param {?} choices
             * @return {?}
             */
            function (choices) { return po_1.choices = choices; })).then();
        }
        if (origin.type === 'observable') {
            /** @type {?} */
            var obso_1 = (/** @type {?} */ (origin));
            if (obso_1.generator != null) {
                obso_1.choices = [];
                return new Promise((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    obso_1.generator.subscribe((/**
                     * @param {?} c
                     * @return {?}
                     */
                    function (c) { return obso_1.choices.push(c); }), (/**
                     * @return {?}
                     */
                    function () { }), (/**
                     * @return {?}
                     */
                    function () { return res(); }));
                }));
            }
        }
        if (origin.type === 'observableArray') {
            /** @type {?} */
            var aoo_1 = (/** @type {?} */ (origin));
            if (aoo_1.generator != null) {
                aoo_1.choices = [];
                return new Promise((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    aoo_1.generator.subscribe((/**
                     * @param {?} choices
                     * @return {?}
                     */
                    function (choices) {
                        aoo_1.choices = choices;
                        res();
                    }));
                }));
            }
        }
        return Promise.resolve();
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?} co
     * @return {?}
     */
    function isChoicesOrigin(co) {
        return co != null
            && typeof co === 'object'
            && co.name != null
            && typeof co.name === 'string'
            && co.label != null
            && typeof co.label === 'string'
            && ['fixed', 'promise', 'observable', 'observableArray', 'function'].indexOf(co.type) > -1
            && co.choices instanceof Array;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} origin
     * @return {?}
     */
    function isChoicesFixedOrigin(origin) {
        return isChoicesOrigin(origin) && origin.type === 'fixed';
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} field
     * @return {?}
     */
    function isNumberField(field) {
        return field.fieldType === AjfFieldType.Number;
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */

    /**
     * @param {?=} form
     * @return {?}
     */
    function createForm(form) {
        if (form === void 0) { form = {}; }
        return {
            nodes: form.nodes || [],
            choicesOrigins: form.choicesOrigins || [],
            attachmentsOrigins: form.attachmentsOrigins || [],
            initContext: form.initContext || {},
            stringIdentifier: form.stringIdentifier || (/** @type {?} */ ([])),
            supplementaryInformations: form.supplementaryInformations,
        };
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} maxValue
     * @return {?}
     */
    function maxDigitsValidation(maxValue) {
        return createValidation({
            condition: "$value ? $value.toString().length >= " + maxValue.toString() + " : false",
            errorMessage: 'Digits count must be >= ' + maxValue.toString()
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} maxValue
     * @return {?}
     */
    function maxValidation(maxValue) {
        return createValidation({
            condition: '$value >= ' + maxValue.toString(),
            errorMessage: 'Value must be >= ' + maxValue.toString()
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} minValue
     * @return {?}
     */
    function minDigitsValidation(minValue) {
        return createValidation({
            condition: "$value ? $value.toString().length >= " + minValue.toString() + " : false",
            errorMessage: 'Digits count must be >= ' + minValue.toString()
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @param {?} minValue
     * @return {?}
     */
    function minValidation(minValue) {
        return createValidation({
            condition: '$value >= ' + minValue.toString(),
            errorMessage: 'Value must be >= ' + minValue.toString()
        });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function notEmptyValidation() {
        return createValidation({ condition: "notEmpty($value)", errorMessage: "Value must not be empty" });
    }

    /**
     * @fileoverview added by tsickle
     * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
     */
    /**
     * @return {?}
     */
    function notEmptyWarning() {
        return createWarning({ condition: 'notEmpty($value)', warningMessage: 'Value must not be empty' });
    }

    exports.AJF_SEARCH_ALERT_THRESHOLD = AJF_SEARCH_ALERT_THRESHOLD;
    exports.AjfAttachmentsOriginSerializer = AjfAttachmentsOriginSerializer;
    exports.AjfAttachmentsType = AjfAttachmentsType;
    exports.AjfBaseFieldComponent = AjfBaseFieldComponent;
    exports.AjfChoicesOriginSerializer = AjfChoicesOriginSerializer;
    exports.AjfChoicesType = AjfChoicesType;
    exports.AjfDateValuePipe = AjfDateValuePipe;
    exports.AjfDateValueStringPipe = AjfDateValueStringPipe;
    exports.AjfFieldHost = AjfFieldHost;
    exports.AjfFieldIconPipe = AjfFieldIconPipe;
    exports.AjfFieldIsValidPipe = AjfFieldIsValidPipe;
    exports.AjfFieldService = AjfFieldService;
    exports.AjfFieldType = AjfFieldType;
    exports.AjfFieldWithChoicesComponent = AjfFieldWithChoicesComponent;
    exports.AjfFormActionEvent = AjfFormActionEvent;
    exports.AjfFormField = AjfFormField;
    exports.AjfFormInitStatus = AjfFormInitStatus;
    exports.AjfFormRenderer = AjfFormRenderer;
    exports.AjfFormRendererService = AjfFormRendererService;
    exports.AjfFormSerializer = AjfFormSerializer;
    exports.AjfFormsModule = AjfFormsModule;
    exports.AjfInputFieldComponent = AjfInputFieldComponent;
    exports.AjfInvalidFieldDefinitionError = AjfInvalidFieldDefinitionError;
    exports.AjfNodeCompleteNamePipe = AjfNodeCompleteNamePipe;
    exports.AjfNodeSerializer = AjfNodeSerializer;
    exports.AjfNodeType = AjfNodeType;
    exports.AjfTableRowClass = AjfTableRowClass;
    exports.AjfTableVisibleColumnsPipe = AjfTableVisibleColumnsPipe;
    exports.AjfValidationGroupSerializer = AjfValidationGroupSerializer;
    exports.AjfValidationService = AjfValidationService;
    exports.AjfWarningGroupSerializer = AjfWarningGroupSerializer;
    exports.createChoicesFixedOrigin = createChoicesFixedOrigin;
    exports.createChoicesFunctionOrigin = createChoicesFunctionOrigin;
    exports.createChoicesObservableArrayOrigin = createChoicesObservableArrayOrigin;
    exports.createChoicesObservableOrigin = createChoicesObservableOrigin;
    exports.createChoicesOrigin = createChoicesOrigin;
    exports.createChoicesPromiseOrigin = createChoicesPromiseOrigin;
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
    exports.ɵa = AjfBoolToIntPipe;
    exports.ɵb = AjfExpandFieldWithChoicesPipe;
    exports.ɵc = AjfIncrementPipe;
    exports.ɵd = AjfIsRepeatingSlideInstancePipe;
    exports.ɵe = AjfRangePipe;
    exports.ɵf = AjfValidSlidePipe;
    exports.ɵg = createNodeGroup;
    exports.ɵh = createRepeatingSlide;
    exports.ɵi = createSlide;
    exports.ɵj = componentsMap;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
//# sourceMappingURL=core-forms.umd.js.map
