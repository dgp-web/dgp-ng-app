import { Component, ChangeDetectionStrategy } from "@angular/core";
import { isDarkModeActive } from "../selectors";
import { ThemeSwitcherState } from "../models";
import { toggleDarkMode } from "../actions";
import { DgpContainer } from "../../utils/container.component-base";

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

export class DarkModeToggleComponent extends DgpContainer<ThemeSwitcherState> {

    readonly useDarkMode$ = this.select(isDarkModeActive);

    toggleDarkMode() {
        this.dispatch(toggleDarkMode());
    }
}
