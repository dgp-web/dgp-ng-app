import { ChangeDetectionStrategy, Component } from "@angular/core";
import { of } from "rxjs";
import { coreFeatures } from "../../../constants/core-features.constant";
import { chartFeatures } from "../../../constants/charts/chart-features.constant";

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

                <dgp-docs-section-title>Core</dgp-docs-section-title>

                <p style="margin-top: 16px;">
                    Install the dgp-ng-app npm package.
                </p>

                <dgp-docs-code-block [code]="coreInstallationCode"></dgp-docs-code-block>

                <p style="margin-top: 16px;">
                    The modules included in this package facilitate tasks that one frequently encounters when writing
                    applications.
                </p>

                <div style="display: flex; flex-wrap: wrap; justify-content: center">
                    <dgp-tile *ngFor="let feature of coreFeatures$ | async"
                              [route]="feature.route"
                              [matIconName]="feature.matIconName"
                              [label]="feature.label"
                              [description]="feature.description"></dgp-tile>
                </div>

                <dgp-docs-section-title>Charts</dgp-docs-section-title>


                <p style="margin-top: 16px;">
                    Install the dgp-ng-charts npm package.
                </p>

                <dgp-docs-code-block [code]="chartInstallationCode"></dgp-docs-code-block>

                <p style="margin-top: 16px;">
                    The modules included in this package allow creating Angular charts.
                </p>

                <div style="display: flex; flex-wrap: wrap; justify-content: center">
                    <dgp-tile *ngFor="let feature of chartFeatures$ | async"
                              [route]="feature.route"
                              [matIconName]="feature.matIconName"
                              [label]="feature.label"
                              [description]="feature.description"></dgp-tile>
                </div>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

    readonly coreFeatures$ = of(coreFeatures);
    readonly chartFeatures$ = of(chartFeatures);
    readonly coreInstallationCode = `npm install --save dgp-ng-app`;
    readonly chartInstallationCode = `npm install --save dgp-ng-charts`;

}
