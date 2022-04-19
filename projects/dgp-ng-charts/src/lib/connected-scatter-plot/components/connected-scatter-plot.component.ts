import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges
} from "@angular/core";
import { Subscription } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotControlLine, ConnectedScatterSeries, Dot } from "../models";
import { createConnectedScatterPlotScales } from "../functions";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import {
    defaultConnectedScatterPlotConfig,
    trackByConnectedPlotControlLineId,
    trackByConnectedScatterGroupId,
    trackByConnectedScatterSeriesId
} from "../constants";
import { isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";
import { Shape } from "../../shapes/models";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";
import { ScaleType } from "../../shared/models";
import { DgpCardinalYAxisChartComponentBase } from "../../chart/components/cardinal-y-axis-chart.component-base";

@Component({
    selector: "dgp-connected-scatter-plot",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   dgpResizeSensor
                   (sizeChanged)="drawChart()">

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <dgp-plot-container>

                <svg *ngIf="model && connectedScatterPlotScales"
                     class="chart-svg"
                     [attr.viewBox]="viewBox$ | async">

                    <defs>
                        <clipPath dgpChartDataAreaClipPath
                                  [scales]="connectedScatterPlotScales"></clipPath>
                        <clipPath dgpChartContainerAreaClipPath
                                  [scales]="connectedScatterPlotScales"></clipPath>
                    </defs>

                    <g [attr.clip-path]="containerAreaClipPath">
                        <g [attr.transform]="containerTransform$ | async">

                            <g dgpChartBottomAxis
                               [scales]="connectedScatterPlotScales"></g>

                            <g *ngIf="showXAxisGridLines"
                               dgpChartXAxisGridLines
                               [scales]="connectedScatterPlotScales"></g>

                            <g dgpChartLeftAxis
                               [scales]="connectedScatterPlotScales"></g>

                            <g *ngIf="showYAxisGridLines"
                               dgpChartYAxisGridLines
                               [scales]="connectedScatterPlotScales"></g>

                            <g [attr.clip-path]="dataAreaClipPath">

                                <line *ngFor="let controlLine of controlLines; trackBy: trackByConnectedPlotControlLineId"
                                      dgpConnectedScatterPlotControlLine
                                      [scales]="connectedScatterPlotScales"
                                      [connectedScatterPlotControlLine]="controlLine"></line>

                                <g *ngFor="let group of model; trackBy: trackByConnectedScatterGroupId">
                                    <ng-container *ngFor="let series of group.series; trackBy: trackByConnectedScatterSeriesId">
                                        <path *ngIf="showEdges(group, series)"
                                              dgpLineChartLine
                                              [series]="series"
                                              [group]="group"
                                              [scales]="connectedScatterPlotScales"></path>
                                    </ng-container>
                                </g>

                                <g *ngFor="let group of model; trackBy: trackByConnectedScatterGroupId">
                                    <ng-container *ngFor="let series of group.series; trackBy: trackByConnectedScatterSeriesId">
                                        <ng-container *ngFor="let dot of series.dots; trackBy: (series | trackByConnectedScatterDot)">
                                            <ng-container *ngIf="showVertices(group, series)">

                                                <g [ngSwitch]="getShape(group, series)"
                                                   [matTooltip]="getTooltip(group, series, dot)"
                                                   dgpScatterPlotDot
                                                   [dot]="dot"
                                                   [series]="series"
                                                   [group]="group"
                                                   [scales]="connectedScatterPlotScales">

                                                    <circle *ngSwitchDefault
                                                            dgpCircle></circle>
                                                    <circle *ngSwitchCase="shapeEnum.Circle"
                                                            dgpCircle></circle>
                                                    <rect *ngSwitchCase="shapeEnum.Rectangle"
                                                          dgpRectangle></rect>
                                                    <polygon *ngSwitchCase="shapeEnum.Rhombus"
                                                             dgpRhombus></polygon>
                                                    <polygon *ngSwitchCase="shapeEnum.Star"
                                                             dgpStar></polygon>
                                                    <polygon *ngSwitchCase="shapeEnum.Cross"
                                                             dgpCross></polygon>
                                                    <polygon *ngSwitchCase="shapeEnum.Triangle"
                                                             dgpTriangle></polygon>
                                                    <polygon *ngSwitchCase="shapeEnum.TriangleDown"
                                                             dgpTriangleDown></polygon>
                                                    <polygon *ngSwitchCase="shapeEnum.TriangleRight"
                                                             dgpTriangleRight></polygon>
                                                    <polygon *ngSwitchCase="shapeEnum.TriangleLeft"
                                                             dgpTriangleLeft></polygon>

                                                </g>
                                            </ng-container>

                                        </ng-container>

                                    </ng-container>
                                </g>

                            </g>

                        </g>
                    </g>
                </svg>

            </dgp-plot-container>

        </dgp-chart>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-grow: 1;
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        idPrefixProvider
    ]
})
export class DgpConnectedScatterPlotComponent extends DgpCardinalYAxisChartComponentBase implements ConnectedScatterPlot, OnChanges, OnDestroy {

    readonly trackByConnectedScatterGroupId = trackByConnectedScatterGroupId;
    readonly trackByConnectedScatterSeriesId = trackByConnectedScatterSeriesId;
    readonly trackByConnectedPlotControlLineId = trackByConnectedPlotControlLineId;

    readonly shapeEnum = Shape;

    @Input()
    model: readonly ConnectedScatterGroup[];

    @Input()
    controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;

    @Input()
    config = defaultConnectedScatterPlotConfig;

    @Input()
    xAxisMin?: number;

    @Input()
    xAxisMax?: number;

    @Input()
    xAxisStep?: number;

    @Input()
    xAxisScaleType?: ScaleType;

    @Input()
    xAxisTickFormat?: (x: string) => string;

    private readonly drawChartActionScheduler = new EventEmitter();

    private drawChartSubscription: Subscription;

    connectedScatterPlotScales: ConnectedScatterPlotScales;

    selectedDotKey: string = null;

    constructor(
        private readonly cd: ChangeDetectorRef,
        @Inject(ID_PREFIX)
        protected readonly idPrefix: string
    ) {
        super(idPrefix);

        this.drawChartSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            tap(() => this.drawChart())
        ).subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (
            changes.model
            || changes.config
            || changes.selectionMode
            || changes.selection
            || changes.xAxisMin
            || changes.xAxisMax
            || changes.xAxisStep
            || changes.showXAxisGridLines
            || changes.yAxisMin
            || changes.yAxisMax
            || changes.yAxisStep
            || changes.showYAxisGridLines
            || changes.xAxisScaleType
            || changes.yAxisScaleType
            || changes.controlLines
            || changes.chartTitle
            || changes.xAxisTitle
            || changes.yAxisTitle
            || changes.xAxisTickFormat
            || changes.yAxisTickFormat
        ) {
            this.drawChartActionScheduler.emit();
        }
    }

    ngOnDestroy(): void {
        if (!this.drawChartSubscription?.closed) {
            this.drawChartSubscription?.unsubscribe();
        }
    }

    protected drawD3Chart(payload: DrawD3ChartPayload): void {


        this.connectedScatterPlotScales = createConnectedScatterPlotScales({
            containerHeight: payload.containerHeight,
            containerWidth: payload.containerWidth,
            connectedScatterGroups: this.model,
            controlLines: this.controlLines,
            // x axis
            xAxisScaleType: this.xAxisScaleType,
            xAxisTickFormat: this.xAxisTickFormat,
            xAxisMin: notNullOrUndefined(this.xAxisMin) ? +this.xAxisMin : undefined,
            xAxisMax: notNullOrUndefined(this.xAxisMax) ? +this.xAxisMax : undefined,
            xAxisStep: notNullOrUndefined(this.xAxisStep) ? +this.xAxisStep : undefined,
            // y axis
            yAxisScaleType: this.yAxisScaleType,
            yAxisTickFormat: this.yAxisTickFormat,
            yAxisMin: notNullOrUndefined(this.yAxisMin) ? +this.yAxisMin : undefined,
            yAxisMax: notNullOrUndefined(this.yAxisMax) ? +this.yAxisMax : undefined,
            yAxisStep: notNullOrUndefined(this.yAxisStep) ? +this.yAxisStep : undefined
        });

        this.cd.markForCheck();

    }

    drawChart() {

        if (isNullOrUndefined(this.elRef.nativeElement)) return;

        const rect = this.elRef.nativeElement.getBoundingClientRect();

        this.drawD3Chart({
            svg: null,
            containerHeight: rect.height,
            containerWidth: rect.width
        });


    }

    highlightDot(group: ConnectedScatterGroup, series: ConnectedScatterSeries, dot: Dot) {
        this.selectedDotKey = this.getDotKey(group, series, dot);
    }

    unhighlightDot(group: ConnectedScatterGroup, series: ConnectedScatterSeries, dot: Dot) {
        this.selectedDotKey = null;
    }

    isDotHighlighted(group: ConnectedScatterGroup, series: ConnectedScatterSeries, dot: Dot) {
        return this.selectedDotKey === this.getDotKey(group, series, dot);
    }

    private getDotKey(group: ConnectedScatterGroup, series: ConnectedScatterSeries, dot: Dot): string {
        return group.connectedScatterGroupId
            + "." + series.connectedScatterSeriesId
            + "." + dot.x + "." + dot.y;
    }

    getShape(group: ConnectedScatterGroup, series: ConnectedScatterSeries): Shape {
        if (notNullOrUndefined(series.shape)) {
            return series.shape;
        }
        if (notNullOrUndefined(group.shape)) {
            return group.shape;
        }
        return null;
    }

    showEdges(group: ConnectedScatterGroup, series: ConnectedScatterSeries): boolean {
        let result = true;
        if (notNullOrUndefined(group.showEdges)) result = group.showEdges;
        if (notNullOrUndefined(series.showEdges)) result = series.showEdges;
        return result;
    }

    showVertices(group: ConnectedScatterGroup, series: ConnectedScatterSeries): boolean {
        let result = true;
        if (notNullOrUndefined(group.showVertices)) result = group.showVertices;
        if (notNullOrUndefined(series.showVertices)) result = series.showVertices;
        return result;
    }

    getTooltip(group: ConnectedScatterGroup, series: ConnectedScatterSeries, dot: Dot) {
        let result = "";
        if (notNullOrUndefined(series.label)) result += series.label + ": ";
        result += "(" + dot.x.toPrecision(3) + ", " + dot.y.toPrecision(3) + ")";
        return result;
    }

}
