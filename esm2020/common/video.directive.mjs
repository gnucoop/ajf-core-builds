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
import { Directive, ElementRef, EventEmitter, Input, Output, Renderer2, } from '@angular/core';
import * as i0 from "@angular/core";
export class AjfVideoDirective {
    constructor(_el, _renderer) {
        this._el = _el;
        this._renderer = _renderer;
        this.isInit = new EventEmitter();
    }
    get source() {
        return this._source;
    }
    set source(source) {
        this._source = source;
        this._initCam();
    }
    _initCam() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices
                .getUserMedia({ video: true })
                .then((stream) => {
                this._source.srcObject = stream;
                this._source.play();
            })
                .catch((err) => {
                console.log(err);
            });
        }
    }
    ngAfterViewInit() {
        this._renderer.appendChild(this._el.nativeElement, this._source);
        this.isInit.emit();
    }
}
AjfVideoDirective.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfVideoDirective, deps: [{ token: i0.ElementRef }, { token: i0.Renderer2 }], target: i0.ɵɵFactoryTarget.Directive });
AjfVideoDirective.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfVideoDirective, selector: "[ajfVideoDirective]", inputs: { source: "source" }, outputs: { isInit: "isInit" }, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfVideoDirective, decorators: [{
            type: Directive,
            args: [{ selector: '[ajfVideoDirective]' }]
        }], ctorParameters: function () { return [{ type: i0.ElementRef }, { type: i0.Renderer2 }]; }, propDecorators: { source: [{
                type: Input
            }], isInit: [{
                type: Output
            }] } });
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8uZGlyZWN0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvY29tbW9uL3ZpZGVvLmRpcmVjdGl2ZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFFSCxPQUFPLEVBRUwsU0FBUyxFQUNULFVBQVUsRUFDVixZQUFZLEVBQ1osS0FBSyxFQUNMLE1BQU0sRUFDTixTQUFTLEdBQ1YsTUFBTSxlQUFlLENBQUM7O0FBR3ZCLE1BQU0sT0FBTyxpQkFBaUI7SUFhNUIsWUFBb0IsR0FBZSxFQUFVLFNBQW9CO1FBQTdDLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFBVSxjQUFTLEdBQVQsU0FBUyxDQUFXO1FBRjlDLFdBQU0sR0FBc0IsSUFBSSxZQUFZLEVBQU8sQ0FBQztJQUVILENBQUM7SUFYckUsSUFBSSxNQUFNO1FBQ1IsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDO0lBQ3RCLENBQUM7SUFDRCxJQUNJLE1BQU0sQ0FBQyxNQUF3QjtRQUNqQyxJQUFJLENBQUMsT0FBTyxHQUFHLE1BQU0sQ0FBQztRQUN0QixJQUFJLENBQUMsUUFBUSxFQUFFLENBQUM7SUFDbEIsQ0FBQztJQU1PLFFBQVE7UUFDZCxJQUFJLFNBQVMsQ0FBQyxZQUFZLElBQUksU0FBUyxDQUFDLFlBQVksQ0FBQyxZQUFZLEVBQUU7WUFDakUsU0FBUyxDQUFDLFlBQVk7aUJBQ25CLFlBQVksQ0FBeUIsRUFBQyxLQUFLLEVBQUUsSUFBSSxFQUFDLENBQUM7aUJBQ25ELElBQUksQ0FBQyxDQUFDLE1BQW1CLEVBQUUsRUFBRTtnQkFDM0IsSUFBSSxDQUFDLE9BQWUsQ0FBQyxTQUFTLEdBQUcsTUFBTSxDQUFDO2dCQUN4QyxJQUFJLENBQUMsT0FBZSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQy9CLENBQUMsQ0FBQztpQkFDRCxLQUFLLENBQUMsQ0FBQyxHQUFRLEVBQUUsRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUNuQixDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0gsQ0FBQztJQUVELGVBQWU7UUFDYixJQUFJLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLGFBQWEsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDakUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUNyQixDQUFDOztzSEFoQ1UsaUJBQWlCOzBHQUFqQixpQkFBaUI7bUdBQWpCLGlCQUFpQjtrQkFEN0IsU0FBUzttQkFBQyxFQUFDLFFBQVEsRUFBRSxxQkFBcUIsRUFBQzt5SEFPdEMsTUFBTTtzQkFEVCxLQUFLO2dCQU1hLE1BQU07c0JBQXhCLE1BQU0iLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7XG4gIEFmdGVyVmlld0luaXQsXG4gIERpcmVjdGl2ZSxcbiAgRWxlbWVudFJlZixcbiAgRXZlbnRFbWl0dGVyLFxuICBJbnB1dCxcbiAgT3V0cHV0LFxuICBSZW5kZXJlcjIsXG59IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuXG5ARGlyZWN0aXZlKHtzZWxlY3RvcjogJ1thamZWaWRlb0RpcmVjdGl2ZV0nfSlcbmV4cG9ydCBjbGFzcyBBamZWaWRlb0RpcmVjdGl2ZSBpbXBsZW1lbnRzIEFmdGVyVmlld0luaXQge1xuICBwcml2YXRlIF9zb3VyY2U6IEhUTUxWaWRlb0VsZW1lbnQ7XG4gIGdldCBzb3VyY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3NvdXJjZTtcbiAgfVxuICBASW5wdXQoKVxuICBzZXQgc291cmNlKHNvdXJjZTogSFRNTFZpZGVvRWxlbWVudCkge1xuICAgIHRoaXMuX3NvdXJjZSA9IHNvdXJjZTtcbiAgICB0aGlzLl9pbml0Q2FtKCk7XG4gIH1cblxuICBAT3V0cHV0KCkgcmVhZG9ubHkgaXNJbml0OiBFdmVudEVtaXR0ZXI8YW55PiA9IG5ldyBFdmVudEVtaXR0ZXI8YW55PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2VsOiBFbGVtZW50UmVmLCBwcml2YXRlIF9yZW5kZXJlcjogUmVuZGVyZXIyKSB7fVxuXG4gIHByaXZhdGUgX2luaXRDYW0oKSB7XG4gICAgaWYgKG5hdmlnYXRvci5tZWRpYURldmljZXMgJiYgbmF2aWdhdG9yLm1lZGlhRGV2aWNlcy5nZXRVc2VyTWVkaWEpIHtcbiAgICAgIG5hdmlnYXRvci5tZWRpYURldmljZXNcbiAgICAgICAgLmdldFVzZXJNZWRpYSg8TWVkaWFTdHJlYW1Db25zdHJhaW50cz57dmlkZW86IHRydWV9KVxuICAgICAgICAudGhlbigoc3RyZWFtOiBNZWRpYVN0cmVhbSkgPT4ge1xuICAgICAgICAgICh0aGlzLl9zb3VyY2UgYXMgYW55KS5zcmNPYmplY3QgPSBzdHJlYW07XG4gICAgICAgICAgKHRoaXMuX3NvdXJjZSBhcyBhbnkpLnBsYXkoKTtcbiAgICAgICAgfSlcbiAgICAgICAgLmNhdGNoKChlcnI6IGFueSkgPT4ge1xuICAgICAgICAgIGNvbnNvbGUubG9nKGVycik7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIG5nQWZ0ZXJWaWV3SW5pdCgpOiB2b2lkIHtcbiAgICB0aGlzLl9yZW5kZXJlci5hcHBlbmRDaGlsZCh0aGlzLl9lbC5uYXRpdmVFbGVtZW50LCB0aGlzLl9zb3VyY2UpO1xuICAgIHRoaXMuaXNJbml0LmVtaXQoKTtcbiAgfVxufVxuIl19