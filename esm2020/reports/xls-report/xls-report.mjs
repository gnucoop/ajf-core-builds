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
                else if (sheetName.includes('single')) {
                    const singleWidget = _buildSingleIndicator(json);
                    reportWidgets.push(...singleWidget);
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
function getTrendWidget(value, color, condition, icon) {
    let percValue = `[[${value}]]%`;
    if (!value) {
        percValue = '';
    }
    return createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: `<i class=\"material-icons\" style=\"vertical-align: bottom\">${icon}</i>${percValue}`,
        styles: {
            ...htmlWidget,
            color: color,
            justifyContent: 'center',
        },
        visibility: {
            condition: condition,
        },
    });
}
function _buildSingleIndicator(json) {
    const indicatorWidgets = [];
    const firstRow = json.length > 0 && json[0]['html'] != null ? json[0] : { html: '' };
    indicatorWidgets.push(createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: String(firstRow['html']),
        styles: {
            ...htmlWidget,
            marginBottom: '0',
            justifyContent: 'center',
        },
    }));
    let showTrend = false;
    let marginBottom = '10px';
    if (firstRow['percentage_change']) {
        showTrend = true;
        marginBottom = '0';
    }
    indicatorWidgets.push(createWidget({
        widgetType: AjfWidgetType.Text,
        htmlText: '[[' + String(firstRow['current_value']) + ']]',
        styles: {
            ...htmlWidget,
            marginBottom,
            fontSize: '90px',
            fontWeight: 'bold',
            justifyContent: 'center',
        },
    }));
    if (showTrend) {
        indicatorWidgets.push(getTrendWidget(String(firstRow['percentage_change']), 'red', `${String(firstRow['percentage_change'])} < 0`, 'trending_down'));
        indicatorWidgets.push(getTrendWidget(String(firstRow['percentage_change']), 'green', `${String(firstRow['percentage_change'])} > 0`, 'trending_up'));
        indicatorWidgets.push(getTrendWidget(String(firstRow['percentage_change']), 'orange', `${String(firstRow['percentage_change'])} == 0`, 'trending_flat'));
        indicatorWidgets.push(getTrendWidget(null, 'orange', `${String(firstRow['percentage_change'])} === '-'`, 'remove'));
    }
    return indicatorWidgets;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGxzLXJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMveGxzLXJlcG9ydC94bHMtcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBYSxhQUFhLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUMzRCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFHekMsT0FBTyxFQUFDLFFBQVEsRUFBYyxFQUFFLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBQ25DLE9BQU8sS0FBSyxJQUFJLE1BQU0sTUFBTSxDQUFDO0FBRTdCLE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUUzRCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFDaEQsT0FBTyxFQUFDLFVBQVUsRUFBRSxXQUFXLEVBQUMsTUFBTSxVQUFVLENBQUM7QUFDakQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtDQUFrQyxDQUFDO0FBSS9ELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQVE1RDs7R0FFRztBQUNILE1BQU0sVUFBVSxTQUFTLENBQUMsSUFBWSxFQUFFLElBQWdCO0lBQ3RELE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEVBQUMsSUFBSSxFQUFFLFFBQVEsRUFBQyxDQUFDLENBQUM7SUFDbkQs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QUU7WUFDakIsT0FBTyxFQUFFLE9BQU87U0FDakI7UUFDRCxVQUFVLEVBQUUsSUFBSTtRQUNoQixNQUFNLEVBQUU7WUFDTixNQUFNLEVBQUUsT0FBTztTQUNoQjtLQUNGLENBQUMsQ0FBQztBQUNMLENBQUM7QUFFRCxNQUFNLGFBQWEsR0FBRyxDQUFDLENBQVMsRUFBRSxJQUErQixFQUFhLEVBQUU7SUFDOUUsTUFBTSxlQUFlLEdBQUc7UUFDdEIsSUFBSSxFQUFFLG1CQUFtQjtRQUN6QixRQUFRLEVBQUUsRUFBRTtLQUNiLENBQUM7SUFDRixNQUFNLE9BQU8sR0FBRztRQUNkLE1BQU0sRUFBRSxJQUFJO1FBQ1osTUFBTSxFQUFFLElBQUk7UUFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxlQUFlLENBQUM7UUFDekMsVUFBVSxFQUFFLFNBQVM7UUFDckIsUUFBUSxFQUFFLFNBQVM7UUFDbkIsY0FBYyxFQUFFLFNBQVM7UUFDekIsYUFBYSxFQUFFLEtBQUs7UUFDcEIsR0FBRyxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQztLQUNwQyxDQUFDO0lBQ0YsT0FBTyxZQUFZLENBQUM7UUFDbEIsVUFBVSxFQUFFLGFBQWEsQ0FBQyxPQUFPO1FBQ2pDLEdBQUcsT0FBTztRQUNWLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsTUFBTSxFQUFDO1FBQ2pDLE1BQU0sRUFBRTtZQUNOLFNBQVMsRUFBRSxPQUFPO1NBQ25CO0tBQ0YsQ0FBQyxDQUFDO0FBQ0wsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZvcm11bGEsIGNyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtDaGFydENvbG9yfSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQge2ZvcmtKb2luLCBPYnNlcnZhYmxlLCBvZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge21hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0ICogYXMgWExTWCBmcm9tICd4bHN4JztcblxuaW1wb3J0IHtiYWNrZ3JvdW5kQ29sb3J9IGZyb20gJy4uL2F1dG9tYXRpYy1yZXBvcnQvc3R5bGVzJztcblxuaW1wb3J0IHtpbmRpY2F0b3JUb0pzfSBmcm9tICcuL2hpbmRpa2l0LXBhcnNlcic7XG5pbXBvcnQge2h0bWxXaWRnZXQsIHdpZGdldFN0eWxlfSBmcm9tICcuL3N0eWxlcyc7XG5pbXBvcnQge2NyZWF0ZURhdGFzZXR9IGZyb20gJy4uL3V0aWxzL2RhdGFzZXQvY3JlYXRlLWRhdGFzZXQnO1xuaW1wb3J0IHtjcmVhdGVSZXBvcnRDb250YWluZXJ9IGZyb20gJy4uL3V0aWxzL3JlcG9ydHMvY3JlYXRlLXJlcG9ydC1jb250YWluZXInO1xuaW1wb3J0IHtBamZXaWRnZXRDcmVhdGUsIGNyZWF0ZVdpZGdldH0gZnJvbSAnLi4vdXRpbHMvd2lkZ2V0cy9jcmVhdGUtd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuaW1wb3J0IHtBamZUYWJsZURhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L3RhYmxlLWRhdGFzZXQnO1xuaW1wb3J0IHtBamZDaGFydERhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L2NoYXJ0LWRhdGFzZXQnO1xuaW1wb3J0IHtBamZDaGFydERhdGFzZXRPcHRpb25zfSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9jaGFydC1kYXRhc2V0LW9wdGlvbnMnO1xuaW1wb3J0IHtBamZDaGFydFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS9jaGFydHMvY2hhcnQtdHlwZSc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7QWpmUmVwb3J0fSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuaW1wb3J0IHtBamZSZXBvcnRWYXJpYWJsZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LXZhcmlhYmxlJztcbmltcG9ydCB7QWpmTGF5b3V0V2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9sYXlvdXQtd2lkZ2V0JztcbmltcG9ydCB7QWpmQ29sdW1uV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy9jb2x1bW4td2lkZ2V0JztcbmltcG9ydCB7QWpmR3JhcGhOb2RlRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvZ3JhcGgtZGF0YXNldCc7XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiBidWlsZHMgYSByZXBvcnQgZnJvbSBhbiBleGNlbCBmaWxlLlxuICovXG5leHBvcnQgZnVuY3Rpb24geGxzUmVwb3J0KGZpbGU6IHN0cmluZywgaHR0cDogSHR0cENsaWVudCk6IE9ic2VydmFibGU8QWpmUmVwb3J0PiB7XG4gIGNvbnN0IHdvcmtib29rID0gWExTWC5yZWFkKGZpbGUsIHt0eXBlOiAnYmluYXJ5J30pO1xuICBjb25zdCByZXBvcnQ6IEFqZlJlcG9ydCA9IHt9O1xuICBjb25zdCByZXBvcnRXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuXG4gIGNvbnN0IHZhcmlhYmxlczogQWpmUmVwb3J0VmFyaWFibGVbXSA9IFtdO1xuICBjb25zdCBmaWx0ZXJzOiB7W3NoZWV0TmFtZTogc3RyaW5nXTogT2JzZXJ2YWJsZTxhbnk+fSA9IHt9O1xuICAvLyBjcmVhdGUgZmlsdGVyc1xuICB3b3JrYm9vay5TaGVldE5hbWVzLmZvckVhY2goKHNoZWV0TmFtZSwgaW5kZXgpID0+IHtcbiAgICBjb25zdCBzaGVldDogWExTWC5Xb3JrU2hlZXQgPSB3b3JrYm9vay5TaGVldHNbc2hlZXROYW1lXTtcbiAgICBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdmaWx0ZXInKSAmJiBpbmRleCArIDEgPCB3b3JrYm9vay5TaGVldE5hbWVzLmxlbmd0aCkge1xuICAgICAgY29uc3QgbmV4dFNoZWV0ID0gc2hlZXROYW1lLmluY2x1ZGVzKCdnbG9iYWwnKVxuICAgICAgICA/ICdnbG9iYWxfZmlsdGVyJ1xuICAgICAgICA6IHdvcmtib29rLlNoZWV0TmFtZXNbaW5kZXggKyAxXTtcbiAgICAgIGZpbHRlcnNbbmV4dFNoZWV0XSA9IF9idWlsZEZpbHRlcih3b3JrYm9vaywgc2hlZXQsIGh0dHApO1xuICAgIH1cbiAgfSk7XG5cbiAgY29uc3Qgb2JzRmlsdGVyVmFsdWVzOiBPYnNlcnZhYmxlPGFueT5bXSA9IE9iamVjdC52YWx1ZXMoZmlsdGVycykubGVuZ3RoXG4gICAgPyBPYmplY3QudmFsdWVzKGZpbHRlcnMpXG4gICAgOiBbb2Yoe30pXTtcbiAgY29uc3QgZmlsdGVyTmFtZXM6IHN0cmluZ1tdID0gT2JqZWN0LmtleXMoZmlsdGVycyk7XG5cbiAgcmV0dXJuIGZvcmtKb2luKG9ic0ZpbHRlclZhbHVlcykucGlwZShcbiAgICBtYXAoZiA9PiB7XG4gICAgICB3b3JrYm9vay5TaGVldE5hbWVzLmZvckVhY2goc2hlZXROYW1lID0+IHtcbiAgICAgICAgY29uc3Qgc2hlZXQ6IFhMU1guV29ya1NoZWV0ID0gd29ya2Jvb2suU2hlZXRzW3NoZWV0TmFtZV07XG4gICAgICAgIGNvbnN0IGpzb24gPSBYTFNYLnV0aWxzLnNoZWV0X3RvX2pzb24oc2hlZXQpIGFzIHtcbiAgICAgICAgICBuYW1lOiBzdHJpbmc7XG4gICAgICAgICAgdmFsdWU6IHN0cmluZztcbiAgICAgICAgICBfX3Jvd051bV9fOiBzdHJpbmc7XG4gICAgICAgIH1bXTtcblxuICAgICAgICBpZiAoc2hlZXROYW1lID09PSAndmFyaWFibGVzJykge1xuICAgICAgICAgIGpzb25cbiAgICAgICAgICAgIC5maWx0ZXIoZSA9PiBlICE9IG51bGwgJiYgZS5uYW1lICE9IG51bGwgJiYgZS5uYW1lICE9PSAnJylcbiAgICAgICAgICAgIC5mb3JFYWNoKGVsZW0gPT4ge1xuICAgICAgICAgICAgICBsZXQganM6IHN0cmluZztcbiAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICBqcyA9IGluZGljYXRvclRvSnMoZWxlbS52YWx1ZSk7XG4gICAgICAgICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICAgICAgY29uc3QgciA9IE51bWJlcihlbGVtLl9fcm93TnVtX18pICsgMTtcbiAgICAgICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoYEVycm9yIGluIHZhcmlhYmxlIFwiJHtlbGVtLm5hbWV9XCIgKHJvdyAke3J9KTogJHtlcnIubWVzc2FnZX1gKTtcbiAgICAgICAgICAgICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB2YXJpYWJsZXMucHVzaCh7XG4gICAgICAgICAgICAgICAgbmFtZTogZWxlbS5uYW1lLFxuICAgICAgICAgICAgICAgIGZvcm11bGE6IHtmb3JtdWxhOiBqc30sXG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgY29uc3QgaWR4ID0gZmlsdGVyTmFtZXMuaW5kZXhPZihzaGVldE5hbWUpO1xuXG4gICAgICAgICAgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygndGFibGUnKSkge1xuICAgICAgICAgICAgY29uc3QgdGFibGVXaWRnZXQgPSBfYnVpbGRUYWJsZShzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKHRhYmxlV2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnY2hhcnQnKSkge1xuICAgICAgICAgICAgY29uc3QgY2hhcnRXaWRnZXQgPSBfYnVpbGRDaGFydChzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGNoYXJ0V2lkZ2V0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHNoZWV0TmFtZS5pbmNsdWRlcygnaHRtbCcpKSB7XG4gICAgICAgICAgICBjb25zdCBjaGFydFdpZGdldCA9IF9idWlsZEh0bWwoanNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goY2hhcnRXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdncmFwaCcpKSB7XG4gICAgICAgICAgICBjb25zdCBncmFwaFdpZGdldCA9IF9idWlsZEdyYXBoKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goZ3JhcGhXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdoZWF0bWFwJykpIHtcbiAgICAgICAgICAgIGNvbnN0IGhlYXRtYXBXaWRnZXQgPSBfYnVpbGRIZWF0bWFwKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goaGVhdG1hcFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ3BhZ2luYXRlZGxpc3QnKSkge1xuICAgICAgICAgICAgY29uc3QgcGFnTGlzdFdpZGdldCA9IF9idWlsZFBhZ2luYXRlZExpc3RUYWJsZShzaGVldE5hbWUsIGpzb24pO1xuICAgICAgICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKHBhZ0xpc3RXaWRnZXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAoc2hlZXROYW1lLmluY2x1ZGVzKCdwYWdpbmF0ZWREaWFsb2dMaXN0JykpIHtcbiAgICAgICAgICAgIGNvbnN0IHBhZ0xpc3RXaWRnZXQgPSBfYnVpbGRQYWdpbmF0ZWRMaXN0VGFibGVXaXRoRGlhbG9nKHNoZWV0TmFtZSwganNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2gocGFnTGlzdFdpZGdldCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChzaGVldE5hbWUuaW5jbHVkZXMoJ3NpbmdsZScpKSB7XG4gICAgICAgICAgICBjb25zdCBzaW5nbGVXaWRnZXQgPSBfYnVpbGRTaW5nbGVJbmRpY2F0b3IoanNvbik7XG4gICAgICAgICAgICByZXBvcnRXaWRnZXRzLnB1c2goLi4uc2luZ2xlV2lkZ2V0KTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpZiAoaWR4ID49IDApIHtcbiAgICAgICAgICAgIHJlcG9ydFdpZGdldHNbcmVwb3J0V2lkZ2V0cy5sZW5ndGggLSAxXS5maWx0ZXIgPSB7XG4gICAgICAgICAgICAgIHNjaGVtYTogZltpZHhdIGFzIGFueSxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGdsb2JhbEZpbHRlcklkeCA9IGZpbHRlck5hbWVzLmluZGV4T2YoJ2dsb2JhbF9maWx0ZXInKTtcbiAgICAgIGNvbnN0IGxheW91dFdpZGdldDogQWpmTGF5b3V0V2lkZ2V0ID0ge1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkxheW91dCxcbiAgICAgICAgY29udGVudDogW1xuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIGNvbnRlbnQ6IFsuLi5yZXBvcnRXaWRnZXRzXSxcbiAgICAgICAgICAgIGZpbHRlcjogZ2xvYmFsRmlsdGVySWR4ID49IDAgPyB7c2NoZW1hOiBmW2dsb2JhbEZpbHRlcklkeF19IDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0gYXMgQWpmQ29sdW1uV2lkZ2V0KSxcbiAgICAgICAgXSxcbiAgICAgICAgY29sdW1uczogWzFdLFxuICAgICAgICB2aXNpYmlsaXR5OiB7XG4gICAgICAgICAgY29uZGl0aW9uOiAndHJ1ZScsXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge30sXG4gICAgICB9O1xuXG4gICAgICByZXBvcnQudmFyaWFibGVzID0gdmFyaWFibGVzO1xuICAgICAgcmVwb3J0LmNvbnRlbnQgPSBjcmVhdGVSZXBvcnRDb250YWluZXIobGF5b3V0V2lkZ2V0KTtcblxuICAgICAgcmV0dXJuIHJlcG9ydDtcbiAgICB9KSxcbiAgKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkRmlsdGVyKFxuICB3Ym9vazogWExTWC5Xb3JrQm9vayxcbiAgc2hlZXQ6IFhMU1guV29ya1NoZWV0LFxuICBodHRwOiBIdHRwQ2xpZW50LFxuKTogT2JzZXJ2YWJsZTxhbnk+IHtcbiAgY29uc3QgZGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xuICBjb25zdCBmaWx0ZXJCb29rOiBYTFNYLldvcmtCb29rID0gZGVlcENvcHkod2Jvb2spO1xuICBjb25zdCBmaWx0ZXJTaGVldDogWExTWC5Xb3JrU2hlZXQgPSBkZWVwQ29weShzaGVldCk7XG4gIGNvbnN0IGNob2ljZXNTaGVldDogWExTWC5Xb3JrU2hlZXQgPSBkZWVwQ29weSh3Ym9vay5TaGVldHNbJ2Nob2ljZXMnXSk7XG4gIGZpbHRlckJvb2suU2hlZXROYW1lcyA9IFsnc3VydmV5JywgJ2Nob2ljZXMnXTtcbiAgZmlsdGVyQm9vay5TaGVldHMgPSB7c3VydmV5OiBmaWx0ZXJTaGVldCwgY2hvaWNlczogY2hvaWNlc1NoZWV0fTtcbiAgY29uc3QgZmlsdGVyWGxzeCA9IFhMU1gud3JpdGUoZmlsdGVyQm9vaywge1xuICAgIGJvb2tUeXBlOiAneGxzeCcsXG4gICAgdHlwZTogJ2FycmF5JyxcbiAgfSk7XG4gIGNvbnN0IGZpbGUgPSBuZXcgRmlsZShbZmlsdGVyWGxzeF0sICdmaWx0ZXIueGxzeCcpO1xuICBkYXRhLmFwcGVuZCgnZXhjZWxGaWxlJywgZmlsZSk7XG5cbiAgcmV0dXJuIGh0dHAucG9zdCgnaHR0cHM6Ly9mb3JtY29udi5oZXJva3VhcHAuY29tL3Jlc3VsdC5qc29uJywgZGF0YSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZENoYXJ0KG5hbWU6IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGNvbnN0IG9wdGlvbkxhYmVscyA9IFsnY2hhcnRUeXBlJywgJ3RpdGxlJ107XG4gIGNvbnN0IGNoYXJ0T3B0aW9uczoge1trZXk6IHN0cmluZ106IHN0cmluZ30gPSB7fTtcbiAgY29uc3QgZGF0YXNldE9iajoge1trZXk6IHN0cmluZ106IGFueX0gPSB7fTtcbiAgY29uc3QgZGF0YXNldDogQWpmQ2hhcnREYXRhc2V0W10gPSBbXTtcbiAgbGV0IGxhYmVsczogQWpmRm9ybXVsYSA9IHtmb3JtdWxhOiAnW10nfTtcblxuICBpZiAoanNvbi5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgZmlyc3RSb3cgPSBqc29uWzBdO1xuICAgIG9wdGlvbkxhYmVscy5mb3JFYWNoKG9wdGlvbkxhYmVsID0+IHtcbiAgICAgIGlmIChmaXJzdFJvd1tvcHRpb25MYWJlbF0gIT0gbnVsbCkge1xuICAgICAgICBjaGFydE9wdGlvbnNbb3B0aW9uTGFiZWxdID0gZmlyc3RSb3dbb3B0aW9uTGFiZWxdO1xuICAgICAgICBkZWxldGUgZmlyc3RSb3dbb3B0aW9uTGFiZWxdO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGpzb24uZm9yRWFjaChyb3cgPT4ge1xuICAgIGNvbnN0IHJvd0tleXMgPSBPYmplY3Qua2V5cyhyb3cpO1xuICAgIHJvd0tleXMuZm9yRWFjaChyb3dLZXkgPT4ge1xuICAgICAgY29uc3QgdmFsdWUgPSByb3dbcm93S2V5XTtcbiAgICAgIGlmIChkYXRhc2V0T2JqW3Jvd0tleV0gPT0gbnVsbCkge1xuICAgICAgICBkYXRhc2V0T2JqW3Jvd0tleV0gPSBbdmFsdWVdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGF0YXNldE9ialtyb3dLZXldLnB1c2godmFsdWUpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbiAgY29uc3QgZG9MYWJlbHMgPSBkYXRhc2V0T2JqWydsYWJlbHMnXTtcbiAgaWYgKGRvTGFiZWxzICE9IG51bGwpIHtcbiAgICBsZXQgbGFiZWxzSnM6IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgbGFiZWxzSnMgPSBpbmRpY2F0b3JUb0pzKCdbJyArIGRvTGFiZWxzLmpvaW4oKSArICddJyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcihgRXJyb3IgaW4gXCJsYWJlbHNcIiBvZiBjaGFydCBcIiR7Y2hhcnRPcHRpb25zWyd0aXRsZSddfVwiOiAke2Vyci5tZXNzYWdlfWApO1xuICAgICAgd2luZG93LmFsZXJ0KGVyci5tZXNzYWdlKTtcbiAgICAgIHRocm93IGVycjtcbiAgICB9XG4gICAgbGFiZWxzID0ge2Zvcm11bGE6IGBwbGFpbkFycmF5KCR7bGFiZWxzSnN9KWB9O1xuICAgIGRlbGV0ZSBkYXRhc2V0T2JqWydsYWJlbHMnXTtcbiAgfVxuICBPYmplY3Qua2V5cyhkYXRhc2V0T2JqKS5mb3JFYWNoKChkYXRhc2V0T2JqS2V5LCBpbmRleCkgPT4ge1xuICAgIGxldCBkYXRhc2V0SnM6IHN0cmluZztcbiAgICB0cnkge1xuICAgICAgZGF0YXNldEpzID0gaW5kaWNhdG9yVG9KcygnWycgKyBkYXRhc2V0T2JqW2RhdGFzZXRPYmpLZXldLmpvaW4oKSArICddJyk7XG4gICAgfSBjYXRjaCAoZXJyOiBhbnkpIHtcbiAgICAgIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgYEVycm9yIGluIFwiJHtkYXRhc2V0T2JqS2V5fVwiIG9mIGNoYXJ0IFwiJHtjaGFydE9wdGlvbnNbJ3RpdGxlJ119XCI6ICR7ZXJyLm1lc3NhZ2V9YCxcbiAgICAgICk7XG4gICAgICB3aW5kb3cuYWxlcnQoZXJyLm1lc3NhZ2UpO1xuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYXJ0VHlwZSA9IGNoYXJ0T3B0aW9uc1snY2hhcnRUeXBlJ107XG4gICAgY29uc3QgY29sb3JDb25kaXRpb24gPVxuICAgICAgY2hhcnRUeXBlID09PSAnUGllJyB8fCBjaGFydFR5cGUgPT09ICdQb2xhckFyZWEnIHx8IGNoYXJ0VHlwZSA9PT0gJ0RvdWdobnV0JztcbiAgICBjb25zdCBiYWNrQ29sb3IgPSBjb2xvckNvbmRpdGlvbiA/IGJhY2tncm91bmRDb2xvciA6IGJhY2tncm91bmRDb2xvcltpbmRleF07XG4gICAgY29uc3QgZm9ybXVsYTogQWpmRm9ybXVsYVtdID0gW1xuICAgICAgY3JlYXRlRm9ybXVsYSh7XG4gICAgICAgIGZvcm11bGE6IGBwbGFpbkFycmF5KCR7ZGF0YXNldEpzfSlgLFxuICAgICAgfSksXG4gICAgXTtcbiAgICBjb25zdCBkYXRhc2V0T3B0aW9uczogQWpmQ2hhcnREYXRhc2V0T3B0aW9ucyA9IHtcbiAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja0NvbG9yIGFzIENoYXJ0Q29sb3IsXG4gICAgfTtcbiAgICBkYXRhc2V0LnB1c2goe1xuICAgICAgLi4uY3JlYXRlRGF0YXNldCh7XG4gICAgICAgIGFnZ3JlZ2F0aW9uOiB7YWdncmVnYXRpb246IDB9LFxuICAgICAgICBmb3JtdWxhLFxuICAgICAgICBsYWJlbDogZGF0YXNldE9iaktleSxcbiAgICAgIH0pLFxuICAgICAgb3B0aW9uczogZGF0YXNldE9wdGlvbnMsXG4gICAgfSBhcyBBamZDaGFydERhdGFzZXQpO1xuICB9KTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICBuYW1lLFxuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgdHlwZTogQWpmQ2hhcnRUeXBlW2NoYXJ0T3B0aW9uc1snY2hhcnRUeXBlJ10gYXMgYW55XSBhcyB1bmtub3duIGFzIEFqZkNoYXJ0VHlwZSxcbiAgICBsYWJlbHMsXG4gICAgZGF0YXNldCxcbiAgICBvcHRpb25zOiB7XG4gICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9LFxuICAgICAgdGl0bGU6IHtcbiAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgdGV4dDogY2hhcnRPcHRpb25zWyd0aXRsZSddIHx8ICcnLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHN0eWxlczoge1xuICAgICAgLi4ue3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnLCBwYWRkaW5nOiAnMjBweCd9LFxuICAgICAgLi4ud2lkZ2V0U3R5bGUsXG4gICAgfSxcbiAgICBleHBvcnRhYmxlOiB0cnVlLFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5cbmZ1bmN0aW9uIF9idWlsZEdyYXBoKG5hbWU6IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGNvbnN0IG5vZGVzOiBBamZHcmFwaE5vZGVEYXRhc2V0W10gPSBbXTtcblxuICBqc29uLmZvckVhY2gocm93ID0+IHtcbiAgICBjb25zdCByb3dLZXlzID0gT2JqZWN0LmtleXMocm93KTtcbiAgICBpZiAocm93S2V5cy5pbmNsdWRlcygnaWQnKSAmJiByb3dbJ2lkJ10pIHtcbiAgICAgIGNvbnN0IHJvd0lkID0gcm93WydpZCddLnRyaW0oKS5yZXBsYWNlKC9cIi9nLCAnJyk7XG4gICAgICBpZiAocm93SWQgJiYgcm93SWQubGVuZ3RoKSB7XG4gICAgICAgIGxldCBncmFwaE5vZGVPYmo6IHtba2V5OiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgICAgIHJvd0tleXMuZm9yRWFjaChyb3dLZXkgPT4ge1xuICAgICAgICAgIGxldCBqczogc3RyaW5nO1xuICAgICAgICAgIHRyeSB7XG4gICAgICAgICAgICBqcyA9IGluZGljYXRvclRvSnMocm93W3Jvd0tleV0pO1xuICAgICAgICAgIH0gY2F0Y2ggKGVycjogYW55KSB7XG4gICAgICAgICAgICBjb25zdCByb3dOdW0gPSBOdW1iZXIocm93WydfX3Jvd051bV9fJ10pICsgMTtcbiAgICAgICAgICAgIGVyciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgYEVycm9yIGluIFwiJHtuYW1lfVwiLCByb3cgJHtyb3dOdW19LCBjb2x1bW4gXCIke3Jvd0tleX1cIjogJHtlcnIubWVzc2FnZX1gLFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHdpbmRvdy5hbGVydChlcnIubWVzc2FnZSk7XG4gICAgICAgICAgICB0aHJvdyBlcnI7XG4gICAgICAgICAgfVxuICAgICAgICAgIGdyYXBoTm9kZU9ialtyb3dLZXldID0ganM7XG4gICAgICAgIH0pO1xuICAgICAgICBncmFwaE5vZGVPYmpbJ2lkJ10gPSByb3dJZDtcbiAgICAgICAgbm9kZXMucHVzaChncmFwaE5vZGVPYmogYXMgQWpmR3JhcGhOb2RlRGF0YXNldCk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkdyYXBoLFxuICAgIG5vZGVzLFxuICAgIHN0eWxlczoge30sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cblxuZnVuY3Rpb24gX2J1aWxkSHRtbChqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgY29uc3QgZmlyc3RSb3cgPSBqc29uLmxlbmd0aCA+IDAgJiYganNvblswXVsnaHRtbCddICE9IG51bGwgPyBqc29uWzBdIDoge2h0bWw6ICcnfTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgaHRtbFRleHQ6IFN0cmluZyhmaXJzdFJvd1snaHRtbCddKSxcbiAgICBzdHlsZXM6IGh0bWxXaWRnZXQsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRUcmVuZFdpZGdldChcbiAgdmFsdWU6IHN0cmluZyB8IG51bGwsXG4gIGNvbG9yOiBzdHJpbmcsXG4gIGNvbmRpdGlvbjogc3RyaW5nLFxuICBpY29uOiBzdHJpbmcsXG4pOiBBamZXaWRnZXQge1xuICBsZXQgcGVyY1ZhbHVlID0gYFtbJHt2YWx1ZX1dXSVgO1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcGVyY1ZhbHVlID0gJyc7XG4gIH1cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgIGh0bWxUZXh0OiBgPGkgY2xhc3M9XFxcIm1hdGVyaWFsLWljb25zXFxcIiBzdHlsZT1cXFwidmVydGljYWwtYWxpZ246IGJvdHRvbVxcXCI+JHtpY29ufTwvaT4ke3BlcmNWYWx1ZX1gLFxuICAgIHN0eWxlczoge1xuICAgICAgLi4uaHRtbFdpZGdldCxcbiAgICAgIGNvbG9yOiBjb2xvcixcbiAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICB9LFxuICAgIHZpc2liaWxpdHk6IHtcbiAgICAgIGNvbmRpdGlvbjogY29uZGl0aW9uLFxuICAgIH0sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBfYnVpbGRTaW5nbGVJbmRpY2F0b3IoanNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldFtdIHtcbiAgY29uc3QgaW5kaWNhdG9yV2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcbiAgY29uc3QgZmlyc3RSb3cgPSBqc29uLmxlbmd0aCA+IDAgJiYganNvblswXVsnaHRtbCddICE9IG51bGwgPyBqc29uWzBdIDoge2h0bWw6ICcnfTtcblxuICBpbmRpY2F0b3JXaWRnZXRzLnB1c2goXG4gICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgIGh0bWxUZXh0OiBTdHJpbmcoZmlyc3RSb3dbJ2h0bWwnXSksXG4gICAgICBzdHlsZXM6IHtcbiAgICAgICAgLi4uaHRtbFdpZGdldCxcbiAgICAgICAgbWFyZ2luQm90dG9tOiAnMCcsXG4gICAgICAgIGp1c3RpZnlDb250ZW50OiAnY2VudGVyJyxcbiAgICAgIH0sXG4gICAgfSksXG4gICk7XG5cbiAgbGV0IHNob3dUcmVuZCA9IGZhbHNlO1xuICBsZXQgbWFyZ2luQm90dG9tID0gJzEwcHgnO1xuICBpZiAoZmlyc3RSb3dbJ3BlcmNlbnRhZ2VfY2hhbmdlJ10pIHtcbiAgICBzaG93VHJlbmQgPSB0cnVlO1xuICAgIG1hcmdpbkJvdHRvbSA9ICcwJztcbiAgfVxuICBpbmRpY2F0b3JXaWRnZXRzLnB1c2goXG4gICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgIGh0bWxUZXh0OiAnW1snICsgU3RyaW5nKGZpcnN0Um93WydjdXJyZW50X3ZhbHVlJ10pICsgJ11dJyxcbiAgICAgIHN0eWxlczoge1xuICAgICAgICAuLi5odG1sV2lkZ2V0LFxuICAgICAgICBtYXJnaW5Cb3R0b20sXG4gICAgICAgIGZvbnRTaXplOiAnOTBweCcsXG4gICAgICAgIGZvbnRXZWlnaHQ6ICdib2xkJyxcbiAgICAgICAganVzdGlmeUNvbnRlbnQ6ICdjZW50ZXInLFxuICAgICAgfSxcbiAgICB9KSxcbiAgKTtcblxuICBpZiAoc2hvd1RyZW5kKSB7XG4gICAgaW5kaWNhdG9yV2lkZ2V0cy5wdXNoKFxuICAgICAgZ2V0VHJlbmRXaWRnZXQoXG4gICAgICAgIFN0cmluZyhmaXJzdFJvd1sncGVyY2VudGFnZV9jaGFuZ2UnXSksXG4gICAgICAgICdyZWQnLFxuICAgICAgICBgJHtTdHJpbmcoZmlyc3RSb3dbJ3BlcmNlbnRhZ2VfY2hhbmdlJ10pfSA8IDBgLFxuICAgICAgICAndHJlbmRpbmdfZG93bicsXG4gICAgICApLFxuICAgICk7XG5cbiAgICBpbmRpY2F0b3JXaWRnZXRzLnB1c2goXG4gICAgICBnZXRUcmVuZFdpZGdldChcbiAgICAgICAgU3RyaW5nKGZpcnN0Um93WydwZXJjZW50YWdlX2NoYW5nZSddKSxcbiAgICAgICAgJ2dyZWVuJyxcbiAgICAgICAgYCR7U3RyaW5nKGZpcnN0Um93WydwZXJjZW50YWdlX2NoYW5nZSddKX0gPiAwYCxcbiAgICAgICAgJ3RyZW5kaW5nX3VwJyxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluZGljYXRvcldpZGdldHMucHVzaChcbiAgICAgIGdldFRyZW5kV2lkZ2V0KFxuICAgICAgICBTdHJpbmcoZmlyc3RSb3dbJ3BlcmNlbnRhZ2VfY2hhbmdlJ10pLFxuICAgICAgICAnb3JhbmdlJyxcbiAgICAgICAgYCR7U3RyaW5nKGZpcnN0Um93WydwZXJjZW50YWdlX2NoYW5nZSddKX0gPT0gMGAsXG4gICAgICAgICd0cmVuZGluZ19mbGF0JyxcbiAgICAgICksXG4gICAgKTtcblxuICAgIGluZGljYXRvcldpZGdldHMucHVzaChcbiAgICAgIGdldFRyZW5kV2lkZ2V0KG51bGwsICdvcmFuZ2UnLCBgJHtTdHJpbmcoZmlyc3RSb3dbJ3BlcmNlbnRhZ2VfY2hhbmdlJ10pfSA9PT0gJy0nYCwgJ3JlbW92ZScpLFxuICAgICk7XG4gIH1cbiAgcmV0dXJuIGluZGljYXRvcldpZGdldHM7XG59XG5cbmZ1bmN0aW9uIF9idWlsZFRhYmxlKFxuICBzaGVldE5hbWU6IHN0cmluZyxcbiAganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZyB8IG51bWJlciB8IGJvb2xlYW59W10sXG4pOiBBamZXaWRnZXQge1xuICBsZXQgdGFibGVIZWFkZXI6IEFqZlRhYmxlRGF0YXNldFtdID0gW107XG4gIGxldCBkYXRhUm93cyA9ICdbXSc7XG4gIGxldCBmb3JtdWxhID0gJyc7XG4gIGxldCBwYWdlU2l6ZSA9IDEwO1xuICBsZXQgcGFnaW5hdGlvbiA9IGZhbHNlO1xuICBpZiAoanNvbi5sZW5ndGggPiAxKSB7XG4gICAgY29uc3Qgcm93c3BhbiA9IDE7XG4gICAgY29uc3QgdGl0bGVzID0gT2JqZWN0LmtleXMoanNvblswXSk7XG4gICAgY29uc3QgY29sc3BhblJvd1ZhbHVlcyA9IE9iamVjdC52YWx1ZXMoanNvblswXSkubWFwKHYgPT4gKHYgPyB2LnRvU3RyaW5nKCkgOiAnJykpO1xuICAgIGNvbnN0IGNvbHNwYW5zOiBudW1iZXJbXSA9IGNvbHNwYW5Sb3dWYWx1ZXMubWFwKHIgPT4gK3IuY2hhckF0KDApKTtcbiAgICBjb25zdCB0ZXh0QWxpZ246IHN0cmluZ1tdID0gY29sc3BhblJvd1ZhbHVlcy5tYXAociA9PiB7XG4gICAgICBzd2l0Y2ggKHIuY2hhckF0KDEpKSB7XG4gICAgICAgIGNhc2UgJ2wnOlxuICAgICAgICAgIHJldHVybiAnbGVmdCc7XG4gICAgICAgIGNhc2UgJ3InOlxuICAgICAgICAgIHJldHVybiAncmlnaHQnO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHJldHVybiAnY2VudGVyJztcbiAgICAgIH1cbiAgICB9KTtcbiAgICBjb25zdCBzb3J0Q29sczogYm9vbGVhbltdID0gY29sc3BhblJvd1ZhbHVlcy5tYXAociA9PlxuICAgICAgci5jaGFyQXQoMikgJiYgci5jaGFyQXQoMikgPT09ICdzJyA/IHRydWUgOiBmYWxzZSxcbiAgICApO1xuICAgIHRhYmxlSGVhZGVyID0gdGl0bGVzLm1hcCgodGl0bGUsIGluZGV4KSA9PiAoe1xuICAgICAgbGFiZWw6ICcnLFxuICAgICAgZm9ybXVsYToge2Zvcm11bGE6IGBcIiR7dGl0bGV9XCJgfSxcbiAgICAgIGFnZ3JlZ2F0aW9uOiB7YWdncmVnYXRpb246IDB9LFxuICAgICAgY29sc3BhbjogY29sc3BhbnNbaW5kZXhdLFxuICAgICAgcm93c3BhbixcbiAgICAgIHNvcnRlZDogc29ydENvbHNbaW5kZXhdLFxuICAgICAgc3R5bGU6IHtcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgZm9udFdlaWdodDogJ2JvbGQnLFxuICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiAnIzNmNTFiNScsXG4gICAgICAgIGJvcmRlckJvdHRvbTogJzJweCBzb2xpZCAjZGRkJyxcbiAgICAgIH0sXG4gICAgfSkpO1xuICAgIHBhZ2luYXRpb24gPSBqc29uWzFdWydwYWdpbmF0aW9uJ10gPyAoanNvblsxXVsncGFnaW5hdGlvbiddIGFzIGJvb2xlYW4pIDogZmFsc2U7XG5cbiAgICBpZiAoJ2RhdGFzZXQnIGluIGpzb25bMV0pIHtcbiAgICAgIGNvbnN0IGRpYWxvZ0ZpZWxkcyA9IGpzb25bMV1bJ2RpYWxvZ19maWVsZHMnXVxuICAgICAgICA/IChqc29uWzFdWydkaWFsb2dfZmllbGRzJ10gYXMgc3RyaW5nKS5zcGxpdCgnLCcpLm1hcCh2ID0+IHYudHJpbSgpKVxuICAgICAgICA6IFtdO1xuICAgICAgY29uc3QgZGlhbG9nTGFiZWxGaWVsZHMgPSBqc29uWzFdWydkaWFsb2dfZmllbGRzX2xhYmVscyddXG4gICAgICAgID8gKGpzb25bMV1bJ2RpYWxvZ19maWVsZHNfbGFiZWxzJ10gYXMgc3RyaW5nKS5zcGxpdCgnLCcpLm1hcCh2ID0+IHYudHJpbSgpKVxuICAgICAgICA6IFtdO1xuICAgICAgZm9ybXVsYSA9IF9idWlsZEZvcm1MaXN0VGFibGUoanNvbiwgY29sc3BhbnMsIHRleHRBbGlnbiwgZGlhbG9nRmllbGRzLCBkaWFsb2dMYWJlbEZpZWxkcyk7XG4gICAgICBpZiAoZGlhbG9nRmllbGRzICYmIGRpYWxvZ0ZpZWxkcy5sZW5ndGgpIHtcbiAgICAgICAgdGFibGVIZWFkZXIucHVzaCh7XG4gICAgICAgICAgbGFiZWw6ICcnLFxuICAgICAgICAgIGZvcm11bGE6IHtmb3JtdWxhOiBgXCIgXCJgfSxcbiAgICAgICAgICBhZ2dyZWdhdGlvbjoge2FnZ3JlZ2F0aW9uOiAwfSxcbiAgICAgICAgICBjb2xzcGFuOiAxLFxuICAgICAgICAgIHJvd3NwYW4sXG4gICAgICAgICAgc3R5bGU6IHtcbiAgICAgICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICAgICAgICBjb2xvcjogJ3doaXRlJyxcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogJyMzZjUxYjUnLFxuICAgICAgICAgICAgYm9yZGVyQm90dG9tOiAnMnB4IHNvbGlkICNkZGQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBkZWxldGUganNvblswXTtcbiAgICAgIGRhdGFSb3dzID0gJ1snO1xuICAgICAganNvbi5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgIGxldCBkYXRhUm93ID0gJ1snO1xuICAgICAgICB0aXRsZXMuZm9yRWFjaCh0aXRsZSA9PiB7XG4gICAgICAgICAgbGV0IGVsZW0gPSByb3dbdGl0bGVdIHx8IGAnJ2A7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIGVsZW0gPSBpbmRpY2F0b3JUb0pzKGVsZW0gYXMgc3RyaW5nKTtcbiAgICAgICAgICB9IGNhdGNoIChlcnI6IGFueSkge1xuICAgICAgICAgICAgY29uc3Qgcm93TnVtID0gTnVtYmVyKHJvd1snX19yb3dOdW1fXyddKSArIDE7XG4gICAgICAgICAgICBlcnIgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgIGBFcnJvciBpbiBcIiR7c2hlZXROYW1lfVwiLCByb3cgJHtyb3dOdW19LCBjb2x1bW4gXCIke3RpdGxlfVwiOiAke2Vyci5tZXNzYWdlfWAsXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgd2luZG93LmFsZXJ0KGVyci5tZXNzYWdlKTtcbiAgICAgICAgICAgIHRocm93IGVycjtcbiAgICAgICAgICB9XG4gICAgICAgICAgZGF0YVJvdyArPSBlbGVtICsgJywnO1xuICAgICAgICB9KTtcbiAgICAgICAgZGF0YVJvdyArPSAnXSc7XG4gICAgICAgIGRhdGFSb3dzICs9IGRhdGFSb3cgKyAnLCc7XG4gICAgICB9KTtcbiAgICAgIGRhdGFSb3dzICs9ICddJztcbiAgICAgIGZvcm11bGEgPSBgYnVpbGRBbGlnbmVkRGF0YXNldChwbGFpbkFycmF5KCR7ZGF0YVJvd3N9KSwke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICBjb2xzcGFucyxcbiAgICAgICl9LCR7SlNPTi5zdHJpbmdpZnkodGV4dEFsaWduKX0pYDtcbiAgICB9XG4gIH1cblxuICBpZiAocGFnaW5hdGlvbikge1xuICAgIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5QYWdpbmF0ZWRUYWJsZSxcbiAgICAgIHBhZ2VTaXplOiBwYWdlU2l6ZSxcbiAgICAgIHJvd0RlZmluaXRpb246IHtcbiAgICAgICAgZm9ybXVsYTogZm9ybXVsYSxcbiAgICAgIH0sXG4gICAgICBkYXRhc2V0OiB0YWJsZUhlYWRlcixcbiAgICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgICBjZWxsU3R5bGVzOiB7XG4gICAgICAgIHRleHRBbGlnbjogJ2NlbnRlcicsXG4gICAgICAgIGNvbG9yOiAnYmxhY2snLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6ICd3aGl0ZScsXG4gICAgICB9LFxuICAgICAgc3R5bGVzOiB7XG4gICAgICAgIGJvcmRlckNvbGxhcHNlOiAnY29sbGFwc2UnLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuRHluYW1pY1RhYmxlLFxuICAgICAgcm93RGVmaW5pdGlvbjoge1xuICAgICAgICBmb3JtdWxhOiBmb3JtdWxhLFxuICAgICAgfSxcbiAgICAgIGRhdGFzZXQ6IHRhYmxlSGVhZGVyLFxuICAgICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICAgIGNlbGxTdHlsZXM6IHtcbiAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgY29sb3I6ICdibGFjaycsXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogJ3doaXRlJyxcbiAgICAgIH0sXG4gICAgICBzdHlsZXM6IHtcbiAgICAgICAgYm9yZGVyQ29sbGFwc2U6ICdjb2xsYXBzZScsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG59XG5cbi8qKlxuICogQ3JlYXRlIGEgZm9ybXVsYSBmb3IgYSBkeW5hbWljIHRhYmxlIHdpZGdldCwgYmFzZWQgb24gYSBsaXN0IG9mIEZvcm1zXG4gKiBAcGFyYW0ganNvblxuICogQHJldHVybnMgdGhlIGZvcm11bGEgZm9yIHRoZSBEeW5hbWljVGFibGUgQWpmV2lkZ2V0LCBsaWtlIHRoaXM6XG4gKiBidWlsZEZvcm1EYXRhc2V0KHByb2plY3RzRGF0YXNldCwgWydpZF9wJywnZG9ub3JzJywnYnVkZ2V0JywnZGlub19hcmVhX25hbWUnLCdjYWxjX3Byb2dyZXNzJyxdKVwiXG4gKi9cbmZ1bmN0aW9uIF9idWlsZEZvcm1MaXN0VGFibGUoXG4gIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmcgfCBudW1iZXIgfCBib29sZWFufVtdLFxuICBjb2xzcGFuczogbnVtYmVyW10sXG4gIHRleHRBbGlnbjogc3RyaW5nW10sXG4gIGRpYWxvZ0ZpZWxkczogc3RyaW5nW10sXG4gIGRpYWxvZ0xhYmVsRmllbGRzOiBzdHJpbmdbXSxcbik6IHN0cmluZyB7XG4gIGxldCBmb3JtdWxhID0gJyc7XG4gIGlmIChqc29uLmxlbmd0aCA+IDEpIHtcbiAgICBsZXQgZmllbGRzID0gJ1snO1xuICAgIE9iamVjdC5rZXlzKGpzb25bMF0pLmZvckVhY2goZmllbGRDb2xOYW1lID0+IHtcbiAgICAgIGxldCBlbGVtID0ganNvblsxXVtmaWVsZENvbE5hbWVdID8gYCcke2pzb25bMV1bZmllbGRDb2xOYW1lXX0nYCA6IGAnJ2A7XG4gICAgICBmaWVsZHMgKz0gZWxlbSArICcsJztcbiAgICB9KTtcbiAgICBmaWVsZHMgKz0gJ10nO1xuICAgIGNvbnN0IGRhdGFzZXQgPSBqc29uWzFdWydkYXRhc2V0J10gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGxpbmtGaWVsZCA9IGpzb25bMV1bJ2xpbmtfZmllbGQnXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgbGlua1BvcyA9IGpzb25bMV1bJ2xpbmtfcG9zaXRpb24nXSA/ICtqc29uWzFdWydsaW5rX3Bvc2l0aW9uJ10gOiAwO1xuICAgIGNvbnN0IHJvd0xpbmsgPVxuICAgICAgbGlua0ZpZWxkICYmIGxpbmtGaWVsZC5sZW5ndGggPyBgeydsaW5rJzogJyR7bGlua0ZpZWxkfScsICdwb3NpdGlvbic6ICR7bGlua1Bvc319YCA6IG51bGw7XG5cbiAgICBmb3JtdWxhID0gYGJ1aWxkQWxpZ25lZEZvcm1EYXRhc2V0KCR7ZGF0YXNldH0sICR7ZmllbGRzfSwgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgIGNvbHNwYW5zLFxuICAgICl9LCAke0pTT04uc3RyaW5naWZ5KHRleHRBbGlnbil9LCAke3Jvd0xpbmt9LCAke0pTT04uc3RyaW5naWZ5KGRpYWxvZ0ZpZWxkcyl9LCAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgZGlhbG9nTGFiZWxGaWVsZHMsXG4gICAgKX0pYDtcbiAgfVxuICByZXR1cm4gZm9ybXVsYTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSB3aWRnZXQgd2l0aCBhIGR5bmFtaWMgcGFnaW5hdGVkIHRhYmxlIGJhc2VkIG9uIGEgbGlzdCBvZiBGb3Jtcy4gRWFjaCByb3cgaXMgYW4gQWpmVGFibGUuXG4gKiBAcGFyYW0gc2hlZXROYW1lXG4gKiBAcGFyYW0ganNvblxuICogQHJldHVybnMgYSBQYWdpbmF0ZWQgQWpmV2lkZ2V0IHdpdGggYSBmb3JtdWxhIGxpa2UgdGhpczpcbiAqIGJ1aWxkV2lkZ2V0RGF0YXNldChwcm9qZWN0c0RhdGFzZXQsIFsnaWRfcCcsJ2Rvbm9ycycsJ2J1ZGdldCcsJ2Rpbm9fYXJlYV9uYW1lJywnY2FsY19wcm9ncmVzcycsJ2hvbWVfbGlua190ZXh0JyxdLFxuICogICB7J2xpbmsnOiAnaG9tZV9saW5rJywgJ3Bvc2l0aW9uJzogNX0sIHsnYm9yZGVyJzogJ25vbmUnfSx7J3dpZHRoJzogJzkwMHB4J30sIFsnMTAlJywnMzAlJywnMTAlJywnMjUlJywnMTUlJywnMTAlJ10sIFxcXCIjZjBmMGYwXFxcIiwgXFxcIndoaXRlXFxcIilcIlxuICovXG5mdW5jdGlvbiBfYnVpbGRQYWdpbmF0ZWRMaXN0VGFibGUoXzogc3RyaW5nLCBqc29uOiB7W2tleTogc3RyaW5nXTogc3RyaW5nfVtdKTogQWpmV2lkZ2V0IHtcbiAgbGV0IGZvcm11bGEgPSAnJztcbiAgbGV0IHBhZ2VTaXplID0gMTA7XG4gIGxldCBkYXRhc2V0OiBzdHJpbmcgPSAnJztcbiAgbGV0IHRpdGxlID0gJyc7XG4gIGlmIChqc29uLmxlbmd0aCA+IDEpIHtcbiAgICBjb25zdCBjb2xzUGVyY2VudGFnZTogc3RyaW5nID0gKE9iamVjdC52YWx1ZXMoanNvblswXSkgYXMgc3RyaW5nW10pXG4gICAgICAubWFwKHIgPT4gYCcke3J9JSdgKVxuICAgICAgLmpvaW4oJywnKTtcbiAgICBjb25zdCBjb2xzUGVyY2VudGFnZUFycmF5ID0gYFske2NvbHNQZXJjZW50YWdlfV1gO1xuXG4gICAgbGV0IGZpZWxkcyA9ICdbJztcbiAgICBPYmplY3Qua2V5cyhqc29uWzBdKS5mb3JFYWNoKGZpZWxkQ29sTmFtZSA9PiB7XG4gICAgICBsZXQgZWxlbSA9IGpzb25bMV1bZmllbGRDb2xOYW1lXSA/IGAnJHtqc29uWzFdW2ZpZWxkQ29sTmFtZV19J2AgOiBgJydgO1xuICAgICAgZmllbGRzICs9IGVsZW0gKyAnLCc7XG4gICAgfSk7XG4gICAgZmllbGRzICs9ICddJztcblxuICAgIGRhdGFzZXQgPSBqc29uWzFdWydkYXRhc2V0J10gYXMgc3RyaW5nO1xuICAgIHRpdGxlID0ganNvblsxXVsndGl0bGUnXSBhcyBzdHJpbmc7XG4gICAgcGFnZVNpemUgPSBqc29uWzFdWydwYWdlU2l6ZSddID8gK2pzb25bMV1bJ3BhZ2VTaXplJ10gOiAxMDtcbiAgICBjb25zdCBsaW5rRmllbGQgPSBqc29uWzFdWydsaW5rX2ZpZWxkJ10gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGxpbmtQb3MgPSBqc29uWzFdWydsaW5rX3Bvc2l0aW9uJ10gPyAranNvblsxXVsnbGlua19wb3NpdGlvbiddIDogMDtcbiAgICBjb25zdCByb3dMaW5rID1cbiAgICAgIGxpbmtGaWVsZCAmJiBsaW5rRmllbGQubGVuZ3RoID8gYHsnbGluayc6ICcke2xpbmtGaWVsZH0nLCAncG9zaXRpb24nOiAke2xpbmtQb3N9fWAgOiBudWxsO1xuICAgIGNvbnN0IGNlbGxTdHlsZXMgPSBqc29uWzFdWydjZWxsU3R5bGVzJ107XG4gICAgY29uc3Qgcm93U3R5bGUgPSBqc29uWzFdWydyb3dTdHlsZSddO1xuICAgIGNvbnN0IGJhY2tncm91bmRDb2xvckEgPSBqc29uWzFdWydiYWNrZ3JvdW5kQ29sb3JBJ10gYXMgc3RyaW5nO1xuICAgIGNvbnN0IGJhY2tncm91bmRDb2xvckIgPSBqc29uWzFdWydiYWNrZ3JvdW5kQ29sb3JCJ10gYXMgc3RyaW5nO1xuXG4gICAgZm9ybXVsYSA9XG4gICAgICBgYnVpbGRXaWRnZXREYXRhc2V0KCR7ZGF0YXNldH0sICR7ZmllbGRzfSwgJHtyb3dMaW5rfSwgJHtjZWxsU3R5bGVzfSxgICtcbiAgICAgIGAke3Jvd1N0eWxlfSwgJHtjb2xzUGVyY2VudGFnZUFycmF5fSwgJHtKU09OLnN0cmluZ2lmeShiYWNrZ3JvdW5kQ29sb3JBKX0sICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgIGJhY2tncm91bmRDb2xvckIsXG4gICAgICApfSlgO1xuICB9XG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuUGFnaW5hdGVkTGlzdCxcbiAgICBwYWdlU2l6ZTogcGFnZVNpemUsXG4gICAgdGl0bGU6IHRpdGxlLFxuICAgIGNvbnRlbnREZWZpbml0aW9uOiB7XG4gICAgICBmb3JtdWxhOiBmb3JtdWxhLFxuICAgIH0sXG4gICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIGhlaWdodDogJzUwMHB4JyxcbiAgICB9LFxuICB9KTtcbn1cblxuLyoqXG4gKiBDcmVhdGUgYSB3aWRnZXQgd2l0aCBhIGR5bmFtaWMgcGFnaW5hdGVkIHRhYmxlIGJhc2VkIG9uIGEgbGlzdCBvZiBGb3Jtcy4gRWFjaCByb3cgaXMgYW4gQWpmRGlhbG9nV2lkZ2V0IHdpdGggYW4gQWpmVGFibGVcbiAqIHRoYXQgb3Blbiwgb24gY2xpY2ssIGEgZGlhbG9nLlxuICogQHBhcmFtIHNoZWV0TmFtZVxuICogQHBhcmFtIGpzb25cbiAqIEByZXR1cm5zIGEgUGFnaW5hdGVkIEFqZldpZGdldCB3aXRoIGEgZm9ybXVsYSBsaWtlIHRoaXM6XG4gKiBidWlsZFdpZGdldERhdGFzZXRXaXRoRGlhbG9nKHByb2plY3RzRGF0YXNldCwgWydpZF9wJywnZG9ub3JzJywncHJvdmluY2VfY2hvaWNlc0xhYmVsJywnZGlub19hcmVhX25hbWUnLCdjYWxjX3Byb2dyZXNzJywnaG9tZV9saW5rX3RleHQnLF0sXG4gKiAgWydpZF9wJywnZG9ub3JzJywncHJvdmluY2VfY2hvaWNlc0xhYmVsJywnZGlub19hcmVhX25hbWUnXSwgWydDb2RpY2UgcHJvZ2V0dG8nLCdEb25vcnMnLCdQcm92aW5jZXMnLCdTZXR0b3JlIGRpIGF0dGl2aXRhJ10sXG4gKiAgeydib3JkZXInOiAnbm9uZSd9LHsnd2lkdGgnOiAnOTAwcHgnfSwgWycxMCUnLCczMCUnLCcxMCUnLCcyNSUnLCcxNSUnLCcxMCUnXSwgXFxcIiNmMGYwZjBcXFwiLCBcXFwid2hpdGVcXFwiKVxuICovXG5mdW5jdGlvbiBfYnVpbGRQYWdpbmF0ZWRMaXN0VGFibGVXaXRoRGlhbG9nKF86IHN0cmluZywganNvbjoge1trZXk6IHN0cmluZ106IHN0cmluZ31bXSk6IEFqZldpZGdldCB7XG4gIGxldCBmb3JtdWxhID0gJyc7XG4gIGxldCBwYWdlU2l6ZSA9IDEwO1xuICBsZXQgZGF0YXNldDogc3RyaW5nID0gJyc7XG4gIGxldCB0aXRsZSA9ICcnO1xuICBpZiAoanNvbi5sZW5ndGggPiAxKSB7XG4gICAgY29uc3QgY29sc1BlcmNlbnRhZ2U6IHN0cmluZyA9IChPYmplY3QudmFsdWVzKGpzb25bMF0pIGFzIHN0cmluZ1tdKVxuICAgICAgLm1hcChyID0+IGAnJHtyfSUnYClcbiAgICAgIC5qb2luKCcsJyk7XG4gICAgY29uc3QgY29sc1BlcmNlbnRhZ2VBcnJheSA9IGBbJHtjb2xzUGVyY2VudGFnZX1dYDtcblxuICAgIGxldCBmaWVsZHMgPSAnWyc7XG4gICAgT2JqZWN0LmtleXMoanNvblswXSkuZm9yRWFjaChmaWVsZENvbE5hbWUgPT4ge1xuICAgICAgbGV0IGVsZW0gPSBqc29uWzFdW2ZpZWxkQ29sTmFtZV0gPyBgJyR7anNvblsxXVtmaWVsZENvbE5hbWVdfSdgIDogYCcnYDtcbiAgICAgIGZpZWxkcyArPSBlbGVtICsgJywnO1xuICAgIH0pO1xuICAgIGZpZWxkcyArPSAnXSc7XG5cbiAgICBsZXQgZGlhbG9nRmllbGRzID0gJ1snO1xuICAgIGxldCBkaWFsb2dMYWJlbEZpZWxkcyA9ICdbJztcbiAgICBpZiAoanNvbi5sZW5ndGggPiAzKSB7XG4gICAgICBkaWFsb2dMYWJlbEZpZWxkcyArPSAoT2JqZWN0LnZhbHVlcyhqc29uWzJdKSBhcyBzdHJpbmdbXSkubWFwKHYgPT4gYCcke3Z9J2ApLmpvaW4oJywnKTtcbiAgICAgIGRpYWxvZ0ZpZWxkcyArPSAoT2JqZWN0LnZhbHVlcyhqc29uWzNdKSBhcyBzdHJpbmdbXSkubWFwKHYgPT4gYCcke3Z9J2ApLmpvaW4oJywnKTtcbiAgICB9XG4gICAgZGlhbG9nRmllbGRzICs9ICddJztcbiAgICBkaWFsb2dMYWJlbEZpZWxkcyArPSAnXSc7XG5cbiAgICBkYXRhc2V0ID0ganNvblsxXVsnZGF0YXNldCddIGFzIHN0cmluZztcbiAgICB0aXRsZSA9IGpzb25bMV1bJ3RpdGxlJ10gYXMgc3RyaW5nO1xuICAgIHBhZ2VTaXplID0ganNvblsxXVsncGFnZVNpemUnXSA/ICtqc29uWzFdWydwYWdlU2l6ZSddIDogMTA7XG4gICAgY29uc3QgY2VsbFN0eWxlcyA9IGpzb25bMV1bJ2NlbGxTdHlsZXMnXTtcbiAgICBjb25zdCByb3dTdHlsZSA9IGpzb25bMV1bJ3Jvd1N0eWxlJ107XG4gICAgY29uc3QgYmFja2dyb3VuZENvbG9yQSA9IGpzb25bMV1bJ2JhY2tncm91bmRDb2xvckEnXSBhcyBzdHJpbmc7XG4gICAgY29uc3QgYmFja2dyb3VuZENvbG9yQiA9IGpzb25bMV1bJ2JhY2tncm91bmRDb2xvckInXSBhcyBzdHJpbmc7XG5cbiAgICBmb3JtdWxhID1cbiAgICAgIGBidWlsZFdpZGdldERhdGFzZXRXaXRoRGlhbG9nKCR7ZGF0YXNldH0sICR7ZmllbGRzfSwgJHtkaWFsb2dGaWVsZHN9LCAke2RpYWxvZ0xhYmVsRmllbGRzfSwgJHtjZWxsU3R5bGVzfSxgICtcbiAgICAgIGAke3Jvd1N0eWxlfSwgJHtjb2xzUGVyY2VudGFnZUFycmF5fSwgJHtKU09OLnN0cmluZ2lmeShiYWNrZ3JvdW5kQ29sb3JBKX0sICR7SlNPTi5zdHJpbmdpZnkoXG4gICAgICAgIGJhY2tncm91bmRDb2xvckIsXG4gICAgICApfSlgO1xuICB9XG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuUGFnaW5hdGVkTGlzdCxcbiAgICBwYWdlU2l6ZTogcGFnZVNpemUsXG4gICAgdGl0bGU6IHRpdGxlLFxuICAgIGNvbnRlbnREZWZpbml0aW9uOiB7XG4gICAgICBmb3JtdWxhOiBmb3JtdWxhLFxuICAgIH0sXG4gICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICBzdHlsZXM6IHtcbiAgICAgIGhlaWdodDogJzUwMHB4JyxcbiAgICB9LFxuICB9KTtcbn1cblxuY29uc3QgX2J1aWxkSGVhdG1hcCA9IChfOiBzdHJpbmcsIGpzb246IHtba2V5OiBzdHJpbmddOiBzdHJpbmd9W10pOiBBamZXaWRnZXQgPT4ge1xuICBjb25zdCBkZWZhdWx0RmVhdHVyZXMgPSB7XG4gICAgdHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJyxcbiAgICBmZWF0dXJlczogW10sXG4gIH07XG4gIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgdmFsdWVzOiAnW10nLFxuICAgIGlkUHJvcDogJ2lkJyxcbiAgICBmZWF0dXJlczogSlNPTi5zdHJpbmdpZnkoZGVmYXVsdEZlYXR1cmVzKSxcbiAgICBzdGFydENvbG9yOiAnI2ZmZWIzYicsXG4gICAgZW5kQ29sb3I6ICcjZjQ0MzM2JyxcbiAgICBoaWdobGlnaHRDb2xvcjogJyMwMDk2ODgnLFxuICAgIHNob3dWaXN1YWxNYXA6IGZhbHNlLFxuICAgIC4uLihqc29uLmxlbmd0aCA+IDAgPyBqc29uWzBdIDoge30pLFxuICB9O1xuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkhlYXRNYXAsXG4gICAgLi4ub3B0aW9ucyxcbiAgICB2YWx1ZXM6IHtmb3JtdWxhOiBvcHRpb25zLnZhbHVlc30sXG4gICAgc3R5bGVzOiB7XG4gICAgICBtaW5IZWlnaHQ6ICcyMDBweCcsXG4gICAgfSxcbiAgfSk7XG59O1xuIl19