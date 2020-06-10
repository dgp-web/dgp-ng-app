import { Component } from "@angular/core";
import { DgpContainer, getAuthenticatedUserSelector } from "dgp-ng-app";

@Component({
    selector: "app-root",
    template: `
        <dgp-hamburger-shell dgpThemeHost>

            <dgp-hamburger-menu dgp-hamburger-menu>

                <dgp-hamburger-menu-header>
                    DGP labs
                </dgp-hamburger-menu-header>

                <dgp-hamburger-menu-entries>

                    <dgp-hamburger-menu-entry label="Split panel"
                                              route="/split-panel"
                                              matIconName="view_array"></dgp-hamburger-menu-entry>

                    <dgp-hamburger-menu-entry label="Docking layout"
                                              route="/docking-layout"
                                              matIconName="view_quilt"></dgp-hamburger-menu-entry>

                </dgp-hamburger-menu-entries>
            </dgp-hamburger-menu>

            <router-outlet></router-outlet>

        </dgp-hamburger-shell>
    `,
    styleUrls: [
        "./app.component.scss"
    ]
})
export class AppComponent extends DgpContainer {

    readonly authenticatedUser$ = this.select(getAuthenticatedUserSelector);

}
