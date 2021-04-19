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
import { serializeDOMNode, svgString2ImageSrc } from "../../heatmap/functions";
import { ExportChartDialogComponent } from "../../heatmap/components/export-chart-dialog.component";
import { ExportChartConfig, InternalExportChartConfig } from "../../heatmap/models";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "dgp-box-plot-ng",
    template: `
        <dgp-chart-container>
            <div class="chart"
                 #chartRef>
                <div *ngIf="chartTitle"
                     class="title">
                    {{ chartTitle }}
                </div>
                <div class="inner-container">
                    <div *ngIf="yAxisTitle"
                         class="y-axis-label-container">
                        <div class="y-axis-label">
                            {{ yAxisTitle }}
                        </div>
                    </div>
                    <svg class="chart-svg"
                         *ngIf="boxPlotScales"> <!-- TODO: Bind width to containerWidth -->
                        <g [attr.transform]="getContainerTransform()">

                            <g class="chart__x-axis"
                               dgpBoxPlotBottomAxis
                               [scales]="boxPlotScales"></g>

                            <g class="chart__y-axis"
                               dgpBoxPlotLeftAxis
                               [scales]="boxPlotScales"></g>

                            <g class="measurement-result-root">
                                <g *ngFor="let boxGroup of model">
                                    <ng-container *ngFor="let box of boxGroup.boxes">
                                        <line dgpBoxPlotWhisker
                                              type="max"
                                              [scales]="boxPlotScales"
                                              [boxGroup]="boxGroup"
                                              [box]="box"></line>
                                        <line dgpBoxPlotUpperAntenna
                                              [scales]="boxPlotScales"
                                              [boxGroup]="boxGroup"
                                              [box]="box"></line>
                                        <rect dgpBoxPlotBox
                                              [scales]="boxPlotScales"
                                              [boxGroup]="boxGroup"
                                              [box]="box"></rect>
                                        <line dgpBoxPlotMedian
                                              [scales]="boxPlotScales"
                                              [boxGroup]="boxGroup"
                                              [box]="box"></line>
                                        <line dgpBoxPlotLowerAntenna
                                              [scales]="boxPlotScales"
                                              [boxGroup]="boxGroup"
                                              [box]="box"></line>
                                        <line dgpBoxPlotWhisker
                                              type="min"
                                              [scales]="boxPlotScales"
                                              [boxGroup]="boxGroup"
                                              [box]="box"></line>
                                    </ng-container>
                                </g>
                            </g>

                        </g>
                    </svg>
                    <!--<div #chartElRef
                         class="d3-hook"></div>-->
                    <div class="right-legend">
                        <ng-content select="[right-legend]"></ng-content>
                    </div>
                </div>

                <div *ngIf="xAxisTitle"
                     class="x-axis-label">
                    {{ xAxisTitle }}
                </div>

            </div>

            <ng-container chart-actions>

                <button mat-icon-button
                        (click)="downloadImage()"
                        matTooltip="Download image">
                    <mat-icon>image</mat-icon>
                </button>

            </ng-container>

        </dgp-chart-container>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-grow: 1;
        }

        svg {
            position: absolute;
            overflow: visible;
            width: 100%;
            height: 100%;
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
    chartTitle: string;

    @Input()
    yAxisTitle: string;

    @Input()
    xAxisTitle: string;

    @Input()
    config = defaultBoxPlotConfig;

    boxPlotScales: BoxPlotScales;

    private resizeSensor: ResizeSensor;
    private readonly drawChartActionScheduler = new EventEmitter();
    private isInitialResize = true;

    private resizeSubscription: Subscription;
    private checkBrokenResizeSensorSubscription: Subscription;


    @Input()
    exportConfig: ExportChartConfig;


    constructor(
        readonly elRef: ElementRef,
        readonly cd: ChangeDetectorRef,
        private readonly matDialog: MatDialog
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

        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;

        this.drawD3Chart({
            svg: null,
            containerHeight: rect.height - this.config.margin.top - this.config.margin.bottom,
            containerWidth: rect.width - this.config.margin.left - this.config.margin.right
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
        return "translate(" + this.config.margin.left + " " + this.config.margin.top + ")";
    }

    async downloadImage() {
        const svgNode = $(this.elRef.nativeElement).find("svg")[0];
        const svgString = serializeDOMNode(svgNode);
        const legendRoot = $(this.elRef.nativeElement).find(".right-legend").children()[0];
        let serializedLegend: string;
        if (notNullOrUndefined(legendRoot)) {
            serializedLegend = new XMLSerializer().serializeToString(legendRoot);
        }

        const svgImageSrc = svgString2ImageSrc(svgString);

        this.matDialog.open(ExportChartDialogComponent, {
            data: {
                serializedChartImageUrl: svgImageSrc,
                serializedRightLegend: serializedLegend,

                chartTitle: this.exportConfig?.chartTitle ? this.exportConfig?.chartTitle : this.chartTitle,
                xAxisTitle: this.exportConfig?.xAxisTitle ? this.exportConfig?.xAxisTitle : this.xAxisTitle,
                yAxisTitle: this.exportConfig?.yAxisTitle ? this.exportConfig?.yAxisTitle : this.yAxisTitle
            } as InternalExportChartConfig
        });

    }

}
