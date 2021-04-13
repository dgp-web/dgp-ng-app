import { NgModule } from "@angular/core";
import { ChartContainerComponent } from "./components/chart-container.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { A11yModule } from "@angular/cdk/a11y";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        A11yModule
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
