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
AjfVideoUrlFieldComponent.ɵfac = i0.ɵɵngDeclareFactory({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfVideoUrlFieldComponent, deps: [{ token: i0.ChangeDetectorRef }, { token: i1.AjfFormRendererService }, { token: AJF_WARNING_ALERT_SERVICE }, { token: i2.DomSanitizer }, { token: i3.HttpClient }], target: i0.ɵɵFactoryTarget.Directive });
AjfVideoUrlFieldComponent.ɵdir = i0.ɵɵngDeclareDirective({ minVersion: "12.0.0", version: "13.2.5", type: AjfVideoUrlFieldComponent, usesInheritance: true, ngImport: i0 });
i0.ɵɵngDeclareClassMetadata({ minVersion: "12.0.0", version: "13.2.5", ngImport: i0, type: AjfVideoUrlFieldComponent, decorators: [{
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmlkZW8tdXJsLWZpZWxkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvdmlkZW8tdXJsLWZpZWxkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQXVCQSxPQUFPLEVBQW9CLFNBQVMsRUFBRSxNQUFNLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFHbkUsT0FBTyxFQUFhLEVBQUUsSUFBSSxLQUFLLEVBQUMsTUFBTSxNQUFNLENBQUM7QUFDN0MsT0FBTyxFQUFDLFVBQVUsRUFBRSxNQUFNLEVBQUUsR0FBRyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUMsTUFBTSxnQkFBZ0IsQ0FBQztBQUU3RSxPQUFPLEVBQUMscUJBQXFCLEVBQUMsTUFBTSxjQUFjLENBQUM7QUFFbkQsT0FBTyxFQUFDLHlCQUF5QixFQUF5QixNQUFNLHlCQUF5QixDQUFDOzs7OztBQVMxRjs7Ozs7R0FLRztBQUVILE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxxQkFBcUI7SUFJbEUsWUFDRSxHQUFzQixFQUN0QixPQUErQixFQUNJLEdBQTJCLEVBQzlELFlBQTBCLEVBQzFCLFVBQXNCO1FBRXRCLEtBQUssQ0FBQyxHQUFHLEVBQUUsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUFDO1FBRXpCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUM3QixNQUFNLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLEVBQ2xDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUNsQixPQUFPLEdBQUcsT0FBc0IsQ0FBQztZQUNqQyxPQUFPLE9BQU8sQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQztRQUM3RCxDQUFDLENBQUMsRUFDRixNQUFNLENBQUMsS0FBSyxDQUFDLEVBQUUsQ0FBQyxLQUFLLElBQUksSUFBSSxDQUFDLEVBQzlCLEdBQUcsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLHFCQUFxQixDQUFDLEtBQWUsQ0FBQyxDQUFDLENBQ3JELENBQUM7UUFDRixJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDaEQsSUFBSSxDQUFDLGNBQWMsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUM5QixNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEVBQzVCLFNBQVMsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLGVBQWUsQ0FBQyxVQUFVLEVBQUUsSUFBaUIsQ0FBQyxDQUFDLEVBQ2pFLE1BQU0sQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxJQUFJLENBQUMsRUFDMUIsR0FBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsWUFBWSxDQUFDLDhCQUE4QixDQUFDLEdBQWEsQ0FBQyxDQUFDLENBQ3ZFLENBQUM7SUFDSixDQUFDOztzSEE3QlUseUJBQXlCLHlGQU8xQix5QkFBeUI7MEdBUHhCLHlCQUF5QjsyRkFBekIseUJBQXlCO2tCQURyQyxTQUFTOzswQkFRTCxNQUFNOzJCQUFDLHlCQUF5Qjs7QUF5QnJDOzs7Ozs7R0FNRztBQUNILFNBQVMsZUFBZSxDQUFDLFVBQXNCLEVBQUUsS0FBZ0I7SUFDL0QsSUFBSSxLQUFLLENBQUMsUUFBUSxLQUFLLFNBQVMsRUFBRTtRQUNoQyxPQUFPLEtBQUssQ0FBQyw4QkFBOEIsS0FBSyxDQUFDLEVBQUUsY0FBYyxDQUFDLENBQUM7S0FDcEU7SUFDRCxJQUFJLEtBQUssQ0FBQyxRQUFRLEtBQUssT0FBTyxFQUFFO1FBQzlCLE9BQU8sVUFBVTthQUNkLEdBQUcsQ0FDRiwyREFBMkQsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUN0RTthQUNBLElBQUksQ0FDSCxHQUFHLENBQUMsUUFBUSxDQUFDLEVBQUUsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLEVBQ3ZDLFVBQVUsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FDRCxDQUFDO0tBQ2xDO0lBQ0QsT0FBTyxLQUFLLENBQUMsRUFBRSxDQUFDLENBQUM7QUFDbkIsQ0FBQztBQUVEOzs7Ozs7R0FNRztBQUNILFNBQVMscUJBQXFCLENBQUMsR0FBVztJQUN4QyxJQUFJLFFBQVEsR0FBNEIsSUFBSSxDQUFDO0lBQzdDLElBQUksRUFBRSxHQUFrQixJQUFJLENBQUM7SUFDN0IsSUFBSSxxQ0FBcUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDbkQsUUFBUSxHQUFHLFNBQVMsQ0FBQztRQUNyQixFQUFFLEdBQUcsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDN0I7U0FBTSxJQUFJLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDNUIsUUFBUSxHQUFHLE9BQU8sQ0FBQztRQUNuQixFQUFFLEdBQUcsZUFBZSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQzNCO0lBQ0QsSUFBSSxRQUFRLElBQUksSUFBSSxJQUFJLEVBQUUsSUFBSSxJQUFJLEVBQUU7UUFDbEMsT0FBTyxJQUFJLENBQUM7S0FDYjtJQUNELE9BQU8sRUFBQyxRQUFRLEVBQUUsRUFBRSxFQUFDLENBQUM7QUFDeEIsQ0FBQztBQUVEOzs7OztHQUtHO0FBQ0gsU0FBUyxlQUFlLENBQUMsR0FBVztJQUNsQyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDckIsR0FBRyxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDekI7SUFDRCxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxFQUFFO1FBQ2xELEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQ3pCO0lBRUQsSUFBSSxFQUFFLEdBQWtCLElBQUksQ0FBQztJQUM3QixJQUFJLEdBQWEsQ0FBQztJQUVsQixNQUFNLFNBQVMsR0FBRztRQUNoQiw0QkFBNEI7UUFDNUIseUNBQXlDO1FBQ3pDLDZCQUE2QjtRQUM3QixRQUFRO1FBQ1IsT0FBTztLQUNSLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRVosTUFBTSxVQUFVLEdBQUcsSUFBSSxNQUFNLENBQUMsU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBRWhELElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN4QixHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyQixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ3JCLEVBQUUsR0FBRyxHQUFHLENBQUMsR0FBRyxFQUFZLENBQUM7U0FDMUI7S0FDRjtTQUFNLElBQUksYUFBYSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNsQyxHQUFHLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUM1QixJQUFJLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxFQUFFO1lBQ3JCLEVBQUUsR0FBRyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1NBQzNCO0tBQ0Y7SUFFRCxPQUFPLEVBQUUsQ0FBQztBQUNaLENBQUM7QUFFRDs7Ozs7R0FLRztBQUNILFNBQVMsaUJBQWlCLENBQUMsR0FBVztJQUNwQyxNQUFNLFNBQVMsR0FBRyx5REFBeUQsQ0FBQztJQUM1RSxJQUFJLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDdkIsTUFBTSxXQUFXLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUM1QyxPQUFPLGVBQWUsQ0FBQyxXQUFXLENBQUMsQ0FBQztLQUNyQztJQUNELGNBQWM7SUFDZCxNQUFNLE9BQU8sR0FBRyxlQUFlLENBQUM7SUFFaEMsSUFBSSxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQ3JCLE1BQU0sUUFBUSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDdkMsT0FBTyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7S0FDbEM7SUFFRCxZQUFZO0lBQ1osTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDO0lBRTdCLElBQUksVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN4QixNQUFNLEdBQUcsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xDLE9BQU8sR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUM3QjtJQUVELFlBQVk7SUFDWixNQUFNLGFBQWEsR0FBRyxjQUFjLENBQUM7SUFFckMsSUFBSSxhQUFhLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzNCLE1BQU0sSUFBSSxHQUFHLEdBQUcsQ0FBQyxLQUFLLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7UUFDekMsT0FBTyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDOUI7SUFFRCxRQUFRO0lBQ1IsTUFBTSxRQUFRLEdBQUcsWUFBWSxDQUFDO0lBRTlCLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN0QixNQUFNLE9BQU8sR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLE9BQU8sZUFBZSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0tBQ2pDO0lBRUQsZ0NBQWdDO0lBQ2hDLE1BQU0sV0FBVyxHQUFHLDBCQUEwQixDQUFDO0lBRS9DLElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUN6QixPQUFPLElBQUksQ0FBQztLQUNiO0lBRUQsT0FBTztJQUNQLE1BQU0sT0FBTyxHQUFHLHVCQUF1QixDQUFDO0lBRXhDLElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNyQixNQUFNLFFBQVEsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ2hDLE9BQU8sZUFBZSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQVksQ0FBQyxDQUFDO0tBQ2xEO0lBRUQsbUJBQW1CO0lBQ25CLE1BQU0sT0FBTyxHQUFHLDZDQUE2QyxDQUFDO0lBRTlELElBQUksT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRTtRQUNyQixPQUFRLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFjLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDNUM7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNkLENBQUM7QUFFRCxTQUFTLGVBQWUsQ0FBQyxHQUFXO0lBQ2xDLDZDQUE2QztJQUM3QyxJQUFJLEdBQUcsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEVBQUU7UUFDckIsT0FBTyxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO0tBQzFCO1NBQU0sSUFBSSxHQUFHLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1FBQzVCLE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztLQUMxQjtJQUNELE9BQU8sR0FBRyxDQUFDO0FBQ2IsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtIdHRwQ2xpZW50fSBmcm9tICdAYW5ndWxhci9jb21tb24vaHR0cCc7XG5pbXBvcnQge0NoYW5nZURldGVjdG9yUmVmLCBEaXJlY3RpdmUsIEluamVjdH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQge0Zvcm1Db250cm9sfSBmcm9tICdAYW5ndWxhci9mb3Jtcyc7XG5pbXBvcnQge0RvbVNhbml0aXplciwgU2FmZVJlc291cmNlVXJsfSBmcm9tICdAYW5ndWxhci9wbGF0Zm9ybS1icm93c2VyJztcbmltcG9ydCB7T2JzZXJ2YWJsZSwgb2YgYXMgb2JzT2Z9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHtjYXRjaEVycm9yLCBmaWx0ZXIsIG1hcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHtBamZCYXNlRmllbGRDb21wb25lbnR9IGZyb20gJy4vYmFzZS1maWVsZCc7XG5pbXBvcnQge0FqZkZvcm1SZW5kZXJlclNlcnZpY2V9IGZyb20gJy4vZm9ybS1yZW5kZXJlcic7XG5pbXBvcnQge0FKRl9XQVJOSU5HX0FMRVJUX1NFUlZJQ0UsIEFqZldhcm5pbmdBbGVydFNlcnZpY2V9IGZyb20gJy4vd2FybmluZy1hbGVydC1zZXJ2aWNlJztcblxuZXhwb3J0IHR5cGUgQWpmVmlkZW9Qcm92aWRlciA9ICd5b3V0dWJlJyB8ICd2aW1lbyc7XG5cbmludGVyZmFjZSBWaWRlb0luZm8ge1xuICBwcm92aWRlcjogQWpmVmlkZW9Qcm92aWRlcjtcbiAgaWQ6IHN0cmluZztcbn1cblxuLyoqXG4gKiBJdCBhbGxvd3MgdGhlIGxvYWRpbmcgb2YgdmlkZW8oeW91dHViZSBvciB2aW1lbykgdXJsIGluc2lkZSBhbiBBamZGb3JtLlxuICpcbiAqIEBleHBvcnRcbiAqIEBjbGFzcyBBamZWaWRlb1VybEZpZWxkQ29tcG9uZW50XG4gKi9cbkBEaXJlY3RpdmUoKVxuZXhwb3J0IGNsYXNzIEFqZlZpZGVvVXJsRmllbGRDb21wb25lbnQgZXh0ZW5kcyBBamZCYXNlRmllbGRDb21wb25lbnQge1xuICByZWFkb25seSB2YWxpZFVybDogT2JzZXJ2YWJsZTxib29sZWFuPjtcbiAgcmVhZG9ubHkgdmlkZW9UaHVtYm5haWw6IE9ic2VydmFibGU8U2FmZVJlc291cmNlVXJsPjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBjZHI6IENoYW5nZURldGVjdG9yUmVmLFxuICAgIHNlcnZpY2U6IEFqZkZvcm1SZW5kZXJlclNlcnZpY2UsXG4gICAgQEluamVjdChBSkZfV0FSTklOR19BTEVSVF9TRVJWSUNFKSB3YXM6IEFqZldhcm5pbmdBbGVydFNlcnZpY2UsXG4gICAgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsXG4gICAgaHR0cENsaWVudDogSHR0cENsaWVudCxcbiAgKSB7XG4gICAgc3VwZXIoY2RyLCBzZXJ2aWNlLCB3YXMpO1xuXG4gICAgY29uc3QgdmlkZW8gPSB0aGlzLmNvbnRyb2wucGlwZShcbiAgICAgIGZpbHRlcihjb250cm9sID0+IGNvbnRyb2wgIT0gbnVsbCksXG4gICAgICBzd2l0Y2hNYXAoY29udHJvbCA9PiB7XG4gICAgICAgIGNvbnRyb2wgPSBjb250cm9sIGFzIEZvcm1Db250cm9sO1xuICAgICAgICByZXR1cm4gY29udHJvbC52YWx1ZUNoYW5nZXMucGlwZShzdGFydFdpdGgoY29udHJvbC52YWx1ZSkpO1xuICAgICAgfSksXG4gICAgICBmaWx0ZXIodmFsdWUgPT4gdmFsdWUgIT0gbnVsbCksXG4gICAgICBtYXAodmFsdWUgPT4gZ2V0VmlkZW9Qcm92aWRlckFuZElkKHZhbHVlIGFzIHN0cmluZykpLFxuICAgICk7XG4gICAgdGhpcy52YWxpZFVybCA9IHZpZGVvLnBpcGUobWFwKHYgPT4gdiAhPSBudWxsKSk7XG4gICAgdGhpcy52aWRlb1RodW1ibmFpbCA9IHZpZGVvLnBpcGUoXG4gICAgICBmaWx0ZXIoaW5mbyA9PiBpbmZvICE9IG51bGwpLFxuICAgICAgc3dpdGNoTWFwKGluZm8gPT4gdmlkZW9QcmV2aWV3VXJsKGh0dHBDbGllbnQsIGluZm8gYXMgVmlkZW9JbmZvKSksXG4gICAgICBmaWx0ZXIodXJsID0+IHVybCAhPSBudWxsKSxcbiAgICAgIG1hcCh1cmwgPT4gZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh1cmwgYXMgc3RyaW5nKSksXG4gICAgKTtcbiAgfVxufVxuXG4vKipcbiAqIGl0IHJldHVybnMgYSB1cmwgb2YgdGh1bWJuYWlsIHJlbGF0ZWQgdG8gdmlkZW8gb3IgbnVsbC5cbiAqXG4gKiBAcGFyYW0gaHR0cENsaWVudFxuICogQHBhcmFtIHZpZGVvXG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiB2aWRlb1ByZXZpZXdVcmwoaHR0cENsaWVudDogSHR0cENsaWVudCwgdmlkZW86IFZpZGVvSW5mbyk6IE9ic2VydmFibGU8c3RyaW5nIHwgbnVsbD4ge1xuICBpZiAodmlkZW8ucHJvdmlkZXIgPT09ICd5b3V0dWJlJykge1xuICAgIHJldHVybiBvYnNPZihgaHR0cHM6Ly9pbWcueW91dHViZS5jb20vdmkvJHt2aWRlby5pZH0vZGVmYXVsdC5qcGdgKTtcbiAgfVxuICBpZiAodmlkZW8ucHJvdmlkZXIgPT09ICd2aW1lbycpIHtcbiAgICByZXR1cm4gaHR0cENsaWVudFxuICAgICAgLmdldDx7dGh1bWJuYWlsX3VybDogc3RyaW5nfT4oXG4gICAgICAgIGBodHRwczovL3ZpbWVvLmNvbS9hcGkvb2VtYmVkLmpzb24/dXJsPWh0dHBzOi8vdmltZW8uY29tLyR7dmlkZW8uaWR9YCxcbiAgICAgIClcbiAgICAgIC5waXBlKFxuICAgICAgICBtYXAocmVzcG9uc2UgPT4gcmVzcG9uc2UudGh1bWJuYWlsX3VybCksXG4gICAgICAgIGNhdGNoRXJyb3IoKCkgPT4gb2JzT2YobnVsbCkpLFxuICAgICAgKSBhcyBPYnNlcnZhYmxlPHN0cmluZyB8IG51bGw+O1xuICB9XG4gIHJldHVybiBvYnNPZignJyk7XG59XG5cbi8qKlxuICogSXQgY2hlY2tzIHRoZSB1cmwgcGFyYW0sIGlmIHVybCBpcyBhbiB5b3V0dWJlIG8gdmltZW8gZG9tYWluIHJldHVyblxuICogYW4gdmlkZW9JbmZvIGVsc2UgbnVsbFxuICpcbiAqIEBwYXJhbSB1cmxcbiAqIEByZXR1cm4geyp9XG4gKi9cbmZ1bmN0aW9uIGdldFZpZGVvUHJvdmlkZXJBbmRJZCh1cmw6IHN0cmluZyk6IFZpZGVvSW5mbyB8IG51bGwge1xuICBsZXQgcHJvdmlkZXI6IEFqZlZpZGVvUHJvdmlkZXIgfCBudWxsID0gbnVsbDtcbiAgbGV0IGlkOiBzdHJpbmcgfCBudWxsID0gbnVsbDtcbiAgaWYgKC95b3V0dWJlfHlvdXR1XFwuYmV8eTJ1XFwuYmV8aS55dGltZ1xcLi8udGVzdCh1cmwpKSB7XG4gICAgcHJvdmlkZXIgPSAneW91dHViZSc7XG4gICAgaWQgPSBnZXRZb3VUdWJlVmlkZW9JZCh1cmwpO1xuICB9IGVsc2UgaWYgKC92aW1lby8udGVzdCh1cmwpKSB7XG4gICAgcHJvdmlkZXIgPSAndmltZW8nO1xuICAgIGlkID0gZ2V0VmltZW9WaWRlb0lkKHVybCk7XG4gIH1cbiAgaWYgKHByb3ZpZGVyID09IG51bGwgfHwgaWQgPT0gbnVsbCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIHJldHVybiB7cHJvdmlkZXIsIGlkfTtcbn1cblxuLyoqXG4gKiBpdCBnZXRzIHRoZSBpZCBvZiB2aW1lbyB2aWRlbyB1cmwuXG4gKlxuICogQHBhcmFtIHVybFxuICogQHJldHVybiB7Kn1cbiAqL1xuZnVuY3Rpb24gZ2V0VmltZW9WaWRlb0lkKHVybDogc3RyaW5nKTogc3RyaW5nIHwgbnVsbCB7XG4gIGlmICh1cmwuaW5jbHVkZXMoJyMnKSkge1xuICAgIHVybCA9IHVybC5zcGxpdCgnIycpWzBdO1xuICB9XG4gIGlmICh1cmwuaW5jbHVkZXMoJz8nKSAmJiAhdXJsLmluY2x1ZGVzKCdjbGlwX2lkPScpKSB7XG4gICAgdXJsID0gdXJsLnNwbGl0KCc/JylbMF07XG4gIH1cblxuICBsZXQgaWQ6IHN0cmluZyB8IG51bGwgPSBudWxsO1xuICBsZXQgYXJyOiBzdHJpbmdbXTtcblxuICBjb25zdCB2aW1lb1BpcGUgPSBbXG4gICAgJ2h0dHBzPzovL3ZpbWVvLmNvbS9bMC05XSskJyxcbiAgICAnaHR0cHM/Oi8vcGxheWVyLnZpbWVvLmNvbS92aWRlby9bMC05XSskJyxcbiAgICAnaHR0cHM/Oi8vdmltZW8uY29tL2NoYW5uZWxzJyxcbiAgICAnZ3JvdXBzJyxcbiAgICAnYWxidW0nLFxuICBdLmpvaW4oJ3wnKTtcblxuICBjb25zdCB2aW1lb1JlZ2V4ID0gbmV3IFJlZ0V4cCh2aW1lb1BpcGUsICdnaW0nKTtcblxuICBpZiAodmltZW9SZWdleC50ZXN0KHVybCkpIHtcbiAgICBhcnIgPSB1cmwuc3BsaXQoJy8nKTtcbiAgICBpZiAoYXJyICYmIGFyci5sZW5ndGgpIHtcbiAgICAgIGlkID0gYXJyLnBvcCgpIGFzIHN0cmluZztcbiAgICB9XG4gIH0gZWxzZSBpZiAoL2NsaXBfaWQ9L2dpbS50ZXN0KHVybCkpIHtcbiAgICBhcnIgPSB1cmwuc3BsaXQoJ2NsaXBfaWQ9Jyk7XG4gICAgaWYgKGFyciAmJiBhcnIubGVuZ3RoKSB7XG4gICAgICBpZCA9IGFyclsxXS5zcGxpdCgnJicpWzBdO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBpZDtcbn1cblxuLyoqXG4gKiBpdCBnZXRzIHRoZSBpZCBvZiB5b3V0dWJlIHZpZGVvIHVybC5cbiAqXG4gKiBAcGFyYW0gdXJsXG4gKiBAcmV0dXJuIHsqfVxuICovXG5mdW5jdGlvbiBnZXRZb3VUdWJlVmlkZW9JZCh1cmw6IHN0cmluZyk6IHN0cmluZyB8IG51bGwge1xuICBjb25zdCBzaG9ydGNvZGUgPSAveW91dHViZTpcXC9cXC98aHR0cHM/OlxcL1xcL3lvdXR1XFwuYmVcXC98aHR0cDpcXC9cXC95MnVcXC5iZVxcLy9nO1xuICBpZiAoc2hvcnRjb2RlLnRlc3QodXJsKSkge1xuICAgIGNvbnN0IHNob3J0Y29kZUlkID0gdXJsLnNwbGl0KHNob3J0Y29kZSlbMV07XG4gICAgcmV0dXJuIHN0cmlwUGFyYW1ldGVycyhzaG9ydGNvZGVJZCk7XG4gIH1cbiAgLy8gL3YvIG9yIC92aS9cbiAgY29uc3QgaW5saW5ldiA9IC9cXC92XFwvfFxcL3ZpXFwvL2c7XG5cbiAgaWYgKGlubGluZXYudGVzdCh1cmwpKSB7XG4gICAgY29uc3QgaW5saW5lSWQgPSB1cmwuc3BsaXQoaW5saW5ldilbMV07XG4gICAgcmV0dXJuIHN0cmlwUGFyYW1ldGVycyhpbmxpbmVJZCk7XG4gIH1cblxuICAvLyB2PSBvciB2aT1cbiAgY29uc3QgcGFyYW1ldGVyViA9IC92PXx2aT0vZztcblxuICBpZiAocGFyYW1ldGVyVi50ZXN0KHVybCkpIHtcbiAgICBjb25zdCBhcnIgPSB1cmwuc3BsaXQocGFyYW1ldGVyVik7XG4gICAgcmV0dXJuIGFyclsxXS5zcGxpdCgnJicpWzBdO1xuICB9XG5cbiAgLy8gdj0gb3Igdmk9XG4gIGNvbnN0IHBhcmFtZXRlcldlYnAgPSAvXFwvYW5fd2VicFxcLy9nO1xuXG4gIGlmIChwYXJhbWV0ZXJXZWJwLnRlc3QodXJsKSkge1xuICAgIGNvbnN0IHdlYnAgPSB1cmwuc3BsaXQocGFyYW1ldGVyV2VicClbMV07XG4gICAgcmV0dXJuIHN0cmlwUGFyYW1ldGVycyh3ZWJwKTtcbiAgfVxuXG4gIC8vIGVtYmVkXG4gIGNvbnN0IGVtYmVkUmVnID0gL1xcL2VtYmVkXFwvL2c7XG5cbiAgaWYgKGVtYmVkUmVnLnRlc3QodXJsKSkge1xuICAgIGNvbnN0IGVtYmVkSWQgPSB1cmwuc3BsaXQoZW1iZWRSZWcpWzFdO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMoZW1iZWRJZCk7XG4gIH1cblxuICAvLyBpZ25vcmUgL3VzZXIvdXNlcm5hbWUgcGF0dGVyblxuICBjb25zdCB1c2VybmFtZVJlZyA9IC9cXC91c2VyXFwvKFthLXpBLVowLTldKikkL2c7XG5cbiAgaWYgKHVzZXJuYW1lUmVnLnRlc3QodXJsKSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgLy8gdXNlclxuICBjb25zdCB1c2VyUmVnID0gL1xcL3VzZXJcXC8oPyEuKnZpZGVvcykvZztcblxuICBpZiAodXNlclJlZy50ZXN0KHVybCkpIHtcbiAgICBjb25zdCBlbGVtZW50cyA9IHVybC5zcGxpdCgnLycpO1xuICAgIHJldHVybiBzdHJpcFBhcmFtZXRlcnMoZWxlbWVudHMucG9wKCkgYXMgc3RyaW5nKTtcbiAgfVxuXG4gIC8vIGF0dHJpYnV0aW9uX2xpbmtcbiAgY29uc3QgYXR0clJlZyA9IC9cXC9hdHRyaWJ1dGlvbl9saW5rXFw/Lip2JTNEKFteJSZdKikoJTI2fCZ8JCkvO1xuXG4gIGlmIChhdHRyUmVnLnRlc3QodXJsKSkge1xuICAgIHJldHVybiAodXJsLm1hdGNoKGF0dHJSZWcpIGFzIHN0cmluZ1tdKVsxXTtcbiAgfVxuXG4gIHJldHVybiBudWxsO1xufVxuXG5mdW5jdGlvbiBzdHJpcFBhcmFtZXRlcnModXJsOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBTcGxpdCBwYXJhbWV0ZXJzIG9yIHNwbGl0IGZvbGRlciBzZXBhcmF0b3JcbiAgaWYgKHVybC5pbmNsdWRlcygnPycpKSB7XG4gICAgcmV0dXJuIHVybC5zcGxpdCgnPycpWzBdO1xuICB9IGVsc2UgaWYgKHVybC5pbmNsdWRlcygnLycpKSB7XG4gICAgcmV0dXJuIHVybC5zcGxpdCgnLycpWzBdO1xuICB9XG4gIHJldHVybiB1cmw7XG59XG4iXX0=