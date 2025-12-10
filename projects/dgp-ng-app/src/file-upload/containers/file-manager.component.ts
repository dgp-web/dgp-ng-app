import { Component, } from "@angular/core";
import { FileUploadState } from "../models";
import { canOpenFileDrawer, isDropTargetVisible } from "../selectors";
import { DgpContainer } from "../../utils/container.component-base";

@Component({
    selector: "dgp-file-manager",
    template: `
        <mat-dialog-content>
            <dgp-current-file-drop-zone
                *ngIf="isDropTargetVisible$ | async; else fileViewer"></dgp-current-file-drop-zone>

            <ng-template #fileViewer>
                <ng-container *ngIf="canOpenFileDrawer$ | async; else singleFileViewer">
                    <dgp-file-manager-dialog-header></dgp-file-manager-dialog-header>
                    <dgp-current-list-file-viewer></dgp-current-list-file-viewer>
                </ng-container>
            </ng-template>

            <ng-template #singleFileViewer>
                <dgp-current-file-viewer></dgp-current-file-viewer>
            </ng-template>

        </mat-dialog-content>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        mat-dialog-content {
            display: flex;
            flex-direction: column;
            max-height: initial;
        }
    `]
})
export class FileManagerComponent extends DgpContainer<FileUploadState> {
    readonly isDropTargetVisible$ = this.select(isDropTargetVisible);
    readonly canOpenFileDrawer$ = this.select(canOpenFileDrawer);
}
