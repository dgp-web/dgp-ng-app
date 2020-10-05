import { NgModule } from "@angular/core";
import { DgpConfirmDialogComponent } from "./containers/confirm-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";

@NgModule({
    imports: [
        MatDialogModule,
        MatButtonModule,
        MatIconModule
    ],
    declarations: [
        DgpConfirmDialogComponent
    ],
    exports: [
        DgpConfirmDialogComponent
    ],
    entryComponents: [
        DgpConfirmDialogComponent
    ]
})
export class DgpConfirmDialogModule {
}
