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
import { AjfPageSlider, AjfPageSliderOrientation } from '@ajf/core/page-slider';
import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, OnDestroy, QueryList } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { AjfFormField } from './field';
import { AjfFormRendererService } from './form-renderer';
import { AjfFieldType } from './interface/fields/field-type';
import { AjfForm } from './interface/forms/form';
import { AjfNodeGroupInstance } from './interface/nodes-instances/node-group-instance';
import { AjfNodeInstance } from './interface/nodes-instances/node-instance';
import { AjfRepeatingSlideInstance } from './interface/slides-instances/repeating-slide-instance';
import { AjfSlideInstance } from './interface/slides-instances/slide-instance';
export declare class AjfFormActionEvent {
    source: AjfFormRenderer;
    value: Object;
    action: string;
}
export declare abstract class AjfFormRenderer implements AfterViewChecked, AfterViewInit, OnDestroy {
    private _rendererService;
    protected _changeDetectorRef: ChangeDetectorRef;
    readonly formGroup: Observable<FormGroup | null>;
    readonly slides: Observable<AjfSlideInstance[]>;
    readonly slidesNum: Observable<number>;
    readonly errors: Observable<number>;
    readonly formIsInit: Observable<boolean>;
    readonly ajfFieldTypes: typeof AjfFieldType;
    title: string;
    private _orientationChange;
    readonly orientationChange: Observable<AjfPageSliderOrientation>;
    private _saveDisabled;
    get saveDisabled(): boolean;
    set saveDisabled(saveDisabled: boolean);
    private _hasStartMessage;
    get hasStartMessage(): boolean;
    set hasStartMessage(hasStartMessage: boolean);
    private _hasEndMessage;
    get hasEndMessage(): boolean;
    set hasEndMessage(hasEndMessage: boolean);
    private _hideTopToolbar;
    get hideTopToolbar(): boolean;
    set hideTopToolbar(hideTopToolbar: boolean);
    private _hideBottomToolbar;
    get hideBottompToolbar(): boolean;
    set hideBottomToolbar(hideBottomToolbar: boolean);
    private _hideNavigationButtons;
    get hideNavigationButtons(): boolean;
    set hideNavigationButtons(hideNavigationButtons: boolean);
    private _fixedOrientation;
    get fixedOrientation(): boolean;
    set fixedOrientation(fixedOrientation: boolean);
    private _readonly;
    get readonly(): boolean;
    set readonly(readonly: boolean);
    private _orientation;
    get orientation(): AjfPageSliderOrientation;
    set orientation(orientation: AjfPageSliderOrientation);
    formSlider: AjfPageSlider;
    fields: QueryList<AjfFormField>;
    private _errorMoveEvent;
    private _errorPositions;
    private _form;
    private _init;
    private _nextSlideSubscription;
    private _errorMoveSubscription;
    private _formAction;
    readonly formAction: Observable<AjfFormActionEvent>;
    set form(form: AjfForm);
    /**
     * this constructor will init current formula by ajfBuilderService
     */
    constructor(_rendererService: AjfFormRendererService, _changeDetectorRef: ChangeDetectorRef);
    /**
     * this method will scroll to next error received by subscribe
     */
    goToNextError(): void;
    /**
     * this method will scroll to prev error received by subscribe
     */
    goToPrevError(): void;
    /**
     * this method will add group
     */
    addGroup(nodeGroup: AjfNodeGroupInstance | AjfSlideInstance | AjfRepeatingSlideInstance): void;
    /**
     * this method will remove group
     */
    removeGroup(nodeGroup: AjfNodeGroupInstance | AjfSlideInstance | AjfRepeatingSlideInstance): void;
    onSave(_evt: any): void;
    onFormAction(_evt: any, action: string): void;
    /**
     * this method will set current form in rederer service when init form
     */
    ngAfterViewInit(): void;
    ngAfterViewChecked(): void;
    ngOnDestroy(): void;
    orientationChangeHandler(orientation: AjfPageSliderOrientation): void;
    trackNodeById(_: number, node: AjfNodeInstance): string;
}
