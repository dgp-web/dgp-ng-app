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
import { notNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import {
    defaultConnectedScatterPlotConfig,
    trackByConnectedPlotControlLineId,
    trackByConnectedScatterGroupId,
    trackByConnectedScatterSeriesId
} from "../constants";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { BehaviorSubject } from "rxjs";

@Component({
    selector: "dgp-hybrid-connected-scatter-plot",
    template: `

        <dgp-svg-plot [showXAxisGridLines]="showXAxisGridLines"
                      [showYAxisGridLines]="showYAxisGridLines"
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
                                                (dotHovered)="showTooltip($event)"></dgp-connected-scatter-plot-data-canvas>

        <div *ngIf="showDotTooltips && hoverEvent$.value"
             class="tooltip"
             [style.top.px]="hoverEvent$.value?.absoluteDomYPx"
             [style.left.px]="hoverEvent$.value?.absoluteDomXPx + 16">
            {{getCurrentTooltip()}}
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

    readonly hoverEvent$ = new BehaviorSubject<DotHoverEvent>(null);

    getCurrentTooltip() {
        return this.getTooltip(
            this.hoverEvent$.value.group,
            this.hoverEvent$.value.series,
            this.hoverEvent$.value.dot,
        );
    }

    getTooltip(group: ConnectedScatterGroup, series: ConnectedScatterSeries, dot: Dot) {
        let result = "";
        if (notNullOrUndefined(series.label)) result += series.label + ": ";
        result += "(" + dot.x.toPrecision(3) + ", " + dot.y.toPrecision(3) + ")";
        return result;
    }

    showTooltip(payload: DotHoverEvent) {
        this.hoverEvent$.next(payload);
    }
}
