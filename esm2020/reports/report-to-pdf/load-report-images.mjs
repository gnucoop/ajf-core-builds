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
import { AjfWidgetType } from '../interface/widgets/widget-type';
import { AjfImageType } from '@ajf/core/image';
export function loadReportImages(report) {
    const promises = [];
    if (report.header != null) {
        promises.push(loadContainerImages(report.header));
    }
    if (report.content != null) {
        promises.push(loadContainerImages(report.content));
    }
    if (report.footer != null) {
        promises.push(loadContainerImages(report.footer));
    }
    return new Promise(resolve => {
        Promise.all(promises).then(maps => {
            let map = {};
            for (const m of maps) {
                map = { ...map, ...m };
            }
            resolve(map);
        });
    });
}
function loadContainerImages(container) {
    const promises = [];
    for (let widget of container.content) {
        promises.push(loadWidgetImages(widget));
    }
    return new Promise(resolve => {
        Promise.all(promises).then(maps => {
            let map = {};
            for (const m of maps) {
                map = { ...map, ...m };
            }
            resolve(map);
        });
    });
}
function loadWidgetImages(widget) {
    switch (widget.widgetType) {
        case AjfWidgetType.Layout:
        case AjfWidgetType.Column:
            return loadContainerImages(widget);
        case AjfWidgetType.Image:
            const image = widget;
            if (image.widget.imageType !== AjfImageType.Image) {
                break;
            }
            return new Promise(resolve => {
                const req = new XMLHttpRequest();
                req.onerror = () => resolve({}); // ignore 404's
                req.onload = () => {
                    const r = new FileReader();
                    r.onerror = () => resolve({});
                    r.onloadend = () => {
                        const result = r.result;
                        if (result.startsWith('data:image')) {
                            const map = {};
                            map[image.url] = result;
                            resolve(map);
                        }
                        else {
                            resolve({});
                        }
                    };
                    r.readAsDataURL(req.response);
                };
                req.open('GET', image.url);
                req.responseType = 'blob';
                req.send();
            });
    }
    return new Promise(resolve => resolve({}));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC1yZXBvcnQtaW1hZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9yZXBvcnQtdG8tcGRmL2xvYWQtcmVwb3J0LWltYWdlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFNSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFLL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBVTdDLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxNQUF5QjtJQUN4RCxNQUFNLFFBQVEsR0FBd0IsRUFBRSxDQUFDO0lBQ3pDLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7UUFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNuRDtJQUNELElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNwRDtJQUNELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7UUFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNuRDtJQUNELE9BQU8sSUFBSSxPQUFPLENBQVcsT0FBTyxDQUFDLEVBQUU7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxHQUFHLEdBQWEsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUNwQixHQUFHLEdBQUcsRUFBQyxHQUFHLEdBQUcs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QUN2RCxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkltYWdlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9pbWFnZS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBvcnRDb250YWluZXJJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMtaW5zdGFuY2VzL3JlcG9ydC1jb250YWluZXItaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBvcnRJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMtaW5zdGFuY2VzL3JlcG9ydC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldpZGdldEluc3RhbmNlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuaW1wb3J0IHtcbiAgQWpmV2lkZ2V0V2l0aENvbnRlbnRJbnN0YW5jZVxufSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXdpdGgtY29udGVudC1pbnN0YW5jZSc7XG5cbmltcG9ydCB7QWpmSW1hZ2VUeXBlfSBmcm9tICdAYWpmL2NvcmUvaW1hZ2UnO1xuXG4vLyBJbWFnZU1hcCBtYXBzIGltYWdlIHVybHMgdG8gZGF0YXVybHMsIGxpa2U6XG4vLyAnaHR0cDovL3doYXRldmVyLmNvbS9pbWFnZS5wbmcnOiAnZGF0YTppbWFnZS9wbmc7YmFzZTY0LC4uLidcbi8vIEl0IGNhbiBhbHNvIGJlIHVzZWQgZm9yIGljb25zLCBsaWtlOlxuLy8gJzxzcGFuIGNsYXNzPVwibWF0ZXJpYWwtaWNvbnNcIj5yYWRpb19idXR0b25fY2hlY2tlZDwvc3Bhbj4nOiAnWCdcbmV4cG9ydCBpbnRlcmZhY2UgSW1hZ2VNYXAge1xuICBbdXJsOiBzdHJpbmddOiBzdHJpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBsb2FkUmVwb3J0SW1hZ2VzKHJlcG9ydDogQWpmUmVwb3J0SW5zdGFuY2UpOiBQcm9taXNlPEltYWdlTWFwPiB7XG4gIGNvbnN0IHByb21pc2VzOiBQcm9taXNlPEltYWdlTWFwPltdID0gW107XG4gIGlmIChyZXBvcnQuaGVhZGVyICE9IG51bGwpIHtcbiAgICBwcm9taXNlcy5wdXNoKGxvYWRDb250YWluZXJJbWFnZXMocmVwb3J0LmhlYWRlcikpO1xuICB9XG4gIGlmIChyZXBvcnQuY29udGVudCAhPSBudWxsKSB7XG4gICAgcHJvbWlzZXMucHVzaChsb2FkQ29udGFpbmVySW1hZ2VzKHJlcG9ydC5jb250ZW50KSk7XG4gIH1cbiAgaWYgKHJlcG9ydC5mb290ZXIgIT0gbnVsbCkge1xuICAgIHByb21pc2VzLnB1c2gobG9hZENvbnRhaW5lckltYWdlcyhyZXBvcnQuZm9vdGVyKSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlPEltYWdlTWFwPihyZXNvbHZlID0+IHtcbiAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihtYXBzID0+IHtcbiAgICAgIGxldCBtYXA6IEltYWdlTWFwID0ge307XG4gICAgICBmb3IgKGNvbnN0IG0gb2YgbWFwcykge1xuICAgICAgICBtYXAgPSB7Li4ubWFwLCAuLi5tfTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUobWFwKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRDb250YWluZXJJbWFnZXMoY29udGFpbmVyOiBBamZSZXBvcnRDb250YWluZXJJbnN0YW5jZXxBamZXaWRnZXRXaXRoQ29udGVudEluc3RhbmNlKTpcbiAgUHJvbWlzZTxJbWFnZU1hcD4ge1xuICBjb25zdCBwcm9taXNlczogUHJvbWlzZTxJbWFnZU1hcD5bXSA9IFtdO1xuICBmb3IgKGxldCB3aWRnZXQgb2YgY29udGFpbmVyLmNvbnRlbnQpIHtcbiAgICBwcm9taXNlcy5wdXNoKGxvYWRXaWRnZXRJbWFnZXMod2lkZ2V0KSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlPEltYWdlTWFwPihyZXNvbHZlID0+IHtcbiAgICBQcm9taXNlLmFsbChwcm9taXNlcykudGhlbihtYXBzID0+IHtcbiAgICAgIGxldCBtYXA6IEltYWdlTWFwID0ge307XG4gICAgICBmb3IgKGNvbnN0IG0gb2YgbWFwcykge1xuICAgICAgICBtYXAgPSB7Li4ubWFwLCAuLi5tfTtcbiAgICAgIH1cbiAgICAgIHJlc29sdmUobWFwKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxvYWRXaWRnZXRJbWFnZXMod2lkZ2V0OiBBamZXaWRnZXRJbnN0YW5jZSk6IFByb21pc2U8SW1hZ2VNYXA+IHtcbiAgc3dpdGNoICh3aWRnZXQud2lkZ2V0VHlwZSkge1xuICBjYXNlIEFqZldpZGdldFR5cGUuTGF5b3V0OlxuICBjYXNlIEFqZldpZGdldFR5cGUuQ29sdW1uOlxuICAgIHJldHVybiBsb2FkQ29udGFpbmVySW1hZ2VzKHdpZGdldCBhcyBBamZXaWRnZXRXaXRoQ29udGVudEluc3RhbmNlKTtcbiAgY2FzZSBBamZXaWRnZXRUeXBlLkltYWdlOlxuICAgIGNvbnN0IGltYWdlID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0SW5zdGFuY2U7XG4gICAgaWYgKGltYWdlLndpZGdldC5pbWFnZVR5cGUgIT09IEFqZkltYWdlVHlwZS5JbWFnZSkge1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBuZXcgUHJvbWlzZTxJbWFnZU1hcD4ocmVzb2x2ZSA9PiB7XG4gICAgICBjb25zdCByZXEgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcbiAgICAgIHJlcS5vbmVycm9yID0gKCkgPT4gcmVzb2x2ZSh7fSk7IC8vIGlnbm9yZSA0MDQnc1xuICAgICAgcmVxLm9ubG9hZCA9ICgpID0+IHtcbiAgICAgICAgY29uc3QgciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICAgIHIub25lcnJvciA9ICgpID0+IHJlc29sdmUoe30pO1xuICAgICAgICByLm9ubG9hZGVuZCA9ICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSByLnJlc3VsdCBhcyBzdHJpbmc7XG4gICAgICAgICAgaWYgKHJlc3VsdC5zdGFydHNXaXRoKCdkYXRhOmltYWdlJykpIHtcbiAgICAgICAgICAgIGNvbnN0IG1hcDogSW1hZ2VNYXAgPSB7fTtcbiAgICAgICAgICAgIG1hcFtpbWFnZS51cmxdID0gcmVzdWx0O1xuICAgICAgICAgICAgcmVzb2x2ZShtYXApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHt9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHIucmVhZEFzRGF0YVVSTChyZXEucmVzcG9uc2UpO1xuICAgICAgfTtcbiAgICAgIHJlcS5vcGVuKCdHRVQnLCBpbWFnZS51cmwpO1xuICAgICAgcmVxLnJlc3BvbnNlVHlwZSA9ICdibG9iJztcbiAgICAgIHJlcS5zZW5kKCk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIG5ldyBQcm9taXNlPEltYWdlTWFwPihyZXNvbHZlID0+IHJlc29sdmUoe30pKTtcbn1cbiJdfQ==