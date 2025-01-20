import { NgModule } from "@angular/core";
import { DetailsDocsCoreModule } from "./details-docs-core.module";
import { RouterModule } from "@angular/router";
import { DetailsDocsPageComponent } from "./containers/details-docs-page.component";

@NgModule({
    imports: [
        DetailsDocsCoreModule,

        RouterModule.forChild([{
            path: "details",
            component: DetailsDocsPageComponent
        }])
    ],
    declarations: [],
    exports: [],
    providers: []
})
export class DetailsDocsModule {
}
