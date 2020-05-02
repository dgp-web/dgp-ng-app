import { NgModule } from "@angular/core";
import { DockingLayoutService } from "../custom-goldenlayout";
import { SplitPanelContentComponent } from "./split-panel-content.component";
import { CommonModule } from "@angular/common";
import { SplitPanelComponent } from "./split-panel.component";
import { MatCardModule } from "@angular/material/card";

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
        DockingLayoutService
    ]
})
export class DgpSplitPanelModule {
}
