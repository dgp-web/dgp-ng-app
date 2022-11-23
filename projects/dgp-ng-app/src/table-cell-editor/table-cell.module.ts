import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { DgpTableCelLEditorDirective } from "./directives/table-cell-editor.directive";
import { DgpTableCellComponent } from "./components/table-cell.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

@NgModule({
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule
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
