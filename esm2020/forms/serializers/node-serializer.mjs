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
import { AjfConditionSerializer, AjfFormulaSerializer } from '@ajf/core/models';
import { AjfFieldType } from '../interface/fields/field-type';
import { AjfNodeType } from '../interface/nodes/node-type';
import { createField } from '../utils/fields/create-field';
import { createFieldWithChoices } from '../utils/fields/create-field-with-choices';
import { componentsMap } from '../utils/fields/fields-map';
import { createContainerNode } from '../utils/nodes/create-container-node';
import { createNode } from '../utils/nodes/create-node';
import { createNodeGroup } from '../utils/nodes/create-node-group';
import { createRepeatingNode } from '../utils/nodes/create-repeating-node';
import { createRepeatingSlide } from '../utils/slides/create-repeating-slide';
import { createSlide } from '../utils/slides/create-slide';
import { AjfValidationGroupSerializer } from './validation-group-serializer';
import { AjfWarningGroupSerializer } from './warning-group-serializer';
/**
 * Create an AjfNode by json schema,
 * apply a default value for name
 * throw new error if id,parent or nodeType attribute missed
 */
export class AjfNodeSerializer {
    static fromJson(json, choicesOrigins, attachmentsOrigins) {
        const err = 'Malformed node';
        const obj = { ...json };
        obj.name = obj.name ?? '';
        if (obj.id == null || obj.parent == null || obj.nodeType == null) {
            throw new Error(err);
        }
        if (obj.visibility) {
            obj.visibility = AjfConditionSerializer.fromJson(obj.visibility);
        }
        obj.conditionalBranches = (obj.conditionalBranches || []).map(c => AjfConditionSerializer.fromJson(c));
        // call serializer by nodeType and cast obj with the right interface
        switch (obj.nodeType) {
            case AjfNodeType.AjfField:
                return AjfNodeSerializer._fieldFromJson(obj, choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfFieldNodeLink:
                return AjfNodeSerializer._fieldNodeLinkFromJson(obj);
            case AjfNodeType.AjfNodeGroup:
                return AjfNodeSerializer._nodeGroupFromJson(obj, choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfRepeatingSlide:
                return AjfNodeSerializer._repeatingSlideFromJson(obj, choicesOrigins, attachmentsOrigins);
            case AjfNodeType.AjfSlide:
                const slideObj = obj;
                if (slideObj.readonly) {
                    slideObj.readonly = AjfConditionSerializer.fromJson(slideObj.readonly);
                }
                return AjfNodeSerializer._slideFromJson(slideObj, choicesOrigins, attachmentsOrigins);
        }
        throw new Error(err);
    }
    static _containerNodeFromJson(json, choicesOrigins, attachmentsOrigins) {
        json.nodes = (json.nodes || []).map(n => AjfNodeSerializer.fromJson(n, choicesOrigins, attachmentsOrigins));
        return createContainerNode(json);
    }
    static _fieldFromJson(json, choicesOrigins, attachmentsOrigins) {
        if (json.fieldType == null) {
            throw new Error('Malformed field');
        }
        const obj = json;
        if (obj.validation) {
            obj.validation = AjfValidationGroupSerializer.fromJson(obj.validation);
        }
        if (obj.warning) {
            obj.warning = AjfWarningGroupSerializer.fromJson(obj.warning);
        }
        if (json.attachmentsOriginRef) {
            obj.attachmentOrigin = (attachmentsOrigins || []).find(a => a.name === json.attachmentsOriginRef);
        }
        if (obj.nextSlideCondition) {
            obj.nextSlideCondition = AjfConditionSerializer.fromJson(obj.nextSlideCondition);
        }
        const isCustomFieldWithChoice = obj.fieldType > 100 &&
            componentsMap[obj.fieldType] != null &&
            componentsMap[obj.fieldType].isFieldWithChoice === true;
        if (isCustomFieldWithChoice) {
            return AjfNodeSerializer._fieldWithChoicesFromJson(json, choicesOrigins);
        }
        switch (obj.fieldType) {
            case AjfFieldType.Formula:
                return AjfNodeSerializer._formulaFieldFromJson(json);
            case AjfFieldType.MultipleChoice:
            case AjfFieldType.SingleChoice:
                return AjfNodeSerializer._fieldWithChoicesFromJson(json, choicesOrigins);
        }
        return createField(obj);
    }
    static _fieldNodeLinkFromJson(json) {
        return { ...createNode(json), nodeType: AjfNodeType.AjfFieldNodeLink };
    }
    static _fieldWithChoicesFromJson(json, choicesOrigins) {
        const err = 'Malformed field with choices';
        if (json.choicesOriginRef == null) {
            throw new Error(err);
        }
        const choicesOrigin = (choicesOrigins || []).find(c => c.name === json.choicesOriginRef);
        if (choicesOrigin == null) {
            throw new Error(err);
        }
        if (json.choicesFilter) {
            json.choicesFilter = AjfFormulaSerializer.fromJson(json.choicesFilter);
        }
        if (json.triggerConditions) {
            json.triggerConditions = json.triggerConditions.map(t => AjfConditionSerializer.fromJson(t));
        }
        return createFieldWithChoices({ ...json, choicesOrigin });
    }
    static _formulaFieldFromJson(json) {
        if (json.formula) {
            json.formula = AjfFormulaSerializer.fromJson(json.formula);
        }
        return {
            ...createField(json),
            fieldType: AjfFieldType.Formula,
        };
    }
    static _nodeGroupFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createNodeGroup({
            ...AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins),
            ...AjfNodeSerializer._repeatingNodeFromJson(json),
        });
    }
    static _repeatingNodeFromJson(json) {
        if (json.formulaReps) {
            json.formulaReps = AjfFormulaSerializer.fromJson(json.formulaReps);
        }
        return createRepeatingNode(json);
    }
    static _repeatingSlideFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createRepeatingSlide({
            ...AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins),
            ...AjfNodeSerializer._repeatingNodeFromJson(json),
        });
    }
    static _slideFromJson(json, choicesOrigins, attachmentsOrigins) {
        return createSlide(AjfNodeSerializer._containerNodeFromJson(json, choicesOrigins, attachmentsOrigins));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvc2VyaWFsaXplcnMvbm9kZS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSzlFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU81RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFJekQsT0FBTyxFQUFpQixXQUFXLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFnQixVQUFVLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXpELE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRXJFOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLE1BQU0sQ0FBQyxRQUFRLENBQ2IsSUFBc0IsRUFDdEIsY0FBd0Ms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QixJQUF1QyxFQUN2QyxjQUF3QyxFQUN4QyxrQkFBZ0Q7UUFFaEQsT0FBTyxXQUFXLENBQ2hCLGlCQUFpQixDQUFDLHNCQUFzQixDQUFDLElBQUksRUFBRSxjQUFjLEVBQUUsa0JBQWtCLENBQUMsQ0FDbkYsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZDb25kaXRpb25TZXJpYWxpemVyLCBBamZGb3JtdWxhU2VyaWFsaXplcn0gZnJvbSAnQGFqZi9jb3JlL21vZGVscyc7XG5cbmltcG9ydCB7QWpmQXR0YWNobWVudHNPcmlnaW59IGZyb20gJy4uL2ludGVyZmFjZS9hdHRhY2htZW50cy9hdHRhY2htZW50cy1vcmlnaW4nO1xuaW1wb3J0IHtBamZDaG9pY2VzT3JpZ2lufSBmcm9tICcuLi9pbnRlcmZhY2UvY2hvaWNlcy9jaG9pY2VzLW9yaWdpbic7XG5pbXBvcnQge0FqZkZpZWxkfSBmcm9tICcuLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkJztcbmltcG9ydCB7QWpmRmllbGRUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXR5cGUnO1xuaW1wb3J0IHtBamZGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi9pbnRlcmZhY2UvZmllbGRzL2ZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge0FqZkZvcm11bGFGaWVsZH0gZnJvbSAnLi4vaW50ZXJmYWNlL2ZpZWxkcy9mb3JtdWxhLWZpZWxkJztcbmltcG9ydCB7QWpmQ29udGFpbmVyTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlL25vZGVzL2NvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7QWpmTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlL25vZGVzL25vZGUnO1xuaW1wb3J0IHtBamZOb2RlR3JvdXB9IGZyb20gJy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLWdyb3VwJztcbmltcG9ydCB7QWpmRmllbGROb2RlTGlua30gZnJvbSAnLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtbGluayc7XG5pbXBvcnQge0FqZk5vZGVUeXBlfSBmcm9tICcuLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS10eXBlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nTm9kZX0gZnJvbSAnLi4vaW50ZXJmYWNlL25vZGVzL3JlcGVhdGluZy1ub2RlJztcbmltcG9ydCB7QWpmUmVwZWF0aW5nU2xpZGV9IGZyb20gJy4uL2ludGVyZmFjZS9zbGlkZXMvcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7QWpmU2xpZGV9IGZyb20gJy4uL2ludGVyZmFjZS9zbGlkZXMvc2xpZGUnO1xuaW1wb3J0IHtBamZGaWVsZENyZWF0ZSwgY3JlYXRlRmllbGR9IGZyb20gJy4uL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQnO1xuaW1wb3J0IHtjcmVhdGVGaWVsZFdpdGhDaG9pY2VzfSBmcm9tICcuLi91dGlscy9maWVsZHMvY3JlYXRlLWZpZWxkLXdpdGgtY2hvaWNlcyc7XG5pbXBvcnQge2NvbXBvbmVudHNNYXB9IGZyb20gJy4uL3V0aWxzL2ZpZWxkcy9maWVsZHMtbWFwJztcbmltcG9ydCB7Y3JlYXRlQ29udGFpbmVyTm9kZX0gZnJvbSAnLi4vdXRpbHMvbm9kZXMvY3JlYXRlLWNvbnRhaW5lci1ub2RlJztcbmltcG9ydCB7QWpmTm9kZUNyZWF0ZSwgY3JlYXRlTm9kZX0gZnJvbSAnLi4vdXRpbHMvbm9kZXMvY3JlYXRlLW5vZGUnO1xuaW1wb3J0IHtjcmVhdGVOb2RlR3JvdXB9IGZyb20gJy4uL3V0aWxzL25vZGVzL2NyZWF0ZS1ub2RlLWdyb3VwJztcbmltcG9ydCB7Y3JlYXRlUmVwZWF0aW5nTm9kZX0gZnJvbSAnLi4vdXRpbHMvbm9kZXMvY3JlYXRlLXJlcGVhdGluZy1ub2RlJztcbmltcG9ydCB7Y3JlYXRlUmVwZWF0aW5nU2xpZGV9IGZyb20gJy4uL3V0aWxzL3NsaWRlcy9jcmVhdGUtcmVwZWF0aW5nLXNsaWRlJztcbmltcG9ydCB7Y3JlYXRlU2xpZGV9IGZyb20gJy4uL3V0aWxzL3NsaWRlcy9jcmVhdGUtc2xpZGUnO1xuXG5pbXBvcnQge0FqZlZhbGlkYXRpb25Hcm91cFNlcmlhbGl6ZXJ9IGZyb20gJy4vdmFsaWRhdGlvbi1ncm91cC1zZXJpYWxpemVyJztcbmltcG9ydCB7QWpmV2FybmluZ0dyb3VwU2VyaWFsaXplcn0gZnJvbSAnLi93YXJuaW5nLWdyb3VwLXNlcmlhbGl6ZXInO1xuXG4vKipcbiAqIENyZWF0ZSBhbiBBamZOb2RlIGJ5IGpzb24gc2NoZW1hLFxuICogYXBwbHkgYSBkZWZhdWx0IHZhbHVlIGZvciBuYW1lXG4gKiB0aHJvdyBuZXcgZXJyb3IgaWYgaWQscGFyZW50IG9yIG5vZGVUeXBlIGF0dHJpYnV0ZSBtaXNzZWRcbiAqL1xuZXhwb3J0IGNsYXNzIEFqZk5vZGVTZXJpYWxpemVyIHtcbiAgc3RhdGljIGZyb21Kc29uKFxuICAgIGpzb246IFBhcnRpYWw8QWpmTm9kZT4sXG4gICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgICBhdHRhY2htZW50c09yaWdpbnM/OiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sXG4gICk6IEFqZk5vZGUge1xuICAgIGNvbnN0IGVyciA9ICdNYWxmb3JtZWQgbm9kZSc7XG4gICAgY29uc3Qgb2JqID0gey4uLmpzb259IGFzIEFqZk5vZGVDcmVhdGU7XG4gICAgb2JqLm5hbWUgPSBvYmoubmFtZSA/PyAnJztcbiAgICBpZiAob2JqLmlkID09IG51bGwgfHwgb2JqLnBhcmVudCA9PSBudWxsIHx8IG9iai5ub2RlVHlwZSA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICB9XG4gICAgaWYgKG9iai52aXNpYmlsaXR5KSB7XG4gICAgICBvYmoudmlzaWJpbGl0eSA9IEFqZkNvbmRpdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24ob2JqLnZpc2liaWxpdHkpO1xuICAgIH1cbiAgICBvYmouY29uZGl0aW9uYWxCcmFuY2hlcyA9IChvYmouY29uZGl0aW9uYWxCcmFuY2hlcyB8fCBbXSkubWFwKGMgPT5cbiAgICAgIEFqZkNvbmRpdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24oYyksXG4gICAgKTtcbiAgICAvLyBjYWxsIHNlcmlhbGl6ZXIgYnkgbm9kZVR5cGUgYW5kIGNhc3Qgb2JqIHdpdGggdGhlIHJpZ2h0IGludGVyZmFjZVxuICAgIHN3aXRjaCAob2JqLm5vZGVUeXBlKSB7XG4gICAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZkZpZWxkOlxuICAgICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX2ZpZWxkRnJvbUpzb24oXG4gICAgICAgICAgb2JqIGFzIEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZkZpZWxkPixcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyxcbiAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnMsXG4gICAgICAgICk7XG4gICAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZkZpZWxkTm9kZUxpbms6XG4gICAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fZmllbGROb2RlTGlua0Zyb21Kc29uKFxuICAgICAgICAgIG9iaiBhcyBBamZOb2RlQ3JlYXRlICYgUGFydGlhbDxBamZGaWVsZE5vZGVMaW5rPixcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwOlxuICAgICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX25vZGVHcm91cEZyb21Kc29uKFxuICAgICAgICAgIG9iaiBhcyBBamZOb2RlQ3JlYXRlICYgUGFydGlhbDxBamZOb2RlR3JvdXA+LFxuICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGU6XG4gICAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fcmVwZWF0aW5nU2xpZGVGcm9tSnNvbihcbiAgICAgICAgICBvYmogYXMgQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmUmVwZWF0aW5nU2xpZGU+LFxuICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmU2xpZGU6XG4gICAgICAgIGNvbnN0IHNsaWRlT2JqID0gb2JqIGFzIEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZlNsaWRlPjtcbiAgICAgICAgaWYgKHNsaWRlT2JqLnJlYWRvbmx5KSB7XG4gICAgICAgICAgc2xpZGVPYmoucmVhZG9ubHkgPSBBamZDb25kaXRpb25TZXJpYWxpemVyLmZyb21Kc29uKHNsaWRlT2JqLnJlYWRvbmx5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX3NsaWRlRnJvbUpzb24oXG4gICAgICAgICAgc2xpZGVPYmogYXMgQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmU2xpZGU+LFxuICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgICAgKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfY29udGFpbmVyTm9kZUZyb21Kc29uKFxuICAgIGpzb246IEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZkNvbnRhaW5lck5vZGU+LFxuICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICApOiBBamZDb250YWluZXJOb2RlIHtcbiAgICBqc29uLm5vZGVzID0gKGpzb24ubm9kZXMgfHwgW10pLm1hcChuID0+XG4gICAgICBBamZOb2RlU2VyaWFsaXplci5mcm9tSnNvbihuLCBjaG9pY2VzT3JpZ2lucywgYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICApO1xuICAgIHJldHVybiBjcmVhdGVDb250YWluZXJOb2RlKGpzb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2ZpZWxkRnJvbUpzb24oXG4gICAganNvbjogQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmRmllbGQ+ICYgUGFydGlhbDx7YXR0YWNobWVudHNPcmlnaW5SZWY6IHN0cmluZ30+LFxuICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICApOiBBamZGaWVsZCB7XG4gICAgaWYgKGpzb24uZmllbGRUeXBlID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIGZpZWxkJyk7XG4gICAgfVxuICAgIGNvbnN0IG9iaiA9IGpzb24gYXMgQWpmRmllbGRDcmVhdGU7XG4gICAgaWYgKG9iai52YWxpZGF0aW9uKSB7XG4gICAgICBvYmoudmFsaWRhdGlvbiA9IEFqZlZhbGlkYXRpb25Hcm91cFNlcmlhbGl6ZXIuZnJvbUpzb24ob2JqLnZhbGlkYXRpb24pO1xuICAgIH1cbiAgICBpZiAob2JqLndhcm5pbmcpIHtcbiAgICAgIG9iai53YXJuaW5nID0gQWpmV2FybmluZ0dyb3VwU2VyaWFsaXplci5mcm9tSnNvbihvYmoud2FybmluZyk7XG4gICAgfVxuICAgIGlmIChqc29uLmF0dGFjaG1lbnRzT3JpZ2luUmVmKSB7XG4gICAgICBvYmouYXR0YWNobWVudE9yaWdpbiA9IChhdHRhY2htZW50c09yaWdpbnMgfHwgW10pLmZpbmQoXG4gICAgICAgIGEgPT4gYS5uYW1lID09PSBqc29uLmF0dGFjaG1lbnRzT3JpZ2luUmVmLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG9iai5uZXh0U2xpZGVDb25kaXRpb24pIHtcbiAgICAgIG9iai5uZXh0U2xpZGVDb25kaXRpb24gPSBBamZDb25kaXRpb25TZXJpYWxpemVyLmZyb21Kc29uKG9iai5uZXh0U2xpZGVDb25kaXRpb24pO1xuICAgIH1cbiAgICBjb25zdCBpc0N1c3RvbUZpZWxkV2l0aENob2ljZSA9XG4gICAgICBvYmouZmllbGRUeXBlID4gMTAwICYmXG4gICAgICBjb21wb25lbnRzTWFwW29iai5maWVsZFR5cGVdICE9IG51bGwgJiZcbiAgICAgIGNvbXBvbmVudHNNYXBbb2JqLmZpZWxkVHlwZV0uaXNGaWVsZFdpdGhDaG9pY2UgPT09IHRydWU7XG4gICAgaWYgKGlzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlKSB7XG4gICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX2ZpZWxkV2l0aENob2ljZXNGcm9tSnNvbihcbiAgICAgICAganNvbiBhcyBBamZGaWVsZENyZWF0ZSAmIFBhcnRpYWw8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+PixcbiAgICAgICAgY2hvaWNlc09yaWdpbnMsXG4gICAgICApO1xuICAgIH1cblxuICAgIHN3aXRjaCAob2JqLmZpZWxkVHlwZSkge1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRm9ybXVsYTpcbiAgICAgICAgcmV0dXJuIEFqZk5vZGVTZXJpYWxpemVyLl9mb3JtdWxhRmllbGRGcm9tSnNvbihcbiAgICAgICAgICBqc29uIGFzIEFqZkZpZWxkQ3JlYXRlICYgUGFydGlhbDxBamZGb3JtdWxhRmllbGQ+LFxuICAgICAgICApO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fZmllbGRXaXRoQ2hvaWNlc0Zyb21Kc29uKFxuICAgICAgICAgIGpzb24gYXMgQWpmRmllbGRDcmVhdGUgJiBQYXJ0aWFsPEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pj4sXG4gICAgICAgICAgY2hvaWNlc09yaWdpbnMsXG4gICAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVGaWVsZChvYmopO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2ZpZWxkTm9kZUxpbmtGcm9tSnNvbihcbiAgICBqc29uOiBBamZOb2RlQ3JlYXRlICYgUGFydGlhbDxBamZGaWVsZE5vZGVMaW5rPixcbiAgKTogQWpmRmllbGROb2RlTGluayB7XG4gICAgcmV0dXJuIHsuLi5jcmVhdGVOb2RlKGpzb24pLCBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmRmllbGROb2RlTGlua307XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZmllbGRXaXRoQ2hvaWNlc0Zyb21Kc29uKFxuICAgIGpzb246IEFqZkZpZWxkQ3JlYXRlICYgUGFydGlhbDxBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4+ICYgUGFydGlhbDx7Y2hvaWNlc09yaWdpblJlZjogc3RyaW5nfT4sXG4gICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgKTogQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+IHtcbiAgICBjb25zdCBlcnIgPSAnTWFsZm9ybWVkIGZpZWxkIHdpdGggY2hvaWNlcyc7XG4gICAgaWYgKGpzb24uY2hvaWNlc09yaWdpblJlZiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICB9XG4gICAgY29uc3QgY2hvaWNlc09yaWdpbiA9IChjaG9pY2VzT3JpZ2lucyB8fCBbXSkuZmluZChjID0+IGMubmFtZSA9PT0ganNvbi5jaG9pY2VzT3JpZ2luUmVmKTtcbiAgICBpZiAoY2hvaWNlc09yaWdpbiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICB9XG4gICAgaWYgKGpzb24uY2hvaWNlc0ZpbHRlcikge1xuICAgICAganNvbi5jaG9pY2VzRmlsdGVyID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi5jaG9pY2VzRmlsdGVyKTtcbiAgICB9XG4gICAgaWYgKGpzb24udHJpZ2dlckNvbmRpdGlvbnMpIHtcbiAgICAgIGpzb24udHJpZ2dlckNvbmRpdGlvbnMgPSBqc29uLnRyaWdnZXJDb25kaXRpb25zLm1hcCh0ID0+IEFqZkNvbmRpdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24odCkpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlRmllbGRXaXRoQ2hvaWNlczxhbnk+KHsuLi5qc29uLCBjaG9pY2VzT3JpZ2lufSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZm9ybXVsYUZpZWxkRnJvbUpzb24oXG4gICAganNvbjogQWpmRmllbGRDcmVhdGUgJiBQYXJ0aWFsPEFqZkZvcm11bGFGaWVsZD4sXG4gICk6IEFqZkZvcm11bGFGaWVsZCB7XG4gICAgaWYgKGpzb24uZm9ybXVsYSkge1xuICAgICAganNvbi5mb3JtdWxhID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi5mb3JtdWxhKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmNyZWF0ZUZpZWxkKGpzb24pLFxuICAgICAgZmllbGRUeXBlOiBBamZGaWVsZFR5cGUuRm9ybXVsYSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX25vZGVHcm91cEZyb21Kc29uKFxuICAgIGpzb246IEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZk5vZGVHcm91cD4sXG4gICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgICBhdHRhY2htZW50c09yaWdpbnM/OiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sXG4gICk6IEFqZk5vZGVHcm91cCB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vZGVHcm91cCh7XG4gICAgICAuLi5BamZOb2RlU2VyaWFsaXplci5fY29udGFpbmVyTm9kZUZyb21Kc29uKGpzb24sIGNob2ljZXNPcmlnaW5zLCBhdHRhY2htZW50c09yaWdpbnMpLFxuICAgICAgLi4uQWpmTm9kZVNlcmlhbGl6ZXIuX3JlcGVhdGluZ05vZGVGcm9tSnNvbihqc29uKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9yZXBlYXRpbmdOb2RlRnJvbUpzb24oXG4gICAganNvbjogQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmUmVwZWF0aW5nTm9kZT4sXG4gICk6IEFqZlJlcGVhdGluZ05vZGUge1xuICAgIGlmIChqc29uLmZvcm11bGFSZXBzKSB7XG4gICAgICBqc29uLmZvcm11bGFSZXBzID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi5mb3JtdWxhUmVwcyk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVSZXBlYXRpbmdOb2RlKGpzb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3JlcGVhdGluZ1NsaWRlRnJvbUpzb24oXG4gICAganNvbjogQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmUmVwZWF0aW5nU2xpZGU+LFxuICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICApOiBBamZSZXBlYXRpbmdTbGlkZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJlcGVhdGluZ1NsaWRlKHtcbiAgICAgIC4uLkFqZk5vZGVTZXJpYWxpemVyLl9jb250YWluZXJOb2RlRnJvbUpzb24oanNvbiwgY2hvaWNlc09yaWdpbnMsIGF0dGFjaG1lbnRzT3JpZ2lucyksXG4gICAgICAuLi5BamZOb2RlU2VyaWFsaXplci5fcmVwZWF0aW5nTm9kZUZyb21Kc29uKGpzb24pLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3NsaWRlRnJvbUpzb24oXG4gICAganNvbjogQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmU2xpZGU+LFxuICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICApOiBBamZTbGlkZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVNsaWRlKFxuICAgICAgQWpmTm9kZVNlcmlhbGl6ZXIuX2NvbnRhaW5lck5vZGVGcm9tSnNvbihqc29uLCBjaG9pY2VzT3JpZ2lucywgYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICApO1xuICB9XG59XG4iXX0=