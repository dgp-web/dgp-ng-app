import { Component, ChangeDetectionStrategy } from "@angular/core";

@Component({
    selector: "dgp-empty-state-title",
    template: `
        <h1 class="mat-h1">
            <ng-content></ng-content>
        </h1>
    `,
    styles: [`
        :host {
            display: inline-flex;
            color: gray;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmptyStateTitleComponent {

}
