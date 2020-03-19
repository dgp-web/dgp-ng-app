import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { FileItem } from "../models";

@Component({
    selector: "dgp-jpg-viewer",
    template: `
        <img [src]="fileItem.url | safe:'url'"
             class="image"
             alt="{{ fileItem.fileName }}">
    `,
    styles: [`
        .image {
            max-width: 100%;
            max-height: 100%;
            object-fit: contain;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JpgViewerComponent {

    @Input()
    fileItem: FileItem;

}
