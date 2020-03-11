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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBMkIsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBQWtDLGlCQUFpQixFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUM3RSxNQUFNLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFFOUUsT0FBTyxFQUFDLFVBQVUsRUFBRSxZQUFZLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDOUMsT0FBTyxFQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUUsY0FBYyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFOUQsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLFNBQVMsQ0FBQztBQUNyQyxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUUxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFNM0QsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFFN0Y7SUFBQTtJQUlBLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFKRCxJQUlDOztBQUVEO0lBb0hFOztPQUVHO0lBQ0gseUJBQ1UsZ0JBQXdDLEVBQ3RDLGtCQUFxQztRQUR2QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUE5R2pELHVFQUF1RTtRQUN2RSxxQ0FBcUM7UUFDNUIsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFJOUIsdUJBQWtCLEdBQ3RCLElBQUksWUFBWSxFQUE0QixDQUFDO1FBQzlCLHNCQUFpQixHQUNsQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFFakMsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFPL0IscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBT3pCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBT3ZCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBT3hCLHVCQUFrQixHQUFHLEtBQUssQ0FBQztRQU8zQiwyQkFBc0IsR0FBRyxLQUFLLENBQUM7UUFPL0Isc0JBQWlCLEdBQUcsS0FBSyxDQUFDO1FBTzFCLGNBQVMsR0FBRyxLQUFLLENBQUM7UUFPbEIsaUJBQVksR0FBNkIsWUFBWSxDQUFDO1FBY3RELG9CQUFlLEdBQTBCLElBQUksWUFBWSxFQUFXLENBQUM7UUFPN0UsNkJBQTZCO1FBQ3JCLFVBQUssR0FBRyxLQUFLLENBQUM7UUFFZCwyQkFBc0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUMxRCwyQkFBc0IsR0FBaUIsWUFBWSxDQUFDLEtBQUssQ0FBQztRQUUxRCxnQkFBVyxHQUFxQyxJQUFJLFlBQVksRUFBc0IsQ0FBQztRQUM1RSxlQUFVLEdBQW1DLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxFQUFFLENBQUM7UUFpQjlGLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1FBQzVDLElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1FBQ3pDLElBQUksQ0FBQyxlQUFlLEdBQUcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDO1FBQ3ZELElBQUksQ0FBQyxNQUFNLEdBQUcsZ0JBQWdCLENBQUMsTUFBTSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxTQUFTLEdBQUcsZ0JBQWdCLENBQUMsU0FBUyxDQUFDO1FBQzVDLElBQUksQ0FBQyxVQUFVLEdBQUcsZ0JBQWdCLENBQUMsYUFBYSxDQUFDLElBQUksQ0FDbkQsR0FBRyxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxLQUFLLGlCQUFpQixDQUFDLFFBQVEsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUMzQyxDQUFDO0lBQ0osQ0FBQztJQTVHRCxzQkFBSSx5Q0FBWTthQUFoQixjQUE4QixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDO2FBQzFELFVBQTBCLFlBQXFCO1lBQzdDLElBQUksQ0FBQyxhQUFhLEdBQUcscUJBQXFCLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDekQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLENBQUM7OztPQUp5RDtJQU8xRCxzQkFBSSw0Q0FBZTthQUFuQixjQUFpQyxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDLENBQUM7YUFDaEUsVUFBNkIsZUFBd0I7WUFDbkQsSUFBSSxDQUFDLGdCQUFnQixHQUFHLHFCQUFxQixDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQy9ELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FKK0Q7SUFPaEUsc0JBQUksMENBQWE7YUFBakIsY0FBK0IsT0FBTyxJQUFJLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQzthQUM1RCxVQUEyQixhQUFzQjtZQUMvQyxJQUFJLENBQUMsY0FBYyxHQUFHLHFCQUFxQixDQUFDLGFBQWEsQ0FBQyxDQUFDO1lBQzNELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FKMkQ7SUFPNUQsc0JBQUksMkNBQWM7YUFBbEIsY0FBZ0MsT0FBTyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsQ0FBQzthQUM5RCxVQUE0QixjQUF1QjtZQUNqRCxJQUFJLENBQUMsZUFBZSxHQUFHLHFCQUFxQixDQUFDLGNBQWMsQ0FBQyxDQUFDO1lBQzdELElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FKNkQ7SUFPOUQsc0JBQUksK0NBQWtCO2FBQXRCLGNBQW9DLE9BQU8sSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsQ0FBQzs7O09BQUE7SUFDckUsc0JBQWEsOENBQWlCO2FBQTlCLFVBQStCLGlCQUEwQjtZQUN2RCxJQUFJLENBQUMsa0JBQWtCLEdBQUcscUJBQXFCLENBQUMsaUJBQWlCLENBQUMsQ0FBQztZQUNuRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMsQ0FBQzs7O09BQUE7SUFHRCxzQkFBSSxrREFBcUI7YUFBekIsY0FBdUMsT0FBTyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxDQUFDO2FBQzVFLFVBQW1DLHFCQUE4QjtZQUMvRCxJQUFJLENBQUMsc0JBQXNCLEdBQUcscUJBQXFCLENBQUMscUJBQXFCLENBQUMsQ0FBQztZQUMzRSxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7UUFDekMsQ0FBQzs7O09BSjJFO0lBTzVFLHNCQUFJLDZDQUFnQjthQUFwQixjQUFrQyxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDLENBQUM7YUFDbEUsVUFBOEIsZ0JBQXlCO1lBQ3JELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxxQkFBcUIsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO1lBQ2pFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxZQUFZLEVBQUUsQ0FBQztRQUN6QyxDQUFDOzs7T0FKaUU7SUFPbEUsc0JBQUkscUNBQVE7YUFBWixjQUEwQixPQUFPLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDO2FBQ2xELFVBQXNCLFFBQWlCO1lBQ3JDLElBQUksQ0FBQyxTQUFTLEdBQUcscUJBQXFCLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDakQsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFlBQVksRUFBRSxDQUFDO1FBQ3pDLENBQUM7OztPQUppRDtJQU9sRCxzQkFBSSx3Q0FBVzthQUFmLGNBQThDLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7YUFDekUsVUFBeUIsV0FBcUM7WUFDNUQsSUFBSSxXQUFXLEtBQUssWUFBWSxJQUFJLFdBQVcsS0FBSyxVQUFVLEVBQUU7Z0JBQUUsT0FBTzthQUFFO1lBQzNFLElBQUksV0FBVyxLQUFLLElBQUksQ0FBQyxZQUFZLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxZQUFZLEdBQUcsV0FBVyxDQUFDO2dCQUNoQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsWUFBWSxFQUFFLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDO2FBQ2pEO1FBQ0gsQ0FBQzs7O09BUndFO0lBNkJ6RSxzQkFBYSxpQ0FBSTthQUFqQixVQUFrQixJQUFhO1lBQzdCLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDO1lBRWxCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDZCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQzthQUMzQztRQUNILENBQUM7OztPQUFBO0lBbUJEOztPQUVHO0lBQ0gsdUNBQWEsR0FBYixjQUF3QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7SUFDMUQ7O09BRUc7SUFDSCx1Q0FBYSxHQUFiLGNBQXdCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztJQUUzRDs7T0FFRztJQUNILGtDQUFRLEdBQVIsVUFBUyxTQUE4RTtRQUF2RixpQkFRQztRQVBDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsU0FBaUMsQ0FBQyxDQUFDLElBQUksQ0FDNUUsU0FBUyxDQUFDLGNBQU0sT0FBQSxLQUFJLENBQUMsVUFBVSxDQUFDLGdCQUFnQixFQUFoQyxDQUFnQyxDQUFDLENBQ2xELENBQUMsU0FBUyxDQUNQLFVBQUMsQ0FBQyxJQUFPLElBQUksQ0FBQyxJQUFJLEtBQUksQ0FBQyxVQUFVLElBQUksSUFBSSxFQUFFO1lBQUUsS0FBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBQyxHQUFHLEVBQUUsTUFBTSxFQUFDLENBQUMsQ0FBQztTQUFFLENBQUMsQ0FBQyxFQUN0RixVQUFDLEVBQUUsSUFBTyxJQUFJLENBQUMsRUFBRTtZQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFLENBQUMsQ0FBQyxFQUN2QyxjQUFRLElBQUksQ0FBQyxFQUFFO1lBQUUsQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO1NBQUUsQ0FBQyxDQUFDLENBQ3RDLENBQUM7SUFDTixDQUFDO0lBRUQ7O09BRUc7SUFDSCxxQ0FBVyxHQUFYLFVBQ0UsU0FBOEU7UUFEaEYsaUJBVUM7UUFQQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsV0FBVyxDQUFDLFNBQWlDLENBQUMsQ0FBQyxJQUFJLENBQy9FLFNBQVMsQ0FBQyxjQUFNLE9BQUEsS0FBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBaEMsQ0FBZ0MsQ0FBQyxDQUNsRCxDQUFDLFNBQVMsQ0FDUCxVQUFDLENBQUMsSUFBTyxJQUFJLENBQUMsSUFBSSxLQUFJLENBQUMsVUFBVSxJQUFJLElBQUksRUFBRTtZQUFFLEtBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBQyxDQUFDLENBQUM7U0FBRSxDQUFDLENBQUMsRUFDcEYsVUFBQyxFQUFFLElBQU8sSUFBSSxDQUFDLEVBQUU7WUFBRSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7U0FBRSxDQUFDLENBQUMsRUFDdkMsY0FBUSxJQUFJLENBQUMsRUFBRTtZQUFFLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztTQUFFLENBQUMsQ0FBQyxDQUN0QyxDQUFDO0lBQ04sQ0FBQztJQUVELGdDQUFNLEdBQU4sVUFBTyxJQUFTO1FBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsTUFBTSxFQUFFLElBQUk7WUFDWixNQUFNLEVBQUUsTUFBTTtZQUNkLEtBQUssRUFBRSxJQUFJLENBQUMsZ0JBQWdCLENBQUMsWUFBWSxFQUFFO1NBQzVDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRCxzQ0FBWSxHQUFaLFVBQWEsSUFBUyxFQUFFLE1BQWM7UUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7WUFDcEIsTUFBTSxFQUFFLElBQUk7WUFDWixLQUFLLEVBQUUsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFlBQVksRUFBRTtZQUMzQyxNQUFNLEVBQUUsTUFBTTtTQUNmLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7T0FFRztJQUNILHlDQUFlLEdBQWY7UUFDRSxJQUFJLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxFQUFFO1lBQ3RCLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQzFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxhQUFhLEVBQUUsQ0FBQztTQUN6QztJQUNILENBQUM7SUFFRCw0Q0FBa0IsR0FBbEI7UUFBQSxpQkF1Q0M7UUF0Q0MsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLFVBQVUsSUFBSSxJQUFJLEVBQUU7WUFDMUMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUM7WUFFbEIsSUFBSSxDQUFDLHNCQUFzQixHQUF5QixJQUFJLENBQUMsZUFBZ0IsQ0FBQyxJQUFJLENBQzVFLGNBQWMsQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQ3JDLENBQUMsU0FBUyxDQUFDLFVBQUMsQ0FBc0I7Z0JBQy9CLElBQU0sSUFBSSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEIsSUFBTSxlQUFlLEdBQUcsS0FBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLEdBQUcsQ0FBQyxDQUFDLEtBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2xGLElBQU0sTUFBTSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDcEIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO29CQUFFLE9BQU87aUJBQUU7Z0JBRS9CLElBQUksS0FBSyxHQUFHLEtBQUssQ0FBQztnQkFDbEIsSUFBSSxPQUFPLEdBQUcsQ0FBQyxDQUFDLENBQUM7Z0JBQ2pCLElBQUksT0FBTyxHQUFHLENBQUMsQ0FBQyxDQUFDO2dCQUNqQixJQUFJLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ1osSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQztnQkFDOUIsT0FBTyxDQUFDLEtBQUssSUFBSSxHQUFHLEdBQUcsU0FBUyxFQUFFO29CQUNoQyxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxlQUFlLEVBQUU7d0JBQ2xDLEtBQUssR0FBRyxJQUFJLENBQUM7d0JBQ2IsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7d0JBQzVDLE9BQU8sR0FBRyxHQUFHLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3FCQUM3Qzt5QkFBTSxJQUFJLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxlQUFlLEVBQUU7d0JBQ3hDLEtBQUssR0FBRyxJQUFJLENBQUM7d0JBQ2IsT0FBTyxHQUFHLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLFNBQVMsR0FBRyxDQUFDLENBQUM7d0JBQzVDLE9BQU8sR0FBRyxHQUFHLENBQUM7cUJBQ2Y7b0JBQ0QsR0FBRyxFQUFFLENBQUM7aUJBQ1A7Z0JBQ0QsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixPQUFPLEdBQUcsU0FBUyxHQUFHLENBQUMsQ0FBQztvQkFDeEIsT0FBTyxHQUFHLENBQUMsQ0FBQztpQkFDYjtnQkFFRCxLQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxFQUFDLEVBQUUsRUFBRSxJQUFJLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO2dCQUM5RSxLQUFJLENBQUMsa0JBQWtCLENBQUMsYUFBYSxFQUFFLENBQUM7WUFDMUMsQ0FBQyxDQUFDLENBQUM7U0FFTjtJQUNILENBQUM7SUFFRCxxQ0FBVyxHQUFYO1FBQ0UsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUMxQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsUUFBUSxFQUFFLENBQUM7UUFDbkMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNoQyxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQzlCLENBQUM7SUFFRCxrREFBd0IsR0FBeEIsVUFBeUIsV0FBcUM7UUFDNUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUVELHVDQUFhLEdBQWIsVUFBYyxDQUFTLEVBQUUsSUFBcUI7UUFDNUMsT0FBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDOztnQkEzUEYsU0FBUzs7OztnQkFoQmlCLHNCQUFzQjtnQkFQUixpQkFBaUI7Ozt3QkFzQ3ZELEtBQUs7b0NBSUwsTUFBTTsrQkFLTixLQUFLO2tDQU9MLEtBQUs7Z0NBT0wsS0FBSztpQ0FPTCxLQUFLO29DQU9MLEtBQUs7d0NBT0wsS0FBSzttQ0FPTCxLQUFLOzJCQU9MLEtBQUs7OEJBT0wsS0FBSzs2QkFTTCxTQUFTLFNBQUMsWUFBWSxFQUFFLEVBQUMsTUFBTSxFQUFFLEtBQUssRUFBQzt5QkFDdkMsWUFBWSxTQUFDLFlBQVk7NkJBZ0J6QixNQUFNO3VCQUVOLEtBQUs7O0lBZ0pSLHNCQUFDO0NBQUEsQUE1UEQsSUE0UEM7U0EzUHFCLGVBQWUiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlciwgQWpmUGFnZVNsaWRlck9yaWVudGF0aW9ufSBmcm9tICdAYWpmL2NvcmUvcGFnZS1zbGlkZXInO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge0FmdGVyVmlld0NoZWNrZWQsIEFmdGVyVmlld0luaXQsIENoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEV2ZW50RW1pdHRlciwgSW5wdXQsXG4gIE9uRGVzdHJveSwgT3V0cHV0LCBRdWVyeUxpc3QsIFZpZXdDaGlsZCwgVmlld0NoaWxkcmVufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlbGF5V2hlbiwgbWFwLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1GaWVsZH0gZnJvbSAnLi9maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1Jbml0U3RhdHVzLCBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuXG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcblxuZXhwb3J0IGNsYXNzIEFqZkZvcm1BY3Rpb25FdmVudCB7XG4gIHNvdXJjZTogQWpmRm9ybVJlbmRlcmVyO1xuICB2YWx1ZTogT2JqZWN0O1xuICBhY3Rpb246IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRm9ybVJlbmRlcmVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLy8gZm9ybUdyb3VwIGlzIGFuIE9ic2VydmFibGUgRm9ybUdyb3VwIHR5cGVcbiAgcmVhZG9ubHkgZm9ybUdyb3VwOiBPYnNlcnZhYmxlPEZvcm1Hcm91cCB8IG51bGw+O1xuXG4gIC8vICBzbGlkZXMgaXMgYW4gb2JzZXJ2YWJsZSBBamZTbGlkZSBhcnJheSB0eXBlXG4gIHJlYWRvbmx5IHNsaWRlczogT2JzZXJ2YWJsZTxBamZTbGlkZUluc3RhbmNlW10+O1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcmVhZG9ubHkgZXJyb3JzOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHJlYWRvbmx5IGZvcm1Jc0luaXQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLy8gYWpmRmllbGRUeXBlcyBbIFRleHQsIE51bWJlciwgQm9vbGVhbiwgU2luZ2xlQ2hvaWNlLCBNdWx0aXBsZUNob2ljZSxcbiAgLy8gRm9ybXVsYSwgRW1wdHksIENvbXBvc2VkLCBMRU5HVEggXVxuICByZWFkb25seSBhamZGaWVsZFR5cGVzID0gQWpmRmllbGRUeXBlO1xuXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+XG4gICAgPSBuZXcgRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IG9yaWVudGF0aW9uQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPVxuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIHByaXZhdGUgX3NhdmVEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgc2F2ZURpc2FibGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fc2F2ZURpc2FibGVkOyB9XG4gIEBJbnB1dCgpIHNldCBzYXZlRGlzYWJsZWQoc2F2ZURpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2F2ZURpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHNhdmVEaXNhYmxlZCk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNTdGFydE1lc3NhZ2UgPSBmYWxzZTtcbiAgZ2V0IGhhc1N0YXJ0TWVzc2FnZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hhc1N0YXJ0TWVzc2FnZTsgfVxuICBASW5wdXQoKSBzZXQgaGFzU3RhcnRNZXNzYWdlKGhhc1N0YXJ0TWVzc2FnZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc1N0YXJ0TWVzc2FnZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoYXNTdGFydE1lc3NhZ2UpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzRW5kTWVzc2FnZSA9IGZhbHNlO1xuICBnZXQgaGFzRW5kTWVzc2FnZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuX2hhc0VuZE1lc3NhZ2U7IH1cbiAgQElucHV0KCkgc2V0IGhhc0VuZE1lc3NhZ2UoaGFzRW5kTWVzc2FnZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc0VuZE1lc3NhZ2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGFzRW5kTWVzc2FnZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlVG9wVG9vbGJhciA9IGZhbHNlO1xuICBnZXQgaGlkZVRvcFRvb2xiYXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlVG9wVG9vbGJhcjsgfVxuICBASW5wdXQoKSBzZXQgaGlkZVRvcFRvb2xiYXIoaGlkZVRvcFRvb2xiYXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlVG9wVG9vbGJhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlVG9wVG9vbGJhcik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlQm90dG9tVG9vbGJhciA9IGZhbHNlO1xuICBnZXQgaGlkZUJvdHRvbXBUb29sYmFyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5faGlkZUJvdHRvbVRvb2xiYXI7IH1cbiAgQElucHV0KCkgc2V0IGhpZGVCb3R0b21Ub29sYmFyKGhpZGVCb3R0b21Ub29sYmFyOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZUJvdHRvbVRvb2xiYXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZUJvdHRvbVRvb2xiYXIpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZU5hdmlnYXRpb25CdXR0b25zID0gZmFsc2U7XG4gIGdldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM7IH1cbiAgQElucHV0KCkgc2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyhoaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZU5hdmlnYXRpb25CdXR0b25zKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpeGVkT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgZ2V0IGZpeGVkT3JpZW50YXRpb24oKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLl9maXhlZE9yaWVudGF0aW9uOyB9XG4gIEBJbnB1dCgpIHNldCBmaXhlZE9yaWVudGF0aW9uKGZpeGVkT3JpZW50YXRpb246IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXhlZE9yaWVudGF0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGZpeGVkT3JpZW50YXRpb24pO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVhZG9ubHkgPSBmYWxzZTtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5fcmVhZG9ubHk7IH1cbiAgQElucHV0KCkgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgZ2V0IG9yaWVudGF0aW9uKCk6IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiB7IHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjsgfVxuICBASW5wdXQoKSBzZXQgb3JpZW50YXRpb24ob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbikge1xuICAgIGlmIChvcmllbnRhdGlvbiAhPT0gJ2hvcml6b250YWwnICYmIG9yaWVudGF0aW9uICE9PSAndmVydGljYWwnKSB7IHJldHVybjsgfVxuICAgIGlmIChvcmllbnRhdGlvbiAhPT0gdGhpcy5fb3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmVtaXQodGhpcy5fb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2Zvcm1TbGlkZXInLCB7c3RhdGljOiBmYWxzZX0pIGZvcm1TbGlkZXI6IEFqZlBhZ2VTbGlkZXI7XG4gIEBWaWV3Q2hpbGRyZW4oQWpmRm9ybUZpZWxkKSBmaWVsZHM6IFF1ZXJ5TGlzdDxBamZGb3JtRmllbGQ+O1xuXG4gIHByaXZhdGUgX2Vycm9yTW92ZUV2ZW50OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLy8gX2Vycm9yUG9zaXRpb25zIGlzIGEgcHJpdmF0ZSBzdWJqZWN0IHN0cnVjdHVyZSB0aGF0IGNvbnRhaW5zIG5leHQgYW5kIHByZXZcbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnM6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuXG4gIC8vIF9mb3JtIGlzIGEgcHJpdmF0ZSBhakZGb3JtXG4gIHByaXZhdGUgX2Zvcm06IEFqZkZvcm07XG4gIC8vIF9pbml0IGlzIGEgcHJpdmF0ZSBib29sZWFuXG4gIHByaXZhdGUgX2luaXQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZXJyb3JNb3ZlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZm9ybUFjdGlvbjogRXZlbnRFbWl0dGVyPEFqZkZvcm1BY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1BY3Rpb25FdmVudD4oKTtcbiAgQE91dHB1dCgpIHJlYWRvbmx5IGZvcm1BY3Rpb246IE9ic2VydmFibGU8QWpmRm9ybUFjdGlvbkV2ZW50PiA9IHRoaXMuX2Zvcm1BY3Rpb24uYXNPYnNlcnZhYmxlKCk7XG5cbiAgQElucHV0KCkgc2V0IGZvcm0oZm9ybTogQWpmRm9ybSkge1xuICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuXG4gICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyU2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIGNvbnN0cnVjdG9yIHdpbGwgaW5pdCBjdXJyZW50IGZvcm11bGEgYnkgYWpmQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3JlbmRlcmVyU2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZlxuICApIHtcbiAgICB0aGlzLmZvcm1Hcm91cCA9IF9yZW5kZXJlclNlcnZpY2UuZm9ybUdyb3VwO1xuICAgIHRoaXMuc2xpZGVzID0gX3JlbmRlcmVyU2VydmljZS5ub2Rlc1RyZWU7XG4gICAgdGhpcy5fZXJyb3JQb3NpdGlvbnMgPSBfcmVuZGVyZXJTZXJ2aWNlLmVycm9yUG9zaXRpb25zO1xuICAgIHRoaXMuZXJyb3JzID0gX3JlbmRlcmVyU2VydmljZS5lcnJvcnM7XG4gICAgdGhpcy5zbGlkZXNOdW0gPSBfcmVuZGVyZXJTZXJ2aWNlLnNsaWRlc051bTtcbiAgICB0aGlzLmZvcm1Jc0luaXQgPSBfcmVuZGVyZXJTZXJ2aWNlLmZvcm1Jbml0RXZlbnQucGlwZShcbiAgICAgIG1hcChlID0+IGUgPT09IEFqZkZvcm1Jbml0U3RhdHVzLkNvbXBsZXRlKVxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzY3JvbGwgdG8gbmV4dCBlcnJvciByZWNlaXZlZCBieSBzdWJzY3JpYmVcbiAgICovXG4gIGdvVG9OZXh0RXJyb3IoKTogdm9pZCB7IHRoaXMuX2Vycm9yTW92ZUV2ZW50LmVtaXQodHJ1ZSk7IH1cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2Nyb2xsIHRvIHByZXYgZXJyb3IgcmVjZWl2ZWQgYnkgc3Vic2NyaWJlXG4gICAqL1xuICBnb1RvUHJldkVycm9yKCk6IHZvaWQgeyB0aGlzLl9lcnJvck1vdmVFdmVudC5lbWl0KGZhbHNlKTsgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGFkZCBncm91cFxuICAgKi9cbiAgYWRkR3JvdXAobm9kZUdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aGlzLl9yZW5kZXJlclNlcnZpY2UuYWRkR3JvdXAobm9kZUdyb3VwIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlKS5waXBlKFxuICAgICAgZGVsYXlXaGVuKCgpID0+IHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoKSxcbiAgICApLnN1YnNjcmliZShcbiAgICAgICAgKHIpID0+IHsgaWYgKHIgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHsgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtkaXI6ICdkb3duJ30pOyB9IH0sXG4gICAgICAgIChfZSkgPT4geyBpZiAocykgeyBzLnVuc3Vic2NyaWJlKCk7IH0gfSxcbiAgICAgICAgKCkgPT4geyBpZiAocykgeyBzLnVuc3Vic2NyaWJlKCk7IH0gfVxuICAgICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHJlbW92ZSBncm91cFxuICAgKi9cbiAgcmVtb3ZlR3JvdXAoXG4gICAgbm9kZUdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlXG4gICk6IHZvaWQge1xuICAgIGxldCBzID0gdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLnJlbW92ZUdyb3VwKG5vZGVHcm91cCBhcyBBamZOb2RlR3JvdXBJbnN0YW5jZSkucGlwZShcbiAgICAgIGRlbGF5V2hlbigoKSA9PiB0aGlzLmZvcm1TbGlkZXIucGFnZVNjcm9sbEZpbmlzaCksXG4gICAgKS5zdWJzY3JpYmUoXG4gICAgICAgIChyKSA9PiB7IGlmIChyICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7IHRoaXMuZm9ybVNsaWRlci5zbGlkZSh7ZGlyOiAndXAnfSk7IH0gfSxcbiAgICAgICAgKF9lKSA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9LFxuICAgICAgICAoKSA9PiB7IGlmIChzKSB7IHMudW5zdWJzY3JpYmUoKTsgfSB9XG4gICAgICApO1xuICB9XG5cbiAgb25TYXZlKF9ldnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1BY3Rpb24uZW1pdCh7XG4gICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICBhY3Rpb246ICdzYXZlJyxcbiAgICAgIHZhbHVlOiB0aGlzLl9yZW5kZXJlclNlcnZpY2UuZ2V0Rm9ybVZhbHVlKClcbiAgICB9KTtcbiAgfVxuXG4gIG9uRm9ybUFjdGlvbihfZXZ0OiBhbnksIGFjdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5lbWl0KHtcbiAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgIHZhbHVlOiB0aGlzLl9yZW5kZXJlclNlcnZpY2UuZ2V0Rm9ybVZhbHVlKCksXG4gICAgICBhY3Rpb246IGFjdGlvblxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2V0IGN1cnJlbnQgZm9ybSBpbiByZWRlcmVyIHNlcnZpY2Ugd2hlbiBpbml0IGZvcm1cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZm9ybSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlclNlcnZpY2Uuc2V0Rm9ybSh0aGlzLl9mb3JtKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pbml0ICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcblxuICAgICAgdGhpcy5fZXJyb3JNb3ZlU3Vic2NyaXB0aW9uID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2Vycm9yTW92ZUV2ZW50KS5waXBlKFxuICAgICAgICB3aXRoTGF0ZXN0RnJvbSh0aGlzLl9lcnJvclBvc2l0aW9ucylcbiAgICAgICkuc3Vic2NyaWJlKCh2OiBbYm9vbGVhbiwgbnVtYmVyW11dKSA9PiB7XG4gICAgICAgICAgY29uc3QgbW92ZSA9IHZbMF07XG4gICAgICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gdGhpcy5mb3JtU2xpZGVyLmN1cnJlbnRQYWdlIC0gKCt0aGlzLmhhc1N0YXJ0TWVzc2FnZSkgKyAxO1xuICAgICAgICAgIGNvbnN0IGVycm9ycyA9IHZbMV07XG4gICAgICAgICAgaWYgKGVycm9ycyA9PSBudWxsKSB7IHJldHVybjsgfVxuXG4gICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHByZXZJZHggPSAtMTtcbiAgICAgICAgICBsZXQgbmV4dElkeCA9IC0xO1xuICAgICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICAgIGxldCBlcnJvcnNMZW4gPSBlcnJvcnMubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlICghZm91bmQgJiYgaWR4IDwgZXJyb3JzTGVuKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3JzW2lkeF0gPT0gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJldklkeCA9IGlkeCA+IDAgPyBpZHggLSAxIDogZXJyb3JzTGVuIC0gMTtcbiAgICAgICAgICAgICAgbmV4dElkeCA9IGlkeCA8IGVycm9yc0xlbiAtIDEgPyBpZHggKyAxIDogMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3JzW2lkeF0gPiBjdXJyZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBwcmV2SWR4ID0gaWR4ID4gMCA/IGlkeCAtIDEgOiBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICBuZXh0SWR4ID0gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIHByZXZJZHggPSBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgbmV4dElkeCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHt0bzogbW92ZSA/IGVycm9yc1tuZXh0SWR4XSAtIDEgOiBlcnJvcnNbcHJldklkeF0gLSAxfSk7XG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcblxuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX25leHRTbGlkZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Vycm9yTW92ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbik6IHZvaWQge1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgfVxuXG4gIHRyYWNrTm9kZUJ5SWQoXzogbnVtYmVyLCBub2RlOiBBamZOb2RlSW5zdGFuY2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZSk7XG4gIH1cbn1cbiJdfQ==