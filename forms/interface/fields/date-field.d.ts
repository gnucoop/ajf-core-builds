/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { AjfBaseField } from './base-field';
import { AjfFieldType } from './field-type';
/**
 * An AjfField of type Date.
 */
export interface AjfDateField extends AjfBaseField {
    fieldType: AjfFieldType.Date;
    /**
     * The min selectable date of the calendar.
     */
    minDate?: Date | 'today';
    /**
     * The max selectable date of the calendar.
     */
    maxDate?: Date | 'today';
}
