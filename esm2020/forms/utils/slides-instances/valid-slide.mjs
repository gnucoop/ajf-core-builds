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
/**
 * It checks if the idx slide of
 *
 * @export
 * @param slide
 * @param idx
 * @return boolean
 */
export function validSlide(slide, idx) {
    if (idx >= slide.slideNodes.length) {
        return true;
    }
    return slide.slideNodes[idx]
        .map(n => {
        if (n.visible && Object.keys(n).indexOf('valid') > -1) {
            return n.valid;
        }
        return true;
    })
        .reduce((v1, v2) => v1 && v2, true);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidmFsaWQtc2xpZGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi8uLi8uLi8uLi8uLi9zcmMvY29yZS9mb3Jtcy91dGlscy9zbGlkZXMtaW5zdGFuY2VzL3ZhbGlkLXNsaWRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlIOzs7Ozs7O0dBT0c7QUFDSCxNQUFNLFVBQVUsVUFBVSxDQUFDLEtBQTJCLEVBQUUsR0FBVztJQUNqRSxJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsVUFBVSxDQUFDLE1BQU0sRUFBRTtRQUNsQyxPQUFPLElBQUksQ0FBQztLQUNiO0lBQ0QsT0FBTyxLQUFLLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQztTQUN6QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUU7UUFDUCxJQUFJLENBQUMsQ0FBQyxPQUFPLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDckQsT0FBYSxDQUFFLENBQUMsS0FBSyxDQUFDO1NBQ3ZCO1FBQ0QsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDLENBQUM7U0FDRCxNQUFNLENBQUMsQ0FBQyxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO0FBQ3hDLENBQUMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmQmFzZVNsaWRlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9zbGlkZXMtaW5zdGFuY2VzL2Jhc2Utc2xpZGUtaW5zdGFuY2UnO1xuXG4vKipcbiAqIEl0IGNoZWNrcyBpZiB0aGUgaWR4IHNsaWRlIG9mXG4gKlxuICogQGV4cG9ydFxuICogQHBhcmFtIHNsaWRlXG4gKiBAcGFyYW0gaWR4XG4gKiBAcmV0dXJuIGJvb2xlYW5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHZhbGlkU2xpZGUoc2xpZGU6IEFqZkJhc2VTbGlkZUluc3RhbmNlLCBpZHg6IG51bWJlcik6IGJvb2xlYW4ge1xuICBpZiAoaWR4ID49IHNsaWRlLnNsaWRlTm9kZXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIHNsaWRlLnNsaWRlTm9kZXNbaWR4XVxuICAgIC5tYXAobiA9PiB7XG4gICAgICBpZiAobi52aXNpYmxlICYmIE9iamVjdC5rZXlzKG4pLmluZGV4T2YoJ3ZhbGlkJykgPiAtMSkge1xuICAgICAgICByZXR1cm4gKDxhbnk+bikudmFsaWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9KVxuICAgIC5yZWR1Y2UoKHYxLCB2MikgPT4gdjEgJiYgdjIsIHRydWUpO1xufVxuIl19