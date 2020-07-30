import {
    AfterViewInit,
    Directive,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { ResizeSensor } from "css-element-queries";
import * as d3 from "d3";
import { notNullOrUndefined } from "dgp-ng-app";
import { from, interval, Subscription, timer } from "rxjs";
import { debounceTime, switchMap, tap } from "rxjs/operators";
import { SharedChartConfig } from "./models";
import { d3ChartConstructionService } from "./d3-chart-construction.service";

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ChartComponentBase<TModel, TConfig extends SharedChartConfig> implements AfterViewInit, OnChanges, OnDestroy {

    @ViewChild("chartElRef", {static: false})
    chartElRef: ElementRef;

    @Input()
    chartTitle: string;

    @Input()
    yAxisTitle: string;

    @Input()
    xAxisTitle: string;

    @Input()
    model: TModel;

    @Input()
    config: TConfig;

    private resizeSensor: ResizeSensor;
    private readonly drawChartActionScheduler = new EventEmitter();
    private isInitialResize = true;

    private resizeSubscription: Subscription;
    private checkBrokenResizeSensorSubscription: Subscription;

    constructor(
        readonly elRef: ElementRef
    ) {

        this.resizeSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            switchMap(() => from(this.drawChart()))
        )
            .subscribe();

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

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.model || changes.data) {
            this.scheduleDrawChartAction();
        }
    }

    ngOnDestroy(): void {
        if (!this.resizeSubscription?.closed) {
            this.resizeSubscription.unsubscribe();
        }
        if (!this.checkBrokenResizeSensorSubscription?.closed) {
            this.checkBrokenResizeSensorSubscription.unsubscribe();
        }
    }

    protected scheduleDrawChartAction(): void {
        if (this.isInitialResize) {
            this.isInitialResize = false;
            return;
        }
        this.drawChartActionScheduler.emit();
    }

    protected abstract drawD3Chart(payload: {
        readonly svg: d3.Selection<SVGElement, unknown, null, undefined>;
        readonly containerWidth: number;
        readonly containerHeight: number;
    }): void;

    private readonly onResize = () => this.scheduleDrawChartAction();

    private initResizeSensor() {
        if (notNullOrUndefined(this.resizeSensor) && notNullOrUndefined(this.onResize)) {
            this.resizeSensor.detach(this.onResize);
        }

        this.resizeSensor = new ResizeSensor(this.elRef.nativeElement, this.onResize);
    }

    private async drawChart(): Promise<void> {

        this.resizeSensor.detach(this.onResize);
        await timer(0)
            .toPromise();

        d3.select(this.chartElRef.nativeElement)
            .html("");

        if (this.model && this.config) {

            const containerWidth = parseInt(d3.select(this.chartElRef.nativeElement)
                .style("width"), 10);
            const containerHeight = parseInt(d3.select(this.chartElRef.nativeElement)
                .style("height"), 10);

            const svg = d3ChartConstructionService.createChart({
                nativeElement: this.chartElRef.nativeElement,
                marginTop: this.config.margin.top,
                marginLeft: this.config.margin.left,
                containerWidth,
                containerHeight
            });

            this.drawD3Chart({
                svg,
                containerHeight,
                containerWidth
            });
        }

        this.isInitialResize = true;
        this.resizeSensor = new ResizeSensor(this.elRef.nativeElement, this.onResize);

    }

}
