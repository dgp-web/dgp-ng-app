import { Component, ChangeDetectionStrategy } from "@angular/core";
import { closeListDetailsMenu, toggleListDetailsPageMenu } from "../../actions";
import { isPageMenuOpenSelector, pageMenuModeSelector } from "../../selectors";
import { HamburgerShellState } from "../../models";
import { DgpContainer } from "../../../utils/container.component-base";

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

export class ListDetailsPageComponent extends DgpContainer<HamburgerShellState> {

    readonly pageMenuDrawerMode$ = this.select(pageMenuModeSelector);
    readonly isPageMenuDrawerOpen$ = this.select(isPageMenuOpenSelector);

    closePageMenuDrawer(): void {
        this.dispatch(closeListDetailsMenu());
    }

    togglePageMenuDrawer(): void {
        this.dispatch(toggleListDetailsPageMenu());
    }
}
