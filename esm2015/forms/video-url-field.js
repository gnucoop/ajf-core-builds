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
import { ChangeDetectorRef, Inject } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { of as obsOf } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
import { AjfFormRendererService } from './form-renderer';
import { AJF_WARNING_ALERT_SERVICE } from './warning-alert-service';
let AjfVideoUrlFieldComponent = /** @class */ (() => {
    class AjfVideoUrlFieldComponent extends AjfBaseFieldComponent {
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
    /** @nocollapse */
    AjfVideoUrlFieldComponent.ctorParameters = () => [
        { type: ChangeDetectorRef },
        { type: AjfFormRendererService },
        { type: undefined, decorators: [{ type: Inject, args: [AJF_WARNING_ALERT_SERVICE,] }] },
        { type: DomSanitizer },
        { type: HttpClient }
    ];
    return AjfVideoUrlFieldComponent;
})();
export { AjfVideoUrlFieldComponent };
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
function getVimeoVideoId(url) {
    if (url.indexOf('#') > -1) {
        url = url.split('#')[0];
    }
    if (url.indexOf('?') > -1 && url.indexOf('clip_id=') === -1) {
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
    if (url.indexOf('?') > -1) {
        return url.split('?')[0];
    }
    else if (url.indexOf('/') > -1) {
        return url.split('/')[0];
    }
    return url;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tdXJsLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdmlkZW8tdXJsLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxVQUFVLEVBQUMsTUFBTSxzQkFBc0IsQ0FBQztBQUNoRCxPQUFPLEVBQUMsaUJBQWlCLEVBQUUsTUFBTSxFQUFDLE1BQU0sZUFBZSxDQUFDO0FBRXhELE9BQU8sRUFBQyxZQUFZLEVBQWtCLE1BQU0sMkJBQTJCLENBQUM7QUFDeEUsT0FBTyxFQUFhLEVBQUUsSUFBSSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFDbkQsT0FBTyxFQUFDLHNCQUFzQixFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFDdkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDO0FBUzFGO0lBQUEsTUFBYSx5QkFBMEIsU0FBUSxxQkFBcUI7UUFJbEUsWUFDSSxHQUFzQixFQUFFLE9BQStCLEVBQ3BCLEdBQTJCLEVBQUUsWUFBMEIsRUFDMUYsVUFBc0I7WUFDeEIsS0FBSyxDQUFDLEdBQUcsRUFBRSxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUM7WUFFekIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQzNCLE1BQU0sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLE9BQU8sSUFBSSxJQUFJLENBQUMsRUFDbEMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxFQUFFO2dCQUNsQixPQUFPLEdBQUcsT0FBc0IsQ0FBQztnQkFDakMs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QjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBJbmplY3R9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHtGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIG9mIGFzIG9ic09mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbmV4cG9ydCB0eXBlIEFqZlZpZGVvUHJvdmlkZXIgPSAneW91dHViZSd8J3ZpbWVvJztcblxuaW50ZXJmYWNlIFZpZGVvSW5mbyB7XG4gIHByb3ZpZGVyOiBBamZWaWRlb1Byb3ZpZGVyO1xuICBpZDogc3RyaW5nO1xufVxuXG5leHBvcnQgY2xhc3MgQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudCBleHRlbmRzIEFqZkJhc2VGaWVsZENvbXBvbmVudCB7XG4gIHJlYWRvbmx5IHZhbGlkVXJsOiBPYnNlcnZhYmxlPGJvb2xlYW4+O1xuICByZWFkb25seSB2aWRlb1RodW1ibmFpbDogT2JzZXJ2YWJsZTxTYWZlUmVzb3VyY2VVcmw+O1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZiwgc2VydmljZTogQWpmRm9ybVJlbmRlcmVyU2VydmljZSxcbiAgICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLCBkb21TYW5pdGl6ZXI6IERvbVNhbml0aXplcixcbiAgICAgIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQpIHtcbiAgICBzdXBlcihjZHIsIHNlcnZpY2UsIHdhcyk7XG5cbiAgICBjb25zdCB2aWRlbyA9IHRoaXMuY29udHJvbC5waXBlKFxuICAgICAgICBmaWx0ZXIoY29udHJvbCA9PiBjb250cm9sICE9IG51bGwpLFxuICAgICAgICBzd2l0Y2hNYXAoY29udHJvbCA9PiB7XG4gICAgICAgICAgY29udHJvbCA9IGNvbnRyb2wgYXMgRm9ybUNvbnRyb2w7XG4gICAgICAgICAgcmV0dXJuIGNvbnRyb2wudmFsdWVDaGFuZ2VzLnBpcGUoXG4gICAgICAgICAgICAgIHN0YXJ0V2l0aChjb250cm9sLnZhbHVlKSxcbiAgICAgICAgICApO1xuICAgICAgICB9KSxcbiAgICAgICAgZmlsdGVyKHZhbHVlID0+IHZhbHVlICE9IG51bGwpLFxuICAgICAgICBtYXAodmFsdWUgPT4gZ2V0VmlkZW9Qcm92aWRlckFuZElkKHZhbHVlKSksXG4gICAgKTtcbiAgICB0aGlzLnZhbGlkVXJsID0gdmlkZW8ucGlwZShtYXAodiA9PiB2ICE9IG51bGwpKTtcbiAgICB0aGlzLnZpZGVvVGh1bWJuYWlsID0gdmlkZW8ucGlwZShcbiAgICAgICAgZmlsdGVyKGluZm8gPT4gaW5mbyAhPSBudWxsKSxcbiAgICAgICAgc3dpdGNoTWFwKGluZm8gPT4gdmlkZW9QcmV2aWV3VXJsKGh0dHBDbGllbnQsIGluZm8gYXMgVmlkZW9JbmZvKSksXG4gICAgICAgIGZpbHRlcih1cmwgPT4gdXJsICE9IG51bGwpLFxuICAgICAgICBtYXAodXJsID0+IGRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0UmVzb3VyY2VVcmwodXJsIGFzIHN0cmluZykpLFxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdmlkZW9QcmV2aWV3VXJsKGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsIHZpZGVvOiBWaWRlb0luZm8pOiBPYnNlcnZhYmxlPHN0cmluZ3xudWxsPiB7XG4gIGlmICh2aWRlby5wcm92aWRlciA9PT0gJ3lvdXR1YmUnKSB7XG4gICAgcmV0dXJuIG9ic09mKGBodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke3ZpZGVvLmlkfS9kZWZhdWx0LmpwZ2ApO1xuICB9XG4gIGlmICh2aWRlby5wcm92aWRlciA9PT0gJ3ZpbWVvJykge1xuICAgIHJldHVybiBodHRwQ2xpZW50XG4gICAgICAgIC5nZXQ8e3RodW1ibmFpbF91cmw6IHN0cmluZ30+KFxuICAgICAgICAgICAgYGh0dHBzOi8vdmltZW8uY29tL2FwaS9vZW1iZWQuanNvbj91cmw9aHR0cHM6Ly92aW1lby5jb20vJHt2aWRlby5pZH1gKVxuICAgICAgICAucGlwZShcbiAgICAgICAgICAgIG1hcChyZXNwb25zZSA9PiByZXNwb25zZS50aHVtYm5haWxfdXJsKSxcbiAgICAgICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2JzT2YobnVsbCkpLFxuICAgICAgICApO1xuICB9XG4gIHJldHVybiBvYnNPZignJyk7XG59XG5cbmZ1bmN0aW9uIGdldFZpZGVvUHJvdmlkZXJBbmRJZCh1cmw6IHN0cmluZyk6IFZpZGVvSW5mb3xudWxsIHtcbiAgbGV0IHByb3ZpZGVyOiBBamZWaWRlb1Byb3ZpZGVyfG51bGwgPSBudWxsO1xuICBsZXQgaWQ6IHN0cmluZ3xudWxsID0gbnVsbDtcbiAgaWYgKC95b3V0dWJlfHlvdXR1XFwuYmV8eTJ1XFwuYmV8aS55dGltZ1xcLi8udGVzdCh1cmwpKSB7XG4gICAgcHJvdmlkZXIgPSAneW91dHViZSc7XG4gICAgaWQgPSBnZXRZb3VUdWJlVmlkZW9JZCh1cmwpO1xuICB9IGVsc2UgaWYgKC92aW1lby8udGVzdCh1cmwpKSB7XG4gICAgcHJvdmlkZXIgPSAndmltZW8nO1xuICAgIGlkID0gZ2V0VmltZW9WaWRlb0lkKHVybCk7XG4gIH1cbiAgaWYgKHByb3ZpZGVyID09IG51bGwgfHwgaWQgPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB7cHJvdmlkZXIsIGlkfTtcbn1cblxuZnVuY3Rpb24gZ2V0VmltZW9WaWRlb0lkKHVybDogc3RyaW5nKTogc3RyaW5nfG51bGwge1xuICBpZiAodXJsLmluZGV4T2YoJyMnKSA+IC0xKSB7XG4gICAgdXJsID0gdXJsLnNwbGl0KCcjJylbMF07XG4gIH1cbiAgaWYgKHVybC5pbmRleE9mKCc/JykgPiAtMSAmJiB1cmwuaW5kZXhPZignY2xpcF9pZD0nKSA9PT0gLTEpIHtcbiAgICB1cmwgPSB1cmwuc3BsaXQoJz8nKVswXTtcbiAgfVxuXG4gIGxldCBpZDogc3RyaW5nfG51bGwgPSBudWxsO1xuICBsZXQgYXJyOiBzdHJpbmdbXTtcblxuICBjb25zdCB2aW1lb1BpcGUgPSBbXG4gICAgJ2h0dHBzPzpcXC9cXC92aW1lb1xcLmNvbVxcL1swLTldKyQnLCAnaHR0cHM/OlxcL1xcL3BsYXllclxcLnZpbWVvXFwuY29tXFwvdmlkZW9cXC9bMC05XSskJyxcbiAgICAnaHR0cHM/OlxcL1xcL3ZpbWVvXFwuY29tXFwvY2hhbm5lbHMnLCAnZ3JvdXBzJywgJ2FsYnVtJ1xuICBdLmpvaW4oJ3wnKTtcblxuICBjb25zdCB2aW1lb1JlZ2V4ID0gbmV3IFJlZ0V4cCh2aW1lb1BpcGUsICdnaW0nKTtcblxuICBpZiAodmltZW9SZWdleC50ZXN0KHVybCkpIHtcbiAgICBhcnIgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICBpZiAoYXJyICYmIGFyci5sZW5ndGgpIHtcbiAgICAgIGlkID0gYXJyLnBvcCgpIGFzIHN0cmluZztcbiAgICB9XG4gIH0gZWxzZSBpZiAoL2NsaXBfaWQ9L2dpbS50ZXN0KHVybCkpIHtcbiAgICBhcnIgPSB1cmwuc3BsaXQoJ2NsaXBfaWQ9Jyk7XG4gICAgaWYgKGFyciAmJiBhcnIubGVuZ3RoKSB7XG4gICAgICBpZCA9IGFyclsxXS5zcGxpdCgnJicpWzBdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpZDtcbn1cblxuZnVuY3Rpb24gZ2V0WW91VHViZVZpZGVvSWQodXJsOiBzdHJpbmcpOiBzdHJpbmd8bnVsbCB7XG4gIGNvbnN0IHNob3J0Y29kZSA9IC95b3V0dWJlOlxcL1xcL3xodHRwcz86XFwvXFwveW91dHVcXC5iZVxcL3xodHRwOlxcL1xcL3kydVxcLmJlXFwvL2c7XG4gIGlmIChzaG9ydGNvZGUudGVzdCh1cmwpKSB7XG4gICAgY29uc3Qgc2hvcnRjb2RlSWQgPSB1cmwuc3BsaXQoc2hvcnRjb2RlKVsxXTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKHNob3J0Y29kZUlkKTtcbiAgfVxuICAvLyAvdi8gb3IgL3ZpL1xuICBjb25zdCBpbmxpbmV2ID0gL1xcL3ZcXC98XFwvdmlcXC8vZztcblxuICBpZiAoaW5saW5ldi50ZXN0KHVybCkpIHtcbiAgICBjb25zdCBpbmxpbmVJZCA9IHVybC5zcGxpdChpbmxpbmV2KVsxXTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKGlubGluZUlkKTtcbiAgfVxuXG4gIC8vIHY9IG9yIHZpPVxuICBjb25zdCBwYXJhbWV0ZXJWID0gL3Y9fHZpPS9nO1xuXG4gIGlmIChwYXJhbWV0ZXJWLnRlc3QodXJsKSkge1xuICAgIGNvbnN0IGFyciA9IHVybC5zcGxpdChwYXJhbWV0ZXJWKTtcbiAgICByZXR1cm4gYXJyWzFdLnNwbGl0KCcmJylbMF07XG4gIH1cblxuICAvLyB2PSBvciB2aT1cbiAgY29uc3QgcGFyYW1ldGVyV2VicCA9IC9cXC9hbl93ZWJwXFwvL2c7XG5cbiAgaWYgKHBhcmFtZXRlcldlYnAudGVzdCh1cmwpKSB7XG4gICAgY29uc3Qgd2VicCA9IHVybC5zcGxpdChwYXJhbWV0ZXJXZWJwKVsxXTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKHdlYnApO1xuICB9XG5cbiAgLy8gZW1iZWRcbiAgY29uc3QgZW1iZWRSZWcgPSAvXFwvZW1iZWRcXC8vZztcblxuICBpZiAoZW1iZWRSZWcudGVzdCh1cmwpKSB7XG4gICAgY29uc3QgZW1iZWRJZCA9IHVybC5zcGxpdChlbWJlZFJlZylbMV07XG4gICAgcmV0dXJuIHN0cmlwUGFyYW1ldGVycyhlbWJlZElkKTtcbiAgfVxuXG4gIC8vIGlnbm9yZSAvdXNlci91c2VybmFtZSBwYXR0ZXJuXG4gIGNvbnN0IHVzZXJuYW1lUmVnID0gL1xcL3VzZXJcXC8oW2EtekEtWjAtOV0qKSQvZztcblxuICBpZiAodXNlcm5hbWVSZWcudGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyB1c2VyXG4gIGNvbnN0IHVzZXJSZWcgPSAvXFwvdXNlclxcLyg/IS4qdmlkZW9zKS9nO1xuXG4gIGlmICh1c2VyUmVnLnRlc3QodXJsKSkge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gdXJsLnNwbGl0KCcvJyk7XG4gICAgcmV0dXJuIHN0cmlwUGFyYW1ldGVycyhlbGVtZW50cy5wb3AoKSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgLy8gYXR0cmlidXRpb25fbGlua1xuICBjb25zdCBhdHRyUmVnID0gL1xcL2F0dHJpYnV0aW9uX2xpbmtcXD8uKnYlM0QoW14lJl0qKSglMjZ8JnwkKS87XG5cbiAgaWYgKGF0dHJSZWcudGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuICh1cmwubWF0Y2goYXR0clJlZykgYXMgc3RyaW5nW10pWzFdO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHN0cmlwUGFyYW1ldGVycyh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIC8vIFNwbGl0IHBhcmFtZXRlcnMgb3Igc3BsaXQgZm9sZGVyIHNlcGFyYXRvclxuICBpZiAodXJsLmluZGV4T2YoJz8nKSA+IC0xKSB7XG4gICAgcmV0dXJuIHVybC5zcGxpdCgnPycpWzBdO1xuICB9IGVsc2UgaWYgKHVybC5pbmRleE9mKCcvJykgPiAtMSkge1xuICAgIHJldHVybiB1cmwuc3BsaXQoJy8nKVswXTtcbiAgfVxuICByZXR1cm4gdXJsO1xufVxuIl19