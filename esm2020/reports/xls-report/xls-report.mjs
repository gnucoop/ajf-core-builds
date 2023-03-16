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
                        const r = Number(elem.__rowNum__) + 1;
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
                        const rowNum = Number(row['__rowNum__']) + 1;
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
                default:
                    return 'center';
            }
        });
        const sortCols = colspanRowValues.map(r => r.charAt(2) && r.charAt(2) === 's' ? true : false);
        tableHeader = titles.map((title, index) => ({
            label: '',
            formula: { formula: `"${title}"` },
            aggregation: { aggregation: 0 },
            colspan: colspans[index],
            rowspan,
            sorted: sortCols[index],
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
                        const rowNum = Number(row['__rowNum__']) + 1;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzLXJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMveGxzLXJlcG9ydC94bHMtcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBYSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHekMsT0FBTyxFQUFDLFFBQVEsRUFBYyxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25DLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBSS9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQVE1RDs7R0FFRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBWSxFQUFFLElBQWdCO0lBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDbkQs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LFFBQVEsRUFBRSxJQUFJLENBQUMsU0FBUyxDQUFDLGVBQWUsQ0FBQztRQUN6QyxVQUFVLEVBQUUsU0FBUztRQUNyQixRQUFRLEVBQUUsU0FBUztRQUNuQixjQUFjLEVBQUUsU0FBUztRQUN6QixhQUFhLEVBQUUsS0FBSztRQUNwQixHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO0tBQ3BDLENBQUM7SUFDRixPQUFPLFlBQVksQ0FBQztRQUNsQixVQUFVLEVBQUUsYUFBYSxDQUFDLE9BQU87UUFDakMsR0FBRyxPQUFPO1FBQ1YsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxNQUFNLEVBQUM7UUFDakMsTUFBTSxFQUFFO1lBQ04sU0FBUyxFQUFFLE9BQU87U0FDbkI7S0FDRixDQUFDLENBQUM7QUFDTCxDQUFDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRm9ybXVsYSwgY3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0NoYXJ0Q29sb3J9IGZyb20gJ2NoYXJ0LmpzJztcbmltcG9ydCB7Zm9ya0pvaW4sIE9ic2VydmFibGUsIG9mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7bWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5pbXBvcnQgKiBhcyBYTFNYIGZyb20gJ3hsc3gnO1xuXG5pbXBvcnQge2JhY2tncm91bmRDb2xvcn0gZnJvbSAnLi4vYXV0b21hdGljLXJlcG9ydC9zdHlsZXMnO1xuXG5pbXBvcnQge2luZGljYXRvclRvSnN9IGZyb20gJy4vaGluZGlraXQtcGFyc2VyJztcbmltcG9ydCB7aHRtbFdpZGdldCwgd2lkZ2V0U3R5bGV9IGZyb20gJy4vc3R5bGVzJztcbmltcG9ydCB7Y3JlYXRlRGF0YXNldH0gZnJvbSAnLi4vdXRpbHMvZGF0YXNldC9jcmVhdGUtZGF0YXNldCc7XG5pbXBvcnQge2NyZWF0ZVJlcG9ydENvbnRhaW5lcn0gZnJvbSAnLi4vdXRpbHMvcmVwb3J0cy9jcmVhdGUtcmVwb3J0LWNvbnRhaW5lcic7XG5pbXBvcnQge0FqZldpZGdldENyZWF0ZSwgY3JlYXRlV2lkZ2V0fSBmcm9tICcuLi91dGlscy93aWRnZXRzL2NyZWF0ZS13aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5pbXBvcnQge0FqZlRhYmxlRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvdGFibGUtZGF0YXNldCc7XG5pbXBvcnQge0FqZkNoYXJ0RGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvY2hhcnQtZGF0YXNldCc7XG5pbXBvcnQge0FqZkNoYXJ0RGF0YXNldE9wdGlvbnN9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L2NoYXJ0LWRhdGFzZXQtb3B0aW9ucyc7XG5pbXBvcnQge0FqZkNoYXJ0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlJztcbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuaW1wb3J0IHtBamZSZXBvcnR9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydCc7XG5pbXBvcnQge0FqZlJlcG9ydFZhcmlhYmxlfSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtdmFyaWFibGUnO1xuaW1wb3J0IHtBamZMYXlvdXRXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL2xheW91dC13aWRnZXQnO1xuaW1wb3J0IHtBamZDb2x1bW5XaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL2NvbHVtbi13aWRnZXQnO1xuaW1wb3J0IHtBamZHcmFwaE5vZGVEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9ncmFwaC1kYXRhc2V0JztcblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGJ1aWxkcyBhIHJlcG9ydCBmcm9tIGFuIGV4Y2VsIGZpbGUuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiB4bHNSZXBvcnQoZmlsZTogc3RyaW5nLCBodHRwOiBIdHRwQ2xpZW50KTogT2JzZXJ2YWJsZTxBamZSZXBvcnQ+IHtcbiAgY29uc3Qgd29ya2Jvb2sgPSBYTFNYLnJlYWQoZmlsZSwge3R5cGU6ICdiaW5hcnknfSk7XG4gIGNvbnN0IHJlcG9ydDogQWpmUmVwb3J0ID0ge307XG4gIGNvbnN0IHJlcG9ydFdpZGdldHM6IEFqZldpZGdldFtdID0gW107XG5cbiAgY29uc3QgdmFyaWFibGVzOiBBamZSZXBvcnRWYXJpYWJsZVtdID0gW107XG4gIGNvbnN0IGZpbHRlcnM6IHtbc2hlZXROYW1lOiBzdHJpbmddOiBPYnNlcnZhYmxlPGFueT59ID0ge307XG4gIC8vIGNyZWF0ZSBmaWx0ZXJzXG4gIHdvcmtib29rLlNoZWV0TmFtZXMuZm9yRWFjaCgoc2hlZXROYW1lLCBpbmRleCkgPT4ge1xuICAgIGNvbnN0IHNoZWV0OiBYTFNYLldvcmtTaGVldCA9IHdvcmtib29rLlNoZWV0c1tzaGVldE5hbWVdO1xuICAgIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ2ZpbHRlcicpICYmIGluZGV4ICsgMSA8IHdvcmtib29rLlNoZWV0TmFtZXMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBuZXh0U2hlZXQgPSBzaGVldE5hbWUuaW5jbHVkZXMoJ2dsb2JhbCcpXG4gICAgICAgID8gJ2dsb2JhbF9maWx0ZXInXG4gICAgICAgIDogd29ya2Jvb2suU2hlZXROYW1lc1tpbmRleCArIDFdO1xuICAgICAgZmlsdGVyc1tuZXh0U2hlZXRdID0gX2J1aWxkRmlsdGVyKHdvcmtib29rLCBzaGVldCwgaHR0cCk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBvYnNGaWx0ZXJWYWx1ZXM6IE9ic2VydmFibGU8YW55PltdID0gT2JqZWN0LnZhbHVlcyhmaWx0ZXJzKS5sZW5ndGhcbiAgICA/IE9iamVjdC52YWx1ZXMoZmlsdGVycylcbiAgICA6IFtvZih7fSldO1xuICBjb25zdCBmaWx0ZXJOYW1lczogc3RyaW5nW10gPSBPYmplY3Qua2V5cyhmaWx0ZXJzKTtcblxuICByZXR1cm4gZm9ya0pvaW4ob2JzRmlsdGVyVmFsdWVzKS5waXBlKFxuICAgIG1hcChmID0+IHtcbiAgICAgIHdvcmtib29rLlNoZWV0TmFtZXMuZm9yRWFjaChzaGVldE5hbWUgPT4ge1xuICAgICAgICBjb25zdCBzaGVldDogWExTWC5Xb3JrU2hlZXQgPSB3b3JrYm9vay5TaGVldHNbc2hlZXROYW1lXTtcbiAgICAgICAgY29uc3QganNvbiA9IFhMU1gudXRpbHMuc2hlZXRfdG9fanNvbihzaGVldCkgYXMge1xuICAgICAgICAgIG5hbWU6IHN0cmluZztcbiAgICAgICAgICB2YWx1ZTogc3RyaW5nO1xuICAgICAgICAgIF9fcm93TnVtX186IHN0cmluZztcbiAgICAgICAgfVtdO1xuXG4gICAgICAgIGlmIChzaGVldE5hbWUgPT09ICd2YXJpYWJsZXMnKSB7XG4gICAgICAgICAganNvblxuICAgICAgICAgICAgLmZpbHRlcihlID0+IGUgIT0gbnVsbCAmJiBlLm5hbWUgIT0gbnVsbCAmJiBlLm5hbWUgIT09ICcnKVxuICAgICAgICAgICAgLmZvckVhY2goZWxlbSA9PiB7XG4gICAgICAgICAgICAgIGxldCBqczogc3RyaW5nO1xuICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgIGpzID0gaW5kaWNhdG9yVG9KcyhlbGVtLnZhbHVlKTtcbiAgICAgICAgICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgICAgICAgICBjb25zdCByID0gTnVtYmVyKGVsZW0uX19yb3dOdW1fXykgKyAxO1xuICAgICAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW4gdmFyaWFibGUgXCIke2VsZW0ubmFtZX1cIiAocm93ICR7cn0pOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgICAgICAgICAgIHdpbmRvdy5hbGVydChlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHZhcmlhYmxlcy5wdXNoKHtcbiAgICAgICAgICAgICAgICBuYW1lOiBlbGVtLm5hbWUsXG4gICAgICAgICAgICAgICAgZm9ybXVsYToge2Zvcm11bGE6IGpzfSxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBpZHggPSBmaWx0ZXJOYW1lcy5pbmRleE9mKHNoZWV0TmFtZSk7XG5cbiAgICAgICAgICBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCd0YWJsZScpKSB7XG4gICAgICAgICAgICBjb25zdCB0YWJsZVdpZGdldCA9IF9idWlsZFRhYmxlKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2godGFibGVXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdjaGFydCcpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFydFdpZGdldCA9IF9idWlsZENoYXJ0KHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goY2hhcnRXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdodG1sJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGNoYXJ0V2lkZ2V0ID0gX2J1aWxkSHRtbChqc29uKTtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHMucHVzaChjaGFydFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ2dyYXBoJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGdyYXBoV2lkZ2V0ID0gX2J1aWxkR3JhcGgoc2hlZXROYW1lLCBqc29uKTtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHMucHVzaChncmFwaFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ2hlYXRtYXAnKSkge1xuICAgICAgICAgICAgY29uc3QgaGVhdG1hcFdpZGdldCA9IF9idWlsZEhlYXRtYXAoc2hlZXROYW1lLCBqc29uKTtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHMucHVzaChoZWF0bWFwV2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygncGFnaW5hdGVkbGlzdCcpKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdMaXN0V2lkZ2V0ID0gX2J1aWxkUGFnaW5hdGVkTGlzdFRhYmxlKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2gocGFnTGlzdFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ3BhZ2luYXRlZERpYWxvZ0xpc3QnKSkge1xuICAgICAgICAgICAgY29uc3QgcGFnTGlzdFdpZGdldCA9IF9idWlsZFBhZ2luYXRlZExpc3RUYWJsZVdpdGhEaWFsb2coc2hlZXROYW1lLCBqc29uKTtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHMucHVzaChwYWdMaXN0V2lkZ2V0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHNbcmVwb3J0V2lkZ2V0cy5sZW5ndGggLSAxXS5maWx0ZXIgPSB7XG4gICAgICAgICAgICAgIHNjaGVtYTogZltpZHhdIGFzIGFueSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGdsb2JhbEZpbHRlcklkeCA9IGZpbHRlck5hbWVzLmluZGV4T2YoJ2dsb2JhbF9maWx0ZXInKTtcbiAgICAgIGNvbnN0IGxheW91dFdpZGdldDogQWpmTGF5b3V0V2lkZ2V0ID0ge1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkxheW91dCxcbiAgICAgICAgY29udGVudDogW1xuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFsuLi5yZXBvcnRXaWRnZXRzXSxcbiAgICAgICAgICAgIGZpbHRlcjogZ2xvYmFsRmlsdGVySWR4ID49IDAgPyB7c2NoZW1hOiBmW2dsb2JhbEZpbHRlcklkeF19IDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0gYXMgQWpmQ29sdW1uV2lkZ2V0KSxcbiAgICAgICAgXSxcbiAgICAgICAgY29sdW1uczogWzFdLFxuICAgICAgICB2aXNpYmlsaXR5OiB7XG4gICAgICAgICAgY29uZGl0aW9uOiAndHJ1ZScsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge30sXG4gICAgICB9O1xuXG4gICAgICByZXBvcnQudmFyaWFibGVzID0gdmFyaWFibGVzO1xuICAgICAgcmVwb3J0LmNvbnRlbnQgPSBjcmVhdGVSZXBvcnRDb250YWluZXIobGF5b3V0V2lkZ2V0KTtcblxuICAgICAgcmV0dXJuIHJlcG9ydDtcbiAgICB9KSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkRmlsdGVyKFxuICB3Ym9vazogWExTWC5Xb3JrQm9vayxcbiAgc2hlZXQ6IFhMU1guV29ya1NoZWV0LFxuICBodHRwOiBIdHRwQ2xpZW50LFxuKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBjb25zdCBmaWx0ZXJCb29rOiBYTFNYLldvcmtCb29rID0gZGVlcENvcHkod2Jvb2spO1xuICBjb25zdCBmaWx0ZXJTaGVldDogWExTWC5Xb3JrU2hlZXQgPSBkZWVwQ29weShzaGVldCk7XG4gIGNvbnN0IGNob2ljZXNTaGVldDogWExTWC5Xb3JrU2hlZXQgPSBkZWVwQ29weSh3Ym9vay5TaGVldHNbJ2Nob2ljZXMnXSk7XG4gIGZpbHRlckJvb2suU2hlZXROYW1lcyA9IFsnc3VydmV5JywgJ2Nob2ljZXMnXTtcbiAgZmlsdGVyQm9vay5TaGVldHMgPSB7c3VydmV5OiBmaWx0ZXJTaGVldCwgY2hvaWNlczogY2hvaWNlc1NoZWV0fTtcbiAgY29uc3QgZmlsdGVyWGxzeCA9IFhMU1gud3JpdGUoZmlsdGVyQm9vaywge1xuICAgIGJvb2tUeXBlOiAneGxzeCcsXG4gICAgdHlwZTogJ2FycmF5JyxcbiAgfSk7XG4gIGNvbnN0IGZpbGUgPSBuZXcgRmlsZShbZmlsdGVyWGxzeF0sICdmaWx0ZXIueGxzeCcpO1xuICBkYXRhLmFwcGVuZCgnZXhjZWxGaWxlJywgZmlsZSk7XG5cbiAgcmV0dXJuIGh0dHAucG9zdCgnaHR0cHM6Ly9mb3JtY29udi5oZXJva3VhcHAuY29tL3Jlc3VsdC5qc29uJywgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZENoYXJ0KG5hbWU6IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGNvbnN0IG9wdGlvbkxhYmVscyA9IFsnY2hhcnRUeXBlJywgJ3RpdGxlJ107XG4gIGNvbnN0IGNoYXJ0T3B0aW9uczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgY29uc3QgZGF0YXNldE9iajoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgY29uc3QgZGF0YXNldDogQWpmQ2hhcnREYXRhc2V0W10gPSBbXTtcbiAgbGV0IGxhYmVsczogQWpmRm9ybXVsYSA9IHtmb3JtdWxhOiAnW10nfTtcblxuICBpZiAoanNvbi5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZmlyc3RSb3cgPSBqc29uWzBdO1xuICAgIG9wdGlvbkxhYmVscy5mb3JFYWNoKG9wdGlvbkxhYmVsID0+IHtcbiAgICAgIGlmIChmaXJzdFJvd1tvcHRpb25MYWJlbF0gIT0gbnVsbCkge1xuICAgICAgICBjaGFydE9wdGlvbnNbb3B0aW9uTGFiZWxdID0gZmlyc3RSb3dbb3B0aW9uTGFiZWxdO1xuICAgICAgICBkZWxldGUgZmlyc3RSb3dbb3B0aW9uTGFiZWxdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGpzb24uZm9yRWFjaChyb3cgPT4ge1xuICAgIGNvbnN0IHJvd0tleXMgPSBPYmplY3Qua2V5cyhyb3cpO1xuICAgIHJvd0tleXMuZm9yRWFjaChyb3dLZXkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSByb3dbcm93S2V5XTtcbiAgICAgIGlmIChkYXRhc2V0T2JqW3Jvd0tleV0gPT0gbnVsbCkge1xuICAgICAgICBkYXRhc2V0T2JqW3Jvd0tleV0gPSBbdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YXNldE9ialtyb3dLZXldLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgY29uc3QgZG9MYWJlbHMgPSBkYXRhc2V0T2JqWydsYWJlbHMnXTtcbiAgaWYgKGRvTGFiZWxzICE9IG51bGwpIHtcbiAgICBsZXQgbGFiZWxzSnM6IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgbGFiZWxzSnMgPSBpbmRpY2F0b3JUb0pzKCdbJyArIGRvTGFiZWxzLmpvaW4oKSArICddJyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW4gXCJsYWJlbHNcIiBvZiBjaGFydCBcIiR7Y2hhcnRPcHRpb25zWyd0aXRsZSddfVwiOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgd2luZG93LmFsZXJ0KGVyci5tZXNzYWdlKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgbGFiZWxzID0ge2Zvcm11bGE6IGBwbGFpbkFycmF5KCR7bGFiZWxzSnN9KWB9O1xuICAgIGRlbGV0ZSBkYXRhc2V0T2JqWydsYWJlbHMnXTtcbiAgfVxuICBPYmplY3Qua2V5cyhkYXRhc2V0T2JqKS5mb3JFYWNoKChkYXRhc2V0T2JqS2V5LCBpbmRleCkgPT4ge1xuICAgIGxldCBkYXRhc2V0SnM6IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgZGF0YXNldEpzID0gaW5kaWNhdG9yVG9KcygnWycgKyBkYXRhc2V0T2JqW2RhdGFzZXRPYmpLZXldLmpvaW4oKSArICddJyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgYEVycm9yIGluIFwiJHtkYXRhc2V0T2JqS2V5fVwiIG9mIGNoYXJ0IFwiJHtjaGFydE9wdGlvbnNbJ3RpdGxlJ119XCI6ICR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgICk7XG4gICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYXJ0VHlwZSA9IGNoYXJ0T3B0aW9uc1snY2hhcnRUeXBlJ107XG4gICAgY29uc3QgY29sb3JDb25kaXRpb24gPVxuICAgICAgY2hhcnRUeXBlID09PSAnUGllJyB8fCBjaGFydFR5cGUgPT09ICdQb2xhckFyZWEnIHx8IGNoYXJ0VHlwZSA9PT0gJ0RvdWdobnV0JztcbiAgICBjb25zdCBiYWNrQ29sb3IgPSBjb2xvckNvbmRpdGlvbiA/IGJhY2tncm91bmRDb2xvciA6IGJhY2tncm91bmRDb2xvcltpbmRleF07XG4gICAgY29uc3QgZm9ybXVsYTogQWpmRm9ybXVsYVtdID0gW1xuICAgICAgY3JlYXRlRm9ybXVsYSh7XG4gICAgICAgIGZvcm11bGE6IGBwbGFpbkFycmF5KCR7ZGF0YXNldEpzfSlgLFxuICAgICAgfSksXG4gICAgXTtcbiAgICBjb25zdCBkYXRhc2V0T3B0aW9uczogQWpmQ2hhcnREYXRhc2V0T3B0aW9ucyA9IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja0NvbG9yIGFzIENoYXJ0Q29sb3IsXG4gICAgfTtcbiAgICBkYXRhc2V0LnB1c2goe1xuICAgICAgLi4uY3JlYXRlRGF0YXNldCh7XG4gICAgICAgIGFnZ3JlZ2F0aW9uOiB7YWdncmVnYXRpb246IDB9LFxuICAgICAgICBmb3JtdWxhLFxuICAgICAgICBsYWJlbDogZGF0YXNldE9iaktleSxcbiAgICAgIH0pLFxuICAgICAgb3B0aW9uczogZGF0YXNldE9wdGlvbnMsXG4gICAgfSBhcyBBamZDaGFydERhdGFzZXQpO1xuICB9KTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICBuYW1lLFxuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgdHlwZTogQWpmQ2hhcnRUeXBlW2NoYXJ0T3B0aW9uc1snY2hhcnRUeXBlJ10gYXMgYW55XSBhcyB1bmtub3duIGFzIEFqZkNoYXJ0VHlwZSxcbiAgICBsYWJlbHMsXG4gICAgZGF0YXNldCxcbiAgICBvcHRpb25zOiB7XG4gICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgdGV4dDogY2hhcnRPcHRpb25zWyd0aXRsZSddIHx8ICcnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHN0eWxlczoge1xuICAgICAgLi4ue3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBwYWRkaW5nOiAnMjBweCd9LFxuICAgICAgLi4ud2lkZ2V0U3R5bGUsXG4gICAgfSxcbiAgICBleHBvcnRhYmxlOiB0cnVlLFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZEdyYXBoKG5hbWU6IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGNvbnN0IG5vZGVzOiBBamZHcmFwaE5vZGVEYXRhc2V0W10gPSBbXTtcblxuICBqc29uLmZvckVhY2gocm93ID0+IHtcbiAgICBjb25zdCByb3dLZXlzID0gT2JqZWN0LmtleXMocm93KTtcbiAgICBpZiAocm93S2V5cy5pbmNsdWRlcygnaWQnKSAmJiByb3dbJ2lkJ10pIHtcbiAgICAgIGNvbnN0IHJvd0lkID0gcm93WydpZCddLnRyaW0oKS5yZXBsYWNlKC9cIi9nLCAnJyk7XG4gICAgICBpZiAocm93SWQgJiYgcm93SWQubGVuZ3RoKSB7XG4gICAgICAgIGxldCBncmFwaE5vZGVPYmo6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgICAgIHJvd0tleXMuZm9yRWFjaChyb3dLZXkgPT4ge1xuICAgICAgICAgIGxldCBqczogc3RyaW5nO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBqcyA9IGluZGljYXRvclRvSnMocm93W3Jvd0tleV0pO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICBjb25zdCByb3dOdW0gPSBOdW1iZXIocm93WydfX3Jvd051bV9fJ10pICsgMTtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYEVycm9yIGluIFwiJHtuYW1lfVwiLCByb3cgJHtyb3dOdW19LCBjb2x1bW4gXCIke3Jvd0tleX1cIjogJHtlcnIubWVzc2FnZX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGdyYXBoTm9kZU9ialtyb3dLZXldID0ganM7XG4gICAgICAgIH0pO1xuICAgICAgICBncmFwaE5vZGVPYmpbJ2lkJ10gPSByb3dJZDtcbiAgICAgICAgbm9kZXMucHVzaChncmFwaE5vZGVPYmogYXMgQWpmR3JhcGhOb2RlRGF0YXNldCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkdyYXBoLFxuICAgIG5vZGVzLFxuICAgIHN0eWxlczoge30sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkSHRtbChqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgY29uc3QgZmlyc3RSb3cgPSBqc29uLmxlbmd0aCA+IDAgJiYganNvblswXVsnaHRtbCddICE9IG51bGwgPyBqc29uWzBdIDoge2h0bWw6ICcnfTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgaHRtbFRleHQ6IFN0cmluZyhmaXJzdFJvd1snaHRtbCddKSxcbiAgICBzdHlsZXM6IGh0bWxXaWRnZXQsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRUYWJsZShcbiAgc2hlZXROYW1lOiBzdHJpbmcsXG4gIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFufVtdLFxuKTogQWpmV2lkZ2V0IHtcbiAgbGV0IHRhYmxlSGVhZGVyOiBBamZUYWJsZURhdGFzZXRbXSA9IFtdO1xuICBsZXQgZGF0YVJvd3MgPSAnW10nO1xuICBsZXQgZm9ybXVsYSA9ICcnO1xuICBsZXQgcGFnZVNpemUgPSAxMDtcbiAgbGV0IHBhZ2luYXRpb24gPSBmYWxzZTtcbiAgaWYgKGpzb24ubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IHJvd3NwYW4gPSAxO1xuICAgIGNvbnN0IHRpdGxlcyA9IE9iamVjdC5rZXlzKGpzb25bMF0pO1xuICAgIGNvbnN0IGNvbHNwYW5Sb3dWYWx1ZXMgPSBPYmplY3QudmFsdWVzKGpzb25bMF0pLm1hcCh2ID0+ICh2ID8gdi50b1N0cmluZygpIDogJycpKTtcbiAgICBjb25zdCBjb2xzcGFuczogbnVtYmVyW10gPSBjb2xzcGFuUm93VmFsdWVzLm1hcChyID0+ICtyLmNoYXJBdCgwKSk7XG4gICAgY29uc3QgdGV4dEFsaWduOiBzdHJpbmdbXSA9IGNvbHNwYW5Sb3dWYWx1ZXMubWFwKHIgPT4ge1xuICAgICAgc3dpdGNoIChyLmNoYXJBdCgxKSkge1xuICAgICAgICBjYXNlICdsJzpcbiAgICAgICAgICByZXR1cm4gJ2xlZnQnO1xuICAgICAgICBjYXNlICdyJzpcbiAgICAgICAgICByZXR1cm4gJ3JpZ2h0JztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gJ2NlbnRlcic7XG4gICAgICB9XG4gICAgfSk7XG4gICAgY29uc3Qgc29ydENvbHM6IGJvb2xlYW5bXSA9IGNvbHNwYW5Sb3dWYWx1ZXMubWFwKHIgPT5cbiAgICAgIHIuY2hhckF0KDIpICYmIHIuY2hhckF0KDIpID09PSAncycgPyB0cnVlIDogZmFsc2UsXG4gICAgKTtcbiAgICB0YWJsZUhlYWRlciA9IHRpdGxlcy5tYXAoKHRpdGxlLCBpbmRleCkgPT4gKHtcbiAgICAgIGxhYmVsOiAnJyxcbiAgICAgIGZvcm11bGE6IHtmb3JtdWxhOiBgXCIke3RpdGxlfVwiYH0sXG4gICAgICBhZ2dyZWdhdGlvbjoge2FnZ3JlZ2F0aW9uOiAwfSxcbiAgICAgIGNvbHNwYW46IGNvbHNwYW5zW2luZGV4XSxcbiAgICAgIHJvd3NwYW4sXG4gICAgICBzb3J0ZWQ6IHNvcnRDb2xzW2luZGV4XSxcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMzZjUxYjUnLFxuICAgICAgICBib3JkZXJCb3R0b206ICcycHggc29saWQgI2RkZCcsXG4gICAgICB9LFxuICAgIH0pKTtcbiAgICBwYWdpbmF0aW9uID0ganNvblsxXVsncGFnaW5hdGlvbiddID8gKGpzb25bMV1bJ3BhZ2luYXRpb24nXSBhcyBib29sZWFuKSA6IGZhbHNlO1xuXG4gICAgaWYgKCdkYXRhc2V0JyBpbiBqc29uWzFdKSB7XG4gICAgICBjb25zdCBkaWFsb2dGaWVsZHMgPSBqc29uWzFdWydkaWFsb2dfZmllbGRzJ11cbiAgICAgICAgPyAoanNvblsxXVsnZGlhbG9nX2ZpZWxkcyddIGFzIHN0cmluZykuc3BsaXQoJywnKS5tYXAodiA9PiB2LnRyaW0oKSlcbiAgICAgICAgOiBbXTtcbiAgICAgIGNvbnN0IGRpYWxvZ0xhYmVsRmllbGRzID0ganNvblsxXVsnZGlhbG9nX2ZpZWxkc19sYWJlbHMnXVxuICAgICAgICA/IChqc29uWzFdWydkaWFsb2dfZmllbGRzX2xhYmVscyddIGFzIHN0cmluZykuc3BsaXQoJywnKS5tYXAodiA9PiB2LnRyaW0oKSlcbiAgICAgICAgOiBbXTtcbiAgICAgIGZvcm11bGEgPSBfYnVpbGRGb3JtTGlzdFRhYmxlKGpzb24sIGNvbHNwYW5zLCB0ZXh0QWxpZ24sIGRpYWxvZ0ZpZWxkcywgZGlhbG9nTGFiZWxGaWVsZHMpO1xuICAgICAgaWYgKGRpYWxvZ0ZpZWxkcyAmJiBkaWFsb2dGaWVsZHMubGVuZ3RoKSB7XG4gICAgICAgIHRhYmxlSGVhZGVyLnB1c2goe1xuICAgICAgICAgIGxhYmVsOiAnJyxcbiAgICAgICAgICBmb3JtdWxhOiB7Zm9ybXVsYTogYFwiIFwiYH0sXG4gICAgICAgICAgYWdncmVnYXRpb246IHthZ2dyZWdhdGlvbjogMH0sXG4gICAgICAgICAgY29sc3BhbjogMSxcbiAgICAgICAgICByb3dzcGFuLFxuICAgICAgICAgIHN0eWxlOiB7XG4gICAgICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICcjM2Y1MWI1JyxcbiAgICAgICAgICAgIGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZGRkJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIGpzb25bMF07XG4gICAgICBkYXRhUm93cyA9ICdbJztcbiAgICAgIGpzb24uZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICBsZXQgZGF0YVJvdyA9ICdbJztcbiAgICAgICAgdGl0bGVzLmZvckVhY2godGl0bGUgPT4ge1xuICAgICAgICAgIGxldCBlbGVtID0gcm93W3RpdGxlXSB8fCBgJydgO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBlbGVtID0gaW5kaWNhdG9yVG9KcyhlbGVtIGFzIHN0cmluZyk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgICAgICAgIGNvbnN0IHJvd051bSA9IE51bWJlcihyb3dbJ19fcm93TnVtX18nXSkgKyAxO1xuICAgICAgICAgICAgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgRXJyb3IgaW4gXCIke3NoZWV0TmFtZX1cIiwgcm93ICR7cm93TnVtfSwgY29sdW1uIFwiJHt0aXRsZX1cIjogJHtlcnIubWVzc2FnZX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGRhdGFSb3cgKz0gZWxlbSArICcsJztcbiAgICAgICAgfSk7XG4gICAgICAgIGRhdGFSb3cgKz0gJ10nO1xuICAgICAgICBkYXRhUm93cyArPSBkYXRhUm93ICsgJywnO1xuICAgICAgfSk7XG4gICAgICBkYXRhUm93cyArPSAnXSc7XG4gICAgICBmb3JtdWxhID0gYGJ1aWxkQWxpZ25lZERhdGFzZXQocGxhaW5BcnJheSgke2RhdGFSb3dzfSksJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgY29sc3BhbnMsXG4gICAgICApfSwke0pTT04uc3RyaW5naWZ5KHRleHRBbGlnbil9KWA7XG4gICAgfVxuICB9XG5cbiAgaWYgKHBhZ2luYXRpb24pIHtcbiAgICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuUGFnaW5hdGVkVGFibGUsXG4gICAgICBwYWdlU2l6ZTogcGFnZVNpemUsXG4gICAgICByb3dEZWZpbml0aW9uOiB7XG4gICAgICAgIGZvcm11bGE6IGZvcm11bGEsXG4gICAgICB9LFxuICAgICAgZGF0YXNldDogdGFibGVIZWFkZXIsXG4gICAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgICAgY2VsbFN0eWxlczoge1xuICAgICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnd2hpdGUnLFxuICAgICAgfSxcbiAgICAgIHN0eWxlczoge1xuICAgICAgICBib3JkZXJDb2xsYXBzZTogJ2NvbGxhcHNlJyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkR5bmFtaWNUYWJsZSxcbiAgICAgIHJvd0RlZmluaXRpb246IHtcbiAgICAgICAgZm9ybXVsYTogZm9ybXVsYSxcbiAgICAgIH0sXG4gICAgICBkYXRhc2V0OiB0YWJsZUhlYWRlcixcbiAgICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgICBjZWxsU3R5bGVzOiB7XG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgICB9LFxuICAgICAgc3R5bGVzOiB7XG4gICAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfVxufVxuXG4vKipcbiAqIENyZWF0ZSBhIGZvcm11bGEgZm9yIGEgZHluYW1pYyB0YWJsZSB3aWRnZXQsIGJhc2VkIG9uIGEgbGlzdCBvZiBGb3Jtc1xuICogQHBhcmFtIGpzb25cbiAqIEByZXR1cm5zIHRoZSBmb3JtdWxhIGZvciB0aGUgRHluYW1pY1RhYmxlIEFqZldpZGdldCwgbGlrZSB0aGlzOlxuICogYnVpbGRGb3JtRGF0YXNldChwcm9qZWN0c0RhdGFzZXQsIFsnaWRfcCcsJ2Rvbm9ycycsJ2J1ZGdldCcsJ2Rpbm9fYXJlYV9uYW1lJywnY2FsY19wcm9ncmVzcycsXSlcIlxuICovXG5mdW5jdGlvbiBfYnVpbGRGb3JtTGlzdFRhYmxlKFxuICBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nIHwgbnVtYmVyIHwgYm9vbGVhbn1bXSxcbiAgY29sc3BhbnM6IG51bWJlcltdLFxuICB0ZXh0QWxpZ246IHN0cmluZ1tdLFxuICBkaWFsb2dGaWVsZHM6IHN0cmluZ1tdLFxuICBkaWFsb2dMYWJlbEZpZWxkczogc3RyaW5nW10sXG4pOiBzdHJpbmcge1xuICBsZXQgZm9ybXVsYSA9ICcnO1xuICBpZiAoanNvbi5sZW5ndGggPiAxKSB7XG4gICAgbGV0IGZpZWxkcyA9ICdbJztcbiAgICBPYmplY3Qua2V5cyhqc29uWzBdKS5mb3JFYWNoKGZpZWxkQ29sTmFtZSA9PiB7XG4gICAgICBsZXQgZWxlbSA9IGpzb25bMV1bZmllbGRDb2xOYW1lXSA/IGAnJHtqc29uWzFdW2ZpZWxkQ29sTmFtZV19J2AgOiBgJydgO1xuICAgICAgZmllbGRzICs9IGVsZW0gKyAnLCc7XG4gICAgfSk7XG4gICAgZmllbGRzICs9ICddJztcbiAgICBjb25zdCBkYXRhc2V0ID0ganNvblsxXVsnZGF0YXNldCddIGFzIHN0cmluZztcbiAgICBjb25zdCBsaW5rRmllbGQgPSBqc29uWzFdWydsaW5rX2ZpZWxkJ10gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGxpbmtQb3MgPSBqc29uWzFdWydsaW5rX3Bvc2l0aW9uJ10gPyAranNvblsxXVsnbGlua19wb3NpdGlvbiddIDogMDtcbiAgICBjb25zdCByb3dMaW5rID1cbiAgICAgIGxpbmtGaWVsZCAmJiBsaW5rRmllbGQubGVuZ3RoID8gYHsnbGluayc6ICcke2xpbmtGaWVsZH0nLCAncG9zaXRpb24nOiAke2xpbmtQb3N9fWAgOiBudWxsO1xuXG4gICAgZm9ybXVsYSA9IGBidWlsZEFsaWduZWRGb3JtRGF0YXNldCgke2RhdGFzZXR9LCAke2ZpZWxkc30sICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICBjb2xzcGFucyxcbiAgICApfSwgJHtKU09OLnN0cmluZ2lmeSh0ZXh0QWxpZ24pfSwgJHtyb3dMaW5rfSwgJHtKU09OLnN0cmluZ2lmeShkaWFsb2dGaWVsZHMpfSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgIGRpYWxvZ0xhYmVsRmllbGRzLFxuICAgICl9KWA7XG4gIH1cbiAgcmV0dXJuIGZvcm11bGE7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgd2lkZ2V0IHdpdGggYSBkeW5hbWljIHBhZ2luYXRlZCB0YWJsZSBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMuIEVhY2ggcm93IGlzIGFuIEFqZlRhYmxlLlxuICogQHBhcmFtIHNoZWV0TmFtZVxuICogQHBhcmFtIGpzb25cbiAqIEByZXR1cm5zIGEgUGFnaW5hdGVkIEFqZldpZGdldCB3aXRoIGEgZm9ybXVsYSBsaWtlIHRoaXM6XG4gKiBidWlsZFdpZGdldERhdGFzZXQocHJvamVjdHNEYXRhc2V0LCBbJ2lkX3AnLCdkb25vcnMnLCdidWRnZXQnLCdkaW5vX2FyZWFfbmFtZScsJ2NhbGNfcHJvZ3Jlc3MnLCdob21lX2xpbmtfdGV4dCcsXSxcbiAqICAgeydsaW5rJzogJ2hvbWVfbGluaycsICdwb3NpdGlvbic6IDV9LCB7J2JvcmRlcic6ICdub25lJ30seyd3aWR0aCc6ICc5MDBweCd9LCBbJzEwJScsJzMwJScsJzEwJScsJzI1JScsJzE1JScsJzEwJSddLCBcXFwiI2YwZjBmMFxcXCIsIFxcXCJ3aGl0ZVxcXCIpXCJcbiAqL1xuZnVuY3Rpb24gX2J1aWxkUGFnaW5hdGVkTGlzdFRhYmxlKF86IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGxldCBmb3JtdWxhID0gJyc7XG4gIGxldCBwYWdlU2l6ZSA9IDEwO1xuICBsZXQgZGF0YXNldDogc3RyaW5nID0gJyc7XG4gIGxldCB0aXRsZSA9ICcnO1xuICBpZiAoanNvbi5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgY29sc1BlcmNlbnRhZ2U6IHN0cmluZyA9IChPYmplY3QudmFsdWVzKGpzb25bMF0pIGFzIHN0cmluZ1tdKVxuICAgICAgLm1hcChyID0+IGAnJHtyfSUnYClcbiAgICAgIC5qb2luKCcsJyk7XG4gICAgY29uc3QgY29sc1BlcmNlbnRhZ2VBcnJheSA9IGBbJHtjb2xzUGVyY2VudGFnZX1dYDtcblxuICAgIGxldCBmaWVsZHMgPSAnWyc7XG4gICAgT2JqZWN0LmtleXMoanNvblswXSkuZm9yRWFjaChmaWVsZENvbE5hbWUgPT4ge1xuICAgICAgbGV0IGVsZW0gPSBqc29uWzFdW2ZpZWxkQ29sTmFtZV0gPyBgJyR7anNvblsxXVtmaWVsZENvbE5hbWVdfSdgIDogYCcnYDtcbiAgICAgIGZpZWxkcyArPSBlbGVtICsgJywnO1xuICAgIH0pO1xuICAgIGZpZWxkcyArPSAnXSc7XG5cbiAgICBkYXRhc2V0ID0ganNvblsxXVsnZGF0YXNldCddIGFzIHN0cmluZztcbiAgICB0aXRsZSA9IGpzb25bMV1bJ3RpdGxlJ10gYXMgc3RyaW5nO1xuICAgIHBhZ2VTaXplID0ganNvblsxXVsncGFnZVNpemUnXSA/ICtqc29uWzFdWydwYWdlU2l6ZSddIDogMTA7XG4gICAgY29uc3QgbGlua0ZpZWxkID0ganNvblsxXVsnbGlua19maWVsZCddIGFzIHN0cmluZztcbiAgICBjb25zdCBsaW5rUG9zID0ganNvblsxXVsnbGlua19wb3NpdGlvbiddID8gK2pzb25bMV1bJ2xpbmtfcG9zaXRpb24nXSA6IDA7XG4gICAgY29uc3Qgcm93TGluayA9XG4gICAgICBsaW5rRmllbGQgJiYgbGlua0ZpZWxkLmxlbmd0aCA/IGB7J2xpbmsnOiAnJHtsaW5rRmllbGR9JywgJ3Bvc2l0aW9uJzogJHtsaW5rUG9zfX1gIDogbnVsbDtcbiAgICBjb25zdCBjZWxsU3R5bGVzID0ganNvblsxXVsnY2VsbFN0eWxlcyddO1xuICAgIGNvbnN0IHJvd1N0eWxlID0ganNvblsxXVsncm93U3R5bGUnXTtcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JBID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQSddIGFzIHN0cmluZztcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JCID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQiddIGFzIHN0cmluZztcblxuICAgIGZvcm11bGEgPVxuICAgICAgYGJ1aWxkV2lkZ2V0RGF0YXNldCgke2RhdGFzZXR9LCAke2ZpZWxkc30sICR7cm93TGlua30sICR7Y2VsbFN0eWxlc30sYCArXG4gICAgICBgJHtyb3dTdHlsZX0sICR7Y29sc1BlcmNlbnRhZ2VBcnJheX0sICR7SlNPTi5zdHJpbmdpZnkoYmFja2dyb3VuZENvbG9yQSl9LCAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgKX0pYDtcbiAgfVxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlBhZ2luYXRlZExpc3QsXG4gICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgIHRpdGxlOiB0aXRsZSxcbiAgICBjb250ZW50RGVmaW5pdGlvbjoge1xuICAgICAgZm9ybXVsYTogZm9ybXVsYSxcbiAgICB9LFxuICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgc3R5bGVzOiB7XG4gICAgICBoZWlnaHQ6ICc1MDBweCcsXG4gICAgfSxcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgd2lkZ2V0IHdpdGggYSBkeW5hbWljIHBhZ2luYXRlZCB0YWJsZSBiYXNlZCBvbiBhIGxpc3Qgb2YgRm9ybXMuIEVhY2ggcm93IGlzIGFuIEFqZkRpYWxvZ1dpZGdldCB3aXRoIGFuIEFqZlRhYmxlXG4gKiB0aGF0IG9wZW4sIG9uIGNsaWNrLCBhIGRpYWxvZy5cbiAqIEBwYXJhbSBzaGVldE5hbWVcbiAqIEBwYXJhbSBqc29uXG4gKiBAcmV0dXJucyBhIFBhZ2luYXRlZCBBamZXaWRnZXQgd2l0aCBhIGZvcm11bGEgbGlrZSB0aGlzOlxuICogYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZyhwcm9qZWN0c0RhdGFzZXQsIFsnaWRfcCcsJ2Rvbm9ycycsJ3Byb3ZpbmNlX2Nob2ljZXNMYWJlbCcsJ2Rpbm9fYXJlYV9uYW1lJywnY2FsY19wcm9ncmVzcycsJ2hvbWVfbGlua190ZXh0JyxdLFxuICogIFsnaWRfcCcsJ2Rvbm9ycycsJ3Byb3ZpbmNlX2Nob2ljZXNMYWJlbCcsJ2Rpbm9fYXJlYV9uYW1lJ10sIFsnQ29kaWNlIHByb2dldHRvJywnRG9ub3JzJywnUHJvdmluY2VzJywnU2V0dG9yZSBkaSBhdHRpdml0YSddLFxuICogIHsnYm9yZGVyJzogJ25vbmUnfSx7J3dpZHRoJzogJzkwMHB4J30sIFsnMTAlJywnMzAlJywnMTAlJywnMjUlJywnMTUlJywnMTAlJ10sIFxcXCIjZjBmMGYwXFxcIiwgXFxcIndoaXRlXFxcIilcbiAqL1xuZnVuY3Rpb24gX2J1aWxkUGFnaW5hdGVkTGlzdFRhYmxlV2l0aERpYWxvZyhfOiBzdHJpbmcsIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBsZXQgZm9ybXVsYSA9ICcnO1xuICBsZXQgcGFnZVNpemUgPSAxMDtcbiAgbGV0IGRhdGFzZXQ6IHN0cmluZyA9ICcnO1xuICBsZXQgdGl0bGUgPSAnJztcbiAgaWYgKGpzb24ubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGNvbHNQZXJjZW50YWdlOiBzdHJpbmcgPSAoT2JqZWN0LnZhbHVlcyhqc29uWzBdKSBhcyBzdHJpbmdbXSlcbiAgICAgIC5tYXAociA9PiBgJyR7cn0lJ2ApXG4gICAgICAuam9pbignLCcpO1xuICAgIGNvbnN0IGNvbHNQZXJjZW50YWdlQXJyYXkgPSBgWyR7Y29sc1BlcmNlbnRhZ2V9XWA7XG5cbiAgICBsZXQgZmllbGRzID0gJ1snO1xuICAgIE9iamVjdC5rZXlzKGpzb25bMF0pLmZvckVhY2goZmllbGRDb2xOYW1lID0+IHtcbiAgICAgIGxldCBlbGVtID0ganNvblsxXVtmaWVsZENvbE5hbWVdID8gYCcke2pzb25bMV1bZmllbGRDb2xOYW1lXX0nYCA6IGAnJ2A7XG4gICAgICBmaWVsZHMgKz0gZWxlbSArICcsJztcbiAgICB9KTtcbiAgICBmaWVsZHMgKz0gJ10nO1xuXG4gICAgbGV0IGRpYWxvZ0ZpZWxkcyA9ICdbJztcbiAgICBsZXQgZGlhbG9nTGFiZWxGaWVsZHMgPSAnWyc7XG4gICAgaWYgKGpzb24ubGVuZ3RoID4gMykge1xuICAgICAgZGlhbG9nTGFiZWxGaWVsZHMgKz0gKE9iamVjdC52YWx1ZXMoanNvblsyXSkgYXMgc3RyaW5nW10pLm1hcCh2ID0+IGAnJHt2fSdgKS5qb2luKCcsJyk7XG4gICAgICBkaWFsb2dGaWVsZHMgKz0gKE9iamVjdC52YWx1ZXMoanNvblszXSkgYXMgc3RyaW5nW10pLm1hcCh2ID0+IGAnJHt2fSdgKS5qb2luKCcsJyk7XG4gICAgfVxuICAgIGRpYWxvZ0ZpZWxkcyArPSAnXSc7XG4gICAgZGlhbG9nTGFiZWxGaWVsZHMgKz0gJ10nO1xuXG4gICAgZGF0YXNldCA9IGpzb25bMV1bJ2RhdGFzZXQnXSBhcyBzdHJpbmc7XG4gICAgdGl0bGUgPSBqc29uWzFdWyd0aXRsZSddIGFzIHN0cmluZztcbiAgICBwYWdlU2l6ZSA9IGpzb25bMV1bJ3BhZ2VTaXplJ10gPyAranNvblsxXVsncGFnZVNpemUnXSA6IDEwO1xuICAgIGNvbnN0IGNlbGxTdHlsZXMgPSBqc29uWzFdWydjZWxsU3R5bGVzJ107XG4gICAgY29uc3Qgcm93U3R5bGUgPSBqc29uWzFdWydyb3dTdHlsZSddO1xuICAgIGNvbnN0IGJhY2tncm91bmRDb2xvckEgPSBqc29uWzFdWydiYWNrZ3JvdW5kQ29sb3JBJ10gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGJhY2tncm91bmRDb2xvckIgPSBqc29uWzFdWydiYWNrZ3JvdW5kQ29sb3JCJ10gYXMgc3RyaW5nO1xuXG4gICAgZm9ybXVsYSA9XG4gICAgICBgYnVpbGRXaWRnZXREYXRhc2V0V2l0aERpYWxvZygke2RhdGFzZXR9LCAke2ZpZWxkc30sICR7ZGlhbG9nRmllbGRzfSwgJHtkaWFsb2dMYWJlbEZpZWxkc30sICR7Y2VsbFN0eWxlc30sYCArXG4gICAgICBgJHtyb3dTdHlsZX0sICR7Y29sc1BlcmNlbnRhZ2VBcnJheX0sICR7SlNPTi5zdHJpbmdpZnkoYmFja2dyb3VuZENvbG9yQSl9LCAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3JCLFxuICAgICAgKX0pYDtcbiAgfVxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlBhZ2luYXRlZExpc3QsXG4gICAgcGFnZVNpemU6IHBhZ2VTaXplLFxuICAgIHRpdGxlOiB0aXRsZSxcbiAgICBjb250ZW50RGVmaW5pdGlvbjoge1xuICAgICAgZm9ybXVsYTogZm9ybXVsYSxcbiAgICB9LFxuICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgc3R5bGVzOiB7XG4gICAgICBoZWlnaHQ6ICc1MDBweCcsXG4gICAgfSxcbiAgfSk7XG59XG5cbmNvbnN0IF9idWlsZEhlYXRtYXAgPSAoXzogc3RyaW5nLCBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0ID0+IHtcbiAgY29uc3QgZGVmYXVsdEZlYXR1cmVzID0ge1xuICAgIHR5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsXG4gICAgZmVhdHVyZXM6IFtdLFxuICB9O1xuICBjb25zdCBvcHRpb25zID0ge1xuICAgIHZhbHVlczogJ1tdJyxcbiAgICBpZFByb3A6ICdpZCcsXG4gICAgZmVhdHVyZXM6IEpTT04uc3RyaW5naWZ5KGRlZmF1bHRGZWF0dXJlcyksXG4gICAgc3RhcnRDb2xvcjogJyNmZmViM2InLFxuICAgIGVuZENvbG9yOiAnI2Y0NDMzNicsXG4gICAgaGlnaGxpZ2h0Q29sb3I6ICcjMDA5Njg4JyxcbiAgICBzaG93VmlzdWFsTWFwOiBmYWxzZSxcbiAgICAuLi4oanNvbi5sZW5ndGggPiAwID8ganNvblswXSA6IHt9KSxcbiAgfTtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5IZWF0TWFwLFxuICAgIC4uLm9wdGlvbnMsXG4gICAgdmFsdWVzOiB7Zm9ybXVsYTogb3B0aW9ucy52YWx1ZXN9LFxuICAgIHN0eWxlczoge1xuICAgICAgbWluSGVpZ2h0OiAnMjAwcHgnLFxuICAgIH0sXG4gIH0pO1xufTtcbiJdfQ==