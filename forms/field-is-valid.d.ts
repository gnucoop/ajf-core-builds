import { AjfValidationResult } from './interface/validation/validation-results';
import * as i0 from "@angular/core";
/**
 * It returns true if all validationResults are true.
 *
 */
export declare class AjfFieldIsValidPipe {
    transform(validationResults?: AjfValidationResult[]): boolean;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfFieldIsValidPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfFieldIsValidPipe, "ajfFieldIsValid">;
}
