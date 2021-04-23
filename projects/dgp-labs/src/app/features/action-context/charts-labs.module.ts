import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DgpActionContextModule, DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpSpacerModule } from "dgp-ng-app";
import { DgpNgChartsModule } from "dgp-ng-charts";
import { ActionContextLabsPageComponent } from "./containers/action-context-labs-page.component";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot([{
            path: "action-context",
            component: ActionContextLabsPageComponent
        }], {relativeLinkResolution: "legacy"}),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DgpNgChartsModule,
        DgpActionContextModule,
        DgpSpacerModule
    ],
    declarations: [
        ActionContextLabsPageComponent
    ]
})
export class ActionContextLabsModule {
}
