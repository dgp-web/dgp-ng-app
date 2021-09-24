import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule } from "dgp-ng-app";
import { ChartsLabsComponent } from "./containers/charts-labs.component";
import { DgpNgChartsModule } from "dgp-ng-charts";
import { DocsModule } from "dgp-ng-docs";
import { DgpFillPatternSelectModule } from "../../../../../dgp-ng-charts/src/lib/fill-pattern-select/fill-pattern-select.module";

@NgModule({
    imports: [
        RouterModule.forRoot([{
            path: "charts",
            component: ChartsLabsComponent
        }], {relativeLinkResolution: "legacy"}),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DgpNgChartsModule,
        DocsModule,
        DgpFillPatternSelectModule
    ],
    declarations: [
        ChartsLabsComponent
    ]
})
export class ChartsLabsModule {
}
