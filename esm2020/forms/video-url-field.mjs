import { Directive, Inject } from '@angular/core';
import { of as obsOf } from 'rxjs';
import { catchError, filter, map, startWith, switchMap } from 'rxjs/operators';
import { AjfBaseFieldComponent } from './base-field';
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
AjfVideoUrlFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfVideoUrlFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2.DomSanitizer }, { token: i3.HttpClient }], target: i0.ɵɵFactoryTarget.Directive });
AjfVideoUrlFieldComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "14.0.0", version: "15.0.4", type: AjfVideoUrlFieldComponent, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "15.0.4", ngImport: i0, type: AjfVideoUrlFieldComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tdXJsLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdmlkZW8tdXJsLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHbkUsT0FBTyxFQUFhLEVBQUUsSUFBSSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFbkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7OztBQVMxRjs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxxQkFBcUI7SUFJbEUsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUNJLEdBQTJCLEVBQzlELFlBQTBCLEVBQzFCLFVBQXNCO1FBRXRCLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQ2xDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQixPQUFPLEdBQUcsT0FBNkIsQ0FBQztZQUN4QyxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsRUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxD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QixDQUFDO0lBRS9DLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN6QixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsT0FBTztJQUNQLE1BQU0sT0FBTyxHQUFHLHVCQUF1QixDQUFDO0lBRXhDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNyQixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQVksQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsbUJBQW1CO0lBQ25CLE1BQU0sT0FBTyxHQUFHLDZDQUE2QyxDQUFDO0lBRTlELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNyQixPQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxHQUFXO0lBQ2xDLDZDQUE2QztJQUM3QyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDckIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFCO1NBQU0sSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzVCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxQjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge1VudHlwZWRGb3JtQ29udHJvbH0gZnJvbSAnQGFuZ3VsYXIvZm9ybXMnO1xuaW1wb3J0IHtEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQge09ic2VydmFibGUsIG9mIGFzIG9ic09mfSBmcm9tICdyeGpzJztcbmltcG9ydCB7Y2F0Y2hFcnJvciwgZmlsdGVyLCBtYXAsIHN0YXJ0V2l0aCwgc3dpdGNoTWFwfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7QWpmQmFzZUZpZWxkQ29tcG9uZW50fSBmcm9tICcuL2Jhc2UtZmllbGQnO1xuaW1wb3J0IHtBamZGb3JtUmVuZGVyZXJTZXJ2aWNlfSBmcm9tICcuL2Zvcm0tcmVuZGVyZXInO1xuaW1wb3J0IHtBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFLCBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlfSBmcm9tICcuL3dhcm5pbmctYWxlcnQtc2VydmljZSc7XG5cbmV4cG9ydCB0eXBlIEFqZlZpZGVvUHJvdmlkZXIgPSAneW91dHViZScgfCAndmltZW8nO1xuXG5pbnRlcmZhY2UgVmlkZW9JbmZvIHtcbiAgcHJvdmlkZXI6IEFqZlZpZGVvUHJvdmlkZXI7XG4gIGlkOiBzdHJpbmc7XG59XG5cbi8qKlxuICogSXQgYWxsb3dzIHRoZSBsb2FkaW5nIG9mIHZpZGVvKHlvdXR1YmUgb3IgdmltZW8pIHVybCBpbnNpZGUgYW4gQWpmRm9ybS5cbiAqXG4gKiBAZXhwb3J0XG4gKiBAY2xhc3MgQWpmVmlkZW9VcmxGaWVsZENvbXBvbmVudFxuICovXG5ARGlyZWN0aXZlKClcbmV4cG9ydCBjbGFzcyBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50IGV4dGVuZHMgQWpmQmFzZUZpZWxkQ29tcG9uZW50IHtcbiAgcmVhZG9ubHkgdmFsaWRVcmw6IE9ic2VydmFibGU8Ym9vbGVhbj47XG4gIHJlYWRvbmx5IHZpZGVvVGh1bWJuYWlsOiBPYnNlcnZhYmxlPFNhZmVSZXNvdXJjZVVybD47XG5cbiAgY29uc3RydWN0b3IoXG4gICAgY2RyOiBDaGFuZ2VEZXRlY3RvclJlZixcbiAgICBzZXJ2aWNlOiBBamZGb3JtUmVuZGVyZXJTZXJ2aWNlLFxuICAgIEBJbmplY3QoQUpGX1dBUk5JTkdfQUxFUlRfU0VSVklDRSkgd2FzOiBBamZXYXJuaW5nQWxlcnRTZXJ2aWNlLFxuICAgIGRvbVNhbml0aXplcjogRG9tU2FuaXRpemVyLFxuICAgIGh0dHBDbGllbnQ6IEh0dHBDbGllbnQsXG4gICkge1xuICAgIHN1cGVyKGNkciwgc2VydmljZSwgd2FzKTtcblxuICAgIGNvbnN0IHZpZGVvID0gdGhpcy5jb250cm9sLnBpcGUoXG4gICAgICBmaWx0ZXIoY29udHJvbCA9PiBjb250cm9sICE9IG51bGwpLFxuICAgICAgc3dpdGNoTWFwKGNvbnRyb2wgPT4ge1xuICAgICAgICBjb250cm9sID0gY29udHJvbCBhcyBVbnR5cGVkRm9ybUNvbnRyb2w7XG4gICAgICAgIHJldHVybiBjb250cm9sLnZhbHVlQ2hhbmdlcy5waXBlKHN0YXJ0V2l0aChjb250cm9sLnZhbHVlKSk7XG4gICAgICB9KSxcbiAgICAgIGZpbHRlcih2YWx1ZSA9PiB2YWx1ZSAhPSBudWxsKSxcbiAgICAgIG1hcCh2YWx1ZSA9PiBnZXRWaWRlb1Byb3ZpZGVyQW5kSWQodmFsdWUgYXMgc3RyaW5nKSksXG4gICAgKTtcbiAgICB0aGlzLnZhbGlkVXJsID0gdmlkZW8ucGlwZShtYXAodiA9PiB2ICE9IG51bGwpKTtcbiAgICB0aGlzLnZpZGVvVGh1bWJuYWlsID0gdmlkZW8ucGlwZShcbiAgICAgIGZpbHRlcihpbmZvID0+IGluZm8gIT0gbnVsbCksXG4gICAgICBzd2l0Y2hNYXAoaW5mbyA9PiB2aWRlb1ByZXZpZXdVcmwoaHR0cENsaWVudCwgaW5mbyBhcyBWaWRlb0luZm8pKSxcbiAgICAgIGZpbHRlcih1cmwgPT4gdXJsICE9IG51bGwpLFxuICAgICAgbWFwKHVybCA9PiBkb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFJlc291cmNlVXJsKHVybCBhcyBzdHJpbmcpKSxcbiAgICApO1xuICB9XG59XG5cbi8qKlxuICogaXQgcmV0dXJucyBhIHVybCBvZiB0aHVtYm5haWwgcmVsYXRlZCB0byB2aWRlbyBvciBudWxsLlxuICpcbiAqIEBwYXJhbSBodHRwQ2xpZW50XG4gKiBAcGFyYW0gdmlkZW9cbiAqIEByZXR1cm4geyp9XG4gKi9cbmZ1bmN0aW9uIHZpZGVvUHJldmlld1VybChodHRwQ2xpZW50OiBIdHRwQ2xpZW50LCB2aWRlbzogVmlkZW9JbmZvKTogT2JzZXJ2YWJsZTxzdHJpbmcgfCBudWxsPiB7XG4gIGlmICh2aWRlby5wcm92aWRlciA9PT0gJ3lvdXR1YmUnKSB7XG4gICAgcmV0dXJuIG9ic09mKGBodHRwczovL2ltZy55b3V0dWJlLmNvbS92aS8ke3ZpZGVvLmlkfS9kZWZhdWx0LmpwZ2ApO1xuICB9XG4gIGlmICh2aWRlby5wcm92aWRlciA9PT0gJ3ZpbWVvJykge1xuICAgIHJldHVybiBodHRwQ2xpZW50XG4gICAgICAuZ2V0PHt0aHVtYm5haWxfdXJsOiBzdHJpbmd9PihcbiAgICAgICAgYGh0dHBzOi8vdmltZW8uY29tL2FwaS9vZW1iZWQuanNvbj91cmw9aHR0cHM6Ly92aW1lby5jb20vJHt2aWRlby5pZH1gLFxuICAgICAgKVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcChyZXNwb25zZSA9PiByZXNwb25zZS50aHVtYm5haWxfdXJsKSxcbiAgICAgICAgY2F0Y2hFcnJvcigoKSA9PiBvYnNPZihudWxsKSksXG4gICAgICApIGFzIE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD47XG4gIH1cbiAgcmV0dXJuIG9ic09mKCcnKTtcbn1cblxuLyoqXG4gKiBJdCBjaGVja3MgdGhlIHVybCBwYXJhbSwgaWYgdXJsIGlzIGFuIHlvdXR1YmUgbyB2aW1lbyBkb21haW4gcmV0dXJuXG4gKiBhbiB2aWRlb0luZm8gZWxzZSBudWxsXG4gKlxuICogQHBhcmFtIHVybFxuICogQHJldHVybiB7Kn1cbiAqL1xuZnVuY3Rpb24gZ2V0VmlkZW9Qcm92aWRlckFuZElkKHVybDogc3RyaW5nKTogVmlkZW9JbmZvIHwgbnVsbCB7XG4gIGxldCBwcm92aWRlcjogQWpmVmlkZW9Qcm92aWRlciB8IG51bGwgPSBudWxsO1xuICBsZXQgaWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBpZiAoL3lvdXR1YmV8eW91dHVcXC5iZXx5MnVcXC5iZXxpLnl0aW1nXFwuLy50ZXN0KHVybCkpIHtcbiAgICBwcm92aWRlciA9ICd5b3V0dWJlJztcbiAgICBpZCA9IGdldFlvdVR1YmVWaWRlb0lkKHVybCk7XG4gIH0gZWxzZSBpZiAoL3ZpbWVvLy50ZXN0KHVybCkpIHtcbiAgICBwcm92aWRlciA9ICd2aW1lbyc7XG4gICAgaWQgPSBnZXRWaW1lb1ZpZGVvSWQodXJsKTtcbiAgfVxuICBpZiAocHJvdmlkZXIgPT0gbnVsbCB8fCBpZCA9PSBudWxsKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cbiAgcmV0dXJuIHtwcm92aWRlciwgaWR9O1xufVxuXG4vKipcbiAqIGl0IGdldHMgdGhlIGlkIG9mIHZpbWVvIHZpZGVvIHVybC5cbiAqXG4gKiBAcGFyYW0gdXJsXG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiBnZXRWaW1lb1ZpZGVvSWQodXJsOiBzdHJpbmcpOiBzdHJpbmcgfCBudWxsIHtcbiAgaWYgKHVybC5pbmNsdWRlcygnIycpKSB7XG4gICAgdXJsID0gdXJsLnNwbGl0KCcjJylbMF07XG4gIH1cbiAgaWYgKHVybC5pbmNsdWRlcygnPycpICYmICF1cmwuaW5jbHVkZXMoJ2NsaXBfaWQ9JykpIHtcbiAgICB1cmwgPSB1cmwuc3BsaXQoJz8nKVswXTtcbiAgfVxuXG4gIGxldCBpZDogc3RyaW5nIHwgbnVsbCA9IG51bGw7XG4gIGxldCBhcnI6IHN0cmluZ1tdO1xuXG4gIGNvbnN0IHZpbWVvUGlwZSA9IFtcbiAgICAnaHR0cHM/Oi8vdmltZW8uY29tL1swLTldKyQnLFxuICAgICdodHRwcz86Ly9wbGF5ZXIudmltZW8uY29tL3ZpZGVvL1swLTldKyQnLFxuICAgICdodHRwcz86Ly92aW1lby5jb20vY2hhbm5lbHMnLFxuICAgICdncm91cHMnLFxuICAgICdhbGJ1bScsXG4gIF0uam9pbignfCcpO1xuXG4gIGNvbnN0IHZpbWVvUmVnZXggPSBuZXcgUmVnRXhwKHZpbWVvUGlwZSwgJ2dpbScpO1xuXG4gIGlmICh2aW1lb1JlZ2V4LnRlc3QodXJsKSkge1xuICAgIGFyciA9IHVybC5zcGxpdCgnLycpO1xuICAgIGlmIChhcnIgJiYgYXJyLmxlbmd0aCkge1xuICAgICAgaWQgPSBhcnIucG9wKCkgYXMgc3RyaW5nO1xuICAgIH1cbiAgfSBlbHNlIGlmICgvY2xpcF9pZD0vZ2ltLnRlc3QodXJsKSkge1xuICAgIGFyciA9IHVybC5zcGxpdCgnY2xpcF9pZD0nKTtcbiAgICBpZiAoYXJyICYmIGFyci5sZW5ndGgpIHtcbiAgICAgIGlkID0gYXJyWzFdLnNwbGl0KCcmJylbMF07XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGlkO1xufVxuXG4vKipcbiAqIGl0IGdldHMgdGhlIGlkIG9mIHlvdXR1YmUgdmlkZW8gdXJsLlxuICpcbiAqIEBwYXJhbSB1cmxcbiAqIEByZXR1cm4geyp9XG4gKi9cbmZ1bmN0aW9uIGdldFlvdVR1YmVWaWRlb0lkKHVybDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIGNvbnN0IHNob3J0Y29kZSA9IC95b3V0dWJlOlxcL1xcL3xodHRwcz86XFwvXFwveW91dHVcXC5iZVxcL3xodHRwOlxcL1xcL3kydVxcLmJlXFwvL2c7XG4gIGlmIChzaG9ydGNvZGUudGVzdCh1cmwpKSB7XG4gICAgY29uc3Qgc2hvcnRjb2RlSWQgPSB1cmwuc3BsaXQoc2hvcnRjb2RlKVsxXTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKHNob3J0Y29kZUlkKTtcbiAgfVxuICAvLyAvdi8gb3IgL3ZpL1xuICBjb25zdCBpbmxpbmV2ID0gL1xcL3ZcXC98XFwvdmlcXC8vZztcblxuICBpZiAoaW5saW5ldi50ZXN0KHVybCkpIHtcbiAgICBjb25zdCBpbmxpbmVJZCA9IHVybC5zcGxpdChpbmxpbmV2KVsxXTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKGlubGluZUlkKTtcbiAgfVxuXG4gIC8vIHY9IG9yIHZpPVxuICBjb25zdCBwYXJhbWV0ZXJWID0gL3Y9fHZpPS9nO1xuXG4gIGlmIChwYXJhbWV0ZXJWLnRlc3QodXJsKSkge1xuICAgIGNvbnN0IGFyciA9IHVybC5zcGxpdChwYXJhbWV0ZXJWKTtcbiAgICByZXR1cm4gYXJyWzFdLnNwbGl0KCcmJylbMF07XG4gIH1cblxuICAvLyB2PSBvciB2aT1cbiAgY29uc3QgcGFyYW1ldGVyV2VicCA9IC9cXC9hbl93ZWJwXFwvL2c7XG5cbiAgaWYgKHBhcmFtZXRlcldlYnAudGVzdCh1cmwpKSB7XG4gICAgY29uc3Qgd2VicCA9IHVybC5zcGxpdChwYXJhbWV0ZXJXZWJwKVsxXTtcbiAgICByZXR1cm4gc3RyaXBQYXJhbWV0ZXJzKHdlYnApO1xuICB9XG5cbiAgLy8gZW1iZWRcbiAgY29uc3QgZW1iZWRSZWcgPSAvXFwvZW1iZWRcXC8vZztcblxuICBpZiAoZW1iZWRSZWcudGVzdCh1cmwpKSB7XG4gICAgY29uc3QgZW1iZWRJZCA9IHVybC5zcGxpdChlbWJlZFJlZylbMV07XG4gICAgcmV0dXJuIHN0cmlwUGFyYW1ldGVycyhlbWJlZElkKTtcbiAgfVxuXG4gIC8vIGlnbm9yZSAvdXNlci91c2VybmFtZSBwYXR0ZXJuXG4gIGNvbnN0IHVzZXJuYW1lUmVnID0gL1xcL3VzZXJcXC8oW2EtekEtWjAtOV0qKSQvZztcblxuICBpZiAodXNlcm5hbWVSZWcudGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICAvLyB1c2VyXG4gIGNvbnN0IHVzZXJSZWcgPSAvXFwvdXNlclxcLyg/IS4qdmlkZW9zKS9nO1xuXG4gIGlmICh1c2VyUmVnLnRlc3QodXJsKSkge1xuICAgIGNvbnN0IGVsZW1lbnRzID0gdXJsLnNwbGl0KCcvJyk7XG4gICAgcmV0dXJuIHN0cmlwUGFyYW1ldGVycyhlbGVtZW50cy5wb3AoKSBhcyBzdHJpbmcpO1xuICB9XG5cbiAgLy8gYXR0cmlidXRpb25fbGlua1xuICBjb25zdCBhdHRyUmVnID0gL1xcL2F0dHJpYnV0aW9uX2xpbmtcXD8uKnYlM0QoW14lJl0qKSglMjZ8JnwkKS87XG5cbiAgaWYgKGF0dHJSZWcudGVzdCh1cmwpKSB7XG4gICAgcmV0dXJuICh1cmwubWF0Y2goYXR0clJlZykgYXMgc3RyaW5nW10pWzFdO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbmZ1bmN0aW9uIHN0cmlwUGFyYW1ldGVycyh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIC8vIFNwbGl0IHBhcmFtZXRlcnMgb3Igc3BsaXQgZm9sZGVyIHNlcGFyYXRvclxuICBpZiAodXJsLmluY2x1ZGVzKCc/JykpIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KCc/JylbMF07XG4gIH0gZWxzZSBpZiAodXJsLmluY2x1ZGVzKCcvJykpIHtcbiAgICByZXR1cm4gdXJsLnNwbGl0KCcvJylbMF07XG4gIH1cbiAgcmV0dXJuIHVybDtcbn1cbiJdfQ==