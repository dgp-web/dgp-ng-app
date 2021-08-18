import { NgModule } from "@angular/core";
import { DockingLayoutLabsPageComponent } from "./containers/docking-layout-labs-page.component";
import { DgpDockingLayoutModule } from "dgp-ng-docking-layout";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule, DgpThemeSwitcherModule } from "dgp-ng-app";
import { RouterModule } from "@angular/router";
import { DgpTileModule } from "../../../../../dgp-ng-app/src/tile/tile.module";
import { CommonModule } from "@angular/common";
import { DgpInspectorModule } from "../../../../../dgp-ng-app/src/inspector/inspector.module";

@NgModule({
    imports: [
        CommonModule,
        DgpDockingLayoutModule,
        DgpThemeSwitcherModule,
        RouterModule.forRoot([{
            path: "docking-layout",
            component: DockingLayoutLabsPageComponent
        }], {relativeLinkResolution: 'legacy'}),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DgpTileModule,
        DgpInspectorModule
    ],
    declarations: [
        DockingLayoutLabsPageComponent
    ]
})
export class DockingLayoutLabsModule {
}
