import { Component } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { DgpShortcutModule } from "../../shortcuts/shortcuts.module";
import { MatIcon } from "@angular/material/icon";
import { DgpNegatePipeModule } from "../../negate/negate-pipe.module";
import { AsyncPipe } from "@angular/common";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";
import { canSelectNextFile } from "../selectors";
import { selectNextFile } from "../actions";

@Component({
    selector: "dgp-select-next-file-item-action",
    template: `
        <button mat-icon-button
                matTooltip="Select next file"
                dgpActionShortcut
                shortcutKey="ArrowRight"
                [requireShift]="true"
                [requireCtrl]="true"
                [requireAlt]="true"
                (click)="selectNextFile()"
                [disabled]="canSelectNextFile$ | async | negate">
            <mat-icon>chevron_right</mat-icon>
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
export class DgpSelectNextFileItemActionComponent extends DgpContainer<FileUploadState> {

    readonly canSelectNextFile$ = this.select(canSelectNextFile);

    selectNextFile() {
        this.dispatch(selectNextFile());
    }
}
