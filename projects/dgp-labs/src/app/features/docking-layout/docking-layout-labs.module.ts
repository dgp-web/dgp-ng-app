import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { DockingLayoutLabsPageComponent } from "./containers/docking-layout-labs-page.component";
import { DgpDockingLayoutModule } from "dgp-ng-docking-layout";
import {
    DgpEmptyStateModule,
    DgpHamburgerMenuToggleModule,
    DgpInputFieldModule,
    DgpPageHeaderModule,
    DgpThemeSwitcherModule
} from "dgp-ng-app";
import { RouterModule } from "@angular/router";
import { DgpTileModule } from "../../../../../dgp-ng-app/src/tile/tile.module";
import { CommonModule } from "@angular/common";
import { DgpInspectorModule } from "../../../../../dgp-ng-app/src/inspector/inspector.module";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ScrollingModule as ExperimentalScrollingModule } from "@angular/cdk-experimental/scrolling";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        CommonModule,
        DgpDockingLayoutModule,
        DgpThemeSwitcherModule,
        RouterModule.forRoot([{
            path: "docking-layout",
            component: DockingLayoutLabsPageComponent
        }], {relativeLinkResolution: "legacy"}),
        DgpPageHeaderModule,
        DgpHamburgerMenuToggleModule,
        DgpTileModule,
        DgpInspectorModule,
        ScrollingModule,
        ExperimentalScrollingModule,
        DgpInputFieldModule,
        FormsModule,
        DgpEmptyStateModule
    ],
    declarations: [
        DockingLayoutLabsPageComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DockingLayoutLabsModule {
}
