import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { DgpResizeSensorModule, DgpSpacerModule, SafePipeModule } from "dgp-ng-app";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { DgpChartContainerModule } from "../chart-container/chart-container.module";
import { DgpHeatmapModule } from "../heatmap/heatmap.module";
import { components } from "./components/components";
import { DgpChartModule } from "../chart/chart.module";
import { directives } from "./directives/directives";
import { DgpSVGPatternsModule } from "../patterns/svg-patterns.module";
import { DgpSVGMasksModule } from "../masks/svg-masks.module";
import { DgpPlotContainerModule } from "../plot-container/dgp-plot-container.module";

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
        DgpHeatmapModule,
        DgpChartModule,
        DgpResizeSensorModule,
        DgpSVGPatternsModule,
        DgpSVGMasksModule,
        DgpPlotContainerModule
    ],
    declarations: [
        ...components,
        ...directives
    ],
    exports: [
        ...components,
        ...directives
    ]
})
export class DgpBarChartModule {
}
