import { ChangeDetectionStrategy, Component } from "@angular/core";
import { isCompactThemeActive } from "../selectors";
import { ThemeSwitcherState } from "../models";
import { toggleCompactTheme } from "../actions";
import { DgpContainer } from "../../utils/container.component-base";

@Component({
    selector: "dgp-compact-theme-toggle",
    template: `
        <mat-slide-toggle [ngModel]="isCompactThemeActive$ | async"
                          (ngModelChange)="toggleCompactTheme()">
            Use compact theme
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

export class CompactThemeToggleComponent extends DgpContainer<ThemeSwitcherState> {

    readonly isCompactThemeActive$ = this.select(isCompactThemeActive);

    toggleCompactTheme() {
        this.dispatch(toggleCompactTheme());
    }
}
