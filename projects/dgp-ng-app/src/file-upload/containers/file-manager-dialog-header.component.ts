import { Component } from "@angular/core";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";
import { isFileManagerMenuDrawerOpen } from "../selectors";
import { setIsFileDrawerOpen } from "../store";

@Component({
    selector: "dgp-file-manager-dialog-header",
    template: `
        <dgp-drawer-layout-menu-toggle [isDrawerOpen]="isFileManagerMenuDrawerOpen$ | async"
                                       (isDrawerOpenChange)="setIsFileDrawerOpen($event)"/>
        <dgp-spacer></dgp-spacer>
        <dgp-maximize-dialog-button></dgp-maximize-dialog-button>
        <dgp-close-dialog-button></dgp-close-dialog-button>
    `,
    styles: [`
        :host {
            display: flex;
            align-items: center;
        }
    `]
})
export class FileManagerDialogHeaderComponent extends DgpContainer<FileUploadState> {

    readonly isFileManagerMenuDrawerOpen$ = this.select(isFileManagerMenuDrawerOpen);

    setIsFileDrawerOpen(isDrawerOpen: boolean) {
        this.dispatch(setIsFileDrawerOpen({isDrawerOpen}));
    }
}
