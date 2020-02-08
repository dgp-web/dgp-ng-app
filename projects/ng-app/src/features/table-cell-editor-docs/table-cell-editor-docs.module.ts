import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../shared";
import { TableCellEditorDocsPageComponent } from "./containers";
import { DgpTableCellModule } from "dgp-ng-app";
import { MatFormFieldModule, MatInputModule, MatSlideToggleModule } from "@angular/material";
import { FormsModule } from "@angular/forms";

@NgModule({
    imports: [
        RouterModule.forChild([{
            path: "table-cell-editor",
            component: TableCellEditorDocsPageComponent
        }]),
        DocsPageModule,
        DgpTableCellModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        MatSlideToggleModule
    ],
    declarations: [
        TableCellEditorDocsPageComponent
    ]
})
export class TableCellEditorDocsModule {
}
