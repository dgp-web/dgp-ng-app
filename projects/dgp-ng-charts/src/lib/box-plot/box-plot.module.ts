import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoxPlotComponent } from "./components/box-plot.component";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatDialogModule } from "@angular/material/dialog";
import { DgpChartContainerModule } from "../chart-container/chart-container.module";
import { BoxPlotNgComponent } from "./components/box-plot-ng.component";
import { BoxPlotBottomAxisDirective } from "./directives/box-plot-bottom-axis.directive";

@NgModule({
    imports: [
        CommonModule,
        DgpChartContainerModule,
        MatButtonModule,
        MatTooltipModule,
        MatIconModule,
        MatDialogModule
    ],
    declarations: [
        BoxPlotComponent,
        BoxPlotNgComponent,
        BoxPlotBottomAxisDirective
    ],
    exports: [
        BoxPlotComponent,
        BoxPlotNgComponent,
        BoxPlotBottomAxisDirective
    ]
})
export class DgpBoxPlotModule {
}
