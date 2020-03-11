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
import { AjfFormInitStatus, AjfFormRendererService } from './form-renderer';
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
        this.formIsInit = _rendererService.formInitEvent.pipe(map((/**
         * @param {?} e
         * @return {?}
         */
        e => e === AjfFormInitStatus.Complete)));
    }
    /**
     * @return {?}
     */
    get saveDisabled() { return this._saveDisabled; }
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
    get hasStartMessage() { return this._hasStartMessage; }
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
    get hasEndMessage() { return this._hasEndMessage; }
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
    get hideTopToolbar() { return this._hideTopToolbar; }
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
    get hideBottompToolbar() { return this._hideBottomToolbar; }
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
    get hideNavigationButtons() { return this._hideNavigationButtons; }
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
    get fixedOrientation() { return this._fixedOrientation; }
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
    get readonly() { return this._readonly; }
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
    get orientation() { return this._orientation; }
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
    goToNextError() { this._errorMoveEvent.emit(true); }
    /**
     * this method will scroll to prev error received by subscribe
     * @return {?}
     */
    goToPrevError() { this._errorMoveEvent.emit(false); }
    /**
     * this method will add group
     * @param {?} nodeGroup
     * @return {?}
     */
    addGroup(nodeGroup) {
        /** @type {?} */
        let s = this._rendererService.addGroup((/** @type {?} */ (nodeGroup))).pipe(delayWhen((/**
         * @return {?}
         */
        () => this.formSlider.pageScrollFinish))).subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => { if (r && this.formSlider != null) {
            this.formSlider.slide({ dir: 'down' });
        } }), (/**
         * @param {?} _e
         * @return {?}
         */
        (_e) => { if (s) {
            s.unsubscribe();
        } }), (/**
         * @return {?}
         */
        () => { if (s) {
            s.unsubscribe();
        } }));
    }
    /**
     * this method will remove group
     * @param {?} nodeGroup
     * @return {?}
     */
    removeGroup(nodeGroup) {
        /** @type {?} */
        let s = this._rendererService.removeGroup((/** @type {?} */ (nodeGroup))).pipe(delayWhen((/**
         * @return {?}
         */
        () => this.formSlider.pageScrollFinish))).subscribe((/**
         * @param {?} r
         * @return {?}
         */
        (r) => { if (r && this.formSlider != null) {
            this.formSlider.slide({ dir: 'up' });
        } }), (/**
         * @param {?} _e
         * @return {?}
         */
        (_e) => { if (s) {
            s.unsubscribe();
        } }), (/**
         * @return {?}
         */
        () => { if (s) {
            s.unsubscribe();
        } }));
    }
    /**
     * @param {?} _evt
     * @return {?}
     */
    onSave(_evt) {
        this._formAction.emit({
            source: this,
            action: 'save',
            value: this._rendererService.getFormValue()
        });
    }
    /**
     * @param {?} _evt
     * @param {?} action
     * @return {?}
     */
    onFormAction(_evt, action) {
        this._formAction.emit({
            source: this,
            value: this._rendererService.getFormValue(),
            action: action
        });
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
            this._errorMoveSubscription = ((/** @type {?} */ (this._errorMoveEvent))).pipe(withLatestFrom(this._errorPositions)).subscribe((/**
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGFBQWEsRUFBMkIsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQWtDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM3RSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNyQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUUxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFNM0QsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFFN0YsTUFBTSxPQUFPLGtCQUFrQjtDQUk5Qjs7O0lBSEMsb0NBQXdCOztJQUN4QixtQ0FBYzs7SUFDZCxvQ0FBZTs7Ozs7QUFJakIsTUFBTSxPQUFnQixlQUFlOzs7Ozs7SUFzSG5DLFlBQ1UsZ0JBQXdDLEVBQ3RDLGtCQUFxQztRQUR2QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7OztRQTVHeEMsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFJOUIsdUJBQWtCLEdBQ3RCLElB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QUUsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQUUsQ0FBQyxDQUFDOzs7UUFDdkMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FBRSxDQUFDLENBQUMsRUFDdEM7SUFDTCxDQUFDOzs7Ozs7SUFLRCxXQUFXLENBQ1QsU0FBOEU7O1lBRTFFLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLG1CQUFBLFNBQVMsRUFBd0IsQ0FBQyxDQUFDLElBQUksQ0FDL0UsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBQyxDQUNsRCxDQUFDLFNBQVM7Ozs7UUFDUCxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1NBQUUsQ0FBQyxDQUFDOzs7O1FBQ3BGLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRTtZQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFLENBQUMsQ0FBQzs7O1FBQ3ZDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQUUsQ0FBQyxDQUFDLEVBQ3RDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBUztRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTtTQUM1QyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFRCxZ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LDBDQUFnQzs7Ozs7SUFPaEMsNkNBQW1DOzs7OztJQU9uQyxpREFBdUM7Ozs7O0lBT3ZDLDRDQUFrQzs7Ozs7SUFPbEMsb0NBQTBCOzs7OztJQU8xQix1Q0FBOEQ7O0lBVzlELHFDQUFvRTs7SUFDcEUsaUNBQTREOzs7OztJQUU1RCwwQ0FBNkU7Ozs7O0lBRzdFLDBDQUE4Qzs7Ozs7SUFHOUMsZ0NBQXVCOzs7OztJQUV2QixnQ0FBc0I7Ozs7O0lBRXRCLGlEQUFrRTs7Ozs7SUFDbEUsaURBQWtFOzs7OztJQUVsRSxzQ0FBK0Y7O0lBQy9GLHFDQUFnRzs7Ozs7SUFjOUYsMkNBQWdEOzs7OztJQUNoRCw2Q0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlciwgQWpmUGFnZVNsaWRlck9yaWVudGF0aW9ufSBmcm9tICdAYWpmL2NvcmUvcGFnZS1zbGlkZXInO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0FmdGVyVmlld0NoZWNrZWQsIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsXG4gIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlbGF5V2hlbiwgbWFwLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1GaWVsZH0gZnJvbSAnLi9maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1Jbml0U3RhdHVzLCBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuXG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcblxuZXhwb3J0IGNsYXNzIEFqZkZvcm1BY3Rpb25FdmVudCB7XG4gIHNvdXJjZTogQWpmRm9ybVJlbmRlcmVyO1xuICB2YWx1ZTogT2JqZWN0O1xuICBhY3Rpb246IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRm9ybVJlbmRlcmVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLy8gZm9ybUdyb3VwIGlzIGFuIE9ic2VydmFibGUgRm9ybUdyb3VwIHR5cGVcbiAgcmVhZG9ubHkgZm9ybUdyb3VwOiBPYnNlcnZhYmxlPEZvcm1Hcm91cCB8IG51bGw+O1xuXG4gIC8vICBzbGlkZXMgaXMgYW4gb2JzZXJ2YWJsZSBBamZTbGlkZSBhcnJheSB0eXBlXG4gIHJlYWRvbmx5IHNsaWRlczogT2JzZXJ2YWJsZTxBamZTbGlkZUluc3RhbmNlW10+O1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcmVhZG9ubHkgZXJyb3JzOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHJlYWRvbmx5IGZvcm1Jc0luaXQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLy8gYWpmRmllbGRUeXBlcyBbIFRleHQsIE51bWJlciwgQm9vbGVhbiwgU2luZ2xlQ2hvaWNlLCBNdWx0aXBsZUNob2ljZSxcbiAgLy8gRm9ybXVsYSwgRW1wdHksIENvbXBvc2VkLCBMRU5HVEggXVxuICByZWFkb25seSBhamZGaWVsZFR5cGVzID0gQWpmRmllbGRUeXBlO1xuXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9yaWVudGF0aW9uQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPVxuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX3NhdmVEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgc2F2ZURpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2F2ZURpc2FibGVkOyB9XG4gIEBJbnB1dCgpIHNldCBzYXZlRGlzYWJsZWQoc2F2ZURpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2F2ZURpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHNhdmVEaXNhYmxlZCk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNTdGFydE1lc3NhZ2UgPSBmYWxzZTtcbiAgZ2V0IGhhc1N0YXJ0TWVzc2FnZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hhc1N0YXJ0TWVzc2FnZTsgfVxuICBASW5wdXQoKSBzZXQgaGFzU3RhcnRNZXNzYWdlKGhhc1N0YXJ0TWVzc2FnZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc1N0YXJ0TWVzc2FnZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoYXNTdGFydE1lc3NhZ2UpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzRW5kTWVzc2FnZSA9IGZhbHNlO1xuICBnZXQgaGFzRW5kTWVzc2FnZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hhc0VuZE1lc3NhZ2U7IH1cbiAgQElucHV0KCkgc2V0IGhhc0VuZE1lc3NhZ2UoaGFzRW5kTWVzc2FnZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc0VuZE1lc3NhZ2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGFzRW5kTWVzc2FnZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlVG9wVG9vbGJhciA9IGZhbHNlO1xuICBnZXQgaGlkZVRvcFRvb2xiYXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlVG9wVG9vbGJhcjsgfVxuICBASW5wdXQoKSBzZXQgaGlkZVRvcFRvb2xiYXIoaGlkZVRvcFRvb2xiYXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlVG9wVG9vbGJhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlVG9wVG9vbGJhcik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlQm90dG9tVG9vbGJhciA9IGZhbHNlO1xuICBnZXQgaGlkZUJvdHRvbXBUb29sYmFyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlkZUJvdHRvbVRvb2xiYXI7IH1cbiAgQElucHV0KCkgc2V0IGhpZGVCb3R0b21Ub29sYmFyKGhpZGVCb3R0b21Ub29sYmFyOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZUJvdHRvbVRvb2xiYXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZUJvdHRvbVRvb2xiYXIpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZU5hdmlnYXRpb25CdXR0b25zID0gZmFsc2U7XG4gIGdldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM7IH1cbiAgQElucHV0KCkgc2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyhoaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZU5hdmlnYXRpb25CdXR0b25zKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpeGVkT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgZ2V0IGZpeGVkT3JpZW50YXRpb24oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9maXhlZE9yaWVudGF0aW9uOyB9XG4gIEBJbnB1dCgpIHNldCBmaXhlZE9yaWVudGF0aW9uKGZpeGVkT3JpZW50YXRpb246IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXhlZE9yaWVudGF0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGZpeGVkT3JpZW50YXRpb24pO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVhZG9ubHkgPSBmYWxzZTtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVhZG9ubHk7IH1cbiAgQElucHV0KCkgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgZ2V0IG9yaWVudGF0aW9uKCk6IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiB7IHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjsgfVxuICBASW5wdXQoKSBzZXQgb3JpZW50YXRpb24ob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbikge1xuICAgIGlmIChvcmllbnRhdGlvbiAhPT0gJ2hvcml6b250YWwnICYmIG9yaWVudGF0aW9uICE9PSAndmVydGljYWwnKSB7IHJldHVybjsgfVxuICAgIGlmIChvcmllbnRhdGlvbiAhPT0gdGhpcy5fb3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmVtaXQodGhpcy5fb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2Zvcm1TbGlkZXInLCB7c3RhdGljOiBmYWxzZX0pIGZvcm1TbGlkZXI6IEFqZlBhZ2VTbGlkZXI7XG4gIEBWaWV3Q2hpbGRyZW4oQWpmRm9ybUZpZWxkKSBmaWVsZHM6IFF1ZXJ5TGlzdDxBamZGb3JtRmllbGQ+O1xuXG4gIHByaXZhdGUgX2Vycm9yTW92ZUV2ZW50OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLy8gX2Vycm9yUG9zaXRpb25zIGlzIGEgcHJpdmF0ZSBzdWJqZWN0IHN0cnVjdHVyZSB0aGF0IGNvbnRhaW5zIG5leHQgYW5kIHByZXZcbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnM6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuXG4gIC8vIF9mb3JtIGlzIGEgcHJpdmF0ZSBhakZGb3JtXG4gIHByaXZhdGUgX2Zvcm06IEFqZkZvcm07XG4gIC8vIF9pbml0IGlzIGEgcHJpdmF0ZSBib29sZWFuXG4gIHByaXZhdGUgX2luaXQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZXJyb3JNb3ZlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZm9ybUFjdGlvbjogRXZlbnRFbWl0dGVyPEFqZkZvcm1BY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1BY3Rpb25FdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGZvcm1BY3Rpb246IE9ic2VydmFibGU8QWpmRm9ybUFjdGlvbkV2ZW50PiA9IHRoaXMuX2Zvcm1BY3Rpb24uYXNPYnNlcnZhYmxlKCk7XG5cbiAgQElucHV0KCkgc2V0IGZvcm0oZm9ybTogQWpmRm9ybSkge1xuICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuXG4gICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyU2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIGNvbnN0cnVjdG9yIHdpbGwgaW5pdCBjdXJyZW50IGZvcm11bGEgYnkgYWpmQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3JlbmRlcmVyU2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLmZvcm1Hcm91cCA9IF9yZW5kZXJlclNlcnZpY2UuZm9ybUdyb3VwO1xuICAgIHRoaXMuc2xpZGVzID0gX3JlbmRlcmVyU2VydmljZS5ub2Rlc1RyZWU7XG4gICAgdGhpcy5fZXJyb3JQb3NpdGlvbnMgPSBfcmVuZGVyZXJTZXJ2aWNlLmVycm9yUG9zaXRpb25zO1xuICAgIHRoaXMuZXJyb3JzID0gX3JlbmRlcmVyU2VydmljZS5lcnJvcnM7XG4gICAgdGhpcy5zbGlkZXNOdW0gPSBfcmVuZGVyZXJTZXJ2aWNlLnNsaWRlc051bTtcbiAgICB0aGlzLmZvcm1Jc0luaXQgPSBfcmVuZGVyZXJTZXJ2aWNlLmZvcm1Jbml0RXZlbnQucGlwZShcbiAgICAgIG1hcChlID0+IGUgPT09IEFqZkZvcm1Jbml0U3RhdHVzLkNvbXBsZXRlKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzY3JvbGwgdG8gbmV4dCBlcnJvciByZWNlaXZlZCBieSBzdWJzY3JpYmVcbiAgICovXG4gIGdvVG9OZXh0RXJyb3IoKTogdm9pZCB7IHRoaXMuX2Vycm9yTW92ZUV2ZW50LmVtaXQodHJ1ZSk7IH1cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2Nyb2xsIHRvIHByZXYgZXJyb3IgcmVjZWl2ZWQgYnkgc3Vic2NyaWJlXG4gICAqL1xuICBnb1RvUHJldkVycm9yKCk6IHZvaWQgeyB0aGlzLl9lcnJvck1vdmVFdmVudC5lbWl0KGZhbHNlKTsgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGFkZCBncm91cFxuICAgKi9cbiAgYWRkR3JvdXAobm9kZUdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aGlzLl9yZW5kZXJlclNlcnZpY2UuYWRkR3JvdXAobm9kZUdyb3VwIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlKS5waXBlKFxuICAgICAgZGVsYXlXaGVuKCgpID0+IHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoKSxcbiAgICApLnN1YnNjcmliZShcbiAgICAgICAgKHIpID0+IHsgaWYgKHIgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHsgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtkaXI6ICdkb3duJ30pOyB9IH0sXG4gICAgICAgIChfZSkgPT4geyBpZiAocykgeyBzLnVuc3Vic2NyaWJlKCk7IH0gfSxcbiAgICAgICAgKCkgPT4geyBpZiAocykgeyBzLnVuc3Vic2NyaWJlKCk7IH0gfVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHJlbW92ZSBncm91cFxuICAgKi9cbiAgcmVtb3ZlR3JvdXAoXG4gICAgbm9kZUdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlXG4gICk6IHZvaWQge1xuICAgIGxldCBzID0gdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLnJlbW92ZUdyb3VwKG5vZGVHcm91cCBhcyBBamZOb2RlR3JvdXBJbnN0YW5jZSkucGlwZShcbiAgICAgIGRlbGF5V2hlbigoKSA9PiB0aGlzLmZvcm1TbGlkZXIucGFnZVNjcm9sbEZpbmlzaCksXG4gICAgKS5zdWJzY3JpYmUoXG4gICAgICAgIChyKSA9PiB7IGlmIChyICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7IHRoaXMuZm9ybVNsaWRlci5zbGlkZSh7ZGlyOiAndXAnfSk7IH0gfSxcbiAgICAgICAgKF9lKSA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9LFxuICAgICAgICAoKSA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9XG4gICAgICApO1xuICB9XG5cbiAgb25TYXZlKF9ldnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1BY3Rpb24uZW1pdCh7XG4gICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICBhY3Rpb246ICdzYXZlJyxcbiAgICAgIHZhbHVlOiB0aGlzLl9yZW5kZXJlclNlcnZpY2UuZ2V0Rm9ybVZhbHVlKClcbiAgICB9KTtcbiAgfVxuXG4gIG9uRm9ybUFjdGlvbihfZXZ0OiBhbnksIGFjdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5lbWl0KHtcbiAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgIHZhbHVlOiB0aGlzLl9yZW5kZXJlclNlcnZpY2UuZ2V0Rm9ybVZhbHVlKCksXG4gICAgICBhY3Rpb246IGFjdGlvblxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2V0IGN1cnJlbnQgZm9ybSBpbiByZWRlcmVyIHNlcnZpY2Ugd2hlbiBpbml0IGZvcm1cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZm9ybSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlclNlcnZpY2Uuc2V0Rm9ybSh0aGlzLl9mb3JtKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pbml0ICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcblxuICAgICAgdGhpcy5fZXJyb3JNb3ZlU3Vic2NyaXB0aW9uID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2Vycm9yTW92ZUV2ZW50KS5waXBlKFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9lcnJvclBvc2l0aW9ucylcbiAgICAgICkuc3Vic2NyaWJlKCh2OiBbYm9vbGVhbiwgbnVtYmVyW11dKSA9PiB7XG4gICAgICAgICAgY29uc3QgbW92ZSA9IHZbMF07XG4gICAgICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gdGhpcy5mb3JtU2xpZGVyLmN1cnJlbnRQYWdlIC0gKCt0aGlzLmhhc1N0YXJ0TWVzc2FnZSkgKyAxO1xuICAgICAgICAgIGNvbnN0IGVycm9ycyA9IHZbMV07XG4gICAgICAgICAgaWYgKGVycm9ycyA9PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHByZXZJZHggPSAtMTtcbiAgICAgICAgICBsZXQgbmV4dElkeCA9IC0xO1xuICAgICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICAgIGxldCBlcnJvcnNMZW4gPSBlcnJvcnMubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlICghZm91bmQgJiYgaWR4IDwgZXJyb3JzTGVuKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3JzW2lkeF0gPT0gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJldklkeCA9IGlkeCA+IDAgPyBpZHggLSAxIDogZXJyb3JzTGVuIC0gMTtcbiAgICAgICAgICAgICAgbmV4dElkeCA9IGlkeCA8IGVycm9yc0xlbiAtIDEgPyBpZHggKyAxIDogMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3JzW2lkeF0gPiBjdXJyZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBwcmV2SWR4ID0gaWR4ID4gMCA/IGlkeCAtIDEgOiBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICBuZXh0SWR4ID0gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIHByZXZJZHggPSBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgbmV4dElkeCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHt0bzogbW92ZSA/IGVycm9yc1tuZXh0SWR4XSAtIDEgOiBlcnJvcnNbcHJldklkeF0gLSAxfSk7XG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcblxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX25leHRTbGlkZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Vycm9yTW92ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbik6IHZvaWQge1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgfVxuXG4gIHRyYWNrTm9kZUJ5SWQoXzogbnVtYmVyLCBub2RlOiBBamZOb2RlSW5zdGFuY2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZSk7XG4gIH1cbn1cbiJdfQ==