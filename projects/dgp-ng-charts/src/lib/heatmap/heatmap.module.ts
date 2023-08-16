import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeatmapComponent } from "./components/heatmap.component";
import { HeatmapLegendComponent } from "./components/heatmap-legend.component";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { ExportChartDialogComponent } from "./components/export-chart-dialog.component";
import { DgpSpacerModule, SafePipeModule } from "dgp-ng-app";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { DgpChartContainerModule } from "../chart-container/chart-container.module";
import { MatLegacySnackBarModule as MatSnackBarModule } from "@angular/material/legacy-snack-bar";
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
    ]
})
export class DgpHeatmapModule {
}
