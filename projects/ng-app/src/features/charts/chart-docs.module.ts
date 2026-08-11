import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ConnectedScatterPlotDocsComponent } from "./components/connected-scatter-plot-docs.component";
import { BoxPlotDocsComponent } from "./components/box-plot-docs.component";
import { BarChartDocsComponent } from "./components/bar-chart-docs.component";
import { HeatmapDocsComponent } from "./components/heatmap-docs.component";
import { ShapeDocsComponent } from "./components/shape-docs.component";
import { FillPatternDocsComponent } from "./components/fill-pattern-docs.component";
import { ChartDocsCoreModule } from "./chart-docs-core.module";

@NgModule({
    imports: [
        ChartDocsCoreModule,

        RouterModule.forChild([{
            path: "charts/bar-chart",
            component: BarChartDocsComponent
        }, {
            path: "charts/box-plot",
            component: BoxPlotDocsComponent
        }, {
            path: "charts/connected-scatter-plot",
            component: ConnectedScatterPlotDocsComponent
        }, {
            path: "charts/fill-patterns",
            component: FillPatternDocsComponent
        }, {
            path: "charts/heatmap",
            component: HeatmapDocsComponent
        }, {
            path: "charts/shapes",
            component: ShapeDocsComponent
        }]),

    ]
})
export class ChartDocsModule {
}
