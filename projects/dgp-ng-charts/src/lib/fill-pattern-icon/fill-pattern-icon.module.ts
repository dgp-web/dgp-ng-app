import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { DgpSVGPatternsModule } from "../patterns/svg-patterns.module";
import { DgpSVGMasksModule } from "../masks/svg-masks.module";
import { DgpPatternAndMaskDefsModule } from "../pattern-and-mask-defs/pattern-and-mask-defs.module";

@NgModule({
    imports: [
        CommonModule,
        DgpSVGPatternsModule,
        DgpSVGMasksModule,
        DgpPatternAndMaskDefsModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpFillPatternIconModule {
}
