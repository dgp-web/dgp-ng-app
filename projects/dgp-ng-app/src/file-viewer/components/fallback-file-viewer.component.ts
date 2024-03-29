import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
import { getFileFromFileItem$ } from "../../file-upload/functions";
import { Platform } from "@angular/cdk/platform";
import { FileViewerComponentBase } from "./file-viewer.component-base";

@Component({
    selector: "dgp-fallback-file-viewer",
    template: `
        <dgp-empty-state title="No preview available"
                         matIconName="get_app">

            <a *ngIf="!isTridentOrEdge; else ieFallback"
               class="download-link"
               [href]="fileItem.url | safe:'url'"
               target="_blank">
                Download it here
            </a>

            <ng-template #ieFallback>
                <a class="download-link"
                   href="javascript:;"
                   (click)="downloadFileInTridentOrEdge()">
                    Download it here
                </a>
            </ng-template>

        </dgp-empty-state>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        .download-link {
            color: inherit;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FallbackFileViewerComponent extends FileViewerComponentBase implements AfterViewInit {

    isTridentOrEdge: boolean;

    constructor(
        private readonly platform: Platform
    ) {
        super();

        this.isTridentOrEdge = this.platform.TRIDENT || this.platform.EDGE;
    }

    ngAfterViewInit() {
        this.isTridentOrEdge = this.platform.TRIDENT || this.platform.EDGE;
    }

    async downloadFileInTridentOrEdge() {
        const file = await getFileFromFileItem$(this.fileItem);
        (window.navigator as any).msSaveOrOpenBlob(file, file.name);
    }

}
