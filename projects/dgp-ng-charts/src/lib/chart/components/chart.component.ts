import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpChartComponentBase } from "./chart.component-base";
import { notNullOrUndefined } from "dgp-ng-app";

@Component({
    selector: "dgp-chart",
    template: `
        <div class="chart"
             #chartRef>

            <div class="title"
                 #chartTitleRef
                 [class.hidden]="chartTitleRef.innerText.length < 3">
                <ng-content select="[chart-title]"></ng-content>
                {{ chartTitle }}
            </div>

            <div class="inner-container"
                 [style.maxHeight.px]="geMaxHeight(chartRef, chartTitleRef, xAxisLabelRef)">
                <div class="y-axis-label-container"
                     [class.hidden]="yAxisLabelRef.innerText.length < 3">
                    <div class="y-axis-label"
                         #yAxisLabelRef>
                        <ng-content select="[y-axis-title]"></ng-content>
                        {{ yAxisTitle }}
                    </div>
                </div>

                <ng-content></ng-content>

                <div class="right-legend">
                    <ng-content select="[right-legend]"></ng-content>
                </div>
            </div>

            <div class="x-axis-label"
                 #xAxisLabelRef
                 [class.hidden]="xAxisLabelRef.innerText.length === 0">
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
            padding: 16px;
            word-break: break-all;
        }

        .inner-container {
            display: flex;
            flex-grow: 1;
            height: 100%;
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

        .hidden {
            min-height: 0 !important;
            min-width: 0 !important;
            max-width: 0 !important;
            display: none !important;
        }
    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class DgpChartComponent extends DgpChartComponentBase {

    // TODO: This is not always working properly since the class .hidden can be computed before OR after this is set
    geMaxHeight(chartRef: HTMLDivElement, chartTitleRef: HTMLDivElement, xAxisLabelRef: HTMLDivElement) {
        let maxHeight = chartRef.getBoundingClientRect().height;

        if (notNullOrUndefined(chartTitleRef)) {
            maxHeight -= chartTitleRef.getBoundingClientRect().height;
        }
        if (notNullOrUndefined(xAxisLabelRef)) {
            maxHeight -= xAxisLabelRef.getBoundingClientRect().height;
        }

        return maxHeight;
    }

}
