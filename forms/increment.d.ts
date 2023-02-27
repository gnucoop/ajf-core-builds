/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { PipeTransform } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * It increments the value parameter by increment offset parameter.
 *
 * @export
 * @class AjfIncrementPipe
 */
export declare class AjfIncrementPipe implements PipeTransform {
    transform(value: number, increment?: number): number;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfIncrementPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfIncrementPipe, "ajfIncrement", false>;
}
