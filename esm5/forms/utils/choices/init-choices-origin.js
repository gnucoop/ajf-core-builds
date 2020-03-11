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
        var fo = origin;
        fo.choices = fo.generator();
        return Promise.resolve();
    }
    if (origin.type === 'promise') {
        var po_1 = origin;
        return po_1.generator.then(function (choices) { return po_1.choices = choices; }).then();
    }
    if (origin.type === 'observable') {
        var obso_1 = origin;
        if (obso_1.generator != null) {
            obso_1.choices = [];
            return new Promise(function (res) {
                obso_1.generator.subscribe(function (c) { return obso_1.choices.push(c); }, function () { }, function () { return res(); });
            });
        }
    }
    if (origin.type === 'observableArray') {
        var aoo_1 = origin;
        if (aoo_1.generator != null) {
            aoo_1.choices = [];
            return new Promise(function (res) {
                aoo_1.generator.subscribe(function (choices) {
                    aoo_1.choices = choices;
                    res();
                });
            });
        }
    }
    return Promise.resolve();
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1jaG9pY2VzLW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFVSCxNQUFNLFVBQVUsaUJBQWlCLENBQUMsTUFBNkI7SUFDN0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUMzQixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMxQjtJQUNELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7UUFDOUIsSUFBTSxFQUFFLEdBQUcsTUFBdUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMxQjtJQUNELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxTQUFTLEVBQUU7UUFDN0IsSUFBTSxJQUFFLEdBQUcsTUFBc0MsQ0FBQztRQUNsRCxPQUFPLElBQUUsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLFVBQUEsT0FBTyxJQUFJLE9BQUEsSUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLEVBQXBCLENBQW9CLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztLQUNsRTtJQUNELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDaEMsSUFBTSxNQUFJLEdBQUcsTUFBeUMsQ0FBQztRQUN2RCxJQUFJLE1BQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQzFCLE1BQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sSUFBSSxPQUFPLENBQU8sVUFBQSxHQUFHO2dCQUMxQixNQUFJLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FDdEIsVUFBQSxDQUFDLElBQUksT0FBQSxNQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBcEIsQ0FBb0IsRUFDekIsY0FBTyxDQUFDLEVBQ1IsY0FBTSxPQUFBLEdBQUcsRUFBRSxFQUFMLENBQUssQ0FDWixDQUFDO1lBQ0osQ0FBQyxDQUFDLENBQUM7U0FDSjtLQUNGO0lBQ0QsSUFBSSxNQUFNLENBQUMsSUFBSSxLQUFLLGlCQUFpQixFQUFFO1FBQ3JDLElBQU0sS0FBRyxHQUFHLE1BQThDLENBQUM7UUFDM0QsSUFBSSxLQUFHLENBQUMsU0FBUyxJQUFJLElBQUksRUFBRTtZQUN6QixLQUFHLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQztZQUNqQixPQUFPLElBQUksT0FBTyxDQUFPLFVBQUEsR0FBRztnQkFDMUIsS0FBRyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQ3JCLFVBQUEsT0FBTztvQkFDTCxLQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdEIsR0FBRyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQyxDQUNGLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztTQUNKO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNGdW5jdGlvbk9yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1mdW5jdGlvbi1vcmlnaW4nO1xuaW1wb3J0IHtcbiAgQWpmQ2hvaWNlc09ic2VydmFibGVBcnJheU9yaWdpblxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9ic2VydmFibGUtYXJyYXktb3JpZ2luJztcbmltcG9ydCB7QWpmQ2hvaWNlc09ic2VydmFibGVPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb2JzZXJ2YWJsZS1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNQcm9taXNlT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLXByb21pc2Utb3JpZ2luJztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRDaG9pY2VzT3JpZ2luKG9yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ2ZpeGVkJykge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICBpZiAob3JpZ2luLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBmbyA9IG9yaWdpbiBhcyBBamZDaG9pY2VzRnVuY3Rpb25PcmlnaW48YW55PjtcbiAgICBmby5jaG9pY2VzID0gZm8uZ2VuZXJhdG9yKCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ3Byb21pc2UnKSB7XG4gICAgY29uc3QgcG8gPSBvcmlnaW4gYXMgQWpmQ2hvaWNlc1Byb21pc2VPcmlnaW48YW55PjtcbiAgICByZXR1cm4gcG8uZ2VuZXJhdG9yLnRoZW4oY2hvaWNlcyA9PiBwby5jaG9pY2VzID0gY2hvaWNlcykudGhlbigpO1xuICB9XG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ29ic2VydmFibGUnKSB7XG4gICAgY29uc3Qgb2JzbyA9IG9yaWdpbiBhcyBBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbjxhbnk+O1xuICAgIGlmIChvYnNvLmdlbmVyYXRvciAhPSBudWxsKSB7XG4gICAgICBvYnNvLmNob2ljZXMgPSBbXTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXMgPT4ge1xuICAgICAgICBvYnNvLmdlbmVyYXRvci5zdWJzY3JpYmUoXG4gICAgICAgICAgYyA9PiBvYnNvLmNob2ljZXMucHVzaChjKSxcbiAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAoKSA9PiByZXMoKSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICBpZiAob3JpZ2luLnR5cGUgPT09ICdvYnNlcnZhYmxlQXJyYXknKSB7XG4gICAgY29uc3QgYW9vID0gb3JpZ2luIGFzIEFqZkNob2ljZXNPYnNlcnZhYmxlQXJyYXlPcmlnaW48YW55PjtcbiAgICBpZiAoYW9vLmdlbmVyYXRvciAhPSBudWxsKSB7XG4gICAgICBhb28uY2hvaWNlcyA9IFtdO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlcyA9PiB7XG4gICAgICAgIGFvby5nZW5lcmF0b3Iuc3Vic2NyaWJlKFxuICAgICAgICAgIGNob2ljZXMgPT4ge1xuICAgICAgICAgICAgYW9vLmNob2ljZXMgPSBjaG9pY2VzO1xuICAgICAgICAgICAgcmVzKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbn1cbiJdfQ==