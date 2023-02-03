import { NgModule } from "@angular/core";
import { DgpHamburgerMenuToggleModule, DgpInspectorModule, DgpPageHeaderModule } from "dgp-ng-app";
import {
    DgpBarChartModule,
    DgpBoxPlotModule,
    DgpConnectedScatterPlotModule,
    DgpFillPatternIconModule,
    DgpFillPatternSelectModule,
    DgpHeatmapModule,
    DgpShapeSelectModule,
    DgpSVGSymbolsModule
} from "dgp-ng-charts";
import { DocsModule } from "dgp-ng-docs";
import { containers } from "./containers/containers";
import { DgpSplitPanelModule } from "dgp-ng-docking-layout";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatSelectModule } from "@angular/material/select";
import { CommonModule } from "@angular/common";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { components } from "./components/components";

@NgModule({
    imports: [
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DocsModule,
        DgpFillPatternSelectModule,
        DgpShapeSelectModule,
        DgpBarChartModule,
        DgpBoxPlotModule,
        DgpHeatmapModule,
        DgpConnectedScatterPlotModule,
        DgpSplitPanelModule,
        DgpInspectorModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSelectModule,
        CommonModule,
        DgpSVGSymbolsModule,
        DgpFillPatternIconModule,
        MatSlideToggleModule
    ],
    declarations: [
        ...components,
        ...containers
    ],
    exports: [
        ...components,
        ...containers
    ]
})
export class ChartsLabsCoreModule {
}
