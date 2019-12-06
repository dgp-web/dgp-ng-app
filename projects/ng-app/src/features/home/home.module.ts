import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import * as dgp from "dgp-ng-app";
import { UiSharedModule } from "../../ui/shared";
import * as components from "./components";

@NgModule({
    imports: [
        UiSharedModule,
        dgp.DgpPageHeaderModule,
        dgp.DgpHamburgerMenuToggleModule,

        RouterModule.forChild([{
            path: "home",
            component: components.HomePageComponent
        }])
    ],
    declarations: [
        components.HomePageComponent
    ]
})
export class HomeModule {
}
