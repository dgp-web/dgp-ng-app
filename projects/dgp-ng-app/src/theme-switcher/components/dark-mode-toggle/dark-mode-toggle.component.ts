import {Component, ChangeDetectionStrategy} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {ThemeSwitcherState} from "../../models";
import {ToggleDarkModeAction} from "../../actions";
import {isDarkModeActiveSelector} from "../../selectors";

@Component({
    selector: "dgp-dark-mode-toggle",
    templateUrl: "./dark-mode-toggle.component.html",
    styleUrls: [
        "./dark-mode-toggle.component.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DarkModeToggleComponent {

    readonly useDarkMode$ = this.store.pipe(
        select(isDarkModeActiveSelector)
    );

    constructor(
        private readonly store: Store<ThemeSwitcherState>
    ) {}

    toggleDarkMode(): void {
        this.store.dispatch(
            new ToggleDarkModeAction()
        );
    }

}
