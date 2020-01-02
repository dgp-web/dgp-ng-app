import { NgModule } from "@angular/core";
import { DocsPageModule } from "../shared";
import { RouterModule } from "@angular/router";
import { ListDetailsPageDocsComponent } from "./containers";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "list-details-page",
            component: ListDetailsPageDocsComponent
        }]),
        DocsPageModule
    ],
    declarations: [
        ListDetailsPageDocsComponent
    ]
})
export class ListDetailsPageDocsModule {
}
