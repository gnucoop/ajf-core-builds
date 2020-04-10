/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/form.ts
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
import { AjfPageSlider } from '@ajf/core/page-slider';
import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { ChangeDetectorRef, Directive, EventEmitter, Input, Output, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { delayWhen, map, withLatestFrom } from 'rxjs/operators';
import { AjfFormField } from './field';
import { AjfFormRendererService } from './form-renderer';
import { AjfFieldType } from './interface/fields/field-type';
import { nodeInstanceCompleteName } from './utils/nodes-instances/node-instance-complete-name';
export class AjfFormActionEvent {
}
if (false) {
    /** @type {?} */
    AjfFormActionEvent.prototype.source;
    /** @type {?} */
    AjfFormActionEvent.prototype.value;
    /** @type {?} */
    AjfFormActionEvent.prototype.action;
}
/**
 * @abstract
 */
export class AjfFormRenderer {
    /**
     * this constructor will init current formula by ajfBuilderService
     * @param {?} _rendererService
     * @param {?} _changeDetectorRef
     */
    constructor(_rendererService, _changeDetectorRef) {
        this._rendererService = _rendererService;
        this._changeDetectorRef = _changeDetectorRef;
        // ajfFieldTypes [ Text, Number, Boolean, SingleChoice, MultipleChoice,
        // Formula, Empty, Composed, LENGTH ]
        this.ajfFieldTypes = AjfFieldType;
        this._orientationChange = new EventEmitter();
        this.orientationChange = this._orientationChange.asObservable();
        this._saveDisabled = false;
        this._hasStartMessage = false;
        this._hasEndMessage = false;
        this._hideTopToolbar = false;
        this._hideBottomToolbar = false;
        this._hideNavigationButtons = false;
        this._fixedOrientation = false;
        this._readonly = false;
        this._orientation = 'horizontal';
        this._errorMoveEvent = new EventEmitter();
        // _init is a private boolean
        this._init = false;
        this._nextSlideSubscription = Subscription.EMPTY;
        this._errorMoveSubscription = Subscription.EMPTY;
        this._formAction = new EventEmitter();
        this.formAction = this._formAction.asObservable();
        this.formGroup = _rendererService.formGroup;
        this.slides = _rendererService.nodesTree;
        this._errorPositions = _rendererService.errorPositions;
        this.errors = _rendererService.errors;
        this.slidesNum = _rendererService.slidesNum;
        this.formIsInit =
            _rendererService.formInitEvent.pipe(map((/**
             * @param {?} e
             * @return {?}
             */
            e => e === 1 /* Complete */)));
    }
    /**
     * @return {?}
     */
    get saveDisabled() {
        return this._saveDisabled;
    }
    /**
     * @param {?} saveDisabled
     * @return {?}
     */
    set saveDisabled(saveDisabled) {
        this._saveDisabled = coerceBooleanProperty(saveDisabled);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get hasStartMessage() {
        return this._hasStartMessage;
    }
    /**
     * @param {?} hasStartMessage
     * @return {?}
     */
    set hasStartMessage(hasStartMessage) {
        this._hasStartMessage = coerceBooleanProperty(hasStartMessage);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get hasEndMessage() {
        return this._hasEndMessage;
    }
    /**
     * @param {?} hasEndMessage
     * @return {?}
     */
    set hasEndMessage(hasEndMessage) {
        this._hasEndMessage = coerceBooleanProperty(hasEndMessage);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get hideTopToolbar() {
        return this._hideTopToolbar;
    }
    /**
     * @param {?} hideTopToolbar
     * @return {?}
     */
    set hideTopToolbar(hideTopToolbar) {
        this._hideTopToolbar = coerceBooleanProperty(hideTopToolbar);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get hideBottompToolbar() {
        return this._hideBottomToolbar;
    }
    /**
     * @param {?} hideBottomToolbar
     * @return {?}
     */
    set hideBottomToolbar(hideBottomToolbar) {
        this._hideBottomToolbar = coerceBooleanProperty(hideBottomToolbar);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get hideNavigationButtons() {
        return this._hideNavigationButtons;
    }
    /**
     * @param {?} hideNavigationButtons
     * @return {?}
     */
    set hideNavigationButtons(hideNavigationButtons) {
        this._hideNavigationButtons = coerceBooleanProperty(hideNavigationButtons);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get fixedOrientation() {
        return this._fixedOrientation;
    }
    /**
     * @param {?} fixedOrientation
     * @return {?}
     */
    set fixedOrientation(fixedOrientation) {
        this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get readonly() {
        return this._readonly;
    }
    /**
     * @param {?} readonly
     * @return {?}
     */
    set readonly(readonly) {
        this._readonly = coerceBooleanProperty(readonly);
        this._changeDetectorRef.markForCheck();
    }
    /**
     * @return {?}
     */
    get orientation() {
        return this._orientation;
    }
    /**
     * @param {?} orientation
     * @return {?}
     */
    set orientation(orientation) {
        if (orientation !== 'horizontal' && orientation !== 'vertical') {
            return;
        }
        if (orientation !== this._orientation) {
            this._orientation = orientation;
            this._changeDetectorRef.markForCheck();
            this._orientationChange.emit(this._orientation);
        }
    }
    /**
     * @param {?} form
     * @return {?}
     */
    set form(form) {
        this._form = form;
        if (this._init) {
            this._rendererService.setForm(this._form);
        }
    }
    /**
     * this method will scroll to next error received by subscribe
     * @return {?}
     */
    goToNextError() {
        this._errorMoveEvent.emit(true);
    }
    /**
     * this method will scroll to prev error received by subscribe
     * @return {?}
     */
    goToPrevError() {
        this._errorMoveEvent.emit(false);
    }
    /**
     * this method will add group
     * @param {?} nodeGroup
     * @return {?}
     */
    addGroup(nodeGroup) {
        /** @type {?} */
        let s = this._rendererService.addGroup((/** @type {?} */ (nodeGroup)))
            .pipe(delayWhen((/**
         * @return {?}
         */
        () => this.formSlider.pageScrollFinish)))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (r && this.formSlider != null) {
                this.formSlider.slide({ dir: 'down' });
            }
        }), (/**
         * @param {?} _e
         * @return {?}
         */
        (_e) => {
            if (s) {
                s.unsubscribe();
            }
        }), (/**
         * @return {?}
         */
        () => {
            if (s) {
                s.unsubscribe();
            }
        }));
    }
    /**
     * this method will remove group
     * @param {?} nodeGroup
     * @return {?}
     */
    removeGroup(nodeGroup) {
        /** @type {?} */
        let s = this._rendererService.removeGroup((/** @type {?} */ (nodeGroup)))
            .pipe(delayWhen((/**
         * @return {?}
         */
        () => this.formSlider.pageScrollFinish)))
            .subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => {
            if (r && this.formSlider != null) {
                this.formSlider.slide({ dir: 'up' });
            }
        }), (/**
         * @param {?} _e
         * @return {?}
         */
        (_e) => {
            if (s) {
                s.unsubscribe();
            }
        }), (/**
         * @return {?}
         */
        () => {
            if (s) {
                s.unsubscribe();
            }
        }));
    }
    /**
     * @param {?} _evt
     * @return {?}
     */
    onSave(_evt) {
        this._formAction.emit({ source: this, action: 'save', value: this._rendererService.getFormValue() });
    }
    /**
     * @param {?} _evt
     * @param {?} action
     * @return {?}
     */
    onFormAction(_evt, action) {
        this._formAction.emit({ source: this, value: this._rendererService.getFormValue(), action: action });
    }
    /**
     * this method will set current form in rederer service when init form
     * @return {?}
     */
    ngAfterViewInit() {
        if (this._form != null) {
            this._rendererService.setForm(this._form);
            this._changeDetectorRef.detectChanges();
        }
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
        if (!this._init && this.formSlider != null) {
            this._init = true;
            this._errorMoveSubscription =
                ((/** @type {?} */ (this._errorMoveEvent)))
                    .pipe(withLatestFrom(this._errorPositions))
                    .subscribe((/**
                 * @param {?} v
                 * @return {?}
                 */
                (v) => {
                    /** @type {?} */
                    const move = v[0];
                    /** @type {?} */
                    const currentPosition = this.formSlider.currentPage - (+this.hasStartMessage) + 1;
                    /** @type {?} */
                    const errors = v[1];
                    if (errors == null) {
                        return;
                    }
                    /** @type {?} */
                    let found = false;
                    /** @type {?} */
                    let prevIdx = -1;
                    /** @type {?} */
                    let nextIdx = -1;
                    /** @type {?} */
                    let idx = 0;
                    /** @type {?} */
                    let errorsLen = errors.length;
                    while (!found && idx < errorsLen) {
                        if (errors[idx] == currentPosition) {
                            found = true;
                            prevIdx = idx > 0 ? idx - 1 : errorsLen - 1;
                            nextIdx = idx < errorsLen - 1 ? idx + 1 : 0;
                        }
                        else if (errors[idx] > currentPosition) {
                            found = true;
                            prevIdx = idx > 0 ? idx - 1 : errorsLen - 1;
                            nextIdx = idx;
                        }
                        idx++;
                    }
                    if (!found) {
                        prevIdx = errorsLen - 1;
                        nextIdx = 0;
                    }
                    this.formSlider.slide({ to: move ? errors[nextIdx] - 1 : errors[prevIdx] - 1 });
                    this._changeDetectorRef.detectChanges();
                }));
        }
    }
    /**
     * @return {?}
     */
    ngOnDestroy() {
        this._nextSlideSubscription.unsubscribe();
        this._errorMoveSubscription.unsubscribe();
        this._orientationChange.complete();
        this._errorMoveEvent.complete();
        this._formAction.complete();
    }
    /**
     * @param {?} orientation
     * @return {?}
     */
    orientationChangeHandler(orientation) {
        this.orientation = orientation;
    }
    /**
     * @param {?} _
     * @param {?} node
     * @return {?}
     */
    trackNodeById(_, node) {
        return nodeInstanceCompleteName(node);
    }
}
AjfFormRenderer.decorators = [
    { type: Directive }
];
/** @nocollapse */
AjfFormRenderer.ctorParameters = () => [
    { type: AjfFormRendererService },
    { type: ChangeDetectorRef }
];
AjfFormRenderer.propDecorators = {
    title: [{ type: Input }],
    orientationChange: [{ type: Output }],
    saveDisabled: [{ type: Input }],
    hasStartMessage: [{ type: Input }],
    hasEndMessage: [{ type: Input }],
    hideTopToolbar: [{ type: Input }],
    hideBottomToolbar: [{ type: Input }],
    hideNavigationButtons: [{ type: Input }],
    fixedOrientation: [{ type: Input }],
    readonly: [{ type: Input }],
    orientation: [{ type: Input }],
    formSlider: [{ type: ViewChild, args: ['formSlider', { static: false },] }],
    fields: [{ type: ViewChildren, args: [AjfFormField,] }],
    formAction: [{ type: Output }],
    form: [{ type: Input }]
};
if (false) {
    /** @type {?} */
    AjfFormRenderer.prototype.formGroup;
    /** @type {?} */
    AjfFormRenderer.prototype.slides;
    /** @type {?} */
    AjfFormRenderer.prototype.slidesNum;
    /** @type {?} */
    AjfFormRenderer.prototype.errors;
    /** @type {?} */
    AjfFormRenderer.prototype.formIsInit;
    /** @type {?} */
    AjfFormRenderer.prototype.ajfFieldTypes;
    /** @type {?} */
    AjfFormRenderer.prototype.title;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._orientationChange;
    /** @type {?} */
    AjfFormRenderer.prototype.orientationChange;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._saveDisabled;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._hasStartMessage;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._hasEndMessage;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._hideTopToolbar;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._hideBottomToolbar;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._hideNavigationButtons;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._fixedOrientation;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._readonly;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._orientation;
    /** @type {?} */
    AjfFormRenderer.prototype.formSlider;
    /** @type {?} */
    AjfFormRenderer.prototype.fields;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._errorMoveEvent;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._errorPositions;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._form;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._init;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._nextSlideSubscription;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._errorMoveSubscription;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._formAction;
    /** @type {?} */
    AjfFormRenderer.prototype.formAction;
    /**
     * @type {?}
     * @private
     */
    AjfFormRenderer.prototype._rendererService;
    /**
     * @type {?}
     * @protected
     */
    AjfFormRenderer.prototype._changeDetectorRef;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGFBQWEsRUFBMkIsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBR0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3JDLE9BQU8sRUFBb0Isc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUUxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFNM0QsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFFN0YsTUFBTSxPQUFPLGtCQUFrQjtDQUk5Qjs7O0lBSEMsb0NBQXdCOztJQUN4QixtQ0FBYzs7SUFDZCxvQ0FBZTs7Ozs7QUFJakIsTUFBTSxPQUFnQixlQUFlOzs7Ozs7SUFxSm5DLFlBQ1ksZ0JBQXdDLEVBQ3RDLGtCQUFxQztRQUR2QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7OztRQTNJMUMsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFJOUIsdUJBQWtCLEdBQ3RCLElBQUksWUFBWSxFQUE0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Qzs7Ozs7SUFVaEMsNkNBQW1DOzs7OztJQVVuQyxpREFBdUM7Ozs7O0lBVXZDLDRDQUFrQzs7Ozs7SUFVbEMsb0NBQTBCOzs7OztJQVUxQix1Q0FBOEQ7O0lBZ0I5RCxxQ0FBb0U7O0lBQ3BFLGlDQUE0RDs7Ozs7SUFFNUQsMENBQTZFOzs7OztJQUc3RSwwQ0FBOEM7Ozs7O0lBRzlDLGdDQUF1Qjs7Ozs7SUFFdkIsZ0NBQXNCOzs7OztJQUV0QixpREFBa0U7Ozs7O0lBQ2xFLGlEQUFrRTs7Ozs7SUFFbEUsc0NBQStGOztJQUMvRixxQ0FBZ0c7Ozs7O0lBZTVGLDJDQUFnRDs7Ozs7SUFDaEQsNkNBQStDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlBhZ2VTbGlkZXIsIEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbn0gZnJvbSAnQGFqZi9jb3JlL3BhZ2Utc2xpZGVyJztcbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW5cbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWxheVdoZW4sIG1hcCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGb3JtRmllbGR9IGZyb20gJy4vZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtSW5pdFN0YXR1cywgQWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcblxuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvZm9ybSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5cbmV4cG9ydCBjbGFzcyBBamZGb3JtQWN0aW9uRXZlbnQge1xuICBzb3VyY2U6IEFqZkZvcm1SZW5kZXJlcjtcbiAgdmFsdWU6IE9iamVjdDtcbiAgYWN0aW9uOiBzdHJpbmc7XG59XG5cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGFic3RyYWN0IGNsYXNzIEFqZkZvcm1SZW5kZXJlciBpbXBsZW1lbnRzIEFmdGVyVmlld0NoZWNrZWQsIEFmdGVyVmlld0luaXQsIE9uRGVzdHJveSB7XG4gIC8vIGZvcm1Hcm91cCBpcyBhbiBPYnNlcnZhYmxlIEZvcm1Hcm91cCB0eXBlXG4gIHJlYWRvbmx5IGZvcm1Hcm91cDogT2JzZXJ2YWJsZTxGb3JtR3JvdXB8bnVsbD47XG5cbiAgLy8gIHNsaWRlcyBpcyBhbiBvYnNlcnZhYmxlIEFqZlNsaWRlIGFycmF5IHR5cGVcbiAgcmVhZG9ubHkgc2xpZGVzOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT47XG4gIHJlYWRvbmx5IHNsaWRlc051bTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICByZWFkb25seSBlcnJvcnM6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcmVhZG9ubHkgZm9ybUlzSW5pdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvLyBhamZGaWVsZFR5cGVzIFsgVGV4dCwgTnVtYmVyLCBCb29sZWFuLCBTaW5nbGVDaG9pY2UsIE11bHRpcGxlQ2hvaWNlLFxuICAvLyBGb3JtdWxhLCBFbXB0eSwgQ29tcG9zZWQsIExFTkdUSCBdXG4gIHJlYWRvbmx5IGFqZkZpZWxkVHlwZXMgPSBBamZGaWVsZFR5cGU7XG5cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPVxuICAgICAgbmV3IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBvcmllbnRhdGlvbkNoYW5nZTogT2JzZXJ2YWJsZTxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX3NhdmVEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgc2F2ZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlRGlzYWJsZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHNhdmVEaXNhYmxlZChzYXZlRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zYXZlRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoc2F2ZURpc2FibGVkKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc1N0YXJ0TWVzc2FnZSA9IGZhbHNlO1xuICBnZXQgaGFzU3RhcnRNZXNzYWdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNTdGFydE1lc3NhZ2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhhc1N0YXJ0TWVzc2FnZShoYXNTdGFydE1lc3NhZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNTdGFydE1lc3NhZ2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGFzU3RhcnRNZXNzYWdlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc0VuZE1lc3NhZ2UgPSBmYWxzZTtcbiAgZ2V0IGhhc0VuZE1lc3NhZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0VuZE1lc3NhZ2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhhc0VuZE1lc3NhZ2UoaGFzRW5kTWVzc2FnZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc0VuZE1lc3NhZ2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGFzRW5kTWVzc2FnZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlVG9wVG9vbGJhciA9IGZhbHNlO1xuICBnZXQgaGlkZVRvcFRvb2xiYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVUb3BUb29sYmFyO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlVG9wVG9vbGJhcihoaWRlVG9wVG9vbGJhcjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVUb3BUb29sYmFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVUb3BUb29sYmFyKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVCb3R0b21Ub29sYmFyID0gZmFsc2U7XG4gIGdldCBoaWRlQm90dG9tcFRvb2xiYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVCb3R0b21Ub29sYmFyO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlQm90dG9tVG9vbGJhcihoaWRlQm90dG9tVG9vbGJhcjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVCb3R0b21Ub29sYmFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVCb3R0b21Ub29sYmFyKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucyA9IGZhbHNlO1xuICBnZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyhoaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZU5hdmlnYXRpb25CdXR0b25zKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpeGVkT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgZ2V0IGZpeGVkT3JpZW50YXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkT3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpeGVkT3JpZW50YXRpb24oZml4ZWRPcmllbnRhdGlvbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpeGVkT3JpZW50YXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZml4ZWRPcmllbnRhdGlvbik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gIGdldCBvcmllbnRhdGlvbigpOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgb3JpZW50YXRpb24ob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbikge1xuICAgIGlmIChvcmllbnRhdGlvbiAhPT0gJ2hvcml6b250YWwnICYmIG9yaWVudGF0aW9uICE9PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvcmllbnRhdGlvbiAhPT0gdGhpcy5fb3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmVtaXQodGhpcy5fb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2Zvcm1TbGlkZXInLCB7c3RhdGljOiBmYWxzZX0pIGZvcm1TbGlkZXI6IEFqZlBhZ2VTbGlkZXI7XG4gIEBWaWV3Q2hpbGRyZW4oQWpmRm9ybUZpZWxkKSBmaWVsZHM6IFF1ZXJ5TGlzdDxBamZGb3JtRmllbGQ+O1xuXG4gIHByaXZhdGUgX2Vycm9yTW92ZUV2ZW50OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLy8gX2Vycm9yUG9zaXRpb25zIGlzIGEgcHJpdmF0ZSBzdWJqZWN0IHN0cnVjdHVyZSB0aGF0IGNvbnRhaW5zIG5leHQgYW5kIHByZXZcbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnM6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuXG4gIC8vIF9mb3JtIGlzIGEgcHJpdmF0ZSBhakZGb3JtXG4gIHByaXZhdGUgX2Zvcm06IEFqZkZvcm07XG4gIC8vIF9pbml0IGlzIGEgcHJpdmF0ZSBib29sZWFuXG4gIHByaXZhdGUgX2luaXQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZXJyb3JNb3ZlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZm9ybUFjdGlvbjogRXZlbnRFbWl0dGVyPEFqZkZvcm1BY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1BY3Rpb25FdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGZvcm1BY3Rpb246IE9ic2VydmFibGU8QWpmRm9ybUFjdGlvbkV2ZW50PiA9IHRoaXMuX2Zvcm1BY3Rpb24uYXNPYnNlcnZhYmxlKCk7XG5cbiAgQElucHV0KClcbiAgc2V0IGZvcm0oZm9ybTogQWpmRm9ybSkge1xuICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuXG4gICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyU2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIGNvbnN0cnVjdG9yIHdpbGwgaW5pdCBjdXJyZW50IGZvcm11bGEgYnkgYWpmQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgcHJpdmF0ZSBfcmVuZGVyZXJTZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYpIHtcbiAgICB0aGlzLmZvcm1Hcm91cCA9IF9yZW5kZXJlclNlcnZpY2UuZm9ybUdyb3VwO1xuICAgIHRoaXMuc2xpZGVzID0gX3JlbmRlcmVyU2VydmljZS5ub2Rlc1RyZWU7XG4gICAgdGhpcy5fZXJyb3JQb3NpdGlvbnMgPSBfcmVuZGVyZXJTZXJ2aWNlLmVycm9yUG9zaXRpb25zO1xuICAgIHRoaXMuZXJyb3JzID0gX3JlbmRlcmVyU2VydmljZS5lcnJvcnM7XG4gICAgdGhpcy5zbGlkZXNOdW0gPSBfcmVuZGVyZXJTZXJ2aWNlLnNsaWRlc051bTtcbiAgICB0aGlzLmZvcm1Jc0luaXQgPVxuICAgICAgICBfcmVuZGVyZXJTZXJ2aWNlLmZvcm1Jbml0RXZlbnQucGlwZShtYXAoZSA9PiBlID09PSBBamZGb3JtSW5pdFN0YXR1cy5Db21wbGV0ZSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2Nyb2xsIHRvIG5leHQgZXJyb3IgcmVjZWl2ZWQgYnkgc3Vic2NyaWJlXG4gICAqL1xuICBnb1RvTmV4dEVycm9yKCk6IHZvaWQge1xuICAgIHRoaXMuX2Vycm9yTW92ZUV2ZW50LmVtaXQodHJ1ZSk7XG4gIH1cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2Nyb2xsIHRvIHByZXYgZXJyb3IgcmVjZWl2ZWQgYnkgc3Vic2NyaWJlXG4gICAqL1xuICBnb1RvUHJldkVycm9yKCk6IHZvaWQge1xuICAgIHRoaXMuX2Vycm9yTW92ZUV2ZW50LmVtaXQoZmFsc2UpO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgYWRkIGdyb3VwXG4gICAqL1xuICBhZGRHcm91cChub2RlR3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlfEFqZlNsaWRlSW5zdGFuY2V8QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IHZvaWQge1xuICAgIGxldCBzID0gdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLmFkZEdyb3VwKG5vZGVHcm91cCBhcyBBamZOb2RlR3JvdXBJbnN0YW5jZSlcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgZGVsYXlXaGVuKCgpID0+IHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoKSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHIgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybVNsaWRlci5zbGlkZSh7ZGlyOiAnZG93bid9KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChfZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgcmVtb3ZlIGdyb3VwXG4gICAqL1xuICByZW1vdmVHcm91cChub2RlR3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlfEFqZlNsaWRlSW5zdGFuY2V8QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IHZvaWQge1xuICAgIGxldCBzID0gdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLnJlbW92ZUdyb3VwKG5vZGVHcm91cCBhcyBBamZOb2RlR3JvdXBJbnN0YW5jZSlcbiAgICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICAgZGVsYXlXaGVuKCgpID0+IHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoKSxcbiAgICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgICAgICAgICAgICAgIChyKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHIgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZm9ybVNsaWRlci5zbGlkZSh7ZGlyOiAndXAnfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoX2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIG9uU2F2ZShfZXZ0OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmVtaXQoXG4gICAgICAgIHtzb3VyY2U6IHRoaXMsIGFjdGlvbjogJ3NhdmUnLCB2YWx1ZTogdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLmdldEZvcm1WYWx1ZSgpfSk7XG4gIH1cblxuICBvbkZvcm1BY3Rpb24oX2V2dDogYW55LCBhY3Rpb246IHN0cmluZykge1xuICAgIHRoaXMuX2Zvcm1BY3Rpb24uZW1pdChcbiAgICAgICAge3NvdXJjZTogdGhpcywgdmFsdWU6IHRoaXMuX3JlbmRlcmVyU2VydmljZS5nZXRGb3JtVmFsdWUoKSwgYWN0aW9uOiBhY3Rpb259KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNldCBjdXJyZW50IGZvcm0gaW4gcmVkZXJlciBzZXJ2aWNlIHdoZW4gaW5pdCBmb3JtXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Zvcm0gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLnNldEZvcm0odGhpcy5fZm9ybSk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faW5pdCAmJiB0aGlzLmZvcm1TbGlkZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5faW5pdCA9IHRydWU7XG5cbiAgICAgIHRoaXMuX2Vycm9yTW92ZVN1YnNjcmlwdGlvbiA9XG4gICAgICAgICAgKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2Vycm9yTW92ZUV2ZW50KVxuICAgICAgICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9lcnJvclBvc2l0aW9ucykpXG4gICAgICAgICAgICAgIC5zdWJzY3JpYmUoKHY6IFtib29sZWFuLCBudW1iZXJbXV0pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBtb3ZlID0gdlswXTtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmZvcm1TbGlkZXIuY3VycmVudFBhZ2UgLSAoK3RoaXMuaGFzU3RhcnRNZXNzYWdlKSArIDE7XG4gICAgICAgICAgICAgICAgY29uc3QgZXJyb3JzID0gdlsxXTtcbiAgICAgICAgICAgICAgICBpZiAoZXJyb3JzID09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBsZXQgcHJldklkeCA9IC0xO1xuICAgICAgICAgICAgICAgIGxldCBuZXh0SWR4ID0gLTE7XG4gICAgICAgICAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgICAgICAgICAgbGV0IGVycm9yc0xlbiA9IGVycm9ycy5sZW5ndGg7XG4gICAgICAgICAgICAgICAgd2hpbGUgKCFmb3VuZCAmJiBpZHggPCBlcnJvcnNMZW4pIHtcbiAgICAgICAgICAgICAgICAgIGlmIChlcnJvcnNbaWR4XSA9PSBjdXJyZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwcmV2SWR4ID0gaWR4ID4gMCA/IGlkeCAtIDEgOiBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICAgICAgICBuZXh0SWR4ID0gaWR4IDwgZXJyb3JzTGVuIC0gMSA/IGlkeCArIDEgOiAwO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvcnNbaWR4XSA+IGN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJZHggPSBpZHggPiAwID8gaWR4IC0gMSA6IGVycm9yc0xlbiAtIDE7XG4gICAgICAgICAgICAgICAgICAgIG5leHRJZHggPSBpZHg7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICBpZHgrKztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgICAgICAgcHJldklkeCA9IGVycm9yc0xlbiAtIDE7XG4gICAgICAgICAgICAgICAgICBuZXh0SWR4ID0gMDtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe3RvOiBtb3ZlID8gZXJyb3JzW25leHRJZHhdIC0gMSA6IGVycm9yc1twcmV2SWR4XSAtIDF9KTtcbiAgICAgICAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX25leHRTbGlkZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Vycm9yTW92ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbik6IHZvaWQge1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgfVxuXG4gIHRyYWNrTm9kZUJ5SWQoXzogbnVtYmVyLCBub2RlOiBBamZOb2RlSW5zdGFuY2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZSk7XG4gIH1cbn1cbiJdfQ==