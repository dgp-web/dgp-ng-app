import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { ChartsLabsComponent } from "./containers/charts-labs.component";
import { BarChartLabsComponent } from "./containers/bar-chart-labs.component";
import { BoxPlotLabsComponent } from "./containers/box-plot-labs.component";
import { ConnectedScatterPlotLabsComponent } from "./containers/connected-scatter-plot-labs.component";
import { HeatmapLabsComponent } from "./containers/heatmap-labs.component";
import { ShapesAndPatternLabsComponent } from "./containers/shapes-and-pattern-labs.component";
import { ChartsLabsCoreModule } from "./charts-labs-core.module";

@NgModule({
    imports: [
        ChartsLabsCoreModule,

        RouterModule.forRoot([{
            path: "charts/overview",
            component: ChartsLabsComponent
        }, {
            path: "charts/shapes-and-patterns",
            component: ShapesAndPatternLabsComponent
        }, {
            path: "charts/bar-chart",
            component: BarChartLabsComponent
        }, {
            path: "charts/box-plot",
            component: BoxPlotLabsComponent
        }, {
            path: "charts/connected-scatter-plot",
            component: ConnectedScatterPlotLabsComponent
        }, {
            path: "charts/heatmap",
            component: HeatmapLabsComponent
        }])
    ]
})
export class ChartsLabsModule {
}
