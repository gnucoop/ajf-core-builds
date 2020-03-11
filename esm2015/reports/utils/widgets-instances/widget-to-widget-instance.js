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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvdXRpbHMvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXRvLXdpZGdldC1pbnN0YW5jZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQXNCQSxPQUFPLEVBQXlCLGFBQWEsRUFBRSxrQkFBa0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBQzNGLE9BQU8sRUFBQyxRQUFRLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUd6QyxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSxtQkFBbUIsQ0FBQztBQXNCckQsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRWxFLE9BQU8sRUFBQyxtQkFBbUIsRUFBQyxNQUFNLHFDQUFxQyxDQUFDO0FBRXhFLE9BQU8sRUFBQyxvQkFBb0IsRUFBQyxNQUFNLDBCQUEwQixDQUFDOzs7Ozs7O0FBRTlELE1BQU0sVUFBVSxzQkFBc0IsQ0FDbEMsTUFBaUIsRUFBRSxPQUFtQixFQUFFLEVBQW9COztVQUN4RCxFQUFFLEdBQUcsb0JBQW9CLENBQUMsTUFBTSxFQUFFLE9BQU8sRUFBRSxFQUFFLENBQUM7SUFDcEQsSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLFVBQVUsS0FBSyxhQUFhLENBQUMsTUFBTSxFQUFFOztjQUN0RixHQUFHLEdBQUcsbUJBQUEsTUFBTSxFQUF3Qjs7Y0FDcEMsSUFBSSxHQUFHLG1CQUFBLEVBQUUsRUFBZ0M7O1lBQzNDLE9BQU8sR0FBRyxtQkFBQSxFQUFFLEVBQXVCO1FBQ3ZDLEdBQUcsQ0FBQyxPQUFPLENBQUMsT0FBTzs7OztRQUFDLENBQUMsQ0FBQyxFQUFFO1lBQ3RCLElBQUksR0FBRyxDQUFDLFdBQVcsSUFB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LGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxPQUFPLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQy9EO1NBQU0sSUFBSSxNQUFNLENBQUMsVUFBVSxLQUFLLGFBQWEsQ0FBQyxHQUFHLEVBQUU7O2NBQzVDLEVBQUUsR0FBRyxtQkFBQSxNQUFNLEVBQWdCOztjQUMzQixHQUFHLEdBQUcsbUJBQUEsRUFBRSxFQUF3QjtRQUN0QyxHQUFHLENBQUMsVUFBVSxHQUFHLGtCQUFrQixDQUFDLEVBQUUsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3JFO0lBQ0QsT0FBTyxFQUFFLENBQUM7QUFDWixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbnRleHQsIEFqZkZvcm11bGEsIGNyZWF0ZUZvcm11bGEsIGV2YWx1YXRlRXhwcmVzc2lvbn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5pbXBvcnQge2RlZXBDb3B5fSBmcm9tICdAYWpmL2NvcmUvdXRpbHMnO1xuaW1wb3J0IHtUcmFuc2xhdGVTZXJ2aWNlfSBmcm9tICdAbmd4LXRyYW5zbGF0ZS9jb3JlJztcblxuaW1wb3J0IHtjaGFydFRvQ2hhcnRKc1R5cGV9IGZyb20gJy4uLy4uL2NoYXJ0LXV0aWxzJztcbmltcG9ydCB7QWpmQ2hhcnRXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2NoYXJ0LXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkZvcm11bGFXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2Zvcm11bGEtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7XG4gIEFqZkltYWdlQ29udGFpbmVyV2lkZ2V0SW5zdGFuY2Vcbn0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL2ltYWdlLWNvbnRhaW5lci13aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZJbWFnZVdpZGdldEluc3RhbmNlfSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvaW1hZ2Utd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmTWFwV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy9tYXAtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmVGFibGVXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3RhYmxlLXdpZGdldC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlRleHRXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMtaW5zdGFuY2VzL3RleHQtd2lkZ2V0LWluc3RhbmNlJztcbmltcG9ydCB7QWpmV2lkZ2V0SW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzLWluc3RhbmNlcy93aWRnZXQtaW5zdGFuY2UnO1xuaW1wb3J0IHtcbiAgQWpmV2lkZ2V0V2l0aENvbnRlbnRJbnN0YW5jZVxufSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy1pbnN0YW5jZXMvd2lkZ2V0LXdpdGgtY29udGVudC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZkNoYXJ0V2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy9jaGFydC13aWRnZXQnO1xuaW1wb3J0IHtBamZGb3JtdWxhV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy9mb3JtdWxhLXdpZGdldCc7XG5pbXBvcnQge0FqZkltYWdlQ29udGFpbmVyV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy9pbWFnZS1jb250YWluZXItd2lkZ2V0JztcbmltcG9ydCB7QWpmSW1hZ2VXaWRnZXR9IGZyb20gJy4uLy4uL2ludGVyZmFjZS93aWRnZXRzL2ltYWdlLXdpZGdldCc7XG5pbXBvcnQge0FqZk1hcFdpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvbWFwLXdpZGdldCc7XG5pbXBvcnQge0FqZlRhYmxlV2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy90YWJsZS13aWRnZXQnO1xuaW1wb3J0IHtBamZUZXh0V2lkZ2V0fSBmcm9tICcuLi8uLi9pbnRlcmZhY2Uvd2lkZ2V0cy90ZXh0LXdpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuaW1wb3J0IHtBamZXaWRnZXRXaXRoQ29udGVudH0gZnJvbSAnLi4vLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXdpdGgtY29udGVudCc7XG5pbXBvcnQge2V2YWx1YXRlQWdncmVnYXRpb259IGZyb20gJy4uL2FnZ3JlZ2F0aW9uL2V2YWx1YXRlLWFnZ3JlZ2F0aW9uJztcblxuaW1wb3J0IHtjcmVhdGVXaWRnZXRJbnN0YW5jZX0gZnJvbSAnLi9jcmVhdGUtd2lkZ2V0LWluc3RhbmNlJztcblxuZXhwb3J0IGZ1bmN0aW9uIHdpZGdldFRvV2lkZ2V0SW5zdGFuY2UoXG4gICAgd2lkZ2V0OiBBamZXaWRnZXQsIGNvbnRleHQ6IEFqZkNvbnRleHQsIHRzOiBUcmFuc2xhdGVTZXJ2aWNlKTogQWpmV2lkZ2V0SW5zdGFuY2Uge1xuICBjb25zdCB3aSA9IGNyZWF0ZVdpZGdldEluc3RhbmNlKHdpZGdldCwgY29udGV4dCwgdHMpO1xuICBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuQ29sdW1uIHx8IHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkxheW91dCkge1xuICAgIGNvbnN0IHd3YyA9IHdpZGdldCBhcyBBamZXaWRnZXRXaXRoQ29udGVudDtcbiAgICBjb25zdCB3d2NpID0gd2kgYXMgQWpmV2lkZ2V0V2l0aENvbnRlbnRJbnN0YW5jZTtcbiAgICBsZXQgY29udGVudCA9IFtdIGFzIEFqZldpZGdldEluc3RhbmNlW107XG4gICAgd3djLmNvbnRlbnQuZm9yRWFjaChjID0+IHtcbiAgICAgIGlmICh3d2MucmVwZXRpdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICB3d2NpLnJlcGV0aXRpb25zID0gZXZhbHVhdGVFeHByZXNzaW9uKHd3Yy5yZXBldGl0aW9ucy5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgICAgaWYgKHR5cGVvZiB3d2NpLnJlcGV0aXRpb25zID09PSAnbnVtYmVyJyAmJiB3d2NpLnJlcGV0aXRpb25zID4gMCkge1xuICAgICAgICAgIGZvciAobGV0IGkgPSAwIDsgaSA8IHd3Y2kucmVwZXRpdGlvbnMgOyBpKyspIHtcbiAgICAgICAgICAgIGNvbnRlbnQucHVzaCh3aWRnZXRUb1dpZGdldEluc3RhbmNlKGMsIHsuLi5jb250ZXh0LCAnJHJlcGV0aXRpb24nOiBpfSwgdHMpKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNvbnRlbnQucHVzaCh3aWRnZXRUb1dpZGdldEluc3RhbmNlKGMsIGNvbnRleHQsIHRzKSk7XG4gICAgICB9XG4gICAgICB3d2NpLmNvbnRlbnQgPSBjb250ZW50O1xuICAgIH0pO1xuICB9IGVsc2UgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLkNoYXJ0KSB7XG4gICAgY29uc3QgY3cgPSB3aWRnZXQgYXMgQWpmQ2hhcnRXaWRnZXQ7XG4gICAgY29uc3QgY3dpID0gd2kgYXMgQWpmQ2hhcnRXaWRnZXRJbnN0YW5jZTtcbiAgICBjb25zdCBsYWJlbHMgPSBjdy5sYWJlbHMgaW5zdGFuY2VvZiBBcnJheSA/IGN3LmxhYmVscyA6IFtjdy5sYWJlbHNdO1xuICAgIGNvbnN0IGV2TGFiZWxzID0gbGFiZWxzLm1hcChsID0+IHtcbiAgICAgIGxldCBldmYgPSBldmFsdWF0ZUV4cHJlc3Npb24obC5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGlmIChldmYgaW5zdGFuY2VvZiBBcnJheSkge1xuICAgICAgICAgIGV2ZiA9IGV2Zi5tYXAodiA9PiB2ICE9IG51bGwgJiYgdHlwZW9mIHYgPT09ICdzdHJpbmcnICYmIHYudHJpbSgpLmxlbmd0aCA+IDBcbiAgICAgICAgICAgID8gdHMuaW5zdGFudCh2KSA6IHYpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGV2ZiA9IGV2ZiAhPSBudWxsICYmIHR5cGVvZiBldmYgPT09ICdzdHJpbmcnICYmIGV2Zi50cmltKCkubGVuZ3RoID4gMFxuICAgICAgICAgICAgPyB0cy5pbnN0YW50KGV2ZikgOiBldmY7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKF9lKSB7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXZmO1xuICAgIH0pO1xuICAgIGN3aS5sYWJlbHMgPSBjdy5sYWJlbHMgaW5zdGFuY2VvZiBBcnJheSA/IGV2TGFiZWxzIDogZXZMYWJlbHNbMF07XG4gICAgY3dpLmRhdGFzZXRzID0gY3cuZGF0YXNldC5tYXAoZCA9PiB7XG4gICAgICBsZXQgZHM6IGFueSA9IHtcbiAgICAgICAgLi4uZC5vcHRpb25zIHx8IHt9LFxuICAgICAgICBkYXRhOiBldmFsdWF0ZUFnZ3JlZ2F0aW9uKGQuYWdncmVnYXRpb24sIGQuZm9ybXVsYSwgY29udGV4dCksXG4gICAgICB9O1xuICAgICAgaWYgKGQuY2hhcnRUeXBlICE9IG51bGwpIHtcbiAgICAgICAgY29uc3QgY3QgPSBjaGFydFRvQ2hhcnRKc1R5cGUoZC5jaGFydFR5cGUpO1xuICAgICAgICBkcyA9IHsuLi5kcywgY2hhcnRUeXBlOiBjdCwgdHlwZTogY3QgfTtcbiAgICAgIH1cbiAgICAgIGlmIChkLm9wdGlvbnMgIT0gbnVsbCkge1xuICAgICAgICBkcyA9IHsuLi5kcywgb3B0aW9uczogZC5vcHRpb25zfTtcbiAgICAgIH1cbiAgICAgIGlmIChkLmxhYmVsICE9IG51bGwpIHtcbiAgICAgICAgZHMgPSB7Li4uZHMsIGxhYmVsOiBkLmxhYmVsfTtcbiAgICAgIH1cbiAgICAgIGlmIChkLmRhdGFsYWJlbHMgIT0gbnVsbCkge1xuICAgICAgICBkcy5kYXRhbGFiZWxzID0gZGVlcENvcHkoZC5kYXRhbGFiZWxzKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBkcztcbiAgICB9KTtcbiAgICBjd2kuZGF0YSA9IHtsYWJlbHM6IGN3aS5sYWJlbHMsIGRhdGFzZXRzOiBjd2kuZGF0YXNldHN9O1xuICAgIGN3aS5jaGFydFR5cGUgPSBjaGFydFRvQ2hhcnRKc1R5cGUoY3cudHlwZSB8fCBjdy5jaGFydFR5cGUpO1xuICAgIGlmIChjdy5vcHRpb25zICE9IG51bGwgJiYgY3cub3B0aW9ucy5wbHVnaW5zICE9IG51bGwpIHtcbiAgICAgIGNvbnN0IHBsdWdpbnMgPSBjdy5vcHRpb25zLnBsdWdpbnM7XG4gICAgICBjb25zdCBwbHVnaW5OYW1lcyA9IE9iamVjdC5rZXlzKHBsdWdpbnMpO1xuICAgICAgcGx1Z2luTmFtZXMuZm9yRWFjaCgocGx1Z2luTmFtZSkgPT4ge1xuICAgICAgICBjb25zdCBwbHVnaW4gPSBwbHVnaW5zW3BsdWdpbk5hbWVdO1xuICAgICAgICBjb25zdCBwbHVnaW5PcHRpb25zID0gT2JqZWN0LmtleXMocGx1Z2luKTtcbiAgICAgICAgcGx1Z2luT3B0aW9ucy5mb3JFYWNoKChwbHVnaW5PcHRpb25OYW1lOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBwbHVnaW5PcHRpb24gPSBwbHVnaW5bcGx1Z2luT3B0aW9uTmFtZV07XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZW9mIHBsdWdpbk9wdGlvbiAhPT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgIHBsdWdpbk9wdGlvbiAhPSBudWxsICYmXG4gICAgICAgICAgICBwbHVnaW5PcHRpb24uZm9ybXVsYSAhPSBudWxsXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBwbHVnaW5bcGx1Z2luT3B0aW9uTmFtZV0gPSBldmFsdWF0ZUV4cHJlc3Npb24ocGx1Z2luT3B0aW9uLmZvcm11bGEsIGNvbnRleHQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuVGFibGUpIHtcbiAgICBjb25zdCB0dyA9IHdpZGdldCBhcyBBamZUYWJsZVdpZGdldDtcbiAgICBjb25zdCB0d2kgPSB3aSBhcyBBamZUYWJsZVdpZGdldEluc3RhbmNlO1xuICAgIGNvbnN0IHRyRm9ybXVsYSA9IChmOiBBamZGb3JtdWxhKSA9PiB7XG4gICAgICBsZXQgZm9ybXVsYSA9IGYuZm9ybXVsYTtcbiAgICAgIGlmIChmb3JtdWxhLnN1YnN0cigwLCAxKSA9PT0gJ1wiJykge1xuICAgICAgICBjb25zdCBmdCA9IGZvcm11bGEuc2xpY2UoMSwgLTEpO1xuICAgICAgICBjb25zdCB0cmFuc0Z0ID0gZnQgIT0gbnVsbCAmJiB0eXBlb2YgZnQgPT09ICdzdHJpbmcnICYmIGZ0LnRyaW0oKS5sZW5ndGggPiAwXG4gICAgICAgICAgPyB0cy5pbnN0YW50KGZ0KSA6IGZ0O1xuICAgICAgICBpZiAoZnQubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGZvcm11bGEgPSBgXCIke3RyYW5zRnR9XCJgO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3JtdWxhID0gZm9ybXVsYSAhPSBudWxsICYmIHR5cGVvZiBmb3JtdWxhID09PSAnc3RyaW5nJyAmJiBmb3JtdWxhLnRyaW0oKS5sZW5ndGggPiAwXG4gICAgICAgICAgPyB0cy5pbnN0YW50KGZvcm11bGEpIDogZm9ybXVsYTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBldmFsdWF0ZUV4cHJlc3Npb24oZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfTtcbiAgICB0d2kuZGF0YXNldCA9IHR3LmRhdGFzZXQubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4ge1xuICAgICAgcmV0dXJuIGNlbGwuZm9ybXVsYSBpbnN0YW5jZW9mIEFycmF5ID8gY2VsbC5mb3JtdWxhLm1hcChmID0+IHRyRm9ybXVsYShmIGFzIEFqZkZvcm11bGEpKSA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ckZvcm11bGEoY2VsbC5mb3JtdWxhISk7XG4gICAgfSkpO1xuICAgIHR3aS5kYXRhID0gKHR3LmRhdGFzZXQgfHxcbiAgICAgICAgICAgICAgICBbXSkubWFwKHJvdyA9PiByb3cubWFwKGNlbGwgPT4gKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFsdWU6IGV2YWx1YXRlRXhwcmVzc2lvbihjZWxsLmZvcm11bGEuZm9ybXVsYSwgY29udGV4dCksXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlOiB7Li4udHcuY2VsbFN0eWxlcywgLi4uY2VsbC5zdHlsZX0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJvd3NwYW46IGNlbGwucm93c3BhbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY29sc3BhbjogY2VsbC5jb2xzcGFuLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSkpKTtcbiAgfSBlbHNlIGlmICh3aWRnZXQud2lkZ2V0VHlwZSA9PT0gQWpmV2lkZ2V0VHlwZS5JbWFnZSkge1xuICAgIGNvbnN0IGl3ID0gd2lkZ2V0IGFzIEFqZkltYWdlV2lkZ2V0O1xuICAgIGNvbnN0IGl3aSA9IHdpIGFzIEFqZkltYWdlV2lkZ2V0SW5zdGFuY2U7XG4gICAgaWYgKGl3LmZsYWcpIHtcbiAgICAgIGl3aS5mbGFnID0gZXZhbHVhdGVFeHByZXNzaW9uKGl3LmZsYWcuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChpdy5pY29uKSB7XG4gICAgICBpd2kuaWNvbiA9IGV2YWx1YXRlRXhwcmVzc2lvbihpdy5pY29uLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgICBpZiAoaXcudXJsKSB7XG4gICAgICBpd2kudXJsID0gZXZhbHVhdGVFeHByZXNzaW9uKGl3LnVybC5mb3JtdWxhLCBjb250ZXh0KTtcbiAgICB9XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuSW1hZ2VDb250YWluZXIpIHtcbiAgICBjb25zdCBpY3cgPSB3aWRnZXQgYXMgQWpmSW1hZ2VDb250YWluZXJXaWRnZXQ7XG4gICAgY29uc3QgaWN3aSA9IHdpIGFzIEFqZkltYWdlQ29udGFpbmVyV2lkZ2V0SW5zdGFuY2U7XG4gICAgaWYgKGljdy5mbGFncykge1xuICAgICAgaWN3aS5mbGFncyA9IGljdy5mbGFncyBpbnN0YW5jZW9mIEFycmF5XG4gICAgICAgID8gaWN3LmZsYWdzLm1hcChmID0+IGV2YWx1YXRlRXhwcmVzc2lvbihmLmZvcm11bGEsIGNvbnRleHQpKVxuICAgICAgICA6IGV2YWx1YXRlRXhwcmVzc2lvbihpY3cuZmxhZ3MuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICAgIGlmIChpY3cuaWNvbnMpIHtcbiAgICAgIGljd2kuaWNvbnMgPSBpY3cuaWNvbnMgaW5zdGFuY2VvZiBBcnJheVxuICAgICAgICA/IGljdy5pY29ucy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSlcbiAgICAgICAgOiBldmFsdWF0ZUV4cHJlc3Npb24oaWN3Lmljb25zLmZvcm11bGEsIGNvbnRleHQpO1xuICAgIH1cbiAgICBpZiAoaWN3LnVybHMpIHtcbiAgICAgIGljd2kudXJscyA9IGljdy51cmxzIGluc3RhbmNlb2YgQXJyYXlcbiAgICAgICAgPyBpY3cudXJscy5tYXAoZiA9PiBldmFsdWF0ZUV4cHJlc3Npb24oZi5mb3JtdWxhLCBjb250ZXh0KSlcbiAgICAgICAgOiBldmFsdWF0ZUV4cHJlc3Npb24oaWN3LnVybHMuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgfVxuICB9IGVsc2UgaWYgKHdpZGdldC53aWRnZXRUeXBlID09PSBBamZXaWRnZXRUeXBlLlRleHQpIHtcbiAgICBjb25zdCB0ZXcgPSB3aWRnZXQgYXMgQWpmVGV4dFdpZGdldDtcbiAgICBjb25zdCB0ZXdpID0gd2kgYXMgQWpmVGV4dFdpZGdldEluc3RhbmNlO1xuICAgIGNvbnN0IGZvcm11bGFSZWdFeDogUmVnRXhwID0gL1xcW3syfSguKz8pXFxdezJ9L2c7XG4gICAgY29uc3QgbWF0Y2hlczoge2lkeDogbnVtYmVyLCBsZW46IG51bWJlciwgZm9ybXVsYTogQWpmRm9ybXVsYX1bXSA9IFtdO1xuICAgIGxldCBtYXRjaDogUmVnRXhwRXhlY0FycmF5fG51bGw7XG4gICAgbGV0IGh0bWxUZXh0ID0gdGV3Lmh0bWxUZXh0O1xuICAgIHdoaWxlIChtYXRjaCA9IGZvcm11bGFSZWdFeC5leGVjKGh0bWxUZXh0KSkge1xuICAgICAgY29uc3QgaWR4ID0gbWF0Y2guaW5kZXg7XG4gICAgICBjb25zdCBsZW4gPSBtYXRjaFswXS5sZW5ndGg7XG4gICAgICBjb25zdCBmb3JtdWxhID0gY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogbWF0Y2hbMV19KTtcbiAgICAgIG1hdGNoZXMucHVzaCh7aWR4LCBsZW4sIGZvcm11bGF9KTtcbiAgICB9XG4gICAgbWF0Y2hlcy5yZXZlcnNlKCkuZm9yRWFjaCgobSkgPT4ge1xuICAgICAgbGV0IGNhbGNWYWx1ZTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGNhbGNWYWx1ZSA9IGV2YWx1YXRlRXhwcmVzc2lvbihtLmZvcm11bGEuZm9ybXVsYSwgY29udGV4dCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhbGNWYWx1ZSA9ICcnO1xuICAgICAgfVxuICAgICAgaHRtbFRleHQgPSBgJHtodG1sVGV4dC5zdWJzdHIoMCwgbS5pZHgpfSR7Y2FsY1ZhbHVlfSR7aHRtbFRleHQuc3Vic3RyKG0uaWR4ICsgbS5sZW4pfWA7XG4gICAgfSk7XG4gICAgdGV3aS5odG1sVGV4dCA9IGh0bWxUZXh0ICE9IG51bGwgJiYgaHRtbFRleHQubGVuZ3RoID4gMCA/IHRzLmluc3RhbnQoaHRtbFRleHQpIDogaHRtbFRleHQ7XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuRm9ybXVsYSkge1xuICAgIGNvbnN0IGZ3ID0gd2lkZ2V0IGFzIEFqZkZvcm11bGFXaWRnZXQ7XG4gICAgY29uc3QgZndpID0gd2kgYXMgQWpmRm9ybXVsYVdpZGdldEluc3RhbmNlO1xuICAgIGZ3aS5mb3JtdWxhID0gZXZhbHVhdGVFeHByZXNzaW9uKGZ3LmZvcm11bGEuZm9ybXVsYSwgY29udGV4dCk7XG4gIH0gZWxzZSBpZiAod2lkZ2V0LndpZGdldFR5cGUgPT09IEFqZldpZGdldFR5cGUuTWFwKSB7XG4gICAgY29uc3QgbXcgPSB3aWRnZXQgYXMgQWpmTWFwV2lkZ2V0O1xuICAgIGNvbnN0IG13aSA9IHdpIGFzIEFqZk1hcFdpZGdldEluc3RhbmNlO1xuICAgIG13aS5jb29yZGluYXRlID0gZXZhbHVhdGVFeHByZXNzaW9uKG13LmNvb3JkaW5hdGUuZm9ybXVsYSwgY29udGV4dCk7XG4gIH1cbiAgcmV0dXJuIHdpO1xufVxuIl19