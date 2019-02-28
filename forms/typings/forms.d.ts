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
import { AjfJsonSerializable } from '@ajf/core/models';
import { AjfAttachmentsOrigin } from './attachments';
import { IAjfChoicesOrigin } from './choices';
import { AjfNode } from './nodes';
export declare class AjfForm extends AjfJsonSerializable {
    nodes: AjfNode[];
    choicesOrigins: IAjfChoicesOrigin[];
    attachmentsOrigins: AjfAttachmentsOrigin[];
    initContext: any;
    topBar: boolean;
    valid: boolean;
    stringIdentifier: {
        label: string;
        value: string[];
    }[];
    lastSelectedLocation: boolean;
    supplementaryInformations: any;
    /**
     * this method will load an AjfForm from json
     * @param obj : any - object form
     * @return AjfForm
     */
    static fromJson(obj: any, context?: any): AjfForm;
    static toString(schema: any, json: any, emptyString?: string): string | null;
    constructor(obj?: any);
    /**
     * this method will get child nodes from ajfNode
     * @param   node : AjfNode
     * @return ajfNode[] - the child og AjfNode
     */
    getChildNodes(node: AjfNode): AjfNode[];
    /**
     * this method will get root node
     * @return ajfNode - the root node
     */
    getRootNode(): AjfNode | null;
}
