import { ChangeDetectionStrategy, Component, Inject, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FILE_VIEWER_CONFIG, FileItem, FileViewerConfig } from "../models";

@Component({
    selector: "dgp-file-viewer",
    template: `

        <ng-container *ngIf="isKnownFileType; else dynamicViewer">
            <ng-container [ngSwitch]="fileItem.extension">
                <dgp-jpg-viewer *ngSwitchCase="'jpg'"
                                [fileItem]="fileItem"></dgp-jpg-viewer>
                <dgp-pdf-viewer *ngSwitchCase="'pdf'"
                                [fileItem]="fileItem"></dgp-pdf-viewer>
                <dgp-png-viewer *ngSwitchCase="'png'"
                                [fileItem]="fileItem"></dgp-png-viewer>
                <dgp-svg-viewer *ngSwitchCase="'svg'"
                                [fileItem]="fileItem"></dgp-svg-viewer>
                <dgp-fallback-file-viewer *ngSwitchDefault
                                          [fileItem]="fileItem"></dgp-fallback-file-viewer>
            </ng-container>
        </ng-container>

        <ng-template #dynamicViewer>
            <dgp-dynamic-file-viewer [fileItem]="fileItem"></dgp-dynamic-file-viewer>
        </ng-template>

    `,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            justify-content: center;
            align-items: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class FileViewerComponent implements OnChanges {

    @Input()
    fileItem: FileItem;

    isKnownFileType: boolean;

    constructor(
        @Inject(FILE_VIEWER_CONFIG)
        private readonly config: FileViewerConfig
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes && changes.fileItem) {
            if (this.fileItem) {
                this.isKnownFileType = this.config.fileTypeViewerMap[this.fileItem.extension] === null
                    || this.config.fileTypeViewerMap[this.fileItem.extension] === undefined;
            }
        }
    }

}
