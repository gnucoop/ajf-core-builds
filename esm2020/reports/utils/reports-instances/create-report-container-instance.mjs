/**
 * @license
 * Copyright (C) Gnucoop soc. coop.
 *
 * This file is part of the Advanced JSON forms (ajf).
 *
 * Advanced JSON forms (ajf) is free software: you can redistribute it and/or
 * modify it under the terms of the GNU Affero General Public License as
 * published by the Free Software Foundation, either version 3 of the License,
 * or (at your option) any later version.
 *
 * Advanced JSON forms (ajf) is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Affero
 * General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Advanced JSON forms (ajf).
 * If not, see http://www.gnu.org/licenses/.
 *
 */
import { widgetToWidgetInstance } from '../widgets-instances/widget-to-widget-instance';
export function createReportContainerInstance(container, context, ts, variables = []) {
    const content = container.content.map(c => {
        return widgetToWidgetInstance(c, context, ts, variables);
    });
    return {
        container,
        content,
        styles: container.styles,
    };
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3JlYXRlLXJlcG9ydC1jb250YWluZXItaW5zdGFuY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3V0aWxzL3JlcG9ydHMtaW5zdGFuY2VzL2NyZWF0ZS1yZXBvcnQtY29udGFpbmVyLWluc3RhbmNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQVFILE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBRXRGLE1BQU0sVUFBVSw2QkFBNkIsQ0FDM0MsU0FBNkIsRUFDN0IsT0FBbUIsRUFDbkIsRUFBb0IsRUFDcEIsWUFBaUMsRUFBRTtJQUVuQyxNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUN4QyxPQUFPLHNCQUFzQixDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO0lBQzNELENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTztRQUNMLFNBQVM7UUFDVCxPQUFPO1FBQ1AsTUFBTSxFQUFFLFNBQVMsQ0FBQyxNQUFNO0tBQ3pCLENBQUM7QUFDSixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtUcmFuc2xvY29TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcblxuaW1wb3J0IHtBamZSZXBvcnRDb250YWluZXJJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3JlcG9ydHMtaW5zdGFuY2VzL3JlcG9ydC1jb250YWluZXItaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBvcnRDb250YWluZXJ9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC1jb250YWluZXInO1xuaW1wb3J0IHtBamZSZXBvcnRWYXJpYWJsZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LXZhcmlhYmxlJztcbmltcG9ydCB7d2lkZ2V0VG9XaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjcmVhdGVSZXBvcnRDb250YWluZXJJbnN0YW5jZShcbiAgY29udGFpbmVyOiBBamZSZXBvcnRDb250YWluZXIsXG4gIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gIHRzOiBUcmFuc2xvY29TZXJ2aWNlLFxuICB2YXJpYWJsZXM6IEFqZlJlcG9ydFZhcmlhYmxlW10gPSBbXSxcbik6IEFqZlJlcG9ydENvbnRhaW5lckluc3RhbmNlIHtcbiAgY29uc3QgY29udGVudCA9IGNvbnRhaW5lci5jb250ZW50Lm1hcChjID0+IHtcbiAgICByZXR1cm4gd2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCBjb250ZXh0LCB0cywgdmFyaWFibGVzKTtcbiAgfSk7XG4gIHJldHVybiB7XG4gICAgY29udGFpbmVyLFxuICAgIGNvbnRlbnQsXG4gICAgc3R5bGVzOiBjb250YWluZXIuc3R5bGVzLFxuICB9O1xufVxuIl19