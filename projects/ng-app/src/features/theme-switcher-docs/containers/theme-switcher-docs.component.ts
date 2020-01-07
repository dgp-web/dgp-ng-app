import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-theme-switcher-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Theme switcher
        </dgp-page-header>
        <dgp-docs-page>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>Theme switcher</dgp-docs-chapter-title>

                <p>
                    Module for quickly setting up theming-related components in your
                    application.
                </p>

                <dgp-docs-section-title>
                    1: Import DgpThemeSwitcherModule.forRoot() in your main module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="moduleCode"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    2: Add dgpThemeHost to your shell component.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="themeHostTemplateCode"
                                     language="html"></dgp-docs-code-block>

                <dgp-docs-section-title style="margin-bottom: 16px;">
                    3: Import DgpDarkModeToggleModule in your feature module.
                </dgp-docs-section-title>

                <p>
                    You can add a control for switching between bright and
                    dark mode to your application.
                </p>

                <p>
                    The current setting is persisted in your local storage.
                </p>

                <dgp-docs-code-block [code]="featureModuleCode"></dgp-docs-code-block>

                <dgp-docs-section-title style="margin-bottom: 16px;">
                    4: Drop dgp-dark-mode-toggle into your application.
                </dgp-docs-section-title>

                <p>
                    A convenient solution is to add it to your hamburger menu.
                </p>

                <dgp-docs-code-block [code]="darkModeToggleTemplateCode"
                                     language="html"></dgp-docs-code-block>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeSwitcherDocsPageComponent {

    readonly moduleCode = `
import { DgpThemeSwitcherModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpThemeSwitcherModule.forRoot(),
        // ...
    ]
})
export class AppModule {}
    `;

    readonly themeHostTemplateCode = `
<dgp-hamburger-shell dgpThemeHost>

   <!-- Your content goes here -->

</dgp-hamburger-shell>
    `;

    readonly featureModuleCode = `
import { DgpDarkModeToggleModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpDarkModeToggleModule,
        // ...
    ]
})
export class FeatureModule {}
    `;

    readonly darkModeToggleTemplateCode = `
<dgp-hamburger-shell dgpThemeHost>

   <ng-container dgp-hamburger-menu>

        <!-- Menu entries go here -->

       <dgp-dark-mode-toggle></dgp-dark-mode-toggle>

   </ng-container>

</dgp-hamburger-shell>
    `;

}
