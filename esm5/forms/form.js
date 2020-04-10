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
        this.formIsInit =
            _rendererService.formInitEvent.pipe(map(function (e) { return e === 1 /* Complete */; }));
    }
    Object.defineProperty(AjfFormRenderer.prototype, "saveDisabled", {
        get: function () {
            return this._saveDisabled;
        },
        set: function (saveDisabled) {
            this._saveDisabled = coerceBooleanProperty(saveDisabled);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hasStartMessage", {
        get: function () {
            return this._hasStartMessage;
        },
        set: function (hasStartMessage) {
            this._hasStartMessage = coerceBooleanProperty(hasStartMessage);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hasEndMessage", {
        get: function () {
            return this._hasEndMessage;
        },
        set: function (hasEndMessage) {
            this._hasEndMessage = coerceBooleanProperty(hasEndMessage);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hideTopToolbar", {
        get: function () {
            return this._hideTopToolbar;
        },
        set: function (hideTopToolbar) {
            this._hideTopToolbar = coerceBooleanProperty(hideTopToolbar);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "hideBottompToolbar", {
        get: function () {
            return this._hideBottomToolbar;
        },
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
        get: function () {
            return this._hideNavigationButtons;
        },
        set: function (hideNavigationButtons) {
            this._hideNavigationButtons = coerceBooleanProperty(hideNavigationButtons);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "fixedOrientation", {
        get: function () {
            return this._fixedOrientation;
        },
        set: function (fixedOrientation) {
            this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "readonly", {
        get: function () {
            return this._readonly;
        },
        set: function (readonly) {
            this._readonly = coerceBooleanProperty(readonly);
            this._changeDetectorRef.markForCheck();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(AjfFormRenderer.prototype, "orientation", {
        get: function () {
            return this._orientation;
        },
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
    AjfFormRenderer.prototype.goToNextError = function () {
        this._errorMoveEvent.emit(true);
    };
    /**
     * this method will scroll to prev error received by subscribe
     */
    AjfFormRenderer.prototype.goToPrevError = function () {
        this._errorMoveEvent.emit(false);
    };
    /**
     * this method will add group
     */
    AjfFormRenderer.prototype.addGroup = function (nodeGroup) {
        var _this = this;
        var s = this._rendererService.addGroup(nodeGroup)
            .pipe(delayWhen(function () { return _this.formSlider.pageScrollFinish; }))
            .subscribe(function (r) {
            if (r && _this.formSlider != null) {
                _this.formSlider.slide({ dir: 'down' });
            }
        }, function (_e) {
            if (s) {
                s.unsubscribe();
            }
        }, function () {
            if (s) {
                s.unsubscribe();
            }
        });
    };
    /**
     * this method will remove group
     */
    AjfFormRenderer.prototype.removeGroup = function (nodeGroup) {
        var _this = this;
        var s = this._rendererService.removeGroup(nodeGroup)
            .pipe(delayWhen(function () { return _this.formSlider.pageScrollFinish; }))
            .subscribe(function (r) {
            if (r && _this.formSlider != null) {
                _this.formSlider.slide({ dir: 'up' });
            }
        }, function (_e) {
            if (s) {
                s.unsubscribe();
            }
        }, function () {
            if (s) {
                s.unsubscribe();
            }
        });
    };
    AjfFormRenderer.prototype.onSave = function (_evt) {
        this._formAction.emit({ source: this, action: 'save', value: this._rendererService.getFormValue() });
    };
    AjfFormRenderer.prototype.onFormAction = function (_evt, action) {
        this._formAction.emit({ source: this, value: this._rendererService.getFormValue(), action: action });
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
            this._errorMoveSubscription =
                this._errorMoveEvent
                    .pipe(withLatestFrom(this._errorPositions))
                    .subscribe(function (v) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBMkIsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBR0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3JDLE9BQU8sRUFBb0Isc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUUxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFNM0QsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFFN0Y7SUFBQTtJQUlBLENBQUM7SUFBRCx5QkFBQztBQUFELENBQUMsQUFKRCxJQUlDOztBQUVEO0lBbUpFOztPQUVHO0lBQ0gseUJBQ1ksZ0JBQXdDLEVBQ3RDLGtCQUFxQztRQUR2QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUE3SW5ELHVFQUF1RTtRQUN2RSxxQ0FBcUM7UUFDNUIsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFJOUIsdUJBQWtCLEdBQ3RCLElBQUks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biAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlciwgQWpmUGFnZVNsaWRlck9yaWVudGF0aW9ufSBmcm9tICdAYWpmL2NvcmUvcGFnZS1zbGlkZXInO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlblxufSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUdyb3VwfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge09ic2VydmFibGUsIFN1YnNjcmlwdGlvbn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2RlbGF5V2hlbiwgbWFwLCB3aXRoTGF0ZXN0RnJvbX0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkZvcm1GaWVsZH0gZnJvbSAnLi9maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1Jbml0U3RhdHVzLCBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuXG5pbXBvcnQge0FqZkZpZWxkVHlwZX0gZnJvbSAnLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZGb3JtfSBmcm9tICcuL2ludGVyZmFjZS9mb3Jtcy9mb3JtJztcbmltcG9ydCB7QWpmTm9kZUdyb3VwSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWdyb3VwLWluc3RhbmNlJztcbmltcG9ydCB7QWpmTm9kZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvcmVwZWF0aW5nLXNsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZX0gZnJvbSAnLi91dGlscy9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lJztcblxuZXhwb3J0IGNsYXNzIEFqZkZvcm1BY3Rpb25FdmVudCB7XG4gIHNvdXJjZTogQWpmRm9ybVJlbmRlcmVyO1xuICB2YWx1ZTogT2JqZWN0O1xuICBhY3Rpb246IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRm9ybVJlbmRlcmVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLy8gZm9ybUdyb3VwIGlzIGFuIE9ic2VydmFibGUgRm9ybUdyb3VwIHR5cGVcbiAgcmVhZG9ubHkgZm9ybUdyb3VwOiBPYnNlcnZhYmxlPEZvcm1Hcm91cHxudWxsPjtcblxuICAvLyAgc2xpZGVzIGlzIGFuIG9ic2VydmFibGUgQWpmU2xpZGUgYXJyYXkgdHlwZVxuICByZWFkb25seSBzbGlkZXM6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPjtcbiAgcmVhZG9ubHkgc2xpZGVzTnVtOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHJlYWRvbmx5IGVycm9yczogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICByZWFkb25seSBmb3JtSXNJbml0OiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuXG4gIC8vIGFqZkZpZWxkVHlwZXMgWyBUZXh0LCBOdW1iZXIsIEJvb2xlYW4sIFNpbmdsZUNob2ljZSwgTXVsdGlwbGVDaG9pY2UsXG4gIC8vIEZvcm11bGEsIEVtcHR5LCBDb21wb3NlZCwgTEVOR1RIIF1cbiAgcmVhZG9ubHkgYWpmRmllbGRUeXBlcyA9IEFqZkZpZWxkVHlwZTtcblxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IG9yaWVudGF0aW9uQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPVxuICAgICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuYXNPYnNlcnZhYmxlKCk7XG5cbiAgcHJpdmF0ZSBfc2F2ZURpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBzYXZlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVEaXNhYmxlZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc2F2ZURpc2FibGVkKHNhdmVEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NhdmVEaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShzYXZlRGlzYWJsZWQpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzU3RhcnRNZXNzYWdlID0gZmFsc2U7XG4gIGdldCBoYXNTdGFydE1lc3NhZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc1N0YXJ0TWVzc2FnZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGFzU3RhcnRNZXNzYWdlKGhhc1N0YXJ0TWVzc2FnZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc1N0YXJ0TWVzc2FnZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoYXNTdGFydE1lc3NhZ2UpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzRW5kTWVzc2FnZSA9IGZhbHNlO1xuICBnZXQgaGFzRW5kTWVzc2FnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRW5kTWVzc2FnZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGFzRW5kTWVzc2FnZShoYXNFbmRNZXNzYWdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzRW5kTWVzc2FnZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoYXNFbmRNZXNzYWdlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVUb3BUb29sYmFyID0gZmFsc2U7XG4gIGdldCBoaWRlVG9wVG9vbGJhcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZVRvcFRvb2xiYXI7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhpZGVUb3BUb29sYmFyKGhpZGVUb3BUb29sYmFyOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZVRvcFRvb2xiYXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZVRvcFRvb2xiYXIpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZUJvdHRvbVRvb2xiYXIgPSBmYWxzZTtcbiAgZ2V0IGhpZGVCb3R0b21wVG9vbGJhcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZUJvdHRvbVRvb2xiYXI7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhpZGVCb3R0b21Ub29sYmFyKGhpZGVCb3R0b21Ub29sYmFyOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZUJvdHRvbVRvb2xiYXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZUJvdHRvbVRvb2xiYXIpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZU5hdmlnYXRpb25CdXR0b25zID0gZmFsc2U7XG4gIGdldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKGhpZGVOYXZpZ2F0aW9uQnV0dG9uczogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlTmF2aWdhdGlvbkJ1dHRvbnMpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZml4ZWRPcmllbnRhdGlvbiA9IGZhbHNlO1xuICBnZXQgZml4ZWRPcmllbnRhdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZml4ZWRPcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZml4ZWRPcmllbnRhdGlvbihmaXhlZE9yaWVudGF0aW9uOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZml4ZWRPcmllbnRhdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShmaXhlZE9yaWVudGF0aW9uKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlYWRvbmx5ID0gZmFsc2U7XG4gIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgZ2V0IG9yaWVudGF0aW9uKCk6IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBvcmllbnRhdGlvbihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uICE9PSAnaG9yaXpvbnRhbCcgJiYgb3JpZW50YXRpb24gIT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9yaWVudGF0aW9uICE9PSB0aGlzLl9vcmllbnRhdGlvbikge1xuICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuZW1pdCh0aGlzLl9vcmllbnRhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgQFZpZXdDaGlsZCgnZm9ybVNsaWRlcicsIHtzdGF0aWM6IGZhbHNlfSkgZm9ybVNsaWRlcjogQWpmUGFnZVNsaWRlcjtcbiAgQFZpZXdDaGlsZHJlbihBamZGb3JtRmllbGQpIGZpZWxkczogUXVlcnlMaXN0PEFqZkZvcm1GaWVsZD47XG5cbiAgcHJpdmF0ZSBfZXJyb3JNb3ZlRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvLyBfZXJyb3JQb3NpdGlvbnMgaXMgYSBwcml2YXRlIHN1YmplY3Qgc3RydWN0dXJlIHRoYXQgY29udGFpbnMgbmV4dCBhbmQgcHJldlxuICBwcml2YXRlIF9lcnJvclBvc2l0aW9uczogT2JzZXJ2YWJsZTxudW1iZXJbXT47XG5cbiAgLy8gX2Zvcm0gaXMgYSBwcml2YXRlIGFqRkZvcm1cbiAgcHJpdmF0ZSBfZm9ybTogQWpmRm9ybTtcbiAgLy8gX2luaXQgaXMgYSBwcml2YXRlIGJvb2xlYW5cbiAgcHJpdmF0ZSBfaW5pdCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lcnJvck1vdmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9mb3JtQWN0aW9uOiBFdmVudEVtaXR0ZXI8QWpmRm9ybUFjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUFjdGlvbkV2ZW50PigpO1xuICBAT3V0cHV0KCkgcmVhZG9ubHkgZm9ybUFjdGlvbjogT2JzZXJ2YWJsZTxBamZGb3JtQWN0aW9uRXZlbnQ+ID0gdGhpcy5fZm9ybUFjdGlvbi5hc09ic2VydmFibGUoKTtcblxuICBASW5wdXQoKVxuICBzZXQgZm9ybShmb3JtOiBBamZGb3JtKSB7XG4gICAgdGhpcy5fZm9ybSA9IGZvcm07XG5cbiAgICBpZiAodGhpcy5faW5pdCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLnNldEZvcm0odGhpcy5fZm9ybSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgY29uc3RydWN0b3Igd2lsbCBpbml0IGN1cnJlbnQgZm9ybXVsYSBieSBhamZCdWlsZGVyU2VydmljZVxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgICBwcml2YXRlIF9yZW5kZXJlclNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZikge1xuICAgIHRoaXMuZm9ybUdyb3VwID0gX3JlbmRlcmVyU2VydmljZS5mb3JtR3JvdXA7XG4gICAgdGhpcy5zbGlkZXMgPSBfcmVuZGVyZXJTZXJ2aWNlLm5vZGVzVHJlZTtcbiAgICB0aGlzLl9lcnJvclBvc2l0aW9ucyA9IF9yZW5kZXJlclNlcnZpY2UuZXJyb3JQb3NpdGlvbnM7XG4gICAgdGhpcy5lcnJvcnMgPSBfcmVuZGVyZXJTZXJ2aWNlLmVycm9ycztcbiAgICB0aGlzLnNsaWRlc051bSA9IF9yZW5kZXJlclNlcnZpY2Uuc2xpZGVzTnVtO1xuICAgIHRoaXMuZm9ybUlzSW5pdCA9XG4gICAgICAgIF9yZW5kZXJlclNlcnZpY2UuZm9ybUluaXRFdmVudC5waXBlKG1hcChlID0+IGUgPT09IEFqZkZvcm1Jbml0U3RhdHVzLkNvbXBsZXRlKSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzY3JvbGwgdG8gbmV4dCBlcnJvciByZWNlaXZlZCBieSBzdWJzY3JpYmVcbiAgICovXG4gIGdvVG9OZXh0RXJyb3IoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuZW1pdCh0cnVlKTtcbiAgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzY3JvbGwgdG8gcHJldiBlcnJvciByZWNlaXZlZCBieSBzdWJzY3JpYmVcbiAgICovXG4gIGdvVG9QcmV2RXJyb3IoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuZW1pdChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBhZGQgZ3JvdXBcbiAgICovXG4gIGFkZEdyb3VwKG5vZGVHcm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2V8QWpmU2xpZGVJbnN0YW5jZXxBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aGlzLl9yZW5kZXJlclNlcnZpY2UuYWRkR3JvdXAobm9kZUdyb3VwIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlKVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICBkZWxheVdoZW4oKCkgPT4gdGhpcy5mb3JtU2xpZGVyLnBhZ2VTY3JvbGxGaW5pc2gpLFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAociAmJiB0aGlzLmZvcm1TbGlkZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtkaXI6ICdkb3duJ30pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKF9lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCByZW1vdmUgZ3JvdXBcbiAgICovXG4gIHJlbW92ZUdyb3VwKG5vZGVHcm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2V8QWpmU2xpZGVJbnN0YW5jZXxBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aGlzLl9yZW5kZXJlclNlcnZpY2UucmVtb3ZlR3JvdXAobm9kZUdyb3VwIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlKVxuICAgICAgICAgICAgICAgIC5waXBlKFxuICAgICAgICAgICAgICAgICAgICBkZWxheVdoZW4oKCkgPT4gdGhpcy5mb3JtU2xpZGVyLnBhZ2VTY3JvbGxGaW5pc2gpLFxuICAgICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgICAgICAgICAgICAgKHIpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAociAmJiB0aGlzLmZvcm1TbGlkZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtkaXI6ICd1cCd9KTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgIChfZSkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICB9XG5cbiAgb25TYXZlKF9ldnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1BY3Rpb24uZW1pdChcbiAgICAgICAge3NvdXJjZTogdGhpcywgYWN0aW9uOiAnc2F2ZScsIHZhbHVlOiB0aGlzLl9yZW5kZXJlclNlcnZpY2UuZ2V0Rm9ybVZhbHVlKCl9KTtcbiAgfVxuXG4gIG9uRm9ybUFjdGlvbihfZXZ0OiBhbnksIGFjdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5lbWl0KFxuICAgICAgICB7c291cmNlOiB0aGlzLCB2YWx1ZTogdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLmdldEZvcm1WYWx1ZSgpLCBhY3Rpb246IGFjdGlvbn0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2V0IGN1cnJlbnQgZm9ybSBpbiByZWRlcmVyIHNlcnZpY2Ugd2hlbiBpbml0IGZvcm1cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZm9ybSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlclNlcnZpY2Uuc2V0Rm9ybSh0aGlzLl9mb3JtKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pbml0ICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcblxuICAgICAgdGhpcy5fZXJyb3JNb3ZlU3Vic2NyaXB0aW9uID1cbiAgICAgICAgICAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZXJyb3JNb3ZlRXZlbnQpXG4gICAgICAgICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX2Vycm9yUG9zaXRpb25zKSlcbiAgICAgICAgICAgICAgLnN1YnNjcmliZSgodjogW2Jvb2xlYW4sIG51bWJlcltdXSkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG1vdmUgPSB2WzBdO1xuICAgICAgICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZm9ybVNsaWRlci5jdXJyZW50UGFnZSAtICgrdGhpcy5oYXNTdGFydE1lc3NhZ2UpICsgMTtcbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvcnMgPSB2WzFdO1xuICAgICAgICAgICAgICAgIGlmIChlcnJvcnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGxldCBwcmV2SWR4ID0gLTE7XG4gICAgICAgICAgICAgICAgbGV0IG5leHRJZHggPSAtMTtcbiAgICAgICAgICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgICAgICAgICBsZXQgZXJyb3JzTGVuID0gZXJyb3JzLmxlbmd0aDtcbiAgICAgICAgICAgICAgICB3aGlsZSAoIWZvdW5kICYmIGlkeCA8IGVycm9yc0xlbikge1xuICAgICAgICAgICAgICAgICAgaWYgKGVycm9yc1tpZHhdID09IGN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgIHByZXZJZHggPSBpZHggPiAwID8gaWR4IC0gMSA6IGVycm9yc0xlbiAtIDE7XG4gICAgICAgICAgICAgICAgICAgIG5leHRJZHggPSBpZHggPCBlcnJvcnNMZW4gLSAxID8gaWR4ICsgMSA6IDA7XG4gICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yc1tpZHhdID4gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcHJldklkeCA9IGlkeCA+IDAgPyBpZHggLSAxIDogZXJyb3JzTGVuIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dElkeCA9IGlkeDtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlkeCsrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICAgICAgICBwcmV2SWR4ID0gZXJyb3JzTGVuIC0gMTtcbiAgICAgICAgICAgICAgICAgIG5leHRJZHggPSAwO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHRoaXMuZm9ybVNsaWRlci5zbGlkZSh7dG86IG1vdmUgPyBlcnJvcnNbbmV4dElkeF0gLSAxIDogZXJyb3JzW3ByZXZJZHhdIC0gMX0pO1xuICAgICAgICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fbmV4dFNsaWRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZXJyb3JNb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuY29tcGxldGUoKTtcbiAgICB0aGlzLl9lcnJvck1vdmVFdmVudC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Zvcm1BY3Rpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICB9XG5cbiAgdHJhY2tOb2RlQnlJZChfOiBudW1iZXIsIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlKTtcbiAgfVxufVxuIl19