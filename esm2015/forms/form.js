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
export class AjfFormRenderer {
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
                    .subscribe(([move, errs]) => {
                    const currentPosition = this.formSlider.currentPage - (+this.hasStartMessage) + 1;
                    if (errs == null) {
                        return;
                    }
                    const errors = errs;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL2Zvcm1zL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsT0FBTyxFQUFDLGFBQWEsRUFBMkIsTUFBTSx1QkFBdUIsQ0FBQztBQUM5RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSx1QkFBdUIsQ0FBQztBQUM1RCxPQUFPLEVBR0wsaUJBQWlCLEVBQ2pCLFNBQVMsRUFDVCxZQUFZLEVBQ1osS0FBSyxFQUVMLE1BQU0sRUFDTixTQUFTLEVBQ1QsU0FBUyxFQUNULFlBQVksRUFDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQUMsVUFBVSxFQUFFLFlBQVksRUFBQyxNQUFNLE1BQU0sQ0FBQztBQUM5QyxPQUFPLEVBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRSxjQUFjLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU5RCxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sU0FBUyxDQUFDO0FBQ3JDLE9BQU8sRUFBb0Isc0JBQXNCLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQztBQUUxRSxPQUFPLEVBQUMsWUFBWSxFQUFDLE1BQU0sK0JBQStCLENBQUM7QUFNM0QsT0FBTyxFQUFDLHdCQUF3QixFQUFDLE1BQU0scURBQXFELENBQUM7QUFFN0YsTUFBTSxPQUFPLGtCQUFrQjtDQUk5QjtBQUdELE1BQU0sT0FBZ0IsZUFBZTtJQWtKbkM7O09BRUc7SUFDSCxZQUNZLGdCQUF3QyxFQUN0QyxrQkFBcUM7UUFEdkMscUJBQWdCLEdBQWhCLGdCQUFnQixDQUF3QjtRQUN0Qyx1QkFBa0IsR0FBbEIsa0JBQWtCLENBQW1CO1FBN0luRCx1RUFBdUU7UUFDdkUscUNBQXFDO1FBQzVCLGtCQUFhLEdBQUcsWUFBWSxDQUFDO1FBSTlCLHVCQUFrQixHQUN0QixJQUFJLFlBQVksRUFBNEIsQ0FBQztRQUV4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LENBQUMsc0JBQXNCLENBQUMsV0FBVyxFQUFFLENBQUM7UUFDMUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLFdBQVcsRUFBRSxDQUFDO1FBQzFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxRQUFRLEVBQUUsQ0FBQztRQUNuQyxJQUFJLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxDQUFDO1FBQ2hDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDOUIsQ0FBQztJQUVELHdCQUF3QixDQUFDLFdBQXFDO1FBQzVELElBQUksQ0FBQyxXQUFXLEdBQUcsV0FBVyxDQUFDO0lBQ2pDLENBQUM7SUFFRCxhQUFhLENBQUMsQ0FBUyxFQUFFLElBQXFCO1FBQzVDLE9BQU8sd0JBQXdCLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDeEMsQ0FBQzs7O1lBL1NGLFNBQVM7OztZQWhCaUIsc0JBQXNCO1lBZi9DLGlCQUFpQjs7O29CQThDaEIsS0FBSztnQ0FJTCxNQUFNOzJCQVFOLEtBQUs7OEJBVUwsS0FBSzs0QkFVTCxLQUFLOzZCQVVMLEtBQUs7Z0NBVUwsS0FBSztvQ0FVTCxLQUFLOytCQVVMLEtBQUs7dUJBVUwsS0FBSzswQkFVTCxLQUFLO3lCQVlMLFNBQVMsU0FBQyxZQUFZLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO3FCQUN2QyxZQUFZLFNBQUMsWUFBWTt5QkFnQnpCLE1BQU07bUJBRU4sS0FBSyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZQYWdlU2xpZGVyLCBBamZQYWdlU2xpZGVyT3JpZW50YXRpb259IGZyb20gJ0BhamYvY29yZS9wYWdlLXNsaWRlcic7XG5pbXBvcnQge2NvZXJjZUJvb2xlYW5Qcm9wZXJ0eX0gZnJvbSAnQGFuZ3VsYXIvY2RrL2NvZXJjaW9uJztcbmltcG9ydCB7XG4gIEFmdGVyVmlld0NoZWNrZWQsXG4gIEFmdGVyVmlld0luaXQsXG4gIENoYW5nZURldGVjdG9yUmVmLFxuICBEaXJlY3RpdmUsXG4gIEV2ZW50RW1pdHRlcixcbiAgSW5wdXQsXG4gIE9uRGVzdHJveSxcbiAgT3V0cHV0LFxuICBRdWVyeUxpc3QsXG4gIFZpZXdDaGlsZCxcbiAgVmlld0NoaWxkcmVuXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVsYXlXaGVuLCBtYXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybUZpZWxkfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7QWpmRm9ybUluaXRTdGF0dXMsIEFqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5cbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3NsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuXG5leHBvcnQgY2xhc3MgQWpmRm9ybUFjdGlvbkV2ZW50IHtcbiAgc291cmNlOiBBamZGb3JtUmVuZGVyZXI7XG4gIHZhbHVlOiBPYmplY3Q7XG4gIGFjdGlvbjogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZGb3JtUmVuZGVyZXIgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvLyBmb3JtR3JvdXAgaXMgYW4gT2JzZXJ2YWJsZSBGb3JtR3JvdXAgdHlwZVxuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8Rm9ybUdyb3VwfG51bGw+O1xuXG4gIC8vICBzbGlkZXMgaXMgYW4gb2JzZXJ2YWJsZSBBamZTbGlkZSBhcnJheSB0eXBlXG4gIHJlYWRvbmx5IHNsaWRlczogT2JzZXJ2YWJsZTxBamZTbGlkZUluc3RhbmNlW10+O1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcmVhZG9ubHkgZXJyb3JzOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHJlYWRvbmx5IGZvcm1Jc0luaXQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLy8gYWpmRmllbGRUeXBlcyBbIFRleHQsIE51bWJlciwgQm9vbGVhbiwgU2luZ2xlQ2hvaWNlLCBNdWx0aXBsZUNob2ljZSxcbiAgLy8gRm9ybXVsYSwgRW1wdHksIENvbXBvc2VkLCBMRU5HVEggXVxuICByZWFkb25seSBhamZGaWVsZFR5cGVzID0gQWpmRmllbGRUeXBlO1xuXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgb3JpZW50YXRpb25DaGFuZ2U6IE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5hc09ic2VydmFibGUoKTtcblxuICBwcml2YXRlIF9zYXZlRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IHNhdmVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZURpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBzYXZlRGlzYWJsZWQoc2F2ZURpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2F2ZURpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHNhdmVEaXNhYmxlZCk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNTdGFydE1lc3NhZ2UgPSBmYWxzZTtcbiAgZ2V0IGhhc1N0YXJ0TWVzc2FnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzU3RhcnRNZXNzYWdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoYXNTdGFydE1lc3NhZ2UoaGFzU3RhcnRNZXNzYWdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzU3RhcnRNZXNzYWdlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhhc1N0YXJ0TWVzc2FnZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNFbmRNZXNzYWdlID0gZmFsc2U7XG4gIGdldCBoYXNFbmRNZXNzYWdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNFbmRNZXNzYWdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoYXNFbmRNZXNzYWdlKGhhc0VuZE1lc3NhZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNFbmRNZXNzYWdlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhhc0VuZE1lc3NhZ2UpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZVRvcFRvb2xiYXIgPSBmYWxzZTtcbiAgZ2V0IGhpZGVUb3BUb29sYmFyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlVG9wVG9vbGJhcjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGlkZVRvcFRvb2xiYXIoaGlkZVRvcFRvb2xiYXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlVG9wVG9vbGJhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlVG9wVG9vbGJhcik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlQm90dG9tVG9vbGJhciA9IGZhbHNlO1xuICBnZXQgaGlkZUJvdHRvbXBUb29sYmFyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlQm90dG9tVG9vbGJhcjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGlkZUJvdHRvbVRvb2xiYXIoaGlkZUJvdHRvbVRvb2xiYXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlQm90dG9tVG9vbGJhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlQm90dG9tVG9vbGJhcik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBmYWxzZTtcbiAgZ2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoaGlkZU5hdmlnYXRpb25CdXR0b25zOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9maXhlZE9yaWVudGF0aW9uID0gZmFsc2U7XG4gIGdldCBmaXhlZE9yaWVudGF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZE9yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaXhlZE9yaWVudGF0aW9uKGZpeGVkT3JpZW50YXRpb246IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXhlZE9yaWVudGF0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGZpeGVkT3JpZW50YXRpb24pO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVhZG9ubHkgPSBmYWxzZTtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICBnZXQgb3JpZW50YXRpb24oKTogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pIHtcbiAgICBpZiAob3JpZW50YXRpb24gIT09ICdob3Jpem9udGFsJyAmJiBvcmllbnRhdGlvbiAhPT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3JpZW50YXRpb24gIT09IHRoaXMuX29yaWVudGF0aW9uKSB7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5lbWl0KHRoaXMuX29yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBAVmlld0NoaWxkKCdmb3JtU2xpZGVyJywge3N0YXRpYzogZmFsc2V9KSBmb3JtU2xpZGVyOiBBamZQYWdlU2xpZGVyO1xuICBAVmlld0NoaWxkcmVuKEFqZkZvcm1GaWVsZCkgZmllbGRzOiBRdWVyeUxpc3Q8QWpmRm9ybUZpZWxkPjtcblxuICBwcml2YXRlIF9lcnJvck1vdmVFdmVudDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8vIF9lcnJvclBvc2l0aW9ucyBpcyBhIHByaXZhdGUgc3ViamVjdCBzdHJ1Y3R1cmUgdGhhdCBjb250YWlucyBuZXh0IGFuZCBwcmV2XG4gIHByaXZhdGUgX2Vycm9yUG9zaXRpb25zOiBPYnNlcnZhYmxlPG51bWJlcltdPjtcblxuICAvLyBfZm9ybSBpcyBhIHByaXZhdGUgYWpGRm9ybVxuICBwcml2YXRlIF9mb3JtOiBBamZGb3JtO1xuICAvLyBfaW5pdCBpcyBhIHByaXZhdGUgYm9vbGVhblxuICBwcml2YXRlIF9pbml0ID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBfbmV4dFNsaWRlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG4gIHByaXZhdGUgX2Vycm9yTW92ZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuXG4gIHByaXZhdGUgX2Zvcm1BY3Rpb246IEV2ZW50RW1pdHRlcjxBamZGb3JtQWN0aW9uRXZlbnQ+ID0gbmV3IEV2ZW50RW1pdHRlcjxBamZGb3JtQWN0aW9uRXZlbnQ+KCk7XG4gIEBPdXRwdXQoKSByZWFkb25seSBmb3JtQWN0aW9uOiBPYnNlcnZhYmxlPEFqZkZvcm1BY3Rpb25FdmVudD4gPSB0aGlzLl9mb3JtQWN0aW9uLmFzT2JzZXJ2YWJsZSgpO1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmb3JtKGZvcm06IEFqZkZvcm0pIHtcbiAgICB0aGlzLl9mb3JtID0gZm9ybTtcblxuICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICB0aGlzLl9yZW5kZXJlclNlcnZpY2Uuc2V0Rm9ybSh0aGlzLl9mb3JtKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBjb25zdHJ1Y3RvciB3aWxsIGluaXQgY3VycmVudCBmb3JtdWxhIGJ5IGFqZkJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX3JlbmRlcmVyU2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICAgIHByb3RlY3RlZCBfY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmKSB7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSBfcmVuZGVyZXJTZXJ2aWNlLmZvcm1Hcm91cDtcbiAgICB0aGlzLnNsaWRlcyA9IF9yZW5kZXJlclNlcnZpY2Uubm9kZXNUcmVlO1xuICAgIHRoaXMuX2Vycm9yUG9zaXRpb25zID0gX3JlbmRlcmVyU2VydmljZS5lcnJvclBvc2l0aW9ucztcbiAgICB0aGlzLmVycm9ycyA9IF9yZW5kZXJlclNlcnZpY2UuZXJyb3JzO1xuICAgIHRoaXMuc2xpZGVzTnVtID0gX3JlbmRlcmVyU2VydmljZS5zbGlkZXNOdW07XG4gICAgdGhpcy5mb3JtSXNJbml0ID1cbiAgICAgICAgX3JlbmRlcmVyU2VydmljZS5mb3JtSW5pdEV2ZW50LnBpcGUobWFwKGUgPT4gZSA9PT0gQWpmRm9ybUluaXRTdGF0dXMuQ29tcGxldGUpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNjcm9sbCB0byBuZXh0IGVycm9yIHJlY2VpdmVkIGJ5IHN1YnNjcmliZVxuICAgKi9cbiAgZ29Ub05leHRFcnJvcigpOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvck1vdmVFdmVudC5lbWl0KHRydWUpO1xuICB9XG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNjcm9sbCB0byBwcmV2IGVycm9yIHJlY2VpdmVkIGJ5IHN1YnNjcmliZVxuICAgKi9cbiAgZ29Ub1ByZXZFcnJvcigpOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvck1vdmVFdmVudC5lbWl0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGFkZCBncm91cFxuICAgKi9cbiAgYWRkR3JvdXAobm9kZUdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZXxBamZTbGlkZUluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRoaXMuX3JlbmRlcmVyU2VydmljZS5hZGRHcm91cChub2RlR3JvdXAgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5V2hlbigoKSA9PiB0aGlzLmZvcm1TbGlkZXIucGFnZVNjcm9sbEZpbmlzaCksXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe2RpcjogJ2Rvd24nfSk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICAoX2UpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHJlbW92ZSBncm91cFxuICAgKi9cbiAgcmVtb3ZlR3JvdXAobm9kZUdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZXxBamZTbGlkZUluc3RhbmNlfEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UpOiB2b2lkIHtcbiAgICBsZXQgcyA9IHRoaXMuX3JlbmRlcmVyU2VydmljZS5yZW1vdmVHcm91cChub2RlR3JvdXAgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UpXG4gICAgICAgICAgICAgICAgLnBpcGUoXG4gICAgICAgICAgICAgICAgICAgIGRlbGF5V2hlbigoKSA9PiB0aGlzLmZvcm1TbGlkZXIucGFnZVNjcm9sbEZpbmlzaCksXG4gICAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAuc3Vic2NyaWJlKFxuICAgICAgICAgICAgICAgICAgICAocikgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIGlmIChyICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe2RpcjogJ3VwJ30pO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgKF9lKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gIH1cblxuICBvblNhdmUoX2V2dDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5lbWl0KFxuICAgICAgICB7c291cmNlOiB0aGlzLCBhY3Rpb246ICdzYXZlJywgdmFsdWU6IHRoaXMuX3JlbmRlcmVyU2VydmljZS5nZXRGb3JtVmFsdWUoKX0pO1xuICB9XG5cbiAgb25Gb3JtQWN0aW9uKF9ldnQ6IGFueSwgYWN0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmVtaXQoXG4gICAgICAgIHtzb3VyY2U6IHRoaXMsIHZhbHVlOiB0aGlzLl9yZW5kZXJlclNlcnZpY2UuZ2V0Rm9ybVZhbHVlKCksIGFjdGlvbjogYWN0aW9ufSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzZXQgY3VycmVudCBmb3JtIGluIHJlZGVyZXIgc2VydmljZSB3aGVuIGluaXQgZm9ybVxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb3JtICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyU2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2luaXQgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuXG4gICAgICB0aGlzLl9lcnJvck1vdmVTdWJzY3JpcHRpb24gPVxuICAgICAgICAgICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9lcnJvck1vdmVFdmVudClcbiAgICAgICAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fZXJyb3JQb3NpdGlvbnMpKVxuICAgICAgICAgICAgICAuc3Vic2NyaWJlKChbbW92ZSwgZXJyc10pID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmZvcm1TbGlkZXIuY3VycmVudFBhZ2UgLSAoK3RoaXMuaGFzU3RhcnRNZXNzYWdlKSArIDE7XG4gICAgICAgICAgICAgICAgaWYgKGVycnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjb25zdCBlcnJvcnMgPSBlcnJzIGFzIG51bWJlcltdO1xuXG4gICAgICAgICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgbGV0IHByZXZJZHggPSAtMTtcbiAgICAgICAgICAgICAgICBsZXQgbmV4dElkeCA9IC0xO1xuICAgICAgICAgICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICAgICAgICAgIGxldCBlcnJvcnNMZW4gPSBlcnJvcnMubGVuZ3RoO1xuICAgICAgICAgICAgICAgIHdoaWxlICghZm91bmQgJiYgaWR4IDwgZXJyb3JzTGVuKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoZXJyb3JzW2lkeF0gPT0gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgcHJldklkeCA9IGlkeCA+IDAgPyBpZHggLSAxIDogZXJyb3JzTGVuIC0gMTtcbiAgICAgICAgICAgICAgICAgICAgbmV4dElkeCA9IGlkeCA8IGVycm9yc0xlbiAtIDEgPyBpZHggKyAxIDogMDtcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3JzW2lkeF0gPiBjdXJyZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICAgICAgICBwcmV2SWR4ID0gaWR4ID4gMCA/IGlkeCAtIDEgOiBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICAgICAgICBuZXh0SWR4ID0gaWR4O1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgICAgICAgIHByZXZJZHggPSBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICAgICAgbmV4dElkeCA9IDA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHt0bzogbW92ZSA/IGVycm9yc1tuZXh0SWR4XSAtIDEgOiBlcnJvcnNbcHJldklkeF0gLSAxfSk7XG4gICAgICAgICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9uZXh0U2xpZGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lcnJvck1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Vycm9yTW92ZUV2ZW50LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gIH1cblxuICB0cmFja05vZGVCeUlkKF86IG51bWJlciwgbm9kZTogQWpmTm9kZUluc3RhbmNlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGUpO1xuICB9XG59XG4iXX0=