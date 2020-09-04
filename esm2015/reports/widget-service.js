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
import { componentsMap } from './utils/widgets/widgets-map';
export class AjfWidgetService {
    constructor() {
        this.componentsMap = componentsMap;
    }
    registerCustomWidget(widget) {
        const { widgetType, component } = widget;
        if (widgetType < 100) {
            throw new Error('Invalid custom widget type, it must be greater than 100');
        }
        if (component == null) {
            throw new Error('Invalid custom widget component');
        }
        this.componentsMap[widgetType] = widget;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXNlcnZpY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9yZXBvcnRzL3dpZGdldC1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQU1ILE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUUxRCxNQUFNLE9BQWdCLGdCQUFnQjtJQUF0QztRQUNXLGtCQUFhLEdBQTJCLGFBQWEsQ0FBQztJQWdCakUsQ0FBQztJQWRDLG9CQUFvQixDQUFDLE1BSXBCO1FBQ0MsTUFBTSxFQUFDLFVBQVUsRUFBRSxTQUFTLEVBQUMsR0FBRyxNQUFNLENBQUM7UUFDdkMsSUFBSSxVQUFVLEdBQUcsR0FBRyxFQUFFO1lBQ3BCLE1BQU0sSUFBSSxLQUFLLENBQUMseURBQXlELENBQUMsQ0FBQztTQUM1RTtRQUNELElBQUksU0FBUyxJQUFJLElBQUksRUFBRTtZQUNyQixNQUFNLElBQUksS0FBSyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7U0FDcEQ7UUFDRCxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxHQUFHLE1BQU0sQ0FBQztJQUMxQyxDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7VHlwZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmQmFzZVdpZGdldENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLXdpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldENvbXBvbmVudHNNYXB9IGZyb20gJy4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LWNvbXBvbmVudHMtbWFwJztcbmltcG9ydCB7Y29tcG9uZW50c01hcH0gZnJvbSAnLi91dGlscy93aWRnZXRzL3dpZGdldHMtbWFwJztcblxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZldpZGdldFNlcnZpY2Uge1xuICByZWFkb25seSBjb21wb25lbnRzTWFwOiBBamZXaWRnZXRDb21wb25lbnRzTWFwID0gY29tcG9uZW50c01hcDtcblxuICByZWdpc3RlckN1c3RvbVdpZGdldCh3aWRnZXQ6IHtcbiAgICB3aWRnZXRUeXBlOiBudW1iZXIsXG4gICAgY29tcG9uZW50OiBUeXBlPEFqZkJhc2VXaWRnZXRDb21wb25lbnQ+LFxuICAgIGlucHV0cz86IHtba2V5OiBzdHJpbmddOiBhbnl9LFxuICB9KTogdm9pZCB7XG4gICAgY29uc3Qge3dpZGdldFR5cGUsIGNvbXBvbmVudH0gPSB3aWRnZXQ7XG4gICAgaWYgKHdpZGdldFR5cGUgPCAxMDApIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjdXN0b20gd2lkZ2V0IHR5cGUsIGl0IG11c3QgYmUgZ3JlYXRlciB0aGFuIDEwMCcpO1xuICAgIH1cbiAgICBpZiAoY29tcG9uZW50ID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBjdXN0b20gd2lkZ2V0IGNvbXBvbmVudCcpO1xuICAgIH1cbiAgICB0aGlzLmNvbXBvbmVudHNNYXBbd2lkZ2V0VHlwZV0gPSB3aWRnZXQ7XG4gIH1cbn1cbiJdfQ==