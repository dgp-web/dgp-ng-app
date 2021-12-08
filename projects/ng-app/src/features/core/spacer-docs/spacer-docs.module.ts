import { NgModule } from "@angular/core";
import { SpacerDocPageComponent } from "./containers";
import { DocsPageModule } from "../../shared";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "spacer",
            component: SpacerDocPageComponent
        }]),
        DocsPageModule
    ],
    declarations: [
        SpacerDocPageComponent
    ]
})
export class SpacerDocsModule {
}
