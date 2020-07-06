import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from "@angular/core";
import * as d3 from "d3";
import { Box, BoxGroup } from "../models";
import { ChartComponentBase } from "./chart.component-base";
import { defaultBoxPlotConfig } from "../constants";
import { createBoxPlotScales, drawBoxPlot, drawBoxPlotOutliers } from "../functions";

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

        const containerWidth = parseInt(d3.select(this.chartElRef.nativeElement).style("width"), 10);
        const containerHeight = parseInt(d3.select(this.chartElRef.nativeElement).style("height"), 10);

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
            .data(boxGroup => boxGroup.boxes as Array<Box>)
            .enter();

        drawBoxPlot({d3OnGroupDataEnter: onDataEnter, d3Scales}, this.config);

        drawBoxPlotOutliers({d3OnGroupDataEnter: onDataEnter, d3Scales}, this.config);

    }

}
