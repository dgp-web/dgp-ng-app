import { NgModule } from "@angular/core";
import { ChartContainerComponent } from "./components/chart-container.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule
    ],
    declarations: [
        ChartContainerComponent
    ],
    exports: [
        ChartContainerComponent
    ]
})
export class DgpChartContainerModule {
}
