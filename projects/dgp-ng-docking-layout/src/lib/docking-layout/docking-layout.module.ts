import { NgModule } from "@angular/core";
import { DockingLayoutComponent } from "./components/docking-layout.component";
import { DockingLayoutItemComponent } from "./components/docking-layout-item.component";
import { DockingLayoutContainerComponent } from "./components/docking-layout-container.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule
    ],
    declarations: [
        DockingLayoutContainerComponent,
        DockingLayoutItemComponent,
        DockingLayoutComponent
    ],
    exports: [
        DockingLayoutContainerComponent,
        DockingLayoutItemComponent,
        DockingLayoutComponent
    ]
})
export class DgpDockingLayoutModule {
}
