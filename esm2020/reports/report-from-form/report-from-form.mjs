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
import { AjfFieldType } from '@ajf/core/forms';
import { createFormula } from '@ajf/core/models';
import { AjfChartType } from '../interface/charts/chart-type';
import { AjfWidgetType } from '../interface/widgets/widget-type';
import { createDataset } from '../utils/dataset/create-dataset';
import { createReportContainer } from '../utils/reports/create-report-container';
import { createWidget } from '../utils/widgets/create-widget';
import { backgroundColor, boxStyle, slideContentStyle, slideTitleStyle, widgetStyle, widgetTitleStyle } from './styles';
function createBooleanWidget(field) {
    return createWidget({
        widgetType: AjfWidgetType.Column,
        content: [createWidget({
                widgetType: AjfWidgetType.Chart,
                type: AjfChartType.Pie,
                labels: { formula: '[\'True\', \'False\']' },
                dataset: [createDataset({
                        label: 'true',
                        formula: [createFormula({
                                formula: `[COUNTFORMS(forms,"${field.name}===true"),COUNTFORMS(forms,"${field.name}===false")]`
                            })],
                        options: { backgroundColor: ['green', 'red'] }
                    })],
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' }
                },
                styles: { width: '100%', height: '400px' },
                exportable: true
            })],
    });
}
function createMultipleChoiceWidget(field) {
    const choices = field.choicesOrigin.choices;
    let dataset = choices.map((c, index) => createDataset({
        label: `${c.label}`,
        formula: [createFormula({ formula: `[COUNTFORMS(forms,"${field.name}.indexOf('${c.value}') > -1")]` })],
        options: {
            backgroundColor: backgroundColor[index],
            stack: `Stack ${index}`,
        }
    }));
    let chartType = AjfChartType.Bar;
    let labels = { formula: `[]` };
    return createWidget({
        widgetType: AjfWidgetType.Column,
        content: [createWidget({
                widgetType: AjfWidgetType.Chart,
                type: chartType,
                labels,
                dataset,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' }
                },
                styles: { width: '100%', height: '400px' },
                exportable: true
            })],
    });
}
function createNumberWidget(field) {
    return createWidget({
        widgetType: AjfWidgetType.Column,
        styles: widgetStyle,
        content: [createWidget({
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
                            })
                        ]
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
                            })
                        ]
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
                            })
                        ]
                    }),
                ]
            })]
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
        dataset =
            [createDataset({
                    label: field.label,
                    formula: [createFormula({
                            formula: `[${choices.map((choice) => `COUNTFORMS(forms,"${field.name}==='${choice.value}'")`)
                                .toString()}]`
                        })],
                    options: { backgroundColor }
                })];
    }
    else {
        dataset = choices.map((c, index) => createDataset({
            label: `${c.label}`,
            formula: [createFormula({ formula: `[COUNTFORMS(forms,"${field.name}==='${c.value}'")]` })],
            options: {
                backgroundColor: backgroundColor[index],
                stack: `Stack ${index}`,
            }
        }));
    }
    return createWidget({
        widgetType: AjfWidgetType.Column,
        content: [createWidget({
                widgetType: AjfWidgetType.Chart,
                type: chartType,
                labels,
                dataset,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' }
                },
                styles: { width: '100%', height: '400px' },
                exportable: true
            })],
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
        formula: [createFormula({ formula: `[COUNTFORMS(forms,"${field.name}===${index + 1 + start}")]` })],
        options: {
            backgroundColor: backgroundColor[index],
            stack: `Stack ${index}`,
        }
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
                            })
                        ]
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
                            })
                        ]
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
                            })
                        ]
                    }),
                ]
            }),
            createWidget({
                widgetType: AjfWidgetType.Chart,
                type: AjfChartType.Bar,
                labels,
                dataset,
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' }
                },
                styles: { width: '100%', height: '400px' },
                exportable: true
            })
        ]
    });
}
/**
 * This function returns a basic report for any form passed in input.
 *
 * @param form the form schema
 * @param [id] the id of the form inside the plathform.
 */
export function reportFromForm(form, id) {
    const report = {};
    const reportWidgets = [];
    // we assume that the array of forms passed to the report is called 'forms'.
    if (id != null) {
        report.variables = [{ name: 'forms', formula: { 'formula': `forms[${id}]` } }];
    }
    form.nodes?.forEach(slide => {
        const slideWidgets = [];
        slide.nodes.forEach((field) => {
            // create the title of the widget.
            const fieldTitleWidget = createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: `<div color="primary"><h5>${field.label} - [[COUNTFORMS(forms,"${field.name} != null")]] answers</h5></div>`,
                styles: widgetTitleStyle
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
                styles: slideTitleStyle
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWZyb20tZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvcmVwb3J0LWZyb20tZm9ybS9yZXBvcnQtZnJvbS1mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQThDLE1BQU0saUJBQWlCLENBQUM7QUFDcEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU01RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUNMLGVBQWUsRUFDZixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2pCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLFNBQVMsbUJBQW1CLENBQUMsS0FBZTtJQUMxQyxPQUFPLFlBQVksQ0FBQztRQUNsQixVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDaEMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNyQixVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0JBQy9CLElBQUksRUFBRSxZQUFZLENBQUMsR0FBRztnQkFDdEIsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFDO2dCQUMxQyxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7d0JBQ1osS0FBSyxFQUFFLE1BQU07d0JBQ2IsT0FBTyxFQUFFLENBQUMsYUFBYSxD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QVksR0FBYyxZQUFZLENBQUM7Z0JBQzNDLFVBQVUsRUFBRSxhQUFhLENBQUMsTUFBTTtnQkFDaEMsT0FBTyxFQUFFLFlBQVk7Z0JBQ3JCLE1BQU0sRUFBRSxpQkFBaUI7YUFDUCxDQUFDLENBQUM7WUFDdEIsYUFBYSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsQ0FBQztTQUNsQztJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxDQUFDLE9BQU8sR0FBRyxxQkFBcUIsQ0FBQyxFQUFDLE9BQU8sRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDLEVBQXVCLENBQUMsQ0FBQztJQUU1RixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkZpZWxkLCBBamZGaWVsZFR5cGUsIEFqZkZpZWxkV2l0aENob2ljZXMsIEFqZkZvcm0sIEFqZlJhbmdlRmllbGR9IGZyb20gJ0BhamYvY29yZS9mb3Jtcyc7XG5pbXBvcnQge2NyZWF0ZUZvcm11bGF9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG5pbXBvcnQge0FqZkNoYXJ0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL2NoYXJ0cy9jaGFydC10eXBlJztcbmltcG9ydCB7QWpmRGF0YXNldH0gZnJvbSAnLi4vaW50ZXJmYWNlL2RhdGFzZXQvZGF0YXNldCc7XG5pbXBvcnQge0FqZlJlcG9ydH0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0JztcbmltcG9ydCB7QWpmUmVwb3J0Q29udGFpbmVyfSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtY29udGFpbmVyJztcbmltcG9ydCB7QWpmUmVwb3J0VmFyaWFibGV9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC12YXJpYWJsZSc7XG5pbXBvcnQge0FqZldpZGdldH0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0JztcbmltcG9ydCB7QWpmV2lkZ2V0VHlwZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3dpZGdldHMvd2lkZ2V0LXR5cGUnO1xuaW1wb3J0IHtjcmVhdGVEYXRhc2V0fSBmcm9tICcuLi91dGlscy9kYXRhc2V0L2NyZWF0ZS1kYXRhc2V0JztcbmltcG9ydCB7Y3JlYXRlUmVwb3J0Q29udGFpbmVyfSBmcm9tICcuLi91dGlscy9yZXBvcnRzL2NyZWF0ZS1yZXBvcnQtY29udGFpbmVyJztcbmltcG9ydCB7QWpmV2lkZ2V0Q3JlYXRlLCBjcmVhdGVXaWRnZXR9IGZyb20gJy4uL3V0aWxzL3dpZGdldHMvY3JlYXRlLXdpZGdldCc7XG5pbXBvcnQge1xuICBiYWNrZ3JvdW5kQ29sb3IsXG4gIGJveFN0eWxlLFxuICBzbGlkZUNvbnRlbnRTdHlsZSxcbiAgc2xpZGVUaXRsZVN0eWxlLFxuICB3aWRnZXRTdHlsZSxcbiAgd2lkZ2V0VGl0bGVTdHlsZVxufSBmcm9tICcuL3N0eWxlcyc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvb2xlYW5XaWRnZXQoZmllbGQ6IEFqZkZpZWxkKTogQWpmV2lkZ2V0IHtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgY29udGVudDogW2NyZWF0ZVdpZGdldCh7XG4gICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNoYXJ0LFxuICAgICAgdHlwZTogQWpmQ2hhcnRUeXBlLlBpZSxcbiAgICAgIGxhYmVsczoge2Zvcm11bGE6ICdbXFwnVHJ1ZVxcJywgXFwnRmFsc2VcXCddJ30sXG4gICAgICBkYXRhc2V0OiBbY3JlYXRlRGF0YXNldCh7XG4gICAgICAgICAgICAgICAgICBsYWJlbDogJ3RydWUnLFxuICAgICAgICAgICAgICAgICAgZm9ybXVsYTogW2NyZWF0ZUZvcm11bGEoe1xuICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBgW0NPVU5URk9STVMoZm9ybXMsXCIke2ZpZWxkLm5hbWV9PT09dHJ1ZVwiKSxDT1VOVEZPUk1TKGZvcm1zLFwiJHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLm5hbWV9PT09ZmFsc2VcIildYFxuICAgICAgICAgICAgICAgICAgfSldLFxuICAgICAgICAgICAgICAgICAgb3B0aW9uczoge2JhY2tncm91bmRDb2xvcjogWydncmVlbicsICdyZWQnXX1cbiAgICAgICAgICAgICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pIGFzIEFqZkRhdGFzZXRdLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICAgICAgbGVnZW5kOiB7ZGlzcGxheTogdHJ1ZSwgcG9zaXRpb246ICdib3R0b20nfVxuICAgICAgfSxcbiAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzQwMHB4J30sXG4gICAgICBleHBvcnRhYmxlOiB0cnVlXG4gICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpXSxcbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlTXVsdGlwbGVDaG9pY2VXaWRnZXQoZmllbGQ6IEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pik6IEFqZldpZGdldCB7XG4gIGNvbnN0IGNob2ljZXMgPSBmaWVsZC5jaG9pY2VzT3JpZ2luLmNob2ljZXM7XG4gIGxldCBkYXRhc2V0OiBBamZEYXRhc2V0W10gPSBjaG9pY2VzLm1hcChcbiAgICAgIChjLCBpbmRleCkgPT5cbiAgICAgICAgICBjcmVhdGVEYXRhc2V0KHtcbiAgICAgICAgICAgIGxhYmVsOiBgJHtjLmxhYmVsfWAsXG4gICAgICAgICAgICBmb3JtdWxhOiBbY3JlYXRlRm9ybXVsYShcbiAgICAgICAgICAgICAgICB7Zm9ybXVsYTogYFtDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfS5pbmRleE9mKCcke2MudmFsdWV9JykgPiAtMVwiKV1gfSldLFxuICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvcltpbmRleF0sXG4gICAgICAgICAgICAgIHN0YWNrOiBgU3RhY2sgJHtpbmRleH1gLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gYXMgUGFydGlhbDxBamZEYXRhc2V0PikgYXMgQWpmRGF0YXNldCk7XG4gIGxldCBjaGFydFR5cGUgPSBBamZDaGFydFR5cGUuQmFyO1xuICBsZXQgbGFiZWxzID0ge2Zvcm11bGE6IGBbXWB9O1xuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgIGNvbnRlbnQ6IFtjcmVhdGVXaWRnZXQoe1xuICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICAgIHR5cGU6IGNoYXJ0VHlwZSxcbiAgICAgIGxhYmVscyxcbiAgICAgIGRhdGFzZXQsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9XG4gICAgICB9LFxuICAgICAgc3R5bGVzOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnNDAwcHgnfSxcbiAgICAgIGV4cG9ydGFibGU6IHRydWVcbiAgICB9IGFzIEFqZldpZGdldENyZWF0ZSldLFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVOdW1iZXJXaWRnZXQoZmllbGQ6IEFqZkZpZWxkKTogQWpmV2lkZ2V0IHtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgc3R5bGVzOiB3aWRnZXRTdHlsZSxcbiAgICBjb250ZW50OiBbY3JlYXRlV2lkZ2V0KHtcbiAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuTGF5b3V0LFxuICAgICAgY29sdW1uczogWzAuMzMsIDAuMzMsIDAuMzNdLFxuICAgICAgY29udGVudDogW1xuICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgIHN0eWxlczogYm94U3R5bGUsXG4gICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGg1Pk1lYW48L2g1PjwvZGl2PmAsXG4gICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgJ2h0bWxUZXh0JzogYDxwPltbTUVBTihmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXSAvIFtbTUFYKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dPC9wPmAsXG4gICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKVxuICAgICAgICAgIF1cbiAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgIHN0eWxlczogYm94U3R5bGUsXG4gICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGg1Pk1lZGlhbjwvaDU+PC9kaXY+YCxcbiAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAnaHRtbFRleHQnOlxuICAgICAgICAgICAgICAgICAgYDxwPltbTUVESUFOKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dIC8gW1tNQVgoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpXG4gICAgICAgICAgXVxuICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TW9kZTwvaDU+PC9kaXY+YCxcbiAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICBodG1sVGV4dDogYDxwPltbTU9ERShmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSlcbiAgICAgICAgICBdXG4gICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgIF1cbiAgICB9IGFzIEFqZldpZGdldENyZWF0ZSldXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVNpbmdsZUNob2ljZVdpZGdldChmaWVsZDogQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+KTogQWpmV2lkZ2V0IHtcbiAgY29uc3QgY2hvaWNlcyA9IGZpZWxkLmNob2ljZXNPcmlnaW4uY2hvaWNlcztcbiAgbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXRbXSA9IFtdO1xuICBsZXQgY2hhcnRUeXBlID0gQWpmQ2hhcnRUeXBlLkJhcjtcbiAgbGV0IGxhYmVscyA9IHtmb3JtdWxhOiBgW11gfTtcblxuICBpZiAoY2hvaWNlcy5sZW5ndGggPiA1KSB7XG4gICAgbGFiZWxzID0ge2Zvcm11bGE6IGBbJHtjaG9pY2VzLm1hcChjID0+IGAke0pTT04uc3RyaW5naWZ5KGMubGFiZWwpfWApfV1gfTtcbiAgICBjaGFydFR5cGUgPSBBamZDaGFydFR5cGUuUGllO1xuICAgIGRhdGFzZXQgPVxuICAgICAgICBbY3JlYXRlRGF0YXNldCh7XG4gICAgICAgICAgIGxhYmVsOiBmaWVsZC5sYWJlbCxcbiAgICAgICAgICAgZm9ybXVsYTogW2NyZWF0ZUZvcm11bGEoe1xuICAgICAgICAgICAgIGZvcm11bGE6IGBbJHtcbiAgICAgICAgICAgICAgICAgY2hvaWNlcy5tYXAoKGNob2ljZSkgPT4gYENPVU5URk9STVMoZm9ybXMsXCIke2ZpZWxkLm5hbWV9PT09JyR7Y2hvaWNlLnZhbHVlfSdcIilgKVxuICAgICAgICAgICAgICAgICAgICAgLnRvU3RyaW5nKCl9XWBcblxuICAgICAgICAgICB9KV0sXG4gICAgICAgICAgIG9wdGlvbnM6IHtiYWNrZ3JvdW5kQ29sb3J9XG4gICAgICAgICB9IGFzIGFueSkgYXMgQWpmRGF0YXNldF07XG4gIH0gZWxzZSB7XG4gICAgZGF0YXNldCA9IGNob2ljZXMubWFwKFxuICAgICAgICAoYywgaW5kZXgpID0+IGNyZWF0ZURhdGFzZXQoe1xuICAgICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGAke2MubGFiZWx9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFtjcmVhdGVGb3JtdWxhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtmb3JtdWxhOiBgW0NPVU5URk9STVMoZm9ybXMsXCIke2ZpZWxkLm5hbWV9PT09JyR7Yy52YWx1ZX0nXCIpXWB9KV0sXG4gICAgICAgICAgICAgICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yW2luZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2s6IGBTdGFjayAke2luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgfSBhcyBQYXJ0aWFsPEFqZkRhdGFzZXQ+KSBhcyBBamZEYXRhc2V0KTtcbiAgfVxuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgIGNvbnRlbnQ6IFtjcmVhdGVXaWRnZXQoe1xuICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICAgIHR5cGU6IGNoYXJ0VHlwZSxcbiAgICAgIGxhYmVscyxcbiAgICAgIGRhdGFzZXQsXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9XG4gICAgICB9LFxuICAgICAgc3R5bGVzOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnNDAwcHgnfSxcbiAgICAgIGV4cG9ydGFibGU6IHRydWVcbiAgICB9IGFzIEFqZldpZGdldENyZWF0ZSldLFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5cbmZ1bmN0aW9uIGNyZWF0ZVJhbmdlV2lkZ2V0KGZpZWxkOiBBamZSYW5nZUZpZWxkKTogQWpmV2lkZ2V0IHtcbiAgY29uc3QgZW5kID0gZmllbGQuZW5kID8/IDExO1xuICBjb25zdCBzdGFydCA9IGZpZWxkLnN0YXJ0ID8/IDE7XG4gIGxldCBjaG9pY2VzID0gW107XG4gIGZvciAobGV0IGkgPSBzdGFydDsgaSA8PSBlbmQ7IGkrKykge1xuICAgIGNob2ljZXMucHVzaChpKTtcbiAgfVxuXG4gIGxldCBsYWJlbHMgPSB7Zm9ybXVsYTogYFske0pTT04uc3RyaW5naWZ5KGZpZWxkLmxhYmVsKX1dYH07XG4gIGxldCBkYXRhc2V0OiBBamZEYXRhc2V0W10gPSBjaG9pY2VzLm1hcChcbiAgICAgIChfLCBpbmRleCkgPT4gY3JlYXRlRGF0YXNldCh7XG4gICAgICAgICAgICAgICAgICAgICAgbGFiZWw6IGAke2luZGV4ICsgc3RhcnR9YCxcbiAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBbY3JlYXRlRm9ybXVsYShcbiAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm11bGE6IGBbQ09VTlRGT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT0ke2luZGV4ICsgMSArIHN0YXJ0fVwiKV1gfSldLFxuICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yW2luZGV4XSxcbiAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrOiBgU3RhY2sgJHtpbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSBhcyBQYXJ0aWFsPEFqZkRhdGFzZXQ+KSBhcyBBamZEYXRhc2V0KTtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgc3R5bGVzOiB3aWRnZXRTdHlsZSxcbiAgICBjb250ZW50OiBbXG4gICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkxheW91dCxcbiAgICAgICAgY29sdW1uczogWzAuMzMsIDAuMzMsIDAuMzNdLFxuICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5NZWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICAnaHRtbFRleHQnOlxuICAgICAgICAgICAgICAgICAgICBgPHA+W1tNRUFOKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dIC8gW1tNQVgoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgICBzdHlsZXM6IGJveFN0eWxlLFxuICAgICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGg1Pk1lZGlhbjwvaDU+PC9kaXY+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgJ2h0bWxUZXh0JzpcbiAgICAgICAgICAgICAgICAgICAgYDxwPltbTUVESUFOKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dIC8gW1tNQVgoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgICBzdHlsZXM6IGJveFN0eWxlLFxuICAgICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGg1Pk1vZGU8L2g1PjwvZGl2PmAsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgIGh0bWxUZXh0OiBgPHA+W1tNT0RFKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dPC9wPmAsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSlcbiAgICAgICAgICAgIF1cbiAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgIF1cbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgICAgIHR5cGU6IEFqZkNoYXJ0VHlwZS5CYXIsXG4gICAgICAgIGxhYmVscyxcbiAgICAgICAgZGF0YXNldCxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICAgICAgbGVnZW5kOiB7ZGlzcGxheTogdHJ1ZSwgcG9zaXRpb246ICdib3R0b20nfVxuICAgICAgICB9LFxuICAgICAgICBzdHlsZXM6IHt3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICc0MDBweCd9LFxuICAgICAgICBleHBvcnRhYmxlOiB0cnVlXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSlcbiAgICBdXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSBiYXNpYyByZXBvcnQgZm9yIGFueSBmb3JtIHBhc3NlZCBpbiBpbnB1dC5cbiAqXG4gKiBAcGFyYW0gZm9ybSB0aGUgZm9ybSBzY2hlbWFcbiAqIEBwYXJhbSBbaWRdIHRoZSBpZCBvZiB0aGUgZm9ybSBpbnNpZGUgdGhlIHBsYXRoZm9ybS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcG9ydEZyb21Gb3JtKGZvcm06IFBhcnRpYWw8QWpmRm9ybT4sIGlkPzogbnVtYmVyKTogQWpmUmVwb3J0IHtcbiAgY29uc3QgcmVwb3J0OiBBamZSZXBvcnQgPSB7fTtcbiAgY29uc3QgcmVwb3J0V2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcbiAgLy8gd2UgYXNzdW1lIHRoYXQgdGhlIGFycmF5IG9mIGZvcm1zIHBhc3NlZCB0byB0aGUgcmVwb3J0IGlzIGNhbGxlZCAnZm9ybXMnLlxuICBpZiAoaWQgIT0gbnVsbCkge1xuICAgIHJlcG9ydC52YXJpYWJsZXMgPSBbe25hbWU6ICdmb3JtcycsIGZvcm11bGE6IHsnZm9ybXVsYSc6IGBmb3Jtc1ske2lkfV1gfX0gYXMgQWpmUmVwb3J0VmFyaWFibGVdO1xuICB9XG4gIGZvcm0ubm9kZXM/LmZvckVhY2goc2xpZGUgPT4ge1xuICAgIGNvbnN0IHNsaWRlV2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcblxuICAgIChzbGlkZS5ub2RlcyBhcyBBamZGaWVsZFtdKS5mb3JFYWNoKChmaWVsZDogQWpmRmllbGQpID0+IHtcbiAgICAgIC8vIGNyZWF0ZSB0aGUgdGl0bGUgb2YgdGhlIHdpZGdldC5cbiAgICAgIGNvbnN0IGZpZWxkVGl0bGVXaWRnZXQ6IEFqZldpZGdldCA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT4ke2ZpZWxkLmxhYmVsfSAtIFtbQ09VTlRGT1JNUyhmb3JtcyxcIiR7XG4gICAgICAgICAgICBmaWVsZC5uYW1lfSAhPSBudWxsXCIpXV0gYW5zd2VyczwvaDU+PC9kaXY+YCxcbiAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG4gICAgICBzbGlkZVdpZGdldHMucHVzaChmaWVsZFRpdGxlV2lkZ2V0KTtcblxuICAgICAgc3dpdGNoIChmaWVsZC5maWVsZFR5cGUpIHtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucG9wKCk7ICAvLyByZW1vdmUgdGhlIHRpdGxlIG9mIGVtcHR5IHdpZGdldFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5OdW1iZXI6XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnB1c2goY3JlYXRlTnVtYmVyV2lkZ2V0KGZpZWxkKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkJvb2xlYW46XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnB1c2goY3JlYXRlQm9vbGVhbldpZGdldChmaWVsZCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnB1c2goY3JlYXRlU2luZ2xlQ2hvaWNlV2lkZ2V0KGZpZWxkIGFzIEFqZkZpZWxkV2l0aENob2ljZXM8YW55PikpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZTpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVNdWx0aXBsZUNob2ljZVdpZGdldChmaWVsZCBhcyBBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4pKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuUmFuZ2U6XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnB1c2goY3JlYXRlUmFuZ2VXaWRnZXQoZmllbGQgYXMgQWpmUmFuZ2VGaWVsZCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGlmIHRoZSBzbGlkZSBoYXZlIGEgd2lkZ2V0cyBhZGQgaGltIHRvIHRoZSByZXBvcnRzIHdpdGggdGhlIHJlbGF0aXZlIHRpdGxlXG4gICAgaWYgKHNsaWRlV2lkZ2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjcmVhdGUgdGhlIHRpdGxlIG9mIHRoZSBzbGlkZS5cbiAgICAgIGNvbnN0IHNsaWRlVGl0bGVXaWRnZXQ6IEFqZldpZGdldCA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoMT4ke3NsaWRlLmxhYmVsfTwvaDE+PC9kaXY+YCxcbiAgICAgICAgc3R5bGVzOiBzbGlkZVRpdGxlU3R5bGVcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbiAgICAgIHJlcG9ydFdpZGdldHMucHVzaChzbGlkZVRpdGxlV2lkZ2V0KTtcbiAgICAgIC8vIGNyZWF0ZSB0aGUgY29sdW1uIHdpdGggdGhlIHNsaWRlIHdpZGdldHMuXG4gICAgICBjb25zdCBjb2x1bW5XaWRnZXQ6IEFqZldpZGdldCA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICBjb250ZW50OiBzbGlkZVdpZGdldHMsXG4gICAgICAgIHN0eWxlczogc2xpZGVDb250ZW50U3R5bGUsXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG4gICAgICByZXBvcnRXaWRnZXRzLnB1c2goY29sdW1uV2lkZ2V0KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJlcG9ydC5jb250ZW50ID0gY3JlYXRlUmVwb3J0Q29udGFpbmVyKHtjb250ZW50OiBbLi4ucmVwb3J0V2lkZ2V0c119IGFzIEFqZlJlcG9ydENvbnRhaW5lcik7XG5cbiAgcmV0dXJuIHJlcG9ydDtcbn1cbiJdfQ==