import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    ViewChild,
    ViewEncapsulation
} from "@angular/core";
import { ChartComponentBase } from "../shared/chart.component-base";
import * as d3 from "d3";

const margins = {
    top: 10,
    right: 30,
    left: 50,
    bottom: 20
};

@Component({
    selector: "dgp-line-chart",
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
export class LineChartComponent extends ChartComponentBase<any, any> implements AfterViewInit {

    @ViewChild("chartElRef", {static: false})
    chartElRef: ElementRef;

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
                "translate(" + margins.left
                + ","
                + margins.top
                + ")"
            );

        const xAxisScale = d3.scaleLinear().domain([0, 100]).range([0, 400]);
        const yAxisScale = d3.scaleLinear().domain([0, 100]).range([0, 400]);

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

    }

}
