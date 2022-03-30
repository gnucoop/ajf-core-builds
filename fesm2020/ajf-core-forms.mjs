import * as i0 from '@angular/core';
import { Pipe, EventEmitter, Injectable, Directive, ViewChild, Input, InjectionToken, Component, ChangeDetectionStrategy, ViewEncapsulation, Inject, Output, ViewChildren, NgModule } from '@angular/core';
import * as i4 from '@angular/forms';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { firstValueFrom, Subject, BehaviorSubject, Subscription, Observable, of, from, timer, defer } from 'rxjs';
import { toArray, map, withLatestFrom, filter, share, startWith, scan, switchMap, distinctUntilChanged, pairwise, delayWhen, shareReplay, catchError } from 'rxjs/operators';
import { evaluateExpression, alwaysCondition, neverCondition, normalizeExpression, createCondition, createFormula, AjfExpressionUtils, getCodeIdentifiers, AjfError, AjfConditionSerializer, AjfFormulaSerializer } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { format } from 'date-fns';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import * as i3 from '@ajf/core/file-input';
import { fileIcon, AjfFileInputModule } from '@ajf/core/file-input';
import * as i2 from '@angular/common';
import { CommonModule } from '@angular/common';
import * as i4$1 from '@ajf/core/common';
import { buildStringIdentifierOpts, buildStringIdentifier, AjfCommonModule } from '@ajf/core/common';
import { AjfTranslocoModule } from '@ajf/core/transloco';
import * as i3$2 from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import * as i2$1 from '@angular/platform-browser';
import * as i3$1 from '@ngneat/transloco';
import { createPdf } from '@ajf/core/pdfmake';

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It casts an AjfNodeInstance as AjfFieldInstance.
 */
class AjfAsFieldInstancePipe {
    transform(instance) {
        return instance;
    }
}
AjfAsFieldInstancePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfAsFieldInstancePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfAsFieldInstancePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfAsFieldInstancePipe, name: "ajfAsFieldInstance" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfAsFieldInstancePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfAsFieldInstance' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It casts an AjfSlideInstance as AjfRepeatingSlideInstance.
 */
class AjfAsRepeatingSlideInstancePipe {
    transform(instance) {
        return instance;
    }
}
AjfAsRepeatingSlideInstancePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfAsRepeatingSlideInstancePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfAsRepeatingSlideInstancePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfAsRepeatingSlideInstancePipe, name: "ajfAsRepeatingSlideInstance" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfAsRepeatingSlideInstancePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfAsRepeatingSlideInstance' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * The available ajf field types.
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
    AjfFieldType[AjfFieldType["File"] = 14] = "File";
    AjfFieldType[AjfFieldType["Image"] = 15] = "Image";
    AjfFieldType[AjfFieldType["VideoUrl"] = 16] = "VideoUrl";
    AjfFieldType[AjfFieldType["Range"] = 17] = "Range";
    AjfFieldType[AjfFieldType["LENGTH"] = 18] = "LENGTH";
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
/**
 * An enum containing all the available NodeTypes
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
/**
 * Called by form-rederer
 * take as param an AjfChoicesOrigin&lt;any&gt; and return an Promise&lt;void&gt; for handling async
 * event
 */
async function initChoicesOrigin(origin) {
    /** fixed don't use async evente the promise is resolved */
    if (origin.type === 'fixed') {
        return;
    }
    /** apply function and than return resolve promise */
    if (origin.type === 'function') {
        origin.choices = origin.generator();
        return;
    }
    /** modify origin.choices with result of resolved promise */
    if (origin.type === 'promise') {
        return origin.generator.then(choices => (origin.choices = choices)).then();
    }
    /** modify origin.choices with result of subscribed observable */
    if (origin.type === 'observable') {
        if (origin.generator != null) {
            origin.choices = [];
            return firstValueFrom(origin.generator.pipe(toArray()))
                .then(choices => (origin.choices = choices))
                .then();
        }
    }
    /** modify origin.choices with result of subscribed observable */
    if (origin.type === 'observableArray') {
        if (origin.generator != null) {
            origin.choices = [];
            return firstValueFrom(origin.generator)
                .then(choices => (origin.choices = choices))
                .then();
        }
    }
    return;
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
 * The componentsMap is a dictionary key value
 * Represents the association between an AjfFieldType and the
 * components used to render it.
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
/**
 * It is true if
 *  the field is a custom field (field.fieldType &gt; 100) and
 *  the field is not already present in the component map (componentsMap[field.fieldType] != null)
 * and the field is a fieldWithChoice (componentsMap[field.fieldType].isFieldWithChoice === true)
 */
function isCustomFieldWithChoices(field) {
    return (field.fieldType > 100 &&
        componentsMap[field.fieldType] != null &&
        componentsMap[field.fieldType].isFieldWithChoice === true);
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
 * It is true if the field type is a SingleChoice or MultipleChoice.
 */
function isFieldWithChoices(field) {
    return (field.fieldType === AjfFieldType.SingleChoice || field.fieldType === AjfFieldType.MultipleChoice);
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
 * It is true if node is an AjfField.
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
/**
 * It is true if the nodeInstance is relative to a AjfField.
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
/**
 * It is true if the nodeInstance is a fieldInstance and
 * if the node of instance is a field with choices.
 */
function isFieldWithChoicesInstance(instance) {
    return (instance != null &&
        isFieldInstance(instance) &&
        (isCustomFieldWithChoices(instance.node) || isFieldWithChoices(instance.node)));
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
 * It is true if the field type is Table.
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
/**
 * It is true if the instance is a fieldInstance and
 * if the node of instance is a Table field.
 */
function isTableFieldInstance(instance) {
    return instance != null && isFieldInstance(instance) && isTableField(instance.node);
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
 * It updates instance.verifiedBranch with the idx of the last branch verified.
 * If instance.verifiedBranch value changes return true
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
/**
 * It updates instance.visible with the result of evaluating instance.visibility.condition.
 * If instance.visibility is null instance.visible is false and it returns false.
 * If instance.visible changes return true.
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
// TODO: add details
/**
 * It creates the node instance suffix.
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
// TODO: add details
/**
 * It creates the complete name of the instance.
 */
function nodeInstanceCompleteName(instance) {
    return instance != null && instance.node != null
        ? `${instance.node.name}${nodeInstanceSuffix(instance)}`
        : '';
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
            context['$value'] = instance.value;
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
/**
 * If nextSlideCondition of instance is defined return the evaluateExpression of nextSlideCondition
 * else return false.
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
/**
 * It evaluates validation and returns an AjfValidationResult.
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
/**
 * It applies evaluateValidation to every validation condition and return it.
 */
function evaluateValidationConditions(validation, context) {
    let res = [];
    (validation.conditions || []).forEach(cond => {
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
/**
 * Basic validation function that cheecks the maximum digit's length.
 * maxDigits is the associated AjfCondition
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
            clientValidation: false,
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
/**
 * Basic validation function that cheecks the maximum value of the digit
 * maxValue is the associated AjfCondition
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
            clientValidation: false,
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
/**
 * Basic validation function that cheecks the minimum digit's length.
 * minDigits is the associated AjfCondition
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
            clientValidation: false,
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
/**
 * Basic validation function that cheecks the minimum value of the digit
 * minValue is the associated AjfCondition
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
            clientValidation: false,
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
/**
 * Basic validation function that cheecks the value is not null
 * notEmpty is the associated AjfCondition
 */
function evaluateValidationNotEmpty(validation, value) {
    if (validation.notEmpty == null) {
        return null;
    }
    const ctx = { '$value': value };
    if (typeof validation.notEmpty === 'boolean') {
        return {
            result: evaluateExpression(`notEmpty($value) === ${validation.notEmpty}`, ctx),
            error: 'Value must not be empty',
            clientValidation: false,
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
/**
 * It evaluate AjfValidationGroup and returns an AjfValidationResult[].
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
/**
 * it updates the instance.valid attribute.
 * If validation is not defined the instance.valid is true.
 * If valdiation.forceValue is true update context.
 * Updates instance.valid with the re-evaluation of validationResults in AND.
 */
function updateValidation(instance, context, supplementaryInformations) {
    const validation = instance.validation;
    if (validation == null) {
        instance.valid = true;
        return;
    }
    // TODO what is this??
    if (supplementaryInformations) {
        Object.keys(supplementaryInformations).forEach(key => {
            context[`__supplementary__${key}__`] = supplementaryInformations[key];
        });
    }
    const completeName = nodeInstanceCompleteName(instance);
    if (context[completeName] != null && validation && validation.forceValue) {
        instance.value = evaluateExpression(validation.forceValue.condition, context);
        context[completeName] = instance.value;
        context['$value'] = instance.value;
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
/**
 * It Updates instance warining results.
 * If instance.warning in null return.
 * If nodeInstanceCompleteName is in context and warning is defined re-evaluate warning group
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
/**
 * It grab all the field instance update functions.
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
            context['$choice'] = c;
            context['$choiceValue'] = c.value;
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
/**
 * It is true if at least one of the triggherate coditions is true
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
/**
 * It creates an AjfNode by schema.
 * If conditionalBranches is not defined assign {condition: 'true'}.
 * If parentNode is not defined assign 0.
 * If label is not defined assign ''.
 * If visibility is not defined assign {condition: 'true'}.
 */
function createNode(node) {
    const conditionalBranches = node.conditionalBranches != null && node.conditionalBranches.length > 0
        ? node.conditionalBranches
        : [alwaysCondition()];
    return {
        ...node,
        parentNode: node.parentNode != null ? node.parentNode : 0,
        label: node.label || '',
        visibility: node.visibility || alwaysCondition(),
        conditionalBranches,
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
/**
 * It creates an AjfField.
 * If size is not defined apply 'normal'.
 * If defaultValue is not defined apply null.
 * If editable is not defined return true if field type is'nt formula or table
 */
function createField(field) {
    const node = createNode({ ...field, nodeType: AjfNodeType.AjfField });
    const editable = field.editable != null
        ? field.editable
        : field.fieldType !== AjfFieldType.Formula && field.fieldType !== AjfFieldType.Table;
    return {
        ...node,
        ...field,
        nodeType: AjfNodeType.AjfField,
        editable,
        defaultValue: field.defaultValue != null ? field.defaultValue : null,
        size: field.size || 'normal',
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
/**
 * It is true if node is AjfRepeatingSlide or AjfSlide.
 */
function isSlidesNode(node) {
    return (node != null &&
        (node.nodeType === AjfNodeType.AjfRepeatingSlide || node.nodeType === AjfNodeType.AjfSlide));
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
 * It is true if node is AjfNodeGroup or slides nodes.
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
/**
 * It is true if nodeInstance is realtive to an AjfNodeGroup or slides nodes.
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
/**
 * It creates a one dimensional array of AjfNodeInstance.
 * If the node is a containerNode(has the nodes attribute)
 * recursively  concat their nodes.
 * If includeGroups is true the result also contains the containerNodeInstance.
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
/**
 * It is true if nodeInstance is relative to AjfRepeatingSlide node or AjfSlide node.
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
/**
 * It creates a one dimensional array of AjfSlideInstance.
 * If the node is a slides node recursively  concat their nodes.
 */
function flattenNodesInstancesTree(nodes) {
    let flatTree = [];
    nodes.forEach((nodeInstance) => {
        if (isSlidesInstance(nodeInstance)) {
            flatTree.push(nodeInstance);
            nodeInstance.flatNodes = flattenNodesInstances(nodeInstance.nodes);
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
/**
 * It is true if node is an AjfNodeGroup.
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
/**
 * It is true if nodeInstance is relative to a AjfNodeGroup.
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
/**
 * It is true if node is AjfNodeGroup or AjfRepeatingSlide.
 */
function isRepeatingContainerNode(node) {
    return (node != null &&
        (node.nodeType === AjfNodeType.AjfNodeGroup || node.nodeType === AjfNodeType.AjfRepeatingSlide));
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
 * It is true if nodeInstance is a repeating container node instance.
 */
function isRepeatingContainerNodeInstance(nodeInstance) {
    return (nodeInstance != null && nodeInstance.node != null && isRepeatingContainerNode(nodeInstance.node));
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
 * It is true if nodeInstance is a repeating group instance
 */
function isRepeatingGroupInstance(nodeInstance) {
    return (nodeInstance != null &&
        nodeInstance.node != null &&
        (nodeInstance.node.nodeType === AjfNodeType.AjfNodeGroup ||
            nodeInstance.node.nodeType === AjfNodeType.AjfRepeatingSlide));
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
 * It is true if node is AjfRepeatingSlide.
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
/**
 * It is true if instance is a slide instance
 * and the relative node is AjfRepeatingSlide.
 */
function isRepeatingSlideInstance(instance) {
    return (instance != null &&
        instance.node != null &&
        isSlidesInstance(instance) &&
        isRepeatingSlide(instance.node));
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
 * It is true if node is AjfSlide.
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
/**
 * It is true if nodeInstance is relative to an AjfSlide node.
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
/**
 * It creates an AjfNodeInstance.
 * If instance.prefix is defined copy it else assign empty array.
 * If instance.visible is not defined assign true.
 * Assign empty array to conditionalBranches.
 * Assign new eventEmitter to updatedEvt.
 */
function createNodeInstance(instance) {
    return {
        node: instance.node,
        prefix: instance.prefix ? [...instance.prefix] : [],
        visible: instance.visible != null ? instance.visible : true,
        conditionalBranches: [],
        updatedEvt: new EventEmitter(),
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
/**
 * Create a field instance and init the value of the field by cascade conditions.
 *
 * First check if the value is in the context by node name.
 * Second check if the value is in the context by complete name.
 * Third check if the field has a default value.
 * Else value is null.
 *
 * If instance validationResultsis is not defined assign empty array.
 * If instance warningResults is not defined assign empty array.
 * Init valid with false.
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
        else if (instance.node.defaultValue != null) {
            context[completeName] = instance.node.defaultValue;
            value = context[completeName];
        }
    }
    return {
        ...nodeInstance,
        node: instance.node,
        value,
        valid: false,
        validationResults: instance.validationResults || [],
        warningResults: instance.warningResults || [],
        warningTrigger: new EventEmitter(),
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
/**
 * Create a field with choices instance.
 * Extends simple field instance with
 * filteredChoices,firstTriggerConditionDone and selectionTrigger
 */
function createFieldWithChoicesInstance(instance, context) {
    const fieldInstance = createFieldInstance(instance, context);
    return {
        ...fieldInstance,
        node: instance.node,
        filteredChoices: [...instance.node.choices],
        firstTriggerConditionDone: {},
        selectionTrigger: new EventEmitter(),
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
/**
 * Create an Table Fieldinstance.
 * Extends simple field instance with context,hideEmptyRows and controls.
 * If hideEmptyRows is not defined in instance set with false.
 * Assign empty array to controls
 */
function createTableFieldInstance(instance, context) {
    instance = deepCopy(instance);
    normalizeRows(instance.node);
    const fieldInstance = createFieldInstance(instance, context);
    return {
        ...fieldInstance,
        node: instance.node,
        context,
        hideEmptyRows: instance.hideEmptyRows || false,
        controls: [],
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
/**
 * It creates an AjfNodeGroupInstance.
 * It extends nodeInstance with (formulaReps,reps,nodes and flatNodes).
 * Init reps with 0.
 * Init nodes and flatNodes with empty array
 */
function createNodeGroupInstance(instance) {
    const nodeInstance = createNodeInstance(instance);
    return {
        ...nodeInstance,
        node: instance.node,
        formulaReps: instance.formulaReps,
        reps: 0,
        nodes: [],
        flatNodes: [],
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
/**
 * It creates AjfSlideInstance.
 * Init nodes,slideNodes and flatNodes with empty array.
 * Init valid with false.
 * Init position with 0.
 */
function createSlideInstance(instance) {
    const nodeInstance = createNodeInstance(instance);
    return {
        ...nodeInstance,
        node: instance.node,
        nodes: [],
        slideNodes: [],
        flatNodes: [],
        valid: false,
        position: 0,
        editable: instance.editable || true,
        readonly: instance.node.readonly || neverCondition(),
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
/**
 * It creates AjfRepeatingSlideInstance.
 * Init slideNodes, nodes and flatNodes with empty array,
 * Init reps as with 0.
 */
function createRepeatingSlideInstance(instance) {
    const { node, ...slideInstanceCreate } = instance;
    const { nodeType, ...slideNode } = node;
    const slideInstance = createSlideInstance({
        ...slideInstanceCreate,
        node: { nodeType: AjfNodeType.AjfSlide, ...slideNode },
    });
    return {
        ...slideInstance,
        node: instance.node,
        slideNodes: [],
        formulaReps: instance.formulaReps,
        disableRemoval: instance.disableRemoval,
        reps: 0,
        nodes: [],
        flatNodes: [],
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
/**
 *  Create a AjfValidationGroup, apply conditions defaults when it missing
 */
function createValidationGroup(group) {
    return { ...group, conditions: group.conditions || [] };
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
 *  Create an AjfWarningGroup, apply conditions defaults when it missing
 */
function createWarningGroup(group) {
    return { ...group, conditions: group.conditions || [] };
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
 * It returns all ancestor repeatingContainerNodes of the node.
 */
function getAncestorRepeatingNodes(allNodes, node) {
    let nodeGroups = [];
    let curParent = node.parent;
    while (curParent != null) {
        const curNode = allNodes
            .map((n) => n.node || n)
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
/**
 * Returns all childs node.name of the node's ancestor (includes itself).
 * It is a key-value dictionary, key is the name of the node and
 * value is the position inside ancestorRepeatingNodes.
 */
function getAncestorRepeatingNodesNames(allNodes, node) {
    let names = {};
    const nodeGroups = getAncestorRepeatingNodes(allNodes, node);
    nodeGroups.forEach((n, idx) => (n.nodes || []).forEach(sn => {
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
    const newConditions = conditions.map(condition => {
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
/**
 *  Create a AjfValidation, apply clientValidation and errorMessage defaults when it missing
 */
function createValidation(validation) {
    return {
        ...validation,
        clientValidation: validation.clientValidation || false,
        errorMessage: validation.errorMessage || 'Undefined Error',
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
    const newValidations = (validations || []).map(validation => {
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
    return { ...warning, warningMessage: warning.warningMessage || 'Undefined Warning' };
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
    const newWarnings = warnings.map(warning => {
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
/**
 * It creates a nodeInstance relative to a node.
 * To create the instance it calls relative create builder by nodeType.
 * If the prefix is ​​defined all formulas and conditions are calculated based on it.
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
                    instance = componentsMap[field.fieldType].createInstance({ node: field, prefix }, context);
                }
                else {
                    instance = createFieldInstance({ node: field, prefix }, context);
                }
            }
            else {
                switch (field.fieldType) {
                    case AjfFieldType.SingleChoice:
                    case AjfFieldType.MultipleChoice:
                        instance = createFieldWithChoicesInstance({ node: field, prefix }, context);
                        break;
                    case AjfFieldType.Table:
                        instance = createTableFieldInstance({ node: field, prefix }, context);
                        break;
                    default:
                        instance = createFieldInstance({ node: field, prefix }, context);
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
                instance.visibility =
                    newVisibility !== oldVisibility
                        ? createCondition({ condition: newVisibility })
                        : node.visibility;
            }
            const conditionalBranches = instance.node.conditionalBranches != null && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = getInstanceConditions(conditionalBranches, ancestorsNames, prefix);
            if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                const formulaReps = instance.node.formulaReps;
                if (formulaReps != null) {
                    const oldFormula = formulaReps.formula;
                    let newFormula = normalizeExpression(oldFormula, ancestorsNames, prefix);
                    instance.formulaReps =
                        newFormula !== oldFormula ? createFormula({ formula: newFormula }) : formulaReps;
                }
            }
            else if (isFieldInstance(instance)) {
                if (instance.node.formula) {
                    instance.formula = getInstanceFormula(instance.node.formula, ancestorsNames, prefix);
                }
                if (instance.node.validation != null) {
                    const newConditions = getInstanceValidations(instance.node.validation.conditions, ancestorsNames, prefix);
                    if (newConditions !== instance.node.validation.conditions) {
                        instance.validation = createValidationGroup(instance.node.validation);
                        instance.validation.conditions = newConditions;
                    }
                    else {
                        instance.validation = instance.node.validation;
                    }
                }
                if (instance.node.warning != null) {
                    const newWarnings = getInstanceWarnings(instance.node.warning.conditions, ancestorsNames, prefix);
                    if (newWarnings !== instance.node.warning.conditions) {
                        instance.warning = createWarningGroup(instance.node.warning);
                        instance.warning.conditions = newWarnings;
                    }
                    else {
                        instance.warning = instance.node.warning;
                    }
                }
                if (instance.node.nextSlideCondition != null) {
                    instance.nextSlideCondition = getInstanceCondition(instance.node.nextSlideCondition, ancestorsNames, prefix);
                }
                if (isFieldWithChoicesInstance(instance)) {
                    if (instance.node.choicesFilter != null) {
                        instance.choicesFilter = getInstanceFormula(instance.node.choicesFilter, ancestorsNames, prefix);
                    }
                    if (instance.node.triggerConditions != null) {
                        instance.triggerConditions = getInstanceConditions(instance.node.triggerConditions, ancestorsNames, prefix);
                    }
                }
            }
        }
        else {
            instance.visibility = instance.node.visibility;
            const conditionalBranches = instance.node.conditionalBranches != null && instance.node.conditionalBranches.length > 0
                ? instance.node.conditionalBranches
                : [alwaysCondition()];
            instance.conditionalBranches = conditionalBranches;
            if (isNodeGroupInstance(instance) || isRepeatingSlideInstance(instance)) {
                const rgInstance = instance;
                rgInstance.formulaReps = rgInstance.node.formulaReps;
            }
            else if (isFieldInstance(instance)) {
                instance.validation = instance.node.validation;
                instance.warning = instance.node.warning;
                instance.nextSlideCondition = instance.node.nextSlideCondition;
                if (isFieldWithChoicesInstance(instance)) {
                    instance.choicesFilter = instance.node.choicesFilter;
                    instance.triggerConditions = instance.node.triggerConditions;
                }
                instance.formula = instance.node.formula;
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
function updateEditability(instance, context) {
    if (instance.readonly == null) {
        instance.editable = true;
        return true;
    }
    const readOnly = instance.readonly;
    const oldEditability = instance.editable;
    let newEditability = !evaluateExpression(readOnly.condition, context);
    if (newEditability !== instance.editable) {
        instance.editable = newEditability;
    }
    return oldEditability !== newEditability;
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
 * It creates an one dimensional array of AjfNode.
 * If the node is a containerNode(has the nodes attribute)
 * recursively  concat their nodes.
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
/**
 * It is return a new orderered nodes.
 * The newNodes are ordered recursively by parentNode.
 * The sorting begins by parent
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
/**
 * It upodates AjfRepeatingNodeInstance reps and it returns oldReps.
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
/**
 * It checks if the idx slide of
 *
 * @export
 * @param slide
 * @param idx
 * @return boolean
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
class AjfValidationService {
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
        return numbro(num).format(fmt);
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
      }`,
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
        const functionsStr = this._functions
            .map(f => (typeof f === 'string' ? f : f.toString()))
            .join('; ');
        this._functionsStr = `${this._baseUtilFunctions.join('; ')}; ${functionsStr}`;
        AjfExpressionUtils.UTIL_FUNCTIONS = this._functionsStr;
    }
}
AjfValidationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfValidationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfValidationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfValidationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
const updateSlideValidity = (slide) => {
    const subNodesNum = slide.flatNodes.length;
    let valid = true;
    for (let i = 0; i < subNodesNum; i++) {
        const subNode = slide.flatNodes[i];
        if (subNode.visible && isFieldInstance(subNode) && !subNode.valid) {
            valid = false;
            break;
        }
    }
    if (slide.valid !== valid) {
        slide.valid = valid;
    }
};
class AjfFormRendererService {
    constructor(_) {
        this._editabilityNodesMapUpdates = new Subject();
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
        this.formInitEvent = this
            ._formInitEvent;
        this._formGroup = new BehaviorSubject(null);
        this.formGroup = this
            ._formGroup;
        this._form = new BehaviorSubject(null);
        this._nodesUpdates = new Subject();
        this._formGroupSubscription = Subscription.EMPTY;
        this._valueChanged = new Subject();
        this._nextSlideTrigger = new EventEmitter();
        this.nextSlideTrigger = this
            ._nextSlideTrigger;
        this._slidesNum = new BehaviorSubject(0);
        this.slidesNum = this._slidesNum;
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
        if (form != null &&
            Object.keys(context).length === 0 &&
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
        return this.formGroup.pipe(map(f => {
            if (field == null) {
                return null;
            }
            const fieldName = nodeInstanceCompleteName(field);
            return f != null && f.contains(fieldName) ? f.controls[fieldName] : null;
        }));
    }
    _initErrorsStreams() {
        this._errorPositions = this._valueChanged.pipe(withLatestFrom(this._nodes, this._form), filter(([_, __, form]) => form != null &&
            form.form != null), map(([_, nodes, formDef]) => {
            const form = formDef.form;
            let currentPosition = 0;
            const errors = [];
            nodes.forEach(node => {
                if (isRepeatingSlideInstance(node)) {
                    for (let i = 0; i < node.reps; i++) {
                        if (node.visible) {
                            currentPosition++;
                            if (i == 0) {
                                node.position = currentPosition;
                            }
                            if (!validSlide(node, i)) {
                                errors.push(currentPosition);
                            }
                        }
                    }
                }
                else if (isSlideInstance(node)) {
                    if (node.visible) {
                        currentPosition++;
                        node.position = currentPosition;
                        if (!node.valid) {
                            errors.push(currentPosition);
                        }
                    }
                }
            });
            form.valid = errors.length == 0;
            this._slidesNum.next(currentPosition);
            return errors;
        }), share());
        this._errors = this._errorPositions.pipe(map(e => (e != null ? e.length : 0)), startWith(0), share());
    }
    _initUpdateMapStreams() {
        const startValue = () => ({});
        this._editabilityNodesMap = (this._editabilityNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._visibilityNodesMap = (this._visibilityNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._repetitionNodesMap = (this._repetitionNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._conditionalBranchNodesMap = (this._conditionalBranchNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._formulaNodesMap = (this._formulaNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._validationNodesMap = (this._validationNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._warningNodesMap = (this._warningNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._filteredChoicesNodesMap = (this._filteredChoicesNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._triggerConditionsNodesMap = (this._triggerConditionsNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._nextSlideConditionsNodesMap = (this._nextSlideConditionsNodesMapUpdates).pipe(scan((rmap, op) => {
            return op(rmap);
        }, {}), startWith(startValue()), share());
        this._nodesMaps = [
            this._editabilityNodesMap,
            this._visibilityNodesMap,
            this._repetitionNodesMap,
            this._conditionalBranchNodesMap,
            this._formulaNodesMap,
            this._validationNodesMap,
            this._warningNodesMap,
            this._nextSlideConditionsNodesMap,
            this._filteredChoicesNodesMap,
            this._triggerConditionsNodesMap,
        ];
    }
    _initFormStreams() {
        const formObs = this._form;
        formObs
            .pipe(map(_form => {
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
            return from(Promise.all(choicesOrigins.map(co => initChoicesOrigin(co)))).pipe(map(() => form));
        }), map(formDef => {
            return (_nodesInstances) => {
                let nodes;
                if (formDef != null &&
                    formDef.form != null) {
                    const form = formDef;
                    const baseNodes = form.form.nodes;
                    nodes = this._orderedNodesInstancesTree(flattenNodes(baseNodes), baseNodes, undefined, [], form.context || {});
                }
                else {
                    nodes = [];
                }
                let currentPosition = 0;
                nodes.forEach(node => {
                    if (isRepeatingSlideInstance(node)) {
                        for (let i = 0; i < node.reps; i++) {
                            if (node.visible) {
                                currentPosition++;
                                if (i == 0) {
                                    node.position = currentPosition;
                                }
                            }
                        }
                    }
                    else if (isSlideInstance(node)) {
                        if (node.visible) {
                            currentPosition++;
                            node.position = currentPosition;
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
        if (instance == null) {
            return null;
        }
        if (isRepeatingGroupInstance(instance)) {
            this._explodeRepeatingNode(allNodes, instance, context);
        }
        else if (isSlideInstance(instance)) {
            instance.nodes = this._orderedNodesInstancesTree(allNodes, instance.node.nodes, instance.node.id, prefix, context);
            updateEditability(instance, context);
        }
        updateVisibility(instance, context, branchVisibility);
        updateConditionalBranches(instance, context);
        if (isFieldInstance(instance)) {
            if (isFieldWithChoicesInstance(instance)) {
                updateFilteredChoices(instance, context);
            }
            else {
                if (isTableFieldInstance(instance)) {
                    const { node } = instance;
                    instance.context = context[nodeInstanceCompleteName(instance)] || context;
                    const formGroup = this._formGroup.getValue();
                    let controlsWithLabels = [];
                    controlsWithLabels.push([node.label, node.columnLabels]);
                    if (formGroup != null) {
                        const rowsNum = node.rows.length;
                        for (let rowIdx = 0; rowIdx < rowsNum; rowIdx++) {
                            const row = node.rows[rowIdx];
                            let r = [];
                            const cellNum = row.length;
                            for (let idx = 0; idx < cellNum; idx++) {
                                let cell = row[idx];
                                if (typeof cell === 'string') {
                                    cell = { formula: cell };
                                }
                                /*
                                every control is registered with the cell position
                                inside the form control matrix
                                with this mask `${tNode.name}__${rowIdx}__${idx}`
                                */
                                const name = `${node.name}__${rowIdx}__${idx}`;
                                const type = (node.columnTypes && node.columnTypes[idx]) || 'number';
                                const tableFormControl = {
                                    control: new FormControl(),
                                    show: false,
                                    type,
                                };
                                const value = instance.context[cell.formula] && type === 'number'
                                    ? +instance.context[cell.formula]
                                    : instance.context[cell.formula];
                                tableFormControl.control.setValue(value);
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
                                    updatedEvt: new EventEmitter(),
                                };
                                this._addToNodesFormulaMap(fakeInstance, cell.formula);
                            }
                            controlsWithLabels.push([node.rowLabels[rowIdx], r]);
                        }
                        instance.controls = controlsWithLabels;
                    }
                }
                else {
                    instance.value = context[nodeInstanceCompleteName(instance)];
                }
            }
            updateFieldInstanceState(instance, context);
        }
        this._addNodeInstance(instance);
        return instance;
    }
    _adjustReps(allNodes, instance, oldReps, context) {
        const newReps = instance.reps;
        const result = {
            added: null,
            removed: null,
        };
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
                    label: instance.node.label,
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
                const orderedListNodes = orderedNodes(group.nodes, instance.node.id);
                orderedListNodes.forEach(n => {
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
            result.removed.forEach(n => {
                this._removeNodeInstance(n);
            });
        }
        if (oldReps != newReps && instance.formulaReps == null) {
            const fg = this._formGroup.getValue();
            const completeName = nodeInstanceCompleteName(instance);
            if (fg != null && fg.contains(completeName)) {
                fg.controls[completeName].setValue(instance.reps);
            }
        }
        instance.flatNodes = flattenNodesInstances(instance.nodes);
        if (isRepeatingSlideInstance(instance)) {
            const slideNodes = [];
            const nodesPerSlide = instance.nodes != null ? instance.nodes.length / instance.reps : 0;
            for (let i = 0; i < instance.reps; i++) {
                const startNode = i * nodesPerSlide;
                slideNodes.push(instance.nodes.slice(startNode, startNode + nodesPerSlide));
            }
            instance.slideNodes = slideNodes;
        }
        return result;
    }
    _updateFormValueAndValidity() {
        this._nodesUpdates
            .pipe(withLatestFrom(this._formGroup), filter(([_, fg]) => fg !== null))
            .subscribe(([_, fg]) => {
            const form = fg;
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
            const branchVisibility = parentNodeInstance != null
                ? parentNodeInstance.verifiedBranch != null &&
                    parentNodeInstance.verifiedBranch == node.parentNode
                : true;
            const nni = this._initNodeInstance(allNodes, node, prefix, context, branchVisibility);
            if (nni != null) {
                nodesInstances.push(nni);
            }
        });
        return nodesInstances;
    }
    _formValueDelta(oldValue, newValue) {
        const allKeys = [];
        [...Object.keys(oldValue), ...Object.keys(newValue)].forEach(key => {
            if (key !== '$value' && allKeys.indexOf(key) === -1) {
                allKeys.push(key);
            }
        });
        return allKeys.filter(k => oldValue[k] !== newValue[k]);
    }
    _initFormGroupStreams(formGroup) {
        this._formGroupSubscription.unsubscribe();
        let init = true;
        let initForm = true;
        this._formInitEvent.emit(0 /* Initializing */);
        this._formGroupSubscription = formGroup.valueChanges
            .pipe(startWith({}), distinctUntilChanged((a, b) => JSON.stringify(a) === JSON.stringify(b)), pairwise(), withLatestFrom(this._nodesMaps[0], this._nodesMaps[1], this._nodesMaps[2], this._nodesMaps[3], this._nodesMaps[4], this._nodesMaps[5], this._nodesMaps[6], this._nodesMaps[7], this._nodesMaps[8], this._nodesMaps[9], this._flatNodes))
            .subscribe(v => {
            const oldFormValue = (init && {}) || v[0][0];
            init = false;
            const newFormValue = v[0][1];
            const editability = v[1];
            const visibilityMap = v[2];
            const repetitionMap = v[3];
            const conditionalBranchesMap = v[4];
            const formulaMap = v[5];
            const validationMap = v[6];
            const warningMap = v[7];
            const nextSlideConditionsMap = v[8];
            const filteredChoicesMap = v[9];
            const triggerConditionsMap = v[10];
            const nodes = v[11];
            // takes the names of the fields that have changed
            const delta = this._formValueDelta(oldFormValue, newFormValue);
            const deltaLen = delta.length;
            let updatedNodes = [];
            /*
                            for each field update all properties map
                            with the following rule  "if fieldname is in map update it" and
                            push on updateNodes the node instance that wrap field
                          */
            delta.forEach(fieldName => {
                updatedNodes = updatedNodes.concat(nodes.filter(n => nodeInstanceCompleteName(n) === fieldName));
                if (editability[fieldName] != null) {
                    editability[fieldName].forEach(nodeInstance => {
                        if (isSlideInstance(nodeInstance)) {
                            updateEditability(nodeInstance, newFormValue);
                        }
                    });
                }
                if (visibilityMap[fieldName] != null) {
                    visibilityMap[fieldName].forEach(nodeInstance => {
                        updateVisibilityMapEntry(nodeInstance, this._formGroup, newFormValue);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (repetitionMap[fieldName] != null) {
                    repetitionMap[fieldName].forEach(nodeInstance => {
                        updateRepetitionMapEntry(nodeInstance, newFormValue, nodes, this._adjustReps);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (conditionalBranchesMap[fieldName] != null) {
                    conditionalBranchesMap[fieldName].forEach(nodeInstance => {
                        updateConditionalBranchesMapEntry(nodeInstance, newFormValue, nodes, this._showSubtree, this._hideSubtree);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (formulaMap[fieldName] != null) {
                    formulaMap[fieldName].forEach(nodeInstance => {
                        updateFormulaMapEntry(nodeInstance, newFormValue, this._formGroup);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (validationMap[fieldName] != null) {
                    validationMap[fieldName].forEach(nodeInstance => {
                        updateValidationMapEntry(nodeInstance, newFormValue, this.currentSupplementaryInformations);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (warningMap[fieldName] != null) {
                    warningMap[fieldName].forEach(nodeInstance => {
                        updateWarningMapEntry(nodeInstance, newFormValue);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (deltaLen == 1 && nextSlideConditionsMap[fieldName] != null) {
                    if (nextSlideConditionsMap[fieldName].filter(nodeInstance => {
                        if (isFieldInstance(nodeInstance)) {
                            return updateNextSlideCondition(nodeInstance, newFormValue);
                        }
                        return false;
                    }).length == 1) {
                        this._nextSlideTrigger.emit();
                    }
                }
                if (filteredChoicesMap[fieldName] != null) {
                    filteredChoicesMap[fieldName].forEach(nodeInstance => {
                        updateFilteredChoicesMapEntry(nodeInstance, newFormValue);
                        if (updatedNodes.indexOf(nodeInstance) === -1) {
                            updatedNodes.push(nodeInstance);
                        }
                    });
                }
                if (deltaLen == 1 && triggerConditionsMap[fieldName] != null) {
                    const res = triggerConditionsMap[fieldName].filter(nodeInstance => {
                        if (!isFieldWithChoicesInstance(nodeInstance)) {
                            return false;
                        }
                        return updateTriggerConditions(nodeInstance, newFormValue);
                    });
                    if (res.length == 1 && isFieldWithChoicesInstance(res[0])) {
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
                        updateSlideValidity(curNode);
                        curNode.updatedEvt.emit();
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
        subNodes.forEach(n => {
            if (!isContainer ||
                (isContainer && node.node.nodes.find(cn => cn.id == n.node.id) == null)) {
                updateVisibility(n, context, visible);
                if (isFieldInstance(n)) {
                    updateFormula(n, context);
                }
                this._updateSubtreeVisibility(context, nodes, n, visible);
            }
        });
    }
    _initNodesStreams() {
        this._nodes = this._nodesUpdates.pipe(scan((nodes, op) => {
            return op(nodes);
        }, []), share());
        this._flatNodesTree = this._nodes.pipe(map(nodes => flattenNodesInstancesTree(nodes)), share());
        this._flatNodes = this._flatNodesTree.pipe(map(slides => {
            let nodes = [];
            slides.forEach(s => {
                nodes.push(s);
                nodes = nodes.concat(s.flatNodes);
                updateSlideValidity(s);
            });
            return nodes;
        }), share());
    }
    _removeNodeInstance(nodeInstance) {
        const nodeName = nodeInstanceCompleteName(nodeInstance);
        const fg = this._formGroup.getValue();
        if (fg != null) {
            const curValue = fg.value;
            const newFormValue = { ...curValue, [nodeName]: undefined };
            fg.patchValue(newFormValue);
        }
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
            this._removeNodesEditabilityMapIndex(nodeName);
            return this._removeSlideInstance(nodeInstance);
        }
        else if (isRepeatingContainerNodeInstance(nodeInstance)) {
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
        if (isRepeatingContainerNodeInstance(fieldInstance)) {
            if (fieldInstance.formulaReps != null) {
                this._removeFromNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach(condition => {
                this._removeFromNodesValidationMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach(condition => {
                this._removeFromNodesWarningMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._removeFromNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isFieldWithChoicesInstance(fieldInstance)) {
            if (fieldInstance.choicesFilter != null) {
                this._removeFromNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
                if (fieldInstance.triggerConditions != null) {
                    fieldInstance.triggerConditions.forEach(condition => {
                        this._removeFromNodesTriggerConditionsMap(fieldInstance, condition.condition);
                    });
                }
            }
        }
        return fieldInstance;
    }
    _addNodeInstance(nodeInstance) {
        if (isRepeatingContainerNodeInstance(nodeInstance)) {
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
            if (fieldInstance.formulaReps != null) {
                this._addToNodesRepetitionMap(fieldInstance, fieldInstance.formulaReps.formula);
            }
        }
        if (fieldInstance.validation != null && fieldInstance.validation.conditions != null) {
            fieldInstance.validation.conditions.forEach(condition => {
                this._addToNodesValidationMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.warning != null) {
            fieldInstance.warning.conditions.forEach(condition => {
                this._addToNodesWarningMap(fieldInstance, condition.condition);
            });
        }
        if (fieldInstance.nextSlideCondition != null) {
            this._addToNodesNextSlideConditionsMap(fieldInstance, fieldInstance.nextSlideCondition.condition);
        }
        if (isFieldWithChoicesInstance(fieldInstance)) {
            if (fieldInstance.choicesFilter != null) {
                this._addToNodesFilteredChoicesMap(fieldInstance, fieldInstance.choicesFilter.formula);
            }
            if (fieldInstance.triggerConditions != null) {
                fieldInstance.triggerConditions.forEach((condition) => {
                    this._addToNodesTriggerConditionsMap(fieldInstance, condition.condition);
                });
            }
        }
        return fieldInstance;
    }
    _addSlideInstance(slideInstance) {
        const slide = slideInstance.node;
        if (slide.readonly != null) {
            this._addToNodesEditabilityMap(slideInstance, slide.readonly.condition);
        }
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
    _removeNodesEditabilityMapIndex(index) {
        this._removeNodesMapIndex(this._editabilityNodesMapUpdates, index);
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
        const tokens = getCodeIdentifiers(formula);
        if (tokens.length > 0) {
            nodesMap.next((vmap) => {
                tokens.forEach(token => {
                    if (vmap[token] != null) {
                        const idx = vmap[token].indexOf(nodeInstance);
                        if (idx > -1) {
                            vmap[token].splice(idx, 1);
                            if (vmap[token].length == 0) {
                                delete vmap[token];
                            }
                        }
                    }
                });
                return vmap;
            });
        }
    }
    _addToNodesEditabilityMap(nodeInstance, formula) {
        this._addToNodesMap(this._editabilityNodesMapUpdates, nodeInstance, formula);
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
        const tokens = getCodeIdentifiers(formula);
        if (tokens.length > 0) {
            nodesMap.next((vmap) => {
                tokens.forEach(token => {
                    if (vmap[token] == null) {
                        vmap[token] = [];
                    }
                    if (vmap[token].indexOf(nodeInstance) === -1) {
                        vmap[token].push(nodeInstance);
                    }
                });
                return vmap;
            });
        }
    }
}
AjfFormRendererService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormRendererService, deps: [{ token: AjfValidationService }], target: i0.ɵɵFactoryTarget.Injectable });
AjfFormRendererService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormRendererService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormRendererService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return [{ type: AjfValidationService }]; } });
const updateVisibilityMapEntry = (nodeInstance, formGroup, newFormValue) => {
    const completeName = nodeInstanceCompleteName(nodeInstance);
    const visibilityChanged = updateVisibility(nodeInstance, newFormValue);
    const isField = isFieldInstance(nodeInstance);
    if (visibilityChanged && !nodeInstance.visible) {
        const fg = formGroup.getValue();
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
        const fg = formGroup.getValue();
        const res = updateFormula(nodeInstance, newFormValue);
        if (fg != null && res.changed) {
            fg.controls[completeName].setValue(res.value);
        }
    }
};
const updateRepetitionMapEntry = (nodeInstance, newFormValue, nodes, cb) => {
    if (isRepeatingContainerNodeInstance(nodeInstance)) {
        const oldReps = updateRepsNum(nodeInstance, newFormValue);
        if (oldReps !== nodeInstance.reps) {
            cb(nodes, nodeInstance, oldReps, newFormValue);
        }
    }
};
const updateConditionalBranchesMapEntry = (nodeInstance, newFormValue, nodes, showCb, hideCb) => {
    // const branchChanged =
    // nodeInstance.updateConditionalBranches(newFormValue);
    updateConditionalBranches(nodeInstance, newFormValue);
    // if (branchChanged) {
    const verifiedBranch = nodeInstance.verifiedBranch;
    nodeInstance.conditionalBranches.forEach((_condition, idx) => {
        if (idx == verifiedBranch) {
            showCb(newFormValue, nodes, nodeInstance, idx);
        }
        else {
            hideCb(newFormValue, nodes, nodeInstance, idx);
        }
    });
    // }
};
const updateFormulaMapEntry = (nodeInstance, newFormValue, formGroup) => {
    if (isFieldInstance(nodeInstance)) {
        const res = updateFormula(nodeInstance, newFormValue);
        const fg = formGroup.getValue();
        if (fg != null && res.changed) {
            updateValidation(nodeInstance, newFormValue);
            fg.controls[nodeInstanceCompleteName(nodeInstance)].setValue(res.value);
        }
    }
};
const updateValidationMapEntry = (nodeInstance, newFormValue, supp) => {
    if (isFieldInstance(nodeInstance)) {
        newFormValue.$value = newFormValue[nodeInstanceCompleteName(nodeInstance)];
        updateValidation(nodeInstance, newFormValue, supp);
    }
};
const updateWarningMapEntry = (nodeInstance, newFormValue) => {
    if (isFieldInstance(nodeInstance)) {
        updateWarning(nodeInstance, newFormValue);
        if (nodeInstance.warningResults != null &&
            nodeInstance.warningResults.filter(warning => warning.result).length > 0) {
            nodeInstance.warningTrigger.emit();
        }
    }
};
const updateFilteredChoicesMapEntry = (nodeInstance, newFormValue) => {
    if (isFieldWithChoicesInstance(nodeInstance)) {
        updateFilteredChoices(nodeInstance, newFormValue);
    }
};

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It rappresents the base field component, the first overlay of ajfFieldInstance.
 * It keeps a reference to the relative control of the form.
 * It manages the component update in conjunction with the instance update.
 * It manages the warningTrigger of the instance by displaying a confirmation
 * popup when an alert event is triggered.
 * @export
 * @abstract
 * @class AjfBaseFieldComponent
 * @template T
 */
class AjfBaseFieldComponent {
    constructor(_changeDetectorRef, _service, _warningAlertService) {
        this._changeDetectorRef = _changeDetectorRef;
        this._service = _service;
        this._warningAlertService = _warningAlertService;
        this._warningTriggerSub = Subscription.EMPTY;
        this._instanceUpdateSub = Subscription.EMPTY;
        this._control = defer(() => this._service
            .getControl(this.instance)
            .pipe(map(ctrl => (ctrl || new FormControl()))));
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
        if (this.instance != null) {
            this._warningTriggerSub = this.instance.warningTrigger
                .pipe(withLatestFrom(this.control), filter(([_, ctrl]) => ctrl != null))
                .subscribe(([_, ctrl]) => {
                if (this.instance == null || this.instance.warningResults == null) {
                    return;
                }
                const control = ctrl;
                const s = this._warningAlertService
                    .showWarningAlertPrompt(this.instance.warningResults.filter(w => w.result).map(w => w.warning))
                    .subscribe({
                    next: (r) => {
                        if (r.result) {
                            control.setValue(null);
                        }
                    },
                    error: (_e) => {
                        if (s) {
                            s.unsubscribe();
                        }
                    },
                    complete: () => {
                        if (s) {
                            s.unsubscribe();
                        }
                    },
                });
            });
        }
    }
    ngOnDestroy() {
        this._warningTriggerSub.unsubscribe();
        this._instanceUpdateSub.unsubscribe();
    }
    // TODO: why?
    _onInstanceChange() { }
    _setUpInstanceUpdate() {
        this._instanceUpdateSub.unsubscribe();
        if (this._instance != null) {
            this._instanceUpdateSub = this._instance.updatedEvt.subscribe(() => {
                if (this._changeDetectorRef) {
                    try {
                        this._changeDetectorRef.detectChanges();
                    }
                    catch (e) { }
                }
            });
        }
        else {
            this._instanceUpdateSub = Subscription.EMPTY;
        }
        this._changeDetectorRef.detectChanges();
    }
}
AjfBaseFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfBaseFieldComponent, deps: "invalid", target: i0.ɵɵFactoryTarget.Directive });
AjfBaseFieldComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfBaseFieldComponent, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfBaseFieldComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined }]; } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It casts a boolean as number.
 */
class AjfBoolToIntPipe {
    transform(value) {
        return value ? 1 : 0;
    }
}
AjfBoolToIntPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfBoolToIntPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfBoolToIntPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfBoolToIntPipe, name: "ajfBoolToInt" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfBoolToIntPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfBoolToInt' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It returns a Date.
 * if date is 'today' it return a now Date.
 */
class AjfDateValuePipe {
    transform(date) {
        if (date == null) {
            return null;
        }
        return date === 'today' ? new Date() : date;
    }
}
AjfDateValuePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDateValuePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfDateValuePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDateValuePipe, name: "ajfDateValue" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDateValuePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfDateValue' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It formats Date with 'yyyy-MM-dd'
 * @param date the date to format
 * @return the format date
 */
class AjfDateValueStringPipe {
    transform(date) {
        if (date == null) {
            return undefined;
        }
        const dateObj = date === 'today' ? new Date() : date;
        return format(dateObj, 'yyyy-MM-dd');
    }
}
AjfDateValueStringPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDateValueStringPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfDateValueStringPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDateValueStringPipe, name: "ajfDateValueString" });
AjfDateValueStringPipe.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDateValueStringPipe });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfDateValueStringPipe, decorators: [{
            type: Injectable
        }, {
            type: Pipe,
            args: [{ name: 'ajfDateValueString' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
/**
 * It returns true if AjfFieldWithChoices is forceExpanded and filteredChoices length is
 * less than equal threshold.
 */
class AjfExpandFieldWithChoicesPipe {
    transform(instance, threshold) {
        return (!instance.node.forceNarrow &&
            (instance.node.forceExpanded ||
                (instance.filteredChoices && instance.filteredChoices.length <= threshold)));
    }
}
AjfExpandFieldWithChoicesPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfExpandFieldWithChoicesPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfExpandFieldWithChoicesPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfExpandFieldWithChoicesPipe, name: "ajfExpandFieldWithChoices" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfExpandFieldWithChoicesPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfExpandFieldWithChoices' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It Applies a viewContainerRef to a component selector.
 */
// eslint-disable-next-line
class AjfFieldHost {
    constructor(viewContainerRef) {
        this.viewContainerRef = viewContainerRef;
    }
}
AjfFieldHost.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldHost, deps: [{ token: i0.ViewContainerRef }], target: i0.ɵɵFactoryTarget.Directive });
AjfFieldHost.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfFieldHost, selector: "[ajf-field-host]", ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldHost, decorators: [{
            type: Directive,
            args: [{ selector: '[ajf-field-host]' }]
        }], ctorParameters: function () { return [{ type: i0.ViewContainerRef }]; } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It is a base wrapper of every ajfField.
 * It manages what type of component to load(editable component or readonly component)
 * by input instance.
 *
 * @export
 * @abstract
 * @class AjfFormField
 */
class AjfFormField {
    constructor(_cdr) {
        this._cdr = _cdr;
        /**
         * if true mean that component need to be a readonly component
         *
         * @private
         */
        this._readonly = false;
        this._init = false;
        this._updatedSub = Subscription.EMPTY;
    }
    get instance() {
        return this._instance;
    }
    set instance(instance) {
        if (this._instance !== instance) {
            this._instance = instance;
            if (this._instance != null && this._instance.node && !this._instance.node.editable) {
                this._readonly = true;
            }
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
        if (!this._readonly &&
            this._instance != null &&
            this._instance.node &&
            !this._instance.node.editable) {
            this._readonly = true;
        }
        if (this._init) {
            this._loadComponent();
        }
    }
    ngAfterViewInit() {
        this._loadComponent();
    }
    ngOnDestroy() {
        this._updatedSub.unsubscribe();
    }
    ngOnInit() {
        this._init = true;
        this._loadComponent();
    }
    /**
     * It builds a new AjfField component by fieldType and binds it to the fieldHost.
     *
     * @private
     * @return {*}
     */
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
        const component = this._readonly && componentDef.readOnlyComponent
            ? componentDef.readOnlyComponent
            : componentDef.component;
        try {
            const componentRef = vcr.createComponent(component);
            this._componentInstance = componentRef.instance;
            this._componentInstance.instance = this._instance;
            const componentInstance = this._componentInstance;
            if (componentDef.inputs) {
                Object.keys(componentDef.inputs).forEach(key => {
                    if (key in componentInstance) {
                        componentInstance[key] = componentDef.inputs[key];
                    }
                });
            }
            this._instance.updatedEvt.subscribe(() => this._cdr.markForCheck());
        }
        catch (e) {
            console.log(e);
        }
    }
}
AjfFormField.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormField, deps: [{ token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
AjfFormField.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfFormField, inputs: { instance: "instance", readonly: "readonly" }, viewQueries: [{ propertyName: "fieldHost", first: true, predicate: AjfFieldHost, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormField, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }]; }, propDecorators: { fieldHost: [{
                type: ViewChild,
                args: [AjfFieldHost]
            }], instance: [{
                type: Input
            }], readonly: [{
                type: Input
            }] } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 *
 * @return a string that indetified the icon relative to type
 * ex. ajf-icon-field-string, ajf-icon-field-number, ajf-icon-field-text ecc.
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
/**
 *
 *
 * @param Field.
 *
 * @return An icon class name relative to the AjfType.
 */
class AjfFieldIconPipe {
    transform(field) {
        return fieldIconName(typeof field === 'number' ? field : field.fieldType);
    }
}
AjfFieldIconPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldIconPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfFieldIconPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldIconPipe, name: "ajfFieldIcon" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldIconPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfFieldIcon' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It returns true if all validationResults are true.
 *
 */
class AjfFieldIsValidPipe {
    transform(validationResults) {
        return validationResults != null && validationResults.filter(f => !f.result).length === 0;
    }
}
AjfFieldIsValidPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldIsValidPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfFieldIsValidPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldIsValidPipe, name: "ajfFieldIsValid" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFieldIsValidPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfFieldIsValid' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
    /**
     * It allows to register custom fields inside an Ajf form.
     * @param fieldType is the field type of the custom field. Values from 0 to 100 are reserved to
     *     Ajf.
     * @param component It is the custom component that implement an AjfBaseFieldComponent.
     * @param readOnlyComponent It is the readonly custom component that implement an
     *     AjfBaseFieldComponent.
     * @createInstance The signature and return type of the method used for create Instance.
     * @isFieldWithChoice If true, the field has choices.
     */
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
/**
 * It rappresents the base componet for every ajf fields with choiches.
 *
 * @export
 * @abstract
 * @class AjfFieldWithChoicesComponent
 * @template T
 */
class AjfFieldWithChoicesComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, warningAlertService, searchThreshold) {
        super(cdr, service, warningAlertService);
        this._searchThreshold = 6;
        if (searchThreshold != null) {
            this._searchThreshold = searchThreshold;
        }
    }
    /**
     * It represents the threshold below which the choices are displayed
     * in expanded mode.
     *
     * @readonly
     */
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
/**
 * It allows the loading of files inside an AjfForm through an AjfFileInput.
 *
 * @export
 * @class AjfFileFieldComponent
 */
class AjfFileFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfFileFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFileFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfFileFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfFileFieldComponent, selector: "ajf-file-field", usesInheritance: true, ngImport: i0, template: "<ajf-file-input *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-file-input>\n", styles: [""], components: [{ type: i3.AjfFileInput, selector: "ajf-file-input", inputs: ["accept", "value"], outputs: ["valueChange"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }], pipes: { "async": i2.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFileFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-file-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-file-input *ngIf=\"control|async as ctrl\" [formControl]=\"ctrl!\"></ajf-file-input>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; } });

class AjfFormRenderer {
    /**
     * this constructor will init current formula by ajfBuilderService
     */
    constructor(_rendererService, _changeDetectorRef) {
        this._rendererService = _rendererService;
        this._changeDetectorRef = _changeDetectorRef;
        // ajfFieldTypes [ Text, Number, Boolean, SingleChoice, MultipleChoice,
        // Formula, Empty, Composed, LENGTH ]
        this.ajfFieldTypes = AjfFieldType;
        this.title = '';
        this._orientationChange = new EventEmitter();
        this.orientationChange = this
            ._orientationChange;
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
        this.formAction = this
            ._formAction;
        this.formGroup = _rendererService.formGroup;
        this.slides = _rendererService.nodesTree;
        this._errorPositions = _rendererService.errorPositions;
        this.errors = _rendererService.errors;
        this.slidesNum = _rendererService.slidesNum;
        this.formIsInit = _rendererService.formInitEvent.pipe(map(e => e === 1 /* Complete */));
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
        let s = this._rendererService
            .addGroup(nodeGroup)
            .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
            .subscribe({
            next: r => {
                if (r && this.formSlider != null) {
                    this.formSlider.slide({ dir: 'down' });
                }
            },
            error: _e => {
                if (s) {
                    s.unsubscribe();
                }
            },
            complete: () => {
                if (s) {
                    s.unsubscribe();
                }
            },
        });
    }
    /**
     * this method will remove group
     */
    removeGroup(nodeGroup) {
        let s = this._rendererService
            .removeGroup(nodeGroup)
            .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
            .subscribe({
            next: r => {
                if (r && this.formSlider != null) {
                    this.formSlider.slide({ dir: 'up' });
                }
            },
            error: _e => {
                if (s) {
                    s.unsubscribe();
                }
            },
            complete: () => {
                if (s) {
                    s.unsubscribe();
                }
            },
        });
    }
    onSave(_evt) {
        this._formAction.emit({
            source: this,
            action: 'save',
            value: this._rendererService.getFormValue(),
        });
    }
    onFormAction(_evt, action) {
        this._formAction.emit({
            source: this,
            value: this._rendererService.getFormValue(),
            action: action,
        });
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
            this._errorMoveSubscription = this._errorMoveEvent
                .pipe(withLatestFrom(this._errorPositions))
                .subscribe(([move, errs]) => {
                const currentPosition = this.formSlider.currentPage - +this.hasStartMessage + 1;
                if (errs == null) {
                    return;
                }
                const errors = errs;
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
                this.formSlider.slide({
                    to: move ? errors[nextIdx] - 1 : errors[prevIdx] - 1,
                });
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
    scrollToSlide(slide) {
        this.formSlider.slide({ to: slide.position - 1 });
    }
    orientationChangeHandler(orientation) {
        this.orientation = orientation;
    }
    trackNodeById(_, node) {
        return nodeInstanceCompleteName(node);
    }
}
AjfFormRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormRenderer, deps: [{ token: AjfFormRendererService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
AjfFormRenderer.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfFormRenderer, inputs: { title: "title", saveDisabled: "saveDisabled", hasStartMessage: "hasStartMessage", hasEndMessage: "hasEndMessage", hideTopToolbar: "hideTopToolbar", hideBottomToolbar: "hideBottomToolbar", hideNavigationButtons: "hideNavigationButtons", fixedOrientation: "fixedOrientation", readonly: "readonly", orientation: "orientation", form: "form" }, outputs: { orientationChange: "orientationChange", formAction: "formAction" }, viewQueries: [{ propertyName: "formSlider", first: true, predicate: ["formSlider"], descendants: true }, { propertyName: "fields", predicate: AjfFormField, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormRenderer, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: AjfFormRendererService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { title: [{
                type: Input
            }], orientationChange: [{
                type: Output
            }], saveDisabled: [{
                type: Input
            }], hasStartMessage: [{
                type: Input
            }], hasEndMessage: [{
                type: Input
            }], hideTopToolbar: [{
                type: Input
            }], hideBottomToolbar: [{
                type: Input
            }], hideNavigationButtons: [{
                type: Input
            }], fixedOrientation: [{
                type: Input
            }], readonly: [{
                type: Input
            }], orientation: [{
                type: Input
            }], formSlider: [{
                type: ViewChild,
                args: ['formSlider', { static: false }]
            }], fields: [{
                type: ViewChildren,
                args: [AjfFormField]
            }], formAction: [{
                type: Output
            }], form: [{
                type: Input
            }] } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It is true if the field type is a MultipleChoice.
 */
function isMultipleChoiceField(field) {
    return field.fieldType === AjfFieldType.MultipleChoice;
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
 * It is true if the field type is a SingleChoice.
 */
function isSingleChoiceField(field) {
    return field.fieldType === AjfFieldType.SingleChoice;
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
 * It builds a string that contains information preview about the form and its context.
 */
const buildFormStringIdentifier = (form, context, opts) => {
    if (form == null) {
        return '';
    }
    const stringIdentifier = form.stringIdentifier || [];
    if (stringIdentifier.length === 0) {
        return '';
    }
    const fields = flattenNodes(form.nodes).filter(n => isField(n) && isFieldWithChoices(n));
    if (fields.length > 0) {
        context = { ...context };
        fields.forEach(field => {
            const value = context[field.name];
            if (value == null) {
                return;
            }
            if (isSingleChoiceField(field)) {
                const choice = field.choicesOrigin.choices.find(c => c.value === value);
                if (choice == null) {
                    return;
                }
                context[field.name] = choice.label;
            }
            else if (isMultipleChoiceField(field) && Array.isArray(value) && value.length > 0) {
                const strings = buildStringIdentifierOpts(opts);
                const choices = field.choicesOrigin.choices.filter(c => value.indexOf(c.value) > -1);
                context[field.name] = choices.map(c => c.label).join(strings.valuesDivider);
            }
        });
    }
    return buildStringIdentifier(stringIdentifier, context, opts);
};

/**
 * it returns a form string identifier.
 *
 * @export
 * @class AjfFormStringIdentifierPipe
 */
class AjfFormStringIdentifierPipe {
    transform(form, context, opts) {
        return buildFormStringIdentifier(form, context, opts);
    }
}
AjfFormStringIdentifierPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormStringIdentifierPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfFormStringIdentifierPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormStringIdentifierPipe, name: "ajfFormStringIdentifier" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormStringIdentifierPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfFormStringIdentifier' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It filters the type of ctrl.
 * return null or a valid AjfTableFormControl.
 *
 * @export
 * @class AjfGetTableCellControlPipe
 */
class AjfGetTableCellControlPipe {
    transform(ctrl) {
        if (ctrl == null || typeof ctrl === 'string') {
            return null;
        }
        return ctrl;
    }
}
AjfGetTableCellControlPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfGetTableCellControlPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfGetTableCellControlPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfGetTableCellControlPipe, name: "ajfGetTableCellControl" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfGetTableCellControlPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfGetTableCellControl' }]
        }] });

/**
 * It allows the loading of image url inside an AjfForm.
 *
 * @export
 * @class AjfImageFieldComponent
 */
class AjfImageFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer) {
        super(cdr, service, was);
        const fileStream = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), shareReplay(1));
        this.imageUrl = fileStream.pipe(map(file => domSanitizer.bypassSecurityTrustResourceUrl(file.content)));
    }
}
AjfImageFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfImageFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2$1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
AjfImageFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfImageFieldComponent, selector: "ajf-image-field", usesInheritance: true, ngImport: i0, template: "<ajf-file-input *ngIf=\"control|async as ctrl\" accept=\"image/*\" [formControl]=\"ctrl!\">\n  <div ajfFilePreview class=\"ajf-image-preview\">\n    <img [src]=\"imageUrl|async\">\n  </div>\n</ajf-file-input>\n", styles: ["ajf-image-field img{min-width:32px;min-height:32px}\n"], components: [{ type: i3.AjfFileInput, selector: "ajf-file-input", inputs: ["accept", "value"], outputs: ["valueChange"] }], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i4.NgControlStatus, selector: "[formControlName],[ngModel],[formControl]" }, { type: i4.FormControlDirective, selector: "[formControl]", inputs: ["formControl", "disabled", "ngModel"], outputs: ["ngModelChange"], exportAs: ["ngForm"] }, { type: i3.AjfFilePreview, selector: "[ajfFilePreview]", exportAs: ["ajfFilePreview"] }], pipes: { "async": i2.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfImageFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-image-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ajf-file-input *ngIf=\"control|async as ctrl\" accept=\"image/*\" [formControl]=\"ctrl!\">\n  <div ajfFilePreview class=\"ajf-image-preview\">\n    <img [src]=\"imageUrl|async\">\n  </div>\n</ajf-file-input>\n", styles: ["ajf-image-field img{min-width:32px;min-height:32px}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: i2$1.DomSanitizer }]; } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It increments the value parameter by increment offset parameter.
 *
 * @export
 * @class AjfIncrementPipe
 */
class AjfIncrementPipe {
    transform(value, increment = 1) {
        return value + increment;
    }
}
AjfIncrementPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIncrementPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfIncrementPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIncrementPipe, name: "ajfIncrement" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIncrementPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfIncrement' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * it checks if the cell parameter is an editable AjfTableCell.
 *
 * @export
 * @class AjfIsCellEditablePipe
 */
class AjfIsCellEditablePipe {
    transform(cell) {
        if (cell == null || typeof cell === 'string') {
            return false;
        }
        return cell.editable === true;
    }
}
AjfIsCellEditablePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIsCellEditablePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfIsCellEditablePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIsCellEditablePipe, name: "ajfIsCellEditable" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIsCellEditablePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfIsCellEditable' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It checks if the AjfNodeInstance parameter is an Formula AjfField.
 *
 * @export
 * @class AjfIsReadonlyInputFieldPipe
 */
class AjfIsReadonlyInputFieldPipe {
    transform(instance) {
        return isFieldInstance(instance) && instance.node.fieldType === AjfFieldType.Formula;
    }
}
AjfIsReadonlyInputFieldPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIsReadonlyInputFieldPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfIsReadonlyInputFieldPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIsReadonlyInputFieldPipe, name: "ajfIsReadonlyInputField" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIsReadonlyInputFieldPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfIsReadonlyInputField' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It checks if the AjfNodeInstance parameter is an isRepeatingSlideInstance.
 *
 * @export
 * @class AjfIsRepeatingSlideInstancePipe
 */
class AjfIsRepeatingSlideInstancePipe {
    transform(instance) {
        return isRepeatingSlideInstance(instance);
    }
}
AjfIsRepeatingSlideInstancePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIsRepeatingSlideInstancePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfIsRepeatingSlideInstancePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIsRepeatingSlideInstancePipe, name: "ajfIsRepeatingSlideInstance" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfIsRepeatingSlideInstancePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfIsRepeatingSlideInstance' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It returns a completeName of AjfNodeInstance paramenter.
 *
 * @export
 * @class AjfNodeCompleteNamePipe
 */
class AjfNodeCompleteNamePipe {
    transform(instance) {
        return instance ? nodeInstanceCompleteName(instance) : '';
    }
}
AjfNodeCompleteNamePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfNodeCompleteNamePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfNodeCompleteNamePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfNodeCompleteNamePipe, name: "ajfNodeCompleteName" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfNodeCompleteNamePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfNodeCompleteName' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It returns a array of numbers.
 * The numbers are incremental by step.
 *
 * @export
 * @class AjfRangePipe
 */
class AjfRangePipe {
    transform(size = 0, start = 1, step = 1) {
        const range = [];
        for (let length = 0; length < size; ++length) {
            range.push(start);
            start += step;
        }
        return range;
    }
}
AjfRangePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfRangePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfRangePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfRangePipe, name: "ajfRange" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfRangePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfRange' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It is an AjfBaseFieldComponent where the type can be only text or number.
 * Type is text by default.
 *
 * @export
 * @abstract
 * @class AjfInputFieldComponent
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
/**
 * this component show the control value inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyFieldComponent
 */
class AjfReadOnlyFieldComponent extends AjfInputFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfReadOnlyFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlyFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfReadOnlyFieldComponent, selector: "ajf-read-only-field", usesInheritance: true, ngImport: i0, template: "<span *ngIf=\"control|async as ctrl\">{{ctrl.value}}</span>\n", styles: ["ajf-read-only-field span{min-height:1em;display:block}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i2.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-read-only-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<span *ngIf=\"control|async as ctrl\">{{ctrl.value}}</span>\n", styles: ["ajf-read-only-field span{min-height:1em;display:block}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * This component allows you to download the file contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyFileFieldComponent
 */
class AjfReadOnlyFileFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer) {
        super(cdr, service, was);
        this.fileIcon = domSanitizer.bypassSecurityTrustResourceUrl(fileIcon);
        const fileStream = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), shareReplay(1));
        this.fileUrl = fileStream.pipe(map(file => domSanitizer.bypassSecurityTrustResourceUrl(file.content)));
        this.fileName = fileStream.pipe(map(file => file.name));
    }
}
AjfReadOnlyFileFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyFileFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2$1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlyFileFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfReadOnlyFileFieldComponent, selector: "ajf-read-only-file-field", usesInheritance: true, ngImport: i0, template: "<a *ngIf=\"fileUrl|async as fu ; else noFile\" [href]=\"fu\" [download]=\"fileName|async\">\n  <img [src]=\"fileIcon\"> {{ fileName|async }}\n</a>\n<ng-template #noFile>\n  <div class=\"ajf-no-file-placeholder\"></div>\n</ng-template>\n", styles: ["ajf-read-only-file-field img{width:32px;height:32px;margin-right:8px;vertical-align:middle}ajf-read-only-file-field .ajf-no-file-placeholder{width:100%;height:32px;background-color:#eee}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i2.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyFileFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-read-only-file-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<a *ngIf=\"fileUrl|async as fu ; else noFile\" [href]=\"fu\" [download]=\"fileName|async\">\n  <img [src]=\"fileIcon\"> {{ fileName|async }}\n</a>\n<ng-template #noFile>\n  <div class=\"ajf-no-file-placeholder\"></div>\n</ng-template>\n", styles: ["ajf-read-only-file-field img{width:32px;height:32px;margin-right:8px;vertical-align:middle}ajf-read-only-file-field .ajf-no-file-placeholder{width:100%;height:32px;background-color:#eee}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: i2$1.DomSanitizer }]; } });

/**
 * This component allows you to show the image related to url contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyImageFieldComponent
 */
class AjfReadOnlyImageFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer) {
        super(cdr, service, was);
        const fileStream = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), shareReplay(1));
        this.imageUrl = fileStream.pipe(map(file => domSanitizer.bypassSecurityTrustResourceUrl(file.content)));
    }
}
AjfReadOnlyImageFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyImageFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2$1.DomSanitizer }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlyImageFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfReadOnlyImageFieldComponent, selector: "ajf-read-only-image-field", usesInheritance: true, ngImport: i0, template: "<img *ngIf=\"imageUrl|async as iu ; else noImage\" [src]=\"imageUrl|async\">\n<ng-template #noImage>\n  <div class=\"ajf-no-image-placeholder\"></div>\n</ng-template>\n", styles: ["ajf-read-only-image-field .ajf-no-image-placeholder{width:100%;height:32px;background-color:#eee}\n"], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i2.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyImageFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-read-only-image-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<img *ngIf=\"imageUrl|async as iu ; else noImage\" [src]=\"imageUrl|async\">\n<ng-template #noImage>\n  <div class=\"ajf-no-image-placeholder\"></div>\n</ng-template>\n", styles: ["ajf-read-only-image-field .ajf-no-image-placeholder{width:100%;height:32px;background-color:#eee}\n"] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: i2$1.DomSanitizer }]; } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * This component allows you to show the values of AjfFieldWithChoicesInstance
 * contained in the control of the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlySelectFieldComponent
 */
class AjfReadOnlySelectFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this.multiple = this.control.pipe(filter(control => control != null), map(() => this.instance != null && this.instance.node.fieldType === AjfFieldType.MultipleChoice));
    }
}
AjfReadOnlySelectFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlySelectFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlySelectFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfReadOnlySelectFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<ng-container *ngIf=\"control|async as ctrl\">\n    <ng-container *ngFor=\"let choice of instance!.filteredChoices; let idx = index\">\n        <ng-container *ngIf=\"multiple|async; else singleChoice\">\n            <span *ngIf=\"ctrl.value && ctrl.value?.indexOf(choice.value) > -1\">\n                {{choice.label|transloco}}{{ctrl.value[ctrl.value.length - 1] !== choice.value ? ', ': ''}}\n            </span>\n        </ng-container>\n        <ng-template #singleChoice>\n            <span *ngIf=\"ctrl.value === choice.value\">{{choice.label|transloco}}</span>\n        </ng-template>\n    </ng-container>\n</ng-container>\n", styles: [""], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }], pipes: { "async": i2.AsyncPipe, "transloco": i3$1.TranslocoPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlySelectFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<ng-container *ngIf=\"control|async as ctrl\">\n    <ng-container *ngFor=\"let choice of instance!.filteredChoices; let idx = index\">\n        <ng-container *ngIf=\"multiple|async; else singleChoice\">\n            <span *ngIf=\"ctrl.value && ctrl.value?.indexOf(choice.value) > -1\">\n                {{choice.label|transloco}}{{ctrl.value[ctrl.value.length - 1] !== choice.value ? ', ': ''}}\n            </span>\n        </ng-container>\n        <ng-template #singleChoice>\n            <span *ngIf=\"ctrl.value === choice.value\">{{choice.label|transloco}}</span>\n        </ng-template>\n    </ng-container>\n</ng-container>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It returns a string that indetifies if the value is even or odd.
 *
 * @export
 * @class AjfTableRowClass
 */
class AjfTableRowClass {
    transform(value) {
        return value % 2 == 0 ? 'ajf-row-even' : 'ajf-row-odd';
    }
}
AjfTableRowClass.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableRowClass, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfTableRowClass.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableRowClass, name: "ajfTableRowClass" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableRowClass, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfTableRowClass' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * This component allows you to shows the values contained in the controls of
 * the form inherited from AjfBaseFieldComponent with AjfTableFieldInstance.
 *
 * @export
 * @class AjfReadOnlyTableFieldComponent
 */
class AjfReadOnlyTableFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
    }
}
AjfReadOnlyTableFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyTableFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlyTableFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfReadOnlyTableFieldComponent, selector: "ng-component", usesInheritance: true, ngImport: i0, template: "<table *ngIf=\"instance\" class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns && columns.length > 0 && columns[0]\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns && columns.length > 1 && columns[1]\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n              <ng-container *ngIf=\"contr\">\n                <span *ngIf=\"row > 0; else labelCell\"\n                  class=\"ajf-table-cell\">{{ contr.control!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span>\n                <ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template>\n              </ng-container>\n            </ng-container>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n", styles: [""], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }, { type: i2.NgForOf, selector: "[ngFor][ngForOf]", inputs: ["ngForOf", "ngForTrackBy", "ngForTemplate"] }, { type: i2.NgClass, selector: "[ngClass]", inputs: ["class", "ngClass"] }], pipes: { "ajfTableRowClass": AjfTableRowClass, "ajfFormatIfNumber": i4$1.FormatIfNumber, "ajfTranslateIfString": i4$1.TranslateIfString, "ajfGetTableCellControl": AjfGetTableCellControlPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyTableFieldComponent, decorators: [{
            type: Component,
            args: [{ changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<table *ngIf=\"instance\" class=\"ajf-table-field\">\n  <ng-container *ngIf=\"instance.node as node\">\n    <ng-container *ngFor=\"let columns of instance.controls; let row = index\">\n      <tr [ngClass]=\"row | ajfTableRowClass\">\n        <td>\n          <ng-container *ngIf=\"columns && columns.length > 0 && columns[0]\">\n            {{ columns[0] | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}\n          </ng-container>\n        </td>\n        <ng-container *ngIf=\"columns && columns.length > 1 && columns[1]\">\n          <td *ngFor=\"let c of columns[1]; let column = index\">\n            <ng-container *ngIf=\"c|ajfGetTableCellControl as contr\">\n              <ng-container *ngIf=\"contr\">\n                <span *ngIf=\"row > 0; else labelCell\"\n                  class=\"ajf-table-cell\">{{ contr.control!.value | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</span>\n                <ng-template #labelCell>{{ contr | ajfTranslateIfString | ajfFormatIfNumber: '.0-2' }}</ng-template>\n              </ng-container>\n            </ng-container>\n          </td>\n        </ng-container>\n      </tr>\n    </ng-container>\n  </ng-container>\n</table>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; } });

/**
 * It allows the loading of video(youtube or vimeo) url inside an AjfForm.
 *
 * @export
 * @class AjfVideoUrlFieldComponent
 */
class AjfVideoUrlFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer, httpClient) {
        super(cdr, service, was);
        const video = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), map(value => getVideoProviderAndId(value)));
        this.validUrl = video.pipe(map(v => v != null));
        this.videoThumbnail = video.pipe(filter(info => info != null), switchMap(info => videoPreviewUrl(httpClient, info)), filter(url => url != null), map(url => domSanitizer.bypassSecurityTrustResourceUrl(url)));
    }
}
AjfVideoUrlFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfVideoUrlFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2$1.DomSanitizer }, { token: i3$2.HttpClient }], target: i0.ɵɵFactoryTarget.Directive });
AjfVideoUrlFieldComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfVideoUrlFieldComponent, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfVideoUrlFieldComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: i2$1.DomSanitizer }, { type: i3$2.HttpClient }]; } });
/**
 * it returns a url of thumbnail related to video or null.
 *
 * @param httpClient
 * @param video
 * @return {*}
 */
function videoPreviewUrl(httpClient, video) {
    if (video.provider === 'youtube') {
        return of(`https://img.youtube.com/vi/${video.id}/default.jpg`);
    }
    if (video.provider === 'vimeo') {
        return httpClient
            .get(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${video.id}`)
            .pipe(map(response => response.thumbnail_url), catchError(() => of(null)));
    }
    return of('');
}
/**
 * It checks the url param, if url is an youtube o vimeo domain return
 * an videoInfo else null
 *
 * @param url
 * @return {*}
 */
function getVideoProviderAndId(url) {
    let provider = null;
    let id = null;
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
    return { provider, id };
}
/**
 * it gets the id of vimeo video url.
 *
 * @param url
 * @return {*}
 */
function getVimeoVideoId(url) {
    if (url.includes('#')) {
        url = url.split('#')[0];
    }
    if (url.includes('?') && !url.includes('clip_id=')) {
        url = url.split('?')[0];
    }
    let id = null;
    let arr;
    const vimeoPipe = [
        'https?://vimeo.com/[0-9]+$',
        'https?://player.vimeo.com/video/[0-9]+$',
        'https?://vimeo.com/channels',
        'groups',
        'album',
    ].join('|');
    const vimeoRegex = new RegExp(vimeoPipe, 'gim');
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
/**
 * it gets the id of youtube video url.
 *
 * @param url
 * @return {*}
 */
function getYouTubeVideoId(url) {
    const shortcode = /youtube:\/\/|https?:\/\/youtu\.be\/|http:\/\/y2u\.be\//g;
    if (shortcode.test(url)) {
        const shortcodeId = url.split(shortcode)[1];
        return stripParameters(shortcodeId);
    }
    // /v/ or /vi/
    const inlinev = /\/v\/|\/vi\//g;
    if (inlinev.test(url)) {
        const inlineId = url.split(inlinev)[1];
        return stripParameters(inlineId);
    }
    // v= or vi=
    const parameterV = /v=|vi=/g;
    if (parameterV.test(url)) {
        const arr = url.split(parameterV);
        return arr[1].split('&')[0];
    }
    // v= or vi=
    const parameterWebp = /\/an_webp\//g;
    if (parameterWebp.test(url)) {
        const webp = url.split(parameterWebp)[1];
        return stripParameters(webp);
    }
    // embed
    const embedReg = /\/embed\//g;
    if (embedReg.test(url)) {
        const embedId = url.split(embedReg)[1];
        return stripParameters(embedId);
    }
    // ignore /user/username pattern
    const usernameReg = /\/user\/([a-zA-Z0-9]*)$/g;
    if (usernameReg.test(url)) {
        return null;
    }
    // user
    const userReg = /\/user\/(?!.*videos)/g;
    if (userReg.test(url)) {
        const elements = url.split('/');
        return stripParameters(elements.pop());
    }
    // attribution_link
    const attrReg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;
    if (attrReg.test(url)) {
        return url.match(attrReg)[1];
    }
    return null;
}
function stripParameters(url) {
    // Split parameters or split folder separator
    if (url.includes('?')) {
        return url.split('?')[0];
    }
    else if (url.includes('/')) {
        return url.split('/')[0];
    }
    return url;
}

/**
 * This component allows you to show the video related to url contained in the control of
 * the form inherited from AjfBaseFieldComponent.
 *
 * @export
 * @class AjfReadOnlyVideoUrlFieldComponent
 */
class AjfReadOnlyVideoUrlFieldComponent extends AjfVideoUrlFieldComponent {
    constructor(cdr, service, was, domSanitizer, httpClient) {
        super(cdr, service, was, domSanitizer, httpClient);
    }
}
AjfReadOnlyVideoUrlFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyVideoUrlFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2$1.DomSanitizer }, { token: i3$2.HttpClient }], target: i0.ɵɵFactoryTarget.Component });
AjfReadOnlyVideoUrlFieldComponent.ɵcmp = i0.ɵɵngDeclareComponent({ minVersion: "12.0.0", version: "13.2.5", type: AjfReadOnlyVideoUrlFieldComponent, selector: "ajf-read-only-video-url-field", usesInheritance: true, ngImport: i0, template: "<div *ngIf=\"control|async as ctrl\" class=\"ajf-video-thumbnail\">\n  <ng-container *ngIf=\"validUrl|async\">\n    <a target=\"_blank\" [href]=\"ctrl.value\">\n      <img *ngIf=\"videoThumbnail|async as thumb\" [src]=\"thumb\" class=\"\" alt=\"\">\n    </a>\n  </ng-container>\n</div>\n", styles: [""], directives: [{ type: i2.NgIf, selector: "[ngIf]", inputs: ["ngIf", "ngIfThen", "ngIfElse"] }], pipes: { "async": i2.AsyncPipe }, changeDetection: i0.ChangeDetectionStrategy.OnPush, encapsulation: i0.ViewEncapsulation.None });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfReadOnlyVideoUrlFieldComponent, decorators: [{
            type: Component,
            args: [{ selector: 'ajf-read-only-video-url-field', changeDetection: ChangeDetectionStrategy.OnPush, encapsulation: ViewEncapsulation.None, template: "<div *ngIf=\"control|async as ctrl\" class=\"ajf-video-thumbnail\">\n  <ng-container *ngIf=\"validUrl|async\">\n    <a target=\"_blank\" [href]=\"ctrl.value\">\n      <img *ngIf=\"videoThumbnail|async as thumb\" [src]=\"thumb\" class=\"\" alt=\"\">\n    </a>\n  </ng-container>\n</div>\n", styles: [""] }]
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: i2$1.DomSanitizer }, { type: i3$2.HttpClient }]; } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It returns all visible columns of form table.
 *
 * @export
 * @class AjfTableVisibleColumnsPipe
 */
// TODO helpful? currently not used
class AjfTableVisibleColumnsPipe {
    transform(instance) {
        if (!instance.node.editable) {
            const val = instance.value || [];
            return instance.hideEmptyRows
                ? val
                    .filter(col => col[1].reduce((prev, cur) => {
                    return prev || (cur != null && cur !== '' && cur !== 0 && cur !== '0');
                }, false))
                    .map(v => [v[0], ...v[1]])
                : val.map(v => [v[0], ...v[1]]);
        }
        return (instance.controls || []).map(v => [
            v[0],
            ...v[1],
        ]);
    }
}
AjfTableVisibleColumnsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableVisibleColumnsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfTableVisibleColumnsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableVisibleColumnsPipe, name: "ajfTableVisibleColumns" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableVisibleColumnsPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfTableVisibleColumns' }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 * It checks if idx is a valid index for slide parameter.
 *
 * @export
 * @class AjfValidSlidePipe
 */
class AjfValidSlidePipe {
    transform(slide, idx) {
        if (idx == null || typeof idx !== 'number') {
            return false;
        }
        return validSlide(slide, idx);
    }
}
AjfValidSlidePipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfValidSlidePipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfValidSlidePipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfValidSlidePipe, name: "ajfValidSlide", pure: false });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfValidSlidePipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfValidSlide', pure: false }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
class AjfFormsModule {
}
AjfFormsModule.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormsModule, deps: [], target: i0.ɵɵFactoryTarget.NgModule });
AjfFormsModule.ɵmod = i0.ɵɵngDeclareNgModule({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormsModule, declarations: [AjfAsFieldInstancePipe,
        AjfAsRepeatingSlideInstancePipe,
        AjfBoolToIntPipe,
        AjfDateValuePipe,
        AjfDateValueStringPipe,
        AjfExpandFieldWithChoicesPipe,
        AjfFieldHost,
        AjfFieldIconPipe,
        AjfFieldIsValidPipe,
        AjfFileFieldComponent,
        AjfFormStringIdentifierPipe,
        AjfGetTableCellControlPipe,
        AjfImageFieldComponent,
        AjfIncrementPipe,
        AjfIsCellEditablePipe,
        AjfIsReadonlyInputFieldPipe,
        AjfIsRepeatingSlideInstancePipe,
        AjfNodeCompleteNamePipe,
        AjfRangePipe,
        AjfReadOnlyFieldComponent,
        AjfReadOnlyFileFieldComponent,
        AjfReadOnlyImageFieldComponent,
        AjfReadOnlySelectFieldComponent,
        AjfReadOnlyTableFieldComponent,
        AjfReadOnlyVideoUrlFieldComponent,
        AjfTableRowClass,
        AjfTableVisibleColumnsPipe,
        AjfValidSlidePipe], imports: [AjfCommonModule,
        AjfFileInputModule,
        CommonModule,
        HttpClientModule,
        ReactiveFormsModule,
        AjfTranslocoModule], exports: [AjfAsFieldInstancePipe,
        AjfAsRepeatingSlideInstancePipe,
        AjfBoolToIntPipe,
        AjfDateValuePipe,
        AjfDateValueStringPipe,
        AjfExpandFieldWithChoicesPipe,
        AjfFieldHost,
        AjfFieldIconPipe,
        AjfFieldIsValidPipe,
        AjfFileFieldComponent,
        AjfFormStringIdentifierPipe,
        AjfGetTableCellControlPipe,
        AjfImageFieldComponent,
        AjfIncrementPipe,
        AjfIsCellEditablePipe,
        AjfIsReadonlyInputFieldPipe,
        AjfIsRepeatingSlideInstancePipe,
        AjfNodeCompleteNamePipe,
        AjfRangePipe,
        AjfReadOnlyFieldComponent,
        AjfReadOnlyFileFieldComponent,
        AjfReadOnlyImageFieldComponent,
        AjfReadOnlySelectFieldComponent,
        AjfReadOnlyTableFieldComponent,
        AjfReadOnlyVideoUrlFieldComponent,
        AjfTableRowClass,
        AjfTableVisibleColumnsPipe,
        AjfValidSlidePipe] });
AjfFormsModule.ɵinj = i0.ɵɵngDeclareInjector({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormsModule, providers: [AjfDateValueStringPipe, AjfFormRendererService, AjfValidationService], imports: [[
            AjfCommonModule,
            AjfFileInputModule,
            CommonModule,
            HttpClientModule,
            ReactiveFormsModule,
            AjfTranslocoModule,
        ]] });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormsModule, decorators: [{
            type: NgModule,
            args: [{
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
                        AjfFormStringIdentifierPipe,
                        AjfGetTableCellControlPipe,
                        AjfImageFieldComponent,
                        AjfIncrementPipe,
                        AjfIsCellEditablePipe,
                        AjfIsReadonlyInputFieldPipe,
                        AjfIsRepeatingSlideInstancePipe,
                        AjfNodeCompleteNamePipe,
                        AjfRangePipe,
                        AjfReadOnlyFieldComponent,
                        AjfReadOnlyFileFieldComponent,
                        AjfReadOnlyImageFieldComponent,
                        AjfReadOnlySelectFieldComponent,
                        AjfReadOnlyTableFieldComponent,
                        AjfReadOnlyVideoUrlFieldComponent,
                        AjfTableRowClass,
                        AjfTableVisibleColumnsPipe,
                        AjfValidSlidePipe,
                    ],
                    imports: [
                        AjfCommonModule,
                        AjfFileInputModule,
                        CommonModule,
                        HttpClientModule,
                        ReactiveFormsModule,
                        AjfTranslocoModule,
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
                        AjfFormStringIdentifierPipe,
                        AjfGetTableCellControlPipe,
                        AjfImageFieldComponent,
                        AjfIncrementPipe,
                        AjfIsCellEditablePipe,
                        AjfIsReadonlyInputFieldPipe,
                        AjfIsRepeatingSlideInstancePipe,
                        AjfNodeCompleteNamePipe,
                        AjfRangePipe,
                        AjfReadOnlyFieldComponent,
                        AjfReadOnlyFileFieldComponent,
                        AjfReadOnlyImageFieldComponent,
                        AjfReadOnlySelectFieldComponent,
                        AjfReadOnlyTableFieldComponent,
                        AjfReadOnlyVideoUrlFieldComponent,
                        AjfTableRowClass,
                        AjfTableVisibleColumnsPipe,
                        AjfValidSlidePipe,
                    ],
                    entryComponents: [
                        AjfFileFieldComponent,
                        AjfImageFieldComponent,
                        AjfReadOnlyFieldComponent,
                        AjfReadOnlyFileFieldComponent,
                        AjfReadOnlyImageFieldComponent,
                        AjfReadOnlySelectFieldComponent,
                        AjfReadOnlyTableFieldComponent,
                        AjfReadOnlyVideoUrlFieldComponent,
                    ],
                    providers: [AjfDateValueStringPipe, AjfFormRendererService, AjfValidationService],
                }]
        }] });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
/**
 *  Create a attachmentsOrigin&lt;T&gt;, apply attachments defaults when it missing
 */
function createAttachmentsOrigin(origin) {
    return {
        ...origin,
        attachments: origin.attachments || [],
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
/**
 *  Create an AjfAttachmentsOrigin by json schema, throw error if name isn't defined
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
/**
 *  Create a AjfChoicesOrigin&lt;T&gt;, apply label and choices defaults when it missing
 */
function createChoicesOrigin(origin) {
    return {
        ...origin,
        type: origin.type,
        label: origin.label || '',
        choices: origin.choices || [],
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
/**
 *  Create an AjfChoicesOrigin by json schema, apply a default value for type and name
 */
class AjfChoicesOriginSerializer {
    static fromJson(origin) {
        return createChoicesOrigin({
            ...origin,
            type: origin.type || 'fixed',
            name: origin.name || '',
        });
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
 * Create an AjfFieldWithChoice.
 * If choices is not defined apply empty array.
 * If forceExpanded is not defined apply false.
 * If forceNarrow is not defined apply false.
 */
function createFieldWithChoices(field) {
    const node = createField({ ...field });
    return {
        ...node,
        ...field,
        choices: field.choices || [],
        forceExpanded: field.forceExpanded || false,
        forceNarrow: field.forceNarrow || false,
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
/**
 * It creates an AjfContainerNode by schema.
 * Extends AjfNode with nodes.
 * if nodes is not defined assign empty array
 */
function createContainerNode(containerNode) {
    const node = createNode(containerNode);
    return {
        ...node,
        nodes: containerNode.nodes || [],
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
/**
 * It creates an AjfRepeatingNode.
 * It extends AjfNode with formulaReps, minReps, maxReps by schema.
 * If minReps is not defined assign 1.
 * If maxReps is not defined assign 0.
 */
function createRepeatingNode(repeatingNode) {
    const node = createNode(repeatingNode);
    return {
        ...repeatingNode,
        ...node,
        minReps: repeatingNode.minReps != null ? repeatingNode.minReps : 1,
        maxReps: repeatingNode.maxReps != null ? repeatingNode.maxReps : 0,
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
/**
 * It creates a AjfNodeGroup
 * set nodeType to AjfNodeType.AjfNodeGroup = 2.
 * Extends an AjfNode with the merging of containerNode  attributes(nodes)
 * with repeatingNode attributes(formulaReps, minReps, maxReps)
 */
function createNodeGroup(nodeGroup) {
    return {
        ...createContainerNode(nodeGroup),
        ...createRepeatingNode(nodeGroup),
        nodeType: AjfNodeType.AjfNodeGroup,
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
/**
 * It creates a AjfRepeatingSlide as the composition of createContainerNode and
 * createRepeatingNode and set AjfRepeatingSlide as nodeType
 */
function createRepeatingSlide(nodeGroup) {
    return {
        ...createContainerNode(nodeGroup),
        ...createRepeatingNode(nodeGroup),
        nodeType: AjfNodeType.AjfRepeatingSlide,
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
/**
 * It creates AjfSlide.
 */
function createSlide(nodeGroup) {
    return {
        ...createContainerNode(nodeGroup),
        nodeType: AjfNodeType.AjfSlide,
        readonly: nodeGroup.readonly || neverCondition(),
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
/**
 *  Create an AjfValidationGroup by json schema
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
/**
 *  Create an AjfWarningGroup by json schema
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
/**
 * Create an AjfNode by json schema,
 * apply a default value for name
 * throw new error if id,parent or nodeType attribute missed
 */
class AjfNodeSerializer {
    static fromJson(json, choicesOrigins, attachmentsOrigins) {
        const err = 'Malformed node';
        const obj = { ...json };
        obj.name = obj.name ?? '';
        if (obj.id == null || obj.parent == null || obj.nodeType == null) {
            throw new Error(err);
        }
        if (obj.visibility) {
            obj.visibility = AjfConditionSerializer.fromJson(obj.visibility);
        }
        obj.conditionalBranches = (obj.conditionalBranches || []).map(c => AjfConditionSerializer.fromJson(c));
        // call serializer by nodeType and cast obj with the right interface
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
                const slideObj = obj;
                if (slideObj.readonly) {
                    slideObj.readonly = AjfConditionSerializer.fromJson(slideObj.readonly);
                }
                return AjfNodeSerializer._slideFromJson(slideObj, choicesOrigins, attachmentsOrigins);
        }
        throw new Error(err);
    }
    static _containerNodeFromJson(json, choicesOrigins, attachmentsOrigins) {
        json.nodes = (json.nodes || []).map(n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins));
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
            obj.attachmentOrigin = (attachmentsOrigins || []).find(a => a.name === json.attachmentsOriginRef);
        }
        if (obj.nextSlideCondition) {
            obj.nextSlideCondition = AjfConditionSerializer.fromJson(obj.nextSlideCondition);
        }
        const isCustomFieldWithChoice = obj.fieldType > 100 &&
            componentsMap[obj.fieldType] != null &&
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
        return { ...createNode(json), nodeType: AjfNodeType.AjfFieldNodeLink };
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
        return createFieldWithChoices({ ...json, choicesOrigin });
    }
    static _formulaFieldFromJson(json) {
        if (json.formula) {
            json.formula = AjfFormulaSerializer.fromJson(json.formula);
        }
        return {
            ...createField(json),
            fieldType: AjfFieldType.Formula,
        };
    }
    static _nodeGroupFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createNodeGroup({
            ...AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins),
            ...AjfNodeSerializer._repeatingNodeFromJson(json),
        });
    }
    static _repeatingNodeFromJson(json) {
        if (json.formulaReps) {
            json.formulaReps = AjfFormulaSerializer.fromJson(json.formulaReps);
        }
        return createRepeatingNode(json);
    }
    static _repeatingSlideFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createRepeatingSlide({
            ...AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins),
            ...AjfNodeSerializer._repeatingNodeFromJson(json),
        });
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
/**
 *  Create an AjfForm by json schema, apply a default value for stringIdentifier and initContext
 */
class AjfFormSerializer {
    static fromJson(form, context) {
        /**
         * create choicesOrigins by serializer
         */
        const choicesOrigins = (form.choicesOrigins || []).map(c => AjfChoicesOriginSerializer.fromJson(c));
        /**
         * create attachmentsOrigins by serializer
         */
        const attachmentsOrigins = (form.attachmentsOrigins || []).map(a => AjfAttachmentsOriginSerializer.fromJson(a));
        /**
         * create nodes by serializer
         */
        const nodes = (form.nodes || []).map(n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins));
        return {
            ...form,
            choicesOrigins,
            attachmentsOrigins,
            nodes,
            stringIdentifier: form.stringIdentifier || [],
            initContext: deepCopy(context || {}),
        };
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
 * This component manages the table field data.
 * It exposes methods for managing the display of controllers.
 *
 *
 * @export
 * @abstract
 * @class AjfTableFieldComponent
 */
class AjfTableFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was) {
        super(cdr, service, was);
        this._instanceChangeSub = Subscription.EMPTY;
    }
    /**
     *  set the current cell show to false and set the next cell show to true.
     *
     * @param ev
     * @param row
     * @param column
     * @return {*}
     */
    goToNextCell(ev, row, column) {
        if (this.instance == null ||
            this.instance.controls.length < row ||
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
    /**
     * It resets all control.show to false and sets the control.show
     * (identified by row and column) to true.
     *
     * @param row
     * @param column
     */
    goToCell(row, column) {
        this._resetControls();
        this._showCell(row, column);
    }
    ngOnDestroy() {
        super.ngOnDestroy();
        this._instanceChangeSub.unsubscribe();
    }
    _onInstanceChange() {
        this._instanceChangeSub.unsubscribe();
        if (this.instance == null) {
            this._instanceChangeSub = Subscription.EMPTY;
            return;
        }
        let sub;
        this.instance.controls.forEach(ctrlss => {
            if (typeof ctrlss === 'string') {
                return;
            }
            if (Array.isArray(ctrlss)) {
                ctrlss.forEach(ctrls => {
                    if (typeof ctrls === 'string') {
                        return;
                    }
                    if (Array.isArray(ctrls)) {
                        ctrls.forEach(ctrl => {
                            if (typeof ctrl === 'string') {
                                return;
                            }
                            const curSub = ctrl.control.valueChanges.subscribe(() => this._changeDetectorRef.markForCheck());
                            if (typeof sub === 'undefined') {
                                sub = curSub;
                            }
                            else {
                                sub.add(curSub);
                            }
                        });
                    }
                });
            }
        });
    }
    /**
     * it sets all controls show to false.
     *
     * @private
     */
    _resetControls() {
        if (this.instance == null) {
            return;
        }
        this.instance.controls.forEach(row => row[1].forEach(cell => {
            if (typeof cell !== 'string') {
                cell.show = false;
            }
        }));
    }
    /**
     * It sets the control.show (identified by row and column) to true.
     *
     * @private
     * @param row
     * @param column
     * @return {*}
     */
    _showCell(row, column) {
        if (this.instance == null ||
            row >= this.instance.controls.length ||
            column >= this.instance.controls[row][1].length) {
            return;
        }
        const nextCell = this.instance.controls[row][1][column];
        if (typeof nextCell !== 'string') {
            nextCell.show = true;
        }
    }
}
AjfTableFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }], target: i0.ɵɵFactoryTarget.Directive });
AjfTableFieldComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfTableFieldComponent, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfTableFieldComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }]; } });

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
function generateRandomInstanceFields(fields) {
    const fieldReps = [];
    fields.forEach(f => {
        for (let i = 0; i < 5; i++) {
            const newReps = deepCopy(f);
            newReps.name = `${newReps.name}__${i}`;
            fieldReps.push(newReps);
        }
    });
    return fieldReps;
}
function flattenFields(slides) {
    let flatFields = [];
    slides.forEach(slide => {
        if (isField(slide)) {
            flatFields.push(slide);
        }
        else if (isRepeatingSlide(slide)) {
            const childs = generateRandomInstanceFields(slide.nodes);
            flatFields = flatFields.concat(flattenFields(childs));
        }
        else {
            flatFields = flatFields.concat([...slide.nodes]);
        }
    });
    return flatFields;
}
function generateRandomCtx(formSchema) {
    const ctxMap = [];
    const allFields = flattenFields(formSchema.nodes);
    const generateRandomNumberOfContext = Math.floor(Math.random() * 100) + 1;
    for (let i = 0; i < generateRandomNumberOfContext; i++) {
        const ctx = {};
        allFields.forEach(field => {
            switch (field.fieldType) {
                default:
                    ctx[field.name] = 0;
                    break;
                case AjfFieldType.Number:
                    ctx[field.name] = Math.floor(Math.random() * 1000) + 1;
                    break;
                case AjfFieldType.Boolean:
                    ctx[field.name] = Math.random() < 0.5;
                    break;
                case AjfFieldType.SingleChoice:
                    const singleChoices = field.choicesOrigin.choices.map(c => c.value);
                    ctx[field.name] = singleChoices[Math.floor(Math.random() * singleChoices.length)];
                    break;
                case AjfFieldType.MultipleChoice:
                    const multipleChoices = field.choicesOrigin.choices.map(c => c.value);
                    ctx[field.name] = [
                        multipleChoices[Math.floor(Math.random() * multipleChoices.length)],
                        multipleChoices[Math.floor(Math.random() * multipleChoices.length)],
                    ];
                    break;
                case AjfFieldType.Range:
                    const end = field.end ?? 10;
                    const start = field.start ?? 1;
                    const value = Math.floor(start + Math.random() * (end + 1 - start));
                    ctx[field.name] = value;
            }
        });
        ctxMap.push(ctx);
    }
    return ctxMap;
}
function buildformDatas(formSchemas) {
    const forms = {};
    Object.keys(formSchemas).forEach(nameSchema => {
        forms[nameSchema] = generateRandomCtx(AjfFormSerializer.fromJson(formSchemas[nameSchema]));
    });
    return forms;
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
function createFormPdf(form, translate, orientation, header, context) {
    const t = translate ? translate : (s) => s;
    const pdfDef = formToPdf(form, t, orientation, header, context);
    return createPdf(pdfDef);
}
function stripHTML(s) {
    return s.replace(/<\/?[^>]+(>|$)/g, '');
}
// Given a context, lookupStringFunction returns a function that allows to retrieve
// the field values from the context. The values are returned as print-friendly strings.
// rep is the index of the repeating slide, if the field belongs to one.
function lookupStringFunction(context, rep) {
    if (context == null) {
        return (_) => ' ';
    }
    return (name) => {
        if (name == null) {
            return ' ';
        }
        if (rep != null) {
            name = name + '__' + rep;
        }
        const val = context[name];
        if (val == null) {
            return ' ';
        }
        if (val === true) {
            return 'yes';
        }
        if (val === false) {
            return 'no';
        }
        return String(val);
    };
}
// Analogous to lookupStringFunction, but for multiple-choice questions,
// returning an array of values.
function lookupArrayFunction(context, rep) {
    if (context == null) {
        return (_) => [];
    }
    return (name) => {
        if (name == null) {
            return [];
        }
        if (rep != null) {
            name = name + '__' + rep;
        }
        const val = context[name];
        if (Array.isArray(val)) {
            return val;
        }
        return [];
    };
}
// Given an AjfForm, returns its pdfmake pdf document definition.
function formToPdf(form, translate, orientation, header, context) {
    const choicesMap = {};
    for (const o of form.choicesOrigins) {
        choicesMap[o.name] = o.choices;
    }
    const content = header ? [...header] : [];
    for (const slide of form.nodes) {
        if (isSlideNode(slide)) {
            content.push(...slideToPdf(slide, choicesMap, translate, context));
        }
        else if (isRepeatingSlide(slide)) {
            content.push(...repeatingSlideToPdf(slide, choicesMap, translate, context));
        }
    }
    return { content, pageOrientation: orientation };
}
function slideToPdf(slide, choicesMap, translate, context, rep) {
    let label = translate(slide.label);
    if (rep != null) {
        label = `${label} (${translate('repeat')} ${rep})`;
    }
    const content = [{ text: label, fontSize: 18, bold: true, margin: [0, 15, 0, 10] }];
    for (const field of slide.nodes) {
        if (isField(field)) {
            content.push(...fieldToPdf(field, choicesMap, translate, context, rep));
        }
    }
    return content;
}
function repeatingSlideToPdf(slide, choicesMap, translate, context) {
    let repeats = 3; // default, if no formData
    const maxRepeats = 20;
    if (context != null && slide.name != null) {
        const r = context[slide.name];
        if (typeof r === 'number') {
            repeats = Math.min(r, maxRepeats);
        }
    }
    const content = [];
    for (let r = 0; r < repeats; r++) {
        content.push(...slideToPdf(slide, choicesMap, translate, context, r));
    }
    return content;
}
function borderlessCell(text, bold) {
    return { table: { body: [[{ text, bold, border: [false, false, false, false] }]] } };
}
function fieldToPdf(field, choicesMap, translate, context, rep) {
    if (field.nodeType !== AjfNodeType.AjfField) {
        throw new Error('not a field');
    }
    const visible = context == null /* form not compiled, show all fields */ ||
        field.visibility == null ||
        evaluateExpression(field.visibility.condition, context);
    if (!visible) {
        return [];
    }
    const lookupString = lookupStringFunction(context, rep);
    switch (field.fieldType) {
        case AjfFieldType.String:
        case AjfFieldType.Text:
            return [
                borderlessCell(translate(field.label)),
                { table: { widths: ['*'], body: [[lookupString(field.name)]] }, margin: [5, 0, 0, 5] },
            ];
        case AjfFieldType.Formula:
            let value = lookupString(field.name);
            if (value === ' ') {
                // If the value of the field is not in the context, recompute the formula.
                const formula = field.formula || { formula: '' };
                value = String(evaluateExpression(formula.formula, context));
            }
            return [
                borderlessCell(translate(field.label)),
                { table: { widths: ['*'], body: [[value]] }, margin: [5, 0, 0, 5] },
            ];
        case AjfFieldType.Number:
        case AjfFieldType.Boolean:
        case AjfFieldType.DateInput:
        case AjfFieldType.Time:
            let val = lookupString(field.name);
            // for boolean fields in compiled forms, a null value is printed as 'no':
            if (field.fieldType === AjfFieldType.Boolean && context != null && val === ' ') {
                val = 'no';
            }
            return [
                {
                    table: {
                        widths: ['*', '*'],
                        body: [[{ text: translate(field.label), border: [false, false, false, false] }, val]],
                    },
                },
            ];
        case AjfFieldType.SingleChoice:
        case AjfFieldType.MultipleChoice:
            const choices = choicesMap[field.choicesOriginRef];
            if (context == null) {
                // empty form
                return choiceToPdf(field, choices, translate);
            }
            // compiled form, only print choices that are selected
            const selectedValues = field.fieldType === AjfFieldType.SingleChoice
                ? [lookupString(field.name)]
                : lookupArrayFunction(context, rep)(field.name);
            const nonNullChoice = (c) => c != null;
            let selectedChoices = selectedValues
                .map(v => choices.find(c => c.value === v))
                .filter(nonNullChoice);
            if (selectedChoices.length === 0) {
                selectedChoices = selectedValues.map(v => ({
                    label: v,
                    value: v,
                }));
            }
            return choiceToPdf(field, selectedChoices, translate, context);
        case AjfFieldType.Empty:
            const text = stripHTML(translate(field.HTML));
            return [borderlessCell(text, true)];
        case AjfFieldType.Table:
            return tableToPdf(field, lookupString, translate);
        default:
            // yet unsupported field type
            return [];
    }
}
function choiceToPdf(field, choices, translate, context) {
    let choiceLabels;
    if (choices == null || choices.length === 0) {
        choiceLabels = [' '];
    }
    else {
        choiceLabels = choices.map(c => c.label);
    }
    const body = [];
    for (const c of choiceLabels) {
        body.push([translate(c)]);
    }
    let question = translate(field.label);
    // If the form is empty (to be compiled),
    // help the user distinguish between single- and multiple-choice questions:
    if (context == null && field.fieldType === AjfFieldType.SingleChoice) {
        question += ` (${translate('single choice')})`;
    }
    if (context == null && field.fieldType === AjfFieldType.MultipleChoice) {
        question += ` (${translate('multipe choice')})`;
    }
    return [
        {
            columns: [
                borderlessCell(question),
                {
                    table: { widths: ['*'], body },
                },
            ],
            margin: [0, 0, 0, 5],
        },
    ];
}
function tableToPdf(table, lookupString, translate) {
    const body = [['', ...table.columnLabels.map(translate)]];
    for (let i = 0; i < table.rows.length; i++) {
        const row = [...table.rows[i]];
        for (let j = 0; j < row.length; j++) {
            const cell = row[j];
            if (typeof cell !== 'string') {
                row[j] = cell.formula;
            }
        }
        const valsRow = row.map(lookupString).map(translate);
        body.push([translate(table.rowLabels[i]), ...valsRow]);
    }
    return [
        borderlessCell(translate(table.label)),
        { table: { body, widths: Array(table.columnLabels.length + 1).fill('*') }, margin: [5, 0, 0, 5] },
    ];
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

/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
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
 *  Create a AjfChoicesOrigin&lt;T&gt;, apply type attrinute as 'fixed'
 */
function createChoicesFixedOrigin(origin) {
    const type = 'fixed';
    return { ...createChoicesOrigin({ ...origin, type }), type };
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
 *  Create a AjfChoicesOrigin&lt;T&gt;, apply type attrinute as 'function'
 *  apply default value for label and choices
 */
function createChoicesFunctionOrigin(origin) {
    return {
        ...origin,
        type: 'function',
        label: origin.label || '',
        choices: origin.choices || [],
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
/**
 *  Create a AjfChoicesOrigin&lt;T&gt;, apply type attrinute as 'observableArray'
 *  apply default value for label and choices
 */
function createChoicesObservableArrayOrigin(origin) {
    return {
        ...origin,
        type: 'observableArray',
        label: origin.label || '',
        choices: origin.choices || [],
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
/**
 *  Create a AjfChoicesOrigin&lt;T&gt;, apply type attrinute as 'observable'
 *  apply default value for label and choices
 */
function createChoicesObservableOrigin(origin) {
    return {
        ...origin,
        type: 'observable',
        label: origin.label || '',
        choices: origin.choices || [],
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
/**
 *  Create a AjfChoicesOrigin&lt;T&gt;, apply type attrinute as 'promise'
 *  apply default value for label and choices
 */
function createChoicesPromiseOrigin(origin) {
    return {
        ...origin,
        type: 'promise',
        label: origin.label || '',
        choices: origin.choices || [],
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
/**
 * isChoicesOrigin check if co parameter is defined and if correctly implements choicheOrigin
 * interface
 */
function isChoicesOrigin(co) {
    return (co != null &&
        typeof co === 'object' &&
        co.name != null &&
        typeof co.name === 'string' &&
        co.label != null &&
        typeof co.label === 'string' &&
        ['fixed', 'promise', 'observable', 'observableArray', 'function'].indexOf(co.type) > -1 &&
        co.choices instanceof Array);
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
 * isChoicesFixedOrigin check if origin parameter is ChoicesOrigin and  type is 'fixed'
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
/**
 * It is true if the field type is Number.
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
/**
 * It is true if the field is a range field
 */
function isRangeField(field) {
    return field.fieldType === AjfFieldType.Range;
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
 * It creates an Ajf form.
 * Any missing mandatory attributes are initialized with the respective
 * empty object
 *
 * @export
 * @param [form={}]
 * @return {*}
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
/**
 * It checks if the length of digits is less than or equal to maxValue and returns
 * an AjfValidation.
 */
function maxDigitsValidation(maxValue) {
    return createValidation({
        condition: `$value ? $value.toString().length <= ${maxValue.toString()} : false`,
        errorMessage: 'Digits count must be <= ' + maxValue.toString(),
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
/**
 * It checks if the value is less than or equal to maxValue and returns
 * an AjfValidation.
 */
function maxValidation(maxValue) {
    return createValidation({
        condition: '$value <= ' + maxValue.toString(),
        errorMessage: 'Value must be <= ' + maxValue.toString(),
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
/**
 * It checks if the length of digits is greater than or equal to minValue and returns
 * an AjfValidation.
 */
function minDigitsValidation(minValue) {
    return createValidation({
        condition: `$value ? $value.toString().length >= ${minValue.toString()} : false`,
        errorMessage: 'Digits count must be >= ' + minValue.toString(),
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
/**
 * It checks if the value is geater than or equal to minValue and returns
 * an AjfValidation.
 */
function minValidation(minValue) {
    return createValidation({
        condition: '$value >= ' + minValue.toString(),
        errorMessage: 'Value must be >= ' + minValue.toString(),
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
/**
 * It creates an AjfValidation with notEmpty condition.
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

export { AJF_SEARCH_ALERT_THRESHOLD, AJF_WARNING_ALERT_SERVICE, AjfAsFieldInstancePipe, AjfAsRepeatingSlideInstancePipe, AjfAttachmentsOriginSerializer, AjfBaseFieldComponent, AjfBoolToIntPipe, AjfChoicesOriginSerializer, AjfDateValuePipe, AjfDateValueStringPipe, AjfExpandFieldWithChoicesPipe, AjfFieldHost, AjfFieldIconPipe, AjfFieldIsValidPipe, AjfFieldService, AjfFieldType, AjfFieldWithChoicesComponent, AjfFileFieldComponent, AjfFormField, AjfFormRenderer, AjfFormRendererService, AjfFormSerializer, AjfFormStringIdentifierPipe, AjfFormsModule, AjfGetTableCellControlPipe, AjfImageFieldComponent, AjfIncrementPipe, AjfInputFieldComponent, AjfInvalidFieldDefinitionError, AjfIsCellEditablePipe, AjfIsReadonlyInputFieldPipe, AjfIsRepeatingSlideInstancePipe, AjfNodeCompleteNamePipe, AjfNodeSerializer, AjfNodeType, AjfRangePipe, AjfReadOnlyFieldComponent, AjfReadOnlyFileFieldComponent, AjfReadOnlyImageFieldComponent, AjfReadOnlySelectFieldComponent, AjfReadOnlyTableFieldComponent, AjfReadOnlyVideoUrlFieldComponent, AjfTableFieldComponent, AjfTableRowClass, AjfTableVisibleColumnsPipe, AjfValidSlidePipe, AjfValidationGroupSerializer, AjfValidationService, AjfVideoUrlFieldComponent, AjfWarningGroupSerializer, buildFormStringIdentifier, buildformDatas, createChoicesFixedOrigin, createChoicesFunctionOrigin, createChoicesObservableArrayOrigin, createChoicesObservableOrigin, createChoicesOrigin, createChoicesPromiseOrigin, createContainerNode, createField, createFieldInstance, createFieldWithChoicesInstance, createForm, createFormPdf, createNode, createNodeInstance, createValidation, createValidationGroup, createWarning, createWarningGroup, fieldIconName, flattenNodes, generateRandomCtx, initChoicesOrigin, isChoicesFixedOrigin, isChoicesOrigin, isContainerNode, isCustomFieldWithChoices, isField, isFieldWithChoices, isNumberField, isRangeField, isRepeatingContainerNode, isSlidesNode, maxDigitsValidation, maxValidation, minDigitsValidation, minValidation, notEmptyValidation, notEmptyWarning };
//# sourceMappingURL=ajf-core-forms.mjs.map
