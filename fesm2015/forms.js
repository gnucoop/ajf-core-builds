import { __decorate, __rest, __metadata, __param } from 'tslib';
import { Pipe, EventEmitter, Injectable, Directive, ChangeDetectorRef, ViewContainerRef, ViewChild, Input, ComponentFactoryResolver, Output, ViewChildren, QueryList, InjectionToken, Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, NgModule } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Subject, BehaviorSubject, Subscription, Observable, of, from, timer, defer } from 'rxjs';
import { map, withLatestFrom, filter, publishReplay, refCount, startWith, scan, share, switchMap, pairwise, debounceTime, delayWhen } from 'rxjs/operators';
import { deepCopy } from '@ajf/core/utils';
import * as esprima from 'esprima';
import esprima__default from 'esprima';
import { evaluateExpression, alwaysCondition, normalizeExpression, createCondition, createFormula, AjfExpressionUtils, AjfError, AjfConditionSerializer, AjfFormulaSerializer } from '@ajf/core/models';
import { format } from 'date-fns';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { AjfPageSlider } from '@ajf/core/page-slider';
import { AjfCommonModule } from '@ajf/core/common';
import { CommonModule } from '@angular/common';

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
let AjfAsFieldInstancePipe = /** @class */ (() => {
    let AjfAsFieldInstancePipe = class AjfAsFieldInstancePipe {
        transform(instance) {
            return instance;
        }
    };
    AjfAsFieldInstancePipe = __decorate([
        Pipe({ name: 'ajfAsFieldInstance' })
    ], AjfAsFieldInstancePipe);
    return AjfAsFieldInstancePipe;
})();

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
let AjfAsRepeatingSlideInstancePipe = /** @class */ (() => {
    let AjfAsRepeatingSlideInstancePipe = class AjfAsRepeatingSlideInstancePipe {
        transform(instance) {
            return instance;
        }
    };
    AjfAsRepeatingSlideInstancePipe = __decorate([
        Pipe({ name: 'ajfAsRepeatingSlideInstance' })
    ], AjfAsRepeatingSlideInstancePipe);
    return AjfAsRepeatingSlideInstancePipe;
})();

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
// tslint:disable-next-line:prefer-const-enum
var AjfFieldType;
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
    AjfFieldType[AjfFieldType["LENGTH"] = 14] = "LENGTH";
})(AjfFieldType || (AjfFieldType = {}));

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
// tslint:disable-next-line:prefer-const-enum
var AjfNodeType;
(function (AjfNodeType) {
    AjfNodeType[AjfNodeType["AjfField"] = 0] = "AjfField";
    AjfNodeType[AjfNodeType["AjfFieldNodeLink"] = 1] = "AjfFieldNodeLink";
    AjfNodeType[AjfNodeType["AjfNodeGroup"] = 2] = "AjfNodeGroup";
    AjfNodeType[AjfNodeType["AjfSlide"] = 3] = "AjfSlide";
    AjfNodeType[AjfNodeType["AjfRepeatingSlide"] = 4] = "AjfRepeatingSlide";
    AjfNodeType[AjfNodeType["LENGTH"] = 5] = "LENGTH";
})(AjfNodeType || (AjfNodeType = {}));

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
        const fo = origin;
        fo.choices = fo.generator();
        return Promise.resolve();
    }
    if (origin.type === 'promise') {
        const po = origin;
        return po.generator.then(choices => po.choices = choices).then();
    }
    if (origin.type === 'observable') {
        const obso = origin;
        if (obso.generator != null) {
            obso.choices = [];
            return new Promise(res => {
                obso.generator.subscribe(c => obso.choices.push(c), () => { }, () => res());
            });
        }
    }
    if (origin.type === 'observableArray') {
        const aoo = origin;
        if (aoo.generator != null) {
            aoo.choices = [];
            return new Promise(res => {
                aoo.generator.subscribe(choices => {
                    aoo.choices = choices;
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
    return field.fieldType === AjfFieldType.SingleChoice ||
        field.fieldType === AjfFieldType.MultipleChoice;
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
    return node != null && node.nodeType === AjfNodeType.AjfField;
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
    return field.fieldType === AjfFieldType.Table;
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
    const conditionalBranches = instance.conditionalBranches;
    if (conditionalBranches != null) {
        const oldBranch = instance.verifiedBranch;
        let idx = 0;
        let found = false;
        while (idx < conditionalBranches.length && !found) {
            let verified = evaluateExpression(conditionalBranches[idx].condition, context);
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
function updateVisibility(instance, context, branchVisibility = true) {
    if (instance.visibility == null) {
        instance.visible = false;
        return false;
    }
    const visibility = instance.visibility;
    const oldVisibility = instance.visible;
    let newVisibility = branchVisibility && evaluateExpression(visibility.condition, context);
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
    return `__${instance.prefix.join('__')}`;
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
        `${instance.node.name}${nodeInstanceSuffix(instance)}` :
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
    const formula = instance.formula;
    const editable = instance.node.editable;
    if (formula != null && instance.visible && (!editable || (editable && instance.value == null))) {
        let newValue = evaluateExpression(formula.formula, context);
        const oldValue = instance.value;
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
        return evaluateExpression(instance.nextSlideCondition.condition, context);
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
        result: evaluateExpression(validation.condition, context, forceFormula),
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
    let res = [];
    validation.conditions.forEach((cond) => {
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
    const ctx = { '$value': value };
    if (typeof validation.maxDigits === 'number') {
        return {
            result: evaluateExpression(`$value.toString().length <= ${validation.maxDigits}`, ctx),
            error: `Digits count must be <= ${validation.maxDigits}`,
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
    const ctx = { '$value': value };
    if (typeof validation.maxValue === 'number') {
        return {
            result: evaluateExpression(`$value.length <= ${validation.maxValue}`, ctx),
            error: `Value must be <= ${validation.maxValue}`,
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
    const ctx = { '$value': value };
    if (typeof validation.minDigits === 'number') {
        return {
            result: evaluateExpression(`$value.toString().length >= ${validation.minDigits}`, ctx),
            error: `Digits count must be >= ${validation.minDigits}`,
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
    const ctx = { '$value': value };
    if (typeof validation.minValue === 'number') {
        return {
            result: evaluateExpression(`$value.length <= ${validation.minValue}`, ctx),
            error: `Value must be >= ${validation.minValue}`,
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
    const ctx = { '$value': value };
    if (typeof validation.notEmpty === 'boolean') {
        return {
            result: evaluateExpression(`($value != null) === ${validation.notEmpty}`, ctx),
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
    let res = [];
    let ctx = deepCopy(context);
    ctx['$value'] = value;
    res = evaluateValidationConditions(validation, ctx);
    if (validation.maxValue) {
        const maxValue = evaluateValidationMaxValue(validation, value);
        if (maxValue != null) {
            res.push(maxValue);
        }
    }
    if (validation.minValue) {
        const minValue = evaluateValidationMinValue(validation, value);
        if (minValue != null) {
            res.push(minValue);
        }
    }
    if (validation.notEmpty) {
        const notEmpty = evaluateValidationNotEmpty(validation, value);
        if (notEmpty != null) {
            res.push(notEmpty);
        }
    }
    if (validation.maxDigits) {
        const maxDigits = evaluateValidationMaxDigits(validation, value);
        if (maxDigits != null) {
            res.push(maxDigits);
        }
    }
    if (validation.minDigits) {
        const minDigits = evaluateValidationMinDigits(validation, value);
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
    const validation = instance.validation;
    if (validation == null) {
        instance.valid = true;
        return;
    }
    if (supplementaryInformations) {
        Object.keys(supplementaryInformations).forEach((key) => {
            context[`__supplementary__${key}__`] = supplementaryInformations[key];
        });
    }
    const completeName = nodeInstanceCompleteName(instance);
    if (context[completeName] != null && validation && validation.forceValue) {
        instance.value = evaluateExpression(validation.forceValue.condition, context);
        context[completeName] = instance.value;
        context.$value = instance.value;
    }
    instance.validationResults = evaluateValidationGroup(validation, context[completeName], context);
    instance.valid = instance.validationResults.reduce((prev, x) => prev && x.result, true);
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
        result: evaluateExpression(warning.condition, context, forceFormula),
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
    return warning.conditions.map(cond => evaluateWarning(cond, context));
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
    const warning = instance.warning;
    if (warning == null) {
        return;
    }
    const completeName = nodeInstanceCompleteName(instance);
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
function updateFieldInstanceState(instance, context, branchVisibility = true) {
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
        instance.filteredChoices = instance.node.choicesOrigin.choices.filter(c => {
            context.$choice = c;
            context.$choiceValue = c.value;
            return evaluateExpression(instance.choicesFilter.formula, context);
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
    const completeName = nodeInstanceCompleteName(instance);
    if (instance.firstTriggerConditionDone[completeName]) {
        return false;
    }
    let found = false;
    const conditionsNum = instance.triggerConditions.length;
    for (let i = 0; i < conditionsNum; i++) {
        if (evaluateExpression(instance.triggerConditions[i].condition, context)) {
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
    const conditionalBranches = node.conditionalBranches != null && node.conditionalBranches.length > 0 ?
        node.conditionalBranches :
        [alwaysCondition()];
    return Object.assign(Object.assign({}, node), { parentNode: node.parentNode != null ? node.parentNode : 0, label: node.label || '', visibility: node.visibility || alwaysCondition(), conditionalBranches });
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
    const node = createNode(Object.assign(Object.assign({}, field), { nodeType: AjfNodeType.AjfField }));
    const editable = field.editable != null ?
        field.editable :
        field.fieldType !== AjfFieldType.Formula && field.fieldType !== AjfFieldType.Table;
    return Object.assign(Object.assign(Object.assign({}, node), field), { nodeType: AjfNodeType.AjfField, editable, defaultValue: field.defaultValue != null ? field.defaultValue : null, size: field.size || 'normal' });
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
const componentsMap = {};

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
        (node.nodeType === AjfNodeType.AjfRepeatingSlide || node.nodeType === AjfNodeType.AjfSlide);
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
    return node != null && (node.nodeType === AjfNodeType.AjfNodeGroup || isSlidesNode(node));
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
function flattenNodesInstances(nodes, includeGroups = false) {
    let flatNodes = [];
    nodes.forEach((nodeInstance) => {
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
    let flatTree = [];
    nodes.forEach((nodeInstance) => {
        if (isSlidesInstance(nodeInstance)) {
            const ni = nodeInstance;
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
    return node != null && node.nodeType === AjfNodeType.AjfNodeGroup;
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
    return node != null && node.nodeType === AjfNodeType.AjfSlide;
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
        prefix: instance.prefix ? [...instance.prefix] : [],
        visible: instance.visible != null ? instance.visible : true,
        conditionalBranches: [],
        updatedEvt: new EventEmitter()
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
    const nodeInstance = createNodeInstance(instance);
    let value = null;
    if (nodeInstance.node != null && context != null) {
        const completeName = nodeInstanceCompleteName(nodeInstance);
        if (context[nodeInstance.node.name] != null) {
            value = context[nodeInstance.node.name];
        }
        else if (context[completeName] != null) {
            value = context[completeName];
        }
    }
    return Object.assign(Object.assign({}, nodeInstance), { node: instance.node, value, valid: false, defaultValue: instance.defaultValue != null ? instance.defaultValue : null, validationResults: instance.validationResults || [], warningResults: instance.warningResults || [], warningTrigger: new EventEmitter() });
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
    const fieldInstance = createFieldInstance(instance, context);
    return Object.assign(Object.assign({}, fieldInstance), { node: instance.node, filteredChoices: [...instance.node.choices], firstTriggerConditionDone: {}, selectionTrigger: new EventEmitter() });
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
    node.rows.forEach((row, rowIdx) => {
        row.forEach((elem, elemIdx) => {
            if (typeof elem === 'string') {
                node.rows[rowIdx][elemIdx] = { formula: elem, editable: node.editable };
            }
        });
    });
}
function createTableFieldInstance(instance, context) {
    normalizeRows(instance.node);
    const fieldInstance = createFieldInstance(instance, context);
    return Object.assign(Object.assign({}, fieldInstance), { node: instance.node, context, hideEmptyRows: instance.hideEmptyRows || false, controls: [] });
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
    const nodeInstance = createNodeInstance(instance);
    return Object.assign(Object.assign({}, nodeInstance), { node: instance.node, formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
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
    const nodeInstance = createNodeInstance(instance);
    return Object.assign(Object.assign({}, nodeInstance), { node: instance.node, nodes: [], slideNodes: [], flatNodes: [], valid: false, position: 0 });
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
    const { node } = instance, slideInstanceCreate = __rest(instance, ["node"]);
    const { nodeType } = node, slideNode = __rest(node, ["nodeType"]);
    const slideInstance = createSlideInstance(Object.assign(Object.assign({}, slideInstanceCreate), { node: Object.assign({ nodeType: AjfNodeType.AjfSlide }, slideNode) }));
    return Object.assign(Object.assign({}, slideInstance), { node: instance.node, slideNodes: [], formulaReps: instance.formulaReps, reps: 0, nodes: [], flatNodes: [] });
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
    return Object.assign(Object.assign({}, group), { conditions: group.conditions || [] });
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
    return Object.assign(Object.assign({}, group), { conditions: group.conditions || [] });
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
        (node.nodeType === AjfNodeType.AjfNodeGroup ||
            node.nodeType === AjfNodeType.AjfRepeatingSlide);
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
    let nodeGroups = [];
    let curParent = node.parent;
    while (curParent != null) {
        const curNode = allNodes.map((n) => n.node || n)
            .find(n => n.id == curParent);
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
    let names = {};
    const nodeGroups = getAncestorRepeatingNodes(allNodes, node);
    nodeGroups.forEach((n, idx) => (n.nodes || []).forEach((sn) => {
        if (isField(sn)) {
            names[sn.name] = idx;
        }
    }));
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
    const oldCondition = condition.condition;
    let newCondition = normalizeExpression(oldCondition, ancestorsNames, prefix);
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
    let changed = false;
    const newConditions = conditions.map((condition) => {
        const newCondition = getInstanceCondition(condition, ancestorsNames, prefix);
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
    const oldFormula = formula.formula;
    let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
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
    return Object.assign(Object.assign({}, validation), { clientValidation: validation.clientValidation || false, errorMessage: validation.errorMessage || 'Undefined Error' });
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
    const oldValidation = validation.condition;
    let newValidation = normalizeExpression(oldValidation, ancestorsNames, prefix);
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
    let changed = false;
    const newValidations = validations.map((validation) => {
        const newValidation = getInstanceValidation(validation, ancestorsNames, prefix);
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
    return Object.assign(Object.assign({}, warning), { warningMessage: warning.warningMessage || 'Undefined Warning' });
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
    const oldWarning = warning.condition;
    let newWarning = normalizeExpression(oldWarning, ancestorsNames, prefix);
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
    let changed = false;
    const newWarnings = warnings.map((warning) => {
        const newWarning = getInstanceWarning(warning, ancestorsNames, prefix);
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
    return node != null && node.nodeType === AjfNodeType.AjfRepeatingSlide;
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
    let instance = null;
    const nodeType = node.nodeType;
    switch (nodeType) {
        case AjfNodeType.AjfField:
            const field = node;
            if (field.fieldType > 100) {
                if (componentsMap[field.fieldType] != null &&
                    componentsMap[field.fieldType].createInstance != null) {
                    instance = componentsMap[field.fieldType].createInstance({ node: node, prefix }, context);
                }
                else {
                    instance = createFieldInstance({ node: node, prefix }, context);
                }
            }
            else {
                switch (field.fieldType) {
                    case AjfFieldType.SingleChoice:
                    case AjfFieldType.MultipleChoice:
                        instance = createFieldWithChoicesInstance({ node: node, prefix }, context);
                        break;
                    case AjfFieldType.Table:
                        instance = createTableFieldInstance({ node: node, prefix }, context);
                        break;
                    default:
                        instance = createFieldInstance({ node: node, prefix }, context);
                        break;
                }
            }
            break;
        case AjfNodeType.AjfNodeGroup:
            instance = createNodeGroupInstance({ node: node, prefix });
            break;
        case AjfNodeType.AjfRepeatingSlide:
            instance = createRepeatingSlideInstance({ node: node, prefix });
            break;
        case AjfNodeType.AjfSlide:
            instance = createSlideInstance({ node: node, prefix });
            break;
    }
    if (instance != null) {
        const hasPrefix = prefix != null && prefix.length > 0;
        if (hasPrefix) {
            const ancestorsNames = getAncestorRepeatingNodesNames(allNodes, node);
            if (node.visibility != null) {
                const oldVisibility = node.visibility.condition;
                const newVisibility = normalizeExpression(oldVisibility, ancestorsNames, prefix);
                instance.visibility = newVisibility !== oldVisibility ?
                    createCondition({ condition: newVisibility }) :
                    node.visibility;
            }
            const conditionalBranches = instance.node.conditionalBranches != null &&
                instance.node.conditionalBranches.length > 0 ?
                instance.node.conditionalBranches :
                [alwaysCondition()];
            instance.conditionalBranches =
                getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
            if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                const ngInstance = instance;
                const formulaReps = ngInstance.node.formulaReps;
                if (formulaReps != null) {
                    const oldFormula = formulaReps.formula;
                    let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
                    ngInstance.formulaReps =
                        newFormula !== oldFormula ? createFormula({ formula: newFormula }) : formulaReps;
                }
            }
            else if (nodeType === AjfNodeType.AjfField) {
                const fInstance = instance;
                const fNode = fInstance.node;
                if (fNode.formula) {
                    fInstance.formula = getInstanceFormula(fNode.formula, ancestorsNames, prefix);
                }
                if (fNode.validation != null) {
                    const newConditions = getInstanceValidations(fNode.validation.conditions, ancestorsNames, prefix);
                    if (newConditions !== fNode.validation.conditions) {
                        fInstance.validation = createValidationGroup(fNode.validation);
                        fInstance.validation.conditions = newConditions;
                    }
                    else {
                        fInstance.validation = fNode.validation;
                    }
                }
                if (fNode.warning != null) {
                    const newWarnings = getInstanceWarnings(fNode.warning.conditions, ancestorsNames, prefix);
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
                    const fwcInstance = instance;
                    const fwcNode = fwcInstance.node;
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
            const conditionalBranches = instance.node.conditionalBranches != null &&
                instance.node.conditionalBranches.length > 0 ?
                instance.node.conditionalBranches :
                [alwaysCondition()];
            instance.conditionalBranches = conditionalBranches;
            if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                const rgInstance = instance;
                rgInstance.formulaReps = rgInstance.node.formulaReps;
            }
            else if (isFieldInstance(instance)) {
                const fInstance = instance;
                fInstance.validation = fInstance.node.validation;
                fInstance.warning = fInstance.node.warning;
                fInstance.nextSlideCondition = fInstance.node.nextSlideCondition;
                if (isFieldWithChoicesInstance(instance)) {
                    const fwcInstance = instance;
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
    let flatNodes = [];
    nodes.forEach((node) => {
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
    let newNodes = [];
    nodes
        .filter((n) => parent != null ? n.parent == parent : n.parent == null || n.parent === 0)
        .sort((n1, n2) => n1.parentNode - n2.parentNode)
        .forEach((n) => {
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
    const oldReps = instance.reps || 0;
    context = context || {};
    if (instance.node.formulaReps == null) {
        const ctxReps = context[nodeInstanceCompleteName(instance)];
        if (ctxReps != null) {
            instance.reps = ctxReps;
        }
        else if (oldReps == 0) {
            instance.reps = 1;
        }
    }
    else {
        let newReps = evaluateExpression(instance.node.formulaReps.formula, context);
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
        .map(n => {
        if (n.visible && Object.keys(n).indexOf('valid') > -1) {
            return n.valid;
        }
        return true;
    })
        .reduce((v1, v2) => v1 && v2, true);
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
let AjfValidationService = /** @class */ (() => {
    let AjfValidationService = class AjfValidationService {
        constructor() {
            this._baseUtilFunctions = [
                `/**
        * count the number of digit contained on x.
        * @param  x the value used for digit count
        * @return the count of the digit
      */
    var digitCount = function(x) { return x.toString().length; }`,
                `/**
        * count the number of decimal contained on x.
        * @param  x the value used for decimal count
        * @return the count of the decimal
      */
    var decimalCount = function(x) {
      return (parseFloat(x).toString().split('.')[1] || []).length;
    }`,
                `/**
        * check if x is integer
        * @param  x the value used for check
        * @return true if x is a number
      */
    var isInt = function(x) { return !/[,.]/.test(x); }`,
                `/**
        * check if x is not empity
        * @param  x the value used for check
        * @return true if x defined and not null and the number of digit is > 0
      */
    var notEmpty = function (x) {
      return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);
    }`,
                `/**
        * check if x is contained on array
        * @param  x the value used for check
        * @return the position of x on array or if array === x
      */
    var valueInChoice = function(array, x) { return array.indexOf(x) > -1 || array === x; }`,
                `var scanGroupField = function(reps, acc, callback) {
        for (var i = 0; i < reps; i++) {
            acc = callback(acc, i);
        }
        return acc;
    }`,
                `/**
        * sum the value contained on array
        * @param  x the array
        * @return the sum
      */
    var sum = function(array) {return array.reduce(function(a, b){ return a + b; }, 0); }`,
                `var dateOperations = function(dString, period, operation, v) {
        fmt = 'mm/dd/yyyy';
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
            return -1;
        }
        return dateUtils.format(dateOp(d, v), fmt);
      }`,
                `/**
        * round the num
        * @param  num the value to round
        * @param  digits how many digit
        * @return num rounded
      */
      var round = function(num, digits) {
        digits = digits || 0;
        var f = 0;
        try { f = parseFloat(num); } catch (e) { }
        var m = Math.pow(10, digits);
        return Math.round(f * m) / m;
      }`,
                `/**
        * extract the property of the source object with property != null
        * @param  source array of object wich contains property
        * @param  property the property on wich we want filter
        * @return array of dates
      */
      var extractArray = function(source, property, property2) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        for (var i = 0; i < l ; i++) {
          if (source[i][property] != null && source[i][property2] != null) {
            res.push(source[i][property] + source[i][property2]);
          }
          else if (source[i][property] != null) {
            res.push(source[i][property]);
          }
        }
        return res;
      }`,
                `/**
        * extract the property of the source object with property != null
        * @param  source array of object wich contains property
        * @param  propertues string array the properties to sum
        * @return the sum
      */
      var extractSum = function(source, properties) {
        var sum = 0;
        properties = (properties || []).slice(0);
        var l = properties.length;

        for (var i = 0; i < l ; i++) {
          var array = extractArray(source, properties[i]);
          var leng = array.length;
          for(var j = 0; j < leng; i++) {
            sum += array[j];
          }
        }
        return sum;
      }`,
                `/**
        * extract the array of sum for each week != null
        * @param  source array of object wich contains property
        * @param  propertues string array the properties to sum
        * @return the sum
      */
      var extractArraySum = function(source, properties) {
        var arrays = [];
        properties = (properties || []).slice(0);

        for (var propI = 0; propI < properties.length ; propI++) {
          var array = extractArray(source, properties[propI]);
          arrays.push(array);
        }

        var res = [];
        for (var weekI = 0; weekI < array.length; weekI ++ ) {
          var sum = 0;
          for (var propI = 0; propI < properties.length ; propI++) {
            sum = sum + arrays[propI][weekI]
          }
          res.push(sum);
        }
        return res;
      }`,
                `/**
        * draw a threshold line on chart related to the property
        * @param  source array of object wich contains property
        * @param  property the property on wich we want filter
        * @return array of dates
      */
      var drawThreshold = function(source, property, threshold) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        for (var i = 0; i < l ; i++) {
          if (source[i][property] != null) {
            res.push(threshold);
          }
        }
        return res;
      }`,
                `/**
        * extract the dates of the source object with property != null
        * @param  source array of object wich contains property and date_start
        * @param  property the property on wich we want to calculate dates
        * @param  format the format of the date
        * @return array of dates
      */
      var extractDates = function(source, property, format) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        var prefix = '';
        for (var i = 0; i < l ; i++) {
          if (source[i][property] != null) {
            switch(format) {
              case "WW":
                prefix = "W";
                break;
              case "mm":
                prefix = "M";
                break;
              default:
                prefix = "";
            }
            res.push(prefix + formatDate(source[i]["date_start"], format));
          }
        }
        return res;
      }`,
                `/**
        * extract the last property contains in source != null
        * @param  source array of object wich contains property and date_start
        * @param  property the property to find
        * @return the last property != null
      */
      var lastProperty = function(source, property) {
        source = (source || []).slice(0);
        var l = source.length -1;

        while (l >= 0 && source[l][property] == null) {
          l--;
          if (l < 0) return 0;
        }
        return l >= 0 ? source[l][property] : 0;
      }`,
                `var sumLastProperties = function(source, properties) {
        source = (source || []).slice(0);
        var sum = 0;
        for (var i = 0; i < properties.length; i++) {
          sum += lastProperty(source, properties[i]);
        }

        return sum;
      }`,
                `/**
        * compute the trend of the property contained on the source.
        * @param  source array of object wich contains property
        * @param  property the property on wich we want to calculate the trend
        * @return an html icon that identifies the trend
      */
      var calculateTrendProperty = function(source, property) {
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
        } else {
          while (source[lastLast][property] == null) {
            if (lastLast == 0) {
              lastLast = last;
              break;
            }
            lastLast--;
          }
        }

        var lastProperty = source[last]?(source[last][property] || 0): 0;
        var lastLastProperty = source[lastLast]?(source[lastLast][property] || 0): 0;

        if (lastProperty == lastLastProperty) {
          return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
        } else if (lastProperty > lastLastProperty) {
          return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
        } else {
          return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
        }
      }`,
                `/**
        * compute the average value of the property contained on the source.
        * @param  source array of object wich contains property
        * @param  property the property on wich we want to calculate the average
        * @param  range the range on wich we want to calculate the average
        * @param  coefficent the coefficent used for calculate the threshold
                  if coefficent is 0 mean return the count of property > 0
        * @return the average value || the count of property > 0
      */
      var calculateAvgProperty = function(source, property, range, coefficient) {
        source = (source || []).slice(0);

        source.pop();

        coefficient = coefficient || 1;
        range = range || 12;

        var l = source.length;
        var res = 0;
        var counter = 0;
        var noZero = 0;

        if(l < range) {
          range = l;
        }

        while (range != 0) {
          counter++;
          if (source[l - 1][property] != null) {
            res += source[l - 1][property];

            if (source[l - 1][property] > 0) {
              noZero++;
            }
          }
          l--;
          range--;
        }

        if (coefficient == 0) {
          return noZero;
        } else {
          var threshold = (res/counter)*coefficient || 0;
          return threshold;
        }
      }`,
                `var alert = function(source, property, threshold, fmt) {
        source = (source || []).slice(0);
        var l = source.length;

        if ( lastProperty(source, property)  > threshold ) {
          return '<p><i class="material-icons" style="color:red">warning</i></p>';
          } else {
            return '<p></p>';
          }
      }`,
                `var formatNumber = function(num, fmt) {
        fmt = fmt || '0,0[.]0';
        return numeral(num).format(fmt);
      }`,
                `var formatDate = function(date, fmt) {
        fmt = fmt || 'mm-dd-yyyy';
        return dateUtils.format(date, fmt);
      }`,
                `var isoMonth = function(date, fmt) {
        fmt = fmt || 'mm';
        var du = dateUtils;
        return du.format(du.addDays(du.startOfMonth(date), 4),fmt)
      }`,
                `var nextCounterValue = function(counterName, firstValue) {
        firstValue = firstValue != null ? firstValue : 0;
        if (execContext['$$'+counterName] == null) {
          execContext['$$'+counterName] = firstValue;
        } else {
          execContext['$$'+counterName]++;
        }
        return execContext['$$'+counterName];
      }`,
                `var getCoordinate = function(source, zoom) {
        zoom = zoom || 6;
        if(source == null) {
          return [51.505,-0.09, zoom];
        } else {
          return [source[0], source[1], zoom];
        }
      }`
            ];
            this._functions = [];
            this._functionsStr = '';
            this._initFunctions();
        }
        addFunction(f) {
            this._functions.push(f);
            this._initFunctions();
        }
        addFunctionHandler(name, fn) {
            if (AjfExpressionUtils.utils[name] === undefined) {
                AjfExpressionUtils.utils[name] = { fn };
            }
        }
        _initFunctions() {
            const functionsStr = this._functions.map(f => typeof f === 'string' ? f : f.toString()).join('; ');
            this._functionsStr = `${this._baseUtilFunctions.join('; ')}; ${functionsStr}`;
            AjfExpressionUtils.UTIL_FUNCTIONS = this._functionsStr;
        }
    };
    AjfValidationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], AjfValidationService);
    return AjfValidationService;
})();

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
const esprimaMod = esprima__default || esprima;
const { tokenize } = esprimaMod;
let AjfFormRendererService = /** @class */ (() => {
    let AjfFormRendererService = class AjfFormRendererService {
        constructor(_) {
            this._visibilityNodesMapUpdates = new Subject();
            this._repetitionNodesMapUpdates = new Subject();
            this._conditionalBranchNodesMapUpdates = new Subject();
            this._formulaNodesMapUpdates = new Subject();
            this._validationNodesMapUpdates = new Subject();
            this._warningNodesMapUpdates = new Subject();
            this._filteredChoicesNodesMapUpdates = new Subject();
            this._triggerConditionsNodesMapUpdates = new Subject();
            this._nextSlideConditionsNodesMapUpdates = new Subject();
            this._formInitEvent = new EventEmitter();
            this.formInitEvent = this._formInitEvent.asObservable();
            this._formGroup = new BehaviorSubject(null);
            this.formGroup = this._formGroup.asObservable();
            this._form = new BehaviorSubject(null);
            this._nodesUpdates = new Subject();
            this._formGroupSubscription = Subscription.EMPTY;
            this._valueChanged = new Subject();
            this._nextSlideTrigger = new EventEmitter();
            this.nextSlideTrigger = this._nextSlideTrigger.asObservable();
            this._slidesNum = new BehaviorSubject(0);
            this.slidesNum = this._slidesNum.asObservable();
            this._initUpdateMapStreams();
            this._initNodesStreams();
            this._initErrorsStreams();
            this._initFormStreams();
            this._updateFormValueAndValidity();
        }
        get nodesTree() {
            return this._flatNodesTree;
        }
        get errorPositions() {
            return this._errorPositions;
        }
        get errors() {
            return this._errors;
        }
        get currentSupplementaryInformations() {
            const form = this._form.getValue();
            return form != null && form.form != null ? form.form.supplementaryInformations : null;
        }
        setForm(form, context = {}) {
            this._initUpdateMapStreams();
            if (form != null && Object.keys(context).length === 0 &&
                Object.keys(form.initContext || {}).length > 0) {
                context = form.initContext || {};
            }
            const currentForm = this._form.getValue();
            if ((currentForm == null && form != null) ||
                (currentForm != null && form !== currentForm.form)) {
                this._form.next({ form: form, context: context });
            }
        }
        getFormValue() {
            const formGroup = this._formGroup.getValue();
            if (formGroup == null) {
                return {};
            }
            let res = deepCopy(formGroup.value);
            return res;
        }
        addGroup(group) {
            return new Observable((subscriber) => {
                if (group.formulaReps != null) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                const maxReps = group.node.maxReps;
                if (maxReps > 0 && group.reps + 1 > maxReps) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                const oldReps = group.reps;
                group.reps = group.reps + 1;
                group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
                group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
                this._nodesUpdates.next((nodes) => {
                    const flatNodes = flattenNodesInstances(nodes, true);
                    this._adjustReps(flatNodes, group, oldReps, this.getFormValue());
                    subscriber.next(true);
                    subscriber.complete();
                    return nodes;
                });
            });
        }
        removeGroup(group) {
            return new Observable((subscriber) => {
                if (group.formulaReps != null) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                const minReps = group.node.minReps;
                if (group.reps - 1 < minReps) {
                    subscriber.next(false);
                    subscriber.complete();
                    return;
                }
                const oldReps = group.reps;
                group.reps = group.reps - 1;
                group.canAdd = group.node.maxReps === 0 || group.reps < group.node.maxReps;
                group.canRemove = group.node.minReps === 0 || group.reps > group.node.minReps;
                this._nodesUpdates.next((nodes) => {
                    this._adjustReps(nodes, group, oldReps, this.getFormValue());
                    subscriber.next(true);
                    subscriber.complete();
                    return nodes;
                });
            });
        }
        getControl(field) {
            return this.formGroup.pipe(map((f) => {
                const fieldName = nodeInstanceCompleteName(field);
                return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
            }));
        }
        _initErrorsStreams() {
            this._errorPositions = this._valueChanged.pipe(withLatestFrom(this._nodes, this._form), filter(v => v[2] != null && v[2].form != null), map((v) => {
                const nodes = v[1];
                const form = v[2].form;
                let currentPosition = 0;
                const errors = [];
                nodes.forEach((node) => {
                    if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                        const rsNode = node;
                        for (let i = 0; i < rsNode.reps; i++) {
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
                        const sNode = node;
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
                this._slidesNum.next(currentPosition);
                return errors;
            }), publishReplay(), refCount());
            this._errors = this._errorPositions.pipe(map(e => e != null ? e.length : 0), startWith(0), publishReplay(), refCount());
        }
        _initUpdateMapStreams() {
            this._visibilityNodesMap =
                this._visibilityNodesMapUpdates
                    .pipe(scan((rmap, op) => {
                    return op(rmap);
                }, {}), startWith({}), share());
            this._repetitionNodesMap =
                this._repetitionNodesMapUpdates
                    .pipe(scan((rmap, op) => {
                    return op(rmap);
                }, {}), startWith({}), share());
            this._conditionalBranchNodesMap =
                this._conditionalBranchNodesMapUpdates
                    .pipe(scan((rmap, op) => {
                    return op(rmap);
                }, {}), startWith({}), share());
            this._formulaNodesMap =
                this._formulaNodesMapUpdates
                    .pipe(scan((rmap, op) => {
                    return op(rmap);
                }, {}), startWith({}), share());
            this._validationNodesMap =
                this._validationNodesMapUpdates
                    .pipe(scan((rmap, op) => {
                    return op(rmap);
                }, {}), startWith({}), share());
            this._warningNodesMap =
                this._warningNodesMapUpdates
                    .pipe(scan((rmap, op) => {
                    return op(rmap);
                }, {}), startWith({}), share());
            this._filteredChoicesNodesMap =
                this._filteredChoicesNodesMapUpdates
                    .pipe(scan((rmap, op) => {
                    return op(rmap);
                }, {}), startWith({}), share());
            this._triggerConditionsNodesMap =
                this._triggerConditionsNodesMapUpdates
                    .pipe(scan((rmap, op) => {
                    return op(rmap);
                }, {}), startWith({}), share());
            this._nextSlideConditionsNodesMap =
                this._nextSlideConditionsNodesMapUpdates
                    .pipe(scan((rmap, op) => {
                    return op(rmap);
                }, {}), startWith({}), share());
            this._nodesMaps = [
                this._visibilityNodesMap, this._repetitionNodesMap, this._conditionalBranchNodesMap,
                this._formulaNodesMap, this._validationNodesMap, this._warningNodesMap,
                this._nextSlideConditionsNodesMap, this._filteredChoicesNodesMap,
                this._triggerConditionsNodesMap
            ];
        }
        _initFormStreams() {
            const formObs = this._form;
            formObs
                .pipe(map((_form) => {
                return this._initFormGroupStreams(new FormGroup({}));
            }))
                .subscribe(this._formGroup);
            formObs
                .pipe(switchMap(form => {
                if (form == null || form.form == null) {
                    return of(form);
                }
                const choicesOrigins = form.form.choicesOrigins || [];
                if (choicesOrigins.length === 0) {
                    return of(form);
                }
                return from(Promise.all(choicesOrigins.map(co => initChoicesOrigin(co))))
                    .pipe(map(() => form));
            }), map((form) => {
                return (_nodesInstances) => {
                    const nodes = form != null && form.form != null ?
                        this._orderedNodesInstancesTree(flattenNodes(form.form.nodes), form.form.nodes, undefined, [], form.context || {}) :
                        [];
                    let currentPosition = 0;
                    nodes.forEach((node) => {
                        if (node.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                            const rsNode = node;
                            for (let i = 0; i < rsNode.reps; i++) {
                                if (node.visible) {
                                    currentPosition++;
                                    if (i == 0) {
                                        rsNode.position = currentPosition;
                                    }
                                }
                            }
                        }
                        else if (node.node.nodeType === AjfNodeType.AjfSlide) {
                            const sNode = node;
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
        }
        _initNodeInstance(allNodes, node, prefix, context, branchVisibility = true) {
            let instance = nodeToNodeInstance(allNodes, node, prefix, context);
            if (instance != null) {
                const nodeType = instance.node.nodeType;
                if (nodeType === AjfNodeType.AjfNodeGroup || nodeType === AjfNodeType.AjfRepeatingSlide) {
                    this._explodeRepeatingNode(allNodes, instance, context);
                }
                else if (nodeType === AjfNodeType.AjfSlide) {
                    const sInstance = instance;
                    sInstance.nodes = this._orderedNodesInstancesTree(allNodes, sInstance.node.nodes, sInstance.node.id, prefix, context);
                }
                updateVisibility(instance, context, branchVisibility);
                updateConditionalBranches(instance, context);
                if (nodeType === AjfNodeType.AjfField) {
                    const fInstance = instance;
                    if (isCustomFieldWithChoices(fInstance.node) || isFieldWithChoices(fInstance.node)) {
                        updateFilteredChoices(fInstance, context);
                    }
                    else {
                        if (isTableFieldInstance(fInstance)) {
                            const tfInstance = fInstance;
                            const tNode = tfInstance.node;
                            tfInstance.context = context[nodeInstanceCompleteName(tfInstance)] || context;
                            const formGroup = this._formGroup.getValue();
                            let controlsWithLabels = [];
                            controlsWithLabels.push([node.label, tNode.columnLabels]);
                            if (formGroup != null) {
                                tNode.rows.forEach((row, rowIdx) => {
                                    let r = [];
                                    row.forEach((cell, idx) => {
                                        /*
                                        every control is registered with the cell position
                                        inside the form control matrix
                                        with this mask `${tNode.name}__${rowIdx}__${idx}`
                                        */
                                        const name = `${tNode.name}__${rowIdx}__${idx}`;
                                        const tableFormControl = { control: new FormControl(), show: false };
                                        tableFormControl.control.setValue(tfInstance.context[cell.formula]);
                                        formGroup.registerControl(name, tableFormControl.control);
                                        r.push(tableFormControl);
                                        /* create a object that respect the instance interface
                                        with the minimum defined properties to allow to run addToNodeFormula map*/
                                        const fakeInstance = {
                                            formula: { formula: cell.formula },
                                            node: { name, nodeType: 0, editable: false },
                                            visible: true,
                                            prefix: [],
                                            conditionalBranches: [],
                                            updatedEvt: new EventEmitter()
                                        };
                                        this._addToNodesFormulaMap(fakeInstance, cell.formula);
                                    });
                                    controlsWithLabels.push([tNode.rowLabels[rowIdx], r]);
                                });
                                tfInstance.controls = controlsWithLabels;
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
        }
        _adjustReps(allNodes, instance, oldReps, context) {
            const newReps = instance.reps;
            const result = { added: null, removed: null };
            if (oldReps < newReps) {
                const newNodes = [];
                if (instance.nodes == null) {
                    instance.nodes = [];
                }
                if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                    const node = createField({
                        id: 999,
                        name: '',
                        parent: -1,
                        fieldType: AjfFieldType.Empty,
                        label: instance.node.label
                    });
                    const newInstance = this._initNodeInstance(allNodes, node, instance.prefix.slice(0), context);
                    if (newInstance != null) {
                        instance.nodes.push(newInstance);
                    }
                }
                for (let i = oldReps; i < newReps; i++) {
                    const prefix = instance.prefix.slice(0);
                    const group = instance.node;
                    prefix.push(i);
                    orderedNodes(group.nodes, instance.node.id).forEach((n) => {
                        const newInstance = this._initNodeInstance(allNodes, n, prefix, context);
                        if (newInstance != null) {
                            newNodes.push(newInstance);
                            instance.nodes.push(newInstance);
                        }
                    });
                    this._addNodeInstance(instance);
                }
                result.added = newNodes;
            }
            else if (oldReps > newReps) {
                let nodesNum = instance.nodes.length / oldReps;
                if (instance.node.nodeType === AjfNodeType.AjfNodeGroup) {
                    nodesNum++;
                }
                result.removed = instance.nodes.splice(newReps * nodesNum, nodesNum);
                result.removed.forEach((n => {
                    this._removeNodeInstance(n);
                }));
            }
            if (oldReps != newReps && instance.formulaReps == null) {
                const fg = this._formGroup.getValue();
                const completeName = nodeInstanceCompleteName(instance);
                if (fg != null && fg.contains(completeName)) {
                    fg.controls[completeName].setValue(instance.reps);
                }
            }
            instance.flatNodes = flattenNodesInstances(instance.nodes);
            if (instance.node.nodeType === AjfNodeType.AjfRepeatingSlide) {
                const rsInstance = instance;
                const slideNodes = [];
                const nodesPerSlide = rsInstance.nodes != null ? rsInstance.nodes.length / rsInstance.reps : 0;
                for (let i = 0; i < instance.reps; i++) {
                    const startNode = i * nodesPerSlide;
                    slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
                }
                rsInstance.slideNodes = slideNodes;
            }
            return result;
        }
        _updateFormValueAndValidity() {
            this._nodesUpdates.asObservable()
                .pipe(withLatestFrom(this._formGroup), filter((values) => values[1] !== null))
                .subscribe((values) => {
                const form = values[1];
                form.updateValueAndValidity();
            });
        }
        _explodeRepeatingNode(allNodes, instance, context) {
            const oldReps = updateRepsNum(instance, context);
            if (oldReps !== instance.reps) {
                this._adjustReps(allNodes, instance, oldReps, context);
            }
        }
        _orderedNodesInstancesTree(allNodes, nodes, parent = null, prefix = [], context) {
            let nodesInstances = [];
            const curSuffix = prefix.length > 0 ? '__' + prefix.join('__') : '';
            orderedNodes(nodes, parent).forEach((node) => {
                const parentNodeInstance = nodesInstances.find(ni => ni.node.id == node.parent && nodeInstanceSuffix(ni) == curSuffix);
                const branchVisibility = parentNodeInstance != null ?
                    parentNodeInstance.verifiedBranch != null &&
                        parentNodeInstance.verifiedBranch == node.parentNode :
                    true;
                const nni = this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
                if (nni != null) {
                    nodesInstances.push(nni);
                }
            });
            return nodesInstances;
        }
        _formValueDelta(oldValue, newValue) {
            return Object.keys(newValue).filter((k) => oldValue[k] !== newValue[k]);
        }
        _initFormGroupStreams(formGroup) {
            this._formGroupSubscription.unsubscribe();
            let init = true;
            let initForm = true;
            this._formInitEvent.emit(0 /* Initializing */);
            this._formGroupSubscription =
                formGroup.valueChanges
                    .pipe(startWith({}), pairwise(), debounceTime(200), withLatestFrom(...(this._nodesMaps), this._flatNodes))
                    .subscribe((v) => {
                    const oldFormValue = init && {} || v[0][0];
                    init = false;
                    const newFormValue = v[0][1];
                    const visibilityMap = v[1];
                    const repetitionMap = v[2];
                    const conditionalBranchesMap = v[3];
                    const formulaMap = v[4];
                    const validationMap = v[5];
                    const warningMap = v[6];
                    const nextSlideConditionsMap = v[7];
                    const filteredChoicesMap = v[8];
                    const triggerConditionsMap = v[9];
                    const nodes = v[10];
                    // takes the names of the fields that have changed
                    const delta = this._formValueDelta(oldFormValue, newFormValue);
                    const deltaLen = delta.length;
                    let updatedNodes = [];
                    /*
                      for each field update all properties map
                      with the following rule  "if fieldname is in map update it" and
                      push on updateNodes the node instance that wrap field
                    */
                    delta.forEach((fieldName) => {
                        updatedNodes = updatedNodes.concat(nodes.filter(n => nodeInstanceCompleteName(n) === fieldName));
                        if (visibilityMap[fieldName] != null) {
                            visibilityMap[fieldName].forEach(nodeInstance => {
                                const completeName = nodeInstanceCompleteName(nodeInstance);
                                const visibilityChanged = updateVisibility(nodeInstance, newFormValue);
                                const isField = isFieldInstance(nodeInstance);
                                if (visibilityChanged && !nodeInstance.visible) {
                                    const fg = this._formGroup.getValue();
                                    if (fg != null) {
                                        const s = timer(200).subscribe(() => {
                                            if (s && !s.closed) {
                                                s.unsubscribe();
                                            }
                                            fg.controls[completeName].setValue(null);
                                        });
                                    }
                                    if (isField) {
                                        nodeInstance.value = null;
                                    }
                                }
                                else if (visibilityChanged && nodeInstance.visible && isField) {
                                    const fg = this._formGroup.getValue();
                                    const res = updateFormula(nodeInstance, newFormValue);
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
                            repetitionMap[fieldName].forEach(nodeInstance => {
                                if (isRepeatingContainerNode(nodeInstance.node)) {
                                    const rnInstance = nodeInstance;
                                    const oldReps = updateRepsNum(rnInstance, newFormValue);
                                    if (oldReps !== rnInstance.reps) {
                                        this._adjustReps(nodes, rnInstance, oldReps, newFormValue);
                                    }
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            });
                        }
                        if (conditionalBranchesMap[fieldName] != null) {
                            conditionalBranchesMap[fieldName].forEach((nodeInstance) => {
                                // const branchChanged = nodeInstance.updateConditionalBranches(newFormValue);
                                updateConditionalBranches(nodeInstance, newFormValue);
                                // if (branchChanged) {
                                const verifiedBranch = nodeInstance.verifiedBranch;
                                nodeInstance.conditionalBranches.forEach((_condition, idx) => {
                                    if (idx == verifiedBranch) {
                                        this._showSubtree(newFormValue, nodes, nodeInstance, idx);
                                    }
                                    else {
                                        this._hideSubtree(newFormValue, nodes, nodeInstance, idx);
                                    }
                                });
                                // }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            });
                        }
                        if (formulaMap[fieldName] != null) {
                            formulaMap[fieldName].forEach((nodeInstance) => {
                                if (isFieldInstance(nodeInstance)) {
                                    const fInstance = nodeInstance;
                                    const res = updateFormula(fInstance, newFormValue);
                                    const fg = this._formGroup.getValue();
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
                            validationMap[fieldName].forEach((nodeInstance) => {
                                if (isFieldInstance(nodeInstance)) {
                                    const fInstance = nodeInstance;
                                    newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
                                    updateValidation(fInstance, newFormValue, this.currentSupplementaryInformations);
                                }
                                if (updatedNodes.indexOf(nodeInstance) === -1) {
                                    updatedNodes.push(nodeInstance);
                                }
                            });
                        }
                        if (warningMap[fieldName] != null) {
                            warningMap[fieldName].forEach((nodeInstance) => {
                                if (isFieldInstance(nodeInstance)) {
                                    const fInstance = nodeInstance;
                                    updateWarning(fInstance, newFormValue);
                                    if (fInstance.warningResults != null &&
                                        fInstance.warningResults.filter(warning => warning.result).length > 0) {
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
                                .filter((nodeInstance) => {
                                if (isFieldInstance(nodeInstance)) {
                                    const fInstance = nodeInstance;
                                    return updateNextSlideCondition(fInstance, newFormValue);
                                }
                                return false;
                            })
                                .length == 1) {
                                this._nextSlideTrigger.emit();
                            }
                        }
                        if (filteredChoicesMap[fieldName] != null) {
                            filteredChoicesMap[fieldName].forEach((nodeInstance) => {
                                if (isFieldInstance(nodeInstance)) {
                                    const fInstance = nodeInstance;
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
                            const res = triggerConditionsMap[fieldName].filter((nodeInstance) => {
                                if (!isFieldInstance(nodeInstance)) {
                                    return false;
                                }
                                const fInstance = nodeInstance;
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
                    updatedNodes.forEach(n => {
                        const nodeIdx = nodes.indexOf(n);
                        let idx = nodeIdx - 1;
                        while (idx >= 0) {
                            const curNode = nodes[idx];
                            if (isSlidesInstance(curNode)) {
                                const slide = curNode;
                                const subNodesNum = slide.flatNodes.length;
                                let valid = true;
                                for (let i = 0; i < subNodesNum; i++) {
                                    const subNode = slide.flatNodes[i];
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
                        this._formInitEvent.emit(1 /* Complete */);
                    }
                    this._valueChanged.next();
                });
            return formGroup;
        }
        _showSubtree(context, nodes, node, branch) {
            this._updateSubtreeVisibility(context, nodes, node, true, branch);
        }
        _hideSubtree(context, nodes, node, branch) {
            this._updateSubtreeVisibility(context, nodes, node, false, branch);
        }
        _updateSubtreeVisibility(context, nodes, node, visible, branch) {
            let subNodes;
            const nodeSuffix = nodeInstanceSuffix(node);
            if (branch != null) {
                subNodes = nodes.filter(n => {
                    const suffix = nodeInstanceSuffix(n);
                    return suffix == nodeSuffix && n.node.parent == node.node.id && n.node.parentNode == branch;
                });
            }
            else {
                subNodes = nodes.filter(n => {
                    const suffix = nodeInstanceSuffix(n);
                    return suffix == nodeSuffix && n.node.parent == node.node.id;
                });
            }
            const isContainer = isContainerNode(node.node);
            subNodes.forEach((n) => {
                if (!isContainer ||
                    (isContainer && node.node.nodes.find(cn => cn.id == n.node.id) == null)) {
                    updateVisibility(n, context, visible);
                    updateFormula(n, context);
                    this._updateSubtreeVisibility(context, nodes, n, visible);
                }
            });
        }
        _initNodesStreams() {
            this._nodes =
                this._nodesUpdates.pipe(scan((nodes, op) => {
                    return op(nodes);
                }, []), share());
            this._flatNodesTree = this._nodes.pipe(map(nodes => flattenNodesInstancesTree(nodes)), share());
            this._flatNodes = this._flatNodesTree.pipe(map(slides => {
                let nodes = [];
                slides.forEach(s => {
                    nodes.push(s);
                    nodes = nodes.concat(s.flatNodes);
                });
                return nodes;
            }), share());
        }
        _removeNodeInstance(nodeInstance) {
            const nodeName = nodeInstanceCompleteName(nodeInstance);
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
        }
        _removeSlideInstance(slideInstance) {
            const slide = slideInstance.node;
            if (slide.visibility != null) {
                this._removeFromNodesVisibilityMap(slideInstance, slide.visibility.condition);
            }
            slideInstance.conditionalBranches.forEach((conditionalBranch) => {
                this._removeFromNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
            });
            return slideInstance;
        }
        _removeNodeGroupInstance(nodeGroupInstance) {
            const nodeGroup = nodeGroupInstance.node;
            if (nodeGroup.visibility != null) {
                this._removeFromNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
            }
            if (nodeGroupInstance.formulaReps != null && nodeGroup.formulaReps != null) {
                this._removeFromNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
            }
            return nodeGroupInstance;
        }
        _removeFieldInstance(fieldInstance) {
            const formGroup = this._formGroup.getValue();
            const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
            if (formGroup != null && formGroup.contains(fieldInstanceName)) {
                formGroup.removeControl(fieldInstanceName);
            }
            if (fieldInstance.validation != null) {
                this._validationNodesMapUpdates.next((vmap) => {
                    if (vmap[fieldInstanceName] == null) {
                        delete vmap[fieldInstanceName];
                    }
                    return vmap;
                });
            }
            if (fieldInstance.visibility != null) {
                this._removeFromNodesVisibilityMap(fieldInstance, fieldInstance.visibility.condition);
            }
            fieldInstance.conditionalBranches.forEach((conditionalBranch) => {
                this._removeFromNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
            });
            if (fieldInstance.formula) {
                this._removeFromNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
            }
            // TODO: check this, probably is never verified
            if (isRepeatingContainerNode(fieldInstance.node)) {
                const rcInstance = fieldInstance;
                if (rcInstance.formulaReps != null) {
                    this._removeFromNodesRepetitionMap(fieldInstance, rcInstance.formulaReps.formula);
                }
            }
            if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
                fieldInstance.validation.conditions.forEach((condition) => {
                    this._removeFromNodesValidationMap(fieldInstance, condition.condition);
                });
            }
            if (fieldInstance.warning != null) {
                fieldInstance.warning.conditions.forEach((condition) => {
                    this._removeFromNodesWarningMap(fieldInstance, condition.condition);
                });
            }
            if (fieldInstance.nextSlideCondition != null) {
                this._removeFromNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
            }
            if (isFieldWithChoices(fieldInstance.node)) {
                const fwcInstance = fieldInstance;
                if (fwcInstance.choicesFilter != null) {
                    this._removeFromNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
                    if (fwcInstance.triggerConditions != null) {
                        fwcInstance.triggerConditions.forEach((condition) => {
                            this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                        });
                    }
                }
            }
            return fieldInstance;
        }
        _addNodeInstance(nodeInstance) {
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
        }
        _addFieldInstance(fieldInstance) {
            const formGroup = this._formGroup.getValue();
            const fieldInstanceName = nodeInstanceCompleteName(fieldInstance);
            if (formGroup != null && !formGroup.contains(fieldInstanceName)) {
                const control = new FormControl();
                control.setValue(fieldInstance.value);
                formGroup.registerControl(fieldInstanceName, control);
            }
            if (fieldInstance.validation != null) {
                this._validationNodesMapUpdates.next((vmap) => {
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
            fieldInstance.conditionalBranches.forEach((conditionalBranch) => {
                this._addToNodesConditionalBranchMap(fieldInstance, conditionalBranch.condition);
            });
            if (fieldInstance.formula) {
                this._addToNodesFormulaMap(fieldInstance, fieldInstance.formula.formula);
            }
            if (isNodeGroupInstance(fieldInstance)) {
                const ngInstance = fieldInstance;
                if (ngInstance.formulaReps != null) {
                    this._addToNodesRepetitionMap(fieldInstance, ngInstance.formulaReps.formula);
                }
            }
            if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
                fieldInstance.validation.conditions.forEach((condition) => {
                    this._addToNodesValidationMap(fieldInstance, condition.condition);
                });
            }
            if (fieldInstance.warning != null) {
                fieldInstance.warning.conditions.forEach((condition) => {
                    this._addToNodesWarningMap(fieldInstance, condition.condition);
                });
            }
            if (fieldInstance.nextSlideCondition != null) {
                this._addToNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
            }
            if (isCustomFieldWithChoices(fieldInstance.node) || isFieldWithChoicesInstance(fieldInstance)) {
                const fwcInstance = fieldInstance;
                if (fwcInstance.choicesFilter != null) {
                    this._addToNodesFilteredChoicesMap(fieldInstance, fwcInstance.choicesFilter.formula);
                }
                if (fwcInstance.triggerConditions != null) {
                    fwcInstance.triggerConditions.forEach((condition) => {
                        this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                    });
                }
            }
            return fieldInstance;
        }
        _addSlideInstance(slideInstance) {
            const slide = slideInstance.node;
            if (slide.visibility != null) {
                this._addToNodesVisibilityMap(slideInstance, slide.visibility.condition);
            }
            slideInstance.conditionalBranches.forEach((conditionalBranch) => {
                this._addToNodesConditionalBranchMap(slideInstance, conditionalBranch.condition);
            });
            return slideInstance;
        }
        _addNodeGroupInstance(nodeGroupInstance) {
            const nodeGroup = nodeGroupInstance.node;
            if (nodeGroup.visibility != null) {
                this._addToNodesVisibilityMap(nodeGroupInstance, nodeGroup.visibility.condition);
            }
            nodeGroupInstance.conditionalBranches.forEach((conditionalBranch) => {
                this._addToNodesConditionalBranchMap(nodeGroupInstance, conditionalBranch.condition);
            });
            if (nodeGroupInstance.formulaReps != null) {
                if (nodeGroup.formulaReps != null) {
                    this._addToNodesRepetitionMap(nodeGroupInstance, nodeGroup.formulaReps.formula);
                }
            }
            else {
                let formGroup = this._formGroup.getValue();
                let nodeGroupInstanceName = nodeInstanceCompleteName(nodeGroupInstance);
                if (formGroup != null && !formGroup.contains(nodeGroupInstanceName)) {
                    const control = new FormControl();
                    control.setValue(nodeGroupInstance.reps);
                    formGroup.registerControl(nodeGroupInstanceName, control);
                }
            }
            return nodeGroupInstance;
        }
        _removeNodesVisibilityMapIndex(index) {
            this._removeNodesMapIndex(this._visibilityNodesMapUpdates, index);
        }
        _removeNodesRepetitionMapIndex(index) {
            this._removeNodesMapIndex(this._repetitionNodesMapUpdates, index);
        }
        _removeNodesConditionalBranchMapIndex(index) {
            this._removeNodesMapIndex(this._conditionalBranchNodesMapUpdates, index);
        }
        _removeNodesFormulaMapIndex(index) {
            this._removeNodesMapIndex(this._formulaNodesMapUpdates, index);
        }
        _removeNodesValidationMapIndex(index) {
            this._removeNodesMapIndex(this._validationNodesMapUpdates, index);
        }
        _removeNodesWarningMapIndex(index) {
            this._removeNodesMapIndex(this._warningNodesMapUpdates, index);
        }
        _removeNodesFilteredChoicesMapIndex(index) {
            this._removeNodesMapIndex(this._filteredChoicesNodesMapUpdates, index);
        }
        _removeNodesTriggerConditionsMapIndex(index) {
            this._removeNodesMapIndex(this._triggerConditionsNodesMapUpdates, index);
        }
        _removeNodesNextSlideConditionsMapIndex(index) {
            this._removeNodesMapIndex(this._nextSlideConditionsNodesMapUpdates, index);
        }
        _removeNodesMapIndex(nodesMap, index) {
            nodesMap.next((vmap) => {
                if (Object.keys(vmap).indexOf(index) > -1) {
                    delete vmap[index];
                }
                return vmap;
            });
        }
        _removeFromNodesVisibilityMap(nodeInstance, formula) {
            this._removeFromNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
        }
        _removeFromNodesRepetitionMap(nodeInstance, formula) {
            this._removeFromNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
        }
        _removeFromNodesConditionalBranchMap(nodeInstance, formula) {
            this._removeFromNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
        }
        _removeFromNodesFormulaMap(nodeInstance, formula) {
            this._removeFromNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
        }
        _removeFromNodesValidationMap(nodeInstance, formula) {
            this._removeFromNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
        }
        _removeFromNodesWarningMap(nodeInstance, formula) {
            this._removeFromNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
        }
        _removeFromNodesFilteredChoicesMap(nodeInstance, formula) {
            this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
        }
        _removeFromNodesTriggerConditionsMap(nodeInstance, formula) {
            this._removeFromNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
        }
        _removeFromNodesNextSlideConditionsMap(nodeInstance, formula) {
            this._removeFromNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
        }
        _removeFromNodesMap(nodesMap, nodeInstance, formula) {
            let tokens = tokenize(formula).filter((token) => token.type == 'Identifier' && token.value != '$value');
            if (tokens.length > 0) {
                nodesMap.next((vmap) => {
                    tokens.forEach((token) => {
                        let tokenName = token.value;
                        if (vmap[tokenName] != null) {
                            const idx = vmap[tokenName].indexOf(nodeInstance);
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
        }
        _addToNodesVisibilityMap(nodeInstance, formula) {
            this._addToNodesMap(this._visibilityNodesMapUpdates, nodeInstance, formula);
        }
        _addToNodesRepetitionMap(nodeInstance, formula) {
            this._addToNodesMap(this._repetitionNodesMapUpdates, nodeInstance, formula);
        }
        _addToNodesConditionalBranchMap(nodeInstance, formula) {
            this._addToNodesMap(this._conditionalBranchNodesMapUpdates, nodeInstance, formula);
        }
        _addToNodesFormulaMap(nodeInstance, formula) {
            this._addToNodesMap(this._formulaNodesMapUpdates, nodeInstance, formula);
        }
        _addToNodesValidationMap(nodeInstance, formula) {
            this._addToNodesMap(this._validationNodesMapUpdates, nodeInstance, formula);
        }
        _addToNodesWarningMap(nodeInstance, formula) {
            this._addToNodesMap(this._warningNodesMapUpdates, nodeInstance, formula);
        }
        _addToNodesFilteredChoicesMap(nodeInstance, formula) {
            this._addToNodesMap(this._filteredChoicesNodesMapUpdates, nodeInstance, formula);
        }
        _addToNodesTriggerConditionsMap(nodeInstance, formula) {
            this._addToNodesMap(this._triggerConditionsNodesMapUpdates, nodeInstance, formula);
        }
        _addToNodesNextSlideConditionsMap(nodeInstance, formula) {
            this._addToNodesMap(this._nextSlideConditionsNodesMapUpdates, nodeInstance, formula);
        }
        _addToNodesMap(nodesMap, nodeInstance, formula) {
            let tokens = tokenize(formula).filter((token) => token.type == 'Identifier' && token.value != '$value');
            if (tokens.length > 0) {
                nodesMap.next((vmap) => {
                    tokens.forEach((token) => {
                        let tokenName = token.value;
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
        }
    };
    AjfFormRendererService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [AjfValidationService])
    ], AjfFormRendererService);
    return AjfFormRendererService;
})();

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
let AjfBaseFieldComponent = /** @class */ (() => {
    let AjfBaseFieldComponent = class AjfBaseFieldComponent {
        constructor(_changeDetectorRef, _service, _warningAlertService) {
            this._changeDetectorRef = _changeDetectorRef;
            this._service = _service;
            this._warningAlertService = _warningAlertService;
            this._warningTriggerSub = Subscription.EMPTY;
            this._instanceUpdateSub = Subscription.EMPTY;
            this._control = defer(() => this._service.getControl(this.instance)
                .pipe(map(ctrl => ctrl || new FormControl())));
        }
        get instance() {
            return this._instance;
        }
        set instance(instance) {
            if (instance !== this._instance) {
                this._instance = instance;
                this._setUpInstanceUpdate();
                this._onInstanceChange();
            }
        }
        get control() {
            return this._control;
        }
        ngOnInit() {
            this._warningTriggerSub =
                this.instance.warningTrigger.pipe(withLatestFrom(this.control), filter(v => v[1] != null))
                    .subscribe((v) => {
                    if (this.instance.warningResults == null) {
                        return;
                    }
                    const control = v[1];
                    const s = this._warningAlertService
                        .showWarningAlertPrompt(this.instance.warningResults.filter(w => w.result).map(w => w.warning))
                        .subscribe((r) => {
                        if (r.result) {
                            control.setValue(null);
                        }
                    }, (_e) => {
                        if (s) {
                            s.unsubscribe();
                        }
                    }, () => {
                        if (s) {
                            s.unsubscribe();
                        }
                    });
                });
        }
        ngOnDestroy() {
            this._warningTriggerSub.unsubscribe();
            this._instanceUpdateSub.unsubscribe();
        }
        _onInstanceChange() { }
        _setUpInstanceUpdate() {
            this._instanceUpdateSub.unsubscribe();
            if (this._instance != null) {
                this._instanceUpdateSub = this._instance.updatedEvt.subscribe(() => {
                    if (this._changeDetectorRef) {
                        try {
                            this._changeDetectorRef.detectChanges();
                        }
                        catch (e) {
                        }
                    }
                });
            }
            else {
                this._instanceUpdateSub = Subscription.EMPTY;
            }
            this._changeDetectorRef.detectChanges();
        }
    };
    AjfBaseFieldComponent = __decorate([
        Directive(),
        __metadata("design:paramtypes", [ChangeDetectorRef,
            AjfFormRendererService, Object])
    ], AjfBaseFieldComponent);
    return AjfBaseFieldComponent;
})();

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
let AjfBoolToIntPipe = /** @class */ (() => {
    let AjfBoolToIntPipe = class AjfBoolToIntPipe {
        transform(value) {
            return value ? 1 : 0;
        }
    };
    AjfBoolToIntPipe = __decorate([
        Pipe({ name: 'ajfBoolToInt' })
    ], AjfBoolToIntPipe);
    return AjfBoolToIntPipe;
})();

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
let AjfDateValuePipe = /** @class */ (() => {
    let AjfDateValuePipe = class AjfDateValuePipe {
        transform(date) {
            if (date == null) {
                return null;
            }
            return date === 'today' ? new Date() : date;
        }
    };
    AjfDateValuePipe = __decorate([
        Pipe({ name: 'ajfDateValue' })
    ], AjfDateValuePipe);
    return AjfDateValuePipe;
})();

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
let AjfDateValueStringPipe = /** @class */ (() => {
    let AjfDateValueStringPipe = class AjfDateValueStringPipe {
        transform(date) {
            if (date == null) {
                return undefined;
            }
            const dateObj = date === 'today' ? new Date() : date;
            return format(dateObj, 'yyyy-MM-dd');
        }
    };
    AjfDateValueStringPipe = __decorate([
        Injectable(),
        Pipe({ name: 'ajfDateValueString' })
    ], AjfDateValueStringPipe);
    return AjfDateValueStringPipe;
})();

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
class AjfInvalidFieldDefinitionError extends AjfError {
    get name() {
        return 'AjfInvalidFieldDefinitionError';
    }
    constructor(message) {
        super(message);
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
let AjfExpandFieldWithChoicesPipe = /** @class */ (() => {
    let AjfExpandFieldWithChoicesPipe = class AjfExpandFieldWithChoicesPipe {
        transform(instance, threshold) {
            return !instance.node.forceNarrow &&
                (instance.node.forceExpanded ||
                    (instance.filteredChoices && instance.filteredChoices.length <= threshold));
        }
    };
    AjfExpandFieldWithChoicesPipe = __decorate([
        Pipe({ name: 'ajfExpandFieldWithChoices' })
    ], AjfExpandFieldWithChoicesPipe);
    return AjfExpandFieldWithChoicesPipe;
})();

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
let AjfFieldHost = /** @class */ (() => {
    let AjfFieldHost = class AjfFieldHost {
        constructor(viewContainerRef) {
            this.viewContainerRef = viewContainerRef;
        }
    };
    AjfFieldHost = __decorate([
        Directive({ selector: '[ajf-field-host]' }),
        __metadata("design:paramtypes", [ViewContainerRef])
    ], AjfFieldHost);
    return AjfFieldHost;
})();

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
let AjfFormField = /** @class */ (() => {
    let AjfFormField = class AjfFormField {
        constructor(_cdr, _cfr) {
            this._cdr = _cdr;
            this._cfr = _cfr;
            this._init = false;
            this._updatedSub = Subscription.EMPTY;
        }
        get instance() {
            return this._instance;
        }
        set instance(instance) {
            if (this._instance !== instance) {
                this._instance = instance;
                if (this._init) {
                    this._loadComponent();
                }
            }
        }
        get readonly() {
            return this._readonly;
        }
        set readonly(readonly) {
            this._readonly = coerceBooleanProperty(readonly);
            if (this._init) {
                this._loadComponent();
            }
        }
        ngOnDestroy() {
            this._updatedSub.unsubscribe();
        }
        ngOnInit() {
            this._init = true;
            this._loadComponent();
        }
        _loadComponent() {
            this._updatedSub.unsubscribe();
            this._updatedSub = Subscription.EMPTY;
            if (this._instance == null || this.fieldHost == null) {
                return;
            }
            const vcr = this.fieldHost.viewContainerRef;
            vcr.clear();
            const componentDef = this.componentsMap[this._instance.node.fieldType];
            if (componentDef == null) {
                return;
            }
            const component = this._readonly && componentDef.readOnlyComponent ?
                componentDef.readOnlyComponent :
                componentDef.component;
            try {
                const componentFactory = this._cfr.resolveComponentFactory(component);
                const componentRef = vcr.createComponent(componentFactory);
                this._componentInstance = componentRef.instance;
                this._componentInstance.instance = this._instance;
                if (componentDef.inputs) {
                    Object.keys(componentDef.inputs).forEach(key => {
                        if (key in this._componentInstance) {
                            this._componentInstance[key] = componentDef.inputs[key];
                        }
                    });
                }
                this._updatedSub = this._instance.updatedEvt.subscribe(() => this._cdr.markForCheck());
            }
            catch (e) {
                console.log(e);
            }
        }
    };
    __decorate([
        ViewChild(AjfFieldHost, { static: true }),
        __metadata("design:type", AjfFieldHost)
    ], AjfFormField.prototype, "fieldHost", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AjfFormField.prototype, "instance", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfFormField.prototype, "readonly", null);
    AjfFormField = __decorate([
        Directive(),
        __metadata("design:paramtypes", [ChangeDetectorRef, ComponentFactoryResolver])
    ], AjfFormField);
    return AjfFormField;
})();

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
    return `ajf-icon-field-${typeof AjfFieldType[type] === 'string' ? AjfFieldType[type].toLowerCase() : type}`;
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
let AjfFieldIconPipe = /** @class */ (() => {
    let AjfFieldIconPipe = class AjfFieldIconPipe {
        transform(field) {
            return fieldIconName(field.fieldType ? field.fieldType : field);
        }
    };
    AjfFieldIconPipe = __decorate([
        Pipe({ name: 'ajfFieldIcon' })
    ], AjfFieldIconPipe);
    return AjfFieldIconPipe;
})();

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
let AjfFieldIsValidPipe = /** @class */ (() => {
    let AjfFieldIsValidPipe = class AjfFieldIsValidPipe {
        transform(validationResults) {
            return validationResults != null && validationResults.filter((f) => !f.result).length === 0;
        }
    };
    AjfFieldIsValidPipe = __decorate([
        Pipe({ name: 'ajfFieldIsValid' })
    ], AjfFieldIsValidPipe);
    return AjfFieldIsValidPipe;
})();

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
class AjfFieldService {
    constructor() {
        this.componentsMap = componentsMap;
    }
    registerCustomField(field) {
        const { fieldType, component } = field;
        if (fieldType < 100) {
            throw new Error('Invalid custom field type, it must be greater than 100');
        }
        if (component == null) {
            throw new Error('Invalid custom field component');
        }
        this.componentsMap[fieldType] = field;
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
class AjfFieldWithChoicesComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, warningAlertService, searchThreshold) {
        super(cdr, service, warningAlertService);
        this._searchThreshold = 6;
        if (searchThreshold != null) {
            this._searchThreshold = searchThreshold;
        }
    }
    get searchThreshold() {
        return this._searchThreshold;
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
class AjfFormActionEvent {
}
let AjfFormRenderer = /** @class */ (() => {
    let AjfFormRenderer = class AjfFormRenderer {
        /**
         * this constructor will init current formula by ajfBuilderService
         */
        constructor(_rendererService, _changeDetectorRef) {
            this._rendererService = _rendererService;
            this._changeDetectorRef = _changeDetectorRef;
            // ajfFieldTypes [ Text, Number, Boolean, SingleChoice, MultipleChoice,
            // Formula, Empty, Composed, LENGTH ]
            this.ajfFieldTypes = AjfFieldType;
            this._orientationChange = new EventEmitter();
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
            this._errorMoveEvent = new EventEmitter();
            // _init is a private boolean
            this._init = false;
            this._nextSlideSubscription = Subscription.EMPTY;
            this._errorMoveSubscription = Subscription.EMPTY;
            this._formAction = new EventEmitter();
            this.formAction = this._formAction.asObservable();
            this.formGroup = _rendererService.formGroup;
            this.slides = _rendererService.nodesTree;
            this._errorPositions = _rendererService.errorPositions;
            this.errors = _rendererService.errors;
            this.slidesNum = _rendererService.slidesNum;
            this.formIsInit =
                _rendererService.formInitEvent.pipe(map(e => e === 1 /* Complete */));
        }
        get saveDisabled() {
            return this._saveDisabled;
        }
        set saveDisabled(saveDisabled) {
            this._saveDisabled = coerceBooleanProperty(saveDisabled);
            this._changeDetectorRef.markForCheck();
        }
        get hasStartMessage() {
            return this._hasStartMessage;
        }
        set hasStartMessage(hasStartMessage) {
            this._hasStartMessage = coerceBooleanProperty(hasStartMessage);
            this._changeDetectorRef.markForCheck();
        }
        get hasEndMessage() {
            return this._hasEndMessage;
        }
        set hasEndMessage(hasEndMessage) {
            this._hasEndMessage = coerceBooleanProperty(hasEndMessage);
            this._changeDetectorRef.markForCheck();
        }
        get hideTopToolbar() {
            return this._hideTopToolbar;
        }
        set hideTopToolbar(hideTopToolbar) {
            this._hideTopToolbar = coerceBooleanProperty(hideTopToolbar);
            this._changeDetectorRef.markForCheck();
        }
        get hideBottompToolbar() {
            return this._hideBottomToolbar;
        }
        set hideBottomToolbar(hideBottomToolbar) {
            this._hideBottomToolbar = coerceBooleanProperty(hideBottomToolbar);
            this._changeDetectorRef.markForCheck();
        }
        get hideNavigationButtons() {
            return this._hideNavigationButtons;
        }
        set hideNavigationButtons(hideNavigationButtons) {
            this._hideNavigationButtons = coerceBooleanProperty(hideNavigationButtons);
            this._changeDetectorRef.markForCheck();
        }
        get fixedOrientation() {
            return this._fixedOrientation;
        }
        set fixedOrientation(fixedOrientation) {
            this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
            this._changeDetectorRef.markForCheck();
        }
        get readonly() {
            return this._readonly;
        }
        set readonly(readonly) {
            this._readonly = coerceBooleanProperty(readonly);
            this._changeDetectorRef.markForCheck();
        }
        get orientation() {
            return this._orientation;
        }
        set orientation(orientation) {
            if (orientation !== 'horizontal' && orientation !== 'vertical') {
                return;
            }
            if (orientation !== this._orientation) {
                this._orientation = orientation;
                this._changeDetectorRef.markForCheck();
                this._orientationChange.emit(this._orientation);
            }
        }
        set form(form) {
            this._form = form;
            if (this._init) {
                this._rendererService.setForm(this._form);
            }
        }
        /**
         * this method will scroll to next error received by subscribe
         */
        goToNextError() {
            this._errorMoveEvent.emit(true);
        }
        /**
         * this method will scroll to prev error received by subscribe
         */
        goToPrevError() {
            this._errorMoveEvent.emit(false);
        }
        /**
         * this method will add group
         */
        addGroup(nodeGroup) {
            let s = this._rendererService.addGroup(nodeGroup)
                .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
                .subscribe((r) => {
                if (r && this.formSlider != null) {
                    this.formSlider.slide({ dir: 'down' });
                }
            }, (_e) => {
                if (s) {
                    s.unsubscribe();
                }
            }, () => {
                if (s) {
                    s.unsubscribe();
                }
            });
        }
        /**
         * this method will remove group
         */
        removeGroup(nodeGroup) {
            let s = this._rendererService.removeGroup(nodeGroup)
                .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
                .subscribe((r) => {
                if (r && this.formSlider != null) {
                    this.formSlider.slide({ dir: 'up' });
                }
            }, (_e) => {
                if (s) {
                    s.unsubscribe();
                }
            }, () => {
                if (s) {
                    s.unsubscribe();
                }
            });
        }
        onSave(_evt) {
            this._formAction.emit({ source: this, action: 'save', value: this._rendererService.getFormValue() });
        }
        onFormAction(_evt, action) {
            this._formAction.emit({ source: this, value: this._rendererService.getFormValue(), action: action });
        }
        /**
         * this method will set current form in rederer service when init form
         */
        ngAfterViewInit() {
            if (this._form != null) {
                this._rendererService.setForm(this._form);
                this._changeDetectorRef.detectChanges();
            }
        }
        ngAfterViewChecked() {
            if (!this._init && this.formSlider != null) {
                this._init = true;
                this._errorMoveSubscription =
                    this._errorMoveEvent
                        .pipe(withLatestFrom(this._errorPositions))
                        .subscribe((v) => {
                        const move = v[0];
                        const currentPosition = this.formSlider.currentPage - (+this.hasStartMessage) + 1;
                        const errors = v[1];
                        if (errors == null) {
                            return;
                        }
                        let found = false;
                        let prevIdx = -1;
                        let nextIdx = -1;
                        let idx = 0;
                        let errorsLen = errors.length;
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
                        this.formSlider.slide({ to: move ? errors[nextIdx] - 1 : errors[prevIdx] - 1 });
                        this._changeDetectorRef.detectChanges();
                    });
            }
        }
        ngOnDestroy() {
            this._nextSlideSubscription.unsubscribe();
            this._errorMoveSubscription.unsubscribe();
            this._orientationChange.complete();
            this._errorMoveEvent.complete();
            this._formAction.complete();
        }
        orientationChangeHandler(orientation) {
            this.orientation = orientation;
        }
        trackNodeById(_, node) {
            return nodeInstanceCompleteName(node);
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AjfFormRenderer.prototype, "title", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Observable)
    ], AjfFormRenderer.prototype, "orientationChange", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfFormRenderer.prototype, "saveDisabled", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfFormRenderer.prototype, "hasStartMessage", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfFormRenderer.prototype, "hasEndMessage", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfFormRenderer.prototype, "hideTopToolbar", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfFormRenderer.prototype, "hideBottomToolbar", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfFormRenderer.prototype, "hideNavigationButtons", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfFormRenderer.prototype, "fixedOrientation", null);
    __decorate([
        Input(),
        __metadata("design:type", Boolean),
        __metadata("design:paramtypes", [Boolean])
    ], AjfFormRenderer.prototype, "readonly", null);
    __decorate([
        Input(),
        __metadata("design:type", String),
        __metadata("design:paramtypes", [String])
    ], AjfFormRenderer.prototype, "orientation", null);
    __decorate([
        ViewChild('formSlider', { static: false }),
        __metadata("design:type", AjfPageSlider)
    ], AjfFormRenderer.prototype, "formSlider", void 0);
    __decorate([
        ViewChildren(AjfFormField),
        __metadata("design:type", QueryList)
    ], AjfFormRenderer.prototype, "fields", void 0);
    __decorate([
        Output(),
        __metadata("design:type", Observable)
    ], AjfFormRenderer.prototype, "formAction", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object),
        __metadata("design:paramtypes", [Object])
    ], AjfFormRenderer.prototype, "form", null);
    AjfFormRenderer = __decorate([
        Directive(),
        __metadata("design:paramtypes", [AjfFormRendererService,
            ChangeDetectorRef])
    ], AjfFormRenderer);
    return AjfFormRenderer;
})();

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
let AjfGetTableCellControlPipe = /** @class */ (() => {
    let AjfGetTableCellControlPipe = class AjfGetTableCellControlPipe {
        transform(ctrl) {
            if (ctrl == null || typeof ctrl === 'string') {
                return null;
            }
            return ctrl;
        }
    };
    AjfGetTableCellControlPipe = __decorate([
        Pipe({ name: 'ajfGetTableCellControl' })
    ], AjfGetTableCellControlPipe);
    return AjfGetTableCellControlPipe;
})();

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
let AjfIncrementPipe = /** @class */ (() => {
    let AjfIncrementPipe = class AjfIncrementPipe {
        transform(value, increment = 1) {
            return value + increment;
        }
    };
    AjfIncrementPipe = __decorate([
        Pipe({ name: 'ajfIncrement' })
    ], AjfIncrementPipe);
    return AjfIncrementPipe;
})();

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
let AjfIsCellEditablePipe = /** @class */ (() => {
    let AjfIsCellEditablePipe = class AjfIsCellEditablePipe {
        transform(cell) {
            if (cell == null || typeof cell === 'string') {
                return false;
            }
            return cell.editable === true;
        }
    };
    AjfIsCellEditablePipe = __decorate([
        Pipe({ name: 'ajfIsCellEditable' })
    ], AjfIsCellEditablePipe);
    return AjfIsCellEditablePipe;
})();

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
let AjfIsRepeatingSlideInstancePipe = /** @class */ (() => {
    let AjfIsRepeatingSlideInstancePipe = class AjfIsRepeatingSlideInstancePipe {
        transform(instance) {
            return isRepeatingSlideInstance(instance);
        }
    };
    AjfIsRepeatingSlideInstancePipe = __decorate([
        Pipe({ name: 'ajfIsRepeatingSlideInstance' })
    ], AjfIsRepeatingSlideInstancePipe);
    return AjfIsRepeatingSlideInstancePipe;
})();

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
let AjfNodeCompleteNamePipe = /** @class */ (() => {
    let AjfNodeCompleteNamePipe = class AjfNodeCompleteNamePipe {
        transform(instance) {
            return instance ? nodeInstanceCompleteName(instance) : '';
        }
    };
    AjfNodeCompleteNamePipe = __decorate([
        Pipe({ name: 'ajfNodeCompleteName' })
    ], AjfNodeCompleteNamePipe);
    return AjfNodeCompleteNamePipe;
})();

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
let AjfRangePipe = /** @class */ (() => {
    let AjfRangePipe = class AjfRangePipe {
        transform(size = 0, start = 1, step = 1) {
            const range = [];
            for (let length = 0; length < size; ++length) {
                range.push(start);
                start += step;
            }
            return range;
        }
    };
    AjfRangePipe = __decorate([
        Pipe({ name: 'ajfRange' })
    ], AjfRangePipe);
    return AjfRangePipe;
})();

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
class AjfInputFieldComponent extends AjfBaseFieldComponent {
    constructor() {
        super(...arguments);
        this.type = 'text';
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
const AJF_WARNING_ALERT_SERVICE = new InjectionToken('ajf-warning-alert-service');

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
let AjfReadOnlyFieldComponent = /** @class */ (() => {
    let AjfReadOnlyFieldComponent = class AjfReadOnlyFieldComponent extends AjfInputFieldComponent {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
    };
    AjfReadOnlyFieldComponent = __decorate([
        Component({
            selector: 'ajf-read-only-field',
            template: "<span *ngIf=\"control|async as ctrl\">{{ctrl.value}}</span>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["ajf-read-only-field span{min-height:1em;display:block}\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService, Object])
    ], AjfReadOnlyFieldComponent);
    return AjfReadOnlyFieldComponent;
})();

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
let AjfReadOnlyTableFieldComponent = /** @class */ (() => {
    let AjfReadOnlyTableFieldComponent = class AjfReadOnlyTableFieldComponent extends AjfBaseFieldComponent {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
    };
    AjfReadOnlyTableFieldComponent = __decorate([
        Component({
            template: "<table class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns && columns.length > 0 && columns[0] != null\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns && columns.length > 1 && columns[1] != null\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n              <ng-container *ngIf=\"contr != null\">\n                <span *ngIf=\"row > 0; else labelCell\"\n                  class=\"ajf-table-cell\">{{ contr.control!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span>\n                <ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template>\n              </ng-container>\n            </ng-container>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n",
            changeDetection: ChangeDetectionStrategy.OnPush,
            encapsulation: ViewEncapsulation.None,
            styles: ["\n"]
        }),
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService, Object])
    ], AjfReadOnlyTableFieldComponent);
    return AjfReadOnlyTableFieldComponent;
})();

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
let AjfTableRowClass = /** @class */ (() => {
    let AjfTableRowClass = class AjfTableRowClass {
        transform(value) {
            return value % 2 == 0 ? 'ajf-row-even' : 'ajf-row-odd';
        }
    };
    AjfTableRowClass = __decorate([
        Pipe({ name: 'ajfTableRowClass' })
    ], AjfTableRowClass);
    return AjfTableRowClass;
})();

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
let AjfTableVisibleColumnsPipe = /** @class */ (() => {
    let AjfTableVisibleColumnsPipe = class AjfTableVisibleColumnsPipe {
        transform(instance) {
            if (!instance.node.editable) {
                const val = instance.value || [];
                return instance.hideEmptyRows ?
                    val.filter(col => col[1].reduce((prev, cur) => {
                        return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                    }, false))
                        .map(v => [v[0], ...v[1]]) :
                    val.map(v => [v[0], ...v[1]]);
            }
            return (instance.controls || [])
                .map(v => [v[0], ...v[1]]);
        }
    };
    AjfTableVisibleColumnsPipe = __decorate([
        Pipe({ name: 'ajfTableVisibleColumns' })
    ], AjfTableVisibleColumnsPipe);
    return AjfTableVisibleColumnsPipe;
})();

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
let AjfValidSlidePipe = /** @class */ (() => {
    let AjfValidSlidePipe = class AjfValidSlidePipe {
        transform(slide, idx) {
            if (idx == null || typeof idx !== 'number') {
                return false;
            }
            if (idx >= slide.slideNodes.length) {
                return true;
            }
            return slide.slideNodes[idx]
                .map(n => {
                if (n.visible && Object.keys(n).indexOf('valid') > -1) {
                    return n.valid;
                }
                return true;
            })
                .reduce((v1, v2) => v1 && v2, true);
        }
    };
    AjfValidSlidePipe = __decorate([
        Pipe({ name: 'ajfValidSlide', pure: false })
    ], AjfValidSlidePipe);
    return AjfValidSlidePipe;
})();

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
let AjfFormsModule = /** @class */ (() => {
    let AjfFormsModule = class AjfFormsModule {
    };
    AjfFormsModule = __decorate([
        NgModule({
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
                AjfGetTableCellControlPipe,
                AjfIncrementPipe,
                AjfIsCellEditablePipe,
                AjfIsRepeatingSlideInstancePipe,
                AjfNodeCompleteNamePipe,
                AjfRangePipe,
                AjfReadOnlyFieldComponent,
                AjfReadOnlyTableFieldComponent,
                AjfTableRowClass,
                AjfTableVisibleColumnsPipe,
                AjfValidSlidePipe,
            ],
            imports: [AjfCommonModule, CommonModule],
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
                AjfGetTableCellControlPipe,
                AjfIncrementPipe,
                AjfIsCellEditablePipe,
                AjfIsRepeatingSlideInstancePipe,
                AjfNodeCompleteNamePipe,
                AjfRangePipe,
                AjfReadOnlyFieldComponent,
                AjfReadOnlyTableFieldComponent,
                AjfTableRowClass,
                AjfTableVisibleColumnsPipe,
                AjfValidSlidePipe,
            ],
            providers: [
                AjfDateValueStringPipe,
                AjfFormRendererService,
                AjfValidationService,
            ],
        })
    ], AjfFormsModule);
    return AjfFormsModule;
})();

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
    let typeStr = typeof v;
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
const AJF_SEARCH_ALERT_THRESHOLD = new InjectionToken('AJF_SEARCH_ALERT_THRESHOLD');

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
    return Object.assign(Object.assign({}, origin), { attachments: origin.attachments || [] });
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
class AjfAttachmentsOriginSerializer {
    static fromJson(origin) {
        if (origin.name == null) {
            throw new Error('Malformed attachments origin');
        }
        return createAttachmentsOrigin(origin);
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
function createChoicesOrigin(origin) {
    return Object.assign(Object.assign({}, origin), { type: origin.type, label: origin.label || '', choices: origin.choices || [] });
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
class AjfChoicesOriginSerializer {
    static fromJson(origin) {
        return createChoicesOrigin(Object.assign(Object.assign({}, origin), { type: origin.type || 'fixed', name: origin.name || '' }));
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
function createFieldWithChoices(field) {
    const node = createField(Object.assign({}, field));
    return Object.assign(Object.assign(Object.assign({}, node), field), { choices: field.choices || [], forceExpanded: field.forceExpanded || false, forceNarrow: field.forceNarrow || false });
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
    const node = createNode(containerNode);
    return Object.assign(Object.assign({}, node), { nodes: containerNode.nodes || [] });
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
    const node = createNode(repeatingNode);
    return Object.assign(Object.assign(Object.assign({}, repeatingNode), node), { minReps: repeatingNode.minReps != null ? repeatingNode.minReps : 1, maxReps: repeatingNode.maxReps != null ? repeatingNode.maxReps : 0 });
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
    return Object.assign(Object.assign(Object.assign({}, createContainerNode(nodeGroup)), createRepeatingNode(nodeGroup)), { nodeType: AjfNodeType.AjfNodeGroup });
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
    return Object.assign(Object.assign(Object.assign({}, createContainerNode(nodeGroup)), createRepeatingNode(nodeGroup)), { nodeType: AjfNodeType.AjfRepeatingSlide });
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
    return Object.assign(Object.assign({}, createContainerNode(nodeGroup)), { nodeType: AjfNodeType.AjfSlide });
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
class AjfValidationGroupSerializer {
    static fromJson(group) {
        return createValidationGroup(group);
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
class AjfWarningGroupSerializer {
    static fromJson(group) {
        return createWarningGroup(group);
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
class AjfNodeSerializer {
    static fromJson(json, choicesOrigins, attachmentsOrigins) {
        const err = 'Malformed node';
        json.name = json.name || '';
        if (json.id == null || json.parent == null || json.nodeType == null) {
            throw new Error(err);
        }
        const obj = json;
        if (obj.visibility) {
            obj.visibility = AjfConditionSerializer.fromJson(obj.visibility);
        }
        obj.conditionalBranches =
            (obj.conditionalBranches || []).map(c => AjfConditionSerializer.fromJson(c));
        switch (obj.nodeType) {
            case AjfNodeType.AjfField:
                return AjfNodeSerializer._fieldFromJson(obj, choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfFieldNodeLink:
                return AjfNodeSerializer._fieldNodeLinkFromJson(obj);
            case AjfNodeType.AjfNodeGroup:
                return AjfNodeSerializer._nodeGroupFromJson(obj, choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfRepeatingSlide:
                return AjfNodeSerializer._repeatingSlideFromJson(obj, choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfSlide:
                return AjfNodeSerializer._slideFromJson(obj, choicesOrigins, attachmentsOrigins);
        }
        throw new Error(err);
    }
    static _containerNodeFromJson(json, choicesOrigins, attachmentsOrigins) {
        json.nodes = (json.nodes ||
            []).map(n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins));
        return createContainerNode(json);
    }
    static _fieldFromJson(json, choicesOrigins, attachmentsOrigins) {
        if (json.fieldType == null) {
            throw new Error('Malformed field');
        }
        const obj = json;
        if (obj.validation) {
            obj.validation = AjfValidationGroupSerializer.fromJson(obj.validation);
        }
        if (obj.warning) {
            obj.warning = AjfWarningGroupSerializer.fromJson(obj.warning);
        }
        if (json.attachmentsOriginRef) {
            obj.attachmentOrigin =
                (attachmentsOrigins || []).find(a => a.name === json.attachmentsOriginRef);
        }
        if (obj.nextSlideCondition) {
            obj.nextSlideCondition = AjfConditionSerializer.fromJson(obj.nextSlideCondition);
        }
        const isCustomFieldWithChoice = obj.fieldType > 100 && componentsMap[obj.fieldType] != null &&
            componentsMap[obj.fieldType].isFieldWithChoice === true;
        if (isCustomFieldWithChoice) {
            return AjfNodeSerializer._fieldWithChoicesFromJson(json, choicesOrigins);
        }
        switch (obj.fieldType) {
            case AjfFieldType.Formula:
                return AjfNodeSerializer._formulaFieldFromJson(json);
            case AjfFieldType.MultipleChoice:
            case AjfFieldType.SingleChoice:
                return AjfNodeSerializer._fieldWithChoicesFromJson(json, choicesOrigins);
        }
        return createField(obj);
    }
    static _fieldNodeLinkFromJson(json) {
        return Object.assign(Object.assign({}, createNode(json)), { nodeType: AjfNodeType.AjfFieldNodeLink });
    }
    static _fieldWithChoicesFromJson(json, choicesOrigins) {
        const err = 'Malformed field with choices';
        if (json.choicesOriginRef == null) {
            throw new Error(err);
        }
        const choicesOrigin = (choicesOrigins || []).find(c => c.name === json.choicesOriginRef);
        if (choicesOrigin == null) {
            throw new Error(err);
        }
        if (json.choicesFilter) {
            json.choicesFilter = AjfFormulaSerializer.fromJson(json.choicesFilter);
        }
        if (json.triggerConditions) {
            json.triggerConditions = json.triggerConditions.map(t => AjfConditionSerializer.fromJson(t));
        }
        return createFieldWithChoices(Object.assign(Object.assign({}, json), { choicesOrigin }));
    }
    static _formulaFieldFromJson(json) {
        if (json.formula) {
            json.formula = AjfFormulaSerializer.fromJson(json.formula);
        }
        return Object.assign(Object.assign({}, createField(json)), { fieldType: AjfFieldType.Formula });
    }
    static _nodeGroupFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createNodeGroup(Object.assign(Object.assign({}, AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins)), AjfNodeSerializer._repeatingNodeFromJson(json)));
    }
    static _repeatingNodeFromJson(json) {
        if (json.formulaReps) {
            json.formulaReps = AjfFormulaSerializer.fromJson(json.formulaReps);
        }
        return createRepeatingNode(json);
    }
    static _repeatingSlideFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createRepeatingSlide(Object.assign(Object.assign({}, AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins)), AjfNodeSerializer._repeatingNodeFromJson(json)));
    }
    static _slideFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createSlide(AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins));
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
class AjfFormSerializer {
    static fromJson(form, context) {
        const choicesOrigins = (form.choicesOrigins || []).map(c => AjfChoicesOriginSerializer.fromJson(c));
        const attachmentsOrigins = (form.attachmentsOrigins || []).map(a => AjfAttachmentsOriginSerializer.fromJson(a));
        const nodes = (form.nodes || [])
            .map(n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins));
        return Object.assign(Object.assign({}, form), { choicesOrigins,
            attachmentsOrigins,
            nodes, stringIdentifier: form.stringIdentifier || [], initContext: deepCopy(context || {}) });
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
let AjfTableFieldComponent = /** @class */ (() => {
    let AjfTableFieldComponent = class AjfTableFieldComponent extends AjfBaseFieldComponent {
        constructor(cdr, service, was) {
            super(cdr, service, was);
        }
        goToNextCell(ev, row, column) {
            if (this.instance.controls.length < row ||
                (this.instance.controls.length >= row && this.instance.controls[row].length < 1) ||
                this.instance.controls[row][1].length < column) {
                return;
            }
            const rowLength = this.instance.controls[row][1].length;
            const currentCell = this.instance.controls[row][1][column];
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
        }
        goToCell(row, column) {
            this._resetControls();
            this._showCell(row, column);
        }
        _resetControls() {
            this.instance.controls.forEach(row => row[1].forEach(cell => {
                if (typeof cell !== 'string') {
                    cell.show = false;
                }
            }));
        }
        _showCell(row, column) {
            if (row >= this.instance.controls.length || column >= this.instance.controls[row][1].length) {
                return;
            }
            const nextCell = this.instance.controls[row][1][column];
            if (typeof nextCell !== 'string') {
                nextCell.show = true;
            }
        }
    };
    AjfTableFieldComponent = __decorate([
        __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
        __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService, Object])
    ], AjfTableFieldComponent);
    return AjfTableFieldComponent;
})();

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
    const type = 'fixed';
    return Object.assign(Object.assign({}, createChoicesOrigin(Object.assign(Object.assign({}, origin), { type }))), { type });
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
    return Object.assign(Object.assign({}, origin), { type: 'function', label: origin.label || '', choices: origin.choices || [] });
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
    return Object.assign(Object.assign({}, origin), { type: 'observableArray', label: origin.label || '', choices: origin.choices || [] });
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
    return Object.assign(Object.assign({}, origin), { type: 'observable', label: origin.label || '', choices: origin.choices || [] });
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
    return Object.assign(Object.assign({}, origin), { type: 'promise', label: origin.label || '', choices: origin.choices || [] });
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
    return field.fieldType === AjfFieldType.Number;
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
function createForm(form = {}) {
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
        condition: `$value ? $value.toString().length <= ${maxValue.toString()} : false`,
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
        condition: `$value ? $value.toString().length >= ${minValue.toString()} : false`,
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
    return createValidation({ condition: `notEmpty($value)`, errorMessage: `Value must not be empty` });
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

export { AJF_SEARCH_ALERT_THRESHOLD, AJF_WARNING_ALERT_SERVICE, AjfAsFieldInstancePipe, AjfAsRepeatingSlideInstancePipe, AjfAttachmentsOriginSerializer, AjfBaseFieldComponent, AjfBoolToIntPipe, AjfChoicesOriginSerializer, AjfDateValuePipe, AjfDateValueStringPipe, AjfExpandFieldWithChoicesPipe, AjfFieldHost, AjfFieldIconPipe, AjfFieldIsValidPipe, AjfFieldService, AjfFieldType, AjfFieldWithChoicesComponent, AjfFormActionEvent, AjfFormField, AjfFormRenderer, AjfFormRendererService, AjfFormSerializer, AjfFormsModule, AjfGetTableCellControlPipe, AjfIncrementPipe, AjfInputFieldComponent, AjfInvalidFieldDefinitionError, AjfIsCellEditablePipe, AjfIsRepeatingSlideInstancePipe, AjfNodeCompleteNamePipe, AjfNodeSerializer, AjfNodeType, AjfRangePipe, AjfReadOnlyFieldComponent, AjfReadOnlyTableFieldComponent, AjfTableFieldComponent, AjfTableRowClass, AjfTableVisibleColumnsPipe, AjfValidSlidePipe, AjfValidationGroupSerializer, AjfValidationService, AjfWarningGroupSerializer, createChoicesFixedOrigin, createChoicesFunctionOrigin, createChoicesObservableArrayOrigin, createChoicesObservableOrigin, createChoicesOrigin, createChoicesPromiseOrigin, createContainerNode, createField, createFieldInstance, createFieldWithChoicesInstance, createForm, createNode, createNodeInstance, createValidation, createValidationGroup, createWarning, createWarningGroup, fieldIconName, flattenNodes, getTypeName, initChoicesOrigin, isChoicesFixedOrigin, isChoicesOrigin, isContainerNode, isCustomFieldWithChoices, isField, isFieldWithChoices, isNumberField, isRepeatingContainerNode, isSlidesNode, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning, createNodeGroup as ɵgc_ajf_src_core_forms_forms_a, createRepeatingSlide as ɵgc_ajf_src_core_forms_forms_b, createSlide as ɵgc_ajf_src_core_forms_forms_c, componentsMap as ɵgc_ajf_src_core_forms_forms_d };
//# sourceMappingURL=forms.js.map
