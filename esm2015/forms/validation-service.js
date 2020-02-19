/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/validation-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
import { AjfExpressionUtils } from '@ajf/core/models';
import { Injectable } from '@angular/core';
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
    /**
     * @param {?} f
     * @return {?}
     */
    addFunction(f) {
        this._functions.push(f);
        this._initFunctions();
    }
    /**
     * @param {?} name
     * @param {?} fn
     * @return {?}
     */
    addFunctionHandler(name, fn) {
        if (AjfExpressionUtils.utils[name] === undefined) {
            AjfExpressionUtils.utils[name] = { fn };
        }
    }
    /**
     * @private
     * @return {?}
     */
    _initFunctions() {
        /** @type {?} */
        const functionsStr = this._functions
            .map((/**
         * @param {?} f
         * @return {?}
         */
        f => typeof f === 'string' ? f : f.toString()))
            .join('; ');
        this._functionsStr = `${this._baseUtilFunctions.join('; ')}; ${functionsStr}`;
        AjfExpressionUtils.UTIL_FUNCTIONS = this._functionsStr;
    }
}
AjfValidationService.decorators = [
    { type: Injectable }
];
/** @nocollapse */
AjfValidationService.ctorParameters = () => [];
if (false) {
    /**
     * @type {?}
     * @private
     */
    AjfValidationService.prototype._baseUtilFunctions;
    /**
     * @type {?}
     * @private
     */
    AjfValidationService.prototype._functions;
    /**
     * @type {?}
     * @private
     */
    AjfValidationService.prototype._functionsStr;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdmFsaWRhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHekMsTUFBTSxPQUFPLG9CQUFvQjtJQTZWL0I7UUE1VlEsdUJBQWtCLEdBQWE7WUFDckM7Ozs7O2lFQUs2RDtZQUM3RDs7Ozs7OztNQU9FO1lBQ0Y7Ozs7O3dEQUtvRDtZQUNwRDs7Ozs7OztNQU9FO1lBQ0Y7Ozs7OzRGQUt3RjtZQUN4Rjs7Ozs7TUFLRTtZQUNGOzs7OzswRkFLc0Y7WUFDdEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXFCSTtZQUNKOzs7Ozs7Ozs7Ozs7UUFZSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBbUJJO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtQkk7WUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBd0JFO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7UUFnQkk7WUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQTRCSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7UUFlSTtZQUNKOzs7Ozs7OztRQVFJO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBc0NJO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQTZDSTtZQUNKOzs7Ozs7Ozs7UUFTSTtZQUNKOzs7UUFHSTtZQUNKOzs7UUFHSTtZQUNKOzs7O1FBSUk7WUFDSjs7Ozs7Ozs7UUFRSTtZQUNKOzs7Ozs7O1FBT0k7U0FDTCxDQUFDO1FBRU0sZUFBVSxHQUEwQixFQUFFLENBQUM7UUFDdkMsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFHakMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLENBQW9CO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsRUFBTztRQUN0QyxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDaEQsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDOzs7OztJQUVPLGNBQWM7O2NBQ2QsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVO2FBQ2pDLEdBQUc7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUM7YUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksRUFBRSxDQUFDO1FBQzlFLGtCQUFrQixDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ3pELENBQUM7OztZQW5YRixVQUFVOzs7Ozs7Ozs7SUFFVCxrREF1VkU7Ozs7O0lBRUYsMENBQStDOzs7OztJQUMvQyw2Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZFeHByZXNzaW9uVXRpbHN9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIEFqZlZhbGlkYXRpb25TZXJ2aWNlIHtcbiAgcHJpdmF0ZSBfYmFzZVV0aWxGdW5jdGlvbnM6IHN0cmluZ1tdID0gW1xuICAgIGAvKipcbiAgICAgICAgKiBjb3VudCB0aGUgbnVtYmVyIG9mIGRpZ2l0IGNvbnRhaW5lZCBvbiB4LlxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgdmFsdWUgdXNlZCBmb3IgZGlnaXQgY291bnRcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBjb3VudCBvZiB0aGUgZGlnaXRcbiAgICAgICovXG4gICAgdmFyIGRpZ2l0Q291bnQgPSBmdW5jdGlvbih4KSB7IHJldHVybiB4LnRvU3RyaW5nKCkubGVuZ3RoOyB9YCxcbiAgICBgLyoqXG4gICAgICAgICogY291bnQgdGhlIG51bWJlciBvZiBkZWNpbWFsIGNvbnRhaW5lZCBvbiB4LlxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgdmFsdWUgdXNlZCBmb3IgZGVjaW1hbCBjb3VudFxuICAgICAgICAqIEByZXR1cm4gdGhlIGNvdW50IG9mIHRoZSBkZWNpbWFsXG4gICAgICAqL1xuICAgIHZhciBkZWNpbWFsQ291bnQgPSBmdW5jdGlvbih4KSB7XG4gICAgICByZXR1cm4gKHBhcnNlRmxvYXQoeCkudG9TdHJpbmcoKS5zcGxpdCgnLicpWzFdIHx8IFtdKS5sZW5ndGg7XG4gICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGNoZWNrIGlmIHggaXMgaW50ZWdlclxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgdmFsdWUgdXNlZCBmb3IgY2hlY2tcbiAgICAgICAgKiBAcmV0dXJuIHRydWUgaWYgeCBpcyBhIG51bWJlclxuICAgICAgKi9cbiAgICB2YXIgaXNJbnQgPSBmdW5jdGlvbih4KSB7IHJldHVybiAhL1ssLl0vLnRlc3QoeCk7IH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjaGVjayBpZiB4IGlzIG5vdCBlbXBpdHlcbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIHZhbHVlIHVzZWQgZm9yIGNoZWNrXG4gICAgICAgICogQHJldHVybiB0cnVlIGlmIHggZGVmaW5lZCBhbmQgbm90IG51bGwgYW5kIHRoZSBudW1iZXIgb2YgZGlnaXQgaXMgPiAwXG4gICAgICAqL1xuICAgIHZhciBub3RFbXB0eSA9IGZ1bmN0aW9uICh4KSB7XG4gICAgICByZXR1cm4gKHR5cGVvZiB4ICE9PSAndW5kZWZpbmVkJyAmJiB4ICE9PSBudWxsID8geC50b1N0cmluZygpLmxlbmd0aCA+IDAgOiBmYWxzZSk7XG4gICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGNoZWNrIGlmIHggaXMgY29udGFpbmVkIG9uIGFycmF5XG4gICAgICAgICogQHBhcmFtICB4IHRoZSB2YWx1ZSB1c2VkIGZvciBjaGVja1xuICAgICAgICAqIEByZXR1cm4gdGhlIHBvc2l0aW9uIG9mIHggb24gYXJyYXkgb3IgaWYgYXJyYXkgPT09IHhcbiAgICAgICovXG4gICAgdmFyIHZhbHVlSW5DaG9pY2UgPSBmdW5jdGlvbihhcnJheSwgeCkgeyByZXR1cm4gYXJyYXkuaW5kZXhPZih4KSA+IC0xIHx8IGFycmF5ID09PSB4OyB9YCxcbiAgICBgdmFyIHNjYW5Hcm91cEZpZWxkID0gZnVuY3Rpb24ocmVwcywgYWNjLCBjYWxsYmFjaykge1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJlcHM7IGkrKykge1xuICAgICAgICAgICAgYWNjID0gY2FsbGJhY2soYWNjLCBpKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gYWNjO1xuICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBzdW0gdGhlIHZhbHVlIGNvbnRhaW5lZCBvbiBhcnJheVxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgYXJyYXlcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBzdW1cbiAgICAgICovXG4gICAgdmFyIHN1bSA9IGZ1bmN0aW9uKGFycmF5KSB7cmV0dXJuIGFycmF5LnJlZHVjZShmdW5jdGlvbihhLCBiKXsgcmV0dXJuIGEgKyBiOyB9LCAwKTsgfWAsXG4gICAgYHZhciBkYXRlT3BlcmF0aW9ucyA9IGZ1bmN0aW9uKGRTdHJpbmcsIHBlcmlvZCwgb3BlcmF0aW9uLCB2KSB7XG4gICAgICAgIGZtdCA9ICdtbS9kZC95eXl5JztcbiAgICAgICAgdmFyIGQgPSAodHlwZW9mIGRTdHJpbmcgIT09ICd1bmRlZmluZWQnKSA/IGRhdGVVdGlscy5wYXJzZShkU3RyaW5nKSA6IG5ldyBEYXRlKCk7XG4gICAgICAgIGlmIChvcGVyYXRpb24gPT0gJ3JlbW92ZScpIHtcbiAgICAgICAgICB2ID0gLXY7XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGRhdGVPcDtcbiAgICAgICAgc3dpdGNoIChwZXJpb2QpIHtcbiAgICAgICAgICBjYXNlICdkYXknOlxuICAgICAgICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZERheXM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlICdtb250aCc6XG4gICAgICAgICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkTW9udGhzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAneWVhcic6XG4gICAgICAgICAgICBkYXRlT3AgPSBkYXRlVXRpbHMuYWRkWWVhcnM7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgcmV0dXJuIC0xO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBkYXRlVXRpbHMuZm9ybWF0KGRhdGVPcChkLCB2KSwgZm10KTtcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiByb3VuZCB0aGUgbnVtXG4gICAgICAgICogQHBhcmFtICBudW0gdGhlIHZhbHVlIHRvIHJvdW5kXG4gICAgICAgICogQHBhcmFtICBkaWdpdHMgaG93IG1hbnkgZGlnaXRcbiAgICAgICAgKiBAcmV0dXJuIG51bSByb3VuZGVkXG4gICAgICAqL1xuICAgICAgdmFyIHJvdW5kID0gZnVuY3Rpb24obnVtLCBkaWdpdHMpIHtcbiAgICAgICAgZGlnaXRzID0gZGlnaXRzIHx8IDA7XG4gICAgICAgIHZhciBmID0gMDtcbiAgICAgICAgdHJ5IHsgZiA9IHBhcnNlRmxvYXQobnVtKTsgfSBjYXRjaCAoZSkgeyB9XG4gICAgICAgIHZhciBtID0gTWF0aC5wb3coMTAsIGRpZ2l0cyk7XG4gICAgICAgIHJldHVybiBNYXRoLnJvdW5kKGYgKiBtKSAvIG07XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogZXh0cmFjdCB0aGUgcHJvcGVydHkgb2YgdGhlIHNvdXJjZSBvYmplY3Qgd2l0aCBwcm9wZXJ0eSAhPSBudWxsXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSBvbiB3aWNoIHdlIHdhbnQgZmlsdGVyXG4gICAgICAgICogQHJldHVybiBhcnJheSBvZiBkYXRlc1xuICAgICAgKi9cbiAgICAgIHZhciBleHRyYWN0QXJyYXkgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5LCBwcm9wZXJ0eTIpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGwgOyBpKyspIHtcbiAgICAgICAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsICYmIHNvdXJjZVtpXVtwcm9wZXJ0eTJdICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKHNvdXJjZVtpXVtwcm9wZXJ0eV0gKyBzb3VyY2VbaV1bcHJvcGVydHkyXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsc2UgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzLnB1c2goc291cmNlW2ldW3Byb3BlcnR5XSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogZXh0cmFjdCB0aGUgcHJvcGVydHkgb2YgdGhlIHNvdXJjZSBvYmplY3Qgd2l0aCBwcm9wZXJ0eSAhPSBudWxsXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR1ZXMgc3RyaW5nIGFycmF5IHRoZSBwcm9wZXJ0aWVzIHRvIHN1bVxuICAgICAgICAqIEByZXR1cm4gdGhlIHN1bVxuICAgICAgKi9cbiAgICAgIHZhciBleHRyYWN0U3VtID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICBwcm9wZXJ0aWVzID0gKHByb3BlcnRpZXMgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHByb3BlcnRpZXMubGVuZ3RoO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbCA7IGkrKykge1xuICAgICAgICAgIHZhciBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgICAgICAgIHZhciBsZW5nID0gYXJyYXkubGVuZ3RoO1xuICAgICAgICAgIGZvcih2YXIgaiA9IDA7IGogPCBsZW5nOyBpKyspIHtcbiAgICAgICAgICAgIHN1bSArPSBhcnJheVtqXTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICAgIH1gLFxuICAgICAgYC8qKlxuICAgICAgICAqIGV4dHJhY3QgdGhlIGFycmF5IG9mIHN1bSBmb3IgZWFjaCB3ZWVrICE9IG51bGxcbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eVxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHVlcyBzdHJpbmcgYXJyYXkgdGhlIHByb3BlcnRpZXMgdG8gc3VtXG4gICAgICAgICogQHJldHVybiB0aGUgc3VtXG4gICAgICAqL1xuICAgICAgdmFyIGV4dHJhY3RBcnJheVN1bSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydGllcykge1xuICAgICAgICB2YXIgYXJyYXlzID0gW107XG4gICAgICAgIHByb3BlcnRpZXMgPSAocHJvcGVydGllcyB8fCBbXSkuc2xpY2UoMCk7XG5cbiAgICAgICAgZm9yICh2YXIgcHJvcEkgPSAwOyBwcm9wSSA8IHByb3BlcnRpZXMubGVuZ3RoIDsgcHJvcEkrKykge1xuICAgICAgICAgIHZhciBhcnJheSA9IGV4dHJhY3RBcnJheShzb3VyY2UsIHByb3BlcnRpZXNbcHJvcEldKTtcbiAgICAgICAgICBhcnJheXMucHVzaChhcnJheSk7XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIGZvciAodmFyIHdlZWtJID0gMDsgd2Vla0kgPCBhcnJheS5sZW5ndGg7IHdlZWtJICsrICkge1xuICAgICAgICAgIHZhciBzdW0gPSAwO1xuICAgICAgICAgIGZvciAodmFyIHByb3BJID0gMDsgcHJvcEkgPCBwcm9wZXJ0aWVzLmxlbmd0aCA7IHByb3BJKyspIHtcbiAgICAgICAgICAgIHN1bSA9IHN1bSArIGFycmF5c1twcm9wSV1bd2Vla0ldXG4gICAgICAgICAgfVxuICAgICAgICAgIHJlcy5wdXNoKHN1bSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBkcmF3IGEgdGhyZXNob2xkIGxpbmUgb24gY2hhcnQgcmVsYXRlZCB0byB0aGUgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eVxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHkgdGhlIHByb3BlcnR5IG9uIHdpY2ggd2Ugd2FudCBmaWx0ZXJcbiAgICAgICAgKiBAcmV0dXJuIGFycmF5IG9mIGRhdGVzXG4gICAgICAqL1xuICAgICAgdmFyIGRyYXdUaHJlc2hvbGQgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5LCB0aHJlc2hvbGQpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGwgOyBpKyspIHtcbiAgICAgICAgICBpZiAoc291cmNlW2ldW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXMucHVzaCh0aHJlc2hvbGQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGV4dHJhY3QgdGhlIGRhdGVzIG9mIHRoZSBzb3VyY2Ugb2JqZWN0IHdpdGggcHJvcGVydHkgIT0gbnVsbFxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5IGFuZCBkYXRlX3N0YXJ0XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgb24gd2ljaCB3ZSB3YW50IHRvIGNhbGN1bGF0ZSBkYXRlc1xuICAgICAgICAqIEBwYXJhbSAgZm9ybWF0IHRoZSBmb3JtYXQgb2YgdGhlIGRhdGVcbiAgICAgICAgKiBAcmV0dXJuIGFycmF5IG9mIGRhdGVzXG4gICAgICAqL1xuICAgICAgdmFyIGV4dHJhY3REYXRlcyA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHksIGZvcm1hdCkge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIGwgPSBzb3VyY2UubGVuZ3RoO1xuICAgICAgICB2YXIgcmVzID0gW107XG4gICAgICAgIHZhciBwcmVmaXggPSAnJztcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsIDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgc3dpdGNoKGZvcm1hdCkge1xuICAgICAgICAgICAgICBjYXNlIFwiV1dcIjpcbiAgICAgICAgICAgICAgICBwcmVmaXggPSBcIldcIjtcbiAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgY2FzZSBcIm1tXCI6XG4gICAgICAgICAgICAgICAgcHJlZml4ID0gXCJNXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgcHJlZml4ID0gXCJcIjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlcy5wdXNoKHByZWZpeCArIGZvcm1hdERhdGUoc291cmNlW2ldW1wiZGF0ZV9zdGFydFwiXSwgZm9ybWF0KSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogZXh0cmFjdCB0aGUgbGFzdCBwcm9wZXJ0eSBjb250YWlucyBpbiBzb3VyY2UgIT0gbnVsbFxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5IGFuZCBkYXRlX3N0YXJ0XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgdG8gZmluZFxuICAgICAgICAqIEByZXR1cm4gdGhlIGxhc3QgcHJvcGVydHkgIT0gbnVsbFxuICAgICAgKi9cbiAgICAgIHZhciBsYXN0UHJvcGVydHkgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5KSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGggLTE7XG5cbiAgICAgICAgd2hpbGUgKGwgPj0gMCAmJiBzb3VyY2VbbF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICAgICAgICBsLS07XG4gICAgICAgICAgaWYgKGwgPCAwKSByZXR1cm4gMDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gbCA+PSAwID8gc291cmNlW2xdW3Byb3BlcnR5XSA6IDA7XG4gICAgICB9YCxcbiAgICBgdmFyIHN1bUxhc3RQcm9wZXJ0aWVzID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0aWVzKSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgc3VtICs9IGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnRpZXNbaV0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHN1bTtcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjb21wdXRlIHRoZSB0cmVuZCBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSBvbiB3aWNoIHdlIHdhbnQgdG8gY2FsY3VsYXRlIHRoZSB0cmVuZFxuICAgICAgICAqIEByZXR1cm4gYW4gaHRtbCBpY29uIHRoYXQgaWRlbnRpZmllcyB0aGUgdHJlbmRcbiAgICAgICovXG4gICAgICB2YXIgY2FsY3VsYXRlVHJlbmRQcm9wZXJ0eSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHkpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsYXN0ID0gc291cmNlLmxlbmd0aCAtIDE7XG4gICAgICAgIHdoaWxlIChzb3VyY2VbbGFzdF1bcHJvcGVydHldID09IG51bGwpIHtcbiAgICAgICAgICBpZiAobGFzdCA9PSAwKSB7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG4gICAgICAgICAgbGFzdC0tO1xuICAgICAgICB9XG4gICAgICAgIHZhciBsYXN0TGFzdCA9IGxhc3QgLSAxO1xuICAgICAgICBpZiAobGFzdCA9PSAwKSB7XG4gICAgICAgICAgbGFzdExhc3QgPSBsYXN0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHdoaWxlIChzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICAgICAgICBpZiAobGFzdExhc3QgPT0gMCkge1xuICAgICAgICAgICAgICBsYXN0TGFzdCA9IGxhc3Q7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGFzdExhc3QtLTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgbGFzdFByb3BlcnR5ID0gc291cmNlW2xhc3RdPyhzb3VyY2VbbGFzdF1bcHJvcGVydHldIHx8IDApOiAwO1xuICAgICAgICB2YXIgbGFzdExhc3RQcm9wZXJ0eSA9IHNvdXJjZVtsYXN0TGFzdF0/KHNvdXJjZVtsYXN0TGFzdF1bcHJvcGVydHldIHx8IDApOiAwO1xuXG4gICAgICAgIGlmIChsYXN0UHJvcGVydHkgPT0gbGFzdExhc3RQcm9wZXJ0eSkge1xuICAgICAgICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Ymx1ZVwiPnRyZW5kaW5nX2ZsYXQ8L2k+PC9wPic7XG4gICAgICAgIH0gZWxzZSBpZiAobGFzdFByb3BlcnR5ID4gbGFzdExhc3RQcm9wZXJ0eSkge1xuICAgICAgICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6Z3JlZW5cIj50cmVuZGluZ191cDwvaT48L3A+JztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOnJlZFwiPnRyZW5kaW5nX2Rvd248L2k+PC9wPic7XG4gICAgICAgIH1cbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjb21wdXRlIHRoZSBhdmVyYWdlIHZhbHVlIG9mIHRoZSBwcm9wZXJ0eSBjb250YWluZWQgb24gdGhlIHNvdXJjZS5cbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eVxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHkgdGhlIHByb3BlcnR5IG9uIHdpY2ggd2Ugd2FudCB0byBjYWxjdWxhdGUgdGhlIGF2ZXJhZ2VcbiAgICAgICAgKiBAcGFyYW0gIHJhbmdlIHRoZSByYW5nZSBvbiB3aWNoIHdlIHdhbnQgdG8gY2FsY3VsYXRlIHRoZSBhdmVyYWdlXG4gICAgICAgICogQHBhcmFtICBjb2VmZmljZW50IHRoZSBjb2VmZmljZW50IHVzZWQgZm9yIGNhbGN1bGF0ZSB0aGUgdGhyZXNob2xkXG4gICAgICAgICAgICAgICAgICBpZiBjb2VmZmljZW50IGlzIDAgbWVhbiByZXR1cm4gdGhlIGNvdW50IG9mIHByb3BlcnR5ID4gMFxuICAgICAgICAqIEByZXR1cm4gdGhlIGF2ZXJhZ2UgdmFsdWUgfHwgdGhlIGNvdW50IG9mIHByb3BlcnR5ID4gMFxuICAgICAgKi9cbiAgICAgIHZhciBjYWxjdWxhdGVBdmdQcm9wZXJ0eSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHksIHJhbmdlLCBjb2VmZmljaWVudCkge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcblxuICAgICAgICBzb3VyY2UucG9wKCk7XG5cbiAgICAgICAgY29lZmZpY2llbnQgPSBjb2VmZmljaWVudCB8fCAxO1xuICAgICAgICByYW5nZSA9IHJhbmdlIHx8IDEyO1xuXG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlcyA9IDA7XG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcbiAgICAgICAgdmFyIG5vWmVybyA9IDA7XG5cbiAgICAgICAgaWYobCA8IHJhbmdlKSB7XG4gICAgICAgICAgcmFuZ2UgPSBsO1xuICAgICAgICB9XG5cbiAgICAgICAgd2hpbGUgKHJhbmdlICE9IDApIHtcbiAgICAgICAgICBjb3VudGVyKys7XG4gICAgICAgICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJlcyArPSBzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XTtcblxuICAgICAgICAgICAgaWYgKHNvdXJjZVtsIC0gMV1bcHJvcGVydHldID4gMCkge1xuICAgICAgICAgICAgICBub1plcm8rKztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgbC0tO1xuICAgICAgICAgIHJhbmdlLS07XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoY29lZmZpY2llbnQgPT0gMCkge1xuICAgICAgICAgIHJldHVybiBub1plcm87XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdmFyIHRocmVzaG9sZCA9IChyZXMvY291bnRlcikqY29lZmZpY2llbnQgfHwgMDtcbiAgICAgICAgICByZXR1cm4gdGhyZXNob2xkO1xuICAgICAgICB9XG4gICAgICB9YCxcbiAgICBgdmFyIGFsZXJ0ID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSwgdGhyZXNob2xkLCBmbXQpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aDtcblxuICAgICAgICBpZiAoIGxhc3RQcm9wZXJ0eShzb3VyY2UsIHByb3BlcnR5KSAgPiB0aHJlc2hvbGQgKSB7XG4gICAgICAgICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj53YXJuaW5nPC9pPjwvcD4nO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXR1cm4gJzxwPjwvcD4nO1xuICAgICAgICAgIH1cbiAgICAgIH1gLFxuICAgIGB2YXIgZm9ybWF0TnVtYmVyID0gZnVuY3Rpb24obnVtLCBmbXQpIHtcbiAgICAgICAgZm10ID0gZm10IHx8ICcwLDBbLl0wJztcbiAgICAgICAgcmV0dXJuIG51bWVyYWwobnVtKS5mb3JtYXQoZm10KTtcbiAgICAgIH1gLFxuICAgIGB2YXIgZm9ybWF0RGF0ZSA9IGZ1bmN0aW9uKGRhdGUsIGZtdCkge1xuICAgICAgICBmbXQgPSBmbXQgfHwgJ21tLWRkLXl5eXknO1xuICAgICAgICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdChkYXRlLCBmbXQpO1xuICAgICAgfWAsXG4gICAgYHZhciBpc29Nb250aCA9IGZ1bmN0aW9uKGRhdGUsIGZtdCkge1xuICAgICAgICBmbXQgPSBmbXQgfHwgJ21tJztcbiAgICAgICAgdmFyIGR1ID0gZGF0ZVV0aWxzO1xuICAgICAgICByZXR1cm4gZHUuZm9ybWF0KGR1LmFkZERheXMoZHUuc3RhcnRPZk1vbnRoKGRhdGUpLCA0KSxmbXQpXG4gICAgICB9YCxcbiAgICBgdmFyIG5leHRDb3VudGVyVmFsdWUgPSBmdW5jdGlvbihjb3VudGVyTmFtZSwgZmlyc3RWYWx1ZSkge1xuICAgICAgICBmaXJzdFZhbHVlID0gZmlyc3RWYWx1ZSAhPSBudWxsID8gZmlyc3RWYWx1ZSA6IDA7XG4gICAgICAgIGlmIChleGVjQ29udGV4dFsnJCQnK2NvdW50ZXJOYW1lXSA9PSBudWxsKSB7XG4gICAgICAgICAgZXhlY0NvbnRleHRbJyQkJytjb3VudGVyTmFtZV0gPSBmaXJzdFZhbHVlO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV4ZWNDb250ZXh0WyckJCcrY291bnRlck5hbWVdKys7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGV4ZWNDb250ZXh0WyckJCcrY291bnRlck5hbWVdO1xuICAgICAgfWAsXG4gICAgYHZhciBnZXRDb29yZGluYXRlID0gZnVuY3Rpb24oc291cmNlLCB6b29tKSB7XG4gICAgICAgIHpvb20gPSB6b29tIHx8IDY7XG4gICAgICAgIGlmKHNvdXJjZSA9PSBudWxsKSB7XG4gICAgICAgICAgcmV0dXJuIFs1MS41MDUsLTAuMDksIHpvb21dO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBbc291cmNlWzBdLCBzb3VyY2VbMV0sIHpvb21dO1xuICAgICAgICB9XG4gICAgICB9YFxuICBdO1xuXG4gIHByaXZhdGUgX2Z1bmN0aW9uczogKEZ1bmN0aW9uIHwgc3RyaW5nKVtdID0gW107XG4gIHByaXZhdGUgX2Z1bmN0aW9uc1N0cjogc3RyaW5nID0gJyc7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5faW5pdEZ1bmN0aW9ucygpO1xuICB9XG5cbiAgYWRkRnVuY3Rpb24oZjogRnVuY3Rpb24gfCBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLl9mdW5jdGlvbnMucHVzaChmKTtcbiAgICB0aGlzLl9pbml0RnVuY3Rpb25zKCk7XG4gIH1cblxuICBhZGRGdW5jdGlvbkhhbmRsZXIobmFtZTogc3RyaW5nLCBmbjogYW55KTogdm9pZCB7XG4gICAgaWYgKEFqZkV4cHJlc3Npb25VdGlscy51dGlsc1tuYW1lXSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBBamZFeHByZXNzaW9uVXRpbHMudXRpbHNbbmFtZV0gPSB7Zm59O1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgX2luaXRGdW5jdGlvbnMoKTogdm9pZCB7XG4gICAgY29uc3QgZnVuY3Rpb25zU3RyID0gdGhpcy5fZnVuY3Rpb25zXG4gICAgICAubWFwKGYgPT4gdHlwZW9mIGYgPT09ICdzdHJpbmcnID8gZiA6IGYudG9TdHJpbmcoKSlcbiAgICAgIC5qb2luKCc7ICcpO1xuICAgIHRoaXMuX2Z1bmN0aW9uc1N0ciA9IGAke3RoaXMuX2Jhc2VVdGlsRnVuY3Rpb25zLmpvaW4oJzsgJyl9OyAke2Z1bmN0aW9uc1N0cn1gO1xuICAgIEFqZkV4cHJlc3Npb25VdGlscy5VVElMX0ZVTkNUSU9OUyA9IHRoaXMuX2Z1bmN0aW9uc1N0cjtcbiAgfVxufVxuIl19