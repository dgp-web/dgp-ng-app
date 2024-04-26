import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpCardinalXYAxisChartComponentBase } from "../../chart/components/cardinal-xy-axis-chart.component-base";
import {
    ConnectedScatterGroup,
    ConnectedScatterPlot,
    ConnectedScatterPlotControlLine,
    ConnectedScatterSeries,
    Dot,
    DotHoverEvent
} from "../models";
import { observeAttribute$, Size } from "dgp-ng-app";
import {
    defaultConnectedScatterPlotConfig,
    trackByConnectedPlotControlLineId,
    trackByConnectedScatterGroupId,
    trackByConnectedScatterSeriesId
} from "../constants";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { BehaviorSubject } from "rxjs";
import { getConnectedScatterPlotDotTooltip } from "../functions/get-connected-scatter-plot-dot-tooltip.function";

@Component({
    selector: "dgp-hybrid-connected-scatter-plot",
    template: `

        <dgp-svg-plot [showXAxisGridLines]="showXAxisGridLines"
                      [showYAxisGridLines]="showYAxisGridLines"
                      [showDataAreaOutline]="showDataAreaOutline"
                      [scales]="scales"
                      [config]="config"
                      [size]="size"></dgp-svg-plot>

        <dgp-connected-scatter-plot-data-canvas *ngIf="scales"
                                                [scales]="scales"
                                                [config]="config"
                                                [model]="model"
                                                [controlLines]="controlLines"
                                                [size]="size"
                                                [showDotTooltips]="showDotTooltips"
                                                [dotSize]="dotSize"
                                                [lineWidth]="lineWidth"
                                                (dotHovered)="showTooltip($event)"></dgp-connected-scatter-plot-data-canvas>

        <div *ngIf="showDotTooltips && hoverEvent$.value"
             class="tooltip"
             [style.top.px]="hoverEvent$.value?.absoluteDomYPx"
             [style.left.px]="hoverEvent$.value?.absoluteDomXPx + 16">
            {{ getCurrentTooltip() }}
        </div>

    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-grow: 1;
            height: 100%;
            position: relative;
        }

        dgp-svg-plot {
            display: flex;
            flex-direction: column;
            flex-grow: 1;
        }

        .tooltip {
            position: fixed;
            z-index: 100;
            border: 1px solid gray;
            background: #303030;
            color: white;
            padding: 8px 12px;
            display: flex;
            align-items: center;
        }

        dgp-connected-scatter-plot-data-canvas {
            border-right: 1px solid inherit;
            border-top: 1px solid inherit;
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
    dotSize: number;

    @Input()
    lineWidth: number;

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

    readonly hoverEvent$ = new BehaviorSubject<DotHoverEvent>(null);

    getCurrentTooltip() {
        return this.getTooltip(
            this.hoverEvent$.value.group,
            this.hoverEvent$.value.series,
            this.hoverEvent$.value.dot,
        );
    }

    getTooltip(group: ConnectedScatterGroup, series: ConnectedScatterSeries, dot: Dot) {
        return getConnectedScatterPlotDotTooltip({
            group, series, dot,
            xAxisTickFormat: this.scales.xAxisModel.xAxisTickFormat,
            yAxisTickFormat: this.scales.yAxisModel.yAxisTickFormat,
        });
    }

    showTooltip(payload: DotHoverEvent) {
        this.hoverEvent$.next(payload);
    }
}

