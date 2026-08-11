import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FileUploadState } from "../models";
import { canOpenFileDrawer, isDropTargetVisible } from "../selectors";
import { DgpContainer } from "../../utils/container.component-base";

@Component({
    selector: "dgp-file-manager",
    template: `
        <mat-dialog-content>
          @if (isDropTargetVisible$ | async) {
            <dgp-current-file-drop-zone
            ></dgp-current-file-drop-zone>
          } @else {
            @if (canOpenFileDrawer$ | async) {
              <dgp-file-manager-dialog-header></dgp-file-manager-dialog-header>
              <dgp-current-list-file-viewer></dgp-current-list-file-viewer>
            } @else {
              <dgp-current-file-viewer></dgp-current-file-viewer>
            }
          }
        
        
        
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
    `],
    changeDetection: ChangeDetectionStrategy.Eager,
    standalone: false
})
export class FileManagerComponent extends DgpContainer<FileUploadState> {
    readonly isDropTargetVisible$ = this.select(isDropTargetVisible);
    readonly canOpenFileDrawer$ = this.select(canOpenFileDrawer);
}
