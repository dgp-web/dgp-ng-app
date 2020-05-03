import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ItemContainerComponent } from "../custom-goldenlayout/components/item-container/item-container.component";
import { RowOrColumnComponent } from "../custom-goldenlayout/components/row-or-column/row-or-column.component";
import { StackComponent } from "../custom-goldenlayout/components/stack/stack.component";
import { DockingLayoutService } from "../custom-goldenlayout/docking-layout.service";
import { DockingLayoutContainerComponent } from "./components/docking-layout-container.component";
import { DockingLayoutItemComponent } from "./components/docking-layout-item.component";
import { DockingLayoutComponent } from "./components/docking-layout.component";

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
        ItemContainerComponent
    ],
    exports: [
        DockingLayoutContainerComponent,
        DockingLayoutItemComponent,
        DockingLayoutComponent,
        RowOrColumnComponent,
        StackComponent,
        ItemContainerComponent
    ],
    providers: [
        DockingLayoutService
    ]
})
export class DgpDockingLayoutModule {
}
