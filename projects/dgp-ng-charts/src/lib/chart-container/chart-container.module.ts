import { NgModule } from "@angular/core";
import { ChartContainerComponent } from "./components/chart-container.component";
import { CommonModule } from "@angular/common";
import { MatCardModule } from "@angular/material/card";
import { A11yModule } from "@angular/cdk/a11y";
import { MatButtonModule } from "@angular/material/button";
import { MatMenuModule } from "@angular/material/menu";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";

@NgModule({
    imports: [
        CommonModule,
        MatCardModule,
        A11yModule,
        MatButtonModule,
        MatMenuModule,
        MatIconModule,
        MatTooltipModule
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
