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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1zZXJpYWxpemVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY29yZS9mb3Jtcy9zcmMvc2VyaWFsaXplcnMvbm9kZS1zZXJpYWxpemVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW9CRztBQUVILE9BQU8sRUFBQyxzQkFBc0IsRUFBRSxvQkFBb0IsRUFBQyxNQUFNLGtCQUFrQixDQUFDO0FBSzlFLE9BQU8sRUFBQyxZQUFZLEVBQUMsTUFBTSxnQ0FBZ0MsQ0FBQztBQU81RCxPQUFPLEVBQUMsV0FBVyxFQUFDLE1BQU0sOEJBQThCLENBQUM7QUFJekQsT0FBTyxFQUFpQixXQUFXLEVBQUMsTUFBTSw4QkFBOEIsQ0FBQztBQUN6RSxPQUFPLEVBQUMsc0JBQXNCLEVBQUMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNqRixPQUFPLEVBQUMsYUFBYSxFQUFDLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFnQixVQUFVLEVBQUMsTUFBTSw0QkFBNEIsQ0FBQztBQUNyRSxPQUFPLEVBQUMsZUFBZSxFQUFDLE1BQU0sa0NBQWtDLENBQUM7QUFDakUsT0FBTyxFQUFDLG1CQUFtQixFQUFDLE1BQU0sc0NBQXNDLENBQUM7QUFDekUsT0FBTyxFQUFDLG9CQUFvQixFQUFDLE1BQU0sd0NBQXdDLENBQUM7QUFDNUUsT0FBTyxFQUFDLFdBQVcsRUFBQyxNQUFNLDhCQUE4QixDQUFDO0FBRXpELE9BQU8sRUFBQyw0QkFBNEIsRUFBQyxNQUFNLCtCQUErQixDQUFDO0FBQzNFLE9BQU8sRUFBQyx5QkFBeUIsRUFBQyxNQUFNLDRCQUE0QixDQUFDO0FBRXJFOzs7O0dBSUc7QUFDSCxNQUFNLE9BQU8saUJBQWlCO0lBQzVCLE1BQU0sQ0FBQyxRQUFRLENBQ2IsSUFBc0IsRUFDdEIsY0FB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QzNCLElBQXVDLEVBQ3ZDLGNBQXdDLEVBQ3hDLGtCQUFnRDtRQUVoRCxPQUFPLFdBQVcsQ0FDaEIsaUJBQWlCLENBQUMsc0JBQXNCLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxrQkFBa0IsQ0FBQyxDQUNuRixDQUFDO0lBQ0osQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBAbGljZW5zZVxuICogQ29weXJpZ2h0IChDKSBHbnVjb29wIHNvYy4gY29vcC5cbiAqXG4gKiBUaGlzIGZpbGUgaXMgcGFydCBvZiB0aGUgQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKS5cbiAqXG4gKiBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpIGlzIGZyZWUgc29mdHdhcmU6IHlvdSBjYW4gcmVkaXN0cmlidXRlIGl0IGFuZC9vclxuICogbW9kaWZ5IGl0IHVuZGVyIHRoZSB0ZXJtcyBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGFzXG4gKiBwdWJsaXNoZWQgYnkgdGhlIEZyZWUgU29mdHdhcmUgRm91bmRhdGlvbiwgZWl0aGVyIHZlcnNpb24gMyBvZiB0aGUgTGljZW5zZSxcbiAqIG9yIChhdCB5b3VyIG9wdGlvbikgYW55IGxhdGVyIHZlcnNpb24uXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBkaXN0cmlidXRlZCBpbiB0aGUgaG9wZSB0aGF0IGl0IHdpbGwgYmUgdXNlZnVsLFxuICogYnV0IFdJVEhPVVQgQU5ZIFdBUlJBTlRZOyB3aXRob3V0IGV2ZW4gdGhlIGltcGxpZWQgd2FycmFudHkgb2ZcbiAqIE1FUkNIQU5UQUJJTElUWSBvciBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRS4gU2VlIHRoZSBHTlUgQWZmZXJvXG4gKiBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlIGZvciBtb3JlIGRldGFpbHMuXG4gKlxuICogWW91IHNob3VsZCBoYXZlIHJlY2VpdmVkIGEgY29weSBvZiB0aGUgR05VIEFmZmVybyBHZW5lcmFsIFB1YmxpYyBMaWNlbnNlXG4gKiBhbG9uZyB3aXRoIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKiBJZiBub3QsIHNlZSBodHRwOi8vd3d3LmdudS5vcmcvbGljZW5zZXMvLlxuICpcbiAqL1xuXG5pbXBvcnQge0FqZkNvbmRpdGlvblNlcmlhbGl6ZXIsIEFqZkZvcm11bGFTZXJpYWxpemVyfSBmcm9tICdAYWpmL2NvcmUvbW9kZWxzJztcblxuaW1wb3J0IHtBamZBdHRhY2htZW50c09yaWdpbn0gZnJvbSAnLi4vaW50ZXJmYWNlL2F0dGFjaG1lbnRzL2F0dGFjaG1lbnRzLW9yaWdpbic7XG5pbXBvcnQge0FqZkNob2ljZXNPcmlnaW59IGZyb20gJy4uL2ludGVyZmFjZS9jaG9pY2VzL2Nob2ljZXMtb3JpZ2luJztcbmltcG9ydCB7QWpmRmllbGR9IGZyb20gJy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQnO1xuaW1wb3J0IHtBamZGaWVsZFR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtdHlwZSc7XG5pbXBvcnQge0FqZkZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4uL2ludGVyZmFjZS9maWVsZHMvZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7QWpmRm9ybXVsYUZpZWxkfSBmcm9tICcuLi9pbnRlcmZhY2UvZmllbGRzL2Zvcm11bGEtZmllbGQnO1xuaW1wb3J0IHtBamZDb250YWluZXJOb2RlfSBmcm9tICcuLi9pbnRlcmZhY2Uvbm9kZXMvY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtBamZOb2RlfSBmcm9tICcuLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZSc7XG5pbXBvcnQge0FqZk5vZGVHcm91cH0gZnJvbSAnLi4vaW50ZXJmYWNlL25vZGVzL25vZGUtZ3JvdXAnO1xuaW1wb3J0IHtBamZGaWVsZE5vZGVMaW5rfSBmcm9tICcuLi9pbnRlcmZhY2Uvbm9kZXMvbm9kZS1saW5rJztcbmltcG9ydCB7QWpmTm9kZVR5cGV9IGZyb20gJy4uL2ludGVyZmFjZS9ub2Rlcy9ub2RlLXR5cGUnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdOb2RlfSBmcm9tICcuLi9pbnRlcmZhY2Uvbm9kZXMvcmVwZWF0aW5nLW5vZGUnO1xuaW1wb3J0IHtBamZSZXBlYXRpbmdTbGlkZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3NsaWRlcy9yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtBamZTbGlkZX0gZnJvbSAnLi4vaW50ZXJmYWNlL3NsaWRlcy9zbGlkZSc7XG5pbXBvcnQge0FqZkZpZWxkQ3JlYXRlLCBjcmVhdGVGaWVsZH0gZnJvbSAnLi4vdXRpbHMvZmllbGRzL2NyZWF0ZS1maWVsZCc7XG5pbXBvcnQge2NyZWF0ZUZpZWxkV2l0aENob2ljZXN9IGZyb20gJy4uL3V0aWxzL2ZpZWxkcy9jcmVhdGUtZmllbGQtd2l0aC1jaG9pY2VzJztcbmltcG9ydCB7Y29tcG9uZW50c01hcH0gZnJvbSAnLi4vdXRpbHMvZmllbGRzL2ZpZWxkcy1tYXAnO1xuaW1wb3J0IHtjcmVhdGVDb250YWluZXJOb2RlfSBmcm9tICcuLi91dGlscy9ub2Rlcy9jcmVhdGUtY29udGFpbmVyLW5vZGUnO1xuaW1wb3J0IHtBamZOb2RlQ3JlYXRlLCBjcmVhdGVOb2RlfSBmcm9tICcuLi91dGlscy9ub2Rlcy9jcmVhdGUtbm9kZSc7XG5pbXBvcnQge2NyZWF0ZU5vZGVHcm91cH0gZnJvbSAnLi4vdXRpbHMvbm9kZXMvY3JlYXRlLW5vZGUtZ3JvdXAnO1xuaW1wb3J0IHtjcmVhdGVSZXBlYXRpbmdOb2RlfSBmcm9tICcuLi91dGlscy9ub2Rlcy9jcmVhdGUtcmVwZWF0aW5nLW5vZGUnO1xuaW1wb3J0IHtjcmVhdGVSZXBlYXRpbmdTbGlkZX0gZnJvbSAnLi4vdXRpbHMvc2xpZGVzL2NyZWF0ZS1yZXBlYXRpbmctc2xpZGUnO1xuaW1wb3J0IHtjcmVhdGVTbGlkZX0gZnJvbSAnLi4vdXRpbHMvc2xpZGVzL2NyZWF0ZS1zbGlkZSc7XG5cbmltcG9ydCB7QWpmVmFsaWRhdGlvbkdyb3VwU2VyaWFsaXplcn0gZnJvbSAnLi92YWxpZGF0aW9uLWdyb3VwLXNlcmlhbGl6ZXInO1xuaW1wb3J0IHtBamZXYXJuaW5nR3JvdXBTZXJpYWxpemVyfSBmcm9tICcuL3dhcm5pbmctZ3JvdXAtc2VyaWFsaXplcic7XG5cbi8qKlxuICogQ3JlYXRlIGFuIEFqZk5vZGUgYnkganNvbiBzY2hlbWEsXG4gKiBhcHBseSBhIGRlZmF1bHQgdmFsdWUgZm9yIG5hbWVcbiAqIHRocm93IG5ldyBlcnJvciBpZiBpZCxwYXJlbnQgb3Igbm9kZVR5cGUgYXR0cmlidXRlIG1pc3NlZFxuICovXG5leHBvcnQgY2xhc3MgQWpmTm9kZVNlcmlhbGl6ZXIge1xuICBzdGF0aWMgZnJvbUpzb24oXG4gICAganNvbjogUGFydGlhbDxBamZOb2RlPixcbiAgICBjaG9pY2VzT3JpZ2lucz86IEFqZkNob2ljZXNPcmlnaW48YW55PltdLFxuICAgIGF0dGFjaG1lbnRzT3JpZ2lucz86IEFqZkF0dGFjaG1lbnRzT3JpZ2luPGFueT5bXSxcbiAgKTogQWpmTm9kZSB7XG4gICAgY29uc3QgZXJyID0gJ01hbGZvcm1lZCBub2RlJztcbiAgICBjb25zdCBvYmogPSB7Li4uanNvbn07XG4gICAgb2JqLm5hbWUgPSBvYmoubmFtZSA/PyAnJztcbiAgICBpZiAob2JqLmlkID09IG51bGwgfHwgb2JqLnBhcmVudCA9PSBudWxsIHx8IG9iai5ub2RlVHlwZSA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICB9XG4gICAgaWYgKG9iai52aXNpYmlsaXR5KSB7XG4gICAgICBvYmoudmlzaWJpbGl0eSA9IEFqZkNvbmRpdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24ob2JqLnZpc2liaWxpdHkpO1xuICAgIH1cbiAgICBvYmouY29uZGl0aW9uYWxCcmFuY2hlcyA9IChvYmouY29uZGl0aW9uYWxCcmFuY2hlcyB8fCBbXSkubWFwKGMgPT5cbiAgICAgIEFqZkNvbmRpdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24oYyksXG4gICAgKTtcbiAgICAvLyBjYWxsIHNlcmlhbGl6ZXIgYnkgbm9kZVR5cGUgYW5kIGNhc3Qgb2JqIHdpdGggdGhlIHJpZ2h0IGludGVyZmFjZVxuICAgIHN3aXRjaCAob2JqLm5vZGVUeXBlKSB7XG4gICAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZkZpZWxkOlxuICAgICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX2ZpZWxkRnJvbUpzb24oXG4gICAgICAgICAgb2JqIGFzIEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZkZpZWxkPixcbiAgICAgICAgICBjaG9pY2VzT3JpZ2lucyxcbiAgICAgICAgICBhdHRhY2htZW50c09yaWdpbnMsXG4gICAgICAgICk7XG4gICAgICBjYXNlIEFqZk5vZGVUeXBlLkFqZkZpZWxkTm9kZUxpbms6XG4gICAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fZmllbGROb2RlTGlua0Zyb21Kc29uKFxuICAgICAgICAgIG9iaiBhcyBBamZOb2RlQ3JlYXRlICYgUGFydGlhbDxBamZGaWVsZE5vZGVMaW5rPixcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmTm9kZUdyb3VwOlxuICAgICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX25vZGVHcm91cEZyb21Kc29uKFxuICAgICAgICAgIG9iaiBhcyBBamZOb2RlQ3JlYXRlICYgUGFydGlhbDxBamZOb2RlR3JvdXA+LFxuICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmUmVwZWF0aW5nU2xpZGU6XG4gICAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fcmVwZWF0aW5nU2xpZGVGcm9tSnNvbihcbiAgICAgICAgICBvYmogYXMgQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmUmVwZWF0aW5nU2xpZGU+LFxuICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgICAgKTtcbiAgICAgIGNhc2UgQWpmTm9kZVR5cGUuQWpmU2xpZGU6XG4gICAgICAgIGNvbnN0IHNsaWRlT2JqID0gb2JqIGFzIEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZlNsaWRlPjtcbiAgICAgICAgaWYgKHNsaWRlT2JqLnJlYWRvbmx5KSB7XG4gICAgICAgICAgc2xpZGVPYmoucmVhZG9ubHkgPSBBamZDb25kaXRpb25TZXJpYWxpemVyLmZyb21Kc29uKHNsaWRlT2JqLnJlYWRvbmx5KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX3NsaWRlRnJvbUpzb24oXG4gICAgICAgICAgc2xpZGVPYmogYXMgQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmU2xpZGU+LFxuICAgICAgICAgIGNob2ljZXNPcmlnaW5zLFxuICAgICAgICAgIGF0dGFjaG1lbnRzT3JpZ2lucyxcbiAgICAgICAgKTtcbiAgICB9XG4gICAgdGhyb3cgbmV3IEVycm9yKGVycik7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfY29udGFpbmVyTm9kZUZyb21Kc29uKFxuICAgIGpzb246IEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZkNvbnRhaW5lck5vZGU+LFxuICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICApOiBBamZDb250YWluZXJOb2RlIHtcbiAgICBqc29uLm5vZGVzID0gKGpzb24ubm9kZXMgfHwgW10pLm1hcChuID0+XG4gICAgICBBamZOb2RlU2VyaWFsaXplci5mcm9tSnNvbihuLCBjaG9pY2VzT3JpZ2lucywgYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICApO1xuICAgIHJldHVybiBjcmVhdGVDb250YWluZXJOb2RlKGpzb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2ZpZWxkRnJvbUpzb24oXG4gICAganNvbjogQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmRmllbGQ+ICYgUGFydGlhbDx7YXR0YWNobWVudHNPcmlnaW5SZWY6IHN0cmluZ30+LFxuICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICApOiBBamZGaWVsZCB7XG4gICAgaWYgKGpzb24uZmllbGRUeXBlID09IG51bGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWFsZm9ybWVkIGZpZWxkJyk7XG4gICAgfVxuICAgIGNvbnN0IG9iaiA9IGpzb24gYXMgQWpmRmllbGRDcmVhdGU7XG4gICAgaWYgKG9iai52YWxpZGF0aW9uKSB7XG4gICAgICBvYmoudmFsaWRhdGlvbiA9IEFqZlZhbGlkYXRpb25Hcm91cFNlcmlhbGl6ZXIuZnJvbUpzb24ob2JqLnZhbGlkYXRpb24pO1xuICAgIH1cbiAgICBpZiAob2JqLndhcm5pbmcpIHtcbiAgICAgIG9iai53YXJuaW5nID0gQWpmV2FybmluZ0dyb3VwU2VyaWFsaXplci5mcm9tSnNvbihvYmoud2FybmluZyk7XG4gICAgfVxuICAgIGlmIChqc29uLmF0dGFjaG1lbnRzT3JpZ2luUmVmKSB7XG4gICAgICBvYmouYXR0YWNobWVudE9yaWdpbiA9IChhdHRhY2htZW50c09yaWdpbnMgfHwgW10pLmZpbmQoXG4gICAgICAgIGEgPT4gYS5uYW1lID09PSBqc29uLmF0dGFjaG1lbnRzT3JpZ2luUmVmLFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKG9iai5uZXh0U2xpZGVDb25kaXRpb24pIHtcbiAgICAgIG9iai5uZXh0U2xpZGVDb25kaXRpb24gPSBBamZDb25kaXRpb25TZXJpYWxpemVyLmZyb21Kc29uKG9iai5uZXh0U2xpZGVDb25kaXRpb24pO1xuICAgIH1cbiAgICBjb25zdCBpc0N1c3RvbUZpZWxkV2l0aENob2ljZSA9XG4gICAgICBvYmouZmllbGRUeXBlID4gMTAwICYmXG4gICAgICBjb21wb25lbnRzTWFwW29iai5maWVsZFR5cGVdICE9IG51bGwgJiZcbiAgICAgIGNvbXBvbmVudHNNYXBbb2JqLmZpZWxkVHlwZV0uaXNGaWVsZFdpdGhDaG9pY2UgPT09IHRydWU7XG4gICAgaWYgKGlzQ3VzdG9tRmllbGRXaXRoQ2hvaWNlKSB7XG4gICAgICByZXR1cm4gQWpmTm9kZVNlcmlhbGl6ZXIuX2ZpZWxkV2l0aENob2ljZXNGcm9tSnNvbihcbiAgICAgICAganNvbiBhcyBBamZGaWVsZENyZWF0ZSAmIFBhcnRpYWw8QWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+PixcbiAgICAgICAgY2hvaWNlc09yaWdpbnMsXG4gICAgICApO1xuICAgIH1cblxuICAgIHN3aXRjaCAob2JqLmZpZWxkVHlwZSkge1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuRm9ybXVsYTpcbiAgICAgICAgcmV0dXJuIEFqZk5vZGVTZXJpYWxpemVyLl9mb3JtdWxhRmllbGRGcm9tSnNvbihcbiAgICAgICAgICBqc29uIGFzIEFqZkZpZWxkQ3JlYXRlICYgUGFydGlhbDxBamZGb3JtdWxhRmllbGQ+LFxuICAgICAgICApO1xuICAgICAgY2FzZSBBamZGaWVsZFR5cGUuTXVsdGlwbGVDaG9pY2U6XG4gICAgICBjYXNlIEFqZkZpZWxkVHlwZS5TaW5nbGVDaG9pY2U6XG4gICAgICAgIHJldHVybiBBamZOb2RlU2VyaWFsaXplci5fZmllbGRXaXRoQ2hvaWNlc0Zyb21Kc29uKFxuICAgICAgICAgIGpzb24gYXMgQWpmRmllbGRDcmVhdGUgJiBQYXJ0aWFsPEFqZkZpZWxkV2l0aENob2ljZXM8YW55Pj4sXG4gICAgICAgICAgY2hvaWNlc09yaWdpbnMsXG4gICAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVGaWVsZChvYmopO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2ZpZWxkTm9kZUxpbmtGcm9tSnNvbihcbiAgICBqc29uOiBBamZOb2RlQ3JlYXRlICYgUGFydGlhbDxBamZGaWVsZE5vZGVMaW5rPixcbiAgKTogQWpmRmllbGROb2RlTGluayB7XG4gICAgcmV0dXJuIHsuLi5jcmVhdGVOb2RlKGpzb24pLCBub2RlVHlwZTogQWpmTm9kZVR5cGUuQWpmRmllbGROb2RlTGlua307XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZmllbGRXaXRoQ2hvaWNlc0Zyb21Kc29uKFxuICAgIGpzb246IEFqZkZpZWxkQ3JlYXRlICYgUGFydGlhbDxBamZGaWVsZFdpdGhDaG9pY2VzPGFueT4+ICYgUGFydGlhbDx7Y2hvaWNlc09yaWdpblJlZjogc3RyaW5nfT4sXG4gICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgKTogQWpmRmllbGRXaXRoQ2hvaWNlczxhbnk+IHtcbiAgICBjb25zdCBlcnIgPSAnTWFsZm9ybWVkIGZpZWxkIHdpdGggY2hvaWNlcyc7XG4gICAgaWYgKGpzb24uY2hvaWNlc09yaWdpblJlZiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICB9XG4gICAgY29uc3QgY2hvaWNlc09yaWdpbiA9IChjaG9pY2VzT3JpZ2lucyB8fCBbXSkuZmluZChjID0+IGMubmFtZSA9PT0ganNvbi5jaG9pY2VzT3JpZ2luUmVmKTtcbiAgICBpZiAoY2hvaWNlc09yaWdpbiA9PSBudWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoZXJyKTtcbiAgICB9XG4gICAgaWYgKGpzb24uY2hvaWNlc0ZpbHRlcikge1xuICAgICAganNvbi5jaG9pY2VzRmlsdGVyID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi5jaG9pY2VzRmlsdGVyKTtcbiAgICB9XG4gICAgaWYgKGpzb24udHJpZ2dlckNvbmRpdGlvbnMpIHtcbiAgICAgIGpzb24udHJpZ2dlckNvbmRpdGlvbnMgPSBqc29uLnRyaWdnZXJDb25kaXRpb25zLm1hcCh0ID0+IEFqZkNvbmRpdGlvblNlcmlhbGl6ZXIuZnJvbUpzb24odCkpO1xuICAgIH1cbiAgICByZXR1cm4gY3JlYXRlRmllbGRXaXRoQ2hvaWNlczxhbnk+KHsuLi5qc29uLCBjaG9pY2VzT3JpZ2lufSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfZm9ybXVsYUZpZWxkRnJvbUpzb24oXG4gICAganNvbjogQWpmRmllbGRDcmVhdGUgJiBQYXJ0aWFsPEFqZkZvcm11bGFGaWVsZD4sXG4gICk6IEFqZkZvcm11bGFGaWVsZCB7XG4gICAgaWYgKGpzb24uZm9ybXVsYSkge1xuICAgICAganNvbi5mb3JtdWxhID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi5mb3JtdWxhKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmNyZWF0ZUZpZWxkKGpzb24pLFxuICAgICAgZmllbGRUeXBlOiBBamZGaWVsZFR5cGUuRm9ybXVsYSxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX25vZGVHcm91cEZyb21Kc29uKFxuICAgIGpzb246IEFqZk5vZGVDcmVhdGUgJiBQYXJ0aWFsPEFqZk5vZGVHcm91cD4sXG4gICAgY2hvaWNlc09yaWdpbnM/OiBBamZDaG9pY2VzT3JpZ2luPGFueT5bXSxcbiAgICBhdHRhY2htZW50c09yaWdpbnM/OiBBamZBdHRhY2htZW50c09yaWdpbjxhbnk+W10sXG4gICk6IEFqZk5vZGVHcm91cCB7XG4gICAgcmV0dXJuIGNyZWF0ZU5vZGVHcm91cCh7XG4gICAgICAuLi5BamZOb2RlU2VyaWFsaXplci5fY29udGFpbmVyTm9kZUZyb21Kc29uKGpzb24sIGNob2ljZXNPcmlnaW5zLCBhdHRhY2htZW50c09yaWdpbnMpLFxuICAgICAgLi4uQWpmTm9kZVNlcmlhbGl6ZXIuX3JlcGVhdGluZ05vZGVGcm9tSnNvbihqc29uKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9yZXBlYXRpbmdOb2RlRnJvbUpzb24oXG4gICAganNvbjogQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmUmVwZWF0aW5nTm9kZT4sXG4gICk6IEFqZlJlcGVhdGluZ05vZGUge1xuICAgIGlmIChqc29uLmZvcm11bGFSZXBzKSB7XG4gICAgICBqc29uLmZvcm11bGFSZXBzID0gQWpmRm9ybXVsYVNlcmlhbGl6ZXIuZnJvbUpzb24oanNvbi5mb3JtdWxhUmVwcyk7XG4gICAgfVxuICAgIHJldHVybiBjcmVhdGVSZXBlYXRpbmdOb2RlKGpzb24pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3JlcGVhdGluZ1NsaWRlRnJvbUpzb24oXG4gICAganNvbjogQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmUmVwZWF0aW5nU2xpZGU+LFxuICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICApOiBBamZSZXBlYXRpbmdTbGlkZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVJlcGVhdGluZ1NsaWRlKHtcbiAgICAgIC4uLkFqZk5vZGVTZXJpYWxpemVyLl9jb250YWluZXJOb2RlRnJvbUpzb24oanNvbiwgY2hvaWNlc09yaWdpbnMsIGF0dGFjaG1lbnRzT3JpZ2lucyksXG4gICAgICAuLi5BamZOb2RlU2VyaWFsaXplci5fcmVwZWF0aW5nTm9kZUZyb21Kc29uKGpzb24pLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3NsaWRlRnJvbUpzb24oXG4gICAganNvbjogQWpmTm9kZUNyZWF0ZSAmIFBhcnRpYWw8QWpmU2xpZGU+LFxuICAgIGNob2ljZXNPcmlnaW5zPzogQWpmQ2hvaWNlc09yaWdpbjxhbnk+W10sXG4gICAgYXR0YWNobWVudHNPcmlnaW5zPzogQWpmQXR0YWNobWVudHNPcmlnaW48YW55PltdLFxuICApOiBBamZTbGlkZSB7XG4gICAgcmV0dXJuIGNyZWF0ZVNsaWRlKFxuICAgICAgQWpmTm9kZVNlcmlhbGl6ZXIuX2NvbnRhaW5lck5vZGVGcm9tSnNvbihqc29uLCBjaG9pY2VzT3JpZ2lucywgYXR0YWNobWVudHNPcmlnaW5zKSxcbiAgICApO1xuICB9XG59XG4iXX0=