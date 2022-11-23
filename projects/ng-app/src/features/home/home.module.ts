import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import { HomePageComponent } from "./containers";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { DgpSpacerModule, DgpTileModule } from "dgp-ng-app";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "home",
            component: HomePageComponent
        }]),

        DgpTileModule,
        DocsPageModule,
        MatIconModule,
        MatDividerModule,
        DgpSpacerModule,
        MatTooltipModule,
        CommonModule
    ],
    declarations: [
        HomePageComponent
    ]
})
export class HomeModule {
}
