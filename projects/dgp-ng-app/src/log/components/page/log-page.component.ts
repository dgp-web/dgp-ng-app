import { ChangeDetectionStrategy, Component } from "@angular/core";
import { logEntryType, LogState, logStoreFeature } from "../../models";
import { select, Store } from "@ngrx/store";
import { getSelectedLogEntrySelector } from "../../selectors";
import { ActivatedRoute } from "@angular/router";
import { isNullOrUndefined } from "util";
import { CompositeEntityAction } from "entity-store";

@Component({
    selector: "dgp-log-page",
    templateUrl: "./log-page.component.html",
    styleUrls: [
        "./log-page.component.scss"
    ],
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
