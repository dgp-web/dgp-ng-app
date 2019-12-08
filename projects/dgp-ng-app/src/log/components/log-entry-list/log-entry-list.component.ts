import { ChangeDetectionStrategy, Component } from "@angular/core";
import { LogState, Severity } from "../../models";
import { select, Store } from "@ngrx/store";
import { getAllLogEntriesSelector } from "../../selectors";
import {isNullOrUndefined} from "util";
import {map} from "rxjs/operators";

@Component({
    selector: "dgp-log-entry-list",
    templateUrl: "./log-entry-list.component.html",
    styleUrls: [
        "./log-entry-list.component.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LogEntryListComponent {

    readonly severityEnum = Severity;

    readonly logEntries$ = this.store.pipe(
        select(getAllLogEntriesSelector)
    );

    readonly hasLogEntries$ = this.logEntries$.pipe(
        map(x => {
            return !isNullOrUndefined(x) && x.length > 0;
        })
    );

    constructor(
        private readonly store: Store<LogState>
    ) {
    }

}
