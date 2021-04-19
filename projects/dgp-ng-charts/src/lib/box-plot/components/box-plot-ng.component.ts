import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from "@angular/core";
import { BoxGroup, BoxPlotScales } from "../models";
import { debounceTime, switchMap, tap } from "rxjs/operators";
import { from, interval, Subscription, timer } from "rxjs";
import { ResizeSensor } from "css-element-queries";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { createBoxPlotScales } from "../functions";
import { notNullOrUndefined } from "dgp-ng-app";
import { defaultBoxPlotConfig } from "../constants";

@Component({
    selector: "dgp-box-plot-ng",
    template: `
        <svg class="chart-svg"
             *ngIf="boxPlotScales"> <!-- TODO: Bind width to containerWidth -->
            <g [attr.transform]="getContainerTransform()">

                <g class="chart__x-axis"
                   dgpBoxPlotAxisBottom
                   [scales]="boxPlotScales"> <!-- Add axis bottom -->

                </g>

                <g class="chart__y-axis"> <!-- Add axis left -->

                </g>

                <g class="measurement-result-root">
                    <g *ngFor="let boxGroup of model">
                        <rect *ngFor="let box of boxGroup.boxes">
                            <line></line> <!-- Add directive for upper whisker -->
                            <line></line> <!-- Add directive for upper stick -->
                            <rect></rect>
                            <line></line> <!-- Add directive for median -->
                            <line></line>  <!-- Add directive for lower stick -->
                            <line></line> <!-- Add directive for lower whisker -->
                        </rect>
                    </g>
                </g>

            </g>
        </svg>
    `,
    styles: [`
        svg {
            position: absolute;
        }

        .chart-svg {
            overflow: visible;
            width: 400px;
            height: 320px;
        }

        .chart__y-axis {
            font-size: 16px;
        }

        .chart__x-axis {
            font-size: 16px;
        }

        .tick {
            font-size: smaller;
        }

        .chart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
        }

        .title {
            justify-content: center;
            align-items: center;
            display: flex;
            margin: 16px;
            word-break: break-all;
        }

        .inner-container {
            display: flex;
            flex-grow: 1;
        }

        .y-axis-label-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 40px;
            max-width: 40px;
        }

        .y-axis-label {
            transform: rotate(-90deg);
            white-space: nowrap;
        }

        .d3-hook {
            flex-grow: 1;
            height: 100%;
        }

        .x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .right-legend {
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxPlotNgComponent implements AfterViewInit, OnChanges, OnDestroy {

    @Input()
    model: ReadonlyArray<BoxGroup>;

    @Input()
    config = defaultBoxPlotConfig;

    boxPlotScales: BoxPlotScales;

    private resizeSensor: ResizeSensor;
    private readonly drawChartActionScheduler = new EventEmitter();
    private isInitialResize = true;

    private resizeSubscription: Subscription;
    private checkBrokenResizeSensorSubscription: Subscription;


    constructor(
        readonly elRef: ElementRef,
        readonly cd: ChangeDetectorRef
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
        if (changes.model || changes.config || changes.selectionMode || changes.selection) {
            this.scheduleDrawChartAction();
        }
    }

    ngOnDestroy(): void {
        if (!this.resizeSubscription?.closed) {
            this.resizeSubscription?.unsubscribe();
        }
        if (!this.checkBrokenResizeSensorSubscription?.closed) {
            this.checkBrokenResizeSensorSubscription?.unsubscribe();
        }
    }

    protected scheduleDrawChartAction(): void {
        if (this.isInitialResize) {
            this.isInitialResize = false;
            return;
        }
        this.drawChartActionScheduler.emit();
    }

    protected drawD3Chart(payload: DrawD3ChartPayload): void {

        this.boxPlotScales = createBoxPlotScales({
            containerHeight: payload.containerHeight,
            containerWidth: payload.containerWidth,
            boxGroups: this.model
        });
        this.cd.markForCheck();
    }

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

        this.drawD3Chart({
            svg: null,
            containerHeight: 320,
            containerWidth: 400
        });

        /* d3.select(this.chartElRef.nativeElement)
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
             });
         }
 */
        this.isInitialResize = true;
        this.resizeSensor = new ResizeSensor(this.elRef.nativeElement, this.onResize);

    }

    getContainerTransform(): string {
        return "translate(" + this.config.margin.left + " " + this.config.margin.left + ")";
    }
}
