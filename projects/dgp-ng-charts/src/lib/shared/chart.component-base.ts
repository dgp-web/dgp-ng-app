import { Directive, ElementRef, EventEmitter, Input, OnDestroy, ViewChild } from "@angular/core";
import * as d3 from "d3";
import { areEqualByHashCode } from "dgp-ng-app";
import { from, Subscription, timer } from "rxjs";
import { debounceTime, switchMap } from "rxjs/operators";
import { ChartSelectionMode, SharedChartConfig } from "./models";


export interface DrawD3ChartPayload {
    readonly svg: d3.Selection<SVGElement, unknown, null, undefined>;
    readonly containerWidth: number;
    readonly containerHeight: number;
}

export interface ChartBase {
    readonly chartTitle?: string;
    readonly yAxisTitle?: string;
    readonly xAxisTitle?: string;
}

@Directive()
// tslint:disable-next-line:directive-class-suffix
export abstract class ChartComponentBase<TModel, TConfig extends SharedChartConfig> implements OnDestroy, ChartBase {

    protected configValue: TConfig

    @ViewChild("chartElRef", { static: false })
    chartElRef: ElementRef;

    @Input()
    selectionMode: ChartSelectionMode = "Brush";

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


    protected readonly drawChartActionScheduler = new EventEmitter();

    private resizeSubscription: Subscription;

    constructor(
        readonly elRef: ElementRef
    ) {

        this.resizeSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            switchMap(() => from(this.drawChart()))
        )
            .subscribe();

    }

    setSelectionMode(selectionMode: ChartSelectionMode): void {
        if (this.selectionMode === selectionMode) return;

        this.selectionMode = selectionMode;
        this.scheduleDrawChartAction();
    }

    setConfig(config: TConfig): void {
        if (areEqualByHashCode(config, this.configValue)) return;

        this.config = config;
        this.scheduleDrawChartAction();
    }

    setModel(model: TModel): void {
        if (areEqualByHashCode(model, this.model)) return;

        this.model = model;
        this.scheduleDrawChartAction();
    }

    ngOnDestroy() {
        if (!this.resizeSubscription?.closed) this.resizeSubscription?.unsubscribe();
    }

    protected scheduleDrawChartAction(): void {
        this.drawChartActionScheduler.emit();
    }

    protected abstract drawD3Chart(payload: DrawD3ChartPayload): void;

    private async drawChart(): Promise<void> {

        await timer(0)
            .toPromise();

        d3.select(this.chartElRef.nativeElement)
            .html("");

        if (this.model && this.config) {

            const containerWidth = parseInt(d3.select(this.chartElRef.nativeElement)
                .style("width"), 10);
            const containerHeight = parseInt(d3.select(this.chartElRef.nativeElement)
                .style("height"), 10);

            const svg = d3.select(this.chartElRef.nativeElement)
                .append("svg")
                .attr("width", containerWidth)
                .attr("height", containerHeight)
                .style("position", "absolute")
                .attr("class", "chart-svg")
                .append("g")
                .attr("transform",
                    "translate(" + this.config.margin.left
                    + ","
                    + this.config.margin.top
                    + ")"
                );

            this.drawD3Chart({
                svg,
                containerHeight,
                containerWidth
            } as any);
        }

    }

}
