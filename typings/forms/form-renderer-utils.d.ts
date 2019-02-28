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
import { AjfNode } from './nodes';
import { AjfNodeInstance, IAjfSlideInstance } from './nodes-instances';
export declare function orderedNodes(nodes: AjfNode[], parent: number | null): AjfNode[];
export declare function isRepeatingNode(node: AjfNode): boolean;
export declare function isContainerNode(node: AjfNode): boolean;
export declare function flattenNodes(nodes: AjfNode[]): AjfNode[];
export declare function flattenNodesInstances(nodes: AjfNodeInstance[], includeGroups?: boolean): AjfNodeInstance[];
export declare function getAncestorRepeatingNodes(allNodes: AjfNode[] | AjfNodeInstance[], node: AjfNode): AjfNode[];
export declare function getAncestorRepeatingNodesNames(allNodes: AjfNode[] | AjfNodeInstance[], node: AjfNode): {
    [prop: string]: number;
};
export declare function flattenNodesTree(nodes: AjfNodeInstance[]): IAjfSlideInstance[];
export declare function normalizeFormula(formula: string, ancestorsNames: {
    [prop: string]: number;
}, prefix: number[]): string;
export declare function nodeToNodeInstance(allNodes: AjfNode[] | AjfNodeInstance[], node: AjfNode, prefix: number[], context: any): AjfNodeInstance | null;
export declare function findNodeInstanceInTree(nodes: AjfNodeInstance[], node: AjfNodeInstance): {
    container: AjfNodeInstance[];
    index: number;
};
export declare function flattenNodeInstances(nodes?: AjfNodeInstance[]): AjfNodeInstance[];
export declare function isContainerNodeInstance(node: AjfNodeInstance): boolean;
