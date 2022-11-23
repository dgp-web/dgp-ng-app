import { NgModule } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { MatIconModule } from "@angular/material/icon";
import { CommonModule } from "@angular/common";
import { DgpResizeSensorModule, DgpSpacerModule, SafePipeModule } from "dgp-ng-app";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { DgpChartContainerModule } from "../chart-container/chart-container.module";
import { DgpHeatmapModule } from "../heatmap/heatmap.module";
import { components } from "./components/components";
import { DgpChartModule } from "../chart/chart.module";
import { directives } from "./directives/directives";
import { DgpSVGPatternsModule } from "../patterns/svg-patterns.module";
import { DgpSVGMasksModule } from "../masks/svg-masks.module";
import { DgpPlotContainerModule } from "../plot-container/dgp-plot-container.module";
import { DgpPatternAndMaskDefsModule } from "../pattern-and-mask-defs/pattern-and-mask-defs.module";

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
        DgpPlotContainerModule,
        DgpPatternAndMaskDefsModule
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
