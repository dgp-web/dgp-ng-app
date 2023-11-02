import { Component, } from "@angular/core";
import { FileUploadState } from "../models";
import { canOpenFileDrawer, getSelectedFileItem, isDropTargetVisible } from "../selectors";
import { DgpContainer } from "../../utils/container.component-base";

@Component({
    selector: "dgp-file-manager",
    template: `
        <ng-container *ngIf="(isDropTargetVisible$ | async) === false; else dropTarget">

            <dgp-file-manager-dialog-header></dgp-file-manager-dialog-header>

            <dgp-list-details-page *ngIf="canOpenFileDrawer$ | async; else singleFileMode">

                <ng-container dgp-list-details-page-menu>
                    <dgp-current-file-item-list></dgp-current-file-item-list>
                    <dgp-spacer></dgp-spacer>
                    <dgp-current-add-file-list-item></dgp-current-add-file-list-item>
                </ng-container>

                <dgp-file-viewer [fileItem]="selectedFileItem$ | async"></dgp-file-viewer>
            </dgp-list-details-page>

            <ng-template #singleFileMode>
                <dgp-file-viewer [fileItem]="selectedFileItem$ | async"></dgp-file-viewer>
            </ng-template>
        </ng-container>

        <ng-template #dropTarget>
            <dgp-current-file-drop-zone></dgp-current-file-drop-zone>
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
    readonly selectedFileItem$ = this.select(getSelectedFileItem);
    readonly canOpenFileDrawer$ = this.select(canOpenFileDrawer);

}
