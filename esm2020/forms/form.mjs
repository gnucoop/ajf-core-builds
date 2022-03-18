import { coerceBooleanProperty } from '@angular/cdk/coercion';
import { Directive, EventEmitter, Input, Output, ViewChild, ViewChildren, } from '@angular/core';
import { Subscription } from 'rxjs';
import { delayWhen, map, withLatestFrom } from 'rxjs/operators';
import { AjfFormField } from './field';
import { AjfFieldType } from './interface/fields/field-type';
import { nodeInstanceCompleteName } from './utils/nodes-instances/node-instance-complete-name';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
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
        this.title = '';
        this._orientationChange = new EventEmitter();
        this.orientationChange = this
            ._orientationChange;
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
        this.formAction = this
            ._formAction;
        this.formGroup = _rendererService.formGroup;
        this.slides = _rendererService.nodesTree;
        this._errorPositions = _rendererService.errorPositions;
        this.errors = _rendererService.errors;
        this.slidesNum = _rendererService.slidesNum;
        this.formIsInit = _rendererService.formInitEvent.pipe(map(e => e === 1 /* Complete */));
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
        let s = this._rendererService
            .addGroup(nodeGroup)
            .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
            .subscribe(r => {
            if (r && this.formSlider != null) {
                this.formSlider.slide({ dir: 'down' });
            }
        }, _e => {
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
        let s = this._rendererService
            .removeGroup(nodeGroup)
            .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
            .subscribe(r => {
            if (r && this.formSlider != null) {
                this.formSlider.slide({ dir: 'up' });
            }
        }, _e => {
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
        this._formAction.emit({
            source: this,
            action: 'save',
            value: this._rendererService.getFormValue(),
        });
    }
    onFormAction(_evt, action) {
        this._formAction.emit({
            source: this,
            value: this._rendererService.getFormValue(),
            action: action,
        });
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
            this._errorMoveSubscription = this._errorMoveEvent
                .pipe(withLatestFrom(this._errorPositions))
                .subscribe(([move, errs]) => {
                const currentPosition = this.formSlider.currentPage - +this.hasStartMessage + 1;
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
                this.formSlider.slide({
                    to: move ? errors[nextIdx] - 1 : errors[prevIdx] - 1,
                });
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
    scrollToSlide(slide) {
        this.formSlider.slide({ to: slide.position - 1 });
    }
    orientationChangeHandler(orientation) {
        this.orientation = orientation;
    }
    trackNodeById(_, node) {
        return nodeInstanceCompleteName(node);
    }
}
AjfFormRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormRenderer, deps: [{ token: i1.AjfFormRendererService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
AjfFormRenderer.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfFormRenderer, inputs: { title: "title", saveDisabled: "saveDisabled", hasStartMessage: "hasStartMessage", hasEndMessage: "hasEndMessage", hideTopToolbar: "hideTopToolbar", hideBottomToolbar: "hideBottomToolbar", hideNavigationButtons: "hideNavigationButtons", fixedOrientation: "fixedOrientation", readonly: "readonly", orientation: "orientation", form: "form" }, outputs: { orientationChange: "orientationChange", formAction: "formAction" }, viewQueries: [{ propertyName: "formSlider", first: true, predicate: ["formSlider"], descendants: true }, { propertyName: "fields", predicate: AjfFormField, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfFormRenderer, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i1.AjfFormRendererService }, { type: i0.ChangeDetectorRef }]; }, propDecorators: { title: [{
                type: Input
            }], orientationChange: [{
                type: Output
            }], saveDisabled: [{
                type: Input
            }], hasStartMessage: [{
                type: Input
            }], hasEndMessage: [{
                type: Input
            }], hideTopToolbar: [{
                type: Input
            }], hideBottomToolbar: [{
                type: Input
            }], hideNavigationButtons: [{
                type: Input
            }], fixedOrientation: [{
                type: Input
            }], readonly: [{
                type: Input
            }], orientation: [{
                type: Input
            }], formSlider: [{
                type: ViewChild,
                args: ['formSlider', { static: false }]
            }], fields: [{
                type: ViewChildren,
                args: [AjfFormField]
            }], formAction: [{
                type: Output
            }], form: [{
                type: Input
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFJTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4sU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTlELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFHckMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBTTNELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHFEQUFxRCxDQUFDOzs7QUFTN0YsTUFBTSxPQUFnQixlQUFlO0lBb0puQzs7T0FFRztJQUNILFlBQ1UsZ0JBQXdDLEVBQ3RDLGtCQUFxQztRQUR2QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUEvSWpELHVFQUF1RTtRQUN2RSxxQ0FBcUM7UUFDNUIsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFFN0IsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUVwQix1QkFBa0IsR0FDeEIsSUFBSSxZQUFZLEVBQTRCLENBQUM7UUFFdEMsc0JBQWlCLEdBQXlDLElBQUk7YUFDcEUsa0JBQTBELENBQUM7UUFFdEQsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFVL0IscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBVXpCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBVXZCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FB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QzlCLENBQUM7SUFFRCxhQUFhLENBQUMsS0FBdUI7UUFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsRUFBQyxFQUFFLEVBQUUsS0FBSyxDQUFDLFFBQVEsR0FBRyxDQUFDLEVBQUMsQ0FBQyxDQUFDO0lBQ2xELENBQUM7SUFFRCx3QkFBd0IsQ0FBQyxXQUFxQztRQUM1RCxJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztJQUNqQyxDQUFDO0lBRUQsYUFBYSxDQUFDLENBQVMsRUFBRSxJQUFxQjtRQUM1QyxPQUFPLHdCQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3hDLENBQUM7OzRHQS9UbUIsZUFBZTtnR0FBZixlQUFlLDZqQkF1SHJCLFlBQVk7MkZBdkhOLGVBQWU7a0JBRHBDLFNBQVM7NklBZUMsS0FBSztzQkFBYixLQUFLO2dCQUtHLGlCQUFpQjtzQkFEekIsTUFBTTtnQkFTSCxZQUFZO3NCQURmLEtBQUs7Z0JBV0YsZUFBZTtzQkFEbEIsS0FBSztnQkFXRixhQUFhO3NCQURoQixLQUFLO2dCQVdGLGNBQWM7c0JBRGpCLEtBQUs7Z0JBV0YsaUJBQWlCO3NCQURwQixLQUFLO2dCQVdGLHFCQUFxQjtzQkFEeEIsS0FBSztnQkFXRixnQkFBZ0I7c0JBRG5CLEtBQUs7Z0JBV0YsUUFBUTtzQkFEWCxLQUFLO2dCQVdGLFdBQVc7c0JBRGQsS0FBSztnQkFZb0MsVUFBVTtzQkFBbkQsU0FBUzt1QkFBQyxZQUFZLEVBQUUsRUFBQyxNQUFNLEVBQUUsS0FBSyxFQUFDO2dCQUNaLE1BQU07c0JBQWpDLFlBQVk7dUJBQUMsWUFBWTtnQkFpQmpCLFVBQVU7c0JBRGxCLE1BQU07Z0JBS0gsSUFBSTtzQkFEUCxLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZlBhZ2VTbGlkZXIsIEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbn0gZnJvbSAnQGFqZi9jb3JlL3BhZ2Utc2xpZGVyJztcbmltcG9ydCB7Y29lcmNlQm9vbGVhblByb3BlcnR5fSBmcm9tICdAYW5ndWxhci9jZGsvY29lcmNpb24nO1xuaW1wb3J0IHtcbiAgQWZ0ZXJWaWV3Q2hlY2tlZCxcbiAgQWZ0ZXJWaWV3SW5pdCxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gIERpcmVjdGl2ZSxcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT25EZXN0cm95LFxuICBPdXRwdXQsXG4gIFF1ZXJ5TGlzdCxcbiAgVmlld0NoaWxkLFxuICBWaWV3Q2hpbGRyZW4sXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVsYXlXaGVuLCBtYXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybUZpZWxkfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7QWpmRm9ybUluaXRTdGF0dXMsIEFqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5cbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3NsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1BY3Rpb25FdmVudCB7XG4gIHNvdXJjZTogQWpmRm9ybVJlbmRlcmVyO1xuICB2YWx1ZTogT2JqZWN0O1xuICBhY3Rpb246IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRm9ybVJlbmRlcmVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLy8gZm9ybUdyb3VwIGlzIGFuIE9ic2VydmFibGUgRm9ybUdyb3VwIHR5cGVcbiAgcmVhZG9ubHkgZm9ybUdyb3VwOiBPYnNlcnZhYmxlPEZvcm1Hcm91cCB8IG51bGw+O1xuXG4gIC8vICBzbGlkZXMgaXMgYW4gb2JzZXJ2YWJsZSBBamZTbGlkZSBhcnJheSB0eXBlXG4gIHJlYWRvbmx5IHNsaWRlczogT2JzZXJ2YWJsZTxBamZTbGlkZUluc3RhbmNlW10+O1xuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcmVhZG9ubHkgZXJyb3JzOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHJlYWRvbmx5IGZvcm1Jc0luaXQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLy8gYWpmRmllbGRUeXBlcyBbIFRleHQsIE51bWJlciwgQm9vbGVhbiwgU2luZ2xlQ2hvaWNlLCBNdWx0aXBsZUNob2ljZSxcbiAgLy8gRm9ybXVsYSwgRW1wdHksIENvbXBvc2VkLCBMRU5HVEggXVxuICByZWFkb25seSBhamZGaWVsZFR5cGVzID0gQWpmRmllbGRUeXBlO1xuXG4gIEBJbnB1dCgpIHRpdGxlOiBzdHJpbmcgPSAnJztcblxuICBwcml2YXRlIF9vcmllbnRhdGlvbkNoYW5nZTogRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPVxuICAgIG5ldyBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgb3JpZW50YXRpb25DaGFuZ2U6IE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9IHRoaXNcbiAgICAuX29yaWVudGF0aW9uQ2hhbmdlIGFzIE9ic2VydmFibGU8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPjtcblxuICBwcml2YXRlIF9zYXZlRGlzYWJsZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgZ2V0IHNhdmVEaXNhYmxlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fc2F2ZURpc2FibGVkO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBzYXZlRGlzYWJsZWQoc2F2ZURpc2FibGVkOiBib29sZWFuKSB7XG4gICAgdGhpcy5fc2F2ZURpc2FibGVkID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHNhdmVEaXNhYmxlZCk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNTdGFydE1lc3NhZ2UgPSBmYWxzZTtcbiAgZ2V0IGhhc1N0YXJ0TWVzc2FnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzU3RhcnRNZXNzYWdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoYXNTdGFydE1lc3NhZ2UoaGFzU3RhcnRNZXNzYWdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzU3RhcnRNZXNzYWdlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhhc1N0YXJ0TWVzc2FnZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oYXNFbmRNZXNzYWdlID0gZmFsc2U7XG4gIGdldCBoYXNFbmRNZXNzYWdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNFbmRNZXNzYWdlO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoYXNFbmRNZXNzYWdlKGhhc0VuZE1lc3NhZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNFbmRNZXNzYWdlID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhhc0VuZE1lc3NhZ2UpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZVRvcFRvb2xiYXIgPSBmYWxzZTtcbiAgZ2V0IGhpZGVUb3BUb29sYmFyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlVG9wVG9vbGJhcjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGlkZVRvcFRvb2xiYXIoaGlkZVRvcFRvb2xiYXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlVG9wVG9vbGJhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlVG9wVG9vbGJhcik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlQm90dG9tVG9vbGJhciA9IGZhbHNlO1xuICBnZXQgaGlkZUJvdHRvbXBUb29sYmFyKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlQm90dG9tVG9vbGJhcjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGlkZUJvdHRvbVRvb2xiYXIoaGlkZUJvdHRvbVRvb2xiYXI6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlQm90dG9tVG9vbGJhciA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlQm90dG9tVG9vbGJhcik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBmYWxzZTtcbiAgZ2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoaGlkZU5hdmlnYXRpb25CdXR0b25zOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZU5hdmlnYXRpb25CdXR0b25zID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9maXhlZE9yaWVudGF0aW9uID0gZmFsc2U7XG4gIGdldCBmaXhlZE9yaWVudGF0aW9uKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9maXhlZE9yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBmaXhlZE9yaWVudGF0aW9uKGZpeGVkT3JpZW50YXRpb246IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9maXhlZE9yaWVudGF0aW9uID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGZpeGVkT3JpZW50YXRpb24pO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfcmVhZG9ubHkgPSBmYWxzZTtcbiAgZ2V0IHJlYWRvbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9yZWFkb25seTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgcmVhZG9ubHkocmVhZG9ubHk6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9yZWFkb25seSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShyZWFkb25seSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9vcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uID0gJ2hvcml6b250YWwnO1xuICBnZXQgb3JpZW50YXRpb24oKTogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uIHtcbiAgICByZXR1cm4gdGhpcy5fb3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IG9yaWVudGF0aW9uKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pIHtcbiAgICBpZiAob3JpZW50YXRpb24gIT09ICdob3Jpem9udGFsJyAmJiBvcmllbnRhdGlvbiAhPT0gJ3ZlcnRpY2FsJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3JpZW50YXRpb24gIT09IHRoaXMuX29yaWVudGF0aW9uKSB7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5lbWl0KHRoaXMuX29yaWVudGF0aW9uKTtcbiAgICB9XG4gIH1cblxuICBAVmlld0NoaWxkKCdmb3JtU2xpZGVyJywge3N0YXRpYzogZmFsc2V9KSBmb3JtU2xpZGVyITogQWpmUGFnZVNsaWRlcjtcbiAgQFZpZXdDaGlsZHJlbihBamZGb3JtRmllbGQpIGZpZWxkcyE6IFF1ZXJ5TGlzdDxBamZGb3JtRmllbGQ+O1xuXG4gIHByaXZhdGUgX2Vycm9yTW92ZUV2ZW50OiBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4gPSBuZXcgRXZlbnRFbWl0dGVyPGJvb2xlYW4+KCk7XG5cbiAgLy8gX2Vycm9yUG9zaXRpb25zIGlzIGEgcHJpdmF0ZSBzdWJqZWN0IHN0cnVjdHVyZSB0aGF0IGNvbnRhaW5zIG5leHQgYW5kIHByZXZcbiAgcHJpdmF0ZSBfZXJyb3JQb3NpdGlvbnM6IE9ic2VydmFibGU8bnVtYmVyW10+O1xuXG4gIC8vIF9mb3JtIGlzIGEgcHJpdmF0ZSBhakZGb3JtXG4gIHByaXZhdGUgX2Zvcm06IEFqZkZvcm0gfCB1bmRlZmluZWQ7XG4gIC8vIF9pbml0IGlzIGEgcHJpdmF0ZSBib29sZWFuXG4gIHByaXZhdGUgX2luaXQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZXJyb3JNb3ZlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZm9ybUFjdGlvbjogRXZlbnRFbWl0dGVyPEFqZkZvcm1BY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1BY3Rpb25FdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGZvcm1BY3Rpb246IE9ic2VydmFibGU8QWpmRm9ybUFjdGlvbkV2ZW50PiA9IHRoaXNcbiAgICAuX2Zvcm1BY3Rpb24gYXMgT2JzZXJ2YWJsZTxBamZGb3JtQWN0aW9uRXZlbnQ+O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmb3JtKGZvcm06IEFqZkZvcm0pIHtcbiAgICB0aGlzLl9mb3JtID0gZm9ybTtcblxuICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICB0aGlzLl9yZW5kZXJlclNlcnZpY2Uuc2V0Rm9ybSh0aGlzLl9mb3JtKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBjb25zdHJ1Y3RvciB3aWxsIGluaXQgY3VycmVudCBmb3JtdWxhIGJ5IGFqZkJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9yZW5kZXJlclNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHRoaXMuZm9ybUdyb3VwID0gX3JlbmRlcmVyU2VydmljZS5mb3JtR3JvdXA7XG4gICAgdGhpcy5zbGlkZXMgPSBfcmVuZGVyZXJTZXJ2aWNlLm5vZGVzVHJlZTtcbiAgICB0aGlzLl9lcnJvclBvc2l0aW9ucyA9IF9yZW5kZXJlclNlcnZpY2UuZXJyb3JQb3NpdGlvbnM7XG4gICAgdGhpcy5lcnJvcnMgPSBfcmVuZGVyZXJTZXJ2aWNlLmVycm9ycztcbiAgICB0aGlzLnNsaWRlc051bSA9IF9yZW5kZXJlclNlcnZpY2Uuc2xpZGVzTnVtO1xuICAgIHRoaXMuZm9ybUlzSW5pdCA9IF9yZW5kZXJlclNlcnZpY2UuZm9ybUluaXRFdmVudC5waXBlKFxuICAgICAgbWFwKGUgPT4gZSA9PT0gQWpmRm9ybUluaXRTdGF0dXMuQ29tcGxldGUpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzY3JvbGwgdG8gbmV4dCBlcnJvciByZWNlaXZlZCBieSBzdWJzY3JpYmVcbiAgICovXG4gIGdvVG9OZXh0RXJyb3IoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuZW1pdCh0cnVlKTtcbiAgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzY3JvbGwgdG8gcHJldiBlcnJvciByZWNlaXZlZCBieSBzdWJzY3JpYmVcbiAgICovXG4gIGdvVG9QcmV2RXJyb3IoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuZW1pdChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBhZGQgZ3JvdXBcbiAgICovXG4gIGFkZEdyb3VwKG5vZGVHcm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZTbGlkZUluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IHZvaWQge1xuICAgIGxldCBzID0gdGhpcy5fcmVuZGVyZXJTZXJ2aWNlXG4gICAgICAuYWRkR3JvdXAobm9kZUdyb3VwIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlKVxuICAgICAgLnBpcGUoZGVsYXlXaGVuKCgpID0+IHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoKSlcbiAgICAgIC5zdWJzY3JpYmUoXG4gICAgICAgIHIgPT4ge1xuICAgICAgICAgIGlmIChyICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe2RpcjogJ2Rvd24nfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfZSA9PiB7XG4gICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCByZW1vdmUgZ3JvdXBcbiAgICovXG4gIHJlbW92ZUdyb3VwKFxuICAgIG5vZGVHcm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZTbGlkZUluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSxcbiAgKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aGlzLl9yZW5kZXJlclNlcnZpY2VcbiAgICAgIC5yZW1vdmVHcm91cChub2RlR3JvdXAgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UpXG4gICAgICAucGlwZShkZWxheVdoZW4oKCkgPT4gdGhpcy5mb3JtU2xpZGVyLnBhZ2VTY3JvbGxGaW5pc2gpKVxuICAgICAgLnN1YnNjcmliZShcbiAgICAgICAgciA9PiB7XG4gICAgICAgICAgaWYgKHIgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHtcbiAgICAgICAgICAgIHRoaXMuZm9ybVNsaWRlci5zbGlkZSh7ZGlyOiAndXAnfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBfZSA9PiB7XG4gICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICk7XG4gIH1cblxuICBvblNhdmUoX2V2dDogYW55KTogdm9pZCB7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5lbWl0KHtcbiAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgIGFjdGlvbjogJ3NhdmUnLFxuICAgICAgdmFsdWU6IHRoaXMuX3JlbmRlcmVyU2VydmljZS5nZXRGb3JtVmFsdWUoKSxcbiAgICB9KTtcbiAgfVxuXG4gIG9uRm9ybUFjdGlvbihfZXZ0OiBhbnksIGFjdGlvbjogc3RyaW5nKSB7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5lbWl0KHtcbiAgICAgIHNvdXJjZTogdGhpcyxcbiAgICAgIHZhbHVlOiB0aGlzLl9yZW5kZXJlclNlcnZpY2UuZ2V0Rm9ybVZhbHVlKCksXG4gICAgICBhY3Rpb246IGFjdGlvbixcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNldCBjdXJyZW50IGZvcm0gaW4gcmVkZXJlciBzZXJ2aWNlIHdoZW4gaW5pdCBmb3JtXG4gICAqL1xuICBuZ0FmdGVyVmlld0luaXQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuX2Zvcm0gIT0gbnVsbCkge1xuICAgICAgdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLnNldEZvcm0odGhpcy5fZm9ybSk7XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgfVxuICB9XG5cbiAgbmdBZnRlclZpZXdDaGVja2VkKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5faW5pdCAmJiB0aGlzLmZvcm1TbGlkZXIgIT0gbnVsbCkge1xuICAgICAgdGhpcy5faW5pdCA9IHRydWU7XG5cbiAgICAgIHRoaXMuX2Vycm9yTW92ZVN1YnNjcmlwdGlvbiA9ICg8T2JzZXJ2YWJsZTxib29sZWFuPj50aGlzLl9lcnJvck1vdmVFdmVudClcbiAgICAgICAgLnBpcGUod2l0aExhdGVzdEZyb20odGhpcy5fZXJyb3JQb3NpdGlvbnMpKVxuICAgICAgICAuc3Vic2NyaWJlKChbbW92ZSwgZXJyc10pID0+IHtcbiAgICAgICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSB0aGlzLmZvcm1TbGlkZXIuY3VycmVudFBhZ2UgLSArdGhpcy5oYXNTdGFydE1lc3NhZ2UgKyAxO1xuICAgICAgICAgIGlmIChlcnJzID09IG51bGwpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgZXJyb3JzID0gZXJycyBhcyBudW1iZXJbXTtcblxuICAgICAgICAgIGxldCBmb3VuZCA9IGZhbHNlO1xuICAgICAgICAgIGxldCBwcmV2SWR4ID0gLTE7XG4gICAgICAgICAgbGV0IG5leHRJZHggPSAtMTtcbiAgICAgICAgICBsZXQgaWR4ID0gMDtcbiAgICAgICAgICBsZXQgZXJyb3JzTGVuID0gZXJyb3JzLmxlbmd0aDtcbiAgICAgICAgICB3aGlsZSAoIWZvdW5kICYmIGlkeCA8IGVycm9yc0xlbikge1xuICAgICAgICAgICAgaWYgKGVycm9yc1tpZHhdID09IGN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgIHByZXZJZHggPSBpZHggPiAwID8gaWR4IC0gMSA6IGVycm9yc0xlbiAtIDE7XG4gICAgICAgICAgICAgIG5leHRJZHggPSBpZHggPCBlcnJvcnNMZW4gLSAxID8gaWR4ICsgMSA6IDA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGVycm9yc1tpZHhdID4gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJldklkeCA9IGlkeCA+IDAgPyBpZHggLSAxIDogZXJyb3JzTGVuIC0gMTtcbiAgICAgICAgICAgICAgbmV4dElkeCA9IGlkeDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGlkeCsrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgICAgICBwcmV2SWR4ID0gZXJyb3JzTGVuIC0gMTtcbiAgICAgICAgICAgIG5leHRJZHggPSAwO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMuZm9ybVNsaWRlci5zbGlkZSh7XG4gICAgICAgICAgICB0bzogbW92ZSA/IGVycm9yc1tuZXh0SWR4XSAtIDEgOiBlcnJvcnNbcHJldklkeF0gLSAxLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbmdPbkRlc3Ryb3koKTogdm9pZCB7XG4gICAgdGhpcy5fbmV4dFNsaWRlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fZXJyb3JNb3ZlU3Vic2NyaXB0aW9uLnVuc3Vic2NyaWJlKCk7XG4gICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuY29tcGxldGUoKTtcbiAgICB0aGlzLl9lcnJvck1vdmVFdmVudC5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Zvcm1BY3Rpb24uY29tcGxldGUoKTtcbiAgfVxuXG4gIHNjcm9sbFRvU2xpZGUoc2xpZGU6IEFqZlNsaWRlSW5zdGFuY2UpOiB2b2lkIHtcbiAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe3RvOiBzbGlkZS5wb3NpdGlvbiAtIDF9KTtcbiAgfVxuXG4gIG9yaWVudGF0aW9uQ2hhbmdlSGFuZGxlcihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKTogdm9pZCB7XG4gICAgdGhpcy5vcmllbnRhdGlvbiA9IG9yaWVudGF0aW9uO1xuICB9XG5cbiAgdHJhY2tOb2RlQnlJZChfOiBudW1iZXIsIG5vZGU6IEFqZk5vZGVJbnN0YW5jZSk6IHN0cmluZyB7XG4gICAgcmV0dXJuIG5vZGVJbnN0YW5jZUNvbXBsZXRlTmFtZShub2RlKTtcbiAgfVxufVxuIl19