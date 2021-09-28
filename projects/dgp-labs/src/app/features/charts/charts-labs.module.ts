import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule } from "dgp-ng-app";
import { ChartsLabsComponent } from "./containers/charts-labs.component";
import {
    DgpBarChartModule,
    DgpBoxPlotModule,
    DgpFillPatternSelectModule,
    DgpHeatmapModule,
    DgpShapeSelectModule,
    DgpConnectedScatterPlotModule
} from "dgp-ng-charts";
import { DocsModule } from "dgp-ng-docs";

@NgModule({
    imports: [
        RouterModule.forRoot([{
            path: "charts",
            component: ChartsLabsComponent
        }], {relativeLinkResolution: "legacy"}),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DocsModule,
        DgpFillPatternSelectModule,
        DgpShapeSelectModule,
        DgpBarChartModule,
        DgpBoxPlotModule,
        DgpHeatmapModule,
        DgpConnectedScatterPlotModule
    ],
    declarations: [
        ChartsLabsComponent
    ]
})
export class ChartsLabsModule {
}
