import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { directives } from "./directives/directives";

@NgModule({
    declarations: [
        ...components,
        ...directives
    ],
    exports: [
        ...components,
        ...directives
    ]
})
export class DgpSVGMasksModule {

}
