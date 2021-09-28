import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { DgpChartModule } from "../chart/chart.module";

@NgModule({
    imports: [
        DgpChartModule
    ],
    declarations: [
        ...components
    ],
    exports: [
        ...components
    ]
})
export class DgpConnectedScatterPlotModule {
}
