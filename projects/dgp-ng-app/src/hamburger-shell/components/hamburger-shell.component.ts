import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { closeHamburgerMenu } from "../actions/hamburger-shell.actions";
import { hamburgerMenuModeSelector, isHamburgerMenuOpenSelector } from "../selectors/hamburger-shell.selectors";
import { hasPendingRequestsSelector } from "../../request-store/selectors";
import { HamburgerShellState } from "../models/hamburger-shell-state.model";

@Component({
    selector: "dgp-hamburger-shell",
    template: `
        <mat-drawer-container class="hamburger-menu-drawer-container">

            <mat-drawer [mode]="hamburgerMenuMode$ | async"
                        [opened]="isHamburgerMenuOpen$ | async"
                        class="hamburger-menu-drawer mat-elevation-z4"
                        (closed)="closeHamburgerMenu()">

                <div class="progress-bar-container">
                    <mat-progress-bar *ngIf="hasPendingRequests$ | async"
                                      color="accent"
                                      mode="query"></mat-progress-bar>
                </div>

                <ng-content select="[dgp-hamburger-menu]"></ng-content>

            </mat-drawer>

            <mat-drawer-content class="hamburger-menu-drawer-content">

                <ng-content></ng-content>

            </mat-drawer-content>

        </mat-drawer-container>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
        }

        .hamburger-menu-drawer-container {
            flex-grow: 1;
            display: flex !important;
        }

        .hamburger-menu-drawer {
            width: 240px;
        }

        .progress-bar-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }

        .hamburger-menu-drawer-content {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            height: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class HamburgerShellComponent {

    readonly hasPendingRequests$ = this.store.select(hasPendingRequestsSelector);
    readonly isHamburgerMenuOpen$ = this.store.select(isHamburgerMenuOpenSelector);
    readonly hamburgerMenuMode$ = this.store.select(hamburgerMenuModeSelector);

    constructor(
        private readonly store: Store<HamburgerShellState>
    ) {
    }

    closeHamburgerMenu(): void {
        this.store.dispatch(closeHamburgerMenu());
    }
}
