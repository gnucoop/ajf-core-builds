/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { isRepeatingContainerNode } from '../nodes/is-repeating-container-node';
/**
 * It returns all ancestor repeatingContainerNodes of the node.
 */
export function getAncestorRepeatingNodes(allNodes, node) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LWFuY2VzdG9yLXJlcGVhdGluZy1ub2Rlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL25vZGVzLWluc3RhbmNlcy9nZXQtYW5jZXN0b3ItcmVwZWF0aW5nLW5vZGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBRTlFOztHQUVHO0FBQ0gsTUFBTSxVQUFVLHlCQUF5QixDQUN2QyxRQUF1QyxFQUN2QyxJQUFhO0lBRWIsSUFBSSxVQUFVLEdBQWMsRUFBRSxDQUFDO0lBQy9CLElBQUksU0FBUyxHQUFrQixJQUFJLENBQUMsTUFBTSxDQUFDO0lBQzNDLE9BQU8sU0FBUyxJQUFJLElBQUksRUFBRTtRQUN4QixNQUFNLE9BQU8sR0FBRyxRQUFRO2FBQ3JCLEdBQUcsQ0FBQyxDQUFDLENBQTRCLEVBQUUsRUFBRSxDQUFFLENBQXFCLENBQUMsSUFBSSxJQUFLLENBQWEsQ0FBQzthQUNwRixJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsRUFBRSxJQUFJLFNBQVMsQ0FBQyxDQUFDO1FBQ2hDLElBQUksT0FBTyxFQUFFO1lBQ1gsSUFBSSx3QkFBd0IsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDckMsVUFBVSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzthQUMxQjtTQUNGO1FBQ0QsU0FBUyxHQUFHLE9BQU8sSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztLQUNyRDtJQUNELE9BQU8sVUFBVSxDQUFDO0FBQ3BCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge2lzUmVwZWF0aW5nQ29udGFpbmVyTm9kZX0gZnJvbSAnLi4vbm9kZXMvaXMtcmVwZWF0aW5nLWNvbnRhaW5lci1ub2RlJztcblxuLyoqXG4gKiBJdCByZXR1cm5zIGFsbCBhbmNlc3RvciByZXBlYXRpbmdDb250YWluZXJOb2RlcyBvZiB0aGUgbm9kZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGdldEFuY2VzdG9yUmVwZWF0aW5nTm9kZXMoXG4gIGFsbE5vZGVzOiAoQWpmTm9kZSB8IEFqZk5vZGVJbnN0YW5jZSlbXSxcbiAgbm9kZTogQWpmTm9kZSxcbik6IEFqZk5vZGVbXSB7XG4gIGxldCBub2RlR3JvdXBzOiBBamZOb2RlW10gPSBbXTtcbiAgbGV0IGN1clBhcmVudDogbnVtYmVyIHwgbnVsbCA9IG5vZGUucGFyZW50O1xuICB3aGlsZSAoY3VyUGFyZW50ICE9IG51bGwpIHtcbiAgICBjb25zdCBjdXJOb2RlID0gYWxsTm9kZXNcbiAgICAgIC5tYXAoKG46IEFqZk5vZGUgfCBBamZOb2RlSW5zdGFuY2UpID0+IChuIGFzIEFqZk5vZGVJbnN0YW5jZSkubm9kZSB8fCAobiBhcyBBamZOb2RlKSlcbiAgICAgIC5maW5kKG4gPT4gbi5pZCA9PSBjdXJQYXJlbnQpO1xuICAgIGlmIChjdXJOb2RlKSB7XG4gICAgICBpZiAoaXNSZXBlYXRpbmdDb250YWluZXJOb2RlKGN1ck5vZGUpKSB7XG4gICAgICAgIG5vZGVHcm91cHMucHVzaChjdXJOb2RlKTtcbiAgICAgIH1cbiAgICB9XG4gICAgY3VyUGFyZW50ID0gY3VyTm9kZSAhPSBudWxsID8gY3VyTm9kZS5wYXJlbnQgOiBudWxsO1xuICB9XG4gIHJldHVybiBub2RlR3JvdXBzO1xufVxuIl19