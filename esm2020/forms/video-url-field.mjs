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
import { __decorate, __metadata, __param } from "tslib";
import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of as obsOf } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
/**
 * It allows the loading of video(youtube or vimeo) url inside an AjfForm.
 *
 * @export
 * @class AjfVideoUrlFieldComponent
 */
let AjfVideoUrlFieldComponent = class AjfVideoUrlFieldComponent extends AjfBaseFieldComponent {
    constructor(cdr, service, was, domSanitizer, httpClient) {
        super(cdr, service, was);
        const video = this.control.pipe(filter(control => control != null), switchMap(control => {
            control = control;
            return control.valueChanges.pipe(startWith(control.value));
        }), filter(value => value != null), map(value => getVideoProviderAndId(value)));
        this.validUrl = video.pipe(map(v => v != null));
        this.videoThumbnail = video.pipe(filter(info => info != null), switchMap(info => videoPreviewUrl(httpClient, info)), filter(url => url != null), map(url => domSanitizer.bypassSecurityTrustResourceUrl(url)));
    }
};
AjfVideoUrlFieldComponent = __decorate([
    __param(2, Inject(AJF_WARNING_ALERT_SERVICE)),
    __metadata("design:paramtypes", [ChangeDetectorRef, AjfFormRendererService, Object, DomSanitizer,
        HttpClient])
], AjfVideoUrlFieldComponent);
export { AjfVideoUrlFieldComponent };
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tdXJsLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdmlkZW8tdXJsLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsVUFBVSxFQUFDLE1BQU0sc0JBQXNCLENBQUM7QUFDaEQsT0FBTyxFQUFDLGlCQUFpQixFQUFFLE1BQU0sRUFBQyxNQUFNLGVBQWUsQ0FBQztBQUV4RCxPQUFPLEVBQUMsWUFBWSxFQUFrQixNQUFNLDJCQUEyQixDQUFDO0FBQ3hFLE9BQU8sRUFBYSxFQUFFLElBQUksS0FBSyxFQUFDLE1BQU0sTUFBTSxDQUFDO0FBQzdDLE9BQU8sRUFBQyxVQUFVLEVBQUUsTUFBTSxFQUFFLEdBQUcsRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFDLE1BQU0sZ0JBQWdCLENBQUM7QUFFN0UsT0FBTyxFQUFDLHFCQUFxQixFQUFDLE1BQU0sY0FBYyxDQUFDO0FBQ25ELE9BQU8sRUFBQyxzQkFBc0IsRUFBQyxNQUFNLGlCQUFpQixDQUFDO0FBQ3ZELE9BQU8sRUFBQyx5QkFBeUIsRUFBeUIsTUFBTSx5QkFBeUIsQ0FBQztBQVMxRjs7Ozs7R0FLRztBQUNILElBQWEseUJBQXlCLEdBQXRDLE1BQWEseUJBQTBCLFNBQVEscUJBQXFCO0lBSWxFLFlBQ0ksR0FBc0IsRUFBRSxPQUErQixFQUNwQixHQUEyQixFQUFFLFlBQTBCLEVBQzFGLFVBQXNCO1FBQ3hCLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUMzQixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQ2xDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQixP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QUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDMUI7SUFDRCxPQUFPLEdBQUcsQ0FBQztBQUNiLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7SHR0cENsaWVudH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHtDaGFuZ2VEZXRlY3RvclJlZiwgSW5qZWN0fSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7Rm9ybUNvbnRyb2x9IGZyb20gJ0Bhbmd1bGFyL2Zvcm1zJztcbmltcG9ydCB7RG9tU2FuaXRpemVyLCBTYWZlUmVzb3VyY2VVcmx9IGZyb20gJ0Bhbmd1bGFyL3BsYXRmb3JtLWJyb3dzZXInO1xuaW1wb3J0IHtPYnNlcnZhYmxlLCBvZiBhcyBvYnNPZn0gZnJvbSAncnhqcyc7XG5pbXBvcnQge2NhdGNoRXJyb3IsIGZpbHRlciwgbWFwLCBzdGFydFdpdGgsIHN3aXRjaE1hcH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQge0FqZkJhc2VGaWVsZENvbXBvbmVudH0gZnJvbSAnLi9iYXNlLWZpZWxkJztcbmltcG9ydCB7QWpmRm9ybVJlbmRlcmVyU2VydmljZX0gZnJvbSAnLi9mb3JtLXJlbmRlcmVyJztcbmltcG9ydCB7QUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSwgQWpmV2FybmluZ0FsZXJ0U2VydmljZX0gZnJvbSAnLi93YXJuaW5nLWFsZXJ0LXNlcnZpY2UnO1xuXG5leHBvcnQgdHlwZSBBamZWaWRlb1Byb3ZpZGVyID0gJ3lvdXR1YmUnfCd2aW1lbyc7XG5cbmludGVyZmFjZSBWaWRlb0luZm8ge1xuICBwcm92aWRlcjogQWpmVmlkZW9Qcm92aWRlcjtcbiAgaWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBJdCBhbGxvd3MgdGhlIGxvYWRpbmcgb2YgdmlkZW8oeW91dHViZSBvciB2aW1lbykgdXJsIGluc2lkZSBhbiBBamZGb3JtLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50XG4gKi9cbmV4cG9ydCBjbGFzcyBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgdmFsaWRVcmw6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHJlYWRvbmx5IHZpZGVvVGh1bWJuYWlsOiBPYnNlcnZhYmxlPFNhZmVSZXNvdXJjZVVybD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLCBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgICAgaHR0cENsaWVudDogSHR0cENsaWVudCkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcblxuICAgIGNvbnN0IHZpZGVvID0gdGhpcy5jb250cm9sLnBpcGUoXG4gICAgICAgIGZpbHRlcihjb250cm9sID0+IGNvbnRyb2wgIT0gbnVsbCksXG4gICAgICAgIHN3aXRjaE1hcChjb250cm9sID0+IHtcbiAgICAgICAgICBjb250cm9sID0gY29udHJvbCBhcyBGb3JtQ29udHJvbDtcbiAgICAgICAgICByZXR1cm4gY29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShcbiAgICAgICAgICAgICAgc3RhcnRXaXRoKGNvbnRyb2wudmFsdWUpLFxuICAgICAgICAgICk7XG4gICAgICAgIH0pLFxuICAgICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgIT0gbnVsbCksXG4gICAgICAgIG1hcCh2YWx1ZSA9PiBnZXRWaWRlb1Byb3ZpZGVyQW5kSWQodmFsdWUgYXMgc3RyaW5nKSksXG4gICAgKTtcbiAgICB0aGlzLnZhbGlkVXJsID0gdmlkZW8ucGlwZShtYXAodiA9PiB2ICE9IG51bGwpKTtcbiAgICB0aGlzLnZpZGVvVGh1bWJuYWlsID0gdmlkZW8ucGlwZShcbiAgICAgICAgZmlsdGVyKGluZm8gPT4gaW5mbyAhPSBudWxsKSxcbiAgICAgICAgc3dpdGNoTWFwKGluZm8gPT4gdmlkZW9QcmV2aWV3VXJsKGh0dHBDbGllbnQsIGluZm8gYXMgVmlkZW9JbmZvKSksXG4gICAgICAgIGZpbHRlcih1cmwgPT4gdXJsICE9IG51bGwpLFxuICAgICAgICBtYXAodXJsID0+IGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodXJsIGFzIHN0cmluZykpLFxuICAgICk7XG4gIH1cbn1cblxuLyoqXG4gKiBpdCByZXR1cm5zIGEgdXJsIG9mIHRodW1ibmFpbCByZWxhdGVkIHRvIHZpZGVvIG9yIG51bGwuXG4gKlxuICogQHBhcmFtIGh0dHBDbGllbnRcbiAqIEBwYXJhbSB2aWRlb1xuICogQHJldHVybiB7Kn1cbiAqL1xuZnVuY3Rpb24gdmlkZW9QcmV2aWV3VXJsKGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIHZpZGVvOiBWaWRlb0luZm8pOiBPYnNlcnZhYmxlPHN0cmluZ3xudWxsPiB7XG4gIGlmICh2aWRlby5wcm92aWRlciA9PT0gJ3lvdXR1YmUnKSB7XG4gICAgcmV0dXJuIG9ic09mKGBodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke3ZpZGVvLmlkfS9kZWZhdWx0LmpwZ2ApO1xuICB9XG4gIGlmICh2aWRlby5wcm92aWRlciA9PT0gJ3ZpbWVvJykge1xuICAgIHJldHVybiBodHRwQ2xpZW50XG4gICAgICAgICAgICAgICAuZ2V0PHt0aHVtYm5haWxfdXJsOiBzdHJpbmd9PihcbiAgICAgICAgICAgICAgICAgICBgaHR0cHM6Ly92aW1lby5jb20vYXBpL29lbWJlZC5qc29uP3VybD1odHRwczovL3ZpbWVvLmNvbS8ke3ZpZGVvLmlkfWApXG4gICAgICAgICAgICAgICAucGlwZShcbiAgICAgICAgICAgICAgICAgICBtYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UudGh1bWJuYWlsX3VybCksXG4gICAgICAgICAgICAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvYnNPZihudWxsKSksXG4gICAgICAgICAgICAgICAgICAgKSBhcyBPYnNlcnZhYmxlPHN0cmluZ3xudWxsPjtcbiAgfVxuICByZXR1cm4gb2JzT2YoJycpO1xufVxuXG4vKipcbiAqIEl0IGNoZWNrcyB0aGUgdXJsIHBhcmFtLCBpZiB1cmwgaXMgYW4geW91dHViZSBvIHZpbWVvIGRvbWFpbiByZXR1cm5cbiAqIGFuIHZpZGVvSW5mbyBlbHNlIG51bGxcbiAqXG4gKiBAcGFyYW0gdXJsXG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiBnZXRWaWRlb1Byb3ZpZGVyQW5kSWQodXJsOiBzdHJpbmcpOiBWaWRlb0luZm98bnVsbCB7XG4gIGxldCBwcm92aWRlcjogQWpmVmlkZW9Qcm92aWRlcnxudWxsID0gbnVsbDtcbiAgbGV0IGlkOiBzdHJpbmd8bnVsbCA9IG51bGw7XG4gIGlmICgveW91dHViZXx5b3V0dVxcLmJlfHkydVxcLmJlfGkueXRpbWdcXC4vLnRlc3QodXJsKSkge1xuICAgIHByb3ZpZGVyID0gJ3lvdXR1YmUnO1xuICAgIGlkID0gZ2V0WW91VHViZVZpZGVvSWQodXJsKTtcbiAgfSBlbHNlIGlmICgvdmltZW8vLnRlc3QodXJsKSkge1xuICAgIHByb3ZpZGVyID0gJ3ZpbWVvJztcbiAgICBpZCA9IGdldFZpbWVvVmlkZW9JZCh1cmwpO1xuICB9XG4gIGlmIChwcm92aWRlciA9PSBudWxsIHx8IGlkID09IG51bGwpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICByZXR1cm4ge3Byb3ZpZGVyLCBpZH07XG59XG5cbi8qKlxuICogaXQgZ2V0cyB0aGUgaWQgb2YgdmltZW8gdmlkZW8gdXJsLlxuICpcbiAqIEBwYXJhbSB1cmxcbiAqIEByZXR1cm4geyp9XG4gKi9cbmZ1bmN0aW9uIGdldFZpbWVvVmlkZW9JZCh1cmw6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgaWYgKHVybC5pbmNsdWRlcygnIycpKSB7XG4gICAgdXJsID0gdXJsLnNwbGl0KCcjJylbMF07XG4gIH1cbiAgaWYgKHVybC5pbmNsdWRlcygnPycpICYmICF1cmwuaW5jbHVkZXMoJ2NsaXBfaWQ9JykpIHtcbiAgICB1cmwgPSB1cmwuc3BsaXQoJz8nKVswXTtcbiAgfVxuXG4gIGxldCBpZDogc3RyaW5nfG51bGwgPSBudWxsO1xuICBsZXQgYXJyOiBzdHJpbmdbXTtcblxuICBjb25zdCB2aW1lb1BpcGUgPSBbXG4gICAgJ2h0dHBzPzpcXC9cXC92aW1lb1xcLmNvbVxcL1swLTldKyQnLCAnaHR0cHM/OlxcL1xcL3BsYXllclxcLnZpbWVvXFwuY29tXFwvdmlkZW9cXC9bMC05XSskJyxcbiAgICAnaHR0cHM/OlxcL1xcL3ZpbWVvXFwuY29tXFwvY2hhbm5lbHMnLCAnZ3JvdXBzJywgJ2FsYnVtJ1xuICBdLmpvaW4oJ3wnKTtcblxuICBjb25zdCB2aW1lb1JlZ2V4ID0gbmV3IFJlZ0V4cCh2aW1lb1BpcGUsICdnaW0nKTtcblxuICBpZiAodmltZW9SZWdleC50ZXN0KHVybCkpIHtcbiAgICBhcnIgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICBpZiAoYXJyICYmIGFyci5sZW5ndGgpIHtcbiAgICAgIGlkID0gYXJyLnBvcCgpIGFzIHN0cmluZztcbiAgICB9XG4gIH0gZWxzZSBpZiAoL2NsaXBfaWQ9L2dpbS50ZXN0KHVybCkpIHtcbiAgICBhcnIgPSB1cmwuc3BsaXQoJ2NsaXBfaWQ9Jyk7XG4gICAgaWYgKGFyciAmJiBhcnIubGVuZ3RoKSB7XG4gICAgICBpZCA9IGFyclsxXS5zcGxpdCgnJicpWzBdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpZDtcbn1cblxuLyoqXG4gKiBpdCBnZXRzIHRoZSBpZCBvZiB5b3V0dWJlIHZpZGVvIHVybC5cbiAqXG4gKiBAcGFyYW0gdXJsXG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiBnZXRZb3VUdWJlVmlkZW9JZCh1cmw6IHN0cmluZyk6IHN0cmluZ3xudWxsIHtcbiAgY29uc3Qgc2hvcnRjb2RlID0gL3lvdXR1YmU6XFwvXFwvfGh0dHBzPzpcXC9cXC95b3V0dVxcLmJlXFwvfGh0dHA6XFwvXFwveTJ1XFwuYmVcXC8vZztcbiAgaWYgKHNob3J0Y29kZS50ZXN0KHVybCkpIHtcbiAgICBjb25zdCBzaG9ydGNvZGVJZCA9IHVybC5zcGxpdChzaG9ydGNvZGUpWzFdO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMoc2hvcnRjb2RlSWQpO1xuICB9XG4gIC8vIC92LyBvciAvdmkvXG4gIGNvbnN0IGlubGluZXYgPSAvXFwvdlxcL3xcXC92aVxcLy9nO1xuXG4gIGlmIChpbmxpbmV2LnRlc3QodXJsKSkge1xuICAgIGNvbnN0IGlubGluZUlkID0gdXJsLnNwbGl0KGlubGluZXYpWzFdO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMoaW5saW5lSWQpO1xuICB9XG5cbiAgLy8gdj0gb3Igdmk9XG4gIGNvbnN0IHBhcmFtZXRlclYgPSAvdj18dmk9L2c7XG5cbiAgaWYgKHBhcmFtZXRlclYudGVzdCh1cmwpKSB7XG4gICAgY29uc3QgYXJyID0gdXJsLnNwbGl0KHBhcmFtZXRlclYpO1xuICAgIHJldHVybiBhcnJbMV0uc3BsaXQoJyYnKVswXTtcbiAgfVxuXG4gIC8vIHY9IG9yIHZpPVxuICBjb25zdCBwYXJhbWV0ZXJXZWJwID0gL1xcL2FuX3dlYnBcXC8vZztcblxuICBpZiAocGFyYW1ldGVyV2VicC50ZXN0KHVybCkpIHtcbiAgICBjb25zdCB3ZWJwID0gdXJsLnNwbGl0KHBhcmFtZXRlcldlYnApWzFdO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMod2VicCk7XG4gIH1cblxuICAvLyBlbWJlZFxuICBjb25zdCBlbWJlZFJlZyA9IC9cXC9lbWJlZFxcLy9nO1xuXG4gIGlmIChlbWJlZFJlZy50ZXN0KHVybCkpIHtcbiAgICBjb25zdCBlbWJlZElkID0gdXJsLnNwbGl0KGVtYmVkUmVnKVsxXTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKGVtYmVkSWQpO1xuICB9XG5cbiAgLy8gaWdub3JlIC91c2VyL3VzZXJuYW1lIHBhdHRlcm5cbiAgY29uc3QgdXNlcm5hbWVSZWcgPSAvXFwvdXNlclxcLyhbYS16QS1aMC05XSopJC9nO1xuXG4gIGlmICh1c2VybmFtZVJlZy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIC8vIHVzZXJcbiAgY29uc3QgdXNlclJlZyA9IC9cXC91c2VyXFwvKD8hLip2aWRlb3MpL2c7XG5cbiAgaWYgKHVzZXJSZWcudGVzdCh1cmwpKSB7XG4gICAgY29uc3QgZWxlbWVudHMgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKGVsZW1lbnRzLnBvcCgpIGFzIHN0cmluZyk7XG4gIH1cblxuICAvLyBhdHRyaWJ1dGlvbl9saW5rXG4gIGNvbnN0IGF0dHJSZWcgPSAvXFwvYXR0cmlidXRpb25fbGlua1xcPy4qdiUzRChbXiUmXSopKCUyNnwmfCQpLztcblxuICBpZiAoYXR0clJlZy50ZXN0KHVybCkpIHtcbiAgICByZXR1cm4gKHVybC5tYXRjaChhdHRyUmVnKSBhcyBzdHJpbmdbXSlbMV07XG4gIH1cblxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc3RyaXBQYXJhbWV0ZXJzKHVybDogc3RyaW5nKTogc3RyaW5nIHtcbiAgLy8gU3BsaXQgcGFyYW1ldGVycyBvciBzcGxpdCBmb2xkZXIgc2VwYXJhdG9yXG4gIGlmICh1cmwuaW5jbHVkZXMoJz8nKSkge1xuICAgIHJldHVybiB1cmwuc3BsaXQoJz8nKVswXTtcbiAgfSBlbHNlIGlmICh1cmwuaW5jbHVkZXMoJy8nKSkge1xuICAgIHJldHVybiB1cmwuc3BsaXQoJy8nKVswXTtcbiAgfVxuICByZXR1cm4gdXJsO1xufVxuIl19