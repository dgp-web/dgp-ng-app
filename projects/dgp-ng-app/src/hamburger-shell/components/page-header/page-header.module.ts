import { NgModule } from "@angular/core";
import { PageHeaderComponent } from "./page-header.component";
import { MatProgressBarModule, MatToolbarModule } from "@angular/material";
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
