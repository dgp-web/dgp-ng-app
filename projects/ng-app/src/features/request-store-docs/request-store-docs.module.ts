import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as dgp from "dgp-ng-app";
import * as containers from "./containers";
import { DocsModule } from "../../ui/docs";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "request-store",
            component: containers.RequestStoreDocsPageComponent
        }]),

        dgp.DgpPageHeaderModule,
        dgp.DgpHamburgerMenuToggleModule,
        DocsModule
    ],
    declarations: [
        containers.RequestStoreDocsPageComponent
    ],
    exports: [
        containers.RequestStoreDocsPageComponent
    ]
})
export class RequestStoreDocsModule {
}
