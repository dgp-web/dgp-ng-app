import { NgModule } from "@angular/core";
import { DgpNgDockingLayoutComponent } from "./dgp-ng-docking-layout.component";
import { DockingLayoutModule } from "./docking-layout";
import { CommonModule } from "@angular/common";
import { DgpSplitPanelModule } from "./split-panel/split-panel.module";

@NgModule({
    declarations: [DgpNgDockingLayoutComponent],
    imports: [
        DockingLayoutModule,
        CommonModule,
        DgpSplitPanelModule
    ],
    exports: [DgpNgDockingLayoutComponent]
})
export class DgpNgDockingLayoutModule {
}
