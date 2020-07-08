import { ChangeDetectionStrategy, Component } from "@angular/core";
import * as d3 from "d3";
import { uniq } from "lodash";
import { ChartComponentBase } from "../../shared/chart.component-base";
import { defaultHeatmapConfig } from "../constants";
import { HeatmapTile } from "../models";

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
export class HeatmapComponent extends ChartComponentBase<ReadonlyArray<HeatmapTile>, any> {

    config = defaultHeatmapConfig;

    protected drawD3Chart(payload): void {

        // Labels of row and columns
        const rowValues = uniq(this.model.map(x => x.x.toString()))
            .sort();

        const columnValues = uniq(this.model.map(x => x.y.toString()))
            .sort();

        // Build X scales and axis:
        const xAxis = d3.scaleBand()
            .range([0, payload.containerWidth])
            .domain(rowValues)
            .padding(0.01);

        payload.svg.append("g")
            .attr("transform", "translate(0," + payload.containerHeight + ")")
            .call(d3.axisBottom(xAxis));

        // Build X scales and axis:
        const yAxis = d3.scaleBand()
            .range([payload.containerHeight, 0])
            .domain(columnValues)
            .padding(0.01);

        payload.svg.append("g")
            .call(d3.axisLeft(yAxis)
                .tickValues([])
                .tickSize(0));

        const colorScale = d3.scaleLinear()
            .range(["white", "#69b3a2"] as any)
            .domain([1, 100]);

        payload.svg.selectAll()
            .data(this.model as Array<HeatmapTile>, x => x.x.toString() + x.y.toString())
            .enter()
            .append("rect")
            .attr("x", x => xAxis(x.x.toString()))
            .attr("y", x => yAxis(x.y.toString()))
            .attr("width", xAxis.bandwidth())
            .attr("height", yAxis.bandwidth())
            .style("fill", x => colorScale(x.value));
    }

}
