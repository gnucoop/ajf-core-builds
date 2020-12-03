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
export const buildStringIdentifier = (stringIdentifier, context, emptyString = '') => {
    if (stringIdentifier == null) {
        return emptyString;
    }
    const str = stringIdentifier.map(s => {
        const values = [];
        if (s.value != null && s.value.length > 0) {
            s.value.forEach(curValue => {
                let val = null;
                const vp = curValue.split('.');
                vp.forEach(k => {
                    if (context[k] !== undefined) {
                        val = context[k];
                    }
                });
                if (val != null && val instanceof Array &&
                    val.length > 0) {
                    val = val.join(', ');
                }
                if (val != null) {
                    values.push(`${val}`);
                }
            });
        }
        return `${s.label}: ${values.length > 0 ? values.join(', ') : emptyString}`;
    });
    return str.join(' - ');
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGQtc3RyaW5nLWlkZW50aWZpZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9jb21tb24vYnVpbGQtc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBS0gsTUFBTSxDQUFDLE1BQU0scUJBQXFCLEdBQzlCLENBQUMsZ0JBQWlELEVBQUUsT0FBbUIsRUFBRSxXQUFXLEdBQUcsRUFBRSxFQUFFLEVBQUU7SUFDM0YsSUFBSSxnQkFBZ0IsSUFBSSxJQUFJLEVBQUU7UUFDNUIsT0FBTyxXQUFXLENBQUM7S0FDcEI7SUFDRCxNQUFNLEdBQUcsR0FBYSxnQkFBZ0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDN0MsTUFBTSxNQUFNLEdBQWEsRUFBRSxDQUFDO1FBQzVCLElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQ3pDLENBQUMsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxFQUFFO2dCQUN6QixJQUFJLEdBQUcsR0FBeUMsSUFBSSxDQUFDO2dCQUNyRCxNQUFNLEVBQUUsR0FBYSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNiLElBQUksT0FBTyxDQUFDLENBQUMsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDNUIsR0FBRyxHQUFHLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztxQkFDbEI7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxHQUFHLElBQUksSUFBSSxJQUFLLEdBQWUsWUFBWSxLQUFLO29CQUMvQyxHQUEyQixDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQzNDLEdBQUcsR0FBSSxHQUEyQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztpQkFDL0M7Z0JBQ0QsSUFBSSxHQUFHLElBQUksSUFBSSxFQUFFO29CQUNmLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEVBQUUsQ0FBQyxDQUFDO2lCQUN2QjtZQUNILENBQUMsQ0FBQyxDQUFDO1NBQ0o7UUFDRCxPQUFPLEdBQUcsQ0FBQyxDQUFDLEtBQUssS0FBSyxNQUFNLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDOUUsQ0FBQyxDQUFDLENBQUM7SUFDSCxPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7QUFDekIsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHR9IGZyb20gJy4vY29udGV4dCc7XG5pbXBvcnQge0FqZlN0cmluZ0lkZW50aWZpZXJ9IGZyb20gJy4vc3RyaW5nLWlkZW50aWZpZXInO1xuXG5leHBvcnQgY29uc3QgYnVpbGRTdHJpbmdJZGVudGlmaWVyID1cbiAgICAoc3RyaW5nSWRlbnRpZmllcjogQWpmU3RyaW5nSWRlbnRpZmllcltdfHVuZGVmaW5lZCwgY29udGV4dDogQWpmQ29udGV4dCwgZW1wdHlTdHJpbmcgPSAnJykgPT4ge1xuICAgICAgaWYgKHN0cmluZ0lkZW50aWZpZXIgPT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZW1wdHlTdHJpbmc7XG4gICAgICB9XG4gICAgICBjb25zdCBzdHI6IHN0cmluZ1tdID0gc3RyaW5nSWRlbnRpZmllci5tYXAocyA9PiB7XG4gICAgICAgIGNvbnN0IHZhbHVlczogc3RyaW5nW10gPSBbXTtcbiAgICAgICAgaWYgKHMudmFsdWUgIT0gbnVsbCAmJiBzLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBzLnZhbHVlLmZvckVhY2goY3VyVmFsdWUgPT4ge1xuICAgICAgICAgICAgbGV0IHZhbDogc3RyaW5nfG51bWJlcnxzdHJpbmdbXXxudW1iZXJbXXxudWxsID0gbnVsbDtcbiAgICAgICAgICAgIGNvbnN0IHZwOiBzdHJpbmdbXSA9IGN1clZhbHVlLnNwbGl0KCcuJyk7XG4gICAgICAgICAgICB2cC5mb3JFYWNoKGsgPT4ge1xuICAgICAgICAgICAgICBpZiAoY29udGV4dFtrXSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgdmFsID0gY29udGV4dFtrXTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAodmFsICE9IG51bGwgJiYgKHZhbCBhcyB1bmtub3duKSBpbnN0YW5jZW9mIEFycmF5ICYmXG4gICAgICAgICAgICAgICAgKHZhbCBhcyAoc3RyaW5nIHwgbnVtYmVyKVtdKS5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgICAgIHZhbCA9ICh2YWwgYXMgKHN0cmluZyB8IG51bWJlcilbXSkuam9pbignLCAnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlmICh2YWwgIT0gbnVsbCkge1xuICAgICAgICAgICAgICB2YWx1ZXMucHVzaChgJHt2YWx9YCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGAke3MubGFiZWx9OiAke3ZhbHVlcy5sZW5ndGggPiAwID8gdmFsdWVzLmpvaW4oJywgJykgOiBlbXB0eVN0cmluZ31gO1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gc3RyLmpvaW4oJyAtICcpO1xuICAgIH07XG4iXX0=