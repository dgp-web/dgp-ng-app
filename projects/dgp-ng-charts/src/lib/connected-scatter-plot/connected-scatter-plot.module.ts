import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpChartModule } from "../chart/chart.module";
import { directives } from "./directives/directives";

@NgModule({
    imports: [
        DgpChartModule
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
