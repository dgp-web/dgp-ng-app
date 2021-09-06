import { NgModule } from "@angular/core";
import { directives } from "./directives/directives";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [
        ...components,
        ...directives
    ],
    imports: [
        CommonModule
    ],
    exports: [
        ...components,
        ...directives
    ]
})
export class DgpDropzoneModule {
}
