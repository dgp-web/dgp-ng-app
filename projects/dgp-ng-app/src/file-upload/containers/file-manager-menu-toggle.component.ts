import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpDrawerLayoutMenuToggleComponent } from "../../drawer-layout/drawer-layout-menu-toggle.component";
import { AsyncPipe } from "@angular/common";
import { DgpContainer } from "../../utils/container.component-base";
import { FileUploadState } from "../models";
import { isFileManagerMenuDrawerOpen } from "../selectors";
import { setIsFileDrawerOpen } from "../actions";

@Component({
    selector: "dgp-file-manager-menu-toggle",
    template: `
        <dgp-drawer-layout-menu-toggle [isDrawerOpen]="isFileManagerMenuDrawerOpen$ | async"
                                       (isDrawerOpenChange)="setIsFileDrawerOpen($event)"/>
    `,
    styles: [`

    `],
    imports: [
        DgpDrawerLayoutMenuToggleComponent,
        AsyncPipe
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpFileManagerMenuToggle extends DgpContainer<FileUploadState> {

    readonly isFileManagerMenuDrawerOpen$ = this.select(isFileManagerMenuDrawerOpen);

    setIsFileDrawerOpen(isDrawerOpen: boolean) {
        this.dispatch(setIsFileDrawerOpen({isDrawerOpen}));
    }
}
