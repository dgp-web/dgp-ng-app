import { NgModule } from "@angular/core";
import { components } from "./components/components";
import { RouterModule } from "@angular/router";
import { ConnectedScatterPlotDocsComponent } from "./components/connected-scatter-plot-docs.component";
import { BoxPlotDocsComponent } from "./components/box-plot-docs.component";
import { BarChartDocsComponent } from "./components/bar-chart-docs.component";
import { HeatmapDocsComponent, IntegerOnlyDirective } from "./components/heatmap-docs.component";
import { ShapeDocsComponent } from "./components/shape-docs.component";
import { FillPatternDocsComponent } from "./components/fill-pattern-docs.component";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpDetailsModule, DgpInspectorModule } from "dgp-ng-app";
import { DgpHeatmapModule } from "dgp-ng-charts";
import { DocsPageModule } from "../shared";
import { MatError, MatFormField, MatHint, MatInput } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatRadioButton, MatRadioGroup } from "@angular/material/radio";
import { JsonPipe, NgIf } from "@angular/common";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "charts/bar-chart",
            component: BarChartDocsComponent
        }, {
            path: "charts/box-plot",
            component: BoxPlotDocsComponent
        }, {
            path: "charts/connected-scatter-plot",
            component: ConnectedScatterPlotDocsComponent
        }, {
            path: "charts/fill-patterns",
            component: FillPatternDocsComponent
        }, {
            path: "charts/heatmap",
            component: HeatmapDocsComponent
        }, {
            path: "charts/shapes",
            component: ShapeDocsComponent
        }]),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DocsPageModule,
        DgpHeatmapModule,
        DgpDetailsModule,
        MatFormField,
        MatInput,
        FormsModule,
        DgpInspectorModule,
        MatRadioGroup,
        MatRadioButton,
        IntegerOnlyDirective,
        MatError,
        NgIf,
        JsonPipe,
        MatIcon,
        MatTooltip,
        MatHint
    ],
    declarations: [
        ...components
    ]
})
export class ChartDocsModule {
}
