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
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Directive, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of as obsOf } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
import * as i0 from "@angular/core";
import * as i1 from "./form-renderer";
import * as i2 from "@angular/platform-browser";
import * as i3 from "@angular/common/http";
/**
 * It allows the loading of video(youtube or vimeo) url inside an AjfForm.
 *
 * @export
 * @class AjfVideoUrlFieldComponent
 */
export class AjfVideoUrlFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer, httpClient) {
        super(cdr, service, was);
        const video = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), map(value => getVideoProviderAndId(value)));
        this.validUrl = video.pipe(map(v => v != null));
        this.videoThumbnail = video.pipe(filter(info => info != null), switchMap(info => videoPreviewUrl(httpClient, info)), filter(url => url != null), map(url => domSanitizer.bypassSecurityTrustResourceUrl(url)));
    }
}
AjfVideoUrlFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfVideoUrlFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2.DomSanitizer }, { token: i3.HttpClient }], target: i0.ɵɵFactoryTarget.Directive });
AjfVideoUrlFieldComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.0.0-next.15", type: AjfVideoUrlFieldComponent, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.0.0-next.15", ngImport: i0, type: AjfVideoUrlFieldComponent, decorators: [{
            type: Directive
        }], ctorParameters: function () { return [{ type: i0.ChangeDetectorRef }, { type: i1.AjfFormRendererService }, { type: undefined, decorators: [{
                    type: Inject,
                    args: [AJF_WARNING_ALERT_SERVICE]
                }] }, { type: i2.DomSanitizer }, { type: i3.HttpClient }]; } });
/**
 * it returns a url of thumbnail related to video or null.
 *
 * @param httpClient
 * @param video
 * @return {*}
 */
function videoPreviewUrl(httpClient, video) {
    if (video.provider === 'youtube') {
        return obsOf(`https://img.youtube.com/vi/${video.id}/default.jpg`);
    }
    if (video.provider === 'vimeo') {
        return httpClient
            .get(`https://vimeo.com/api/oembed.json?url=https://vimeo.com/${video.id}`)
            .pipe(map(response => response.thumbnail_url), catchError(() => obsOf(null)));
    }
    return obsOf('');
}
/**
 * It checks the url param, if url is an youtube o vimeo domain return
 * an videoInfo else null
 *
 * @param url
 * @return {*}
 */
function getVideoProviderAndId(url) {
    let provider = null;
    let id = null;
    if (/youtube|youtu\.be|y2u\.be|i.ytimg\./.test(url)) {
        provider = 'youtube';
        id = getYouTubeVideoId(url);
    }
    else if (/vimeo/.test(url)) {
        provider = 'vimeo';
        id = getVimeoVideoId(url);
    }
    if (provider == null || id == null) {
        return null;
    }
    return { provider, id };
}
/**
 * it gets the id of vimeo video url.
 *
 * @param url
 * @return {*}
 */
function getVimeoVideoId(url) {
    if (url.includes('#')) {
        url = url.split('#')[0];
    }
    if (url.includes('?') && !url.includes('clip_id=')) {
        url = url.split('?')[0];
    }
    let id = null;
    let arr;
    const vimeoPipe = [
        'https?:\/\/vimeo\.com\/[0-9]+$', 'https?:\/\/player\.vimeo\.com\/video\/[0-9]+$',
        'https?:\/\/vimeo\.com\/channels', 'groups', 'album'
    ].join('|');
    const vimeoRegex = new RegExp(vimeoPipe, 'gim');
    if (vimeoRegex.test(url)) {
        arr = url.split('/');
        if (arr && arr.length) {
            id = arr.pop();
        }
    }
    else if (/clip_id=/gim.test(url)) {
        arr = url.split('clip_id=');
        if (arr && arr.length) {
            id = arr[1].split('&')[0];
        }
    }
    return id;
}
/**
 * it gets the id of youtube video url.
 *
 * @param url
 * @return {*}
 */
function getYouTubeVideoId(url) {
    const shortcode = /youtube:\/\/|https?:\/\/youtu\.be\/|http:\/\/y2u\.be\//g;
    if (shortcode.test(url)) {
        const shortcodeId = url.split(shortcode)[1];
        return stripParameters(shortcodeId);
    }
    // /v/ or /vi/
    const inlinev = /\/v\/|\/vi\//g;
    if (inlinev.test(url)) {
        const inlineId = url.split(inlinev)[1];
        return stripParameters(inlineId);
    }
    // v= or vi=
    const parameterV = /v=|vi=/g;
    if (parameterV.test(url)) {
        const arr = url.split(parameterV);
        return arr[1].split('&')[0];
    }
    // v= or vi=
    const parameterWebp = /\/an_webp\//g;
    if (parameterWebp.test(url)) {
        const webp = url.split(parameterWebp)[1];
        return stripParameters(webp);
    }
    // embed
    const embedReg = /\/embed\//g;
    if (embedReg.test(url)) {
        const embedId = url.split(embedReg)[1];
        return stripParameters(embedId);
    }
    // ignore /user/username pattern
    const usernameReg = /\/user\/([a-zA-Z0-9]*)$/g;
    if (usernameReg.test(url)) {
        return null;
    }
    // user
    const userReg = /\/user\/(?!.*videos)/g;
    if (userReg.test(url)) {
        const elements = url.split('/');
        return stripParameters(elements.pop());
    }
    // attribution_link
    const attrReg = /\/attribution_link\?.*v%3D([^%&]*)(%26|&|$)/;
    if (attrReg.test(url)) {
        return url.match(attrReg)[1];
    }
    return null;
}
function stripParameters(url) {
    // Split parameters or split folder separator
    if (url.includes('?')) {
        return url.split('?')[0];
    }
    else if (url.includes('/')) {
        return url.split('/')[0];
    }
    return url;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tdXJsLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdmlkZW8tdXJsLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBQUMsWUFBWSxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBYSxFQUFFLElBQUksS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0UsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx5QkFBeUIsRUFBeUIsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFTMUY7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8seUJBQTBCLFNBQVEscUJBQXFCO0lBSWxFLFlBQ0ksR0FBc0IsRUFBRSxPQUErQixFQUNwQixHQUEyQixFQUFFLFlBQTBCLEVBQzFGLFVBQXNCO1FBQ3hCLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQ2xDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQixP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QUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2YgYXMgb2JzT2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgQWpmVmlkZW9Qcm92aWRlciA9ICd5b3V0dWJlJ3wndmltZW8nO1xuXG5pbnRlcmZhY2UgVmlkZW9JbmZvIHtcbiAgcHJvdmlkZXI6IEFqZlZpZGVvUHJvdmlkZXI7XG4gIGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogSXQgYWxsb3dzIHRoZSBsb2FkaW5nIG9mIHZpZGVvKHlvdXR1YmUgb3IgdmltZW8pIHVybCBpbnNpZGUgYW4gQWpmRm9ybS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudFxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgdmFsaWRVcmw6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHJlYWRvbmx5IHZpZGVvVGh1bWJuYWlsOiBPYnNlcnZhYmxlPFNhZmVSZXNvdXJjZVVybD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgaHR0cENsaWVudDogSHR0cENsaWVudCkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcblxuICAgIGNvbnN0IHZpZGVvID0gdGhpcy5jb250cm9sLnBpcGUoXG4gICAgICAgIGZpbHRlcihjb250cm9sID0+IGNvbnRyb2wgIT0gbnVsbCksXG4gICAgICAgIHN3aXRjaE1hcChjb250cm9sID0+IHtcbiAgICAgICAgICBjb250cm9sID0gY29udHJvbCBhcyBGb3JtQ29udHJvbDtcbiAgICAgICAgICByZXR1cm4gY29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKGNvbnRyb2wudmFsdWUpLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgIT0gbnVsbCksXG4gICAgICAgIG1hcCh2YWx1ZSA9PiBnZXRWaWRlb1Byb3ZpZGVyQW5kSWQodmFsdWUgYXMgc3RyaW5nKSksXG4gICAgKTtcbiAgICB0aGlzLnZhbGlkVXJsID0gdmlkZW8ucGlwZShtYXAodiA9PiB2ICE9IG51bGwpKTtcbiAgICB0aGlzLnZpZGVvVGh1bWJuYWlsID0gdmlkZW8ucGlwZShcbiAgICAgICAgZmlsdGVyKGluZm8gPT4gaW5mbyAhPSBudWxsKSxcbiAgICAgICAgc3dpdGNoTWFwKGluZm8gPT4gdmlkZW9QcmV2aWV3VXJsKGh0dHBDbGllbnQsIGluZm8gYXMgVmlkZW9JbmZvKSksXG4gICAgICAgIGZpbHRlcih1cmwgPT4gdXJsICE9IG51bGwpLFxuICAgICAgICBtYXAodXJsID0+IGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodXJsIGFzIHN0cmluZykpLFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBpdCByZXR1cm5zIGEgdXJsIG9mIHRodW1ibmFpbCByZWxhdGVkIHRvIHZpZGVvIG9yIG51bGwuXG4gKlxuICogQHBhcmFtIGh0dHBDbGllbnRcbiAqIEBwYXJhbSB2aWRlb1xuICogQHJldHVybiB7Kn1cbiAqL1xuZnVuY3Rpb24gdmlkZW9QcmV2aWV3VXJsKGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIHZpZGVvOiBWaWRlb0luZm8pOiBPYnNlcnZhYmxlPHN0cmluZ3xudWxsPiB7XG4gIGlmICh2aWRlby5wcm92aWRlciA9PT0gJ3lvdXR1YmUnKSB7XG4gICAgcmV0dXJuIG9ic09mKGBodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke3ZpZGVvLmlkfS9kZWZhdWx0LmpwZ2ApO1xuICB9XG4gIGlmICh2aWRlby5wcm92aWRlciA9PT0gJ3ZpbWVvJykge1xuICAgIHJldHVybiBodHRwQ2xpZW50XG4gICAgICAgICAgICAgICAuZ2V0PHt0aHVtYm5haWxfdXJsOiBzdHJpbmd9PihcbiAgICAgICAgICAgICAgICAgICBgaHR0cHM6Ly92aW1lby5jb20vYXBpL29lbWJlZC5qc29uP3VybD1odHRwczovL3ZpbWVvLmNvbS8ke3ZpZGVvLmlkfWApXG4gICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICBtYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UudGh1bWJuYWlsX3VybCksXG4gICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvYnNPZihudWxsKSksXG4gICAgICAgICAgICAgICAgICAgKSBhcyBPYnNlcnZhYmxlPHN0cmluZ3xudWxsPjtcbiAgfVxuICByZXR1cm4gb2JzT2YoJycpO1xufVxuXG4vKipcbiAqIEl0IGNoZWNrcyB0aGUgdXJsIHBhcmFtLCBpZiB1cmwgaXMgYW4geW91dHViZSBvIHZpbWVvIGRvbWFpbiByZXR1cm5cbiAqIGFuIHZpZGVvSW5mbyBlbHNlIG51bGxcbiAqXG4gKiBAcGFyYW0gdXJsXG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiBnZXRWaWRlb1Byb3ZpZGVyQW5kSWQodXJsOiBzdHJpbmcpOiBWaWRlb0luZm98bnVsbCB7XG4gIGxldCBwcm92aWRlcjogQWpmVmlkZW9Qcm92aWRlcnxudWxsID0gbnVsbDtcbiAgbGV0IGlkOiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gIGlmICgveW91dHViZXx5b3V0dVxcLmJlfHkydVxcLmJlfGkueXRpbWdcXC4vLnRlc3QodXJsKSkge1xuICAgIHByb3ZpZGVyID0gJ3lvdXR1YmUnO1xuICAgIGlkID0gZ2V0WW91VHViZVZpZGVvSWQodXJsKTtcbiAgfSBlbHNlIGlmICgvdmltZW8vLnRlc3QodXJsKSkge1xuICAgIHByb3ZpZGVyID0gJ3ZpbWVvJztcbiAgICBpZCA9IGdldFZpbWVvVmlkZW9JZCh1cmwpO1xuICB9XG4gIGlmIChwcm92aWRlciA9PSBudWxsIHx8IGlkID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4ge3Byb3ZpZGVyLCBpZH07XG59XG5cbi8qKlxuICogaXQgZ2V0cyB0aGUgaWQgb2YgdmltZW8gdmlkZW8gdXJsLlxuICpcbiAqIEBwYXJhbSB1cmxcbiAqIEByZXR1cm4geyp9XG4gKi9cbmZ1bmN0aW9uIGdldFZpbWVvVmlkZW9JZCh1cmw6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgaWYgKHVybC5pbmNsdWRlcygnIycpKSB7XG4gICAgdXJsID0gdXJsLnNwbGl0KCcjJylbMF07XG4gIH1cbiAgaWYgKHVybC5pbmNsdWRlcygnPycpICYmICF1cmwuaW5jbHVkZXMoJ2NsaXBfaWQ9JykpIHtcbiAgICB1cmwgPSB1cmwuc3BsaXQoJz8nKVswXTtcbiAgfVxuXG4gIGxldCBpZDogc3RyaW5nfG51bGwgPSBudWxsO1xuICBsZXQgYXJyOiBzdHJpbmdbXTtcblxuICBjb25zdCB2aW1lb1BpcGUgPSBbXG4gICAgJ2h0dHBzPzpcXC9cXC92aW1lb1xcLmNvbVxcL1swLTldKyQnLCAnaHR0cHM/OlxcL1xcL3BsYXllclxcLnZpbWVvXFwuY29tXFwvdmlkZW9cXC9bMC05XSskJyxcbiAgICAnaHR0cHM/OlxcL1xcL3ZpbWVvXFwuY29tXFwvY2hhbm5lbHMnLCAnZ3JvdXBzJywgJ2FsYnVtJ1xuICBdLmpvaW4oJ3wnKTtcblxuICBjb25zdCB2aW1lb1JlZ2V4ID0gbmV3IFJlZ0V4cCh2aW1lb1BpcGUsICdnaW0nKTtcblxuICBpZiAodmltZW9SZWdleC50ZXN0KHVybCkpIHtcbiAgICBhcnIgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICBpZiAoYXJyICYmIGFyci5sZW5ndGgpIHtcbiAgICAgIGlkID0gYXJyLnBvcCgpIGFzIHN0cmluZztcbiAgICB9XG4gIH0gZWxzZSBpZiAoL2NsaXBfaWQ9L2dpbS50ZXN0KHVybCkpIHtcbiAgICBhcnIgPSB1cmwuc3BsaXQoJ2NsaXBfaWQ9Jyk7XG4gICAgaWYgKGFyciAmJiBhcnIubGVuZ3RoKSB7XG4gICAgICBpZCA9IGFyclsxXS5zcGxpdCgnJicpWzBdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpZDtcbn1cblxuLyoqXG4gKiBpdCBnZXRzIHRoZSBpZCBvZiB5b3V0dWJlIHZpZGVvIHVybC5cbiAqXG4gKiBAcGFyYW0gdXJsXG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiBnZXRZb3VUdWJlVmlkZW9JZCh1cmw6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgY29uc3Qgc2hvcnRjb2RlID0gL3lvdXR1YmU6XFwvXFwvfGh0dHBzPzpcXC9cXC95b3V0dVxcLmJlXFwvfGh0dHA6XFwvXFwveTJ1XFwuYmVcXC8vZztcbiAgaWYgKHNob3J0Y29kZS50ZXN0KHVybCkpIHtcbiAgICBjb25zdCBzaG9ydGNvZGVJZCA9IHVybC5zcGxpdChzaG9ydGNvZGUpWzFdO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMoc2hvcnRjb2RlSWQpO1xuICB9XG4gIC8vIC92LyBvciAvdmkvXG4gIGNvbnN0IGlubGluZXYgPSAvXFwvdlxcL3xcXC92aVxcLy9nO1xuXG4gIGlmIChpbmxpbmV2LnRlc3QodXJsKSkge1xuICAgIGNvbnN0IGlubGluZUlkID0gdXJsLnNwbGl0KGlubGluZXYpWzFdO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMoaW5saW5lSWQpO1xuICB9XG5cbiAgLy8gdj0gb3Igdmk9XG4gIGNvbnN0IHBhcmFtZXRlclYgPSAvdj18dmk9L2c7XG5cbiAgaWYgKHBhcmFtZXRlclYudGVzdCh1cmwpKSB7XG4gICAgY29uc3QgYXJyID0gdXJsLnNwbGl0KHBhcmFtZXRlclYpO1xuICAgIHJldHVybiBhcnJbMV0uc3BsaXQoJyYnKVswXTtcbiAgfVxuXG4gIC8vIHY9IG9yIHZpPVxuICBjb25zdCBwYXJhbWV0ZXJXZWJwID0gL1xcL2FuX3dlYnBcXC8vZztcblxuICBpZiAocGFyYW1ldGVyV2VicC50ZXN0KHVybCkpIHtcbiAgICBjb25zdCB3ZWJwID0gdXJsLnNwbGl0KHBhcmFtZXRlcldlYnApWzFdO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMod2VicCk7XG4gIH1cblxuICAvLyBlbWJlZFxuICBjb25zdCBlbWJlZFJlZyA9IC9cXC9lbWJlZFxcLy9nO1xuXG4gIGlmIChlbWJlZFJlZy50ZXN0KHVybCkpIHtcbiAgICBjb25zdCBlbWJlZElkID0gdXJsLnNwbGl0KGVtYmVkUmVnKVsxXTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKGVtYmVkSWQpO1xuICB9XG5cbiAgLy8gaWdub3JlIC91c2VyL3VzZXJuYW1lIHBhdHRlcm5cbiAgY29uc3QgdXNlcm5hbWVSZWcgPSAvXFwvdXNlclxcLyhbYS16QS1aMC05XSopJC9nO1xuXG4gIGlmICh1c2VybmFtZVJlZy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHVzZXJcbiAgY29uc3QgdXNlclJlZyA9IC9cXC91c2VyXFwvKD8hLip2aWRlb3MpL2c7XG5cbiAgaWYgKHVzZXJSZWcudGVzdCh1cmwpKSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKGVsZW1lbnRzLnBvcCgpIGFzIHN0cmluZyk7XG4gIH1cblxuICAvLyBhdHRyaWJ1dGlvbl9saW5rXG4gIGNvbnN0IGF0dHJSZWcgPSAvXFwvYXR0cmlidXRpb25fbGlua1xcPy4qdiUzRChbXiUmXSopKCUyNnwmfCQpLztcblxuICBpZiAoYXR0clJlZy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gKHVybC5tYXRjaChhdHRyUmVnKSBhcyBzdHJpbmdbXSlbMV07XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc3RyaXBQYXJhbWV0ZXJzKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gU3BsaXQgcGFyYW1ldGVycyBvciBzcGxpdCBmb2xkZXIgc2VwYXJhdG9yXG4gIGlmICh1cmwuaW5jbHVkZXMoJz8nKSkge1xuICAgIHJldHVybiB1cmwuc3BsaXQoJz8nKVswXTtcbiAgfSBlbHNlIGlmICh1cmwuaW5jbHVkZXMoJy8nKSkge1xuICAgIHJldHVybiB1cmwuc3BsaXQoJy8nKVswXTtcbiAgfVxuICByZXR1cm4gdXJsO1xufVxuIl19