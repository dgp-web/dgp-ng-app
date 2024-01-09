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
        
        h1 {
            margin: 0 !important;
            font-size: initial !important;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class EmptyStateTitleComponent {

}
