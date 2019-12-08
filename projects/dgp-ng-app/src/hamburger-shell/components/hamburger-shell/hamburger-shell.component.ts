import {Component, ChangeDetectionStrategy} from "@angular/core";
import {HamburgerShellState} from "../../models";
import {select, Store} from "@ngrx/store";
import {hamburgerMenuModeSelector, isHamburgerMenuOpenSelector} from "../../selectors";
import {CloseHamburgerMenuAction} from "../../actions/hamburger-shell.actions";
import {hasPendingRequestsSelector} from "../../../request-store/selectors";

@Component({
    selector: "dgp-hamburger-shell",
    templateUrl: "./hamburger-shell.component.html",
    styleUrls: [
        "./hamburger-shell.component.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HamburgerShellComponent {

    readonly hasPendingRequests$ = this.store.pipe(
        select(hasPendingRequestsSelector)
    );

    readonly isHamburgerMenuOpen$ = this.store.pipe(
        select(isHamburgerMenuOpenSelector)
    );

    readonly hamburgerMenuMode$ = this.store.pipe(
        select(hamburgerMenuModeSelector)
    );

    constructor(
        private readonly store: Store<HamburgerShellState>
    ) {}

    closeHamburgerMenu(): void {
        this.store.dispatch(
            new CloseHamburgerMenuAction()
        );
    }
}
