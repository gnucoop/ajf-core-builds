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
import { AjfFieldType } from '../../interface/fields/field-type';
import { isFieldWithChoices } from '../fields/is-field-with-choices';
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
        context = Object.assign({}, context);
        fields.forEach(field => {
            const value = context[field.name];
            if (value == null) {
                return;
            }
            if (field.fieldType === AjfFieldType.SingleChoice) {
                const singleChoiceField = field;
                const choice = singleChoiceField.choicesOrigin.choices.find(c => c.value === value);
                if (choice == null) {
                    return;
                }
                context[field.name] = choice.label;
            }
            else if (field.fieldType === AjfFieldType.MultipleChoice && Array.isArray(value) &&
                value.length > 0) {
                const strings = buildStringIdentifierOpts(opts);
                const multipleChoiceField = field;
                const choices = multipleChoiceField.choicesOrigin.choices.filter(c => value.indexOf(c.value) > -1);
                context[field.name] = choices.map(c => c.label).join(strings.valuesDivider);
            }
        });
    }
    return buildStringIdentifier(stringIdentifier, context, opts);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtZm9ybS1zdHJpbmctaWRlbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2Zvcm1zL2J1aWxkLWZvcm0tc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHFCQUFxQixFQUNyQix5QkFBeUIsR0FFMUIsTUFBTSxrQkFBa0IsQ0FBQztBQUcxQixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFLL0QsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUNsQyxDQUFDLElBQWEsRUFBRSxPQUFtQixFQUFFLElBQWdDLEVBQVUsRUFBRTtJQUMvRSxJQUFJLElBQUksSUFBSSxJQUFJLEVBQUU7UUFDaEIsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGdCQUFnQixJQUFJLEVBQUUsQ0FBQztJQUNyRCxJQUFJLGdCQUFnQixDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDakMsT0FBTyxFQUFFLENBQUM7S0FDWDtJQUNELE1BQU0sTUFBTSxHQUNSLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxJQUFJLGtCQUFrQixDQUFDLENBQWEsQ0FBQyxDQUN0RCxDQUFDO0lBQ25DLElBQUksTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDckIsT0FBTyxxQkFBTyxPQUFPLENBQUMsQ0FBQztRQUN2QixNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ3JCLE1BQU0sS0FBSyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsSUFBSSxLQUFLLElBQUksSUFBSSxFQUFFO2dCQUNqQixPQUFPO2FBQ1I7WUFDRCxJQUFJLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLFlBQVksRUFBRTtnQkFDakQsTUFBTSxpQkFBaUIsR0FBRyxLQUFzQyxDQUFDO2dCQUNqRSxNQUFNLE1BQU0sR0FBRyxpQkFBaUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLEtBQUssS0FBSyxDQUFDLENBQUM7Z0JBQ3BGLElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtvQkFDbEIsT0FBTztpQkFDUjtnQkFDRCxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUM7YUFDcEM7aUJBQU0sSUFDSCxLQUFLLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxjQUFjLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUM7Z0JBQ3ZFLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNwQixNQUFNLE9BQU8sR0FBRyx5QkFBeUIsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDaEQsTUFBTSxtQkFBbUIsR0FBRyxLQUF3QyxDQUFDO2dCQUNyRSxNQUFNLE9BQU8sR0FDVCxtQkFBbUIsQ0FBQyxhQUFhLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3ZGLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQzdFO1FBQ0gsQ0FBQyxDQUFDLENBQUM7S0FDSjtJQUNELE9BQU8scUJBQXFCLENBQUMsZ0JBQWdCLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmQ29udGV4dCxcbiAgYnVpbGRTdHJpbmdJZGVudGlmaWVyLFxuICBidWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzLFxuICBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzLFxufSBmcm9tICdAYWpmL2NvcmUvY29tbW9uJztcblxuaW1wb3J0IHtBamZGaWVsZH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZCc7XG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtBamZNdWx0aXBsZUNob2ljZUZpZWxkfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL211bHRpcGxlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZlNpbmdsZUNob2ljZUZpZWxkfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL3NpbmdsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZm9ybXMvZm9ybSc7XG5pbXBvcnQge2lzRmllbGRXaXRoQ2hvaWNlc30gZnJvbSAnLi4vZmllbGRzL2lzLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2ZsYXR0ZW5Ob2Rlc30gZnJvbSAnLi4vbm9kZXMvZmxhdHRlbi1ub2Rlcyc7XG5pbXBvcnQge2lzRmllbGR9IGZyb20gJy4uL25vZGVzL2lzLWZpZWxkJztcblxuLyoqXG4gKiBJdCBidWlsZHMgYSBzdHJpbmcgdGhhdCBjb250YWlucyBpbmZvcm1hdGlvbiBwcmV2aWV3IGFib3V0IHRoZSBmb3JtIGFuZCBpdHMgY29udGV4dC5cbiAqL1xuZXhwb3J0IGNvbnN0IGJ1aWxkRm9ybVN0cmluZ0lkZW50aWZpZXIgPVxuICAgIChmb3JtOiBBamZGb3JtLCBjb250ZXh0OiBBamZDb250ZXh0LCBvcHRzPzogQnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyk6IHN0cmluZyA9PiB7XG4gICAgICBpZiAoZm9ybSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0cmluZ0lkZW50aWZpZXIgPSBmb3JtLnN0cmluZ0lkZW50aWZpZXIgfHwgW107XG4gICAgICBpZiAoc3RyaW5nSWRlbnRpZmllci5sZW5ndGggPT09IDApIHtcbiAgICAgICAgcmV0dXJuICcnO1xuICAgICAgfVxuICAgICAgY29uc3QgZmllbGRzID1cbiAgICAgICAgICBmbGF0dGVuTm9kZXMoZm9ybS5ub2RlcykuZmlsdGVyKG4gPT4gaXNGaWVsZChuKSAmJiBpc0ZpZWxkV2l0aENob2ljZXMobiBhcyBBamZGaWVsZCkpIGFzXG4gICAgICAgICAgQWpmRmllbGRXaXRoQ2hvaWNlczx1bmtub3duPltdO1xuICAgICAgaWYgKGZpZWxkcy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGNvbnRleHQgPSB7Li4uY29udGV4dH07XG4gICAgICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNvbnRleHRbZmllbGQubmFtZV07XG4gICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGZpZWxkLmZpZWxkVHlwZSA9PT0gQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZSkge1xuICAgICAgICAgICAgY29uc3Qgc2luZ2xlQ2hvaWNlRmllbGQgPSBmaWVsZCBhcyBBamZTaW5nbGVDaG9pY2VGaWVsZDx1bmtub3duPjtcbiAgICAgICAgICAgIGNvbnN0IGNob2ljZSA9IHNpbmdsZUNob2ljZUZpZWxkLmNob2ljZXNPcmlnaW4uY2hvaWNlcy5maW5kKGMgPT4gYy52YWx1ZSA9PT0gdmFsdWUpO1xuICAgICAgICAgICAgaWYgKGNob2ljZSA9PSBudWxsKSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnRleHRbZmllbGQubmFtZV0gPSBjaG9pY2UubGFiZWw7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgICAgZmllbGQuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2UgJiYgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiZcbiAgICAgICAgICAgICAgdmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgY29uc3Qgc3RyaW5ncyA9IGJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHMob3B0cyk7XG4gICAgICAgICAgICBjb25zdCBtdWx0aXBsZUNob2ljZUZpZWxkID0gZmllbGQgYXMgQWpmTXVsdGlwbGVDaG9pY2VGaWVsZDx1bmtub3duPjtcbiAgICAgICAgICAgIGNvbnN0IGNob2ljZXMgPVxuICAgICAgICAgICAgICAgIG11bHRpcGxlQ2hvaWNlRmllbGQuY2hvaWNlc09yaWdpbi5jaG9pY2VzLmZpbHRlcihjID0+IHZhbHVlLmluZGV4T2YoYy52YWx1ZSkgPiAtMSk7XG4gICAgICAgICAgICBjb250ZXh0W2ZpZWxkLm5hbWVdID0gY2hvaWNlcy5tYXAoYyA9PiBjLmxhYmVsKS5qb2luKHN0cmluZ3MudmFsdWVzRGl2aWRlcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBidWlsZFN0cmluZ0lkZW50aWZpZXIoc3RyaW5nSWRlbnRpZmllciwgY29udGV4dCwgb3B0cyk7XG4gICAgfTtcbiJdfQ==