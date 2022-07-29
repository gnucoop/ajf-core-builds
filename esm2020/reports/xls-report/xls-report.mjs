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
                else if (sheetName.includes('formlist')) {
                    const formListWidget = _buildFormListTable(sheetName, json);
                    reportWidgets.push(formListWidget);
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
    const rowspan = 1;
    const titles = Object.keys(json[0]);
    const colspans = Object.values(json[0]).map(r => +r);
    delete json[0];
    const tableHeader = titles.map((title, index) => ({
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
        },
    }));
    console.log(json);
    let dataRows = '[';
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
    return createWidget({
        widgetType: AjfWidgetType.DynamicTable,
        rowDefinition: {
            formula: `buildDataset(plainArray(${dataRows}),${JSON.stringify(colspans)})`,
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
/**
 * Create a widget with a dynamic table based on a list of Forms
 * @param sheetName
 * @param json
 * @returns a DynamicTable AjfWidget with a formula like this:
 * buildFormDataset(projectsDataset, ['id_p','donors','budget','dino_area_name','calc_progress',])"
 */
function _buildFormListTable(_, json) {
    let tableHeader = [];
    let dataset = '';
    let formula = '';
    if (json.length > 1) {
        const rowspan = 1;
        const titles = Object.keys(json[0]);
        const headerColspans = Object.values(json[0]).map(r => +r);
        tableHeader = titles.map((title, index) => ({
            label: '',
            formula: { formula: `"${title}"` },
            aggregation: { aggregation: 0 },
            colspan: headerColspans[index],
            rowspan,
            style: {
                textAlign: 'center',
                fontWeight: 'bold',
                color: 'white',
                backgroundColor: '#3f51b5',
            },
        }));
        let fields = '[';
        Object.keys(json[0]).forEach(fieldColName => {
            let elem = json[1][fieldColName] ? `'${json[1][fieldColName]}'` : `''`;
            fields += elem + ',';
        });
        fields += ']';
        dataset = json[1]['dataset'];
        const linkField = json[1]['link_field'];
        const linkPos = json[1]['link_position'] ? +json[1]['link_position'] : 0;
        const rowLink = linkField && linkField.length ? `{'link': '${linkField}', 'position': ${linkPos}}` : null;
        const backgroundColorA = json[1]['backgroundColorA'] || null;
        const backgroundColorB = json[1]['backgroundColorB'] || null;
        formula = `buildFormDataset(${dataset}, ${fields}, ${rowLink}, ${JSON.stringify(backgroundColorA)}, ${JSON.stringify(backgroundColorB)})`;
    }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzLXJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMveGxzLXJlcG9ydC94bHMtcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBYSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHekMsT0FBTyxFQUFDLFFBQVEsRUFBYyxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25DLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBSS9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQVE1RDs7R0FFRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBWSxFQUFFLElBQWdCO0lBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDbkQs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QVMsRUFBRSxPQUFPO1NBQ25CO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm11bGEsIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtDaGFydENvbG9yfSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQge2ZvcmtKb2luLCBPYnNlcnZhYmxlLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgWExTWCBmcm9tICd4bHN4JztcblxuaW1wb3J0IHtiYWNrZ3JvdW5kQ29sb3J9IGZyb20gJy4uL2F1dG9tYXRpYy1yZXBvcnQvc3R5bGVzJztcblxuaW1wb3J0IHtpbmRpY2F0b3JUb0pzfSBmcm9tICcuL2hpbmRpa2l0LXBhcnNlcic7XG5pbXBvcnQge2h0bWxXaWRnZXQsIHdpZGdldFN0eWxlfSBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQge2NyZWF0ZURhdGFzZXR9IGZyb20gJy4uL3V0aWxzL2RhdGFzZXQvY3JlYXRlLWRhdGFzZXQnO1xuaW1wb3J0IHtjcmVhdGVSZXBvcnRDb250YWluZXJ9IGZyb20gJy4uL3V0aWxzL3JlcG9ydHMvY3JlYXRlLXJlcG9ydC1jb250YWluZXInO1xuaW1wb3J0IHtBamZXaWRnZXRDcmVhdGUsIGNyZWF0ZVdpZGdldH0gZnJvbSAnLi4vdXRpbHMvd2lkZ2V0cy9jcmVhdGUtd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuaW1wb3J0IHtBamZUYWJsZURhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L3RhYmxlLWRhdGFzZXQnO1xuaW1wb3J0IHtBamZDaGFydERhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L2NoYXJ0LWRhdGFzZXQnO1xuaW1wb3J0IHtBamZDaGFydERhdGFzZXRPcHRpb25zfSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9jaGFydC1kYXRhc2V0LW9wdGlvbnMnO1xuaW1wb3J0IHtBamZDaGFydFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS9jaGFydHMvY2hhcnQtdHlwZSc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7QWpmUmVwb3J0fSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuaW1wb3J0IHtBamZSZXBvcnRWYXJpYWJsZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LXZhcmlhYmxlJztcbmltcG9ydCB7QWpmTGF5b3V0V2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9sYXlvdXQtd2lkZ2V0JztcbmltcG9ydCB7QWpmQ29sdW1uV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9jb2x1bW4td2lkZ2V0JztcbmltcG9ydCB7QWpmR3JhcGhOb2RlRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvZ3JhcGgtZGF0YXNldCc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBidWlsZHMgYSByZXBvcnQgZnJvbSBhbiBleGNlbCBmaWxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24geGxzUmVwb3J0KGZpbGU6IHN0cmluZywgaHR0cDogSHR0cENsaWVudCk6IE9ic2VydmFibGU8QWpmUmVwb3J0PiB7XG4gIGNvbnN0IHdvcmtib29rID0gWExTWC5yZWFkKGZpbGUsIHt0eXBlOiAnYmluYXJ5J30pO1xuICBjb25zdCByZXBvcnQ6IEFqZlJlcG9ydCA9IHt9O1xuICBjb25zdCByZXBvcnRXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuXG4gIGNvbnN0IHZhcmlhYmxlczogQWpmUmVwb3J0VmFyaWFibGVbXSA9IFtdO1xuICBjb25zdCBmaWx0ZXJzOiB7W3NoZWV0TmFtZTogc3RyaW5nXTogT2JzZXJ2YWJsZTxhbnk+fSA9IHt9O1xuICAvLyBjcmVhdGUgZmlsdGVyc1xuICB3b3JrYm9vay5TaGVldE5hbWVzLmZvckVhY2goKHNoZWV0TmFtZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBzaGVldDogWExTWC5Xb3JrU2hlZXQgPSB3b3JrYm9vay5TaGVldHNbc2hlZXROYW1lXTtcbiAgICBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdmaWx0ZXInKSAmJiBpbmRleCArIDEgPCB3b3JrYm9vay5TaGVldE5hbWVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbmV4dFNoZWV0ID0gc2hlZXROYW1lLmluY2x1ZGVzKCdnbG9iYWwnKVxuICAgICAgICA/ICdnbG9iYWxfZmlsdGVyJ1xuICAgICAgICA6IHdvcmtib29rLlNoZWV0TmFtZXNbaW5kZXggKyAxXTtcbiAgICAgIGZpbHRlcnNbbmV4dFNoZWV0XSA9IF9idWlsZEZpbHRlcih3b3JrYm9vaywgc2hlZXQsIGh0dHApO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3Qgb2JzRmlsdGVyVmFsdWVzOiBPYnNlcnZhYmxlPGFueT5bXSA9IE9iamVjdC52YWx1ZXMoZmlsdGVycykubGVuZ3RoXG4gICAgPyBPYmplY3QudmFsdWVzKGZpbHRlcnMpXG4gICAgOiBbb2Yoe30pXTtcbiAgY29uc3QgZmlsdGVyTmFtZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZmlsdGVycyk7XG5cbiAgcmV0dXJuIGZvcmtKb2luKG9ic0ZpbHRlclZhbHVlcykucGlwZShcbiAgICBtYXAoZiA9PiB7XG4gICAgICB3b3JrYm9vay5TaGVldE5hbWVzLmZvckVhY2goc2hlZXROYW1lID0+IHtcbiAgICAgICAgY29uc3Qgc2hlZXQ6IFhMU1guV29ya1NoZWV0ID0gd29ya2Jvb2suU2hlZXRzW3NoZWV0TmFtZV07XG4gICAgICAgIGNvbnN0IGpzb24gPSBYTFNYLnV0aWxzLnNoZWV0X3RvX2pzb24oc2hlZXQpIGFzIHtcbiAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgICAgdmFsdWU6IHN0cmluZztcbiAgICAgICAgICBfX3Jvd051bV9fOiBzdHJpbmc7XG4gICAgICAgIH1bXTtcblxuICAgICAgICBpZiAoc2hlZXROYW1lID09PSAndmFyaWFibGVzJykge1xuICAgICAgICAgIGpzb25cbiAgICAgICAgICAgIC5maWx0ZXIoZSA9PiBlICE9IG51bGwgJiYgZS5uYW1lICE9IG51bGwgJiYgZS5uYW1lICE9PSAnJylcbiAgICAgICAgICAgIC5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICBsZXQganM6IHN0cmluZztcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBqcyA9IGluZGljYXRvclRvSnMoZWxlbS52YWx1ZSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgciA9IGVsZW0uX19yb3dOdW1fXztcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGluIHZhcmlhYmxlIFwiJHtlbGVtLm5hbWV9XCIgKHJvdyAke3J9KTogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXJpYWJsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogZWxlbS5uYW1lLFxuICAgICAgICAgICAgICAgIGZvcm11bGE6IHtmb3JtdWxhOiBqc30sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaWR4ID0gZmlsdGVyTmFtZXMuaW5kZXhPZihzaGVldE5hbWUpO1xuXG4gICAgICAgICAgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygndGFibGUnKSkge1xuICAgICAgICAgICAgY29uc3QgdGFibGVXaWRnZXQgPSBfYnVpbGRUYWJsZShzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKHRhYmxlV2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnY2hhcnQnKSkge1xuICAgICAgICAgICAgY29uc3QgY2hhcnRXaWRnZXQgPSBfYnVpbGRDaGFydChzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGNoYXJ0V2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnaHRtbCcpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFydFdpZGdldCA9IF9idWlsZEh0bWwoanNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goY2hhcnRXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdncmFwaCcpKSB7XG4gICAgICAgICAgICBjb25zdCBncmFwaFdpZGdldCA9IF9idWlsZEdyYXBoKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goZ3JhcGhXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdoZWF0bWFwJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYXRtYXBXaWRnZXQgPSBfYnVpbGRIZWF0bWFwKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goaGVhdG1hcFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ2Zvcm1saXN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IGZvcm1MaXN0V2lkZ2V0ID0gX2J1aWxkRm9ybUxpc3RUYWJsZShzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGZvcm1MaXN0V2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygncGFnaW5hdGVkbGlzdCcpKSB7XG4gICAgICAgICAgICBjb25zdCBwYWdMaXN0V2lkZ2V0ID0gX2J1aWxkUGFnaW5hdGVkTGlzdFRhYmxlKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2gocGFnTGlzdFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ3BhZ2luYXRlZERpYWxvZ0xpc3QnKSkge1xuICAgICAgICAgICAgY29uc3QgcGFnTGlzdFdpZGdldCA9IF9idWlsZFBhZ2luYXRlZExpc3RUYWJsZVdpdGhEaWFsb2coc2hlZXROYW1lLCBqc29uKTtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHMucHVzaChwYWdMaXN0V2lkZ2V0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHNbcmVwb3J0V2lkZ2V0cy5sZW5ndGggLSAxXS5maWx0ZXIgPSB7XG4gICAgICAgICAgICAgIHNjaGVtYTogZltpZHhdIGFzIGFueSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGdsb2JhbEZpbHRlcklkeCA9IGZpbHRlck5hbWVzLmluZGV4T2YoJ2dsb2JhbF9maWx0ZXInKTtcbiAgICAgIGNvbnN0IGxheW91dFdpZGdldDogQWpmTGF5b3V0V2lkZ2V0ID0ge1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkxheW91dCxcbiAgICAgICAgY29udGVudDogW1xuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFsuLi5yZXBvcnRXaWRnZXRzXSxcbiAgICAgICAgICAgIGZpbHRlcjogZ2xvYmFsRmlsdGVySWR4ID49IDAgPyB7c2NoZW1hOiBmW2dsb2JhbEZpbHRlcklkeF19IDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0gYXMgQWpmQ29sdW1uV2lkZ2V0KSxcbiAgICAgICAgXSxcbiAgICAgICAgY29sdW1uczogWzFdLFxuICAgICAgICB2aXNpYmlsaXR5OiB7XG4gICAgICAgICAgY29uZGl0aW9uOiAndHJ1ZScsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge30sXG4gICAgICB9O1xuXG4gICAgICByZXBvcnQudmFyaWFibGVzID0gdmFyaWFibGVzO1xuICAgICAgcmVwb3J0LmNvbnRlbnQgPSBjcmVhdGVSZXBvcnRDb250YWluZXIobGF5b3V0V2lkZ2V0KTtcblxuICAgICAgcmV0dXJuIHJlcG9ydDtcbiAgICB9KSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkRmlsdGVyKFxuICB3Ym9vazogWExTWC5Xb3JrQm9vayxcbiAgc2hlZXQ6IFhMU1guV29ya1NoZWV0LFxuICBodHRwOiBIdHRwQ2xpZW50LFxuKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBjb25zdCBmaWx0ZXJCb29rOiBYTFNYLldvcmtCb29rID0gZGVlcENvcHkod2Jvb2spO1xuICBjb25zdCBmaWx0ZXJTaGVldDogWExTWC5Xb3JrU2hlZXQgPSBkZWVwQ29weShzaGVldCk7XG4gIGNvbnN0IGNob2ljZXNTaGVldDogWExTWC5Xb3JrU2hlZXQgPSBkZWVwQ29weSh3Ym9vay5TaGVldHNbJ2Nob2ljZXMnXSk7XG4gIGZpbHRlckJvb2suU2hlZXROYW1lcyA9IFsnc3VydmV5JywgJ2Nob2ljZXMnXTtcbiAgZmlsdGVyQm9vay5TaGVldHMgPSB7c3VydmV5OiBmaWx0ZXJTaGVldCwgY2hvaWNlczogY2hvaWNlc1NoZWV0fTtcbiAgY29uc3QgZmlsdGVyWGxzeCA9IFhMU1gud3JpdGUoZmlsdGVyQm9vaywge1xuICAgIGJvb2tUeXBlOiAneGxzeCcsXG4gICAgdHlwZTogJ2FycmF5JyxcbiAgfSk7XG4gIGNvbnN0IGZpbGUgPSBuZXcgRmlsZShbZmlsdGVyWGxzeF0sICdmaWx0ZXIueGxzeCcpO1xuICBkYXRhLmFwcGVuZCgnZXhjZWxGaWxlJywgZmlsZSk7XG5cbiAgcmV0dXJuIGh0dHAucG9zdCgnaHR0cHM6Ly9mb3JtY29udi5oZXJva3VhcHAuY29tL3Jlc3VsdC5qc29uJywgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZENoYXJ0KG5hbWU6IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGNvbnN0IG9wdGlvbkxhYmVscyA9IFsnY2hhcnRUeXBlJywgJ3RpdGxlJ107XG4gIGNvbnN0IGNoYXJ0T3B0aW9uczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgY29uc3QgZGF0YXNldE9iajoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgY29uc3QgZGF0YXNldDogQWpmQ2hhcnREYXRhc2V0W10gPSBbXTtcbiAgbGV0IGxhYmVsczogQWpmRm9ybXVsYSA9IHtmb3JtdWxhOiAnW10nfTtcblxuICBpZiAoanNvbi5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZmlyc3RSb3cgPSBqc29uWzBdO1xuICAgIG9wdGlvbkxhYmVscy5mb3JFYWNoKG9wdGlvbkxhYmVsID0+IHtcbiAgICAgIGlmIChmaXJzdFJvd1tvcHRpb25MYWJlbF0gIT0gbnVsbCkge1xuICAgICAgICBjaGFydE9wdGlvbnNbb3B0aW9uTGFiZWxdID0gZmlyc3RSb3dbb3B0aW9uTGFiZWxdO1xuICAgICAgICBkZWxldGUgZmlyc3RSb3dbb3B0aW9uTGFiZWxdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGpzb24uZm9yRWFjaChyb3cgPT4ge1xuICAgIGNvbnN0IHJvd0tleXMgPSBPYmplY3Qua2V5cyhyb3cpO1xuICAgIHJvd0tleXMuZm9yRWFjaChyb3dLZXkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSByb3dbcm93S2V5XTtcbiAgICAgIGlmIChkYXRhc2V0T2JqW3Jvd0tleV0gPT0gbnVsbCkge1xuICAgICAgICBkYXRhc2V0T2JqW3Jvd0tleV0gPSBbdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YXNldE9ialtyb3dLZXldLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgY29uc3QgZG9MYWJlbHMgPSBkYXRhc2V0T2JqWydsYWJlbHMnXTtcbiAgaWYgKGRvTGFiZWxzICE9IG51bGwpIHtcbiAgICBsZXQgbGFiZWxzSnM6IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgbGFiZWxzSnMgPSBpbmRpY2F0b3JUb0pzKCdbJyArIGRvTGFiZWxzLmpvaW4oKSArICddJyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW4gXCJsYWJlbHNcIiBvZiBjaGFydCBcIiR7Y2hhcnRPcHRpb25zWyd0aXRsZSddfVwiOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgd2luZG93LmFsZXJ0KGVyci5tZXNzYWdlKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgbGFiZWxzID0ge2Zvcm11bGE6IGBwbGFpbkFycmF5KCR7bGFiZWxzSnN9KWB9O1xuICAgIGRlbGV0ZSBkYXRhc2V0T2JqWydsYWJlbHMnXTtcbiAgfVxuICBPYmplY3Qua2V5cyhkYXRhc2V0T2JqKS5mb3JFYWNoKChkYXRhc2V0T2JqS2V5LCBpbmRleCkgPT4ge1xuICAgIGxldCBkYXRhc2V0SnM6IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgZGF0YXNldEpzID0gaW5kaWNhdG9yVG9KcygnWycgKyBkYXRhc2V0T2JqW2RhdGFzZXRPYmpLZXldLmpvaW4oKSArICddJyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgYEVycm9yIGluIFwiJHtkYXRhc2V0T2JqS2V5fVwiIG9mIGNoYXJ0IFwiJHtjaGFydE9wdGlvbnNbJ3RpdGxlJ119XCI6ICR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgICk7XG4gICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYXJ0VHlwZSA9IGNoYXJ0T3B0aW9uc1snY2hhcnRUeXBlJ107XG4gICAgY29uc3QgY29sb3JDb25kaXRpb24gPVxuICAgICAgY2hhcnRUeXBlID09PSAnUGllJyB8fCBjaGFydFR5cGUgPT09ICdQb2xhckFyZWEnIHx8IGNoYXJ0VHlwZSA9PT0gJ0RvdWdobnV0JztcbiAgICBjb25zdCBiYWNrQ29sb3IgPSBjb2xvckNvbmRpdGlvbiA/IGJhY2tncm91bmRDb2xvciA6IGJhY2tncm91bmRDb2xvcltpbmRleF07XG4gICAgY29uc3QgZm9ybXVsYTogQWpmRm9ybXVsYVtdID0gW1xuICAgICAgY3JlYXRlRm9ybXVsYSh7XG4gICAgICAgIGZvcm11bGE6IGBwbGFpbkFycmF5KCR7ZGF0YXNldEpzfSlgLFxuICAgICAgfSksXG4gICAgXTtcbiAgICBjb25zdCBkYXRhc2V0T3B0aW9uczogQWpmQ2hhcnREYXRhc2V0T3B0aW9ucyA9IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja0NvbG9yIGFzIENoYXJ0Q29sb3IsXG4gICAgfTtcbiAgICBkYXRhc2V0LnB1c2goe1xuICAgICAgLi4uY3JlYXRlRGF0YXNldCh7XG4gICAgICAgIGFnZ3JlZ2F0aW9uOiB7YWdncmVnYXRpb246IDB9LFxuICAgICAgICBmb3JtdWxhLFxuICAgICAgICBsYWJlbDogZGF0YXNldE9iaktleSxcbiAgICAgIH0pLFxuICAgICAgb3B0aW9uczogZGF0YXNldE9wdGlvbnMsXG4gICAgfSBhcyBBamZDaGFydERhdGFzZXQpO1xuICB9KTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICBuYW1lLFxuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgdHlwZTogQWpmQ2hhcnRUeXBlW2NoYXJ0T3B0aW9uc1snY2hhcnRUeXBlJ10gYXMgYW55XSBhcyB1bmtub3duIGFzIEFqZkNoYXJ0VHlwZSxcbiAgICBsYWJlbHMsXG4gICAgZGF0YXNldCxcbiAgICBvcHRpb25zOiB7XG4gICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgdGV4dDogY2hhcnRPcHRpb25zWyd0aXRsZSddIHx8ICcnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHN0eWxlczoge1xuICAgICAgLi4ue3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBwYWRkaW5nOiAnMjBweCd9LFxuICAgICAgLi4ud2lkZ2V0U3R5bGUsXG4gICAgfSxcbiAgICBleHBvcnRhYmxlOiB0cnVlLFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZEdyYXBoKG5hbWU6IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGNvbnN0IG5vZGVzOiBBamZHcmFwaE5vZGVEYXRhc2V0W10gPSBbXTtcblxuICBqc29uLmZvckVhY2gocm93ID0+IHtcbiAgICBjb25zdCByb3dLZXlzID0gT2JqZWN0LmtleXMocm93KTtcbiAgICBpZiAocm93S2V5cy5pbmNsdWRlcygnaWQnKSAmJiByb3dbJ2lkJ10pIHtcbiAgICAgIGNvbnN0IHJvd0lkID0gcm93WydpZCddLnRyaW0oKS5yZXBsYWNlKC9cIi9nLCAnJyk7XG4gICAgICBpZiAocm93SWQgJiYgcm93SWQubGVuZ3RoKSB7XG4gICAgICAgIGxldCBncmFwaE5vZGVPYmo6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgICAgIHJvd0tleXMuZm9yRWFjaChyb3dLZXkgPT4ge1xuICAgICAgICAgIGxldCBqczogc3RyaW5nO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBqcyA9IGluZGljYXRvclRvSnMocm93W3Jvd0tleV0pO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICBjb25zdCByb3dOdW0gPSByb3dbJ19fcm93TnVtX18nXTtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYEVycm9yIGluIFwiJHtuYW1lfVwiLCByb3cgJHtyb3dOdW19LCBjb2x1bW4gXCIke3Jvd0tleX1cIjogJHtlcnIubWVzc2FnZX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGdyYXBoTm9kZU9ialtyb3dLZXldID0ganM7XG4gICAgICAgIH0pO1xuICAgICAgICBncmFwaE5vZGVPYmpbJ2lkJ10gPSByb3dJZDtcbiAgICAgICAgbm9kZXMucHVzaChncmFwaE5vZGVPYmogYXMgQWpmR3JhcGhOb2RlRGF0YXNldCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkdyYXBoLFxuICAgIG5vZGVzLFxuICAgIHN0eWxlczoge30sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkSHRtbChqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgY29uc3QgZmlyc3RSb3cgPSBqc29uLmxlbmd0aCA+IDAgJiYganNvblswXVsnaHRtbCddICE9IG51bGwgPyBqc29uWzBdIDoge2h0bWw6ICcnfTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgaHRtbFRleHQ6IFN0cmluZyhmaXJzdFJvd1snaHRtbCddKSxcbiAgICBzdHlsZXM6IGh0bWxXaWRnZXQsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRUYWJsZShzaGVldE5hbWU6IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGNvbnN0IHJvd3NwYW4gPSAxO1xuICBjb25zdCB0aXRsZXMgPSBPYmplY3Qua2V5cyhqc29uWzBdKTtcbiAgY29uc3QgY29sc3BhbnM6IG51bWJlcltdID0gKE9iamVjdC52YWx1ZXMoanNvblswXSkgYXMgc3RyaW5nW10pLm1hcChyID0+ICtyKTtcbiAgZGVsZXRlIGpzb25bMF07XG4gIGNvbnN0IHRhYmxlSGVhZGVyOiBBamZUYWJsZURhdGFzZXRbXSA9IHRpdGxlcy5tYXAoKHRpdGxlLCBpbmRleCkgPT4gKHtcbiAgICBsYWJlbDogJycsXG4gICAgZm9ybXVsYToge2Zvcm11bGE6IGBcIiR7dGl0bGV9XCJgfSxcbiAgICBhZ2dyZWdhdGlvbjoge2FnZ3JlZ2F0aW9uOiAwfSxcbiAgICBjb2xzcGFuOiBjb2xzcGFuc1tpbmRleF0sXG4gICAgcm93c3BhbixcbiAgICBzdHlsZToge1xuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgIGNvbG9yOiAnd2hpdGUnLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzNmNTFiNScsXG4gICAgfSxcbiAgfSkpO1xuXG4gIGNvbnNvbGUubG9nKGpzb24pO1xuICBsZXQgZGF0YVJvd3MgPSAnWyc7XG4gIGpzb24uZm9yRWFjaChyb3cgPT4ge1xuICAgIGxldCBkYXRhUm93ID0gJ1snO1xuICAgIHRpdGxlcy5mb3JFYWNoKHRpdGxlID0+IHtcbiAgICAgIGxldCBlbGVtID0gcm93W3RpdGxlXSB8fCBgJydgO1xuICAgICAgdHJ5IHtcbiAgICAgICAgZWxlbSA9IGluZGljYXRvclRvSnMoZWxlbSk7XG4gICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICBjb25zdCByb3dOdW0gPSByb3dbJ19fcm93TnVtX18nXTtcbiAgICAgICAgZXJyID0gbmV3IEVycm9yKFxuICAgICAgICAgIGBFcnJvciBpbiBcIiR7c2hlZXROYW1lfVwiLCByb3cgJHtyb3dOdW19LCBjb2x1bW4gXCIke3RpdGxlfVwiOiAke2Vyci5tZXNzYWdlfWAsXG4gICAgICAgICk7XG4gICAgICAgIHdpbmRvdy5hbGVydChlcnIubWVzc2FnZSk7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICAgIGRhdGFSb3cgKz0gZWxlbSArICcsJztcbiAgICB9KTtcbiAgICBkYXRhUm93ICs9ICddJztcbiAgICBkYXRhUm93cyArPSBkYXRhUm93ICsgJywnO1xuICB9KTtcbiAgZGF0YVJvd3MgKz0gJ10nO1xuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuRHluYW1pY1RhYmxlLFxuICAgIHJvd0RlZmluaXRpb246IHtcbiAgICAgIGZvcm11bGE6IGBidWlsZERhdGFzZXQocGxhaW5BcnJheSgke2RhdGFSb3dzfSksJHtKU09OLnN0cmluZ2lmeShjb2xzcGFucyl9KWAsXG4gICAgfSxcbiAgICBkYXRhc2V0OiB0YWJsZUhlYWRlcixcbiAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgIGNlbGxTdHlsZXM6IHtcbiAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICBjb2xvcjogJ2JsYWNrJyxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICB9LFxuICAgIHN0eWxlczoge1xuICAgICAgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScsXG4gICAgfSxcbiAgfSk7XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgd2lkZ2V0IHdpdGggYSBkeW5hbWljIHRhYmxlIGJhc2VkIG9uIGEgbGlzdCBvZiBGb3Jtc1xuICogQHBhcmFtIHNoZWV0TmFtZVxuICogQHBhcmFtIGpzb25cbiAqIEByZXR1cm5zIGEgRHluYW1pY1RhYmxlIEFqZldpZGdldCB3aXRoIGEgZm9ybXVsYSBsaWtlIHRoaXM6XG4gKiBidWlsZEZvcm1EYXRhc2V0KHByb2plY3RzRGF0YXNldCwgWydpZF9wJywnZG9ub3JzJywnYnVkZ2V0JywnZGlub19hcmVhX25hbWUnLCdjYWxjX3Byb2dyZXNzJyxdKVwiXG4gKi9cbmZ1bmN0aW9uIF9idWlsZEZvcm1MaXN0VGFibGUoXzogc3RyaW5nLCBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgbGV0IHRhYmxlSGVhZGVyOiBBamZUYWJsZURhdGFzZXRbXSA9IFtdO1xuICBsZXQgZGF0YXNldDogc3RyaW5nID0gJyc7XG4gIGxldCBmb3JtdWxhID0gJyc7XG4gIGlmIChqc29uLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCByb3dzcGFuID0gMTtcbiAgICBjb25zdCB0aXRsZXMgPSBPYmplY3Qua2V5cyhqc29uWzBdKTtcbiAgICBjb25zdCBoZWFkZXJDb2xzcGFuczogbnVtYmVyW10gPSAoT2JqZWN0LnZhbHVlcyhqc29uWzBdKSBhcyBzdHJpbmdbXSkubWFwKHIgPT4gK3IpO1xuICAgIHRhYmxlSGVhZGVyID0gdGl0bGVzLm1hcCgodGl0bGUsIGluZGV4KSA9PiAoe1xuICAgICAgbGFiZWw6ICcnLFxuICAgICAgZm9ybXVsYToge2Zvcm11bGE6IGBcIiR7dGl0bGV9XCJgfSxcbiAgICAgIGFnZ3JlZ2F0aW9uOiB7YWdncmVnYXRpb246IDB9LFxuICAgICAgY29sc3BhbjogaGVhZGVyQ29sc3BhbnNbaW5kZXhdLFxuICAgICAgcm93c3BhbixcbiAgICAgIHN0eWxlOiB7XG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAgY29sb3I6ICd3aGl0ZScsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMzZjUxYjUnLFxuICAgICAgfSxcbiAgICB9KSk7XG5cbiAgICBsZXQgZmllbGRzID0gJ1snO1xuICAgIE9iamVjdC5rZXlzKGpzb25bMF0pLmZvckVhY2goZmllbGRDb2xOYW1lID0+IHtcbiAgICAgIGxldCBlbGVtID0ganNvblsxXVtmaWVsZENvbE5hbWVdID8gYCcke2pzb25bMV1bZmllbGRDb2xOYW1lXX0nYCA6IGAnJ2A7XG4gICAgICBmaWVsZHMgKz0gZWxlbSArICcsJztcbiAgICB9KTtcbiAgICBmaWVsZHMgKz0gJ10nO1xuICAgIGRhdGFzZXQgPSBqc29uWzFdWydkYXRhc2V0J10gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGxpbmtGaWVsZCA9IGpzb25bMV1bJ2xpbmtfZmllbGQnXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgbGlua1BvcyA9IGpzb25bMV1bJ2xpbmtfcG9zaXRpb24nXSA/ICtqc29uWzFdWydsaW5rX3Bvc2l0aW9uJ10gOiAwO1xuICAgIGNvbnN0IHJvd0xpbmsgPVxuICAgICAgbGlua0ZpZWxkICYmIGxpbmtGaWVsZC5sZW5ndGggPyBgeydsaW5rJzogJyR7bGlua0ZpZWxkfScsICdwb3NpdGlvbic6ICR7bGlua1Bvc319YCA6IG51bGw7XG5cbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JBID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQSddIHx8IG51bGw7XG4gICAgY29uc3QgYmFja2dyb3VuZENvbG9yQiA9IGpzb25bMV1bJ2JhY2tncm91bmRDb2xvckInXSB8fCBudWxsO1xuXG4gICAgZm9ybXVsYSA9IGBidWlsZEZvcm1EYXRhc2V0KCR7ZGF0YXNldH0sICR7ZmllbGRzfSwgJHtyb3dMaW5rfSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgIGJhY2tncm91bmRDb2xvckEsXG4gICAgKX0sICR7SlNPTi5zdHJpbmdpZnkoYmFja2dyb3VuZENvbG9yQil9KWA7XG4gIH1cblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkR5bmFtaWNUYWJsZSxcbiAgICByb3dEZWZpbml0aW9uOiB7XG4gICAgICBmb3JtdWxhOiBmb3JtdWxhLFxuICAgIH0sXG4gICAgZGF0YXNldDogdGFibGVIZWFkZXIsXG4gICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICBjZWxsU3R5bGVzOiB7XG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgfSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgIH0sXG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHdpZGdldCB3aXRoIGEgZHluYW1pYyBwYWdpbmF0ZWQgdGFibGUgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLiBFYWNoIHJvdyBpcyBhbiBBamZUYWJsZS5cbiAqIEBwYXJhbSBzaGVldE5hbWVcbiAqIEBwYXJhbSBqc29uXG4gKiBAcmV0dXJucyBhIFBhZ2luYXRlZCBBamZXaWRnZXQgd2l0aCBhIGZvcm11bGEgbGlrZSB0aGlzOlxuICogYnVpbGRXaWRnZXREYXRhc2V0KHByb2plY3RzRGF0YXNldCwgWydpZF9wJywnZG9ub3JzJywnYnVkZ2V0JywnZGlub19hcmVhX25hbWUnLCdjYWxjX3Byb2dyZXNzJywnaG9tZV9saW5rX3RleHQnLF0sXG4gKiAgIHsnbGluayc6ICdob21lX2xpbmsnLCAncG9zaXRpb24nOiA1fSwgeydib3JkZXInOiAnbm9uZSd9LHsnd2lkdGgnOiAnOTAwcHgnfSwgWycxMCUnLCczMCUnLCcxMCUnLCcyNSUnLCcxNSUnLCcxMCUnXSwgXFxcIiNmMGYwZjBcXFwiLCBcXFwid2hpdGVcXFwiKVwiXG4gKi9cbmZ1bmN0aW9uIF9idWlsZFBhZ2luYXRlZExpc3RUYWJsZShfOiBzdHJpbmcsIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQge1xuICBsZXQgZm9ybXVsYSA9ICcnO1xuICBsZXQgcGFnZVNpemUgPSAxMDtcbiAgbGV0IGRhdGFzZXQ6IHN0cmluZyA9ICcnO1xuICBsZXQgdGl0bGUgPSAnJztcbiAgaWYgKGpzb24ubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGNvbHNQZXJjZW50YWdlOiBzdHJpbmcgPSAoT2JqZWN0LnZhbHVlcyhqc29uWzBdKSBhcyBzdHJpbmdbXSlcbiAgICAgIC5tYXAociA9PiBgJyR7cn0lJ2ApXG4gICAgICAuam9pbignLCcpO1xuICAgIGNvbnN0IGNvbHNQZXJjZW50YWdlQXJyYXkgPSBgWyR7Y29sc1BlcmNlbnRhZ2V9XWA7XG5cbiAgICBsZXQgZmllbGRzID0gJ1snO1xuICAgIE9iamVjdC5rZXlzKGpzb25bMF0pLmZvckVhY2goZmllbGRDb2xOYW1lID0+IHtcbiAgICAgIGxldCBlbGVtID0ganNvblsxXVtmaWVsZENvbE5hbWVdID8gYCcke2pzb25bMV1bZmllbGRDb2xOYW1lXX0nYCA6IGAnJ2A7XG4gICAgICBmaWVsZHMgKz0gZWxlbSArICcsJztcbiAgICB9KTtcbiAgICBmaWVsZHMgKz0gJ10nO1xuXG4gICAgZGF0YXNldCA9IGpzb25bMV1bJ2RhdGFzZXQnXSBhcyBzdHJpbmc7XG4gICAgdGl0bGUgPSBqc29uWzFdWyd0aXRsZSddIGFzIHN0cmluZztcbiAgICBwYWdlU2l6ZSA9IGpzb25bMV1bJ3BhZ2VTaXplJ10gPyAranNvblsxXVsncGFnZVNpemUnXSA6IDEwO1xuICAgIGNvbnN0IGxpbmtGaWVsZCA9IGpzb25bMV1bJ2xpbmtfZmllbGQnXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgbGlua1BvcyA9IGpzb25bMV1bJ2xpbmtfcG9zaXRpb24nXSA/ICtqc29uWzFdWydsaW5rX3Bvc2l0aW9uJ10gOiAwO1xuICAgIGNvbnN0IHJvd0xpbmsgPVxuICAgICAgbGlua0ZpZWxkICYmIGxpbmtGaWVsZC5sZW5ndGggPyBgeydsaW5rJzogJyR7bGlua0ZpZWxkfScsICdwb3NpdGlvbic6ICR7bGlua1Bvc319YCA6IG51bGw7XG4gICAgY29uc3QgY2VsbFN0eWxlcyA9IGpzb25bMV1bJ2NlbGxTdHlsZXMnXTtcbiAgICBjb25zdCByb3dTdHlsZSA9IGpzb25bMV1bJ3Jvd1N0eWxlJ107XG4gICAgY29uc3QgYmFja2dyb3VuZENvbG9yQSA9IGpzb25bMV1bJ2JhY2tncm91bmRDb2xvckEnXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgYmFja2dyb3VuZENvbG9yQiA9IGpzb25bMV1bJ2JhY2tncm91bmRDb2xvckInXSBhcyBzdHJpbmc7XG5cbiAgICBmb3JtdWxhID1cbiAgICAgIGBidWlsZFdpZGdldERhdGFzZXQoJHtkYXRhc2V0fSwgJHtmaWVsZHN9LCAke3Jvd0xpbmt9LCAke2NlbGxTdHlsZXN9LGAgK1xuICAgICAgYCR7cm93U3R5bGV9LCAke2NvbHNQZXJjZW50YWdlQXJyYXl9LCAke0pTT04uc3RyaW5naWZ5KGJhY2tncm91bmRDb2xvckEpfSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgYmFja2dyb3VuZENvbG9yQixcbiAgICAgICl9KWA7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5QYWdpbmF0ZWRMaXN0LFxuICAgIHBhZ2VTaXplOiBwYWdlU2l6ZSxcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgY29udGVudERlZmluaXRpb246IHtcbiAgICAgIGZvcm11bGE6IGZvcm11bGEsXG4gICAgfSxcbiAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgIHN0eWxlczoge1xuICAgICAgaGVpZ2h0OiAnNTAwcHgnLFxuICAgIH0sXG4gIH0pO1xufVxuXG4vKipcbiAqIENyZWF0ZSBhIHdpZGdldCB3aXRoIGEgZHluYW1pYyBwYWdpbmF0ZWQgdGFibGUgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zLiBFYWNoIHJvdyBpcyBhbiBBamZEaWFsb2dXaWRnZXQgd2l0aCBhbiBBamZUYWJsZVxuICogdGhhdCBvcGVuLCBvbiBjbGljaywgYSBkaWFsb2cuXG4gKiBAcGFyYW0gc2hlZXROYW1lXG4gKiBAcGFyYW0ganNvblxuICogQHJldHVybnMgYSBQYWdpbmF0ZWQgQWpmV2lkZ2V0IHdpdGggYSBmb3JtdWxhIGxpa2UgdGhpczpcbiAqIGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2cocHJvamVjdHNEYXRhc2V0LCBbJ2lkX3AnLCdkb25vcnMnLCdwcm92aW5jZV9jaG9pY2VzTGFiZWwnLCdkaW5vX2FyZWFfbmFtZScsJ2NhbGNfcHJvZ3Jlc3MnLCdob21lX2xpbmtfdGV4dCcsXSxcbiAqICBbJ2lkX3AnLCdkb25vcnMnLCdwcm92aW5jZV9jaG9pY2VzTGFiZWwnLCdkaW5vX2FyZWFfbmFtZSddLCBbJ0NvZGljZSBwcm9nZXR0bycsJ0Rvbm9ycycsJ1Byb3ZpbmNlcycsJ1NldHRvcmUgZGkgYXR0aXZpdGEnXSxcbiAqICB7J2JvcmRlcic6ICdub25lJ30seyd3aWR0aCc6ICc5MDBweCd9LCBbJzEwJScsJzMwJScsJzEwJScsJzI1JScsJzE1JScsJzEwJSddLCBcXFwiI2YwZjBmMFxcXCIsIFxcXCJ3aGl0ZVxcXCIpXG4gKi9cbmZ1bmN0aW9uIF9idWlsZFBhZ2luYXRlZExpc3RUYWJsZVdpdGhEaWFsb2coXzogc3RyaW5nLCBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgbGV0IGZvcm11bGEgPSAnJztcbiAgbGV0IHBhZ2VTaXplID0gMTA7XG4gIGxldCBkYXRhc2V0OiBzdHJpbmcgPSAnJztcbiAgbGV0IHRpdGxlID0gJyc7XG4gIGlmIChqc29uLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCBjb2xzUGVyY2VudGFnZTogc3RyaW5nID0gKE9iamVjdC52YWx1ZXMoanNvblswXSkgYXMgc3RyaW5nW10pXG4gICAgICAubWFwKHIgPT4gYCcke3J9JSdgKVxuICAgICAgLmpvaW4oJywnKTtcbiAgICBjb25zdCBjb2xzUGVyY2VudGFnZUFycmF5ID0gYFske2NvbHNQZXJjZW50YWdlfV1gO1xuXG4gICAgbGV0IGZpZWxkcyA9ICdbJztcbiAgICBPYmplY3Qua2V5cyhqc29uWzBdKS5mb3JFYWNoKGZpZWxkQ29sTmFtZSA9PiB7XG4gICAgICBsZXQgZWxlbSA9IGpzb25bMV1bZmllbGRDb2xOYW1lXSA/IGAnJHtqc29uWzFdW2ZpZWxkQ29sTmFtZV19J2AgOiBgJydgO1xuICAgICAgZmllbGRzICs9IGVsZW0gKyAnLCc7XG4gICAgfSk7XG4gICAgZmllbGRzICs9ICddJztcblxuICAgIGxldCBkaWFsb2dGaWVsZHMgPSAnWyc7XG4gICAgbGV0IGRpYWxvZ0xhYmVsRmllbGRzID0gJ1snO1xuICAgIGlmIChqc29uLmxlbmd0aCA+IDMpIHtcbiAgICAgIGRpYWxvZ0xhYmVsRmllbGRzICs9IChPYmplY3QudmFsdWVzKGpzb25bMl0pIGFzIHN0cmluZ1tdKS5tYXAodiA9PiBgJyR7dn0nYCkuam9pbignLCcpO1xuICAgICAgZGlhbG9nRmllbGRzICs9IChPYmplY3QudmFsdWVzKGpzb25bM10pIGFzIHN0cmluZ1tdKS5tYXAodiA9PiBgJyR7dn0nYCkuam9pbignLCcpO1xuICAgIH1cbiAgICBkaWFsb2dGaWVsZHMgKz0gJ10nO1xuICAgIGRpYWxvZ0xhYmVsRmllbGRzICs9ICddJztcblxuICAgIGRhdGFzZXQgPSBqc29uWzFdWydkYXRhc2V0J10gYXMgc3RyaW5nO1xuICAgIHRpdGxlID0ganNvblsxXVsndGl0bGUnXSBhcyBzdHJpbmc7XG4gICAgcGFnZVNpemUgPSBqc29uWzFdWydwYWdlU2l6ZSddID8gK2pzb25bMV1bJ3BhZ2VTaXplJ10gOiAxMDtcbiAgICBjb25zdCBjZWxsU3R5bGVzID0ganNvblsxXVsnY2VsbFN0eWxlcyddO1xuICAgIGNvbnN0IHJvd1N0eWxlID0ganNvblsxXVsncm93U3R5bGUnXTtcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JBID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQSddIGFzIHN0cmluZztcbiAgICBjb25zdCBiYWNrZ3JvdW5kQ29sb3JCID0ganNvblsxXVsnYmFja2dyb3VuZENvbG9yQiddIGFzIHN0cmluZztcblxuICAgIGZvcm11bGEgPVxuICAgICAgYGJ1aWxkV2lkZ2V0RGF0YXNldFdpdGhEaWFsb2coJHtkYXRhc2V0fSwgJHtmaWVsZHN9LCAke2RpYWxvZ0ZpZWxkc30sICR7ZGlhbG9nTGFiZWxGaWVsZHN9LCAke2NlbGxTdHlsZXN9LGAgK1xuICAgICAgYCR7cm93U3R5bGV9LCAke2NvbHNQZXJjZW50YWdlQXJyYXl9LCAke0pTT04uc3RyaW5naWZ5KGJhY2tncm91bmRDb2xvckEpfSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgYmFja2dyb3VuZENvbG9yQixcbiAgICAgICl9KWA7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5QYWdpbmF0ZWRMaXN0LFxuICAgIHBhZ2VTaXplOiBwYWdlU2l6ZSxcbiAgICB0aXRsZTogdGl0bGUsXG4gICAgY29udGVudERlZmluaXRpb246IHtcbiAgICAgIGZvcm11bGE6IGZvcm11bGEsXG4gICAgfSxcbiAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgIHN0eWxlczoge1xuICAgICAgaGVpZ2h0OiAnNTAwcHgnLFxuICAgIH0sXG4gIH0pO1xufVxuXG5jb25zdCBfYnVpbGRIZWF0bWFwID0gKF86IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCA9PiB7XG4gIGNvbnN0IGRlZmF1bHRGZWF0dXJlcyA9IHtcbiAgICB0eXBlOiAnRmVhdHVyZUNvbGxlY3Rpb24nLFxuICAgIGZlYXR1cmVzOiBbXSxcbiAgfTtcbiAgY29uc3Qgb3B0aW9ucyA9IHtcbiAgICB2YWx1ZXM6ICdbXScsXG4gICAgaWRQcm9wOiAnaWQnLFxuICAgIGZlYXR1cmVzOiBKU09OLnN0cmluZ2lmeShkZWZhdWx0RmVhdHVyZXMpLFxuICAgIHN0YXJ0Q29sb3I6ICcjZmZlYjNiJyxcbiAgICBlbmRDb2xvcjogJyNmNDQzMzYnLFxuICAgIGhpZ2hsaWdodENvbG9yOiAnIzAwOTY4OCcsXG4gICAgc2hvd1Zpc3VhbE1hcDogZmFsc2UsXG4gICAgLi4uKGpzb24ubGVuZ3RoID4gMCA/IGpzb25bMF0gOiB7fSksXG4gIH07XG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuSGVhdE1hcCxcbiAgICAuLi5vcHRpb25zLFxuICAgIHZhbHVlczoge2Zvcm11bGE6IG9wdGlvbnMudmFsdWVzfSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIG1pbkhlaWdodDogJzIwMHB4JyxcbiAgICB9LFxuICB9KTtcbn07XG4iXX0=