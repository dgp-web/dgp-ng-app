import { Component, ChangeDetectionStrategy } from "@angular/core";
import { of } from "rxjs";
import {coreFeatures} from "../../../constants/core-features.constant";

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
                    <dgp-tile *ngFor="let appFeature of appFeatures$ | async"
                              [route]="appFeature.route"
                              [matIconName]="appFeature.matIconName"
                              [label]="appFeature.label"
                              [description]="appFeature.description"></dgp-tile>
                </div>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

    readonly appFeatures$ = of(coreFeatures);
    readonly installationCode = `npm install --save dgp-ng-app`;

}
