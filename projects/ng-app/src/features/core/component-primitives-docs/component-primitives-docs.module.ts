import { NgModule } from "@angular/core";
import { ComponentPrimitivesDocsCoreModule } from "./component-primitives-docs-core.module";
import { RouterModule } from "@angular/router";
import { ComponentPrimitivesDocsPageComponent } from "./containers/component-primitives-docs-page.component";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "component-primitives",
            component: ComponentPrimitivesDocsPageComponent
        }]),

        ComponentPrimitivesDocsCoreModule
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class ComponentPrimitivesDocsModule {
}
