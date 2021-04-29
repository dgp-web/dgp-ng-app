import { NgModule } from "@angular/core";
import { DgpPageHeaderContextActionsComponent } from "./containers/page-header-context-actions.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        MatToolbarModule,
        CommonModule
    ],
    declarations: [
        DgpPageHeaderContextActionsComponent
    ],
    exports: [
        DgpPageHeaderContextActionsComponent
    ]
})
export class DgpPageHeaderContextActionsModule {
}
