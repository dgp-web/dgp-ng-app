import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import * as d3 from "d3";
import { ScaleBand, ScaleLinear } from "d3-scale";
import { isNullOrUndefined } from "dgp-ng-app";
import { Box, BoxGroup } from "../models";
import { ChartComponentBase } from "./chart.component-base";


const margins = {
    top: 10,
    right: 30,
    left: 50,
    bottom: 20
};

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
        dgp-line-chart {
            display: flex;
            flex-grow: 1;
            font-size: smaller;
        }

        dgp-line-chart .chart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
        }

        dgp-line-chart .chart__title {
            justify-content: center;
            align-items: center;
            display: flex;
            margin: 16px;
            word-break: break-all;
        }


        dgp-line-chart .chart__y-axis {
            font-size: 16px;
        }

        dgp-line-chart .chart__x-axis {
            font-size: 16px;
        }

        dgp-line-chart .chart__inner-container {
            display: flex;
            flex-grow: 1;
        }

        dgp-line-chart .chart_y-axis-label-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 40px;
            max-width: 40px;
        }

        dgp-line-chart .chart__y-axis-label {
            transform: rotate(-90deg);
            white-space: nowrap;
        }

        dgp-line-chart .chart__d3-hook {
            flex-grow: 1;
            height: 100%;
        }

        dgp-line-chart .chart__x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        dgp-line-chart .chart-svg {
            overflow: visible;
        }

        dgp-line-chart .tick {
            font-size: smaller;
        }

    `],
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
})
export class BoxPlotComponent extends ChartComponentBase implements AfterViewInit {

    @ViewChild("chartElRef", {static: false})
    chartElRef: ElementRef;

    @Input()
    model: ReadonlyArray<BoxGroup>;

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
                "translate(" + margins.left
                + ","
                + margins.top
                + ")"
            );

        const xAxisScale = d3.scaleBand()
            .domain(this.model.map(x => x.value.toString()))
            .range([0, 400]);

        const yAxisScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, 400]);

        svg.append("g")
            .attr("class", "chart__x-axis")
            .attr("transform", "translate(0," + yAxisScale.range()[1] + ")")
            .call(d3.axisBottom(xAxisScale));

        svg.append("g")
            .attr("class", "chart__y-axis")
            .call(d3.axisLeft(yAxisScale));

        /*   svg.append("g")
               .attr("class", "chart__x-axis")
               .attr("transform", "translate(0," + payload.d3Scales.yAxis.range()[0] + ")")
               .call(d3.axisBottom(payload.d3Scales.xAxis)
                   .tickValues(xAxisTicks as any)
                   .tickFormat(formatReadoutTick)
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

        const boxGroups = [];
        const valueSets = [];

        const d3OnGroupDataEnter = svg.append("g")
            .attr("class", "measurement-result-root")
            .selectAll("g")
            .data(boxGroups as Array<BoxGroup>)
            .enter()
            .append("g")
            .attr("transform", (d) => {
                return "translate(" + xAxisScale(d.value.toString()) + ",0)";
            })
            .selectAll("rect")
            .data(boxGroup => boxGroup.boxes as Array<Box>)
            .enter();

        this.drawBoxPlot({
            d3OnGroupDataEnter,
            d3Scales: {
                xAxisSubgroup: xAxisScale,
                yAxis: yAxisScale
            }
        });
        this.drawBoxPlotOutliers({
            d3OnGroupDataEnter,
            d3Scales: {
                xAxisSubgroup: xAxisScale,
                yAxis: yAxisScale
            }
        });

    }

    private drawBoxPlot(payload: {
        readonly d3OnGroupDataEnter: d3.Selection<d3.EnterElement, Box,
            SVGElement, BoxGroup>;
        readonly d3Scales: {
            yAxis: ScaleLinear<number, number>;
            xAxisSubgroup: ScaleBand<string>;
        };
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
            // .attr("stroke", d => d.colorHex) ???
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
            // .attr("stroke", d => d.colorHex) ???
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
            // .attr("stroke", d => d.colorHex)
            .style("stroke-width", 2)
        // .style("fill", d => d.colorHex + "66")
        ;

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
            // .attr("stroke", d => d.colorHex) ???
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
            // .attr("stroke", d => d.colorHex) ???
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
            // .attr("stroke", d => d.colorHex) ???
            .style("stroke-width", 2);
    }

    private drawBoxPlotOutliers(payload: {
        readonly d3OnGroupDataEnter: d3.Selection<d3.EnterElement, Box,
            SVGElement, BoxGroup>;
        readonly d3Scales: {
            yAxis: ScaleLinear<number, number>;
            xAxisSubgroup: ScaleBand<string>;
        }
    }): void {

        payload.d3OnGroupDataEnter
            .selectAll("circle")
            .data(datum => {

                if (isNullOrUndefined(datum.boxValuesId)
                    || isNullOrUndefined(datum.outliers)) {
                    return [];
                }

                return datum.outliers.map(x => {

                    return {
                        boxId: datum.boxId,
                        // colorHex: datum.colorHex, ???
                        value: x
                    };

                });

            })
            .enter()
            .append("circle")
            .attr("cx", (d) => {

                return payload.d3Scales.xAxisSubgroup(d.boxId)
                    + payload.d3Scales.xAxisSubgroup.bandwidth() / 2
                    // + this.getJitter(d.boxId + d.value)
                    ;
            })
            .attr("cy", (d) => {
                return payload.d3Scales.yAxis(d.value);
            })
            .attr("r", 3)
        // .style("fill", d => d.colorHex)
        ;

    }

}
