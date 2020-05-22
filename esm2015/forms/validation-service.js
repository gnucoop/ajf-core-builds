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
import { __decorate, __metadata } from "tslib";
import { AjfExpressionUtils } from '@ajf/core/models';
import { Injectable } from '@angular/core';
let AjfValidationService = /** @class */ (() => {
    let AjfValidationService = class AjfValidationService {
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
        return numeral(num).format(fmt);
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
    };
    AjfValidationService = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [])
    ], AjfValidationService);
    return AjfValidationService;
})();
export { AjfValidationService };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdmFsaWRhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUNwRCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBR3pDO0lBQUEsSUFBYSxvQkFBb0IsR0FBakMsTUFBYSxvQkFBb0I7UUE2Vi9CO1lBNVZRLHVCQUFrQixHQUFhO2dCQUNyQzs7Ozs7aUVBSzZEO2dCQUM3RDs7Ozs7OztNQU9FO2dCQUNGOzs7Ozt3REFLb0Q7Z0JBQ3BEOzs7Ozs7O01BT0U7Z0JBQ0Y7Ozs7OzRGQUt3RjtnQkFDeEY7Ozs7O01BS0U7Z0JBQ0Y7Ozs7OzBGQUtzRjtnQkFDdEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXFCSTtnQkFDSjs7Ozs7Ozs7Ozs7O1FBWUk7Z0JBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtQkk7Z0JBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtQkk7Z0JBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXdCSTtnQkFDSjs7Ozs7Ozs7Ozs7Ozs7OztRQWdCSTtnQkFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQTRCSTtnQkFDSjs7Ozs7Ozs7Ozs7Ozs7O1FBZUk7Z0JBQ0o7Ozs7Ozs7O1FBUUk7Z0JBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBc0NJO2dCQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUE2Q0k7Z0JBQ0o7Ozs7Ozs7OztRQVNJO2dCQUNKOzs7UUFHSTtnQkFDSjs7O1FBR0k7Z0JBQ0o7Ozs7UUFJSTtnQkFDSjs7Ozs7Ozs7UUFRSTtnQkFDSjs7Ozs7OztRQU9JO2FBQ0wsQ0FBQztZQUVNLGVBQVUsR0FBd0IsRUFBRSxDQUFDO1lBQ3JDLGtCQUFhLEdBQVcsRUFBRSxDQUFDO1lBR2pDLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBRUQsV0FBVyxDQUFDLENBQWtCO1lBQzVCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztRQUN4QixDQUFDO1FBRUQsa0JBQWtCLENBQUMsSUFBWSxFQUFFLEVBQU87WUFDdEMsSUFBSSxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO2dCQUNoRCxrQkFBa0IsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBQyxFQUFFLEVBQUMsQ0FBQzthQUN2QztRQUNILENBQUM7UUFFTyxjQUFjO1lBQ3BCLE1BQU0sWUFBWSxHQUNkLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLEtBQUssUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNsRixJQUFJLENBQUMsYUFBYSxHQUFHLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxZQUFZLEVBQUUsQ0FBQztZQUM5RSxrQkFBa0IsQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQztRQUN6RCxDQUFDO0tBQ0YsQ0FBQTtJQWxYWSxvQkFBb0I7UUFEaEMsVUFBVSxFQUFFOztPQUNBLG9CQUFvQixDQWtYaEM7SUFBRCwyQkFBQztLQUFBO1NBbFhZLG9CQUFvQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZFeHByZXNzaW9uVXRpbHN9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZlZhbGlkYXRpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfYmFzZVV0aWxGdW5jdGlvbnM6IHN0cmluZ1tdID0gW1xuICAgIGAvKipcbiAgICAgICAgKiBjb3VudCB0aGUgbnVtYmVyIG9mIGRpZ2l0IGNvbnRhaW5lZCBvbiB4LlxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgdmFsdWUgdXNlZCBmb3IgZGlnaXQgY291bnRcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBjb3VudCBvZiB0aGUgZGlnaXRcbiAgICAgICovXG4gICAgdmFyIGRpZ2l0Q291bnQgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4LnRvU3RyaW5nKCkubGVuZ3RoOyB9YCxcbiAgICBgLyoqXG4gICAgICAgICogY291bnQgdGhlIG51bWJlciBvZiBkZWNpbWFsIGNvbnRhaW5lZCBvbiB4LlxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgdmFsdWUgdXNlZCBmb3IgZGVjaW1hbCBjb3VudFxuICAgICAgICAqIEByZXR1cm4gdGhlIGNvdW50IG9mIHRoZSBkZWNpbWFsXG4gICAgICAqL1xuICAgIHZhciBkZWNpbWFsQ291bnQgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gKHBhcnNlRmxvYXQoeCkudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdIHx8IFtdKS5sZW5ndGg7XG4gICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGNoZWNrIGlmIHggaXMgaW50ZWdlclxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgdmFsdWUgdXNlZCBmb3IgY2hlY2tcbiAgICAgICAgKiBAcmV0dXJuIHRydWUgaWYgeCBpcyBhIG51bWJlclxuICAgICAgKi9cbiAgICB2YXIgaXNJbnQgPSBmdW5jdGlvbih4KSB7IHJldHVybiAhL1ssLl0vLnRlc3QoeCk7IH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjaGVjayBpZiB4IGlzIG5vdCBlbXBpdHlcbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIHZhbHVlIHVzZWQgZm9yIGNoZWNrXG4gICAgICAgICogQHJldHVybiB0cnVlIGlmIHggZGVmaW5lZCBhbmQgbm90IG51bGwgYW5kIHRoZSBudW1iZXIgb2YgZGlnaXQgaXMgPiAwXG4gICAgICAqL1xuICAgIHZhciBub3RFbXB0eSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gKHR5cGVvZiB4ICE9PSAndW5kZWZpbmVkJyAmJiB4ICE9PSBudWxsID8geC50b1N0cmluZygpLmxlbmd0aCA+IDAgOiBmYWxzZSk7XG4gICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGNoZWNrIGlmIHggaXMgY29udGFpbmVkIG9uIGFycmF5XG4gICAgICAgICogQHBhcmFtICB4IHRoZSB2YWx1ZSB1c2VkIGZvciBjaGVja1xuICAgICAgICAqIEByZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHggb24gYXJyYXkgb3IgaWYgYXJyYXkgPT09IHhcbiAgICAgICovXG4gICAgdmFyIHZhbHVlSW5DaG9pY2UgPSBmdW5jdGlvbihhcnJheSwgeCkgeyByZXR1cm4gYXJyYXkuaW5kZXhPZih4KSA+IC0xIHx8IGFycmF5ID09PSB4OyB9YCxcbiAgICBgdmFyIHNjYW5Hcm91cEZpZWxkID0gZnVuY3Rpb24ocmVwcywgYWNjLCBjYWxsYmFjaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcHM7IGkrKykge1xuICAgICAgICAgICAgYWNjID0gY2FsbGJhY2soYWNjLCBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBzdW0gdGhlIHZhbHVlIGNvbnRhaW5lZCBvbiBhcnJheVxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgYXJyYXlcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBzdW1cbiAgICAgICovXG4gICAgdmFyIHN1bSA9IGZ1bmN0aW9uKGFycmF5KSB7cmV0dXJuIGFycmF5LnJlZHVjZShmdW5jdGlvbihhLCBiKXsgcmV0dXJuIGEgKyBiOyB9LCAwKTsgfWAsXG4gICAgYHZhciBkYXRlT3BlcmF0aW9ucyA9IGZ1bmN0aW9uKGRTdHJpbmcsIHBlcmlvZCwgb3BlcmF0aW9uLCB2KSB7XG4gICAgICAgIGZtdCA9ICdtbS9kZC95eXl5JztcbiAgICAgICAgdmFyIGQgPSAodHlwZW9mIGRTdHJpbmcgIT09ICd1bmRlZmluZWQnKSA/IGRhdGVVdGlscy5wYXJzZShkU3RyaW5nKSA6IG5ldyBEYXRlKCk7XG4gICAgICAgIGlmIChvcGVyYXRpb24gPT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICB2ID0gLXY7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGVPcDtcbiAgICAgICAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZERheXM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkTW9udGhzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkWWVhcnM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KGRhdGVPcChkLCB2KSwgZm10KTtcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiByb3VuZCB0aGUgbnVtXG4gICAgICAgICogQHBhcmFtICBudW0gdGhlIHZhbHVlIHRvIHJvdW5kXG4gICAgICAgICogQHBhcmFtICBkaWdpdHMgaG93IG1hbnkgZGlnaXRcbiAgICAgICAgKiBAcmV0dXJuIG51bSByb3VuZGVkXG4gICAgICAqL1xuICAgICAgdmFyIHJvdW5kID0gZnVuY3Rpb24obnVtLCBkaWdpdHMpIHtcbiAgICAgICAgZGlnaXRzID0gZGlnaXRzIHx8IDA7XG4gICAgICAgIHZhciBmID0gMDtcbiAgICAgICAgdHJ5IHsgZiA9IHBhcnNlRmxvYXQobnVtKTsgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIHZhciBtID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGYgKiBtKSAvIG07XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogZXh0cmFjdCB0aGUgcHJvcGVydHkgb2YgdGhlIHNvdXJjZSBvYmplY3Qgd2l0aCBwcm9wZXJ0eSAhPSBudWxsXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSBvbiB3aWNoIHdlIHdhbnQgZmlsdGVyXG4gICAgICAgICogQHJldHVybiBhcnJheSBvZiBkYXRlc1xuICAgICAgKi9cbiAgICAgIHZhciBleHRyYWN0QXJyYXkgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5LCBwcm9wZXJ0eTIpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGwgOyBpKyspIHtcbiAgICAgICAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsICYmIHNvdXJjZVtpXVtwcm9wZXJ0eTJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKHNvdXJjZVtpXVtwcm9wZXJ0eV0gKyBzb3VyY2VbaV1bcHJvcGVydHkyXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzLnB1c2goc291cmNlW2ldW3Byb3BlcnR5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogZXh0cmFjdCB0aGUgcHJvcGVydHkgb2YgdGhlIHNvdXJjZSBvYmplY3Qgd2l0aCBwcm9wZXJ0eSAhPSBudWxsXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR1ZXMgc3RyaW5nIGFycmF5IHRoZSBwcm9wZXJ0aWVzIHRvIHN1bVxuICAgICAgICAqIEByZXR1cm4gdGhlIHN1bVxuICAgICAgKi9cbiAgICAgIHZhciBleHRyYWN0U3VtID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICBwcm9wZXJ0aWVzID0gKHByb3BlcnRpZXMgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHByb3BlcnRpZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbCA7IGkrKykge1xuICAgICAgICAgIHZhciBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgICAgICAgIHZhciBsZW5nID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBsZW5nOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSArPSBhcnJheVtqXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBleHRyYWN0IHRoZSBhcnJheSBvZiBzdW0gZm9yIGVhY2ggd2VlayAhPSBudWxsXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR1ZXMgc3RyaW5nIGFycmF5IHRoZSBwcm9wZXJ0aWVzIHRvIHN1bVxuICAgICAgICAqIEByZXR1cm4gdGhlIHN1bVxuICAgICAgKi9cbiAgICAgIHZhciBleHRyYWN0QXJyYXlTdW0gPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgdmFyIGFycmF5cyA9IFtdO1xuICAgICAgICBwcm9wZXJ0aWVzID0gKHByb3BlcnRpZXMgfHwgW10pLnNsaWNlKDApO1xuXG4gICAgICAgIGZvciAodmFyIHByb3BJID0gMDsgcHJvcEkgPCBwcm9wZXJ0aWVzLmxlbmd0aCA7IHByb3BJKyspIHtcbiAgICAgICAgICB2YXIgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzW3Byb3BJXSk7XG4gICAgICAgICAgYXJyYXlzLnB1c2goYXJyYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciB3ZWVrSSA9IDA7IHdlZWtJIDwgYXJyYXkubGVuZ3RoOyB3ZWVrSSArKyApIHtcbiAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICBmb3IgKHZhciBwcm9wSSA9IDA7IHByb3BJIDwgcHJvcGVydGllcy5sZW5ndGggOyBwcm9wSSsrKSB7XG4gICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJheXNbcHJvcEldW3dlZWtJXVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXMucHVzaChzdW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogZHJhdyBhIHRocmVzaG9sZCBsaW5lIG9uIGNoYXJ0IHJlbGF0ZWQgdG8gdGhlIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSBvbiB3aWNoIHdlIHdhbnQgZmlsdGVyXG4gICAgICAgICogQHJldHVybiBhcnJheSBvZiBkYXRlc1xuICAgICAgKi9cbiAgICAgIHZhciBkcmF3VGhyZXNob2xkID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSwgdGhyZXNob2xkKSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsIDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzLnB1c2godGhyZXNob2xkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBleHRyYWN0IHRoZSBkYXRlcyBvZiB0aGUgc291cmNlIG9iamVjdCB3aXRoIHByb3BlcnR5ICE9IG51bGxcbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eSBhbmQgZGF0ZV9zdGFydFxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHkgdGhlIHByb3BlcnR5IG9uIHdpY2ggd2Ugd2FudCB0byBjYWxjdWxhdGUgZGF0ZXNcbiAgICAgICAgKiBAcGFyYW0gIGZvcm1hdCB0aGUgZm9ybWF0IG9mIHRoZSBkYXRlXG4gICAgICAgICogQHJldHVybiBhcnJheSBvZiBkYXRlc1xuICAgICAgKi9cbiAgICAgIHZhciBleHRyYWN0RGF0ZXMgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5LCBmb3JtYXQpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICB2YXIgcHJlZml4ID0gJyc7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbCA7IGkrKykge1xuICAgICAgICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN3aXRjaChmb3JtYXQpIHtcbiAgICAgICAgICAgICAgY2FzZSBcIldXXCI6XG4gICAgICAgICAgICAgICAgcHJlZml4ID0gXCJXXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJtbVwiOlxuICAgICAgICAgICAgICAgIHByZWZpeCA9IFwiTVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHByZWZpeCA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVtcImRhdGVfc3RhcnRcIl0sIGZvcm1hdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGV4dHJhY3QgdGhlIGxhc3QgcHJvcGVydHkgY29udGFpbnMgaW4gc291cmNlICE9IG51bGxcbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eSBhbmQgZGF0ZV9zdGFydFxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHkgdGhlIHByb3BlcnR5IHRvIGZpbmRcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBsYXN0IHByb3BlcnR5ICE9IG51bGxcbiAgICAgICovXG4gICAgICB2YXIgbGFzdFByb3BlcnR5ID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSkge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIGwgPSBzb3VyY2UubGVuZ3RoIC0xO1xuXG4gICAgICAgIHdoaWxlIChsID49IDAgJiYgc291cmNlW2xdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICAgICAgbC0tO1xuICAgICAgICAgIGlmIChsIDwgMCkgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGwgPj0gMCA/IHNvdXJjZVtsXVtwcm9wZXJ0eV0gOiAwO1xuICAgICAgfWAsXG4gICAgYHZhciBzdW1MYXN0UHJvcGVydGllcyA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydGllcykge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHN1bSArPSBsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdW07XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogY29tcHV0ZSB0aGUgdHJlbmQgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgb24gd2ljaCB3ZSB3YW50IHRvIGNhbGN1bGF0ZSB0aGUgdHJlbmRcbiAgICAgICAgKiBAcmV0dXJuIGFuIGh0bWwgaWNvbiB0aGF0IGlkZW50aWZpZXMgdGhlIHRyZW5kXG4gICAgICAqL1xuICAgICAgdmFyIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHkgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5KSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbGFzdCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoc291cmNlW2xhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKGxhc3QgPT0gMCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxhc3QtLTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGFzdExhc3QgPSBsYXN0IC0gMTtcbiAgICAgICAgaWYgKGxhc3QgPT0gMCkge1xuICAgICAgICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aGlsZSAoc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGxhc3RMYXN0ID09IDApIHtcbiAgICAgICAgICAgICAgbGFzdExhc3QgPSBsYXN0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RMYXN0LS07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhc3RQcm9wZXJ0eSA9IHNvdXJjZVtsYXN0XT8oc291cmNlW2xhc3RdW3Byb3BlcnR5XSB8fCAwKTogMDtcbiAgICAgICAgdmFyIGxhc3RMYXN0UHJvcGVydHkgPSBzb3VyY2VbbGFzdExhc3RdPyhzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSB8fCAwKTogMDtcblxuICAgICAgICBpZiAobGFzdFByb3BlcnR5ID09IGxhc3RMYXN0UHJvcGVydHkpIHtcbiAgICAgICAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmJsdWVcIj50cmVuZGluZ19mbGF0PC9pPjwvcD4nO1xuICAgICAgICB9IGVsc2UgaWYgKGxhc3RQcm9wZXJ0eSA+IGxhc3RMYXN0UHJvcGVydHkpIHtcbiAgICAgICAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICAgICAgICB9XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogY29tcHV0ZSB0aGUgYXZlcmFnZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSBvbiB3aWNoIHdlIHdhbnQgdG8gY2FsY3VsYXRlIHRoZSBhdmVyYWdlXG4gICAgICAgICogQHBhcmFtICByYW5nZSB0aGUgcmFuZ2Ugb24gd2ljaCB3ZSB3YW50IHRvIGNhbGN1bGF0ZSB0aGUgYXZlcmFnZVxuICAgICAgICAqIEBwYXJhbSAgY29lZmZpY2VudCB0aGUgY29lZmZpY2VudCB1c2VkIGZvciBjYWxjdWxhdGUgdGhlIHRocmVzaG9sZFxuICAgICAgICAgICAgICAgICAgaWYgY29lZmZpY2VudCBpcyAwIG1lYW4gcmV0dXJuIHRoZSBjb3VudCBvZiBwcm9wZXJ0eSA+IDBcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBhdmVyYWdlIHZhbHVlIHx8IHRoZSBjb3VudCBvZiBwcm9wZXJ0eSA+IDBcbiAgICAgICovXG4gICAgICB2YXIgY2FsY3VsYXRlQXZnUHJvcGVydHkgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5LCByYW5nZSwgY29lZmZpY2llbnQpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG5cbiAgICAgICAgc291cmNlLnBvcCgpO1xuXG4gICAgICAgIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgICAgICAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHZhciByZXMgPSAwO1xuICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgIHZhciBub1plcm8gPSAwO1xuXG4gICAgICAgIGlmKGwgPCByYW5nZSkge1xuICAgICAgICAgIHJhbmdlID0gbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChyYW5nZSAhPSAwKSB7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXMgKz0gc291cmNlW2wgLSAxXVtwcm9wZXJ0eV07XG5cbiAgICAgICAgICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSA+IDApIHtcbiAgICAgICAgICAgICAgbm9aZXJvKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGwtLTtcbiAgICAgICAgICByYW5nZS0tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICAgICAgICByZXR1cm4gbm9aZXJvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB0aHJlc2hvbGQgPSAocmVzL2NvdW50ZXIpKmNvZWZmaWNpZW50IHx8IDA7XG4gICAgICAgICAgcmV0dXJuIHRocmVzaG9sZDtcbiAgICAgICAgfVxuICAgICAgfWAsXG4gICAgYHZhciBhbGVydCA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHksIHRocmVzaG9sZCwgZm10KSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCBsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0eSkgID4gdGhyZXNob2xkICkge1xuICAgICAgICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+d2FybmluZzwvaT48L3A+JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICc8cD48L3A+JztcbiAgICAgICAgICB9XG4gICAgICB9YCxcbiAgICBgdmFyIGZvcm1hdE51bWJlciA9IGZ1bmN0aW9uKG51bSwgZm10KSB7XG4gICAgICAgIGZtdCA9IGZtdCB8fCAnMCwwWy5dMCc7XG4gICAgICAgIHJldHVybiBudW1lcmFsKG51bSkuZm9ybWF0KGZtdCk7XG4gICAgICB9YCxcbiAgICBgdmFyIGZvcm1hdERhdGUgPSBmdW5jdGlvbihkYXRlLCBmbXQpIHtcbiAgICAgICAgZm10ID0gZm10IHx8ICdtbS1kZC15eXl5JztcbiAgICAgICAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQoZGF0ZSwgZm10KTtcbiAgICAgIH1gLFxuICAgIGB2YXIgaXNvTW9udGggPSBmdW5jdGlvbihkYXRlLCBmbXQpIHtcbiAgICAgICAgZm10ID0gZm10IHx8ICdtbSc7XG4gICAgICAgIHZhciBkdSA9IGRhdGVVdGlscztcbiAgICAgICAgcmV0dXJuIGR1LmZvcm1hdChkdS5hZGREYXlzKGR1LnN0YXJ0T2ZNb250aChkYXRlKSwgNCksZm10KVxuICAgICAgfWAsXG4gICAgYHZhciBuZXh0Q291bnRlclZhbHVlID0gZnVuY3Rpb24oY291bnRlck5hbWUsIGZpcnN0VmFsdWUpIHtcbiAgICAgICAgZmlyc3RWYWx1ZSA9IGZpcnN0VmFsdWUgIT0gbnVsbCA/IGZpcnN0VmFsdWUgOiAwO1xuICAgICAgICBpZiAoZXhlY0NvbnRleHRbJyQkJytjb3VudGVyTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIGV4ZWNDb250ZXh0WyckJCcrY291bnRlck5hbWVdID0gZmlyc3RWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleGVjQ29udGV4dFsnJCQnK2NvdW50ZXJOYW1lXSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleGVjQ29udGV4dFsnJCQnK2NvdW50ZXJOYW1lXTtcbiAgICAgIH1gLFxuICAgIGB2YXIgZ2V0Q29vcmRpbmF0ZSA9IGZ1bmN0aW9uKHNvdXJjZSwgem9vbSkge1xuICAgICAgICB6b29tID0gem9vbSB8fCA2O1xuICAgICAgICBpZihzb3VyY2UgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBbNTEuNTA1LC0wLjA5LCB6b29tXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW3NvdXJjZVswXSwgc291cmNlWzFdLCB6b29tXTtcbiAgICAgICAgfVxuICAgICAgfWBcbiAgXTtcblxuICBwcml2YXRlIF9mdW5jdGlvbnM6IChGdW5jdGlvbnxzdHJpbmcpW10gPSBbXTtcbiAgcHJpdmF0ZSBfZnVuY3Rpb25zU3RyOiBzdHJpbmcgPSAnJztcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLl9pbml0RnVuY3Rpb25zKCk7XG4gIH1cblxuICBhZGRGdW5jdGlvbihmOiBGdW5jdGlvbnxzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9mdW5jdGlvbnMucHVzaChmKTtcbiAgICB0aGlzLl9pbml0RnVuY3Rpb25zKCk7XG4gIH1cblxuICBhZGRGdW5jdGlvbkhhbmRsZXIobmFtZTogc3RyaW5nLCBmbjogYW55KTogdm9pZCB7XG4gICAgaWYgKEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1tuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBBamZFeHByZXNzaW9uVXRpbHMudXRpbHNbbmFtZV0gPSB7Zm59O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGdW5jdGlvbnMoKTogdm9pZCB7XG4gICAgY29uc3QgZnVuY3Rpb25zU3RyID1cbiAgICAgICAgdGhpcy5fZnVuY3Rpb25zLm1hcChmID0+IHR5cGVvZiBmID09PSAnc3RyaW5nJyA/IGYgOiBmLnRvU3RyaW5nKCkpLmpvaW4oJzsgJyk7XG4gICAgdGhpcy5fZnVuY3Rpb25zU3RyID0gYCR7dGhpcy5fYmFzZVV0aWxGdW5jdGlvbnMuam9pbignOyAnKX07ICR7ZnVuY3Rpb25zU3RyfWA7XG4gICAgQWpmRXhwcmVzc2lvblV0aWxzLlVUSUxfRlVOQ1RJT05TID0gdGhpcy5fZnVuY3Rpb25zU3RyO1xuICB9XG59XG4iXX0=