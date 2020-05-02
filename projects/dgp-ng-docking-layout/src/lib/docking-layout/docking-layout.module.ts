import { NgModule } from "@angular/core";
import { DockingLayoutService, ItemContainer, RowOrColumnComponent, StackComponent } from "../custom-goldenlayout";
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
        DockingLayoutComponent,
        RowOrColumnComponent,
        StackComponent,
        ItemContainer
    ],
    exports: [
        DockingLayoutContainerComponent,
        DockingLayoutItemComponent,
        DockingLayoutComponent,
        RowOrColumnComponent,
        StackComponent,
        ItemContainer
    ],
    providers: [
        DockingLayoutService
    ]
})
export class DgpDockingLayoutModule {
}
