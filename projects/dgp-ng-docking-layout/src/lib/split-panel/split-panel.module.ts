import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { ComponentRegistry, DockingLayoutService } from "../custom-goldenlayout";
import { SplitPanelContentComponent } from "./split-panel-content.component";
import { SplitPanelComponent } from "./split-panel.component";
import { DgpResizeSensorModule } from "dgp-ng-app";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        DgpResizeSensorModule
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
