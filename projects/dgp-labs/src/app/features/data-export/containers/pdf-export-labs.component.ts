import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: "dgp-pdf-export-labs",
    template: `
        <dgp-page-header class="dgp-non-printable">
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            PDF Export
            <dgp-spacer></dgp-spacer>
            <button mat-icon-button
                    (click)="openPrintDialog()">
                <mat-icon>print</mat-icon>
            </button>
        </dgp-page-header>


        <dgp-docs-page>

            <iframe id="printf" name="printf"
                    src="assets/pdf-content.html"></iframe>

        </dgp-docs-page>
    `,
    styles: [`


        iframe {
            width: 100%;
            height: 100%;
            border: none;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PdfExportLabsComponent {

    openPrintDialog() {

        window.frames["printf"].focus();
        window.frames["printf"].print();
    }

}
