import { Component } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { DgpShortcutModule } from "../../shortcuts/shortcuts.module";
import { MatIcon } from "@angular/material/icon";
import { DgpNegatePipeModule } from "../../negate/negate-pipe.module";
import { AsyncPipe } from "@angular/common";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";
import { canSelectPreviousFile } from "../selectors";
import { selectPreviousFile } from "../actions";

@Component({
    selector: "dgp-select-previous-file-item-action",
    template: `
        <button mat-icon-button
                matTooltip="Select previous file"
                dgpActionShortcut
                shortcutKey="ArrowLeft"
                [requireShift]="true"
                [requireCtrl]="true"
                [requireAlt]="true"
                (click)="selectPreviousFile()"
                [disabled]="canSelectPreviousFile$ | async | negate">
            <mat-icon>chevron_left</mat-icon>
        </button>
    `,
    imports: [
        MatIconButton,
        MatTooltip,
        DgpShortcutModule,
        MatIcon,
        DgpNegatePipeModule,
        AsyncPipe
    ]
})
export class DgpSelectPreviousFileItemActionComponent extends DgpContainer<FileUploadState> {

    readonly canSelectPreviousFile$ = this.select(canSelectPreviousFile);

    selectPreviousFile() {
        this.dispatch(selectPreviousFile());
    }
}
