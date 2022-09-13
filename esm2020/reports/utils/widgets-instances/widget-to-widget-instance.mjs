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
import { evaluateExpression } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { chartToChartJsType } from '../../chart-utils';
import { evaluateAggregation } from '../aggregation/evaluate-aggregation';
import { isChartWidget } from '../widgets/is-chart-widget';
import { isDialogWidget } from '../widgets/is-dialog-widget';
import { isDynamicTableWidget } from '../widgets/is-dynamic-table-widget';
import { isFormulaWidget } from '../widgets/is-formula-widget';
import { isGraphWidget } from '../widgets/is-graph-widget';
import { isHeatMapWidget } from '../widgets/is-heat-map-widget';
import { isImageContainerWidget } from '../widgets/is-image-container-widget';
import { isImageWidget } from '../widgets/is-image-widget';
import { isMapWidget } from '../widgets/is-map-widget';
import { isPaginatedListWidget } from '../widgets/is-paginated-list-widget';
import { isPaginatedTableWidget } from '../widgets/is-paginated-table-widget';
import { isWidgetWithContent } from '../widgets/is-widget-with-content';
import { isTableWidget } from '../widgets/is-table-widget';
import { isTextWidget } from '../widgets/is-text-widget';
import { componentsMap } from '../widgets/widgets-map';
import { isChartWidgetInstance } from '../widgets-instances/is-chart-widget-instance';
import { isDialogWidgetInstance } from '../widgets-instances/is-dialog-widget-instance';
import { isDynamicTableWidgetInstance } from '../widgets-instances/is-dynamic-table-widget-instance';
import { isFormulaWidgetInstance } from '../widgets-instances/is-formula-widget-instance';
import { isGraphWidgetInstance } from '../widgets-instances/is-graph-widget-instance';
import { isHeatMapWidgetInstance } from '../widgets-instances/is-heat-map-widget-instance';
import { isImageContainerWidgetInstance } from '../widgets-instances/is-image-container-widget-instance';
import { isImageWidgetInstance } from '../widgets-instances/is-image-widget-instance';
import { isMapWidgetInstance } from '../widgets-instances/is-map-widget-instance';
import { isPaginatedListWidgetInstance } from '../widgets-instances/is-paginated-list-widget-instance';
import { isPaginatedTableWidgetInstance } from './is-paginated-table-widget-instance';
import { isTableWidgetInstance } from '../widgets-instances/is-table-widget-instance';
import { isTextWidgetInstance } from '../widgets-instances/is-text-widget-instance';
import { isWidgetWithContentInstance } from '../widgets-instances/is-widget-with-content-instance';
import { createWidgetInstance } from './create-widget-instance';
import { evaluateProperty, trFormula } from './widget-instance-utils';
export function widgetToWidgetInstance(widget, context, ts, variables = []) {
    const wi = createWidgetInstance(widget, context, ts, variables);
    if (isWidgetWithContent(widget) && isWidgetWithContentInstance(wi)) {
        let content = [];
        widget.content.forEach(c => {
            if (widget.repetitions != null) {
                wi.repetitions = evaluateExpression(widget.repetitions.formula, context);
                if (typeof wi.repetitions === 'number' && wi.repetitions > 0) {
                    for (let i = 0; i < wi.repetitions; i++) {
                        content.push(widgetToWidgetInstance(c, { ...context, '$repetition': i }, ts, variables));
                    }
                }
            }
            else {
                content.push(widgetToWidgetInstance(c, context, ts, variables));
            }
            wi.content = content;
        });
        if (isDialogWidget(widget) && isDialogWidgetInstance(wi)) {
            wi.toggle = widgetToWidgetInstance(widget.toggle, context, ts, variables);
        }
    }
    else if (isChartWidget(widget) && isChartWidgetInstance(wi)) {
        if (widget.options == null) {
            widget.options = {};
        }
        const labels = widget.labels instanceof Array ? widget.labels : [widget.labels];
        const evLabels = labels.map(l => {
            let evf = evaluateExpression(l.formula, context);
            try {
                if (evf instanceof Array) {
                    evf = evf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.translate(v) : v);
                }
                else {
                    evf =
                        evf != null && typeof evf === 'string' && evf.trim().length > 0
                            ? ts.translate(evf)
                            : evf;
                }
            }
            catch (_e) { }
            return evf;
        });
        wi.labels = widget.labels instanceof Array ? evLabels : evLabels[0];
        wi.datasets = widget.dataset.map(d => {
            let ds = {
                ...(d.options || {}),
                data: evaluateAggregation(d.aggregation, d.formula, context),
            };
            if (d.chartType != null) {
                const ct = chartToChartJsType(d.chartType);
                ds = { ...ds, chartType: ct, type: ct };
            }
            if (d.options != null) {
                ds = { ...ds, options: d.options };
            }
            if (d.label != null) {
                ds = { ...ds, label: d.label.trim().length > 0 ? ts.translate(d.label) : d.label };
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        });
        wi.data = { labels: wi.labels, datasets: wi.datasets };
        wi.chartType = chartToChartJsType(widget.type || widget.chartType);
        wi.exportable =
            widget.exportable && (widget.exportable === true || widget.exportable === 'true')
                ? true
                : false;
        if (widget.options != null && widget.options.plugins != null) {
            const plugins = widget.options.plugins;
            const pluginNames = Object.keys(plugins);
            pluginNames.forEach(pluginName => {
                const plugin = plugins[pluginName];
                const pluginOptions = Object.keys(plugin);
                pluginOptions.forEach((pluginOptionName) => {
                    const pluginOption = plugin[pluginOptionName];
                    if (typeof pluginOption !== 'string' &&
                        pluginOption != null &&
                        pluginOption.formula != null) {
                        plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
                    }
                });
            });
        }
    }
    else if (isTableWidget(widget) && isTableWidgetInstance(wi)) {
        wi.dataset = widget.dataset.map(row => row.map(cell => {
            return cell.formula instanceof Array
                ? cell.formula.map(f => trFormula(f, context, ts))
                : trFormula(cell.formula, context, ts);
        }));
        wi.exportable =
            widget.exportable && (widget.exportable === true || widget.exportable === 'true')
                ? true
                : false;
        wi.data = (widget.dataset || []).map(row => row.map(cell => {
            let evf = '';
            try {
                evf =
                    cell.formula instanceof Array
                        ? cell.formula.map(f => trFormula(f, context, ts))
                        : trFormula(cell.formula, context, ts);
            }
            catch (_e) { }
            return {
                value: evf,
                style: { ...widget.cellStyles, ...cell.style },
                rowspan: cell.rowspan,
                colspan: cell.colspan,
            };
        }));
    }
    else if ((isDynamicTableWidget(widget) && isDynamicTableWidgetInstance(wi)) ||
        (isPaginatedTableWidget(widget) && isPaginatedTableWidgetInstance(wi))) {
        wi.dataset = widget.dataset.map((cell) => {
            return cell.formula instanceof Array
                ? cell.formula.map(f => trFormula(f, context, ts))
                : trFormula(cell.formula, context, ts);
        });
        wi.exportable =
            widget.exportable && (widget.exportable === true || widget.exportable === 'true')
                ? true
                : false;
        let dataset = evaluateExpression(widget.rowDefinition.formula, context) || [];
        dataset = (dataset || []).map((row) => row.map(cell => {
            let trf = cell.value;
            try {
                if (trf instanceof Array) {
                    trf = trf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.translate(v) : v);
                }
                else {
                    trf =
                        trf != null && typeof trf === 'string' && trf.trim().length > 0
                            ? ts.translate(trf)
                            : trf;
                }
            }
            catch (_e) { }
            return { ...cell, value: trf };
        }));
        const header = (widget.dataset || []).map(cell => {
            let evf = '';
            try {
                evf =
                    cell.formula instanceof Array
                        ? cell.formula.map(f => trFormula(f, context, ts))
                        : trFormula(cell.formula, context, ts);
            }
            catch (_e) { }
            return {
                value: evf,
                style: { ...widget.cellStyles, ...cell.style },
                rowspan: cell.rowspan,
                colspan: cell.colspan,
            };
        });
        wi.data = header.length === 0 ? [...dataset] : [[...header], ...dataset];
        wi.styles = { ...wi.styles, alignItems: 'flex-start' };
    }
    else if (isPaginatedListWidget(widget) && isPaginatedListWidgetInstance(wi)) {
        let content = [];
        if (widget.contentDefinition) {
            let contentDefinition = evaluateExpression(widget.contentDefinition.formula, context) || [];
            contentDefinition.forEach(c => {
                content.push(widgetToWidgetInstance(c, context, ts, variables));
            });
        }
        else if (widget.content) {
            widget.content.forEach(c => {
                content.push(widgetToWidgetInstance(c, context, ts, variables));
            });
        }
        wi.content = content;
    }
    else if (isImageWidget(widget) && isImageWidgetInstance(wi)) {
        if (widget.flag) {
            wi.flag = evaluateExpression(widget.flag.formula, context);
        }
        if (widget.icon) {
            wi.icon = evaluateExpression(widget.icon.formula, context);
        }
        if (widget.url) {
            wi.url = evaluateExpression(widget.url.formula, context);
        }
    }
    else if (isImageContainerWidget(widget) && isImageContainerWidgetInstance(wi)) {
        if (widget.flags) {
            wi.flags =
                widget.flags instanceof Array
                    ? widget.flags.map(f => evaluateExpression(f.formula, context))
                    : evaluateExpression(widget.flags.formula, context);
        }
        if (widget.icons) {
            wi.icons =
                widget.icons instanceof Array
                    ? widget.icons.map(f => evaluateExpression(f.formula, context))
                    : evaluateExpression(widget.icons.formula, context);
        }
        if (widget.urls) {
            wi.urls =
                widget.urls instanceof Array
                    ? widget.urls.map(f => evaluateExpression(f.formula, context))
                    : evaluateExpression(widget.urls.formula, context);
        }
    }
    else if (isTextWidget(widget) && isTextWidgetInstance(wi)) {
        wi.htmlText = evaluateProperty(widget.htmlText, context, ts);
    }
    else if (isFormulaWidget(widget) && isFormulaWidgetInstance(wi)) {
        wi.formula = evaluateExpression(widget.formula.formula, context);
    }
    else if (isMapWidget(widget) && isMapWidgetInstance(wi)) {
        wi.coordinate = evaluateExpression(widget.coordinate.formula, context);
    }
    else if (isGraphWidget(widget) && isGraphWidgetInstance(wi)) {
        if (widget.nodes != null) {
            wi.nodes = widget.nodes.map(ds => {
                let node = {
                    ...ds,
                };
                node.label = ds.label != null ? evaluateProperty(ds.label, context, ts) : ds.id;
                node.red = evaluateExpression(ds.red, context);
                node.yellow = evaluateExpression(ds.yellow, context);
                node.green = evaluateExpression(ds.green, context);
                node.color = ds.color ? evaluateExpression(ds.color, context) : undefined;
                return node;
            });
        }
    }
    else if (isHeatMapWidget(widget) && isHeatMapWidgetInstance(wi)) {
        wi.idProp = widget.idProp || 'id';
        wi.features = (typeof widget.features === 'string'
            ? JSON.parse(widget.features)
            : widget.features) || { type: 'FeatureCollection', features: [] };
        wi.values = evaluateExpression(widget.values.formula, context);
        wi.startColor = widget.startColor || '#ffeb3b';
        wi.endColor = widget.endColor || '#f44336';
        wi.highlightColor = widget.highlightColor || '#009688';
        wi.showVisualMap = widget.showVisualMap === true;
        if (widget.action) {
            wi.action = widget.action;
        }
    }
    else if (widget.widgetType > 100) {
        const iiFn = componentsMap[widget.widgetType] != null
            ? componentsMap[widget.widgetType].initInstance
            : null;
        if (iiFn != null) {
            return iiFn(wi, context, ts);
        }
    }
    return wi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWEsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUdoRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFLckQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBQzFFLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQzVFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sMkJBQTJCLENBQUM7QUFDdkQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHdCQUF3QixDQUFDO0FBQ3JELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGdEQUFnRCxDQUFDO0FBQ3RGLE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLHVEQUF1RCxDQUFDO0FBQ25HLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGlEQUFpRCxDQUFDO0FBQ3hGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBQyx1QkFBdUIsRUFBQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3pGLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLHlEQUF5RCxDQUFDO0FBQ3ZHLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLDZDQUE2QyxDQUFDO0FBQ2hGLE9BQU8sRUFBQyw2QkFBNkIsRUFBQyxNQUFNLHdEQUF3RCxDQUFDO0FBQ3JHLE9BQU8sRUFBQyw4QkFBOEIsRUFBQyxNQUFNLHNDQUFzQyxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLCtDQUErQyxDQUFDO0FBQ3BGLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDhDQUE4QyxDQUFDO0FBQ2xGLE9BQU8sRUFBQywyQkFBMkIsRUFBQyxNQUFNLHNEQUFzRCxDQUFDO0FBRWpHLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxnQkFBZ0IsRUFBRSxTQUFTLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUdwRSxNQUFNLFVBQVUsc0JBQXNCLENBQ3BDLE1BQWlCLEVBQ2pCLE9BQW1CLEVBQ25CLEVBQW9CLEVBQ3BCLFlBQWlDLEVBQUU7SUFFbkMsTUFBTSxFQUFFLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7SUFFaEUsSUFBSSxtQkFBbUIsQ0FBQyxNQUFNLENBQUMsSUFBSSwyQkFBMkIsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUNsRSxJQUFJLE9BQU8sR0FBd0IsRUFBRSxDQUFDO1FBQ3RDLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3pCLElBQUksTUFBTSxDQUFDLFdBQVcsSUFBSSxJQUFJLEVBQUU7Z0JBQzlCLEVBQUUsQ0FBQyxXQUFXLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQ3pFLElBQUksT0FBTyxFQUFFLENBQUMsV0FBVyxLQUFLLFFBQVEsSUFBSSxFQUFFLENBQUMsV0FBVyxHQUFHLENBQUMsRUFBRTtvQkFDNUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ3ZDLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLEVBQUMsR0FBRyxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUMsRUFBQyxFQUFFLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQyxDQUFDO3FCQUN4RjtpQkFDRjthQUNGO2lCQUFNO2dCQUNMLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQzthQUNqRTtZQUNELEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQyxDQUFDO1FBQ0gsSUFBSSxjQUFjLENBQUMsTUFBTSxDQUFDLElBQUksc0JBQXNCLENBQUMsRUFBRSxDQUFDLEVBQUU7WUFDeEQsRUFBRSxDQUFDLE1BQU0sR0FBRyxzQkFBc0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7U0FDM0U7S0FDRjtTQUFNLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQzdELElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUU7WUFDMUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7U0FDckI7UUFDRCxNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLENBQUM7UUFDaEYsTUFBTSxRQUFRLEdBQUcsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUM5QixJQUFJLEdBQUcsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1lBQ2pELElBQUk7Z0JBQ0YsSUFBSSxHQUFHLFlBQVksS0FBSyxFQUFFO29CQUN4QixHQUFHLEdBQUcsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUNoQixDQUFDLElBQUksSUFBSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLFFBQVEsSUFBSSxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUNoRixDQUFDO2lCQUNIO3FCQUFNO29CQUNMLEdBQUc7d0JBQ0QsR0FBRyxJQUFJLElBQUksSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLElBQUksR0FBRyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDOzRCQUM3RCxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUM7NEJBQ25CLENBQUMsQ0FBQyxHQUFHLENBQUM7aUJBQ1g7YUFDRjtZQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUU7WUFDZixPQUFPLEdBQUcsQ0FBQztRQUNiLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUMsTUFBTSxZQUFZLEtBQUssQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDcEUsRUFBRSxDQUFDLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUNuQyxJQUFJLEVBQUUsR0FBUTtnQkFDWixHQUFHLENBQUMsQ0FBQyxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUM7Z0JBQ3BCLElBQUksRUFBRSxtQkFBbUIsQ0FBQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDO2FBQzdELENBQUM7WUFDRixJQUFJLENBQUMsQ0FBQyxTQUFTLElBQUksSUFBSSxFQUFFO2dCQUN2QixNQUFNLEVBQUUsR0FBRyxrQkFBa0IsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQzNDLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxFQUFFLFNBQVMsRUFBRSxFQUFFLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBQyxDQUFDO2FBQ3ZDO1lBQ0QsSUFBSSxDQUFDLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRTtnQkFDckIsRUFBRSxHQUFHLEVBQUMsR0FBRyxFQUFFLEVBQUUsT0FBTyxFQUFFLENBQUMsQ0FBQyxPQUFPLEVBQUMsQ0FBQzthQUNsQztZQUNELElBQUksQ0FBQyxDQUFDLEtBQUssSUFBSSxJQUFJLEVBQUU7Z0JBQ25CLEVBQUUsR0FBRyxFQUFDLEdBQUcsRUFBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxFQUFDLENBQUM7YUFDbEY7WUFDRCxJQUFJLENBQUMsQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO2dCQUN4QixFQUFFLENBQUMsVUFBVSxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUM7YUFDeEM7WUFDRCxPQUFPLEVBQUUsQ0FBQztRQUNaLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLElBQUksR0FBRyxFQUFDLE1BQU0sRUFBRSxFQUFFLENBQUMsTUFBTSxFQUFFLFFBQVEsRUFBRSxFQUFFLENBQUMsUUFBUSxFQUFDLENBQUM7UUFDckQsRUFBRSxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxJQUFJLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNuRSxFQUFFLENBQUMsVUFBVTtZQUNYLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQztnQkFDL0UsQ0FBQyxDQUFDLElBQUk7Z0JBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNaLElBQUksTUFBTSxDQUFDLE9BQU8sSUFBSSxJQUFJLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFO1lBQzVELE1BQU0sT0FBTyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDO1lBQ3ZDLE1BQU0sV0FBVyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDekMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDL0IsTUFBTSxNQUFNLEdBQUcsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO2dCQUNuQyxNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO2dCQUMxQyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsZ0JBQXdCLEVBQUUsRUFBRTtvQkFDakQsTUFBTSxZQUFZLEdBQUcsTUFBTSxDQUFDLGdCQUFnQixDQUFDLENBQUM7b0JBQzlDLElBQ0UsT0FBTyxZQUFZLEtBQUssUUFBUTt3QkFDaEMsWUFBWSxJQUFJLElBQUk7d0JBQ3BCLFlBQVksQ0FBQyxPQUFPLElBQUksSUFBSSxFQUM1Qjt3QkFDQSxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO3FCQUM5RTtnQkFDSCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtTQUFNLElBQUksYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHFCQUFxQixDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQzdELEVBQUUsQ0FBQyxPQUFPLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDcEMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNiLE9BQU8sSUFBSSxDQUFDLE9BQU8sWUFBWSxLQUFLO2dCQUNsQyxDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFDbEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBUSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQztRQUM1QyxDQUFDLENBQUMsQ0FDSCxDQUFDO1FBQ0YsRUFBRSxDQUFDLFVBQVU7WUFDWCxNQUFNLENBQUMsVUFBVSxJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsS0FBSyxJQUFJLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxNQUFNLENBQUM7Z0JBQy9FLENBQUMsQ0FBQyxJQUFJO2dCQUNOLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDWixFQUFFLENBQUMsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE9BQU8sSUFBSSxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FDekMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNiLElBQUksR0FBRyxHQUFHLEVBQUUsQ0FBQztZQUNiLElBQUk7Z0JBQ0YsR0FBRztvQkFDRCxJQUFJLENBQUMsT0FBTyxZQUFZLEtBQUs7d0JBQzNCLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO3dCQUNsRCxDQUFDLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxPQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2FBQzdDO1lBQUMsT0FBTyxFQUFFLEVBQUUsR0FBRTtZQUNmLE9BQU87Z0JBQ0wsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsS0FBSyxFQUFFLEVBQUMsR0FBRyxNQUFNLENBQUMsVUFBVSxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssRUFBQztnQkFDNUMsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2dCQUNyQixPQUFPLEVBQUUsSUFBSSxDQUFDLE9BQU87YUFDdEIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUNILENBQUM7S0FDSDtTQUFNLElBQ0wsQ0FBQyxvQkFBb0IsQ0FBQyxNQUFNLENBQUMsSUFBSSw0QkFBNEIsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNsRSxDQUFDLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLDhCQUE4QixDQUFDLEVBQUUsQ0FBQyxDQUFDLEVBQ3RFO1FBQ0EsRUFBRSxDQUFDLE9BQU8sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQXFCLEVBQUUsRUFBRTtZQUN4RCxPQUFPLElBQUksQ0FBQyxPQUFPLFlBQVksS0FBSztnQkFDbEMsQ0FBQyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsU0FBUyxDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBQ2xELENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLE9BQVEsRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDNUMsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsVUFBVTtZQUNYLE1BQU0sQ0FBQyxVQUFVLElBQUksQ0FBQyxNQUFNLENBQUMsVUFBVSxLQUFLLElBQUksSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLE1BQU0sQ0FBQztnQkFDL0UsQ0FBQyxDQUFDLElBQUk7Z0JBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUVaLElBQUksT0FBTyxHQUFxQixrQkFBa0IsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDaEcsT0FBTyxHQUFHLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQW1CLEVBQUUsRUFBRSxDQUNwRCxHQUFHLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFO1lBQ2IsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQztZQUNyQixJQUFJO2dCQUNGLElBQUksR0FBRyxZQUFZLEtBQUssRUFBRTtvQkFDeEIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FDaEIsQ0FBQyxJQUFJLElBQUksSUFBSSxPQUFPLENBQUMsS0FBSyxRQUFRLElBQUksQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDaEYsQ0FBQztpQkFDSDtxQkFBTTtvQkFDTCxHQUFHO3dCQUNELEdBQUcsSUFBSSxJQUFJLElBQUksT0FBTyxHQUFHLEtBQUssUUFBUSxJQUFJLEdBQUcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxNQUFNLEdBQUcsQ0FBQzs0QkFDN0QsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDOzRCQUNuQixDQUFDLENBQUMsR0FBRyxDQUFDO2lCQUNYO2FBQ0Y7WUFBQyxPQUFPLEVBQUUsRUFBRSxHQUFFO1lBQ2YsT0FBTyxFQUFDLEdBQUcsSUFBSSxFQUFFLEtBQUssRUFBRSxHQUFHLEVBQUMsQ0FBQztRQUMvQixDQUFDLENBQUMsQ0FDSCxDQUFDO1FBRUYsTUFBTSxNQUFNLEdBQUcsQ0FBQyxNQUFNLENBQUMsT0FBTyxJQUFJLEVBQUUsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUMvQyxJQUFJLEdBQUcsR0FBRyxFQUFFLENBQUM7WUFDYixJQUFJO2dCQUNGLEdBQUc7b0JBQ0QsSUFBSSxDQUFDLE9BQU8sWUFBWSxLQUFLO3dCQUMzQixDQUFDLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQzt3QkFDbEQsQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUMsQ0FBQzthQUM1QztZQUFDLE9BQU8sRUFBRSxFQUFFLEdBQUU7WUFDZixPQUFPO2dCQUNMLEtBQUssRUFBRSxHQUFHO2dCQUNWLEtBQUssRUFBRSxFQUFDLEdBQUcsTUFBTSxDQUFDLFVBQVUsRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLEVBQUM7Z0JBQzVDLE9BQU8sRUFBRSxJQUFJLENBQUMsT0FBTztnQkFDckIsT0FBTyxFQUFFLElBQUksQ0FBQyxPQUFPO2FBQ3RCLENBQUM7UUFDSixDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsTUFBTSxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUMsQ0FBQztRQUN6RSxFQUFFLENBQUMsTUFBTSxHQUFHLEVBQUMsR0FBRyxFQUFFLENBQUMsTUFBTSxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUMsQ0FBQztLQUN0RDtTQUFNLElBQUkscUJBQXFCLENBQUMsTUFBTSxDQUFDLElBQUksNkJBQTZCLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDN0UsSUFBSSxPQUFPLEdBQXdCLEVBQUUsQ0FBQztRQUN0QyxJQUFJLE1BQU0sQ0FBQyxpQkFBaUIsRUFBRTtZQUM1QixJQUFJLGlCQUFpQixHQUNuQixrQkFBa0IsQ0FBQyxNQUFNLENBQUMsaUJBQWlCLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUN0RSxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7Z0JBQzVCLE9BQU8sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxFQUFFLE9BQU8sRUFBRSxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQztZQUNsRSxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU0sSUFBSSxNQUFNLENBQUMsT0FBTyxFQUFFO1lBQ3pCLE1BQU0sQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO2dCQUN6QixPQUFPLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUMsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDLENBQUM7WUFDbEUsQ0FBQyxDQUFDLENBQUM7U0FDSjtRQUNELEVBQUUsQ0FBQyxPQUFPLEdBQUcsT0FBTyxDQUFDO0tBQ3RCO1NBQU0sSUFBSSxhQUFhLENBQUMsTUFBTSxDQUFDLElBQUkscUJBQXFCLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDN0QsSUFBSSxNQUFNLENBQUMsSUFBSSxFQUFFO1lBQ2YsRUFBRSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUM1RDtRQUNELElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNmLEVBQUUsQ0FBQyxJQUFJLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7U0FDNUQ7UUFDRCxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUU7WUFDZCxFQUFFLENBQUMsR0FBRyxHQUFHLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQzFEO0tBQ0Y7U0FBTSxJQUFJLHNCQUFzQixDQUFDLE1BQU0sQ0FBQyxJQUFJLDhCQUE4QixDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQy9FLElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixFQUFFLENBQUMsS0FBSztnQkFDTixNQUFNLENBQUMsS0FBSyxZQUFZLEtBQUs7b0JBQzNCLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQy9ELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksTUFBTSxDQUFDLEtBQUssRUFBRTtZQUNoQixFQUFFLENBQUMsS0FBSztnQkFDTixNQUFNLENBQUMsS0FBSyxZQUFZLEtBQUs7b0JBQzNCLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7b0JBQy9ELENBQUMsQ0FBQyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztTQUN6RDtRQUNELElBQUksTUFBTSxDQUFDLElBQUksRUFBRTtZQUNmLEVBQUUsQ0FBQyxJQUFJO2dCQUNMLE1BQU0sQ0FBQyxJQUFJLFlBQVksS0FBSztvQkFDMUIsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsa0JBQWtCLENBQUMsQ0FBQyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztvQkFDOUQsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1NBQ3hEO0tBQ0Y7U0FBTSxJQUFJLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUMzRCxFQUFFLENBQUMsUUFBUSxHQUFHLGdCQUFnQixDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0tBQzlEO1NBQU0sSUFBSSxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksdUJBQXVCLENBQUMsRUFBRSxDQUFDLEVBQUU7UUFDakUsRUFBRSxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNsRTtTQUFNLElBQUksV0FBVyxDQUFDLE1BQU0sQ0FBQyxJQUFJLG1CQUFtQixDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ3pELEVBQUUsQ0FBQyxVQUFVLEdBQUcsa0JBQWtCLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUM7S0FDeEU7U0FBTSxJQUFJLGFBQWEsQ0FBQyxNQUFNLENBQUMsSUFBSSxxQkFBcUIsQ0FBQyxFQUFFLENBQUMsRUFBRTtRQUM3RCxJQUFJLE1BQU0sQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3hCLEVBQUUsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEVBQUU7Z0JBQy9CLElBQUksSUFBSSxHQUFRO29CQUNkLEdBQUcsRUFBRTtpQkFDTixDQUFDO2dCQUNGLElBQUksQ0FBQyxLQUFLLEdBQUcsRUFBRSxDQUFDLEtBQUssSUFBSSxJQUFJLENBQUMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxDQUFDO2dCQUNoRixJQUFJLENBQUMsR0FBRyxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxHQUFHLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxNQUFNLEdBQUcsa0JBQWtCLENBQUMsRUFBRSxDQUFDLE1BQU0sRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDckQsSUFBSSxDQUFDLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsS0FBSyxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRCxJQUFJLENBQUMsS0FBSyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxLQUFLLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsQ0FBQztnQkFDMUUsT0FBTyxJQUFvQixDQUFDO1lBQzlCLENBQUMsQ0FBQyxDQUFDO1NBQ0o7S0FDRjtTQUFNLElBQUksZUFBZSxDQUFDLE1BQU0sQ0FBQyxJQUFJLHVCQUF1QixDQUFDLEVBQUUsQ0FBQyxFQUFFO1FBQ2pFLEVBQUUsQ0FBQyxNQUFNLEdBQUcsTUFBTSxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUM7UUFDbEMsRUFBRSxDQUFDLFFBQVEsR0FBRyxDQUFDLE9BQU8sTUFBTSxDQUFDLFFBQVEsS0FBSyxRQUFRO1lBQ2hELENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUM7WUFDN0IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFDLENBQUM7UUFDbEUsRUFBRSxDQUFDLE1BQU0sR0FBRyxrQkFBa0IsQ0FBQyxNQUFNLENBQUMsTUFBTSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztRQUMvRCxFQUFFLENBQUMsVUFBVSxHQUFHLE1BQU0sQ0FBQyxVQUFVLElBQUksU0FBUyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUM7UUFDM0MsRUFBRSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQztRQUN2RCxFQUFFLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDO1FBQ2pELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDM0I7S0FDRjtTQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEdBQ1IsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJO1lBQ3RDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVk7WUFDL0MsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNYLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzlCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtUcmFuc2xvY29TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5cbmltcG9ydCB7Y2hhcnRUb0NoYXJ0SnNUeXBlfSBmcm9tICcuLi8uLi9jaGFydC11dGlscyc7XG5pbXBvcnQge0FqZlRhYmxlRGF0YXNldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2RhdGFzZXQvdGFibGUtZGF0YXNldCc7XG5pbXBvcnQge0FqZlJlcG9ydFZhcmlhYmxlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtdmFyaWFibGUnO1xuaW1wb3J0IHtBamZXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7ZXZhbHVhdGVBZ2dyZWdhdGlvbn0gZnJvbSAnLi4vYWdncmVnYXRpb24vZXZhbHVhdGUtYWdncmVnYXRpb24nO1xuaW1wb3J0IHtpc0NoYXJ0V2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLWNoYXJ0LXdpZGdldCc7XG5pbXBvcnQge2lzRGlhbG9nV2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLWRpYWxvZy13aWRnZXQnO1xuaW1wb3J0IHtpc0R5bmFtaWNUYWJsZVdpZGdldH0gZnJvbSAnLi4vd2lkZ2V0cy9pcy1keW5hbWljLXRhYmxlLXdpZGdldCc7XG5pbXBvcnQge2lzRm9ybXVsYVdpZGdldH0gZnJvbSAnLi4vd2lkZ2V0cy9pcy1mb3JtdWxhLXdpZGdldCc7XG5pbXBvcnQge2lzR3JhcGhXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtZ3JhcGgtd2lkZ2V0JztcbmltcG9ydCB7aXNIZWF0TWFwV2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLWhlYXQtbWFwLXdpZGdldCc7XG5pbXBvcnQge2lzSW1hZ2VDb250YWluZXJXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtaW1hZ2UtY29udGFpbmVyLXdpZGdldCc7XG5pbXBvcnQge2lzSW1hZ2VXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtaW1hZ2Utd2lkZ2V0JztcbmltcG9ydCB7aXNNYXBXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtbWFwLXdpZGdldCc7XG5pbXBvcnQge2lzUGFnaW5hdGVkTGlzdFdpZGdldH0gZnJvbSAnLi4vd2lkZ2V0cy9pcy1wYWdpbmF0ZWQtbGlzdC13aWRnZXQnO1xuaW1wb3J0IHtpc1BhZ2luYXRlZFRhYmxlV2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLXBhZ2luYXRlZC10YWJsZS13aWRnZXQnO1xuaW1wb3J0IHtpc1dpZGdldFdpdGhDb250ZW50fSBmcm9tICcuLi93aWRnZXRzL2lzLXdpZGdldC13aXRoLWNvbnRlbnQnO1xuaW1wb3J0IHtpc1RhYmxlV2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLXRhYmxlLXdpZGdldCc7XG5pbXBvcnQge2lzVGV4dFdpZGdldH0gZnJvbSAnLi4vd2lkZ2V0cy9pcy10ZXh0LXdpZGdldCc7XG5pbXBvcnQge2NvbXBvbmVudHNNYXB9IGZyb20gJy4uL3dpZGdldHMvd2lkZ2V0cy1tYXAnO1xuaW1wb3J0IHtpc0NoYXJ0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLWNoYXJ0LXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRGlhbG9nV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLWRpYWxvZy13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc0R5bmFtaWNUYWJsZVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy1keW5hbWljLXRhYmxlLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRm9ybXVsYVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy1mb3JtdWxhLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzR3JhcGhXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtZ3JhcGgtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNIZWF0TWFwV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLWhlYXQtbWFwLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzSW1hZ2VDb250YWluZXJXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtaW1hZ2UtY29udGFpbmVyLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzSW1hZ2VXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtaW1hZ2Utd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNNYXBXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtbWFwLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzUGFnaW5hdGVkTGlzdFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy1wYWdpbmF0ZWQtbGlzdC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc1BhZ2luYXRlZFRhYmxlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4vaXMtcGFnaW5hdGVkLXRhYmxlLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzVGFibGVXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtdGFibGUtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNUZXh0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLXRleHQtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNXaWRnZXRXaXRoQ29udGVudEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy13aWRnZXQtd2l0aC1jb250ZW50LWluc3RhbmNlJztcblxuaW1wb3J0IHtjcmVhdGVXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi9jcmVhdGUtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7ZXZhbHVhdGVQcm9wZXJ0eSwgdHJGb3JtdWxhfSBmcm9tICcuL3dpZGdldC1pbnN0YW5jZS11dGlscyc7XG5pbXBvcnQge0FqZkdyYXBoTm9kZX0gZnJvbSAnQGFqZi9jb3JlL2dyYXBoJztcblxuZXhwb3J0IGZ1bmN0aW9uIHdpZGdldFRvV2lkZ2V0SW5zdGFuY2UoXG4gIHdpZGdldDogQWpmV2lkZ2V0LFxuICBjb250ZXh0OiBBamZDb250ZXh0LFxuICB0czogVHJhbnNsb2NvU2VydmljZSxcbiAgdmFyaWFibGVzOiBBamZSZXBvcnRWYXJpYWJsZVtdID0gW10sXG4pOiBBamZXaWRnZXRJbnN0YW5jZSB7XG4gIGNvbnN0IHdpID0gY3JlYXRlV2lkZ2V0SW5zdGFuY2Uod2lkZ2V0LCBjb250ZXh0LCB0cywgdmFyaWFibGVzKTtcblxuICBpZiAoaXNXaWRnZXRXaXRoQ29udGVudCh3aWRnZXQpICYmIGlzV2lkZ2V0V2l0aENvbnRlbnRJbnN0YW5jZSh3aSkpIHtcbiAgICBsZXQgY29udGVudDogQWpmV2lkZ2V0SW5zdGFuY2VbXSA9IFtdO1xuICAgIHdpZGdldC5jb250ZW50LmZvckVhY2goYyA9PiB7XG4gICAgICBpZiAod2lkZ2V0LnJlcGV0aXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgd2kucmVwZXRpdGlvbnMgPSBldmFsdWF0ZUV4cHJlc3Npb24od2lkZ2V0LnJlcGV0aXRpb25zLmZvcm11bGEsIGNvbnRleHQpO1xuICAgICAgICBpZiAodHlwZW9mIHdpLnJlcGV0aXRpb25zID09PSAnbnVtYmVyJyAmJiB3aS5yZXBldGl0aW9ucyA+IDApIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHdpLnJlcGV0aXRpb25zOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaCh3aWRnZXRUb1dpZGdldEluc3RhbmNlKGMsIHsuLi5jb250ZXh0LCAnJHJlcGV0aXRpb24nOiBpfSwgdHMsIHZhcmlhYmxlcykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudC5wdXNoKHdpZGdldFRvV2lkZ2V0SW5zdGFuY2UoYywgY29udGV4dCwgdHMsIHZhcmlhYmxlcykpO1xuICAgICAgfVxuICAgICAgd2kuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgfSk7XG4gICAgaWYgKGlzRGlhbG9nV2lkZ2V0KHdpZGdldCkgJiYgaXNEaWFsb2dXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICAgIHdpLnRvZ2dsZSA9IHdpZGdldFRvV2lkZ2V0SW5zdGFuY2Uod2lkZ2V0LnRvZ2dsZSwgY29udGV4dCwgdHMsIHZhcmlhYmxlcyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzQ2hhcnRXaWRnZXQod2lkZ2V0KSAmJiBpc0NoYXJ0V2lkZ2V0SW5zdGFuY2Uod2kpKSB7XG4gICAgaWYgKHdpZGdldC5vcHRpb25zID09IG51bGwpIHtcbiAgICAgIHdpZGdldC5vcHRpb25zID0ge307XG4gICAgfVxuICAgIGNvbnN0IGxhYmVscyA9IHdpZGdldC5sYWJlbHMgaW5zdGFuY2VvZiBBcnJheSA/IHdpZGdldC5sYWJlbHMgOiBbd2lkZ2V0LmxhYmVsc107XG4gICAgY29uc3QgZXZMYWJlbHMgPSBsYWJlbHMubWFwKGwgPT4ge1xuICAgICAgbGV0IGV2ZiA9IGV2YWx1YXRlRXhwcmVzc2lvbihsLmZvcm11bGEsIGNvbnRleHQpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGV2ZiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgZXZmID0gZXZmLm1hcCh2ID0+XG4gICAgICAgICAgICB2ICE9IG51bGwgJiYgdHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIHYudHJpbSgpLmxlbmd0aCA+IDAgPyB0cy50cmFuc2xhdGUodikgOiB2LFxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXZmID1cbiAgICAgICAgICAgIGV2ZiAhPSBudWxsICYmIHR5cGVvZiBldmYgPT09ICdzdHJpbmcnICYmIGV2Zi50cmltKCkubGVuZ3RoID4gMFxuICAgICAgICAgICAgICA/IHRzLnRyYW5zbGF0ZShldmYpXG4gICAgICAgICAgICAgIDogZXZmO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChfZSkge31cbiAgICAgIHJldHVybiBldmY7XG4gICAgfSk7XG4gICAgd2kubGFiZWxzID0gd2lkZ2V0LmxhYmVscyBpbnN0YW5jZW9mIEFycmF5ID8gZXZMYWJlbHMgOiBldkxhYmVsc1swXTtcbiAgICB3aS5kYXRhc2V0cyA9IHdpZGdldC5kYXRhc2V0Lm1hcChkID0+IHtcbiAgICAgIGxldCBkczogYW55ID0ge1xuICAgICAgICAuLi4oZC5vcHRpb25zIHx8IHt9KSxcbiAgICAgICAgZGF0YTogZXZhbHVhdGVBZ2dyZWdhdGlvbihkLmFnZ3JlZ2F0aW9uLCBkLmZvcm11bGEsIGNvbnRleHQpLFxuICAgICAgfTtcbiAgICAgIGlmIChkLmNoYXJ0VHlwZSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGN0ID0gY2hhcnRUb0NoYXJ0SnNUeXBlKGQuY2hhcnRUeXBlKTtcbiAgICAgICAgZHMgPSB7Li4uZHMsIGNoYXJ0VHlwZTogY3QsIHR5cGU6IGN0fTtcbiAgICAgIH1cbiAgICAgIGlmIChkLm9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBkcyA9IHsuLi5kcywgb3B0aW9uczogZC5vcHRpb25zfTtcbiAgICAgIH1cbiAgICAgIGlmIChkLmxhYmVsICE9IG51bGwpIHtcbiAgICAgICAgZHMgPSB7Li4uZHMsIGxhYmVsOiBkLmxhYmVsLnRyaW0oKS5sZW5ndGggPiAwID8gdHMudHJhbnNsYXRlKGQubGFiZWwpIDogZC5sYWJlbH07XG4gICAgICB9XG4gICAgICBpZiAoZC5kYXRhbGFiZWxzICE9IG51bGwpIHtcbiAgICAgICAgZHMuZGF0YWxhYmVscyA9IGRlZXBDb3B5KGQuZGF0YWxhYmVscyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZHM7XG4gICAgfSk7XG4gICAgd2kuZGF0YSA9IHtsYWJlbHM6IHdpLmxhYmVscywgZGF0YXNldHM6IHdpLmRhdGFzZXRzfTtcbiAgICB3aS5jaGFydFR5cGUgPSBjaGFydFRvQ2hhcnRKc1R5cGUod2lkZ2V0LnR5cGUgfHwgd2lkZ2V0LmNoYXJ0VHlwZSk7XG4gICAgd2kuZXhwb3J0YWJsZSA9XG4gICAgICB3aWRnZXQuZXhwb3J0YWJsZSAmJiAod2lkZ2V0LmV4cG9ydGFibGUgPT09IHRydWUgfHwgd2lkZ2V0LmV4cG9ydGFibGUgPT09ICd0cnVlJylcbiAgICAgICAgPyB0cnVlXG4gICAgICAgIDogZmFsc2U7XG4gICAgaWYgKHdpZGdldC5vcHRpb25zICE9IG51bGwgJiYgd2lkZ2V0Lm9wdGlvbnMucGx1Z2lucyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBwbHVnaW5zID0gd2lkZ2V0Lm9wdGlvbnMucGx1Z2lucztcbiAgICAgIGNvbnN0IHBsdWdpbk5hbWVzID0gT2JqZWN0LmtleXMocGx1Z2lucyk7XG4gICAgICBwbHVnaW5OYW1lcy5mb3JFYWNoKHBsdWdpbk5hbWUgPT4ge1xuICAgICAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5zW3BsdWdpbk5hbWVdO1xuICAgICAgICBjb25zdCBwbHVnaW5PcHRpb25zID0gT2JqZWN0LmtleXMocGx1Z2luKTtcbiAgICAgICAgcGx1Z2luT3B0aW9ucy5mb3JFYWNoKChwbHVnaW5PcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBwbHVnaW5PcHRpb24gPSBwbHVnaW5bcGx1Z2luT3B0aW9uTmFtZV07XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHBsdWdpbk9wdGlvbiAhPT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgIHBsdWdpbk9wdGlvbiAhPSBudWxsICYmXG4gICAgICAgICAgICBwbHVnaW5PcHRpb24uZm9ybXVsYSAhPSBudWxsXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwbHVnaW5bcGx1Z2luT3B0aW9uTmFtZV0gPSBldmFsdWF0ZUV4cHJlc3Npb24ocGx1Z2luT3B0aW9uLmZvcm11bGEsIGNvbnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAoaXNUYWJsZVdpZGdldCh3aWRnZXQpICYmIGlzVGFibGVXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICB3aS5kYXRhc2V0ID0gd2lkZ2V0LmRhdGFzZXQubWFwKHJvdyA9PlxuICAgICAgcm93Lm1hcChjZWxsID0+IHtcbiAgICAgICAgcmV0dXJuIGNlbGwuZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgPyBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYsIGNvbnRleHQsIHRzKSlcbiAgICAgICAgICA6IHRyRm9ybXVsYShjZWxsLmZvcm11bGEhLCBjb250ZXh0LCB0cyk7XG4gICAgICB9KSxcbiAgICApO1xuICAgIHdpLmV4cG9ydGFibGUgPVxuICAgICAgd2lkZ2V0LmV4cG9ydGFibGUgJiYgKHdpZGdldC5leHBvcnRhYmxlID09PSB0cnVlIHx8IHdpZGdldC5leHBvcnRhYmxlID09PSAndHJ1ZScpXG4gICAgICAgID8gdHJ1ZVxuICAgICAgICA6IGZhbHNlO1xuICAgIHdpLmRhdGEgPSAod2lkZ2V0LmRhdGFzZXQgfHwgW10pLm1hcChyb3cgPT5cbiAgICAgIHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGxldCBldmYgPSAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBldmYgPVxuICAgICAgICAgICAgY2VsbC5mb3JtdWxhIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICAgICAgPyBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYsIGNvbnRleHQsIHRzKSlcbiAgICAgICAgICAgICAgOiB0ckZvcm11bGEoY2VsbC5mb3JtdWxhISwgY29udGV4dCwgdHMpO1xuICAgICAgICB9IGNhdGNoIChfZSkge31cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB2YWx1ZTogZXZmLFxuICAgICAgICAgIHN0eWxlOiB7Li4ud2lkZ2V0LmNlbGxTdHlsZXMsIC4uLmNlbGwuc3R5bGV9LFxuICAgICAgICAgIHJvd3NwYW46IGNlbGwucm93c3BhbixcbiAgICAgICAgICBjb2xzcGFuOiBjZWxsLmNvbHNwYW4sXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIChpc0R5bmFtaWNUYWJsZVdpZGdldCh3aWRnZXQpICYmIGlzRHluYW1pY1RhYmxlV2lkZ2V0SW5zdGFuY2Uod2kpKSB8fFxuICAgIChpc1BhZ2luYXRlZFRhYmxlV2lkZ2V0KHdpZGdldCkgJiYgaXNQYWdpbmF0ZWRUYWJsZVdpZGdldEluc3RhbmNlKHdpKSlcbiAgKSB7XG4gICAgd2kuZGF0YXNldCA9IHdpZGdldC5kYXRhc2V0Lm1hcCgoY2VsbDogQWpmVGFibGVEYXRhc2V0KSA9PiB7XG4gICAgICByZXR1cm4gY2VsbC5mb3JtdWxhIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgPyBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYsIGNvbnRleHQsIHRzKSlcbiAgICAgICAgOiB0ckZvcm11bGEoY2VsbC5mb3JtdWxhISwgY29udGV4dCwgdHMpO1xuICAgIH0pO1xuICAgIHdpLmV4cG9ydGFibGUgPVxuICAgICAgd2lkZ2V0LmV4cG9ydGFibGUgJiYgKHdpZGdldC5leHBvcnRhYmxlID09PSB0cnVlIHx8IHdpZGdldC5leHBvcnRhYmxlID09PSAndHJ1ZScpXG4gICAgICAgID8gdHJ1ZVxuICAgICAgICA6IGZhbHNlO1xuXG4gICAgbGV0IGRhdGFzZXQ6IEFqZlRhYmxlQ2VsbFtdW10gPSBldmFsdWF0ZUV4cHJlc3Npb24od2lkZ2V0LnJvd0RlZmluaXRpb24uZm9ybXVsYSwgY29udGV4dCkgfHwgW107XG4gICAgZGF0YXNldCA9IChkYXRhc2V0IHx8IFtdKS5tYXAoKHJvdzogQWpmVGFibGVDZWxsW10pID0+XG4gICAgICByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgICBsZXQgdHJmID0gY2VsbC52YWx1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodHJmIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHRyZiA9IHRyZi5tYXAodiA9PlxuICAgICAgICAgICAgICB2ICE9IG51bGwgJiYgdHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIHYudHJpbSgpLmxlbmd0aCA+IDAgPyB0cy50cmFuc2xhdGUodikgOiB2LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJmID1cbiAgICAgICAgICAgICAgdHJmICE9IG51bGwgJiYgdHlwZW9mIHRyZiA9PT0gJ3N0cmluZycgJiYgdHJmLnRyaW0oKS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgPyB0cy50cmFuc2xhdGUodHJmKVxuICAgICAgICAgICAgICAgIDogdHJmO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoX2UpIHt9XG4gICAgICAgIHJldHVybiB7Li4uY2VsbCwgdmFsdWU6IHRyZn07XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgY29uc3QgaGVhZGVyID0gKHdpZGdldC5kYXRhc2V0IHx8IFtdKS5tYXAoY2VsbCA9PiB7XG4gICAgICBsZXQgZXZmID0gJyc7XG4gICAgICB0cnkge1xuICAgICAgICBldmYgPVxuICAgICAgICAgIGNlbGwuZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICA/IGNlbGwuZm9ybXVsYS5tYXAoZiA9PiB0ckZvcm11bGEoZiwgY29udGV4dCwgdHMpKVxuICAgICAgICAgICAgOiB0ckZvcm11bGEoY2VsbC5mb3JtdWxhLCBjb250ZXh0LCB0cyk7XG4gICAgICB9IGNhdGNoIChfZSkge31cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBldmYsXG4gICAgICAgIHN0eWxlOiB7Li4ud2lkZ2V0LmNlbGxTdHlsZXMsIC4uLmNlbGwuc3R5bGV9LFxuICAgICAgICByb3dzcGFuOiBjZWxsLnJvd3NwYW4sXG4gICAgICAgIGNvbHNwYW46IGNlbGwuY29sc3BhbixcbiAgICAgIH07XG4gICAgfSk7XG4gICAgd2kuZGF0YSA9IGhlYWRlci5sZW5ndGggPT09IDAgPyBbLi4uZGF0YXNldF0gOiBbWy4uLmhlYWRlcl0sIC4uLmRhdGFzZXRdO1xuICAgIHdpLnN0eWxlcyA9IHsuLi53aS5zdHlsZXMsIGFsaWduSXRlbXM6ICdmbGV4LXN0YXJ0J307XG4gIH0gZWxzZSBpZiAoaXNQYWdpbmF0ZWRMaXN0V2lkZ2V0KHdpZGdldCkgJiYgaXNQYWdpbmF0ZWRMaXN0V2lkZ2V0SW5zdGFuY2Uod2kpKSB7XG4gICAgbGV0IGNvbnRlbnQ6IEFqZldpZGdldEluc3RhbmNlW10gPSBbXTtcbiAgICBpZiAod2lkZ2V0LmNvbnRlbnREZWZpbml0aW9uKSB7XG4gICAgICBsZXQgY29udGVudERlZmluaXRpb246IEFqZldpZGdldFtdID1cbiAgICAgICAgZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC5jb250ZW50RGVmaW5pdGlvbi5mb3JtdWxhLCBjb250ZXh0KSB8fCBbXTtcbiAgICAgIGNvbnRlbnREZWZpbml0aW9uLmZvckVhY2goYyA9PiB7XG4gICAgICAgIGNvbnRlbnQucHVzaCh3aWRnZXRUb1dpZGdldEluc3RhbmNlKGMsIGNvbnRleHQsIHRzLCB2YXJpYWJsZXMpKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAod2lkZ2V0LmNvbnRlbnQpIHtcbiAgICAgIHdpZGdldC5jb250ZW50LmZvckVhY2goYyA9PiB7XG4gICAgICAgIGNvbnRlbnQucHVzaCh3aWRnZXRUb1dpZGdldEluc3RhbmNlKGMsIGNvbnRleHQsIHRzLCB2YXJpYWJsZXMpKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgICB3aS5jb250ZW50ID0gY29udGVudDtcbiAgfSBlbHNlIGlmIChpc0ltYWdlV2lkZ2V0KHdpZGdldCkgJiYgaXNJbWFnZVdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIGlmICh3aWRnZXQuZmxhZykge1xuICAgICAgd2kuZmxhZyA9IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuZmxhZy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKHdpZGdldC5pY29uKSB7XG4gICAgICB3aS5pY29uID0gZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC5pY29uLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgICBpZiAod2lkZ2V0LnVybCkge1xuICAgICAgd2kudXJsID0gZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC51cmwuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzSW1hZ2VDb250YWluZXJXaWRnZXQod2lkZ2V0KSAmJiBpc0ltYWdlQ29udGFpbmVyV2lkZ2V0SW5zdGFuY2Uod2kpKSB7XG4gICAgaWYgKHdpZGdldC5mbGFncykge1xuICAgICAgd2kuZmxhZ3MgPVxuICAgICAgICB3aWRnZXQuZmxhZ3MgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgID8gd2lkZ2V0LmZsYWdzLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKVxuICAgICAgICAgIDogZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC5mbGFncy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKHdpZGdldC5pY29ucykge1xuICAgICAgd2kuaWNvbnMgPVxuICAgICAgICB3aWRnZXQuaWNvbnMgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgID8gd2lkZ2V0Lmljb25zLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKVxuICAgICAgICAgIDogZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC5pY29ucy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKHdpZGdldC51cmxzKSB7XG4gICAgICB3aS51cmxzID1cbiAgICAgICAgd2lkZ2V0LnVybHMgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgID8gd2lkZ2V0LnVybHMubWFwKGYgPT4gZXZhbHVhdGVFeHByZXNzaW9uKGYuZm9ybXVsYSwgY29udGV4dCkpXG4gICAgICAgICAgOiBldmFsdWF0ZUV4cHJlc3Npb24od2lkZ2V0LnVybHMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzVGV4dFdpZGdldCh3aWRnZXQpICYmIGlzVGV4dFdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIHdpLmh0bWxUZXh0ID0gZXZhbHVhdGVQcm9wZXJ0eSh3aWRnZXQuaHRtbFRleHQsIGNvbnRleHQsIHRzKTtcbiAgfSBlbHNlIGlmIChpc0Zvcm11bGFXaWRnZXQod2lkZ2V0KSAmJiBpc0Zvcm11bGFXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICB3aS5mb3JtdWxhID0gZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC5mb3JtdWxhLmZvcm11bGEsIGNvbnRleHQpO1xuICB9IGVsc2UgaWYgKGlzTWFwV2lkZ2V0KHdpZGdldCkgJiYgaXNNYXBXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICB3aS5jb29yZGluYXRlID0gZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC5jb29yZGluYXRlLmZvcm11bGEsIGNvbnRleHQpO1xuICB9IGVsc2UgaWYgKGlzR3JhcGhXaWRnZXQod2lkZ2V0KSAmJiBpc0dyYXBoV2lkZ2V0SW5zdGFuY2Uod2kpKSB7XG4gICAgaWYgKHdpZGdldC5ub2RlcyAhPSBudWxsKSB7XG4gICAgICB3aS5ub2RlcyA9IHdpZGdldC5ub2Rlcy5tYXAoZHMgPT4ge1xuICAgICAgICBsZXQgbm9kZTogYW55ID0ge1xuICAgICAgICAgIC4uLmRzLFxuICAgICAgICB9O1xuICAgICAgICBub2RlLmxhYmVsID0gZHMubGFiZWwgIT0gbnVsbCA/IGV2YWx1YXRlUHJvcGVydHkoZHMubGFiZWwsIGNvbnRleHQsIHRzKSA6IGRzLmlkO1xuICAgICAgICBub2RlLnJlZCA9IGV2YWx1YXRlRXhwcmVzc2lvbihkcy5yZWQsIGNvbnRleHQpO1xuICAgICAgICBub2RlLnllbGxvdyA9IGV2YWx1YXRlRXhwcmVzc2lvbihkcy55ZWxsb3csIGNvbnRleHQpO1xuICAgICAgICBub2RlLmdyZWVuID0gZXZhbHVhdGVFeHByZXNzaW9uKGRzLmdyZWVuLCBjb250ZXh0KTtcbiAgICAgICAgbm9kZS5jb2xvciA9IGRzLmNvbG9yID8gZXZhbHVhdGVFeHByZXNzaW9uKGRzLmNvbG9yLCBjb250ZXh0KSA6IHVuZGVmaW5lZDtcbiAgICAgICAgcmV0dXJuIG5vZGUgYXMgQWpmR3JhcGhOb2RlO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzSGVhdE1hcFdpZGdldCh3aWRnZXQpICYmIGlzSGVhdE1hcFdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIHdpLmlkUHJvcCA9IHdpZGdldC5pZFByb3AgfHwgJ2lkJztcbiAgICB3aS5mZWF0dXJlcyA9ICh0eXBlb2Ygd2lkZ2V0LmZlYXR1cmVzID09PSAnc3RyaW5nJ1xuICAgICAgPyBKU09OLnBhcnNlKHdpZGdldC5mZWF0dXJlcylcbiAgICAgIDogd2lkZ2V0LmZlYXR1cmVzKSB8fCB7dHlwZTogJ0ZlYXR1cmVDb2xsZWN0aW9uJywgZmVhdHVyZXM6IFtdfTtcbiAgICB3aS52YWx1ZXMgPSBldmFsdWF0ZUV4cHJlc3Npb24od2lkZ2V0LnZhbHVlcy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB3aS5zdGFydENvbG9yID0gd2lkZ2V0LnN0YXJ0Q29sb3IgfHwgJyNmZmViM2InO1xuICAgIHdpLmVuZENvbG9yID0gd2lkZ2V0LmVuZENvbG9yIHx8ICcjZjQ0MzM2JztcbiAgICB3aS5oaWdobGlnaHRDb2xvciA9IHdpZGdldC5oaWdobGlnaHRDb2xvciB8fCAnIzAwOTY4OCc7XG4gICAgd2kuc2hvd1Zpc3VhbE1hcCA9IHdpZGdldC5zaG93VmlzdWFsTWFwID09PSB0cnVlO1xuICAgIGlmICh3aWRnZXQuYWN0aW9uKSB7XG4gICAgICB3aS5hY3Rpb24gPSB3aWRnZXQuYWN0aW9uO1xuICAgIH1cbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA+IDEwMCkge1xuICAgIGNvbnN0IGlpRm4gPVxuICAgICAgY29tcG9uZW50c01hcFt3aWRnZXQud2lkZ2V0VHlwZV0gIT0gbnVsbFxuICAgICAgICA/IGNvbXBvbmVudHNNYXBbd2lkZ2V0LndpZGdldFR5cGVdLmluaXRJbnN0YW5jZVxuICAgICAgICA6IG51bGw7XG4gICAgaWYgKGlpRm4gIT0gbnVsbCkge1xuICAgICAgcmV0dXJuIGlpRm4od2ksIGNvbnRleHQsIHRzKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHdpO1xufVxuIl19