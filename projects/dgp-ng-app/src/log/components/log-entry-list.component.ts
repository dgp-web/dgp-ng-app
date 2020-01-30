import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Store } from "@ngrx/store";
import { map } from "rxjs/operators";
import { Severity, LogState } from "../models/log.models";
import { getAllLogEntries } from "../selectors/log.selectors";

@Component({
    selector: "dgp-log-entry-list",
    template: `
        <mat-nav-list *ngIf="hasLogEntries$ | async; else emptyState">
            <h3 mat-subheader>Entries</h3>
            <a mat-list-item
               *ngFor="let logEntry of (logEntries$ | async)"
               [routerLink]="['/logEntries', logEntry.timeStamp.toString()]">
                <mat-icon mat-list-icon
                          *ngIf="logEntry.severity === severityEnum.Error">
                    error
                </mat-icon>
                <div mat-line>
                    {{ logEntry.title }}
                </div>
                <div mat-line>
                    {{ logEntry.timeStamp | date:'medium'}}
                </div>
            </a>
        </mat-nav-list>

        <ng-template #emptyState>
            <dgp-empty-state matIconName="error"
                             title="No entries available">

            </dgp-empty-state>
        </ng-template>
    `,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            flex-direction: column;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LogEntryListComponent {

    readonly severityEnum = Severity;

    readonly logEntries$ = this.store.select(getAllLogEntries);

    readonly hasLogEntries$ = this.logEntries$.pipe(
        map(x => x && x.length > 0)
    );

    constructor(
        private readonly store: Store<LogState>
    ) {
    }

}
