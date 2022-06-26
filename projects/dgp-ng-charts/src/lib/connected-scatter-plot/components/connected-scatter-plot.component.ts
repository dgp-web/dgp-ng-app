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
import { filterNotNullOrUndefined, isNullOrUndefined, notNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { idPrefixProvider } from "../../shared/id-prefix-provider.constant";
import { DgpCardinalXYAxisChartComponentBase } from "../../chart/components/cardinal-xy-axis-chart.component-base";
import { Many } from "data-modeling";
import { Shape } from "../../shapes/models";

export function resolveConnectedScatterGroups(payload: Many<ConnectedScatterGroup>): Many<ConnectedScatterGroup> {
    if (isNullOrUndefined(payload)) return null;

    return payload.map(group => {
        return {
            ...group,
            series: group.series.map(series => {
                return {
                    ...series,
                    shape: notNullOrUndefined(series.shape)
                        ? series.shape
                        : notNullOrUndefined(group.shape)
                            ? group.shape
                            : Shape.Circle,
                    showVertices: notNullOrUndefined(series.showVertices)
                        ? series.showVertices
                        : notNullOrUndefined(group.showVertices)
                            ? group.showVertices
                            : true,
                    showEdges: notNullOrUndefined(series.showEdges)
                        ? series.showEdges
                        : notNullOrUndefined(group.showEdges)
                            ? group.showEdges
                            : true,
                    colorHex: notNullOrUndefined(series.colorHex)
                        ? series.colorHex
                        : notNullOrUndefined(group.colorHex)
                            ? group.colorHex
                            : null,
                };
            })
        };
    });
}

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

            <ng-container *ngIf="scales$ | async as scales">

                <svg:line xmlns:svg="http://www.w3.org/2000/svg"
                          *ngFor="let controlLine of controlLines; trackBy: trackByConnectedPlotControlLineId"
                          dgpConnectedScatterPlotControlLine
                          [scales]="scales"
                          [connectedScatterPlotControlLine]="controlLine"></svg:line>

                <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                       *ngFor="let group of resolvedModel$ | async; trackBy: trackByConnectedScatterGroupId">
                    <ng-container *ngFor="let series of group.series; trackBy: trackByConnectedScatterSeriesId">

                        <path *ngIf="series.showEdges"
                              dgpLineChartLine
                              [series]="series"
                              [scales]="scales"></path>

                        <ng-container *ngFor="let dot of series.dots; trackBy: (series | trackByConnectedScatterDot)">
                            <ng-container *ngIf="series.showVertices">

                                <g *ngIf="showDotTooltips; else noTooltip"
                                   [matTooltip]="getTooltip(group, series, dot)"
                                   dgpScatterPlotDot
                                   [dot]="dot"
                                   [series]="series"
                                   [group]="group"
                                   [scales]="scales"
                                   dgpDot
                                   [model]="series.shape">
                                </g>

                                <ng-template #noTooltip>
                                    <g dgpScatterPlotDot
                                       [dot]="dot"
                                       [series]="series"
                                       [group]="group"
                                       [scales]="scales"
                                       dgpDot
                                       [model]="series.shape">
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
    readonly resolvedModel$ = this.model$.pipe(map(resolveConnectedScatterGroups), shareReplay(1));

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
        this.resolvedModel$,
        this.xAxis$,
        this.yAxis$,
        this.controlLines$
    ]).pipe(
        debounceTime(0),
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
