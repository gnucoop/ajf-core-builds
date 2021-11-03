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
import { AjfExpressionUtils } from '@ajf/core/models';
import { Injectable } from '@angular/core';
import * as i0 from "@angular/core";
export class AjfValidationService {
    constructor() {
        this._baseUtilFunctions = [
            `/**
        * count the number of digit contained on x.
        * @param  x the value used for digit count
        * @return the count of the digit
      */
    var digitCount = function(x) { return x.toString().length; }`,
            `/**
        * count the number of decimal contained on x.
        * @param  x the value used for decimal count
        * @return the count of the decimal
      */
    var decimalCount = function(x) {
      return (parseFloat(x).toString().split('.')[1] || []).length;
    }`,
            `/**
        * check if x is integer
        * @param  x the value used for check
        * @return true if x is a number
      */
    var isInt = function(x) { return !/[,.]/.test(x); }`,
            `/**
        * check if x is not empity
        * @param  x the value used for check
        * @return true if x defined and not null and the number of digit is > 0
      */
    var notEmpty = function (x) {
      return (typeof x !== 'undefined' && x !== null ? x.toString().length > 0 : false);
    }`,
            `/**
        * check if x is contained on array
        * @param  x the value used for check
        * @return the position of x on array or if array === x
      */
    var valueInChoice = function(array, x) { return array.indexOf(x) > -1 || array === x; }`,
            `var scanGroupField = function(reps, acc, callback) {
        for (var i = 0; i < reps; i++) {
            acc = callback(acc, i);
        }
        return acc;
    }`,
            `/**
        * sum the value contained on array
        * @param  x the array
        * @return the sum
      */
    var sum = function(array) {return array.reduce(function(a, b){ return a + b; }, 0); }`,
            `var dateOperations = function(dString, period, operation, v) {
        fmt = 'mm/dd/yyyy';
        var d = (typeof dString !== 'undefined') ? dateUtils.parse(dString) : new Date();
        if (operation == 'remove') {
          v = -v;
        }
        var dateOp;
        switch (period) {
          case 'day':
            dateOp = dateUtils.addDays;
            break;
          case 'month':
            dateOp = dateUtils.addMonths;
            break;
          case 'year':
            dateOp = dateUtils.addYears;
            break;
          default:
            return -1;
        }
        return dateUtils.format(dateOp(d, v), fmt);
      }`,
            `/**
        * round the num
        * @param  num the value to round
        * @param  digits how many digit
        * @return num rounded
      */
      var round = function(num, digits) {
        digits = digits || 0;
        var f = 0;
        try { f = parseFloat(num); } catch (e) { }
        var m = Math.pow(10, digits);
        return Math.round(f * m) / m;
      }`,
            `/**
        * extract the property of the source object with property != null
        * @param  source array of object wich contains property
        * @param  property the property on wich we want filter
        * @return array of dates
      */
      var extractArray = function(source, property, property2) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        for (var i = 0; i < l ; i++) {
          if (source[i][property] != null && source[i][property2] != null) {
            res.push(source[i][property] + source[i][property2]);
          }
          else if (source[i][property] != null) {
            res.push(source[i][property]);
          }
        }
        return res;
      }`,
            `/**
        * extract the property of the source object with property != null
        * @param  source array of object wich contains property
        * @param  propertues string array the properties to sum
        * @return the sum
      */
      var extractSum = function(source, properties) {
        var sum = 0;
        properties = (properties || []).slice(0);
        var l = properties.length;

        for (var i = 0; i < l ; i++) {
          var array = extractArray(source, properties[i]);
          var leng = array.length;
          for(var j = 0; j < leng; i++) {
            sum += array[j];
          }
        }
        return sum;
      }`,
            `/**
        * extract the array of sum for each week != null
        * @param  source array of object wich contains property
        * @param  propertues string array the properties to sum
        * @return the sum
      */
      var extractArraySum = function(source, properties) {
        var arrays = [];
        properties = (properties || []).slice(0);

        for (var propI = 0; propI < properties.length ; propI++) {
          var array = extractArray(source, properties[propI]);
          arrays.push(array);
        }

        var res = [];
        for (var weekI = 0; weekI < array.length; weekI ++ ) {
          var sum = 0;
          for (var propI = 0; propI < properties.length ; propI++) {
            sum = sum + arrays[propI][weekI]
          }
          res.push(sum);
        }
        return res;
      }`,
            `/**
        * draw a threshold line on chart related to the property
        * @param  source array of object wich contains property
        * @param  property the property on wich we want filter
        * @return array of dates
      */
      var drawThreshold = function(source, property, threshold) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        for (var i = 0; i < l ; i++) {
          if (source[i][property] != null) {
            res.push(threshold);
          }
        }
        return res;
      }`,
            `/**
        * extract the dates of the source object with property != null
        * @param  source array of object wich contains property and date_start
        * @param  property the property on wich we want to calculate dates
        * @param  format the format of the date
        * @return array of dates
      */
      var extractDates = function(source, property, format) {
        source = (source || []).slice(0);
        var l = source.length;
        var res = [];
        var prefix = '';
        for (var i = 0; i < l ; i++) {
          if (source[i][property] != null) {
            switch(format) {
              case "WW":
                prefix = "W";
                break;
              case "mm":
                prefix = "M";
                break;
              default:
                prefix = "";
            }
            res.push(prefix + formatDate(source[i]["date_start"], format));
          }
        }
        return res;
      }`,
            `/**
        * extract the last property contains in source != null
        * @param  source array of object wich contains property and date_start
        * @param  property the property to find
        * @return the last property != null
      */
      var lastProperty = function(source, property) {
        source = (source || []).slice(0);
        var l = source.length -1;

        while (l >= 0 && source[l][property] == null) {
          l--;
          if (l < 0) return 0;
        }
        return l >= 0 ? source[l][property] : 0;
      }`,
            `var sumLastProperties = function(source, properties) {
        source = (source || []).slice(0);
        var sum = 0;
        for (var i = 0; i < properties.length; i++) {
          sum += lastProperty(source, properties[i]);
        }

        return sum;
      }`,
            `/**
        * compute the trend of the property contained on the source.
        * @param  source array of object wich contains property
        * @param  property the property on wich we want to calculate the trend
        * @return an html icon that identifies the trend
      */
      var calculateTrendProperty = function(source, property) {
        source = (source || []).slice(0);
        var last = source.length - 1;
        while (source[last][property] == null) {
          if (last == 0) {
            break;
          }
          last--;
        }
        var lastLast = last - 1;
        if (last == 0) {
          lastLast = last;
        } else {
          while (source[lastLast][property] == null) {
            if (lastLast == 0) {
              lastLast = last;
              break;
            }
            lastLast--;
          }
        }

        var lastProperty = source[last]?(source[last][property] || 0): 0;
        var lastLastProperty = source[lastLast]?(source[lastLast][property] || 0): 0;

        if (lastProperty == lastLastProperty) {
          return '<p><i class="material-icons" style="color:blue">trending_flat</i></p>';
        } else if (lastProperty > lastLastProperty) {
          return '<p><i class="material-icons" style="color:green">trending_up</i></p>';
        } else {
          return '<p><i class="material-icons" style="color:red">trending_down</i></p>';
        }
      }`,
            `/**
        * compute the average value of the property contained on the source.
        * @param  source array of object wich contains property
        * @param  property the property on wich we want to calculate the average
        * @param  range the range on wich we want to calculate the average
        * @param  coefficent the coefficent used for calculate the threshold
                  if coefficent is 0 mean return the count of property > 0
        * @return the average value || the count of property > 0
      */
      var calculateAvgProperty = function(source, property, range, coefficient) {
        source = (source || []).slice(0);

        source.pop();

        coefficient = coefficient || 1;
        range = range || 12;

        var l = source.length;
        var res = 0;
        var counter = 0;
        var noZero = 0;

        if(l < range) {
          range = l;
        }

        while (range != 0) {
          counter++;
          if (source[l - 1][property] != null) {
            res += source[l - 1][property];

            if (source[l - 1][property] > 0) {
              noZero++;
            }
          }
          l--;
          range--;
        }

        if (coefficient == 0) {
          return noZero;
        } else {
          var threshold = (res/counter)*coefficient || 0;
          return threshold;
        }
      }`,
            `var alert = function(source, property, threshold, fmt) {
        source = (source || []).slice(0);
        var l = source.length;

        if ( lastProperty(source, property)  > threshold ) {
          return '<p><i class="material-icons" style="color:red">warning</i></p>';
          } else {
            return '<p></p>';
          }
      }`,
            `var formatNumber = function(num, fmt) {
        fmt = fmt || '0,0[.]0';
        return numbro(num).format(fmt);
      }`,
            `var formatDate = function(date, fmt) {
        fmt = fmt || 'mm-dd-yyyy';
        return dateUtils.format(date, fmt);
      }`,
            `var isoMonth = function(date, fmt) {
        fmt = fmt || 'mm';
        var du = dateUtils;
        return du.format(du.addDays(du.startOfMonth(date), 4),fmt)
      }`,
            `var nextCounterValue = function(counterName, firstValue) {
        firstValue = firstValue != null ? firstValue : 0;
        if (execContext['$$'+counterName] == null) {
          execContext['$$'+counterName] = firstValue;
        } else {
          execContext['$$'+counterName]++;
        }
        return execContext['$$'+counterName];
      }`,
            `var getCoordinate = function(source, zoom) {
        zoom = zoom || 6;
        if(source == null) {
          return [51.505,-0.09, zoom];
        } else {
          return [source[0], source[1], zoom];
        }
      }`,
        ];
        this._functions = [];
        this._functionsStr = '';
        this._initFunctions();
    }
    addFunction(f) {
        this._functions.push(f);
        this._initFunctions();
    }
    addFunctionHandler(name, fn) {
        if (AjfExpressionUtils.utils[name] === undefined) {
            AjfExpressionUtils.utils[name] = { fn };
        }
    }
    _initFunctions() {
        const functionsStr = this._functions
            .map(f => (typeof f === 'string' ? f : f.toString()))
            .join('; ');
        this._functionsStr = `${this._baseUtilFunctions.join('; ')}; ${functionsStr}`;
        AjfExpressionUtils.UTIL_FUNCTIONS = this._functionsStr;
    }
}
AjfValidationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfValidationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfValidationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-rc.3", ngImport: i0, type: AjfValidationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdmFsaWRhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBR3pDLE1BQU0sT0FBTyxvQkFBb0I7SUE2Vi9CO1FBNVZRLHVCQUFrQixHQUFhO1lBQ3JDOzs7OztpRUFLNkQ7WUFDN0Q7Ozs7Ozs7TUFPRTtZQUNGOzs7Ozt3REFLb0Q7WUFDcEQ7Ozs7Ozs7TUFPRTtZQUNGOzs7Ozs0RkFLd0Y7WUFDeEY7Ozs7O01BS0U7WUFDRjs7Ozs7MEZBS3NGO1lBQ3RGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFxQkk7WUFDSjs7Ozs7Ozs7Ozs7O1FBWUk7WUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQW1CSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBbUJJO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXdCSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7O1FBZ0JJO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE0Qkk7WUFDSjs7Ozs7Ozs7Ozs7Ozs7O1FBZUk7WUFDSjs7Ozs7Ozs7UUFRSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXNDSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE2Q0k7WUFDSjs7Ozs7Ozs7O1FBU0k7WUFDSjs7O1FBR0k7WUFDSjs7O1FBR0k7WUFDSjs7OztRQUlJO1lBQ0o7Ozs7Ozs7O1FBUUk7WUFDSjs7Ozs7OztRQU9JO1NBQ0wsQ0FBQztRQUVNLGVBQVUsR0FBMEIsRUFBRSxDQUFDO1FBQ3ZDLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVyxDQUFDLENBQW9CO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsa0JBQWtCLENBQUMsSUFBWSxFQUFFLEVBQU87UUFDdEMsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ2hELGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVPLGNBQWM7UUFDcEIsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLFVBQVU7YUFDakMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7YUFDcEQsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2QsSUFBSSxDQUFDLGFBQWEsR0FBRyxHQUFHLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssWUFBWSxFQUFFLENBQUM7UUFDOUUsa0JBQWtCLENBQUMsY0FBYyxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDekQsQ0FBQzs7c0hBbFhVLG9CQUFvQjswSEFBcEIsb0JBQW9CO2dHQUFwQixvQkFBb0I7a0JBRGhDLFVBQVUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRXhwcmVzc2lvblV0aWxzfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZWYWxpZGF0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgX2Jhc2VVdGlsRnVuY3Rpb25zOiBzdHJpbmdbXSA9IFtcbiAgICBgLyoqXG4gICAgICAgICogY291bnQgdGhlIG51bWJlciBvZiBkaWdpdCBjb250YWluZWQgb24geC5cbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIHZhbHVlIHVzZWQgZm9yIGRpZ2l0IGNvdW50XG4gICAgICAgICogQHJldHVybiB0aGUgY291bnQgb2YgdGhlIGRpZ2l0XG4gICAgICAqL1xuICAgIHZhciBkaWdpdENvdW50ID0gZnVuY3Rpb24oeCkgeyByZXR1cm4geC50b1N0cmluZygpLmxlbmd0aDsgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGNvdW50IHRoZSBudW1iZXIgb2YgZGVjaW1hbCBjb250YWluZWQgb24geC5cbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIHZhbHVlIHVzZWQgZm9yIGRlY2ltYWwgY291bnRcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBjb3VudCBvZiB0aGUgZGVjaW1hbFxuICAgICAgKi9cbiAgICB2YXIgZGVjaW1hbENvdW50ID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIChwYXJzZUZsb2F0KHgpLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXSB8fCBbXSkubGVuZ3RoO1xuICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjaGVjayBpZiB4IGlzIGludGVnZXJcbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIHZhbHVlIHVzZWQgZm9yIGNoZWNrXG4gICAgICAgICogQHJldHVybiB0cnVlIGlmIHggaXMgYSBudW1iZXJcbiAgICAgICovXG4gICAgdmFyIGlzSW50ID0gZnVuY3Rpb24oeCkgeyByZXR1cm4gIS9bLC5dLy50ZXN0KHgpOyB9YCxcbiAgICBgLyoqXG4gICAgICAgICogY2hlY2sgaWYgeCBpcyBub3QgZW1waXR5XG4gICAgICAgICogQHBhcmFtICB4IHRoZSB2YWx1ZSB1c2VkIGZvciBjaGVja1xuICAgICAgICAqIEByZXR1cm4gdHJ1ZSBpZiB4IGRlZmluZWQgYW5kIG5vdCBudWxsIGFuZCB0aGUgbnVtYmVyIG9mIGRpZ2l0IGlzID4gMFxuICAgICAgKi9cbiAgICB2YXIgbm90RW1wdHkgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuICh0eXBlb2YgeCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCAhPT0gbnVsbCA/IHgudG9TdHJpbmcoKS5sZW5ndGggPiAwIDogZmFsc2UpO1xuICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjaGVjayBpZiB4IGlzIGNvbnRhaW5lZCBvbiBhcnJheVxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgdmFsdWUgdXNlZCBmb3IgY2hlY2tcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBwb3NpdGlvbiBvZiB4IG9uIGFycmF5IG9yIGlmIGFycmF5ID09PSB4XG4gICAgICAqL1xuICAgIHZhciB2YWx1ZUluQ2hvaWNlID0gZnVuY3Rpb24oYXJyYXksIHgpIHsgcmV0dXJuIGFycmF5LmluZGV4T2YoeCkgPiAtMSB8fCBhcnJheSA9PT0geDsgfWAsXG4gICAgYHZhciBzY2FuR3JvdXBGaWVsZCA9IGZ1bmN0aW9uKHJlcHMsIGFjYywgY2FsbGJhY2spIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBzOyBpKyspIHtcbiAgICAgICAgICAgIGFjYyA9IGNhbGxiYWNrKGFjYywgaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogc3VtIHRoZSB2YWx1ZSBjb250YWluZWQgb24gYXJyYXlcbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIGFycmF5XG4gICAgICAgICogQHJldHVybiB0aGUgc3VtXG4gICAgICAqL1xuICAgIHZhciBzdW0gPSBmdW5jdGlvbihhcnJheSkge3JldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24oYSwgYil7IHJldHVybiBhICsgYjsgfSwgMCk7IH1gLFxuICAgIGB2YXIgZGF0ZU9wZXJhdGlvbnMgPSBmdW5jdGlvbihkU3RyaW5nLCBwZXJpb2QsIG9wZXJhdGlvbiwgdikge1xuICAgICAgICBmbXQgPSAnbW0vZGQveXl5eSc7XG4gICAgICAgIHZhciBkID0gKHR5cGVvZiBkU3RyaW5nICE9PSAndW5kZWZpbmVkJykgPyBkYXRlVXRpbHMucGFyc2UoZFN0cmluZykgOiBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAob3BlcmF0aW9uID09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgdiA9IC12O1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXRlT3A7XG4gICAgICAgIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGREYXlzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZE1vbnRocztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZFllYXJzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdChkYXRlT3AoZCwgdiksIGZtdCk7XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogcm91bmQgdGhlIG51bVxuICAgICAgICAqIEBwYXJhbSAgbnVtIHRoZSB2YWx1ZSB0byByb3VuZFxuICAgICAgICAqIEBwYXJhbSAgZGlnaXRzIGhvdyBtYW55IGRpZ2l0XG4gICAgICAgICogQHJldHVybiBudW0gcm91bmRlZFxuICAgICAgKi9cbiAgICAgIHZhciByb3VuZCA9IGZ1bmN0aW9uKG51bSwgZGlnaXRzKSB7XG4gICAgICAgIGRpZ2l0cyA9IGRpZ2l0cyB8fCAwO1xuICAgICAgICB2YXIgZiA9IDA7XG4gICAgICAgIHRyeSB7IGYgPSBwYXJzZUZsb2F0KG51bSk7IH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgICB2YXIgbSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChmICogbSkgLyBtO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGV4dHJhY3QgdGhlIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugb2JqZWN0IHdpdGggcHJvcGVydHkgIT0gbnVsbFxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgb24gd2ljaCB3ZSB3YW50IGZpbHRlclxuICAgICAgICAqIEByZXR1cm4gYXJyYXkgb2YgZGF0ZXNcbiAgICAgICovXG4gICAgICB2YXIgZXh0cmFjdEFycmF5ID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSwgcHJvcGVydHkyKSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsIDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCAmJiBzb3VyY2VbaV1bcHJvcGVydHkyXSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXMucHVzaChzb3VyY2VbaV1bcHJvcGVydHldICsgc291cmNlW2ldW3Byb3BlcnR5Ml0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKHNvdXJjZVtpXVtwcm9wZXJ0eV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGV4dHJhY3QgdGhlIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugb2JqZWN0IHdpdGggcHJvcGVydHkgIT0gbnVsbFxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0dWVzIHN0cmluZyBhcnJheSB0aGUgcHJvcGVydGllcyB0byBzdW1cbiAgICAgICAgKiBAcmV0dXJuIHRoZSBzdW1cbiAgICAgICovXG4gICAgICB2YXIgZXh0cmFjdFN1bSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydGllcykge1xuICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgcHJvcGVydGllcyA9IChwcm9wZXJ0aWVzIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIGwgPSBwcm9wZXJ0aWVzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGwgOyBpKyspIHtcbiAgICAgICAgICB2YXIgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKTtcbiAgICAgICAgICB2YXIgbGVuZyA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgbGVuZzsgaSsrKSB7XG4gICAgICAgICAgICBzdW0gKz0gYXJyYXlbal07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogZXh0cmFjdCB0aGUgYXJyYXkgb2Ygc3VtIGZvciBlYWNoIHdlZWsgIT0gbnVsbFxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0dWVzIHN0cmluZyBhcnJheSB0aGUgcHJvcGVydGllcyB0byBzdW1cbiAgICAgICAgKiBAcmV0dXJuIHRoZSBzdW1cbiAgICAgICovXG4gICAgICB2YXIgZXh0cmFjdEFycmF5U3VtID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHZhciBhcnJheXMgPSBbXTtcbiAgICAgICAgcHJvcGVydGllcyA9IChwcm9wZXJ0aWVzIHx8IFtdKS5zbGljZSgwKTtcblxuICAgICAgICBmb3IgKHZhciBwcm9wSSA9IDA7IHByb3BJIDwgcHJvcGVydGllcy5sZW5ndGggOyBwcm9wSSsrKSB7XG4gICAgICAgICAgdmFyIGFycmF5ID0gZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1twcm9wSV0pO1xuICAgICAgICAgIGFycmF5cy5wdXNoKGFycmF5KTtcbiAgICAgICAgfVxuXG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgd2Vla0kgPSAwOyB3ZWVrSSA8IGFycmF5Lmxlbmd0aDsgd2Vla0kgKysgKSB7XG4gICAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgICAgZm9yICh2YXIgcHJvcEkgPSAwOyBwcm9wSSA8IHByb3BlcnRpZXMubGVuZ3RoIDsgcHJvcEkrKykge1xuICAgICAgICAgICAgc3VtID0gc3VtICsgYXJyYXlzW3Byb3BJXVt3ZWVrSV1cbiAgICAgICAgICB9XG4gICAgICAgICAgcmVzLnB1c2goc3VtKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGRyYXcgYSB0aHJlc2hvbGQgbGluZSBvbiBjaGFydCByZWxhdGVkIHRvIHRoZSBwcm9wZXJ0eVxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgb24gd2ljaCB3ZSB3YW50IGZpbHRlclxuICAgICAgICAqIEByZXR1cm4gYXJyYXkgb2YgZGF0ZXNcbiAgICAgICovXG4gICAgICB2YXIgZHJhd1RocmVzaG9sZCA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHksIHRocmVzaG9sZCkge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIGwgPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbCA7IGkrKykge1xuICAgICAgICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKHRocmVzaG9sZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogZXh0cmFjdCB0aGUgZGF0ZXMgb2YgdGhlIHNvdXJjZSBvYmplY3Qgd2l0aCBwcm9wZXJ0eSAhPSBudWxsXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHkgYW5kIGRhdGVfc3RhcnRcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSBvbiB3aWNoIHdlIHdhbnQgdG8gY2FsY3VsYXRlIGRhdGVzXG4gICAgICAgICogQHBhcmFtICBmb3JtYXQgdGhlIGZvcm1hdCBvZiB0aGUgZGF0ZVxuICAgICAgICAqIEByZXR1cm4gYXJyYXkgb2YgZGF0ZXNcbiAgICAgICovXG4gICAgICB2YXIgZXh0cmFjdERhdGVzID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSwgZm9ybWF0KSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgdmFyIHByZWZpeCA9ICcnO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGwgOyBpKyspIHtcbiAgICAgICAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICBzd2l0Y2goZm9ybWF0KSB7XG4gICAgICAgICAgICAgIGNhc2UgXCJXV1wiOlxuICAgICAgICAgICAgICAgIHByZWZpeCA9IFwiV1wiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBjYXNlIFwibW1cIjpcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBcIk1cIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBcIlwiO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmVzLnB1c2gocHJlZml4ICsgZm9ybWF0RGF0ZShzb3VyY2VbaV1bXCJkYXRlX3N0YXJ0XCJdLCBmb3JtYXQpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBleHRyYWN0IHRoZSBsYXN0IHByb3BlcnR5IGNvbnRhaW5zIGluIHNvdXJjZSAhPSBudWxsXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHkgYW5kIGRhdGVfc3RhcnRcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSB0byBmaW5kXG4gICAgICAgICogQHJldHVybiB0aGUgbGFzdCBwcm9wZXJ0eSAhPSBudWxsXG4gICAgICAqL1xuICAgICAgdmFyIGxhc3RQcm9wZXJ0eSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHkpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aCAtMTtcblxuICAgICAgICB3aGlsZSAobCA+PSAwICYmIHNvdXJjZVtsXVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgICAgICAgIGwtLTtcbiAgICAgICAgICBpZiAobCA8IDApIHJldHVybiAwO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBsID49IDAgPyBzb3VyY2VbbF1bcHJvcGVydHldIDogMDtcbiAgICAgIH1gLFxuICAgIGB2YXIgc3VtTGFzdFByb3BlcnRpZXMgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBzdW0gKz0gbGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydGllc1tpXSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3VtO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGNvbXB1dGUgdGhlIHRyZW5kIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eVxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHkgdGhlIHByb3BlcnR5IG9uIHdpY2ggd2Ugd2FudCB0byBjYWxjdWxhdGUgdGhlIHRyZW5kXG4gICAgICAgICogQHJldHVybiBhbiBodG1sIGljb24gdGhhdCBpZGVudGlmaWVzIHRoZSB0cmVuZFxuICAgICAgKi9cbiAgICAgIHZhciBjYWxjdWxhdGVUcmVuZFByb3BlcnR5ID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSkge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIGxhc3QgPSBzb3VyY2UubGVuZ3RoIC0gMTtcbiAgICAgICAgd2hpbGUgKHNvdXJjZVtsYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgICAgICAgIGlmIChsYXN0ID09IDApIHtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsYXN0LS07XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGxhc3RMYXN0ID0gbGFzdCAtIDE7XG4gICAgICAgIGlmIChsYXN0ID09IDApIHtcbiAgICAgICAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgd2hpbGUgKHNvdXJjZVtsYXN0TGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICAgICAgICAgIGlmIChsYXN0TGFzdCA9PSAwKSB7XG4gICAgICAgICAgICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBsYXN0TGFzdC0tO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHZhciBsYXN0UHJvcGVydHkgPSBzb3VyY2VbbGFzdF0/KHNvdXJjZVtsYXN0XVtwcm9wZXJ0eV0gfHwgMCk6IDA7XG4gICAgICAgIHZhciBsYXN0TGFzdFByb3BlcnR5ID0gc291cmNlW2xhc3RMYXN0XT8oc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gfHwgMCk6IDA7XG5cbiAgICAgICAgaWYgKGxhc3RQcm9wZXJ0eSA9PSBsYXN0TGFzdFByb3BlcnR5KSB7XG4gICAgICAgICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpibHVlXCI+dHJlbmRpbmdfZmxhdDwvaT48L3A+JztcbiAgICAgICAgfSBlbHNlIGlmIChsYXN0UHJvcGVydHkgPiBsYXN0TGFzdFByb3BlcnR5KSB7XG4gICAgICAgICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpncmVlblwiPnRyZW5kaW5nX3VwPC9pPjwvcD4nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+dHJlbmRpbmdfZG93bjwvaT48L3A+JztcbiAgICAgICAgfVxuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGNvbXB1dGUgdGhlIGF2ZXJhZ2UgdmFsdWUgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgb24gd2ljaCB3ZSB3YW50IHRvIGNhbGN1bGF0ZSB0aGUgYXZlcmFnZVxuICAgICAgICAqIEBwYXJhbSAgcmFuZ2UgdGhlIHJhbmdlIG9uIHdpY2ggd2Ugd2FudCB0byBjYWxjdWxhdGUgdGhlIGF2ZXJhZ2VcbiAgICAgICAgKiBAcGFyYW0gIGNvZWZmaWNlbnQgdGhlIGNvZWZmaWNlbnQgdXNlZCBmb3IgY2FsY3VsYXRlIHRoZSB0aHJlc2hvbGRcbiAgICAgICAgICAgICAgICAgIGlmIGNvZWZmaWNlbnQgaXMgMCBtZWFuIHJldHVybiB0aGUgY291bnQgb2YgcHJvcGVydHkgPiAwXG4gICAgICAgICogQHJldHVybiB0aGUgYXZlcmFnZSB2YWx1ZSB8fCB0aGUgY291bnQgb2YgcHJvcGVydHkgPiAwXG4gICAgICAqL1xuICAgICAgdmFyIGNhbGN1bGF0ZUF2Z1Byb3BlcnR5ID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSwgcmFuZ2UsIGNvZWZmaWNpZW50KSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuXG4gICAgICAgIHNvdXJjZS5wb3AoKTtcblxuICAgICAgICBjb2VmZmljaWVudCA9IGNvZWZmaWNpZW50IHx8IDE7XG4gICAgICAgIHJhbmdlID0gcmFuZ2UgfHwgMTI7XG5cbiAgICAgICAgdmFyIGwgPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzID0gMDtcbiAgICAgICAgdmFyIGNvdW50ZXIgPSAwO1xuICAgICAgICB2YXIgbm9aZXJvID0gMDtcblxuICAgICAgICBpZihsIDwgcmFuZ2UpIHtcbiAgICAgICAgICByYW5nZSA9IGw7XG4gICAgICAgIH1cblxuICAgICAgICB3aGlsZSAocmFuZ2UgIT0gMCkge1xuICAgICAgICAgIGNvdW50ZXIrKztcbiAgICAgICAgICBpZiAoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzICs9IHNvdXJjZVtsIC0gMV1bcHJvcGVydHldO1xuXG4gICAgICAgICAgICBpZiAoc291cmNlW2wgLSAxXVtwcm9wZXJ0eV0gPiAwKSB7XG4gICAgICAgICAgICAgIG5vWmVybysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgICBsLS07XG4gICAgICAgICAgcmFuZ2UtLTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjb2VmZmljaWVudCA9PSAwKSB7XG4gICAgICAgICAgcmV0dXJuIG5vWmVybztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB2YXIgdGhyZXNob2xkID0gKHJlcy9jb3VudGVyKSpjb2VmZmljaWVudCB8fCAwO1xuICAgICAgICAgIHJldHVybiB0aHJlc2hvbGQ7XG4gICAgICAgIH1cbiAgICAgIH1gLFxuICAgIGB2YXIgYWxlcnQgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5LCB0aHJlc2hvbGQsIGZtdCkge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIGwgPSBzb3VyY2UubGVuZ3RoO1xuXG4gICAgICAgIGlmICggbGFzdFByb3BlcnR5KHNvdXJjZSwgcHJvcGVydHkpICA+IHRocmVzaG9sZCApIHtcbiAgICAgICAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPndhcm5pbmc8L2k+PC9wPic7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiAnPHA+PC9wPic7XG4gICAgICAgICAgfVxuICAgICAgfWAsXG4gICAgYHZhciBmb3JtYXROdW1iZXIgPSBmdW5jdGlvbihudW0sIGZtdCkge1xuICAgICAgICBmbXQgPSBmbXQgfHwgJzAsMFsuXTAnO1xuICAgICAgICByZXR1cm4gbnVtYnJvKG51bSkuZm9ybWF0KGZtdCk7XG4gICAgICB9YCxcbiAgICBgdmFyIGZvcm1hdERhdGUgPSBmdW5jdGlvbihkYXRlLCBmbXQpIHtcbiAgICAgICAgZm10ID0gZm10IHx8ICdtbS1kZC15eXl5JztcbiAgICAgICAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQoZGF0ZSwgZm10KTtcbiAgICAgIH1gLFxuICAgIGB2YXIgaXNvTW9udGggPSBmdW5jdGlvbihkYXRlLCBmbXQpIHtcbiAgICAgICAgZm10ID0gZm10IHx8ICdtbSc7XG4gICAgICAgIHZhciBkdSA9IGRhdGVVdGlscztcbiAgICAgICAgcmV0dXJuIGR1LmZvcm1hdChkdS5hZGREYXlzKGR1LnN0YXJ0T2ZNb250aChkYXRlKSwgNCksZm10KVxuICAgICAgfWAsXG4gICAgYHZhciBuZXh0Q291bnRlclZhbHVlID0gZnVuY3Rpb24oY291bnRlck5hbWUsIGZpcnN0VmFsdWUpIHtcbiAgICAgICAgZmlyc3RWYWx1ZSA9IGZpcnN0VmFsdWUgIT0gbnVsbCA/IGZpcnN0VmFsdWUgOiAwO1xuICAgICAgICBpZiAoZXhlY0NvbnRleHRbJyQkJytjb3VudGVyTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIGV4ZWNDb250ZXh0WyckJCcrY291bnRlck5hbWVdID0gZmlyc3RWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleGVjQ29udGV4dFsnJCQnK2NvdW50ZXJOYW1lXSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleGVjQ29udGV4dFsnJCQnK2NvdW50ZXJOYW1lXTtcbiAgICAgIH1gLFxuICAgIGB2YXIgZ2V0Q29vcmRpbmF0ZSA9IGZ1bmN0aW9uKHNvdXJjZSwgem9vbSkge1xuICAgICAgICB6b29tID0gem9vbSB8fCA2O1xuICAgICAgICBpZihzb3VyY2UgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBbNTEuNTA1LC0wLjA5LCB6b29tXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW3NvdXJjZVswXSwgc291cmNlWzFdLCB6b29tXTtcbiAgICAgICAgfVxuICAgICAgfWAsXG4gIF07XG5cbiAgcHJpdmF0ZSBfZnVuY3Rpb25zOiAoRnVuY3Rpb24gfCBzdHJpbmcpW10gPSBbXTtcbiAgcHJpdmF0ZSBfZnVuY3Rpb25zU3RyOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9pbml0RnVuY3Rpb25zKCk7XG4gIH1cblxuICBhZGRGdW5jdGlvbihmOiBGdW5jdGlvbiB8IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuX2Z1bmN0aW9ucy5wdXNoKGYpO1xuICAgIHRoaXMuX2luaXRGdW5jdGlvbnMoKTtcbiAgfVxuXG4gIGFkZEZ1bmN0aW9uSGFuZGxlcihuYW1lOiBzdHJpbmcsIGZuOiBhbnkpOiB2b2lkIHtcbiAgICBpZiAoQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW25hbWVdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1tuYW1lXSA9IHtmbn07XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBfaW5pdEZ1bmN0aW9ucygpOiB2b2lkIHtcbiAgICBjb25zdCBmdW5jdGlvbnNTdHIgPSB0aGlzLl9mdW5jdGlvbnNcbiAgICAgIC5tYXAoZiA9PiAodHlwZW9mIGYgPT09ICdzdHJpbmcnID8gZiA6IGYudG9TdHJpbmcoKSkpXG4gICAgICAuam9pbignOyAnKTtcbiAgICB0aGlzLl9mdW5jdGlvbnNTdHIgPSBgJHt0aGlzLl9iYXNlVXRpbEZ1bmN0aW9ucy5qb2luKCc7ICcpfTsgJHtmdW5jdGlvbnNTdHJ9YDtcbiAgICBBamZFeHByZXNzaW9uVXRpbHMuVVRJTF9GVU5DVElPTlMgPSB0aGlzLl9mdW5jdGlvbnNTdHI7XG4gIH1cbn1cbiJdfQ==