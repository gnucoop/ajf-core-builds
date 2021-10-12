import { AjfLayoutWidgetInstance } from './interface/widgets-instances/layout-widget-instance';
import { AjfWidgetInstance } from './interface/widgets-instances/widget-instance';
import * as i0 from "@angular/core";
export declare class AjfGetColumnContentPipe {
    transform(instance: AjfLayoutWidgetInstance, column: number): AjfWidgetInstance | null;
    static ɵfac: i0.ɵɵFactoryDeclaration<AjfGetColumnContentPipe, never>;
    static ɵpipe: i0.ɵɵPipeDeclaration<AjfGetColumnContentPipe, "ajfGetColumnContent">;
}
