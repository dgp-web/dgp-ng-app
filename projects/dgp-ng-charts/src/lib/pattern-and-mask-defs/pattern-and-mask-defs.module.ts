import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpSVGPatternsModule } from "../patterns/svg-patterns.module";
import { DgpSVGMasksModule } from "../masks/svg-masks.module";

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        DgpSVGPatternsModule,
        DgpSVGMasksModule
    ],
    exports: [
        ...components
    ]
})
export class DgpPatternAndMaskDefsModule {
}
