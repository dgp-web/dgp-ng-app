import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeatmapComponent } from "./components/heatmap.component";
import { HeatmapLegendComponent } from "./components/heatmap-legend.component";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatCardModule } from "@angular/material/card";
import { MatTooltipModule } from "@angular/material/tooltip";
import { ExportChartDialogComponent } from "./components/export-chart-dialog.component";
import { DgpSpacerModule, SafePipeModule } from "dgp-ng-app";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { DgpChartContainerModule } from "../chart-container/chart-container.module";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { DgpChartModule } from "../chart/chart.module";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        MatCardModule,
        MatTooltipModule,
        SafePipeModule,
        DgpSpacerModule,
        MatDialogModule,
        DgpChartContainerModule,
        MatButtonToggleModule,
        MatSnackBarModule,
        DgpChartModule
    ],
    declarations: [
        HeatmapComponent,
        HeatmapLegendComponent,
        ExportChartDialogComponent
    ],
    exports: [
        HeatmapComponent,
        HeatmapLegendComponent,
        ExportChartDialogComponent
    ],
    entryComponents: [
        ExportChartDialogComponent
    ]
})
export class DgpHeatmapModule {
}
