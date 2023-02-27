import { Pipe } from '@angular/core';
import { buildFormStringIdentifier } from './utils/forms/build-form-string-identifier';
import * as i0 from "@angular/core";
/**
 * it returns a form string identifier.
 *
 * @export
 * @class AjfFormStringIdentifierPipe
 */
export class AjfFormStringIdentifierPipe {
    transform(form, context, opts) {
        return buildFormStringIdentifier(form, context, opts);
    }
}
AjfFormStringIdentifierPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormStringIdentifierPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfFormStringIdentifierPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "14.0.0", version: "15.0.4", ngImport: i0, type: AjfFormStringIdentifierPipe, name: "ajfFormStringIdentifier" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormStringIdentifierPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfFormStringIdentifier' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS1zdHJpbmctaWRlbnRpZmllci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Zvcm0tc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBR2xELE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDRDQUE0QyxDQUFDOztBQUVyRjs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTywyQkFBMkI7SUFDdEMsU0FBUyxDQUFDLElBQWEsRUFBRSxPQUFtQixFQUFFLElBQWdDO1FBQzVFLE9BQU8seUJBQXlCLENBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztJQUN4RCxDQUFDOzt3SEFIVSwyQkFBMkI7c0hBQTNCLDJCQUEyQjsyRkFBM0IsMkJBQTJCO2tCQUR2QyxJQUFJO21CQUFDLEVBQUMsSUFBSSxFQUFFLHlCQUF5QixFQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIEJ1aWxkU3RyaW5nSWRlbnRpZmllck9wdHN9IGZyb20gJ0BhamYvY29yZS9jb21tb24nO1xuaW1wb3J0IHtQaXBlLCBQaXBlVHJhbnNmb3JtfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7YnVpbGRGb3JtU3RyaW5nSWRlbnRpZmllcn0gZnJvbSAnLi91dGlscy9mb3Jtcy9idWlsZC1mb3JtLXN0cmluZy1pZGVudGlmaWVyJztcblxuLyoqXG4gKiBpdCByZXR1cm5zIGEgZm9ybSBzdHJpbmcgaWRlbnRpZmllci5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmRm9ybVN0cmluZ0lkZW50aWZpZXJQaXBlXG4gKi9cbkBQaXBlKHtuYW1lOiAnYWpmRm9ybVN0cmluZ0lkZW50aWZpZXInfSlcbmV4cG9ydCBjbGFzcyBBamZGb3JtU3RyaW5nSWRlbnRpZmllclBpcGUgaW1wbGVtZW50cyBQaXBlVHJhbnNmb3JtIHtcbiAgdHJhbnNmb3JtKGZvcm06IEFqZkZvcm0sIGNvbnRleHQ6IEFqZkNvbnRleHQsIG9wdHM/OiBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYnVpbGRGb3JtU3RyaW5nSWRlbnRpZmllcihmb3JtLCBjb250ZXh0LCBvcHRzKTtcbiAgfVxufVxuIl19