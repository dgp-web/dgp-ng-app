import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FileItem } from "../models";

@Component({
    selector: "dgp-file-viewer",
    template: `
        <ng-container *ngIf="fileItem">

            <ng-container [ngSwitch]="fileItem.extension">

                <dgp-jpg-viewer *ngSwitchCase="'jpg'"
                                [fileItem]="fileItem"></dgp-jpg-viewer>

                <dgp-png-viewer *ngSwitchCase="'png'"
                                [fileItem]="fileItem"></dgp-png-viewer>

                <dgp-svg-viewer *ngSwitchCase="'svg'"
                                [fileItem]="fileItem"></dgp-svg-viewer>

                <dgp-pdf-viewer *ngSwitchCase="'pdf'"
                                [fileItem]="fileItem"></dgp-pdf-viewer>

                <dgp-fallback-file-viewer *ngSwitchDefault
                                          [fileItem]="fileItem"></dgp-fallback-file-viewer>

            </ng-container>

        </ng-container>
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
export class FileViewerComponent {

    @Input()
    fileItem: FileItem;

}
