import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DgpBoxPlotModule } from "./box-plot/box-plot.module";
import { DgpHeatmapModule } from "./heatmap/heatmap.module";
import { LineChartComponent } from "./line-chart/line-chart.component";

@NgModule({
    imports: [
        CommonModule,
        DgpBoxPlotModule,
        DgpHeatmapModule
    ],
    declarations: [
        LineChartComponent,
    ],
    exports: [
        LineChartComponent,
        DgpBoxPlotModule,
        DgpHeatmapModule
    ]
})
export class DgpNgChartsModule {
}
