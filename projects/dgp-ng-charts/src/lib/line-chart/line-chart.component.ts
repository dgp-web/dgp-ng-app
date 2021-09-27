import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    SimpleChanges,
    ViewEncapsulation
} from "@angular/core";
import { DgpChartComponentBase } from "../chart/components/chart.component-base";
import { Chart } from "../shared/models";
import { Subscription } from "rxjs";
import { debounceTime, tap } from "rxjs/operators";
import { DrawD3ChartPayload } from "../shared/chart.component-base";
import { createBarChartScales } from "../bar-chart/functions/create-bar-chart-scales.function";

export interface ConnectedScatterSeriesGroup {
}

export interface ConnectedScatterPlot extends Chart {
    readonly model: ReadonlyArray<ConnectedScatterSeriesGroup>;
}

@Component({
    selector: "dgp-connected-scatter-plot",
    template: `
        <div class="chart"
             #chartRef>
            <div *ngIf="chartTitle"
                 class="chart__title">
                {{ chartTitle }}
            </div>

            <div class="chart__inner-container">
                <div *ngIf="yAxisTitle"
                     class="chart_y-axis-label-container">
                    <div class="chart__y-axis-label">
                        {{ yAxisTitle }}
                    </div>
                </div>
                <div #chartElRef
                     class="chart__d3-hook"></div>
            </div>

            <div *ngIf="xAxisTitle"
                 class="chart__x-axis-label">
                {{ xAxisTitle }}
            </div>
        </div>

    `,
    styles: [`
        dgp-connected-scatter-plot {
            display: flex;
            flex-grow: 1;
            font-size: smaller;
        }

        dgp-connected-scatter-plot .chart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
        }

        dgp-connected-scatter-plot .chart__title {
            justify-content: center;
            align-items: center;
            display: flex;
            margin: 16px;
            word-break: break-all;
        }


        dgp-connected-scatter-plot .chart__y-axis {
            font-size: 16px;
        }

        dgp-connected-scatter-plot .chart__x-axis {
            font-size: 16px;
        }

        dgp-connected-scatter-plot .chart__inner-container {
            display: flex;
            flex-grow: 1;
        }

        dgp-connected-scatter-plot .chart_y-axis-label-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 40px;
            max-width: 40px;
        }

        dgp-connected-scatter-plot .chart__y-axis-label {
            transform: rotate(-90deg);
            white-space: nowrap;
        }

        dgp-connected-scatter-plot .chart__d3-hook {
            flex-grow: 1;
            height: 100%;
        }

        dgp-connected-scatter-plot .chart__x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        dgp-connected-scatter-plot .chart-svg {
            overflow: visible;
        }

        dgp-connected-scatter-plot .tick {
            font-size: smaller;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class DgpConnectedScatterPlotComponent extends DgpChartComponentBase implements ConnectedScatterPlot, OnChanges, OnDestroy {

    @Input()
    model: readonly ConnectedScatterSeriesGroup[];

    private readonly drawChartActionScheduler = new EventEmitter();

    private drawChartSubscription: Subscription;

    connectedScatterScales: any; // TODO

    constructor(
        private readonly cd: ChangeDetectorRef
    ) {
        super();

        this.drawChartSubscription = this.drawChartActionScheduler.pipe(
            debounceTime(250),
            tap(() => this.drawChart())
        ).subscribe();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes.model || changes.config || changes.selectionMode || changes.selection) {
            this.drawChartActionScheduler.emit();
        }
    }

    ngOnDestroy(): void {
        if (!this.drawChartSubscription?.closed) {
            this.drawChartSubscription?.unsubscribe();
        }
    }

    protected drawD3Chart(payload: DrawD3ChartPayload): void {

        this.connectedScatterScales = createBarChartScales({
            containerHeight: payload.containerHeight,
            containerWidth: payload.containerWidth,
            connectedScatterSeriesGroups: this.model
        });

        this.cd.markForCheck();

    }

    drawChart() {
    }

}
