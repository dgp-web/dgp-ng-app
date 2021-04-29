import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import {
    DgpActionContextModule,
    DgpHamburgerMenuToggleModule,
    DgpPageHeaderContextActionsModule,
    DgpPageHeaderModule,
    DgpSpacerModule,
    DgpTileModule
} from "dgp-ng-app";
import { DgpNgChartsModule } from "dgp-ng-charts";
import { ActionContextLabsPageComponent } from "./containers/action-context-labs-page.component";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

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
        DgpSpacerModule,
        DgpTileModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        DgpPageHeaderContextActionsModule
    ],
    declarations: [
        ActionContextLabsPageComponent
    ]
})
export class ActionContextLabsModule {
}

console.log();
