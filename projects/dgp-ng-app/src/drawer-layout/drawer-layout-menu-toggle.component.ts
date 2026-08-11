import { Component, EventEmitter, Input, Output, ChangeDetectionStrategy } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";
import { DgpShortcutModule } from "../shortcuts/shortcuts.module";
import { ActionShortcut } from "../shortcuts/models";
import { IsDrawerOpenInfoProperty } from "./models";

@Component({
    selector: "dgp-drawer-layout-menu-toggle",
    template: `
        <button mat-icon-button
                (click)="toggleDrawer()"
                matTooltip="Toggle menu drawer"
                dgpActionShortcut
                [shortcutKey]="shortcutKey"
                [requireAlt]="requireAlt"
                [requireCtrl]="requireCtrl"
                [requireShift]="requireShift">
            @if (isDrawerOpen) {
                <mat-icon>
                    arrow_back
                </mat-icon>
            } @else {
                <mat-icon>
                    arrow_forward
                </mat-icon>
            }
        </button>
    `,
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MatIcon,
        MatIconButton,
        MatTooltip,
        DgpShortcutModule
    ]
})
export class DgpDrawerLayoutMenuToggleComponent implements ActionShortcut, IsDrawerOpenInfoProperty {

    @Output()
    readonly isDrawerOpenChange = new EventEmitter<boolean>();

    @Input()
    isDrawerOpen: boolean;

    @Input()
    shortcutKey = "t";

    @Input()
    requireAlt = true;

    @Input()
    requireCtrl = true;

    @Input()
    requireShift = true;

    toggleDrawer() {
        this.isDrawerOpenChange.emit(!this.isDrawerOpen);
    }
}

