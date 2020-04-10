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
                    v => v != null && typeof v === 'string' && v.trim().length > 0 ? ts.instant(v) : v));
                }
                else {
                    evf = evf != null && typeof evf === 'string' && evf.trim().length > 0 ? ts.instant(evf) :
                        evf;
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
                    if (typeof pluginOption !== 'string' && pluginOption != null &&
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
        twi.data = (tw.dataset ||
            []).map((/**
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
            icwi.flags = icw.flags instanceof Array ?
                icw.flags.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => evaluateExpression(f.formula, context))) :
                evaluateExpression(icw.flags.formula, context);
        }
        if (icw.icons) {
            icwi.icons = icw.icons instanceof Array ?
                icw.icons.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => evaluateExpression(f.formula, context))) :
                evaluateExpression(icw.icons.formula, context);
        }
        if (icw.urls) {
            icwi.urls = icw.urls instanceof Array ?
                icw.urls.map((/**
                 * @param {?} f
                 * @return {?}
                 */
                f => evaluateExpression(f.formula, context))) :
                evaluateExpression(icw.urls.formula, context);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQXlCLGFBQWEsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzNGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQXdCckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRWxFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRXhFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDO0FBQzlELE9BQU8sRUFBQyxTQUFTLEVBQUMsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7OztBQUVsRCxNQUFNLFVBQVUsc0JBQXNCLENBQ2xDLE1BQWlCLEVBQUUsT0FBbUIsRUFBRSxFQUFvQjs7VUFDeEQsRUFBRSxHQUFHLG9CQUFvQixDQUFDLE1BQU0sRUFBRSxPQUFPLEVBQUUsRUFBRSxDQUFDO0lBRXBELElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxVQUFVLEtBQUssYUFBYSxDQUFDLE1BQU0sRUFBRTs7Y0FDdEYsR0FBRyxHQUFHLG1CQUFBLE1BQU0sRUFBd0I7O2NBQ3BDLElBQUksR0FBRyxtQkFBQSxFQUFFLEVBQWdDOztZQUMzQyxPQUFPLEdBQUcsbUJBQUEsRUFBRSxFQUF1QjtRQUN2QyxHQUFHLENBQUMsT0FBTyxDQUFDLE9BQU87Ozs7UUFBQyxD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LENBQUM7UUFDekYsQ0FBQyxFQUFDLENBQUM7UUFDSCxJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsSUFBSSxJQUFJLElBQUksUUFBUSxDQUFDLE1BQU0sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQztLQUMzRjtTQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsT0FBTyxFQUFFOztjQUNoRCxFQUFFLEdBQUcsbUJBQUEsTUFBTSxFQUFvQjs7Y0FDL0IsR0FBRyxHQUFHLG1CQUFBLEVBQUUsRUFBNEI7UUFDMUMsR0FBRyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztLQUMvRDtTQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsR0FBRyxFQUFFOztjQUM1QyxFQUFFLEdBQUcsbUJBQUEsTUFBTSxFQUFnQjs7Y0FDM0IsR0FBRyxHQUFHLG1CQUFBLEVBQUUsRUFBd0I7UUFDdEMsR0FBRyxDQUFDLFVBQVUsR0FBRyxrQkFBa0IsQ0FBQyxFQUFFLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUMsQ0FBQztLQUNyRTtJQUNELE9BQU8sRUFBRSxDQUFDO0FBQ1osQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb250ZXh0LCBBamZGb3JtdWxhLCBjcmVhdGVGb3JtdWxhLCBldmFsdWF0ZUV4cHJlc3Npb259IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuaW1wb3J0IHtkZWVwQ29weX0gZnJvbSAnQGFqZi9jb3JlL3V0aWxzJztcbmltcG9ydCB7VHJhbnNsYXRlU2VydmljZX0gZnJvbSAnQG5neC10cmFuc2xhdGUvY29yZSc7XG5cbmltcG9ydCB7Y2hhcnRUb0NoYXJ0SnNUeXBlfSBmcm9tICcuLi8uLi9jaGFydC11dGlscyc7XG5pbXBvcnQge0FqZlRhYmxlRGF0YXNldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL2RhdGFzZXQvdGFibGUtZGF0YXNldCc7XG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9jaGFydC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZGb3JtdWxhV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9mb3JtdWxhLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBBamZJbWFnZUNvbnRhaW5lcldpZGdldEluc3RhbmNlXG59IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9pbWFnZS1jb250YWluZXItd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmSW1hZ2VXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2ltYWdlLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk1hcFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvbWFwLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRhYmxlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy90YWJsZS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUZXh0V2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy90ZXh0LXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZldpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZldpZGdldFdpdGhDb250ZW50SW5zdGFuY2Vcbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC13aXRoLWNvbnRlbnQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZDaGFydFdpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvY2hhcnQtd2lkZ2V0JztcbmltcG9ydCB7QWpmRHluYW1pY1RhYmxlV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy9keW5hbWljLXRhYmxlLXdpZGdldCc7XG5pbXBvcnQge0FqZkZvcm11bGFXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL2Zvcm11bGEtd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VDb250YWluZXJXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZVdpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvaW1hZ2Utd2lkZ2V0JztcbmltcG9ydCB7QWpmTWFwV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy9tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmVGFibGVXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL3RhYmxlLXdpZGdldCc7XG5pbXBvcnQge0FqZlRleHRXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL3RleHQtd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5pbXBvcnQge0FqZldpZGdldFdpdGhDb250ZW50fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtd2l0aC1jb250ZW50JztcbmltcG9ydCB7ZXZhbHVhdGVBZ2dyZWdhdGlvbn0gZnJvbSAnLi4vYWdncmVnYXRpb24vZXZhbHVhdGUtYWdncmVnYXRpb24nO1xuXG5pbXBvcnQge2NyZWF0ZVdpZGdldEluc3RhbmNlfSBmcm9tICcuL2NyZWF0ZS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHt0ckZvcm11bGF9IGZyb20gJy4vd2lkZ2V0LWluc3RhbmNlLXV0aWxzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHdpZGdldFRvV2lkZ2V0SW5zdGFuY2UoXG4gICAgd2lkZ2V0OiBBamZXaWRnZXQsIGNvbnRleHQ6IEFqZkNvbnRleHQsIHRzOiBUcmFuc2xhdGVTZXJ2aWNlKTogQWpmV2lkZ2V0SW5zdGFuY2Uge1xuICBjb25zdCB3aSA9IGNyZWF0ZVdpZGdldEluc3RhbmNlKHdpZGdldCwgY29udGV4dCwgdHMpO1xuXG4gIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5Db2x1bW4gfHwgd2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0KSB7XG4gICAgY29uc3Qgd3djID0gd2lkZ2V0IGFzIEFqZldpZGdldFdpdGhDb250ZW50O1xuICAgIGNvbnN0IHd3Y2kgPSB3aSBhcyBBamZXaWRnZXRXaXRoQ29udGVudEluc3RhbmNlO1xuICAgIGxldCBjb250ZW50ID0gW10gYXMgQWpmV2lkZ2V0SW5zdGFuY2VbXTtcbiAgICB3d2MuY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgaWYgKHd3Yy5yZXBldGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIHd3Y2kucmVwZXRpdGlvbnMgPSBldmFsdWF0ZUV4cHJlc3Npb24od3djLnJlcGV0aXRpb25zLmZvcm11bGEsIGNvbnRleHQpO1xuICAgICAgICBpZiAodHlwZW9mIHd3Y2kucmVwZXRpdGlvbnMgPT09ICdudW1iZXInICYmIHd3Y2kucmVwZXRpdGlvbnMgPiAwKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCB3d2NpLnJlcGV0aXRpb25zOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaCh3aWRnZXRUb1dpZGdldEluc3RhbmNlKGMsIHsuLi5jb250ZXh0LCAnJHJlcGV0aXRpb24nOiBpfSwgdHMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQucHVzaCh3aWRnZXRUb1dpZGdldEluc3RhbmNlKGMsIGNvbnRleHQsIHRzKSk7XG4gICAgICB9XG4gICAgICB3d2NpLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkNoYXJ0KSB7XG4gICAgY29uc3QgY3cgPSB3aWRnZXQgYXMgQWpmQ2hhcnRXaWRnZXQ7XG4gICAgY29uc3QgY3dpID0gd2kgYXMgQWpmQ2hhcnRXaWRnZXRJbnN0YW5jZTtcbiAgICBjb25zdCBsYWJlbHMgPSBjdy5sYWJlbHMgaW5zdGFuY2VvZiBBcnJheSA/IGN3LmxhYmVscyA6IFtjdy5sYWJlbHNdO1xuICAgIGNvbnN0IGV2TGFiZWxzID0gbGFiZWxzLm1hcChsID0+IHtcbiAgICAgIGxldCBldmYgPSBldmFsdWF0ZUV4cHJlc3Npb24obC5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChldmYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGV2ZiA9IGV2Zi5tYXAoXG4gICAgICAgICAgICAgIHYgPT4gdiAhPSBudWxsICYmIHR5cGVvZiB2ID09PSAnc3RyaW5nJyAmJiB2LnRyaW0oKS5sZW5ndGggPiAwID8gdHMuaW5zdGFudCh2KSA6IHYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZiA9IGV2ZiAhPSBudWxsICYmIHR5cGVvZiBldmYgPT09ICdzdHJpbmcnICYmIGV2Zi50cmltKCkubGVuZ3RoID4gMCA/IHRzLmluc3RhbnQoZXZmKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZXZmO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChfZSkge1xuICAgICAgfVxuICAgICAgcmV0dXJuIGV2ZjtcbiAgICB9KTtcbiAgICBjd2kubGFiZWxzID0gY3cubGFiZWxzIGluc3RhbmNlb2YgQXJyYXkgPyBldkxhYmVscyA6IGV2TGFiZWxzWzBdO1xuICAgIGN3aS5kYXRhc2V0cyA9IGN3LmRhdGFzZXQubWFwKGQgPT4ge1xuICAgICAgbGV0IGRzOiBhbnkgPSB7XG4gICAgICAgIC4uLmQub3B0aW9ucyB8fCB7fSxcbiAgICAgICAgZGF0YTogZXZhbHVhdGVBZ2dyZWdhdGlvbihkLmFnZ3JlZ2F0aW9uLCBkLmZvcm11bGEsIGNvbnRleHQpLFxuICAgICAgfTtcbiAgICAgIGlmIChkLmNoYXJ0VHlwZSAhPSBudWxsKSB7XG4gICAgICAgIGNvbnN0IGN0ID0gY2hhcnRUb0NoYXJ0SnNUeXBlKGQuY2hhcnRUeXBlKTtcbiAgICAgICAgZHMgPSB7Li4uZHMsIGNoYXJ0VHlwZTogY3QsIHR5cGU6IGN0fTtcbiAgICAgIH1cbiAgICAgIGlmIChkLm9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBkcyA9IHsuLi5kcywgb3B0aW9uczogZC5vcHRpb25zfTtcbiAgICAgIH1cbiAgICAgIGlmIChkLmxhYmVsICE9IG51bGwpIHtcbiAgICAgICAgZHMgPSB7Li4uZHMsIGxhYmVsOiBkLmxhYmVsfTtcbiAgICAgIH1cbiAgICAgIGlmIChkLmRhdGFsYWJlbHMgIT0gbnVsbCkge1xuICAgICAgICBkcy5kYXRhbGFiZWxzID0gZGVlcENvcHkoZC5kYXRhbGFiZWxzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkcztcbiAgICB9KTtcbiAgICBjd2kuZGF0YSA9IHtsYWJlbHM6IGN3aS5sYWJlbHMsIGRhdGFzZXRzOiBjd2kuZGF0YXNldHN9O1xuICAgIGN3aS5jaGFydFR5cGUgPSBjaGFydFRvQ2hhcnRKc1R5cGUoY3cudHlwZSB8fCBjdy5jaGFydFR5cGUpO1xuICAgIGlmIChjdy5vcHRpb25zICE9IG51bGwgJiYgY3cub3B0aW9ucy5wbHVnaW5zICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHBsdWdpbnMgPSBjdy5vcHRpb25zLnBsdWdpbnM7XG4gICAgICBjb25zdCBwbHVnaW5OYW1lcyA9IE9iamVjdC5rZXlzKHBsdWdpbnMpO1xuICAgICAgcGx1Z2luTmFtZXMuZm9yRWFjaCgocGx1Z2luTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5zW3BsdWdpbk5hbWVdO1xuICAgICAgICBjb25zdCBwbHVnaW5PcHRpb25zID0gT2JqZWN0LmtleXMocGx1Z2luKTtcbiAgICAgICAgcGx1Z2luT3B0aW9ucy5mb3JFYWNoKChwbHVnaW5PcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBwbHVnaW5PcHRpb24gPSBwbHVnaW5bcGx1Z2luT3B0aW9uTmFtZV07XG4gICAgICAgICAgaWYgKHR5cGVvZiBwbHVnaW5PcHRpb24gIT09ICdzdHJpbmcnICYmIHBsdWdpbk9wdGlvbiAhPSBudWxsICYmXG4gICAgICAgICAgICAgIHBsdWdpbk9wdGlvbi5mb3JtdWxhICE9IG51bGwpIHtcbiAgICAgICAgICAgIHBsdWdpbltwbHVnaW5PcHRpb25OYW1lXSA9IGV2YWx1YXRlRXhwcmVzc2lvbihwbHVnaW5PcHRpb24uZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5UYWJsZSkge1xuICAgIGNvbnN0IHR3ID0gd2lkZ2V0IGFzIEFqZlRhYmxlV2lkZ2V0O1xuICAgIGNvbnN0IHR3aSA9IHdpIGFzIEFqZlRhYmxlV2lkZ2V0SW5zdGFuY2U7XG5cbiAgICB0d2kuZGF0YXNldCA9IHR3LmRhdGFzZXQubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgcmV0dXJuIGNlbGwuZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5ID9cbiAgICAgICAgICBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYgYXMgQWpmRm9ybXVsYSwgY29udGV4dCBhcyBBamZDb250ZXh0LCB0cykpIDpcbiAgICAgICAgICB0ckZvcm11bGEoY2VsbC5mb3JtdWxhISwgY29udGV4dCBhcyBBamZDb250ZXh0LCB0cyk7XG4gICAgfSkpO1xuXG4gICAgdHdpLmRhdGEgPSAodHcuZGF0YXNldCB8fFxuICAgICAgICAgICAgICAgIFtdKS5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXZhbHVhdGVFeHByZXNzaW9uKGNlbGwuZm9ybXVsYS5mb3JtdWxhLCBjb250ZXh0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsuLi50dy5jZWxsU3R5bGVzLCAuLi5jZWxsLnN0eWxlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93c3BhbjogY2VsbC5yb3dzcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzcGFuOiBjZWxsLmNvbHNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xuICB9IGVsc2UgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkR5bmFtaWNUYWJsZSkge1xuICAgIGNvbnN0IHRkdyA9IHdpZGdldCBhcyBBamZEeW5hbWljVGFibGVXaWRnZXQ7XG4gICAgY29uc3QgdGR3aSA9IHdpIGFzIEFqZlRhYmxlV2lkZ2V0SW5zdGFuY2U7XG5cbiAgICB0ZHdpLmRhdGFzZXQgPSB0ZHcuZGF0YXNldC5tYXAoKGNlbGw6IEFqZlRhYmxlRGF0YXNldCkgPT4ge1xuICAgICAgcmV0dXJuIGNlbGwuZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5ID9cbiAgICAgICAgICBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYgYXMgQWpmRm9ybXVsYSwgY29udGV4dCwgdHMpKSA6XG4gICAgICAgICAgdHJGb3JtdWxhKGNlbGwuZm9ybXVsYSEsIGNvbnRleHQsIHRzKTtcbiAgICB9KTtcbiAgICBjb25zdCBkYXRhc2V0ID0gZXZhbHVhdGVFeHByZXNzaW9uKHRkdy5yb3dEZWZpbml0aW9uLmZvcm11bGEsIGNvbnRleHQpIHx8IFtdO1xuXG4gICAgY29uc3QgaGVhZGVyID1cbiAgICAgICAgKHRkdy5kYXRhc2V0IHx8IFtdKS5tYXAoY2VsbCA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiBldmFsdWF0ZUV4cHJlc3Npb24oY2VsbC5mb3JtdWxhLmZvcm11bGEsIGNvbnRleHQpLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7Li4udGR3LmNlbGxTdHlsZXMsIC4uLmNlbGwuc3R5bGV9LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3NwYW46IGNlbGwucm93c3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzcGFuOiBjZWxsLmNvbHNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pKTtcbiAgICB0ZHdpLmRhdGEgPSBbWy4uLmhlYWRlcl0sIC4uLmRhdGFzZXRdO1xuICB9IGVsc2UgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkltYWdlKSB7XG4gICAgY29uc3QgaXcgPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgY29uc3QgaXdpID0gd2kgYXMgQWpmSW1hZ2VXaWRnZXRJbnN0YW5jZTtcbiAgICBpZiAoaXcuZmxhZykge1xuICAgICAgaXdpLmZsYWcgPSBldmFsdWF0ZUV4cHJlc3Npb24oaXcuZmxhZy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGl3Lmljb24pIHtcbiAgICAgIGl3aS5pY29uID0gZXZhbHVhdGVFeHByZXNzaW9uKGl3Lmljb24uZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChpdy51cmwpIHtcbiAgICAgIGl3aS51cmwgPSBldmFsdWF0ZUV4cHJlc3Npb24oaXcudXJsLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5JbWFnZUNvbnRhaW5lcikge1xuICAgIGNvbnN0IGljdyA9IHdpZGdldCBhcyBBamZJbWFnZUNvbnRhaW5lcldpZGdldDtcbiAgICBjb25zdCBpY3dpID0gd2kgYXMgQWpmSW1hZ2VDb250YWluZXJXaWRnZXRJbnN0YW5jZTtcbiAgICBpZiAoaWN3LmZsYWdzKSB7XG4gICAgICBpY3dpLmZsYWdzID0gaWN3LmZsYWdzIGluc3RhbmNlb2YgQXJyYXkgP1xuICAgICAgICAgIGljdy5mbGFncy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSkgOlxuICAgICAgICAgIGV2YWx1YXRlRXhwcmVzc2lvbihpY3cuZmxhZ3MuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChpY3cuaWNvbnMpIHtcbiAgICAgIGljd2kuaWNvbnMgPSBpY3cuaWNvbnMgaW5zdGFuY2VvZiBBcnJheSA/XG4gICAgICAgICAgaWN3Lmljb25zLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKSA6XG4gICAgICAgICAgZXZhbHVhdGVFeHByZXNzaW9uKGljdy5pY29ucy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGljdy51cmxzKSB7XG4gICAgICBpY3dpLnVybHMgPSBpY3cudXJscyBpbnN0YW5jZW9mIEFycmF5ID9cbiAgICAgICAgICBpY3cudXJscy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSkgOlxuICAgICAgICAgIGV2YWx1YXRlRXhwcmVzc2lvbihpY3cudXJscy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuVGV4dCkge1xuICAgIGNvbnN0IHRldyA9IHdpZGdldCBhcyBBamZUZXh0V2lkZ2V0O1xuICAgIGNvbnN0IHRld2kgPSB3aSBhcyBBamZUZXh0V2lkZ2V0SW5zdGFuY2U7XG4gICAgY29uc3QgZm9ybXVsYVJlZ0V4OiBSZWdFeHAgPSAvXFxbezJ9KC4rPylcXF17Mn0vZztcbiAgICBjb25zdCBtYXRjaGVzOiB7aWR4OiBudW1iZXIsIGxlbjogbnVtYmVyLCBmb3JtdWxhOiBBamZGb3JtdWxhfVtdID0gW107XG4gICAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXl8bnVsbDtcbiAgICBsZXQgaHRtbFRleHQgPSB0ZXcuaHRtbFRleHQ7XG4gICAgd2hpbGUgKG1hdGNoID0gZm9ybXVsYVJlZ0V4LmV4ZWMoaHRtbFRleHQpKSB7XG4gICAgICBjb25zdCBpZHggPSBtYXRjaC5pbmRleDtcbiAgICAgIGNvbnN0IGxlbiA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIGNvbnN0IGZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBtYXRjaFsxXX0pO1xuICAgICAgbWF0Y2hlcy5wdXNoKHtpZHgsIGxlbiwgZm9ybXVsYX0pO1xuICAgIH1cbiAgICBtYXRjaGVzLnJldmVyc2UoKS5mb3JFYWNoKChtKSA9PiB7XG4gICAgICBsZXQgY2FsY1ZhbHVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2FsY1ZhbHVlID0gZXZhbHVhdGVFeHByZXNzaW9uKG0uZm9ybXVsYS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FsY1ZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgICBodG1sVGV4dCA9IGAke2h0bWxUZXh0LnN1YnN0cigwLCBtLmlkeCl9JHtjYWxjVmFsdWV9JHtodG1sVGV4dC5zdWJzdHIobS5pZHggKyBtLmxlbil9YDtcbiAgICB9KTtcbiAgICB0ZXdpLmh0bWxUZXh0ID0gaHRtbFRleHQgIT0gbnVsbCAmJiBodG1sVGV4dC5sZW5ndGggPiAwID8gdHMuaW5zdGFudChodG1sVGV4dCkgOiBodG1sVGV4dDtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5Gb3JtdWxhKSB7XG4gICAgY29uc3QgZncgPSB3aWRnZXQgYXMgQWpmRm9ybXVsYVdpZGdldDtcbiAgICBjb25zdCBmd2kgPSB3aSBhcyBBamZGb3JtdWxhV2lkZ2V0SW5zdGFuY2U7XG4gICAgZndpLmZvcm11bGEgPSBldmFsdWF0ZUV4cHJlc3Npb24oZncuZm9ybXVsYS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5NYXApIHtcbiAgICBjb25zdCBtdyA9IHdpZGdldCBhcyBBamZNYXBXaWRnZXQ7XG4gICAgY29uc3QgbXdpID0gd2kgYXMgQWpmTWFwV2lkZ2V0SW5zdGFuY2U7XG4gICAgbXdpLmNvb3JkaW5hdGUgPSBldmFsdWF0ZUV4cHJlc3Npb24obXcuY29vcmRpbmF0ZS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgfVxuICByZXR1cm4gd2k7XG59XG4iXX0=