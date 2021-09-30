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
    var _a, _b;
    const end = (_a = field.end) !== null && _a !== void 0 ? _a : 11;
    const start = (_b = field.start) !== null && _b !== void 0 ? _b : 1;
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
    var _a;
    const report = {};
    const reportWidgets = [];
    // we assume that the array of forms passed to the report is called 'forms'.
    if (id != null) {
        report.variables = [{ name: 'forms', formula: { 'formula': `forms[${id}]` } }];
    }
    (_a = form.nodes) === null || _a === void 0 ? void 0 : _a.forEach(slide => {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWZyb20tZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvcmVwb3J0LWZyb20tZm9ybS9yZXBvcnQtZnJvbS1mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQThDLE1BQU0saUJBQWlCLENBQUM7QUFDcEcsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU01RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUNMLGVBQWUsRUFDZixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2pCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLFNBQVMsbUJBQW1CLENBQUMsS0FBZTtJQUMxQyxPQUFPLFlBQVksQ0FBQztRQUNsQixVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDaEMsT0FBTyxFQUFFLENBQUMsWUFBWSxDQUFDO2dCQUNyQixVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0JBQy9CLElBQUksRUFBRSxZQUFZLENBQUMsR0FBRztnQkFDdEIsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFDO2dCQUMxQyxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7d0JBQ1osS0FBSyxFQUFFLE1BQU07d0JBQ2IsT0FBTyxFQUFFLENBQUMsYUFBYSxD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NENBQTRDO1lBQzVDLE1BQU0sWUFBWSxHQUFjLFlBQVksQ0FBQztnQkFDM0MsVUFBVSxFQUFFLGFBQWEsQ0FBQyxNQUFNO2dCQUNoQyxPQUFPLEVBQUUsWUFBWTtnQkFDckIsTUFBTSxFQUFFLGlCQUFpQjthQUNQLENBQUMsQ0FBQztZQUN0QixhQUFhLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO1NBQ2xDO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLENBQUMsT0FBTyxHQUFHLHFCQUFxQixDQUFDLEVBQUMsT0FBTyxFQUFFLENBQUMsR0FBRyxhQUFhLENBQUMsRUFBdUIsQ0FBQyxDQUFDO0lBRTVGLE9BQU8sTUFBTSxDQUFDO0FBQ2hCLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRmllbGQsIEFqZkZpZWxkVHlwZSwgQWpmRmllbGRXaXRoQ2hvaWNlcywgQWpmRm9ybSwgQWpmUmFuZ2VGaWVsZH0gZnJvbSAnQGFqZi9jb3JlL2Zvcm1zJztcbmltcG9ydCB7Y3JlYXRlRm9ybXVsYX0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmQ2hhcnRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvY2hhcnRzL2NoYXJ0LXR5cGUnO1xuaW1wb3J0IHtBamZEYXRhc2V0fSBmcm9tICcuLi9pbnRlcmZhY2UvZGF0YXNldC9kYXRhc2V0JztcbmltcG9ydCB7QWpmUmVwb3J0fSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQnO1xuaW1wb3J0IHtBamZSZXBvcnRDb250YWluZXJ9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydC1jb250YWluZXInO1xuaW1wb3J0IHtBamZSZXBvcnRWYXJpYWJsZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LXZhcmlhYmxlJztcbmltcG9ydCB7QWpmV2lkZ2V0fSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQnO1xuaW1wb3J0IHtBamZXaWRnZXRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2Uvd2lkZ2V0cy93aWRnZXQtdHlwZSc7XG5pbXBvcnQge2NyZWF0ZURhdGFzZXR9IGZyb20gJy4uL3V0aWxzL2RhdGFzZXQvY3JlYXRlLWRhdGFzZXQnO1xuaW1wb3J0IHtjcmVhdGVSZXBvcnRDb250YWluZXJ9IGZyb20gJy4uL3V0aWxzL3JlcG9ydHMvY3JlYXRlLXJlcG9ydC1jb250YWluZXInO1xuaW1wb3J0IHtBamZXaWRnZXRDcmVhdGUsIGNyZWF0ZVdpZGdldH0gZnJvbSAnLi4vdXRpbHMvd2lkZ2V0cy9jcmVhdGUtd2lkZ2V0JztcbmltcG9ydCB7XG4gIGJhY2tncm91bmRDb2xvcixcbiAgYm94U3R5bGUsXG4gIHNsaWRlQ29udGVudFN0eWxlLFxuICBzbGlkZVRpdGxlU3R5bGUsXG4gIHdpZGdldFN0eWxlLFxuICB3aWRnZXRUaXRsZVN0eWxlXG59IGZyb20gJy4vc3R5bGVzJztcblxuZnVuY3Rpb24gY3JlYXRlQm9vbGVhbldpZGdldChmaWVsZDogQWpmRmllbGQpOiBBamZXaWRnZXQge1xuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICBjb250ZW50OiBbY3JlYXRlV2lkZ2V0KHtcbiAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgICB0eXBlOiBBamZDaGFydFR5cGUuUGllLFxuICAgICAgbGFiZWxzOiB7Zm9ybXVsYTogJ1tcXCdUcnVlXFwnLCBcXCdGYWxzZVxcJ10nfSxcbiAgICAgIGRhdGFzZXQ6IFtjcmVhdGVEYXRhc2V0KHtcbiAgICAgICAgICAgICAgICAgIGxhYmVsOiAndHJ1ZScsXG4gICAgICAgICAgICAgICAgICBmb3JtdWxhOiBbY3JlYXRlRm9ybXVsYSh7XG4gICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IGBbQ09VTlRGT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT10cnVlXCIpLENPVU5URk9STVMoZm9ybXMsXCIke1xuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGQubmFtZX09PT1mYWxzZVwiKV1gXG4gICAgICAgICAgICAgICAgICB9KV0sXG4gICAgICAgICAgICAgICAgICBvcHRpb25zOiB7YmFja2dyb3VuZENvbG9yOiBbJ2dyZWVuJywgJ3JlZCddfVxuICAgICAgICAgICAgICAgIH0gYXMgUGFydGlhbDxBamZEYXRhc2V0PikgYXMgQWpmRGF0YXNldF0sXG4gICAgICBvcHRpb25zOiB7XG4gICAgICAgIHJlc3BvbnNpdmU6IHRydWUsXG4gICAgICAgIG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxuICAgICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9XG4gICAgICB9LFxuICAgICAgc3R5bGVzOiB7d2lkdGg6ICcxMDAlJywgaGVpZ2h0OiAnNDAwcHgnfSxcbiAgICAgIGV4cG9ydGFibGU6IHRydWVcbiAgICB9IGFzIEFqZldpZGdldENyZWF0ZSldLFxuICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG59XG5mdW5jdGlvbiBjcmVhdGVNdWx0aXBsZUNob2ljZVdpZGdldChmaWVsZDogQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+KTogQWpmV2lkZ2V0IHtcbiAgY29uc3QgY2hvaWNlcyA9IGZpZWxkLmNob2ljZXNPcmlnaW4uY2hvaWNlcztcbiAgbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXRbXSA9IGNob2ljZXMubWFwKFxuICAgICAgKGMsIGluZGV4KSA9PlxuICAgICAgICAgIGNyZWF0ZURhdGFzZXQoe1xuICAgICAgICAgICAgbGFiZWw6IGAke2MubGFiZWx9YCxcbiAgICAgICAgICAgIGZvcm11bGE6IFtjcmVhdGVGb3JtdWxhKFxuICAgICAgICAgICAgICAgIHtmb3JtdWxhOiBgW0NPVU5URk9STVMoZm9ybXMsXCIke2ZpZWxkLm5hbWV9LmluZGV4T2YoJyR7Yy52YWx1ZX0nKSA+IC0xXCIpXWB9KV0sXG4gICAgICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogYmFja2dyb3VuZENvbG9yW2luZGV4XSxcbiAgICAgICAgICAgICAgc3RhY2s6IGBTdGFjayAke2luZGV4fWAsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBhcyBQYXJ0aWFsPEFqZkRhdGFzZXQ+KSBhcyBBamZEYXRhc2V0KTtcbiAgbGV0IGNoYXJ0VHlwZSA9IEFqZkNoYXJ0VHlwZS5CYXI7XG4gIGxldCBsYWJlbHMgPSB7Zm9ybXVsYTogYFtdYH07XG5cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgY29udGVudDogW2NyZWF0ZVdpZGdldCh7XG4gICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNoYXJ0LFxuICAgICAgdHlwZTogY2hhcnRUeXBlLFxuICAgICAgbGFiZWxzLFxuICAgICAgZGF0YXNldCxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICAgIGxlZ2VuZDoge2Rpc3BsYXk6IHRydWUsIHBvc2l0aW9uOiAnYm90dG9tJ31cbiAgICAgIH0sXG4gICAgICBzdHlsZXM6IHt3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICc0MDBweCd9LFxuICAgICAgZXhwb3J0YWJsZTogdHJ1ZVxuICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKV0sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU51bWJlcldpZGdldChmaWVsZDogQWpmRmllbGQpOiBBamZXaWRnZXQge1xuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICBzdHlsZXM6IHdpZGdldFN0eWxlLFxuICAgIGNvbnRlbnQ6IFtjcmVhdGVXaWRnZXQoe1xuICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5MYXlvdXQsXG4gICAgICBjb2x1bW5zOiBbMC4zMywgMC4zMywgMC4zM10sXG4gICAgICBjb250ZW50OiBbXG4gICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TWVhbjwvaDU+PC9kaXY+YCxcbiAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAnaHRtbFRleHQnOiBgPHA+W1tNRUFOKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dIC8gW1tNQVgoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpXG4gICAgICAgICAgXVxuICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TWVkaWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICdodG1sVGV4dCc6XG4gICAgICAgICAgICAgICAgICBgPHA+W1tNRURJQU4oZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV0gLyBbW01BWChmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSlcbiAgICAgICAgICBdXG4gICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICBzdHlsZXM6IGJveFN0eWxlLFxuICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5Nb2RlPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgIGh0bWxUZXh0OiBgPHA+W1tNT0RFKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dPC9wPmAsXG4gICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKVxuICAgICAgICAgIF1cbiAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgXVxuICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKV1cbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlU2luZ2xlQ2hvaWNlV2lkZ2V0KGZpZWxkOiBBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4pOiBBamZXaWRnZXQge1xuICBjb25zdCBjaG9pY2VzID0gZmllbGQuY2hvaWNlc09yaWdpbi5jaG9pY2VzO1xuICBsZXQgZGF0YXNldDogQWpmRGF0YXNldFtdID0gW107XG4gIGxldCBjaGFydFR5cGUgPSBBamZDaGFydFR5cGUuQmFyO1xuICBsZXQgbGFiZWxzID0ge2Zvcm11bGE6IGBbXWB9O1xuXG4gIGlmIChjaG9pY2VzLmxlbmd0aCA+IDUpIHtcbiAgICBsYWJlbHMgPSB7Zm9ybXVsYTogYFske2Nob2ljZXMubWFwKGMgPT4gYCR7SlNPTi5zdHJpbmdpZnkoYy5sYWJlbCl9YCl9XWB9O1xuICAgIGNoYXJ0VHlwZSA9IEFqZkNoYXJ0VHlwZS5QaWU7XG4gICAgZGF0YXNldCA9XG4gICAgICAgIFtjcmVhdGVEYXRhc2V0KHtcbiAgICAgICAgICAgbGFiZWw6IGZpZWxkLmxhYmVsLFxuICAgICAgICAgICBmb3JtdWxhOiBbY3JlYXRlRm9ybXVsYSh7XG4gICAgICAgICAgICAgZm9ybXVsYTogYFske1xuICAgICAgICAgICAgICAgICBjaG9pY2VzLm1hcCgoY2hvaWNlKSA9PiBgQ09VTlRGT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT0nJHtjaG9pY2UudmFsdWV9J1wiKWApXG4gICAgICAgICAgICAgICAgICAgICAudG9TdHJpbmcoKX1dYFxuXG4gICAgICAgICAgIH0pXSxcbiAgICAgICAgICAgb3B0aW9uczoge2JhY2tncm91bmRDb2xvcn1cbiAgICAgICAgIH0gYXMgYW55KSBhcyBBamZEYXRhc2V0XTtcbiAgfSBlbHNlIHtcbiAgICBkYXRhc2V0ID0gY2hvaWNlcy5tYXAoXG4gICAgICAgIChjLCBpbmRleCkgPT4gY3JlYXRlRGF0YXNldCh7XG4gICAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7Yy5sYWJlbH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogW2NyZWF0ZUZvcm11bGEoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge2Zvcm11bGE6IGBbQ09VTlRGT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX09PT0nJHtjLnZhbHVlfSdcIildYH0pXSxcbiAgICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3JbaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgICBzdGFjazogYFN0YWNrICR7aW5kZXh9YCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pIGFzIEFqZkRhdGFzZXQpO1xuICB9XG5cbiAgcmV0dXJuIGNyZWF0ZVdpZGdldCh7XG4gICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgY29udGVudDogW2NyZWF0ZVdpZGdldCh7XG4gICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNoYXJ0LFxuICAgICAgdHlwZTogY2hhcnRUeXBlLFxuICAgICAgbGFiZWxzLFxuICAgICAgZGF0YXNldCxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgbWFpbnRhaW5Bc3BlY3RSYXRpbzogZmFsc2UsXG4gICAgICAgIGxlZ2VuZDoge2Rpc3BsYXk6IHRydWUsIHBvc2l0aW9uOiAnYm90dG9tJ31cbiAgICAgIH0sXG4gICAgICBzdHlsZXM6IHt3aWR0aDogJzEwMCUnLCBoZWlnaHQ6ICc0MDBweCd9LFxuICAgICAgZXhwb3J0YWJsZTogdHJ1ZVxuICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKV0sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlUmFuZ2VXaWRnZXQoZmllbGQ6IEFqZlJhbmdlRmllbGQpOiBBamZXaWRnZXQge1xuICBjb25zdCBlbmQgPSBmaWVsZC5lbmQgPz8gMTE7XG4gIGNvbnN0IHN0YXJ0ID0gZmllbGQuc3RhcnQgPz8gMTtcbiAgbGV0IGNob2ljZXMgPSBbXTtcbiAgZm9yIChsZXQgaSA9IHN0YXJ0OyBpIDw9IGVuZDsgaSsrKSB7XG4gICAgY2hvaWNlcy5wdXNoKGkpO1xuICB9XG5cbiAgbGV0IGxhYmVscyA9IHtmb3JtdWxhOiBgWyR7SlNPTi5zdHJpbmdpZnkoZmllbGQubGFiZWwpfV1gfTtcbiAgbGV0IGRhdGFzZXQ6IEFqZkRhdGFzZXRbXSA9IGNob2ljZXMubWFwKFxuICAgICAgKF8sIGluZGV4KSA9PiBjcmVhdGVEYXRhc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICBsYWJlbDogYCR7aW5kZXggKyBzdGFydH1gLFxuICAgICAgICAgICAgICAgICAgICAgIGZvcm11bGE6IFtjcmVhdGVGb3JtdWxhKFxuICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybXVsYTogYFtDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfT09PSR7aW5kZXggKyAxICsgc3RhcnR9XCIpXWB9KV0sXG4gICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3JbaW5kZXhdLFxuICAgICAgICAgICAgICAgICAgICAgICAgc3RhY2s6IGBTdGFjayAke2luZGV4fWAsXG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pIGFzIEFqZkRhdGFzZXQpO1xuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICBzdHlsZXM6IHdpZGdldFN0eWxlLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuTGF5b3V0LFxuICAgICAgICBjb2x1bW5zOiBbMC4zMywgMC4zMywgMC4zM10sXG4gICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgICBzdHlsZXM6IGJveFN0eWxlLFxuICAgICAgICAgICAgY29udGVudDogW1xuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGg1Pk1lYW48L2g1PjwvZGl2PmAsXG4gICAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgICdodG1sVGV4dCc6XG4gICAgICAgICAgICAgICAgICAgIGA8cD5bW01FQU4oZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV0gLyBbW01BWChmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIHN0eWxlczogYm94U3R5bGUsXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TWVkaWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgICAnaHRtbFRleHQnOlxuICAgICAgICAgICAgICAgICAgICBgPHA+W1tNRURJQU4oZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV0gLyBbW01BWChmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpXG4gICAgICAgICAgICBdXG4gICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICAgIHN0eWxlczogYm94U3R5bGUsXG4gICAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TW9kZTwvaDU+PC9kaXY+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8cD5bW01PREUoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKVxuICAgICAgICAgICAgXVxuICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgXVxuICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICAgICAgdHlwZTogQWpmQ2hhcnRUeXBlLkJhcixcbiAgICAgICAgbGFiZWxzLFxuICAgICAgICBkYXRhc2V0LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICAgICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzQwMHB4J30sXG4gICAgICAgIGV4cG9ydGFibGU6IHRydWVcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKVxuICAgIF1cbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuXG4vKipcbiAqIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIGJhc2ljIHJlcG9ydCBmb3IgYW55IGZvcm0gcGFzc2VkIGluIGlucHV0LlxuICpcbiAqIEBwYXJhbSBmb3JtIHRoZSBmb3JtIHNjaGVtYVxuICogQHBhcmFtIFtpZF0gdGhlIGlkIG9mIHRoZSBmb3JtIGluc2lkZSB0aGUgcGxhdGhmb3JtLlxuICovXG5leHBvcnQgZnVuY3Rpb24gcmVwb3J0RnJvbUZvcm0oZm9ybTogUGFydGlhbDxBamZGb3JtPiwgaWQ/OiBudW1iZXIpOiBBamZSZXBvcnQge1xuICBjb25zdCByZXBvcnQ6IEFqZlJlcG9ydCA9IHt9O1xuICBjb25zdCByZXBvcnRXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuICAvLyB3ZSBhc3N1bWUgdGhhdCB0aGUgYXJyYXkgb2YgZm9ybXMgcGFzc2VkIHRvIHRoZSByZXBvcnQgaXMgY2FsbGVkICdmb3JtcycuXG4gIGlmIChpZCAhPSBudWxsKSB7XG4gICAgcmVwb3J0LnZhcmlhYmxlcyA9IFt7bmFtZTogJ2Zvcm1zJywgZm9ybXVsYTogeydmb3JtdWxhJzogYGZvcm1zWyR7aWR9XWB9fSBhcyBBamZSZXBvcnRWYXJpYWJsZV07XG4gIH1cbiAgZm9ybS5ub2Rlcz8uZm9yRWFjaChzbGlkZSA9PiB7XG4gICAgY29uc3Qgc2xpZGVXaWRnZXRzOiBBamZXaWRnZXRbXSA9IFtdO1xuXG4gICAgKHNsaWRlLm5vZGVzIGFzIEFqZkZpZWxkW10pLmZvckVhY2goKGZpZWxkOiBBamZGaWVsZCkgPT4ge1xuICAgICAgLy8gY3JlYXRlIHRoZSB0aXRsZSBvZiB0aGUgd2lkZ2V0LlxuICAgICAgY29uc3QgZmllbGRUaXRsZVdpZGdldDogQWpmV2lkZ2V0ID0gY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGg1PiR7ZmllbGQubGFiZWx9IC0gW1tDT1VOVEZPUk1TKGZvcm1zLFwiJHtcbiAgICAgICAgICAgIGZpZWxkLm5hbWV9ICE9IG51bGxcIildXSBhbnN3ZXJzPC9oNT48L2Rpdj5gLFxuICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGVcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbiAgICAgIHNsaWRlV2lkZ2V0cy5wdXNoKGZpZWxkVGl0bGVXaWRnZXQpO1xuXG4gICAgICBzd2l0Y2ggKGZpZWxkLmZpZWxkVHlwZSkge1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHNsaWRlV2lkZ2V0cy5wb3AoKTsgIC8vIHJlbW92ZSB0aGUgdGl0bGUgb2YgZW1wdHkgd2lkZ2V0XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk51bWJlcjpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVOdW1iZXJXaWRnZXQoZmllbGQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuQm9vbGVhbjpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVCb29sZWFuV2lkZ2V0KGZpZWxkKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVTaW5nbGVDaG9pY2VXaWRnZXQoZmllbGQgYXMgQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgICAgIHNsaWRlV2lkZ2V0cy5wdXNoKGNyZWF0ZU11bHRpcGxlQ2hvaWNlV2lkZ2V0KGZpZWxkIGFzIEFqZkZpZWxkV2l0aENob2ljZXM8YW55PikpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIEFqZkZpZWxkVHlwZS5SYW5nZTpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVSYW5nZVdpZGdldChmaWVsZCBhcyBBamZSYW5nZUZpZWxkKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgfSk7XG4gICAgLy8gaWYgdGhlIHNsaWRlIGhhdmUgYSB3aWRnZXRzIGFkZCBoaW0gdG8gdGhlIHJlcG9ydHMgd2l0aCB0aGUgcmVsYXRpdmUgdGl0bGVcbiAgICBpZiAoc2xpZGVXaWRnZXRzLmxlbmd0aCA+IDApIHtcbiAgICAgIC8vIGNyZWF0ZSB0aGUgdGl0bGUgb2YgdGhlIHNsaWRlLlxuICAgICAgY29uc3Qgc2xpZGVUaXRsZVdpZGdldDogQWpmV2lkZ2V0ID0gY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICBodG1sVGV4dDogYDxkaXYgY29sb3I9XCJwcmltYXJ5XCI+PGgxPiR7c2xpZGUubGFiZWx9PC9oMT48L2Rpdj5gLFxuICAgICAgICBzdHlsZXM6IHNsaWRlVGl0bGVTdHlsZVxuICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xuICAgICAgcmVwb3J0V2lkZ2V0cy5wdXNoKHNsaWRlVGl0bGVXaWRnZXQpO1xuICAgICAgLy8gY3JlYXRlIHRoZSBjb2x1bW4gd2l0aCB0aGUgc2xpZGUgd2lkZ2V0cy5cbiAgICAgIGNvbnN0IGNvbHVtbldpZGdldDogQWpmV2lkZ2V0ID0gY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgIGNvbnRlbnQ6IHNsaWRlV2lkZ2V0cyxcbiAgICAgICAgc3R5bGVzOiBzbGlkZUNvbnRlbnRTdHlsZSxcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbiAgICAgIHJlcG9ydFdpZGdldHMucHVzaChjb2x1bW5XaWRnZXQpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmVwb3J0LmNvbnRlbnQgPSBjcmVhdGVSZXBvcnRDb250YWluZXIoe2NvbnRlbnQ6IFsuLi5yZXBvcnRXaWRnZXRzXX0gYXMgQWpmUmVwb3J0Q29udGFpbmVyKTtcblxuICByZXR1cm4gcmVwb3J0O1xufVxuIl19