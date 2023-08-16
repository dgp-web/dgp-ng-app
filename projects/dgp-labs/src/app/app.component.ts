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

                    <dgp-inspector-section label="Layout">
                        <dgp-hamburger-menu-entry label="Split panel"
                                                  route="/split-panel"
                                                  matIconName="view_array"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Docking layout"
                                                  route="/docking-layout"
                                                  matIconName="view_quilt"></dgp-hamburger-menu-entry>
                    </dgp-inspector-section>

                    <dgp-inspector-section label="Nifty interaction">
                        <dgp-hamburger-menu-entry label="Action context"
                                                  route="/action-context"
                                                  matIconName="pie_chart"></dgp-hamburger-menu-entry>
                    </dgp-inspector-section>

                    <dgp-inspector-section label="Charts">
                        <dgp-hamburger-menu-entry label="Charts"
                                                  route="/charts/overview"
                                                  matIconName="pie_chart"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Bar chart"
                                                  route="/charts/bar-chart"
                                                  matIconName="bar_chart"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Shapes and patterns"
                                                  route="/charts/shapes-and-patterns"
                                                  matIconName="category"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Box plot"
                                                  route="/charts/box-plot"
                                                  matIconName="candlestick_chart"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Connected scatter-plot"
                                                  route="/charts/connected-scatter-plot"
                                                  matIconName="insights"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Heatmap"
                                                  route="/charts/heatmap"
                                                  matIconName="view_module"></dgp-hamburger-menu-entry>
                    </dgp-inspector-section>
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
