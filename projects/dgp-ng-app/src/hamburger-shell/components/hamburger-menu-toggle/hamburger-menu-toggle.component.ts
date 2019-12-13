import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { ToggleHamburgerMenuAction } from "../../actions/hamburger-shell.actions";
import { HamburgerShellState } from "../../models/hamburger-shell-state.model";

@Component({
    selector: "dgp-hamburger-menu-toggle",
    template: `
        <button mat-icon-button
                (click)="toggleHamburgerMenu()">
            <mat-icon>menu</mat-icon>
        </button>
    `,
    styles: [`
        :host {
            margin-right: 8px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HamburgerMenuToggleComponent {

    constructor(
        private readonly store: Store<HamburgerShellState>
    ) {
    }

    toggleHamburgerMenu(): void {
        this.store.dispatch(
            new ToggleHamburgerMenuAction()
        );
    }

}
