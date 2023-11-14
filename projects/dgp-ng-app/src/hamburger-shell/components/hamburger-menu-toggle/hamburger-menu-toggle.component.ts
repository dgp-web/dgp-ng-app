import { Component, ChangeDetectionStrategy } from "@angular/core";
import { toggleHamburgerMenu } from "../../actions";
import { HamburgerShellState } from "../../models";
import { DgpContainer } from "../../../utils/container.component-base";

@Component({
    selector: "dgp-hamburger-menu-toggle",
    template: `
        <button mat-icon-button
                (click)="toggleHamburgerMenu()"
                matTooltip="Toggle menu"
                dgpActionShortcut
                shortcutKey="h">
            <mat-icon>menu</mat-icon>
        </button>
    `,
    styles: [`
        :host {
            margin-right: 8px;
            display: flex;
            align-items: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HamburgerMenuToggleComponent extends DgpContainer<HamburgerShellState> {

    toggleHamburgerMenu(): void {
        this.dispatch(toggleHamburgerMenu());
    }

}
