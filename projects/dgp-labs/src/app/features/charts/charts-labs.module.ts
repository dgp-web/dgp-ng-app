import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DgpHamburgerMenuToggleModule, DgpInspectorModule, DgpPageHeaderModule } from "dgp-ng-app";
import { ChartsLabsComponent } from "./containers/charts-labs.component";
import {
    DgpBarChartModule,
    DgpBoxPlotModule,
    DgpConnectedScatterPlotModule, DgpFillPatternIconModule,
    DgpFillPatternSelectModule,
    DgpHeatmapModule,
    DgpShapeSelectModule
} from "dgp-ng-charts";
import { DocsModule } from "dgp-ng-docs";
import { containers } from "./containers/containers";
import { BarChartLabsComponent } from "./containers/bar-chart-labs.component";
import { BoxPlotLabsComponent } from "./containers/box-plot-labs.component";
import { ConnectedScatterPlotLabsComponent } from "./containers/connected-scatter-plot-labs.component";
import { HeatmapLabsComponent } from "./containers/heatmap-labs.component";
import { DgpSplitPanelModule } from "dgp-ng-docking-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { ShapesAndPatternLabsComponent } from "./containers/shapes-and-pattern-labs.component";
import { DgpSVGSymbolsModule } from "../../../../../dgp-ng-charts/src/lib/symbols/svg-symbol.module";

@NgModule({
    imports: [
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
        }], {relativeLinkResolution: "legacy"}),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DocsModule,
        DgpFillPatternSelectModule,
        DgpShapeSelectModule,
        DgpBarChartModule,
        DgpBoxPlotModule,
        DgpHeatmapModule,
        DgpConnectedScatterPlotModule,
        DgpSplitPanelModule,
        DgpInspectorModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        CommonModule,
        DgpSVGSymbolsModule,
        DgpFillPatternIconModule
    ],
    declarations: [
        ...containers
    ]
})
export class ChartsLabsModule {
}
