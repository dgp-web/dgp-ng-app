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
                    <br>
                    By default, it is always visible on x-large screens (as specified by material design) and becomes
                    an overlay on smaller ones. The user can manually toggle the menu using a special control that
                    can be placed anywhere.
                    <br>
                    Helpful for setting up the main navigation for your application.
                </p>

                <dgp-docs-section-title>
                    1: Import DgpHamburgerShellModule.forRoot() in your main module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="moduleImportCode"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    2: Add the control to your main component.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="templateCode"
                                     language="html"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    3: Optional: Pass an optional configuration to the module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="configurationCode"></dgp-docs-code-block>
            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HamburgerShellDocsPageComponent {

    readonly moduleImportCode = `
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

    readonly templateCode = `
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

}
