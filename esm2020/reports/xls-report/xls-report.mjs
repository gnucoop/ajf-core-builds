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
        const colspanRowValues = Object.values(json[0]).map(v => (v ? v.toString() : ''));
        const colspans = colspanRowValues.map(r => +r.charAt(0));
        const textAlign = colspanRowValues.map(r => {
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
            const dialogFields = json[1]['dialog_fields']
                ? json[1]['dialog_fields'].split(',').map(v => v.trim())
                : [];
            const dialogLabelFields = json[1]['dialog_fields_labels']
                ? json[1]['dialog_fields_labels'].split(',').map(v => v.trim())
                : [];
            formula = _buildFormListTable(json, colspans, textAlign, dialogFields, dialogLabelFields);
            if (dialogFields && dialogFields.length) {
                tableHeader.push({
                    label: '',
                    formula: { formula: `" "` },
                    aggregation: { aggregation: 0 },
                    colspan: 1,
                    rowspan,
                    style: {
                        textAlign: 'center',
                        fontWeight: 'bold',
                        color: 'white',
                        backgroundColor: '#3f51b5',
                        borderBottom: '2px solid #ddd',
                    },
                });
            }
        }
        else {
            delete json[0];
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
function _buildFormListTable(json, colspans, textAlign, dialogFields, dialogLabelFields) {
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
        formula = `buildAlignedFormDataset(${dataset}, ${fields}, ${JSON.stringify(colspans)}, ${JSON.stringify(textAlign)}, ${rowLink}, ${JSON.stringify(dialogFields)}, ${JSON.stringify(dialogLabelFields)})`;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzLXJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMveGxzLXJlcG9ydC94bHMtcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBYSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHekMsT0FBTyxFQUFDLFFBQVEsRUFBYyxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25DLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBSS9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQVE1RDs7R0FFRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBWSxFQUFFLElBQWdCO0lBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDbkQs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LFVBQVUsRUFBRSxhQUFhLENBQUMsT0FBTztRQUNqQyxHQUFHLE9BQU87UUFDVixNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLE1BQU0sRUFBQztRQUNqQyxNQUFNLEVBQUU7WUFDTixTQUFTLEVBQUUsT0FBTztTQUNuQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGb3JtdWxhLCBjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge0h0dHBDbGllbnR9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7Q2hhcnRDb2xvcn0gZnJvbSAnY2hhcnQuanMnO1xuaW1wb3J0IHtmb3JrSm9pbiwgT2JzZXJ2YWJsZSwgb2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHttYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcbmltcG9ydCAqIGFzIFhMU1ggZnJvbSAneGxzeCc7XG5cbmltcG9ydCB7YmFja2dyb3VuZENvbG9yfSBmcm9tICcuLi9hdXRvbWF0aWMtcmVwb3J0L3N0eWxlcyc7XG5cbmltcG9ydCB7aW5kaWNhdG9yVG9Kc30gZnJvbSAnLi9oaW5kaWtpdC1wYXJzZXInO1xuaW1wb3J0IHtodG1sV2lkZ2V0LCB3aWRnZXRTdHlsZX0gZnJvbSAnLi9zdHlsZXMnO1xuaW1wb3J0IHtjcmVhdGVEYXRhc2V0fSBmcm9tICcuLi91dGlscy9kYXRhc2V0L2NyZWF0ZS1kYXRhc2V0JztcbmltcG9ydCB7Y3JlYXRlUmVwb3J0Q29udGFpbmVyfSBmcm9tICcuLi91dGlscy9yZXBvcnRzL2NyZWF0ZS1yZXBvcnQtY29udGFpbmVyJztcbmltcG9ydCB7QWpmV2lkZ2V0Q3JlYXRlLCBjcmVhdGVXaWRnZXR9IGZyb20gJy4uL3V0aWxzL3dpZGdldHMvY3JlYXRlLXdpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcbmltcG9ydCB7QWpmVGFibGVEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC90YWJsZS1kYXRhc2V0JztcbmltcG9ydCB7QWpmQ2hhcnREYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9jaGFydC1kYXRhc2V0JztcbmltcG9ydCB7QWpmQ2hhcnREYXRhc2V0T3B0aW9uc30gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvY2hhcnQtZGF0YXNldC1vcHRpb25zJztcbmltcG9ydCB7QWpmQ2hhcnRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvY2hhcnRzL2NoYXJ0LXR5cGUnO1xuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldCc7XG5pbXBvcnQge0FqZlJlcG9ydH0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0JztcbmltcG9ydCB7QWpmUmVwb3J0VmFyaWFibGV9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC12YXJpYWJsZSc7XG5pbXBvcnQge0FqZkxheW91dFdpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvbGF5b3V0LXdpZGdldCc7XG5pbXBvcnQge0FqZkNvbHVtbldpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvY29sdW1uLXdpZGdldCc7XG5pbXBvcnQge0FqZkdyYXBoTm9kZURhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L2dyYXBoLWRhdGFzZXQnO1xuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gYnVpbGRzIGEgcmVwb3J0IGZyb20gYW4gZXhjZWwgZmlsZS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHhsc1JlcG9ydChmaWxlOiBzdHJpbmcsIGh0dHA6IEh0dHBDbGllbnQpOiBPYnNlcnZhYmxlPEFqZlJlcG9ydD4ge1xuICBjb25zdCB3b3JrYm9vayA9IFhMU1gucmVhZChmaWxlLCB7dHlwZTogJ2JpbmFyeSd9KTtcbiAgY29uc3QgcmVwb3J0OiBBamZSZXBvcnQgPSB7fTtcbiAgY29uc3QgcmVwb3J0V2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcblxuICBjb25zdCB2YXJpYWJsZXM6IEFqZlJlcG9ydFZhcmlhYmxlW10gPSBbXTtcbiAgY29uc3QgZmlsdGVyczoge1tzaGVldE5hbWU6IHN0cmluZ106IE9ic2VydmFibGU8YW55Pn0gPSB7fTtcbiAgLy8gY3JlYXRlIGZpbHRlcnNcbiAgd29ya2Jvb2suU2hlZXROYW1lcy5mb3JFYWNoKChzaGVldE5hbWUsIGluZGV4KSA9PiB7XG4gICAgY29uc3Qgc2hlZXQ6IFhMU1guV29ya1NoZWV0ID0gd29ya2Jvb2suU2hlZXRzW3NoZWV0TmFtZV07XG4gICAgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnZmlsdGVyJykgJiYgaW5kZXggKyAxIDwgd29ya2Jvb2suU2hlZXROYW1lcy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IG5leHRTaGVldCA9IHNoZWV0TmFtZS5pbmNsdWRlcygnZ2xvYmFsJylcbiAgICAgICAgPyAnZ2xvYmFsX2ZpbHRlcidcbiAgICAgICAgOiB3b3JrYm9vay5TaGVldE5hbWVzW2luZGV4ICsgMV07XG4gICAgICBmaWx0ZXJzW25leHRTaGVldF0gPSBfYnVpbGRGaWx0ZXIod29ya2Jvb2ssIHNoZWV0LCBodHRwKTtcbiAgICB9XG4gIH0pO1xuXG4gIGNvbnN0IG9ic0ZpbHRlclZhbHVlczogT2JzZXJ2YWJsZTxhbnk+W10gPSBPYmplY3QudmFsdWVzKGZpbHRlcnMpLmxlbmd0aFxuICAgID8gT2JqZWN0LnZhbHVlcyhmaWx0ZXJzKVxuICAgIDogW29mKHt9KV07XG4gIGNvbnN0IGZpbHRlck5hbWVzOiBzdHJpbmdbXSA9IE9iamVjdC5rZXlzKGZpbHRlcnMpO1xuXG4gIHJldHVybiBmb3JrSm9pbihvYnNGaWx0ZXJWYWx1ZXMpLnBpcGUoXG4gICAgbWFwKGYgPT4ge1xuICAgICAgd29ya2Jvb2suU2hlZXROYW1lcy5mb3JFYWNoKHNoZWV0TmFtZSA9PiB7XG4gICAgICAgIGNvbnN0IHNoZWV0OiBYTFNYLldvcmtTaGVldCA9IHdvcmtib29rLlNoZWV0c1tzaGVldE5hbWVdO1xuICAgICAgICBjb25zdCBqc29uID0gWExTWC51dGlscy5zaGVldF90b19qc29uKHNoZWV0KSBhcyB7XG4gICAgICAgICAgbmFtZTogc3RyaW5nO1xuICAgICAgICAgIHZhbHVlOiBzdHJpbmc7XG4gICAgICAgICAgX19yb3dOdW1fXzogc3RyaW5nO1xuICAgICAgICB9W107XG5cbiAgICAgICAgaWYgKHNoZWV0TmFtZSA9PT0gJ3ZhcmlhYmxlcycpIHtcbiAgICAgICAgICBqc29uXG4gICAgICAgICAgICAuZmlsdGVyKGUgPT4gZSAhPSBudWxsICYmIGUubmFtZSAhPSBudWxsICYmIGUubmFtZSAhPT0gJycpXG4gICAgICAgICAgICAuZm9yRWFjaChlbGVtID0+IHtcbiAgICAgICAgICAgICAgbGV0IGpzOiBzdHJpbmc7XG4gICAgICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICAgICAganMgPSBpbmRpY2F0b3JUb0pzKGVsZW0udmFsdWUpO1xuICAgICAgICAgICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHIgPSBlbGVtLl9fcm93TnVtX187XG4gICAgICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKGBFcnJvciBpbiB2YXJpYWJsZSBcIiR7ZWxlbS5uYW1lfVwiIChyb3cgJHtyfSk6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICAgICAgICAgICAgd2luZG93LmFsZXJ0KGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgdmFyaWFibGVzLnB1c2goe1xuICAgICAgICAgICAgICAgIG5hbWU6IGVsZW0ubmFtZSxcbiAgICAgICAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYToganN9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGNvbnN0IGlkeCA9IGZpbHRlck5hbWVzLmluZGV4T2Yoc2hlZXROYW1lKTtcblxuICAgICAgICAgIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ3RhYmxlJykpIHtcbiAgICAgICAgICAgIGNvbnN0IHRhYmxlV2lkZ2V0ID0gX2J1aWxkVGFibGUoc2hlZXROYW1lLCBqc29uKTtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHMucHVzaCh0YWJsZVdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ2NoYXJ0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYXJ0V2lkZ2V0ID0gX2J1aWxkQ2hhcnQoc2hlZXROYW1lLCBqc29uKTtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHMucHVzaChjaGFydFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ2h0bWwnKSkge1xuICAgICAgICAgICAgY29uc3QgY2hhcnRXaWRnZXQgPSBfYnVpbGRIdG1sKGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGNoYXJ0V2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnZ3JhcGgnKSkge1xuICAgICAgICAgICAgY29uc3QgZ3JhcGhXaWRnZXQgPSBfYnVpbGRHcmFwaChzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGdyYXBoV2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnaGVhdG1hcCcpKSB7XG4gICAgICAgICAgICBjb25zdCBoZWF0bWFwV2lkZ2V0ID0gX2J1aWxkSGVhdG1hcChzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGhlYXRtYXBXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdwYWdpbmF0ZWRsaXN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ0xpc3RXaWRnZXQgPSBfYnVpbGRQYWdpbmF0ZWRMaXN0VGFibGUoc2hlZXROYW1lLCBqc29uKTtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHMucHVzaChwYWdMaXN0V2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygncGFnaW5hdGVkRGlhbG9nTGlzdCcpKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdMaXN0V2lkZ2V0ID0gX2J1aWxkUGFnaW5hdGVkTGlzdFRhYmxlV2l0aERpYWxvZyhzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKHBhZ0xpc3RXaWRnZXQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpZHggPj0gMCkge1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0c1tyZXBvcnRXaWRnZXRzLmxlbmd0aCAtIDFdLmZpbHRlciA9IHtcbiAgICAgICAgICAgICAgc2NoZW1hOiBmW2lkeF0gYXMgYW55LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgY29uc3QgZ2xvYmFsRmlsdGVySWR4ID0gZmlsdGVyTmFtZXMuaW5kZXhPZignZ2xvYmFsX2ZpbHRlcicpO1xuICAgICAgY29uc3QgbGF5b3V0V2lkZ2V0OiBBamZMYXlvdXRXaWRnZXQgPSB7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuTGF5b3V0LFxuICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgY29udGVudDogWy4uLnJlcG9ydFdpZGdldHNdLFxuICAgICAgICAgICAgZmlsdGVyOiBnbG9iYWxGaWx0ZXJJZHggPj0gMCA/IHtzY2hlbWE6IGZbZ2xvYmFsRmlsdGVySWR4XX0gOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSBhcyBBamZDb2x1bW5XaWRnZXQpLFxuICAgICAgICBdLFxuICAgICAgICBjb2x1bW5zOiBbMV0sXG4gICAgICAgIHZpc2liaWxpdHk6IHtcbiAgICAgICAgICBjb25kaXRpb246ICd0cnVlJyxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGVzOiB7fSxcbiAgICAgIH07XG5cbiAgICAgIHJlcG9ydC52YXJpYWJsZXMgPSB2YXJpYWJsZXM7XG4gICAgICByZXBvcnQuY29udGVudCA9IGNyZWF0ZVJlcG9ydENvbnRhaW5lcihsYXlvdXRXaWRnZXQpO1xuXG4gICAgICByZXR1cm4gcmVwb3J0O1xuICAgIH0pLFxuICApO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRGaWx0ZXIoXG4gIHdib29rOiBYTFNYLldvcmtCb29rLFxuICBzaGVldDogWExTWC5Xb3JrU2hlZXQsXG4gIGh0dHA6IEh0dHBDbGllbnQsXG4pOiBPYnNlcnZhYmxlPGFueT4ge1xuICBjb25zdCBkYXRhID0gbmV3IEZvcm1EYXRhKCk7XG4gIGNvbnN0IGZpbHRlckJvb2s6IFhMU1guV29ya0Jvb2sgPSBkZWVwQ29weSh3Ym9vayk7XG4gIGNvbnN0IGZpbHRlclNoZWV0OiBYTFNYLldvcmtTaGVldCA9IGRlZXBDb3B5KHNoZWV0KTtcbiAgY29uc3QgY2hvaWNlc1NoZWV0OiBYTFNYLldvcmtTaGVldCA9IGRlZXBDb3B5KHdib29rLlNoZWV0c1snY2hvaWNlcyddKTtcbiAgZmlsdGVyQm9vay5TaGVldE5hbWVzID0gWydzdXJ2ZXknLCAnY2hvaWNlcyddO1xuICBmaWx0ZXJCb29rLlNoZWV0cyA9IHtzdXJ2ZXk6IGZpbHRlclNoZWV0LCBjaG9pY2VzOiBjaG9pY2VzU2hlZXR9O1xuICBjb25zdCBmaWx0ZXJYbHN4ID0gWExTWC53cml0ZShmaWx0ZXJCb29rLCB7XG4gICAgYm9va1R5cGU6ICd4bHN4JyxcbiAgICB0eXBlOiAnYXJyYXknLFxuICB9KTtcbiAgY29uc3QgZmlsZSA9IG5ldyBGaWxlKFtmaWx0ZXJYbHN4XSwgJ2ZpbHRlci54bHN4Jyk7XG4gIGRhdGEuYXBwZW5kKCdleGNlbEZpbGUnLCBmaWxlKTtcblxuICByZXR1cm4gaHR0cC5wb3N0KCdodHRwczovL2Zvcm1jb252Lmhlcm9rdWFwcC5jb20vcmVzdWx0Lmpzb24nLCBkYXRhKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkQ2hhcnQobmFtZTogc3RyaW5nLCBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgY29uc3Qgb3B0aW9uTGFiZWxzID0gWydjaGFydFR5cGUnLCAndGl0bGUnXTtcbiAgY29uc3QgY2hhcnRPcHRpb25zOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfSA9IHt9O1xuICBjb25zdCBkYXRhc2V0T2JqOiB7W2tleTogc3RyaW5nXTogYW55fSA9IHt9O1xuICBjb25zdCBkYXRhc2V0OiBBamZDaGFydERhdGFzZXRbXSA9IFtdO1xuICBsZXQgbGFiZWxzOiBBamZGb3JtdWxhID0ge2Zvcm11bGE6ICdbXSd9O1xuXG4gIGlmIChqc29uLmxlbmd0aCA+IDApIHtcbiAgICBjb25zdCBmaXJzdFJvdyA9IGpzb25bMF07XG4gICAgb3B0aW9uTGFiZWxzLmZvckVhY2gob3B0aW9uTGFiZWwgPT4ge1xuICAgICAgaWYgKGZpcnN0Um93W29wdGlvbkxhYmVsXSAhPSBudWxsKSB7XG4gICAgICAgIGNoYXJ0T3B0aW9uc1tvcHRpb25MYWJlbF0gPSBmaXJzdFJvd1tvcHRpb25MYWJlbF07XG4gICAgICAgIGRlbGV0ZSBmaXJzdFJvd1tvcHRpb25MYWJlbF07XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbiAganNvbi5mb3JFYWNoKHJvdyA9PiB7XG4gICAgY29uc3Qgcm93S2V5cyA9IE9iamVjdC5rZXlzKHJvdyk7XG4gICAgcm93S2V5cy5mb3JFYWNoKHJvd0tleSA9PiB7XG4gICAgICBjb25zdCB2YWx1ZSA9IHJvd1tyb3dLZXldO1xuICAgICAgaWYgKGRhdGFzZXRPYmpbcm93S2V5XSA9PSBudWxsKSB7XG4gICAgICAgIGRhdGFzZXRPYmpbcm93S2V5XSA9IFt2YWx1ZV07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkYXRhc2V0T2JqW3Jvd0tleV0ucHVzaCh2YWx1ZSk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xuICBjb25zdCBkb0xhYmVscyA9IGRhdGFzZXRPYmpbJ2xhYmVscyddO1xuICBpZiAoZG9MYWJlbHMgIT0gbnVsbCkge1xuICAgIGxldCBsYWJlbHNKczogc3RyaW5nO1xuICAgIHRyeSB7XG4gICAgICBsYWJlbHNKcyA9IGluZGljYXRvclRvSnMoJ1snICsgZG9MYWJlbHMuam9pbigpICsgJ10nKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKGBFcnJvciBpbiBcImxhYmVsc1wiIG9mIGNoYXJ0IFwiJHtjaGFydE9wdGlvbnNbJ3RpdGxlJ119XCI6ICR7ZXJyLm1lc3NhZ2V9YCk7XG4gICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgICBsYWJlbHMgPSB7Zm9ybXVsYTogYHBsYWluQXJyYXkoJHtsYWJlbHNKc30pYH07XG4gICAgZGVsZXRlIGRhdGFzZXRPYmpbJ2xhYmVscyddO1xuICB9XG4gIE9iamVjdC5rZXlzKGRhdGFzZXRPYmopLmZvckVhY2goKGRhdGFzZXRPYmpLZXksIGluZGV4KSA9PiB7XG4gICAgbGV0IGRhdGFzZXRKczogc3RyaW5nO1xuICAgIHRyeSB7XG4gICAgICBkYXRhc2V0SnMgPSBpbmRpY2F0b3JUb0pzKCdbJyArIGRhdGFzZXRPYmpbZGF0YXNldE9iaktleV0uam9pbigpICsgJ10nKTtcbiAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICBgRXJyb3IgaW4gXCIke2RhdGFzZXRPYmpLZXl9XCIgb2YgY2hhcnQgXCIke2NoYXJ0T3B0aW9uc1sndGl0bGUnXX1cIjogJHtlcnIubWVzc2FnZX1gLFxuICAgICAgKTtcbiAgICAgIHdpbmRvdy5hbGVydChlcnIubWVzc2FnZSk7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuXG4gICAgY29uc3QgY2hhcnRUeXBlID0gY2hhcnRPcHRpb25zWydjaGFydFR5cGUnXTtcbiAgICBjb25zdCBjb2xvckNvbmRpdGlvbiA9XG4gICAgICBjaGFydFR5cGUgPT09ICdQaWUnIHx8IGNoYXJ0VHlwZSA9PT0gJ1BvbGFyQXJlYScgfHwgY2hhcnRUeXBlID09PSAnRG91Z2hudXQnO1xuICAgIGNvbnN0IGJhY2tDb2xvciA9IGNvbG9yQ29uZGl0aW9uID8gYmFja2dyb3VuZENvbG9yIDogYmFja2dyb3VuZENvbG9yW2luZGV4XTtcbiAgICBjb25zdCBmb3JtdWxhOiBBamZGb3JtdWxhW10gPSBbXG4gICAgICBjcmVhdGVGb3JtdWxhKHtcbiAgICAgICAgZm9ybXVsYTogYHBsYWluQXJyYXkoJHtkYXRhc2V0SnN9KWAsXG4gICAgICB9KSxcbiAgICBdO1xuICAgIGNvbnN0IGRhdGFzZXRPcHRpb25zOiBBamZDaGFydERhdGFzZXRPcHRpb25zID0ge1xuICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrQ29sb3IgYXMgQ2hhcnRDb2xvcixcbiAgICB9O1xuICAgIGRhdGFzZXQucHVzaCh7XG4gICAgICAuLi5jcmVhdGVEYXRhc2V0KHtcbiAgICAgICAgYWdncmVnYXRpb246IHthZ2dyZWdhdGlvbjogMH0sXG4gICAgICAgIGZvcm11bGEsXG4gICAgICAgIGxhYmVsOiBkYXRhc2V0T2JqS2V5LFxuICAgICAgfSksXG4gICAgICBvcHRpb25zOiBkYXRhc2V0T3B0aW9ucyxcbiAgICB9IGFzIEFqZkNoYXJ0RGF0YXNldCk7XG4gIH0pO1xuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIG5hbWUsXG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICB0eXBlOiBBamZDaGFydFR5cGVbY2hhcnRPcHRpb25zWydjaGFydFR5cGUnXSBhcyBhbnldIGFzIHVua25vd24gYXMgQWpmQ2hhcnRUeXBlLFxuICAgIGxhYmVscyxcbiAgICBkYXRhc2V0LFxuICAgIG9wdGlvbnM6IHtcbiAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICAgIGxlZ2VuZDoge2Rpc3BsYXk6IHRydWUsIHBvc2l0aW9uOiAnYm90dG9tJ30sXG4gICAgICB0aXRsZToge1xuICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICB0ZXh0OiBjaGFydE9wdGlvbnNbJ3RpdGxlJ10gfHwgJycsXG4gICAgICB9LFxuICAgIH0sXG4gICAgc3R5bGVzOiB7XG4gICAgICAuLi57d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJScsIHBhZGRpbmc6ICcyMHB4J30sXG4gICAgICAuLi53aWRnZXRTdHlsZSxcbiAgICB9LFxuICAgIGV4cG9ydGFibGU6IHRydWUsXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkR3JhcGgobmFtZTogc3RyaW5nLCBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgY29uc3Qgbm9kZXM6IEFqZkdyYXBoTm9kZURhdGFzZXRbXSA9IFtdO1xuXG4gIGpzb24uZm9yRWFjaChyb3cgPT4ge1xuICAgIGNvbnN0IHJvd0tleXMgPSBPYmplY3Qua2V5cyhyb3cpO1xuICAgIGlmIChyb3dLZXlzLmluY2x1ZGVzKCdpZCcpICYmIHJvd1snaWQnXSkge1xuICAgICAgY29uc3Qgcm93SWQgPSByb3dbJ2lkJ10udHJpbSgpLnJlcGxhY2UoL1wiL2csICcnKTtcbiAgICAgIGlmIChyb3dJZCAmJiByb3dJZC5sZW5ndGgpIHtcbiAgICAgICAgbGV0IGdyYXBoTm9kZU9iajoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgICAgICAgcm93S2V5cy5mb3JFYWNoKHJvd0tleSA9PiB7XG4gICAgICAgICAgbGV0IGpzOiBzdHJpbmc7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGpzID0gaW5kaWNhdG9yVG9Kcyhyb3dbcm93S2V5XSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd051bSA9IHJvd1snX19yb3dOdW1fXyddO1xuICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgRXJyb3IgaW4gXCIke25hbWV9XCIsIHJvdyAke3Jvd051bX0sIGNvbHVtbiBcIiR7cm93S2V5fVwiOiAke2Vyci5tZXNzYWdlfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgd2luZG93LmFsZXJ0KGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZ3JhcGhOb2RlT2JqW3Jvd0tleV0gPSBqcztcbiAgICAgICAgfSk7XG4gICAgICAgIGdyYXBoTm9kZU9ialsnaWQnXSA9IHJvd0lkO1xuICAgICAgICBub2Rlcy5wdXNoKGdyYXBoTm9kZU9iaiBhcyBBamZHcmFwaE5vZGVEYXRhc2V0KTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuR3JhcGgsXG4gICAgbm9kZXMsXG4gICAgc3R5bGVzOiB7fSxcbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRIdG1sKGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBjb25zdCBmaXJzdFJvdyA9IGpzb24ubGVuZ3RoID4gMCAmJiBqc29uWzBdWydodG1sJ10gIT0gbnVsbCA/IGpzb25bMF0gOiB7aHRtbDogJyd9O1xuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICBodG1sVGV4dDogU3RyaW5nKGZpcnN0Um93WydodG1sJ10pLFxuICAgIHN0eWxlczogaHRtbFdpZGdldCxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZFRhYmxlKFxuICBzaGVldE5hbWU6IHN0cmluZyxcbiAganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW59W10sXG4pOiBBamZXaWRnZXQge1xuICBsZXQgdGFibGVIZWFkZXI6IEFqZlRhYmxlRGF0YXNldFtdID0gW107XG4gIGxldCBkYXRhUm93cyA9ICdbXSc7XG4gIGxldCBmb3JtdWxhID0gJyc7XG4gIGxldCBwYWdlU2l6ZSA9IDEwO1xuICBsZXQgcGFnaW5hdGlvbiA9IGZhbHNlO1xuICBpZiAoanNvbi5sZW5ndGggPiAxKSB7XG4gICAgY29uc3Qgcm93c3BhbiA9IDE7XG4gICAgY29uc3QgdGl0bGVzID0gT2JqZWN0LmtleXMoanNvblswXSk7XG4gICAgY29uc3QgY29sc3BhblJvd1ZhbHVlcyA9IE9iamVjdC52YWx1ZXMoanNvblswXSkubWFwKHYgPT4gKHYgPyB2LnRvU3RyaW5nKCkgOiAnJykpO1xuICAgIGNvbnN0IGNvbHNwYW5zOiBudW1iZXJbXSA9IGNvbHNwYW5Sb3dWYWx1ZXMubWFwKHIgPT4gK3IuY2hhckF0KDApKTtcbiAgICBjb25zdCB0ZXh0QWxpZ246IHN0cmluZ1tdID0gY29sc3BhblJvd1ZhbHVlcy5tYXAociA9PiB7XG4gICAgICBzd2l0Y2ggKHIuY2hhckF0KDEpKSB7XG4gICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgIGNhc2UgJ3InOlxuICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICBjYXNlICdjJzpcbiAgICAgICAgICByZXR1cm4gJ2NlbnRlcic7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgcmV0dXJuICdjZW50ZXInO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHRhYmxlSGVhZGVyID0gdGl0bGVzLm1hcCgodGl0bGUsIGluZGV4KSA9PiAoe1xuICAgICAgbGFiZWw6ICcnLFxuICAgICAgZm9ybXVsYToge2Zvcm11bGE6IGBcIiR7dGl0bGV9XCJgfSxcbiAgICAgIGFnZ3JlZ2F0aW9uOiB7YWdncmVnYXRpb246IDB9LFxuICAgICAgY29sc3BhbjogY29sc3BhbnNbaW5kZXhdLFxuICAgICAgcm93c3BhbixcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMzZjUxYjUnLFxuICAgICAgICBib3JkZXJCb3R0b206ICcycHggc29saWQgI2RkZCcsXG4gICAgICB9LFxuICAgIH0pKTtcbiAgICBwYWdpbmF0aW9uID0ganNvblsxXVsncGFnaW5hdGlvbiddID8gKGpzb25bMV1bJ3BhZ2luYXRpb24nXSBhcyBib29sZWFuKSA6IGZhbHNlO1xuXG4gICAgaWYgKCdkYXRhc2V0JyBpbiBqc29uWzFdKSB7XG4gICAgICBjb25zdCBkaWFsb2dGaWVsZHMgPSBqc29uWzFdWydkaWFsb2dfZmllbGRzJ11cbiAgICAgICAgPyAoanNvblsxXVsnZGlhbG9nX2ZpZWxkcyddIGFzIHN0cmluZykuc3BsaXQoJywnKS5tYXAodiA9PiB2LnRyaW0oKSlcbiAgICAgICAgOiBbXTtcbiAgICAgIGNvbnN0IGRpYWxvZ0xhYmVsRmllbGRzID0ganNvblsxXVsnZGlhbG9nX2ZpZWxkc19sYWJlbHMnXVxuICAgICAgICA/IChqc29uWzFdWydkaWFsb2dfZmllbGRzX2xhYmVscyddIGFzIHN0cmluZykuc3BsaXQoJywnKS5tYXAodiA9PiB2LnRyaW0oKSlcbiAgICAgICAgOiBbXTtcbiAgICAgIGZvcm11bGEgPSBfYnVpbGRGb3JtTGlzdFRhYmxlKGpzb24sIGNvbHNwYW5zLCB0ZXh0QWxpZ24sIGRpYWxvZ0ZpZWxkcywgZGlhbG9nTGFiZWxGaWVsZHMpO1xuICAgICAgaWYgKGRpYWxvZ0ZpZWxkcyAmJiBkaWFsb2dGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgIHRhYmxlSGVhZGVyLnB1c2goe1xuICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogYFwiIFwiYH0sXG4gICAgICAgICAgYWdncmVnYXRpb246IHthZ2dyZWdhdGlvbjogMH0sXG4gICAgICAgICAgY29sc3BhbjogMSxcbiAgICAgICAgICByb3dzcGFuLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjM2Y1MWI1JyxcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZGRkJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIGpzb25bMF07XG4gICAgICBkYXRhUm93cyA9ICdbJztcbiAgICAgIGpzb24uZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICBsZXQgZGF0YVJvdyA9ICdbJztcbiAgICAgICAgdGl0bGVzLmZvckVhY2godGl0bGUgPT4ge1xuICAgICAgICAgIGxldCBlbGVtID0gcm93W3RpdGxlXSB8fCBgJydgO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlbGVtID0gaW5kaWNhdG9yVG9KcyhlbGVtIGFzIHN0cmluZyk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd051bSA9IHJvd1snX19yb3dOdW1fXyddO1xuICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgRXJyb3IgaW4gXCIke3NoZWV0TmFtZX1cIiwgcm93ICR7cm93TnVtfSwgY29sdW1uIFwiJHt0aXRsZX1cIjogJHtlcnIubWVzc2FnZX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFSb3cgKz0gZWxlbSArICcsJztcbiAgICAgICAgfSk7XG4gICAgICAgIGRhdGFSb3cgKz0gJ10nO1xuICAgICAgICBkYXRhUm93cyArPSBkYXRhUm93ICsgJywnO1xuICAgICAgfSk7XG4gICAgICBkYXRhUm93cyArPSAnXSc7XG4gICAgICBmb3JtdWxhID0gYGJ1aWxkQWxpZ25lZERhdGFzZXQocGxhaW5BcnJheSgke2RhdGFSb3dzfSksJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgY29sc3BhbnMsXG4gICAgICApfSwke0pTT04uc3RyaW5naWZ5KHRleHRBbGlnbil9KWA7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhZ2luYXRpb24pIHtcbiAgICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuUGFnaW5hdGVkVGFibGUsXG4gICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXG4gICAgICByb3dEZWZpbml0aW9uOiB7XG4gICAgICAgIGZvcm11bGE6IGZvcm11bGEsXG4gICAgICB9LFxuICAgICAgZGF0YXNldDogdGFibGVIZWFkZXIsXG4gICAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgICAgY2VsbFN0eWxlczoge1xuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxuICAgICAgfSxcbiAgICAgIHN0eWxlczoge1xuICAgICAgICBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkR5bmFtaWNUYWJsZSxcbiAgICAgIHJvd0RlZmluaXRpb246IHtcbiAgICAgICAgZm9ybXVsYTogZm9ybXVsYSxcbiAgICAgIH0sXG4gICAgICBkYXRhc2V0OiB0YWJsZUhlYWRlcixcbiAgICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgICBjZWxsU3R5bGVzOiB7XG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgICB9LFxuICAgICAgc3R5bGVzOiB7XG4gICAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGZvcm11bGEgZm9yIGEgZHluYW1pYyB0YWJsZSB3aWRnZXQsIGJhc2VkIG9uIGEgbGlzdCBvZiBGb3Jtc1xuICogQHBhcmFtIGpzb25cbiAqIEByZXR1cm5zIHRoZSBmb3JtdWxhIGZvciB0aGUgRHluYW1pY1RhYmxlIEFqZldpZGdldCwgbGlrZSB0aGlzOlxuICogYnVpbGRGb3JtRGF0YXNldChwcm9qZWN0c0RhdGFzZXQsIFsnaWRfcCcsJ2Rvbm9ycycsJ2J1ZGdldCcsJ2Rpbm9fYXJlYV9uYW1lJywnY2FsY19wcm9ncmVzcycsXSlcIlxuICovXG5mdW5jdGlvbiBfYnVpbGRGb3JtTGlzdFRhYmxlKFxuICBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbn1bXSxcbiAgY29sc3BhbnM6IG51bWJlcltdLFxuICB0ZXh0QWxpZ246IHN0cmluZ1tdLFxuICBkaWFsb2dGaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dMYWJlbEZpZWxkczogc3RyaW5nW10sXG4pOiBzdHJpbmcge1xuICBsZXQgZm9ybXVsYSA9ICcnO1xuICBpZiAoanNvbi5sZW5ndGggPiAxKSB7XG4gICAgbGV0IGZpZWxkcyA9ICdbJztcbiAgICBPYmplY3Qua2V5cyhqc29uWzBdKS5mb3JFYWNoKGZpZWxkQ29sTmFtZSA9PiB7XG4gICAgICBsZXQgZWxlbSA9IGpzb25bMV1bZmllbGRDb2xOYW1lXSA/IGAnJHtqc29uWzFdW2ZpZWxkQ29sTmFtZV19J2AgOiBgJydgO1xuICAgICAgZmllbGRzICs9IGVsZW0gKyAnLCc7XG4gICAgfSk7XG4gICAgZmllbGRzICs9ICddJztcbiAgICBjb25zdCBkYXRhc2V0ID0ganNvblsxXVsnZGF0YXNldCddIGFzIHN0cmluZztcbiAgICBjb25zdCBsaW5rRmllbGQgPSBqc29uWzFdWydsaW5rX2ZpZWxkJ10gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGxpbmtQb3MgPSBqc29uWzFdWydsaW5rX3Bvc2l0aW9uJ10gPyAranNvblsxXVsnbGlua19wb3NpdGlvbiddIDogMDtcbiAgICBjb25zdCByb3dMaW5rID1cbiAgICAgIGxpbmtGaWVsZCAmJiBsaW5rRmllbGQubGVuZ3RoID8gYHsnbGluayc6ICcke2xpbmtGaWVsZH0nLCAncG9zaXRpb24nOiAke2xpbmtQb3N9fWAgOiBudWxsO1xuXG4gICAgZm9ybXVsYSA9IGBidWlsZEFsaWduZWRGb3JtRGF0YXNldCgke2RhdGFzZXR9LCAke2ZpZWxkc30sICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICBjb2xzcGFucyxcbiAgICApfSwgJHtKU09OLnN0cmluZ2lmeSh0ZXh0QWxpZ24pfSwgJHtyb3dMaW5rfSwgJHtKU09OLnN0cmluZ2lmeShkaWFsb2dGaWVsZHMpfSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgIGRpYWxvZ0xhYmVsRmllbGRzLFxuICAgICl9KWA7XG4gIH1cbiAgcmV0dXJuIGZvcm11bGE7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgd2lkZ2V0IHdpdGggYSBkeW5hbWljIHBhZ2luYXRlZCB0YWJsZSBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMuIEVhY2ggcm93IGlzIGFuIEFqZlRhYmxlLlxuICogQHBhcmFtIHNoZWV0TmFtZVxuICogQHBhcmFtIGpzb25cbiAqIEByZXR1cm5zIGEgUGFnaW5hdGVkIEFqZldpZGdldCB3aXRoIGEgZm9ybXVsYSBsaWtlIHRoaXM6XG4gKiBidWlsZFdpZGdldERhdGFzZXQocHJvamVjdHNEYXRhc2V0LCBbJ2lkX3AnLCdkb25vcnMnLCdidWRnZXQnLCdkaW5vX2FyZWFfbmFtZScsJ2NhbGNfcHJvZ3Jlc3MnLCdob21lX2xpbmtfdGV4dCcsXSxcbiAqICAgeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDV9LCB7J2JvcmRlcic6ICdub25lJ30seyd3aWR0aCc6ICc5MDBweCd9LCBbJzEwJScsJzMwJScsJzEwJScsJzI1JScsJzE1JScsJzEwJSddLCBcXFwiI2YwZjBmMFxcXCIsIFxcXCJ3aGl0ZVxcXCIpXCJcbiAqL1xuZnVuY3Rpb24gX2J1aWxkUGFnaW5hdGVkTGlzdFRhYmxlKF86IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGxldCBmb3JtdWxhID0gJyc7XG4gIGxldCBwYWdlU2l6ZSA9IDEwO1xuICBsZXQgZGF0YXNldDogc3RyaW5nID0gJyc7XG4gIGxldCB0aXRsZSA9ICcnO1xuICBpZiAoanNvbi5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgY29sc1BlcmNlbnRhZ2U6IHN0cmluZyA9IChPYmplY3QudmFsdWVzKGpzb25bMF0pIGFzIHN0cmluZ1tdKVxuICAgICAgLm1hcChyID0+IGAnJHtyfSUnYClcbiAgICAgIC5qb2luKCcsJyk7XG4gICAgY29uc3QgY29sc1BlcmNlbnRhZ2VBcnJheSA9IGBbJHtjb2xzUGVyY2VudGFnZX1dYDtcblxuICAgIGxldCBmaWVsZHMgPSAnWyc7XG4gICAgT2JqZWN0LmtleXMoanNvblswXSkuZm9yRWFjaChmaWVsZENvbE5hbWUgPT4ge1xuICAgICAgbGV0IGVsZW0gPSBqc29uWzFdW2ZpZWxkQ29sTmFtZV0gPyBgJyR7anNvblsxXVtmaWVsZENvbE5hbWVdfSdgIDogYCcnYDtcbiAgICAgIGZpZWxkcyArPSBlbGVtICsgJywnO1xuICAgIH0pO1xuICAgIGZpZWxkcyArPSAnXSc7XG5cbiAgICBkYXRhc2V0ID0ganNvblsxXVsnZGF0YXNldCddIGFzIHN0cmluZztcbiAgICB0aXRsZSA9IGpzb25bMV1bJ3RpdGxlJ10gYXMgc3RyaW5nO1xuICAgIHBhZ2VTaXplID0ganNvblsxXVsncGFnZVNpemUnXSA/ICtqc29uWzFdWydwYWdlU2l6ZSddIDogMTA7XG4gICAgY29uc3QgbGlua0ZpZWxkID0ganNvblsxXVsnbGlua19maWVsZCddIGFzIHN0cmluZztcbiAgICBjb25zdCBsaW5rUG9zID0ganNvblsxXVsnbGlua19wb3NpdGlvbiddID8gK2pzb25bMV1bJ2xpbmtfcG9zaXRpb24nXSA6IDA7XG4gICAgY29uc3Qgcm93TGluayA9XG4gICAgICBsaW5rRmllbGQgJiYgbGlua0ZpZWxkLmxlbmd0aCA/IGB7J2xpbmsnOiAnJHtsaW5rRmllbGR9JywgJ3Bvc2l0aW9uJzogJHtsaW5rUG9zfX1gIDogbnVsbDtcbiAgICBjb25zdCBjZWxsU3R5bGVzID0ganNvblsxXVsnY2VsbFN0eWxlcyddO1xuICAgIGNvbnN0IHJvd1N0eWxlID0ganNvblsxXVsncm93U3R5bGUnXTtcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JBID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQSddIGFzIHN0cmluZztcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JCID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQiddIGFzIHN0cmluZztcblxuICAgIGZvcm11bGEgPVxuICAgICAgYGJ1aWxkV2lkZ2V0RGF0YXNldCgke2RhdGFzZXR9LCAke2ZpZWxkc30sICR7cm93TGlua30sICR7Y2VsbFN0eWxlc30sYCArXG4gICAgICBgJHtyb3dTdHlsZX0sICR7Y29sc1BlcmNlbnRhZ2VBcnJheX0sICR7SlNPTi5zdHJpbmdpZnkoYmFja2dyb3VuZENvbG9yQSl9LCAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgKX0pYDtcbiAgfVxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlBhZ2luYXRlZExpc3QsXG4gICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgIHRpdGxlOiB0aXRsZSxcbiAgICBjb250ZW50RGVmaW5pdGlvbjoge1xuICAgICAgZm9ybXVsYTogZm9ybXVsYSxcbiAgICB9LFxuICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgc3R5bGVzOiB7XG4gICAgICBoZWlnaHQ6ICc1MDBweCcsXG4gICAgfSxcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgd2lkZ2V0IHdpdGggYSBkeW5hbWljIHBhZ2luYXRlZCB0YWJsZSBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMuIEVhY2ggcm93IGlzIGFuIEFqZkRpYWxvZ1dpZGdldCB3aXRoIGFuIEFqZlRhYmxlXG4gKiB0aGF0IG9wZW4sIG9uIGNsaWNrLCBhIGRpYWxvZy5cbiAqIEBwYXJhbSBzaGVldE5hbWVcbiAqIEBwYXJhbSBqc29uXG4gKiBAcmV0dXJucyBhIFBhZ2luYXRlZCBBamZXaWRnZXQgd2l0aCBhIGZvcm11bGEgbGlrZSB0aGlzOlxuICogYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZyhwcm9qZWN0c0RhdGFzZXQsIFsnaWRfcCcsJ2Rvbm9ycycsJ3Byb3ZpbmNlX2Nob2ljZXNMYWJlbCcsJ2Rpbm9fYXJlYV9uYW1lJywnY2FsY19wcm9ncmVzcycsJ2hvbWVfbGlua190ZXh0JyxdLFxuICogIFsnaWRfcCcsJ2Rvbm9ycycsJ3Byb3ZpbmNlX2Nob2ljZXNMYWJlbCcsJ2Rpbm9fYXJlYV9uYW1lJ10sIFsnQ29kaWNlIHByb2dldHRvJywnRG9ub3JzJywnUHJvdmluY2VzJywnU2V0dG9yZSBkaSBhdHRpdml0YSddLFxuICogIHsnYm9yZGVyJzogJ25vbmUnfSx7J3dpZHRoJzogJzkwMHB4J30sIFsnMTAlJywnMzAlJywnMTAlJywnMjUlJywnMTUlJywnMTAlJ10sIFxcXCIjZjBmMGYwXFxcIiwgXFxcIndoaXRlXFxcIilcbiAqL1xuZnVuY3Rpb24gX2J1aWxkUGFnaW5hdGVkTGlzdFRhYmxlV2l0aERpYWxvZyhfOiBzdHJpbmcsIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBsZXQgZm9ybXVsYSA9ICcnO1xuICBsZXQgcGFnZVNpemUgPSAxMDtcbiAgbGV0IGRhdGFzZXQ6IHN0cmluZyA9ICcnO1xuICBsZXQgdGl0bGUgPSAnJztcbiAgaWYgKGpzb24ubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGNvbHNQZXJjZW50YWdlOiBzdHJpbmcgPSAoT2JqZWN0LnZhbHVlcyhqc29uWzBdKSBhcyBzdHJpbmdbXSlcbiAgICAgIC5tYXAociA9PiBgJyR7cn0lJ2ApXG4gICAgICAuam9pbignLCcpO1xuICAgIGNvbnN0IGNvbHNQZXJjZW50YWdlQXJyYXkgPSBgWyR7Y29sc1BlcmNlbnRhZ2V9XWA7XG5cbiAgICBsZXQgZmllbGRzID0gJ1snO1xuICAgIE9iamVjdC5rZXlzKGpzb25bMF0pLmZvckVhY2goZmllbGRDb2xOYW1lID0+IHtcbiAgICAgIGxldCBlbGVtID0ganNvblsxXVtmaWVsZENvbE5hbWVdID8gYCcke2pzb25bMV1bZmllbGRDb2xOYW1lXX0nYCA6IGAnJ2A7XG4gICAgICBmaWVsZHMgKz0gZWxlbSArICcsJztcbiAgICB9KTtcbiAgICBmaWVsZHMgKz0gJ10nO1xuXG4gICAgbGV0IGRpYWxvZ0ZpZWxkcyA9ICdbJztcbiAgICBsZXQgZGlhbG9nTGFiZWxGaWVsZHMgPSAnWyc7XG4gICAgaWYgKGpzb24ubGVuZ3RoID4gMykge1xuICAgICAgZGlhbG9nTGFiZWxGaWVsZHMgKz0gKE9iamVjdC52YWx1ZXMoanNvblsyXSkgYXMgc3RyaW5nW10pLm1hcCh2ID0+IGAnJHt2fSdgKS5qb2luKCcsJyk7XG4gICAgICBkaWFsb2dGaWVsZHMgKz0gKE9iamVjdC52YWx1ZXMoanNvblszXSkgYXMgc3RyaW5nW10pLm1hcCh2ID0+IGAnJHt2fSdgKS5qb2luKCcsJyk7XG4gICAgfVxuICAgIGRpYWxvZ0ZpZWxkcyArPSAnXSc7XG4gICAgZGlhbG9nTGFiZWxGaWVsZHMgKz0gJ10nO1xuXG4gICAgZGF0YXNldCA9IGpzb25bMV1bJ2RhdGFzZXQnXSBhcyBzdHJpbmc7XG4gICAgdGl0bGUgPSBqc29uWzFdWyd0aXRsZSddIGFzIHN0cmluZztcbiAgICBwYWdlU2l6ZSA9IGpzb25bMV1bJ3BhZ2VTaXplJ10gPyAranNvblsxXVsncGFnZVNpemUnXSA6IDEwO1xuICAgIGNvbnN0IGNlbGxTdHlsZXMgPSBqc29uWzFdWydjZWxsU3R5bGVzJ107XG4gICAgY29uc3Qgcm93U3R5bGUgPSBqc29uWzFdWydyb3dTdHlsZSddO1xuICAgIGNvbnN0IGJhY2tncm91bmRDb2xvckEgPSBqc29uWzFdWydiYWNrZ3JvdW5kQ29sb3JBJ10gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGJhY2tncm91bmRDb2xvckIgPSBqc29uWzFdWydiYWNrZ3JvdW5kQ29sb3JCJ10gYXMgc3RyaW5nO1xuXG4gICAgZm9ybXVsYSA9XG4gICAgICBgYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZygke2RhdGFzZXR9LCAke2ZpZWxkc30sICR7ZGlhbG9nRmllbGRzfSwgJHtkaWFsb2dMYWJlbEZpZWxkc30sICR7Y2VsbFN0eWxlc30sYCArXG4gICAgICBgJHtyb3dTdHlsZX0sICR7Y29sc1BlcmNlbnRhZ2VBcnJheX0sICR7SlNPTi5zdHJpbmdpZnkoYmFja2dyb3VuZENvbG9yQSl9LCAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgKX0pYDtcbiAgfVxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlBhZ2luYXRlZExpc3QsXG4gICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgIHRpdGxlOiB0aXRsZSxcbiAgICBjb250ZW50RGVmaW5pdGlvbjoge1xuICAgICAgZm9ybXVsYTogZm9ybXVsYSxcbiAgICB9LFxuICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgc3R5bGVzOiB7XG4gICAgICBoZWlnaHQ6ICc1MDBweCcsXG4gICAgfSxcbiAgfSk7XG59XG5cbmNvbnN0IF9idWlsZEhlYXRtYXAgPSAoXzogc3RyaW5nLCBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0ID0+IHtcbiAgY29uc3QgZGVmYXVsdEZlYXR1cmVzID0ge1xuICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgZmVhdHVyZXM6IFtdLFxuICB9O1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHZhbHVlczogJ1tdJyxcbiAgICBpZFByb3A6ICdpZCcsXG4gICAgZmVhdHVyZXM6IEpTT04uc3RyaW5naWZ5KGRlZmF1bHRGZWF0dXJlcyksXG4gICAgc3RhcnRDb2xvcjogJyNmZmViM2InLFxuICAgIGVuZENvbG9yOiAnI2Y0NDMzNicsXG4gICAgaGlnaGxpZ2h0Q29sb3I6ICcjMDA5Njg4JyxcbiAgICBzaG93VmlzdWFsTWFwOiBmYWxzZSxcbiAgICAuLi4oanNvbi5sZW5ndGggPiAwID8ganNvblswXSA6IHt9KSxcbiAgfTtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5IZWF0TWFwLFxuICAgIC4uLm9wdGlvbnMsXG4gICAgdmFsdWVzOiB7Zm9ybXVsYTogb3B0aW9ucy52YWx1ZXN9LFxuICAgIHN0eWxlczoge1xuICAgICAgbWluSGVpZ2h0OiAnMjAwcHgnLFxuICAgIH0sXG4gIH0pO1xufTtcbiJdfQ==