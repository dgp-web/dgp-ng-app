import { Component, Inject } from "@angular/core";
import { FILE_UPLOAD_CONFIG, FileUploadConfig } from "../models";
import { MatLegacyDialogRef as MatDialogRef } from "@angular/material/legacy-dialog";

@Component({
    selector: "dgp-maximize-dialog-button",
    template: `
        <button *ngIf="!isMaximized"
                class="--compact"
                mat-icon-button
                (click)="maximize()"
                matTooltip="Maximize"
                dgpActionShortcut
                shortcutKey="M"
                [requireShift]="true">
            <mat-icon>crop_din</mat-icon>
        </button>
        <button *ngIf="isMaximized"
                class="--compact"
                mat-icon-button
                (click)="minimize()"
                matTooltip="Minimize"
                dgpActionShortcut
                shortcutKey="M"
                [requireShift]="true">
            <mat-icon>filter_none</mat-icon>
        </button>
    `
})
export class MaximizeDialogButtonComponent {

    isMaximized: boolean;

    constructor(
        private readonly dialogRef: MatDialogRef<any>,
        @Inject(FILE_UPLOAD_CONFIG)
        private readonly moduleConfig: FileUploadConfig
    ) {
    }

    maximize() {
        this.isMaximized = true;
        this.dialogRef.addPanelClass(this.moduleConfig.maximizedClass);
    }

    minimize() {
        this.dialogRef.removePanelClass(this.moduleConfig.maximizedClass);
        this.isMaximized = false;
    }
}
