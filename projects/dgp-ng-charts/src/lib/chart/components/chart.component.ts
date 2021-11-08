import { ChangeDetectionStrategy, Component } from "@angular/core";
import { DgpChartComponentBase } from "./chart.component-base";
import { notNullOrUndefined } from "dgp-ng-app";

@Component({
    selector: "dgp-chart",
    template: `

        <!-- Note that dgpResizeSensor and its handler are needed here or else resizing is not working -->
        <div class="title"
             *ngIf="chartTitle">
            {{ chartTitle }}
        </div>

        <div class="inner-container">
            <div class="y-axis-label-container"
                 *ngIf="yAxisTitle">
                <div class="y-axis-label"
                     #yAxisLabelRef>
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
             *ngIf="xAxisTitle">
            {{ xAxisTitle }}
        </div>
    `,
    styles: [`
        :host {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
            height: 100%;
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
            overflow: auto;
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

    noop() {
    }

}
