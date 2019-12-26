import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { EmptyStatePageComponent } from "./containers";
import * as dgp from "dgp-ng-app";
import { DocsPageModule } from "../shared";

@NgModule({
    imports: [

        RouterModule.forChild([{
            path: "empty-state",
            component: EmptyStatePageComponent
        }]),

        DocsPageModule,
        dgp.DgpEmptyStateModule
    ],
    declarations: [
        EmptyStatePageComponent
    ]
})
export class EmptyStateDocsModule {
}
