import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { RouterModule } from "@angular/router";
import { ConnectedScatterPlotDocsComponent } from "./components/connected-scatter-plot-docs.component";
import { BoxPlotDocsComponent } from "./components/box-plot-docs.component";
import { BarChartDocsComponent } from "./components/bar-chart-docs.component";
import { HeatmapDocsComponent } from "./components/heatmap-docs.component";
import { ShapeDocsComponent } from "./components/shape-docs.component";
import { FillPatternDocsComponent } from "./components/fill-pattern-docs.component";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule } from "dgp-ng-app";
import { DocsPageModule } from "../shared";
import { DgpBoxPlotModule } from "dgp-ng-charts";

@NgModule({
    imports: [
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
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DocsPageModule,
        DgpBoxPlotModule
    ],
    declarations: [
        ...components
    ]
})
export class ChartDocsModule {
}
