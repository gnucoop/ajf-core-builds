/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { AjfField } from '../../interface/fields/field';
import { AjfNodeCreate } from '../nodes/create-node';
export declare type AjfFieldCreate = Omit<AjfNodeCreate, 'nodeType'> & Pick<AjfField, 'fieldType'> & Partial<AjfField>;
/**
 * It creates an AjfField.
 * If size is not defined apply 'normal'.
 * If defaultValue is not defined apply null.
 * If editable is not defined return true if field type is'nt formula or table
 */
export declare function createField(field: AjfFieldCreate): AjfField;
