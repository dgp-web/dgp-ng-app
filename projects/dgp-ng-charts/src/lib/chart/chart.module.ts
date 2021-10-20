import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { CommonModule } from "@angular/common";
import { directives } from "./directives/directives";
import { DgpResizeSensorModule, DgpNegatePipeModule } from "dgp-ng-app";

@NgModule({
    imports: [
        CommonModule,
        DgpResizeSensorModule,
        DgpNegatePipeModule
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
