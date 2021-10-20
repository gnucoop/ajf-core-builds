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
        return po.generator.then(choices => (po.choices = choices)).then();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC1jaG9pY2VzLW9yaWdpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2Nob2ljZXMvaW5pdC1jaG9pY2VzLW9yaWdpbi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFPSDs7OztHQUlHO0FBQ0gsTUFBTSxVQUFVLGlCQUFpQixDQUFDLE1BQTZCO0lBQzdELDJEQUEyRDtJQUMzRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssT0FBTyxFQUFFO1FBQzNCLE9BQU8sT0FBTyxDQUFDLE9BQU8sRUFBRSxDQUFDO0tBQzFCO0lBQ0QscURBQXFEO0lBQ3JELElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7UUFDOUIsTUFBTSxFQUFFLEdBQUcsTUFBdUMsQ0FBQztRQUNuRCxFQUFFLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQyxTQUFTLEVBQUUsQ0FBQztRQUM1QixPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztLQUMxQjtJQUNELDREQUE0RDtJQUM1RCxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssU0FBUyxFQUFFO1FBQzdCLE1BQU0sRUFBRSxHQUFHLE1BQXNDLENBQUM7UUFDbEQsT0FBTyxFQUFFLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0tBQ3BFO0lBQ0QsaUVBQWlFO0lBQ2pFLElBQUksTUFBTSxDQUFDLElBQUksS0FBSyxZQUFZLEVBQUU7UUFDaEMsTUFBTSxJQUFJLEdBQUcsTUFBeUMsQ0FBQztRQUN2RCxJQUFJLElBQUksQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQzFCLElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2xCLE9BQU8sSUFBSSxPQUFPLENBQU8sR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUN0QixDQUFDLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUN6QixHQUFHLEVBQUUsR0FBRSxDQUFDLEVBQ1IsR0FBRyxFQUFFLENBQUMsR0FBRyxFQUFFLENBQ1osQ0FBQztZQUNKLENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtJQUNELGlFQUFpRTtJQUNqRSxJQUFJLE1BQU0sQ0FBQyxJQUFJLEtBQUssaUJBQWlCLEVBQUU7UUFDckMsTUFBTSxHQUFHLEdBQUcsTUFBOEMsQ0FBQztRQUMzRCxJQUFJLEdBQUcsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO1lBQ3pCLEdBQUcsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ2pCLE9BQU8sSUFBSSxPQUFPLENBQU8sR0FBRyxDQUFDLEVBQUU7Z0JBQzdCLEdBQUcsQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNoQyxHQUFHLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztvQkFDdEIsR0FBRyxFQUFFLENBQUM7Z0JBQ1IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNKO0tBQ0Y7SUFDRCxPQUFPLE9BQU8sQ0FBQyxPQUFPLEVBQUUsQ0FBQztBQUMzQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNob2ljZXNGdW5jdGlvbk9yaWdpbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Nob2ljZXMvY2hvaWNlcy1mdW5jdGlvbi1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT2JzZXJ2YWJsZUFycmF5T3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9ic2VydmFibGUtYXJyYXktb3JpZ2luJztcbmltcG9ydCB7QWpmQ2hvaWNlc09ic2VydmFibGVPcmlnaW59IGZyb20gJy4uLy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb2JzZXJ2YWJsZS1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNQcm9taXNlT3JpZ2lufSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLXByb21pc2Utb3JpZ2luJztcbi8qKlxuICogQ2FsbGVkIGJ5IGZvcm0tcmVkZXJlclxuICogdGFrZSBhcyBwYXJhbSBhbiBBamZDaG9pY2VzT3JpZ2luJmx0O2FueSZndDsgYW5kIHJldHVybiBhbiBQcm9taXNlJmx0O3ZvaWQmZ3Q7IGZvciBoYW5kbGluZyBhc3luY1xuICogZXZlbnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGluaXRDaG9pY2VzT3JpZ2luKG9yaWdpbjogQWpmQ2hvaWNlc09yaWdpbjxhbnk+KTogUHJvbWlzZTx2b2lkPiB7XG4gIC8qKiBmaXhlZCBkb24ndCB1c2UgYXN5bmMgZXZlbnRlIHRoZSBwcm9taXNlIGlzIHJlc29sdmVkICovXG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ2ZpeGVkJykge1xuICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgfVxuICAvKiogYXBwbHkgZnVuY3Rpb24gYW5kIHRoYW4gcmV0dXJuIHJlc29sdmUgcHJvbWlzZSAqL1xuICBpZiAob3JpZ2luLnR5cGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBjb25zdCBmbyA9IG9yaWdpbiBhcyBBamZDaG9pY2VzRnVuY3Rpb25PcmlnaW48YW55PjtcbiAgICBmby5jaG9pY2VzID0gZm8uZ2VuZXJhdG9yKCk7XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG4gIC8qKiBtb2RpZnkgb3JpZ2luLmNob2ljZXMgd2l0aCByZXN1bHQgb2YgcmVzb2x2ZWQgcHJvbWlzZSAqL1xuICBpZiAob3JpZ2luLnR5cGUgPT09ICdwcm9taXNlJykge1xuICAgIGNvbnN0IHBvID0gb3JpZ2luIGFzIEFqZkNob2ljZXNQcm9taXNlT3JpZ2luPGFueT47XG4gICAgcmV0dXJuIHBvLmdlbmVyYXRvci50aGVuKGNob2ljZXMgPT4gKHBvLmNob2ljZXMgPSBjaG9pY2VzKSkudGhlbigpO1xuICB9XG4gIC8qKiBtb2RpZnkgb3JpZ2luLmNob2ljZXMgd2l0aCByZXN1bHQgb2Ygc3Vic2NyaWJlZCBvYnNlcnZhYmxlICovXG4gIGlmIChvcmlnaW4udHlwZSA9PT0gJ29ic2VydmFibGUnKSB7XG4gICAgY29uc3Qgb2JzbyA9IG9yaWdpbiBhcyBBamZDaG9pY2VzT2JzZXJ2YWJsZU9yaWdpbjxhbnk+O1xuICAgIGlmIChvYnNvLmdlbmVyYXRvciAhPSBudWxsKSB7XG4gICAgICBvYnNvLmNob2ljZXMgPSBbXTtcbiAgICAgIHJldHVybiBuZXcgUHJvbWlzZTx2b2lkPihyZXMgPT4ge1xuICAgICAgICBvYnNvLmdlbmVyYXRvci5zdWJzY3JpYmUoXG4gICAgICAgICAgYyA9PiBvYnNvLmNob2ljZXMucHVzaChjKSxcbiAgICAgICAgICAoKSA9PiB7fSxcbiAgICAgICAgICAoKSA9PiByZXMoKSxcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICAvKiogbW9kaWZ5IG9yaWdpbi5jaG9pY2VzIHdpdGggcmVzdWx0IG9mIHN1YnNjcmliZWQgb2JzZXJ2YWJsZSAqL1xuICBpZiAob3JpZ2luLnR5cGUgPT09ICdvYnNlcnZhYmxlQXJyYXknKSB7XG4gICAgY29uc3QgYW9vID0gb3JpZ2luIGFzIEFqZkNob2ljZXNPYnNlcnZhYmxlQXJyYXlPcmlnaW48YW55PjtcbiAgICBpZiAoYW9vLmdlbmVyYXRvciAhPSBudWxsKSB7XG4gICAgICBhb28uY2hvaWNlcyA9IFtdO1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPHZvaWQ+KHJlcyA9PiB7XG4gICAgICAgIGFvby5nZW5lcmF0b3Iuc3Vic2NyaWJlKGNob2ljZXMgPT4ge1xuICAgICAgICAgIGFvby5jaG9pY2VzID0gY2hvaWNlcztcbiAgICAgICAgICByZXMoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xufVxuIl19