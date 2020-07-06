import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoxPlotComponent } from "./components/box-plot.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        BoxPlotComponent
    ],
    exports: [
        BoxPlotComponent
    ]
})
export class DgpBoxPlotModule {
}
