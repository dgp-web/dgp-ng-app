import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { closeListDetailsMenu } from "../../actions";
import { isPageMenuOpenSelector, pageMenuModeSelector } from "../../selectors";
import { DrawerLayoutMenuTogglePosition, HamburgerShellState } from "../../models";
import { DgpContainer } from "../../../utils/container.component-base";

@Component({
    selector: "dgp-list-details-page",
    template: `
        <dgp-drawer-layout [drawerMode]="pageMenuDrawerMode$ | async"
                           [isDrawerOpen]="isPageMenuDrawerOpen$ | async"
                           (isDrawerOpenChange)="closePageMenuDrawer($event)"
                           [menuTogglePosition]="menuTogglePosition">

            <ng-container dgp-drawer-layout-menu>
                <ng-content select="[dgp-list-details-page-menu]"></ng-content>
            </ng-container>

            <ng-content></ng-content>

        </dgp-drawer-layout>

    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            overflow: auto;
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class ListDetailsPageComponent extends DgpContainer<HamburgerShellState> {

    @Input()
    menuTogglePosition: DrawerLayoutMenuTogglePosition = DrawerLayoutMenuTogglePosition.RightToMenuAndVerticallyCentered;

    readonly pageMenuDrawerMode$ = this.select(pageMenuModeSelector);
    readonly isPageMenuDrawerOpen$ = this.select(isPageMenuOpenSelector);

    closePageMenuDrawer(isOpen: boolean): void {
        if (isOpen) return;
        this.dispatch(closeListDetailsMenu());
    }

}

