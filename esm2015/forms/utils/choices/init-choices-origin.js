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
/**
 * Called by form-rederer
 * take as param an AjfChoicesOrigin&lt;any&gt; and return an Promise&lt;void&gt; for handling async
 * event
 */
export function initChoicesOrigin(origin) {
    /** fixed don't use async evente the promise is resolved */
    if (origin.type === 'fixed') {
        return Promise.resolve();
    }
    /** apply function and than return resolve promise */
    if (origin.type === 'function') {
        const fo = origin;
        fo.choices = fo.generator();
        return Promise.resolve();
    }
    /** modify origin.choices with result of resolved promise */
    if (origin.type === 'promise') {
        const po = origin;
        return po.generator.then(choices => po.choices = choices).then();
    }
    /** modify origin.choices with result of subscribed observable */
    if (origin.type === 'observable') {
        const obso = origin;
        if (obso.generator != null) {
            obso.choices = [];
            return new Promise(res => {
                obso.generator.subscribe(c => obso.choices.push(c), () => { }, () => res());
            });
        }
    }
    /** modify origin.choices with result of subscribed observable */
    if (origin.type === 'observableArray') {
        const aoo = origin;
        if (aoo.generator != null) {
            aoo.choices = [];
            return new Promise(res => {
                aoo.generator.subscribe(choices => {
                    aoo.choices = choices;
                    res();
                });
            });
        }
    }
    return Promise.resolve();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1jaG9pY2VzLW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFTSDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE1BQTZCO0lBQzdELDJEQUEyRDtJQUMzRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQzNCLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQzFCO0lBQ0QscURBQXFEO0lBQ3JELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7UUFDOUIsTUFBTSxFQUFFLEdBQUcsTUFBdUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMxQjtJQUNELDREQUE0RDtJQUM1RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQzdCLE1BQU0sRUFBRSxHQUFHLE1BQXNDLENBQUM7UUFDbEQsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7S0FDbEU7SUFDRCxpRUFBaUU7SUFDakUsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLFlBQVksRUFBRTtRQUNoQyxNQUFNLElBQUksR0FBRyxNQUF5QyxDQUFDO1FBQ3ZELElBQUksSUFBSSxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDbEIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQ3BCLENBQUMsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQ3pCLEdBQUcsRUFBRSxHQUFFLENBQUMsRUFDUixHQUFHLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FDZCxDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7U0FDSjtLQUNGO0lBQ0QsaUVBQWlFO0lBQ2pFLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxpQkFBaUIsRUFBRTtRQUNyQyxNQUFNLEdBQUcsR0FBRyxNQUE4QyxDQUFDO1FBQzNELElBQUksR0FBRyxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDekIsR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDakIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2hDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN0QixHQUFHLEVBQUUsQ0FBQztnQkFDUixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ2hvaWNlc0Z1bmN0aW9uT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLWZ1bmN0aW9uLW9yaWdpbic7XG5pbXBvcnQge1xuICBBamZDaG9pY2VzT2JzZXJ2YWJsZUFycmF5T3JpZ2luXG59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb2JzZXJ2YWJsZS1hcnJheS1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1vYnNlcnZhYmxlLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb3JpZ2luJztcbmltcG9ydCB7QWpmQ2hvaWNlc1Byb21pc2VPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtcHJvbWlzZS1vcmlnaW4nO1xuLyoqXG4gKiBDYWxsZWQgYnkgZm9ybS1yZWRlcmVyXG4gKiB0YWtlIGFzIHBhcmFtIGFuIEFqZkNob2ljZXNPcmlnaW4mbHQ7YW55Jmd0OyBhbmQgcmV0dXJuIGFuIFByb21pc2UmbHQ7dm9pZCZndDsgZm9yIGhhbmRsaW5nIGFzeW5jXG4gKiBldmVudFxuICovXG5leHBvcnQgZnVuY3Rpb24gaW5pdENob2ljZXNPcmlnaW4ob3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgLyoqIGZpeGVkIGRvbid0IHVzZSBhc3luYyBldmVudGUgdGhlIHByb21pc2UgaXMgcmVzb2x2ZWQgKi9cbiAgaWYgKG9yaWdpbi50eXBlID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIC8qKiBhcHBseSBmdW5jdGlvbiBhbmQgdGhhbiByZXR1cm4gcmVzb2x2ZSBwcm9taXNlICovXG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IGZvID0gb3JpZ2luIGFzIEFqZkNob2ljZXNGdW5jdGlvbk9yaWdpbjxhbnk+O1xuICAgIGZvLmNob2ljZXMgPSBmby5nZW5lcmF0b3IoKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgLyoqIG1vZGlmeSBvcmlnaW4uY2hvaWNlcyB3aXRoIHJlc3VsdCBvZiByZXNvbHZlZCBwcm9taXNlICovXG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ3Byb21pc2UnKSB7XG4gICAgY29uc3QgcG8gPSBvcmlnaW4gYXMgQWpmQ2hvaWNlc1Byb21pc2VPcmlnaW48YW55PjtcbiAgICByZXR1cm4gcG8uZ2VuZXJhdG9yLnRoZW4oY2hvaWNlcyA9PiBwby5jaG9pY2VzID0gY2hvaWNlcykudGhlbigpO1xuICB9XG4gIC8qKiBtb2RpZnkgb3JpZ2luLmNob2ljZXMgd2l0aCByZXN1bHQgb2Ygc3Vic2NyaWJlZCBvYnNlcnZhYmxlICovXG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ29ic2VydmFibGUnKSB7XG4gICAgY29uc3Qgb2JzbyA9IG9yaWdpbiBhcyBBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbjxhbnk+O1xuICAgIGlmIChvYnNvLmdlbmVyYXRvciAhPSBudWxsKSB7XG4gICAgICBvYnNvLmNob2ljZXMgPSBbXTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXMgPT4ge1xuICAgICAgICBvYnNvLmdlbmVyYXRvci5zdWJzY3JpYmUoXG4gICAgICAgICAgICBjID0+IG9ic28uY2hvaWNlcy5wdXNoKGMpLFxuICAgICAgICAgICAgKCkgPT4ge30sXG4gICAgICAgICAgICAoKSA9PiByZXMoKSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvKiogbW9kaWZ5IG9yaWdpbi5jaG9pY2VzIHdpdGggcmVzdWx0IG9mIHN1YnNjcmliZWQgb2JzZXJ2YWJsZSAqL1xuICBpZiAob3JpZ2luLnR5cGUgPT09ICdvYnNlcnZhYmxlQXJyYXknKSB7XG4gICAgY29uc3QgYW9vID0gb3JpZ2luIGFzIEFqZkNob2ljZXNPYnNlcnZhYmxlQXJyYXlPcmlnaW48YW55PjtcbiAgICBpZiAoYW9vLmdlbmVyYXRvciAhPSBudWxsKSB7XG4gICAgICBhb28uY2hvaWNlcyA9IFtdO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlcyA9PiB7XG4gICAgICAgIGFvby5nZW5lcmF0b3Iuc3Vic2NyaWJlKGNob2ljZXMgPT4ge1xuICAgICAgICAgIGFvby5jaG9pY2VzID0gY2hvaWNlcztcbiAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufVxuIl19