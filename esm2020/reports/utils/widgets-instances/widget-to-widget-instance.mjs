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
import { isWidgetWithContent } from '../widgets/is-widget-with-content';
import { isTableWidget } from '../widgets/is-table-widget';
import { isTextWidget } from '../widgets/is-text-widget';
import { isPaginatedListWidget } from '../widgets/is-paginated-list-widget';
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
import { isTableWidgetInstance } from '../widgets-instances/is-table-widget-instance';
import { isTextWidgetInstance } from '../widgets-instances/is-text-widget-instance';
import { isWidgetWithContentInstance } from '../widgets-instances/is-widget-with-content-instance';
import { isPaginatedListWidgetInstance } from '../widgets-instances/is-paginated-list-widget-instance';
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
    else if (isDynamicTableWidget(widget) && isDynamicTableWidgetInstance(wi)) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQWEsa0JBQWtCLEVBQUMsTUFBTSxrQkFBa0IsQ0FBQztBQUdoRSxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekMsT0FBTyxFQUFDLGtCQUFrQixFQUFDLE1BQU0sbUJBQW1CLENBQUM7QUFLckQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0scUNBQXFDLENBQUM7QUFDeEUsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxjQUFjLEVBQUMsTUFBTSw2QkFBNkIsQ0FBQztBQUMzRCxPQUFPLEVBQUMsb0JBQW9CLEVBQUMsTUFBTSxvQ0FBb0MsQ0FBQztBQUN4RSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFDN0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBQyxlQUFlLEVBQUMsTUFBTSwrQkFBK0IsQ0FBQztBQUM5RCxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSxzQ0FBc0MsQ0FBQztBQUM1RSxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQ3JELE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLG1DQUFtQyxDQUFDO0FBQ3RFLE9BQU8sRUFBQyxhQUFhLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLEVB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Q0FBQyxVQUFVLElBQUksU0FBUyxDQUFDO1FBQy9DLEVBQUUsQ0FBQyxRQUFRLEdBQUcsTUFBTSxDQUFDLFFBQVEsSUFBSSxTQUFTLENBQUM7UUFDM0MsRUFBRSxDQUFDLGNBQWMsR0FBRyxNQUFNLENBQUMsY0FBYyxJQUFJLFNBQVMsQ0FBQztRQUN2RCxFQUFFLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxhQUFhLEtBQUssSUFBSSxDQUFDO1FBQ2pELElBQUksTUFBTSxDQUFDLE1BQU0sRUFBRTtZQUNqQixFQUFFLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUM7U0FDM0I7S0FDRjtTQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsR0FBRyxHQUFHLEVBQUU7UUFDbEMsTUFBTSxJQUFJLEdBQ1IsYUFBYSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJO1lBQ3RDLENBQUMsQ0FBQyxhQUFhLENBQUMsTUFBTSxDQUFDLFVBQVUsQ0FBQyxDQUFDLFlBQVk7WUFDL0MsQ0FBQyxDQUFDLElBQUksQ0FBQztRQUNYLElBQUksSUFBSSxJQUFJLElBQUksRUFBRTtZQUNoQixPQUFPLElBQUksQ0FBQyxFQUFFLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1NBQzlCO0tBQ0Y7SUFDRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7QWpmVGFibGVDZWxsfSBmcm9tICdAYWpmL2NvcmUvdGFibGUnO1xuaW1wb3J0IHtUcmFuc2xvY29TZXJ2aWNlfSBmcm9tICdAYWpmL2NvcmUvdHJhbnNsb2NvJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5cbmltcG9ydCB7Y2hhcnRUb0NoYXJ0SnNUeXBlfSBmcm9tICcuLi8uLi9jaGFydC11dGlscyc7XG5pbXBvcnQge0FqZlRhYmxlRGF0YXNldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2RhdGFzZXQvdGFibGUtZGF0YXNldCc7XG5pbXBvcnQge0FqZlJlcG9ydFZhcmlhYmxlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtdmFyaWFibGUnO1xuaW1wb3J0IHtBamZXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7ZXZhbHVhdGVBZ2dyZWdhdGlvbn0gZnJvbSAnLi4vYWdncmVnYXRpb24vZXZhbHVhdGUtYWdncmVnYXRpb24nO1xuaW1wb3J0IHtpc0NoYXJ0V2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLWNoYXJ0LXdpZGdldCc7XG5pbXBvcnQge2lzRGlhbG9nV2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLWRpYWxvZy13aWRnZXQnO1xuaW1wb3J0IHtpc0R5bmFtaWNUYWJsZVdpZGdldH0gZnJvbSAnLi4vd2lkZ2V0cy9pcy1keW5hbWljLXRhYmxlLXdpZGdldCc7XG5pbXBvcnQge2lzRm9ybXVsYVdpZGdldH0gZnJvbSAnLi4vd2lkZ2V0cy9pcy1mb3JtdWxhLXdpZGdldCc7XG5pbXBvcnQge2lzR3JhcGhXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtZ3JhcGgtd2lkZ2V0JztcbmltcG9ydCB7aXNIZWF0TWFwV2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLWhlYXQtbWFwLXdpZGdldCc7XG5pbXBvcnQge2lzSW1hZ2VDb250YWluZXJXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtaW1hZ2UtY29udGFpbmVyLXdpZGdldCc7XG5pbXBvcnQge2lzSW1hZ2VXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtaW1hZ2Utd2lkZ2V0JztcbmltcG9ydCB7aXNNYXBXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtbWFwLXdpZGdldCc7XG5pbXBvcnQge2lzV2lkZ2V0V2l0aENvbnRlbnR9IGZyb20gJy4uL3dpZGdldHMvaXMtd2lkZ2V0LXdpdGgtY29udGVudCc7XG5pbXBvcnQge2lzVGFibGVXaWRnZXR9IGZyb20gJy4uL3dpZGdldHMvaXMtdGFibGUtd2lkZ2V0JztcbmltcG9ydCB7aXNUZXh0V2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLXRleHQtd2lkZ2V0JztcbmltcG9ydCB7aXNQYWdpbmF0ZWRMaXN0V2lkZ2V0fSBmcm9tICcuLi93aWRnZXRzL2lzLXBhZ2luYXRlZC1saXN0LXdpZGdldCc7XG5pbXBvcnQge2NvbXBvbmVudHNNYXB9IGZyb20gJy4uL3dpZGdldHMvd2lkZ2V0cy1tYXAnO1xuaW1wb3J0IHtpc0NoYXJ0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLWNoYXJ0LXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRGlhbG9nV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLWRpYWxvZy13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtpc0R5bmFtaWNUYWJsZVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy1keW5hbWljLXRhYmxlLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzRm9ybXVsYVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy1mb3JtdWxhLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzR3JhcGhXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtZ3JhcGgtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNIZWF0TWFwV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLWhlYXQtbWFwLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzSW1hZ2VDb250YWluZXJXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtaW1hZ2UtY29udGFpbmVyLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzSW1hZ2VXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtaW1hZ2Utd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNNYXBXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtbWFwLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2lzVGFibGVXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vd2lkZ2V0cy1pbnN0YW5jZXMvaXMtdGFibGUtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNUZXh0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLXRleHQtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7aXNXaWRnZXRXaXRoQ29udGVudEluc3RhbmNlfSBmcm9tICcuLi93aWRnZXRzLWluc3RhbmNlcy9pcy13aWRnZXQtd2l0aC1jb250ZW50LWluc3RhbmNlJztcbmltcG9ydCB7aXNQYWdpbmF0ZWRMaXN0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uL3dpZGdldHMtaW5zdGFuY2VzL2lzLXBhZ2luYXRlZC1saXN0LXdpZGdldC1pbnN0YW5jZSc7XG5cbmltcG9ydCB7Y3JlYXRlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4vY3JlYXRlLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge2V2YWx1YXRlUHJvcGVydHksIHRyRm9ybXVsYX0gZnJvbSAnLi93aWRnZXQtaW5zdGFuY2UtdXRpbHMnO1xuaW1wb3J0IHtBamZHcmFwaE5vZGV9IGZyb20gJ0BhamYvY29yZS9ncmFwaCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3aWRnZXRUb1dpZGdldEluc3RhbmNlKFxuICB3aWRnZXQ6IEFqZldpZGdldCxcbiAgY29udGV4dDogQWpmQ29udGV4dCxcbiAgdHM6IFRyYW5zbG9jb1NlcnZpY2UsXG4gIHZhcmlhYmxlczogQWpmUmVwb3J0VmFyaWFibGVbXSA9IFtdLFxuKTogQWpmV2lkZ2V0SW5zdGFuY2Uge1xuICBjb25zdCB3aSA9IGNyZWF0ZVdpZGdldEluc3RhbmNlKHdpZGdldCwgY29udGV4dCwgdHMsIHZhcmlhYmxlcyk7XG5cbiAgaWYgKGlzV2lkZ2V0V2l0aENvbnRlbnQod2lkZ2V0KSAmJiBpc1dpZGdldFdpdGhDb250ZW50SW5zdGFuY2Uod2kpKSB7XG4gICAgbGV0IGNvbnRlbnQ6IEFqZldpZGdldEluc3RhbmNlW10gPSBbXTtcbiAgICB3aWRnZXQuY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgaWYgKHdpZGdldC5yZXBldGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIHdpLnJlcGV0aXRpb25zID0gZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC5yZXBldGl0aW9ucy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHR5cGVvZiB3aS5yZXBldGl0aW9ucyA9PT0gJ251bWJlcicgJiYgd2kucmVwZXRpdGlvbnMgPiAwKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3aS5yZXBldGl0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2god2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCB7Li4uY29udGV4dCwgJyRyZXBldGl0aW9uJzogaX0sIHRzLCB2YXJpYWJsZXMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQucHVzaCh3aWRnZXRUb1dpZGdldEluc3RhbmNlKGMsIGNvbnRleHQsIHRzLCB2YXJpYWJsZXMpKTtcbiAgICAgIH1cbiAgICAgIHdpLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIH0pO1xuICAgIGlmIChpc0RpYWxvZ1dpZGdldCh3aWRnZXQpICYmIGlzRGlhbG9nV2lkZ2V0SW5zdGFuY2Uod2kpKSB7XG4gICAgICB3aS50b2dnbGUgPSB3aWRnZXRUb1dpZGdldEluc3RhbmNlKHdpZGdldC50b2dnbGUsIGNvbnRleHQsIHRzLCB2YXJpYWJsZXMpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0NoYXJ0V2lkZ2V0KHdpZGdldCkgJiYgaXNDaGFydFdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIGlmICh3aWRnZXQub3B0aW9ucyA9PSBudWxsKSB7XG4gICAgICB3aWRnZXQub3B0aW9ucyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBsYWJlbHMgPSB3aWRnZXQubGFiZWxzIGluc3RhbmNlb2YgQXJyYXkgPyB3aWRnZXQubGFiZWxzIDogW3dpZGdldC5sYWJlbHNdO1xuICAgIGNvbnN0IGV2TGFiZWxzID0gbGFiZWxzLm1hcChsID0+IHtcbiAgICAgIGxldCBldmYgPSBldmFsdWF0ZUV4cHJlc3Npb24obC5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChldmYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGV2ZiA9IGV2Zi5tYXAodiA9PlxuICAgICAgICAgICAgdiAhPSBudWxsICYmIHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2LnRyaW0oKS5sZW5ndGggPiAwID8gdHMudHJhbnNsYXRlKHYpIDogdixcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZiA9XG4gICAgICAgICAgICBldmYgIT0gbnVsbCAmJiB0eXBlb2YgZXZmID09PSAnc3RyaW5nJyAmJiBldmYudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgICAgPyB0cy50cmFuc2xhdGUoZXZmKVxuICAgICAgICAgICAgICA6IGV2ZjtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoX2UpIHt9XG4gICAgICByZXR1cm4gZXZmO1xuICAgIH0pO1xuICAgIHdpLmxhYmVscyA9IHdpZGdldC5sYWJlbHMgaW5zdGFuY2VvZiBBcnJheSA/IGV2TGFiZWxzIDogZXZMYWJlbHNbMF07XG4gICAgd2kuZGF0YXNldHMgPSB3aWRnZXQuZGF0YXNldC5tYXAoZCA9PiB7XG4gICAgICBsZXQgZHM6IGFueSA9IHtcbiAgICAgICAgLi4uKGQub3B0aW9ucyB8fCB7fSksXG4gICAgICAgIGRhdGE6IGV2YWx1YXRlQWdncmVnYXRpb24oZC5hZ2dyZWdhdGlvbiwgZC5mb3JtdWxhLCBjb250ZXh0KSxcbiAgICAgIH07XG4gICAgICBpZiAoZC5jaGFydFR5cGUgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjdCA9IGNoYXJ0VG9DaGFydEpzVHlwZShkLmNoYXJ0VHlwZSk7XG4gICAgICAgIGRzID0gey4uLmRzLCBjaGFydFR5cGU6IGN0LCB0eXBlOiBjdH07XG4gICAgICB9XG4gICAgICBpZiAoZC5vcHRpb25zICE9IG51bGwpIHtcbiAgICAgICAgZHMgPSB7Li4uZHMsIG9wdGlvbnM6IGQub3B0aW9uc307XG4gICAgICB9XG4gICAgICBpZiAoZC5sYWJlbCAhPSBudWxsKSB7XG4gICAgICAgIGRzID0gey4uLmRzLCBsYWJlbDogZC5sYWJlbC50cmltKCkubGVuZ3RoID4gMCA/IHRzLnRyYW5zbGF0ZShkLmxhYmVsKSA6IGQubGFiZWx9O1xuICAgICAgfVxuICAgICAgaWYgKGQuZGF0YWxhYmVscyAhPSBudWxsKSB7XG4gICAgICAgIGRzLmRhdGFsYWJlbHMgPSBkZWVwQ29weShkLmRhdGFsYWJlbHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRzO1xuICAgIH0pO1xuICAgIHdpLmRhdGEgPSB7bGFiZWxzOiB3aS5sYWJlbHMsIGRhdGFzZXRzOiB3aS5kYXRhc2V0c307XG4gICAgd2kuY2hhcnRUeXBlID0gY2hhcnRUb0NoYXJ0SnNUeXBlKHdpZGdldC50eXBlIHx8IHdpZGdldC5jaGFydFR5cGUpO1xuICAgIHdpLmV4cG9ydGFibGUgPVxuICAgICAgd2lkZ2V0LmV4cG9ydGFibGUgJiYgKHdpZGdldC5leHBvcnRhYmxlID09PSB0cnVlIHx8IHdpZGdldC5leHBvcnRhYmxlID09PSAndHJ1ZScpXG4gICAgICAgID8gdHJ1ZVxuICAgICAgICA6IGZhbHNlO1xuICAgIGlmICh3aWRnZXQub3B0aW9ucyAhPSBudWxsICYmIHdpZGdldC5vcHRpb25zLnBsdWdpbnMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgcGx1Z2lucyA9IHdpZGdldC5vcHRpb25zLnBsdWdpbnM7XG4gICAgICBjb25zdCBwbHVnaW5OYW1lcyA9IE9iamVjdC5rZXlzKHBsdWdpbnMpO1xuICAgICAgcGx1Z2luTmFtZXMuZm9yRWFjaChwbHVnaW5OYW1lID0+IHtcbiAgICAgICAgY29uc3QgcGx1Z2luID0gcGx1Z2luc1twbHVnaW5OYW1lXTtcbiAgICAgICAgY29uc3QgcGx1Z2luT3B0aW9ucyA9IE9iamVjdC5rZXlzKHBsdWdpbik7XG4gICAgICAgIHBsdWdpbk9wdGlvbnMuZm9yRWFjaCgocGx1Z2luT3B0aW9uTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGx1Z2luT3B0aW9uID0gcGx1Z2luW3BsdWdpbk9wdGlvbk5hbWVdO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBwbHVnaW5PcHRpb24gIT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICBwbHVnaW5PcHRpb24gIT0gbnVsbCAmJlxuICAgICAgICAgICAgcGx1Z2luT3B0aW9uLmZvcm11bGEgIT0gbnVsbFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcGx1Z2luW3BsdWdpbk9wdGlvbk5hbWVdID0gZXZhbHVhdGVFeHByZXNzaW9uKHBsdWdpbk9wdGlvbi5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzVGFibGVXaWRnZXQod2lkZ2V0KSAmJiBpc1RhYmxlV2lkZ2V0SW5zdGFuY2Uod2kpKSB7XG4gICAgd2kuZGF0YXNldCA9IHdpZGdldC5kYXRhc2V0Lm1hcChyb3cgPT5cbiAgICAgIHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgIHJldHVybiBjZWxsLmZvcm11bGEgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICAgID8gY2VsbC5mb3JtdWxhLm1hcChmID0+IHRyRm9ybXVsYShmLCBjb250ZXh0LCB0cykpXG4gICAgICAgICAgOiB0ckZvcm11bGEoY2VsbC5mb3JtdWxhISwgY29udGV4dCwgdHMpO1xuICAgICAgfSksXG4gICAgKTtcbiAgICB3aS5leHBvcnRhYmxlID1cbiAgICAgIHdpZGdldC5leHBvcnRhYmxlICYmICh3aWRnZXQuZXhwb3J0YWJsZSA9PT0gdHJ1ZSB8fCB3aWRnZXQuZXhwb3J0YWJsZSA9PT0gJ3RydWUnKVxuICAgICAgICA/IHRydWVcbiAgICAgICAgOiBmYWxzZTtcbiAgICB3aS5kYXRhID0gKHdpZGdldC5kYXRhc2V0IHx8IFtdKS5tYXAocm93ID0+XG4gICAgICByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgICBsZXQgZXZmID0gJyc7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgZXZmID1cbiAgICAgICAgICAgIGNlbGwuZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICAgID8gY2VsbC5mb3JtdWxhLm1hcChmID0+IHRyRm9ybXVsYShmLCBjb250ZXh0LCB0cykpXG4gICAgICAgICAgICAgIDogdHJGb3JtdWxhKGNlbGwuZm9ybXVsYSEsIGNvbnRleHQsIHRzKTtcbiAgICAgICAgfSBjYXRjaCAoX2UpIHt9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdmFsdWU6IGV2ZixcbiAgICAgICAgICBzdHlsZTogey4uLndpZGdldC5jZWxsU3R5bGVzLCAuLi5jZWxsLnN0eWxlfSxcbiAgICAgICAgICByb3dzcGFuOiBjZWxsLnJvd3NwYW4sXG4gICAgICAgICAgY29sc3BhbjogY2VsbC5jb2xzcGFuLFxuICAgICAgICB9O1xuICAgICAgfSksXG4gICAgKTtcbiAgfSBlbHNlIGlmIChpc0R5bmFtaWNUYWJsZVdpZGdldCh3aWRnZXQpICYmIGlzRHluYW1pY1RhYmxlV2lkZ2V0SW5zdGFuY2Uod2kpKSB7XG4gICAgd2kuZGF0YXNldCA9IHdpZGdldC5kYXRhc2V0Lm1hcCgoY2VsbDogQWpmVGFibGVEYXRhc2V0KSA9PiB7XG4gICAgICByZXR1cm4gY2VsbC5mb3JtdWxhIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgPyBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYsIGNvbnRleHQsIHRzKSlcbiAgICAgICAgOiB0ckZvcm11bGEoY2VsbC5mb3JtdWxhISwgY29udGV4dCwgdHMpO1xuICAgIH0pO1xuICAgIHdpLmV4cG9ydGFibGUgPVxuICAgICAgd2lkZ2V0LmV4cG9ydGFibGUgJiYgKHdpZGdldC5leHBvcnRhYmxlID09PSB0cnVlIHx8IHdpZGdldC5leHBvcnRhYmxlID09PSAndHJ1ZScpXG4gICAgICAgID8gdHJ1ZVxuICAgICAgICA6IGZhbHNlO1xuXG4gICAgbGV0IGRhdGFzZXQ6IEFqZlRhYmxlQ2VsbFtdW10gPSBldmFsdWF0ZUV4cHJlc3Npb24od2lkZ2V0LnJvd0RlZmluaXRpb24uZm9ybXVsYSwgY29udGV4dCkgfHwgW107XG4gICAgZGF0YXNldCA9IChkYXRhc2V0IHx8IFtdKS5tYXAoKHJvdzogQWpmVGFibGVDZWxsW10pID0+XG4gICAgICByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgICBsZXQgdHJmID0gY2VsbC52YWx1ZTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBpZiAodHJmIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICAgIHRyZiA9IHRyZi5tYXAodiA9PlxuICAgICAgICAgICAgICB2ICE9IG51bGwgJiYgdHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIHYudHJpbSgpLmxlbmd0aCA+IDAgPyB0cy50cmFuc2xhdGUodikgOiB2LFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdHJmID1cbiAgICAgICAgICAgICAgdHJmICE9IG51bGwgJiYgdHlwZW9mIHRyZiA9PT0gJ3N0cmluZycgJiYgdHJmLnRyaW0oKS5sZW5ndGggPiAwXG4gICAgICAgICAgICAgICAgPyB0cy50cmFuc2xhdGUodHJmKVxuICAgICAgICAgICAgICAgIDogdHJmO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoX2UpIHt9XG4gICAgICAgIHJldHVybiB7Li4uY2VsbCwgdmFsdWU6IHRyZn07XG4gICAgICB9KSxcbiAgICApO1xuXG4gICAgY29uc3QgaGVhZGVyID0gKHdpZGdldC5kYXRhc2V0IHx8IFtdKS5tYXAoY2VsbCA9PiB7XG4gICAgICBsZXQgZXZmID0gJyc7XG4gICAgICB0cnkge1xuICAgICAgICBldmYgPVxuICAgICAgICAgIGNlbGwuZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgICAgICA/IGNlbGwuZm9ybXVsYS5tYXAoZiA9PiB0ckZvcm11bGEoZiwgY29udGV4dCwgdHMpKVxuICAgICAgICAgICAgOiB0ckZvcm11bGEoY2VsbC5mb3JtdWxhLCBjb250ZXh0LCB0cyk7XG4gICAgICB9IGNhdGNoIChfZSkge31cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHZhbHVlOiBldmYsXG4gICAgICAgIHN0eWxlOiB7Li4ud2lkZ2V0LmNlbGxTdHlsZXMsIC4uLmNlbGwuc3R5bGV9LFxuICAgICAgICByb3dzcGFuOiBjZWxsLnJvd3NwYW4sXG4gICAgICAgIGNvbHNwYW46IGNlbGwuY29sc3BhbixcbiAgICAgIH07XG4gICAgfSk7XG4gICAgd2kuZGF0YSA9IGhlYWRlci5sZW5ndGggPT09IDAgPyBbLi4uZGF0YXNldF0gOiBbWy4uLmhlYWRlcl0sIC4uLmRhdGFzZXRdO1xuICB9IGVsc2UgaWYgKGlzUGFnaW5hdGVkTGlzdFdpZGdldCh3aWRnZXQpICYmIGlzUGFnaW5hdGVkTGlzdFdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIGxldCBjb250ZW50OiBBamZXaWRnZXRJbnN0YW5jZVtdID0gW107XG4gICAgaWYgKHdpZGdldC5jb250ZW50RGVmaW5pdGlvbikge1xuICAgICAgbGV0IGNvbnRlbnREZWZpbml0aW9uOiBBamZXaWRnZXRbXSA9XG4gICAgICAgIGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuY29udGVudERlZmluaXRpb24uZm9ybXVsYSwgY29udGV4dCkgfHwgW107XG4gICAgICBjb250ZW50RGVmaW5pdGlvbi5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBjb250ZW50LnB1c2god2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCBjb250ZXh0LCB0cywgdmFyaWFibGVzKSk7XG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHdpZGdldC5jb250ZW50KSB7XG4gICAgICB3aWRnZXQuY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgICBjb250ZW50LnB1c2god2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCBjb250ZXh0LCB0cywgdmFyaWFibGVzKSk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgd2kuY29udGVudCA9IGNvbnRlbnQ7XG4gIH0gZWxzZSBpZiAoaXNJbWFnZVdpZGdldCh3aWRnZXQpICYmIGlzSW1hZ2VXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICBpZiAod2lkZ2V0LmZsYWcpIHtcbiAgICAgIHdpLmZsYWcgPSBldmFsdWF0ZUV4cHJlc3Npb24od2lkZ2V0LmZsYWcuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmICh3aWRnZXQuaWNvbikge1xuICAgICAgd2kuaWNvbiA9IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuaWNvbi5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKHdpZGdldC51cmwpIHtcbiAgICAgIHdpLnVybCA9IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQudXJsLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0ltYWdlQ29udGFpbmVyV2lkZ2V0KHdpZGdldCkgJiYgaXNJbWFnZUNvbnRhaW5lcldpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIGlmICh3aWRnZXQuZmxhZ3MpIHtcbiAgICAgIHdpLmZsYWdzID1cbiAgICAgICAgd2lkZ2V0LmZsYWdzIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICA/IHdpZGdldC5mbGFncy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSlcbiAgICAgICAgICA6IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuZmxhZ3MuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmICh3aWRnZXQuaWNvbnMpIHtcbiAgICAgIHdpLmljb25zID1cbiAgICAgICAgd2lkZ2V0Lmljb25zIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICA/IHdpZGdldC5pY29ucy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSlcbiAgICAgICAgICA6IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuaWNvbnMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmICh3aWRnZXQudXJscykge1xuICAgICAgd2kudXJscyA9XG4gICAgICAgIHdpZGdldC51cmxzIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgICA/IHdpZGdldC51cmxzLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKVxuICAgICAgICAgIDogZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC51cmxzLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc1RleHRXaWRnZXQod2lkZ2V0KSAmJiBpc1RleHRXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICB3aS5odG1sVGV4dCA9IGV2YWx1YXRlUHJvcGVydHkod2lkZ2V0Lmh0bWxUZXh0LCBjb250ZXh0LCB0cyk7XG4gIH0gZWxzZSBpZiAoaXNGb3JtdWxhV2lkZ2V0KHdpZGdldCkgJiYgaXNGb3JtdWxhV2lkZ2V0SW5zdGFuY2Uod2kpKSB7XG4gICAgd2kuZm9ybXVsYSA9IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuZm9ybXVsYS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgfSBlbHNlIGlmIChpc01hcFdpZGdldCh3aWRnZXQpICYmIGlzTWFwV2lkZ2V0SW5zdGFuY2Uod2kpKSB7XG4gICAgd2kuY29vcmRpbmF0ZSA9IGV2YWx1YXRlRXhwcmVzc2lvbih3aWRnZXQuY29vcmRpbmF0ZS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgfSBlbHNlIGlmIChpc0dyYXBoV2lkZ2V0KHdpZGdldCkgJiYgaXNHcmFwaFdpZGdldEluc3RhbmNlKHdpKSkge1xuICAgIGlmICh3aWRnZXQubm9kZXMgIT0gbnVsbCkge1xuICAgICAgd2kubm9kZXMgPSB3aWRnZXQubm9kZXMubWFwKGRzID0+IHtcbiAgICAgICAgbGV0IG5vZGU6IGFueSA9IHtcbiAgICAgICAgICAuLi5kcyxcbiAgICAgICAgfTtcbiAgICAgICAgbm9kZS5sYWJlbCA9IGRzLmxhYmVsICE9IG51bGwgPyBldmFsdWF0ZVByb3BlcnR5KGRzLmxhYmVsLCBjb250ZXh0LCB0cykgOiBkcy5pZDtcbiAgICAgICAgbm9kZS5yZWQgPSBldmFsdWF0ZUV4cHJlc3Npb24oZHMucmVkLCBjb250ZXh0KTtcbiAgICAgICAgbm9kZS55ZWxsb3cgPSBldmFsdWF0ZUV4cHJlc3Npb24oZHMueWVsbG93LCBjb250ZXh0KTtcbiAgICAgICAgbm9kZS5ncmVlbiA9IGV2YWx1YXRlRXhwcmVzc2lvbihkcy5ncmVlbiwgY29udGV4dCk7XG4gICAgICAgIG5vZGUuY29sb3IgPSBkcy5jb2xvciA/IGV2YWx1YXRlRXhwcmVzc2lvbihkcy5jb2xvciwgY29udGV4dCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIHJldHVybiBub2RlIGFzIEFqZkdyYXBoTm9kZTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc0hlYXRNYXBXaWRnZXQod2lkZ2V0KSAmJiBpc0hlYXRNYXBXaWRnZXRJbnN0YW5jZSh3aSkpIHtcbiAgICB3aS5pZFByb3AgPSB3aWRnZXQuaWRQcm9wIHx8ICdpZCc7XG4gICAgd2kuZmVhdHVyZXMgPSAodHlwZW9mIHdpZGdldC5mZWF0dXJlcyA9PT0gJ3N0cmluZydcbiAgICAgID8gSlNPTi5wYXJzZSh3aWRnZXQuZmVhdHVyZXMpXG4gICAgICA6IHdpZGdldC5mZWF0dXJlcykgfHwge3R5cGU6ICdGZWF0dXJlQ29sbGVjdGlvbicsIGZlYXR1cmVzOiBbXX07XG4gICAgd2kudmFsdWVzID0gZXZhbHVhdGVFeHByZXNzaW9uKHdpZGdldC52YWx1ZXMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgd2kuc3RhcnRDb2xvciA9IHdpZGdldC5zdGFydENvbG9yIHx8ICcjZmZlYjNiJztcbiAgICB3aS5lbmRDb2xvciA9IHdpZGdldC5lbmRDb2xvciB8fCAnI2Y0NDMzNic7XG4gICAgd2kuaGlnaGxpZ2h0Q29sb3IgPSB3aWRnZXQuaGlnaGxpZ2h0Q29sb3IgfHwgJyMwMDk2ODgnO1xuICAgIHdpLnNob3dWaXN1YWxNYXAgPSB3aWRnZXQuc2hvd1Zpc3VhbE1hcCA9PT0gdHJ1ZTtcbiAgICBpZiAod2lkZ2V0LmFjdGlvbikge1xuICAgICAgd2kuYWN0aW9uID0gd2lkZ2V0LmFjdGlvbjtcbiAgICB9XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPiAxMDApIHtcbiAgICBjb25zdCBpaUZuID1cbiAgICAgIGNvbXBvbmVudHNNYXBbd2lkZ2V0LndpZGdldFR5cGVdICE9IG51bGxcbiAgICAgICAgPyBjb21wb25lbnRzTWFwW3dpZGdldC53aWRnZXRUeXBlXS5pbml0SW5zdGFuY2VcbiAgICAgICAgOiBudWxsO1xuICAgIGlmIChpaUZuICE9IG51bGwpIHtcbiAgICAgIHJldHVybiBpaUZuKHdpLCBjb250ZXh0LCB0cyk7XG4gICAgfVxuICB9XG4gIHJldHVybiB3aTtcbn1cbiJdfQ==