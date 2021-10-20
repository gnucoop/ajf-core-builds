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
import { Pipe } from '@angular/core';
import * as i0 from "@angular/core";
/**
 * It returns true if all validationResults are true.
 *
 */
export class AjfFieldIsValidPipe {
    transform(validationResults) {
        return validationResults != null && validationResults.filter(f => !f.result).length === 0;
    }
}
AjfFieldIsValidPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldIsValidPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfFieldIsValidPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldIsValidPipe, name: "ajfFieldIsValid" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfFieldIsValidPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfFieldIsValid' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmllbGQtaXMtdmFsaWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy9maWVsZC1pcy12YWxpZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQUMsSUFBSSxFQUFDLE1BQU0sZUFBZSxDQUFDOztBQUluQzs7O0dBR0c7QUFFSCxNQUFNLE9BQU8sbUJBQW1CO0lBQzlCLFNBQVMsQ0FBQyxpQkFBeUM7UUFDakQsT0FBTyxpQkFBaUIsSUFBSSxJQUFJLElBQUksaUJBQWlCLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQztJQUM1RixDQUFDOzt3SEFIVSxtQkFBbUI7c0hBQW5CLG1CQUFtQjttR0FBbkIsbUJBQW1CO2tCQUQvQixJQUFJO21CQUFDLEVBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1BpcGV9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZlZhbGlkYXRpb25SZXN1bHR9IGZyb20gJy4vaW50ZXJmYWNlL3ZhbGlkYXRpb24vdmFsaWRhdGlvbi1yZXN1bHRzJztcblxuLyoqXG4gKiBJdCByZXR1cm5zIHRydWUgaWYgYWxsIHZhbGlkYXRpb25SZXN1bHRzIGFyZSB0cnVlLlxuICpcbiAqL1xuQFBpcGUoe25hbWU6ICdhamZGaWVsZElzVmFsaWQnfSlcbmV4cG9ydCBjbGFzcyBBamZGaWVsZElzVmFsaWRQaXBlIHtcbiAgdHJhbnNmb3JtKHZhbGlkYXRpb25SZXN1bHRzPzogQWpmVmFsaWRhdGlvblJlc3VsdFtdKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHZhbGlkYXRpb25SZXN1bHRzICE9IG51bGwgJiYgdmFsaWRhdGlvblJlc3VsdHMuZmlsdGVyKGYgPT4gIWYucmVzdWx0KS5sZW5ndGggPT09IDA7XG4gIH1cbn1cbiJdfQ==