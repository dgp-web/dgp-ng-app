import { AfterViewInit, Directive, ElementRef, EventEmitter, Input, OnDestroy } from "@angular/core";
import { ResizeSensor } from "css-element-queries";
import { debounceTime, switchMap, tap } from "rxjs/operators";
import { from, interval, Subscription, timer } from "rxjs";
import { notNullOrUndefined } from "dgp-ng-app";
import * as d3 from "d3";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ChartComponentBase implements AfterViewInit, OnDestroy {

    private resizeSensor: ResizeSensor;
    private readonly drawChartActionScheduler = new EventEmitter();

    @Input()
    chartTitle: string;

    @Input()
    yAxisTitle: string;

    @Input()
    xAxisTitle: string;

    private isInitialResize = true;

    abstract chartElRef: ElementRef;

    private resizeSubscription: Subscription;
    private checkBrokenResizeSensorSubscription: Subscription;

    constructor(
        readonly elRef: ElementRef
    ) {

        this.resizeSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            switchMap(() => from(this.drawChart()))
        ).subscribe();

    }

    private readonly onResize = () => this.scheduleDrawChartAction();

    ngAfterViewInit(): void {

        this.checkBrokenResizeSensorSubscription = interval(1000).pipe(
            tap(() => {
                try {
                    this.resizeSensor?.reset();
                } catch (e) {
                }
            })
        ).subscribe();

        this.initResizeSensor();
    }

    ngOnDestroy(): void {
        if (!this.resizeSubscription?.closed) this.resizeSubscription.unsubscribe();
        if (!this.checkBrokenResizeSensorSubscription?.closed) this.checkBrokenResizeSensorSubscription.unsubscribe();
    }

    private initResizeSensor() {
        if (notNullOrUndefined(this.resizeSensor) && notNullOrUndefined(this.onResize)) {
            this.resizeSensor.detach(this.onResize);
        }

        this.resizeSensor = new ResizeSensor(this.elRef.nativeElement, this.onResize);
    }

    private async drawChart(): Promise<void> {

        this.resizeSensor.detach(this.onResize);
        await timer(0).toPromise();

        d3.select(this.chartElRef.nativeElement).html("");
        this.drawD3Chart();

        this.isInitialResize = true;
        this.resizeSensor = new ResizeSensor(this.elRef.nativeElement, this.onResize);

    }

    protected scheduleDrawChartAction(): void {
        if (this.isInitialResize) {
            this.isInitialResize = false;
            return;
        }
        this.drawChartActionScheduler.emit();
    }

    protected abstract drawD3Chart(): void;

}
