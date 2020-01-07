import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { isDarkModeActiveSelector } from "../selectors/theme-switcher.selectors";
import { ThemeSwitcherState } from "../models/theme-switcher-state.model";
import { ToggleDarkModeAction } from "../actions/theme-switcher.actions";

@Component({
    selector: "dgp-dark-mode-toggle",
    template: `
        <mat-slide-toggle [ngModel]="useDarkMode$ | async"
                          (ngModelChange)="toggleDarkMode()">
            Use dark mode
        </mat-slide-toggle>
    `,
    styles: [`
        :host {
            margin-left: 16px;
            margin-right: 16px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class DarkModeToggleComponent {

    readonly useDarkMode$ = this.store.select(isDarkModeActiveSelector);

    constructor(
        private readonly store: Store<ThemeSwitcherState>
    ) {
    }

    toggleDarkMode(): void {
        this.store.dispatch(new ToggleDarkModeAction());
    }

}
