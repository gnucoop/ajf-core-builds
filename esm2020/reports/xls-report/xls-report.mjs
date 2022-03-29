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
import { createFormula } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { forkJoin, of } from 'rxjs';
import { map } from 'rxjs/operators';
import * as XLSX from 'xlsx';
import { backgroundColor } from '../automatic-report/styles';
import { indicatorToJs } from './hindikit-parser';
import { htmlWidget, widgetStyle } from './styles';
import { createDataset } from '../utils/dataset/create-dataset';
import { createReportContainer } from '../utils/reports/create-report-container';
import { createWidget } from '../utils/widgets/create-widget';
import { AjfWidgetType } from '../interface/widgets/widget-type';
import { AjfChartType } from '../interface/charts/chart-type';
/**
 * This function returns a basic report for any form passed in input.
 *
 * @param form the form schema
 * @param [id] the id of the form inside the plathform.
 */
export function xlsReport(file, http) {
    const workbook = XLSX.read(file, { type: 'binary' });
    const report = {};
    const reportWidgets = [];
    const variables = [];
    const filters = {};
    // create filters
    workbook.SheetNames.forEach((sheetName, index) => {
        const sheet = workbook.Sheets[sheetName];
        if (sheetName.includes('filter') && index + 1 < workbook.SheetNames.length) {
            const nextSheet = sheetName.includes('global')
                ? 'global_filter'
                : workbook.SheetNames[index + 1];
            filters[nextSheet] = _buildFilter(workbook, sheet, http);
        }
    });
    const obsFilterValues = Object.values(filters);
    const filterNames = Object.keys(filters);
    return forkJoin(obsFilterValues.length > 0 ? obsFilterValues : of([])).pipe(map(f => {
        workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);
            if (sheetName === 'variables') {
                json
                    .filter(e => e != null && e.name != null && e.value != null)
                    .forEach(elem => {
                    let indicator = elem.value;
                    try {
                        indicator = indicatorToJs(elem.value);
                    }
                    catch (e) {
                        console.log(e);
                    }
                    variables.push({
                        name: elem.name,
                        formula: { formula: indicator },
                    });
                });
            }
            else {
                const idx = filterNames.indexOf(sheetName);
                if (sheetName.includes('table')) {
                    const tableWidget = _buildTable(json);
                    reportWidgets.push(tableWidget);
                }
                else if (sheetName.includes('chart')) {
                    const chartWidget = _buildChart(sheetName, json);
                    reportWidgets.push(chartWidget);
                }
                else if (sheetName.includes('html')) {
                    const chartWidget = _buildHtml(json);
                    reportWidgets.push(chartWidget);
                }
                if (idx >= 0) {
                    reportWidgets[reportWidgets.length - 1].filter = {
                        schema: f[idx],
                    };
                }
            }
        });
        const globalFilterIdx = filterNames.indexOf('global_filter');
        const layoutWidget = {
            widgetType: AjfWidgetType.Layout,
            content: [
                createWidget({
                    widgetType: AjfWidgetType.Column,
                    content: [...reportWidgets],
                    filter: globalFilterIdx >= 0 ? { schema: f[globalFilterIdx] } : undefined,
                }),
            ],
            columns: [1],
            visibility: {
                condition: 'true',
            },
            styles: {},
        };
        report.variables = variables;
        report.content = createReportContainer(layoutWidget);
        return report;
    }));
}
function _buildFilter(wbook, sheet, http) {
    const data = new FormData();
    const filterBook = deepCopy(wbook);
    const filterSheet = deepCopy(sheet);
    const choicesSheet = deepCopy(wbook.Sheets['choices']);
    filterBook.SheetNames = ['survey', 'choices'];
    filterBook.Sheets = { survey: filterSheet, choices: choicesSheet };
    const filterXlsx = XLSX.write(filterBook, {
        bookType: 'xlsx',
        type: 'array',
    });
    const file = new File([filterXlsx], 'filter.xlsx');
    data.append('excelFile', file);
    return http.post('https://formconv.herokuapp.com/result.json', data);
}
function _buildChart(name, json) {
    const optionLabels = ['chartType', 'title'];
    const chartOptions = {};
    const datasetObj = {};
    const dataset = [];
    let labels = { formula: `[]` };
    if (json.length > 0) {
        const firstRow = json[0];
        optionLabels.forEach(optionLabel => {
            if (firstRow[optionLabel] != null) {
                chartOptions[optionLabel] = firstRow[optionLabel];
                delete firstRow[optionLabel];
            }
        });
    }
    json.forEach(row => {
        const rowKeys = Object.keys(row);
        rowKeys.forEach(rowKey => {
            const value = row[rowKey];
            if (datasetObj[rowKey] == null) {
                datasetObj[rowKey] = [value];
            }
            else {
                datasetObj[rowKey].push(value);
            }
        });
    });
    const doLabels = datasetObj['labels'];
    if (doLabels != null) {
        labels = {
            formula: `plainArray([${doLabels.map((label) => indicatorToJs(label))}])`,
        };
        delete datasetObj['labels'];
    }
    Object.keys(datasetObj).forEach((datasetObjKey, index) => {
        const datasetRow = datasetObj[datasetObjKey].map((r) => indicatorToJs(`${r}`));
        const chartType = chartOptions['chartType'];
        const colorCondition = chartType === 'Pie' || chartType === 'PolarArea' || chartType === 'Doughnut';
        const backColor = colorCondition ? backgroundColor : backgroundColor[index];
        const formula = [
            createFormula({ formula: `plainArray([${datasetRow.toString()}])` }),
        ];
        const datasetOptions = {
            backgroundColor: backColor,
        };
        dataset.push({
            ...createDataset({
                aggregation: { aggregation: 0 },
                formula,
                label: datasetObjKey,
            }),
            options: datasetOptions,
        });
    });
    return createWidget({
        name,
        widgetType: AjfWidgetType.Chart,
        type: AjfChartType[chartOptions['chartType']],
        labels,
        dataset,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            legend: { display: true, position: 'bottom' },
            title: {
                display: true,
                text: `${chartOptions['title'] || ''}`.replace(/"/gi, ''),
            },
        },
        styles: {
            ...{ width: '100%', height: '100%', padding: '20px' },
            ...widgetStyle,
        },
        exportable: true,
    });
}
function _buildHtml(json) {
    const firstRow = json.length > 0 && json[0]['html'] != null ? json[0] : { html: '' };
    return createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: `${firstRow['html']}`,
        styles: htmlWidget,
    });
}
function _buildTable(json) {
    const rowspan = 1;
    const dataElements = [];
    const titles = Object.keys(json[0]);
    const colspans = Object.values(json[0]).map(r => +r);
    delete json[0];
    const tableHeader = titles.map((title, index) => ({
        label: '',
        formula: { formula: `\"${title}\"` },
        aggregation: { aggregation: 0 },
        colspan: colspans[index],
        rowspan,
        style: {
            textAlign: 'center',
            fontWeight: 'bold',
            color: 'white',
            backgroundColor: '#3f51b5',
        },
    }));
    json.forEach(row => {
        const elems = [];
        titles.forEach(title => {
            let elem = row[title] || `\"\"`;
            try {
                elem = indicatorToJs(elem);
            }
            catch (err) {
                elem = `${row[title]}`;
            }
            elems.push(elem.replace(/[\*\/\r\n]|@[\w-]+/g, ''));
        });
        dataElements.push(elems);
    });
    return createWidget({
        widgetType: AjfWidgetType.DynamicTable,
        rowDefinition: {
            formula: `buildDataset([${dataElements}],${JSON.stringify(colspans)})`,
        },
        dataset: tableHeader,
        exportable: true,
        cellStyles: {
            textAlign: 'center',
            color: 'black',
            backgroundColor: 'white',
        },
        styles: {
            borderCollapse: 'collapse',
        },
    });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzLXJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMveGxzLXJlcG9ydC94bHMtcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBYSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHekMsT0FBTyxFQUFDLFFBQVEsRUFBYyxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25DLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBSS9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU81RDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBWSxFQUFFLElBQWdCO0lBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFD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NUI7WUFBQyxPQUFPLEdBQUcsRUFBRTtnQkFDWixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQzthQUN4QjtZQUNELEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxxQkFBcUIsRUFBRSxFQUFFLENBQUMsQ0FBQyxDQUFDO1FBQ3RELENBQUMsQ0FBQyxDQUFDO1FBQ0gsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUMzQixDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sWUFBWSxDQUFDO1FBQ2xCLFVBQVUsRUFBRSxhQUFhLENBQUMsWUFBWTtRQUN0QyxhQUFhLEVBQUU7WUFDYixPQUFPLEVBQUUsaUJBQWlCLFlBQVksS0FBSyxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsQ0FBQyxHQUFHO1NBQ3ZFO1FBQ0QsT0FBTyxFQUFFLFdBQVc7UUFDcEIsVUFBVSxFQUFFLElBQUk7UUFDaEIsVUFBVSxFQUFFO1lBQ1YsU0FBUyxFQUFFLFFBQVE7WUFDbkIsS0FBSyxFQUFFLE9BQU87WUFDZCxlQUFlLEVBQUUsT0FBTztTQUN6QjtRQUNELE1BQU0sRUFBRTtZQUNOLGNBQWMsRUFBRSxVQUFVO1NBQzNCO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGb3JtdWxhLCBjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7Q2hhcnRDb2xvcn0gZnJvbSAnY2hhcnQuanMnO1xuaW1wb3J0IHtmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIFhMU1ggZnJvbSAneGxzeCc7XG5cbmltcG9ydCB7YmFja2dyb3VuZENvbG9yfSBmcm9tICcuLi9hdXRvbWF0aWMtcmVwb3J0L3N0eWxlcyc7XG5cbmltcG9ydCB7aW5kaWNhdG9yVG9Kc30gZnJvbSAnLi9oaW5kaWtpdC1wYXJzZXInO1xuaW1wb3J0IHtodG1sV2lkZ2V0LCB3aWRnZXRTdHlsZX0gZnJvbSAnLi9zdHlsZXMnO1xuaW1wb3J0IHtjcmVhdGVEYXRhc2V0fSBmcm9tICcuLi91dGlscy9kYXRhc2V0L2NyZWF0ZS1kYXRhc2V0JztcbmltcG9ydCB7Y3JlYXRlUmVwb3J0Q29udGFpbmVyfSBmcm9tICcuLi91dGlscy9yZXBvcnRzL2NyZWF0ZS1yZXBvcnQtY29udGFpbmVyJztcbmltcG9ydCB7QWpmV2lkZ2V0Q3JlYXRlLCBjcmVhdGVXaWRnZXR9IGZyb20gJy4uL3V0aWxzL3dpZGdldHMvY3JlYXRlLXdpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcbmltcG9ydCB7QWpmVGFibGVEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC90YWJsZS1kYXRhc2V0JztcbmltcG9ydCB7QWpmQ2hhcnREYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9jaGFydC1kYXRhc2V0JztcbmltcG9ydCB7QWpmQ2hhcnREYXRhc2V0T3B0aW9uc30gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvY2hhcnQtZGF0YXNldC1vcHRpb25zJztcbmltcG9ydCB7QWpmQ2hhcnRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvY2hhcnRzL2NoYXJ0LXR5cGUnO1xuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldCc7XG5pbXBvcnQge0FqZlJlcG9ydH0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0JztcbmltcG9ydCB7QWpmUmVwb3J0VmFyaWFibGV9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC12YXJpYWJsZSc7XG5pbXBvcnQge0FqZkxheW91dFdpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvbGF5b3V0LXdpZGdldCc7XG5pbXBvcnQge0FqZkNvbHVtbldpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvY29sdW1uLXdpZGdldCc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgYmFzaWMgcmVwb3J0IGZvciBhbnkgZm9ybSBwYXNzZWQgaW4gaW5wdXQuXG4gKlxuICogQHBhcmFtIGZvcm0gdGhlIGZvcm0gc2NoZW1hXG4gKiBAcGFyYW0gW2lkXSB0aGUgaWQgb2YgdGhlIGZvcm0gaW5zaWRlIHRoZSBwbGF0aGZvcm0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB4bHNSZXBvcnQoZmlsZTogc3RyaW5nLCBodHRwOiBIdHRwQ2xpZW50KTogT2JzZXJ2YWJsZTxBamZSZXBvcnQ+IHtcbiAgY29uc3Qgd29ya2Jvb2sgPSBYTFNYLnJlYWQoZmlsZSwge3R5cGU6ICdiaW5hcnknfSk7XG4gIGNvbnN0IHJlcG9ydDogQWpmUmVwb3J0ID0ge307XG4gIGNvbnN0IHJlcG9ydFdpZGdldHM6IEFqZldpZGdldFtdID0gW107XG5cbiAgY29uc3QgdmFyaWFibGVzOiBBamZSZXBvcnRWYXJpYWJsZVtdID0gW107XG4gIGNvbnN0IGZpbHRlcnM6IHtbc2hlZXROYW1lOiBzdHJpbmddOiBPYnNlcnZhYmxlPGFueT59ID0ge307XG4gIC8vIGNyZWF0ZSBmaWx0ZXJzXG4gIHdvcmtib29rLlNoZWV0TmFtZXMuZm9yRWFjaCgoc2hlZXROYW1lLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHNoZWV0OiBYTFNYLldvcmtTaGVldCA9IHdvcmtib29rLlNoZWV0c1tzaGVldE5hbWVdO1xuICAgIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ2ZpbHRlcicpICYmIGluZGV4ICsgMSA8IHdvcmtib29rLlNoZWV0TmFtZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBuZXh0U2hlZXQgPSBzaGVldE5hbWUuaW5jbHVkZXMoJ2dsb2JhbCcpXG4gICAgICAgID8gJ2dsb2JhbF9maWx0ZXInXG4gICAgICAgIDogd29ya2Jvb2suU2hlZXROYW1lc1tpbmRleCArIDFdO1xuICAgICAgZmlsdGVyc1tuZXh0U2hlZXRdID0gX2J1aWxkRmlsdGVyKHdvcmtib29rLCBzaGVldCwgaHR0cCk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBvYnNGaWx0ZXJWYWx1ZXM6IE9ic2VydmFibGU8YW55PltdID0gT2JqZWN0LnZhbHVlcyhmaWx0ZXJzKTtcbiAgY29uc3QgZmlsdGVyTmFtZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZmlsdGVycyk7XG5cbiAgcmV0dXJuIGZvcmtKb2luKG9ic0ZpbHRlclZhbHVlcy5sZW5ndGggPiAwID8gb2JzRmlsdGVyVmFsdWVzIDogb2YoW10pKS5waXBlKFxuICAgIG1hcChmID0+IHtcbiAgICAgIHdvcmtib29rLlNoZWV0TmFtZXMuZm9yRWFjaChzaGVldE5hbWUgPT4ge1xuICAgICAgICBjb25zdCBzaGVldDogWExTWC5Xb3JrU2hlZXQgPSB3b3JrYm9vay5TaGVldHNbc2hlZXROYW1lXTtcbiAgICAgICAgY29uc3QganNvbiA9IFhMU1gudXRpbHMuc2hlZXRfdG9fanNvbihzaGVldCkgYXMge1xuICAgICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgICB2YWx1ZTogc3RyaW5nO1xuICAgICAgICB9W107XG5cbiAgICAgICAgaWYgKHNoZWV0TmFtZSA9PT0gJ3ZhcmlhYmxlcycpIHtcbiAgICAgICAgICBqc29uXG4gICAgICAgICAgICAuZmlsdGVyKGUgPT4gZSAhPSBudWxsICYmIGUubmFtZSAhPSBudWxsICYmIGUudmFsdWUgIT0gbnVsbClcbiAgICAgICAgICAgIC5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICBsZXQgaW5kaWNhdG9yID0gZWxlbS52YWx1ZTtcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBpbmRpY2F0b3IgPSBpbmRpY2F0b3JUb0pzKGVsZW0udmFsdWUpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coZSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyaWFibGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IGVsZW0ubmFtZSxcbiAgICAgICAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogaW5kaWNhdG9yfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBpZHggPSBmaWx0ZXJOYW1lcy5pbmRleE9mKHNoZWV0TmFtZSk7XG5cbiAgICAgICAgICBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCd0YWJsZScpKSB7XG4gICAgICAgICAgICBjb25zdCB0YWJsZVdpZGdldCA9IF9idWlsZFRhYmxlKGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKHRhYmxlV2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnY2hhcnQnKSkge1xuICAgICAgICAgICAgY29uc3QgY2hhcnRXaWRnZXQgPSBfYnVpbGRDaGFydChzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGNoYXJ0V2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnaHRtbCcpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFydFdpZGdldCA9IF9idWlsZEh0bWwoanNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goY2hhcnRXaWRnZXQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0c1tyZXBvcnRXaWRnZXRzLmxlbmd0aCAtIDFdLmZpbHRlciA9IHtcbiAgICAgICAgICAgICAgc2NoZW1hOiBmW2lkeF0gYXMgYW55LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY29uc3QgZ2xvYmFsRmlsdGVySWR4ID0gZmlsdGVyTmFtZXMuaW5kZXhPZignZ2xvYmFsX2ZpbHRlcicpO1xuICAgICAgY29uc3QgbGF5b3V0V2lkZ2V0OiBBamZMYXlvdXRXaWRnZXQgPSB7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuTGF5b3V0LFxuICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgY29udGVudDogWy4uLnJlcG9ydFdpZGdldHNdLFxuICAgICAgICAgICAgZmlsdGVyOiBnbG9iYWxGaWx0ZXJJZHggPj0gMCA/IHtzY2hlbWE6IGZbZ2xvYmFsRmlsdGVySWR4XX0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSBhcyBBamZDb2x1bW5XaWRnZXQpLFxuICAgICAgICBdLFxuICAgICAgICBjb2x1bW5zOiBbMV0sXG4gICAgICAgIHZpc2liaWxpdHk6IHtcbiAgICAgICAgICBjb25kaXRpb246ICd0cnVlJyxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGVzOiB7fSxcbiAgICAgIH07XG5cbiAgICAgIHJlcG9ydC52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgICByZXBvcnQuY29udGVudCA9IGNyZWF0ZVJlcG9ydENvbnRhaW5lcihsYXlvdXRXaWRnZXQpO1xuXG4gICAgICByZXR1cm4gcmVwb3J0O1xuICAgIH0pLFxuICApO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRGaWx0ZXIoXG4gIHdib29rOiBYTFNYLldvcmtCb29rLFxuICBzaGVldDogWExTWC5Xb3JrU2hlZXQsXG4gIGh0dHA6IEh0dHBDbGllbnQsXG4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGNvbnN0IGZpbHRlckJvb2s6IFhMU1guV29ya0Jvb2sgPSBkZWVwQ29weSh3Ym9vayk7XG4gIGNvbnN0IGZpbHRlclNoZWV0OiBYTFNYLldvcmtTaGVldCA9IGRlZXBDb3B5KHNoZWV0KTtcbiAgY29uc3QgY2hvaWNlc1NoZWV0OiBYTFNYLldvcmtTaGVldCA9IGRlZXBDb3B5KHdib29rLlNoZWV0c1snY2hvaWNlcyddKTtcbiAgZmlsdGVyQm9vay5TaGVldE5hbWVzID0gWydzdXJ2ZXknLCAnY2hvaWNlcyddO1xuICBmaWx0ZXJCb29rLlNoZWV0cyA9IHtzdXJ2ZXk6IGZpbHRlclNoZWV0LCBjaG9pY2VzOiBjaG9pY2VzU2hlZXR9O1xuICBjb25zdCBmaWx0ZXJYbHN4ID0gWExTWC53cml0ZShmaWx0ZXJCb29rLCB7XG4gICAgYm9va1R5cGU6ICd4bHN4JyxcbiAgICB0eXBlOiAnYXJyYXknLFxuICB9KTtcbiAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKFtmaWx0ZXJYbHN4XSwgJ2ZpbHRlci54bHN4Jyk7XG4gIGRhdGEuYXBwZW5kKCdleGNlbEZpbGUnLCBmaWxlKTtcblxuICByZXR1cm4gaHR0cC5wb3N0KCdodHRwczovL2Zvcm1jb252Lmhlcm9rdWFwcC5jb20vcmVzdWx0Lmpzb24nLCBkYXRhKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkQ2hhcnQobmFtZTogc3RyaW5nLCBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgY29uc3Qgb3B0aW9uTGFiZWxzID0gWydjaGFydFR5cGUnLCAndGl0bGUnXTtcbiAgY29uc3QgY2hhcnRPcHRpb25zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBjb25zdCBkYXRhc2V0T2JqOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICBjb25zdCBkYXRhc2V0OiBBamZDaGFydERhdGFzZXRbXSA9IFtdO1xuICBsZXQgbGFiZWxzOiBBamZGb3JtdWxhID0ge2Zvcm11bGE6IGBbXWB9O1xuXG4gIGlmIChqc29uLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBmaXJzdFJvdyA9IGpzb25bMF07XG4gICAgb3B0aW9uTGFiZWxzLmZvckVhY2gob3B0aW9uTGFiZWwgPT4ge1xuICAgICAgaWYgKGZpcnN0Um93W29wdGlvbkxhYmVsXSAhPSBudWxsKSB7XG4gICAgICAgIGNoYXJ0T3B0aW9uc1tvcHRpb25MYWJlbF0gPSBmaXJzdFJvd1tvcHRpb25MYWJlbF07XG4gICAgICAgIGRlbGV0ZSBmaXJzdFJvd1tvcHRpb25MYWJlbF07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAganNvbi5mb3JFYWNoKHJvdyA9PiB7XG4gICAgY29uc3Qgcm93S2V5cyA9IE9iamVjdC5rZXlzKHJvdyk7XG4gICAgcm93S2V5cy5mb3JFYWNoKHJvd0tleSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJvd1tyb3dLZXldO1xuICAgICAgaWYgKGRhdGFzZXRPYmpbcm93S2V5XSA9PSBudWxsKSB7XG4gICAgICAgIGRhdGFzZXRPYmpbcm93S2V5XSA9IFt2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhc2V0T2JqW3Jvd0tleV0ucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICBjb25zdCBkb0xhYmVscyA9IGRhdGFzZXRPYmpbJ2xhYmVscyddO1xuICBpZiAoZG9MYWJlbHMgIT0gbnVsbCkge1xuICAgIGxhYmVscyA9IHtcbiAgICAgIGZvcm11bGE6IGBwbGFpbkFycmF5KFske2RvTGFiZWxzLm1hcCgobGFiZWw6IHN0cmluZykgPT4gaW5kaWNhdG9yVG9KcyhsYWJlbCkpfV0pYCxcbiAgICB9O1xuICAgIGRlbGV0ZSBkYXRhc2V0T2JqWydsYWJlbHMnXTtcbiAgfVxuICBPYmplY3Qua2V5cyhkYXRhc2V0T2JqKS5mb3JFYWNoKChkYXRhc2V0T2JqS2V5LCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IGRhdGFzZXRSb3cgPSBkYXRhc2V0T2JqW2RhdGFzZXRPYmpLZXldLm1hcCgocjogc3RyaW5nKSA9PiBpbmRpY2F0b3JUb0pzKGAke3J9YCkpO1xuXG4gICAgY29uc3QgY2hhcnRUeXBlID0gY2hhcnRPcHRpb25zWydjaGFydFR5cGUnXTtcbiAgICBjb25zdCBjb2xvckNvbmRpdGlvbiA9XG4gICAgICBjaGFydFR5cGUgPT09ICdQaWUnIHx8IGNoYXJ0VHlwZSA9PT0gJ1BvbGFyQXJlYScgfHwgY2hhcnRUeXBlID09PSAnRG91Z2hudXQnO1xuICAgIGNvbnN0IGJhY2tDb2xvciA9IGNvbG9yQ29uZGl0aW9uID8gYmFja2dyb3VuZENvbG9yIDogYmFja2dyb3VuZENvbG9yW2luZGV4XTtcbiAgICBjb25zdCBmb3JtdWxhOiBBamZGb3JtdWxhW10gPSBbXG4gICAgICBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBgcGxhaW5BcnJheShbJHtkYXRhc2V0Um93LnRvU3RyaW5nKCl9XSlgfSksXG4gICAgXTtcbiAgICBjb25zdCBkYXRhc2V0T3B0aW9uczogQWpmQ2hhcnREYXRhc2V0T3B0aW9ucyA9IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja0NvbG9yIGFzIENoYXJ0Q29sb3IsXG4gICAgfTtcbiAgICBkYXRhc2V0LnB1c2goe1xuICAgICAgLi4uY3JlYXRlRGF0YXNldCh7XG4gICAgICAgIGFnZ3JlZ2F0aW9uOiB7YWdncmVnYXRpb246IDB9LFxuICAgICAgICBmb3JtdWxhLFxuICAgICAgICBsYWJlbDogZGF0YXNldE9iaktleSxcbiAgICAgIH0pLFxuICAgICAgb3B0aW9uczogZGF0YXNldE9wdGlvbnMsXG4gICAgfSBhcyBBamZDaGFydERhdGFzZXQpO1xuICB9KTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICBuYW1lLFxuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgdHlwZTogQWpmQ2hhcnRUeXBlW2NoYXJ0T3B0aW9uc1snY2hhcnRUeXBlJ10gYXMgYW55XSBhcyB1bmtub3duIGFzIEFqZkNoYXJ0VHlwZSxcbiAgICBsYWJlbHMsXG4gICAgZGF0YXNldCxcbiAgICBvcHRpb25zOiB7XG4gICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgdGV4dDogYCR7Y2hhcnRPcHRpb25zWyd0aXRsZSddIHx8ICcnfWAucmVwbGFjZSgvXCIvZ2ksICcnKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIC4uLnt3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgcGFkZGluZzogJzIwcHgnfSxcbiAgICAgIC4uLndpZGdldFN0eWxlLFxuICAgIH0sXG4gICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRIdG1sKGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBjb25zdCBmaXJzdFJvdyA9IGpzb24ubGVuZ3RoID4gMCAmJiBqc29uWzBdWydodG1sJ10gIT0gbnVsbCA/IGpzb25bMF0gOiB7aHRtbDogJyd9O1xuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICBodG1sVGV4dDogYCR7Zmlyc3RSb3dbJ2h0bWwnXX1gLFxuICAgIHN0eWxlczogaHRtbFdpZGdldCxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZFRhYmxlKGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBjb25zdCByb3dzcGFuID0gMTtcbiAgY29uc3QgZGF0YUVsZW1lbnRzOiBhbnlbXVtdID0gW107XG4gIGNvbnN0IHRpdGxlcyA9IE9iamVjdC5rZXlzKGpzb25bMF0pO1xuICBjb25zdCBjb2xzcGFuczogbnVtYmVyW10gPSAoT2JqZWN0LnZhbHVlcyhqc29uWzBdKSBhcyBzdHJpbmdbXSkubWFwKHIgPT4gK3IpO1xuICBkZWxldGUganNvblswXTtcbiAgY29uc3QgdGFibGVIZWFkZXI6IEFqZlRhYmxlRGF0YXNldFtdID0gdGl0bGVzLm1hcCgodGl0bGUsIGluZGV4KSA9PiAoe1xuICAgIGxhYmVsOiAnJyxcbiAgICBmb3JtdWxhOiB7Zm9ybXVsYTogYFxcXCIke3RpdGxlfVxcXCJgfSxcbiAgICBhZ2dyZWdhdGlvbjoge2FnZ3JlZ2F0aW9uOiAwfSxcbiAgICBjb2xzcGFuOiBjb2xzcGFuc1tpbmRleF0sXG4gICAgcm93c3BhbixcbiAgICBzdHlsZToge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzNmNTFiNScsXG4gICAgfSxcbiAgfSkpO1xuXG4gIGpzb24uZm9yRWFjaChyb3cgPT4ge1xuICAgIGNvbnN0IGVsZW1zOiBhbnlbXSA9IFtdO1xuICAgIHRpdGxlcy5mb3JFYWNoKHRpdGxlID0+IHtcbiAgICAgIGxldCBlbGVtOiBzdHJpbmcgPSByb3dbdGl0bGVdIHx8IGBcXFwiXFxcImA7XG4gICAgICB0cnkge1xuICAgICAgICBlbGVtID0gaW5kaWNhdG9yVG9KcyhlbGVtKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBlbGVtID0gYCR7cm93W3RpdGxlXX1gO1xuICAgICAgfVxuICAgICAgZWxlbXMucHVzaChlbGVtLnJlcGxhY2UoL1tcXCpcXC9cXHJcXG5dfEBbXFx3LV0rL2csICcnKSk7XG4gICAgfSk7XG4gICAgZGF0YUVsZW1lbnRzLnB1c2goZWxlbXMpO1xuICB9KTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkR5bmFtaWNUYWJsZSxcbiAgICByb3dEZWZpbml0aW9uOiB7XG4gICAgICBmb3JtdWxhOiBgYnVpbGREYXRhc2V0KFske2RhdGFFbGVtZW50c31dLCR7SlNPTi5zdHJpbmdpZnkoY29sc3BhbnMpfSlgLFxuICAgIH0sXG4gICAgZGF0YXNldDogdGFibGVIZWFkZXIsXG4gICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICBjZWxsU3R5bGVzOiB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgfSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgIH0sXG4gIH0pO1xufVxuIl19