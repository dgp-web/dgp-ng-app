import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { DgpChartContainerModule } from "../chart-container/chart-container.module";
import { BoxPlotBottomAxisDirective } from "./directives/box-plot-bottom-axis.directive";
import { BoxPlotLeftAxisDirective } from "./directives/box-plot-left-axis.directive";
import { BoxPlotWhiskerDirective } from "./directives/box-plot-whisker.directive";
import { BoxPlotUpperAntennaDirective } from "./directives/box-plot-upper-antenna.directive";
import { BoxPlotLowerAntennaDirective } from "./directives/box-plot-lower-antenna.directive";
import { BoxPlotBoxDirective } from "./directives/box-plot-box.directive";
import { BoxPlotMedianDirective } from "./directives/box-plot-median.directive";
import { BoxPlotOutlierDirective } from "./directives/box-plot-outlier.directive";
import { BoxPlotBrushSelectorDirective } from "./directives/box-plot-brush-selector.directive";
import { BoxPlotOutlierTooltipDirective } from "./directives/box-plot-outlier-tooltip.directive";
import { MatMenuModule } from "@angular/material/menu";
import { components } from "./components/components";

@NgModule({
    imports: [
        CommonModule,
        DgpChartContainerModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatDialogModule,
        MatMenuModule
    ],
    declarations: [
        BoxPlotBottomAxisDirective,
        BoxPlotLeftAxisDirective,
        BoxPlotWhiskerDirective,
        BoxPlotUpperAntennaDirective,
        BoxPlotLowerAntennaDirective,
        BoxPlotBoxDirective,
        BoxPlotMedianDirective,
        BoxPlotOutlierDirective,
        BoxPlotBrushSelectorDirective,
        BoxPlotOutlierTooltipDirective,
        ...components
    ],
    exports: [
        BoxPlotBottomAxisDirective,
        BoxPlotLeftAxisDirective,
        BoxPlotWhiskerDirective,
        BoxPlotUpperAntennaDirective,
        BoxPlotLowerAntennaDirective,
        BoxPlotBoxDirective,
        BoxPlotMedianDirective,
        BoxPlotOutlierDirective,
        BoxPlotBrushSelectorDirective,
        BoxPlotOutlierTooltipDirective,
        ...components
    ]
})
export class DgpBoxPlotModule {
}
