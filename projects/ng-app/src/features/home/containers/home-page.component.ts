import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-home-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Home
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

                <div style="display: flex; flex-wrap: wrap; ">

                        <a routerLink="/authentication"
                           class="module-card">
                            <mat-card matRipple
                                      class="module-card__card">
                                <mat-card-content class="module-card__content">
                                    <mat-icon class="module-card__icon dgp-bg--primary">person</mat-icon>
                                    <div class="module-card__title">
                                        Authentication
                                    </div>
                                    <mat-divider class="module_card__divider"></mat-divider>
                                    <div>
                                        Authenticate users and perform startup tasks.
                                    </div>
                                </mat-card-content>
                            </mat-card>

                        </a>

                </div>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`
        .module-card {
            display: flex;
            flex-direction: column;
            max-height: 240px;
            min-height: 240px;
            height: 100%;
            max-width: 240px;
            min-width: 240px;
            width: 100%;
            text-decoration: inherit;
        }

        .module-card__card {
            flex-grow: 1;
        }

        .module-card__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
        }

        .module-card__icon {
            font-size: 48px;
            height: 64px;
            width: 64px;
            color: white !important;
            border-radius: 32px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-bottom: 16px;
        }

        .module-card__title {
            font-size: larger;
        }

        .module_card__divider {
            position: relative !important;
            margin-top: 16px;
            margin-bottom: 16px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

    readonly installationCode = `npm install --save dgp-ng-app`;

}
