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
      }`
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
        const functionsStr = this._functions.map(f => typeof f === 'string' ? f : f.toString()).join('; ');
        this._functionsStr = `${this._baseUtilFunctions.join('; ')}; ${functionsStr}`;
        AjfExpressionUtils.UTIL_FUNCTIONS = this._functionsStr;
    }
}
AjfValidationService.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfValidationService, deps: [], target: i0.ɵɵFactoryTarget.Injectable });
AjfValidationService.ɵprov = i0.ɵɵngDeclareInjectable({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfValidationService });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfValidationService, decorators: [{
            type: Injectable
        }], ctorParameters: function () { return []; } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdmFsaWRhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7O0FBR3pDLE1BQU0sT0FBTyxvQkFBb0I7SUE2Vi9CO1FBNVZRLHVCQUFrQixHQUFhO1lBQ3JDOzs7OztpRUFLNkQ7WUFDN0Q7Ozs7Ozs7TUFPRTtZQUNGOzs7Ozt3REFLb0Q7WUFDcEQ7Ozs7Ozs7TUFPRTtZQUNGOzs7Ozs0RkFLd0Y7WUFDeEY7Ozs7O01BS0U7WUFDRjs7Ozs7MEZBS3NGO1lBQ3RGOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFxQkk7WUFDSjs7Ozs7Ozs7Ozs7O1FBWUk7WUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQW1CSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBbUJJO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXdCSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7O1FBZ0JJO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE0Qkk7WUFDSjs7Ozs7Ozs7Ozs7Ozs7O1FBZUk7WUFDSjs7Ozs7Ozs7UUFRSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXNDSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE2Q0k7WUFDSjs7Ozs7Ozs7O1FBU0k7WUFDSjs7O1FBR0k7WUFDSjs7O1FBR0k7WUFDSjs7OztRQUlJO1lBQ0o7Ozs7Ozs7O1FBUUk7WUFDSjs7Ozs7OztRQU9JO1NBQ0wsQ0FBQztRQUVNLGVBQVUsR0FBd0IsRUFBRSxDQUFDO1FBQ3JDLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1FBR2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsV0FBVyxDQUFDLENBQWtCO1FBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDO0lBRUQsa0JBQWtCLENBQUMsSUFBWSxFQUFFLEVBQU87UUFDdEMsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO1lBQ2hELGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFDLEVBQUUsRUFBQyxDQUFDO1NBQ3ZDO0lBQ0gsQ0FBQztJQUVPLGNBQWM7UUFDcEIsTUFBTSxZQUFZLEdBQ2QsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ2xGLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksRUFBRSxDQUFDO1FBQzlFLGtCQUFrQixDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ3pELENBQUM7O3lIQWpYVSxvQkFBb0I7NkhBQXBCLG9CQUFvQjttR0FBcEIsb0JBQW9CO2tCQURoQyxVQUFVIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkV4cHJlc3Npb25VdGlsc30gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0luamVjdGFibGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgQWpmVmFsaWRhdGlvblNlcnZpY2Uge1xuICBwcml2YXRlIF9iYXNlVXRpbEZ1bmN0aW9uczogc3RyaW5nW10gPSBbXG4gICAgYC8qKlxuICAgICAgICAqIGNvdW50IHRoZSBudW1iZXIgb2YgZGlnaXQgY29udGFpbmVkIG9uIHguXG4gICAgICAgICogQHBhcmFtICB4IHRoZSB2YWx1ZSB1c2VkIGZvciBkaWdpdCBjb3VudFxuICAgICAgICAqIEByZXR1cm4gdGhlIGNvdW50IG9mIHRoZSBkaWdpdFxuICAgICAgKi9cbiAgICB2YXIgZGlnaXRDb3VudCA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuIHgudG9TdHJpbmcoKS5sZW5ndGg7IH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjb3VudCB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgY29udGFpbmVkIG9uIHguXG4gICAgICAgICogQHBhcmFtICB4IHRoZSB2YWx1ZSB1c2VkIGZvciBkZWNpbWFsIGNvdW50XG4gICAgICAgICogQHJldHVybiB0aGUgY291bnQgb2YgdGhlIGRlY2ltYWxcbiAgICAgICovXG4gICAgdmFyIGRlY2ltYWxDb3VudCA9IGZ1bmN0aW9uKHgpIHtcbiAgICAgIHJldHVybiAocGFyc2VGbG9hdCh4KS50b1N0cmluZygpLnNwbGl0KCcuJylbMV0gfHwgW10pLmxlbmd0aDtcbiAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogY2hlY2sgaWYgeCBpcyBpbnRlZ2VyXG4gICAgICAgICogQHBhcmFtICB4IHRoZSB2YWx1ZSB1c2VkIGZvciBjaGVja1xuICAgICAgICAqIEByZXR1cm4gdHJ1ZSBpZiB4IGlzIGEgbnVtYmVyXG4gICAgICAqL1xuICAgIHZhciBpc0ludCA9IGZ1bmN0aW9uKHgpIHsgcmV0dXJuICEvWywuXS8udGVzdCh4KTsgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGNoZWNrIGlmIHggaXMgbm90IGVtcGl0eVxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgdmFsdWUgdXNlZCBmb3IgY2hlY2tcbiAgICAgICAgKiBAcmV0dXJuIHRydWUgaWYgeCBkZWZpbmVkIGFuZCBub3QgbnVsbCBhbmQgdGhlIG51bWJlciBvZiBkaWdpdCBpcyA+IDBcbiAgICAgICovXG4gICAgdmFyIG5vdEVtcHR5ID0gZnVuY3Rpb24gKHgpIHtcbiAgICAgIHJldHVybiAodHlwZW9mIHggIT09ICd1bmRlZmluZWQnICYmIHggIT09IG51bGwgPyB4LnRvU3RyaW5nKCkubGVuZ3RoID4gMCA6IGZhbHNlKTtcbiAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogY2hlY2sgaWYgeCBpcyBjb250YWluZWQgb24gYXJyYXlcbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIHZhbHVlIHVzZWQgZm9yIGNoZWNrXG4gICAgICAgICogQHJldHVybiB0aGUgcG9zaXRpb24gb2YgeCBvbiBhcnJheSBvciBpZiBhcnJheSA9PT0geFxuICAgICAgKi9cbiAgICB2YXIgdmFsdWVJbkNob2ljZSA9IGZ1bmN0aW9uKGFycmF5LCB4KSB7IHJldHVybiBhcnJheS5pbmRleE9mKHgpID4gLTEgfHwgYXJyYXkgPT09IHg7IH1gLFxuICAgIGB2YXIgc2Nhbkdyb3VwRmllbGQgPSBmdW5jdGlvbihyZXBzLCBhY2MsIGNhbGxiYWNrKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVwczsgaSsrKSB7XG4gICAgICAgICAgICBhY2MgPSBjYWxsYmFjayhhY2MsIGkpO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIHN1bSB0aGUgdmFsdWUgY29udGFpbmVkIG9uIGFycmF5XG4gICAgICAgICogQHBhcmFtICB4IHRoZSBhcnJheVxuICAgICAgICAqIEByZXR1cm4gdGhlIHN1bVxuICAgICAgKi9cbiAgICB2YXIgc3VtID0gZnVuY3Rpb24oYXJyYXkpIHtyZXR1cm4gYXJyYXkucmVkdWNlKGZ1bmN0aW9uKGEsIGIpeyByZXR1cm4gYSArIGI7IH0sIDApOyB9YCxcbiAgICBgdmFyIGRhdGVPcGVyYXRpb25zID0gZnVuY3Rpb24oZFN0cmluZywgcGVyaW9kLCBvcGVyYXRpb24sIHYpIHtcbiAgICAgICAgZm10ID0gJ21tL2RkL3l5eXknO1xuICAgICAgICB2YXIgZCA9ICh0eXBlb2YgZFN0cmluZyAhPT0gJ3VuZGVmaW5lZCcpID8gZGF0ZVV0aWxzLnBhcnNlKGRTdHJpbmcpIDogbmV3IERhdGUoKTtcbiAgICAgICAgaWYgKG9wZXJhdGlvbiA9PSAncmVtb3ZlJykge1xuICAgICAgICAgIHYgPSAtdjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZGF0ZU9wO1xuICAgICAgICBzd2l0Y2ggKHBlcmlvZCkge1xuICAgICAgICAgIGNhc2UgJ2RheSc6XG4gICAgICAgICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkRGF5cztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ21vbnRoJzpcbiAgICAgICAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGRNb250aHM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICd5ZWFyJzpcbiAgICAgICAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGRZZWFycztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICByZXR1cm4gLTE7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQoZGF0ZU9wKGQsIHYpLCBmbXQpO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIHJvdW5kIHRoZSBudW1cbiAgICAgICAgKiBAcGFyYW0gIG51bSB0aGUgdmFsdWUgdG8gcm91bmRcbiAgICAgICAgKiBAcGFyYW0gIGRpZ2l0cyBob3cgbWFueSBkaWdpdFxuICAgICAgICAqIEByZXR1cm4gbnVtIHJvdW5kZWRcbiAgICAgICovXG4gICAgICB2YXIgcm91bmQgPSBmdW5jdGlvbihudW0sIGRpZ2l0cykge1xuICAgICAgICBkaWdpdHMgPSBkaWdpdHMgfHwgMDtcbiAgICAgICAgdmFyIGYgPSAwO1xuICAgICAgICB0cnkgeyBmID0gcGFyc2VGbG9hdChudW0pOyB9IGNhdGNoIChlKSB7IH1cbiAgICAgICAgdmFyIG0gPSBNYXRoLnBvdygxMCwgZGlnaXRzKTtcbiAgICAgICAgcmV0dXJuIE1hdGgucm91bmQoZiAqIG0pIC8gbTtcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBleHRyYWN0IHRoZSBwcm9wZXJ0eSBvZiB0aGUgc291cmNlIG9iamVjdCB3aXRoIHByb3BlcnR5ICE9IG51bGxcbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eVxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHkgdGhlIHByb3BlcnR5IG9uIHdpY2ggd2Ugd2FudCBmaWx0ZXJcbiAgICAgICAgKiBAcmV0dXJuIGFycmF5IG9mIGRhdGVzXG4gICAgICAqL1xuICAgICAgdmFyIGV4dHJhY3RBcnJheSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHksIHByb3BlcnR5Mikge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIGwgPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbCA7IGkrKykge1xuICAgICAgICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwgJiYgc291cmNlW2ldW3Byb3BlcnR5Ml0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzLnB1c2goc291cmNlW2ldW3Byb3BlcnR5XSArIHNvdXJjZVtpXVtwcm9wZXJ0eTJdKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZWxzZSBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXMucHVzaChzb3VyY2VbaV1bcHJvcGVydHldKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBleHRyYWN0IHRoZSBwcm9wZXJ0eSBvZiB0aGUgc291cmNlIG9iamVjdCB3aXRoIHByb3BlcnR5ICE9IG51bGxcbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eVxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHVlcyBzdHJpbmcgYXJyYXkgdGhlIHByb3BlcnRpZXMgdG8gc3VtXG4gICAgICAgICogQHJldHVybiB0aGUgc3VtXG4gICAgICAqL1xuICAgICAgdmFyIGV4dHJhY3RTdW0gPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgIHByb3BlcnRpZXMgPSAocHJvcGVydGllcyB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsID0gcHJvcGVydGllcy5sZW5ndGg7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsIDsgaSsrKSB7XG4gICAgICAgICAgdmFyIGFycmF5ID0gZXh0cmFjdEFycmF5KHNvdXJjZSwgcHJvcGVydGllc1tpXSk7XG4gICAgICAgICAgdmFyIGxlbmcgPSBhcnJheS5sZW5ndGg7XG4gICAgICAgICAgZm9yKHZhciBqID0gMDsgaiA8IGxlbmc7IGkrKykge1xuICAgICAgICAgICAgc3VtICs9IGFycmF5W2pdO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gc3VtO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGV4dHJhY3QgdGhlIGFycmF5IG9mIHN1bSBmb3IgZWFjaCB3ZWVrICE9IG51bGxcbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eVxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHVlcyBzdHJpbmcgYXJyYXkgdGhlIHByb3BlcnRpZXMgdG8gc3VtXG4gICAgICAgICogQHJldHVybiB0aGUgc3VtXG4gICAgICAqL1xuICAgICAgdmFyIGV4dHJhY3RBcnJheVN1bSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydGllcykge1xuICAgICAgICB2YXIgYXJyYXlzID0gW107XG4gICAgICAgIHByb3BlcnRpZXMgPSAocHJvcGVydGllcyB8fCBbXSkuc2xpY2UoMCk7XG5cbiAgICAgICAgZm9yICh2YXIgcHJvcEkgPSAwOyBwcm9wSSA8IHByb3BlcnRpZXMubGVuZ3RoIDsgcHJvcEkrKykge1xuICAgICAgICAgIHZhciBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbcHJvcEldKTtcbiAgICAgICAgICBhcnJheXMucHVzaChhcnJheSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIGZvciAodmFyIHdlZWtJID0gMDsgd2Vla0kgPCBhcnJheS5sZW5ndGg7IHdlZWtJICsrICkge1xuICAgICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICAgIGZvciAodmFyIHByb3BJID0gMDsgcHJvcEkgPCBwcm9wZXJ0aWVzLmxlbmd0aCA7IHByb3BJKyspIHtcbiAgICAgICAgICAgIHN1bSA9IHN1bSArIGFycmF5c1twcm9wSV1bd2Vla0ldXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5wdXNoKHN1bSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBkcmF3IGEgdGhyZXNob2xkIGxpbmUgb24gY2hhcnQgcmVsYXRlZCB0byB0aGUgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eVxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHkgdGhlIHByb3BlcnR5IG9uIHdpY2ggd2Ugd2FudCBmaWx0ZXJcbiAgICAgICAgKiBAcmV0dXJuIGFycmF5IG9mIGRhdGVzXG4gICAgICAqL1xuICAgICAgdmFyIGRyYXdUaHJlc2hvbGQgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5LCB0aHJlc2hvbGQpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGwgOyBpKyspIHtcbiAgICAgICAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXMucHVzaCh0aHJlc2hvbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGV4dHJhY3QgdGhlIGRhdGVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0IHdpdGggcHJvcGVydHkgIT0gbnVsbFxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5IGFuZCBkYXRlX3N0YXJ0XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgb24gd2ljaCB3ZSB3YW50IHRvIGNhbGN1bGF0ZSBkYXRlc1xuICAgICAgICAqIEBwYXJhbSAgZm9ybWF0IHRoZSBmb3JtYXQgb2YgdGhlIGRhdGVcbiAgICAgICAgKiBAcmV0dXJuIGFycmF5IG9mIGRhdGVzXG4gICAgICAqL1xuICAgICAgdmFyIGV4dHJhY3REYXRlcyA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHksIGZvcm1hdCkge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIGwgPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIHZhciBwcmVmaXggPSAnJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsIDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgc3dpdGNoKGZvcm1hdCkge1xuICAgICAgICAgICAgICBjYXNlIFwiV1dcIjpcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBcIldcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcIm1tXCI6XG4gICAgICAgICAgICAgICAgcHJlZml4ID0gXCJNXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcHJlZml4ID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldW1wiZGF0ZV9zdGFydFwiXSwgZm9ybWF0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogZXh0cmFjdCB0aGUgbGFzdCBwcm9wZXJ0eSBjb250YWlucyBpbiBzb3VyY2UgIT0gbnVsbFxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5IGFuZCBkYXRlX3N0YXJ0XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgdG8gZmluZFxuICAgICAgICAqIEByZXR1cm4gdGhlIGxhc3QgcHJvcGVydHkgIT0gbnVsbFxuICAgICAgKi9cbiAgICAgIHZhciBsYXN0UHJvcGVydHkgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5KSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGggLTE7XG5cbiAgICAgICAgd2hpbGUgKGwgPj0gMCAmJiBzb3VyY2VbbF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICAgICAgICBsLS07XG4gICAgICAgICAgaWYgKGwgPCAwKSByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbCA+PSAwID8gc291cmNlW2xdW3Byb3BlcnR5XSA6IDA7XG4gICAgICB9YCxcbiAgICBgdmFyIHN1bUxhc3RQcm9wZXJ0aWVzID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgc3VtICs9IGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjb21wdXRlIHRoZSB0cmVuZCBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSBvbiB3aWNoIHdlIHdhbnQgdG8gY2FsY3VsYXRlIHRoZSB0cmVuZFxuICAgICAgICAqIEByZXR1cm4gYW4gaHRtbCBpY29uIHRoYXQgaWRlbnRpZmllcyB0aGUgdHJlbmRcbiAgICAgICovXG4gICAgICB2YXIgY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHkpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsYXN0ID0gc291cmNlLmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChzb3VyY2VbbGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICAgICAgICBpZiAobGFzdCA9PSAwKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFzdC0tO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYXN0TGFzdCA9IGxhc3QgLSAxO1xuICAgICAgICBpZiAobGFzdCA9PSAwKSB7XG4gICAgICAgICAgbGFzdExhc3QgPSBsYXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdoaWxlIChzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobGFzdExhc3QgPT0gMCkge1xuICAgICAgICAgICAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdExhc3QtLTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGFzdFByb3BlcnR5ID0gc291cmNlW2xhc3RdPyhzb3VyY2VbbGFzdF1bcHJvcGVydHldIHx8IDApOiAwO1xuICAgICAgICB2YXIgbGFzdExhc3RQcm9wZXJ0eSA9IHNvdXJjZVtsYXN0TGFzdF0/KHNvdXJjZVtsYXN0TGFzdF1bcHJvcGVydHldIHx8IDApOiAwO1xuXG4gICAgICAgIGlmIChsYXN0UHJvcGVydHkgPT0gbGFzdExhc3RQcm9wZXJ0eSkge1xuICAgICAgICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gICAgICAgIH0gZWxzZSBpZiAobGFzdFByb3BlcnR5ID4gbGFzdExhc3RQcm9wZXJ0eSkge1xuICAgICAgICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gICAgICAgIH1cbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjb21wdXRlIHRoZSBhdmVyYWdlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eVxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHkgdGhlIHByb3BlcnR5IG9uIHdpY2ggd2Ugd2FudCB0byBjYWxjdWxhdGUgdGhlIGF2ZXJhZ2VcbiAgICAgICAgKiBAcGFyYW0gIHJhbmdlIHRoZSByYW5nZSBvbiB3aWNoIHdlIHdhbnQgdG8gY2FsY3VsYXRlIHRoZSBhdmVyYWdlXG4gICAgICAgICogQHBhcmFtICBjb2VmZmljZW50IHRoZSBjb2VmZmljZW50IHVzZWQgZm9yIGNhbGN1bGF0ZSB0aGUgdGhyZXNob2xkXG4gICAgICAgICAgICAgICAgICBpZiBjb2VmZmljZW50IGlzIDAgbWVhbiByZXR1cm4gdGhlIGNvdW50IG9mIHByb3BlcnR5ID4gMFxuICAgICAgICAqIEByZXR1cm4gdGhlIGF2ZXJhZ2UgdmFsdWUgfHwgdGhlIGNvdW50IG9mIHByb3BlcnR5ID4gMFxuICAgICAgKi9cbiAgICAgIHZhciBjYWxjdWxhdGVBdmdQcm9wZXJ0eSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHksIHJhbmdlLCBjb2VmZmljaWVudCkge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcblxuICAgICAgICBzb3VyY2UucG9wKCk7XG5cbiAgICAgICAgY29lZmZpY2llbnQgPSBjb2VmZmljaWVudCB8fCAxO1xuICAgICAgICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlcyA9IDA7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgdmFyIG5vWmVybyA9IDA7XG5cbiAgICAgICAgaWYobCA8IHJhbmdlKSB7XG4gICAgICAgICAgcmFuZ2UgPSBsO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKHJhbmdlICE9IDApIHtcbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJlcyArPSBzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XTtcblxuICAgICAgICAgICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldID4gMCkge1xuICAgICAgICAgICAgICBub1plcm8rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbC0tO1xuICAgICAgICAgIHJhbmdlLS07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgICAgICAgIHJldHVybiBub1plcm87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHRocmVzaG9sZCA9IChyZXMvY291bnRlcikqY29lZmZpY2llbnQgfHwgMDtcbiAgICAgICAgICByZXR1cm4gdGhyZXNob2xkO1xuICAgICAgICB9XG4gICAgICB9YCxcbiAgICBgdmFyIGFsZXJ0ID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSwgdGhyZXNob2xkLCBmbXQpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aDtcblxuICAgICAgICBpZiAoIGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnR5KSAgPiB0aHJlc2hvbGQgKSB7XG4gICAgICAgICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj53YXJuaW5nPC9pPjwvcD4nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJzxwPjwvcD4nO1xuICAgICAgICAgIH1cbiAgICAgIH1gLFxuICAgIGB2YXIgZm9ybWF0TnVtYmVyID0gZnVuY3Rpb24obnVtLCBmbXQpIHtcbiAgICAgICAgZm10ID0gZm10IHx8ICcwLDBbLl0wJztcbiAgICAgICAgcmV0dXJuIG51bWJybyhudW0pLmZvcm1hdChmbXQpO1xuICAgICAgfWAsXG4gICAgYHZhciBmb3JtYXREYXRlID0gZnVuY3Rpb24oZGF0ZSwgZm10KSB7XG4gICAgICAgIGZtdCA9IGZtdCB8fCAnbW0tZGQteXl5eSc7XG4gICAgICAgIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KGRhdGUsIGZtdCk7XG4gICAgICB9YCxcbiAgICBgdmFyIGlzb01vbnRoID0gZnVuY3Rpb24oZGF0ZSwgZm10KSB7XG4gICAgICAgIGZtdCA9IGZtdCB8fCAnbW0nO1xuICAgICAgICB2YXIgZHUgPSBkYXRlVXRpbHM7XG4gICAgICAgIHJldHVybiBkdS5mb3JtYXQoZHUuYWRkRGF5cyhkdS5zdGFydE9mTW9udGgoZGF0ZSksIDQpLGZtdClcbiAgICAgIH1gLFxuICAgIGB2YXIgbmV4dENvdW50ZXJWYWx1ZSA9IGZ1bmN0aW9uKGNvdW50ZXJOYW1lLCBmaXJzdFZhbHVlKSB7XG4gICAgICAgIGZpcnN0VmFsdWUgPSBmaXJzdFZhbHVlICE9IG51bGwgPyBmaXJzdFZhbHVlIDogMDtcbiAgICAgICAgaWYgKGV4ZWNDb250ZXh0WyckJCcrY291bnRlck5hbWVdID09IG51bGwpIHtcbiAgICAgICAgICBleGVjQ29udGV4dFsnJCQnK2NvdW50ZXJOYW1lXSA9IGZpcnN0VmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXhlY0NvbnRleHRbJyQkJytjb3VudGVyTmFtZV0rKztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZXhlY0NvbnRleHRbJyQkJytjb3VudGVyTmFtZV07XG4gICAgICB9YCxcbiAgICBgdmFyIGdldENvb3JkaW5hdGUgPSBmdW5jdGlvbihzb3VyY2UsIHpvb20pIHtcbiAgICAgICAgem9vbSA9IHpvb20gfHwgNjtcbiAgICAgICAgaWYoc291cmNlID09IG51bGwpIHtcbiAgICAgICAgICByZXR1cm4gWzUxLjUwNSwtMC4wOSwgem9vbV07XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIFtzb3VyY2VbMF0sIHNvdXJjZVsxXSwgem9vbV07XG4gICAgICAgIH1cbiAgICAgIH1gXG4gIF07XG5cbiAgcHJpdmF0ZSBfZnVuY3Rpb25zOiAoRnVuY3Rpb258c3RyaW5nKVtdID0gW107XG4gIHByaXZhdGUgX2Z1bmN0aW9uc1N0cjogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faW5pdEZ1bmN0aW9ucygpO1xuICB9XG5cbiAgYWRkRnVuY3Rpb24oZjogRnVuY3Rpb258c3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fZnVuY3Rpb25zLnB1c2goZik7XG4gICAgdGhpcy5faW5pdEZ1bmN0aW9ucygpO1xuICB9XG5cbiAgYWRkRnVuY3Rpb25IYW5kbGVyKG5hbWU6IHN0cmluZywgZm46IGFueSk6IHZvaWQge1xuICAgIGlmIChBamZFeHByZXNzaW9uVXRpbHMudXRpbHNbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW25hbWVdID0ge2ZufTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0RnVuY3Rpb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bmN0aW9uc1N0ciA9XG4gICAgICAgIHRoaXMuX2Z1bmN0aW9ucy5tYXAoZiA9PiB0eXBlb2YgZiA9PT0gJ3N0cmluZycgPyBmIDogZi50b1N0cmluZygpKS5qb2luKCc7ICcpO1xuICAgIHRoaXMuX2Z1bmN0aW9uc1N0ciA9IGAke3RoaXMuX2Jhc2VVdGlsRnVuY3Rpb25zLmpvaW4oJzsgJyl9OyAke2Z1bmN0aW9uc1N0cn1gO1xuICAgIEFqZkV4cHJlc3Npb25VdGlscy5VVElMX0ZVTkNUSU9OUyA9IHRoaXMuX2Z1bmN0aW9uc1N0cjtcbiAgfVxufVxuIl19