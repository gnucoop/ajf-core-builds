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
import { evaluateExpression } from '@ajf/core/models';
export function trFormula(f, context, ts) {
    let formula = f.formula;
    if (formula.substring(0, 1) === '"' || formula.substring(0, 1) === "'") {
        const ft = formula.slice(1, -1);
        const transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0 ? ts.translate(ft) : ft;
        if (ft.length > 0) {
            formula = `"${transFt}"`;
        }
    }
    else {
        formula =
            formula != null && typeof formula === 'string' && formula.trim().length > 0
                ? ts.translate(formula)
                : formula;
    }
    let res;
    try {
        res = evaluateExpression(formula, context);
    }
    catch (_) {
        res = formula;
    }
    return res;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LWluc3RhbmNlLXV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9yZXBvcnRzL3NyYy91dGlscy93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UtdXRpbHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUF5QixrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRzVFLE1BQU0sVUFBVSxTQUFTLENBQUMsQ0FBYSxFQUFFLE9BQW1CLEVBQUUsRUFBb0I7SUFDaEYsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztJQUN4QixJQUFJLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUcsSUFBSSxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHLEVBQUU7UUFDdEUsTUFBTSxFQUFFLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNoQyxNQUFNLE9BQU8sR0FDWCxFQUFFLElBQUksSUFBSSxJQUFJLE9BQU8sRUFBRSxLQUFLLFFBQVEsSUFBSSxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO1FBQ3ZGLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7WUFDakIsT0FBTyxHQUFHLElBQUksT0FBTyxHQUFHLENBQUM7U0FDMUI7S0FDRjtTQUFNO1FBQ0wsT0FBTztZQUNMLE9BQU8sSUFBSSxJQUFJLElBQUksT0FBTyxPQUFPLEtBQUssUUFBUSxJQUFJLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQztnQkFDekUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDO2dCQUN2QixDQUFDLENBQUMsT0FBTyxDQUFDO0tBQ2Y7SUFDRCxJQUFJLEdBQUcsQ0FBQztJQUNSLElBQUk7UUFDRixHQUFHLEdBQUcsa0JBQWtCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQzVDO0lBQUMsT0FBTyxDQUFDLEVBQUU7UUFDVixHQUFHLEdBQUcsT0FBTyxDQUFDO0tBQ2Y7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgQWpmRm9ybXVsYSwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7VHJhbnNsb2NvU2VydmljZX0gZnJvbSAnQGFqZi9jb3JlL3RyYW5zbG9jbyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB0ckZvcm11bGEoZjogQWpmRm9ybXVsYSwgY29udGV4dDogQWpmQ29udGV4dCwgdHM6IFRyYW5zbG9jb1NlcnZpY2UpOiBhbnkge1xuICBsZXQgZm9ybXVsYSA9IGYuZm9ybXVsYTtcbiAgaWYgKGZvcm11bGEuc3Vic3RyaW5nKDAsIDEpID09PSAnXCInIHx8IGZvcm11bGEuc3Vic3RyaW5nKDAsIDEpID09PSBcIidcIikge1xuICAgIGNvbnN0IGZ0ID0gZm9ybXVsYS5zbGljZSgxLCAtMSk7XG4gICAgY29uc3QgdHJhbnNGdCA9XG4gICAgICBmdCAhPSBudWxsICYmIHR5cGVvZiBmdCA9PT0gJ3N0cmluZycgJiYgZnQudHJpbSgpLmxlbmd0aCA+IDAgPyB0cy50cmFuc2xhdGUoZnQpIDogZnQ7XG4gICAgaWYgKGZ0Lmxlbmd0aCA+IDApIHtcbiAgICAgIGZvcm11bGEgPSBgXCIke3RyYW5zRnR9XCJgO1xuICAgIH1cbiAgfSBlbHNlIHtcbiAgICBmb3JtdWxhID1cbiAgICAgIGZvcm11bGEgIT0gbnVsbCAmJiB0eXBlb2YgZm9ybXVsYSA9PT0gJ3N0cmluZycgJiYgZm9ybXVsYS50cmltKCkubGVuZ3RoID4gMFxuICAgICAgICA/IHRzLnRyYW5zbGF0ZShmb3JtdWxhKVxuICAgICAgICA6IGZvcm11bGE7XG4gIH1cbiAgbGV0IHJlcztcbiAgdHJ5IHtcbiAgICByZXMgPSBldmFsdWF0ZUV4cHJlc3Npb24oZm9ybXVsYSwgY29udGV4dCk7XG4gIH0gY2F0Y2ggKF8pIHtcbiAgICByZXMgPSBmb3JtdWxhO1xuICB9XG4gIHJldHVybiByZXM7XG59XG4iXX0=