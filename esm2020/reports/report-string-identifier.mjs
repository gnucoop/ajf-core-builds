import { Pipe } from '@angular/core';
import { buildReportStringIdentifier } from './utils/reports/build-report-string-identifier';
import * as i0 from "@angular/core";
export class AjfReportStringIdentifierPipe {
    transform(report, context, opts) {
        return buildReportStringIdentifier(report, context, opts);
    }
}
AjfReportStringIdentifierPipe.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportStringIdentifierPipe, deps: [], target: i0.ɵɵFactoryTarget.Pipe });
AjfReportStringIdentifierPipe.ɵpipe = i0.ɵɵngDeclarePipe({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportStringIdentifierPipe, name: "ajfReportStringIdentifier" });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfReportStringIdentifierPipe, decorators: [{
            type: Pipe,
            args: [{ name: 'ajfReportStringIdentifier' }]
        }] });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LXN0cmluZy1pZGVudGlmaWVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9yZXBvcnQtc3RyaW5nLWlkZW50aWZpZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFBQyxJQUFJLEVBQWdCLE1BQU0sZUFBZSxDQUFDO0FBR2xELE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLGdEQUFnRCxDQUFDOztBQUczRixNQUFNLE9BQU8sNkJBQTZCO0lBQ3hDLFNBQVMsQ0FBQyxNQUFpQixFQUFFLE9BQW1CLEVBQUUsSUFBZ0M7UUFDaEYsT0FBTywyQkFBMkIsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO0lBQzVELENBQUM7O2tJQUhVLDZCQUE2QjtnSUFBN0IsNkJBQTZCO21HQUE3Qiw2QkFBNkI7a0JBRHpDLElBQUk7bUJBQUMsRUFBQyxJQUFJLEVBQUUsMkJBQTJCLEVBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgQnVpbGRTdHJpbmdJZGVudGlmaWVyT3B0c30gZnJvbSAnQGFqZi9jb3JlL2NvbW1vbic7XG5pbXBvcnQge1BpcGUsIFBpcGVUcmFuc2Zvcm19IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5pbXBvcnQge0FqZlJlcG9ydH0gZnJvbSAnLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuaW1wb3J0IHtidWlsZFJlcG9ydFN0cmluZ0lkZW50aWZpZXJ9IGZyb20gJy4vdXRpbHMvcmVwb3J0cy9idWlsZC1yZXBvcnQtc3RyaW5nLWlkZW50aWZpZXInO1xuXG5AUGlwZSh7bmFtZTogJ2FqZlJlcG9ydFN0cmluZ0lkZW50aWZpZXInfSlcbmV4cG9ydCBjbGFzcyBBamZSZXBvcnRTdHJpbmdJZGVudGlmaWVyUGlwZSBpbXBsZW1lbnRzIFBpcGVUcmFuc2Zvcm0ge1xuICB0cmFuc2Zvcm0ocmVwb3J0OiBBamZSZXBvcnQsIGNvbnRleHQ6IEFqZkNvbnRleHQsIG9wdHM/OiBCdWlsZFN0cmluZ0lkZW50aWZpZXJPcHRzKTogc3RyaW5nIHtcbiAgICByZXR1cm4gYnVpbGRSZXBvcnRTdHJpbmdJZGVudGlmaWVyKHJlcG9ydCwgY29udGV4dCwgb3B0cyk7XG4gIH1cbn1cbiJdfQ==