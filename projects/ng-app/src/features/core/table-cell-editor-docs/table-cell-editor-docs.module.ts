import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { DocsPageModule } from "../../shared";
import { TableCellEditorDocsPageComponent } from "./containers";
import { DgpTableCellModule } from "dgp-ng-app";
import { MatLegacyFormFieldModule as MatFormFieldModule } from "@angular/material/legacy-form-field";
import { MatLegacyInputModule as MatInputModule } from "@angular/material/legacy-input";
import { MatLegacySlideToggleModule as MatSlideToggleModule } from "@angular/material/legacy-slide-toggle";
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
