import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { DgpChartContainerModule } from "../chart-container/chart-container.module";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { components } from "./components/components";
import { directives } from "./directives/directives";
import { DgpChartModule } from "../chart/chart.module";
import { DgpResizeSensorModule } from "dgp-ng-app";
import { DgpSVGPatternsModule } from "../patterns/svg-patterns.module";
import { DgpSVGMasksModule } from "../masks/svg-masks.module";
import { DgpSVGSymbolsModule } from "../shapes/svg-shape.module";
import { pipes } from "./pipes/pipes";
import { DgpPlotContainerModule } from "../plot-container/dgp-plot-container.module";
import { DgpDotModule } from "../dot/dot.module";
import { DgpPatternAndMaskDefsModule } from "../pattern-and-mask-defs/pattern-and-mask-defs.module";

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
        DgpSVGSymbolsModule,
        DgpPlotContainerModule,
        DgpDotModule,
        DgpPatternAndMaskDefsModule
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
export class DgpBoxPlotModule {
}
