import { NgModule } from "@angular/core";
import { DgpNgDockingLayoutComponent } from "./dgp-ng-docking-layout.component";
import { DockingLayoutModule } from "./docking-layout";

@NgModule({
    declarations: [DgpNgDockingLayoutComponent],
    imports: [
        DockingLayoutModule
    ],
    exports: [DgpNgDockingLayoutComponent]
})
export class DgpNgDockingLayoutModule {
}
