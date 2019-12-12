import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { VirtualListItemDirective } from "./directives/virtual-list-item.directive";
import { VirtualListPanelComponent } from "./components/virtual-list-panel.component";

@NgModule({
    imports: [
        CommonModule,
        ScrollingModule
    ],
    declarations: [
        VirtualListPanelComponent,
        VirtualListItemDirective
    ],
    exports: [
        VirtualListPanelComponent,
        VirtualListItemDirective
    ]
})
export class DgpVirtualListPanelModule {
}
