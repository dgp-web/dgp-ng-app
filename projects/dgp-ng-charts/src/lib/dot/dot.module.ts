import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { DgpSVGSymbolsModule } from "../shapes/svg-shape.module";

@NgModule({
    imports: [
        CommonModule,
        DgpSVGSymbolsModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpDotModule {
}
