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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtZm9ybS1zdHJpbmctaWRlbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL3V0aWxzL2Zvcm1zL2J1aWxkLWZvcm0tc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUVMLHFCQUFxQixFQUNyQix5QkFBeUIsR0FFMUIsTUFBTSxrQkFBa0IsQ0FBQztBQUcxQixPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sbUNBQW1DLENBQUM7QUFLL0QsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0saUNBQWlDLENBQUM7QUFDbkUsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3BELE9BQU8sRUFBQyxPQUFPLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQUUxQyxNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FDbEMsQ0FBQyxJQUFhLEVBQUUsT0FBbUIsRUFBRSxJQUFnQyxFQUFVLEVBQUU7SUFDL0UsSUFBSSxJQUFJLElBQUksSUFBSSxFQUFFO1FBQ2hCLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUM7SUFDckQsSUFBSSxnQkFBZ0IsQ0FBQyxNQUFNLEtBQUssQ0FBQyxFQUFFO1FBQ2pDLE9BQU8sRUFBRSxDQUFDO0tBQ1g7SUFDRCxNQUFNLE1BQU0sR0FDUixZQUFZLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsSUFBSSxrQkFBa0IsQ0FBQyxDQUFhLENBQUMsQ0FDdEQsQ0FBQztJQUNuQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLE9BQU8scUJBQU8sT0FBTyxDQUFDLENBQUM7UUFDdkIsTUFBTSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtZQUNyQixNQUFNLEtBQUssR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLElBQUksS0FBSyxJQUFJLElBQUksRUFBRTtnQkFDakIsT0FBTzthQUNSO1lBQ0QsSUFBSSxLQUFLLENBQUMsU0FBUyxLQUFLLFlBQVksQ0FBQyxZQUFZLEVBQUU7Z0JBQ2pELE1BQU0saUJBQWlCLEdBQUcsS0FBc0MsQ0FBQztnQkFDakUsTUFBTSxNQUFNLEdBQUcsaUJBQWlCLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxLQUFLLEtBQUssQ0FBQyxDQUFDO2dCQUNwRixJQUFJLE1BQU0sSUFBSSxJQUFJLEVBQUU7b0JBQ2xCLE9BQU87aUJBQ1I7Z0JBQ0QsT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxNQUFNLENBQUMsS0FBSyxDQUFDO2FBQ3BDO2lCQUFNLElBQ0gsS0FBSyxDQUFDLFNBQVMsS0FBSyxZQUFZLENBQUMsY0FBYyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDO2dCQUN2RSxLQUFLLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDcEIsTUFBTSxPQUFPLEdBQUcseUJBQXlCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2hELE1BQU0sbUJBQW1CLEdBQUcsS0FBd0MsQ0FBQztnQkFDckUsTUFBTSxPQUFPLEdBQ1QsbUJBQW1CLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN2RixPQUFPLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxhQUFhLENBQUMsQ0FBQzthQUM3RTtRQUNILENBQUMsQ0FBQyxDQUFDO0tBQ0o7SUFDRCxPQUFPLHFCQUFxQixDQUFDLGdCQUFnQixFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztBQUNoRSxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFqZkNvbnRleHQsXG4gIGJ1aWxkU3RyaW5nSWRlbnRpZmllcixcbiAgYnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyxcbiAgQnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyxcbn0gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5cbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7QWpmTXVsdGlwbGVDaG9pY2VGaWVsZH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9tdWx0aXBsZS1jaG9pY2UtZmllbGQnO1xuaW1wb3J0IHtBamZTaW5nbGVDaG9pY2VGaWVsZH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2ZpZWxkcy9zaW5nbGUtY2hvaWNlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtpc0ZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4uL2ZpZWxkcy9pcy1maWVsZC13aXRoLWNob2ljZXMnO1xuaW1wb3J0IHtmbGF0dGVuTm9kZXN9IGZyb20gJy4uL25vZGVzL2ZsYXR0ZW4tbm9kZXMnO1xuaW1wb3J0IHtpc0ZpZWxkfSBmcm9tICcuLi9ub2Rlcy9pcy1maWVsZCc7XG5cbmV4cG9ydCBjb25zdCBidWlsZEZvcm1TdHJpbmdJZGVudGlmaWVyID1cbiAgICAoZm9ybTogQWpmRm9ybSwgY29udGV4dDogQWpmQ29udGV4dCwgb3B0cz86IEJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHMpOiBzdHJpbmcgPT4ge1xuICAgICAgaWYgKGZvcm0gPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gJyc7XG4gICAgICB9XG4gICAgICBjb25zdCBzdHJpbmdJZGVudGlmaWVyID0gZm9ybS5zdHJpbmdJZGVudGlmaWVyIHx8IFtdO1xuICAgICAgaWYgKHN0cmluZ0lkZW50aWZpZXIubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHJldHVybiAnJztcbiAgICAgIH1cbiAgICAgIGNvbnN0IGZpZWxkcyA9XG4gICAgICAgICAgZmxhdHRlbk5vZGVzKGZvcm0ubm9kZXMpLmZpbHRlcihuID0+IGlzRmllbGQobikgJiYgaXNGaWVsZFdpdGhDaG9pY2VzKG4gYXMgQWpmRmllbGQpKSBhc1xuICAgICAgICAgIEFqZkZpZWxkV2l0aENob2ljZXM8dW5rbm93bj5bXTtcbiAgICAgIGlmIChmaWVsZHMubGVuZ3RoID4gMCkge1xuICAgICAgICBjb250ZXh0ID0gey4uLmNvbnRleHR9O1xuICAgICAgICBmaWVsZHMuZm9yRWFjaChmaWVsZCA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWUgPSBjb250ZXh0W2ZpZWxkLm5hbWVdO1xuICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChmaWVsZC5maWVsZFR5cGUgPT09IEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2UpIHtcbiAgICAgICAgICAgIGNvbnN0IHNpbmdsZUNob2ljZUZpZWxkID0gZmllbGQgYXMgQWpmU2luZ2xlQ2hvaWNlRmllbGQ8dW5rbm93bj47XG4gICAgICAgICAgICBjb25zdCBjaG9pY2UgPSBzaW5nbGVDaG9pY2VGaWVsZC5jaG9pY2VzT3JpZ2luLmNob2ljZXMuZmluZChjID0+IGMudmFsdWUgPT09IHZhbHVlKTtcbiAgICAgICAgICAgIGlmIChjaG9pY2UgPT0gbnVsbCkge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjb250ZXh0W2ZpZWxkLm5hbWVdID0gY2hvaWNlLmxhYmVsO1xuICAgICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgICAgIGZpZWxkLmZpZWxkVHlwZSA9PT0gQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlICYmIEFycmF5LmlzQXJyYXkodmFsdWUpICYmXG4gICAgICAgICAgICAgIHZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIGNvbnN0IHN0cmluZ3MgPSBidWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzKG9wdHMpO1xuICAgICAgICAgICAgY29uc3QgbXVsdGlwbGVDaG9pY2VGaWVsZCA9IGZpZWxkIGFzIEFqZk11bHRpcGxlQ2hvaWNlRmllbGQ8dW5rbm93bj47XG4gICAgICAgICAgICBjb25zdCBjaG9pY2VzID1cbiAgICAgICAgICAgICAgICBtdWx0aXBsZUNob2ljZUZpZWxkLmNob2ljZXNPcmlnaW4uY2hvaWNlcy5maWx0ZXIoYyA9PiB2YWx1ZS5pbmRleE9mKGMudmFsdWUpID4gLTEpO1xuICAgICAgICAgICAgY29udGV4dFtmaWVsZC5uYW1lXSA9IGNob2ljZXMubWFwKGMgPT4gYy5sYWJlbCkuam9pbihzdHJpbmdzLnZhbHVlc0RpdmlkZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYnVpbGRTdHJpbmdJZGVudGlmaWVyKHN0cmluZ0lkZW50aWZpZXIsIGNvbnRleHQsIG9wdHMpO1xuICAgIH07XG4iXX0=