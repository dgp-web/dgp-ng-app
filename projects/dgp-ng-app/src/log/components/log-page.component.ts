import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { getSelectedLogEntry } from "../selectors";
import { LogState } from "../models";
import { logStore } from "../reducers";
import { filter } from "rxjs/operators";

@Component({
    selector: "dgp-log-page",
    template: `
        <dgp-page-header>
            <dgp-hamburger-menu-toggle></dgp-hamburger-menu-toggle>
            Log
        </dgp-page-header>

        <dgp-list-details-page>

            <ng-container dgp-list-details-page-menu>
                <dgp-log-entry-list></dgp-log-entry-list>
            </ng-container>

            <dgp-list-details-page-content>
                <dgp-log-entry-details [logEntry]="logEntry$ | async"></dgp-log-entry-details>
            </dgp-list-details-page-content>

        </dgp-list-details-page>
    `,
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LogPageComponent {

    readonly logEntry$ = this.store.select(getSelectedLogEntry);

    constructor(
        private readonly store: Store<LogState>,
        private readonly activatedRoute: ActivatedRoute
    ) {
        activatedRoute.params
            .pipe(filter(params => params.logEntryId))
            .subscribe(params => {

                this.store.dispatch(
                    logStore.actions.composeEntityActions({
                        select: {
                            logEntry: [params.logEntryId]
                        }
                    })
                );

            });
    }

}
