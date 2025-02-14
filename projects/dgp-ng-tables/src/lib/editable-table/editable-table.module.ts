import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { AsyncPipe, NgForOf } from "@angular/common";
import { directives } from "./directives/directives";

@NgModule({
    imports: [
        NgForOf,
        AsyncPipe
    ],
    declarations: [
        ...components,
        ...directives
    ],
    exports: [
        ...components,
        ...directives
    ],
    providers: []
})
export class DgpEditableTableModule {
}
