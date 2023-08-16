import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DgpTableCelLEditorDirective } from "./directives/table-cell-editor.directive";
import { DgpTableCellComponent } from "./components/table-cell.component";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
import { DgpCloseTableCellEditorDirective } from "./directives/close-table-cell-editor.directive";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule
    ],
    declarations: [
        DgpTableCellComponent,
        DgpTableCelLEditorDirective,
        DgpCloseTableCellEditorDirective
    ],
    exports: [
        DgpTableCellComponent,
        DgpTableCelLEditorDirective,
        DgpCloseTableCellEditorDirective
    ]
})
export class DgpTableCellModule {
}
