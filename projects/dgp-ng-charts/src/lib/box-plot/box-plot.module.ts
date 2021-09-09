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

@NgModule({
    imports: [
        CommonModule,
        DgpChartContainerModule,
        DgpChartModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatDialogModule,
        MatMenuModule
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
