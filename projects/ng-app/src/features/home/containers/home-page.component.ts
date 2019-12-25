import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-home-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Home
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>dgp-ng-app</dgp-docs-chapter-title>

                <p>
                    Building blocks for Angular applications following patterns and practices by dgp
                </p>

                <dgp-docs-section-title>Getting started</dgp-docs-section-title>

                <p style="margin-top: 16px;">
                    Install the dgp-ng-app npm package.
                </p>

                <dgp-docs-code-block [code]="installationCode"></dgp-docs-code-block>

                <dgp-docs-section-title>Modules</dgp-docs-section-title>

                <p style="margin-top: 16px;">
                    The modules included in this package facilitate tasks that one frequently encounters when writing
                    applications.
                </p>

                <div>

                </div>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

    readonly installationCode = `npm install --save dgp-ng-app`;

}
