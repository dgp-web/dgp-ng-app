import { NgModule } from "@angular/core";
import { DgpConfirmDialogComponent } from "./containers/confirm-dialog.component";
import { MatLegacyDialogModule as MatDialogModule } from "@angular/material/legacy-dialog";
import { MatLegacyButtonModule as MatButtonModule } from "@angular/material/legacy-button";
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
    ]
})
export class DgpConfirmDialogModule {
}
