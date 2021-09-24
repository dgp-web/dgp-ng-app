import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { DgpChartContainerModule } from "../chart-container/chart-container.module";
import { MatMenuModule } from "@angular/material/menu";
import { components } from "./components/components";
import { directives } from "./directives/directives";
import { DgpChartModule } from "../chart/chart.module";
import { DgpResizeSensorModule } from "dgp-ng-app";
import { DgpSVGPatternsModule } from "../patterns/svg-patterns.module";
import { DgpSVGMasksModule } from "../masks/svg-masks.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from "@angular/material/select";
import { FormsModule } from "@angular/forms";
import { DgpFillPatternIconModule } from "../fill-pattern-icon/fill-pattern-icon.module";

@NgModule({
    imports: [
        CommonModule,
        DgpChartContainerModule,
        DgpChartModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatDialogModule,
        MatMenuModule,
        DgpResizeSensorModule,
        DgpSVGPatternsModule,
        DgpSVGMasksModule,
        MatFormFieldModule,
        MatSelectModule,
        FormsModule,
        DgpFillPatternIconModule
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
export class DgpBoxPlotModule {
}
