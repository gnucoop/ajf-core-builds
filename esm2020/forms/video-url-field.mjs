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
        'https?://vimeo.com/[0-9]+$',
        'https?://player.vimeo.com/video/[0-9]+$',
        'https?://vimeo.com/channels',
        'groups',
        'album',
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tdXJsLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdmlkZW8tdXJsLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsU0FBUyxFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUVuRSxPQUFPLEVBQUMsWUFBWSxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBYSxFQUFFLElBQUksS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0UsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx5QkFBeUIsRUFBeUIsTUFBTSx5QkFBeUIsQ0FBQzs7Ozs7QUFTMUY7Ozs7O0dBS0c7QUFFSCxNQUFNLE9BQU8seUJBQTBCLFNBQVEscUJBQXFCO0lBSWxFLFlBQ0UsR0FBc0IsRUFDdEIsT0FBK0IsRUFDSSxHQUEyQixFQUM5RCxZQUEwQixFQUMxQixVQUFzQjtRQUV0QixLQUFLLENBQUMsR0FBRyxFQUFFLE9BQU8sRUFBRSxHQUFHLENBQUMsQ0FBQztRQUV6QixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDN0IsTUFBTSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsT0FBTyxJQUFJLElBQUksQ0FBQyxFQUNsQyxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDbEIs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SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgRGlyZWN0aXZlLCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIG9mIGFzIG9ic09mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbmV4cG9ydCB0eXBlIEFqZlZpZGVvUHJvdmlkZXIgPSAneW91dHViZScgfCAndmltZW8nO1xuXG5pbnRlcmZhY2UgVmlkZW9JbmZvIHtcbiAgcHJvdmlkZXI6IEFqZlZpZGVvUHJvdmlkZXI7XG4gIGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogSXQgYWxsb3dzIHRoZSBsb2FkaW5nIG9mIHZpZGVvKHlvdXR1YmUgb3IgdmltZW8pIHVybCBpbnNpZGUgYW4gQWpmRm9ybS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudFxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgdmFsaWRVcmw6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHJlYWRvbmx5IHZpZGVvVGh1bWJuYWlsOiBPYnNlcnZhYmxlPFNhZmVSZXNvdXJjZVVybD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICAgIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcblxuICAgIGNvbnN0IHZpZGVvID0gdGhpcy5jb250cm9sLnBpcGUoXG4gICAgICBmaWx0ZXIoY29udHJvbCA9PiBjb250cm9sICE9IG51bGwpLFxuICAgICAgc3dpdGNoTWFwKGNvbnRyb2wgPT4ge1xuICAgICAgICBjb250cm9sID0gY29udHJvbCBhcyBGb3JtQ29udHJvbDtcbiAgICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoc3RhcnRXaXRoKGNvbnRyb2wudmFsdWUpKTtcbiAgICAgIH0pLFxuICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICE9IG51bGwpLFxuICAgICAgbWFwKHZhbHVlID0+IGdldFZpZGVvUHJvdmlkZXJBbmRJZCh2YWx1ZSBhcyBzdHJpbmcpKSxcbiAgICApO1xuICAgIHRoaXMudmFsaWRVcmwgPSB2aWRlby5waXBlKG1hcCh2ID0+IHYgIT0gbnVsbCkpO1xuICAgIHRoaXMudmlkZW9UaHVtYm5haWwgPSB2aWRlby5waXBlKFxuICAgICAgZmlsdGVyKGluZm8gPT4gaW5mbyAhPSBudWxsKSxcbiAgICAgIHN3aXRjaE1hcChpbmZvID0+IHZpZGVvUHJldmlld1VybChodHRwQ2xpZW50LCBpbmZvIGFzIFZpZGVvSW5mbykpLFxuICAgICAgZmlsdGVyKHVybCA9PiB1cmwgIT0gbnVsbCksXG4gICAgICBtYXAodXJsID0+IGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodXJsIGFzIHN0cmluZykpLFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBpdCByZXR1cm5zIGEgdXJsIG9mIHRodW1ibmFpbCByZWxhdGVkIHRvIHZpZGVvIG9yIG51bGwuXG4gKlxuICogQHBhcmFtIGh0dHBDbGllbnRcbiAqIEBwYXJhbSB2aWRlb1xuICogQHJldHVybiB7Kn1cbiAqL1xuZnVuY3Rpb24gdmlkZW9QcmV2aWV3VXJsKGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIHZpZGVvOiBWaWRlb0luZm8pOiBPYnNlcnZhYmxlPHN0cmluZyB8IG51bGw+IHtcbiAgaWYgKHZpZGVvLnByb3ZpZGVyID09PSAneW91dHViZScpIHtcbiAgICByZXR1cm4gb2JzT2YoYGh0dHBzOi8vaW1nLnlvdXR1YmUuY29tL3ZpLyR7dmlkZW8uaWR9L2RlZmF1bHQuanBnYCk7XG4gIH1cbiAgaWYgKHZpZGVvLnByb3ZpZGVyID09PSAndmltZW8nKSB7XG4gICAgcmV0dXJuIGh0dHBDbGllbnRcbiAgICAgIC5nZXQ8e3RodW1ibmFpbF91cmw6IHN0cmluZ30+KFxuICAgICAgICBgaHR0cHM6Ly92aW1lby5jb20vYXBpL29lbWJlZC5qc29uP3VybD1odHRwczovL3ZpbWVvLmNvbS8ke3ZpZGVvLmlkfWAsXG4gICAgICApXG4gICAgICAucGlwZShcbiAgICAgICAgbWFwKHJlc3BvbnNlID0+IHJlc3BvbnNlLnRodW1ibmFpbF91cmwpLFxuICAgICAgICBjYXRjaEVycm9yKCgpID0+IG9ic09mKG51bGwpKSxcbiAgICAgICkgYXMgT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPjtcbiAgfVxuICByZXR1cm4gb2JzT2YoJycpO1xufVxuXG4vKipcbiAqIEl0IGNoZWNrcyB0aGUgdXJsIHBhcmFtLCBpZiB1cmwgaXMgYW4geW91dHViZSBvIHZpbWVvIGRvbWFpbiByZXR1cm5cbiAqIGFuIHZpZGVvSW5mbyBlbHNlIG51bGxcbiAqXG4gKiBAcGFyYW0gdXJsXG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiBnZXRWaWRlb1Byb3ZpZGVyQW5kSWQodXJsOiBzdHJpbmcpOiBWaWRlb0luZm8gfCBudWxsIHtcbiAgbGV0IHByb3ZpZGVyOiBBamZWaWRlb1Byb3ZpZGVyIHwgbnVsbCA9IG51bGw7XG4gIGxldCBpZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGlmICgveW91dHViZXx5b3V0dVxcLmJlfHkydVxcLmJlfGkueXRpbWdcXC4vLnRlc3QodXJsKSkge1xuICAgIHByb3ZpZGVyID0gJ3lvdXR1YmUnO1xuICAgIGlkID0gZ2V0WW91VHViZVZpZGVvSWQodXJsKTtcbiAgfSBlbHNlIGlmICgvdmltZW8vLnRlc3QodXJsKSkge1xuICAgIHByb3ZpZGVyID0gJ3ZpbWVvJztcbiAgICBpZCA9IGdldFZpbWVvVmlkZW9JZCh1cmwpO1xuICB9XG4gIGlmIChwcm92aWRlciA9PSBudWxsIHx8IGlkID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4ge3Byb3ZpZGVyLCBpZH07XG59XG5cbi8qKlxuICogaXQgZ2V0cyB0aGUgaWQgb2YgdmltZW8gdmlkZW8gdXJsLlxuICpcbiAqIEBwYXJhbSB1cmxcbiAqIEByZXR1cm4geyp9XG4gKi9cbmZ1bmN0aW9uIGdldFZpbWVvVmlkZW9JZCh1cmw6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICBpZiAodXJsLmluY2x1ZGVzKCcjJykpIHtcbiAgICB1cmwgPSB1cmwuc3BsaXQoJyMnKVswXTtcbiAgfVxuICBpZiAodXJsLmluY2x1ZGVzKCc/JykgJiYgIXVybC5pbmNsdWRlcygnY2xpcF9pZD0nKSkge1xuICAgIHVybCA9IHVybC5zcGxpdCgnPycpWzBdO1xuICB9XG5cbiAgbGV0IGlkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgbGV0IGFycjogc3RyaW5nW107XG5cbiAgY29uc3QgdmltZW9QaXBlID0gW1xuICAgICdodHRwcz86Ly92aW1lby5jb20vWzAtOV0rJCcsXG4gICAgJ2h0dHBzPzovL3BsYXllci52aW1lby5jb20vdmlkZW8vWzAtOV0rJCcsXG4gICAgJ2h0dHBzPzovL3ZpbWVvLmNvbS9jaGFubmVscycsXG4gICAgJ2dyb3VwcycsXG4gICAgJ2FsYnVtJyxcbiAgXS5qb2luKCd8Jyk7XG5cbiAgY29uc3QgdmltZW9SZWdleCA9IG5ldyBSZWdFeHAodmltZW9QaXBlLCAnZ2ltJyk7XG5cbiAgaWYgKHZpbWVvUmVnZXgudGVzdCh1cmwpKSB7XG4gICAgYXJyID0gdXJsLnNwbGl0KCcvJyk7XG4gICAgaWYgKGFyciAmJiBhcnIubGVuZ3RoKSB7XG4gICAgICBpZCA9IGFyci5wb3AoKSBhcyBzdHJpbmc7XG4gICAgfVxuICB9IGVsc2UgaWYgKC9jbGlwX2lkPS9naW0udGVzdCh1cmwpKSB7XG4gICAgYXJyID0gdXJsLnNwbGl0KCdjbGlwX2lkPScpO1xuICAgIGlmIChhcnIgJiYgYXJyLmxlbmd0aCkge1xuICAgICAgaWQgPSBhcnJbMV0uc3BsaXQoJyYnKVswXTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gaWQ7XG59XG5cbi8qKlxuICogaXQgZ2V0cyB0aGUgaWQgb2YgeW91dHViZSB2aWRlbyB1cmwuXG4gKlxuICogQHBhcmFtIHVybFxuICogQHJldHVybiB7Kn1cbiAqL1xuZnVuY3Rpb24gZ2V0WW91VHViZVZpZGVvSWQodXJsOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgY29uc3Qgc2hvcnRjb2RlID0gL3lvdXR1YmU6XFwvXFwvfGh0dHBzPzpcXC9cXC95b3V0dVxcLmJlXFwvfGh0dHA6XFwvXFwveTJ1XFwuYmVcXC8vZztcbiAgaWYgKHNob3J0Y29kZS50ZXN0KHVybCkpIHtcbiAgICBjb25zdCBzaG9ydGNvZGVJZCA9IHVybC5zcGxpdChzaG9ydGNvZGUpWzFdO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMoc2hvcnRjb2RlSWQpO1xuICB9XG4gIC8vIC92LyBvciAvdmkvXG4gIGNvbnN0IGlubGluZXYgPSAvXFwvdlxcL3xcXC92aVxcLy9nO1xuXG4gIGlmIChpbmxpbmV2LnRlc3QodXJsKSkge1xuICAgIGNvbnN0IGlubGluZUlkID0gdXJsLnNwbGl0KGlubGluZXYpWzFdO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMoaW5saW5lSWQpO1xuICB9XG5cbiAgLy8gdj0gb3Igdmk9XG4gIGNvbnN0IHBhcmFtZXRlclYgPSAvdj18dmk9L2c7XG5cbiAgaWYgKHBhcmFtZXRlclYudGVzdCh1cmwpKSB7XG4gICAgY29uc3QgYXJyID0gdXJsLnNwbGl0KHBhcmFtZXRlclYpO1xuICAgIHJldHVybiBhcnJbMV0uc3BsaXQoJyYnKVswXTtcbiAgfVxuXG4gIC8vIHY9IG9yIHZpPVxuICBjb25zdCBwYXJhbWV0ZXJXZWJwID0gL1xcL2FuX3dlYnBcXC8vZztcblxuICBpZiAocGFyYW1ldGVyV2VicC50ZXN0KHVybCkpIHtcbiAgICBjb25zdCB3ZWJwID0gdXJsLnNwbGl0KHBhcmFtZXRlcldlYnApWzFdO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMod2VicCk7XG4gIH1cblxuICAvLyBlbWJlZFxuICBjb25zdCBlbWJlZFJlZyA9IC9cXC9lbWJlZFxcLy9nO1xuXG4gIGlmIChlbWJlZFJlZy50ZXN0KHVybCkpIHtcbiAgICBjb25zdCBlbWJlZElkID0gdXJsLnNwbGl0KGVtYmVkUmVnKVsxXTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKGVtYmVkSWQpO1xuICB9XG5cbiAgLy8gaWdub3JlIC91c2VyL3VzZXJuYW1lIHBhdHRlcm5cbiAgY29uc3QgdXNlcm5hbWVSZWcgPSAvXFwvdXNlclxcLyhbYS16QS1aMC05XSopJC9nO1xuXG4gIGlmICh1c2VybmFtZVJlZy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHVzZXJcbiAgY29uc3QgdXNlclJlZyA9IC9cXC91c2VyXFwvKD8hLip2aWRlb3MpL2c7XG5cbiAgaWYgKHVzZXJSZWcudGVzdCh1cmwpKSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKGVsZW1lbnRzLnBvcCgpIGFzIHN0cmluZyk7XG4gIH1cblxuICAvLyBhdHRyaWJ1dGlvbl9saW5rXG4gIGNvbnN0IGF0dHJSZWcgPSAvXFwvYXR0cmlidXRpb25fbGlua1xcPy4qdiUzRChbXiUmXSopKCUyNnwmfCQpLztcblxuICBpZiAoYXR0clJlZy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gKHVybC5tYXRjaChhdHRyUmVnKSBhcyBzdHJpbmdbXSlbMV07XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc3RyaXBQYXJhbWV0ZXJzKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gU3BsaXQgcGFyYW1ldGVycyBvciBzcGxpdCBmb2xkZXIgc2VwYXJhdG9yXG4gIGlmICh1cmwuaW5jbHVkZXMoJz8nKSkge1xuICAgIHJldHVybiB1cmwuc3BsaXQoJz8nKVswXTtcbiAgfSBlbHNlIGlmICh1cmwuaW5jbHVkZXMoJy8nKSkge1xuICAgIHJldHVybiB1cmwuc3BsaXQoJy8nKVswXTtcbiAgfVxuICByZXR1cm4gdXJsO1xufVxuIl19