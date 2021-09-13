import { NgModule } from "@angular/core";
import { directives } from "./directives/directives";
import { components } from "./components/components";

@NgModule({
    imports: [],
    declarations: [
        ...components,
        ...directives
    ],
    exports: [
        ...components,
        ...directives
    ]
})
export class DgpSVGPatternsModule {
}
