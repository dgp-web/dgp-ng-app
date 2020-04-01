import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-home-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Home
            <dgp-spacer></dgp-spacer>
            <a href="https://github.com/dgp-web/dgp-ng-app"
               style="width: 32px; height: 32px;"
               matTooltip="Open on GitHub">
                <img style="width: 100%; height: 100%;"
                     src="assets/github-logo.png">
            </a>
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

                <div style="display: flex; flex-wrap: wrap; justify-content: center">

                    <dgp-tile routerLinkToContent="/authentication"
                              matIconName="person"
                              label="Authentication"
                              description="Authenticate users and perform startup tasks."></dgp-tile>

                    <!--<dgp-tile routerLinkToContent="/broadcasting"
                              matIconName="dynamic_feed"
                              label="Broadcasting"
                              description="Bidirectional data sync between windows and tabs."></dgp-tile>-->

                    <dgp-tile routerLinkToContent="/empty-state"
                              matIconName="texture"
                              label="Empty state"
                              description="Configurable placeholder for empty views."></dgp-tile>

                    <dgp-tile routerLinkToContent="/file-upload"
                              matIconName="attach_file"
                              label="File upload"
                              description="Configurable placeholder for empty views."></dgp-tile>

                    <dgp-tile routerLinkToContent="/hamburger-shell"
                              matIconName="chrome_reader_mode"
                              label="Hamburger shell"
                              description="Responsive navigation drawer for applications."></dgp-tile>

                    <dgp-tile routerLinkToContent="/list-details-page"
                              matIconName="vertical_split"
                              label="List-details page"
                              description="Page with a collapsible list and a central details view."></dgp-tile>

                    <dgp-tile routerLinkToContent="/log"
                              matIconName="receipt"
                              label="Log"
                              description="Feature to create and view log entries."></dgp-tile>

                    <dgp-tile routerLinkToContent="/request-store"
                              matIconName="import_export"
                              label="Request store"
                              description="A request queue that allows to dispatch requests as actions."></dgp-tile>

                    <dgp-tile routerLinkToContent="/routing-overlay"
                              matIconName="schedule"
                              label="Routing overlay"
                              description="Loading spinner that indicates idle states when routing."></dgp-tile>

                    <dgp-tile routerLinkToContent="/spacer"
                              matIconName="space_bar"
                              label="Spacer"
                              description="Invisible component that fills empty space."></dgp-tile>

                    <dgp-tile routerLinkToContent="/styling"
                              matIconName="color_lens"
                              label="Styling"
                              description="Theming utilities for easy setup of bright/dark mode."></dgp-tile>

                    <dgp-tile routerLinkToContent="/table-cell-editor"
                              matIconName="featured_video"
                              label="Table-cell editor"
                              description="Editing functionality for table cells."></dgp-tile>

                    <dgp-tile routerLinkToContent="/theme-switcher"
                              matIconName="style"
                              label="Theme switcher"
                              description="Setup theming-related components in your app."></dgp-tile>

                </div>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

    readonly installationCode = `npm install --save dgp-ng-app`;

}
