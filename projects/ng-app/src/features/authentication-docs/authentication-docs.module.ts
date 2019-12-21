import { NgModule } from "@angular/core";
import * as components from "./containers";
import * as dgp from "dgp-ng-app";
import { RouterModule } from "@angular/router";
import { DocsModule } from "../../ui/docs";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "authentication",
            component: components.AuthenticationDocsPageComponent
        }]),

        dgp.DgpPageHeaderModule,
        dgp.DgpHamburgerMenuToggleModule,
        DocsModule
    ],
    declarations: [
        components.AuthenticationDocsPageComponent
    ]
})
export class AuthenticationDocsModule {
}
