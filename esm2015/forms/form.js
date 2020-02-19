/**
 * @fileoverview added by tsickle
 * Generated from: src/core/forms/form.ts
 * @suppress {checkTypes,constantProperty,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @license
 * Copyright (C) 2018 Gnucoop soc. coop.
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFzQkEsT0FBTyxFQUFDLGFBQWEsRUFBMkIsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQWtDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM3RSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNyQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUUxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFNM0QsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFFN0YsTUFBTSxPQUFPLGtCQUFrQjtDQUk5Qjs7O0lBSEMsb0NBQXdCOztJQUN4QixtQ0FBYzs7SUFDZCxvQ0FBZTs7Ozs7QUFJakIsTUFBTSxPQUFnQixlQUFlOzs7Ozs7SUFzSG5DLFlBQ1UsZ0JBQXdDLEVBQ3RDLGtCQUFxQztRQUR2QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7OztRQTVHeEMsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFJOUIsdUJBQWtCLEdBQ3RCLElB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QUUsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQUUsQ0FBQyxDQUFDOzs7UUFDdkMsR0FBRyxFQUFFLEdBQUcsSUFBSSxDQUFDLEVBQUU7WUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FBRSxDQUFDLENBQUMsRUFDdEM7SUFDTCxDQUFDOzs7Ozs7SUFLRCxXQUFXLENBQ1QsU0FBOEU7O1lBRTFFLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLG1CQUFBLFNBQVMsRUFBd0IsQ0FBQyxDQUFDLElBQUksQ0FDL0UsU0FBUzs7O1FBQUMsR0FBRyxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBQyxDQUNsRCxDQUFDLFNBQVM7Ozs7UUFDUCxDQUFDLENBQUMsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFBRSxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsQ0FBQyxDQUFDO1NBQUUsQ0FBQyxDQUFDOzs7O1FBQ3BGLENBQUMsRUFBRSxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsRUFBRTtZQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFLENBQUMsQ0FBQzs7O1FBQ3ZDLEdBQUcsRUFBRSxHQUFHLElBQUksQ0FBQyxFQUFFO1lBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQUUsQ0FBQyxDQUFDLEVBQ3RDO0lBQ0wsQ0FBQzs7Ozs7SUFFRCxNQUFNLENBQUMsSUFBUztRQUNkLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1lBQ3BCLE1BQU0sRUFBRSxJQUFJO1lBQ1osTUFBTSxFQUFFLE1BQU07WUFDZCxLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTtTQUM1QyxDQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUFFRCxZ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LDBDQUFnQzs7Ozs7SUFPaEMsNkNBQW1DOzs7OztJQU9uQyxpREFBdUM7Ozs7O0lBT3ZDLDRDQUFrQzs7Ozs7SUFPbEMsb0NBQTBCOzs7OztJQU8xQix1Q0FBOEQ7O0lBVzlELHFDQUFvRTs7SUFDcEUsaUNBQTREOzs7OztJQUU1RCwwQ0FBNkU7Ozs7O0lBRzdFLDBDQUE4Qzs7Ozs7SUFHOUMsZ0NBQXVCOzs7OztJQUV2QixnQ0FBc0I7Ozs7O0lBRXRCLGlEQUFrRTs7Ozs7SUFDbEUsaURBQWtFOzs7OztJQUVsRSxzQ0FBK0Y7O0lBQy9GLHFDQUFnRzs7Ozs7SUFjOUYsMkNBQWdEOzs7OztJQUNoRCw2Q0FBK0MiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZQYWdlU2xpZGVyLCBBamZQYWdlU2xpZGVyT3JpZW50YXRpb259IGZyb20gJ0BhamYvY29yZS9wYWdlLXNsaWRlcic7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCxcbiAgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVsYXlXaGVuLCBtYXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybUZpZWxkfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7QWpmRm9ybUluaXRTdGF0dXMsIEFqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5cbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3NsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuXG5leHBvcnQgY2xhc3MgQWpmRm9ybUFjdGlvbkV2ZW50IHtcbiAgc291cmNlOiBBamZGb3JtUmVuZGVyZXI7XG4gIHZhbHVlOiBPYmplY3Q7XG4gIGFjdGlvbjogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZGb3JtUmVuZGVyZXIgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvLyBmb3JtR3JvdXAgaXMgYW4gT2JzZXJ2YWJsZSBGb3JtR3JvdXAgdHlwZVxuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8Rm9ybUdyb3VwIHwgbnVsbD47XG5cbiAgLy8gIHNsaWRlcyBpcyBhbiBvYnNlcnZhYmxlIEFqZlNsaWRlIGFycmF5IHR5cGVcbiAgcmVhZG9ubHkgc2xpZGVzOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT47XG4gIHJlYWRvbmx5IHNsaWRlc051bTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICByZWFkb25seSBlcnJvcnM6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcmVhZG9ubHkgZm9ybUlzSW5pdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvLyBhamZGaWVsZFR5cGVzIFsgVGV4dCwgTnVtYmVyLCBCb29sZWFuLCBTaW5nbGVDaG9pY2UsIE11bHRpcGxlQ2hvaWNlLFxuICAvLyBGb3JtdWxhLCBFbXB0eSwgQ29tcG9zZWQsIExFTkdUSCBdXG4gIHJlYWRvbmx5IGFqZkZpZWxkVHlwZXMgPSBBamZGaWVsZFR5cGU7XG5cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3JpZW50YXRpb25DaGFuZ2U6IE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2F2ZURpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBzYXZlRGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zYXZlRGlzYWJsZWQ7IH1cbiAgQElucHV0KCkgc2V0IHNhdmVEaXNhYmxlZChzYXZlRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zYXZlRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoc2F2ZURpc2FibGVkKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc1N0YXJ0TWVzc2FnZSA9IGZhbHNlO1xuICBnZXQgaGFzU3RhcnRNZXNzYWdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGFzU3RhcnRNZXNzYWdlOyB9XG4gIEBJbnB1dCgpIHNldCBoYXNTdGFydE1lc3NhZ2UoaGFzU3RhcnRNZXNzYWdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzU3RhcnRNZXNzYWdlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhhc1N0YXJ0TWVzc2FnZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNFbmRNZXNzYWdlID0gZmFsc2U7XG4gIGdldCBoYXNFbmRNZXNzYWdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGFzRW5kTWVzc2FnZTsgfVxuICBASW5wdXQoKSBzZXQgaGFzRW5kTWVzc2FnZShoYXNFbmRNZXNzYWdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzRW5kTWVzc2FnZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoYXNFbmRNZXNzYWdlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVUb3BUb29sYmFyID0gZmFsc2U7XG4gIGdldCBoaWRlVG9wVG9vbGJhcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hpZGVUb3BUb29sYmFyOyB9XG4gIEBJbnB1dCgpIHNldCBoaWRlVG9wVG9vbGJhcihoaWRlVG9wVG9vbGJhcjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVUb3BUb29sYmFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVUb3BUb29sYmFyKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVCb3R0b21Ub29sYmFyID0gZmFsc2U7XG4gIGdldCBoaWRlQm90dG9tcFRvb2xiYXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlQm90dG9tVG9vbGJhcjsgfVxuICBASW5wdXQoKSBzZXQgaGlkZUJvdHRvbVRvb2xiYXIoaGlkZUJvdHRvbVRvb2xiYXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlQm90dG9tVG9vbGJhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlQm90dG9tVG9vbGJhcik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBmYWxzZTtcbiAgZ2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9uczsgfVxuICBASW5wdXQoKSBzZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKGhpZGVOYXZpZ2F0aW9uQnV0dG9uczogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlTmF2aWdhdGlvbkJ1dHRvbnMpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZml4ZWRPcmllbnRhdGlvbiA9IGZhbHNlO1xuICBnZXQgZml4ZWRPcmllbnRhdGlvbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZpeGVkT3JpZW50YXRpb247IH1cbiAgQElucHV0KCkgc2V0IGZpeGVkT3JpZW50YXRpb24oZml4ZWRPcmllbnRhdGlvbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpeGVkT3JpZW50YXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZml4ZWRPcmllbnRhdGlvbik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZWFkb25seTsgfVxuICBASW5wdXQoKSBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICBnZXQgb3JpZW50YXRpb24oKTogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uIHsgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uOyB9XG4gIEBJbnB1dCgpIHNldCBvcmllbnRhdGlvbihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uICE9PSAnaG9yaXpvbnRhbCcgJiYgb3JpZW50YXRpb24gIT09ICd2ZXJ0aWNhbCcpIHsgcmV0dXJuOyB9XG4gICAgaWYgKG9yaWVudGF0aW9uICE9PSB0aGlzLl9vcmllbnRhdGlvbikge1xuICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuZW1pdCh0aGlzLl9vcmllbnRhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgQFZpZXdDaGlsZCgnZm9ybVNsaWRlcicsIHtzdGF0aWM6IGZhbHNlfSkgZm9ybVNsaWRlcjogQWpmUGFnZVNsaWRlcjtcbiAgQFZpZXdDaGlsZHJlbihBamZGb3JtRmllbGQpIGZpZWxkczogUXVlcnlMaXN0PEFqZkZvcm1GaWVsZD47XG5cbiAgcHJpdmF0ZSBfZXJyb3JNb3ZlRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvLyBfZXJyb3JQb3NpdGlvbnMgaXMgYSBwcml2YXRlIHN1YmplY3Qgc3RydWN0dXJlIHRoYXQgY29udGFpbnMgbmV4dCBhbmQgcHJldlxuICBwcml2YXRlIF9lcnJvclBvc2l0aW9uczogT2JzZXJ2YWJsZTxudW1iZXJbXT47XG5cbiAgLy8gX2Zvcm0gaXMgYSBwcml2YXRlIGFqRkZvcm1cbiAgcHJpdmF0ZSBfZm9ybTogQWpmRm9ybTtcbiAgLy8gX2luaXQgaXMgYSBwcml2YXRlIGJvb2xlYW5cbiAgcHJpdmF0ZSBfaW5pdCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lcnJvck1vdmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9mb3JtQWN0aW9uOiBFdmVudEVtaXR0ZXI8QWpmRm9ybUFjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUFjdGlvbkV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZm9ybUFjdGlvbjogT2JzZXJ2YWJsZTxBamZGb3JtQWN0aW9uRXZlbnQ+ID0gdGhpcy5fZm9ybUFjdGlvbi5hc09ic2VydmFibGUoKTtcblxuICBASW5wdXQoKSBzZXQgZm9ybShmb3JtOiBBamZGb3JtKSB7XG4gICAgdGhpcy5fZm9ybSA9IGZvcm07XG5cbiAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLnNldEZvcm0odGhpcy5fZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgY29uc3RydWN0b3Igd2lsbCBpbml0IGN1cnJlbnQgZm9ybXVsYSBieSBhamZCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXJTZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMuZm9ybUdyb3VwID0gX3JlbmRlcmVyU2VydmljZS5mb3JtR3JvdXA7XG4gICAgdGhpcy5zbGlkZXMgPSBfcmVuZGVyZXJTZXJ2aWNlLm5vZGVzVHJlZTtcbiAgICB0aGlzLl9lcnJvclBvc2l0aW9ucyA9IF9yZW5kZXJlclNlcnZpY2UuZXJyb3JQb3NpdGlvbnM7XG4gICAgdGhpcy5lcnJvcnMgPSBfcmVuZGVyZXJTZXJ2aWNlLmVycm9ycztcbiAgICB0aGlzLnNsaWRlc051bSA9IF9yZW5kZXJlclNlcnZpY2Uuc2xpZGVzTnVtO1xuICAgIHRoaXMuZm9ybUlzSW5pdCA9IF9yZW5kZXJlclNlcnZpY2UuZm9ybUluaXRFdmVudC5waXBlKFxuICAgICAgbWFwKGUgPT4gZSA9PT0gQWpmRm9ybUluaXRTdGF0dXMuQ29tcGxldGUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNjcm9sbCB0byBuZXh0IGVycm9yIHJlY2VpdmVkIGJ5IHN1YnNjcmliZVxuICAgKi9cbiAgZ29Ub05leHRFcnJvcigpOiB2b2lkIHsgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuZW1pdCh0cnVlKTsgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzY3JvbGwgdG8gcHJldiBlcnJvciByZWNlaXZlZCBieSBzdWJzY3JpYmVcbiAgICovXG4gIGdvVG9QcmV2RXJyb3IoKTogdm9pZCB7IHRoaXMuX2Vycm9yTW92ZUV2ZW50LmVtaXQoZmFsc2UpOyB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgYWRkIGdyb3VwXG4gICAqL1xuICBhZGRHcm91cChub2RlR3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmU2xpZGVJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRoaXMuX3JlbmRlcmVyU2VydmljZS5hZGRHcm91cChub2RlR3JvdXAgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UpLnBpcGUoXG4gICAgICBkZWxheVdoZW4oKCkgPT4gdGhpcy5mb3JtU2xpZGVyLnBhZ2VTY3JvbGxGaW5pc2gpLFxuICAgICkuc3Vic2NyaWJlKFxuICAgICAgICAocikgPT4geyBpZiAociAmJiB0aGlzLmZvcm1TbGlkZXIgIT0gbnVsbCkgeyB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe2RpcjogJ2Rvd24nfSk7IH0gfSxcbiAgICAgICAgKF9lKSA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9LFxuICAgICAgICAoKSA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9XG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgcmVtb3ZlIGdyb3VwXG4gICAqL1xuICByZW1vdmVHcm91cChcbiAgICBub2RlR3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmU2xpZGVJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2VcbiAgKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aGlzLl9yZW5kZXJlclNlcnZpY2UucmVtb3ZlR3JvdXAobm9kZUdyb3VwIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlKS5waXBlKFxuICAgICAgZGVsYXlXaGVuKCgpID0+IHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoKSxcbiAgICApLnN1YnNjcmliZShcbiAgICAgICAgKHIpID0+IHsgaWYgKHIgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHsgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtkaXI6ICd1cCd9KTsgfSB9LFxuICAgICAgICAoX2UpID0+IHsgaWYgKHMpIHsgcy51bnN1YnNjcmliZSgpOyB9IH0sXG4gICAgICAgICgpID0+IHsgaWYgKHMpIHsgcy51bnN1YnNjcmliZSgpOyB9IH1cbiAgICAgICk7XG4gIH1cblxuICBvblNhdmUoX2V2dDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5lbWl0KHtcbiAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgIGFjdGlvbjogJ3NhdmUnLFxuICAgICAgdmFsdWU6IHRoaXMuX3JlbmRlcmVyU2VydmljZS5nZXRGb3JtVmFsdWUoKVxuICAgIH0pO1xuICB9XG5cbiAgb25Gb3JtQWN0aW9uKF9ldnQ6IGFueSwgYWN0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgdmFsdWU6IHRoaXMuX3JlbmRlcmVyU2VydmljZS5nZXRGb3JtVmFsdWUoKSxcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzZXQgY3VycmVudCBmb3JtIGluIHJlZGVyZXIgc2VydmljZSB3aGVuIGluaXQgZm9ybVxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb3JtICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyU2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2luaXQgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuXG4gICAgICB0aGlzLl9lcnJvck1vdmVTdWJzY3JpcHRpb24gPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZXJyb3JNb3ZlRXZlbnQpLnBpcGUoXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX2Vycm9yUG9zaXRpb25zKVxuICAgICAgKS5zdWJzY3JpYmUoKHY6IFtib29sZWFuLCBudW1iZXJbXV0pID0+IHtcbiAgICAgICAgICBjb25zdCBtb3ZlID0gdlswXTtcbiAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmZvcm1TbGlkZXIuY3VycmVudFBhZ2UgLSAoK3RoaXMuaGFzU3RhcnRNZXNzYWdlKSArIDE7XG4gICAgICAgICAgY29uc3QgZXJyb3JzID0gdlsxXTtcbiAgICAgICAgICBpZiAoZXJyb3JzID09IG51bGwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgcHJldklkeCA9IC0xO1xuICAgICAgICAgIGxldCBuZXh0SWR4ID0gLTE7XG4gICAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgICAgbGV0IGVycm9yc0xlbiA9IGVycm9ycy5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKCFmb3VuZCAmJiBpZHggPCBlcnJvcnNMZW4pIHtcbiAgICAgICAgICAgIGlmIChlcnJvcnNbaWR4XSA9PSBjdXJyZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBwcmV2SWR4ID0gaWR4ID4gMCA/IGlkeCAtIDEgOiBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICBuZXh0SWR4ID0gaWR4IDwgZXJyb3JzTGVuIC0gMSA/IGlkeCArIDEgOiAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvcnNbaWR4XSA+IGN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgIHByZXZJZHggPSBpZHggPiAwID8gaWR4IC0gMSA6IGVycm9yc0xlbiAtIDE7XG4gICAgICAgICAgICAgIG5leHRJZHggPSBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgcHJldklkeCA9IGVycm9yc0xlbiAtIDE7XG4gICAgICAgICAgICBuZXh0SWR4ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe3RvOiBtb3ZlID8gZXJyb3JzW25leHRJZHhdIC0gMSA6IGVycm9yc1twcmV2SWR4XSAtIDF9KTtcbiAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fbmV4dFNsaWRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZXJyb3JNb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuY29tcGxldGUoKTtcbiAgICB0aGlzLl9lcnJvck1vdmVFdmVudC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Zvcm1BY3Rpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICB9XG5cbiAgdHJhY2tOb2RlQnlJZChfOiBudW1iZXIsIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlKTtcbiAgfVxufVxuIl19