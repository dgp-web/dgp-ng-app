import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { DgpCardinalXYAxisChartComponentBase } from "../../chart/components/cardinal-xy-axis-chart.component-base";
import {
    ConnectedScatterGroup,
    ConnectedScatterPlot,
    ConnectedScatterPlotControlLine,
    ConnectedScatterSeries,
    Dot,
    DotHoverEvent,
    DotTooltipFormat
} from "../models";
import { filterNotNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import {
    defaultConnectedScatterPlotConfig,
    trackByConnectedPlotControlLineId,
    trackByConnectedScatterGroupId,
    trackByConnectedScatterSeriesId
} from "../constants";
import { ConnectedScatterPlotScales } from "../models/connected-scatter-plot-scales.model";
import { BehaviorSubject } from "rxjs";
import { getConnectedScatterPlotDotTooltip } from "../functions/get-connected-scatter-plot-dot-tooltip.function";
import { DialogPosition } from "@angular/material/dialog";
import { map } from "rxjs/operators";

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

        <ng-container *ngIf="showDotTooltips && hoverEvent$.value">
            <div *ngIf="tooltipPosition$ | async as pos"
                 class="tooltip"
                 [style.top]="pos.top"
                 [style.left]="pos.left"
                 [style.bottom]="pos.bottom"
                 [style.right]="pos.right">
                {{ getCurrentTooltip() }}
            </div>
        </ng-container>

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
            width: 200px;
            font-size: smaller;
            white-space: pre-line;
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
    dotTooltipFormat: DotTooltipFormat;

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

    readonly tooltipPosition$ = this.hoverEvent$.pipe(
        filterNotNullOrUndefined(),
        map(x => getDotTooltipPosition({
            hoverPosition: x,
            configuredWidth: 200
        }))
    );

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
            yAxisTickValues: this.scales.yAxisModel.yAxisTickValues,
            dotTooltipFormat: this.dotTooltipFormat,
            xAxisTickFormat: this.scales.xAxisModel.xAxisTickFormat,
            yAxisTickFormat: this.scales.yAxisModel.yAxisTickFormat,
        });
    }

    showTooltip(payload: DotHoverEvent) {
        this.hoverEvent$.next(payload);
    }
}

export interface DotTooltipPosition {
    readonly top?: string;
    readonly bottom?: string;
    readonly left?: string;
    readonly right?: string;
}

export interface DotTooltipSizes {
    readonly offsetTop: number;
    readonly offsetLeft: number;
    readonly offsetRight: number;
    readonly availableSpace: {
        readonly left: number;
        readonly right: number;
        readonly top: number;
        readonly bottom: number;
    };
}

export function getDotTooltipPosition(payload: {
    readonly hoverPosition: {
        readonly absoluteDomXPx: number;
        readonly absoluteDomYPx: number;
    };
    readonly configuredWidth: number;
}): DotTooltipPosition {
    const hoverPosition = payload.hoverPosition;

    const configureDialogWidth = payload.configuredWidth;

    const sizes: DotTooltipSizes = {
        offsetTop: hoverPosition.absoluteDomYPx,
        offsetLeft: hoverPosition.absoluteDomXPx,
        offsetRight: window.innerWidth - hoverPosition.absoluteDomXPx,
        availableSpace: {
            left: hoverPosition.absoluteDomXPx,
            right: window.innerWidth - (hoverPosition.absoluteDomXPx),
            bottom: window.innerHeight - hoverPosition.absoluteDomYPx,
            top: hoverPosition.absoluteDomYPx
        }
    };


    let result: DialogPosition = {
        top: sizes.offsetTop + "px",
        left: sizes.offsetLeft + "px",
        bottom: null,
        right: null
    };


    if (sizes.availableSpace.right < configureDialogWidth
        && sizes.availableSpace.left >= configureDialogWidth) {
        result = {
            ...result,
            left: (sizes.offsetLeft - configureDialogWidth) + "px"
        };
    }

    if (sizes.availableSpace.bottom < 100
        && sizes.availableSpace.top >= 100) {
        result = {
            ...result,
            top: null,
            bottom: null,
            left: null,
            right: null
        };
    }

    return result;
}
