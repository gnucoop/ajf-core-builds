/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/widgets-instances/widget-to-widget-instance.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
/**
 * @param {?} widget
 * @param {?} context
 * @param {?} ts
 * @return {?}
 */
export function widgetToWidgetInstance(widget, context, ts) {
    /** @type {?} */
    const wi = createWidgetInstance(widget, context, ts);
    if (widget.widgetType === AjfWidgetType.Column || widget.widgetType === AjfWidgetType.Layout) {
        /** @type {?} */
        const wwc = (/** @type {?} */ (widget));
        /** @type {?} */
        const wwci = (/** @type {?} */ (wi));
        /** @type {?} */
        let content = (/** @type {?} */ ([]));
        wwc.content.forEach((/**
         * @param {?} c
         * @return {?}
         */
        c => {
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
        }));
    }
    else if (widget.widgetType === AjfWidgetType.Chart) {
        /** @type {?} */
        const cw = (/** @type {?} */ (widget));
        /** @type {?} */
        const cwi = (/** @type {?} */ (wi));
        /** @type {?} */
        const labels = cw.labels instanceof Array ? cw.labels : [cw.labels];
        /** @type {?} */
        const evLabels = labels.map((/**
         * @param {?} l
         * @return {?}
         */
        l => {
            /** @type {?} */
            let evf = evaluateExpression(l.formula, context);
            try {
                if (evf instanceof Array) {
                    evf = evf.map((/**
                     * @param {?} v
                     * @return {?}
                     */
                    v => v != null && typeof v === 'string' && v.trim().length > 0
                        ? ts.instant(v) : v));
                }
                else {
                    evf = evf != null && typeof evf === 'string' && evf.trim().length > 0
                        ? ts.instant(evf) : evf;
                }
            }
            catch (_e) {
            }
            return evf;
        }));
        cwi.labels = cw.labels instanceof Array ? evLabels : evLabels[0];
        cwi.datasets = cw.dataset.map((/**
         * @param {?} d
         * @return {?}
         */
        d => {
            /** @type {?} */
            let ds = Object.assign(Object.assign({}, d.options || {}), { data: evaluateAggregation(d.aggregation, d.formula, context) });
            if (d.chartType != null) {
                /** @type {?} */
                const ct = chartToChartJsType(d.chartType);
                ds = Object.assign(Object.assign({}, ds), { chartType: ct, type: ct });
            }
            if (d.options != null) {
                ds = Object.assign(Object.assign({}, ds), { options: d.options });
            }
            if (d.label != null) {
                ds = Object.assign(Object.assign({}, ds), { label: d.label });
            }
            if (d.datalabels != null) {
                ds.datalabels = deepCopy(d.datalabels);
            }
            return ds;
        }));
        cwi.data = { labels: cwi.labels, datasets: cwi.datasets };
        cwi.chartType = chartToChartJsType(cw.type || cw.chartType);
        if (cw.options != null && cw.options.plugins != null) {
            /** @type {?} */
            const plugins = cw.options.plugins;
            /** @type {?} */
            const pluginNames = Object.keys(plugins);
            pluginNames.forEach((/**
             * @param {?} pluginName
             * @return {?}
             */
            (pluginName) => {
                /** @type {?} */
                const plugin = plugins[pluginName];
                /** @type {?} */
                const pluginOptions = Object.keys(plugin);
                pluginOptions.forEach((/**
                 * @param {?} pluginOptionName
                 * @return {?}
                 */
                (pluginOptionName) => {
                    /** @type {?} */
                    const pluginOption = plugin[pluginOptionName];
                    if (typeof pluginOption !== 'string' &&
                        pluginOption != null &&
                        pluginOption.formula != null) {
                        plugin[pluginOptionName] = evaluateExpression(pluginOption.formula, context);
                    }
                }));
            }));
        }
    }
    else if (widget.widgetType === AjfWidgetType.Table) {
        /** @type {?} */
        const tw = (/** @type {?} */ (widget));
        /** @type {?} */
        const twi = (/** @type {?} */ (wi));
        twi.dataset = tw.dataset.map((/**
         * @param {?} row
         * @return {?}
         */
        row => row.map((/**
         * @param {?} cell
         * @return {?}
         */
        cell => {
            return cell.formula instanceof Array ?
                cell.formula.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => trFormula((/** @type {?} */ (f)), (/** @type {?} */ (context)), ts))) :
                trFormula((/** @type {?} */ (cell.formula)), (/** @type {?} */ (context)), ts);
        }))));
        twi.data = (tw.dataset || [])
            .map((/**
         * @param {?} row
         * @return {?}
         */
        row => row.map((/**
         * @param {?} cell
         * @return {?}
         */
        cell => ({
            value: evaluateExpression(cell.formula.formula, context),
            style: Object.assign(Object.assign({}, tw.cellStyles), cell.style),
            rowspan: cell.rowspan,
            colspan: cell.colspan,
        })))));
    }
    else if (widget.widgetType === AjfWidgetType.DynamicTable) {
        /** @type {?} */
        const tdw = (/** @type {?} */ (widget));
        /** @type {?} */
        const tdwi = (/** @type {?} */ (wi));
        tdwi.dataset = tdw.dataset.map((/**
         * @param {?} cell
         * @return {?}
         */
        (cell) => {
            return cell.formula instanceof Array ?
                cell.formula.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => trFormula((/** @type {?} */ (f)), context, ts))) :
                trFormula((/** @type {?} */ (cell.formula)), context, ts);
        }));
        /** @type {?} */
        const dataset = evaluateExpression(tdw.rowDefinition.formula, context) || [];
        /** @type {?} */
        const header = (tdw.dataset || []).map((/**
         * @param {?} cell
         * @return {?}
         */
        cell => ({
            value: evaluateExpression(cell.formula.formula, context),
            style: Object.assign(Object.assign({}, tdw.cellStyles), cell.style),
            rowspan: cell.rowspan,
            colspan: cell.colspan,
        })));
        tdwi.data = [[...header], ...dataset];
    }
    else if (widget.widgetType === AjfWidgetType.Image) {
        /** @type {?} */
        const iw = (/** @type {?} */ (widget));
        /** @type {?} */
        const iwi = (/** @type {?} */ (wi));
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
        /** @type {?} */
        const icw = (/** @type {?} */ (widget));
        /** @type {?} */
        const icwi = (/** @type {?} */ (wi));
        if (icw.flags) {
            icwi.flags = icw.flags instanceof Array
                ? icw.flags.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => evaluateExpression(f.formula, context)))
                : evaluateExpression(icw.flags.formula, context);
        }
        if (icw.icons) {
            icwi.icons = icw.icons instanceof Array
                ? icw.icons.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => evaluateExpression(f.formula, context)))
                : evaluateExpression(icw.icons.formula, context);
        }
        if (icw.urls) {
            icwi.urls = icw.urls instanceof Array
                ? icw.urls.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => evaluateExpression(f.formula, context)))
                : evaluateExpression(icw.urls.formula, context);
        }
    }
    else if (widget.widgetType === AjfWidgetType.Text) {
        /** @type {?} */
        const tew = (/** @type {?} */ (widget));
        /** @type {?} */
        const tewi = (/** @type {?} */ (wi));
        /** @type {?} */
        const formulaRegEx = /\[{2}(.+?)\]{2}/g;
        /** @type {?} */
        const matches = [];
        /** @type {?} */
        let match;
        /** @type {?} */
        let htmlText = tew.htmlText;
        while (match = formulaRegEx.exec(htmlText)) {
            /** @type {?} */
            const idx = match.index;
            /** @type {?} */
            const len = match[0].length;
            /** @type {?} */
            const formula = createFormula({ formula: match[1] });
            matches.push({ idx, len, formula });
        }
        matches.reverse().forEach((/**
         * @param {?} m
         * @return {?}
         */
        (m) => {
            /** @type {?} */
            let calcValue;
            try {
                calcValue = evaluateExpression(m.formula.formula, context);
            }
            catch (e) {
                calcValue = '';
            }
            htmlText = `${htmlText.substr(0, m.idx)}${calcValue}${htmlText.substr(m.idx + m.len)}`;
        }));
        tewi.htmlText = htmlText != null && htmlText.length > 0 ? ts.instant(htmlText) : htmlText;
    }
    else if (widget.widgetType === AjfWidgetType.Formula) {
        /** @type {?} */
        const fw = (/** @type {?} */ (widget));
        /** @type {?} */
        const fwi = (/** @type {?} */ (wi));
        fwi.formula = evaluateExpression(fw.formula.formula, context);
    }
    else if (widget.widgetType === AjfWidgetType.Map) {
        /** @type {?} */
        const mw = (/** @type {?} */ (widget));
        /** @type {?} */
        const mwi = (/** @type {?} */ (wi));
        mwi.coordinate = evaluateExpression(mw.coordinate.formula, context);
    }
    return wi;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQXlCLGFBQWEsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzNGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQXdCckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRWxFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRXhFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQUVsRCxNQUFNLFVBQVUsc0JBQXNCLENBQ2xDLE1BQWlCLEVBQUUsT0FBbUIsRUFBRSxFQUFvQjs7VUFDeEQsRUFBRSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDO0lBRXBELElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTs7Y0FDdEYsR0FBRyxHQUFHLG1CQUFBLE1BQU0sRUFBd0I7O2NBQ3BDLElBQUksR0FBRyxtQkFBQSxFQUFFLEVBQWdDOztZQUMzQyxPQUFPLEdBQUcsbUJBQUEsRUFBRSxFQUF1QjtRQUN2QyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7UUFBQyxD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LEVBQUUsQ0FBQztRQUN6RixDQUFDLEVBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsUUFBUSxJQUFJLElBQUksSUFBSSxRQUFRLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDO0tBQzNGO1NBQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUU7O2NBQ2hELEVBQUUsR0FBRyxtQkFBQSxNQUFNLEVBQW9COztjQUMvQixHQUFHLEdBQUcsbUJBQUEsRUFBRSxFQUE0QjtRQUMxQyxHQUFHLENBQUMsT0FBTyxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO1NBQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7O2NBQzVDLEVBQUUsR0FBRyxtQkFBQSxNQUFNLEVBQWdCOztjQUMzQixHQUFHLEdBQUcsbUJBQUEsRUFBRSxFQUF3QjtRQUN0QyxHQUFHLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3JFO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIEFqZkZvcm11bGEsIGNyZWF0ZUZvcm11bGEsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHtjaGFydFRvQ2hhcnRKc1R5cGV9IGZyb20gJy4uLy4uL2NoYXJ0LXV0aWxzJztcbmltcG9ydCB7QWpmQ2hhcnRXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2NoYXJ0LXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZvcm11bGFXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2Zvcm11bGEtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZkltYWdlQ29udGFpbmVyV2lkZ2V0SW5zdGFuY2Vcbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2ltYWdlLWNvbnRhaW5lci13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZJbWFnZVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvaW1hZ2Utd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmTWFwV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9tYXAtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGFibGVXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3RhYmxlLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRleHRXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3RleHQtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmV2lkZ2V0V2l0aENvbnRlbnRJbnN0YW5jZVxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXdpdGgtY29udGVudC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy9jaGFydC13aWRnZXQnO1xuaW1wb3J0IHtBamZEeW5hbWljVGFibGVXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL2R5bmFtaWMtdGFibGUtd2lkZ2V0JztcbmltcG9ydCB7QWpmRm9ybXVsYVdpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvZm9ybXVsYS13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZUNvbnRhaW5lcldpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvaW1hZ2UtY29udGFpbmVyLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy9pbWFnZS13aWRnZXQnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL21hcC13aWRnZXQnO1xuaW1wb3J0IHtBamZUYWJsZURhdGFzZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9kYXRhc2V0L3RhYmxlLWRhdGFzZXQnO1xuaW1wb3J0IHtBamZUYWJsZVdpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvdGFibGUtd2lkZ2V0JztcbmltcG9ydCB7QWpmVGV4dFdpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvdGV4dC13aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcbmltcG9ydCB7QWpmV2lkZ2V0V2l0aENvbnRlbnR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC13aXRoLWNvbnRlbnQnO1xuaW1wb3J0IHtldmFsdWF0ZUFnZ3JlZ2F0aW9ufSBmcm9tICcuLi9hZ2dyZWdhdGlvbi9ldmFsdWF0ZS1hZ2dyZWdhdGlvbic7XG5cbmltcG9ydCB7Y3JlYXRlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4vY3JlYXRlLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge3RyRm9ybXVsYX0gZnJvbSAnLi93aWRnZXQtaW5zdGFuY2UtdXRpbHMnO1xuXG5leHBvcnQgZnVuY3Rpb24gd2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShcbiAgICB3aWRnZXQ6IEFqZldpZGdldCwgY29udGV4dDogQWpmQ29udGV4dCwgdHM6IFRyYW5zbGF0ZVNlcnZpY2UpOiBBamZXaWRnZXRJbnN0YW5jZSB7XG4gIGNvbnN0IHdpID0gY3JlYXRlV2lkZ2V0SW5zdGFuY2Uod2lkZ2V0LCBjb250ZXh0LCB0cyk7XG5cbiAgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkNvbHVtbiB8fCB3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5MYXlvdXQpIHtcbiAgICBjb25zdCB3d2MgPSB3aWRnZXQgYXMgQWpmV2lkZ2V0V2l0aENvbnRlbnQ7XG4gICAgY29uc3Qgd3djaSA9IHdpIGFzIEFqZldpZGdldFdpdGhDb250ZW50SW5zdGFuY2U7XG4gICAgbGV0IGNvbnRlbnQgPSBbXSBhcyBBamZXaWRnZXRJbnN0YW5jZVtdO1xuICAgIHd3Yy5jb250ZW50LmZvckVhY2goYyA9PiB7XG4gICAgICBpZiAod3djLnJlcGV0aXRpb25zICE9IG51bGwpIHtcbiAgICAgICAgd3djaS5yZXBldGl0aW9ucyA9IGV2YWx1YXRlRXhwcmVzc2lvbih3d2MucmVwZXRpdGlvbnMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICAgIGlmICh0eXBlb2Ygd3djaS5yZXBldGl0aW9ucyA9PT0gJ251bWJlcicgJiYgd3djaS5yZXBldGl0aW9ucyA+IDApIHtcbiAgICAgICAgICBmb3IgKGxldCBpID0gMCA7IGkgPCB3d2NpLnJlcGV0aXRpb25zIDsgaSsrKSB7XG4gICAgICAgICAgICBjb250ZW50LnB1c2god2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCB7Li4uY29udGV4dCwgJyRyZXBldGl0aW9uJzogaX0sIHRzKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb250ZW50LnB1c2god2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShjLCBjb250ZXh0LCB0cykpO1xuICAgICAgfVxuICAgICAgd3djaS5jb250ZW50ID0gY29udGVudDtcbiAgICB9KTtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5DaGFydCkge1xuICAgIGNvbnN0IGN3ID0gd2lkZ2V0IGFzIEFqZkNoYXJ0V2lkZ2V0O1xuICAgIGNvbnN0IGN3aSA9IHdpIGFzIEFqZkNoYXJ0V2lkZ2V0SW5zdGFuY2U7XG4gICAgY29uc3QgbGFiZWxzID0gY3cubGFiZWxzIGluc3RhbmNlb2YgQXJyYXkgPyBjdy5sYWJlbHMgOiBbY3cubGFiZWxzXTtcbiAgICBjb25zdCBldkxhYmVscyA9IGxhYmVscy5tYXAobCA9PiB7XG4gICAgICBsZXQgZXZmID0gZXZhbHVhdGVFeHByZXNzaW9uKGwuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICB0cnkge1xuICAgICAgICBpZiAoZXZmIGluc3RhbmNlb2YgQXJyYXkpIHtcbiAgICAgICAgICBldmYgPSBldmYubWFwKHYgPT4gdiAhPSBudWxsICYmIHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2LnRyaW0oKS5sZW5ndGggPiAwXG4gICAgICAgICAgICA/IHRzLmluc3RhbnQodikgOiB2KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBldmYgPSBldmYgIT0gbnVsbCAmJiB0eXBlb2YgZXZmID09PSAnc3RyaW5nJyAmJiBldmYudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gdHMuaW5zdGFudChldmYpIDogZXZmO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChfZSkge1xuICAgICAgfVxuICAgICAgcmV0dXJuIGV2ZjtcbiAgICB9KTtcbiAgICBjd2kubGFiZWxzID0gY3cubGFiZWxzIGluc3RhbmNlb2YgQXJyYXkgPyBldkxhYmVscyA6IGV2TGFiZWxzWzBdO1xuICAgIGN3aS5kYXRhc2V0cyA9IGN3LmRhdGFzZXQubWFwKGQgPT4ge1xuICAgICAgbGV0IGRzOiBhbnkgPSB7XG4gICAgICAgIC4uLmQub3B0aW9ucyB8fCB7fSxcbiAgICAgICAgZGF0YTogZXZhbHVhdGVBZ2dyZWdhdGlvbihkLmFnZ3JlZ2F0aW9uLCBkLmZvcm11bGEsIGNvbnRleHQpLFxuICAgICAgfTtcbiAgICAgIGlmIChkLmNoYXJ0VHlwZSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGN0ID0gY2hhcnRUb0NoYXJ0SnNUeXBlKGQuY2hhcnRUeXBlKTtcbiAgICAgICAgZHMgPSB7Li4uZHMsIGNoYXJ0VHlwZTogY3QsIHR5cGU6IGN0IH07XG4gICAgICB9XG4gICAgICBpZiAoZC5vcHRpb25zICE9IG51bGwpIHtcbiAgICAgICAgZHMgPSB7Li4uZHMsIG9wdGlvbnM6IGQub3B0aW9uc307XG4gICAgICB9XG4gICAgICBpZiAoZC5sYWJlbCAhPSBudWxsKSB7XG4gICAgICAgIGRzID0gey4uLmRzLCBsYWJlbDogZC5sYWJlbH07XG4gICAgICB9XG4gICAgICBpZiAoZC5kYXRhbGFiZWxzICE9IG51bGwpIHtcbiAgICAgICAgZHMuZGF0YWxhYmVscyA9IGRlZXBDb3B5KGQuZGF0YWxhYmVscyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZHM7XG4gICAgfSk7XG4gICAgY3dpLmRhdGEgPSB7bGFiZWxzOiBjd2kubGFiZWxzLCBkYXRhc2V0czogY3dpLmRhdGFzZXRzfTtcbiAgICBjd2kuY2hhcnRUeXBlID0gY2hhcnRUb0NoYXJ0SnNUeXBlKGN3LnR5cGUgfHwgY3cuY2hhcnRUeXBlKTtcbiAgICBpZiAoY3cub3B0aW9ucyAhPSBudWxsICYmIGN3Lm9wdGlvbnMucGx1Z2lucyAhPSBudWxsKSB7XG4gICAgICBjb25zdCBwbHVnaW5zID0gY3cub3B0aW9ucy5wbHVnaW5zO1xuICAgICAgY29uc3QgcGx1Z2luTmFtZXMgPSBPYmplY3Qua2V5cyhwbHVnaW5zKTtcbiAgICAgIHBsdWdpbk5hbWVzLmZvckVhY2goKHBsdWdpbk5hbWUpID0+IHtcbiAgICAgICAgY29uc3QgcGx1Z2luID0gcGx1Z2luc1twbHVnaW5OYW1lXTtcbiAgICAgICAgY29uc3QgcGx1Z2luT3B0aW9ucyA9IE9iamVjdC5rZXlzKHBsdWdpbik7XG4gICAgICAgIHBsdWdpbk9wdGlvbnMuZm9yRWFjaCgocGx1Z2luT3B0aW9uTmFtZTogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgY29uc3QgcGx1Z2luT3B0aW9uID0gcGx1Z2luW3BsdWdpbk9wdGlvbk5hbWVdO1xuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIHR5cGVvZiBwbHVnaW5PcHRpb24gIT09ICdzdHJpbmcnICYmXG4gICAgICAgICAgICBwbHVnaW5PcHRpb24gIT0gbnVsbCAmJlxuICAgICAgICAgICAgcGx1Z2luT3B0aW9uLmZvcm11bGEgIT0gbnVsbFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgcGx1Z2luW3BsdWdpbk9wdGlvbk5hbWVdID0gZXZhbHVhdGVFeHByZXNzaW9uKHBsdWdpbk9wdGlvbi5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLlRhYmxlKSB7XG4gICAgY29uc3QgdHcgPSB3aWRnZXQgYXMgQWpmVGFibGVXaWRnZXQ7XG4gICAgY29uc3QgdHdpID0gd2kgYXMgQWpmVGFibGVXaWRnZXRJbnN0YW5jZTtcblxuICAgIHR3aS5kYXRhc2V0ID0gdHcuZGF0YXNldC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICByZXR1cm4gY2VsbC5mb3JtdWxhIGluc3RhbmNlb2YgQXJyYXkgP1xuICAgICAgICBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYgYXMgQWpmRm9ybXVsYSwgY29udGV4dCBhcyBBamZDb250ZXh0LCB0cykpIDpcbiAgICAgICAgdHJGb3JtdWxhKGNlbGwuZm9ybXVsYSEsIGNvbnRleHQgYXMgQWpmQ29udGV4dCwgdHMpO1xuICAgIH0pKTtcblxuICAgIHR3aS5kYXRhID0gKHR3LmRhdGFzZXQgfHwgW10pXG4gICAgICAubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV2YWx1YXRlRXhwcmVzc2lvbihjZWxsLmZvcm11bGEuZm9ybXVsYSwgY29udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7Li4udHcuY2VsbFN0eWxlcywgLi4uY2VsbC5zdHlsZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3NwYW46IGNlbGwucm93c3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sc3BhbjogY2VsbC5jb2xzcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpKTtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5EeW5hbWljVGFibGUpIHtcbiAgICBjb25zdCB0ZHcgPSB3aWRnZXQgYXMgQWpmRHluYW1pY1RhYmxlV2lkZ2V0O1xuICAgIGNvbnN0IHRkd2kgPSB3aSBhcyBBamZUYWJsZVdpZGdldEluc3RhbmNlO1xuXG4gICAgdGR3aS5kYXRhc2V0ID0gdGR3LmRhdGFzZXQubWFwKChjZWxsOiBBamZUYWJsZURhdGFzZXQpID0+IHtcbiAgICAgIHJldHVybiBjZWxsLmZvcm11bGEgaW5zdGFuY2VvZiBBcnJheSA/XG4gICAgICAgIGNlbGwuZm9ybXVsYS5tYXAoZiA9PiB0ckZvcm11bGEoZiBhcyBBamZGb3JtdWxhLCBjb250ZXh0LCB0cykpIDpcbiAgICAgICAgdHJGb3JtdWxhKGNlbGwuZm9ybXVsYSEsIGNvbnRleHQsIHRzKTtcbiAgICB9KTtcbiAgICBjb25zdCBkYXRhc2V0ID0gZXZhbHVhdGVFeHByZXNzaW9uKHRkdy5yb3dEZWZpbml0aW9uLmZvcm11bGEsIGNvbnRleHQpIHx8IFtdO1xuXG4gICAgY29uc3QgaGVhZGVyID0gKHRkdy5kYXRhc2V0IHx8IFtdKS5tYXAoY2VsbCA9PiAoe1xuICAgICAgdmFsdWU6IGV2YWx1YXRlRXhwcmVzc2lvbihjZWxsLmZvcm11bGEuZm9ybXVsYSwgY29udGV4dCksXG4gICAgICBzdHlsZTogey4uLnRkdy5jZWxsU3R5bGVzLCAuLi5jZWxsLnN0eWxlfSxcbiAgICAgIHJvd3NwYW46IGNlbGwucm93c3BhbixcbiAgICAgIGNvbHNwYW46IGNlbGwuY29sc3BhbixcbiAgICB9KSk7XG4gICAgdGR3aS5kYXRhID0gW1suLi5oZWFkZXJdLCAuLi5kYXRhc2V0XTtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5JbWFnZSkge1xuICAgIGNvbnN0IGl3ID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgIGNvbnN0IGl3aSA9IHdpIGFzIEFqZkltYWdlV2lkZ2V0SW5zdGFuY2U7XG4gICAgaWYgKGl3LmZsYWcpIHtcbiAgICAgIGl3aS5mbGFnID0gZXZhbHVhdGVFeHByZXNzaW9uKGl3LmZsYWcuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChpdy5pY29uKSB7XG4gICAgICBpd2kuaWNvbiA9IGV2YWx1YXRlRXhwcmVzc2lvbihpdy5pY29uLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgICBpZiAoaXcudXJsKSB7XG4gICAgICBpd2kudXJsID0gZXZhbHVhdGVFeHByZXNzaW9uKGl3LnVybC5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuSW1hZ2VDb250YWluZXIpIHtcbiAgICBjb25zdCBpY3cgPSB3aWRnZXQgYXMgQWpmSW1hZ2VDb250YWluZXJXaWRnZXQ7XG4gICAgY29uc3QgaWN3aSA9IHdpIGFzIEFqZkltYWdlQ29udGFpbmVyV2lkZ2V0SW5zdGFuY2U7XG4gICAgaWYgKGljdy5mbGFncykge1xuICAgICAgaWN3aS5mbGFncyA9IGljdy5mbGFncyBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgID8gaWN3LmZsYWdzLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKVxuICAgICAgICA6IGV2YWx1YXRlRXhwcmVzc2lvbihpY3cuZmxhZ3MuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChpY3cuaWNvbnMpIHtcbiAgICAgIGljd2kuaWNvbnMgPSBpY3cuaWNvbnMgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICA/IGljdy5pY29ucy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSlcbiAgICAgICAgOiBldmFsdWF0ZUV4cHJlc3Npb24oaWN3Lmljb25zLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgICBpZiAoaWN3LnVybHMpIHtcbiAgICAgIGljd2kudXJscyA9IGljdy51cmxzIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgPyBpY3cudXJscy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSlcbiAgICAgICAgOiBldmFsdWF0ZUV4cHJlc3Npb24oaWN3LnVybHMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLlRleHQpIHtcbiAgICBjb25zdCB0ZXcgPSB3aWRnZXQgYXMgQWpmVGV4dFdpZGdldDtcbiAgICBjb25zdCB0ZXdpID0gd2kgYXMgQWpmVGV4dFdpZGdldEluc3RhbmNlO1xuICAgIGNvbnN0IGZvcm11bGFSZWdFeDogUmVnRXhwID0gL1xcW3syfSguKz8pXFxdezJ9L2c7XG4gICAgY29uc3QgbWF0Y2hlczoge2lkeDogbnVtYmVyLCBsZW46IG51bWJlciwgZm9ybXVsYTogQWpmRm9ybXVsYX1bXSA9IFtdO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5fG51bGw7XG4gICAgbGV0IGh0bWxUZXh0ID0gdGV3Lmh0bWxUZXh0O1xuICAgIHdoaWxlIChtYXRjaCA9IGZvcm11bGFSZWdFeC5leGVjKGh0bWxUZXh0KSkge1xuICAgICAgY29uc3QgaWR4ID0gbWF0Y2guaW5kZXg7XG4gICAgICBjb25zdCBsZW4gPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICBjb25zdCBmb3JtdWxhID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogbWF0Y2hbMV19KTtcbiAgICAgIG1hdGNoZXMucHVzaCh7aWR4LCBsZW4sIGZvcm11bGF9KTtcbiAgICB9XG4gICAgbWF0Y2hlcy5yZXZlcnNlKCkuZm9yRWFjaCgobSkgPT4ge1xuICAgICAgbGV0IGNhbGNWYWx1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNhbGNWYWx1ZSA9IGV2YWx1YXRlRXhwcmVzc2lvbihtLmZvcm11bGEuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhbGNWYWx1ZSA9ICcnO1xuICAgICAgfVxuICAgICAgaHRtbFRleHQgPSBgJHtodG1sVGV4dC5zdWJzdHIoMCwgbS5pZHgpfSR7Y2FsY1ZhbHVlfSR7aHRtbFRleHQuc3Vic3RyKG0uaWR4ICsgbS5sZW4pfWA7XG4gICAgfSk7XG4gICAgdGV3aS5odG1sVGV4dCA9IGh0bWxUZXh0ICE9IG51bGwgJiYgaHRtbFRleHQubGVuZ3RoID4gMCA/IHRzLmluc3RhbnQoaHRtbFRleHQpIDogaHRtbFRleHQ7XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuRm9ybXVsYSkge1xuICAgIGNvbnN0IGZ3ID0gd2lkZ2V0IGFzIEFqZkZvcm11bGFXaWRnZXQ7XG4gICAgY29uc3QgZndpID0gd2kgYXMgQWpmRm9ybXVsYVdpZGdldEluc3RhbmNlO1xuICAgIGZ3aS5mb3JtdWxhID0gZXZhbHVhdGVFeHByZXNzaW9uKGZ3LmZvcm11bGEuZm9ybXVsYSwgY29udGV4dCk7XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTWFwKSB7XG4gICAgY29uc3QgbXcgPSB3aWRnZXQgYXMgQWpmTWFwV2lkZ2V0O1xuICAgIGNvbnN0IG13aSA9IHdpIGFzIEFqZk1hcFdpZGdldEluc3RhbmNlO1xuICAgIG13aS5jb29yZGluYXRlID0gZXZhbHVhdGVFeHByZXNzaW9uKG13LmNvb3JkaW5hdGUuZm9ybXVsYSwgY29udGV4dCk7XG4gIH1cbiAgcmV0dXJuIHdpO1xufVxuIl19