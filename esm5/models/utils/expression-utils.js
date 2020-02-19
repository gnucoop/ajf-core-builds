/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
import * as vfuncs from './validation-functions';
var AjfExpressionUtils = /** @class */ (function () {
    function AjfExpressionUtils() {
    }
    AjfExpressionUtils.UTIL_FUNCTIONS = '';
    AjfExpressionUtils.utils = {
        digitCount: { fn: vfuncs.digitCount },
        decimalCount: { fn: vfuncs.decimalCount },
        isInt: { fn: vfuncs.isInt },
        notEmpty: { fn: vfuncs.notEmpty },
        valueInChoice: { fn: vfuncs.valueInChoice },
        scanGroupField: { fn: vfuncs.scanGroupField },
        sum: { fn: vfuncs.sum },
        dateOperations: { fn: vfuncs.dateOperations },
        round: { fn: vfuncs.round },
        extractArray: { fn: vfuncs.extractArray },
        extractSum: { fn: vfuncs.extractSum },
        extractArraySum: { fn: vfuncs.extractArraySum },
        drawThreshold: { fn: vfuncs.drawThreshold },
        extractDates: { fn: vfuncs.extractDates },
        lastProperty: { fn: vfuncs.lastProperty },
        sumLastProperties: { fn: vfuncs.sumLastProperties },
        calculateTrendProperty: { fn: vfuncs.calculateTrendProperty },
        calculateTrendByProperties: { fn: vfuncs.calculateTrendByProperties },
        calculateAvgProperty: { fn: vfuncs.calculateAvgProperty },
        calculateAvgPropertyArray: { fn: vfuncs.calculateAvgPropertyArray },
        alert: { fn: vfuncs.alert },
        formatNumber: { fn: vfuncs.formatNumber },
        formatDate: { fn: vfuncs.formatDate },
        isoMonth: { fn: vfuncs.isoMonth },
        getCoordinate: { fn: vfuncs.getCoordinate },
        Math: { fn: Math },
        parseInt: { fn: parseInt },
        parseFloat: { fn: parseFloat },
        parseDate: { fn: vfuncs.dateUtils.parse },
        Date: { fn: Date }
    };
    return AjfExpressionUtils;
}());
export { AjfExpressionUtils };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXhwcmVzc2lvbi11dGlscy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL21vZGVscy91dGlscy9leHByZXNzaW9uLXV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sS0FBSyxNQUFNLE1BQU0sd0JBQXdCLENBQUM7QUFFakQ7SUFBQTtJQW1DQSxDQUFDO0lBbENRLGlDQUFjLEdBQUcsRUFBRSxDQUFDO0lBRXBCLHdCQUFLLEdBQXNDO1FBQ2hELFVBQVUsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFDO1FBQ25DLFlBQVksRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFDO1FBQ3ZDLEtBQUssRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDO1FBQ3pCLFFBQVEsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFDO1FBQy9CLGFBQWEsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFDO1FBQ3pDLGNBQWMsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFDO1FBQzNDLEdBQUcsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsR0FBRyxFQUFDO1FBQ3JCLGNBQWMsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsY0FBYyxFQUFDO1FBQzNDLEtBQUssRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsS0FBSyxFQUFDO1FBQ3pCLFlBQVksRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFDO1FBQ3ZDLFVBQVUsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsVUFBVSxFQUFDO1FBQ25DLGVBQWUsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsZUFBZSxFQUFDO1FBQzdDLGFBQWEsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsYUFBYSxFQUFDO1FBQ3pDLFlBQVksRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFDO1FBQ3ZDLFlBQVksRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsWUFBWSxFQUFDO1FBQ3ZDLGlCQUFpQixFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxpQkFBaUIsRUFBQztRQUNqRCxzQkFBc0IsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMsc0JBQXNCLEVBQUM7UUFDM0QsMEJBQTBCLEVBQUUsRUFBQyxFQUFFLEVBQUUsTUFBTSxDQUFDLDBCQUEwQixFQUFDO1FBQ25FLG9CQUFvQixFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxvQkFBb0IsRUFBQztRQUN2RCx5QkFBeUIsRUFBRSxFQUFDLEVBQUUsRUFBRSxNQUFNLENBQUMseUJBQXlCLEVBQUM7UUFDakUsS0FBSyxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxLQUFLLEVBQUM7UUFDekIsWUFBWSxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxZQUFZLEVBQUM7UUFDdkMsVUFBVSxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxVQUFVLEVBQUM7UUFDbkMsUUFBUSxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxRQUFRLEVBQUM7UUFDL0IsYUFBYSxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxhQUFhLEVBQUM7UUFDekMsSUFBSSxFQUFFLEVBQUMsRUFBRSxFQUFFLElBQUksRUFBQztRQUNoQixRQUFRLEVBQUUsRUFBQyxFQUFFLEVBQUUsUUFBUSxFQUFDO1FBQ3hCLFVBQVUsRUFBRSxFQUFDLEVBQUUsRUFBRSxVQUFVLEVBQUM7UUFDNUIsU0FBUyxFQUFFLEVBQUMsRUFBRSxFQUFFLE1BQU0sQ0FBQyxTQUFTLENBQUMsS0FBSyxFQUFDO1FBQ3ZDLElBQUksRUFBRSxFQUFDLEVBQUUsRUFBRSxJQUFJLEVBQUM7S0FDakIsQ0FBQztJQUNKLHlCQUFDO0NBQUEsQUFuQ0QsSUFtQ0M7U0FuQ1ksa0JBQWtCIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmVmFsaWRhdGlvbkZufSBmcm9tICcuLi9pbnRlcmZhY2UvdmFsaWRhdGlvbi1mdW5jdGlvbic7XG5cbmltcG9ydCAqIGFzIHZmdW5jcyBmcm9tICcuL3ZhbGlkYXRpb24tZnVuY3Rpb25zJztcblxuZXhwb3J0IGNsYXNzIEFqZkV4cHJlc3Npb25VdGlscyB7XG4gIHN0YXRpYyBVVElMX0ZVTkNUSU9OUyA9ICcnO1xuXG4gIHN0YXRpYyB1dGlsczoge1tuYW1lOiBzdHJpbmddOiBBamZWYWxpZGF0aW9uRm59ID0ge1xuICAgIGRpZ2l0Q291bnQ6IHtmbjogdmZ1bmNzLmRpZ2l0Q291bnR9LFxuICAgIGRlY2ltYWxDb3VudDoge2ZuOiB2ZnVuY3MuZGVjaW1hbENvdW50fSxcbiAgICBpc0ludDoge2ZuOiB2ZnVuY3MuaXNJbnR9LFxuICAgIG5vdEVtcHR5OiB7Zm46IHZmdW5jcy5ub3RFbXB0eX0sXG4gICAgdmFsdWVJbkNob2ljZToge2ZuOiB2ZnVuY3MudmFsdWVJbkNob2ljZX0sXG4gICAgc2Nhbkdyb3VwRmllbGQ6IHtmbjogdmZ1bmNzLnNjYW5Hcm91cEZpZWxkfSxcbiAgICBzdW06IHtmbjogdmZ1bmNzLnN1bX0sXG4gICAgZGF0ZU9wZXJhdGlvbnM6IHtmbjogdmZ1bmNzLmRhdGVPcGVyYXRpb25zfSxcbiAgICByb3VuZDoge2ZuOiB2ZnVuY3Mucm91bmR9LFxuICAgIGV4dHJhY3RBcnJheToge2ZuOiB2ZnVuY3MuZXh0cmFjdEFycmF5fSxcbiAgICBleHRyYWN0U3VtOiB7Zm46IHZmdW5jcy5leHRyYWN0U3VtfSxcbiAgICBleHRyYWN0QXJyYXlTdW06IHtmbjogdmZ1bmNzLmV4dHJhY3RBcnJheVN1bX0sXG4gICAgZHJhd1RocmVzaG9sZDoge2ZuOiB2ZnVuY3MuZHJhd1RocmVzaG9sZH0sXG4gICAgZXh0cmFjdERhdGVzOiB7Zm46IHZmdW5jcy5leHRyYWN0RGF0ZXN9LFxuICAgIGxhc3RQcm9wZXJ0eToge2ZuOiB2ZnVuY3MubGFzdFByb3BlcnR5fSxcbiAgICBzdW1MYXN0UHJvcGVydGllczoge2ZuOiB2ZnVuY3Muc3VtTGFzdFByb3BlcnRpZXN9LFxuICAgIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHk6IHtmbjogdmZ1bmNzLmNhbGN1bGF0ZVRyZW5kUHJvcGVydHl9LFxuICAgIGNhbGN1bGF0ZVRyZW5kQnlQcm9wZXJ0aWVzOiB7Zm46IHZmdW5jcy5jYWxjdWxhdGVUcmVuZEJ5UHJvcGVydGllc30sXG4gICAgY2FsY3VsYXRlQXZnUHJvcGVydHk6IHtmbjogdmZ1bmNzLmNhbGN1bGF0ZUF2Z1Byb3BlcnR5fSxcbiAgICBjYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5OiB7Zm46IHZmdW5jcy5jYWxjdWxhdGVBdmdQcm9wZXJ0eUFycmF5fSxcbiAgICBhbGVydDoge2ZuOiB2ZnVuY3MuYWxlcnR9LFxuICAgIGZvcm1hdE51bWJlcjoge2ZuOiB2ZnVuY3MuZm9ybWF0TnVtYmVyfSxcbiAgICBmb3JtYXREYXRlOiB7Zm46IHZmdW5jcy5mb3JtYXREYXRlfSxcbiAgICBpc29Nb250aDoge2ZuOiB2ZnVuY3MuaXNvTW9udGh9LFxuICAgIGdldENvb3JkaW5hdGU6IHtmbjogdmZ1bmNzLmdldENvb3JkaW5hdGV9LFxuICAgIE1hdGg6IHtmbjogTWF0aH0sXG4gICAgcGFyc2VJbnQ6IHtmbjogcGFyc2VJbnR9LFxuICAgIHBhcnNlRmxvYXQ6IHtmbjogcGFyc2VGbG9hdH0sXG4gICAgcGFyc2VEYXRlOiB7Zm46IHZmdW5jcy5kYXRlVXRpbHMucGFyc2V9LFxuICAgIERhdGU6IHtmbjogRGF0ZX1cbiAgfTtcbn1cbiJdfQ==