import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { HeatmapComponent } from "./components/heatmap.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        HeatmapComponent
    ],
    exports: [
        HeatmapComponent
    ]
})
export class DgpHeatmapModule {
}
