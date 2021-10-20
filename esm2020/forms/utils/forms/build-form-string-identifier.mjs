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
        context = { ...context };
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
            else if (field.fieldType === AjfFieldType.MultipleChoice &&
                Array.isArray(value) &&
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtZm9ybS1zdHJpbmctaWRlbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2Zvcm1zL2J1aWxkLWZvcm0tc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHFCQUFxQixFQUNyQix5QkFBeUIsR0FFMUIsTUFBTSxrQkFBa0IsQ0FBQztBQUcxQixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFLL0QsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQzs7R0FFRztBQUNILE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUFHLENBQ3ZDLElBQWEsRUFDYixPQUFtQixFQUNuQixJQUFnQyxFQUN4QixFQUFFO0lBQ1YsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7SUFDckQsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2pDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLE1BQU0sR0FBRyxZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FDNUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLElBQUksa0JBQWtCLENBQUMsQ0FBYSxDQUFDLENBQ25CLENBQUM7SUFDcEMsSUFBSSxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNyQixPQUFPLEdBQUcsRUFBQyxHQUFHLE9BQU8sRUFBQyxDQUFDO1FBQ3ZCLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDckIsTUFBTSxLQUFLLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsQyxJQUFJLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ2pCLE9BQU87YUFDUjtZQUNELElBQUksS0FBSyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsWUFBWSxFQUFFO2dCQUNqRCxNQUFNLGlCQUFpQixHQUFHLEtBQXNDLENBQUM7Z0JBQ2pFLE1BQU0sTUFBTSxHQUFHLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssS0FBSyxLQUFLLENBQUMsQ0FBQztnQkFDcEYsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO29CQUNsQixPQUFPO2lCQUNSO2dCQUNELE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQzthQUNwQztpQkFBTSxJQUNMLEtBQUssQ0FBQyxTQUFTLEtBQUssWUFBWSxDQUFDLGNBQWM7Z0JBQy9DLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUNwQixLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFDaEI7Z0JBQ0EsTUFBTSxPQUFPLEdBQUcseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sbUJBQW1CLEdBQUcsS0FBd0MsQ0FBQztnQkFDckUsTUFBTSxPQUFPLEdBQUcsbUJBQW1CLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQzlELENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQ2pDLENBQUM7Z0JBQ0YsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDN0U7UUFDSCxDQUFDLENBQUMsQ0FBQztLQUNKO0lBQ0QsT0FBTyxxQkFBcUIsQ0FBQyxnQkFBZ0IsRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7QUFDaEUsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZDb250ZXh0LFxuICBidWlsZFN0cmluZ0lkZW50aWZpZXIsXG4gIGJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHMsXG4gIEJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHMsXG59IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuXG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge0FqZk11bHRpcGxlQ2hvaWNlRmllbGR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvbXVsdGlwbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmU2luZ2xlQ2hvaWNlRmllbGR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvc2luZ2xlLWNob2ljZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4uLy4uL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7aXNGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi9maWVsZHMvaXMtZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7ZmxhdHRlbk5vZGVzfSBmcm9tICcuLi9ub2Rlcy9mbGF0dGVuLW5vZGVzJztcbmltcG9ydCB7aXNGaWVsZH0gZnJvbSAnLi4vbm9kZXMvaXMtZmllbGQnO1xuXG4vKipcbiAqIEl0IGJ1aWxkcyBhIHN0cmluZyB0aGF0IGNvbnRhaW5zIGluZm9ybWF0aW9uIHByZXZpZXcgYWJvdXQgdGhlIGZvcm0gYW5kIGl0cyBjb250ZXh0LlxuICovXG5leHBvcnQgY29uc3QgYnVpbGRGb3JtU3RyaW5nSWRlbnRpZmllciA9IChcbiAgZm9ybTogQWpmRm9ybSxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgb3B0cz86IEJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHMsXG4pOiBzdHJpbmcgPT4ge1xuICBpZiAoZm9ybSA9PSBudWxsKSB7XG4gICAgcmV0dXJuICcnO1xuICB9XG4gIGNvbnN0IHN0cmluZ0lkZW50aWZpZXIgPSBmb3JtLnN0cmluZ0lkZW50aWZpZXIgfHwgW107XG4gIGlmIChzdHJpbmdJZGVudGlmaWVyLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiAnJztcbiAgfVxuICBjb25zdCBmaWVsZHMgPSBmbGF0dGVuTm9kZXMoZm9ybS5ub2RlcykuZmlsdGVyKFxuICAgIG4gPT4gaXNGaWVsZChuKSAmJiBpc0ZpZWxkV2l0aENob2ljZXMobiBhcyBBamZGaWVsZCksXG4gICkgYXMgQWpmRmllbGRXaXRoQ2hvaWNlczx1bmtub3duPltdO1xuICBpZiAoZmllbGRzLmxlbmd0aCA+IDApIHtcbiAgICBjb250ZXh0ID0gey4uLmNvbnRleHR9O1xuICAgIGZpZWxkcy5mb3JFYWNoKGZpZWxkID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gY29udGV4dFtmaWVsZC5uYW1lXTtcbiAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChmaWVsZC5maWVsZFR5cGUgPT09IEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2UpIHtcbiAgICAgICAgY29uc3Qgc2luZ2xlQ2hvaWNlRmllbGQgPSBmaWVsZCBhcyBBamZTaW5nbGVDaG9pY2VGaWVsZDx1bmtub3duPjtcbiAgICAgICAgY29uc3QgY2hvaWNlID0gc2luZ2xlQ2hvaWNlRmllbGQuY2hvaWNlc09yaWdpbi5jaG9pY2VzLmZpbmQoYyA9PiBjLnZhbHVlID09PSB2YWx1ZSk7XG4gICAgICAgIGlmIChjaG9pY2UgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb250ZXh0W2ZpZWxkLm5hbWVdID0gY2hvaWNlLmxhYmVsO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZmllbGQuZmllbGRUeXBlID09PSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2UgJiZcbiAgICAgICAgQXJyYXkuaXNBcnJheSh2YWx1ZSkgJiZcbiAgICAgICAgdmFsdWUubGVuZ3RoID4gMFxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHN0cmluZ3MgPSBidWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzKG9wdHMpO1xuICAgICAgICBjb25zdCBtdWx0aXBsZUNob2ljZUZpZWxkID0gZmllbGQgYXMgQWpmTXVsdGlwbGVDaG9pY2VGaWVsZDx1bmtub3duPjtcbiAgICAgICAgY29uc3QgY2hvaWNlcyA9IG11bHRpcGxlQ2hvaWNlRmllbGQuY2hvaWNlc09yaWdpbi5jaG9pY2VzLmZpbHRlcihcbiAgICAgICAgICBjID0+IHZhbHVlLmluZGV4T2YoYy52YWx1ZSkgPiAtMSxcbiAgICAgICAgKTtcbiAgICAgICAgY29udGV4dFtmaWVsZC5uYW1lXSA9IGNob2ljZXMubWFwKGMgPT4gYy5sYWJlbCkuam9pbihzdHJpbmdzLnZhbHVlc0RpdmlkZXIpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIHJldHVybiBidWlsZFN0cmluZ0lkZW50aWZpZXIoc3RyaW5nSWRlbnRpZmllciwgY29udGV4dCwgb3B0cyk7XG59O1xuIl19