import { ChangeDetectionStrategy, Component } from "@angular/core";
import { createGuid, DgpContainer, FileItem, FileUploadState, openFileManager } from "dgp-ng-app";
import { defaultFileUploadConfig } from "../../../../../../dgp-ng-app/src/file-upload/models";

@Component({
    selector: "dgp-file-upload-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            File upload
        </dgp-page-header>

        <dgp-docs-page dgpFileDragListener
                       dgpOpenFileManagerViaShortKey>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>File upload</dgp-docs-chapter-title>

                <p>
                    A side drawer for your application that you can fill with any content you want.
                </p>
                <br>
                <button mat-button
                        (click)="openSampleWithOneFile()">
                    Open sample with only 1 file
                </button>
                <br>
                <button mat-button
                        (click)="openEmptySample()">
                    Open empty sample
                </button>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadDocsPageComponent extends DgpContainer<FileUploadState> {

    openSampleWithOneFile() {
        const fileItem: FileItem = {
            fileItemId: createGuid(),
            fileName: "Test file",
            url: window.location.origin + "/assets/github-logo.png",
            extension: "png",
            size: 0,
            creationDate: new Date()
        };

        this.dispatch(openFileManager({
            config: {
                ...defaultFileUploadConfig,
                canOpenFileDrawer: false,
                editingCapabilities: {
                    canAddFiles: false,
                    canRemoveFiles: false
                }
            },
            fileItems: [fileItem],
            selectedFileItemId: fileItem.fileItemId
        }));
    }

    openEmptySample() {

        this.dispatch(openFileManager({
            config: {
                ...defaultFileUploadConfig,
                canOpenFileDrawer: true,
                editingCapabilities: {
                    canAddFiles: true,
                    canRemoveFiles: true
                }
            },
            fileItems: []
        }));
    }
}
