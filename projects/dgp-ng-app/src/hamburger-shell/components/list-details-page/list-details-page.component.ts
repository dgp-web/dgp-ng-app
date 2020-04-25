import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { closeListDetailsMenu, toggleListDetailsPageMenu } from "../../actions";
import { isPageMenuOpenSelector, pageMenuModeSelector } from "../../selectors";
import { HamburgerShellState } from "../../models";

@Component({
    selector: "dgp-list-details-page",
    template: `
        <mat-drawer-container class="page-menu-drawer-container">

            <mat-drawer [mode]="pageMenuDrawerMode$ | async"
                        [opened]="isPageMenuDrawerOpen$ | async"
                        (closed)="closePageMenuDrawer()"
                        class="page-menu-drawer mat-elevation-z4">

                <ng-content select="[dgp-list-details-page-menu]"></ng-content>

            </mat-drawer>

            <mat-drawer-content class="page-menu-drawer-content">

                <div class="page-menu-drawer-toggle-container">

                    <button mat-icon-button
                            (click)="togglePageMenuDrawer()"
                            matTooltip="Toggle menu drawer">
                        <mat-icon *ngIf="isPageMenuDrawerOpen$ | async; else closedIcon">
                            arrow_back
                        </mat-icon>
                        <ng-template #closedIcon>
                            <mat-icon>arrow_forward</mat-icon>
                        </ng-template>
                    </button>

                </div>

                <ng-content></ng-content>

            </mat-drawer-content>

        </mat-drawer-container>

    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            overflow: auto;
            flex-grow: 1;
        }

        .page-menu-drawer-container {
            display: flex;
            flex-grow: 1;
            overflow: inherit;
        }

        .page-menu-drawer {
            width: 360px;
        }

        .page-menu-drawer-content {
            overflow: auto;
            flex-grow: 1;
            display: flex;
            position: relative;
        }

        .page-menu-drawer-toggle-container {
            display: flex;
            align-items: center;
            top: 0;
            bottom: 0;
            position: absolute;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListDetailsPageComponent {

    readonly pageMenuDrawerMode$ = this.store.select(pageMenuModeSelector);
    readonly isPageMenuDrawerOpen$ = this.store.select(isPageMenuOpenSelector);

    constructor(
        private readonly store: Store<HamburgerShellState>
    ) {
    }

    closePageMenuDrawer(): void {
        this.store.dispatch(closeListDetailsMenu());
    }

    togglePageMenuDrawer(): void {
        this.store.dispatch(toggleListDetailsPageMenu());
    }
}
