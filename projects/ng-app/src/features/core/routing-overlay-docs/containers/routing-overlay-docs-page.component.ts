import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-routing-overlay-docs-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Routing overlay
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>
                <dgp-docs-chapter-title>Routing overlay</dgp-docs-chapter-title>

                <p>
                    Loading spinner that indicates idle states when routing.
                </p>

                <dgp-docs-section-title>Demo</dgp-docs-section-title>

                <p>
                    Navigating to one of these links takes two seconds.
                </p>

                <mat-nav-list style="margin: 16px;">

                    <a mat-list-item
                       routerLink="/routing-overlay/route01"
                       routerLinkActive="dgp-list-item--selected">
                        /route01
                    </a>

                    <a mat-list-item
                       routerLink="/routing-overlay/route02"
                       routerLinkActive="dgp-list-item--selected">
                        /route02
                    </a>

                </mat-nav-list>

                <dgp-docs-section-title>
                    1: Import DgpRoutingOverlayModule into an application using &#64;ngrx/store
                    and &#64;ngrx/effects.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="moduleImportCode"></dgp-docs-code-block>
            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RoutingOverlayDocsPageComponent {

    readonly moduleImportCode = `
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { DgpRoutingOverlayModule } from "dgp-ng-app";

@NgModule({
    imports: [
        StoreModule.forRoot(...),
        EffectsModule.forRoot([...]),
        DgpRoutingOverlayModule,
    ]
})
export class AppStoreModule {}
    `;

}
