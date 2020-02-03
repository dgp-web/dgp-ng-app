import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import { HomePageComponent } from "./containers";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatCardModule } from "@angular/material/card";
import { MatRippleModule } from "@angular/material/core";
import { DgpSpacerModule } from "dgp-ng-app";
import { MatTooltipModule } from "@angular/material";
import { TileComponent } from "./components";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "home",
            component: HomePageComponent
        }]),

        DocsPageModule,
        MatIconModule,
        MatDividerModule,
        MatCardModule,
        MatRippleModule,
        DgpSpacerModule,
        MatTooltipModule
    ],
    declarations: [
        HomePageComponent,
        TileComponent
    ]
})
export class HomeModule {
}
