import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import { HomePageComponent } from "./containers";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { DgpSpacerModule, DgpTileModule } from "dgp-ng-app";
import { MatTooltipModule } from "@angular/material/tooltip";

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
        MatTooltipModule
    ],
    declarations: [
        HomePageComponent
    ]
})
export class HomeModule {
}
