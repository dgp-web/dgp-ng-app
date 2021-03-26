import { ChangeDetectionStrategy, Component, ElementRef, HostListener } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { debounceTime } from "rxjs/operators";

@Component({
    selector: "dgp-chart-container",
    template: `

        <ng-content></ng-content>

        <mat-card *ngIf="areControlsVisible$ | async"
                  class="controls"
                  [style.left.px]="getControlsLeft()"
                  [style.top.px]="getControlsTop()"
                  (mouseover)="showControls()"
                  (mouseout)="hideControls()">

            <ng-content select="[chart-actions]"></ng-content>

        </mat-card>

    `,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            position: relative;
        }

        .controls {
            z-index: 100;
            position: fixed;
            display: flex;
            flex-direction: column;
            padding: 4px !important;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChartContainerComponent {

    readonly areControlsVisibleScheduler$ = new BehaviorSubject<boolean>(false);
    readonly areControlsVisible$ = this.areControlsVisibleScheduler$.pipe(debounceTime(250));

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

    @HostListener("mouseover")
    showControls() {
        this.areControlsVisibleScheduler$.next(true);
    }

    @HostListener("mouseout")
    hideControls() {
        this.areControlsVisibleScheduler$.next(false);
    }

}
