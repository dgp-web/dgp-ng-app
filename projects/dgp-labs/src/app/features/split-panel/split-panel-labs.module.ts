import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SplitPanelLabsPageComponent } from "./containers/split-panel-labs-page.component";
import { DgpSplitPanelModule } from "dgp-ng-docking-layout";
import { DgpHamburgerMenuToggleModule, DgpInputModule, DgpInspectorModule, DgpPageHeaderModule, DgpThemeSwitcherModule } from "dgp-ng-app";
import { RouterModule } from "@angular/router";
import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatCardModule } from "@angular/material/card";
import { DgpDraggableModule } from "../../../../../dgp-ng-drag-and-drop/src/lib/draggable/draggable.module";
import { DgpDropzoneModule } from "../../../../../dgp-ng-drag-and-drop/src/lib/drop-zone/dropzone.module";
import { DgpDragAndDropModule } from "../../../../../dgp-ng-drag-and-drop/src/lib/data/drag-and-drop.module";

@NgModule({
    imports: [
        CommonModule,
        DgpSplitPanelModule,
        DgpThemeSwitcherModule,
        RouterModule.forRoot([{
            path: "split-panel",
            component: SplitPanelLabsPageComponent
        }], {relativeLinkResolution: "legacy"}),
        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule,
        DragDropModule,
        MatCardModule,
        DgpSplitPanelModule,
        DgpDraggableModule,
        DgpDropzoneModule,
        DgpDragAndDropModule,
        DgpInputModule,
        DgpInspectorModule
    ],
    declarations: [
        SplitPanelLabsPageComponent
    ]
})
export class SplitPanelLabsModule {
}
