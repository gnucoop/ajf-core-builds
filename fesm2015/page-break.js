import { Component, ViewEncapsulation, ChangeDetectionStrategy, NgModule } from '@angular/core';

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/page-break/page-break.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * this component manages the page break
 *
 * @export
 */
class AjfPageBreakComponent {
}
AjfPageBreakComponent.decorators = [
    { type: Component, args: [{
                selector: 'ajf-page-break',
                template: "&nbsp;",
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
                styles: ["@media print{ajf-page-break{display:block;page-break-after:always}}ajf-page-break{display:none}\n"]
            }] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/page-break/page-break-module.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
class AjfPageBreakModule {
}
AjfPageBreakModule.decorators = [
    { type: NgModule, args: [{
                declarations: [
                    AjfPageBreakComponent,
                ],
                exports: [
                    AjfPageBreakComponent,
                ]
            },] }
];

/**
 * @fileoverview added by tsickle
 * Generated from: src/core/page-break/public-api.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * Generated bundle index. Do not edit.
 */

export { AjfPageBreakComponent, AjfPageBreakModule };
//# sourceMappingURL=page-break.js.map
