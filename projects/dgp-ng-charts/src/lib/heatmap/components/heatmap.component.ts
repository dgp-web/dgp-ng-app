import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from "@angular/core";
import * as _ from "lodash";
import { defaultDgpHeatmapConfig } from "../constants";
import { ExportChartConfig, HeatmapSelection, HeatmapTile } from "../models";
import { heatmapHybridRenderer } from "../heatmap-d3-renderer.function";
import { ChartComponentBase } from "../../shared/chart.component-base";

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
                <div class="right-legend">
                    <ng-content select="[right-legend]"></ng-content>
                </div>
            </div>

            <div *ngIf="xAxisTitle"
                 class="x-axis-label">
                {{ xAxisTitle }}
            </div>

            <div class="bottom-legend">
                <ng-content select="[bottom-legend]"></ng-content>
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
            position: relative;
        }

        .x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .right-legend {
        }

        .bottom-legend {

        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatmapComponent extends ChartComponentBase<ReadonlyArray<HeatmapTile>, any> {

    @Input()
    exportConfig: ExportChartConfig;
    @Input()
    config = defaultDgpHeatmapConfig;
    @Output()
    readonly selectionChange = new EventEmitter<HeatmapSelection>();
    svgNode: Node;

    private selectionValue: HeatmapSelection = {};

    @Input()
    get selection(): HeatmapSelection {
        return this.selectionValue;
    }

    set selection(value: HeatmapSelection) {

        if (_.isEqual(value, this.selectionValue)) {
            return;
        }

        this.selectionValue = value;
        this.selectionChange.emit(value);
    }

    protected drawD3Chart(payload): void {
        this.svgNode = payload.svg.node().parentNode;

        heatmapHybridRenderer({
            drawD3ChartInfo: payload,
            model: this.model,
            selection: this.selection,
            config: this.config,
            nativeElement: this.chartElRef.nativeElement,
            selectionMode: this.selectionMode,
            updateSelection: selection => this.selection = selection
        });
    }

}
