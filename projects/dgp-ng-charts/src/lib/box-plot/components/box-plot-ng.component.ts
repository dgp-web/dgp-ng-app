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
    Output,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { Box, BoxGroup, BoxPlotScales, BoxPlotSelection } from "../models";
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
import { ChartSelectionMode } from "../../shared/models";

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

                    <svg *ngIf="boxPlotScales"
                         class="chart-svg">
                        <g [attr.transform]="getContainerTransform()">

                            <g class="chart__x-axis"
                               dgpBoxPlotBottomAxis
                               [scales]="boxPlotScales"></g>

                            <g class="chart__y-axis"
                               dgpBoxPlotLeftAxis
                               [scales]="boxPlotScales"></g>

                            <g class="measurement-result-root"
                               dgpBoxPlotBrushSelector
                               [scales]="boxPlotScales"
                               [boxGroups]="model"
                               [config]="config"
                               [selectionMode]="selectionMode"
                               (selectionChange)="selectionChange.emit($event)">
                                <g *ngFor="let boxGroup of model"
                                   [attr.transform]="getResultRootTransform(boxGroup)">
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

                                        <circle *ngFor="let value of box.outliers"
                                                r="3"
                                                tabindex="0"
                                                dgpBoxPlotOutlier
                                                [scales]="boxPlotScales"
                                                [boxGroup]="boxGroup"
                                                [box]="box"
                                                [value]="value"
                                                (focus)="highlightOutlier(box, value)"
                                                (mouseenter)="highlightOutlier(box, value)"
                                                (blur)="unhighlightOutlier(box, value)"
                                                (mouseleave)="unhighlightOutlier(box, value)"></circle>
                                        <text *ngFor="let value of box.outliers"
                                              class="tooltip hidden"
                                              [class.visible]="outlierKey === box.boxGroupId + '.' + box.boxId + '.' + value"
                                              dgpBoxPlotOutlierTooltip
                                              [scales]="boxPlotScales"
                                              [boxGroup]="boxGroup"
                                              [box]="box"
                                              [value]="value">
                                            {{ value }}
                                        </text>
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

        .tooltip {
            position: fixed;
            fill: white;
        }

        .hidden {
            visibility: hidden;
        }

        .visible {
            visibility: visible !important;
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

    @Input()
    selectionMode: ChartSelectionMode = "None";

    private resizeSensor: ResizeSensor;
    private readonly drawChartActionScheduler = new EventEmitter();
    private isInitialResize = true;

    private resizeSubscription: Subscription;
    private checkBrokenResizeSensorSubscription: Subscription;

    outlierKey: string;

    @Input()
    exportConfig: ExportChartConfig;

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

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


        this.isInitialResize = true;
        this.resizeSensor = new ResizeSensor(this.elRef.nativeElement, this.onResize);

    }

    getContainerTransform(): string {
        return "translate(" + this.config.margin.left + " " + this.config.margin.top + ")";
    }

    getResultRootTransform(boxGroup: BoxGroup) {
        return "translate(" + this.boxPlotScales.xAxis(boxGroup.boxGroupId) + ")";
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

    highlightOutlier(box: Box, value: number) {
        console.log("Test");
        this.outlierKey = box.boxGroupId + "." + box.boxId + "." + value;
    }

    unhighlightOutlier(box: Box, value: number) {
        this.outlierKey = null;
    }
}
