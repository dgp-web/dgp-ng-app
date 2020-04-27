import { NgModule } from "@angular/core";
import { SplitPanelItemComponent } from "./split-panel-item.component";
import { SplitPanelContentComponent } from "./split-panel-content.component";
import { CommonModule } from "@angular/common";
import { SplitPanelComponent } from "./split-panel.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SplitPanelItemComponent,
        SplitPanelContentComponent,
        SplitPanelComponent
    ],
    exports: [
        SplitPanelItemComponent,
        SplitPanelContentComponent,
        SplitPanelComponent
    ]
})
export class DgpSplitPanelModule {
}
