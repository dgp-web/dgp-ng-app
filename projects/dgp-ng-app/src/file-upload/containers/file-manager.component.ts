import { Component, } from "@angular/core";
import { FileUploadState } from "../models";
import { canOpenFileDrawer, isDropTargetVisible } from "../selectors";
import { DgpContainer } from "../../utils/container.component-base";

@Component({
    selector: "dgp-file-manager",
    template: `
        <dgp-current-file-drop-zone
                *ngIf="isDropTargetVisible$ | async; else fileViewer"></dgp-current-file-drop-zone>

        <ng-template #fileViewer>
            <ng-container *ngIf="canOpenFileDrawer$ | async; else singleFileViewer">
                <dgp-file-manager-dialog-header></dgp-file-manager-dialog-header>

                <dgp-list-details-page *ngIf="canOpenFileDrawer$ | async; ">
                    <dgp-current-file-item-list dgp-list-details-page-menu></dgp-current-file-item-list>
                    <dgp-current-file-viewer></dgp-current-file-viewer>
                </dgp-list-details-page>
            </ng-container>
        </ng-template>

        <ng-template #singleFileViewer>
            <dgp-current-file-viewer></dgp-current-file-viewer>
        </ng-template>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }
    `]
})
export class FileManagerComponent extends DgpContainer<FileUploadState> {

    readonly isDropTargetVisible$ = this.select(isDropTargetVisible);
    readonly canOpenFileDrawer$ = this.select(canOpenFileDrawer);

}
