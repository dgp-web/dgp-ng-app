import {
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
import { Box, BoxGroup, BoxPlot, BoxPlotScales, BoxPlotSelection } from "../models";
import { debounceTime, tap } from "rxjs/operators";
import { Subscription } from "rxjs";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { createBoxPlotScales } from "../functions";
import { isNullOrUndefined } from "dgp-ng-app";
import { defaultBoxPlotConfig } from "../constants";
import { ExportChartConfig } from "../../heatmap/models";
import { ChartSelectionMode } from "../../shared/models";
import { DgpChartComponentBase } from "../../chart/components/chart.component-base";

@Component({
    selector: "dgp-box-plot",
    template: `
        <dgp-chart dgpResizeSensor
                   (sizeChanged)="drawChart()"
                   [yAxisTitle]="yAxisTitle"
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

            <div class="plot-container"
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

        .plot-container {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
            width: auto;
            height: auto;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpBoxPlotComponent extends DgpChartComponentBase implements BoxPlot, OnChanges, OnDestroy {

    @ViewChild("chartContainer") elRef: ElementRef;

    @Input()
    model: ReadonlyArray<BoxGroup>;

    @Input()
    config = defaultBoxPlotConfig;

    @Input()
    selectionMode: ChartSelectionMode = "None";

    boxPlotScales: BoxPlotScales;

    private readonly drawChartActionScheduler = new EventEmitter();

    private drawChartSubscription: Subscription;

    outlierKey: string;

    @Input()
    exportConfig: ExportChartConfig;

    @Output()
    readonly selectionChange = new EventEmitter<BoxPlotSelection>();

    constructor(
        private readonly cd: ChangeDetectorRef
    ) {
        super();

        this.drawChartSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            tap(() => this.drawChart())
        ).subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.model || changes.config || changes.selectionMode || changes.selection) {
            this.scheduleDrawChartAction();
        }
    }

    ngOnDestroy(): void {
        if (!this.drawChartSubscription?.closed) {
            this.drawChartSubscription?.unsubscribe();
        }
    }

    scheduleDrawChartAction(): void {
        this.drawChartActionScheduler.emit();
    }

    drawD3Chart(payload: DrawD3ChartPayload): void {

        this.boxPlotScales = createBoxPlotScales({
            containerHeight: payload.containerHeight,
            containerWidth: payload.containerWidth,
            boxGroups: this.model
        });

        this.cd.markForCheck();
    }

    drawChart() {

        if (isNullOrUndefined(this.elRef.nativeElement)) return;

        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;

        this.drawD3Chart({
            svg: null,
            containerHeight: rect.height - this.config.margin.top - this.config.margin.bottom,
            containerWidth: rect.width - this.config.margin.left - this.config.margin.right
        });

    }

    getContainerTransform(): string {
        return "translate(" + this.config.margin.left + " " + this.config.margin.top + ")";
    }

    getResultRootTransform(boxGroup: BoxGroup) {
        return "translate(" + this.boxPlotScales.xAxis(boxGroup.boxGroupId) + ")";
    }

    highlightOutlier(box: Box, value: number) {
        this.outlierKey = box.boxGroupId + "." + box.boxId + "." + value;
    }

    unhighlightOutlier(box: Box, value: number) {
        this.outlierKey = null;
    }
}
