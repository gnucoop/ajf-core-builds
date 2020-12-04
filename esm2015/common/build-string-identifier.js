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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtc3RyaW5nLWlkZW50aWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jb21tb24vYnVpbGQtc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBWUgsTUFBTSxXQUFXLEdBQUc7SUFDbEIsV0FBVyxFQUFFLGVBQWU7SUFDNUIsY0FBYyxFQUFFLEtBQUs7SUFDckIsV0FBVyxFQUFFLElBQUk7SUFDakIsYUFBYSxFQUFFLElBQUk7Q0FDcEIsQ0FBQztBQUVGLE1BQU0sQ0FBQyxNQUFNLHlCQUF5QixHQUNsQyxDQUFDLElBQWdDLEVBQXVDLEVBQUUsQ0FDdEUsaUNBQUssV0FBVyxHQUFLLElBQUksRUFBRSxDQUFDO0FBRXBDLE1BQU0sQ0FBQyxNQUFNLHFCQUFxQixHQUM5QixDQUFDLGdCQUFpRCxFQUFFLE9BQW1CLEVBQ3RFLElBQWdDLEVBQVUsRUFBRTtJQUMzQyxNQUFNLE9BQU8sR0FBRyxnQ0FBSSxXQUFXLEdBQUssSUFBSSxDQUF3QyxDQUFDO0lBQ2pGLElBQUksZ0JBQWdCLElBQUksSUFBSSxFQUFFO1FBQzVCLE9BQU8sT0FBTyxDQUFDLFdBQVcsQ0FBQztLQUM1QjtJQUNELE1BQU0sR0FBRyxHQUFhLGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtRQUM3QyxNQUFNLE1BQU0sR0FBYSxFQUFFLENBQUM7UUFDNUIsSUFBSSxDQUFDLENBQUMsS0FBSyxJQUFJLElBQUksSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDekMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLEVBQUU7Z0JBQ3pCLE1BQU0sRUFBRSxHQUFhLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pDLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQztnQkFDekIsSUFBSSxHQUFHLEdBQVEsSUFBSSxDQUFDO2dCQUNwQixFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNiLElBQUksVUFBVSxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDL0IsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDakIsVUFBVSxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDekI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFJLEdBQUcsWUFBWSxLQUFLLElBQUksR0FBRyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3pELEdBQUcsR0FBRyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDdkM7Z0JBQ0QsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO29CQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ3RGLENBQUMsQ0FBQyxDQUFDO0lBQ0gsT0FBTyxHQUFHLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO0FBQ3pCLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0fSBmcm9tICcuL2NvbnRleHQnO1xuaW1wb3J0IHtBamZTdHJpbmdJZGVudGlmaWVyfSBmcm9tICcuL3N0cmluZy1pZGVudGlmaWVyJztcblxuZXhwb3J0IGludGVyZmFjZSBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzIHtcbiAgZW1wdHlTdHJpbmc/OiBzdHJpbmc7XG4gIGVudHJpZXNEaXZpZGVyPzogc3RyaW5nO1xuICBsYWJlbFN1ZmZpeD86IHN0cmluZztcbiAgdmFsdWVzRGl2aWRlcj86IHN0cmluZztcbn1cblxuY29uc3QgZGVmYXVsdE9wdHMgPSB7XG4gIGVtcHR5U3RyaW5nOiAnTm90IHNwZWNpZmllZCcsXG4gIGVudHJpZXNEaXZpZGVyOiAnIC0gJyxcbiAgbGFiZWxTdWZmaXg6ICc6ICcsXG4gIHZhbHVlc0RpdmlkZXI6ICcsICcsXG59O1xuXG5leHBvcnQgY29uc3QgYnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cyA9XG4gICAgKG9wdHM/OiBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzKTogUmVxdWlyZWQ8QnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cz4gPT5cbiAgICAgICAgKHsuLi5kZWZhdWx0T3B0cywgLi4ub3B0c30pO1xuXG5leHBvcnQgY29uc3QgYnVpbGRTdHJpbmdJZGVudGlmaWVyID1cbiAgICAoc3RyaW5nSWRlbnRpZmllcjogQWpmU3RyaW5nSWRlbnRpZmllcltdfHVuZGVmaW5lZCwgY29udGV4dDogQWpmQ29udGV4dCxcbiAgICAgb3B0cz86IEJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHMpOiBzdHJpbmcgPT4ge1xuICAgICAgY29uc3Qgc3RyaW5ncyA9IHsuLi5kZWZhdWx0T3B0cywgLi4ub3B0c30gYXMgUmVxdWlyZWQ8QnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0cz47XG4gICAgICBpZiAoc3RyaW5nSWRlbnRpZmllciA9PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBzdHJpbmdzLmVtcHR5U3RyaW5nO1xuICAgICAgfVxuICAgICAgY29uc3Qgc3RyOiBzdHJpbmdbXSA9IHN0cmluZ0lkZW50aWZpZXIubWFwKHMgPT4ge1xuICAgICAgICBjb25zdCB2YWx1ZXM6IHN0cmluZ1tdID0gW107XG4gICAgICAgIGlmIChzLnZhbHVlICE9IG51bGwgJiYgcy52YWx1ZS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgcy52YWx1ZS5mb3JFYWNoKGN1clZhbHVlID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHZwOiBzdHJpbmdbXSA9IGN1clZhbHVlLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICBsZXQgY3VyQ29udGV4dCA9IGNvbnRleHQ7XG4gICAgICAgICAgICBsZXQgdmFsOiBhbnkgPSBudWxsO1xuICAgICAgICAgICAgdnAuZm9yRWFjaChrID0+IHtcbiAgICAgICAgICAgICAgaWYgKGN1ckNvbnRleHRba10gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgIHZhbCA9IGNvbnRleHRba107XG4gICAgICAgICAgICAgICAgY3VyQ29udGV4dCA9IGNvbnRleHRba107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKHZhbCAhPSBudWxsICYmIHZhbCBpbnN0YW5jZW9mIEFycmF5ICYmIHZhbC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHZhbCA9IHZhbC5tYXAodiA9PiBgJHt2fWApLmpvaW4oJywgJyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZiAodmFsICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgdmFsdWVzLnB1c2goYCR7dmFsfWApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBgJHtzLmxhYmVsfTogJHt2YWx1ZXMubGVuZ3RoID4gMCA/IHZhbHVlcy5qb2luKCcsICcpIDogc3RyaW5ncy5lbXB0eVN0cmluZ31gO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gc3RyLmpvaW4oJyAtICcpO1xuICAgIH07XG4iXX0=