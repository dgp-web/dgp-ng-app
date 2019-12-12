import { NgModule } from "@angular/core";
import * as mat from "@angular/material";
import { CommonModule } from "@angular/common";
import { DgpTableCelLEditorDirective } from "./directives/table-cell-editor.directive";
import { DgpTableCellComponent } from "./components/table-cell.component";

@NgModule({
    imports: [
        CommonModule,
        mat.MatButtonModule,
        mat.MatDialogModule
    ],
    declarations: [
        DgpTableCellComponent,
        DgpTableCelLEditorDirective
    ],
    exports: [
        DgpTableCellComponent,
        DgpTableCelLEditorDirective
    ]
})
export class DgpTableCellModule {
}
