import { NgModule } from "@angular/core";
import { PageHeaderComponent } from "./page-header.component";
import { MatProgressBarModule } from "@angular/material/progress-bar";
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
