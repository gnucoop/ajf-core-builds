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
import { firstValueFrom } from 'rxjs';
import { toArray } from 'rxjs/operators';
/**
 * Called by form-rederer
 * take as param an AjfChoicesOrigin&lt;any&gt; and return an Promise&lt;void&gt; for handling async
 * event
 */
export async function initChoicesOrigin(origin) {
    /** fixed don't use async evente the promise is resolved */
    if (origin.type === 'fixed') {
        return;
    }
    /** apply function and than return resolve promise */
    if (origin.type === 'function') {
        origin.choices = origin.generator();
        return;
    }
    /** modify origin.choices with result of resolved promise */
    if (origin.type === 'promise') {
        return origin.generator.then(choices => (origin.choices = choices)).then();
    }
    /** modify origin.choices with result of subscribed observable */
    if (origin.type === 'observable') {
        if (origin.generator != null) {
            origin.choices = [];
            return firstValueFrom(origin.generator.pipe(toArray()))
                .then(choices => (origin.choices = choices))
                .then();
        }
    }
    /** modify origin.choices with result of subscribed observable */
    if (origin.type === 'observableArray') {
        if (origin.generator != null) {
            origin.choices = [];
            return firstValueFrom(origin.generator)
                .then(choices => (origin.choices = choices))
                .then();
        }
    }
    return;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1jaG9pY2VzLW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsY0FBYyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQ3BDLE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUd2Qzs7OztHQUlHO0FBQ0gsTUFBTSxDQUFDLEtBQUssVUFBVSxpQkFBaUIsQ0FBQyxNQUE2QjtJQUNuRSwyREFBMkQ7SUFDM0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUMzQixPQUFPO0tBQ1I7SUFDRCxxREFBcUQ7SUFDckQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtRQUM5QixNQUFNLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUNwQyxPQUFPO0tBQ1I7SUFDRCw0REFBNEQ7SUFDNUQsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUM3QixPQUFPLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQyxNQUFNLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDNUU7SUFDRCxpRUFBaUU7SUFDakUsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtRQUNoQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUM7aUJBQ3BELElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDM0MsSUFBSSxFQUFFLENBQUM7U0FDWDtLQUNGO0lBQ0QsaUVBQWlFO0lBQ2pFLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxpQkFBaUIsRUFBRTtRQUNyQyxJQUFJLE1BQU0sQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQzVCLE1BQU0sQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ3BCLE9BQU8sY0FBYyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUM7aUJBQ3BDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQztpQkFDM0MsSUFBSSxFQUFFLENBQUM7U0FDWDtLQUNGO0lBQ0QsT0FBTztBQUNULENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7Zmlyc3RWYWx1ZUZyb219IGZyb20gJ3J4anMnO1xuaW1wb3J0IHt0b0FycmF5fSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmQ2hvaWNlc09yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1vcmlnaW4nO1xuLyoqXG4gKiBDYWxsZWQgYnkgZm9ybS1yZWRlcmVyXG4gKiB0YWtlIGFzIHBhcmFtIGFuIEFqZkNob2ljZXNPcmlnaW4mbHQ7YW55Jmd0OyBhbmQgcmV0dXJuIGFuIFByb21pc2UmbHQ7dm9pZCZndDsgZm9yIGhhbmRsaW5nIGFzeW5jXG4gKiBldmVudFxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaW5pdENob2ljZXNPcmlnaW4ob3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgLyoqIGZpeGVkIGRvbid0IHVzZSBhc3luYyBldmVudGUgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgKi9cbiAgaWYgKG9yaWdpbi50eXBlID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIC8qKiBhcHBseSBmdW5jdGlvbiBhbmQgdGhhbiByZXR1cm4gcmVzb2x2ZSBwcm9taXNlICovXG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIG9yaWdpbi5jaG9pY2VzID0gb3JpZ2luLmdlbmVyYXRvcigpO1xuICAgIHJldHVybjtcbiAgfVxuICAvKiogbW9kaWZ5IG9yaWdpbi5jaG9pY2VzIHdpdGggcmVzdWx0IG9mIHJlc29sdmVkIHByb21pc2UgKi9cbiAgaWYgKG9yaWdpbi50eXBlID09PSAncHJvbWlzZScpIHtcbiAgICByZXR1cm4gb3JpZ2luLmdlbmVyYXRvci50aGVuKGNob2ljZXMgPT4gKG9yaWdpbi5jaG9pY2VzID0gY2hvaWNlcykpLnRoZW4oKTtcbiAgfVxuICAvKiogbW9kaWZ5IG9yaWdpbi5jaG9pY2VzIHdpdGggcmVzdWx0IG9mIHN1YnNjcmliZWQgb2JzZXJ2YWJsZSAqL1xuICBpZiAob3JpZ2luLnR5cGUgPT09ICdvYnNlcnZhYmxlJykge1xuICAgIGlmIChvcmlnaW4uZ2VuZXJhdG9yICE9IG51bGwpIHtcbiAgICAgIG9yaWdpbi5jaG9pY2VzID0gW107XG4gICAgICByZXR1cm4gZmlyc3RWYWx1ZUZyb20ob3JpZ2luLmdlbmVyYXRvci5waXBlKHRvQXJyYXkoKSkpXG4gICAgICAgIC50aGVuKGNob2ljZXMgPT4gKG9yaWdpbi5jaG9pY2VzID0gY2hvaWNlcykpXG4gICAgICAgIC50aGVuKCk7XG4gICAgfVxuICB9XG4gIC8qKiBtb2RpZnkgb3JpZ2luLmNob2ljZXMgd2l0aCByZXN1bHQgb2Ygc3Vic2NyaWJlZCBvYnNlcnZhYmxlICovXG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ29ic2VydmFibGVBcnJheScpIHtcbiAgICBpZiAob3JpZ2luLmdlbmVyYXRvciAhPSBudWxsKSB7XG4gICAgICBvcmlnaW4uY2hvaWNlcyA9IFtdO1xuICAgICAgcmV0dXJuIGZpcnN0VmFsdWVGcm9tKG9yaWdpbi5nZW5lcmF0b3IpXG4gICAgICAgIC50aGVuKGNob2ljZXMgPT4gKG9yaWdpbi5jaG9pY2VzID0gY2hvaWNlcykpXG4gICAgICAgIC50aGVuKCk7XG4gICAgfVxuICB9XG4gIHJldHVybjtcbn1cbiJdfQ==