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
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { BoxGroup, BoxPlotScales } from "../models";
import { debounceTime, switchMap, tap } from "rxjs/operators";
import { from, interval, Subscription, timer } from "rxjs";
import { ResizeSensor } from "css-element-queries";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { createBoxPlotScales } from "../functions";
import { isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";
import { defaultBoxPlotConfig } from "../constants";
import { serializeDOMNode, svgString2ImageSrc } from "../../heatmap/functions";
import { ExportChartDialogComponent } from "../../heatmap/components/export-chart-dialog.component";
import { ExportChartConfig, InternalExportChartConfig } from "../../heatmap/models";
import { MatDialog } from "@angular/material/dialog";

@Component({
    selector: "dgp-box-plot-ng",
    template: `
        <dgp-chart-container>
            <dgp-chart [yAxisTitle]="yAxisTitle"
                       [xAxisTitle]="xAxisTitle"
                       [chartTitle]="chartTitle">

                <ng-container chart-title>
                    <ng-content select="[chart-title]"></ng-content>
                </ng-container>

                <ng-container x-axis-title>
                    <ng-content select="[x-axis-title]"></ng-content>
                </ng-container>

                <ng-container y-axis-title>
                    <ng-content select="[y-axis-title]"></ng-content>
                </ng-container>

                <ng-container right-legend>
                    <ng-content select="[right-legend]"></ng-content>
                </ng-container>

                <div style="display: flex; flex-direction: column; flex-grow: 1; width: auto; height: auto;"
                     #chartContainer>

                    <svg class="chart-svg"
                         *ngIf="boxPlotScales">
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

                </div>

            </dgp-chart>

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

        .chart-svg {
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
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BoxPlotNgComponent implements AfterViewInit, OnChanges, OnDestroy {

    @ViewChild("chartContainer") elRef: ElementRef;

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
        private readonly cd: ChangeDetectorRef,
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
            ).subscribe();

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

        if (isNullOrUndefined(this.elRef.nativeElement)) return;

        this.resizeSensor.detach(this.onResize);
        await timer(0).toPromise();

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
