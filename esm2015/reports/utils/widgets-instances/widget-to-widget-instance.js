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
import { createFormula, evaluateExpression } from '@ajf/core/models';
import { deepCopy } from '@ajf/core/utils';
import { chartToChartJsType } from '../../chart-utils';
import { AjfWidgetType } from '../../interface/widgets/widget-type';
import { evaluateAggregation } from '../aggregation/evaluate-aggregation';
import { createWidgetInstance } from './create-widget-instance';
import { trFormula } from './widget-instance-utils';
export function widgetToWidgetInstance(widget, context, ts) {
    const wi = createWidgetInstance(widget, context, ts);
    if (widget.widgetType === AjfWidgetType.Column || widget.widgetType === AjfWidgetType.Layout) {
        const wwc = widget;
        const wwci = wi;
        let content = [];
        wwc.content.forEach(c => {
            if (wwc.repetitions != null) {
                wwci.repetitions = evaluateExpression(wwc.repetitions.formula, context);
                if (typeof wwci.repetitions === 'number' && wwci.repetitions > 0) {
                    for (let i = 0; i < wwci.repetitions; i++) {
                        content.push(widgetToWidgetInstance(c, Object.assign(Object.assign({}, context), { '$repetition': i }), ts));
                    }
                }
            }
            else {
                content.push(widgetToWidgetInstance(c, context, ts));
            }
            wwci.content = content;
        });
    }
    else if (widget.widgetType === AjfWidgetType.Chart) {
        const cw = widget;
        const cwi = wi;
        const labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
        const evLabels = labels.map(l => {
            let evf = evaluateExpression(l.formula, context);
            try {
                if (evf instanceof Array) {
                    evf = evf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.instant(v) : v);
                }
                else {
                    evf = evf != null && typeof evf === 'string' && evf.trim().length > 0 ? ts.instant(evf) :
                        evf;
                }
            }
            catch (_e) {
            }
            return evf;
        });
        cwi.labels = cw.labels instanceof Array ? evLabels : evLabels[0];
        cwi.datasets = cw.dataset.map(d => {
            let ds = Object.assign(Object.assign({}, d.options || {}), { data: evaluateAggregation(d.aggregation, d.formula, context) });
            if (d.chartType != null) {
                const ct = chartToChartJsType(d.chartType);
                ds = Object.assign(Object.assign({}, ds), { chartType: ct, type: ct });
            }
            if (d.options != null) {
                ds = Object.assign(Object.assign({}, ds), { options: d.options });
            }
            if (d.label != null) {
                ds = Object.assign(Object.assign({}, ds), { label: d.label.trim().length > 0 ? ts.instant(d.label) : d.label });
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        });
        cwi.data = { labels: cwi.labels, datasets: cwi.datasets };
        cwi.chartType = chartToChartJsType(cw.type || cw.chartType);
        if (cw.options != null && cw.options.plugins != null) {
            const plugins = cw.options.plugins;
            const pluginNames = Object.keys(plugins);
            pluginNames.forEach((pluginName) => {
                const plugin = plugins[pluginName];
                const pluginOptions = Object.keys(plugin);
                pluginOptions.forEach((pluginOptionName) => {
                    const pluginOption = plugin[pluginOptionName];
                    if (typeof pluginOption !== 'string' && pluginOption != null &&
                        pluginOption.formula != null) {
                        plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
                    }
                });
            });
        }
    }
    else if (widget.widgetType === AjfWidgetType.Table) {
        const tw = widget;
        const twi = wi;
        twi.dataset = tw.dataset.map(row => row.map(cell => {
            return cell.formula instanceof Array ?
                cell.formula.map(f => trFormula(f, context, ts)) :
                trFormula(cell.formula, context, ts);
        }));
        twi.data = (tw.dataset ||
            []).map(row => row.map(cell => {
            let evf = '';
            try {
                evf = cell.formula instanceof Array ?
                    cell.formula.map(f => trFormula(f, context, ts)) :
                    trFormula(cell.formula, context, ts);
            }
            catch (_e) {
            }
            return ({
                value: evf,
                style: Object.assign(Object.assign({}, tw.cellStyles), cell.style),
                rowspan: cell.rowspan,
                colspan: cell.colspan,
            });
        }));
    }
    else if (widget.widgetType === AjfWidgetType.DynamicTable) {
        const tdw = widget;
        const tdwi = wi;
        tdwi.dataset = tdw.dataset.map((cell) => {
            return cell.formula instanceof Array ?
                cell.formula.map(f => trFormula(f, context, ts)) :
                trFormula(cell.formula, context, ts);
        });
        let dataset = evaluateExpression(tdw.rowDefinition.formula, context) || [];
        dataset = (dataset || []).map((row) => row.map(cell => {
            let trf = cell.value;
            try {
                if (trf instanceof Array) {
                    trf = trf.map(v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.instant(v) : v);
                }
                else {
                    trf = trf != null && typeof trf === 'string' && trf.trim().length > 0 ?
                        ts.instant(trf) : trf;
                }
            }
            catch (_e) {
            }
            return (Object.assign(Object.assign({}, cell), { value: trf }));
        }));
        const header = (tdw.dataset || []).map(cell => {
            let evf = '';
            try {
                evf = cell.formula instanceof Array ?
                    cell.formula.map(f => trFormula(f, context, ts)) :
                    trFormula(cell.formula, context, ts);
            }
            catch (_e) {
            }
            return ({
                value: evf,
                style: Object.assign(Object.assign({}, tdw.cellStyles), cell.style),
                rowspan: cell.rowspan,
                colspan: cell.colspan,
            });
        });
        tdwi.data = [[...header], ...dataset];
    }
    else if (widget.widgetType === AjfWidgetType.Image) {
        const iw = widget;
        const iwi = wi;
        if (iw.flag) {
            iwi.flag = evaluateExpression(iw.flag.formula, context);
        }
        if (iw.icon) {
            iwi.icon = evaluateExpression(iw.icon.formula, context);
        }
        if (iw.url) {
            iwi.url = evaluateExpression(iw.url.formula, context);
        }
    }
    else if (widget.widgetType === AjfWidgetType.ImageContainer) {
        const icw = widget;
        const icwi = wi;
        if (icw.flags) {
            icwi.flags = icw.flags instanceof Array ?
                icw.flags.map(f => evaluateExpression(f.formula, context)) :
                evaluateExpression(icw.flags.formula, context);
        }
        if (icw.icons) {
            icwi.icons = icw.icons instanceof Array ?
                icw.icons.map(f => evaluateExpression(f.formula, context)) :
                evaluateExpression(icw.icons.formula, context);
        }
        if (icw.urls) {
            icwi.urls = icw.urls instanceof Array ?
                icw.urls.map(f => evaluateExpression(f.formula, context)) :
                evaluateExpression(icw.urls.formula, context);
        }
    }
    else if (widget.widgetType === AjfWidgetType.Text) {
        const tew = widget;
        const tewi = wi;
        const formulaRegEx = /\[{2}(.+?)\]{2}/g;
        const matches = [];
        let match;
        let htmlText = tew.htmlText;
        while (match = formulaRegEx.exec(htmlText)) {
            const idx = match.index;
            const len = match[0].length;
            const formula = createFormula({ formula: match[1] });
            matches.push({ idx, len, formula });
        }
        matches.reverse().forEach((m) => {
            let calcValue;
            try {
                calcValue = evaluateExpression(m.formula.formula, context);
            }
            catch (e) {
                calcValue = '';
            }
            htmlText = `${htmlText.substr(0, m.idx)}${calcValue}${htmlText.substr(m.idx + m.len)}`;
        });
        tewi.htmlText = htmlText != null && htmlText.length > 0 ? ts.instant(htmlText) : htmlText;
    }
    else if (widget.widgetType === AjfWidgetType.Formula) {
        const fw = widget;
        const fwi = wi;
        fwi.formula = evaluateExpression(fw.formula.formula, context);
    }
    else if (widget.widgetType === AjfWidgetType.Map) {
        const mw = widget;
        const mwi = wi;
        mwi.coordinate = evaluateExpression(mw.coordinate.formula, context);
    }
    return wi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBQXlCLGFBQWEsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRTNGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQXdCckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRWxFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRXhFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQztBQUVsRCxNQUFNLFVBQVUsc0JBQXNCLENBQ2xDLE1BQWlCLEVBQUUsT0FBbUIsRUFBRSxFQUFvQjtJQUM5RCxNQUFNLEVBQUUsR0FBRyxvQkFBb0IsQ0FBQyxNQUFNLEVBQUUsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBRXJELElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTtRQUM1RixNQUFNLEdBQUcsR0FBRyxNQUE4QixDQUFDO1FBQzNDLE1BQU0sSUFBSSxHQUFHLEVBQWtDLENBQUM7UUFDaEQsSUFBSSxPQUFPLEdBQUcsRUFBeUIsQ0FBQztRQUN4QyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxDQUFD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QUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsR0FBRyxFQUFFO1FBQ2xELE1BQU0sRUFBRSxHQUFHLE1BQXNCLENBQUM7UUFDbEMsTUFBTSxHQUFHLEdBQUcsRUFBMEIsQ0FBQztRQUN2QyxHQUFHLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3JFO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIEFqZkZvcm11bGEsIGNyZWF0ZUZvcm11bGEsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge0FqZlRhYmxlQ2VsbH0gZnJvbSAnQGFqZi9jb3JlL3RhYmxlJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge2NoYXJ0VG9DaGFydEpzVHlwZX0gZnJvbSAnLi4vLi4vY2hhcnQtdXRpbHMnO1xuaW1wb3J0IHtBamZUYWJsZURhdGFzZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9kYXRhc2V0L3RhYmxlLWRhdGFzZXQnO1xuaW1wb3J0IHtBamZDaGFydFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvY2hhcnQtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmRm9ybXVsYVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvZm9ybXVsYS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmSW1hZ2VDb250YWluZXJXaWRnZXRJbnN0YW5jZVxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvaW1hZ2UtY29udGFpbmVyLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkltYWdlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9pbWFnZS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL21hcC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvdGFibGUtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGV4dFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvdGV4dC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBBamZXaWRnZXRXaXRoQ29udGVudEluc3RhbmNlXG59IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtd2l0aC1jb250ZW50LWluc3RhbmNlJztcbmltcG9ydCB7QWpmQ2hhcnRXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL2NoYXJ0LXdpZGdldCc7XG5pbXBvcnQge0FqZkR5bmFtaWNUYWJsZVdpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvZHluYW1pYy10YWJsZS13aWRnZXQnO1xuaW1wb3J0IHtBamZGb3JtdWxhV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy9mb3JtdWxhLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlQ29udGFpbmVyV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy9pbWFnZS1jb250YWluZXItd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL2ltYWdlLXdpZGdldCc7XG5pbXBvcnQge0FqZk1hcFdpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZlRhYmxlV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy90YWJsZS13aWRnZXQnO1xuaW1wb3J0IHtBamZUZXh0V2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy90ZXh0LXdpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuaW1wb3J0IHtBamZXaWRnZXRXaXRoQ29udGVudH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXdpdGgtY29udGVudCc7XG5pbXBvcnQge2V2YWx1YXRlQWdncmVnYXRpb259IGZyb20gJy4uL2FnZ3JlZ2F0aW9uL2V2YWx1YXRlLWFnZ3JlZ2F0aW9uJztcblxuaW1wb3J0IHtjcmVhdGVXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi9jcmVhdGUtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7dHJGb3JtdWxhfSBmcm9tICcuL3dpZGdldC1pbnN0YW5jZS11dGlscyc7XG5cbmV4cG9ydCBmdW5jdGlvbiB3aWRnZXRUb1dpZGdldEluc3RhbmNlKFxuICAgIHdpZGdldDogQWpmV2lkZ2V0LCBjb250ZXh0OiBBamZDb250ZXh0LCB0czogVHJhbnNsYXRlU2VydmljZSk6IEFqZldpZGdldEluc3RhbmNlIHtcbiAgY29uc3Qgd2kgPSBjcmVhdGVXaWRnZXRJbnN0YW5jZSh3aWRnZXQsIGNvbnRleHQsIHRzKTtcblxuICBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuQ29sdW1uIHx8IHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkxheW91dCkge1xuICAgIGNvbnN0IHd3YyA9IHdpZGdldCBhcyBBamZXaWRnZXRXaXRoQ29udGVudDtcbiAgICBjb25zdCB3d2NpID0gd2kgYXMgQWpmV2lkZ2V0V2l0aENvbnRlbnRJbnN0YW5jZTtcbiAgICBsZXQgY29udGVudCA9IFtdIGFzIEFqZldpZGdldEluc3RhbmNlW107XG4gICAgd3djLmNvbnRlbnQuZm9yRWFjaChjID0+IHtcbiAgICAgIGlmICh3d2MucmVwZXRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICB3d2NpLnJlcGV0aXRpb25zID0gZXZhbHVhdGVFeHByZXNzaW9uKHd3Yy5yZXBldGl0aW9ucy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHR5cGVvZiB3d2NpLnJlcGV0aXRpb25zID09PSAnbnVtYmVyJyAmJiB3d2NpLnJlcGV0aXRpb25zID4gMCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd3djaS5yZXBldGl0aW9uczsgaSsrKSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2god2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCB7Li4uY29udGV4dCwgJyRyZXBldGl0aW9uJzogaX0sIHRzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50LnB1c2god2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCBjb250ZXh0LCB0cykpO1xuICAgICAgfVxuICAgICAgd3djaS5jb250ZW50ID0gY29udGVudDtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5DaGFydCkge1xuICAgIGNvbnN0IGN3ID0gd2lkZ2V0IGFzIEFqZkNoYXJ0V2lkZ2V0O1xuICAgIGNvbnN0IGN3aSA9IHdpIGFzIEFqZkNoYXJ0V2lkZ2V0SW5zdGFuY2U7XG4gICAgY29uc3QgbGFiZWxzID0gY3cubGFiZWxzIGluc3RhbmNlb2YgQXJyYXkgPyBjdy5sYWJlbHMgOiBbY3cubGFiZWxzXTtcbiAgICBjb25zdCBldkxhYmVscyA9IGxhYmVscy5tYXAobCA9PiB7XG4gICAgICBsZXQgZXZmID0gZXZhbHVhdGVFeHByZXNzaW9uKGwuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoZXZmIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBldmYgPSBldmYubWFwKFxuICAgICAgICAgICAgICB2ID0+IHYgIT0gbnVsbCAmJiB0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdi50cmltKCkubGVuZ3RoID4gMCA/IHRzLmluc3RhbnQodikgOiB2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmYgPSBldmYgIT0gbnVsbCAmJiB0eXBlb2YgZXZmID09PSAnc3RyaW5nJyAmJiBldmYudHJpbSgpLmxlbmd0aCA+IDAgPyB0cy5pbnN0YW50KGV2ZikgOlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGV2ZjtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoX2UpIHtcbiAgICAgIH1cbiAgICAgIHJldHVybiBldmY7XG4gICAgfSk7XG4gICAgY3dpLmxhYmVscyA9IGN3LmxhYmVscyBpbnN0YW5jZW9mIEFycmF5ID8gZXZMYWJlbHMgOiBldkxhYmVsc1swXTtcbiAgICBjd2kuZGF0YXNldHMgPSBjdy5kYXRhc2V0Lm1hcChkID0+IHtcbiAgICAgIGxldCBkczogYW55ID0ge1xuICAgICAgICAuLi5kLm9wdGlvbnMgfHwge30sXG4gICAgICAgIGRhdGE6IGV2YWx1YXRlQWdncmVnYXRpb24oZC5hZ2dyZWdhdGlvbiwgZC5mb3JtdWxhLCBjb250ZXh0KSxcbiAgICAgIH07XG4gICAgICBpZiAoZC5jaGFydFR5cGUgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjdCA9IGNoYXJ0VG9DaGFydEpzVHlwZShkLmNoYXJ0VHlwZSk7XG4gICAgICAgIGRzID0gey4uLmRzLCBjaGFydFR5cGU6IGN0LCB0eXBlOiBjdH07XG4gICAgICB9XG4gICAgICBpZiAoZC5vcHRpb25zICE9IG51bGwpIHtcbiAgICAgICAgZHMgPSB7Li4uZHMsIG9wdGlvbnM6IGQub3B0aW9uc307XG4gICAgICB9XG4gICAgICBpZiAoZC5sYWJlbCAhPSBudWxsKSB7XG4gICAgICAgIGRzID0gey4uLmRzLCBsYWJlbDogZC5sYWJlbC50cmltKCkubGVuZ3RoID4gMCA/IHRzLmluc3RhbnQoZC5sYWJlbCkgOiBkLmxhYmVsfTtcbiAgICAgIH1cbiAgICAgIGlmIChkLmRhdGFsYWJlbHMgIT0gbnVsbCkge1xuICAgICAgICBkcy5kYXRhbGFiZWxzID0gZGVlcENvcHkoZC5kYXRhbGFiZWxzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkcztcbiAgICB9KTtcbiAgICBjd2kuZGF0YSA9IHtsYWJlbHM6IGN3aS5sYWJlbHMsIGRhdGFzZXRzOiBjd2kuZGF0YXNldHN9O1xuICAgIGN3aS5jaGFydFR5cGUgPSBjaGFydFRvQ2hhcnRKc1R5cGUoY3cudHlwZSB8fCBjdy5jaGFydFR5cGUpO1xuICAgIGlmIChjdy5vcHRpb25zICE9IG51bGwgJiYgY3cub3B0aW9ucy5wbHVnaW5zICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHBsdWdpbnMgPSBjdy5vcHRpb25zLnBsdWdpbnM7XG4gICAgICBjb25zdCBwbHVnaW5OYW1lcyA9IE9iamVjdC5rZXlzKHBsdWdpbnMpO1xuICAgICAgcGx1Z2luTmFtZXMuZm9yRWFjaCgocGx1Z2luTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5zW3BsdWdpbk5hbWVdO1xuICAgICAgICBjb25zdCBwbHVnaW5PcHRpb25zID0gT2JqZWN0LmtleXMocGx1Z2luKTtcbiAgICAgICAgcGx1Z2luT3B0aW9ucy5mb3JFYWNoKChwbHVnaW5PcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBwbHVnaW5PcHRpb24gPSBwbHVnaW5bcGx1Z2luT3B0aW9uTmFtZV07XG4gICAgICAgICAgaWYgKHR5cGVvZiBwbHVnaW5PcHRpb24gIT09ICdzdHJpbmcnICYmIHBsdWdpbk9wdGlvbiAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHBsdWdpbk9wdGlvbi5mb3JtdWxhICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBsdWdpbltwbHVnaW5PcHRpb25OYW1lXSA9IGV2YWx1YXRlRXhwcmVzc2lvbihwbHVnaW5PcHRpb24uZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5UYWJsZSkge1xuICAgIGNvbnN0IHR3ID0gd2lkZ2V0IGFzIEFqZlRhYmxlV2lkZ2V0O1xuICAgIGNvbnN0IHR3aSA9IHdpIGFzIEFqZlRhYmxlV2lkZ2V0SW5zdGFuY2U7XG5cbiAgICB0d2kuZGF0YXNldCA9IHR3LmRhdGFzZXQubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgcmV0dXJuIGNlbGwuZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5ID9cbiAgICAgICAgICBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYgYXMgQWpmRm9ybXVsYSwgY29udGV4dCBhcyBBamZDb250ZXh0LCB0cykpIDpcbiAgICAgICAgICB0ckZvcm11bGEoY2VsbC5mb3JtdWxhISwgY29udGV4dCBhcyBBamZDb250ZXh0LCB0cyk7XG4gICAgfSkpO1xuXG4gICAgdHdpLmRhdGEgPSAodHcuZGF0YXNldCB8fFxuICAgICAgICAgICAgICAgIFtdKS5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICAgICAgICAgICAgICBsZXQgZXZmID0gJyc7XG4gICAgICAgICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICAgICAgICBldmYgPSBjZWxsLmZvcm11bGEgaW5zdGFuY2VvZiBBcnJheSA/XG4gICAgICAgICAgICAgICAgICAgICAgY2VsbC5mb3JtdWxhLm1hcChmID0+IHRyRm9ybXVsYShmIGFzIEFqZkZvcm11bGEsIGNvbnRleHQgYXMgQWpmQ29udGV4dCwgdHMpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgdHJGb3JtdWxhKGNlbGwuZm9ybXVsYSEsIGNvbnRleHQgYXMgQWpmQ29udGV4dCwgdHMpO1xuICAgICAgICAgICAgICAgICAgfSBjYXRjaCAoX2UpIHtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIHJldHVybiAoe1xuICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXZmLFxuICAgICAgICAgICAgICAgICAgICBzdHlsZTogeyAuLi50dy5jZWxsU3R5bGVzLCAuLi5jZWxsLnN0eWxlIH0sXG4gICAgICAgICAgICAgICAgICAgIHJvd3NwYW46IGNlbGwucm93c3BhbixcbiAgICAgICAgICAgICAgICAgICAgY29sc3BhbjogY2VsbC5jb2xzcGFuLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfSkpO1xuICB9IGVsc2UgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkR5bmFtaWNUYWJsZSkge1xuICAgIGNvbnN0IHRkdyA9IHdpZGdldCBhcyBBamZEeW5hbWljVGFibGVXaWRnZXQ7XG4gICAgY29uc3QgdGR3aSA9IHdpIGFzIEFqZlRhYmxlV2lkZ2V0SW5zdGFuY2U7XG5cbiAgICB0ZHdpLmRhdGFzZXQgPSB0ZHcuZGF0YXNldC5tYXAoKGNlbGw6IEFqZlRhYmxlRGF0YXNldCkgPT4ge1xuICAgICAgcmV0dXJuIGNlbGwuZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5ID9cbiAgICAgICAgICBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYgYXMgQWpmRm9ybXVsYSwgY29udGV4dCwgdHMpKSA6XG4gICAgICAgICAgdHJGb3JtdWxhKGNlbGwuZm9ybXVsYSEsIGNvbnRleHQsIHRzKTtcbiAgICB9KTtcblxuICAgIGxldCBkYXRhc2V0OiBBamZUYWJsZUNlbGxbXVtdID0gZXZhbHVhdGVFeHByZXNzaW9uKHRkdy5yb3dEZWZpbml0aW9uLmZvcm11bGEsIGNvbnRleHQpIHx8IFtdO1xuICAgIGRhdGFzZXQgPSAoZGF0YXNldCB8fCBbXSkubWFwKChyb3c6IEFqZlRhYmxlQ2VsbFtdKSA9PiByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgbGV0IHRyZiA9IGNlbGwudmFsdWU7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAodHJmIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICB0cmYgPSB0cmYubWFwKFxuICAgICAgICAgICAgdiA9PiB2ICE9IG51bGwgJiYgdHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIHYudHJpbSgpLmxlbmd0aCA+IDAgPyB0cy5pbnN0YW50KHYpIDogdik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJmID0gdHJmICE9IG51bGwgJiYgdHlwZW9mIHRyZiA9PT0gJ3N0cmluZycgJiYgdHJmLnRyaW0oKS5sZW5ndGggPiAwID9cbiAgICAgICAgICAgIHRzLmluc3RhbnQodHJmKSA6IHRyZjtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoX2UpIHtcbiAgICAgIH1cbiAgICAgIHJldHVybiAoe1xuICAgICAgICAuLi5jZWxsLFxuICAgICAgICB2YWx1ZTogdHJmXG4gICAgICB9KTtcbiAgICB9KSk7XG5cbiAgICBjb25zdCBoZWFkZXIgPVxuICAgICAgKHRkdy5kYXRhc2V0IHx8IFtdKS5tYXAoY2VsbCA9PiB7XG4gICAgICAgIGxldCBldmYgPSAnJztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICBldmYgPSBjZWxsLmZvcm11bGEgaW5zdGFuY2VvZiBBcnJheSA/XG4gICAgICAgICAgICBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYgYXMgQWpmRm9ybXVsYSwgY29udGV4dCBhcyBBamZDb250ZXh0LCB0cykpIDpcbiAgICAgICAgICAgIHRyRm9ybXVsYShjZWxsLmZvcm11bGEhLCBjb250ZXh0IGFzIEFqZkNvbnRleHQsIHRzKTtcbiAgICAgICAgfSBjYXRjaCAoX2UpIHtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gKHtcbiAgICAgICAgICB2YWx1ZTogZXZmLFxuICAgICAgICAgIHN0eWxlOiB7IC4uLnRkdy5jZWxsU3R5bGVzLCAuLi5jZWxsLnN0eWxlIH0sXG4gICAgICAgICAgcm93c3BhbjogY2VsbC5yb3dzcGFuLFxuICAgICAgICAgIGNvbHNwYW46IGNlbGwuY29sc3BhbixcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB0ZHdpLmRhdGEgPSBbWy4uLmhlYWRlcl0sIC4uLmRhdGFzZXRdO1xuICB9IGVsc2UgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkltYWdlKSB7XG4gICAgY29uc3QgaXcgPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgY29uc3QgaXdpID0gd2kgYXMgQWpmSW1hZ2VXaWRnZXRJbnN0YW5jZTtcbiAgICBpZiAoaXcuZmxhZykge1xuICAgICAgaXdpLmZsYWcgPSBldmFsdWF0ZUV4cHJlc3Npb24oaXcuZmxhZy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGl3Lmljb24pIHtcbiAgICAgIGl3aS5pY29uID0gZXZhbHVhdGVFeHByZXNzaW9uKGl3Lmljb24uZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChpdy51cmwpIHtcbiAgICAgIGl3aS51cmwgPSBldmFsdWF0ZUV4cHJlc3Npb24oaXcudXJsLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5JbWFnZUNvbnRhaW5lcikge1xuICAgIGNvbnN0IGljdyA9IHdpZGdldCBhcyBBamZJbWFnZUNvbnRhaW5lcldpZGdldDtcbiAgICBjb25zdCBpY3dpID0gd2kgYXMgQWpmSW1hZ2VDb250YWluZXJXaWRnZXRJbnN0YW5jZTtcbiAgICBpZiAoaWN3LmZsYWdzKSB7XG4gICAgICBpY3dpLmZsYWdzID0gaWN3LmZsYWdzIGluc3RhbmNlb2YgQXJyYXkgP1xuICAgICAgICAgIGljdy5mbGFncy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSkgOlxuICAgICAgICAgIGV2YWx1YXRlRXhwcmVzc2lvbihpY3cuZmxhZ3MuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChpY3cuaWNvbnMpIHtcbiAgICAgIGljd2kuaWNvbnMgPSBpY3cuaWNvbnMgaW5zdGFuY2VvZiBBcnJheSA/XG4gICAgICAgICAgaWN3Lmljb25zLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKSA6XG4gICAgICAgICAgZXZhbHVhdGVFeHByZXNzaW9uKGljdy5pY29ucy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGljdy51cmxzKSB7XG4gICAgICBpY3dpLnVybHMgPSBpY3cudXJscyBpbnN0YW5jZW9mIEFycmF5ID9cbiAgICAgICAgICBpY3cudXJscy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSkgOlxuICAgICAgICAgIGV2YWx1YXRlRXhwcmVzc2lvbihpY3cudXJscy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuVGV4dCkge1xuICAgIGNvbnN0IHRldyA9IHdpZGdldCBhcyBBamZUZXh0V2lkZ2V0O1xuICAgIGNvbnN0IHRld2kgPSB3aSBhcyBBamZUZXh0V2lkZ2V0SW5zdGFuY2U7XG4gICAgY29uc3QgZm9ybXVsYVJlZ0V4OiBSZWdFeHAgPSAvXFxbezJ9KC4rPylcXF17Mn0vZztcbiAgICBjb25zdCBtYXRjaGVzOiB7aWR4OiBudW1iZXIsIGxlbjogbnVtYmVyLCBmb3JtdWxhOiBBamZGb3JtdWxhfVtdID0gW107XG4gICAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXl8bnVsbDtcbiAgICBsZXQgaHRtbFRleHQgPSB0ZXcuaHRtbFRleHQ7XG4gICAgd2hpbGUgKG1hdGNoID0gZm9ybXVsYVJlZ0V4LmV4ZWMoaHRtbFRleHQpKSB7XG4gICAgICBjb25zdCBpZHggPSBtYXRjaC5pbmRleDtcbiAgICAgIGNvbnN0IGxlbiA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIGNvbnN0IGZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBtYXRjaFsxXX0pO1xuICAgICAgbWF0Y2hlcy5wdXNoKHtpZHgsIGxlbiwgZm9ybXVsYX0pO1xuICAgIH1cbiAgICBtYXRjaGVzLnJldmVyc2UoKS5mb3JFYWNoKChtKSA9PiB7XG4gICAgICBsZXQgY2FsY1ZhbHVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2FsY1ZhbHVlID0gZXZhbHVhdGVFeHByZXNzaW9uKG0uZm9ybXVsYS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FsY1ZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgICBodG1sVGV4dCA9IGAke2h0bWxUZXh0LnN1YnN0cigwLCBtLmlkeCl9JHtjYWxjVmFsdWV9JHtodG1sVGV4dC5zdWJzdHIobS5pZHggKyBtLmxlbil9YDtcbiAgICB9KTtcbiAgICB0ZXdpLmh0bWxUZXh0ID0gaHRtbFRleHQgIT0gbnVsbCAmJiBodG1sVGV4dC5sZW5ndGggPiAwID8gdHMuaW5zdGFudChodG1sVGV4dCkgOiBodG1sVGV4dDtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5Gb3JtdWxhKSB7XG4gICAgY29uc3QgZncgPSB3aWRnZXQgYXMgQWpmRm9ybXVsYVdpZGdldDtcbiAgICBjb25zdCBmd2kgPSB3aSBhcyBBamZGb3JtdWxhV2lkZ2V0SW5zdGFuY2U7XG4gICAgZndpLmZvcm11bGEgPSBldmFsdWF0ZUV4cHJlc3Npb24oZncuZm9ybXVsYS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5NYXApIHtcbiAgICBjb25zdCBtdyA9IHdpZGdldCBhcyBBamZNYXBXaWRnZXQ7XG4gICAgY29uc3QgbXdpID0gd2kgYXMgQWpmTWFwV2lkZ2V0SW5zdGFuY2U7XG4gICAgbXdpLmNvb3JkaW5hdGUgPSBldmFsdWF0ZUV4cHJlc3Npb24obXcuY29vcmRpbmF0ZS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgfVxuICByZXR1cm4gd2k7XG59XG4iXX0=