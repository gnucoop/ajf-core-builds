import * as i0 from "@angular/core";
export declare class AjfValidationService {
    private _baseUtilFunctions;
    private _functions;
    private _functionsStr;
    constructor();
    addFunction(f: Function | string): void;
    addFunctionHandler(name: string, fn: any): void;
    private _initFunctions;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfValidationService, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<AjfValidationService>;
}
