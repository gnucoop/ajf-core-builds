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
import { isSlidesInstance } from '../nodes-instances/is-slides-instance';
import { isRepeatingSlide } from '../nodes/is-repeating-slide';
export function isRepeatingSlideInstance(nodeInstance) {
    return nodeInstance != null && nodeInstance.node != null && isSlidesInstance(nodeInstance) &&
        isRepeatingSlide(nodeInstance.node);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL2lzLXJlcGVhdGluZy1zbGlkZS1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSx1Q0FBdUMsQ0FBQztBQUN2RSxPQUFPLEVBQUMsZ0JBQWdCLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUU3RCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsWUFBNkI7SUFDcEUsT0FBTyxZQUFZLElBQUksSUFBSSxJQUFJLFlBQVksQ0FBQyxJQUFJLElBQUksSUFBSSxJQUFJLGdCQUFnQixDQUFDLFlBQVksQ0FBQztRQUN0RixnQkFBZ0IsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDMUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgMjAxOCBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7aXNTbGlkZXNJbnN0YW5jZX0gZnJvbSAnLi4vbm9kZXMtaW5zdGFuY2VzL2lzLXNsaWRlcy1pbnN0YW5jZSc7XG5pbXBvcnQge2lzUmVwZWF0aW5nU2xpZGV9IGZyb20gJy4uL25vZGVzL2lzLXJlcGVhdGluZy1zbGlkZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1JlcGVhdGluZ1NsaWRlSW5zdGFuY2Uobm9kZUluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpOiBib29sZWFuIHtcbiAgcmV0dXJuIG5vZGVJbnN0YW5jZSAhPSBudWxsICYmIG5vZGVJbnN0YW5jZS5ub2RlICE9IG51bGwgJiYgaXNTbGlkZXNJbnN0YW5jZShub2RlSW5zdGFuY2UpICYmXG4gICAgICBpc1JlcGVhdGluZ1NsaWRlKG5vZGVJbnN0YW5jZS5ub2RlKTtcbn1cbiJdfQ==