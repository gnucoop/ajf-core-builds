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
import { nodeInstanceSuffix } from './node-instance-suffix';
// TODO: add details
/**
 * It creates the complete name of the instance.
 */
export function nodeInstanceCompleteName(instance) {
    return instance != null && instance.node != null
        ? `${instance.node.name}${nodeInstanceSuffix(instance)}`
        : '';
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZS1pbnN0YW5jZS1jb21wbGV0ZS1uYW1lLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vc3JjL2NvcmUvZm9ybXMvdXRpbHMvbm9kZXMtaW5zdGFuY2VzL25vZGUtaW5zdGFuY2UtY29tcGxldGUtbmFtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FvQkc7QUFHSCxPQUFPLEVBQUMsa0JBQWtCLEVBQUMsTUFBTSx3QkFBd0IsQ0FBQztBQUUxRCxvQkFBb0I7QUFDcEI7O0dBRUc7QUFDSCxNQUFNLFVBQVUsd0JBQXdCLENBQUMsUUFBeUI7SUFDaEUsT0FBTyxRQUFRLElBQUksSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksSUFBSTtRQUM5QyxDQUFDLENBQUMsR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksR0FBRyxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsRUFBRTtRQUN4RCxDQUFDLENBQUMsRUFBRSxDQUFDO0FBQ1QsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQGxpY2Vuc2VcbiAqIENvcHlyaWdodCAoQykgR251Y29vcCBzb2MuIGNvb3AuXG4gKlxuICogVGhpcyBmaWxlIGlzIHBhcnQgb2YgdGhlIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikuXG4gKlxuICogQWR2YW5jZWQgSlNPTiBmb3JtcyAoYWpmKSBpcyBmcmVlIHNvZnR3YXJlOiB5b3UgY2FuIHJlZGlzdHJpYnV0ZSBpdCBhbmQvb3JcbiAqIG1vZGlmeSBpdCB1bmRlciB0aGUgdGVybXMgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBhc1xuICogcHVibGlzaGVkIGJ5IHRoZSBGcmVlIFNvZnR3YXJlIEZvdW5kYXRpb24sIGVpdGhlciB2ZXJzaW9uIDMgb2YgdGhlIExpY2Vuc2UsXG4gKiBvciAoYXQgeW91ciBvcHRpb24pIGFueSBsYXRlciB2ZXJzaW9uLlxuICpcbiAqIEFkdmFuY2VkIEpTT04gZm9ybXMgKGFqZikgaXMgZGlzdHJpYnV0ZWQgaW4gdGhlIGhvcGUgdGhhdCBpdCB3aWxsIGJlIHVzZWZ1bCxcbiAqIGJ1dCBXSVRIT1VUIEFOWSBXQVJSQU5UWTsgd2l0aG91dCBldmVuIHRoZSBpbXBsaWVkIHdhcnJhbnR5IG9mXG4gKiBNRVJDSEFOVEFCSUxJVFkgb3IgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UuIFNlZSB0aGUgR05VIEFmZmVyb1xuICogR2VuZXJhbCBQdWJsaWMgTGljZW5zZSBmb3IgbW9yZSBkZXRhaWxzLlxuICpcbiAqIFlvdSBzaG91bGQgaGF2ZSByZWNlaXZlZCBhIGNvcHkgb2YgdGhlIEdOVSBBZmZlcm8gR2VuZXJhbCBQdWJsaWMgTGljZW5zZVxuICogYWxvbmcgd2l0aCBBZHZhbmNlZCBKU09OIGZvcm1zIChhamYpLlxuICogSWYgbm90LCBzZWUgaHR0cDovL3d3dy5nbnUub3JnL2xpY2Vuc2VzLy5cbiAqXG4gKi9cblxuaW1wb3J0IHtBamZOb2RlSW5zdGFuY2V9IGZyb20gJy4uLy4uL2ludGVyZmFjZS9ub2Rlcy1pbnN0YW5jZXMvbm9kZS1pbnN0YW5jZSc7XG5pbXBvcnQge25vZGVJbnN0YW5jZVN1ZmZpeH0gZnJvbSAnLi9ub2RlLWluc3RhbmNlLXN1ZmZpeCc7XG5cbi8vIFRPRE86IGFkZCBkZXRhaWxzXG4vKipcbiAqIEl0IGNyZWF0ZXMgdGhlIGNvbXBsZXRlIG5hbWUgb2YgdGhlIGluc3RhbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gbm9kZUluc3RhbmNlQ29tcGxldGVOYW1lKGluc3RhbmNlOiBBamZOb2RlSW5zdGFuY2UpOiBzdHJpbmcge1xuICByZXR1cm4gaW5zdGFuY2UgIT0gbnVsbCAmJiBpbnN0YW5jZS5ub2RlICE9IG51bGxcbiAgICA/IGAke2luc3RhbmNlLm5vZGUubmFtZX0ke25vZGVJbnN0YW5jZVN1ZmZpeChpbnN0YW5jZSl9YFxuICAgIDogJyc7XG59XG4iXX0=