import { Component, HostBinding } from "@angular/core";
import { DgpContainer, getAuthenticatedUserSelector } from "dgp-ng-app";


@Component({
    selector: "app-root",
    template: `
        <dgp-hamburger-shell dgpThemeHost>

            <dgp-hamburger-menu dgp-hamburger-menu>

                <dgp-hamburger-menu-header>
                    DGP labs
                    <dgp-spacer></dgp-spacer>
                    <button mat-icon-button
                            [disabled]="canOpenAllSections() | negate"
                            (click)="openAllSections()"
                            matTooltip="Open all">
                        <mat-icon>unfold_more</mat-icon>
                    </button>

                    <button mat-icon-button
                            [disabled]="canCloseAllSections() | negate"
                            (click)="closeAllSections()"
                            matTooltip="Close all">
                        <mat-icon>unfold_less</mat-icon>
                    </button>
                </dgp-hamburger-menu-header>

                <dgp-hamburger-menu-entries>

                    <dgp-inspector-section label="Layout"
                                           [(expanded)]="isLayoutSectionExpanded">
                        <dgp-hamburger-menu-entry label="Split panel"
                                                  route="/split-panel"
                                                  matIconName="view_array"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Docking layout"
                                                  route="/docking-layout"
                                                  matIconName="view_quilt"></dgp-hamburger-menu-entry>
                    </dgp-inspector-section>

                    <dgp-inspector-section label="Nifty interaction"
                                           [(expanded)]="isInteractionSectionExpanded">
                        <dgp-hamburger-menu-entry label="Action context"
                                                  route="/action-context"
                                                  matIconName="pie_chart"></dgp-hamburger-menu-entry>
                    </dgp-inspector-section>

                    <dgp-inspector-section label="Charts"
                                           [(expanded)]="isChartsSectionExpanded">
                        <dgp-hamburger-menu-entry label="Charts"
                                                  route="/charts/overview"
                                                  matIconName="pie_chart"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Bar chart"
                                                  route="/charts/bar-chart"
                                                  matIconName="bar_chart"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Box plot"
                                                  route="/charts/box-plot"
                                                  matIconName="candlestick_chart"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Connected scatter-plot"
                                                  route="/charts/connected-scatter-plot"
                                                  matIconName="insights"></dgp-hamburger-menu-entry>

                        <dgp-hamburger-menu-entry label="Heatmap"
                                                  route="/charts/heatmap"
                                                  matIconName="view_module"></dgp-hamburger-menu-entry>

                        <dgp-inspector-section label="Utility"
                                               [(expanded)]="isChartUtilitySectionExpanded">

                            <dgp-hamburger-menu-entry label="Shapes and patterns"
                                                      route="/charts/shapes-and-patterns"
                                                      matIconName="category"></dgp-hamburger-menu-entry>

                        </dgp-inspector-section>
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

    @HostBinding("class.--compact")
    readonly bindings = false;

    readonly authenticatedUser$ = this.select(getAuthenticatedUserSelector);

    isChartsSectionExpanded = true;
    isLayoutSectionExpanded = true;
    isInteractionSectionExpanded = true;
    isChartUtilitySectionExpanded = true;

    canOpenAllSections(): boolean {
        return !this.isChartsSectionExpanded
            || !this.isLayoutSectionExpanded
            || !this.isInteractionSectionExpanded
            || !this.isChartUtilitySectionExpanded;
    }

    openAllSections() {
        this.isChartsSectionExpanded = true;
        this.isLayoutSectionExpanded = true;
        this.isInteractionSectionExpanded = true;
        this.isChartUtilitySectionExpanded = true;
    }

    canCloseAllSections(): boolean {
        return this.isChartsSectionExpanded
            || this.isLayoutSectionExpanded
            || this.isInteractionSectionExpanded
            || this.isChartUtilitySectionExpanded;
    }

    closeAllSections() {
        this.isChartsSectionExpanded = false;
        this.isLayoutSectionExpanded = false;
        this.isInteractionSectionExpanded = false;
        this.isChartUtilitySectionExpanded = false;
    }
}
