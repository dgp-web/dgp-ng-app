import { NgModule } from "@angular/core";
import { directives } from "./directives/directives";

@NgModule({
    declarations: [
        ...directives
    ],
    exports: [
        ...directives
    ]
})
export class DgpSVGPatternsModule {
}
