import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { LogEntry, Severity } from "../models";

@Component({
    selector: "dgp-log-entry-details",
    template: `
        @if (logEntry) {
          <div class="header">
            @if (logEntry.severity === severityEnum.Error) {
              <mat-icon class="header__icon"
                >
                error
              </mat-icon>
            }
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
              @if (logEntry.severity === severityEnum.Error) {
                Error
              }
            </div>
            <h2 class="content__heading mat-h2">
              Content
            </h2>
            @if (logEntry.content) {
              <div class="content__body"
                >
                @if (isHtml(logEntry)) {
                  <div [innerHTML]="logEntry.content | safe:'html'"></div>
                } @else {
                  {{ logEntry.content | json }}
                }
              </div>
            } @else {
              <div class="content__placeholder">
                This log entry doesn't contain additional content.
              </div>
            }
          </div>
        } @else {
          <dgp-empty-state title="No entry selected"
            matIconName="error">
            Pick one from the list to the left.
          </dgp-empty-state>
        }
        
        
        
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
    standalone: false
})

export class LogEntryDetailsComponent {

    readonly severityEnum = Severity;

    @Input()
    logEntry: LogEntry;

    isApiError(): boolean {
        if (this.logEntry.content?.hasOwnProperty("status")) {
            return true;
        }

        return false;
    }

    isHtml(logEntry: LogEntry) {
        return typeof logEntry.content === "string" && logEntry.content?.startsWith("<html");
    }
}
