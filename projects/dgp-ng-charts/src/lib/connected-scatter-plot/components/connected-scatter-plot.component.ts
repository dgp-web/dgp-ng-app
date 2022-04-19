import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { combineLatest } from "rxjs";
import { debounceTime, map, shareReplay } from "rxjs/operators";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotControlLine, ConnectedScatterSeries, Dot } from "../models";
import { createConnectedScatterPlotScales } from "../functions";
import {
    defaultConnectedScatterPlotConfig,
    trackByConnectedPlotControlLineId,
    trackByConnectedScatterGroupId,
    trackByConnectedScatterSeriesId
} from "../constants";
import { filterNotNullOrUndefined, isNullOrUndefined, notNullOrUndefined, observeAttribute$ } from "dgp-ng-app";
import { Shape } from "../../shapes/models";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { CardinalYAxis, ScaleType } from "../../shared/models";
import { DgpCardinalYAxisChartComponentBase } from "../../chart/components/cardinal-y-axis-chart.component-base";
import { Many } from "data-modeling";

@Component({
    selector: "dgp-connected-scatter-plot",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   dgpResizeSensor
                   (sizeChanged)="onResize()">

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <dgp-plot-container>

                <svg *ngIf="model && (scales$ | async)"
                     class="chart-svg"
                     [attr.viewBox]="viewBox$ | async">

                    <defs>
                        <clipPath dgpChartDataAreaClipPath
                                  [scales]="scales$ | async"></clipPath>
                        <clipPath dgpChartContainerAreaClipPath
                                  [scales]="scales$ | async"></clipPath>
                    </defs>

                    <g [attr.clip-path]="containerAreaClipPath">
                        <g [attr.transform]="containerTransform$ | async">

                            <g dgpChartBottomAxis
                               [scales]="scales$ | async"></g>

                            <g *ngIf="showXAxisGridLines"
                               dgpChartXAxisGridLines
                               [scales]="scales$ | async"></g>

                            <g dgpChartLeftAxis
                               [scales]="scales$ | async"></g>

                            <g *ngIf="showYAxisGridLines"
                               dgpChartYAxisGridLines
                               [scales]="scales$ | async"></g>

                            <g [attr.clip-path]="dataAreaClipPath">

                                <line *ngFor="let controlLine of controlLines; trackBy: trackByConnectedPlotControlLineId"
                                      dgpConnectedScatterPlotControlLine
                                      [scales]="scales$ | async"
                                      [connectedScatterPlotControlLine]="controlLine"></line>

                                <g *ngFor="let group of model; trackBy: trackByConnectedScatterGroupId">
                                    <ng-container *ngFor="let series of group.series; trackBy: trackByConnectedScatterSeriesId">
                                        <path *ngIf="showEdges(group, series)"
                                              dgpLineChartLine
                                              [series]="series"
                                              [group]="group"
                                              [scales]="scales$ | async"></path>
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
                                                   [scales]="scales$ | async">

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
export class DgpConnectedScatterPlotComponent extends DgpCardinalYAxisChartComponentBase implements ConnectedScatterPlot {

    readonly trackByConnectedScatterGroupId = trackByConnectedScatterGroupId;
    readonly trackByConnectedScatterSeriesId = trackByConnectedScatterSeriesId;
    readonly trackByConnectedPlotControlLineId = trackByConnectedPlotControlLineId;

    readonly shapeEnum = Shape;

    @Input()
    model: readonly ConnectedScatterGroup[];
    readonly model$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "controlLines");

    @Input()
    config = defaultConnectedScatterPlotConfig;

    @Input()
    xAxisMin?: number;
    readonly xAxisMin$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "xAxisMin");

    @Input()
    xAxisMax?: number;
    readonly xAxisMax$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "xAxisMax");

    @Input()
    xAxisStep?: number;
    readonly xAxisStep$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "xAxisStep");

    @Input()
    xAxisScaleType?: ScaleType;
    readonly xAxisScaleType$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "xAxisScaleType");

    @Input()
    xAxisTickFormat?: (x: string) => string;
    readonly xAxisTickFormat$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "xAxisTickFormat");

    selectedDotKey: string = null;

    readonly scales$ = combineLatest([
        this.containerDOMRect$.pipe(filterNotNullOrUndefined()),
        this.model$,
        this.yAxis$,
        this.xAxisMin$,
        this.xAxisMax$,
        this.xAxisStep$,
        this.xAxisScaleType$,
        this.xAxisTickFormat$,
        this.controlLines$
    ]).pipe(
        debounceTime(250),
        map(combination => createConnectedScatterPlotScales({
            containerHeight: (combination[0] as DOMRectReadOnly).height,
            containerWidth: (combination[0] as DOMRectReadOnly).width,
            connectedScatterGroups: combination[1] as Many<ConnectedScatterGroup>,
            ...combination[2] as CardinalYAxis,
            xAxisMin: combination[3] as number,
            xAxisMax: combination[4] as number,
            xAxisStep: combination[5] as number,
            xAxisScaleType: combination[6] as ScaleType,
            xAxisTickFormat: combination[7] as (x: string) => string,
            controlLines: combination[8] as Many<ConnectedScatterPlotControlLine>
        })),
        shareReplay(1)
    );

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

    onResize() {
        if (isNullOrUndefined(this.elRef.nativeElement)) return;
        this.containerDOMRect$.next(this.elRef.nativeElement.getBoundingClientRect());
    }

}
