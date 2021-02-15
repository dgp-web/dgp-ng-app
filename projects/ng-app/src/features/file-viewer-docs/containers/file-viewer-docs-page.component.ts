import { ChangeDetectionStrategy, Component } from "@angular/core";
import { jpgFileItem } from "../constants/jpg-file-item.constant";
import { pdfFileItem } from "../constants/pdf-file-item.constant";
import { pngFileItem } from "../constants/png-file-item.constant";
import { txtFileItem } from "../constants/txt-file-item.constant";

@Component({
    selector: "dgp-file-viewer-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            File viewer
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>File viewer</dgp-docs-chapter-title>

                <p>
                    Extendable file viewer for presenting documents.
                </p>

                <dgp-file-viewer [fileItem]="pngFileItem"
                                 class="png-viewer"></dgp-file-viewer>

                <p>
                    File viewers can take file items as input that include
                    metadata and an url to the actual file content.
                </p>

                <dgp-docs-code-block [code]="pngFileItemCode"></dgp-docs-code-block>

                <p>
                    PNG, JPEG, SVG, and PDF viewers are included by default.
                </p>

                <h5>JPEG</h5>

                <dgp-file-viewer [fileItem]="jpgFileItem"
                                 class="jpg-viewer"></dgp-file-viewer>

                <h5>PDF</h5>

                <dgp-file-viewer [fileItem]="pdfFileItem"
                                 class="pdf-viewer"></dgp-file-viewer>

                <p>
                    For other files a fallback is presented.
                </p>

                <h5>Fallback</h5>

                <dgp-file-viewer [fileItem]="txtFileItem"
                                 class="txt-viewer"></dgp-file-viewer>

                <!-- TODO: explain how to add additional files, such as tiff files -->


            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`
        .jpg-viewer, .png-viewer {
            max-width: 120px;
            align-self: center;
            margin: 16px;
        }

        .pdf-viewer {
            height: 240px;
            min-height: 240px;
            margin: 16px;
        }

        .txt-viewer {
            margin: 16px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileViewerDocsPageComponent {

    readonly jpgFileItem = jpgFileItem;
    readonly pdfFileItem = pdfFileItem;
    readonly pngFileItem = pngFileItem;
    readonly txtFileItem = txtFileItem;

    readonly pngFileItemCode = `export const pngFileItem: FileItem = {
    fileItemId: createGuid(),
    fileName: "github-logo",
    extension: "png",
    size: 3.94 * 1000,
    creationDate: new Date(),
    url: "assets/github-logo.png"
};`;

}
