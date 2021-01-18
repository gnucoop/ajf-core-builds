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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LXRvLXBkZi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvcmVwb3J0LXRvLXBkZi9yZXBvcnQtdG8tcGRmLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUM3QyxPQUFPLEVBQUMsU0FBUyxFQUFjLE1BQU0sdUJBQXVCLENBQUM7QUFvQjdELE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSxrQ0FBa0MsQ0FBQztBQUUvRCxPQUFPLEVBQVcsZ0JBQWdCLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sYUFBYSxDQUFDO0FBRXJDLE1BQU0sUUFBUSxHQUFHO0lBQ2YsTUFBTSxFQUFFO1FBQ04sTUFBTSxFQUFFLDRCQUE0QjtRQUNwQyxJQUFJLEVBQUUsNEJBQTRCO1FBQ2xDLE9BQU8sRUFBRSw0QkFBNEI7UUFDckMsV0FBVyxFQUFFLDRCQUE0QjtLQUMxQztDQUNGLENBQUM7QUFFRixNQUFNLFVBQVUsYUFBYSxDQUFDLE1BQXlCLEVBQUUsV0FBNkI7SUFDcEYsZUFBZSxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDOUMsR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDO0FBRUQsTUFBTSxVQUFVLGVBQWUsQ0FDM0IsTUFBeUIsRUFBRSxXQUE2QjtJQUMxRCxPQUFPLElBQUksT0FBTyxDQUFjLE9BQU8sQ0FBQyxFQUFFO1FBQ3hDLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNyQyxJQUFJLEtBQUssR0FBRyxNQUFNLEdBQUcsRUFBRSxHQUFH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QWdCLEVBQUUsQ0FBQztRQUNoQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtZQUN2QyxNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTyxFQUFDLENBQUMsQ0FBQztZQUNqRSxnRUFBZ0U7WUFDaEUsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLE9BQU8sSUFBSSxDQUFDLENBQUMsRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFDLElBQUksRUFBRSxFQUFFLEVBQUMsQ0FBQyxDQUFDO2FBQzFCO1NBQ0Y7UUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ3BCO0lBQ0QsT0FBTyxFQUFDLEtBQUssRUFBRSxFQUFDLFVBQVUsRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFDLEVBQUUsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDLEVBQUUsb0JBQW9CLENBQUMsRUFBQyxDQUFDO0FBQ2pGLENBQUM7QUFFRCxTQUFTLFNBQVMsQ0FBQyxDQUFTO0lBQzFCLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxFQUFFLENBQUMsQ0FBQztBQUMxQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkltYWdlVHlwZX0gZnJvbSAnQGFqZi9jb3JlL2ltYWdlJztcbmltcG9ydCB7Y3JlYXRlUGRmLCBUQ3JlYXRlZFBkZn0gZnJvbSAncGRmbWFrZS9idWlsZC9wZGZtYWtlJztcbmltcG9ydCB7XG4gIENvbHVtbixcbiAgQ29udGVudCxcbiAgQ29udGVudFN0YWNrLFxuICBQYWdlT3JpZW50YXRpb24sXG4gIFRhYmxlQ2VsbCxcbiAgVERvY3VtZW50RGVmaW5pdGlvbnNcbn0gZnJvbSAncGRmbWFrZS9pbnRlcmZhY2VzJztcblxuaW1wb3J0IHtBamZSZXBvcnRDb250YWluZXJJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMtaW5zdGFuY2VzL3JlcG9ydC1jb250YWluZXItaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBvcnRJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMtaW5zdGFuY2VzL3JlcG9ydC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9jaGFydC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZDb2x1bW5XaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2NvbHVtbi13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGb3JtdWxhV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9mb3JtdWxhLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkltYWdlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9pbWFnZS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZMYXlvdXRXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2xheW91dC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvdGFibGUtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGV4dFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvdGV4dC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcblxuaW1wb3J0IHtJbWFnZU1hcCwgbG9hZFJlcG9ydEltYWdlc30gZnJvbSAnLi9sb2FkLXJlcG9ydC1pbWFnZXMnO1xuaW1wb3J0IHt2ZnNGb250c30gZnJvbSAnLi92ZnMtZm9udHMnO1xuXG5jb25zdCBmb250c01hcCA9IHtcbiAgUm9ib3RvOiB7XG4gICAgbm9ybWFsOiAncm9ib3RvLWFsbC00MDAtbm9ybWFsLndvZmYnLFxuICAgIGJvbGQ6ICdyb2JvdG8tYWxsLTUwMC1ub3JtYWwud29mZicsXG4gICAgaXRhbGljczogJ3JvYm90by1hbGwtNDAwLWl0YWxpYy53b2ZmJyxcbiAgICBib2xkaXRhbGljczogJ3JvYm90by1hbGwtNTAwLWl0YWxpYy53b2ZmJ1xuICB9LFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIG9wZW5SZXBvcnRQZGYocmVwb3J0OiBBamZSZXBvcnRJbnN0YW5jZSwgb3JpZW50YXRpb24/OiBQYWdlT3JpZW50YXRpb24pIHtcbiAgY3JlYXRlUmVwb3J0UGRmKHJlcG9ydCwgb3JpZW50YXRpb24pLnRoZW4ocGRmID0+IHtcbiAgICBwZGYub3BlbigpO1xuICB9KTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZVJlcG9ydFBkZihcbiAgICByZXBvcnQ6IEFqZlJlcG9ydEluc3RhbmNlLCBvcmllbnRhdGlvbj86IFBhZ2VPcmllbnRhdGlvbik6IFByb21pc2U8VENyZWF0ZWRQZGY+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlPFRDcmVhdGVkUGRmPihyZXNvbHZlID0+IHtcbiAgICBsb2FkUmVwb3J0SW1hZ2VzKHJlcG9ydCkudGhlbihpbWFnZXMgPT4ge1xuICAgICAgbGV0IHdpZHRoID0gNTk1LjI4IC0gNDAgKiAyOyAgLy8gQTQgcGFnZSB3aWR0aCAtIG1hcmdpbnNcbiAgICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2xhbmRzY2FwZScpIHtcbiAgICAgICAgd2lkdGggPSA4NDEuODkgLSA0MCAqIDI7XG4gICAgICB9XG4gICAgICBjb25zdCBwZGZEZWYgPSByZXBvcnRUb1BkZihyZXBvcnQsIGltYWdlcywgd2lkdGgpO1xuICAgICAgcGRmRGVmLnBhZ2VPcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgcmVzb2x2ZShjcmVhdGVQZGYocGRmRGVmLCB1bmRlZmluZWQsIGZvbnRzTWFwLCB2ZnNGb250cykpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcmVwb3J0VG9QZGYoXG4gICAgcmVwb3J0OiBBamZSZXBvcnRJbnN0YW5jZSwgaW1hZ2VzOiBJbWFnZU1hcCwgd2lkdGg6IG51bWJlcik6IFREb2N1bWVudERlZmluaXRpb25zIHtcbiAgY29uc3Qgc3RhY2s6IENvbnRlbnRbXSA9IFtdO1xuICBpZiAocmVwb3J0LmhlYWRlciAhPSBudWxsKSB7XG4gICAgc3RhY2sucHVzaChjb250YWluZXJUb1BkZihyZXBvcnQuaGVhZGVyLCBpbWFnZXMsIHdpZHRoKSk7XG4gIH1cbiAgaWYgKHJlcG9ydC5jb250ZW50ICE9IG51bGwpIHtcbiAgICBzdGFjay5wdXNoKGNvbnRhaW5lclRvUGRmKHJlcG9ydC5jb250ZW50LCBpbWFnZXMsIHdpZHRoKSk7XG4gIH1cbiAgaWYgKHJlcG9ydC5mb290ZXIgIT0gbnVsbCkge1xuICAgIHN0YWNrLnB1c2goY29udGFpbmVyVG9QZGYocmVwb3J0LmZvb3RlciwgaW1hZ2VzLCB3aWR0aCkpO1xuICB9XG4gIHJldHVybiB7Y29udGVudDoge3N0YWNrfX07XG59XG5cbmZ1bmN0aW9uIGNvbnRhaW5lclRvUGRmKFxuICAgIGNvbnRhaW5lcjogQWpmUmVwb3J0Q29udGFpbmVySW5zdGFuY2UsIGltYWdlczogSW1hZ2VNYXAsIHdpZHRoOiBudW1iZXIpOiBDb250ZW50IHtcbiAgcmV0dXJuIHtzdGFjazogY29udGFpbmVyLmNvbnRlbnQubWFwKHcgPT4gd2lkZ2V0VG9QZGYodywgaW1hZ2VzLCB3aWR0aCkpfTtcbn1cblxuY29uc3QgbWFyZ2luQmV0d2VlbldpZGdldHMgPSAxMDtcblxuZnVuY3Rpb24gd2lkZ2V0VG9QZGYod2lkZ2V0OiBBamZXaWRnZXRJbnN0YW5jZSwgaW1hZ2VzOiBJbWFnZU1hcCwgd2lkdGg6IG51bWJlcik6IENvbnRlbnQge1xuICBzd2l0Y2ggKHdpZGdldC53aWRnZXQud2lkZ2V0VHlwZSkge1xuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5MYXlvdXQ6XG4gICAgICByZXR1cm4gbGF5b3V0VG9QZGYod2lkZ2V0IGFzIEFqZkxheW91dFdpZGdldEluc3RhbmNlLCBpbWFnZXMsIHdpZHRoKTtcbiAgICBjYXNlIEFqZldpZGdldFR5cGUuUGFnZUJyZWFrOlxuICAgICAgcmV0dXJuIHt0ZXh0OiAnJywgcGFnZUJyZWFrOiAnYWZ0ZXInfTtcbiAgICBjYXNlIEFqZldpZGdldFR5cGUuSW1hZ2U6XG4gICAgICByZXR1cm4gaW1hZ2VUb1BkZih3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXRJbnN0YW5jZSwgaW1hZ2VzLCB3aWR0aCk7XG4gICAgY2FzZSBBamZXaWRnZXRUeXBlLlRleHQ6XG4gICAgICByZXR1cm4gdGV4dFRvUGRmKHdpZGdldCBhcyBBamZUZXh0V2lkZ2V0SW5zdGFuY2UpO1xuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5DaGFydDpcbiAgICAgIGNvbnN0IGNoYXJ0ID0gd2lkZ2V0IGFzIEFqZkNoYXJ0V2lkZ2V0SW5zdGFuY2U7XG4gICAgICBjb25zdCBkYXRhVXJsID0gY2hhcnQuY2FudmFzRGF0YVVybCA9PSBudWxsID8gJycgOiBjaGFydC5jYW52YXNEYXRhVXJsKCk7XG4gICAgICBpZiAoZGF0YVVybCA9PT0gJycpIHtcbiAgICAgICAgcmV0dXJuIHt0ZXh0OiAnW2NoYXJ0IHdpdGggbm8gYXR0YWNoZWQgY2FudmFzXSd9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtpbWFnZTogZGF0YVVybCwgd2lkdGgsIG1hcmdpbjogWzAsIDAsIDAsIG1hcmdpbkJldHdlZW5XaWRnZXRzXX07XG4gICAgY2FzZSBBamZXaWRnZXRUeXBlLlRhYmxlOlxuICAgICAgcmV0dXJuIHRhYmxlVG9QZGYod2lkZ2V0IGFzIEFqZlRhYmxlV2lkZ2V0SW5zdGFuY2UpO1xuICAgIGNhc2UgQWpmV2lkZ2V0VHlwZS5Db2x1bW46XG4gICAgICBjb25zdCBjdyA9IHdpZGdldCBhcyBBamZDb2x1bW5XaWRnZXRJbnN0YW5jZTtcbiAgICAgIHJldHVybiB7c3RhY2s6IGN3LmNvbnRlbnQubWFwKHcgPT4gd2lkZ2V0VG9QZGYodywgaW1hZ2VzLCB3aWR0aCkpfTtcbiAgICBjYXNlIEFqZldpZGdldFR5cGUuRm9ybXVsYTpcbiAgICAgIGNvbnN0IGZ3ID0gd2lkZ2V0IGFzIEFqZkZvcm11bGFXaWRnZXRJbnN0YW5jZTtcbiAgICAgIHJldHVybiB7dGV4dDogZncuZm9ybXVsYSwgbWFyZ2luOiBbMCwgMCwgMCwgbWFyZ2luQmV0d2VlbldpZGdldHNdfTtcbiAgICBkZWZhdWx0OlxuICAgICAgcmV0dXJuIHt0ZXh0OiAnJ307XG4gIH1cbn1cblxuZnVuY3Rpb24gbGF5b3V0VG9QZGYobHc6IEFqZkxheW91dFdpZGdldEluc3RhbmNlLCBpbWFnZXM6IEltYWdlTWFwLCB3aWR0aDogbnVtYmVyKTogQ29udGVudCB7XG4gIGNvbnN0IGNvbHVtbnMgPSBbLi4ubHcud2lkZ2V0LmNvbHVtbnNdO1xuICB3aGlsZSAoY29sdW1ucy5sZW5ndGggPCBsdy5jb250ZW50Lmxlbmd0aCkge1xuICAgIGNvbHVtbnMucHVzaCgxKTtcbiAgfVxuICBjb25zdCBjaGlsZFdpZHRoID0gd2lkdGggLyAoY29sdW1ucy5sZW5ndGggfHwgMSk7XG4gIGNvbnN0IGNoaWxkcmVuID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbHcuY29udGVudC5sZW5ndGg7IGkrKykge1xuICAgIGxldCBjaGlsZCA9IHdpZGdldFRvUGRmKGx3LmNvbnRlbnRbaV0sIGltYWdlcywgY2hpbGRXaWR0aCkgYXMgQ29udGVudFN0YWNrO1xuICAgIC8vIENoaWxkcmVuIG9mIExheW91dCB3aWRnZXRzIGFyZSBzdXBwb3NlZCB0byBiZSBDb2x1bW5zLiBJZiB0aGV5IGFyZW4ndCxcbiAgICAvLyB3ZSBtdXN0IHdyYXAgdGhlbSB0byBhdm9pZCBwcm9ibGVtcyBsaWtlIGltYWdlcyBoYXZpbmcgYW4gJ2F1dG8nIHdpZHRoLlxuICAgIGlmIChjaGlsZC5zdGFjayA9PSBudWxsKSB7XG4gICAgICBjaGlsZCA9IHtzdGFjazogW2NoaWxkXX07XG4gICAgfVxuICAgIChjaGlsZCBhcyBDb2x1bW4pLndpZHRoID0gY29sdW1uc1tpXSA9PT0gLTEgPyAnYXV0bycgOiAnKic7XG4gICAgY2hpbGRyZW4ucHVzaChjaGlsZCk7XG4gIH1cbiAgcmV0dXJuIHtjb2x1bW5zOiBjaGlsZHJlbn07XG59XG5cbmZ1bmN0aW9uIGltYWdlVG9QZGYoaW1hZ2U6IEFqZkltYWdlV2lkZ2V0SW5zdGFuY2UsIGltYWdlczogSW1hZ2VNYXAsIHdpZHRoOiBudW1iZXIpOiBDb250ZW50IHtcbiAgaWYgKGltYWdlLndpZGdldC5pbWFnZVR5cGUgIT09IEFqZkltYWdlVHlwZS5JbWFnZSkge1xuICAgIC8vIENhbid0IGdldCBpY29ucyB0byB3b3JrLCBwZGZzIHdpdGggbXVsdGlwbGUgZm9udHMgZG9uJ3Qgc2VlbSB0byBiZSB3b3JraW5nXG4gICAgcmV0dXJuIHt0ZXh0OiAnJ307XG4gIH1cbiAgY29uc3QgZGF0YVVybCA9IGltYWdlc1tpbWFnZS51cmxdO1xuICBpZiAoZGF0YVVybCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIHt0ZXh0OiAnJ307XG4gIH1cbiAgcmV0dXJuIHtpbWFnZTogZGF0YVVybCwgd2lkdGgsIG1hcmdpbjogWzAsIDAsIDAsIG1hcmdpbkJldHdlZW5XaWRnZXRzXX07XG59XG5cbmZ1bmN0aW9uIHRleHRUb1BkZih0dzogQWpmVGV4dFdpZGdldEluc3RhbmNlKTogQ29udGVudCB7XG4gIGNvbnN0IHRleHQ6IENvbnRlbnQgPSB7XG4gICAgdGV4dDogc3RyaXBIVE1MKHR3Lmh0bWxUZXh0KSxcbiAgICBtYXJnaW46IFswLCAwLCAwLCBtYXJnaW5CZXR3ZWVuV2lkZ2V0c10sXG4gIH07XG4gIGlmICh0dy5odG1sVGV4dC5zdGFydHNXaXRoKCc8aDE+JykpIHtcbiAgICB0ZXh0LmZvbnRTaXplID0gMjA7XG4gICAgdGV4dC5tYXJnaW4gPSBbMCwgMTAsIDAsIG1hcmdpbkJldHdlZW5XaWRnZXRzXTtcbiAgfSBlbHNlIGlmICh0dy5odG1sVGV4dC5zdGFydHNXaXRoKCc8aDI+JykpIHtcbiAgICB0ZXh0LmZvbnRTaXplID0gMTU7XG4gICAgdGV4dC5tYXJnaW4gPSBbMCwgNSwgMCwgbWFyZ2luQmV0d2VlbldpZGdldHNdO1xuICB9XG4gIHJldHVybiB0ZXh0O1xufVxuXG5mdW5jdGlvbiB0YWJsZVRvUGRmKHRhYmxlOiBBamZUYWJsZVdpZGdldEluc3RhbmNlKTogQ29udGVudCB7XG4gIGlmICh0YWJsZS5kYXRhID09IG51bGwgfHwgdGFibGUuZGF0YS5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4ge3RleHQ6ICcnfTtcbiAgfVxuICBjb25zdCBib2R5OiBUYWJsZUNlbGxbXVtdID0gW107XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgdGFibGUuZGF0YS5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGRhdGFSb3cgPSB0YWJsZS5kYXRhW2ldO1xuICAgIGNvbnN0IGJvZHlSb3c6IFRhYmxlQ2VsbFtdID0gW107XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBkYXRhUm93Lmxlbmd0aDsgaisrKSB7XG4gICAgICBjb25zdCBjZWxsID0gZGF0YVJvd1tqXTtcbiAgICAgIGJvZHlSb3cucHVzaCh7dGV4dDogdGFibGUuZGF0YXNldFtpXVtqXSwgY29sU3BhbjogY2VsbC5jb2xzcGFufSk7XG4gICAgICAvLyBwZGZtYWtlIHdhbnRzIHBsYWNlaG9sZGVyIGNlbGxzIGFmdGVyIGNlbGxzIHdpdGggY29sc3BhbiA+IDE6XG4gICAgICBmb3IgKGxldCBrID0gMTsgayA8IChjZWxsLmNvbHNwYW4gfHwgMSk7IGsrKykge1xuICAgICAgICBib2R5Um93LnB1c2goe3RleHQ6ICcnfSk7XG4gICAgICB9XG4gICAgfVxuICAgIGJvZHkucHVzaChib2R5Um93KTtcbiAgfVxuICByZXR1cm4ge3RhYmxlOiB7aGVhZGVyUm93czogMCwgYm9keX0sIG1hcmdpbjogWzAsIDAsIDAsIG1hcmdpbkJldHdlZW5XaWRnZXRzXX07XG59XG5cbmZ1bmN0aW9uIHN0cmlwSFRNTChzOiBzdHJpbmcpOiBzdHJpbmcge1xuICByZXR1cm4gcy5yZXBsYWNlKC88XFwvP1tePl0rKD58JCkvZywgJycpO1xufVxuIl19