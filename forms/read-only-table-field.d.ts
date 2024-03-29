/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { ChangeDetectorRef } from '@angular/core';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AjfTableFieldInstance } from './interface/fields-instances/table-field-instance';
import { AjfWarningAlertService } from './warning-alert-service';
import * as i0 from "@angular/core";
/**
 * This component allows you to shows the values contained in the controls of
 * the form inherited from AjfBaseFieldComponent with AjfTableFieldInstance.
 *
 * @export
 * @class AjfReadOnlyTableFieldComponent
 */
export declare class AjfReadOnlyTableFieldComponent extends AjfBaseFieldComponent<AjfTableFieldInstance> {
    constructor(cdr: ChangeDetectorRef, service: AjfFormRendererService, was: AjfWarningAlertService);
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfReadOnlyTableFieldComponent, never>;
    static ɵcmp: i0.ɵɵComponentDeclaration<AjfReadOnlyTableFieldComponent, "ng-component", never, {}, {}, never, never, false, never>;
}
