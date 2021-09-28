import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpChartModule } from "../chart/chart.module";
import { directives } from "./directives/directives";
import { DgpResizeSensorModule } from "dgp-ng-app";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        DgpChartModule,
        DgpResizeSensorModule,
        CommonModule
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
