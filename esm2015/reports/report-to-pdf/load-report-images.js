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
                map = Object.assign(Object.assign({}, map), m);
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
                map = Object.assign(Object.assign({}, map), m);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9hZC1yZXBvcnQtaW1hZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvcmVwb3J0cy9yZXBvcnQtdG8tcGRmL2xvYWQtcmVwb3J0LWltYWdlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFNSCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFLL0QsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBUTdDLE1BQU0sVUFBVSxnQkFBZ0IsQ0FBQyxNQUF5QjtJQUN4RCxNQUFNLFFBQVEsR0FBd0IsRUFBRSxDQUFDO0lBQ3pDLElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7UUFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNuRDtJQUNELElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7UUFDMUIsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQztLQUNwRDtJQUNELElBQUksTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLEVBQUU7UUFDekIsUUFBUSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQztLQUNuRDtJQUNELE9BQU8sSUFBSSxPQUFPLENBQVcsT0FBTyxDQUFDLEVBQUU7UUFDckMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEMsSUFBSSxHQUFHLEdBQWEsRUFBRSxDQUFDO1lBQ3ZCLEtBQUssTUFBTSxDQUFDLElBQUksSUFBSSxFQUFFO2dCQUNwQixHQUFHLG1DQUFPLEdBQUcsR0FBSyxDQUFD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WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmSW1hZ2VXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2ltYWdlLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcG9ydENvbnRhaW5lckluc3RhbmNlfSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy1pbnN0YW5jZXMvcmVwb3J0LWNvbnRhaW5lci1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcG9ydEluc3RhbmNlfSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy1pbnN0YW5jZXMvcmVwb3J0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5pbXBvcnQge1xuICBBamZXaWRnZXRXaXRoQ29udGVudEluc3RhbmNlXG59IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtd2l0aC1jb250ZW50LWluc3RhbmNlJztcblxuaW1wb3J0IHtBamZJbWFnZVR5cGV9IGZyb20gJ0BhamYvY29yZS9pbWFnZSc7XG5cbi8vIEltYWdlTWFwIG1hcHMgaW1hZ2UgdXJscyB0byBkYXRhdXJscywgbGlrZTpcbi8vICdodHRwOi8vd2hhdGV2ZXIuY29tL2ltYWdlLnBuZyc6ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsLi4uJ1xuZXhwb3J0IGludGVyZmFjZSBJbWFnZU1hcCB7XG4gIFt1cmw6IHN0cmluZ106IHN0cmluZztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvYWRSZXBvcnRJbWFnZXMocmVwb3J0OiBBamZSZXBvcnRJbnN0YW5jZSk6IFByb21pc2U8SW1hZ2VNYXA+IHtcbiAgY29uc3QgcHJvbWlzZXM6IFByb21pc2U8SW1hZ2VNYXA+W10gPSBbXTtcbiAgaWYgKHJlcG9ydC5oZWFkZXIgIT0gbnVsbCkge1xuICAgIHByb21pc2VzLnB1c2gobG9hZENvbnRhaW5lckltYWdlcyhyZXBvcnQuaGVhZGVyKSk7XG4gIH1cbiAgaWYgKHJlcG9ydC5jb250ZW50ICE9IG51bGwpIHtcbiAgICBwcm9taXNlcy5wdXNoKGxvYWRDb250YWluZXJJbWFnZXMocmVwb3J0LmNvbnRlbnQpKTtcbiAgfVxuICBpZiAocmVwb3J0LmZvb3RlciAhPSBudWxsKSB7XG4gICAgcHJvbWlzZXMucHVzaChsb2FkQ29udGFpbmVySW1hZ2VzKHJlcG9ydC5mb290ZXIpKTtcbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2U8SW1hZ2VNYXA+KHJlc29sdmUgPT4ge1xuICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKG1hcHMgPT4ge1xuICAgICAgbGV0IG1hcDogSW1hZ2VNYXAgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgbSBvZiBtYXBzKSB7XG4gICAgICAgIG1hcCA9IHsuLi5tYXAsIC4uLm19O1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShtYXApO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZENvbnRhaW5lckltYWdlcyhjb250YWluZXI6IEFqZlJlcG9ydENvbnRhaW5lckluc3RhbmNlfEFqZldpZGdldFdpdGhDb250ZW50SW5zdGFuY2UpOlxuICBQcm9taXNlPEltYWdlTWFwPiB7XG4gIGNvbnN0IHByb21pc2VzOiBQcm9taXNlPEltYWdlTWFwPltdID0gW107XG4gIGZvciAobGV0IHdpZGdldCBvZiBjb250YWluZXIuY29udGVudCkge1xuICAgIHByb21pc2VzLnB1c2gobG9hZFdpZGdldEltYWdlcyh3aWRnZXQpKTtcbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2U8SW1hZ2VNYXA+KHJlc29sdmUgPT4ge1xuICAgIFByb21pc2UuYWxsKHByb21pc2VzKS50aGVuKG1hcHMgPT4ge1xuICAgICAgbGV0IG1hcDogSW1hZ2VNYXAgPSB7fTtcbiAgICAgIGZvciAoY29uc3QgbSBvZiBtYXBzKSB7XG4gICAgICAgIG1hcCA9IHsuLi5tYXAsIC4uLm19O1xuICAgICAgfVxuICAgICAgcmVzb2x2ZShtYXApO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gbG9hZFdpZGdldEltYWdlcyh3aWRnZXQ6IEFqZldpZGdldEluc3RhbmNlKTogUHJvbWlzZTxJbWFnZU1hcD4ge1xuICBzd2l0Y2ggKHdpZGdldC53aWRnZXRUeXBlKSB7XG4gIGNhc2UgQWpmV2lkZ2V0VHlwZS5MYXlvdXQ6XG4gIGNhc2UgQWpmV2lkZ2V0VHlwZS5Db2x1bW46XG4gICAgcmV0dXJuIGxvYWRDb250YWluZXJJbWFnZXMod2lkZ2V0IGFzIEFqZldpZGdldFdpdGhDb250ZW50SW5zdGFuY2UpO1xuICBjYXNlIEFqZldpZGdldFR5cGUuSW1hZ2U6XG4gICAgY29uc3QgaW1hZ2UgPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXRJbnN0YW5jZTtcbiAgICBpZiAoaW1hZ2Uud2lkZ2V0LmltYWdlVHlwZSAhPT0gQWpmSW1hZ2VUeXBlLkltYWdlKSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlPEltYWdlTWFwPihyZXNvbHZlID0+IHtcbiAgICAgIGNvbnN0IHJlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xuICAgICAgcmVxLm9uZXJyb3IgPSAoKSA9PiByZXNvbHZlKHt9KTsgLy8gaWdub3JlIDQwNCdzXG4gICAgICByZXEub25sb2FkID0gKCkgPT4ge1xuICAgICAgICBjb25zdCByID0gbmV3IEZpbGVSZWFkZXIoKTtcbiAgICAgICAgci5vbmVycm9yID0gKCkgPT4gcmVzb2x2ZSh7fSk7XG4gICAgICAgIHIub25sb2FkZW5kID0gKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHIucmVzdWx0IGFzIHN0cmluZztcbiAgICAgICAgICBpZiAocmVzdWx0LnN0YXJ0c1dpdGgoJ2RhdGE6aW1hZ2UnKSkge1xuICAgICAgICAgICAgY29uc3QgbWFwOiBJbWFnZU1hcCA9IHt9O1xuICAgICAgICAgICAgbWFwW2ltYWdlLnVybF0gPSByZXN1bHQ7XG4gICAgICAgICAgICByZXNvbHZlKG1hcCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJlc29sdmUoe30pO1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgci5yZWFkQXNEYXRhVVJMKHJlcS5yZXNwb25zZSk7XG4gICAgICB9O1xuICAgICAgcmVxLm9wZW4oJ0dFVCcsIGltYWdlLnVybCk7XG4gICAgICByZXEucmVzcG9uc2VUeXBlID0gJ2Jsb2InO1xuICAgICAgcmVxLnNlbmQoKTtcbiAgICB9KTtcbiAgfVxuICByZXR1cm4gbmV3IFByb21pc2U8SW1hZ2VNYXA+KHJlc29sdmUgPT4gcmVzb2x2ZSh7fSkpO1xufVxuIl19