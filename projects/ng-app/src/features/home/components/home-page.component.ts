import { Component, ChangeDetectionStrategy } from "@angular/core";
import { Store } from "@ngrx/store";
import { AppState } from "../../../store";

@Component({
    selector: "dgp-home-page",
    templateUrl: "./home-page.component.html",
    styleUrls: [
        "./home-page.component.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomePageComponent {

    constructor(
        private readonly store: Store<AppState>
    ) {
    }

}
