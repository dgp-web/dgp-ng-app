import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { DgpSVGPatternsModule } from "../patterns/svg-patterns.module";
import { DgpSVGMasksModule } from "../masks/svg-masks.module";

@NgModule({
    imports: [
        CommonModule,
        DgpSVGPatternsModule,
        DgpSVGMasksModule
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
