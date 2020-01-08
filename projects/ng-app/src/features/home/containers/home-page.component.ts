import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-home-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Home
            <dgp-spacer></dgp-spacer>
            <a href="https://github.com/dgp-web/dgp-ng-app"
               style="width: 40px; height: 40px;"
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

                    <a routerLink="/empty-state"
                       class="module-card">
                        <mat-card matRipple
                                  class="module-card__card">
                            <mat-card-content class="module-card__content">
                                <mat-icon class="module-card__icon dgp-bg--primary">texture</mat-icon>
                                <div class="module-card__title">
                                    Empty state
                                </div>
                                <mat-divider class="module_card__divider"></mat-divider>
                                <div>
                                    Configurable placeholder for empty views.
                                </div>
                            </mat-card-content>
                        </mat-card>

                    </a>

                    <a routerLink="/hamburger-shell"
                       class="module-card">
                        <mat-card matRipple
                                  class="module-card__card">
                            <mat-card-content class="module-card__content">
                                <mat-icon class="module-card__icon dgp-bg--primary">chrome_reader_mode</mat-icon>
                                <div class="module-card__title">
                                    Hamburger shell
                                </div>
                                <mat-divider class="module_card__divider"></mat-divider>
                                <div>
                                    Responsive navigation drawer for applications.
                                </div>
                            </mat-card-content>
                        </mat-card>

                    </a>

                    <a routerLink="/list-details-page"
                       class="module-card">
                        <mat-card matRipple
                                  class="module-card__card">
                            <mat-card-content class="module-card__content">
                                <mat-icon class="module-card__icon dgp-bg--primary">vertical_split</mat-icon>
                                <div class="module-card__title">
                                    List-details page
                                </div>
                                <mat-divider class="module_card__divider"></mat-divider>
                                <div>
                                    Page with a collapsible list and a central details view.
                                </div>
                            </mat-card-content>
                        </mat-card>

                    </a>

                    <a routerLink="/log"
                       class="module-card">
                        <mat-card matRipple
                                  class="module-card__card">
                            <mat-card-content class="module-card__content">
                                <mat-icon class="module-card__icon dgp-bg--primary">receipt</mat-icon>
                                <div class="module-card__title">
                                    Log
                                </div>
                                <mat-divider class="module_card__divider"></mat-divider>
                                <div>
                                    Feature to create and view log entries.
                                </div>
                            </mat-card-content>
                        </mat-card>

                    </a>

                    <a routerLink="/request-store"
                       class="module-card">
                        <mat-card matRipple
                                  class="module-card__card">
                            <mat-card-content class="module-card__content">
                                <mat-icon class="module-card__icon dgp-bg--primary">import_export</mat-icon>
                                <div class="module-card__title">
                                    Request store
                                </div>
                                <mat-divider class="module_card__divider"></mat-divider>
                                <div>
                                    A request queue that allows to dispatch requests as actions.
                                </div>
                            </mat-card-content>
                        </mat-card>

                    </a>

                    <a routerLink="/styling"
                       class="module-card">
                        <mat-card matRipple
                                  class="module-card__card">
                            <mat-card-content class="module-card__content">
                                <mat-icon class="module-card__icon dgp-bg--primary">color_lens</mat-icon>
                                <div class="module-card__title">
                                    Styling
                                </div>
                                <mat-divider class="module_card__divider"></mat-divider>
                                <div>
                                    Theming utilities for easy setup of bright/dark mode.
                                </div>
                            </mat-card-content>
                        </mat-card>

                    </a>

                    <a routerLink="/theme-switcher"
                       class="module-card">
                        <mat-card matRipple
                                  class="module-card__card">
                            <mat-card-content class="module-card__content">
                                <mat-icon class="module-card__icon dgp-bg--primary">style</mat-icon>
                                <div class="module-card__title">
                                    Theme switcher
                                </div>
                                <mat-divider class="module_card__divider"></mat-divider>
                                <div>
                                    Setup theming-related components in your
                                    app.
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
            max-height: 224px;
            min-height: 224px;
            height: 100%;
            max-width: 224px;
            min-width: 224px;
            width: 100%;
            text-decoration: inherit;
            margin: 8px;
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
            font-size: 40px;
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
