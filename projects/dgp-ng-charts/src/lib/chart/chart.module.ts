import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { directives } from "./directives/directives";
import { DgpNegatePipeModule, DgpResizeSensorModule, SafePipeModule } from "dgp-ng-app";
import { DgpPlotContainerModule } from "../plot-container/dgp-plot-container.module";

@NgModule({
    imports: [
        CommonModule,
        DgpResizeSensorModule,
        DgpNegatePipeModule,
        DgpPlotContainerModule,
        SafePipeModule
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
export class DgpChartModule {
}
