import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { FileItem } from "../models";

@Component({
    selector: "dgp-fallback-file-viewer",
    template: `
        <dgp-empty-state title="No preview available"
                         matIconName="get_app">

            <a class="download-link"
               [href]="fileItem.url | safe:'url'"
               target="_blank">
                Download it here
            </a>

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
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FallbackFileViewerComponent {

    @Input()
    fileItem: FileItem;

}
