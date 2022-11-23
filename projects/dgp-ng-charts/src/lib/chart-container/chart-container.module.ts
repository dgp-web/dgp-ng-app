import { NgModule } from "@angular/core";
import { ChartContainerComponent } from "./components/chart-container.component";
import { CommonModule } from "@angular/common";
import { MatLegacyCardModule as MatCardModule } from "@angular/material/legacy-card";
import { A11yModule } from "@angular/cdk/a11y";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { MatLegacyMenuModule as MatMenuModule } from "@angular/material/legacy-menu";
import { MatIconModule } from "@angular/material/icon";
import { MatLegacyTooltipModule as MatTooltipModule } from "@angular/material/legacy-tooltip";

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
