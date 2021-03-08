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
import { AjfImageType } from '@ajf/core/image';
import { createPdf } from 'pdfmake/build/pdfmake';
import { AjfWidgetType } from '../interface/widgets/widget-type';
import { loadReportImages } from './load-report-images';
import { vfsFonts } from './vfs-fonts';
const fontsMap = {
    Roboto: {
        normal: 'roboto-all-400-normal.woff',
        bold: 'roboto-all-500-normal.woff',
        italics: 'roboto-all-400-italic.woff',
        bolditalics: 'roboto-all-500-italic.woff'
    },
};
export function openReportPdf(report, orientation) {
    createReportPdf(report, orientation).then(pdf => {
        pdf.open();
    });
}
export function createReportPdf(report, orientation) {
    return new Promise(resolve => {
        loadReportImages(report).then(images => {
            let width = 595.28 - 40 * 2; // A4 page width - margins
            if (orientation === 'landscape') {
                width = 841.89 - 40 * 2;
            }
            const pdfDef = reportToPdf(report, images, width);
            pdfDef.pageOrientation = orientation;
            resolve(createPdf(pdfDef, undefined, fontsMap, vfsFonts));
        });
    });
}
function reportToPdf(report, images, width) {
    const stack = [];
    if (report.header != null) {
        stack.push(containerToPdf(report.header, images, width));
    }
    if (report.content != null) {
        stack.push(containerToPdf(report.content, images, width));
    }
    if (report.footer != null) {
        stack.push(containerToPdf(report.footer, images, width));
    }
    return { content: { stack } };
}
function containerToPdf(container, images, width) {
    return { stack: container.content.map(w => widgetToPdf(w, images, width)) };
}
const marginBetweenWidgets = 10;
function widgetToPdf(widget, images, width) {
    switch (widget.widget.widgetType) {
        case AjfWidgetType.Layout:
            return layoutToPdf(widget, images, width);
        case AjfWidgetType.PageBreak:
            return { text: '', pageBreak: 'after' };
        case AjfWidgetType.Image:
            return imageToPdf(widget, images, width);
        case AjfWidgetType.Text:
            return textToPdf(widget);
        case AjfWidgetType.Chart:
            const chart = widget;
            const dataUrl = chart.canvasDataUrl == null ? '' : chart.canvasDataUrl();
            if (dataUrl === '') {
                return { text: '[chart with no attached canvas]' };
            }
            return { image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets] };
        case AjfWidgetType.Table:
            return tableToPdf(widget);
        case AjfWidgetType.Column:
            const cw = widget;
            return { stack: cw.content.map(w => widgetToPdf(w, images, width)) };
        case AjfWidgetType.Formula:
            const fw = widget;
            return { text: fw.formula, margin: [0, 0, 0, marginBetweenWidgets] };
        default:
            return { text: '' };
    }
}
function layoutToPdf(lw, images, width) {
    const columns = [...lw.widget.columns];
    while (columns.length < lw.content.length) {
        columns.push(1);
    }
    const childWidth = width / (columns.length || 1);
    const children = [];
    for (let i = 0; i < lw.content.length; i++) {
        let child = widgetToPdf(lw.content[i], images, childWidth);
        // Children of Layout widgets are supposed to be Columns. If they aren't,
        // we must wrap them to avoid problems like images having an 'auto' width.
        if (child.stack == null) {
            child = { stack: [child] };
        }
        child.width = columns[i] === -1 ? 'auto' : '*';
        children.push(child);
    }
    return { columns: children };
}
function imageToPdf(image, images, width) {
    if (image.widget.imageType !== AjfImageType.Image) {
        // Can't get icons to work, pdfs with multiple fonts don't seem to be working
        return { text: '' };
    }
    const dataUrl = images[image.url];
    if (dataUrl == null) {
        return { text: '' };
    }
    const w = image.styles.width;
    if (typeof (w) === 'string' && w.endsWith('px')) {
        width = Number(w.slice(0, -2));
    }
    return { image: dataUrl, width, margin: [0, 0, 0, marginBetweenWidgets] };
}
function textToPdf(tw) {
    const text = {
        text: stripHTML(tw.htmlText),
        margin: [0, 0, 0, marginBetweenWidgets],
    };
    if (tw.htmlText.startsWith('<h1>')) {
        text.fontSize = 20;
        text.margin = [0, 10, 0, marginBetweenWidgets];
    }
    else if (tw.htmlText.startsWith('<h2>')) {
        text.fontSize = 15;
        text.margin = [0, 5, 0, marginBetweenWidgets];
    }
    return text;
}
function tableToPdf(table) {
    if (table.data == null || table.data.length === 0) {
        return { text: '' };
    }
    const body = [];
    for (let i = 0; i < table.data.length; i++) {
        const dataRow = table.data[i];
        const bodyRow = [];
        for (let j = 0; j < dataRow.length; j++) {
            const cell = dataRow[j];
            bodyRow.push({ text: table.dataset[i][j], colSpan: cell.colspan });
            // pdfmake wants placeholder cells after cells with colspan > 1:
            for (let k = 1; k < (cell.colspan || 1); k++) {
                bodyRow.push({ text: '' });
            }
        }
        body.push(bodyRow);
    }
    return { table: { headerRows: 0, body }, margin: [0, 0, 0, marginBetweenWidgets] };
}
function stripHTML(s) {
    return s.replace(/<\/?[^>]+(>|$)/g, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LXRvLXBkZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvcmVwb3J0LXRvLXBkZi9yZXBvcnQtdG8tcGRmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsU0FBUyxFQUFjLE1BQU0sdUJBQXVCLENBQUM7QUFvQjdELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUUvRCxPQUFPLEVBQVcsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXJDLE1BQU0sUUFBUSxHQUFHO0lBQ2YsTUFBTSxFQUFFO1FBQ04sTUFBTSxFQUFFLDRCQUE0QjtRQUNwQyxJQUFJLEVBQUUsNEJBQTRCO1FBQ2xDLE9BQU8sRUFBRSw0QkFBNEI7UUFDckMsV0FBVyxFQUFFLDRCQUE0QjtLQUMxQztDQUNGLENBQUM7QUFFRixNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQXlCLEVBQUUsV0FBNkI7SUFDcEYsZUFBZSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDOUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FDM0IsTUFBeUIsRUFBRSxXQUE2QjtJQUMxRCxPQUFPLElBQUksT0FBTyxDQUFjLE9BQU8sQ0FBQyxFQUFFO1FBQ3hDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQyxJQUFJLEtBQUssR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFH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TyxDQUFDLENBQUMsT0FBTyxDQUFDLGlCQUFpQixFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQzFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmSW1hZ2VUeXBlfSBmcm9tICdAYWpmL2NvcmUvaW1hZ2UnO1xuaW1wb3J0IHtjcmVhdGVQZGYsIFRDcmVhdGVkUGRmfSBmcm9tICdwZGZtYWtlL2J1aWxkL3BkZm1ha2UnO1xuaW1wb3J0IHtcbiAgQ29sdW1uLFxuICBDb250ZW50LFxuICBDb250ZW50U3RhY2ssXG4gIFBhZ2VPcmllbnRhdGlvbixcbiAgVGFibGVDZWxsLFxuICBURG9jdW1lbnREZWZpbml0aW9uc1xufSBmcm9tICdwZGZtYWtlL2ludGVyZmFjZXMnO1xuXG5pbXBvcnQge0FqZlJlcG9ydENvbnRhaW5lckluc3RhbmNlfSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy1pbnN0YW5jZXMvcmVwb3J0LWNvbnRhaW5lci1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcG9ydEluc3RhbmNlfSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy1pbnN0YW5jZXMvcmVwb3J0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmQ2hhcnRXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2NoYXJ0LXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkNvbHVtbldpZGdldEluc3RhbmNlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvY29sdW1uLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZvcm11bGFXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2Zvcm11bGEtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmSW1hZ2VXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2ltYWdlLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkxheW91dFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvbGF5b3V0LXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRhYmxlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy90YWJsZS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUZXh0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy90ZXh0LXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldpZGdldEluc3RhbmNlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuXG5pbXBvcnQge0ltYWdlTWFwLCBsb2FkUmVwb3J0SW1hZ2VzfSBmcm9tICcuL2xvYWQtcmVwb3J0LWltYWdlcyc7XG5pbXBvcnQge3Zmc0ZvbnRzfSBmcm9tICcuL3Zmcy1mb250cyc7XG5cbmNvbnN0IGZvbnRzTWFwID0ge1xuICBSb2JvdG86IHtcbiAgICBub3JtYWw6ICdyb2JvdG8tYWxsLTQwMC1ub3JtYWwud29mZicsXG4gICAgYm9sZDogJ3JvYm90by1hbGwtNTAwLW5vcm1hbC53b2ZmJyxcbiAgICBpdGFsaWNzOiAncm9ib3RvLWFsbC00MDAtaXRhbGljLndvZmYnLFxuICAgIGJvbGRpdGFsaWNzOiAncm9ib3RvLWFsbC01MDAtaXRhbGljLndvZmYnXG4gIH0sXG59O1xuXG5leHBvcnQgZnVuY3Rpb24gb3BlblJlcG9ydFBkZihyZXBvcnQ6IEFqZlJlcG9ydEluc3RhbmNlLCBvcmllbnRhdGlvbj86IFBhZ2VPcmllbnRhdGlvbikge1xuICBjcmVhdGVSZXBvcnRQZGYocmVwb3J0LCBvcmllbnRhdGlvbikudGhlbihwZGYgPT4ge1xuICAgIHBkZi5vcGVuKCk7XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY3JlYXRlUmVwb3J0UGRmKFxuICAgIHJlcG9ydDogQWpmUmVwb3J0SW5zdGFuY2UsIG9yaWVudGF0aW9uPzogUGFnZU9yaWVudGF0aW9uKTogUHJvbWlzZTxUQ3JlYXRlZFBkZj4ge1xuICByZXR1cm4gbmV3IFByb21pc2U8VENyZWF0ZWRQZGY+KHJlc29sdmUgPT4ge1xuICAgIGxvYWRSZXBvcnRJbWFnZXMocmVwb3J0KS50aGVuKGltYWdlcyA9PiB7XG4gICAgICBsZXQgd2lkdGggPSA1OTUuMjggLSA0MCAqIDI7ICAvLyBBNCBwYWdlIHdpZHRoIC0gbWFyZ2luc1xuICAgICAgaWYgKG9yaWVudGF0aW9uID09PSAnbGFuZHNjYXBlJykge1xuICAgICAgICB3aWR0aCA9IDg0MS44OSAtIDQwICogMjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHBkZkRlZiA9IHJlcG9ydFRvUGRmKHJlcG9ydCwgaW1hZ2VzLCB3aWR0aCk7XG4gICAgICBwZGZEZWYucGFnZU9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICByZXNvbHZlKGNyZWF0ZVBkZihwZGZEZWYsIHVuZGVmaW5lZCwgZm9udHNNYXAsIHZmc0ZvbnRzKSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiByZXBvcnRUb1BkZihcbiAgICByZXBvcnQ6IEFqZlJlcG9ydEluc3RhbmNlLCBpbWFnZXM6IEltYWdlTWFwLCB3aWR0aDogbnVtYmVyKTogVERvY3VtZW50RGVmaW5pdGlvbnMge1xuICBjb25zdCBzdGFjazogQ29udGVudFtdID0gW107XG4gIGlmIChyZXBvcnQuaGVhZGVyICE9IG51bGwpIHtcbiAgICBzdGFjay5wdXNoKGNvbnRhaW5lclRvUGRmKHJlcG9ydC5oZWFkZXIsIGltYWdlcywgd2lkdGgpKTtcbiAgfVxuICBpZiAocmVwb3J0LmNvbnRlbnQgIT0gbnVsbCkge1xuICAgIHN0YWNrLnB1c2goY29udGFpbmVyVG9QZGYocmVwb3J0LmNvbnRlbnQsIGltYWdlcywgd2lkdGgpKTtcbiAgfVxuICBpZiAocmVwb3J0LmZvb3RlciAhPSBudWxsKSB7XG4gICAgc3RhY2sucHVzaChjb250YWluZXJUb1BkZihyZXBvcnQuZm9vdGVyLCBpbWFnZXMsIHdpZHRoKSk7XG4gIH1cbiAgcmV0dXJuIHtjb250ZW50OiB7c3RhY2t9fTtcbn1cblxuZnVuY3Rpb24gY29udGFpbmVyVG9QZGYoXG4gICAgY29udGFpbmVyOiBBamZSZXBvcnRDb250YWluZXJJbnN0YW5jZSwgaW1hZ2VzOiBJbWFnZU1hcCwgd2lkdGg6IG51bWJlcik6IENvbnRlbnQge1xuICByZXR1cm4ge3N0YWNrOiBjb250YWluZXIuY29udGVudC5tYXAodyA9PiB3aWRnZXRUb1BkZih3LCBpbWFnZXMsIHdpZHRoKSl9O1xufVxuXG5jb25zdCBtYXJnaW5CZXR3ZWVuV2lkZ2V0cyA9IDEwO1xuXG5mdW5jdGlvbiB3aWRnZXRUb1BkZih3aWRnZXQ6IEFqZldpZGdldEluc3RhbmNlLCBpbWFnZXM6IEltYWdlTWFwLCB3aWR0aDogbnVtYmVyKTogQ29udGVudCB7XG4gIHN3aXRjaCAod2lkZ2V0LndpZGdldC53aWRnZXRUeXBlKSB7XG4gICAgY2FzZSBBamZXaWRnZXRUeXBlLkxheW91dDpcbiAgICAgIHJldHVybiBsYXlvdXRUb1BkZih3aWRnZXQgYXMgQWpmTGF5b3V0V2lkZ2V0SW5zdGFuY2UsIGltYWdlcywgd2lkdGgpO1xuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5QYWdlQnJlYWs6XG4gICAgICByZXR1cm4ge3RleHQ6ICcnLCBwYWdlQnJlYWs6ICdhZnRlcid9O1xuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5JbWFnZTpcbiAgICAgIHJldHVybiBpbWFnZVRvUGRmKHdpZGdldCBhcyBBamZJbWFnZVdpZGdldEluc3RhbmNlLCBpbWFnZXMsIHdpZHRoKTtcbiAgICBjYXNlIEFqZldpZGdldFR5cGUuVGV4dDpcbiAgICAgIHJldHVybiB0ZXh0VG9QZGYod2lkZ2V0IGFzIEFqZlRleHRXaWRnZXRJbnN0YW5jZSk7XG4gICAgY2FzZSBBamZXaWRnZXRUeXBlLkNoYXJ0OlxuICAgICAgY29uc3QgY2hhcnQgPSB3aWRnZXQgYXMgQWpmQ2hhcnRXaWRnZXRJbnN0YW5jZTtcbiAgICAgIGNvbnN0IGRhdGFVcmwgPSBjaGFydC5jYW52YXNEYXRhVXJsID09IG51bGwgPyAnJyA6IGNoYXJ0LmNhbnZhc0RhdGFVcmwoKTtcbiAgICAgIGlmIChkYXRhVXJsID09PSAnJykge1xuICAgICAgICByZXR1cm4ge3RleHQ6ICdbY2hhcnQgd2l0aCBubyBhdHRhY2hlZCBjYW52YXNdJ307XG4gICAgICB9XG4gICAgICByZXR1cm4ge2ltYWdlOiBkYXRhVXJsLCB3aWR0aCwgbWFyZ2luOiBbMCwgMCwgMCwgbWFyZ2luQmV0d2VlbldpZGdldHNdfTtcbiAgICBjYXNlIEFqZldpZGdldFR5cGUuVGFibGU6XG4gICAgICByZXR1cm4gdGFibGVUb1BkZih3aWRnZXQgYXMgQWpmVGFibGVXaWRnZXRJbnN0YW5jZSk7XG4gICAgY2FzZSBBamZXaWRnZXRUeXBlLkNvbHVtbjpcbiAgICAgIGNvbnN0IGN3ID0gd2lkZ2V0IGFzIEFqZkNvbHVtbldpZGdldEluc3RhbmNlO1xuICAgICAgcmV0dXJuIHtzdGFjazogY3cuY29udGVudC5tYXAodyA9PiB3aWRnZXRUb1BkZih3LCBpbWFnZXMsIHdpZHRoKSl9O1xuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5Gb3JtdWxhOlxuICAgICAgY29uc3QgZncgPSB3aWRnZXQgYXMgQWpmRm9ybXVsYVdpZGdldEluc3RhbmNlO1xuICAgICAgcmV0dXJuIHt0ZXh0OiBmdy5mb3JtdWxhLCBtYXJnaW46IFswLCAwLCAwLCBtYXJnaW5CZXR3ZWVuV2lkZ2V0c119O1xuICAgIGRlZmF1bHQ6XG4gICAgICByZXR1cm4ge3RleHQ6ICcnfTtcbiAgfVxufVxuXG5mdW5jdGlvbiBsYXlvdXRUb1BkZihsdzogQWpmTGF5b3V0V2lkZ2V0SW5zdGFuY2UsIGltYWdlczogSW1hZ2VNYXAsIHdpZHRoOiBudW1iZXIpOiBDb250ZW50IHtcbiAgY29uc3QgY29sdW1ucyA9IFsuLi5sdy53aWRnZXQuY29sdW1uc107XG4gIHdoaWxlIChjb2x1bW5zLmxlbmd0aCA8IGx3LmNvbnRlbnQubGVuZ3RoKSB7XG4gICAgY29sdW1ucy5wdXNoKDEpO1xuICB9XG4gIGNvbnN0IGNoaWxkV2lkdGggPSB3aWR0aCAvIChjb2x1bW5zLmxlbmd0aCB8fCAxKTtcbiAgY29uc3QgY2hpbGRyZW4gPSBbXTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBsdy5jb250ZW50Lmxlbmd0aDsgaSsrKSB7XG4gICAgbGV0IGNoaWxkID0gd2lkZ2V0VG9QZGYobHcuY29udGVudFtpXSwgaW1hZ2VzLCBjaGlsZFdpZHRoKSBhcyBDb250ZW50U3RhY2s7XG4gICAgLy8gQ2hpbGRyZW4gb2YgTGF5b3V0IHdpZGdldHMgYXJlIHN1cHBvc2VkIHRvIGJlIENvbHVtbnMuIElmIHRoZXkgYXJlbid0LFxuICAgIC8vIHdlIG11c3Qgd3JhcCB0aGVtIHRvIGF2b2lkIHByb2JsZW1zIGxpa2UgaW1hZ2VzIGhhdmluZyBhbiAnYXV0bycgd2lkdGguXG4gICAgaWYgKGNoaWxkLnN0YWNrID09IG51bGwpIHtcbiAgICAgIGNoaWxkID0ge3N0YWNrOiBbY2hpbGRdfTtcbiAgICB9XG4gICAgKGNoaWxkIGFzIENvbHVtbikud2lkdGggPSBjb2x1bW5zW2ldID09PSAtMSA/ICdhdXRvJyA6ICcqJztcbiAgICBjaGlsZHJlbi5wdXNoKGNoaWxkKTtcbiAgfVxuICByZXR1cm4ge2NvbHVtbnM6IGNoaWxkcmVufTtcbn1cblxuZnVuY3Rpb24gaW1hZ2VUb1BkZihpbWFnZTogQWpmSW1hZ2VXaWRnZXRJbnN0YW5jZSwgaW1hZ2VzOiBJbWFnZU1hcCwgd2lkdGg6IG51bWJlcik6IENvbnRlbnQge1xuICBpZiAoaW1hZ2Uud2lkZ2V0LmltYWdlVHlwZSAhPT0gQWpmSW1hZ2VUeXBlLkltYWdlKSB7XG4gICAgLy8gQ2FuJ3QgZ2V0IGljb25zIHRvIHdvcmssIHBkZnMgd2l0aCBtdWx0aXBsZSBmb250cyBkb24ndCBzZWVtIHRvIGJlIHdvcmtpbmdcbiAgICByZXR1cm4ge3RleHQ6ICcnfTtcbiAgfVxuICBjb25zdCBkYXRhVXJsID0gaW1hZ2VzW2ltYWdlLnVybF07XG4gIGlmIChkYXRhVXJsID09IG51bGwpIHtcbiAgICByZXR1cm4ge3RleHQ6ICcnfTtcbiAgfVxuICBjb25zdCB3ID0gaW1hZ2Uuc3R5bGVzLndpZHRoO1xuICBpZiAodHlwZW9mKHcpID09PSAnc3RyaW5nJyAmJiB3LmVuZHNXaXRoKCdweCcpKSB7XG4gICAgd2lkdGggPSBOdW1iZXIody5zbGljZSgwLCAtMikpO1xuICB9XG4gIHJldHVybiB7aW1hZ2U6IGRhdGFVcmwsIHdpZHRoLCBtYXJnaW46IFswLCAwLCAwLCBtYXJnaW5CZXR3ZWVuV2lkZ2V0c119O1xufVxuXG5mdW5jdGlvbiB0ZXh0VG9QZGYodHc6IEFqZlRleHRXaWRnZXRJbnN0YW5jZSk6IENvbnRlbnQge1xuICBjb25zdCB0ZXh0OiBDb250ZW50ID0ge1xuICAgIHRleHQ6IHN0cmlwSFRNTCh0dy5odG1sVGV4dCksXG4gICAgbWFyZ2luOiBbMCwgMCwgMCwgbWFyZ2luQmV0d2VlbldpZGdldHNdLFxuICB9O1xuICBpZiAodHcuaHRtbFRleHQuc3RhcnRzV2l0aCgnPGgxPicpKSB7XG4gICAgdGV4dC5mb250U2l6ZSA9IDIwO1xuICAgIHRleHQubWFyZ2luID0gWzAsIDEwLCAwLCBtYXJnaW5CZXR3ZWVuV2lkZ2V0c107XG4gIH0gZWxzZSBpZiAodHcuaHRtbFRleHQuc3RhcnRzV2l0aCgnPGgyPicpKSB7XG4gICAgdGV4dC5mb250U2l6ZSA9IDE1O1xuICAgIHRleHQubWFyZ2luID0gWzAsIDUsIDAsIG1hcmdpbkJldHdlZW5XaWRnZXRzXTtcbiAgfVxuICByZXR1cm4gdGV4dDtcbn1cblxuZnVuY3Rpb24gdGFibGVUb1BkZih0YWJsZTogQWpmVGFibGVXaWRnZXRJbnN0YW5jZSk6IENvbnRlbnQge1xuICBpZiAodGFibGUuZGF0YSA9PSBudWxsIHx8IHRhYmxlLmRhdGEubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHt0ZXh0OiAnJ307XG4gIH1cbiAgY29uc3QgYm9keTogVGFibGVDZWxsW11bXSA9IFtdO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRhYmxlLmRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBkYXRhUm93ID0gdGFibGUuZGF0YVtpXTtcbiAgICBjb25zdCBib2R5Um93OiBUYWJsZUNlbGxbXSA9IFtdO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgZGF0YVJvdy5sZW5ndGg7IGorKykge1xuICAgICAgY29uc3QgY2VsbCA9IGRhdGFSb3dbal07XG4gICAgICBib2R5Um93LnB1c2goe3RleHQ6IHRhYmxlLmRhdGFzZXRbaV1bal0sIGNvbFNwYW46IGNlbGwuY29sc3Bhbn0pO1xuICAgICAgLy8gcGRmbWFrZSB3YW50cyBwbGFjZWhvbGRlciBjZWxscyBhZnRlciBjZWxscyB3aXRoIGNvbHNwYW4gPiAxOlxuICAgICAgZm9yIChsZXQgayA9IDE7IGsgPCAoY2VsbC5jb2xzcGFuIHx8IDEpOyBrKyspIHtcbiAgICAgICAgYm9keVJvdy5wdXNoKHt0ZXh0OiAnJ30pO1xuICAgICAgfVxuICAgIH1cbiAgICBib2R5LnB1c2goYm9keVJvdyk7XG4gIH1cbiAgcmV0dXJuIHt0YWJsZToge2hlYWRlclJvd3M6IDAsIGJvZHl9LCBtYXJnaW46IFswLCAwLCAwLCBtYXJnaW5CZXR3ZWVuV2lkZ2V0c119O1xufVxuXG5mdW5jdGlvbiBzdHJpcEhUTUwoczogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIHMucmVwbGFjZSgvPFxcLz9bXj5dKyg+fCQpL2csICcnKTtcbn1cbiJdfQ==