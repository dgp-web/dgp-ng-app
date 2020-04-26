import { Component, ChangeDetectionStrategy } from "@angular/core";
import { FileViewerComponentBase } from "./file-viewer.component-base";

@Component({
    selector: "dgp-png-viewer",
    template: `
        <img [src]="fileItem.url | safe:'url'"
             class="image"
             alt="{{ fileItem.fileName }}">
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: 100%;
            height: 100%;
        }

        .image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PngViewerComponent extends FileViewerComponentBase {
}
