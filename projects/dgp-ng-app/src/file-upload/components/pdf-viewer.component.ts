import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { FileItem } from "../models";
import { Platform } from "@angular/cdk/platform";

@Component({
    selector: "dgp-pdf-viewer",
    template: `

        <ng-container *ngIf="platform.FIREFOX || platform.BLINK || (platform.EDGE && fileItem.isSaved); else fallback">
            <object [attr.data]="fileItem.url | safe:'resourceUrl'"
                    type="application/pdf"
                    width="100%"
                    height="100%">
                <dgp-fallback-file-viewer [fileItem]="fileItem"></dgp-fallback-file-viewer>
            </object>
        </ng-container>

        <ng-template #fallback>
            <dgp-fallback-file-viewer [fileItem]="fileItem"></dgp-fallback-file-viewer>
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
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerComponent {

    @Input()
    fileItem: FileItem;

    constructor(
        public readonly platform: Platform
    ) {
    }

}
