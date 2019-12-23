import { NgModule } from "@angular/core";
import { DocsModule } from "../../ui/docs";
import { RouterModule } from "@angular/router";
import { EmptyStatePageComponent } from "./containers";
import * as dgp from "dgp-ng-app";

@NgModule({
    imports: [

        RouterModule.forChild([{
            path: "empty-state",
            component: EmptyStatePageComponent
        }]),

        dgp.DgpPageHeaderModule,
        dgp.DgpHamburgerMenuToggleModule,
        DocsModule
    ],
    declarations: [
        EmptyStatePageComponent
    ],
    exports: [
        EmptyStatePageComponent
    ]
})
export class EmptyStateDocsModule {
}
