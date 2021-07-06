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
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { langs } from './lang';
import * as i0 from "@angular/core";
export class TranslocoHttpLoader {
    constructor() { }
    getTranslation(lang) {
        const lang$ = of(langs[lang] != null ? langs[lang] : langs['en']);
        return lang$;
    }
}
TranslocoHttpLoader.ɵprov = i0.ɵɵdefineInjectable({ factory: function TranslocoHttpLoader_Factory() { return new TranslocoHttpLoader(); }, token: TranslocoHttpLoader, providedIn: "root" });
TranslocoHttpLoader.decorators = [
    { type: Injectable, args: [{ providedIn: 'root' },] }
];
TranslocoHttpLoader.ctorParameters = () => [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidHJhbnNsb2NvLWxvYWRlci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RyYW5zbG9jby90cmFuc2xvY28tbG9hZGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFekMsT0FBTyxFQUFhLEVBQUUsRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUVwQyxPQUFPLEVBQUMsS0FBSyxFQUFDLE1BQU0sUUFBUSxDQUFDOztBQUc3QixNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLGdCQUFlLENBQUM7SUFFaEIsY0FBYyxDQUFDLElBQVk7UUFDekIsTUFBTSxLQUFLLEdBQTRCLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQzNGLE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7OztZQVBGLFVBQVUsU0FBQyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1RyYW5zbGF0aW9uLCBUcmFuc2xvY29Mb2FkZXJ9IGZyb20gJ0BuZ25lYXQvdHJhbnNsb2NvJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge2xhbmdzfSBmcm9tICcuL2xhbmcnO1xuXG5ASW5qZWN0YWJsZSh7cHJvdmlkZWRJbjogJ3Jvb3QnfSlcbmV4cG9ydCBjbGFzcyBUcmFuc2xvY29IdHRwTG9hZGVyIGltcGxlbWVudHMgVHJhbnNsb2NvTG9hZGVyIHtcbiAgY29uc3RydWN0b3IoKSB7fVxuXG4gIGdldFRyYW5zbGF0aW9uKGxhbmc6IHN0cmluZykge1xuICAgIGNvbnN0IGxhbmckOiBPYnNlcnZhYmxlPFRyYW5zbGF0aW9uPiA9IG9mKGxhbmdzW2xhbmddICE9IG51bGwgPyBsYW5nc1tsYW5nXSA6IGxhbmdzWydlbiddKTtcbiAgICByZXR1cm4gbGFuZyQ7XG4gIH1cbn1cbiJdfQ==