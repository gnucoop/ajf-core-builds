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
let AjfFormRenderer = /** @class */ (() => {
    class AjfFormRenderer {
        /**
         * this constructor will init current formula by ajfBuilderService
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
                _rendererService.formInitEvent.pipe(map(e => e === 1 /* Complete */));
        }
        get saveDisabled() {
            return this._saveDisabled;
        }
        set saveDisabled(saveDisabled) {
            this._saveDisabled = coerceBooleanProperty(saveDisabled);
            this._changeDetectorRef.markForCheck();
        }
        get hasStartMessage() {
            return this._hasStartMessage;
        }
        set hasStartMessage(hasStartMessage) {
            this._hasStartMessage = coerceBooleanProperty(hasStartMessage);
            this._changeDetectorRef.markForCheck();
        }
        get hasEndMessage() {
            return this._hasEndMessage;
        }
        set hasEndMessage(hasEndMessage) {
            this._hasEndMessage = coerceBooleanProperty(hasEndMessage);
            this._changeDetectorRef.markForCheck();
        }
        get hideTopToolbar() {
            return this._hideTopToolbar;
        }
        set hideTopToolbar(hideTopToolbar) {
            this._hideTopToolbar = coerceBooleanProperty(hideTopToolbar);
            this._changeDetectorRef.markForCheck();
        }
        get hideBottompToolbar() {
            return this._hideBottomToolbar;
        }
        set hideBottomToolbar(hideBottomToolbar) {
            this._hideBottomToolbar = coerceBooleanProperty(hideBottomToolbar);
            this._changeDetectorRef.markForCheck();
        }
        get hideNavigationButtons() {
            return this._hideNavigationButtons;
        }
        set hideNavigationButtons(hideNavigationButtons) {
            this._hideNavigationButtons = coerceBooleanProperty(hideNavigationButtons);
            this._changeDetectorRef.markForCheck();
        }
        get fixedOrientation() {
            return this._fixedOrientation;
        }
        set fixedOrientation(fixedOrientation) {
            this._fixedOrientation = coerceBooleanProperty(fixedOrientation);
            this._changeDetectorRef.markForCheck();
        }
        get readonly() {
            return this._readonly;
        }
        set readonly(readonly) {
            this._readonly = coerceBooleanProperty(readonly);
            this._changeDetectorRef.markForCheck();
        }
        get orientation() {
            return this._orientation;
        }
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
        set form(form) {
            this._form = form;
            if (this._init) {
                this._rendererService.setForm(this._form);
            }
        }
        /**
         * this method will scroll to next error received by subscribe
         */
        goToNextError() {
            this._errorMoveEvent.emit(true);
        }
        /**
         * this method will scroll to prev error received by subscribe
         */
        goToPrevError() {
            this._errorMoveEvent.emit(false);
        }
        /**
         * this method will add group
         */
        addGroup(nodeGroup) {
            let s = this._rendererService.addGroup(nodeGroup)
                .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
                .subscribe((r) => {
                if (r && this.formSlider != null) {
                    this.formSlider.slide({ dir: 'down' });
                }
            }, (_e) => {
                if (s) {
                    s.unsubscribe();
                }
            }, () => {
                if (s) {
                    s.unsubscribe();
                }
            });
        }
        /**
         * this method will remove group
         */
        removeGroup(nodeGroup) {
            let s = this._rendererService.removeGroup(nodeGroup)
                .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
                .subscribe((r) => {
                if (r && this.formSlider != null) {
                    this.formSlider.slide({ dir: 'up' });
                }
            }, (_e) => {
                if (s) {
                    s.unsubscribe();
                }
            }, () => {
                if (s) {
                    s.unsubscribe();
                }
            });
        }
        onSave(_evt) {
            this._formAction.emit({ source: this, action: 'save', value: this._rendererService.getFormValue() });
        }
        onFormAction(_evt, action) {
            this._formAction.emit({ source: this, value: this._rendererService.getFormValue(), action: action });
        }
        /**
         * this method will set current form in rederer service when init form
         */
        ngAfterViewInit() {
            if (this._form != null) {
                this._rendererService.setForm(this._form);
                this._changeDetectorRef.detectChanges();
            }
        }
        ngAfterViewChecked() {
            if (!this._init && this.formSlider != null) {
                this._init = true;
                this._errorMoveSubscription =
                    this._errorMoveEvent
                        .pipe(withLatestFrom(this._errorPositions))
                        .subscribe((v) => {
                        const move = v[0];
                        const currentPosition = this.formSlider.currentPage - (+this.hasStartMessage) + 1;
                        const errors = v[1];
                        if (errors == null) {
                            return;
                        }
                        let found = false;
                        let prevIdx = -1;
                        let nextIdx = -1;
                        let idx = 0;
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
                    });
            }
        }
        ngOnDestroy() {
            this._nextSlideSubscription.unsubscribe();
            this._errorMoveSubscription.unsubscribe();
            this._orientationChange.complete();
            this._errorMoveEvent.complete();
            this._formAction.complete();
        }
        orientationChangeHandler(orientation) {
            this.orientation = orientation;
        }
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
    return AjfFormRenderer;
})();
export { AjfFormRenderer };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBMkIsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBR0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3JDLE9BQU8sRUFBb0Isc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUUxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFNM0QsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFFN0YsTUFBTSxPQUFPLGtCQUFrQjtDQUk5QjtBQUVEO0lBQUEsTUFDc0IsZUFBZTtRQWtKbkM7O1dBRUc7UUFDSCxZQUNZLGdCQUF3QyxFQUN0QyxrQkFBcUM7WUFEdkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF3QjtZQUN0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1lBN0luRCx1RUFBdUU7WUFDdkUscUNBQXFDO1lBQzVCLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1lBSTlCLHVCQUFrQixHQUN0QixJQUFJLFlBQVksRUFBNEIsQ0FBQztZQUV4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YSxFQUFFLENBQUM7b0JBQzFDLENBQUMsQ0FBQyxDQUFDO2FBQ1o7UUFDSCxDQUFDO1FBRUQsV0FBVztZQUNULElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxXQUFXLEVBQUUsQ0FBQztZQUMxQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDMUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLFFBQVEsRUFBRSxDQUFDO1lBQ25DLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLENBQUM7WUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUM5QixDQUFDO1FBRUQsd0JBQXdCLENBQUMsV0FBcUM7WUFDNUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDakMsQ0FBQztRQUVELGFBQWEsQ0FBQyxDQUFTLEVBQUUsSUFBcUI7WUFDNUMsT0FBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxDQUFDOzs7Z0JBaFRGLFNBQVM7Ozs7Z0JBaEJpQixzQkFBc0I7Z0JBZi9DLGlCQUFpQjs7O3dCQThDaEIsS0FBSztvQ0FJTCxNQUFNOytCQVFOLEtBQUs7a0NBVUwsS0FBSztnQ0FVTCxLQUFLO2lDQVVMLEtBQUs7b0NBVUwsS0FBSzt3Q0FVTCxLQUFLO21DQVVMLEtBQUs7MkJBVUwsS0FBSzs4QkFVTCxLQUFLOzZCQVlMLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO3lCQUN2QyxZQUFZLFNBQUMsWUFBWTs2QkFnQnpCLE1BQU07dUJBRU4sS0FBSzs7SUF1S1Isc0JBQUM7S0FBQTtTQWhUcUIsZUFBZSIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZQYWdlU2xpZGVyLCBBamZQYWdlU2xpZGVyT3JpZW50YXRpb259IGZyb20gJ0BhamYvY29yZS9wYWdlLXNsaWRlcic7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVsYXlXaGVuLCBtYXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybUZpZWxkfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7QWpmRm9ybUluaXRTdGF0dXMsIEFqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5cbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3NsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuXG5leHBvcnQgY2xhc3MgQWpmRm9ybUFjdGlvbkV2ZW50IHtcbiAgc291cmNlOiBBamZGb3JtUmVuZGVyZXI7XG4gIHZhbHVlOiBPYmplY3Q7XG4gIGFjdGlvbjogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZGb3JtUmVuZGVyZXIgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvLyBmb3JtR3JvdXAgaXMgYW4gT2JzZXJ2YWJsZSBGb3JtR3JvdXAgdHlwZVxuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8Rm9ybUdyb3VwfG51bGw+O1xuXG4gIC8vICBzbGlkZXMgaXMgYW4gb2JzZXJ2YWJsZSBBamZTbGlkZSBhcnJheSB0eXBlXG4gIHJlYWRvbmx5IHNsaWRlczogT2JzZXJ2YWJsZTxBamZTbGlkZUluc3RhbmNlW10+O1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcmVhZG9ubHkgZXJyb3JzOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHJlYWRvbmx5IGZvcm1Jc0luaXQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLy8gYWpmRmllbGRUeXBlcyBbIFRleHQsIE51bWJlciwgQm9vbGVhbiwgU2luZ2xlQ2hvaWNlLCBNdWx0aXBsZUNob2ljZSxcbiAgLy8gRm9ybXVsYSwgRW1wdHksIENvbXBvc2VkLCBMRU5HVEggXVxuICByZWFkb25seSBhamZGaWVsZFR5cGVzID0gQWpmRmllbGRUeXBlO1xuXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgb3JpZW50YXRpb25DaGFuZ2U6IE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zYXZlRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IHNhdmVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZURpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBzYXZlRGlzYWJsZWQoc2F2ZURpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2F2ZURpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHNhdmVEaXNhYmxlZCk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNTdGFydE1lc3NhZ2UgPSBmYWxzZTtcbiAgZ2V0IGhhc1N0YXJ0TWVzc2FnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzU3RhcnRNZXNzYWdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoYXNTdGFydE1lc3NhZ2UoaGFzU3RhcnRNZXNzYWdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzU3RhcnRNZXNzYWdlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhhc1N0YXJ0TWVzc2FnZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNFbmRNZXNzYWdlID0gZmFsc2U7XG4gIGdldCBoYXNFbmRNZXNzYWdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNFbmRNZXNzYWdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoYXNFbmRNZXNzYWdlKGhhc0VuZE1lc3NhZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNFbmRNZXNzYWdlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhhc0VuZE1lc3NhZ2UpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZVRvcFRvb2xiYXIgPSBmYWxzZTtcbiAgZ2V0IGhpZGVUb3BUb29sYmFyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlVG9wVG9vbGJhcjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGlkZVRvcFRvb2xiYXIoaGlkZVRvcFRvb2xiYXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlVG9wVG9vbGJhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlVG9wVG9vbGJhcik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlQm90dG9tVG9vbGJhciA9IGZhbHNlO1xuICBnZXQgaGlkZUJvdHRvbXBUb29sYmFyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlQm90dG9tVG9vbGJhcjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGlkZUJvdHRvbVRvb2xiYXIoaGlkZUJvdHRvbVRvb2xiYXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlQm90dG9tVG9vbGJhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlQm90dG9tVG9vbGJhcik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBmYWxzZTtcbiAgZ2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoaGlkZU5hdmlnYXRpb25CdXR0b25zOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9maXhlZE9yaWVudGF0aW9uID0gZmFsc2U7XG4gIGdldCBmaXhlZE9yaWVudGF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZE9yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaXhlZE9yaWVudGF0aW9uKGZpeGVkT3JpZW50YXRpb246IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXhlZE9yaWVudGF0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGZpeGVkT3JpZW50YXRpb24pO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVhZG9ubHkgPSBmYWxzZTtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICBnZXQgb3JpZW50YXRpb24oKTogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pIHtcbiAgICBpZiAob3JpZW50YXRpb24gIT09ICdob3Jpem9udGFsJyAmJiBvcmllbnRhdGlvbiAhPT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3JpZW50YXRpb24gIT09IHRoaXMuX29yaWVudGF0aW9uKSB7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5lbWl0KHRoaXMuX29yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBAVmlld0NoaWxkKCdmb3JtU2xpZGVyJywge3N0YXRpYzogZmFsc2V9KSBmb3JtU2xpZGVyOiBBamZQYWdlU2xpZGVyO1xuICBAVmlld0NoaWxkcmVuKEFqZkZvcm1GaWVsZCkgZmllbGRzOiBRdWVyeUxpc3Q8QWpmRm9ybUZpZWxkPjtcblxuICBwcml2YXRlIF9lcnJvck1vdmVFdmVudDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8vIF9lcnJvclBvc2l0aW9ucyBpcyBhIHByaXZhdGUgc3ViamVjdCBzdHJ1Y3R1cmUgdGhhdCBjb250YWlucyBuZXh0IGFuZCBwcmV2XG4gIHByaXZhdGUgX2Vycm9yUG9zaXRpb25zOiBPYnNlcnZhYmxlPG51bWJlcltdPjtcblxuICAvLyBfZm9ybSBpcyBhIHByaXZhdGUgYWpGRm9ybVxuICBwcml2YXRlIF9mb3JtOiBBamZGb3JtO1xuICAvLyBfaW5pdCBpcyBhIHByaXZhdGUgYm9vbGVhblxuICBwcml2YXRlIF9pbml0ID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Vycm9yTW92ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2Zvcm1BY3Rpb246IEV2ZW50RW1pdHRlcjxBamZGb3JtQWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQWN0aW9uRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBmb3JtQWN0aW9uOiBPYnNlcnZhYmxlPEFqZkZvcm1BY3Rpb25FdmVudD4gPSB0aGlzLl9mb3JtQWN0aW9uLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmb3JtKGZvcm06IEFqZkZvcm0pIHtcbiAgICB0aGlzLl9mb3JtID0gZm9ybTtcblxuICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICB0aGlzLl9yZW5kZXJlclNlcnZpY2Uuc2V0Rm9ybSh0aGlzLl9mb3JtKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBjb25zdHJ1Y3RvciB3aWxsIGluaXQgY3VycmVudCBmb3JtdWxhIGJ5IGFqZkJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyU2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSBfcmVuZGVyZXJTZXJ2aWNlLmZvcm1Hcm91cDtcbiAgICB0aGlzLnNsaWRlcyA9IF9yZW5kZXJlclNlcnZpY2Uubm9kZXNUcmVlO1xuICAgIHRoaXMuX2Vycm9yUG9zaXRpb25zID0gX3JlbmRlcmVyU2VydmljZS5lcnJvclBvc2l0aW9ucztcbiAgICB0aGlzLmVycm9ycyA9IF9yZW5kZXJlclNlcnZpY2UuZXJyb3JzO1xuICAgIHRoaXMuc2xpZGVzTnVtID0gX3JlbmRlcmVyU2VydmljZS5zbGlkZXNOdW07XG4gICAgdGhpcy5mb3JtSXNJbml0ID1cbiAgICAgICAgX3JlbmRlcmVyU2VydmljZS5mb3JtSW5pdEV2ZW50LnBpcGUobWFwKGUgPT4gZSA9PT0gQWpmRm9ybUluaXRTdGF0dXMuQ29tcGxldGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNjcm9sbCB0byBuZXh0IGVycm9yIHJlY2VpdmVkIGJ5IHN1YnNjcmliZVxuICAgKi9cbiAgZ29Ub05leHRFcnJvcigpOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvck1vdmVFdmVudC5lbWl0KHRydWUpO1xuICB9XG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNjcm9sbCB0byBwcmV2IGVycm9yIHJlY2VpdmVkIGJ5IHN1YnNjcmliZVxuICAgKi9cbiAgZ29Ub1ByZXZFcnJvcigpOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvck1vdmVFdmVudC5lbWl0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGFkZCBncm91cFxuICAgKi9cbiAgYWRkR3JvdXAobm9kZUdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZXxBamZTbGlkZUluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRoaXMuX3JlbmRlcmVyU2VydmljZS5hZGRHcm91cChub2RlR3JvdXAgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5V2hlbigoKSA9PiB0aGlzLmZvcm1TbGlkZXIucGFnZVNjcm9sbEZpbmlzaCksXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe2RpcjogJ2Rvd24nfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoX2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHJlbW92ZSBncm91cFxuICAgKi9cbiAgcmVtb3ZlR3JvdXAobm9kZUdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZXxBamZTbGlkZUluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRoaXMuX3JlbmRlcmVyU2VydmljZS5yZW1vdmVHcm91cChub2RlR3JvdXAgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5V2hlbigoKSA9PiB0aGlzLmZvcm1TbGlkZXIucGFnZVNjcm9sbEZpbmlzaCksXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe2RpcjogJ3VwJ30pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKF9lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBvblNhdmUoX2V2dDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5lbWl0KFxuICAgICAgICB7c291cmNlOiB0aGlzLCBhY3Rpb246ICdzYXZlJywgdmFsdWU6IHRoaXMuX3JlbmRlcmVyU2VydmljZS5nZXRGb3JtVmFsdWUoKX0pO1xuICB9XG5cbiAgb25Gb3JtQWN0aW9uKF9ldnQ6IGFueSwgYWN0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmVtaXQoXG4gICAgICAgIHtzb3VyY2U6IHRoaXMsIHZhbHVlOiB0aGlzLl9yZW5kZXJlclNlcnZpY2UuZ2V0Rm9ybVZhbHVlKCksIGFjdGlvbjogYWN0aW9ufSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzZXQgY3VycmVudCBmb3JtIGluIHJlZGVyZXIgc2VydmljZSB3aGVuIGluaXQgZm9ybVxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb3JtICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyU2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2luaXQgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuXG4gICAgICB0aGlzLl9lcnJvck1vdmVTdWJzY3JpcHRpb24gPVxuICAgICAgICAgICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9lcnJvck1vdmVFdmVudClcbiAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fZXJyb3JQb3NpdGlvbnMpKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKCh2OiBbYm9vbGVhbiwgbnVtYmVyW11dKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbW92ZSA9IHZbMF07XG4gICAgICAgICAgICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gdGhpcy5mb3JtU2xpZGVyLmN1cnJlbnRQYWdlIC0gKCt0aGlzLmhhc1N0YXJ0TWVzc2FnZSkgKyAxO1xuICAgICAgICAgICAgICAgIGNvbnN0IGVycm9ycyA9IHZbMV07XG4gICAgICAgICAgICAgICAgaWYgKGVycm9ycyA9PSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZJZHggPSAtMTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dElkeCA9IC0xO1xuICAgICAgICAgICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICAgICAgICAgIGxldCBlcnJvcnNMZW4gPSBlcnJvcnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlICghZm91bmQgJiYgaWR4IDwgZXJyb3JzTGVuKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoZXJyb3JzW2lkeF0gPT0gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcHJldklkeCA9IGlkeCA+IDAgPyBpZHggLSAxIDogZXJyb3JzTGVuIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dElkeCA9IGlkeCA8IGVycm9yc0xlbiAtIDEgPyBpZHggKyAxIDogMDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3JzW2lkeF0gPiBjdXJyZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwcmV2SWR4ID0gaWR4ID4gMCA/IGlkeCAtIDEgOiBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICAgICAgICBuZXh0SWR4ID0gaWR4O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgIHByZXZJZHggPSBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dElkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHt0bzogbW92ZSA/IGVycm9yc1tuZXh0SWR4XSAtIDEgOiBlcnJvcnNbcHJldklkeF0gLSAxfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9uZXh0U2xpZGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lcnJvck1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Vycm9yTW92ZUV2ZW50LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gIH1cblxuICB0cmFja05vZGVCeUlkKF86IG51bWJlciwgbm9kZTogQWpmTm9kZUluc3RhbmNlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGUpO1xuICB9XG59XG4iXX0=