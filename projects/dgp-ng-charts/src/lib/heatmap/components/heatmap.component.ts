import { ChangeDetectionStrategy, Component } from "@angular/core";
import { ChartComponentBase } from "../../shared/chart.component-base";
import { defaultHeatmapConfig } from "../constants";

@Component({
    selector: "dgp-heatmap",
    template: `
        <div class="chart"
             #chartRef>
            <div *ngIf="chartTitle"
                 class="title">
                {{ chartTitle }}
            </div>

            <div class="inner-container">
                <div *ngIf="yAxisTitle"
                     class="y-axis-label-container">
                    <div class="y-axis-label">
                        {{ yAxisTitle }}
                    </div>
                </div>
                <div #chartElRef
                     class="d3-hook"></div>
            </div>

            <div *ngIf="xAxisTitle"
                 class="x-axis-label">
                {{ xAxisTitle }}
            </div>
        </div>
    `,
    styles: [`
        :host {
            display: flex;
            flex-grow: 1;
            font-size: smaller;
        }

        .chart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
        }

        .title {
            justify-content: center;
            align-items: center;
            display: flex;
            margin: 16px;
            word-break: break-all;
        }

        .inner-container {
            display: flex;
            flex-grow: 1;
        }

        .y-axis-label-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 40px;
            max-width: 40px;
        }

        .y-axis-label {
            transform: rotate(-90deg);
            white-space: nowrap;
        }

        .d3-hook {
            flex-grow: 1;
            height: 100%;
        }

        .x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatmapComponent extends ChartComponentBase<any, any> {

    config = defaultHeatmapConfig;

    protected drawD3Chart(): void {
    }

}
