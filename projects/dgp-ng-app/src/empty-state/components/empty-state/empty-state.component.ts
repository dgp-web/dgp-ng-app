import { Component, ChangeDetectionStrategy, Input } from "@angular/core";

@Component({
    selector: "dgp-empty-state",
    templateUrl: "./empty-state.component.html",
    styleUrls: [
        "./empty-state.component.scss"
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmptyStateComponent {

    @Input()
    matIconName: string;

    @Input()
    title: string;

}
