import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule } from "dgp-ng-app";
import { ChartsLabsComponent } from "./containers/charts-labs.component";
import { DgpNgChartsModule } from "dgp-ng-charts";

@NgModule({
    imports: [
        RouterModule.forRoot([{
        path: "charts",
        component: ChartsLabsComponent
    }], { relativeLinkResolution: 'legacy' }),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DgpNgChartsModule
    ],
    declarations: [
        ChartsLabsComponent
    ]
})
export class ChartsLabsModule {
}
