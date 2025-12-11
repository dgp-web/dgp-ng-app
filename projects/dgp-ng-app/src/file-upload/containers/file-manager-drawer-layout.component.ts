import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpDrawerLayoutComponent } from "../../drawer-layout/drawer-layout.component";
import { AsyncPipe } from "@angular/common";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";
import { isFileManagerMenuDrawerOpen } from "../selectors";
import { setIsFileDrawerOpen } from "../actions";
import { DrawerLayoutMenuTogglePosition, DrawerMode } from "../../drawer-layout/models";

@Component({
    selector: "dgp-file-manager-drawer-layout",
    template: `
        <dgp-drawer-layout [menuTogglePosition]="togglePositionEnum.Custom"
                           [isDrawerOpen]="isFileManagerMenuDrawerOpen$ | async"
                           (isDrawerOpenChange)="setIsFileDrawerOpen($event)"
                           [drawerMode]="drawerModeEnum.Side">
            <ng-container dgp-drawer-layout-menu>
                <ng-content select="[dgp-file-manager-file-menu]"></ng-content>
            </ng-container>
            <ng-content></ng-content>
        </dgp-drawer-layout>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [
        DgpDrawerLayoutComponent,
        AsyncPipe
    ],
    standalone: true
})
export class DgpFileManagerDrawerLayout extends DgpContainer<FileUploadState> {

    readonly togglePositionEnum = DrawerLayoutMenuTogglePosition;
    readonly drawerModeEnum = DrawerMode;
    readonly isFileManagerMenuDrawerOpen$ = this.select(isFileManagerMenuDrawerOpen);

    setIsFileDrawerOpen(isDrawerOpen: boolean) {
        this.dispatch(setIsFileDrawerOpen({isDrawerOpen}));
    }

}
