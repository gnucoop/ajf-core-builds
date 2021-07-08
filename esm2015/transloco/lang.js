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
import { ENG } from './eng';
import { ESP } from './esp';
import { ETH } from './eth';
import { FRA } from './fra';
import { ITA } from './ita';
import { PRT } from './prt';
export const langs = {
    ENG,
    ESP,
    FRA,
    ITA,
    PRT,
    ETH
};
/**
 * @param lang
 * is the language of the translation expressed with the standard iso country code 3 digits,
 * except for English expressed with ENG.
 * @param translation
 * is a dictionary key value, which represents the translation to add.
 * @param prefix
 * if present it creates a sub-section, the translations present in the prefix section will not
 * change the translations of the other sections.
 *
 */
export const addLang = (lang, translation, prefix) => {
    if (lang != null && langs[lang] == null && translation != null) {
        langs[lang] = {};
        if (prefix != null) {
            langs[lang][prefix] = translation;
        }
        else {
            langs[lang] = translation;
        }
    }
};
/**
 * @param lang
 * is the language of the translation expressed with the standard iso country code 3 digits,
 * except for English expressed with ENG.
 * @param translation
 * is a dictionary key value, which represents the translation to add.
 * @param prefix
 * if present it creates a sub-section, the translations present in the prefix section will not
 * change the translations of the other sections.
 *
 */
export const updateLang = (lang, translation, prefix) => {
    if (lang != null && langs[lang] != null && translation != null) {
        if (prefix != null) {
            langs[lang][prefix] = translation;
        }
        else {
            langs[lang] = Object.assign(Object.assign({}, langs[lang]), translation);
        }
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGFuZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uL3NyYy9jb3JlL3RyYW5zbG9jby9sYW5nLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUlILE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBQzFCLE9BQU8sRUFBQyxHQUFHLEVBQUMsTUFBTSxPQUFPLENBQUM7QUFDMUIsT0FBTyxFQUFDLEdBQUcsRUFBQyxNQUFNLE9BQU8sQ0FBQztBQUMxQixPQUFPLEVBQUMsR0FBRyxFQUFDLE1BQU0sT0FBTyxDQUFDO0FBRTFCLE1BQU0sQ0FBQyxNQUFNLEtBQUssR0FBaUM7SUFDakQsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0lBQ0gsR0FBRztJQUNILEdBQUc7SUFDSCxHQUFHO0NBQ0osQ0FBQztBQUVGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsTUFBTSxPQUFPLEdBQUcsQ0FBQyxJQUFZLEVBQUUsV0FBd0IsRUFBRSxNQUFlLEVBQVEsRUFBRTtJQUN2RixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1FBQzlELEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7UUFDakIsSUFBSSxNQUFNLElBQUksSUFBSSxFQUFFO1lBQ2xCLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsR0FBRyxXQUFXLENBQUM7U0FDbkM7YUFBTTtZQUNMLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxXQUFXLENBQUM7U0FDM0I7S0FDRjtBQUNILENBQUMsQ0FBQztBQUVGOzs7Ozs7Ozs7O0dBVUc7QUFDSCxNQUFNLENBQUMsTUFBTSxVQUFVLEdBQUcsQ0FBQyxJQUFZLEVBQUUsV0FBd0IsRUFBRSxNQUFlLEVBQVEsRUFBRTtJQUMxRixJQUFJLElBQUksSUFBSSxJQUFJLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLElBQUksSUFBSSxXQUFXLElBQUksSUFBSSxFQUFFO1FBQzlELElBQUksTUFBTSxJQUFJLElBQUksRUFBRTtZQUNsQixLQUFLLENBQUMsSUFBSSxDQUFDLENBQUMsTUFBTSxDQUFDLEdBQUcsV0FBVyxDQUFDO1NBQ25DO2FBQU07WUFDTCxLQUFLLENBQUMsSUFBSSxDQUFDLG1DQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBSyxXQUFXLENBQUMsQ0FBQztTQUNoRDtLQUNGO0FBQ0gsQ0FBQyxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge1RyYW5zbGF0aW9ufSBmcm9tICdAbmduZWF0L3RyYW5zbG9jbyc7XG5cbmltcG9ydCB7RU5HfSBmcm9tICcuL2VuZyc7XG5pbXBvcnQge0VTUH0gZnJvbSAnLi9lc3AnO1xuaW1wb3J0IHtFVEh9IGZyb20gJy4vZXRoJztcbmltcG9ydCB7RlJBfSBmcm9tICcuL2ZyYSc7XG5pbXBvcnQge0lUQX0gZnJvbSAnLi9pdGEnO1xuaW1wb3J0IHtQUlR9IGZyb20gJy4vcHJ0JztcblxuZXhwb3J0IGNvbnN0IGxhbmdzOiB7W2tleTogc3RyaW5nXTogVHJhbnNsYXRpb259ID0ge1xuICBFTkcsXG4gIEVTUCxcbiAgRlJBLFxuICBJVEEsXG4gIFBSVCxcbiAgRVRIXG59O1xuXG4vKipcbiAqIEBwYXJhbSBsYW5nXG4gKiBpcyB0aGUgbGFuZ3VhZ2Ugb2YgdGhlIHRyYW5zbGF0aW9uIGV4cHJlc3NlZCB3aXRoIHRoZSBzdGFuZGFyZCBpc28gY291bnRyeSBjb2RlIDMgZGlnaXRzLFxuICogZXhjZXB0IGZvciBFbmdsaXNoIGV4cHJlc3NlZCB3aXRoIEVORy5cbiAqIEBwYXJhbSB0cmFuc2xhdGlvblxuICogaXMgYSBkaWN0aW9uYXJ5IGtleSB2YWx1ZSwgd2hpY2ggcmVwcmVzZW50cyB0aGUgdHJhbnNsYXRpb24gdG8gYWRkLlxuICogQHBhcmFtIHByZWZpeFxuICogaWYgcHJlc2VudCBpdCBjcmVhdGVzIGEgc3ViLXNlY3Rpb24sIHRoZSB0cmFuc2xhdGlvbnMgcHJlc2VudCBpbiB0aGUgcHJlZml4IHNlY3Rpb24gd2lsbCBub3RcbiAqIGNoYW5nZSB0aGUgdHJhbnNsYXRpb25zIG9mIHRoZSBvdGhlciBzZWN0aW9ucy5cbiAqXG4gKi9cbmV4cG9ydCBjb25zdCBhZGRMYW5nID0gKGxhbmc6IHN0cmluZywgdHJhbnNsYXRpb246IFRyYW5zbGF0aW9uLCBwcmVmaXg/OiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgaWYgKGxhbmcgIT0gbnVsbCAmJiBsYW5nc1tsYW5nXSA9PSBudWxsICYmIHRyYW5zbGF0aW9uICE9IG51bGwpIHtcbiAgICBsYW5nc1tsYW5nXSA9IHt9O1xuICAgIGlmIChwcmVmaXggIT0gbnVsbCkge1xuICAgICAgbGFuZ3NbbGFuZ11bcHJlZml4XSA9IHRyYW5zbGF0aW9uO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYW5nc1tsYW5nXSA9IHRyYW5zbGF0aW9uO1xuICAgIH1cbiAgfVxufTtcblxuLyoqXG4gKiBAcGFyYW0gbGFuZ1xuICogaXMgdGhlIGxhbmd1YWdlIG9mIHRoZSB0cmFuc2xhdGlvbiBleHByZXNzZWQgd2l0aCB0aGUgc3RhbmRhcmQgaXNvIGNvdW50cnkgY29kZSAzIGRpZ2l0cyxcbiAqIGV4Y2VwdCBmb3IgRW5nbGlzaCBleHByZXNzZWQgd2l0aCBFTkcuXG4gKiBAcGFyYW0gdHJhbnNsYXRpb25cbiAqIGlzIGEgZGljdGlvbmFyeSBrZXkgdmFsdWUsIHdoaWNoIHJlcHJlc2VudHMgdGhlIHRyYW5zbGF0aW9uIHRvIGFkZC5cbiAqIEBwYXJhbSBwcmVmaXhcbiAqIGlmIHByZXNlbnQgaXQgY3JlYXRlcyBhIHN1Yi1zZWN0aW9uLCB0aGUgdHJhbnNsYXRpb25zIHByZXNlbnQgaW4gdGhlIHByZWZpeCBzZWN0aW9uIHdpbGwgbm90XG4gKiBjaGFuZ2UgdGhlIHRyYW5zbGF0aW9ucyBvZiB0aGUgb3RoZXIgc2VjdGlvbnMuXG4gKlxuICovXG5leHBvcnQgY29uc3QgdXBkYXRlTGFuZyA9IChsYW5nOiBzdHJpbmcsIHRyYW5zbGF0aW9uOiBUcmFuc2xhdGlvbiwgcHJlZml4Pzogc3RyaW5nKTogdm9pZCA9PiB7XG4gIGlmIChsYW5nICE9IG51bGwgJiYgbGFuZ3NbbGFuZ10gIT0gbnVsbCAmJiB0cmFuc2xhdGlvbiAhPSBudWxsKSB7XG4gICAgaWYgKHByZWZpeCAhPSBudWxsKSB7XG4gICAgICBsYW5nc1tsYW5nXVtwcmVmaXhdID0gdHJhbnNsYXRpb247XG4gICAgfSBlbHNlIHtcbiAgICAgIGxhbmdzW2xhbmddID0gey4uLmxhbmdzW2xhbmddLCAuLi50cmFuc2xhdGlvbn07XG4gICAgfVxuICB9XG59O1xuIl19