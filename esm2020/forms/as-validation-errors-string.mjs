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
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * It casts an AjfNodeInstance as a string of all validation errors of an AjfFieldInstance.
 */
export class AjfAsFieldInstanceErrorsPipe {
    transform(instance) {
        const fieldInstance = instance;
        if (fieldInstance.valid || !fieldInstance.validationResults)
            return null;
        const errors = fieldInstance.validationResults.filter(res => !res.result);
        return errors.map(vr => vr.error).join(', ');
    }
}
AjfAsFieldInstanceErrorsPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfAsFieldInstanceErrorsPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfAsFieldInstanceErrorsPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfAsFieldInstanceErrorsPipe, name: "ajfAsFieldInstanceErrors" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfAsFieldInstanceErrorsPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfAsFieldInstanceErrors' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXMtdmFsaWRhdGlvbi1lcnJvcnMtc3RyaW5nLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvYXMtdmFsaWRhdGlvbi1lcnJvcnMtc3RyaW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDOztBQUtsRDs7R0FFRztBQUVILE1BQU0sT0FBTyw0QkFBNEI7SUFDdkMsU0FBUyxDQUFDLFFBQXlCO1FBQ2pDLE1BQU0sYUFBYSxHQUFHLFFBQTRCLENBQUM7UUFDbkQsSUFBSSxhQUFhLENBQUMsS0FBSyxJQUFJLENBQUMsYUFBYSxDQUFDLGlCQUFpQjtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3pFLE1BQU0sTUFBTSxHQUFHLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUMxRSxPQUFPLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQy9DLENBQUM7O3lIQU5VLDRCQUE0Qjt1SEFBNUIsNEJBQTRCOzJGQUE1Qiw0QkFBNEI7a0JBRHhDLElBQUk7bUJBQUMsRUFBQyxJQUFJLEVBQUUsMEJBQTBCLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7UGlwZSwgUGlwZVRyYW5zZm9ybX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7QWpmRmllbGRJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzLWluc3RhbmNlcy9maWVsZC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuXG4vKipcbiAqIEl0IGNhc3RzIGFuIEFqZk5vZGVJbnN0YW5jZSBhcyBhIHN0cmluZyBvZiBhbGwgdmFsaWRhdGlvbiBlcnJvcnMgb2YgYW4gQWpmRmllbGRJbnN0YW5jZS5cbiAqL1xuQFBpcGUoe25hbWU6ICdhamZBc0ZpZWxkSW5zdGFuY2VFcnJvcnMnfSlcbmV4cG9ydCBjbGFzcyBBamZBc0ZpZWxkSW5zdGFuY2VFcnJvcnNQaXBlIGltcGxlbWVudHMgUGlwZVRyYW5zZm9ybSB7XG4gIHRyYW5zZm9ybShpbnN0YW5jZTogQWpmTm9kZUluc3RhbmNlKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgY29uc3QgZmllbGRJbnN0YW5jZSA9IGluc3RhbmNlIGFzIEFqZkZpZWxkSW5zdGFuY2U7XG4gICAgaWYgKGZpZWxkSW5zdGFuY2UudmFsaWQgfHwgIWZpZWxkSW5zdGFuY2UudmFsaWRhdGlvblJlc3VsdHMpIHJldHVybiBudWxsO1xuICAgIGNvbnN0IGVycm9ycyA9IGZpZWxkSW5zdGFuY2UudmFsaWRhdGlvblJlc3VsdHMuZmlsdGVyKHJlcyA9PiAhcmVzLnJlc3VsdCk7XG4gICAgcmV0dXJuIGVycm9ycy5tYXAodnIgPT4gdnIuZXJyb3IpLmpvaW4oJywgJyk7XG4gIH1cbn1cbiJdfQ==