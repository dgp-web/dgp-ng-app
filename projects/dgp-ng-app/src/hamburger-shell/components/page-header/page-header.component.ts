import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { RequestState } from "../../../request-store/models";
import { hasPendingRequestsSelector } from "../../../request-store/selectors";

@Component({
    selector: "dgp-page-header",
    template: `
        <mat-toolbar color="primary"
                     class="toolbar">
            <div class="progress-bar-container">
                <mat-progress-bar *ngIf="hasPendingRequests$ | async"
                                  color="accent"
                                  mode="query"></mat-progress-bar>
            </div>
            <ng-content></ng-content>
        </mat-toolbar>
    `,
    styles: [`
        .toolbar {
            position: relative;
        }

        .progress-bar-container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PageHeaderComponent {

    readonly hasPendingRequests$ = this.store.select(hasPendingRequestsSelector);

    constructor(
        private readonly store: Store<RequestState>
    ) {
    }

}
