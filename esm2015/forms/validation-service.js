/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/validation-service.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWRhdGlvbi1zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdmFsaWRhdGlvbi1zZXJ2aWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLE9BQU8sRUFBQyxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQ3BELE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHekMsTUFBTSxPQUFPLG9CQUFvQjtJQTZWL0I7UUE1VlEsdUJBQWtCLEdBQWE7WUFDckM7Ozs7O2lFQUs2RDtZQUM3RDs7Ozs7OztNQU9FO1lBQ0Y7Ozs7O3dEQUtvRDtZQUNwRDs7Ozs7OztNQU9FO1lBQ0Y7Ozs7OzRGQUt3RjtZQUN4Rjs7Ozs7TUFLRTtZQUNGOzs7OzswRkFLc0Y7WUFDdEY7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQXFCSTtZQUNKOzs7Ozs7Ozs7Ozs7UUFZSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBbUJJO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7UUFtQkk7WUFDRjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBd0JFO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7UUFnQkk7WUFDSjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQTRCSTtZQUNKOzs7Ozs7Ozs7Ozs7Ozs7UUFlSTtZQUNKOzs7Ozs7OztRQVFJO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1FBc0NJO1lBQ0o7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztRQTZDSTtZQUNKOzs7Ozs7Ozs7UUFTSTtZQUNKOzs7UUFHSTtZQUNKOzs7UUFHSTtZQUNKOzs7O1FBSUk7WUFDSjs7Ozs7Ozs7UUFRSTtZQUNKOzs7Ozs7O1FBT0k7U0FDTCxDQUFDO1FBRU0sZUFBVSxHQUEwQixFQUFFLENBQUM7UUFDdkMsa0JBQWEsR0FBVyxFQUFFLENBQUM7UUFHakMsSUFBSSxDQUFDLGNBQWMsRUFBRSxDQUFDO0lBQ3hCLENBQUM7Ozs7O0lBRUQsV0FBVyxDQUFDLENBQW9CO1FBQzlCLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QixDQUFDOzs7Ozs7SUFFRCxrQkFBa0IsQ0FBQyxJQUFZLEVBQUUsRUFBTztRQUN0QyxJQUFJLGtCQUFrQixDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLEVBQUU7WUFDaEQsa0JBQWtCLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUMsRUFBRSxFQUFDLENBQUM7U0FDdkM7SUFDSCxDQUFDOzs7OztJQUVPLGNBQWM7O2NBQ2QsWUFBWSxHQUFHLElBQUksQ0FBQyxVQUFVO2FBQ2pDLEdBQUc7Ozs7UUFBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUM7YUFDbEQsSUFBSSxDQUFDLElBQUksQ0FBQztRQUNiLElBQUksQ0FBQyxhQUFhLEdBQUcsR0FBRyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFlBQVksRUFBRSxDQUFDO1FBQzlFLGtCQUFrQixDQUFDLGNBQWMsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQ3pELENBQUM7OztZQW5YRixVQUFVOzs7Ozs7Ozs7SUFFVCxrREF1VkU7Ozs7O0lBRUYsMENBQStDOzs7OztJQUMvQyw2Q0FBbUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRXhwcmVzc2lvblV0aWxzfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBBamZWYWxpZGF0aW9uU2VydmljZSB7XG4gIHByaXZhdGUgX2Jhc2VVdGlsRnVuY3Rpb25zOiBzdHJpbmdbXSA9IFtcbiAgICBgLyoqXG4gICAgICAgICogY291bnQgdGhlIG51bWJlciBvZiBkaWdpdCBjb250YWluZWQgb24geC5cbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIHZhbHVlIHVzZWQgZm9yIGRpZ2l0IGNvdW50XG4gICAgICAgICogQHJldHVybiB0aGUgY291bnQgb2YgdGhlIGRpZ2l0XG4gICAgICAqL1xuICAgIHZhciBkaWdpdENvdW50ID0gZnVuY3Rpb24oeCkgeyByZXR1cm4geC50b1N0cmluZygpLmxlbmd0aDsgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGNvdW50IHRoZSBudW1iZXIgb2YgZGVjaW1hbCBjb250YWluZWQgb24geC5cbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIHZhbHVlIHVzZWQgZm9yIGRlY2ltYWwgY291bnRcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBjb3VudCBvZiB0aGUgZGVjaW1hbFxuICAgICAgKi9cbiAgICB2YXIgZGVjaW1hbENvdW50ID0gZnVuY3Rpb24oeCkge1xuICAgICAgcmV0dXJuIChwYXJzZUZsb2F0KHgpLnRvU3RyaW5nKCkuc3BsaXQoJy4nKVsxXSB8fCBbXSkubGVuZ3RoO1xuICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjaGVjayBpZiB4IGlzIGludGVnZXJcbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIHZhbHVlIHVzZWQgZm9yIGNoZWNrXG4gICAgICAgICogQHJldHVybiB0cnVlIGlmIHggaXMgYSBudW1iZXJcbiAgICAgICovXG4gICAgdmFyIGlzSW50ID0gZnVuY3Rpb24oeCkgeyByZXR1cm4gIS9bLC5dLy50ZXN0KHgpOyB9YCxcbiAgICBgLyoqXG4gICAgICAgICogY2hlY2sgaWYgeCBpcyBub3QgZW1waXR5XG4gICAgICAgICogQHBhcmFtICB4IHRoZSB2YWx1ZSB1c2VkIGZvciBjaGVja1xuICAgICAgICAqIEByZXR1cm4gdHJ1ZSBpZiB4IGRlZmluZWQgYW5kIG5vdCBudWxsIGFuZCB0aGUgbnVtYmVyIG9mIGRpZ2l0IGlzID4gMFxuICAgICAgKi9cbiAgICB2YXIgbm90RW1wdHkgPSBmdW5jdGlvbiAoeCkge1xuICAgICAgcmV0dXJuICh0eXBlb2YgeCAhPT0gJ3VuZGVmaW5lZCcgJiYgeCAhPT0gbnVsbCA/IHgudG9TdHJpbmcoKS5sZW5ndGggPiAwIDogZmFsc2UpO1xuICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBjaGVjayBpZiB4IGlzIGNvbnRhaW5lZCBvbiBhcnJheVxuICAgICAgICAqIEBwYXJhbSAgeCB0aGUgdmFsdWUgdXNlZCBmb3IgY2hlY2tcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBwb3NpdGlvbiBvZiB4IG9uIGFycmF5IG9yIGlmIGFycmF5ID09PSB4XG4gICAgICAqL1xuICAgIHZhciB2YWx1ZUluQ2hvaWNlID0gZnVuY3Rpb24oYXJyYXksIHgpIHsgcmV0dXJuIGFycmF5LmluZGV4T2YoeCkgPiAtMSB8fCBhcnJheSA9PT0geDsgfWAsXG4gICAgYHZhciBzY2FuR3JvdXBGaWVsZCA9IGZ1bmN0aW9uKHJlcHMsIGFjYywgY2FsbGJhY2spIHtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXBzOyBpKyspIHtcbiAgICAgICAgICAgIGFjYyA9IGNhbGxiYWNrKGFjYywgaSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGFjYztcbiAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogc3VtIHRoZSB2YWx1ZSBjb250YWluZWQgb24gYXJyYXlcbiAgICAgICAgKiBAcGFyYW0gIHggdGhlIGFycmF5XG4gICAgICAgICogQHJldHVybiB0aGUgc3VtXG4gICAgICAqL1xuICAgIHZhciBzdW0gPSBmdW5jdGlvbihhcnJheSkge3JldHVybiBhcnJheS5yZWR1Y2UoZnVuY3Rpb24oYSwgYil7IHJldHVybiBhICsgYjsgfSwgMCk7IH1gLFxuICAgIGB2YXIgZGF0ZU9wZXJhdGlvbnMgPSBmdW5jdGlvbihkU3RyaW5nLCBwZXJpb2QsIG9wZXJhdGlvbiwgdikge1xuICAgICAgICBmbXQgPSAnbW0vZGQveXl5eSc7XG4gICAgICAgIHZhciBkID0gKHR5cGVvZiBkU3RyaW5nICE9PSAndW5kZWZpbmVkJykgPyBkYXRlVXRpbHMucGFyc2UoZFN0cmluZykgOiBuZXcgRGF0ZSgpO1xuICAgICAgICBpZiAob3BlcmF0aW9uID09ICdyZW1vdmUnKSB7XG4gICAgICAgICAgdiA9IC12O1xuICAgICAgICB9XG4gICAgICAgIHZhciBkYXRlT3A7XG4gICAgICAgIHN3aXRjaCAocGVyaW9kKSB7XG4gICAgICAgICAgY2FzZSAnZGF5JzpcbiAgICAgICAgICAgIGRhdGVPcCA9IGRhdGVVdGlscy5hZGREYXlzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSAnbW9udGgnOlxuICAgICAgICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZE1vbnRocztcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgJ3llYXInOlxuICAgICAgICAgICAgZGF0ZU9wID0gZGF0ZVV0aWxzLmFkZFllYXJzO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGF0ZVV0aWxzLmZvcm1hdChkYXRlT3AoZCwgdiksIGZtdCk7XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogcm91bmQgdGhlIG51bVxuICAgICAgICAqIEBwYXJhbSAgbnVtIHRoZSB2YWx1ZSB0byByb3VuZFxuICAgICAgICAqIEBwYXJhbSAgZGlnaXRzIGhvdyBtYW55IGRpZ2l0XG4gICAgICAgICogQHJldHVybiBudW0gcm91bmRlZFxuICAgICAgKi9cbiAgICAgIHZhciByb3VuZCA9IGZ1bmN0aW9uKG51bSwgZGlnaXRzKSB7XG4gICAgICAgIGRpZ2l0cyA9IGRpZ2l0cyB8fCAwO1xuICAgICAgICB2YXIgZiA9IDA7XG4gICAgICAgIHRyeSB7IGYgPSBwYXJzZUZsb2F0KG51bSk7IH0gY2F0Y2ggKGUpIHsgfVxuICAgICAgICB2YXIgbSA9IE1hdGgucG93KDEwLCBkaWdpdHMpO1xuICAgICAgICByZXR1cm4gTWF0aC5yb3VuZChmICogbSkgLyBtO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGV4dHJhY3QgdGhlIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugb2JqZWN0IHdpdGggcHJvcGVydHkgIT0gbnVsbFxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgb24gd2ljaCB3ZSB3YW50IGZpbHRlclxuICAgICAgICAqIEByZXR1cm4gYXJyYXkgb2YgZGF0ZXNcbiAgICAgICovXG4gICAgICB2YXIgZXh0cmFjdEFycmF5ID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSwgcHJvcGVydHkyKSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsIDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCAmJiBzb3VyY2VbaV1bcHJvcGVydHkyXSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXMucHVzaChzb3VyY2VbaV1bcHJvcGVydHldICsgc291cmNlW2ldW3Byb3BlcnR5Ml0pO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbHNlIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgICAgICAgIHJlcy5wdXNoKHNvdXJjZVtpXVtwcm9wZXJ0eV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGV4dHJhY3QgdGhlIHByb3BlcnR5IG9mIHRoZSBzb3VyY2Ugb2JqZWN0IHdpdGggcHJvcGVydHkgIT0gbnVsbFxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0dWVzIHN0cmluZyBhcnJheSB0aGUgcHJvcGVydGllcyB0byBzdW1cbiAgICAgICAgKiBAcmV0dXJuIHRoZSBzdW1cbiAgICAgICovXG4gICAgICB2YXIgZXh0cmFjdFN1bSA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydGllcykge1xuICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgcHJvcGVydGllcyA9IChwcm9wZXJ0aWVzIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIGwgPSBwcm9wZXJ0aWVzLmxlbmd0aDtcblxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGwgOyBpKyspIHtcbiAgICAgICAgICB2YXIgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKTtcbiAgICAgICAgICB2YXIgbGVuZyA9IGFycmF5Lmxlbmd0aDtcbiAgICAgICAgICBmb3IodmFyIGogPSAwOyBqIDwgbGVuZzsgaSsrKSB7XG4gICAgICAgICAgICBzdW0gKz0gYXJyYXlbal07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBzdW07XG4gICAgICB9YCxcbiAgICAgIGAvKipcbiAgICAgICAgKiBleHRyYWN0IHRoZSBhcnJheSBvZiBzdW0gZm9yIGVhY2ggd2VlayAhPSBudWxsXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR1ZXMgc3RyaW5nIGFycmF5IHRoZSBwcm9wZXJ0aWVzIHRvIHN1bVxuICAgICAgICAqIEByZXR1cm4gdGhlIHN1bVxuICAgICAgKi9cbiAgICAgIHZhciBleHRyYWN0QXJyYXlTdW0gPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnRpZXMpIHtcbiAgICAgICAgdmFyIGFycmF5cyA9IFtdO1xuICAgICAgICBwcm9wZXJ0aWVzID0gKHByb3BlcnRpZXMgfHwgW10pLnNsaWNlKDApO1xuXG4gICAgICAgIGZvciAodmFyIHByb3BJID0gMDsgcHJvcEkgPCBwcm9wZXJ0aWVzLmxlbmd0aCA7IHByb3BJKyspIHtcbiAgICAgICAgICB2YXIgYXJyYXkgPSBleHRyYWN0QXJyYXkoc291cmNlLCBwcm9wZXJ0aWVzW3Byb3BJXSk7XG4gICAgICAgICAgYXJyYXlzLnB1c2goYXJyYXkpO1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICBmb3IgKHZhciB3ZWVrSSA9IDA7IHdlZWtJIDwgYXJyYXkubGVuZ3RoOyB3ZWVrSSArKyApIHtcbiAgICAgICAgICB2YXIgc3VtID0gMDtcbiAgICAgICAgICBmb3IgKHZhciBwcm9wSSA9IDA7IHByb3BJIDwgcHJvcGVydGllcy5sZW5ndGggOyBwcm9wSSsrKSB7XG4gICAgICAgICAgICBzdW0gPSBzdW0gKyBhcnJheXNbcHJvcEldW3dlZWtJXVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXMucHVzaChzdW0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiByZXM7XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogZHJhdyBhIHRocmVzaG9sZCBsaW5lIG9uIGNoYXJ0IHJlbGF0ZWQgdG8gdGhlIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSBvbiB3aWNoIHdlIHdhbnQgZmlsdGVyXG4gICAgICAgICogQHJldHVybiBhcnJheSBvZiBkYXRlc1xuICAgICAgKi9cbiAgICAgIHZhciBkcmF3VGhyZXNob2xkID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSwgdGhyZXNob2xkKSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHZhciByZXMgPSBbXTtcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsIDsgaSsrKSB7XG4gICAgICAgICAgaWYgKHNvdXJjZVtpXVtwcm9wZXJ0eV0gIT0gbnVsbCkge1xuICAgICAgICAgICAgcmVzLnB1c2godGhyZXNob2xkKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJlcztcbiAgICAgIH1gLFxuICAgIGAvKipcbiAgICAgICAgKiBleHRyYWN0IHRoZSBkYXRlcyBvZiB0aGUgc291cmNlIG9iamVjdCB3aXRoIHByb3BlcnR5ICE9IG51bGxcbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eSBhbmQgZGF0ZV9zdGFydFxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHkgdGhlIHByb3BlcnR5IG9uIHdpY2ggd2Ugd2FudCB0byBjYWxjdWxhdGUgZGF0ZXNcbiAgICAgICAgKiBAcGFyYW0gIGZvcm1hdCB0aGUgZm9ybWF0IG9mIHRoZSBkYXRlXG4gICAgICAgICogQHJldHVybiBhcnJheSBvZiBkYXRlc1xuICAgICAgKi9cbiAgICAgIHZhciBleHRyYWN0RGF0ZXMgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5LCBmb3JtYXQpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG4gICAgICAgIHZhciBsID0gc291cmNlLmxlbmd0aDtcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xuICAgICAgICB2YXIgcHJlZml4ID0gJyc7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbCA7IGkrKykge1xuICAgICAgICAgIGlmIChzb3VyY2VbaV1bcHJvcGVydHldICE9IG51bGwpIHtcbiAgICAgICAgICAgIHN3aXRjaChmb3JtYXQpIHtcbiAgICAgICAgICAgICAgY2FzZSBcIldXXCI6XG4gICAgICAgICAgICAgICAgcHJlZml4ID0gXCJXXCI7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgIGNhc2UgXCJtbVwiOlxuICAgICAgICAgICAgICAgIHByZWZpeCA9IFwiTVwiO1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgIHByZWZpeCA9IFwiXCI7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXMucHVzaChwcmVmaXggKyBmb3JtYXREYXRlKHNvdXJjZVtpXVtcImRhdGVfc3RhcnRcIl0sIGZvcm1hdCkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgfWAsXG4gICAgYC8qKlxuICAgICAgICAqIGV4dHJhY3QgdGhlIGxhc3QgcHJvcGVydHkgY29udGFpbnMgaW4gc291cmNlICE9IG51bGxcbiAgICAgICAgKiBAcGFyYW0gIHNvdXJjZSBhcnJheSBvZiBvYmplY3Qgd2ljaCBjb250YWlucyBwcm9wZXJ0eSBhbmQgZGF0ZV9zdGFydFxuICAgICAgICAqIEBwYXJhbSAgcHJvcGVydHkgdGhlIHByb3BlcnR5IHRvIGZpbmRcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBsYXN0IHByb3BlcnR5ICE9IG51bGxcbiAgICAgICovXG4gICAgICB2YXIgbGFzdFByb3BlcnR5ID0gZnVuY3Rpb24oc291cmNlLCBwcm9wZXJ0eSkge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIGwgPSBzb3VyY2UubGVuZ3RoIC0xO1xuXG4gICAgICAgIHdoaWxlIChsID49IDAgJiYgc291cmNlW2xdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICAgICAgbC0tO1xuICAgICAgICAgIGlmIChsIDwgMCkgcmV0dXJuIDA7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGwgPj0gMCA/IHNvdXJjZVtsXVtwcm9wZXJ0eV0gOiAwO1xuICAgICAgfWAsXG4gICAgYHZhciBzdW1MYXN0UHJvcGVydGllcyA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydGllcykge1xuICAgICAgICBzb3VyY2UgPSAoc291cmNlIHx8IFtdKS5zbGljZSgwKTtcbiAgICAgICAgdmFyIHN1bSA9IDA7XG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIHN1bSArPSBsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0aWVzW2ldKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBzdW07XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogY29tcHV0ZSB0aGUgdHJlbmQgb2YgdGhlIHByb3BlcnR5IGNvbnRhaW5lZCBvbiB0aGUgc291cmNlLlxuICAgICAgICAqIEBwYXJhbSAgc291cmNlIGFycmF5IG9mIG9iamVjdCB3aWNoIGNvbnRhaW5zIHByb3BlcnR5XG4gICAgICAgICogQHBhcmFtICBwcm9wZXJ0eSB0aGUgcHJvcGVydHkgb24gd2ljaCB3ZSB3YW50IHRvIGNhbGN1bGF0ZSB0aGUgdHJlbmRcbiAgICAgICAgKiBAcmV0dXJuIGFuIGh0bWwgaWNvbiB0aGF0IGlkZW50aWZpZXMgdGhlIHRyZW5kXG4gICAgICAqL1xuICAgICAgdmFyIGNhbGN1bGF0ZVRyZW5kUHJvcGVydHkgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5KSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbGFzdCA9IHNvdXJjZS5sZW5ndGggLSAxO1xuICAgICAgICB3aGlsZSAoc291cmNlW2xhc3RdW3Byb3BlcnR5XSA9PSBudWxsKSB7XG4gICAgICAgICAgaWYgKGxhc3QgPT0gMCkge1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgfVxuICAgICAgICAgIGxhc3QtLTtcbiAgICAgICAgfVxuICAgICAgICB2YXIgbGFzdExhc3QgPSBsYXN0IC0gMTtcbiAgICAgICAgaWYgKGxhc3QgPT0gMCkge1xuICAgICAgICAgIGxhc3RMYXN0ID0gbGFzdDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB3aGlsZSAoc291cmNlW2xhc3RMYXN0XVtwcm9wZXJ0eV0gPT0gbnVsbCkge1xuICAgICAgICAgICAgaWYgKGxhc3RMYXN0ID09IDApIHtcbiAgICAgICAgICAgICAgbGFzdExhc3QgPSBsYXN0O1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxhc3RMYXN0LS07XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgdmFyIGxhc3RQcm9wZXJ0eSA9IHNvdXJjZVtsYXN0XT8oc291cmNlW2xhc3RdW3Byb3BlcnR5XSB8fCAwKTogMDtcbiAgICAgICAgdmFyIGxhc3RMYXN0UHJvcGVydHkgPSBzb3VyY2VbbGFzdExhc3RdPyhzb3VyY2VbbGFzdExhc3RdW3Byb3BlcnR5XSB8fCAwKTogMDtcblxuICAgICAgICBpZiAobGFzdFByb3BlcnR5ID09IGxhc3RMYXN0UHJvcGVydHkpIHtcbiAgICAgICAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmJsdWVcIj50cmVuZGluZ19mbGF0PC9pPjwvcD4nO1xuICAgICAgICB9IGVsc2UgaWYgKGxhc3RQcm9wZXJ0eSA+IGxhc3RMYXN0UHJvcGVydHkpIHtcbiAgICAgICAgICByZXR1cm4gJzxwPjxpIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIiBzdHlsZT1cImNvbG9yOmdyZWVuXCI+dHJlbmRpbmdfdXA8L2k+PC9wPic7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICc8cD48aSBjbGFzcz1cIm1hdGVyaWFsLWljb25zXCIgc3R5bGU9XCJjb2xvcjpyZWRcIj50cmVuZGluZ19kb3duPC9pPjwvcD4nO1xuICAgICAgICB9XG4gICAgICB9YCxcbiAgICBgLyoqXG4gICAgICAgICogY29tcHV0ZSB0aGUgYXZlcmFnZSB2YWx1ZSBvZiB0aGUgcHJvcGVydHkgY29udGFpbmVkIG9uIHRoZSBzb3VyY2UuXG4gICAgICAgICogQHBhcmFtICBzb3VyY2UgYXJyYXkgb2Ygb2JqZWN0IHdpY2ggY29udGFpbnMgcHJvcGVydHlcbiAgICAgICAgKiBAcGFyYW0gIHByb3BlcnR5IHRoZSBwcm9wZXJ0eSBvbiB3aWNoIHdlIHdhbnQgdG8gY2FsY3VsYXRlIHRoZSBhdmVyYWdlXG4gICAgICAgICogQHBhcmFtICByYW5nZSB0aGUgcmFuZ2Ugb24gd2ljaCB3ZSB3YW50IHRvIGNhbGN1bGF0ZSB0aGUgYXZlcmFnZVxuICAgICAgICAqIEBwYXJhbSAgY29lZmZpY2VudCB0aGUgY29lZmZpY2VudCB1c2VkIGZvciBjYWxjdWxhdGUgdGhlIHRocmVzaG9sZFxuICAgICAgICAgICAgICAgICAgaWYgY29lZmZpY2VudCBpcyAwIG1lYW4gcmV0dXJuIHRoZSBjb3VudCBvZiBwcm9wZXJ0eSA+IDBcbiAgICAgICAgKiBAcmV0dXJuIHRoZSBhdmVyYWdlIHZhbHVlIHx8IHRoZSBjb3VudCBvZiBwcm9wZXJ0eSA+IDBcbiAgICAgICovXG4gICAgICB2YXIgY2FsY3VsYXRlQXZnUHJvcGVydHkgPSBmdW5jdGlvbihzb3VyY2UsIHByb3BlcnR5LCByYW5nZSwgY29lZmZpY2llbnQpIHtcbiAgICAgICAgc291cmNlID0gKHNvdXJjZSB8fCBbXSkuc2xpY2UoMCk7XG5cbiAgICAgICAgc291cmNlLnBvcCgpO1xuXG4gICAgICAgIGNvZWZmaWNpZW50ID0gY29lZmZpY2llbnQgfHwgMTtcbiAgICAgICAgcmFuZ2UgPSByYW5nZSB8fCAxMjtcblxuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGg7XG4gICAgICAgIHZhciByZXMgPSAwO1xuICAgICAgICB2YXIgY291bnRlciA9IDA7XG4gICAgICAgIHZhciBub1plcm8gPSAwO1xuXG4gICAgICAgIGlmKGwgPCByYW5nZSkge1xuICAgICAgICAgIHJhbmdlID0gbDtcbiAgICAgICAgfVxuXG4gICAgICAgIHdoaWxlIChyYW5nZSAhPSAwKSB7XG4gICAgICAgICAgY291bnRlcisrO1xuICAgICAgICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSAhPSBudWxsKSB7XG4gICAgICAgICAgICByZXMgKz0gc291cmNlW2wgLSAxXVtwcm9wZXJ0eV07XG5cbiAgICAgICAgICAgIGlmIChzb3VyY2VbbCAtIDFdW3Byb3BlcnR5XSA+IDApIHtcbiAgICAgICAgICAgICAgbm9aZXJvKys7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIGwtLTtcbiAgICAgICAgICByYW5nZS0tO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvZWZmaWNpZW50ID09IDApIHtcbiAgICAgICAgICByZXR1cm4gbm9aZXJvO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHZhciB0aHJlc2hvbGQgPSAocmVzL2NvdW50ZXIpKmNvZWZmaWNpZW50IHx8IDA7XG4gICAgICAgICAgcmV0dXJuIHRocmVzaG9sZDtcbiAgICAgICAgfVxuICAgICAgfWAsXG4gICAgYHZhciBhbGVydCA9IGZ1bmN0aW9uKHNvdXJjZSwgcHJvcGVydHksIHRocmVzaG9sZCwgZm10KSB7XG4gICAgICAgIHNvdXJjZSA9IChzb3VyY2UgfHwgW10pLnNsaWNlKDApO1xuICAgICAgICB2YXIgbCA9IHNvdXJjZS5sZW5ndGg7XG5cbiAgICAgICAgaWYgKCBsYXN0UHJvcGVydHkoc291cmNlLCBwcm9wZXJ0eSkgID4gdGhyZXNob2xkICkge1xuICAgICAgICAgIHJldHVybiAnPHA+PGkgY2xhc3M9XCJtYXRlcmlhbC1pY29uc1wiIHN0eWxlPVwiY29sb3I6cmVkXCI+d2FybmluZzwvaT48L3A+JztcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuICc8cD48L3A+JztcbiAgICAgICAgICB9XG4gICAgICB9YCxcbiAgICBgdmFyIGZvcm1hdE51bWJlciA9IGZ1bmN0aW9uKG51bSwgZm10KSB7XG4gICAgICAgIGZtdCA9IGZtdCB8fCAnMCwwWy5dMCc7XG4gICAgICAgIHJldHVybiBudW1lcmFsKG51bSkuZm9ybWF0KGZtdCk7XG4gICAgICB9YCxcbiAgICBgdmFyIGZvcm1hdERhdGUgPSBmdW5jdGlvbihkYXRlLCBmbXQpIHtcbiAgICAgICAgZm10ID0gZm10IHx8ICdtbS1kZC15eXl5JztcbiAgICAgICAgcmV0dXJuIGRhdGVVdGlscy5mb3JtYXQoZGF0ZSwgZm10KTtcbiAgICAgIH1gLFxuICAgIGB2YXIgaXNvTW9udGggPSBmdW5jdGlvbihkYXRlLCBmbXQpIHtcbiAgICAgICAgZm10ID0gZm10IHx8ICdtbSc7XG4gICAgICAgIHZhciBkdSA9IGRhdGVVdGlscztcbiAgICAgICAgcmV0dXJuIGR1LmZvcm1hdChkdS5hZGREYXlzKGR1LnN0YXJ0T2ZNb250aChkYXRlKSwgNCksZm10KVxuICAgICAgfWAsXG4gICAgYHZhciBuZXh0Q291bnRlclZhbHVlID0gZnVuY3Rpb24oY291bnRlck5hbWUsIGZpcnN0VmFsdWUpIHtcbiAgICAgICAgZmlyc3RWYWx1ZSA9IGZpcnN0VmFsdWUgIT0gbnVsbCA/IGZpcnN0VmFsdWUgOiAwO1xuICAgICAgICBpZiAoZXhlY0NvbnRleHRbJyQkJytjb3VudGVyTmFtZV0gPT0gbnVsbCkge1xuICAgICAgICAgIGV4ZWNDb250ZXh0WyckJCcrY291bnRlck5hbWVdID0gZmlyc3RWYWx1ZTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBleGVjQ29udGV4dFsnJCQnK2NvdW50ZXJOYW1lXSsrO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBleGVjQ29udGV4dFsnJCQnK2NvdW50ZXJOYW1lXTtcbiAgICAgIH1gLFxuICAgIGB2YXIgZ2V0Q29vcmRpbmF0ZSA9IGZ1bmN0aW9uKHNvdXJjZSwgem9vbSkge1xuICAgICAgICB6b29tID0gem9vbSB8fCA2O1xuICAgICAgICBpZihzb3VyY2UgPT0gbnVsbCkge1xuICAgICAgICAgIHJldHVybiBbNTEuNTA1LC0wLjA5LCB6b29tXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gW3NvdXJjZVswXSwgc291cmNlWzFdLCB6b29tXTtcbiAgICAgICAgfVxuICAgICAgfWBcbiAgXTtcblxuICBwcml2YXRlIF9mdW5jdGlvbnM6IChGdW5jdGlvbiB8IHN0cmluZylbXSA9IFtdO1xuICBwcml2YXRlIF9mdW5jdGlvbnNTdHI6IHN0cmluZyA9ICcnO1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuX2luaXRGdW5jdGlvbnMoKTtcbiAgfVxuXG4gIGFkZEZ1bmN0aW9uKGY6IEZ1bmN0aW9uIHwgc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5fZnVuY3Rpb25zLnB1c2goZik7XG4gICAgdGhpcy5faW5pdEZ1bmN0aW9ucygpO1xuICB9XG5cbiAgYWRkRnVuY3Rpb25IYW5kbGVyKG5hbWU6IHN0cmluZywgZm46IGFueSk6IHZvaWQge1xuICAgIGlmIChBamZFeHByZXNzaW9uVXRpbHMudXRpbHNbbmFtZV0gPT09IHVuZGVmaW5lZCkge1xuICAgICAgQWpmRXhwcmVzc2lvblV0aWxzLnV0aWxzW25hbWVdID0ge2ZufTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIF9pbml0RnVuY3Rpb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IGZ1bmN0aW9uc1N0ciA9IHRoaXMuX2Z1bmN0aW9uc1xuICAgICAgLm1hcChmID0+IHR5cGVvZiBmID09PSAnc3RyaW5nJyA/IGYgOiBmLnRvU3RyaW5nKCkpXG4gICAgICAuam9pbignOyAnKTtcbiAgICB0aGlzLl9mdW5jdGlvbnNTdHIgPSBgJHt0aGlzLl9iYXNlVXRpbEZ1bmN0aW9ucy5qb2luKCc7ICcpfTsgJHtmdW5jdGlvbnNTdHJ9YDtcbiAgICBBamZFeHByZXNzaW9uVXRpbHMuVVRJTF9GVU5DVElPTlMgPSB0aGlzLl9mdW5jdGlvbnNTdHI7XG4gIH1cbn1cbiJdfQ==