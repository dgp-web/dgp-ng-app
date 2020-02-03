import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-content-block-editor-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Document editor
        </dgp-page-header>

        <dgp-list-details-page>

            <div dgp-list-details-page-menu>

            </div>

            <dgp-list-details-page-content>

            </dgp-list-details-page-content>

        </dgp-list-details-page>
    `,
    styles: [`

   `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContentBlockEditorPageComponent {

}
