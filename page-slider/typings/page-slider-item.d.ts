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
import { ElementRef, OnDestroy, Renderer2 } from '@angular/core';
import { AjfPageSliderItemScrollDirection } from './page-slider-item-scroll-direction';
export declare class AjfPageSliderItem implements OnDestroy {
    private _el;
    private _renderer;
    wrapper: ElementRef;
    content: ElementRef;
    private _scrollX;
    private _scrollY;
    private _resizeSensor;
    private _resizeEvent;
    private _resizeSub;
    constructor(_el: ElementRef, _renderer: Renderer2);
    ngOnDestroy(): void;
    setScroll(dir: AjfPageSliderItemScrollDirection, amount: number, _duration: number): boolean;
    private _onResize;
    private _fixScrollOnResize;
}
