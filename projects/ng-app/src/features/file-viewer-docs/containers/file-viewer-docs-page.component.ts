import { ChangeDetectionStrategy, Component } from "@angular/core";
import { pngFileItem } from "../constants/png-file-item.constant";

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

                <!-- TODO: Add code sample for this -->

                <!-- TODO: Add sample for jpeg and pdf, svg, and fallback -->

                <!-- TODO: explain how to add additional files, such as tiff files -->


            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`
        .png-viewer {
            max-width: 120px;
            align-self: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileViewerDocsPageComponent {

    readonly pngFileItem = pngFileItem;

}
