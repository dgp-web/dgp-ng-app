import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-spacer-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Spacer
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>Spacer</dgp-docs-chapter-title>

                <p>
                    Invisible component that fills empty space.
                </p>

                <dgp-docs-section-title>
                    1: Import DgSpacerModule in your feature module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="moduleImportCode"
                                     language="typescript"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    2: Add the component to your template.
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
export class SpacerDocPageComponent {

    readonly moduleImportCode = `
@NgModule({
    imports: [
        DgpSpacerModule,
        // ...
    ]
})
export class FeatureModule {}
`;

    readonly templateCode = `
<mat-toolbar>

    Feature title

    <dgp-spacer></dgp-spacer>

    <button mat-icon-button>
        <mat-icon>add</mat-icon>
    </button>

</mat-toolbar>
`;

}
