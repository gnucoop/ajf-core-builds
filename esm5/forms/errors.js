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
import { __extends } from "tslib";
import { AjfError } from '@ajf/core/models';
/**
 * This class will define an Ajf invalid field definition error
 */
var AjfInvalidFieldDefinitionError = /** @class */ (function (_super) {
    __extends(AjfInvalidFieldDefinitionError, _super);
    function AjfInvalidFieldDefinitionError(message) {
        return _super.call(this, message) || this;
    }
    Object.defineProperty(AjfInvalidFieldDefinitionError.prototype, "name", {
        get: function () { return 'AjfInvalidFieldDefinitionError'; },
        enumerable: true,
        configurable: true
    });
    return AjfInvalidFieldDefinitionError;
}(AjfError));
export { AjfInvalidFieldDefinitionError };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXJyb3JzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvZXJyb3JzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRzs7QUFFSCxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0sa0JBQWtCLENBQUM7QUFFMUM7O0dBRUc7QUFDSDtJQUFvRCxrREFBUTtJQUcxRCx3Q0FBWSxPQUFnQjtlQUMxQixrQkFBTSxPQUFPLENBQUM7SUFDaEIsQ0FBQztJQUpELHNCQUFJLGdEQUFJO2FBQVIsY0FBcUIsT0FBTyxnQ0FBZ0MsQ0FBQyxDQUFDLENBQUM7OztPQUFBO0lBS2pFLHFDQUFDO0FBQUQsQ0FBQyxBQU5ELENBQW9ELFFBQVEsR0FNM0QiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEBsaWNlbnNlXG4gKiBDb3B5cmlnaHQgKEMpIEdudWNvb3Agc29jLiBjb29wLlxuICpcbiAqIFRoaXMgZmlsZSBpcyBwYXJ0IG9mIHRoZSBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZnJlZSBzb2Z0d2FyZTogeW91IGNhbiByZWRpc3RyaWJ1dGUgaXQgYW5kL29yXG4gKiBtb2RpZnkgaXQgdW5kZXIgdGhlIHRlcm1zIG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgYXNcbiAqIHB1Ymxpc2hlZCBieSB0aGUgRnJlZSBTb2Z0d2FyZSBGb3VuZGF0aW9uLCBlaXRoZXIgdmVyc2lvbiAzIG9mIHRoZSBMaWNlbnNlLFxuICogb3IgKGF0IHlvdXIgb3B0aW9uKSBhbnkgbGF0ZXIgdmVyc2lvbi5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGRpc3RyaWJ1dGVkIGluIHRoZSBob3BlIHRoYXQgaXQgd2lsbCBiZSB1c2VmdWwsXG4gKiBidXQgV0lUSE9VVCBBTlkgV0FSUkFOVFk7IHdpdGhvdXQgZXZlbiB0aGUgaW1wbGllZCB3YXJyYW50eSBvZlxuICogTUVSQ0hBTlRBQklMSVRZIG9yIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFLiBTZWUgdGhlIEdOVSBBZmZlcm9cbiAqIEdlbmVyYWwgUHVibGljIExpY2Vuc2UgZm9yIG1vcmUgZGV0YWlscy5cbiAqXG4gKiBZb3Ugc2hvdWxkIGhhdmUgcmVjZWl2ZWQgYSBjb3B5IG9mIHRoZSBHTlUgQWZmZXJvIEdlbmVyYWwgUHVibGljIExpY2Vuc2VcbiAqIGFsb25nIHdpdGggQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqIElmIG5vdCwgc2VlIGh0dHA6Ly93d3cuZ251Lm9yZy9saWNlbnNlcy8uXG4gKlxuICovXG5cbmltcG9ydCB7QWpmRXJyb3J9IGZyb20gJ0BhamYvY29yZS9tb2RlbHMnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3Mgd2lsbCBkZWZpbmUgYW4gQWpmIGludmFsaWQgZmllbGQgZGVmaW5pdGlvbiBlcnJvclxuICovXG5leHBvcnQgY2xhc3MgQWpmSW52YWxpZEZpZWxkRGVmaW5pdGlvbkVycm9yIGV4dGVuZHMgQWpmRXJyb3Ige1xuICBnZXQgbmFtZSgpOiBzdHJpbmcgeyByZXR1cm4gJ0FqZkludmFsaWRGaWVsZERlZmluaXRpb25FcnJvcic7IH1cblxuICBjb25zdHJ1Y3RvcihtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgc3VwZXIobWVzc2FnZSk7XG4gIH1cbn1cbiJdfQ==