import { NgModule } from "@angular/core";
import { directives } from "./directives/directives";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule
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
