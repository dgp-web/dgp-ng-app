import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { ComponentRegistry, DockingLayoutService } from "../custom-goldenlayout";
import { SplitPanelContentComponent } from "./split-panel-content.component";
import { SplitPanelComponent } from "./split-panel.component";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule
    ],
    declarations: [
        SplitPanelContentComponent,
        SplitPanelComponent
    ],
    exports: [
        SplitPanelContentComponent,
        SplitPanelComponent
    ],
    providers: [
        DockingLayoutService,
        ComponentRegistry
    ]
})
export class DgpSplitPanelModule {
}
