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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZm9ybS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NvcmUvZm9ybXMvc3JjL2Zvcm0udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBdUJBLE9BQU8sRUFBQyxxQkFBcUIsRUFBQyxNQUFNLHVCQUF1QixDQUFDO0FBQzVELE9BQU8sRUFJTCxTQUFTLEVBQ1QsWUFBWSxFQUNaLEtBQUssRUFFTCxNQUFNLEVBRU4sU0FBUyxFQUNULFlBQVksR0FDYixNQUFNLGVBQWUsQ0FBQztBQUV2QixPQUFPLEVBQWEsWUFBWSxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzlDLE9BQU8sRUFBQyxTQUFTLEVBQUUsR0FBRyxFQUFFLGNBQWMsRUFBQyxNQUFNLGdCQUFnQixDQUFDO0FBRTlELE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxTQUFTLENBQUM7QUFHckMsT0FBTyxFQUFDLFlBQVksRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBTTNELE9BQU8sRUFBQyx3QkFBd0IsRUFBQyxNQUFNLHFEQUFxRCxDQUFDOzs7QUFTN0YsTUFBTSxPQUFnQixlQUFlO0lBb0puQzs7T0FFRztJQUNILFlBQ1UsZ0JBQXdDLEVBQ3RDLGtCQUFxQztRQUR2QyxxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQXdCO1FBQ3RDLHVCQUFrQixHQUFsQixrQkFBa0IsQ0FBbUI7UUEvSWpELHVFQUF1RTtRQUN2RSxxQ0FBcUM7UUFDNUIsa0JBQWEsR0FBRyxZQUFZLENBQUM7UUFFN0IsVUFBSyxHQUFXLEVBQUUsQ0FBQztRQUVwQix1QkFBa0IsR0FDeEIsSUFBSSxZQUFZLEVBQTRCLENBQUM7UUFFdEMsc0JBQWlCLEdBQXlDLElBQUk7YUFDcEUsa0JBQTBELENBQUM7UUFFdEQsa0JBQWEsR0FBWSxLQUFLLENBQUM7UUFVL0IscUJBQWdCLEdBQUcsS0FBSyxDQUFDO1FBVXpCLG1CQUFjLEdBQUcsS0FBSyxDQUFDO1FBVXZCLG9CQUFlLEdBQUcsS0FBSyxDQUFDO1FB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b3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmUGFnZVNsaWRlciwgQWpmUGFnZVNsaWRlck9yaWVudGF0aW9ufSBmcm9tICdAYWpmL2NvcmUvcGFnZS1zbGlkZXInO1xuaW1wb3J0IHtjb2VyY2VCb29sZWFuUHJvcGVydHl9IGZyb20gJ0Bhbmd1bGFyL2Nkay9jb2VyY2lvbic7XG5pbXBvcnQge1xuICBBZnRlclZpZXdDaGVja2VkLFxuICBBZnRlclZpZXdJbml0LFxuICBDaGFuZ2VEZXRlY3RvclJlZixcbiAgRGlyZWN0aXZlLFxuICBFdmVudEVtaXR0ZXIsXG4gIElucHV0LFxuICBPbkRlc3Ryb3ksXG4gIE91dHB1dCxcbiAgUXVlcnlMaXN0LFxuICBWaWV3Q2hpbGQsXG4gIFZpZXdDaGlsZHJlbixcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Hcm91cH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBTdWJzY3JpcHRpb259IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtkZWxheVdoZW4sIG1hcCwgd2l0aExhdGVzdEZyb219IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZGb3JtRmllbGR9IGZyb20gJy4vZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtSW5pdFN0YXR1cywgQWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcblxuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4vaW50ZXJmYWNlL2ZpZWxkcy9maWVsZC10eXBlJztcbmltcG9ydCB7QWpmRm9ybX0gZnJvbSAnLi9pbnRlcmZhY2UvZm9ybXMvZm9ybSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cEluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1ncm91cC1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZk5vZGVJbnN0YW5jZX0gZnJvbSAnLi9pbnRlcmZhY2Uvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlfSBmcm9tICcuL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL3JlcGVhdGluZy1zbGlkZS1pbnN0YW5jZSc7XG5pbXBvcnQge0FqZlNsaWRlSW5zdGFuY2V9IGZyb20gJy4vaW50ZXJmYWNlL3NsaWRlcy1pbnN0YW5jZXMvc2xpZGUtaW5zdGFuY2UnO1xuaW1wb3J0IHtub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWV9IGZyb20gJy4vdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZSc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgQWpmRm9ybUFjdGlvbkV2ZW50IHtcbiAgc291cmNlOiBBamZGb3JtUmVuZGVyZXI7XG4gIHZhbHVlOiBPYmplY3Q7XG4gIGFjdGlvbjogc3RyaW5nO1xufVxuXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBBamZGb3JtUmVuZGVyZXIgaW1wbGVtZW50cyBBZnRlclZpZXdDaGVja2VkLCBBZnRlclZpZXdJbml0LCBPbkRlc3Ryb3kge1xuICAvLyBmb3JtR3JvdXAgaXMgYW4gT2JzZXJ2YWJsZSBGb3JtR3JvdXAgdHlwZVxuICByZWFkb25seSBmb3JtR3JvdXA6IE9ic2VydmFibGU8Rm9ybUdyb3VwIHwgbnVsbD47XG5cbiAgLy8gIHNsaWRlcyBpcyBhbiBvYnNlcnZhYmxlIEFqZlNsaWRlIGFycmF5IHR5cGVcbiAgcmVhZG9ubHkgc2xpZGVzOiBPYnNlcnZhYmxlPEFqZlNsaWRlSW5zdGFuY2VbXT47XG4gIHJlYWRvbmx5IHNsaWRlc051bTogT2JzZXJ2YWJsZTxudW1iZXI+O1xuICByZWFkb25seSBlcnJvcnM6IE9ic2VydmFibGU8bnVtYmVyPjtcbiAgcmVhZG9ubHkgZm9ybUlzSW5pdDogT2JzZXJ2YWJsZTxib29sZWFuPjtcblxuICAvLyBhamZGaWVsZFR5cGVzIFsgVGV4dCwgTnVtYmVyLCBCb29sZWFuLCBTaW5nbGVDaG9pY2UsIE11bHRpcGxlQ2hvaWNlLFxuICAvLyBGb3JtdWxhLCBFbXB0eSwgQ29tcG9zZWQsIExFTkdUSCBdXG4gIHJlYWRvbmx5IGFqZkZpZWxkVHlwZXMgPSBBamZGaWVsZFR5cGU7XG5cbiAgQElucHV0KCkgdGl0bGU6IHN0cmluZyA9ICcnO1xuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uQ2hhbmdlOiBFdmVudEVtaXR0ZXI8QWpmUGFnZVNsaWRlck9yaWVudGF0aW9uPiA9XG4gICAgbmV3IEV2ZW50RW1pdHRlcjxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+KCk7XG4gIEBPdXRwdXQoKVxuICByZWFkb25seSBvcmllbnRhdGlvbkNoYW5nZTogT2JzZXJ2YWJsZTxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+ID0gdGhpc1xuICAgIC5fb3JpZW50YXRpb25DaGFuZ2UgYXMgT2JzZXJ2YWJsZTxBamZQYWdlU2xpZGVyT3JpZW50YXRpb24+O1xuXG4gIHByaXZhdGUgX3NhdmVEaXNhYmxlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBnZXQgc2F2ZURpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9zYXZlRGlzYWJsZWQ7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IHNhdmVEaXNhYmxlZChzYXZlRGlzYWJsZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9zYXZlRGlzYWJsZWQgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoc2F2ZURpc2FibGVkKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc1N0YXJ0TWVzc2FnZSA9IGZhbHNlO1xuICBnZXQgaGFzU3RhcnRNZXNzYWdlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oYXNTdGFydE1lc3NhZ2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhhc1N0YXJ0TWVzc2FnZShoYXNTdGFydE1lc3NhZ2U6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oYXNTdGFydE1lc3NhZ2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGFzU3RhcnRNZXNzYWdlKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hhc0VuZE1lc3NhZ2UgPSBmYWxzZTtcbiAgZ2V0IGhhc0VuZE1lc3NhZ2UoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hhc0VuZE1lc3NhZ2U7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhhc0VuZE1lc3NhZ2UoaGFzRW5kTWVzc2FnZTogYm9vbGVhbikge1xuICAgIHRoaXMuX2hhc0VuZE1lc3NhZ2UgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGFzRW5kTWVzc2FnZSk7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9oaWRlVG9wVG9vbGJhciA9IGZhbHNlO1xuICBnZXQgaGlkZVRvcFRvb2xiYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVUb3BUb29sYmFyO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlVG9wVG9vbGJhcihoaWRlVG9wVG9vbGJhcjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVUb3BUb29sYmFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVUb3BUb29sYmFyKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVCb3R0b21Ub29sYmFyID0gZmFsc2U7XG4gIGdldCBoaWRlQm90dG9tcFRvb2xiYXIoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2hpZGVCb3R0b21Ub29sYmFyO1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCBoaWRlQm90dG9tVG9vbGJhcihoaWRlQm90dG9tVG9vbGJhcjogYm9vbGVhbikge1xuICAgIHRoaXMuX2hpZGVCb3R0b21Ub29sYmFyID0gY29lcmNlQm9vbGVhblByb3BlcnR5KGhpZGVCb3R0b21Ub29sYmFyKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2hpZGVOYXZpZ2F0aW9uQnV0dG9ucyA9IGZhbHNlO1xuICBnZXQgaGlkZU5hdmlnYXRpb25CdXR0b25zKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnM7XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGhpZGVOYXZpZ2F0aW9uQnV0dG9ucyhoaWRlTmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9oaWRlTmF2aWdhdGlvbkJ1dHRvbnMgPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoaGlkZU5hdmlnYXRpb25CdXR0b25zKTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX2ZpeGVkT3JpZW50YXRpb24gPSBmYWxzZTtcbiAgZ2V0IGZpeGVkT3JpZW50YXRpb24oKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2ZpeGVkT3JpZW50YXRpb247XG4gIH1cbiAgQElucHV0KClcbiAgc2V0IGZpeGVkT3JpZW50YXRpb24oZml4ZWRPcmllbnRhdGlvbjogYm9vbGVhbikge1xuICAgIHRoaXMuX2ZpeGVkT3JpZW50YXRpb24gPSBjb2VyY2VCb29sZWFuUHJvcGVydHkoZml4ZWRPcmllbnRhdGlvbik7XG4gICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gIH1cblxuICBwcml2YXRlIF9yZWFkb25seSA9IGZhbHNlO1xuICBnZXQgcmVhZG9ubHkoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX3JlYWRvbmx5O1xuICB9XG4gIEBJbnB1dCgpXG4gIHNldCByZWFkb25seShyZWFkb25seTogYm9vbGVhbikge1xuICAgIHRoaXMuX3JlYWRvbmx5ID0gY29lcmNlQm9vbGVhblByb3BlcnR5KHJlYWRvbmx5KTtcbiAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgfVxuXG4gIHByaXZhdGUgX29yaWVudGF0aW9uOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24gPSAnaG9yaXpvbnRhbCc7XG4gIGdldCBvcmllbnRhdGlvbigpOiBBamZQYWdlU2xpZGVyT3JpZW50YXRpb24ge1xuICAgIHJldHVybiB0aGlzLl9vcmllbnRhdGlvbjtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgb3JpZW50YXRpb24ob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbikge1xuICAgIGlmIChvcmllbnRhdGlvbiAhPT0gJ2hvcml6b250YWwnICYmIG9yaWVudGF0aW9uICE9PSAndmVydGljYWwnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChvcmllbnRhdGlvbiAhPT0gdGhpcy5fb3JpZW50YXRpb24pIHtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uID0gb3JpZW50YXRpb247XG4gICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmVtaXQodGhpcy5fb3JpZW50YXRpb24pO1xuICAgIH1cbiAgfVxuXG4gIEBWaWV3Q2hpbGQoJ2Zvcm1TbGlkZXInLCB7c3RhdGljOiBmYWxzZX0pIGZvcm1TbGlkZXIhOiBBamZQYWdlU2xpZGVyO1xuICBAVmlld0NoaWxkcmVuKEFqZkZvcm1GaWVsZCkgZmllbGRzITogUXVlcnlMaXN0PEFqZkZvcm1GaWVsZD47XG5cbiAgcHJpdmF0ZSBfZXJyb3JNb3ZlRXZlbnQ6IEV2ZW50RW1pdHRlcjxib29sZWFuPiA9IG5ldyBFdmVudEVtaXR0ZXI8Ym9vbGVhbj4oKTtcblxuICAvLyBfZXJyb3JQb3NpdGlvbnMgaXMgYSBwcml2YXRlIHN1YmplY3Qgc3RydWN0dXJlIHRoYXQgY29udGFpbnMgbmV4dCBhbmQgcHJldlxuICBwcml2YXRlIF9lcnJvclBvc2l0aW9uczogT2JzZXJ2YWJsZTxudW1iZXJbXT47XG5cbiAgLy8gX2Zvcm0gaXMgYSBwcml2YXRlIGFqRkZvcm1cbiAgcHJpdmF0ZSBfZm9ybTogQWpmRm9ybSB8IHVuZGVmaW5lZDtcbiAgLy8gX2luaXQgaXMgYSBwcml2YXRlIGJvb2xlYW5cbiAgcHJpdmF0ZSBfaW5pdCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX25leHRTbGlkZVN1YnNjcmlwdGlvbjogU3Vic2NyaXB0aW9uID0gU3Vic2NyaXB0aW9uLkVNUFRZO1xuICBwcml2YXRlIF9lcnJvck1vdmVTdWJzY3JpcHRpb246IFN1YnNjcmlwdGlvbiA9IFN1YnNjcmlwdGlvbi5FTVBUWTtcblxuICBwcml2YXRlIF9mb3JtQWN0aW9uOiBFdmVudEVtaXR0ZXI8QWpmRm9ybUFjdGlvbkV2ZW50PiA9IG5ldyBFdmVudEVtaXR0ZXI8QWpmRm9ybUFjdGlvbkV2ZW50PigpO1xuICBAT3V0cHV0KClcbiAgcmVhZG9ubHkgZm9ybUFjdGlvbjogT2JzZXJ2YWJsZTxBamZGb3JtQWN0aW9uRXZlbnQ+ID0gdGhpc1xuICAgIC5fZm9ybUFjdGlvbiBhcyBPYnNlcnZhYmxlPEFqZkZvcm1BY3Rpb25FdmVudD47XG5cbiAgQElucHV0KClcbiAgc2V0IGZvcm0oZm9ybTogQWpmRm9ybSkge1xuICAgIHRoaXMuX2Zvcm0gPSBmb3JtO1xuXG4gICAgaWYgKHRoaXMuX2luaXQpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyU2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIGNvbnN0cnVjdG9yIHdpbGwgaW5pdCBjdXJyZW50IGZvcm11bGEgYnkgYWpmQnVpbGRlclNlcnZpY2VcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgX3JlbmRlcmVyU2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICBwcm90ZWN0ZWQgX2NoYW5nZURldGVjdG9yUmVmOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgKSB7XG4gICAgdGhpcy5mb3JtR3JvdXAgPSBfcmVuZGVyZXJTZXJ2aWNlLmZvcm1Hcm91cDtcbiAgICB0aGlzLnNsaWRlcyA9IF9yZW5kZXJlclNlcnZpY2Uubm9kZXNUcmVlO1xuICAgIHRoaXMuX2Vycm9yUG9zaXRpb25zID0gX3JlbmRlcmVyU2VydmljZS5lcnJvclBvc2l0aW9ucztcbiAgICB0aGlzLmVycm9ycyA9IF9yZW5kZXJlclNlcnZpY2UuZXJyb3JzO1xuICAgIHRoaXMuc2xpZGVzTnVtID0gX3JlbmRlcmVyU2VydmljZS5zbGlkZXNOdW07XG4gICAgdGhpcy5mb3JtSXNJbml0ID0gX3JlbmRlcmVyU2VydmljZS5mb3JtSW5pdEV2ZW50LnBpcGUoXG4gICAgICBtYXAoZSA9PiBlID09PSBBamZGb3JtSW5pdFN0YXR1cy5Db21wbGV0ZSksXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNjcm9sbCB0byBuZXh0IGVycm9yIHJlY2VpdmVkIGJ5IHN1YnNjcmliZVxuICAgKi9cbiAgZ29Ub05leHRFcnJvcigpOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvck1vdmVFdmVudC5lbWl0KHRydWUpO1xuICB9XG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIHNjcm9sbCB0byBwcmV2IGVycm9yIHJlY2VpdmVkIGJ5IHN1YnNjcmliZVxuICAgKi9cbiAgZ29Ub1ByZXZFcnJvcigpOiB2b2lkIHtcbiAgICB0aGlzLl9lcnJvck1vdmVFdmVudC5lbWl0KGZhbHNlKTtcbiAgfVxuXG4gIC8qKlxuICAgKiB0aGlzIG1ldGhvZCB3aWxsIGFkZCBncm91cFxuICAgKi9cbiAgYWRkR3JvdXAobm9kZUdyb3VwOiBBamZOb2RlR3JvdXBJbnN0YW5jZSB8IEFqZlNsaWRlSW5zdGFuY2UgfCBBamZSZXBlYXRpbmdTbGlkZUluc3RhbmNlKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aGlzLl9yZW5kZXJlclNlcnZpY2VcbiAgICAgIC5hZGRHcm91cChub2RlR3JvdXAgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UpXG4gICAgICAucGlwZShkZWxheVdoZW4oKCkgPT4gdGhpcy5mb3JtU2xpZGVyLnBhZ2VTY3JvbGxGaW5pc2gpKVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IHIgPT4ge1xuICAgICAgICAgIGlmIChyICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe2RpcjogJ2Rvd24nfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBlcnJvcjogX2UgPT4ge1xuICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb21wbGV0ZTogKCkgPT4ge1xuICAgICAgICAgIGlmIChzKSB7XG4gICAgICAgICAgICBzLnVuc3Vic2NyaWJlKCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCByZW1vdmUgZ3JvdXBcbiAgICovXG4gIHJlbW92ZUdyb3VwKFxuICAgIG5vZGVHcm91cDogQWpmTm9kZUdyb3VwSW5zdGFuY2UgfCBBamZTbGlkZUluc3RhbmNlIHwgQWpmUmVwZWF0aW5nU2xpZGVJbnN0YW5jZSxcbiAgKTogdm9pZCB7XG4gICAgbGV0IHMgPSB0aGlzLl9yZW5kZXJlclNlcnZpY2VcbiAgICAgIC5yZW1vdmVHcm91cChub2RlR3JvdXAgYXMgQWpmTm9kZUdyb3VwSW5zdGFuY2UpXG4gICAgICAucGlwZShkZWxheVdoZW4oKCkgPT4gdGhpcy5mb3JtU2xpZGVyLnBhZ2VTY3JvbGxGaW5pc2gpKVxuICAgICAgLnN1YnNjcmliZSh7XG4gICAgICAgIG5leHQ6IHIgPT4ge1xuICAgICAgICAgIGlmIChyICYmIHRoaXMuZm9ybVNsaWRlciAhPSBudWxsKSB7XG4gICAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe2RpcjogJ3VwJ30pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgZXJyb3I6IF9lID0+IHtcbiAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgY29tcGxldGU6ICgpID0+IHtcbiAgICAgICAgICBpZiAocykge1xuICAgICAgICAgICAgcy51bnN1YnNjcmliZSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICB9XG5cbiAgb25TYXZlKF9ldnQ6IGFueSk6IHZvaWQge1xuICAgIHRoaXMuX2Zvcm1BY3Rpb24uZW1pdCh7XG4gICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICBhY3Rpb246ICdzYXZlJyxcbiAgICAgIHZhbHVlOiB0aGlzLl9yZW5kZXJlclNlcnZpY2UuZ2V0Rm9ybVZhbHVlKCksXG4gICAgfSk7XG4gIH1cblxuICBvbkZvcm1BY3Rpb24oX2V2dDogYW55LCBhY3Rpb246IHN0cmluZykge1xuICAgIHRoaXMuX2Zvcm1BY3Rpb24uZW1pdCh7XG4gICAgICBzb3VyY2U6IHRoaXMsXG4gICAgICB2YWx1ZTogdGhpcy5fcmVuZGVyZXJTZXJ2aWNlLmdldEZvcm1WYWx1ZSgpLFxuICAgICAgYWN0aW9uOiBhY3Rpb24sXG4gICAgfSk7XG4gIH1cblxuICAvKipcbiAgICogdGhpcyBtZXRob2Qgd2lsbCBzZXQgY3VycmVudCBmb3JtIGluIHJlZGVyZXIgc2VydmljZSB3aGVuIGluaXQgZm9ybVxuICAgKi9cbiAgbmdBZnRlclZpZXdJbml0KCk6IHZvaWQge1xuICAgIGlmICh0aGlzLl9mb3JtICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX3JlbmRlcmVyU2VydmljZS5zZXRGb3JtKHRoaXMuX2Zvcm0pO1xuICAgICAgdGhpcy5fY2hhbmdlRGV0ZWN0b3JSZWYuZGV0ZWN0Q2hhbmdlcygpO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3Q2hlY2tlZCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMuX2luaXQgJiYgdGhpcy5mb3JtU2xpZGVyICE9IG51bGwpIHtcbiAgICAgIHRoaXMuX2luaXQgPSB0cnVlO1xuXG4gICAgICB0aGlzLl9lcnJvck1vdmVTdWJzY3JpcHRpb24gPSAoPE9ic2VydmFibGU8Ym9vbGVhbj4+dGhpcy5fZXJyb3JNb3ZlRXZlbnQpXG4gICAgICAgIC5waXBlKHdpdGhMYXRlc3RGcm9tKHRoaXMuX2Vycm9yUG9zaXRpb25zKSlcbiAgICAgICAgLnN1YnNjcmliZSgoW21vdmUsIGVycnNdKSA9PiB7XG4gICAgICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gdGhpcy5mb3JtU2xpZGVyLmN1cnJlbnRQYWdlIC0gK3RoaXMuaGFzU3RhcnRNZXNzYWdlICsgMTtcbiAgICAgICAgICBpZiAoZXJycyA9PSBudWxsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGVycm9ycyA9IGVycnMgYXMgbnVtYmVyW107XG5cbiAgICAgICAgICBsZXQgZm91bmQgPSBmYWxzZTtcbiAgICAgICAgICBsZXQgcHJldklkeCA9IC0xO1xuICAgICAgICAgIGxldCBuZXh0SWR4ID0gLTE7XG4gICAgICAgICAgbGV0IGlkeCA9IDA7XG4gICAgICAgICAgbGV0IGVycm9yc0xlbiA9IGVycm9ycy5sZW5ndGg7XG4gICAgICAgICAgd2hpbGUgKCFmb3VuZCAmJiBpZHggPCBlcnJvcnNMZW4pIHtcbiAgICAgICAgICAgIGlmIChlcnJvcnNbaWR4XSA9PSBjdXJyZW50UG9zaXRpb24pIHtcbiAgICAgICAgICAgICAgZm91bmQgPSB0cnVlO1xuICAgICAgICAgICAgICBwcmV2SWR4ID0gaWR4ID4gMCA/IGlkeCAtIDEgOiBlcnJvcnNMZW4gLSAxO1xuICAgICAgICAgICAgICBuZXh0SWR4ID0gaWR4IDwgZXJyb3JzTGVuIC0gMSA/IGlkeCArIDEgOiAwO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChlcnJvcnNbaWR4XSA+IGN1cnJlbnRQb3NpdGlvbikge1xuICAgICAgICAgICAgICBmb3VuZCA9IHRydWU7XG4gICAgICAgICAgICAgIHByZXZJZHggPSBpZHggPiAwID8gaWR4IC0gMSA6IGVycm9yc0xlbiAtIDE7XG4gICAgICAgICAgICAgIG5leHRJZHggPSBpZHg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBpZHgrKztcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFmb3VuZCkge1xuICAgICAgICAgICAgcHJldklkeCA9IGVycm9yc0xlbiAtIDE7XG4gICAgICAgICAgICBuZXh0SWR4ID0gMDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICB0aGlzLmZvcm1TbGlkZXIuc2xpZGUoe1xuICAgICAgICAgICAgdG86IG1vdmUgPyBlcnJvcnNbbmV4dElkeF0gLSAxIDogZXJyb3JzW3ByZXZJZHhdIC0gMSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB0aGlzLl9jaGFuZ2VEZXRlY3RvclJlZi5kZXRlY3RDaGFuZ2VzKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nT25EZXN0cm95KCk6IHZvaWQge1xuICAgIHRoaXMuX25leHRTbGlkZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX2Vycm9yTW92ZVN1YnNjcmlwdGlvbi51bnN1YnNjcmliZSgpO1xuICAgIHRoaXMuX29yaWVudGF0aW9uQ2hhbmdlLmNvbXBsZXRlKCk7XG4gICAgdGhpcy5fZXJyb3JNb3ZlRXZlbnQuY29tcGxldGUoKTtcbiAgICB0aGlzLl9mb3JtQWN0aW9uLmNvbXBsZXRlKCk7XG4gIH1cblxuICBzY3JvbGxUb1NsaWRlKHNsaWRlOiBBamZTbGlkZUluc3RhbmNlKTogdm9pZCB7XG4gICAgdGhpcy5mb3JtU2xpZGVyLnNsaWRlKHt0bzogc2xpZGUucG9zaXRpb24gLSAxfSk7XG4gIH1cblxuICBvcmllbnRhdGlvbkNoYW5nZUhhbmRsZXIob3JpZW50YXRpb246IEFqZlBhZ2VTbGlkZXJPcmllbnRhdGlvbik6IHZvaWQge1xuICAgIHRoaXMub3JpZW50YXRpb24gPSBvcmllbnRhdGlvbjtcbiAgfVxuXG4gIHRyYWNrTm9kZUJ5SWQoXzogbnVtYmVyLCBub2RlOiBBamZOb2RlSW5zdGFuY2UpOiBzdHJpbmcge1xuICAgIHJldHVybiBub2RlSW5zdGFuY2VDb21wbGV0ZU5hbWUobm9kZSk7XG4gIH1cbn1cbiJdfQ==