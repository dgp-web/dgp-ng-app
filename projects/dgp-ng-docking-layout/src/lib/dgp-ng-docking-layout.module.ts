import { NgModule } from "@angular/core";
import { DgpNgDockingLayoutComponent } from "./dgp-ng-docking-layout.component";
import { DgpDockingLayoutModule } from "./docking-layout";
import { CommonModule } from "@angular/common";
import { DgpSplitPanelModule } from "./split-panel/split-panel.module";

@NgModule({
    declarations: [
        DgpNgDockingLayoutComponent
    ],
    imports: [
        CommonModule,
        DgpSplitPanelModule,
        DgpDockingLayoutModule
    ],
    exports: [
        DgpNgDockingLayoutComponent
    ]
})
export class DgpNgDockingLayoutModule {
}
