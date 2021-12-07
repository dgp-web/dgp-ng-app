import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-file-upload-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            File upload
        </dgp-page-header>

        <dgp-docs-page dgpFileDragListener
                       dgpOpenFileManagerViaShortKey>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>File upload</dgp-docs-chapter-title>

                <p>
                    A side drawer for your application that you can fill with any content you want.
                </p>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileUploadDocsPageComponent {

}
