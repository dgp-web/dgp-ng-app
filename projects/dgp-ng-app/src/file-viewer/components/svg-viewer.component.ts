import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { FileItem } from "../models";

@Component({
    selector: "dgp-svg-viewer",
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
export class SvgViewerComponent {

    @Input()
    fileItem: FileItem;

}
