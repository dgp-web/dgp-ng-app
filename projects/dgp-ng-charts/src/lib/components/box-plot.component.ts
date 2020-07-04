import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ViewEncapsulation } from "@angular/core";
import * as d3 from "d3";
import { isNullOrUndefined } from "dgp-ng-app";
import * as _ from "lodash";
import * as seedrandom from "seedrandom";
import { Box, BoxGroup } from "../models";
import { ChartComponentBase } from "./chart.component-base";

const margins = {
    top: 10,
    right: 30,
    left: 50,
    bottom: 20
};

export interface BoxPlotConfig {
    readonly margin: {
        readonly top: number;
        readonly bottom: number;
        readonly left: number;
        readonly right: number;
    };
    readonly groupPadding: number;
    readonly subGroupPadding: number;
}

export const defaultTimeSeriesChartConfig: BoxPlotConfig = {
    margin: {
        top: 10,
        right: 30,
        left: 50,
        bottom: 20
    },
    groupPadding: 0.2,
    subGroupPadding: 0.05
};


export interface BoxPlotD3Scales {
    readonly xAxis: d3.ScaleBand<string>;
    readonly xAxisSubgroup: d3.ScaleBand<string>;
    readonly yAxis: d3.ScaleLinear<number, number> | d3.ScaleLogarithmic<number, number>;
    /**
     * Needed for correctly offsetting the chart and to
     * avoid that tick labels overlap the axis label
     */
    readonly leftChartMargin: number;
}


export function createD3Scales(payload: {
    readonly boxGroups: ReadonlyArray<BoxGroup>;
    readonly containerWidth: number;
    readonly containerHeight: number;
    /*
     readonly config: BoxPlotConfig;*/
}): BoxPlotD3Scales {

    const boxGroupKeys = payload.boxGroups.map(x => x.boxGroupId);
    const boxIds = _.flatten(payload.boxGroups.map(x => x.boxes.map(y => y.boxId)));

    // Compute reference margin left
    /*  const referenceYDomainLabelLength = _.max(
          [yAxisLimits.min, yAxisLimits.max].map(x => {
              return d3.format("~r")(x).length;
          })
      );*/

    /* const estimatedNeededMaxYTickWidthPx = referenceYDomainLabelLength * 10;

     const marginLeft = payload.config.margin.left >= estimatedNeededMaxYTickWidthPx
         ? payload.config.margin.left
         : estimatedNeededMaxYTickWidthPx;

     const barAreaWidth = payload.containerWidth
         - marginLeft
         - payload.dummyConfig.margin.right;

     const barAreaHeight = payload.containerHeight
         - payload.dummyConfig.margin.top
         - payload.dummyConfig.margin.bottom;
 */
    const yAxis = d3.scaleLinear()
        .domain([20, 0])
        .range([0, 400]);

    const xAxis = d3.scaleBand()
        .domain(boxGroupKeys)
        .range([0, 400])
        .padding(0.2);

    return {
        xAxis,
        yAxis,
        xAxisSubgroup: d3.scaleBand()
            .domain(boxIds)
            .range([0, xAxis.bandwidth()])
            .padding(0.05),

        leftChartMargin: 40
    };

}


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
        dgp-box-plot {
            display: flex;
            flex-grow: 1;
            font-size: smaller;
        }

        dgp-box-plot .chart {
            display: flex;
            flex-direction: column;
            justify-content: center;
            flex-grow: 1;
        }

        dgp-box-plot .chart__title {
            justify-content: center;
            align-items: center;
            display: flex;
            margin: 16px;
            word-break: break-all;
        }


        dgp-box-plot .chart__y-axis {
            font-size: 16px;
        }

        dgp-box-plot .chart__x-axis {
            font-size: 16px;
        }

        dgp-box-plot .chart__inner-container {
            display: flex;
            flex-grow: 1;
        }

        dgp-box-plot .chart_y-axis-label-container {
            display: flex;
            justify-content: center;
            align-items: center;
            min-width: 40px;
            max-width: 40px;
        }

        dgp-box-plot .chart__y-axis-label {
            transform: rotate(-90deg);
            white-space: nowrap;
        }

        dgp-box-plot .chart__d3-hook {
            flex-grow: 1;
            height: 100%;
        }

        dgp-box-plot .chart__x-axis-label {
            min-height: 56px;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        dgp-box-plot .chart-svg {
            overflow: visible;
        }

        dgp-box-plot .tick {
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

        const d3Scales = createD3Scales({
            containerHeight, containerWidth,
            boxGroups: this.model
        });

        /*  const xAxisScale = d3.scaleBand()
              .domain(this.model.map(x => x.value.toString()))
              .range([0, 400]);

          const yAxisScale = d3.scaleLinear()
              .domain([0, 20])
              .range([0, 400]);
  */
        svg.append("g")
            .attr("class", "chart__x-axis")
            .attr("transform", "translate(0," + d3Scales.yAxis.range()[1] + ")")
            .call(d3.axisBottom(d3Scales.xAxis));

        svg.append("g")
            .attr("class", "chart__y-axis")
            .call(d3.axisLeft(d3Scales.yAxis));

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
        readonly d3Scales: BoxPlotD3Scales;
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
            .attr("stroke", "#f00")
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
            .attr("stroke", "#f00") // ???
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
            .attr("stroke", "#f00")
            .attr("fill", "#ff000066")
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
            .attr("stroke", "#f00")
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
            .attr("stroke", "#f00")
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
            .attr("stroke", "#f00")
            .style("stroke-width", 2);
    }

    private drawBoxPlotOutliers(payload: {
        readonly d3OnGroupDataEnter: d3.Selection<d3.EnterElement, Box,
            SVGElement, BoxGroup>;
        readonly d3Scales: BoxPlotD3Scales
    }): void {

        payload.d3OnGroupDataEnter
            .selectAll("circle")
            .data(datum => {

               /* if (isNullOrUndefined(datum.boxValuesId)
                    || isNullOrUndefined(datum.outliers)) {
                    return [];
                }*/

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
                    + this.getJitter(d.boxId + d.value);
            })
            .attr("cy", (d) => {
                return payload.d3Scales.yAxis(d.value);
            })
            .attr("r", 3)
            .style("fill", "#f00")
        ;

    }


    private getJitter(seed: string): number {

        const jitterWidth = 50;

        const rdm = seedrandom.alea(seed);
        return -jitterWidth / 2 + rdm() * jitterWidth;

    }


}
