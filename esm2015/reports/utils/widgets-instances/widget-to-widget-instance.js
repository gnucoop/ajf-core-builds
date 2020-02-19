/**
 * @fileoverview added by tsickle
 * Generated from: src/core/reports/utils/widgets-instances/widget-to-widget-instance.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
        /** @type {?} */
        const trFormula = (/**
         * @param {?} f
         * @return {?}
         */
        (f) => {
            /** @type {?} */
            let formula = f.formula;
            if (formula.substr(0, 1) === '"') {
                /** @type {?} */
                const ft = formula.slice(1, -1);
                /** @type {?} */
                const transFt = ft != null && typeof ft === 'string' && ft.trim().length > 0
                    ? ts.instant(ft) : ft;
                if (ft.length > 0) {
                    formula = `"${transFt}"`;
                }
            }
            else {
                formula = formula != null && typeof formula === 'string' && formula.trim().length > 0
                    ? ts.instant(formula) : formula;
            }
            return evaluateExpression(formula, context);
        });
        twi.dataset = tw.dataset.map((/**
         * @param {?} row
         * @return {?}
         */
        row => row.map((/**
         * @param {?} cell
         * @return {?}
         */
        cell => {
            return cell.formula instanceof Array ? cell.formula.map((/**
             * @param {?} f
             * @return {?}
             */
            f => trFormula((/** @type {?} */ (f))))) :
                trFormula((/** @type {?} */ (cell.formula)));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQXlCLGFBQWEsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzNGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQXNCckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRWxFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRXhFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7O0FBRTlELE1BQU0sVUFBVSxzQkFBc0IsQ0FDbEMsTUFBaUIsRUFBRSxPQUFtQixFQUFFLEVBQW9COztVQUN4RCxFQUFFLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUM7SUFDcEQsSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxFQUFFOztjQUN0RixHQUFHLEdBQUcsbUJBQUEsTUFBTSxFQUF3Qjs7Y0FDcEMsSUFBSSxHQUFHLG1CQUFBLEVBQUUsRUFBZ0M7O1lBQzNDLE9BQU8sR0FBRyxtQkFBQSxFQUFFLEVBQXVCO1FBQ3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksR0FBRyxDQUFDLFdBQVcsSUFB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LGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO1NBQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7O2NBQzVDLEVBQUUsR0FBRyxtQkFBQSxNQUFNLEVBQWdCOztjQUMzQixHQUFHLEdBQUcsbUJBQUEsRUFBRSxFQUF3QjtRQUN0QyxHQUFHLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3JFO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSAyMDE4IEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQ29udGV4dCwgQWpmRm9ybXVsYSwgY3JlYXRlRm9ybXVsYSwgZXZhbHVhdGVFeHByZXNzaW9ufSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcbmltcG9ydCB7ZGVlcENvcHl9IGZyb20gJ0BhamYvY29yZS91dGlscyc7XG5pbXBvcnQge1RyYW5zbGF0ZVNlcnZpY2V9IGZyb20gJ0BuZ3gtdHJhbnNsYXRlL2NvcmUnO1xuXG5pbXBvcnQge2NoYXJ0VG9DaGFydEpzVHlwZX0gZnJvbSAnLi4vLi4vY2hhcnQtdXRpbHMnO1xuaW1wb3J0IHtBamZDaGFydFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvY2hhcnQtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmRm9ybXVsYVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvZm9ybXVsYS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmSW1hZ2VDb250YWluZXJXaWRnZXRJbnN0YW5jZVxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvaW1hZ2UtY29udGFpbmVyLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkltYWdlV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9pbWFnZS13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZNYXBXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL21hcC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZUYWJsZVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvdGFibGUtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGV4dFdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvdGV4dC13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3dpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge1xuICBBamZXaWRnZXRXaXRoQ29udGVudEluc3RhbmNlXG59IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtd2l0aC1jb250ZW50LWluc3RhbmNlJztcbmltcG9ydCB7QWpmQ2hhcnRXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL2NoYXJ0LXdpZGdldCc7XG5pbXBvcnQge0FqZkZvcm11bGFXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL2Zvcm11bGEtd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VDb250YWluZXJXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL2ltYWdlLWNvbnRhaW5lci13aWRnZXQnO1xuaW1wb3J0IHtBamZJbWFnZVdpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvaW1hZ2Utd2lkZ2V0JztcbmltcG9ydCB7QWpmTWFwV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy9tYXAtd2lkZ2V0JztcbmltcG9ydCB7QWpmVGFibGVXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL3RhYmxlLXdpZGdldCc7XG5pbXBvcnQge0FqZlRleHRXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL3RleHQtd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5pbXBvcnQge0FqZldpZGdldFdpdGhDb250ZW50fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtd2l0aC1jb250ZW50JztcbmltcG9ydCB7ZXZhbHVhdGVBZ2dyZWdhdGlvbn0gZnJvbSAnLi4vYWdncmVnYXRpb24vZXZhbHVhdGUtYWdncmVnYXRpb24nO1xuXG5pbXBvcnQge2NyZWF0ZVdpZGdldEluc3RhbmNlfSBmcm9tICcuL2NyZWF0ZS13aWRnZXQtaW5zdGFuY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gd2lkZ2V0VG9XaWRnZXRJbnN0YW5jZShcbiAgICB3aWRnZXQ6IEFqZldpZGdldCwgY29udGV4dDogQWpmQ29udGV4dCwgdHM6IFRyYW5zbGF0ZVNlcnZpY2UpOiBBamZXaWRnZXRJbnN0YW5jZSB7XG4gIGNvbnN0IHdpID0gY3JlYXRlV2lkZ2V0SW5zdGFuY2Uod2lkZ2V0LCBjb250ZXh0LCB0cyk7XG4gIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5Db2x1bW4gfHwgd2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTGF5b3V0KSB7XG4gICAgY29uc3Qgd3djID0gd2lkZ2V0IGFzIEFqZldpZGdldFdpdGhDb250ZW50O1xuICAgIGNvbnN0IHd3Y2kgPSB3aSBhcyBBamZXaWRnZXRXaXRoQ29udGVudEluc3RhbmNlO1xuICAgIGxldCBjb250ZW50ID0gW10gYXMgQWpmV2lkZ2V0SW5zdGFuY2VbXTtcbiAgICB3d2MuY29udGVudC5mb3JFYWNoKGMgPT4ge1xuICAgICAgaWYgKHd3Yy5yZXBldGl0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIHd3Y2kucmVwZXRpdGlvbnMgPSBldmFsdWF0ZUV4cHJlc3Npb24od3djLnJlcGV0aXRpb25zLmZvcm11bGEsIGNvbnRleHQpO1xuICAgICAgICBpZiAodHlwZW9mIHd3Y2kucmVwZXRpdGlvbnMgPT09ICdudW1iZXInICYmIHd3Y2kucmVwZXRpdGlvbnMgPiAwKSB7XG4gICAgICAgICAgZm9yIChsZXQgaSA9IDAgOyBpIDwgd3djaS5yZXBldGl0aW9ucyA7IGkrKykge1xuICAgICAgICAgICAgY29udGVudC5wdXNoKHdpZGdldFRvV2lkZ2V0SW5zdGFuY2UoYywgey4uLmNvbnRleHQsICckcmVwZXRpdGlvbic6IGl9LCB0cykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudC5wdXNoKHdpZGdldFRvV2lkZ2V0SW5zdGFuY2UoYywgY29udGV4dCwgdHMpKTtcbiAgICAgIH1cbiAgICAgIHd3Y2kuY29udGVudCA9IGNvbnRlbnQ7XG4gICAgfSk7XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuQ2hhcnQpIHtcbiAgICBjb25zdCBjdyA9IHdpZGdldCBhcyBBamZDaGFydFdpZGdldDtcbiAgICBjb25zdCBjd2kgPSB3aSBhcyBBamZDaGFydFdpZGdldEluc3RhbmNlO1xuICAgIGNvbnN0IGxhYmVscyA9IGN3LmxhYmVscyBpbnN0YW5jZW9mIEFycmF5ID8gY3cubGFiZWxzIDogW2N3LmxhYmVsc107XG4gICAgY29uc3QgZXZMYWJlbHMgPSBsYWJlbHMubWFwKGwgPT4ge1xuICAgICAgbGV0IGV2ZiA9IGV2YWx1YXRlRXhwcmVzc2lvbihsLmZvcm11bGEsIGNvbnRleHQpO1xuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGV2ZiBpbnN0YW5jZW9mIEFycmF5KSB7XG4gICAgICAgICAgZXZmID0gZXZmLm1hcCh2ID0+IHYgIT0gbnVsbCAmJiB0eXBlb2YgdiA9PT0gJ3N0cmluZycgJiYgdi50cmltKCkubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyB0cy5pbnN0YW50KHYpIDogdik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZXZmID0gZXZmICE9IG51bGwgJiYgdHlwZW9mIGV2ZiA9PT0gJ3N0cmluZycgJiYgZXZmLnRyaW0oKS5sZW5ndGggPiAwXG4gICAgICAgICAgICA/IHRzLmluc3RhbnQoZXZmKSA6IGV2ZjtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoX2UpIHtcbiAgICAgIH1cbiAgICAgIHJldHVybiBldmY7XG4gICAgfSk7XG4gICAgY3dpLmxhYmVscyA9IGN3LmxhYmVscyBpbnN0YW5jZW9mIEFycmF5ID8gZXZMYWJlbHMgOiBldkxhYmVsc1swXTtcbiAgICBjd2kuZGF0YXNldHMgPSBjdy5kYXRhc2V0Lm1hcChkID0+IHtcbiAgICAgIGxldCBkczogYW55ID0ge1xuICAgICAgICAuLi5kLm9wdGlvbnMgfHwge30sXG4gICAgICAgIGRhdGE6IGV2YWx1YXRlQWdncmVnYXRpb24oZC5hZ2dyZWdhdGlvbiwgZC5mb3JtdWxhLCBjb250ZXh0KSxcbiAgICAgIH07XG4gICAgICBpZiAoZC5jaGFydFR5cGUgIT0gbnVsbCkge1xuICAgICAgICBjb25zdCBjdCA9IGNoYXJ0VG9DaGFydEpzVHlwZShkLmNoYXJ0VHlwZSk7XG4gICAgICAgIGRzID0gey4uLmRzLCBjaGFydFR5cGU6IGN0LCB0eXBlOiBjdCB9O1xuICAgICAgfVxuICAgICAgaWYgKGQub3B0aW9ucyAhPSBudWxsKSB7XG4gICAgICAgIGRzID0gey4uLmRzLCBvcHRpb25zOiBkLm9wdGlvbnN9O1xuICAgICAgfVxuICAgICAgaWYgKGQubGFiZWwgIT0gbnVsbCkge1xuICAgICAgICBkcyA9IHsuLi5kcywgbGFiZWw6IGQubGFiZWx9O1xuICAgICAgfVxuICAgICAgaWYgKGQuZGF0YWxhYmVscyAhPSBudWxsKSB7XG4gICAgICAgIGRzLmRhdGFsYWJlbHMgPSBkZWVwQ29weShkLmRhdGFsYWJlbHMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGRzO1xuICAgIH0pO1xuICAgIGN3aS5kYXRhID0ge2xhYmVsczogY3dpLmxhYmVscywgZGF0YXNldHM6IGN3aS5kYXRhc2V0c307XG4gICAgY3dpLmNoYXJ0VHlwZSA9IGNoYXJ0VG9DaGFydEpzVHlwZShjdy50eXBlIHx8IGN3LmNoYXJ0VHlwZSk7XG4gICAgaWYgKGN3Lm9wdGlvbnMgIT0gbnVsbCAmJiBjdy5vcHRpb25zLnBsdWdpbnMgIT0gbnVsbCkge1xuICAgICAgY29uc3QgcGx1Z2lucyA9IGN3Lm9wdGlvbnMucGx1Z2lucztcbiAgICAgIGNvbnN0IHBsdWdpbk5hbWVzID0gT2JqZWN0LmtleXMocGx1Z2lucyk7XG4gICAgICBwbHVnaW5OYW1lcy5mb3JFYWNoKChwbHVnaW5OYW1lKSA9PiB7XG4gICAgICAgIGNvbnN0IHBsdWdpbiA9IHBsdWdpbnNbcGx1Z2luTmFtZV07XG4gICAgICAgIGNvbnN0IHBsdWdpbk9wdGlvbnMgPSBPYmplY3Qua2V5cyhwbHVnaW4pO1xuICAgICAgICBwbHVnaW5PcHRpb25zLmZvckVhY2goKHBsdWdpbk9wdGlvbk5hbWU6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IHBsdWdpbk9wdGlvbiA9IHBsdWdpbltwbHVnaW5PcHRpb25OYW1lXTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB0eXBlb2YgcGx1Z2luT3B0aW9uICE9PSAnc3RyaW5nJyAmJlxuICAgICAgICAgICAgcGx1Z2luT3B0aW9uICE9IG51bGwgJiZcbiAgICAgICAgICAgIHBsdWdpbk9wdGlvbi5mb3JtdWxhICE9IG51bGxcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHBsdWdpbltwbHVnaW5PcHRpb25OYW1lXSA9IGV2YWx1YXRlRXhwcmVzc2lvbihwbHVnaW5PcHRpb24uZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5UYWJsZSkge1xuICAgIGNvbnN0IHR3ID0gd2lkZ2V0IGFzIEFqZlRhYmxlV2lkZ2V0O1xuICAgIGNvbnN0IHR3aSA9IHdpIGFzIEFqZlRhYmxlV2lkZ2V0SW5zdGFuY2U7XG4gICAgY29uc3QgdHJGb3JtdWxhID0gKGY6IEFqZkZvcm11bGEpID0+IHtcbiAgICAgIGxldCBmb3JtdWxhID0gZi5mb3JtdWxhO1xuICAgICAgaWYgKGZvcm11bGEuc3Vic3RyKDAsIDEpID09PSAnXCInKSB7XG4gICAgICAgIGNvbnN0IGZ0ID0gZm9ybXVsYS5zbGljZSgxLCAtMSk7XG4gICAgICAgIGNvbnN0IHRyYW5zRnQgPSBmdCAhPSBudWxsICYmIHR5cGVvZiBmdCA9PT0gJ3N0cmluZycgJiYgZnQudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IHRzLmluc3RhbnQoZnQpIDogZnQ7XG4gICAgICAgIGlmIChmdC5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgZm9ybXVsYSA9IGBcIiR7dHJhbnNGdH1cImA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGZvcm11bGEgPSBmb3JtdWxhICE9IG51bGwgJiYgdHlwZW9mIGZvcm11bGEgPT09ICdzdHJpbmcnICYmIGZvcm11bGEudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgICAgICA/IHRzLmluc3RhbnQoZm9ybXVsYSkgOiBmb3JtdWxhO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGV2YWx1YXRlRXhwcmVzc2lvbihmb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9O1xuICAgIHR3aS5kYXRhc2V0ID0gdHcuZGF0YXNldC5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiB7XG4gICAgICByZXR1cm4gY2VsbC5mb3JtdWxhIGluc3RhbmNlb2YgQXJyYXkgPyBjZWxsLmZvcm11bGEubWFwKGYgPT4gdHJGb3JtdWxhKGYgYXMgQWpmRm9ybXVsYSkpIDpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRyRm9ybXVsYShjZWxsLmZvcm11bGEhKTtcbiAgICB9KSk7XG4gICAgdHdpLmRhdGEgPSAodHcuZGF0YXNldCB8fFxuICAgICAgICAgICAgICAgIFtdKS5tYXAocm93ID0+IHJvdy5tYXAoY2VsbCA9PiAoe1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YWx1ZTogZXZhbHVhdGVFeHByZXNzaW9uKGNlbGwuZm9ybXVsYS5mb3JtdWxhLCBjb250ZXh0KSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU6IHsuLi50dy5jZWxsU3R5bGVzLCAuLi5jZWxsLnN0eWxlfSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcm93c3BhbjogY2VsbC5yb3dzcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb2xzcGFuOiBjZWxsLmNvbHNwYW4sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9KSkpO1xuICB9IGVsc2UgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkltYWdlKSB7XG4gICAgY29uc3QgaXcgPSB3aWRnZXQgYXMgQWpmSW1hZ2VXaWRnZXQ7XG4gICAgY29uc3QgaXdpID0gd2kgYXMgQWpmSW1hZ2VXaWRnZXRJbnN0YW5jZTtcbiAgICBpZiAoaXcuZmxhZykge1xuICAgICAgaXdpLmZsYWcgPSBldmFsdWF0ZUV4cHJlc3Npb24oaXcuZmxhZy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGl3Lmljb24pIHtcbiAgICAgIGl3aS5pY29uID0gZXZhbHVhdGVFeHByZXNzaW9uKGl3Lmljb24uZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChpdy51cmwpIHtcbiAgICAgIGl3aS51cmwgPSBldmFsdWF0ZUV4cHJlc3Npb24oaXcudXJsLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5JbWFnZUNvbnRhaW5lcikge1xuICAgIGNvbnN0IGljdyA9IHdpZGdldCBhcyBBamZJbWFnZUNvbnRhaW5lcldpZGdldDtcbiAgICBjb25zdCBpY3dpID0gd2kgYXMgQWpmSW1hZ2VDb250YWluZXJXaWRnZXRJbnN0YW5jZTtcbiAgICBpZiAoaWN3LmZsYWdzKSB7XG4gICAgICBpY3dpLmZsYWdzID0gaWN3LmZsYWdzIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgPyBpY3cuZmxhZ3MubWFwKGYgPT4gZXZhbHVhdGVFeHByZXNzaW9uKGYuZm9ybXVsYSwgY29udGV4dCkpXG4gICAgICAgIDogZXZhbHVhdGVFeHByZXNzaW9uKGljdy5mbGFncy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gICAgaWYgKGljdy5pY29ucykge1xuICAgICAgaWN3aS5pY29ucyA9IGljdy5pY29ucyBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgID8gaWN3Lmljb25zLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKVxuICAgICAgICA6IGV2YWx1YXRlRXhwcmVzc2lvbihpY3cuaWNvbnMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChpY3cudXJscykge1xuICAgICAgaWN3aS51cmxzID0gaWN3LnVybHMgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICA/IGljdy51cmxzLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKVxuICAgICAgICA6IGV2YWx1YXRlRXhwcmVzc2lvbihpY3cudXJscy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuVGV4dCkge1xuICAgIGNvbnN0IHRldyA9IHdpZGdldCBhcyBBamZUZXh0V2lkZ2V0O1xuICAgIGNvbnN0IHRld2kgPSB3aSBhcyBBamZUZXh0V2lkZ2V0SW5zdGFuY2U7XG4gICAgY29uc3QgZm9ybXVsYVJlZ0V4OiBSZWdFeHAgPSAvXFxbezJ9KC4rPylcXF17Mn0vZztcbiAgICBjb25zdCBtYXRjaGVzOiB7aWR4OiBudW1iZXIsIGxlbjogbnVtYmVyLCBmb3JtdWxhOiBBamZGb3JtdWxhfVtdID0gW107XG4gICAgbGV0IG1hdGNoOiBSZWdFeHBFeGVjQXJyYXl8bnVsbDtcbiAgICBsZXQgaHRtbFRleHQgPSB0ZXcuaHRtbFRleHQ7XG4gICAgd2hpbGUgKG1hdGNoID0gZm9ybXVsYVJlZ0V4LmV4ZWMoaHRtbFRleHQpKSB7XG4gICAgICBjb25zdCBpZHggPSBtYXRjaC5pbmRleDtcbiAgICAgIGNvbnN0IGxlbiA9IG1hdGNoWzBdLmxlbmd0aDtcbiAgICAgIGNvbnN0IGZvcm11bGEgPSBjcmVhdGVGb3JtdWxhKHtmb3JtdWxhOiBtYXRjaFsxXX0pO1xuICAgICAgbWF0Y2hlcy5wdXNoKHtpZHgsIGxlbiwgZm9ybXVsYX0pO1xuICAgIH1cbiAgICBtYXRjaGVzLnJldmVyc2UoKS5mb3JFYWNoKChtKSA9PiB7XG4gICAgICBsZXQgY2FsY1ZhbHVlO1xuICAgICAgdHJ5IHtcbiAgICAgICAgY2FsY1ZhbHVlID0gZXZhbHVhdGVFeHByZXNzaW9uKG0uZm9ybXVsYS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FsY1ZhbHVlID0gJyc7XG4gICAgICB9XG4gICAgICBodG1sVGV4dCA9IGAke2h0bWxUZXh0LnN1YnN0cigwLCBtLmlkeCl9JHtjYWxjVmFsdWV9JHtodG1sVGV4dC5zdWJzdHIobS5pZHggKyBtLmxlbil9YDtcbiAgICB9KTtcbiAgICB0ZXdpLmh0bWxUZXh0ID0gaHRtbFRleHQgIT0gbnVsbCAmJiBodG1sVGV4dC5sZW5ndGggPiAwID8gdHMuaW5zdGFudChodG1sVGV4dCkgOiBodG1sVGV4dDtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5Gb3JtdWxhKSB7XG4gICAgY29uc3QgZncgPSB3aWRnZXQgYXMgQWpmRm9ybXVsYVdpZGdldDtcbiAgICBjb25zdCBmd2kgPSB3aSBhcyBBamZGb3JtdWxhV2lkZ2V0SW5zdGFuY2U7XG4gICAgZndpLmZvcm11bGEgPSBldmFsdWF0ZUV4cHJlc3Npb24oZncuZm9ybXVsYS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5NYXApIHtcbiAgICBjb25zdCBtdyA9IHdpZGdldCBhcyBBamZNYXBXaWRnZXQ7XG4gICAgY29uc3QgbXdpID0gd2kgYXMgQWpmTWFwV2lkZ2V0SW5zdGFuY2U7XG4gICAgbXdpLmNvb3JkaW5hdGUgPSBldmFsdWF0ZUV4cHJlc3Npb24obXcuY29vcmRpbmF0ZS5mb3JtdWxhLCBjb250ZXh0KTtcbiAgfVxuICByZXR1cm4gd2k7XG59XG4iXX0=