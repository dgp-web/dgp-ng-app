import { NgModule } from "@angular/core";
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
    ]
})
export class DgpSplitPanelModule {
}
