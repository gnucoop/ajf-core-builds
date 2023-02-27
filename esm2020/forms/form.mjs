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
        /**
         * The available ajf field types.
         */
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
        this.formIsInit = _rendererService.formInitEvent.pipe(map(e => e === 1 /* AjfFormInitStatus.Complete */));
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
            .subscribe({
            next: r => {
                if (r && this.formSlider != null) {
                    this.formSlider.slide({ dir: 'down' });
                }
            },
            error: _e => {
                if (s) {
                    s.unsubscribe();
                }
            },
            complete: () => {
                if (s) {
                    s.unsubscribe();
                }
            },
        });
    }
    /**
     * this method will remove group
     */
    removeGroup(nodeGroup) {
        let s = this._rendererService
            .removeGroup(nodeGroup)
            .pipe(delayWhen(() => this.formSlider.pageScrollFinish))
            .subscribe({
            next: r => {
                if (r && this.formSlider != null) {
                    this.formSlider.slide({ dir: 'up' });
                }
            },
            error: _e => {
                if (s) {
                    s.unsubscribe();
                }
            },
            complete: () => {
                if (s) {
                    s.unsubscribe();
                }
            },
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
AjfFormRenderer.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormRenderer, deps: [{ token: i1.AjfFormRendererService }, { token: i0.ChangeDetectorRef }], target: i0.ɵɵFactoryTarget.Directive });
AjfFormRenderer.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfFormRenderer, inputs: { title: "title", saveDisabled: "saveDisabled", hasStartMessage: "hasStartMessage", hasEndMessage: "hasEndMessage", hideTopToolbar: "hideTopToolbar", hideBottomToolbar: "hideBottomToolbar", hideNavigationButtons: "hideNavigationButtons", fixedOrientation: "fixedOrientation", readonly: "readonly", orientation: "orientation", form: "form" }, outputs: { orientationChange: "orientationChange", formAction: "formAction" }, viewQueries: [{ propertyName: "formSlider", first: true, predicate: ["formSlider"], descendants: true }, { propertyName: "fields", predicate: AjfFormField, descendants: true }], ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfFormRenderer, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFJTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4sU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTlELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFHckMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBTTNELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHFEQUFxRCxDQUFDOzs7QUFTN0YsTUFBTSxPQUFnQixlQUFlO0lBOEpuQzs7T0FFRztJQUNILFlBQ1UsZ0JBQXdDLEVBQ3RDLGtCQUFxQztRQUR2QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUFwSmpEOztXQUVHO1FBQ00sa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFFN0IsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUVwQix1QkFBa0IsR0FDeEIsSUFBSSxZQUFZLEVBQTRCLENBQUM7UUFFdEMsc0JBQWlCLEdBQXlDLElBQUk7YUFDcEUsa0JBQTBELENBQUM7UUFFdEQsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFVL0IscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBVXpCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBVXZCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FBVXhCLHVCQUFrQixHQUFH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LENBQUMsUUFBUSxFQUFFLENBQUM7UUFDaEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUM5QixDQUFDO0lBRUQsYUFBYSxDQUFDLEtBQXVCO1FBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxFQUFDLENBQUMsQ0FBQztJQUNsRCxDQUFDO0lBRUQsd0JBQXdCLENBQUMsV0FBcUM7UUFDNUQsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztJQUVELGFBQWEsQ0FBQyxDQUFTLEVBQUUsSUFBcUI7UUFDNUMsT0FBTyx3QkFBd0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN4QyxDQUFDOzs0R0F6VW1CLGVBQWU7Z0dBQWYsZUFBZSw2akJBNkhyQixZQUFZOzJGQTdITixlQUFlO2tCQURwQyxTQUFTOzZJQXFCQyxLQUFLO3NCQUFiLEtBQUs7Z0JBS0csaUJBQWlCO3NCQUR6QixNQUFNO2dCQVNILFlBQVk7c0JBRGYsS0FBSztnQkFXRixlQUFlO3NCQURsQixLQUFLO2dCQVdGLGFBQWE7c0JBRGhCLEtBQUs7Z0JBV0YsY0FBYztzQkFEakIsS0FBSztnQkFXRixpQkFBaUI7c0JBRHBCLEtBQUs7Z0JBV0YscUJBQXFCO3NCQUR4QixLQUFLO2dCQVdGLGdCQUFnQjtzQkFEbkIsS0FBSztnQkFXRixRQUFRO3NCQURYLEtBQUs7Z0JBV0YsV0FBVztzQkFEZCxLQUFLO2dCQVlvQyxVQUFVO3NCQUFuRCxTQUFTO3VCQUFDLFlBQVksRUFBRSxFQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUM7Z0JBQ1osTUFBTTtzQkFBakMsWUFBWTt1QkFBQyxZQUFZO2dCQXFCakIsVUFBVTtzQkFEbEIsTUFBTTtnQkFLSCxJQUFJO3NCQURQLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlciwgQWpmUGFnZVNsaWRlck9yaWVudGF0aW9ufSBmcm9tICdAYWpmL2NvcmUvcGFnZS1zbGlkZXInO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1VudHlwZWRGb3JtR3JvdXB9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgU3Vic2NyaXB0aW9ufSBmcm9tICdyeGpzJztcbmltcG9ydCB7ZGVsYXlXaGVuLCBtYXAsIHdpdGhMYXRlc3RGcm9tfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmRm9ybUZpZWxkfSBmcm9tICcuL2ZpZWxkJztcbmltcG9ydCB7QWpmRm9ybUluaXRTdGF0dXMsIEFqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5cbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZvcm19IGZyb20gJy4vaW50ZXJmYWNlL2Zvcm1zL2Zvcm0nO1xuaW1wb3J0IHtBamZOb2RlR3JvdXBJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtZ3JvdXAtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvc2xpZGVzLWluc3RhbmNlcy9yZXBlYXRpbmctc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3NsaWRlLWluc3RhbmNlJztcbmltcG9ydCB7bm9kZUluc3RhbmNlQ29tcGxldGVOYW1lfSBmcm9tICcuL3V0aWxzL25vZGVzLWluc3RhbmNlcy9ub2RlLWluc3RhbmNlLWNvbXBsZXRlLW5hbWUnO1xuXG5leHBvcnQgaW50ZXJmYWNlIEFqZkZvcm1BY3Rpb25FdmVudCB7XG4gIHNvdXJjZTogQWpmRm9ybVJlbmRlcmVyO1xuICB2YWx1ZTogT2JqZWN0O1xuICBhY3Rpb246IHN0cmluZztcbn1cblxuQERpcmVjdGl2ZSgpXG5leHBvcnQgYWJzdHJhY3QgY2xhc3MgQWpmRm9ybVJlbmRlcmVyIGltcGxlbWVudHMgQWZ0ZXJWaWV3Q2hlY2tlZCwgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcbiAgLyoqXG4gICAqIGZvcm1Hcm91cCBpcyBhbiBPYnNlcnZhYmxlIEZvcm1Hcm91cCB0eXBlXG4gICAqL1xuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8VW50eXBlZEZvcm1Hcm91cCB8IG51bGw+O1xuXG4gIC8qKlxuICAgKiBzbGlkZXMgaXMgYW4gb2JzZXJ2YWJsZSBBamZTbGlkZSBhcnJheSB0eXBlXG4gICAqL1xuICByZWFkb25seSBzbGlkZXM6IE9ic2VydmFibGU8QWpmU2xpZGVJbnN0YW5jZVtdPjtcblxuICByZWFkb25seSBzbGlkZXNOdW06IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcmVhZG9ubHkgZXJyb3JzOiBPYnNlcnZhYmxlPG51bWJlcj47XG4gIHJlYWRvbmx5IGZvcm1Jc0luaXQ6IE9ic2VydmFibGU8Ym9vbGVhbj47XG5cbiAgLyoqXG4gICAqIFRoZSBhdmFpbGFibGUgYWpmIGZpZWxkIHR5cGVzLlxuICAgKi9cbiAgcmVhZG9ubHkgYWpmRmllbGRUeXBlcyA9IEFqZkZpZWxkVHlwZTtcblxuICBASW5wdXQoKSB0aXRsZTogc3RyaW5nID0gJyc7XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb25DaGFuZ2U6IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID1cbiAgICBuZXcgRXZlbnRFbWl0dGVyPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IG9yaWVudGF0aW9uQ2hhbmdlOiBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj4gPSB0aGlzXG4gICAgLl9vcmllbnRhdGlvbkNoYW5nZSBhcyBPYnNlcnZhYmxlPEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbj47XG5cbiAgcHJpdmF0ZSBfc2F2ZURpc2FibGVkOiBib29sZWFuID0gZmFsc2U7XG4gIGdldCBzYXZlRGlzYWJsZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3NhdmVEaXNhYmxlZDtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc2F2ZURpc2FibGVkKHNhdmVEaXNhYmxlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX3NhdmVEaXNhYmxlZCA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShzYXZlRGlzYWJsZWQpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzU3RhcnRNZXNzYWdlID0gZmFsc2U7XG4gIGdldCBoYXNTdGFydE1lc3NhZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc1N0YXJ0TWVzc2FnZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGFzU3RhcnRNZXNzYWdlKGhhc1N0YXJ0TWVzc2FnZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc1N0YXJ0TWVzc2FnZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoYXNTdGFydE1lc3NhZ2UpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGFzRW5kTWVzc2FnZSA9IGZhbHNlO1xuICBnZXQgaGFzRW5kTWVzc2FnZSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGFzRW5kTWVzc2FnZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGFzRW5kTWVzc2FnZShoYXNFbmRNZXNzYWdlOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGFzRW5kTWVzc2FnZSA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoYXNFbmRNZXNzYWdlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVUb3BUb29sYmFyID0gZmFsc2U7XG4gIGdldCBoaWRlVG9wVG9vbGJhcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZVRvcFRvb2xiYXI7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhpZGVUb3BUb29sYmFyKGhpZGVUb3BUb29sYmFyOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZVRvcFRvb2xiYXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZVRvcFRvb2xiYXIpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZUJvdHRvbVRvb2xiYXIgPSBmYWxzZTtcbiAgZ2V0IGhpZGVCb3R0b21wVG9vbGJhcigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5faGlkZUJvdHRvbVRvb2xiYXI7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhpZGVCb3R0b21Ub29sYmFyKGhpZGVCb3R0b21Ub29sYmFyOiBib29sZWFuKSB7XG4gICAgdGhpcy5faGlkZUJvdHRvbVRvb2xiYXIgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZUJvdHRvbVRvb2xiYXIpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfaGlkZU5hdmlnYXRpb25CdXR0b25zID0gZmFsc2U7XG4gIGdldCBoaWRlTmF2aWdhdGlvbkJ1dHRvbnMoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucztcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKGhpZGVOYXZpZ2F0aW9uQnV0dG9uczogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucyA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShoaWRlTmF2aWdhdGlvbkJ1dHRvbnMpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZml4ZWRPcmllbnRhdGlvbiA9IGZhbHNlO1xuICBnZXQgZml4ZWRPcmllbnRhdGlvbigpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fZml4ZWRPcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgZml4ZWRPcmllbnRhdGlvbihmaXhlZE9yaWVudGF0aW9uOiBib29sZWFuKSB7XG4gICAgdGhpcy5fZml4ZWRPcmllbnRhdGlvbiA9IGNvZXJjZUJvb2xlYW5Qcm9wZXJ0eShmaXhlZE9yaWVudGF0aW9uKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX3JlYWRvbmx5ID0gZmFsc2U7XG4gIGdldCByZWFkb25seSgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5fcmVhZG9ubHk7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHJlYWRvbmx5KHJlYWRvbmx5OiBib29sZWFuKSB7XG4gICAgdGhpcy5fcmVhZG9ubHkgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkocmVhZG9ubHkpO1xuICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICB9XG5cbiAgcHJpdmF0ZSBfb3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiA9ICdob3Jpem9udGFsJztcbiAgZ2V0IG9yaWVudGF0aW9uKCk6IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbiB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWVudGF0aW9uO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBvcmllbnRhdGlvbihvcmllbnRhdGlvbjogQWpmUGFnZVNsaWRlck9yaWVudGF0aW9uKSB7XG4gICAgaWYgKG9yaWVudGF0aW9uICE9PSAnaG9yaXpvbnRhbCcgJiYgb3JpZW50YXRpb24gIT09ICd2ZXJ0aWNhbCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG9yaWVudGF0aW9uICE9PSB0aGlzLl9vcmllbnRhdGlvbikge1xuICAgICAgdGhpcy5fb3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgdGhpcy5fb3JpZW50YXRpb25DaGFuZ2UuZW1pdCh0aGlzLl9vcmllbnRhdGlvbik7XG4gICAgfVxuICB9XG5cbiAgQFZpZXdDaGlsZCgnZm9ybVNsaWRlcicsIHtzdGF0aWM6IGZhbHNlfSkgZm9ybVNsaWRlciE6IEFqZlBhZ2VTbGlkZXI7XG4gIEBWaWV3Q2hpbGRyZW4oQWpmRm9ybUZpZWxkKSBmaWVsZHMhOiBRdWVyeUxpc3Q8QWpmRm9ybUZpZWxkPjtcblxuICBwcml2YXRlIF9lcnJvck1vdmVFdmVudDogRXZlbnRFbWl0dGVyPGJvb2xlYW4+ID0gbmV3IEV2ZW50RW1pdHRlcjxib29sZWFuPigpO1xuXG4gIC8qKlxuICAgKiBJcyBhIHByaXZhdGUgc3ViamVjdCBzdHJ1Y3R1cmUgdGhhdCBjb250YWlucyBuZXh0IGFuZCBwcmV2XG4gICAqL1xuICBwcml2YXRlIF9lcnJvclBvc2l0aW9uczogT2JzZXJ2YWJsZTxudW1iZXJbXT47XG5cbiAgLyoqXG4gICAqIGlzIGEgcHJpdmF0ZSBBamZGb3JtXG4gICAqL1xuICBwcml2YXRlIF9mb3JtOiBBamZGb3JtIHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgX2luaXQgPSBmYWxzZTtcblxuICBwcml2YXRlIF9uZXh0U2xpZGVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcbiAgcHJpdmF0ZSBfZXJyb3JNb3ZlU3Vic2NyaXB0aW9uOiBTdWJzY3JpcHRpb24gPSBTdWJzY3JpcHRpb24uRU1QVFk7XG5cbiAgcHJpdmF0ZSBfZm9ybUFjdGlvbjogRXZlbnRFbWl0dGVyPEFqZkZvcm1BY3Rpb25FdmVudD4gPSBuZXcgRXZlbnRFbWl0dGVyPEFqZkZvcm1BY3Rpb25FdmVudD4oKTtcbiAgQE91dHB1dCgpXG4gIHJlYWRvbmx5IGZvcm1BY3Rpb246IE9ic2VydmFibGU8QWpmRm9ybUFjdGlvbkV2ZW50PiA9IHRoaXNcbiAgICAuX2Zvcm1BY3Rpb24gYXMgT2JzZXJ2YWJsZTxBamZGb3JtQWN0aW9uRXZlbnQ+O1xuXG4gIEBJbnB1dCgpXG4gIHNldCBmb3JtKGZvcm06IEFqZkZvcm0pIHtcbiAgICB0aGlzLl9mb3JtID0gZm9ybTtcblxuICAgIGlmICh0aGlzLl9pbml0KSB7XG4gICAgICB0aGlzLl9yZW5kZXJlclNlcnZpY2Uuc2V0Rm9ybSh0aGlzLl9mb3JtKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBjb25zdHJ1Y3RvciB3aWxsIGluaXQgY3VycmVudCBmb3JtdWxhIGJ5IGFqZkJ1aWxkZXJTZXJ2aWNlXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBwcml2YXRlIF9yZW5kZXJlclNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgcHJvdGVjdGVkIF9jaGFuZ2VEZXRlY3RvclJlZjogQ2hhbmdlRGV0ZWN0b3JSZWYsXG4gICkge1xuICAgIHRoaXMuZm9ybUdyb3VwID0gX3JlbmRlcmVyU2VydmljZS5mb3JtR3JvdXA7XG4gICAgdGhpcy5zbGlkZXMgPSBfcmVuZGVyZXJTZXJ2aWNlLm5vZGVzVHJlZTtcbiAgICB0aGlzLl9lcnJvclBvc2l0aW9ucyA9IF9yZW5kZXJlclNlcnZpY2UuZXJyb3JQb3NpdGlvbnM7XG4gICAgdGhpcy5lcnJvcnMgPSBfcmVuZGVyZXJTZXJ2aWNlLmVycm9ycztcbiAgICB0aGlzLnNsaWRlc051bSA9IF9yZW5kZXJlclNlcnZpY2Uuc2xpZGVzTnVtO1xuICAgIHRoaXMuZm9ybUlzSW5pdCA9IF9yZW5kZXJlclNlcnZpY2UuZm9ybUluaXRFdmVudC5waXBlKFxuICAgICAgbWFwKGUgPT4gZSA9PT0gQWpmRm9ybUluaXRTdGF0dXMuQ29tcGxldGUpLFxuICAgICk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzY3JvbGwgdG8gbmV4dCBlcnJvciByZWNlaXZlZCBieSBzdWJzY3JpYmVcbiAgICovXG4gIGdvVG9OZXh0RXJyb3IoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuZW1pdCh0cnVlKTtcbiAgfVxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzY3JvbGwgdG8gcHJldiBlcnJvciByZWNlaXZlZCBieSBzdWJzY3JpYmVcbiAgICovXG4gIGdvVG9QcmV2RXJyb3IoKTogdm9pZCB7XG4gICAgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuZW1pdChmYWxzZSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBhZGQgZ3JvdXBcbiAgICovXG4gIGFkZEdyb3VwKG5vZGVHcm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZTbGlkZUluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSk6IHZvaWQge1xuICAgIGxldCBzID0gdGhpcy5fcmVuZGVyZXJTZXJ2aWNlXG4gICAgICAuYWRkR3JvdXAobm9kZUdyb3VwIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlKVxuICAgICAgLnBpcGUoZGVsYXlXaGVuKCgpID0+IHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoKSlcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiByID0+IHtcbiAgICAgICAgICBpZiAociAmJiB0aGlzLmZvcm1TbGlkZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtkaXI6ICdkb3duJ30pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IF9lID0+IHtcbiAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgcmVtb3ZlIGdyb3VwXG4gICAqL1xuICByZW1vdmVHcm91cChcbiAgICBub2RlR3JvdXA6IEFqZk5vZGVHcm91cEluc3RhbmNlIHwgQWpmU2xpZGVJbnN0YW5jZSB8IEFqZlJlcGVhdGluZ1NsaWRlSW5zdGFuY2UsXG4gICk6IHZvaWQge1xuICAgIGxldCBzID0gdGhpcy5fcmVuZGVyZXJTZXJ2aWNlXG4gICAgICAucmVtb3ZlR3JvdXAobm9kZUdyb3VwIGFzIEFqZk5vZGVHcm91cEluc3RhbmNlKVxuICAgICAgLnBpcGUoZGVsYXlXaGVuKCgpID0+IHRoaXMuZm9ybVNsaWRlci5wYWdlU2Nyb2xsRmluaXNoKSlcbiAgICAgIC5zdWJzY3JpYmUoe1xuICAgICAgICBuZXh0OiByID0+IHtcbiAgICAgICAgICBpZiAociAmJiB0aGlzLmZvcm1TbGlkZXIgIT0gbnVsbCkge1xuICAgICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtkaXI6ICd1cCd9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGVycm9yOiBfZSA9PiB7XG4gICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIGNvbXBsZXRlOiAoKSA9PiB7XG4gICAgICAgICAgaWYgKHMpIHtcbiAgICAgICAgICAgIHMudW5zdWJzY3JpYmUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgfVxuXG4gIG9uU2F2ZShfZXZ0OiBhbnkpOiB2b2lkIHtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgYWN0aW9uOiAnc2F2ZScsXG4gICAgICB2YWx1ZTogdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLmdldEZvcm1WYWx1ZSgpLFxuICAgIH0pO1xuICB9XG5cbiAgb25Gb3JtQWN0aW9uKF9ldnQ6IGFueSwgYWN0aW9uOiBzdHJpbmcpIHtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmVtaXQoe1xuICAgICAgc291cmNlOiB0aGlzLFxuICAgICAgdmFsdWU6IHRoaXMuX3JlbmRlcmVyU2VydmljZS5nZXRGb3JtVmFsdWUoKSxcbiAgICAgIGFjdGlvbjogYWN0aW9uLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIHRoaXMgbWV0aG9kIHdpbGwgc2V0IGN1cnJlbnQgZm9ybSBpbiByZWRlcmVyIHNlcnZpY2Ugd2hlbiBpbml0IGZvcm1cbiAgICovXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5fZm9ybSAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9yZW5kZXJlclNlcnZpY2Uuc2V0Rm9ybSh0aGlzLl9mb3JtKTtcbiAgICAgIHRoaXMuX2NoYW5nZURldGVjdG9yUmVmLmRldGVjdENoYW5nZXMoKTtcbiAgICB9XG4gIH1cblxuICBuZ0FmdGVyVmlld0NoZWNrZWQoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLl9pbml0ICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICB0aGlzLl9pbml0ID0gdHJ1ZTtcblxuICAgICAgdGhpcy5fZXJyb3JNb3ZlU3Vic2NyaXB0aW9uID0gKDxPYnNlcnZhYmxlPGJvb2xlYW4+PnRoaXMuX2Vycm9yTW92ZUV2ZW50KVxuICAgICAgICAucGlwZSh3aXRoTGF0ZXN0RnJvbSh0aGlzLl9lcnJvclBvc2l0aW9ucykpXG4gICAgICAgIC5zdWJzY3JpYmUoKFttb3ZlLCBlcnJzXSkgPT4ge1xuICAgICAgICAgIGNvbnN0IGN1cnJlbnRQb3NpdGlvbiA9IHRoaXMuZm9ybVNsaWRlci5jdXJyZW50UGFnZSAtICt0aGlzLmhhc1N0YXJ0TWVzc2FnZSArIDE7XG4gICAgICAgICAgaWYgKGVycnMgPT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBjb25zdCBlcnJvcnMgPSBlcnJzIGFzIG51bWJlcltdO1xuXG4gICAgICAgICAgbGV0IGZvdW5kID0gZmFsc2U7XG4gICAgICAgICAgbGV0IHByZXZJZHggPSAtMTtcbiAgICAgICAgICBsZXQgbmV4dElkeCA9IC0xO1xuICAgICAgICAgIGxldCBpZHggPSAwO1xuICAgICAgICAgIGxldCBlcnJvcnNMZW4gPSBlcnJvcnMubGVuZ3RoO1xuICAgICAgICAgIHdoaWxlICghZm91bmQgJiYgaWR4IDwgZXJyb3JzTGVuKSB7XG4gICAgICAgICAgICBpZiAoZXJyb3JzW2lkeF0gPT0gY3VycmVudFBvc2l0aW9uKSB7XG4gICAgICAgICAgICAgIGZvdW5kID0gdHJ1ZTtcbiAgICAgICAgICAgICAgcHJldklkeCA9IGlkeCA+IDAgPyBpZHggLSAxIDogZXJyb3JzTGVuIC0gMTtcbiAgICAgICAgICAgICAgbmV4dElkeCA9IGlkeCA8IGVycm9yc0xlbiAtIDEgPyBpZHggKyAxIDogMDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoZXJyb3JzW2lkeF0gPiBjdXJyZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBwcmV2SWR4ID0gaWR4ID4gMCA/IGlkeCAtIDEgOiBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICBuZXh0SWR4ID0gaWR4O1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWR4Kys7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghZm91bmQpIHtcbiAgICAgICAgICAgIHByZXZJZHggPSBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgbmV4dElkeCA9IDA7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHtcbiAgICAgICAgICAgIHRvOiBtb3ZlID8gZXJyb3JzW25leHRJZHhdIC0gMSA6IGVycm9yc1twcmV2SWR4XSAtIDEsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBuZ09uRGVzdHJveSgpOiB2b2lkIHtcbiAgICB0aGlzLl9uZXh0U2xpZGVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9lcnJvck1vdmVTdWJzY3JpcHRpb24udW5zdWJzY3JpYmUoKTtcbiAgICB0aGlzLl9vcmllbnRhdGlvbkNoYW5nZS5jb21wbGV0ZSgpO1xuICAgIHRoaXMuX2Vycm9yTW92ZUV2ZW50LmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZm9ybUFjdGlvbi5jb21wbGV0ZSgpO1xuICB9XG5cbiAgc2Nyb2xsVG9TbGlkZShzbGlkZTogQWpmU2xpZGVJbnN0YW5jZSk6IHZvaWQge1xuICAgIHRoaXMuZm9ybVNsaWRlci5zbGlkZSh7dG86IHNsaWRlLnBvc2l0aW9uIC0gMX0pO1xuICB9XG5cbiAgb3JpZW50YXRpb25DaGFuZ2VIYW5kbGVyKG9yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24pOiB2b2lkIHtcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gIH1cblxuICB0cmFja05vZGVCeUlkKF86IG51bWJlciwgbm9kZTogQWpmTm9kZUluc3RhbmNlKTogc3RyaW5nIHtcbiAgICByZXR1cm4gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKG5vZGUpO1xuICB9XG59XG4iXX0=