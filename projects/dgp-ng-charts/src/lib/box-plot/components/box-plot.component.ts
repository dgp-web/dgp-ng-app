import { AfterViewInit, ChangeDetectionStrategy, Component } from "@angular/core";
import * as d3 from "d3";
import { ChartComponentBase } from "../../shared/chart.component-base";
import { defaultBoxPlotConfig } from "../constants";
import { createBoxPlotScales, drawBoxPlot, drawBoxPlotOutliers, getJitter, isBrushed } from "../functions";
import { Box, BoxGroup, BoxPlotConfig } from "../models";

// TODO: Extract logic for coloring
// TODO: Extract logic for logarithmic y-axis scale

@Component({
    selector: "dgp-box-plot",
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
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxPlotComponent extends ChartComponentBase<ReadonlyArray<BoxGroup>, BoxPlotConfig> implements AfterViewInit {

    config = defaultBoxPlotConfig;

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

        const onDataEnter = svg.append("g")
            .attr("class", "measurement-result-root")
            .selectAll("g")
            .data(this.model as Array<BoxGroup>)
            .enter()
            .append("g")
            .attr("transform", x => "translate(" + d3Scales.xAxis(x.boxGroupId.toString()) + ",0)")
            .selectAll("rect")
            .data(x => x.boxes as Array<Box>)
            .enter();

        drawBoxPlot({d3OnGroupDataEnter: onDataEnter, d3Scales}, this.config);

        const outliers = drawBoxPlotOutliers({d3OnGroupDataEnter: onDataEnter, d3Scales}, this.config);

        /*svg.call(d3.brush()
            .extent([[0, 0], [containerWidth, containerHeight]])
            .on("start brush", () => {
                const extent = d3.event.selection;

                outliers.classed("selected", x => isBrushed(
                    extent,
                    d3Scales.xAxis(x.boxGroupId.toString())
                    + d3Scales.xAxisSubgroup.bandwidth() / 2
                    + d3Scales.xAxisSubgroup(x.boxId.toString())
                    + getJitter(x.boxId + x.value, this.config),
                    d3Scales.yAxis(x.value)
                ));
            })
        );*/

    }

}
