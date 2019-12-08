import {Component, ChangeDetectionStrategy} from "@angular/core";
import {HamburgerShellState} from "../../models";
import {select, Store} from "@ngrx/store";
import {CloseListDetailsMenuAction, ToggleListDetailsPageMenuAction} from "../../actions/hamburger-shell.actions";
import {isPageMenuOpenSelector, pageMenuModeSelector} from "../../selectors";

@Component({
    selector: "dgp-list-details-page",
    templateUrl: "./list-details-page.component.html",
    styleUrls: [
        "./list-details-page.component.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListDetailsPageComponent {

    readonly pageMenuDrawerMode$ = this.store.pipe(
        select(pageMenuModeSelector)
    );
    readonly isPageMenuDrawerOpen$ = this.store.pipe(
        select(isPageMenuOpenSelector)
    );

    constructor(
        private readonly store: Store<HamburgerShellState>
    ) {
    }

    closePageMenuDrawer(): void {
        this.store.dispatch(
            new CloseListDetailsMenuAction()
        );
    }

    togglePageMenuDrawer(): void {
        this.store.dispatch(
            new ToggleListDetailsPageMenuAction()
        );
    }
}
