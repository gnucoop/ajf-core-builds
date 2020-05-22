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
export function initChoicesOrigin(origin) {
    if (origin.type === 'fixed') {
        return Promise.resolve();
    }
    if (origin.type === 'function') {
        const fo = origin;
        fo.choices = fo.generator();
        return Promise.resolve();
    }
    if (origin.type === 'promise') {
        const po = origin;
        return po.generator.then(choices => po.choices = choices).then();
    }
    if (origin.type === 'observable') {
        const obso = origin;
        if (obso.generator != null) {
            obso.choices = [];
            return new Promise(res => {
                obso.generator.subscribe(c => obso.choices.push(c), () => { }, () => res());
            });
        }
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1jaG9pY2VzLW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFVSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsTUFBNkI7SUFDN0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUMzQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMxQjtJQUNELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7UUFDOUIsTUFBTSxFQUFFLEdBQUcsTUFBdUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMxQjtJQUNELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDN0IsTUFBTSxFQUFFLEdBQUcsTUFBc0MsQ0FBQztRQUNsRCxPQUFPLEVBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNsRTtJQUNELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDaEMsTUFBTSxJQUFJLEdBQUcsTUFBeUMsQ0FBQztRQUN2RCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sSUFBSSxPQUFPLENBQU8sR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUNwQixDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUN6QixHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQ2QsQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUNELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxpQkFBaUIsRUFBRTtRQUNyQyxNQUFNLEdBQUcsR0FBRyxNQUE4QyxDQUFDO1FBQzNELElBQUksR0FBRyxDQUFDLFNBQVMsSUFBSSxJQUFJLEVBQUU7WUFDekIsR0FBRyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7WUFDakIsT0FBTyxJQUFJLE9BQU8sQ0FBTyxHQUFHLENBQUMsRUFBRTtnQkFDN0IsR0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2hDLEdBQUcsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO29CQUN0QixHQUFHLEVBQUUsQ0FBQztnQkFDUixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUNELE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0FBQzNCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ2hvaWNlc0Z1bmN0aW9uT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLWZ1bmN0aW9uLW9yaWdpbic7XG5pbXBvcnQge1xuICBBamZDaG9pY2VzT2JzZXJ2YWJsZUFycmF5T3JpZ2luXG59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb2JzZXJ2YWJsZS1hcnJheS1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1vYnNlcnZhYmxlLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb3JpZ2luJztcbmltcG9ydCB7QWpmQ2hvaWNlc1Byb21pc2VPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtcHJvbWlzZS1vcmlnaW4nO1xuXG5leHBvcnQgZnVuY3Rpb24gaW5pdENob2ljZXNPcmlnaW4ob3JpZ2luOiBBamZDaG9pY2VzT3JpZ2luPGFueT4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKG9yaWdpbi50eXBlID09PSAnZml4ZWQnKSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgIGNvbnN0IGZvID0gb3JpZ2luIGFzIEFqZkNob2ljZXNGdW5jdGlvbk9yaWdpbjxhbnk+O1xuICAgIGZvLmNob2ljZXMgPSBmby5nZW5lcmF0b3IoKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cbiAgaWYgKG9yaWdpbi50eXBlID09PSAncHJvbWlzZScpIHtcbiAgICBjb25zdCBwbyA9IG9yaWdpbiBhcyBBamZDaG9pY2VzUHJvbWlzZU9yaWdpbjxhbnk+O1xuICAgIHJldHVybiBwby5nZW5lcmF0b3IudGhlbihjaG9pY2VzID0+IHBvLmNob2ljZXMgPSBjaG9pY2VzKS50aGVuKCk7XG4gIH1cbiAgaWYgKG9yaWdpbi50eXBlID09PSAnb2JzZXJ2YWJsZScpIHtcbiAgICBjb25zdCBvYnNvID0gb3JpZ2luIGFzIEFqZkNob2ljZXNPYnNlcnZhYmxlT3JpZ2luPGFueT47XG4gICAgaWYgKG9ic28uZ2VuZXJhdG9yICE9IG51bGwpIHtcbiAgICAgIG9ic28uY2hvaWNlcyA9IFtdO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlcyA9PiB7XG4gICAgICAgIG9ic28uZ2VuZXJhdG9yLnN1YnNjcmliZShcbiAgICAgICAgICAgIGMgPT4gb2Jzby5jaG9pY2VzLnB1c2goYyksXG4gICAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAgICgpID0+IHJlcygpLFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ29ic2VydmFibGVBcnJheScpIHtcbiAgICBjb25zdCBhb28gPSBvcmlnaW4gYXMgQWpmQ2hvaWNlc09ic2VydmFibGVBcnJheU9yaWdpbjxhbnk+O1xuICAgIGlmIChhb28uZ2VuZXJhdG9yICE9IG51bGwpIHtcbiAgICAgIGFvby5jaG9pY2VzID0gW107XG4gICAgICByZXR1cm4gbmV3IFByb21pc2U8dm9pZD4ocmVzID0+IHtcbiAgICAgICAgYW9vLmdlbmVyYXRvci5zdWJzY3JpYmUoY2hvaWNlcyA9PiB7XG4gICAgICAgICAgYW9vLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgICAgICAgIHJlcygpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG59XG4iXX0=