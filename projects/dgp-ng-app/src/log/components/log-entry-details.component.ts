import { Component, ChangeDetectionStrategy, Input } from "@angular/core";
import { Severity } from "../models/severity.model";
import { LogEntry } from "../models/log-entry.model";

@Component({
    selector: "dgp-log-entry-details",
    template: `
        <ng-container *ngIf="logEntry; else noLogEntryTemplate">

            <div class="header">
                <mat-icon class="header__icon"
                          *ngIf="logEntry.severity === severityEnum.Error">
                    error
                </mat-icon>
                <div class="header__title-container">
                    <h1 class="header__title mat-h1">
                        {{ logEntry.title }}
                    </h1>
                    <div class="header__subtitle">
                        {{ logEntry.timeStamp | date:'medium' }}

                    </div>
                </div>
            </div>

            <mat-divider class="vertical-separator"></mat-divider>

            <div class="content">
                <h2 class="content__heading mat-h2">
                    Severity
                </h2>
                <div class="content__body">
                    <ng-container *ngIf="logEntry.severity === severityEnum.Error">
                        Error
                    </ng-container>
                </div>
                <h2 class="content__heading mat-h2">
                    Content
                </h2>
                <div class="content__body"
                     *ngIf="logEntry.content; else noContentTemplate">
                    {{ logEntry.content | json }}
                </div>
                <ng-template #noContentTemplate>
                    <div class="content__placeholder">
                        This log entry doesn't contain additional content.
                    </div>
                </ng-template>
            </div>

        </ng-container>

        <ng-template #noLogEntryTemplate>
            <dgp-empty-state title="No entry selected"
                             matIconName="error">
                Pick one from the list to the left.
            </dgp-empty-state>
        </ng-template>


    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            overflow: auto;
            word-break: break-word;
        }

        .header {
            display: flex;
            align-items: center;
        }

        .header__icon {
            font-size: 40px;
            width: 40px;
            height: 40px;
            margin-left: 16px;
            margin-right: 16px;
        }

        .header__title-container {
            flex-grow: 1;
        }

        .header__title {
            margin-top: 8px;
            margin-bottom: 8px;
        }

        .header__subtitle {
            display: flex;
        }

        .content {
        }

        .content__heading {
            margin-top: 8px;
            margin-bottom: 8px;
        }

        .content__body {

        }

        .content__placeholder {

        }

        .vertical-separator {
            margin-top: 16px;
            margin-bottom: 16px;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class LogEntryDetailsComponent {

    readonly severityEnum = Severity;

    @Input()
    logEntry: LogEntry;

}
