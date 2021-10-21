import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpChartModule } from "../chart/chart.module";
import { directives } from "./directives/directives";
import { DgpResizeSensorModule } from "dgp-ng-app";
import { CommonModule } from "@angular/common";
import { DgpSVGSymbolsModule } from "../shapes/svg-shape.module";

@NgModule({
    imports: [
        DgpChartModule,
        DgpResizeSensorModule,
        CommonModule,
        DgpSVGSymbolsModule
    ],
    declarations: [
        ...components,
        ...directives
    ],
    exports: [
        ...components,
        ...directives
    ]
})
export class DgpConnectedScatterPlotModule {
}
