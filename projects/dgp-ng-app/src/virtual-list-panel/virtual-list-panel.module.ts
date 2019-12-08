import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { DgpEmptyStateModule } from "../empty-state";
import * as components from "./components";
import * as directives from "./directives";

@NgModule({
    imports: [
        CommonModule,
        DgpEmptyStateModule,
        ScrollingModule
    ],
    declarations: [
        components.VirtualListPanelComponent,
        directives.VirtualListItemDirective
    ],
    exports: [
        components.VirtualListPanelComponent,
        directives.VirtualListItemDirective
    ]
})
export class DgpVirtualListPanelModule {
}
