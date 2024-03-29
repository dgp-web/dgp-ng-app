import { ChangeDetectionStrategy, Component } from "@angular/core";
import { AppState } from "../../../../store";
import { Store } from "@ngrx/store";
import { LogErrorAction } from "dgp-ng-app";

@Component({
    selector: "dgp-log-docs",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Log
        </dgp-page-header>

        <dgp-docs-page>
            <dgp-docs-page-content>

                <dgp-docs-chapter-title>Log</dgp-docs-chapter-title>

                <p>
                    Feature to create and view log entries.
                </p>

                <dgp-docs-section-title>
                    1: Import DgpLogModule in your main module.
                </dgp-docs-section-title>

                <dgp-docs-code-block [code]="moduleCode"></dgp-docs-code-block>

                <dgp-docs-section-title>
                    2: Create some option to route to it. It's located under
                    <a routerLink="/logEntries"
                       style="color:inherit;">/logEntries</a>.
                </dgp-docs-section-title>

                <dgp-docs-section-title>
                    3: Create log actions to populate your log via AddLogEntryAction and LogErrorAction.
                </dgp-docs-section-title>

            </dgp-docs-page-content>
        </dgp-docs-page>
    `,
    styles: [`

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LogDocsPageComponent {

    readonly apiError = {
        headers: {normalizedNames: [], lazyUpdate: null},
        status: 500,
        statusText: "Internal Server Error",
        url: "http://localhost:3000/platzhalter",
        ok: false,
        name: "HttpErrorResponse",
        message: "Http failure response for http://test.de 500 Internal Server Error",
        error: "<html lang=en><meta charset=utf-8><title>Error</title><body>Not implemented</body></html>"
    };

    constructor(
        private readonly store: Store<AppState>
    ) {
        this.store.dispatch(new LogErrorAction({title: "Hallo", error: "Welt"}));
        this.store.dispatch(new LogErrorAction({title: "Hallo", error: this.apiError.error}));
    }

    readonly moduleCode = `
import { DgpLogModule } from "dgp-ng-app";

// ...

@NgModule({
    imports: [
        DgpLogModule,
        // ...
    ]
})
export class AppModule {}
    `;

}
