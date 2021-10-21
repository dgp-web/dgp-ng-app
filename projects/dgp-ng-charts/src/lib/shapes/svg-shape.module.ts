import { NgModule } from "@angular/core";
import { directives } from "./directives/directives";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { DgpSVGMasksModule } from "../masks/svg-masks.module";
import { DgpSVGPatternsModule } from "../patterns/svg-patterns.module";

@NgModule({
    imports: [
        CommonModule,
        DgpSVGPatternsModule,
        DgpSVGMasksModule
    ],
    declarations: [
        ...components,
        ...directives
    ],
    exports: [
        ...components,
        ...directives
    ]
})
export class DgpSVGSymbolsModule {
}
