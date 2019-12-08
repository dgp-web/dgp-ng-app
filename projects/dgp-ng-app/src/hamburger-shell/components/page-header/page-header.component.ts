import {Component, ChangeDetectionStrategy} from "@angular/core";
import {select, Store} from "@ngrx/store";
import {RequestState} from "../../../request-store/models";
import {hasPendingRequestsSelector} from "../../../request-store/selectors";

@Component({
    selector: "dgp-page-header",
    templateUrl: "./page-header.component.html",
    styleUrls: [
        "./page-header.component.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class PageHeaderComponent {

    readonly hasPendingRequests$ = this.store.pipe(
        select(hasPendingRequestsSelector)
    );

    constructor(
        private readonly store: Store<RequestState>
    ) {}

}
