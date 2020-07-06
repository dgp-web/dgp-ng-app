import { NgModule } from "@angular/core";
import { DgpBoxPlotModule } from "./box-plot/box-plot.module";
import { LineChartComponent } from "./line-chart/line-chart.component";

@NgModule({
    imports: [
        DgpBoxPlotModule
    ],
    declarations: [
        LineChartComponent
    ],
    exports: [
        LineChartComponent,
        DgpBoxPlotModule
    ]
})
export class DgpNgChartsModule {
}
