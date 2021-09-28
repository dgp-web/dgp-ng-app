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
import { ActionContextLabsPageComponent } from "./containers/action-context-labs-page.component";
import { CommonModule } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ScrollingModule as ExperimentalScrollingModule } from "@angular/cdk-experimental/scrolling";
import { DgpResizeSensorModule } from "../../../../../dgp-ng-app/src/resize-sensor/resize-sensor.module";

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forRoot([{
            path: "action-context",
            component: ActionContextLabsPageComponent
        }], {relativeLinkResolution: "legacy"}),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DgpActionContextModule,
        DgpSpacerModule,
        DgpTileModule,
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        DgpPageHeaderContextActionsModule,

        ScrollingModule,
        ExperimentalScrollingModule,
        DgpResizeSensorModule
    ],
    declarations: [
        ActionContextLabsPageComponent
    ]
})
export class ActionContextLabsModule {
}
