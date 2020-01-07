import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-styling-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Styling
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>
                <dgp-docs-chapter-title>Styling</dgp-docs-chapter-title>

                <p>
                    dgp-ng-app wraps mat-theme and helps you style your angular and
                    dgp components for bright and dark mode in no time.
                </p>

                <dgp-docs-code-block [code]="scssCode"
                                     language="scss"></dgp-docs-code-block>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StylingDocsPageComponent {

    readonly scssCode = `
@import '~@angular/material/theming';
@import '~dgp-ng-app/theming';

@include mat-core();

$app-primary: mat-palette($mat-light-green, 800, 900);
$app-accent: mat-palette($mat-green, A200, A100, A400);

@include dgp-ng-app-theme($app-primary, $app-accent);
    `;

}
