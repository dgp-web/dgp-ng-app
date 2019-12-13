import { NgModule } from "@angular/core";
import * as components from "./containers";
import * as dgp from "dgp-ng-app";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "authentication",
            component: components.AuthenticationDocsPageComponent
        }]),

        dgp.DgpPageHeaderModule,
        dgp.DgpHamburgerMenuToggleModule
    ],
    declarations: [
        components.AuthenticationDocsPageComponent
    ]
})
export class AuthenticationDocsModule {
}
