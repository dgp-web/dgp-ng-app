import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Severity, LogState } from "../models";
import { getAllLogEntries, hasLogEntries } from "../selectors";
import { DgpContainer } from "../../utils/container.component-base";

@Component({
    selector: "dgp-log-entry-list",
    template: `
        @if (hasLogEntries$ | async) {
          <mat-nav-list>
            <h3 mat-subheader>Entries</h3>
            @for (logEntry of logEntries$ | async; track logEntry) {
              <a mat-list-item
                [routerLink]="['/logEntries', logEntry.timeStamp.toString()]">
                @if (logEntry.severity === severityEnum.Error) {
                  <mat-icon matListItemIcon
                    >
                    error
                  </mat-icon>
                }
                <div matListItemTitle>
                  {{ logEntry.title }}
                </div>
                <div matListItemLine>
                  {{ logEntry.timeStamp | date:'medium' }}
                </div>
              </a>
            }
          </mat-nav-list>
        } @else {
          <dgp-empty-state matIconName="error"
            title="No entries available">
          </dgp-empty-state>
        }
        
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
    standalone: false
})

export class LogEntryListComponent extends DgpContainer<LogState> {

    readonly severityEnum = Severity;

    readonly logEntries$ = this.select(getAllLogEntries);
    readonly hasLogEntries$ = this.select(hasLogEntries);

}
