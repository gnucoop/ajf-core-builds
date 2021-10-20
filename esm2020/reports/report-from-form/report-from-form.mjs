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
                                formula: `[COUNTFORMS(forms,"${field.name}===true"),COUNTFORMS(forms,"${field.name}===false")]`,
                            }),
                        ],
                        options: { backgroundColor: ['green', 'red'] },
                    }),
                ],
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' },
                },
                styles: { width: '100%', height: '400px' },
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
                formula: `[COUNTFORMS(forms,"${field.name}.indexOf('${c.value}') > -1")]`,
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
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' },
                },
                styles: { width: '100%', height: '400px' },
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
                            .map(choice => `COUNTFORMS(forms,"${field.name}==='${choice.value}'")`)
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
            formula: [createFormula({ formula: `[COUNTFORMS(forms,"${field.name}==='${c.value}'")]` })],
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
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' },
                },
                styles: { width: '100%', height: '400px' },
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
            createFormula({ formula: `[COUNTFORMS(forms,"${field.name}===${index + 1 + start}")]` }),
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
                    maintainAspectRatio: false,
                    legend: { display: true, position: 'bottom' },
                },
                styles: { width: '100%', height: '400px' },
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWZyb20tZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvcmVwb3J0LWZyb20tZm9ybS9yZXBvcnQtZnJvbS1mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQThDLE1BQU0saUJBQWlCLENBQUM7QUFDcEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU01RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUNMLGVBQWUsRUFDZixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixXQUFXLEVBQ1gsZ0JBQWdCLEdBQ2pCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLFNBQVMsbUJBQW1CLENBQUMsS0FBZTtJQUMxQyxPQUFPLFlBQVksQ0FBQztRQUNsQixVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDaEMsT0FBTyxFQUFFO1lBQ1AsWUFBWSxDQUFDO2dCQUNYLFVBQVUsRUFBRSxhQUFhLENBQUMsS0FBSztnQkFDL0IsSUFBSSxFQUFFLFlBQVksQ0FBQyxHQUFHO2dCQUN0QixNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsbUJBQW1CLEVBQUM7Z0JBQ3RDLE9BQU8sRUFBRTtvQkFDUCxhQUFhLENBQUM7d0JBQ1osS0FBSyxFQUFFLE1BQU07d0JBQ2IsT0FBTyxFQUFFOzRCQUNQLGFBQWEs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WUFBWSxHQUFjLFlBQVksQ0FBQztnQkFDM0MsVUFBVSxFQUFFLGFBQWEsQ0FBQyxNQUFNO2dCQUNoQyxPQUFPLEVBQUUsWUFBWTtnQkFDckIsTUFBTSxFQUFFLGlCQUFpQjthQUNQLENBQUMsQ0FBQztZQUN0QixhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsRUFBdUIsQ0FBQyxDQUFDO0lBRTVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGQsIEFqZkZpZWxkVHlwZSwgQWpmRmllbGRXaXRoQ2hvaWNlcywgQWpmRm9ybSwgQWpmUmFuZ2VGaWVsZH0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Y3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmQ2hhcnRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvY2hhcnRzL2NoYXJ0LXR5cGUnO1xuaW1wb3J0IHtBamZEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9kYXRhc2V0JztcbmltcG9ydCB7QWpmUmVwb3J0fSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuaW1wb3J0IHtBamZSZXBvcnRDb250YWluZXJ9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC1jb250YWluZXInO1xuaW1wb3J0IHtBamZSZXBvcnRWYXJpYWJsZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LXZhcmlhYmxlJztcbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5pbXBvcnQge2NyZWF0ZURhdGFzZXR9IGZyb20gJy4uL3V0aWxzL2RhdGFzZXQvY3JlYXRlLWRhdGFzZXQnO1xuaW1wb3J0IHtjcmVhdGVSZXBvcnRDb250YWluZXJ9IGZyb20gJy4uL3V0aWxzL3JlcG9ydHMvY3JlYXRlLXJlcG9ydC1jb250YWluZXInO1xuaW1wb3J0IHtBamZXaWRnZXRDcmVhdGUsIGNyZWF0ZVdpZGdldH0gZnJvbSAnLi4vdXRpbHMvd2lkZ2V0cy9jcmVhdGUtd2lkZ2V0JztcbmltcG9ydCB7XG4gIGJhY2tncm91bmRDb2xvcixcbiAgYm94U3R5bGUsXG4gIHNsaWRlQ29udGVudFN0eWxlLFxuICBzbGlkZVRpdGxlU3R5bGUsXG4gIHdpZGdldFN0eWxlLFxuICB3aWRnZXRUaXRsZVN0eWxlLFxufSBmcm9tICcuL3N0eWxlcyc7XG5cbmZ1bmN0aW9uIGNyZWF0ZUJvb2xlYW5XaWRnZXQoZmllbGQ6IEFqZkZpZWxkKTogQWpmV2lkZ2V0IHtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgY29udGVudDogW1xuICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICAgICAgdHlwZTogQWpmQ2hhcnRUeXBlLlBpZSxcbiAgICAgICAgbGFiZWxzOiB7Zm9ybXVsYTogXCJbJ1RydWUnLCAnRmFsc2UnXVwifSxcbiAgICAgICAgZGF0YXNldDogW1xuICAgICAgICAgIGNyZWF0ZURhdGFzZXQoe1xuICAgICAgICAgICAgbGFiZWw6ICd0cnVlJyxcbiAgICAgICAgICAgIGZvcm11bGE6IFtcbiAgICAgICAgICAgICAgY3JlYXRlRm9ybXVsYSh7XG4gICAgICAgICAgICAgICAgZm9ybXVsYTogYFtDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfT09PXRydWVcIiksQ09VTlRGT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT1mYWxzZVwiKV1gLFxuICAgICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBvcHRpb25zOiB7YmFja2dyb3VuZENvbG9yOiBbJ2dyZWVuJywgJ3JlZCddfSxcbiAgICAgICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pIGFzIEFqZkRhdGFzZXQsXG4gICAgICAgIF0sXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgICAgICAgIGxlZ2VuZDoge2Rpc3BsYXk6IHRydWUsIHBvc2l0aW9uOiAnYm90dG9tJ30sXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzQwMHB4J30sXG4gICAgICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgXSxcbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlTXVsdGlwbGVDaG9pY2VXaWRnZXQoZmllbGQ6IEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pik6IEFqZldpZGdldCB7XG4gIGNvbnN0IGNob2ljZXMgPSBmaWVsZC5jaG9pY2VzT3JpZ2luLmNob2ljZXM7XG4gIGxldCBkYXRhc2V0OiBBamZEYXRhc2V0W10gPSBjaG9pY2VzLm1hcChcbiAgICAoYywgaW5kZXgpID0+XG4gICAgICBjcmVhdGVEYXRhc2V0KHtcbiAgICAgICAgbGFiZWw6IGAke2MubGFiZWx9YCxcbiAgICAgICAgZm9ybXVsYTogW1xuICAgICAgICAgIGNyZWF0ZUZvcm11bGEoe1xuICAgICAgICAgICAgZm9ybXVsYTogYFtDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfS5pbmRleE9mKCcke2MudmFsdWV9JykgPiAtMVwiKV1gLFxuICAgICAgICAgIH0pLFxuICAgICAgICBdLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3JbaW5kZXhdLFxuICAgICAgICAgIHN0YWNrOiBgU3RhY2sgJHtpbmRleH1gLFxuICAgICAgICB9LFxuICAgICAgfSBhcyBQYXJ0aWFsPEFqZkRhdGFzZXQ+KSBhcyBBamZEYXRhc2V0LFxuICApO1xuICBsZXQgY2hhcnRUeXBlID0gQWpmQ2hhcnRUeXBlLkJhcjtcbiAgbGV0IGxhYmVscyA9IHtmb3JtdWxhOiBgW11gfTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICBjb250ZW50OiBbXG4gICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNoYXJ0LFxuICAgICAgICB0eXBlOiBjaGFydFR5cGUsXG4gICAgICAgIGxhYmVscyxcbiAgICAgICAgZGF0YXNldCxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICAgICAgbGVnZW5kOiB7ZGlzcGxheTogdHJ1ZSwgcG9zaXRpb246ICdib3R0b20nfSxcbiAgICAgICAgfSxcbiAgICAgICAgc3R5bGVzOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnNDAwcHgnfSxcbiAgICAgICAgZXhwb3J0YWJsZTogdHJ1ZSxcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICBdLFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVOdW1iZXJXaWRnZXQoZmllbGQ6IEFqZkZpZWxkKTogQWpmV2lkZ2V0IHtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgc3R5bGVzOiB3aWRnZXRTdHlsZSxcbiAgICBjb250ZW50OiBbXG4gICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkxheW91dCxcbiAgICAgICAgY29sdW1uczogWzAuMzMsIDAuMzMsIDAuMzNdLFxuICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5NZWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICAnaHRtbFRleHQnOiBgPHA+W1tNRUFOKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dIC8gW1tNQVgoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIHN0eWxlczogYm94U3R5bGUsXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TWVkaWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICAnaHRtbFRleHQnOiBgPHA+W1tNRURJQU4oZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV0gLyBbW01BWChmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5Nb2RlPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICBodG1sVGV4dDogYDxwPltbTU9ERShmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgIF0sXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgXSxcbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlU2luZ2xlQ2hvaWNlV2lkZ2V0KGZpZWxkOiBBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4pOiBBamZXaWRnZXQge1xuICBjb25zdCBjaG9pY2VzID0gZmllbGQuY2hvaWNlc09yaWdpbi5jaG9pY2VzO1xuICBsZXQgZGF0YXNldDogQWpmRGF0YXNldFtdID0gW107XG4gIGxldCBjaGFydFR5cGUgPSBBamZDaGFydFR5cGUuQmFyO1xuICBsZXQgbGFiZWxzID0ge2Zvcm11bGE6IGBbXWB9O1xuXG4gIGlmIChjaG9pY2VzLmxlbmd0aCA+IDUpIHtcbiAgICBsYWJlbHMgPSB7Zm9ybXVsYTogYFske2Nob2ljZXMubWFwKGMgPT4gYCR7SlNPTi5zdHJpbmdpZnkoYy5sYWJlbCl9YCl9XWB9O1xuICAgIGNoYXJ0VHlwZSA9IEFqZkNoYXJ0VHlwZS5QaWU7XG4gICAgZGF0YXNldCA9IFtcbiAgICAgIGNyZWF0ZURhdGFzZXQoe1xuICAgICAgICBsYWJlbDogZmllbGQubGFiZWwsXG4gICAgICAgIGZvcm11bGE6IFtcbiAgICAgICAgICBjcmVhdGVGb3JtdWxhKHtcbiAgICAgICAgICAgIGZvcm11bGE6IGBbJHtjaG9pY2VzXG4gICAgICAgICAgICAgIC5tYXAoY2hvaWNlID0+IGBDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfT09PScke2Nob2ljZS52YWx1ZX0nXCIpYClcbiAgICAgICAgICAgICAgLnRvU3RyaW5nKCl9XWAsXG4gICAgICAgICAgfSksXG4gICAgICAgIF0sXG4gICAgICAgIG9wdGlvbnM6IHtiYWNrZ3JvdW5kQ29sb3J9LFxuICAgICAgfSBhcyBhbnkpIGFzIEFqZkRhdGFzZXQsXG4gICAgXTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhc2V0ID0gY2hvaWNlcy5tYXAoXG4gICAgICAoYywgaW5kZXgpID0+XG4gICAgICAgIGNyZWF0ZURhdGFzZXQoe1xuICAgICAgICAgIGxhYmVsOiBgJHtjLmxhYmVsfWAsXG4gICAgICAgICAgZm9ybXVsYTogW2NyZWF0ZUZvcm11bGEoe2Zvcm11bGE6IGBbQ09VTlRGT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT0nJHtjLnZhbHVlfSdcIildYH0pXSxcbiAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvcltpbmRleF0sXG4gICAgICAgICAgICBzdGFjazogYFN0YWNrICR7aW5kZXh9YCxcbiAgICAgICAgICB9LFxuICAgICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pIGFzIEFqZkRhdGFzZXQsXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgICAgIHR5cGU6IGNoYXJ0VHlwZSxcbiAgICAgICAgbGFiZWxzLFxuICAgICAgICBkYXRhc2V0LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICAgICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9LFxuICAgICAgICB9LFxuICAgICAgICBzdHlsZXM6IHt3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICc0MDBweCd9LFxuICAgICAgICBleHBvcnRhYmxlOiB0cnVlLFxuICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgIF0sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmFuZ2VXaWRnZXQoZmllbGQ6IEFqZlJhbmdlRmllbGQpOiBBamZXaWRnZXQge1xuICBjb25zdCBlbmQgPSBmaWVsZC5lbmQgPz8gMTE7XG4gIGNvbnN0IHN0YXJ0ID0gZmllbGQuc3RhcnQgPz8gMTtcbiAgbGV0IGNob2ljZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgY2hvaWNlcy5wdXNoKGkpO1xuICB9XG5cbiAgbGV0IGxhYmVscyA9IHtmb3JtdWxhOiBgWyR7SlNPTi5zdHJpbmdpZnkoZmllbGQubGFiZWwpfV1gfTtcbiAgbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXRbXSA9IGNob2ljZXMubWFwKFxuICAgIChfLCBpbmRleCkgPT5cbiAgICAgIGNyZWF0ZURhdGFzZXQoe1xuICAgICAgICBsYWJlbDogYCR7aW5kZXggKyBzdGFydH1gLFxuICAgICAgICBmb3JtdWxhOiBbXG4gICAgICAgICAgY3JlYXRlRm9ybXVsYSh7Zm9ybXVsYTogYFtDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfT09PSR7aW5kZXggKyAxICsgc3RhcnR9XCIpXWB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yW2luZGV4XSxcbiAgICAgICAgICBzdGFjazogYFN0YWNrICR7aW5kZXh9YCxcbiAgICAgICAgfSxcbiAgICAgIH0gYXMgUGFydGlhbDxBamZEYXRhc2V0PikgYXMgQWpmRGF0YXNldCxcbiAgKTtcbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgc3R5bGVzOiB3aWRnZXRTdHlsZSxcbiAgICBjb250ZW50OiBbXG4gICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkxheW91dCxcbiAgICAgICAgY29sdW1uczogWzAuMzMsIDAuMzMsIDAuMzNdLFxuICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5NZWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICAnaHRtbFRleHQnOiBgPHA+W1tNRUFOKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dIC8gW1tNQVgoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIHN0eWxlczogYm94U3R5bGUsXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TWVkaWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICAnaHRtbFRleHQnOiBgPHA+W1tNRURJQU4oZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV0gLyBbW01BWChmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5Nb2RlPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICBodG1sVGV4dDogYDxwPltbTU9ERShmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgIF0sXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNoYXJ0LFxuICAgICAgICB0eXBlOiBBamZDaGFydFR5cGUuQmFyLFxuICAgICAgICBsYWJlbHMsXG4gICAgICAgIGRhdGFzZXQsXG4gICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICByZXNwb25zaXZlOiB0cnVlLFxuICAgICAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgICAgICAgIGxlZ2VuZDoge2Rpc3BsYXk6IHRydWUsIHBvc2l0aW9uOiAnYm90dG9tJ30sXG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzQwMHB4J30sXG4gICAgICAgIGV4cG9ydGFibGU6IHRydWUsXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgXSxcbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIGJhc2ljIHJlcG9ydCBmb3IgYW55IGZvcm0gcGFzc2VkIGluIGlucHV0LlxuICpcbiAqIEBwYXJhbSBmb3JtIHRoZSBmb3JtIHNjaGVtYVxuICogQHBhcmFtIFtpZF0gdGhlIGlkIG9mIHRoZSBmb3JtIGluc2lkZSB0aGUgcGxhdGhmb3JtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0RnJvbUZvcm0oZm9ybTogUGFydGlhbDxBamZGb3JtPiwgaWQ/OiBudW1iZXIpOiBBamZSZXBvcnQge1xuICBjb25zdCByZXBvcnQ6IEFqZlJlcG9ydCA9IHt9O1xuICBjb25zdCByZXBvcnRXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuICAvLyB3ZSBhc3N1bWUgdGhhdCB0aGUgYXJyYXkgb2YgZm9ybXMgcGFzc2VkIHRvIHRoZSByZXBvcnQgaXMgY2FsbGVkICdmb3JtcycuXG4gIGlmIChpZCAhPSBudWxsKSB7XG4gICAgcmVwb3J0LnZhcmlhYmxlcyA9IFt7bmFtZTogJ2Zvcm1zJywgZm9ybXVsYTogeydmb3JtdWxhJzogYGZvcm1zWyR7aWR9XWB9fSBhcyBBamZSZXBvcnRWYXJpYWJsZV07XG4gIH1cbiAgZm9ybS5ub2Rlcz8uZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgY29uc3Qgc2xpZGVXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuXG4gICAgKHNsaWRlLm5vZGVzIGFzIEFqZkZpZWxkW10pLmZvckVhY2goKGZpZWxkOiBBamZGaWVsZCkgPT4ge1xuICAgICAgLy8gY3JlYXRlIHRoZSB0aXRsZSBvZiB0aGUgd2lkZ2V0LlxuICAgICAgY29uc3QgZmllbGRUaXRsZVdpZGdldDogQWpmV2lkZ2V0ID0gY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGg1PiR7ZmllbGQubGFiZWx9IC0gW1tDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfSAhPSBudWxsXCIpXV0gYW5zd2VyczwvaDU+PC9kaXY+YCxcbiAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xuICAgICAgc2xpZGVXaWRnZXRzLnB1c2goZmllbGRUaXRsZVdpZGdldCk7XG5cbiAgICAgIHN3aXRjaCAoZmllbGQuZmllbGRUeXBlKSB7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnBvcCgpOyAvLyByZW1vdmUgdGhlIHRpdGxlIG9mIGVtcHR5IHdpZGdldFxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5OdW1iZXI6XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnB1c2goY3JlYXRlTnVtYmVyV2lkZ2V0KGZpZWxkKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLkJvb2xlYW46XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnB1c2goY3JlYXRlQm9vbGVhbldpZGdldChmaWVsZCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnB1c2goY3JlYXRlU2luZ2xlQ2hvaWNlV2lkZ2V0KGZpZWxkIGFzIEFqZkZpZWxkV2l0aENob2ljZXM8YW55PikpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5NdWx0aXBsZUNob2ljZTpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVNdWx0aXBsZUNob2ljZVdpZGdldChmaWVsZCBhcyBBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4pKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuUmFuZ2U6XG4gICAgICAgICAgc2xpZGVXaWRnZXRzLnB1c2goY3JlYXRlUmFuZ2VXaWRnZXQoZmllbGQgYXMgQWpmUmFuZ2VGaWVsZCkpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGlmIHRoZSBzbGlkZSBoYXZlIGEgd2lkZ2V0cyBhZGQgaGltIHRvIHRoZSByZXBvcnRzIHdpdGggdGhlIHJlbGF0aXZlIHRpdGxlXG4gICAgaWYgKHNsaWRlV2lkZ2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjcmVhdGUgdGhlIHRpdGxlIG9mIHRoZSBzbGlkZS5cbiAgICAgIGNvbnN0IHNsaWRlVGl0bGVXaWRnZXQ6IEFqZldpZGdldCA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoMT4ke3NsaWRlLmxhYmVsfTwvaDE+PC9kaXY+YCxcbiAgICAgICAgc3R5bGVzOiBzbGlkZVRpdGxlU3R5bGUsXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG4gICAgICByZXBvcnRXaWRnZXRzLnB1c2goc2xpZGVUaXRsZVdpZGdldCk7XG4gICAgICAvLyBjcmVhdGUgdGhlIGNvbHVtbiB3aXRoIHRoZSBzbGlkZSB3aWRnZXRzLlxuICAgICAgY29uc3QgY29sdW1uV2lkZ2V0OiBBamZXaWRnZXQgPSBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgY29udGVudDogc2xpZGVXaWRnZXRzLFxuICAgICAgICBzdHlsZXM6IHNsaWRlQ29udGVudFN0eWxlLFxuICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xuICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKGNvbHVtbldpZGdldCk7XG4gICAgfVxuICB9KTtcblxuICByZXBvcnQuY29udGVudCA9IGNyZWF0ZVJlcG9ydENvbnRhaW5lcih7Y29udGVudDogWy4uLnJlcG9ydFdpZGdldHNdfSBhcyBBamZSZXBvcnRDb250YWluZXIpO1xuXG4gIHJldHVybiByZXBvcnQ7XG59XG4iXX0=