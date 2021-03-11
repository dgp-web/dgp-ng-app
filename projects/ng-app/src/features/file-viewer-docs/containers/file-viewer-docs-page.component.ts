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

                <dgp-docs-section-title>1: Import DgpFileViewerModule in your feature module.</dgp-docs-section-title>

                <dgp-docs-code-block [code]="featureModuleCode"></dgp-docs-code-block>

                <dgp-docs-section-title>2: Use dgp-file-viewer in your template.</dgp-docs-section-title>

                <dgp-docs-code-block [code]="templateCode"
                                     language="html"></dgp-docs-code-block>

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

                <dgp-docs-section-title>3: Adding custom viewers.</dgp-docs-section-title>

                <p>
                    Create a component and make it extend FileViewerComponentBase such as
                    the following viewer for txt files.
                </p>

                <dgp-docs-code-block [code]="customViewerCode"></dgp-docs-code-block>

                <p>
                    Then register the custom viewer with a file type in DgpFileViewerModule.forRoot()
                    in your application root module or in a shared module.
                </p>

                <p>
                    Do not forget to declare the registered component.
                </p>

                <dgp-docs-code-block [code]="rootModuleCode"></dgp-docs-code-block>

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

    readonly featureModuleCode = `import { DgpFileViewerModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpFileViewerModule,
        // ...
    ]
})
export class FeatureModule {}`;

    readonly templateCode = `<dgp-file-viewer [fileItem]="pngFileItem"></dgp-file-viewer>`;

    readonly customViewerCode = `import { FileViewerComponentBase } from "dgp-ng-app";

// ...

@Component({
    selector: "dgp-txt-file-viewer",
    template: "{{fileItem.url || safe:'url'}}"
})
export class TxtFileViewerComponent extends FileViewerComponentBase {}`;

    readonly rootModuleCode = `import { DgpFileViewerModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpFileViewerModule.forRoot({
            txt: TxtFileViewerComponent
        }),
        // ...
    ],
    declarations: [
        TxtFileViewerComponent
    ]
})
export class AppModule {}`;

}
