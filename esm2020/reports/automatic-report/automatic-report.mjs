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
            formula: [createFormula({ formula: `[COUNT_FORMS(forms,"${field.name}==='${c.value}'")]` })],
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
        slide.nodes.forEach(field => {
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
    report.content = createReportContainer({ content: [...reportWidgets], styles: {} });
    return report;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0b21hdGljLXJlcG9ydC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvcmVwb3J0cy9zcmMvYXV0b21hdGljLXJlcG9ydC9hdXRvbWF0aWMtcmVwb3J0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFFTCxZQUFZLEVBR1osV0FBVyxHQUVaLE1BQU0saUJBQWlCLENBQUM7QUFDekIsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUk1RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQUM1RCxPQUFPLEVBQ0wsZUFBZSxFQUNmLFFBQVEsRUFDUixpQkFBaUIsRUFDakIsZUFBZSxFQUNmLFdBQVcsRUFDWCxnQkFBZ0IsR0FDakIsTUFBTSxVQUFVLENBQUM7QUFFbEIsU0FBUyxtQkFBbUIsQ0FBQyxLQUFlO0lBQzFDLE9BQU8sWUFBWSxDQUFDO1FBQ2xCLFVBQVUsRUFBRSxhQUFhLENBQUMsTUFBTTtRQUNoQyxPQUFPLEVBQUU7WUFDUCxZQUFZLENBQUM7Z0JBQ1gsVUFBVSxFQUFFLGFBQWEsQ0FBQyxLQUFLO2dCQUMvQixJQUFJLEVBQUUsWUFBWSxDQUFDLEdBQUc7Z0JBQ3RCLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxtQkFBbUIsRUFBQztnQkFDdEMsT0FBTyxFQUFFO29CQUNQLGFBQWEsQ0FBQzt3QkFDWixLQUFLLEVBQUUsTUFBTTt3QkFDYixPQUFPLEVBQUU7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OUIsUUFBUSxFQUFFLDRCQUE0QixLQUFLLENBQUMsS0FBSyxhQUFhO2dCQUM5RCxNQUFNLEVBQUUsZUFBZTthQUN4QixDQUFDLENBQUM7WUFDSCxhQUFhLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLENBQUM7WUFDckMsNENBQTRDO1lBQzVDLE1BQU0sWUFBWSxHQUFjLFlBQVksQ0FBQztnQkFDM0MsVUFBVSxFQUFFLGFBQWEsQ0FBQyxNQUFNO2dCQUNoQyxPQUFPLEVBQUUsWUFBWTtnQkFDckIsTUFBTSxFQUFFLGlCQUFpQjthQUMxQixDQUFDLENBQUM7WUFDSCxhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsRUFBRSxNQUFNLEVBQUUsRUFBRSxFQUFDLENBQUMsQ0FBQztJQUVsRixPQUFPLE1BQU0sQ0FBQztBQUNoQixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1xuICBBamZGaWVsZCxcbiAgQWpmRmllbGRUeXBlLFxuICBBamZGaWVsZFdpdGhDaG9pY2VzLFxuICBBamZGb3JtLFxuICBBamZOb2RlVHlwZSxcbiAgQWpmUmFuZ2VGaWVsZCxcbn0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Y3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmQ2hhcnRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvY2hhcnRzL2NoYXJ0LXR5cGUnO1xuaW1wb3J0IHtBamZEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9kYXRhc2V0JztcbmltcG9ydCB7QWpmUmVwb3J0fSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcbmltcG9ydCB7Y3JlYXRlRGF0YXNldH0gZnJvbSAnLi4vdXRpbHMvZGF0YXNldC9jcmVhdGUtZGF0YXNldCc7XG5pbXBvcnQge2NyZWF0ZVJlcG9ydENvbnRhaW5lcn0gZnJvbSAnLi4vdXRpbHMvcmVwb3J0cy9jcmVhdGUtcmVwb3J0LWNvbnRhaW5lcic7XG5pbXBvcnQge2NyZWF0ZVdpZGdldH0gZnJvbSAnLi4vdXRpbHMvd2lkZ2V0cy9jcmVhdGUtd2lkZ2V0JztcbmltcG9ydCB7XG4gIGJhY2tncm91bmRDb2xvcixcbiAgYm94U3R5bGUsXG4gIHNsaWRlQ29udGVudFN0eWxlLFxuICBzbGlkZVRpdGxlU3R5bGUsXG4gIHdpZGdldFN0eWxlLFxuICB3aWRnZXRUaXRsZVN0eWxlLFxufSBmcm9tICcuL3N0eWxlcyc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvb2xlYW5XaWRnZXQoZmllbGQ6IEFqZkZpZWxkKTogQWpmV2lkZ2V0IHtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgY29udGVudDogW1xuICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICAgICAgdHlwZTogQWpmQ2hhcnRUeXBlLlBpZSxcbiAgICAgICAgbGFiZWxzOiB7Zm9ybXVsYTogXCJbJ1RydWUnLCAnRmFsc2UnXVwifSxcbiAgICAgICAgZGF0YXNldDogW1xuICAgICAgICAgIGNyZWF0ZURhdGFzZXQoe1xuICAgICAgICAgICAgbGFiZWw6ICd0cnVlJyxcbiAgICAgICAgICAgIGZvcm11bGE6IFtcbiAgICAgICAgICAgICAgY3JlYXRlRm9ybXVsYSh7XG4gICAgICAgICAgICAgICAgZm9ybXVsYTogYFtDT1VOVF9GT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT10cnVlXCIpLENPVU5UX0ZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfT09PWZhbHNlXCIpXWAsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtiYWNrZ3JvdW5kQ29sb3I6IFsnZ3JlZW4nLCAncmVkJ119LFxuICAgICAgICAgIH0gYXMgUGFydGlhbDxBamZEYXRhc2V0PiksXG4gICAgICAgIF0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IHRydWUsXG4gICAgICAgICAgbGVnZW5kOiB7ZGlzcGxheTogdHJ1ZSwgcG9zaXRpb246ICdib3R0b20nfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGVzOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9LFxuICAgICAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVNdWx0aXBsZUNob2ljZVdpZGdldChmaWVsZDogQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+KTogQWpmV2lkZ2V0IHtcbiAgY29uc3QgY2hvaWNlcyA9IGZpZWxkLmNob2ljZXNPcmlnaW4uY2hvaWNlcztcbiAgbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXRbXSA9IGNob2ljZXMubWFwKChjLCBpbmRleCkgPT5cbiAgICBjcmVhdGVEYXRhc2V0KHtcbiAgICAgIGxhYmVsOiBgJHtjLmxhYmVsfWAsXG4gICAgICBmb3JtdWxhOiBbXG4gICAgICAgIGNyZWF0ZUZvcm11bGEoe1xuICAgICAgICAgIGZvcm11bGE6IGBbQ09VTlRfRk9STVMoZm9ybXMsXCIke2ZpZWxkLm5hbWV9LmluZGV4T2YoJyR7Yy52YWx1ZX0nKSA+IC0xXCIpXWAsXG4gICAgICAgIH0pLFxuICAgICAgXSxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3JbaW5kZXhdLFxuICAgICAgICBzdGFjazogYFN0YWNrICR7aW5kZXh9YCxcbiAgICAgIH0sXG4gICAgfSBhcyBQYXJ0aWFsPEFqZkRhdGFzZXQ+KSxcbiAgKTtcbiAgbGV0IGNoYXJ0VHlwZSA9IEFqZkNoYXJ0VHlwZS5CYXI7XG4gIGxldCBsYWJlbHMgPSB7Zm9ybXVsYTogYFtdYH07XG5cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgY29udGVudDogW1xuICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICAgICAgdHlwZTogY2hhcnRUeXBlLFxuICAgICAgICBsYWJlbHMsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IHRydWUsXG4gICAgICAgICAgbGVnZW5kOiB7ZGlzcGxheTogdHJ1ZSwgcG9zaXRpb246ICdib3R0b20nfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGVzOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnMTAwJSd9LFxuICAgICAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgICAgfSksXG4gICAgXSxcbiAgfSk7XG59XG5mdW5jdGlvbiBjcmVhdGVOdW1iZXJXaWRnZXQoZmllbGQ6IEFqZkZpZWxkKTogQWpmV2lkZ2V0IHtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgc3R5bGVzOiB3aWRnZXRTdHlsZSxcbiAgICBjb250ZW50OiBbXG4gICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkxheW91dCxcbiAgICAgICAgY29sdW1uczogWzAuMzMsIDAuMzMsIDAuMzNdLFxuICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5NZWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgICdodG1sVGV4dCc6IGA8cD5bW01FQU4oZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV0gLyBbW01BWChmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIHN0eWxlczogYm94U3R5bGUsXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TWVkaWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgICdodG1sVGV4dCc6IGA8cD5bW01FRElBTihmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXSAvIFtbTUFYKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dPC9wPmAsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSksXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5Nb2RlPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgIGh0bWxUZXh0OiBgPHA+W1tNT0RFKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dPC9wPmAsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZVNpbmdsZUNob2ljZVdpZGdldChmaWVsZDogQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+KTogQWpmV2lkZ2V0IHtcbiAgY29uc3QgY2hvaWNlcyA9IGZpZWxkLmNob2ljZXNPcmlnaW4uY2hvaWNlcztcbiAgbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXRbXSA9IFtdO1xuICBsZXQgY2hhcnRUeXBlID0gQWpmQ2hhcnRUeXBlLkJhcjtcbiAgbGV0IGxhYmVscyA9IHtmb3JtdWxhOiBgW11gfTtcblxuICBpZiAoY2hvaWNlcy5sZW5ndGggPiA1KSB7XG4gICAgbGFiZWxzID0ge2Zvcm11bGE6IGBbJHtjaG9pY2VzLm1hcChjID0+IGAke0pTT04uc3RyaW5naWZ5KGMubGFiZWwpfWApfV1gfTtcbiAgICBjaGFydFR5cGUgPSBBamZDaGFydFR5cGUuUGllO1xuICAgIGRhdGFzZXQgPSBbXG4gICAgICBjcmVhdGVEYXRhc2V0KHtcbiAgICAgICAgbGFiZWw6IGZpZWxkLmxhYmVsLFxuICAgICAgICBmb3JtdWxhOiBbXG4gICAgICAgICAgY3JlYXRlRm9ybXVsYSh7XG4gICAgICAgICAgICBmb3JtdWxhOiBgWyR7Y2hvaWNlc1xuICAgICAgICAgICAgICAubWFwKGNob2ljZSA9PiBgQ09VTlRfRk9STVMoZm9ybXMsXCIke2ZpZWxkLm5hbWV9PT09JyR7Y2hvaWNlLnZhbHVlfSdcIilgKVxuICAgICAgICAgICAgICAudG9TdHJpbmcoKX1dYCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgb3B0aW9uczoge2JhY2tncm91bmRDb2xvcn0sXG4gICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pLFxuICAgIF07XG4gIH0gZWxzZSB7XG4gICAgZGF0YXNldCA9IGNob2ljZXMubWFwKChjLCBpbmRleCkgPT5cbiAgICAgIGNyZWF0ZURhdGFzZXQoe1xuICAgICAgICBsYWJlbDogYCR7Yy5sYWJlbH1gLFxuICAgICAgICBmb3JtdWxhOiBbY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFtDT1VOVF9GT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT0nJHtjLnZhbHVlfSdcIildYH0pXSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yW2luZGV4XSxcbiAgICAgICAgICBzdGFjazogYFN0YWNrICR7aW5kZXh9YCxcbiAgICAgICAgfSxcbiAgICAgIH0gYXMgUGFydGlhbDxBamZEYXRhc2V0PiksXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgICAgIHR5cGU6IGNoYXJ0VHlwZSxcbiAgICAgICAgbGFiZWxzLFxuICAgICAgICBkYXRhc2V0LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiB0cnVlLFxuICAgICAgICAgIGxlZ2VuZDoge2Rpc3BsYXk6IHRydWUsIHBvc2l0aW9uOiAnYm90dG9tJ30sXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnfSxcbiAgICAgICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVSYW5nZVdpZGdldChmaWVsZDogQWpmUmFuZ2VGaWVsZCk6IEFqZldpZGdldCB7XG4gIGNvbnN0IGVuZCA9IGZpZWxkLmVuZCA/PyAxMTtcbiAgY29uc3Qgc3RhcnQgPSBmaWVsZC5zdGFydCA/PyAxO1xuICBsZXQgY2hvaWNlcyA9IFtdO1xuICBmb3IgKGxldCBpID0gc3RhcnQ7IGkgPD0gZW5kOyBpKyspIHtcbiAgICBjaG9pY2VzLnB1c2goaSk7XG4gIH1cblxuICBsZXQgbGFiZWxzID0ge2Zvcm11bGE6IGBbJHtKU09OLnN0cmluZ2lmeShmaWVsZC5sYWJlbCl9XWB9O1xuICBsZXQgZGF0YXNldDogQWpmRGF0YXNldFtdID0gY2hvaWNlcy5tYXAoKF8sIGluZGV4KSA9PlxuICAgIGNyZWF0ZURhdGFzZXQoe1xuICAgICAgbGFiZWw6IGAke2luZGV4ICsgc3RhcnR9YCxcbiAgICAgIGZvcm11bGE6IFtcbiAgICAgICAgY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFtDT1VOVF9GT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT0ke2luZGV4ICsgMSArIHN0YXJ0fVwiKV1gfSksXG4gICAgICBdLFxuICAgICAgb3B0aW9uczoge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvcltpbmRleF0sXG4gICAgICAgIHN0YWNrOiBgU3RhY2sgJHtpbmRleH1gLFxuICAgICAgfSxcbiAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pLFxuICApO1xuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICBzdHlsZXM6IHdpZGdldFN0eWxlLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuTGF5b3V0LFxuICAgICAgICBjb2x1bW5zOiBbMC4zMywgMC4zMywgMC4zM10sXG4gICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgICBzdHlsZXM6IGJveFN0eWxlLFxuICAgICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGg1Pk1lYW48L2g1PjwvZGl2PmAsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgJ2h0bWxUZXh0JzogYDxwPltbTUVBTihmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXSAvIFtbTUFYKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dPC9wPmAsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSksXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5NZWRpYW48L2g1PjwvZGl2PmAsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgJ2h0bWxUZXh0JzogYDxwPltbTUVESUFOKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dIC8gW1tNQVgoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgICBzdHlsZXM6IGJveFN0eWxlLFxuICAgICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGg1Pk1vZGU8L2g1PjwvZGl2PmAsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8cD5bW01PREUoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgIH0pLFxuICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICAgICAgdHlwZTogQWpmQ2hhcnRUeXBlLkJhcixcbiAgICAgICAgbGFiZWxzLFxuICAgICAgICBkYXRhc2V0LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiB0cnVlLFxuICAgICAgICAgIGxlZ2VuZDoge2Rpc3BsYXk6IHRydWUsIHBvc2l0aW9uOiAnYm90dG9tJ30sXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzEwMCUnfSxcbiAgICAgICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIGJhc2ljIHJlcG9ydCBmb3IgYW55IGZvcm0gcGFzc2VkIGluIGlucHV0LlxuICpcbiAqIEBwYXJhbSBmb3JtIHRoZSBmb3JtIHNjaGVtYVxuICogQHBhcmFtIFtpZF0gdGhlIGlkIG9mIHRoZSBmb3JtIGluc2lkZSB0aGUgcGxhdGhmb3JtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gYXV0b21hdGljUmVwb3J0KGZvcm06IFBhcnRpYWw8QWpmRm9ybT4sIGlkPzogbnVtYmVyKTogQWpmUmVwb3J0IHtcbiAgY29uc3QgcmVwb3J0OiBBamZSZXBvcnQgPSB7fTtcbiAgY29uc3QgcmVwb3J0V2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcbiAgLy8gd2UgYXNzdW1lIHRoYXQgdGhlIGFycmF5IG9mIGZvcm1zIHBhc3NlZCB0byB0aGUgcmVwb3J0IGlzIGNhbGxlZCAnZm9ybXMnLlxuICBpZiAoaWQgIT0gbnVsbCkge1xuICAgIHJlcG9ydC52YXJpYWJsZXMgPSBbe25hbWU6ICdmb3JtcycsIGZvcm11bGE6IHsnZm9ybXVsYSc6IGBmb3Jtc1ske2lkfV1gfX1dO1xuICB9XG4gIGZvcm0ubm9kZXM/LmZvckVhY2goc2xpZGUgPT4ge1xuICAgIGNvbnN0IHNsaWRlV2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcbiAgICBjb25zdCBpc0luUmVwZWF0aW5nID0gc2xpZGUubm9kZVR5cGUgPT09IEFqZk5vZGVUeXBlLkFqZlJlcGVhdGluZ1NsaWRlO1xuXG4gICAgKHNsaWRlLm5vZGVzIGFzIEFqZkZpZWxkW10pLmZvckVhY2goZmllbGQgPT4ge1xuICAgICAgZmllbGQubmFtZSA9IGlzSW5SZXBlYXRpbmcgPyBmaWVsZC5uYW1lICsgJ19fJyA6IGZpZWxkLm5hbWU7XG4gICAgICAvLyBjcmVhdGUgdGhlIHRpdGxlIG9mIHRoZSB3aWRnZXQuXG4gICAgICBjb25zdCBmaWVsZFRpdGxlV2lkZ2V0OiBBamZXaWRnZXQgPSBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+JHtmaWVsZC5sYWJlbH0gLSBbW0NPVU5UX0ZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfSAhPSBudWxsXCIpXV0gYW5zd2VyczwvaDU+PC9kaXY+YCxcbiAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgfSk7XG4gICAgICBzbGlkZVdpZGdldHMucHVzaChmaWVsZFRpdGxlV2lkZ2V0KTtcblxuICAgICAgc3dpdGNoIChmaWVsZC5maWVsZFR5cGUpIHtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucG9wKCk7IC8vIHJlbW92ZSB0aGUgdGl0bGUgb2YgZW1wdHkgd2lkZ2V0XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk51bWJlcjpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVOdW1iZXJXaWRnZXQoZmllbGQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuQm9vbGVhbjpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVCb29sZWFuV2lkZ2V0KGZpZWxkKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVTaW5nbGVDaG9pY2VXaWRnZXQoZmllbGQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnB1c2goY3JlYXRlTXVsdGlwbGVDaG9pY2VXaWRnZXQoZmllbGQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuUmFuZ2U6XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnB1c2goY3JlYXRlUmFuZ2VXaWRnZXQoZmllbGQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9KTtcbiAgICAvLyBpZiB0aGUgc2xpZGUgaGF2ZSBhIHdpZGdldHMgYWRkIGhpbSB0byB0aGUgcmVwb3J0cyB3aXRoIHRoZSByZWxhdGl2ZSB0aXRsZVxuICAgIGlmIChzbGlkZVdpZGdldHMubGVuZ3RoID4gMCkge1xuICAgICAgLy8gY3JlYXRlIHRoZSB0aXRsZSBvZiB0aGUgc2xpZGUuXG4gICAgICBjb25zdCBzbGlkZVRpdGxlV2lkZ2V0OiBBamZXaWRnZXQgPSBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDE+JHtzbGlkZS5sYWJlbH08L2gxPjwvZGl2PmAsXG4gICAgICAgIHN0eWxlczogc2xpZGVUaXRsZVN0eWxlLFxuICAgICAgfSk7XG4gICAgICByZXBvcnRXaWRnZXRzLnB1c2goc2xpZGVUaXRsZVdpZGdldCk7XG4gICAgICAvLyBjcmVhdGUgdGhlIGNvbHVtbiB3aXRoIHRoZSBzbGlkZSB3aWRnZXRzLlxuICAgICAgY29uc3QgY29sdW1uV2lkZ2V0OiBBamZXaWRnZXQgPSBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgY29udGVudDogc2xpZGVXaWRnZXRzLFxuICAgICAgICBzdHlsZXM6IHNsaWRlQ29udGVudFN0eWxlLFxuICAgICAgfSk7XG4gICAgICByZXBvcnRXaWRnZXRzLnB1c2goY29sdW1uV2lkZ2V0KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJlcG9ydC5jb250ZW50ID0gY3JlYXRlUmVwb3J0Q29udGFpbmVyKHtjb250ZW50OiBbLi4ucmVwb3J0V2lkZ2V0c10sIHN0eWxlczoge319KTtcblxuICByZXR1cm4gcmVwb3J0O1xufVxuIl19