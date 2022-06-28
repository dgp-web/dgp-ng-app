import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import { DgpChartComponentBase } from "./chart.component-base";
import { filterNotNullOrUndefined, notNullOrUndefined, observeAttribute$, Size } from "dgp-ng-app";
import { defaultChartConfig } from "../../shared/constants";
import { map } from "rxjs/operators";
import { BehaviorSubject } from "rxjs";
import { getChartViewBox } from "../../shared/functions/get-chart-view-box.function";
import { getPlotRootTransform } from "../../shared/functions/get-plot-root-transform.function";

@Component({
    selector: "dgp-chart",
    template: `
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

            <dgp-plot-container
                dgpResizeSensor
                (sizeChanged)="onResize($event)">
                <ng-content></ng-content>
            </dgp-plot-container>

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

    @Output()
    readonly sizeChanged = new EventEmitter<Size>();

    @Input()
    config = defaultChartConfig;
    readonly config$ = observeAttribute$(this as DgpChartComponent, "config");
    readonly margin$ = this.config$.pipe(map(x => x.margin));

    readonly size$ = new BehaviorSubject<Size>(null);

    readonly viewBox$ = this.size$.pipe(
        filterNotNullOrUndefined(),
        map(containerDOMRect => getChartViewBox({containerDOMRect}))
    );

    readonly containerTransform$ = this.margin$.pipe(map(getPlotRootTransform));

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

    onResize(payload: Size) {
        this.size$.next(payload);
        this.sizeChanged.emit(payload);
    }

}
