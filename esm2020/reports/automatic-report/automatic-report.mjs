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
import { AjfFieldType, AjfNodeType, } from '@ajf/core/forms';
import { createFormula } from '@ajf/core/models';
import { AjfChartType } from '../interface/charts/chart-type';
import { AjfWidgetType } from '../interface/widgets/widget-type';
import { createDataset } from '../utils/dataset/create-dataset';
import { createReportContainer } from '../utils/reports/create-report-container';
import { createWidget } from '../utils/widgets/create-widget';
import { backgroundColor, boxStyle, slideContentStyle, slideTitleStyle, widgetStyle, widgetTitleStyle, } from './styles';
function createBooleanWidget(field) {
    return createWidget({
        widgetType: AjfWidgetType.Column,
        content: [
            createWidget({
                widgetType: AjfWidgetType.Chart,
                type: AjfChartType.Pie,
                labels: { formula: "['True', 'False']" },
                dataset: [
                    createDataset({
                        label: 'true',
                        formula: [
                            createFormula({
                                formula: `[COUNT_FORMS(forms,"${field.name}===true"),COUNT_FORMS(forms,"${field.name}===false")]`,
                            }),
                        ],
                        options: { backgroundColor: ['green', 'red'] },
                    }),
                ],
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: { display: true, position: 'bottom' },
                },
                styles: { width: '100%', height: '100%' },
                exportable: true,
            }),
        ],
    });
}
function createMultipleChoiceWidget(field) {
    const choices = field.choicesOrigin.choices;
    let dataset = choices.map((c, index) => createDataset({
        label: `${c.label}`,
        formula: [
            createFormula({
                formula: `[COUNT_FORMS(forms,"${field.name}.indexOf('${c.value}') > -1")]`,
            }),
        ],
        options: {
            backgroundColor: backgroundColor[index],
            stack: `Stack ${index}`,
        },
    }));
    let chartType = AjfChartType.Bar;
    let labels = { formula: `[]` };
    return createWidget({
        widgetType: AjfWidgetType.Column,
        content: [
            createWidget({
                widgetType: AjfWidgetType.Chart,
                type: chartType,
                labels,
                dataset,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: { display: true, position: 'bottom' },
                },
                styles: { width: '100%', height: '100%' },
                exportable: true,
            }),
        ],
    });
}
function createNumberWidget(field) {
    return createWidget({
        widgetType: AjfWidgetType.Column,
        styles: widgetStyle,
        content: [
            createWidget({
                widgetType: AjfWidgetType.Layout,
                columns: [0.33, 0.33, 0.33],
                content: [
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Mean</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                'htmlText': `<p>[[MEAN(forms,"${field.name}")]] / [[MAX(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            }),
                        ],
                    }),
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Median</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                'htmlText': `<p>[[MEDIAN(forms,"${field.name}")]] / [[MAX(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            }),
                        ],
                    }),
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Mode</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<p>[[MODE(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            }),
                        ],
                    }),
                ],
            }),
        ],
    });
}
function createSingleChoiceWidget(field) {
    const choices = field.choicesOrigin.choices;
    let dataset = [];
    let chartType = AjfChartType.Bar;
    let labels = { formula: `[]` };
    if (choices.length > 5) {
        labels = { formula: `[${choices.map(c => `${JSON.stringify(c.label)}`)}]` };
        chartType = AjfChartType.Pie;
        dataset = [
            createDataset({
                label: field.label,
                formula: [
                    createFormula({
                        formula: `[${choices
                            .map(choice => `COUNT_FORMS(forms,"${field.name}==='${choice.value}'")`)
                            .toString()}]`,
                    }),
                ],
                options: { backgroundColor },
            }),
        ];
    }
    else {
        dataset = choices.map((c, index) => createDataset({
            label: `${c.label}`,
            formula: [
                createFormula({ formula: `[COUNT_FORMS(forms,"${field.name}==='${c.value}'")]` }),
            ],
            options: {
                backgroundColor: backgroundColor[index],
                stack: `Stack ${index}`,
            },
        }));
    }
    return createWidget({
        widgetType: AjfWidgetType.Column,
        content: [
            createWidget({
                widgetType: AjfWidgetType.Chart,
                type: chartType,
                labels,
                dataset,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: { display: true, position: 'bottom' },
                },
                styles: { width: '100%', height: '100%' },
                exportable: true,
            }),
        ],
    });
}
function createRangeWidget(field) {
    const end = field.end ?? 11;
    const start = field.start ?? 1;
    let choices = [];
    for (let i = start; i <= end; i++) {
        choices.push(i);
    }
    let labels = { formula: `[${JSON.stringify(field.label)}]` };
    let dataset = choices.map((_, index) => createDataset({
        label: `${index + start}`,
        formula: [
            createFormula({ formula: `[COUNT_FORMS(forms,"${field.name}===${index + 1 + start}")]` }),
        ],
        options: {
            backgroundColor: backgroundColor[index],
            stack: `Stack ${index}`,
        },
    }));
    return createWidget({
        widgetType: AjfWidgetType.Column,
        styles: widgetStyle,
        content: [
            createWidget({
                widgetType: AjfWidgetType.Layout,
                columns: [0.33, 0.33, 0.33],
                content: [
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Mean</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                'htmlText': `<p>[[MEAN(forms,"${field.name}")]] / [[MAX(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            }),
                        ],
                    }),
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Median</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                'htmlText': `<p>[[MEDIAN(forms,"${field.name}")]] / [[MAX(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            }),
                        ],
                    }),
                    createWidget({
                        widgetType: AjfWidgetType.Column,
                        styles: boxStyle,
                        content: [
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<div color="primary"><h5>Mode</h5></div>`,
                                styles: widgetTitleStyle,
                            }),
                            createWidget({
                                widgetType: AjfWidgetType.Text,
                                htmlText: `<p>[[MODE(forms,"${field.name}")]]</p>`,
                                styles: widgetTitleStyle,
                            }),
                        ],
                    }),
                ],
            }),
            createWidget({
                widgetType: AjfWidgetType.Chart,
                type: AjfChartType.Bar,
                labels,
                dataset,
                options: {
                    responsive: true,
                    maintainAspectRatio: true,
                    legend: { display: true, position: 'bottom' },
                },
                styles: { width: '100%', height: '100%' },
                exportable: true,
            }),
        ],
    });
}
/**
 * This function returns a basic report for any form passed in input.
 *
 * @param form the form schema
 * @param [id] the id of the form inside the plathform.
 */
export function automaticReport(form, id) {
    const report = {};
    const reportWidgets = [];
    // we assume that the array of forms passed to the report is called 'forms'.
    if (id != null) {
        report.variables = [{ name: 'forms', formula: { 'formula': `forms[${id}]` } }];
    }
    form.nodes?.forEach(slide => {
        const slideWidgets = [];
        const isInRepeating = slide.nodeType === AjfNodeType.AjfRepeatingSlide;
        slide.nodes.forEach((field) => {
            field.name = isInRepeating ? field.name + '__' : field.name;
            // create the title of the widget.
            const fieldTitleWidget = createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: `<div color="primary"><h5>${field.label} - [[COUNT_FORMS(forms,"${field.name} != null")]] answers</h5></div>`,
                styles: widgetTitleStyle,
            });
            slideWidgets.push(fieldTitleWidget);
            switch (field.fieldType) {
                default:
                    slideWidgets.pop(); // remove the title of empty widget
                    break;
                case AjfFieldType.Number:
                    slideWidgets.push(createNumberWidget(field));
                    break;
                case AjfFieldType.Boolean:
                    slideWidgets.push(createBooleanWidget(field));
                    break;
                case AjfFieldType.SingleChoice:
                    slideWidgets.push(createSingleChoiceWidget(field));
                    break;
                case AjfFieldType.MultipleChoice:
                    slideWidgets.push(createMultipleChoiceWidget(field));
                    break;
                case AjfFieldType.Range:
                    slideWidgets.push(createRangeWidget(field));
                    break;
            }
        });
        // if the slide have a widgets add him to the reports with the relative title
        if (slideWidgets.length > 0) {
            // create the title of the slide.
            const slideTitleWidget = createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: `<div color="primary"><h1>${slide.label}</h1></div>`,
                styles: slideTitleStyle,
            });
            reportWidgets.push(slideTitleWidget);
            // create the column with the slide widgets.
            const columnWidget = createWidget({
                widgetType: AjfWidgetType.Column,
                content: slideWidgets,
                styles: slideContentStyle,
            });
            reportWidgets.push(columnWidget);
        }
    });
    report.content = createReportContainer({ content: [...reportWidgets] });
    return report;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b21hdGljLXJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvYXV0b21hdGljLXJlcG9ydC9hdXRvbWF0aWMtcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFFTCxZQUFZLEVBR1osV0FBVyxHQUVaLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU01RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUNMLGVBQWUsRUFDZixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLFNBQVMsbUJBQW1CLENBQUMsS0FBZTtJQUMxQyxPQUFPLFlBQVksQ0FBQztRQUNsQixVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDaEMsT0FBTyxFQUFFO1lBQ1AsWUFBWSxDQUFDO2dCQUNYLFVBQVUsRUFBRSxhQUFhLENBQUMsS0FBSztnQkFDL0IsSUFBSSxFQUFFLFlBQVksQ0FBQyxHQUFHO2dCQUN0QixNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUM7Z0JBQ3RDLE9BQU8sRUFBRTtvQkFDUCxhQUFhLENBQUM7d0JBQ1osS0FBSyxFQUFFLE1BQU07d0JBQ2IsT0FBTyxFQUFFOzRC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QkFDL0MsVUFBVSxFQUFFLGFBQWEsQ0FBQyxJQUFJO2dCQUM5QixRQUFRLEVBQUUsNEJBQTRCLEtBQUssQ0FBQyxLQUFLLGFBQWE7Z0JBQzlELE1BQU0sRUFBRSxlQUFlO2FBQ0wsQ0FBQyxDQUFDO1lBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNyQyw0Q0FBNEM7WUFDNUMsTUFBTSxZQUFZLEdBQWMsWUFBWSxDQUFDO2dCQUMzQyxVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU07Z0JBQ2hDLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixNQUFNLEVBQUUsaUJBQWlCO2FBQ1AsQ0FBQyxDQUFDO1lBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxFQUF1QixDQUFDLENBQUM7SUFFNUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtcbiAgQWpmRmllbGQsXG4gIEFqZkZpZWxkVHlwZSxcbiAgQWpmRmllbGRXaXRoQ2hvaWNlcyxcbiAgQWpmRm9ybSxcbiAgQWpmTm9kZVR5cGUsXG4gIEFqZlJhbmdlRmllbGQsXG59IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge2NyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZkNoYXJ0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlJztcbmltcG9ydCB7QWpmRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvZGF0YXNldCc7XG5pbXBvcnQge0FqZlJlcG9ydH0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0JztcbmltcG9ydCB7QWpmUmVwb3J0Q29udGFpbmVyfSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtY29udGFpbmVyJztcbmltcG9ydCB7QWpmUmVwb3J0VmFyaWFibGV9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC12YXJpYWJsZSc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuaW1wb3J0IHtjcmVhdGVEYXRhc2V0fSBmcm9tICcuLi91dGlscy9kYXRhc2V0L2NyZWF0ZS1kYXRhc2V0JztcbmltcG9ydCB7Y3JlYXRlUmVwb3J0Q29udGFpbmVyfSBmcm9tICcuLi91dGlscy9yZXBvcnRzL2NyZWF0ZS1yZXBvcnQtY29udGFpbmVyJztcbmltcG9ydCB7QWpmV2lkZ2V0Q3JlYXRlLCBjcmVhdGVXaWRnZXR9IGZyb20gJy4uL3V0aWxzL3dpZGdldHMvY3JlYXRlLXdpZGdldCc7XG5pbXBvcnQge1xuICBiYWNrZ3JvdW5kQ29sb3IsXG4gIGJveFN0eWxlLFxuICBzbGlkZUNvbnRlbnRTdHlsZSxcbiAgc2xpZGVUaXRsZVN0eWxlLFxuICB3aWRnZXRTdHlsZSxcbiAgd2lkZ2V0VGl0bGVTdHlsZSxcbn0gZnJvbSAnLi9zdHlsZXMnO1xuXG5mdW5jdGlvbiBjcmVhdGVCb29sZWFuV2lkZ2V0KGZpZWxkOiBBamZGaWVsZCk6IEFqZldpZGdldCB7XG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgICAgIHR5cGU6IEFqZkNoYXJ0VHlwZS5QaWUsXG4gICAgICAgIGxhYmVsczoge2Zvcm11bGE6IFwiWydUcnVlJywgJ0ZhbHNlJ11cIn0sXG4gICAgICAgIGRhdGFzZXQ6IFtcbiAgICAgICAgICBjcmVhdGVEYXRhc2V0KHtcbiAgICAgICAgICAgIGxhYmVsOiAndHJ1ZScsXG4gICAgICAgICAgICBmb3JtdWxhOiBbXG4gICAgICAgICAgICAgIGNyZWF0ZUZvcm11bGEoe1xuICAgICAgICAgICAgICAgIGZvcm11bGE6IGBbQ09VTlRfRk9STVMoZm9ybXMsXCIke2ZpZWxkLm5hbWV9PT09dHJ1ZVwiKSxDT1VOVF9GT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT1mYWxzZVwiKV1gLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBvcHRpb25zOiB7YmFja2dyb3VuZENvbG9yOiBbJ2dyZWVuJywgJ3JlZCddfSxcbiAgICAgICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pIGFzIEFqZkRhdGFzZXQsXG4gICAgICAgIF0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IHRydWUsXG4gICAgICAgICAgbGVnZW5kOiB7ZGlzcGxheTogdHJ1ZSwgcG9zaXRpb246ICdib3R0b20nfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGVzOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9LFxuICAgICAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgIF0sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU11bHRpcGxlQ2hvaWNlV2lkZ2V0KGZpZWxkOiBBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4pOiBBamZXaWRnZXQge1xuICBjb25zdCBjaG9pY2VzID0gZmllbGQuY2hvaWNlc09yaWdpbi5jaG9pY2VzO1xuICBsZXQgZGF0YXNldDogQWpmRGF0YXNldFtdID0gY2hvaWNlcy5tYXAoXG4gICAgKGMsIGluZGV4KSA9PlxuICAgICAgY3JlYXRlRGF0YXNldCh7XG4gICAgICAgIGxhYmVsOiBgJHtjLmxhYmVsfWAsXG4gICAgICAgIGZvcm11bGE6IFtcbiAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtcbiAgICAgICAgICAgIGZvcm11bGE6IGBbQ09VTlRfRk9STVMoZm9ybXMsXCIke2ZpZWxkLm5hbWV9LmluZGV4T2YoJyR7Yy52YWx1ZX0nKSA+IC0xXCIpXWAsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvcltpbmRleF0sXG4gICAgICAgICAgc3RhY2s6IGBTdGFjayAke2luZGV4fWAsXG4gICAgICAgIH0sXG4gICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pIGFzIEFqZkRhdGFzZXQsXG4gICk7XG4gIGxldCBjaGFydFR5cGUgPSBBamZDaGFydFR5cGUuQmFyO1xuICBsZXQgbGFiZWxzID0ge2Zvcm11bGE6IGBbXWB9O1xuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgICAgIHR5cGU6IGNoYXJ0VHlwZSxcbiAgICAgICAgbGFiZWxzLFxuICAgICAgICBkYXRhc2V0LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiB0cnVlLFxuICAgICAgICAgIGxlZ2VuZDoge2Rpc3BsYXk6IHRydWUsIHBvc2l0aW9uOiAnYm90dG9tJ30sXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnfSxcbiAgICAgICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICBdLFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVOdW1iZXJXaWRnZXQoZmllbGQ6IEFqZkZpZWxkKTogQWpmV2lkZ2V0IHtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgc3R5bGVzOiB3aWRnZXRTdHlsZSxcbiAgICBjb250ZW50OiBbXG4gICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkxheW91dCxcbiAgICAgICAgY29sdW1uczogWzAuMzMsIDAuMzMsIDAuMzNdLFxuICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5NZWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICAnaHRtbFRleHQnOiBgPHA+W1tNRUFOKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dIC8gW1tNQVgoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIHN0eWxlczogYm94U3R5bGUsXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TWVkaWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICAnaHRtbFRleHQnOiBgPHA+W1tNRURJQU4oZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV0gLyBbW01BWChmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5Nb2RlPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICBodG1sVGV4dDogYDxwPltbTU9ERShmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgIF0sXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgXSxcbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlU2luZ2xlQ2hvaWNlV2lkZ2V0KGZpZWxkOiBBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4pOiBBamZXaWRnZXQge1xuICBjb25zdCBjaG9pY2VzID0gZmllbGQuY2hvaWNlc09yaWdpbi5jaG9pY2VzO1xuICBsZXQgZGF0YXNldDogQWpmRGF0YXNldFtdID0gW107XG4gIGxldCBjaGFydFR5cGUgPSBBamZDaGFydFR5cGUuQmFyO1xuICBsZXQgbGFiZWxzID0ge2Zvcm11bGE6IGBbXWB9O1xuXG4gIGlmIChjaG9pY2VzLmxlbmd0aCA+IDUpIHtcbiAgICBsYWJlbHMgPSB7Zm9ybXVsYTogYFske2Nob2ljZXMubWFwKGMgPT4gYCR7SlNPTi5zdHJpbmdpZnkoYy5sYWJlbCl9YCl9XWB9O1xuICAgIGNoYXJ0VHlwZSA9IEFqZkNoYXJ0VHlwZS5QaWU7XG4gICAgZGF0YXNldCA9IFtcbiAgICAgIGNyZWF0ZURhdGFzZXQoe1xuICAgICAgICBsYWJlbDogZmllbGQubGFiZWwsXG4gICAgICAgIGZvcm11bGE6IFtcbiAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtcbiAgICAgICAgICAgIGZvcm11bGE6IGBbJHtjaG9pY2VzXG4gICAgICAgICAgICAgIC5tYXAoY2hvaWNlID0+IGBDT1VOVF9GT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT0nJHtjaG9pY2UudmFsdWV9J1wiKWApXG4gICAgICAgICAgICAgIC50b1N0cmluZygpfV1gLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICBvcHRpb25zOiB7YmFja2dyb3VuZENvbG9yfSxcbiAgICAgIH0gYXMgYW55KSBhcyBBamZEYXRhc2V0LFxuICAgIF07XG4gIH0gZWxzZSB7XG4gICAgZGF0YXNldCA9IGNob2ljZXMubWFwKFxuICAgICAgKGMsIGluZGV4KSA9PlxuICAgICAgICBjcmVhdGVEYXRhc2V0KHtcbiAgICAgICAgICBsYWJlbDogYCR7Yy5sYWJlbH1gLFxuICAgICAgICAgIGZvcm11bGE6IFtcbiAgICAgICAgICAgIGNyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBbQ09VTlRfRk9STVMoZm9ybXMsXCIke2ZpZWxkLm5hbWV9PT09JyR7Yy52YWx1ZX0nXCIpXWB9KSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yW2luZGV4XSxcbiAgICAgICAgICAgIHN0YWNrOiBgU3RhY2sgJHtpbmRleH1gLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0gYXMgUGFydGlhbDxBamZEYXRhc2V0PikgYXMgQWpmRGF0YXNldCxcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgY29udGVudDogW1xuICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICAgICAgdHlwZTogY2hhcnRUeXBlLFxuICAgICAgICBsYWJlbHMsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IHRydWUsXG4gICAgICAgICAgbGVnZW5kOiB7ZGlzcGxheTogdHJ1ZSwgcG9zaXRpb246ICdib3R0b20nfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGVzOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9LFxuICAgICAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgIF0sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmFuZ2VXaWRnZXQoZmllbGQ6IEFqZlJhbmdlRmllbGQpOiBBamZXaWRnZXQge1xuICBjb25zdCBlbmQgPSBmaWVsZC5lbmQgPz8gMTE7XG4gIGNvbnN0IHN0YXJ0ID0gZmllbGQuc3RhcnQgPz8gMTtcbiAgbGV0IGNob2ljZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgY2hvaWNlcy5wdXNoKGkpO1xuICB9XG5cbiAgbGV0IGxhYmVscyA9IHtmb3JtdWxhOiBgWyR7SlNPTi5zdHJpbmdpZnkoZmllbGQubGFiZWwpfV1gfTtcbiAgbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXRbXSA9IGNob2ljZXMubWFwKFxuICAgIChfLCBpbmRleCkgPT5cbiAgICAgIGNyZWF0ZURhdGFzZXQoe1xuICAgICAgICBsYWJlbDogYCR7aW5kZXggKyBzdGFydH1gLFxuICAgICAgICBmb3JtdWxhOiBbXG4gICAgICAgICAgY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFtDT1VOVF9GT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT0ke2luZGV4ICsgMSArIHN0YXJ0fVwiKV1gfSksXG4gICAgICAgIF0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvcltpbmRleF0sXG4gICAgICAgICAgc3RhY2s6IGBTdGFjayAke2luZGV4fWAsXG4gICAgICAgIH0sXG4gICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pIGFzIEFqZkRhdGFzZXQsXG4gICk7XG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgIHN0eWxlczogd2lkZ2V0U3R5bGUsXG4gICAgY29udGVudDogW1xuICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5MYXlvdXQsXG4gICAgICAgIGNvbHVtbnM6IFswLjMzLCAwLjMzLCAwLjMzXSxcbiAgICAgICAgY29udGVudDogW1xuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIHN0eWxlczogYm94U3R5bGUsXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TWVhbjwvaDU+PC9kaXY+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgJ2h0bWxUZXh0JzogYDxwPltbTUVBTihmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXSAvIFtbTUFYKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dPC9wPmAsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgICBzdHlsZXM6IGJveFN0eWxlLFxuICAgICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGg1Pk1lZGlhbjwvaDU+PC9kaXY+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgJ2h0bWxUZXh0JzogYDxwPltbTUVESUFOKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dIC8gW1tNQVgoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIHN0eWxlczogYm94U3R5bGUsXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TW9kZTwvaDU+PC9kaXY+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8cD5bW01PREUoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICBdLFxuICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICAgICAgdHlwZTogQWpmQ2hhcnRUeXBlLkJhcixcbiAgICAgICAgbGFiZWxzLFxuICAgICAgICBkYXRhc2V0LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiB0cnVlLFxuICAgICAgICAgIGxlZ2VuZDoge2Rpc3BsYXk6IHRydWUsIHBvc2l0aW9uOiAnYm90dG9tJ30sXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnfSxcbiAgICAgICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICBdLFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5cbi8qKlxuICogVGhpcyBmdW5jdGlvbiByZXR1cm5zIGEgYmFzaWMgcmVwb3J0IGZvciBhbnkgZm9ybSBwYXNzZWQgaW4gaW5wdXQuXG4gKlxuICogQHBhcmFtIGZvcm0gdGhlIGZvcm0gc2NoZW1hXG4gKiBAcGFyYW0gW2lkXSB0aGUgaWQgb2YgdGhlIGZvcm0gaW5zaWRlIHRoZSBwbGF0aGZvcm0uXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBhdXRvbWF0aWNSZXBvcnQoZm9ybTogUGFydGlhbDxBamZGb3JtPiwgaWQ/OiBudW1iZXIpOiBBamZSZXBvcnQge1xuICBjb25zdCByZXBvcnQ6IEFqZlJlcG9ydCA9IHt9O1xuICBjb25zdCByZXBvcnRXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuICAvLyB3ZSBhc3N1bWUgdGhhdCB0aGUgYXJyYXkgb2YgZm9ybXMgcGFzc2VkIHRvIHRoZSByZXBvcnQgaXMgY2FsbGVkICdmb3JtcycuXG4gIGlmIChpZCAhPSBudWxsKSB7XG4gICAgcmVwb3J0LnZhcmlhYmxlcyA9IFt7bmFtZTogJ2Zvcm1zJywgZm9ybXVsYTogeydmb3JtdWxhJzogYGZvcm1zWyR7aWR9XWB9fSBhcyBBamZSZXBvcnRWYXJpYWJsZV07XG4gIH1cbiAgZm9ybS5ub2Rlcz8uZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgY29uc3Qgc2xpZGVXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuICAgIGNvbnN0IGlzSW5SZXBlYXRpbmcgPSBzbGlkZS5ub2RlVHlwZSA9PT0gQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGU7XG5cbiAgICAoc2xpZGUubm9kZXMgYXMgQWpmRmllbGRbXSkuZm9yRWFjaCgoZmllbGQ6IEFqZkZpZWxkKSA9PiB7XG4gICAgICBmaWVsZC5uYW1lID0gaXNJblJlcGVhdGluZyA/IGZpZWxkLm5hbWUgKyAnX18nIDogZmllbGQubmFtZTtcbiAgICAgIC8vIGNyZWF0ZSB0aGUgdGl0bGUgb2YgdGhlIHdpZGdldC5cbiAgICAgIGNvbnN0IGZpZWxkVGl0bGVXaWRnZXQ6IEFqZldpZGdldCA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT4ke2ZpZWxkLmxhYmVsfSAtIFtbQ09VTlRfRk9STVMoZm9ybXMsXCIke2ZpZWxkLm5hbWV9ICE9IG51bGxcIildXSBhbnN3ZXJzPC9oNT48L2Rpdj5gLFxuICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG4gICAgICBzbGlkZVdpZGdldHMucHVzaChmaWVsZFRpdGxlV2lkZ2V0KTtcblxuICAgICAgc3dpdGNoIChmaWVsZC5maWVsZFR5cGUpIHtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucG9wKCk7IC8vIHJlbW92ZSB0aGUgdGl0bGUgb2YgZW1wdHkgd2lkZ2V0XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk51bWJlcjpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVOdW1iZXJXaWRnZXQoZmllbGQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuQm9vbGVhbjpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVCb29sZWFuV2lkZ2V0KGZpZWxkKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVTaW5nbGVDaG9pY2VXaWRnZXQoZmllbGQgYXMgQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgICAgIHNsaWRlV2lkZ2V0cy5wdXNoKGNyZWF0ZU11bHRpcGxlQ2hvaWNlV2lkZ2V0KGZpZWxkIGFzIEFqZkZpZWxkV2l0aENob2ljZXM8YW55PikpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5SYW5nZTpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVSYW5nZVdpZGdldChmaWVsZCBhcyBBamZSYW5nZUZpZWxkKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gaWYgdGhlIHNsaWRlIGhhdmUgYSB3aWRnZXRzIGFkZCBoaW0gdG8gdGhlIHJlcG9ydHMgd2l0aCB0aGUgcmVsYXRpdmUgdGl0bGVcbiAgICBpZiAoc2xpZGVXaWRnZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGNyZWF0ZSB0aGUgdGl0bGUgb2YgdGhlIHNsaWRlLlxuICAgICAgY29uc3Qgc2xpZGVUaXRsZVdpZGdldDogQWpmV2lkZ2V0ID0gY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGgxPiR7c2xpZGUubGFiZWx9PC9oMT48L2Rpdj5gLFxuICAgICAgICBzdHlsZXM6IHNsaWRlVGl0bGVTdHlsZSxcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbiAgICAgIHJlcG9ydFdpZGdldHMucHVzaChzbGlkZVRpdGxlV2lkZ2V0KTtcbiAgICAgIC8vIGNyZWF0ZSB0aGUgY29sdW1uIHdpdGggdGhlIHNsaWRlIHdpZGdldHMuXG4gICAgICBjb25zdCBjb2x1bW5XaWRnZXQ6IEFqZldpZGdldCA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICBjb250ZW50OiBzbGlkZVdpZGdldHMsXG4gICAgICAgIHN0eWxlczogc2xpZGVDb250ZW50U3R5bGUsXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG4gICAgICByZXBvcnRXaWRnZXRzLnB1c2goY29sdW1uV2lkZ2V0KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJlcG9ydC5jb250ZW50ID0gY3JlYXRlUmVwb3J0Q29udGFpbmVyKHtjb250ZW50OiBbLi4ucmVwb3J0V2lkZ2V0c119IGFzIEFqZlJlcG9ydENvbnRhaW5lcik7XG5cbiAgcmV0dXJuIHJlcG9ydDtcbn1cbiJdfQ==