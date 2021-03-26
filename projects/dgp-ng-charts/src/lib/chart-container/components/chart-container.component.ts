import { ChangeDetectionStrategy, Component, ElementRef, HostBinding } from "@angular/core";

@Component({
    selector: "dgp-chart-container",
    template: `
        <ng-content></ng-content>

        <mat-card class="controls"
                  [style.left.px]="getControlsLeft()"
                  [style.top.px]="getControlsTop()">

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
            position: fixed;
            display: none;
            flex-direction: column;
            padding: 4px !important;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainerComponent {

    @HostBinding("tabindex")
    readonly tabindex = 0;

    constructor(
        readonly elRef: ElementRef
    ) {
    }

    getControlsLeft(): number {
        return this.elRef.nativeElement.getBoundingClientRect().right - 4;
    }

    getControlsTop(): number {
        return this.elRef.nativeElement.getBoundingClientRect().top;
    }

}
