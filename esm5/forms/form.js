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
var AjfFormActionEvent = /** @class */ (function () {
    function AjfFormActionEvent() {
    }
    return AjfFormActionEvent;
}());
export { AjfFormActionEvent };
var AjfFormRenderer = /** @class */ (function () {
    /**
     * this constructor will init current formula by ajfBuilderService
     */
    function AjfFormRenderer(_rendererService, _changeDetectorRef) {
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
        this.formIsInit = _rendererService.formInitEvent.pipe(map(function (e) { return e === AjfFormInitStatus.Complete; }));
    }
    Object.defineProperty(AjfFormRenderer.prototype, "saveDisabled", {
        get: function () { return this._saveDisabled; },
        set: function (saveDisabled) {
            this._saveDisabled = coerceBooleanProperty(saveDisabled);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hasStartMessage", {
        get: function () { return this._hasStartMessage; },
        set: function (hasStartMessage) {
            this._hasStartMessage = coerceBooleanProperty(hasStartMessage);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hasEndMessage", {
        get: function () { return this._hasEndMessage; },
        set: function (hasEndMessage) {
            this._hasEndMessage = coerceBooleanProperty(hasEndMessage);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hideTopToolbar", {
        get: function () { return this._hideTopToolbar; },
        set: function (hideTopToolbar) {
            this._hideTopToolbar = coerceBooleanProperty(hideTopToolbar);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hideBottompToolbar", {
        get: function () { return this._hideBottomToolbar; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hideBottomToolbar", {
        set: function (hideBottomToolbar) {
            this._hideBottomToolbar = coerceBooleanProperty(hideBottomToolbar);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hideNavigationButtons", {
        get: function () { return this._hideNavigationButtons; },
        set: function (hideNavigationButtons) {
            this._hideNavigationButtons = coerceBooleanProperty(hideNavigationButtons);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "fixedOrientation", {
        get: function () { return this._fixedOrientation; },
        set: function (fixedOrientation) {
            this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "readonly", {
        get: function () { return this._readonly; },
        set: function (readonly) {
            this._readonly = coerceBooleanProperty(readonly);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "orientation", {
        get: function () { return this._orientation; },
        set: function (orientation) {
            if (orientation !== 'horizontal' && orientation !== 'vertical') {
                return;
            }
            if (orientation !== this._orientation) {
                this._orientation = orientation;
                this._changeDetectorRef.markForCheck();
                this._orientationChange.emit(this._orientation);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "form", {
        set: function (form) {
            this._form = form;
            if (this._init) {
                this._rendererService.setForm(this._form);
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * this method will scroll to next error received by subscribe
     */
    AjfFormRenderer.prototype.goToNextError = function () { this._errorMoveEvent.emit(true); };
    /**
     * this method will scroll to prev error received by subscribe
     */
    AjfFormRenderer.prototype.goToPrevError = function () { this._errorMoveEvent.emit(false); };
    /**
     * this method will add group
     */
    AjfFormRenderer.prototype.addGroup = function (nodeGroup) {
        var _this = this;
        var s = this._rendererService.addGroup(nodeGroup).pipe(delayWhen(function () { return _this.formSlider.pageScrollFinish; })).subscribe(function (r) { if (r && _this.formSlider != null) {
            _this.formSlider.slide({ dir: 'down' });
        } }, function (_e) { if (s) {
            s.unsubscribe();
        } }, function () { if (s) {
            s.unsubscribe();
        } });
    };
    /**
     * this method will remove group
     */
    AjfFormRenderer.prototype.removeGroup = function (nodeGroup) {
        var _this = this;
        var s = this._rendererService.removeGroup(nodeGroup).pipe(delayWhen(function () { return _this.formSlider.pageScrollFinish; })).subscribe(function (r) { if (r && _this.formSlider != null) {
            _this.formSlider.slide({ dir: 'up' });
        } }, function (_e) { if (s) {
            s.unsubscribe();
        } }, function () { if (s) {
            s.unsubscribe();
        } });
    };
    AjfFormRenderer.prototype.onSave = function (_evt) {
        this._formAction.emit({
            source: this,
            action: 'save',
            value: this._rendererService.getFormValue()
        });
    };
    AjfFormRenderer.prototype.onFormAction = function (_evt, action) {
        this._formAction.emit({
            source: this,
            value: this._rendererService.getFormValue(),
            action: action
        });
    };
    /**
     * this method will set current form in rederer service when init form
     */
    AjfFormRenderer.prototype.ngAfterViewInit = function () {
        if (this._form != null) {
            this._rendererService.setForm(this._form);
            this._changeDetectorRef.detectChanges();
        }
    };
    AjfFormRenderer.prototype.ngAfterViewChecked = function () {
        var _this = this;
        if (!this._init && this.formSlider != null) {
            this._init = true;
            this._errorMoveSubscription = this._errorMoveEvent.pipe(withLatestFrom(this._errorPositions)).subscribe(function (v) {
                var move = v[0];
                var currentPosition = _this.formSlider.currentPage - (+_this.hasStartMessage) + 1;
                var errors = v[1];
                if (errors == null) {
                    return;
                }
                var found = false;
                var prevIdx = -1;
                var nextIdx = -1;
                var idx = 0;
                var errorsLen = errors.length;
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
                _this.formSlider.slide({ to: move ? errors[nextIdx] - 1 : errors[prevIdx] - 1 });
                _this._changeDetectorRef.detectChanges();
            });
        }
    };
    AjfFormRenderer.prototype.ngOnDestroy = function () {
        this._nextSlideSubscription.unsubscribe();
        this._errorMoveSubscription.unsubscribe();
        this._orientationChange.complete();
        this._errorMoveEvent.complete();
        this._formAction.complete();
    };
    AjfFormRenderer.prototype.orientationChangeHandler = function (orientation) {
        this.orientation = orientation;
    };
    AjfFormRenderer.prototype.trackNodeById = function (_, node) {
        return nodeInstanceCompleteName(node);
    };
    AjfFormRenderer.decorators = [
        { type: Directive }
    ];
    /** @nocollapse */
    AjfFormRenderer.ctorParameters = function () { return [
        { type: AjfFormRendererService },
        { type: ChangeDetectorRef }
    ]; };
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
    return AjfFormRenderer;
}());
export { AjfFormRenderer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBMkIsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQWtDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM3RSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNyQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUUxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFNM0QsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFFN0Y7SUFBQTtJQUlBLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFKRCxJQUlDOztBQUVEO0lBb0hFOztPQUVHO0lBQ0gseUJBQ1UsZ0JBQXdDLEVBQ3RDLGtCQUFxQztRQUR2QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUE5R2pELHVFQUF1RTtRQUN2RSxxQ0FBcUM7UUFDNUIsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFJOUIsdUJBQWtC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UEM7U0EzUHFCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIDIwMTggR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZQYWdlU2xpZGVyLCBBamZQYWdlU2xpZGVyT3JpZW50YXRpb259IGZyb20gJ0BhamYvY29yZS9wYWdlLXNsaWRlcic7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7QWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgQ2hhbmdlRGV0ZWN0b3JSZWYsIERpcmVjdGl2ZSwgRXZlbnRFbWl0dGVyLCBJbnB1dCxcbiAgT25EZXN0cm95LCBPdXRwdXQsIFF1ZXJ5TGlzdCwgVmlld0NoaWxkLCBWaWV3Q2hpbGRyZW59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVsYXlXaGVuLCBtYXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybUZpZWxkfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7QWpmRm9ybUluaXRTdGF0dXMsIEFqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5cbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3NsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuXG5leHBvcnQgY2xhc3MgQWpmRm9ybUFjdGlvbkV2ZW50IHtcbiAgc291cmNlOiBBamZGb3JtUmVuZGVyZXI7XG4gIHZhbHVlOiBPYmplY3Q7XG4gIGFjdGlvbjogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZGb3JtUmVuZGVyZXIgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvLyBmb3JtR3JvdXAgaXMgYW4gT2JzZXJ2YWJsZSBGb3JtR3JvdXAgdHlwZVxuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8Rm9ybUdyb3VwIHwgbnVsbD47XG5cbiAgLy8gIHNsaWRlcyBpcyBhbiBvYnNlcnZhYmxlIEFqZlNsaWRlIGFycmF5IHR5cGVcbiAgcmVhZG9ubHkgc2xpZGVzOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT47XG4gIHJlYWRvbmx5IHNsaWRlc051bTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICByZWFkb25seSBlcnJvcnM6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcmVhZG9ubHkgZm9ybUlzSW5pdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvLyBhamZGaWVsZFR5cGVzIFsgVGV4dCwgTnVtYmVyLCBCb29sZWFuLCBTaW5nbGVDaG9pY2UsIE11bHRpcGxlQ2hvaWNlLFxuICAvLyBGb3JtdWxhLCBFbXB0eSwgQ29tcG9zZWQsIExFTkdUSCBdXG4gIHJlYWRvbmx5IGFqZkZpZWxkVHlwZXMgPSBBamZGaWVsZFR5cGU7XG5cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZztcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj5cbiAgICA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgb3JpZW50YXRpb25DaGFuZ2U6IE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2F2ZURpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBzYXZlRGlzYWJsZWQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9zYXZlRGlzYWJsZWQ7IH1cbiAgQElucHV0KCkgc2V0IHNhdmVEaXNhYmxlZChzYXZlRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zYXZlRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoc2F2ZURpc2FibGVkKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc1N0YXJ0TWVzc2FnZSA9IGZhbHNlO1xuICBnZXQgaGFzU3RhcnRNZXNzYWdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGFzU3RhcnRNZXNzYWdlOyB9XG4gIEBJbnB1dCgpIHNldCBoYXNTdGFydE1lc3NhZ2UoaGFzU3RhcnRNZXNzYWdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzU3RhcnRNZXNzYWdlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhhc1N0YXJ0TWVzc2FnZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNFbmRNZXNzYWdlID0gZmFsc2U7XG4gIGdldCBoYXNFbmRNZXNzYWdlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGFzRW5kTWVzc2FnZTsgfVxuICBASW5wdXQoKSBzZXQgaGFzRW5kTWVzc2FnZShoYXNFbmRNZXNzYWdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzRW5kTWVzc2FnZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoYXNFbmRNZXNzYWdlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVUb3BUb29sYmFyID0gZmFsc2U7XG4gIGdldCBoaWRlVG9wVG9vbGJhcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hpZGVUb3BUb29sYmFyOyB9XG4gIEBJbnB1dCgpIHNldCBoaWRlVG9wVG9vbGJhcihoaWRlVG9wVG9vbGJhcjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVUb3BUb29sYmFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVUb3BUb29sYmFyKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVCb3R0b21Ub29sYmFyID0gZmFsc2U7XG4gIGdldCBoaWRlQm90dG9tcFRvb2xiYXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlQm90dG9tVG9vbGJhcjsgfVxuICBASW5wdXQoKSBzZXQgaGlkZUJvdHRvbVRvb2xiYXIoaGlkZUJvdHRvbVRvb2xiYXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlQm90dG9tVG9vbGJhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlQm90dG9tVG9vbGJhcik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBmYWxzZTtcbiAgZ2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9uczsgfVxuICBASW5wdXQoKSBzZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKGhpZGVOYXZpZ2F0aW9uQnV0dG9uczogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlTmF2aWdhdGlvbkJ1dHRvbnMpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZml4ZWRPcmllbnRhdGlvbiA9IGZhbHNlO1xuICBnZXQgZml4ZWRPcmllbnRhdGlvbigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2ZpeGVkT3JpZW50YXRpb247IH1cbiAgQElucHV0KCkgc2V0IGZpeGVkT3JpZW50YXRpb24oZml4ZWRPcmllbnRhdGlvbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpeGVkT3JpZW50YXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZml4ZWRPcmllbnRhdGlvbik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9yZWFkb25seTsgfVxuICBASW5wdXQoKSBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICBnZXQgb3JpZW50YXRpb24oKTogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uIHsgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uOyB9XG4gIEBJbnB1dCgpIHNldCBvcmllbnRhdGlvbihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uICE9PSAnaG9yaXpvbnRhbCcgJiYgb3JpZW50YXRpb24gIT09ICd2ZXJ0aWNhbCcpIHsgcmV0dXJuOyB9XG4gICAgaWYgKG9yaWVudGF0aW9uICE9PSB0aGlzLl9vcmllbnRhdGlvbikge1xuICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuZW1pdCh0aGlzLl9vcmllbnRhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgQFZpZXdDaGlsZCgnZm9ybVNsaWRlcicsIHtzdGF0aWM6IGZhbHNlfSkgZm9ybVNsaWRlcjogQWpmUGFnZVNsaWRlcjtcbiAgQFZpZXdDaGlsZHJlbihBamZGb3JtRmllbGQpIGZpZWxkczogUXVlcnlMaXN0PEFqZkZvcm1GaWVsZD47XG5cbiAgcHJpdmF0ZSBfZXJyb3JNb3ZlRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvLyBfZXJyb3JQb3NpdGlvbnMgaXMgYSBwcml2YXRlIHN1YmplY3Qgc3RydWN0dXJlIHRoYXQgY29udGFpbnMgbmV4dCBhbmQgcHJldlxuICBwcml2YXRlIF9lcnJvclBvc2l0aW9uczogT2JzZXJ2YWJsZTxudW1iZXJbXT47XG5cbiAgLy8gX2Zvcm0gaXMgYSBwcml2YXRlIGFqRkZvcm1cbiAgcHJpdmF0ZSBfZm9ybTogQWpmRm9ybTtcbiAgLy8gX2luaXQgaXMgYSBwcml2YXRlIGJvb2xlYW5cbiAgcHJpdmF0ZSBfaW5pdCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lcnJvck1vdmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9mb3JtQWN0aW9uOiBFdmVudEVtaXR0ZXI8QWpmRm9ybUFjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUFjdGlvbkV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZm9ybUFjdGlvbjogT2JzZXJ2YWJsZTxBamZGb3JtQWN0aW9uRXZlbnQ+ID0gdGhpcy5fZm9ybUFjdGlvbi5hc09ic2VydmFibGUoKTtcblxuICBASW5wdXQoKSBzZXQgZm9ybShmb3JtOiBBamZGb3JtKSB7XG4gICAgdGhpcy5fZm9ybSA9IGZvcm07XG5cbiAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLnNldEZvcm0odGhpcy5fZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgY29uc3RydWN0b3Igd2lsbCBpbml0IGN1cnJlbnQgZm9ybXVsYSBieSBhamZCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgcHJpdmF0ZSBfcmVuZGVyZXJTZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmXG4gICkge1xuICAgIHRoaXMuZm9ybUdyb3VwID0gX3JlbmRlcmVyU2VydmljZS5mb3JtR3JvdXA7XG4gICAgdGhpcy5zbGlkZXMgPSBfcmVuZGVyZXJTZXJ2aWNlLm5vZGVzVHJlZTtcbiAgICB0aGlzLl9lcnJvclBvc2l0aW9ucyA9IF9yZW5kZXJlclNlcnZpY2UuZXJyb3JQb3NpdGlvbnM7XG4gICAgdGhpcy5lcnJvcnMgPSBfcmVuZGVyZXJTZXJ2aWNlLmVycm9ycztcbiAgICB0aGlzLnNsaWRlc051bSA9IF9yZW5kZXJlclNlcnZpY2Uuc2xpZGVzTnVtO1xuICAgIHRoaXMuZm9ybUlzSW5pdCA9IF9yZW5kZXJlclNlcnZpY2UuZm9ybUluaXRFdmVudC5waXBlKFxuICAgICAgbWFwKGUgPT4gZSA9PT0gQWpmRm9ybUluaXRTdGF0dXMuQ29tcGxldGUpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNjcm9sbCB0byBuZXh0IGVycm9yIHJlY2VpdmVkIGJ5IHN1YnNjcmliZVxuICAgKi9cbiAgZ29Ub05leHRFcnJvcigpOiB2b2lkIHsgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuZW1pdCh0cnVlKTsgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzY3JvbGwgdG8gcHJldiBlcnJvciByZWNlaXZlZCBieSBzdWJzY3JpYmVcbiAgICovXG4gIGdvVG9QcmV2RXJyb3IoKTogdm9pZCB7IHRoaXMuX2Vycm9yTW92ZUV2ZW50LmVtaXQoZmFsc2UpOyB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgYWRkIGdyb3VwXG4gICAqL1xuICBhZGRHcm91cChub2RlR3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmU2xpZGVJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRoaXMuX3JlbmRlcmVyU2VydmljZS5hZGRHcm91cChub2RlR3JvdXAgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UpLnBpcGUoXG4gICAgICBkZWxheVdoZW4oKCkgPT4gdGhpcy5mb3JtU2xpZGVyLnBhZ2VTY3JvbGxGaW5pc2gpLFxuICAgICkuc3Vic2NyaWJlKFxuICAgICAgICAocikgPT4geyBpZiAociAmJiB0aGlzLmZvcm1TbGlkZXIgIT0gbnVsbCkgeyB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe2RpcjogJ2Rvd24nfSk7IH0gfSxcbiAgICAgICAgKF9lKSA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9LFxuICAgICAgICAoKSA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9XG4gICAgICApO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgcmVtb3ZlIGdyb3VwXG4gICAqL1xuICByZW1vdmVHcm91cChcbiAgICBub2RlR3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmU2xpZGVJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2VcbiAgKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aGlzLl9yZW5kZXJlclNlcnZpY2UucmVtb3ZlR3JvdXAobm9kZUdyb3VwIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlKS5waXBlKFxuICAgICAgZGVsYXlXaGVuKCgpID0+IHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoKSxcbiAgICApLnN1YnNjcmliZShcbiAgICAgICAgKHIpID0+IHsgaWYgKHIgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHsgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtkaXI6ICd1cCd9KTsgfSB9LFxuICAgICAgICAoX2UpID0+IHsgaWYgKHMpIHsgcy51bnN1YnNjcmliZSgpOyB9IH0sXG4gICAgICAgICgpID0+IHsgaWYgKHMpIHsgcy51bnN1YnNjcmliZSgpOyB9IH1cbiAgICAgICk7XG4gIH1cblxuICBvblNhdmUoX2V2dDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5lbWl0KHtcbiAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgIGFjdGlvbjogJ3NhdmUnLFxuICAgICAgdmFsdWU6IHRoaXMuX3JlbmRlcmVyU2VydmljZS5nZXRGb3JtVmFsdWUoKVxuICAgIH0pO1xuICB9XG5cbiAgb25Gb3JtQWN0aW9uKF9ldnQ6IGFueSwgYWN0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgdmFsdWU6IHRoaXMuX3JlbmRlcmVyU2VydmljZS5nZXRGb3JtVmFsdWUoKSxcbiAgICAgIGFjdGlvbjogYWN0aW9uXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzZXQgY3VycmVudCBmb3JtIGluIHJlZGVyZXIgc2VydmljZSB3aGVuIGluaXQgZm9ybVxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb3JtICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyU2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2luaXQgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuXG4gICAgICB0aGlzLl9lcnJvck1vdmVTdWJzY3JpcHRpb24gPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZXJyb3JNb3ZlRXZlbnQpLnBpcGUoXG4gICAgICAgIHdpdGhMYXRlc3RGcm9tKHRoaXMuX2Vycm9yUG9zaXRpb25zKVxuICAgICAgKS5zdWJzY3JpYmUoKHY6IFtib29sZWFuLCBudW1iZXJbXV0pID0+IHtcbiAgICAgICAgICBjb25zdCBtb3ZlID0gdlswXTtcbiAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmZvcm1TbGlkZXIuY3VycmVudFBhZ2UgLSAoK3RoaXMuaGFzU3RhcnRNZXNzYWdlKSArIDE7XG4gICAgICAgICAgY29uc3QgZXJyb3JzID0gdlsxXTtcbiAgICAgICAgICBpZiAoZXJyb3JzID09IG51bGwpIHsgcmV0dXJuOyB9XG5cbiAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgcHJldklkeCA9IC0xO1xuICAgICAgICAgIGxldCBuZXh0SWR4ID0gLTE7XG4gICAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgICAgbGV0IGVycm9yc0xlbiA9IGVycm9ycy5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKCFmb3VuZCAmJiBpZHggPCBlcnJvcnNMZW4pIHtcbiAgICAgICAgICAgIGlmIChlcnJvcnNbaWR4XSA9PSBjdXJyZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBwcmV2SWR4ID0gaWR4ID4gMCA/IGlkeCAtIDEgOiBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICBuZXh0SWR4ID0gaWR4IDwgZXJyb3JzTGVuIC0gMSA/IGlkeCArIDEgOiAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvcnNbaWR4XSA+IGN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgIHByZXZJZHggPSBpZHggPiAwID8gaWR4IC0gMSA6IGVycm9yc0xlbiAtIDE7XG4gICAgICAgICAgICAgIG5leHRJZHggPSBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgcHJldklkeCA9IGVycm9yc0xlbiAtIDE7XG4gICAgICAgICAgICBuZXh0SWR4ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe3RvOiBtb3ZlID8gZXJyb3JzW25leHRJZHhdIC0gMSA6IGVycm9yc1twcmV2SWR4XSAtIDF9KTtcbiAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuXG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fbmV4dFNsaWRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZXJyb3JNb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuY29tcGxldGUoKTtcbiAgICB0aGlzLl9lcnJvck1vdmVFdmVudC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Zvcm1BY3Rpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICB9XG5cbiAgdHJhY2tOb2RlQnlJZChfOiBudW1iZXIsIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlKTtcbiAgfVxufVxuIl19