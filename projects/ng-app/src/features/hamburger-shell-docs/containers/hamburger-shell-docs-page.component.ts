import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-hamburger-shell-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Hamburger shell
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>Hamburger shell</dgp-docs-chapter-title>

                <p>
                    A side drawer for your application that you can fill with any content you want.
                </p>

                <p>
                    By default, it is always visible on x-large screens (as specified by material design) and becomes
                    an overlay on smaller ones. The user can manually toggle the menu using a special control that
                    can be placed anywhere.
                </p>

                <p>
                    Helpful for setting up the main navigation for your application.
                </p>

                <dgp-docs-section-title>
                    1: Import DgpHamburgerShellModule.forRoot() in your main module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="shellModuleImportCode"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    2: Add the shell control to your main component.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="shellTemplateCode"
                                     language="html"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    3: Optional: Pass an optional configuration to the module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="configurationCode"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    4: Import DgpHamburgerMenuToggleModule into a feature module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="toggleModuleCode"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    2: Add the toggle control to a page header.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="toggleCode"
                                     language="html"></dgp-docs-code-block>
            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerShellDocsPageComponent {

    readonly shellModuleImportCode = `
import { DgpHamburgerShellModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpHamburgerShellModule.forRoot(),
        // ...
    ]
})
export class AppModule {}
    `;

    readonly shellTemplateCode = `
<dgp-hamburger-shell>

    <ng-container dgp-hamburger-menu
        <!-- Sidenav content goes here -->
    </ng-container>

    <!-- main content goes here, usually a router outlet -->
    <router-outlet></router-outlet>

</dgp-hamburger-shell>
    `;

    readonly configurationCode = `
import { HamburgerShellConfig } from "dgp-ng-app";

// this is the default config
export const config: HamburgerShellConfig = {

    // breakpoints for automatic toggling of: overlay <-> side
    hamburgerMenuBreakpoints: [
        Breakpoints.XLarge
    ],

    // breakpoints for automatic toggling of: overlay <-> side for list-details page
    listDetailsPageMenuBreakpoints: [
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge
    ]
};
    `;

    readonly toggleModuleCode = `
import { DgpHamburgerMenuToggleModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpHamburgerMenuToggleModule,
        // ...
    ]
})
export class FeatureModule {}
    `;

    readonly toggleCode = `
<!-- your page header -->
<mat-toolbar>
    <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
</mat-toolbar>
    `;

}
