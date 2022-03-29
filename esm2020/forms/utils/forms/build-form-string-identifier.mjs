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
import { buildStringIdentifier, buildStringIdentifierOpts, } from '@ajf/core/common';
import { isFieldWithChoices } from '../fields/is-field-with-choices';
import { isMultipleChoiceField } from '../fields/is-multiple-choice-field';
import { isSingleChoiceField } from '../fields/is-single-choice-field';
import { flattenNodes } from '../nodes/flatten-nodes';
import { isField } from '../nodes/is-field';
/**
 * It builds a string that contains information preview about the form and its context.
 */
export const buildFormStringIdentifier = (form, context, opts) => {
    if (form == null) {
        return '';
    }
    const stringIdentifier = form.stringIdentifier || [];
    if (stringIdentifier.length === 0) {
        return '';
    }
    const fields = flattenNodes(form.nodes).filter(n => isField(n) && isFieldWithChoices(n));
    if (fields.length > 0) {
        context = { ...context };
        fields.forEach(field => {
            const value = context[field.name];
            if (value == null) {
                return;
            }
            if (isSingleChoiceField(field)) {
                const choice = field.choicesOrigin.choices.find(c => c.value === value);
                if (choice == null) {
                    return;
                }
                context[field.name] = choice.label;
            }
            else if (isMultipleChoiceField(field) && Array.isArray(value) && value.length > 0) {
                const strings = buildStringIdentifierOpts(opts);
                const choices = field.choicesOrigin.choices.filter(c => value.indexOf(c.value) > -1);
                context[field.name] = choices.map(c => c.label).join(strings.valuesDivider);
            }
        });
    }
    return buildStringIdentifier(stringIdentifier, context, opts);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtZm9ybS1zdHJpbmctaWRlbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL3V0aWxzL2Zvcm1zL2J1aWxkLWZvcm0tc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHFCQUFxQixFQUNyQix5QkFBeUIsR0FFMUIsTUFBTSxrQkFBa0IsQ0FBQztBQUkxQixPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxpQ0FBaUMsQ0FBQztBQUNuRSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUN6RSxPQUFPLEVBQUMsbUJBQW1CLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUNyRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sd0JBQXdCLENBQUM7QUFDcEQsT0FBTyxFQUFDLE9BQU8sRUFBQyxNQUFNLG1CQUFtQixDQUFDO0FBRTFDOztHQUVHO0FBQ0gsTUFBTSxDQUFDLE1BQU0seUJBQXlCLEdBQUcsQ0FDdkMsSUFBYSxFQUNiLE9BQW1CLEVBQ25CLElBQWdDLEVBQ3hCLEVBQUU7SUFDVixJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDaEIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztJQUNyRCxJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDakMsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE1BQU0sTUFBTSxHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUM1QyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsQ0FDUCxDQUFDO0lBQ3BDLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDckIsT0FBTyxHQUFHLEVBQUMsR0FBRyxPQUFPLEVBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUNqQixPQUFPO2FBQ1I7WUFDRCxJQUFJLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUM5QixNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUN4RSxJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLE9BQU87aUJBQ1I7Z0JBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3BDO2lCQUFNLElBQUkscUJBQXFCLENBQUMsS0FBSyxDQUFDLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDbkYsTUFBTSxPQUFPLEdBQUcseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3JGLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzdFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELE9BQU8scUJBQXFCLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ29udGV4dCxcbiAgYnVpbGRTdHJpbmdJZGVudGlmaWVyLFxuICBidWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzLFxuICBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzLFxufSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcblxuaW1wb3J0IHtBamZGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4uLy4uL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7aXNGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi9maWVsZHMvaXMtZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7aXNNdWx0aXBsZUNob2ljZUZpZWxkfSBmcm9tICcuLi9maWVsZHMvaXMtbXVsdGlwbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7aXNTaW5nbGVDaG9pY2VGaWVsZH0gZnJvbSAnLi4vZmllbGRzL2lzLXNpbmdsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXN9IGZyb20gJy4uL25vZGVzL2ZsYXR0ZW4tbm9kZXMnO1xuaW1wb3J0IHtpc0ZpZWxkfSBmcm9tICcuLi9ub2Rlcy9pcy1maWVsZCc7XG5cbi8qKlxuICogSXQgYnVpbGRzIGEgc3RyaW5nIHRoYXQgY29udGFpbnMgaW5mb3JtYXRpb24gcHJldmlldyBhYm91dCB0aGUgZm9ybSBhbmQgaXRzIGNvbnRleHQuXG4gKi9cbmV4cG9ydCBjb25zdCBidWlsZEZvcm1TdHJpbmdJZGVudGlmaWVyID0gKFxuICBmb3JtOiBBamZGb3JtLFxuICBjb250ZXh0OiBBamZDb250ZXh0LFxuICBvcHRzPzogQnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyxcbik6IHN0cmluZyA9PiB7XG4gIGlmIChmb3JtID09IG51bGwpIHtcbiAgICByZXR1cm4gJyc7XG4gIH1cbiAgY29uc3Qgc3RyaW5nSWRlbnRpZmllciA9IGZvcm0uc3RyaW5nSWRlbnRpZmllciB8fCBbXTtcbiAgaWYgKHN0cmluZ0lkZW50aWZpZXIubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGNvbnN0IGZpZWxkcyA9IGZsYXR0ZW5Ob2Rlcyhmb3JtLm5vZGVzKS5maWx0ZXIoXG4gICAgbiA9PiBpc0ZpZWxkKG4pICYmIGlzRmllbGRXaXRoQ2hvaWNlcyhuKSxcbiAgKSBhcyBBamZGaWVsZFdpdGhDaG9pY2VzPHVua25vd24+W107XG4gIGlmIChmaWVsZHMubGVuZ3RoID4gMCkge1xuICAgIGNvbnRleHQgPSB7Li4uY29udGV4dH07XG4gICAgZmllbGRzLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSBjb250ZXh0W2ZpZWxkLm5hbWVdO1xuICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGlzU2luZ2xlQ2hvaWNlRmllbGQoZmllbGQpKSB7XG4gICAgICAgIGNvbnN0IGNob2ljZSA9IGZpZWxkLmNob2ljZXNPcmlnaW4uY2hvaWNlcy5maW5kKGMgPT4gYy52YWx1ZSA9PT0gdmFsdWUpO1xuICAgICAgICBpZiAoY2hvaWNlID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29udGV4dFtmaWVsZC5uYW1lXSA9IGNob2ljZS5sYWJlbDtcbiAgICAgIH0gZWxzZSBpZiAoaXNNdWx0aXBsZUNob2ljZUZpZWxkKGZpZWxkKSAmJiBBcnJheS5pc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZ3MgPSBidWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzKG9wdHMpO1xuICAgICAgICBjb25zdCBjaG9pY2VzID0gZmllbGQuY2hvaWNlc09yaWdpbi5jaG9pY2VzLmZpbHRlcihjID0+IHZhbHVlLmluZGV4T2YoYy52YWx1ZSkgPiAtMSk7XG4gICAgICAgIGNvbnRleHRbZmllbGQubmFtZV0gPSBjaG9pY2VzLm1hcChjID0+IGMubGFiZWwpLmpvaW4oc3RyaW5ncy52YWx1ZXNEaXZpZGVyKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICByZXR1cm4gYnVpbGRTdHJpbmdJZGVudGlmaWVyKHN0cmluZ0lkZW50aWZpZXIsIGNvbnRleHQsIG9wdHMpO1xufTtcbiJdfQ==