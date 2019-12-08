import {Component, ChangeDetectionStrategy} from "@angular/core";
import {HamburgerShellState} from "../../models";
import {Store} from "@ngrx/store";
import {ToggleHamburgerMenuAction} from "../../actions/hamburger-shell.actions";

@Component({
    selector: "dgp-hamburger-menu-toggle",
    templateUrl: "./hamburger-menu-toggle.component.html",
    styleUrls: [
        "./hamburger-menu-toggle.component.scss"
    ],
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
