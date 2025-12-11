import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { MatDrawer, MatDrawerContainer, MatDrawerContent } from "@angular/material/sidenav";
import { DgpDrawerLayoutMenuToggleComponent } from "./drawer-layout-menu-toggle.component";
import { DrawerLayout, DrawerLayoutMenuTogglePosition, DrawerMode, IsDrawerOpenInfoProperty } from "./models";

@Component({
    selector: "dgp-drawer-layout",
    template: `
        <mat-drawer-container class="page-menu-drawer-container">

            <mat-drawer [mode]="drawerMode"
                        [opened]="isDrawerOpen"
                        (closed)="closeMenuDrawer()"
                        class="page-menu-drawer mat-elevation-z4">

                <ng-content select="[dgp-drawer-layout-menu]"></ng-content>

            </mat-drawer>

            <mat-drawer-content class="page-menu-drawer-content">

                <div class="page-menu-drawer-toggle-container">

                    @if (menuTogglePosition === togglePositionEnum.RightToMenuAndVerticallyCentered) {
                        <dgp-drawer-layout-menu-toggle [isDrawerOpen]="isDrawerOpen"
                                                       (isDrawerOpenChange)="updateIsDrawerOpen($event)"/>
                    }


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
    imports: [
        MatDrawerContainer,
        MatDrawer,
        MatDrawerContent,
        DgpDrawerLayoutMenuToggleComponent
    ],
    standalone: true
})
export class DgpDrawerLayoutComponent implements DrawerLayout, IsDrawerOpenInfoProperty {

    readonly togglePositionEnum = DrawerLayoutMenuTogglePosition;

    @Input()
    menuTogglePosition: DrawerLayoutMenuTogglePosition = DrawerLayoutMenuTogglePosition.RightToMenuAndVerticallyCentered;

    @Input()
    drawerMode: DrawerMode;

    @Input()
    isDrawerOpen: boolean;

    @Output()
    readonly isDrawerOpenChange = new EventEmitter<boolean>();

    closeMenuDrawer() {
        this.isDrawerOpenChange.emit(false);
    }

     updateIsDrawerOpen(isDrawerOpen: boolean) {
        this.isDrawerOpen = isDrawerOpen;
        this.isDrawerOpenChange.emit(isDrawerOpen);
    }
}
