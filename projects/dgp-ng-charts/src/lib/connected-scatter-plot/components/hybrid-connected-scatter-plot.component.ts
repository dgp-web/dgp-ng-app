import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpCardinalXYAxisChartComponentBase } from "../../chart/components/cardinal-xy-axis-chart.component-base";
import { ConnectedScatterGroup, ConnectedScatterPlot, ConnectedScatterPlotControlLine, ConnectedScatterSeries, Dot } from "../models";
import { notNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import {
    defaultConnectedScatterPlotConfig,
    trackByConnectedPlotControlLineId,
    trackByConnectedScatterGroupId,
    trackByConnectedScatterSeriesId
} from "../constants";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";

@Component({
    selector: "dgp-hybrid-connected-scatter-plot",
    template: `

        <dgp-svg-plot [showXAxisGridLines]="showXAxisGridLines"
                      [showYAxisGridLines]="showYAxisGridLines"
                      [scales]="scales"
                      [config]="config"
                      [size]="size">

            <ng-container *ngIf="scales">

                <!--<svg:line xmlns:svg="http://www.w3.org/2000/svg"
                          *ngFor="let controlLine of controlLines; trackBy: trackByConnectedPlotControlLineId"
                          dgpConnectedScatterPlotControlLine
                          [scales]="scales"
                          [connectedScatterPlotControlLine]="controlLine"></svg:line>

                <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                       *ngFor="let group of model; trackBy: trackByConnectedScatterGroupId">
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
                                   [scales]="scales"
                                   dgpDot
                                   [model]="series.shape">
                                </g>

                                <ng-template #noTooltip>
                                    <g dgpScatterPlotDot
                                       [dot]="dot"
                                       [series]="series"
                                       [scales]="scales"
                                       dgpDot
                                       [model]="series.shape">
                                    </g>
                                </ng-template>


                            </ng-container>

                        </ng-container>
                    </ng-container>
                </svg:g>-->

            </ng-container>
        </dgp-svg-plot>

        <dgp-connected-scatter-plot-data-canvas *ngIf="scales"
                                                [scales]="scales"
                                                [config]="config"
                                                [model]="model"
                                                [controlLines]="controlLines"
                                                [size]="size"></dgp-connected-scatter-plot-data-canvas>
    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-grow: 1;
            height: 100%;
            position: relative;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DgpHybridConnectedScatterPlotComponent extends DgpCardinalXYAxisChartComponentBase implements ConnectedScatterPlot {

    readonly trackByConnectedScatterGroupId = trackByConnectedScatterGroupId;
    readonly trackByConnectedScatterSeriesId = trackByConnectedScatterSeriesId;
    readonly trackByConnectedPlotControlLineId = trackByConnectedPlotControlLineId;

    @Input()
    showDotTooltips = true;

    @Input()
    model: readonly ConnectedScatterGroup[];
    readonly model$ = observeAttribute$(this as DgpHybridConnectedScatterPlotComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpHybridConnectedScatterPlotComponent, "controlLines");

    @Input()
    config = defaultConnectedScatterPlotConfig;

    @Input()
    readonly size: Size;

    @Input()
    scales: ConnectedScatterPlotScales;

    getTooltip(group: ConnectedScatterGroup, series: ConnectedScatterSeries, dot: Dot) {
        let result = "";
        if (notNullOrUndefined(series.label)) result += series.label + ": ";
        result += "(" + dot.x.toPrecision(3) + ", " + dot.y.toPrecision(3) + ")";
        return result;
    }

}
