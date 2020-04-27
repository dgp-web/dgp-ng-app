import { NgModule } from "@angular/core";
import { SplitPanelContentComponent } from "./split-panel-content.component";
import { CommonModule } from "@angular/common";
import { SplitPanelComponent } from "./split-panel.component";

@NgModule({
    imports: [
        CommonModule
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
