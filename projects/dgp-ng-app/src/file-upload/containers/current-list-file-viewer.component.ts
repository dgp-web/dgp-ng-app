import { Component } from "@angular/core";
import { DrawerLayoutMenuTogglePosition } from "../../hamburger-shell/models";
import { isFileManagerMenuDrawerOpen } from "../selectors";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";


import { setIsFileDrawerOpen } from "../actions";

@Component({
    selector: "dgp-current-list-file-viewer",
    template: `
        <dgp-drawer-layout [menuTogglePosition]="togglePositionEnum.Custom"
                           [isDrawerOpen]="isFileManagerMenuDrawerOpen$ | async"
                           (isDrawerOpenChange)="setIsFileDrawerOpen($event)"
                           [drawerMode]="'side'">
            <dgp-current-file-item-list dgp-drawer-layout-menu></dgp-current-file-item-list>
            <dgp-current-file-viewer></dgp-current-file-viewer>
        </dgp-drawer-layout>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
        }
    `]
})
export class CurrentListFileViewerComponent extends DgpContainer<FileUploadState> {
    readonly togglePositionEnum = DrawerLayoutMenuTogglePosition;
    readonly isFileManagerMenuDrawerOpen$ = this.select(isFileManagerMenuDrawerOpen);


    setIsFileDrawerOpen(isDrawerOpen: boolean) {
        this.dispatch(setIsFileDrawerOpen({isDrawerOpen}));
    }

}
