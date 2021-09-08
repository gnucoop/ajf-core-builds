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
        content: [
            createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: `<h5>[[COUNTFORMS(forms,"${field.name} != null")]] answers</h5>`,
                styles: { margin: '10px', paddingLeft: '15px' },
            }),
            createWidget({
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
            })
        ],
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
        content: [
            createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: `<h5>[[COUNTFORMS(forms,"${field.name} != null")]] answers</h5>`,
                styles: { margin: '10px', paddingLeft: '15px' },
            }),
            createWidget({
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
            })
        ],
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
        labels = { formula: `[${choices.map(c => `\'${c.label}\'`)}]` };
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
        content: [
            createWidget({
                widgetType: AjfWidgetType.Text,
                htmlText: `<h5>[[COUNTFORMS(forms,"${field.name} != null")]] answers</h5>`,
                styles: { margin: '10px', paddingLeft: '15px' },
            }),
            createWidget({
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
            })
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
                htmlText: `<div color="primary"><h5>${field.label}</h5></div>`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVwb3J0LWZyb20tZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3JlcG9ydHMvcmVwb3J0LWZyb20tZm9ybS9yZXBvcnQtZnJvbS1mb3JtLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBVyxZQUFZLEVBQStCLE1BQU0saUJBQWlCLENBQUM7QUFDckYsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBRS9DLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU01RCxPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDL0QsT0FBTyxFQUFDLGFBQWEsRUFBQyxNQUFNLGlDQUFpQyxDQUFDO0FBQzlELE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLDBDQUEwQyxDQUFDO0FBQy9FLE9BQU8sRUFBa0IsWUFBWSxFQUFDLE1BQU0sZ0NBQWdDLENBQUM7QUFDN0UsT0FBTyxFQUNMLGVBQWUsRUFDZixRQUFRLEVBQ1IsaUJBQWlCLEVBQ2pCLGVBQWUsRUFDZixXQUFXLEVBQ1gsZ0JBQWdCLEVBQ2pCLE1BQU0sVUFBVSxDQUFDO0FBRWxCLFNBQVMsbUJBQW1CLENBQUMsS0FBZTtJQUMxQyxPQUFPLFlBQVksQ0FBQztRQUNsQixVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDaEMsT0FBTyxFQUFFO1lBQ1AsWUFBWSxDQUFDO2dCQUNYLFVBQVUsRUFBRSxhQUFhLENBQUMsSUFBSTtnQkFDOUIsUUFBUSxFQUFFLDJCQUEyQixLQUFLLENBQUMsSUFBSSwyQkFBMkI7Z0JBQzFFLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBQzthQUMzQixDQUFDO1lBQ3JCLFlBQVksQ0FBQztnQkFDWCxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0JBQy9CLElBQUksRUFBRSxZQUFZLENBQUMsR0FBRztnQkFDdEIsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLHVCQUF1QixFQUFDO2dCQUMxQyxPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQUM7d0JBQ1osS0FBSyxFQUFFLE1BQU07d0JBQ2IsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDO2dDQUN0QixPQUFPLEVBQUUsc0JBQXNCLEtBQUssQ0FBQyxJQUFJLCtCQUNyQyxLQUFLLENBQUMsSUFBSSxhQUFhOzZCQUM1QixDQUFDLENBQUM7d0JBQ0gsT0FBTyxFQUFFLEVBQUMsZUFBZSxFQUFFLENBQUMsT0FBTyxFQUFFLEtBQUssQ0FBQyxFQUFDO3FCQUN0QixDQUFlLENBQUM7Z0JBQ2xELE9BQU8sRUFBRTtvQkFDUCxVQUFVLEVBQUUsSUFBSTtvQkFDaEIsbUJBQW1CLEVBQUUsS0FBSztvQkFDMUIsTUFBTSxFQUFFLEVBQUMsT0FBTyxFQUFFLElBQUksRUFBRSxRQUFRLEVBQUUsUUFBUSxFQUFDO2lCQUM1QztnQkFDRCxNQUFNLEVBQUUsRUFBQyxLQUFLLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxPQUFPLEVBQUM7Z0JBQ3hDLFVBQVUsRUFBRSxJQUFJO2FBQ0UsQ0FBQztTQUN0QjtLQUNpQixDQUFDLENBQUM7QUFDeEIsQ0FBQztBQUNELFNBQVMsMEJBQTBCLENBQUMsS0FBK0I7SUFDakUsTUFBTSxPQUFPLEdBQUcsS0FBSyxDQUFDLGFBQWEsQ0FBQyxPQUFPLENBQUM7SUFDNUMsSUFBSSxPQUFPLEdBQWlCLE9BQU8sQ0FBQyxHQUFHLENBQ25DLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQ1QsYUFBYSxDQUFDO1FBQ1osS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRTtRQUNuQixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQ25CLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixLQUFLLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxLQUFLLFlBQVksRUFBQyxDQUFDLENBQUM7UUFDakYsT0FBTyxFQUFFO1lBQ1AsZUFBZSxFQUFFLGVBQWUsQ0FBQyxLQUFLLENBQUM7WUFDdkMsS0FBSyxFQUFFLFNBQVMsS0FBSyxFQUFFO1NBQ3hCO0tBQ3FCLENBQWUsQ0FBQyxDQUFDO0lBQ2pELElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUM7SUFDakMsSUFBSSxNQUFNLEdBQUcsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFN0IsT0FBTyxZQUFZLENBQUM7UUFDbEIsVUFBVSxFQUFFLGFBQWEsQ0FBQyxNQUFNO1FBQ2hDLE9BQU8sRUFBRTtZQUNQLFlBQVksQ0FBQztnQkFDWCxVQUFVLEVBQUUsYUFBYSxDQUFDLElBQUk7Z0JBQzlCLFFBQVEsRUFBRSwyQkFBMkIsS0FBSyxDQUFDLElBQUksMkJBQTJCO2dCQUMxRSxNQUFNLEVBQUUsRUFBQyxNQUFNLEVBQUUsTUFBTSxFQUFFLFdBQVcsRUFBRSxNQUFNLEVBQUM7YUFDM0IsQ0FBQztZQUNyQixZQUFZLENBQUM7Z0JBQ1gsVUFBVSxFQUFFLGFBQWEsQ0FBQyxLQUFLO2dCQUMvQixJQUFJLEVBQUUsU0FBUztnQkFDZixNQUFNO2dCQUNOLE9BQU87Z0JBQ1AsT0FBTyxFQUFFO29CQUNQLFVBQVUsRUFBRSxJQUFJO29CQUNoQixtQkFBbUIsRUFBRSxLQUFLO29CQUMxQixNQUFNLEVBQUUsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUM7aUJBQzVDO2dCQUNELE1BQU0sRUFBRSxFQUFDLEtBQUssRUFBRSxNQUFNLEVBQUUsTUFBTSxFQUFFLE9BQU8sRUFBQztnQkFDeEMsVUFBVSxFQUFFLElBQUk7YUFDRSxDQUFDO1NBQ3RCO0tBQ2lCLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBQ0QsU0FBUyxrQkFBa0IsQ0FBQyxLQUFlO0lBQ3pDLE9BQU8sWUFBWSxDQUFDO1FBQ2xCLFVBQVUsRUFBRSxhQUFhLENBQUMsTUFBTTtRQUNoQyxNQUFNLEVBQUUsV0FBVztRQUNuQixPQUFPLEVBQUUsQ0FBQyxZQUFZLENBQUM7Z0JBQ3JCLFVBQVUsRUFBRSxhQUFhLENBQUMsTUFBTTtnQkFDaEMsT0FBTyxFQUFFLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxJQUFJLENBQUM7Z0JBQzNCLE9BQU8sRUFBRTtvQkFDUCxZQUFZLENBQUM7d0JBQ1gsVUFBVSxFQUFFLGFBQWEsQ0FBQyxNQUFNO3dCQUNoQyxNQUFNLEVBQUUsUUFBUTt3QkFDaEIsT0FBTyxFQUFFOzRCQUNQLFlBQVksQ0FBQztnQ0FDWCxVQUFVLEVBQUUsYUFBYSxDQUFDLElBQUk7Z0NBQzlCLFFBQVEsRUFBRSwwQ0FBMEM7Z0NBQ3BELE1BQU0sRUFBRSxnQkFBZ0I7NkJBQ04sQ0FBQzs0QkFDckIsWUFBWSxDQUFDO2dDQUNYLFVBQVUsRUFBRSxhQUFhLENBQUMsSUFBSTtnQ0FDOUIsVUFBVSxFQUFFLG9CQUFvQixLQUFLLENBQUMsSUFBSSx1QkFBdUIsS0FBSyxDQUFDLElBQUksVUFBVTtnQ0FDckYsTUFBTSxFQUFFLGdCQUFnQjs2QkFDTixDQUFDO3lCQUN0QjtxQkFDaUIsQ0FBQztvQkFDckIsWUFBWSxDQUFDO3dCQUNYLFVBQVUsRUFBRSxhQUFhLENBQUMsTUFBTTt3QkFDaEMsTUFBTSxFQUFFLFFBQVE7d0JBQ2hCLE9BQU8sRUFBRTs0QkFDUCxZQUFZLENBQUM7Z0NBQ1gsVUFBVSxFQUFFLGFBQWEsQ0FBQyxJQUFJO2dDQUM5QixRQUFRLEVBQUUsNENBQTRDO2dDQUN0RCxNQUFNLEVBQUUsZ0JBQWdCOzZCQUNOLENBQUM7NEJBQ3JCLFlBQVksQ0FBQztnQ0FDWCxVQUFVLEVBQUUsYUFBYSxDQUFDLElBQUk7Z0NBQzlCLFVBQVUsRUFDTixzQkFBc0IsS0FBSyxDQUFDLElBQUksdUJBQXVCLEtBQUssQ0FBQyxJQUFJLFVBQVU7Z0NBQy9FLE1BQU0sRUFBRSxnQkFBZ0I7NkJBQ04sQ0FBQzt5QkFDdEI7cUJBQ2lCLENBQUM7b0JBQ3JCLFlBQVksQ0FBQzt3QkFDWCxVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU07d0JBQ2hDLE1BQU0sRUFBRSxRQUFRO3dCQUNoQixPQUFPLEVBQUU7NEJBQ1AsWUFBWSxDQUFDO2dDQUNYLFVBQVUsRUFBRSxhQUFhLENBQUMsSUFBSTtnQ0FDOUIsUUFBUSxFQUFFLDBDQUEwQztnQ0FDcEQsTUFBTSxFQUFFLGdCQUFnQjs2QkFDTixDQUFDOzRCQUNyQixZQUFZLENBQUM7Z0NBQ1gsVUFBVSxFQUFFLGFBQWEsQ0FBQyxJQUFJO2dDQUM5QixRQUFRLEVBQUUsb0JBQW9CLEtBQUssQ0FBQyxJQUFJLFVBQVU7Z0NBQ2xELE1BQU0sRUFBRSxnQkFBZ0I7NkJBQ04sQ0FBQzt5QkFDdEI7cUJBQ2lCLENBQUM7aUJBQ3RCO2FBQ2lCLENBQUMsQ0FBQztLQUNKLENBQUMsQ0FBQztBQUN4QixDQUFDO0FBQ0QsU0FBUyx3QkFBd0IsQ0FBQyxLQUErQjtJQUMvRCxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQztJQUM1QyxJQUFJLE9BQU8sR0FBaUIsRUFBRSxDQUFDO0lBQy9CLElBQUksU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUM7SUFDakMsSUFBSSxNQUFNLEdBQUcsRUFBQyxPQUFPLEVBQUUsSUFBSSxFQUFDLENBQUM7SUFFN0IsSUFBSSxPQUFPLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUN0QixNQUFNLEdBQUcsRUFBQyxPQUFPLEVBQUUsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFDLENBQUM7UUFDOUQsU0FBUyxHQUFHLFlBQVksQ0FBQyxHQUFHLENBQUM7UUFDN0IsT0FBTztZQUNILENBQUMsYUFBYSxDQUFDO29CQUNaLEtBQUssRUFBRSxLQUFLLENBQUMsS0FBSztvQkFDbEIsT0FBTyxFQUFFLENBQUMsYUFBYSxDQUFDOzRCQUN0QixPQUFPLEVBQUUsSUFDTCxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxxQkFBcUIsS0FBSyxDQUFDLElBQUksT0FBTyxNQUFNLENBQUMsS0FBSyxLQUFLLENBQUM7aUNBQzNFLFFBQVEsRUFBRSxHQUFHO3lCQUV2QixDQUFDLENBQUM7b0JBQ0gsT0FBTyxFQUFFLEVBQUMsZUFBZSxFQUFDO2lCQUNwQixDQUFlLENBQUMsQ0FBQztLQUMvQjtTQUFNO1FBQ0wsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQ2pCLENBQUMsQ0FBQyxFQUFFLEtBQUssRUFBRSxFQUFFLENBQUMsYUFBYSxDQUFDO1lBQ1osS0FBSyxFQUFFLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRTtZQUNuQixPQUFPLEVBQUUsQ0FBQyxhQUFhLENBQ25CLEVBQUMsT0FBTyxFQUFFLHNCQUFzQixLQUFLLENBQUMsSUFBSSxPQUFPLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBQyxDQUFDLENBQUM7WUFDckUsT0FBTyxFQUFFO2dCQUNQLGVBQWUsRUFBRSxlQUFlLENBQUMsS0FBSyxDQUFDO2dCQUN2QyxLQUFLLEVBQUUsU0FBUyxLQUFLLEVBQUU7YUFDeEI7U0FDcUIsQ0FBZSxDQUFDLENBQUM7S0FDNUQ7SUFFRCxPQUFPLFlBQVksQ0FBQztRQUNsQixVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU07UUFDaEMsT0FBTyxFQUFFO1lBQ1AsWUFBWSxDQUFDO2dCQUNYLFVBQVUsRUFBRSxhQUFhLENBQUMsSUFBSTtnQkFDOUIsUUFBUSxFQUFFLDJCQUEyQixLQUFLLENBQUMsSUFBSSwyQkFBMkI7Z0JBQzFFLE1BQU0sRUFBRSxFQUFDLE1BQU0sRUFBRSxNQUFNLEVBQUUsV0FBVyxFQUFFLE1BQU0sRUFBQzthQUMzQixDQUFDO1lBQ3JCLFlBQVksQ0FBQztnQkFDWCxVQUFVLEVBQUUsYUFBYSxDQUFDLEtBQUs7Z0JBQy9CLElBQUksRUFBRSxTQUFTO2dCQUNmLE1BQU07Z0JBQ04sT0FBTztnQkFDUCxPQUFPLEVBQUU7b0JBQ1AsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLG1CQUFtQixFQUFFLEtBQUs7b0JBQzFCLE1BQU0sRUFBRSxFQUFDLE9BQU8sRUFBRSxJQUFJLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBQztpQkFDNUM7Z0JBQ0QsTUFBTSxFQUFFLEVBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFDO2dCQUN4QyxVQUFVLEVBQUUsSUFBSTthQUNFLENBQUM7U0FDdEI7S0FDaUIsQ0FBQyxDQUFDO0FBQ3hCLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILE1BQU0sVUFBVSxjQUFjLENBQUMsSUFBc0IsRUFBRSxFQUFXOztJQUNoRSxNQUFNLE1BQU0sR0FBYyxFQUFFLENBQUM7SUFDN0IsTUFBTSxhQUFhLEdBQWdCLEVBQUUsQ0FBQztJQUN0Qyw0RUFBNEU7SUFDNUUsSUFBSSxFQUFFLElBQUksSUFBSSxFQUFFO1FBQ2QsTUFBTSxDQUFDLFNBQVMsR0FBRyxDQUFDLEVBQUMsSUFBSSxFQUFFLE9BQU8sRUFBRSxPQUFPLEVBQUUsRUFBQyxTQUFTLEVBQUUsU0FBUyxFQUFFLEdBQUcsRUFBQyxFQUFzQixDQUFDLENBQUM7S0FDakc7SUFDRCxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLE9BQU8sQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUMxQixNQUFNLFlBQVksR0FBZ0IsRUFBRSxDQUFDO1FBRXBDLEtBQUssQ0FBQyxLQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQWUsRUFBRSxFQUFFO1lBQ3RELGtDQUFrQztZQUNsQyxNQUFNLGdCQUFnQixHQUFjLFlBQVksQ0FBQztnQkFDL0MsVUFBVSxFQUFFLGFBQWEsQ0FBQyxJQUFJO2dCQUM5QixRQUFRLEVBQUUsNEJBQTRCLEtBQUssQ0FBQyxLQUFLLGFBQWE7Z0JBQzlELE1BQU0sRUFBRSxnQkFBZ0I7YUFDTixDQUFDLENBQUM7WUFDdEIsWUFBWSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBRXBDLFFBQVEsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDdkI7b0JBQ0UsWUFBWSxDQUFDLEdBQUcsRUFBRSxDQUFDLENBQUMsbUNBQW1DO29CQUN2RCxNQUFNO2dCQUNSLEtBQUssWUFBWSxDQUFDLE1BQU07b0JBQ3RCLFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztvQkFDN0MsTUFBTTtnQkFDUixLQUFLLFlBQVksQ0FBQyxPQUFPO29CQUN2QixZQUFZLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7b0JBQzlDLE1BQU07Z0JBQ1IsS0FBSyxZQUFZLENBQUMsWUFBWTtvQkFDNUIsWUFBWSxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxLQUFpQyxDQUFDLENBQUMsQ0FBQztvQkFDL0UsTUFBTTtnQkFDUixLQUFLLFlBQVksQ0FBQyxjQUFjO29CQUM5QixZQUFZLENBQUMsSUFBSSxDQUFDLDBCQUEwQixDQUFDLEtBQWlDLENBQUMsQ0FBQyxDQUFDO29CQUNqRixNQUFNO2FBQ1Q7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUNILDZFQUE2RTtRQUM3RSxJQUFJLFlBQVksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO1lBQzNCLGlDQUFpQztZQUNqQyxNQUFNLGdCQUFnQixHQUFjLFlBQVksQ0FBQztnQkFDL0MsVUFBVSxFQUFFLGFBQWEsQ0FBQyxJQUFJO2dCQUM5QixRQUFRLEVBQUUsNEJBQTRCLEtBQUssQ0FBQyxLQUFLLGFBQWE7Z0JBQzlELE1BQU0sRUFBRSxlQUFlO2FBQ0wsQ0FBQyxDQUFDO1lBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztZQUNyQyw0Q0FBNEM7WUFDNUMsTUFBTSxZQUFZLEdBQWMsWUFBWSxDQUFDO2dCQUMzQyxVQUFVLEVBQUUsYUFBYSxDQUFDLE1BQU07Z0JBQ2hDLE9BQU8sRUFBRSxZQUFZO2dCQUNyQixNQUFNLEVBQUUsaUJBQWlCO2FBQ1AsQ0FBQyxDQUFDO1lBQ3RCLGFBQWEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7U0FDbEM7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sQ0FBQyxPQUFPLEdBQUcscUJBQXFCLENBQUMsRUFBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLGFBQWEsQ0FBQyxFQUF1QixDQUFDLENBQUM7SUFFNUYsT0FBTyxNQUFNLENBQUM7QUFDaEIsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZGaWVsZCwgQWpmRmllbGRUeXBlLCBBamZGaWVsZFdpdGhDaG9pY2VzLCBBamZGb3JtfSBmcm9tICdAYWpmL2NvcmUvZm9ybXMnO1xuaW1wb3J0IHtjcmVhdGVGb3JtdWxhfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZDaGFydFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS9jaGFydHMvY2hhcnQtdHlwZSc7XG5pbXBvcnQge0FqZkRhdGFzZXR9IGZyb20gJy4uL2ludGVyZmFjZS9kYXRhc2V0L2RhdGFzZXQnO1xuaW1wb3J0IHtBamZSZXBvcnR9IGZyb20gJy4uL2ludGVyZmFjZS9yZXBvcnRzL3JlcG9ydCc7XG5pbXBvcnQge0FqZlJlcG9ydENvbnRhaW5lcn0gZnJvbSAnLi4vaW50ZXJmYWNlL3JlcG9ydHMvcmVwb3J0LWNvbnRhaW5lcic7XG5pbXBvcnQge0FqZlJlcG9ydFZhcmlhYmxlfSBmcm9tICcuLi9pbnRlcmZhY2UvcmVwb3J0cy9yZXBvcnQtdmFyaWFibGUnO1xuaW1wb3J0IHtBamZXaWRnZXR9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldCc7XG5pbXBvcnQge0FqZldpZGdldFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS93aWRnZXRzL3dpZGdldC10eXBlJztcbmltcG9ydCB7Y3JlYXRlRGF0YXNldH0gZnJvbSAnLi4vdXRpbHMvZGF0YXNldC9jcmVhdGUtZGF0YXNldCc7XG5pbXBvcnQge2NyZWF0ZVJlcG9ydENvbnRhaW5lcn0gZnJvbSAnLi4vdXRpbHMvcmVwb3J0cy9jcmVhdGUtcmVwb3J0LWNvbnRhaW5lcic7XG5pbXBvcnQge0FqZldpZGdldENyZWF0ZSwgY3JlYXRlV2lkZ2V0fSBmcm9tICcuLi91dGlscy93aWRnZXRzL2NyZWF0ZS13aWRnZXQnO1xuaW1wb3J0IHtcbiAgYmFja2dyb3VuZENvbG9yLFxuICBib3hTdHlsZSxcbiAgc2xpZGVDb250ZW50U3R5bGUsXG4gIHNsaWRlVGl0bGVTdHlsZSxcbiAgd2lkZ2V0U3R5bGUsXG4gIHdpZGdldFRpdGxlU3R5bGVcbn0gZnJvbSAnLi9zdHlsZXMnO1xuXG5mdW5jdGlvbiBjcmVhdGVCb29sZWFuV2lkZ2V0KGZpZWxkOiBBamZGaWVsZCk6IEFqZldpZGdldCB7XG4gIHJldHVybiBjcmVhdGVXaWRnZXQoe1xuICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgIGNvbnRlbnQ6IFtcbiAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgaHRtbFRleHQ6IGA8aDU+W1tDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfSAhPSBudWxsXCIpXV0gYW5zd2VyczwvaDU+YCxcbiAgICAgICAgc3R5bGVzOiB7bWFyZ2luOiAnMTBweCcsIHBhZGRpbmdMZWZ0OiAnMTVweCd9LFxuICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5DaGFydCxcbiAgICAgICAgdHlwZTogQWpmQ2hhcnRUeXBlLlBpZSxcbiAgICAgICAgbGFiZWxzOiB7Zm9ybXVsYTogJ1tcXCdUcnVlXFwnLCBcXCdGYWxzZVxcJ10nfSxcbiAgICAgICAgZGF0YXNldDogW2NyZWF0ZURhdGFzZXQoe1xuICAgICAgICAgICAgICAgICAgICBsYWJlbDogJ3RydWUnLFxuICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBbY3JlYXRlRm9ybXVsYSh7XG4gICAgICAgICAgICAgICAgICAgICAgZm9ybXVsYTogYFtDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfT09PXRydWVcIiksQ09VTlRGT1JNUyhmb3JtcyxcIiR7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIGZpZWxkLm5hbWV9PT09ZmFsc2VcIildYFxuICAgICAgICAgICAgICAgICAgICB9KV0sXG4gICAgICAgICAgICAgICAgICAgIG9wdGlvbnM6IHtiYWNrZ3JvdW5kQ29sb3I6IFsnZ3JlZW4nLCAncmVkJ119XG4gICAgICAgICAgICAgICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pIGFzIEFqZkRhdGFzZXRdLFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICAgICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzQwMHB4J30sXG4gICAgICAgIGV4cG9ydGFibGU6IHRydWVcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKVxuICAgIF0sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU11bHRpcGxlQ2hvaWNlV2lkZ2V0KGZpZWxkOiBBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4pOiBBamZXaWRnZXQge1xuICBjb25zdCBjaG9pY2VzID0gZmllbGQuY2hvaWNlc09yaWdpbi5jaG9pY2VzO1xuICBsZXQgZGF0YXNldDogQWpmRGF0YXNldFtdID0gY2hvaWNlcy5tYXAoXG4gICAgICAoYywgaW5kZXgpID0+XG4gICAgICAgICAgY3JlYXRlRGF0YXNldCh7XG4gICAgICAgICAgICBsYWJlbDogYCR7Yy5sYWJlbH1gLFxuICAgICAgICAgICAgZm9ybXVsYTogW2NyZWF0ZUZvcm11bGEoXG4gICAgICAgICAgICAgICAge2Zvcm11bGE6IGBbQ09VTlRGT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX0uaW5kZXhPZignJHtjLnZhbHVlfScpID4gLTFcIildYH0pXSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgYmFja2dyb3VuZENvbG9yOiBiYWNrZ3JvdW5kQ29sb3JbaW5kZXhdLFxuICAgICAgICAgICAgICBzdGFjazogYFN0YWNrICR7aW5kZXh9YCxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGFzIFBhcnRpYWw8QWpmRGF0YXNldD4pIGFzIEFqZkRhdGFzZXQpO1xuICBsZXQgY2hhcnRUeXBlID0gQWpmQ2hhcnRUeXBlLkJhcjtcbiAgbGV0IGxhYmVscyA9IHtmb3JtdWxhOiBgW11gfTtcblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICBjb250ZW50OiBbXG4gICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgIGh0bWxUZXh0OiBgPGg1PltbQ09VTlRGT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX0gIT0gbnVsbFwiKV1dIGFuc3dlcnM8L2g1PmAsXG4gICAgICAgIHN0eWxlczoge21hcmdpbjogJzEwcHgnLCBwYWRkaW5nTGVmdDogJzE1cHgnfSxcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgICAgIHR5cGU6IGNoYXJ0VHlwZSxcbiAgICAgICAgbGFiZWxzLFxuICAgICAgICBkYXRhc2V0LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICAgICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzQwMHB4J30sXG4gICAgICAgIGV4cG9ydGFibGU6IHRydWVcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKVxuICAgIF0sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cbmZ1bmN0aW9uIGNyZWF0ZU51bWJlcldpZGdldChmaWVsZDogQWpmRmllbGQpOiBBamZXaWRnZXQge1xuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICBzdHlsZXM6IHdpZGdldFN0eWxlLFxuICAgIGNvbnRlbnQ6IFtjcmVhdGVXaWRnZXQoe1xuICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5MYXlvdXQsXG4gICAgICBjb2x1bW5zOiBbMC4zMywgMC4zMywgMC4zM10sXG4gICAgICBjb250ZW50OiBbXG4gICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TWVhbjwvaDU+PC9kaXY+YCxcbiAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5UZXh0LFxuICAgICAgICAgICAgICAnaHRtbFRleHQnOiBgPHA+W1tNRUFOKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dIC8gW1tNQVgoZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV08L3A+YCxcbiAgICAgICAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlLFxuICAgICAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpXG4gICAgICAgICAgXVxuICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgd2lkZ2V0VHlwZTogQWpmV2lkZ2V0VHlwZS5Db2x1bW4sXG4gICAgICAgICAgc3R5bGVzOiBib3hTdHlsZSxcbiAgICAgICAgICBjb250ZW50OiBbXG4gICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgIGh0bWxUZXh0OiBgPGRpdiBjb2xvcj1cInByaW1hcnlcIj48aDU+TWVkaWFuPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgICdodG1sVGV4dCc6XG4gICAgICAgICAgICAgICAgICBgPHA+W1tNRURJQU4oZm9ybXMsXCIke2ZpZWxkLm5hbWV9XCIpXV0gLyBbW01BWChmb3JtcyxcIiR7ZmllbGQubmFtZX1cIildXTwvcD5gLFxuICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSlcbiAgICAgICAgICBdXG4gICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgICAgY3JlYXRlV2lkZ2V0KHtcbiAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICAgICAgICBzdHlsZXM6IGJveFN0eWxlLFxuICAgICAgICAgIGNvbnRlbnQ6IFtcbiAgICAgICAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT5Nb2RlPC9oNT48L2Rpdj5gLFxuICAgICAgICAgICAgICBzdHlsZXM6IHdpZGdldFRpdGxlU3R5bGUsXG4gICAgICAgICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSksXG4gICAgICAgICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgICAgICAgIGh0bWxUZXh0OiBgPHA+W1tNT0RFKGZvcm1zLFwiJHtmaWVsZC5uYW1lfVwiKV1dPC9wPmAsXG4gICAgICAgICAgICAgIHN0eWxlczogd2lkZ2V0VGl0bGVTdHlsZSxcbiAgICAgICAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKVxuICAgICAgICAgIF1cbiAgICAgICAgfSBhcyBBamZXaWRnZXRDcmVhdGUpLFxuICAgICAgXVxuICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKV1cbiAgfSBhcyBBamZXaWRnZXRDcmVhdGUpO1xufVxuZnVuY3Rpb24gY3JlYXRlU2luZ2xlQ2hvaWNlV2lkZ2V0KGZpZWxkOiBBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4pOiBBamZXaWRnZXQge1xuICBjb25zdCBjaG9pY2VzID0gZmllbGQuY2hvaWNlc09yaWdpbi5jaG9pY2VzO1xuICBsZXQgZGF0YXNldDogQWpmRGF0YXNldFtdID0gW107XG4gIGxldCBjaGFydFR5cGUgPSBBamZDaGFydFR5cGUuQmFyO1xuICBsZXQgbGFiZWxzID0ge2Zvcm11bGE6IGBbXWB9O1xuXG4gIGlmIChjaG9pY2VzLmxlbmd0aCA+IDUpIHtcbiAgICBsYWJlbHMgPSB7Zm9ybXVsYTogYFske2Nob2ljZXMubWFwKGMgPT4gYFxcJyR7Yy5sYWJlbH1cXCdgKX1dYH07XG4gICAgY2hhcnRUeXBlID0gQWpmQ2hhcnRUeXBlLlBpZTtcbiAgICBkYXRhc2V0ID1cbiAgICAgICAgW2NyZWF0ZURhdGFzZXQoe1xuICAgICAgICAgICBsYWJlbDogZmllbGQubGFiZWwsXG4gICAgICAgICAgIGZvcm11bGE6IFtjcmVhdGVGb3JtdWxhKHtcbiAgICAgICAgICAgICBmb3JtdWxhOiBgWyR7XG4gICAgICAgICAgICAgICAgIGNob2ljZXMubWFwKChjaG9pY2UpID0+IGBDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfT09PScke2Nob2ljZS52YWx1ZX0nXCIpYClcbiAgICAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpfV1gXG5cbiAgICAgICAgICAgfSldLFxuICAgICAgICAgICBvcHRpb25zOiB7YmFja2dyb3VuZENvbG9yfVxuICAgICAgICAgfSBhcyBhbnkpIGFzIEFqZkRhdGFzZXRdO1xuICB9IGVsc2Uge1xuICAgIGRhdGFzZXQgPSBjaG9pY2VzLm1hcChcbiAgICAgICAgKGMsIGluZGV4KSA9PiBjcmVhdGVEYXRhc2V0KHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGxhYmVsOiBgJHtjLmxhYmVsfWAsXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3JtdWxhOiBbY3JlYXRlRm9ybXVsYShcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7Zm9ybXVsYTogYFtDT1VOVEZPUk1TKGZvcm1zLFwiJHtmaWVsZC5uYW1lfT09PScke2MudmFsdWV9J1wiKV1gfSldLFxuICAgICAgICAgICAgICAgICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IGJhY2tncm91bmRDb2xvcltpbmRleF0sXG4gICAgICAgICAgICAgICAgICAgICAgICAgIHN0YWNrOiBgU3RhY2sgJHtpbmRleH1gLFxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgIH0gYXMgUGFydGlhbDxBamZEYXRhc2V0PikgYXMgQWpmRGF0YXNldCk7XG4gIH1cblxuICByZXR1cm4gY3JlYXRlV2lkZ2V0KHtcbiAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLkNvbHVtbixcbiAgICBjb250ZW50OiBbXG4gICAgICBjcmVhdGVXaWRnZXQoe1xuICAgICAgICB3aWRnZXRUeXBlOiBBamZXaWRnZXRUeXBlLlRleHQsXG4gICAgICAgIGh0bWxUZXh0OiBgPGg1PltbQ09VTlRGT1JNUyhmb3JtcyxcIiR7ZmllbGQubmFtZX0gIT0gbnVsbFwiKV1dIGFuc3dlcnM8L2g1PmAsXG4gICAgICAgIHN0eWxlczoge21hcmdpbjogJzEwcHgnLCBwYWRkaW5nTGVmdDogJzE1cHgnfSxcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKSxcbiAgICAgIGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ2hhcnQsXG4gICAgICAgIHR5cGU6IGNoYXJ0VHlwZSxcbiAgICAgICAgbGFiZWxzLFxuICAgICAgICBkYXRhc2V0LFxuICAgICAgICBvcHRpb25zOiB7XG4gICAgICAgICAgcmVzcG9uc2l2ZTogdHJ1ZSxcbiAgICAgICAgICBtYWludGFpbkFzcGVjdFJhdGlvOiBmYWxzZSxcbiAgICAgICAgICBsZWdlbmQ6IHtkaXNwbGF5OiB0cnVlLCBwb3NpdGlvbjogJ2JvdHRvbSd9XG4gICAgICAgIH0sXG4gICAgICAgIHN0eWxlczoge3dpZHRoOiAnMTAwJScsIGhlaWdodDogJzQwMHB4J30sXG4gICAgICAgIGV4cG9ydGFibGU6IHRydWVcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKVxuICAgIF0sXG4gIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbn1cblxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIHJldHVybnMgYSBiYXNpYyByZXBvcnQgZm9yIGFueSBmb3JtIHBhc3NlZCBpbiBpbnB1dC5cbiAqXG4gKiBAcGFyYW0gZm9ybSB0aGUgZm9ybSBzY2hlbWFcbiAqIEBwYXJhbSBbaWRdIHRoZSBpZCBvZiB0aGUgZm9ybSBpbnNpZGUgdGhlIHBsYXRoZm9ybS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHJlcG9ydEZyb21Gb3JtKGZvcm06IFBhcnRpYWw8QWpmRm9ybT4sIGlkPzogbnVtYmVyKTogQWpmUmVwb3J0IHtcbiAgY29uc3QgcmVwb3J0OiBBamZSZXBvcnQgPSB7fTtcbiAgY29uc3QgcmVwb3J0V2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcbiAgLy8gd2UgYXNzdW1lIHRoYXQgdGhlIGFycmF5IG9mIGZvcm1zIHBhc3NlZCB0byB0aGUgcmVwb3J0IGlzIGNhbGxlZCAnZm9ybXMnLlxuICBpZiAoaWQgIT0gbnVsbCkge1xuICAgIHJlcG9ydC52YXJpYWJsZXMgPSBbe25hbWU6ICdmb3JtcycsIGZvcm11bGE6IHsnZm9ybXVsYSc6IGBmb3Jtc1ske2lkfV1gfX0gYXMgQWpmUmVwb3J0VmFyaWFibGVdO1xuICB9XG4gIGZvcm0ubm9kZXM/LmZvckVhY2goc2xpZGUgPT4ge1xuICAgIGNvbnN0IHNsaWRlV2lkZ2V0czogQWpmV2lkZ2V0W10gPSBbXTtcblxuICAgIChzbGlkZS5ub2RlcyBhcyBBamZGaWVsZFtdKS5mb3JFYWNoKChmaWVsZDogQWpmRmllbGQpID0+IHtcbiAgICAgIC8vIGNyZWF0ZSB0aGUgdGl0bGUgb2YgdGhlIHdpZGdldC5cbiAgICAgIGNvbnN0IGZpZWxkVGl0bGVXaWRnZXQ6IEFqZldpZGdldCA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoNT4ke2ZpZWxkLmxhYmVsfTwvaDU+PC9kaXY+YCxcbiAgICAgICAgc3R5bGVzOiB3aWRnZXRUaXRsZVN0eWxlXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG4gICAgICBzbGlkZVdpZGdldHMucHVzaChmaWVsZFRpdGxlV2lkZ2V0KTtcblxuICAgICAgc3dpdGNoIChmaWVsZC5maWVsZFR5cGUpIHtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucG9wKCk7IC8vIHJlbW92ZSB0aGUgdGl0bGUgb2YgZW1wdHkgd2lkZ2V0XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk51bWJlcjpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVOdW1iZXJXaWRnZXQoZmllbGQpKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBBamZGaWVsZFR5cGUuQm9vbGVhbjpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVCb29sZWFuV2lkZ2V0KGZpZWxkKSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLlNpbmdsZUNob2ljZTpcbiAgICAgICAgICBzbGlkZVdpZGdldHMucHVzaChjcmVhdGVTaW5nbGVDaG9pY2VXaWRnZXQoZmllbGQgYXMgQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+KSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQWpmRmllbGRUeXBlLk11bHRpcGxlQ2hvaWNlOlxuICAgICAgICAgIHNsaWRlV2lkZ2V0cy5wdXNoKGNyZWF0ZU11bHRpcGxlQ2hvaWNlV2lkZ2V0KGZpZWxkIGFzIEFqZkZpZWxkV2l0aENob2ljZXM8YW55PikpO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH0pO1xuICAgIC8vIGlmIHRoZSBzbGlkZSBoYXZlIGEgd2lkZ2V0cyBhZGQgaGltIHRvIHRoZSByZXBvcnRzIHdpdGggdGhlIHJlbGF0aXZlIHRpdGxlXG4gICAgaWYgKHNsaWRlV2lkZ2V0cy5sZW5ndGggPiAwKSB7XG4gICAgICAvLyBjcmVhdGUgdGhlIHRpdGxlIG9mIHRoZSBzbGlkZS5cbiAgICAgIGNvbnN0IHNsaWRlVGl0bGVXaWRnZXQ6IEFqZldpZGdldCA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuVGV4dCxcbiAgICAgICAgaHRtbFRleHQ6IGA8ZGl2IGNvbG9yPVwicHJpbWFyeVwiPjxoMT4ke3NsaWRlLmxhYmVsfTwvaDE+PC9kaXY+YCxcbiAgICAgICAgc3R5bGVzOiBzbGlkZVRpdGxlU3R5bGVcbiAgICAgIH0gYXMgQWpmV2lkZ2V0Q3JlYXRlKTtcbiAgICAgIHJlcG9ydFdpZGdldHMucHVzaChzbGlkZVRpdGxlV2lkZ2V0KTtcbiAgICAgIC8vIGNyZWF0ZSB0aGUgY29sdW1uIHdpdGggdGhlIHNsaWRlIHdpZGdldHMuXG4gICAgICBjb25zdCBjb2x1bW5XaWRnZXQ6IEFqZldpZGdldCA9IGNyZWF0ZVdpZGdldCh7XG4gICAgICAgIHdpZGdldFR5cGU6IEFqZldpZGdldFR5cGUuQ29sdW1uLFxuICAgICAgICBjb250ZW50OiBzbGlkZVdpZGdldHMsXG4gICAgICAgIHN0eWxlczogc2xpZGVDb250ZW50U3R5bGUsXG4gICAgICB9IGFzIEFqZldpZGdldENyZWF0ZSk7XG4gICAgICByZXBvcnRXaWRnZXRzLnB1c2goY29sdW1uV2lkZ2V0KTtcbiAgICB9XG4gIH0pO1xuXG4gIHJlcG9ydC5jb250ZW50ID0gY3JlYXRlUmVwb3J0Q29udGFpbmVyKHtjb250ZW50OiBbLi4ucmVwb3J0V2lkZ2V0c119IGFzIEFqZlJlcG9ydENvbnRhaW5lcik7XG5cbiAgcmV0dXJuIHJlcG9ydDtcbn1cbiJdfQ==