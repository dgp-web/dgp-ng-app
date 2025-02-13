import { NgModule } from "@angular/core";
import { TableLabsPageComponent } from "./containers/table-labs-page.component";
import { RouterModule } from "@angular/router";
import { DgpHamburgerMenuToggleModule, DgpPageHeaderModule } from "dgp-ng-app";

@NgModule({
    imports: [
        RouterModule.forRoot([{
            path: "editable-table",
            component: TableLabsPageComponent
        }]),
        DgpHamburgerMenuToggleModule,
        DgpPageHeaderModule,
    ],
    declarations: [
        TableLabsPageComponent
    ],
    exports: [
        TableLabsPageComponent
    ],
    providers: []
})
export class TableLabsModule {
}
