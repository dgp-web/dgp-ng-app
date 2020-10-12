import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    EventEmitter,
    HostListener,
    OnDestroy
} from "@angular/core";
import { BehaviorSubject, from, interval, Subscription } from "rxjs";
import { debounceTime, switchMap, tap } from "rxjs/operators";
import { ResizeSensor } from "css-element-queries";
import { notNullOrUndefined } from "dgp-ng-app";

@Component({
    selector: "dgp-chart-container",
    template: `

        <ng-content></ng-content>

        <mat-card *ngIf="areControlsVisible$ | async"
                  class="controls"
                  [style.left.px]="controlsLeft"
                  [style.top.px]="controlsTop"
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
export class ChartContainerComponent implements AfterViewInit, OnDestroy {

    readonly areControlsVisibleScheduler$ = new BehaviorSubject<boolean>(false);
    readonly areControlsVisible$ = this.areControlsVisibleScheduler$.pipe(debounceTime(250));

    private resizeSensor: ResizeSensor;
    private readonly resizeScheduler$ = new EventEmitter();
    private resizeSubscription: Subscription;
    private checkBrokenResizeSensorSubscription: Subscription;

    controlsLeft: number;
    controlsTop: number;

    constructor(
        readonly elRef: ElementRef
    ) {

        this.resizeSubscription = this.resizeScheduler$.pipe(
            debounceTime(250),
            switchMap(() => from(this.resize()))
        )
            .subscribe();

    }

    @HostListener("mouseover")
    showControls() {
        this.areControlsVisibleScheduler$.next(true);
    }

    @HostListener("mouseout")
    hideControls() {
        this.areControlsVisibleScheduler$.next(false);
    }

    onResize = () => this.resizeScheduler$.next();

    resize() {
        this.controlsLeft = this.elRef.nativeElement.getBoundingClientRect().right - 4;
        this.controlsTop = this.elRef.nativeElement.getBoundingClientRect().top;

        return Promise.resolve();
    }

    private initResizeSensor() {
        if (notNullOrUndefined(this.resizeSensor) && notNullOrUndefined(this.onResize)) {
            this.resizeSensor.detach(this.onResize);
        }

        this.resizeSensor = new ResizeSensor(this.elRef.nativeElement, this.onResize);
    }

    ngAfterViewInit(): void {

        this.checkBrokenResizeSensorSubscription = interval(1000)
            .pipe(
                tap(() => {
                    try {
                        this.resizeSensor?.reset();
                    } catch (e) {
                    }
                })
            )
            .subscribe();

        this.initResizeSensor();
    }

    ngOnDestroy(): void {
        if (!this.resizeSubscription?.closed) {
            this.resizeSubscription?.unsubscribe();
        }
        if (!this.checkBrokenResizeSensorSubscription?.closed) {
            this.checkBrokenResizeSensorSubscription?.unsubscribe();
        }
    }

}
