import { Component, EventEmitter, Input, Output } from "@angular/core";
import { MatIcon } from "@angular/material/icon";
import { MatIconButton } from "@angular/material/button";
import { MatTooltip } from "@angular/material/tooltip";

@Component({
    selector: "dgp-drawer-layout-menu-toggle",
    template: `
        <button mat-icon-button
                (click)="toggleDrawer()"
                matTooltip="Toggle menu drawer">
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
    imports: [
        MatIcon,
        MatIconButton,
        MatTooltip
    ],
    standalone: true
})
export class DgpDrawerLayoutMenuToggleComponent {

    @Output()
    readonly isDrawerOpenChange = new EventEmitter<boolean>();

    @Input()
    isDrawerOpen: boolean;

    toggleDrawer() {
        this.isDrawerOpenChange.emit(!this.isDrawerOpen);
    }
}

