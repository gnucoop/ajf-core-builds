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
const defaultOpts = {
    emptyString: 'Not specified',
    entriesDivider: ' - ',
    labelSuffix: ': ',
    valuesDivider: ', ',
};
export const buildStringIdentifierOpts = (opts) => (Object.assign(Object.assign({}, defaultOpts), opts));
export const buildStringIdentifier = (stringIdentifier, context, opts) => {
    const strings = Object.assign(Object.assign({}, defaultOpts), opts);
    if (stringIdentifier == null) {
        return strings.emptyString;
    }
    const str = stringIdentifier.map(s => {
        const values = [];
        if (s.value != null && s.value.length > 0) {
            s.value.forEach(curValue => {
                const vp = curValue.split('.');
                let curContext = context;
                let val = null;
                vp.forEach(k => {
                    if (curContext[k] !== undefined) {
                        val = context[k];
                        curContext = context[k];
                    }
                });
                if (val != null && val instanceof Array && val.length > 0) {
                    val = val.map(v => `${v}`).join(', ');
                }
                if (val != null) {
                    values.push(`${val}`);
                }
            });
        }
        return `${s.label}: ${values.length > 0 ? values.join(', ') : strings.emptyString}`;
    });
    return str.join(' - ');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtc3RyaW5nLWlkZW50aWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jb21tb24vYnVpbGQtc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBb0JILE1BQU0sV0FBVyxHQUFHO0lBQ2xCLFdBQVcsRUFBRSxlQUFlO0lBQzVCLGNBQWMsRUFBRSxLQUFLO0lBQ3JCLFdBQVcsRUFBRSxJQUFJO0lBQ2pCLGFBQWEsRUFBRSxJQUFJO0NBQ3BCLENBQUM7QUFFRixNQUFNLENBQUMsTUFBTSx5QkFBeUIsR0FDbEMsQ0FBQyxJQUFnQyxFQUF1QyxFQUFFLENBQ3RFLGlDQUFLLFdBQVcsR0FBSyxJQUFJLEVBQUUsQ0FBQztBQUVwQyxNQUFNLENBQUMsTUFBTSxxQkFBcUIsR0FDOUIsQ0FBQyxnQkFBaUQsRUFBRSxPQUFtQixFQUN0RSxJQUFnQyxFQUFVLEVBQUU7SUFDM0MsTUFBTSxPQUFPLEdBQUcsZ0NBQUksV0FBVyxHQUFLLElBQUksQ0FBd0MsQ0FBQztJQUNqRixJQUFJLGdCQUFnQixJQUFJLElBQUksRUFBRTtRQUM1QixPQUFPLE9BQU8sQ0FBQyxXQUFXLENBQUM7S0FDNUI7SUFDRCxNQUFNLEdBQUcsR0FBYSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDN0MsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN6QixNQUFNLEVBQUUsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QyxJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUM7Z0JBQ3pCLElBQUksR0FBRyxHQUFRLElBQUksQ0FBQztnQkFDcEIsRUFBRSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDYixJQUFJLFVBQVUsQ0FBQyxDQUFDLENBQUMsS0FBSyxTQUFTLEVBQUU7d0JBQy9CLEdBQUcsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ2pCLFVBQVUsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7cUJBQ3pCO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILElBQUksR0FBRyxJQUFJLElBQUksSUFBSSxHQUFHLFlBQVksS0FBSyxJQUFJLEdBQUcsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUN6RCxHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7aUJBQ3ZDO2dCQUNELElBQUksR0FBRyxJQUFJLElBQUksRUFBRTtvQkFDZixNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsR0FBRyxFQUFFLENBQUMsQ0FBQztpQkFDdkI7WUFDSCxDQUFDLENBQUMsQ0FBQztTQUNKO1FBQ0QsT0FBTyxHQUFHLENBQUMsQ0FBQyxLQUFLLEtBQUssTUFBTSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUN0RixDQUFDLENBQUMsQ0FBQztJQUNILE9BQU8sR0FBRyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztBQUN6QixDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dH0gZnJvbSAnLi9jb250ZXh0JztcbmltcG9ydCB7QWpmU3RyaW5nSWRlbnRpZmllcn0gZnJvbSAnLi9zdHJpbmctaWRlbnRpZmllcic7XG5cbi8qKlxuICogZW1wdHlTdHJpbmc6IHRoZSBzdHJpbmcgZGlzcGxheWVkIHdoZW4gdGhlIGNvbnRleHQgaGFzIG5vIG1hdGNoLlxuICogZW50cmllc0RpdmlkZXI6IHRoZSBzdHJpbmcgZGlzcGxhdXllZCBiZWV0d2VuIGVudHJpZXNcbiAqIGxhYmVsU3VmZml4OiB0aGUgc3RyaW5nIGRpc3BsYXllZCBiZXR3ZWVuIHRoZSBsYWJlbCBhbmQgaXRzIHZhbHVlc1xuICogdmFsdWVzRGl2aWRlcjogdGhlIHN0cmluZyBkaXNwYXllZCBiZXR3ZWVuIHZhbHVlc1xuICogQGV4cG9ydFxuICogQGludGVyZmFjZSBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzXG4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgQnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyB7XG4gIGVtcHR5U3RyaW5nPzogc3RyaW5nO1xuICBlbnRyaWVzRGl2aWRlcj86IHN0cmluZztcbiAgbGFiZWxTdWZmaXg/OiBzdHJpbmc7XG4gIHZhbHVlc0RpdmlkZXI/OiBzdHJpbmc7XG59XG5cbmNvbnN0IGRlZmF1bHRPcHRzID0ge1xuICBlbXB0eVN0cmluZzogJ05vdCBzcGVjaWZpZWQnLFxuICBlbnRyaWVzRGl2aWRlcjogJyAtICcsXG4gIGxhYmVsU3VmZml4OiAnOiAnLFxuICB2YWx1ZXNEaXZpZGVyOiAnLCAnLFxufTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHMgPVxuICAgIChvcHRzPzogQnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyk6IFJlcXVpcmVkPEJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHM+ID0+XG4gICAgICAgICh7Li4uZGVmYXVsdE9wdHMsIC4uLm9wdHN9KTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkU3RyaW5nSWRlbnRpZmllciA9XG4gICAgKHN0cmluZ0lkZW50aWZpZXI6IEFqZlN0cmluZ0lkZW50aWZpZXJbXXx1bmRlZmluZWQsIGNvbnRleHQ6IEFqZkNvbnRleHQsXG4gICAgIG9wdHM/OiBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzKTogc3RyaW5nID0+IHtcbiAgICAgIGNvbnN0IHN0cmluZ3MgPSB7Li4uZGVmYXVsdE9wdHMsIC4uLm9wdHN9IGFzIFJlcXVpcmVkPEJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHM+O1xuICAgICAgaWYgKHN0cmluZ0lkZW50aWZpZXIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gc3RyaW5ncy5lbXB0eVN0cmluZztcbiAgICAgIH1cbiAgICAgIGNvbnN0IHN0cjogc3RyaW5nW10gPSBzdHJpbmdJZGVudGlmaWVyLm1hcChzID0+IHtcbiAgICAgICAgY29uc3QgdmFsdWVzOiBzdHJpbmdbXSA9IFtdO1xuICAgICAgICBpZiAocy52YWx1ZSAhPSBudWxsICYmIHMudmFsdWUubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHMudmFsdWUuZm9yRWFjaChjdXJWYWx1ZSA9PiB7XG4gICAgICAgICAgICBjb25zdCB2cDogc3RyaW5nW10gPSBjdXJWYWx1ZS5zcGxpdCgnLicpO1xuICAgICAgICAgICAgbGV0IGN1ckNvbnRleHQgPSBjb250ZXh0O1xuICAgICAgICAgICAgbGV0IHZhbDogYW55ID0gbnVsbDtcbiAgICAgICAgICAgIHZwLmZvckVhY2goayA9PiB7XG4gICAgICAgICAgICAgIGlmIChjdXJDb250ZXh0W2tdICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICB2YWwgPSBjb250ZXh0W2tdO1xuICAgICAgICAgICAgICAgIGN1ckNvbnRleHQgPSBjb250ZXh0W2tdO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGlmICh2YWwgIT0gbnVsbCAmJiB2YWwgaW5zdGFuY2VvZiBBcnJheSAmJiB2YWwubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICB2YWwgPSB2YWwubWFwKHYgPT4gYCR7dn1gKS5qb2luKCcsICcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsKSB7XG4gICAgICAgICAgICAgIHZhbHVlcy5wdXNoKGAke3ZhbH1gKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYCR7cy5sYWJlbH06ICR7dmFsdWVzLmxlbmd0aCA+IDAgPyB2YWx1ZXMuam9pbignLCAnKSA6IHN0cmluZ3MuZW1wdHlTdHJpbmd9YDtcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHN0ci5qb2luKCcgLSAnKTtcbiAgICB9O1xuIl19