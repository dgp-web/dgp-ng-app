import { NgModule } from "@angular/core";
import { PageHeaderComponent } from "./page-header.component";
import { MatLegacyProgressBarModule as MatProgressBarModule } from "@angular/material/legacy-progress-bar";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        MatToolbarModule,
        MatProgressBarModule
    ],
    declarations: [
        PageHeaderComponent
    ],
    exports: [
        PageHeaderComponent
    ],
    providers: []
})
export class DgpPageHeaderModule {
}
