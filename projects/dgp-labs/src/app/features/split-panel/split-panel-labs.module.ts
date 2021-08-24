import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SplitPanelLabsPageComponent } from "./containers/split-panel-labs-page.component";
import { DgpSplitPanelModule } from "dgp-ng-docking-layout";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpThemeSwitcherModule } from "dgp-ng-app";
import { RouterModule } from "@angular/router";
import { DragDropModule } from "@angular/cdk/drag-drop";

@NgModule({
    imports: [
        CommonModule,
        DgpSplitPanelModule,
        DgpThemeSwitcherModule,
        RouterModule.forRoot([{
            path: "split-panel",
            component: SplitPanelLabsPageComponent
        }], {relativeLinkResolution: 'legacy'}),
        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule,
        DragDropModule
    ],
    declarations: [
        SplitPanelLabsPageComponent
    ]
})
export class SplitPanelLabsModule {
}
