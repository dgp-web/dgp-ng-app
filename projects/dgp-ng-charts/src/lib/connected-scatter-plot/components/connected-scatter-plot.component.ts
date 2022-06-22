import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { BehaviorSubject, combineLatest } from "rxjs";
import { debounceTime, map, shareReplay, take } from "rxjs/operators";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotControlLine, ConnectedScatterSeries, Dot } from "../models";
import { createConnectedScatterPlotScales } from "../functions";
import {
    defaultConnectedScatterPlotConfig,
    trackByConnectedPlotControlLineId,
    trackByConnectedScatterGroupId,
    trackByConnectedScatterSeriesId
} from "../constants";
import { filterNotNullOrUndefined, notNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { Shape } from "../../shapes/models";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { DgpCardinalXYAxisChartComponentBase } from "../../chart/components/cardinal-xy-axis-chart.component-base";

@Component({
    selector: "dgp-connected-scatter-plot",
    template: `
        <dgp-chart [yAxisTitle]="yAxisTitle"
                   [xAxisTitle]="xAxisTitle"
                   [chartTitle]="chartTitle"
                   [scales]="scales$ | async"
                   [showXAxisGridLines]="showXAxisGridLines"
                   [showYAxisGridLines]="showYAxisGridLines"
                   (sizeChanged)="onResize($event)">

            <ng-container right-legend>
                <ng-content select="[right-legend]"></ng-content>
            </ng-container>

            <ng-container *ngIf="scales$ | async">

                <svg:line xmlns:svg="http://www.w3.org/2000/svg"
                          *ngFor="let controlLine of controlLines; trackBy: trackByConnectedPlotControlLineId"
                          dgpConnectedScatterPlotControlLine
                          [scales]="scales$ | async"
                          [connectedScatterPlotControlLine]="controlLine"></svg:line>

                <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                       *ngFor="let group of model; trackBy: trackByConnectedScatterGroupId">
                    <ng-container *ngFor="let series of group.series; trackBy: trackByConnectedScatterSeriesId">
                        <path *ngIf="showEdges(group, series)"
                              dgpLineChartLine
                              [series]="series"
                              [group]="group"
                              [scales]="scales$ | async"></path>
                    </ng-container>
                </svg:g>

                <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                       *ngFor="let group of model; trackBy: trackByConnectedScatterGroupId">
                    <ng-container *ngFor="let series of group.series; trackBy: trackByConnectedScatterSeriesId">
                        <ng-container *ngFor="let dot of series.dots; trackBy: (series | trackByConnectedScatterDot)">
                            <ng-container *ngIf="showVertices(group, series)">

                                <g *ngIf="showDotTooltips; else noTooltip"
                                   [matTooltip]="getTooltip(group, series, dot)"
                                   dgpScatterPlotDot
                                   [dot]="dot"
                                   [series]="series"
                                   [group]="group"
                                   [scales]="scales$ | async"
                                   dgpDot
                                   [model]="getShape(group, series)">
                                </g>

                                <ng-template #noTooltip>
                                    <g dgpScatterPlotDot
                                       [dot]="dot"
                                       [series]="series"
                                       [group]="group"
                                       [scales]="scales$ | async"
                                       dgpDot
                                       [model]="getShape(group, series)">
                                    </g>
                                </ng-template>


                            </ng-container>

                        </ng-container>

                    </ng-container>
                </svg:g>

            </ng-container>
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
export class DgpConnectedScatterPlotComponent extends DgpCardinalXYAxisChartComponentBase implements ConnectedScatterPlot {

    readonly trackByConnectedScatterGroupId = trackByConnectedScatterGroupId;
    readonly trackByConnectedScatterSeriesId = trackByConnectedScatterSeriesId;
    readonly trackByConnectedPlotControlLineId = trackByConnectedPlotControlLineId;

    @Input()
    showDotTooltips = true;

    @Input()
    autoResize = true;

    @Input()
    model: readonly ConnectedScatterGroup[];
    readonly model$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpConnectedScatterPlotComponent, "controlLines");

    @Input()
    config = defaultConnectedScatterPlotConfig;

    readonly size$ = new BehaviorSubject<Size>(null);

    selectedDotKey: string = null;

    readonly scales$ = combineLatest([
        this.autoResize
            ? this.size$.pipe(filterNotNullOrUndefined())
            : this.size$.pipe(filterNotNullOrUndefined(), take(1)),
        this.model$,
        this.xAxis$,
        this.yAxis$,
        this.controlLines$
    ]).pipe(
        debounceTime(250),
        map(combination => createConnectedScatterPlotScales({
            containerHeight: combination[0].height,
            containerWidth: combination[0].width,
            connectedScatterGroups: combination[1],
            ...combination[2],
            ...combination[3],
            controlLines: combination[4]
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

    onResize(size: Size) {
        this.size$.next(size);
    }

}
