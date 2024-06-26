import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpCardinalXYAxisChartComponentBase } from "../../chart/components/cardinal-xy-axis-chart.component-base";
import {
    ConnectedScatterGroup,
    ConnectedScatterPlot,
    ConnectedScatterPlotControlLine,
    ConnectedScatterSeries,
    Dot,
    DotTooltipFormat
} from "../models";
import { observeAttribute$, Size } from "dgp-ng-app";
import {
    defaultConnectedScatterPlotConfig,
    trackByConnectedPlotControlLineId,
    trackByConnectedScatterGroupId,
    trackByConnectedScatterSeriesId
} from "../constants";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { getConnectedScatterPlotDotTooltip } from "../functions/get-connected-scatter-plot-dot-tooltip.function";

@Component({
    selector: "dgp-svg-connected-scatter-plot",
    template: `

        <dgp-svg-plot [showXAxisGridLines]="showXAxisGridLines"
                      [showYAxisGridLines]="showYAxisGridLines"
                      [showDataAreaOutline]="showDataAreaOutline"
                      [scales]="scales"
                      [config]="config"
                      [size]="size">

            <ng-container *ngIf="scales">

                <svg:line xmlns:svg="http://www.w3.org/2000/svg"
                          *ngFor="let controlLine of controlLines; trackBy: trackByConnectedPlotControlLineId"
                          dgpConnectedScatterPlotControlLine
                          [scales]="scales"
                          [lineWidth]="lineWidth"
                          [connectedScatterPlotControlLine]="controlLine"></svg:line>

                <svg:g xmlns:svg="http://www.w3.org/2000/svg"
                       *ngFor="let group of model; trackBy: trackByConnectedScatterGroupId">
                    <ng-container *ngFor="let series of group.series; trackBy: trackByConnectedScatterSeriesId">

                        <path *ngIf="series.showEdges"
                              dgpLineChartLine
                              [series]="series"
                              [scales]="scales"
                              [lineWidth]="lineWidth"></path>

                        <ng-container *ngFor="let dot of series.dots; trackBy: (series | trackByConnectedScatterDot)">
                            <ng-container *ngIf="series.showVertices">

                                <g *ngIf="showDotTooltips; else noTooltip"
                                   [matTooltip]="getTooltip(group, series, dot)"
                                   dgpScatterPlotDot
                                   [dot]="dot"
                                   [series]="series"
                                   [scales]="scales"
                                   dgpDot
                                   [model]="series.shape"
                                   [dotSize]="dotSize">
                                </g>

                                <ng-template #noTooltip>
                                    <g dgpScatterPlotDot
                                       [dot]="dot"
                                       [series]="series"
                                       [scales]="scales"
                                       dgpDot
                                       [model]="series.shape"
                                       [dotSize]="dotSize">
                                    </g>
                                </ng-template>


                            </ng-container>

                        </ng-container>
                    </ng-container>
                </svg:g>

            </ng-container>
        </dgp-svg-plot>
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
})
export class DgpSvgConnectedScatterPlotComponent extends DgpCardinalXYAxisChartComponentBase implements ConnectedScatterPlot {

    readonly trackByConnectedScatterGroupId = trackByConnectedScatterGroupId;
    readonly trackByConnectedScatterSeriesId = trackByConnectedScatterSeriesId;
    readonly trackByConnectedPlotControlLineId = trackByConnectedPlotControlLineId;

    @Input()
    showDotTooltips = true;

    @Input()
    dotSize: number;

    @Input()
    dotTooltipFormat: DotTooltipFormat;

    @Input()
    lineWidth = 1.5;

    @Input()
    model: readonly ConnectedScatterGroup[];
    readonly model$ = observeAttribute$(this as DgpSvgConnectedScatterPlotComponent, "model");

    @Input()
    controlLines?: ReadonlyArray<ConnectedScatterPlotControlLine>;
    readonly controlLines$ = observeAttribute$(this as DgpSvgConnectedScatterPlotComponent, "controlLines");

    @Input()
    config = defaultConnectedScatterPlotConfig;

    @Input()
    readonly size: Size;

    @Input()
    scales: ConnectedScatterPlotScales;

    getTooltip(group: ConnectedScatterGroup, series: ConnectedScatterSeries, dot: Dot) {
        return getConnectedScatterPlotDotTooltip({
            group, series, dot,
            yAxisTickValues: this.scales.yAxisModel.yAxisTickValues,
            dotTooltipFormat: this.dotTooltipFormat,
            xAxisTickFormat: this.scales.xAxisModel.xAxisTickFormat,
            yAxisTickFormat: this.scales.yAxisModel.yAxisTickFormat,
        });
    }

}
