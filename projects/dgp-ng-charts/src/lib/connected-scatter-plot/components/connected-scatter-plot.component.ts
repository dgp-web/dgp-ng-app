import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ElementRef,
    EventEmitter,
    Inject,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewChild
} from "@angular/core";
import { DgpChartComponentBase } from "../../chart/components/chart.component-base";
import { Subscription } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { DrawD3ChartPayload } from "../../shared/chart.component-base";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotControlLine, ConnectedScatterSeries, Dot } from "../models";
import { createConnectedScatterPlotScales } from "../functions";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { defaultConnectedScatterPlotConfig } from "../constants";
import { isNullOrUndefined, notNullOrUndefined } from "dgp-ng-app";
import { Shape } from "../../shapes/models";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { ID_PREFIX } from "../../shared/id-prefix-injection-token.constant";
import { ScaleType } from "../../shared/models";

@Component({
    selector: "dgp-connected-scatter-plot",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   dgpResizeSensor
                   (sizeChanged)="drawChart()">

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

                <svg #svgRoot
                     *ngIf="connectedScatterPlotScales"
                     class="chart-svg"
                     [attr.viewBox]="getViewBox()">

                    <defs>
                        <clipPath dgpChartDataAreaClipPath
                                  [scales]="connectedScatterPlotScales"></clipPath>
                        <clipPath dgpChartContainerAreaClipPath
                                  [scales]="connectedScatterPlotScales"></clipPath>
                    </defs>

                    <g [attr.clip-path]="getContainerAreaClipPath()">
                        <g [attr.transform]="getContainerTransform()">

                            <g class="chart__x-axis"
                               dgpChartBottomAxis
                               [scales]="connectedScatterPlotScales"></g>

                            <g class="chart__y-axis"
                               dgpChartLeftAxis
                               [scales]="connectedScatterPlotScales"></g>

                            <g [attr.clip-path]="getClipPath()">
                                <g *ngFor="let group of model">
                                    <ng-container *ngFor="let series of group.series">
                                        <ng-container *ngFor="let dot of series.dots">

                                            <ng-container *ngIf="showVertices(group, series)">

                                                <ng-container [ngSwitch]="getShape(group, series)">

                                                    <circle *ngSwitchCase="shapeEnum.Circle"
                                                            dgpScatterPlotDot
                                                            [dot]="dot"
                                                            [series]="series"
                                                            [group]="group"
                                                            [scales]="connectedScatterPlotScales"
                                                            (focus)="highlightDot(group, series, dot)"
                                                            (mouseenter)="highlightDot(group, series, dot)"
                                                            (blur)="unhighlightDot(group, series, dot)"
                                                            (mouseleave)="unhighlightDot(group, series, dot)"></circle>

                                                    <circle *ngSwitchDefault
                                                            dgpScatterPlotDot
                                                            [dot]="dot"
                                                            [series]="series"
                                                            [group]="group"
                                                            [scales]="connectedScatterPlotScales"
                                                            (focus)="highlightDot(group, series, dot)"
                                                            (mouseenter)="highlightDot(group, series, dot)"
                                                            (blur)="unhighlightDot(group, series, dot)"
                                                            (mouseleave)="unhighlightDot(group, series, dot)"></circle>

                                                    <rect *ngSwitchCase="shapeEnum.Rectangle"
                                                          dgpScatterPlotDot
                                                          [dot]="dot"
                                                          [series]="series"
                                                          [group]="group"
                                                          [scales]="connectedScatterPlotScales"
                                                          (focus)="highlightDot(group, series, dot)"
                                                          (mouseenter)="highlightDot(group, series, dot)"
                                                          (blur)="unhighlightDot(group, series, dot)"
                                                          (mouseleave)="unhighlightDot(group, series, dot)"></rect>

                                                    <polygon *ngSwitchCase="shapeEnum.Rhombus"
                                                             dgpScatterPlotDot
                                                             dgpRhombus
                                                             [dot]="dot"
                                                             [series]="series"
                                                             [group]="group"
                                                             [scales]="connectedScatterPlotScales"
                                                             (focus)="highlightDot(group, series, dot)"
                                                             (mouseenter)="highlightDot(group, series, dot)"
                                                             (blur)="unhighlightDot(group, series, dot)"
                                                             (mouseleave)="unhighlightDot(group, series, dot)"></polygon>

                                                    <polygon *ngSwitchCase="shapeEnum.Star"
                                                             dgpScatterPlotDot
                                                             dgpStar
                                                             [dot]="dot"
                                                             [series]="series"
                                                             [group]="group"
                                                             [scales]="connectedScatterPlotScales"
                                                             (focus)="highlightDot(group, series, dot)"
                                                             (mouseenter)="highlightDot(group, series, dot)"
                                                             (blur)="unhighlightDot(group, series, dot)"
                                                             (mouseleave)="unhighlightDot(group, series, dot)"></polygon>

                                                    <polygon *ngSwitchCase="shapeEnum.Cross"
                                                             dgpScatterPlotDot
                                                             dgpCross
                                                             [dot]="dot"
                                                             [series]="series"
                                                             [group]="group"
                                                             [scales]="connectedScatterPlotScales"
                                                             (focus)="highlightDot(group, series, dot)"
                                                             (mouseenter)="highlightDot(group, series, dot)"
                                                             (blur)="unhighlightDot(group, series, dot)"
                                                             (mouseleave)="unhighlightDot(group, series, dot)"></polygon>

                                                    <polygon *ngSwitchCase="shapeEnum.Triangle"
                                                             dgpScatterPlotDot
                                                             dgpTriangle
                                                             [dot]="dot"
                                                             [series]="series"
                                                             [group]="group"
                                                             [scales]="connectedScatterPlotScales"
                                                             (focus)="highlightDot(group, series, dot)"
                                                             (mouseenter)="highlightDot(group, series, dot)"
                                                             (blur)="unhighlightDot(group, series, dot)"
                                                             (mouseleave)="unhighlightDot(group, series, dot)"></polygon>

                                                    <polygon *ngSwitchCase="shapeEnum.TriangleDown"
                                                             dgpScatterPlotDot
                                                             dgpTriangleDown
                                                             [dot]="dot"
                                                             [series]="series"
                                                             [group]="group"
                                                             [scales]="connectedScatterPlotScales"
                                                             (focus)="highlightDot(group, series, dot)"
                                                             (mouseenter)="highlightDot(group, series, dot)"
                                                             (blur)="unhighlightDot(group, series, dot)"
                                                             (mouseleave)="unhighlightDot(group, series, dot)"></polygon>

                                                    <polygon *ngSwitchCase="shapeEnum.TriangleRight"
                                                             dgpScatterPlotDot
                                                             dgpTriangleRight
                                                             [dot]="dot"
                                                             [series]="series"
                                                             [group]="group"
                                                             [scales]="connectedScatterPlotScales"
                                                             (focus)="highlightDot(group, series, dot)"
                                                             (mouseenter)="highlightDot(group, series, dot)"
                                                             (blur)="unhighlightDot(group, series, dot)"
                                                             (mouseleave)="unhighlightDot(group, series, dot)"></polygon>

                                                    <polygon *ngSwitchCase="shapeEnum.TriangleLeft"
                                                             dgpScatterPlotDot
                                                             dgpTriangleLeft
                                                             [dot]="dot"
                                                             [series]="series"
                                                             [group]="group"
                                                             [scales]="connectedScatterPlotScales"
                                                             (focus)="highlightDot(group, series, dot)"
                                                             (mouseenter)="highlightDot(group, series, dot)"
                                                             (blur)="unhighlightDot(group, series, dot)"
                                                             (mouseleave)="unhighlightDot(group, series, dot)"></polygon>

                                                </ng-container>
                                            </ng-container>

                                            <text class="tooltip --hidden"
                                                  [class.--visible]="isDotHighlighted(group, series, dot)"
                                                  dgpScatterPlotDotTooltip
                                                  [scales]="connectedScatterPlotScales"
                                                  [dot]="dot"
                                                  [series]="series"
                                                  [group]="group">
                                                ({{ dot.x }} ; {{ dot.y }})
                                            </text>

                                        </ng-container>

                                        <path *ngIf="showEdges(group, series)"
                                              dgpLineChartLine
                                              [series]="series"
                                              [group]="group"
                                              [scales]="connectedScatterPlotScales"></path>

                                    </ng-container>
                                </g>

                                <line *ngFor="let controlLine of controlLines"
                                      dgpConnectedScatterPlotControlLine
                                      [scales]="connectedScatterPlotScales"
                                      [connectedScatterPlotControlLine]="controlLine"></line>

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
            height: 100%;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        idPrefixProvider
    ]
})
export class DgpConnectedScatterPlotComponent extends DgpChartComponentBase implements ConnectedScatterPlot, OnChanges, OnDestroy {

    readonly shapeEnum = Shape;

    @ViewChild("chartContainer") elRef: ElementRef;
    @ViewChild("svgRoot") svgRoot: ElementRef<SVGElement>;

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
    xAxisTicks?: number;

    @Input()
    yAxisMin?: number;

    @Input()
    yAxisMax?: number;

    @Input()
    yAxisTicks?: number;

    @Input()
    yAxisScaleType?: ScaleType;

    private readonly drawChartActionScheduler = new EventEmitter();

    private drawChartSubscription: Subscription;

    connectedScatterPlotScales: ConnectedScatterPlotScales;

    selectedDotKey: string = null;

    constructor(
        private readonly cd: ChangeDetectorRef,
        @Inject(ID_PREFIX)
        protected readonly idPrefix: string
    ) {
        super();

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
            || changes.xAxisTicks
            || changes.yAxisMin
            || changes.yAxisMax
            || changes.yAxisTicks
            || changes.yAxisScaleType
            || changes.controlLines
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
            yAxisScaleType: this.yAxisScaleType,
            xAxisMin: notNullOrUndefined(this.xAxisMin) ? +this.xAxisMin : undefined,
            xAxisMax: notNullOrUndefined(this.xAxisMax) ? +this.xAxisMax : undefined,
            xAxisTicks: notNullOrUndefined(this.xAxisTicks) ? +this.xAxisTicks : undefined,
            yAxisMin: notNullOrUndefined(this.yAxisMin) ? +this.yAxisMin : undefined,
            yAxisMax: notNullOrUndefined(this.yAxisMax) ? +this.yAxisMax : undefined,
            yAxisTicks: notNullOrUndefined(this.yAxisTicks) ? +this.yAxisTicks : undefined
        });

        this.cd.markForCheck();

    }

    getContainerTransform(): string {
        return "translate(" + this.config.margin.left + " " + this.config.margin.top + ")";
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

    getViewBox() {
        const rect = this.elRef.nativeElement.getBoundingClientRect() as DOMRect;

        const height = rect.height - this.config.margin.top - this.config.margin.bottom;
        const width = rect.width - this.config.margin.left - this.config.margin.right;

        return "0 0 " + width + " " + height;
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

    getClipPath(): string {
        return " url(#" + this.idPrefix + ".dataAreaClipPath" + ")";
    }

    getContainerAreaClipPath(): string {
        return " url(#" + this.idPrefix + ".containerAreaClipPath" + ")";
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
}