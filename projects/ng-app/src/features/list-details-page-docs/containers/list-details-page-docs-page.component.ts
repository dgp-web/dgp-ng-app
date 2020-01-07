import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-list-details-page-docs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            List-details page
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>List-details page</dgp-docs-chapter-title>

                <p>
                    Layout components for a page with a collapsible list and a central details view.
                </p>

                <p>
                    The configuration options are passed to HamburgerMenuShellModule.forRoot(...)
                    and described in that section.
                </p>

                <dgp-docs-section-title>
                    1: Import DgpListDetailsPageModule in your feature module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="moduleImportCode"
                                     language="typescript"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    2: Add the components to the template.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="templateCode"
                                     language="html"></dgp-docs-code-block>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListDetailsPageDocsComponent {

    readonly moduleImportCode = `
import { DgpListDetailsPageModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpListDetailsPageModule,
        // ...
    ]
})
export class FeatureModule {}
    `;

    readonly templateCode = `
<dgp-list-details-page>

    <ng-container dgp-list-details-page-menu>
        <!-- List content goes here -->
    </ng-container>

    <!-- Content-wrapper. This component is optional. -->
    <dgp-list-details-page-content>
       <!-- Main content goes here -->
    </dgp-list-details-page-content>

</dgp-list-details-page>
    `;

}
