import { Component, ChangeDetectionStrategy } from "@angular/core";
import { MatIconButton } from "@angular/material/button";
import { MatIcon } from "@angular/material/icon";
import { MatTooltip } from "@angular/material/tooltip";
import { AsyncPipe } from "@angular/common";
import { DgpContainer } from "../../../utils/container.component-base";
import { HamburgerShellState } from "../../models";
import { isPageMenuOpenSelector } from "../../selectors";
import { toggleListDetailsPageMenu } from "../../actions";

@Component({
    selector: "dgp-list-details-page-menu-toggle",
    template: `
        <button mat-icon-button
                (click)="togglePageMenuDrawer()"
                matTooltip="Toggle menu drawer">
            @if (isPageMenuDrawerOpen$ | async) {
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
    changeDetection: ChangeDetectionStrategy.Eager,
    imports: [
        MatIconButton,
        MatIcon,
        MatTooltip,
        AsyncPipe
    ]
})
export class DgpListDetailsPageMenuToggleComponent extends DgpContainer<HamburgerShellState> {

    readonly isPageMenuDrawerOpen$ = this.select(isPageMenuOpenSelector);

    togglePageMenuDrawer(): void {
        this.dispatch(toggleListDetailsPageMenu());
    }
}
