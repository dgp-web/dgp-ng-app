import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { FileItem } from "../models";
import { Platform } from "@angular/cdk/platform";

@Component({
    selector: "dgp-pdf-viewer",
    template: `

        <ng-container *ngIf="platform.FIREFOX || platform.BLINK || platform.EDGE; else fallback">

            <ng-container *ngIf="platform.FIREFOX || platform.BLINK">
                <object [attr.data]="fileItem.url | safe:'resourceUrl'"
                        type="application/pdf"
                        width="100%"
                        height="100%">
                    <dgp-fallback-file-viewer [fileItem]="fileItem"></dgp-fallback-file-viewer>
                </object>
            </ng-container>

            <ng-container *ngIf="platform.EDGE">
                <div [innerHTML]="edgeHTML | safe:'html'"
                     class="edge-helper"></div>
            </ng-container>

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

        .edge-helper {
            flex-grow: 1;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerComponent implements OnChanges {

    @Input()
    fileItem: FileItem;
    edgeHTML: any;

    constructor(
        public readonly platform: Platform,
        private readonly cd: ChangeDetectorRef
    ) {
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.fileItem && this.platform.EDGE) {
            this.edgeHTML = `
                <embed src="${this.fileItem.url}"
                       type="application/pdf"
                       width="100%"
                       height="100%">
            `;
            this.cd.markForCheck();
        }
    }

}
