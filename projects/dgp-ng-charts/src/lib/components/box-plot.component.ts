import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from "@angular/core";
import * as d3 from "d3";
import { Box, BoxGroup, BoxPlotScales } from "../models";
import { ChartComponentBase } from "./chart.component-base";
import { defaultBoxPlotConfig } from "../constants";
import { createBoxPlotScales, getJitter } from "../functions";

@Component({
    selector: "dgp-box-plot",
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

        .chart__title {
            justify-content: center;
            align-items: center;
            display: flex;
            margin: 16px;
            word-break: break-all;
        }


        .chart__inner-container {
            display: flex;
            flex-grow: 1;
        }

        .chart_y-axis-label-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 40px;
            max-width: 40px;
        }

        .chart__y-axis-label {
            transform: rotate(-90deg);
            white-space: nowrap;
        }

        .chart__d3-hook {
            flex-grow: 1;
            height: 100%;
        }

        .chart__x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxPlotComponent extends ChartComponentBase implements AfterViewInit {

    @ViewChild("chartElRef", {static: false})
    chartElRef: ElementRef;

    @Input()
    model: ReadonlyArray<BoxGroup>;

    @Input()
    config = defaultBoxPlotConfig;

    ngAfterViewInit(): void {
        super.ngAfterViewInit();

        this.drawD3Chart();
    }

    protected drawD3Chart(): void {

        const containerWidth = parseInt(d3.select(this.chartElRef.nativeElement)
            .style("width"), 10);
        const containerHeight = parseInt(d3.select(this.chartElRef.nativeElement)
            .style("height"), 10);

        const svg = d3.select(this.chartElRef.nativeElement)
            .append("svg")
            .attr("width", containerWidth)
            .attr("height", containerHeight)
            .attr("class", "chart-svg")
            .append("g")
            .attr("transform",
                "translate(" + this.config.margin.left
                + ","
                + this.config.margin.top
                + ")"
            );

        const d3Scales = createBoxPlotScales({
            containerHeight, containerWidth,
            boxGroups: this.model
        });

        svg.append("g")
            .attr("class", "chart__x-axis")
            .attr("transform", "translate(0," + d3Scales.yAxis.range()[1] + ")")
            .call(d3.axisBottom(d3Scales.xAxis)
                /*.tickValues(this.model as any)
                .tickFormat(x => (x as any).label)*/
                // TODO: Display labels of BoxGroups here
            );

        svg.append("g")
            .attr("class", "chart__y-axis")
            .call(d3.axisLeft(d3Scales.yAxis));


        /*   svg.append("g")
               .attr("class", "chart__x-axis")
               .attr("transform", "translate(0," + payload.d3Scales.yAxis.range()[0] + ")")
               .call(d3.axisBottom(payload.d3Scales.xAxis)
                   .tickValues(xAxisTicks as any)
                   .tickFormat(formatTick)
               );*/
        /*

                svg.append("g")
                    .attr("class", "chart__y-axis")
                    .call(d3.axisLeft(payload.d3Scales.yAxis)
                        .ticks(yAxisTickCount)
                        .tickFormat(domainValue => {

                            const formattedValue = d3.format("~r")(domainValue);
                            return formattedValue;

                        })
                    );
        */

        const d3OnGroupDataEnter = svg.append("g")
            .attr("class", "measurement-result-root")
            .selectAll("g")
            .data(this.model as Array<BoxGroup>)
            .enter()
            .append("g")
            .attr("transform", (d) => {
                return "translate(" + d3Scales.xAxis(d.boxGroupId.toString()) + ",0)";
            })
            .selectAll("rect")
            .data(boxGroup => boxGroup.boxes as Array<Box>)
            .enter();

        this.drawBoxPlot({
            d3OnGroupDataEnter,
            d3Scales
        });

        this.drawBoxPlotOutliers({
            d3OnGroupDataEnter,
            d3Scales
        });

    }

    private drawBoxPlot(payload: {
        readonly d3OnGroupDataEnter: d3.Selection<d3.EnterElement, Box,
            SVGElement, BoxGroup>;
        readonly d3Scales: BoxPlotScales;
    }): void {

        const xSubgroup = payload.d3Scales.xAxisSubgroup;
        const yAxis = payload.d3Scales.yAxis;
        const d3OnGroupDataEnter = payload.d3OnGroupDataEnter;

        d3OnGroupDataEnter.append("line")
            .attr("x1", (d: Box) => {
                return xSubgroup(d.boxId) + xSubgroup.bandwidth() / 2;
            })
            .attr("x2", (d: Box) => {
                return xSubgroup(d.boxId) + xSubgroup.bandwidth() / 2;
            })
            .attr("y1", (d) => {
                return yAxis(d.quantiles.min);
            })
            .attr("y2", (d) => {
                return yAxis(d.quantiles.lower);
            })
            .attr("stroke", x => x.colorHex)
            .style("stroke-width", 2);

        d3OnGroupDataEnter.append("line")
            .attr("x1", (d: Box) => {
                return xSubgroup(d.boxId) + xSubgroup.bandwidth() / 2;
            })
            .attr("x2", (d: Box) => {
                return xSubgroup(d.boxId) + xSubgroup.bandwidth() / 2;
            })
            .attr("y1", (d) => {
                return yAxis(d.quantiles.upper);
            })
            .attr("y2", (d) => {
                return yAxis(d.quantiles.max);
            })
            .attr("stroke", x => x.colorHex) // ???
            .style("stroke-width", 2);

        d3OnGroupDataEnter.append("rect")
            .attr("x", d => xSubgroup(d.boxId))
            .attr("y", (d) => {
                return (yAxis(d.quantiles.upper));
            })
            .attr("height", (d) => {

                return Math.abs(
                    (yAxis(d.quantiles.lower) - yAxis(d.quantiles.upper))
                );
            })
            .attr("width", xSubgroup.bandwidth())
            .attr("stroke", x => x.colorHex)
            .attr("fill", x => x.colorHex + "66")
            .style("stroke-width", 2);

        d3OnGroupDataEnter.append("line")
            .attr("x1", (d: Box) => {
                return xSubgroup(d.boxId) + xSubgroup.bandwidth() * 0.25;
            })
            .attr("x2", (d: Box) => {
                return xSubgroup(d.boxId) + xSubgroup.bandwidth() * 0.75;
            })
            .attr("y1", (d) => {
                return yAxis(d.quantiles.min);
            })
            .attr("y2", (d) => {
                return yAxis(d.quantiles.min);
            })
            .attr("stroke", x => x.colorHex)
            .style("stroke-width", 2);

        d3OnGroupDataEnter.append("line")
            .attr("x1", (d: Box) => {
                return xSubgroup(d.boxId) + xSubgroup.bandwidth() * 0.25;
            })
            .attr("x2", (d: Box) => {
                return xSubgroup(d.boxId) + xSubgroup.bandwidth() * 0.75;
            })
            .attr("y1", (d) => {
                return yAxis(d.quantiles.max);
            })
            .attr("y2", (d) => {
                return yAxis(d.quantiles.max);
            })
            .attr("stroke", x => x.colorHex)
            .style("stroke-width", 2);

        d3OnGroupDataEnter.append("line")
            .attr("x1", (d: Box) => {
                return xSubgroup(d.boxId);
            })
            .attr("x2", (d: Box) => {
                return xSubgroup(d.boxId) + xSubgroup.bandwidth();
            })
            .attr("y1", (d) => {
                return yAxis(d.quantiles.median);
            })
            .attr("y2", (d) => {
                return yAxis(d.quantiles.median);
            })
            .attr("stroke", x => x.colorHex)
            .style("stroke-width", 2);
    }

    private drawBoxPlotOutliers(payload: {
        readonly d3OnGroupDataEnter: d3.Selection<d3.EnterElement, Box,
            SVGElement, BoxGroup>;
        readonly d3Scales: BoxPlotScales
    }): void {

        payload.d3OnGroupDataEnter
            .selectAll("circle")
            .data(datum => {

                return datum.outliers.map(x => {

                    return {
                        boxId: datum.boxId,
                        colorHex: datum.colorHex,
                        value: x
                    };

                });

            })
            .enter()
            .append("circle")
            .attr("cx", (d) => {
                return payload.d3Scales.xAxisSubgroup(d.boxId)
                    + payload.d3Scales.xAxisSubgroup.bandwidth() / 2
                    + getJitter(d.boxId + d.value, this.config);
            })
            .attr("cy", (d) => {
                return payload.d3Scales.yAxis(d.value);
            })
            .attr("r", 3)
            .style("fill", x => x.colorHex)
        ;

    }


}
