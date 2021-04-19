import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoxPlotComponent } from "./components/box-plot.component";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { DgpChartContainerModule } from "../chart-container/chart-container.module";
import { BoxPlotNgComponent } from "./components/box-plot-ng.component";
import { BoxPlotBottomAxisDirective } from "./directives/box-plot-bottom-axis.directive";
import { BoxPlotLeftAxisDirective } from "./directives/box-plot-left-axis.directive";
import { BoxPlotWhiskerDirective } from "./directives/box-plot-whisker.directive";
import { BoxPlotUpperAntennaDirective } from "./directives/box-plot-upper-antenna.directive";
import { BoxPlotLowerAntennaDirective } from "./directives/box-plot-lower-antenna.directive";
import { BoxPlotBoxDirective } from "./directives/box-plot-box.directive";
import { BoxPlotMedianDirective } from "./directives/box-plot-median.directive";

@NgModule({
    imports: [
        CommonModule,
        DgpChartContainerModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatDialogModule
    ],
    declarations: [
        BoxPlotComponent,
        BoxPlotNgComponent,
        BoxPlotBottomAxisDirective,
        BoxPlotLeftAxisDirective,
        BoxPlotWhiskerDirective,
        BoxPlotUpperAntennaDirective,
        BoxPlotLowerAntennaDirective,
        BoxPlotBoxDirective,
        BoxPlotMedianDirective
    ],
    exports: [
        BoxPlotComponent,
        BoxPlotNgComponent,
        BoxPlotBottomAxisDirective,
        BoxPlotLeftAxisDirective,
        BoxPlotWhiskerDirective,
        BoxPlotUpperAntennaDirective,
        BoxPlotLowerAntennaDirective,
        BoxPlotBoxDirective,
        BoxPlotMedianDirective
    ]
})
export class DgpBoxPlotModule {
}
