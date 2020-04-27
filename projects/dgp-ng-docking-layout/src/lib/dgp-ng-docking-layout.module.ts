import { NgModule } from "@angular/core";
import { DgpNgDockingLayoutComponent } from "./dgp-ng-docking-layout.component";
import { DockingLayoutModule } from "./docking-layout";
import { CommonModule } from "@angular/common";

@NgModule({
    declarations: [DgpNgDockingLayoutComponent],
    imports: [
        DockingLayoutModule,
        CommonModule
    ],
    exports: [DgpNgDockingLayoutComponent]
})
export class DgpNgDockingLayoutModule {
}
