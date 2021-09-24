import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { DgpSpacerModule, SafePipeModule } from "dgp-ng-app";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { DgpChartContainerModule } from "../chart-container/chart-container.module";
import { DgpHeatmapModule } from "../heatmap/heatmap.module";
import { components } from "./components/components";

@NgModule({
    imports: [
        DgpChartContainerModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        CommonModule,
        SafePipeModule,
        DgpSpacerModule,
        MatButtonToggleModule,
        MatDialogModule,
        DgpHeatmapModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpBarChartModule {
}
