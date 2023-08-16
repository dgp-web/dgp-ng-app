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
import { DgpDockingLayoutModule, DgpSplitPanelModule } from "dgp-ng-docking-layout";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { FormsModule } from "@angular/forms";
import { MatLegacySelectModule as MatSelectModule } from "@angular/material/legacy-select";
import { CommonModule } from "@angular/common";
import { MatLegacySlideToggleModule as MatSlideToggleModule } from "@angular/material/legacy-slide-toggle";
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
        MatSlideToggleModule,
        DgpDockingLayoutModule
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
