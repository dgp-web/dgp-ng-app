import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { directives } from "./directives/directives";

@NgModule({
    imports: [],
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
export class DgpLazyRenderedModule {
}
