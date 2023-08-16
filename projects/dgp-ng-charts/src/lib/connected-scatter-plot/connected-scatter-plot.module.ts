import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpChartModule } from "../chart/chart.module";
import { directives } from "./directives/directives";
import { DgpResizeSensorModule } from "dgp-ng-app";
import { CommonModule } from "@angular/common";
import { DgpSVGSymbolsModule } from "../shapes/svg-shape.module";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { pipes } from "./pipes/pipes";
import { DgpPlotContainerModule } from "../plot-container/dgp-plot-container.module";
import { DgpDotModule } from "../dot/dot.module";

@NgModule({
    imports: [
        DgpChartModule,
        DgpResizeSensorModule,
        CommonModule,
        DgpSVGSymbolsModule,
        MatTooltipModule,
        DgpPlotContainerModule,
        DgpDotModule
    ],
    declarations: [
        ...components,
        ...directives,
        ...pipes
    ],
    exports: [
        ...components,
        ...directives,
        ...pipes
    ]
})
export class DgpConnectedScatterPlotModule {
}
