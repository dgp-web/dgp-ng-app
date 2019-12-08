import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { LogEntry, Severity } from "../../models";

@Component({
    selector: "dgp-log-entry-details",
    templateUrl: "./log-entry-details.component.html",
    styleUrls: [
        "./log-entry-details.component.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LogEntryDetailsComponent {

    readonly severityEnum = Severity;

    @Input()
    logEntry: LogEntry;

}
