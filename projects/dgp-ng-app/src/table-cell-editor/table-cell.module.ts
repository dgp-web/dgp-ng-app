import { NgModule } from "@angular/core";
import * as mat from "@angular/material";
import * as components from "./components";
import * as directives from "./directives";
import { CommonModule } from "@angular/common";

@NgModule({
    imports: [
        CommonModule,
        mat.MatButtonModule,
        mat.MatDialogModule
    ],
    declarations: [
        components.DgpTableCellComponent,
        directives.DgpTableCelLEditorDirective
    ],
    exports: [
        components.DgpTableCellComponent,
        directives.DgpTableCelLEditorDirective
    ]
})
export class DgpTableCellModule {
}
