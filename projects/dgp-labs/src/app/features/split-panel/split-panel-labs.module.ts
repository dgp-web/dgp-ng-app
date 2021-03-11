import { NgModule } from "@angular/core";
import { SplitPanelLabsPageComponent } from "./containers/split-panel-labs-page.component";
import { DgpSplitPanelModule } from "dgp-ng-docking-layout";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpThemeSwitcherModule } from "dgp-ng-app";
import { RouterModule } from "@angular/router";

@NgModule({
    imports: [
        DgpSplitPanelModule,
        DgpThemeSwitcherModule,
        RouterModule.forRoot([{
        path: "split-panel",
        component: SplitPanelLabsPageComponent
    }], { relativeLinkResolution: 'legacy' }),
        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule
    ],
    declarations: [
        SplitPanelLabsPageComponent
    ]
})
export class SplitPanelLabsModule {
}
