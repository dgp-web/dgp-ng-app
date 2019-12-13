import { ChangeDetectionStrategy, Component } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { ActivatedRoute } from "@angular/router";
import { isNullOrUndefined } from "util";
import { CompositeEntityAction } from "entity-store";
import { getSelectedLogEntrySelector } from "../selectors/log-entry.selectors";
import { LogState, logStoreFeature } from "../models/log-state.model";
import { logEntryType } from "../models/log-entry.model";

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

    readonly logEntry$ = this.store.pipe(
        select(getSelectedLogEntrySelector)
    );

    constructor(
        private readonly store: Store<LogState>,
        private readonly activatedRoute: ActivatedRoute
    ) {
        activatedRoute.params
            .subscribe(params => {

                if (!isNullOrUndefined(params.logEntryId)) {
                    const logEntryId = params.logEntryId;
                    this.store.dispatch(
                        new CompositeEntityAction({
                            select: [{
                                entityType: logEntryType,
                                storeFeature: logStoreFeature,
                                payload: [logEntryId]
                            }]
                        })
                    );
                }

            });
    }


}
