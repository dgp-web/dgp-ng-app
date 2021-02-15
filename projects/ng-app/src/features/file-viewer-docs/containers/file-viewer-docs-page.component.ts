import { Component, ChangeDetectionStrategy } from "@angular/core";

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

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

   `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileViewerDocsPageComponent {

}
