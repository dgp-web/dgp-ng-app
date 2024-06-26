import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { directives } from "./directives/directives";
import { DialogModule } from "@angular/cdk/dialog";
import { NgTemplateOutlet } from "@angular/common";

@NgModule({
    imports: [
        DialogModule,
        NgTemplateOutlet
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
export class DgpLazyRenderedModule {
}
