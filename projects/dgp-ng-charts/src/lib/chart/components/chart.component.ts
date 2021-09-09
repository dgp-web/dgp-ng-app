import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { Mutable } from "data-modeling";
import { Chart } from "../../shared/models";

@Component({
    selector: "dgp-chart",
    template: `
        <div class="chart"
             #chartRef>
            <div class="title">
                <ng-content select="[chart-title]"></ng-content>
                {{ chartTitle }}
            </div>
            <div class="inner-container">
                <div class="y-axis-label-container">
                    <div class="y-axis-label">
                        <ng-content select="[y-axis-title]"></ng-content>
                        {{ yAxisTitle }}
                    </div>
                </div>

                <ng-content></ng-content>

                <div class="right-legend">
                    <ng-content select="[right-legend]"></ng-content>
                </div>
            </div>

            <div class="x-axis-label">
                <ng-content select="[x-axis-title]"></ng-content>
                {{ xAxisTitle }}
            </div>
        </div>

    `,
    styles: [`
        :host {
            display: flex;
            justify-content: center;
            flex-grow: 1;
        }

        svg {
            position: absolute;
            overflow: visible;
            width: 100%;
            height: 100%;
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

        .x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .right-legend {
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpChartComponent implements Mutable<Chart> {

    @Input()
    chartTitle: string;

    @Input()
    yAxisTitle: string;

    @Input()
    xAxisTitle: string;


}
