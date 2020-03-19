import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { FileItem } from "../models";

@Component({
    selector: "dgp-pdf-viewer",
    template: `
        <embed [src]="fileItem.url | safe:'resourceUrl'"
               type="application/pdf"
               width="100%"
               height="100%">
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfViewerComponent {

    @Input()
    fileItem: FileItem;

}
