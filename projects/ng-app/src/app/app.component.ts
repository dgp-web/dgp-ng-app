import { Component } from "@angular/core";

@Component({
    selector: "app-root",
    template: `
        <dgp-hamburger-shell dgpThemeHost
                             class="mat-typography">

            <dgp-hamburger-menu dgp-hamburger-menu>

                <dgp-hamburger-menu-header>
                    DGP NG APP
                </dgp-hamburger-menu-header>

                <dgp-hamburger-menu-entries>
                    <dgp-hamburger-menu-entry route="/home"
                                              label="Home"
                                              matIconName="home">
                    </dgp-hamburger-menu-entry>

                    <h2 mat-subheader>Docs</h2>

                    <dgp-hamburger-menu-entry route="/authentication"
                                              label="Authentication"
                                              matIconName="person">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/broadcasting"
                                              label="Broadcasting"
                                              matIconName="dynamic_feed">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/empty-state"
                                              label="Empty state"
                                              matIconName="texture">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/file-upload"
                                              label="File upload"
                                              matIconName="attach_file">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/hamburger-shell"
                                              label="Hamburger shell"
                                              matIconName="chrome_reader_mode">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/list-details-page"
                                              label="List-details page"
                                              matIconName="vertical_split">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/log"
                                              label="Log"
                                              matIconName="receipt">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/request-store"
                                              label="Request store"
                                              matIconName="import_export">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/routing-overlay"
                                              label="Routing overlay"
                                              matIconName="schedule">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/spacer"
                                              label="Spacer"
                                              matIconName="space_bar">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/styling"
                                              label="Styling"
                                              matIconName="color_lens">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/table-cell-editor"
                                              label="Table-cell editor"
                                              matIconName="featured_video">
                    </dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry route="/theme-switcher"
                                              label="Theme switcher"
                                              matIconName="style">
                    </dgp-hamburger-menu-entry>
                </dgp-hamburger-menu-entries>

                <dgp-dark-mode-toggle></dgp-dark-mode-toggle>

                <mat-nav-list>
                    <dgp-hamburger-menu-entry route="/logEntries"
                                              label="Log"
                                              matIconName="error">
                    </dgp-hamburger-menu-entry>
                </mat-nav-list>
            </dgp-hamburger-menu>

            <router-outlet></router-outlet>
        </dgp-hamburger-shell>
    `,
    styles: [`
        :host {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
        }
    `]
})
export class AppComponent {
}
