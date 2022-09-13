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
 * This function builds a report from an excel file.
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
    const obsFilterValues = Object.values(filters).length
        ? Object.values(filters)
        : [of({})];
    const filterNames = Object.keys(filters);
    return forkJoin(obsFilterValues).pipe(map(f => {
        workbook.SheetNames.forEach(sheetName => {
            const sheet = workbook.Sheets[sheetName];
            const json = XLSX.utils.sheet_to_json(sheet);
            if (sheetName === 'variables') {
                json
                    .filter(e => e != null && e.name != null && e.name !== '')
                    .forEach(elem => {
                    let js;
                    try {
                        js = indicatorToJs(elem.value);
                    }
                    catch (err) {
                        const r = elem.__rowNum__;
                        err = new Error(`Error in variable "${elem.name}" (row ${r}): ${err.message}`);
                        window.alert(err.message);
                        throw err;
                    }
                    variables.push({
                        name: elem.name,
                        formula: { formula: js },
                    });
                });
            }
            else {
                const idx = filterNames.indexOf(sheetName);
                if (sheetName.includes('table')) {
                    const tableWidget = _buildTable(sheetName, json);
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
                else if (sheetName.includes('graph')) {
                    const graphWidget = _buildGraph(sheetName, json);
                    reportWidgets.push(graphWidget);
                }
                else if (sheetName.includes('heatmap')) {
                    const heatmapWidget = _buildHeatmap(sheetName, json);
                    reportWidgets.push(heatmapWidget);
                }
                else if (sheetName.includes('paginatedlist')) {
                    const pagListWidget = _buildPaginatedListTable(sheetName, json);
                    reportWidgets.push(pagListWidget);
                }
                else if (sheetName.includes('paginatedDialogList')) {
                    const pagListWidget = _buildPaginatedListTableWithDialog(sheetName, json);
                    reportWidgets.push(pagListWidget);
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
    let labels = { formula: '[]' };
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
        let labelsJs;
        try {
            labelsJs = indicatorToJs('[' + doLabels.join() + ']');
        }
        catch (err) {
            err = new Error(`Error in "labels" of chart "${chartOptions['title']}": ${err.message}`);
            window.alert(err.message);
            throw err;
        }
        labels = { formula: `plainArray(${labelsJs})` };
        delete datasetObj['labels'];
    }
    Object.keys(datasetObj).forEach((datasetObjKey, index) => {
        let datasetJs;
        try {
            datasetJs = indicatorToJs('[' + datasetObj[datasetObjKey].join() + ']');
        }
        catch (err) {
            err = new Error(`Error in "${datasetObjKey}" of chart "${chartOptions['title']}": ${err.message}`);
            window.alert(err.message);
            throw err;
        }
        const chartType = chartOptions['chartType'];
        const colorCondition = chartType === 'Pie' || chartType === 'PolarArea' || chartType === 'Doughnut';
        const backColor = colorCondition ? backgroundColor : backgroundColor[index];
        const formula = [
            createFormula({
                formula: `plainArray(${datasetJs})`,
            }),
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
                text: chartOptions['title'] || '',
            },
        },
        styles: {
            ...{ width: '100%', height: '100%', padding: '20px' },
            ...widgetStyle,
        },
        exportable: true,
    });
}
function _buildGraph(name, json) {
    const nodes = [];
    json.forEach(row => {
        const rowKeys = Object.keys(row);
        if (rowKeys.includes('id') && row['id']) {
            const rowId = row['id'].trim().replace(/"/g, '');
            if (rowId && rowId.length) {
                let graphNodeObj = {};
                rowKeys.forEach(rowKey => {
                    let js;
                    try {
                        js = indicatorToJs(row[rowKey]);
                    }
                    catch (err) {
                        const rowNum = row['__rowNum__'];
                        err = new Error(`Error in "${name}", row ${rowNum}, column "${rowKey}": ${err.message}`);
                        window.alert(err.message);
                        throw err;
                    }
                    graphNodeObj[rowKey] = js;
                });
                graphNodeObj['id'] = rowId;
                nodes.push(graphNodeObj);
            }
        }
    });
    return createWidget({
        widgetType: AjfWidgetType.Graph,
        nodes,
        styles: {},
    });
}
function _buildHtml(json) {
    const firstRow = json.length > 0 && json[0]['html'] != null ? json[0] : { html: '' };
    return createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: String(firstRow['html']),
        styles: htmlWidget,
    });
}
function _buildTable(sheetName, json) {
    let tableHeader = [];
    let dataRows = '[]';
    let formula = '';
    let pageSize = 10;
    let pagination = false;
    if (json.length > 1) {
        const rowspan = 1;
        const titles = Object.keys(json[0]);
        const colspans = Object.values(json[0]).map(r => +r.charAt(0));
        const textAlign = Object.values(json[0]).map(r => {
            switch (r.charAt(1)) {
                case 'l':
                    return 'left';
                case 'r':
                    return 'right';
                case 'c':
                    return 'center';
                default:
                    return 'center';
            }
        });
        tableHeader = titles.map((title, index) => ({
            label: '',
            formula: { formula: `"${title}"` },
            aggregation: { aggregation: 0 },
            colspan: colspans[index],
            rowspan,
            style: {
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#3f51b5',
                borderBottom: '2px solid #ddd',
            },
        }));
        pagination = json[1]['pagination'] ? json[1]['pagination'] : false;
        if ('dataset' in json[1]) {
            formula = _buildFormListTable(json, colspans, textAlign);
        }
        else {
            delete json[0];
            console.log(json);
            dataRows = '[';
            json.forEach(row => {
                let dataRow = '[';
                titles.forEach(title => {
                    let elem = row[title] || `''`;
                    try {
                        elem = indicatorToJs(elem);
                    }
                    catch (err) {
                        const rowNum = row['__rowNum__'];
                        err = new Error(`Error in "${sheetName}", row ${rowNum}, column "${title}": ${err.message}`);
                        window.alert(err.message);
                        throw err;
                    }
                    dataRow += elem + ',';
                });
                dataRow += ']';
                dataRows += dataRow + ',';
            });
            dataRows += ']';
            formula = `buildAlignedDataset(plainArray(${dataRows}),${JSON.stringify(colspans)},${JSON.stringify(textAlign)})`;
        }
    }
    if (pagination) {
        return createWidget({
            widgetType: AjfWidgetType.PaginatedTable,
            pageSize: pageSize,
            rowDefinition: {
                formula: formula,
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
    else {
        return createWidget({
            widgetType: AjfWidgetType.DynamicTable,
            rowDefinition: {
                formula: formula,
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
}
/**
 * Create a formula for a dynamic table widget, based on a list of Forms
 * @param json
 * @returns the formula for the DynamicTable AjfWidget, like this:
 * buildFormDataset(projectsDataset, ['id_p','donors','budget','dino_area_name','calc_progress',])"
 */
function _buildFormListTable(json, colspans, textAlign) {
    let formula = '';
    if (json.length > 1) {
        let fields = '[';
        Object.keys(json[0]).forEach(fieldColName => {
            let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
            fields += elem + ',';
        });
        fields += ']';
        const dataset = json[1]['dataset'];
        const linkField = json[1]['link_field'];
        const linkPos = json[1]['link_position'] ? +json[1]['link_position'] : 0;
        const rowLink = linkField && linkField.length ? `{'link': '${linkField}', 'position': ${linkPos}}` : null;
        formula = `buildAlignedFormDataset(${dataset}, ${fields}, ${JSON.stringify(colspans)}, ${JSON.stringify(textAlign)}, ${rowLink})`;
    }
    return formula;
}
/**
 * Create a widget with a dynamic paginated table based on a list of Forms. Each row is an AjfTable.
 * @param sheetName
 * @param json
 * @returns a Paginated AjfWidget with a formula like this:
 * buildWidgetDataset(projectsDataset, ['id_p','donors','budget','dino_area_name','calc_progress','home_link_text',],
 *   {'link': 'home_link', 'position': 5}, {'border': 'none'},{'width': '900px'}, ['10%','30%','10%','25%','15%','10%'], \"#f0f0f0\", \"white\")"
 */
function _buildPaginatedListTable(_, json) {
    let formula = '';
    let pageSize = 10;
    let dataset = '';
    let title = '';
    if (json.length > 1) {
        const colsPercentage = Object.values(json[0])
            .map(r => `'${r}%'`)
            .join(',');
        const colsPercentageArray = `[${colsPercentage}]`;
        let fields = '[';
        Object.keys(json[0]).forEach(fieldColName => {
            let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
            fields += elem + ',';
        });
        fields += ']';
        dataset = json[1]['dataset'];
        title = json[1]['title'];
        pageSize = json[1]['pageSize'] ? +json[1]['pageSize'] : 10;
        const linkField = json[1]['link_field'];
        const linkPos = json[1]['link_position'] ? +json[1]['link_position'] : 0;
        const rowLink = linkField && linkField.length ? `{'link': '${linkField}', 'position': ${linkPos}}` : null;
        const cellStyles = json[1]['cellStyles'];
        const rowStyle = json[1]['rowStyle'];
        const backgroundColorA = json[1]['backgroundColorA'];
        const backgroundColorB = json[1]['backgroundColorB'];
        formula =
            `buildWidgetDataset(${dataset}, ${fields}, ${rowLink}, ${cellStyles},` +
                `${rowStyle}, ${colsPercentageArray}, ${JSON.stringify(backgroundColorA)}, ${JSON.stringify(backgroundColorB)})`;
    }
    return createWidget({
        widgetType: AjfWidgetType.PaginatedList,
        pageSize: pageSize,
        title: title,
        contentDefinition: {
            formula: formula,
        },
        exportable: true,
        styles: {
            height: '500px',
        },
    });
}
/**
 * Create a widget with a dynamic paginated table based on a list of Forms. Each row is an AjfDialogWidget with an AjfTable
 * that open, on click, a dialog.
 * @param sheetName
 * @param json
 * @returns a Paginated AjfWidget with a formula like this:
 * buildWidgetDatasetWithDialog(projectsDataset, ['id_p','donors','province_choicesLabel','dino_area_name','calc_progress','home_link_text',],
 *  ['id_p','donors','province_choicesLabel','dino_area_name'], ['Codice progetto','Donors','Provinces','Settore di attivita'],
 *  {'border': 'none'},{'width': '900px'}, ['10%','30%','10%','25%','15%','10%'], \"#f0f0f0\", \"white\")
 */
function _buildPaginatedListTableWithDialog(_, json) {
    let formula = '';
    let pageSize = 10;
    let dataset = '';
    let title = '';
    if (json.length > 1) {
        const colsPercentage = Object.values(json[0])
            .map(r => `'${r}%'`)
            .join(',');
        const colsPercentageArray = `[${colsPercentage}]`;
        let fields = '[';
        Object.keys(json[0]).forEach(fieldColName => {
            let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
            fields += elem + ',';
        });
        fields += ']';
        let dialogFields = '[';
        let dialogLabelFields = '[';
        if (json.length > 3) {
            dialogLabelFields += Object.values(json[2]).map(v => `'${v}'`).join(',');
            dialogFields += Object.values(json[3]).map(v => `'${v}'`).join(',');
        }
        dialogFields += ']';
        dialogLabelFields += ']';
        dataset = json[1]['dataset'];
        title = json[1]['title'];
        pageSize = json[1]['pageSize'] ? +json[1]['pageSize'] : 10;
        const cellStyles = json[1]['cellStyles'];
        const rowStyle = json[1]['rowStyle'];
        const backgroundColorA = json[1]['backgroundColorA'];
        const backgroundColorB = json[1]['backgroundColorB'];
        formula =
            `buildWidgetDatasetWithDialog(${dataset}, ${fields}, ${dialogFields}, ${dialogLabelFields}, ${cellStyles},` +
                `${rowStyle}, ${colsPercentageArray}, ${JSON.stringify(backgroundColorA)}, ${JSON.stringify(backgroundColorB)})`;
    }
    return createWidget({
        widgetType: AjfWidgetType.PaginatedList,
        pageSize: pageSize,
        title: title,
        contentDefinition: {
            formula: formula,
        },
        exportable: true,
        styles: {
            height: '500px',
        },
    });
}
const _buildHeatmap = (_, json) => {
    const defaultFeatures = {
        type: 'FeatureCollection',
        features: [],
    };
    const options = {
        values: '[]',
        idProp: 'id',
        features: JSON.stringify(defaultFeatures),
        startColor: '#ffeb3b',
        endColor: '#f44336',
        highlightColor: '#009688',
        showVisualMap: false,
        ...(json.length > 0 ? json[0] : {}),
    };
    return createWidget({
        widgetType: AjfWidgetType.HeatMap,
        ...options,
        values: { formula: options.values },
        styles: {
            minHeight: '200px',
        },
    });
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzLXJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMveGxzLXJlcG9ydC94bHMtcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBYSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHekMsT0FBTyxFQUFDLFFBQVEsRUFBYyxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25DLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBSS9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQVE1RDs7R0FFRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBWSxFQUFFLElBQWdCO0lBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDbkQs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QUFDO1FBQ2pDLE1BQU0sRUFBRTtZQUNOLFNBQVMsRUFBRSxPQUFPO1NBQ25CO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm11bGEsIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtDaGFydENvbG9yfSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQge2ZvcmtKb2luLCBPYnNlcnZhYmxlLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgWExTWCBmcm9tICd4bHN4JztcblxuaW1wb3J0IHtiYWNrZ3JvdW5kQ29sb3J9IGZyb20gJy4uL2F1dG9tYXRpYy1yZXBvcnQvc3R5bGVzJztcblxuaW1wb3J0IHtpbmRpY2F0b3JUb0pzfSBmcm9tICcuL2hpbmRpa2l0LXBhcnNlcic7XG5pbXBvcnQge2h0bWxXaWRnZXQsIHdpZGdldFN0eWxlfSBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQge2NyZWF0ZURhdGFzZXR9IGZyb20gJy4uL3V0aWxzL2RhdGFzZXQvY3JlYXRlLWRhdGFzZXQnO1xuaW1wb3J0IHtjcmVhdGVSZXBvcnRDb250YWluZXJ9IGZyb20gJy4uL3V0aWxzL3JlcG9ydHMvY3JlYXRlLXJlcG9ydC1jb250YWluZXInO1xuaW1wb3J0IHtBamZXaWRnZXRDcmVhdGUsIGNyZWF0ZVdpZGdldH0gZnJvbSAnLi4vdXRpbHMvd2lkZ2V0cy9jcmVhdGUtd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuaW1wb3J0IHtBamZUYWJsZURhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L3RhYmxlLWRhdGFzZXQnO1xuaW1wb3J0IHtBamZDaGFydERhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L2NoYXJ0LWRhdGFzZXQnO1xuaW1wb3J0IHtBamZDaGFydERhdGFzZXRPcHRpb25zfSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9jaGFydC1kYXRhc2V0LW9wdGlvbnMnO1xuaW1wb3J0IHtBamZDaGFydFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS9jaGFydHMvY2hhcnQtdHlwZSc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7QWpmUmVwb3J0fSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuaW1wb3J0IHtBamZSZXBvcnRWYXJpYWJsZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LXZhcmlhYmxlJztcbmltcG9ydCB7QWpmTGF5b3V0V2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9sYXlvdXQtd2lkZ2V0JztcbmltcG9ydCB7QWpmQ29sdW1uV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9jb2x1bW4td2lkZ2V0JztcbmltcG9ydCB7QWpmR3JhcGhOb2RlRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvZ3JhcGgtZGF0YXNldCc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBidWlsZHMgYSByZXBvcnQgZnJvbSBhbiBleGNlbCBmaWxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24geGxzUmVwb3J0KGZpbGU6IHN0cmluZywgaHR0cDogSHR0cENsaWVudCk6IE9ic2VydmFibGU8QWpmUmVwb3J0PiB7XG4gIGNvbnN0IHdvcmtib29rID0gWExTWC5yZWFkKGZpbGUsIHt0eXBlOiAnYmluYXJ5J30pO1xuICBjb25zdCByZXBvcnQ6IEFqZlJlcG9ydCA9IHt9O1xuICBjb25zdCByZXBvcnRXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuXG4gIGNvbnN0IHZhcmlhYmxlczogQWpmUmVwb3J0VmFyaWFibGVbXSA9IFtdO1xuICBjb25zdCBmaWx0ZXJzOiB7W3NoZWV0TmFtZTogc3RyaW5nXTogT2JzZXJ2YWJsZTxhbnk+fSA9IHt9O1xuICAvLyBjcmVhdGUgZmlsdGVyc1xuICB3b3JrYm9vay5TaGVldE5hbWVzLmZvckVhY2goKHNoZWV0TmFtZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBzaGVldDogWExTWC5Xb3JrU2hlZXQgPSB3b3JrYm9vay5TaGVldHNbc2hlZXROYW1lXTtcbiAgICBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdmaWx0ZXInKSAmJiBpbmRleCArIDEgPCB3b3JrYm9vay5TaGVldE5hbWVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbmV4dFNoZWV0ID0gc2hlZXROYW1lLmluY2x1ZGVzKCdnbG9iYWwnKVxuICAgICAgICA/ICdnbG9iYWxfZmlsdGVyJ1xuICAgICAgICA6IHdvcmtib29rLlNoZWV0TmFtZXNbaW5kZXggKyAxXTtcbiAgICAgIGZpbHRlcnNbbmV4dFNoZWV0XSA9IF9idWlsZEZpbHRlcih3b3JrYm9vaywgc2hlZXQsIGh0dHApO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3Qgb2JzRmlsdGVyVmFsdWVzOiBPYnNlcnZhYmxlPGFueT5bXSA9IE9iamVjdC52YWx1ZXMoZmlsdGVycykubGVuZ3RoXG4gICAgPyBPYmplY3QudmFsdWVzKGZpbHRlcnMpXG4gICAgOiBbb2Yoe30pXTtcbiAgY29uc3QgZmlsdGVyTmFtZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZmlsdGVycyk7XG5cbiAgcmV0dXJuIGZvcmtKb2luKG9ic0ZpbHRlclZhbHVlcykucGlwZShcbiAgICBtYXAoZiA9PiB7XG4gICAgICB3b3JrYm9vay5TaGVldE5hbWVzLmZvckVhY2goc2hlZXROYW1lID0+IHtcbiAgICAgICAgY29uc3Qgc2hlZXQ6IFhMU1guV29ya1NoZWV0ID0gd29ya2Jvb2suU2hlZXRzW3NoZWV0TmFtZV07XG4gICAgICAgIGNvbnN0IGpzb24gPSBYTFNYLnV0aWxzLnNoZWV0X3RvX2pzb24oc2hlZXQpIGFzIHtcbiAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgICAgdmFsdWU6IHN0cmluZztcbiAgICAgICAgICBfX3Jvd051bV9fOiBzdHJpbmc7XG4gICAgICAgIH1bXTtcblxuICAgICAgICBpZiAoc2hlZXROYW1lID09PSAndmFyaWFibGVzJykge1xuICAgICAgICAgIGpzb25cbiAgICAgICAgICAgIC5maWx0ZXIoZSA9PiBlICE9IG51bGwgJiYgZS5uYW1lICE9IG51bGwgJiYgZS5uYW1lICE9PSAnJylcbiAgICAgICAgICAgIC5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICBsZXQganM6IHN0cmluZztcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBqcyA9IGluZGljYXRvclRvSnMoZWxlbS52YWx1ZSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgciA9IGVsZW0uX19yb3dOdW1fXztcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGluIHZhcmlhYmxlIFwiJHtlbGVtLm5hbWV9XCIgKHJvdyAke3J9KTogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXJpYWJsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogZWxlbS5uYW1lLFxuICAgICAgICAgICAgICAgIGZvcm11bGE6IHtmb3JtdWxhOiBqc30sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaWR4ID0gZmlsdGVyTmFtZXMuaW5kZXhPZihzaGVldE5hbWUpO1xuXG4gICAgICAgICAgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygndGFibGUnKSkge1xuICAgICAgICAgICAgY29uc3QgdGFibGVXaWRnZXQgPSBfYnVpbGRUYWJsZShzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKHRhYmxlV2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnY2hhcnQnKSkge1xuICAgICAgICAgICAgY29uc3QgY2hhcnRXaWRnZXQgPSBfYnVpbGRDaGFydChzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGNoYXJ0V2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnaHRtbCcpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFydFdpZGdldCA9IF9idWlsZEh0bWwoanNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goY2hhcnRXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdncmFwaCcpKSB7XG4gICAgICAgICAgICBjb25zdCBncmFwaFdpZGdldCA9IF9idWlsZEdyYXBoKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goZ3JhcGhXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdoZWF0bWFwJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYXRtYXBXaWRnZXQgPSBfYnVpbGRIZWF0bWFwKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goaGVhdG1hcFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ3BhZ2luYXRlZGxpc3QnKSkge1xuICAgICAgICAgICAgY29uc3QgcGFnTGlzdFdpZGdldCA9IF9idWlsZFBhZ2luYXRlZExpc3RUYWJsZShzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKHBhZ0xpc3RXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdwYWdpbmF0ZWREaWFsb2dMaXN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ0xpc3RXaWRnZXQgPSBfYnVpbGRQYWdpbmF0ZWRMaXN0VGFibGVXaXRoRGlhbG9nKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2gocGFnTGlzdFdpZGdldCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlkeCA+PSAwKSB7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzW3JlcG9ydFdpZGdldHMubGVuZ3RoIC0gMV0uZmlsdGVyID0ge1xuICAgICAgICAgICAgICBzY2hlbWE6IGZbaWR4XSBhcyBhbnksXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBjb25zdCBnbG9iYWxGaWx0ZXJJZHggPSBmaWx0ZXJOYW1lcy5pbmRleE9mKCdnbG9iYWxfZmlsdGVyJyk7XG4gICAgICBjb25zdCBsYXlvdXRXaWRnZXQ6IEFqZkxheW91dFdpZGdldCA9IHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5MYXlvdXQsXG4gICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgICBjb250ZW50OiBbLi4ucmVwb3J0V2lkZ2V0c10sXG4gICAgICAgICAgICBmaWx0ZXI6IGdsb2JhbEZpbHRlcklkeCA+PSAwID8ge3NjaGVtYTogZltnbG9iYWxGaWx0ZXJJZHhdfSA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9IGFzIEFqZkNvbHVtbldpZGdldCksXG4gICAgICAgIF0sXG4gICAgICAgIGNvbHVtbnM6IFsxXSxcbiAgICAgICAgdmlzaWJpbGl0eToge1xuICAgICAgICAgIGNvbmRpdGlvbjogJ3RydWUnLFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZXM6IHt9LFxuICAgICAgfTtcblxuICAgICAgcmVwb3J0LnZhcmlhYmxlcyA9IHZhcmlhYmxlcztcbiAgICAgIHJlcG9ydC5jb250ZW50ID0gY3JlYXRlUmVwb3J0Q29udGFpbmVyKGxheW91dFdpZGdldCk7XG5cbiAgICAgIHJldHVybiByZXBvcnQ7XG4gICAgfSksXG4gICk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZEZpbHRlcihcbiAgd2Jvb2s6IFhMU1guV29ya0Jvb2ssXG4gIHNoZWV0OiBYTFNYLldvcmtTaGVldCxcbiAgaHR0cDogSHR0cENsaWVudCxcbik6IE9ic2VydmFibGU8YW55PiB7XG4gIGNvbnN0IGRhdGEgPSBuZXcgRm9ybURhdGEoKTtcbiAgY29uc3QgZmlsdGVyQm9vazogWExTWC5Xb3JrQm9vayA9IGRlZXBDb3B5KHdib29rKTtcbiAgY29uc3QgZmlsdGVyU2hlZXQ6IFhMU1guV29ya1NoZWV0ID0gZGVlcENvcHkoc2hlZXQpO1xuICBjb25zdCBjaG9pY2VzU2hlZXQ6IFhMU1guV29ya1NoZWV0ID0gZGVlcENvcHkod2Jvb2suU2hlZXRzWydjaG9pY2VzJ10pO1xuICBmaWx0ZXJCb29rLlNoZWV0TmFtZXMgPSBbJ3N1cnZleScsICdjaG9pY2VzJ107XG4gIGZpbHRlckJvb2suU2hlZXRzID0ge3N1cnZleTogZmlsdGVyU2hlZXQsIGNob2ljZXM6IGNob2ljZXNTaGVldH07XG4gIGNvbnN0IGZpbHRlclhsc3ggPSBYTFNYLndyaXRlKGZpbHRlckJvb2ssIHtcbiAgICBib29rVHlwZTogJ3hsc3gnLFxuICAgIHR5cGU6ICdhcnJheScsXG4gIH0pO1xuICBjb25zdCBmaWxlID0gbmV3IEZpbGUoW2ZpbHRlclhsc3hdLCAnZmlsdGVyLnhsc3gnKTtcbiAgZGF0YS5hcHBlbmQoJ2V4Y2VsRmlsZScsIGZpbGUpO1xuXG4gIHJldHVybiBodHRwLnBvc3QoJ2h0dHBzOi8vZm9ybWNvbnYuaGVyb2t1YXBwLmNvbS9yZXN1bHQuanNvbicsIGRhdGEpO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRDaGFydChuYW1lOiBzdHJpbmcsIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBjb25zdCBvcHRpb25MYWJlbHMgPSBbJ2NoYXJ0VHlwZScsICd0aXRsZSddO1xuICBjb25zdCBjaGFydE9wdGlvbnM6IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9ID0ge307XG4gIGNvbnN0IGRhdGFzZXRPYmo6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gIGNvbnN0IGRhdGFzZXQ6IEFqZkNoYXJ0RGF0YXNldFtdID0gW107XG4gIGxldCBsYWJlbHM6IEFqZkZvcm11bGEgPSB7Zm9ybXVsYTogJ1tdJ307XG5cbiAgaWYgKGpzb24ubGVuZ3RoID4gMCkge1xuICAgIGNvbnN0IGZpcnN0Um93ID0ganNvblswXTtcbiAgICBvcHRpb25MYWJlbHMuZm9yRWFjaChvcHRpb25MYWJlbCA9PiB7XG4gICAgICBpZiAoZmlyc3RSb3dbb3B0aW9uTGFiZWxdICE9IG51bGwpIHtcbiAgICAgICAgY2hhcnRPcHRpb25zW29wdGlvbkxhYmVsXSA9IGZpcnN0Um93W29wdGlvbkxhYmVsXTtcbiAgICAgICAgZGVsZXRlIGZpcnN0Um93W29wdGlvbkxhYmVsXTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuICBqc29uLmZvckVhY2gocm93ID0+IHtcbiAgICBjb25zdCByb3dLZXlzID0gT2JqZWN0LmtleXMocm93KTtcbiAgICByb3dLZXlzLmZvckVhY2gocm93S2V5ID0+IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gcm93W3Jvd0tleV07XG4gICAgICBpZiAoZGF0YXNldE9ialtyb3dLZXldID09IG51bGwpIHtcbiAgICAgICAgZGF0YXNldE9ialtyb3dLZXldID0gW3ZhbHVlXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRhdGFzZXRPYmpbcm93S2V5XS5wdXNoKHZhbHVlKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG4gIGNvbnN0IGRvTGFiZWxzID0gZGF0YXNldE9ialsnbGFiZWxzJ107XG4gIGlmIChkb0xhYmVscyAhPSBudWxsKSB7XG4gICAgbGV0IGxhYmVsc0pzOiBzdHJpbmc7XG4gICAgdHJ5IHtcbiAgICAgIGxhYmVsc0pzID0gaW5kaWNhdG9yVG9KcygnWycgKyBkb0xhYmVscy5qb2luKCkgKyAnXScpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGluIFwibGFiZWxzXCIgb2YgY2hhcnQgXCIke2NoYXJ0T3B0aW9uc1sndGl0bGUnXX1cIjogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgIHdpbmRvdy5hbGVydChlcnIubWVzc2FnZSk7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIGxhYmVscyA9IHtmb3JtdWxhOiBgcGxhaW5BcnJheSgke2xhYmVsc0pzfSlgfTtcbiAgICBkZWxldGUgZGF0YXNldE9ialsnbGFiZWxzJ107XG4gIH1cbiAgT2JqZWN0LmtleXMoZGF0YXNldE9iaikuZm9yRWFjaCgoZGF0YXNldE9iaktleSwgaW5kZXgpID0+IHtcbiAgICBsZXQgZGF0YXNldEpzOiBzdHJpbmc7XG4gICAgdHJ5IHtcbiAgICAgIGRhdGFzZXRKcyA9IGluZGljYXRvclRvSnMoJ1snICsgZGF0YXNldE9ialtkYXRhc2V0T2JqS2V5XS5qb2luKCkgKyAnXScpO1xuICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgIGBFcnJvciBpbiBcIiR7ZGF0YXNldE9iaktleX1cIiBvZiBjaGFydCBcIiR7Y2hhcnRPcHRpb25zWyd0aXRsZSddfVwiOiAke2Vyci5tZXNzYWdlfWAsXG4gICAgICApO1xuICAgICAgd2luZG93LmFsZXJ0KGVyci5tZXNzYWdlKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICBjb25zdCBjaGFydFR5cGUgPSBjaGFydE9wdGlvbnNbJ2NoYXJ0VHlwZSddO1xuICAgIGNvbnN0IGNvbG9yQ29uZGl0aW9uID1cbiAgICAgIGNoYXJ0VHlwZSA9PT0gJ1BpZScgfHwgY2hhcnRUeXBlID09PSAnUG9sYXJBcmVhJyB8fCBjaGFydFR5cGUgPT09ICdEb3VnaG51dCc7XG4gICAgY29uc3QgYmFja0NvbG9yID0gY29sb3JDb25kaXRpb24gPyBiYWNrZ3JvdW5kQ29sb3IgOiBiYWNrZ3JvdW5kQ29sb3JbaW5kZXhdO1xuICAgIGNvbnN0IGZvcm11bGE6IEFqZkZvcm11bGFbXSA9IFtcbiAgICAgIGNyZWF0ZUZvcm11bGEoe1xuICAgICAgICBmb3JtdWxhOiBgcGxhaW5BcnJheSgke2RhdGFzZXRKc30pYCxcbiAgICAgIH0pLFxuICAgIF07XG4gICAgY29uc3QgZGF0YXNldE9wdGlvbnM6IEFqZkNoYXJ0RGF0YXNldE9wdGlvbnMgPSB7XG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tDb2xvciBhcyBDaGFydENvbG9yLFxuICAgIH07XG4gICAgZGF0YXNldC5wdXNoKHtcbiAgICAgIC4uLmNyZWF0ZURhdGFzZXQoe1xuICAgICAgICBhZ2dyZWdhdGlvbjoge2FnZ3JlZ2F0aW9uOiAwfSxcbiAgICAgICAgZm9ybXVsYSxcbiAgICAgICAgbGFiZWw6IGRhdGFzZXRPYmpLZXksXG4gICAgICB9KSxcbiAgICAgIG9wdGlvbnM6IGRhdGFzZXRPcHRpb25zLFxuICAgIH0gYXMgQWpmQ2hhcnREYXRhc2V0KTtcbiAgfSk7XG5cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgbmFtZSxcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNoYXJ0LFxuICAgIHR5cGU6IEFqZkNoYXJ0VHlwZVtjaGFydE9wdGlvbnNbJ2NoYXJ0VHlwZSddIGFzIGFueV0gYXMgdW5rbm93biBhcyBBamZDaGFydFR5cGUsXG4gICAgbGFiZWxzLFxuICAgIGRhdGFzZXQsXG4gICAgb3B0aW9uczoge1xuICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgICAgbGVnZW5kOiB7ZGlzcGxheTogdHJ1ZSwgcG9zaXRpb246ICdib3R0b20nfSxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICAgIHRleHQ6IGNoYXJ0T3B0aW9uc1sndGl0bGUnXSB8fCAnJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIC4uLnt3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICcxMDAlJywgcGFkZGluZzogJzIwcHgnfSxcbiAgICAgIC4uLndpZGdldFN0eWxlLFxuICAgIH0sXG4gICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRHcmFwaChuYW1lOiBzdHJpbmcsIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBjb25zdCBub2RlczogQWpmR3JhcGhOb2RlRGF0YXNldFtdID0gW107XG5cbiAganNvbi5mb3JFYWNoKHJvdyA9PiB7XG4gICAgY29uc3Qgcm93S2V5cyA9IE9iamVjdC5rZXlzKHJvdyk7XG4gICAgaWYgKHJvd0tleXMuaW5jbHVkZXMoJ2lkJykgJiYgcm93WydpZCddKSB7XG4gICAgICBjb25zdCByb3dJZCA9IHJvd1snaWQnXS50cmltKCkucmVwbGFjZSgvXCIvZywgJycpO1xuICAgICAgaWYgKHJvd0lkICYmIHJvd0lkLmxlbmd0aCkge1xuICAgICAgICBsZXQgZ3JhcGhOb2RlT2JqOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICAgICAgICByb3dLZXlzLmZvckVhY2gocm93S2V5ID0+IHtcbiAgICAgICAgICBsZXQganM6IHN0cmluZztcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAganMgPSBpbmRpY2F0b3JUb0pzKHJvd1tyb3dLZXldKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICAgICAgY29uc3Qgcm93TnVtID0gcm93WydfX3Jvd051bV9fJ107XG4gICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBFcnJvciBpbiBcIiR7bmFtZX1cIiwgcm93ICR7cm93TnVtfSwgY29sdW1uIFwiJHtyb3dLZXl9XCI6ICR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBncmFwaE5vZGVPYmpbcm93S2V5XSA9IGpzO1xuICAgICAgICB9KTtcbiAgICAgICAgZ3JhcGhOb2RlT2JqWydpZCddID0gcm93SWQ7XG4gICAgICAgIG5vZGVzLnB1c2goZ3JhcGhOb2RlT2JqIGFzIEFqZkdyYXBoTm9kZURhdGFzZXQpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5HcmFwaCxcbiAgICBub2RlcyxcbiAgICBzdHlsZXM6IHt9LFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZEh0bWwoanNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGNvbnN0IGZpcnN0Um93ID0ganNvbi5sZW5ndGggPiAwICYmIGpzb25bMF1bJ2h0bWwnXSAhPSBudWxsID8ganNvblswXSA6IHtodG1sOiAnJ307XG5cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgIGh0bWxUZXh0OiBTdHJpbmcoZmlyc3RSb3dbJ2h0bWwnXSksXG4gICAgc3R5bGVzOiBodG1sV2lkZ2V0LFxuICB9KTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkVGFibGUoXG4gIHNoZWV0TmFtZTogc3RyaW5nLFxuICBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbn1bXSxcbik6IEFqZldpZGdldCB7XG4gIGxldCB0YWJsZUhlYWRlcjogQWpmVGFibGVEYXRhc2V0W10gPSBbXTtcbiAgbGV0IGRhdGFSb3dzID0gJ1tdJztcbiAgbGV0IGZvcm11bGEgPSAnJztcbiAgbGV0IHBhZ2VTaXplID0gMTA7XG4gIGxldCBwYWdpbmF0aW9uID0gZmFsc2U7XG4gIGlmIChqc29uLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCByb3dzcGFuID0gMTtcbiAgICBjb25zdCB0aXRsZXMgPSBPYmplY3Qua2V5cyhqc29uWzBdKTtcbiAgICBjb25zdCBjb2xzcGFuczogbnVtYmVyW10gPSAoT2JqZWN0LnZhbHVlcyhqc29uWzBdKSBhcyBzdHJpbmdbXSkubWFwKHIgPT4gK3IuY2hhckF0KDApKTtcbiAgICBjb25zdCB0ZXh0QWxpZ246IHN0cmluZ1tdID0gKE9iamVjdC52YWx1ZXMoanNvblswXSkgYXMgc3RyaW5nW10pLm1hcChyID0+IHtcbiAgICAgIHN3aXRjaCAoci5jaGFyQXQoMSkpIHtcbiAgICAgICAgY2FzZSAnbCc6XG4gICAgICAgICAgcmV0dXJuICdsZWZ0JztcbiAgICAgICAgY2FzZSAncic6XG4gICAgICAgICAgcmV0dXJuICdyaWdodCc7XG4gICAgICAgIGNhc2UgJ2MnOlxuICAgICAgICAgIHJldHVybiAnY2VudGVyJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJ2NlbnRlcic7XG4gICAgICB9XG4gICAgfSk7XG4gICAgdGFibGVIZWFkZXIgPSB0aXRsZXMubWFwKCh0aXRsZSwgaW5kZXgpID0+ICh7XG4gICAgICBsYWJlbDogJycsXG4gICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogYFwiJHt0aXRsZX1cImB9LFxuICAgICAgYWdncmVnYXRpb246IHthZ2dyZWdhdGlvbjogMH0sXG4gICAgICBjb2xzcGFuOiBjb2xzcGFuc1tpbmRleF0sXG4gICAgICByb3dzcGFuLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzNmNTFiNScsXG4gICAgICAgIGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZGRkJyxcbiAgICAgIH0sXG4gICAgfSkpO1xuICAgIHBhZ2luYXRpb24gPSBqc29uWzFdWydwYWdpbmF0aW9uJ10gPyAoanNvblsxXVsncGFnaW5hdGlvbiddIGFzIGJvb2xlYW4pIDogZmFsc2U7XG5cbiAgICBpZiAoJ2RhdGFzZXQnIGluIGpzb25bMV0pIHtcbiAgICAgIGZvcm11bGEgPSBfYnVpbGRGb3JtTGlzdFRhYmxlKGpzb24sIGNvbHNwYW5zLCB0ZXh0QWxpZ24pO1xuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUganNvblswXTtcbiAgICAgIGNvbnNvbGUubG9nKGpzb24pO1xuICAgICAgZGF0YVJvd3MgPSAnWyc7XG4gICAgICBqc29uLmZvckVhY2gocm93ID0+IHtcbiAgICAgICAgbGV0IGRhdGFSb3cgPSAnWyc7XG4gICAgICAgIHRpdGxlcy5mb3JFYWNoKHRpdGxlID0+IHtcbiAgICAgICAgICBsZXQgZWxlbSA9IHJvd1t0aXRsZV0gfHwgYCcnYDtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgZWxlbSA9IGluZGljYXRvclRvSnMoZWxlbSBhcyBzdHJpbmcpO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICBjb25zdCByb3dOdW0gPSByb3dbJ19fcm93TnVtX18nXTtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYEVycm9yIGluIFwiJHtzaGVldE5hbWV9XCIsIHJvdyAke3Jvd051bX0sIGNvbHVtbiBcIiR7dGl0bGV9XCI6ICR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgIH1cbiAgICAgICAgICBkYXRhUm93ICs9IGVsZW0gKyAnLCc7XG4gICAgICAgIH0pO1xuICAgICAgICBkYXRhUm93ICs9ICddJztcbiAgICAgICAgZGF0YVJvd3MgKz0gZGF0YVJvdyArICcsJztcbiAgICAgIH0pO1xuICAgICAgZGF0YVJvd3MgKz0gJ10nO1xuICAgICAgZm9ybXVsYSA9IGBidWlsZEFsaWduZWREYXRhc2V0KHBsYWluQXJyYXkoJHtkYXRhUm93c30pLCR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgIGNvbHNwYW5zLFxuICAgICAgKX0sJHtKU09OLnN0cmluZ2lmeSh0ZXh0QWxpZ24pfSlgO1xuICAgIH1cbiAgfVxuXG4gIGlmIChwYWdpbmF0aW9uKSB7XG4gICAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlBhZ2luYXRlZFRhYmxlLFxuICAgICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgICAgcm93RGVmaW5pdGlvbjoge1xuICAgICAgICBmb3JtdWxhOiBmb3JtdWxhLFxuICAgICAgfSxcbiAgICAgIGRhdGFzZXQ6IHRhYmxlSGVhZGVyLFxuICAgICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICAgIGNlbGxTdHlsZXM6IHtcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgIH0sXG4gICAgICBzdHlsZXM6IHtcbiAgICAgICAgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScsXG4gICAgICB9LFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5EeW5hbWljVGFibGUsXG4gICAgICByb3dEZWZpbml0aW9uOiB7XG4gICAgICAgIGZvcm11bGE6IGZvcm11bGEsXG4gICAgICB9LFxuICAgICAgZGF0YXNldDogdGFibGVIZWFkZXIsXG4gICAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgICAgY2VsbFN0eWxlczoge1xuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxuICAgICAgfSxcbiAgICAgIHN0eWxlczoge1xuICAgICAgICBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cbn1cblxuLyoqXG4gKiBDcmVhdGUgYSBmb3JtdWxhIGZvciBhIGR5bmFtaWMgdGFibGUgd2lkZ2V0LCBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXNcbiAqIEBwYXJhbSBqc29uXG4gKiBAcmV0dXJucyB0aGUgZm9ybXVsYSBmb3IgdGhlIER5bmFtaWNUYWJsZSBBamZXaWRnZXQsIGxpa2UgdGhpczpcbiAqIGJ1aWxkRm9ybURhdGFzZXQocHJvamVjdHNEYXRhc2V0LCBbJ2lkX3AnLCdkb25vcnMnLCdidWRnZXQnLCdkaW5vX2FyZWFfbmFtZScsJ2NhbGNfcHJvZ3Jlc3MnLF0pXCJcbiAqL1xuZnVuY3Rpb24gX2J1aWxkRm9ybUxpc3RUYWJsZShcbiAganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW59W10sXG4gIGNvbHNwYW5zOiBudW1iZXJbXSxcbiAgdGV4dEFsaWduOiBzdHJpbmdbXSxcbik6IHN0cmluZyB7XG4gIGxldCBmb3JtdWxhID0gJyc7XG4gIGlmIChqc29uLmxlbmd0aCA+IDEpIHtcbiAgICBsZXQgZmllbGRzID0gJ1snO1xuICAgIE9iamVjdC5rZXlzKGpzb25bMF0pLmZvckVhY2goZmllbGRDb2xOYW1lID0+IHtcbiAgICAgIGxldCBlbGVtID0ganNvblsxXVtmaWVsZENvbE5hbWVdID8gYCcke2pzb25bMV1bZmllbGRDb2xOYW1lXX0nYCA6IGAnJ2A7XG4gICAgICBmaWVsZHMgKz0gZWxlbSArICcsJztcbiAgICB9KTtcbiAgICBmaWVsZHMgKz0gJ10nO1xuICAgIGNvbnN0IGRhdGFzZXQgPSBqc29uWzFdWydkYXRhc2V0J10gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGxpbmtGaWVsZCA9IGpzb25bMV1bJ2xpbmtfZmllbGQnXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgbGlua1BvcyA9IGpzb25bMV1bJ2xpbmtfcG9zaXRpb24nXSA/ICtqc29uWzFdWydsaW5rX3Bvc2l0aW9uJ10gOiAwO1xuICAgIGNvbnN0IHJvd0xpbmsgPVxuICAgICAgbGlua0ZpZWxkICYmIGxpbmtGaWVsZC5sZW5ndGggPyBgeydsaW5rJzogJyR7bGlua0ZpZWxkfScsICdwb3NpdGlvbic6ICR7bGlua1Bvc319YCA6IG51bGw7XG5cbiAgICBmb3JtdWxhID0gYGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0KCR7ZGF0YXNldH0sICR7ZmllbGRzfSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgIGNvbHNwYW5zLFxuICAgICl9LCAke0pTT04uc3RyaW5naWZ5KHRleHRBbGlnbil9LCAke3Jvd0xpbmt9KWA7XG4gIH1cbiAgcmV0dXJuIGZvcm11bGE7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgd2lkZ2V0IHdpdGggYSBkeW5hbWljIHBhZ2luYXRlZCB0YWJsZSBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMuIEVhY2ggcm93IGlzIGFuIEFqZlRhYmxlLlxuICogQHBhcmFtIHNoZWV0TmFtZVxuICogQHBhcmFtIGpzb25cbiAqIEByZXR1cm5zIGEgUGFnaW5hdGVkIEFqZldpZGdldCB3aXRoIGEgZm9ybXVsYSBsaWtlIHRoaXM6XG4gKiBidWlsZFdpZGdldERhdGFzZXQocHJvamVjdHNEYXRhc2V0LCBbJ2lkX3AnLCdkb25vcnMnLCdidWRnZXQnLCdkaW5vX2FyZWFfbmFtZScsJ2NhbGNfcHJvZ3Jlc3MnLCdob21lX2xpbmtfdGV4dCcsXSxcbiAqICAgeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDV9LCB7J2JvcmRlcic6ICdub25lJ30seyd3aWR0aCc6ICc5MDBweCd9LCBbJzEwJScsJzMwJScsJzEwJScsJzI1JScsJzE1JScsJzEwJSddLCBcXFwiI2YwZjBmMFxcXCIsIFxcXCJ3aGl0ZVxcXCIpXCJcbiAqL1xuZnVuY3Rpb24gX2J1aWxkUGFnaW5hdGVkTGlzdFRhYmxlKF86IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGxldCBmb3JtdWxhID0gJyc7XG4gIGxldCBwYWdlU2l6ZSA9IDEwO1xuICBsZXQgZGF0YXNldDogc3RyaW5nID0gJyc7XG4gIGxldCB0aXRsZSA9ICcnO1xuICBpZiAoanNvbi5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgY29sc1BlcmNlbnRhZ2U6IHN0cmluZyA9IChPYmplY3QudmFsdWVzKGpzb25bMF0pIGFzIHN0cmluZ1tdKVxuICAgICAgLm1hcChyID0+IGAnJHtyfSUnYClcbiAgICAgIC5qb2luKCcsJyk7XG4gICAgY29uc3QgY29sc1BlcmNlbnRhZ2VBcnJheSA9IGBbJHtjb2xzUGVyY2VudGFnZX1dYDtcblxuICAgIGxldCBmaWVsZHMgPSAnWyc7XG4gICAgT2JqZWN0LmtleXMoanNvblswXSkuZm9yRWFjaChmaWVsZENvbE5hbWUgPT4ge1xuICAgICAgbGV0IGVsZW0gPSBqc29uWzFdW2ZpZWxkQ29sTmFtZV0gPyBgJyR7anNvblsxXVtmaWVsZENvbE5hbWVdfSdgIDogYCcnYDtcbiAgICAgIGZpZWxkcyArPSBlbGVtICsgJywnO1xuICAgIH0pO1xuICAgIGZpZWxkcyArPSAnXSc7XG5cbiAgICBkYXRhc2V0ID0ganNvblsxXVsnZGF0YXNldCddIGFzIHN0cmluZztcbiAgICB0aXRsZSA9IGpzb25bMV1bJ3RpdGxlJ10gYXMgc3RyaW5nO1xuICAgIHBhZ2VTaXplID0ganNvblsxXVsncGFnZVNpemUnXSA/ICtqc29uWzFdWydwYWdlU2l6ZSddIDogMTA7XG4gICAgY29uc3QgbGlua0ZpZWxkID0ganNvblsxXVsnbGlua19maWVsZCddIGFzIHN0cmluZztcbiAgICBjb25zdCBsaW5rUG9zID0ganNvblsxXVsnbGlua19wb3NpdGlvbiddID8gK2pzb25bMV1bJ2xpbmtfcG9zaXRpb24nXSA6IDA7XG4gICAgY29uc3Qgcm93TGluayA9XG4gICAgICBsaW5rRmllbGQgJiYgbGlua0ZpZWxkLmxlbmd0aCA/IGB7J2xpbmsnOiAnJHtsaW5rRmllbGR9JywgJ3Bvc2l0aW9uJzogJHtsaW5rUG9zfX1gIDogbnVsbDtcbiAgICBjb25zdCBjZWxsU3R5bGVzID0ganNvblsxXVsnY2VsbFN0eWxlcyddO1xuICAgIGNvbnN0IHJvd1N0eWxlID0ganNvblsxXVsncm93U3R5bGUnXTtcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JBID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQSddIGFzIHN0cmluZztcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JCID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQiddIGFzIHN0cmluZztcblxuICAgIGZvcm11bGEgPVxuICAgICAgYGJ1aWxkV2lkZ2V0RGF0YXNldCgke2RhdGFzZXR9LCAke2ZpZWxkc30sICR7cm93TGlua30sICR7Y2VsbFN0eWxlc30sYCArXG4gICAgICBgJHtyb3dTdHlsZX0sICR7Y29sc1BlcmNlbnRhZ2VBcnJheX0sICR7SlNPTi5zdHJpbmdpZnkoYmFja2dyb3VuZENvbG9yQSl9LCAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgKX0pYDtcbiAgfVxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlBhZ2luYXRlZExpc3QsXG4gICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgIHRpdGxlOiB0aXRsZSxcbiAgICBjb250ZW50RGVmaW5pdGlvbjoge1xuICAgICAgZm9ybXVsYTogZm9ybXVsYSxcbiAgICB9LFxuICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgc3R5bGVzOiB7XG4gICAgICBoZWlnaHQ6ICc1MDBweCcsXG4gICAgfSxcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgd2lkZ2V0IHdpdGggYSBkeW5hbWljIHBhZ2luYXRlZCB0YWJsZSBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMuIEVhY2ggcm93IGlzIGFuIEFqZkRpYWxvZ1dpZGdldCB3aXRoIGFuIEFqZlRhYmxlXG4gKiB0aGF0IG9wZW4sIG9uIGNsaWNrLCBhIGRpYWxvZy5cbiAqIEBwYXJhbSBzaGVldE5hbWVcbiAqIEBwYXJhbSBqc29uXG4gKiBAcmV0dXJucyBhIFBhZ2luYXRlZCBBamZXaWRnZXQgd2l0aCBhIGZvcm11bGEgbGlrZSB0aGlzOlxuICogYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZyhwcm9qZWN0c0RhdGFzZXQsIFsnaWRfcCcsJ2Rvbm9ycycsJ3Byb3ZpbmNlX2Nob2ljZXNMYWJlbCcsJ2Rpbm9fYXJlYV9uYW1lJywnY2FsY19wcm9ncmVzcycsJ2hvbWVfbGlua190ZXh0JyxdLFxuICogIFsnaWRfcCcsJ2Rvbm9ycycsJ3Byb3ZpbmNlX2Nob2ljZXNMYWJlbCcsJ2Rpbm9fYXJlYV9uYW1lJ10sIFsnQ29kaWNlIHByb2dldHRvJywnRG9ub3JzJywnUHJvdmluY2VzJywnU2V0dG9yZSBkaSBhdHRpdml0YSddLFxuICogIHsnYm9yZGVyJzogJ25vbmUnfSx7J3dpZHRoJzogJzkwMHB4J30sIFsnMTAlJywnMzAlJywnMTAlJywnMjUlJywnMTUlJywnMTAlJ10sIFxcXCIjZjBmMGYwXFxcIiwgXFxcIndoaXRlXFxcIilcbiAqL1xuZnVuY3Rpb24gX2J1aWxkUGFnaW5hdGVkTGlzdFRhYmxlV2l0aERpYWxvZyhfOiBzdHJpbmcsIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBsZXQgZm9ybXVsYSA9ICcnO1xuICBsZXQgcGFnZVNpemUgPSAxMDtcbiAgbGV0IGRhdGFzZXQ6IHN0cmluZyA9ICcnO1xuICBsZXQgdGl0bGUgPSAnJztcbiAgaWYgKGpzb24ubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGNvbHNQZXJjZW50YWdlOiBzdHJpbmcgPSAoT2JqZWN0LnZhbHVlcyhqc29uWzBdKSBhcyBzdHJpbmdbXSlcbiAgICAgIC5tYXAociA9PiBgJyR7cn0lJ2ApXG4gICAgICAuam9pbignLCcpO1xuICAgIGNvbnN0IGNvbHNQZXJjZW50YWdlQXJyYXkgPSBgWyR7Y29sc1BlcmNlbnRhZ2V9XWA7XG5cbiAgICBsZXQgZmllbGRzID0gJ1snO1xuICAgIE9iamVjdC5rZXlzKGpzb25bMF0pLmZvckVhY2goZmllbGRDb2xOYW1lID0+IHtcbiAgICAgIGxldCBlbGVtID0ganNvblsxXVtmaWVsZENvbE5hbWVdID8gYCcke2pzb25bMV1bZmllbGRDb2xOYW1lXX0nYCA6IGAnJ2A7XG4gICAgICBmaWVsZHMgKz0gZWxlbSArICcsJztcbiAgICB9KTtcbiAgICBmaWVsZHMgKz0gJ10nO1xuXG4gICAgbGV0IGRpYWxvZ0ZpZWxkcyA9ICdbJztcbiAgICBsZXQgZGlhbG9nTGFiZWxGaWVsZHMgPSAnWyc7XG4gICAgaWYgKGpzb24ubGVuZ3RoID4gMykge1xuICAgICAgZGlhbG9nTGFiZWxGaWVsZHMgKz0gKE9iamVjdC52YWx1ZXMoanNvblsyXSkgYXMgc3RyaW5nW10pLm1hcCh2ID0+IGAnJHt2fSdgKS5qb2luKCcsJyk7XG4gICAgICBkaWFsb2dGaWVsZHMgKz0gKE9iamVjdC52YWx1ZXMoanNvblszXSkgYXMgc3RyaW5nW10pLm1hcCh2ID0+IGAnJHt2fSdgKS5qb2luKCcsJyk7XG4gICAgfVxuICAgIGRpYWxvZ0ZpZWxkcyArPSAnXSc7XG4gICAgZGlhbG9nTGFiZWxGaWVsZHMgKz0gJ10nO1xuXG4gICAgZGF0YXNldCA9IGpzb25bMV1bJ2RhdGFzZXQnXSBhcyBzdHJpbmc7XG4gICAgdGl0bGUgPSBqc29uWzFdWyd0aXRsZSddIGFzIHN0cmluZztcbiAgICBwYWdlU2l6ZSA9IGpzb25bMV1bJ3BhZ2VTaXplJ10gPyAranNvblsxXVsncGFnZVNpemUnXSA6IDEwO1xuICAgIGNvbnN0IGNlbGxTdHlsZXMgPSBqc29uWzFdWydjZWxsU3R5bGVzJ107XG4gICAgY29uc3Qgcm93U3R5bGUgPSBqc29uWzFdWydyb3dTdHlsZSddO1xuICAgIGNvbnN0IGJhY2tncm91bmRDb2xvckEgPSBqc29uWzFdWydiYWNrZ3JvdW5kQ29sb3JBJ10gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGJhY2tncm91bmRDb2xvckIgPSBqc29uWzFdWydiYWNrZ3JvdW5kQ29sb3JCJ10gYXMgc3RyaW5nO1xuXG4gICAgZm9ybXVsYSA9XG4gICAgICBgYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZygke2RhdGFzZXR9LCAke2ZpZWxkc30sICR7ZGlhbG9nRmllbGRzfSwgJHtkaWFsb2dMYWJlbEZpZWxkc30sICR7Y2VsbFN0eWxlc30sYCArXG4gICAgICBgJHtyb3dTdHlsZX0sICR7Y29sc1BlcmNlbnRhZ2VBcnJheX0sICR7SlNPTi5zdHJpbmdpZnkoYmFja2dyb3VuZENvbG9yQSl9LCAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgKX0pYDtcbiAgfVxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlBhZ2luYXRlZExpc3QsXG4gICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgIHRpdGxlOiB0aXRsZSxcbiAgICBjb250ZW50RGVmaW5pdGlvbjoge1xuICAgICAgZm9ybXVsYTogZm9ybXVsYSxcbiAgICB9LFxuICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgc3R5bGVzOiB7XG4gICAgICBoZWlnaHQ6ICc1MDBweCcsXG4gICAgfSxcbiAgfSk7XG59XG5cbmNvbnN0IF9idWlsZEhlYXRtYXAgPSAoXzogc3RyaW5nLCBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0ID0+IHtcbiAgY29uc3QgZGVmYXVsdEZlYXR1cmVzID0ge1xuICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgZmVhdHVyZXM6IFtdLFxuICB9O1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHZhbHVlczogJ1tdJyxcbiAgICBpZFByb3A6ICdpZCcsXG4gICAgZmVhdHVyZXM6IEpTT04uc3RyaW5naWZ5KGRlZmF1bHRGZWF0dXJlcyksXG4gICAgc3RhcnRDb2xvcjogJyNmZmViM2InLFxuICAgIGVuZENvbG9yOiAnI2Y0NDMzNicsXG4gICAgaGlnaGxpZ2h0Q29sb3I6ICcjMDA5Njg4JyxcbiAgICBzaG93VmlzdWFsTWFwOiBmYWxzZSxcbiAgICAuLi4oanNvbi5sZW5ndGggPiAwID8ganNvblswXSA6IHt9KSxcbiAgfTtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5IZWF0TWFwLFxuICAgIC4uLm9wdGlvbnMsXG4gICAgdmFsdWVzOiB7Zm9ybXVsYTogb3B0aW9ucy52YWx1ZXN9LFxuICAgIHN0eWxlczoge1xuICAgICAgbWluSGVpZ2h0OiAnMjAwcHgnLFxuICAgIH0sXG4gIH0pO1xufTtcbiJdfQ==