import { ChangeDetectionStrategy, Component, ElementRef, HostBinding } from "@angular/core";

@Component({
    selector: "dgp-chart-container",
    template: `
        <ng-content></ng-content>

        <mat-card class="controls">

            <ng-content select="[chart-actions]"></ng-content>

        </mat-card>
    `,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            position: relative;
        }

        :host:hover .controls, :host:focus-within .controls {
            display: flex;
        }

        .controls {
            z-index: 100;
            position: absolute !important;
            top: 0;
            left: 100%;
            display: none;
            flex-direction: column;
            padding: 4px !important;
        }

    `]
})
export class ChartContainerComponent {

    @HostBinding("tabindex")
    readonly tabindex = 0;

}
